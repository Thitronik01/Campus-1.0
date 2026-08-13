---
title: Glossar — Fachbegriffe im THITRONIK-System
sources:
  - wiki/_index.md
  - wiki/wipro-iii.md
  - wiki/pro-finder.md
  - wiki/gas-pro-iii.md
  - wiki/fahrzeugkompatibilitaet.md
  - wiki/anlernvorgang.md
  - wiki/nfc-modul.md
  - wiki/funk-rauchmelder.md
  - wiki/sirenen-hupen.md
  - sources/37_faq.md
  - sources/Renault Traffic III.docx
  - >-
    sources/WiPro_QuickStart_DE_RAG_Pack/WiPro__QuickStart__Alarm_Ventcheck_Panikalarm_DE.md
  - sources/WiPro_safe-lock_DE_FULL_RAG_from_multilang/01_index.md
updated: '2026-07-14'
confidence: high
lang: de
dealerStatus: approved
---

# Glossar — Fachbegriffe im THITRONIK-System

Nachschlagewerk für wiederkehrende Begriffe aus Anleitungen, FAQs und Wiki-Seiten. Jeder Eintrag verlinkt auf die Wiki-Seite mit den Detail-Informationen.

> **Hinweis für Redaktion und KI:** Für kanonische Schreibweisen, Aliasnamen und Fehlerschreibweisen siehe zusätzlich [[Terminologie & Schreibweisen]].

---

## Inhaltsverzeichnis

