---
title: Ford Transit 7. Generation früh (2014–2015)
sources:
  - >-
    D:/Thitronik WIKI
    (ml)/wiki/de/wipro_iii_ford_transit_7._generation_2014_2015.pdf
  - 'D:/Thitronik WIKI (ml)/wiki/de/wipro_iii-installationsanleitung_1.8.pdf'
updated: '2026-07-19'
confidence: high
lang: de
dealerStatus: approved
---

# Ford Transit 7. Generation früh (2014–2015)

Dieser Artikel beschreibt den Einbau einer WiPro III in Ford Transit und Transit Custom der frühen 7. Generation von 2014 bis 2015. Das fahrzeugspezifische Einbauhandbuch Stand `12/20` dokumentiert Bedienkonzept, DIP-Profil, Demontage des Armaturenbretts, Bordcomputer, Massepunkt, Stecker C4, Fahrzeughupe, Status-LED, Funk-Zubehör und Funktionstest.

> **Sicherheitsrelevante Bedienabgrenzung:** Die originale Ford-Funkfernbedienung wird von der WiPro bei diesem Modell **nicht ausgewertet**. Ihr Signal lässt sich nicht sicher vom Signal der mechanischen Türschlösser unterscheiden. Zum Schärfen und Entschärfen ist deshalb zwingend ein THITRONIK® Funk-Handsender 868 erforderlich.

## Geltungsbereich

| Merkmal | Vorgabe |
|---|---|
| Fahrzeuge | Ford Transit und Transit Custom, frühe 7. Generation |
| Baujahre | 2014–2015 |
| System | WiPro III |
| Mindeststand | `0823-011 / 4.7` |
| Erforderliches Set laut Fahrzeuganleitung | Ford-Set für WiPro ab Seriennummer `0823-011` |
| Fahrzeugprofil | `SW1 + SW2 + SW3 + SW4 + SW6` auf `ON`; alle übrigen Schalter `OFF` |
| Alarmbedienung | ausschließlich THITRONIK® Funk-Handsender 868 |
| Zentralverriegelungsleitungen der WiPro | blau und blau/schwarz werden nicht angeschlossen |
| Hauptanschlussbereich | Bordcomputer und blauer Stecker `C4` hinter der Armaturenbrettverkleidung |

Die Fahrzeug-PDF nennt die Seriennummer `0823-011`, jedoch keinen Softwarestand. Die Software `4.7` stammt ergänzend aus der freigegebenen Projektmatrix. Seriennummer und Software sind vor dem Einbau über [[Seriennummern und Softwarestände — Präfixe, Schwellen und Meilensteine|Seriennummern und Softwarestände]] zu prüfen.

## Bedienkonzept und Sicherheitsabgrenzung

| Handlung | Zulässiges Bedienelement | Wirkung |
|---|---|---|
| Fahrzeug verriegeln oder entriegeln | originale Ford-Fernbedienung beziehungsweise mechanischer Schlüssel | steuert das Fahrzeug, nicht den Alarmzustand der WiPro |
| WiPro schärfen oder entschärfen | angelernter [[Funk-Handsender 868 — Fernbedienung für WiPro III|Funk-Handsender 868]] | steuert ausschließlich den Alarmzustand |
| Alarm unterbrechen | THITRONIK® Funk-Handsender 868 | entschärft WiPro und beendet den Alarm |

Die beiden Handlungen bleiben getrennt: Im dokumentierten Funktionstest wird zuerst das Fahrzeug mit der originalen Fernbedienung verriegelt und anschließend die WiPro mit dem Funk-Handsender geschärft. Beim Entschärfen entriegelt der Funk-Handsender das Fahrzeug nicht automatisch.

Die Nichtauswertung der Originalfernbedienung ist keine Fehlfunktion. Würde das nicht unterscheidbare Schlosssignal akzeptiert, könnte ein mechanischer Angriff auf das Türschloss die Alarmanlage beeinflussen. Die blauen Zentralverriegelungsleitungen dürfen daher nicht als Ersatzlösung angeschlossen werden.

## DIP-Profil einstellen

Die konkrete Fahrzeuganleitung schreibt die Schalter 1 bis 4 sowie 6 vor. Das abgebildete Schalterbild bestätigt `SW1 + SW2 + SW3 + SW4 + SW6` auf `ON`.

