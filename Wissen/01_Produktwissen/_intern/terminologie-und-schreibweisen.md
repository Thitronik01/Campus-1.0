---
title: Terminologie & Schreibweisen — Kanonische Begriffe für Menschen und KI
sources:
  - sources/39_glossar.md
  - sources/FAQ_WiPro-III-safelock_DE.md
  - sources/FAQ_Haeufige-Fragen-zur-THITRONIK-App_DE.md
  - sources/Fahrzeugbesonderheiten.docx
  - sources/Was ist eine Wipro.docx
  - sources/thitronik_zugang_nur_zugang_v2.pdf
  - sources/APP.docx
updated: '2026-07-13'
confidence: high
lang: de
---

# Terminologie & Schreibweisen — Kanonische Begriffe für Menschen und KI

Diese Seite definiert die **bevorzugten Begriffe, Schreibweisen und Aliasnamen** für das Wiki. Sie dient ausdrücklich als gemeinsame Arbeitsgrundlage für **Menschen, Support, Doku und KI-Agenten**.

> **Arbeitsregel:** Wenn mehrere Varianten existieren, verwendet das Wiki immer die **kanonische Form** aus der ersten Spalte. Abweichende Schreibweisen werden nur noch als Alias, Suchhilfe oder Fehlerschreibweise behandelt.

---

## Schnellregeln

- `safe.lock` immer **mit Punkt** schreiben.
- `CAN-Bus` immer **mit Bindestrich** schreiben.
- `Geofencing` ist die kanonische Form; `Geofancing` gilt als Fehlerschreibweise.
- `Vent-check` ist die kanonische Form; `Ventcheck`, `Belüftungsfunktion` und `Kontakt offen` sind Aliasbegriffe.
- `Standalone` ist die kanonische Form; `Stand Alone` nur als Suchvariante.
- `Panikalarm` ist der Oberbegriff; `Panikfunktion` beschreibt den konkreten Bedienvorgang am Handsender oder in der App.
- `Anlernmodus` wird für WiPro/Funk-Zubehör verwendet; `Koppelmodus` für Bluetooth-Geräte wie `BT-connect`.
- `Campingmodus` ist der bevorzugte deutsche Begriff; `Camping Mode` und `Camper Mode` sind Aliasformen.
- `WiPro III-Zentrale` immer mit Bindestrich zwischen Produktname und Gerätebezeichnung schreiben.
- `Funk-Handsender 868` ist die kanonische deutsche Produktbezeichnung; verkürzend ist im Fließtext `Handsender` zulässig.
- `scharfschalten` und `unscharfschalten` werden als Verben zusammengeschrieben; substantivisch `Scharfschalten` und `Unscharfschalten`.
- `Zentralverriegelung (ZV)` beim ersten Auftreten ausschreiben; danach darf `ZV` verwendet werden.
- `Sirene` und `Fahrzeughupe` bezeichnen unterschiedliche akustische Alarmgeber und dürfen nicht gleichgesetzt werden.
- `Status-LED` immer mit Bindestrich schreiben.
- `Back-up Sirene` ist die kanonische Produktbezeichnung; `Backup-Sirene` und `Backupsirene` sind nur Suchvarianten.

---

## Kanonische Begriffe

