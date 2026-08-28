# VW T5 Facelift (ab MJ 2010)

Route: /de/fahrzeuge/vw-t5-facelift | Stand: 2026-07-22 | Sichtbarkeit: standard
Quelle: Thitronik Online/project-data/runtime/wiki/wiki-articles/de/fahrzeuge/vw-t5-facelift.json

---
VW T5 Facelift (ab MJ 2010)

Diese Seite beschreibt den Einbau einer WiPro III in den VW T5 Facelift ab Modelljahr 2010. Maßgeblich ist das neunseitige fahrzeugspezifische Einbauhandbuch Stand 12/20 ; das allgemeine WiPro-III-Installationshandbuch Revision 1.8 ergänzt Sicherheit und die Pinbelegung des 20-poligen Kabelsatzes.

Abgrenzung: Für den T5 der Baujahre 2006–2009 gilt VW T5 (2006–2009) . Modelljahr, Einbauort, Leitungsfarben und Signale müssen gemeinsam zur hier beschriebenen Facelift-Ausführung passen.

## Überblick

Parameter | Verifizierter Stand | 
 Fahrzeug | VW T5 Facelift | 
 Modelljahr | ab 2010 | 
 System | WiPro III | 
 DIP → ON | SW1 + SW4 + SW6 | 
 CAN-Anschluss | orange/braun und orange/grün im Leitungsbereich hinter dem Handschuhfach | 
 Bedienung | Fahrzeugfunkschlüssel; Funk-Zubehör zusätzlich anlernbar | 
 Akustischer Alarmgeber | normale oder Back-up Sirene dringend empfohlen; Fahrzeughupe ohne Zündung inaktiv | 
 Mindestseriennummer / Software | in den Primärquellen nicht genannt | 
 Alarmdauer | akustisch ca. 30 Sekunden , optisch ca. 180 Sekunden | 

## Quellenumfang und Freigabegrenzen

Thema | Freigegebene Aussage | 
 Fahrzeugprofil | ausschließlich T5 Facelift ab Modelljahr 2010 mit SW1 + SW4 + SW6 | 
 Leitungsabgriff | Einbauposition, Fahrzeugfarbe und gemessenes Signal gemeinsam identifizieren | 
 Spannungsversorgung | Batterieanschluss nach Fahrzeuganleitung; WiPro-Pins 1 , 7 und 11 nach allgemeinem Handbuch | 
 Sirene | normale Sirene oder Back-up Sirene nach dem fahrzeugspezifischen Schaltbild | 
 Serien-/Softwaregrenze | 0823-001 / 2.1 ist nicht belegt und wird nicht als Mindeststand fortgeführt | 
 Abweichendes Fahrzeug | Arbeiten stoppen und aktuelle Freigabe bei THITRONIK beziehungsweise Fahrzeughersteller einholen | 

Modell und Modelljahr anhand der Fahrzeugunterlagen bestätigen.

Facelift-Ausführung vom T5 der Baujahre 2006–2009 abgrenzen.

Artikelnummer , Seriennummer und Software der WiPro dokumentieren.

Leitungsfarben und Einbausituation mit der Anleitung vergleichen.

Bei Abweichungen keine Werte aus dieser Seite übertragen.

## Sicherheit und Vorbereitung

Das Fahrzeughandbuch richtet sich an professionelle Servicebetriebe. Unsachgemäße Arbeiten an Fahrzeugelektrik, Airbag-Bereich oder Verkleidung können Personen und Verkehrssicherheit gefährden.

Arbeiten nur durch eine qualifizierte Fachkraft ausführen lassen.

Batterie nach Fahrzeugherstellervorgabe trennen; Radiocode und flüchtige Daten beachten.

DIP-Schalter ausschließlich spannungsfrei ändern.

Ungenutzte Ein- und Ausgänge einzeln isolieren.

Leitungen gegen Scheuern, Zug, Hitze und Feuchtigkeit sichern.

Pedale, Lenkung, Airbags und bewegte Teile freihalten.

Funk-Zubehör vor der endgültigen Montage anlernen.

## DIP-Profil einstellen

Spannungsversorgung der WiPro vollständig entfernen.

Gehäuse öffnen und den achtfachen Codierschalter zugänglich machen.

SW1 , SW4 und SW6 auf ON stellen.

Alle anderen Schalter in der in der Fahrzeuganleitung dargestellten Grundstellung belassen.

Schalterstellung fotografieren oder dokumentieren.

Gehäuse schließen und erst danach mit dem Anschluss fortfahren.

