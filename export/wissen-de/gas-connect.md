# G.A.S.-connect — Funk-Gaswarner für WiPro III

Route: /de/gas-connect | Stand: 2026-07-16 | Sichtbarkeit: standard
Quelle: Thitronik Online/project-data/runtime/wiki/wiki-articles/de/gas-connect.json

---
G.A.S.-connect — Funk-Gaswarner für WiPro III 

Artikelnummer : 105750 

Seriennummern-Präfix: 5750- 

Anleitungsrevision: 1.0

G.A.S.-connect ist ein fahrzeugversorgter Funk-Gaswarner für Propan, Butan und KO-/Narkosegase. Er wird als Zusatzmodul an eine kompatible WiPro III beziehungsweise WiPro III safe.lock angelernt und alarmiert über deren Alarmwege. Das Gerät besitzt keine interne Sirene, zeigt seinen Zustand aber über eine LED an. Über Alarm OUT kann zusätzlich eine Back-up Sirene angesteuert werden.

[!WARNING]
G.A.S.-connect ist kein eigenständiger Gaswarner. Ohne kompatible und betriebsbereite WiPro III fehlt der vorgesehene Hauptalarmweg. Das Gerät erkennt weder Kohlenmonoxid (CO) noch Rauch oder Hitze und ersetzt keinen CO- oder Rauchmelder.

## Technische Daten und Quellenabgrenzung

Parameter | Wert nach produktspezifischer Anleitung Rev. 1.0 | 
 Artikelnummer | 105750 | 
 Seriennummern-Präfix | 5750- | 
 Spannungsversorgung | 12/24 V DC | 
 Stromaufnahme bei 12 V | ca. 15 mA | 
 Stromaufnahme bei 24 V | ca. 25 mA | 
 Funkreichweite im Freifeld | ca. 75 m | 
 Sendefrequenz | 868,35 MHz | 
 Sendeleistung | < 10 mW | 
 Minimaler Auslösewert | 5 % der UEG von Butan | 
 Maximaler Temperaturbereich | −20 °C bis +80 °C | 
 Empfohlener Temperaturbereich | −10 °C bis +55 °C | 
 Abmessungen (B × H × T) | 30 × 88 × 26 mm | 
 Gewicht | ca. 33 g | 
 Alarm OUT optional | Schaltet gegen Masse, maximal 0,10 A | 
 Funkkonformität laut Anleitung | Richtlinie 2014/53/EU | 
 Fahrzeugzulassung laut Produktseite | ECE R10 | 

Die aktuelle offizielle Produktseite nennt abweichend ca. 28/15 mA und ca. 35 g . Diese Werte stimmen mit den dort veröffentlichten Daten des Standalone-Geräts G.A.S. überein, während die G.A.S.-connect-Anleitung zusätzlich die Funkdaten ausweist. Für diesen Master gelten deshalb die Werte der produktspezifischen Anleitung. Wenn Strombudget oder Gewicht für eine konkrete Freigabe entscheidend sind, Typenschild, beiliegende Anleitung und THITRONIK-Support abgleichen.

## Schnellcheck

Frage | Antwort | 
 Eigenständiger Betrieb vorgesehen? | Nein | 
 Erforderliche Zentrale | Kompatible WiPro III oder WiPro III safe.lock | 
 Erkannte Stoffe | Propan, Butan und KO-/Narkosegase | 
 Kohlenmonoxid erkannt? | Nein | 
 Interne Sirene vorhanden? | Nein | 
 Optische Anzeige vorhanden? | Ja, LED mittig im Gehäuse | 
 Zusätzlicher Alarmgeber möglich? | Ja, Back-up Sirene Art. 100089 über Alarm OUT | 
 Externe Sensoren anschließbar? | Nein | 
 Versorgung | 12/24 V DC aus dem Fahrzeug; keine CR2032-Batterie | 
 Funk | 868,35 MHz, weniger als 10 mW | 
 Produktspezifische Montagehöhe | Etwa 10 cm über dem Fußboden, unterhalb der Schlafplätze | 

## Produktrolle und Abgrenzung