1. WiPro vollständig von der Spannungsversorgung trennen.
2. Sicherstellen, dass weder der 20-polige WiPro-Stecker noch ein Pro-Finder-Stecker eingesteckt ist.
3. Gehäuse vorsichtig öffnen.
4. `SW1`, `SW2`, `SW3`, `SW4` und `SW6` auf `ON` stellen.
5. `SW5`, `SW7` und `SW8` auf `OFF` stellen, sofern keine separat dokumentierte optionale Funktion vorgesehen ist.
6. Schalterstellung fotografisch oder auf der Arbeitskarte dokumentieren.
7. Gehäuse schließen und erst danach mit dem Einbau fortfahren.
8. Blaue und blau/schwarze WiPro-Leitung einzeln isolieren; beide sind bei diesem Transit-Modell bestückt, werden aber nicht verwendet.

| WiPro-Leitung | Behandlung bei diesem Fahrzeug | Grund |
|---|---|---|
| blau | nicht anschließen, einzeln isolieren | Zentralverriegelungsleitung wird nicht verwendet |
| blau/schwarz | nicht anschließen, einzeln isolieren | Zentralverriegelungsleitung wird nicht verwendet |

## Sicherheit und Arbeitsvorbereitung

- Arbeiten an Fahrzeugelektrik, CAN-Bus, Airbag-Umfeld, Lenksäule und Zentralverriegelung gehören in die Hände einer qualifizierten Fachwerkstatt.
- Vor Beginn Fahrzeughupe, Warnlampen, Beleuchtung und Fehlerspeicher prüfen und vorhandene Fehler dokumentieren.
- Anschlussarbeiten ausschließlich im spannungsfreien Zustand ausführen.
- Steckerbezeichnung, Pinnummer, Leitungsfarbe und gemessenes Signal immer gemeinsam verifizieren.
- Ungenutzte Ein- und Ausgänge einzeln isolieren und alle Leitungen zugentlastet sowie geschützt vor scharfen und bewegten Bauteilen verlegen.
- Den Stecker am Schleifringverbinder der Lenksäule für den Hupenanschluss nicht abziehen.
- Weichen Fahrzeug, Bordcomputer oder Steckverbinder von den Abbildungen ab, Arbeiten stoppen und Hersteller beziehungsweise THITRONIK-Support kontaktieren.

| Hilfsmittel | Verwendung |
|---|---|
| Ford-Set für WiPro ab `0823-011` | fahrzeugspezifischer Anschluss |
| Funk-Handsender 868 | zwingende Alarmbedienung |
| Kombizange oder Wasserpumpenzange | Demontage- und Montagearbeiten |
| Kreuzschlitzschraubendreher PH2 und Torx 25 | Armaturenbrettverkleidung und Gerüst |
| `10-mm`-Stecknuss | drei Schrauben beziehungsweise Muttern des Bordcomputers |
| Akku-Bohrschrauber mit `8-mm`-Bohrer | Montage der Status-LED |
| Multimeter und geeignetes Crimpwerkzeug | Signalprüfung und sichere elektrische Verbindungen |

## Armaturenbrettverkleidung und Bordcomputer freilegen

1. Armaturenbrettverkleidung ausclipsen und nach vorn abziehen.
2. Flaschenhalter ebenfalls entfernen.
3. Das dahinterliegende Gerüst abschrauben.
4. Gerüst in Richtung Fahrersitz bewegen.
5. Beachten, dass die letzten Schrauben rechts oben nur schwer zugänglich sind; nur entsprechend der realen Einbausituation lösen.
6. Runde Ablage links entnehmen und die darunterliegende zusätzliche Schraube lösen.
7. Freigelegten Bordcomputer identifizieren.
8. Drei Schrauben beziehungsweise Muttern mit der `10-mm`-Stecknuss entfernen.
9. Bordcomputer vorsichtig nach vorn herausklappen.
10. Den blauen Stecker `C4` anhand von Farbe, Lage und Kennzeichnung identifizieren.

Kabelbäume und Bordcomputer nicht unter Zug setzen. Die Bildfolge der Anleitung dient zur Orientierung; die Kennzeichnung am tatsächlichen Fahrzeug bleibt maßgeblich.

