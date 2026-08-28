# Renault Master II / Opel Movano A / Nissan Interstar (1998–2010)

Route: /de/fahrzeuge/renault-master-ii | Stand: 2026-07-21 | Sichtbarkeit: standard
Quelle: Thitronik Online/project-data/runtime/wiki/wiki-articles/de/fahrzeuge/renault-master-ii.json

---
Renault Master II / Opel Movano A / Nissan Interstar (1998–2010)

Dieser Artikel beschreibt den belegten Einbau der WiPro III in den Renault Master der Baujahre 1998–2010 und die im Projekt gemeinsam geführten Plattformmodelle Opel Movano A und Nissan Interstar. Grundlage ist das fahrzeugspezifische THITRONIK-Einbauhandbuch, Stand 12/20 ; das allgemeine Installationshandbuch Version 1.8 ergänzt nur übergreifende Sicherheits- und Anschlussregeln.

Abgleichpflicht: Die Primärquelle trägt ausschließlich die Bezeichnung Renault Master. Beim Opel Movano A, Nissan Interstar sowie bei abweichendem Baujahr oder Steckerbild müssen P202, Pinlage, Leitung und Signal vor jedem Anschluss am konkreten Fahrzeug geprüft werden. Bei einer Abweichung nicht nach Farbe weiterarbeiten, sondern THITRONIK-Support einbeziehen.

## Geltungsbereich und freigegebener Stand

Merkmal | Freigegebener Stand | 
 Fahrzeuge | Renault Master II; im Projekt zusätzlich Opel Movano A und Nissan Interstar derselben Plattform | 
 Modellzeitraum | 1998–2010 | 
 System | WiPro III, analoger Anschluss; die Fahrzeugquelle nennt keinen CAN-Anschluss | 
 fahrzeugspezifische Quelle | Einbauhandbuch Stand 12/20 , 11 Seiten | 
 Projektmatrix | Mindeststand 0823-001 / 2.1 ; im Fahrzeughandbuch selbst nicht genannt | 
 DIP → ON | SW1 + SW2 + SW3 + SW6 | 
 akustischer Alarm | Fahrzeughupe nicht ansteuerbar; normale oder Back-up-Sirene im Motorraum vorsehen | 
 Alarmdauer im Funktionstest | etwa 30 s akustisch und 180 s optisch | 

Seriennummer und Softwarestand vor dem Einbau dokumentieren. Die Projektmatrix führt 0823-001 / 2.1 als Basis; die konkrete Fahrzeuganleitung belegt jedoch nur Profil und Anschlüsse. Ein unbekannter oder abweichender Gerätestand muss daher vor dem Einbau freigegeben werden. Siehe Fahrzeugkompatibilität .

## Quellenrang und bereinigter Altbestand

Thema | Quellenentscheidung | 
 Fahrzeugprofil, Einbauort, Pins, Leitungsfarben und Tests | das fahrzeugspezifische Handbuch Stand 12/20 ist vorrangig | 
 allgemeine Sicherheit, Grundversorgung und Pinrollen | Installationshandbuch Version 1.8 dient ergänzend | 
 Alarmdauer | fahrzeugspezifisch 30 s akustisch und 180 s optisch; die ältere allgemeine Angabe 120 s optisch gilt hier nicht | 
 60-Sekunden-Verhalten der Kabinentüren | Scharfschaltverzögerung, ausdrücklich keine Alarmverzögerung | 
 FAQ_WiPro-III_DE.md aus dem Altbestand | lokal nicht vorhanden und nicht als eingesehene Quelle behandelt | 
 Opel-/Nissan-Plattformzuordnung | im Projekt geführt; das Steckerbild muss am konkreten Fahrzeug bestätigt werden | 

Die alte Kurzfassung ließ die Sirenenpins, die vollständige Relaisbelegung, den Anlernvorgang und wesentliche Magnetkontaktregeln aus. Diese Punkte sind nun aus den visuell geprüften Originalseiten ergänzt.

