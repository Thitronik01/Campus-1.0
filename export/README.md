# Export für Campus 1.0 — Übergabepaket

Erstellt: 2026-08-28 · Quelle: THITRONIK-Händlerplattform (nur gelesen, nichts verändert)
Dieser Ordner ist temporär und wird von Max nach der Übernahme gelöscht.

## Inhalt

```
export/
├── README.md                  ← diese Datei
├── campus-kontext/            ← Kontext-Anreicherung für die Campus-1.0-KI
│   ├── 00_KI-BRIEFING.md          Arbeitsregeln, Quellenhierarchie, offene Klärungspunkte
│   ├── 01_PRUEFBERICHT_FRAGENKATALOG.md   Prüfung aller 73 Fragen gegen das Wiki
│   ├── 02_SUPPORT-KORREKTUREN_2026-08-27.md   Support-Meeting, abgeglichen — HAT VORRANG
│   ├── 03_TERMINOLOGIE.md         Verbindliche Schreibweisen
│   ├── 04_FAKTEN_KOMPAKT.md       Alle belastbaren Zahlen, Grenzwerte, LED-/Blinkcode-Tabellen
│   ├── 05_FRAGEN_ENTWUERFE.md     12 redaktionsfertige Fragen-Entwürfe (E1–E12) im Campus-Format
│   ├── 06_DISTRAKTOREN_WARNLISTE.md   Wahre Aussagen, die nie als falsche Antwort dienen dürfen
│   └── 07_AUDIO-FRAGEN.md         Konzept + 6 Entwürfe (A1–A6) für Alarmton-Fragen auf FEHMARN
├── alarmtoene/                ← 11 Original-MP3s + TONREFERENZ.md (Ton → Gerät → Bedeutung → Beleg)
├── wissen-de/                 ← das gesamte deutsche THITRONIK-Wissen (82 Artikel, Markdown)
│   ├── _INDEX.md                  Suchindex: alle Artikel mit Titel und Route
│   ├── *.md                       43 Produkt-/Themenartikel (WiPro III, Pro-Finder, G.A.S.-pro III, …)
│   ├── fahrzeuge/                 30 fahrzeugspezifische Einbauartikel
│   ├── intern/                    6 RAG-Wissenspakete (kompakte Themenbündel)
│   ├── tech-doku/                 3 Artikel (Funkstandards, Normen, Übersicht)
│   ├── _glossary.json             Glossar-Rohdaten
│   └── _plattform-quizfragen.de.json   bestehende Quizfragen der Händlerplattform
└── arbeitskarte/              ← digitale Arbeitskarte für die Übernahme in Campus 1.0
    ├── page.js                    produktive Version (Next.js, aus Thitronik Online)
    ├── components/                primitives.js, PrintView.js, Soundboard.js
    ├── lib/                       arbeitskarte-data.js, arbeitskarte-history.js
    ├── bilder/                    4 Wohnmobil-Ansichten (Front, Heck, Fahrer-, Beifahrerseite; 1536×1024)
    ├── arbeitskarte-manifest.json Zielrouten, Asset-Empfehlungen, Feature-Liste
    └── docs/                      Integrations-Doku, History-Test, alte Standalone-Version (v3.0)
```

## Hinweise zur Arbeitskarte

- Die **produktive** Version (`page.js` + `components/` + `lib/`) ist eine Next.js-Client-
  Komponente. Campus 1.0 ist statisches HTML/JS ohne Framework — für die Übernahme ist ein
  Port nötig (das Manifest sagt dasselbe: „needs Vite/React port" bzw. für Campus: Vanilla-Port).
- Features laut Manifest: Auftrag, Sichtkontrolle, Materialliste, Übergabe, Foto-Upload,
  Unterschriften-Canvas, Skizzen-Canvas, lokales Speichern, JSON-Import/-Export, Druckansicht.
- Bild-Zieldateinamen laut Manifest: `wohnmobil-fahrerseite.png`, `wohnmobil-beifahrerseite.png`,
  `wohnmobil-front.png`, `wohnmobil-heck.png`. Achtung: Die Quelldatei „Whonmobil Fahrerseite
  Ansicht.png" hat einen Tippfehler im Namen — beim Umbenennen verschwindet er.
- `docs/page.ALT-standalone-v3.js` ist die ältere eigenständige Version (April 2026) — nur als
  Referenz, nicht als Basis nehmen.

## Für die Campus-1.0-KI

Einstieg: `campus-kontext/00_KI-BRIEFING.md` zuerst lesen. Bei Faktenfragen immer in
`wissen-de/` nachschlagen statt aus dem Gedächtnis zu antworten; bei Widersprüchen gilt
`02_SUPPORT-KORREKTUREN_2026-08-27.md`.

## Übergabe-Checkliste (Reihenfolge für die Campus-KI)

1. **Sofort umsetzbar:** Streichungen und Umformulierungen aus `02_...md` (SAMSØ Pin 10,
   FEHMARN DIP 5, „funktional vorgegebener Installationsort") in den JSON-Fragensätzen
   ausführen; danach Fragenzahlen/Zeiten im Katalog-Kopf aktualisieren.
2. **Präzisierungen einarbeiten:** Auflösungen nach `01_...md` Abschnitt B schärfen;
   Terminologie global nach `03_TERMINOLOGIE.md` korrigieren (v. a. Pro-Finder).
3. **Neue Fragen übernehmen:** Entwürfe E1–E12 aus `05_...md` ins JSON-Format übertragen;
   Distraktoren vorher gegen `06_...md` prüfen.
4. **Audio-Fragen vorbereiten:** Engine um Audio-Feld erweitern (Hinweis in `07_...md`),
   Testfrage im Demo-Modus auf dem Smartphone prüfen; erst dann A1–A6 einbauen.
5. **Arbeitskarte portieren:** Next.js-Quellen aus `arbeitskarte/` nach Campus-Vanilla-JS;
   Bilder gemäß Manifest umbenennen.

**Vor Freigabe durch Max/Support zu klären (nicht von der KI entscheiden):**
- [ ] Feuerzeugtest G.A.S.-pro III: Support „erlaubt" vs. Anleitung „nicht vorgesehen" (F2)
- [ ] Rückkehrschwelle Pro-Finder: 12 V (Support) vs. 12,5 V (Wiki, 6 Fundstellen) (F1)
- [ ] SAMSØ-Bildfrage Gaswarner: Flüssiggas- oder CO-Variante gemeint? (S5)
- [ ] Drei ❓-Töne anhören und bestätigen: gas-alarm, nicht-anlernen, offen-meldung (TONREFERENZ)
- [ ] „V002+"-Fragen (VEJRØ 9, POEL 6): externe Quelle nachreichen oder umformulieren (A1/A2)
- [ ] POEL-Menüpfade am eingeloggten Händlerkonto verifizieren
