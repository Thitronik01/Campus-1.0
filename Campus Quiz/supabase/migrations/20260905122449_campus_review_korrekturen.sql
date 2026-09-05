-- Korrekturen aus der Prüfung vom 05.09.2026.
-- Bestehende Einwilligungen werden nicht rückwirkend erfunden.
-- Funktionen und Views werden ersetzt, Einsendungen bleiben unverändert.
begin;

alter table public.campus_feedback
  add column if not exists anonymized_at timestamptz,
  add column if not exists consent_accepted_at timestamptz,
  add column if not exists consent_version text;

alter table public.campus_quiz_submissions
  add column if not exists anonymized_at timestamptz,
  add column if not exists consent_accepted_at timestamptz,
  add column if not exists consent_version text;

do $$
begin
  if not exists (select 1 from pg_constraint where conrelid='public.campus_feedback'::regclass and conname='campus_feedback_consent_pair') then
    alter table public.campus_feedback add constraint campus_feedback_consent_pair check (
      (consent_accepted_at is null and consent_version is null) or
      (consent_accepted_at is not null and consent_version is not null and char_length(consent_version) between 1 and 30));
  end if;
  if not exists (select 1 from pg_constraint where conrelid='public.campus_quiz_submissions'::regclass and conname='campus_quiz_consent_pair') then
    alter table public.campus_quiz_submissions add constraint campus_quiz_consent_pair check (
      (consent_accepted_at is null and consent_version is null) or
      (consent_accepted_at is not null and consent_version is not null and char_length(consent_version) between 1 and 30));
  end if;
end;
$$;

create or replace function public.submit_campus_feedback(payload jsonb)
returns uuid
language plpgsql
security definer
set search_path to ''
as $function$
declare
  feedback_uuid uuid;
  rating_item jsonb;
  participant_areas_value text[] := '{}'::text[];
  island_choices_value text[] := '{}'::text[];