## Sicherheit und Vorprüfung

Einbau und Arbeiten an Fahrzeugelektrik dürfen nur qualifizierte Fachwerkstätten ausführen.

Vor elektrischen Arbeiten Batterie-Minus und vorhandene Zusatzbatterien nach Fahrzeug- und Aufbauherstellervorgabe trennen. Radio-Code und flüchtige Einstellungen berücksichtigen.

Airbag-, Lenkungs-, Brems-, Wegfahrsperren- und andere Sicherheitssysteme dürfen weder angezapft noch behindert werden.

Stecker und Pins nie allein nach Leitungsfarbe bestimmen; Steckerbezeichnung, Reihe, Pin, Farbe, Spannung und Signalart müssen gemeinsam stimmen.

Ungenutzte Ein- und Ausgänge einzeln isolieren. Leitungen gegen Bewegung, Scheuern, Hitze, Feuchtigkeit und Zug sichern.

Vor dem Eingriff Zentralverriegelung, Innenlicht, Warnblinker, Zündung und alle Türen prüfen; vorhandene Fehler dokumentieren.

Bei fehlender Leitung, abweichendem Steckerbild oder unklarer Fahrzeugvariante Arbeit stoppen und Support kontaktieren.

## Material und Vorbereitung

Die Fahrzeuganleitung nennt vier rote Stoßverbinder, vier blaue Abzweigverbinder, zwei mit Silikonfett gefüllte Abzweigverbinder, eine Schraube M8 und etwa 1 m Leitung 2 × 0,5 mm² . Benötigt werden außerdem Torx T20 , Quetschkabelschuhzange, Kombizange, Akkuschrauber, Kabelbinder und ein 8-mm -Bohrer für die Status-LED.

Funkkomponenten möglichst vor dem Einbau anlernen:

Taste rechts neben dem Anschlussstecker gedrückt halten, bis die Zentrale piept; die Status-LED leuchtet dauerhaft.

Jeden Funk-Magnetkontakt , Gaswarner oder jede Funk-Kabelschleife zwei- bis dreimal auslösen.

Ein Piepton und das kurze Erlöschen der Status-LED bestätigen das Speichern.

Jede eingelernte Komponente und ihre Einbauposition in der Arbeitskarte notieren.

Siehe Anlernvorgang .

## DIP-Profil einstellen

Spannungsversorgung der WiPro III vollständig trennen.

Am achtfachen Codierschalter SW1, SW2, SW3 und SW6 auf ON stellen.

SW4, SW5, SW7 und SW8 bleiben OFF , sofern eine freigegebene Zusatzfunktion nichts anderes verlangt.

Stellung fotografieren und gegen Fahrzeug, Gerätestand und Arbeitskarte prüfen.

Gehäuse schließen und erst danach mit der Installation fortfahren.

DIP-Schalter niemals unter Spannung ändern. Das Profil einer anderen Renault-Master-Generation darf nicht übernommen werden.

## Zugang, Status-LED und Einbauort

Untere Armaturenbrettklappe links unter der Lenksäule entriegeln und abnehmen.

Einen gut sichtbaren, kollisionsfreien Platz für die Status-LED wählen und mit 8 mm bohren.

Zentralelektrik freilegen und die Steckverbindungen P201 und P202 lokalisieren.

WiPro-Zentrale am Relaiskasten unter der Lenksäule montieren.

Leitung zur Status-LED und alle Anschlussleitungen so verlegen, dass Pedale, Lenksäule und andere bewegliche Teile frei bleiben.

Kabel zunächst nur so weit fixieren, dass Messung und Funktionstest noch möglich sind.

## Fahrzeuganschlüsse an P202 und Pin 36

Bei P202 zählt die Fahrzeuganleitung in Reihe A Pin 1–9 von links und in Reihe B Pin 1–6 von links . Die Orientierung vor dem Auspinnen oder Abzweigen am Steckerbild bestätigen.

