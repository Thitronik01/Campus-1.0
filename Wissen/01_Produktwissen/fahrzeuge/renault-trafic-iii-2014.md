---
title: Renault Trafic III / Opel Vivaro B / Nissan NV300 / Fiat Talento (2014–2021)
sources:
  - >-
    D:/Thitronik WIKI
    (ml)/wiki/de/wipro_iii_fiat_talento___renault_trafic_iii.pdf
  - 'D:/Thitronik WIKI (ml)/wiki/de/wipro_iii-installationsanleitung_1.8.pdf'
updated: '2026-07-22'
confidence: high
lang: de
dealerStatus: approved
---

# Renault Trafic III / Opel Vivaro B / Nissan NV300 / Fiat Talento (2014–2021)

Dieser Artikel beschreibt den Einbau einer WiPro III in Renault Trafic III, Opel Vivaro B, Nissan NV300 und Fiat Talento der Baujahre 2014 bis 2021. Das fahrzeugspezifische Einbauhandbuch Stand `05/22` dokumentiert das Fahrzeugprofil, den CAN-Anschluss, Warnblinker, Versorgung, Zündung, Masse, Fahrzeughupe, Status-LED, Funk-Zubehör und den abschließenden Funktionstest.

> **Abgrenzung:** Für Renault Trafic III und Nissan Primastar ab 2022 gelten ein vollständig abweichendes DIP-Profil (`SW1 + SW2 + SW4 + SW5 + SW6`) und eine andere CAN-Anschlussstelle; siehe [[Renault Trafic III / Nissan Primastar (ab 2022)|Renault Trafic III ab 2022]].

## Geltungsbereich

| Merkmal | Vorgabe |
|---|---|
| Fahrzeuge | Renault Trafic III, Opel Vivaro B, Nissan NV300 und Fiat Talento |
| Baujahre | 2014–2021 |
| Primärsystem | WiPro III, Set Art. `100754` |
| Mindestseriennummer | `0823-014`, ausdrücklich im Fahrzeughandbuch genannt |
| Kompatibilitätsbasis | `0823-014 / 5.9` gemäß freigegebener Kompatibilitätsmatrix; Fahrzeughandbuch nennt selbst nur die Seriennummer |
| Fahrzeugkonfiguration | `SW3 + SW6` auf `ON` |
| Bedienung im dokumentierten Funktionstest | einmal mit der Original-Fahrzeugfernbedienung verriegeln |

Seriennummer, Softwarestand und Geräteausführung sind vor dem Einbau über [[Seriennummern und Softwarestände — Präfixe, Schwellen und Meilensteine|Seriennummern und Softwarestände]] zu prüfen.

## Fahrzeugprofil und Replay-Schutz trennen

| Funktion | Voraussetzung | DIP-Stellung | Wirkung |
|---|---|---|---|
| Fahrzeugprofil Trafic III / Talento 2014–2021 | fahrzeugspezifisches Einbauhandbuch | `SW3 + SW6` | aktiviert das dokumentierte CAN-Profil und die Fahrzeugbedienung |
| Allgemeiner Replay-Schutz | ab Seriennummer `0823-014` beziehungsweise Software `5.8` | zusätzlich `SW5` | Original-Fahrzeugfunkschlüssel steuert die WiPro nicht mehr; die Auswertung der Fahrzeugtüren bleibt aktiv |

`SW5` gehört **nicht** zur fahrzeugspezifischen Grundstellung und darf nicht pauschal zu `SW3 + SW6` addiert werden. Der Funktionstest des Fahrzeughandbuchs mit der Original-Fahrzeugfernbedienung setzt voraus, dass dieser allgemeine Replay-Schutz nicht aktiv ist. Wird `SW5` bewusst verwendet, muss die Bedienung der WiPro über einen angelernten [[Funk-Handsender 868 — Fernbedienung für WiPro III|Funk-Handsender 868]] oder einen anderen für das konkrete System freigegebenen Bedienweg erfolgen.

