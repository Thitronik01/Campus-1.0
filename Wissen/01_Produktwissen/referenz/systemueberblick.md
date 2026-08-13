---
title: Systemüberblick — THITRONIK-Produktwelt
sources:
  - sources/wipro_iii-installationsanleitung_1.8.pdf
  - sources/handbuch_gas-pro_2.5.pdf
  - sources/GAS-pro-III__QuickGuide__Overview_DE.md
  - sources/pro-finder_-_bedienungs-_und_montageanleitung_2.6_01.pdf
  - sources/pro_finder-kurzanleitung-international_sn-045.pdf
  - sources/BT-connect__Overview_DE.md
  - sources/nfc_modul-kurzanleitung.pdf
  - sources/thitronik_zugang_nur_zugang_v2.pdf
updated: '2026-07-13'
confidence: high
lang: de
dealerStatus: approved
---

# Systemüberblick — THITRONIK-Produktwelt

THITRONIK entwickelt Sicherheits- und Zugangslösungen für Freizeitfahrzeuge und Yachten. Die Produktfamilien lassen sich zu einem Gesamtsystem kombinieren, unterscheiden sich aber deutlich darin, ob sie eigenständig arbeiten oder eine WiPro III-Zentrale benötigen.

## Systembausteine und Abhängigkeiten

| Baustein | Aufgabe | Eigenständig nutzbar | Benötigt bzw. ergänzt |
|----------|---------|:--------------------:|------------------------|
| **WiPro III / WiPro III safe.lock** | Alarmzentrale und zentrale Auswertung | ja | Basis für Funk-Zubehör und mehrere Erweiterungsmodule |
| **Pro-Finder** | Alarmweiterleitung, Ortung und Mobilfunk-Fernsteuerung | ja | ergänzt eine WiPro III um Fernmelde- und Ortungsfunktionen |
| **BT-connect** | Lokale Bedienung über Bluetooth und THITRONIK® App | nein | WiPro III bzw. WiPro III safe.lock; Pro-Finder kann zusätzlich angeschlossen werden |
| **NFC Modul** | Bedienung mit KeyCard, KeyTag oder KeyStrap | nein | kompatible Alarmzentrale; Kommunikation zur Zentrale über 868 MHz |
| **G.A.S.-connect** | Funk-Gaswarnung ohne eigene Sirene | nein | WiPro III oder WiPro III safe.lock |
| **G.A.S.-pro III** | Gas- oder CO-Warnung mit eigener Sirene | ja | optionale Funkanbindung an WiPro III |
| **G.A.S. / G.A.S.-plug** | Eigenständige Gaswarnung | ja | keine WiPro-Verbindung |
| **Funk-Zubehör** | Überwachung, Bedienung und zusätzliche Melder | nein | wird an einer kompatiblen Alarmzentrale angelernt |

---

## Alarmzentrale — WiPro III / WiPro III safe.lock

Die **WiPro III-Zentrale** empfängt die Signale des 868-MHz-Funkzubehörs, wertet je nach Fahrzeug CAN-Bus- oder Innenlichtsignale aus und steuert die akustische und optische Alarmierung.

- Spannungsversorgung: 9–30 V DC
- Stromaufnahme im Ruhezustand: ca. 11 mA
- Empfangsfrequenz: 868,35 MHz
- Maximal anlernbare Sender: 100
- Schnittstellen: CAN-Bus und RJ11 für Pro-Finder
- Typische Alarmdauer: akustisch ca. 30 Sekunden, optisch über die Warnblinkanlage ca. 180 Sekunden

**WiPro III safe.lock** ergänzt die Alarmfunktionen um eine abgesicherte Schlüssel- und Zentralverriegelungssteuerung für unterstützte Fahrzeuge.

→ Details: [[WiPro III]]

---

## Gaswarnsysteme

