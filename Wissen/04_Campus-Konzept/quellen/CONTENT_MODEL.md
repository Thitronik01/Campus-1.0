# Content Model

## Grundprinzip

Die Wiki-Dateien sind Markdown mit YAML Frontmatter. Die Ordnerstruktur ist Teil des Datenmodells.

## Frontmatter

Vollstaendiges Beispiel:

```yaml
---
title: WiPro III - Funk-Alarmsystem fuer Freizeitfahrzeuge
sources:
  - sources/example.pdf
updated: 2026-04-21
confidence: high
coverage: complete
dealerStatus: approved
articleType: product
lang: de
---
```

### Kern-Felder (Pflicht)

- `title`: Anzeigename und primaerer Suchtext.
- `sources`: Liste fachlicher Quellen. Im UI als Quellenbereich anzeigen.
- `updated`: Datum der letzten fachlichen Aktualisierung (ISO `YYYY-MM-DD`).
- `confidence`: `high`, `medium`, `low`. Bezieht sich auf das **Quellenvertrauen**.
- `lang`: Sprache der Datei. Sollte zum ersten Pfadsegment passen.

### Audit-Felder (optional, bekommen Defaults)

Diese Felder ermoeglichen praezisere Audits und ein sauberes Dealer-Gating ohne den Pfad-/Visibility-Mechanismus zu brechen. Fehlende Felder werden im Ingest auf Default gesetzt — alte Seiten bleiben gueltig.

#### `coverage` — Inhaltliche Vollstaendigkeit

Beschreibt, wie vollstaendig der Inhalt **inhaltlich** ist, unabhaengig vom Quellenvertrauen.

| Wert | Bedeutung |
|------|-----------|
| `complete` | Alle relevanten Bloecke vorhanden, redaktionell geprueft. |
| `partial` | Grundlage vorhanden, einzelne Bloecke (z. B. Anschluss, Variantenlogik, bekannte Fallen) fehlen. |
| `faq_only` | Nur FAQ-/Punktwissen, keine systematische Anleitung. |
| `source_missing` | Inhalt vorhanden, aber Originalquellen fehlen — Faktencheck nicht moeglich. |

**Default:** `partial`.

**Audit-Inkonsistenzen:**
- `confidence: high` + `coverage: source_missing` → Issue `confidence-coverage-mismatch`. Hohe Confidence ohne Quellen ist nicht haltbar.
- `coverage: complete` + leere `sources[]` → Issue `coverage-without-sources`.

#### `dealerStatus` — Haendlerfreigabe

Beschreibt, ob der Inhalt **redaktionell fuer das Haendlerportal freigegeben** ist. Ergaenzt `visibility` (Pfad-basiert) um eine kuratierte Sicht.

| Wert | Bedeutung |
|------|-----------|
| `approved` | Fuer Haendler freigegeben, erscheint im Dealer-Portal. |
| `needs_review` | Inhalt grundsaetzlich oeffentlich, aber redaktionell noch nicht fuer Haendler abgenommen. |
| `internal_only` | Bewusst nicht im Haendlerportal, auch wenn `visibility: standard`. |

**Defaults:**
- `visibility: internal` → `dealerStatus: internal_only` (erzwungen).
- `visibility: standard`, kein Feld → `dealerStatus: needs_review`.

**Audit-Inkonsistenzen:**
- `visibility: internal` + `dealerStatus: approved` → Issue `dealer-internal-conflict`. Logisch unmoeglich.
- `dealerStatus: approved` + interne Quellen (RAG, NUR_INTERNER_GEBRAUCH, …) → Issue `dealer-approved-internal-source` (haerter als das bestehende `dealer-internal-source`).

Die Dealer-Suche/-Navigation darf perspektivisch nur Artikel mit `dealerStatus: approved` zeigen.

#### `articleType` — Strukturklasse

Bestimmt, welche Mindestbloecke ein Artikel haben sollte. Wird im Ingest aus `section`/`slug` abgeleitet, kann im Frontmatter ueberschrieben werden.