Grundlagen und weitere optionale DIP-Funktionen beschreibt [[Fahrzeugkompatibilität — Übersichtsmatrix & DIP-Grundlagen|Fahrzeugkompatibilität]]. Alle Schalterstellungen nur im spannungsfreien Zustand ändern; dabei dürfen weder der 20-polige WiPro-Stecker noch der Pro-Finder-Stecker eingesteckt sein.

## Sicherheit und Arbeitsvorbereitung

- Arbeiten an Fahrzeugelektrik und -elektronik gehören in die Hände einer qualifizierten Fachkraft.
- Vor Beginn vorhandene Warnlampen, Beleuchtungsfehler und Fehlerspeichereinträge prüfen und dokumentieren.
- Spannungsversorgung trennen, bevor das WiPro-Gehäuse geöffnet, DIP-Schalter verändert oder Fahrzeugleitungen bearbeitet werden.
- Steckerform, Pinnummer, Leitungsfarbe und Signal am tatsächlichen Fahrzeug gemeinsam verifizieren.
- Für CAN, Warnblinker und Hupe die vom Fahrzeughandbuch geforderten gelgefüllten Verbinder verwenden.
- Ungenutzte Ein- und Ausgänge einzeln isolieren; Leitungen weder quetschen noch an scharfen oder bewegten Teilen verlegen.
- Weichen Fahrzeuggegebenheiten von Anleitung oder Abbildungen ab, Arbeiten stoppen und Hersteller beziehungsweise THITRONIK-Support kontaktieren.

Benötigt werden unter anderem Kreuzschlitzschraubendreher PH2 oder Torx 25, geeignete Zangen, Messgerät, Ringöse, der mitgelieferte Sicherungshalter sowie ein `8-mm`-Bohrer für die Status-LED.

## Funk-Zubehör vor der Montage anlernen

Sämtliches Funk-Zubehör aus dem Lieferumfang und zusätzliches Zubehör mit dem Kennzeichen `868` muss einmalig angelernt werden.

1. Den Taster rechts neben dem Anschlussstecker drücken und halten, bis die WiPro piept; die Status-LED leuchtet dauerhaft.
2. Jeden zu speichernden Funk-Magnetkontakt, Funk-Handsender, jede Funk-Kabelschleife und jeden Funk-Gaswarner zwei- bis dreimal auslösen.
3. Dazu den Magneten mehr als `30 mm` von der Sendeeinheit entfernen, Handsendertasten drücken, Gaswarner einschalten oder die Kabelschleife aus ihrer Halterung nehmen.
4. Den Bestätigungston und das kurze Erlöschen der Status-LED für jede Komponente abwarten.
5. Zum Beenden des Anlernmodus die Anlage kurz spannungsfrei machen oder den Taster an der WiPro kurz drücken.

Der allgemeine Ablauf und die Abgrenzung zum Diagnosemodus stehen unter [[Anlernvorgang — Funk-Zubehör an WiPro III anlernen|Anlernvorgang]].

## Armaturenbrettverkleidung entfernen

1. Seitliche, geclipste Armaturenbrettverkleidung vorsichtig lösen.
2. Klappfach entfernen.
3. Verkleidung der Mittelkonsole ein Stück abziehen.
4. Die zwei freigelegten Schrauben entfernen.
5. Unteres Verkleidungsteil abnehmen und den Bodycomputer im Fahrerfußraum zugänglich machen.

Clips, Leitungen und Steckverbindungen dürfen beim Ausbau nicht beschädigt oder unter Zug gesetzt werden.

## CAN-Verbindung am Stecker S1

Der CAN-Abgriff befindet sich am Bodycomputer im Fahrerfußraum am **Stecker S1**.

