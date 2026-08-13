---
title: CO-Sensor — Kohlenmonoxid-Zusatzsensor
sources:
  - 'https://www.thitronik.de/produkte/produkt/co-sensor-fuer-gas-pro/'
  - >-
    https://www.thitronik.de/fileadmin/user_upload/downloads/gaswarner/sonstiges/co_sensor-de_en_fr.pdf
  - >-
    https://www.thitronik.de/fileadmin/user_upload/downloads/gaswarner/anleitungen/handbuch_gas-pro_2.5.pdf
  - >-
    https://www.thitronik.de/fileadmin/user_upload/produkte/gas-pro-iii/technische_zusatzinformationen_gas-pro_iii.pdf
  - sources/CO-Sensor__100433__Overview_DE.md
  - sources/CO-Sensor__100433__Reference__Software_Seriennummern_DE.md
  - sources/handbuch_gas-pro_2.5.pdf
  - sources/technische_zusatzinformationen_gas-pro_iii.pdf
  - sources/Seriennummer 0433 CO-Sensor.csv
  - wiki/gas-pro.md
  - wiki/gas-pro-iii.md
  - wiki/stoerungsbeseitigung.md
updated: '2026-07-16'
confidence: high
lang: de
dealerStatus: approved
---

# CO-Sensor — Kohlenmonoxid-Zusatzsensor

**Art.-Nr. 100433 · Seriennummern-Präfix 0433-**

Der CO-Sensor erkennt **Kohlenmonoxid (CO)** und erweitert eine kompatible G.A.S.-pro oder G.A.S.-pro III um eine externe CO-Überwachung. CO ist ein farb- und geruchloses, giftiges Verbrennungsgas und darf nicht mit Kohlendioxid (CO₂) verwechselt werden.

> **Systemabhängiger Zusatzsensor:** Der CO-Sensor arbeitet nicht eigenständig. Alarmierung, Fehleranzeige und Versorgung erfolgen über das angeschlossene Hauptgerät.

---

## Technische Daten

| Parameter | Dokumentierter Wert |
|---|---|
| Artikelnummer | `100433` |
| Seriennummern-Präfix | `0433-` |
| Detektiertes Gas | Kohlenmonoxid (CO) |
| Stromaufnahme | ca. 6 mA |
| Abmessungen | ca. 71 × 49 × 19 mm |
| Gewicht | ca. 80 g |
| Anschlussleitung | 4 m laut aktueller Produktbeschreibung |
| Montagebohrung | Ø 12 mm |
| Empfohlener Temperaturbereich an G.A.S.-pro | 0 °C bis 50 °C |
| Lebensdauergrenze | individuelles „Exp. Date“ auf dem Typenschild maßgeblich |

Die technischen Werte des externen CO-Sensors dürfen nicht mit denen des integrierten CO-Sensors einer G.A.S.-pro III CO oder mit einem Flüssig-/KO-Gas-Zusatzsensor vermischt werden.

---

## Schnellcheck

- Produktidentität prüfen: **Art. 100433**, Seriennummern-Präfix **0433-**.
- Nur an eine dokumentiert kompatible G.A.S.-pro oder G.A.S.-pro III anschließen.
- Bei G.A.S.-pro **Aderendhülsen verwenden**.
- Bei G.A.S.-pro III **keine Aderendhülsen verwenden** und Leitungsenden nicht verzinnen.
- Beim Sensortyp `SNO433-003` an G.A.S.-pro mindestens Software **1.04i** sicherstellen.
- Sensor knapp unter der Decke montieren; die Montagezeichnung nennt **10–30 cm** Abstand.
- Bohrung **Ø 12 mm** ausführen und ungeeignete Kleb- oder Dichtstoffe vermeiden.
- Ablaufdatum **„Exp. Date“** am Sensor prüfen; abgelaufene Sensoren ersetzen lassen.
- CO-Sensor niemals mit Feuerzeuggas, Propan oder Butan testen.
- Anschlussarbeiten nur im spannungsfreien Zustand durchführen.

---

## Produktrolle und Funktionsgrenzen

