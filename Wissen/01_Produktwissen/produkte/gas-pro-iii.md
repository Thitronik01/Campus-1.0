---
title: G.A.S.-pro III — Gaswarner für Freizeitfahrzeuge
sources:
  - 'https://www.thitronik.de/produkte/produkt/gas-pro-iii/'
  - >-
    https://www.thitronik.de/fileadmin/user_upload/downloads/gaswarner/anleitungen/gas_pro_iii-kurzanleitung.pdf
  - >-
    https://www.thitronik.de/fileadmin/user_upload/downloads/gaswarner/anleitungen/gas_pro_iii_co-kurzanleitung.pdf
  - >-
    https://www.thitronik.de/fileadmin/user_upload/produkte/gas-pro-iii/technische_zusatzinformationen_gas-pro_iii.pdf
  - 'https://www.thitronik.de/recall/'
  - 'https://www.thitronik.de/produkte/produkt/zusatzsensor-fuer-gas-pro-iii/'
  - sources/GAS-pro-III__QuickGuide__Overview_DE.md
  - sources/technische_zusatzinformationen_gas-pro_iii.pdf
  - sources/zusatzsensor_gas-pro_iii_de_en_fr.pdf
  - sources/GAS-pro-III-CO__QuickGuide__Overview_DE.md
  - sources/Fragen zu G.A.S.-pro III.pdf
  - sources/Gaswarner.docx
updated: '2026-07-17'
confidence: high
lang: de
dealerStatus: approved
---

# G.A.S.-pro III — Gaswarner für Freizeitfahrzeuge

**Artikelnummer G.A.S.-pro III:** `101286`  
**Artikelnummer G.A.S.-pro III CO:** `101287`  
**Artikelnummer externer Gassensor:** `101289`

G.A.S.-pro III ist ein modularer Gaswarner für den Festeinbau in Freizeitfahrzeugen und Yachten. Das Hauptgerät enthält eine Sirene, eine Funkschnittstelle und genau einen integrierten Sensor. Es wird in zwei getrennten Ausführungen angeboten: Die G.A.S.-pro III überwacht Propan, Butan und KO-/Narkosegase; die G.A.S.-pro III CO überwacht Kohlenmonoxid. Beide Ausführungen besitzen einen Eingang für einen geeigneten externen Gas- oder CO-Sensor.

> [!WARNING]
> Die beiden Hauptgerätevarianten sind nicht gleichbedeutend. Eine G.A.S.-pro III mit integriertem Flüssiggas-/KO-Gassensor erkennt ohne externen CO-Sensor kein Kohlenmonoxid. Eine G.A.S.-pro III CO erkennt ohne externen Gassensor kein Propan, Butan oder KO-/Narkosegas. Typenschild, Artikelnummer, Montagehöhe und Sensorbestückung vor Inbetriebnahme eindeutig prüfen.

## Technische Daten

| Parameter | G.A.S.-pro III | G.A.S.-pro III CO |
|---|---:|---:|
| Artikelnummer | `101286` | `101287` |
| Versorgung | 12/24 V DC | 12/24 V DC |
| Stromaufnahme laut Produktseite | 26 mA | 9 mA |
| Sensoreingänge | 1 intern, 1 extern | 1 intern, 1 extern |
| Empfindlichkeitsangabe der Produktseite | 700 ppm Butan | 50 ppm CO |
| interne Sirene | 94 dB | 94 dB |
| maximaler Temperaturbereich | −20 °C bis +60 °C | −20 °C bis +60 °C |
| Betriebsfeuchte laut Kurzanleitung | 0–90 % r. F., nicht kondensierend | 0–90 % r. F., nicht kondensierend |
| Abmessungen (B × H × T) | 61 × 97 × 35 mm | 61 × 97 × 35 mm |
| Gewicht | ca. 74 g | ca. 74 g |
| Zulassung | nach ECE-R10 | nach ECE-R10 |

Die Kurzanleitung nennt für den positiv schaltenden Ausgang maximal 0,50 A bei 12 V beziehungsweise 0,25 A bei 24 V. Angeschlossene Lasten, Sicherung, Leitungsquerschnitt und Ausgangslogik müssen zur konkreten DIP-Konfiguration passen. Keine Last direkt anschließen, wenn deren Einschalt- oder Dauerstrom den freigegebenen Ausgangswert überschreitet.

## Schnellcheck

