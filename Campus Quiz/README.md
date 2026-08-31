# THITRONIK Campus — Wissenscheck

Die digitale Wissenskontrolle nach jeder Schulungsinsel. Statische Seite, kein
Framework. Die Netlify-Function bewertet serverseitig; in der Pilotphase
speichert Netlify Forms, später kann Supabase zugeschaltet werden.

**Eine Engine, sieben Fragensätze.** Nicht sieben Anwendungen — das ist die
zentrale Entscheidung dieses Projekts und der Grund, warum es überhaupt neu
gebaut wurde.

---

## Aufbau

| Pfad | Zweck |
|---|---|
| `public/index.html` | Die Hülle. Alle fünf Bildschirme liegen darin, die Engine blendet um. |
| `public/assets/engine.js` | Die Engine: Routing, Fragetypen, Sofortauflösung, Auswertung, Versand |
| `public/assets/styles.css` | Stile. Tokens aus dem bestehenden Fehmarn-/Vejrø-Quiz übernommen. |
| `public/data/inseln.json` | Der Insel-Index für die Übersicht |
| `public/data/inseln/*.json` | **Die Fragen.** Eine Datei je Insel. |
| `public/media/<insel>/` | Bilder der Bildfragen. SAMSØ ist bestückt, der Rest fehlt noch. |
| `BILDER-WUNSCHLISTE.md` | Was an Bildern fehlt, über alle Inseln — mit Angabe, was generierbar ist und was ein echtes Foto braucht |
| `FOTOLISTE-HIDDENSEE.md` | Dasselbe ausführlich für HIDDENSEE, mit Aufnahmehinweisen |
| `tools/bilder-aufbereiten.js` | Rechnet Bilder auf WebP unter 150 KB um |
| `netlify/functions/submit-quiz.js` | Bewertet serverseitig; schreibt nach Supabase oder gibt den geprüften Netlify-Forms-Ausweichweg frei |
| `supabase_campus_quiz_migration.sql` | Tabelle und Auswertungs-Views. **Noch nicht eingespielt.** |
| `tools/build-insel.js` | **Baut je Insel einen fertigen Netlify-Ordner.** Siehe unten. |
| `tools/check-fragen.js` | Prüft die Fragensätze. Vor jedem Deploy laufen lassen. |
| `tools/test-function.js` | Testet die Bewertungslogik der Quelle ohne Datenbank |
| `tools/test-paket.js` | Testet die Function eines **erzeugten** Pakets |
| `tools/dev-server.js` | Lokaler Server, bildet die Netlify-Redirects nach |
| `tools/bilder-aus-bestandsquiz.js` | Löst die eingebetteten Bilder aus einem alten Quiz heraus |
| `netlify/functions/thi.mjs` | **THI**, der Assistent — siehe [`THI.md`](THI.md) |
| `netlify/functions/thi-lib/` | Suchkern und Campus-Wissen von THI |
| `netlify/functions/thi-wissen/` | Der Wissensbestand von THI. Erzeugt, nicht von Hand ändern. |
| `public/assets/thi.js`, `thi.css` | THI im Browser: Schalter in der Kopfzeile und Panel |
| `tools/test-thi.js` | Prüft THI — ohne API-Schlüssel lauffähig |

**Inhalt steht in den JSON-Dateien, nicht im Code.** Eine Frage zu ändern heißt,
eine JSON-Datei zu ändern — sonst nichts.

---

## Veröffentlichung

Für den weitesten Stand wird **eine gemeinsame Netlify-Site** aus dem
Repository gebaut. Die verbindliche Konfiguration liegt eine Ebene höher in
`netlify.toml`; die kurze Anleitung steht in `NETLIFY-DEPLOY.md`.

Die folgenden Einzelpakete bleiben als technischer Ausweichweg erhalten.

Dieser Ordner ist die **Quelle**, nicht das Deployment. Zum Hochladen wird je
Insel ein eigenständiger Ordner erzeugt:

```bash
node tools/build-insel.js samsoe
```

```bash
node tools/build-insel.js alle
```

Das Ergebnis landet neben diesem Ordner als `Campus 1.0/Samsø Quiz/` und
enthält alles, was Netlify braucht: `netlify.toml`, `public/` mit Engine,
Stilen, Logo, Fragensatz und Bildern, dazu `netlify/functions/`. Zum
Veröffentlichen mit Function die Netlify CLI oder ein Git-Deployment verwenden.
Ein reines Drag-and-drop von `public/` liefert nur statische Dateien und reicht
für die Speicherung nicht aus.

**Warum erzeugt statt von Hand kopiert.** Sieben Kopien der Engine wären
sieben Stellen, an denen dieselbe Änderung nachgezogen werden muss — genau das
Problem, das dieses Projekt ablöst. Hier bleibt die Wahrheit in `Campus Quiz/`,
die Insel-Ordner sind Ausgabe. In jedem liegt `ZIEL-ORDNER-WIRD-ERZEUGT.txt`,
damit das auch dort steht, wo jemand versehentlich hineinbearbeitet.

**Und deshalb stehen sie seit August 2026 nicht mehr im Repository.** Ausgabe
gehört nicht in die Versionierung: 216 Dateien, ein Drittel des Projekts, bei
jeder Engine-Änderung achtfach mitgeschrieben. Zwei Zweige an derselben
Quelldatei kollidierten dadurch nicht in drei Dateien, sondern in 27. Die
Ordner stehen jetzt in `.gitignore`; nach einem frischen Klon sind sie nicht
da, bis `build-insel.js` gelaufen ist. Das ist kein Verlust — der Bau dauert
Sekunden und ist reproduzierbar, ein Merge-Konflikt ist es nicht.

Ein erzeugtes Paket unterscheidet sich in drei Punkten von dieser Quelle:

- Der Katalog `inseln.json` enthält **nur diese eine Insel**. Daran erkennt die
  Engine den Einzelbetrieb: die nackte Adresse führt direkt in die Insel, die
  Inselübersicht entfällt, und „Andere Insel" / „Nächste Insel" sind verborgen.
- Die Function bindet nur diesen einen Fragensatz ein — eine Einsendung für
  eine fremde Insel wird abgewiesen.
- Titel und Beschreibung der Seite tragen den Inselnamen.

**Bestehendes wird nicht überschrieben.** Ein Zielordner, der Inhalt hat und
keinen `ZIEL-ORDNER-WIRD-ERZEUGT.txt` trägt, stammt nicht von diesem Werkzeug —
der Generator überspringt ihn mit Hinweis. Das schützt `Fehmarn Quiz` (dort
liegt das laufende FehlerQuiz) ohne gepflegte Ausnahmeliste. Wer einen solchen
Ordner ablösen will, räumt ihn vorher weg.

### Ein erzeugtes Paket prüfen

```bash
node tools/test-paket.js "../Samsø Quiz" samsoe
```

Prüft Bewertung, Manipulationsschutz, Cache-Buster und die statisch erkannten
Netlify-Formulare. Der aktuelle Komplettlauf umfasst **167 Prüfungen der sieben
Einzelpakete und 223 Prüfungen des Gesamtpakets**.

Das Gesamtpaket wird mit demselben Werkzeug geprüft, einmal je Insel:

```bash
node tools/test-paket.js "../Campus Gesamtpaket" hiddensee
```

Eine Probe darin passt sich der Paketform an: „eine fremde Insel wird
abgewiesen" braucht im Einzelpaket nur irgendeine andere Insel, im Gesamtpaket
sind alle sieben gültig — dort nimmt der Test einen Namen, den es nirgends
gibt.

