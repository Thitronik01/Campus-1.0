# Seriennummern und Softwarestände — Präfixe, Schwellen und Meilensteine

Route: /de/seriennummern-softwarestaende | Stand: 2026-07-15 | Sichtbarkeit: standard
Quelle: Thitronik Online/project-data/runtime/wiki/wiki-articles/de/seriennummern-softwarestaende.json

---
Seriennummern und Softwarestände — Präfixe, Schwellen und Meilensteine

Diese Arbeitsmatrix ordnet die wichtigsten Seriennummern-Präfixe, dokumentierten Produktionsstände und Funktionsschwellen der THITRONIK-Produkte ein. Sie unterstützt die Fallaufnahme und Kompatibilitätsprüfung, ersetzt aber weder das Typenschild noch die produkt- und fahrzeugspezifische Anleitung.

Grundregel: Immer die vollständige Seriennummer und – sofern ablesbar – den tatsächlich installierten Softwarestand erfassen. Ein Eintrag in einer Seriennummernliste beschreibt die dokumentierte Zuordnung bei Produktion; ein späteres Softwareupdate kann den Stand des konkreten Geräts verändert haben.

## Seriennummern richtig lesen

Angabe | Beispiel | Bedeutung | 
 Artikelnummer | 100699 | Bestell- oder Produktnummer; nicht mit der Seriennummer gleichsetzen | 
 Seriennummern-Präfix | 0699- | Kennzeichnet die Produkt- oder Baureihe | 
 Vollständige Seriennummer | 0699-045 | Präfix plus laufender Serienstand; führende Nullen nicht weglassen | 
 Softwarestand | 11.0.4 | Funktionsstand der Software; separat von der Seriennummer dokumentieren | 
 Mindeststand | ab 0699-045 | Die genannte Funktion oder Hardwareänderung ist ab dieser Schwelle dokumentiert; Produktfamilie und weitere Voraussetzungen bleiben maßgeblich | 
 Quellenendstand | z. B. 0699-072 | Letzter Eintrag der vorliegenden Seriennummernliste, nicht automatisch der heute neueste lieferbare Stand | 

Wichtig: Höhere laufende Nummern gelten nur innerhalb derselben Produktlinie als späterer Serienstand. Die Reihen 0823- , 1050- , 5298- , 5458- und 5832- besitzen eigene Softwarezweige und dürfen nicht numerisch miteinander verglichen werden.

## Präfix-Matrix

Präfix | Produktfamilie | Einordnung | Wichtige Orientierung | 
 0823- | WiPro III | Standardzentrale | App-, Fahrzeug- und Sensorfunktionen besitzen eigene Schwellen | 
 1050- | WiPro III safe.lock | safe.lock -Zentrale | eigene, vor allem für Fiat-/Sevel-Fahrzeuge dokumentierte Historie | 
 5298- | WiPro III safe.lock Ford-Set | Ford Transit / Custom | eigener Ford-Softwarezweig | 
 5458- | WiPro III safe.lock Sprinter-Set | Sprinter / Crafter / TGE | eigener Mercedes-/VW-/MAN-Softwarezweig | 
 5832- | WiPro III safe.lock Renault-Set | Renault Master 2019–2024 | eigener Renault-Softwarezweig | 
 0699- | Pro-Finder | GSM/GPS, SMS und Ortung | App-Schwelle und Hardwarewechsel ab 0699-045 besonders relevant | 
 0686- | GPS-pro | ältere Ortungslösung | eigenständige Legacy-Serie | 
 1012- | GSM/GPS-Kombimodul | älteres Kombimodul | 1012-002 ist in der Serienliste als empfohlene Version markiert | 
 1290- | Bluetooth-Vernetzungsmodul | Vorgänger von BT-connect | Smartwatch-Kompatibilität hängt vom Serien- und Softwarestand ab | 
 6000- | BT-connect | Bluetooth-Modul | eigene Produktlinie; nicht mit 1290- vermischen | 
 5299- | NFC Modul | NFC-Zugang | Serienfolge dokumentiert, aber kein eigener Softwarestand ausgewiesen | 
 1052- | safe.lock Umrüstplatine | Schlüssel-Upgrade | Serienpräfix der Umrüstplatine Art. 101052 | 
 5237- | WiPro easy | ältere Kompaktzentrale | eigener Softwarezweig 1.0 bis 1.0.1 in der vorliegenden Liste | 
 0001- | G.A.S.-pro | älteres Gaswarngerät | vor 2013 zusätzlich Alt-Schema SN40/SN50-xxxxx | 
 1286- | G.A.S.-pro III KW | Gaswarngerät | eigener Softwarezweig der KW-Variante | 
 1287- | G.A.S.-pro III CO | Gas-/CO-Warngerät | eigener Software- und Sensorzweig | 
 1011- | C.A.S. III | ältere Zentrale | relevant für die historische Wassermelder -Schwelle | 

