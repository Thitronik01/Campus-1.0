-- ===========================================================================
-- THITRONIK Campus Feedback v14
--
-- NOCH NICHT ANGEWENDET. Bitte vor dem Einspielen lesen.
-- Zielprojekt: mhzlayhnyqlxdyiceyqz (Live, enthaelt echte Einsendungen).
--
-- ###########################################################################
-- #  ABSCHNITT 0 IST PFLICHT VOR DEM DEPLOY.                                #
-- #  Ohne ihn weist die Datenbank JEDE v14-Einsendung ab. Nicht manche -    #
-- #  jede. Am 13.08.2026 gegen die Live-RPC nachgestellt und bestaetigt.    #
-- ###########################################################################
--
-- Drei Aenderungen aus v14 betreffen die Datenbank:
--
--   0. Der Check campus_feedback_ratings_grade_five_comment_check verlangt
--      bei rating = 5 einen Kommentar. Das war richtig, solange 5 die
--      SCHLECHTESTE Note war. In v14 ist 5 die beste, hat keinen
--      Kommentarzwang, und auch die Insel-Marker tragen rating = 5 ohne
--      Kommentar. Der Check muss weg. PFLICHT.
--
--   1. Neues Pflichtfeld Haendlernummer. Der Bogen sendet es als
--      payload->>'dealerNumber'. Hier geht ohne Migration nichts verloren:
--      der komplette Payload liegt ohnehin in campus_feedback.raw_payload.
--      Die Migration holt den Wert nur in eine eigene, abfragbare Spalte.
--      Optional, aber empfohlen.
--
--   2. Auswertung auf die gedrehte Skala nachziehen. Optional, aber ohne sie
--      liest man die Zahlen der beiden Jahrgaenge genau falsch herum.
--
-- Bestandsschutz: v11 bis v13 senden kein dealerNumber und laufen nach dem
-- Einspielen unveraendert weiter. Die Spalte ist nullable, und Abschnitt 0
-- entfernt nur eine Einschraenkung, fuegt keine hinzu.
-- ===========================================================================


-- ---------------------------------------------------------------------------
-- 0. PFLICHT: Kommentarzwang an der 5 aufheben
--
-- Der Check lautet:
--   CHECK ((rating IS DISTINCT FROM 5) OR (NULLIF(btrim(comment),'') IS NOT NULL))
--
-- Ersatzlos streichen, und zwar mit Absicht. Ein Check auf "Note 1 braucht
-- einen Kommentar" waere die naheliegende Spiegelung, ginge aber schief:
--
--   - campus_feedback_ratings kennt die form_version nicht, die steht am
--     Elterndatensatz. Die Tabelle kann also gar nicht unterscheiden, ob eine
--     1 in einer Zeile "beste" oder "schlechteste" bedeutet.
--   - Alte Zeilen haben rating = 1 als BESTNOTE ohne Kommentar, die
--     Insel-Marker bis v13 ebenfalls. Ein solcher Check liesse sich gegen den
--     Bestand nicht validieren und wuerde ausserdem einen noch laufenden
--     v13-Bogen abschiessen.
--
-- Die Kommentarpflicht ist ohnehin eine Bedienregel, keine Datenintegritaet.
-- Sie steht in app-v14.js (collectProblems) und gehoert dorthin: sie soll
-- Teilnehmende fuehren, nicht Datensaetze verhindern.
-- ---------------------------------------------------------------------------

alter table public.campus_feedback_ratings
  drop constraint if exists campus_feedback_ratings_grade_five_comment_check;


-- ---------------------------------------------------------------------------
-- 1. Haendlernummer
-- ---------------------------------------------------------------------------

alter table public.campus_feedback
  add column if not exists dealer_number text;

-- Genau fuenf Ziffern, fuehrende Nullen erlaubt. text und nicht integer:
-- 03451 waere als Zahl 3451 und damit eine andere Nummer.
--
-- Abwaegung: mit diesem Check scheitert eine Einsendung mit unsauberer Nummer
-- komplett, statt sie ohne Zuordnung zu speichern. Das ist Absicht - die
-- Nummer ist das Feld, ueber das ihr zuordnet, und ein stiller Verlust waere
-- schlechter als ein sichtbarer Fehler. Der Bogen laesst ohnehin nur Ziffern
-- zu. Wollt ihr lieber speichern statt abweisen, ersetzt den Check durch
-- einen Trigger, der unpassende Werte auf null setzt.
alter table public.campus_feedback
  drop constraint if exists campus_feedback_dealer_number_check;

