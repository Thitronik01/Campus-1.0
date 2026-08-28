# G.A.S.-pro (ältere Serie) — Gas- und CO-Alarm

Route: /de/gas-pro | Stand: 2026-07-17 | Sichtbarkeit: standard
Quelle: Thitronik Online/project-data/runtime/wiki/wiki-articles/de/gas-pro.json

---
G.A.S.-pro (ältere Serie) — Gas- und CO-Alarm

Hauptgeräte- Artikelnummer : aus den ausgewerteten Unterlagen nicht eindeutig ableitbar

Handbuchbezeichnung: Handbuch 2.5

Dokumentrevision im Handbuch: 2.2

G.A.S.-pro ist ein modularer, fest eingebauter Gaswarner mit bis zu drei externen Sensoren. In der Grundausstattung erkennt er Propan, Butan und KO-/Narkosegase; mit kompatiblem CO-Sensor kann das System zusätzlich Kohlenmonoxid überwachen. Die Zentrale besitzt einen integrierten Pieper, AutoSense-Eingänge, dynamische Temperaturanpassung und einen permanenten Selbsttest.

Das Handbuch wird bei THITRONIK unter den archivierten Produkten geführt; die Produktseite ist weiterhin erreichbar. G.A.S.-pro III wird dort als neue Generation bezeichnet. Vor Ersatzteilbestellung, Erweiterung oder Softwaremaßnahme deshalb Modell, Seriennummer , Sensorbestückung und Softwarestand des vorhandenen Systems eindeutig feststellen.

[!WARNING]
G.A.S.-pro ist kein Rauchmelder und erkennt CO nur mit einem dafür vorgesehenen, kompatiblen CO-Sensor. Während der Vorheizphase, bei abgeschalteter Versorgung oder bei einem gemeldeten Sensor-/Kabeldefekt besteht keine bestätigte vollständige Überwachung.

## Technische Daten und Quellenabgrenzung

Parameter | Dokumentierter Wert | 
 Nennversorgung laut aktueller Produktseite | 12/24 V DC | 
 Versorgungsspanne laut Handbuch | 9–30 V DC | 
 Stromaufnahme Zentrale laut Handbuch | ca. 10 mA | 
 Stromaufnahme KO-/Flaschengassensor laut Handbuch | ca. 75 mA je Sensor | 
 Stromaufnahme CO-Sensor laut Handbuch | ca. 40 mA je Sensor | 
 Stromaufnahme laut aktueller Produktseite | ca. 80 mA pro Sensor | 
 Sensoreingänge | 3 | 
 Empfindlichkeit KO-/Flaschengase | ab 50 ppm | 
 CO-Detektion laut Handbuch | ab 300 ppm, optional | 
 Interner Pieper laut aktueller Produktseite | ca. 85 dB | 
 Optionale Sirene laut aktueller Produktseite | ca. 105 dB | 
 Maximaler Temperaturbereich | −20 °C bis +80 °C | 
 Empfohlener Bereich mit externem KW-Sensor | 0 °C bis +70 °C | 
 Empfohlener Bereich mit externem CO-Sensor | 0 °C bis +50 °C | 
 Abmessungen (B × H × T) | 100 × 90 × 40 mm | 
 Gewicht | ca. 140 g | 
 Garantieangabe im Handbuch | 36 Monate ab Kaufdatum | 

Die Angaben sind nicht stillschweigend vereinheitlicht: Das Handbuch nennt den elektrischen Eingangsbereich und getrennte Stromwerte für Zentrale und Sensorarten, die aktuelle Produktseite dagegen Nennspannung und einen gerundeten Wert pro Sensor. Für Sicherung, Leitungsdimensionierung oder Ruhestrombilanz die beiliegende Anleitung des konkreten Geräts, die tatsächliche Sensorbestückung und gegebenenfalls THITRONIK-Support heranziehen. Ob im Einzelfall noch ein Garantieanspruch besteht, hängt von Kaufdatum, Nachweis und den geltenden Bedingungen ab.

## Schnellcheck