## Masseverbindung herstellen

Der dokumentierte Massepunkt liegt links neben dem freigelegten Bordcomputer an der metallischen Fahrzeugstruktur.

1. Massepunkt anhand der Fahrzeugabbildung und realen Karosserieverbindung eindeutig bestimmen.
2. Kontaktfläche auf festen Sitz, Korrosion und Lackreste prüfen.
3. Schwarze WiPro-Leitung mit ihrer Ringöse am Massepunkt auflegen.
4. Verbindung mechanisch fest anziehen.
5. Darauf achten, dass die Ringöse nicht verdreht unter Zug steht.
6. Durchgang und Spannungsabfall der Masseverbindung messen.

Eine lose oder ungeeignete Masse kann Ausfälle, Fehlalarme und eine unzuverlässige CAN-Auswertung verursachen.

## Warnblinker, CAN, Versorgung und Zündung an C4 anschließen

Alle fünf fahrzeugseitigen Signale befinden sich am blauen Stecker `C4` des Bordcomputers.

| C4-Pin | Ford-Leitung | WiPro-Leitung | Funktion laut Fahrzeuganleitung |
|---:|---|---|---|
| `13` | braun/gelb | rot/rosa | Warnblinker |
| `53` | grau/orange | weiß/orange | CAN-High |
| `54` | violett/orange | violett/orange | CAN-Low |
| `64` | violett/rot | rot | `+12 V (Radio)` / Spannungsversorgung |
| `76` | gelb/braun | gelb | Zündung |

1. C4 spannungsfrei zugänglich machen und vollständig identifizieren.
2. Braun/gelb an Pin 13 mit rot/rosa WiPro verbinden.
3. Grau/orange an Pin 53 mit weiß/orange WiPro verbinden.
4. Violett/orange an Pin 54 mit violett/orange WiPro verbinden.
5. Violett/rot an Pin 64 belastbar messen und mit der roten WiPro-Leitung verbinden.
6. Gelb/braun an Pin 76 messen und mit der gelben WiPro-Leitung verbinden.
7. Das CAN-Leitungspaar nur so weit wie erforderlich öffnen und anschließend wieder mechanisch sichern.
8. Alle Verbindungen einzeln auf Zugfestigkeit und Isolation prüfen.
9. C4 vollständig verriegeln und den Kabelbaum zugentlasten.

CAN-High und CAN-Low nicht vertauschen. Die Quelle bezeichnet Pin 64 ausdrücklich als `+12 V (Radio)`; dieser Artikel deutet den Anschluss deshalb nicht ohne Messung als frei wählbare Klemme 30 um.

## Fahrzeughupe am Schleifringverbinder anschließen

> **Achtung:** Den identifizierten Stecker im Schleifringverbinder **nicht abziehen**. Arbeiten im Lenksäulen- und Airbagumfeld erfordern besondere Fachkunde.

| Anschluss | Ford-Leitung | WiPro-Leitung | Funktion |
|---|---|---|---|
| Pin `4` am Stecker des Schleifringverbinders | blau/weiß | rosa | Fahrzeughupe |

1. Lenksäulenverkleidung fachgerecht abbauen.
2. Stecker im Schleifringverbinder identifizieren, ohne ihn abzuziehen.
3. Pin `4` anhand von Nummerierung und blau/weißer Leitung verifizieren.
4. Signal messtechnisch prüfen.
5. Blau/weiß an Pin 4 mit der rosa WiPro-Leitung verbinden.
6. Verbindung sichern, isolieren und zugentlasten.
7. Lenksäulenverkleidung erst nach Anschluss- und Funktionstest wieder montieren.

## Status-LED montieren

Die Fahrzeuganleitung zeigt die Status-LED auf der runden Ablage links im Armaturenbrett. Einen abweichenden Montagewunsch vorher mit dem Kunden klären.

1. Montageort festlegen und die Rückseite auf Leitungen, Luftkanäle und Bauteile prüfen.
2. Loch mit `8 mm` Durchmesser bohren.
3. Status-LED einsetzen.
4. Rot/schwarzes LED-Kabel mit weißem Steckverbinder an das passende Gegenstück des WiPro-Kabelsatzes anschließen.
5. Sichtbarkeit der LED vom üblichen Bedienstandort prüfen.

