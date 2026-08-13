# Asset Mapping Guide

Ziel: Bilder, Icons, Logos und Audios sollen nicht nur als Download-Ordner herumliegen, sondern automatisch sinnvoll Artikeln, Suchtreffern und Asset-Seiten zugeordnet werden.

## Asset-Quellen

- `Produkte/`: Produktbilder fuer Artikelkopf, Produktkarten und Suchtreffer.
- `Fahrzeuge/`: Fahrzeugbilder fuer Fahrzeugseiten und Fahrzeugkompatibilitaet.
- `CI/`: Logos, Icons, Brand-Farben, Wallpaper, App-/Feature-Icons.
- `Firma/`: Unternehmensseite, Standort, Markencharakter.
- `Bilder und mehr/Bilder/`: thematische Visuals fuer Dashboard, FAQ, Anlernen, CAN-Bus, Fehlersuche, Gelverbinder, Grundlagen.
- `Bilder und mehr/Logo Wohnmobil Marken/`: Hersteller-/Markenlogos fuer Fahrzeug-/Haendler-Kontext.
- `Alarmtöne/`: Audio-Beispiele fuer Status- und Alarmtoene.

## Matching-Regeln

1. Exakter Slug-/Namensmatch
   - `wiki/de/wipro-iii.md` -> `Produkte/Wipro III.png`
   - `wiki/de/pro-finder.md` -> `Produkte/profinder.png`
   - `wiki/de/bt-connect.md` -> `Produkte/BT-connect.png`

2. Alias-Match
   - `gas-pro-iii` -> `Gas.pro III.png`
   - `gas-connect` -> `G.A.S.-connect.png`
   - `gas-plug` -> `G.A.S.-plug „all in one“.png`
   - `funk-rauchmelder` -> `T.S.A. Funk-Rauchmelder.png`
   - `safe-lock-umruestplatine` -> `safe.lock Umrüstplatine.png`

3. Kategorie-Match
   - `fahrzeuge/*fiat*` -> `Fahrzeuge/Fiat Ducato.jpg`
   - `fahrzeuge/*ford-transit*` -> `Fahrzeuge/Ford transit.png`
   - `fahrzeuge/*iveco*` -> `Fahrzeuge/iveco daily.webp`
   - `fahrzeuge/*mercedes-sprinter*` -> `Fahrzeuge/Mercedes Benz.avif`
   - `fahrzeuge/*mercedes-vito*` -> `Fahrzeuge/mercedes Benz Vito.avif`
   - `fahrzeuge/*renault*` -> `Fahrzeuge/renault master.webp`
   - `fahrzeuge/*vw-crafter*` -> `Fahrzeuge/vw crafter.png`
   - `fahrzeuge/*vw-t5*` -> `Fahrzeuge/vw t5.jpg`
   - `fahrzeuge/*vw-t6*` -> `Fahrzeuge/vw t6.webp`

4. Themen-Match
   - CAN-Bus / CAN Bus -> `Bilder und mehr/Bilder/Canbus.jpg` oder `CI/icon Can-Bus.png`
   - Anlernen -> `Bilder und mehr/Bilder/Anlernen.jpg`
   - Fehlersuche / Stoerung -> `Bilder und mehr/Bilder/fehlersuche.jpg`
   - Gelverbinder -> `Bilder und mehr/Bilder/Gelverbinder.jpg`
   - Grundlagen -> `Bilder und mehr/Bilder/Grundlagen.jpg`
   - Konfigurator -> `Bilder und mehr/Bilder/Konfigurator.png`

5. Audio-Match
   - Alarm -> `Alarmtöne/alarm.mp3`
   - Gasalarm -> `Alarmtöne/gas-alarm.mp3`
   - scharf -> `Alarmtöne/scharf.mp3`
   - unscharf -> `Alarmtöne/unscharf.mp3`
   - Batterie leer -> `Alarmtöne/batterie-leer.mp3`
   - Anlernmodus -> `Alarmtöne/anlernmodus.mp3`

## UI-Verwendung

Artikelkopf:

- Maximal ein primäres Bild.
- Kein Bild anzeigen, wenn Match unsicher ist.
- Bild nicht dunkel ueberblenden, wenn Produktdetails erkennbar sein sollen.

Related Assets:

- Unterhalb des Artikelkopfs oder in rechter Meta-Spalte als kompakte Liste.
- Zeige Dateityp, Dateiname, Kategorie.
- Audio-Dateien mit kleinem Inline-Player.

Asset-Bibliothek:

- Filter: Produkte, Fahrzeuge, CI, Firma, Themenbilder, Logos, Audio.
- Suche ueber Dateiname, normalisierte Aliase und Artikel-Matches.
- Download-Link/Copy-Path fuer interne Nutzer.

## Manuelles Mapping

Wenn automatische Zuordnung nicht reicht, soll die App `project-data/asset-overrides.json` unterstuetzen. Eine erste Version liegt bereits im Repository und deckt Kernprodukte, wichtige Themen und einige Fahrzeugseiten ab:

```json
{
  "wiki/de/wipro-iii.md": {
    "primaryImage": "Produkte/Wipro III.png",
    "relatedAssets": [
      "Produkte/wipro III. safelock.png",
      "CI/icon Can-Bus.png",
      "Alarmtöne/alarm.mp3"
    ]
  }
}
```

Regel: Overrides haben Vorrang vor heuristischem Matching.

## Qualitaetsregeln

- Keine externen Bilder verwenden, solange lokale Assets vorhanden sind.
- Keine Stockbilder.
- Produktbilder immer aus `Produkte/`.
- Fahrzeugbilder immer aus `Fahrzeuge/`, nicht aus generischer Websuche.
- CI-Seiten muessen echte Logos/Farben/Icon-Assets zeigen.
- Bildpfade in Manifesten immer relativ zum Repo speichern.
