# NFC Modul — Steuerung der WiPro via NFC

Route: /de/nfc-modul | Stand: 2026-07-16 | Sichtbarkeit: standard
Quelle: Thitronik Online/project-data/runtime/wiki/wiki-articles/de/nfc-modul.json

---
NFC Modul — Steuerung der WiPro via NFC

Art.-Nr. 105299 

Das NFC Modul ist die batteriebetriebene Lesestelle am Fahrzeug für KeyCard , KeyTag und KeyStrap . Es überträgt eine berechtigte NFC-Auslösung per 868-MHz-Funk an eine kompatible THITRONIK® Alarmanlage. Bei einer geeigneten WiPro III safe.lock und passender Fahrzeuganbindung kann es zusätzlich die Zentralverriegelung bedienen.

Abgrenzung: Das NFC Modul ist weder das persönliche Zugangsmedium noch eine Smartphone-Funktion. KeyCard, KeyTag und KeyStrap funktionieren als Zugangsmedien nur zusammen mit dem Modul.

## Technische Daten

Parameter | Dokumentierter Wert | 
 Artikelnummer | 105299 | 
 NFC-Kommunikation | DESFire® EV2, ISO 14443-A, 13,56 MHz | 
 Sendefrequenz zur Alarmzentrale | 868,35 MHz | 
 Funkreichweite im Freifeld | bis zu 75 m zwischen NFC Modul und Alarmzentrale | 
 Spannungsversorgung | 3× Alkaline AAA (LR03), je 1,5 V; zusammen 4,5 V | 
 Batterielebensdauer | bis zu 1 Jahr | 
 Betriebstemperatur | –10 °C bis +70 °C | 
 Abmessungen Ø × T | 89 × 19,5 mm | 
 Gewicht | 100 g | 
 speicherbare NFC-Medien | maximal 14 insgesamt | 

Die Freifeldreichweite ist kein garantierter Wert im Fahrzeug. Metallflächen, Scheibenbeschichtungen, Einbauort, Abschirmung und andere Funkquellen können die Verbindung zur Alarmzentrale verkürzen.

## Schnellcheck

Prüfen, dass NFC Modul, Art. 105299 und drei Alkaline-AAA-Batterien (LR03) eingesetzt sind.

Das NFC Modul nicht als erste Funk-Komponente an der WiPro anlernen; zuerst einen Funk-Handsender 868 als Master- Handsender speichern.

Vor der endgültigen Montage das Modul an der Alarmanlage anlernen und Reichweite sowie Funktionen am vorgesehenen Einbauort testen.

Beim Anlernen des Moduls an die WiPro und beim Anlernen weiterer NFC-Medien die zwei getrennten Speicher beachten.

Für den regulären Zugang bevorzugt THITRONIK® Originaltags verwenden; ein einmaliges blaues Blinken kennzeichnet einen angelernten, aber nicht kopiergeschützten Fremdtag.

Einen vollständigen Tag-Reset nur bewusst ausführen: Er löscht alle im NFC Modul gespeicherten Medien.

Scharf-/Unscharfschalten und Ver-/Entriegeln getrennt testen.

Einen unabhängigen Backup-Zugang bereithalten, beispielsweise den Funk-Handsender 868.

## Produktrolle und Funktionsgrenzen

Das NFC Modul nutzt zwei Funkebenen:

Das persönliche Medium kommuniziert im NFC-Nahbereich bei 13,56 MHz mit dem Modul.

Das Modul sendet den Bedienbefehl bei 868,35 MHz an die Alarmzentrale.

Funktion | Voraussetzung / Einordnung | 
 Alarmanlage scharf- und unscharfschalten | kompatible Alarmanlage, an der Zentrale angelerntes NFC Modul und im Modul gespeichertes NFC-Medium | 
 Fahrzeug ver- und entriegeln | kompatible WiPro III safe.lock , unterstützte Fahrzeuganbindung und geeigneter Softwarestand | 
 Bedienung ohne Smartphone | möglich; das NFC-Medium löst direkt am Modul aus | 
 Bedienung aus größerer Entfernung | nicht möglich; das Medium muss in den NFC-Nahbereich des Moduls gehalten werden | 

