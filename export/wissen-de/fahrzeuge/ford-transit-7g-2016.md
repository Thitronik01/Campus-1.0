# Ford Transit 7. Generation (2016–2019)

Route: /de/fahrzeuge/ford-transit-7g-2016 | Stand: 2026-07-19 | Sichtbarkeit: standard
Quelle: Thitronik Online/project-data/runtime/wiki/wiki-articles/de/fahrzeuge/ford-transit-7g-2016.json

---
Ford Transit 7. Generation (2016–2019)

Dieser Artikel beschreibt den Einbau einer WiPro III in Ford Transit und Transit Custom der 7. Generation von 2016 bis 2019. Das fahrzeugspezifische Einbauhandbuch Stand 12/20 bezeichnet den Geltungsbereich als „2016+“; innerhalb dieses Projekts endet diese Seite vor dem separat dokumentierten Facelift ab 2019.

Wichtige Bedienabgrenzung: Die originale Ford-Funkfernbedienung kann nur bei Fahrzeugen ohne Deadlock ausgewertet werden. Bei vorhandenem Deadlock muss die WiPro mit einem THITRONIK® Funk-Handsender 868 geschärft und entschärft werden.

## Geltungsbereich

Merkmal | Vorgabe | 
 Fahrzeuge | Ford Transit und Transit Custom, 7. Generation | 
 Projektabgrenzung | 2016–2019; Facelift separat behandeln | 
 System | WiPro III | 
 Mindeststand | 0823-013 / 5.6 | 
 Erforderliches Set laut Fahrzeuganleitung | Ford-Set für WiPro ab Seriennummer 0823-013 | 
 Fahrzeugprofil | SW2 + SW4 + SW6 auf ON ; alle übrigen Schalter OFF | 
 Originalfernbedienung | nur ohne Deadlock auswertbar | 
 Zentralverriegelungsleitungen | blau und blau/schwarz werden nicht angeschlossen | 
 Hauptanschlussbereich | Bodycomputer, Stecker J1 und J2 mit schwarzem Einsatz | 

Die Fahrzeug-PDF nennt die Seriennummer 0823-013 , jedoch keinen Softwarestand . 5.6 stammt ergänzend aus der freigegebenen Projektmatrix. Siehe Seriennummern und Softwarestände .

## Deadlock-Variante und Bedienweg bestimmen

Fahrzeugausstattung | Schärfen | Entschärfen / Alarmunterbrechung | Sicherheitsbedeutung | 
 Deadlock vorhanden | nach dem Verriegeln zwingend mit Funk-Handsender 868 | Funk- Handsender 868 | Originalfernbedienung wird nicht sicher ausgewertet | 
 Deadlock nicht vorhanden | Verriegelungstaste der originalen Ford-Fernbedienung schärft WiPro automatisch | Originalfernbedienung ist auswertbar; der dokumentierte Test unterbricht mit Funk-Handsender | Fahrzeug- und Alarmbedienung können gekoppelt sein | 

Deadlock vor dem Einbau am konkreten Fahrzeug eindeutig feststellen. Die Anleitung gibt für Fahrzeuge mit Deadlock bewusst einen mechanischen Einbruchtest von außen vor. Ohne Deadlock wird zusätzlich das Öffnen von innen mit dem Türgriff geprüft.

Die blauen Zentralverriegelungsleitungen bleiben in beiden Varianten unbenutzt und einzeln isoliert. Sie dürfen nicht als Ersatz für eine unsichere Originalschlüsselauswertung angeschlossen werden.

## DIP-Profil einstellen

Das Schalterbild der fahrzeugspezifischen Anleitung zeigt SW2 + SW4 + SW6 . Diese visuell bestätigte Stellung stimmt mit der freigegebenen Kompatibilitätsmatrix überein und ersetzt die fehlerhafte Altbestandsangabe SW1 + SW2 .

Spannungsversorgung der WiPro vollständig entfernen.

Sicherstellen, dass weder der 20-polige WiPro-Stecker noch ein Pro-Finder -Stecker eingesteckt ist.

WiPro-Gehäuse vorsichtig öffnen.

SW2 , SW4 und SW6 auf ON stellen.

SW1 , SW3 , SW5 , SW7 und SW8 auf OFF stellen, sofern keine separat dokumentierte optionale Funktion vorgesehen ist.

Stellung fotografisch oder auf der Arbeitskarte dokumentieren.

Gehäuse schließen und erst danach weiterarbeiten.

Blaue und blau/schwarze WiPro-Leitung einzeln isolieren.