alter table public.campus_feedback
  add constraint campus_feedback_dealer_number_check
  check (dealer_number is null or dealer_number ~ '^[0-9]{5}$');


-- ---------------------------------------------------------------------------
-- 2. RPC erweitern
--
-- Unveraendert gegenueber dem Bestand bis auf dealer_number an drei Stellen:
-- Spaltenliste, values-Liste und der on-conflict-Zweig. dealerNumber wird
-- absichtlich NICHT serverseitig erzwungen - sonst brechen aeltere Bogen-
-- Versionen. Die Pflicht steht im Formular. Soll sie auch hier gelten, genuegt
-- ein Block nach dem Muster von dealerName weiter oben.
-- ---------------------------------------------------------------------------

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

  if nullif(btrim(payload->>'dealerName'), '') is null then
    raise exception 'dealerName is required';
  end if;

  if nullif(btrim(payload->>'participantName'), '') is null then
    raise exception 'participantName is required';
  end if;

  if jsonb_typeof(payload->'ratings') <> 'array' then
    raise exception 'ratings must be an array';
  end if;

  if jsonb_array_length(payload->'ratings') > 40 then
    raise exception 'too many ratings';
  end if;

  if jsonb_typeof(payload->'participantAreas') = 'array' then
    select coalesce(array_agg(value), '{}'::text[])
      into participant_areas_value
      from jsonb_array_elements_text(payload->'participantAreas') as t(value);
  end if;

  if jsonb_typeof(payload->'islandChoices') = 'array' then
    select coalesce(array_agg(value), '{}'::text[])
      into island_choices_value
      from jsonb_array_elements_text(payload->'islandChoices') as t(value);
  end if;

  insert into public.campus_feedback (
    submission_id, client_created_at, event_slug, form_version, dealer_name,
    dealer_number,
    participant_name, overall_rating, recommendation, topic_wishes, team_mood,
    improvement_suggestions, positive_aspects, additional_notes, source,
    participant_areas, island_choices, recommendation_reason, raw_payload
  ) values (
    coalesce((payload->>'submissionId')::uuid, gen_random_uuid()),
    nullif(payload->>'createdClientAt', '')::timestamptz,
    coalesce(nullif(payload->>'eventSlug', ''), 'campus-2026'),
    coalesce(nullif(payload->>'formVersion', ''), 'campus-2026-netlify-supabase-v1'),
    btrim(payload->>'dealerName'),
    nullif(btrim(payload->>'dealerNumber'), ''),
    nullif(btrim(payload->>'participantName'), ''),
    nullif(payload->>'overallRating', ''),
    nullif(payload->>'recommendation', ''),
    nullif(btrim(payload->>'topicWishes'), ''),
    nullif(btrim(payload->>'teamMood'), ''),
    nullif(btrim(payload->>'improvementSuggestions'), ''),
    nullif(btrim(payload->>'positiveAspects'), ''),
    nullif(btrim(payload->>'additionalNotes'), ''),
    coalesce(nullif(btrim(payload->>'source'), ''), 'direct'),
    participant_areas_value,
    island_choices_value,
    nullif(btrim(payload->>'recommendationReason'), ''),
    payload
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
    raw_payload = excluded.raw_payload
  returning id into feedback_uuid;

  for rating_item in
    select value from jsonb_array_elements(payload->'ratings')
  loop
    insert into public.campus_feedback_ratings (
      feedback_id, section_key, item_key, item_label, rating, comment
    ) values (
      feedback_uuid,
      rating_item->>'sectionKey',
      rating_item->>'itemKey',
      rating_item->>'itemLabel',
      nullif(rating_item->>'rating', '')::smallint,
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


-- ---------------------------------------------------------------------------
-- 3. Skalenrichtung fuer die Auswertung
--
-- Ohne diesen Teil bleibt die Auswertung rechnerisch richtig, aber irrefuehrend:
-- die Spalte anzahl_note_1 zaehlt weiterhin Zeilen mit rating = 1 - fuer alte
-- Einsendungen die Bestnote, fuer v14 die schlechteste. Wer beide Jahrgaenge
-- nebeneinander legt, liest die Zahlen genau falsch herum.
-- ---------------------------------------------------------------------------

-- Welche Richtung gilt fuer eine form_version? Wird aus der Versionsnummer am
-- Ende des Strings abgeleitet, damit v15 und spaeter nicht wieder angefasst
-- werden muessen. Alles vor v14 gilt als "niedrig ist gut".
create or replace function public.campus_hoch_ist_gut(form_version text)
returns boolean
language sql
immutable
set search_path to ''
as $$
  select coalesce((regexp_match(form_version, 'v([0-9]+)$'))[1]::int >= 14, false);
$$;

-- Eine Note auf eine gemeinsame Achse bringen: 5 ist immer die beste.
-- Damit sind v11 und v14 zum ersten Mal direkt vergleichbar.
create or replace function public.campus_note_einheitlich(form_version text, rating smallint)
returns smallint
language sql
immutable
set search_path to ''
as $$
  select case
    when rating is null then null
    when public.campus_hoch_ist_gut(form_version) then rating
    else (6 - rating)::smallint
  end;
$$;

-- anzahl_note_1 und anzahl_note_5 bleiben erhalten und behalten ihre woertliche
-- Bedeutung ("so viele Zeilen mit dieser Ziffer"). Neu daneben stehen die
-- Spalten, die die Bedeutung tragen. Bestehende Abfragen brechen dadurch nicht.
create or replace view public.campus_feedback_langdock_stats as
 select f.form_version,
    r.section_key,
    r.item_key,
    max(r.item_label) as item_label,
    count(r.rating) as anzahl_bewertungen,
    round(avg(r.rating), 2) as durchschnitt,
    count(*) filter (where (r.rating = 1)) as anzahl_note_1,
    count(*) filter (where (r.rating = 5)) as anzahl_note_5,
    public.campus_hoch_ist_gut(f.form_version) as hoch_ist_gut,
    round(avg(public.campus_note_einheitlich(f.form_version, r.rating)), 2) as durchschnitt_einheitlich,
    count(*) filter (where public.campus_note_einheitlich(f.form_version, r.rating) = 5) as anzahl_beste_note,
    count(*) filter (where public.campus_note_einheitlich(f.form_version, r.rating) = 1) as anzahl_schlechteste_note,
    count(r.comment) as anzahl_kommentare
   from (public.campus_feedback f
     join public.campus_feedback_ratings r on ((r.feedback_id = f.id)))
  where (not f.is_test)
  group by f.form_version, r.section_key, r.item_key;


-- ---------------------------------------------------------------------------
-- Insel-Contest
--
-- Die Insel-Eintraege sind Marker, keine Urteile: jede gewaehlte Insel bekommt
-- dieselbe Zahl. Bis v13 war das die 1, ab v14 die 5 - beide Male die Bestnote
-- ihrer Skala. Wer bisher ueber anzahl_note_1 gezaehlt hat, zaehlt ab jetzt
-- besser ueber anzahl_beste_note; die Spalte meint in beiden Jahrgaengen
-- dasselbe. Am robustesten ist ohnehin, die Zeilen einfach zu zaehlen:
--
--   select item_label, count(*) as stimmen
--     from public.campus_feedback_langdock_ratings
--    where section_key = 'schulungsinseln'
--    group by item_label
--    order by stimmen desc;
-- ---------------------------------------------------------------------------


-- ---------------------------------------------------------------------------
-- Auswertungs-Views verschliessen
--
-- Dieselbe Luecke wie in supabase_campus_quiz_migration.sql, Abschnitt 7b:
-- Eine View laeuft mit den Rechten ihres Besitzers, und Supabase raeumt neuen
-- Objekten im Schema public per Voreinstellung Rechte fuer anon und
-- authenticated ein. Die Tabellen darunter sind RLS-geschuetzt — ueber die
-- Views waeren sie es nicht gewesen.
--
-- Zum Auswerten (Langdock) den Service Key oder eine eigene Rolle mit
-- ausdruecklichem GRANT verwenden.
-- ---------------------------------------------------------------------------

do $$
declare v record;
begin
  for v in
    select c.relname
      from pg_class c
      join pg_namespace n on n.oid = c.relnamespace
     where n.nspname = 'public'
       and c.relkind = 'v'
       and c.relname like 'campus_feedback_langdock%'
  loop
    execute format('alter view public.%I set (security_invoker = on)', v.relname);
    execute format('revoke all on public.%I from anon, authenticated', v.relname);
  end loop;
end $$;
