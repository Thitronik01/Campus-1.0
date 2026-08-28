# Funk-Magnetkontakt 868 — Montage und Betrieb

Route: /de/funk-magnetkontakt | Stand: 2026-07-18 | Sichtbarkeit: standard
Quelle: Thitronik Online/project-data/runtime/wiki/wiki-articles/de/funk-magnetkontakt.json

---
Funk-Magnetkontakt 868 — Montage und Betrieb

Funk-Magnetkontakte überwachen Türen, Fenster, Klappen, Dachluken und Dachboxen. Wird eine gesicherte Öffnung bei scharfgeschalteter Alarmanlage geöffnet, sendet der Kontakt ein Funksignal an die WiPro III .

Die Standardausführung ist in Schwarz und Weiß erhältlich und eignet sich für geschützte Einbauorte. Für Fahrzeugöffnungen, die Feuchtigkeit oder Nässe ausgesetzt sind, gibt es eine separate wasserdichte Ausführung mit Schutzart IP67 .

WICHTIG: Ein Alarm wird nur ausgelöst, wenn der Funk-Magnetkontakt an der Alarmanlage angelernt ist, Funkverbindung besteht und die Alarmanlage scharfgeschaltet wurde. Ein Funk-Magnetkontakt meldet einen Einbruch oder Einbruchversuch, verhindert ihn aber nicht mechanisch.

## Technische Daten

Parameter | Standard, Art.-Nr. 100757/100758 | Wasserdicht, Art.-Nr. 106020 | 
 Spannungsversorgung | 1 × CR2032-Knopfzelle, 3 V | 1 × CR2032-Knopfzelle, 3 V | 
 Typische Batterielebensdauer | ca. 2 Jahre | ca. 2 Jahre | 
 Funkreichweite | ca. 75 m im Freifeld | ca. 75 m im Freifeld | 
 Sendefrequenz | 868,35 MHz | 868,35 MHz | 
 Sendeleistung | < 10 mW | < 10 mW | 
 Abmessungen Sendeeinheit (B × H × T) | 44 × 34 × 15 mm | 52 × 35 × 14 mm | 
 Abmessungen Magnet (B × H × T) | nicht separat dokumentiert | 52 × 13 × 11 mm | 
 Gewicht | ca. 33 g | ca. 37 g | 
 Schutzart | keine Schutzart für Nässe dokumentiert | IP67 | 
 Temperaturbereich | −10 °C bis +60 °C | maximal −40 °C bis +125 °C laut aktueller Produktseite | 

Die Funkreichweite ist ein Freifeldwert. Metallische Fahrzeugteile, der Montageort und andere Abschirmungen können den tatsächlich erreichbaren Abstand deutlich verringern.

Die aktuelle THITRONIK-Produktseite nennt für die wasserdichte Ausführung etwa 37 g . In der gedruckten Anleitung Rev. 1.0 stehen noch etwa 33 g ; für diesen Master gilt der aktuelle Produktstand.

Die WiPro III kann insgesamt höchstens 100 Funksender speichern. Funk-Magnetkontakte teilen sich diesen Speicher mit Funk-Handsendern, Funk-Kabelschleifen und anderem Funk-Zubehör.

## Varianten und Einsatzbereiche

Ausführung | Farbe | Art.-Nr. | Einsatzbereich | Kompatibilität laut Produktunterlagen | 
 Standard | schwarz | 100757 | geschützte Türen, Fenster, Klappen, Dachluken und Dachboxen | WiPro III, WiPro III safe.lock , WiPro easy | 
 Standard | weiß | 100758 | geschützte Türen, Fenster, Klappen, Dachluken und Dachboxen | WiPro III, WiPro III safe.lock , WiPro easy | 
 Wasserdicht | schwarz | 106020 | feuchte- oder spritzwassergefährdete Öffnungen, beispielsweise Garagenklappen, Dachboxen, Motorhauben und Anhängertüren | WiPro III und WiPro III safe.lock | 

