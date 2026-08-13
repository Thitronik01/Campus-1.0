# Campus-Inseln — Quizfragen (Entwurf)

**Stand:** 13.08.2026 · **Basis:** Wiki-Artikel in [`../01_Produktwissen/`](../01_Produktwissen/)

Rund 60 Fragen für die sieben Schulungsinseln. Die falschen Antworten sind bewusst
als **Praxis-Halbwahrheiten** gebaut — genau die Annahmen, die im Support später
Zeit und Geld kosten. Dadurch ist die Auswertung pro Frage aussagekräftig: Eine
Frage, bei der viele danebenliegen, zeigt präzise, welchen Punkt die Station
schärfer betonen muss.

**Legende:** ✅ = richtige Antwort · Jede Frage hat einen Feedback-Text für die
sofortige Rückmeldung nach der Antwort.

---

## VEJRØ — CampLock / VanLock Fingerprint

*Lernziel: Produktabgrenzung, Funktionsgrenzen, ehrliche Verkaufsargumentation.*
*Quellen: `produkte/camplock-fingerprint.md`, `produkte/vanlock-fingerprint.md`, `referenz/zugang-bedienung.md`*

**1 · Kundensituation**
Ein Kunde hat einen Kastenwagen ohne Hartal-Aufbautür und möchte biometrischen Zugang. Was empfiehlst du?
- A) CampLock Fingerprint, das passt an jede Tür
- **B) VanLock Fingerprint ✅**
- C) Beide sind identisch, egal welches
- D) Fingerprint ist hier technisch nicht möglich

> CampLock ist speziell für Hartal-Aufbautüren mit Zentralverriegelung; VanLock ist für Reisemobile und Kastenwagen beschrieben.

**2 · Systemgrenze (Kernfrage)**
Der Kunde hat eine **WiPro III ohne safe.lock**. Was leistet CampLock nach der Installation?
- A) Tür ver-/entriegeln und Alarm mitführen
- **B) Alarmanlage scharf/unscharf — die Zentralverriegelung wird nicht als Gesamtfahrzeug-Zugang mitgeführt ✅**
- C) Nur Tür auf/zu, kein Alarm
- D) Nichts, CampLock braucht zwingend safe.lock

> Ver-/Entriegeln setzt WiPro III safe.lock plus passende ZV-Anbindung voraus. Scharf/Unscharf geht auch mit der Standard-WiPro III.

**3 · Richtig / Falsch**
„VanLock ist nur der neue Name für CampLock."
> **Falsch ✅** — eigene Artikelnummern, andere Sensormaße (Ø 50 × 13 mm statt Ø 41 × 53 mm), anderer Einsatzbereich.

**4 · Reihenfolge**
Bringe die Inbetriebnahme in die richtige Reihenfolge:
`Nutzerfinger einlernen` · `Funktionstest` · `Fahrzeug-/Türkompatibilität klären` · `2 Master-Finger einlernen` · `mit WiPro koppeln` · `Steuergerät + Sensor montieren und mit 12/24 V versorgen`

> **Kompatibilität → Montage/Versorgung → Kopplung → Master-Finger → Nutzerfinger → Funktionstest ✅**
> Master-Finger kommen immer zuerst.

**5 · Zahl**
Wie viele **Master-Finger** sind vorgesehen?
- A) 1 · **B) 2 ✅** · C) 4 · D) beliebig viele
> 2 Master-Finger, insgesamt bis zu 16 anlernbare Finger.

**6 · Verkaufsgespräch**
Kunde: „Super, dann kann ich den Fahrzeugschlüssel ja zu Hause lassen." Deine beste Antwort:
- A) Ja, der Fingerprint ersetzt den Schlüssel vollständig
- **B) Der Fingerprint ist der Komfortweg — ein zweiter, unabhängiger Zugang (Funk-Handsender, NFC oder Originalschlüssel) sollte immer verfügbar bleiben ✅**
- C) Nur wenn er zusätzlich einen Pro-finder kauft
- D) Nur bei Fahrzeugen mit safe.lock

**7 · Reklamationsfall**
Ein Kunde meldet: „Morgens am Meer erkennt das Gerät meinen Finger oft nicht." Wahrscheinlichste Ursache?
- **A) Nasse, verschmutzte oder verletzte Finger erschweren die Erkennung ✅**
- B) Zu niedrige Bordspannung
- C) Der Sensor ist defekt und muss getauscht werden
- D) Zu viele angelernte Finger im Speicher

**8 · Zuordnung (Bild)**
Ordne zu: `106111` · `106144` · `106260` · `106259`
> **CampLock silber / CampLock schwarz / VanLock silber / VanLock schwarz ✅**

---

## POEL — Händlerbereich

*Lernziel: sich selbstständig auf der Website zurechtfinden.*
*Quellen: öffentliche Website-Struktur (Stand 13.08.2026), `_intern/werkseinbau-eckernfoerde.md`, `produkte/gas-pro-iii.md`*

