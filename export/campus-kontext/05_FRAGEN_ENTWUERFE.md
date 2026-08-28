# Fragen-Entwürfe für Campus 1.0

Redaktionsfertige Entwürfe im Campus-Didaktikformat (Auflösung / Typische Fehler / Mitnehmen).
Richtige Antworten mit ✓. Distraktoren sind bewusst plausible Praxis-Irrtümer und wurden gegen
`04_FAKTEN_KOMPAKT.md` geprüft (kein Distraktor ist versehentlich wahr). Übertragung in die
JSON-Fragensätze unter `Campus Quiz/public/data/inseln/` erfolgt durch die Campus-KI.

E1–E4 setzen die Support-Aufträge vom 27.08. um; E5–E12 füllen belegte Wiki-Lücken.

---

## E1 · SAMSØ — Pro-Finder im VW Crafter *(Support-Auftrag S3)*

**Frage:** Ein VW Crafter bekommt eine WiPro III mit Pro-Finder. Wo wird der Pro-Finder eingebaut?

- A) Im Motorraum, nahe der Batterie — kurze Versorgungswege ✗
- B) **Hinter dem Tacho (Kombiinstrument)** ✓
- C) Unter dem Fahrzeugboden, geschützt durch das Reserverad ✗
- D) Sichtbar auf dem Armaturenbrett, für besten GPS-Empfang ✗

**Auflösung:** Beim VW Crafter wird der Pro-Finder hinter dem Tacho eingesetzt. Der Platz ist
trocken, diebstahlgeschützt und liegt hinter Kunststoff — der GPS-Empfänger wird kaum durch
Metall abgeschirmt. Die Geräteoberseite („GPS inside") zeigt nach oben.
**Typische Fehler:** Motorraum und Unterboden scheiden aus — der Pro-Finder gehört in den
trockenen Innenraum. Sichtbare Montage widerspricht dem Diebstahlschutz: Ein Dieb soll das
Ortungsmodul nicht finden.
**Mitnehmen:** Pro-Finder: trocken, versteckt, Oberseite nach oben — beim Crafter hinter den Tacho.
**Quelle:** Support-Meeting 27.08.2026; allgemeine Regeln `pro-finder.md`.

## E2 · FEHMARN — Magenta-Sequenz *(Support-Auftrag F3)*

**Frage:** Eine G.A.S.-pro III blinkt mit beiden LEDs wiederholt rot, grün, magenta, blau, gelb
und türkis, dazu ein auf- und abschwellender Dauerton. Was meldet das Gerät?

- A) Gasalarm mit gleichzeitigem CO-Alarm ✗
- B) **Übertemperatur — Gerätetemperatur über 60 °C** ✓
- C) Selbsttest nach dem Einschalten ✗
- D) Firmware-Update wird installiert ✗

**Auflösung:** Die mehrfarbige Sequenz inklusive Magenta ist die Übertemperatur-Warnung
(> 60 °C). Wärmequelle und Einbauort prüfen, Gerät abkühlen lassen, Wiederholung dokumentieren.
Wichtig: Bei Übertemperatur geht **keine Meldung an die WiPro** — der Kunde bemerkt am
Alarmsystem nichts.
**Typische Fehler:** Ein Gasalarm zeigt sich als schnell rot blitzende Sensor-LED, nie
mehrfarbig. Die Einschaltsequenz ist kurz (rot, grün, blau) mit steigender Tonfolge.
**Mitnehmen:** Regenbogen-Blinken = zu heiß, nicht Gas — und die WiPro schweigt dazu.
**Quelle:** `gas-pro-iii.md` (LED-Tabelle); Support-Meeting 27.08.2026.

## E3 · FEHMARN — Alarm-SMS für die zweite Nummer *(Support-Auftrag F4, ersetzt bisherige Frage)*

**Frage:** „Meine Frau bekommt keine Alarm-SMS, bei mir kommt alles an." Beide Nummern sind im
Pro-Finder gespeichert. Was ist die wahrscheinlichste Ursache?

- A) **Die zweite Rufnummer ist nicht als Smartphone gekennzeichnet** ✓
- B) Der Pro-Finder unterstützt nur eine Zielrufnummer ✗
- C) Die SIM der Frau ist im falschen Netz eingebucht ✗
- D) Alarm-SMS gehen immer nur an die Masternummer ✗

