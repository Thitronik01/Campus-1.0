# VW T5 (2006–2009)

Route: /de/fahrzeuge/vw-t5 | Stand: 2026-07-22 | Sichtbarkeit: standard
Quelle: Thitronik Online/project-data/runtime/wiki/wiki-articles/de/fahrzeuge/vw-t5.json

---
VW T5 (2006–2009)

Diese Seite beschreibt den Einbau einer WiPro III in den VW T5 der Baujahre 2006–2009. Maßgeblich ist das zehnseitige fahrzeugspezifische Einbauhandbuch Stand 12/20 ; das allgemeine WiPro-III-Installationshandbuch Revision 1.8 ergänzt Sicherheit und die Pinbelegung des 20-poligen Kabelsatzes.

Abgrenzung: Für den T5 Facelift ab Modelljahr 2010 gilt VW T5 Facelift (ab MJ 2010) . Baujahr, Steckerform, Leitungsfarben und Signale müssen gemeinsam zur hier beschriebenen Vor-Facelift-Ausführung passen.

## Überblick

Parameter | Verifizierter Stand | 
 Fahrzeug | VW T5 vor Facelift | 
 Baujahre | 2006–2009 | 
 System | WiPro III | 
 DIP → ON | SW1 + SW3 + SW6 | 
 Fahrzeugstecker | Stecker G, schwarzes Gehäuse, 18-polig, drei Reihen mit je sechs Kontakten | 
 CAN-Überwachung | alle Originaltüren und Motorhaubenkontakt | 
 Bedienung | Fahrzeugfunkschlüssel; Funk-Zubehör zusätzlich anlernbar | 
 Mindestseriennummer / Software | in den Primärquellen nicht genannt | 
 Alarmdauer | akustisch ca. 30 Sekunden , optisch ca. 180 Sekunden | 

## Quellenumfang und Freigabegrenzen

Thema | Freigegebene Aussage | 
 Fahrzeugprofil | ausschließlich T5 2006–2009 mit SW1 + SW3 + SW6 | 
 Leitungsabgriff | Stecker G nach Gehäuse, Reihenanordnung, Fahrzeugfarbe und Signal identifizieren | 
 Spannungsversorgung | Batterieanschluss nach Fahrzeuganleitung; WiPro-Pins 1 , 7 und 11 nach allgemeinem Handbuch | 
 Sirene | normale Sirene oder Back-up Sirene nach dem fahrzeugspezifischen Schaltbild | 
 Serien-/Softwaregrenze | 0823-001 / 2.1 ist nicht belegt und wird nicht als Mindeststand fortgeführt | 
 Abweichendes Fahrzeug | Arbeiten stoppen und aktuelle Freigabe bei THITRONIK beziehungsweise Fahrzeughersteller einholen | 

Modell und Baujahr anhand der Fahrzeugunterlagen bestätigen.

Vor-Facelift-Ausführung vom T5 Facelift ab Modelljahr 2010 abgrenzen.

Artikelnummer , Seriennummer und Software der WiPro dokumentieren.

Prüfen, ob Stecker G und die Leitungsfarben mit der Anleitung übereinstimmen.

Bei Abweichungen keine Werte aus dieser Seite übertragen.

## Sicherheit und Vorbereitung

Das Fahrzeughandbuch richtet sich an professionelle Servicebetriebe. Unsachgemäße Arbeiten an Fahrzeugelektrik, Airbag-Bereich oder Verkleidung können Personen und Verkehrssicherheit gefährden.

Arbeiten nur durch eine qualifizierte Fachkraft ausführen lassen.

Batterie nach Fahrzeugherstellervorgabe trennen; Radiocode und flüchtige Daten beachten.

DIP-Schalter ausschließlich spannungsfrei ändern.

Ungenutzte Ein- und Ausgänge einzeln isolieren.

Leitungen gegen Scheuern, Zug, Hitze und Feuchtigkeit sichern.

Pedale, Lenkung, Airbags und bewegte Teile freihalten.

Benötigte Werkzeuge bereitlegen: Montagekit, Kombizange, Kreuzschlitzschraubendreher, Torx 20, Akkuschrauber und 8-mm -Bohrer für die Status-LED.

Funk-Zubehör vor der endgültigen Montage anlernen.

## DIP-Profil und CAN-Überwachung

