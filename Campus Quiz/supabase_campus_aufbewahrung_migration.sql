-- ===========================================================================
-- THITRONIK Campus 1.0 — Aufbewahrungsfrist: zwölf Monate
-- Zielprojekt: pstohdeknhgsywmogmiu (thitronik-campus, Frankfurt)
-- Erstellt: 2026-09-03
--
-- Entschieden am 3. September 2026: Personenbezogene Angaben werden zwölf
-- Monate nach der Einsendung gelöscht. Was bleibt, sind Kennzahlen ohne
-- Personenbezug — Punktzahl, Bewertungen, Dauer, Insel, Tätigkeitsbereich.
--
-- Warum anonymisieren statt die Zeile zu löschen:
-- Der Zweck der Erhebung ist die Schulungsplanung, und die lebt von
-- Jahresvergleichen. Eine gelöschte Zeile nimmt der Auswertung eine Insel,
-- ohne dem Datenschutz mehr zu geben — sobald Name, Betrieb, Händlernummer
-- und Freitexte fort sind, ist niemand mehr erkennbar.
--
-- Warum die Freitexte mitgehen:
-- "Der Vortrag von Herrn X war zu schnell" ist ein Personenbezug, den kein
-- Spaltenname verrät. Freitexte lassen sich nicht selektiv säubern, also
-- fallen sie vollständig.
--
-- Idempotent: mehrfaches Ausführen ist gefahrlos. Kein drop, kein truncate.
-- Auf bereits anonymisierte Zeilen wirkt die Funktion nicht erneut.
-- ===========================================================================


-- ---------------------------------------------------------------------------
-- 1. Spalte, die den Vorgang festhält
-- ---------------------------------------------------------------------------
-- Ohne sie liefe die Aufräumroutine jede Nacht über dieselben alten Zeilen
-- und schriebe dieselben Platzhalter neu. Die Spalte ist zugleich der Nachweis
-- gegenüber der Aufsichtsbehörde, dass die Frist wirklich greift.

alter table public.campus_quiz_submissions
  add column if not exists anonymized_at timestamptz;

alter table public.campus_feedback
  add column if not exists anonymized_at timestamptz;

comment on column public.campus_quiz_submissions.anonymized_at is
  'Zeitpunkt der Anonymisierung nach zwölf Monaten. NULL heißt: noch mit Personenbezug.';
comment on column public.campus_feedback.anonymized_at is
  'Zeitpunkt der Anonymisierung nach zwölf Monaten. NULL heißt: noch mit Personenbezug.';


-- ---------------------------------------------------------------------------
-- 2. Die Aufräumroutine
-- ---------------------------------------------------------------------------
-- security definer, weil der Aufruf aus pg_cron unter einer Rolle läuft, die
-- keine Rechte auf den Rohdatentabellen hat — dieselbe Überlegung wie bei
-- submit_campus_feedback. search_path fest verdrahtet, damit die Funktion
-- nicht über ein untergeschobenes Schema umgelenkt werden kann.

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
  -- Quiz: Name, Betrieb und Händlernummer fort. answers bleibt — dort stehen
  -- Antwortnummern, keine Personendaten. Die Prüfbedingungen der Tabelle
  -- verlangen zwei bis 120 Zeichen und fünf Ziffern, deshalb Platzhalter
  -- statt leerer Zeichenketten.
  update public.campus_quiz_submissions
     set participant   = 'anonymisiert',
         dealer        = 'anonymisiert',
         dealer_number = '00000',
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

  -- campus_feedback_ratings bleibt unangetastet: dort stehen Abschnitt,
  -- Merkmal und Note. Der Bezug zur Person lief über campus_feedback und ist
  -- mit der Zeile oben erloschen.

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
-- 3. Täglicher Lauf
-- ---------------------------------------------------------------------------
-- pg_cron ist im Projekt verfügbar, aber standardmäßig nicht aktiviert. Der
-- Block legt die Erweiterung an und richtet den Job ein; fehlt das Recht dazu,
-- bricht er nicht ab, sondern sagt, was von Hand zu tun ist. Ein Datenschutz-
-- versprechen, das an einer fehlgeschlagenen Migration hängt, wäre schlimmer
-- als eines, das laut nach seiner letzten Handbewegung ruft.

do $$
begin
  if not exists (select 1 from pg_extension where extname = 'pg_cron') then
    begin
      create extension pg_cron with schema pg_catalog;
    exception when insufficient_privilege or feature_not_supported then
      raise notice 'pg_cron liess sich nicht anlegen. Im Dashboard unter Database -> Extensions einschalten und diese Datei erneut ausfuehren.';
      return;
    end;
  end if;

  perform cron.schedule(
    'campus-aufbewahrung',
    '30 3 * * *',
    'select public.campus_daten_anonymisieren()'
  );
  raise notice 'Job campus-aufbewahrung eingerichtet: taeglich 03:30 UTC.';
end;
$$;


-- ---------------------------------------------------------------------------
-- 4. Nachweis
-- ---------------------------------------------------------------------------
-- Nach dem Lauf prüfen. Erwartet wird eine Zeile mit dem Job und, solange
-- nichts alt genug ist, keine anonymisierte Einsendung.

-- select jobid, jobname, schedule, active from cron.job
--  where jobname = 'campus-aufbewahrung';

-- select count(*) filter (where anonymized_at is not null) as anonymisiert,
--        count(*)                                         as gesamt
--   from public.campus_quiz_submissions;

-- Einmal von Hand auslösen, etwa zur Abnahme:
-- select * from public.campus_daten_anonymisieren();

-- Zum Erproben mit einer künstlich kurzen Frist — nur im Testprojekt:
-- select * from public.campus_daten_anonymisieren(interval '0 seconds');
