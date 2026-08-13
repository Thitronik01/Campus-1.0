# THITRONIK Campus — Wissenscheck

Die digitale Wissenskontrolle nach jeder Schulungsinsel. Statische Seite, kein
Framework, Speicherung über eine Netlify-Function nach Supabase.

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
| `netlify/functions/submit-quiz.js` | Nimmt Ergebnisse an, bewertet serverseitig, schreibt nach Supabase |
| `supabase_campus_quiz_migration.sql` | Tabelle und Auswertungs-Views. **Noch nicht eingespielt.** |
| `tools/build-insel.js` | **Baut je Insel einen fertigen Netlify-Ordner.** Siehe unten. |
| `tools/check-fragen.js` | Prüft die Fragensätze. Vor jedem Deploy laufen lassen. |
| `tools/test-function.js` | Testet die Bewertungslogik der Quelle ohne Datenbank |
| `tools/test-paket.js` | Testet die Function eines **erzeugten** Pakets |
| `tools/dev-server.js` | Lokaler Server, bildet die Netlify-Redirects nach |
| `tools/bilder-aus-bestandsquiz.js` | Löst die eingebetteten Bilder aus einem alten Quiz heraus |

**Inhalt steht in den JSON-Dateien, nicht im Code.** Eine Frage zu ändern heißt,
eine JSON-Datei zu ändern — sonst nichts.

---

## Die Insel-Pakete — was hochgeladen wird

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
Stilen, Logo, Fragensatz und Bildern, dazu `netlify/functions/`. Der komplette
Ordner wird bei Netlify ins Feld gezogen — jedes Paket wird eine eigene Site
mit eigener Adresse und eigenem QR-Code.

**Warum erzeugt statt von Hand kopiert.** Sieben Kopien der Engine wären
sieben Stellen, an denen dieselbe Änderung nachgezogen werden muss — genau das
Problem, das dieses Projekt ablöst. Hier bleibt die Wahrheit in `Campus Quiz/`,
die Insel-Ordner sind Ausgabe. In jedem liegt `ZIEL-ORDNER-WIRD-ERZEUGT.txt`,
damit das auch dort steht, wo jemand versehentlich hineinbearbeitet.

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

Prüft die Function des Pakets ohne Datenbank: Bewertung aller vorkommenden
Fragetypen, und ob ein manipuliertes Ergebnis abgewiesen wird. Je nach
Fragetypen 13 bis 15 Prüfungen. Über alle sieben Pakete: **99 Prüfungen, alle
bestanden.**

### Die sieben Pakete

| Ordner | Insel | Fragen | Größe |
|---|---|---|---|
| `Vejrø Quiz` | VEJRØ | 8 | 184 KB |
| `Poel Quiz` | POEL | 9 | 184 KB |
| `Hiddensee Quiz` | HIDDENSEE | 10 | 185 KB |
| `Samsø Quiz` | SAMSØ | 10 · 2 Bildfragen | 595 KB |
| `Fehmarn Quiz` | FEHMARN | 10 | 187 KB |
| `Usedom Quiz` | USEDOM | 10 | 186 KB |
| `Langeland Quiz` | LANGELAND | 10 | 187 KB |

Zwei Bestandsquizze liegen daneben und sind **nicht** Teil dieses Systems:
`FehlerQuiz/` (`fehlerquiz-de` v4, das laufende Bildquiz, 15 Einsendungen) und
`Pro-finder Quiz/` (`pro-finder-de` v5). Beide wurden aus den gleichnamigen
Ordnern herausgenommen, damit die erzeugten Pakete dort liegen können.

### Sieben Sites oder eine? Das entscheidet über die Tipparbeit

`localStorage` gilt **pro Domain**. Daraus folgt eine Entscheidung, die man
besser vorher trifft als am Schulungstag:

| | Sieben eigene Sites | Eine Site, sieben Routen |
|---|---|---|
| Was hochgeladen wird | die sieben Insel-Ordner | nur `Campus Quiz/` |
| Adresse je Station | eigene Domain | `…/quiz/hiddensee` |
| Teilnehmerdaten | **an jeder Insel neu eintippen** | einmal am Tag |
| Insel unabhängig ändern | ja, nur diese neu hochladen | nein, alles zusammen |

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

