# THITRONIK Campus Feedbackbogen

Feedbackbogen für Händlerinnen und Händler zum THITRONIK Campus 2026.
Statische Seite, kein Framework, Speicherung über eine Supabase-RPC.

---

## Vier Varianten

Im Repo liegen vier lauffähige Stände nebeneinander. Produktiv ist aktuell **v11**.

| Variante | Einstieg | Form |
|---|---|---|
| **v11** | `index.html` | Ursprünglicher Stand, aktuell live |
| **v12** | `index-v12.html` | Neugestaltung als eine lange Seite |
| **v13** | `index-v13.html` | Schritt für Schritt, sechs Panels, mobile first |
| **v14** | `index-v14.html` | Wie v13, aber **5 ist die beste Note** und die Händlernummer ist Pflicht |

Umstellen heißt: die gewünschte Datei zu `index.html` machen. `styles-*` und
`app-*` tragen die Versionsnummer absichtlich im Dateinamen, damit kein alter
Browser- oder CDN-Cache greift.

### Was v12 und v13 gegenüber v11 ändern

- Fehlendes Hero-Bild auf Smartphones behoben (`campus-hero-1280.webp` existierte nie)
- Bildlast von 9,5 MB auf 327 KB, alle Bilder als WebP in passenden Größen
- Skalen-Beschriftung „sehr gut / verbesserungswürdig" bleibt auf jedem Gerät sichtbar
- Pflichtkommentar nur noch bei Note 5, nicht mehr bei Note 1
- Automatisch gespeicherter Entwurf im `localStorage`
- Fehlerliste mit Sprunglinks statt flüchtiger Browser-Blasen
- Danke-Ansicht als echter Dialog mit `inert`-gesperrtem Hintergrund
- CSS von 1773 auf rund 800 Zeilen, eine `:root` statt drei widersprüchlichen

### Zusätzlich in v13

- Startbildschirm, danach ein Abschnitt pro Bildschirm
- Prüfung beim Weitergehen statt erst beim Absenden
- Browser-Zurück funktioniert, jeder Schritt hat eine eigene Adresse (`#schritt-3`)
- Segment-Fortschrittsanzeige, erledigte Schritte sind anklickbar
- Campus-Inseln: höchstens drei Favoriten, Rangfolge nach Auswahlreihenfolge

### Überarbeitung v13.1

Behobene Fehler:

- Der Zähler im Kopf stand dauerhaft auf `0 von 17 beantwortet`. Er hing an
  einem Balken-Element, das es seit der Segmentanzeige nicht mehr gibt, und
  brach die Funktion vor der Aktualisierung ab.
- Jeder Schrittwechsel scrollte animiert nach oben statt zu springen.
  `scrollTo({behavior:'auto'})` bedeutet laut Spezifikation "nimm das CSS
  scroll-behavior", und das steht auf `smooth`.
- Auf 320 px ragte „Feedback absenden" 27 px über die Schrittleiste hinaus.
- Der Sprunglink zeigte auf ein zu diesem Zeitpunkt verstecktes Panel und tat
  nichts. Zusätzlich zog der Seitenaufbau den Fokus auf das Panel, wodurch der
  Sprunglink gar nicht mehr per Tabulator erreichbar war.
- Das Wiederherstellen eines Entwurfs richtete alle Bewertungszeilen ein
  zweites Mal ein und hängte damit doppelte Listener an jedes Feld.
- Die Schritt-Segmente waren 15 px hoch und verfehlten damit die 24 px aus
  WCAG 2.2 (2.5.8). Jetzt 24 px Trefferfläche bei unverändert 5 px Balken.

Gestaltung:

- Eingabefelder sind weiß mit Rahmen statt grau gefüllt. Grau ist die Farbe
  der Seitenfläche, gefüllte Felder auf weißer Karte lasen sich als gesperrt.
- „Pflicht" nicht mehr in Rot. Rot ist hier die Fehlerfarbe.
- „Nicht beurteilt" steht links an der Zeilenkante statt rechts unter dem
  Anker „verbesserungswürdig", wo es wie ein Anhängsel der Note 5 aussah.
