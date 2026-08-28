# Ford Transit 6. Generation (2006–2013)

Route: /de/fahrzeuge/ford-transit-6g | Stand: 2026-07-19 | Sichtbarkeit: standard
Quelle: Thitronik Online/project-data/runtime/wiki/wiki-articles/de/fahrzeuge/ford-transit-6g.json

---
Ford Transit 6. Generation (2006–2013)

Dieser Artikel beschreibt den Einbau einer WiPro III in den Ford Transit der 6. Generation von 2006 bis 2013. Das fahrzeugspezifische Einbauhandbuch Stand 12/20 dokumentiert DIP-Profil, Handschuhfach- und Sicherungskastenzugang, Massepunkt, CAN-Bus , Warnblinker, Zentralverriegelung, Fahrzeughupe, Zündung, Spannungsversorgung, Status-LED, Bedienlogik und Funktionstest.

Wichtige Bedienabgrenzung: Nur ein Fahrzeug mit Deadlock/Doppelverriegelung kann die WiPro über die originale Fahrzeugfernbedienung schärfen und entschärfen. Ohne Deadlock wird die WiPro mit dem grauen THITRONIK® Funk-Handsender bedient; der CAN-Anschluss wertet die Fahrerhaustüren trotzdem aus.

## Geltungsbereich

Merkmal | Vorgabe | 
 Fahrzeug | Ford Transit, 6. Generation | 
 Baujahre | 2006–2013 | 
 System | WiPro III | 
 Mindeststand laut freigegebener Kompatibilitätsmatrix | 0823-001 / 2.1 | 
 Fahrzeugprofil | SW1 + SW2 + SW6 auf ON ; alle übrigen Schalter OFF | 
 Montagebereich | hinter dem Handschuhfach an der Zentralelektronikbox | 
 Fahrzeugseitige Sicherung | F73 / 15 A | 
 Bedienung mit Originalfernbedienung | nur bei vorhandener Deadlock-/Doppelverriegelungsfunktion | 

Die Mindestschwelle stammt aus der freigegebenen Projektmatrix; das Fahrzeughandbuch selbst nennt keinen Serien- oder Softwarestand . Seriennummer und Software sind deshalb vor dem Einbau zusätzlich über Seriennummern und Softwarestände zu prüfen.

## DIP-Profil und Bedienvariante festlegen

Das fahrzeugspezifische Handbuch verlangt SW1 + SW2 + SW6 . Diese konkrete Stellung hat Vorrang vor der älteren allgemeinen Tabelle, die bei „Ford Transit ab 2006“ nur die Schalter 1 bis 4 abbildet und deshalb SW6 nicht aufführt.

Spannungsversorgung der WiPro vollständig entfernen.

Sicherstellen, dass weder der 20-polige WiPro-Stecker noch ein Pro-Finder -Stecker eingesteckt ist.

WiPro-Gehäuse vorsichtig öffnen.

SW1 , SW2 und SW6 auf ON stellen.

SW3 , SW4 , SW5 , SW7 und SW8 auf OFF stellen.

Schalterstellung fotografisch oder auf der Arbeitskarte dokumentieren.

Gehäuse schließen und erst danach mit der Installation fortfahren.

Fahrzeugausstattung | Bedienung der WiPro | Bedeutung für den CAN-Anschluss | 
 Deadlock/Doppelverriegelung vorhanden | Original-Fahrzeugfernbedienung; zum Schärfen zweimal „Verriegeln“ drücken | Originalbedienung und Fahrerhaustüren werden ausgewertet | 
 Deadlock/Doppelverriegelung nicht vorhanden | grauer Funk-Handsender 868 | CAN bleibt für die Auswertung der Fahrerhaustüren erforderlich | 

Deadlock verhindert auch das Öffnen der Fahrerhaustüren von innen. Vor der Funktionsprüfung muss deshalb geklärt sein, welche der beiden Bedienvarianten das konkrete Fahrzeug besitzt.

## Sicherheit und Arbeitsvorbereitung

Arbeiten an Fahrzeugelektrik, CAN-Bus, Airbag-Umfeld und Zentralverriegelung gehören in die Hände einer qualifizierten Fachwerkstatt.

Vor Beginn Fahrzeughupe, Warnlampen, Beleuchtung und Fehlerspeicher prüfen und vorhandene Fehler dokumentieren.

