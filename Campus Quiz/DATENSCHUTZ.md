# Datenschutz im Campus — Stand der Umsetzung

Stand: 3. September 2026

Diese Datei ist das Arbeitsprotokoll zum Datenschutz. Der Text, den Teilnehmer
sehen, steht in [`public/datenschutz/index.html`](public/datenschutz/index.html)
und ist unter `/datenschutz/` erreichbar. Hier steht, worauf er sich stützt,
was noch fehlt und wie ein Widerruf abgearbeitet wird.

---

## Entschieden

| | |
|---|---|
| Rechtsgrundlage | **Einwilligung**, Art. 6 Abs. 1 lit. a DSGVO |
| Erteilt | beim Anlegen des Profils, Ankreuzfeld `profile-privacy` |
| Speicherdauer | **zwölf Monate**, danach Anonymisierung — entschieden am 3. September 2026 |
| Verantwortlich | THITRONIK GmbH, Finkenweg 9–15, 24340 Eckernförde |
| Kontakt | `datenschutz@thitronik.de` |
| Aufsichtsbehörde | ULD Schleswig-Holstein, Kiel |
| Wirkbetrieb | frühestens November 2026; der Campus soll in rund zwei Monaten spielbar sein |
| Hinweis live seit | 3. September 2026, `https://thitronik-campus.netlify.app/datenschutz/` |
| Datenbank angeschlossen seit | 3. September 2026, 15:16 Uhr (Netlify-Variablen plus Deploy) |

Die Einwilligung deckt Wissenscheck **und** Feedbackbogen ab; der Wortlaut des
Ankreuzfeldes nennt beides. Vorher stand dort „Ich habe die
Datenschutzerklärung gelesen und bestätige …" — eine Kenntnisnahme, keine
Einwilligung. Wer sich auf Art. 6 Abs. 1 lit. a stützt, braucht eine
Willenserklärung, und die muss widerruflich sein.

---

## Was tatsächlich verarbeitet wird

Erhoben aus dem Code, nicht aus der Erinnerung. Wer Felder ändert, ändert auch
diese Tabelle **und** den Hinweistext.

| Wo | Felder | Quelle |
|---|---|---|
| `campus_quiz_submissions` | `participant`, `dealer`, `dealer_number`, `area`, Zeiten, Punktzahl, `answers` | `supabase_campus_quiz_migration.sql` |
| `campus_feedback` | Name, Betrieb, Händlernummer, Bereiche, Bewertungen, sechs Freitextfelder, `raw_payload` | `supabase_campus_basis_migration.sql` |
| `campus_feedback_ratings` | Einzelbewertungen, über `feedback_id` verknüpft | dieselbe Datei |
| Browser | `thitronik.campus.2026.participant`, `.done`, `.ausgang` | `public/assets/engine.js` |
| Browser | Entwurf des Feedbackbogens, Einträge der Arbeitskarte | `Feedbackbogen/app-v14.js`, `public/arbeitskarte/` |
| THI | laufende Frage und Gesprächsverlauf, kein Teilnehmerbezug | `public/assets/thi.js`, `netlify/functions/thi.mjs` |

**Das Profilfoto verlässt das Gerät nicht.** Es liegt verkleinert als Data-URL
im Profil im `localStorage`; `buildPayload()` in `engine.js` nimmt es nicht auf.

**Der Pilotweg über Netlify Forms speichert dieselben Klarnamen.** Fehlen
`SUPABASE_URL` und `SUPABASE_SECRET_KEY` in Netlify, antwortet `submit-quiz`
mit `503` und `fallback: "netlify_forms"`; die Engine legt Name, Betrieb,
Händlernummer, Bereich und alle Antworten dann im Formular
`campus-quiz-result` ab (`sendeNetlifyPilot()` in `engine.js`). Derselbe Weg
bleibt nach dem Anschließen als Notfallnetz bestehen, wenn die Datenbank
einmal nicht erreichbar ist. Deshalb nennt Abschnitt 8 des Hinweises ihn
ausdrücklich — und deshalb gehören Netlify-Forms-Einträge in dieselbe
Aufräumroutine wie die Datenbank: **die Frist von zwölf Monaten greift dort
nicht automatisch.** Wer den Pilotweg produktiv nutzt, muss die Einträge im
Netlify-Dashboard von Hand räumen.

