# T.S.A. — Funk-Rauchmelder für WiPro III

Route: /de/funk-rauchmelder | Stand: 2026-07-19 | Sichtbarkeit: standard
Quelle: Thitronik Online/project-data/runtime/wiki/wiki-articles/de/funk-rauchmelder.json

---
T.S.A. — Funk-Rauchmelder für WiPro III 

Der T.S.A. ist ein Funk-Rauchmelder für Freizeitfahrzeuge. Er kann eigenständig betrieben oder in eine kompatible WiPro III beziehungsweise WiPro III safe.lock eingebunden werden. Erkennt er Rauch, warnt er am Gerät; bei Funk-Integration werden zusätzlich die Alarmwege des Fahrzeugs und gegebenenfalls des Pro-Finder genutzt.

WICHTIG: Der T.S.A. erkennt Rauch, aber keine Gase wie Butan, Propan, Narkosegase oder Kohlenmonoxid. Für diese Gefahren sind geeignete Gaswarner wie G.A.S.-pro III oder G.A.S.-connect erforderlich.

## Technische Daten

Parameter | Herstellerangabe | 
 Artikelnummern der Rauchmelder | 105753 (weiß), 105754 (grau) | 
 Normangabe des Herstellers | DIN EN 14064 (siehe Quellenhinweis unter der Tabelle) | 
 Spannungsversorgung | fest integrierte Lithium-Batterie, 3 V (1,6 Ah), Typ CR123A | 
 Mittlere Stromaufnahme | 13,2 µA bei 2,9 V | 
 Lautstärke | 85 dB bei 3 m Abstand | 
 Funkreichweite | ca. 90 m im Freifeld | 
 Betriebstemperatur | −10 °C bis +55 °C | 
 Temperaturbeständigkeit des Klebstoffs | −35 °C bis +93 °C | 
 Abmessungen (Ø × H) | 50,8 × 42,5 mm | 
 Gewicht | ca. 59 g | 
 Austauschfrist | spätestens nach 10 Jahren | 
 Anzeige und Bedienelement | zweifarbige Anzeige-LED (rot/grün) und Test-Taste | 

Die Funkreichweite ist ein Freifeldwert. Fahrzeugaufbau, Metallflächen, Einbauort und andere Abschirmungen können die tatsächlich erreichbare Entfernung deutlich verringern.

QUELLENHINWEIS ZUR NORM: Die Anleitung Rev. 1.1 und die aktuelle THITRONIK-Produktseite nennen „DIN EN 14064“. DIN Media führt dagegen DIN EN 14604 als aktuelle Norm für Rauchwarnmelder. Da keine korrigierte Herstellererklärung vorliegt, wird hier keine eigenständige Konformität mit einer dieser beiden Normen behauptet. Für Zulassungs- oder Nachweiszwecke ist die aktuelle Normangabe direkt bei THITRONIK zu klären.

## Varianten, Zubehör und Einsatzbereiche

Produkt | Farbe | Art.-Nr. | Verwendung | 
 T.S.A. Funk-Rauchmelder | weiß | 105753 | Innen- und Wohnbereich sowie Heckgarage | 
 T.S.A. Funk-Rauchmelder | grau | 105754 | Innen- und Wohnbereich sowie Heckgarage | 
 Montageadapter T.S.A. | weiß | 105755 | Wandmontage nahe der Decke, insbesondere bei Stoffdecken | 
 Montageadapter T.S.A. | grau | 105756 | Wandmontage nahe der Decke, insbesondere bei Stoffdecken | 

Der Rauchmelder eignet sich besonders auch für Heckgaragen, in denen E-Bikes gelagert oder geladen werden. Zum Lieferumfang des Rauchmelders gehören laut aktueller Produktseite eine Anleitung und Montagematerial; der Montageadapter ist separates Zubehör.

HINWEIS FÜR PERSONEN MIT HÖRBEHINDERUNG: Der T.S.A. ist zur alleinigen Alarmierung unter Umständen nicht geeignet. In diesem Fall ist ein auf die betroffene Person abgestimmtes zusätzliches Warnkonzept erforderlich.

