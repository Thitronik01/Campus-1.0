---
title: Abschalteinrichtung — Fahrzeugstilllegung über Pro-Finder
sources:
  - sources/Abschalteinrichtung_einpolig.pdf
  - sources/Abschalteinrichtung_mehrpolig.pdf
  - sources/Abschalteinrichtung_einpolig__Overview_DE.md
  - sources/Abschalteinrichtung_mehrpolig__Overview_DE.md
  - sources/Abschaltrelais.docx
updated: '2026-07-14'
confidence: high
lang: de
dealerStatus: approved
---

# Abschalteinrichtung — Fahrzeugstilllegung über Pro-Finder

| Variante | Art.-Nr. | Stromversorgung | Schaltstrom |
|----------|----------|------------------|-------------|
| Einpolig | 101283 | 12 V DC | 40 A |
| Mehrpolig | 105821 | 12 V DC | 1 A |

Die Abschalteinrichtung wird an **Ausgang A** des [[Pro-Finder]] angeschlossen. Über die Kill-Funktion kann sie den Zündstrom unterbrechen und dadurch ein Fahrzeug aus der Ferne stilllegen.

> **Abgrenzung:** Die Abschalteinrichtung ist ein Notfallsystem für den Alarmfall. Sie kann vorübergehend als Wegfahrsperre genutzt werden, ist jedoch nicht für den Dauerbetrieb vorgesehen. Die fahrzeugabhängige Zugangs- und Zentralverriegelungslogik von WiPro III safe.lock ist eine andere Funktion.

---

## Funktionsweise der Kill-Funktion

1. Den Befehl `kill` an den Pro-Finder senden, vorzugsweise über die THITRONIK® App.
2. Der Pro-Finder wartet, bis die per GPS ermittelte Geschwindigkeit **mindestens 5 Sekunden durchgehend 0 km/h** beträgt.
3. Der Pro-Finder schaltet **Ausgang A** ein.
4. Ausgang A steuert die Abschalteinrichtung an. Diese unterbricht den Zündstrom; ein laufender Motor wird abgeschaltet und ein bereits stehendes Fahrzeug bleibt stillgelegt.
5. Beim Abschalten sendet der Pro-Finder eine Status-SMS. Sie meldet den eingeschalteten Ausgang A und enthält die aktuelle Fahrzeugposition zum Zeitpunkt der Abschaltung.

> ⚠️ **WARNUNG — ausschließlich `kill` verwenden:** Niemals den Befehl `a an` verwenden. Er schaltet Ausgang A unmittelbar und ohne Geschwindigkeitsprüfung ein. Dadurch könnte die Zündung während der Fahrt unterbrochen werden. Das wäre ein gefährlicher Eingriff in den Straßenverkehr.

Die Stilllegung ist nur für den Alarmfall und für Zeiträume von **maximal drei Tagen** vorgesehen.

---

## Einbau und Sicherheit

Die Einbauanleitungen richten sich an professionelle Servicebetriebe. Arbeiten an Fahrzeugelektrik und -elektronik setzen entsprechende Fachkenntnisse voraus und müssen von einer qualifizierten Fachwerkstatt ausgeführt werden.

- Die Abschalteinrichtung wird in eine fahrzeugspezifische Zündleitung oder in die Ansteuerung der Kraftstoffpumpe eingeschleift.
- Unsachgemäße Arbeiten können elektronische Systeme, Airbag-Funktionen und die Verkehrssicherheit beeinträchtigen.
- Die Anschlussarbeiten müssen so ausgeführt werden, dass keine Fehlfunktionen oder Gefahren entstehen.
- Die Einbauhinweise der [[WiPro III]] beziehungsweise WiPro III safe.lock bleiben verbindlich.
- Ungenutzte Ein- und Ausgänge müssen isoliert werden.
- Weicht das Fahrzeug von den dokumentierten Gegebenheiten ab, ist vor dem Anschluss der Hersteller oder der technische Support zu kontaktieren.

Thitronik GmbH haftet nicht für Sach- oder Personenschäden infolge unsachgemäßer, falscher oder unvollständiger Installation. Auch für die Nutzung der Fernabschaltung und daraus entstehende Folgen wird keine Haftung übernommen.

---

## Anschluss — einpolige Abschalteinrichtung (101283)

| Relais-Pin | Kabelfarbe | Funktion |
|------------|------------|----------|
| 30 | blau | Lastkontakt; Anschluss an die durchtrennte Fahrzeugleitung |
| 87A | schwarz | Ruhekontakt (NC); Anschluss an die durchtrennte Fahrzeugleitung |
| 86 | gelb | Steuereingang; Verbindung mit dem gelben Kabel von Pro-Finder Ausgang A |
| 85 | schwarz, 0,5 mm², Ringöse | Masse |
| 87 | nicht belegt | Arbeitskontakt (NO); nicht anschließen |

Die zu unterbrechende Fahrzeugleitung wird durchtrennt und über die Pins 30 und 87A geführt. Die genaue Leitung und der Einbauort ergeben sich aus der fahrzeugspezifischen Einbauanleitung.

---

## Anschluss — mehrpolige Abschalteinrichtung (105821)

