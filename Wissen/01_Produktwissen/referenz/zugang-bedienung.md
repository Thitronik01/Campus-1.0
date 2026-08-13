---
title: Zugangsmedien & Bedienung — Zutrittswege im THITRONIK-System
sources:
  - sources/thitronik_zugang_nur_zugang_v2.pdf
  - wiki/wipro-iii.md
  - wiki/funk-handsender.md
  - wiki/nfc-modul.md
  - wiki/bt-connect.md
  - wiki/vernetzungsmodul.md
  - wiki/pro-finder.md
  - wiki/app-befehle.md
  - wiki/safe-lock-umruestplatine.md
  - wiki/fahrzeugkompatibilitaet.md
updated: '2026-07-15'
confidence: high
lang: de
dealerStatus: approved
---

# Zugangsmedien & Bedienung — Zutrittswege im THITRONIK-System

Diese Seite trennt zwischen **Zugangsmedium**, **Lesestelle beziehungsweise Steuertechnik** und **Fernsteuerung**. Diese Unterscheidung ist für Auswahl, Bedienung und Support wichtig: `KeyTag` ist nicht dasselbe wie das `NFC Modul`, und `BT-connect` ist nicht dasselbe wie `Pro-Finder`.

> **Grundsatz:** **Scharfschalten und Unscharfschalten** bezeichnen den Überwachungszustand der Alarmanlage. **Verriegeln und Entriegeln** bezeichnen die Zentralverriegelung des Fahrzeugs. Nur bei einer kompatiblen WiPro III safe.lock, einem passenden Fahrzeugprofil und geeigneten Softwareständen können beide Vorgänge gekoppelt sein.

> Für kanonische Begriffe, Aliasnamen und Fehlerschreibweisen siehe [[Terminologie & Schreibweisen]].

---

## Grundlogik

| Ebene | Beispiele | Einordnung |
|-------|-----------|------------|
| Fahrzeugseitige Zugangstechnik | CampLock Fingerprint, NFC Modul, BT-connect | Technik oder Lesestelle am Fahrzeug |
| Persönliches Zugangsmedium | Fingerabdruck, Funk-Handsender 868, KeyCard, KeyTag, KeyStrap, Smartphone oder Smartwatch | Medium, mit dem die Person eine Bedienung auslöst |
| Fernsteuerung | Pro-Finder über Mobilfunk | Fernbedienung, Alarmweiterleitung und Ortung; kein primärer Nahbereichszugang |
| Fahrzeugseitiger Originalweg | Original-Fahrzeugschlüssel | Bedienung abhängig von Fahrzeugprofil, CAN-Anbindung, WiPro-Variante und Konfiguration |

---

## Schnellvergleich

| Element | Typ | Ver-/Entriegeln | Scharf/Unscharf | Reichweite | Voraussetzung | Detailseite |
|---------|-----|-----------------|-----------------|------------|---------------|-------------|
| Original-Fahrzeugschlüssel | fahrzeugseitiger Funkweg | fahrzeugseitig | fahrzeugabhängig | Fahrzeug-Funkreichweite | unterstütztes Fahrzeugprofil und korrekte Anbindung; Replay-Schutz nicht aktiv | [[WiPro III]] |
| CampLock Fingerprint | biometrischer Türzugang | ja | bei Kopplung mit kompatibler WiPro | direkt an der Tür | Hartal-Aufbautür mit Zentralverriegelung | — |
| Funk-Handsender 868 | 868-MHz-Funk | nur mit kompatibler safe.lock-Anbindung | ja | bis 75 m im Freifeld | WiPro III oder WiPro III safe.lock | [[Funk-Handsender]] |
| NFC Modul | NFC-Lesestelle mit 868-MHz-Verbindung zur WiPro | nur mit kompatibler safe.lock-Anbindung | ja | NFC-Nahbereich am Modul | kompatible Anlage und angelerntes NFC-Medium | [[NFC Modul]] |
| KeyCard | NFC-Zugangsmedium | über das NFC Modul | über das NFC Modul | ca. 25 mm | NFC Modul erforderlich | — |
| KeyTag | NFC-Zugangsmedium | über das NFC Modul | über das NFC Modul | ca. 20 mm | NFC Modul erforderlich | — |
| KeyStrap | NFC-Zugangsmedium | über das NFC Modul | über das NFC Modul | ca. 15 mm | NFC Modul erforderlich | — |
| BT-connect | Bluetooth/App-Nahbereich | nur mit kompatibler safe.lock-Anbindung | ja | lokaler Nahbereich | Smartphone oder Smartwatch, THITRONIK® App und kompatible Geräte-/Softwarestände | [[BT-connect]] |
| Pro-Finder | Mobilfunk-Fernsteuerung | nur mit kompatibler safe.lock-Anbindung | ja | innerhalb der verfügbaren Mobilfunkabdeckung | SIM-Karte, Mobilfunkempfang, Konfiguration und kompatible Geräte-/Softwarestände | [[Pro-Finder]] |