- Auf breiten Schirmen stehen Skala und „Nicht beurteilt" nebeneinander. Das
  schließt die tote Fläche am rechten Kartenrand. Schritt 3 ist bei 1280 px
  dadurch von 1657 auf 1324 Pixel Seitenhöhe geschrumpft.
- Die Bereichsauswahl hat Kästchen. Ohne sie sahen die Felder aus wie Knöpfe,
  bei denen eine Wahl die vorige ersetzt.
- Bei den Inseln gab es zwei Zahlensysteme nebeneinander: eine feste Nummer
  1 bis 8 pro Zeile und die Platzierung 1 bis 3. Die feste Nummer ist weg, an
  ihrer Stelle steht jetzt der eigene Rang.
- Schrittwechsel, aufklappende Kommentarfelder und Rangmarken blenden kurz
  auf (190–200 ms, `ease-out`). Bei `prefers-reduced-motion` entfällt das.

---

## v14

Baut auf v13 auf. Drei Änderungen, eine davon reicht bis in die Datenbank.

### Die Notenskala ist umgedreht

**5 ist ab v14 die beste Note, 1 die schlechteste.** Bis v13 war es umgekehrt.

Die Ziffern stehen weiter aufsteigend von links nach rechts; es wandern nur die
Anker mit („verbesserungswürdig" links, „sehr gut" rechts). Eine absteigende
Reihe 5–4–3–2–1 wäre die zweite Umgewöhnung in derselben Änderung gewesen.

Mitgewandert ist alles, was an der Richtung hängt:

- **Die Farben.** Die 5 trägt jetzt Lime, die 1 trägt Rot, und die zugehörige
  Kommentarbox ist entsprechend getönt. Bis v13 hingen diese Regeln an
  `:first-child` und `:last-child` — an der Position statt an der Bedeutung.
  Deshalb blieben sie beim Drehen der Skala stehen. Jetzt sind sie über
  `input[value="1"]` und `input[value="5"]` angesprochen und wandern von allein
  mit, falls die Reihenfolge je wieder angefasst wird.

- Der Pflichtkommentar hängt jetzt an der **1**. An der 5 öffnet sich weiterhin
  ein Feld, aber als freiwillige Einladung. Eine Pflichtbegründung für die
  Bestnote treibt Teilnehmende systematisch auf die zweitbeste Note aus.
- Die Insel-Einträge im Payload tragen `rating: 5` statt `rating: 1`. Sie sind
  Marker, keine Urteile — aber eine Lieblingsinsel mit der schlechtesten Note
  zu markieren wäre im Bestand nicht mehr lesbar.
