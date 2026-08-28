# Mercedes Sprinter NCV3 / VW Crafter (BR906, 2006–2018)

Route: /de/fahrzeuge/mercedes-sprinter-ncv3 | Stand: 2026-07-20 | Sichtbarkeit: standard
Quelle: Thitronik Online/project-data/runtime/wiki/wiki-articles/de/fahrzeuge/mercedes-sprinter-ncv3.json

---
Mercedes Sprinter NCV3 / VW Crafter (BR906, 2006–2018)

Dieser Artikel beschreibt den Einbau einer WiPro III in den Mercedes Sprinter NCV3/BR906 der Modelljahre 2006 bis 2018 und den technisch verwandten VW Crafter der ersten Generation von 2006 bis 2017. Das fahrzeugspezifische Einbauhandbuch Stand 06/21 dokumentiert Fahrzeugprüfung, DIP-Profil, CAN-Anschluss, vier getrennte Blinkerleitungen, Masse, Zündung, Versorgung, Sirene, Status-LED, Funk-Zubehör, Funktionstest und Diagnose.

Abgrenzung: Modelljahr, Karosserie- und Elektronikgeneration, CAN-Verteiler, Bordcomputer, Stecker und Leitungsfarben müssen gemeinsam zur Anleitung passen. Für Mercedes Sprinter VS30/BR907/910 ab 2018 und VW Crafter der zweiten Generation ab 2017 gelten eigene Artikel und andere Anschlüsse.

## Geltungsbereich

Merkmal | Vorgabe | 
 Mercedes | Sprinter NCV3/BR906, Modelljahre 2006–2018 | 
 Volkswagen | Crafter erste Generation, Modelljahre 2006–2017 | 
 WiPro-Grundprofil | SW1 + SW6 auf ON | 
 CAN-Anschluss | fahrzeugspezifischer CAN-Verteiler vor dem Bordcomputer | 
 Blinker | vier getrennte Leitungen über Diodenverteiler Art. 100455 | 
 Fahrzeughupe | bei ausgeschalteter Zündung ohne Spannung; nicht als Alarmgeber verwenden | 
 Kompatibilitätsbasis | 0823-001 / 2.1 ; genaue Geräte- und Fahrzeugausführung prüfen | 

Die Generationen überschneiden sich an ihren Modellwechseln. Entscheidend ist nicht allein das Erstzulassungsdatum, sondern die tatsächlich vorhandene Elektronik. Siehe Fahrzeugkompatibilität .

## Quellenrang und bereinigte Altangaben

Aussage | Quellenentscheidung | 
 DIP-Profil | Fahrzeughandbuch 06/21 bestätigt SW1 + SW6 ; die ältere allgemeine Tabelle zeigt nur Schalter 1–4 und deshalb lediglich SW1 . | 
 Montageort der Zentrale | unterhalb der Lenksäule hinter der demontierten Verkleidung, nicht pauschal Mittelkonsole oder Beifahrerfußraum | 
 Sirene | wegen der bei ausgeschalteter Zündung spannungslosen Fahrzeughupe dringend empfohlen, aber in der Quelle nicht als zwingende Freigabevoraussetzung formuliert | 
 safe.lock | für diesen Einbau in den vorhandenen Quellen weder Anschluss noch Upgrade beschrieben; daher keine safe.lock-Anweisung ableiten | 
 Mercedes.docx | lokal nicht vorhanden; daraus stammende interne Notizen gelten nicht als Beleg | 

Das allgemeine Installationshandbuch 1.8 ergänzt Sicherheits-, Pin-, Sirenen- und Diagnosegrundlagen. Bei Widersprüchen hat die neuere fahrzeugspezifische Anleitung Vorrang.

## Sicherheit und Fahrzeugprüfung

Arbeiten an Fahrzeugelektrik und -elektronik dürfen nur qualifizierte Fachwerkstätten ausführen.

Vor elektrischen Arbeiten Batterie-Minus und vorhandene Zusatzbatterien nach Herstellervorgabe trennen; flüchtige Fahrzeugdaten und Radiocode berücksichtigen.