**SAMSØ hat bereits zwei echte Bildfragen** — Einbauort Gaswarner und Einbauort
Pro-finder, acht geprüfte Werkstattfotos, gehoben aus dem bestehenden
FehlerQuiz. Inhaltlich gehören sie ohnehin zu SAMSØ (Einbauorte) und nicht zur
Fehlersuche.

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

### Eine Frage ergänzen

1. Frage in `public/data/inseln/<insel>.json` eintragen
2. `node tools/check-fragen.js`
3. **`version` in der Datei hochzählen** — sonst weisen laufende Browsersitzungen
   die Einsendung ab (die Function prüft die Version gegen den Fragensatz)

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

## Backend

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
| Rot | `#CE132D` | Falsch-Zustand und Fehler. Sonst nicht. |

Für Text auf hellem Grund gibt es `--th-lime-text` (`#6B7D00`), weil `#AFCA05`
auf Weiß keinen AA-Kontrast erreicht.

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
WCAG 2.5.8 verlangt weniger, aber die Bedienung findet am Fahrzeug statt.

Light Mode ist verbindlich: Der Campus findet in hellen Räumen und draußen
statt. Ein Dark Mode ist bewusst nicht gebaut.

---

## Was geprüft ist

Gemessen, nicht geschätzt:

- Kompletter Durchlauf aller vier Fragetypen bei 375 px und 1280 px
- Kein horizontaler Seiten-Scroll, kein Element ragt über den Viewport
- Ziffernfilter der Händlernummer gegen sechs Eingabevarianten
- 26 Tests der Bewertungslogik, darunter zwei Manipulationsversuche
- Kontrast der tragenden Farbpaare am gerenderten Bild
- Formularvalidierung mit Fokussprung auf das erste fehlerhafte Feld
- Bildfragen gegen einen Probedatensatz: Kacheln zweispaltig auch auf 375 px
  (155 × 206 px), alle vier Bilder geladen, Großansicht als echtes Modal mit
  Fokus im Dialog, Auflösung markiert gewählt-falsch und übersehen-richtig
  getrennt, kein verschachtelter Button, Lupe 44 × 44 bei 6 % Kachelfläche

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

**2. Bildfragen: SAMSØ steht, den übrigen Inseln fehlen die Fotos.** Die
Technik ist fertig und mit echtem Material bewiesen — SAMSØ hat zwei
Bildfragen aus acht geprüften Werkstattfotos. Für HIDDENSEE, USEDOM, VEJRØ und
POEL fehlen die Aufnahmen; siehe [`BILDER-WUNSCHLISTE.md`](BILDER-WUNSCHLISTE.md).
Ab dann ist es reine Datenarbeit an den JSON-Dateien.

Produktbilder für USEDOM und zwei Hiddensee-Fragen liegen bereits in
`Wissen/03_Medien/produkte/`, allerdings mit je gut 2 MB — vorher durch
`tools/bilder-aufbereiten.js` schicken.

**3. POEL ist inhaltlich unbestätigt.** Die Menüpfade stammen aus dem
öffentlichen Teil der Website. Der Händlerbereich ist login-geschützt; die
Fragen 2, 3 und 6 müssen nach dem Login gegengeprüft werden. Der Hinweis steht
in der JSON-Datei und erscheint auf dem Startbildschirm.

**4. VEJRØ setzt CampLock/VanLock voraus.** Falls die Insel 2026 ein neueres,
noch nicht dokumentiertes Produkt zeigt, muss der Fragensatz neu gebaut werden.

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

**7. Die Fragen sind fachlich nicht gegengelesen.** Sie stammen aus
`Wissen/04_Campus-Konzept/Insel-Quizfragen.md` und sind dort mit Quellenangabe
belegt, aber niemand aus Technik oder Support hat sie freigegeben. Vor dem
Campus einmal durchgehen — besonders die Zahlenwerte.

**8. Der Abbrechen-Knopf nutzt `confirm()`.** Funktioniert, sieht aber nicht
nach dem übrigen Bogen aus. Falls es stört, ist es ein kleiner Umbau auf einen
echten Dialog.