Der CAN-Bus ist auch bei einem T5 ohne Zentralverriegelung sinnvoll: Die WiPro kann darüber alle serienmäßigen Türen und den Motorhaubenkontakt überwachen.

Spannungsversorgung der WiPro vollständig entfernen.

Gehäuse öffnen und den achtfachen Codierschalter zugänglich machen.

SW1 , SW3 und SW6 auf ON stellen.

Alle anderen Schalter in der in der Fahrzeuganleitung dargestellten Grundstellung belassen.

Schalterstellung fotografieren oder dokumentieren.

Gehäuse schließen und erst danach mit dem Anschluss fortfahren.

Meldet die Motorhaube trotz geschlossener Haube „offen“, kann die Anlage beim Scharfschalten eine Kontaktwarnung ausgeben. Haubenschalter und CAN-Status deshalb in den Funktionstest aufnehmen.

## Armaturenbrett öffnen und Zentrale montieren

Seitliche Armaturenbrettverkleidung vorsichtig abhebeln.

Verkleidung am Lichtschalterbereich lösen.

Die in der Anleitung markierten Schrauben mit Torx 20 entfernen.

Weitere Schrauben im unteren Armaturenbrettbereich entfernen.

Mitteltunnelverkleidung ausclipsen.

Schraube hinter der mittleren Blende entfernen.

Blende ausclipsen und den Bordcomputer nach vorn freilegen.

WiPro III-Zentrale mit dem Montagekit trocken, geschützt, servicezugänglich und außerhalb von Airbag- oder Pedalbereichen befestigen.

Beim Ausbau keine Clips oder Leitungen mit Gewalt belasten. Die Bildfolge auf Seite 3 der Primärquelle ist für Lage und Reihenfolge maßgeblich.

## Stecker G und Fahrzeuganschlüsse

Stecker G besitzt ein schwarzes Gehäuse und 18 Kontakte in drei Reihen zu je sechs Kontakten. Die Quelle zeigt die Draufsicht mit Verriegelungsnase unten. Es werden keine numerischen Fahrzeug-Pins angegeben; deshalb sind Gehäuse, Ansicht, Position, Farbe und gemessenes Signal gemeinsam zu prüfen.

Fahrzeugleitung am Stecker G | WiPro-Leitung / Pin | Funktion | 
 orange/braun | violett/orange, Pin 18 | CAN-Low | 
 orange/grün | weiß/orange, Pin 17 | CAN-High | 
 weiß/grün | rot/pink, Pin 6 | Smart-Blinker / Warnblinker | 

Stecker G hinter dem freigelegten Bordcomputer identifizieren.

Schwarzes 18-poliges Gehäuse und drei Reihen zu je sechs Kontakten bestätigen.

Draufsicht und Verriegelungsnase wie im Schaltbild ausrichten.

Orange/braun messen und mit violett/orange Pin 18 verbinden.

Orange/grün messen und mit weiß/orange Pin 17 verbinden.

Weiß/grün als Warnblinkersignal prüfen und mit rot/pink Pin 6 verbinden.

Verbindungen fachgerecht crimpen und gegen Zug isolieren.

Keine Leitung allein aufgrund ihrer Farbe anschließen.

## Versorgung und Sirene

Die Fahrzeuganleitung zeigt Versorgung und Sirenenhalter im Batteriebereich. Zur Befestigung des Sirenenhalters wird die Batteriebefestigungsschraube verwendet.

Bauteil | Anschluss | 
 WiPro-Masse | schwarz Pin 1 an zuverlässige Fahrzeugmasse / Batterie-Minus | 
 WiPro-Zündung | gelb Pin 7 an geprüftes Zündungssignal | 
 WiPro- Dauerplus | rot Pin 11 über zugänglichen Sicherungshalter mit 10 A an Batterie-Plus | 
 normale Sirene | WiPro weiß Pin 15 an Sirene rot; WiPro weiß/schwarz Pin 16 an Sirene schwarz | 
 Back-up Sirene Versorgung | rot dauerhaft an +12 V , schwarz an Masse | 
 Back-up Sirene Trigger | weiß an WiPro weiß Pin 15 ; blau nicht verwenden und isolieren | 

Batterie-Plus, Batterie-Minus und Zündung vor Anschluss messen.

Sicherungshalter trocken, zugänglich und scheuerfrei montieren.

Masseverbindung niederohmig und mechanisch belastbar herstellen.