begin
  if payload is null or jsonb_typeof(payload) <> 'object' then
    raise exception 'payload must be a JSON object';
  end if;

  if octet_length(payload::text) > 120000 then
    raise exception 'payload too large';
  end if;

  if payload->>'eventSlug' <> 'campus-2026' then
    raise exception 'unknown eventSlug';
  end if;

  if payload->>'formVersion' <> 'campus-2026-haendler-v14' then
    raise exception 'unknown formVersion';
  end if;

  if payload->>'source' <> 'thitronik-campus-feedback-v14' then
    raise exception 'unknown source';
  end if;

  -- Übergang: Alte Clients liefern keinen Nachweis. Vorhandene Nachweise
  -- werden geprüft; die neuen Annahme-Functions verlangen sie zwingend.
  if payload ? 'consent' then
    if payload->'consent'->'accepted' is distinct from 'true'::jsonb
       or payload->'consent'->>'version' is distinct from '1.1'
       or coalesce(payload->'consent'->>'at', '') !~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}T'
       or (payload->'consent'->>'at')::timestamptz < timestamptz '2026-09-05 00:00:00+00'
       or (payload->'consent'->>'at')::timestamptz > now() + interval '5 minutes' then
      raise exception 'invalid consent';
    end if;
  end if;

  if nullif(btrim(payload->>'dealerName'), '') is null then
    raise exception 'dealerName is required';
  end if;

  if coalesce(payload->>'dealerNumber', '') !~ '^[0-9]{5}$' then
    raise exception 'dealerNumber must contain exactly five digits';
  end if;

  if nullif(btrim(payload->>'participantName'), '') is null then
    raise exception 'participantName is required';
  end if;

  if nullif(payload->>'submissionId', '') is null then
    raise exception 'submissionId is required';
  end if;

  if nullif(payload->>'createdClientAt', '') is null then
    raise exception 'createdClientAt is required';
  end if;

  if jsonb_typeof(payload->'ratings') <> 'array' then
    raise exception 'ratings must be an array';
  end if;

  if jsonb_array_length(payload->'ratings') > 40 then
    raise exception 'too many ratings';
  end if;

  if jsonb_typeof(payload->'participantAreas') <> 'array' then
    raise exception 'participantAreas must be an array';
  end if;

  if jsonb_array_length(payload->'participantAreas') > 8 then
    raise exception 'too many participantAreas';
  end if;

  select coalesce(array_agg(value), '{}'::text[])
    into participant_areas_value
    from jsonb_array_elements_text(payload->'participantAreas') as t(value);

  if jsonb_typeof(payload->'islandChoices') <> 'array' then
    raise exception 'islandChoices must be an array';
  end if;

  if jsonb_array_length(payload->'islandChoices') > 3 then
    raise exception 'too many islandChoices';
  end if;

  select coalesce(array_agg(value), '{}'::text[])
    into island_choices_value
    from jsonb_array_elements_text(payload->'islandChoices') as t(value);

  insert into public.campus_feedback (
    submission_id, client_created_at, event_slug, form_version, dealer_name,
    dealer_number, participant_name, overall_rating, recommendation,
    topic_wishes, team_mood, improvement_suggestions, positive_aspects,
    additional_notes, source, participant_areas, island_choices,
    recommendation_reason, raw_payload, consent_accepted_at, consent_version
  ) values (
    (payload->>'submissionId')::uuid,
    (payload->>'createdClientAt')::timestamptz,
    payload->>'eventSlug',
    payload->>'formVersion',
    btrim(payload->>'dealerName'),
    payload->>'dealerNumber',
    btrim(payload->>'participantName'),
    nullif(payload->>'overallRating', ''),
    nullif(payload->>'recommendation', ''),
    nullif(btrim(payload->>'topicWishes'), ''),
    nullif(btrim(payload->>'teamMood'), ''),
    nullif(btrim(payload->>'improvementSuggestions'), ''),
    nullif(btrim(payload->>'positiveAspects'), ''),
    nullif(btrim(payload->>'additionalNotes'), ''),
    payload->>'source',
    participant_areas_value,
    island_choices_value,
    nullif(btrim(payload->>'recommendationReason'), ''),
    payload,
    (payload->'consent'->>'at')::timestamptz,
    payload->'consent'->>'version'
  )
  on conflict (submission_id) do update set
    client_created_at = excluded.client_created_at,
    form_version = excluded.form_version,
    dealer_name = excluded.dealer_name,
    dealer_number = excluded.dealer_number,
    participant_name = excluded.participant_name,
    overall_rating = excluded.overall_rating,
    recommendation = excluded.recommendation,
    topic_wishes = excluded.topic_wishes,
    team_mood = excluded.team_mood,
    improvement_suggestions = excluded.improvement_suggestions,
    positive_aspects = excluded.positive_aspects,
    additional_notes = excluded.additional_notes,
    source = excluded.source,
    participant_areas = excluded.participant_areas,
    island_choices = excluded.island_choices,
    recommendation_reason = excluded.recommendation_reason,
    raw_payload = excluded.raw_payload,
    consent_accepted_at = excluded.consent_accepted_at,
    consent_version = excluded.consent_version
  returning id into feedback_uuid;

  for rating_item in
    select value from jsonb_array_elements(payload->'ratings')
  loop
    if jsonb_typeof(rating_item) <> 'object'
       or nullif(btrim(rating_item->>'sectionKey'), '') is null
       or nullif(btrim(rating_item->>'itemKey'), '') is null
       or nullif(btrim(rating_item->>'itemLabel'), '') is null
       or coalesce(rating_item->>'rating', '') !~ '^[1-5]$' then
      raise exception 'invalid rating item';
    end if;

    insert into public.campus_feedback_ratings (
      feedback_id, section_key, item_key, item_label, rating, comment
    ) values (
      feedback_uuid,
      btrim(rating_item->>'sectionKey'),
      btrim(rating_item->>'itemKey'),
      btrim(rating_item->>'itemLabel'),
      (rating_item->>'rating')::smallint,
      nullif(btrim(rating_item->>'comment'), '')
    )
    on conflict (feedback_id, item_key) do update
      set section_key = excluded.section_key,
          item_label = excluded.item_label,
          rating = excluded.rating,
          comment = excluded.comment;
  end loop;

  return feedback_uuid;