> ⚠️ **Vor Einsatz prüfen:** Der Händlerbereich ist login-geschützt. Bestätigt sind
> die öffentlichen Rubriken: **Support → Downloads** in drei Produktgruppen
> (*Alarmanlagen · Gaswarner · Fahrzeugortung*, je *Anleitungen* und *Sonstiges*),
> **FAQ Produkte / FAQ Allgemein / FAQ App**, **Konfigurator**, **Händlerfinder**,
> **Werkskundendienst**. Im geschützten Bereich: *News, Termine, Werkstattunterlagen,
> Werbemittel*. Die konkreten Menüpfade nach dem Login gegenprüfen — betrifft
> besonders die Fragen 2, 3 und 6.

**1 · Suchauftrag**
Ein Kunde braucht die Konformitätserklärung nach 2014/53/EU für seinen Funk-Magnetkontakt. Wo findest du sie?
- A) Im Konfigurator
- **B) Im Supportbereich (thitronik.de/support) ✅**
- C) Nur telefonisch beim Werkskundendienst
- D) Im Händlerfinder

**2 · Navigations-Falle**
Unter welcher Download-Produktgruppe liegt die Anleitung zum **Pro-finder**?
- A) Alarmanlagen
- **B) Fahrzeugortung ✅**
- C) Gaswarner
- D) Sonstiges (produktübergreifend)

> Der Pro-finder gehört zur Ortung, nicht zur Alarmanlage — auch wenn er mit der WiPro zusammenarbeitet.

**3 · Grenzfall**
Du brauchst die **fahrzeugspezifische Einbauunterlage mit Steckerbelegung** für einen Sprinter VS30. Wo bekommst du sie?
- A) Öffentlicher Downloadbereich, Rubrik Alarmanlagen → Anleitungen
- **B) Nicht öffentlich — fahrzeugspezifische Einbauunterlagen erhalten Fachhändler über THITRONIK / den geschützten Händlerbereich ✅**
- C) In der FAQ Allgemein
- D) Im Konfigurator-PDF

**4 · Rubrik-Zuordnung**
Ein Kunde meldet, dass ein Button in der App fehlt. Welche FAQ-Rubrik prüfst du zuerst?
- A) FAQ Produkte · **B) FAQ App ✅** · C) FAQ Allgemein · D) Werkskundendienst

**5 · Sicherheitsrelevant**
Ein Kunde bringt eine G.A.S.-pro III mit Seriennummer **1286-010** in die Werkstatt. Was machst du?
- **A) Rückrufseite prüfen — dieser Serienbereich (1286-008 bis 1286-012) ist in Kombination mit Zusatzsensor 101289 von der freiwilligen Rückrufaktion betroffen; Gerät anmelden, kostenloses Softwareupdate ✅**
- B) Gerät normal einbauen, der Rückruf betraf nur CO-Geräte
- C) Sensor tauschen und weiterverkaufen
- D) Gerät entsorgen

**6 · Werkstattbedarf**
Wo findest du Werbemittel und Displaymaterial für dein Sortiment?
- A) Öffentlicher Downloadbereich
- **B) Im eingeloggten Händlerbereich (News, Termine, Werkstattunterlagen, Werbemittel) ✅**
- C) Nur über den Außendienst
- D) Im Händlerfinder

**7 · Kunde am Telefon**
Ein Endkunde aus Bayern fragt, wo er den Einbau machen lassen kann. Was nennst du ihm?
- **A) Den Händlerfinder auf der THITRONIK-Website ✅**
- B) Die Support-Hotline
- C) Den Konfigurator
- D) Den Werkseinbau in Eckernförde als einzige Option

**8 · Werkseinbau**
Ein Kunde will in Eckernförde einbauen lassen. Was ist der saubere Weg?
- **A) Terminanfrage über thitronik.de/einbautermin, Konfiguration als PDF aus dem Konfigurator hochladen, Fahrzeugdaten und vorhandene Geräte angeben ✅**
- B) Einfach hinfahren, es gibt Werkstatt-Kapazität
- C) Über den Händlerfinder buchen
- D) Per Kontaktformular ohne Fahrzeugdaten

**9 · Richtig / Falsch**
„Eine Anfrage über das Terminformular ist bereits eine Terminbestätigung."
> **Falsch ✅** — Anfrage ≠ Zusage zu Termin, Preis, Dauer oder Leihfahrzeug.

---

## HIDDENSEE — Funk-Magnetkontakt & Adapter

*Die wichtigste Insel für Bildfragen. Echte Fotos aus der Werkstatt lohnen sich hier besonders.*
*Quelle: `produkte/funk-magnetkontakt.md`*

