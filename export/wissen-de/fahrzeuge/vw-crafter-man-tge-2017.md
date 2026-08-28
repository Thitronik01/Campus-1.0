# VW Crafter / MAN TGE (2017–2024, ohne Startknopf)

Route: /de/fahrzeuge/vw-crafter-man-tge-2017 | Stand: 2026-07-22 | Sichtbarkeit: standard
Quelle: Thitronik Online/project-data/runtime/wiki/wiki-articles/de/fahrzeuge/vw-crafter-man-tge-2017.json

---
VW Crafter / MAN TGE (2017–2024, ohne Startknopf)

Dieser Artikel beschreibt den Einbau einer Standard- WiPro III in VW Crafter der zweiten Generation und MAN TGE der Baujahre 2017 bis 2024. Die aktuelle Fahrzeuganleitung Stand 07/2025 dokumentiert das Profil ab Software V6.8 , Demontage, Versorgung, Zündung, CAN, Warnblinker, Sirene, Status-LED, Funk-Zubehör und Funktionstest.

Abgrenzung: Die vorhandene Primärquelle beschreibt die Standard-WiPro III, nicht das safe.lock -Set 105458 . Für Fahrzeuge ab 2025 mit Startknopf gilt VW Crafter / MAN TGE ab 2025 . Fahrzeug, Baujahr, Startsystem und tatsächlich gelieferte WiPro-Ausführung müssen vor dem Einbau gemeinsam geprüft werden.

## Geltungsbereich

Merkmal | Vorgabe | 
 Fahrzeuge | VW Crafter zweite Generation und MAN TGE | 
 Baujahre | 2017–2024 gemäß Fahrzeughandbuch | 
 Startsystem | Artikelabgrenzung: Ausführung ohne Startknopf | 
 Alarmsystem | Standard-WiPro III | 
 Mindestsoftware | V6.8 | 
 DIP-Profil | SW2 + SW3 + SW4 + SW6 auf ON ; SW1 , SW5 , SW7 , SW8 auf OFF | 
 Bedienung | Original-Fahrzeugfunkschlüssel oder angelernter THITRONIK- Funk-Handsender 868 | 
 Versorgung | direkt an der Starterbatterie, rote Leitung mit 5-A -Sicherung | 
 CAN-Abgriff | Kabelstrang in der Lenksäule; alternativ im Türkabelbaum, falls ausstattungsbedingt dort nicht vorhanden | 

Eine Mindestseriennummer nennt die Fahrzeugquelle nicht. Seriennummer , Softwarestand und Geräteausführung müssen vor dem Einbau dokumentiert und über Seriennummern und Softwarestände geprüft werden.

## Quellenrang und bereinigte Altangaben

Bisherige Angabe | Quellenentscheidung | 
 safe.lock-Set 105458 , Profil SW3 , Serien 5458-001 bis 5458-013 | in der vorhandenen Fahrzeug-PDF nicht enthalten; nicht als Einbauprofil fortführen | 
 BCM Stecker A Pin 16/17, BCM Stecker C Pin 42 | die aktuelle Anleitung nennt weder BCM-Stecker noch Fahrzeug-Pinnummern; maßgeblich sind Abgriffsort und Farben | 
 ZV-Leitung am Türsteuergerät Pin 1 | in der vorhandenen Anleitung nicht dokumentiert; nicht anschließen | 
 obligatorischer Sleep-Mode-Test mit acht Minuten | stammt aus lokal fehlenden Altquellen und ist in der aktuellen PDF nicht enthalten | 
 Knaus-/Cobra-Sonderlogik und Drei-Schlüssel-Szenarien | lokal nicht durch Primärquellen belegbar; nicht als freigegebene Diagnose fortführen | 
 Zusatzhupe Art. 105339 zwingend | nicht belegt; die aktuelle Anleitung empfiehlt normale oder Back-up Sirene | 
 10-A -Versorgung | für dieses Fahrzeug durch die konkrete neuere 5-A -Vorgabe ersetzt | 

Die beiden lokal vorhandenen Fahrzeug-PDFs mit und ohne Namenszusatz (1) sind bytegleich. Fehlende DOCX- und CSV-Dateien werden nicht rekonstruiert. Wird tatsächlich ein safe.lock-Set geliefert, darf dieser Standardartikel nicht als Verdrahtungsanleitung verwendet werden; aktuelle set-spezifische Unterlagen sind beim Hersteller anzufordern.

## Sicherheit und Fahrzeugprüfung

