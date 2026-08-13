---
title: Renault Trafic III / Nissan Primastar (ab 2022)
sources:
  - >-
    H:/Thitronik WIKI
    (ml)/wiki/de/wipro_iii_renault_trafic_iii___nissan_primastar_2022_.pdf
  - 'H:/Thitronik WIKI (ml)/wiki/de/wipro_iii-installationsanleitung_1.8.pdf'
updated: '2026-07-22'
confidence: high
lang: de
dealerStatus: approved
---

# Renault Trafic III / Nissan Primastar (ab 2022)

Dieser Artikel beschreibt den Einbau einer WiPro III in Renault Trafic III und Nissan Primastar ab Baujahr 2022. Das fahrzeugspezifische Einbauhandbuch Stand `08/22` dokumentiert Fahrzeugprofil, Demontage, CAN- und Warnblinkeranschluss, Versorgung, Zündung, Masse, Fahrzeughupe, Status-LED, optionalen Pro-Finder, Funk-Zubehör und Funktionstest.

> **Abgrenzung:** Die Fassung ab 2022 besitzt weder dieselbe DIP-Grundstellung noch dieselbe CAN-Anschlussstelle wie die Plattform 2014–2021. Fahrzeug, Modelljahr, grauer 40-poliger Stecker, Pinnummern und Leitungsfarben müssen gemeinsam geprüft werden; siehe [[Renault Trafic III / Opel Vivaro B / Nissan NV300 / Fiat Talento (2014–2021)|Renault Trafic III 2014–2021]].

## Geltungsbereich

| Merkmal | Vorgabe |
|---|---|
| Fahrzeuge | Renault Trafic III und Nissan Primastar |
| Baujahre | ab 2022 |
| Primärsystem | WiPro III, Set Art. `100754` |
| Mindestsoftware | `6.10.0`, ausdrücklich im Fahrzeughandbuch genannt |
| Mindestseriennummer | im Fahrzeughandbuch nicht genannt; vor dem Einbau Softwarestand und Geräteausführung prüfen |
| Fahrzeugkonfiguration | `SW1 + SW2 + SW4 + SW5 + SW6` auf `ON`; `SW3` auf `OFF` |
| Bedienung im dokumentierten Funktionstest | zuerst mit dem Originalschlüssel verriegeln, danach WiPro separat mit einem THITRONIK-Funk-Handsender scharfschalten |

Der bisherige Projektstand `SW3 + SW6` sowie `0823-019 / 7.1` widerspricht der konkreten neueren Fahrzeuganleitung und wird für dieses Profil nicht fortgeführt. Eine Seriennummer darf aus der Softwareangabe `6.10.0` nicht rekonstruiert werden. Softwarestand und Geräteausführung sind über [[Seriennummern und Softwarestände — Präfixe, Schwellen und Meilensteine|Seriennummern und Softwarestände]] zu erfassen.

## Fahrzeugprofil und Bedienlogik

| Schalter | Stellung | Bedeutung für dieses Fahrzeug |
|---|---|---|
| `SW1`, `SW2`, `SW4`, `SW5`, `SW6` | `ON` | vollständiges, fahrzeugspezifisch dokumentiertes Profil ab Baujahr 2022 |
| `SW3` | `OFF` | gehört nicht zum dokumentierten Profil |
| `SW7` | normalerweise `OFF` | nur bewusst auf `ON` setzen, wenn der Anti-Jamming-Alarm gemäß allgemeinem Installationshandbuch deaktiviert werden soll |
| `SW8` | normalerweise `OFF` | nur bewusst auf `ON` setzen, wenn die interne Sirene leiser eingestellt werden soll |

`SW5` ist hier Bestandteil der fahrzeugspezifischen Vorgabe und nicht lediglich eine optionale Ergänzung. Dadurch steuert der Original-Fahrzeugfunkschlüssel die WiPro nicht; die Auswertung der Fahrzeugtüren bleibt aktiv. Deshalb trennt der dokumentierte Funktionstest beide Handlungen: Der Originalschlüssel verriegelt das Fahrzeug, ein angelernter [[Funk-Handsender 868 — Fernbedienung für WiPro III|Funk-Handsender 868]] schaltet anschließend die WiPro scharf.

