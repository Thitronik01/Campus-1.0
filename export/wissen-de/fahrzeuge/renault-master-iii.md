# Renault Master III / Opel Movano B / Nissan NV400 (ab 2011)

Route: /de/fahrzeuge/renault-master-iii | Stand: 2026-07-21 | Sichtbarkeit: standard
Quelle: Thitronik Online/project-data/runtime/wiki/wiki-articles/de/fahrzeuge/renault-master-iii.json

---
Renault Master III / Opel Movano B / Nissan NV400 (ab 2011)

Dieser Artikel beschreibt den belegten Einbau der WiPro III in den Renault Master ab 2011 und die im Projekt gemeinsam geführten Plattformmodelle Opel Movano B und Nissan NV400. Maßgeblich ist das zehnseitige THITRONIK-Einbauhandbuch, Stand 04/25 ; das allgemeine Installationshandbuch Version 1.8 ergänzt Pinrollen, Sirenenanschluss und Sicherheitsregeln.

Abgleichpflicht: Die aktuelle Primärquelle trägt ausschließlich die Bezeichnung Renault Master. Beim Opel Movano B, Nissan NV400 sowie bei abweichendem Baujahr, Aufbau oder Steckerbild müssen P201, Pinlage, Leitungsfarbe und Signal am konkreten Fahrzeug bestätigt werden. Bei einer Abweichung nicht nach Plattformähnlichkeit oder Farbe weiterarbeiten, sondern THITRONIK-Support einbeziehen.

## Geltungsbereich und freigegebener Stand

Merkmal | Freigegebener Stand | 
 Fahrzeuge | Renault Master III ab 2011; im Projekt zusätzlich Opel Movano B und Nissan NV400 derselben Plattform | 
 System | WiPro III Universal Set Art. 100754 | 
 fahrzeugspezifische Quelle | Einbauhandbuch Stand 04/25 , 10 Seiten | 
 Kommunikation | CAN-High, CAN-Low und leistungslose Warnblinkeransteuerung an P201 | 
 DIP → ON | SW2 + SW3 + SW6 | 
 dokumentierter Bedienweg | THITRONIK Funk-Handsender 868; Original-Fahrzeugfunkschlüssel nur für Vorprüfung und CAN-Diagnose belegt | 
 akustischer Alarm | Fahrzeughupe am Schleifring; externe Sirene optional | 
 Alarmdauer | etwa 30 s akustisch und 180 s optisch | 
 Mindeststand | in der aktuellen Fahrzeugquelle nicht genannt; Seriennummer und Software vor Einbau dokumentieren | 

Der separate Renault Master 2019–2024 mit safe.lock verwendet Set Art. 105832 und eine andere Bedienlogik. Anschlüsse, DIP-Profil und Bedienaussagen beider Produktkonfigurationen dürfen nicht vermischt werden.

## Quellenrang und bereinigter Altbestand

Thema | Quellenentscheidung | 
 Profil, Set, Demontage, P201, Versorgung, Hupe und Funktionstest | das fahrzeugspezifische Handbuch Stand 04/25 ist vorrangig | 
 WiPro-Pinrollen, 10-A -Absicherung und optionale Sirene | Installationshandbuch Version 1.8 ergänzt die Fahrzeugquelle | 
 Mindestseriennummer | weder die aktuelle Fahrzeugquelle noch die allgemeine Fahrzeugtabelle nennt einen Mindeststand; die alte Angabe 0823-014 wird nicht freigegeben | 
 früherer Matrixhinweis 0823-001 / 2.1 und Software 6.9 | in den verfügbaren Quellen nicht belegt und aus allen Sprachmatrizen zu entfernen | 
 Türabdeckung | jede Öffnung einzeln prüfen; die alte pauschale Aussage zu nicht überwachten Schiebe- und Hecktüren ist nicht haltbar | 
 Bedienung | der aktuelle Einbauablauf verwendet verbindlich den THITRONIK Funk- Handsender ; eine Änderung des Alarmzustands über den Originalschlüssel wird nicht zugesagt | 
 Abschlusstest auf Quellseite 6 | „Schritt 7 wiederholen“ ist ein interner Verweisfehler; nach Inhalt ist der erste Funktionstest aus Schritt 5 zu wiederholen | 
 FAQ_WiPro-III_DE.md aus dem Altbestand | lokal nicht vorhanden und nicht als eingesehene Quelle behandelt | 

