# Faktenblatt — Belastbare Zahlen, Codes und Grenzwerte

Jede Angabe hier wurde am 2026-08-28 direkt gegen die Wiki-Artikel in `../wissen-de/` geprüft.
Für Fragen und Auflösungen **nur** Zahlen aus diesem Blatt oder direkt aus den Artikeln
verwenden — nie aus dem Gedächtnis. ⚠️ markiert offene Konflikte (siehe `02_...md`).

---

## Funk-Magnetkontakt 868 (`funk-magnetkontakt.md`)

| Fakt | Standard (100757 schwarz / 100758 weiß) | Wasserdicht (106020) |
|---|---|---|
| Geschlossener Abstand | ≤ 22 mm empfohlen (Produktanleitung: 25 mm, WiPro-Handbuch: ~22 mm → konservativ 22) | **höchstens 22 mm** (harte Vorgabe) |
| Auslösung sicher offen | — | **> 30 mm** |
| Ausrichtung | Sende-LED **vom Magneten weg** (falsch herum: Anlernen klappt, Alarm nicht!) | **Gehäusepfeile zueinander** |
| Montageadapter | 100428 schwarz / 100729 weiß (Spaltmaße, metallische Heckgarage) | V4A-Senkkopfschrauben (nicht im Lieferumfang) |
| Schutzart | keine für Nässe dokumentiert | IP67 |
| Batterie | CR2032, 3 V, ca. 2 Jahre | CR2032, 3 V, ca. 2 Jahre |
| Klebepads | nicht unter 15 °C Oberflächentemperatur; Endfestigkeit nach ~24 h | gleich |
| Kompatibilität | WiPro III, safe.lock, WiPro easy | WiPro III und safe.lock (ohne easy) |

Montage-Reihenfolge: anlernen → Reichweitentest am geplanten Ort → endgültig kleben/schrauben → Testalarm mit scharfer Anlage.
Türen/Klappen: Sendergehäuse an den festen Rahmen, Magnet ans bewegliche Teil.
⚠️ Wiki-interner Widerspruch: einige Fahrzeugartikel nennen „geschlossen 22–30 mm" — Master-Artikel ist maßgeblich.

## Niederbatterie-Signatur Funk-Zubehör (`wipro-iii.md`, `funk-magnetkontakt.md`)

- Schwelle: unter ~2,6 V (CR2032)
- Zentrale: ~2 Sekunden Signalton beim Betätigen/Auslösen
- Betroffener Sender: rote Sende-LED erlischt erst nach ~30 Sekunden
- Nach Batteriewechsel: **kein** Neu-Anlernen nötig

## WiPro III (`wipro-iii.md`)