**1 · Der Klassiker (Bild)**
Ein Standardkontakt ließ sich problemlos anlernen — beim Öffnen der Klappe passiert aber nichts. Woran liegt es am wahrscheinlichsten?
- A) Batterie leer
- **B) Die Platine ist falsch herum eingelegt — die Sende-LED zeigt zum Magneten ✅**
- C) Der Abstand ist zu klein
- D) Die Anlage war nicht scharf

> In dieser Ausrichtung ist Anlernen möglich, eine Alarmierung erfolgt aber nicht. Deshalb nach der Montage immer Testalarm — die Anlern-Bestätigung allein beweist nichts.

**2 · Zahl**
Wie groß darf der Abstand zwischen Sender und Magnet im **geschlossenen** Zustand höchstens sein?
- A) 15 mm · **B) 22 mm ✅** · C) 30 mm · D) 45 mm

> Die wasserdichte Ausführung nennt 22 mm, die Standard-Produktanleitung 25 mm, das WiPro-III-Handbuch 22 mm — für belastbare Montage auf max. 22 mm auslegen.
> **Formulierungshinweis:** im Quiz „für belastbare Montage höchstens" schreiben, nicht „laut Anleitung genau".

**3 · Falle**
Bei der **wasserdichten** Ausführung: welcher Abstand wird zum Anlernen und Funktionstest benötigt?
- A) 22 mm
- **B) Mehr als 30 mm ✅**
- C) Beliebig, Hauptsache getrennt
- D) 15 mm

> 22 mm ist die Obergrenze im geschlossenen Zustand, >30 mm ist die Auslöseschwelle. Zwei völlig verschiedene Werte.

**4 · Nicht vermischen (Zuordnung)**

| Regel | Standard | Wasserdicht |
|---|---|---|
| Sende-LED muss vom Magneten weg zeigen | ✅ | — |
| Gehäusepfeile müssen zueinander zeigen | — | ✅ |
| Montageadapter 100428 / 100729 | ✅ | — |
| V4A-Senkkopfschrauben (nicht im Lieferumfang) | — | ✅ |

**5 · Werkstattfall**
Der Kontakt an der metallischen Heckgarage arbeitet unzuverlässig. Erste Maßnahme?
- A) Batterie tauschen
- B) Kontakt neu anlernen
- **C) Montageadapter verwenden (100428 schwarz / 100729 weiß) und Reichweitentest wiederholen ✅**
- D) Zweiten Kontakt parallel montieren

**6 · Batteriediagnose**
Beim Öffnen einer Klappe ertönt ca. 2 Sekunden ein Ton aus der Zentrale, die rote Sende-LED bleibt rund 30 Sekunden an. Was bedeutet das — und was noch?
- **A) Die CR2032 des zuletzt betätigten Senders ist schwach (< ca. 2,6 V); außerdem sollten weitere Knopfzellen ähnlichen Alters zeitnah geprüft werden ✅**
- B) Der Kontakt ist nicht angelernt
- C) Die Zentrale meldet einen Störsender
- D) Normale Sendebestätigung

**7 · Richtig / Falsch**
„Jede Fahrzeugtür braucht einen Funk-Magnetkontakt."
> **Falsch ✅** — Türen, deren Öffnung im Kombiinstrument angezeigt wird, werden bei korrekt angeschlossener WiPro III meist bereits über den CAN-Bus überwacht. Am konkreten Fahrzeug prüfen.

**8 · Praxis, Winter**
Es ist November, die Werkstatt ist auf 8 °C runtergekühlt. Du sollst Klebepads verarbeiten.
- A) Kein Problem, Pads sind temperaturunabhängig
- **B) Nicht kleben — Klebepads nicht unter 15 °C Oberflächentemperatur verarbeiten; außerdem Endfestigkeit erst nach ca. 24 h ✅**
- C) Pad kurz mit Heißluft erhitzen und sofort belasten
- D) Doppelte Menge Kleber verwenden

**9 · Montagelogik**
An einer Aufbautür: welches Teil kommt wohin?
- **A) Sendergehäuse an den festen Rahmen, Magnet an das bewegliche Türblatt ✅**
- B) Umgekehrt — der Sender muss mitschwingen
- C) Egal, Hauptsache im Abstand
- D) Beide auf dem Türblatt

**10 · Reihenfolge**
`Endgültig kleben/verschrauben` · `Anlernen` · `Reichweitentest am geplanten Ort` · `Testalarm mit scharfer Anlage`
> **Anlernen → Reichweitentest → endgültig befestigen → Testalarm ✅**

---

## SAMSØ — Einbauorte im Fahrzeug

*Ideal als Fahrzeug-Bildquiz mit markierten Positionen.*
*Quellen: `produkte/pro-finder.md`, `produkte/gas-pro-iii.md`, `produkte/nfc-modul.md`, `produkte/funk-rauchmelder.md`, `produkte/wipro-iii.md`, `fahrzeuge/*`*

