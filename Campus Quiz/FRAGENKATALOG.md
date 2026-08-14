# Fragenkatalog — THITRONIK Campus

> **Dieses Dokument nennt alle Lösungen.** Es ist für die fachliche
> Freigabe und die Schulungsvorbereitung gedacht, nicht für die
> Teilnehmer.

**Erzeugt** mit `node tools/fragenkatalog.js` aus den Fragensätzen in
`public/data/inseln/`. Änderungen gehören dorthin, nicht in diese Datei.

67 Fragen auf 7 Inseln.

| Fragetyp | Anzahl |
|---|---:|
| Einfachauswahl | 56 |
| Richtig/Falsch | 3 |
| Zuordnung | 3 |
| Mehrfachauswahl | 3 |
| Reihenfolge | 2 |

## Inhalt

- [VEJRØ — CampLock & VanLock Fingerprint](#vejrø--camplock--vanlock-fingerprint) · 8 Fragen
- [POEL — Händlerbereich](#poel--händlerbereich) · 9 Fragen
- [HIDDENSEE — Funk-Magnetkontakt & Adapter](#hiddensee--funk-magnetkontakt--adapter) · 10 Fragen
- [SAMSØ — Einbauorte im Fahrzeug](#samsø--einbauorte-im-fahrzeug) · 10 Fragen
- [FEHMARN — Fehlersuche & Support](#fehmarn--fehlersuche--support) · 10 Fragen
- [USEDOM — Verkaufsdisplay & Konfigurator](#usedom--verkaufsdisplay--konfigurator) · 10 Fragen
- [LANGELAND — Fahrzeugannahme & Fahrzeugübergabe](#langeland--fahrzeugannahme--fahrzeugübergabe) · 10 Fragen

---
## VEJRØ — CampLock & VanLock Fingerprint

| | |
|---|---|
| Fragen | 8 |
| Fragensatz-Version | 1 |
| Art | Produktschulung |
| Lernziel | Produktabgrenzung, Funktionsgrenzen, ehrliche Verkaufsargumentation. |

**Quellen im Produktwissen:** `produkte/camplock-fingerprint.md`, `produkte/vanlock-fingerprint.md`, `referenz/zugang-bedienung.md`

> **Redaktioneller Hinweis (erscheint nicht im Quiz):** Vor dem Einsatz prüfen: Diese Fragen gehen davon aus, dass VEJRØ die Produkte CampLock Fingerprint und VanLock Fingerprint vorstellt. Zeigt die Insel ein neueres, noch nicht dokumentiertes Produkt, muss der Fragensatz neu gebaut werden.

#### 1. Ein Kunde hat einen Kastenwagen ohne Hartal-Aufbautür und möchte biometrischen Zugang. Was empfiehlst du?

`VEJ-01` · Einfachauswahl · Kundensituation

- CampLock Fingerprint — das passt an jede Tür
- **VanLock Fingerprint** ✓
- Beide sind identisch, egal welches
- Fingerprint ist hier technisch nicht möglich

**Auflösung:** CampLock ist speziell für Hartal-Aufbautüren mit Zentralverriegelung beschrieben. VanLock ist für Reisemobile und Kastenwagen vorgesehen.

#### 2. Der Kunde hat eine WiPro III ohne safe.lock. Was leistet CampLock nach der Installation?

`VEJ-02` · Einfachauswahl · Systemgrenze

- Tür ver- und entriegeln und Alarm mitführen
- **Alarmanlage scharf/unscharf — die Zentralverriegelung wird nicht als Gesamtfahrzeug-Zugang mitgeführt** ✓
- Nur Tür auf und zu, kein Alarm
- Nichts — CampLock braucht zwingend safe.lock

**Auflösung:** Ver- und Entriegeln setzt WiPro III safe.lock plus passende ZV-Anbindung voraus. Scharf/Unscharf geht auch mit der Standard-WiPro III. Das ist die wichtigste Abgrenzung dieser Insel.

#### 3. „VanLock ist nur der neue Name für CampLock.“

`VEJ-03` · Richtig/Falsch · Richtig oder falsch

- Richtig
- **Falsch** ✓

**Auflösung:** Falsch. Eigene Artikelnummern, andere Sensormaße (Ø 50 × 13 mm statt Ø 41 × 53 mm) und ein anderer Einsatzbereich.

#### 4. Bringe die Inbetriebnahme in die richtige Reihenfolge.

`VEJ-04` · Reihenfolge · Reihenfolge

1. Fahrzeug- und Türkompatibilität klären
2. Steuergerät und Sensor montieren, mit 12/24 V versorgen
3. Mit der WiPro koppeln
4. Zwei Master-Finger einlernen
5. Nutzerfinger einlernen
6. Funktionstest

**Auflösung:** Kompatibilität → Montage und Versorgung → Kopplung → Master-Finger → Nutzerfinger → Funktionstest. Die Master-Finger kommen immer zuerst.

#### 5. Wie viele Master-Finger sind vorgesehen?

`VEJ-05` · Einfachauswahl · Zahl

- 1
- **2** ✓
- 4
- Beliebig viele

**Auflösung:** Zwei Master-Finger, insgesamt bis zu 16 anlernbare Finger.

#### 6. Kunde: „Super, dann kann ich den Fahrzeugschlüssel ja zu Hause lassen.“ Deine beste Antwort?

`VEJ-06` · Einfachauswahl · Verkaufsgespräch

- Ja, der Fingerprint ersetzt den Schlüssel vollständig
- **Der Fingerprint ist der Komfortweg — ein zweiter, unabhängiger Zugang (Funk-Handsender, NFC oder Originalschlüssel) sollte immer verfügbar bleiben** ✓
- Nur wenn er zusätzlich einen Pro-finder kauft
- Nur bei Fahrzeugen mit safe.lock

**Auflösung:** Ein einziger Bedienweg ist immer ein Risiko. Nasse Finger, ein leerer Akku oder eine verlorene Kopplung dürfen nicht dazu führen, dass der Kunde vor dem Fahrzeug steht.

#### 7. Ein Kunde meldet: „Morgens am Meer erkennt das Gerät meinen Finger oft nicht.“ Wahrscheinlichste Ursache?

`VEJ-07` · Einfachauswahl · Reklamationsfall

- **Nasse, verschmutzte oder verletzte Finger erschweren die Erkennung** ✓
- Zu niedrige Bordspannung
- Der Sensor ist defekt und muss getauscht werden
- Zu viele angelernte Finger im Speicher

**Auflösung:** Feuchtigkeit und Salz auf der Fingerkuppe sind der häufigste Grund. Vor jedem Austausch erst die einfachen Ursachen prüfen.

#### 8. Ordne die Artikelnummern den Ausführungen zu.

`VEJ-08` · Zuordnung · Zuordnung

| Zuzuordnen | Richtig |
|---|---|
| 106111 | CampLock silber |
| 106144 | CampLock schwarz |
| 106260 | VanLock silber |
| 106259 | VanLock schwarz |

**Auflösung:** 106111 CampLock silber · 106144 CampLock schwarz · 106260 VanLock silber · 106259 VanLock schwarz.

---

## POEL — Händlerbereich

| | |
|---|---|
| Fragen | 9 |
| Fragensatz-Version | 1 |
| Art | Was finde ich wo? |
| Lernziel | Sich selbstständig auf der Website zurechtfinden. |

**Quellen im Produktwissen:** `Öffentliche Website-Struktur (Stand 13.08.2026)`, `_intern/werkseinbau-eckernfoerde.md`, `produkte/gas-pro-iii.md`

> **Redaktioneller Hinweis (erscheint nicht im Quiz):** Vor dem Einsatz prüfen: Der Händlerbereich ist login-geschützt. Bestätigt sind nur die öffentlichen Rubriken. Die konkreten Menüpfade nach dem Login gegenprüfen — das betrifft besonders die Fragen 2, 3 und 6.

#### 1. Ein Kunde braucht die Konformitätserklärung nach 2014/53/EU für seinen Funk-Magnetkontakt. Wo findest du sie?

`POE-01` · Einfachauswahl · Suchauftrag

- Im Konfigurator
- **Im Supportbereich (thitronik.de/support)** ✓
- Nur telefonisch beim Werkskundendienst
- Im Händlerfinder

**Auflösung:** Konformitätserklärungen liegen öffentlich im Supportbereich. Dafür braucht es keinen Anruf.

#### 2. Unter welcher Download-Produktgruppe liegt die Anleitung zum Pro-finder?

`POE-02` · Einfachauswahl · Navigations-Falle

- Alarmanlagen
- **Fahrzeugortung** ✓
- Gaswarner
- Sonstiges (produktübergreifend)

**Auflösung:** Der Pro-finder gehört zur Ortung, nicht zur Alarmanlage — auch wenn er mit der WiPro zusammenarbeitet.

#### 3. Du brauchst die fahrzeugspezifische Einbauunterlage mit Steckerbelegung für einen Sprinter VS30. Wo bekommst du sie?

`POE-03` · Einfachauswahl · Grenzfall

- Öffentlicher Downloadbereich, Rubrik Alarmanlagen → Anleitungen
- **Nicht öffentlich — fahrzeugspezifische Einbauunterlagen erhalten Fachhändler über THITRONIK bzw. den geschützten Händlerbereich** ✓
- In der FAQ Allgemein
- Im Konfigurator-PDF

**Auflösung:** Fahrzeugspezifische Einbauunterlagen sind bewusst nicht öffentlich. Wer sie im offenen Downloadbereich sucht, sucht vergeblich.

#### 4. Ein Kunde meldet, dass ein Button in der App fehlt. Welche FAQ-Rubrik prüfst du zuerst?

`POE-04` · Einfachauswahl · Rubrik-Zuordnung

- FAQ Produkte
- **FAQ App** ✓
- FAQ Allgemein
- Werkskundendienst

**Auflösung:** Es gibt drei getrennte FAQ-Rubriken. App-Fragen stehen in der FAQ App.

#### 5. Ein Kunde bringt eine G.A.S.-pro III mit Seriennummer 1286-010 in die Werkstatt. Was machst du?

`POE-05` · Einfachauswahl · Sicherheitsrelevant

- **Rückrufseite prüfen — dieser Serienbereich (1286-008 bis 1286-012) ist in Kombination mit Zusatzsensor 101289 von der freiwilligen Rückrufaktion betroffen. Gerät anmelden, kostenloses Softwareupdate** ✓
- Gerät normal einbauen, der Rückruf betraf nur CO-Geräte
- Sensor tauschen und weiterverkaufen
- Gerät entsorgen

**Auflösung:** Bei Seriennummern im Rückrufbereich immer erst die Rückrufseite prüfen. Das Update ist kostenlos — der Einbau eines betroffenen Geräts ohne Prüfung ist es später nicht.

#### 6. Wo findest du Werbemittel und Displaymaterial für dein Sortiment?

`POE-06` · Einfachauswahl · Werkstattbedarf

- Öffentlicher Downloadbereich
- **Im eingeloggten Händlerbereich (News, Termine, Werkstattunterlagen, Werbemittel)** ✓
- Nur über den Außendienst
- Im Händlerfinder

**Auflösung:** Werbemittel liegen im geschützten Bereich. Der Login lohnt sich — vieles, was Händler telefonisch anfragen, steht dort bereits.

#### 7. Ein Endkunde aus Bayern fragt, wo er den Einbau machen lassen kann. Was nennst du ihm?

`POE-07` · Einfachauswahl · Kunde am Telefon

- **Den Händlerfinder auf der THITRONIK-Website** ✓
- Die Support-Hotline
- Den Konfigurator
- Den Werkseinbau in Eckernförde als einzige Option

**Auflösung:** Der Händlerfinder ist genau dafür da. Eckernförde ist eine Möglichkeit, nicht die einzige.

#### 8. Ein Kunde will in Eckernförde einbauen lassen. Was ist der saubere Weg?

`POE-08` · Einfachauswahl · Werkseinbau

- **Terminanfrage über thitronik.de/einbautermin, Konfiguration als PDF aus dem Konfigurator hochladen, Fahrzeugdaten und vorhandene Geräte angeben** ✓
- Einfach hinfahren, es gibt Werkstatt-Kapazität
- Über den Händlerfinder buchen
- Per Kontaktformular ohne Fahrzeugdaten

**Auflösung:** Ohne Fahrzeugdaten und Konfiguration kann der Termin nicht sinnvoll geplant werden — die Anfrage bleibt dann liegen.

#### 9. „Eine Anfrage über das Terminformular ist bereits eine Terminbestätigung.“

`POE-09` · Richtig/Falsch · Richtig oder falsch

- Richtig
- **Falsch** ✓

**Auflösung:** Falsch. Eine Anfrage ist keine Zusage zu Termin, Preis, Dauer oder Leihfahrzeug. Diese Erwartung beim Kunden früh geradezurücken erspart Ärger.

---

## HIDDENSEE — Funk-Magnetkontakt & Adapter

| | |
|---|---|
| Fragen | 10 |
| Fragensatz-Version | 1 |
| Art | Funkkomponenten |
| Lernziel | Aufbau, Positionierung, Montage, Abstände und die typischen Montagefehler. |

**Quellen im Produktwissen:** `produkte/funk-magnetkontakt.md`

> **Redaktioneller Hinweis (erscheint nicht im Quiz):** Diese Insel gewinnt deutlich mit echten Werkstattfotos. Die Fragen 1, 5 und 9 sind als Bildfragen vorgesehen — sobald Fotos vorliegen, nur das Feld "media" ergänzen.

#### 1. Ein Standardkontakt ließ sich problemlos anlernen — beim Öffnen der Klappe passiert aber nichts. Woran liegt es am wahrscheinlichsten?

`HID-01` · Einfachauswahl · Der Klassiker

- Batterie leer
- **Die Platine ist falsch herum eingelegt — die Sende-LED zeigt zum Magneten** ✓
- Der Abstand ist zu klein
- Die Anlage war nicht scharf

**Auflösung:** In dieser Ausrichtung ist Anlernen möglich, eine Alarmierung erfolgt aber nicht. Deshalb nach der Montage immer Testalarm — die Anlern-Bestätigung allein beweist nichts.

#### 2. Wie groß darf der Abstand zwischen Sender und Magnet im geschlossenen Zustand für eine belastbare Montage höchstens sein?

`HID-02` · Einfachauswahl · Zahl

- 15 mm
- **22 mm** ✓
- 30 mm
- 45 mm

**Auflösung:** Die Quellen nennen unterschiedliche Werte: die wasserdichte Ausführung 22 mm, die Standard-Produktanleitung 25 mm, das WiPro-III-Handbuch 22 mm. Für eine belastbare Montage auf höchstens 22 mm auslegen.

#### 3. Bei der wasserdichten Ausführung: Welcher Abstand wird zum Anlernen und Funktionstest benötigt?

`HID-03` · Einfachauswahl · Falle

- 22 mm
- **Mehr als 30 mm** ✓
- Beliebig, Hauptsache getrennt
- 15 mm

**Auflösung:** 22 mm ist die Obergrenze im geschlossenen Zustand, mehr als 30 mm ist die Auslöseschwelle. Zwei völlig verschiedene Werte — sie werden regelmäßig verwechselt.

#### 4. Welche Regel gilt für welche Ausführung?

`HID-04` · Zuordnung · Nicht vermischen

| Zuzuordnen | Richtig |
|---|---|
| Sende-LED muss vom Magneten weg zeigen | Standard |
| Gehäusepfeile müssen zueinander zeigen | Wasserdicht |
| Montageadapter 100428 / 100729 | Standard |
| V4A-Senkkopfschrauben (nicht im Lieferumfang) | Wasserdicht |

**Auflösung:** Standard: Sende-LED weg vom Magneten, Montageadapter 100428/100729. Wasserdicht: Gehäusepfeile zueinander, V4A-Senkkopfschrauben. Die Regeln der einen Ausführung auf die andere zu übertragen ist der häufigste Fehler.

#### 5. Der Kontakt an der metallischen Heckgarage arbeitet unzuverlässig. Erste Maßnahme?

`HID-05` · Einfachauswahl · Werkstattfall

- Batterie tauschen
- Kontakt neu anlernen
- **Montageadapter verwenden (100428 schwarz / 100729 weiß) und Reichweitentest wiederholen** ✓
- Zweiten Kontakt parallel montieren

**Auflösung:** Metall in unmittelbarer Nähe dämpft die Funkstrecke. Der Adapter schafft Abstand — Batterie und Anlernen sind hier nicht die Ursache.

#### 6. Beim Öffnen einer Klappe ertönt ca. 2 Sekunden ein Ton aus der Zentrale, die rote Sende-LED bleibt rund 30 Sekunden an. Was bedeutet das — und was folgt daraus?

`HID-06` · Einfachauswahl · Batteriediagnose

- **Die CR2032 des zuletzt betätigten Senders ist schwach (unter ca. 2,6 V). Außerdem sollten weitere Knopfzellen ähnlichen Alters zeitnah geprüft werden** ✓
- Der Kontakt ist nicht angelernt
- Die Zentrale meldet einen Störsender
- Normale Sendebestätigung

**Auflösung:** Die Batteriewarnung betrifft immer nur den zuletzt betätigten Sender. Wurden alle Kontakte gleichzeitig verbaut, stehen die übrigen kurz davor.

#### 7. „Jede Fahrzeugtür braucht einen Funk-Magnetkontakt.“

`HID-07` · Richtig/Falsch · Richtig oder falsch

- Richtig
- **Falsch** ✓

**Auflösung:** Falsch. Türen, deren Öffnung im Kombiinstrument angezeigt wird, werden bei korrekt angeschlossener WiPro III meist bereits über den CAN-Bus überwacht. Am konkreten Fahrzeug prüfen.

#### 8. Es ist November, die Werkstatt ist auf 8 °C runtergekühlt. Du sollst Klebepads verarbeiten.

`HID-08` · Einfachauswahl · Praxis, Winter

- Kein Problem, Pads sind temperaturunabhängig
- **Nicht kleben — Klebepads nicht unter 15 °C Oberflächentemperatur verarbeiten. Außerdem ist die Endfestigkeit erst nach ca. 24 h erreicht** ✓
- Pad kurz mit Heißluft erhitzen und sofort belasten
- Doppelte Menge Kleber verwenden

**Auflösung:** Zu kalt verklebte Pads halten zunächst und lösen sich Wochen später — dann steht der Kunde mit einem stillen Kontakt da.

#### 9. An einer Aufbautür: Welches Teil kommt wohin?

`HID-09` · Einfachauswahl · Montagelogik

- **Sendergehäuse an den festen Rahmen, Magnet an das bewegliche Türblatt** ✓
- Umgekehrt — der Sender muss mitschwingen
- Egal, Hauptsache im Abstand
- Beide auf dem Türblatt

**Auflösung:** Der Sender enthält Elektronik und Batterie und gehört an das ruhende Teil. Der Magnet ist unempfindlich und darf sich bewegen.

#### 10. Bringe die Montageschritte in die richtige Reihenfolge.

`HID-10` · Reihenfolge · Reihenfolge

1. Anlernen
2. Reichweitentest am geplanten Ort
3. Endgültig kleben oder verschrauben
4. Testalarm mit scharfer Anlage

**Auflösung:** Anlernen → Reichweitentest → endgültig befestigen → Testalarm. Wer zuerst klebt und dann testet, klebt im Zweifel zweimal.

---

## SAMSØ — Einbauorte im Fahrzeug

| | |
|---|---|
| Fragen | 10 |
| Fragensatz-Version | 2 |
| Art | Wo kommt was hin? |
| Lernziel | Geeignete und ungeeignete Einbauorte, Unterschiede zwischen Fahrzeugtypen, typische Einbaufehler. |

**Quellen im Produktwissen:** `produkte/pro-finder.md`, `produkte/gas-pro-iii.md`, `produkte/nfc-modul.md`, `produkte/funk-rauchmelder.md`, `produkte/wipro-iii.md`, `fahrzeuge/*`

> **Redaktioneller Hinweis (erscheint nicht im Quiz):** Die Fragen 2 und 3 nutzen echte Einbaufotos, gehoben aus dem bestehenden FehlerQuiz. Die Alt-Texte wurden dabei neu geschrieben — im Bestandsquiz sind die Beschreibungen der Gaswarner-Bilder um eine Position verrutscht.

#### 1. Ordne jedem Gerät die vorgesehene Montagehöhe zu.

`SAM-01` · Zuordnung · Höhenzuordnung

| Zuzuordnen | Richtig |
|---|---|
| G.A.S.-pro III (Propan, Butan, KO-Gase) | Senkrecht, ca. 10–20 cm über dem Boden |
| G.A.S.-pro III CO | Senkrecht, ca. 10–20 cm unter der Decke |

Weitere Auswahlmöglichkeiten, die zu nichts passen: Waagerecht direkt an der Decke · Im Bodenstauraum außerhalb des Wohnraums

**Auflösung:** Gas ist schwerer als Luft, CO verteilt sich anders. Ein tief montierter Gassensor ersetzt keinen deckennahen CO-Sensor — und umgekehrt.

#### 2. Welches Bild zeigt den vorgesehenen Einbauort des Gaswarners?

`SAM-02` · Einfachauswahl · Einbauort Gaswarner

> Denk daran, wo sich Flüssiggas sammelt.

- `/media/samsoe/sam-gas-a.webp` — Gaswarner an einer senkrechten Fläche neben einer runden Öffnung, auf einer schwarzen Montageplatte
- `/media/samsoe/sam-gas-b.webp` — Gaswarner im Inneren eines Kleiderschranks, darüber hängen Kleiderbügel
- `/media/samsoe/sam-gas-c.webp` — Gaswarner oben an der Bedienkonsole über der Fahrerhaustür
- **`/media/samsoe/sam-gas-d.webp` — Gaswarner bodennah an der Verkleidung eines Sitzkastens** ✓

**Auflösung:** Flüssiggas ist schwerer als Luft. Das Hauptgerät gehört an eine senkrechte Fläche, etwa 10–20 cm über dem Boden — nicht in den Schrank und nicht direkt gegenüber einem Heizungsausströmer. Ebenfalls nicht neben einer AGM-Blei-Aufbaubatterie: Die kann beim Laden ausgasen und Fehlalarme auslösen. Mindestens 1 m Abstand zu Batterien und Nasszelle.

#### 3. Auf welchem Bild ist der Pro-finder korrekt montiert?

`SAM-03` · Einfachauswahl · Einbauort Pro-finder

> Prüfe Gehäuselage, Anschlüsse und Gerätekennzeichnung.

- `/media/samsoe/sam-finder-a.webp` — Modul mit Antennenanschluss, hochkant hinter einer Verkleidung
- `/media/samsoe/sam-finder-b.webp` — Unbeschriftetes Modul mit rotem Klebepad
- `/media/samsoe/sam-finder-c.webp` — Modul mit zwei weißen Steckverbindern
- **`/media/samsoe/sam-finder-d.webp` — Modul mit blauem Aufkleber und mehrfarbigem Kabelsatz, flach liegend** ✓

**Auflösung:** Der Pro-finder wird versteckt und möglichst flach montiert. Die integrierte GPS-Antenne zeigt Richtung Himmel und darf nicht von Metall verdeckt werden — der Aufkleber „GPS inside“ muss dabei nach oben zeigen. Trockener Innenraum, gegen Zugriff gesichert, für den Service aber erreichbar.

**Bild zur Auflösung:** `/media/samsoe/sam-finder-loesung.webp` — Der Aufkleber muss bei der Montage nach oben zeigen.

#### 4. Wie wird eine externe GPS-Antenne ausgerichtet?

`SAM-04` · Einfachauswahl · GPS-Antenne

- **Empfangsseite waagerecht nach oben** ✓
- Senkrecht zur Fahrtrichtung
- Nach unten, um Wasser abzuleiten
- Egal, sie empfängt kugelförmig

**Auflösung:** Die Satelliten stehen oben. Eine falsch ausgerichtete Antenne kostet Empfang, ohne dass es beim Einbau auffällt.

#### 5. Die Antennenleitung der WiPro III (Pin 10, weiß) ist deutlich zu lang für den gewählten Einbauort.

`SAM-05` · Einfachauswahl · Falle

- Auf 20 cm kürzen
- Sauber aufwickeln und mit Kabelbinder fixieren
- **Weder kürzen noch aufwickeln — Verlegung anpassen bzw. Montageort so wählen, dass die Leitung gestreckt geführt werden kann** ✓
- Verlängern mit Lautsprecherkabel

**Auflösung:** Die Leitung ist die Antenne. Kürzen und Aufwickeln verändern beide das Sendeverhalten — die Anlage arbeitet dann mit verringerter Reichweite, ohne einen Fehler zu melden.

#### 6. Wo wird das NFC Modul montiert — und welchen Nebeneffekt musst du dem Kunden nennen?

`SAM-06` · Einfachauswahl · NFC Modul

- **Innenseite einer geeigneten Scheibe, von außen gut erreichbar. Bei beheizbaren Frontscheiben ist mit höherem Verbrauch und kürzerer Batterielebensdauer zu rechnen** ✓
- Außen an der Karosserie, IP-geschützt
- Neben der WiPro-Zentrale im Schrank
- Im Fahrerhaus unter dem Armaturenbrett

**Auflösung:** Den Nebeneffekt bei beheizbaren Frontscheiben von sich aus ansprechen. Erfährt der Kunde ihn erst bei der ersten leeren Batterie, ist es ein Reklamationsfall.

#### 7. Das Fahrzeug hat eine Stoffdecke. Wie montierst du den T.S.A.?

`SAM-07` · Einfachauswahl · Rauchmelder

- Klebepad direkt auf den Stoff drücken, 60 s halten
- **Nicht auf den Stoff kleben — Montageadapter (105755 weiß / 105756 grau) verwenden und an einem seitlichen Kunststoffelement nahe der Decke befestigen** ✓
- Schrauben durch die Stoffdecke
- In eine Fahrzeugecke setzen

**Auflösung:** Auf Stoff hält kein Klebepad dauerhaft. Der Melder fällt irgendwann herunter — im schlechtesten Fall unbemerkt.

#### 8. Ein Liner hat 7,4 m Innenlänge mit Schiebetür zum Schlafbereich. Was folgt daraus für die Gaswarnung?

`SAM-08` · Einfachauswahl · Fahrzeuggröße

- **Zusätzlichen passenden Sensor vorsehen — über 6,5 m Innenlänge bzw. bei räumlicher Trennung braucht es einen zweiten Detektionspunkt. Zusatzsensorkabel konservativ auf max. 7 m Gesamtlänge auslegen** ✓
- Ein Hauptgerät reicht immer
- Zwei Hauptgeräte sind zwingend
- Nur ein CO-Sensor ist nötig

**Auflösung:** Eine geschlossene Schiebetür trennt den Luftraum. Hinter ihr wird ohne zweiten Detektionspunkt nichts erkannt.

#### 9. WiPro III und Pro-finder werden eingebaut. Was gilt für die Versorgung?

`SAM-09` · Einfachauswahl · Verdrahtung

- **Beide an dieselbe Fahrzeugbatterie. Verbindung untereinander über das dafür vorgesehene Verbindungskabel (RJ11)** ✓
- WiPro an Starter-, Pro-finder an Aufbaubatterie
- Beide direkt an die Solaranlage
- Pro-finder über Klemme 15

**Auflösung:** Getrennte Batterien führen zu unterschiedlichen Bezugspotenzialen und schwer auffindbaren Störungen. Klemme 15 fällt aus, sobald die Zündung aus ist — genau dann soll das Gerät arbeiten.

#### 10. Welche Komponenten haben keinen festen Einbauort im Fahrzeug? Wähle alle zutreffenden.

`SAM-10` · Mehrfachauswahl · Zuordnung

- **Funk-Handsender** ✓
- **KeyCard** ✓
- **KeyTag** ✓
- **KeyStrap** ✓
- NFC Modul
- Pro-finder
- G.A.S.-pro III

**Auflösung:** Funk-Handsender, KeyCard, KeyTag und KeyStrap sind persönliche Zugangsmedien, keine Einbauteile. NFC Modul, Pro-finder und G.A.S.-pro III haben feste, jeweils genau vorgegebene Einbauorte.

---

## FEHMARN — Fehlersuche & Support

| | |
|---|---|
| Fragen | 10 |
| Fragensatz-Version | 1 |
| Art | Fehler erkennen, Ursache bestimmen, Lösung wählen |
| Lernziel | Fehler erkennen, analysieren, Ursache bestimmen, Lösung auswählen, typische Supportfälle. |

**Quellen im Produktwissen:** `referenz/stoerungsbeseitigung.md`, `_intern/support-fallaufnahme.md`, `produkte/wipro-iii.md`, `produkte/pro-finder.md`

> **Redaktioneller Hinweis (erscheint nicht im Quiz):** Das bestehende FehlerQuiz (quiz_id fehlerquiz-de, 6 Bildfragen) läuft weiterhin separat und ist noch nicht in dieses System migriert. Dieser Fragensatz ist die anspruchsvollere zweite Ebene und ersetzt es nicht.

#### 1. Nach dem Unscharfschalten blinkt die Status-LED wiederholt 9× mit 5 s Pause. Was war los und was tust du?

`FEH-01` · Einfachauswahl · Alarmspeicher lesen

- Panikalarm — Handsender prüfen
- **Störsender bzw. Anti-Jamming-Ereignis — Ort und Zeitpunkt dokumentieren, mögliche Funkstörquellen prüfen. Anti-Jamming (DIP 7) nicht pauschal abschalten** ✓
- Funk-Kabelschleife — Kabel prüfen
- Innenbeleuchtungseingang

**Auflösung:** Der Blinkcode ist die einzige Quelle dafür, was tatsächlich ausgelöst hat. Anti-Jamming abzuschalten macht das Symptom weg, nicht die Ursache.

#### 2. „Seit dem Einbau schaltet mein Original-Fahrzeugschlüssel die Alarmanlage nicht mehr scharf — die Zentralverriegelung geht aber normal.“ Was prüfst du zuerst?

`FEH-02` · Einfachauswahl · Kundenanruf

- CAN-High und CAN-Low vertauscht
- **Ob DIP 5 bewusst auf ON steht — dann ist der Replay-Schutz aktiv und dieses Verhalten ist erwartungsgemäß** ✓
- Batterie des Fahrzeugschlüssels
- WiPro-Zentrale defekt, Austausch veranlassen

**Auflösung:** Erst wenn DIP 5 auf OFF steht, geht es an Fahrzeugprofil, DIP-Stellung und CAN-Anschluss. Ein Austausch ohne diese Prüfung kostet Zeit und löst nichts.

#### 3. Ein Kunde meldet: „Die LED am Pro-finder blinkt gelb.“ Was fehlt dir für eine belastbare Aussage?

`FEH-03` · Einfachauswahl · Diagnose-Voraussetzung

- **Die vollständige Seriennummer mit Präfix 0699 — gelbes Blinken bedeutet vor und ab 0699-045 etwas Verschiedenes** ✓
- Die Farbe der Fahrzeuglackierung
- Der Mobilfunkanbieter reicht aus
- Nichts, gelbes Blinken heißt immer „Zielrufnummernspeicher leer“

**Auflösung:** Derselbe Blinkcode bedeutet je nach Serienstand etwas anderes. Ohne vollständige Seriennummer ist jede Diagnose geraten.

#### 4. Ein Pro-finder sendet eine Spannungswarnung und reagiert danach auf keine SMS mehr. Einordnung?

`FEH-04` · Einfachauswahl · Spannung

- **Bei 11,2 V Warnung, danach Standby zum Tiefentladeschutz. Nach Laden und Versorgung über 12,5 V Rückkehr in den Normalbetrieb. Nicht automatisch defekt** ✓
- Modem defekt, Gerät einsenden
- SIM-Karte ist abgelaufen
- Sicherung mehrfach ziehen und wieder stecken

**Auflösung:** Das Gerät schützt die Batterie — es ist heil. Ein Einsenden an dieser Stelle ist der teuerste mögliche Weg zum selben Ergebnis.

#### 5. Ein Kollege will die G.A.S.-pro III „mal eben mit dem Feuerzeug testen“.

`FEH-05` · Einfachauswahl · Sicherheitsgrenze

- Kurz und aus 1 m Abstand ist ok
- **Nicht durchführen — laut Kurzanleitung ist ein Anwendertest mit Feuerzeuggas wegen des Auswertungsalgorithmus nicht vorgesehen. Das Gerät hat einen automatischen Sensorselbsttest** ✓
- Nur bei der CO-Variante erlaubt
- Nur mit geöffnetem Fenster

**Auflösung:** Der Selbsttest des Geräts ist die vorgesehene Prüfung. Ein Feuerzeugtest kann den Sensor beeinflussen und sagt über die tatsächliche Funktion nichts Belastbares aus.

#### 6. Eine frisch angeschlossene G.A.S.-pro III pulsiert ca. 4 Minuten blau. Was heißt das?

`FEH-06` · Einfachauswahl · Zustand richtig lesen

- Sensorfehler
- **Normale Vorheizphase — noch keine bestätigte Betriebsbereitschaft. Erst der grüne Normalzustand bestätigt sie** ✓
- Unterspannung
- Funkverbindung wird aufgebaut

**Auflösung:** Wer die Werkstatt vor dem grünen Zustand verlässt, weiß nicht, ob das Gerät betriebsbereit geworden ist.

#### 7. Nach einem Sicherungswechsel meldet die WiPro einen offenen Magnetkontakt, obwohl alle Klappen zu sind.

`FEH-07` · Einfachauswahl · Nach Spannungsunterbrechung

- **Alle betroffenen Kontakte mehrmals vollständig öffnen und schließen — der Zustand wird dann neu eingelesen** ✓
- Alle Kontakte löschen und neu anlernen
- Zentrale zurücksetzen
- Batterien aller Kontakte tauschen

**Auflösung:** Die Zentrale kennt den Zustand erst wieder, wenn jeder Kontakt einmal gesendet hat. Löschen und Neuanlernen erzeugt dasselbe Ergebnis mit erheblich mehr Aufwand.

#### 8. Ein Fahrzeug wurde gestohlen, eine Abschalteinrichtung ist verbaut. Welcher Befehl ist zulässig?

`FEH-08` · Einfachauswahl · Höchste Sicherheitsstufe

- a an
- a 30
- **kill — wartet, bis die GPS-Geschwindigkeit mindestens 5 Sekunden durchgehend 0 km/h beträgt, und schaltet erst dann Ausgang A** ✓
- status genügt

**Auflösung:** „a an“ und „a N“ schalten ohne Geschwindigkeitsprüfung und sind zur Fahrzeugstilllegung unzulässig. Und ebenso wichtig: nicht selbst zum Fahrzeug fahren.

#### 9. „Meine Frau bekommt die Alarm-SMS, ich nie.“ Was erklärst du?

`FEH-09` · Einfachauswahl · Alarmweiterleitung

- **Alarm-SMS werden nacheinander versendet. Wird ein Testalarm sofort beendet, bleiben spätere Zielrufnummern unbenachrichtigt — einen kontrollierten Test nicht abbrechen** ✓
- Nur die Masternummer bekommt SMS
- Die zweite Nummer muss als Smartphone gekennzeichnet sein
- Maximal eine Zielrufnummer ist möglich

**Auflösung:** Der vermeintliche Fehler entsteht meist beim Testen selbst. Den Test vollständig durchlaufen lassen, dann kommen alle Nummern dran.

#### 10. Welche Angaben sind vor der Eskalation an THITRONIK Pflicht? Wähle alle zutreffenden.

`FEH-10` · Mehrfachauswahl · Support-Fallaufnahme

- **Vollständige Seriennummern aller beteiligten Komponenten** ✓
- **Fahrzeug, Modelljahr, Aufbauart** ✓
- **Erwartetes und tatsächliches Verhalten sowie die Bedienreihenfolge** ✓
- **LED- und Blinkcode, Signalton, SMS-Wortlaut möglichst wörtlich** ✓
- SIM-PIN und Kundenpasswörter

**Auflösung:** Die ersten vier Angaben sind Pflicht. SIM-PIN und Kundenpasswörter gehören ausdrücklich nicht ins Ticket — sie werden für die Diagnose nicht gebraucht.

---

## USEDOM — Verkaufsdisplay & Konfigurator

| | |
|---|---|
| Fragen | 10 |
| Fragensatz-Version | 1 |
| Art | Vom Einzelprodukt zum System |
| Lernziel | Vom Einzelprodukt zum System — und ehrliche Grenzen kennen. |

**Quellen im Produktwissen:** `referenz/systemueberblick.md`, `produkte/bt-connect.md`, `produkte/nfc-modul.md`, `referenz/zugang-bedienung.md`

> **Redaktioneller Hinweis (erscheint nicht im Quiz):** Produktbilder für die Displayfragen liegen bereits in Wissen/03_Medien/produkte/. Frage 4 ist als Bildfrage vorbereitet.

#### 1. Kunde: „Ich will eine Alarmanlage, Ortung bei Diebstahl und bequem ohne Schlüssel öffnen.“ Welche Kombination zeigst du am Display?

`USE-01` · Einfachauswahl · Bedarfsanalyse

- **WiPro III (safe.lock je nach Fahrzeug) + Pro-finder + NFC Modul + KeyCard/KeyTag/KeyStrap** ✓
- Nur Pro-finder und NFC Modul
- BT-connect und KeyCard
- G.A.S.-pro III und Funk-Handsender

**Auflösung:** Drei Kundenwünsche, drei Bausteine — plus das Zugangsmedium. Wer einen davon weglässt, erfüllt den Wunsch nicht vollständig.

#### 2. Kunde: „Ich nehme nur das BT-connect, eine Alarmanlage brauche ich nicht.“

`USE-02` · Einfachauswahl · Abhängigkeit

- Geht, BT-connect funktioniert eigenständig
- **Geht nicht — BT-connect ist ein Bedienweg und setzt eine WiPro III bzw. WiPro III safe.lock voraus** ✓
- Geht nur mit Pro-finder
- Geht nur mit NFC Modul

**Auflösung:** BT-connect bedient etwas — es ersetzt nichts. Ohne WiPro III gibt es nichts zu bedienen.

#### 3. Kunde: „Mit BT-connect kann ich also aus dem Restaurant am Hafen mein Wohnmobil scharfschalten?“

`USE-03` · Einfachauswahl · Reichweiten-Falle

- Ja, bis 50 m immer
- **Nein — BT-connect ist ein lokaler Bluetooth-Nahbereichsweg ohne Mobilfunk und GPS. Für die Bedienung aus der Ferne ist der Pro-finder da** ✓
- Ja, wenn das Handy im WLAN ist
- Nur mit safe.lock

**Auflösung:** Diese Erwartung entsteht im Verkaufsgespräch schnell und fällt beim Kunden im Urlaub auf. Besser jetzt klarstellen.

#### 4. Welche Komponente auf dem Display übernimmt die Fahrzeugortung?

`USE-04` · Einfachauswahl · Displayzuordnung

- **Pro-finder (mit Pro-finder Antenne bei ungünstigem Empfang)** ✓
- BT-connect
- NFC Modul
- WiPro III

**Auflösung:** Der Pro-finder ist das Ortungsgerät. Die Antenne ist Zubehör für ungünstige Einbaulagen, kein eigenes Produkt.

#### 5. Kunde: „Mit der KeyCard schließe ich mein Fahrzeug auf und zu, oder?“

`USE-05` · Einfachauswahl · Die wichtigste Abgrenzung

- Ja, immer
- **Scharf- und Unscharfschalten ja. Ver- und Entriegeln der Zentralverriegelung nur mit WiPro III safe.lock, passender Fahrzeuganbindung und geeignetem Softwarestand** ✓
- Nein, die KeyCard kann nur entriegeln
- Nur mit zusätzlichem BT-connect

**Auflösung:** Scharf/Unscharf und Ver-/Entriegeln sind technisch zwei verschiedene Vorgänge. Das ist der häufigste Beratungsfehler überhaupt — er zieht sich durch das gesamte Sortiment.

#### 6. Ein Kunde hat keine WiPro und will nur Gaswarnung. Was zeigst du?

`USE-06` · Einfachauswahl · Gaswarnung ohne Alarmanlage

- **G.A.S.-pro III (eigenständig, eigene 94-dB-Sirene) oder G.A.S. bzw. G.A.S.-plug** ✓
- G.A.S.-connect — das ist die günstigste Lösung
- Gaswarnung ist ohne WiPro nicht möglich
- Nur den externen Zusatzsensor

**Auflösung:** G.A.S.-connect hat keine eigene Sirene und ist Funkzubehör für die WiPro III. Als Standalone-Lösung verkauft, warnt es niemanden.

#### 7. Kunde: „Der Gaswarner erkennt dann auch Kohlenmonoxid von meiner Heizung?“

`USE-07` · Einfachauswahl · CO-Falle

- Ja, alle G.A.S.-Geräte erkennen CO
- **Nein — G.A.S.-pro III (101286) und G.A.S.-pro III CO (101287) sind getrennte Geräte. Ohne geeigneten externen CO-Sensor erkennt die Standardausführung kein CO** ✓
- Ja, aber nur mit WiPro-Anbindung
- CO wird vom Rauchmelder abgedeckt

**Auflösung:** Eine falsche Zusage an dieser Stelle ist sicherheitsrelevant. Der Kunde verlässt sich auf einen Schutz, den das Gerät nicht bietet.

#### 8. Wie viele NFC-Medien lassen sich pro NFC Modul insgesamt speichern?

`USE-08` · Einfachauswahl · Zahlen am Display

- 8
- 9
- **14** ✓
- 100

**Auflösung:** 14 insgesamt — die mitgelieferte KeyCard zählt mit. Einzelne Medien lassen sich nicht selektiv löschen: bei Verlust kompletter Tag-Reset und alle Medien neu anlernen.

#### 9. Warum arbeitet die WiPro III bewusst ohne Bewegungsmelder? Bestes Argument gegenüber dem Kunden?

`USE-09` · Einfachauswahl · Verkaufsargument

- **Bewegungsmelder reagieren in Freizeitfahrzeugen auf Gardinen, Erschütterungen, Insekten und Haustiere. Über definierte Öffnungen kann die Anlage auch scharf bleiben, während Personen im Fahrzeug sind** ✓
- Bewegungsmelder sind zu teuer
- Sie sind gesetzlich nicht zugelassen
- Die Anlage ist dadurch komplett fehlalarmfrei

**Auflösung:** Das ist ein echtes Konstruktionsargument, kein Sparargument. Vorsicht bei Antwort D: „völlig fehlalarmfrei“ ist keine zulässige Zusage.

#### 10. Was machst du mit dem Konfigurator-Ergebnis?

`USE-10` · Einfachauswahl · Konfigurator

- **Auf Plausibilität prüfen und mit Fahrzeug- und Einbauwissen abgleichen, dann als PDF für Angebot oder Einbautermin-Anfrage nutzen** ✓
- Ungeprüft als verbindliche Zusage verkaufen
- Nur intern verwenden
- Dem Kunden die internen Einbauunterlagen mitgeben

**Auflösung:** Der Konfigurator ist ein Werkzeug, keine Freigabe. Dein Fahrzeugwissen entscheidet, ob das Ergebnis am konkreten Fahrzeug trägt.

---

## LANGELAND — Fahrzeugannahme & Fahrzeugübergabe

| | |
|---|---|
| Fragen | 10 |
| Fragensatz-Version | 1 |
| Art | Der Prozess vor und nach dem Schraubendreher |
| Lernziel | Der gesamte Ablauf mit dem Kunden, nicht nur die Technik. |

**Quellen im Produktwissen:** `referenz/fahrzeugkompatibilitaet.md`, `produkte/wipro-iii.md`, `referenz/zugang-bedienung.md`, `_intern/support-fallaufnahme.md`

#### 1. Ein Kunde bringt sein Fahrzeug zur Erweiterung eines bestehenden Systems. Was gehört zwingend in die Annahme?

`LAN-01` · Einfachauswahl · Annahme, Pflichtangaben

- **Fahrzeug, Modelljahr, Aufbauart — plus vollständige Seriennummer und, soweit ermittelbar, Softwarestand jeder vorhandenen THITRONIK-Komponente** ✓
- Nur Fahrzeugmodell und Kundenwunsch
- Nur die Artikelnummern der Neuteile
- Kilometerstand und Tankfüllung

**Auflösung:** Ohne Seriennummer und Softwarestand ist keine belastbare Kompatibilitätsaussage möglich. Das rächt sich später im Supportfall — dann steht das Fahrzeug bereits zerlegt in der Halle.

#### 2. Ein Mercedes Sprinter VS30 (Baujahr 2021) soll eine WiPro III bekommen. Welchen Punkt musst du schon bei der Annahme ansprechen?

`LAN-02` · Einfachauswahl · Risiko früh ansprechen

- **Bei diesem Fahrzeug ist die Fahrzeughupe ohne Zündung nicht verfügbar. Je nach Anleitung ist eine Back-up-Sirene (100089) oder Zusatzhupe (105339) nötig und gehört ins Angebot** ✓
- Der Sprinter braucht immer safe.lock
- Es wird kein Testalarm möglich sein
- Kein Thema, die Hupe funktioniert immer

**Auflösung:** Ein Zusatzteil, das erst bei der Rechnung auftaucht, ist ein Konflikt. Dasselbe Teil im Angebot ist eine Selbstverständlichkeit.

#### 3. Ein Kunde ruft an: „Ich habe einen Iveco Daily, Modelljahr 2026, wann kann ich kommen?“

`LAN-03` · Einfachauswahl · Freigabe-Falle

- Termin sofort zusagen, Iveco ist Standard
- **Kein Termin ohne Prüfung — für Iveco Daily ab Modelljahr 2025/2026 ist wegen BCM-Änderungen derzeit kein Einbau freigegeben. Vor jeder Zusage mit THITRONIK klären** ✓
- Termin zusagen und vor Ort improvisieren
- Universalanschluss verwenden

**Auflösung:** Ein zugesagter und dann abgesagter Termin kostet mehr Vertrauen als ein ehrliches „das kläre ich und rufe zurück“.

#### 4. Fahrerhaustüren sind über den Innenbeleuchtungseingang angebunden, nicht über den CAN-Bus. Wann kannst du den Testalarm durchführen?

`LAN-04` · Einfachauswahl · Testfalle bei der Abnahme

- Sofort nach dem Scharfschalten
- **Frühestens 60 Sekunden nach Aktivierung** ✓
- Erst nach 5 Minuten
- Gar nicht, nur CAN-Türen sind testbar

**Auflösung:** Wer zu früh testet, hält eine korrekt arbeitende Anlage für defekt und beginnt eine Fehlersuche, die es nicht braucht.

#### 5. Ein Kunde holt sein Fahrzeug nach Einbau von WiPro III und Pro-finder ab. Was gehört zwingend in die Übergabe? Wähle alle zutreffenden.

`LAN-05` · Mehrfachauswahl · Übergabe, Pflichtprogramm

- **Scharf- und Unscharfschalten über jeden vorgesehenen Bedienweg vorführen** ✓
- **Mindestens einen echten Testalarm zeigen, den der Kunde selbst ausprobiert** ✓
- **Alarmspeicher erklären: Der Blinkcode der Status-LED sagt, was ausgelöst hat** ✓
- **Panikfunktion und deren Beenden zeigen** ✓
- **Batteriewarnung erklären: ca. 2 s Ton aus der Zentrale und rote Sende-LED für ca. 30 s** ✓
- **Zielrufnummern des Pro-finders gemeinsam testen, Masternummer zuerst** ✓
- Dem Kunden die SIM-PIN auf einen Zettel schreiben

**Auflösung:** Sechs Punkte sind Pflicht. Die SIM-PIN auf einem Zettel ist ein Sicherheitsrisiko und gehört nicht zur Übergabe.

#### 6. Fahrzeug mit safe.lock im Campingmodus. Welchen Hinweis gibst du dem Kunden zwingend mit?

`LAN-06` · Einfachauswahl · Campingmodus

- **Im Campingmodus grundsätzlich über den vorgesehenen THITRONIK-Bedienweg verriegeln. Wird mit dem Originalschlüssel verriegelt, kann die spätere Entriegelung über THITRONIK-Zubehör bei bestimmten Fahrzeugen blockiert sein** ✓
- Der Originalschlüssel funktioniert immer als Rückfallebene
- Der Campingmodus muss vor jeder Fahrt deaktiviert werden
- Im Campingmodus ist der Alarm inaktiv

**Auflösung:** Genau dieser Fall führt zu Anrufen vom Stellplatz. Einmal bei der Übergabe erklärt, tritt er nicht auf.

#### 7. Welche Aussage darfst du bei der Übergabe nicht machen?

`LAN-07` · Einfachauswahl · Erwartungsmanagement

- „Die Anlage meldet Einbruchereignisse akustisch und optisch.“
- **„Damit kann Ihnen niemand mehr ins Fahrzeug einbrechen.“** ✓
- „Nicht abgesicherte Öffnungen bleiben ungeschützt — wir haben X, Y und Z abgesichert.“
- „Nach einem Alarm bleibt die Überwachung aktiv.“

**Auflösung:** Eine Alarmanlage meldet, sie verhindert nicht. Diese Zusage ist inhaltlich falsch und im Schadensfall ein Problem.

#### 8. Der Kunde bedient alles nur über die App. Was empfiehlst du?

`LAN-08` · Einfachauswahl · Backup-Beratung

- **Mindestens zwei voneinander unabhängige Bedienwege — zum Beispiel zusätzlich einen zuvor geprüften Funk-Handsender 868. Leerer Handy-Akku, deaktiviertes Bluetooth oder eine verlorene Kopplung sperren sonst den Zugang** ✓
- Reicht aus, die App ist zuverlässig
- Zweites Smartphone koppeln genügt
- Originalschlüssel im Fahrzeug deponieren

**Auflösung:** Zwei Smartphones sind kein zweiter Weg — sie teilen dieselbe Technik und dieselben Fehlerquellen. Und der Schlüssel im Fahrzeug hebt die Sicherung auf.

#### 9. Die Zentrale kam aus dem Upgrade zurück und ist wieder eingebaut. Was ist jetzt zwingend?

`LAN-09` · Einfachauswahl · Nach einem safe.lock-Upgrade

- **Sämtliches Funk-Zubehör neu anlernen — der Speicher wurde gelöscht. Danach vollständige Ein- und Ausgangstests inklusive Zentralverriegelung** ✓
- Nur den Master-Handsender neu anlernen
- Nichts, der Speicher bleibt erhalten
- Nur die Seriennummer in der App aktualisieren

**Auflösung:** Nach dem Upgrade ist der Funkspeicher leer. Wird nur der Handsender angelernt, fehlen sämtliche Magnetkontakte — und niemand merkt es bis zum Ernstfall.

#### 10. Was gehört nach der Übergabe in die Akte — mit Blick auf spätere Supportfälle?

`LAN-10` · Einfachauswahl · Dokumentation

- **Verbaute Produkte mit Artikel- und Seriennummern, Softwarestände, DIP-Stellung (Foto), Fahrzeugdaten, durchgeführte Tests und deren Ergebnis, Einbaudatum und Betrieb** ✓
- Nur die Rechnungsnummer
- Nur die Fahrzeugdaten
- Nur die Artikelnummern der Neuteile

**Auflösung:** Das Foto der DIP-Stellung ist der am häufigsten vergessene und im Supportfall wertvollste Teil der Dokumentation.

