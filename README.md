<p align="center">
  <img src=".github/logo.png" alt="THITRONIK — Alarmtechnik made in Germany" width="420">
</p>

<h1 align="center">Campus 1.0</h1>

<p align="center">
  Digitale Begleitung der THITRONIK Campus-Schulung.<br>
  Sieben Schulungsinseln, nach jeder ein kurzer Wissenscheck auf dem eigenen Telefon.
</p>

<p align="center">
  <img alt="Inseln" src="https://img.shields.io/badge/Inseln-7-1D3661?style=flat-square">
  <img alt="Fragen" src="https://img.shields.io/badge/Fragen-73-1D3661?style=flat-square">
  <img alt="Stack" src="https://img.shields.io/badge/Stack-Netlify%20Forms%20%2B%20Supabase%20später-3BA9D3?style=flat-square">
  <img alt="Framework" src="https://img.shields.io/badge/Framework-keins-AFCA05?style=flat-square">
  <img alt="Stand" src="https://img.shields.io/badge/Stand-vor%20dem%20ersten%20Deploy-CE132D?style=flat-square">
  <a href="https://github.com/Thitronik01/Campus-1.0/actions/workflows/campus.yml"><img alt="Campus CI/CD" src="https://github.com/Thitronik01/Campus-1.0/actions/workflows/campus.yml/badge.svg"></a>
</p>

---

## Worum es geht

Der THITRONIK Campus bleibt eine **Präsenzschulung**. Diese Software ersetzt sie
nicht, sie begleitet sie: Nach jeder Station beantworten die Händler auf dem
eigenen Telefon fünf bis zwölf Fragen, am Ende des Tages den bestehenden
Feedbackbogen.

```
Sehen → anfassen → ausprobieren → Quiz beantworten → Wissen festigen
```

**Die Zielrichtung ist nicht, Händler zu benoten.** Die Daten sollen zeigen,
welche Inhalte angekommen sind und an welchen Stellen *wir* die Schulung
schärfen müssen. Daraus folgt eine konkrete Anforderung an die Fragen: Sie
müssen trennscharf sein. Die falschen Antworten sind deshalb echte
Praxis-Halbwahrheiten — Annahmen, die im Support später Zeit kosten.

---

## Die sieben Inseln

| Insel | Thema | Fragen |
|---|---|---|
| **VEJRØ** | Produktneuheiten: Zugang & Wasserschutz | 10 |
| **POEL** | Händlerbereich — Beratung & Werkstatt vorbereiten | 10 |
| **HIDDENSEE** | Funk-Magnetkontakte, Abzweigverbinder & Crimpen | 12 |
| **SAMSØ** | Einbauorte im Fahrzeug | 10 |
| **FEHMARN** | Fehlersuche, Support & Pro-finder-Mobilfunk | 11 |
| **USEDOM** | Verkaufsdisplay & Konfigurator | 10 |
| **LANGELAND** | Fahrzeugannahme & -übergabe | 10 |

Fünf Fragetypen: Einfachauswahl, Mehrfachauswahl, Richtig/Falsch, Reihenfolge
(antippen statt ziehen — mit Werkstatthandschuhen bedienbar) und Zuordnung.
Bildfragen mit Großansicht sind gebaut; SAMSØ nutzt sie bereits mit echten
Einbaufotos.

**Nach jeder Antwort stehen drei Dinge da**, nicht mehr nur eines:

```
Richtig, weil …   →   Falsch gewählt?   →   Mitnehmen
```

„Falsch gewählt?" nennt die verbreiteten Fehlannahmen beim Namen — und zwar
alle, nicht nur die eigene. Wer sich für die falsche Option entschieden hat,
sieht seine hervorgehoben; wer richtig lag, erkennt in den übrigen die Sätze
seiner Kunden wieder. „Mitnehmen" ist ein Satz zum Weitersagen: eine
Faustregel, ein Handgriff oder eine Formulierung fürs Kundengespräch. Verkäufer
merken sich keine Datenblätter, sie merken sich Sätze.

---

## Aufbau des Repositories

```
Campus 1.0/
├── Campus Quiz/          ← die Quelle: Engine, Fragensätze, Werkzeuge
├── Feedbackbogen/        ← die Quelle des Tagesabschlusses
├── Wissen/               ← 82 Wiki-Artikel, Design-System, Medien
├── FehlerQuiz/           ← Bestandsquiz, läuft getrennt weiter
└── Pro-finder Quiz/      ← Bestandsquiz, läuft getrennt weiter
```

**Eine Engine, sieben Fragensätze.** Geändert wird ausschließlich in
[`Campus Quiz/`](Campus%20Quiz/).