Funktion | WiPro-III-Leitung | Fahrzeuganschluss | Fahrzeugleitung | Hinweis | 
 Türkontakt, bevorzugt | beige | P202, Reihe B, Pin 5 | rot/blau | zuerst diese belegte Position prüfen | 
 Türkontakt, Alternative | beige | P202, Reihe A, Pin 1 | weiß/orange | nur wenn Reihe B, Pin 5 nicht vorhanden ist; Innenlicht wird dann massegeschaltet | 
 Verriegelungssignal | blau/schwarz | P202, Reihe A, Pin 6 | braun | Eingang für ZV „zu“ | 
 Entriegelungssignal | blau | P202, Reihe A, Pin 9 | weiß | Eingang für ZV „auf“ | 
 Zündung | gelb | P202, Reihe B, Pin 3 | gelb | Zündungseingang/ Klemme 15 | 
 Warnblinker | rot/rosa | Pin 36 im grünen Einsatz | grün | Warnblinkeransteuerung | 

Vor jedem Anschluss Signal messen. Die alternative Türkontaktposition ist kein zweiter paralleler Anschluss: Es wird die zum Fahrzeug passende eine Variante verwendet.

## Masse und Spannungsversorgung

Funktion | WiPro-III-Leitung | Anschluss | Prüfung | 
 Masse/Klemme 31 | schwarz | Ringöse am Massepunkt der A-Säule | Kontaktfläche und festen Sitz prüfen; Schraube wieder sicher anziehen | 
 Dauerplus / Klemme 30 | rot | Innenlichtsicherung 15 A | Dauerplus vor und nach Anschluss messen; fahrzeugseitige Sicherung nicht durch höheren Wert ersetzen | 

Die Versorgung erst herstellen, wenn DIP-Profil, Steckverbindungen, Isolierung und Zugentlastung geprüft sind.

## Sirene anschließen

Die Fahrzeughupe kann laut Primärquelle nicht angesteuert werden. Deshalb eine normale Sirene oder Back-up-Sirene im Motorraum montieren; die mitgelieferte Schraube M8 ist dafür vorgesehen. Die Leitungen können durch den Sicherungskasten im Motorraum in den Fahrgastraum geführt werden. Siehe Sirenen und Hupen .

Ausführung | WiPro III | Sirene | Hinweis | 
 normale Sirene Plus | Pin 15, weiß | rot | positiver Sirenenausgang | 
 normale Sirene Minus | Pin 16, weiß/schwarz | schwarz | geschalteter Rückleiter | 
 Back-up-Sirene Versorgung | Klemme 30/+12 V und Masse | rot an +12 V, schwarz an Masse | separat sicher und nach Vorgabe anschließen | 
 Back-up-Sirene Trigger | Pin 15, weiß | weiß | positiver Alarmauslöser | 
 Back-up-Sirene unbenutzt | — | blau | einzeln isolieren | 

Sirene spritzwassergeschützt, mechanisch fest und mit freiem Schallaustritt montieren. Leitungen im Motorraum gegen Hitze und Scheuern schützen.

## Automatische Türverriegelung bei Fahrtantritt

Verriegelt der Master bei Fahrtantritt automatisch, kann das Verriegelungssignal die WiPro III während der Fahrt schärfen und nach dem Aussteigen einen Alarm verursachen. Die Komfortfunktion kann erhalten bleiben, wenn der WiPro-Verriegelungseingang während eingeschalteter Zündung mit einem zündungsgesteuerten Öffnerrelais unterbrochen wird.

