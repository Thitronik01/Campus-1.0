# Arbeitsregeln für dieses Repository

Diese Datei gilt für alle Werkzeuge, die hier mitarbeiten — Claude Code,
Codex, und was noch kommt. `CLAUDE.md` verweist hierher und ergänzt nur, was
Claude Code allein betrifft. **Eine Quelle, nicht zwei**: Zwei Anleitungen
für dieselben Regeln driften auseinander, und dann folgt jedes Werkzeug einer
anderen.

---

## Was das hier ist

Der THITRONIK Campus 1.0: eine statische Netlify-Site aus reinem HTML, CSS
und JavaScript — kein Framework, kein Bundler — plus Netlify Functions.
Sieben Schulungsinseln mit je einem Quiz, dazu der Feedbackbogen, die
digitale Arbeitskarte und THI, der Assistent über die Anymize-API.

Zielgerät ist das Telefon eines Händlers in einer Messehalle. Das ist keine
Randbedingung, sondern die wichtigste: Jedes Megabyte und jede Klickfläche
unter 44 Pixeln trifft dort zuerst.

---

## 0. „Es ist Montag"

Sagt jemand **„es ist Montag"**, **„Arbeitsbeginn"** oder ruft `/montag` auf,
dann wird [`.claude/commands/montag.md`](.claude/commands/montag.md)
abgearbeitet: Stand holen, offene Zweige prüfen, bauen, alle Prüfungen laufen
lassen, Entwicklungsserver starten, kurz melden.

Ohne Agent geht es genauso:

```bash
cd "Campus Quiz"
node tools/montag.js
```

---

## 1. Vor dem ersten Handgriff: nachsehen, wer sonst noch arbeitet

```bash
git fetch --all --prune
git branch -r
```

**Der weiteste Stand ist nicht automatisch `main`.** Im August 2026 lag
`codex/campus-quiz-polish` fünf Tage vor `main` — mit Campus-Karte,
Feedbackbogen und 14 neuen Bildern. Wer nur auf `main` schaute, sah davon
nichts, baute den Gesamtfortschritt ein zweites Mal und produzierte
27 Konflikte.

Steht ein Branch vor `main`, gilt: **erst darauf aufsetzen, dann anfangen.**
Und wenn eine Funktion gebaut werden soll, vorher prüfen, ob es sie in einem
offenen Zweig schon gibt.

---

## 2. Geändert wird ausschließlich in `Campus Quiz/`

| | |
|---|---|
| **Quelle** | `Campus Quiz/` — Engine, Fragensätze, Styles, THI, Werkzeuge |
| **Quelle** | `Feedbackbogen/` — eigener Stand, wird ins Gesamtpaket kopiert |
| **Quelle** | `Wissen/` — Produktwissen, Design-System, Medien |
| **Erzeugt** | `Campus Gesamtpaket/`, `<Insel> Quiz/` — **nicht versioniert** |
| **Vorlage** | `thi-standalone/`, `export/Bilder */` — **nicht versioniert** |
| **Bestand** | `FehlerQuiz/`, `Pro-finder Quiz/` — laufen getrennt weiter |

Die Paketordner stehen in `.gitignore`. Sie entstehen beim Bau und sind nach
einem frischen Klon zunächst nicht da — das ist Absicht:

```bash
cd "Campus Quiz"
node tools/build-insel.js gesamt     # Deploy-Paket, alle Inseln auf einer Site
node tools/build-insel.js alle       # sieben Einzelpakete
```

Bis August 2026 lagen sie mit im Repository: 216 Dateien, ein Drittel des
Projekts, bei jeder Engine-Änderung achtfach mitgeschrieben. Von 27
Merge-Konflikten kamen 24 allein daher.

---

## 3. Vor jedem Commit

```bash
cd "Campus Quiz"
node tools/montag.js --ohne-server
```

Baut beide Paketformen und lässt alles laufen: Fragensätze, Bewertungslogik,
Feedback-Backend, THI und je rund 200 Paketprüfungen. Endet mit Rückgabewert
1, sobald irgendetwas durchfällt — und zeigt dann nur die Zeilen, auf die es
ankommt, statt der vollen Stapelspuren.

Einzeln geht weiterhin alles:

```bash
node tools/check-fragen.js                        # Fragensätze
node tools/test-function.js                       # Bewertungslogik
node tools/test-thi.js                            # THI, ohne API-Schlüssel
node tools/build-insel.js gesamt && node tools/build-insel.js alle
node tools/test-paket.js "../Campus Gesamtpaket" vejro   # je Insel-Slug
node tools/check-medien.js                        # Medienbudget und Verweise unter public/
node tools/check-deploy.js                        # netlify.toml doppelt, Node-Version, Action-Pins
```

**Medienbudget:** `check-medien.js` zählt alles unter `public/`, nicht nur
die Bilder aus den Fragensätzen — 500 KB je Datei, 12 MB insgesamt, dazu
Verweise ins Leere. Bis September 2026 gingen die vier Fahrzeugansichten der
Arbeitskarte mit zusammen 5 MB PNG an jeder Prüfung vorbei; als WebP sind
es 150 KB. Verwaiste Dateien meldet das Werkzeug nur als Hinweis: Es liest
Text, und ein zur Laufzeit zusammengesetzter Pfad sähe verwaist aus.

---

## 4. Testen immer mit `?demo=1`

```
http://localhost:8788/quiz?demo=1
```

Läuft vollständig durch, speichert absichtlich nichts. **Ohne `demo=1`
landen Testdaten in der Produktivdatenbank.**

Lokal starten:

```bash
cd "Campus Quiz"
node tools/dev-server.js                          # Quelle, Port 8788
node tools/dev-server.js "../Campus Gesamtpaket/public"   # gebautes Paket
node tools/dev-server.js --lan                    # auch für das Telefon im selben WLAN
```

Ohne `--lan` lauscht der Server nur auf `127.0.0.1`. Er bedient
`/.netlify/functions/thi` mit dem Anymize-Schlüssel aus der Umgebung — auf
allen Schnittstellen stünde der damit jedem im Messe-WLAN offen.

> Zwei Server nebeneinander sind normal — einer auf der Quelle, einer auf dem
> gebauten Paket. Wer im falschen misst, sucht Änderungen, die er gerade
> woanders gemacht hat. Im Zweifel die `?v=`-Marke im Quelltext der Seite
> ansehen: Sie nennt die Fassung, die dieser Server ausliefert.

---

## 5. Was nie ins Repository gehört

- **Der Supabase Secret Key.** Ausschließlich Netlify-Umgebungsvariablen; er
  umgeht Row Level Security.
- **Der Anymize-API-Schlüssel** für THI. Ebenfalls nur
  Netlify-Umgebungsvariablen — siehe [`Campus Quiz/THI.md`](Campus%20Quiz/THI.md).
- **Echte Teilnehmerdaten** aus Testläufen.

Das Repository ist privat und muss es bleiben: interne Artikel,
Fremdmarken-Logos mit ungeklärten Rechten, fahrzeugspezifische
Einbauunterlagen. Vor einer Weitergabe den Abschnitt „Vor der Weitergabe
prüfen" in `Wissen/README.md` abarbeiten.

---

## 6. Ton der Dokumentation und Kommentare

Deutsch, sachlich, ohne Werbesprache. Kommentare erklären **warum** etwas so
ist, nicht was die Zeile tut — die bestehenden Dateien zeigen das Muster.
Umlaute ausgeschrieben (`ä`, nicht `ae`) in Text und Kommentaren;
**Bezeichner im Code bleiben ASCII** (`fluechtig`, `spaeter`).

Ein Massen-Ersetzen von `ae` → `ä` über eine ganze Datei zerlegt dabei
zuverlässig den Code: aus `laeuft` wird `läuft`, aus `bloecke` `blöcke`. Wenn
schon, dann gezielt und nur in Zeichenketten und Kommentaren.

---

## 7. Fallen, die schon Zeit gekostet haben

Der Abschnitt ist der eigentliche Grund für diese Datei. Jede dieser Fallen
wurde einmal übersehen und hat danach Stunden gekostet.

### `ENGINE_VERSION` ist der einzige Cache-Schlüssel

`netlify.toml` liefert `/assets/*` mit `max-age=31536000, immutable` aus.
Bleibt die Fassung beim Deploy stehen, holt ein Browser, der die Seite schon
einmal offen hatte, **ein Jahr lang** die alte Engine aus seinem Cache. Die
neue liegt auf dem Server und erreicht niemanden.