Produkt | Rolle | Alarmweg / Einbindung | 
 G.A.S.-connect , Art. 105750 | Funk-Gaswarner als WiPro-Zusatzmodul | LED am Gerät; Alarm über WiPro; optional Alarm OUT ; kein Standalone-Betrieb | 
 G.A.S. — Standalone-Gaswarner mit interner Sirene | Eigenständiger, fest montierter Gaswarner | Interne Sirene; keine WiPro erforderlich | 
 G.A.S.-pro III — Gaswarner für Freizeitfahrzeuge | Eigenständiger und erweiterbarer Gaswarner | Eigene Sirene und produktspezifische Zusatzsensor-Anschlüsse | 
 CO-Sensor — Kohlenmonoxid-Zusatzsensor | CO-Zusatzsensor für kompatible G.A.S.-pro -Systeme | Nicht an G.A.S.-connect anschließbar | 
 WiPro III — Funk-Alarmsystem für Freizeitfahrzeuge | Empfangende Alarmzentrale | Muss G.A.S.-connect angelernt haben und betriebsbereit sein | 

G.A.S.-connect besitzt zwar keine interne Sirene, aber einen optionalen elektrischen Alarmausgang. „Keine eigene Sirene“ darf deshalb nicht mit „kein eigener Alarmausgang“ gleichgesetzt werden.

## Systemvoraussetzungen und Alarmwege

Bestandteil | Erforderlich? | Aufgabe | 
 WiPro III / WiPro III safe.lock | Ja | Empfängt das Funksignal und steuert die vorgesehenen Alarmgeber | 
 Fahrzeugversorgung 12/24 V DC | Ja | Versorgt G.A.S.-connect dauerhaft | 
 Funk-Anlernung | Ja | Ordnet den Gaswarner der richtigen WiPro zu | 
 WiPro-Sirene | Systembestandteil | Akustischer Hauptalarm gemäß WiPro-Konfiguration | 
 Fahrzeughupe und Blinker | Anschluss-/fahrzeugabhängig | Zusätzliche Alarmierung, sofern im konkreten System verfügbar und korrekt angebunden | 
 Pro-Finder — GSM/GPS Telemetriemodul | Optional | Sendet bei Systemeinbindung eine SMS mit Hinweis auf den ausgelösten Gaswarner | 
 Back-up Sirene Art. 100089 | Optional | Zusätzlicher akustischer Alarm über Alarm OUT | 

Vor einer Funktionszusage Seriennummern, WiPro-Variante, Fahrzeugprofil, Anlernung und vorhandene Alarmgeber prüfen. Die dokumentierte Funkreichweite im Freifeld ist keine Reichweitengarantie im Fahrzeug.

## Erkennbare Gase und Systemgrenzen

Stoff oder Ereignis | Erkennung durch G.A.S.-connect | 
 Propan | Ja | 
 Butan | Ja | 
 KO-/Narkosegase | Ja | 
 Kohlenmonoxid (CO) | Nein | 
 Kohlendioxid (CO₂) | Nein dokumentiert | 
 Rauch oder Hitze | Nein | 
 Sauerstoffmangel | Nein | 

Der interne Sensor arbeitet mit dynamischer Temperaturanpassung und kontinuierlichem Sensorselbsttest. Weitere Sensoren können nicht angeschlossen werden. Lösemittel, Aerosole, alkoholhaltige Dämpfe oder Reinigungsmittel können ähnliche Sensorsignale verursachen; einen Alarm trotzdem zunächst wie ein reales Gasereignis behandeln.

## Lieferumfang

Zum dokumentierten Lieferumfang gehören:

G.A.S.-connect

Anschlusskabel, 1,5 m

Gaswarnaufkleber

Schrauben beziehungsweise Montagematerial

Anleitung

Vor Montage und Anlernung Lieferumfang, Gehäuse und Kabel auf Vollständigkeit und sichtbare Schäden prüfen. Ein beschädigtes Gerät nicht in Betrieb nehmen.

## Montageort und Quellenabgrenzung

Die produktspezifische Anleitung schreibt für G.A.S.-connect eine Montage etwa 10 cm über dem Fußboden , unterhalb der Schlafplätze, vor. Eine allgemeine THITRONIK-FAQ nennt teilweise 10–30 cm. Für Art. 105750 wird die genauere Vorgabe der Geräteanleitung verwendet.

