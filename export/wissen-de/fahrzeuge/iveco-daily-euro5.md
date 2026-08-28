# Iveco Daily Euro 5 und neuer (2011–2024)

Route: /de/fahrzeuge/iveco-daily-euro5 | Stand: 2026-07-20 | Sichtbarkeit: standard
Quelle: Thitronik Online/project-data/runtime/wiki/wiki-articles/de/fahrzeuge/iveco-daily-euro5.json

---
Iveco Daily Euro 5 und neuer (2011–2024)

Dieser Artikel beschreibt den Einbau einer WiPro III beziehungsweise WiPro III safe.lock in den Iveco Daily der Modelljahre 2011 bis 2024. Das fahrzeugspezifische Einbauhandbuch Stand 01/2026 dokumentiert Fahrzeugprüfung, DIP-Konfiguration, CAN, Warnblinker, safe.lock -Leitungen, Versorgung, Zündung, Masse, Fahrzeughupe, Status-LED, Montage, Funktionstest und Fehlerdiagnose.

Abgrenzung: Modelljahr, Bordcomputer, Stecker, Pinbelegung und Leitungscode müssen gemeinsam zur Anleitung passen. Hinweise der Quelle auf geänderte Kabelfarben ab 2025 erweitern den Geltungsbereich nicht. Für Iveco Daily ab Modelljahr 2025/2026 liegt im Projekt wegen BCM-Änderungen keine Einbaufreigabe vor.

## Geltungsbereich

Merkmal | Vorgabe | 
 Fahrzeug | Iveco Daily Euro 5 und neuere Ausführungen innerhalb der dokumentierten Generation | 
 Modelljahre | 2011–2024; tatsächliche Ausführung prüfen | 
 WiPro III beziehungsweise safe.lock ohne Umrüstplatine | SW2 + SW6 auf ON | 
 WiPro III safe.lock mit Umrüstplatine | SW2 + SW5 + SW6 auf ON | 
 Teil- und vollintegrierte Fahrzeuge mit Umrüstplatine | SW2 + SW5 + SW6 ; blaue ZV-Öffnen-Leitung nicht anschließen | 
 Kompatibilitätsbasis | 0823-001 / 2.1 aus der freigegebenen Übersicht; genaue Geräte- und Fahrzeugausführung prüfen | 

Bei fahrzeugspezifisch vorkonfigurierten Anlagen entfällt die DIP-Umstellung. Die tatsächlich vorgefundene Stellung ist dennoch zu dokumentieren. Seriennummer , Softwarestand und Geräteausführung sind über Seriennummern und Softwarestände zu prüfen.

## Quellenrang und Korrektur der DIP-Angabe

Quelle | Aussage | Bewertung | 
 fahrzeugspezifisches Handbuch Stand 01/2026 | WiPro III SW2 + SW6 ; mit Umrüstplatine zusätzlich SW5 | verbindliche aktuelle Vorgabe | 
 ältere allgemeine Installationsübersicht und Altbestand | abweichende Iveco-Gruppenangaben, zuletzt fälschlich SW1 beziehungsweise SW1 + SW5 | durch die aktuelle fahrzeugspezifische Grafik ersetzt | 
 ZV-Zusatzquelle | zusätzliche Teststellungen von SW1 und SW3 | nur für die dokumentierte ZV-Anpassmatrix, nicht als Ersatz des Grundprofils | 

Die Abbildung im Handbuch wurde hochauflösend visuell geprüft. SW2 und SW6 stehen bei WiPro III auf ON ; SW5 kommt nur bei verwendeter Umrüstplatine hinzu. SW1 und SW3 gehören ausschließlich zu den zwölf ZV-Prüfkombinationen weiter unten. Grundlagen beschreibt Fahrzeugkompatibilität .

Die safe.lock Umrüstplatine ist nicht allein aus der Bezeichnung „safe.lock“ abzuleiten. Vor allem ab Modelljahr 2019 ist die tatsächliche Schlüssel- und Systemausführung zu prüfen; SW5 niemals ohne nachgewiesene Umrüstplatine aktivieren.

## Sicherheit und Fahrzeugprüfung

Arbeiten an Fahrzeugelektrik und -elektronik nur durch eine qualifizierte Fachwerkstatt ausführen lassen.