**1 · Höhenzuordnung (Kernfrage)**
Ordne die Montagehöhe zu:
- G.A.S.-pro III (Propan/Butan/KO-Gase) → **senkrecht, ca. 10–20 cm über dem Boden ✅**
- G.A.S.-pro III **CO** → **senkrecht, ca. 10–20 cm unter der Decke ✅**

> Gas ist schwerer als Luft, CO verteilt sich anders. Ein tief montierter Gassensor ersetzt keinen deckennahen CO-Sensor — und umgekehrt.

**2 · Falle**
Ein Monteur will den Gaswarner unten im Kleiderschrank montieren, weil dort Kabel liegen. Deine Reaktion?
- A) Passt, Höhe stimmt ja
- **B) Nein — das Hauptgerät gehört nicht in den Schrank; außerdem nicht direkt gegenüber einem Heizungsausströmer und mindestens 1 m Abstand zu Batterien und Nasszelle ✅**
- C) Nur mit Zusatzsensor erlaubt
- D) Nur bei Fahrzeugen unter 6,5 m

**3 · Pro-finder (Bild: markierte Positionen)**
Welche Position ist geeignet?
- A) Motorraum, gut belüftet
- **B) Trockener Fahrzeuginnenraum, Geräteoberseite nach oben, möglichst wenig Metallabschirmung über dem Gerät, gegen Zugriff gesichert aber für Service erreichbar ✅**
- C) Unter dem Fahrzeugboden für besseren GPS-Empfang
- D) In der Heckgarage unter der Metallabdeckung

**4 · GPS-Antenne**
Wie wird eine externe GPS-Antenne ausgerichtet?
- **A) Empfangsseite waagerecht nach oben ✅**
- B) Senkrecht zur Fahrtrichtung
- C) Nach unten, um Wasser abzuleiten
- D) Egal, sie empfängt kugelförmig

**5 · Falle**
Die Antennenleitung der WiPro III (Pin 10, weiß) ist deutlich zu lang für den gewählten Einbauort.
- A) Auf 20 cm kürzen
- B) Sauber aufwickeln und mit Kabelbinder fixieren
- **C) Weder kürzen noch aufwickeln — Verlegung anpassen bzw. Montageort so wählen, dass die Leitung gestreckt geführt werden kann ✅**
- D) Verlängern mit Lautsprecherkabel

**6 · NFC Modul**
Wo wird das NFC Modul montiert — und welchen Nebeneffekt musst du dem Kunden nennen?
- **A) Innenseite einer geeigneten Scheibe, von außen gut erreichbar; bei beheizbaren Frontscheiben ist mit höherem Verbrauch und kürzerer Batterielebensdauer zu rechnen ✅**
- B) Außen an der Karosserie, IP-geschützt
- C) Neben der WiPro-Zentrale im Schrank
- D) Im Fahrerhaus unter dem Armaturenbrett

**7 · Rauchmelder**
Das Fahrzeug hat eine **Stoffdecke**. Wie montierst du den T.S.A.?
- A) Klebepad direkt auf den Stoff drücken, 60 s halten
- **B) Nicht auf den Stoff kleben — Montageadapter (105755 weiß / 105756 grau) verwenden und an einem seitlichen Kunststoffelement nahe der Decke befestigen ✅**
- C) Schrauben durch die Stoffdecke
- D) In eine Fahrzeugecke setzen

**8 · Fahrzeuggröße**
Ein Liner hat 7,4 m Innenlänge mit Schiebetür zum Schlafbereich. Was folgt daraus für die Gaswarnung?
- **A) Zusätzlicher passender Sensor vorsehen — über 6,5 m Innenlänge bzw. bei räumlicher Trennung braucht es einen zweiten Detektionspunkt; Zusatzsensorkabel konservativ max. 7 m Gesamtlänge ✅**
- B) Ein Hauptgerät reicht immer
- C) Zwei Hauptgeräte sind zwingend
- D) Nur ein CO-Sensor ist nötig

**9 · Verdrahtung**
WiPro III und Pro-finder werden eingebaut. Was gilt für die Versorgung?
- **A) Beide an dieselbe Fahrzeugbatterie; Verbindung untereinander über das dafür vorgesehene Verbindungskabel (RJ11) ✅**
- B) WiPro an Starter-, Pro-finder an Aufbaubatterie
- C) Beide direkt an die Solaranlage
- D) Pro-finder über Klemme 15

**10 · Zuordnung**
Welche Komponenten haben **keinen** festen Einbauort im Fahrzeug?
> **Funk-Handsender, KeyCard, KeyTag, KeyStrap ✅** (persönliche Zugangsmedien, keine Einbauteile)

---

## FEHMARN — Fehlersuche & Support

*Vorhandene Bildquiz-Struktur beibehalten: Situation → Bild → Frage → Entscheidung → Feedback.*
*Quellen: `referenz/stoerungsbeseitigung.md`, `_intern/support-fallaufnahme.md`, `produkte/wipro-iii.md`, `produkte/pro-finder.md`*