- Der Entwurf im `localStorage` liegt unter einem eigenen Schlüssel. Ein
  liegengebliebener v13-Entwurf enthält Noten der alten Richtung; unter
  demselben Schlüssel wiederhergestellt würde aus einer 1 („war sehr gut")
  stillschweigend die schlechteste Bewertung.

Farbe tragen weiterhin **nur die beiden Endpunkte**. Lime und Rot sind laut
Markenpalette „sehr sparsam" einzusetzen, und eine durchgefärbte Skala bräuchte
Zwischentöne in Orange und Gelb, die es in der Palette nicht gibt. Die Bedeutung
hängt ohnehin nicht an der Farbe allein — Ziffer, Anker und `aria-label` sagen
dasselbe, die Farbe bestätigt nur (WCAG 1.4.1). Gemessen am fertigen Feld:
Lime auf Ink 10,1:1, Rot auf Weiß 5,6:1, beides über AA.

**Gespeichert wird, was angekreuzt wurde.** Es wird nichts zurückgerechnet.
Damit die Auswertung alte und neue Einsendungen nicht in einen Topf wirft,
tragen v14-Zeilen `form_version = campus-2026-haendler-v14` und
`source = thitronik-campus-feedback-v14`; die Views gruppieren nach
`form_version`. Wer diese Strings zurückdreht, mischt zwei Bedeutungen in
einer Spalte.

### Händlernummer als drittes Pflichtfeld

Fünf Ziffern, geprüft gegen `^\d{5}$`. Händlerbetrieb und Name bleiben Pflicht.

- `type="text"` mit `inputmode="numeric"`, nicht `type="number"`: eine
  Händlernummer ist eine Ziffernfolge, keine Rechengröße. `type="number"` würde
  eine führende Null verschlucken (03451 wird 3451), blendet Drehpfeile ein und
  lässt sich mit dem Mausrad verstellen. Der Wert wird durchgehend als
  Zeichenkette geführt.
- Alles, was keine Ziffer ist, fällt schon beim Tippen weg — „Nr. 34512",
  „34 512" und „3-4-5-1-2" werden zu `34512`. Sonst scheitert die Prüfung an
  einer Eingabe, die der Teilnehmer für richtig hält, ohne dass er sieht, woran.
- Zwei getrennte Meldungen: „fehlt" und „hat das falsche Format" sind
  verschiedene Lagen. Wer `3451` getippt hat, sucht sonst an der falschen Stelle.
- Das Format steht dauerhaft unter dem Feld, nicht erst im Fehlerfall.

### Vejrø

Untertitel jetzt „Premiumpartner und Produktschulung" statt
„Premiumpartner-Konzept & Produktschulung". Der Inselname **Vejrø** bleibt
stehen — er ist der `itemLabel` im Payload, über den der Insel-Contest zählt.

### Datenbank

> **Die Migration muss vor dem Deploy eingespielt werden.** Ohne sie weist die
> Datenbank jede v14-Einsendung ab. Nicht manche — jede.

`supabase_v14_migration.sql` liegt bei und ist **noch nicht angewendet**.

Der Grund steht in Abschnitt 0 der Migration: auf `campus_feedback_ratings`
liegt ein Check aus der v11-Zeit,

```sql
CHECK ((rating IS DISTINCT FROM 5) OR (NULLIF(btrim(comment),'') IS NOT NULL))
```

also „bei Note 5 ist ein Kommentar Pflicht". Das war richtig, solange 5 die
schlechteste Note war. In v14 ist 5 die beste, hat keinen Kommentarzwang, und
die Insel-Marker tragen ebenfalls `rating: 5` ohne Kommentar. Am 13.08.2026
gegen die Live-RPC nachgestellt: der Elterndatensatz wird noch geschrieben,
die erste Rating-Zeile mit einer 5 ohne Kommentar bricht ab, alles rollt
zurück. Der Teilnehmer sieht „Das Feedback konnte gerade nicht gespeichert
werden."

Der Check taucht in der Spaltenübersicht nicht auf, weil er auf Tabellenebene
liegt. Wer die Tabelle nur über die Spaltenliste prüft, sieht ihn nicht.

Die beiden anderen Teile der Migration sind optional: die Händlernummer landet
ohnehin im `raw_payload`, die Migration holt sie nur in eine eigene, abfragbare
Spalte. Und ohne den Auswertungsteil bleiben die Zahlen rechnerisch richtig,
aber irreführend — `anzahl_note_1` zählt weiter Zeilen mit `rating = 1`, für
alte Einsendungen die Bestnote, für v14 die schlechteste.

Die Migration ergänzt deshalb Spalten, die die Bedeutung tragen statt der
Ziffer: `anzahl_beste_note`, `anzahl_schlechteste_note` und
`durchschnitt_einheitlich` (dort ist 5 immer die beste). Damit sind v11 und v14
zum ersten Mal direkt vergleichbar. `anzahl_note_1` und `anzahl_note_5` bleiben
unverändert erhalten, bestehende Abfragen brechen nicht.

Der Insel-Contest zählt am robustesten einfach die Zeilen:

```sql
select item_label, count(*) as stimmen
  from public.campus_feedback_langdock_ratings
 where section_key = 'schulungsinseln'
 group by item_label
 order by stimmen desc;
```

---

## Hintergrund: Lichtstrahlen

`rays-v13.js` legt bewegte Lichtstrahlen hinter den Kopfbereich und die
Danke-Ansicht. Grundlage ist die Komponente *LightRays* von reactbits.dev.

**Warum kein React.** Das Original ist eine React-Komponente auf Basis der
Bibliothek `ogl`. Beides gibt es hier nicht, und beides nur für eine Dekoration
einzuführen hieße Build-System plus zwei Abhängigkeiten — für eine Datei, die
per Doppelklick laufen soll. Der Effekt hängt an keiner der beiden: er ist ein
Dreieck über die volle Fläche mit einem Fragment-Shader. Genau das steht jetzt
in `rays-v13.js`, in reinem WebGL und ohne Fremdcode. Die Shader-Logik ist
unverändert übernommen; abgesichert ist nur die Präzisionsangabe, damit ältere
Handy-GPUs ohne `highp` im Fragment-Shader nicht auf einen Linkfehler laufen.

**Nur auf den blauen Flächen.** Auf der grauen Formularfläche wären helle
Strahlen entweder unsichtbar oder sie würden den Text stören. Der Bogen ist ein
Arbeitsmittel, kein Schaustück.

**`lightSpread` im Kopfbereich ist mit 4.2 sehr hoch, und das mit Absicht.**
Der Kopf ist auf dem Smartphone nur rund 76 px hoch, und der Shader dunkelt
zum unteren Rand hin ab. Mit einem engen Fächer landete der komplette Effekt
in den obersten Pixeln der Mitte: gemessen oben Mitte `rgb(40,118,177)`, 70 px
weiter links schon wieder Grundton. Auf dem Gerät war davon nichts zu sehen.
Weit geöffnet wird daraus ein Lichtschein über die ganze Breite — quer
gemessen liegt der Blauwert jetzt durchgehend bei 132 bis 173 statt bei 105
bis 125 im Grundton.

**Der Lichtschein steckt zusätzlich in CSS** (`.masthead::after`,
`.done::after`). Er ist da, bevor JavaScript läuft, und er bleibt da, wenn
WebGL fehlt oder blockiert ist — etwa in den eingebauten Browsern mancher
Messenger-Apps. Ohne ihn hieße „kein WebGL" schlicht: eine leere blaue Fläche.
Die Stapelreihenfolge ist durchnummeriert (Motiv 0, CSS-Schein 1, Canvas 2,
Inhalt 3), weil sie sich mit Pseudoelementen sonst nicht sicher vorhersagen
lässt.

**Was der Effekt nicht darf:**

| Fall | Verhalten |
|---|---|
| Kein WebGL, Shader defekt, Kontext verloren | Der CSS-Lichtschein bleibt, nichts bricht |
| Kopfbereich weggescrollt | Schleife hält an: gemessen 0 Bilder pro Sekunde statt 72 |
| Tab im Hintergrund | Schleife hält an |
| `prefers-reduced-motion: reduce` | Ein Standbild, kein einziger Animationsrahmen |
| Danke-Ansicht noch versteckt | Rechnet nichts, bis sie erscheint |

Bedienung und Lesbarkeit bleiben unberührt: der Canvas liegt unter allem
Inhaltlichen, hat `pointer-events: none` und `aria-hidden`. Der Kontrast ist am
fertig zusammengesetzten Bild nachgemessen, nicht am CSS — der hellste Punkt
überhaupt (Strahlenursprung im Kopf) liefert für weißen Text noch 4,98:1, die
Danke-Ansicht liegt zwischen 6,3:1 und 11:1. Dort steht zwar kein weißer Text,
aber die Reserve ist die Grenze, bis zu der der Kopf aufgehellt werden darf.

Einstellungen stehen am Ende von `rays-v13.js`, je ein Block pro Fläche.

---

## Markenpalette (verbindlich)

| Token | HEX | Einsatz |
|---|---|---|
| `th_blue_primary` | `#1D3661` | Primary Flächen, Headlines, Primary Buttons |
| `th_blue_secondary` | `#3BA9D3` | Akzente, Badges, Links, Info-Flächen |
| `th_accent_lime` | `#AFCA05` | Marker und Status, sehr sparsam |
| `th_red_brand` | `#CE132D` | Logo-Segel, sehr sparsam |
| `graySoft` | `#F0F0F0` | Backgrounds, Card-Flächen |
| `white` | `#FFFFFF` | Ruheflächen |
| `ink` | `#111111` | Text und Icons auf hell |

In v13 umgesetzt: Primary Buttons sind blau, nicht rot. Rot erscheint nur bei
Fehlern und in der Skalen-Note 5, also dort, wo die Signalwirkung inhaltlich
verdient ist. Lime markiert Status, nie Fläche. Auf Lime steht immer `ink`,
weißer Text darauf erreicht nur 1,9:1 und wäre unlesbar.

---

## Backend

Gespeichert wird ausschließlich über die Security-Definer-RPC
`public.submit_campus_feedback(jsonb)` im Supabase-Projekt `mhzlayhnyqlxdyiceyqz`.
Die Tabellen `campus_feedback` und `campus_feedback_ratings` bleiben per Row
Level Security gesperrt. Der Publishable Key steht im Browser-Code, das ist so
vorgesehen.

**Der Payload ist in v11 bis v13 identisch.** Feldnamen, die `itemLabel`-Strings,
`source: 'thitronik-campus-feedback-v11'` und `formVersion` dürfen sich in diesen
Ständen nicht ändern, ohne die Auswertung mit anzupassen. Ebenso der
Insel-Mechanismus: jede gewählte Insel wird als `rating: 1` unter
`sectionKey: 'schulungsinseln'` abgelegt, damit der Contest über
`campus_feedback_langdock_stats` weiterzählt.

Ab v13 steht `islandChoices` in der Reihenfolge der Auswahl, also Platz 1 bis 3.
Die Rating-Einträge tragen trotzdem alle dieselbe Zahl, eine Gewichtung nach
Platz würde den bestehenden Contest still verändern.

**v14 bricht damit bewusst**, weil sich die Notenskala umgedreht hat. Was sich
ändert:

| | v11–v13 | v14 |
|---|---|---|
| beste Note | 1 | 5 |
| `formVersion` | `campus-2026-haendler-v11` | `campus-2026-haendler-v14` |
| `source` | `thitronik-campus-feedback-v11` | `thitronik-campus-feedback-v14` |
| Insel-Einträge | `rating: 1` | `rating: 5` |
| neues Feld | — | `dealerNumber` (fünf Ziffern, Zeichenkette) |

Unverändert bleiben Feldnamen, `itemLabel`-Strings, `eventSlug` und die
Struktur der Rating-Einträge — dieselbe Frage bleibt über alle Jahrgänge
hinweg auffindbar. Die neuen `formVersion`/`source`-Strings sind der Schalter,
der alte und neue Skala in der Auswertung getrennt hält; siehe den Abschnitt
[v14](#v14).

---

## Deployment

Der fertige Ordner für Netlify liegt unter `netlify-v14/` (für ältere Stände
unter `netlify-v13/`). Diesen Ordner komplett hochladen, nicht nur
`index.html`. Er enthält `_headers` mit Caching und Sicherheitsheadern.

Nach jeder Änderung neu bauen:

```bash
node tools/build-netlify.js
```

### Vorschaumodus

`?demo=1` prüft den kompletten Durchlauf und zeigt die Danke-Ansicht, speichert
aber absichtlich nichts. **Für Tests immer verwenden**, sonst landen Testdaten in
der Produktivdatenbank.

---

## Werkzeuge

| Skript | Zweck |
|---|---|
| `tools/optimize-images.js` | Erzeugt die WebP-Varianten unter `assets/v12/` |
| `tools/build-index-v14.js` | Erzeugt `index-v14.html` aus einer Datenquelle |
| `tools/build-index-v13.js` | dasselbe für v13, bleibt als Rückfallebene liegen |
| `tools/build-netlify.js` | Baut `netlify-<version>/` inklusive `_headers` |
| `tools/build-standalone.js` | Baut die beiden Einzeldateien |

`build-netlify.js` und `build-standalone.js` nehmen die Version als Argument
und bauen ohne Argument v14. Sie sind bewusst **nicht** pro Version kopiert —
darin steckt keine versionsabhängige Logik, nur Dateinamen. Der Inhalt selbst
(Bewertungszeilen, Inseln, Texte) liegt in `build-index-<version>.js`, und der
darf auseinanderlaufen.

```bash
node tools/build-index-v14.js
node tools/build-standalone.js v14
node tools/build-netlify.js v14
```

Voraussetzung für `optimize-images.js`: `npm install sharp`.

Die beiden Einzeldateien im Wurzelverzeichnis:

- `THITRONIK_Campus_Feedbackbogen_v14_Standalone.html` (324 KB) enthält alles
  eingebettet und läuft per Doppelklick. Auch das Favicon steckt als Data-URI
  darin, sonst fragt der Browser `/favicon.ico` an und quittiert mit 404.
- `THITRONIK_Campus_Feedbackbogen_v14_Code.html` (130 KB) ist derselbe Code ohne
  Base64-Bilder, gedacht zum Weitergeben an ein Sprachmodell.

Die v13-Fassungen liegen unverändert daneben.

---

## Bekannte offene Punkte

- Keine der Varianten wurde je auf einem echten Telefon getestet, nur emuliert.
  v13.1 wurde bei 320, 360, 390, 430, 768, 1280 und 1920 Pixeln geprüft, dazu
  im Querformat bei 844 × 390. Was sich nur auf echter Hardware zeigt, bleibt
  offen: iOS-Safari mit eingeblendeter Tastatur über der festen Schrittleiste,
  die Adressleiste beim Scrollen und das Verhalten echter Touch-Eingabe.
- v13 wurde nie mit echtem Absenden gegen Supabase getestet, nur über `?demo=1`.
  Geprüft ist, dass der Payload gegenüber v11 unverändert ist: Feldnamen,
  `itemLabel`-Strings, `source`, `formVersion`, `eventSlug`, die Rating-Struktur
  und die Insel-Einträge mit `rating: 1`.
- v14 ebenfalls nur über `?demo=1` geprüft, dort aber vollständig durchgespielt:
  Ziffernfilter, beide Fehlermeldungen der Händlernummer, Kommentarpflicht an
  der 1 gegen freiwilliges Feld an der 5, und der fertige Payload mit
  `dealerNumber` als Zeichenkette, `rating: 5` bei den Inseln und den neuen
  `formVersion`/`source`-Strings. Layout gemessen bei 1280 und 320 Pixeln, kein
  Querüberstand.
- **`supabase_v14_migration.sql` ist noch nicht angewendet, und Abschnitt 0
  daraus ist Voraussetzung für den Deploy.** Ohne ihn scheitert jede
  v14-Einsendung am Check `campus_feedback_ratings_grade_five_comment_check`.
  Die Abschnitte 1 und 2 sind optional.
- v14 ist weiterhin nie mit echtem Absenden gegen Supabase durchgelaufen. Was
  geprüft ist: die RPC wurde am 13.08.2026 mit einem echten v14-Payload
  aufgerufen, der Elterndatensatz ging durch, die Rating-Zeilen brachen am
  genannten Check ab. Dass nach dessen Entfernen alles durchläuft, ist aus der
  vollständigen Constraint-Liste abgeleitet und nicht am grünen Durchlauf
  bestätigt — der Testlauf mit entferntem Check wurde als Schreibzugriff auf
  die Produktivdatenbank abgelehnt. Nach dem Einspielen bitte eine echte
  Testeinsendung machen und danach löschen.
- Der Insel-Contest zählte bisher über `anzahl_note_1`. Für v14-Zeilen ist das
  die falsche Spalte — dort steht die Bestnote als 5. Wer die Abfrage irgendwo
  außerhalb dieses Repos liegen hat (Langdock, Dashboards), muss sie nachziehen.
- `_archiv/` enthält zwei Bilddateien, die von keiner Variante referenziert
  werden. Sie liegen dort statt gelöscht zu sein, falls sie noch gebraucht werden.