Zubehörpräfixe ohne dokumentierte Funktionsschwelle stehen im Abschnitt „Zubehör und Sensorik“. Artikelnummern sind separat unter Artikelnummern-Register — Dokumentierte THITRONIK-Produkte und Zubehör geführt.

## WiPro III und safe.lock

### 0823-xxx — WiPro III

Ab Seriennummer | SW | Dokumentierte Relevanz | 
 0823-012 | — | Mindeststand für bestimmte Fahrzeugprofile, darunter VW T6 (2015–2019) | 
 0823-014 | 5.8 | mehrere neue Fahrzeugprofile; Replay-Schutz ab dieser Kombination dokumentiert | 
 0823-018 | — | App-Grundfunktionen als Referenzschwelle | 
 0823-019 | 7.1 | neuere Fahrzeugprofile und bestimmte safe.lock-Upgrades, darunter Mercedes Sprinter VS30 (BR907/910, ab 2018) und VW T6.1 (ab 2019) | 
 0823-021 | 6.8 | Unterstützung des Funk-Wassermelder 868 — Kabelloser Wassermelder | 
 0823-034 | — | Sprinter VS30: Auswertung aller vier Schlüssel als Rolling-Code-Stand dokumentiert | 

### 1050-xxx — WiPro III safe.lock

Ab Seriennummer | SW | Dokumentierte Relevanz | 
 1050-004 | 6.7s | App-Grundfunktionen, Zentralverriegelungsfunktionen, Easy-Add 3.0 und Funk-Wassermelder | 
 1050-006 | 6.7s | Kombifunktion „Verriegeln und Scharfschalten“; außerdem dokumentierte Empfängermodul-/Kondensator-Auffälligkeit bei einzelnen Geräten | 
 1050-016 | 7.1s | Unterstützung Fiat Ducato 8 / Modelljahr 2022 | 
 1050-025 | 7.3.0s | Kompatibilität mit Alphatronics ONE | 
 1050-038 | 7.5.0s | dokumentierte Reichweiten-Auffälligkeit einzelner Funk-Handsender 868 | 
 1050-042 | 7.5.2s | Mindest-Seriennummer für Ducato 8 mit großem Touch-Infotainment-System | 
 1050-046 | 7.5.3s | Unterstützung des Fiat-Ducato-Facelifts ab 2024 | 
 1050-051 | 7.5.3s | E1-Zulassungszeichen wieder auf dem Gehäuse dokumentiert | 

Bei Reichweitenproblemen in den Reihen 1050-006 und 1050-038 nicht pauschal Zubehör austauschen. Vollständige Seriennummer, Funk-Komponente, Batterieanzeige, Montageort und Reichweitentest dokumentieren und fachlich prüfen lassen.

### 5298-xxx — WiPro III safe.lock Ford-Set

Ab Seriennummer | SW | Dokumentierte Relevanz | 
 5298-001 | 7.4.0s | erste regulär dokumentierte Ford-Set-Serie; App-/ZV- und Wassermelder-Schwelle | 
 5298-005 | 1.0.1sf | Ford Transit / Tourneo Custom / Transit Custom (2024+) ; Campingmodus und Aussperrschutz | 
 5298-008 | 1.0.3sf | Fehlerkorrektur des Aussperrschutzes bei Kombination mit Pro-Finder für Ford Transit 2019–2024 | 
 5298-009 | 1.0.3sf | letzter Eintrag der vorliegenden Ford-Seriennummernliste | 

Für die Kombination WiPro III safe.lock und Pro-Finder im Ford Transit 2019–2024 ist die Korrekturschwelle 5298-008 sicherheitsrelevant. Eine ältere Set-Version nicht allein anhand allgemeiner Ford-Kompatibilität freigeben.

### 5458-xxx — WiPro III safe.lock Sprinter-Set

Ab Seriennummer | SW | Dokumentierte Relevanz | 
 5458-001 | 1.0.5sx | erster dokumentierter Set-Stand; App-/ZV- und Wassermelder-Schwelle | 
 5458-006 | 1.2.0sx | Korrektur eines Scharfschalt-Logikfehlers und Aussperrschutzwarnton | 
 5458-013 | 1.2.1sx | Altbestand aus einer heute lokal fehlenden Sprinter-Set-Liste; keine Fahrzeugfreigabe | 

### 5832-xxx — WiPro III safe.lock Renault-Set