Normale Sirene ausschließlich nach der Pin- 15 / 16 -Variante anschließen.

Alternativ die Back-up Sirene dauerhaft versorgen und ihre weiße Triggerleitung an Pin 15 anschließen.

Blaue Leitung der Back-up Sirene einzeln isolieren.

Sirenenhalter mit der Batteriebefestigungsschraube befestigen, ohne Batterieleitungen zu quetschen.

Sicherung erst einsetzen, wenn alle Verbindungen kontrolliert sind.

Weitere Grundlagen: Sirenen und Hupen — Akustische Alarmmittel .

## Funk-Zubehör anlernen

Funk-Magnetkontakte, Gaswarner und Funk-Kabelschleifen sollen vor dem Einbau gespeichert werden.

WiPro mit stabiler Versorgung bereitstellen.

Taster rechts neben dem Anschlussstecker gedrückt halten, bis die Anlage piept.

Prüfen, dass die Status-LED dauerhaft leuchtet.

Jeden zu speichernden Funk-Magnetkontakt 2–3 Mal auslösen.

Gaswarner oder Funk-Kabelschleife ebenfalls 2–3 Mal auslösen.

Bestätigungston und kurzes Erlöschen der Status-LED abwarten.

Jedes Zubehör eindeutig beschriften und seinem Montageort zuordnen.

Empfang am späteren Einbauort im Diagnosemodus prüfen.

Vollständigen Ablauf mit Anlernvorgang — Funk-Zubehör an WiPro III anlernen abgleichen.

## Funk-Magnetkontakte montieren

Die Fahrzeugquelle beschreibt die Artikel 100757 und 100758 .

Merkmal | Vorgabe | 
 Platinenrichtung | Sende-LED muss vom Magneten wegweisen | 
 Magnetbereich | im geschlossenen Zustand innerhalb des gelben Bereichs, typisch 22–30 mm | 
 Klebefläche | sauber, trocken und fettfrei | 
 Verarbeitungstemperatur | nicht unter 15 °C | 
 Endfestigkeit Klebepad | nach etwa 24 Stunden | 
 Montageadapter | Art. 100428 oder 100729 bei größerem Abstand beziehungsweise zur Antennenausrichtung | 

Sendergehäuse möglichst auf dem festen Rahmen montieren.

Magnet am bewegten Fenster-, Tür- oder Klappenteil ausrichten.

Platine so einsetzen, dass die Sende-LED vom Magneten wegweist.

Falsche Platinenrichtung ausschließen: Anlernen kann sonst funktionieren, Alarmierung jedoch ausbleiben.

Magnet nur im dargestellten Arbeitsbereich positionieren und nicht jenseits der roten Grenzlinie montieren.

Klebeflächen reinigen, trocknen und entfetten.

Nicht unter 15 °C verkleben und 24 Stunden bis zur Endfestigkeit warten.

Bei ungeeigneter Klebefläche die vorgesehenen Schraubmarkierungen verwenden.

Bei großen Abständen Adapter 100428 oder 100729 einsetzen.

Jeden Kontakt nach der Montage bei geschlossener und geöffneter Öffnung testen.

Siehe Funk-Magnetkontakt 868 — Montage und Betrieb und Funk-Kabelschleife 868 — Außensicherung für mobile Güter .

## Inbetriebnahme und vollständiger Funktionstest

DIP-Stellung SW1 + SW3 + SW6 nochmals prüfen.

Alle Crimpverbindungen, Isolierungen, Zugentlastungen und die 10-A -Sicherung kontrollieren.

Versorgung herstellen und auf den Einschalt-Piepton achten.

Zündung ausschalten; bei eingeschalteter Zündung ist die Anlage deaktiviert.

Fahrzeug mit der Verriegeln-Taste des Funkschlüssels verschließen und die Anlage scharfschalten.

Einen Quittierton, Blinken der Fahrtrichtungsanzeiger und blinkende Status-LED prüfen.

Falls die Anlage zunächst nicht reagiert, mehrfach verriegeln und entriegeln, damit sich die CAN-Daten synchronisieren.

Fahrer-, Beifahrer-, Schiebe- und Heck-/Flügeltüren einzeln öffnen und Alarmauslösung prüfen.

Motorhaube einzeln öffnen und CAN-Überwachung prüfen.

Jeden Funk- Magnetkontakt und jedes weitere Funk-Zubehör einzeln auslösen.