Anschlussarbeiten ausschließlich im spannungsfreien Zustand ausführen.

Steckerbezeichnung, Pinnummer, Leitungsfarbe und gemessenes Signal immer gemeinsam verifizieren.

Für C6 ausschließlich die vorgeschriebenen blauen gelgefüllten Abzweigverbinder verwenden; für C2 und C5 die vorgeschriebenen roten Abzweigverbinder.

Ungenutzte Ein- und Ausgänge einzeln isolieren; Leitungen zugentlastet und geschützt vor scharfen sowie bewegten Bauteilen verlegen.

Weichen Fahrzeug, Zentralelektronik oder Stecker vom Handbuch ab, Arbeiten stoppen und Hersteller beziehungsweise THITRONIK-Support kontaktieren.

Als Hilfsmittel nennt das Fahrzeughandbuch Kombizange, Seitenschneider, 8-mm -Steckschlüssel, Akku-Bohrschrauber und 8-mm -Bohrer. Zusätzlich sind Multimeter und geeignetes Crimpwerkzeug erforderlich.

## Funk-Zubehör vor dem Einbau anlernen

Funk-Komponenten vor der Montage anlernen, damit Empfang und Funktion noch bei zugänglicher Zentrale geprüft werden können.

Taster rechts neben dem Anschlussstecker drücken und halten, bis die Anlage piept und die Status-LED dauerhaft leuchtet.

Jeden Funk-Magnetkontakt , Funk-Gaswarner und jede Funk-Kabelschleife zwei- bis dreimal auslösen; am Funk- Handsender eine Taste drücken.

Nach jeder Komponente Piepton und kurzes Erlöschen der Status-LED als Speicherbestätigung abwarten.

Anlernmodus gemäß der allgemeinen Anleitung beenden und gespeicherte Komponenten dokumentieren.

Der vollständige Ablauf und die Abgrenzung zum Diagnosemodus stehen unter Anlernvorgang .

## Handschuhfach und Sicherungskasten zugänglich machen

Handschuhfach öffnen.

Beide seitlichen Klammern nach innen drücken und das Handschuhfach entriegeln.

Handschuhfach vollständig entnehmen.

Sicherungskasten entriegeln.

Die seitlichen Klammern des Sicherungskastens nach außen drücken und den Kasten herunterklappen.

Die Stecker C2 braun, C5 hellbraun und C6 weiß anhand von Farbe, Position und Beschriftung identifizieren.

Stecker und Kabelbäume nicht unter Zug setzen. Die im Handbuch gezeigte Steckerlage dient der Orientierung; die Kennzeichnung am tatsächlichen Fahrzeug bleibt maßgeblich.

## Montageplatte befestigen und Masse anschließen

Rechts von der Zentralelektronikbox befindet sich der dokumentierte Massepunkt.

Masseschraube mit einem 8-mm -Schlüssel lösen; das Handbuch weist auf einen sehr festen Sitz hin.

Montageplatte am Massepunkt einschieben.

Bereits vorhandene Ringösen zusammen mit der Masseöse der WiPro durch den Metallhalter verschrauben.

Masseschraube fest anziehen.

Kontrollieren, dass keine Ringöse locker sitzt oder verdreht unter Spannung steht.

Durchgang und Spannungsabfall der Masseverbindung messen.

Eine lose Masseverbindung kann zu Ausfällen, Fehlalarmen oder unzuverlässiger CAN-Auswertung führen.

## CAN und Warnblinker an C6 anschließen

Der weiße Stecker C6 führt die dokumentierten CAN- und Warnblinkersignale. Für alle drei Verbindungen blaue gelgefüllte Abzweigverbinder verwenden.

C6-Pin | Ford-Leitung | WiPro-Leitung | Funktion | 
 21 | grau/orange | weiß/orange | CAN-High | 
 31 | violett/orange | violett/orange | CAN-Low | 
 19 | braun/gelb | rot/rosa | Warnblinker | 

C6 und die drei Pins eindeutig identifizieren.

Grau/orange an Pin 21 mit weiß/orange WiPro verbinden.

Violett/orange an Pin 31 mit violett/orange WiPro verbinden.

Braun/gelb an Pin 19 mit rot/rosa WiPro verbinden.

CAN-Paar nur so weit wie erforderlich öffnen und anschließend mechanisch sichern.

C6 vollständig verriegeln und alle Verbinder auf Zugfestigkeit prüfen.