Ab Seriennummer | SW | Dokumentierte Relevanz | 
 5832-001 | 1.0.0sr | Erstversion für Renault Master (2019–2024) — safe.lock | 

## Pro-Finder

Ab Seriennummer | SW | Dokumentierte Relevanz | 
 0699-003 | 5.0 | 24-V-Fähigkeit | 
 0699-009 | 8.7 | Prepaid-Guthabenabfrage für weitere Anbieter dokumentiert | 
 0699-013 | 9.1 | App-Kompatibilität, Alarmanruf und neue Melderarten | 
 0699-015 | — | Kombifunktion „Verriegeln und Scharfschalten“ als Funktionsschwelle | 
 0699-018 | 9.1 | neues 2G-/3G-Modem; 3G-Kompatibilität für die Schweiz dokumentiert | 
 0699-029 | 10.0.0 | Korrekturen französischer Befehle und verbesserte Modemkommunikation | 
 0699-045 | 11.0.4 | Hardwarewechsel: 4G LTE, Nano-SIM und vollständig deaktivierte SIM-PIN-Abfrage | 
 0699-056 | 11.0.6 | verbesserte Kompatibilität mit O2-SIM-Karten | 
 0699-065 | 11.1.0 | neue obere Platine und neues Lötverfahren | 
 0699-072 | 11.1.0 | letzter Eintrag der vorliegenden Pro-Finder-Seriennummernliste | 

### SIM-Regeln nach Hardwaregeneration

Seriennummer | SIM-Format | PIN-Regel | 
 0699-001 bis 0699-007 | Mini-SIM | PIN 0000 , PIN-Abfrage aktiv | 
 0699-008 bis 0699-044 | Micro-SIM | PIN 0000 , PIN-Abfrage aktiv | 
 ab 0699-045 | Nano-SIM | PIN-Abfrage vollständig deaktivieren | 

Der Hardwarewechsel 0699-045 beendet die grundsätzliche Eignung von Prepaid-Karten nicht. Prepaid oder Vertrag, Guthaben-Abfragecode, SMS, Telefonie und Netzabdeckung sind getrennt zu prüfen. Aktuelle 2G-/3G-Verfügbarkeit immer für Land und Netzbetreiber verifizieren. Produktdetails stehen unter Pro-Finder — GSM/GPS Telemetriemodul .

## Bluetooth und NFC

### 1290-xxx — Bluetooth-Vernetzungsmodul

Ab Seriennummer | SW | Dokumentierte Relevanz | 
 1290-001 | V1.6 | Apple Watch unterstützt; Wear OS 2 und 3 noch nicht unterstützt | 
 1290-002 bis 1290-009 | V2.0 | Unterstützung von Wear OS 2 | 
 1290-010 | V2.1.0 | Unterstützung von Wear OS 3 und zweistufiger Anlernmodus | 
 1290-012 | V2.2.2 | kein CI-Bus; vereinfachte Neukopplung bei verlorener Kopplung | 
 1290-019 | V2.2.2 | letzter Eintrag der vorliegenden Seriennummernliste | 

Das Bluetooth-Vernetzungsmodul und BT-connect sind unterschiedliche Produktlinien. Bedien- und Kompatibilitätsangaben des Präfixes 1290- nicht auf 6000- übertragen. Siehe Bluetooth-Vernetzungsmodul — Smartphone-Steuerung via Bluetooth .

### 6000-xxx — BT-connect

Ab Seriennummer | SW | Dokumentierte Relevanz | 
 6000-001 | 1.0.2 | erste dokumentierte Serie | 
 6000-002 | 1.0.2 | letzter Eintrag der vorliegenden BT-connect-Seriennummernliste | 

Weitere Produktinformationen stehen unter BT-connect — Bluetooth-Modul für WiPro III .

### 5299-xxx — NFC Modul

Dokumentierter Bereich | Aussage | 
 5299-001 bis 5299-014 | Die Seriennummernliste dokumentiert die Folge des NFC Moduls; ein separater Softwarestand ist dort nicht ausgewiesen. | 

## Zubehör und Sensorik

