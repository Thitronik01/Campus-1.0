# Ford Transit 7. Generation Facelift (2019–07/2024)

Route: /de/fahrzeuge/ford-transit-7g-facelift | Stand: 2026-07-20 | Sichtbarkeit: standard
Quelle: Thitronik Online/project-data/runtime/wiki/wiki-articles/de/fahrzeuge/ford-transit-7g-facelift.json

---
Ford Transit 7. Generation Facelift (2019–07/2024)

Dieser Artikel beschreibt den Einbau einer WiPro III in Ford Transit sowie Transit/Tourneo Custom der 7. Generation mit Facelift. Innerhalb dieses Projekts gilt die Seite für Ford Transit von 2019 bis einschließlich 07/2024 und für Transit/Tourneo Custom von 2019 bis zum Modellwechsel 2023.

Wichtige Bedienabgrenzung: Die originale Ford-Funkfernbedienung kann die WiPro nur bei Fahrzeugen ohne Deadlock sicher steuern. Bei vorhandenem Deadlock muss die Alarmanlage mit einem THITRONIK® Funk-Handsender 868 geschärft und entschärft werden.

## Geltungsbereich

Merkmal | Vorgabe | 
 Fahrzeuge | Ford Transit 7G Facelift sowie Transit/Tourneo Custom 7G Facelift | 
 Projektabgrenzung | Transit 2019–07/2024; Transit/Tourneo Custom 2019–2023 | 
 System | WiPro III oder WiPro III safe.lock gemäß Ausstattungsprüfung | 
 Mindeststand WiPro III | 0823-016 / 6.1 gemäß freigegebener Projektmatrix | 
 Hardwarebasis laut Fahrzeuganleitung | Ford-Set für WiPro ab Seriennummer 0823-013 | 
 Mindeststand WiPro III safe.lock | Set 5298-001 / 7.4.0s | 
 Fahrzeugprofil | SW2 + SW4 + SW6 auf ON ; alle übrigen Schalter OFF | 
 Originalfernbedienung | nur ohne Deadlock auswertbar | 
 Hauptanschlussbereich | Bodycomputer, Lenksäule und Rückseite der OBD-Buchse | 

Die Fahrzeug-PDF nennt als Hardwarebasis nur „Ford Set für WiPro ab SN 0823-013 “. Der für dieses Facelift freigegebene Mindeststand 0823-016 / 6.1 sowie der safe.lock-Stand 5298-001 / 7.4.0s stammen aus der freigegebenen Fahrzeugkompatibilitätsmatrix .

Fahrzeuge der neuen Transit-Generation ab 07/2024 sowie Transit/Tourneo Custom ab 08/2023 werden separat unter Ford Transit 2024+ behandelt. Vor Beginn Modell, Erstzulassung und tatsächliche Fahrzeugelektrik gemeinsam prüfen; eine Erstzulassung allein identifiziert die Generation nicht zuverlässig.

## System- und Versionsstand festlegen

Einsatzfall | Mindeststand | Bedeutung | 
 WiPro III, Facelift 2019–07/2024 | 0823-016 / 6.1 | freigegebener Projektstand für die Standardausführung | 
 WiPro III safe.lock, Ford-Set | 5298-001 / 7.4.0s | erste freigegebene safe.lock-Ausführung für Transit 2019–2024 | 
 safe.lock mit Pro-Finder , Transit 2019–2024 | mindestens 5298-008 / 1.0.3sf | Korrektur des Aussperrschutzes in dieser Kombination | 
 Neue Fahrzeuggeneration | ab 5298-005 / 1.0.1sf ; separater Artikel | nicht auf dieses Fahrzeugprofil übertragen | 

Seriennummer und Softwarestand der vorhandenen WiPro dokumentieren.

Fahrzeugtyp und Deadlock-Ausstattung feststellen.

Entscheiden, ob die Standardausführung oder WiPro III safe.lock eingebaut wird.

Bei der Kombination aus safe.lock und Pro-Finder für Transit 2019–2024 mindestens 5298-008 / 1.0.3sf verwenden.

Bei nicht erreichtem Mindeststand die Arbeiten stoppen und ein geeignetes System beziehungsweise Update beschaffen.

