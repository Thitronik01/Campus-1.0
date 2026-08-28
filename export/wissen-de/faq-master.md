# FAQ Master — Alle häufigen Fragen auf einen Blick

Route: /de/faq-master | Stand: 2026-07-15 | Sichtbarkeit: standard
Quelle: Thitronik Online/project-data/runtime/wiki/wiki-articles/de/faq-master.json

---
FAQ Master — Alle häufigen Fragen auf einen Blick

Dieser FAQ-Master beantwortet häufige Fragen kurz und verweist für Voraussetzungen, Grenzwerte und vollständige Abläufe auf die jeweiligen Fachartikel. Produktverfügbarkeit, Preise, Mobilfunknetze und Fahrzeugfreigaben können sich ändern und müssen vor Bestellung oder Einbau aktuell bestätigt werden.

Sicherheitsregel: Bei Gas-, CO-, Rauch-, Hitze- oder Brandanzeichen das Fahrzeug verlassen, Personen warnen und erforderlichenfalls den Notruf wählen. Sicherheitsfunktionen, Fahrzeugverkabelung und Stilllegung nicht anhand einer Kurzantwort verändern.

## Inhaltsverzeichnis

Allgemeines und Support 

WiPro III und safe.lock 

Pro-Finder 

BT-connect und Vernetzungsmodul 

NFC Modul und App 

Gaswarner 

Funk-Zubehör 868 MHz 

Sensoren 

safe.lock Umrüstplatine 

Batterien und Standzeiten 

Anlernen, Löschen und Diagnose 

## Allgemeines und Support

Was ist bei Rückgabe, Garantie oder Reparatur zu tun? 

Zuerst Rechnungssteller oder einbauenden Betrieb kontaktieren. Fehlerbeschreibung, Kaufbeleg und — soweit erforderlich — Fotos von Typenschild und Einbau bereithalten. Keine Zugangsdaten oder vollständigen SIM-PINs in ein Ticket schreiben.

Darf ich bei einem akuten Sicherheitsereignis weiter testen? 

Nein. Bei Gas-/CO-/Rauchalarm, Gasgeruch, Hitze, Rauchentwicklung, Arbeiten am Bordnetz, Aussperrung oder unbeabsichtigter Stilllegung gelten die Eskalationsgrenzen aus der Support-Fallaufnahme. Keine riskante Ferndiagnose fortsetzen.

→ Störungsbeseitigung — Sichere Diagnose häufiger Probleme 

## WiPro III und safe.lock 

Welches Fahrzeug ist kompatibel? 

Die genaue Baureihe, das Modelljahr, die WiPro-Variante, der Serien-/Softwarestand, das Fahrzeugprofil und die Anbindung müssen zusammen passen. Die Übersicht steht unter Fahrzeugkompatibilität — Übersichtsmatrix & DIP-Grundlagen .

Was ist der Unterschied zwischen WiPro III und WiPro III safe.lock ? 

safe.lock ergänzt eine fahrzeugabhängige Schlüsselsicherheits- und Zentralverriegelungslogik. Es ist keine eigene Zutrittsmethode, keine pauschale Wegfahrsperre und nicht mit der separaten Abschalteinrichtung gleichzusetzen. Siehe Zugangsmedien & Bedienung — Zutrittswege im THITRONIK-System .

Der Original-Fahrzeugschlüssel bedient die WiPro nicht — warum? 

Bei bewusst aktiviertem Replay-Schutz kann dieses Verhalten vorgesehen sein. Andernfalls Fahrzeugprofil, DIP-Stellung und CAN-Anschluss durch Fachpersonal prüfen lassen. Replay-Schutz nicht pauschal deaktivieren.

Die Status-LED blinkt nach einem Alarm neunmal — was bedeutet das? 

Der Alarmspeicher meldet ein Anti-Jamming- beziehungsweise Störsenderereignis. Ort, Zeitpunkt und mögliche Funkstörquellen dokumentieren. Anti-Jamming nicht pauschal abschalten; DIP 7 nur nach dokumentierter Folgenabschätzung ändern.

Kann eine WiPro III mit der safe.lock Umrüstplatine erweitert werden? 