| Wert | Erkennung (Default-Ableitung) |
|------|-------------------------------|
| `vehicle` | `section: fahrzeuge` |
| `tech-doku` | `section: tech-doku` |
| `internal` | `visibility: internal` |
| `overview` | `isIndex: true` |
| `product` | Slug matched ein bekanntes Produkt (siehe `link-dictionary.json` Typ `product`). |
| `troubleshooting` | Slug enthaelt `stoerung`, `fehler`, `troubleshoot` o.ae. |
| `faq` | Slug startet mit `faq-`. |
| `reference` | Fallback (Glossar-/Register-Seiten). |

`articleType` steuert Mindestblock-Pruefungen (siehe unten).

## Mindestbloecke pro `articleType`

Beim Ingest wird geprueft, ob bestimmte H2-/H3-Ueberschriften vorhanden sind. Fehlen Pflichtbloecke, entsteht ein Audit-Issue `missing-required-section` mit der erwarteten Block-Klasse.

### `articleType: vehicle`

Pflicht-Bloecke (mind. eine Heading-Variante pro Klasse):

| Block-Klasse | Akzeptierte Heading-Begriffe |
|--------------|------------------------------|
| `einbauort` | `Einbauort`, `Montageort`, `Einbau`, `Montage` |
| `anschluss` | `Anschluss`, `Pins`, `Kabelbelegung`, `Verkabelung` |
| `varianten` | `Varianten`, `Modellvarianten`, `Ausstattung`, `Baujahr` |
| `bekannte-fallen` | `Bekannte Fallen`, `Stolperfallen`, `Besonderheiten`, `Hinweise`, `Achtung` |
| `pflichttest` | `Test`, `Funktionstest`, `Pflichttest`, `Inbetriebnahme`, `Abnahme` |

Sehr kurze Fahrzeugseiten (< 250 Woerter) bekommen zusaetzlich `vehicle-thin-content`.

### `articleType: product`

Empfohlene Bloecke (Audit als Hinweis, nicht Fehler):

- `Funktion`/`Funktionsweise`
- `Einbau`/`Inbetriebnahme`
- `Bedienung`/`Anwendung`
- `Stoerungen`/`Fehlerbilder`
- `Quellen`/`Weiterfuehrend`

### `articleType: tech-doku`

Empfohlen: `externalReferences` (Frontmatter-Feld, optional) mit `[{ url, label, retrievedAt }]`-Eintraegen — fuer Auditfestigkeit der Normbezuege.

### `articleType: troubleshooting`

Empfohlene Bloecke: `Symptom`, `Pruefen`, `Beheben`, `Ursache` (mind. zwei davon).

## Abgeleitete Felder

Aus dem relativen Pfad ableiten:

- `lang`: erstes Segment unter `wiki/`
- `section`: erstes Segment nach Sprache, sonst `root`
- `slug`: Dateiname ohne `.md`
- `route`: normalisierte Webroute
- `visibility`: `internal`, wenn Pfadsegment `intern` enthalten ist; sonst `standard`
- `isIndex`: true fuer `_index.md`

## Route-Normalisierung

Beispiele:

```text
wiki/de/_index.md -> /de
wiki/de/wipro-iii.md -> /de/wipro-iii
wiki/de/fahrzeuge/fiat-ducato-2022-2024.md -> /de/fahrzeuge/fiat-ducato-2022-2024
wiki/de/intern/rag-wipro-safe-lock.md -> /de/intern/rag-wipro-safe-lock
wiki/de/Tech. Doku/normen-und-richtlinien.md -> /de/tech-doku/normen-und-richtlinien
```

## Kategorien

Empfohlene UI-Kategorien:

- `root`: Produkt-, Diagnose-, FAQ- und Nachschlage-Seiten im Sprachordner.
- `fahrzeuge`: Fahrzeug- und Einbauwissen.
- `intern`: interne RAG-/Support-Know-how-Packs.
- `tech-doku`: Normen, Funkstandards, Schnittstellen.