Die Versionszuordnung ist zusätzlich unter Seriennummern und Softwarestände dokumentiert.

## Deadlock und Bedienweg bestimmen

Fahrzeugausstattung | Schärfen | Entschärfen / Alarmunterbrechung | Sicherheitsbedeutung | 
 Deadlock vorhanden | Fahrzeug verriegeln, danach WiPro mit Funk- Handsender 868 schärfen | Funk-Handsender 868 | Ford-Signal von Fernbedienung und mechanischem Schloss ist für WiPro nicht sicher unterscheidbar | 
 Deadlock nicht vorhanden | Verriegelungstaste der originalen Ford-Fernbedienung schärft WiPro automatisch | Originalfernbedienung ist auswertbar; dokumentierter Alarmtest wird mit Funk-Handsender beendet | Fahrzeug- und Alarmbedienung können gekoppelt sein | 

Bei vorhandenem Deadlock könnte ein Einbruch über das mechanische Türschloss sonst gleichzeitig die Alarmanlage entschärfen. Deshalb darf die Ford-Fernbedienung in dieser Variante nicht als alleiniger Alarm-Bedienweg verwendet werden.

Bei einer safe.lock-Installation muss die Fahrzeugoption Schaltsperre vorhanden, anwählbar und deaktiviert sein. Ist diese Voraussetzung am konkreten Fahrzeug nicht eindeutig erfüllt, safe.lock nicht freigeben.

## DIP-Profil einstellen

Das Schalterbild der fahrzeugspezifischen Anleitung zeigt eindeutig SW2 + SW4 + SW6 . Diese visuell bestätigte Stellung ersetzt die falsche Altbestandsangabe SW1 .

Spannungsversorgung der WiPro vollständig entfernen.

Sicherstellen, dass weder der 20-polige WiPro-Stecker noch ein Pro-Finder-Stecker eingesteckt ist.

WiPro-Gehäuse vorsichtig öffnen.

SW2 , SW4 und SW6 auf ON stellen.

SW1 , SW3 , SW5 , SW7 und SW8 auf OFF stellen, sofern keine separat dokumentierte optionale Funktion vorgesehen ist.

Schalterstellung dokumentieren.

Gehäuse schließen und erst danach weiterarbeiten.

Schalter | Stellung | 
 SW2 , SW4 , SW6 | ON | 
 SW1 , SW3 , SW5 , SW7 , SW8 | OFF | 

## Standardausführung und safe.lock abgrenzen

Die fahrzeugspezifische PDF dokumentiert den Standardanschluss. Dort werden die blauen Zentralverriegelungsleitungen nicht verwendet.

Ausführung | Blaue WiPro-Leitungen | Freigabebasis | 
 WiPro III gemäß Fahrzeug-PDF | blau und blau/schwarz nicht anschließen; einzeln isolieren | vollständiger Standardanschluss ist in der vorhandenen Fahrzeug-PDF belegt | 
 WiPro III safe.lock | nur nach passendem safe.lock-Kabelsatz und verifizierter fahrzeugspezifischer Belegung anschließen | Schwellen und Voraussetzungen sind projektintern belegt; die referenzierte Detailanleitung fehlt lokal | 

Die Standardanweisung „blau und blau/schwarz isolieren“ darf nicht auf eine freigegebene safe.lock-Verkabelung übertragen werden. Umgekehrt dürfen fehlende safe.lock-Pins nicht aus anderen Ford-Generationen rekonstruiert werden.

Der Projektbestand nennt ab Set-Stand 5298-006 eine geänderte Kontaktbauform an den blauen safe.lock-Leitungen. Für dieses ältere Fahrzeugprofil ist vor Verwendung die zum Kabelsatz passende Einbauunterlage einzuholen; Kontakte dürfen nicht ohne eindeutig belegte Arbeitsanweisung abgeschnitten oder ersetzt werden.

## Sicherheit und Arbeitsvorbereitung

Arbeiten an Fahrzeugelektrik, CAN-Bus , Airbag-Umfeld und Bodycomputer gehören in eine qualifizierte Fachwerkstatt.

Vor Beginn Fahrzeughupe, Warnlampen, Beleuchtung und Fehlerspeicher prüfen und vorhandene Fehler dokumentieren.