Der Einbau gehört in die Hände einer qualifizierten Fachwerkstatt.

Vor Arbeitsbeginn Batterie-Minus und vorhandene Zusatzbatterien nach Herstellervorgabe trennen; Airbag-, Lenkungs- und Fahrzeugelektronikbereiche besonders schützen.

Vorhandene Warnlampen, Fehlerspeichereinträge und Beleuchtungsfehler prüfen und dokumentieren.

DIP-Schalter nur bei vollständig spannungsfreier WiPro ändern; 20-poligen und Pro-Finder -Stecker abziehen.

Stecker, Abgriffsort, Leitungsfarbe, Spannung und Signal am konkreten Fahrzeug gemeinsam verifizieren.

Die von der Anleitung geforderten gelgefüllten Abzweigverbinder verwenden; ungenutzte Ein- und Ausgänge einzeln isolieren.

Leitungen gegen Scheuern, Hitze, Feuchtigkeit und Zug sichern; Pedale, Lenkung, Airbags und bewegte Teile freihalten.

Bei Abweichungen von den Bildern oder Signalen Arbeiten stoppen und THITRONIK beziehungsweise Fahrzeughersteller kontaktieren.

Vor Beginn prüfen:

Handelt es sich tatsächlich um VW Crafter II oder MAN TGE des Zeitraums 2017–2024 ohne Startknopf?

Ist eine funktionierende Fahrzeug-Funkfernbedienung vorhanden?

Funktioniert die Zentralverriegelung fehlerfrei?

Werden Originaltüren bei eingeschalteter Zündung im Kombiinstrument angezeigt?

Welche Aufbauöffnungen sind über den CAN-Bus erfasst und welche benötigen Funk-Magnetkontakte?

Entspricht die Standard-WiPro mindestens Software V6.8 ?

Benötigt werden unter anderem Zangen, PH2- oder Torx-25-Schraubendreher, 10-mm -Steckschlüssel, 3-mm -Innensechskantschlüssel, Messgerät sowie Akkuschrauber und 8-mm -Bohrer für die Status-LED.

## Fahrzeugprofil einstellen

Vorhandene Spannungsversorgung entfernen.

Sicherstellen, dass 20-poliger Anschlussstecker und Pro-Finder-Stecker abgezogen sind.

Gehäuse der Zentrale vorsichtig öffnen.

SW2 , SW3 , SW4 und SW6 auf ON stellen.

SW1 , SW5 , SW7 und SW8 auf OFF lassen.

Schalterstellung fotografisch oder schriftlich dokumentieren.

Gehäuse schließen und erst danach mit der Installation fortfahren.

Nicht verwechseln: Das alte safe.lock-Profil SW3 allein ist durch die vorhandene Fahrzeugquelle nicht belegt. Ebenso darf SW6 aus dem vorgeschriebenen Standardprofil nicht eigenmächtig entfernt werden. Grundlagen: Fahrzeugkompatibilität .

## Armaturenbrettverkleidung entfernen

Lichtschalter auf Nullstellung bringen.

Lichtschalter eindrücken, auf Standlicht drehen und herausziehen.

Vier Befestigungsschrauben entfernen.

Verkleidungsteile vorsichtig abbauen.

Stecker von Fußraumbeleuchtung, OBD-Schnittstelle und weiteren betroffenen Bedienelementen lösen.

Stecker und Schrauben eindeutig kennzeichnen und gegen Beschädigung sichern.

## Zentrale montieren

Die Fahrzeuganleitung zeigt eine geeignete Klebefläche links oberhalb des Sicherungskastens. Der tatsächliche Bereich muss trocken, tragfähig und für Servicearbeiten erreichbar sein.

Montagefläche reinigen und entfetten.

Prüfen, dass Kabelwege kurz bleiben und keine Sicherungen oder Relais blockiert werden.

WiPro mit der vorgesehenen Klebebefestigung sicher montieren.

Antenne frei von abschirmendem Metall verlegen, nicht kürzen und nicht aufwickeln.

Leitungen so fixieren, dass sie nicht in den Pedal- oder Lenkungsbereich gelangen.

## Versorgung und Zündung anschließen

Die Versorgungsleitungen werden hinter der Verkleidung der Motorhaubenentriegelung durch den Fußraum in den Batteriekasten im Boden geführt. Zum Entriegeln dessen Abdeckung in Richtung Fahrertür ziehen.