Alle DIP-Schalter nur im spannungsfreien Zustand ändern. Dabei dürfen weder der 20-polige WiPro-Stecker noch der Pro-Finder-Stecker eingesteckt sein. Grundlagen und weitere Profile beschreibt [[Fahrzeugkompatibilität — Übersichtsmatrix & DIP-Grundlagen|Fahrzeugkompatibilität]].

## Sicherheit und Arbeitsvorbereitung

- Arbeiten an Fahrzeugelektrik und -elektronik gehören in die Hände einer qualifizierten Fachkraft.
- Vor Beginn vorhandene Warnlampen, Beleuchtungsfehler und Fehlerspeichereinträge prüfen und dokumentieren.
- Spannungsversorgung trennen, bevor das WiPro-Gehäuse geöffnet, DIP-Schalter verändert oder Fahrzeugleitungen bearbeitet werden.
- Steckerform, Pinnummer, Leitungsfarbe und Signal am tatsächlichen Fahrzeug gemeinsam verifizieren.
- Für CAN, Warnblinker und Hupe die vom Fahrzeughandbuch geforderten gelgefüllten Verbinder verwenden.
- Ungenutzte Ein- und Ausgänge einzeln isolieren; Leitungen weder quetschen noch an scharfen, heißen oder bewegten Teilen verlegen.
- Weichen Fahrzeuggegebenheiten von Anleitung oder Abbildungen ab, Arbeiten stoppen und Hersteller beziehungsweise THITRONIK-Support kontaktieren.

Benötigt werden unter anderem WiPro-Set `100754`, geeignete Zangen, Kreuzschlitzschraubendreher PH2 oder Torx 20/25, Messgerät, Ringöse, der mitgelieferte Sicherungshalter sowie ein `8-mm`-Bohrer für die Status-LED.

## Funk-Zubehör vor der Montage anlernen

Sämtliches Funk-Zubehör aus dem Lieferumfang und zusätzliches Zubehör mit dem Kennzeichen `868` muss einmalig angelernt werden.

1. Den Taster rechts neben dem Anschlussstecker drücken und halten, bis die WiPro piept; die Status-LED leuchtet dauerhaft.
2. Jeden zu speichernden Funk-Magnetkontakt, Funk-Handsender, jede Funk-Kabelschleife und jeden Funk-Gaswarner zwei- bis dreimal auslösen.
3. Dazu den Magneten mehr als `30 mm` von der Sendeeinheit entfernen, Handsendertasten drücken, Gaswarner einschalten oder die Kabelschleife aus ihrer Halterung nehmen.
4. Den Bestätigungston und das kurze Erlöschen der Status-LED für jede Komponente abwarten.
5. Zum Beenden des Anlernmodus die Anlage kurz spannungsfrei machen oder den Taster an der WiPro kurz drücken.

Der allgemeine Ablauf und die Abgrenzung zum Diagnosemodus stehen unter [[Anlernvorgang — Funk-Zubehör an WiPro III anlernen|Anlernvorgang]].

## Armaturenbrett und Bodycomputer zugänglich machen

1. Verkleidung im Fahrerfußraum lösen; die Seitenverkleidung ist geclipst.
2. Quer verlaufenden Lüftungskanal nach Entfernen des Kunststoffniets herausnehmen.
3. Bodycomputer rechts von der Lenksäule lokalisieren.
4. Eine Befestigungsschraube TX20 lösen.
5. Bodycomputer vorsichtig nach unten herausziehen, ohne Leitungen oder Steckverbindungen unter Zug zu setzen.

## CAN-Verbindung am grauen 40-poligen Stecker

Der Abgriff befindet sich am Bodycomputer rechts von der Lenksäule am **grauen 40-poligen Stecker**. Beide Verbindungen mit gelgefüllten Verbindern herstellen.

| Funktion | Fahrzeugseite | WiPro-Leitung | WiPro-Kabelsatz |
|---|---|---|---|
| CAN-High | grün, Pin `26` | weiß/orange | Pin `17` |
| CAN-Low | braun, Pin `27` | violett/orange | Pin `18` |

Pin 26 und Pin 27 müssen vom selben grauen 40-poligen Stecker stammen. CAN-High und CAN-Low nicht vertauschen. Die Anschlussstelle unterscheidet sich ausdrücklich von der Plattform 2014–2021.

## Warnblinker anschließen