| Kanonischer Begriff | Alias / Varianten | Präzise Bedeutung | Zielseite |
|---------------------|-------------------|-------------------|-----------|
| `safe.lock` | safelock, safe lock | THITRONIK-Schlüsselsicherheitslogik bzw. Produktvariante der WiPro III | [[WiPro III]] · [[safe.lock Umrüstplatine]] |
| `Rollcode` | Rolling Code | Neuere Generation des Original-Fahrzeugschlüssels; im lokalen Bestand ab Modelljahr 2019 als Unterscheidungsmerkmal genannt | [[safe.lock Umrüstplatine]] |
| `Replay-Attacke` | Replay Attacke, Signalwiederholung | Wiederholtes Abspielen eines aufgezeichneten Entriegeln-Signals des Originalschlüssels | [[safe.lock Umrüstplatine]] |
| `Replay-Schutz` | Replayschutz | WiPro-Funktion, die aufgezeichnete Schlüssel-Signale nicht mehr akzeptiert | [[WiPro III]] · [[Störungsbeseitigung]] |
| `Panikalarm` | Panickalarm, Panikfunktion, manueller Alarm | Bewusst ausgelöster Alarm über Handsender oder App/Smartwatch | [[WiPro III]] · [[Funk-Handsender]] · [[Zugangsmedien & Bedienung]] |
| `Vent-check` | Ventcheck, Kontakt offen, Belüftungsfunktion | Toleriertes Offenlassen eines Kontakts beim Scharfschalten, z. B. zum Lüften | [[WiPro III]] |
| `Easy-Add 1.0` | Easy Add 1.0, easy add per Handsender | Anlernweg über einen bereits angelernten Handsender nach Spannungsunterbrechung | [[Anlernvorgang]] |
| `Easy-Add 2.0` | Easy Add 2.0, easy add per CAN | CAN-basiertes Anlernen über die Fahrertür, kein Lösch-Ersatz | [[Anlernvorgang]] |
| `Easy-Add 3.0` | Easy Add 3.0, App-Anlernen | App-gestützter Start des Anlernmodus über Pro-Finder oder Bluetooth-Modul | [[Anlernvorgang]] · [[App-Befehle]] |
| `Anti-Jamming` | Anti Jamming, Jamming-Schutz, Störsenderalarm | Erkennung einer Funkstörung zwischen WiPro und Funk-Zubehör | [[WiPro III]] · [[Störungsbeseitigung]] |
| `Störsender` | Stoersender, Jamming-Sender | Externe Funkstörquelle; kann real oder als Fehlalarmumfeld relevant sein | [[Störungsbeseitigung]] |
| `CAN-Bus` | CAN Bus, Can Bus | Fahrzeugdatenbus für ZV-, Tür-, Zünd- und Blinkersignale | [[Fahrzeugkompatibilität]] |
| `Campingmodus` | Camping Mode, Camper Mode | safe.lock-Betriebslogik, bei der THITRONIK-Zubehör als primärer Zugang genutzt wird | [[WiPro III]] · [[Zugangsmedien & Bedienung]] |
| `Sleep Mode` | Ruhezustand, Ruhemodus | Fahrzeugseitiger CAN-/Steuergeräte-Ruhezustand, der ZV-Ansteuerung blockieren kann | [[Fahrzeugkompatibilität]] |
| `Standalone` | Stand Alone, autark | Gerät arbeitet ohne WiPro-Kopplung als eigenständige Lösung | [[Systemüberblick]] |
| `Geofencing` | Geofancing, virtueller Zaun | Bewegungsalarm bei Ortsveränderung des Fahrzeugs | [[Pro-Finder]] |
| `Anlernmodus` | Teach Mode, Lernmodus | Zustand zum Speichern neuer Funk-Komponenten in WiPro oder NFC Modul | [[Anlernvorgang]] · [[NFC Modul]] |
| `Koppelmodus` | Pairing-Modus, Bluetooth-Koppeln | Bluetooth-Modus zum Verbinden von Smartphone/Smartwatch mit BT-connect oder Vernetzungsmodul | [[BT-connect]] · [[Bluetooth-Vernetzungsmodul]] |
| `CampLock Fingerprint` | Fingerprint, Finger Print | Biometrischer Türzugang für Hartal-Aufbautüren mit Zentralverriegelung | [[Zugangsmedien & Bedienung]] |
| `NFC Modul` | NFC-Lesemodul | Die eigentliche NFC-Lesestelle am Fahrzeug; KeyCard/KeyTag/KeyStrap sind nur Medien dafür | [[NFC Modul]] · [[Zugangsmedien & Bedienung]] |
| `KeyCard` | NFC-Karte | Kartenförmiges NFC-Zugangsmedium für das NFC Modul | [[Zugangsmedien & Bedienung]] |
| `KeyTag` | Keytag, NFC-Anhänger | Kompaktes NFC-Zugangsmedium für das NFC Modul | [[Zugangsmedien & Bedienung]] |
| `KeyStrap` | NFC-Armband | Armbandförmiges NFC-Zugangsmedium für das NFC Modul | [[Zugangsmedien & Bedienung]] |
| `BT-connect` | BT Connect | Aktuelles Bluetooth-Modul für lokale App-/Smartwatch-Bedienung | [[BT-connect]] |
| `WiPro III-Zentrale` | WiPro III Zentrale, Alarmzentrale, Zentrale | Zentrale Steuer- und Auswerteeinheit des WiPro III-Alarmsystems; keine Leitstelle und keine Firmenzentrale | [[WiPro III]] |
| `Funk-Handsender 868` | Funkhandsender, Radio-Handsender, Handsender | Offizielle Bezeichnung der 868-MHz-Fernbedienung für WiPro III | [[Funk-Handsender]] |
| `scharfschalten` | aktivieren, einschalten, scharf schalten | Alarmsystem in den überwachenden Zustand versetzen | [[Zugangsmedien & Bedienung]] |
| `unscharfschalten` | deaktivieren, ausschalten, unscharf schalten | Überwachenden Zustand des Alarmsystems beenden | [[Zugangsmedien & Bedienung]] |
| `Zentralverriegelung (ZV)` | ZV, zentrale Verriegelung | Fahrzeugfunktion zum gemeinsamen Ver- und Entriegeln der Türen | [[Fahrzeugkompatibilität]] |
| `Fahrzeughupe` | Hupe, Horn, Signalhorn | Werkseitiger akustischer Signalgeber des Fahrzeugs; von einer Alarm- oder Back-up Sirene zu unterscheiden | [[Sirenen und Hupen]] |
| `Status-LED` | Status LED, Zustands-LED | Leuchtdiode zur Anzeige von Betriebszuständen, Alarmursachen und Blinkcodes | [[WiPro III]] · [[Pro-Finder]] |
| `Back-up Sirene` | Backup-Sirene, Backupsirene | Zusätzlicher akustischer Alarmgeber mit eigener Energieversorgung | [[Sirenen und Hupen]] |

