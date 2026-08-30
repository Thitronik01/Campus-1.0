# THI im Campus

Der Assistent aus der THITRONIK-Plattform, eingebaut in den Campus. Ein
Schalter in der Kopfzeile neben Arbeitskarte und Feedbackbogen öffnet ein
Panel; darin werden Fragen zu Produkten und zum Campus beantwortet.

**Stand: eingebaut und geprüft, aber noch nicht aktiv.** Es fehlt genau eine
Sache — der API-Schlüssel. Das ist Schritt 2, siehe unten.

---

## Schritt 2: Schlüssel eintragen

In Netlify unter **Site configuration → Environment variables** anlegen:

| Variable | Wert |
|---|---|
| `ANYMIZE_API_KEY` | der Schlüssel aus dem Anymize-Konto |
| `ANYMIZE_API_URL` | `https://app.anymize.ai/api/v1/llm-anonymous/chat/completions` |
| `THI_MODEL` | `anthropic/claude-sonnet-4.6` |

Danach einmal neu deployen. Mehr ist nicht nötig — der Rest ist eingebaut.

Zur Adresse: Der Endpunkt `llm-anonymous` entfernt Personendaten, bevor die
Anfrage das Modell erreicht, und kostet dafür doppelte Credits. Ohne
Anonymisierung geht auch
`https://app.anymize.ai/api/v1/llm/chat/completions`. Im Campus tippen
Teilnehmer Fahrzeug- und Kundenangaben in ihre Fragen — deshalb ist der
anonymisierende Endpunkt hier voreingestellt.

**Der Schlüssel gehört ausschließlich in die Netlify-Umgebungsvariablen.**
Nicht ins Repository, nicht in eine Datei im Paket, nicht in den Browsercode.
Er liegt allein in der Function.

### Vorher schon sichtbar

Ohne Schlüssel läuft alles: Schalter, Panel, Verlauf, Eingabe. Nur die Antwort
bleibt aus. Statt eines Fehlers erscheint der Hinweis, dass in den
Umgebungsvariablen `ANYMIZE_API_KEY` fehlt. Die Seite sieht also nicht kaputt
aus, sie erklärt sich.

### Lokal ausprobieren

```bash
ANYMIZE_API_KEY=... ANYMIZE_API_URL=https://app.anymize.ai/api/v1/llm-anonymous/chat/completions node tools/dev-server.js
```

Der Entwicklungsserver bedient `/.netlify/functions/thi` selbst — als einzige
Function. Die übrigen antworten lokal weiterhin mit 501, damit keine Testdaten
in der Produktivdatenbank landen. THI speichert nichts, deshalb ist er hier die
Ausnahme.

Ohne Schlüssel startet derselbe Befehl ebenfalls; THI meldet dann, was fehlt.

---

## Weitere Einstellungen

Alle optional, alle mit brauchbarer Vorgabe.

| Variable | Vorgabe | Wirkung |
|---|---|---|
| `THI_PROVIDER` | `anymize` | `anthropic` spricht direkt `api.anthropic.com` an (dann `ANTHROPIC_API_KEY` setzen). Werkzeuge gibt es nur bei `anymize`. |
| `THI_TOOLS` | `true` | `false` schaltet das eigenständige Nachschlagen ab. Nur nötig, falls Anymize das Format ändert. |
| `THI_TOOL_HOPS` | `3` | Wie oft THI je Frage höchstens nachschlägt. |
| `THI_ZEITBUDGET_MS` | `40000` | Ab dieser Zeit werden keine Werkzeuge mehr angeboten — Netlify bricht nach 60 s ab. |
| `THI_RATE_LIMIT` | `30` | Anfragen pro IP in fünf Minuten. |
| `THI_DAILY_LIMIT` | `1000` | Anfragen pro Tag und Function-Instanz. |
| `THI_TRUSTED_PROXIES` | `1` | Wie viele Einträge von hinten aus `X-Forwarded-For` einem vertrauenswürdigen Proxy gehören. Bestimmt, welche Adresse als Client-IP gilt — und damit, worauf `THI_RATE_LIMIT` zählt. Bei Netlify ohne vorgelagerten Dienst richtig. |

### Was die Grenzen leisten — und was nicht

Der Campus hat keine Anmeldung. `/.netlify/functions/thi` ist damit für jeden
erreichbar, der die Adresse kennt. Dagegen stehen: Prüfung auf gleiche
Herkunft, Limit pro IP, Tageslimit und Kappungen für Nachrichtenzahl und
Länge.

**Das Tageslimit ist keine belastbare Kostenobergrenze.** Die Zähler liegen im
Arbeitsspeicher der jeweiligen Function-Instanz, und Netlify startet unter Last
mehrere davon — jede zählt für sich. Als Notbremse gegen eine entlaufene
Schleife taugt das; als Budgetgrenze nicht. Wer die braucht, setzt sie im
Anymize-Konto.

