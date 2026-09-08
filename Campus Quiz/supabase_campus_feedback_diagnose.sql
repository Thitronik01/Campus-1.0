-- ---------------------------------------------------------------------------
-- Warum antwortet `bereich=feedback` nicht?
--
-- Vier Abfragen, nur lesend. Kein `create`, kein `update`, kein `drop` — die
-- Datei darf jederzeit und mehrfach laufen. Einzufuegen in
-- Dashboard -> SQL Editor des Projekts `pstohdeknhgsywmogmiu`.
--
-- Hintergrund: Seit dem 7. September 2026 waehlt der Parameter `bereich` unter
-- vier Auswertungen. Drei davon antworten, `feedback` nicht. Der Weg dorthin
-- hat vier Stellen, an denen er reissen kann, und jede der vier Abfragen
-- unten prueft genau eine. Die erste, die etwas Unerwartetes meldet, ist die
-- Ursache — danach kann abgebrochen werden.
--
-- Was NICHT die Ursache sein kann, ist bereits geprueft:
--   * Der Action-Code kennt `feedback`, `feedbackbogen` und `bogen`.
--   * Die Edge Function fuehrt `feedback` in ihrer festen Bereichsliste und
--     ruft `campus_auswertung_feedback` ohne Inselparameter auf.
--   * Der Helfer `campus_note_einheitlich(text, smallint)` steht in der
--     Basismigration und ist `service_role` gewaehrt.
--   * Alle benutzten Spalten existieren in `campus_feedback` und
--     `campus_feedback_ratings`.
-- ---------------------------------------------------------------------------


-- 1. Gibt es die Funktion ueberhaupt?
--
-- Sie kam erst mit der Auswertungsmigration vom 7. September dazu. Lief nur
-- die aeltere Fassung, steht hier `campus_auswertung` allein — dann ist die
-- Migration nachzuziehen, und zwar die ganze Datei.
--
-- Erwartet werden VIER Zeilen.

select
  p.proname                                   as funktion,
  pg_get_function_identity_arguments(p.oid)   as parameter,
  p.prosecdef                                 as security_definer
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
  and p.proname like 'campus_auswertung%'
order by p.proname;


-- 2. Darf `service_role` sie ausfuehren?
--
-- Die Edge Function spricht die Datenbank als `service_role` an. Fehlt das
-- Recht, kommt ein Fehler zurueck, der nach einem Ausfall aussieht, aber
-- keiner ist.
--
-- Erwartet: eine Zeile mit `service_role` und `EXECUTE`.

select
  r.routine_name  as funktion,
  r.grantee,
  r.privilege_type
from information_schema.routine_privileges r
where r.routine_schema = 'public'
  and r.routine_name = 'campus_auswertung_feedback'
order by r.grantee;


-- 3. Liegen ueberhaupt Boegen da — und zaehlen sie mit?
--
-- Die Feedbackfunktion filtert `and not f.is_test`. Die Quizfunktionen tun
-- das NICHT. Ein Bogen, der beim Absenden als Test markiert wurde, ist damit
-- fuer `bereich=feedback` unsichtbar, waehrend die Quizzahlen ihn zeigen —
-- genau das Bild, das nach einem kaputten Feedbackbereich aussieht.
--
-- Sind `echte_boegen` und `bewertungen_echt` beide 0, ist nichts kaputt:
-- Dann gibt es schlicht nichts auszuwerten.

select
  count(*)                                        as boegen_gesamt,
  count(*) filter (where is_test)                 as davon_test,
  count(*) filter (where not is_test)             as echte_boegen,
  count(*) filter (where anonymized_at is not null) as anonymisiert,
  min((created_at at time zone 'Europe/Berlin')::date) as erster_tag,
  max((created_at at time zone 'Europe/Berlin')::date) as letzter_tag,
  (select count(*)
     from public.campus_feedback_ratings r
     join public.campus_feedback f on f.id = r.feedback_id
    where not f.is_test)                          as bewertungen_echt
from public.campus_feedback;


-- 4. Was gibt die Funktion tatsaechlich heraus?
--
-- Bewusst mit weitem Zeitraum, damit ein Bogen von gestern nicht durch die
-- Tagesgrenze faellt. `gesamt.boegen` muss zu `echte_boegen` aus Abfrage 3
-- passen.
--
-- Kommt hier ein Ergebnis, arbeitet die Datenbank richtig — dann liegt die
-- Ursache in Langdock, nicht hier. Siehe LANGDOCK-ANBINDUNG.md, Abschnitt
-- „Wenn es klemmt": Das Feld `bereich` der Action ist vom Typ Auswahl, und
-- seine Optionsliste wird in der Langdock-Oberflaeche gepflegt, nicht im
-- Code. Fehlt dort der Eintrag `feedback`, faellt die Action auf `inseln`
-- zurueck und liefert Inselzahlen statt Feedback.

select jsonb_pretty(
  public.campus_auswertung_feedback('2026-01-01'::date, '2026-12-31'::date)
) as feedback_auswertung;