**Auflösung:** Zielrufnummern müssen korrekt gekennzeichnet programmiert sein — für
Smartphone-Funktionen (u. a. GPS-Kartenlink) ist die Smartphone-Kennzeichnung nötig.
Zweiter Prüfpunkt: Der Pro-Finder versendet Alarm-SMS **nacheinander**; wird der Alarm schnell
unscharf geschaltet, bleiben später gespeicherte Nummern unbenachrichtigt — beim Test genug
Zeit einplanen.
**Typische Fehler:** Bis zu 10 Zielrufnummern sind möglich; die Masternummer ist nur die erste
autorisierte Nummer, kein exklusiver Empfänger.
**Mitnehmen:** Bei der Übergabe jede Zielrufnummer einzeln testen — Kennzeichnung prüfen und
dem Alarm Zeit zum Senden lassen.
**Quelle:** Support-Meeting 27.08.2026; `pro-finder.md`, `app-befehle.md`.

## E4 · FEHMARN — CO-Sensor testen *(entschärfter Ersatz für die Feuerzeug-Frage, solange Konflikt F2 offen ist)*

**Frage:** Darf der CO-Sensor einer G.A.S.-pro III CO mit Feuerzeuggas getestet werden?

- A) Ja, kurz an die Sensoröffnung sprühen ✗
- B) Ja, aber nur bei ausgeschalteter WiPro ✗
- C) **Nein — der CO-Sensor reagiert nur auf Kohlenmonoxid; Feuerzeuggas, Propan und Butan sind ungeeignet** ✓
- D) Ja, mit Abgasen aus einem laufenden Motor ✗

**Auflösung:** Der CO-Sensor reagiert ausschließlich auf Kohlenmonoxid. Feuerzeuggas ist ein
Flüssiggas und löst dort nichts aus. Niemals Abgase, offene Flammen oder unkontrollierte
Verbrennung ins Fahrzeug einleiten. Das Gerät hat einen automatischen Sensorselbsttest.
**Typische Fehler:** „Irgendein Gas wird schon reichen" — Gas- und CO-Detektion sind getrennte
Sensorik. Der Abgas-„Test" ist eine echte Gefährdung.
**Mitnehmen:** CO-Sensor nie mit Feuerzeuggas testen — und aufs Exp. Date schauen.
**Quelle:** `co-sensor.md` („CO-Sensor niemals mit Feuerzeuggas, Propan oder Butan testen").

## E5 · HIDDENSEE/USEDOM — NFC Modul zuerst anlernen?

**Frage:** Eine neue WiPro III wird eingebaut. Der Kunde hat nur NFC Modul und KeyCard bestellt.
Kann direkt angelernt werden?

- A) Ja, das NFC Modul kann als erstes Zubehör angelernt werden ✗
- B) **Nein — zuerst muss ein Funk-Handsender 868 als Master-Handsender gespeichert werden** ✓
- C) Ja, aber nur über die THITRONIK App ✗
- D) Nein, KeyCards funktionieren nur mit safe.lock ✗

**Auflösung:** Das NFC Modul darf nicht als erste Funk-Komponente angelernt werden — zuerst
einen Funk-Handsender 868 als Master speichern. Außerdem zwei getrennte Speicher beachten:
Modul-an-WiPro und NFC-Medien-am-Modul.
**Typische Fehler:** KeyCard braucht kein safe.lock (nur die ZV-Bedienung braucht es); die App
umgeht die Master-Handsender-Regel nicht.
**Mitnehmen:** Erst Handsender als Master, dann NFC Modul, dann Medien — Angebot ohne
Handsender ist unvollständig.
**Quelle:** `nfc-modul.md`.

## E6 · HIDDENSEE — Aderendhülsen-Falle

**Frage:** Auf der Werkbank liegen ein alter G.A.S.-pro und eine neue G.A.S.-pro III. Wie werden
die Anschlussleitungen vorbereitet?

- A) Beide mit Aderendhülsen ✗
- B) Beide ohne Aderendhülsen, Enden verzinnen ✗
- C) **G.A.S.-pro mit Aderendhülsen; G.A.S.-pro III ohne Aderendhülsen und ohne Verzinnen** ✓
- D) Egal — Hauptsache der Querschnitt stimmt ✗