Die LED darf nicht verdeckt werden, da sie Scharfschaltung, Bestätigungen, Alarmspeicher und Diagnoseinformationen anzeigt.

## Funk-Zubehör anlernen

Sämtliches Funk-Zubehör, einschließlich der Komponenten aus dem Lieferumfang der Zentrale, muss einmalig angelernt werden und den Zusatz `868` für die Funkfrequenz tragen.

1. Taster rechts neben dem Anschlussstecker drücken und halten, bis die Anlage piept.
2. Prüfen, dass die Status-LED dauerhaft leuchtet.
3. Jeden Funk-Magnetkontakt 868 zwei- bis dreimal auslösen, indem der Magnet mehr als `30 mm` von der Sendeeinheit entfernt wird.
4. An jedem Funk-Handsender 868 eine Taste zwei- bis dreimal drücken.
5. Funk-Gaswarner 868 einschalten.
6. Funk-Kabelschleife 868 aus ihrer Halterung entfernen.
7. Nach jeder Komponente Piepton und kurzes Erlöschen der Status-LED als Speicherbestätigung abwarten.
8. Anlernmodus durch kurzes Spannungsfreischalten der Anlage oder kurzes Drücken des WiPro-Tasters beenden.
9. Alle gespeicherten Komponenten auf der Arbeitskarte dokumentieren.

Der ausführliche Ablauf und die Abgrenzung zum Diagnosemodus stehen unter [[Anlernvorgang — Funk-Zubehör an WiPro III anlernen|Anlernvorgang]].

## Funk-Magnetkontakte montieren

Die Fahrzeuganleitung dokumentiert die schwarzen und weißen Funk-Magnetkontakte 868, Art. `100757` und `100758`. Produktübergreifende Hinweise stehen unter [[Funk-Magnetkontakt 868 — Montage und Betrieb|Funk-Magnetkontakt 868]].

| Prüffeld | Vorgabe |
|---|---|
| Platinenrichtung | Sende-LED muss vom Magneten wegweisen |
| Fehlmontage | Anlernen ist möglich, eine Alarmierung erfolgt jedoch nicht |
| Geschlossener Abstand | Magnet im dokumentierten Bereich `22–30 mm` |
| Bevorzugte Tür-/Klappenmontage | Sendergehäuse am Rahmen, Magnet am beweglichen Türblatt beziehungsweise an der Klappe |
| Klebefläche | sauber, trocken und fettfrei |
| Verarbeitungstemperatur | nicht unter `15 °C` |
| Endfestigkeit der Klebepads | nach etwa `24 Stunden` |
| Große Abstände / Antennenausrichtung | Montageadapter Art. `100428` oder `100729` prüfen |

1. Kontakte vor der endgültigen Montage anlernen und am vorgesehenen Ort auf Reichweite prüfen.
2. Sendergehäuse entsprechend Rahmenprofil, Rollo und Fenster ausrichten.
3. Platine so einsetzen, dass die Sende-LED vom Magneten wegzeigt.
4. Magnet im geschlossenen Zustand innerhalb des Bereichs `22–30 mm` positionieren.
5. Sicherstellen, dass sich der Magnet im Betrieb nur zwischen dem dokumentierten geschlossenen und geöffneten Bereich bewegt und nicht jenseits der roten Grenzlinie montiert ist.
6. Klebeflächen reinigen, trocknen und entfetten.
7. Klebepads nur bei mindestens `15 °C` verarbeiten und während der ersten `24 Stunden` nicht voll belasten.
8. Bei ungeeigneter Klebemontage die markierten Schraubpunkte im Sendergehäuse verwenden.
9. Bei größeren Abständen oder ungünstiger Antennenausrichtung Montageadapter `100428` beziehungsweise `100729` prüfen.
10. Funk-Gaswarner und Funk-Kabelschleife nach deren jeweiligen Anleitungen montieren.

## Funktionstest und Bedienquittungen

### Schärfen und Alarm auslösen