CAN-High und CAN-Low nicht vertauschen. Die allgemeine CAN-Diagnose kann nach Wiederherstellung der Spannungsversorgung zur Kontrolle verwendet werden.

## Zentralverriegelung an C2 anschließen

Am braunen Stecker C2 werden beide Leitungen zur Auswertung der Zentralverriegelung angeschlossen. Für beide Verbindungen rote Abzweigverbinder verwenden.

C2-Pin | Ford-Leitung | WiPro-Leitung | Funktion | 
 24 | grau/braun | blau | Zentralverriegelungssignal 1 | 
 23 | violett/orange | blau/schwarz | Zentralverriegelungssignal 2 | 

C2 anhand der braunen Steckerfarbe und Beschriftung identifizieren.

Grau/braun an Pin 24 mit der blauen WiPro-Leitung verbinden.

Violett/orange an Pin 23 mit der blau/schwarzen WiPro-Leitung verbinden.

Beide Verbindungen einzeln sichern und Zugprobe durchführen.

Stecker C2 vollständig verriegeln.

Die beiden ZV-Leitungen dürfen nicht vertauscht, zusammengelegt oder als frei wählbare Schließkontakte behandelt werden.

## Hupe, Zündung und Versorgung an C5 anschließen

Achtung: Der hellbraune Stecker C5 ist im Handbuch kopfüber nummeriert . Pinnummern nicht aus der sichtbaren Einbaulage schätzen.

C5-Zuordnung | Ford-Leitung | WiPro-Leitung | Funktion | 
 Pin 9 | blau/weiß, einzeln liegende Leitung | rosa | Fahrzeughupe | 
 Pin 5 | grau/orange | gelb | Zündung / Klemme 15 | 
 im Handbuch ohne Pinnummer | rot | rot | Spannungsversorgung / Klemme 30 über F73 | 

C5 ausbauen beziehungsweise so drehen, dass die Nummerierung sicher gelesen werden kann.

An Pin 9 ausdrücklich die einzeln liegende blau/weiße Leitung identifizieren und mit rosa WiPro verbinden.

Grau/orange an Pin 5 messen und mit der gelben WiPro-Leitung verbinden.

Rote Fahrzeugleitung für die Spannungsversorgung belastbar messen und mit der roten WiPro-Leitung verbinden.

Für alle drei Verbindungen rote Abzweigverbinder verwenden.

Sicherung F73 / 15 A kontrollieren und als WiPro-Sicherung in das Kundenexemplar der Bedienungsanleitung eintragen.

C5 vollständig verriegeln und die Leitungen zugentlasten.

Die fahrzeugspezifische Primärquelle lässt die Pinnummer der roten Versorgungsleitung in ihrer Tabelle leer. Deshalb wird hier bewusst keine Pinnummer ergänzt ; Farbe, Signal, Sicherungsweg und reale Messung müssen gemeinsam stimmen.

Bei der ersten Spannungsversorgung piept der WiPro-Summer. Zusätzlich können Sirene und/oder Warnblinker kurz aktiviert werden. Einen weiter aktiven Warnblinker durch Drücken des fahrzeugseitigen Warnblinkerschalters deaktivieren.

## Status-LED montieren

Vorgesehenen Montageort an der Armaturenbrettoberseite festlegen.

Rückseite auf Kabel, Luftkanäle und Bauteile prüfen.

Loch mit 8 mm Durchmesser bohren.

Status-LED einsetzen.

LED-Kabel mit dem passenden Gegenstück der WiPro verbinden.

Sichtbarkeit der LED vom üblichen Bedienstandort prüfen.

Die Status-LED zeigt Scharfschaltung, Bestätigungen und Diagnoseinformationen an und darf nicht verdeckt werden.

## Funk-Magnetkontakte montieren

Das Fahrzeughandbuch dokumentiert die schwarzen und weißen Funk-Magnetkontakte 868, Art. 100757 und 100758 . Ausführliche, produktübergreifende Hinweise stehen unter Funk-Magnetkontakt 868 .

