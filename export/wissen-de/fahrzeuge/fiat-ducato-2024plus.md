# Fiat Ducato Facelift / Citroën Jumper / Peugeot Boxer / Opel Movano (2024+)

Route: /de/fahrzeuge/fiat-ducato-2024plus | Stand: 2026-07-19 | Sichtbarkeit: standard
Quelle: Thitronik Online/project-data/runtime/wiki/wiki-articles/de/fahrzeuge/fiat-ducato-2024plus.json

---
Fiat Ducato Facelift / Citroën Jumper / Peugeot Boxer / Opel Movano (2024+)

Dieser Artikel beschreibt den Anschluss einer WiPro III safe.lock an das Fiat-Ducato-Facelift und die dokumentierten baugleichen Modelle ab 2024. Gegenüber der Fahrzeuggruppe 2022–2024 ändern sich mehrere Leitungsfarben und die Pinbelegung am grauen Stecker.

Abgrenzung: Die Erstzulassung allein reicht nicht zur Zuordnung. Modelljahr, Bordcomputer, Stecker, Leitungsfarben, WiPro- Seriennummer und Softwarestand müssen gemeinsam geprüft werden. Entspricht die Elektrik der früheren Ausführung, gilt Fiat Ducato 2022–2024 .

## Geltungsbereich

Merkmal | Vorgabe | 
 Fahrzeuge | Fiat Ducato Facelift, Citroën Jumper, Peugeot Boxer und Opel Movano | 
 Modelljahre | ab 2024; tatsächliche elektrische Ausführung prüfen | 
 Alarmsystem | WiPro III safe.lock beziehungsweise fachgerecht auf safe.lock erweiterte WiPro III | 
 Anschlussort | Bordcomputer neben dem Sicherungskasten hinter dem Ablagefach | 
 DIP-Konfiguration | variantenabhängig; ausschließlich nach aktueller fahrzeugspezifischer Einbauunterlage | 
 Mindest-Seriennummer | 1050-046 | 
 Mindest-Softwarestand | 7.5.3s | 

Vollständige Präfixe und Softwaremeilensteine stehen unter Seriennummern und Softwarestände . Die systemübergreifende Einordnung enthält Fahrzeugkompatibilität .

## Quellenstand und Softwaregrenze

Fahrzeugausführung | Mindest-Seriennummer | Zugeordneter Softwarestand | Einordnung | 
 Ducato-Facelift und dokumentierte Parallelmodelle ab 2024 | 1050-046 | 7.5.3s | erste freigegebene Unterstützung dieser Elektronikgeneration | 

Die Kombination 1050-046 und mindestens 7.5.3s ist in der freigegebenen Seriennummern- und Versionshistorie als Unterstützung für das Fiat-Ducato-Facelift ab 2024 dokumentiert. Artikelnummer , vollständige Seriennummer und tatsächlich installierte Software dürfen nicht miteinander verwechselt werden.

## Sicherheit und Vorbereitung

Arbeiten an Fahrzeugelektrik und -elektronik nur durch eine qualifizierte Fachwerkstatt ausführen lassen.

Vor dem Öffnen der WiPro, dem Umstellen von DIP-Schaltern oder elektrischen Arbeiten die Spannungsversorgung nach Herstellervorgabe trennen.

Klemme 30 , Klemme 15 und Masse messtechnisch bestätigen; Leitungen nicht allein nach Farbe zuordnen.

Ungenutzte Ein- und Ausgänge einzeln gegen Kurzschluss isolieren.

Stecker, Pin-Nummern und Leitungsfarben mit der tatsächlichen Fahrzeugausführung vergleichen.

Bei jeder Abweichung die Arbeit stoppen und Fahrzeughersteller oder THITRONIK Support einbeziehen.

Vor Beginn sind Funk-Fernbedienung, Zentralverriegelung, Fahrzeughupe, Türanzeigen, Warnlampen und vorhandene Fehlerspeichereinträge zu prüfen und zu dokumentieren.

## DIP-Konfiguration sicher festlegen

Der lokale Redaktionsbestand bezeichnet die DIP-Konfiguration als fahrzeug- beziehungsweise variantenabhängig, enthält aber keine belastbare vollständige Schaltertabelle. Die Stellung muss deshalb aus der aktuellen Einbauunterlage für die konkrete Fahrzeugausführung übernommen werden.

Vollständige WiPro-Seriennummer und installierten Softwarestand notieren.

