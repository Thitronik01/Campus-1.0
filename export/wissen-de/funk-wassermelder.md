# Funk-Wassermelder 868 — Kabelloser Wassermelder

Route: /de/funk-wassermelder | Stand: 2026-07-19 | Sichtbarkeit: standard
Quelle: Thitronik Online/project-data/runtime/wiki/wiki-articles/de/funk-wassermelder.json

---
Funk-Wassermelder 868 — Kabelloser Wassermelder

Der Funk-Wassermelder 868 erkennt austretendes Wasser in Campingfahrzeugen und meldet es per Funk an ein kompatibles WiPro III - beziehungsweise WiPro III safe.lock -Alarmsystem. Die Sendeeinheit bleibt im trockenen, gut zugänglichen Bereich; der kabelgebundene Sensor wird dort befestigt, wo Feuchtigkeit frühzeitig erkannt werden soll.

WICHTIG: Der Funk-Wassermelder ist nicht für den eigenständigen Betrieb vorgesehen. Ohne kompatibles und korrekt eingerichtetes Alarmsystem erfolgt keine vollständige Alarmierung.

## Technische Daten

Parameter | Herstellerangabe | 
 Spannungsversorgung | 3 V, 1 × CR2032 | 
 Batterielebensdauer | ca. 2 Jahre | 
 Funkreichweite | ca. 75 m im Freifeld | 
 Sendefrequenz | 868,35 MHz | 
 Sendeleistung | < 10 mW | 
 Abmessungen der Elektroeinheit (B × H × T) | 52 × 35 × 14 mm | 
 Kabellänge zum Sensor | 30 cm | 
 Gewicht | ca. 35,1 g | 
 Gehäuse-Schutzklasse | IP67 | 
 Artikelnummer | 106021 | 

Die Funkreichweite ist ein Freifeldwert. Fahrzeugaufbau, Metallflächen, Einbauort und andere Abschirmungen können die tatsächlich erreichbare Entfernung deutlich verringern.

## Bestimmungsgemäßer Gebrauch und Grenzen

Der Wassermelder ist für den Innenbereich von Reisemobilen, Caravans und vergleichbaren Campingfahrzeugen bestimmt. Geeignete Überwachungsbereiche sind insbesondere:

unter Wasserleitungen und Anschlüssen,

unter Frisch- und Brauchwassertanks,

in Staufächern mit wasserführenden Bauteilen,

an Böden unter gefährdeten Bereichen,

hinter oder unter Serviceklappen.

Das Gerät ist nicht für Außenmontage, andere Fahrzeugtypen oder stationäre Gebäudeinstallationen freigegeben. Es kann austretendes Wasser nur erkennen, wenn dieses die Kontaktstifte des Sensors erreicht. Der Wassermelder verhindert keine Leckage und ersetzt weder regelmäßige Sichtkontrollen noch die Wartung von Leitungen, Tanks, Dichtungen und Abläufen.

Trotz Schutzklasse IP67 für das Gehäuse schreibt die Anleitung eine Montage der Sendeeinheit im trockenen Innenbereich vor. Die Schutzklasse erweitert den bestimmungsgemäßen Gebrauch nicht auf Außenbereiche oder dauerhaftes Untertauchen.

## Produkt und Lieferumfang

Bestandteil | Angabe | 
 Funk-Wassermelder 868 | Art.-Nr. 106021 | 
 Montageplatte | Aufnahme für die Sendeeinheit | 
 Klebepad | Befestigung der Montageplatte auf geeigneten Flächen | 
 Schraube | 2,9 × 13 mm, Senkkopf A2, zur Befestigung des Sensors | 

Die Sendeeinheit, der Sensor am 30 cm langen Kabel, die Montageplatte, das Klebepad und die Sensorschraube bilden das in der Anleitung dargestellte Montagesystem. Für eine alternative Schraubbefestigung der Sendeeinheit sind geeignete Schrauben separat auszuwählen; sie gehören nicht zum Lieferumfang.

KLEINTEILEWARNUNG: Verpackungs- und Montagematerialien von Kindern fernhalten. Verschluckte oder in die Atemwege gelangte Kleinteile können tödlich sein. Bei Verdacht sofort ärztliche Hilfe hinzuziehen.

## Kompatibilität und Mindeststände

Laut aktueller Produktseite kann der Funk-Wassermelder ab den folgenden Geräteständen verwendet werden:

System | Ab Seriennummer | Ab Softwareversion | 
 WiPro III | 0823-021 | 6.8 | 
 WiPro III safe.lock | 1050-004 | 6.7s | 
 WiPro III safe.lock Fordset | 5298-001 | 7.4.0s | 
 WiPro III safe.lock Sprinterset | 5458-001 | 1.0.5sx | 
 Pro-Finder | 0699-013 | 9.1 | 

Bei älteren Seriennummern oder Softwareständen ist vor der Einbindung ein Upgrade beziehungsweise Update erforderlich. Seriennummer und Softwareversion gemeinsam prüfen; eine passende Nummer allein bestätigt die Funktion nicht.

Historisch ist die Unterstützung außerdem für C.A.S. III ab Seriennummer 1011-005 mit Software CAS3.20 dokumentiert. Dort wird ein Wasseralarm wie ein Gasalarm behandelt. Diese ältere Produktlinie gehört nicht zur aktuellen Kompatibilitätsliste der Produktseite; weitere Einzelheiten stehen unter Seriennummern und Softwarestände .

## Funktionsweise und Alarmwege

Die beiden Kontaktstifte am Sensor bilden die Erkennungsstelle. Überbrückt Wasser die Kontaktstifte, sendet die Sendeeinheit ein Funksignal an das eingelernte Alarmsystem. Der Wassermelder selbst ist kein eigenständiges akustisches Alarmgerät.

Bei kompatibler Einrichtung sind folgende Alarmwege dokumentiert:

WiPro III beziehungsweise WiPro III safe.lock übernimmt die Alarmierung über die im Fahrzeug eingerichteten Alarmmittel.

Ein kompatibel eingebauter und konfigurierter Pro-Finder sendet zusätzlich eine SMS-Alarmbenachrichtigung.

Die aktuelle Produktseite dokumentiert für Pro-Finder ausdrücklich eine SMS-Fernalarmierung . Ein zusätzlicher Anruf wird für den Wassermelder dort nicht zugesichert und deshalb hier nicht als feste Funktion angegeben.

## Montageort auswählen

Sendeeinheit und Sensor haben unterschiedliche Anforderungen:

Die Sendeeinheit im trockenen Innenbereich und für Batteriewechsel gut zugänglich montieren.

Den Sensor am tiefen beziehungsweise früh benetzten Punkt des zu überwachenden Bereichs anbringen.

Darauf achten, dass beide Kontaktstifte Bodenkontakt haben.

Den 30 cm langen Kabelweg vor der Befestigung prüfen; Kabel nicht quetschen, knicken oder unter Zug verlegen.

Metallische Abschirmungen zwischen Sendeeinheit und WiPro-Zentrale möglichst vermeiden.

Keine Stelle wählen, an der der Sensor durch normale Reinigung oder unvermeidliches Kondenswasser regelmäßig unbeabsichtigt ausgelöst wird.

Vor der endgültigen Montage einen provisorischen Reichweiten- und Funktionstest am geplanten Einbauort durchführen.

## Sendeeinheit und Sensor montieren

### Montageplatte mit Klebepad befestigen

Geeignete Position für Sendeeinheit und Sensor festlegen.

Klebefläche mit einem geeigneten Reinigungsmittel vorbereiten; sie muss sauber, trocken und fettfrei sein.

Klebepad an der Montageplatte anbringen und die Montageplatte an der vorgesehenen Position befestigen.

Klebepad nicht bei einer Oberflächentemperatur unter 15 °C verarbeiten.

Die Verklebung etwa 24 Stunden unbelastet lassen, bis sie ihre Endfestigkeit erreicht hat.

Eine unzureichend gereinigte Fläche kann dazu führen, dass sich der Wassermelder erst nach Wochen oder Monaten löst.

### Alternative Schraubbefestigung

Wenn eine Klebemontage nicht möglich ist, erlaubt die Anleitung eine Schraubbefestigung. Die entsprechenden Markierungen befinden sich an der Innenseite des Sendergehäuses.

Vor dem Bohren Leitungen, Tanks, elektrische Bauteile und die Materialstärke hinter der Befestigungsstelle prüfen.

Geeignete Senkkopfschrauben aus Edelstahl V4A in passender Länge auswählen; diese Schrauben sind nicht im Lieferumfang enthalten.