Anschlussarbeiten ausschließlich im spannungsfreien Zustand ausführen.

Stecker, Einsatz, Pinnummer, Leitungsfarbe und gemessenes Signal immer gemeinsam verifizieren.

Ungenutzte Ein- und Ausgänge einzeln isolieren und Leitungen zugentlastet vor scharfen oder bewegten Teilen schützen.

Weichen Fahrzeug, Bodycomputer oder Steckverbinder von der Anleitung ab, Arbeiten stoppen und Hersteller beziehungsweise THITRONIK-Support kontaktieren.

Hilfsmittel | Verwendung | 
 Ford-Set für WiPro ab 0823-013 | fahrzeugspezifischer Standardanschluss | 
 Funk-Handsender 868 | bei Deadlock zwingend; außerdem für den dokumentierten Alarmtest | 
 Kombizange oder Wasserpumpenzange | Demontage und Montage | 
 Kreuzschlitzschraubendreher PH2 und Torx 25 | Armaturenbrettverkleidung und Rahmen | 
 Akku-Bohrschrauber mit 8-mm -Bohrer | Status-LED | 
 Multimeter und geeignetes Crimpwerkzeug | Signalprüfung und sichere Verbindungen | 

## Armaturenbrett und Bodycomputer freilegen

Armaturenbrettverkleidung ausclipsen.

Verkleidung in Richtung Fahrersitz abziehen.

Sämtliche Schrauben des darunterliegenden Rahmens entfernen.

Becherhalter abnehmen und die darunterliegende zusätzliche Schraube lösen.

Rahmen ebenfalls in Richtung Fahrersitz abnehmen.

Bodycomputer und Steckerbereiche zugänglich machen.

Stecker J1 anhand der Kennzeichnung identifizieren.

Stecker J2 und dessen schwarzen Einsatz eindeutig identifizieren.

Kabelbäume und Steckverbindungen nicht unter Zug setzen.

## Masse und Leitungen am Bodycomputer anschließen

Anschluss | Ford-Leitung | WiPro-Leitung | Funktion | 
 J1 Pin 11 | rot oder violett/rot | rot | +12 V über Sicherung 18 | 
 J2 , schwarzer Einsatz, Pin 18 | blau/weiß | rosa | Fahrzeughupe | 
 J2 , schwarzer Einsatz, Pin 19 | braun/gelb | rot/rosa | Warnblinker | 
 Karosseriemasse, Klemme 31 | Massepunkt | schwarz mit Ringöse | Masse | 

J1 und J2 mit schwarzem Einsatz spannungsfrei identifizieren.

An J1 Pin 11 je nach Fahrzeug rote oder violett/rote Leitung identifizieren.

Versorgung an Pin 11 belastbar messen und mit rot WiPro verbinden.

Sicherung 18 als zugehörigen Versorgungsweg prüfen und dokumentieren.

Blau/weiß an J2 Pin 18 mit rosa WiPro verbinden.

Braun/gelb an J2 Pin 19 mit rot/rosa WiPro verbinden.

Dokumentierten Karosseriemassepunkt auf festen Sitz, Korrosion und Lackreste prüfen.

Schwarze WiPro-Leitung mit Ringöse auflegen, festziehen und Spannungsabfall messen.

Alle Verbindungen einzeln sichern, isolieren und zugentlasten.

Die zwei möglichen Ford-Farben an J1 Pin 11 sind fahrzeugabhängige Alternativen, keine zwei gleichzeitig anzuschließenden Versorgungsleitungen.

## Zündung an der Lenksäule anschließen

Anschluss | Ford-Leitung | WiPro-Leitung | Funktion | 
 Lenksäulenstecker Pin 1 | orange/weiß oder braun/gelb | gelb | Zündung | 

Lenksäulenstecker spannungsfrei freilegen und Pin 1 eindeutig bestimmen.

Je nach Fahrzeug orange/weiße oder braun/gelbe Leitung an Pin 1 identifizieren.

Zündungssignal messtechnisch bestätigen.

Leitung mit gelb WiPro verbinden.

Verbindung isolieren, zugentlasten und Lenksäulenbewegung kontrollieren.

## CAN-Bus an der OBD-Buchse anschließen