Deshalb: **Wer `engine.js`, `styles.css`, `thi.js` oder `thi.css` ändert,
zählt `ENGINE_VERSION` in `engine.js` hoch.** Das Bauwerkzeug setzt die Zahl
beim Bau in alle `?v=`-Verweise der `index.html` ein; in der Quelle sollte
sie trotzdem mitgezogen werden, sonst liefert der lokale
Entwicklungsserver alte Dateien aus.

Geprüft wird das derzeit **nicht** — die Paketprüfung vergleicht nur, ob die
Marken zur Fassung passen, und das tun sie immer, weil der Bau sie von dort
nimmt. Siehe Rückstand in [`BACKLOG.md`](BACKLOG.md).

### Die Wurzel-netlify.toml ist die, die zählt

Netlify liest beim Produktionsdeploy die `netlify.toml` in der Wurzel des
Repositorys, nicht die, die `build-insel.js` ins Paket schreibt. Beide
tragen dieselben Header- und Redirect-Blöcke. Wer eine Regel — CSP,
Permissions-Policy, eine Cache-Dauer — nur in `netlifyToml()` ändert,
ändert die Produktion nicht. `tools/check-deploy.js` vergleicht beide
Fassungen und fällt bei Abweichung durch; die Wurzel wird von Hand
nachgezogen.

Dasselbe Werkzeug prüft, dass `.nvmrc` und `NODE_VERSION` in der
`netlify.toml` dieselbe Node-Hauptversion nennen und dass jede Action in
`.github/workflows/` auf einen vollständigen Commit-SHA gepinnt ist. Ein
Tag ist verschiebbar; im Deploy-Job liegt der Netlify-Token in der Umgebung.
Dependabot hält die SHAs aktuell.

### Ein Bild unter gleichem Namen auszutauschen erreicht niemanden

Dieselbe Regel gilt für `/media/*`, und dort fiel sie zuerst auf. Im
September 2026 wurden aus den flachen Silhouetten die isometrischen
Dioramen — `fehmarn.webp` hieß danach aber weiter `fehmarn.webp`. Auf der
veröffentlichten Seite lagen die neuen Motive, byte-identisch mit dem Repo;
jeder Browser, der den Campus vorher offen hatte, zeigte trotzdem die alten.
Nicht als Rest im Cache, den ein Neuladen räumt: `immutable` heißt, dass ein
Jahr lang **gar nicht erst nachgefragt** wird.

Das Trügerische daran ist das Mischbild. Die Bühne, der Kompass und der Wal
erschienen sofort, weil `styles.css` seine Fassung in der URL trägt und die
Dekodateien neue Namen hatten. Nur die Inseln blieben alt. Das sieht nach
einem Fehler in der Karte aus und ist keiner.

Deshalb geht jede URL unter `/media/`, die aus der Engine kommt, durch
`medienUrl()` und trägt `?v=ENGINE_VERSION`. Wer ein Motiv unter gleichem
Namen ersetzt, zählt die Fassung hoch — sonst ist die Arbeit für alle
unsichtbar, die schon einmal da waren.

**Noch offen:** Die Kartendekoration steht als `background-image` in
`styles.css` und trägt keine Fassung. Heute unkritisch, weil die Dateien neu
sind; wer `see.webp` oder `kompass.webp` unter gleichem Namen ersetzt, tappt
in dieselbe Falle.

### Netlify packt ESM-Functions mit nft — und nft folgt nur statischen Importen

`netlify/functions/thi.mjs` ist ESM und wird deshalb nicht von esbuild,
sondern von nft (Node File Trace) verpackt. nft verfolgt **ausschließlich
statische `import`-Anweisungen**. Ein `createRequire()` oder ein dynamisches
`import()` bleibt unsichtbar: Das Paket kommt ohne die Daten hoch, und die
Funktion stirbt beim ersten Aufruf mit `MODULE_NOT_FOUND`.

Lokal fällt das nie auf, weil der Entwicklungsserver die Originaldatei lädt.

Richtig ist:

```js
import ARTIKEL from "./thi-wissen/artikel.de.json" with { type: "json" };
```

`tools/test-thi.js` prüft das mit einer eigenen Verpackungsprobe. Diese
Prüfung nicht entfernen.

### CSS: `:not([attr])` hebt die Spezifität