Nur die vorgesehenen Markierungen verwenden und das Gehäuse spannungsfrei befestigen.

WICHTIG: Die mitgelieferte Schraube 2,9 × 13 mm aus A2 ist für den Sensor vorgesehen. Sie darf nicht ungeprüft als Befestigungsschraube für Sendeeinheit oder Fahrzeugbauteile verwendet werden. Falsche oder zu lange Schrauben können das Fahrzeug oder verdeckte Komponenten beschädigen.

### Sensor befestigen und Sendeeinheit einsetzen

Sensorgehäuse am Ende des 30-cm-Kabels am vorgesehenen Gefahrenpunkt positionieren.

Sensor mit der mitgelieferten Schraube durch die vorgesehene Bohrung befestigen.

Sicherstellen, dass die Kontaktstifte den Boden berühren und nicht vom Untergrund abgehoben sind.

Montageplatte so ausrichten, dass ihre Rastnasen nach oben zeigen.

Sendeeinheit auf die Rastnasen setzen und nach unten schieben, bis Montageplatte und Gehäuse bündig sitzen.

Einbaulage kontrollieren: Die Sende-LED befindet sich oben rechts, das Sensorkabel tritt nach unten aus der Sendeeinheit aus.

Kabel spannungsfrei verlegen und die Zugänglichkeit der Sendeeinheit für den späteren Batteriewechsel prüfen.

## An die WiPro III anlernen

Der Wassermelder wird durch Überbrücken seiner Kontaktstifte ausgelöst. Die Anleitung sieht das Anlernen nach der Montage vor.

WiPro III beziehungsweise WiPro III safe.lock gemäß ihrer Anleitung in den Anlernmodus versetzen.

Kontaktstifte des Sensors mit einem feuchten Tuch oder einem anderen leitenden Material überbrücken.

Prüfen, ob die Sendeeinheit ein Funksignal absetzt.

Quittierungston der WiPro III als Bestätigung des erfolgreichen Anlernens abwarten.

Kontaktstifte wieder freigeben und abtrocknen.

Anlernmodus der WiPro III gemäß ihrer Anleitung beenden.

Weitere Anlernmethoden und Löschverfahren stehen unter Anlernvorgang . Nach dem Anlernen immer einen vollständigen Funktionstest durchführen.

## Abschließender Funktionstest

Sicherstellen, dass WiPro III beziehungsweise WiPro III safe.lock scharfgeschaltet ist.

Kontaktstifte des Sensors erneut mit einem feuchten Tuch oder leitenden Material überbrücken.

Prüfen, ob das Alarmsystem den Wasseralarm auslöst.

Bei vorhandenem Pro-Finder prüfen, ob die vorgesehene SMS-Alarmbenachrichtigung eingeht.

Kontaktstifte freigeben und abtrocknen.

Alarm beispielsweise mit dem Funk-Handsender 868 beenden.

Der Test ist erst bestanden, wenn alle für das konkrete System vorgesehenen Alarmwege funktionieren. Nach Arbeiten am Wassersystem, Änderungen des Montageortes, einem Batteriewechsel oder Änderungen am Alarmsystem den Test wiederholen.

## Verhalten bei Wasseralarm

Ein Wasseralarm weist darauf hin, dass leitfähige Feuchtigkeit die Kontaktstifte überbrückt. Auch eine kleine Leckage kann größere Folgeschäden verursachen.

Wasserzufuhr oder Pumpe abschalten, sofern dies gefahrlos möglich ist.

Gefahrenstelle prüfen und austretendes Wasser auffangen beziehungsweise entfernen.

Bei Nähe zu elektrischen Anlagen keine nassen Bauteile berühren und die Stromversorgung fachgerecht abschalten lassen.

Ursache der Feuchtigkeit beseitigen oder durch einen Fachbetrieb instand setzen lassen.

Sensor und Kontaktstifte trocknen.

Alarm am WiPro-System beenden.

Nach der Behebung einen vollständigen Funktionstest durchführen.

Der Hersteller schließt eine Haftung für Wasser- und Folgeschäden aus, die trotz Verwendung des Wassermelders entstehen. Der Melder ist deshalb als Frühwarnung und nicht als technische Absperr- oder Leckageschutzvorrichtung zu verstehen.

## Batterie und Niederbatterieanzeige