> **Empfehlung:** Mindestens **zwei voneinander unabhängige Bedienwege** vorsehen. Vor der Auswahl prüfen, welche Funktionen das konkrete Fahrzeugprofil, die WiPro-Variante und die installierten Softwarestände unterstützen.

---

## Nicht verwechseln

- `KeyCard`, `KeyTag` und `KeyStrap` sind **keine eigenständigen Steuergeräte**, sondern nur Medien für das [[NFC Modul]].
- `BT-connect` ist ein **Nahbereichsweg**. Ohne Bluetooth-Verbindung oder mit leerem Smartphone-Akku gibt es darüber keinen Zugang.
- `Pro-Finder` ist ein **Fernsteuerungs-, Alarmweiterleitungs- und Ortungsweg**, nicht der bevorzugte tägliche Nahbereichszugang.
- `safe.lock` ist **keine eigene Zutrittsmethode**, sondern eine Sicherheitslogik rund um Schlüssel und Zentralverriegelung.

---

## 1. CampLock Fingerprint

**Art.-Nr. 106111 (silber) / 106144 (schwarz)**  
Biometrischer Türzugang für **Hartal-Aufbautüren mit Zentralverriegelung**.

### Funktionen und Eigenschaften

- Tür wird per **Fingerabdruck** entriegelt und verriegelt
- auf Wunsch wird dabei gleichzeitig das THITRONIK-Alarmsystem mitgeführt
- kompatibel zu **WiPro III** und **WiPro III safe.lock**
- **2 Master-Finger** und **16 anlernbare Finger**
- Schutzklasse **IP67**

### Einordnung

CampLock Fingerprint sitzt direkt an der Aufbautür. Es ersetzt weder Pro-Finder noch NFC Modul, sondern bildet einen eigenen biometrischen Türzugang.

---

## 2. Original-Fahrzeugschlüssel

Der Originalschlüssel kann bei kompatiblen Fahrzeugprofilen der fahrzeugseitige Standardweg sein:

- `Verriegeln` kann die WiPro scharfschalten.
- `Entriegeln` kann die WiPro unscharfschalten.
- Aktive Alarme können je nach Fahrzeugprofil und Konfiguration mit dem Schlüssel beendet werden.

### Grenzen

- Die Funktion setzt ein unterstütztes Fahrzeugprofil und eine korrekte Fahrzeuganbindung voraus; bei einzelnen Fahrzeugen steuert der Originalschlüssel nur die Zentralverriegelung, nicht zuverlässig die WiPro.
- Ist der Replay-Schutz über DIP 5 aktiviert, schaltet der Original-Fahrzeugfunkschlüssel die WiPro nicht mehr scharf oder unscharf. Die Türüberwachung über den CAN-Bus bleibt aktiv.
- Im Campingmodus kann der zuvor verwendete Verriegelungsweg beeinflussen, welche Entriegelungswege anschließend verfügbar sind. Die fahrzeugspezifischen Hinweise sind verbindlich.

---

## 3. Funk-Handsender 868

**Art.-Nr. 101064**  
Ein vom Smartphone unabhängiger THITRONIK® Bedienweg.

### Typische Rolle

- physischer Backup-Weg zum Smartphone oder Originalschlüssel
- geeignet für weitere berechtigte Nutzer
- bei kompatibler safe.lock-Anbindung auch zur Bedienung der Zentralverriegelung