| Funktion | Einordnung |
|---|---|
| Erkanntes Gas | Kohlenmonoxid (CO) |
| Eigenständiger Betrieb | nein; kompatibles Hauptgerät erforderlich |
| Akustische Alarmierung | über G.A.S.-pro beziehungsweise G.A.S.-pro III und deren angeschlossene Alarmgeber |
| Erkennung von Propan, Butan oder Narkosegasen | nein; dafür ist ein geeigneter Flüssig-/KO-Gassensor erforderlich |
| Rauch- oder Brandmelderersatz | nein; der Sensor erkennt CO, aber nicht sämtliche Brandkenngrößen |
| Fahrzeuglüftung oder Gefahrenbeseitigung | nein; der Sensor warnt nur und beseitigt die Ursache nicht |

Ein CO-Alarm ist als reale Gefahr zu behandeln. Personen und Tiere müssen in frische Luft gebracht, mögliche Verbrennungsquellen sicher außer Betrieb genommen und der Innenraum gelüftet werden. Das Fahrzeug erst wieder nutzen, wenn die Ursache fachlich geklärt ist.

---

## Kompatibilität der Hauptgeräte

| Hauptgerät | Kompatibilität | Besondere Anschlussregel |
|---|---|---|
| G.A.S.-pro | ja | Aderendhülsen verwenden; bei `SNO433-003` Softwarestand prüfen |
| G.A.S.-pro III | ja | keine Aderendhülsen verwenden; Leitungsenden nicht verzinnen |
| G.A.S.-pro III CO | ja, als externer Zusatzsensor | keine Aderendhülsen verwenden; die Systemauslegung für den zusätzlichen Überwachungsbereich prüfen |
| Andere Gaswarner | nicht aus diesen Unterlagen ableitbar | nur bei ausdrücklicher Freigabe des konkreten Hauptgeräts anschließen |

Die G.A.S.-pro kann laut Handbuch mit bis zu drei Sensoren betrieben werden. Die G.A.S.-pro III besitzt einen internen und einen externen Sensoreingang. Die zulässige Kombination und der geeignete Montageort hängen vom Hauptgerät, der Fahrzeugaufteilung und den zu überwachenden Bereichen ab.

---

## Sensortyp und Softwarestand der G.A.S.-pro

Der neuere Sensortyp **`SNO433-003`** erfordert an der G.A.S.-pro mindestens **Software 1.04i**:

| G.A.S.-pro-Serienstand | Maßnahme für `SNO433-003` |
|---|---|
| ab `0001-003` | Software 1.04i ist laut CO-Sensor-Anleitung automatisch vorhanden |
| `SN40-XXX` | Hauptgerät zum Softwareupdate einsenden |
| `SN0001-001` | Hauptgerät zum Softwareupdate einsenden |
| `SN0001-002` | Hauptgerät zum Softwareupdate einsenden |
| abweichender oder unklarer Stand | vollständige Seriennummer und Softwarestand durch Support prüfen lassen |

Die offizielle CO-Sensor-Anleitung schreibt **1.04i**. Eine verkürzte Schreibweise `1.4i` darf nicht als eigener oder abweichender Softwarestand behandelt werden. Weitere Produktgrenzen stehen unter [[Seriennummern und Softwarestände — Präfixe, Schwellen und Meilensteine]].

---

## Lieferumfang

- CO-Sensor für G.A.S.-pro und G.A.S.-pro III
- Anschlussleitung
- Montagematerial

Die aktuelle Produktbeschreibung nennt eine **4 m lange Anschlussleitung**. Bei Bestandsware den tatsächlichen Lieferumfang und die Leitungslänge vor der Montage prüfen.

---

## Leitungslänge und Quellenabweichung

Die verfügbaren offiziellen Angaben zur maximalen Gesamtlänge sind nicht einheitlich:

| Quelle | Angabe |
|---|---|
| aktuelle CO-Sensor-Produktbeschreibung | 4 m Anschlussleitung, verlängerbar auf 7 m |
| G.A.S.-pro-Handbuch 2.5 | Verlängerung auf maximal 7 m |
| allgemeine aktuelle Produkt-FAQ | Verlängerung auf insgesamt 8 m mit mindestens `3 × 0,14 mm²` |