Der CAN-Abgriff liegt laut Fahrzeuganleitung an der Rückseite der OBD-Buchse. Die Primärquelle nennt dort keine Pinnummern; deshalb werden keine Nummern ergänzt.

Ford-Leitung | WiPro-Leitung | Funktion | 
 violett/orange | violett/orange | CAN-Low | 
 grau/orange | weiß/orange | CAN-High | 

Rückseite der OBD-Buchse freilegen.

Violett/orange und grau/orange als zusammengehöriges CAN-Paar identifizieren.

Signale und High-/Low-Zuordnung messtechnisch prüfen.

Violett/orange Ford mit violett/orange WiPro verbinden.

Grau/orange Ford mit weiß/orange WiPro verbinden.

Verdrillung nur so weit wie erforderlich öffnen.

Verbindungen sichern und CAN-Paar wieder mechanisch schützen.

## Status-LED montieren

Montageort mit guter Sichtbarkeit und ausreichendem Freiraum auf der Rückseite wählen.

Rückseite auf Leitungen, Luftkanäle und Bauteile prüfen.

Loch mit 8 mm Durchmesser bohren.

Status-LED einsetzen.

Rot/schwarzes LED-Kabel über den weißen Steckverbinder mit dem Gegenstück des WiPro-Kabelsatzes verbinden.

Sichtbarkeit und Funktion der LED prüfen.

## Pro-Finder montieren

Die Fahrzeuganleitung zeigt einen möglichen Montagebereich hinter der demontierten Armaturenbrettverkleidung. Das Modul wird dort von unten befestigt. Der Abbildungsort ist ein Vorschlag und ersetzt nicht die Prüfung von Antennenempfang, Leitungswegen und Befestigungsraum.

Montageort auf trockene Lage, festen Untergrund und ausreichenden Abstand zu störenden Metallflächen prüfen.

Pro-Finder entsprechend seiner eigenen Anleitung anschließen und befestigen.

Leitungen zugentlastet verlegen.

Mobilfunk- und GPS-Funktion vor dem Zusammenbau prüfen.

Bei safe.lock in diesem Fahrzeugbereich mindestens Set 5298-008 / 1.0.3sf verwenden.

Siehe Pro-Finder .

## Funk-Zubehör anlernen

Alle Funk-Komponenten müssen einmalig angelernt werden und den Frequenzzusatz 868 tragen.

Taster rechts neben dem Anschlussstecker etwa 10 Sekunden halten, bis die Anlage piept.

Prüfen, dass die Status-LED dauerhaft leuchtet.

Jeden Funk-Magnetkontakt 868 zwei- bis dreimal durch mehr als 30 mm Magnetabstand auslösen.

Tasten jedes Funk-Handsenders 868 zwei- bis dreimal drücken.

Funk-Gaswarner 868 einschalten und Funk-Kabelschleife 868 aus ihrer Halterung nehmen.

Nach jeder Komponente Piepton und kurzes Erlöschen der LED abwarten.

Anlernmodus durch kurzes Spannungsfreischalten oder kurzen Tastendruck beenden.

Alle gespeicherten Komponenten dokumentieren.

Siehe Anlernvorgang .

## Funk-Magnetkontakte montieren

Die Fahrzeuganleitung dokumentiert Funk-Magnetkontakte 868, Art. 100757 und 100758 . Siehe Funk-Magnetkontakt 868 .

Prüffeld | Vorgabe | 
 Platinenrichtung | Sende-LED weist vom Magneten weg | 
 Fehlmontage | Anlernen möglich, aber keine Alarmierung | 
 Geschlossener Magnetabstand | 22–30 mm | 
 Tür-/Klappenmontage | Sender am Rahmen, Magnet am beweglichen Teil | 
 Klebefläche | sauber, trocken und fettfrei | 
 Verarbeitung | nicht unter 15 °C | 
 Endfestigkeit | nach etwa 24 Stunden | 
 Große Abstände / Antennenausrichtung | Adapter 100428 oder 100729 prüfen | 

Kontakte vor der Montage anlernen und am Einbauort auf Reichweite prüfen.

Platine mit der Sende-LED vom Magneten weg in das Gehäuse einsetzen.

Magnet geschlossen im Bereich 22–30 mm und nicht jenseits der roten Grenzlinie positionieren.