## Funktionsprinzip und Grenzen

Der T.S.A. arbeitet nach dem photoelektrischen Streulichtprinzip . Im Ruhezustand trifft der Lichtstrahl in der Rauchkammer nicht auf die Fotodiode. Gelangen Rauchpartikel in die Kammer, streuen sie das Licht zur Fotodiode und lösen den Alarm aus. Das Prinzip eignet sich insbesondere zur Erkennung von Schwelbränden mit kaltem Rauch.

Ein Rauchmelder kann nur warnen, wenn Rauch die Rauchkammer erreicht. Er löscht keinen Brand und ersetzt weder Fluchtwege noch umsichtiges Verhalten. Den Montageort deshalb so wählen, dass Rauch ungehindert zum Gerät gelangen kann.

## Standalone-Betrieb und Funk-Kompatibilität

Als eigenständiger Rauchmelder kann der T.S.A. unabhängig von den folgenden Versionsgrenzen verwendet werden. Für die Funk-Einbindung in das THITRONIK-System gelten laut Hersteller-FAQ diese Mindeststände:

Produkt | ab Seriennummer | ab Softwareversion | 
 WiPro III | 0823-021 | 6.8 | 
 WiPro III safe.lock | 1050-004 | 6.7s | 
 WiPro III safe.lock Ford | 5298-001 | 7.4.0s | 
 WiPro III safe.lock Sprinterset | 5458-001 | 1.0.5 sx | 
 Pro-Finder | 0699-013 | 9.1 | 

Bei älteren Seriennummern oder Softwareständen ist vor der Einbindung ein Upgrade beziehungsweise Update erforderlich. Im Standalone-Betrieb warnt nur der T.S.A. selbst; Fahrzeughupe, Blinker, SMS und Anruf werden dann nicht angesteuert.

## An die WiPro III anlernen

Vor dem Anlernen Seriennummer und Softwarestand der vorhandenen Komponenten prüfen. Der folgende direkte Ablauf setzt Zugang zum Rauchmelder und zur WiPro-III-Zentrale voraus.

WiPro III beziehungsweise WiPro III safe.lock gemäß ihrer Anleitung in den Anlernmodus versetzen.

Den Gehäusedeckel des T.S.A. durch Drehen lösen.

Die Taste im Inneren des Rauchmelders drücken.

Den Signalton der WiPro III als Bestätigung abwarten.

Den Anlernmodus der WiPro III gemäß ihrer Anleitung beenden.

Weitere Anlernwege und Löschverfahren stehen unter Anlernvorgang . Nach dem Anlernen immer einen vollständigen Funktionstest einschließlich der vorgesehenen Alarmwege durchführen.

## Montageort auswählen

Der Montageort entscheidet darüber, ob Rauch frühzeitig und ungehindert in die Rauchkammer gelangen kann.

Den Rauchmelder möglichst mittig an der Fahrzeugdecke montieren.

In einer Heckgarage einen möglichst hohen, freien Montageort wählen, besonders wenn dort E-Bikes gelagert oder geladen werden.

Nicht direkt in einer Fahrzeugecke oder nahe an Lampen und Leuchten montieren.

Nicht unmittelbar neben Küche oder Bad montieren, da Dampf Fehlalarme auslösen kann.

Starke Luftströmungen durch Ventilatoren oder Lüftungsanlagen vermeiden; solche Anlagen während des Schlafs oder längerer Standzeiten abschalten, wenn sie Rauch vom Melder fernhalten könnten.

Den Rauchmelder nicht bekleben, überstreichen oder abdecken.

Bei einer Stoffdecke den T.S.A. nicht direkt an den Stoff kleben. Das mitgelieferte Klebepad haftet dort nicht zuverlässig. Stattdessen den passenden Montageadapter verwenden und den Rauchmelder an einem seitlichen Kunststoffelement nahe der Decke befestigen.

## Rauchmelder aktivieren und montieren

### Vorbereitung

Montageort, Deckenmaterial und gegebenenfalls benötigten Montageadapter prüfen.

Den Rauchmelder aktivieren: Montageplatte gleichzeitig herunterdrücken und im Uhrzeigersinn drehen.