1. Blaue Fahrzeugleitung an Pin `13` desselben grauen 40-poligen Steckers identifizieren und messen.
2. Diese Leitung über einen gelgefüllten Verbinder mit der rot/pinken WiPro-Leitung verbinden.
3. Die rot/pinke Smart-Blinker-Leitung liegt laut allgemeiner WiPro-Steckerbelegung auf Kabelsatz-Pin `6`.
4. Leitung gegen Zug und Scheuern sichern und den Stecker vollständig einsetzen.

Der Anschluss dient der optischen Alarmierung und der dokumentierten Rückmeldung beim Scharfschalten.

## Dauerplus, Zündung und Masse anschließen

Den Sicherungskasten oben entriegeln und in Richtung Fahrersitz abziehen. Dauerplus und Zündungsplus nur an Leitungen mit geeignetem Querschnitt von mindestens `1 mm²` abgreifen.

| Anschluss | Fahrzeugleitung | WiPro-Leitung | Vorgabe |
|---|---|---|---|
| Klemme 30 / Dauerplus | rot | rot, Kabelsatz-Pin `11` | WiPro-Versorgung über mitgelieferten Sicherungshalter mit `10 A` absichern |
| Klemme 15 / Zündung | gelb | gelb, Kabelsatz-Pin `7` | Zündungsplus vor dem Anschluss messen |
| Klemme 31 / Massepunkt im Bereich des Sicherungskastens | Karosseriemasse | schwarz mit Ringöse, Kabelsatz-Pin `1` | blanken, tragfähigen Massepunkt verwenden und fest verschrauben |

Versorgung erst nach Abschluss und Kontrolle aller Anschlussarbeiten herstellen. Sicherungshalter zugänglich und scheuerfrei montieren.

## Fahrzeughupe anschließen

1. Lenksäulenverkleidung entfernen.
2. 16-poligen Fahrzeugstecker links unterhalb des Lenkrads abziehen.
3. Blaue Fahrzeugleitung an **Pin 10 des 16-poligen Fahrzeugsteckers** identifizieren und messen.
4. Diese Leitung über einen gelgefüllten Verbinder mit der pinken WiPro-Hupenleitung verbinden.
5. Stecker vollständig einsetzen und Lenksäulenverkleidung spannungsfrei montieren.

> **Pin-Abgrenzung:** `Pin 10` bezeichnet in der Fahrzeuganleitung den 16-poligen **Fahrzeugstecker**. Die pinke Hupenleitung liegt laut allgemeiner WiPro-Steckerbelegung auf **Kabelsatz-Pin 9**. Diese Nummern dürfen nicht gleichgesetzt werden.

Fahrzeughupe, interne Sirene und gegebenenfalls separate Zusatzsirene sind unterschiedliche Alarmgeber. Hinweise zu deren Abgrenzung enthält [[Sirenen und Hupen — Akustische Alarmmittel|Sirenen und Hupen]].

## Status-LED montieren

1. Rückseite des vorgesehenen Montageorts auf Leitungen und Bauteile prüfen.
2. Loch mit `8 mm` Durchmesser bohren.
3. Status-LED einsetzen.
4. Rot/schwarzes LED-Kabel mit weißem Steckverbinder wieder mit dem Gegenstück des WiPro-Kabelsatzes verbinden.

Die Status-LED muss für Bedienrückmeldung, Diagnose und Auslesen des Alarmspeichers sichtbar bleiben.

## Optionalen Pro-Finder montieren

Die Fahrzeuganleitung empfiehlt den Bereich unter dem Ablagefach oberhalb des Kombiinstruments. Das Inlay wird nach Lösen der Schrauben vorsichtig herausgehebelt. Links oder rechts unter dem Fach bleibt der [[Pro-Finder — GSM/GPS Telemetriemodul|Pro-Finder]] für Servicearbeiten erreichbar, ist aber gegen schnellen Zugriff von außen verdeckt. Gerät und Leitungen sicher befestigen; Anzeigen, Lüftungswege und Airbagbereiche dürfen nicht beeinträchtigt werden.

## Funk-Magnetkontakte montieren

Die Funk-Magnetkontakte erst nach dem Anlernen und einem Reichweitentest endgültig befestigen. Ausführliche Vorgaben enthält [[Funk-Magnetkontakt 868 — Montage und Betrieb|Funk-Magnetkontakt 868]].

