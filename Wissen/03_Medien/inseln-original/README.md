# Insel-Silhouetten — Originale

Die sieben freigestellten Inselformen der Campus-Karte, unbearbeitet:
PNG mit Transparenz, 1024–1536 px lange Kante.

**Ausgeliefert wird nicht von hier.** Die verkleinerten Fassungen liegen als
`.webp` in `Campus Quiz/public/media/inseln/<slug>.webp` und werden über
`image` in `Campus Quiz/public/data/inseln.json` eingebunden. Diese Originale
sind der Rückweg, falls die Karte einmal größer gerendert werden soll oder
eine Form nachgezeichnet werden muss.

Aufbereiten wie jedes andere Bild:

```bash
cd "Campus Quiz"
node tools/bilder-aufbereiten.js
```

Die Dateien heißen wie der Insel-Slug, also genau wie ihre Entsprechung
unter `media/inseln/`. Vorher lagen sie als `Bilder/` in der Projektwurzel,
mit den UUIDs des Bildgenerators als Namen und ohne Bezug zu irgendetwas;
zugeordnet wurden sie durch Vergleich der Alpha-Silhouette mit der jeweils
ausgelieferten `.webp` — alle sieben decken sich zu über 99,9 %.