Vorgabe | Abstand / Bedingung | 
 Höhe über dem Fußboden | etwa 10 cm | 
 Lage | unterhalb der Schlafplätze | 
 Abstand zu Heizungsausströmern | mindestens 1,5 m | 
 Abstand zu Blei-Säure-Batterien | mindestens 1,0 m | 
 Funkbedingung | Stabile Verbindung zur vorgesehenen WiPro am endgültigen Montageort | 
 Umgebung | trockener Fahrzeuginnenraum | 
 Ungeeignet | Nasszelle, Außenbereich, direkter Heizungs-Luftstrom, geschlossenes Staufach | 

Bei räumlicher Trennung durch Vorhänge oder Schiebetüren kann ein weiterer eigenständiger Gaswarner beziehungsweise ein weiterer passend eingebundener Funk-Gaswarner erforderlich sein. An G.A.S.-connect selbst kann kein externer Zusatzsensor angeschlossen werden.

## Funkprüfung vor der endgültigen Montage

Die Funkverbindung wird vor dem Bohren am vorgesehenen Einbauort geprüft:

G.A.S.-connect dort provisorisch mit 12/24 V DC versorgen.

WiPro III beziehungsweise WiPro III safe.lock in den Anlernmodus versetzen.

G.A.S.-connect einschalten und die erfolgreiche Erkennung durch den Signalton der WiPro bestätigen lassen.

Anlernmodus der WiPro wieder beenden.

Erst nach bestätigter Verbindung den endgültigen Montageort festlegen und bohren.

Die Freifeldangabe von ca. 75 m berücksichtigt weder Fahrzeugaufbau noch Metallflächen, Leitungen, Einbauten oder Funkstörungen. Eine erfolgreiche Anlernung direkt neben der Zentrale bestätigt daher nicht automatisch den späteren Einbauort.

## Mechanische Montage

Spannungsfreien Montagebereich anhand der Abstands- und Funkvorgaben festlegen; verdeckte Leitungen und Bauteile vor dem Bohren ausschließen.

Bohrschablone aus der Anleitung verwenden. Oberhalb des Geräts mindestens 11 mm Freiraum für das Aufschieben beziehungsweise Abnehmen einplanen.

Befestigungsschrauben so setzen, dass die Schraubenköpfe etwa 6,5 mm hervorstehen.

Anschlusskabel spannungsfrei durch die Fahrzeugverkleidung bis zur Versorgung führen.

Die rückseitigen Gehäuseaussparungen über die Schraubenköpfe setzen und das Gerät leicht nach unten ziehen.

Sicheren Sitz, freie Luftzirkulation und weiterhin stabile Funkverbindung prüfen.

[!CAUTION]
Vor Bohr- und Anschlussarbeiten die betroffenen Stromkreise spannungsfrei schalten und gegen Wiedereinschalten sichern. Bei fehlender Kenntnis des Fahrzeugbordnetzes den Einbau durch einen Fachbetrieb ausführen lassen.

## Elektrischer Anschluss

Anschluss | Funktion | Vorgabe | 
 12/24V | Positive Fahrzeugversorgung | Geeignete, abgesicherte 12-/24-V-DC-Versorgung verwenden | 
 AGND | Masse | Mit geeigneter Fahrzeugmasse verbinden | 
 ALARM OUT | Optionaler Alarmausgang | Schaltet gegen Masse, maximal 0,10 A | 

Die Hebel der Steckklemme vollständig herunterdrücken, die abisolierten Leiter bis zum Anschlag einführen und die Klemme wieder schließen. Die Anschlusszeichnung der Anleitung verlangt den Anschluss ohne Aderendhülsen . Anschließend jede Ader mit einer leichten Zugprobe kontrollieren.

Polarität, Absicherung und Versorgungsspannung vor dem Einschalten prüfen. G.A.S.-connect wird aus dem Fahrzeug versorgt und besitzt keine zu wechselnde CR2032-Knopfzelle.

## Alarm OUT und Back-up Sirene

Alarm OUT ermöglicht die zusätzliche Ansteuerung der Back-up Sirene, Art. 100089 .

Leitung der Back-up Sirene | Anschluss | 
 Blau | An ALARM OUT von G.A.S.-connect | 
 Rot | An die dafür vorgesehene positive Fahrzeugversorgung | 
 Schwarz | An Fahrzeugmasse | 

