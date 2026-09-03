-- ===========================================================================
-- THITRONIK Campus 1.0 — vollständige Basis für ein leeres Supabase-Projekt
-- Zielprojekt: pstohdeknhgsywmogmiu (thitronik-campus, Frankfurt)
-- Erstellt: 2026-09-03
--
-- Dieses Skript ersetzt bei einer Neuinstallation NICHT die historischen
-- Migrationen des Feedbackbogens, sondern bildet deren aktuellen Zielzustand
-- ohne Altlasten ab. Es darf mehrfach ausgeführt werden.
--
-- Sicherheitsmodell:
--   - Rohdaten liegen ausschließlich in RLS-geschützten Tabellen.
--   - anon und authenticated erhalten weder Tabellen- noch View-Rechte.
--   - Nur die Netlify-Function darf die validierende RPC aufrufen.
--   - Langdock erhält später einen eigenen Endpunkt, nie Tabellenzugriff.
-- ===========================================================================


-- ---------------------------------------------------------------------------
-- 0. Sichere Vorgaben für künftig im public-Schema angelegte Objekte
-- ---------------------------------------------------------------------------

alter default privileges for role postgres in schema public
  revoke all on tables from anon, authenticated;
alter default privileges for role postgres in schema public
  revoke all on sequences from anon, authenticated;
alter default privileges for role postgres in schema public
  revoke execute on functions from public, anon, authenticated;


-- ---------------------------------------------------------------------------
-- 1. Feedback-Einsendungen
-- ---------------------------------------------------------------------------

create table if not exists public.campus_feedback (
  id                      uuid primary key default gen_random_uuid(),
  created_at              timestamptz not null default now(),
  submission_id           uuid not null unique,
  client_created_at       timestamptz,
  event_slug              text not null default 'campus-2026'
                            constraint campus_feedback_event_check
                            check (event_slug = 'campus-2026'),
  form_version            text not null
                            constraint campus_feedback_form_version_check
                            check (form_version = 'campus-2026-haendler-v14'),

  dealer_name             text not null
                            constraint campus_feedback_dealer_name_check
                            check (char_length(btrim(dealer_name)) between 2 and 160),
  dealer_number           text not null
                            constraint campus_feedback_dealer_number_check
                            check (dealer_number ~ '^[0-9]{5}$'),
  participant_name        text not null
                            constraint campus_feedback_participant_name_check
                            check (char_length(btrim(participant_name)) between 2 and 120),
  participant_areas       text[] not null default '{}'::text[],

  overall_rating          text
                            constraint campus_feedback_overall_check
                            check (overall_rating is null or overall_rating in
                              ('Sehr zufrieden', 'Zufrieden', 'Teils/teils',
                               'Eher unzufrieden', 'Unzufrieden')),
  recommendation          text
                            constraint campus_feedback_recommendation_check
                            check (recommendation is null or recommendation in
                              ('Ja, auf jeden Fall', 'Eher ja', 'Eher nein', 'Nein')),
  recommendation_reason   text,
  topic_wishes            text,
  team_mood               text,
  improvement_suggestions text,
  positive_aspects        text,
  additional_notes        text,
  island_choices          text[] not null default '{}'::text[],

  source                  text not null default 'thitronik-campus-feedback-v14'
                            constraint campus_feedback_source_check
                            check (source = 'thitronik-campus-feedback-v14'),
  is_test                 boolean not null default false,
  raw_payload             jsonb not null
                            constraint campus_feedback_payload_check
                            check (jsonb_typeof(raw_payload) = 'object')
);

comment on table public.campus_feedback is
  'Personenbezogene Rohdaten des Campus-Feedbackbogens. Kein Browser- oder '
  'Langdock-Zugriff; geschrieben ausschließlich über submit_campus_feedback.';

comment on column public.campus_feedback.dealer_number is
  'Fünfstellige Händlernummer als Zeichenkette. Bindeglied zum Wissenscheck.';

create index if not exists campus_feedback_created_idx
  on public.campus_feedback (created_at desc);
create index if not exists campus_feedback_dealer_number_idx
  on public.campus_feedback (dealer_number);
create index if not exists campus_feedback_form_version_idx
  on public.campus_feedback (form_version);


-- ---------------------------------------------------------------------------
-- 2. Einzelbewertungen des Feedbackbogens
-- ---------------------------------------------------------------------------

create table if not exists public.campus_feedback_ratings (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  feedback_id uuid not null references public.campus_feedback(id) on delete cascade,
  section_key text not null
                constraint campus_feedback_ratings_section_check
                check (char_length(btrim(section_key)) between 1 and 80),
  item_key    text not null
                constraint campus_feedback_ratings_item_check
                check (char_length(btrim(item_key)) between 1 and 100),
  item_label  text not null
                constraint campus_feedback_ratings_label_check
                check (char_length(btrim(item_label)) between 1 and 240),
  rating      smallint not null
                constraint campus_feedback_ratings_value_check
                check (rating between 1 and 5),
  comment     text
                constraint campus_feedback_ratings_comment_check
                check (comment is null or char_length(comment) <= 2000),
  constraint campus_feedback_ratings_feedback_item_key
    unique (feedback_id, item_key)
);