end;
$function$;

revoke execute on function public.submit_campus_feedback(jsonb)
  from public, anon, authenticated;
grant execute on function public.submit_campus_feedback(jsonb)
  to service_role;


-- ---------------------------------------------------------------------------

create or replace view public.campus_quiz_inseln as
select
  island,
  max(island_code)                                   as insel,
  count(*)                                           as einsendungen,
  count(distinct dealer_number) filter (where anonymized_at is null) as haendler,
  round(avg(percent))                                as schnitt_prozent,
  min(percent)                                       as schlechtestes,
  max(percent)                                       as bestes,
  round(avg(duration_seconds))                       as schnitt_sekunden,
  count(*) filter (where percent = 100)              as fehlerfrei,
  count(*) filter (where percent < 60)               as unter_60_prozent,
  max(created_at)                                    as letzte_einsendung
from public.campus_quiz_submissions
group by island
order by schnitt_prozent asc;   -- schwächste Insel oben

comment on view public.campus_quiz_inseln is
  'Ergebnisse je Schulungsinsel. Sortiert nach Durchschnitt aufsteigend — '
  'oben steht die Insel, an der die Schulung nachgeschärft werden muss.';


-- ---------------------------------------------------------------------------
-- 5. Auswertung: Ergebnisse pro Frage
--
-- Die eigentliche Kernauswertung des Konzepts. Eine Frage, bei der viele
-- danebenliegen, zeigt präzise, welchen Punkt die Station schärfer betonen
-- muss. Eine Frage mit 100 % liefert dagegen keine Information.
-- ---------------------------------------------------------------------------

create or replace view public.campus_quiz_fragen as
select
  s.island,
  max(s.island_code)                                          as insel,
  a->>'id'                                                    as frage_id,
  a->>'category'                                              as thema,
  a->>'type'                                                  as fragetyp,
  min(a->>'prompt')                                           as frage,
  count(*)                                                    as beantwortet,
  count(*) filter (where (a->>'is_correct')::boolean)         as richtig,
  round(
    100.0 * count(*) filter (where (a->>'is_correct')::boolean) / nullif(count(*), 0)
  )                                                           as prozent_richtig,
  round(avg((a->>'response_seconds')::numeric))               as schnitt_sekunden,
  s.quiz_version
from public.campus_quiz_submissions s
cross join lateral jsonb_array_elements(s.answers) as a
group by s.island, s.quiz_version, a->>'id', a->>'category', a->>'type'
order by prozent_richtig asc;   -- schwierigste Frage oben

comment on view public.campus_quiz_fragen is
  'Trefferquote je Frage, schwierigste zuerst. Grundlage für die Frage '
  '"Welche Inhalte wurden verstanden und wo müssen wir besser werden?".';


-- ---------------------------------------------------------------------------
-- 6. Auswertung: Verkauf gegen Werkstatt
-- ---------------------------------------------------------------------------

create or replace view public.campus_quiz_taetigkeit as
select
  island,
  max(island_code)      as insel,
  case area
    when 'verkauf'           then 'Verkauf'
    when 'werkstatt'         then 'Werkstatt'
    when 'verkauf-werkstatt' then 'Verkauf und Werkstatt'
    when 'leitung'           then 'Betriebsleitung'
    when 'sonstiges'         then 'Sonstiges'
    else                          'Keine Angabe'
  end                   as taetigkeitsbereich,
  count(*)              as einsendungen,
  round(avg(percent))   as schnitt_prozent
from public.campus_quiz_submissions
group by island, area
order by island, schnitt_prozent asc;