Normale oder Back-up Sirene mit einem realen Alarm prüfen.

Akustische Alarmdauer von ca. 30 Sekunden und optische Alarmdauer von ca. 180 Sekunden prüfen.

Mit der Entriegeln-Taste entschärfen beziehungsweise den Alarm unterbrechen.

## Bedienung und Rückmeldungen

Verriegeln schärft das System; die Zentrale bestätigt mit Piepton und Blinken, die Status-LED blinkt.

Entriegeln entschärft das System beziehungsweise unterbricht einen Alarm.

Mehrere kurze Pieptöne beim Scharfschalten bedeuten, dass ein angelernter Funk-Magnetkontakt offen ist; die Anlage schaltet laut Quelle dennoch scharf.

Bei einem Fahrzeug ohne Zentralverriegelung bleibt die CAN-Verbindung für die Überwachung der Originaltüren und Motorhaube sinnvoll.

Jede reale Öffnung muss bei Übergabe einzeln geprüft werden; CAN-Abdeckung nicht nur aus der Fahrzeugausstattung ableiten.

## Diagnose

Fehlerbild | Prüfung / Maßnahme | 
 Einschalt-Piepton vorhanden, aber keine Reaktion auf Funkschlüssel | CAN-Leitungen weiß/orange und violett/orange prüfen; Diagnosemodus aktivieren | 
 grüne linke LED flackert im Diagnosemodus | CAN-Datenverkehr ist vorhanden | 
 grüne linke LED bleibt bei Bedienung dunkel | Bus inaktiv oder CAN-Verbindung fehlerhaft | 
 weder Reaktion noch Einschalt-Piepton | Versorgung, Crimpung, Zündungszustand und Sicherung prüfen | 
 Kontaktwarnung trotz geschlossener Öffnungen | Magnetabstand sowie Motorhaubenschalter prüfen; alle Kontakte mehrfach öffnen/schließen | 
 Kontaktwarnung bleibt bestehen | bei geschlossenen Kontakten Versorgung trennen und wiederherstellen | 
 Zubehör lässt sich anlernen, löst aber keinen Alarm aus | Platine des Funk-Magnetkontakts prüfen; Sende-LED muss vom Magneten wegweisen | 

Für den CAN-Diagnosemodus den Taster auf der Platine kurz drücken. Bedienung des Funkschlüssels oder anderer CAN-Datenverkehr muss die grüne linke LED flackern lassen. Weitere systematische Prüfungen: Störungsbeseitigung — Sichere Diagnose häufiger Probleme .

## Dokumentation

Fahrzeugmodell, Baujahr und VIN erfassen.

WiPro-Artikelnummer, Seriennummer und Softwarestand notieren.

DIP-Stellung SW1 + SW3 + SW6 dokumentieren.

Stecker G, Leitungsfarben und tatsächliche Abgriffstellen fotografieren.

Sicherungswert, Massepunkt und Sirenenvariante festhalten.

Alle überwachten Türen, Motorhaube und Funkkontakte einzeln protokollieren.

Alarmzeiten, Diagnoseanzeige und Kundenübergabe dokumentieren.

## Quellen

H:/Thitronik WIKI (ml)/wiki/de/wipro_iii_vw_t5_2006-2009.pdf — fahrzeugspezifisches Einbauhandbuch, Stand 12/20 ; alle zehn Seiten vollständig textlich und visuell geprüft.

H:/Thitronik WIKI (ml)/wiki/de/wipro_iii-installationsanleitung_1.8.pdf — allgemeines Installationshandbuch, Revision 1.8 ; vollständiger deutscher Abschnitt bereits textlich und visuell geprüft.

Die bisherige Matrixangabe 0823-001 / 2.1 wird nicht als Mindeststand fortgeführt, weil sie in diesen Primärquellen nicht genannt wird.

## Querverweise

WiPro III — Funk-Alarmsystem für Freizeitfahrzeuge 

Fahrzeugkompatibilität — Übersichtsmatrix & DIP-Grundlagen 

Anlernvorgang — Funk-Zubehör an WiPro III anlernen 

Funk-Magnetkontakt 868 — Montage und Betrieb 

Funk-Kabelschleife 868 — Außensicherung für mobile Güter 

Sirenen und Hupen — Akustische Alarmmittel 

Störungsbeseitigung — Sichere Diagnose häufiger Probleme 

VW T5 Facelift (ab MJ 2010)