Der Funk-Wassermelder verwendet eine austauschbare CR2032-Knopfzelle mit 3 V . Die typische Batterielebensdauer beträgt etwa zwei Jahre; lange Kälteperioden wirken sich stärker aus als die Anzahl der Sendesignale. Unbenutzte Knopfzellen können laut Herstellerangabe bis zu zehn Jahre gelagert werden; den Aufdruck und das Haltbarkeitsdatum beachten.

Die aktuelle Hersteller-FAQ empfiehlt Panasonic-Batterien. Die Batterie sollte etwa alle zwei Jahre ersetzt werden, beispielsweise im Zusammenhang mit einem TÜV-Termin oder einer Gasprüfung.

Bei einer Batteriespannung unter etwa 2,6 V sind beim Auslösen folgende Hinweise dokumentiert:

Anzeige | Bedeutung | Maßnahme | 
 WiPro gibt etwa 2 Sekunden lang einen Signalton aus | Batterie des gerade ausgelösten Funk-Senders muss gewechselt werden | Batterie zeitnah ersetzen | 
 Rote Sende-LED erlischt erst nach etwa 30 Sekunden | optischer Begleithinweis auf schwache Batterie | Batterie ersetzen und Funktion prüfen | 

Meldet ein Funk-Zubehör eine schwache Batterie, haben andere CR2032-Knopfzellen ähnlichen Alters häufig einen vergleichbaren Zustand. Diese Batterien zeitnah mitprüfen; ein vorsorglicher gemeinsamer Austausch kann sinnvoll sein.

## Batterie wechseln

Sendeeinheit nach oben von der Montageplatte schieben.

Die beiden Schrauben am Gehäuse der Sendeeinheit lösen.

Gehäuse vorsichtig öffnen; im Inneren befinden sich Platine und Batteriehalterung.

Verbrauchte CR2032 vorsichtig aus der Halterung schieben.

Neue CR2032 gleichen Typs mit korrekter Polarität einsetzen.

Gehäuse wieder zusammensetzen und die beiden Schrauben gleichmäßig festziehen.

Sendeeinheit wieder auf die Montageplatte setzen und vollständig einrasten lassen.

Wassermelder auslösen und den vollständigen Funktionstest durchführen.

Nach einem normalen Batteriewechsel bleibt die Funkzuordnung erhalten; der Wassermelder muss nicht neu angelernt werden.

BATTERIEWARNUNG: Batterien nicht öffnen, kurzschließen, erhitzen oder ins Feuer werfen. Außerhalb der Reichweite von Kindern aufbewahren. Bei ausgelaufener Batterie Haut- und Augenkontakt vermeiden; bei Kontakt mit Batterieflüssigkeit mit Wasser spülen und ärztliche Hilfe aufsuchen. Verbrauchte Batterien unverzüglich und umweltgerecht entsorgen.

## Pflege und regelmäßige Kontrolle

Sendeeinheit trocken und gut zugänglich halten.

Kontaktstifte frei von Schmutz, Beschichtungen und isolierenden Rückständen halten.

Sensor, Kabel, Befestigung und Montageplatte regelmäßig auf festen Sitz und Beschädigungen prüfen.

Keine aggressiven Reinigungsmittel auf Sensor, Kabel oder Gehäuse anwenden.

Nach jeder Arbeit an Leitungen, Tanks, Pumpen oder Abläufen einen Funktionstest durchführen.

Batterie spätestens nach etwa zwei Jahren beziehungsweise bei Niederbatterieanzeige ersetzen.

Technische Änderungen am Produkt oder Alarmsystem können die zuverlässige Funktion beeinträchtigen und sind nicht vom bestimmungsgemäßen Gebrauch gedeckt.

## Störungen eingrenzen

