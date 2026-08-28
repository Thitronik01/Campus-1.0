# Fiat Ducato / Citroën Jumper / Peugeot Boxer / Toyota Proace Max / Opel Movano (2012–2021)

Route: /de/fahrzeuge/fiat-ducato-2012-2021 | Stand: 2026-07-19 | Sichtbarkeit: standard
Quelle: Thitronik Online/project-data/runtime/wiki/wiki-articles/de/fahrzeuge/fiat-ducato-2012-2021.json

---
Fiat Ducato / Citroën Jumper / Peugeot Boxer / Toyota Proace Max / Opel Movano (2012–2021)

Dieser Artikel beschreibt den Einbau einer WiPro III safe.lock , Art.-Nr. 101050 , in die dokumentierte Sevel-Fahrzeugfamilie. Die fahrzeugspezifische Anleitung unterscheidet bei DIP-Konfiguration und Schlüsselsicherheit zwischen den Baujahren 2012–2018 und 2019+ .

Abgrenzung: Stecker, Pinbelegung und Leitungsfarben müssen mit dem tatsächlichen Fahrzeug übereinstimmen. Bei abweichender Ausstattung, einem anderen Bordcomputer oder einer nicht eindeutig identifizierbaren Leitung darf nicht nach Vermutung angeschlossen werden. In diesem Fall sind Fahrzeughersteller oder THITRONIK Support einzubeziehen.

## Geltungsbereich

Merkmal | Vorgabe der fahrzeugspezifischen Anleitung | 
 Alarmsystem | WiPro III safe.lock | 
 Artikelnummer | 101050 | 
 dokumentierter Set-/Seriennummernbereich | ab 1050-001 ; Artikelnummer und Seriennummer nicht verwechseln | 
 Fiat Ducato | 2012–2021 | 
 Citroën Jumper / Peugeot Boxer | ab 2012 | 
 Toyota Proace Max / Opel Movano | ab 2021 | 
 Quellenstand | Februar 2024, Revision 1.0 | 

Für Fiat Ducato X250 Euro 4 der Baujahre 2006–2011 gilt stattdessen Fiat Ducato X250 . Fahrzeuge der späteren Ducato-8/9-Gruppe benötigen die eigene Anleitung unter Fiat Ducato 2022–2024 .

## Sicherheit und Vorbereitung

Arbeiten an Fahrzeugelektrik und -elektronik nur durch eine qualifizierte Fachwerkstatt ausführen lassen.

Die allgemeinen Sicherheits- und Anschlussregeln des WiPro-Installationshandbuchs zusätzlich beachten.

Vor dem Öffnen der WiPro beziehungsweise vor elektrischen Arbeiten die Spannungsversorgung nach Herstellervorgabe trennen.

Ungenutzte Ein- und Ausgänge einzeln gegen Kurzschluss isolieren.

Im Bereich der Lenksäule besonders auf vorhandene Airbag-Leitungen achten und diese weder beschädigen noch anzapfen.

Abzweigstellen dauerhaft, zugentlastet und entsprechend der Herstellervorgabe ausführen.

Vor dem Einbau sind folgende Fahrzeugfunktionen zu prüfen und zu dokumentieren:

Vorhandensein und Funktion der Funk-Fernbedienung.

Vorhandensein und Funktion der Zentralverriegelung.

Anzeige geöffneter Originaltüren bei eingeschalteter Zündung.

Funktion der Fahrzeughupe.

Bereits vorhandene elektrische oder elektronische Fehler, Warnlampen und Fehlerspeichereinträge.

Bei vollintegrierten Wohnmobilen können Originaltüren oder -klappen bereits über den CAN-Bus erfasst sein. Dort ist für die betreffende Öffnung nicht automatisch ein zusätzlicher Funk-Magnetkontakt erforderlich; die tatsächliche Erfassung muss vor der Montage geprüft werden.

## DIP-Schalter und Schlüsselsicherheit

Die DIP-Schalter werden bei getrennter Spannungsversorgung eingestellt. Die Position ON entspricht der mit dem Pfeil gekennzeichneten Schalterrichtung.