**Auflösung:** Die Vorschriften sind gegenläufig: Beim G.A.S.-pro Aderendhülsen verwenden, bei
der G.A.S.-pro III (Federklemmen, 0,2–0,75 mm²) keine Aderendhülsen und Leitungsenden nicht
verzinnen. Falsche Vorbereitung ist eine dokumentierte Ursache für Sensorfehler-Meldungen.
**Typische Fehler:** Die Gewohnheit vom alten Gerät aufs neue übertragen — genau davor warnt
die Störungstabelle („Aderendhülsen oder verzinnte Enden ausschließen").
**Mitnehmen:** Erst Typenschild lesen, dann Leitung vorbereiten.
**Quelle:** `co-sensor.md`, `gas-pro-iii.md`.

## E7 · LANGELAND — CO-Sensor mit Verfallsdatum

**Frage:** Was muss bei der Übergabe eines Fahrzeugs mit G.A.S.-pro III CO zusätzlich erklärt
und dokumentiert werden?

- A) **Das Exp. Date auf dem Typenschild — spätestens dann muss der CO-Sensor durch THITRONIK ersetzt werden (kostenpflichtiger Service)** ✓
- B) Der CO-Sensor hält so lange wie das Gerät selbst ✗
- C) Der Kunde kann den CO-Sensor selbst nachkaufen und tauschen ✗
- D) Ein jährlicher Feuerzeugtest ersetzt den Sensortausch ✗

**Auflösung:** CO-Sensoren altern chemisch. Das Verfallsdatum steht als „Exp. Date" (Monat/Jahr)
auf dem Typenschild; der Austausch erfolgt durch THITRONIK und ist kostenpflichtig. Datum bei
der Übergabe notieren — das ist ein legitimer Service-Anlass.
**Typische Fehler:** Selbsttausch ist nicht vorgesehen; ein Gastest ersetzt keinen Sensortausch
(und CO wird ohnehin nicht mit Feuerzeuggas getestet).
**Mitnehmen:** Exp. Date in die Akte und in den Kundenkalender.
**Quelle:** `gas-pro-iii.md`, `co-sensor.md`.

## E8 · USEDOM — Der 100-Sender-Speicher

**Frage:** Ein Flottenkunde plant 6 Magnetkontakte, 4 Handsender, 2 Kabelschleifen, Gaswarner,
Rauchmelder und Wassermelder an einer WiPro III. Worauf ist bei noch größeren Ausbauten zu achten?

- A) Pro Zubehörtyp sind maximal 10 Geräte möglich ✗
- B) **Die WiPro III speichert insgesamt höchstens 100 Funksender — alle Zubehörarten teilen sich diesen Speicher** ✓
- C) Funkzubehör ist unbegrenzt anlernbar ✗
- D) Jeder Zubehörtyp hat einen eigenen Speicher mit 100 Plätzen ✗

**Auflösung:** Der Funkspeicher fasst maximal 100 Sender, gemeinsam für Magnetkontakte,
Handsender, Kabelschleifen und weiteres Funk-Zubehör. Für normale Ausbauten reichlich — bei
Sonderaufbauten (Verkaufsfahrzeuge, viele Klappen) gehört der Speicherstand in die Planung.
**Typische Fehler:** „Eigener Speicher pro Typ" und „unbegrenzt" klingen plausibel, stimmen
aber nicht.
**Mitnehmen:** Ein Speicher, 100 Plätze, alle teilen sich ihn.
**Quelle:** `funk-magnetkontakt.md` (WiPro-Abschnitt).

## E9 · FEHMARN — Zwei-Sekunden-Ton beim Öffnen

**Frage:** Beim Öffnen der Heckgarage ertönt aus der WiPro-Zentrale ein ~2 Sekunden langer
Signalton; am Magnetkontakt bleibt die rote Sende-LED etwa 30 Sekunden sichtbar. Was ist zu tun?

- A) Kontakt neu anlernen, danach Testalarm ✗
- B) **CR2032 des betroffenen Kontakts zeitnah ersetzen — kein Neu-Anlernen nötig; Funktion und Reichweite danach prüfen** ✓
- C) Die Zentrale meldet einen Sabotageversuch — Support kontaktieren ✗
- D) DIP 7 auf ON stellen ✗

**Auflösung:** Das ist die Niederbatterie-Signatur (unter ~2,6 V): 2-Sekunden-Ton aus der
Zentrale plus lang nachleuchtende Sende-LED am betroffenen Sender. Nach dem Batteriewechsel
bleibt die Funkzuordnung erhalten. Sinnvoll: weitere Knopfzellen ähnlichen Alters gleich
mitprüfen.
**Typische Fehler:** Neu-Anlernen ist unnötig; DIP 7 betrifft Anti-Jamming, nicht Batterien.
**Mitnehmen:** Langer Ton + lange LED = leere Knopfzelle, nicht kaputter Kontakt.
**Quelle:** `wipro-iii.md`, `funk-magnetkontakt.md`.

