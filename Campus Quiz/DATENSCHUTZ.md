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
| Verantwortlich | THITRONIK GmbH, Finkenweg 9–15, 24340 Eckernförde |
| Kontakt | `datenschutz@thitronik.de` |
| Aufsichtsbehörde | ULD Schleswig-Holstein, Kiel |

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

**THI bekommt keine Teilnehmerdaten.** Mitgeschickt werden die laufende Frage
und der bisherige Verlauf. Der voreingestellte Anymize-Endpunkt
`llm-anonymous` entfernt zusätzlich Personendaten, bevor die Anfrage das Modell
erreicht — Teilnehmer tippen dort Fahrzeug- und Kundenangaben ein.

---

## Offene Punkte

### 1. Speicherdauer — blockiert den Wirkbetrieb

Die Frist ist nicht festgelegt. Solange sie fehlt, steht im Hinweis unter
Abschnitt 6 ein auffälliger Kasten (`.ds-offen`), und der Campus darf keine
Daten im Wirkbetrieb erheben.

Vorschlag zur Entscheidung: personenbezogene Felder nach **sechs Monaten**
entfernen (`participant`, `dealer`, `dealer_number` sowie die Freitexte prüfen),
Kennzahlen anonymisiert behalten. Das deckt die Nachbereitung des Schulungstags
ab, ohne Namen ein Jahr lang mitzuführen.

Ist die Frist entschieden: Kasten aus `index.html` entfernen, Frist eintragen,
Fassung und Datum im Kopf der Seite hochzählen, hier nachtragen.

### 2. Auftragsverarbeiter belegen

Der Hinweis nennt Netlify, Supabase und Anymize. Was noch fehlt und nicht aus
dem Code kommen kann:

- Auftragsverarbeitungsvertrag nach Art. 28 DSGVO für jeden der drei
- Sitz des Anbieters und, falls außerhalb der EU, die Grundlage der
  Übermittlung (Standardvertragsklauseln, Angemessenheitsbeschluss)
- Ob die Angaben so in das Verzeichnis der Verarbeitungstätigkeiten übernommen
  werden

Die Datenbank selbst liegt in der Region Frankfurt am Main — das ist im
Supabase-Projekt festgelegt und in `SUPABASE-NEUAUFBAU.md` protokolliert.

### 3. Die Einwilligung wird nicht nachweisbar gespeichert

`privacyAccepted` steht im Profil im `localStorage` und geht **nicht** an den
Server. Art. 7 Abs. 1 DSGVO verlangt aber, dass der Verantwortliche die
Einwilligung nachweisen kann.

Der kleinste Weg dorthin: zwei Spalten in `campus_quiz_submissions` und
`campus_feedback` — Zeitpunkt der Einwilligung und die Fassung des
Hinweistextes, den der Teilnehmer gesehen hat. Beides liegt im Browser bereits
vor; es müsste nur in den Payload und durch die annehmenden Functions
durchgereicht werden. Eine eigene Migration, kein Nebenbei-Schritt.

### 4. Der Feedbackbogen hat kein eigenes Ankreuzfeld

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
select id, created_at, participant, dealer, dealer_number
  from public.campus_quiz_submissions
 where dealer_number = '00000'
   and participant ilike '%Nachname%';

select id, created_at, participant_name, dealer_name, dealer_number
  from public.campus_feedback
 where dealer_number = '00000'
   and participant_name ilike '%Nachname%';
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
| Cache-Regeln und Redirect | `tools/build-insel.js`, `datenschutzHeaders()` — **und die Wurzel-`netlify.toml`** |

Die Seite wird mit `no-cache` ausgeliefert. Eine geänderte Frist oder ein
neuer Auftragsverarbeiter muss sofort bei allen ankommen; ihr Stylesheet trägt
die Fassung im Namen und darf liegen bleiben.