WiPro-Leitung | Behandlung | Grund | 
 blau | nicht anschließen, einzeln isolieren | Zentralverriegelungsleitung wird nicht verwendet | 
 blau/schwarz | nicht anschließen, einzeln isolieren | Zentralverriegelungsleitung wird nicht verwendet | 

## Sicherheit und Arbeitsvorbereitung

Arbeiten an Fahrzeugelektrik, CAN-Bus , Airbag-Umfeld und Bodycomputer gehören in eine qualifizierte Fachwerkstatt.

Vor Beginn Fahrzeughupe, Warnlampen, Beleuchtung und Fehlerspeicher prüfen und vorhandene Fehler dokumentieren.

Anschlussarbeiten ausschließlich im spannungsfreien Zustand ausführen.

Stecker, Einsatz, Pinnummer, Leitungsfarbe und gemessenes Signal immer gemeinsam verifizieren.

Ungenutzte Ein- und Ausgänge einzeln isolieren und Leitungen zugentlastet vor scharfen oder bewegten Teilen schützen.

Weichen Fahrzeug, Bodycomputer oder Steckverbinder von der Anleitung ab, Arbeiten stoppen und Hersteller beziehungsweise THITRONIK-Support kontaktieren.

Hilfsmittel | Verwendung | 
 Ford-Set für WiPro ab 0823-013 | fahrzeugspezifischer Anschluss | 
 Funk-Handsender 868 | bei Deadlock zwingend; außerdem für dokumentierte Alarmunterbrechung | 
 Kombizange oder Wasserpumpenzange | Demontage und Montage | 
 Kreuzschlitzschraubendreher PH2 und Torx 25 | Armaturenbrettverkleidung und Gerüst | 
 Akku-Bohrschrauber mit 8-mm -Bohrer | Status-LED | 
 Multimeter und geeignetes Crimpwerkzeug | Signalprüfung und sichere Verbindungen | 

## Armaturenbrettverkleidung und Bodycomputer freilegen

Armaturenbrettverkleidung ausclipsen.

Verkleidung in Richtung Fahrersitz abziehen.

Sämtliche Schrauben des darunterliegenden Gerüsts entfernen.

Becherhalter abnehmen und die darunterliegende zusätzliche Schraube lösen.

Gerüst ebenfalls in Richtung Fahrersitz abnehmen.

Bodycomputer und Steckbereiche zugänglich machen.

Stecker J1 anhand der Abbildung und Kennzeichnung identifizieren.

Stecker J2 mit seinem schwarzen Einsatz eindeutig identifizieren.

Den separat abgebildeten CAN-Abgriffspunkt lokalisieren.

Kabelbäume und Stecker nicht unter Zug setzen. Die Markierungen am tatsächlichen Fahrzeug sind maßgeblich.

## Masseverbindung herstellen

Der dokumentierte Massepunkt liegt links unten neben dem Bodycomputer an der metallischen Fahrzeugstruktur.

Massepunkt anhand der Abbildung und realen Karosserieverbindung bestimmen.

Kontaktfläche auf festen Sitz, Korrosion und Lackreste prüfen.

Schwarze WiPro-Leitung mit Ringöse dort auflegen.

Verbindung fest anziehen, ohne die Ringöse zu verdrehen.

Durchgang und Spannungsabfall messen.

## Leitungen am Bodycomputer anschließen

Anschluss | Ford-Leitung | WiPro-Leitung | Funktion | 
 J1 Pin 2 | gelb/braun | gelb | Zündung | 
 J1 Pin 11 | rot oder violett/rot | rot | +12 V über Sicherung 18 | 
 J2 , schwarzer Einsatz, Pin 18 | blau/weiß | rosa | Fahrzeughupe | 
 J2 , schwarzer Einsatz, Pin 19 | braun/gelb | rot/rosa | Warnblinker | 

J1 und J2 mit schwarzem Einsatz spannungsfrei identifizieren.

Gelb/braun an J1 Pin 2 messen und mit gelb WiPro verbinden.

An J1 Pin 11 je nach Fahrzeug rote oder violett/rote Leitung identifizieren.

Versorgung an Pin 11 belastbar messen und mit rot WiPro verbinden.

Sicherung 18 als zugehörigen Versorgungsweg prüfen und dokumentieren.

Blau/weiß an J2 Pin 18 mit rosa WiPro verbinden.

Braun/gelb an J2 Pin 19 mit rot/rosa WiPro verbinden.

Alle Verbindungen einzeln sichern, isolieren und auf Zugfestigkeit prüfen.

J1 und J2 vollständig verriegeln und Kabelbäume zugentlasten.

Die zwei möglichen Ford-Farben an J1 Pin 11 sind fahrzeugabhängige Alternativen, keine zwei gleichzeitig anzuschließenden Versorgungsleitungen.