| Frage | Antwort |
|---|---|
| Eigenständiger Betrieb möglich? | Ja, mit integrierter Sirene |
| Versorgung | dauerhaft 12/24 V DC |
| Integrierter Sensor | variantenabhängig Gas oder CO |
| Externer Sensoreingang | 1 |
| Einbindung in THITRONIK-Alarmsysteme | per Funk; konkrete Kompatibilität und Anlernablauf prüfen |
| Interne Sirene | 94 dB |
| G.A.S.-pro III montieren | senkrecht, etwa 10–20 cm über dem Boden |
| G.A.S.-pro III CO montieren | senkrecht, etwa 10–20 cm unter der Decke |
| Zusatzsensorkabel | konservativ höchstens 7 m Gesamtlänge |
| Aderendhülsen | an den Anschlussklemmen nicht verwenden |
| Anwender-Funktionstest mit Prüfgas | nicht vorgesehen; kein Feuerzeuggas verwenden |

## Produktvarianten und Abgrenzung

| Ausführung | Integrierter Sensor | Hauptgeräte-Art.-Nr. | Sinnvolle Ergänzung |
|---|---|---|---|
| **G.A.S.-pro III** | Propan, Butan und KO-/Narkosegase | `101286` | externer CO-Sensor oder weiterer Gassensor |
| **G.A.S.-pro III CO** | Kohlenmonoxid | `101287` | externer Gassensor oder weiterer CO-Sensor |

Die Artikelnummern stammen von der aktuellen offiziellen Produktseite. Seriennummern wie `1286-…` oder `1287-…` sind keine Bestellnummern. Bei einem vorhandenen Gerät die Ausführung nicht allein aus der Einbauhöhe ableiten, sondern Typenschild und Artikelnummer kontrollieren.

