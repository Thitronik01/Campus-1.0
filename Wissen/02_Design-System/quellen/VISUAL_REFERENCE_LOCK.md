# Visual Reference Lock

Dieses Dokument loest moegliche Interpretationskonflikte zwischen Design-Spezifikation und Referenzscreens.

## Referenz

Die gewuenschte UI ist eine dunkle, technische App-Shell:

- linke, dunkle Sidebar
- oben Breadcrumbs und Suche
- grosse Artikelspalte
- rechte, sticky Inhaltsnavigation
- ruhige Karten fuer Meta-/CI-Inhalte
- lokale Produkt-/CI-/Fahrzeugbilder

## Farb-Rollen

Aus den Referenzscreens und `Design_Thitronik_Wiki.md` ergibt sich diese finale Rollenverteilung:

- Navy/Dark Blue: Flaechen, Sidebar, Panels, Cards.
- Cyan `#3BA9D3`: primaere Artikel-H1/H2, aktive Breadcrumb-Enden, technische Highlights.
- Lime `#AFCA05`: Fokus, Status, Update-Badges, Search Highlights, Erfolgs-/Aktivzustaende.
- Red `#CE132D`: Thitronik-Logo-Akzent, Warn-/kritische Signale sparsam.
- Weiss/Off-White: Fliesstext.
- Muted Blue/Grey: Nebeninformationen und inaktive Navigation.

Wenn `Design_Thitronik_Wiki.md` pauschal gruene Headings nennt, soll Anti-Gravity fuer grosse Artikelueberschriften die Screenshot-Logik anwenden: Cyan fuer Headings, Lime fuer Fokus/Status.

## Artikelansicht

Pflichtstruktur:

```text
Sidebar | Breadcrumb / Topbar Search
Sidebar | Article Header + Primary Asset | Sticky TOC
Sidebar | Article Body                  | Sticky TOC
```

Der Artikelkopf darf nicht leer wirken:

- Badge links oben
- aktualisiert/Confidence daneben
- grosser H1
- optional Primary Asset rechts
- danach klare Trennlinie

## Unternehmen & CI

Die CI-Seite soll nicht wie ein Fliesstextartikel aussehen. Sie braucht:

- Standort-/Unternehmensbild oder Wallpaper
- Kontakt-/Support-Karte
- Markencharakter-Karten
- Farbpalette mit Swatches
- Logo-/Icon-/Downloadbereich

## UI-Dichte

Support-Nutzung gewinnt gegen Dekoration:

- Seiten duerfen dicht sein.
- Listen und Tabellen sind willkommen.
- Cards nur dort, wo sie scanbare Informationen buendeln.
- Keine uebergrossen Marketing-Kompositionen.

## Bildverhalten

- Bilder duerfen Artikel auflockern, aber nie den Lesefluss dominieren.
- Produktbilder klar und hell genug anzeigen.
- Kein dunkles Overlay ueber Produktdetails.
- Bei unklarem Match kein Bild erzwingen.

## Abnahme

Anti-Gravity soll mindestens diese Screens sauber nachbauen:

- WiPro III Artikelansicht mit Produktbild, TOC, Sidebar, Suche.
- Unternehmen & CI mit Karten, Farbpalette und Asset-Zugang.
- Fahrzeugseite mit Fahrzeugbild und Einbau-/Kompatibilitaetsinhalt.
- Suchmodal mit gruppierten Treffern.
