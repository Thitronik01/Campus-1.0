# Supabase-Neuaufbau für den THITRONIK Campus

Stand: 3. September 2026

Diese Anleitung beschreibt die Erstinstallation des neuen, leeren
Supabase-Projekts. Sie ist zugleich das Betriebsprotokoll: Ein Schritt wird erst
als erledigt markiert, nachdem sein Ergebnis im Dashboard geprüft wurde.

## Festgelegter Zielstand

| | |
|---|---|
| Organisation | `Thitronik Campus` |
| Projektname | `thitronik-campus` |
| Projekt-ID | `pstohdeknhgsywmogmiu` |
| Projekt-URL | `https://pstohdeknhgsywmogmiu.supabase.co` |
| Region | Central EU (Frankfurt) |
| Angelegt | 3. September 2026 |
| Ausgangszustand | leer, Status `Healthy`, keine Migrationen |

Das frühere Projekt `mhzlayhnyqlxdyiceyqz` wird nicht übernommen. Seine Daten
waren Testdaten und bleiben im alten Projekt unangetastet. Die historischen
Dateien `Feedbackbogen/supabase_v11_migration.sql` und
`Feedbackbogen/supabase_v14_migration.sql` setzen Tabellen des alten Projekts
voraus und dürfen deshalb nicht als Erstinstallation im neuen Projekt laufen.

## Entscheidungen

- Feedback und Quiz beginnen ohne Altdaten.
- v14 gilt von Anfang an: Händlernummer ist Pflicht und Note 5 ist die beste.
- Die veraltete Regel „Note 5 braucht einen Kommentar“ wird nicht angelegt.
- RLS ist für jede Rohdatentabelle aktiv, ohne freigebende Policy.
- `anon` und `authenticated` erhalten keine Rechte auf Campus-Tabellen oder
  -Views.
- Der Netlify Secret Key bleibt ausschließlich in Netlify.
- Langdock liest weder Rohdaten noch Views direkt. Zwei neue, getrennt
  geschützte Edge Functions ersetzen später die Verbindungen zum Altprojekt.
- Datenschutzhinweis, lokaler Löschweg sowie Raten- und Herkunftsschutz werden
  vor dem produktiven Scharfschalten umgesetzt.
- Personenbezogene Angaben werden nach zwölf Monaten anonymisiert; die Frist
  wird von der Datenbank selbst durchgesetzt, nicht von Hand.

## Begriffe

**RLS (Row Level Security)** lässt PostgreSQL für jede Zeile prüfen, ob die
aufrufende Rolle sie lesen oder verändern darf. Im Campus gibt es bewusst keine
Policy für Browserrollen; dadurch ist für sie jede Rohdatenzeile gesperrt.

Der **anon-Key** ist der alte öffentliche Projektschlüssel und wird ohne
angemeldeten Benutzer auf die Rolle `anon` abgebildet. Der moderne Nachfolger
heißt Publishable Key; beide dürfen hier keine Campusdaten erreichen.

Der **Secret Key** ist ein serverseitiger Projektschlüssel, der auf
`service_role` abgebildet wird und RLS umgeht. Er gehört deshalb nie in eine
Datei, in Browser-Code, in ein Bildschirmfoto oder in diesen Chat.

Eine **RPC (Remote Procedure Call)** ist eine Datenbankfunktion, die über die
Supabase Data API aufgerufen wird. `submit_campus_feedback(jsonb)` validiert und
speichert das Feedback in einer Transaktion.

Eine **View** ist eine gespeicherte Abfrage. `security_invoker=on` bewirkt, dass
sie mit den Rechten des Aufrufers statt mit den Rechten ihres Besitzers läuft.

Eine **Edge Function** ist ein serverseitiger HTTPS-Endpunkt im
Supabase-Projekt. Sie wird später zur schmalen, anonymisierten Schnittstelle
zwischen den internen Views und Langdock.

## Dateien und Reihenfolge

1. `supabase_campus_basis_migration.sql`
   legt Feedbacktabellen, validierende RPC und die aggregierte Feedback-View an.
2. `supabase_campus_quiz_migration.sql`
   legt Quiztabelle und vier gemeinsame Auswertungs-Views an.
3. `supabase_campus_aufbewahrung_migration.sql`
   setzt die Aufbewahrungsfrist von zwölf Monaten durch: Spalte
   `anonymized_at`, die Aufräumroutine und der tägliche pg_cron-Job.
