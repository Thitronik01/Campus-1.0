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
  <img alt="Fragen" src="https://img.shields.io/badge/Fragen-70-1D3661?style=flat-square">
  <img alt="Stack" src="https://img.shields.io/badge/Stack-Netlify%20%2B%20Supabase-3BA9D3?style=flat-square">
  <img alt="Framework" src="https://img.shields.io/badge/Framework-keins-AFCA05?style=flat-square">
  <img alt="Stand" src="https://img.shields.io/badge/Stand-vor%20dem%20ersten%20Deploy-CE132D?style=flat-square">
</p>

---

## Worum es geht

Der THITRONIK Campus bleibt eine **Präsenzschulung**. Diese Software ersetzt sie
nicht, sie begleitet sie: Nach jeder Station beantworten die Händler auf dem
eigenen Telefon fünf bis zehn Fragen, am Ende des Tages den bestehenden
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
| **VEJRØ** | CampLock & VanLock Fingerprint | 10 |
| **POEL** | Händlerbereich — was finde ich wo | 10 |
| **HIDDENSEE** | Funk-Magnetkontakt & Adapter | 10 |
| **SAMSØ** | Einbauorte im Fahrzeug | 10 |
| **FEHMARN** | Fehlersuche & Support | 10 |
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
├── Campus Gesamtpaket/   ← erzeugt: alle sieben Inseln auf einer Site
├── <Insel> Quiz/         ← erzeugt: eine Insel je Site
├── Wissen/               ← 82 Wiki-Artikel, Design-System, 107 Mediendateien
├── FehlerQuiz/           ← Bestandsquiz, läuft getrennt weiter
└── Pro-finder Quiz/      ← Bestandsquiz, läuft getrennt weiter
```

**Eine Engine, sieben Fragensätze.** Geändert wird ausschließlich in
[`Campus Quiz/`](Campus%20Quiz/). Alle Paket-Ordner sind **erzeugt** — jeder
enthält einen `ZIEL-ORDNER-WIRD-ERZEUGT.txt`, und wer dort hineinbearbeitet,
verliert es beim nächsten Bau.

| Ordner | Was drin ist |
|---|---|
| [`Campus Quiz/`](Campus%20Quiz/) | Engine, die sieben Fragensätze, Netlify-Function, Werkzeuge, [ausführliche Doku](Campus%20Quiz/README.md) |
| [`Wissen/`](Wissen/) | Produktwissen, Design-System, Medien, Campus-Konzept — [Einstieg](Wissen/README.md) |
| `Campus Gesamtpaket/` | Alle sieben Inseln auf **einer** Site, mit eigener `ANLEITUNG.md` |
| `<Insel> Quiz/` | Fertiges Netlify-Paket je Insel, mit eigener `ANLEITUNG.md` |

**Für den Deploy: `Campus Gesamtpaket/`, nicht `Campus Quiz/`.** Die Quelle
wäre technisch auch lauffähig, enthält aber den Fragenkatalog mit sämtlichen
Lösungen. Das erzeugte Paket enthält nur, was ausgeliefert werden soll.

Der **Feedbackbogen** liegt in einem eigenen Repository:
[Thitronik-Campus-Feedbackbogen](https://github.com/Thitronik01/Thitronik-Campus-Feedbackbogen).
Er ist bereits live und deckt den Tagesabschluss ab.

---

## Schnellstart

```bash
cd "Campus Quiz"
node tools/dev-server.js
```

Dann [http://localhost:8788/quiz](http://localhost:8788/quiz).

> **Für Tests immer `?demo=1` anhängen.** Damit läuft das Quiz vollständig
> durch, speichert aber absichtlich nichts — sonst landen Testdaten in der
> Produktivdatenbank.

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

---

## Technik — bewusst klein

| Baustein | Rolle |
|---|---|
| **Netlify** | Auslieferung der Seiten und die Function, die Ergebnisse annimmt |
| **Supabase** | Teilnehmer, Ergebnisse, Feedback, Auswertungs-Views |
| **Browser** | die einzige Anwendung, die der Händler braucht |

Kein Framework, kein Build-Schritt für die Seite selbst, keine App, keine
Installation. Insgesamt rund 190 KB je Insel-Paket.

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
- 70 Fragen, alle fünf Fragetypen, aus dem Produktwissen mit Quellenangabe
- 104 automatische Prüfungen je Paketform, dazu 26 der Bewertungslogik
- Mobil geprüft bei 375 px: kein horizontaler Scroll, alle Trefferflächen ≥ 44 px
- Sende-Ausgang gegen Funkloch, `500`, `400` und Erfolg durchgespielt — inklusive
  Reload zwischendrin
- Farbkontraste am gerenderten Bild gemessen, alle über WCAG AA

**Noch offen**

- ⛔ **Die Datenbank-Migration ist nicht eingespielt** — bis dahin nimmt die Datenbank nichts an. Die Ergebnisse bleiben auf den Geräten liegen und gehen von selbst raus, sobald die Tabelle steht; darauf bauen sollte man trotzdem nicht
- Entscheidung: sieben getrennte Netlify-Sites oder eine mit sieben Routen. Beide Wege sind gebaut, die Empfehlung steht in [`Campus Quiz/README.md`](Campus%20Quiz/README.md)
- Bilder für vier Inseln, siehe [Wunschliste](Campus%20Quiz/BILDER-WUNSCHLISTE.md)
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
