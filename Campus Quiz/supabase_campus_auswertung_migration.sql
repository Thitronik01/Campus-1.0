-- ===========================================================================
-- THITRONIK Campus 1.0 — Auswertung für Langdock
-- Zielprojekt: pstohdeknhgsywmogmiu (thitronik-campus, Frankfurt)
-- Erstellt: 2026-09-03, erweitert: 2026-09-07
--
-- Beantwortet Fragen mit Zeitraum: "Wie viele Händler haben heute die Insel
-- VEJRØ gespielt?" Die bestehenden Views können das nicht — sie fassen über
-- den gesamten Bestand zusammen und kennen keinen Tag.
--
-- Warum Funktionen und keine weiteren Views:
-- Eine View kann keinen Zeitraum entgegennehmen. Langdock müsste dann selbst
-- filtern und bekäme dafür Lesezugriff auf Tageszeilen — also faktisch auf
-- die Rohdaten. Eine Funktion nimmt den Zeitraum als Parameter und gibt nur
-- das Ergebnis zurück.
--
-- Vier Funktionen, ein Zuschnitt:
--   campus_auswertung             Kennzahlen je Insel        (Bereich inseln)
--   campus_auswertung_fragen      Trefferquote je Frage      (Bereich fragen)
--   campus_auswertung_taetigkeit  Verkauf gegen Werkstatt    (Bereich taetigkeit)
--   campus_auswertung_feedback    Feedbackbogen, aggregiert  (Bereich feedback)
--
-- Alle vier laufen als security definer mit festem search_path und sind
-- ausschliesslich für service_role ausführbar. Der Endpunkt
-- `campus-auswertung` wählt über den Parameter `bereich` aus.
--
-- Idempotent: mehrfaches Ausführen ist gefahrlos. Kein drop, kein delete.
-- Deshalb bleibt auch die Signatur von campus_auswertung(date, date, text)
-- unverändert. Ein vierter Parameter hätte eine ZWEITE Funktion neben der
-- alten erzeugt, statt sie zu ersetzen — und die alte bliebe für service_role
-- ausführbar, mit dem alten Rumpf. Der Bereich gehört deshalb in den
-- Funktionsnamen, nicht in die Parameterliste.
-- ===========================================================================


-- ---------------------------------------------------------------------------
-- 0. Die Mindestmenge
-- ---------------------------------------------------------------------------
-- Sie steht in jeder Funktion als Konstante im Rumpf und nicht als Parameter:
-- Wer sie von aussen setzen könnte, könnte sie auf 1 setzen und damit den
-- Schutz kleiner Gruppen abschalten.
--
-- Am 7. September 2026 auf 1 gesetzt — also praktisch aus. Der Grund war ein
-- gemessener: Bei 17 Einsendungen auf sieben Inseln lag JEDE Insel unter der
-- vorherigen Grenze von fünf, und der Langdock-Agent konnte auf keine einzige
-- Frage einen Schnitt nennen. Eine Auswertung, die auf alles schweigt, wird
-- nicht benutzt.
--
-- Was der Schritt kostet, steht hier, damit es niemand später neu herleiten
-- muss: Bei zwei Durchläufen auf einer Insel ist der "Durchschnitt" eine
-- Aussage über zwei namentlich bekannte Betriebe. Wer weiss, wer an der
-- Station war, liest deren Ergebnis mit. Deshalb steht `einsendungen` in
-- jeder Zeile neben der Kennzahl, und die Agentenanweisung verlangt, die
-- Grundlage bei kleinen Zahlen mitzunennen.
--
-- Zurückdrehen heisst: die Zahl in den vier Funktionen wieder hochsetzen. Der
-- Mechanismus darunter ist vollständig erhalten geblieben.
--
-- Zeitzone: created_at ist timestamptz, also UTC. "Heute" heisst für eine
-- Schulung in Eckernförde aber der Kalendertag in Europe/Berlin. Ohne die
-- Umrechnung fiele im Sommer alles zwischen 00:00 und 02:00 Ortszeit auf den
-- Vortag — genau die Zeit, in der abends noch Bögen ausgefüllt werden.


