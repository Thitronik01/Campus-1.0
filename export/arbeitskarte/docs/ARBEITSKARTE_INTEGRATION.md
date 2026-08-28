# Arbeitskarte Integration

Im Ordner `arbeitskarte/` liegen ein React-Entwurf und vier Wohnmobil-Ansichten.

## Vorhandene Dateien

- `arbeitskarte/page.js`
- `arbeitskarte/Bilder/Whonmobil Fahrerseite Ansicht.png`
- `arbeitskarte/Bilder/Wohnmobil Beifahrerseite Ansicht.png`
- `arbeitskarte/Bilder/Wohnmobil Front Ansicht.png`
- `arbeitskarte/Bilder/Wohnmobil Hinten Ansicht.png`

Alle vier Bilder haben 1536 x 1024 px.

## Wichtiger Befund

`page.js` ist ein Next.js-Client-Component-Entwurf und kann nicht 1:1 in die aktuelle Vite-App kopiert werden.

Der Code importiert fehlende Module:

- `@/lib/arbeitskarte-data`
- `@/components/arbeitskarte/primitives`

Anti-Gravity soll diese fehlenden Daten und Primitives in der Vite-App neu erstellen oder direkt aus `page.js` heraus refaktorieren.

## Ziel

Die Arbeitskarte wird ein Werkzeug fuer interne Nutzer und Haendler im Wiki:

- Route: `/de/arbeitskarte`
- Sidebar-Gruppe: `Werkzeuge`
- Sichtbarkeit: `internal`, `technician` und `dealer`
- Dealer duerfen die Arbeitskarte nutzen; interne Wiki-Seiten, Editor- und Audit-Funktionen bleiben getrennt.

## Funktionsumfang

Die Arbeitskarte soll mindestens vier Tabs haben:

1. Auftrag
   - Kundendaten.
   - Fahrzeugdaten.
   - Monteur.
   - Seriennummern.
   - OBD/Tacho.
   - Hinweise.
   - Fahrzeug-Visualisierung.

2. Sichtkontrolle
   - Vorschadenfotos.
   - Schadensbeschreibung.
   - Grundfunktionen.
   - Pro-Finder-Alarme.
   - Rueckfahrkamera.
   - Unterschriften.

3. Material
   - Materialliste.
   - Suche.
   - Gruppen.
   - Mengen.
   - Verbaut-Status.
   - Artikelnummern.

4. Uebergabe
   - Uebergabe-Checkliste.
   - Vermerk.
   - Ort/Datum.
   - Unterschriften.

## Bild-/Skizzenfunktion

Die vier Wohnmobilbilder sollen als Hintergrund fuer interaktive Markierungen dienen:

- Fahrerseite.
- Beifahrerseite.
- Front.
- Heck.

Empfehlung:

- Bilder nach `public/assets/arbeitskarte/` kopieren.
- Dateinamen normalisieren:
  - `wohnmobil-fahrerseite.png`
  - `wohnmobil-beifahrerseite.png`
  - `wohnmobil-front.png`
  - `wohnmobil-heck.png`
- `SketchCanvas` mit Stift, Marker, Loeschen und Reset bauen.
- Markierungen als Data URL oder strukturierte Koordinaten speichern.

## Speicherung

MVP:

- lokale Speicherung via `localStorage`.
- JSON Export/Import.
- Druckansicht.

10/10 intern/admin:

- Admin-/Internal-API fuer persistente Arbeitskarten.
- Arbeitskarten-ID.
- Status: Entwurf, in Arbeit, abgeschlossen, archiviert.
- Suche nach Kennzeichen, VIN, Kunde, Datum, Monteur.
- PDF-/Druckexport.
- Aenderungsverlauf.

## Integration mit Wiki

Arbeitskarte soll aus Artikeln heraus verlinkbar sein:

- WiPro III Einbau.
- Fahrzeugseiten.
- Support-Fallaufnahme.
- Werkseinbau Eckernfoerde.

Artikel koennen "Arbeitskarte starten" anbieten, wenn sinnvoll.

## Akzeptanz

- Arbeitskarte laeuft in der Vite-App.
- Fehlende `@/...` Imports sind entfernt.
- Styling folgt Thitronik App-Design.
- Bilder laden.
- Speichern/Laden/Export/Druck funktionieren.
- Dealer sehen die Arbeitskarte, aber keine internen RAG-/Editor-/Audit-Funktionen.