Nur bei dokumentierter Fahrzeug-/Schlüsselvariante und zusammen mit einer WiPro III safe.lock. Die Platine mit Art. 101052 ist kein eigenständiges Alarmprodukt; Einbau und Transponderkopie gehören in die Hand eines erfahrenen Premiumpartners. Siehe safe.lock Umrüstplatine — Schlüsselsicherheit für Ducato/Boxer/Jumper .

→ WiPro III — Funk-Alarmsystem für Freizeitfahrzeuge · Störungsbeseitigung — Sichere Diagnose häufiger Probleme 

## Pro-Finder 

Welche SIM-Karte und PIN-Einstellung brauche ich? 

Vollständige Seriennummer | SIM-Format | PIN-Regel | 
 0699-001 bis 0699-007 | Mini-SIM | PIN 0000 , PIN-Abfrage aktiv | 
 0699-008 bis 0699-044 | Micro-SIM | PIN 0000 , PIN-Abfrage aktiv | 
 ab 0699-045 | Nano-SIM | PIN-Abfrage vollständig deaktivieren | 

Führende Nullen nicht weglassen. 100699 ist die Artikelnummer; 0699-045 ist eine vollständige Seriennummer und zugleich die dokumentierte Hardware-Schwelle für 4G LTE. Siehe Seriennummern und Softwarestände — Präfixe, Schwellen und Meilensteine .

Welche Mobilfunkanbieter funktionieren? 

Keine statische Anbieterliste als dauerhafte Freigabe verwenden. SMS, Telefonie, Rufnummer, Guthaben, Mailbox/Rufumleitungen, aktuelles Netz am Einsatzort und Roaming getrennt prüfen. Prepaid-Karten sind nicht pauschal ausgeschlossen. Aktuelle Hinweise: Mobilfunk & SIM-Karten — Pro-Finder, App und Smartphone-Einstellungen .

Warum reagiert der Pro-Finder nicht auf SMS? 

Seriennummer, SIM-Format, PIN-Regel, Guthaben, Empfang, Mailbox/Rufumleitungen und den genauen SMS-Wortlaut prüfen. RCS/iMessage beziehungsweise Chat-Funktionen dürfen den Versand als klassische SMS nicht ersetzen. Diagnose nach LED-Zustand und Gerätegeneration durchführen.

Was bedeutet gelbes Blinken? 

Vor und ab 0699-045 hat gelbes Blinken unterschiedliche Bedeutungen. Ohne vollständige Seriennummer ist keine eindeutige Diagnose möglich; die Generationstabelle steht in der Störungsbeseitigung.

Kann ein älteres Gerät auf 4G umgerüstet werden? 

Aus dem FAQ-Master folgt keine aktuelle Upgrade- oder Preiszusage. Seriennummer und derzeit verfügbaren Serviceweg durch THITRONIK oder den Fachbetrieb bestätigen lassen.

Wann werden 2G oder 3G abgeschaltet? 

Zeitpunkte immer aktuell für Land und konkreten Netzbetreiber prüfen. Statische Ländertermine werden hier bewusst nicht geführt.

Was passiert bei 11,2 V? 

Der Pro-Finder sendet eine Spannungswarnung und wechselt zum Tiefentladeschutz in den Standby. Nach Laden der Batterie und einer Versorgung über 12,5 V kehrt er in den Normalbetrieb zurück. Siehe Stromversorgung & Standzeiten — Ruhestrom, Unterspannung und Ladepraxis .

Wie darf die Fahrzeugstilllegung ausgelöst werden? 

Nur mit fachgerecht installierter Abschalteinrichtung und ausschließlich mit kill . Der Befehl schaltet Ausgang A erst, wenn die GPS-Geschwindigkeit mindestens fünf Sekunden durchgehend 0 km/h beträgt. a an ist dafür unzulässig; siehe Abschalteinrichtung — Fahrzeugstilllegung über Pro-Finder .

→ Pro-Finder — GSM/GPS Telemetriemodul · Störungsbeseitigung — Sichere Diagnose häufiger Probleme 

## BT-connect und Vernetzungsmodul

Was ist der dokumentierte Produktstatus? 