| Anschlussort | Fahrzeugleitung | WiPro-Leitung | Funktion |
|---|---|---|---|
| Bodycomputer, Stecker S1, Pin 4 | grau | weiß/orange | CAN-High |
| Bodycomputer, Stecker S1, Pin 3 | grün | violett/orange | CAN-Low |

Beide CAN-Leitungen müssen vom selben Stecker S1 stammen. Pinbelegung, Farbe und Signal vor dem Verbinden kontrollieren; CAN-High und CAN-Low nicht vertauschen.

## Warnblinker anschließen

1. Warnblinkerschalter ausbauen.
2. Naturfarbene beziehungsweise beige Fahrzeugleitung am Schalter identifizieren und messen.
3. Diese Leitung mit der rot/rosa Leitung der WiPro über einen gelgefüllten Verbinder verbinden.
4. Warnblinkerschalter wieder einsetzen und Leitung gegen Quetschen sichern.

Der Anschluss dient der optischen Alarmierung und der dokumentierten Rückmeldung beim Schärfen.

## Dauerplus, Zündung und Masse anschließen

Den Sicherungskasten oben entriegeln und in Richtung Fahrersitz abziehen. Dauerplus und Zündungsplus nur an Leitungen mit geeignetem Querschnitt von mindestens `1 mm²` abgreifen.

| Anschluss | Fahrzeugleitung | WiPro-Leitung | Vorgabe |
|---|---|---|---|
| Klemme 30 / Dauerplus | rot | rot | WiPro-Versorgung über mitgelieferten Sicherungshalter mit `10 A` absichern |
| Klemme 15 / Zündung | gelb | gelb | Zündungsplus vor dem Anschluss messen |
| Klemme 31 / Massepunkt oberhalb des Sicherungskastens | Karosseriemasse | schwarz mit Ringöse | blanken, tragfähigen Massepunkt verwenden und fest verschrauben |

Versorgung erst nach Abschluss und Kontrolle aller Anschlussarbeiten herstellen. Sicherungshalter zugänglich und scheuerfrei montieren.

## Fahrzeughupe anschließen

1. Lenksäulenverkleidung entfernen.
2. Zweipoligen Stecker unterhalb des Lenkrads abziehen.
3. Schwarze Fahrzeugleitung am Stecker identifizieren.
4. Schwarze Fahrzeugleitung mit der grauen WiPro-Leitung an **Pin 12** über einen gelgefüllten Verbinder verbinden.
5. Stecker vollständig einsetzen und Lenksäulenverkleidung spannungsfrei montieren.

Fahrzeughupe, interne Sirene und gegebenenfalls separate Zusatzsirene sind unterschiedliche Alarmgeber. Hinweise zu deren Abgrenzung enthält [[Sirenen und Hupen — Akustische Alarmmittel|Sirenen und Hupen]].

## Status-LED montieren

1. Rückseite des vorgesehenen Montageorts auf Leitungen und Bauteile prüfen.
2. Loch mit `8 mm` Durchmesser bohren.
3. Status-LED einsetzen.
4. Rot/schwarzes LED-Kabel mit weißem Steckverbinder wieder mit dem Gegenstück des WiPro-Kabelsatzes verbinden.

Die Status-LED muss für Bedienrückmeldung, Diagnose und Auslesen des Alarmspeichers sichtbar bleiben.

## Funk-Magnetkontakte montieren

Die Funk-Magnetkontakte erst nach dem Anlernen und einem Reichweitentest endgültig befestigen. Ausführliche Vorgaben enthält [[Funk-Magnetkontakt 868 — Montage und Betrieb|Funk-Magnetkontakt 868]].

| Prüffeld | Vorgabe |
|---|---|
| Platinenlage | Sende-LED vom Magneten wegweisend ausrichten |
| Fehlmontage | zeigt die Sende-LED zum Magneten, ist Anlernen möglich, eine Alarmierung erfolgt jedoch nicht |
| Magnetposition | im geschlossenen Zustand innerhalb des dokumentierten Bereichs von etwa `22–30 mm` |
| Klebefläche | sauber, trocken und fettfrei |
| Verarbeitungstemperatur | nicht unter `15 °C` |
| Endfestigkeit der Klebepads | nach etwa `24 Stunden` |
| Große Abstände / ungünstige Antennenlage | Montageadapter Art. `100428` oder `100729` prüfen |