Die wasserdichte Ausführung ist konstruktiv eigenständig. Ihre Montageplatte, Gehäuseausrichtung und zulässigen Abstände dürfen nicht mit den Vorgaben der Standardausführung vermischt werden.

## Funktionsprinzip

Der Funk-Magnetkontakt besteht aus einer Sendeeinheit mit Reed-Sensor und einem Magneten. Bei geschlossener Öffnung liegen beide Teile innerhalb des zulässigen Abstands. Beim Öffnen entfernt sich der Magnet, der Kontakt sendet und die scharfgeschaltete Alarmanlage löst aus.

Die Sende-LED bestätigt einen Sendevorgang. Sie dient zugleich als Orientierungshilfe bei der Montage und zeigt durch ungewöhnlich langes Leuchten eine schwache Batterie an.

## Anlernen an die WiPro III

Jeden Funk-Magnetkontakt vor der Verwendung einzeln anlernen. Die folgende direkte Methode setzt freien Zugang zur WiPro-III-Zentrale voraus.

### Direkt an der WiPro-III-Zentrale

Sicherstellen, dass der 20-polige Stecker an der WiPro-III-Zentrale eingesteckt ist.

Den Taster „B“ an der Gehäusevorderseite gedrückt halten, bis ein langer Signalton ertönt und die Status-LED dauerhaft leuchtet.

Einen Sendevorgang auslösen: Bei der Standardausführung Sender und Magnet voneinander entfernen, bis die Sende-LED „C“ blinkt. Bei der wasserdichten Ausführung den Magneten mehr als 30 mm von der Sendeeinheit entfernen.

Den kurzen Bestätigungston abwarten; die Status-LED erlischt dabei kurz.

Zum Beenden den Taster „B“ kurz drücken. Ein Doppelton ertönt und die Status-LED erlischt.

Weitere Anlernwege, Voraussetzungen und Löschverfahren stehen unter Anlernvorgang .

## Reichweitentest vor der Montage

Den Reichweitentest nach dem Anlernen und vor dem endgültigen Kleben oder Verschrauben durchführen.

Sendeeinheit und Magnet vorübergehend am vorgesehenen Montageort fixieren.

Sicherstellen, dass beide Teile im geschlossenen Zustand richtig ausgerichtet sind und innerhalb des zulässigen Abstands liegen.

Alarmanlage scharfschalten.

Gesicherte Öffnung so weit öffnen, dass der Kontakt sendet: bei der wasserdichten Ausführung den Abstand auf mehr als 30 mm vergrößern.

Prüfen, ob die Alarmanlage auslöst.

Bleibt der Alarm aus, zunächst Anlernstatus und Batterie prüfen. Danach die Position verändern und mögliche Metallabschirmungen zwischen Funk-Magnetkontakt und Zentrale ausschließen. Bei einer Heckgarage kann ein Montageadapter die Funkverbindung verbessern.

## Standardausführung montieren

### Ausrichtung und Abstand

ACHTUNG: Die Platine darf nicht mit der Sende-LED zum Magneten ausgerichtet sein. In dieser falschen Ausrichtung ist das Anlernen zwar möglich, eine Alarmierung erfolgt jedoch nicht.

Die Sende-LED muss vom Magneten weg zeigen. Die Platine wird entsprechend in das Sendergehäuse eingelegt und der Senderdeckel eingerastet.

Die produktspezifische Montageanleitung nennt einen Montageradius von höchstens 25 mm . Das WiPro-III-Installationshandbuch nennt konservativ etwa 22 mm . Für eine belastbare Montage den Abstand im geschlossenen Zustand deshalb auf höchstens 22 mm auslegen und die Funktionsreserve durch einen Reichweiten- und Öffnungstest prüfen.

### Klebe- oder Schraubbefestigung

Eine ebene Klebefläche wählen und vollständig von Schmutz, Feuchtigkeit und Fett befreien.

Klebepads nicht bei Oberflächentemperaturen unter 15 °C verarbeiten.

