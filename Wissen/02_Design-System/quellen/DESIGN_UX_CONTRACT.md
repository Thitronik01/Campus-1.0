# Design & UX Contract

Dieses Dokument reduziert den Interpretationsspielraum fuer Anti-Gravity. `Design_Thitronik_Wiki.md` bleibt die visuelle Source of Truth; dieses Dokument macht daraus verbindliche Umsetzungsregeln.

## Nicht verhandelbar

- Das Wiki ist eine Arbeits-App, keine Marketing-Webseite.
- Der erste Screen ist Dashboard/Suche/Wiki-Navigation, kein Hero-Landingpage-Konzept.
- Dark Mode ist Standard.
- Die UI orientiert sich an den bereitgestellten Referenzscreens:
  - Artikelansicht mit linker Sidebar, Breadcrumbs, Topbar-Suche, Content-Spalte, rechtem Inhaltsverzeichnis.
  - Unternehmen-&-CI-Seite mit ruhigen Content-Karten, Farbflaechen und Asset-Zugang.
- `Design_Thitronik_Wiki.md` muss vor UI-Implementierung gelesen und in Code-Kommentaren oder Design-Tokens referenziert werden.

## Layout

Desktop-Layout:

- Linke Sidebar: fix, ca. `260px`.
- Topbar: fix, `56px`, glassmorphic.
- Content: zentriert, max. `1100px`.
- Rechte Article-TOC: sichtbar bei breiten Viewports, sticky.
- Breadcrumbs oben im Contentbereich.

Artikel-Layout:

```text
Sidebar | Topbar + Breadcrumb
        | Main article column | Sticky Inhaltsverzeichnis
```

Mobile/Tablet:

- Sidebar als Drawer.
- TOC einklappbar oberhalb des Artikels.
- Suche bleibt prominent.
- Keine horizontalen Scroll-Probleme in Tabellen; Tabellen in scrollbare Container legen.

## Design Tokens

Diese Werte aus `Design_Thitronik_Wiki.md` sind verbindlich:

```css
--brand-navy: #1D3661;
--brand-cyan: #3BA9D3;
--brand-red: #CE132D;
--brand-lime: #AFCA05;
--brand-lime-dark: #8BA304;
--brand-lime-glow: rgba(175, 202, 5, 0.2);
--brand-lime-subtle: rgba(175, 202, 5, 0.08);
--bg-primary: #0A0F1C;
--bg-sidebar: #080D1A;
--bg-card: #111B32;
--bg-card-hover: #152240;
--bg-glass: rgba(14, 21, 41, 0.75);
--text-primary: #E8EBF2;
--text-secondary: #8B95A8;
```

Typografie:

- Font: `Inter`, Fallback `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.
- Body: `0.9375rem`, line-height `1.65`.
- H1: `2.25rem`, weight `800`.
- H2: `1.375rem`, weight `700`.
- Keine dekorativen Display-Schriften.

## Komponenten

Pflichtkomponenten fuer MVP:

- AppShell
- SidebarNavigation
- TopSearch / Cmd+K
- LanguageSwitcher
- Role/VisibilityBadge
- Breadcrumbs
- ArticleHeader
- ArticleTOC
- ArticleMeta: updated, confidence, sources
- RelatedLinks
- AssetCard
- SourceDrawer
- AuditReport

## Artikelkopf

Jede Artikelseite soll oben zeigen:

- Kategorie-Badge, z.B. Produkt, Fahrzeug, Tech. Doku, Intern
- Aktualisiert-Datum
- Confidence-Badge
- Titel
- Kurzbeschreibung, falls vorhanden oder aus erstem Absatz ableitbar
- passendes Hero-/Produkt-/Fahrzeugbild, wenn Asset-Match vorhanden

Bild im Artikelkopf:

- Produktartikel: Produktbild aus `Produkte/`.
- Fahrzeugartikel: Fahrzeugbild aus `Fahrzeuge/`.
- CI/Unternehmensseite: Bilder aus `Firma/` und `CI/`.
- Wenn kein sicherer Match vorhanden ist: kein generisches Stockbild verwenden.

## Navigation

Sidebar-Gruppen:

- Kernprodukte
- Funk-Zubehoer
- App & Software
- Fahrzeugwissen
- Einbau & Prozesse
- Diagnose & FAQ
- Glossar
- Unternehmen & CI
- Assets & Downloads
- Internes Know-how, nur internal

Die Sidebar darf nicht einfach alphabetisch sein. Sie muss die Support-Realitaet abbilden: WiPro III, Pro-Finder, G.A.S.-pro III, BT-connect und Fahrzeugwissen schnell erreichbar.

## Suche

Pflicht:

- Cmd/Ctrl+K
- Fuzzy Search
- Treffergruppen: Artikel, Fahrzeug, Glossar, FAQ, Intern, Assets
- Treffer markieren Suchbegriffe mit `mark`
- Suchindex muss Synonyme und Autolink-Begriffe enthalten

## Verbotene UI-Entscheidungen

- Keine helle Standardansicht als erste Umsetzung.
- Keine Marketing-Hero-Landingpage.
- Keine zufaelligen Farbpaletten.
- Keine neutral-grauen Darkmode-Flaechen statt Navy-basierter Tokens.
- Keine generischen Stockbilder.
- Keine grossen Card-Waende, wenn eine dichte Liste fuer Support schneller ist.
- Keine versteckten Quellen/Confidence-Werte; sie muessen erreichbar sein.

## Akzeptanzkriterien UI

- Artikelansicht entspricht strukturell dem Referenzscreen.
- Unternehmen-&-CI-Seite nutzt CI-Assets, Farbpalette und Brand-Informationen.
- Suche ist von jedem Screen erreichbar.
- Sidebar aktiver Zustand ist klar sichtbar.
- Tabellen, Listen und Callouts sind im Dark Mode lesbar.
- Mobile Drawer und TOC sind bedienbar.