Sicherstellen, dass der Gehäusedeckel hörbar einrastet; erst dann ist der Rauchmelder aktiviert und mit Strom versorgt.

Alle Klebeflächen glatt, sauber, trocken und fettfrei vorbereiten.

### Variante 1: Direktmontage an einer Kunststoffdecke

Weiße Schutzfolie vom runden doppelseitigen 3M-Klebepad entfernen.

Klebepad auf die entfettete Montagefläche des Rauchmelders kleben.

Rote Schutzfolie abziehen und die gewählte Stelle an der Fahrzeugdecke entfetten.

Rauchmelder mindestens 60 Sekunden lang fest gegen die Decke drücken.

### Variante 2: Montage mit Montageadapter

Abgerundete Montagefläche des Adapters entfetten.

Rote Schutzfolie vom runden doppelseitigen Klebepad des Rauchmelders entfernen.

Rauchmelder auf die abgerundete Adapterfläche setzen und beide Teile mindestens 60 Sekunden fest zusammendrücken.

Rechteckige Montagefläche des Adapters und die gewählte Stelle an der Fahrzeugwand entfetten.

Schutzfolie auf einer Seite des rechteckigen Klebepads entfernen.

Rechteckiges Klebepad auf die Rückseite des Montageadapters kleben.

Zweite Schutzfolie entfernen.

Adapter mitsamt Rauchmelder mindestens 60 Sekunden fest gegen die Fahrzeugwand drücken.

WICHTIG: Den Rauchmelder nicht direkt an eine Stoffdecke kleben. Ein herabfallendes Gerät kann Personen verletzen und steht für die Raucherkennung nicht mehr am vorgesehenen Ort zur Verfügung.

## Abschließender Funktionstest nach der Montage

Prüfen, ob der Gehäusedeckel eingerastet und der Rauchmelder aktiviert ist.

Unterseite beziehungsweise Test-Taste mindestens 1 Sekunde gedrückt halten.

Prüfen, ob der T.S.A. ein akustisches Signal ausgibt und die LED dauerhaft blinkt.

Bei Funk-Integration zusätzlich prüfen, ob WiPro III die Fahrzeughupe und die Blinker ansteuert und ein kompatibler Pro-Finder die vorgesehene Meldung überträgt.

Test-Taste loslassen; das lokale Warnsignal verstummt nach einigen Sekunden.

Den Fahrzeugalarm mit dem Funk-Handsender 868 beenden.

Der Test ist erst vollständig bestanden, wenn alle für das konkrete System vorgesehenen Alarmwege funktioniert haben.

## Betriebszustände und Signale

Zustand | Anzeige-LED | Akustisches Signal | 
 Bereitschaft | rote LED blinkt alle 344 Sekunden | keines | 
 Rauchalarm | rote LED blinkt durchgängig | Warnton | 
 Batterie am Lebensdauerende | kein gesondertes LED-Muster dokumentiert | ein kurzer Signalton alle 43 Sekunden | 
 Fehlermodus | kein gesondertes LED-Muster dokumentiert | drei kurze Signaltöne alle 43 Sekunden | 

Die Anleitung bezeichnet die Anzeige als zweifarbige LED in Rot und Grün, dokumentiert jedoch für den normalen Betrieb nur die oben genannten roten Anzeigen. Aus einem grünen Signal darf daher ohne zusätzliche Herstellerinformation keine Diagnose abgeleitet werden.

## Verhalten bei Rauchalarm

Erkennt der T.S.A. Rauch, gibt er einen Warnton aus und die rote LED blinkt durchgängig. Ist er an eine kompatible WiPro III angelernt, werden zusätzlich die Fahrzeughupe und die Blinker angesteuert. Bei kompatibel eingebautem und konfiguriertem Pro-Finder werden außerdem eine SMS und ein Anruf ausgelöst.

Den Alarm erst dann zurücksetzen, wenn die Situation geprüft und ein Brand ausgeschlossen beziehungsweise die Gefahrenstelle verlassen wurde.