Auf rauen Oberflächen die unbedruckte Padseite auf die Fahrzeugoberfläche und die bedruckte Seite auf Sender beziehungsweise Magnet kleben.

Auf Glas oder Acrylglas die bedruckte Seite für die abschreckende Wirkung nach außen zeigen lassen.

Die Teile nach dem Kleben nicht belasten; die Endfestigkeit wird erst nach etwa 24 Stunden erreicht.

Ist eine Klebemontage nicht möglich, kann das Sendergehäuse an den innen markierten Stellen verschraubt werden. Geeignete Befestigungsmittel und Schraubenlängen so wählen, dass keine Fahrzeugteile oder Leitungen beschädigt werden.

### Fenster, Türen und Klappen

An Fenstern kann das Sendergehäuse je nach Rahmenprofil und Abstand zu Rollo oder Scheibe liegend links oder rechts montiert werden. Entscheidend ist stets, dass die Sende-LED vom Magneten weg zeigt.

An Türen und Klappen das Sendergehäuse möglichst am festen Rahmen und den Magneten am beweglichen Türblatt oder an der Klappe befestigen.

Bei größeren Spaltmaßen oder metallischen Heckgaragen den passenden Montageadapter verwenden: Art.-Nr. 100428 in Schwarz oder Art.-Nr. 100729 in Weiß.

## Wasserdichte Ausführung montieren

### Ausrichtung und Abstand

Bei der wasserdichten Ausführung müssen die kleinen Pfeile auf Sendeeinheit und Magnet zueinander zeigen . Im geschlossenen Zustand darf der Abstand zwischen beiden Teilen höchstens 22 mm betragen. Ein Sendevorgang wird für Anlernen und Funktionstest ausgelöst, indem der Magnet auf mehr als 30 mm Abstand gebracht wird.

ACHTUNG: Für die wasserdichte Ausführung gelten die Gehäusepfeile und der Abstand von 22 mm. Die LED-Ausrichtungsregel und der Montageradius der Standardausführung dürfen nicht darauf übertragen werden.

### Montageplatte und Magnet befestigen

Eine saubere, trockene und fettfreie Fläche wählen. Das mitgelieferte Klebepad nicht unter 15 °C Oberflächentemperatur verarbeiten und etwa 24 Stunden bis zur Endfestigkeit warten.

Montageplatte so ausrichten, dass ihre Rastnasen vom Magneten weg und der kleine Pfeil zum Magneten zeigen.

Sendeeinheit so drehen, dass ihr Gehäusepfeil in dieselbe Richtung wie der Pfeil auf der Montageplatte zeigt.

Sendeeinheit auf die Rastnasen setzen und in Pfeilrichtung schieben, bis sie bündig auf der Montageplatte sitzt.

Magneten mit den beiden mitgelieferten Schrauben so befestigen, dass sein Pfeil zum Pfeil der Sendeeinheit zeigt.

Kann die Montageplatte nicht geklebt werden, geeignete Senkkopfschrauben aus V4A-Edelstahl verwenden. Diese Schrauben gehören nicht zum Lieferumfang.

VORSICHT: Befestigungsort, Schraubenart und Schraubenlänge vor dem Bohren prüfen. Ungeeignete, falsche oder zu lange Schrauben können Fahrzeugteile und Leitungen beschädigen.

## Bereits über CAN-Bus überwachte Türen

Fahrzeugtüren, deren geöffneter Zustand im Kombiinstrument oder in der Multifunktionsanzeige erscheint, werden bei korrekt angeschlossener WiPro III in der Regel bereits über den CAN-Bus überwacht. Für diese Türen ist normalerweise kein zusätzlicher Funk-Magnetkontakt erforderlich.

Ob eine Tür tatsächlich vom Fahrzeug und von der WiPro III ausgewertet wird, muss am konkreten Fahrzeug geprüft werden. Hinweise stehen unter Fahrzeugkompatibilität .