Fahrzeugzeitraum | DIP-Schalter auf ON | Alle übrigen Schalter | Schlüsselkonzept | 
 2019+ | SW2 + SW6 | OFF | ohne Umrüstplatine; Originalschlüssel-Auswertung bleibt aktiv | 
 2012–2018 | SW2 + SW5 + SW6 | OFF | Original-Funkschlüssel wird durch SW5 ausgeblendet; Umrüstplatine dringend empfohlen | 

Fahrzeuge bis Baujahr 2018 besitzen laut Herstellerunterlage eine Schwachstelle gegen Replay-Attacken auf das Funksignal der originalen Zentralverriegelung. Die WiPro III safe.lock blendet deshalb in dieser Konfiguration die Auswertung des Original-Funkschlüssels aus.

Mit der safe.lock Umrüstplatine , Art.-Nr. 101052 , kann der Klappschlüssel seine Funkfunktion behalten. Die Platine wird wie ein Handsender an der WiPro angelernt. Der Wegfahrsperren-Transponder muss vor dem Einbau fachgerecht kopiert werden; ohne funktionsfähigen Transponder lässt sich der Motor mit dem umgebauten Schlüssel nicht starten.

Wichtig: Die DIP-Stellung nicht allein anhand der optischen Ähnlichkeit des Fahrzeugs wählen. Modelljahr, Systemausführung und vorhandene Schlüssellösung müssen eindeutig feststehen.

## Einbauort, Bordcomputer und Masse

Drei Schrauben der Armaturenbrettverkleidung lösen, die Verkleidung nach vorn abziehen und das kleine Ablagefach nach Lösen seiner weiteren Schraube entfernen.

Die drei Schrauben beziehungsweise Muttern des Bordcomputers mit einer 10-mm-Stecknuss entfernen und den Bordcomputer nach vorn klappen.

Abdeckstreifen der WiPro-Klebepads entfernen und die Zentrale so auf den Bordcomputer kleben, dass ihre Steckverbindung zur Fahrertür zeigt.

Die schwarze WiPro-Leitung zusätzlich am Massepunkt links in Verlängerung der A-Säule auflegen. Vorhandene Ringösen bleiben montiert; die M10-Mutter anschließend wieder sicher festziehen.

Die spätere WiPro-Sicherung ist mit 7,5 A oder 10 A vorgesehen. Sicherungsposition und Seriennummer der WiPro sind für die Fahrzeugdokumentation festzuhalten.

## CAN-Bus und Warnblinker

Der größere Stecker auf der Rückseite des Bordcomputers wird gelöst und seine Einsätze werden zugänglich gemacht. Die Anschlüsse richten sich nach Pin und Fahrzeuggeneration:

Pin | Fahrzeugleitung Euro 5 | Fahrzeugleitung Euro 5+/6 | WiPro-Leitung | Funktion | 
 26 | schwarz/orange | blau | weiß/orange | CAN-High | 
 11 | weiß/orange | weiß | violett/orange | CAN-Low | 
 55 | violett/orange, violett/braun oder violett | violett/orange, violett/braun oder violett | rot/rosa | Warnblinker | 

Die Abbildung der Anleitung unterscheidet den Steckertyp bis Modelljahr 2016 und ab Modelljahr 2017 . Wenn die Fahrzeugfarben an Pin 26 und Pin 11 gegenüber der Erwartung vertauscht erscheinen, bleiben Pinbelegung und Tabelle maßgeblich; CAN-High und CAN-Low dürfen nicht aufgrund einer bloßen Farbschätzung getauscht werden.

## Spannungsversorgung und Zündung

Am kleineren Stecker auf der Rückseite des Bordcomputers gelten im Regelfall folgende Anschlüsse:

Pin | Fahrzeugleitung | WiPro-Leitung | Funktion | 
 18 | rot/grün | rot | Klemme 30 , Dauerplus | 
 17 | blau/schwarz oder blau/grau; zwei Leitungen möglich | gelb | Klemme 15 , Zündung | 