Relaiskontakt | Anschluss | Leitung/Funktion | 
 85, Spule | Zündung | WiPro gelb beziehungsweise geprüftes Zündungssignal | 
 86, Spule | Masse | WiPro schwarz beziehungsweise geprüfter Massepunkt | 
 30, COM | Verriegelung vom Master | fahrzeugseitiges Verriegelungssignal | 
 87a, Öffner/NC | WiPro-Verriegelungseingang | blau/schwarz | 
 87, Schließer/NO | nicht verwendet | einzeln isolieren | 

Nach dem Einbau Stillstand, Zündung ein/aus, automatisches Verriegeln während der Fahrt sowie anschließendes Entriegeln und Aussteigen als getrennte Testfälle prüfen.

## Funk-Magnetkontakte montieren

Die Fahrzeugquelle dokumentiert die Kontakte Art. 100757 in Schwarz und 100758 in Weiß sowie die Montageadapter Art. 100428 und 100729 .

Sender vorzugsweise am festen Rahmen und Magnet am beweglichen Tür-, Fenster- oder Klappenteil montieren.

Platine so in das Gehäuse einsetzen, dass die Sende-LED vom Magneten weg zeigt. Bei falscher Orientierung ist Anlernen möglich, eine Alarmauslösung jedoch nicht.

Magnet im empfohlenen Bereich von 22–30 mm positionieren und nicht jenseits der roten Grenzlinie montieren.

Bei größerem Spalt oder ungünstiger Antennenausrichtung einen geeigneten Montageadapter 100428 oder 100729 verwenden.

Klebeflächen sauber, trocken und fettfrei vorbereiten; Klebepads nicht unter 15 °C verarbeiten und etwa 24 h bis zur vollen Festigkeit unbelastet lassen.

Wo Klebemontage nicht zuverlässig möglich ist, die vorgesehenen Markierungen im Sendergehäuse für eine Schraubbefestigung nutzen.

Kontakt nach der Montage mehrfach öffnen und schließen und die Funkreaktion prüfen.

Siehe Funk-Magnetkontakt 868 und Artikelnummern-Register .

## Inbetriebnahme und Funktionstest

Alle Pins, Leitungsfarben, Verbinder, Sicherungen, Massepunkte, isolierten Adern und das DIP-Profil erneut prüfen.

Batterien nach Herstellervorgabe anschließen und kontrollieren, dass keine Warnlampen oder neuen Fahrzeugfehler auftreten.

Alle Türen und angelernten Funkkontakte schließen.

Mit der Fahrzeugtaste „Verriegeln“ schärfen. Ein Piepton der Zentrale und die Fahrzeugblinker müssen die Aktivierung bestätigen.

Kabinentür innerhalb und nach Ablauf von 60 s öffnen. Die Quelle bezeichnet diese Zeit als Scharfschaltverzögerung : Erst nach ihrem Ablauf führt das Öffnen der Kabinentür zum Alarm.

Jeden Funk- Magnetkontakt separat prüfen. Diese Kontakte reagieren unmittelbar nach dem Schärfen und besitzen keine 60-Sekunden-Scharfschaltverzögerung.

Einen echten Testalarm auslösen und etwa 30 s akustischen sowie 180 s optischen Alarm prüfen.

Mit der Fahrzeugtaste „Entriegeln“ entschärfen beziehungsweise einen laufenden Alarm beenden.

Zentralverriegelung, Zündung, Warnblinker, Innenlicht und jede Alarmquelle einzeln erneut prüfen.

Bei Fahrtverriegelung die Relaisfunktion unter realistischen Zuständen prüfen; die Anlage darf während der Fahrt nicht unbeabsichtigt schärfen.

Erst nach bestandenem Test Leitungen endgültig befestigen und Verkleidungen montieren.

## Quittierungen und Diagnose