Frage | Antwort | 
 Eigenständiger Betrieb möglich? | Ja, über den integrierten Pieper | 
 Einbindung in eine Fahrzeugalarmanlage? | Ja, kabelgebunden über NC / NO und COM | 
 Direkte WiPro-III-Einbindung? | Laut aktueller Produktseite per Kabelverbindung möglich; konkrete Ein- und Ausgänge beider Geräte prüfen | 
 Erkannte Gase in Grundausstattung | Propan, Butan und KO-/Narkosegase | 
 Kohlenmonoxid erkannt? | Nur mit kompatiblem CO-Sensor, Art. 100433 | 
 Anzahl Sensoreingänge | bis zu 3 Sensoren | 
 Sensor in der Zentrale | Nein | 
 Vorheizzeit | ca. 4 Minuten | 
 Gasdetektionsbereit | Betriebsanzeige blinkt periodisch | 
 Aderendhülsen | Bei G.A.S.-pro verwenden | 

## Produktrolle und Abgrenzung

Produkt | Rolle | Wesentlicher Unterschied | 
 G.A.S.-pro | Modulares Festeinbau-System der älteren Serie | Zentrale ohne eigenen Gassensor; bis zu drei externe Sensoren; kabelgebundene Alarmkontakte | 
 G.A.S.-pro III — Gaswarner für Freizeitfahrzeuge | Neuere Generation | Sensorik und Systemfunktionen unterscheiden sich; eigene Anleitung und Anschlussregeln verwenden | 
 CO-Sensor — Kohlenmonoxid-Zusatzsensor | Optionaler CO-Sensor, Art. 100433 | Arbeitet nicht eigenständig; Software- und Hauptgerätekompatibilität prüfen | 
 G.A.S.-connect — Funk-Gaswarner für WiPro III | Funk-Zusatzmodul für WiPro III | Kein Standalone-Betrieb; keine G.A.S.-pro-Sensorerweiterung | 
 G.A.S.-plug „all in one" — Mobiler Gaswarner | Mobiler Standalone-Gaswarner | Steckdosenbetrieb; keine externen Sensoren | 

„Ältere Serie“ bedeutet nicht, dass jede installierte Anlage außer Betrieb ist. Es bedeutet, dass Wartung, Zubehör und Anschlussregeln anhand des konkreten Gerätestands geprüft werden müssen und nicht ungeprüft von G.A.S.-pro III übernommen werden dürfen.

## Erkennbare Gase und Systemgrenzen

Stoff oder Ereignis | Erkennung durch G.A.S.-pro | 
 Propan | Ja, mit KO-/Flaschengassensor | 
 Butan | Ja, mit KO-/Flaschengassensor | 
 KO-/Narkosegase | Ja, mit KO-/Flaschengassensor | 
 Kohlenmonoxid (CO) | Optional, mit kompatiblem CO-Sensor | 
 Kohlendioxid (CO₂) | Nein dokumentiert | 
 Rauch oder Hitze | Nein | 
 Sauerstoffmangel | Nein | 

Deos, Rasierwasser, scharfe Reinigungsmittel, Atemalkohol, Kochdämpfe und andere gasähnliche Stoffe können eine Sensorreaktion auslösen. Einen Alarm dennoch zuerst wie ein reales Gasereignis behandeln und die Ursache erst aus sicherer Umgebung klären.

## Systemaufbau und Sensorbestückung

Die Zentrale enthält keinen Gassensor. An ihre AutoSense-Eingänge können laut Handbuch bis zu drei Sensoren angeschlossen werden:

KO-/Flaschengassensoren, Art. 100456 

CO-Sensoren, Art. 100433 

eine geeignete Kombination beider Sensortypen

Die Anzahl der Sensoren muss zum Fahrzeuggrundriss, zu räumlichen Trennungen und zu den Schlafplätzen passen. Ein einzelner tief montierter Gassensor ersetzt keinen deckennahen CO-Sensor; umgekehrt erkennt der CO-Sensor kein Propan, Butan oder KO-Gas.

## Lieferumfang

Zum dokumentierten Lieferumfang gehören:

G.A.S.-pro-Zentrale

Sensor für Propan, Butan und KO-/Narkosegase

Alarmaufkleber

Handbuch

Montagematerial

Sensorbestückung und Lieferumfang eines vorhandenen oder gebrauchten Systems vor der Inbetriebnahme vollständig prüfen. Ein optionaler CO-Sensor gehört nicht zur dokumentierten Grundausstattung.