| Prüffeld | Vorgabe |
|---|---|
| Varianten | liegend links, liegend rechts, stehend oder bei Bedarf auf der Scheibe |
| Platinenlage | Sende-LED vom Magneten wegweisend ausrichten |
| Fehlmontage | zeigt die Sende-LED zum Magneten, ist Anlernen möglich, eine Alarmierung erfolgt jedoch nicht |
| Magnetposition | im geschlossenen Zustand innerhalb des dokumentierten Bereichs von etwa `22–30 mm` |
| Klebefläche | sauber, trocken und fettfrei |
| Verarbeitungstemperatur | nicht unter `15 °C` |
| Endfestigkeit der Klebepads | nach etwa `24 Stunden` |
| Große Abstände / ungünstige Antennenlage | Montageadapter Art. `100428` oder `100729` prüfen |

Sendergehäuse möglichst am Rahmen und Magnet am beweglichen Türblatt beziehungsweise an der Klappe befestigen. Bei Schraubbefestigung nur die markierten Stellen auf der Innenseite des Sendergehäuses verwenden.

## Funktionstest durchführen

Der folgende Ablauf entspricht der fahrzeugspezifischen Anleitung und trennt Verriegeln von Scharfschalten:

1. Fahrzeugtüren und alle angelernten Kontakte schließen.
2. Verriegelungstaste der Original-Fahrzeugfernbedienung drücken und prüfen, ob das Fahrzeug verriegelt.
3. WiPro anschließend mit einem angelernten THITRONIK-Funk-Handsender scharfschalten.
4. Kontrollton der Zentrale und Blinker-Rückmeldung prüfen.
5. Fahrertür mechanisch von innen mit dem Türgriff öffnen.
6. Akustischen Alarm für etwa `30 Sekunden` prüfen.
7. Optischen Alarm über die Fahrzeugblinker für etwa `180 Sekunden` prüfen.
8. Eine beliebige Taste am THITRONIK-Funk-Handsender drücken und prüfen, ob die WiPro entschärft beziehungsweise der Alarm unterbrochen wird.
9. Blinkfolge des Alarmspeichers über die Status-LED kontrollieren.
10. Testalarm mit jedem angelernten Funk-Magnetkontakt, jeder Funk-Kabelschleife und jedem weiteren Funk-Sensor wiederholen.

Das allgemeine Installationshandbuch nennt in seiner Funktionsbeschreibung `120 Sekunden` für die optische Alarmierung. Für dieses Fahrzeug gilt die konkrete Angabe von `180 Sekunden` aus dem neueren fahrzeugspezifischen Handbuch.

## CAN- und Funkdiagnose

### CAN-Diagnose

1. Taster an der WiPro kurz drücken, bis die Status-LED am Kabelbaum blinkt.
2. Original-Fahrzeugfernbedienung oder Warnblinker betätigen, um CAN-Datenverkehr zu erzeugen.
3. Prüfen, ob die Status-LED abhängig von der Datenrate blinkt oder flackert.
4. Bleibt die Reaktion aus, grauen 40-poligen Stecker, Pins 26/27, Verbinder sowie Zuordnung von CAN-High und CAN-Low prüfen.
5. Diagnosemodus durch erneutes kurzes Drücken des Tasters beenden.

### Funkdiagnose

Im Diagnosemodus jede angelernte Funkkomponente am vorgesehenen Montageort auslösen. Die WiPro quittiert jedes empfangene Signal akustisch. Fehlt die Quittierung, Anlernstatus, Montageort, abschirmende Metallteile und gegebenenfalls einen Montageadapter prüfen.

## Typische Fehlerbilder

| Fehlerbild | Prüfung / Maßnahme |
|---|---|
| Original-Fahrzeugfunkschlüssel verriegelt, schaltet die WiPro aber nicht scharf | für dieses Profil erwartetes Verhalten; WiPro mit angelerntem THITRONIK-Funk-Handsender scharfschalten |
| Keine CAN-Aktivität im Diagnosemodus | grauen 40-poligen Stecker, Pin 26 grün / weiß-orange und Pin 27 braun / violett-orange prüfen; CAN-Leitungen nicht vertauschen |
| Keine optische Alarmierung | blaue Fahrzeugleitung an Pin 13 und rot/pinke WiPro-Leitung prüfen |
| Fahrzeughupe bleibt stumm | blaue Fahrzeugleitung an Pin 10 des 16-poligen Fahrzeugsteckers und pinke WiPro-Hupenleitung prüfen; Fahrzeug-Pin 10 nicht mit WiPro-Kabelsatz-Pin 9 verwechseln |
| WiPro ohne Funktion | Dauerplus, `10-A`-Sicherung, Massepunkt, Ringöse und Steckverbindungen prüfen |
| Offener Funk-Magnetkontakt trotz geschlossener Öffnung | Kontakte mehrfach öffnen und schließen; Magnetabstand und Platinenrichtung kontrollieren |
| Kontakt lässt sich anlernen, löst aber keinen Alarm aus | Sende-LED zeigt möglicherweise zum Magneten; Platine korrekt ausrichten |
| Funkkontakt wird am Einbauort nicht zuverlässig empfangen | abschirmende Metallteile, Antennenlage, Zentralenposition und Montageadapter prüfen |

