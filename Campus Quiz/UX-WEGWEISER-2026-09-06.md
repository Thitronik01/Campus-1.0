# Campus-Wegweiser, Fassung 1.43.0

Die Übersicht besitzt einen gemeinsamen Kopf für Themenwahl und Orientierung. Die Schilder sitzen einheitlich an der unteren Motivkante; die Querkomposition wurde dafür neu ausgerichtet. Der Detailbereich zeigt einen längeren Themenüberblick, drei Lernschwerpunkte und einen Standort.

## Standorte ändern

Alle Angaben stehen in `public/data/inseln.json`, je Insel unter `standort`:

- `gebaeude`: Altbau oder Neubau
- `ebene`: EG oder OG
- `raum`: Raumbezeichnung
- `vorlaeufig`: derzeit überall `true`

Alle sieben Standorte sind ausdrücklich angenommene Planungswerte. Der Hinweis im Übersichtskopf ist ebenfalls vorläufig und muss zusammen mit den Daten angepasst werden, wenn die endgültige Raumplanung vorliegt. Die Lernschwerpunkte stehen unter `lernfelder`, der Themenüberblick unter `beschreibung`.

## Horizontales Langeland

`public/media/inseln/langeland-horizontal.webp` ist ein neu erzeugtes Motiv nach dem bisherigen Langeland-Bild. Die Gebäude bleiben aufrecht. Das alte Motiv bleibt wegen anderer Referenzen erhalten. Die neue Datei misst 900 × 360 px und rund 70 KB.

Die Bildgenerierung lieferte trotz Transparenzanforderung RGB. Der schwarze Hintergrund wird deshalb beim Zeichnen über den SVG-Filter `island-cutout` in `index.html` ausgeblendet. Die CSS-Regel gilt für dieses Motiv auch außerhalb der Übersicht. Die Datei allein besitzt keinen Alphakanal; bei einer Verwendung außerhalb des Campus muss diese Darstellung berücksichtigt werden.

## Prüfung

Browseransichten von 320 bis 1920 px ohne horizontalen Seitenüberlauf. Tablet-Hochformat visuell geprüft und Beschriftungen auf gegenseitige Überschneidungen gemessen. Standort und direkter Arbeitskartenlink auf Langeland geprüft. `node tools/montag.js --ohne-server` baut und prüft Quelle, Gesamtpaket und alle Einzelpakete. Keine Veröffentlichung und keine Produktiv-Testdaten.