## CAN-Leitungen anschließen

Der CAN-Bus wird an dem in der Anleitung separat gezeigten zweipoligen Abgriff in der Nähe des Bodycomputers angeschlossen; die Primärquelle nennt dort keine Pinnummern.

Ford-Leitung | WiPro-Leitung | Funktion | 
 violett/orange | violett/orange | CAN-Low | 
 weiß/orange oder grau/orange | weiß/orange | CAN-High | 

Abgriffspunkt anhand der Fahrzeugabbildung eindeutig bestimmen.

Violett/orange mit violett/orange WiPro verbinden.

Je nach Fahrzeug weiß/orange oder grau/orange als CAN-High identifizieren und mit weiß/orange WiPro verbinden.

Signale und Paarzugehörigkeit messtechnisch prüfen.

Verdrillung nur so weit wie erforderlich öffnen.

Verbindungen sichern und CAN-Paar wieder mechanisch schützen.

CAN-High und CAN-Low nicht vertauschen. Für den separat gezeigten CAN-Abgriff werden bewusst keine nicht belegten Pinnummern ergänzt.

## Status-LED montieren

Die Fahrzeuganleitung zeigt die LED in der runden Ablage links im Armaturenbrett. Einen anderen Montageort vorher mit dem Kunden klären.

Rückseite des Montageorts auf Leitungen, Luftkanäle und Bauteile prüfen.

Loch mit 8 mm Durchmesser bohren.

Status-LED einsetzen.

Rot/schwarzes LED-Kabel mit weißem Steckverbinder am Gegenstück des WiPro-Kabelsatzes anschließen.

Sichtbarkeit der LED prüfen.

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

Die Anleitung dokumentiert Funk-Magnetkontakte 868, Art. 100757 und 100758 . Siehe Funk-Magnetkontakt 868 .

Prüffeld | Vorgabe | 
 Platinenrichtung | Sende-LED weist vom Magneten weg | 
 Fehlmontage | Anlernen möglich, aber keine Alarmierung | 
 Geschlossener Magnetabstand | 22–30 mm | 
 Tür-/Klappenmontage | Sender am Rahmen, Magnet am beweglichen Teil | 
 Klebefläche | sauber, trocken und fettfrei | 
 Verarbeitung | nicht unter 15 °C | 
 Endfestigkeit | nach etwa 24 Stunden | 
 Große Abstände / Antenne | Adapter 100428 oder 100729 prüfen | 

Kontakte vor der Montage anlernen und am Einbauort auf Reichweite prüfen.

Platine mit der Sende-LED vom Magneten weg einsetzen.

Magnet geschlossen im Bereich 22–30 mm und nicht jenseits der roten Grenzlinie positionieren.

Klebeflächen reinigen, trocknen und entfetten.

Oberhalb 15 °C kleben und während der ersten 24 Stunden nicht voll belasten.

Bei Bedarf markierte Schraubpunkte oder Montageadapter verwenden.

Gaswarner und Kabelschleife nach deren eigenen Anleitungen montieren.

## Funktionstest und Bedienquittungen

### Fahrzeug mit Deadlock

Fahrzeugtüren und Kontakte schließen.

Fahrzeug mit der originalen Ford-Fernbedienung verriegeln.

WiPro mit dem angelernten THITRONIK® Funk-Handsender 868 schärfen.

Einen Piepton, einmaliges Aufleuchten der Blinker und Blinken der Status-LED prüfen.

Fahrertür von außen mit dem mechanischen Schlüssel aufschließen und öffnen.

Akustischen Alarm von etwa 30 Sekunden und optischen Alarm von etwa 180 Sekunden prüfen.

Alarm mit dem Funk-Handsender unterbrechen und Alarmspeicher-Blinkfolge auswerten.

### Fahrzeug ohne Deadlock

Fahrzeugtüren und Kontakte schließen.

Verriegelungstaste der originalen Ford-Fernbedienung drücken.

Prüfen, dass WiPro automatisch schärft, einmal piept und die Status-LED blinkt.

Fahrertür von innen mit dem Türgriff oder von außen mit dem mechanischen Schlüssel öffnen.

Akustischen Alarm 30 Sekunden und optischen Alarm 180 Sekunden prüfen.

Alarm mit dem Funk-Handsender unterbrechen und Alarmspeicher-Blinkfolge auswerten.

Weitere Tür- und Funk-Sensoren einzeln testen.

## CAN- und Funkdiagnose

### CAN-Diagnose

Taster an WiPro kurz drücken, bis die Status-LED am Kabelbaum blinkt.

