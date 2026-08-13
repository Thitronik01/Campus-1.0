# Produktwissen — THITRONIK

**82 Artikel, deutsch.** Quelle: das THITRONIK-Wiki der Campus-Plattform, Stand Juli 2026.
Die Artikel sind aus über 1.000 Quelldateien (PDFs, Anleitungen, FAQ, Preislisten)
redaktionell verdichtet worden und tragen Frontmatter mit Quellenangaben,
Aktualisierungsdatum und Confidence-Bewertung.

---

## Wie das Wissen aufgebaut ist

Jede Markdown-Datei beginnt mit einem Frontmatter-Block:

```yaml
---
title: Funk-Magnetkontakt 868 — Montage und Betrieb
sources:
  - sources/Funk-Magnetkontakt_868_Anleitung.pdf
  - sources/WiPro_III_Installationshandbuch.pdf
updated: '2026-07-18'
confidence: high
lang: de
dealerStatus: approved
---
```

- **`sources`** — welche Originaldokumente eingeflossen sind
- **`confidence`** — wie belastbar der Artikel ist (`high` / `medium` / `low`)
- **`dealerStatus`** — `approved` = für Händler freigegeben, `internal_only` = intern
- **`[[Wikilinks]]`** im Text verweisen auf andere Artikel über deren Titel, nicht über Dateipfade

**Redaktionelles Prinzip, das durchgehend eingehalten wird:** Wo Quellen sich
widersprechen, wird der Widerspruch benannt statt geglättet. Beispiel aus dem
Magnetkontakt-Artikel — die Produktanleitung nennt 25 mm Montageabstand, das
WiPro-Handbuch 22 mm; der Artikel nennt beide und empfiehlt den konservativen Wert.
Diese Stellen sind für Schulungsfragen besonders wertvoll, weil sie genau die
Punkte markieren, an denen in der Praxis Fehler entstehen.

---

## Ordner

### `produkte/` — 18 Artikel

Die Kernprodukte und das Funkzubehör.

| Datei | Inhalt |
|---|---|
| `wipro-iii.md` | **Alarmzentrale.** DIP-Schalter, 20-poliger Stecker, Alarmspeicher-Blinkcodes, safe.lock, Versionshistorie |
| `pro-finder.md` | **GSM/GPS-Modul.** SMS-Befehle, Seriennummern-Schwellen, SIM-Formate, LED-Diagnose, Kill-Funktion |
| `gas-pro-iii.md` | **Gaswarner.** Gas- vs. CO-Variante, Montagehöhen, DIP, Pause/IGN, Rückrufaktion |
| `gas-pro.md` · `gas-connect.md` · `gas-plug.md` | Weitere Gaswarner-Generationen und -Bauformen |
| `nfc-modul.md` | Lesestelle für KeyCard/KeyTag/KeyStrap, zwei getrennte Speicher, LED-Codes |
| `bt-connect.md` | Bluetooth-Modul, Abgrenzung zum älteren Vernetzungsmodul |
| `camplock-fingerprint.md` · `vanlock-fingerprint.md` | Biometrischer Zugang — die beiden Varianten und ihre Unterschiede |
| `funk-magnetkontakt.md` | **Wichtigster Montage-Artikel.** Standard vs. wasserdicht, LED-/Pfeil-Regeln, Abstände |
| `funk-handsender.md` · `funk-kabelschleife.md` | 868-MHz-Bedien- und Sicherungszubehör |
| `funk-rauchmelder.md` · `funk-wassermelder.md` | T.S.A. und Wassermelder, Montageorte |
| `keycard.md` · `keytag.md` · `keystrap.md` | Die drei NFC-Zugangsmedien mit Reichweiten |

### `referenz/` — 23 Artikel

Querschnittswissen, das mehrere Produkte verbindet. Für Schulung oft wertvoller
als die Einzelprodukte.

