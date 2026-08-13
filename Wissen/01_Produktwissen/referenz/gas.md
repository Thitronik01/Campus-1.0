---
title: G.A.S. — Standalone-Gaswarner mit interner Sirene
sources:
  - 'https://www.thitronik.de/produkte/produkt/gas/'
  - >-
    https://www.thitronik.de/fileadmin/user_upload/downloads/gaswarner/anleitungen/gas.pdf
  - sources/GAS_Familie_DE_RAG_Pack/GAS__105700__Overview_DE.md
  - sources/Fragen zu G.A.S..pdf
  - sources/Seriennummer 5700 G.A.S..csv
updated: '2026-07-16'
confidence: high
lang: de
dealerStatus: approved
---

# G.A.S. — Standalone-Gaswarner mit interner Sirene

**Artikelnummer:** `105700`  
**Anleitungsrevision:** 1.1

G.A.S. ist ein fest montierter, eigenständiger Gaswarner für Freizeitfahrzeuge. Er erkennt Propan, Butan sowie KO-/Narkosegase und alarmiert über seine interne Sirene. Eine WiPro-Zentrale ist für den Betrieb nicht erforderlich. Über den Steuerausgang `Alarm OUT` kann zusätzlich eine Back-up Sirene angesteuert werden.

> [!WARNING]
> G.A.S. erkennt weder Kohlenmonoxid (CO) noch Rauch oder Hitze und ersetzt keinen CO- oder Rauchmelder. Ein Gaswarner verringert Risiken, kann aber die sichere Installation, Wartung und Nutzung von Gasgeräten nicht ersetzen.

## Technische Daten

| Parameter | Wert |
|---|---|
| Betriebsspannung | 12/24 V DC |
| Stromaufnahme bei 12 V | ca. 28 mA |
| Stromaufnahme bei 24 V | ca. 15 mA |
| Minimale Alarmschwelle | 5 % UEG Butan |
| Interne Sirene | 82 dB bei 1 m |
| `Alarm OUT` | Schaltet gegen Masse, maximal 0,10 A |
| Maximale Betriebstemperatur | −20 °C bis +80 °C |
| Empfohlener Temperaturbereich | −10 °C bis +55 °C |
| Abmessungen (B × H × T) | 30 × 88 × 26 mm |
| Gewicht | ca. 35 g |
| Typgenehmigung | ECE R10 |

Die Grenzwerte des Steuerausgangs dürfen nicht überschritten werden. `Alarm OUT` ist keine Versorgung für beliebige Verbraucher.

## Schnellcheck

| Frage | Antwort |
|---|---|
| Eigenständiger Betrieb möglich? | Ja, ohne WiPro-Zentrale |
| Erkannte Stoffe | Propan, Butan und KO-/Narkosegase |
| Kohlenmonoxid erkannt? | Nein |
| Eigene Sirene vorhanden? | Ja, 82 dB in 1 m Abstand |
| Zusätzlicher Alarmgeber möglich? | Ja, über `Alarm OUT`, zum Beispiel Back-up Sirene Art. `100089` |
| Externe Sensoren anschließbar? | Nein |
| Versorgung | 12 oder 24 V DC aus dem Fahrzeugbordnetz |
| Vorgesehener Einsatzort | Innenraum eines Freizeitfahrzeugs |
| Produktspezifische Montagehöhe | Etwa 10 cm über dem Fußboden, unterhalb der Schlafplätze |

## Produktrolle und Abgrenzung