Scharfschalten/Unscharfschalten und Verriegeln/Entriegeln sind getrennte Funktionen. Eine erfolgreiche NFC-Erkennung bestätigt nicht automatisch, dass die Zentralverriegelung des konkreten Fahrzeugs angesteuert werden kann.

## Kompatibilität

Die technischen Produktunterlagen nennen folgende Alarmanlagen:

Anlage | Dokumentierte Grundfunktion | 
 WiPro III | Scharf-/Unscharfschalten | 
 WiPro III safe.lock | Scharf-/Unscharfschalten; Zentralverriegelung nur mit passender Fahrzeuganbindung | 
 WiPro easy | NFC-Bedienung gemäß Anlagenkonfiguration | 
 C.A.S. III | in den technischen Kompatibilitätsangaben aufgeführt; konkreten Funktionsumfang vorab prüfen | 

Für eine verbindliche Aussage müssen Anlagenvariante, Fahrzeugprofil, Anschluss und Softwarestand gemeinsam geprüft werden. Insbesondere die Türsteuerung ist fahrzeugabhängig; eine bloße Produktbezeichnung oder ein sichtbares Bedienelement reicht nicht als Freigabe. Siehe Fahrzeugkompatibilität — Übersichtsmatrix & DIP-Grundlagen .

## Zwei getrennte Speicher

Speicher | Gespeicherter Inhalt | Grenze | Betroffener Löschvorgang | 
 Senderspeicher der WiPro | das NFC Modul als 868-MHz-Funk-Komponente | gemeinsam mit anderem Funk-Zubehör höchstens 100 Sender | Teil- oder Gesamtlöschung an der WiPro | 
 Tag-Speicher des NFC Moduls | KeyCard, KeyTag, KeyStrap oder kompatibler Fremdtag | höchstens 14 NFC-Medien insgesamt | vollständiger Tag-Reset am NFC Modul | 

Das Löschen des Tag-Speichers ist nicht mit dem Löschen des WiPro-Senderspeichers gleichzusetzen. Ein Batteriewechsel löscht weder die angelernten NFC-Medien noch die Zuordnung des Moduls zur WiPro.

Wichtig nach einem Gesamtlöschen der WiPro: Zuerst einen Funk-Handsender 868 anlernen. Dieser wird zum neuen Master-Handsender. Das NFC Modul darf nicht die erste neu angelernte Funk-Komponente sein; siehe Anlernvorgang — Funk-Zubehör an WiPro III anlernen .

## NFC-Medien und Zubehör

Medium | Art.-Nr. | Bauform | Dokumentierte NFC-Reichweite | Sicherheit | 
 KeyCard | 105300 | Transponderkarte | ca. 25 mm | THITRONIK® Originaltag mit DESFire®-Kopierschutz | 
 KeyTag | 105301 | robuster, wasserdichter Anhänger | ca. 20 mm | THITRONIK® Originaltag mit DESFire®-Kopierschutz | 
 KeyStrap | 105302 , 105464 – 105470 | wasserdichtes Armband | maximal 15 mm | THITRONIK® Originaltag mit DESFire®-Kopierschutz | 
 kompatibler Fremdtag | keine THITRONIK® Art.-Nr. | abhängig vom Medium | abhängig von Tag und Montage | kann anlernbar, aber grundsätzlich kopierbar sein | 

### KeyStrap-Varianten

Größe M: 105302 schwarz, 105464 weiß, 105466 blau, 105465 rot; maximaler Handgelenkumfang 216 mm.

Größe L: 105467 schwarz, 105468 weiß, 105470 blau, 105469 rot; dokumentierter maximaler Handgelenkumfang 232 mm.

KeyStrap ist für einwandige Fenster beziehungsweise Scheiben bis maximal 15 mm Stärke vorgesehen.

Reichweiten sind Näherungswerte. Scheibenmaterial, Scheibendicke, Montageposition, Ausrichtung und das konkrete Medium beeinflussen die Erkennung.