4. `supabase_campus_auswertung_migration.sql`
   legt die Auswertungsfunktion mit Zeitraum an. Erst für Schritt 5 nötig,
   nicht für den Schreibbetrieb.
5. `supabase_campus_haertung_migration.sql`
   entzieht `rls_auto_enable()` die öffentlichen Ausführungsrechte. Nachtrag
   zu einem Advisor-Befund, siehe Schritt 6.

Alle fünf Dateien sind idempotent: Nach einem vollständig erfolgreichen Lauf
dürfen sie erneut ausgeführt werden. Sie enthalten keinen `drop`, kein `delete`
und kein `truncate`. Bei einem Fehler wird nicht mit der nächsten Datei
weitergemacht; zuerst wird der vollständige Text aus dem SQL-Editor gesichert.

## Schritt 1 — Feedbackbasis

1. Im Supabase-Dashboard das Projekt `thitronik-campus` öffnen.
2. Links **SQL Editor** wählen und **New query** anklicken.
3. Den vollständigen Inhalt von `supabase_campus_basis_migration.sql`
   einfügen. Keine einzelne Passage auslassen.
4. Die Abfrage eindeutig benennen, zum Beispiel
   `2026-09-03 Campus Basisinstallation`.
5. **Run** anklicken.

Erwartet wird ein erfolgreicher Lauf ohne Fehlermeldung. Danach diese Abfrage in
einer neuen Query ausführen:

```sql
select tablename, rowsecurity
  from pg_tables
 where schemaname = 'public'
   and tablename in ('campus_feedback', 'campus_feedback_ratings')
 order by tablename;
```

Erwartet werden genau zwei Zeilen; `rowsecurity` ist beide Male `true`.

```sql
select table_name, grantee, privilege_type
  from information_schema.role_table_grants
 where table_schema = 'public'
   and table_name in ('campus_feedback', 'campus_feedback_ratings',
                      'campus_feedback_langdock_stats')
   and grantee in ('anon', 'authenticated');
```

Erwartet wird **keine Zeile**. Jede zurückgegebene Zeile bedeutet: stoppen.

```sql
select c.relname, c.reloptions
  from pg_class c
  join pg_namespace n on n.oid = c.relnamespace
 where n.nspname = 'public'
   and c.relkind = 'v'
   and c.relname = 'campus_feedback_langdock_stats';
```

Erwartet wird eine Zeile mit `security_invoker=on`.

```sql
select grantee, privilege_type
  from information_schema.routine_privileges
 where routine_schema = 'public'
   and routine_name = 'submit_campus_feedback'
 order by grantee, privilege_type;
```

Erwartet werden `postgres | EXECUTE` für die administrative Eigentümerrolle
und `service_role | EXECUTE` für die Netlify-Function. Eine Zeile für `PUBLIC`,
`anon` oder `authenticated` bedeutet: stoppen.

## Schritt 2 — Quiz und gemeinsame Views

Erst nach den vier erfolgreichen Kontrollen aus Schritt 1:

1. Im SQL-Editor eine neue Query öffnen.
2. Den vollständigen Inhalt von `supabase_campus_quiz_migration.sql` einfügen.
3. Die Query zum Beispiel `2026-09-03 Campus Quizinstallation` nennen.
4. **Run** anklicken.

Danach prüfen:

```sql
select tablename, rowsecurity
  from pg_tables
 where schemaname = 'public'
   and tablename in ('campus_feedback', 'campus_feedback_ratings',
                     'campus_quiz_submissions')
 order by tablename;
```

Erwartet werden genau drei Zeilen; `rowsecurity` ist dreimal `true`.

```sql
select table_name, grantee, privilege_type
  from information_schema.role_table_grants
 where table_schema = 'public'
   and table_name like 'campus_%'
   and grantee in ('anon', 'authenticated')
 order by table_name, grantee, privilege_type;
```

Erwartet wird **keine Zeile**. Andernfalls nicht weitermachen.

```sql
select c.relname, c.reloptions
  from pg_class c
  join pg_namespace n on n.oid = c.relnamespace
 where n.nspname = 'public'
   and c.relkind = 'v'
   and c.relname in ('campus_feedback_langdock_stats',
                     'campus_quiz_inseln', 'campus_quiz_fragen',
                     'campus_quiz_taetigkeit', 'campus_quiz_und_feedback')
 order by c.relname;
```

