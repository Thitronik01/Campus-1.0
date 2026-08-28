# Iveco Daily Euro 4 (2006–2011)

Route: /de/fahrzeuge/iveco-daily-euro4 | Stand: 2026-07-20 | Sichtbarkeit: standard
Quelle: Thitronik Online/project-data/runtime/wiki/wiki-articles/de/fahrzeuge/iveco-daily-euro4.json

---
Iveco Daily Euro 4 (2006–2011)

Dieser Artikel beschreibt den Einbau einer WiPro III in den Iveco Daily Euro 4 der Baujahre 2006 bis 2011. Das fahrzeugspezifische Einbauhandbuch Stand 12/20 dokumentiert Fahrzeugprüfung, Demontage, CAN- und Warnblinkeranschluss, Versorgung, Masse, Fahrzeughupe, Status-LED, Montage, Funktionstest und Fehlerdiagnose.

Abgrenzung: Baujahr, Abgasstufe, Bordcomputer, Steckereinsätze, Pins und Leitungskennzeichnung müssen gemeinsam zur Anleitung passen. Für Fahrzeuge ab 2011 gilt Iveco Daily Euro 5 und neuer .

## Geltungsbereich

Merkmal | Vorgabe | 
 Fahrzeug | Iveco Daily Euro 4 | 
 Baujahre | 2006–2011; tatsächliche Fahrzeugausführung prüfen | 
 Primärsystem | WiPro III mit Iveco-Montagekit | 
 Fahrzeugkonfiguration | SW4 + SW6 auf ON | 
 Bedienung | originale Fahrzeug-Funkfernbedienung, sofern vorhanden und funktionsfähig | 
 Kompatibilitätsbasis | 0823-001 / 2.1 ; keine eigene Mindestseriennummer im Fahrzeughandbuch | 

Seriennummer , Softwarestand und Geräteausführung sind vor dem Einbau über Seriennummern und Softwarestände zu prüfen.

## Quellenrang und Fahrzeugkonfiguration

Quelle | Aussage | Bewertung | 
 fahrzeugspezifisches Einbauhandbuch Stand 12/20 | SW4 + SW6 | verbindliche Einstellung für Iveco Daily Euro 4 | 
 allgemeines Installationshandbuch Version 1.8 | ältere Gruppentabelle mit SW2 innerhalb der dort abgebildeten Schalter 1 bis 4 | durch die spätere fahrzeugspezifische Vorgabe ersetzt | 

DIP-Schalter nur im spannungsfreien Zustand umstellen. Die Stellung SW4 + SW6 darf nicht aus der älteren allgemeinen Iveco-Gruppenzeile abgeleitet oder mit ihr kombiniert werden. Grundlagen und weitere Fahrzeugprofile beschreibt Fahrzeugkompatibilität .

## Sicherheit und Fahrzeugprüfung

Arbeiten an Fahrzeugelektrik und -elektronik nur durch eine qualifizierte Fachwerkstatt ausführen lassen.

Vor dem Öffnen der WiPro, dem Umstellen der DIP-Schalter oder elektrischen Arbeiten die Spannungsversorgung trennen.

Ungenutzte Ein- und Ausgänge einzeln gegen Kurzschluss isolieren.

Pin, Leitungsfarbe beziehungsweise Kabelcode, Spannung und Funktion am konkreten Fahrzeug prüfen.

Bei Abweichungen von Abbildungen, Steckereinsätzen, Pins oder Leitungskennzeichnungen die Arbeit stoppen und Hersteller oder THITRONIK Support einbeziehen.

Vor Beginn folgende Fahrzeugfunktionen prüfen und vorhandene Fehler dokumentieren:

Funk-Fernbedienung vorhanden und funktionsfähig; gegebenenfalls Knopfzelle einsetzen und Blinkerquittierung prüfen.

Zentralverriegelung funktionsfähig.

Öffnung der Originaltüren wird bei eingeschalteter Zündung im Kombiinstrument angezeigt.

Bei vollintegrierten Reisemobilen prüfen, welche Türen oder Klappen bereits über CAN erfasst werden.

Fahrzeughupe, Beleuchtung, Warnlampen und Fehlerspeicherzustand prüfen.

Benötigt werden laut Primärquelle Iveco-Montagekit, Kombizange, Kreuzschlitzschraubendreher, Akkuschrauber mit 8-mm -Bohrer und Torx T25 .

## Funk-Zubehör anlernen und DIP einstellen

Funk-Magnetkontakte, Funk-Gaswarner und Funk-Kabelschleifen vor dem Einbau anlernen.

Taster rechts neben dem Anschlussstecker gedrückt halten, bis die Zentrale piept und die Status-LED dauerhaft leuchtet.

Jeden zu speichernden Kontakt, Gaswarner oder jede Kabelschleife zwei- bis dreimal auslösen.

Piepton und kurz erlöschende LED als Speicherbestätigung prüfen.