Für Versionsfragen siehe Seriennummern und Softwarestände .

## Sicherheit und Vorprüfung

Einbau und Arbeiten an der Fahrzeugelektrik dürfen nur qualifizierte Fachwerkstätten ausführen.

Vor elektrischen Arbeiten Batterie-Minus und vorhandene Zusatzbatterien nach Fahrzeug- und Aufbauherstellervorgabe trennen. Radio-Code und flüchtige Einstellungen berücksichtigen.

Beim Arbeiten an der Lenksäule dürfen Airbag-, Lenkwinkel-, Wegfahrsperren- und andere Sicherheitsleitungen weder geprüft noch angezapft oder behindert werden.

Stecker und Pins nie allein nach Leitungsfarbe bestimmen; Bezeichnung, Pin, Farbe, Spannung und Signalart müssen gemeinsam stimmen.

Ungenutzte Ein- und Ausgänge einzeln isolieren. Leitungen gegen Bewegung, Scheuern, Hitze, Feuchtigkeit und Zug sichern.

Vorhandene Warnlampen, Fehlerspeichereinträge und elektrische Fehler vor dem Eingriff dokumentieren.

Bei fehlender Leitung, abweichendem Steckerbild oder unklarer Variante Arbeit stoppen und Support kontaktieren.

Vor Beginn am konkreten Fahrzeug prüfen:

Ist eine Funk-Fernbedienung des Fahrzeugs vorhanden und funktioniert sie?

Funktioniert die Zentralverriegelung fehlerfrei?

Werden originale Türen bei eingeschalteter Zündung im Kombiinstrument als offen angezeigt?

Welche Türen und Klappen eines vollintegrierten Aufbaus werden tatsächlich über den Fahrzeug-CAN erfasst?

Funktioniert die Fahrzeughupe?

Ist tatsächlich das Universal Set Art. 100754 vorhanden?

Stimmen Renault Master, Baujahr und P201-Steckerbild mit der Anleitung Stand 04/25 überein?

## Material und Vorbereitung

Die Fahrzeugquelle nennt Universal Set 100754 , gegebenenfalls weiteres Funkzubehör oder Sirenen, Kombi- beziehungsweise Wasserpumpenzange, Kreuzschlitz PH2 oder Torx T20 , Akkuschrauber und 8-mm -Bohrer für die Status-LED. Ergänzend werden Multimeter, geeignete Crimpzange, Verbinder, Isoliermaterial und Kabelbinder benötigt.

Set, Zubehör und vollständigen Kabelsatz gegen die Arbeitskarte prüfen.

Fahrzeugfunktionen und Fehlerspeicherstatus dokumentieren.

Anschlussstellen zunächst nur freilegen; noch keine Verbindung nach Farbe herstellen.

Einbauort der Zentrale im Innenraum nahe der Zentralelektronik wählen, geschützt vor schnellem Zugriff und außerhalb des Bewegungsbereichs von Pedalen und Lenksäule.

Geeignete Leitungsquerschnitte und eine WiPro-Versorgungsabsicherung von 10 A vorsehen.

## DIP-Profil einstellen

WiPro III vollständig spannungsfrei machen und Gehäuse öffnen.

Am achtfachen Codierschalter SW2, SW3 und SW6 auf ON stellen.

SW1, SW4, SW5, SW7 und SW8 bleiben OFF , sofern keine separat freigegebene Zusatzfunktion etwas anderes verlangt.

DIP-Stellung fotografieren und mit Fahrzeug, Set und Arbeitskarte abgleichen.

Gehäuse schließen und erst danach mit der Installation fortfahren.

DIP-Schalter niemals unter Spannung ändern. Weder das Profil des Renault Master II noch das safe.lock -Profil des Sets 105832 übernehmen.

Der allgemeine Replay-Schutz über SW5 ist ab 0823-014 beziehungsweise Software 5.8 grundsätzlich beschrieben, gehört aber nicht zum fahrzeugspezifischen Grundprofil. SW5 nur nach ausdrücklicher Anforderung und passend zum tatsächlichen Gerätestand verwenden; die CAN-Türauswertung bleibt dabei erhalten.

## Armaturenbrett und Bordcomputer freilegen

Abdeckung des Sicherungskastens entfernen.

Verkleidung unterhalb der Lenksäule entfernen.

Lenksäulenverkleidung entfernen.

Befestigungsschraube des Bordcomputers lösen.