Beobachtung | Bedeutung und Maßnahme | 
 ein Piepton plus Fahrzeugblinker beim Verriegeln | Anlage wurde geschärft | 
 Reihe kurzer Pieptöne beim Verriegeln | ein angelernter Magnetkontakt wird als offen erkannt; Anlage schärft trotzdem | 
 Kabinentür löst vor Ablauf von 60 s nicht aus | erwartete Scharfschaltverzögerung; nach Ablauf erneut testen | 
 Funk-Magnetkontakt löst nach dem Schärfen nicht sofort aus | Platinenorientierung, Abstand, Anlernung und Batterie prüfen | 
 offener Kontakt wird trotz geschlossener Öffnung gemeldet | Abstand prüfen, alle Kontakte mehrfach öffnen/schließen und erneut schärfen | 
 Kontakt bleibt fälschlich offen | Spannungsstecker der WiPro III ziehen und bei geschlossenen Kontakten wieder verbinden | 
 Alarm nach automatischer Fahrtverriegelung | blau/schwarzen Verriegelungseingang und Öffnerrelais 30/87a/85/86 prüfen | 
 keine akustische Alarmierung | Sirenenschaltung an Pin 15/16 beziehungsweise Back-up-Sirenenversorgung prüfen; Fahrzeughupe ist hier nicht vorgesehen | 
 Stecker oder Leitung weicht ab | Arbeit stoppen, keine Farbe oder Position übertragen, Supportfall mit Fotos und Messwerten eröffnen | 

## Übergabe und Dokumentation

In der Arbeitskarte festhalten:

Fahrzeugmodell, Modelljahr, FIN und relevante Aufbauvariante

vollständige WiPro-III-Seriennummer und Softwarestand

Dokumenttitel und Stand 12/20 der verwendeten Fahrzeuganleitung

bestätigte DIP-Stellung SW1 + SW2 + SW3 + SW6 

tatsächlich verwendete Türkontaktvariante und Messwerte aller Anschlüsse

Montageorte von Zentrale, Status-LED und Sirene sowie Leitungswege

Ausführung der Sirene und gegebenenfalls Relaisbelegung der Fahrtverriegelung

Artikelnummern und Positionen aller Funkkontakte

Ergebnis jedes Einzeltests einschließlich 60 s , 30 s und 180 s 

Fehlerspeicherstatus und Fahrzeugfunktionen vor und nach dem Einbau

Bei der Übergabe die 60-Sekunden-Scharfschaltverzögerung der Kabinentüren, die sofortige Reaktion der Funkkontakte und die Bedienung zum Schärfen und Entschärfen demonstrieren.

## Quellenentscheidung

Das elfseitige THITRONIK-Einbauhandbuch WiPro III Renault Master 1998–2010 , Stand 12/20 , wurde vollständig textlich und visuell geprüft. Es belegt DIP-Profil, Einbauort, sämtliche Fahrzeuganschlüsse, beide Sirenenvarianten, Versorgung, Relaislösung, Funktionstest und Magnetkontaktmontage.

Das allgemeine Installationshandbuch Version 1.8 ergänzt Sicherheits-, Grundanschluss- und Diagnosehinweise. Bei Widersprüchen hat die neuere fahrzeugspezifische Quelle Vorrang.

Deshalb gilt für diesen Einbau 180 s optischer Alarm statt der älteren allgemeinen Angabe 120 s .

Die 60 Sekunden der Kabinentüren sind laut Primärquelle eine Scharfschaltverzögerung und keine Verzögerung eines bereits ausgelösten Alarms.

Die Projektmatrix führt 0823-001 / 2.1 ; das fahrzeugspezifische Handbuch nennt selbst keinen Mindeststand. Diese Grenze darf daher nicht auf unbekannte Hardwarestände verallgemeinert werden.

Die im Altbestand genannte Datei FAQ_WiPro-III_DE.md ist lokal nicht auffindbar und wurde nicht als Beleg verwendet.

## Querverweise

WiPro III 

Fahrzeugkompatibilität 

Anlernvorgang 

Funk-Magnetkontakt 868 

Sirenen und Hupen 

Störungsbeseitigung 

Renault Master III — Nachfolgegeneration