Vor dem Öffnen der WiPro, jeder DIP-Änderung oder elektrischen Arbeit die Spannungsversorgung trennen.

Ungenutzte Ein- und Ausgänge einzeln gegen Kurzschluss isolieren.

Pin, Stecker, Leitungscode, Farbe, Spannung und Funktion am konkreten Fahrzeug bestätigen.

Bei Abweichungen von Bildern, Steckern, Pinbelegung oder Leitungscodes die Arbeit stoppen und Hersteller oder THITRONIK Support einbeziehen.

Vor Beginn folgende Punkte prüfen und vorhandene Fehler dokumentieren:

Originale Funk-Fernbedienung vorhanden und funktionsfähig; gegebenenfalls Knopfzelle einsetzen und Blinkerquittierung prüfen.

Zentralverriegelung funktionsfähig.

Öffnung der Originaltüren wird bei eingeschalteter Zündung im Kombiinstrument angezeigt.

Bei vollintegrierten Reisemobilen prüfen, welche Türen oder Klappen bereits über CAN erfasst werden.

Fahrzeughupe, Beleuchtung, Warnlampen und Fehlerspeicherzustand prüfen.

## Funk-Zubehör anlernen und Grundprofil einstellen

Funk-Magnetkontakte, Funk-Gaswarner und Funk-Kabelschleifen vor dem Einbau anlernen.

Taster rechts neben dem Anschlussstecker gedrückt halten, bis die Zentrale piept und die Status-LED dauerhaft leuchtet.

Jeden zu speichernden Kontakt, Gaswarner oder jede Kabelschleife zwei- bis dreimal auslösen.

Piepton und kurz erlöschende LED als Speicherbestätigung prüfen.

Spannungsversorgung entfernen und WiPro-Gehäuse öffnen, sofern die Anlage nicht bereits fahrzeugspezifisch vorkonfiguriert ist.

Für WiPro III und safe.lock ohne Umrüstplatine SW2 + SW6 auf ON stellen.

Nur bei nachgewiesener Umrüstplatine zusätzlich SW5 auf ON stellen.

Gehäuse schließen und mit der Installation fortfahren.

Der allgemeine Lernablauf steht unter Anlernvorgang .

## Armaturenbrett und Bordcomputer zugänglich machen

Verkleidungsteile gemäß Fahrzeugabbildung entfernen.

Obere Lenkradabdeckung nur dann zusätzlich entfernen, wenn der Hupenanschluss dort hergestellt werden soll.

Dokumentierte Torxschrauben lösen, um den Bordcomputer mit oder ohne Hilfsrahmen bewegen zu können.

Prüfen, ob die rückwärtigen Steckverbindungen auch ohne vollständiges Lösen erreichbar sind.

Bordcomputer nur so weit bewegen, dass Leitungen und Stecker nicht belastet werden.

Die beiden grauen Stecker mit blauer Verriegelung eindeutig identifizieren.

Steckereinsätze nach dem Anschluss vollständig zurückschieben, blaue Verriegelungen schließen und die Zugentlastung mit Kabelbinder wiederherstellen.

## CAN, Warnblinker und safe.lock anschließen

Am größeren grauen Stecker mit blauer Lasche den Einsatz herausziehen. Die blau/schwarze safe.lock-Leitung wird auf der Vorderseite am grünen Stecker angeschlossen.

Stecker / Pin | Fahrzeugleitung | WiPro-Leitung | Funktion | 
 größerer grauer Stecker, Pin 1 | braun, Code 0000 | blau | safe.lock / Zentralverriegelung öffnen | 
 größerer grauer Stecker, Pin 9 | violett, Code 6111 | violett/orange | CAN-Low | 
 größerer grauer Stecker, Pin 24 | violett, Code 6110 | weiß/orange | CAN-High | 
 größerer grauer Stecker, Pin 55 | weiß, Code 2507 | rot/rosa | Warnblinker | 
 grüner Stecker auf der Vorderseite, Pin 34 | grün, Code 0968 | blau/schwarz | safe.lock / Zentralverriegelung schließen | 

Fahrzeugabhängige Abweichungen der aktuellen Primärquelle:

Beim Modelljahr 2016 können Pin 25 für CAN-High und Pin 10 für CAN-Low vorkommen.

Ab Modelljahr 2019 können beide CAN-Leitungen grau ausgeführt sein.

Ab Modelljahr 2022 können ausstattungsbedingt weiße CAN-Leitungen vorkommen.

Deshalb haben Pinbelegung und Leitungscode Vorrang vor der Farbe; CAN-High und CAN-Low niemals nach Farbe allein verbinden.

Die Quellenangabe „Pin 55 ab Baujahr 2025 weiß/rot“ ist nur ein Hinweis auf eine spätere Ausführung und keine Einbaufreigabe für 2025.

Verbindungen mit freigegebenen blauen, gelgefüllten Abzweigverbindern herstellen. Bei teil- und vollintegrierten Fahrzeugen die blaue Leitung an Pin 1 gemäß Primärquelle nicht anschließen.

## Versorgung und Zündung

Am kleineren grauen Stecker mit blauer Lasche den Einsatz herausziehen.

Pin | Fahrzeugleitung | WiPro-Leitung | Funktion | 
 18 | rot, Code 7772 | rot | +12 V / Klemme 30 ; über die 10 A -Sicherung oben links abgesichert | 
 17 | grün, Code 8373 | gelb | Zündung / Klemme 15 | 

Pin 18, Dauerspannung, Sicherungswert, Pin 17 und Zündung vor dem Abzweig messen beziehungsweise eindeutig identifizieren. Bei eingeschalteter Zündung ist die WiPro laut Fehlerdiagnose deaktiviert.

## Masse und Fahrzeughupe

Die schwarze WiPro-Leitung an dem abgebildeten oder einem anderen eindeutig geeigneten Massepunkt anschließen.

Modellzeitraum / Ausführung | Fahrzeuganschluss | WiPro / Maßnahme | 
 bis Modelljahr 2017 | dickeres blaues Kabel im Kabelstrang oben an der Lenksäule | rosa WiPro-Leitung | 
 ab Modelljahr 2017 | Bodycomputer, Stecker E, Pin 8, Kennzeichnung 1116 | rosa WiPro-Leitung nach eindeutiger Identifikation | 
 Modelljahre 2018/19 mit +12 V -Hupenansteuerung | Hupensignal ist nicht massegeschaltet | geeignetes Kfz-Relais zur Invertierung des WiPro-Hupenausgangs verwenden | 
 ab Modelljahr 2019 | Fahrzeughupe laut Primärquelle nicht mehr ansteuerbar | Zusatzsirene oder zusätzliche Hupe dringend empfohlen | 

Die Quelle nennt „bis Modelljahr 2017“ und „ab Modelljahr 2017“ überlappend. Bei einem Fahrzeug des Modelljahrs 2017 deshalb nicht allein nach Datum entscheiden, sondern Anschlussort, Stecker E, Pin 8, Kennzeichnung 1116 und elektrische Schaltart prüfen.

Bereits ab Modelljahr 2018 empfiehlt die Primärquelle eine Zusatzsirene oder Zusatzhupe . Vor Anschluss einer Hupe immer feststellen, ob Masse oder +12 V geschaltet wird.

## Status-LED und Zentrale montieren

Gewünschte LED-Position mit dem Kunden abstimmen.

Rückwärtigen Bauraum auf Leitungen und Bauteile prüfen.

Loch mit 8 mm Durchmesser bohren.

Status-LED einsetzen und mit dem WiPro-Kabelbaum verbinden.

Zentrale an einem trockenen, geschützten Ort mit dem rückseitigen Klebepad befestigen.

Leitungen zugentlastet verlegen und Antenne weder kürzen noch aufwickeln.

## Teil- und vollintegrierte Fahrzeuge

Bei teil- und vollintegrierten Iveco-Daily-Aufbauten wird die blaue ZV-Öffnen-Leitung nicht angeschlossen . Das Grundprofil bleibt SW2 + SW6 ; SW5 kommt nur bei nachgewiesener Umrüstplatine hinzu.

Die im Altbestand genannten Sonderfälle „Iveco Daily 4×4 MJ 2021“ und „Carthago 2022“ stammen aus den lokal fehlenden Word-Dateien und werden deshalb nicht als freigegebene fahrzeugspezifische Lösung fortgeführt. Eine abweichende ZV-Funktion ist mit der folgenden Zusatzmatrix und bei Bedarf mit THITRONIK Support zu prüfen.