| Kabelfarbe | Anzahl | Anschluss |
|------------|--------|-----------|
| gelb | 1 | Gelbes Kabel von Pro-Finder Ausgang A |
| schwarz | 1 | Masse (−) |
| grün | 2 | Fahrzeugleitungen gemäß fahrzeugspezifischer Einbauanleitung |
| blau | 2 | Fahrzeugleitungen gemäß fahrzeugspezifischer Einbauanleitung |

Die mehrpolige Variante schaltet mehrere Fahrzeugleitungen. Ihre konkrete Belegung ist fahrzeugabhängig und darf ausschließlich nach der passenden Einbauanleitung ausgeführt werden.

> Detaillierte fahrzeugspezifische Einbauanleitungen stehen im Händlerbereich auf `www.thitronik.de` bereit.

---

## Fahrzeugspezifische Leitungen und Einbauorte

Die folgende Übersicht dient nur zur Orientierung. Maßgeblich ist immer die aktuelle fahrzeugspezifische Einbauanleitung.

| Fahrzeug | Modell / Baujahr | Kabelfarbe | Einbauort / Hinweis |
|----------|------------------|------------|---------------------|
| Fiat / Citroën / Peugeot | Ducato / Jumper / Boxer bis 2006 | orange/schwarz | — |
| Fiat / Citroën / Peugeot | Ducato / Jumper / Boxer 2007–2011 | weiß/orange oder orange/weiß | — |
| Fiat / Citroën / Peugeot | Ducato / Jumper / Boxer ab 2012 | weiß/schwarz | — |
| Ford | Transit 2014–2016 | braun/gelb | Grauer Stecker |
| Ford | Transit ab 2016 | orange/weiß oder braun/gelb | Gleiche Farbe wie Zündungsplus der WiPro |
| Ford | Transit ab 2022 | weiß/orange | — |
| Mercedes-Benz | Sprinter NCV3 2006–2018 | schwarz/weiß | Rückseite des Sicherungskastens, Stecker H3, Pin 5 |
| Mercedes-Benz | Sprinter VS30 ab 2018 | schwarz/weiß | Rückseite des Steuergeräts, Stecker H3, Pin 5 |
| Volkswagen | T6 2015–2019 | schwarz/blau | Querschnitt 2,5 mm² |
| Volkswagen | T6.1 ab 2019 | braun/rot | — |
| Volkswagen / MAN | Crafter II / TGE ab 2017 | grau/rot | Sicherungshalter, Pin 91 |
| Renault | Master ab 2010 | gelb | Zündungsstufe 1; rot = Dauerplus, naturfarben = Anlasser |
| Iveco | Daily ab 2014 | grün | Einbauanleitung im Händlerbereich beachten |

---

## Kill-Schaltfläche in der THITRONIK® App einrichten

Diese Einstellung ist nicht Bestandteil der geführten Ersteinrichtung.

1. Auf dem Startbildschirm die drei Punkte antippen und **„Fahrzeugeinstellungen“** wählen.
2. Bis zum Bereich **„Schaltflächen“** scrollen und **„Ausgang A“** auswählen.
3. Das Stiftsymbol antippen.
4. **„Abschalteinrichtung angeschlossen“** aktivieren. Die erforderlichen Daten werden automatisch eingetragen.
5. **„Bereit“** antippen, um die Einstellung zu übernehmen.
6. **„Fahrzeug speichern“** antippen. Danach erscheint die Kill-Schaltfläche auf dem Startbildschirm.

---

## Fahrzeug stilllegen und reaktivieren

### Fahrzeug stilllegen

1. Nach einer SMS- oder Push-Meldung „Diebstahl“ die THITRONIK® App öffnen.
2. Das **STOP-Symbol** antippen.
3. **„Fahrzeug stilllegen“** wählen.
4. Den vorbereiteten Befehl `kill` senden.

### Fahrzeug reaktivieren

1. In der App das **STOP-Symbol** antippen.
2. **„Fahrzeug reaktivieren“** wählen.
3. Den vorbereiteten Befehl `a aus` senden. Dadurch wird Ausgang A ausgeschaltet und die Stilllegung aufgehoben.
4. Das Schalten des Relais kann im Fahrzeug als Klicken hörbar sein.

> **Stromverbrauch:** Bei eingeschaltetem Ausgang A und aktivierter Abschalteinrichtung steigt der Stromverbrauch deutlich. Eine länger anhaltende Stilllegung kann die Starterbatterie so weit entladen, dass das Fahrzeug nicht mehr gestartet werden kann. Das Fahrzeug daher so bald wie möglich reaktivieren und die Höchstdauer von drei Tagen nicht überschreiten.

---

## Fehlerbehebung nach der Stilllegung

Nach dem Stilllegen und Reaktivieren können je nach Fahrzeugausstattung Meldungen im Kombiinstrument erscheinen. Falls die fahrzeugspezifische Einbauanleitung keine andere Vorgehensweise vorgibt:

1. Zündung einschalten.
2. Motor starten.
3. Motor einige Minuten laufen lassen.
4. Motor ausschalten.
5. 15 Sekunden warten.
6. Die Schritte 1 bis 5 insgesamt **fünfmal** durchführen.

Bleiben Fehlermeldungen bestehen oder verhält sich das Fahrzeug unerwartet, nicht weiterfahren und einen qualifizierten Fachbetrieb beziehungsweise den technischen Support kontaktieren.

---

## Querverweise

- [[Pro-Finder]]
- [[WiPro III]]
- [[Systemüberblick]]