- [Fahrzeug-Elektrik & Anschlüsse](#fahrzeug-elektrik--anschlüsse)
- [WiPro III — Alarmzentrale & Funktionen](#wipro-iii--alarmzentrale--funktionen)
- [Anlernen & Funk-System](#anlernen--funk-system)
- [Gaswarnung & Rauchmelder](#gaswarnung--rauchmelder)
- [Pro-Finder — GSM/GPS & Telemetrie](#pro-finder--gsmgps--telemetrie)
- [Bluetooth / NFC / App](#bluetooth--nfc--app)
- [Batterien & Bauteile](#batterien--bauteile)

---

## Fahrzeug-Elektrik & Anschlüsse

### Alarm OUT
Ausgang am [[GAS]] / [[GAS-pro]] / [[GAS-pro III]], der im Alarmfall gegen Masse schaltet (max. 0,10 A bei G.A.S.). Wird häufig an das blaue Triggerkabel der [Back-up Sirene](sirenen-hupen.md#back-up-sirene-art-100089) geführt. → [[Sirenen und Hupen]]

### CAN-Bus (Controller Area Network)
Serieller Fahrzeugdatenbus, über den Steuergeräte miteinander kommunizieren (Zentralverriegelung, Zündung, Blinker etc.). Die WiPro III liest darüber Schlüssel-Signale und steuert Blinker/Hupe. Der richtige CAN-Strang wird über die [DIP-Schalter](#dip-schalter-sw1sw8) ausgewählt. → [[Fahrzeugkompatibilität]]

### CAN-H / CAN-L
Die beiden **verdrillten Datenleitungen** des CAN-Busses. CAN-H führt die höhere, CAN-L die niedrigere Signalspannung. Eine **Verwechslung von CAN-H und CAN-L** ist eine der häufigsten Ursachen, wenn die WiPro III nicht auf den Fahrzeugschlüssel reagiert. → [[Störungsbeseitigung]]

### IGN-Eingang (Ignition)
Zündungs-Eingang (Klemme 15) am [[GAS-pro III]] und anderen Komponenten. Bei eingeschalteter Zündung werden bestimmte Alarme automatisch stummgeschaltet (z. B. Gasalarm beim Fahren durch Motorabgase).

### Klemme 15 (Kl. 15, „Zündungsplus")
+12 V, die **nur bei eingeschalteter Zündung** anliegen. Wichtigster Anschluss für den IGN-Eingang am G.A.S.-pro III und für zündungsabhängige Zusatzfunktionen der WiPro III.

### Klemme 30 (Kl. 30, „Dauerplus")
+12 V Dauerspannung direkt von der Fahrzeugbatterie, auch bei abgezogenem Zündschlüssel. Versorgt WiPro III, Pro-Finder, Back-up Sirene und alle Alarmkomponenten.

### Klemme 31 (Kl. 31, „Masse" / GND)
Fahrzeugmasse (0 V). Sternförmig an einem zentralen Massepunkt anschließen — keine Ketten-Masseverbindungen quer durch das Fahrzeug legen.

### OBD-Stecker
Standardisierter **On-Board-Diagnose-Stecker** (meist unter dem Armaturenbrett). Bei einigen Fahrzeugen werden CAN-H/CAN-L und Klemme 15 dort abgegriffen (z. B. VW T6/T6.1). → [[Fahrzeugkompatibilität]]

### Spannungsspitzenkiller
Schutzbauteil (z. B. LAS 16585), das Spannungsspitzen aus Solaranlagen oder Lichtmaschinen abbaut. Empfohlen bei Fiat Ducato mit Solaranlage, wenn der Pro-Finder unerklärlich „abstürzt". → [[Pro-Finder]]

### Wegfahrsperre (Immobilizer)
Fahrzeugeigenes Diebstahlschutzsystem. Die THITRONIK® **[[Abschalteinrichtung]]** (Art. 101283 / 105821) ergänzt diese um eine per SMS fernschaltbare [Kill-Funktion](#kill-funktion).

---

## WiPro III — Alarmzentrale & Funktionen

### Alarmspeicher
Nach einem Alarm blinkt die **Status-LED** der WiPro III in einem Muster, das die Alarmursache anzeigt (z. B. 9× = [Anti-Jamming](#anti-jamming)). Wird beim nächsten Scharfschalten gelöscht. → [[WiPro III]]

### Anti-Jamming
Erkennung von **Störsendern**, die Funkkontakt zwischen Zentrale und Funk-Zubehör blockieren wollen. Bei anhaltender Störung löst die WiPro einen Jamming-Alarm aus (Status-LED 9× blinkend). Bei ständigen Fehlalarmen in störungsreicher Umgebung kann die Funktion über **DIP 7 = ON** deaktiviert werden. → [[Störungsbeseitigung]]

### DIP-Schalter (SW1–SW8)
Kleine Wahlschalter im Gehäusedeckel der WiPro III, mit denen Fahrzeugtyp und Sonderfunktionen eingestellt werden:

- **SW1–SW4** = CAN-Bus-Protokoll / Fahrzeugfamilie
- **SW5–SW8** = Sonderfunktionen (z. B. SW5 = Replay-Schutz, SW7 = Anti-Jamming-Abschaltung)

→ Vollständige Matrix: [[Fahrzeugkompatibilität]]

### Easy-Add (1.0 / 2.0 / 3.0)
Anlernverfahren für Funk-Zubehör (Magnetkontakt, Handsender, Kabelschleife, Rauchmelder):

- **Easy-Add 1.0** — nach einer Stromunterbrechung innerhalb von 30 Sekunden die „Lautsprecher"-Taste eines bereits angelernten Handsenders **5×** drücken.
- **Easy-Add 2.0** — bei kompatibler CAN-Anbindung nach einer Stromunterbrechung innerhalb von 30 Sekunden die Fahrertür **5×** öffnen und schließen.
- **Easy-Add 3.0** — den Anlernmodus über die THITRONIK® App starten; erfordert einen Pro-Finder oder ein kompatibles Bluetooth-Modul und den passenden Softwarestand.

→ Ausführlich: [[Anlernvorgang]]

### Panikalarm
Bewusst ausgelöster Alarm durch **gleichzeitiges Drücken beider Tasten** am [[Funk-Handsender]]. Aktiviert Sirene + Blinker. Beenden: beliebige Handsender-Taste. → [[WiPro III]]

### Replay-Schutz
Verhindert, dass ein aufgezeichnetes Fahrzeug-Schlüsselsignal erneut abgespielt und so die WiPro deaktiviert wird. Aktiviert über **DIP 5 = ON**. Nebeneffekt: Originalschlüssel funktioniert danach nicht mehr als WiPro-Bedienteil — Steuerung nur noch über [[Funk-Handsender]], [[BT-connect]] oder [[Pro-Finder]]. → [[Störungsbeseitigung]]

### safe.lock
WiPro-Variante mit zusätzlicher **Schlüsselsicherheit**: Sie verhindert, dass unsichere oder aufgezeichnete Signale des Originalschlüssels zugleich das Fahrzeug öffnen und die Alarmanlage unscharfschalten. Je nach Fahrzeug erfolgt die Zentralverriegelungssteuerung über eine passende safe.lock-Lösung oder eine Umrüstplatine. → [[WiPro III]] · [[safe.lock Umrüstplatine]]

### Campingmodus
Betriebsart bestimmter safe.lock-Fahrzeuge, bei der der Originalschlüssel im Fahrzeug verbleiben kann und die Bedienung über THITRONIK Zubehör erfolgt. Wichtig: Die Entriegelungslogik hängt davon ab, mit welchem Medium zuletzt verriegelt wurde. → [[WiPro III]] · [[Zugangsmedien & Bedienung]]

### Stiller Alarm (Diebstahlmeldung)
Alarm **ohne** Sirene und Blinker — nur SMS-Meldung über Pro-Finder. Wird ausgelöst, wenn das Fahrzeug sich um **> 1 km** vom Ursprungsort entfernt ([Geofencing](#geofencing)). Mit SMS-Befehl `alarm` können Sirene/Blinker nachträglich aktiviert werden. → [[Pro-Finder]]

### Sleep Mode
Energiespar- bzw. Ruhestatus einzelner Fahrzeugsteuergeräte. Kann bei manchen Fahrzeugen die spätere Zentralverriegelungs-Ansteuerung durch safe.lock blockieren. Vor dem Einbau deshalb die fahrzeugspezifischen Wartezeit-Tests beachten. → [[Fahrzeugkompatibilität]]

### Vent-check („Kontakt offen" / Belüftungsfunktion)
Hinweisfunktion beim Scharfschalten, wenn ein Magnetkontakt (Fenster, Dachluke) **absichtlich offen gelassen** wurde (z. B. zum Lüften). Wird beim Einschalten der Zündung mit einer Reihe von Hinweistönen signalisiert. Zum Lüften: Fenster **vor dem Scharfschalten** öffnen. → [[WiPro III]]

---

## Anlernen & Funk-System

### 433 MHz (veraltet)
Frequenz des **alten** THITRONIK®-Funkzubehörs. Seit einigen Jahren ausverkauft, keine Ersatzteile mehr verfügbar. Neue Anlagen nutzen [868 MHz](#868-mhz).

### 868 MHz
Funkfrequenz des aktuellen THITRONIK®-Zubehörs (Handsender, Magnetkontakt, Kabelschleife, Rauchmelder, Wassermelder, NFC Modul). Europaweit lizenzfrei zugelassen. Reichweite bis ca. 75 m.

### Anlernmodus
Zustand der WiPro, in dem neue Funk-Komponenten registriert werden können. Start über Taster „B" auf der Platine (→ langer Piep). Max. **100 Sender** speicherbar. → [[Anlernvorgang]]

### Speicher löschen
Vollständiges Zurücksetzen des Funk-Speichers (alle angelernten Komponenten gelöscht). Muss danach **komplett neu angelernt** werden. → [[Anlernvorgang]]

---

## Gaswarnung & Rauchmelder

### CO (Kohlenmonoxid)
Farb- und geruchloses, **giftiges Verbrennungsgas**. Separater [[CO-Sensor]] als Zusatzsensor für [[GAS-pro]] und [[GAS-pro III]].

### KO-Gase / Narkosegase
Flüssige Chemikalien (z. B. Chloroform, Ether, Industrielösungsmittel), die bei einem **Gasüberfall** über Kanülen durch Dichtungen eingeführt und im Innenraum zu einem narkotisierenden Gasgemisch verdunsten. Werden von [[GAS]], [[GAS-pro]], [[GAS-pro III]], [[GAS-connect]] und [[GAS-plug]] erkannt. → [[GAS]]

### Propan / Butan
Flüssiggase (LPG), schwerer als Luft. Austretendes Gas sammelt sich am Fahrzeugboden → Gaswarner daher **10–30 cm über dem Fußboden** montieren. → [[GAS-pro III]]

### Streulichtprinzip (photoelektrisch)
Messprinzip des [[Funk-Rauchmelder]] T.S.A.: Im Ruhezustand trifft der Lichtstrahl nicht auf die Fotodiode. Rauchpartikel streuen das Licht — die Diode empfängt Streulicht → Alarm. Besonders empfindlich für **Schwelbrände** mit kaltem Rauch.

### UEG (Untere Explosionsgrenze)
Niedrigste Gaskonzentration in Luft, bei der sich ein zündfähiges Gemisch bildet. Die [[GAS]]-Serie alarmiert bei **5 % UEG Butan** — weit unterhalb der Explosionsschwelle als Vorwarnung.

### Ventcheck
→ siehe [Vent-check](#vent-check-kontakt-offen--belüftungsfunktion) unter WiPro III.

---

## Pro-Finder — GSM/GPS & Telemetrie

### 2G / 3G / 4G LTE
Mobilfunkgenerationen. Pro-Finder **vor SN045** nutzt 2G/3G; **ab SN045** zusätzlich 4G LTE. Die Verfügbarkeit von 2G und 3G ist landes- und netzbetreiberabhängig und ändert sich fortlaufend. Vor Reise oder SIM-Wechsel deshalb die aktuelle Netzabdeckung beim Anbieter prüfen. → [[Pro-Finder]] · [[Mobilfunk & SIM-Karten]]

### Geofencing
GPS-basierter „virtueller Zaun" um das Fahrzeug. Bewegt sich das Fahrzeug mehr als **~1 km** vom Ursprungsstandort weg, sendet der Pro-Finder einen [stillen Alarm](#stiller-alarm-diebstahlmeldung). Bei scharfgeschalteter WiPro **automatisch aktiv**. Mit SMS `fence aus` vor dem Parken in Hallen deaktivieren (GPS-Reflexionen → Fehlalarm). → [[Pro-Finder]]

### GNSS (Global Navigation Satellite System)
Oberbegriff für alle Satellitennavigationssysteme (GPS, GLONASS, Galileo, QZSS). Pro-Finder ab SN045 unterstützt **GPS + QZSS**.

### GSM
Global System for Mobile Communications — klassischer 2G-Mobilfunk für SMS und Telefonie. Grundlage für alle SMS-Funktionen des Pro-Finders.

### Kill-Funktion
Ferngesteuerte **Motorabschaltung** per SMS-Befehl `kill`. Setzt die [[Abschalteinrichtung]] (Art. 101283 einpolig / 105821 mehrpolig) an Ausgang A des Pro-Finders voraus. Der Motor wird erst abgeschaltet, wenn die GPS-Geschwindigkeit mindestens 5 Sekunden lang 0 km/h beträgt. → [[Pro-Finder]]

### Masternummer
**Erste Rufnummer** im Pro-Finder-Speicher. Kann jederzeit ohne Gerätezugriff neue Nummern programmieren. Wird bei Einbruch-/Gas-/Panik-/Diebstahlalarm **zusätzlich angerufen** (kostenpflichtig, Pro-Finder legt aber sofort auf). → [[Pro-Finder]]

### Micro-SIM / Nano-SIM
SIM-Kartenformate. **Vor SN045** = Micro-SIM; **ab SN045** = **Nano-SIM**. Vorher Seriennummer prüfen — falsches Format passt mechanisch nicht. → [[Pro-Finder]]

### Pre-paid / Vertragskarte
SIM-Kartentyp. Pro-Finder kennt beide und kann bei Pre-paid-Karten **Guthaben abfragen** (Code `100#` oder `101#` in der Programmier-SMS). Wichtig: Pre-paid-Karte muss **ohne Ausbau** nachladbar sein.

### QZSS
**Quasi-Zenith Satellite System** — japanisches Regionalsystem, das die GPS-Abdeckung in Asien verbessert. Nur als Zusatz relevant; GPS bleibt weltweit Primärquelle.

### RCS / Chat-Funktionen
Rich Communication Services — moderne Messaging-Nachfolge von SMS bei Android. Pro-Finder kann RCS-Nachrichten **nicht** verarbeiten. Daher muss in der Nachrichten-App RCS/Chat **deaktiviert** werden, sonst gelangen Programmier-SMS nicht an. → [[Störungsbeseitigung]]

### Roaming
Mobilfunk-Nutzung in einem fremden Netz (Ausland). Muss beim SIM-Anbieter explizit **aktiviert** sein, sonst sendet der Pro-Finder im Ausland keine SMS.

### SIM-PIN
**Bis SN 0699-044:** PIN auf **0000** setzen, Pinabfrage aktiviert lassen.
**Ab SN 0699-045:** Pinabfrage **komplett deaktivieren**.
→ [[Pro-Finder]]

### Smartphone-Nummer
Rufnummer, die im Pro-Finder-Speicher mit dem Kennzeichen **„S"** markiert ist. Erhält GPS-Position als **anklickbaren Google-Maps-Link** statt als Textkoordinaten. → [[Pro-Finder]]

### Statusbericht
Automatische oder angeforderte SMS/Sprachnachricht mit: WiPro-Zustand, Geofencing, GPS-Position, Geschwindigkeit, Ausgänge A/B, Spannungen U1–U5, Gerätetemperatur (ab SN045), Pre-paid-Guthaben. → [[Pro-Finder]]

---

## Bluetooth / NFC / App

### BT-connect
Aktuelles **Bluetooth-Modul** zur App-Steuerung der WiPro III — Nachfolger des [[Vernetzungsmodul]]s seit September 2025. → [[BT-connect]]

### KeyCard / KeyStrap / KeyTag
NFC-Transponder (ISO 14443-A, MIFARE DESFire EV2) zum Scharf-/Unscharfschalten der WiPro über das [[NFC Modul]]:

- **KeyCard** — Kartenformat (Kreditkartengröße)
- **KeyStrap** — Armband, wasserdicht, für einwandige Scheiben bis 15 mm
- **KeyTag** — kleiner, wasserdichter Anhänger

### MIFARE DESFire EV2
Verschlüsselte NFC-Chip-Familie, auf der die [THITRONIK®-Originaltags](#keycard--keystrap--keytag) basieren. Im Gegensatz zu einfachen NFC-Tags sind diese gegen Kopieren geschützt.

### Schleifring
Elektrisches Bauteil, das **Signale oder elektrische Energie zwischen festen und beweglichen Teilen** überträgt. Im Fahrzeug sitzt der Schleifring typischerweise im Lenkradmodul und ist dort u. a. für **Hupe, Airbag und Lenkradtasten** relevant. In fahrzeugspezifischen WiPro-Einbauten wird darüber teilweise das Hupensignal abgegriffen, z. B. beim [[Renault Master III]].

### THITRONIK® App
Smartphone-App (Android / iOS) zur Steuerung und Konfiguration von WiPro III (safe.lock), Pro-Finder (ab SN045) und BT-connect. Seit SN045 ist die App der **primäre Konfigurationsweg** für den Pro-Finder. → [[App-Befehle]]

### Vernetzungsmodul
**Älteres** Bluetooth-Modul (Art. 101290, V1.6–V2.1), seit September 2025 **abgekündigt**. Nachfolger: [[BT-connect]]. → [[Vernetzungsmodul]]

---

## Batterien & Bauteile

### Alkaline LR03 (AAA)
Standardbatterie für das [[NFC Modul]] (3 Stück). **Keine Akkus, keine Lithium-Primärzellen verwenden.** Wechselintervall: jährlich, idealerweise vor dem Winter.

### CR123A
3-V-Lithium-Langzeitbatterie im [[Funk-Rauchmelder]] T.S.A. **Fest verbaut** — kein Wechsel möglich. Gerätelebensdauer ca. 10 Jahre.

### CR2032
3-V-Lithium-Knopfzelle für alle 868-MHz-Funk-Sender (Handsender, Magnetkontakt, Kabelschleife, Wassermelder, G.A.S.-connect). Laufzeit ca. 2 Jahre. Empfohlene Marken: Panasonic oder Varta — **Duracell wird nicht empfohlen** (Nennspannung sinkt zu früh). → [[Funk-Wassermelder]]

### RJ-Kabel
Verbindungskabel zwischen WiPro III und Pro-Finder mit RJ-Steckern (ähnlich Telefonstecker). Im Lieferumfang des Pro-Finders enthalten.

### Konformitätserklärung
Herstellerdokument zur Funk- und Produktsicherheit eines Geräts. Für Installation und Betrieb gelten stets die dem Produkt zugeordneten Konformitätsunterlagen und Entsorgungshinweise. → [[WiPro III]] · [[safe.lock Umrüstplatine]]

---

## Kontextualisiertes Glossar für Wohnmobil-Alarmsysteme

Diese Tabelle bündelt Kernbegriffe aus Sicht von Alarmanlagen für Wohnmobile. Sie dient als Übersetzungs- und Redaktionshilfe, wenn ein Begriff je nach Kontext anders klingen könnte als in allgemeiner Fahrzeug-, Elektronik- oder IT-Sprache.

| Begriff | Typ | Kontext im THITRONIK-System | Abgrenzung | Beispiel |
|---|---|---|---|---|
| Anlernen | Prozess | Ein Funkzubehör oder NFC-Medium wird in den Speicher der WiPro III oder des NFC Moduls aufgenommen. | Nicht mit Bluetooth-Koppeln gleichsetzen; Bluetooth nutzt Koppelmodus/Pairing. | Funk-Magnetkontakt anlernen, danach Kontakt testen. |
| Anlernmodus | Prozess | Betriebszustand, in dem die Anlage neue Sender oder Zugangsmittel akzeptiert. | Kein Normalbetrieb und kein Alarmzustand. | Anlernmodus starten, Sender auslösen, Bestätigung abwarten. |
| Easy-Add | Prozess | Vereinfachtes Verfahren zum Nachlernen von Funkzubehör, abhängig von Systemversion und Produkt. | Der Name bleibt als Funktionsname erhalten und wird nicht frei übersetzt. | Easy-Add 3.0 für neues Zubehör nutzen. |
| Panikalarm | Funktion | Bewusst ausgelöster Alarm zur Abschreckung oder Hilfeanforderung, typischerweise per Handsender oder Bedienung. | Kein Einbruchalarm durch Sensor und kein technischer Fehleralarm. | Panikalarm löst Sirene/Hupe aus, obwohl kein Kontakt geöffnet wurde. |
| Alarm OUT | Schnittstelle | Schaltausgang eines Gaswarners oder einer Anlage, der bei Alarm ein Signal an weitere Komponenten gibt. | Nicht als akustischer Alarm übersetzen; es ist ein elektrischer Ausgang. | Alarm OUT mit Back-up Sirene verbinden. |
| Vent-check | Funktion | Betriebsart der WiPro III, bei der Lüftungspositionen abgesichert bleiben können. | Produktfunktion; Schreibweise beibehalten. | Vent-check aktivieren, wenn ein Fenster zur Belüftung offen steht. |
| safe.lock | Funktion/Produktmerkmal | Schutz gegen Öffnen über die originale Funkfernbedienung bzw. gegen unsichere Fahrzeug-ZV-Szenarien. | Marken-/Funktionsname mit Punkt; nicht als allgemeines Türschloss übersetzen. | WiPro III safe.lock im Campingmodus betreiben. |
| Pro-Finder | Produkt | GSM/GPS-Modul für SMS-Alarmierung, Standort, Geofencing und Fernfunktionen. | Produktname bleibt unverändert. | Pro-Finder sendet den Standort als Google-Maps-Link. |
| Kill-Funktion | Funktion | Fernsteuerbare Motor-/Startunterbrechung über Pro-Finder und Abschalteinrichtung. | Nicht als Schaden am Motor formulieren; es geht um kontrolliertes Abschalten/Sperren. | Kill-Funktion per SMS auslösen. |
| Geofencing | Funktion | Virtueller Bereich um das Fahrzeug; Verlassen kann eine Meldung auslösen. | Nicht mit GPS-Tracking gleichsetzen; Tracking ist Positionsabfrage, Geofencing ist Bereichsüberwachung. | Geofencing nach dem Abstellen aktivieren. |
| CAN-Bus | Fahrzeugtechnik | Datenbus im Fahrzeug, über den WiPro III Signale wie Zündung, Verriegelung oder Blinker auswerten kann. | Nicht als Stromversorgung beschreiben. | CAN-H und CAN-L korrekt anschließen. |
| Klemme 15 | Fahrzeugtechnik | Geschaltetes Plus, liegt nur bei eingeschalteter Zündung an. | Nicht mit Dauerplus/Klemme 30 verwechseln. | IGN-Eingang an Klemme 15 anschließen. |
| Klemme 30 | Fahrzeugtechnik | Dauerplus direkt aus dem Bordnetz bzw. von der Batterie. | Nicht zündungsabhängig; bleibt auch ohne Schlüssel aktiv. | WiPro III dauerhaft über Klemme 30 versorgen. |
| Klemme 31 | Fahrzeugtechnik | Fahrzeugmasse/GND als elektrischer Rückleiter. | Nicht als Minusleitung beliebig durchschleifen; saubere Massepunkte verwenden. | Masse sternförmig an Klemme 31 führen. |
| Funk-Magnetkontakt | Sensorik | 868-MHz-Sensor für Türen, Fenster, Klappen oder Dachluken. | Nicht mit Reedkontakt allein gleichsetzen; es ist ein Funkzubehör mit Sender. | Funk-Magnetkontakt an der Stauraumklappe montieren. |
| Funk-Kabelschleife | Sensorik/Zubehör | 868-MHz-Außensicherung für bewegliche Gegenstände wie Fahrräder oder Campingmöbel. | Kein Ladekabel und kein Datenkabel. | Kabelschleife durch Fahrradrahmen und Felge führen. |
| Back-up Sirene | Alarmgeber | Zusätzliche Sirene mit eigener Versorgung bzw. separater Alarmwirkung je nach Produkt. | Nicht mit Zusatzhupe gleichsetzen; Sirene und Hupe sind unterschiedliche Alarmgeber. | Back-up Sirene am Alarm OUT betreiben. |
| G.A.S.-pro III | Produkt | Fest verbauter Gaswarner für Propan, Butan, KO-/Narkosegase und je nach Variante CO. | Produktname beibehalten; nicht als generischer Gasdetektor umbenennen. | G.A.S.-pro III mit WiPro III vernetzen. |
| CO-Sensor | Sensorik | Kohlenmonoxid-Sensor für G.A.S.-pro/G.A.S.-pro III-Kontext. | CO ist Kohlenmonoxid, nicht Kohlendioxid/CO2. | CO-Sensor in geeigneter Höhe montieren. |
| NFC Modul | Zugang/Bedienung | Modul zur Bedienung per KeyCard, KeyStrap oder KeyTag. | Nicht als Bluetooth-Modul oder App-Funktion beschreiben. | WiPro mit KeyCard über das NFC Modul unscharfschalten. |

---

## Querverweise

- [[Systemüberblick]]
- [[WiPro III]]
- [[Pro-Finder]]
- [[Fahrzeugkompatibilität]]
- [[Anlernvorgang]]
- [[Störungsbeseitigung]]