| Produkt | Rolle | Wesentlicher Unterschied |
|---|---|---|
| **G.A.S.-pro III / G.A.S.-pro III CO** | eigenständiger, erweiterbarer Gaswarner | integrierter Sensor, eigene Sirene, Funk und ein externer Sensoreingang |
| [[G.A.S.-pro (ältere Serie) — Gas- und CO-Alarm]] | modulares System der älteren Serie | Zentrale ohne integrierten Gassensor; andere Sensor-, Anschluss- und Testregeln |
| [[G.A.S.-connect — Funk-Gaswarner für WiPro III]] | Funk-Zusatzmodul für WiPro III | keine eigene Sirene und kein Standalone-Betrieb |
| [[G.A.S.-plug „all in one" — Mobiler Gaswarner]] | mobiler Standalone-Gaswarner | Steckdosenbetrieb; keine externen Sensoren |

## Erkannte Stoffe und Systemgrenzen

| Stoff oder Ereignis | G.A.S.-pro III | G.A.S.-pro III CO |
|---|---:|---:|
| Propan | ja | nur mit geeignetem externem Gassensor |
| Butan | ja | nur mit geeignetem externem Gassensor |
| KO-/Narkosegase | ja | nur mit geeignetem externem Gassensor |
| Kohlenmonoxid (CO) | nur mit geeignetem externem CO-Sensor | ja |
| Kohlendioxid (CO₂) | nein dokumentiert | nein dokumentiert |
| Rauch oder Hitze | nein | nein |
| Sauerstoffmangel | nein | nein |

Das Flüssiggas-/KO-Gas-Hauptgerät besitzt laut Produktseite einen Feuchtigkeitssensor zur Messwertoptimierung und einen Alkoholfilter zur Verringerung alkoholbedingter Fehlalarme. Das bedeutet nicht, dass jede Fremdstoffeinwirkung ausgeschlossen ist. Einen Alarm zuerst als reales Gasereignis behandeln und die Ursache erst aus sicherer Umgebung klären.

## Aufbau und Schnittstellen

- integrierte Sirene
- eine Status-LED für den internen Sensor
- eine Status-LED für einen gegebenenfalls angeschlossenen externen Sensor
- Eingang für einen externen Gas- oder CO-Sensor
- Funkschnittstelle für kompatible THITRONIK-Alarmsysteme
- Ausgang `SIR+` für eine externe Sirene oder eine konfigurierte Alarmfunktion
- vorbereiteter optionaler CI-BUS-Anschluss
- Eingang `IGN` für die zündungsabhängige Stummschaltung
- automatischer Sensorselbsttest

Die Kurzanleitungen nennen WiPro III, WiPro III safe.lock und C.A.S. III als Funkpartner. Ob ein konkretes Alarmsystem, Softwarestand oder Zubehör zusammenpasst, anhand der jeweiligen Geräteunterlagen prüfen; nicht allein von der Produktfamilie ableiten.

## Lieferumfang

Zum dokumentierten Lieferumfang gehören:

- G.A.S.-pro III beziehungsweise G.A.S.-pro III CO mit integrierter Sirene und passendem integrierten Sensor
- Anschlussleitung
- Schrauben beziehungsweise Montagematerial
- Warnaufkleber
- Kurzanleitung
- Sicherungshalter mit 3-A-Sicherung laut Kurzanleitung

Ein externer Zusatzsensor, ein externer CO-Sensor und eine externe Sirene sind optionales Zubehör. Bei gebrauchten oder bereits eingebauten Anlagen Lieferumfang, Sicherung und Sensorbestückung vollständig prüfen.

## Quellenabweichungen

| Thema | Produktspezifische Anleitung | Aktuelle allgemeine Produkt-FAQ | Verwendung in diesem Artikel |
|---|---|---|---|
| Montagehöhe Gassensor | etwa 10–20 cm über dem Boden | etwa 10–30 cm über dem Boden | 10–20 cm |
| Montagehöhe CO-Sensor | etwa 10–20 cm unter der Decke | möglichst hoch beziehungsweise deckennah | 10–20 cm unter der Decke |
| Zusatzsensorkabel | höchstens 7 m Gesamtlänge | bis 8 m Gesamtlänge | konservativ höchstens 7 m |

Die produktspezifischen Kurzanleitungen und die aktuelle technische Zusatzinformation sind für Montage und Anschluss vorrangig. Eine abweichende größere Höhe oder Kabellänge nur verwenden, wenn sie für die konkrete Geräte-/Sensorkombination durch aktuelle Unterlagen oder THITRONIK bestätigt ist.

Auch zur Geräteorientierung besteht eine Dokumentabweichung: Die Kurzanleitung der G.A.S.-pro III zeigt den EIN/AUS-Schalter nach unten, die CO-Kurzanleitung nach oben; die neuere gemeinsame Zusatzinformation nennt dagegen allgemein „nach unten“. Deshalb keine Ausrichtung von der anderen Variante übertragen. Bohrschablone, Gerätekennzeichnung und die zum konkreten Gerät gehörende Anleitung abgleichen und eine Unklarheit vor der Montage mit THITRONIK klären.

## Montageplanung

| Sensor / Situation | Vorgabe oder Empfehlung |
|---|---|
| G.A.S.-pro III | senkrechte Fläche, etwa 10–20 cm über dem Boden |
| G.A.S.-pro III CO | senkrechte Fläche, etwa 10–20 cm unter der Decke |
| Schrank | Hauptgerät nicht im Schrank montieren |
| Heizungsausströmer | Gerät und Zusatzsensor nicht direkt gegenüber montieren |
| Batterien und Nasszelle | mindestens 1 m Sicherheitsabstand |
| Fahrzeug unter 6,5 m Innenlänge ohne räumliche Trennung | ein passend platzierter Hauptsensor kann nach Herstellerbeispiel ausreichen |
| Fahrzeug über 6,5 m Innenlänge | zusätzlichen passenden Sensor vorsehen |
| Schiebetür, Vorhang oder getrennte Bereiche | zusätzlichen Detektionspunkt auf der anderen Seite vorsehen |

Die Einbauposition richtet sich nach dem zu erkennenden Gas, nicht nach der bequemsten Leitungsführung. Ein tief montierter Gassensor ersetzt keinen deckennahen CO-Sensor; ein deckennaher CO-Sensor ersetzt keinen Gassensor. Sensoröffnungen frei halten und das Gerät nicht verdecken, lackieren oder mit Reinigungsmitteln besprühen.

## Montage des Hauptgeräts

1. Konkrete Ausführung anhand des Typenschilds feststellen.
2. Fahrzeuganlage spannungsfrei schalten und eine dauerhaft versorgte 12-/24-V-Quelle mit passender Absicherung wählen.
3. Zur Ausführung passende Bohrschablone verwenden: Bohrschablone 1 für G.A.S.-pro III, Bohrschablone 2 für G.A.S.-pro III CO.
4. Wandhalterung lösen und an einer senkrechten Fläche im vorgegebenen Abstand zu Boden oder Decke rechtwinklig befestigen.
5. Leitungen geschützt führen und genügend Kabelreserve für eine spätere Demontage lassen.
6. Elektrischen Anschluss nach Klemmenbeschriftung und konkretem Anschlussbild herstellen.
7. Gerät auf die Halterung drücken, bis es sicher einrastet.
8. Geräteorientierung mit der zur Ausführung gehörenden Anleitung und Kennzeichnung kontrollieren.

Die Wandhalterung wird laut Anleitung gelöst, indem mit einem geeigneten spitzen Gegenstand von beiden Seiten leicht in die Gehäuseöffnungen gedrückt wird. Dabei Gehäuse, Leiter und Sensoröffnungen nicht beschädigen.

## Elektrischer Anschluss

Alle Anschlussarbeiten im spannungsfreien Zustand ausführen. Klemmenbeschriftung und Anschlussbild des konkreten Geräts haben Vorrang vor allgemeinen Kabelfarben.

| Klemme | Funktion |
|---|---|
| `12/24V` | positive dauerhafte Versorgung |
| `GND` | Masse |
| `SIR+` | konfigurierbarer Sirenen-/Alarmausgang |
| `CI-BUS` | optionaler Busanschluss |
| externer Sensor | ein geeigneter Gas- oder CO-Zusatzsensor |
| `IGN` | Zündung beziehungsweise Klemme 15 zur Stummschaltung |

Für die federnden Anschlussklemmen gilt:

- zulässiger Leiterquerschnitt 0,2–0,75 mm²
- mitgelieferte Leitung 0,5 mm²
- Abisolierlänge 7–9 mm
- Leitungsenden nicht verzinnen
- keine Aderendhülsen verwenden
- Klemme mit geeignetem spitzen Gegenstand und höchstens etwa 1 kg Druck öffnen

Zugentlastung und Berührungsschutz sicherstellen. Keine Klemme unter Spannung öffnen, keine Sicherung überbrücken und den Ausgang `SIR+` nicht probeweise kurzschließen.

## DIP-Schalter

Die acht DIP-Schalter befinden sich auf der Rückseite. Einstellungen nur spannungsfrei und nach Dokumentation der Ausgangslage ändern.

| DIP | OFF | ON |
|---:|---|---|
| 1 | volle Lautstärke | reduzierte Lautstärke |
| 2 | grün pulsierende LEDs im Normalbetrieb | konstant grüne, gedimmte LEDs im Normalbetrieb |
| 3 | `SIR+`: Gasalarm 30 s, CO-Alarm 2 × 10 s mit Versorgungsspannung | `SIR+`: Versorgungsspannung während der gesamten Alarmdauer, etwa für freigegebene Vibrationsmatte, Blitzlicht oder Lüfter |
| 4 | Ausgangsverhalten gemäß DIP 3 | invertierter Ausgang: Versorgungsspannung im Ruhezustand, 0 V während der gesamten Alarmdauer; für eine geeignete Ventilsteuerung |
| 5 | Warnung vor Propan, Butan und Narkosegasen bei geringen Konzentrationen; Standard | Warnung nach DIN EN 50194-1 und DIN EN 50194-2 |
| 6 | nicht verwendet | nicht verwendet |
| 7 | nicht verwendet | nicht verwendet |
| 8 | nicht verwendet | nicht verwendet |

DIP 5 betrifft die Flüssiggas-/KO-Gas-Auswertung, nicht die CO-Detektion. Eine reduzierte Lautstärke, Stummschaltung oder geänderte Ausgangslogik darf nicht dazu führen, dass ein Alarm im Schlaf- und Aufenthaltsbereich unbemerkt bleibt. Ventile, Lüfter oder andere Aktoren nur nach fachgerechter Systemauslegung anschließen.

## Einschalten, Ausschalten und Vorheizphase

| Bedienung | Ablauf |
|---|---|
| Einschalten | Taster gedrückt halten, bis eine steigende Tonfolge ertönt und die LEDs nach einigen Sekunden leuchten |
| Ausschalten | Taster gedrückt halten, bis eine fallende Tonfolge ertönt und die LEDs erlöschen |
| Pause starten | Taster kurz drücken |
| Alarm akustisch quittieren | Taster während eines Alarms kurz drücken; Sicherheitsregeln und CO-Vorrang beachten |

Nach dem Einschalten folgt eine etwa vierminütige Vorheizphase. Währenddessen pulsiert die Anzeige blau. Erst der grüne Normalzustand bestätigt die dokumentierte Betriebsbereitschaft. Nach jeder Spannungsunterbrechung, Wartung oder Änderung die vollständige Startphase abwarten.

## LED- und Warnzustände

Das Gerät besitzt getrennte LEDs für internen und externen Sensor. Dadurch lässt sich erkennen, welcher Sensor einen Fehler oder Alarm meldet.

| Zustand | Optische Anzeige | Akustische beziehungsweise weitere Meldung |
|---|---|---|
| Einschaltphase | rot, grün, danach kurz blaues Dauerlicht | steigende Tonfolge beim Einschalten |
| Vorheizphase | etwa 4 Minuten blau pulsierend | noch keine bestätigte Betriebsbereitschaft |
| Normalbetrieb, DIP 2 OFF | hellgrün pulsierend | kein Alarm |
| Normalbetrieb, DIP 2 ON | konstant grün, gedimmt | kein Alarm |
| Gas- oder CO-Alarm | betroffene LED schnell rot blitzend und verblassend | interne Sirene; je nach Zustand Funk und `SIR+` |
| Sensorfehler | betroffene Sensor-LED blinkt gelb | ein Ton pro Sekunde |
| Unterspannung | beide LEDs pulsieren gelb | innerhalb einer Minute dreimal drei Töne; danach Abschaltung |
| Übertemperatur | beide LEDs wiederholt rot, grün, magenta, blau, gelb und türkis | auf- und abschwellender Dauerton |
| Ausschalten | blau, grün, rot; danach aus | fallende Tonfolge |

LED-Farben immer zusammen mit Tonfolge, Betriebsphase und Sensor-Symbol auswerten. Ein dunkles Gerät kann ausgeschaltet, spannungslos oder noch nicht korrekt versorgt sein; es bestätigt keine Überwachung.

## Funkintegration und Alarmwege

Zum Anlernen wird das kompatible THITRONIK-Alarmsystem in den Anlernmodus versetzt und anschließend die G.A.S.-pro III eingeschaltet. Die Alarmzentrale quittiert den erfolgreichen Vorgang akustisch. Der genaue Start und Abschluss des Anlernmodus richtet sich nach dem Alarmsystem und dessen App beziehungsweise Anleitung.

Ein G.A.S.-pro-III-Alarm kann abhängig von Betriebszustand und Konfiguration über folgende Wege ausgegeben werden:

- rote Sensor-LED
- interne Sirene
- Ausgang `SIR+`
- Funkmeldung an das angelernte THITRONIK-Alarmsystem
- dort konfigurierte Folgemaßnahmen, gegebenenfalls über [[Pro-Finder — GSM/GPS Telemetriemodul]]

Nicht voraussetzen, dass Fahrzeughupe, Warnblinker, Nachricht oder externer Aktor immer reagieren. Diese Wege hängen vom gekoppelten System, dessen Scharfschaltzustand, Zubehör, Verdrahtung und Konfiguration ab. Einzelheiten unter [[WiPro III — Funk-Alarmsystem für Freizeitfahrzeuge]].

## Pause und Stummschaltung

Ein kurzer Tasterdruck startet den 60-minütigen Pause-Modus. Ein Doppelton hoch–tief bestätigt den Beginn; ein Doppelton tief–hoch bestätigt die automatische Rückkehr in den Normalbetrieb. Ein erneuter kurzer Tasterdruck beendet die Pause vorzeitig.

Während der Pause unterdrückt die G.A.S.-pro III laut technischer Zusatzinformation:

- das akustische Signal der internen Sirene
- die eigene Funkmeldung an WiPro III beziehungsweise WiPro III safe.lock
- die Ansteuerung von `SIR+`

Ein möglicher Alarm wird weiterhin optisch über die LEDs angezeigt. Das angelernte Alarmsystem selbst bleibt unabhängig davon aktiv; soll es vollständig deaktiviert werden, muss dies separat erfolgen.

> [!WARNING]
> Nur bei G.A.S.-pro III CO hat eine sehr hohe CO-Konzentration Vorrang: Die interne Sirene wird dann trotz Pause nicht stummgeschaltet. Eine Stummschaltung beseitigt weder Gas noch CO und bestätigt keine sichere Atmosphäre.

## Zündungsanschluss `IGN`

`IGN` wird mit Klemme 15 der Fahrzeugzündung verbunden. Solange dort Spannung anliegt, ist die G.A.S.-pro III stummgeschaltet:

- keine eigene Funkmeldung an das gekoppelte Alarmsystem
- kein akustisches Signal der internen Sirene
- keine Ansteuerung von `SIR+`
- ein Alarm bleibt ausschließlich über die LEDs sichtbar

Die Versorgung des Gaswarners bleibt dennoch dauerhaft angeschlossen. `IGN` ist kein Ersatz für eine geeignete Absicherung und kein Versorgungsanschluss. Nach Einbau das Verhalten bei Zündung ein und aus kontrollieren.

## Unterspannung, Übertemperatur und Sensorfehler

| Warnung | Auslöser / Anzeige | Sichere Reaktion |
|---|---|---|
| Unterspannung | unter 11,1 V; dreimal drei Töne innerhalb einer Minute, beide LEDs gelb pulsierend | Bordversorgung und Batterie fachgerecht prüfen; Gerät schaltet zum Tiefentladeschutz ab |
| Übertemperatur | Gerätetemperatur über 60 °C; auf-/abschwellender Dauerton und mehrfarbig blinkende LEDs | Wärmequelle und Einbauort prüfen, Gerät abkühlen lassen; keine reguläre Gasalarmmeldung über WiPro III |
| Sensorfehler | ein Ton pro Sekunde und betroffene Sensor-LED gelb blinkend | System nicht als vollständig betriebsbereit behandeln; Händler oder THITRONIK-Support kontaktieren |

Nach einer Unterspannungsabschaltung verlangt die aktuelle technische Zusatzinformation nach Wiederherstellung der Versorgungsspannung ein erneutes Einschalten am Gerät. Veraltete oder gerätestandsabhängige Angaben zum automatischen Neustart deshalb nicht ohne Bestätigung auf das konkrete Gerät übertragen.

Bei Übertemperatur wird laut Anleitung kein Signal über eine gekoppelte WiPro III beziehungsweise WiPro III safe.lock ausgegeben. Eine Übertemperaturwarnung nicht mit einem Gasalarm verwechseln und den Einbauort auf direkte Heizluft, Wärmestau und zulässige Umgebungstemperatur prüfen.

## Haltbarkeit der CO-Sensoren

Die G.A.S.-pro III CO und der externe CO-Sensor besitzen ein Verfallsdatum. Es steht als `Exp. Date` mit Monat und Jahr auf dem Typenschild. Spätestens mit Erreichen dieses Datums muss der CO-Sensor durch THITRONIK ersetzt werden; die technische Zusatzinformation beschreibt dies als kostenpflichtigen Service.

Ein abgelaufenes Gerät nicht durch Rücksetzen, Reinigen oder einen improvisierten Test weiter freigeben. Händler oder THITRONIK-Support mit Produkt, Artikelnummer, Seriennummer und `Exp. Date` kontaktieren. Details unter [[CO-Sensor — Kohlenmonoxid-Zusatzsensor]].

## Externer Zusatzsensor

Beide Hauptgeräte besitzen genau einen externen Sensoreingang. Je nach gewünschter Kombination kann dort ein geeigneter Gassensor oder CO-Sensor angeschlossen werden.

Der [[Zusatzsensor G.A.S.-pro III — Externer Gassensor]] Art. `101289` erkennt Propan, Butan und KO-/Narkosegase. Die Produktseite nennt etwa 21 mA Stromaufnahme, 2 m Anschlussleitung, ca. 50 g und ca. 52 × 32 × 15 mm. Für Fahrzeuglängen über 6,5 m oder räumlich getrennte Bereiche empfiehlt THITRONIK einen zusätzlichen Sensor.

Für Leitungsverlängerungen konservativ höchstens **7 m Gesamtlänge** verwenden. Mindestens gleichen Leiterquerschnitt wie die vorhandene Sensorleitung einsetzen, Verbindung elektrisch zuverlässig und mechanisch geschützt ausführen und keine Sensorleitung zusammen mit störenden Lastleitungen verlegen. Die allgemeine FAQ-Angabe von 8 m nur nach Bestätigung für die konkrete Kombination verwenden.

## Inbetriebnahme und Funktionskontrolle

1. Variante, Artikelnummer, Montagehöhe und gegebenenfalls Rückrufbetroffenheit prüfen.
2. Halterung, Geräteorientierung, Kabelreserve, Klemmen und Sicherung kontrollieren.
3. DIP-Stellungen dokumentieren und mit der vorgesehenen Ausgangsfunktion abgleichen.
4. Versorgung herstellen und Gerät einschalten.
5. Einschaltsequenz und etwa vier Minuten Vorheizphase vollständig abwarten.
6. Grünen Normalzustand beider tatsächlich verwendeten Sensoren prüfen.
7. Pause, `IGN`, Funkanlernung und angeschlossene Alarmwege entsprechend der Konfiguration kontrollieren.
8. Datum, Seriennummer, Sensorbestückung und bei CO-Sensoren `Exp. Date` dokumentieren.

Eine Vor-Ort-Funktionsprüfung durch Feuerzeuggas oder anderes Prüfgas ist laut beiden Kurzanleitungen wegen des Auswertungsalgorithmus nicht möglich. Das Gerät besitzt einen automatischen Sensorselbsttest und wurde in der Produktion geprüft.

> [!CAUTION]
> Kein Feuerzeuggas, Abgas, Rauch, Lösungsmittel oder offene Flamme zum Test an das Gerät bringen. Eine fachliche Prüfung nur nach einem ausdrücklich für diese Gerätevariante freigegebenen Herstellerverfahren durchführen lassen.

## Verhalten bei Gas- oder CO-Alarm

1. Alarm ernst nehmen und alle Personen sowie Tiere unverzüglich ins Freie bringen.
2. Bei CO-Verdacht keine Zeit mit der Suche nach der Quelle verlieren; Beschwerden können ein medizinischer Notfall sein.
3. Nicht rauchen und keine elektrischen Schalter, Stecker, Motoren oder möglichen Zündquellen betätigen.
4. Gaszufuhr nur schließen, wenn dies ohne Eigengefährdung möglich ist.
5. Türen und Fenster nur aus sicherer Position öffnen und das Fahrzeug gründlich lüften.
6. Bei Beschwerden, hoher Konzentration oder unklarer Lage den Notruf beziehungsweise zuständige Einsatzkräfte verständigen.
7. Fahrzeug, Heizung und Gasgeräte erst wieder nutzen, wenn die Ursache fachgerecht geklärt und die Atmosphäre sicher ist.

Das Quittieren oder Verstummen der Sirene beseitigt keine Gefahrenquelle. Auch nach Ende der roten Anzeige nicht ohne Ursachenklärung in den Normalbetrieb zurückkehren.

## Freiwillige Rückrufaktion

Die aktuelle THITRONIK-Rückrufseite betrifft eine klar abgegrenzte Kombination:

| Merkmal | Betroffene Ausführung |
|---|---|
| Hauptgerät | G.A.S.-pro III Art. `101286` für Propan, Butan und Betäubungsgase |
| externer Sensor | Zusatzsensor Art. `101289` |
| betroffene Seriennummern des Hauptgeräts | `1286-008`, `1286-009`, `1286-010`, `1286-011`, `1286-012` |
| dokumentierter Verkaufszeitraum | 01.01.2023 bis 14.02.2024 |
| Grund | Sensor- beziehungsweise Sensorfehlerauswertung kann in dieser Kombination unter Umständen nicht einwandfrei funktionieren |
| Maßnahme | kostenloses Softwareupdate durch THITRONIK |

Ist die Kombination betroffen, vollständige Rückseite mit lesbarer Seriennummer fotografieren und das Gerät über die offizielle Rückrufseite anmelden. Kabel nicht eigenmächtig lösen und vor weiterer Demontage die Rückmeldung von THITRONIK abwarten. Andere Varianten oder Seriennummern nicht allein aufgrund ähnlicher Bezeichnungen als betroffen oder nicht betroffen einstufen.

## Sichere Störungsbeseitigung

| Beobachtung | Einordnung / nächste Maßnahme |
|---|---|
| keine LEDs | Dauerstrom, Sicherung, Masse, Einschaltzustand und Unterspannungsabschaltung prüfen |
| etwa 4 Minuten blau pulsierend | normale Vorheizphase; noch keine bestätigte Betriebsbereitschaft |
| Sensor-LED gelb blinkend, ein Ton pro Sekunde | Sensorfehler; Sensorzuordnung, Leitung und Stecker spannungsfrei prüfen, danach Support |
| beide LEDs gelb pulsierend | Unterspannung; Versorgung unter Last messen |
| LEDs mehrfarbig, auf-/abschwellender Ton | Übertemperatur; Wärmequelle und Einbauort prüfen |
| Alarm beim Kochen oder Reinigen | zuerst reales Gasereignis ausschließen und lüften; Pause nur vorsorglich und bewusst verwenden |
| keine Funkmeldung | Pause, `IGN`, Anlernung, Zustand der Alarmzentrale und Funkkompatibilität prüfen |
| externer Aktor reagiert falsch | DIP 3/4, Ruhespannung, Alarmspannung und zulässige Ausgangslast prüfen |
| wiederholter unbegründeter Alarm | Umgebung, Heizluft, Aerosole, Versorgung und Sensorfehler dokumentieren; kein unbelegtes „Freibrennen“ durchführen |

Weitere Diagnoseabläufe stehen unter [[Störungsbeseitigung — Sichere Diagnose häufiger Probleme]]. Bleibt ein Fehler bestehen, Gerät nicht als Schutzsystem freigeben und keine internen Reparaturen oder Sensorreinigungen durchführen.

## Angaben für den Supportfall

| Angabe | Beispiel / Fundstelle |
|---|---|
| genaue Produktbezeichnung | G.A.S.-pro III oder G.A.S.-pro III CO |
| Artikelnummer | `101286`, `101287` beziehungsweise Zusatzsensor `101289` |
| vollständige Seriennummer | Rückseite des Hauptgeräts |
| Rückrufprüfung | Kombination und Serienbereich geprüft; Ergebnis dokumentiert |
| externer Sensor | Typ, Artikelnummer, Seriennummer und `Exp. Date`, falls CO |
| Montage | Höhe über Boden beziehungsweise Abstand unter Decke; Fotos |
| Umgebung | Abstand zu Heizung, Batterie und Nasszelle; räumliche Trennungen |
| Versorgung | Spannung bei Zündung ein und aus sowie im Fehlerzeitpunkt |
| DIP-Stellungen | Foto der Schalter 1–8 |
| Anzeige | interne oder externe Sensor-LED, Farbe und Blinkmuster |
| Tonsignal | Tonfolge, Dauer und Wiederholung |
| Funkpartner | Modell, Seriennummer, Softwarestand und Anlernstatus |
| `SIR+` | angeschlossene Last und gemessene Ruhe-/Alarmspannung |
| Sensorkabel | Gesamtlänge, Querschnitt und Verbindungsstellen |
| Fehlerverlauf | Zeitpunkt, Häufigkeit, Kochen/Heizung/Reinigung und bereits geprüfte Schritte |

Die vollständige Vorlage steht unter [[Support-Fallaufnahme — Pflichtangaben und Eskalationsprüfung]]. Artikelnummern und Zubehörzuordnung zusätzlich im [[Artikelnummern-Register — Produkte und Zubehör]] prüfen.

## Unterschiede zur älteren G.A.S.-pro

| Merkmal | G.A.S.-pro III | G.A.S.-pro ältere Serie |
|---|---|---|
| Hauptgerät | variantenabhängig mit integriertem Sensor | Zentrale ohne integrierten Gassensor |
| externe Sensoreingänge | 1 | bis zu 3 |
| Alarmanlagen-Einbindung | integrierte Funkschnittstelle und `SIR+` | kabelgebundene Relais-/Alarmkontakte |
| Aderendhülsen | nicht verwenden | laut Handbuch verwenden |
| Anwender-Gastest | nicht mit Feuerzeuggas möglich | Handbuch beschreibt Test der KO-/Flaschengassensoren |
| Montageort Hauptgerät | abhängig vom integrierten Sensor | Zentrale unabhängig von der Sensorhöhe platzierbar |

Sensoren, Anschlussfarben, DIP-Funktionen, Alarmzeiten, Testverfahren und Fehleranzeigen niemals zwischen den Generationen übertragen.

## Querverweise

- [[G.A.S.-pro (ältere Serie) — Gas- und CO-Alarm]]
- [[Zusatzsensor G.A.S.-pro III — Externer Gassensor]]
- [[CO-Sensor — Kohlenmonoxid-Zusatzsensor]]
- [[G.A.S.-connect — Funk-Gaswarner für WiPro III]]
- [[G.A.S.-plug „all in one" — Mobiler Gaswarner]]
- [[WiPro III — Funk-Alarmsystem für Freizeitfahrzeuge]]
- [[Pro-Finder — GSM/GPS Telemetriemodul]]
- [[Störungsbeseitigung — Sichere Diagnose häufiger Probleme]]
- [[Support-Fallaufnahme — Pflichtangaben und Eskalationsprüfung]]
- [[Artikelnummern-Register — Produkte und Zubehör]]
- [[Sirenen und Hupen — Akustische Alarmmittel]]
- [[Systemüberblick — THITRONIK-Produktwelt]]
- [[Glossar — Fachbegriffe im THITRONIK-System]]
