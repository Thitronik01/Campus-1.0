# THITRONIK Design-System — konsolidiert

**Stand:** 13.08.2026 · **Für:** Campus 1.0 und Folgeprojekte

Dieses Dokument fasst zusammen, was in vier verschiedenen Quelldokumenten und in
`app/globals.css` verteilt lag — und löst die Widersprüche zwischen ihnen auf.
Die Originaldokumente liegen unverändert unter [`quellen/`](quellen/).

> **Wichtigste Regel:** Bei Abweichungen zwischen Dokumentation und Code gilt
> [`design-tokens.css`](design-tokens.css). Das ist die tatsächlich implementierte
> Wahrheit, extrahiert aus der laufenden Plattform.

---

## 1. Es gibt zwei Design-Ebenen — das ist die häufigste Verwechslung

| | **Campus-Plattform** | **Wiki-Spezifikation** |
|---|---|---|
| Quelle | `app/globals.css` (implementiert) | `Design_Thitronik_Wiki.md` (Entwurf) |
| Token-Präfix | `--th-*`, `--bg-*`, `--sp-*` | `--brand-*`, `--bg-primary` |
| Modi | Light **und** Dark, umschaltbar | Dark-first |
| Überschriften | **Cyan** `#3BA9D3` | Lime `#AFCA05` |
| Status | **Verbindlich, live im Einsatz** | Historischer Entwurf |

**Für Campus 1.0 gilt die linke Spalte.** Der Wiki-Entwurf ist als Stimmungs- und
Ideengeber weiterhin nützlich (Glassmorphismus, Glow-Effekte, Card-Hover), seine
konkreten Farbwerte sind aber überholt.

**Der Konflikt „grüne vs. cyanfarbene Überschriften"** wurde bereits entschieden —
in `VISUAL_REFERENCE_LOCK.md`:

> Cyan für Headings, Lime für Fokus/Status.

Das ist die geltende Regel. Wo `Design_Thitronik_Wiki.md` pauschal grüne
Überschriften nennt, ist es überholt.

---

## 2. Farbrollen — was wofür

| Farbe | Hex (Light) | Hex (Dark) | Rolle |
|---|---|---|---|
| **Navy** | `#1D3661` | `#2a4a80` | Flächen, Sidebar, Panels, primäre Buttons |
| **Cyan** | `#3BA9D3` | `#3BA9D3` | Überschriften, Fokus-Ring, technische Highlights, aktive Breadcrumbs |
| **Lime** | `#AFCA05` | `#c4de1a` | Status, Erfolg, Update-Badges, Such-Highlights, aktive Zustände |
| **Rot** | `#CE132D` | `#e8304a` | Logo-Akzent, Warnungen, Zurück-Buttons — sparsam |
| Off-White | `#020617` Text | `#f8fafc` Text | Fließtext |
| Muted | `#64748b` | `#94a3b8` | Nebeninformationen, inaktive Navigation |

### Drei Farbfallen, die schon mehrfach zugeschlagen haben

**a) Lime als Textfarbe auf hellem Grund.**
`--th-accent-lime` (#AFCA05) erreicht auf Weiß keinen AA-Kontrast. Für Text auf
hellem Grund gibt es ein eigenes Token: `--th-lime-text` (#6b7d00, ~4.6:1).
Für Flächen und Akzente weiterhin `--th-accent-lime`.

**b) Der Fokus-Ring ist Cyan, nicht Lime.**
Ältere Doku behauptet Lime — falsch. `:focus-visible` nutzt `--th-blue-secondary`.
Ausnahmen: In der dunklen Sidebar und auf farbigen Quiz-Bühnen wird der Ring weiß,
weil Cyan dort verschwindet.

**c) Kein neutrales Grau im Dark Mode.**
Der Dark Mode nutzt abgedunkelte Blautöne (`#020617`, `#0f172a`), kein `#111` oder
`#333`. Das gibt Tiefe und hält die Verbindung zum CI-Navy. Diese Regel stammt aus
dem Wiki-Entwurf und gilt weiterhin.

---

## 3. Typografie

**Inter** — technisch, schnörkellos, keine dekorativen Display-Schriften.

```
Fallback: system-ui, -apple-system, sans-serif
```

| Ebene | Größe | Gewicht |
|---|---|---|
| H1 | 36px | 700 |
| H2 | 30px | 700 |
| H3 | 24px | 600 |
| Body groß | 18px | 400 |
| Body | 16px | 400 |
| Body klein | 14px | 400 |
| Caption | 12px | 400 |

Zeilenhöhe Body: `1.6`. Im Wiki-Kontext (lange Lesestrecken) `1.65`.

---

## 4. Spacing, Radien, Motion

**Spacing** folgt einem 4px-Raster: `--sp-1` (4px) bis `--sp-16` (64px).
Übliche Innenabstände: Card-Body `--sp-6` (24px), Seitenpadding `--sp-8` (32px).

**Radien:** `6 / 8 / 12 / 16px` plus `9999px` für Pills.
Harte Ecken (0px) zerstören den Look — nicht verwenden.