Selten kann die Belegung abweichen: Pin 18 ist dann grün/blau und führt Klemme 15, während Pin 17 rot/gelb ist und Klemme 30 führt. Deshalb sind Klemme 30 und Klemme 15 vor dem Anschluss elektrisch zu messen und dürfen nicht nur nach Farbe zugeordnet werden.

Nach dem Anschluss werden beide Steckereinsätze vollständig zurückgebaut und die Zugentlastung mit Kabelbinder wiederhergestellt. Durch das Entfernen des kleinen Steckers muss die Fiat-Uhr gegebenenfalls neu eingestellt werden.

## Zentralverriegelung

Für die safe.lock-Ansteuerung wird der grüne Stecker links unten am Bordcomputer verwendet:

Pin | Fahrzeugleitung | WiPro-Leitung | Funktion | 
 53 | blau/gelb | blau/schwarz | Zentralverriegelung vorn | 
 27 | grau/weiß | blau | Zentralverriegelung hinten | 

Die WiPro steuert beim Schärfen beziehungsweise Unscharfschalten die vollständige Zentralverriegelung an; Vorder- und Hintertüren werden gemeinsam ver- beziehungsweise entriegelt. Für vollintegrierte Fahrzeuge von LMC und Bürstner verweist die Herstelleranleitung bei Problemen auf einen eigenen Zusatzhinweis im Händlerbereich. Es gilt keine pauschale Regel, die beiden ZV-Leitungen bei allen teil- oder vollintegrierten Fahrzeugen unbeschaltet zu lassen.

## Fahrzeughupe und Status-LED

Nach dem Entfernen der Lenksäulenverkleidung wird der Kabelbaum direkt unter dem Lenkrad vorsichtig auf etwa 10 cm freigelegt. Die Hupenleitung kann fahrzeugseitig braun/grün, grün/braun, grün oder braun sein und wird mit der rosa WiPro-Leitung verbunden.

Die identifizierte Leitung führt bei betätigtem Hupentaster Masse; im Ruhezustand können dort 12 V messbar sein. Vor dem Anschluss muss dieses Verhalten messtechnisch bestätigt werden.

Für die Status-LED wird nach Abstimmung der Position ein Loch mit 8 mm Durchmesser gebohrt. Anschließend wird die LED eingesetzt und ihr rot/schwarzes Kabel über den weißen Steckverbinder mit dem WiPro-Kabelsatz verbunden.

## Funk-Zubehör anlernen und montieren

Sämtliches Funk-Zubehör, auch Komponenten aus dem Lieferumfang, muss einmalig angelernt werden und den Zusatz 868 tragen.

Taster rechts neben dem Anschlussstecker gedrückt halten, bis die Zentrale piept und die Status-LED dauerhaft leuchtet.

Jeden Funk- Magnetkontakt , Funk-Handsender , jede Funk-Kabelschleife und jeden Funk-Gaswarner zwei- bis dreimal auslösen.

Den Bestätigungston und das kurzzeitige Erlöschen der LED für jede Komponente abwarten.

Zum Beenden des Anlernmodus die Anlage kurz spannungsfrei machen oder den Taster an der WiPro kurz drücken.

Der Speicher ist nicht flüchtig. Ausführliche Abläufe, Voraussetzungen und Löschverfahren stehen unter Anlernvorgang . Montageposition und Ausrichtung von Kontakten richten sich nach Funk-Magnetkontakt 868 . Der Funk-Handsender 868 ist insbesondere bei ausgeblendeter Originalschlüssel-Auswertung als Bedienweg einzuplanen.

## Abschließende Funktionsprüfung

Alle Stecker, Zugentlastungen, isolierten Leitungen, Masseverbindung, Sicherung und DIP-Stellungen kontrollieren.

Sicherstellen, dass das Fahrzeug keine durch den Einbau neu entstandenen Warnlampen oder Fehlerspeichereinträge zeigt.

WiPro scharfschalten und prüfen, ob Anlage und vollständige Zentralverriegelung erwartungsgemäß reagieren.