- **Keine Bewegungsmelder** (Fehlalarme durch Gardinen, Insekten, Personen/Haustiere; Anlage
  muss beim Aufenthalt nicht teilabgeschaltet werden — aber nie „vollständig fehlalarmfrei" zusagen)
- Funkspeicher: **max. 100 Funksender** (geteilt: Magnetkontakte, Handsender, Kabelschleifen, Zubehör)
- Innenbeleuchtungseingang: Testalarm **frühestens 60 Sekunden** nach Aktivierung
- Antennenleitung: Pin 10, weiß — **nicht kürzen oder aufwickeln**
- DIP 5 → ON = Replay-Schutz (ab SN 0823-014 / SW 5.8); Fahrzeugfunkschlüssel schaltet dann
  nicht mehr scharf/unscharf, CAN-Türüberwachung bleibt
- DIP 7 → ON = Anti-Jamming deaktivieren · DIP 8 → ON = Sirene leiser
- Alarmspeicher: nach Alarm blinkt Status-LED; beim Unscharfschalten 1 langer + 2 kurze Töne;
  Blinkmuster wiederholt sich mit 5 s Pause

### Alarmspeicher-Blinkcodes (Status-LED)

| Blinken | Alarmgrund |
|---|---|
| 1× | Kabinentüren (CAN-Bus) |
| 2× | Funk-Magnetkontakt |
| 3× | Funk-Gaswarner / G.A.S.-pro III / CO |
| 4× | Funk-Kabelschleife |
| 5× | G.A.S.-pro |
| 8× | Panikalarm |
| 9× | Störsender (Anti-Jamming) |
| 10× | Pro-Finder (SMS „Alarm") |
| 11× | Eingang Innenbeleuchtung |

## Pro-Finder (`pro-finder.md`, `stromversorgung-standzeiten.md`)

- Artikelnummer der Familie: 100699 · Seriennummern-Präfix **0699-** (führende Nullen behalten!)
- Generationsgrenze **0699-045**: 4G LTE, Nano-SIM, PIN-Abfrage deaktiviert (SW 11.0.4)
- Bis zu **10 Zielrufnummern**; Alarm-SMS werden **nacheinander** versendet (schnelles
  Unscharfschalten → spätere Nummern bleiben unbenachrichtigt)
- Erste Rufnummer = **Masternummer**; GPS-Kartenlink nur an als **Smartphone gekennzeichnete** Nummern
- Spannungswarnung (Warn-SMS): **11,2 V** → danach Standby/Tiefentladeschutz, keine SMS-Annahme
- Rückkehr in Normalbetrieb: Wiki „über 12,5 V" ⚠️ Support 27.08.: **12 V** — Konflikt offen
- Versorgung 9–30 V DC; 24-V-Fähigkeit ab 0699-003
- Montage: trockener Innenraum, nicht Motorraum, Oberseite („GPS inside") **nach oben**
- Externe GPS-Antenne: Empfangsseite waagerecht nach oben = **Aufkleber nach unten**
  (Support 27.08.); Initialisierungsanweisung der Generation beachten
- VW Crafter: Einbau **hinter dem Tacho/Kombiinstrument** (Support 27.08., nicht im Wiki)
- Geofencing: Auslösung ab ~1 km, bei scharfer WiPro automatisch aktiv, vor Hallenparken
  `fence aus` (GPS-Reflexionen → Fehlalarm)

### Pro-Finder Status-LED (Bedeutung wechselt mit der Generation!)

| LED | bis 0699-044 | ab 0699-045 |
|---|---|---|
| blinkt rot/gelb | Netzsuche + keine Zielrufnummern | gleich |
| blinkt rot | Netzsuche / kein Empfang | gleich |
| leuchtet gelb | Modem verbindet | gleich |
| leuchtet rot | SIM fehlt/defekt | gleich |
| blinkt rot/grün | PIN nicht 0000 | PIN-Abfrage nicht korrekt deaktiviert |
| **blinkt gelb** | **Zielrufnummernspeicher leer** | **letzte SMS konnte nicht gesendet werden** |
| leuchtet grün | SMS wird versendet | SMS wird empfangen oder versendet |
| blinkt gelb/grün | eingebucht, keine Zielrufnummern | gleich |
| blinkt grün | Normalbetrieb | gleich |

Ohne vollständige Seriennummer keine LED-Diagnose.

## G.A.S.-pro III / CO (`gas-pro-iii.md`, `co-sensor.md`, `zusatzsensor-gas-pro-iii.md`)

- Einbau: G.A.S.-pro III (Propan/Butan/KO) senkrecht **10–20 cm über dem Boden**;
  CO-Variante senkrecht **10–20 cm unter der Decke** (FAQ nennt für Gas auch 10–30 cm — Wiki
  verwendet konservativ 10–20)
- Nicht im Schrank; nicht gegenüber Heizungsausströmern; ≥ 1 m Abstand zu Batterien/Nasszelle
- Fahrzeug **über 6,5 m Innenlänge** oder räumliche Trennung (Schiebetür, Vorhang):
  zusätzlichen Detektionspunkt vorsehen
- Zusatzsensorkabel: konservativ **max. 7 m** (FAQ: bis 8 m)
- Vorheizphase: **ca. 4 Minuten, blau pulsierend** — erst grün = betriebsbereit
- Unterspannung: **unter 11,1 V**, 3× drei Töne in einer Minute, beide LEDs gelb, dann
  Abschaltung; nach Spannungswiederkehr **manuell neu einschalten**
- Übertemperatur: **> 60 °C** — beide LEDs wiederholt rot/grün/**magenta**/blau/gelb/türkis,
  auf-/abschwellender Ton, **keine Meldung an die WiPro**
- Pause-Modus: 60 Minuten (kurzer Tasterdruck); sehr hohe CO-Konzentration übersteuert die
  Stummschaltung (nur CO-Variante)
- IGN an Klemme 15: bei Zündung an ist das Gerät stumm (keine Funkmeldung, keine Sirene,
  kein SIR+) — Alarm nur über LEDs
- Anschluss: **keine Aderendhülsen, nicht verzinnen** (0,2–0,75 mm²) — beim alten G.A.S.-pro
  dagegen Aderendhülsen **verwenden**
- Feuerzeugtest: Anleitung „nicht vorgesehen/nicht möglich" ⚠️ Support 27.08.: erlaubt —
  Konflikt offen; CO-Sensor in jedem Fall **nie** mit Feuerzeuggas/Propan/Butan testen
- CO-Sensoren: Verfallsdatum „Exp. Date" auf dem Typenschild; Austausch nur durch THITRONIK,
  kostenpflichtig
- DIP 2: OFF = hellgrün pulsierend, ON = konstant grün gedimmt (Normalbetrieb)
- DIP 5 (G.A.S.-pro III): betrifft Flüssiggas-/KO-Auswertung, **nicht** die CO-Detektion

## T.S.A. Funk-Rauchmelder (`funk-rauchmelder.md`)

- Decke oder seitlich nahe der Decke; Heckgarage (E-Bikes!) ausdrücklich geeignet
- Stoffdecke: **nicht** direkt kleben → Montageadapter 105755 (weiß) / 105756 (grau) an
  seitlichem Kunststoffelement nahe der Decke (Support 27.08.: Wandmontage kleben/schrauben)
- Klebemontage: ≥ 60 Sekunden andrücken · Gerät nach spätestens 10 Jahren ersetzen
- Kurzer Signalton alle 43 Sekunden = Batteriewarnung

## NFC Modul & Medien (`nfc-modul.md`, `keycard.md`, `keytag.md`, `keystrap.md`)

- Montage: innen an geeigneter Scheibe, von außen erreichbar; Empfehlung Support 27.08.:
  **unter der Umweltplakette an der Frontscheibe**
- Ungeeignet: dicke, mehrwandige, metallbedampfte Scheiben; beheizbare Frontscheibe → höherer
  Stromverbrauch
- **Nicht als erstes Funk-Zubehör anlernen** — zuerst Funk-Handsender 868 als Master
- Zwei getrennte Speicher: Modul-an-WiPro und NFC-Medien-am-Modul
- KeyCard (105300): kein eigenständiger Sender, funktioniert nur am NFC Modul; Scharf/Unscharf
  mit WiPro III, Zentralverriegelung nur mit safe.lock
- KeyStrap: für einwandige Scheiben bis max. 15 mm

## BT-connect (`bt-connect.md`)

- Art. 106000, SN-Präfix 6000- · Bluetooth 5.0 LE · **max. 50 m Freifeld** (Fahrzeugpraxis deutlich weniger)
- Setzt WiPro III/safe.lock voraus; **kein Fernzugriff** — dafür Pro-Finder
- Zweite RJ10-Buchse: Pro-Finder einbindbar · Bluetooth = „Koppelmodus" (nicht Anlernmodus)

## Fingerprint (CampLock/VanLock) (`camplock-fingerprint.md`, `vanlock-fingerprint.md`)

- CampLock = Hartal-Aufbautüren mit ZV · VanLock = Reisemobile/Kastenwagen (106260 silber / 106259 schwarz)
- 2 Master-Finger + bis 16 Finger gesamt
- Scharf/Unscharf: mit WiPro III · Ver-/Entriegeln der ZV: **nur mit safe.lock** + passender Anbindung
- Grenzen: nasse, verschmutzte, verletzte Finger; immer zweiten unabhängigen Zugangsweg vorsehen
- „V002+" ist im Wiki **nicht dokumentiert** (0 Treffer) — Fragen darauf brauchen externe Quelle

## Funk-Wassermelder 868 (`funk-wassermelder.md`)

- Funk-Zubehör, **kein** Standalone-Warner; Sendeeinheit trocken + zugänglich, Sensor am
  tiefen/früh benetzten Punkt, beide Kontaktstifte mit Bodenkontakt
- Sensorkabel 30 cm · Sensorschraube 2,9 × 13 mm A2 (nur für den Sensor!)
- Funktionstest: WiPro scharf → Kontaktstifte mit feuchtem Tuch überbrücken → Alarm prüfen →
  bei Pro-Finder SMS prüfen → Stifte freigeben/trocknen → Alarm beenden (z. B. Handsender) →
  dokumentieren
- IP67 des Gehäuses erlaubt trotzdem **keine** Außenmontage

## Fahrzeug-Merkposten (`fahrzeugkompatibilitaet.md`, `mercedes-sprinter-vs30.md`)

- Fahrzeughupe ohne Zündung nicht verfügbar (kein Dauerplus): Sprinter, VW T5 Facelift/T6/T6.1,
  Crafter/MAN TGE, Iveco Daily ab MJ 2019 → Back-up Sirene 100089 / Zusatzsirene 100190 /
  Zusatzhupe 105339 einplanen (ins Angebot vor dem Termin!)
- Iveco Daily **ab MJ 2025/2026**: kein freigegebener Einbau (BCM-Änderungen, Stand Januar 2026)
- Ford Transit/Tourneo/Transit Custom ab 2023/24: **nur Campingmodus** dokumentiert; immer über
  THITRONIK-Bedienweg verriegeln, sonst kann die Entriegelung mit THITRONIK-Zubehör blockiert sein
- safe.lock Umrüstplatine (101052): Ducato/Boxer/Jumper/Daily 2006–2018; Übergangsjahr 2018
  Modelljahr + Schlüsselvariante prüfen