**Motion** ist bewusst knapp — das ist eine hochfrequente Arbeits-App, keine
Marketingseite:

| Token | Wert | Einsatz |
|---|---|---|
| `--duration-press` | 140ms | Button-Feedback |
| `--duration-fast` | 150ms | Hover, Farbwechsel |
| `--duration-normal` | 200ms | Standard-Übergänge |
| `--duration-drawer` | 240ms | Sidebar/Drawer |
| `--ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | Standard |

`prefers-reduced-motion` respektieren.

---

## 5. Layout

```
┌──────────┬─────────────────────────────────────────┐
│          │  Topbar (64px, sticky, glassmorphic)    │
│ Sidebar  ├─────────────────────────────────────────┤
│ 260px    │  Breadcrumbs                            │
│ fix      │                          ┌────────────┐ │
│          │  Content (max 1280px)    │ Sticky TOC │ │
│          │                          └────────────┘ │
└──────────┴─────────────────────────────────────────┘
```

- Sidebar: `--sidebar-width` 260px, fix
- Topbar: `--header-height` 64px, sticky, mit `backdrop-filter: blur()`
- Content: zentriert, `--max-content` 1280px (Wiki-Artikelspalte enger: ~1100px)
- Rechte TOC: sticky, ab breiten Viewports

**Mobil/Tablet:** Sidebar wird zum Drawer, TOC klappt oberhalb des Inhalts ein,
Suche bleibt prominent. Breite Inhalte (Tabellen, Diagramme, Code) gehören in
einen eigenen `overflow-x: auto`-Container — die Seite selbst darf nie horizontal
scrollen.

### Die z-Index-Falle

`backdrop-filter` auf `.card` und `.header` erzeugt einen neuen Stacking-Context
und **fängt `position: fixed`-Kinder darin ein**. Modals deshalb immer per
`createPortal` an `document.body` rendern, nie innerhalb einer Card.

Die Skala: Sidebar 200 < Dropdown 1000 < Popover 1100 < Modal 1200 < Toast 1300 < Skip-Link 1500.

---

## 6. Haltung — was diese UI sein soll und was nicht

Aus `DESIGN_UX_CONTRACT.md` und `VISUAL_REFERENCE_LOCK.md`, weiterhin gültig:

**Ist:** eine Arbeits-App für Werkstatt und Support. Dicht, scanbar, schnell.
Der erste Screen ist Dashboard/Suche, nicht Hero.

**Ist nicht:**
- keine Marketing-Landingpage mit Hero-Komposition
- keine zufälligen Farbpaletten außerhalb der CI-Tokens
- keine generischen Stockbilder — bei unklarem Match lieber kein Bild
- keine großen Card-Wände, wo eine dichte Liste schneller ist
- keine versteckten Quellen-/Confidence-Angaben

**Bildverhalten:** Bilder lockern auf, dominieren aber nie den Lesefluss.
Produktbilder klar und hell zeigen, kein dunkles Overlay über Produktdetails.

---

## 7. Für den Campus-Kontext besonders relevant

Der Campus läuft auf **Smartphone und Tablet der Händler**, nicht am Werkstatt-PC.
Daraus folgen drei Anpassungen gegenüber der Desktop-Plattform:

1. **Touch-Ziele mindestens 44×44px.** Die Quiz-Antwortflächen sind der
   Hauptinteraktionspunkt — großzügig dimensionieren.

2. **Light Mode ernst nehmen.** Der Campus findet teils in hellen Räumen und
   draußen am Fahrzeug statt. Der Quiz-Bereich der bestehenden Plattform ist
   dark-first entstanden und hat dort historisch Kontrastschwächen gehabt —
   beim Neubau von Anfang an beide Modi prüfen.

3. **Die Quiz-Farbtokens sind bewusst kräftig** (`--quiz-answer-red/blue/yellow/green`)
   und in beiden Modi identisch. Sie stammen aus dem Kahoot-Muster und sind auf
   Erkennbarkeit aus Entfernung optimiert. `--quiz-on-yellow` ist ein fester
   Navy-Wert, weil Text auf Gelb sonst in keinem Modus genug Kontrast hat.

---

## 8. Dateien in diesem Ordner

| Datei | Inhalt |
|---|---|
| `design-tokens.css` | **Die verbindlichen Werte.** Tokens + Kernkomponenten, direkt einsetzbar |
| `DESIGN_SYSTEM.md` | Dieses Dokument — Interpretation, Regeln, Fallen |
| `quellen/DESIGN_UX_CONTRACT.md` | Original: Layout-, Komponenten- und Verbotsliste |
| `quellen/VISUAL_REFERENCE_LOCK.md` | Original: Konfliktauflösung, Farbrollen, Abnahme |
| `quellen/Design_Thitronik_Wiki.md` | Original: Wiki-Designentwurf (dark-first, historisch) |
| `quellen/ASSET_MAPPING_GUIDE.md` | Original: welches Bild gehört zu welchem Inhalt |

Die Medien selbst (Produktbilder, CI-Icons, Logos) liegen in [`../03_Medien/`](../03_Medien/).
