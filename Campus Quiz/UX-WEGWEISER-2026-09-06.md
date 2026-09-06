# Campus-Wegweiser, Fassung 1.44.0

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

### Größere Inseln in Fassung 1.44.0

Alle sieben Motive sind in Quer- und Hochformat vergrößert. Vejrø bildet mit der größten Bildfläche den Mittelpunkt. Langeland bleibt horizontal. Die gestrichelten Umlauf- und Verbindungslinien sind entfernt; Schiffe, Möwen und Kompass stehen in freien Wasserflächen. Die gemeinsame Position der Namensschilder an der unteren Motivkante bleibt erhalten.

Die Begrenzungsrechtecke von Motiven, Schildern und Dekoration wurden bei 768, 820, 1024, 1100, 1280, 1440 und 1920 px Fensterbreite auf gegenseitige Überschneidungen und Überstand geprüft. Das eigene Namensschild darf seine Inselkante überlagern. Auf dem Handy bleiben alle sieben Inseln über die Auswahlliste erreichbar; bei 390 px entsteht kein horizontaler Seitenüberlauf.

Browseransichten von 320 bis 1920 px ohne horizontalen Seitenüberlauf. Tablet-Hochformat visuell geprüft und Beschriftungen auf gegenseitige Überschneidungen gemessen. Standort und direkter Arbeitskartenlink auf Langeland geprüft. `node tools/montag.js --ohne-server` baut und prüft Quelle, Gesamtpaket und alle Einzelpakete. Keine Veröffentlichung und keine Produktiv-Testdaten.