WiPro vor dem Öffnen und vor jeder DIP-Änderung vollständig spannungsfrei machen. Auch Pro-finder -Stecker dürfen dabei nicht verbunden sein.

Unbenutzte Ein- und Ausgänge einzeln gegen Kurzschluss isolieren.

Kabel gegen Scheuern sichern und so befestigen, dass sie Lenkung, Pedale oder andere Fahrzeugfunktionen nicht behindern.

Stecker, Pin, Leitungsfarbe, Spannung und Funktion am tatsächlichen Fahrzeug prüfen. Bei Abweichungen stoppen und Hersteller oder THITRONIK Support kontaktieren.

Vor Beginn prüfen und dokumentieren:

Ist die originale Funkfernbedienung vorhanden, funktionsfähig und wird das Verriegeln durch Blinken bestätigt?

Funktioniert die Zentralverriegelung?

Werden geöffnete Originaltüren bei eingeschalteter Zündung im Kombiinstrument angezeigt?

Welche Türen und Klappen eines teil- oder vollintegrierten Aufbaus werden bereits über CAN erkannt?

Bestehen Warnlampen, Fehlerspeichereinträge, Beleuchtungsfehler oder andere elektrische Fehler?

Bei vielen vollintegrierten Fahrzeugen ohne aktive Zentralverriegelung kann die Fernbedienung ausprogrammiert sein, obwohl noch ein Relaisklicken hörbar ist. Mercedes muss die Zentralverriegelung dann wieder programmieren, damit der originale Schlüssel über CAN auf die WiPro wirkt.

## DIP-Profil einstellen

Spannungsversorgung trennen und sicherstellen, dass weder der 20-polige WiPro-Stecker noch ein Pro-finder verbunden ist.

WiPro-Gehäuse vorsichtig öffnen.

SW1 und SW6 auf ON stellen; alle übrigen Schalter bleiben für das Fahrzeug-Grundprofil OFF .

Eine fahrzeugspezifisch bereits konfigurierte Zentrale nur nach dokumentierter Prüfung verändern.

Tatsächliche DIP-Stellung dokumentieren und Gehäuse wieder schließen.

Das Profil SW1 + SW6 ist in der Fahrzeug-PDF visuell bestätigt. Allgemeine Sonderfunktionen anderer DIP-Schalter dürfen nicht ohne Prüfung der Seriennummer , Software und gewünschten Funktion zugeschaltet werden.

## Armaturenbrettverkleidung ausbauen

Drei in der Fahrzeugabbildung markierte Schrauben mit Torx T25 entfernen.

Die Verkleidungen vorsichtig nach vorn abziehen.

Den Bereich unterhalb der Lenksäule und vor dem Bordcomputer freilegen.

Vor dem weiteren Anschluss prüfen, dass Kabel, Pedale und Airbag-Bauteile nicht belastet oder beschädigt werden.

## CAN-Verbindung herstellen

Vor dem Bordcomputer befindet sich an einer Verstrebung ein CAN-Verteiler. Den Steckverbinder am Ende der WiPro-CAN-Leitungen in einen passenden freien Anschluss dieses Verteilers stecken.

Fahrzeugleitung | WiPro-Leitung / Pin | Funktion | 
 braun | violett/orange, Pin 18 | CAN-Low | 
 braun/rot | weiß/orange, Pin 17 | CAN-High | 

Nicht allein nach der allgemeinen Farblogik arbeiten: Fahrzeugleitung, WiPro-Farbe, Pin und der abgebildete CAN-Verteiler müssen gemeinsam passen. CAN-High und CAN-Low nicht vertauschen.

## Vier Blinkerleitungen anschließen

Unterhalb des CAN-Verteilers liegt der Bordcomputer. Die Stecker durch Entriegeln ihres Sicherungsbügels lösen. Die vier Fahrzeugleitungen mit den vier grauen Leitungen des Diodenverteilers verbinden und die Stecker anschließend vollständig wieder einsetzen.

Stecker / Pin | Fahrzeugleitung | WiPro-Seite | Funktion | 
 X3, Pin 15 | schwarz/weiß | grau des Diodenverteilers | Blinker | 
 X3, Pin 16 | schwarz/grün | grau des Diodenverteilers | Blinker | 
 X9, Pin 13 | schwarz/weiß | grau des Diodenverteilers | Blinker | 
 X9, Pin 24 | schwarz/grün | grau des Diodenverteilers | Blinker | 

