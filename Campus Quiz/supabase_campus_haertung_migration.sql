-- ===========================================================================
-- THITRONIK Campus 1.0 — Nachträgliche Härtung
-- Zielprojekt: pstohdeknhgsywmogmiu (thitronik-campus, Frankfurt)
-- Erstellt: 2026-09-03
--
-- Befund des Supabase-Security-Advisors nach dem Einspielen der
-- Aufbewahrungs- und Auswertungsmigration:
--
--   WARN  Function `public.rls_auto_enable()` can be executed by the `anon`
--         role as a `SECURITY DEFINER` function via /rest/v1/rpc/rls_auto_enable
--
-- Die Funktion stammt nicht aus diesem Repository. Sie hängt an einem
-- Event-Trigger und schaltet Row Level Security ein, sobald im Schema public
-- eine Tabelle angelegt wird — eine sinnvolle Einrichtung, aber ihre Rechte
-- standen auf der PostgreSQL-Vorgabe, und die heißt: PUBLIC darf ausführen.
--
-- Praktisch ausnutzen liesse sie sich kaum. Ihr Rumpf ruft
-- pg_event_trigger_ddl_commands() auf, und das bricht ausserhalb eines
-- Event-Triggers mit einem Fehler ab. Trotzdem wird sie hier verschlossen:
-- Im Campus gilt die Regel, dass anon und authenticated auf nichts Rechte
-- haben, was Rohdaten berührt. Eine Ausnahme, die "wahrscheinlich harmlos"
-- ist, bleibt eine Ausnahme — und die nächste Person müsste sie erneut
-- bewerten.
--
-- Der Entzug berührt den Event-Trigger nicht: Er feuert im Kontext des
-- auslösenden DDL-Befehls, nicht über die Data API.
--
-- Idempotent: mehrfaches Ausführen ist gefahrlos.
-- ===========================================================================

do $$
begin
  if exists (
    select 1
      from pg_proc p
      join pg_namespace n on n.oid = p.pronamespace
     where n.nspname = 'public'
       and p.proname = 'rls_auto_enable'
       and p.pronargs = 0
  ) then
    revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
    raise notice 'rls_auto_enable(): EXECUTE fuer public, anon, authenticated entzogen.';
  else
    raise notice 'rls_auto_enable() ist in diesem Projekt nicht vorhanden — nichts zu tun.';
  end if;
end;
$$;


-- ---------------------------------------------------------------------------
-- Kontrolle
-- ---------------------------------------------------------------------------
-- Erwartet wird eine ACL, die weder anon noch authenticated noch einen
-- Eintrag ohne Rollennamen (das ist PUBLIC) enthält:
--
-- select proname, array_to_string(proacl, ' | ')
--   from pg_proc p join pg_namespace n on n.oid = p.pronamespace
--  where n.nspname = 'public' and p.proname = 'rls_auto_enable';
--
-- Danach meldet der Security-Advisor unter
-- Dashboard -> Advisors -> Security nur noch die drei INFO-Zeilen
-- "RLS Enabled No Policy" — die sind gewollt: RLS ist aktiv, und es gibt
-- absichtlich keine Policy, die Browserrollen etwas freigäbe.