## Verwendung im Betrieb

Vor dem Scharfschalten prüfen, ob Sendeeinheit und Magnet fest sitzen, richtig ausgerichtet sind und die Öffnung vollständig geschlossen ist.

Alarmanlage scharfschalten.

Beim Öffnen der gesicherten Tür, des Fensters oder der Klappe prüfen, ob der Funk-Magnetkontakt sendet und die Alarmanlage auslöst.

Vor Arbeiten am Kontakt oder vor dem Öffnen des Sendergehäuses die Alarmanlage unscharf schalten.

Nach der Montage jeden Funk-Magnetkontakt einzeln mit einem Testalarm prüfen. Eine bloße Bestätigung während des Anlernens beweist bei falsch ausgerichteter Standardplatine noch keine zuverlässige Alarmfunktion.

## Batterie prüfen und wechseln

Beide Ausführungen verwenden eine CR2032-Knopfzelle mit 3 V . Die typische Lebensdauer beträgt etwa zwei Jahre; längere Kälteperioden können sie verkürzen.

### Niederbatterie-Signal

Bei einer schwachen Batterie von weniger als etwa 2,6 V zeigt die WiPro beim Auslösen des Funk-Magnetkontakts folgende Hinweise:

Aus der Zentrale ertönt etwa 2 Sekunden lang ein Signalton.

Die rote Sende-LED am Kontakt erlischt erst nach ungefähr 30 Sekunden .

Wenn eine CR2032-Funkkomponente wegen schwacher Batterie auffällt, empfiehlt sich die zeitnahe Prüfung weiterer Knopfzellen ähnlichen Alters.

### Standardausführung

Für den Batteriewechsel der Standardausführung die zum Gehäusestand passende THITRONIK-Kurzanleitung aus dem Supportbereich verwenden. Alarmanlage vorher unscharf schalten, ausschließlich eine neue CR2032 einsetzen, die Polarität beachten und danach Gehäusesitz, Funktion und Reichweite prüfen.

### Wasserdichte Ausführung

Alarmanlage unscharf schalten und Sendeeinheit von der Montageplatte schieben.

Die beiden Gehäuseschrauben lösen und das Gehäuse öffnen.

Verbrauchte CR2032 vorsichtig aus der Batteriehalterung schieben.

Neue CR2032, 3 V mit korrekter Polung einsetzen.

Dichtung korrekt einsetzen, Gehäuse schließen und verschrauben; danach Sendeeinheit wieder auf die Montageplatte schieben und Funktion sowie Reichweite prüfen.

VORSICHT: Bei unsachgemäßem Batteriewechsel besteht Explosionsgefahr. Batterien nicht ins Feuer werfen, öffnen oder kurzschließen. Knopfzellen und Kleinteile von Kindern fernhalten; Verschlucken kann tödlich sein. Bei Verdacht sofort ärztliche Hilfe hinzuziehen. Ausgelaufene Batterieflüssigkeit nicht mit Haut oder Augen in Kontakt bringen; betroffene Stellen mit Wasser spülen und ärztliche Hilfe suchen.

## Störungen eingrenzen

Beobachtung | Mögliche Ursache | Maßnahme | 
 Standardkontakt lässt sich anlernen, löst aber keinen Alarm aus | Platine zeigt mit der Sende-LED zum Magneten | Platine drehen; Sende-LED muss vom Magneten weg zeigen | 
 Wasserdichter Kontakt löst nicht zuverlässig aus | Gehäusepfeile zeigen nicht zueinander oder Abstand im geschlossenen Zustand ist zu groß | Ausrichtung korrigieren und Abstand auf höchstens 22 mm begrenzen | 
 Kein Bestätigungston oder Alarm | Kontakt nicht angelernt, Batterie leer oder Funkweg abgeschirmt | Anlernstatus und Batterie prüfen; Reichweitentest wiederholen | 
 Kontakt an der Heckgarage arbeitet unzuverlässig | Sender sitzt auf Metall oder Funkweg ist abgeschirmt | Position ändern; bei Standardausführung Montageadapter 100428 oder 100729 verwenden | 
 Kontakt fällt nach einiger Zeit ab | Klebefläche unzureichend gereinigt, zu kalt verarbeitet oder vor Ablauf von 24 Stunden belastet | Fläche neu vorbereiten und Klebevorgaben einhalten | 
 Etwa 2 Sekunden Signalton, rote Sende-LED leuchtet lange | CR2032 schwach | Batterie ersetzen und anschließend Funktion sowie Reichweite prüfen | 
 Unbeabsichtigter Alarm bei geschlossener Öffnung | Abstand zu groß, Bauteile bewegen sich oder Klebepad löst sich | Sitz, Abstand, Ausrichtung und Befestigung kontrollieren | 