Alarm OUT liefert keine Versorgungsspannung, sondern schaltet im Alarmfall gegen Masse. Rote und schwarze Sirenenleitung benötigen deshalb eine eigene, fachgerecht abgesicherte Fahrzeugversorgung. Den Ausgang niemals mit mehr als 0,10 A belasten. Weitere Alarmgeber sind unter Sirenen und Hupen — Akustische Alarmmittel beschrieben.

## Einschalten und Aufwärmphase

Taster an der Geräteunterseite mindestens 2 Sekunden drücken.

Während der etwa 3 Minuten dauernden Aufwärmphase leuchtet die Betriebsanzeige durchgängig gelb.

Bei der ersten Inbetriebnahme kann die Aufwärmphase bis zu 20 Minuten dauern.

Grün blinkende Betriebsanzeige bedeutet Betriebsbereitschaft.

Die Anleitung dokumentiert beim Einschalten von G.A.S.-connect keine Drei-Ton-Bestätigung wie beim Standalone-Gerät G.A.S. Während der gelben Aufwärmphase besteht noch keine bestätigte Betriebsbereitschaft.

## Anlernen an WiPro III

WiPro III beziehungsweise WiPro III safe.lock gemäß ihrer Anleitung in den Anlernmodus versetzen.

G.A.S.-connect einschalten.

Sobald die WiPro den Gaswarner erkannt hat, bestätigt sie den Anlernvorgang mit einem Signalton.

Anlernmodus der WiPro wieder deaktivieren.

Betriebsbereitschaft des Gaswarners und Systemzuordnung dokumentieren.

Das Einschalten ist hier der Auslöser des Anlernsignals. Ein bereits eingeschaltetes Gerät gegebenenfalls ausschalten und nach Aktivierung des Anlernmodus erneut einschalten. Die allgemeinen Speicher-, Lösch- und Anlernregeln stehen unter Anlernvorgang — Funk-Zubehör an WiPro III anlernen .

## Betriebs- und LED-Zustände

Zustand | Anzeige / Signal | Bedeutung und Maßnahme | 
 Aufwärmphase | Gelb leuchtend | Warten; normalerweise ca. 3 Minuten, erstmalig bis 20 Minuten | 
 Betriebsbereit | Grün blinkend | Sensorüberwachung aktiv | 
 Gasalarm | Rot blinkend | WiPro-Alarmwege und gegebenenfalls Alarm OUT aktiv | 
 Sensorfehler | Gelb blinkend | Support kontaktieren; kein Dauerton am Gerät dokumentiert | 
 Ausgeschaltet / ohne Versorgung | Anzeige erloschen | Keine bestätigte Überwachung | 
 Anlernbestätigung | Signalton der WiPro | Funk-Zuordnung erkannt; nicht mit Sensortest verwechseln | 

Vor Reiseantritt und Übernachtung grün blinkende Anzeige sowie betriebsbereite WiPro prüfen.

## Alarmablauf über WiPro

Wird die Sensor-Alarmschwelle länger als 30 Sekunden überschritten, beginnt der dokumentierte Ablauf:

Die Betriebsanzeige von G.A.S.-connect blinkt rot.

Die interne Sirene der WiPro III beziehungsweise WiPro III safe.lock alarmiert 30 Sekunden mit voller Lautstärke.

Die Fahrzeughupe wird 30 Sekunden angesteuert, sofern sie im konkreten System verfügbar und korrekt angeschlossen ist.

Die Fahrzeugblinker werden 180 Sekunden angesteuert, sofern die Fahrzeuganbindung diese Funktion bereitstellt.

Ein eingebundener Pro-Finder sendet eine SMS mit dem Hinweis, dass der Gaswarner ausgelöst hat.

Nach weiteren 30 Sekunden wechselt G.A.S.-connect wieder in den Normalbetrieb.

Wird die Schwelle erneut länger als 30 Sekunden überschritten, beginnt der Ablauf erneut.

Die tatsächlichen Alarmgeber hängen von WiPro-Ausführung, Fahrzeugprofil, Anschluss und Konfiguration ab. Sirene, Fahrzeughupe und Blinker sind unterschiedliche Komponenten und dürfen nicht gleichgesetzt werden.

## Alarm beenden und Ereignis erkennen

Die Anleitung nennt zwei Bedienwege zum Beenden der Alarmierung:

Taste „Entriegeln“ des entsprechend eingebundenen Fahrzeugschlüssels drücken.

Eine beliebige Taste eines angelernten Funk-Handsenders drücken.

Sobald die Gaskonzentration unter den Schwellwert fällt, endet der Alarm automatisch; die Geräte-LED blinkt wieder grün. Die Status-LED der WiPro zeigt mit ihrem vorgesehenen Blinkcode an, dass ein Gasalarm ausgelöst wurde.

[!WARNING]
Das Beenden oder Verstummen der Alarmierung bestätigt keine sichere Atmosphäre und beseitigt keine Gasquelle. Personen und Tiere zuerst in Sicherheit bringen; den Alarm nicht lediglich quittieren und anschließend im Fahrzeug bleiben.

## Ausschalten

Den Taster an der Geräteunterseite länger als 4 Sekunden gedrückt halten, bis die Betriebsanzeige erlischt.

Die Anleitung dokumentiert beim Ausschalten keinen Bestätigungston. Eine erloschene Anzeige ist keine Betriebsbereitschaft. Das Gerät nicht ausschalten, um einen ungeklärten Alarm oder Sensorfehler dauerhaft zu unterdrücken.

## Selbstüberwachung und Sensorfehler

G.A.S.-connect überwacht seinen Sensor kontinuierlich. Gelbes Blinken kennzeichnet einen Sensorfehler; ein eigener Dauerton ist für dieses Gerät nicht dokumentiert.

Gerät ausschalten.

Fahrzeugversorgung, Absicherung, sichtbare Kabelschäden und Klemmen nur spannungsfrei prüfen.

Gerät wieder einschalten und vollständige Aufwärmphase abwarten.

WiPro-Betriebsbereitschaft und Funk-Zuordnung kontrollieren.

Bleibt der Fehler bestehen, Gerät nicht als Schutzsystem verwenden und THITRONIK-Support beziehungsweise Fachbetrieb kontaktieren.

Eine systematische Eingrenzung steht unter Störungsbeseitigung — Sichere Diagnose häufiger Probleme .

## Sicherer Funktions- und Funkcheck

Prüfung | Erwartetes Ergebnis | Aussagegrenze | 
 Einschalten | Gelbe Aufwärmanzeige | Bestätigt noch keine Betriebsbereitschaft | 
 Aufwärmphase beendet | Grün blinkende LED | Sensorüberwachung betriebsbereit | 
 Anlernen | WiPro bestätigt mit Signalton | Bestätigt Funk-Zuordnung, nicht die Gasempfindlichkeit | 
 Prüfung am Montageort | Verbindung zur vorgesehenen WiPro | Freifeldreichweite ist keine Einbaugarantie | 
 Sichtprüfung | Freier Lufteintritt, keine Schäden, sichere Befestigung | Keine vollständige Sensorprüfung | 
 Fehlerstatus | Kein gelbes Blinken | Fehlermeldungsfreiheit beweist allein keine Gasreaktion | 

Die produktspezifische Anleitung beschreibt keinen improvisierten Sensortest mit Feuerzeuggas, offener Flamme oder unkontrolliert freigesetztem Prüfgas. Solche Tests nicht durchführen. Für eine vollständige Sensor- und Alarmkettenprüfung nur ein von THITRONIK beziehungsweise einem Fachbetrieb freigegebenes Verfahren verwenden.

## Verhalten bei Gasalarm

Alarm ernst nehmen und alle Personen sowie Tiere unverzüglich ins Freie bringen.

Offene Flammen löschen, sofern dies ohne Eigengefährdung möglich ist. Nicht rauchen.

Keine elektrischen Schalter, Stecker oder sonstigen möglichen Zündquellen betätigen.

Gaszufuhr nur schließen, wenn dies gefahrlos möglich ist.

Türen und Fenster aus sicherer Position öffnen und das Fahrzeug lüften.

Bei Beschwerden, hoher Gaskonzentration oder unklarer Lage den Notruf beziehungsweise zuständige Einsatzkräfte verständigen.

Fahrzeug und Gasgeräte erst wieder benutzen, wenn die Ursache fachgerecht geklärt und die Atmosphäre sicher ist.