-- ---------------------------------------------------------------------------
-- 1. Bereich `inseln` — Kennzahlen je Schulungsinsel
-- ---------------------------------------------------------------------------

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
  mindestmenge constant integer := 1;
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
  ),
  ueber_alles as (
    select
      count(*)                                        as einsendungen,
      count(distinct z.dealer_number) filter (where z.anonymized_at is null) as haendler,
      round(avg(z.percent))                           as schnitt_prozent,
      round(avg(z.duration_seconds))                  as schnitt_sekunden,
      count(*) filter (where z.percent = 100)         as fehlerfrei,
      count(*) filter (where z.percent < 60)          as unter_60_prozent
    from im_zeitraum z
  )
  select jsonb_build_object(
    'bereich', 'inseln',
    'zeitraum', jsonb_build_object('von', von, 'bis', bis, 'zeitzone', 'Europe/Berlin'),
    'insel_filter', insel,
    'stand', to_char(now() at time zone 'Europe/Berlin', 'YYYY-MM-DD"T"HH24:MI:SS'),
    'mindestmenge', mindestmenge,
    -- Der Gesamtblock trägt jetzt eigene Kennzahlen. Vorher stand dort nur
    -- eine Anzahl: Über alle Inseln zusammen kamen genug Einsendungen für
    -- einen belastbaren Schnitt, herausgegeben wurde er trotzdem nie.
    'gesamt', (
      select case
        when u.einsendungen < mindestmenge then jsonb_build_object(
          'einsendungen', u.einsendungen,
          'haendler', u.haendler,
          'kennzahlen_unterdrueckt', true,
          'grund', format('weniger als %s Einsendungen', mindestmenge)
        )
        else jsonb_build_object(
          'einsendungen', u.einsendungen,
          'haendler', u.haendler,
          'kennzahlen_unterdrueckt', false,
          'schnitt_prozent', u.schnitt_prozent,
          'schnitt_sekunden', u.schnitt_sekunden,
          'fehlerfrei', u.fehlerfrei,
          'unter_60_prozent', u.unter_60_prozent
        )
      end from ueber_alles u
    ),
    'inseln', coalesce((
      select jsonb_agg(
        case
          -- Unter der Mindestmenge nur zählen, nicht bewerten. Der Zweig
          -- bleibt stehen, auch wenn die Grenze derzeit bei 1 liegt: Wer sie
          -- wieder hochsetzt, braucht nichts weiter zu tun.
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
  'Aggregierte Quizkennzahlen je Insel für einen Zeitraum, ohne Namen, '
  'Händlernummern oder Session-IDs. Tagesgrenzen in Europe/Berlin. '
  'Nur für service_role.';

-- Browserrollen dürfen die Funktion nicht aufrufen: Sie liest als
-- security definer an der Row Level Security vorbei.
revoke execute on function public.campus_auswertung(date, date, text)
  from public, anon, authenticated;
grant execute on function public.campus_auswertung(date, date, text)
  to service_role;


-- ---------------------------------------------------------------------------
-- 2. Bereich `fragen` — Trefferquote je Frage
-- ---------------------------------------------------------------------------
-- Die eigentliche Kernauswertung des Konzepts, und bis zum 7. September 2026
-- für Langdock nicht erreichbar: Die View campus_quiz_fragen gab es seit dem
-- Aufbau, nur führte kein Weg dorthin. Eine Frage, bei der viele danebenliegen,
-- zeigt präzise, welchen Punkt die Station schärfer betonen muss.
--
-- Ohne Inselfilter kommen nur die 25 schwächsten Fragen zurück. Nicht als
-- Schutz, sondern als Mengenbegrenzung: Der Katalog hat siebzig Fragen, und
-- siebzig Fragetexte in einer Antwort verdrängen im Chatfenster alles andere.
-- Wie viele es insgesamt sind, steht in der Antwort — wer alle braucht, fragt
-- je Insel.

create or replace function public.campus_auswertung_fragen(
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
  mindestmenge constant integer := 1;
  hoechstens   constant integer := 25;
  grenze       integer;
  ergebnis     jsonb;
begin
  if bis < von then
    raise exception 'Der Zeitraum endet vor seinem Beginn: % bis %', von, bis;
  end if;

  -- Mit Inselfilter sind es rund zehn Fragen; die passen vollständig.
  grenze := case when insel is null then hoechstens else 1000 end;

  with im_zeitraum as (
    select *
      from public.campus_quiz_submissions q
     where (q.created_at at time zone 'Europe/Berlin')::date between von and bis
       and (insel is null or q.island = insel)
  ),
  je_frage as (
    select
      z.island                                                as insel,
      max(z.island_code)                                      as code,
      a->>'id'                                                as frage_id,
      a->>'category'                                          as thema,
      a->>'type'                                              as fragetyp,
      min(a->>'prompt')                                       as frage,
      count(*)                                                as beantwortet,
      count(*) filter (where (a->>'is_correct')::boolean)     as richtig,
      round(
        100.0 * count(*) filter (where (a->>'is_correct')::boolean)
        / nullif(count(*), 0)
      )                                                       as prozent_richtig,
      round(avg((a->>'response_seconds')::numeric))           as schnitt_sekunden
    from im_zeitraum z
    cross join lateral jsonb_array_elements(z.answers) as a
    group by z.island, a->>'id', a->>'category', a->>'type'
  ),
  auswahl as (
    select * from je_frage
     order by prozent_richtig asc, beantwortet desc   -- schwierigste zuerst
     limit grenze
  )
  select jsonb_build_object(
    'bereich', 'fragen',
    'zeitraum', jsonb_build_object('von', von, 'bis', bis, 'zeitzone', 'Europe/Berlin'),
    'insel_filter', insel,
    'stand', to_char(now() at time zone 'Europe/Berlin', 'YYYY-MM-DD"T"HH24:MI:SS'),
    'mindestmenge', mindestmenge,
    'gesamt', jsonb_build_object(
      'einsendungen', (select count(*) from im_zeitraum),
      'fragen_mit_antworten', (select count(*) from je_frage),
      'angezeigt', (select count(*) from auswahl),
      'auswahl', case
        when (select count(*) from je_frage) > (select count(*) from auswahl)
          then format('die %s Fragen mit der niedrigsten Trefferquote; '
                      'für die vollständige Liste eine Insel angeben',
                      (select count(*) from auswahl))
        else 'alle Fragen des Zeitraums'
      end
    ),
    'fragen', coalesce((
      select jsonb_agg(
        case
          when f.beantwortet < mindestmenge then jsonb_build_object(
            'insel', f.insel,
            'code', f.code,
            'frage_id', f.frage_id,
            'thema', f.thema,
            'beantwortet', f.beantwortet,
            'kennzahlen_unterdrueckt', true,
            'grund', format('weniger als %s Antworten', mindestmenge)
          )
          else jsonb_build_object(
            'insel', f.insel,
            'code', f.code,
            'frage_id', f.frage_id,
            'thema', f.thema,
            'fragetyp', f.fragetyp,
            'frage', f.frage,
            'beantwortet', f.beantwortet,
            'richtig', f.richtig,
            'prozent_richtig', f.prozent_richtig,
            'schnitt_sekunden', f.schnitt_sekunden,
            'kennzahlen_unterdrueckt', false
          )
        end
        order by f.prozent_richtig asc, f.beantwortet desc
      ) from auswahl f
    ), '[]'::jsonb)
  )
  into ergebnis;

  return ergebnis;
end;
$$;

comment on function public.campus_auswertung_fragen(date, date, text) is
  'Trefferquote je Quizfrage für einen Zeitraum, schwierigste zuerst. Ohne '
  'Inselfilter auf 25 Fragen begrenzt. Keine Personendaten. '
  'Nur für service_role.';

revoke execute on function public.campus_auswertung_fragen(date, date, text)
  from public, anon, authenticated;
grant execute on function public.campus_auswertung_fragen(date, date, text)
  to service_role;


-- ---------------------------------------------------------------------------
-- 3. Bereich `taetigkeit` — Verkauf gegen Werkstatt
-- ---------------------------------------------------------------------------
-- Feinkörniger als die Inselauswertung: Eine Insel mit drei Einsendungen
-- zerfällt hier schnell in drei Gruppen zu je einer. Die Anzahl steht deshalb
-- in jeder Zeile, und die Agentenanweisung verlangt, sie mitzunennen.

create or replace function public.campus_auswertung_taetigkeit(
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
  mindestmenge constant integer := 1;
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
  je_gruppe as (
    select
      z.island                        as insel,
      max(z.island_code)              as code,
      case z.area
        when 'verkauf'           then 'Verkauf'
        when 'werkstatt'         then 'Werkstatt'
        when 'verkauf-werkstatt' then 'Verkauf und Werkstatt'
        when 'leitung'           then 'Betriebsleitung'
        when 'sonstiges'         then 'Sonstiges'
        else                          'Keine Angabe'
      end                             as taetigkeitsbereich,
      count(*)                        as einsendungen,
      count(distinct z.dealer_number) filter (where z.anonymized_at is null) as haendler,
      round(avg(z.percent))           as schnitt_prozent,
      round(avg(z.duration_seconds))  as schnitt_sekunden
    from im_zeitraum z
    group by z.island, z.area
  )
  select jsonb_build_object(
    'bereich', 'taetigkeit',
    'zeitraum', jsonb_build_object('von', von, 'bis', bis, 'zeitzone', 'Europe/Berlin'),
    'insel_filter', insel,
    'stand', to_char(now() at time zone 'Europe/Berlin', 'YYYY-MM-DD"T"HH24:MI:SS'),
    'mindestmenge', mindestmenge,
    'gesamt', jsonb_build_object(
      'einsendungen', (select count(*) from im_zeitraum),
      'gruppen', (select count(*) from je_gruppe)
    ),
    'gruppen', coalesce((
      select jsonb_agg(
        case
          when g.einsendungen < mindestmenge then jsonb_build_object(
            'insel', g.insel,
            'code', g.code,
            'taetigkeitsbereich', g.taetigkeitsbereich,
            'einsendungen', g.einsendungen,
            'kennzahlen_unterdrueckt', true,
            'grund', format('weniger als %s Einsendungen', mindestmenge)
          )
          else jsonb_build_object(
            'insel', g.insel,
            'code', g.code,
            'taetigkeitsbereich', g.taetigkeitsbereich,
            'einsendungen', g.einsendungen,
            'haendler', g.haendler,
            'schnitt_prozent', g.schnitt_prozent,
            'schnitt_sekunden', g.schnitt_sekunden,
            'kennzahlen_unterdrueckt', false
          )
        end
        order by g.insel, g.schnitt_prozent asc
      ) from je_gruppe g
    ), '[]'::jsonb)
  )
  into ergebnis;

  return ergebnis;
end;
$$;

comment on function public.campus_auswertung_taetigkeit(date, date, text) is
  'Quizschnitt je Tätigkeitsbereich und Insel für einen Zeitraum. Keine '
  'Personendaten. Nur für service_role.';

revoke execute on function public.campus_auswertung_taetigkeit(date, date, text)
  from public, anon, authenticated;
grant execute on function public.campus_auswertung_taetigkeit(date, date, text)
  to service_role;


-- ---------------------------------------------------------------------------
-- 4. Bereich `feedback` — der Feedbackbogen, aggregiert
-- ---------------------------------------------------------------------------
-- Die View campus_feedback_langdock_stats trägt seit dem Aufbau den Kommentar
-- "Langdock liest sie später nur über einen zusätzlich geschützten Endpunkt".
-- Dieses "später" ist der 7. September 2026; der Endpunkt ist derselbe
-- geworden. Die Begründung steht in LANGDOCK-ANBINDUNG.md, Abschnitt
-- "Ein Token statt zwei".
--
-- Freitexte gehen nicht heraus, nur ihre Anzahl. Das ist dieselbe Zusage wie
-- in der View: recommendation_reason, topic_wishes und die übrigen Felder
-- enthalten regelmässig Namen.
--
-- Skala: In v14 ist 5 die beste Note, bis v13 war es die schlechteste.
-- campus_note_einheitlich dreht die alten Jahrgänge, damit ein Vergleich über
-- beide Fassungen nicht genau falsch herum gelesen wird.

create or replace function public.campus_auswertung_feedback(
  von date default (now() at time zone 'Europe/Berlin')::date,
  bis date default (now() at time zone 'Europe/Berlin')::date
)
returns jsonb
language plpgsql
stable
security definer
set search_path = public, pg_temp
as $$
declare
  mindestmenge constant integer := 1;
  ergebnis jsonb;
begin
  if bis < von then
    raise exception 'Der Zeitraum endet vor seinem Beginn: % bis %', von, bis;
  end if;

  with boegen as (
    select f.*
      from public.campus_feedback f
     where (f.created_at at time zone 'Europe/Berlin')::date between von and bis
       and not f.is_test
  ),
  bewertungen as (
    select
      b.form_version,
      r.section_key,
      r.item_key,
      r.item_label,
      r.rating,
      r.comment,
      public.campus_note_einheitlich(b.form_version, r.rating) as note
    from boegen b
    join public.campus_feedback_ratings r on r.feedback_id = b.id
  ),
  je_position as (
    select
      w.section_key                       as abschnitt,
      w.item_key                          as position,
      max(w.item_label)                   as bezeichnung,
      count(*)                            as anzahl,
      round(avg(w.note), 2)               as schnitt,
      count(*) filter (where w.note = 5)  as beste_note,
      count(*) filter (where w.note = 1)  as schlechteste_note,
      count(w.comment)                    as anzahl_kommentare
    from bewertungen w
    group by w.section_key, w.item_key
  )
  select jsonb_build_object(
    'bereich', 'feedback',
    'zeitraum', jsonb_build_object('von', von, 'bis', bis, 'zeitzone', 'Europe/Berlin'),
    'stand', to_char(now() at time zone 'Europe/Berlin', 'YYYY-MM-DD"T"HH24:MI:SS'),
    'mindestmenge', mindestmenge,
    'skala', jsonb_build_object(
      'von', 1,
      'bis', 5,
      'bedeutung', '5 ist die beste Note',
      'hinweis', 'Ältere Bögen wurden auf diese Richtung umgerechnet.'
    ),
    'gesamt', jsonb_build_object(
      'boegen', (select count(*) from boegen),
      'bewertungen', (select count(*) from bewertungen),
      -- Der Abschnitt schulungsinseln trägt keine Noten, sondern markiert,
      -- welche Insel besucht wurde. Er gehört nicht in einen Gesamtschnitt.
      'schnitt_ohne_inselmarker', (
        select round(avg(w.note), 2) from bewertungen w
         where w.section_key <> 'schulungsinseln'
      ),
      'gesamteindruck', coalesce((
        select jsonb_object_agg(x.wert, x.anzahl) from (
          select coalesce(b.overall_rating, 'Keine Angabe') as wert, count(*) as anzahl
            from boegen b group by 1
        ) x
      ), '{}'::jsonb),
      'weiterempfehlung', coalesce((
        select jsonb_object_agg(x.wert, x.anzahl) from (
          select coalesce(b.recommendation, 'Keine Angabe') as wert, count(*) as anzahl
            from boegen b group by 1
        ) x
      ), '{}'::jsonb)
    ),
    'positionen', coalesce((
      select jsonb_agg(
        jsonb_build_object(
          'abschnitt', p.abschnitt,
          'position', p.position,
          'bezeichnung', p.bezeichnung,
          'anzahl_bewertungen', p.anzahl,
          'schnitt', p.schnitt,
          'beste_note', p.beste_note,
          'schlechteste_note', p.schlechteste_note,
          'anzahl_kommentare', p.anzahl_kommentare,
          'ist_inselmarker', p.abschnitt = 'schulungsinseln',
          'kennzahlen_unterdrueckt', p.anzahl < mindestmenge
        )
        order by p.schnitt asc, p.anzahl desc   -- schwächste Position zuerst
      ) from je_position p
    ), '[]'::jsonb),
    'freitexte', jsonb_build_object(
      'herausgegeben', false,
      'grund', 'Freitexte enthalten regelmässig Namen und verlassen die Datenbank nicht.'
    )
  )
  into ergebnis;

  return ergebnis;
end;
$$;

comment on function public.campus_auswertung_feedback(date, date) is
  'Aggregierte Feedbackwerte für einen Zeitraum, auf einheitlicher Skala, '
  'ohne Namen, Händlernummern und ohne Freitexte. Nur für service_role.';

revoke execute on function public.campus_auswertung_feedback(date, date)
  from public, anon, authenticated;
grant execute on function public.campus_auswertung_feedback(date, date)
  to service_role;


-- ---------------------------------------------------------------------------
-- 5. Kontrolle nach dem Einspielen
-- ---------------------------------------------------------------------------

-- Heute, alle Inseln:
-- select public.campus_auswertung();

-- Ein Tag, eine Insel:
-- select public.campus_auswertung('2026-11-04', '2026-11-04', 'vejro');

-- Ganzer Monat:
-- select public.campus_auswertung('2026-11-01', '2026-11-30');

-- Die schwierigsten Fragen eines Monats:
-- select public.campus_auswertung_fragen('2026-11-01', '2026-11-30');

-- Verkauf gegen Werkstatt auf einer Insel:
-- select public.campus_auswertung_taetigkeit('2026-11-01', '2026-11-30', 'usedom');

-- Feedback eines Schulungstages:
-- select public.campus_auswertung_feedback('2026-11-04', '2026-11-04');

-- Rechte prüfen — erwartet wird ausschliesslich service_role (und der
-- Eigentuemer postgres):
-- select routine_name, grantee, privilege_type
--   from information_schema.routine_privileges
--  where routine_schema = 'public'
--    and routine_name like 'campus_auswertung%'
--  order by routine_name, grantee;