-- ---------------------------------------------------------------------------
-- 7. Auswertung: Quiz und Feedback zusammengeführt
--
-- Verbindung über die Händlernummer. Die vollständige Basismigration legt sie
-- von Anfang an als geprüfte Spalte an; ein Griff in raw_payload ist deshalb
-- weder nötig noch erwünscht.
-- ---------------------------------------------------------------------------

create or replace view public.campus_quiz_und_feedback as
with quiz as (
  select
    dealer_number,
    max(dealer)                    as haendler,
    count(distinct island)         as inseln_absolviert,
    round(avg(percent))            as quiz_schnitt
  from public.campus_quiz_submissions
  where anonymized_at is null
  group by dealer_number
),
letztes_feedback as (
  -- Pro Betrieb gilt der letzte Bogen, kein Textmaximum über mehrere Bögen.
  select distinct on (dealer_number) *
    from public.campus_feedback
   where form_version = 'campus-2026-haendler-v14'
     and is_test is not true and anonymized_at is null
     and dealer_number ~ '^[0-9]{5}$'
   order by dealer_number, client_created_at desc nulls last, created_at desc, id desc
),
feedback as (
  select
    f.dealer_number                as dealer_number,
    max(f.dealer_name)             as haendler_feedback,
    max(f.overall_rating)          as gesamteindruck,
    max(f.recommendation)          as weiterempfehlung,
    round(avg(public.campus_note_einheitlich(f.form_version, r.rating))
      filter (where r.section_key <> 'schulungsinseln'))
                                   as feedback_schnitt
  from letztes_feedback f
  left join public.campus_feedback_ratings r on r.feedback_id = f.id
  where f.form_version = 'campus-2026-haendler-v14'
    and f.is_test is not true
    and f.dealer_number ~ '^[0-9]{5}$'
  group by f.dealer_number
)
select
  coalesce(q.dealer_number, fb.dealer_number) as haendlernummer,
  coalesce(q.haendler, fb.haendler_feedback)  as haendler,
  q.inseln_absolviert,
  q.quiz_schnitt,
  fb.gesamteindruck,
  fb.weiterempfehlung,
  fb.feedback_schnitt
from quiz q
full outer join feedback fb on fb.dealer_number = q.dealer_number
order by q.quiz_schnitt nulls last;

comment on view public.campus_quiz_und_feedback is
  'Quizergebnis und Schulungsfeedback je Händlernummer. Beantwortet: hängen '
  'schwache Quizergebnisse mit schlechter Bewertung der Schulung zusammen? '
  'Die Feedbacknoten liegen skalenbereinigt auf einer Achse, auf der 5 gut ist.';


-- ---------------------------------------------------------------------------
-- 7b. Die Views ebenso verschliessen wie die Tabelle
--
-- Abschnitt 3 schuetzt die TABELLE: RLS an, keine Policy, Rechte fuer anon und
-- authenticated entzogen. Fuer die vier Views darueber galt das nicht — und
-- genau darueber war die Tabelle wieder lesbar. Zwei Voreinstellungen wirken
-- dabei zusammen:
--
--   1. Eine View laeuft in PostgreSQL mit den Rechten ihres BESITZERS, nicht
--      denen des Aufrufers. Die RLS der Tabelle greift dadurch nicht.
--   2. Supabase legt fuer neue Objekte im Schema public Default-Privileges
--      zugunsten von anon und authenticated an.
--
-- Zusammen heisst das: PostgREST haette
-- /rest/v1/campus_quiz_und_feedback mit dem oeffentlichen anon-Schluessel
-- ausgeliefert — Haendlernummer, Haendlername, Quizschnitt und
-- Feedbackbewertung Zeile fuer Zeile.
--
-- Beides wird hier geschlossen. security_invoker laesst die View mit den
-- Rechten des Aufrufers laufen, sodass die RLS der Tabelle wieder greift; der
-- Rechteentzug ist der zweite Riegel.
--
-- WER DIE VIEWS AUSWERTEN SOLL — Langdock zum Beispiel —, braucht dafuer den
-- Service Key oder eine eigene Rolle mit ausdruecklichem GRANT. Ueber den
-- anon-Schluessel geht es danach nicht mehr, und das ist der Zweck.
--
-- Erfordert PostgreSQL 15 oder neuer; Supabase erfuellt das.
-- ---------------------------------------------------------------------------