comment on table public.campus_feedback_ratings is
  'Einzelbewertungen zum Campus-Feedback. Note 5 ist ab v14 die beste Note; '
  'eine 5 braucht bewusst keinen Kommentar.';

create index if not exists campus_feedback_ratings_feedback_idx
  on public.campus_feedback_ratings (feedback_id);
create index if not exists campus_feedback_ratings_item_idx
  on public.campus_feedback_ratings (section_key, item_key);


-- ---------------------------------------------------------------------------
-- 3. Row Level Security und Rechte
--
-- RLS ist an, aber es gibt absichtlich keine Policy. Der öffentliche anon-Key
-- und angemeldete Browsernutzer kommen deshalb nicht an die Rohdaten.
-- ---------------------------------------------------------------------------

alter table public.campus_feedback enable row level security;
alter table public.campus_feedback_ratings enable row level security;

revoke all on public.campus_feedback from anon, authenticated;
revoke all on public.campus_feedback_ratings from anon, authenticated;

-- Der serverseitige Secret Key wird in Supabase auf service_role abgebildet.
-- Das ausdrückliche GRANT dokumentiert den beabsichtigten einzigen Datenweg.
grant select on public.campus_feedback to service_role;
grant select on public.campus_feedback_ratings to service_role;


-- ---------------------------------------------------------------------------
-- 4. Validierende RPC für die Netlify-Function submit-feedback
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

  if payload->>'eventSlug' <> 'campus-2026' then
    raise exception 'unknown eventSlug';
  end if;

  if payload->>'formVersion' <> 'campus-2026-haendler-v14' then
    raise exception 'unknown formVersion';
  end if;

  if payload->>'source' <> 'thitronik-campus-feedback-v14' then
    raise exception 'unknown source';
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
    recommendation_reason, raw_payload
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
-- 5. Skalenbewusste, aggregierte Feedback-Auswertung
-- ---------------------------------------------------------------------------

create or replace function public.campus_hoch_ist_gut(form_version text)
returns boolean
language sql
immutable
set search_path to ''
as $$
  select coalesce((regexp_match(form_version, 'v([0-9]+)$'))[1]::int >= 14, false);
$$;

create or replace function public.campus_note_einheitlich(
  form_version text,
  rating smallint
)
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

revoke execute on function public.campus_hoch_ist_gut(text)
  from public, anon, authenticated;
revoke execute on function public.campus_note_einheitlich(text, smallint)
  from public, anon, authenticated;
grant execute on function public.campus_hoch_ist_gut(text) to service_role;
grant execute on function public.campus_note_einheitlich(text, smallint) to service_role;

create or replace view public.campus_feedback_langdock_stats
with (security_invoker = on)
as
select
  f.form_version,
  r.section_key,
  r.item_key,
  max(r.item_label) as item_label,
  count(r.rating) as anzahl_bewertungen,
  round(avg(r.rating), 2) as durchschnitt_roh,
  public.campus_hoch_ist_gut(f.form_version) as hoch_ist_gut,
  round(avg(public.campus_note_einheitlich(f.form_version, r.rating)), 2)
    as durchschnitt_einheitlich,
  count(*) filter (
    where public.campus_note_einheitlich(f.form_version, r.rating) = 5
  ) as anzahl_beste_note,
  count(*) filter (
    where public.campus_note_einheitlich(f.form_version, r.rating) = 1
  ) as anzahl_schlechteste_note,
  count(r.comment) as anzahl_kommentare
from public.campus_feedback f
join public.campus_feedback_ratings r on r.feedback_id = f.id
where not f.is_test
group by f.form_version, r.section_key, r.item_key;

comment on view public.campus_feedback_langdock_stats is
  'Aggregierte Feedbackwerte ohne Namen, Händlernummern oder Freitexte. '
  'Langdock liest sie später nur über einen zusätzlich geschützten Endpunkt.';

revoke all on public.campus_feedback_langdock_stats from anon, authenticated;
grant select on public.campus_feedback_langdock_stats to service_role;


-- ---------------------------------------------------------------------------
-- 6. Kontrolle nach dem Einspielen
--
-- Die ausführbaren Prüfabfragen und ihre erwarteten Ergebnisse stehen in
-- SUPABASE-NEUAUFBAU.md. Sie bleiben aus dem Migrationslauf getrennt, damit
-- ein grünes Ergebnis nicht zwischen DDL-Meldungen übersehen wird.
-- ---------------------------------------------------------------------------