Beobachtung | Mögliche Ursache | Maßnahme | 
 Beim Überbrücken der Kontaktstifte erfolgt keine Reaktion | Batterie leer , Kontaktstifte nicht leitend überbrückt oder Gerät defekt | neue CR2032 einsetzen; Kontakte mit feuchtem Tuch sicher überbrücken; erneut testen | 
 Sendeeinheit reagiert, WiPro löst aber keinen Alarm aus | Wassermelder nicht angelernt, System nicht scharfgeschaltet oder Mindeststand nicht erfüllt | Anlernstatus, Scharfschaltung, Seriennummer und Software prüfen | 
 WiPro alarmiert, aber keine SMS trifft ein | Pro-Finder fehlt, ist nicht kompatibel oder nicht vollständig konfiguriert | Pro-Finder-Stand, Mobilfunkverbindung und Konfiguration prüfen | 
 Sensor reagiert erst bei größerer Wassermenge | Kontaktstifte haben keinen Bodenkontakt oder liegen nicht am früh benetzten Punkt | Sensor neu positionieren und Funktionstest wiederholen | 
 Wiederholte Fehlalarme | Kondenswasser, Reinigungswasser oder dauerhaft feuchte Montagefläche | Ursache klären und Sensor an geeigneter Stelle neu positionieren | 
 Funkverbindung arbeitet unzuverlässig | Metall oder Einbauort schirmt das Funksignal ab | Sendeeinheit versetzen und vollständigen Reichweitentest durchführen | 
 Montageplatte löst sich | Fläche nicht ausreichend gereinigt, unter 15 °C verklebt oder vor Ablauf von 24 Stunden belastet | Fläche neu vorbereiten und Montagevorgaben vollständig einhalten | 
 WiPro gibt beim Auslösen etwa 2 Sekunden lang einen Signalton aus | Batteriespannung des Wassermelders unter etwa 2,6 V | CR2032 ersetzen und Funktionstest durchführen | 

Bei ungeklärten Problemen vollständige Seriennummern und Softwarestände von Wassermelder, WiPro III und gegebenenfalls Pro-Finder sowie Montageort, Signale und Testergebnis für den Support dokumentieren. Weitere systemweite Prüfschritte stehen unter Störungsbeseitigung .

## Häufige Fragen (FAQ)

Kann der Funk-Wassermelder eigenständig betrieben werden? 

Nein. Er ist Zubehör für kompatible WiPro-III-Alarmsysteme und benötigt deren Alarmierung.

Welche Artikelnummer hat der Funk-Wassermelder? 

Die aktuelle Anleitung und Produktseite nennen 106021 .

Wo wird der Sensor montiert? 

Am gefährdeten Punkt so, dass beide Kontaktstifte Bodenkontakt haben. Die Sendeeinheit bleibt am 30-cm-Kabel im trockenen und gut zugänglichen Bereich.

Kann die Sendeeinheit außen montiert werden, weil IP67 angegeben ist? 

Nein. Die Anleitung beschränkt den bestimmungsgemäßen Gebrauch auf den Innenbereich von Campingfahrzeugen und verlangt für die Sendeeinheit einen trockenen Montagebereich.

Welche WiPro-Version ist erforderlich? 

Die Mindeststände stehen in der Kompatibilitätstabelle. Ältere Geräte benötigen ein Upgrade beziehungsweise Update.

Wie wird der Wassermelder ausgelöst und angelernt? 

Durch leitendes Überbrücken der Kontaktstifte, beispielsweise mit einem feuchten Tuch. WiPro muss sich dabei im Anlernmodus befinden.

Welche Meldung überträgt Pro-Finder? 

Die aktuelle Produktseite dokumentiert eine SMS-Alarmbenachrichtigung. Ein zusätzlicher Anruf ist für diesen Sensor nicht ausdrücklich zugesichert.

Wie lange hält die Batterie? 

Die CR2032 hält typischerweise etwa zwei Jahre. Bei einer Spannung unter etwa 2,6 V meldet WiPro beim Auslösen den Batteriewechselbedarf.

Muss der Wassermelder nach dem Batteriewechsel neu angelernt werden? 

Nein. Anschließend ist jedoch ein vollständiger Funktionstest erforderlich.

## Konformität und Entsorgung

THITRONIK erklärt die Übereinstimmung des Produkts mit der Richtlinie 2014/53/EU . Die vollständige Konformitätserklärung ist im Supportbereich des Herstellers verfügbar: https://www.thitronik.de/support 

Gerät und verbrauchte Batterie nicht über den Hausmüll entsorgen. Die CR2032 getrennt einer Batteriesammlung und die Sendeeinheit einer geeigneten Sammelstelle für Elektrogeräte zuführen. Örtliche Entsorgungsvorschriften beachten.

## Querverweise

WiPro III 

Anlernvorgang 

Funk-Handsender 868 

Pro-Finder 

Seriennummern und Softwarestände 

Systemüberblick 

Störungsbeseitigung