Prüffeld | Vorgabe | 
 Platinenrichtung | Sende-LED muss vom Magneten wegweisen | 
 Fehlmontage | zeigt die Sende-LED zum Magneten, ist Anlernen möglich, eine Alarmierung erfolgt jedoch nicht | 
 Geschlossener Abstand | Magnet im dokumentierten Bereich von 22–30 mm | 
 Bevorzugte Tür-/Klappenmontage | Sendergehäuse am Rahmen, Magnet am beweglichen Türblatt beziehungsweise an der Klappe | 
 Klebefläche | sauber, trocken und fettfrei | 
 Verarbeitungstemperatur | nicht unter 15 °C | 
 Endfestigkeit der Klebepads | nach etwa 24 Stunden | 
 Große Abstände / Antennenausrichtung | Montageadapter Art. 100428 oder 100729 verwenden beziehungsweise prüfen | 

Kontakte vor der endgültigen Befestigung anlernen und am vorgesehenen Ort auf Reichweite prüfen.

Sendergehäuse passend zu Rahmenprofil, Rollo und Fenster ausrichten.

Platine so einsetzen, dass die Sende-LED vom Magneten wegzeigt.

Magnet im geschlossenen Zustand innerhalb des Bereichs 22–30 mm positionieren.

Klebeflächen reinigen, trocknen und entfetten.

Klebepads nur bei mindestens 15 °C verarbeiten und während der ersten 24 Stunden nicht voll belasten.

Bei ungeeigneter Klebemontage die markierten Schraubpunkte im Sendergehäuse verwenden.

Bei größeren Abständen oder ungünstiger Antennenlage Montageadapter prüfen.

## Funktionstest und Bedienquittungen

### Fahrzeug mit Deadlock

Alle Fahrerhaustüren und angelernten Kontakte schließen.

Verriegelungstaste der Original-Fahrzeugfernbedienung zweimal drücken, um Deadlock und WiPro zu aktivieren.

Einen Piepton, Blinken der Fahrtrichtungsanzeiger und Blinken der Status-LED als Aktivierungsquittung prüfen.

Bei geöffneter Fahrerhaustür prüfen, dass das Fahrzeug nicht verriegelt, die fahrzeugeigene Hupe ertönt und die WiPro nicht aktiviert wird.

Zum Entschärfen beziehungsweise Unterbrechen eines Alarms die Entriegelungstaste der Fahrzeugfernbedienung drücken.

Zwei Pieptöne, Blinken der Fahrtrichtungsanzeiger und das Ende des Status-LED-Blinkens als Deaktivierungsquittung prüfen.

### Fahrzeug ohne Deadlock

WiPro mit dem grauen THITRONIK® Funk-Handsender schärfen.

Prüfen, dass der CAN-Anschluss die Fahrerhaustüren weiterhin erfasst.

WiPro mit dem Funk-Handsender entschärfen und die Rückmeldungen kontrollieren.

### Testalarm

WiPro mit dem zur Fahrzeugvariante passenden Bedienweg schärfen.

Eine Fahrerhaustür oder eine mit Funk- Magnetkontakt gesicherte Öffnung öffnen.

Akustischen Alarm von etwa 30 Sekunden prüfen.

Optischen Alarm über die Fahrzeugblinker von etwa 180 Sekunden prüfen.

Fahrzeughupe und Sirenenton des internen Piepers unterscheiden und einzeln prüfen.

Alarm über den vorgesehenen Bedienweg unterbrechen.

Test mit jedem angelernten und montierten Funk-Sensor wiederholen.

Ertönt beim Schärfen eine Reihe kurzer Pieptöne, ist mindestens ein angelernter Funk-Magnetkontakt geöffnet. Die WiPro schaltet laut Fahrzeughandbuch dennoch scharf; deshalb offenen Kontakt suchen und schließen, statt die Warnung zu ignorieren.

## CAN- und Funkdiagnose

### CAN-Diagnose

Taster an der WiPro kurz drücken, bis die Status-LED am Kabelbaum blinkt.

Original-Fahrzeugfernbedienung oder Warnblinker betätigen, um CAN-Datenverkehr zu erzeugen.

Prüfen, ob die Status-LED abhängig von der Datenrate blinkt oder flackert.

Bleibt die Reaktion aus, C6 Pin 21/31, Verbinder sowie CAN-High/CAN-Low prüfen.

Diagnosemodus durch erneutes kurzes Drücken beenden.

### Funkdiagnose

Im Diagnosemodus jeden angelernten Funk-Sender am endgültigen Montageort auslösen. Die WiPro quittiert ein empfangenes Signal akustisch. Fehlt die Quittierung, Anlernstatus, abschirmende Metallteile, Antennenlage und gegebenenfalls Montageadapter prüfen.

