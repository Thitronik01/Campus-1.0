-- THITRONIK Campus Feedback v11
-- Bereits am 11.08.2026 auf dem Campus-Live-Projekt mhzlayhnyqlxdyiceyqz angewendet.
-- Dieses Skript liegt nur zur Dokumentation / Wiederherstellung bei.

alter table public.campus_feedback
  add column if not exists participant_areas text[] not null default '{}'::text[],
  add column if not exists island_choices text[] not null default '{}'::text[],
  add column if not exists recommendation_reason text,
  add column if not exists raw_payload jsonb;

-- Die bestehende RPC public.submit_campus_feedback(jsonb) wurde rückwärtskompatibel
-- erweitert. Tabellen bleiben RLS-geschützt; anon/authenticated erhalten nur EXECUTE
-- auf die validierende Security-Definer-Funktion.