Das Bluetooth-Vernetzungsmodul mit Art. 101290 ist in den Unterlagen als seit 09/2025 eingestellt geführt. BT-connect mit Art. 106000 ist der dokumentierte Nachfolger. Die tatsächliche Verfügbarkeit vor Bestellung prüfen; siehe Artikelnummern-Register — Dokumentierte THITRONIK-Produkte und Zubehör .

Kann die App ohne Bluetooth-Verbindung lokal bedienen? 

Nein. BT-connect ist ein Bluetooth-Nahbereichszugang. Ohne aktive Bluetooth-Verbindung steht dieser Bedienweg nicht zur Verfügung; einen geeigneten alternativen Zugangsweg einplanen.

Die Kopplung schlägt fehl — was prüfen? 

Aktive Verbindung ausschließen und den dokumentierten Koppelmodus starten, bis die LED dauerhaft blau leuchtet. Ein vollständiger Reset löscht gespeicherte Geräte und darf nicht mit einer einfachen Neukopplung verwechselt werden.

→ BT-connect — Bluetooth-Modul für WiPro III · Bluetooth-Vernetzungsmodul — Smartphone-Steuerung via Bluetooth 

## NFC Modul und App

Welche Anlagen und Funktionen sind kompatibel? 

Produktgeneration, Seriennummer, Softwarestand und gewünschte Funktion zusammen prüfen. In der App verwendbare Ersatzwerte für eine unbekannte Seriennummer schalten keine Hardwarefunktion frei und sind keine Kompatibilitätsbestätigung.

Darf das NFC Modul als erste Komponente angelernt werden? 

Nein. Nach einem Gesamtlöschen zuerst einen Funk-Handsender 868 anlernen; er wird Master- Handsender . Erst danach das NFC Modul und weitere Komponenten anlernen.

Wie viele NFC-Medien können gespeichert werden? 

Bis zu 14 KeyCards, KeyTags oder KeyStraps. Fremdtags können angelernt, aber kopierbar sein; die LED-Anzeige und Sicherheitsbewertung stehen im Produktartikel.

Welche Batterien verwendet das NFC Modul? 

Ausschließlich drei Alkaline-AAA-Zellen (LR03), keine Akkus oder Lithium-Zellen.

→ NFC Modul — Steuerung der WiPro via NFC · THITRONIK® App — Befehle, Einrichtung und Fehlerbehebung 

## Gaswarner

### Produktabgrenzung

Produkt | Einbindung | Eigene Sirene | Versorgung / Einsatz | 
 G.A.S. — Standalone-Gaswarner mit interner Sirene | Standalone | ja | Festeinbau | 
 G.A.S.-pro (ältere Serie) — Gas- und CO-Alarm | dokumentierte kabelgebundene Systeme | ja | Festeinbau; Version genau prüfen | 
 G.A.S.-pro III — Gaswarner für Freizeitfahrzeuge | produktabhängige Funk-/Systemfunktionen | ja | Festeinbau; Version genau prüfen | 
 G.A.S.-connect — Funk-Gaswarner für WiPro III | Funk zu WiPro III | nein | 12/24 V aus dem Fahrzeug; WiPro III erforderlich | 
 G.A.S.-plug „all in one" — Mobiler Gaswarner | Standalone | ja | mobil an geeigneter 12-V-Steckdose | 

### Häufige Fragen

Was ist bei einem echten oder nicht sicher ausschließbaren Alarm zu tun? 

Personen wecken, Fahrzeug verlassen, lüften nur ohne Eigengefährdung, Zündquellen vermeiden und erforderlichenfalls Rettungsdienst oder Feuerwehr verständigen. Ein Alarm darf nicht allein per Fernsupport als Fehlalarm eingestuft werden.

Wo muss der Sensor montiert werden? 

Montagehöhe, Abstände und Einbaulage aus der Anleitung des konkreten Geräts übernehmen. Werte eines Gaswarners nicht pauschal auf andere Modelle oder auf einen CO-Sensor übertragen.

Was hilft bei einem Kochalarm? 

Beim G.A.S.-pro III schaltet ein kurzer Tasterdruck das Gerät für 60 Minuten stumm; LEDs bleiben aktiv und ein sehr hoher CO-Wert hat Vorrang. Ursache und Lüftung dennoch prüfen.