Verwechslungsgefahr: X9 Pin 24 nicht mit dem benachbarten Pin 25 verwechseln. Pin 25 besitzt ebenfalls eine schwarz/grüne, aber dickere Leitung.

Da alle vier Blinker getrennt angesteuert werden, ist der Diodenverteiler Art. 100455 erforderlich. Er verteilt die beiden WiPro-Blinkerausgänge auf vier Fahrzeugleitungen und ist laut allgemeinem Anschlussplan im fahrzeugspezifischen Set enthalten. Siehe Artikelnummern-Register .

## Masse, Zündung und Versorgung anschließen

Anschluss | Fahrzeugseite | WiPro-Seite | Vorgabe | 
 Masse / Klemme 31 | Massepunkt links in Verlängerung der A-Säule, Mutter M10 | schwarz, Pin 1 | originale Ringösen belassen, WiPro-Ringöse zusätzlich auflegen und festziehen | 
 Zündung / Klemme 15 | OBD-Stecker Pin 8, rosa/schwarz | gelb, Pin 7 | blauen gelgefüllten Abzweigverbinder verwenden | 
 Dauerplus / Klemme 30 | rückseitige rote Leitung der Sicherung F10 / 15 A im Zusatzsicherungshalter | rot, Pin 11 | Sicherungshalter lösen, nach vorn entnehmen und mit blauem Abzweigverbinder anschließen | 

Bei einzelnen OBD-Schnittstellen fehlt die Zündungsleitung. Dann eine andere sicher identifizierte Leitung der Klemme 15 verwenden. Die Zündungsinformation ist erforderlich, damit die WiPro während der Fahrt keinen Alarm auslöst. Dauerplus, Masse, Sicherungswert und Zündung vor dem Anschluss messen oder eindeutig identifizieren.

## Sirene oder Back-up-Sirene anschließen

Die Fahrzeughupe erhält bei ausgeschalteter Zündung keine Spannung und eignet sich deshalb nicht als Alarmgeber. Die Fahrzeuganleitung empfiehlt dringend eine Sirene oder Back-up-Sirene im Motorraum; Montageort vor Hitze, Wasser und beweglichen Teilen schützen.

Ausführung | WiPro-Anschluss | Sirenenanschluss | 
 normale Sirene | Pin 15, weiß | rot der Sirene | 
 normale Sirene | Pin 16, weiß/schwarz | schwarz der Sirene | 
 Back-up-Sirene | Pin 11 / +12 V | rot der Back-up-Sirene | 
 Back-up-Sirene | Pin 15, weiß | weiß der Back-up-Sirene | 
 Back-up-Sirene | Fahrzeugmasse | schwarz der Back-up-Sirene | 
 Back-up-Sirene | nicht verwendet | blau der Back-up-Sirene einzeln isolieren | 

Montagebügel an einer geeigneten Stelle im Motorraum befestigen.

Eine geeignete zweiadrige Leitung mit Einziehhilfe durch die vorhandene Durchführung vom Innenraum in den Motorraum ziehen.

Leitungen entsprechend der gewählten Sirenenart und dem abgebildeten Anschlussplan verbinden.

Nicht verwendete Leitung einzeln isolieren und alle Leitungen mechanisch schützen.

Sirene nach Montage separat prüfen.

Auswahl und Abgrenzung der Alarmgeber: Sirenen und Hupen .

## Ersten Funktionstest durchführen

Alle Fahrerhaustüren schließen und mit der Verriegelungstaste der originalen Fahrzeugfernbedienung schärfen.

Falls die WiPro noch nicht reagiert, mehrmals verriegeln und entriegeln, bis die CAN-Daten synchronisiert sind.

Piepton, Blinken der Fahrtrichtungsanzeiger und blinkende Status-LED als Aktivierungsquittung prüfen.

Eine Fahrerhaustür geöffnet lassen und bestätigen, dass das Fahrzeug nicht verriegelt und die WiPro nicht schärft.