## Lieferumfang

NFC Modul

THITRONIK® KeyCard

Klebepad

3× Alkaline-AAA-Batterien (LR03)

Kurzanleitung

Zusätzliche KeyCards, KeyTags und KeyStraps sind separates Zubehör. Artikelnummern und Varianten stehen auch im Artikelnummern-Register — Produkte und Zubehör .

## NFC Modul an der Alarmanlage anlernen

Das Modul zunächst provisorisch am geplanten Montageort betreiben. Der dokumentierte Grundablauf ist:

Sicherstellen, dass bereits ein Funk-Handsender 868 als Master-Handsender an der WiPro gespeichert ist.

Batteriesicherung am NFC Modul entfernen.

Anlernmodus der kompatiblen Alarmzentrale starten. Je nach Systemstand ist dies direkt an der Zentrale, über Easy-Add oder über die THITRONIK® App möglich.

Das NFC Modul mit der mitgelieferten KeyCard auslösen.

Akustische Bestätigung der Alarmzentrale abwarten.

Anlernmodus der Alarmzentrale ordnungsgemäß beenden.

Scharf-/Unscharfschalten und, falls vorgesehen, Ver-/Entriegeln getrennt testen.

Erst nach erfolgreichem Test die endgültige Montage ausführen.

Die App-Bezeichnungen und die Verfügbarkeit von Easy-Add 3.0 hängen von Anlage, Zubehör und Softwarestand ab. Die vollständigen Wege zum Starten und Beenden des WiPro-Anlernmodus stehen unter Anlernvorgang — Funk-Zubehör an WiPro III anlernen .

## Montage

Das NFC Modul im trockenen Fahrzeuginnenraum an der Innenseite einer geeigneten Scheibe montieren.

Eine gut erreichbare Position wählen, an der das NFC-Medium von außen unmittelbar vor die Lesestelle gehalten werden kann.

Montagefläche reinigen und das Modul mit dem vorgesehenen Klebepad befestigen.

Das Gehäuse für Batteriewechsel, Tag-Anlernen und Reset zugänglich lassen.

Vor dem Kleben NFC-Erkennung und 868-MHz-Verbindung am geplanten Ort testen.

Dicke, mehrwandige oder metallbedampfte Scheiben können die Erkennung beeinträchtigen.

Bei beheizbaren Frontscheiben ist mit höherem Stromverbrauch und kürzerer Batterielebensdauer zu rechnen.

Keine Reichweitenzusage: Die für KeyCard, KeyTag und KeyStrap genannten Werte sowie die 75-m-Freifeldangabe sind Prüf- beziehungsweise Orientierungswerte und keine Garantie am konkreten Fahrzeug.

## Bedienung im Normalbetrieb

Berechtigtes NFC-Medium unmittelbar vor die außenliegende Position des Moduls halten.

LED-Bestätigung abwarten und Medium wieder entfernen.

Tatsächlichen Alarm- und Verriegelungszustand am Fahrzeug kontrollieren.

Nach einer Tag-Erkennung wartet das NFC Modul etwa 2 Sekunden , bevor eine erneute Auslösung möglich ist. Dadurch soll ein kurzes Vorhalten nicht unmittelbar zwei gegensätzliche Schaltbefehle auslösen.

LED-Reaktion | Bedeutung im Normalbetrieb | 
 blau blinkt 2× | angelernter THITRONIK® Originaltag erkannt; Bedienbefehl wird ausgelöst | 
 blau blinkt 1× | angelernter Fremdtag erkannt; Bedienbefehl wird ausgelöst, Medium ist jedoch nicht kopiergeschützt | 
 rot blinkt kurz schnell | erkanntes NFC-Medium ist nicht angelernt | 
 blau blitzt 1× | Feldänderung erkannt, aber kein NFC-Medium gefunden | 
 rot leuchtet 20 Sekunden | Batterien leer beziehungsweise zu schwach; alle drei Batterien wechseln | 

## Weitere NFC-Medien anlernen