Eine überwachte Originaltür mechanisch öffnen und die Alarmierung prüfen.

WiPro unscharfschalten und das gemeinsame Entriegeln von Vorder- und Hintertüren kontrollieren.

Alle angelernten Funkkontakte und sonstigen 868-MHz-Komponenten einzeln auslösen.

Bei einem beim Schärfen geöffneten Funkkontakt die Lüftungsfunktion prüfen: Der Kontakt bleibt zunächst von der Alarmierung ausgenommen und wird nach dem Schließen nach ungefähr vier Sekunden wieder aktiv.

Den Panikalarm durch etwa eine Sekunde langes Drücken beider Handsendertasten prüfen.

Bei Fahrzeugen von 2012–2018 sicherstellen, dass sich Originalschlüssel, THITRONIK Handsender und gegebenenfalls Umrüstplatine genau entsprechend dem gewählten Sicherheitskonzept verhalten.

Abschließend Sirene beziehungsweise Fahrzeughupe, Blinker, Status-LED sowie alle Ver- und Entriegelungswege prüfen.

Scharf-/Unscharfschalten und Ver-/Entriegeln sind getrennt zu bewerten, auch wenn die WiPro III safe.lock beide Vorgänge bei dieser Anbindung parallel ausführt.

## Fehlerdiagnose

Fehlerbild | Prüfung und Maßnahme | 
 Alle Türen verriegeln, aber weder vorn noch hinten entriegeln | Blaue und blau/schwarze WiPro-Leitung auf Vertauschung prüfen und Verbindung gegebenenfalls korrigieren. | 
 Alle Türen verriegeln, aber nur vorn wird entriegelt | Verbindung der blauen WiPro-Leitung zu Pin 27 prüfen und instand setzen. | 
 Türen lassen sich nicht verriegeln | Verbindung der blau/schwarzen WiPro-Leitung zu Pin 53 prüfen und instand setzen. | 
 WiPro reagiert nicht auf Fahrzeug- oder Handsender | Spannungsversorgung, Masse, Sicherung, DIP-Stellung, Anlernstatus und CAN-Anschlüsse systematisch prüfen. | 
 CAN-Funktion bleibt unklar | Pins 26 und 11 sowie CAN-High/CAN-Low gegen Fahrzeugausführung und Herstellerabbildung prüfen; Leitungen nicht auf Verdacht tauschen. | 
 Verhalten eines vollintegrierten LMC- oder Bürstner-Fahrzeugs weicht ab | Änderungen stoppen und den fahrzeugspezifischen Zusatzhinweis beziehungsweise THITRONIK Support heranziehen. | 

Weitere systemübergreifende Prüfungen beschreibt Störungsbeseitigung .

## Quellenentscheidung

Primärquelle ist das zwölfseitige THITRONIK Einbauhandbuch WiPro III safe.lock — Fiat Ducato 2012–2021, Citroën Jumper / Peugeot Boxer 2012+, Toyota Proace Max / Opel Movano 2021+ , Stand 02/24 , Revision 1.0 .

Die allgemeine WiPro-Installationsanleitung bleibt für übergreifende Sicherheits-, Anschluss- und Systemregeln verbindlich.

Die Zusatzanleitung WiPro III safe.lock Upgrade , Revision 2.0 , gilt nur für entsprechend hardwareseitig auf safe.lock erweiterte WiPro-III-Anlagen und ersetzt nicht die fahrzeugspezifische Pinbelegung.

Das ältere Einbauhandbuch wipro_iii_fiat_ducato_x250_euro_4_safe.lock.pdf behandelt ausschließlich Euro-4-Fahrzeuge von 2006–2011 und ist keine Anschlussquelle für diesen Artikel.

## Querverweise

WiPro III 

safe.lock Umrüstplatine 

Funk-Handsender 868 

Funk-Magnetkontakt 868 

Anlernvorgang 

Fahrzeugkompatibilität 

Fiat Ducato X250 

Fiat Ducato 2022–2024 

Störungsbeseitigung