Der gemeinsame Verlauf über den Insel-Bühnen steht als

```css
#screen-start[data-island]:not([data-island="vejro"])... .start-intro::before
```

Jedes `:not()` zählt wie ein Attributselektor. Eine schlichte Regel für eine
einzelne Insel verliert dagegen — sie steht im Stylesheet, greift aber nie.
Wer eine Insel ausnimmt, trägt sie in die `:not()`-Kette ein **und** gibt ihr
eine vollständige eigene Regel, `content` und `position` eingeschlossen.

### `body { zoom: .8 }` verschiebt jede Messung

Layout- und Bildschirmpixel fallen dadurch auseinander:

- Eine Klickfläche mit `min-height: 54px` ist physisch **43 px** — unter dem
  Mindestmaß von 44. Deshalb `calc(var(--tap) + 12px)` statt fester Zahlen.
- `100vw` und `100dvh` verhalten sich uneinheitlich. Statt Breite oder Höhe
  lieber gegenüberliegende Kanten setzen.
- Muss es doch eine Höhe sein: **`100dvh` liefert die volle Fensterhöhe in
  Layout-Einheiten, sichtbar sind davon 80 %.** Nachgemessen bei 1180 px
  Fensterhöhe: `height: 100dvh` ergab 944 Bildschirmpixel. Wer den Schirm
  füllen will, rechnet `100/0,8 = 125dvh` — so steht es in `.shell` und in
  der Breitenrechnung der Expeditionskarte.
- Medienabfragen sehen den **Viewport**, das Layout rechnet mit
  `Viewport / 0.8`. Zwischen 640 und 800 px klaffen die beiden auseinander.

### Prozent bezieht sich auf den Elternkasten, nicht auf das, was man meint

Auf der Expeditionskarte sitzt die Infokarte einer Insel absolut **in** der
Insel. `top: calc(50% + var(--karte-y))` zählt deshalb in Prozent der
INSELHÖHE, nicht der Bühne. VEJRØ ist 34 % der Bühne hoch — `-12 %` sind
also gut 4 % Bühne, ein Drittel dessen, was die Zahl suggeriert.

Zweimal wurde daraufhin nachgebessert, bis die Messung im Browser zeigte,
warum die Verschiebung nichts bewirkte. Deshalb steht die Breite der
Infokarte in `cqw` (Prozent der BÜHNENbreite) und nicht in Prozent: Sonst
wäre die Karte an HIDDENSEE halb so breit wie an VEJRØ.

Gleiche Familie: Die Kurzform `background: center / contain no-repeat` an
`.map-deko span` setzt `background-image` zurück — und weil `.map-deko span`
spezifischer ist als `.deko-kompass`, löschte sie jedes Motiv wieder. Die
Kompassrose fehlte, ohne dass eine Datei fehlte. Bei geteilten Grundlagen
plus einzelnen Motiven gehören Langschreibweisen hin.

**Ebenso `transform`: eine Eigenschaft, kein Stapel.** Die Infokarte ist mit
`translateY(-50%)` zentriert. Die Hover-Regel schrieb `translateY(-2px)` —
gemeint war „2 px anheben", geschrieben stand „Zentrierung weg". Die Karte
fiel um ihre halbe Höhe (gemessen 43 px), rutschte unter dem Zeiger weg, der
Hover erlosch, sie sprang zurück, der Zeiger war wieder drin: ein Flackern,
das nach kaputter Animation aussieht und ein Kaskadenfehler ist. Wer einen
Zustand ergänzt, schreibt die Grundlage mit: `translateY(calc(-50% - 2px))`,
`translateY(-50%) scale(.985)`. Dasselbe galt für `transform: none` unter
`prefers-reduced-motion` — dort ist die Regel jetzt auf die Bühne begrenzt,
weil `none` in der Kachelliste richtig bleibt.

### Ein modaler `<dialog>` entkommt dem `zoom` seiner Vorfahren

Der Inselbogen auf dem Telefon steht optisch da, wo er hingehört. Gemessen
sah er falsch aus: `top: 808px` bei 844 px Fensterhöhe, dazu ein
`transform` von 246 px — also scheinbar unterhalb des Bildschirms.