---

## Was auf Netlify zu beachten ist

Vier Punkte, alle geprüft — drei sind unkritisch, einer war ein echter Blocker.

### Die Daten müssen statisch importiert werden

**Das ist der Punkt, an dem es beinahe schiefgegangen wäre.**

`thi.mjs` ist ESM. Netlify verpackt ESM-Functions **nicht** mit esbuild,
sondern mit **nft** (Node File Trace). nft bündelt nicht — es verfolgt die
Importe und kopiert die gefundenen Dateien ins Paket. Verfolgt werden dabei nur
**statische** Importe.

Ein `createRequire(import.meta.url)` mit `require("./…json")` — so bindet die
CommonJS-Function `submit-quiz.js` ihre Fragensätze ein — bleibt hier als
Laufzeitaufruf stehen. Die JSON-Dateien landen dann nicht im Paket, und die
Function stirbt beim ersten Aufruf mit `MODULE_NOT_FOUND`.

Nachgestellt mit dem echten Bundler (`@netlify/zip-it-and-ship-it`): 38 KB
Paket ohne die Daten statt 3,2 MB mit ihnen. **Lokal fällt das nicht auf**, weil
der Entwicklungsserver die Originaldatei lädt, wo die relativen Pfade stimmen.

Richtig ist deshalb nur diese Form:

```js
import ARTIKEL from "./thi-wissen/artikel.de.json" with { type: "json" };
```

Sie funktioniert in beiden Welten: nft nimmt die Datei mit, und Node lädt sie
ohne Bundling direkt. Die Typangabe ist für Node dabei Pflicht.
`tools/test-thi.js` wacht darüber.

### Zeitgrenze: 60 Sekunden

Netlify bricht eine Function nach 60 Sekunden ab. Der Werkzeugweg kann dem
nahekommen: drei Runden Nachschlagen, jede mit einem Modellaufruf. Deshalb gibt
es eine eigene Frist — nach **40 Sekunden** (`THI_ZEITBUDGET_MS`) werden keine
Werkzeuge mehr angeboten, das Modell muss mit dem antworten, was es hat.

Lieber eine Antwort aus unvollständigem Kontext als ein Abbruch nach einer
Minute Wartezeit.

Die verbreitete Angabe „10 Sekunden" betrifft den **Lambda-Kompatibilitätsmodus**,
der zum 1. Juli 2027 abgekündigt ist. Diese Function nutzt ihn nicht.

### Paketgröße

Das verpackte THI-Paket ist **4,3 MB** (3,2 MB Function mit eingebetteten
Daten, dazu Netlifys Bootstrap). Das Limit liegt bei 50 MB gezippt — reichlich
Luft. Der Kaltstart wurde mit **31 ms** gemessen; die Modulladung fällt gegen
die Antwortzeit des Modells nicht ins Gewicht.

### v1 und v2 nebeneinander

Der Campus hat jetzt beides: `submit-quiz.js` und `submit-feedback.js` im
v1-Format (CommonJS, `exports.handler`), `thi.mjs` im v2-Format. Netlify
verpackt sie unterschiedlich (esbuild für v1, nft für v2) und erkennt das
selbst — im Bundler-Lauf nachgeprüft. Node 24 aus `netlify.toml` ist eine
gültige Laufzeit.

Ohne `config.path` ist eine v2-Function unter dem Standardpfad
`/.netlify/functions/thi` erreichbar. Genau den ruft `thi.js` auf.

---

## Aufbau

| Pfad | Zweck |
|---|---|
| `netlify/functions/thi.mjs` | Die Function: Retrieval, Werkzeugschleife, Modellaufruf, Schutzgrenzen |
| `netlify/functions/thi-lib/suche.mjs` | Such- und Bewertungskern, übernommen aus dem Standalone-Entwurf |
| `netlify/functions/thi-lib/campus-wissen.mjs` | **Wissen über den Campus. Hier wird ergänzt.** |
| `netlify/functions/thi-wissen/*.json` | Der Wiki-Bestand, erzeugt. Nicht von Hand ändern. |
| `public/assets/thi.js` | Schalter, Panel, Verlauf |
| `public/assets/thi.css` | Gestaltung |
| `tools/thi-wissen-bauen.js` | Erzeugt den Wissensbestand aus `thi-standalone/` |
| `tools/test-thi.js` | 69 Prüfungen, ohne Schlüssel lauffähig |

Die Function ist eine Netlify-Function im **v2-Format** (Web-API: Request rein,
Response raus). Die beiden anderen Functions des Campus sind v1. Beides darf
nebeneinander liegen, Netlify erkennt das Format am Export. v2 deshalb, weil
nur dieses Format Streaming kann.

---

## Wo das Wissen herkommt