Für eine konservative, produktspezifische Auslegung **maximal 7 m Gesamtlänge** verwenden. Eine größere Gesamtlänge nur übernehmen, wenn die aktuelle Anleitung des konkreten Hauptgeräts und der technische Support sie für die vorhandene Kombination bestätigen. Verlängerungen müssen elektrisch zuverlässig ausgeführt und mindestens mit gleichem Leiterquerschnitt hergestellt werden.

---

## Montageort planen

Kohlenmonoxid ist minimal leichter als Luft. Der CO-Sensor wird deshalb an einer senkrechten Fläche **knapp unter der Fahrzeugdecke** montiert. Die Montagezeichnung des Sensors nennt **10–30 cm** Abstand zur Decke.

- Überwachungsbereich und Schlafplätze berücksichtigen.
- Räumliche Trennungen durch Türen oder Vorhänge bei der Systemplanung beachten.
- Sensor nicht verdecken, überstreichen oder in einem geschlossenen Möbel montieren.
- Bereich mit freier Luftzirkulation wählen.
- Abstand zu Heizungsausströmern und anderen störenden Luftströmen halten.
- Nasszellen und Stellen mit Kondenswasser oder direkter Feuchtigkeit vermeiden.
- Ablaufdatum und Beschriftung nach der Montage ablesbar halten.
- Leitung ohne Zug, Scheuerstellen oder Quetschungen zum Hauptgerät führen.

Die deckennahe Position des CO-Sensors darf nicht auf Propan-/Butan- oder Narkosegassensoren übertragen werden; diese Gase erfordern eine andere Montagehöhe.

---

## Sensor montieren

1. Hauptgerät und betroffene Stromkreise spannungsfrei schalten.
2. Geeigneten deckennahen Montageort festlegen und Leitungsverlauf prüfen.
3. Bohrung mit **Ø 12 mm** herstellen.
4. Mitgelieferte Hülse entsprechend der Montagezeichnung von außen einsetzen.
5. Sensor von innen mit den vorgesehenen Schrauben befestigen.
6. Keine lösungsmittelhaltigen Klebstoffe oder silikonhaltigen Dichtmittel am Sensor verwenden.
7. Anschlussleitung geschützt und zugentlastet zum Hauptgerät verlegen.
8. Erst nach vollständiger Verdrahtung und Sichtkontrolle die Versorgung wiederherstellen.

Bohr- und Elektroarbeiten am Fahrzeug setzen geeignete Fachkenntnisse voraus. Vor dem Bohren verdeckte Leitungen, tragende Bereiche und die Außenseite kontrollieren.

---

## Anschluss an G.A.S.-pro

Bei der G.A.S.-pro gelten folgende Grundregeln:

- **Aderendhülsen verwenden.**
- Einen freien, dokumentierten Sensoreingang verwenden.
- Klemmenbezeichnungen und Anschlussplan des konkreten G.A.S.-pro-Stands beachten.
- Sensor nicht versehentlich um eine Klemmenposition versetzt anschließen; besonders die benachbarte Klemme `IGN` beachten.
- Bei `SNO433-003` vor Inbetriebnahme mindestens Software **1.04i** bestätigen.
- Die Kombination aus maximal drei angeschlossenen Sensoren dokumentieren.

Historisch dokumentierte Kabelfarben dienen nur als Prüfhilfe:

| Signal | Aktuelle Kabelfarbe | Alte Kabelfarbe |
|---|---|---|
| GND | weiß | schwarz |
| Ub | braun | braun |
| Sensor | grün | blau |

Klemmenbezeichnung und produktspezifischer Anschlussplan haben Vorrang vor der Kabelfarbe. Bei abweichenden Farben nicht nach Vermutung anschließen.

---

## Anschluss an G.A.S.-pro III

Bei der G.A.S.-pro III gelten andere Klemmenregeln als bei der älteren G.A.S.-pro:

- **Keine Aderendhülsen verwenden.**
- Leitungsenden **nicht verzinnen**.
- Zulässiger Leiterquerschnitt: **0,2–0,75 mm²**.
- Leitungsenden **7–9 mm** abisolieren.
- Federklemme nur mit leichtem Druck und einem geeigneten spitzen Gegenstand öffnen; maximal **1 kg** Betätigungskraft.
- CO-Sensor am dokumentierten externen Sensoreingang anschließen.
- Anschlussplan und Klemmenbeschriftung der konkreten Geräteversion beachten.

Die Anschlussregel „keine Aderendhülsen“ ist ausdrücklich produktspezifisch und darf nicht auf die G.A.S.-pro übertragen werden.

---

## Inbetriebnahme

1. Produkt, Hauptgerät, Softwarestand und Ablaufdatum kontrollieren.
2. Montagehöhe, Befestigung, Leitung und Klemmenbelegung prüfen.
3. Sicherstellen, dass keine Aderendhülsenregel zwischen den Hauptgeräten verwechselt wurde.
4. Versorgung des Hauptgeräts wiederherstellen.
5. Start- beziehungsweise Vorheizphase des Hauptgeräts vollständig abwarten.
6. Auf Sensorfehler, Dauerton oder abweichende Statusanzeige achten.
7. Alarmgeber und gegebenenfalls externe Systemanbindungen nach Anleitung des Hauptgeräts prüfen.
8. Artikelnummer, Sensorseriennummer, „Exp. Date“, Hauptgerät und Einbaudatum dokumentieren.

Ein fehlerfreier Start ersetzt weder die Kontrolle des Ablaufdatums noch die regelmäßige Funktionskontrolle des Gesamtsystems.

---

## Funktionstest und Alarmverhalten

| Prüfung / Ereignis | Sichere Einordnung |
|---|---|
| Test mit Feuerzeuggas | für den CO-Sensor ungeeignet und nicht durchführen |
| Test mit Propan oder Butan | ungeeignet und nicht durchführen |
| Prüfung mit Kohlenmonoxid | nur mit geeignetem, kontrolliertem Prüfverfahren durch Fachpersonal |
| CO-Alarm an G.A.S.-pro | Handbuch dokumentiert eine Ansteuerung der externen Sirene für 10 Sekunden |
| Ausgang `SIR+` an G.A.S.-pro III bei Standard-DIP-Stellung | technische Zusatzinformation dokumentiert bei CO `2 × 10 s` mit 12/24 V |

Die G.A.S.-pro-Anleitung verlangt keinen separaten Feuerzeuggas-Funktionstest für den CO-Sensor, weil dieser nur auf Kohlenmonoxid reagiert. Niemals Abgase, offene Flammen oder unkontrollierte Verbrennung zur Prüfung in das Fahrzeug einleiten.

---

## Ablaufdatum und Austausch

CO-Sensoren haben eine begrenzte Nutzungsdauer. Maßgeblich ist das auf dem Typenschild angegebene **„Exp. Date“**:

- Ablaufdatum bei Einbau und jeder Wartung ablesen.
- Sensor vor beziehungsweise spätestens bei Erreichen dieses Datums ersetzen lassen.
- Bei Sensorfehler nicht bis zum Ablaufdatum weiterbetreiben.
- Seriennummernbereiche wie `0433-001` bis `0433-007` können bei der Alterszuordnung helfen, ersetzen aber nicht die Prüfung des Typenschilds.
- Einen abgelaufenen, beschädigten oder chemisch belasteten Sensor nicht erneut verwenden.
- Austausch und gegebenenfalls Bewertung durch THITRONIK oder einen qualifizierten Fachbetrieb durchführen lassen.

Ein überschrittenes Ablaufdatum kann die zuverlässige CO-Erkennung beeinträchtigen. Das Fehlen einer Fehlermeldung ist kein Nachweis, dass ein abgelaufener Sensor noch sicher arbeitet.

---

## Sicherheit im Alarmfall

- Alarm nicht ignorieren und nicht als vermeintlichen Fehlalarm quittieren.
- Alle Personen und Tiere sofort in frische Luft bringen.
- Wenn gefahrlos möglich, Verbrennungsgeräte ausschalten und Türen beziehungsweise Fenster öffnen.
- Keine offene Flamme erzeugen und keine Ursache im belasteten Innenraum suchen.
- Bei Beschwerden oder Verdacht auf CO-Vergiftung den Rettungsdienst verständigen.
- Ursache durch qualifiziertes Fachpersonal klären lassen.
- Fahrzeug und Gasanlage erst nach Freigabe wieder benutzen.
- Sensor nach einem Ereignis auf Fehleranzeige, Beschädigung und Ablaufdatum prüfen lassen.