**1 · Alarmspeicher lesen**
Nach dem Unscharfschalten blinkt die Status-LED wiederholt **9×** mit 5 s Pause. Was war los und was tust du?
- A) Panikalarm — Handsender prüfen
- **B) Störsender / Anti-Jamming-Ereignis — Ort und Zeitpunkt dokumentieren, mögliche Funkstörquellen prüfen. Anti-Jamming (DIP 7) nicht pauschal abschalten ✅**
- C) Funk-Kabelschleife — Kabel prüfen
- D) Innenbeleuchtungseingang

**2 · Kundenanruf (Kernfrage der Insel)**
„Seit dem Einbau schaltet mein Original-Fahrzeugschlüssel die Alarmanlage nicht mehr scharf — die Zentralverriegelung geht aber normal." Was prüfst du **zuerst**?
- A) CAN-High/CAN-Low vertauscht
- **B) Ob DIP 5 bewusst auf ON steht — dann ist der Replay-Schutz aktiv und dieses Verhalten ist erwartungsgemäß ✅**
- C) Batterie des Fahrzeugschlüssels
- D) WiPro-Zentrale defekt, Austausch veranlassen

> Erst wenn DIP 5 auf OFF steht, geht es an Fahrzeugprofil, DIP-Stellung und CAN-Anschluss.

**3 · Diagnose-Voraussetzung**
Ein Kunde meldet: „Die LED am Pro-finder blinkt gelb." Was fehlt dir für eine belastbare Aussage?
- **A) Die vollständige Seriennummer mit Präfix 0699 — gelbes Blinken bedeutet vor und ab 0699-045 etwas Verschiedenes ✅**
- B) Die Farbe der Fahrzeuglackierung
- C) Der Mobilfunkanbieter reicht aus
- D) Nichts, gelbes Blinken heißt immer „Zielrufnummernspeicher leer"

**4 · Spannung**
Ein Pro-finder sendet eine Spannungswarnung und reagiert danach auf keine SMS mehr. Einordnung?
- **A) Bei 11,2 V Warnung, danach Standby zum Tiefentladeschutz; nach Laden und Versorgung über 12,5 V Rückkehr in den Normalbetrieb. Nicht automatisch defekt ✅**
- B) Modem defekt, Gerät einsenden
- C) SIM-Karte ist abgelaufen
- D) Sicherung mehrfach ziehen und wieder stecken

**5 · Sicherheitsgrenze**
Ein Kollege will die G.A.S.-pro III „mal eben mit dem Feuerzeug testen".
- A) Kurz und aus 1 m Abstand ist ok
- **B) Nicht durchführen — laut Kurzanleitung ist ein Anwendertest mit Feuerzeuggas wegen des Auswertungsalgorithmus nicht vorgesehen; das Gerät hat einen automatischen Sensorselbsttest ✅**
- C) Nur bei der CO-Variante erlaubt
- D) Nur mit geöffnetem Fenster

**6 · Zustand richtig lesen**
Eine frisch angeschlossene G.A.S.-pro III pulsiert ca. 4 Minuten blau. Was heißt das?
- A) Sensorfehler
- **B) Normale Vorheizphase — noch keine bestätigte Betriebsbereitschaft. Erst der grüne Normalzustand bestätigt sie ✅**
- C) Unterspannung
- D) Funkverbindung wird aufgebaut

**7 · Nach Spannungsunterbrechung**
Nach einem Sicherungswechsel meldet die WiPro einen offenen Magnetkontakt, obwohl alle Klappen zu sind.
- **A) Alle betroffenen Kontakte mehrmals vollständig öffnen und schließen — der Zustand wird dann neu eingelesen ✅**
- B) Alle Kontakte löschen und neu anlernen
- C) Zentrale zurücksetzen
- D) Batterien aller Kontakte tauschen

**8 · Höchste Sicherheitsstufe**
Ein Fahrzeug wurde gestohlen, Abschalteinrichtung ist verbaut. Welcher Befehl ist zulässig?
- A) `a an`
- B) `a 30`
- **C) `kill` — wartet, bis die GPS-Geschwindigkeit mindestens 5 Sekunden durchgehend 0 km/h beträgt, und schaltet erst dann Ausgang A ✅**
- D) `status` genügt

> `a an` und `a N` schalten ohne Geschwindigkeitsprüfung — zur Fahrzeugstilllegung unzulässig. Und: nicht selbst zum Fahrzeug fahren.

**9 · Alarmweiterleitung**
„Meine Frau bekommt die Alarm-SMS, ich nie." Was erklärst du?
- **A) Alarm-SMS werden nacheinander versendet — wird ein Testalarm sofort beendet, bleiben spätere Zielrufnummern unbenachrichtigt. Kontrollierten Test nicht abbrechen ✅**
- B) Nur die Masternummer bekommt SMS
- C) Zweite Nummer muss als Smartphone gekennzeichnet sein
- D) Maximal eine Zielrufnummer ist möglich