Originalfernbedienung bei einem Fahrzeug ohne Deadlock oder Warnblinker betätigen.

Prüfen, ob die LED abhängig vom CAN-Datenverkehr flackert.

Bleibt die Reaktion aus, CAN-Farben, Abgriff und High-/Low-Zuordnung prüfen.

Diagnosemodus mit erneutem kurzen Tastendruck beenden.

### Funkdiagnose

Jeden angelernten Sender am endgültigen Einbauort auslösen. Fehlt die akustische Empfangsquittierung, Anlernstatus, Metallabschirmung, Antennenlage, Magnetabstand und Adapter prüfen.

## Typische Fehlerbilder

Fehlerbild | Prüfung / Maßnahme | 
 DIP-Profil funktioniert nicht | SW2 + SW4 + SW6 prüfen; Altangabe SW1 + SW2 nicht verwenden | 
 Originalfernbedienung steuert WiPro bei Deadlock nicht | korrekt; Funk-Handsender 868 verwenden | 
 WiPro schärft ohne Deadlock nicht automatisch | Deadlock-Zuordnung, CAN-Anschluss und Originalfernbedienung prüfen | 
 Keine CAN-Aktivität | violett/orange sowie weiß/orange oder grau/orange und High/Low prüfen | 
 WiPro ohne Versorgung | J1 Pin 11, rot beziehungsweise violett/rot, Sicherung 18 und Masse prüfen | 
 Zündung nicht erkannt | J1 Pin 2, gelb/braun und gelb WiPro messen | 
 Fahrzeughupe bleibt stumm | J2 schwarzer Einsatz Pin 18, blau/weiß und rosa prüfen | 
 Warnblinker ohne Funktion | J2 schwarzer Einsatz Pin 19, braun/gelb und rot/rosa prüfen | 
 Ungewollte ZV-Reaktion | blau und blau/schwarz müssen unverbunden und isoliert sein | 
 LED ohne Funktion | 8-mm -Montage, rot/schwarzes Kabel und weißen Stecker prüfen | 
 Kontakt lernt sich an, alarmiert aber nicht | Platine drehen; Sende-LED muss vom Magneten wegweisen | 
 Funkempfang unzuverlässig | Metall, Antenne, 22–30 mm und Adapter prüfen | 

Siehe Störungsbeseitigung .

## Quellenbasis und Redaktionsentscheidung

Primärquelle ist das neunseitige Einbauhandbuch WiPro III – Ford Transit + Transit Custom, 7. Generation, 2016+ , Stand 12/20 ; alle Seiten wurden textlich und visuell geprüft.

Seite 2 belegt Mindestseriennummer 0823-013 , Deadlock-Abgrenzung, DIP-Bild SW2 + SW4 + SW6 und unbenutzte ZV-Leitungen.

Seiten 3 und 4 belegen Demontage, Masse, J1 Pin 2/11, J2 schwarzer Einsatz Pin 18/19, CAN-Farben, Sicherung 18 , LED und etwa 10 Sekunden Anlerntaster.

Seite 5 belegt die getrennten Funktionstests mit und ohne Deadlock, 30 / 180 Sekunden und Alarmspeicher.

Seiten 6 bis 9 belegen Kontakte 100757 / 100758 , Platinenrichtung, Montage, Klebewerte, Adapter 100428 / 100729 und 22–30 mm .

Das allgemeine Installationshandbuch 1.8 ergänzt spannungsfreie DIP-Arbeit, CAN-/Funkdiagnose und systemweite Fehlerprüfung.

Software 5.6 stammt aus der freigegebenen Projektmatrix; die Fahrzeug-PDF nennt nur 0823-013 .

Die fehlerhafte Altbestandsstellung SW1 + SW2 wurde durch die visuell bestätigte Primärquellenstellung SW2 + SW4 + SW6 ersetzt.

Für den separaten CAN-Abgriff wurden keine Pinnummern rekonstruiert; maßgeblich bleiben Abgriffspunkt, Farben, Paar und Messung.

Verwendete Primärquellen:

D:/Thitronik WIKI (ml)/wiki/de/wipro_iii_ford_transit_7._generation_2016-2019.pdf 

D:/Thitronik WIKI (ml)/wiki/de/wipro_iii-installationsanleitung_1.8.pdf 

## Verwandte Artikel

WiPro III 

Fahrzeugkompatibilität 

Seriennummern und Softwarestände 

Anlernvorgang 

Funk-Handsender 868 

Funk-Magnetkontakt 868 

Sirenen und Hupen 

Störungsbeseitigung 

Ford Transit 7G 2014–2015 

Ford Transit Facelift