Erwartet werden fünf Zeilen, jeweils mit `security_invoker=on`.

```sql
select
  (select count(*) from public.campus_feedback) as feedback,
  (select count(*) from public.campus_feedback_ratings) as bewertungen,
  (select count(*) from public.campus_quiz_submissions) as quiz;
```

Im neuen Projekt werden dreimal `0` erwartet.

## Schritt 3 — Aufbewahrungsfrist scharfstellen

> **Erledigt am 3. September 2026.** `pg_cron` ließ sich aus der Migration
> heraus anlegen, der Umweg über das Dashboard war nicht nötig. Der Job steht:
> `campus-aufbewahrung | 30 3 * * * | active = true`, ausgeführt als
> `postgres` — also als Eigentümer der Funktion, was das fehlende
> `grant execute` erklärt und erlaubt.

Am 3. September 2026 entschieden: Personenbezogene Angaben werden **zwölf
Monate** nach der Einsendung entfernt. Der Datenschutzhinweis unter
`/datenschutz/` sagt das zu; dieser Schritt macht die Zusage wahr. Ohne ihn
steht dort ein Versprechen ohne Deckung.

1. Im SQL-Editor eine neue Query öffnen.
2. Den vollständigen Inhalt von `supabase_campus_aufbewahrung_migration.sql`
   einfügen.
3. Die Query zum Beispiel `2026-09-03 Campus Aufbewahrungsfrist` nennen.
4. **Run** anklicken.

`pg_cron` ist in diesem Projekt verfügbar, aber nicht aktiviert. Meldet der Lauf
`pg_cron liess sich nicht anlegen`, dann im Dashboard unter **Database →
Extensions** nach `pg_cron` suchen, einschalten und die Datei erneut ausführen.

Danach prüfen:

```sql
select jobid, jobname, schedule, active
  from cron.job
 where jobname = 'campus-aufbewahrung';
```

Erwartet wird genau eine Zeile: `30 3 * * *`, `active = true`. Keine Zeile
bedeutet, dass die Frist nicht läuft — dann stoppen und `pg_cron` nachziehen.

```sql
select table_name, column_name
  from information_schema.columns
 where table_schema = 'public'
   and column_name = 'anonymized_at'
 order by table_name;
```

Erwartet werden zwei Zeilen: `campus_feedback` und `campus_quiz_submissions`.

```sql
select grantee, privilege_type
  from information_schema.routine_privileges
 where routine_schema = 'public'
   and routine_name = 'campus_daten_anonymisieren'
 order by grantee;
```

Eine Zeile für `PUBLIC`, `anon` oder `authenticated` bedeutet: stoppen. Die
Routine räumt Rohdaten und umgeht als `security definer` die
Row Level Security.

```sql
select * from public.campus_daten_anonymisieren();
```

Im leeren Projekt werden zwei Zeilen mit jeweils `0` erwartet — nichts ist alt
genug. Der Aufruf ist gefahrlos: Er wirkt nur auf Einsendungen, die älter als
zwölf Monate sind und noch nicht geleert wurden.

## Schritt 4 — Netlify erst nach der Codehärtung

Die Datenbank allein nimmt noch keine produktiven Campusdaten an. Vor dem Setzen
der Netlify-Variablen werden Herkunftsprüfung, Ratenbegrenzung,
Datenschutzhinweis und der lokale Löschweg umgesetzt und über einen Pull Request
geprüft.