| Produkt | Rolle | Alarmweg / Einbindung |
|---|---|---|
| **G.A.S.**, Art. `105700` | Fest montierter Standalone-Gaswarner | Interne Sirene; optionale Back-up Sirene über `Alarm OUT`; keine WiPro erforderlich |
| [[G.A.S.-connect — Funk-Gaswarner für WiPro III]] | Funk-Gaswarner für ein WiPro-System | Benötigt eine kompatible WiPro III und deren Alarmweg |
| [[G.A.S.-plug „all in one" — Mobiler Gaswarner]] | Mobiles Gerät für die 12-/24-V-Steckdose | Eigenständiger mobiler Einsatz |
| [[G.A.S.-pro III — Gaswarner für Freizeitfahrzeuge]] | Erweiterbarer Gaswarner | Eigene Produkt- und Anschlusslogik; optionale Zusatzsensoren |
| [[CO-Sensor — Kohlenmonoxid-Zusatzsensor]] | Zusatzsensor für kompatible G.A.S.-pro-Systeme | Kein Zubehör für G.A.S. Art. `105700` |

Produktnamen allein reichen für eine Zubehör- oder Anschlussentscheidung nicht aus. Artikelnummer, Typenschild, Anleitung und vorhandenes System müssen zusammenpassen.

## Erkennbare Gase und Systemgrenzen

| Stoff oder Ereignis | Erkennung durch G.A.S. |
|---|---|
| Propan | Ja |
| Butan | Ja |
| KO-/Narkosegase | Ja |
| Kohlenmonoxid (CO) | Nein |
| Kohlendioxid (CO₂) | Nein dokumentiert |
| Rauch oder Hitze | Nein |
| Sauerstoffmangel | Nein |

G.A.S. besitzt einen internen Sensor mit dynamischer Temperaturkompensation und kontinuierlicher Selbstüberwachung. Weitere Sensoren können nicht angeschlossen werden. Lösemittel, Aerosole, alkoholhaltige Dämpfe oder Reinigungsmittel können ähnliche Sensorsignale verursachen; ein Alarm wird trotzdem zunächst wie ein reales Gasereignis behandelt.

## Lieferumfang

Zum dokumentierten Lieferumfang gehören:

- G.A.S. Gaswarner
- Anschlusskabel
- Alarmaufkleber
- Montagematerial
- Anleitung

Vor der Montage Lieferumfang, Gehäuse und Kabel auf Vollständigkeit und sichtbare Schäden prüfen. Ein beschädigtes Gerät nicht in Betrieb nehmen.

## Montageort und Quellenabgrenzung

Die produktspezifische Anleitung ist für dieses Gerät maßgeblich und nennt eine Montage **etwa 10 cm über dem Fußboden**, unterhalb der Schlafplätze. Eine allgemeine THITRONIK-FAQ nennt für Gaswarner teilweise 10–30 cm. Für G.A.S. Art. `105700` wird deshalb die genauere Vorgabe der zugehörigen Anleitung verwendet.

| Vorgabe | Abstand / Bedingung |
|---|---|
| Höhe über dem Fußboden | etwa 10 cm |
| Lage | unterhalb der Schlafplätze |
| Abstand zu Heizungsausströmern | mindestens 1,5 m |
| Abstand zu Blei-Säure-Batterien | mindestens 1,0 m |
| Umgebung | trockener Fahrzeuginnenraum |
| Ungeeignet | Nasszelle, Außenbereich, direkter Heizungs-Luftstrom |

Der Einbauort muss eine freie Luftzirkulation am Gerät ermöglichen. Das Gerät nicht verdecken, zustellen oder in einem geschlossenen Staufach montieren.

## Mechanische Montage

1. Spannungsfreien Montageort anhand der Abstandsvorgaben festlegen und verdeckte Leitungen oder Bauteile vor dem Bohren ausschließen.
2. Bohrschablone aus der Anleitung verwenden. Oberhalb des Geräts mindestens 11 mm Freiraum für das Aufschieben beziehungsweise Abnehmen einplanen.
3. Befestigungsschrauben so setzen, dass die Schraubenköpfe etwa 6,5 mm hervorstehen.
4. Anschlussleitung spannungsfrei zum Montageort führen.
5. Die rückseitigen Gehäuseaussparungen über die Schraubenköpfe setzen und das Gerät nach unten schieben.
6. Sitz und Luftzugang prüfen; das Gehäuse darf nicht verspannt sein.

> [!CAUTION]
> Vor Bohr- und Anschlussarbeiten die betroffenen Stromkreise spannungsfrei schalten und gegen Wiedereinschalten sichern. Bei fehlender Kenntnis des Fahrzeugbordnetzes den Einbau durch einen Fachbetrieb ausführen lassen.

## Elektrischer Anschluss

| Anschluss | Funktion | Vorgabe |
|---|---|---|
| `12/24V` | Positive Bordnetzversorgung | Passende abgesicherte 12-/24-V-DC-Versorgung verwenden |
| `AGND` | Masse | Mit geeigneter Fahrzeugmasse verbinden |
| `ALARM OUT` | Optionaler Alarmausgang | Schaltet gegen Masse, maximal 0,10 A |

Die Klemmhebel vollständig öffnen, abisolierte Leiter bis zum Anschlag einführen und die Hebel wieder schließen. Die Anschlussdarstellung der Anleitung verlangt den Anschluss **ohne Aderendhülsen**. Danach jede Ader mit einer leichten Zugprobe kontrollieren.

Polarität, Absicherung und Versorgungsspannung vor dem Einschalten prüfen. Niemals an einer unter Spannung stehenden Klemme arbeiten.

## `Alarm OUT` und Back-up Sirene

Die interne Sirene ist der primäre Alarmgeber. `Alarm OUT` ermöglicht zusätzlich die Ansteuerung der Back-up Sirene, Art. `100089`.

| Leitung der Back-up Sirene | Anschluss |
|---|---|
| Blau | An `ALARM OUT` von G.A.S. |
| Rot | An die dafür vorgesehene positive Fahrzeugversorgung |
| Schwarz | An Fahrzeugmasse |

`Alarm OUT` liefert keine Versorgungsspannung, sondern schaltet im Alarmfall gegen Masse. Die rote und schwarze Leitung der Sirene benötigen daher eine eigene, fachgerecht abgesicherte Fahrzeugversorgung. Den Ausgang niemals mit mehr als 0,10 A belasten. Weitere Sirenen- und Hupenvarianten sind unter [[Sirenen und Hupen — Akustische Alarmmittel]] beschrieben.

## Einschalten und Aufwärmphase

1. Den Taster an der Geräteunterseite mindestens 2 Sekunden drücken.
2. Drei kurze Signaltöne bestätigen das Einschalten.
3. Während der Aufwärmphase leuchtet die Anzeige gelb.
4. Die Aufwärmphase dauert normalerweise etwa 3 Minuten; bei der ersten Inbetriebnahme kann sie bis zu 20 Minuten dauern.
5. Grün blinkende Anzeige bedeutet Betriebsbereitschaft.

Während der Aufwärmphase besteht noch keine bestätigte Betriebsbereitschaft. Erst bei grün blinkender Anzeige auf die Überwachung verlassen.

## Betriebs- und LED-Zustände

| Zustand | Anzeige / Signal | Bedeutung und Maßnahme |
|---|---|---|
| Einschaltbestätigung | Drei kurze Signaltöne | Einschaltbefehl angenommen |
| Aufwärmphase | Gelb leuchtend | Warten; üblicherweise ca. 3 Minuten, erstmalig bis 20 Minuten |
| Betriebsbereit | Grün blinkend | Normale Überwachung aktiv |
| Gasalarm | Rot blinkend und Sirene | Sicherheitsablauf befolgen |
| Sensorfehler | Gelb blinkend und Dauerton | Gerät ausschalten und Support kontaktieren |
| Ausschaltbestätigung | Ein Signalton, Anzeige erlischt | Gerät ausgeschaltet |

Eine erloschene Anzeige ist keine Betriebsbereitschaft. Vor Reiseantritt und Übernachtung den grün blinkenden Zustand kontrollieren.

## Alarmablauf und Stummschaltung

Wird die Alarmschwelle länger als 30 Sekunden überschritten, beginnt der dokumentierte Alarmablauf:

1. Die Anzeige blinkt rot.
2. Die interne Sirene alarmiert 30 Sekunden lang mit voller Lautstärke.
3. Ein kurzer Druck auf den Taster schaltet die interne Sirene stumm; die rote Anzeige blinkt weiter.
4. Nach weiteren 30 Sekunden kehrt das Gerät in den Normalbetrieb zurück.
5. Wird die Schwelle erneut länger als 30 Sekunden überschritten, startet der Alarmablauf erneut.

> [!WARNING]
> Stummschalten bestätigt keine sichere Atmosphäre und beseitigt keine Gasquelle. Bei jedem Alarm Personen und Tiere in Sicherheit bringen und die Ursache aus sicherer Position klären.

## Ausschalten

Den Taster an der Geräteunterseite länger als 4 Sekunden gedrückt halten. Ein Signalton bestätigt das Ausschalten; die Anzeige erlischt.

Das Gerät nicht ausschalten, um einen ungeklärten Alarm oder einen Sensorfehler dauerhaft zu unterdrücken. Vor einer Übernachtung muss die Betriebsbereitschaft wiederhergestellt und die Ursache geklärt sein.

## Selbstüberwachung und Sensorfehler

G.A.S. überwacht den Sensor kontinuierlich. Gelbes Blinken zusammen mit einem Dauerton kennzeichnet einen Sensorfehler.

1. Gerät ausschalten.
2. Versorgung, sichtbare Kabelschäden und Steck-/Klemmverbindungen nur spannungsfrei prüfen.
3. Gerät erneut einschalten und die vollständige Aufwärmphase abwarten.
4. Bleibt der Fehler bestehen, Gerät nicht als Schutzsystem verwenden und den THITRONIK-Support beziehungsweise einen Fachbetrieb kontaktieren.

Eine systematische Eingrenzung ist unter [[Störungsbeseitigung — Sichere Diagnose häufiger Probleme]] beschrieben.

## Sicherer Funktionscheck

Die Einschaltbestätigung, die LED-Zustände und die interne Selbstüberwachung zeigen, dass Start- und Überwachungsabläufe arbeiten. Sie ersetzen jedoch keinen gezielten Sensortest.

Die produktspezifische Anleitung dokumentiert keinen improvisierten Anwender-Sensortest mit Feuerzeuggas, offener Flamme oder unkontrolliert freigesetztem Prüfgas. Solche Tests deshalb nicht durchführen. Wenn eine vollständige Sensorprüfung erforderlich ist, das von THITRONIK beziehungsweise einem Fachbetrieb freigegebene Prüfverfahren verwenden.

| Prüfung | Erwartetes Ergebnis |
|---|---|
| Einschalten | Drei kurze Signaltöne |
| Aufwärmen | Gelb leuchtende Anzeige |
| Betriebsbereitschaft | Grün blinkende Anzeige |
| Sichtprüfung | Freier Lufteintritt, keine Beschädigung, sichere Befestigung |
| Fehlerzustand | Kein gelbes Blinken mit Dauerton |

## Verhalten bei Gasalarm

1. Alarm ernst nehmen und alle Personen sowie Tiere unverzüglich ins Freie bringen.
2. Offene Flammen löschen, sofern dies ohne Eigengefährdung möglich ist. Nicht rauchen.
3. Keine elektrischen Schalter, Stecker oder sonstigen möglichen Zündquellen betätigen.
4. Gaszufuhr nur schließen, wenn dies gefahrlos möglich ist.
5. Türen und Fenster aus sicherer Position öffnen und das Fahrzeug lüften.
6. Bei Beschwerden, starker Gaskonzentration oder unklarer Lage den Notruf beziehungsweise die zuständigen Einsatzkräfte verständigen.
7. Fahrzeug erst wieder betreten und Gasgeräte erst wieder benutzen, wenn die Ursache fachgerecht geklärt und die Atmosphäre sicher ist.

Bei Verdacht auf KO-/Narkosegase medizinische Beschwerden nicht bagatellisieren. Betroffene an die frische Luft bringen und medizinische Hilfe veranlassen.

## Häufige Ursachen und sichere Diagnose

| Beobachtung | Mögliche Ursache | Sichere nächste Maßnahme |
|---|---|---|
| Anzeige bleibt nach dem Einschalten gelb | Normale Aufwärmphase | Bis zu 20 Minuten bei Erstinbetriebnahme abwarten |
| Anzeige blinkt grün | Normalbetrieb | Keine Maßnahme erforderlich |
| Rot blinkend und Sirene | Gas oder gasähnlicher Dampf erkannt | Alarmablauf befolgen, lüften, Ursache klären |
| Alarm nach Aerosol- oder Reinigungsmittelgebrauch | Sensorisch ähnlicher Dampf möglich | Trotzdem wie realen Alarm behandeln; Produkt entfernen und vollständig lüften |
| Gelb blinkend und Dauerton | Sensorfehler | Ausschalten, spannungsfrei kontrollieren, Support kontaktieren |
| Keine Anzeige | Gerät ausgeschaltet oder Versorgung fehlt | Tasterbedienung, Sicherung, Spannung und Polarität fachgerecht prüfen |
| Back-up Sirene bleibt stumm | Versorgung, Verdrahtung oder `Alarm OUT` fehlerhaft | Eigene Sirenenversorgung und blaue Steuerleitung spannungsfrei prüfen; Ausgang nicht überlasten |

Keine Sicherung überbrücken, keine Ausgangsleitung probeweise kurzschließen und keine Gasquelle zu Testzwecken freisetzen.

## Angaben für den Supportfall

Für eine zügige Prüfung folgende Angaben bereithalten:

| Angabe | Beispiel / Fundstelle |
|---|---|
| Produkt und Artikelnummer | G.A.S., `105700` |
| Vollständige Seriennummer | Typenschild; nicht nur ein vermutetes Präfix |
| Versorgungsspannung | Gemessener Wert an `12/24V` und `AGND` |
| LED- und Signalzustand | Farbe, leuchtend/blinkend, Einzelton/Dauerton |
| Zeitpunkt und Dauer | Direkt nach dem Einschalten, nach der Aufwärmphase oder im Betrieb |
| Einbauort | Höhe, Abstand zu Heizung und Batterie, Luftzirkulation |
| Ereignisumgebung | Gasgeräte, Aerosole, Reiniger, Alkohol oder sonstige Dämpfe |
| Zusatzausgang | Belegung und Last an `ALARM OUT` |
| Bereits geprüft | Konkrete, spannungsfrei ausgeführte Schritte |

Die vollständige Vorlage steht unter [[Support-Fallaufnahme — Pflichtangaben und Eskalationsprüfung]]. Artikel- und Zubehörzuordnungen können im [[Artikelnummern-Register — Produkte und Zubehör]] gegengeprüft werden.

## Querverweise

- [[G.A.S.-connect — Funk-Gaswarner für WiPro III]]
- [[G.A.S.-plug „all in one" — Mobiler Gaswarner]]
- [[G.A.S.-pro III — Gaswarner für Freizeitfahrzeuge]]
- [[CO-Sensor — Kohlenmonoxid-Zusatzsensor]]
- [[Sirenen und Hupen — Akustische Alarmmittel]]
- [[Störungsbeseitigung — Sichere Diagnose häufiger Probleme]]
- [[Support-Fallaufnahme — Pflichtangaben und Eskalationsprüfung]]
- [[Artikelnummern-Register — Produkte und Zubehör]]
- [[Systemüberblick — THITRONIK-Produktwelt]]
- [[Glossar — Fachbegriffe im THITRONIK-System]]