Bordcomputer aus der Halterung heben und nach hinten unten bewegen, damit im Fußraum sicher gearbeitet werden kann.

Stecker P201 eindeutig lokalisieren und vor dem Anschluss fotografieren.

Beim späteren Hupenanschluss wird die Lenksäulenverkleidung mit drei Schrauben Torx T20 gelöst. Herstellervorgaben für Airbag und Lenksäule strikt einhalten.

## CAN und Warnblinker an P201 anschließen

Die Fahrzeugquelle verlangt blaue, gelgefüllte Abzweigverbinder. Vor dem Verbinden jeden Pin und jedes Signal messen und die Orientierung des P201-Steckers bestätigen.

Funktion | Fahrzeuganschluss | Fahrzeugleitung | WiPro-III-Leitung | WiPro-Pin | 
 Warnblinker | P201, Pin 11 | flieder/schwarz | rot/rosa | Pin 6, Smart Blinker | 
 CAN-Low | P201, Pin 19 | natur | violett/orange | Pin 18 | 
 CAN-High | P201, Pin 39 | orange | weiß/orange | Pin 17 | 

CAN nicht vertauschen: Die Fahrzeugtabelle benennt beide Zeilen nur als „CAN“. Die eindeutige Zuordnung ergibt sich aus der WiPro-Pinbelegung: weiß/orange = CAN-High, violett/orange = CAN-Low.

## Versorgung und Zündung anschließen

Sicherungskasten links entriegeln und nach rechts drehen. Die aktuelle Fahrzeugquelle nennt keine Sicherungsnummer und keine eindeutige Abgriffposition; geeignete Punkte müssen deshalb gemessen und mit ausreichendem Leitungsquerschnitt gewählt werden.

Funktion | Fahrzeugseite | WiPro-III-Leitung | WiPro-Pin | Vorgabe | 
 Dauerplus / Klemme 30 | geeignete rote Leitung im Sicherungsbereich | rot | Pin 11 | mit 10 A absichern | 
 Zündung/ Klemme 15 | geeignete gelbe Leitung im Sicherungsbereich | gelb | Pin 7 | Signal bei Zündung ein/aus messen | 
 Masse/Klemme 31 | geprüfter Massepunkt im Fußraum | schwarz | Pin 1 | Kontaktfläche und festen Sitz prüfen | 

Keine Sicherungsposition aus einem anderen Modelljahr übernehmen. Versorgung erst herstellen, wenn DIP-Profil, CAN, Warnblinker, Isolierung und Zugentlastung kontrolliert sind.

## Fahrzeughupe anschließen

Prüfen, dass die Fahrzeughupe vor dem Eingriff funktioniert.

Batterie nach Herstellervorgabe trennen und Wartezeiten für Airbag-/Lenksäulensysteme einhalten.

Lenksäulenverkleidung durch Lösen der drei Torx- T20 -Schrauben abnehmen.

Grauen Stecker am Schleifringverbinder lokalisieren.

Pin 9 , Fahrzeugleitung natur/schwarz , eindeutig bestätigen.

Diese Leitung mit der pinken WiPro-Leitung, Pin 9 , verbinden.

Leitung so sichern, dass Lenksäule, Schleifring und Verstellung vollständig frei bleiben.

Der WiPro-Hupenausgang ist eine leistungslose Ansteuerung. Keine Last oder andere Lenksäulenleitung ersatzweise anschließen.

## Optionale externe Sirene

Die Fahrzeugquelle nennt Sirenen als mögliches Zubehör; die allgemeine Anleitung dokumentiert deren Anschluss. Siehe Sirenen und Hupen .

Ausführung | WiPro III | Sirene | Hinweis | 
 normale Sirene Plus | Pin 15, weiß | rot | positiver Sirenenausgang, max. 1 A | 
 normale Sirene Minus | Pin 16, weiß/schwarz | schwarz | Sirenenmasse | 
 Back-up-Sirene Versorgung | Klemme 30 und Masse | rot an Plus, schwarz an Masse | permanent und nach Sirenenvorgabe anschließen | 
 Back-up-Sirene Trigger | Pin 15, weiß | weiß | positiver Trigger | 
 Back-up-Sirene unbenutzt | — | blau | einzeln isolieren | 

Sirene fest, spritzwassergeschützt und mit freiem Schallaustritt montieren. Leitungen von heißen oder beweglichen Teilen und scharfen Kanten fernhalten.

## Status-LED montieren