## Suchindex

Indexiere mindestens:

- title
- slug
- body text
- headings
- sources
- language
- section
- article numbers

Zusaetzlich sinnvoll:

- Synonyme aus `terminologie-und-schreibweisen.md`
- Fachbegriffe aus `glossar.md`
- Artikelnummern aus `artikelnummern.md`
- FAQ-Fragen aus `faq-master.md`

## Zusatzdaten

- `project-data/wiki-manifest.json`: generierter Index ueber Content und Assets.
- `project-data/asset-overrides.json`: manuelle Asset-Zuordnung. Hat Vorrang vor heuristischem Matching.
- `project-data/link-dictionary.json`: Start-Woerterbuch fuer Autolinks, Glossar-Popover und Related Links.

## Multilingual Mapping

Seiten koennen ueber gleiche relative Pfade gemappt werden.

Beispiel:

```text
wiki/de/wipro-iii.md
wiki/en/wipro-iii.md
wiki/fr/wipro-iii.md
```

Wenn eine Sprache keine Datei besitzt, sollte die App:

- die deutsche Seite als Fallback anbieten
- im UI "Fallback: Deutsch" markieren
- den fehlenden Eintrag im Admin-Audit melden

## Interne Inhalte

Alle Dateien unter `wiki/<lang>/intern/` sind `internal`.

Diese Seiten sind wichtig fuer Support und KI-Antworten, aber fuer eine Haendler-Version nicht automatisch geeignet.

## Audit-Issue-Katalog

Der Ingest erzeugt strukturierte Issues in `public/audit-report.json`. Die folgende Liste haelt die Typen aktuell. Neue Issue-Typen muessen hier eingetragen und im Audit-UI (`TYPE_CONFIG` in `app/wiki/audit/page.js`) gemappt werden.

### Frontmatter

| Typ | Bedeutung |
|-----|-----------|
| `frontmatter-error` | YAML-Parse-Fehler. |
| `missing-title` | Kein `title` gesetzt (ausser `_index.md`). |
| `missing-frontmatter` | Pflichtfeld fehlt komplett. |

### Quellen

| Typ | Bedeutung |
|-----|-----------|
| `missing-source` | Eintrag in `sources[]` kann nicht aufgeloest werden. |
| `source-normalized` | Pfad wurde durch Normalisierung gefunden — Frontmatter aktualisieren. |
| `source-basename-match` | Nur per Dateiname gefunden, Pfad unsicher. |
| `dealer-internal-source` | Standard-Seite (dealer-sichtbar) hat interne Quellen. |
| `dealer-approved-internal-source` | `dealerStatus: approved` mit interner Quelle — haerter als `dealer-internal-source`. |

### Confidence/Coverage/Dealer

| Typ | Bedeutung |
|-----|-----------|
| `confidence-coverage-mismatch` | `confidence: high` + `coverage: source_missing`. |
| `coverage-without-sources` | `coverage: complete` ohne Eintrag in `sources[]`. |
| `dealer-internal-conflict` | `visibility: internal` + `dealerStatus: approved` (logisch unmoeglich). |
| `dealer-status-missing` | `visibility: standard` ohne explizites `dealerStatus` (Hinweis). |

### Struktur

| Typ | Bedeutung |
|-----|-----------|
| `missing-required-section` | Pflicht-Block fuer `articleType` fehlt. Payload: `{ articleType, blockClass }`. |
| `vehicle-thin-content` | `articleType: vehicle` mit < 250 Woertern. |

### Mehrsprachigkeit/Links

| Typ | Bedeutung |
|-----|-----------|
| `missing-translation` | DE-Artikel ohne Pendant in Zielsprache. |
| `broken-wikilink` | `[[ ... ]]`-Ziel nicht aufloesbar. |
| `broken-link` | Markdown-Link auf nicht existente Route. |
| `translation-german-residue` | Heuristik fuer unuebersetzt gebliebene deutsche Phrasen in Fremdsprachen-Dateien. |