## Quellenabweichung bei der Sensorkabellänge

Quelle | Angabe | 
 G.A.S.-pro-Handbuch 2.5 | Sensorkabel mit gleichem oder größerem Querschnitt auf maximal 7 m verlängerbar | 
 Aktuelle Produkt-FAQ | Gesamtlänge bis 8 m mit mindestens 3 × 0,14 mm² oder größerem Querschnitt | 

Für eine konservative, produktspezifische Auslegung maximal 7 m Gesamtlänge verwenden. Eine größere Gesamtlänge nur übernehmen, wenn die konkrete Geräte-/Sensorkombination und Ausführung durch aktuelle Unterlagen oder den technischen Support bestätigt ist. Jede Verlängerung muss elektrisch zuverlässig, mechanisch geschützt und mit mindestens gleichem Leiterquerschnitt ausgeführt werden.

## Sensorplatzierung

KO-/Flaschengase sind schwerer als Luft. Den zugehörigen Sensor unterhalb der Schlafplätze an einer senkrechten Fläche möglichst bodennah montieren. Die aktuelle THITRONIK-FAQ konkretisiert die Höhe mit etwa 10–30 cm über dem Boden .

Sensor / Situation | Vorgabe | 
 KO-/Flaschengassensor | etwa 10–30 cm über dem Boden | 
 Abstand zum zu schützenden Schlafplatz | höchstens 1 m laut Handbuch | 
 Mehrere Schlafplätze auf unterschiedlichen Höhen | zusätzliche Sensoren in Schlafplatznähe prüfen | 
 Räumliche Trennung durch Tür oder Vorhang | zusätzlichen Detektionspunkt prüfen | 
 CO-Sensor | möglichst deckennah; Montagevorgabe des Sensors beachten | 
 Heizungsausströmer | mindestens 1 m Abstand | 
 Blei-Säure-Batterie | mindestens 1,5 m Abstand | 
 Nasszelle | ungeeignet | 

Sensoröffnungen nicht abdecken. Lösungsmittel, Silikon, starke Aerosole, direkter Heizluftstrom und dauerhaft feuchte Bereiche können die Messung beeinträchtigen oder den Sensor schädigen.

## Montage der Sensoren

Anlage vollständig spannungsfrei schalten.

Geeigneten Montageort und rückseitige Freigängigkeit prüfen.

Für den Standard-Gassensor eine Bohrung von Ø 20 mm , für den CO-Sensor von Ø 12 mm herstellen.

Mitgelieferte Hülse von außen einpressen.

Sensor von innen mit den beiliegenden Schrauben befestigen.

Leitung geschützt zur Zentrale führen und nach dem Anschlussplan des konkreten Geräts anklemmen.

Bei G.A.S.-pro Aderendhülsen verwenden .

[!WARNING]
Keine lösungsmittelhaltigen Klebstoffe und keine silikonhaltigen Dichtmittel am Sensor verwenden. Sie können das Sensorelement schädigen oder vergiften.

## Montage der Zentrale

Da die Zentrale keinen eigenen Gassensor enthält, kann sie grundsätzlich auch in einem Schrank montiert werden. Nicht unmittelbar neben Heizung oder Boiler montieren, weil dies die dynamische Temperaturanpassung beeinträchtigen kann.

Bei verdecktem Einbau beachten:

Der integrierte Pieper muss im gesamten zu schützenden Bereich sicher hörbar bleiben.

Gegebenenfalls Zusatzsirene Art. 100190 einsetzen.

Die Betriebsanzeige muss kontrollierbar bleiben; gegebenenfalls externe Betriebsanzeige Art. 100034 verwenden.

Klemmen, Sicherung und Leitungsführung müssen für fachgerechte Diagnose zugänglich bleiben.

## Elektrischer Anschluss

Alle Anschlussarbeiten im spannungsfreien Zustand ausführen. Anschlussplan, Klemmenbeschriftung und Gerätestand haben Vorrang vor allgemeinen Farbangaben.