Klebeflächen reinigen, trocknen und entfetten.

Oberhalb 15 °C kleben und während der ersten 24 Stunden nicht voll belasten.

Bei Bedarf die markierten Schraubpunkte oder Montageadapter verwenden.

Jeden Kontakt nach Montage einzeln auf Alarmierung prüfen.

## Funktionstest und Bedienquittungen

### Fahrzeug mit Deadlock

Fahrzeugtüren und Kontakte schließen.

Fahrzeug mit der originalen Ford-Fernbedienung verriegeln.

WiPro mit dem angelernten THITRONIK® Funk-Handsender 868 schärfen.

Einen Piepton, einmaliges Aufleuchten der Blinker und Blinken der Status-LED prüfen.

Fahrertür von außen mit dem mechanischen Schlüssel aufschließen und öffnen.

Akustischen Alarm von etwa 30 Sekunden und optischen Alarm von etwa 180 Sekunden prüfen.

Alarm mit dem Funk-Handsender unterbrechen.

Alarmspeicher-Blinkfolge der Status-LED auswerten.

### Fahrzeug ohne Deadlock

Fahrzeugtüren und Kontakte schließen.

Verriegelungstaste der originalen Ford-Fernbedienung drücken.

Prüfen, dass WiPro automatisch schärft, einmal piept und die Status-LED blinkt.

Fahrertür von innen mit dem Türgriff oder von außen mit dem mechanischen Schlüssel öffnen.

Akustischen Alarm von etwa 30 Sekunden und optischen Alarm von etwa 180 Sekunden prüfen.

Alarm mit dem Funk-Handsender unterbrechen.

Alarmspeicher-Blinkfolge auswerten und weitere Türen sowie Funksensoren einzeln testen.

## CAN-, Funk- und Systemdiagnose

### CAN-Diagnose

Taster an der WiPro kurz drücken, bis die Status-LED am Kabelbaum blinkt.

Bei einem Fahrzeug ohne Deadlock die Originalfernbedienung oder alternativ den Warnblinker betätigen.

Prüfen, ob die LED abhängig vom CAN-Datenverkehr flackert.

Bleibt die Reaktion aus, CAN-Farben, Abgriff an der OBD-Rückseite und High-/Low-Zuordnung prüfen.

Diagnosemodus mit erneutem kurzen Tastendruck beenden.

### Funkdiagnose

Jeden angelernten Sender am endgültigen Einbauort auslösen. Fehlt die akustische Empfangsquittierung, Anlernstatus, Metallabschirmung, Antennenlage, Magnetabstand und gegebenenfalls Montageadapter prüfen.

### Abschlussprüfung

Fahrzeugdiagnose auf neue Fehlereinträge prüfen.

Hupe, Warnblinker, Zündungserkennung, Status-LED und alle Sensoren einzeln testen.

Bei eingebautem Pro-Finder Mobilfunk-, GPS- und Alarmübertragung testen.

Bei safe.lock Verriegelung, Entriegelung, Campingmodus und Aussperrschutz nach der zugehörigen Anleitung prüfen.

Alle Verkleidungen spannungsfrei, klapperfrei und ohne eingeklemmte Leitungen montieren.

Bedienweg und Deadlock-Besonderheit an den Nutzer übergeben.

## Typische Fehlerbilder