Gehäuse des NFC Moduls durch Drehen öffnen.

Den schmalen schwarzen Taster mindestens 3 Sekunden gedrückt halten, bis die blaue LED dauerhaft leuchtet.

Das neue NFC-Medium einzeln an die Lesestelle halten.

LED-Bestätigung abwarten und anhand der folgenden Tabelle bewerten.

Weitere Medien nacheinander auf dieselbe Weise anlernen.

Zum Beenden den Taster kurz drücken; die blaue LED erlischt.

Gehäuse schließen und jedes neu gespeicherte Medium kontrolliert testen.

LED-Reaktion im Anlernmodus | Bedeutung | 
 blau leuchtet dauerhaft | Anlernmodus aktiv | 
 blau blinkt 2× | THITRONIK® Originaltag erfolgreich angelernt | 
 blau blinkt 1× | kompatibler Fremdtag angelernt; kein Kopierschutz | 
 rot blinkt kurz schnell | Fremdtag erkannt, aber nicht anlernbar | 
 rot blinkt dauerhaft | Speicher voll; kein weiteres Medium kann gespeichert werden | 

Insgesamt können höchstens 14 NFC-Medien gespeichert werden. Die mitgelieferte KeyCard zählt mit; bei belegtem Speicher muss vor dem Anlernen eines neuen Mediums ein vollständiger Tag-Reset erfolgen.

## Alle NFC-Medien löschen

Einzelne gespeicherte Medien können am NFC Modul nicht selektiv gelöscht werden. Bei verlorenem, unbekanntem oder nicht mehr berechtigtem Medium müssen alle Tags gelöscht und die weiterhin benötigten Medien neu angelernt werden.

Gehäuse öffnen.

Taster mindestens 10 Sekunden gedrückt halten, bis die blaue LED schnell blinkt.

Taster loslassen; alle im NFC Modul gespeicherten Medien sind gelöscht und das Modul befindet sich im Anlernmodus.

Benötigte KeyCards, KeyTags und KeyStraps anschließend einzeln neu anlernen.

Alle neu angelernten Medien kontrolliert testen und das Gehäuse wieder schließen.

Speichergrenze beachten: Dieser Ablauf löscht den Tag-Speicher des NFC Moduls. Er ersetzt weder das Löschen noch das erneute Anlernen des Moduls im Senderspeicher der WiPro.

## Batterien wechseln

Ausschließlich 3× Alkaline AAA (LR03), je 1,5 V verwenden.

Keine Akkus und keine Lithium-Primärzellen einsetzen.

Alle drei Batterien gemeinsam ersetzen und auf richtige Polung achten.

Wechsel mindestens jährlich einplanen, vorzugsweise vor dem Winter; beheizbare Scheiben und ungünstige Temperaturen können einen früheren Wechsel erforderlich machen.

Nach dem Wechsel Gehäuse schließen und das Modul mit einem berechtigten Medium testen.

Verbrauchte Batterien vorschriftsgemäß entsorgen.

Die rote LED leuchtet nach einer Auslösung 20 Sekunden , wenn die Batterien gewechselt werden müssen. Der Speicher ist nicht flüchtig: Nach einem Batteriewechsel ist weder ein erneutes Anlernen der NFC-Medien noch des Moduls an der WiPro erforderlich.

## Sicherheit und Backup-Zugang

THITRONIK® Originaltags verwenden DESFire® EV2 auf Basis von ISO 14443-A mit 128-Bit-Verschlüsselung und Kopierschutz. Angelernte Fremdtags können einen Bedienbefehl auslösen, bieten aber nicht automatisch diesen Schutz.

Für reguläre Zugangsberechtigungen bevorzugt KeyCard, KeyTag oder KeyStrap von THITRONIK® verwenden.

Bei nur einmaligem blauem Blinken das Medium als kopierbaren Fremdtag dokumentieren.

Verlorene Medien nicht lediglich aus einer Liste streichen, sondern vollständigen Tag-Reset durchführen und alle berechtigten Medien neu anlernen.

