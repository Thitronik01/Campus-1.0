-- ===========================================================================
-- THITRONIK Campus 1.0 — Quiz-Ergebnisse
-- Projekt: mhzlayhnyqlxdyiceyqz (thitronik-profinder-quiz)
-- Erstellt: 2026-08-13
--
-- Legt eine NEUE Tabelle an. Die bestehende public.quiz_submissions (27 Zeilen
-- aus fehlerquiz-de und pro-finder-de) bleibt unangetastet — die beiden alten
-- Quizze laufen unverändert weiter.
--
-- Warum eine neue Tabelle statt Spalten anzuhängen:
-- quiz_submissions kennt weder Insel noch Händlernummer noch Tätigkeitsbereich
-- und trägt eine andere answers-Struktur. Sie nachträglich umzubauen hieße,
-- 27 bestehende Zeilen mit NULL-Werten zu füllen und jede Auswertung mit einer
-- Fallunterscheidung zu belasten.
--
-- Idempotent: mehrfaches Ausführen ist gefahrlos.
-- ===========================================================================


-- ---------------------------------------------------------------------------
-- 1. Tabelle
-- ---------------------------------------------------------------------------

create table if not exists public.campus_quiz_submissions (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),

  session_id        text not null unique,
  event             text not null default 'campus-2026'
                      check (event = 'campus-2026'),
  island            text not null
                      check (island in ('vejro','poel','hiddensee','samsoe',
                                        'fehmarn','usedom','langeland')),
  island_code       text not null default '',
  quiz_version      text not null default '1',
  engine_version    text not null default '',

  -- Teilnehmer. Die Händlernummer ist eine Ziffernfolge, keine Rechengröße —
  -- deshalb text. Eine führende Null darf nicht verloren gehen.
  participant       text not null check (char_length(btrim(participant)) between 2 and 120),
  dealer            text not null check (char_length(btrim(dealer)) between 2 and 160),
  dealer_number     text not null check (dealer_number ~ '^\d{5}$'),
  area              text not null default ''
                      check (area in ('','verkauf','werkstatt','verkauf-werkstatt',
                                      'leitung','sonstiges')),

  started_at        timestamptz not null,
  finished_at       timestamptz not null,
  duration_seconds  integer not null check (duration_seconds >= 0),

  score             integer not null check (score >= 0),
  incorrect         integer not null check (incorrect >= 0),
  total             integer not null check (total > 0),
  percent           integer not null check (percent between 0 and 100),

  shuffle_enabled   boolean not null default true,
  page_url          text not null default '',
  answers           jsonb  not null check (jsonb_typeof(answers) = 'array'),

  constraint campus_quiz_zeitfolge check (finished_at >= started_at),
  constraint campus_quiz_summe     check (score + incorrect = total)
);

comment on table public.campus_quiz_submissions is
  'Quiz-Ergebnisse der Campus-Schulungsinseln. Geschrieben ausschließlich von '
  'der Netlify-Function submit-quiz, die serverseitig gegen die Fragen-JSONs '
  'bewertet. Aus dem Browser ist kein Schreibzugriff möglich.';

comment on column public.campus_quiz_submissions.dealer_number is
  'Fünfstellige Händlernummer als Zeichenkette. Bindeglied zum Feedbackbogen.';


-- ---------------------------------------------------------------------------
-- 2. Indizes — auf die Spalten, nach denen ausgewertet wird
-- ---------------------------------------------------------------------------

create index if not exists campus_quiz_island_idx    on public.campus_quiz_submissions (island);
create index if not exists campus_quiz_dealer_nr_idx on public.campus_quiz_submissions (dealer_number);
create index if not exists campus_quiz_area_idx      on public.campus_quiz_submissions (area);
create index if not exists campus_quiz_created_idx   on public.campus_quiz_submissions (created_at desc);


-- ---------------------------------------------------------------------------
-- 3. Row Level Security
--
-- RLS an, aber bewusst KEINE Policy: damit kommt weder anon noch authenticated
-- an die Tabelle. Die Function schreibt mit dem Secret Key und umgeht RLS.
-- Das ist dasselbe Muster wie bei campus_feedback.
-- ---------------------------------------------------------------------------

alter table public.campus_quiz_submissions enable row level security;

revoke all on public.campus_quiz_submissions from anon, authenticated;


-- ---------------------------------------------------------------------------
-- 4. Auswertung: Ergebnisse pro Insel
-- ---------------------------------------------------------------------------

create or replace view public.campus_quiz_inseln as
select
  island,
  max(island_code)                                   as insel,
  count(*)                                           as einsendungen,
  count(distinct dealer_number)                      as haendler,
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
  round(avg((a->>'response_seconds')::numeric))               as schnitt_sekunden
from public.campus_quiz_submissions s
cross join lateral jsonb_array_elements(s.answers) as a
group by s.island, a->>'id', a->>'category', a->>'type'
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
-- Verbindung über die Händlernummer. Bis Abschnitt 1 der Feedbackbogen-
-- Migration (supabase_v14_migration.sql) eingespielt ist, steht die
-- Händlernummer dort ausschließlich im raw_payload — genau darauf greift
-- diese View zu. Nach der Migration kann auf die echte Spalte umgestellt
-- werden; bis dahin funktioniert sie so.
--
-- Nur v14-Feedback: ältere Bögen kennen die Händlernummer nicht.
-- ---------------------------------------------------------------------------

create or replace view public.campus_quiz_und_feedback as
with quiz as (
  select
    dealer_number,
    max(dealer)                    as haendler,
    count(*)                       as inseln_absolviert,
    round(avg(percent))            as quiz_schnitt
  from public.campus_quiz_submissions
  group by dealer_number
),
feedback as (
  select
    f.raw_payload->>'dealerNumber' as dealer_number,
    max(f.dealer_name)             as haendler_feedback,
    max(f.overall_rating)          as gesamteindruck,
    max(f.recommendation)          as weiterempfehlung,
    round(avg(r.rating)) filter (where r.section_key <> 'schulungsinseln')
                                   as feedback_schnitt
  from public.campus_feedback f
  left join public.campus_feedback_ratings r on r.feedback_id = f.id
  where f.form_version = 'campus-2026-haendler-v14'
    and f.is_test is not true
    and f.raw_payload->>'dealerNumber' ~ '^\d{5}$'
  group by f.raw_payload->>'dealerNumber'
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
  'ACHTUNG: liest die Händlernummer aus campus_feedback.raw_payload, weil '
  'Abschnitt 1 von supabase_v14_migration.sql noch nicht eingespielt ist.';


-- ---------------------------------------------------------------------------
-- 8. Kontrolle nach dem Einspielen
-- ---------------------------------------------------------------------------

-- select * from public.campus_quiz_inseln;
-- select * from public.campus_quiz_fragen limit 20;
-- select * from public.campus_quiz_taetigkeit;
-- select * from public.campus_quiz_und_feedback;

-- Prüfen, dass anon wirklich nicht drankommt:
-- select grantee, privilege_type
--   from information_schema.role_table_grants
--  where table_name = 'campus_quiz_submissions';