Fahrzeug, Modelljahr, Infotainment-Ausführung und Bordcomputer bestimmen.

Aktuelle fahrzeugspezifische Einbauunterlage anhand dieser Daten auswählen.

WiPro spannungsfrei schalten und das Gehäuse öffnen.

Nur die dort dokumentierte DIP-Stellung einstellen.

Gehäuse schließen und Spannungsversorgung wiederherstellen.

Scharf-/Unscharfschalten sowie Ver-/Entriegeln getrennt prüfen.

Erfolgreiche DIP-Stellung, Fahrzeugausführung, Seriennummer und Softwarestand dauerhaft dokumentieren.

Wichtig: DIP-Schalter niemals unter Spannung umstellen. Nicht dokumentierte Kombinationen dürfen weder rekonstruiert noch probeweise durchgeschaltet werden.

## Zugang zum Bordcomputer und Grundanschluss

Ablagefach und erforderliche Verkleidungsteile nach Fahrzeugvorgabe entfernen.

Bordcomputer neben dem Sicherungskasten zugänglich machen.

Vor dem Lösen der Stecker deren Lage und Verriegelung dokumentieren.

Schwarze WiPro-Leitung an einem freigegebenen Fahrzeug-Massepunkt anschließen.

Braunen und grauen Stecker an der Rückseite bearbeiten; den grünen Stecker nach dem Zurückklappen des Bordcomputers anschließen.

Alle Abzweige sind dauerhaft und zugentlastet nach WiPro-Installationsvorgabe auszuführen. Die folgenden Farben bezeichnen zuerst die Fahrzeugleitung und danach die WiPro-Leitung.

## Brauner Stecker: Warnblinker und Fahrzeughupe

Pin | Fahrzeugleitung | WiPro-Leitung | Funktion | 
 59 | weiß/blau | rot/rosa | Warnblinker | 
 11 | grün/violett | rosa | Fahrzeughupe | 

Sirene und Fahrzeughupe sind unterschiedliche Alarmgeber. Die rosa WiPro-Leitung an Pin 11 steuert hier die Fahrzeughupe und ist nicht mit einem Sirenenausgang gleichzusetzen.

## Grauer Stecker: Spannungsversorgung und Zündung

Pin | Fahrzeugleitung | WiPro-Leitung | Funktion | 
 5 | rot/violett | rot | Klemme 30, Dauerplus | 
 3 | rosa/grün | gelb | Klemme 15, Zündung | 

Klemme 30 und Klemme 15 vor dem Anschluss messen. Diese Belegung unterscheidet sich ausdrücklich von der Fahrzeuggruppe 2022–2024; die beiden Artikelschemata dürfen nicht vermischt werden.

## Grüner Stecker: Zentralverriegelung und CAN

Pin | Fahrzeugleitung | WiPro-Leitung | Funktion | 
 9 | beige/violett | blau/schwarz | Zentralverriegelung vorn | 
 41 | grün/blau | blau | Zentralverriegelung hinten | 
 42 | weiß/schwarz | violett/orange | CAN-Low | 
 43 | weiß | weiß/orange | CAN-High | 

CAN-High und CAN-Low sowie die beiden Zentralverriegelungsleitungen dürfen nicht vertauscht werden. Bei teil- oder vollintegrierten Fahrzeugen ist die tatsächliche Türerfassung einzeln zu prüfen.

## Native safe.lock oder safe.lock-Upgrade

Eine ab Werk vorhandene WiPro III safe.lock ist von einer hardwareseitig auf safe.lock erweiterten WiPro III zu unterscheiden. Für das Upgrade dokumentiert die Zusatzanleitung folgende neu einzusteckende WiPro-Leitungen:

WiPro-Pin | Neue Leitung | Bedeutung | 
 20 | blau | Zentralverriegelungsleitung | 
 19 | blau/schwarz | Zentralverriegelungsleitung | 
 16 | weiß/schwarz | falls bereits belegt, parallel abgreifen | 

Nach der Ein-/Ausgangskontrolle eines Upgrades ist der Funkspeicher geleert. Sämtliches Funk-Zubehör muss erneut nach Anlernvorgang angelernt werden. Die Upgrade-Anleitung ersetzt nicht die fahrzeugspezifische Pinbelegung am Fahrzeug.

## Erforderliche Fahrzeugeinstellungen