Ein modaler `<dialog>` wird in die **Top-Layer** befördert und liegt damit
außerhalb des Teilbaums, auf dem `body { zoom: .8 }` wirkt. Seine eigenen
Maße stehen in echten Pixeln, `getBoundingClientRect()` an anderen Elementen
liefert gezoomte. Wer beides vergleicht, vergleicht zwei Systeme.

Ein Screenshot hat es in zehn Sekunden entschieden. Bei Elementen in der
Top-Layer — `<dialog>`, Popover, Fullscreen — gilt die Messung erst nach
einem Blick.

### Die Karte zeichnet sich nicht, wenn der Tab im Hintergrund liegt

`requestAnimationFrame` ruht in einem unsichtbaren Tab. Solange die Routen
aus dem DOM gemessen wurden, musste das Zeichnen auf einen Frame warten —
und wer den Campus in einem Hintergrundtab öffnete, bekam eine Karte ganz
ohne Routen, bis er das Fenster anfasste. Nachgemessen bei
`document.visibilityState === "hidden"`: alle sieben Pfade leer.

Seit die Anker aus `KARTE` gerechnet werden, gibt es nichts abzuwarten; das
Zeichnen läuft sofort. Ein Frame ist nur noch zum Bündeln vieler
Größenänderungen da. **Wer etwas in `requestAnimationFrame` legt, fragt sich
vorher, ob es auch in einem unsichtbaren Tab passieren muss.**

### Vor dem Löschen eines Bildes nachsehen, wer darauf zeigt

`lan-start-schluesseluebergabe.webp` sah nach dem Umbau der Langeland-Bühne
verwaist aus — es hängt aber an einer **Frage** in
`public/data/inseln/langeland.json`. Gelöscht hätte es eine Frage zerstört,
und die Paketprüfung hätte es nicht bemerkt.

Deshalb immer über den ganzen Baum suchen, `public/data/` eingeschlossen:

```bash
grep -rF "dateiname.webp" public tools netlify
```

### Erst messen, dann behaupten

Zwei Beispiele aus einer einzigen Sitzung:

- Ein Bildschirmfoto zeigte Samsø ohne Fahrzeug. Die naheliegende Erklärung —
  der Verlauf überdeckt es — war falsch. Die Aufnahme entstand schlicht,
  bevor das Bild gezeichnet war. Die Gegenprobe mit abgeschaltetem Verlauf
  hat es geklärt.
- Der Sprung der GitHub-Actions von `v4`/`v5` auf `v7`/`v8` sah nach
  erfundenen Versionsnummern aus. Ein Blick auf die Tag-Listen zeigte: Es
  gibt sie alle.

Ein Verdacht ist kein Befund. Der Unterschied kostet zwei Minuten.

### Unter Windows sind Umgebungsvariablen nicht case-sensitiv

`delete process.env.Anymize_API_KEY` entfernt dort **auch**
`ANYMIZE_API_KEY`. Wer in einem Test die eine Schreibweise wegnimmt, um die
andere zu prüfen, prüft nichts.

### Die Arbeitskarte hat ihre eigene Fassung — und ihre Modul-Importe auch

`/arbeitskarte/assets/*` wird wie `/assets/*` ein Jahr `immutable`
ausgeliefert, hängt aber **nicht** an `ENGINE_VERSION`: Die Marke steht in
`public/arbeitskarte/index.html` (`?v=1.2.0`) und in jedem `import … from
"./x.js?v=1.2.0"` der Module darunter. Ein Import ohne Marke ist ein Jahr
lang eingefroren, egal was auf dem Server liegt.

Im September 2026 wurden die vier Fahrzeugansichten von PNG auf WebP
umgestellt und `data-v1.js` auf die neuen Pfade gesetzt — der Import
`from "./data-v1.js"` trug aber keine Marke. Jeder Browser, der die
Arbeitskarte schon einmal offen hatte, lud weiter die alte `data-v1.js`,
fragte nach PNG-Dateien, die es nicht mehr gab, und zeigte leere Flächen.
Auf einem frischen Gerät sah alles richtig aus. Seither prüft
`tools/test-arbeitskarte.mjs`, dass jeder relative Import dieselbe Marke
trägt wie `index.html`. Wer dort etwas ändert, zählt die Marke an allen
Stellen hoch.

---

## 8. Die jüngeren Bausteine

### THI — der Assistent