### Wichtige Punkte

- Reichweite bis zu **75 m im Freifeld**
- Panikfunktion unterstützt; die Tastenkombination hängt vom Serienstand des Handsenders ab
- funktioniert unabhängig vom Smartphone
- Batterie **CR2032**; nach dem Batteriewechsel ist kein erneutes Anlernen erforderlich

→ [[Funk-Handsender]]

---

## 4. NFC-Familie: NFC Modul + KeyCard / KeyTag / KeyStrap

### NFC Modul

**Art.-Nr. 105299**  
Das NFC Modul ist die **Lesestelle am Fahrzeug**, nicht das Zugangsmedium selbst.

- Montage an der Innenseite einer geeigneten Scheibe; das Modul muss für den Batteriewechsel zugänglich bleiben
- bis zu **14 Transponder**
- bei `WiPro III safe.lock` zusätzlich Ver-/Entriegelung der Zentralverriegelung
- THITRONIK® Originaltags basieren auf **MIFARE DESFire EV2 / ISO 14443-A**; angelernte Fremd-Tags sind nicht kopiergeschützt

### Zugangsmedien für das NFC Modul

| Medium | Art.-Nr. | Form | Reichweite | Typischer Einsatz |
|--------|----------|------|------------|-------------------|
| KeyCard | 105300 | Kartenformat | ca. 25 mm | Portemonnaie, Cardholder |
| KeyTag | 105301 | Anhänger | ca. 20 mm | diskret, robust, wasserdicht |
| KeyStrap | 105302 / 105464–105470 | wasserdichtes Armband | ca. 15 mm | Sport, Wasser, freie Hände |

### KeyStrap-Varianten

- Größe M: `105302` schwarz, `105464` weiß, `105466` blau, `105465` rot
- Größe L: `105467` schwarz, `105468` weiß, `105470` blau, `105469` rot

### Wichtig für die Praxis

- `KeyCard`, `KeyTag` und `KeyStrap` funktionieren **nur zusammen mit dem NFC Modul**
- die Zentralverriegelung wird nur bei einer kompatiblen safe.lock-Anbindung mitgeführt
- das NFC Modul darf **nicht als erstes Zubehör** angelernt werden
- einzelne NFC-Medien lassen sich nicht selektiv löschen; ein Reset entfernt alle gespeicherten Tags

→ [[NFC Modul]]

---

## 5. BT-connect und App

**Art.-Nr. 106000**  
Lokaler Bluetooth-Zugang per Smartphone oder Smartwatch.

### Stärken

- komfortabler Nahbereichszugang
- mit kompatibler WiPro III safe.lock, passender Fahrzeuganbindung und geeigneten Softwareständen auch Fahrzeug ver- und entriegeln
- bis zu **9 koppelbare Geräte**

### Grenzen

- ohne Bluetooth-Verbindung kein Zugang
- kein Ersatz für einen physischen Backup-Weg
- nicht mit `Pro-Finder` verwechseln: BT-connect ist **Nahbereich**, Pro-Finder ist **Fernbereich**

### Älteres Modul

Das [[Bluetooth-Vernetzungsmodul]] erfüllt einen ähnlichen Zweck, wurde jedoch im September 2025 durch BT-connect abgelöst.

→ [[BT-connect]] · [[App-Befehle]]

---

## 6. Pro-Finder als Fernsteuerung

Pro-Finder ergänzt die lokalen Zugangsmethoden um **Fernsteuerung, Alarmweiterleitung und Ortung**.

### Typische Rolle

- Fernzugriff innerhalb der verfügbaren Mobilfunkabdeckung
- Ortung und Statusabfrage
- Scharf- und Unscharfschalten, Geofencing und Steuerung der Ausgänge; je nach Systemstand zusätzlich Ver- und Entriegeln
- sichere Fahrzeugstilllegung über `kill` nur mit fachgerecht installierter Abschalteinrichtung

### Abgrenzung

Pro-Finder ist **kein primärer täglicher Nahbereichszugang**. Seine Funktion hängt von Mobilfunkempfang, SIM-Karte, Konfiguration und Gerätegeneration ab.