Im Fahrzeugmenü sind für die dokumentierte Funktion folgende Einstellungen zu aktivieren:

„Blinker beim Verriegeln“

„Türentriegelung beim Aussteigen“

Die Bezeichnungen können je nach Sprache und Softwarestand des Fahrzeugs abweichen. Nach jeder Änderung sind Verriegelung, Entriegelung, Blinkerquittierung und WiPro-Reaktion real zu prüfen.

## Abschließende Funktionsprüfung

Alle Stecker, Verriegelungen, Abzweige, Isolierungen, Masseverbindung, Sicherung und DIP-Stellung kontrollieren.

Seriennummer, Softwarestand, gewählte DIP-Stellung und Fahrzeugausführung dokumentieren.

WiPro scharfschalten und die korrekte Bestätigung des Alarmzustands prüfen.

Fahrzeug verriegeln und die Funktion von Vorder- und Hintertüren prüfen.

Fahrzeug entriegeln und beide Zentralverriegelungswege erneut prüfen.

Jede über CAN überwachte Originaltür einzeln öffnen und die Alarmreaktion kontrollieren.

Warnblinker über Pin 59 und Fahrzeughupe über Pin 11 im Testalarm prüfen.

Die beiden erforderlichen Fahrzeugeinstellungen verifizieren.

Bei einem safe.lock-Upgrade jedes neu angelernte Funk-Zubehör einzeln auslösen.

Abschließend kontrollieren, dass keine neuen Warnlampen oder Fehlerspeichereinträge entstanden sind.

Als unabhängige Bedienwege können je nach Systemausführung Funk-Handsender 868 und NFC Modul vorgesehen werden. Ihre Zentralverriegelungsfunktion hängt von der korrekten safe.lock-Anbindung ab.

## Fehlerdiagnose

Fehlerbild | Prüfung und Maßnahme | 
 WiPro reagiert nicht korrekt auf Fahrzeugbedienung | Seriennummer 1050-046 und Software 7.5.3s sowie die freigegebene DIP-Stellung prüfen. | 
 Zentralverriegelung funktioniert nur vorn oder hinten | Verbindungen an Pin 9 und Pin 41 sowie blaue und blau/schwarze WiPro-Leitung prüfen. | 
 Originaltüren lösen keinen CAN-Alarm aus | CAN-Low an Pin 42 und CAN-High an Pin 43 prüfen; Leitungen nicht auf Verdacht tauschen. | 
 Keine Blinkeransteuerung | Verbindung von Pin 59 zur rot/rosa WiPro-Leitung und Fahrzeugeinstellung prüfen. | 
 Fahrzeughupe bleibt ohne Funktion | Verbindung von Pin 11 zur rosa WiPro-Leitung und Hupenfunktion des Fahrzeugs prüfen. | 
 Funk-Zubehör reagiert nach safe.lock-Upgrade nicht | Zubehör vollständig neu anlernen; der Speicher wurde bei der Upgrade-Prüfung geleert. | 
 Grauer Stecker entspricht der älteren Pinbelegung | Fahrzeuggeneration erneut bestimmen und die Arbeit bis zur eindeutigen Zuordnung stoppen. | 

Weitere systemübergreifende Prüfungen beschreibt Störungsbeseitigung .

## Quellenentscheidung

Die Facelift-spezifischen Pin- und Leitungsangaben stammen aus dem vorhandenen fahrzeugspezifischen Redaktionsbestand; die dort genannten DOCX-Primärdateien sind im lokalen Quellbestand nicht mehr auffindbar.

Die Freigabegrenze 1050-046 / 7.5.3s folgt der freigegebenen Seriennummern- und Versionshistorie .

Die vierseitige THITRONIK-Zusatzanleitung WiPro III safe.lock Upgrade , Revision 2.0 , wurde vollständig textlich und visuell geprüft. Sie belegt die WiPro-Pins 20, 19 und 16 sowie das notwendige erneute Anlernen des Funk-Zubehörs.

Die Upgrade-Anleitung ist keine fahrzeugspezifische Anschlussanleitung. Fehlende DIP-Stellungen oder abweichende Fahrzeugleitungen dürfen nicht rekonstruiert oder erraten werden.

## Querverweise

WiPro III 

Seriennummern und Softwarestände 

Fahrzeugkompatibilität 

Funk-Handsender 868 

NFC Modul 

Anlernvorgang 

Fiat Ducato 2022–2024 

Störungsbeseitigung