Anschluss | Funktion | 
 Sensoreingänge | bis zu drei AutoSense-Sensoren | 
 IGN | automatische Aktivierung/Deaktivierung über Zündung beziehungsweise manuelle Steuerung über Schalter | 
 NC und COM | Öffnerkontakt in Reihe zum Eingang einer kompatiblen Alarmanlage | 
 NO und COM | Schließerkontakt parallel zum Alarmkontakt einer kompatiblen Alarmanlage | 
 Sirenenanschluss | optionale externe Sirene nach produktspezifischem Anschlussplan | 
 externe LED | optionale Betriebsanzeige Art. 100034 | 

Bei älteren Sensorleitungen dokumentiert die Hersteller-FAQ abweichende Kabelfarben:

Signal | Aktuelle Kabelfarbe | Ältere Kabelfarbe | 
 GND | weiß | schwarz | 
 Ub | braun | braun | 
 Sensorsignal | grün | blau | 

Farben niemals allein als Anschlussfreigabe verwenden. Klemmenbezeichnung, Durchgang und konkreten Anschlussplan kontrollieren.

## Zündungsanschluss und Betriebsfreigabe

Die vom Handbuch empfohlene Anschlussvariante nutzt IGN zur automatischen Steuerung:

Fahrzeugzustand | G.A.S.-pro | 
 Zündung aus | aktiv | 
 Zündung ein | inaktiv | 

Alternativ kann +12 V über einen Schalter an IGN gelegt werden. Eine Deaktivierung während der Fahrt darf nicht mit einer Störung verwechselt werden. Nach jeder erneuten Aktivierung die Vorheizphase und anschließend die periodisch blinkende Betriebsanzeige abwarten.

## Inbetriebnahme und Vorheizphase

Montage, Sensorbestückung, Klemmenpositionen, Versorgung und Absicherung prüfen.

Anlage einschalten.

Drei Pieptöne bestätigen den Start; die Betriebsanzeige leuchtet zunächst dauerhaft.

Etwa vier Minuten Vorheizphase abwarten.

Erst wenn die Betriebsanzeige periodisch blinkt, ist die Gasdetektion betriebsbereit.

Nach der Installation jeden angeschlossenen KO-/Flaschengassensor kontrolliert testen.

Das Handbuch nennt keine belastbare Farbzuordnung für die Betriebsanzeige. Für die Diagnose deshalb „dauerhaft“ und „periodisch blinkend“ verwenden und keine LED-Farbe aus einem anderen G.A.S.-pro-Modell übertragen.

## Alarmablauf

Ereignis | Dokumentierter Alarmablauf | 
 Propan, Butan oder KO-/Narkosegas | integrierter Pieper und vorhandene externe Sirene etwa 30 Sekunden; danach 30 Sekunden Pause; Wiederholung, solange weiterhin Gas vorhanden ist | 
 Kohlenmonoxid | Handbuch dokumentiert für die externe Sirene 10 Sekunden; konkrete Anzeige und weitere Alarmwege hängen von Gerätestand und Konfiguration ab | 
 Sensorfehler oder Kabeldefekt | unterbrochener Piepton bis zur Behebung | 

Die 10-Sekunden-Angabe für CO nicht auf G.A.S.-pro III oder andere Alarmgeber übertragen. Ausgangslogik und Signaldauer sind produktspezifisch.

## Verhalten bei Gas- oder CO-Alarm

Alarm ernst nehmen und alle Personen sowie Tiere unverzüglich ins Freie bringen.

Bei CO-Verdacht keine Zeit mit der Suche nach der Quelle verlieren; Beschwerden können medizinische Notfälle sein.

Nicht rauchen und keine elektrischen Schalter, Stecker oder möglichen Zündquellen betätigen.

Gaszufuhr nur schließen, wenn dies ohne Eigengefährdung möglich ist.

Türen und Fenster aus sicherer Position öffnen und das Fahrzeug gründlich lüften.

Bei Beschwerden, hoher Konzentration oder unklarer Lage Notruf beziehungsweise zuständige Einsatzkräfte verständigen.

Fahrzeug und Gasgeräte erst wieder nutzen, wenn die Ursache fachgerecht geklärt und die Atmosphäre sicher ist.

Das Verstummen eines Alarmgebers bestätigt keine sichere Atmosphäre und beseitigt keine Gasquelle.

## Sicherer Funktionstest