Warum darf G.A.S.-pro III nicht mit Feuerzeuggas getestet werden? 

Das Gerät verwendet eine komplexe Auswertung statt eines einfachen Schwellwerts. Feuerzeuggas ist kein freigegebener Funktionstest; Selbsttest und Fehleranzeigen nach Anleitung verwenden.

Wozu dient „Alarm OUT“? 

Zum Anschluss eines dokumentierten akustischen Alarmmittels, beispielsweise der Back-up Sirene Art. 100089 . Verdrahtung und Gerätekombination vor Einbau prüfen; siehe Sirenen und Hupen — Akustische Alarmmittel .

## Funk-Zubehör 868 MHz

Der Funk-Magnetkontakt wird erkannt, löst aber nicht korrekt aus — was prüfen? 

Die LED muss vom Magneten weg zeigen. Einbauzustand, Abstand, Ausrichtung und Funkweg prüfen; siehe Funk-Magnetkontakt 868 — Montage und Betrieb .

Was ist bei Klebepads zu beachten? 

Fläche entfetten, bei mehr als 15 °C verarbeiten und 24 Stunden aushärten lassen. Bei Metalluntergrund kann ein dokumentierter Montageadapter erforderlich sein.

Wie viele Funk-Komponenten können angelernt werden? 

Bis zu 100 Sender pro WiPro III. Nach einem normalen Batteriewechsel ist kein Neuanlernen erforderlich.

Welche Mindeststände gelten für den Funk-Wassermelder ? 

WiPro III ab 0823-021 mit 6.8 oder WiPro III safe.lock ab 1050-004 mit 6.7s . Produktlinie und Software gemeinsam prüfen; siehe Funk-Wassermelder 868 — Kabelloser Wassermelder .

Kann die Batterie des T.S.A. gewechselt werden? 

Nein. Die CR123A-Langzeitbatterie ist fest eingebaut. Nach der dokumentierten Batteriewarnung das Gerät ersetzen; siehe T.S.A. — Funk-Rauchmelder für WiPro III .

→ Funk-Handsender 868 — Fernbedienung für WiPro III · Funk-Kabelschleife 868 — Außensicherung für mobile Güter · Anlernvorgang — Funk-Zubehör an WiPro III anlernen 

## Sensoren

Wofür ist der CO-Sensor? 

Er erkennt Kohlenmonoxid und ist ein Zusatzsensor für die dokumentierten G.A.S.-pro-Systeme. Die konkrete Geräte-/Versionskompatibilität vor Bestellung prüfen; siehe CO-Sensor — Kohlenmonoxid-Zusatzsensor .

Wozu dient der Zusatzsensor G.A.S.-pro III? 

Als externer Sensor für Propan, Butan und Narkosegase zur Überwachung eines weiteren Bereichs. Montage und zulässige Kombination stehen unter Zusatzsensor G.A.S.-pro III — Externer Gassensor .

## safe.lock Umrüstplatine

Für welche Fahrzeuge ist die Platine dokumentiert? 

Die Basisanleitung nennt Ducato/Boxer/Jumper und Iveco Daily 2006–2012; spätere Support-Hinweise erweitern die betroffene Ducato-/Boxer-/Jumper-Familie bis Modelljahr 2018. Ab Modelljahr 2019 wird eine Rollcode-Schlüsselgeneration beschrieben. Fahrzeug und Schlüssel immer konkret prüfen.

Was muss vor dem Einbau zwingend geschehen? 

Der Wegfahrsperren-Transponder muss durch einen Premiumpartner kopiert werden. Ohne diesen Schritt kann der Motor mit dem umgerüsteten Schlüssel nicht mehr gestartet werden.

Ist die Umrüstplatine ein eigenes Alarmsystem? 

Nein. Sie ergänzt ausschließlich eine WiPro III safe.lock und ersetzt weder Alarmzentrale noch fachgerechte Fahrzeugprüfung.

Welche Sicherheitslücke adressiert sie? 