Weitere systemübergreifende Prüfungen beschreibt [[Störungsbeseitigung — Sichere Diagnose häufiger Probleme|Störungsbeseitigung]].

## Quellenbasis und Redaktionsentscheidung

- Das zehnseitige fahrzeugspezifische Einbauhandbuch *WiPro III – Renault Trafic III, Nissan Primastar, Baujahr 2022+*, Stand `08/22`, wurde vollständig textlich und visuell geprüft.
- Seite 2 belegt Set `100754`, Mindestsoftware `6.10.0` und das Profil `SW1 + SW2 + SW4 + SW5 + SW6`.
- Seiten 3 bis 5 belegen Demontage, grauen 40-poligen Stecker, Fahrzeugpins 13/26/27, Versorgung, Masse, Fahrzeug-Pin 10 für die Hupe, Status-LED und optionalen Pro-Finder-Montageort.
- Seite 6 belegt Anlernen, getrennte Verriegelungs-/Scharfschaltlogik, 30/180 Sekunden Alarmdauer und Testablauf.
- Seiten 7 bis 10 belegen Varianten, Platinenrichtung, Magnetabstand, Klebehinweise und Adapter der Funk-Magnetkontakte.
- Das allgemeine Installationshandbuch Version `1.8` ergänzt Sicherheitsregeln, die Wirkung von `SW5`, Kabelsatz-Pins 6/7/9/11/17/18, CAN- und Funkdiagnose sowie systemübergreifende Fehlerprüfung.
- `Pin 10` in der Hupenanweisung wird als Fahrzeugstecker-Pin geführt; Kabelsatz-Pin `9` folgt der allgemeinen WiPro-Steckerbelegung.
- Der bisherige Projektstand `SW3 + SW6` und `0823-019 / 7.1` wird durch die konkrete Fahrzeugquelle ersetzt. Eine Mindestseriennummer ist nicht belegt.
- Beim Widerspruch zur optischen Alarmdauer hat die konkrete neuere Fahrzeuganleitung mit `180 Sekunden` Vorrang vor der allgemeinen `120-Sekunden`-Angabe.

Verwendete Primärquellen:

- `H:/Thitronik WIKI (ml)/wiki/de/wipro_iii_renault_trafic_iii___nissan_primastar_2022_.pdf`
- `H:/Thitronik WIKI (ml)/wiki/de/wipro_iii-installationsanleitung_1.8.pdf`

## Verwandte Artikel

- [[WiPro III — Funk-Alarmsystem für Freizeitfahrzeuge|WiPro III]]
- [[Fahrzeugkompatibilität — Übersichtsmatrix & DIP-Grundlagen|Fahrzeugkompatibilität]]
- [[Seriennummern und Softwarestände — Präfixe, Schwellen und Meilensteine|Seriennummern und Softwarestände]]
- [[Anlernvorgang — Funk-Zubehör an WiPro III anlernen|Anlernvorgang]]
- [[Funk-Handsender 868 — Fernbedienung für WiPro III|Funk-Handsender 868]]
- [[Funk-Magnetkontakt 868 — Montage und Betrieb|Funk-Magnetkontakt 868]]
- [[Funk-Kabelschleife 868 — Außensicherung für mobile Güter|Funk-Kabelschleife 868]]
- [[Sirenen und Hupen — Akustische Alarmmittel|Sirenen und Hupen]]
- [[Pro-Finder — GSM/GPS Telemetriemodul|Pro-Finder]]
- [[Renault Trafic III / Opel Vivaro B / Nissan NV300 / Fiat Talento (2014–2021)|Renault Trafic III 2014–2021]]
- [[Störungsbeseitigung — Sichere Diagnose häufiger Probleme|Störungsbeseitigung]]