| Ordner | Was drin ist |
|---|---|
| [`Campus Quiz/`](Campus%20Quiz/) | Engine, die sieben Fragensätze, Netlify-Function, Werkzeuge, [ausführliche Doku](Campus%20Quiz/README.md) |
| [`Feedbackbogen/`](Feedbackbogen/) | Tagesabschluss; wird beim Bau nach `/feedback` kopiert |
| [`Wissen/`](Wissen/) | Produktwissen, Design-System, Medien, Campus-Konzept — [Einstieg](Wissen/README.md) |

### Die Pakete stehen nicht im Repository

`Campus Gesamtpaket/` und die sieben `<Insel> Quiz/` sind **Ausgabe**, keine
Quelle. Nach einem frischen Klon sind sie nicht da — sie entstehen in
Sekunden:

```bash
cd "Campus Quiz"
node tools/build-insel.js gesamt     # das Paket für den Deploy
node tools/build-insel.js alle       # die sieben Einzelpakete
```

Bis August 2026 lagen sie mit im Repository: 216 Dateien, ein Drittel des
Projekts, bei jeder Änderung an Engine, Styles oder `index.html` achtfach
mitgeschrieben. Zwei Zweige an derselben Quelldatei kollidierten dadurch
nicht in drei Dateien, sondern in 27. Seitdem stehen die Ordner in
`.gitignore` — und ein Bau ist billiger als jeder dieser Konflikte.

**Für den Deploy: `Campus Gesamtpaket/`, nicht `Campus Quiz/`.** Die Quelle
wäre technisch auch lauffähig, enthält aber den Fragenkatalog mit sämtlichen
Lösungen. Das erzeugte Paket enthält nur, was ausgeliefert werden soll.