Sendergehäuse möglichst am Rahmen und Magnet am beweglichen Türblatt beziehungsweise an der Klappe befestigen. Bei Schraubbefestigung nur die markierten Stellen auf der Innenseite des Sendergehäuses verwenden.

## Funktionstest durchführen

Der folgende Ablauf entspricht dem fahrzeugspezifischen Handbuch bei **nicht aktiviertem `SW5`**:

1. Fahrzeugtüren und alle angelernten Kontakte schließen.
2. Verriegelungstaste der Original-Fahrzeugfernbedienung einmal drücken.
3. Prüfen, ob die WiPro scharf schaltet, das Fahrzeug verriegelt und die Blinker Rückmeldung geben.
4. Fahrertür mechanisch von innen mit dem Türgriff oder von außen mit dem mechanischen Schlüssel öffnen.
5. Akustischen Alarm für etwa `30 Sekunden` prüfen.
6. Optischen Alarm über die Fahrzeugblinker für etwa `180 Sekunden` prüfen.
7. Öffnungstaste des Originalschlüssels oder eine beliebige Taste eines angelernten THITRONIK-Handsenders drücken und prüfen, ob die WiPro entschärft beziehungsweise der Alarm unterbrochen wird.
8. Blinkfolge des Alarmspeichers über die Status-LED kontrollieren.
9. Testalarm mit jedem angelernten Funk-Magnetkontakt, jeder Funk-Kabelschleife und jedem weiteren Funk-Sensor wiederholen.

Das allgemeine Installationshandbuch nennt in seiner Funktionsübersicht `120 Sekunden` für die optische Alarmierung, im detaillierten Testkapitel jedoch `180 Sekunden`. Für dieses Fahrzeug gilt die konkrete Angabe von `180 Sekunden` aus dem neueren fahrzeugspezifischen Handbuch.

## CAN- und Funkdiagnose

### CAN-Diagnose

1. Taster an der WiPro kurz drücken, bis die Status-LED am Kabelbaum blinkt.
2. Original-Fahrzeugfernbedienung oder Warnblinker betätigen, um CAN-Datenverkehr zu erzeugen.
3. Prüfen, ob die grüne Diagnose-LED abhängig von der Datenrate blinkt oder flackert.
4. Bleibt die Reaktion aus, Pin 3/4, Stecker S1, Verbinder sowie Zuordnung von CAN-High und CAN-Low prüfen.
5. Diagnosemodus durch erneutes kurzes Drücken des Tasters beenden.

### Funkdiagnose

Im Diagnosemodus jede angelernte Funkkomponente am vorgesehenen Montageort auslösen. Die WiPro quittiert jedes empfangene Signal akustisch. Fehlt die Quittierung, Anlernstatus, Montageort, abschirmende Metallteile und gegebenenfalls einen Montageadapter prüfen.

## Typische Fehlerbilder