Bei ungeklärten Empfangs- oder Alarmproblemen vollständige Seriennummern von Alarmanlage und Funk-Magnetkontakt, Batteriezustand, Fahrzeugdaten, Ausführung und Einbausituation für den Support dokumentieren.

## Häufige Fragen (FAQ)

Welche Ausführung benötige ich? 

Für geschützte Einbauorte stehen Standardkontakte in Schwarz und Weiß zur Verfügung. Für Öffnungen im Feucht- oder Spritzwasserbereich ist die wasserdichte Ausführung mit Art.-Nr. 106020 und IP67 vorgesehen.

Warum kann ich den Standardkontakt anlernen, obwohl später kein Alarm ausgelöst wird? 

Das geschieht häufig bei falsch herum eingesetzter Platine. Die Sende-LED muss vom Magneten weg zeigen. Nach der Korrektur immer einen Testalarm durchführen.

Wie groß darf der Abstand zwischen Sender und Magnet sein? 

Bei der wasserdichten Ausführung höchstens 22 mm. Für die Standardausführung nennt die produktspezifische Anleitung 25 mm, das WiPro-III-Installationshandbuch etwa 22 mm. Für eine zuverlässige Montage wird deshalb ein geschlossener Abstand von höchstens 22 mm empfohlen.

Wann brauche ich einen Montageadapter? 

Bei großen Spaltmaßen oder metallischen Heckgaragen. Für die Standardausführung gibt es Art.-Nr. 100428 in Schwarz und Art.-Nr. 100729 in Weiß.

Darf ich die wasserdichte Montageplatte verschrauben? 

Ja. Dafür sind geeignete V4A-Senkkopfschrauben erforderlich; sie sind nicht im Lieferumfang enthalten. Schraubenart und -länge müssen zum Fahrzeugaufbau passen.

Brauche ich Funk-Magnetkontakte an bereits angezeigten Fahrzeugtüren? 

In der Regel nicht, wenn die Tür über den CAN-Bus erfasst und von der WiPro III korrekt ausgewertet wird. Dies muss am Fahrzeug geprüft werden.

Was bedeutet der zweisekündige Signalton nach dem Öffnen? 

Die Batterie des zuletzt betätigten Funk-Zubehörs ist schwach. Beim betroffenen Funk-Magnetkontakt bleibt zusätzlich die rote Sende-LED etwa 30 Sekunden sichtbar. Die CR2032 sollte zeitnah ersetzt werden.

## Konformität und Entsorgung

Die Funk-Magnetkontakte 868 entsprechen laut Hersteller den Anforderungen der Richtlinie 2014/53/EU . Die vollständige Konformitätserklärung ist im Supportbereich von THITRONIK verfügbar: https://www.thitronik.de/support 

Geräte und verbrauchte Batterien nicht über den Hausmüll entsorgen. Knopfzellen getrennt dem Batterierecycling zuführen. Verpackungs- und Montagematerialien von Kindern fernhalten.

## Querverweise

WiPro III 

Anlernvorgang 

Funk-Handsender 868 

Funk-Kabelschleife 868 

Systemüberblick 

Störungsbeseitigung