Funktion | Fahrzeugseite | WiPro-Leitung / Pin | Vorgabe | 
 Klemme 30 | Pluspol Starterbatterie | rot, Pin 11 | mit 5 A absichern | 
 Klemme 31 | Minuspol Starterbatterie | schwarz, Pin 1 | sicherer Masseanschluss | 
 Klemme 15 | schwarz/blaue Leitung an OBD-Schnittstelle | gelb, Pin 7 | mit gelgefülltem Abzweigverbinder | 

Batteriekasten öffnen und Leitungsweg ohne Quetsch- oder Scheuerstellen planen.

Rote Leitung über eine 5-A -Sicherung an den Pluspol der Starterbatterie anschließen.

Schwarze Leitung an den Minuspol der Starterbatterie anschließen.

Schwarz/blaue Fahrzeugleitung an der OBD-Schnittstelle eindeutig identifizieren und als Zündungssignal messen.

Gelbe WiPro-Leitung über einen gelgefüllten Abzweigverbinder anschließen.

Sicherung zugänglich befestigen und Leitungen mechanisch entlasten.

Versorgung erst nach Kontrolle aller weiteren Anschlüsse herstellen.

## CAN-Bus anschließen

Der Abgriff liegt im Kabelstrang in der Lenksäule. Sind die beschriebenen Leitungen dort ausstattungsbedingt nicht vorhanden, nennt die Anleitung den Türkabelbaum als Alternative. Sie nennt keine Fahrzeugstecker- oder Pinnummern.

Funktion | Fahrzeugleitung | WiPro-Leitung / Pin | 
 CAN-Low | orange/braun | violett/orange, Pin 18 | 
 CAN-High | orange/grün | weiß/orange, Pin 17 | 

Lenksäulen-Kabelstrang lösen und vorsichtig freilegen.

Orange/braunes und orange/grünes verdrilltes Paar eindeutig identifizieren.

Falls es dort fehlt, nur nach erneuter Signalprüfung im Türkabelbaum suchen.

Violett/orange Pin 18 mit orange/braun verbinden.

Weiß/orange Pin 17 mit orange/grün verbinden.

Gelgefüllte Verbinder verwenden und CAN-High sowie CAN-Low nicht vertauschen.

Kabelstrang wieder in ursprünglicher Lage befestigen.

## Warnblinker anschließen

Untere graue Zierleiste ausclipsen; an der Unterseite beginnen.

Schalter-/Klimabedieneinheit von den Seiten beginnend ausclipsen.

Einheit vorsichtig herausziehen.

Blauen Stecker am Warnblinkerschalter identifizieren.

Weiß/gelbe Fahrzeugleitung messen und verifizieren.

Rot/rosa WiPro-Leitung Pin 6 über einen geeigneten Verbinder mit weiß/gelb verbinden.

Stecker vollständig einsetzen und Leitung gegen Zug sichern.

## Sirene oder Back-up Sirene montieren

Die Anleitung empfiehlt eine Sirene oder Back-up Sirene. Einen Ziehdraht hinter der Motorraumbatterie durch die kleinere Gummidurchführung in den Fußraum führen, die Sirenenleitung befestigen und in den Motorraum ziehen. Ein möglicher Montageort liegt an den gezeigten Gewindestangen.

Ausführung | Anschlüsse | 
 normale Sirene | WiPro weiß Pin 15 an Sirene rot; WiPro weiß/schwarz Pin 16 an Sirene schwarz | 
 Back-up Sirene | WiPro weiß Pin 15 an Sirene weiß; Sirene rot an +12 V , Sirene schwarz an Masse; blaue negative Triggerleitung isolieren | 
 Versorgung Back-up Sirene | WiPro rot Pin 11 beziehungsweise entsprechend abgesicherte Dauerplusversorgung nach Produktvorgabe | 

Durchführung und Leitungsweg auf Dichtheit, Hitze und bewegte Bauteile prüfen.

Sirene mit Halter stabil und vor direktem Wasser geschützt montieren.

Gewählte Sirenenvariante exakt nach Tabelle und Produkthandbuch anschließen.

Bei Back-up Sirene den blauen negativen Trigger einzeln isolieren.

Leitungen befestigen und Durchführung fachgerecht abdichten.

Sirene nach Inbetriebnahme separat prüfen.

Weitere Abgrenzungen stehen unter Sirenen und Hupen .

## Status-LED montieren

Gewünschte Position mit dem Kunden abstimmen.

Rückseite des Montageorts auf Leitungen und Bauteile prüfen.

Loch mit 8 mm Durchmesser bohren.