**THI bekommt keine Teilnehmerdaten.** Mitgeschickt werden die laufende Frage
und der bisherige Verlauf. Der voreingestellte Anymize-Endpunkt
`llm-anonymous` entfernt zusätzlich Personendaten, bevor die Anfrage das Modell
erreicht — Teilnehmer tippen dort Fahrzeug- und Kundenangaben ein.

---

## Die Frist und wie sie durchgesetzt wird

**Zwölf Monate**, entschieden am 3. September 2026. Ein Jahr nach der
Einsendung fallen Name, Betrieb, Händlernummer und sämtliche Freitexte. Was
bleibt, sind Kennzahlen ohne Personenbezug — Punktzahl, Bewertungen, Dauer,
Insel, Tätigkeitsbereich.

Die Zeile wird also nicht gelöscht, sondern geleert. Der Zweck der Erhebung ist
die Schulungsplanung, und die lebt von Jahresvergleichen; eine gelöschte Zeile
nimmt der Auswertung eine Insel, ohne dem Datenschutz mehr zu geben. Sobald
Name, Betrieb, Händlernummer und Freitexte fort sind, ist niemand mehr
erkennbar.

**Die Freitexte gehen vollständig mit.** „Der Vortrag von Herrn X war zu
schnell" ist ein Personenbezug, den kein Spaltenname verrät — selektiv säubern
lässt sich das nicht.

Durchgesetzt wird die Frist von
[`supabase_campus_aufbewahrung_migration.sql`](supabase_campus_aufbewahrung_migration.sql):
eine Spalte `anonymized_at` je Rohdatentabelle, die Funktion
`public.campus_daten_anonymisieren()` und ein pg_cron-Job, der sie täglich um
03:30 UTC aufruft. Die Funktion ist `security definer` mit festem `search_path`
und für `anon` und `authenticated` gesperrt.

**Stand 3. September 2026: eingespielt und geprüft.** `pg_cron` ließ sich aus
der Migration heraus anlegen; der Job steht als
`campus-aufbewahrung | 30 3 * * * | active = true` und läuft als `postgres` —
also als Eigentümer der Funktion, weshalb sie ohne zusätzliches
`grant execute` auskommt. Zur Kontrolle:

```sql
select jobid, jobname, schedule, active from cron.job
 where jobname = 'campus-aufbewahrung';
```

Erwartet wird genau eine aktive Zeile. Kommt keine zurück, läuft die Frist
nicht — dann ist der Hinweistext unter `/datenschutz/`, Abschnitt 6, ein
Versprechen ohne Deckung.

Der erste Lauf greift in der Nacht auf den 4. September 2026 und findet nichts
vor: Die älteste Einsendung müsste vom September 2025 sein, und der Bestand
begann am 3. September 2026 bei null. Das ist Absicht — die Routine soll
laufen, bevor die erste Zeile entsteht, nicht erst, wenn sie gebraucht wird.

`tools/test-supabase-migration.js` prüft die Frist gegen den Text mit: Wer die
zwölf Monate im SQL ändert, fällt durch, bis die Seite nachgezogen ist.

---

## Offene Punkte

### 1. Auftragsverarbeiter belegen

Der Hinweis nennt Netlify, Supabase und Anymize. Was noch fehlt und nicht aus
dem Code kommen kann:

- Auftragsverarbeitungsvertrag nach Art. 28 DSGVO für jeden der drei
- Sitz des Anbieters und, falls außerhalb der EU, die Grundlage der
  Übermittlung (Standardvertragsklauseln, Angemessenheitsbeschluss)
- Ob die Angaben so in das Verzeichnis der Verarbeitungstätigkeiten übernommen
  werden

Die Datenbank selbst liegt in der Region Frankfurt am Main — das ist im
Supabase-Projekt festgelegt und in `SUPABASE-NEUAUFBAU.md` protokolliert.

### 2. Die Einwilligung wird nicht nachweisbar gespeichert

