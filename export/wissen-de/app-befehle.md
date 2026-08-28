# THITRONIK® App — Befehle, Einrichtung und Fehlerbehebung

Route: /de/app-befehle | Stand: 2026-07-14 | Sichtbarkeit: standard
Quelle: Thitronik Online/project-data/runtime/wiki/wiki-articles/de/app-befehle.json

---
THITRONIK® App — Befehle, Einrichtung und Fehlerbehebung

Mit der THITRONIK® App lassen sich kompatible Geräte der Familien WiPro III , WiPro III safe.lock und Pro-Finder bedienen:

im Nahbereich per Bluetooth über BT-connect oder das Bluetooth-Vernetzungsmodul 

aus der Ferne per SMS über Pro-Finder 

Welche Schaltflächen die App anbietet, hängt von den eingetragenen Geräten, deren tatsächlichem Hard- und Softwarestand sowie der gewählten Zugangsart ab. Eine in der App eingetragene Seriennummer erweitert nicht die Funktionen der vorhandenen Hardware.

## SMS-Befehle der öffentlichen Befehlsmatrix 1.1

Die Befehle müssen als Text an die Rufnummer des Pro-Finders gesendet werden. In der App werden sie abhängig von der eingestellten Sprache vorbereitet.

### WiPro und Zentralverriegelung

Funktion | Deutsch | English | Français | Svenska | 
 Scharfschalten | scharf | arm | arme | skarp | 
 Unscharfschalten | unscharf | disarm | desarme | oskarp | 
 Anlernmodus einschalten | anlernmodus an | teach mode on | mode d'apprentissage active | inlarningslage pa | 
 Anlernmodus ausschalten | anlernmodus aus | teach mode off | mode d'apprentissage desactive | inlarningslage av | 
 Fahrzeug verriegeln¹ | zu | lock | ferme | las | 
 Fahrzeug entriegeln¹ | auf | unlock | ouvert | las upp | 

¹ Nur mit einer kompatiblen WiPro III safe.lock und passender Fahrzeuganbindung. Scharfschalten und Verriegeln beziehungsweise Unscharfschalten und Entriegeln sind grundsätzlich getrennte Funktionen.

### Ausgänge A und B

Funktion | Deutsch | English | Français | Svenska | 
 Ausgang A dauerhaft einschalten | a an | a on | a active | a pa | 
 Ausgang A für 1–120 Minuten einschalten | a N | a N | a N | a N | 
 Ausgang A ausschalten | a aus | a off | a desactivee | a av | 
 Kill-Funktion auslösen | kill | kill | kill | kill | 
 Ausgang B dauerhaft einschalten | b an | b on | b activee | b pa | 
 Ausgang B für 1–120 Minuten einschalten | b N | b N | b N | b N | 
 Ausgang B ausschalten | b aus | b off | b desactivee | b av | 

Bei a N beziehungsweise b N wird N durch die gewünschte Dauer von 1 bis 120 Minuten ersetzt, zum Beispiel a 30 für 30 Minuten. Die Schreibweise "1-120" in der Befehlsmatrix bezeichnet den zulässigen Wertebereich; die Anführungszeichen und der Bereich werden nicht mitgesendet.

⚠️ WARNUNG — Fahrzeugstilllegung : Für die Abschalteinrichtung ausschließlich kill verwenden. kill schaltet Ausgang A erst ein, nachdem die GPS-Geschwindigkeit mindestens 5 Sekunden durchgehend 0 km/h betragen hat. a an und a N besitzen diese Sicherheitsprüfung nicht und dürfen nicht zum Stilllegen eines Fahrzeugs verwendet werden. Die Stilllegung wird mit a aus aufgehoben.

### Geofencing und Abfragen

Funktion | Deutsch | English | Français | Svenska | 
 Geofencing einschalten | fence an | fence on | gardiennage active | fence pa | 
 Geofencing ausschalten | fence aus | fence off | gardiennage desactive | fence av | 
 Status abfragen | status | status | statut | status | 
 Position abfragen | pos | pos | pos | pos | 

## Weitere dokumentierte Pro-Finder-Befehle

Die interne Befehlsmatrix führt für die Softwarestände 9.1 , 9.4 und 10.0.0 weitere Befehle auf. Bei deutsch eingestellter Gerätesprache gelten unter anderem:

Funktion | Befehl | 
 Alarm auslösen | alarm | 
 Angelernte Melder beziehungsweise Komponenten abfragen | melder | 
 Ausgang A für 1 Sekunde einschalten | a impuls | 
 Ausgang B für 1 Sekunde einschalten | b impuls | 
 GPS einschalten | gps an | 
 GPS ausschalten | gps aus | 
 Position abfragen | position oder pos | 