Sie ersetzt bei den dokumentierten Schlüsselvarianten den unsicheren Funkweg zur Zentralverriegelung durch eine codierte THITRONIK-Lösung und reduziert damit das Replay-Risiko.

→ safe.lock Umrüstplatine — Schlüsselsicherheit für Ducato/Boxer/Jumper 

## Batterien und Standzeiten

Welche Versorgung gilt für welche Komponente? 

Komponente | Versorgung | Wartungshinweis | 
 Funk-Handsender 868, Funk- Magnetkontakt 868, Funk-Kabelschleife 868 | CR2032, 3 V | typischerweise etwa zwei Jahre; nach Wechsel kein Neuanlernen | 
 Funk- Wassermelder 868 | CR2032 | produktspezifische Warnanzeige beachten | 
 NFC Modul | 3× Alkaline AAA (LR03) | keine Akkus oder Lithium-Zellen | 
 T.S.A. Funk-Rauchmelder | CR123A fest eingebaut | bei Batteriewarnung Gerät ersetzen | 
 G.A.S.-connect | 12/24 V aus dem Fahrzeug | keine CR2032; bei Ausfall Versorgung und Anschluss prüfen | 

Wie werden schwache CR2032-Zellen gemeldet? 

Je nach Sendergeneration etwa fünf Sekunden gelbe Anzeige oder etwa zwei Sekunden Signalton der WiPro mit ungefähr 30 Sekunden roter Sender-LED. Gleich alte Knopfzellen sind häufig gemeinsam zu tauschen.

Warum kann die Starterbatterie nach längerer Standzeit leer sein? 

THITRONIK-Ruheströme, Fahrzeuggrundlast und Selbstentladung addieren sich. Eine leere Batterie nicht ohne Messung allein der Alarmanlage zuschreiben.

Welche Ruheströme sind dokumentiert? 

Als Richtwerte etwa 11 mA für WiPro III safe.lock und etwa 16–25 mA für Pro-Finder, zusammen etwa 27–36 mA — ohne Fahrzeugverbrauch. Siehe Stromversorgung & Standzeiten — Ruhestrom, Unterspannung und Ladepraxis .

## Anlernen, Löschen und Diagnose

Wie starte ich den Anlernmodus direkt an der WiPro III? 

Zentrale unscharf schalten, Gehäuse öffnen und Taster „B“ halten, bis ein langer Signalton ertönt. Komponente gemäß Produkttabelle auslösen und den Modus anschließend mit kurzem Druck auf „B“ beenden. Einbau- und Sicherheitsbedingungen beachten.

Welche Easy-Add -Verfahren gibt es? 

Easy-Add 1.0 verwendet einen bereits angelernten Handsender, Easy-Add 2.0 eine kompatible CAN-Anbindung und Easy-Add 3.0 die App über Pro-Finder oder Bluetooth-Vernetzungsmodul. Voraussetzungen nicht vermischen.

Wie lösche ich Zubehör? 

Beim teilweisen Löschen bleibt nur der zuerst angelernte Master-Handsender erhalten. Beim Gesamtlöschen werden alle Sender entfernt; danach zuerst einen Funk-Handsender und anschließend alle weiteren Komponenten neu anlernen. Über CAN ist kein Löschen möglich.

Was darf bei Diagnoseproblemen nicht pauschal geändert werden? 

Replay-Schutz, Anti-Jamming und andere Sicherheitsfunktionen nicht ohne dokumentierte Ursache und Folgenabschätzung deaktivieren. Sicherungsreset nicht als Dauerlösung verwenden und Fahrzeugverkabelung nur durch qualifiziertes Personal ändern.

→ Anlernvorgang — Funk-Zubehör an WiPro III anlernen · Störungsbeseitigung — Sichere Diagnose häufiger Probleme 

## Querverweise

Systemüberblick — THITRONIK-Produktwelt 

Zugangsmedien & Bedienung — Zutrittswege im THITRONIK-System 

Störungsbeseitigung — Sichere Diagnose häufiger Probleme 

Seriennummern und Softwarestände — Präfixe, Schwellen und Meilensteine 

Artikelnummern-Register — Dokumentierte THITRONIK-Produkte und Zubehör 

Glossar — Fachbegriffe im THITRONIK-System