## Typische Fehlerbilder

Fehlerbild | Prüfung / Maßnahme | 
 Originalfernbedienung steuert die WiPro nicht | prüfen, ob Deadlock überhaupt vorhanden ist; ohne Deadlock den grauen Funk-Handsender verwenden | 
 Einmaliges Verriegeln aktiviert die WiPro nicht vollständig | bei Deadlock zweimal die Verriegelungstaste drücken | 
 Keine CAN-Aktivität | C6 Pin 21/31, Leitungsfarben, blaue Gelverbinder und CAN-High/CAN-Low prüfen | 
 Warnblinker ohne Funktion | C6 Pin 19, braun/gelbe Fahrzeugleitung und rot/rosa WiPro-Leitung prüfen | 
 Zentralverriegelung wird nicht ausgewertet | C2 Pin 24/23, Reihenfolge der blauen WiPro-Leitungen und rote Verbinder prüfen | 
 Fahrzeughupe bleibt stumm | am kopfüber nummerierten C5 Pin 9 die einzelne blau/weiße Leitung und rosa WiPro-Leitung prüfen | 
 Zündung wird nicht erkannt | C5 Pin 5, grau/orange Fahrzeugleitung und gelbe WiPro-Leitung messen | 
 WiPro ohne Versorgung | rote Leitung, reale Klemme-30-Messung, Massepunkt und Sicherung F73 / 15 A prüfen; keine nicht dokumentierte C5-Pinnummer annehmen | 
 Beim ersten Einschalten bleibt der Warnblinker aktiv | fahrzeugseitigen Warnblinkerschalter drücken und danach Anschluss C6 Pin 19 prüfen | 
 Kurze Pieptonfolge beim Schärfen | mindestens ein angelernter Funk-Magnetkontakt ist geöffnet; Kontakte einzeln prüfen | 
 Kontakt lässt sich anlernen, löst aber keinen Alarm aus | Platine ist möglicherweise mit der Sende-LED zum Magneten ausgerichtet; Platine drehen | 
 Funkkontakt wird unzuverlässig empfangen | Montageort, Metallabschirmung, Antennenlage, Magnetabstand und Montageadapter prüfen | 

Weitere systemübergreifende Prüfungen beschreibt Störungsbeseitigung .

## Quellenbasis und Redaktionsentscheidung

Primärquelle ist das neunseitige fahrzeugspezifische Einbauhandbuch WiPro III – Ford Transit ab Baujahr 2006 , Stand 12/20 .

Alle neun Seiten wurden vollständig textlich ausgewertet und visuell geprüft. Die Seiten 2 bis 5 belegen DIP-Profil, Bedienvarianten, Demontage, Massepunkt, sämtliche Fahrzeuganschlüsse, Sicherung, Status-LED und Funktionstest.

Die Seiten 6 bis 9 belegen Art.-Nr. 100757 / 100758 , Platinenrichtung, Montagevarianten, Klebe- und Schraubbefestigung, Montageadapter sowie den Magnetbereich 22–30 mm .

Das allgemeine Installationshandbuch Version 1.8 ergänzt die spannungsfreie DIP-Arbeit, CAN- und Funkdiagnose, allgemeinen Testalarm und systemweite Fehlerprüfung.

Der Mindeststand 0823-001 / 2.1 stammt aus der freigegebenen Projekt-Kompatibilitätsmatrix; das Fahrzeughandbuch nennt selbst keinen Mindeststand.

Bei der DIP-Stellung hat die konkrete neuere Fahrzeuganleitung mit SW1 + SW2 + SW6 Vorrang vor der historischen allgemeinen Tabelle, die nur Schalter 1 bis 4 darstellt.

Die Primärquelle nennt für die rote Versorgung an C5 keine Pinnummer. Eine solche Nummer wurde nicht rekonstruiert; maßgeblich sind rote Leitung, Messung und Sicherungsweg F73 / 15 A .

Die pauschale Altfassungsaussage „Schärfen erfordert zweimal Verriegeln“ wurde auf Fahrzeuge mit Deadlock begrenzt. Ohne Deadlock ist der graue THITRONIK® Funk-Handsender vorgeschrieben.

Verwendete Primärquellen:

D:/Thitronik WIKI (ml)/wiki/de/wipro_iii_ford_transit_6._generation_2006-2013.pdf 

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