alarm löst einen Alarm aus. Den Befehl nur in einer kontrollierten Testsituation verwenden und anwesende Personen vorher informieren.

Die dokumentierten Sprachkürzel für die Programmier-SMS lauten DE , FR , DK , GB , NL , IT , SE und CZ . Laut interner Matrix sind die farblich gekennzeichneten Buchstaben in der Programmier-SMS nicht von Groß- und Kleinschreibung abhängig. Für Bedienbefehle empfiehlt sich dennoch die dokumentierte Schreibweise.

## App-Kompatibilität und Seriennummern

### Dokumentierte Mindeststände

Funktion | Gerät | Ab Seriennummer | 
 App-Grundfunktionen | WiPro III | 0823-018 | 
 App-Grundfunktionen | WiPro III safe.lock | 1050-004 | 
 App-Grundfunktionen | Pro-Finder | 0699-013 | 
 Zentralverriegelung und Anlernmodus Easy-Add 3.0 | WiPro III safe.lock | 1050-004 , Ford-Set 5298-001 oder Sprinter-Set 5458-001 | 
 Zentralverriegelung und Anlernmodus Easy-Add 3.0 | Pro-Finder | 0699-013 | 
 Kombifunktion „Verriegeln und Scharfschalten“ | WiPro III safe.lock | 1050-006 | 
 Kombifunktion „Verriegeln und Scharfschalten“ | Pro-Finder | 0699-015 | 

Die Seriennummer allein genügt nicht immer für eine Kompatibilitätsentscheidung. Zusätzlich sind Gerätevariante, Softwarestand und Fahrzeuganbindung zu prüfen.

### Eingabewerte bei unbekannter Seriennummer

Ist die tatsächliche Seriennummer bei der App-Einrichtung nicht verfügbar, nennen die FAQ folgende Eingabewerte, um einen fast vollständigen Umfang an App-Optionen anzuzeigen:

Gerät | Eingabewert | 
 WiPro III | 0823-018 | 
 WiPro III safe.lock | 1050-003 | 
 Pro-Finder | 0699-012 | 

Diese Werte sind keine Kompatibilitätsbestätigung und ersetzen nicht die echte Seriennummer. Nicht unterstützte Funktionen werden dadurch weder freigeschaltet noch nachgerüstet. Ob ein Geräteupdate möglich ist, muss THITRONIK anhand des tatsächlichen Gerätestands prüfen.

## Pro-Finder per Programmier-SMS einrichten

Ein Pro-Finder reagiert erst auf Bedienbefehle, nachdem mindestens eine Rufnummer mit einer Programmier-SMS hinterlegt wurde. Die App erzeugt diese SMS passend zum SIM-Kartentyp und zur Smartphone-Nutzung.

### Syntaxbeispiele

SIM-Karte | Smartphone/App | Standard ohne Smartphone-Kennzeichnung | 
 Prepaid | *100#PDE+S491701234567 | *100#PDE+491701234567 | 
 Vertrag | DE+S491701234567 | DE+491701234567 | 

### Bedeutung der Bestandteile

Bestandteil | Bedeutung | 
 *100# | Beispiel für einen anbieterspezifischen Guthaben-Abfragecode; nur bei Prepaid verwenden und an den Mobilfunkanbieter anpassen | 
 P | Kennzeichnung einer Prepaid-Karte | 
 DE | Sprachkürzel; weitere dokumentierte Kürzel: FR , DK , GB , NL , IT , SE , CZ | 
 + | Kennzeichnung einer autorisierten Rufnummer; die erste Rufnummer ist die Masternummer | 
 S | Smartphone-Kennzeichnung; Positionen werden als anklickbarer Kartenlink aufbereitet | 
 491701234567 | Beispielrufnummer im internationalen Format mit Ländervorwahl und ohne führende Inlandsnull | 

Keine Leerzeichen in die Programmier-SMS einfügen. Bei der Prepaid-Smartphone-Syntax steht das Sprachkürzel zwischen P und +S .

SIM-Typ korrekt wählen: Bei einer Vertragskarte darf kein Guthaben-Abfragecode eingetragen sein. Ein ungeeigneter oder falscher Abfragecode kann den Pro-Finder im Alarmfall auf eine Providerantwort warten lassen und dadurch Alarmmeldungen verhindern.

Weitere Hinweise zu SIM-Karten, Netzbetreibern und Smartphone-Einstellungen stehen unter Mobilfunk & SIM-Karten .

### Sprache und Fahrzeugdaten in der App ändern

In der App Einstellungen öffnen und die Sprache wählen.

Das Fahrzeug öffnen und unter Technische Daten Fahrzeugtyp und Zugangsart wählen.

Das Fahrzeug speichern.

Unter Fahrzeugeinstellungen eine neue Programmier-SMS erzeugen.