Zwei Quellen, eine Suche.

**Der Wiki-Bestand** liegt unter `netlify/functions/thi-wissen/` und beantwortet
Produktfragen. Er wird aus dem Ordner `thi-standalone/` erzeugt:

```bash
node tools/thi-wissen-bauen.js
```

Aus 33 MB in elf Sprachen werden dabei 3,0 MB auf Deutsch. Zwei Gründe:

1. **Größe.** Eine Function lädt ihr Bundle bei jedem Kaltstart. 33 MB JSON zu
   parsen dauert Sekunden — bei der ersten Frage jedes Teilnehmers. Die zehn
   anderen Sprachen sind hier tote Last, der Chat läuft deutsch.

2. **Sichtbarkeit.** Der Rohbestand trägt in den Artikeltexten auch die
   Abschnitte „Service und interne Abläufe". Der Standalone-Entwurf filtert sie
   zur Laufzeit anhand der Nutzerrolle heraus. Der Campus hat keine Anmeldung
   und damit keine Rollen — also wird beim **Bau** gefiltert. Was nicht im
   Bestand liegt, kann auch kein Fehler in der Function ausliefern.

Der erzeugte Bestand ist versioniert, weil Netlify aus dem Repository baut und
den Ordner `thi-standalone/` dort nicht hat. Er wird neu erzeugt, wenn das Wiki
einen neuen Stand hat — sonst nie.

**Das Campus-Wissen** steht in `thi-lib/campus-wissen.mjs`. Die sieben Inseln
entstehen aus `public/data/inseln.json`, damit sie beim Umbenennen nicht
veralten; Ablauf, Wissenscheck, Arbeitskarte, Feedbackbogen und THI selbst sind
dort als Text hinterlegt.

### Campus-Wissen ergänzen

In `campus-wissen.mjs` einen Eintrag an `CAMPUS_SEITEN` anhängen:

```js
{
  route: "/campus/kurzname",     // eindeutige Kennung, kein Link nach außen
  title: "Titel",                // nennt THI als Fundstelle
  slug: "kurzname",              // Treffer hier wiegen im Scoring schwer
  boostKeywords: "begriffe unter denen es gefunden werden soll",
  body: "Der Text, den THI wiedergeben soll."
}
```

Mehr ist nicht nötig — der Eintrag läuft durch dieselbe Suche wie die
Wiki-Artikel und ist sofort auffindbar. Der `body` landet wörtlich in der
Antwort, wird also so geschrieben, wie THI ihn sagen soll.

`boostKeywords` stehen bewusst in ASCII-Normalform (`rueckmeldung`, nicht
`rückmeldung`): die Suche normalisiert Umlaute in genau diese Form. Beide
Schreibweisen funktionieren, die Normalform macht nur sichtbar, dass es
Suchbegriffe sind und kein Fließtext.

---

## Wie eine Antwort entsteht

1. Der Browser schickt nur den Gesprächsverlauf — keine Suchindizes, keinen
   Kontext. Das Retrieval läuft vollständig in der Function.
2. Die Function sucht zweigleisig: abschnittsweise für die präzise Fundstelle,
   artikelweise für den Zusammenhang. Kurze Folgefragen erben dabei die
   Begriffe der Vorgängerfrage — „und wie lösche ich ihn?" findet sonst nichts.
3. Die Treffer gehen als `<kontext>`-Block an der letzten Nutzernachricht mit
   heraus, nicht in der Systemanweisung. Die bleibt dadurch über alle Anfragen
   gleich und ist beim Anbieter zwischenspeicherbar.
4. Reicht der Kontext nicht, schlägt THI selbst nach: `wiki_suchen` und
   `artikel_lesen`, höchstens dreimal je Frage. Währenddessen läuft eine
   Statuszeile im Panel.
5. Die Antwort kommt als Textstrom zurück.

Der Entwurf ließ den Browser vorab suchen und dafür die Indizes laden. Im
Campus wären das rund 3 MB Download vor der ersten Frage — im Hallen-WLAN, auf
Telefonen, für eine Funktion, die viele gar nicht öffnen.

---

## Was gegenüber dem Standalone-Entwurf fehlt

| Weggelassen | Warum |
|---|---|
| Verweise ins Wiki | Der Campus hat kein Wiki. Links dorthin gingen ins Leere. THI nennt Artikel und Abschnitt stattdessen im Fließtext. |
| Quellenliste unter der Antwort | Dasselbe: sie bestand aus Wiki-Pfaden. |
| `app_navigieren` | Das Werkzeug sprang in Plattformbereiche (Kurse, Zertifikate, Forum), die es im Campus nicht gibt. |
| Rollen und Anmeldung | Der Campus kennt keine Nutzer. Interne Inhalte sind stattdessen beim Bau entfernt. |
| Strukturierte Fallaufnahme | Das Formular für Baujahr, Modell, Seriennummer. Die Systemanweisung fragt dieselben Angaben bei Bedarf im Gespräch ab — ein sechsfeldriges Formular vor der ersten Frage passt nicht zu einem Panel, das zwischendurch aufgeht. |