Gut sichtbare, kollisionsfreie Position wählen und gegebenenfalls mit dem Kunden abstimmen.

Bohrstelle auf dahinterliegende Leitungen und Bauteile prüfen.

Loch mit 8 mm bohren und Status-LED einsetzen.

Rot/schwarzes LED-Kabel über den weißen Steckverbinder mit dem Gegenstück des WiPro-Kabelsatzes verbinden.

Leitung zugentlastet und geschützt verlegen.

## Funkzubehör anlernen

Sämtliches Zubehör muss den Zusatz 868 tragen und einmalig angelernt werden. Siehe Anlernvorgang .

Taster rechts neben dem Anschlussstecker gedrückt halten, bis die Zentrale piept; die Status-LED leuchtet dauerhaft.

Jeden Funk-Magnetkontakt 868 zwei- bis dreimal auslösen, indem der Magnet mehr als 30 mm von der Sendeeinheit entfernt wird.

Am Funk-Handsender 868 die Tasten betätigen.

Funk-Gaswarner 868 einschalten.

Funk-Kabelschleife 868 aus der Halterung nehmen.

Nach jedem Zubehör auf Piepton und kurzes Erlöschen der Status-LED achten.

Anlernmodus durch kurzes Spannungsfreimachen oder kurzen Druck auf den WiPro-Taster beenden.

Jedes gespeicherte Zubehör und seine Position dokumentieren.

Der Speicher ist nicht flüchtig; Zubehör bleibt auch nach längerer Spannungsunterbrechung gespeichert. Löschen erfolgt nur nach dem vollständigen Löschverfahren der allgemeinen Anleitung.

## Funk-Magnetkontakte montieren

Die Fahrzeugquelle dokumentiert die Kontakte Art. 100757 in Schwarz und 100758 in Weiß sowie Montageadapter Art. 100428 und 100729 .

Sender möglichst am festen Rahmen und Magnet am beweglichen Tür-, Fenster- oder Klappenteil montieren.

Platine so einsetzen, dass die Sende-LED vom Magneten weg zeigt. Bei falscher Orientierung ist Anlernen möglich, eine Alarmierung jedoch nicht.

Magnet im empfohlenen Bereich von 22–30 mm positionieren und nicht jenseits der roten Grenzlinie montieren.

Bei größerem Spalt oder ungünstiger Antennenausrichtung Adapter 100428 oder 100729 verwenden.

Klebeflächen sauber, trocken und fettfrei vorbereiten; Klebepads nicht unter 15 °C verarbeiten und etwa 24 h unbelastet aushärten lassen.

Wo Klebemontage nicht zuverlässig möglich ist, die Markierungen im Sendergehäuse für eine Schraubbefestigung nutzen.

Kontakt nach Montage mehrfach öffnen und schließen und die Funkreaktion prüfen.

Siehe Funk-Magnetkontakt 868 .

## Tür- und Klappenabdeckung prüfen

Eine Anzeige im Kombiinstrument ist ein wichtiger Hinweis auf CAN-Erfassung, ersetzt aber nicht den Alarmtest. Bei vollintegrierten Wohnmobilen können auch Aufbau-Türen oder -Klappen am Fahrzeug-CAN liegen.

Jede Fahrerhaus-, Schiebe-, Heck- und Aufbautür sowie jede zu sichernde Klappe einzeln öffnen.

Bei eingeschalteter Zündung prüfen, ob das Kombiinstrument die jeweilige Öffnung anzeigt.

WiPro schärfen und für jede Öffnung einen echten Alarmtest durchführen.

Nur eine tatsächlich über CAN Alarm auslösende Öffnung als fahrzeugseitig überwacht dokumentieren.

Für jede nicht erfasste Öffnung einen Funk- Magnetkontakt vorsehen und separat testen.

Die alte pauschale Aussage, Schiebe- und Hecktüren seien nicht vollständig überwacht, wird damit durch eine fahrzeugbezogene Prüfung ersetzt.

## Erster Funktionstest und CAN-Diagnose

Alle relevanten Anschlüsse prüfen und Versorgung herstellen.

Alle Türen und Kontakte schließen.

Mit einer beliebigen Taste des THITRONIK Funk-Handsenders 868 schärfen.

Einen Piepton, das Blinken der Fahrtrichtungsanzeiger und die blinkende Status-LED prüfen.

Fahrertür von innen mechanisch öffnen und Alarm auslösen.

Etwa 30 s akustischen und 180 s optischen Alarm prüfen.