## ZV-Anpassmatrix mit SW1 und SW3

Die einseitige Zusatzquelle ZV - IVECO Daily.pdf enthält zwölf Prüfschritte. Konstant sind:

blaue WiPro-Leitung an grauem Stecker Pin 1, braune Fahrzeugleitung 0000 ;

blau/schwarze WiPro-Leitung an grünem Stecker Pin 34, grüne Fahrzeugleitung 0968 ;

das Grundprofil SW2 + SW6 sowie SW5 nur bei Umrüstplatine.

Schritt | Blau / Pin 1 | Blau-schwarz / Pin 34 | SW1 | SW3 | 
 1 | verbunden | verbunden | OFF | OFF | 
 2 | verbunden | verbunden | ON | OFF | 
 3 | verbunden | verbunden | OFF | ON | 
 4 | verbunden | verbunden | ON | ON | 
 5 | getrennt | verbunden | OFF | OFF | 
 6 | getrennt | verbunden | ON | OFF | 
 7 | getrennt | verbunden | OFF | ON | 
 8 | getrennt | verbunden | ON | ON | 
 9 | verbunden | getrennt | OFF | OFF | 
 10 | verbunden | getrennt | ON | OFF | 
 11 | verbunden | getrennt | OFF | ON | 
 12 | verbunden | getrennt | ON | ON | 

Diese Matrix ist kein alternativer Standard-DIP-Satz. Sie darf nur zur gezielten ZV-Anpassung verwendet werden:

Ausgangszustand und Grundprofil dokumentieren.

Vor jeder Änderung von SW1 oder SW3 die Spannungsversorgung trennen.

Jeweils nur die in einer Tabellenzeile angegebene Kombination herstellen.

Verriegeln, Entriegeln, Schärfen und Entschärfen vollständig prüfen.

Nur eine eindeutig funktionierende Kombination dokumentiert belassen; bei unklarem Ergebnis Arbeit stoppen und THITRONIK Support einbeziehen.

## Abschließende Funktionsprüfung

Fahrzeugtüren schließen und System mit der Verriegeln-Taste der freigegebenen Fahrzeugfernbedienung scharfschalten.

Falls die WiPro zunächst nicht reagiert, mehrmals ver- und entriegeln, damit sich die CAN-Daten synchronisieren.

Piepton, Blinken der Fahrtrichtungsanzeiger und blinkende Status-LED als Aktivierungsbestätigung prüfen.

Eine Fahrerhaustür geöffnet lassen und prüfen, dass das Fahrzeug nicht verriegelt und die WiPro nicht aktiviert wird.

Fahrzeug korrekt verriegeln und über jede erfasste Fahrerhaustür sowie jedes angelernte Funk-Zubehör einen Testalarm auslösen.

Akustischen Alarm für etwa 30 Sekunden prüfen.

Optischen Alarm über die Fahrzeugblinker für etwa 180 Sekunden prüfen, sofern der Alarm nicht vorher beendet wird.

Mit der Entriegeln-Taste entschärfen beziehungsweise den Alarm unterbrechen.

CAN-Erkennung, Warnblinker, Zentralverriegelung, Status-LED und vorhandene Sirene beziehungsweise Hupe einzeln prüfen.

Abschließend kontrollieren, dass keine neuen Warnlampen, elektrischen Fehler oder Fehlerspeichereinträge entstanden sind.

Eine Folge kurzer Pieptöne beim Scharfschalten weist auf einen offenen angelernten Magnetkontakt hin; die Anlage schaltet laut Quelle trotzdem scharf.

## Funk-Magnetkontakte

Für Funk-Magnetkontakte gelten:

Platine so einsetzen, dass die Sende-LED vom Magneten wegweist; falsche Ausrichtung erlaubt zwar das Anlernen, verhindert aber die Alarmierung.

Magnet im dokumentierten Bereich von 22–30 mm positionieren und nicht jenseits der roten Grenzlinie montieren.

Klebefläche sauber, trocken und fettfrei vorbereiten.