Status-LED einsetzen.

Rot/schwarzes LED-Kabel mit weißem Steckverbinder wieder mit dem Gegenstück des WiPro-Kabelsatzes verbinden.

Sichtbarkeit für Bedienquittung, Diagnose und Alarmspeicher sicherstellen.

## Funk-Zubehör anlernen

Sämtliches Zubehör mit Kennzeichnung 868 , einschließlich der Komponenten aus dem Lieferumfang, muss einmalig angelernt werden.

Taster rechts neben dem Anschlussstecker halten, bis die Anlage piept und die Status-LED dauerhaft leuchtet.

Jeden Funk-Magnetkontakt , Funk- Handsender , jede Funk-Kabelschleife und jeden Funk-Gaswarner zwei- bis dreimal auslösen.

Magnete dafür mehr als 30 mm entfernen, Handsendertasten drücken, Gaswarner einschalten oder Kabelschleife aus der Halterung nehmen.

Nach jeder Komponente Piepton und kurzes Erlöschen der LED abwarten.

Zum Beenden Anlage kurz spannungsfrei machen oder den Taster kurz drücken.

Beachten, dass der Speicher auch bei längerer Spannungsunterbrechung erhalten bleibt.

Zum Löschen ausschließlich den dokumentierten Löschvorgang verwenden.

Der allgemeine Ablauf ist unter Anlernvorgang beschrieben.

## Bedienung und Funktionstest

Der Original-Fahrzeugfunkschlüssel schärft die WiPro beim Verriegeln und entschärft sie beim Entriegeln von vorn oder hinten.

Ein angelernter Funk-Handsender 868 wechselt mit jeder Taste in den nächsten logischen Zustand.

Das Fahrzeughandbuch bezeichnet die für den Quittierton maßgebliche Stellung als „Jumper 6“. Da SW6 Bestandteil des vorgeschriebenen Profils ist, darf seine Stellung nicht ohne aktuelle Herstelleranweisung verändert werden.

Beide Handsendertasten etwa eine Sekunde gedrückt halten, um den Panikalarm auszulösen.

Einen Alarm mit einer beliebigen Handsendertaste oder der Öffnen-Taste der Originalfernbedienung beenden; anschließend gibt die Status-LED den Alarmspeicher aus.

Funktionstest:

Alle Originaltüren, Klappen und Funk-Magnetkontakte schließen.

Fahrzeug mit Originalfunkschlüssel verriegeln und Scharfschaltquittierung prüfen.

Jede vom Fahrzeug erfasste Originaltür einzeln von innen öffnen und Alarm prüfen.

System entschärfen und denselben Test mit jeder weiteren erfassten Tür oder Klappe wiederholen.

Jeden angelernten Funk- Magnetkontakt öffnen und Alarmierung prüfen.

Mit einem absichtlich geöffneten Funk-Magnetkontakt schärfen und die Lüftungsfunktion anhand mehrerer Töne und anschließendem Scharfton prüfen.

Kontakt schließen und prüfen, dass er nach etwa 4 Sekunden wieder überwacht wird.

Funk-Gaswarner etwa 4 Minuten vorwärmen lassen und erst bei grün blinkender LED nach seiner Anleitung testen; er kann scharf und unscharf Alarm auslösen.

Funk-Kabelschleife durch leichtes Drücken an der Unterkante nach oben aus der Halterung nehmen und Alarm prüfen.

Panikalarm und Beendigung über beide Bedienwege prüfen.

Akustische Alarmierung von etwa 30 Sekunden und optische Alarmierung bis zu 120 Sekunden gemäß allgemeinem Installationshandbuch prüfen.

Verkleidungen erst nach allen erfolgreichen Tests in umgekehrter Reihenfolge montieren.

## Funk-Magnetkontakte montieren

Prüffeld | Vorgabe | 
 Artikel | 100757 schwarz, 100758 weiß | 
 Platinenrichtung | Sende-LED vom Magneten weg; zeigt sie zum Magneten, ist Anlernen möglich, Alarmierung jedoch nicht | 
 Montagevarianten | liegend links/rechts, stehend oder auf der Scheibe | 
 Magnetposition | im geschlossenen Zustand im dokumentierten Bereich von 22–30 mm | 
 Klebefläche | sauber, trocken und fettfrei | 
 Verarbeitung | nicht unter 15 °C ; Endfestigkeit nach etwa 24 Stunden | 
 Adapter | Art. 100428 oder 100729 bei großem Abstand oder ungünstiger Antennenlage | 