---

## Begriffspaare, die nicht verwechselt werden dürfen

| Begriffe | Unterschied |
|----------|-------------|
| `safe.lock` vs. `Rollcode` | `safe.lock` ist die THITRONIK-Sicherheitslogik bzw. Produktfunktion. `Rollcode` beschreibt die Generation des **Originalschlüssels**. Ein Rollcode-Schlüssel ersetzt keine safe.lock-Funktion. |
| `Replay-Attacke` vs. `Replay-Schutz` | Die Replay-Attacke ist das **Angriffsszenario**. Replay-Schutz ist die **Abwehrfunktion** der WiPro. |
| `Campingmodus` vs. `Sleep Mode` | `Campingmodus` ist eine **Betriebs- und Zugangssituation**. `Sleep Mode` ist ein **fahrzeugseitiger Ruhezustand** des CAN-/Steuergerätenetzes. |
| `Anlernmodus` vs. `Koppelmodus` | `Anlernmodus` gehört zu WiPro/Funk/NFC. `Koppelmodus` gehört zu Bluetooth-Verbindungen. |
| `NFC Modul` vs. `KeyCard` / `KeyTag` / `KeyStrap` | Das NFC Modul ist die **Lesestelle**. KeyCard, KeyTag und KeyStrap sind nur die **Zugangsmedien** dafür. |
| `Standalone` vs. `WiPro-gebunden` | Standalone-Produkte funktionieren ohne WiPro. WiPro-gebundene Produkte benötigen die Alarmzentrale oder ein gekoppeltes System. |
| `Panikalarm` vs. `Einbruchalarm` | Panikalarm wird **bewusst ausgelöst**. Einbruchalarm entsteht durch eine erkannte Alarmursache. |
| `Sirene` vs. `Fahrzeughupe` | Eine Sirene ist ein eigener Alarmgeber. Die Fahrzeughupe ist der werkseitige Signalgeber des Fahrzeugs. Anschluss, Verfügbarkeit und Signalfolge können unterschiedlich sein. |
| `scharfschalten` vs. `verriegeln` | Scharfschalten aktiviert die Überwachung. Verriegeln schließt die Zentralverriegelung. Je nach System können beide Vorgänge gemeinsam oder getrennt erfolgen. |
| `unscharfschalten` vs. `entriegeln` | Unscharfschalten deaktiviert die Überwachung. Entriegeln öffnet die Zentralverriegelung. Das eine setzt das andere nicht in jedem Systemzustand voraus. |

---

## Such- und Schreibvarianten, die bewusst normalisiert werden

| Eingabe / Schreibweise | Im Wiki auflösen zu |
|------------------------|---------------------|
| `Geofancing` | `Geofencing` |
| `Ventcheck` | `Vent-check` |
| `Panickalarm` | `Panikalarm` |
| `safe lock` / `safelock` | `safe.lock` |
| `CAN Bus` / `Can Bus` | `CAN-Bus` |
| `Stand Alone` | `Standalone` |
| `Camping Mode` / `Camper Mode` | `Campingmodus` |
| `Finger Print` | `CampLock Fingerprint` |
| `WiPro III Zentrale` | `WiPro III-Zentrale` |
| `Status LED` | `Status-LED` |
| `Backup-Sirene` / `Backupsirene` | `Back-up Sirene` |
| `scharf schalten` / `unscharf schalten` | `scharfschalten` / `unscharfschalten` |

---

## Redaktionshinweise für große Wiki-Ausbaustufen

- Produktseiten verwenden den **kanonischen Begriff im Seitentitel**.
- Aliasnamen erscheinen nur noch im Fließtext, in FAQ-Fragen oder in dieser Terminologieseite.
- Wenn ein neuer Begriff in mehreren Schreibweisen im Support auftaucht, wird zuerst diese Seite erweitert und erst danach der Rest des Wikis vereinheitlicht.
- Bei Zweifeln zwischen Marketingbegriff und Technikbegriff gilt im Wiki immer die **technisch präzisere Form**.

---

## Querverweise

- [[Glossar]]
- [[Zugangsmedien & Bedienung]]
- [[WiPro III]]
- [[Pro-Finder]]
- [[App-Befehle]]
- [[Fahrzeugkompatibilität]]