System korrekt schärfen und die Fahrertür mechanisch von innen am Türgriff oder von außen mit dem mechanischen Schlüssel öffnen.

Akustischen Alarm für etwa 30 Sekunden prüfen.

Optischen Alarm für etwa 180 Sekunden prüfen.

Mit der Entriegelungstaste entschärfen beziehungsweise den Alarm unterbrechen.

Blinkfolge des Alarmspeichers an der Status-LED beachten.

## Status-LED, Funk-Zubehör und Zentrale montieren

LED-Position mit dem Kunden abstimmen und den Bereich dahinter prüfen.

Ein Loch von 8 mm bohren, Status-LED einsetzen und den rot/schwarzen LED-Kabelsatz mit weißem Steckverbinder verbinden.

Sämtliches Funk-Zubehör mit Kennzeichnung 868 vor der endgültigen Montage anlernen.

Taster rechts neben dem Anschlussstecker gedrückt halten, bis die WiPro piept und die Status-LED dauerhaft leuchtet.

Jeden Funk-Magnetkontakt , Funk-Handsender , Funk-Gaswarner und jede Funk-Kabelschleife zwei- bis dreimal auslösen.

Zum Anlernen eines Magnetkontakts Magnet und Sender um mehr als 30 mm trennen.

Speicherung durch Piepton und kurzes Erlöschen der LED bestätigen.

Anlernmodus durch kurzes Spannungsfreimachen oder kurzen Tastendruck beenden.

Zentrale mit den rückseitigen Klebepads unterhalb der Lenksäule hinter der Verkleidung befestigen.

Kabel mit Zugentlastung befestigen, sodass nichts lose in den Pedalbereich hängt; Antenne weder kürzen noch aufwickeln.

Der Senderspeicher bleibt auch bei langfristiger Spannungsunterbrechung erhalten. Ein Löschen betrifft den gesamten Senderspeicher. Siehe Anlernvorgang .

## Funk-Zubehör montieren und prüfen

Für Funk-Magnetkontakte Art. 100757 und 100758 gelten folgende Vorgaben:

Platine so einsetzen, dass die Sende-LED vom Magneten wegweist. Die falsche Orientierung lässt zwar Anlernen zu, verhindert aber den Alarm.

Magnet im dokumentierten Bereich von 22–30 mm und nicht jenseits der roten Grenzlinie positionieren.

Vor dem Kleben Reichweite und Empfang am vorgesehenen Montageort prüfen.

Klebefläche reinigen, trocknen und entfetten; nicht unter 15 °C verarbeiten und etwa 24 Stunden Endfestigkeit abwarten.

Bei größerem Abstand oder ungünstiger Antennenausrichtung Montageadapter Art. 100428 oder 100729 verwenden.

Wenn Klebepads ungeeignet sind, die vorgesehenen Schraubmarkierungen im Sendergehäuse verwenden.

Weitere Hinweise: Funk-Magnetkontakt 868 .

## Abschließende Funktionsprüfung

Ersten Funktionstest mit allen Türen wiederholen.

Jeden angelernten Funk- Magnetkontakt einzeln bei geschärfter WiPro öffnen und Alarm prüfen.

THITRONIK Funk- Handsender 868 mit einer beliebigen Taste auf Aktivieren/Deaktivieren prüfen.

Beide Handsendertasten etwa 1 Sekunde gedrückt halten und Panikalarm prüfen.

WiPro mit einem geöffneten Magnetkontakt schärfen: Mehrfachsignale und Scharf-Signalton prüfen; der offene Kontakt bleibt zunächst von der Alarmierung ausgenommen.

Kontakt schließen und prüfen, dass er nach etwa 4 Sekunden wieder aktiv ist.

Funk-Gaswarner etwa 4 Minuten vorheizen, grünes Blinken abwarten und den Test nach dessen Anleitung durchführen; Alarm ist bei scharfer und unscharfer WiPro möglich.

Funk- Kabelschleife durch leichtes Drücken der Unterkante und Entnehmen aus der Halterung testen.

CAN, Zentralverriegelung, vier Blinkerleitungen, Status-LED und Sirene einzeln kontrollieren.