Spannungsversorgung entfernen und WiPro-Gehäuse öffnen.

Am 8-fach-Codierschalter SW4 und SW6 auf ON stellen.

Übrige Schalter entsprechend der freigegebenen Gerätekonfiguration belassen.

Gehäuse schließen und mit der Installation fortfahren.

Der allgemeine Lernablauf steht zusätzlich unter Anlernvorgang .

## Lenksäulenverkleidung und Bordcomputer ausbauen

Befestigungen der Lenksäulenverkleidung und der Verkleidung des Sicherungskastens gemäß Fahrzeugabbildung lösen.

Verkleidungen vorsichtig abnehmen.

Dokumentierte Befestigungspunkte des Bordcomputers lösen.

Bordcomputer leicht herausdrehen, ohne Leitungen oder Stecker zu belasten.

Blaue Stecker entfernen, zur Vorderseite führen und schwarze Abdeckung abnehmen.

Steckereinsätze entriegeln und herausnehmen.

Beim späteren Rückbau die schwarze Abdeckung des blauen Steckers zwingend wieder anbringen und alle Stecker vollständig verriegeln.

## CAN und Warnblinker am Bordcomputer

Steckereinsatz / Pin | Fahrzeugleitung | WiPro-Leitung | Funktion | 
 weißer Einsatz, Pin 29 oder 34 | hellblau | rosa/rot | Warnblinker | 
 grüner Einsatz, Pin 5 | violett | violett/orange | CAN-Low | 
 grüner Einsatz, Pin 6 | violett | weiß/orange | CAN-High | 
 schwarzer Einsatz, Pin 25 | violett | violett/orange | alternative CAN-Low-Verbindung | 
 schwarzer Einsatz, Pin 24 | violett | weiß/orange | alternative CAN-High-Verbindung | 

CAN-Low und CAN-High müssen aus demselben Steckereinsatz stammen: entweder Pin 5/6 des grünen oder Pin 25/24 des schwarzen Einsatzes. Die beiden Varianten nicht mischen. Für den Warnblinker die rosa/rote WiPro-Leitung über einen blauen, gelgefüllten Abzweigverbinder mit Pin 29 oder 34 des weißen Einsatzes verbinden.

## Masse und Spannungsversorgung

Anschluss | Fahrzeugvorgabe | Maßnahme | 
 Massepunkt an der Lenksäule | M8 -Gewinde | Masseanschluss fachgerecht herstellen und festen Sitz prüfen | 
 Bordcomputer, Pin 46 | über Sicherung F39 mit 10 A abgesichert | Crimpkontakt in freien Pin 46 einsetzen oder bei belegtem Pin freigegebenen Abzweigverbinder verwenden | 

Pin 46, Dauerspannung, Sicherung und Masse vor dem Anschluss messen beziehungsweise eindeutig identifizieren. Die Spannungsversorgung erst herstellen, wenn DIP-Stellung und sämtliche Anschlussarbeiten geprüft sind.

## Fahrzeughupe

Modellzeitraum | Fahrzeugleitung | WiPro-Leitung | Anschluss | 
 bis 2010 | gelbe Leitung am Stecker zum Blinker-/Hupenhebel | rosa | mit blauem, gelgefülltem Abzweigverbinder verbinden | 
 ab 2010 | Kabelcode 1116 , Leitungsfarbe hellblau | rosa | mit blauem, gelgefülltem Abzweigverbinder verbinden | 

Baujahr, Kabelcode, Farbe und Hupenfunktion müssen vor dem Abzweig gemeinsam bestätigt werden. Fahrzeughupe und integrierte beziehungsweise zusätzliche Sirene sind unterschiedliche Alarmgeber.

## Status-LED und Montage der Zentrale

Rückwärtigen Bauraum der vorgesehenen LED-Position auf Leitungen und Bauteile prüfen.

Loch mit 8 mm Durchmesser bohren.

Status-LED einsetzen und mit dem WiPro-Kabelbaum verbinden.

WiPro III mit Montageadapter und Klebepads in der Lenksäulenverkleidung befestigen.

Kabelbaum wie in der Primärquelle nach unten führen; Leitungen nicht quetschen.

Trockenen, geschützten Sitz der Zentrale sowie freie Antennenführung sicherstellen.

Die Überschrift „Hupenansteuerung herstellen“ bei Schritt 8 der Primärquelle ist offenkundig ein Redaktionsfehler: Text und Abbildung zeigen die Montage der WiPro III , nicht einen zweiten Hupenanschluss.

## Abschließende Funktionsprüfung

Fahrzeugtüren schließen und System mit der Verriegeln-Taste der originalen Fahrzeug-Funkfernbedienung scharfschalten.

Falls die WiPro zunächst nicht reagiert, mehrmals ver- und entriegeln, damit sich die CAN-Daten synchronisieren.