alter view public.campus_quiz_inseln           set (security_invoker = on);
alter view public.campus_quiz_fragen           set (security_invoker = on);
alter view public.campus_quiz_taetigkeit       set (security_invoker = on);
alter view public.campus_quiz_und_feedback     set (security_invoker = on);

revoke all on public.campus_quiz_inseln       from anon, authenticated;
revoke all on public.campus_quiz_fragen       from anon, authenticated;
revoke all on public.campus_quiz_taetigkeit   from anon, authenticated;
revoke all on public.campus_quiz_und_feedback from anon, authenticated;

grant select on public.campus_quiz_inseln           to service_role;
grant select on public.campus_quiz_fragen           to service_role;
grant select on public.campus_quiz_taetigkeit       to service_role;
grant select on public.campus_quiz_und_feedback     to service_role;


-- ---------------------------------------------------------------------------
-- 8. Kontrolle nach dem Einspielen
-- ---------------------------------------------------------------------------

-- select * from public.campus_quiz_inseln;
-- select * from public.campus_quiz_fragen limit 20;
-- select * from public.campus_quiz_taetigkeit;
-- select * from public.campus_quiz_und_feedback;

-- Prüfen, dass anon wirklich nicht drankommt — Tabelle UND Views.
-- Erwartet: keine Zeile mit grantee 'anon' oder 'authenticated'.
-- select table_name, grantee, privilege_type
--   from information_schema.role_table_grants
--  where table_name in ('campus_quiz_submissions',
--                       'campus_quiz_inseln', 'campus_quiz_fragen',
--                       'campus_quiz_taetigkeit', 'campus_quiz_und_feedback')
--    and grantee in ('anon', 'authenticated');

-- Und dass die Views mit den Rechten des Aufrufers laufen.
-- Erwartet: viermal security_invoker=on.
-- select c.relname, c.reloptions
--   from pg_class c join pg_namespace n on n.oid = c.relnamespace
--  where n.nspname = 'public' and c.relkind = 'v'
--    and c.relname like 'campus_quiz%';

create or replace function public.campus_daten_anonymisieren(
  frist interval default interval '12 months'
)
returns table (tabelle text, zeilen integer)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  grenze timestamptz := now() - frist;
  n_quiz integer;
  n_feedback integer;
begin
  if frist is null or frist <= interval '0 seconds' then
    raise exception 'Die Aufbewahrungsfrist muss positiv sein.';
  end if;

  -- Auch Kommentare bereits anonymisierter Bögen nachbereinigen.
  update public.campus_feedback_ratings r
     set comment = null
    from public.campus_feedback f
   where r.feedback_id = f.id and r.comment is not null
     and (f.created_at < grenze or f.anonymized_at is not null);

  -- Quiz: Name, Betrieb und Händlernummer fort. answers bleibt — dort stehen
  -- Antwortnummern, keine Personendaten. Die Prüfbedingungen der Tabelle
  -- verlangen zwei bis 120 Zeichen und fünf Ziffern, deshalb Platzhalter
  -- statt leerer Zeichenketten.
  update public.campus_quiz_submissions
     set participant   = 'anonymisiert',
         dealer        = 'anonymisiert',
         dealer_number = '00000',
         session_id = 'anon-' || id::text,
         page_url = '',
         consent_accepted_at = null,
         consent_version = null,
         anonymized_at = now()
   where created_at < grenze
     and anonymized_at is null;
  get diagnostics n_quiz = row_count;

  -- Feedback: dieselben Felder, dazu sämtliche Freitexte und die Rohfassung
  -- der Einsendung. raw_payload enthält alle Angaben ein zweites Mal; bliebe
  -- es stehen, wäre die Anonymisierung eine Attrappe.
  update public.campus_feedback
     set participant_name        = 'anonymisiert',
         dealer_name             = 'anonymisiert',
         dealer_number           = '00000',
         submission_id           = gen_random_uuid(),
         consent_accepted_at      = null,
         consent_version          = null,
         recommendation_reason   = null,
         topic_wishes            = null,
         team_mood               = null,
         improvement_suggestions = null,
         positive_aspects        = null,
         additional_notes        = null,
         raw_payload             = jsonb_build_object('anonymisiert', true),
         anonymized_at           = now()
   where created_at < grenze
     and anonymized_at is null;
  get diagnostics n_feedback = row_count;

  -- Die Einzelnoten bleiben erhalten; ihre Freitexte wurden oben entfernt.

  return query
    select 'campus_quiz_submissions'::text, n_quiz
    union all
    select 'campus_feedback'::text, n_feedback;