Test-Taste am T.S.A. drücken, um den Alarm am Rauchmelder abzuschalten.

Alarm der WiPro III mit dem Funk-Handsender deaktivieren.

Bei tatsächlichem Brand das Fahrzeug unverzüglich verlassen, andere Personen warnen und die Feuerwehr alarmieren. Keine eigenen Löschversuche unternehmen, wenn dadurch Personen gefährdet werden.

## Funktionstest im Betrieb

Für den vom Hersteller beschriebenen Funktionstest ausschließlich die Test-Taste verwenden:

Unterseite beziehungsweise Test-Taste länger als 1 Sekunde gedrückt halten.

Akustisches Rauchalarmsignal und durchgängig blinkende LED prüfen.

Bei Funk-Integration die Reaktion von WiPro III und Pro-Finder prüfen.

Test-Taste loslassen; das lokale Warnsignal verstummt nach einigen Sekunden.

Fahrzeugalarm mit dem Funk- Handsender beenden.

Den Rauchmelder nicht mit offener Flamme prüfen. Nach Arbeiten am Fahrzeug, Änderungen am Montageort oder Änderungen am Alarmsystem erneut einen vollständigen Funktionstest durchführen.

## Batterie, Gerätelebensdauer und Fehlermodus

Die Lithium-Batterie CR123A mit 3 V ist fest integriert und kann nicht gewechselt werden. Die vorgesehene Nutzungsdauer beträgt bis zu zehn Jahre. Danach muss der gesamte Rauchmelder ersetzt werden, weil zusätzlich zur Batterie auch Verunreinigungen der Rauchkammer, etwa durch Hausstaub, die Zuverlässigkeit beeinträchtigen können.

### Batteriewarnung

Ein einzelner kurzer Signalton alle 43 Sekunden kennzeichnet das Ende der Batterielebensdauer.

Test-Taste 3 Sekunden gedrückt halten, um die Batteriewarnung für 8 Stunden stummzuschalten.

Rauchmelder ersetzen, sobald die Batteriewarnung mehr als viermal ausgegeben wurde; die Stummschaltung ersetzt den Geräteaustausch nicht.

WARNUNG: Bei unsachgemäßer Behandlung können Lithium-Batterien explodieren oder Brände verursachen. Die fest eingebaute Batterie nicht ausbauen oder beschädigen; das Gerät nicht zerlegen, kurzschließen, erhitzen oder ins Feuer werfen.

### Fehlermodus

Drei kurze Signaltöne alle 43 Sekunden als Fehlermeldung erkennen.

Oberfläche mit einem trockenen, fusselfreien Tuch reinigen.

Bleibt die Fehlermeldung bestehen, den T.S.A. als defekt ersetzen.

### Pflege und Austausch

Den Rauchmelder äußerlich trocken und fusselfrei halten. Keine Farbe, Aufkleber, Abdeckungen oder Reinigungsflüssigkeiten verwenden, die Öffnungen oder Rauchkammer beeinträchtigen könnten. Das Gerät spätestens nach zehn Jahren sowie bei anhaltender Batterie- oder Fehlermeldung vollständig ersetzen.

## Störungen eingrenzen

Beobachtung | Mögliche Ursache | Maßnahme | 
 Beim Drücken der Test-Taste erfolgt keine lokale Reaktion | Rauchmelder nicht aktiviert, Batterie erschöpft oder Gerät defekt | Gehäusedeckel korrekt einrasten und Test wiederholen; bleibt die Reaktion aus, Gerät ersetzen | 
 Lokaler Test funktioniert, WiPro III reagiert nicht | T.S.A. nicht angelernt oder Mindeststand nicht erfüllt | Seriennummer und Software prüfen; T.S.A. erneut anlernen | 
 Fahrzeughupe und Blinker reagieren, aber SMS oder Anruf bleiben aus | Pro-Finder fehlt, ist nicht kompatibel oder nicht vollständig konfiguriert | Pro-Finder-Stand, Mobilfunkverbindung und Konfiguration prüfen | 
 Wiederholte Fehlalarme nahe Küche oder Bad | Dampf gelangt in die Rauchkammer | Rauchmelder an einen geeigneten Ort außerhalb des unmittelbaren Dampfbereichs versetzen | 
 Funk-Integration arbeitet nur unzuverlässig | Funkweg durch Metall oder Einbauort abgeschirmt | Montageort verändern und vollständigen Funktionstest wiederholen | 
 Rauchmelder löst sich von einer Stoffdecke | ungeeignete direkte Klebemontage | Montageadapter 105755 oder 105756 an einem seitlichen Kunststoffelement verwenden | 
 Ein kurzer Signalton alle 43 Sekunden | Batterie am Lebensdauerende | T.S.A. ersetzen; Warnung nur vorübergehend für 8 Stunden stummschalten | 
 Drei kurze Signaltöne alle 43 Sekunden | Fehlermodus | Oberfläche trocken und fusselfrei reinigen; bei fortbestehendem Fehler Gerät ersetzen | 