Fehlerbild | Prüfung / Maßnahme | 
 Fahrzeugprofil funktioniert nicht | SW2 + SW4 + SW6 prüfen; Altangabe SW1 nicht verwenden | 
 Originalfernbedienung steuert WiPro bei Deadlock nicht | korrekt; Funk-Handsender 868 verwenden | 
 WiPro schärft ohne Deadlock nicht automatisch | Deadlock-Zuordnung, CAN-Anschluss und Originalfernbedienung prüfen | 
 Keine CAN-Aktivität | violett/orange und grau/orange an der OBD-Rückseite sowie High/Low prüfen | 
 WiPro ohne Versorgung | J1 Pin 11, rot beziehungsweise violett/rot, Sicherung 18 und Masse prüfen | 
 Zündung nicht erkannt | Lenksäulenstecker Pin 1, orange/weiß beziehungsweise braun/gelb und gelb WiPro prüfen | 
 Fahrzeughupe bleibt stumm | J2 schwarzer Einsatz Pin 18, blau/weiß und rosa prüfen | 
 Warnblinker ohne Funktion | J2 schwarzer Einsatz Pin 19, braun/gelb und rot/rosa prüfen | 
 Ungewollte ZV-Reaktion bei Standard-WiPro | blau und blau/schwarz müssen unverbunden und isoliert sein | 
 safe.lock-Belegung unklar | nicht aus Standard-PDF oder anderer Ford-Generation ableiten; passende Unterlage beschaffen | 
 Aussperrschutz mit safe.lock und Pro-Finder fehlerhaft | Set-Stand prüfen; für Transit 2019–2024 mindestens 5298-008 / 1.0.3sf | 
 LED ohne Funktion | 8-mm -Montage, rot/schwarzes Kabel und weißen Stecker prüfen | 
 Kontakt lernt sich an, alarmiert aber nicht | Platine drehen; Sende-LED muss vom Magneten wegweisen | 
 Funkempfang unzuverlässig | Metall, Antennenlage, 22–30 mm und Adapter prüfen | 

Siehe Störungsbeseitigung .

## Quellenbasis und Redaktionsentscheidung

Primärquelle für den Standardanschluss ist das elfseitige Einbauhandbuch WiPro III – Ford Transit, 7. Generation Facelift, 2019+ , Stand 12/20 ; alle Seiten wurden textlich ausgewertet und visuell geprüft.

Seite 2 belegt die Hardwarebasis ab 0823-013 , Deadlock-Abgrenzung, DIP-Bild SW2 + SW4 + SW6 und die im Standardanschluss unbenutzten blauen Zentralverriegelungsleitungen.

Seiten 3 bis 6 belegen Demontage, J1 Pin 11, J2 mit schwarzem Einsatz Pin 18/19, Masse, Lenksäulenstecker Pin 1, CAN an der OBD-Rückseite, Status-LED und einen möglichen Pro-Finder-Montageort.

Seite 7 belegt Anlernvorgang, getrennte Funktionstests mit und ohne Deadlock, 30 / 180 Sekunden sowie Alarmspeicher.

Seiten 8 bis 11 belegen Kontakte 100757 / 100758 , Platinenrichtung, Klebe- und Schraubmontage, Adapter 100428 / 100729 und 22–30 mm .

Das allgemeine Installationshandbuch Version 1.8 ergänzt Sicherheits-, CAN-/Funkdiagnose- und systemweite Prüfschritte.

0823-016 / 6.1 , 5298-001 / 7.4.0s , 5298-008 / 1.0.3sf und die Schaltsperren-Voraussetzung stammen ergänzend aus der freigegebenen Projektmatrix und Versionshistorie.

Die referenzierten internen Dateien Seriennummer 5298 Wipro III safe.lock Ford Transit 2019.csv , Fahrzeugbesonderheiten.docx und WiPro III 7safe.lock.docx sind lokal nicht auffindbar. Ihre Referenzen bleiben zur Nachvollziehbarkeit erhalten; nicht belegte safe.lock-Anschlusspins oder Umbauarbeiten wurden nicht rekonstruiert.

Die fehlerhafte Altbestandsstellung SW1 wurde durch die visuell bestätigte Primärquellenstellung SW2 + SW4 + SW6 ersetzt.

Vorhandene Primärquellen:

D:/Thitronik WIKI (ml)/wiki/de/wipro_iii_ford_transit_2019.pdf 

D:/Thitronik WIKI (ml)/wiki/de/wipro_iii-installationsanleitung_1.8.pdf 

Im Redaktionsbestand referenziert, lokal jedoch nicht vorhanden:

sources/Seriennummer 5298 Wipro III safe.lock Ford Transit 2019.csv 

sources/Fahrzeugbesonderheiten.docx 

sources/WiPro III 7safe.lock.docx 

## Verwandte Artikel

WiPro III 

Fahrzeugkompatibilität 

Seriennummern und Softwarestände 

Anlernvorgang 

Funk-Handsender 868 

Funk-Magnetkontakt 868 

Pro-Finder 

Sirenen und Hupen 

Störungsbeseitigung 

Ford Transit 7G 2016–2019 

Ford Transit 2024+