Function `netlify/functions/thi.mjs`, Bibliothek in `thi-lib/`, Wissen in
`thi-wissen/`. Oberfläche: `public/assets/thi.js` und `thi.css`, der
Schalter hängt sich selbst in die Kopfzeile.

**`thi-wissen/` ist die einzige Ausnahme von „Erzeugtes gehört nicht ins
Repository"** — rund 3 MB JSON, und sie sind versioniert. Der Grund:
`tools/thi-wissen-bauen.js` erzeugt sie aus `thi-standalone/`, und der
Ordner ist weder versioniert noch auf dem Netlify-Bauserver vorhanden. Ohne
die Ausnahme könnte kein Deploy THI mit Wissen ausliefern. Neu gebaut wird
von Hand, wenn das Wiki einen neuen Stand hat.

Alles Weitere — Schlüssel, Grenzen, Wissen ergänzen — steht in
[`Campus Quiz/THI.md`](Campus%20Quiz/THI.md).

### Betreuung der Insel

Der Streifen unter dem Startbildschirm mit Foto, Name und Spezialfähigkeit.
Daten in `public/data/betreuer.json`, gerendert von `renderBetreuung()` in
`engine.js`, ins Paket kopiert von `kopiereBetreuung()` in `build-insel.js`.

Zwei Ebenen in der JSON — `personen` und `inseln` —, weil eine Person mehrere
Inseln betreut und sonst beim nächsten Fotowechsel an drei Stellen stünde.
Ohne Eintrag bleibt der Streifen ausgeblendet. Beschrieben in
[`Campus Quiz/README.md`](Campus%20Quiz/README.md).

### Die Expeditionskarte

Die Übersicht unter `/quiz` gibt es in **drei bewusst verschiedenen
Kompositionen**: die Szene `quer` (1600 × 900, VEJRØ zentral im Ring der
sechs Themeninseln) für Desktop und Querformat, die Szene `hoch`
(900 × 1200) für das Tablet hochkant, und unter 768 px der **Orbit** — ein
Karussell mit der aktiven Insel im Rampenlicht statt einer verkleinerten
Karte. Beide Szenen und die Karussell-Reihenfolge lesen aus `KARTE` in
`engine.js`; welche Anordnung gilt, sagt `--anordnung` im Stylesheet.
Feste Seitenverhältnisse sind geblieben: Ein Kasten über die volle Breite
ergab gemessen auf dem iPad hochkant 1,0:1 und auf einem breiten Monitor
2,7:1 — dieselben Prozentangaben konnten unmöglich für beides stimmen.

Die Motive erzeugt `tools/karten-assets.js` aus dem Asset-Pack unter
`export/thitronik_campus_asset_pack/` — 28 MB PNG hinein, rund 620 KB WebP
heraus. Das Pack ist wie die übrigen Bildquellen **nicht** versioniert; das
Ergebnis unter `public/media/inseln/` und `public/media/campus/karte/` ist
es. Beschrieben in [`Campus Quiz/README.md`](Campus%20Quiz/README.md),
Abschnitte „Die Expeditionskarte" und „Die Motive der Karte".

Wer eine Insel verschiebt, misst nach — der Abschnitt im README enthält
dafür einen Konsolen-Schnipsel, der alle Überschneidungen in einem Zug
auflistet.

### Insel-Bühnen aus Einzelmotiven

`tools/szenen-bauen.js` schneidet und verkleinert die PNG-Quellen aus
`export/Bilder <Insel>/` nach `public/media/<insel>/`. Braucht einmalig
`npm install sharp --no-save`. Die Quellen sind **nicht** versioniert; das
Ergebnis ist es.

---

## Wo was ausführlich steht

| Thema | Datei |
|---|---|
| Überblick, Stand, Sicherheit | [`README.md`](README.md) |
| Offene Befunde und Rückstand | [`BACKLOG.md`](BACKLOG.md) |
| Engine, Fragetypen, Backend, Sende-Ausgang | [`Campus Quiz/README.md`](Campus%20Quiz/README.md) |
| THI: Einbau, Schlüssel, Wissen ergänzen | [`Campus Quiz/THI.md`](Campus%20Quiz/THI.md) |
| Deploy und Umgebungsvariablen | [`NETLIFY-DEPLOY.md`](NETLIFY-DEPLOY.md) |
| Produktwissen, Design-System, Medien | [`Wissen/README.md`](Wissen/README.md) |