Der **Feedbackbogen** liegt seit dem 19.08.2026 in diesem Repository, samt
seiner Historie aus
[Thitronik-Campus-Feedbackbogen](https://github.com/Thitronik01/Thitronik-Campus-Feedbackbogen).
Er deckt den Tagesabschluss ab und wird vom Gesamtpaket unter `/feedback`
mit ausgeliefert.

**Warum auf derselben Adresse.** `localStorage` gilt pro Domain. Liegt der
Bogen auf einer eigenen Site, tippt jeder Teilnehmer abends Name, Betrieb
und Händlernummer ein zweites Mal ein. Unter `/feedback` derselben Site
liest er die Angaben aus dem Wissenscheck und fragt nur noch, ob sie
stimmen. Aus demselben Grund kommen die Inselnamen jetzt aus
`inseln.json` — vorher führten beide Anwendungen eigene Listen, und sie
waren bereits auseinandergelaufen.

---

## Schnellstart

```bash
cd "Campus Quiz"
node tools/dev-server.js
```

Dann [http://localhost:8788/quiz](http://localhost:8788/quiz).

> **Für Tests immer `?demo=1` anhängen.** Damit läuft das Quiz vollständig
> durch, speichert aber absichtlich nichts — sonst landen Testdaten nach dem
> Deploy in Netlify Forms oder später in Supabase.

Vor jeder Änderung am Bestand:

```bash
node tools/check-fragen.js
```

```bash
node tools/test-function.js
```

Das Paket für den Deploy bauen — alle sieben Inseln auf einer Site:

```bash
node tools/build-insel.js gesamt
```

Ein einzelnes Insel-Paket bauen:

```bash
node tools/build-insel.js samsoe
```

Alle sieben Einzelpakete auf einmal: `node tools/build-insel.js alle`

### CI/CD über GitHub Actions

Der Workflow [`.github/workflows/campus.yml`](.github/workflows/campus.yml)
läuft bei jedem Pull Request gegen `main` und bei jedem Push auf `main`.

1. Er prüft alle 73 Fragen und die Bewertungslogik.
2. Er baut und prüft das Gesamtpaket sowie alle Einzelpakete.
3. Er speichert `Campus Gesamtpaket/` für 14 Tage als geprüftes Artefakt.
4. Bei einem Push auf `main` deployt er genau dieses Artefakt nach Netlify.

Für Schritt 4 müssen in den GitHub Repository-Secrets zwei Werte hinterlegt
sein:

| Secret | Inhalt |
|---|---|
| `NETLIFY_AUTH_TOKEN` | persönlicher Netlify-Zugriffstoken für den Deploy |
| `NETLIFY_SITE_ID` | API-ID der Netlify-Site für das Campus-Gesamtpaket |

Fehlen die Secrets, bleibt die Pipeline bewusst grün: Tests, Build und das
herunterladbare Artefakt funktionieren trotzdem. Im Job steht dann ein klarer
Hinweis, dass nur der Produktionsdeploy übersprungen wurde. Datenbankmigrationen
gehören ausdrücklich nicht in diesen Workflow und bleiben ein kontrollierter,
manueller Schritt.

---

## Technik — bewusst klein

| Baustein | Rolle |
|---|---|
| **Netlify** | Auslieferung, Function und Forms für die datenbankfreie Pilotphase |
| **Supabase** | Späterer Ausbau für dauerhafte Ergebnisse und Auswertungs-Views |
| **Browser** | die einzige Anwendung, die der Händler braucht |

Kein Framework, kein Build-Schritt für die Seite selbst, keine App, keine
Installation. Je nach Bildanteil sind die Insel-Pakete derzeit 582 bis 1602 KB
groß, das Gesamtpaket 2785 KB.

**Der Browser bewertet nicht.** Er sendet ausschließlich, *was* gewählt wurde —
nie, ob es richtig war. Bewertet wird in der Netlify-Function, gegen dieselbe
JSON-Datei, die auch die Engine ausliefert. Das hat zwei Folgen: Es gibt genau
eine Wahrheitsquelle für die Lösungen, und ein manipuliertes Ergebnis landet
nicht in der Datenbank.

**Ein Ergebnis geht nicht verloren, wenn das Netz wegbleibt.** Es wird
zuerst auf dem Gerät abgelegt und erst gelöscht, wenn der Server bestätigt
hat. Nachgesendet wird von selbst — beim nächsten Seitenaufruf oder sobald
der Browser wieder Empfang meldet. Solange etwas aussteht, sagt die Insel
„noch nicht gesendet" statt „abgeschlossen". Details in
[`Campus Quiz/README.md`](Campus%20Quiz/README.md#der-sende-ausgang).

---

## Stand

**Fertig und geprüft**

- Ein Gesamtpaket (alle Inseln, eine Site) **und** sieben Einzelpakete, alle direkt hochladbar
- 73 Fragen, alle fünf Fragetypen, aus dem Produktwissen mit Quellenangabe
- 353 Paketprüfungen für Gesamt- und Einzelpakete, dazu 28 Prüfungen der Bewertungslogik
- Mobil geprüft bei 375 px: kein horizontaler Scroll, alle Trefferflächen ≥ 44 px
- Arbeitsregeln in [`CLAUDE.md`](CLAUDE.md) — was Quelle ist, was erzeugt, und was vor jedem Commit läuft
- Sende-Ausgang gegen Funkloch, `500`, `400` und Erfolg durchgespielt — inklusive
  Reload zwischendrin
- Farbkontraste am gerenderten Bild gemessen, alle über WCAG AA

**Noch offen**

- Die Supabase-Migration bewusst erst nach der fachlichen Fragenabstimmung einspielen; bis dahin sammelt Netlify Forms die Pilotdaten
- Netlify Forms im Site-Dashboard aktivieren und nach dem ersten Deploy noch einmal deployen
- Weitere Werkstattbilder für Bildfragen, siehe [Wunschliste](Campus%20Quiz/BILDER-WUNSCHLISTE.md)
- Fachliche Freigabe der Fragen

Alles Einzelne steht in den [Issues](https://github.com/Thitronik01/Campus-1.0/issues)
und ausführlich in [`Campus Quiz/README.md`](Campus%20Quiz/README.md).

---

## Sicherheit und Vertraulichkeit

> **Dieses Repository ist privat und muss es bleiben.**

Es enthält Inhalte, die nicht für die Öffentlichkeit bestimmt sind:

- **Interne Artikel** in `Wissen/01_Produktwissen/_intern/` — in der
  Bestandsplattform gegen Händlerzugriff gesperrt. Diese Beschränkung ist eine
  Eigenschaft der Plattform, nicht der Dateien, und muss anderswo erneut
  hergestellt werden.
- **Fremdmarken-Logos** in `Wissen/03_Medien/wohnmobil-marken/` — Nutzungsrechte
  ungeklärt.
- **Fahrzeugspezifische Einbauunterlagen und Rückrufinformationen**.

Der **Supabase Secret Key** gehört ausschließlich in die Netlify-Umgebungs­
variablen. Im Repository steht er nirgends und darf dort nie stehen — er
umgeht Row Level Security.

Vor einer etwaigen Veröffentlichung: Abschnitt „Vor der Weitergabe prüfen" in
[`Wissen/README.md`](Wissen/README.md) abarbeiten.

---

## Gestaltung

Verbindlich ist die Markenpalette, nicht die Empfehlung eines Design-Werkzeugs.

| | HEX | Einsatz |
|---|---|---|
| Navy | `#1D3661` | Flächen, primäre Buttons, Überschriften |
| Cyan | `#3BA9D3` | Akzente, Fokus, Fortschritt |
| Lime | `#AFCA05` | Richtig-Zustand, Bestwert — nie als Textfarbe auf Hell |
| Rot | `#CE132D` | Falsch-Zustand und Fehler |

Details und die bekannten Fallen: [`Wissen/02_Design-System/`](Wissen/02_Design-System/).

---

<p align="center">
  <sub>THITRONIK GmbH · Eckernförde · Campus 2026</sub>
</p>