## Handschuhfach ausbauen und Zentrale montieren

Fünf Schrauben entfernen: je eine an beiden Seiten, zwei innen an der Front und eine hinten mittig.

Handschuhfach vorsichtig anheben.

Vorhandenen AUX-Eingang oder eine iPod-Schnittstelle hinten ausstecken.

Vordere Abdeckung beziehungsweise das Gehäuse lösen.

Handschuhfach entnehmen, ohne Leitungen oder Clips zu belasten.

WiPro III vor dem Handschuhfach unterhalb des Lüftungskanals trocken und servicezugänglich mit geeignetem doppelseitigem Klebeband befestigen.

Einen optionalen Pro-Finder bei Bedarf am selben geschützten Montagebereich befestigen.

## Fahrzeuganschlüsse

Die Fahrzeuganleitung nennt keine Stecker- oder Fahrzeug-Pinnummern. Deshalb sind Einbauposition, Leitungsfarbe und gemessenes Signal gemeinsam zu prüfen; eine Leitung niemals nur aufgrund ihrer Farbe anschließen.

Fahrzeugleitung | WiPro-Leitung / Pin | Funktion | 
 orange/braun | violett/orange, Pin 18 | CAN-Low | 
 orange/grün | weiß/orange, Pin 17 | CAN-High | 
 schwarz/gelb | gelb, Pin 7 | Zündung, Klemme 15 | 
 weiß/grün, dünn, kräftig grüne Markierung | rot/pink, Pin 6 | Smart-Blinker / Warnblinker | 

CAN-Leitungspaar im dargestellten Leitungsbereich hinter dem Handschuhfach lokalisieren.

Orange/braun messen und mit violett/orange Pin 18 verbinden.

Orange/grün messen und mit weiß/orange Pin 17 verbinden.

Schwarz/gelb als Klemme 15 prüfen und mit gelb Pin 7 verbinden.

Dünnen Kabelbaum in Richtung Warnblinkschalter identifizieren.

Dünne weiß/grüne Leitung mit kräftig grüner Markierung prüfen und mit rot/pink Pin 6 verbinden.

Verbindungen fachgerecht crimpen, isolieren und zugentlasten.

## Versorgung, Kabeldurchführung und Sirene

Da die Fahrzeughupe ohne Zündung inaktiv ist und dann nicht angesteuert werden kann, empfiehlt die Fahrzeuganleitung dringend eine normale oder eine Back-up Sirene.

Bauteil | Anschluss | 
 WiPro-Masse | schwarz Pin 1 an Batterie-Minus / zuverlässige Fahrzeugmasse | 
 WiPro- Dauerplus | rot Pin 11 über Sicherungshalter an Batterie-Plus | 
 normale Sirene | WiPro weiß Pin 15 an Sirene rot; WiPro weiß/schwarz Pin 16 an Sirene schwarz | 
 Back-up Sirene Versorgung | rot dauerhaft an +12 V , schwarz an Masse | 
 Back-up Sirene Trigger | weiß an WiPro weiß Pin 15 ; blau nicht verwenden und isolieren | 

Rote Leitung Pin 11 und schwarze Leitung Pin 1 in den Motorraum verlängern.

Rechts unterhalb des Handschuhfachs den Durchführungsstopfen zum Wischergestängekasten nutzen.

Vom Motorraum aus die herausnehmbare Metallabdeckung unterhalb der oberen Gummilippe zur Motorhaube öffnen.

Leitungen scheuerfrei durchführen und die Durchführung wieder sicher abdichten.

Dauerplus über einen zugänglichen Sicherungshalter an Batterie-Plus anschließen; Sicherungswert nach dem allgemeinen Handbuch auslegen.

Masse niederohmig und mechanisch belastbar herstellen.

Normale Sirene nach der Pin- 15 / 16 -Variante anschließen oder die Back-up Sirene dauerhaft versorgen und ihre weiße Triggerleitung an Pin 15 anschließen.

Blaue Leitung der Back-up Sirene einzeln isolieren.

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

Nicht unter 15 °C verkleben und etwa 24 Stunden bis zur Endfestigkeit warten.

Bei ungeeigneter Klebefläche die vorgesehenen Schraubmarkierungen verwenden.

Bei großen Abständen Adapter 100428 oder 100729 einsetzen.

Jeden Kontakt nach der Montage bei geschlossener und geöffneter Öffnung testen.

Siehe Funk-Magnetkontakt 868 — Montage und Betrieb und Funk-Kabelschleife 868 — Außensicherung für mobile Güter .