Das G.A.S.-pro-Handbuch verlangt nach der Installation einen Test jedes angeschlossenen KO-/Flaschengassensors:

Anlage einschalten und die vollständige Vorheizphase abwarten.

Erst bei periodisch blinkender Betriebsanzeige testen.

In gut belüfteter Umgebung und fern von Zündquellen eine kurze, kontrollierte Menge Feuerzeuggas ohne offene Flamme an Sensor 1 führen.

Nach einigen Sekunden muss der Alarm einsetzen.

Etwa 30 Sekunden warten, vollständig lüften und den Vorgang nacheinander mit den weiteren KO-/Flaschengassensoren wiederholen.

Keine Flamme an den Sensor halten, keine Propangasflasche, keinen Brennspiritus und kein unkontrolliert freigesetztes Prüfgas verwenden. Bei Unsicherheit den Test durch einen Fachbetrieb durchführen lassen.

Der CO-Sensor reagiert nicht auf Feuerzeuggas. Das Handbuch verlangt dafür keinen separaten Anwender-Test. Eine CO-Prüfung nur mit geeignetem, kontrolliertem Verfahren durch Fachpersonal ausführen; niemals Fahrzeugabgase oder eine offene Verbrennung in den Innenraum leiten.

## Sensorfehler und Signaltöne

Der permanente Selbsttest kann Verdrahtungsfehler, Sensordefekte und bestimmte Software-/Sensorabweichungen melden.

Beobachtung | Einordnung / nächste Maßnahme | 
 Unterbrochener Piepton | Sensorfehler oder Kabeldefekt; Anlage nicht als vollständig betriebsbereit behandeln | 
 Unregelmäßiger ein-, zwei- oder dreifacher Piepton | laut Hersteller-FAQ mögliche Abweichung der Sensorgüte; technischen Support mit Geräte- und Sensordaten kontaktieren | 
 Ununterbrochenes Piepen direkt nach Installation | häufig Sensorleitungen um eine Klemmenposition in Richtung IGN versetzt | 
 Kein Alarm beim Funktionstest | Verdrahtung, Sensorzuordnung, Vorheizstatus und Testdurchführung prüfen | 
 Alarm direkt nach erster Vorheizphase | Sensor möglicherweise durch falsche Lagerung oder Kontamination belastet; Herstellerablauf beachten und bei Wiederholung Support kontaktieren | 

Die Zahl der Pieptöne ist in den ausgewerteten Herstellerquellen keine gesicherte Zuordnung zu Sensorplatz 1, 2 oder 3 . Eine solche Platzdiagnose daher nicht ausgeben.

## Sichere Störungsbeseitigung

Alarm- und Fehlerbild dokumentieren: Anzeige, Tonfolge, Zeitpunkt und angeschlossene Sensoren.

Anlage spannungsfrei schalten.

Klemmenpositionen anhand des Anschlussplans prüfen; insbesondere den Übergang zwischen IGN und erstem Sensoranschluss kontrollieren.

Aderendhülsen, Zugentlastung, Leitungsbruch und sämtliche Verlängerungsstellen prüfen.

Sensortypen, Seriennummern und bei CO-Sensoren den erforderlichen Softwarestand abgleichen.

Nach Korrektur Versorgung herstellen und vollständige Vorheizphase abwarten.

Bleibt der Fehler bestehen, Anlage nicht als Schutzsystem freigeben und Fachhändler oder THITRONIK-Support kontaktieren.

Keine Sicherung überbrücken, keine Klemmen unter Spannung umstecken und keine Sensoreingänge mit Fremdspannung beaufschlagen. Weitere Abläufe stehen unter Störungsbeseitigung — Sichere Diagnose häufiger Probleme .

## CO-Sensor Art. 100433 und Softwarestand

Der externe CO-Sensor — Kohlenmonoxid-Zusatzsensor ergänzt eine kompatible G.A.S.-pro um CO-Erkennung. Für den Sensortyp SNO433-003 gilt:

G.A.S.-pro-Serienstand | Erforderliche Maßnahme | 
 ab 0001-003 | Software 1.04i laut CO-Sensor-Unterlage automatisch vorhanden | 
 SN40-XXX | Hauptgerät zum Softwareupdate einsenden | 
 SN0001-001 | Hauptgerät zum Softwareupdate einsenden | 
 SN0001-002 | Hauptgerät zum Softwareupdate einsenden | 