---

## Was geprüft ist

```bash
node tools/test-thi.js
```

69 Prüfungen, ohne API-Schlüssel lauffähig — der Modellaufruf geht gegen einen
nachgebildeten Anymize-Dienst. Damit ist der komplette Weg belegt, bevor der
erste Schlüssel eingetragen wird:

- **Bestand** — Größe, keine internen Artikel, keine internen Abschnitte, keine
  Rohfelder der Händler-Projektion.
- **Retrieval** — Normalisierung, Stoppwörter, Produktaliasse und acht echte
  Fragen mit dem Artikel, der treffen muss.
- **Schutz** — ohne Schlüssel 503 mit klarer Meldung, fremde Herkunft 403, GET
  405, leerer Verlauf 400, IP-Limit 429.
- **Modell** — Werkzeugschleife über zwei Runden, Werkzeugergebnis als
  `user`-Nachricht (Anymize lehnt `role:"tool"` mit 400 ab), Streaming,
  Dienstfehler ohne Interna an den Browser.
- **Browserteil** — kein `innerHTML`, kein `localStorage`.

Der Lauf hängt in `tools/montag.js` und damit in der Prüfung vor jedem Commit.

Zusätzlich im Browser geprüft: Ein Modelltext mit `<img onerror=…>` und
`<script>` erzeugt keine Elemente und führt nichts aus — er erscheint als
sichtbarer Text.

---

## Gestaltung

Der Schalter erbt `.masthead-tool` aus `styles.css` und steht damit in derselben
Reihe wie Arbeitskarte und Feedbackbogen. Statt eines Strichsymbols trägt er
das Gesicht von THI — in einer Reihe gleich aussehender Werkzeuge ist das der
Unterschied, der auf einen Blick trägt. Ein grüner Punkt weist auf ihn hin,
solange THI in dieser Sitzung noch nicht geöffnet wurde.

Das Panel fährt von rechts ein; ab 640 px Fensterbreite abwärts füllt es den
Bildschirm. Farben, Radien und Schatten kommen aus den Tokens des Campus.

**Eine Eigenheit, die man kennen muss:** `body` trägt `zoom: .8`. Fixierte
Elemente erben diesen Zoom, und die Viewport-Einheiten verhalten sich darin
nicht einheitlich — gemessen entsprach `100dvh` der vollen Fensterhöhe,
`100vw` dagegen nur 80 % der Fensterbreite. Panel und Schleier werden deshalb
über gegenüberliegende Kanten aufgespannt (`top`/`right`/`bottom`) statt über
`width` und `height`. Eine Kante bei 0 bleibt bei 0, unabhängig vom Zoom.

Feste Pixelwerte werden dagegen **nicht** kompensiert: Sie sollen mitskalieren,
damit THI dieselbe scheinbare Größe hat wie der Rest der Seite. Die 460 px
Panelbreite erscheinen also als 368 px.

---

## Der Verlauf

Bis zu 24 Nachrichten, gespeichert in **sessionStorage**. Die Campus-Tablets
werden weitergereicht — ein Verlauf in `localStorage` zeigte dem nächsten
Teilnehmer die Fragen des vorigen. sessionStorage übersteht Screenwechsel und
Neuladen und endet mit dem Tab. „Gespräch löschen" räumt sofort auf.

---

## Offene Punkte

- **Kein Kostendeckel.** Siehe oben: die Grenzen liegen im Speicher einzelner
  Function-Instanzen. Ein harter Deckel gehört ins Anymize-Konto.
- **Kein Zugangsschutz.** Wer die Adresse kennt, kann fragen. Solange der
  Campus selbst offen erreichbar ist, ist das gleichauf; sobald es eine
  Anmeldung gibt, sollte die Function sie mitprüfen.
- **THI läuft neben dem laufenden Wissenscheck.** Die Systemanweisung verbietet
  das Herausgeben von Lösungen, und die Fragensätze liegen nicht im
  Wissensbestand. Ein Sprachmodell ist aber keine Zugriffskontrolle: wer die
  Antwort auf eine Quizfrage fachlich erfragt, bekommt die Fachauskunft. Das
  ist gewollt — der Wissenscheck prüft Verstandenes, nicht Auswendiggelerntes.
  Soll THI während der Bewertung ganz aus, gehört der Schalter hinter eine
  Abfrage des Bildschirmzustands.
- **Der Bestand ist vom 13.08.2026.** Ein neuer Wiki-Stand braucht einen neuen
  Lauf von `tools/thi-wissen-bauen.js`.