end;
$$;

comment on function public.campus_daten_anonymisieren(interval) is
  'Löscht personenbezogene Angaben und Freitexte aus Einsendungen, die älter als die Frist sind (voreingestellt zwölf Monate). Kennzahlen bleiben erhalten.';

-- Browserrollen dürfen die Funktion nicht aufrufen. Sie räumt Rohdaten und
-- umgeht als security definer die Row Level Security.
revoke execute on function public.campus_daten_anonymisieren(interval)
  from public, anon, authenticated;


-- ---------------------------------------------------------------------------

-- ===========================================================================
-- THITRONIK Campus 1.0 — Auswertung für Langdock
-- Zielprojekt: pstohdeknhgsywmogmiu (thitronik-campus, Frankfurt)
-- Erstellt: 2026-09-03
--
-- Beantwortet Fragen mit Zeitraum: "Wie viele Händler haben heute die Insel
-- VEJRØ gespielt?" Die bestehenden Views können das nicht — sie fassen über
-- den gesamten Bestand zusammen und kennen keinen Tag.
--
-- Warum eine Funktion und keine weitere View:
-- Eine View kann keinen Zeitraum entgegennehmen. Langdock müsste dann selbst
-- filtern und bekäme dafür Lesezugriff auf Tageszeilen — also faktisch auf
-- die Rohdaten. Eine Funktion nimmt den Zeitraum als Parameter und gibt nur
-- das Ergebnis zurück.
--
-- Idempotent: mehrfaches Ausführen ist gefahrlos. Kein drop, kein delete.
-- ===========================================================================


-- ---------------------------------------------------------------------------
-- 1. Auswertung mit Zeitraum
-- ---------------------------------------------------------------------------
-- Die Mindestmenge steht bewusst als Konstante im Rumpf und nicht als
-- Parameter: Wer sie von außen setzen könnte, könnte sie auf 1 setzen und
-- damit den Schutz kleiner Gruppen abschalten.
--
-- Zeitzone: created_at ist timestamptz, also UTC. "Heute" heißt für eine
-- Schulung in Eckernförde aber der Kalendertag in Europe/Berlin. Ohne die
-- Umrechnung fiele im Sommer alles zwischen 00:00 und 02:00 Ortszeit auf den
-- Vortag — genau die Zeit, in der abends noch Bögen ausgefüllt werden.

create or replace function public.campus_auswertung(
  von   date default (now() at time zone 'Europe/Berlin')::date,
  bis   date default (now() at time zone 'Europe/Berlin')::date,
  insel text default null
)
returns jsonb
language plpgsql
stable
security definer
set search_path = public, pg_temp
as $$
declare
  mindestmenge constant integer := 5;
  ergebnis jsonb;