Sendergehäuse möglichst am Rahmen und Magnet am Türblatt beziehungsweise an der Klappe befestigen. Erst anlernen und am geplanten Ort testen, dann endgültig kleben oder an den markierten Stellen verschrauben. Details: Funk-Magnetkontakt 868 .

## Diagnose

Fehlerbild | Prüfung / Maßnahme | 
 WiPro reagiert nicht | 5-A -Sicherung, Starterbatterie, Pin 11 , Pin 1 und Steckverbindungen prüfen | 
 Originalschlüssel steuert WiPro nicht | Mindestsoftware V6.8 , Profil SW2 + SW3 + SW4 + SW6 , Fahrzeugfernbedienung und CAN-Verbindungen prüfen | 
 keine CAN-Reaktion | orange/grün an Pin 17 und orange/braun an Pin 18 prüfen; Paar nicht vertauschen; alternativen Türkabelbaum nur nach Messung verwenden | 
 keine Warnblinker-Rückmeldung | blauen Stecker, weiß/gelbe Fahrzeugleitung und rot/rosa Pin 6 prüfen | 
 Sirene bleibt stumm | Pins 15 / 16 , Sirenenvariante, Versorgung und isolierte blaue Back-up-Leitung prüfen | 
 einzelne Originaltür wird nicht erkannt | Anzeige im Kombiinstrument und tatsächliche CAN-Erfassung prüfen; gegebenenfalls Funk-Magnetkontakt ergänzen | 
 Kontakt lässt sich anlernen, löst aber nicht aus | Platine vermutlich mit Sende-LED zum Magneten ausgerichtet; korrigieren | 
 Funkempfang unzuverlässig | Zentralen-/Antennenlage, Metallabschirmung, Abstand und Adapter prüfen | 
 Gerät ist safe.lock-Set 105458 | Arbeiten stoppen; aktuelle set-spezifische Anleitung beschaffen und diesen Standardanschluss nicht übernehmen | 

Weitere systematische Prüfungen: Störungsbeseitigung .

## Quellenbasis und Redaktionsentscheidung

Das elfseitige Fahrzeughandbuch WiPro III – VW Crafter/MAN TGE 2017–2024 , Stand 07/2025 , wurde vollständig textlich und visuell geprüft.

Seite 2 belegt Standard-WiPro III ab V6.8 und SW2 + SW3 + SW4 + SW6 .

Seiten 3 bis 5 belegen Demontage, Montageort, Starterbatterie, 5 A , OBD-Zündung, CAN-Farben/-Ort und Warnblinkeranschluss.

Seiten 6 und 7 belegen beide Sirenenvarianten, Pins 11 / 15 / 16 , 8 mm , Anlernen, Originalschlüssel-/Handsenderbedienung, Panikalarm, Lüftungsfunktion, 4 Sekunden , 4 Minuten und Testablauf.

Seiten 8 bis 11 belegen Funk-Magnetkontakte 100757 / 100758 , Platinenrichtung, Montagevarianten, Adapter 100428 / 100729 , 15 °C , 24 Stunden und 22–30 mm .

Das allgemeine Installationshandbuch Revision 1.8 ergänzt Sicherheitsregeln, WiPro-Pinnummern sowie 30/120 Sekunden Alarmdauer.

Die beiden Fahrzeug-PDFs sind bytegleich. Die im Altbestand genannten DOCX-/CSV-Quellen fehlen lokal; safe.lock-, Sleep-Mode-, BCM-Pin-, Türsteuergerät-, Knaus- und Versionsangaben wurden deshalb nicht als freigegebene Einbaudaten fortgeführt.

Die konkrete 5-A -Vorgabe des neueren Fahrzeughandbuchs hat für diesen Anschluss Vorrang vor allgemeinen oder älteren Sicherungswerten.

Verwendete Primärquellen:

H:/Thitronik WIKI (ml)/wiki/de/wipro_iii_vw_crafter___man_tge_2017-2024.pdf 

H:/Thitronik WIKI (ml)/wiki/de/wipro_iii-installationsanleitung_1.8.pdf 

## Verwandte Artikel

WiPro III 

Fahrzeugkompatibilität 

Seriennummern und Softwarestände 

Anlernvorgang 

Funk-Handsender 868 

Funk-Magnetkontakt 868 

Funk-Kabelschleife 868 

Sirenen und Hupen 

Pro-Finder 

Störungsbeseitigung 

VW Crafter / MAN TGE ab 2025