> Herkunftsprüfung und Ratenbegrenzung stehen (#91), der lokale Löschweg
> ebenfalls (#92). Der Datenschutzhinweis liegt unter `/datenschutz/`; ihm
> fehlt noch die Speicherdauer. Solange sie fehlt, bleiben die Variablen
> ungesetzt — siehe [`DATENSCHUTZ.md`](DATENSCHUTZ.md).

Danach werden in Netlify gesetzt:

| Variable | Wert |
|---|---|
| `SUPABASE_URL` | `https://pstohdeknhgsywmogmiu.supabase.co` |
| `SUPABASE_SECRET_KEY` | ein neuer Secret Key aus diesem Projekt |

Der Schlüssel wird in Supabase unter **Settings → API Keys** aufgerufen und in
Netlify unter **Site configuration → Environment variables** gespeichert. Er
wird weder hier dokumentiert noch in einen lokalen Testbefehl geschrieben.
Variablen wirken erst nach einem neuen Deploy; zuerst wird ein Deploy Preview
des Pull Requests verwendet.

## Schritt 5 — Langdock neu verbinden

Die vorhandenen Langdock-Plugins zeigen noch auf das Altprojekt:

- `THITRONIK Quiz-Auswertung` auf `/functions/v1/quiz-analytics`
- `THITRONIK Campus Feedback` auf `/functions/v1/campus-feedback-langdock`

Im neuen Projekt werden Endpunkte mit denselben klaren Aufgaben neu erstellt.
Sie erhalten voneinander getrennte Zugangswerte, damit ein einzelner Zugang
widerrufen werden kann. Diese Werte liegen nur in den Supabase Function Secrets
und in den Passwortfeldern der jeweiligen Langdock-Verbindung.

Die Endpunkte liefern keine Namen, Händlernummern, Session-IDs oder vollständige
Payloads. **Die Mindestmenge ist auf fünf Einsendungen festgelegt:** Darunter
nennt die Auswertung nur, wie viele es waren, und keine Kennzahlen. Ein
Durchschnitt aus zwei Einsendungen ist keine Kennzahl, sondern eine Aussage
über zwei Personen.

### 5a — Quiz-Auswertung einspielen — erledigt 03.09.2026

1. `supabase_campus_auswertung_migration.sql` im SQL-Editor ausführen. Sie legt
   `public.campus_auswertung(von, bis, insel)` an — aggregierte Quizkennzahlen
   für einen Zeitraum, Tagesgrenzen in Europe/Berlin.
2. Rechte prüfen:

```sql
select grantee, privilege_type
  from information_schema.routine_privileges
 where routine_schema = 'public'
   and routine_name = 'campus_auswertung'
 order by grantee;
```

Erwartet werden `postgres` und `service_role`. Eine Zeile für `PUBLIC`, `anon`
oder `authenticated` bedeutet: stoppen.

> **Falle:** `information_schema.routine_privileges` zeigt nur, was die
> *aufrufende* Rolle sehen darf. Im SQL-Editor läuft man als `postgres`, dort
> stimmt das Bild. Über einen Lesezugang — etwa den MCP-Server, der als
> `supabase_read_only_user` arbeitet — kommt dieselbe Abfrage leer zurück und
> sieht aus, als hätte niemand Rechte. Verlässlich ist die ACL selbst:
>
> ```sql
> select p.proname, array_to_string(p.proacl, ' | ') as acl
>   from pg_proc p join pg_namespace n on n.oid = p.pronamespace
>  where n.nspname = 'public' and p.proname = 'campus_auswertung';
> ```
>
> Erwartet wird `postgres=X/postgres | service_role=X/postgres`. Steht dort
> ein Eintrag ohne Rollennamen vor dem `=`, ist das `PUBLIC` — dann stoppen.

3. Probeabruf in einer neuen Query — im leeren Projekt kommt eine Antwort mit
   `einsendungen: 0` und leerer Inselliste zurück:

```sql
select public.campus_auswertung();
```

### 5b — Endpunkt ausrollen

> **Ausgerollt am 3. September 2026:** Version 1, Status `ACTIVE`,
> `verify_jwt = false`. **Das Function Secret fehlt noch** — ohne
> `CAMPUS_AUSWERTUNG_TOKEN` antwortet der Endpunkt auf jede Anfrage mit `503`
> „Der Endpunkt ist noch nicht eingerichtet", auch auf eine mit erfundenem
> Token. Geprüft, beides. Das ist der sichere Zustand: erreichbar, aber ohne
> jeden Zugriff auf Daten.

Die Funktion liegt im Repository unter
`Campus Quiz/supabase/functions/campus-auswertung/index.ts`. Sie wird mit
**abgeschaltetem JWT-Zwang** ausgerollt, weil sie ihr eigenes Token prüft:

```bash
supabase functions deploy campus-auswertung --no-verify-jwt --project-ref pstohdeknhgsywmogmiu
```

Dann einen Zugangswert erzeugen und hinterlegen. Er wird einmal angezeigt und
gehört danach nur in die Function Secrets und in das Passwortfeld der
Langdock-Verbindung — nicht in dieses Repository, nicht in einen Chat:

```bash
openssl rand -base64 32
supabase secrets set CAMPUS_AUSWERTUNG_TOKEN=<der erzeugte Wert> --project-ref pstohdeknhgsywmogmiu
```

Probe von einem Rechner aus:

```bash
curl -s -H "Authorization: Bearer <der erzeugte Wert>" \
  "https://pstohdeknhgsywmogmiu.supabase.co/functions/v1/campus-auswertung?insel=vejro"
```

Erwartet wird eine JSON-Antwort mit `zeitraum`, `gesamt` und `inseln`. Ohne den
Kopf `Authorization` muss `401` kommen — diese Probe gehört dazu, denn ein
offener Endpunkt fällt sonst erst auf, wenn Daten drin sind.

### 5c — Langdock verbinden

In Langdock einen HTTP Request auf
`https://pstohdeknhgsywmogmiu.supabase.co/functions/v1/campus-auswertung`
anlegen, mit dem Kopf `Authorization: Bearer <Wert>` und den optionalen
Parametern `von`, `bis` und `insel` (`JJJJ-MM-TT`, Inselkürzel wie `vejro`).
Ohne Zeitraum antwortet der Endpunkt für **heute**.

„Wie viele Händler haben heute VEJRØ gespielt?" beantwortet damit das Feld
`inseln[].haendler`; die Zahl ist `count(distinct dealer_number)` und zählt
Betriebe, nicht Personen. Wollte man Personen zählen, ginge das nur über
Namen — und die verlassen die Datenbank nicht.

Die Antwort nennt Zeitraum, Zeitzone, Datenstand und Mindestmenge mit, damit
eine Auswertung in Langdock ihre Grundlage angeben kann.

Der Feedback-Endpunkt folgt nach demselben Muster mit einem **eigenen** Token,
sobald der erste im Betrieb steht. Bis Endpunkte, Mindestmenge und
Antwortschema geprüft sind, werden die alten Langdock-Verbindungen nicht auf
das neue Projekt umgestellt.

## Schritt 6 — Advisor lesen, nicht überfliegen

Nach jeder Migration einmal **Dashboard → Advisors → Security** öffnen. Der
Lauf vom 3. September 2026 nach den Schritten 3 und 5 brachte zwei `WARN`:

> Function `public.rls_auto_enable()` can be executed by the `anon` role as a
> `SECURITY DEFINER` function via `/rest/v1/rpc/rls_auto_enable`

Die Funktion stammt nicht aus diesem Repository. Sie hängt an einem
Event-Trigger und schaltet RLS ein, sobald im Schema `public` eine Tabelle
entsteht — nützlich, aber ihre Rechte standen auf der PostgreSQL-Vorgabe, und
die heißt: `PUBLIC` darf ausführen. Ausnutzen ließe sie sich kaum, weil ihr
Rumpf `pg_event_trigger_ddl_commands()` aufruft und das außerhalb eines
Event-Triggers abbricht. Trotzdem entzogen: Im Campus gilt, dass `anon` und
`authenticated` auf nichts Rechte haben, was Rohdaten berührt. Eine Ausnahme,
die „wahrscheinlich harmlos" ist, müsste sonst jede nachfolgende Person erneut
bewerten.

`supabase_campus_haertung_migration.sql` erledigt das. Danach meldet der
Advisor nur noch drei `INFO`-Zeilen „RLS Enabled No Policy" für die
Rohdatentabellen — **die sind gewollt**: RLS ist aktiv, und es gibt
absichtlich keine Policy, die einer Browserrolle etwas freigäbe.

## Fehlerbehandlung

Bei jedem Fehler wird der exakte Text aus dem Supabase-SQL-Editor oder dem
Netlify-Function-Log festgehalten, bevor eine Ursache angenommen wird.

| Fehlerbild | Nächster Nachweis |
|---|---|
| SQL meldet `relation does not exist` | Dateiname und Reihenfolge prüfen; Basis muss vor Quiz laufen |
| Rechteabfrage liefert `anon` oder `authenticated` | nicht deployen; vollständige Ergebniszeilen sichern |
| View zeigt kein `security_invoker=on` | nicht deployen; Viewname und `reloptions` sichern |
| Netlify meldet 401 oder 403 | exakten Function-Log und HTTP-Status sichern; keine Schlüssel senden |
| PostgreSQL meldet `42501` | Rollen- und Objektname aus der Meldung sichern |
| Quiz wird mit 400 abgewiesen | Fragensatz-Version aus Log und Insel-JSON vergleichen |

Es gibt in dieser Anleitung keinen Rückbau per SQL. Ein Entfernen von Tabellen,
Spalten oder Daten braucht eine gesonderte Erklärung und die ausdrückliche
Freigabe mit „ja“.

## Betriebsprotokoll

| Datum | Schritt | Ergebnis |
|---|---|---|
| 03.09.2026 | Neues Projekt in Organisation `Thitronik Campus` angelegt | Healthy; ID `pstohdeknhgsywmogmiu`; leer |
| 03.09.2026 | Neuaufbau statt historischer v11-/v14-Kette beschlossen | Basismigration im Repository vorbereitet |
| 03.09.2026 | Basismigration im SQL-Editor | erfolgreich; zwei Tabellen mit RLS, keine öffentlichen Rechte, Feedback-View mit `security_invoker=on` |
| 03.09.2026 | Erster Lauf der Quizmigration | PostgreSQL `42809` an Zeile 205; `FILTER` war außerhalb von `avg(...)` geklammert; im Repository korrigiert |
| 03.09.2026 | Korrigierte Quizmigration im SQL-Editor | erfolgreich; Quiztabelle und vier Quiz-Views angelegt |
| 03.09.2026 | RLS und Rollenrechte geprüft | RLS auf allen drei Rohdatentabellen aktiv; keine Tabellenrechte für `anon` oder `authenticated` |
| 03.09.2026 | Eigenschaften der Auswertungs-Views geprüft | alle fünf Views mit `security_invoker=on` |
| 03.09.2026 | Leere Startbestände geprüft | Feedback `0`, Bewertungen `0`, Quiz `0` |
| 03.09.2026 | Herkunftsprüfung und Ratenbegrenzung | für Quiz und Feedback lokal geprüft; fehlender oder fremder `Origin` ergibt 403, überschrittenes Zeitfenster 429 |
| 03.09.2026 | Lokaler Löschweg | entfernt nach Bestätigung Profil, Inselfortschritt und Sende-Ausgang; Serverdaten, Arbeitskarten und THI-Verlauf bleiben getrennt |
| 03.09.2026 | Speicherdauer entschieden | zwölf Monate, danach Anonymisierung; Datenschutzhinweis unter `/datenschutz/` nennt sie |
| 03.09.2026 | Datenschutzhinweis veröffentlicht | live unter `https://thitronik-campus.netlify.app/datenschutz/`, Fassung 1.0 |
| 03.09.2026 | `SUPABASE_URL` und `SUPABASE_SECRET_KEY` in Netlify gesetzt | Schlüssel als Secret, ausschließlich im Kontext Production; Deploy Previews bleiben ohne Datenbank |
| 03.09.2026 | Deploy mit den Variablen | 15:16 Uhr, `Site is live`; Functions sehen die Werte seitdem |
| 03.09.2026 | Aufbewahrungs-Migration | erfolgreich; `anonymized_at` in beiden Rohdatentabellen, `pg_cron` angelegt, Job `campus-aufbewahrung` aktiv mit `30 3 * * *`, läuft als `postgres` |
| 03.09.2026 | Auswertungs-Migration | erfolgreich; ACL von `campus_auswertung` ist `postgres=X \| service_role=X`, kein Recht für `anon` oder `authenticated` |
| 03.09.2026 | Edge Function `campus-auswertung` ausgerollt | Version 1, Status ACTIVE, `verify_jwt = false`; ohne Function Secret antwortet sie `503` — geprüft mit und ohne erfundenes Token |
| 03.09.2026 | Security-Advisor nach den Migrationen | zwei WARN zu `public.rls_auto_enable()` (für `anon` und `authenticated` ausführbar, SECURITY DEFINER); Härtungsmigration eingespielt, danach nur noch die drei gewollten INFO-Zeilen „RLS Enabled No Policy" |
| offen | `CAMPUS_AUSWERTUNG_TOKEN` als Function Secret | ohne den Wert bleibt der Endpunkt bei `503` |
| offen | erster echter Durchlauf ohne `?demo=1` | Bestand am 03.09.2026 um 15:40 Uhr: Quiz `0`, Feedback `0` |
| offen | Deploy Preview der gehärteten Schreibfunktionen | noch nicht geprüft |
| offen | bewusster Produktivtest | noch nicht ausgeführt |
| offen | Langdock-Endpunkte und neue Verbindungen | noch nicht ausgeführt |