Bei Verdacht auf KO-/Narkosegase medizinische Beschwerden nicht bagatellisieren. Betroffene an die frische Luft bringen und medizinische Hilfe veranlassen.

## Häufige Ursachen und sichere Diagnose

Beobachtung | Mögliche Ursache | Sichere nächste Maßnahme | 
 Anzeige bleibt nach dem Einschalten gelb | Normale Aufwärmphase | Bei Erstinbetriebnahme bis zu 20 Minuten abwarten | 
 Anzeige blinkt grün, WiPro reagiert nicht | Nicht angelernt, falsche Zentrale oder Funkproblem | Anlernstatus und Funkverbindung am Montageort prüfen | 
 Anzeige blinkt rot | Gas oder gasähnlicher Dampf erkannt | Sicherheitsablauf befolgen, lüften, Ursache klären | 
 Alarm nach Aerosol- oder Reinigungsmittelgebrauch | Sensorisch ähnlicher Dampf möglich | Trotzdem wie realen Alarm behandeln; Produkt entfernen und vollständig lüften | 
 Anzeige blinkt gelb | Sensorfehler | Ausschalten, spannungsfrei kontrollieren, Support kontaktieren | 
 Keine Anzeige | Gerät ausgeschaltet oder Fahrzeugversorgung fehlt | Taster, Sicherung, Spannung, Polarität und Klemmen fachgerecht prüfen | 
 Funk am Testplatz, aber nicht am Einbauort | Abschirmung oder ungünstige Einbaulage | Montageort ändern und Verbindung erneut bestätigen | 
 Back-up Sirene bleibt stumm | Versorgung, Verdrahtung oder Alarm OUT fehlerhaft | Eigene Sirenenversorgung und blaue Steuerleitung spannungsfrei prüfen; Ausgang nicht überlasten | 
 Keine SMS | Kein oder nicht betriebsbereiter Pro-Finder beziehungsweise fehlende Systemeinbindung | Pro-Finder-Status getrennt von der lokalen Alarmierung prüfen | 

Keine Sicherung überbrücken, keine Ausgangsleitung kurzschließen, keine Funk-Sicherheitsfunktion pauschal deaktivieren und keine Gasquelle zu Testzwecken freisetzen.

## Angaben für den Supportfall

Angabe | Beispiel / Fundstelle | 
 Produkt und Artikelnummer | G.A.S.-connect, 105750 | 
 Vollständige Seriennummer | Typenschild, üblicher Präfix 5750- ; nicht nur den Präfix melden | 
 WiPro-Ausführung und Seriennummer | WiPro III oder WiPro III safe.lock, vollständige Seriennummer | 
 Fahrzeug und Baujahr | Hersteller, Modell, Modelljahr | 
 Versorgungsspannung | Messwert an 12/24V und AGND | 
 LED-Zustand | Farbe, leuchtend oder blinkend, Zeitpunkt und Dauer | 
 Anlernstatus | Wann und wie von der WiPro bestätigt | 
 Montageort | Höhe, Abstand zu Heizung/Batterie, Entfernung und Hindernisse zur WiPro | 
 Alarmgeber | WiPro-Sirene, Fahrzeughupe, Blinker, Back-up Sirene | 
 Pro-Finder | Vorhanden, betriebsbereit, SMS empfangen oder nicht | 
 Alarm OUT | Belegung und angeschlossene Last | 
 Ereignisumgebung | Gasgeräte, Aerosole, Reiniger, Alkohol oder andere Dämpfe | 
 Bereits geprüft | Konkrete, spannungsfrei ausgeführte Schritte | 

## Querverweise

WiPro III — Funk-Alarmsystem für Freizeitfahrzeuge 

Anlernvorgang — Funk-Zubehör an WiPro III anlernen 

G.A.S. — Standalone-Gaswarner mit interner Sirene 

G.A.S.-pro III — Gaswarner für Freizeitfahrzeuge 

CO-Sensor — Kohlenmonoxid-Zusatzsensor 

Pro-Finder — GSM/GPS Telemetriemodul 

Sirenen und Hupen — Akustische Alarmmittel 

Störungsbeseitigung — Sichere Diagnose häufiger Probleme 

Artikelnummern-Register — Produkte und Zubehör 

Systemüberblick — THITRONIK-Produktwelt 

Glossar — Fachbegriffe im THITRONIK-System
