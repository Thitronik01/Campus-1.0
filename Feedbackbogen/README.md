# THITRONIK Campus Feedbackbogen

Feedbackbogen für Händlerinnen und Händler zum THITRONIK Campus 2026.
Statische Seite, kein Framework. In der Mitarbeiter-Pilotphase speichert sie
über Netlify Forms; eine spätere Supabase-Anbindung ist vorbereitet.

**Aktueller und einziger Stand: v14.** Der Bogen wird in das Campus-Gesamtpaket
unter `/feedback/` eingebaut und teilt dort Teilnehmerdaten mit dem Quiz.

Ältere Stände (v11 bis v13) liegen nicht mehr im Arbeitsverzeichnis. Sie sind
vollständig in der Git-Historie erhalten, siehe [Versionsgeschichte](#versionsgeschichte).

---

## Aufbau

| Datei | Zweck |
|---|---|
| `index-v14.html` | Der Bogen. **Wird generiert**, nicht von Hand bearbeiten. |
| `styles-v14.css` | Stile |
| `app-v14.js` | Logik, Validierung, Entwurf und Netlify-Forms-Payload |
| `rays-v14.js` | Lichtstrahlen im Hintergrund, reine Dekoration |
| `netlify-v14/` | Fertiges Deploy-Paket. **Wird generiert.** |
| `THITRONIK_Campus_Feedbackbogen_v14_Standalone.html` | Einzeldatei, per Doppelklick lauffähig. **Wird generiert.** |
| `THITRONIK_Campus_Feedbackbogen_v14_Code.html` | Dieselbe Datei ohne Base64-Bilder, zum Weitergeben an ein Sprachmodell. **Wird generiert.** |
| `supabase_v14_migration.sql` | Datenbankänderungen für v14 |
| `supabase_v11_migration.sql` | Was 2026-08-11 an der Live-Datenbank gemacht wurde. Dokumentation der Ausgangslage. |
| `tools/` | Generatoren, siehe [Werkzeuge](#werkzeuge) |
| `assets/` | Bilder. `assets/*` sind die Master, `assets/v12/*` die ausgelieferten Fassungen. |

**Der Inhalt steht in `tools/build-index-v14.js`, nicht in `index-v14.html`.**
Bewertungszeilen, Inseltexte und die Formularstruktur werden dort erzeugt. Wer
`index-v14.html` direkt bearbeitet, verliert die Änderung beim nächsten Bau.

Der Ordner `assets/v12` heißt absichtlich so. Die Bilder wurden für v12
optimiert und werden seither unverändert mitgenutzt. Ein Umbenennen würde die
Pfade in HTML und CSS auseinanderlaufen lassen.

---

## Der Bogen

Sechs Schritte, ein Abschnitt pro Bildschirm, mobile first.

- Startbildschirm, danach Schritt für Schritt
- Prüfung beim Weitergehen statt erst beim Absenden
- Browser-Zurück funktioniert, jeder Schritt hat eine eigene Adresse (`#schritt-3`)
- Segment-Fortschrittsanzeige, erledigte Schritte sind anklickbar
- Automatisch gespeicherter Entwurf im `localStorage`
- Fehlerliste mit Sprunglinks statt flüchtiger Browser-Blasen
- Danke-Ansicht als echter Dialog mit `inert`-gesperrtem Hintergrund
- Campus-Inseln: höchstens drei Favoriten, Rangfolge nach Auswahlreihenfolge

**Drei Pflichtangaben:** Händlerbetrieb, Händlernummer, Name.

### Vorschaumodus

`?demo=1` prüft den kompletten Durchlauf und zeigt die Danke-Ansicht, speichert
aber absichtlich nichts. **Für Tests immer verwenden**, sonst landen Testdaten
nach dem Deploy in Netlify Forms.

---

## Die Notenskala

> **5 ist die beste Note, 1 die schlechteste.** Bis v13 war es genau umgekehrt.

Die Ziffern stehen aufsteigend von links nach rechts; es wandern nur die
Anker mit („verbesserungswürdig" links, „sehr gut" rechts). Eine absteigende
Reihe 5–4–3–2–1 wäre die zweite Umgewöhnung in derselben Änderung gewesen.

An der Richtung hängt mehr, als man zunächst sieht:

- **Die Farben.** Die 5 trägt Lime, die 1 trägt Rot, und die zugehörige
  Kommentarbox ist entsprechend getönt. Bis v13 hingen diese Regeln an
  `:first-child` und `:last-child` — an der Position statt an der Bedeutung.
  Deshalb blieben sie beim Drehen der Skala stehen und die schlechteste Note
  leuchtete grün. Jetzt sind sie über `input[value="1"]` und `input[value="5"]`
  angesprochen und wandern von allein mit, falls die Reihenfolge je wieder
  angefasst wird.
- **Der Pflichtkommentar** hängt an der **1**. An der 5 öffnet sich weiterhin
  ein Feld, aber als freiwillige Einladung. Eine Pflichtbegründung für die
  Bestnote treibt Teilnehmende systematisch auf die zweitbeste Note aus.
- **Die Insel-Einträge** im Payload tragen `rating: 5`. Sie sind Marker, keine
  Urteile — aber eine Lieblingsinsel mit der schlechtesten Note zu markieren
  wäre im Bestand nicht mehr lesbar.
- **Der Entwurfsspeicher** liegt unter einem eigenen `localStorage`-Schlüssel.
  Ein liegengebliebener v13-Entwurf enthält Noten der alten Richtung; unter
  demselben Schlüssel wiederhergestellt würde aus einer 1 („war sehr gut")
  stillschweigend die schlechteste Bewertung.

Farbe tragen **nur die beiden Endpunkte**. Lime und Rot sind laut
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

---

## Händlernummer

Drittes Pflichtfeld, fünf Ziffern, geprüft gegen `^\d{5}$`.

- `type="text"` mit `inputmode="numeric"`, **nicht** `type="number"`: eine
  Händlernummer ist eine Ziffernfolge, keine Rechengröße. `type="number"` würde
  eine führende Null verschlucken (03451 wird 3451), blendet Drehpfeile ein und
  lässt sich mit dem Mausrad verstellen. Der Wert wird durchgehend als
  Zeichenkette geführt, auch im Payload.
- **Bewusst ohne `maxlength`.** Das Attribut kappt beim Einfügen auf fünf
  *Zeichen*, bevor der Ziffernfilter greift. Aus eingefügtem „&nbsp;34512"
  wurde dadurch „&nbsp;3451" und daraus „3451" — eine Ziffer weg, und der
  Teilnehmer liest „genau fünf Ziffern", obwohl er fünf eingefügt hat. Die
  Begrenzung macht der Filter, in der richtigen Reihenfolge: erst putzen, dann
  kappen.
- Alles, was keine Ziffer ist, fällt schon beim Tippen weg. „Nr. 34512",
  „34 512" und „3-4-5-1-2" werden zu `34512`.
- Zwei getrennte Meldungen: „fehlt" und „hat das falsche Format" sind
  verschiedene Lagen. Wer `3451` getippt hat, sucht sonst an der falschen Stelle.
- Das Format steht dauerhaft unter dem Feld, nicht erst im Fehlerfall.

---

## Hintergrund: Lichtstrahlen

`rays-v14.js` legt bewegte Lichtstrahlen hinter den Kopfbereich und die
Danke-Ansicht. Grundlage ist die Komponente *LightRays* von reactbits.dev.

**Warum kein React.** Das Original ist eine React-Komponente auf Basis der
Bibliothek `ogl`. Beides gibt es hier nicht, und beides nur für eine Dekoration
einzuführen hieße Build-System plus zwei Abhängigkeiten — für eine Datei, die
per Doppelklick laufen soll. Der Effekt hängt an keiner der beiden: er ist ein
Dreieck über die volle Fläche mit einem Fragment-Shader. Genau das steht in
`rays-v14.js`, in reinem WebGL und ohne Fremdcode. Die Shader-Logik ist
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
gemessen liegt der Blauwert durchgehend bei 132 bis 173 statt bei 105
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

Einstellungen stehen am Ende von `rays-v14.js`, je ein Block pro Fläche.

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

Primary Buttons sind blau, nicht rot. Rot erscheint nur bei Fehlern und auf der
**Skalen-Note 1**, also dort, wo die Signalwirkung inhaltlich verdient ist.
Lime markiert Status und die Bestnote, nie Fläche. Auf Lime steht immer `ink`,
weißer Text darauf erreicht nur 1,9:1 und wäre unlesbar.

Bei Designentscheidungen gilt: **Markenvorgaben schlagen die Empfehlungen der
Design-Skills.** Die Skills sind Hilfsmittel, keine Autorität für Farbe,
Typografie oder Tonalität.

---

## Pilotphase und späteres Backend

Im gemeinsamen Campus-Paket sendet der Bogen zuerst an die Netlify Function
`submit-feedback`. Sie prüft die Nutzlast serverseitig und ruft anschließend
die vorhandene Supabase-RPC `submit_campus_feedback` auf. Der Supabase Secret
Key bleibt dadurch vollständig außerhalb des Browsers.

Solange `SUPABASE_URL` und `SUPABASE_SECRET_KEY` in Netlify noch fehlen, fällt
der Bogen automatisch auf das statisch erkannte Formular `campus-feedback`
zurück. Damit kann die fachliche Abstimmung ohne Datenbank starten; die
Einsendungen stehen im Netlify-Dashboard und lassen sich als CSV exportieren.
Die vollständige strukturierte Nutzlast liegt zusätzlich im Feld `payload`.

Sobald Migration und Umgebungsvariablen vorhanden sind, läuft derselbe Bogen
ohne Frontend-Umbau direkt über Supabase. Der externe Langdock-Agent liest wie
bisher die Supabase-Tabellen und -Views und muss Netlify Forms nicht verwenden.

### Was v14 gegenüber v11–v13 am Payload ändert

| | v11–v13 | v14 |
|---|---|---|
| beste Note | 1 | 5 |
| `formVersion` | `campus-2026-haendler-v11` | `campus-2026-haendler-v14` |
| `source` | `thitronik-campus-feedback-v11` | `thitronik-campus-feedback-v14` |
| Insel-Einträge | `rating: 1` | `rating: 5` |
| neues Feld | — | `dealerNumber` (fünf Ziffern, Zeichenkette) |

Unverändert bleiben Feldnamen, `itemLabel`-Strings, `eventSlug` und die
Struktur der Rating-Einträge — dieselbe Frage bleibt über alle Jahrgänge hinweg
auffindbar. Die neuen `formVersion`/`source`-Strings sind der Schalter, der
alte und neue Skala in der Auswertung getrennt hält.

`islandChoices` steht in der Reihenfolge der Auswahl, also Platz 1 bis 3. Die
Rating-Einträge tragen trotzdem alle dieselbe Zahl; eine Gewichtung nach Platz
würde den bestehenden Contest still verändern.

### Die Falle, die v14 zunächst blockiert hat

Auf `campus_feedback_ratings` lag ein Check aus der v11-Zeit:

```sql
CHECK ((rating IS DISTINCT FROM 5) OR (NULLIF(btrim(comment),'') IS NOT NULL))
```

Also „bei Note 5 ist ein Kommentar Pflicht". Richtig, solange 5 die schlechteste
Note war. In v14 ist 5 die beste, hat keinen Kommentarzwang, und die
Insel-Marker tragen ebenfalls `rating: 5` ohne Kommentar. Ergebnis: **jede**
v14-Einsendung wurde abgewiesen. Der Elterndatensatz wurde noch geschrieben,
die erste Rating-Zeile mit einer 5 ohne Kommentar brach ab, alles rollte zurück.
Der Teilnehmer sah „Das Feedback konnte gerade nicht gespeichert werden."

Der Check tauchte in der Spaltenübersicht nicht auf, weil er auf Tabellenebene
liegt. **Lehre für das nächste Mal:** wenn sich die Bedeutung eines gespeicherten
Wertes ändert, gezielt nach Constraints suchen, die genau diesen Wert
festverdrahten — die Spaltenliste allein reicht nicht.

```sql
select con.conname, pg_get_constraintdef(con.oid)
from pg_constraint con
join pg_class rel on rel.oid = con.conrelid
where rel.relname in ('campus_feedback','campus_feedback_ratings')
  and con.contype = 'c';
```

Behoben am 13.08.2026 durch Abschnitt 0 von `supabase_v14_migration.sql`.

### Auswertung

Die Auswertung läuft über einen **Langdock-Agenten**, der außerhalb dieses
Repos liegt und direkt auf Supabase zugreift. Die Function ändert daran nichts:
Sie schreibt in die bestehende RPC und damit in dieselben Tabellen und Views.
Bei Payload- oder Skalenänderungen muss der Agent weiterhin von Hand
nachgezogen werden.

Ohne die Abschnitte 1 und 2 der Migration bleiben die Zahlen rechnerisch
richtig, aber irreführend: `anzahl_note_1` zählt weiter Zeilen mit `rating = 1`,
für alte Einsendungen die Bestnote, für v14 die schlechteste. Die Migration
ergänzt deshalb Spalten, die die Bedeutung tragen statt der Ziffer —
`anzahl_beste_note`, `anzahl_schlechteste_note` und `durchschnitt_einheitlich`
(dort ist 5 immer die beste). Damit sind v11 und v14 zum ersten Mal direkt
vergleichbar. `anzahl_note_1` und `anzahl_note_5` bleiben unverändert erhalten,
bestehende Abfragen brechen nicht.

Der Insel-Contest zählt am robustesten einfach die Zeilen:

```sql
select item_label, count(*) as stimmen
  from public.campus_feedback_langdock_ratings
 where section_key = 'schulungsinseln'
 group by item_label
 order by stimmen desc;
```

---

## Deployment

Der produktive Weg ist das gemeinsame Git-Deployment aus dem Repository. Es
liefert den Bogen unter `/feedback/` zusammen mit der serverseitigen Function
aus. Der Ordner `netlify-v14/` bleibt ein statisches Einzelpaket für Vorschau
oder den datenbanklosen Netlify-Forms-Pilot; ein reiner Drag-and-drop-Deploy
dieses Ordners enthält keine Supabase-Function.

`netlify-v14/` immer **komplett** hochladen, nicht nur `index.html` — sonst
fehlen Bilder und Stile. Er enthält `_headers` mit Caching- und
Sicherheitsheadern: `index.html` wird immer frisch geprüft, die versionierten
Dateien werden lange gecacht.

Nach jeder Änderung neu bauen:

```bash
node tools/build-index-v14.js
node tools/build-standalone.js
node tools/build-netlify.js
```

`styles-*` und `app-*` tragen die Versionsnummer absichtlich im Dateinamen,
damit kein alter Browser- oder CDN-Cache greift.

---

## Werkzeuge

| Skript | Zweck |
|---|---|
| `tools/build-index-v14.js` | Erzeugt `index-v14.html`. Einzige Wahrheitsquelle für Bewertungszeilen, Inseln und Formularstruktur. |
| `tools/build-standalone.js` | Baut die beiden Einzeldateien |
| `tools/build-netlify.js` | Baut `netlify-<version>/` inklusive `_headers` |
| `tools/optimize-images.js` | Erzeugt die WebP-Varianten unter `assets/v12/` aus den Mastern in `assets/` |

`build-netlify.js` und `build-standalone.js` nehmen die Version als Argument und
bauen ohne Argument v14. Sie sind bewusst **nicht** pro Version kopiert — darin
steckt keine versionsabhängige Logik, nur Dateinamen. Der Inhalt selbst liegt in
`build-index-<version>.js`, und der darf auseinanderlaufen.

Voraussetzung für `optimize-images.js`: `npm install sharp`. Das Skript wird
selten gebraucht — nur wenn ein Motiv getauscht wird oder eine neue Bildgröße
nötig ist. Die Master in `assets/` liegen genau dafür im Repo.

---

## Versionsgeschichte

Nur v14 liegt im Arbeitsverzeichnis. Die älteren Stände sind vollständig in der
Git-Historie, aufgeräumt am 13.08.2026.

| Stand | Was er brachte |
|---|---|
| **v11** | Ursprünglicher Bogen, eine lange Seite. Bis 13.08.2026 live. |
| **v12** | Neugestaltung. Fehlendes Hero-Bild auf Smartphones behoben (`campus-hero-1280.webp` existierte nie), Bildlast von 9,5 MB auf 327 KB, CSS von 1773 auf rund 800 Zeilen, eine `:root` statt drei widersprüchlichen. |
| **v13** | Schritt für Schritt statt einer langen Seite, sechs Panels, mobile first. |
| **v13.1** | Fehlerbehebungen: Zähler im Kopf stand dauerhaft auf 0, Schrittwechsel scrollte animiert statt zu springen, Sprunglink zeigte ins Leere, Entwurf-Wiederherstellung hängte doppelte Listener an. Dazu die Lichtstrahlen und 24 px Trefferfläche für die Schritt-Segmente (WCAG 2.2, 2.5.8). |
| **v14** | Notenskala umgedreht, Händlernummer als drittes Pflichtfeld, Vejrø umbenannt. |

Einen alten Stand wiederherstellen:

```bash
git show 1709bb5 --stat
git checkout 1709bb5 -- index-v13.html app-v13.js styles-v13.css
```

Relevante Commits: `1709bb5` (v11–v13), `6f4a4d1` (v13.1 und v14).

---

## Bekannte offene Punkte

- **Vor Produktivstart muss `supabase_v14_migration.sql` vollständig in der
  gewählten Supabase-Datenbank ausgeführt und getestet werden.** Bis dahin ist
  Netlify Forms nur der Pilot-Zwischenspeicher.
- **Der Langdock-Agent muss die neue Skalenrichtung kennen.** Solange er
  v11- und v14-Zeilen in einen Durchschnitt mischt, ist das Ergebnis
  bedeutungslos — eine 4,2 heißt in den alten Daten schlecht, in den neuen gut.
- Der Bogen wurde nie auf einem echten Telefon getestet, nur emuliert. Geprüft
  bei 320, 360, 390, 430, 768, 1280 und 1920 Pixeln, dazu im Querformat bei
  844 × 390. Offen bleibt, was sich nur auf echter Hardware zeigt: iOS-Safari
  mit eingeblendeter Tastatur über der festen Schrittleiste, die Adressleiste
  beim Scrollen, echte Touch-Eingabe.
- Auf Schritt 2 („Wie zufrieden waren Sie insgesamt?") zeigt die Wortskala in
  die andere Richtung als die Zahlenskala danach: dort steht „Sehr zufrieden"
  links und trägt Lime, ab Schritt 3 steht die Bestnote rechts. Die Wortskala
  ist selbsterklärend, deshalb bewusst nicht angeglichen — falls es doch stören
  sollte, ist es eine kleine Änderung.
- In der Produktivdatenbank steht eine Testeinsendung vom 13.08.2026
  („Max power" / „Max am Donnerstag"), die beim Verifizieren des Deployments
  entstanden ist. Sie zählt in allen Auswertungen mit, bis sie gelöscht wird.