**10 · Support-Fallaufnahme (Mehrfachauswahl)**
Welche Angaben sind vor der Eskalation an THITRONIK **Pflicht**?
- ☑ Vollständige Seriennummern aller beteiligten Komponenten ✅
- ☑ Fahrzeug, Modelljahr, Aufbauart ✅
- ☑ Erwartetes vs. tatsächliches Verhalten und Bedienreihenfolge ✅
- ☑ LED-/Blinkcode, Signalton, SMS-Wortlaut möglichst wörtlich ✅
- ☐ SIM-PIN und Kundenpasswörter ❌ *(gehören ausdrücklich nicht ins Ticket)*

---

## USEDOM — Verkaufsdisplay & Konfigurator

*Lernziel: vom Einzelprodukt zum System — und ehrliche Grenzen kennen.*
*Quellen: `referenz/systemueberblick.md`, `produkte/bt-connect.md`, `produkte/nfc-modul.md`, `referenz/zugang-bedienung.md`*

**1 · Bedarfsanalyse**
Kunde: „Ich will eine Alarmanlage, Ortung bei Diebstahl und bequem ohne Schlüssel öffnen." Welche Kombination zeigst du am Display?
- **A) WiPro III (safe.lock je nach Fahrzeug) + Pro-finder + NFC Modul + KeyCard/KeyTag/KeyStrap ✅**
- B) Nur Pro-finder und NFC Modul
- C) BT-connect und KeyCard
- D) G.A.S.-pro III und Funk-Handsender

**2 · Abhängigkeit (Falle)**
Kunde: „Ich nehme nur das BT-connect, Alarmanlage brauche ich nicht."
- A) Geht, BT-connect funktioniert eigenständig
- **B) Geht nicht — BT-connect ist ein Bedienweg und setzt eine WiPro III bzw. WiPro III safe.lock voraus ✅**
- C) Geht nur mit Pro-finder
- D) Geht nur mit NFC Modul

**3 · Reichweiten-Falle**
Kunde: „Mit BT-connect kann ich also aus dem Restaurant am Hafen mein Wohnmobil scharfschalten?"
- A) Ja, bis 50 m immer
- **B) Nein — BT-connect ist ein lokaler Bluetooth-Nahbereichsweg ohne Mobilfunk und GPS. Für Fernbedienung aus der Ferne ist der Pro-finder da ✅**
- C) Ja, wenn das Handy im WLAN ist
- D) Nur mit safe.lock

**4 · Displayzuordnung**
Welche Komponente auf dem Display übernimmt die Fahrzeugortung?
- **A) Pro-finder (mit Pro-finder Antenne bei ungünstigem Empfang) ✅**
- B) BT-connect · C) NFC Modul · D) WiPro III

**5 · Die wichtigste Abgrenzung**
Kunde: „Mit der KeyCard schließe ich mein Fahrzeug auf und zu, oder?"
- A) Ja, immer
- **B) Scharf-/Unscharfschalten ja. Ver-/Entriegeln der Zentralverriegelung nur mit WiPro III safe.lock, passender Fahrzeuganbindung und geeignetem Softwarestand ✅**
- C) Nein, KeyCard kann nur entriegeln
- D) Nur mit zusätzlichem BT-connect

> Scharf/Unscharf und Ver-/Entriegeln sind technisch zwei verschiedene Vorgänge. Das ist der häufigste Beratungsfehler.

**6 · Gaswarnung ohne Alarmanlage**
Ein Kunde hat keine WiPro und will nur Gaswarnung. Was zeigst du?
- **A) G.A.S.-pro III (eigenständig, eigene 94-dB-Sirene) oder G.A.S. bzw. G.A.S.-plug ✅**
- B) G.A.S.-connect — das ist die günstigste Lösung
- C) Gaswarnung ist ohne WiPro nicht möglich
- D) Nur den externen Zusatzsensor

> G.A.S.-connect hat **keine eigene Sirene** und ist ein Funkzubehör für die WiPro III — als Standalone-Lösung falsch.

**7 · CO-Falle**
Kunde: „Der Gaswarner erkennt dann auch Kohlenmonoxid von meiner Heizung?"
- A) Ja, alle G.A.S.-Geräte erkennen CO
- **B) Nein — G.A.S.-pro III (101286) und G.A.S.-pro III CO (101287) sind getrennte Geräte. Ohne geeigneten externen CO-Sensor erkennt die Standardausführung kein CO ✅**
- C) Ja, aber nur mit WiPro-Anbindung
- D) CO wird vom Rauchmelder abgedeckt

**8 · Zahlen am Display**
Wie viele NFC-Medien lassen sich pro NFC Modul insgesamt speichern?
- A) 8 · B) 9 · **C) 14 ✅** · D) 100

> Die mitgelieferte KeyCard zählt mit. Einzelne Medien lassen sich nicht selektiv löschen — bei Verlust: kompletter Tag-Reset und alle Medien neu anlernen.