`privacyAccepted` steht im Profil im `localStorage` und geht **nicht** an den
Server. Art. 7 Abs. 1 DSGVO verlangt aber, dass der Verantwortliche die
Einwilligung nachweisen kann.

Der kleinste Weg dorthin: zwei Spalten in `campus_quiz_submissions` und
`campus_feedback` — Zeitpunkt der Einwilligung und die Fassung des
Hinweistextes, den der Teilnehmer gesehen hat. Beides liegt im Browser bereits
vor; es müsste nur in den Payload und durch die annehmenden Functions
durchgereicht werden. Eine eigene Migration, kein Nebenbei-Schritt.

### 3. Der Feedbackbogen hat kein eigenes Ankreuzfeld

Im Gesamtpaket ist das gedeckt: Wer den Bogen unter `/feedback/` öffnet, hat
das Profil samt Einwilligung bereits angelegt. Läuft der Bogen aber als eigene
Site aus `Feedbackbogen/netlify-v14/`, gibt es keine Einwilligung — dann fehlt
für die Feedbackdaten die Rechtsgrundlage.

Zu ändern wäre das in `Feedbackbogen/tools/build-index-v14.js`, nicht in der
erzeugten `index-v14.html`.

---

## Widerruf abarbeiten

Ein Widerruf kommt formlos an `datenschutz@thitronik.de`. Die betroffene Person
nennt Name, Händlernummer und Schulungstag.

1. Betroffene Zeilen suchen — im SQL-Editor des Supabase-Projekts:

```sql
-- '12345' und '%Nachname%' durch die Angaben aus der Nachricht ersetzen.
-- anonymized_at is null schliesst Zeilen aus, die nach zwoelf Monaten bereits
-- geleert wurden — sie tragen die Platzhalter 'anonymisiert' und '00000' und
-- saehen sonst wie ein Treffer aus.
select id, created_at, participant, dealer, dealer_number
  from public.campus_quiz_submissions
 where dealer_number = '12345'
   and participant ilike '%Nachname%'
   and anonymized_at is null;

select id, created_at, participant_name, dealer_name, dealer_number
  from public.campus_feedback
 where dealer_number = '12345'
   and participant_name ilike '%Nachname%'
   and anonymized_at is null;
```

2. Ergebnis mit der widerrufenden Person abgleichen, bevor gelöscht wird. Eine
   Händlernummer gehört einem Betrieb, nicht einer Person — in einem Betrieb
   sitzen mehrere Teilnehmer.

3. Löschen. `campus_feedback_ratings` hängt per `on delete cascade` an
   `campus_feedback` und geht automatisch mit:

```sql
delete from public.campus_quiz_submissions where id = '…';
delete from public.campus_feedback          where id = '…';
```

4. Den Vorgang mit Datum festhalten — Eingang, betroffene Zeilen, Ausführung.
   Ohne Nachweis der Löschung ist der Widerruf nicht belegt.

Lokale Daten löscht die Person selbst: der Knopf „Lokale Campusdaten löschen"
auf der Profilseite und im Campus-Menü.

---

## Wo der Hinweis eingebunden ist

| Ort | Datei |
|---|---|
| Ankreuzfeld im Profil | `public/index.html`, `.profile-consent` |
| Fußzeile der Profilseite | `public/index.html`, `.profile-footer` |
| Campus-Menü | `public/index.html`, `#menue-datenschutz` |
| Seite selbst | `public/datenschutz/index.html` |
| In jedes Paket kopiert | `tools/build-insel.js`, `kopiereDatenschutz()` |
| Frist in der Datenbank | `supabase_campus_aufbewahrung_migration.sql` |
| Frist wird mitgeprüft | `tools/test-supabase-migration.js` |
| Cache-Regeln und Redirect | `tools/build-insel.js`, `datenschutzHeaders()` — **und die Wurzel-`netlify.toml`** |

Die Seite wird mit `no-cache` ausgeliefert. Eine geänderte Frist oder ein
neuer Auftragsverarbeiter muss sofort bei allen ankommen; ihr Stylesheet trägt
die Fassung im Namen und darf liegen bleiben.