Nicht unter 15 °C verarbeiten; etwa 24 Stunden bis zur Endfestigkeit abwarten.

Für größere Abstände oder bessere Antennenausrichtung Montageadapter Art. 100428 oder 100729 verwenden.

Weitere Vorgaben enthält Funk-Magnetkontakt 868 .

## Fehlerdiagnose

Fehlerbild | Prüfung und Maßnahme | 
 Keine Reaktion auf Fahrzeug-Funkfernbedienung, aber Piepton beim Anlegen der Versorgung | CAN-Verbindung weiß/orange und violett/orange prüfen; Diagnosemodus kurz per Platinentaster aktivieren und bei CAN-Datenverkehr auf Flackern der Status-LED achten. | 
 Kein CAN-Datenverkehr im Diagnosemodus | Bus inaktiv oder Verbindung fehlerhaft; Pins und Codes prüfen und ab 2019/2022 nicht von Grau beziehungsweise Weiß auf die CAN-Funktion schließen. | 
 Keine Reaktion und kein Piepton beim Anlegen der Versorgung | Versorgung, Pin 18, Code 7772 , Crimp- oder Abzweigverbindung, Zündungszustand und 10 A -Sicherung oben links prüfen. | 
 System bleibt bei eingeschalteter Zündung inaktiv | dokumentiertes Verhalten; Pin 17, Code 8373 und Klemme 15 prüfen. | 
 Offener Magnetkontakt trotz geschlossener Öffnungen | Magnetabstand und Platinenorientierung prüfen, Kontakte mehrfach betätigen; falls nötig bei geschlossenen Kontakten Versorgung beziehungsweise Sicherung kurz trennen und wiederherstellen. | 
 Zentralverriegelung reagiert nicht korrekt | Grundprofil, Umrüstplatine, Pin 1/34, Codes 0000 / 0968 und Anschluss der blauen beziehungsweise blau/schwarzen Leitung prüfen; ZV-Matrix nur schrittweise und spannungsfrei anwenden. | 
 Fahrzeughupe ohne Funktion | Modelljahr, Anschlussort, Stecker E Pin 8, Kennzeichnung 1116 und Masse-/ +12-V -Schaltart prüfen; ab 2019 separate Sirene oder Hupe verwenden. | 
 Fahrzeug oder Stecker weicht von der Anleitung ab | Arbeit stoppen und fahrzeugspezifische Freigabe beim Hersteller oder THITRONIK Support einholen. | 

Weitere Prüfungen beschreibt Störungsbeseitigung .

## Quellenentscheidung

Das zehnseitige fahrzeugspezifische Einbauhandbuch WiPro III + safe.lock – Iveco Daily 2011–2024 (Euro 5 und neuer) , Stand 01/2026 , wurde vollständig textlich und visuell geprüft.

Seine DIP-Grafik belegt SW2 + SW6 . SW5 wird ausschließlich bei vorhandener Umrüstplatine ergänzt. Die falsche Altbestands- und Matrixangabe SW1 beziehungsweise SW1 + SW5 wurde korrigiert.

Die einseitige Zusatzquelle ZV - IVECO Daily.pdf wurde vollständig visuell geprüft und als zwölfstufige Anpassmatrix für SW1 , SW3 sowie die beiden ZV-Ausgänge übernommen.

Das allgemeine Installationshandbuch Version 1.8 ergänzt Sicherheits- und Diagnosegrundlagen; abweichende ältere Fahrzeuggruppenangaben haben keinen Vorrang.

Iceco Daily.docx und Fahrzeugbesonderheiten.docx sind lokal nicht auffindbar. Daraus stammende 4×4-/Carthago-Sonderaussagen und eine Funktionsdeutung von SW1 / SW3 wurden nicht als belegt übernommen.

Die Hinweise der Primärquelle zu Kabelfarben ab 2025 wurden vom Geltungsbereich 2011–2024 getrennt; sie begründen keine Freigabe für die abweichende BCM-Generation.

## Querverweise

WiPro III 

safe.lock Umrüstplatine 

Fahrzeugkompatibilität 

Seriennummern und Softwarestände 

Sirenen und Hupen 

Funk-Magnetkontakt 868 

Anlernvorgang 

Störungsbeseitigung 

Iveco Daily Euro 4