| Datei | Inhalt |
|---|---|
| `systemueberblick.md` | **Einstiegspunkt.** Welche Komponente arbeitet eigenständig, welche braucht eine WiPro |
| `fahrzeugkompatibilitaet.md` | **DIP-Matrix** über alle Fahrzeuge + bekannte Einschränkungen |
| `zugang-bedienung.md` | Alle Zugangswege im Vergleich, Backup-Szenarien, Campingmodus |
| `anlernvorgang.md` | Vier Anlernwege (Taster, Easy-Add 1.0/2.0/3.0), Löschverfahren, Speichergrenzen |
| `stoerungsbeseitigung.md` | **Diagnose-Leitfaden** vom Symptom zur sicheren Erstprüfung |
| `faq-master.md` | Alle häufigen Fragen gebündelt |
| `artikelnummern.md` | Vollständiges Artikelnummern-Register |
| `seriennummern-softwarestaende.md` | Präfixe, Funktionsschwellen, Meilensteine |
| `stromversorgung-standzeiten.md` | Ruhestrom, Unterspannung, Ladepraxis |
| `app-befehle.md` · `mobilfunk-sim.md` | THITRONIK-App und SIM-Einrichtung |
| `abschalteinrichtung.md` · `safe-lock-umruestplatine.md` | Sicherheits-Sonderzubehör |
| `sirenen-hupen.md` · `co-sensor.md` · `zusatzsensor-gas-pro-iii.md` · `gas.md` · `vernetzungsmodul.md` | Ergänzende Komponenten |
| `glossar.md` | Fachbegriffe |
| `lernen-und-wissenschecks.md` | Bestehender Händlerleitfaden zu Videos und Lernschleifen |
| `tech-doku_*.md` | Funkstandards, Normen und Zulassungen, Redaktionsrouting |

### `fahrzeuge/` — 30 Artikel

Ein Artikel je Basisfahrzeug bzw. Baureihe: Fiat Ducato (5 Generationen),
Ford Transit (5), Mercedes Sprinter (3) + Vito, Renault Master (3) + Trafic (2),
VW T5/T6/T6.1, VW Crafter/MAN TGE (2), Iveco Daily (2), Adria Coral/Matrix,
Universalanschluss.

Jeder enthält DIP-Stellung, Mindest-Seriennummer/Softwarestand, Anschlusshinweise
und fahrzeugspezifische Fallen. **Für die Insel SAMSØ (Einbauorte) die wichtigste Quelle.**

### `_intern/` — 11 Artikel ⚠️

Siehe die Warnung in [`_intern/README.md`](_intern/README.md). Diese Artikel sind
in der Bestandsplattform gegen Händlerzugriff gesperrt.

### `daten/` — maschinenlesbar

| Datei | Inhalt |
|---|---|
| `artikel-html/` | Dieselben 82 Artikel als JSON mit vorgerendertem HTML, Überschriften-Ankern, Bildzuordnung und Metadaten. Praktisch, wenn eine App die Inhalte direkt rendern soll |
| `glossary.json` | Glossarbegriffe mit Definitionen und Aliassen (für Popover/Autolinks) |
| `wiki-index.json` | Artikelindex mit Routen, Titeln, Sichtbarkeit |
| `dealer-quizzes.de.json` | **11 bestehende Händler-Quizze** mit Fragen, Antworten und Erklärtexten |
| `anleitungen-index.json` | Zuordnung Anleitungen ↔ Produkte |

`_wiki-index-original.md` ist das redaktionelle Inhaltsverzeichnis des Wikis —
gute Orientierung, welcher Artikel wofür zuständig ist.

---

## Was hier bewusst fehlt

- **Andere Sprachen.** Das Wiki liegt in 11 Sprachen vor; hier ist nur Deutsch.
- **Die Originalquellen.** Die PDFs und Word-Dokumente hinter den `sources`-Angaben
  liegen nicht im Bestandsprojekt (nur 2 von ~1.137 sind dort eingecheckt).
- **Quizbilder.** Bewusst ausgelassen.