Bei ungeklärten Problemen vollständige Seriennummern und Softwarestände von T.S.A., WiPro III und gegebenenfalls Pro-Finder sowie Montageort, Signalfolge und Testergebnis für den Support dokumentieren. Weitere systemweite Prüfschritte stehen unter Störungsbeseitigung .

## Häufige Fragen (FAQ)

Kann ich den T.S.A. ohne WiPro III verwenden? 

Ja. Im Standalone-Betrieb warnt der T.S.A. lokal. Fahrzeughupe, Blinker, SMS und Anruf stehen ohne Systemintegration nicht zur Verfügung.

Welche Systemversion ist für die Funk-Integration erforderlich? 

Die Mindeststände stehen in der Kompatibilitätstabelle. Ältere Geräte benötigen ein Upgrade beziehungsweise Update.

Warnt der T.S.A. vor Butan, Propan, Narkosegasen oder Kohlenmonoxid? 

Nein. Dafür ist ein geeigneter Gaswarner erforderlich.

Kann ich den Rauchmelder in einer Heckgarage mit E-Bikes verwenden? 

Ja. Der Hersteller empfiehlt diesen Einsatz ausdrücklich, besonders bei Lagerung oder Ladung von E-Bikes. Der Rauch muss den Melder ungehindert erreichen können.

Kann die Batterie gewechselt werden? 

Nein. Die CR123A ist fest integriert. Bei Batteriewarnung oder spätestens nach zehn Jahren wird das vollständige Gerät ersetzt.

Wie unterscheide ich Batterie- und Fehlermeldung? 

Ein kurzer Signalton alle 43 Sekunden weist auf das Ende der Batterielebensdauer hin. Drei kurze Signaltöne alle 43 Sekunden kennzeichnen den Fehlermodus.

Darf ich den T.S.A. direkt an eine Stoffdecke kleben? 

Nein. Dafür ist der Montageadapter 105755 in Weiß beziehungsweise 105756 in Grau vorgesehen; er wird an einem seitlichen Kunststoffelement nahe der Decke befestigt.

Ist der T.S.A. für Personen mit Hörbehinderung ausreichend? 

Unter Umständen nicht. Die Eignung und ein zusätzliches Warnkonzept müssen individuell geprüft werden.

## Konformität und Entsorgung

THITRONIK erklärt in der Anleitung die Übereinstimmung des Produkts mit der Richtlinie 2014/53/EU . Die ausführliche Konformitätserklärung ist im Supportbereich des Herstellers verfügbar: https://www.thitronik.de/support 

Die abweichende Normbezeichnung in den Herstellerunterlagen ist im Abschnitt „Technische Daten“ dokumentiert und muss vor normativer Verwendung geklärt werden.

Den T.S.A. wegen der fest integrierten Lithium-Batterie nicht über den Hausmüll entsorgen. Das vollständige Gerät einer geeigneten Sammelstelle für Elektrogeräte und Batterien zuführen. Verpackungs- und Montagematerialien von Kindern fernhalten.

## Querverweise

WiPro III 

Anlernvorgang 

Funk-Handsender 868 

Pro-Finder 

G.A.S.-pro III 

G.A.S.-connect 

Systemüberblick 

Störungsbeseitigung