1. Fahrzeugtüren und alle angelernten Kontakte schließen.
2. Taste „Verriegeln“ auf der originalen Ford-Fernbedienung drücken, um das Fahrzeug zu verriegeln.
3. WiPro anschließend durch Tastendruck auf dem angelernten THITRONIK® Funk-Handsender 868 schärfen.
4. Einen Piepton, Blinken der Fahrtrichtungsanzeiger und Blinken der Status-LED als Aktivierungsquittung prüfen.
5. Fahrertür mechanisch von innen mit dem Türgriff oder von außen mit dem mechanischen Schlüssel entriegeln und öffnen.
6. Prüfen, dass der Alarm ausgelöst wird.
7. Akustischen Alarm von etwa `30 Sekunden` prüfen.
8. Optischen Alarm über die Fahrtrichtungsanzeiger von etwa `180 Sekunden` prüfen.

### Entschärfen und Alarmspeicher prüfen

1. Taste am THITRONIK® Funk-Handsender 868 drücken.
2. Prüfen, dass WiPro entschärft beziehungsweise ein laufender Alarm unterbrochen wird.
3. Blinkfolge des WiPro-Alarmspeichers an der Status-LED nach dem unterbrochenen Alarm beobachten.
4. Blinkfolge anhand von Kapitel 2 der zum Gerät gehörenden Bedienungsanleitung auswerten.
5. Test mit jeder über CAN erfassten Tür und jedem montierten Funk-Sensor wiederholen.
6. Fahrzeugverriegelung und WiPro-Alarmzustand zum Abschluss getrennt prüfen.

Die originale Fahrzeugfernbedienung darf den WiPro-Zustand bei keinem dieser Tests verändern.

## CAN- und Funkdiagnose

### CAN-Diagnose

1. WiPro mit korrekter Versorgung und Masse einschalten.
2. Taster an der Zentrale kurz drücken, bis die Status-LED am Kabelbaum blinkt.
3. Warnblinker oder eine über CAN erfasste Fahrzeugfunktion betätigen, um Datenverkehr zu erzeugen.
4. Prüfen, ob die Status-LED abhängig von der Datenrate blinkt oder flackert.
5. Bleibt die Reaktion aus, C4 Pin 53/54, Leitungsfarben, Verbinder sowie CAN-High/CAN-Low prüfen.
6. Diagnosemodus durch erneutes kurzes Drücken beenden.

### Funkdiagnose

Im Diagnosemodus jeden angelernten Funk-Sender am endgültigen Montageort auslösen. WiPro quittiert ein empfangenes Signal akustisch. Fehlt die Quittierung, Anlernstatus, abschirmende Metallteile, Antennenlage, Magnetabstand und gegebenenfalls Montageadapter prüfen.

## Typische Fehlerbilder

| Fehlerbild | Prüfung / Maßnahme |
|---|---|
| Originale Ford-Fernbedienung schärft WiPro nicht | korrektes Verhalten; zum Schärfen den angelernten THITRONIK® Funk-Handsender 868 verwenden |
| Funk-Handsender schärft WiPro, Fahrzeug bleibt aber entriegelt | Fahrzeug separat mit der originalen Ford-Fernbedienung verriegeln |
| Mechanisches Öffnen löst keinen Alarm aus | WiPro-Schärfzustand, C4 Pin 53/54, CAN-Diagnose und Türerfassung prüfen |
| Keine CAN-Aktivität | C4 Pin 53/54, grau/orange, violett/orange und CAN-High/CAN-Low prüfen |
| Warnblinker ohne Funktion | C4 Pin 13, braun/gelbe Fahrzeugleitung und rot/rosa WiPro-Leitung prüfen |
| WiPro ohne Versorgung | C4 Pin 64, violett/rote Leitung, reale `+12-V-(Radio)`-Messung und Massepunkt prüfen |
| Zündung wird nicht erkannt | C4 Pin 76, gelb/braune Fahrzeugleitung und gelbe WiPro-Leitung messen |
| Fahrzeughupe bleibt stumm | Schleifringstecker nicht abziehen; Pin 4, blau/weiß und rosa WiPro prüfen |
| Ungewollte ZV-Reaktion | prüfen, ob blau und blau/schwarz tatsächlich unverbunden und einzeln isoliert sind |
| Status-LED ohne Funktion | `8-mm`-Montage, rot/schwarzes Kabel und weißen Steckverbinder prüfen |
| Zubehör lässt sich nicht anlernen | Kennzeichnung `868`, Auslösefolge, Anlernmodus und Speicherbestätigung prüfen |
| Kontakt lässt sich anlernen, löst aber keinen Alarm aus | Platine möglicherweise mit Sende-LED zum Magneten montiert; Platine drehen |
| Funkkontakt wird unzuverlässig empfangen | Montageort, Metallabschirmung, Antennenlage, `22–30 mm` und Adapter prüfen |