Vor dem Verlassen des Fahrzeugs prüfen, ob Alarmanlage und Zentralverriegelung den gewünschten Zustand erreicht haben.

Mindestens einen unabhängigen Zugang mitführen, beispielsweise einen Funk-Handsender 868 oder den Originalschlüssel, sofern dessen Nutzung für das Fahrzeugprofil geprüft ist.

Im Campingmodus und bei besonderen Fahrzeugprofilen die fahrzeugspezifischen Hinweise zu Originalschlüssel, Sleep Mode und Zentralverriegelung beachten.

Weitere Zugangs- und Backup-Wege sind unter Zugangsmedien & Bedienung — Zutrittswege im THITRONIK-System eingeordnet.

## Fehler systematisch eingrenzen

Beobachtung | Sichere Prüfung / Maßnahme | 
 keine LED-Reaktion | Batteriesicherung, drei Alkaline-AAA-Batterien, Polung und Batteriezustand prüfen | 
 blau blitzt nur 1× | Medium erneut mittig und näher an die Lesestelle halten; Scheibendicke, Material und Ausrichtung prüfen | 
 rot blinkt kurz schnell im Normalbetrieb | Medium ist nicht angelernt; Berechtigung prüfen und gegebenenfalls im NFC Modul anlernen | 
 Fremdtag lässt sich nicht anlernen | Kompatibilität nicht voraussetzen; THITRONIK® Originaltag verwenden | 
 rot blinkt im Anlernmodus dauerhaft | Tag-Speicher mit 14 Medien belegt; Berechtigungen klären und bei Bedarf vollständigen Reset durchführen | 
 Medium wird erkannt, WiPro reagiert nicht | prüfen, ob das NFC Modul im Senderspeicher der WiPro angelernt ist; 868-MHz-Reichweite und WiPro-Zustand testen | 
 Scharfschalten funktioniert, Verriegeln aber nicht | Funktionen getrennt bewerten; safe.lock-Variante, Fahrzeuganbindung, Fahrzeugprofil und Softwarestand prüfen | 
 rote LED leuchtet 20 Sekunden | alle drei Alkaline-AAA-Batterien wechseln; anschließend Funktionstest durchführen | 
 Reichweite ist am Montageort unzuverlässig | Modul vor endgültigem Kleben versetzen; Scheibenbeschichtung, Metall, Heizung und Funkumgebung prüfen | 

Weitere allgemeine Diagnosewege stehen unter Störungsbeseitigung — Sichere Diagnose häufiger Probleme .

## Angaben für den Support

Für eine technische Bewertung dokumentieren:

Produktbezeichnung und Artikelnummer 105299 

kompatible Alarmanlage, Variante und vollständige Seriennummer 

Fahrzeug, Modelljahr und gewünschte Funktion

Softwarestand, sofern ermittelbar

verwendetes Medium: KeyCard, KeyTag, KeyStrap oder Fremdtag

Artikelnummer des Originalmediums, sofern vorhanden

genaue LED-Farbe, Blinkzahl und Betriebszustand

Anzahl der bereits gespeicherten NFC-Medien

Ergebnis beim Scharf-/Unscharfschalten und beim Ver-/Entriegeln getrennt

Montageort, Scheibenart und ungefähre Scheibendicke

Batterietyp, Alter und Ergebnis nach Batteriewechsel

Ergebnis mit einem zweiten Originaltag und einem unabhängigen Zugangsweg

## Querverweise

WiPro III — Funk-Alarmsystem für Freizeitfahrzeuge 

Anlernvorgang — Funk-Zubehör an WiPro III anlernen 

Funk-Handsender 868 — Fernbedienung für WiPro III 

Zugangsmedien & Bedienung — Zutrittswege im THITRONIK-System 

Fahrzeugkompatibilität — Übersichtsmatrix & DIP-Grundlagen 

Funkstandards & Schnittstellen 

Störungsbeseitigung — Sichere Diagnose häufiger Probleme 

Artikelnummern-Register — Produkte und Zubehör 

Systemüberblick — THITRONIK-Produktwelt