Kopfschmerzen, Schwindel, Übelkeit, Benommenheit und Bewusstseinsstörungen können Anzeichen einer CO-Vergiftung sein. Betroffene nicht allein lassen.

---

## Fehler systematisch eingrenzen

| Beobachtung | Sichere Prüfung / Maßnahme |
|---|---|
| Hauptgerät erkennt den Sensor nicht | Spannungsfreiheit herstellen; Klemmenbelegung, Leitung, Steck-/Klemmstellen und Hauptgerätekompatibilität prüfen |
| G.A.S.-pro piept nach der Installation dauerhaft | prüfen, ob alle Sensorleitungen versehentlich um eine Position in Richtung `IGN` versetzt angeschlossen wurden |
| `SNO433-003` funktioniert an älterer G.A.S.-pro nicht | Seriennummer und Software prüfen; bei `SN40-XXX`, `SN0001-001` oder `SN0001-002` Update durch Einsendung veranlassen |
| Sensorfehler nach Leitungsverlängerung | jede Verbindungsstelle, Querschnitt, Gesamtlänge und Übergangswiderstände kontrollieren |
| G.A.S.-pro III meldet Sensorfehler | Aderendhülsen oder verzinnte Enden ausschließen; Abisolierlänge und Federklemme prüfen |
| Alarm ohne erkennbare CO-Quelle | Personen zuerst sichern und lüften; mögliche Verbrennungsquellen fachlich prüfen, Sensor nicht vorschnell als fehlerhaft einstufen |
| Ablaufdatum überschritten | Sensor ersetzen lassen; nicht durch Reset oder erneutes Anklemmen weiterbetreiben |
| Seriennummer oder Sensortyp unklar | Typenschild fotografieren und vor Bestellung, Update oder Austausch durch Support zuordnen lassen |

Weitere sichere Diagnosewege stehen unter [[Störungsbeseitigung — Sichere Diagnose häufiger Probleme]].

---

## Angaben für den Support

Für eine technische Bewertung dokumentieren:

- Produktbezeichnung und Artikelnummer `100433`
- vollständige Sensorseriennummer mit Präfix `0433-`
- Sensortyp, insbesondere `SNO433-003`
- „Exp. Date“ auf dem Typenschild
- Hauptgerät: G.A.S.-pro, G.A.S.-pro III oder G.A.S.-pro III CO
- vollständige Seriennummer und Softwarestand des Hauptgeräts
- verwendeter Sensoreingang und weitere angeschlossene Sensoren
- Anschluss mit oder ohne Aderendhülsen
- Kabelfarben, Gesamtlänge, Querschnitt und vorhandene Verlängerungsstellen
- Montageort und Abstand zur Decke
- genaue Tonfolge, LED-Anzeige und Zeitpunkt des Fehlers oder Alarms
- bereits durchgeführte Prüfungen, ohne gefährliche Gastests

Die strukturierte Fallaufnahme ist unter [[Support-Fallaufnahme — Pflichtangaben und Eskalationsprüfung]] beschrieben.

---

## Querverweise

- [[G.A.S.-pro (ältere Serie) — Gas- und CO-Alarm]]
- [[G.A.S.-pro III — Gaswarner für Freizeitfahrzeuge]]
- [[Zusatzsensor G.A.S.-pro III — Externer Gassensor]]
- [[Seriennummern und Softwarestände — Präfixe, Schwellen und Meilensteine]]
- [[Störungsbeseitigung — Sichere Diagnose häufiger Probleme]]
- [[Support-Fallaufnahme — Pflichtangaben und Eskalationsprüfung]]
- [[Artikelnummern-Register — Produkte und Zubehör]]
- [[Glossar — Fachbegriffe im THITRONIK-System]]
- [[Systemüberblick — THITRONIK-Produktwelt]]