| Produkt | Erkennung | Betriebsart / Anbindung |
|---------|-----------|-------------------------|
| **G.A.S.-pro III** | Propan, Butan und KO-/Narkosegase | eigenständig mit interner Sirene; optionale 868-MHz-Anbindung an WiPro III |
| **G.A.S.-pro III CO** | Kohlenmonoxid (CO) | eigenständig mit interner Sirene; optionale 868-MHz-Anbindung an WiPro III |
| **G.A.S.-pro** | Propan, Butan und KO-/Narkosegase; CO je nach Sensorbestückung | ältere kabelgebundene Serie |
| **G.A.S.** (Art.-Nr. 105700) | Propan, Butan und KO-/Narkosegase | eigenständig mit interner Sirene |
| **G.A.S.-connect** (Art.-Nr. 105750) | Propan, Butan und KO-/Narkosegase | 868-MHz-Funkzubehör für WiPro III; keine eigene Sirene |
| **G.A.S.-plug** (Art.-Nr. 100042) | Propan, Butan und KO-/Narkosegase | mobiles Standalone-Gerät für eine Fahrzeugsteckdose mit Dauerstrom |

> **Wichtig:** CO ist Kohlenmonoxid und nicht CO₂. Die Standardausführung der G.A.S.-pro III und die CO-Ausführung sind getrennte Geräte.

→ Details: [[GAS-pro III]], [[GAS-pro]], [[GAS]], [[GAS-connect]], [[GAS-plug]]

---

## Telemetrie und Fernsteuerung — Pro-Finder

Der Pro-Finder ist ein Mobilfunk- und Ortungsmodul. Er kann eigenständig eingesetzt oder mit einer WiPro III verbunden werden.

- Alarmweiterleitung per SMS an bis zu zehn Zielrufnummern
- GPS-Ortung und Geofencing
- Fernsteuerung einer verbundenen WiPro III per SMS oder Anruf
- Schalten externer Ausgänge
- „Kill“-Funktion in Verbindung mit einer fachgerecht installierten Abschalteinrichtung
- Unterschiedliche SIM- und Mobilfunktechnik vor und ab Seriennummer 045

**SIM-Grundregel:**

- vor SN 045: Micro-SIM, PIN 0000 und PIN-Abfrage aktiv
- ab SN 045: Nano-SIM und PIN-Abfrage deaktiviert
- Mailbox und Rufumleitungen deaktivieren

→ Details: [[Pro-Finder]], [[Mobilfunk & SIM-Karten]], [[Abschalteinrichtung]]

---

## Lokale Konnektivität

| Produkt | Funktion | Wichtige Abgrenzung |
|---------|----------|----------------------|
| **BT-connect** | Bedienung über Bluetooth mit der THITRONIK® App | ohne aktive Bluetooth-Verbindung keine Bedienung über BT-connect |
| **NFC Modul** | Bedienung mit KeyCard, KeyTag und KeyStrap | NFC dient der lokalen Identifikation; das Modul funkt anschließend zur Alarmzentrale |
| **Bluetooth-Vernetzungsmodul** | Vorgänger von BT-connect | Bestandsprodukt mit eigenen Kompatibilitäts- und Softwareständen |

→ Details: [[BT-connect]], [[NFC Modul]], [[Bluetooth-Vernetzungsmodul]]

---

## Zugang und Bedienung

| Zugangsweg | Einordnung | Typischer Einsatz |
|------------|------------|-------------------|
| Original-Fahrzeugschlüssel | fahrzeugseitige Bedienung über unterstützte CAN-Bus- oder Zentralverriegelungssignale | Alltagsbedienung bei kompatiblen Fahrzeugen |
| CampLock Fingerprint | biometrischer Türzugang | Hartal-Aufbautüren mit unterstützter Zentralverriegelung |
| Funk-Handsender 868 | unabhängige 868-MHz-Fernbedienung | Reservebedienung, weitere Nutzer und Panikalarm |
| NFC Modul mit KeyCard, KeyTag oder KeyStrap | lokaler NFC-Zugang | Bedienung direkt am Fahrzeug |
| BT-connect | lokaler Bluetooth-Zugang | Smartphone- und Smartwatch-Bedienung im Fahrzeugumfeld |
| Pro-Finder | Mobilfunk-Fernsteuerung | Fernabfrage, Fernschalten und Ortung |