## Inbetriebnahme und vollständiger Funktionstest

DIP-Stellung SW1 + SW4 + SW6 nochmals prüfen.

Alle Crimpverbindungen, Isolierungen, Zugentlastungen und die Sicherung kontrollieren.

Versorgung herstellen und auf den Einschalt-Piepton achten.

Zündung ausschalten; bei eingeschalteter Zündung ist die Anlage deaktiviert.

Alle Fahrerhaustüren schließen. Bei geöffneter Fahrerhaustür verriegelt das Fahrzeug nicht und die Anlage wird nicht aktiviert.

Fahrzeug mit der Verriegeln-Taste des Funkschlüssels verschließen und die Anlage scharfschalten.

Einen Quittierton, Blinken der Fahrtrichtungsanzeiger und blinkende Status-LED prüfen.

Falls die Anlage zunächst nicht reagiert, mehrfach verriegeln und entriegeln, damit sich die CAN-Daten synchronisieren.

Alle vom Fahrzeug und durch Funk-Zubehör überwachten Öffnungen einzeln auslösen.

Normale oder Back-up Sirene mit einem realen Alarm prüfen.

Akustische Alarmdauer von ca. 30 Sekunden und optische Alarmdauer von ca. 180 Sekunden prüfen.

Mit der Entriegeln-Taste entschärfen beziehungsweise den Alarm unterbrechen.

## Bedienung und Rückmeldungen

Verriegeln schärft das System; die Zentrale bestätigt mit Piepton und Blinken, die Status-LED blinkt.

Entriegeln entschärft das System beziehungsweise unterbricht einen Alarm.

Eine offene Fahrerhaustür verhindert fahrzeugseitig das Verriegeln und damit die Aktivierung der Alarmanlage.

Mehrere kurze Pieptöne beim Scharfschalten bedeuten, dass ein angelernter Funk- Magnetkontakt offen ist; die Anlage schaltet laut Quelle dennoch scharf.

Nach dem Einbau können mehrere Verriegelungs- und Entriegelungsvorgänge zur CAN-Synchronisierung erforderlich sein.

## Diagnose

Fehlerbild | Prüfung / Maßnahme | 
 Einschalt-Piepton vorhanden, aber keine Reaktion auf Funkschlüssel | CAN-Leitungen weiß/orange und violett/orange prüfen; Diagnosemodus aktivieren | 
 grüne linke LED flackert im Diagnosemodus | CAN-Datenverkehr ist vorhanden | 
 grüne linke LED bleibt bei Bedienung dunkel | Bus inaktiv oder CAN-Verbindung fehlerhaft | 
 weder Reaktion noch Einschalt-Piepton | Versorgung, Crimpung, Zündungszustand und Sicherung prüfen | 
 Kontaktwarnung trotz geschlossener Öffnungen | Abstand zwischen Sender und Magnet prüfen; alle Kontakte mehrfach öffnen und schließen | 
 Kontaktwarnung bleibt bestehen | bei geschlossenen Kontakten Versorgung trennen und wiederherstellen | 
 Zubehör lässt sich anlernen, löst aber keinen Alarm aus | Platine prüfen; Sende-LED muss vom Magneten wegweisen | 

Für den CAN-Diagnosemodus den Taster auf der Platine kurz drücken. Bedienung des Funkschlüssels oder anderer CAN-Datenverkehr muss die grüne linke LED flackern lassen. Weitere systematische Prüfungen: Störungsbeseitigung — Sichere Diagnose häufiger Probleme .

## Dokumentation

Fahrzeugmodell, Modelljahr und VIN erfassen.

WiPro-Artikelnummer, Seriennummer und Softwarestand notieren.

DIP-Stellung SW1 + SW4 + SW6 dokumentieren.

Leitungsfarben und tatsächliche Abgriffstellen fotografieren.

Sicherungswert, Massepunkt, Kabeldurchführung und Sirenenvariante festhalten.

Alle überwachten Öffnungen und Funkkontakte einzeln protokollieren.

Alarmzeiten, Diagnoseanzeige und Kundenübergabe dokumentieren.

## Quellen

H:/Thitronik WIKI (ml)/wiki/de/wipro_iii_vw_t5_facelift_2009_.pdf — fahrzeugspezifisches Einbauhandbuch, Stand 12/20 ; alle neun Seiten vollständig textlich und visuell geprüft.

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

VW T5 (2006–2009) 

VW T6 (2015–2019)