Sprachkürzel, SIM-Typ und Rufnummer prüfen.

SMS senden und die Statusantwort des Pro-Finders abwarten.

## Fehlerbehebung

### Pro-Finder reagiert nicht auf Befehle

Prüfen, ob bereits eine erfolgreiche Programmier-SMS gesendet wurde. Nicht gespeicherte Absender werden ignoriert.

Kam nach der Einrichtung kein Statusbericht an und wurde die SIM-Karte schon vor ihrer Freischaltung eingesetzt, den Pro-Finder 5 Sekunden spannungsfrei schalten, wieder versorgen und etwa eine Minute warten.

Rufnummer, SIM-Typ, Sprachkürzel und Guthaben-Abfragecode in der Programmier-SMS prüfen.

### Statusabfrage funktioniert, WiPro-Alarme fehlen aber

Verbindungskabel zwischen WiPro und Pro-Finder an beiden Geräten prüfen.

Kontrollieren, ob die erste Zeile des Statusberichts den WiPro-Zustand anzeigt.

Falls ja, die SIM-Konfiguration prüfen: Bei einer Vertragskarte darf kein Prepaid-Abfragecode programmiert sein; bei Prepaid muss der Code zum Anbieter passen.

Programmier-SMS mit den korrigierten Angaben erneut über die App senden.

### Eine zweite Zielrufnummer erhält keine Alarm-SMS

Der Pro-Finder versendet Alarm-SMS nacheinander. Wird der Alarm schnell unscharf geschaltet, können später gespeicherte Zielrufnummern unbenachrichtigt bleiben. Für einen kontrollierten Alarmtest daher genügend Zeit einplanen.

### Android meldet „Ungültiger Befehl“ oder sendet die SMS nicht

RCS beziehungsweise Chatnachrichten in der Nachrichten-App deaktivieren und den Versand als klassische SMS erzwingen.

Falls verfügbar, den SMS-Eingabemodus auf GSM-Alphabet beziehungsweise ASCII stellen; Unicode kann die Befehlssyntax verändern.

Danach die Programmier-SMS in der THITRONIK® App neu erzeugen.

### iPhone meldet „Ungültiger Befehl“ oder Pro-Finder reagiert nicht

Auf dem iPhone, das für die Erstkonfiguration verwendet wurde, iMessage versuchsweise deaktivieren und die Nachricht erneut als SMS senden.

### Pro-Finder ohne WiPro verwenden

Der Pro-Finder kann auch ohne WiPro betrieben werden. Verfügbar sind dann insbesondere:

GPS-Ortung

Geofencing per SMS oder Spannungseingang

Spannungsmesseingänge

die Ausgänge A und B

Die Kill-Funktion erfordert zusätzlich eine fachgerecht installierte Abschalteinrichtung an Ausgang A.

### Bluetooth-Kopplung oder Schaltfläche nicht sichtbar

Eine sehr große Systemschrift oder Bildschirmvergrößerung kann Bedienelemente verdecken:

Android: Einstellungen → Anzeige/Display → Schriftgröße und -stil beziehungsweise Zoom 

iOS: Einstellungen → Anzeige & Helligkeit → Textgröße 

Schriftgröße beziehungsweise Zoom vorübergehend verringern und die Kopplung erneut durchführen. Gerätespezifische Hinweise stehen unter BT-connect und Bluetooth-Vernetzungsmodul .

### App schließt sich nach einem Betriebssystem-Update

App vollständig schließen und neu öffnen.

Smartphone neu starten.

Bleibt der Fehler bestehen, Diagnosedaten an THITRONIK senden und vor einer Neuinstallation den Support kontaktieren.

### Diagnosedaten senden

In der App das Zahnrad oben rechts öffnen und Kontakt → E-Mail schreiben wählen. Laut App-Anleitung werden die in der App eingetragenen Telefonnummern dabei nicht übertragen.

### Zeitstempel weicht um ein oder zwei Stunden ab

THITRONIK verwendet UTC als feste Zeitbasis; diese wird nicht manuell angepasst. In Deutschland liegt die Mitteleuropäische Zeit im Winter eine Stunde und im Sommer zwei Stunden vor UTC. Die Abweichung ist daher kein Gerätefehler.

## Querverweise

Pro-Finder — SMS-Fernsteuerung, Rufnummern und GPS

BT-connect — Bluetooth-Steuerung im Nahbereich

Bluetooth-Vernetzungsmodul — älterer Bluetooth-Adapter

WiPro III — Gerätegenerationen und Softwarestände

Anlernvorgang — Easy-Add-Verfahren

Abschalteinrichtung — sichere Verwendung der Kill-Funktion

Mobilfunk & SIM-Karten — SIM-, Provider- und Netzhinweise