## E10 · USEDOM/LANGELAND — Geofencing vor der Halle

**Frage:** Ein Kunde stellt sein Fahrzeug mit Pro-Finder über den Winter in eine Halle. Welcher
Hinweis gehört zur Übergabe?

- A) Den Pro-Finder komplett stromlos machen ✗
- B) **Vor dem Abstellen `fence aus` senden — GPS-Reflexionen in Hallen können sonst Geofencing-Fehlalarme auslösen** ✓
- C) Geofencing deaktiviert sich in Gebäuden automatisch ✗
- D) Die SIM-Karte für den Winter entnehmen ✗

**Auflösung:** Das Geofencing (virtueller Zaun, Auslösung ab ~1 km) ist bei scharfgeschalteter
WiPro automatisch aktiv. In Hallen können reflektierte GPS-Signale Positionssprünge vortäuschen
→ stiller Alarm ohne echte Bewegung. Deshalb vor dem Hallenparken `fence aus`.
**Typische Fehler:** Stromlos machen kostet den kompletten Schutz und ist keine Lösung;
automatisch abschalten kann sich die Funktion nicht.
**Mitnehmen:** Halle = `fence aus`, Ausparken = Geofencing wieder aktivieren.
**Quelle:** `glossar.md` (Geofencing), `pro-finder.md`.

## E11 · FEHMARN — Gerät stumm bei laufendem Motor

**Frage:** Ein Kunde meldet: „Beim Fahren zeigt die G.A.S.-pro III einen Alarm nur über die
LEDs — Sirene und WiPro-Meldung bleiben aus." Der IGN-Anschluss liegt an Klemme 15. Defekt?

- A) Ja — die interne Sirene ist ausgefallen ✗
- B) **Nein — bei anliegender Zündspannung ist das Gerät bestimmungsgemäß stummgeschaltet: keine Sirene, keine Funkmeldung, kein SIR+; Alarme bleiben nur optisch sichtbar** ✓
- C) Nein — während der Fahrt sind Gasalarme generell deaktiviert ✗
- D) Ja — der Funkkanal zur WiPro ist gestört ✗

**Auflösung:** Genau das ist die IGN-Funktion: Solange Klemme 15 Spannung führt, unterdrückt
das Gerät Sirene, Funkmeldung und SIR+ — der Alarm bleibt über die LEDs sichtbar. Die
Versorgung läuft dabei dauerhaft weiter; IGN ist kein Versorgungsanschluss. Nach dem Einbau
das Verhalten bei Zündung ein/aus kontrollieren.
**Typische Fehler:** „Gasalarm während der Fahrt deaktiviert" stimmt nicht — die Detektion
läuft, nur die akustische/Funk-Ausgabe ist stumm.
**Mitnehmen:** Zündung an = Gerät stumm, LEDs bleiben — dem Kunden vorher erklären.
**Quelle:** `gas-pro-iii.md` (Zündungsanschluss IGN).

## E12 · LANGELAND — Blinkcode nach dem Urlaub

**Frage:** Nach dem Unscharfschalten ertönen ein langer und zwei kurze Signaltöne, die
Status-LED blinkt wiederholt 3× mit 5 Sekunden Pause. Was ist passiert?

- A) Die Batterie eines Funk-Handsenders ist leer ✗
- B) **Während der Abwesenheit gab es einen Alarm des Funk-Gaswarners (G.A.S.-pro III / CO)** ✓
- C) Ein Störsender wurde erkannt ✗
- D) Die Anlage hat einen Selbsttest durchgeführt ✗

**Auflösung:** Ein langer + zwei kurze Töne beim Unscharfschalten = Alarmspeicher belegt. Das
Blinkmuster nennt den Grund: 3× = Funk-Gaswarner. (1× Kabinentüren, 2× Magnetkontakt,
4× Kabelschleife, 9× Störsender, 10× Pro-Finder, 11× Innenbeleuchtung.) Mit Pro-Finder kommt
der Grund zusätzlich als Klartext-SMS. Ursache prüfen, bevor der Speicher als erledigt gilt.
**Typische Fehler:** Störsender wäre 9×; die Batteriewarnung ist der 2-Sekunden-Ton beim
Betätigen, nicht diese Tonfolge.
**Mitnehmen:** Erst Blinkcode lesen, dann handeln — der Alarmspeicher ist das Kurzprotokoll
der Anlage.
**Quelle:** `wipro-iii.md` (Alarmspeicher-Tabelle).