begin
  if bis < von then
    raise exception 'Der Zeitraum endet vor seinem Beginn: % bis %', von, bis;
  end if;

  with im_zeitraum as (
    select *
      from public.campus_quiz_submissions q
     where (q.created_at at time zone 'Europe/Berlin')::date between von and bis
       and (insel is null or q.island = insel)
  ),
  je_insel as (
    select
      z.island                                        as insel,
      max(z.island_code)                              as code,
      count(*)                                        as einsendungen,
      count(distinct z.dealer_number) filter (where z.anonymized_at is null) as haendler,
      round(avg(z.percent))                           as schnitt_prozent,
      round(avg(z.duration_seconds))                  as schnitt_sekunden,
      count(*) filter (where z.percent = 100)         as fehlerfrei,
      count(*) filter (where z.percent < 60)          as unter_60_prozent
    from im_zeitraum z
    group by z.island
  )
  select jsonb_build_object(
    'zeitraum', jsonb_build_object('von', von, 'bis', bis, 'zeitzone', 'Europe/Berlin'),
    'insel_filter', insel,
    'stand', to_char(now() at time zone 'Europe/Berlin', 'YYYY-MM-DD"T"HH24:MI:SS'),
    'mindestmenge', mindestmenge,
    'gesamt', (
      select jsonb_build_object(
        'einsendungen', count(*),
        'haendler', count(distinct dealer_number) filter (where anonymized_at is null)
      ) from im_zeitraum
    ),
    'inseln', coalesce((
      select jsonb_agg(
        case
          -- Unter der Mindestmenge nur zählen, nicht bewerten. Ein Schnitt
          -- aus zwei Einsendungen ist keine Kennzahl, sondern eine Aussage
          -- über zwei Personen.
          when i.einsendungen < mindestmenge then jsonb_build_object(
            'insel', i.insel,
            'code', i.code,
            'einsendungen', i.einsendungen,
            'haendler', i.haendler,
            'kennzahlen_unterdrueckt', true,
            'grund', format('weniger als %s Einsendungen', mindestmenge)
          )
          else jsonb_build_object(
            'insel', i.insel,
            'code', i.code,
            'einsendungen', i.einsendungen,
            'haendler', i.haendler,
            'kennzahlen_unterdrueckt', false,
            'schnitt_prozent', i.schnitt_prozent,
            'schnitt_sekunden', i.schnitt_sekunden,
            'fehlerfrei', i.fehlerfrei,
            'unter_60_prozent', i.unter_60_prozent
          )
        end
        order by i.einsendungen desc
      ) from je_insel i
    ), '[]'::jsonb)
  )
  into ergebnis;

  return ergebnis;
end;
$$;

comment on function public.campus_auswertung(date, date, text) is
  'Aggregierte Quizkennzahlen für einen Zeitraum, ohne Namen, Händlernummern '
  'oder Session-IDs. Kennzahlen unter fünf Einsendungen werden unterdrückt. '
  'Tagesgrenzen in Europe/Berlin. Nur für service_role.';

-- Browserrollen dürfen die Funktion nicht aufrufen: Sie liest als
-- security definer an der Row Level Security vorbei.
revoke execute on function public.campus_auswertung(date, date, text)
  from public, anon, authenticated;
grant execute on function public.campus_auswertung(date, date, text)
  to service_role;


-- ---------------------------------------------------------------------------
-- 2. Kontrolle nach dem Einspielen
-- ---------------------------------------------------------------------------

-- Heute, alle Inseln:
-- select public.campus_auswertung();

-- Ein Tag, eine Insel:
-- select public.campus_auswertung('2026-11-04', '2026-11-04', 'vejro');

-- Ganzer Monat:
-- select public.campus_auswertung('2026-11-01', '2026-11-30');

-- Rechte prüfen — erwartet wird ausschliesslich service_role (und der
-- Eigentuemer postgres):
-- select grantee, privilege_type
--   from information_schema.routine_privileges
--  where routine_schema = 'public'
--    and routine_name = 'campus_auswertung';

commit;