| Fehlerbild | Prüfung / Maßnahme |
|---|---|
| Original-Fahrzeugfunkschlüssel verriegelt das Fahrzeug, steuert die WiPro aber nicht | DIP-Profil `SW3 + SW6`, optional aktiviertes `SW5`, CAN-High/Low und Verbindung an S1 prüfen |
| Keine CAN-Aktivität im Diagnosemodus | Pin 4 grau / weiß-orange und Pin 3 grün / violett-orange prüfen; CAN-Leitungen nicht vertauschen |
| Keine optische Alarmierung | beige Leitung am Warnblinkerschalter und rot/rosa WiPro-Leitung prüfen |
| Fahrzeughupe bleibt stumm | schwarzen Fahrzeugdraht am zweipoligen Lenkradstecker, graue WiPro-Leitung und Pin 12 prüfen |
| WiPro ohne Funktion | Dauerplus, `10-A`-Sicherung, Massepunkt, Ringöse und Steckverbindungen prüfen |
| Offener Funk-Magnetkontakt trotz geschlossener Öffnung | Kontakte mehrfach öffnen und schließen; Magnetabstand und Platinenrichtung kontrollieren |
| Kontakt lässt sich anlernen, löst aber keinen Alarm aus | Sende-LED zeigt möglicherweise zum Magneten; Platine korrekt ausrichten |
| Funkkontakt wird am Einbauort nicht zuverlässig empfangen | Abschirmende Metallteile, Antennenlage, Zentralenposition und Montageadapter prüfen |

Weitere systemübergreifende Prüfungen beschreibt [[Störungsbeseitigung — Sichere Diagnose häufiger Probleme|Störungsbeseitigung]].

## Quellenbasis und Redaktionsentscheidung

- Das neunseitige fahrzeugspezifische Einbauhandbuch *WiPro III - Fiat Talento/Renault Trafic/Opel Vivaro/Nissan NV300, Baujahr 2014–2021*, Stand `05/22`, wurde vollständig textlich und visuell geprüft.
- Die Seiten 2 bis 5 belegen Set, Mindestseriennummer, DIP-Stellung, Demontage, sämtliche elektrischen Anschlüsse, Anlernen und Funktionstest.
- Die Seiten 6 bis 9 belegen Montage, Platinenrichtung, Magnetabstand, Klebehinweise und Adapter der Funk-Magnetkontakte.
- Das allgemeine Installationshandbuch Version `1.8` ergänzt Sicherheitsregeln, Replay-Schutz, Diagnose und systemübergreifende Fehlerprüfung.
- Die Fahrzeuganleitung nennt ausdrücklich mindestens `0823-014`; der Softwarestand `5.9` stammt ergänzend aus der freigegebenen Projekt-Kompatibilitätsmatrix.
- Bei der widersprüchlichen allgemeinen Angabe zur optischen Alarmdauer hat die konkrete neuere Fahrzeuganleitung mit `180 Sekunden` Vorrang.

Verwendete Primärquellen:

- `D:/Thitronik WIKI (ml)/wiki/de/wipro_iii_fiat_talento___renault_trafic_iii.pdf`
- `D:/Thitronik WIKI (ml)/wiki/de/wipro_iii-installationsanleitung_1.8.pdf`

## Verwandte Artikel

- [[WiPro III — Funk-Alarmsystem für Freizeitfahrzeuge|WiPro III]]
- [[Fahrzeugkompatibilität — Übersichtsmatrix & DIP-Grundlagen|Fahrzeugkompatibilität]]
- [[Seriennummern und Softwarestände — Präfixe, Schwellen und Meilensteine|Seriennummern und Softwarestände]]
- [[Anlernvorgang — Funk-Zubehör an WiPro III anlernen|Anlernvorgang]]
- [[Funk-Handsender 868 — Fernbedienung für WiPro III|Funk-Handsender 868]]
- [[Funk-Magnetkontakt 868 — Montage und Betrieb|Funk-Magnetkontakt 868]]
- [[Funk-Kabelschleife 868 — Außensicherung für mobile Güter|Funk-Kabelschleife 868]]
- [[Sirenen und Hupen — Akustische Alarmmittel|Sirenen und Hupen]]
- [[Fiat Talento / Renault Trafic III / Opel Vivaro B / Nissan NV300 (2014–2021)|Fiat Talento 2014–2021]]
- [[Renault Trafic III / Nissan Primastar (ab 2022)|Renault Trafic III ab 2022]]
- [[Störungsbeseitigung — Sichere Diagnose häufiger Probleme|Störungsbeseitigung]]
