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
      count(distinct z.dealer_number)                 as haendler,
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
        'haendler', count(distinct dealer_number)
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