Piepton, Blinken der Fahrtrichtungsanzeiger und blinkende Status-LED als Aktivierungsbestätigung prüfen.

Eine Fahrerhaustür geöffnet lassen und prüfen, dass das Fahrzeug nicht verriegelt und die WiPro nicht aktiviert wird.

Fahrzeug korrekt verriegeln und über jede erfasste Fahrerhaustür sowie jedes angelernte Funk-Zubehör einen Testalarm auslösen.

Akustischen Alarm für etwa 30 Sekunden prüfen.

Optischen Alarm über die Fahrzeugblinker für etwa 180 Sekunden prüfen, sofern der Alarm nicht vorher beendet wird.

Mit der Entriegeln-Taste entschärfen beziehungsweise den Alarm unterbrechen.

CAN-Erkennung, Warnblinker, Fahrzeughupe, Status-LED und alle Zusatzmelder einzeln prüfen.

Abschließend kontrollieren, dass keine neuen Warnlampen, elektrischen Fehler oder Fehlerspeichereinträge entstanden sind.

Eine Folge kurzer Pieptöne beim Scharfschalten weist auf einen offenen angelernten Magnetkontakt hin; die Anlage schaltet laut Quelle trotzdem scharf. Für Funk-Magnetkontakte gelten insbesondere korrekte Platinenorientierung, 22–30 mm Magnetbereich, saubere und fettfreie Klebefläche, mindestens 15 °C Verarbeitungstemperatur und etwa 24 Stunden bis zur Endfestigkeit. Details enthält Funk-Magnetkontakt 868 .

## Fehlerdiagnose

Fehlerbild | Prüfung und Maßnahme | 
 Keine Reaktion auf Fahrzeug-Funkfernbedienung, aber Piepton beim Anlegen der Versorgung | CAN-Verbindung prüfen; Diagnosemodus kurz per Platinentaster aktivieren und bei Funkschlüssel- oder anderem CAN-Datenverkehr auf Flackern der grünen linken LED achten. | 
 Kein CAN-Datenverkehr im Diagnosemodus | Bus inaktiv oder Verbindung fehlerhaft; Pinpaar, gleichen Steckereinsatz und Leitungsanschlüsse prüfen. | 
 Keine Reaktion und kein Piepton beim Anlegen der Versorgung | Versorgung, Pin 46, Crimp- oder Abzweigverbindung, Zündungszustand und Sicherung F39 prüfen. Bei eingeschalteter Zündung ist die Anlage deaktiviert. | 
 Offener Magnetkontakt trotz geschlossener Öffnungen | Magnetabstand und Platinenorientierung prüfen, Kontakte mehrfach öffnen und schließen; falls nötig bei geschlossenen Kontakten Versorgung beziehungsweise F39 kurz trennen und wiederherstellen. | 
 Warnblinker oder Hupe ohne Funktion | korrekten weißen Einsatz und Pin 29/34 beziehungsweise Hupenleitung für den Modellzeitraum prüfen; Fahrzeugfunktion und Abzweigverbindung testen. | 
 Fahrzeug oder Stecker weicht von der Anleitung ab | Arbeit stoppen und fahrzeugspezifische Freigabe beim Hersteller oder THITRONIK Support einholen. | 

Weitere systemübergreifende Prüfungen beschreibt Störungsbeseitigung .

## Quellenentscheidung

Das zehnseitige fahrzeugspezifische Einbauhandbuch WiPro III – Iveco Daily Euro 4 (2006–2011) , Stand 12/20 , wurde vollständig textlich und visuell geprüft.

Die Seiten 1 bis 6 dokumentieren Sicherheit, Fahrzeugprüfung, SW4 + SW6 , Demontage, Anschlüsse, Montage, Funktionstest und Fehlerdiagnose; die Seiten 7 bis 10 enthalten die Montagevorgaben für Funk-Magnetkontakte 868.

Das allgemeine Installationshandbuch Version 1.8 ergänzt Sicherheits-, Diagnose- und Anschlussgrundlagen. Seine ältere Iveco-Gruppenangabe SW2 wird durch die konkrete fahrzeugspezifische Vorgabe SW4 + SW6 ersetzt.

Für die Alarmdauer gilt die konkrete Primärquelle mit etwa 30 Sekunden akustischem und 180 Sekunden optischem Alarm; die ältere allgemeine Angabe von 120 Sekunden für die Warnblinker wird nicht übernommen.

Die Kompatibilitätsbasis 0823-001 / 2.1 stammt aus der freigegebenen Fahrzeugübersicht; das fahrzeugspezifische Handbuch nennt keine eigene Mindestseriennummer.

## Querverweise

WiPro III 

Fahrzeugkompatibilität 

Seriennummern und Softwarestände 

Funk-Magnetkontakt 868 

Anlernvorgang 

Störungsbeseitigung 

Iveco Daily Euro 5 und neuer