**9 · Verkaufsargument**
Warum arbeitet die WiPro III bewusst **ohne** Bewegungsmelder? Bestes Argument gegenüber dem Kunden:
- **A) Bewegungsmelder reagieren in Freizeitfahrzeugen auf Gardinen, Erschütterungen, Insekten und Haustiere. Über definierte Öffnungen kann die Anlage auch scharf bleiben, während Personen im Fahrzeug sind ✅**
- B) Bewegungsmelder sind zu teuer
- C) Sie sind gesetzlich nicht zugelassen
- D) Die Anlage ist dadurch komplett fehlalarmfrei

> Vorsicht: „völlig fehlalarmfrei" ist keine zulässige Zusage.

**10 · Konfigurator**
Was machst du mit dem Konfigurator-Ergebnis?
- **A) Auf Plausibilität prüfen und mit Fahrzeug-/Einbauwissen abgleichen; als PDF für Angebot oder Einbautermin-Anfrage nutzen ✅**
- B) Ungeprüft als verbindliche Zusage verkaufen
- C) Nur intern verwenden
- D) Dem Kunden die internen Einbauunterlagen mitgeben

---

## LANGELAND — Fahrzeugannahme & Fahrzeugübergabe

*Lernziel: der Prozess vor und nach dem Schraubendreher.*
*Quellen: `referenz/fahrzeugkompatibilitaet.md`, `produkte/wipro-iii.md`, `referenz/zugang-bedienung.md`, `_intern/support-fallaufnahme.md`*

**1 · Annahme, Pflichtangaben**
Ein Kunde bringt sein Fahrzeug zur Erweiterung eines bestehenden Systems. Was gehört **zwingend** in die Annahme?
- **A) Fahrzeug, Modelljahr, Aufbauart — plus vollständige Seriennummer und, soweit ermittelbar, Softwarestand jeder vorhandenen THITRONIK-Komponente ✅**
- B) Nur Fahrzeugmodell und Kundenwunsch
- C) Nur die Artikelnummern der Neuteile
- D) Kilometerstand und Tankfüllung

> Ohne Seriennummer und Softwarestand ist keine belastbare Kompatibilitätsaussage möglich — das rächt sich später im Supportfall.

**2 · Risiko früh ansprechen**
Ein Mercedes Sprinter VS30 (Baujahr 2021) soll eine WiPro III bekommen. Welchen Punkt musst du **schon bei der Annahme** ansprechen?
- **A) Bei diesem Fahrzeug ist die Fahrzeughupe ohne Zündung nicht verfügbar — je nach Anleitung ist eine Back-up-Sirene (100089) oder Zusatzhupe (105339) nötig und gehört ins Angebot ✅**
- B) Der Sprinter braucht immer safe.lock
- C) Es wird kein Testalarm möglich sein
- D) Kein Thema, die Hupe funktioniert immer

**3 · Freigabe-Falle**
Ein Kunde ruft an: „Ich habe einen Iveco Daily, Modelljahr 2026, wann kann ich kommen?"
- A) Termin sofort zusagen, Iveco ist Standard
- **B) Kein Termin ohne Prüfung — für Iveco Daily ab Modelljahr 2025/2026 ist wegen BCM-Änderungen derzeit kein Einbau freigegeben. Vor jeder Zusage mit THITRONIK klären ✅**
- C) Termin zusagen und vor Ort improvisieren
- D) Universalanschluss verwenden

**4 · Testfalle bei der Abnahme**
Fahrerhaustüren sind über den **Innenbeleuchtungseingang** (nicht CAN-Bus) angebunden. Wann kannst du den Testalarm durchführen?
- A) Sofort nach dem Scharfschalten
- **B) Frühestens 60 Sekunden nach Aktivierung ✅**
- C) Erst nach 5 Minuten
- D) Gar nicht, nur CAN-Türen sind testbar

**5 · Übergabe, Pflichtprogramm (Mehrfachauswahl)**
Ein Kunde holt sein Fahrzeug nach Einbau von **WiPro III + Pro-finder** ab. Was gehört zwingend in die Übergabe?
- ☑ Scharf-/Unscharfschalten über **jeden** vorgesehenen Bedienweg vorführen ✅
- ☑ Mindestens einen echten Testalarm zeigen, Kunde probiert selbst ✅
- ☑ Alarmspeicher erklären: Blinkcode der Status-LED sagt, was ausgelöst hat ✅
- ☑ Panikfunktion und deren Beenden zeigen ✅
- ☑ Batteriewarnung erklären: ca. 2 s Ton aus der Zentrale + rote Sende-LED ca. 30 s ✅
- ☑ Zielrufnummern des Pro-finders gemeinsam testen (Masternummer zuerst) ✅
- ☐ SIM-PIN dem Kunden auf einen Zettel schreiben ❌