Präfix | Produkt / Bereich | In der Quelle sichtbarer Bereich | Supporthinweis | 
 0001- | G.A.S.-pro | 001 bis 013 | Legacy-Linie; zusätzlich Alt-Schema SN40/SN50-xxxxx vor 2013 | 
 0061- | GBA-I | 001 bis 031 | Serienfolge ohne dokumentierte Softwaremeilensteine | 
 0104- | GBA-IC (Alarmausgang) | 002 bis 006 | kleine Legacy-Serie ohne eigene SW-Spalte | 
 0686- | GPS-pro | 001 bis 014 | ältere eigenständige Ortungslösung | 
 1012- | GSM/GPS-Kombimodul | ohne Suffix / 001 bis 003 | 1012-002 als empfohlene Version, 1012-003 als 2G-/3G-fähig markiert | 
 0756- | Funk- Handsender 868 | 001 bis 062 | Serienfolge ohne eigene SW-Spalte | 
 0759- | Funk-Gaswarner 868 | 002 bis 026 | 0759-003 ist in der Quelle mit einem Rückrufhinweis versehen | 
 0761- | Funk-Kabelschleife 868 | 001 bis 020 | ab 0761-008 WiPro-SW 3.4 oder höher dokumentiert | 
 0944- | Funk- Kabelschleife 868 XL | 001 bis 017 | ab 0944-004 WiPro-SW 3.4 oder höher dokumentiert | 
 1068- | Funk-Kabelschleife 868 schwarz | 001 bis 020 | ab 1068-003 WiPro-SW 3.4 oder höher dokumentiert | 
 1074- | Funk-Kabelschleife 868 XL schwarz | 001 bis 029 | ab 1074-003 WiPro-SW 3.4 oder höher dokumentiert | 
 0791- | Serienliste Funk-Magnetkontakt 868 | 001 bis 056 | Produktzuordnung vor einer Supportaussage am Typenschild oder Artikelregister bestätigen | 
 0089- | Back-up Sirene 12 V | 001 bis 012 | Serienfolge ohne eigene SW-Spalte | 
 0190- | Zusatzsirene 12 V | ohne regulären Suffix bis 012 | früher Altstand ohne regulären Suffix dokumentiert | 
 0734- | Back-up Sirene 24 V | ohne Suffix / 002 bis 008 | frühe Serie beginnt mit unsuffigiertem Altstand | 
 0095- | WiPro easy Sirene | 001 bis 004 | kleine Zubehörserie der WiPro-easy-Linie | 
 5339- | Zusatzhupe inklusive Relaissatz | 001 bis 014 | frühe Quellenzeilen enthalten den Tippfehler 5539- ; ab 003 ist 5339- konsistent | 
 5750- | G.A.S.-connect | 001 bis 006 | fahrzeugversorgter Funk-Gaswarner; keine CR2032-Batterie | 
 5753- | T.S.A. Funk-Rauchmelder weiß | 001 bis 007 | farbbezogene Serienlinie | 
 5754- | T.S.A. Funk-Rauchmelder grau | 001 bis 006 | farbbezogene Serienlinie | 
 1052- | safe.lock Umrüstplatine | 001 bis 019 | Software V1.0 bis 1.7 ; letzter Quelleneintrag nennt einen gelben Punkt auf der ESD-Tüte | 
 5237- | WiPro easy | 001 bis 004 | Software 1.0 bis 1.0.1 in der Quelle | 
 1286- | G.A.S.-pro III KW | 001 bis 046 | Software V1.2 bis 1.7.8 in der Quelle | 
 1287- | G.A.S.-pro III CO | bis 018 | frühester Datensatz unvollständig; dokumentierter Softwarezweig bis 1.7.8 | 

### G.A.S.-pro III — Funktionsschwelle

Ab Seriennummer | Funktion | 
 1286-010 / 1287-010 | automatisches Wiedereinschalten nach Rückkehr der Hauptversorgung, sofern das Gerät vor der Unterbrechung eingeschaltet war | 

Serienbereiche ohne SW-Spalte dienen vor allem der Produkt-, Varianten-, Alters- und Garantieeinordnung. Aus ihnen keine nicht dokumentierte Funktionskompatibilität ableiten. Details zum Gaswarngerät stehen unter G.A.S.-pro III — Gaswarner für Freizeitfahrzeuge .

## Legacy- und Sonderfälle

### 0001-xxx / Alt-Schema SN40/SN50 — G.A.S.-pro

Stand | Dokumentierte Relevanz | 
 SN40/SN50-xxxxx vor 2013 | Alt-Schema der Vor- und Frühserien; Geräte bis SN40-24000 benötigen bei einem Sensorfehler des normalen Sensors ein Softwareupdate | 
 0001-003 / 1.04i | in der Quelle als empfohlene Software bezeichnet; CO-Sensor-Erkennung ab 2017 dokumentiert | 
 0001-013 | letzter sichtbarer Eintrag der vorliegenden Seriennummernliste | 

### 1011-xxx — C.A.S. III