> Scharfschalten und Verriegeln sowie Unscharfschalten und Entriegeln sind technisch unterschiedliche Vorgänge. Ob sie gemeinsam ausgeführt werden, hängt vom System und vom Fahrzeug ab.

→ Details: [[Zugangsmedien & Bedienung]]

---

## 868-MHz-Funkzubehör

| Produkt | Art.-Nr. | Verwendung | Energieversorgung |
|---------|----------|------------|--------------------|
| Funk-Magnetkontakt 868, schwarz | 100757 | Türen, Fenster und Klappen | CR2032 |
| Funk-Magnetkontakt 868, weiß | 100758 | Türen, Fenster und Klappen | CR2032 |
| Funk-Handsender 868 | 101064 | Scharf- und Unscharfschalten, Panikalarm | CR2032 |
| Funk-Kabelschleife 868 | 100761 | Absicherung beweglicher Gegenstände im Außenbereich | CR2032 |
| Funk-Kabelschleife 868 XL | 101074 | Absicherung größerer Gegenstände im Außenbereich | CR2032 |
| Funk-Rauchmelder T.S.A., weiß / grau | 105753 / 105754 | Brandfrüherkennung | fest verbaute CR123A-Langzeitbatterie |
| Funk-Wassermelder 868 | — | Erkennung von Wassereinbruch | CR2032 |
| G.A.S.-connect | 105750 | Funk-Gaswarnung über WiPro III | 12 / 24 V DC |

Die typische Funkreichweite beträgt unter Freifeldbedingungen bis zu 75 m. Im Fahrzeug können Metallflächen und der Montageort die Reichweite deutlich verringern.

→ Details: [[Funk-Magnetkontakt]], [[Funk-Kabelschleife]], [[Funk-Handsender]], [[Funk-Rauchmelder]], [[Funk-Wassermelder]], [[GAS-connect]]

---

## Sirenen und Hupen

| Produkt | Art.-Nr. | Funktion |
|---------|----------|----------|
| Back-up Sirene 12 V | 100089 | Sirene mit internem Akku und Sabotagefunktion bei aktivierter Back-up-Stellung |
| Back-up Sirene 24 V | 105267 | 24-V-Ausführung für entsprechende Fahrzeugplattformen |
| Zusatzsirene | 100190 | zusätzliche externe Sirene ohne eigenen Akku |
| Zusatzhupe | 105339 | zusätzlicher Fahrzeug-Signalgeber für Plattformen ohne nutzbare Hupenansteuerung im Alarmfall |

Sirene und Fahrzeughupe sind unterschiedliche Alarmgeber. Sie haben unterschiedliche Anschlüsse und dürfen in Einbauanweisungen nicht gleichgesetzt werden.

→ Details: [[Sirenen und Hupen]]

---

## Sicherheits-Sonderzubehör

| Produkt | Art.-Nr. | Anwendung |
|---------|----------|-----------|
| Abschalteinrichtung, einpolig | 101283 | Motorabschaltung über die Pro-Finder-„Kill“-Funktion |
| Abschalteinrichtung, mehrpolig | 105821 | fahrzeugspezifische Motorabschaltung über die Pro-Finder-„Kill“-Funktion |
| safe.lock Umrüstplatine | 101052 | codierte Schlüsselsteuerung für unterstützte Ducato-, Boxer-, Jumper- und Iveco-Daily-Modelle |

> Abschalteinrichtungen und Eingriffe in Fahrzeugelektrik oder Schlüssel dürfen ausschließlich anhand der passenden Einbauanleitung durch qualifizierte Fachbetriebe erfolgen.

→ Details: [[Abschalteinrichtung]], [[safe.lock Umrüstplatine]]

---

## Querverweise

- [[WiPro III]]
- [[GAS-pro III]]
- [[Pro-Finder]]
- [[Fahrzeugkompatibilität]]
- [[Anlernvorgang]]
- [[Zugangsmedien & Bedienung]]