**6 · Campingmodus**
Fahrzeug mit safe.lock im Campingmodus. Welchen Hinweis gibst du dem Kunden zwingend mit?
- **A) Im Campingmodus grundsätzlich über den vorgesehenen THITRONIK-Bedienweg verriegeln. Wird mit dem Originalschlüssel verriegelt, kann die spätere Entriegelung über THITRONIK-Zubehör bei bestimmten Fahrzeugen blockiert sein ✅**
- B) Der Originalschlüssel funktioniert immer als Rückfallebene
- C) Der Campingmodus muss vor jeder Fahrt deaktiviert werden
- D) Im Campingmodus ist der Alarm inaktiv

**7 · Erwartungsmanagement**
Welche Aussage darfst du bei der Übergabe **nicht** machen?
- A) „Die Anlage meldet Einbruchereignisse akustisch und optisch."
- **B) „Damit kann Ihnen niemand mehr ins Fahrzeug einbrechen." ✅**
- C) „Nicht abgesicherte Öffnungen bleiben ungeschützt — wir haben X, Y, Z abgesichert."
- D) „Nach einem Alarm bleibt die Überwachung aktiv."

**8 · Backup-Beratung**
Der Kunde bedient alles nur über die App. Was empfiehlst du?
- **A) Mindestens zwei voneinander unabhängige Bedienwege — z. B. zusätzlich einen zuvor geprüften Funk-Handsender 868. Leerer Handy-Akku, deaktiviertes Bluetooth oder eine verlorene Kopplung sperren sonst den Zugang ✅**
- B) Reicht aus, die App ist zuverlässig
- C) Zweites Smartphone koppeln genügt
- D) Originalschlüssel im Fahrzeug deponieren

**9 · Nach einem safe.lock-Upgrade**
Die Zentrale kam aus dem Upgrade zurück und ist wieder eingebaut. Was ist jetzt zwingend?
- **A) Sämtliches Funk-Zubehör neu anlernen (der Speicher wurde gelöscht), danach vollständige Ein- und Ausgangstests inkl. Zentralverriegelung ✅**
- B) Nur den Master-Handsender neu anlernen
- C) Nichts, der Speicher bleibt erhalten
- D) Nur die Seriennummer in der App aktualisieren

**10 · Dokumentation**
Was gehört nach der Übergabe in die Akte — mit Blick auf spätere Supportfälle?
- **A) Verbaute Produkte mit Artikel- und Seriennummern, Softwarestände, DIP-Stellung (Foto), Fahrzeugdaten, durchgeführte Tests und deren Ergebnis, Einbaudatum und Betrieb ✅**
- B) Nur die Rechnungsnummer
- C) Nur die Fahrzeugdaten
- D) Nur die Artikelnummern der Neuteile

---

## Offene Punkte vor dem Einsatz

1. **POEL** — die Menüpfade stammen aus der öffentlichen Website. Die Navigation im
   eingeloggten Händlerbereich gegenprüfen, dann ziehen die Fragen 2, 3 und 6 sauber.

2. **VEJRØ** — die Fragen gehen davon aus, dass „CAMP / VANLOCK" die Produkte
   **CampLock Fingerprint** und **VanLock Fingerprint** meint. Falls VEJRØ ein
   neueres, noch nicht dokumentiertes Produkt vorstellt, muss der Block neu gebaut
   werden.

3. **HIDDENSEE Frage 2** — die 22-mm-Angabe ist im Wiki bewusst als konservativer
   Wert dokumentiert (die Produktanleitung nennt 25 mm für die Standardausführung).
   Im Quiz „für belastbare Montage höchstens" formulieren.

4. **Bildfragen** — HIDDENSEE, SAMSØ und FEHMARN gewinnen deutlich mit echten Fotos
   aus der Werkstatt. Produktbilder für das Displayquiz (USEDOM) liegen bereits in
   [`../03_Medien/produkte/`](../03_Medien/produkte/).

5. **Hörquiz** — die elf Alarmtöne in [`../03_Medien/alarmtoene/`](../03_Medien/alarmtoene/)
   sind eine bisher ungenutzte Fragenform: „Welche Meldung hörst du?"

---

## Verhältnis zu den bestehenden Quizzen

In [`../01_Produktwissen/daten/dealer-quizzes.de.json`](../01_Produktwissen/daten/dealer-quizzes.de.json)
liegen bereits 11 Händler-Quizze (u. a. `konfigurator`, `uebergabe`, `can-bus-tueren`,
`wipro-iii-montage`). Die sind deutlich leichter gehalten — ihre falschen Antworten
sind offensichtlich falsch („Nur die Lieblingsfarbe des Kunden").

Die Fragen hier sind als **anspruchsvollere zweite Ebene** gedacht, nicht als Ersatz.
Sinnvolle Kombination: die bestehenden Quizze als Einstieg oder Wiederholung, diese
hier als Wissenscheck nach der Präsenzstation.