Ab Seriennummer | SW | Dokumentierte Relevanz | 
 1011-005 | CAS3.20 | Unterstützung des Funk-Wassermelders erstmals dokumentiert; Wasseralarm wird wie Gasalarm behandelt | 
 1011-007 | CAS3.21 | 2G-/3G-Hinweis ergänzt | 

Die Präfixe 0061- und 0104- liefern in den vorliegenden Listen vor allem eine Alters- und Garantieorientierung. Belastbare eigene Softwaremeilensteine sind dort nicht dokumentiert.

## Dokumentierte Funktionsschwellen

Funktion / Thema | Produkt | Mindeststand | 
 App-Grundfunktionen | WiPro III | 0823-018 | 
 App-Grundfunktionen | WiPro III safe.lock | 1050-004 | 
 Zentralverriegelung und Easy-Add 3.0 | WiPro III safe.lock / Ford-Set / Sprinter-Set | 1050-004 / 5298-001 / 5458-001 | 
 Kombifunktion „Verriegeln und Scharfschalten“ | WiPro III safe.lock | 1050-006 | 
 App-Grundfunktionen und Easy-Add 3.0 | Pro-Finder | 0699-013 | 
 Kombifunktion „Verriegeln und Scharfschalten“ | Pro-Finder | 0699-015 | 
 4G LTE und Nano-SIM | Pro-Finder | 0699-045 | 
 Funk-Wassermelder | WiPro III | 0823-021 / 6.8 | 
 Funk-Wassermelder | WiPro III safe.lock | 1050-004 / 6.7s | 
 Funk-Wassermelder | Ford-Set | 5298-001 / 7.4.0s | 
 Funk-Wassermelder | Sprinter-Set | 5458-001 / 1.0.5sx | 
 Ford Transit / Custom 2024+ safe.lock | Ford-Set | 5298-005 / 1.0.1sf | 
 Aussperrschutz-Korrektur Ford Transit 2019–2024 mit Pro-Finder | Ford-Set | 5298-008 / 1.0.3sf | 
 Mercedes Sprinter VS30 safe.lock-Upgrade | WiPro III | 0823-019 | 
 Mercedes Sprinter VS30 mit vier Schlüsseln | WiPro III | 0823-034 | 
 VW Crafter / MAN TGE 2025+ mit Startknopf | Sprinter-Set 105458 | kein aktuell öffentlich belegter Mindeststand; fahrzeugspezifische Freigabe erforderlich | 
 automatisches Wiedereinschalten | G.A.S.-pro III KW / CO | 1286-010 / 1287-010 | 

Funktionsdetails und zusätzliche Voraussetzungen stehen unter THITRONIK® App — Befehle, Einrichtung und Fehlerbehebung , WiPro III — Funk-Alarmsystem für Freizeitfahrzeuge und Fahrzeugkompatibilität — Übersichtsmatrix & DIP-Grundlagen .

## Supportprüfung und Eskalation

Produktbezeichnung und vollständige Seriennummer direkt vom Typenschild übernehmen.

Tatsächlichen Softwarestand aus App, Statusanzeige, Diagnose oder Serviceunterlagen separat erfassen.

Fahrzeug, Modelljahr, Schlüsselvariante und Einbauzustand ergänzen.

Gewünschte Funktion in der Tabelle „Dokumentierte Funktionsschwellen“ suchen.

Produkt- oder Fahrzeugseite auf weitere Voraussetzungen prüfen.

Bei widersprüchlicher Kennzeichnung, unleserlichem Typenschild oder sicherheitsrelevanter Abweichung nicht raten, sondern mit Foto und vollständigen Falldaten eskalieren.

Keine Kompatibilitätszusage allein anhand eines Ersatzwerts: In der App verwendbare Referenznummern für unbekannte Geräte identifizieren nur ein Auswahlprofil. Sie aktualisieren keine Hardware oder Software und schalten keine Funktion frei.

Bei Rückrufhinweisen, bekannten Aussperr-Risiken, unklarer Fahrzeugstilllegung oder einer Abweichung zwischen Seriennummer und angezeigtem Softwarestand ist eine Supportprüfung erforderlich.

## Querverweise

Artikelnummern-Register — Dokumentierte THITRONIK-Produkte und Zubehör 

WiPro III — Funk-Alarmsystem für Freizeitfahrzeuge 

Pro-Finder — GSM/GPS Telemetriemodul 

THITRONIK® App — Befehle, Einrichtung und Fehlerbehebung 

BT-connect — Bluetooth-Modul für WiPro III 

Bluetooth-Vernetzungsmodul — Smartphone-Steuerung via Bluetooth 

Funk-Wassermelder 868 — Kabelloser Wassermelder 

Fahrzeugkompatibilität — Übersichtsmatrix & DIP-Grundlagen