Sicherung F10 / 15 A und WiPro-Seriennummer in den Kundenunterlagen dokumentieren.

Abschließend prüfen, dass keine neuen Warnlampen, elektrischen Fehler oder Fehlerspeichereinträge entstanden sind.

## Fehlerdiagnose

Symptom | Prüfung und Maßnahme | 
 Keine Reaktion auf Fahrzeugschlüssel, aber Piepton beim Anlegen der Versorgung | CAN-Farben, Pins 17/18 und Steckverbindung am CAN-Verteiler prüfen; Diagnosemodus kurz per Taster aktivieren und bei Funkschlüssel- oder Warnblinkerbetätigung auf Flackern der LED achten. | 
 Keine CAN-Aktivität im Diagnosemodus | Bus inaktiv, Verbindung fehlerhaft oder CAN-High/CAN-Low vertauscht; Anschluss spannungsfrei korrigieren. | 
 Keine Reaktion und kein Piepton beim Anlegen der Versorgung | direkt am WiPro-Stecker Spannung messen; Crimp-/Abzweigverbindungen, Zündungszustand und F10 / 15 A prüfen. | 
 Originalfernbedienung bewirkt bei einem Vollintegrierten nichts | Zentralverriegelung möglicherweise ausprogrammiert; durch Mercedes wieder programmieren lassen. | 
 Blinker fehlerhaft oder unvollständig | Diodenverteiler 100455 , X3 Pins 15/16 und X9 Pins 13/24 prüfen; X9 Pin 24 nicht mit dickerem Pin 25 verwechseln. | 
 Fahrzeug verriegelt bei offener Fahrerhaustür nicht | dokumentiertes Fahrzeugverhalten; Tür schließen und Test korrekt wiederholen. | 
 Keine akustische Alarmierung über Fahrzeughupe | erwartetes Verhalten bei ausgeschalteter Zündung; installierte Sirene oder Back-up-Sirene prüfen. | 
 Geschlossener Magnetkontakt wird als offen gemeldet | nach Spannungsunterbrechung alle Kontakte mehrfach öffnen und schließen. | 
 Funkkontakt wird nicht empfangen | Anlernen, Platinenorientierung, Magnetabstand, Abschirmung durch Metall, Antennenlage und gegebenenfalls Adapter 100428 / 100729 prüfen. | 
 Fahrzeug, Stecker oder Leitungen weichen von der Anleitung ab | Arbeit stoppen und fahrzeugspezifische Freigabe von Hersteller oder THITRONIK Support einholen. | 

Siehe Störungsbeseitigung .

## Quellenentscheidung

Das 13-seitige fahrzeugspezifische Einbauhandbuch WiPro III – Mercedes Sprinter NCV3 / VW Crafter ab 2006 , Stand 06/21 , wurde vollständig textlich und visuell geprüft.

Das DIP-Bild bestätigt SW1 + SW6 . Die ältere allgemeine Tabelle zeigt nur Schalter 1–4; daraus darf SW6 nicht entfernt werden.

Die Fahrzeug-PDF belegt CAN-Verteiler, alle vier Blinkeranschlüsse, Masse M10 , OBD Pin 8, F10 / 15 A , beide Sirenenschaltungen, Montageort der Zentrale und vollständige Prüfabläufe.

Das allgemeine Installationshandbuch 1.8 bestätigt WiPro-Pins 1/7/11/12/14/15/16/17/18, Diodenverteiler 100455 , Sicherheitsregeln und Diagnose; fahrzeugspezifische Angaben haben Vorrang.

Die alte Pflichtformulierung zur Sirene wurde auf „dringend empfohlen“ korrigiert. Der unbelegte safe.lock-Verweis und der falsche allgemeine Montageort wurden entfernt.

Mercedes.docx ist lokal nicht verfügbar und wurde nicht als Beleg verwendet.

## Querverweise

WiPro III 

Sirenen und Hupen 

Fahrzeugkompatibilität 

Artikelnummern-Register 

Funk-Magnetkontakt 868 

Anlernvorgang 

Störungsbeseitigung 

Mercedes Sprinter T1N 

Mercedes Sprinter VS30 

VW Crafter / MAN TGE 2017–2024