Weitere systemübergreifende Prüfungen beschreibt [[Störungsbeseitigung — Sichere Diagnose häufiger Probleme|Störungsbeseitigung]].

## Quellenbasis und Redaktionsentscheidung

- Primärquelle ist das neunseitige fahrzeugspezifische *Einbauhandbuch WiPro III – Ford Transit + Transit Custom, 7. Generation, 2014–2015*, Stand `12/20`.
- Alle neun Seiten wurden vollständig textlich ausgewertet und visuell geprüft.
- Seite 2 belegt die Nichtauswertung der Originalfernbedienung, den zwingenden Funk-Handsender, das Ford-Set ab `0823-011`, das DIP-Profil und die unbenutzten blauen Zentralverriegelungsleitungen.
- Seiten 3 und 4 belegen Demontage, Bordcomputer, Massepunkt, C4-Pins 13/53/54/64/76, den Hupenanschluss an Pin 4, Status-LED und Anlernvorgang.
- Seite 5 belegt die getrennte Verriegelungs- und Schärflogik, den mechanischen Einbruchtest, `30` Sekunden akustischen und `180` Sekunden optischen Alarm sowie den Alarmspeicher.
- Seiten 6 bis 9 belegen Art. `100757`/`100758`, Platinenrichtung, Montagevarianten, Klebe- und Schraubbefestigung, Adapter `100428`/`100729` und den Bereich `22–30 mm`.
- Das allgemeine Installationshandbuch Version `1.8` ergänzt die vollständig spannungsfreie DIP-Arbeit, CAN- und Funkdiagnose sowie systemweite Fehlerprüfung.
- Der Softwarestand `4.7` stammt aus der freigegebenen Projekt-Kompatibilitätsmatrix; die Fahrzeuganleitung nennt selbst nur die Mindestseriennummer `0823-011`.
- Die Quelle bezeichnet C4 Pin 64 als `+12 V (Radio)`. Eine darüber hinausgehende Klemmenbezeichnung wurde nicht ergänzt.
- Die pauschale Altfassung wurde präzisiert: Der Originalschlüssel dient weiterhin zum Verriegeln des Fahrzeugs, darf aber nicht den Alarmzustand der WiPro steuern.

Verwendete Primärquellen:

- `D:/Thitronik WIKI (ml)/wiki/de/wipro_iii_ford_transit_7._generation_2014_2015.pdf`
- `D:/Thitronik WIKI (ml)/wiki/de/wipro_iii-installationsanleitung_1.8.pdf`

## Verwandte Artikel

- [[WiPro III — Funk-Alarmsystem für Freizeitfahrzeuge|WiPro III]]
- [[Fahrzeugkompatibilität — Übersichtsmatrix & DIP-Grundlagen|Fahrzeugkompatibilität]]
- [[Seriennummern und Softwarestände — Präfixe, Schwellen und Meilensteine|Seriennummern und Softwarestände]]
- [[Anlernvorgang — Funk-Zubehör an WiPro III anlernen|Anlernvorgang]]
- [[Funk-Handsender 868 — Fernbedienung für WiPro III|Funk-Handsender 868]]
- [[Funk-Magnetkontakt 868 — Montage und Betrieb|Funk-Magnetkontakt 868]]
- [[Sirenen und Hupen — Akustische Alarmmittel|Sirenen und Hupen]]
- [[Störungsbeseitigung — Sichere Diagnose häufiger Probleme|Störungsbeseitigung]]
- [[Ford Transit 6. Generation (2006–2013)|Ford Transit 6G]]
- [[Ford Transit 7. Generation (2016–2019)|Ford Transit 7G 2016–2019]]