Mit einer beliebigen Taste des THITRONIK Funk-Handsenders entschärfen beziehungsweise den Alarm unterbrechen.

Blinkfolge des Alarmspeichers an der Status-LED dokumentieren.

Löst eine erfasste Tür keinen Alarm aus:

WiPro-Taster kurz drücken; die Status-LED zeigt den Diagnosemodus an.

Fahrzeugfunkschlüssel bedienen oder Warnblinker einschalten, um CAN-Datenverkehr zu erzeugen.

Flackert die Status-LED, empfängt WiPro CAN-Daten.

Bleibt die LED ohne Reaktion, P201-Pins, Crimpverbindungen und CAN-High/CAN-Low prüfen.

Reagiert die Zentrale gar nicht und piept beim Anlegen der Versorgung nicht, Spannung direkt am WiPro-Stecker, Sicherung und Zündung prüfen. Bei eingeschalteter Zündung ist die Anlage deaktiviert.

## Bedienweg und SW5-Abgrenzung

Der aktuelle Fahrzeugtest belegt den THITRONIK Funk-Handsender 868 als Bedienweg: Eine beliebige Taste aktiviert oder deaktiviert das System. Der Original-Fahrzeugfunkschlüssel wird in der Quelle zur Vorprüfung und zur Erzeugung von CAN-Datenverkehr verwendet; daraus folgt keine Freigabe, dass er den Alarmzustand zuverlässig ändert.

Alarmzustand bei der Übergabe immer an Status-LED und realer Alarmreaktion demonstrieren.

Originalschlüssel und THITRONIK Funk-Handsender getrennt testen und dokumentieren.

SW5 nicht als Teil des Grundprofils einschalten. Die allgemeine Replay-Funktion ist geräteabhängig und sperrt die Steuerung über den Fahrzeugfunkschlüssel, nicht die CAN-Türauswertung.

Keine unbelegte Sonderregel ab Software 6.9 anwenden.

Siehe Funk-Handsender 868 .

## Abschließender Funktionstest

Der Quellverweis „Schritt 7 wiederholen“ ist inhaltlich als Wiederholung des ersten Funktionstests aus Schritt 5 zu lesen. Nach Anschluss der Hupe und Anlernen des Zubehörs prüfen:

Schärfen und Entschärfen mit THITRONIK Funk-Handsender 868.

Jede über CAN erfasste Tür und Klappe einzeln.

Fahrzeughupe und gegebenenfalls externe Sirene.

Warnblinker und Status-LED einschließlich Alarmspeicher.

Jeden Funk-Magnetkontakt unmittelbar nach dem Schärfen.

Funk- Kabelschleife durch Entnahme aus der Halterung; siehe Funk-Kabelschleife 868 .

Funk-Gaswarner erst nach seiner Vorlaufzeit von etwa 4 min und ausschließlich nach dessen aktueller Anleitung; Alarm ist bei scharfer und unscharfer WiPro möglich.

Panikalarm des in der Fahrzeugquelle beschriebenen Handsenders durch etwa 1 s langes Drücken beider Tasten; bei älteren Handsenderständen gilt die gerätespezifische Anleitung.

Zündung einschalten und bestätigen, dass die Alarmanlage deaktiviert ist.

Beim Schärfen mit offenen Funk-Magnetkontakten ertönen mehrere Signaltöne und anschließend der Scharfton. Offene Kontakte sind zunächst von der Alarmierung ausgenommen; nach dem Schließen werden sie nach etwa 4 s wieder aktiv. Diese Vent-check -/Lüftungsfunktion für jeden betroffenen Kontakt prüfen.

## Fehlerdiagnose

