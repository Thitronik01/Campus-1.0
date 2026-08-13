# Campus 1.0 — Wissenspaket

**Erstellt:** 13.08.2026 · **292 Dateien, ~91 MB**

Dieser Ordner bündelt das THITRONIK-Wissen, das für die Digitalisierung der
Campus-Schulung gebraucht wird. Er ist als **Initialzündung für ein neues Projekt**
gedacht und funktioniert eigenständig — ohne Zugriff auf die bestehende Plattform.

---

## Was hier drin ist

| Ordner | Inhalt | Umfang |
|---|---|---|
| **[`01_Produktwissen/`](01_Produktwissen/)** | 82 Wiki-Artikel auf Deutsch: Produkte, Zubehör, Fahrzeuge, Diagnose, Prozesse. Plus maschinenlesbare Daten (Glossar, Artikel-JSONs, 11 fertige Quizze) | 171 Dateien, 5,5 MB |
| **[`02_Design-System/`](02_Design-System/)** | Design-Tokens, Farbrollen, Layout, Komponenten — konsolidiert und um die bekannten Fallen ergänzt | 6 Dateien |
| **[`03_Medien/`](03_Medien/)** | 34 Produktbilder, 11 Fahrzeugbilder, 23 CI-Icons und Logos, 8 Wohnmobil-Marken, 13 Themenbilder, 11 Alarmtöne | 107 Dateien, 85 MB |
| **[`04_Campus-Konzept/`](04_Campus-Konzept/)** | Das Campus-Konzept plus ~60 ausgearbeitete Quizfragen für die sieben Inseln | 7 Dateien |

---

## Wo anfangen

**Wenn du Inhalte für die Inseln brauchst:**
→ [`04_Campus-Konzept/Insel-Quizfragen.md`](04_Campus-Konzept/Insel-Quizfragen.md) — dort sind die Fragen mit Quellenangabe je Insel.

**Wenn du einen Fakt nachschlagen willst:**
→ [`01_Produktwissen/README.md`](01_Produktwissen/README.md) zeigt, welcher Artikel wofür zuständig ist.
Die drei wichtigsten Einstiege: `referenz/systemueberblick.md` (was hängt von was ab),
`referenz/fahrzeugkompatibilitaet.md` (DIP-Matrix), `referenz/stoerungsbeseitigung.md` (Symptom → Prüfung).

**Wenn du UI baust:**
→ [`02_Design-System/DESIGN_SYSTEM.md`](02_Design-System/DESIGN_SYSTEM.md) lesen, dann [`design-tokens.css`](02_Design-System/design-tokens.css) einbinden.

**Wenn du ein Bild suchst:**
→ [`03_Medien/README.md`](03_Medien/README.md) — mit Zuordnung, welches Asset zu welchem Thema gehört.

---

## Drei Dinge, die man leicht falsch macht

**1. Die Design-Doku widerspricht sich — der Konflikt ist aber entschieden.**
Es gibt zwei Design-Ebenen: die implementierte Campus-Plattform (`--th-*`-Tokens,
Light + Dark, **cyanfarbene** Überschriften) und einen älteren Wiki-Entwurf
(`--brand-*`, dark-first, **grüne** Überschriften). Verbindlich ist die erste.
Details in [`02_Design-System/DESIGN_SYSTEM.md`](02_Design-System/DESIGN_SYSTEM.md), Abschnitt 1.

**2. „Scharf/Unscharf" und „Ver-/Entriegeln" sind zwei verschiedene Dinge.**
Das zieht sich durch das gesamte Produktwissen und ist der häufigste inhaltliche
Fehler in Beratung und Support. Scharf/Unscharf betrifft die Alarmanlage,
Ver-/Entriegeln die Zentralverriegelung des Fahrzeugs. Nur mit WiPro III safe.lock,
passendem Fahrzeugprofil und geeignetem Softwarestand sind beide gekoppelt.

**3. Die Artikel benennen Widersprüche bewusst.**
Wo Quellen sich widersprechen (z. B. 22 mm vs. 25 mm Montageabstand beim
Magnetkontakt), nennt der Artikel beide Werte und empfiehlt den konservativen.
Das ist kein Redaktionsfehler, sondern Absicht — und genau an diesen Stellen
entstehen in der Praxis Fehler. Für Schulungsfragen sind sie deshalb besonders
ergiebig.

---

## Herkunft und Aktualität

Alle Inhalte stammen aus dem Projekt `Thitronik Online` (THITRONIK Campus Online),
Stand der Wiki-Artikel: **Juli 2026**. Das vollständige Kopierprotokoll mit
Quellpfaden je Datei liegt in [`_kopier-protokoll.json`](_kopier-protokoll.json).

**Bewusst nicht enthalten:**

- **Quizbilder** — die Bilder der bestehenden Bildquizze (Fehlersuche, CAN-Bus,
  Magnetkontakt-Montage u. a.) liegen weiterhin unter `Thitronik Online/public/`
- **Videos** — 8 Schulungsvideos, ~542 MB, unter `Thitronik Online/Bilder und mehr/Videos/`
- **Andere Sprachen** — das Wiki liegt in 11 Sprachen vor, hier ist nur Deutsch
- **Originalquellen** — die PDFs und Word-Dokumente hinter den `sources`-Angaben
  sind größtenteils nicht im Bestandsprojekt eingecheckt

**Interne Inhalte** liegen getrennt in [`01_Produktwissen/_intern/`](01_Produktwissen/_intern/).
Sie waren in der Bestandsplattform gegen Händlerzugriff gesperrt — diese
Beschränkung muss in einem neuen Projekt erneut hergestellt werden. Sie ist keine
Eigenschaft der Dateien.

---

## Vor der Weitergabe prüfen

Falls Inhalte aus diesem Paket öffentlich erreichbar werden:

- **Fremdmarken-Logos** in `03_Medien/wohnmobil-marken/` — Nutzungsrechte klären
- **Interne Artikel** — siehe oben
- **Preis- und Konditionsangaben** — im Produktwissen sind keine Preise enthalten,
  aber Artikelnummern und Servicehinweise; historische Upgrade-Konditionen gelten
  laut Wiki ausdrücklich nicht als aktuelle Zusage