> **WARNUNG — Fahrzeugstilllegung:** Ausschließlich den Befehl `kill` verwenden. Er schaltet Ausgang A erst ein, wenn die GPS-Geschwindigkeit mindestens 5 Sekunden durchgehend 0 km/h beträgt. `a an` und zeitgesteuerte Ausgangsbefehle besitzen diese Sicherheitsprüfung nicht. Die Stilllegung ist auf maximal drei Tage begrenzt.

→ [[Pro-Finder]] · [[Mobilfunk & SIM-Karten]]

---

## 7. safe.lock, Campingmodus und Originalschlüssel

`safe.lock` ist kein neues Zugangsmedium, sondern eine fahrzeugabhängige Schlüssel- und Zentralverriegelungslogik. Sie schützt insbesondere davor, dass ein aufgezeichnetes Entriegelungssignal gleichzeitig das Fahrzeug öffnet und die Alarmanlage unscharf schaltet. `safe.lock` ist keine Wegfahrsperre und nicht mit der separaten Abschalteinrichtung gleichzusetzen.

### Betriebshinweise

- THITRONIK® Zubehör kann abhängig von Fahrzeugprofil und Softwarestand einen eigenen Bedienweg für Alarmanlage und Zentralverriegelung bereitstellen.
- Im Campingmodus das Fahrzeug grundsätzlich über den dafür vorgesehenen THITRONIK® Bedienweg verriegeln. Nach dem Verriegeln mit dem Originalschlüssel kann die Entriegelung über Zubehör bei bestimmten Fahrzeugen blockiert sein.
- Der Sleep Mode ist davon zu trennen: Er bezeichnet den fahrzeugseitigen Ruhezustand von Steuergeräten und ist kein eigener Zugangsweg. Er kann jedoch die spätere Entriegelung über THITRONIK® Zubehör verhindern.
- Vor dem Einschließen eines Originalschlüssels muss die konkrete Fahrzeug- und Softwarekombination geprüft werden.

→ [[WiPro III]] · [[safe.lock Umrüstplatine]] · [[Fahrzeugkompatibilität]]

---

## Mögliche Kombinationen

Die folgenden Beispiele sind keine pauschale Kompatibilitätszusage. Maßgeblich sind Fahrzeugprofil, WiPro-Variante, Softwarestände und fachgerechte Installation.

| Nutzungsprofil | Sinnvolle Kombination |
|---------------|-----------------------|
| Standard-Wohnmobil | Originalschlüssel + Funk-Handsender + Pro-Finder |
| App-orientierte Nutzung | BT-connect + Funk-Handsender; Originalschlüssel abhängig vom Fahrzeugprofil |
| Schlüsselloser Nahzugang | NFC Modul + KeyCard/KeyTag/KeyStrap + Funk-Handsender |
| Biometrischer Türzugang an Hartal-Tür | CampLock Fingerprint + Funk-Handsender + optional Pro-Finder |
| Erweiterte Schlüsselsicherheit | WiPro III safe.lock + mindestens ein kompatibler THITRONIK® Bedienweg + optional Pro-Finder |

---

## Backup-Szenarien

| Situation | Robuster Ausweichweg |
|-----------|----------------------|
| Smartphone-Akku leer | Funk-Handsender |
| Originalschlüssel nicht nutzbar | zuvor geprüfter kompatibler THITRONIK® Bedienweg, z. B. Funk-Handsender, NFC oder BT-connect |
| NFC-Medium nicht zur Hand | zuvor eingerichteter Funk-Handsender oder BT-connect |
| Kein Mobilfunknetz | lokale Wege nutzen, nicht Pro-Finder |
| Fahrzeug gestohlen | Pro-Finder zur Ortung; `kill` nur mit Abschalteinrichtung und unter den genannten Sicherheitsbedingungen |

---

## Querverweise

- [[Systemüberblick]]
- [[Terminologie & Schreibweisen]]
- [[WiPro III]]
- [[Funk-Handsender]]
- [[NFC Modul]]
- [[BT-connect]]
- [[Pro-Finder]]
- [[App-Befehle]]
- [[Abschalteinrichtung]]
- [[Mobilfunk & SIM-Karten]]
- [[Fahrzeugkompatibilität]]