Beobachtung | Prüfung und Maßnahme | 
 kein Alarm an einer Tür | Kombiinstrumentanzeige, tatsächliche CAN-Erfassung, P201 Pin 19/39 und echten Einzeltest prüfen | 
 keine CAN-Aktivität im Diagnosemodus | CAN-High/CAN-Low, Pins, Crimpung und Versorgung prüfen; Leitungen nicht probeweise vertauschen | 
 keine Warnblinkerquittierung | P201 Pin 11 flieder/schwarz und WiPro rot/rosa Pin 6 prüfen | 
 keine Reaktion und kein Einschaltpiepton | Spannung direkt am WiPro-Stecker, 10-A -Sicherung, Masse, Zündung und Verbinder prüfen | 
 Anlage lässt sich nicht schärfen | Zündung ausschalten; sie deaktiviert die WiPro | 
 keine Fahrzeughupe | grauen Schleifringstecker, Pin 9 natur/schwarz, pinke WiPro-Leitung und ursprüngliche Hupenfunktion prüfen | 
 Kontakt wird trotz geschlossener Öffnung als offen gemeldet | alle Kontakte mehrfach öffnen und schließen; Abstand und Ausrichtung prüfen | 
 Funkkontakt wird nicht empfangen | Anlernung, Batterie, Antennenlage, abschirmendes Metall und Adapter 100428 prüfen | 
 Original-Fahrzeugschlüssel ändert Alarmzustand nicht | keine Störung aus der aktuellen Fahrzeugquelle ableitbar; dokumentierten THITRONIK Funk-Handsender verwenden | 
 Stecker, Pin oder Farbe weicht ab | Arbeit stoppen und Supportfall mit Fotos, Messwerten, Seriennummer und Softwarestand eröffnen | 

## Übergabe und Dokumentation

In der Arbeitskarte festhalten:

Fahrzeugmodell, Modelljahr, FIN und Aufbauvariante

Set Art. 100754 , vollständige WiPro-Seriennummer und Softwarestand

Titel und Stand 04/25 der verwendeten Fahrzeuganleitung

bestätigte DIP-Stellung SW2 + SW3 + SW6 und Zustand von SW5

Messwerte und tatsächliche Lage aller P201-, Versorgungs-, Masse- und Hupenanschlüsse

verwendete Sicherung und Leitungsquerschnitte

Montageorte von Zentrale, Status-LED, Sirene und Funkzubehör

CAN-/Alarmstatus jeder einzelnen Tür und Klappe

Ergebnis des Tests mit Original-Fahrzeugschlüssel und THITRONIK Funk-Handsender getrennt

Ergebnisse für Hupe, Sirene, Warnblinker, Panikalarm, Vent-check und jedes Funkzubehör

Alarmzeiten 30 s / 180 s sowie Fehlerspeicherstatus vor und nach dem Einbau

Bei der Übergabe dokumentierten Bedienweg, Alarmzustandsanzeige, Türabdeckung und Verhalten bei eingeschalteter Zündung demonstrieren. Sicherungsposition und WiPro-Seriennummer in die Kundenunterlagen eintragen.

## Quellenentscheidung

Das zehnseitige THITRONIK-Einbauhandbuch WiPro III (New) Renault Master ab 2011 , Stand 04/25 , wurde vollständig textlich und visuell geprüft. Es belegt Set 100754 , Vorprüfung, SW2 + SW3 + SW6 , Demontage, P201-Pins, Versorgung, Hupenanschluss, Status-LED, Anlernung, Funktionsprüfung und Magnetkontaktmontage.

Das allgemeine Installationshandbuch Version 1.8 ergänzt die eindeutigen WiPro-Pinrollen, 10-A -Absicherung, optionale Sirenen und allgemeine Diagnose. Bei Widersprüchen hat die aktuelle Fahrzeugquelle Vorrang.

Deshalb gelten 30 s akustischer und 180 s optischer Alarm statt der älteren allgemeinen 120 s -Angabe.

Die aktuelle Fahrzeugquelle nennt keinen Mindeststand. Weder 0823-014 noch 0823-001 / 2.1 und eine Sonderregel ab Software 6.9 werden als fahrzeugspezifische Freigabe fortgeführt.

Die Primärquelle belegt nur Renault Master. Opel Movano B und Nissan NV400 bleiben Projektzuordnungen mit verpflichtendem Abgleich am Fahrzeug.

Die pauschale Altangabe zu Schiebe- und Hecktüren wurde durch die von der Quelle verlangte Einzelprüfung der CAN-Erfassung ersetzt.

Der fehlerhafte Quellverweis auf „Schritt 7“ wird sachlich als Wiederholung des ersten Funktionstests aus Schritt 5 behandelt.

FAQ_WiPro-III_DE.md ist lokal nicht auffindbar und wurde nicht als Beleg verwendet.

## Querverweise

WiPro III 

Fahrzeugkompatibilität 

Seriennummern und Softwarestände 

Funk-Handsender 868 

Anlernvorgang 

Funk-Magnetkontakt 868 

Funk-Kabelschleife 868 

Störungsbeseitigung 

Renault Master II — Vorgängergeneration

Renault Master 2019–2024 mit safe.lock — separate Produktkonfiguration