Vor dem Anklemmen Aderendhülsen verwenden, den freien Sensoreingang und die zulässige Gesamtbestückung prüfen. Seriennummern-Präfixe nicht als Artikelnummer behandeln.

## Zubehör

Art.-Nr. | Produkt | Einsatzhinweis | 
 100456 | Zusatzsensor G.A.S.-pro | Propan, Butan und KO-/Narkosegase | 
 100433 | CO-Sensor | Kompatibilität und Softwarestand prüfen | 
 100190 | Zusatzsirene | Hörbarkeit erhöhen; ohne eigenen Akku | 
 100034 | externe Betriebsanzeige | bei verdecktem Einbau der Zentrale | 
 100089 | Back-up Sirene 12 V | produktspezifische Anschlussfreigabe prüfen | 

Nur Originalzubehör beziehungsweise ausdrücklich freigegebene Komponenten verwenden. Die Hauptgeräte-Artikelnummer der vorhandenen G.A.S.-pro nicht aus Zubehörnummern oder Seriennummern ableiten; siehe Artikelnummern-Register — Produkte und Zubehör und Sirenen und Hupen — Akustische Alarmmittel .

## Unterschiede zur G.A.S.-pro III

Merkmal | G.A.S.-pro | G.A.S.-pro III | 
 Produktgeneration | ältere Serie | neue Generation | 
 Sensor in der Zentrale | nein | variantenabhängig integriert | 
 Externe Sensorkapazität | bis zu drei Sensoren | produktspezifischer externer Sensoreingang | 
 Alarmanlagen-Einbindung | kabelgebundene NC -/ NO -Kontakte | produktspezifische Funk- und Kabelschnittstellen | 
 Aderendhülsen am externen Sensor | verwenden | nicht verwenden; Leitungsenden nicht verzinnen | 
 CO-Erkennung | optionaler externer CO-Sensor | G.A.S.-pro III CO oder kompatibler externer CO-Sensor, abhängig von Ausführung | 
 Integrierter akustischer Alarm | ja | ja | 

Anschlussplan, Sensorregeln, Alarmzeiten, LED-Zustände und Testverfahren niemals zwischen den Generationen übertragen.

## Angaben für den Supportfall

Angabe | Beispiel / Fundstelle | 
 Produktbezeichnung | G.A.S.-pro, nicht G.A.S.-pro III | 
 vollständige Hauptgeräte-Seriennummer | Typenschild | 
 Softwarestand | Anzeige, Aufkleber oder Supportauskunft | 
 Sensoren | Art, Artikelnummer, vollständige Seriennummer und verwendeter Eingang | 
 CO-Sensortyp | insbesondere SNO433-003 | 
 Versorgung | gemessene Spannung bei Zündung ein und aus | 
 Betriebsanzeige | dauerhaft oder blinkend; Zeitpunkt nach dem Einschalten | 
 Tonsignal | kontinuierlich, unterbrochen oder Anzahl der unregelmäßigen Pieptöne | 
 Verdrahtung | Fotos von Klemmen, Aderendhülsen und Kabelfarben | 
 Einbauort | Sensorhöhe und Abstände zu Schlafplatz, Heizung und Batterie | 
 Leitungsverlängerung | Gesamtlänge, Querschnitt und Verbindungsstellen | 
 Bereits geprüft | konkrete spannungsfreie Prüfschritte | 

## Querverweise

G.A.S.-pro III — Gaswarner für Freizeitfahrzeuge 

CO-Sensor — Kohlenmonoxid-Zusatzsensor 

G.A.S.-connect — Funk-Gaswarner für WiPro III 

G.A.S.-plug „all in one" — Mobiler Gaswarner 

WiPro III — Funk-Alarmsystem für Freizeitfahrzeuge 

Störungsbeseitigung — Sichere Diagnose häufiger Probleme 

Artikelnummern-Register — Produkte und Zubehör 

Sirenen und Hupen — Akustische Alarmmittel 

Systemüberblick — THITRONIK-Produktwelt 

Glossar — Fachbegriffe im THITRONIK-System