### Die Pakete

| Ordner | Insel | Fragen | Größe |
|---|---|---|---|
| `Vejrø Quiz` | VEJRØ | 10 | 5354 KB |
| `Poel Quiz` | POEL | 10 | 3856 KB |
| `Hiddensee Quiz` | HIDDENSEE | 12 | 3936 KB |
| `Samsø Quiz` | SAMSØ | 9 · 3 Bildfragen | 4842 KB |
| `Fehmarn Quiz` | FEHMARN | 11 · 1 Audiofrage | 6065 KB |
| `Usedom Quiz` | USEDOM | 10 · Bildfragen | 4814 KB |
| `Langeland Quiz` | LANGELAND | 10 | 3821 KB |
| `Campus Gesamtpaket` | **alle sieben** | 72 · 3 Bildfragen | 16238 KB |

### Das Gesamtpaket

```bash
node tools/build-insel.js gesamt
```

> **Der Feedbackbogen muss vorher gebaut sein.** Das Gesamtpaket kopiert
> `Feedbackbogen/netlify-v14/` nach `public/feedback/`; fehlt der Ordner,
> bricht der Bau mit einem Hinweis ab. Neu bauen dort mit
> `node tools/build-netlify.js`.

Der Katalog des Gesamtpakets bekommt dabei ein Feld \`feedback\`. Nur wenn es
gesetzt ist, zeigt die Inselübersicht die Kachel **Tagesabschluss** unter der
Karte. Die Quelle und die Einzelpakete enthalten den Bogen nicht — dort führte
eine fest verdrahtete Verknüpfung ins Leere, und niemand müsste daran denken.
Sind alle Inseln abgeschlossen, wechselt die Kachel auf „Expedition
abgeschlossen" und wird zur nächsten Handlung.

> Sichtbar ist die Kachel deshalb **nur gegen das gebaute Gesamtpaket**, nicht
> gegen die Quelle. Zum Ansehen: \`node tools/dev-server.js "../Campus Gesamtpaket/public"\`.

Nicht mitkopiert werden zwei Dateien: `_headers`, dessen Pfade auf die
Wurzel geschrieben sind und unter `/feedback` ins Leere zeigten — seine
Regeln stehen stattdessen in der erzeugten `netlify.toml` —, und
`README.txt`, die sich an den richtet, der hochlädt.

Erzeugt `Campus Gesamtpaket/`: alle sieben Inseln auf einer Site, Übersicht
unter `/quiz`, jede Insel unter `/quiz/<slug>`.

Der Unterschied zum Einzelpaket liegt fast ganz in den Daten. Der Katalog
bleibt vollständig — daran erkennt die Engine, dass sie die Übersicht zeigen
soll statt direkt in eine Insel zu springen. Die Function wird **unverändert**
kopiert: Sie bindet ohnehin alle sieben ein, und ihre `require`-Pfade sind
relativ zu `netlify/functions/`, im Paket also dieselben wie hier.

> **Warum es dieses Paket überhaupt gibt.** `Campus Quiz/` wäre für sich schon
> eine lauffähige Site — `netlify.toml`, Function und Katalog sind vollständig.
> Nur liegen daneben `FRAGENKATALOG.md` mit sämtlichen Lösungen, die Werkzeuge
> und das Migrations-SQL. Ausgeliefert würde davon nichts, weil `publish` auf
> `public` zeigt. Aber das hängt dann an einer einzigen Zeile, und bei einem
> Quiz ist ein öffentlicher Lösungsschlüssel der eine Fehler, der alles davor
> wertlos macht. Das Gesamtpaket enthält von vornherein nur, was ausgeliefert
> werden soll.

Zwei Bestandsquizze liegen daneben und sind **nicht** Teil dieses Systems:
`FehlerQuiz/` (`fehlerquiz-de` v4, das laufende Bildquiz, 15 Einsendungen) und
`Pro-finder Quiz/` (`pro-finder-de` v5). Beide wurden aus den gleichnamigen
Ordnern herausgenommen, damit die erzeugten Pakete dort liegen können.

### Sieben Sites oder eine? Das entscheidet über die Tipparbeit

`localStorage` gilt **pro Domain**. Daraus folgt eine Entscheidung, die man
besser vorher trifft als am Schulungstag:

| | Sieben eigene Sites | Eine Site, sieben Routen |
|---|---|---|
| Was hochgeladen wird | die sieben Insel-Ordner | `Campus Gesamtpaket/` |
| Adresse je Station | eigene Domain | `…/quiz/hiddensee` |
| Teilnehmerdaten | **an jeder Insel neu eintippen** | einmal am Tag |
| Fortschritt über die Inseln | nicht sichtbar | Übersicht zeigt „Abgeschlossen · 90 %" |
| Umgebungsvariablen | 7 × 2 setzen | 2 setzen |
| Insel unabhängig ändern | ja, nur diese neu hochladen | nein, alles zusammen |

> **Nicht `Campus Quiz/` hochladen.** Das ist die Quelle mit dem
> Lösungsschlüssel darin — für den Deploy ist `Campus Gesamtpaket/` gebaut.

Bei sieben Sites tippt jeder Teilnehmer Name, Betrieb, Händlernummer und
Tätigkeitsbereich **siebenmal** — bei zwanzig Teilnehmern sind das 560
Eingaben, jede eine Gelegenheit für eine abweichende Schreibweise des
Betriebsnamens. Ausgewertet wird über die Händlernummer, die ist stabil; die
Namen laufen auseinander.

Die Engine weiß, in welchem Fall sie läuft, und verspricht im Einzelpaket
nichts Falsches: statt „Einmal ausfüllen — für die weiteren Inseln bleiben die
Angaben gespeichert" steht dort „Damit lässt sich dein Ergebnis der Schulung
zuordnen".

**Empfehlung: eine Site.** Das entspricht auch dem Konzeptpapier, das die
Routen `/quiz/vejro` bis `/quiz/langeland` auf einem Host vorsieht. Die
Einzelpakete bleiben nützlich, wenn eine Insel getrennt laufen soll — etwa für
einen Test vor der Schulung.

Jedes Paket bringt eine `ANLEITUNG.md` mit: hochladen, die zwei
Umgebungsvariablen setzen, prüfen ob wirklich gespeichert wird — mit einer
Tabelle, welche Fehlermeldung welche Ursache hat.

---

## Die Routen

```
/quiz                 Inselübersicht
/quiz/vejro           /quiz/poel        /quiz/hiddensee   /quiz/samsoe
/quiz/fehmarn         /quiz/usedom      /quiz/langeland
```

Alle liefern dieselbe `index.html`; die Engine liest die Insel aus dem Pfad
(`netlify.toml`, Rewrite mit Status 200). Für QR-Codes am Aufsteller ist das
die stabile Adresse je Station.

`?insel=hiddensee` funktioniert als Ersatzweg, falls ein Rewrite einmal nicht
greift.

---

## Die wichtigste Entscheidung: der Browser bewertet nicht

Der Browser sendet ausschließlich, **was** gewählt wurde — nie, ob es richtig
war. Die Bewertung macht die Netlify-Function, gegen dieselbe JSON-Datei, die
auch die Engine ausliefert.

Das hat zwei Folgen, die beide beabsichtigt sind:

**Es gibt genau eine Wahrheitsquelle für die Lösungen.** Im bestehenden
Vejrø-Quiz stehen die richtigen Antworten zweimal: im HTML für die
Sofortauflösung und in der Function fürs Speichern, beide von Hand gepflegt.
Genau dort läuft still etwas auseinander. Hier liest die Function die Fragen
per `require()` aus `public/data/inseln/` — esbuild bündelt sie mit.

**Ein manipuliertes Ergebnis landet nicht in der Datenbank.** Ein
mitgesendetes `percent: 100` oder `is_correct: true` wird ignoriert und
überschrieben. `tools/test-function.js` prüft beides.

**Was das nicht leistet:** Die richtigen Antworten stehen weiterhin im
öffentlich abrufbaren JSON. Das ist bei einer Sofortauflösung ohne Netzabfrage
je Frage unvermeidbar, und bei einer Schulung ohne Note ist es auch kein
Problem. Der Serverabgleich schützt die Datenqualität, nicht die Geheimhaltung.

---

## Die fünf Fragetypen

| Typ | Bedienung | Datenfelder |
|---|---|---|
| `single` | Eine Kachel antippen | `options[]`, `correct: ["b"]` |
| `multi` | Mehrere Kacheln, Auswahl umschaltbar | `options[]`, `correct: ["a","c"]` |
| `truefalse` | Zwei Kacheln, ohne `options` | `correct: ["richtig"]` oder `["falsch"]` |
| `order` | Schritte in der richtigen Reihenfolge **antippen** | `items[]`, `correct: [ids in Reihenfolge]` |
| `match` | Je Zeile ein Auswahlfeld | `left[]`, `right[]`, `correct: {links: rechts}` |

**Warum Antippen statt Ziehen bei `order`:** Drag-and-drop ist auf dem
Smartphone mit Handschuhen in der Werkstatt kaum bedienbar und für
Tastatur und Screenreader aufwendig. Antippen vergibt die Position, erneutes
Antippen nimmt sie zurück.

**Warum Auswahlfelder bei `match`:** Vier Zeilen mal vier Optionen wären 16
Schaltflächen auf einem 375-Pixel-Bildschirm. Das native Auswahlfeld bringt
auf iOS und Android den systemeigenen Auswähler mit.

> **Beim Formulieren: nie auf Positionen verweisen.** Die Engine mischt sowohl
> die Fragen einer Insel als auch die Optionen einer Frage. Die Buchstaben
> A–D vergibt sie erst nach dem Mischen, nach Anzeigeposition — nicht nach
> `id`. Damit zeigen „die ersten drei", „Bild B" oder „der Klassiker aus
> Frage 1" bei jedem Durchlauf woanders hin. Stattdessen den Inhalt benennen:
> „der Kleiderschrank", „die Frage mit der falsch herum liegenden Platine".
> Das gilt für `prompt`, `feedback`, `mitnehmen` und die Irrtumstexte
> gleichermaßen — kein Werkzeug kann es prüfen.

### Die Auflösung: drei Felder statt einem

Seit Fragenkatalog v3 besteht die Auflösung aus drei Teilen. `feedback` sagt,
**warum** die richtige Antwort richtig ist — das gab es vorher schon. Dazu
kommen zwei optionale Felder:

| Feld | Typ | Was es leistet |
|---|---|---|
| `irrtum` | Liste von `{ titel, text, fuer? }` | Je ein Absatz pro verbreiteter Fehlannahme; Rubrik abhängig vom Ergebnis |
| `mitnehmen` | Text | Ein Satz: Faustregel, Handgriff oder Formulierung für das Kundengespräch |

Beide sind optional, ältere Fragensätze laufen unverändert weiter.

**Es erscheinen immer alle Irrtümer, nicht nur der eigene.** Wer richtig
geklickt hat, erkennt in den übrigen die Sätze seiner Kunden wieder — das ist
der eigentliche Zweck der Rubrik. Nach einer richtigen Antwort heißt sie
neutral **„Typische Fehler"**. Nur nach einer falschen Antwort lautet die
Überschrift **„Falsch gewählt?"**, damit richtiges Verhalten nicht als Fehler
bezeichnet wird.

`fuer` nennt die Optionen, um die es dem Absatz geht. Was daraus ein Treffer
wird, leitet die Engine aus der Frage ab und muss nicht doppelt gepflegt
werden: Eine **falsche** Option trifft zu, wenn sie angekreuzt wurde
(„das hast du gewählt"), eine **richtige**, wenn sie fehlt („das hast du
übersehen"). Der eigene Irrtum wird dadurch benannt und nicht nur eingefärbt —
sonst käme die Markierung bei Farbenblindheit und im Vorlesemodus nicht an.

Bei `order` und `match` gibt es keine Optionen, auf die sich `fuer` beziehen
könnte. Dort bleiben die Absätze unmarkiert; `check-fragen.js` meldet ein
gesetztes `fuer` bei diesen Typen als Hinweis.

In `feedback`, `mitnehmen` und den Irrtumstexten macht `**Wort**` eine
Hervorhebung. Escapt wird **vor** der Ersetzung — umgekehrt wäre es eine
Lücke. Ein einzelnes `**` ohne Partner bleibt als Sternchen stehen und wird
deshalb von `check-fragen.js` gemeldet.

### Bildfragen

Nach dem Fehmarn-Muster: vier Fotos als Antwort, eines davon richtig.

Der Bildmodus wird **an den Daten erkannt**, nicht über ein Extra-Feld — sobald
eine Option ein `image` trägt, rendert die Engine Bildkacheln. Dazu kommen
`media` (Bild oberhalb der Frage) und `feedbackMedia` (Erklärbild zur
Auflösung, wie der „GPS inside"-Hinweis in Fehmarn). `layout` steuert das
Seitenverhältnis: `portrait` (3:4, Normalfall), `square`, `landscape`.

Jedes Bild lässt sich über die Lupe in Großansicht öffnen. Das ist kein Extra:
auf einem Telefon sind vier Fotos nebeneinander 155 px breit — ein
Montagefehler ist darauf nicht zu erkennen. Die Großansicht ist ein natives
`<dialog>`, damit Fokusfalle, Esc und der inerte Hintergrund vom Browser
kommen.

Zwei Entscheidungen, die sich beim Bauen ergeben haben:

**Kein `loading="lazy"` auf Antwortbildern.** Bei einer Bildfrage *sind* die
Fotos die Antwort. Lazy geladen sieht der Teilnehmer leere Kästen, und die
unteren beiden Kacheln lädt der Browser erst beim Scrollen. Stattdessen werden
die Bilder der **nächsten** Frage im Hintergrund vorgeholt.

**Die Lupe liegt neben der Kachel, nicht darin.** Ein Button im Button ist
ungültiges HTML und für Screenreader nicht bedienbar. Deshalb liegen Kachel und
Lupe als Geschwister in einem Wrapper — und die vier Kachelfarben hängen an
festen Klassen (`opt-1` bis `opt-4`) statt an `:nth-child`, weil die
DOM-Position durch den Wrapper nicht mehr der Antwortnummer entspricht.

**SAMSØ hat bereits drei echte Bildfragen.** Zwei davon zeigen Einbauorte —
Gaswarner und Pro-finder, acht geprüfte Werkstattfotos, gehoben aus dem
bestehenden FehlerQuiz. Inhaltlich gehören sie ohnehin zu SAMSØ (Einbauorte)
und nicht zur Fehlersuche. Die dritte, SAM-10, fragt mit acht Produktbildern
ab, welche Komponenten gar keinen festen Einbauort haben — dieselbe Technik,
aber als Mehrfachauswahl.

Für die übrigen Inseln fehlen die Bilder noch:
[`BILDER-WUNSCHLISTE.md`](BILDER-WUNSCHLISTE.md) listet sie über alle Inseln und
markiert, was sich generieren lässt und was ein echtes Foto braucht —
ausführlich für Hiddensee in [`FOTOLISTE-HIDDENSEE.md`](FOTOLISTE-HIDDENSEE.md).

### Bilder aufbereiten

```bash
node tools/bilder-aufbereiten.js public/media/samsoe
```

Rechnet auf WebP um, begrenzt auf 1400 px lange Kante und senkt die Qualität
schrittweise, bis das Bild unter 150 KB liegt (nicht unter q55 — darunter
werden Kanten an Kabeln und Schriftzügen matschig). Braucht einmalig
`npm install sharp --no-save`. `check-fragen.js` warnt, wenn ein Bild darüber
liegt.

### Was vor dem Start steht

Der Startbildschirm nennt in dieser Reihenfolge: Anzahl der Fragen,
Zeitbedarf samt „kein Zeitlimit", und dass die Auflösung sofort kommt. Die
Fragetypen stehen darunter hinter „Details anzeigen" — sie beschreiben die
Bedienung, nicht den Inhalt, und niemand entscheidet danach, ob er
anfängt.

Den Zeitbedarf liefert das Feld `dauerMinuten` je Insel. Er ist eine
**Schätzung** — rund 45 Sekunden je Frage einschließlich Auflösung, auf
volle Minuten aufgerundet, plus eine Minute bei Inseln mit Bildfragen.
Nach der ersten Schulung gehört er gegen echte Zeiten ersetzt. Fehlt das
Feld, entfällt die Zeile ersatzlos.

> **Die Symbole der drei Zeilen hängen an Klassen** (`fact-fragen`,
> `fact-zeit`, `fact-aufloesung`), nicht an `:nth-child`. Die Reihenfolge
> ist Redaktionssache; bei Positionsauswahl wandert sonst still das falsche
> Bild an die falsche Zeile. Gleiche Begründung wie bei `opt-1` bis `opt-4`
> an den Antwortkacheln.

### Betreuung einer Insel

Unter dem Startbildschirm steht ein Streifen mit den Betreuern der Insel:
Foto, Name und die Spezialfähigkeit in einer Zeile. Gepflegt wird er in
`public/data/betreuer.json`:

```json
{
  "personen": {
    "mm": {
      "name": "Vorname Nachname",
      "rolle": "Technik",
      "koennen": "Funkanlagen im Aufbau",
      "bild": "/media/betreuer/mm.webp"
    }
  },
  "inseln": { "hiddensee": ["mm"], "fehmarn": ["mm"] }
}
```

**Zwei Ebenen, weil eine Person mehrere Inseln betreut.** Unter `personen`
steht sie einmal, unter `inseln` wird sie zugeordnet. Bei einer flachen
Liste je Insel stünde dieselbe Person mehrfach da — und beim nächsten
Wechsel des Fotos an drei Stellen.

| Feld | |
|---|---|
| `name` | Vor- und Nachname, wie auf dem Namensschild |
| `koennen` | Die Spezialfähigkeit in einer Zeile. Nicht Titel oder Abteilung, sondern das, wofür man die Person auf der Insel anspricht. Richtwert 40 Zeichen |
| `bild` | Foto unter `public/media/betreuer/`, quadratisch, ab 240×240, WebP. Wird rund beschnitten |
| `rolle` | Optional, kleine Zeile über dem Namen |

Ohne `bild` stehen die Initialen im Kreis — ein leerer grauer Kreis sieht
aus wie ein Ladefehler. Hat eine Insel keinen Eintrag, bleibt der Streifen
**ausgeblendet**; eine Überschrift über einer leeren Liste ist eine Zusage,
die die Seite nicht einhält.

Der Ordner `public/media/betreuer/` wandert als Ganzes in beide
Paketformen — wer eine Person ergänzt, legt ein Foto ab und trägt sie ein,
mehr nicht.

**Die Fotos entstehen aus den Originalen der Website**, die im Querformat
vorliegen (meist 400×228). Ein zentrierter Quadratzuschnitt setzt das
Gesicht dabei zu hoch und zu klein; deshalb schneidet
`tools/betreuer-fotos.js` mit sharps `attention` auf 320×320 — die
auffälligste Bildregion, bei Portraits das Gesicht:

```bash
node tools/betreuer-fotos.js "../export/Bilder Thitronik Mitarbeiter"
```

Die Zuordnung Originaldatei → Zieldatei steht in dem Werkzeug, weil die
Originale Umlaute und Leerzeichen tragen und die Zieldateien ASCII sind.
Wer eine Person ergänzt, trägt sie dort **und** in `betreuer.json` ein.

### Eine Insel ohne Wissenscheck

> **Derzeit hat keine Insel dieses Feld.** RÜGEN, die Verpflegungsinsel,
> war am 31.08.2026 kurz eingebaut und ist auf Wunsch wieder aus dem
> Frontend genommen worden. Die Mechanik ist vollständig erhalten
> geblieben, ebenso die Silhouette und die Fotos der beiden Betreuerinnen
> — der Wiedereinbau ist der Block am Ende dieses Abschnitts.

Eine Station, die auf der Campus-Karte steht, aber keinen Fragensatz hat,
trägt in `public/data/inseln.json` das Feld

```json
"wissenscheck": false
```

Das Feld steht **negativ**, damit die Lerninseln nichts eintragen müssen —
ein vergessenes Feld macht eine Insel zur Lerninsel, nicht umgekehrt. Eine
Insel, die still aus Fortschritt und Prüfung fällt, fällt niemandem auf.

Dieselbe Regel steht unter demselben Namen `hatWissenscheck()` an fünf
Stellen, weil jede von ihnen sonst einen Fragensatz erwartet:

| Datei | was sonst passiert |
|---|---|
| `public/assets/engine.js` | Fortschritt zählt „x von 8", der Balken erreicht nie 100 %; `/quiz/ruegen` meldet „Fragensatz konnte nicht geladen werden" |
| `tools/check-fragen.js` | meldet den fehlenden Fragensatz als Fehler |
| `tools/build-insel.js` | bricht den Bau des Gesamtpakets ab |
| `tools/fragenkatalog.js` | bricht mit `ENOENT` ab |
| `Feedbackbogen/tools/build-index-v14.js` | Rügen stünde doppelt im Bogen — dort gibt es die Catering-Kachel schon |

Statt des Fortschritts zeigt die Kachel die Betreuung mit Foto und Namen,
und sie ist ein `div` statt eines Knopfes: Ein Knopf, der nichts tut,
verspricht ein Quiz, das es nicht gibt. Ein Aufruf von `/quiz/<slug>`
landet auf der Übersicht statt auf einer Fehlermeldung.

Die Silhouette erzeugt `tools/ruegen-silhouette.js` — die übrigen sieben
Motive sind gezeichnet, für Rügen gab es keins. Sie ist eng auf die Kontur
zugeschnitten, weil Rügen in der schmalsten Kachel der Karte sitzt: In der
Ecke oben links steht die Überschrift „Deine Schulungsexpedition"
(gemessen 0–36 % Breite, 0–30 % Höhe), frei ist allein unten rechts.

**Rügen zurückholen** — die Kachelposition steht als `.island-ruegen` in
`styles.css`, das Motiv liegt unter `public/media/inseln/ruegen.webp`, die
Fotos unter `public/media/betreuer/`. Es fehlen nur zwei Einträge.

In `public/data/inseln.json` als letzte Insel:

```json
{
  "slug": "ruegen",
  "name": "Rügen",
  "code": "RÜGEN",
  "title": "Verpflegung",
  "thema": "Pause, Essen & Tagesablauf",
  "beschreibung": "Die Versorgungsinsel der Expedition. Kein Wissenscheck - hier gibt es Kaffee, Essen und Auskunft zum Tagesablauf.",
  "image": "/media/inseln/ruegen.webp",
  "wissenscheck": false
}
```

In `public/data/betreuer.json` unter `personen` und `inseln`:

```json
"hermine-bender": {
  "name": "Hermine Bender",
  "koennen": "Verpflegung und Tagesablauf",
  "bild": "/media/betreuer/hermine-bender.webp"
},
"carolin-kinder": {
  "name": "Carolin Kinder",
  "koennen": "Verpflegung und Tagesablauf",
  "bild": "/media/betreuer/carolin-kinder.webp"
}
```

```json
"ruegen": ["hermine-bender", "carolin-kinder"]
```

Danach `node tools/montag.js --ohne-server`. `ENGINE_VERSION` muss dafür
**nicht** hoch: Es ändern sich nur Daten unter `/data/`, und die werden
laut `netlify.toml` ohnehin nur 300 s gecacht.

### Eine Frage ergänzen

1. Frage in `public/data/inseln/<insel>.json` eintragen
2. `node tools/check-fragen.js`
3. **`version` in der Datei hochzählen** — sonst weisen laufende Browsersitzungen
   die Einsendung ab (die Function prüft die Version gegen den Fragensatz)

### Engine oder Stile ändern

**`ENGINE_VERSION` in `engine.js` hochzählen.** Sie ist der einzige
Cache-Schlüssel: `netlify.toml` liefert `/assets/*` mit
`max-age=31536000, immutable` aus. Bleibt die Zahl stehen, holt der Browser
eines Teilnehmers **ein Jahr lang** die alte Engine aus seinem Cache — und
zwar genau der, der die Seite schon einmal offen hatte.

Die vier `?v=`-Marken in `index.html` (styles.css, thi.css, engine.js,
thi.js) setzt `build-insel.js` beim Bauen selbst aus `ENGINE_VERSION` ein;
im Paket sind sie also immer stimmig. In der Quelle sollten sie trotzdem
mitgezogen werden, sonst liefert der lokale Entwicklungsserver alte Dateien
aus.

> **Geprüft wird das nicht.** `test-paket.js` vergleicht nur, ob die Marken
> zur Fassung passen — und das tun sie immer, weil der Bau sie von dort
> nimmt. Ob jemand die Fassung überhaupt *hochgezählt* hat, merkt niemand.
> Siehe [`BACKLOG.md`](../BACKLOG.md).

### Eine Insel ergänzen

Zusätzlich: Eintrag in `public/data/inseln.json`, eine `require()`-Zeile in
`netlify/functions/submit-quiz.js`, und der Insel-Schlüssel muss in den
`check`-Constraint der Tabelle. `check-fragen.js` meldet die vergessene
`require()`-Zeile.

---

## Teilnehmerdaten

Vier Felder: Name, Händlerbetrieb, Händlernummer, Tätigkeitsbereich. Die ersten
drei sind Pflicht.

**Einmal am Tag, nicht siebenmal** — sofern alle Inseln auf **einer** Site
laufen. Die Angaben liegen im `localStorage`, und der gilt pro Domain; bei
sieben getrennten Sites tippt jeder sie siebenmal. Siehe
[Sieben Sites oder eine?](#sieben-sites-oder-eine-das-entscheidet-über-die-tipparbeit).

**Sind die drei Pflichtfelder gefüllt, faltet sich das Formular zu einer
Zeile zusammen** — Name, Betrieb, Händlernummer, Tätigkeitsbereich, dazu
„Angaben ändern". Das Versprechen „einmal ausfüllen" stand vorher nur im
Text, während auf jeder Insel wieder vier leere Felder erschienen. Das
Formular bleibt im Dokument und ist einen Klick entfernt.

Der Tätigkeitsbereich ist bewusst **nicht** Bedingung für die
Zusammenfassung: Er ist freiwillig, und ein freiwilliges Feld darf die
Darstellung nicht blockieren. Fehlt beim Absenden trotzdem etwas — etwa
weil jemand die Angaben geöffnet und geleert hat —, klappt das Formular
von selbst wieder auf, bevor die Fehlermeldung erscheint. Sonst zeigte sie
auf ein Feld, das gerade niemand sieht, und der Fokussprung ginge ins
Leere.

**Händlernummer:** fünfstellige Zeichenkette, `type="text"` mit
`inputmode="numeric"` — nicht `type="number"`, das würde die führende Null
schlucken (03451 wird 3451). Beim Tippen fällt alles weg, was keine Ziffer
ist; erst putzen, dann auf fünf kappen. `" Nr. 34512"`, `"34 512"` und
`"3-4-5-1-2"` werden alle zu `34512`.

Sie ist gleichzeitig das Bindeglied zum Feedbackbogen — nur darüber lassen
sich Quizergebnis und Schulungsbewertung zusammenbringen.

> **In der Function wird die Händlernummer bewusst *nicht* auf fünf Zeichen
> gekappt.** Aus `"34512x"` würde sonst `"34512"`, und die Prüfung winkt eine
> ungültige Nummer durch — das Kappen erzeugt die Gültigkeit. Bei Name und
> Betrieb ist Kappen dagegen harmlos.

---

## Vorschaumodus

`?demo=1` läuft vollständig durch und zeigt die Auswertung, speichert aber
absichtlich nichts. **Für Tests immer verwenden**, sonst landen Testdaten in
der Produktivdatenbank. Gleiche Konvention wie im Feedbackbogen.

---

## Lokal starten

```bash
node tools/dev-server.js
```

Dann `http://localhost:8788/quiz`. Der Server bildet die Netlify-Rewrites nach,
damit `/quiz/hiddensee` lokal genauso funktioniert wie im Deployment. Die
Function gibt es lokal nicht — sie antwortet mit 501, damit die Engine ihren
Fehlerpfad zeigt. Lokal deshalb mit `?demo=1` arbeiten.

Ein **erzeugtes Paket** prüft man, indem man dessen `public/` als Wurzel angibt:

```bash
node tools/dev-server.js "../Samsø Quiz/public"
```

Vor jedem Deploy:

```bash
node tools/check-fragen.js
```

```bash
node tools/test-function.js
```

---

## Der Sende-Ausgang

**Ein fertiges Ergebnis ist erst dann sicher, wenn der Server es bestätigt
hat.** Bis dahin liegt es im `localStorage` unter
`thitronik.campus.2026.ausgang` — auf der Platte, nicht im Arbeitsspeicher.
Die Reihenfolge in `finish()` ist der ganze Punkt:

```
Ergebnis bauen  →  in den Ausgang schreiben  →  senden  →  bei Erfolg löschen
```

Vorher wurde zuerst gesendet und der Datensatz nur im Arbeitsspeicher
gehalten. Ein Funkloch in der Halle reichte damit aus, um ihn zu verlieren:
Der Teilnehmer sah „Keine Verbindung", tippte auf „Nächste Insel" — und der
Datensatz war weg, während die Übersicht daneben „✓ Abgeschlossen · 80 %"
zeigte. Das ist der Zustand, den ein Wissenscheck am wenigsten gebrauchen
kann: eine Lücke in der Auswertung, die niemandem auffällt.

**Nachgesendet wird ohne Zutun des Teilnehmers**, denn er ist längst an der
nächsten Station:

| Auslöser | wann |
|---|---|
| Seitenaufruf | jedes `boot()`, nach dem Laden des Katalogs |
| `online`-Ereignis | sobald der Browser wieder Netz sieht |
| nach jeder Runde | direkt im Anschluss an `submit()` |
| „Jetzt senden" | von Hand, nimmt auch abgelehnte Einträge mit |

**Wiedereinsenden ist gefahrlos.** `session_id` ist in der Datenbank `unique`,
die Function antwortet auf ein bereits bekanntes Ergebnis mit
`200 { duplicate: true }` statt einen zweiten Datensatz anzulegen. Ein
Eintrag, der es doch durchgeschafft hat, verschwindet also auch dann aus dem
Ausgang, wenn die Antwort von damals nie ankam.

> Das Ergebnisbild sagt bei `duplicate` nicht mehr „Ergebnis war bereits
> gespeichert", sondern wie sonst „Ergebnis gespeichert. Danke!". Mit dem
> Ausgang ist ein zweiter Anlauf der Normalfall und kein Sonderfall mehr —
> für den Teilnehmer ist das schlicht dieselbe gute Nachricht.

**Nicht jeder Fehler ist derselbe Fehler.** Die Unterscheidung entscheidet,
ob weiter versucht wird:

| Antwort | Deutung | Automatik |
|---|---|---|
| `2xx` | gespeichert (oder war es schon) | Eintrag wird gelöscht |
| kein Netz | Funkloch | bleibt liegen, nächster Anlauf später |
| `5xx`, `408`, `429` | Server war da, konnte aber nicht | bleibt liegen, nächster Anlauf später |
| übrige `4xx` | Absage an genau diesen Datensatz | wird als abgelehnt markiert, **keine** Automatik mehr |

Fehlen die Supabase-Variablen oder ist die Datenbank nicht erreichbar, liefert
die Function nach erfolgreicher Prüfung einen klaren Netlify-Forms-Ausweichweg.
Der Browser speichert das Pilot-Ergebnis dann in `campus-quiz-result`. Ist auch
Netlify Forms nicht erreichbar, bleibt der Eintrag im Sende-Ausgang und wird
später erneut versucht.

Ein `400` wird nicht im Minutentakt wiederholt — daran ändert sich nichts.
Der Eintrag bleibt trotzdem stehen, sichtbar und rot, mit der Bitte, sich bei
der Schulungsleitung zu melden. Stillschweigend wegwerfen wäre genau der
Datenverlust, den der Ausgang verhindern soll.

**Wo man das sieht:**

- **Über allen Bildschirmen** ein Hinweisband mit „Jetzt senden". Es steht
  bewusst nicht in der Inselübersicht: Im Einzel-Insel-Paket gibt es diese
  Übersicht gar nicht, und dort wäre der Hinweis unsichtbar. Während einer
  laufenden Frage und auf dem Ergebnisbild bleibt es ausgeblendet — mitten im
  Quiz kann niemand etwas daran ändern, und auf dem Ergebnisbild steht die
  genauere Zeile schon unter dem Ring.
- **Auf der Inselkachel** „Abgeschlossen · 80 % — noch nicht gesendet", in
  Cyan mit `↻` statt in Lime mit `✓`. Lime würde hier eine Sicherheit
  behaupten, die es nicht gibt.
- **Unter dem Ergebnisring** der Stand dieser einen Runde.

Kacheln aus der Zeit vor dem Ausgang tragen keine `session` und gelten als
versendet — ein Ergebnis, das es nicht mehr gibt, lässt sich ohnehin nicht
nachreichen.

> Lässt sich der `localStorage` nicht beschreiben (privater Modus, Speicher
> voll), hält eine Liste im Arbeitsspeicher die Einträge bis zum Schließen
> des Tabs. Besser als nichts, und mehr behauptet der Statustext dann auch
> nicht.

---

## Gesamtfortschritt

Über der Inselübersicht steht, wie weit der Tag ist: „3 von 7 Inseln
abgeschlossen · 78 % im Schnitt", darunter ein Balken. Er erscheint erst mit
der ersten abgeschlossenen Insel — davor wäre es ein Balken auf null, der
nichts erzählt, und im Einzel-Insel-Paket gar nicht.

Auf dem Ergebnisbild steht über den Knöpfen, was noch aussteht
(„Noch offen: SAMSØ · FEHMARN · USEDOM"). Daneben liegt „Nächste Insel" —
dann darf dort auch stehen, welche das überhaupt noch sein können. Sind alle
durch, steht es ebenfalls da.

Beides liest ausschließlich `thitronik.campus.2026.done`, also den lokalen
Stand dieses Geräts. Es ist eine Orientierung für den Teilnehmer, keine
Auswertung — die kommt aus der Datenbank.

---

## Pilotbetrieb und späteres Backend

Vor der Datenbankphase werden gültige Quiz-Ergebnisse in Netlify Forms
gesammelt. Netlify zeigt sie im Site-Dashboard und exportiert sie als CSV. Die
Function prüft und bewertet jede Einsendung trotzdem serverseitig; manipulierte
Prozentwerte aus dem Browser werden weiterhin ignoriert.

### Später: Supabase

Supabase-Projekt `mhzlayhnyqlxdyiceyqz`, Tabelle `campus_quiz_submissions`.

Die Tabelle ist **neu** und lässt die bestehende `quiz_submissions` (27 Zeilen
aus `fehlerquiz-de` und `pro-finder-de`) unangetastet — die beiden alten Quizze
laufen unverändert weiter. `quiz_submissions` kennt weder Insel noch
Händlernummer noch Tätigkeitsbereich und trägt eine andere `answers`-Struktur;
sie nachträglich umzubauen hieße, 27 Zeilen mit NULL zu füllen und jede
Auswertung mit einer Fallunterscheidung zu belasten.

RLS ist aktiv und es gibt **bewusst keine Policy**: weder `anon` noch
`authenticated` kommen an die Tabelle. Die Function schreibt mit dem Secret Key
und umgeht RLS. Dasselbe Muster wie bei `campus_feedback`.

### Netlify-Umgebungsvariablen

| Variable | Wert |
|---|---|
| `SUPABASE_URL` | `https://mhzlayhnyqlxdyiceyqz.supabase.co` |
| `SUPABASE_SECRET_KEY` | Der Secret Key aus den Projekteinstellungen |

Der Secret Key gehört **ausschließlich** in die Netlify-Umgebung, nie in den
Browser-Code. Moderne `sb_secret_`-Keys werden nur im `apikey`-Header gesendet;
alte `service_role`-JWTs zusätzlich als Bearer-Token. Die Function unterscheidet
das selbst.

### Auswertungs-Views

| View | Beantwortet |
|---|---|
| `campus_quiz_inseln` | Ergebnisse je Insel, schwächste zuerst |
| `campus_quiz_fragen` | Trefferquote je Frage, schwierigste zuerst |
| `campus_quiz_taetigkeit` | Verkauf gegen Werkstatt |
| `campus_quiz_und_feedback` | Quizergebnis und Schulungsbewertung je Händlernummer |

`campus_quiz_fragen` ist die eigentliche Kernauswertung des Konzepts: Eine
Frage, bei der viele danebenliegen, zeigt präzise, welchen Punkt die Station
schärfer betonen muss. Eine Frage mit 100 % liefert dagegen keine Information —
sie gehört überarbeitet oder ersetzt.

---

## Gestaltung

Verbindlich ist die Markenpalette, nicht die Empfehlung eines Design-Skills.

| Token | HEX | Einsatz |
|---|---|---|
| Navy | `#1D3661` | Flächen, primäre Buttons, Überschriften |
| Cyan | `#3BA9D3` | Akzente, Fokus-Ring, Fortschritt |
| Lime | `#AFCA05` | Richtig-Zustand, Bestwert. Nie als Textfarbe auf Hell. |
| Rot | `#CE132D` | Falsch-Zustand, Fehler — und der Abbrechen-Knopf. Sonst nicht. |

Für Text auf hellem Grund gibt es `--th-lime-text` (`#6B7D00`), weil `#AFCA05`
auf Weiß keinen AA-Kontrast erreicht.

**Warum „Abbrechen" rot sein darf.** Die Regel lautete ursprünglich „Falsch-
Zustand und Fehler, sonst nicht". Rot am Abbrechen-Knopf ist trotzdem kein
neuer Bruch: Der Knopf war schon vorher rot spezifiziert — nur ausschließlich
im `:hover`. Genau die Rückmeldung erreicht das Telefon in der Werkstatt nie,
dort wird getippt. Im Ruhezustand blieb ein Rahmen in `--th-line` (`#DDE2E7`),
der auf Weiß auf **1,2 : 1** kommt und praktisch unsichtbar ist. Die Farbe ist
jetzt dort, wo sie ankommt. Inhaltlich passt sie: Abbrechen verwirft alle
bisherigen Antworten.

**Logo:** `assets/thitronik-logo.png` — die Navy-Wortmarke mit rotem Segel und
„Alarmtechnik made in Germany", dieselbe, die das Fehmarn-Quiz im Kopf trägt.
Als Datei, nicht als Base64: 88 KB werden einmal geladen und gecacht, statt in
jedem Dokument mitzureisen.

> Die anderen Logo-Dateien im Wissenspaket passen hier **nicht**.
> `Logo Classic.png` bringt Navy als eigene Fläche mit, `Logo White.png` und
> `Feedbackbogen/assets/thitronik-logo.png` sind weiß auf transparent — auf dem
> hellen Kopf unsichtbar.

Die vier Antwortkacheln tragen Navy, Cyan, Lime und Rot — aus Entfernung
unterscheidbar, übernommen aus dem bestehenden Quiz. Am fertig gerenderten
Bild nachgemessen: Kachelbuchstaben 11,98 / 7,02 / 10,14 / 5,59 zu 1,
Antworttext 18,88 zu 1. Alle über AA.

Alle Trefferflächen liegen bei mindestens 44 × 44 px, auch die Nebenbuttons.
WCAG 2.5.8 verlangt weniger, aber die Bedienung findet am Fahrzeug statt. Der
Abbrechen-Knopf misst 120 × 44 px, Schrift und Rahmen kommen auf 5,59 : 1 —
über AA für Text und über den 3 : 1, die WCAG 1.4.11 für Bedienelemente
verlangt.

Sein `×` steht als eigenes `<span aria-hidden="true">` im Markup, nicht als
`::before`. Erzeugte Inhalte liest ein Screenreader je nach Programm mit —
daraus würde „Multiplikationszeichen Abbrechen".

Light Mode ist verbindlich: Der Campus findet in hellen Räumen und draußen
statt. Ein Dark Mode ist bewusst nicht gebaut.

---

## Was geprüft ist

Gemessen, nicht geschätzt:

- Kompletter Durchlauf aller fünf Fragetypen bei 375 px und 1280 px
- Kein horizontaler Seiten-Scroll, kein Element ragt über den Viewport
- Ziffernfilter der Händlernummer gegen sechs Eingabevarianten
- 28 Tests der Bewertungslogik, darunter zwei Manipulationsversuche
- Kontrast der tragenden Farbpaare am gerenderten Bild
- Formularvalidierung mit Fokussprung auf das erste fehlerhafte Feld
- Sende-Ausgang gegen vier Serverantworten durchgespielt: Funkloch, `500`,
  `400` und `201`. Geprüft wurde, dass zwei Ergebnisse einen Reload
  überleben, beim `online`-Ereignis von selbst rausgehen, die Kacheln danach
  von Cyan auf Lime wechseln, ein `400` nicht endlos wiederholt wird und
  „Jetzt senden" ihn trotzdem noch einmal versucht
- Einzel-Insel-Paket gesondert: dort trägt das Startbild den Hinweis, weil es
  keine Übersicht gibt
- Kontrast der neuen Paare am Rechenwert: alle über 4,7:1
- Bildfragen gegen einen Probedatensatz: Kacheln zweispaltig auch auf 375 px
  (155 × 206 px), alle vier Bilder geladen, Großansicht als echtes Modal mit
  Fokus im Dialog, Auflösung markiert gewählt-falsch und übersehen-richtig
  getrennt, kein verschachtelter Button, Lupe 44 × 44 bei 6 % Kachelfläche
- 74 Prüfungen für THI, darunter der komplette Modellweg gegen einen
  nachgebildeten Anymize-Dienst — siehe [`THI.md`](THI.md)

**Nicht geprüft:** echte Hardware. Getestet wurde emuliert. Offen bleibt, was
sich nur auf einem echten Gerät zeigt — iOS-Safari mit eingeblendeter Tastatur,
die Adressleiste beim Scrollen, echte Berührungseingabe, und vor allem das
Mobilfunknetz in der Halle.

---

## Offene Punkte

**1. Die Migration ist noch nicht eingespielt.** Bis `supabase_campus_quiz_migration.sql`
läuft, gibt es die Tabelle nicht und jede Einsendung scheitert mit
„Die Datenbank hat die Speicherung abgelehnt." Der Teilnehmer sieht sein
Ergebnis trotzdem — gespeichert wird es nicht.

Seit dem [Sende-Ausgang](#der-sende-ausgang) ist das kein endgültiger Verlust
mehr: Die Ergebnisse bleiben auf den Geräten liegen und gehen von selbst
raus, sobald die Tabelle steht — sofern dieselben Geräte die Seite noch
einmal aufrufen. Darauf zu bauen wäre trotzdem leichtsinnig. Die Migration
gehört vor die Schulung, nicht danach.

**2. Bildfragen: SAMSØ steht, den übrigen Inseln fehlen die Fotos.** Die
Technik ist fertig und mit echtem Material bewiesen — SAMSØ hat drei
Bildfragen aus acht Werkstattfotos und acht Produktbildern. Für HIDDENSEE, USEDOM, VEJRØ und
POEL fehlen die Aufnahmen; siehe [`BILDER-WUNSCHLISTE.md`](BILDER-WUNSCHLISTE.md).
Ab dann ist es reine Datenarbeit an den JSON-Dateien.

Produktbilder für USEDOM und zwei Hiddensee-Fragen liegen bereits in
`Wissen/03_Medien/produkte/`, allerdings mit je gut 2 MB — vorher durch
`tools/bilder-aufbereiten.js` schicken.

**3. POEL braucht noch den Login-Abgleich.** Der Händlerbereich ist
login-geschützt; die konkrete Verfügbarkeit und Benennung der geschützten
Einbauunterlagen (`POE-03`) und Werbemittel (`POE-06`) muss im echten Konto
geprüft werden. Der Hinweis steht als `internerHinweis` in der JSON-Datei — er
erscheint bewusst **nicht** im Quiz, sondern in der Ausgabe von
`tools/check-fragen.js` und im erzeugten `FRAGENKATALOG.md`.

**4. VEJRØ zeigt die Produktneuheiten.** CampLock/VanLock, Funk-Wassermelder
868 und wasserdichter Funk-Magnetkontakt sind eingebaut. Einsatzbereiche,
Montagewerte und aktuelle Freigabestände müssen vor der Schulung noch einmal
gegen die dann gültigen Produktunterlagen geprüft werden.

**5. Das bestehende FehlerQuiz ist nicht migriert.** `fehlerquiz-de` (6
Bildfragen, 15 Einsendungen) liegt jetzt unter `FehlerQuiz/` und läuft
weiterhin getrennt. Der Fragensatz `fehmarn.json` hier ist die
anspruchsvollere zweite Ebene, kein Ersatz — beide können nebeneinander
bestehen.

Eine Migration bedeutet vor allem, 3,0 MB Base64-Bilder aus einer einzigen
HTML-Zeile zu lösen und als Dateien abzulegen. Dafür gibt es ein Werkzeug:

```bash
node tools/bilder-aus-bestandsquiz.js "../FehlerQuiz/index.html" public/media/fehmarn
```

Es benennt die Bilder nach der Frage, zu der sie gehören (`Q02-1.webp`), damit
die Zuordnung beim Übertragen ins JSON-Schema nicht verlorengeht — 28 Bilder,
2,8 MB. Danach durch `bilder-aufbereiten.js` schicken.

Vorher müssten aber die beiden Befunde unter 5a geklärt sein, sonst wandern
sie mit.

> **Der Ordner war ohnehin nie deploybar:** seine `netlify.toml` deklariert
> `publish = "public"` und `functions = "netlify/functions"` — beide
> Verzeichnisse gibt es dort nicht, und die `index.html` liegt im
> Wurzelverzeichnis. Die Live-Version muss aus einer anderen Quelle stammen.
> Wer `FehlerQuiz/` künftig deployen will, muss das erst geradeziehen.

**5a. Zwei Befunde am laufenden FehlerQuiz.** Aufgefallen beim Sichten der
Bilder, beide **nicht** behoben — bewusst, weil die Entscheidung Fachwissen
braucht und das Quiz live ist.

Zur Einordnung vorweg: `correct` indexiert das `images`-Array und ist
0-basiert (`question.correct + 1` in der Anzeige). Das ist geprüft — bei Q01
und Q03 passt der so gelesene Schlüssel jeweils zum Feedbacktext.

**Q01 — die Bildbeschreibungen sind um eine Position verrutscht.**
Der Antwortschlüssel ist richtig (`correct: 3` trifft das bodennah montierte
Gerät, wie es der Feedbacktext verlangt). Falsch sind die `alts`: Bild 1 zeigt
die runde Öffnung mit Montageplatte, beschrieben wird „Sitzkasten in
Bodennähe"; Bild 4 zeigt den Sitzkasten, beschrieben wird „Bedienkonsole". Die
Zuordnung ist durchgehend um eins rotiert.

Das trifft niemanden, der sieht — aber jeden, der vorlesen lässt, und jeden,
bei dem ein Bild nicht lädt. Für die nach SAMSØ übernommenen Fotos wurden die
Alt-Texte deshalb neu geschrieben.

**Q02 — die Frage passt nicht zu ihren Bildern.**

> Q02 fragt: *„Auf welchem Bild ist der Funk-Magnetkontakt korrekt montiert?"*
> Drei der vier Bilder zeigen einen THITRONIK-**Alarmaufkleber an einer
> Scheibe**. Nur das vierte zeigt einen Funk-Magnetkontakt am Aluprofil.
> Hinterlegt ist `"correct": 2` — die Zählung ist 0-basiert (`question.correct + 1`
> in der Anzeige), also **das dritte Bild: ein Aufkleber**. Das einzige Bild mit
> einem Magnetkontakt gilt als falsch.

Anders als bei Q01 sind hier die `alts` sauber zugeordnet — sie beschreiben
durchweg Aufkleber und passen zu den Bildern. Es ist die *Frage*, die nicht
dazugehört. Q03 (Pro-finder) ist dagegen vollständig stimmig: Bilder, `alts`
und Schlüssel passen zusammen, das als richtig markierte Bild zeigt den
„GPS inside"-Aufkleber nach oben.

Zwei mögliche Auflösungen, beide brauchen eine fachliche Entscheidung:
`correct` auf `3` setzen (dann passt die Frage zum Titel, die drei Aufkleber
bleiben schwache Ablenker), oder die Frage auf das umtiteln, was die Bilder
tatsächlich zeigen (Platzierung des Alarmaufklebers).

Betroffen sind die 15 Einsendungen auf `fehlerquiz-de` v4 mit 92 % Schnitt —
die Trefferquote dieser einen Frage ist bis zur Klärung nicht aussagekräftig.

**6. Die Themenaufschlüsselung im Ergebnis bleibt vorerst leer.** Sie blendet
sich aus, wenn jede Kategorie nur eine Frage enthält — dann wäre sie bloß die
Antwortliste in anderer Form. Bei den heutigen Fragensätzen ist das durchgehend
der Fall, weil die Kategorien Einzeletiketten sind („Der Klassiker", „Die
Falle"). Die Auswertung je Frage passiert ohnehin in `campus_quiz_fragen`.

**7. Die Fragen brauchen noch die abschließende technische Freigabe.** Der
Bestand umfasst 72 Fragen, davon zwölf auf HIDDENSEE und elf auf FEHMARN, mit den Rubriken „Falsch gewählt?" und „Mitnehmen". Die
Quellen stehen je Insel im Feld `quellen`; das Fachreview aus der Campus-Runde
ist eingearbeitet.

Offene technische Prüfpunkte stehen namentlich im `internerHinweis` der
betroffenen Insel: aktuelle Produktstände der VEJRØ-Neuheiten, konkrete
Menüpunkte im Händlerbereich und Rückruf-Serienbereich (`POE-05`), die
Auslöseschwelle über 30 mm (`HID-03`), die max. 7 m Zusatzsensorkabel
(`SAM-08`), Blinkcode 9× (`FEH-01`), Spannungsschwellen (`FEH-04`) und
Stillstandsbedingung des `kill`-Befehls (`FEH-08`), Artikelnummern und
Sirenenpegel auf USEDOM sowie Testverzögerung und Iveco-Freigabestand auf
LANGELAND.

Zum Gegenlesen dient [`FRAGENKATALOG.md`](FRAGENKATALOG.md) — erzeugt mit
`node tools/fragenkatalog.js`, nennt alle Lösungen und gehört nicht in
Teilnehmerhand.

**8. Der Abbrechen-Knopf nutzt `confirm()`.** Funktioniert, sieht aber nicht
nach dem übrigen Bogen aus. Falls es stört, ist es ein kleiner Umbau auf einen
echten Dialog.
