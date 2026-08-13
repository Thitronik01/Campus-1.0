---
title: Mercedes Benz Vito W447 (2014–06/2023)
sources:
  - sources/WiPro III Mercedes Vito W447 2014+.idml
  - sources/wipro_iii-installationsanleitung_1.8.pdf
updated: '2026-07-20'
confidence: high
lang: de
dealerStatus: approved
---

# Mercedes Benz Vito W447 (2014–06/2023)

Dieser Artikel beschreibt den Einbau einer WiPro III in Mercedes-Benz Vito und V-Klasse W447 von 2014 bis einschließlich 06/2023. Die fahrzeugspezifische Redaktionsquelle Stand `04/20`, die freigegebene Projektmatrix und das allgemeine Installationshandbuch Version `1.8` werden dabei mit klarer Quellenabgrenzung zusammengeführt.

> **Abgrenzung:** Diese Freigabe gilt nicht automatisch für Fahrzeuge nach `06/2023`, abweichende Bordnetzsteuergeräte, nicht identische Steckerbilder oder eine WiPro III safe.lock. Vor jedem Anschluss müssen Ausstattung, Stecker, Leitungsfarbe, Spannung und Funktion am tatsächlichen Fahrzeug geprüft werden.

## Geltungsbereich und Versionsbasis

| Merkmal | Freigegebener Stand |
|---|---|
| Fahrzeug | Mercedes-Benz Vito / V-Klasse W447 |
| Modellzeitraum | 2014–06/2023 laut Projektmatrix |
| fahrzeugspezifische Quelle | IDML-Einbauhandbuch Stand `04/20`, Metadaten zuletzt geändert am 04.11.2020 |
| dokumentierter Satz | WiPro-Set Art. `100754`; Produktstatus und Lieferumfang vor Bestellung prüfen |
| Mindestseriennummer | `0823-014` laut Fahrzeugquelle |
| Softwarebasis | `6.2` ergänzend aus der freigegebenen Projektmatrix |
| aktuelles Projektprofil | `SW1 + SW3 + SW4 + SW6 ON`; `SW2`, `SW5`, `SW7`, `SW8 OFF` |
| ILS/LED-Scheinwerfer | nur hintere Blinker anschließen; vordere Blinker sind laut Fahrzeugquelle nicht ansteuerbar |
| akustischer Alarm | zusätzliche Sirene oder Back-up Sirene im Motorraum dringend empfohlen |

Siehe [[Fahrzeugkompatibilität — Übersichtsmatrix & DIP-Grundlagen|Fahrzeugkompatibilität]] und [[Seriennummern und Softwarestände — Präfixe, Schwellen und Meilensteine|Seriennummern und Softwarestände]].

## Quellenrang und bereinigte Altangaben

| Thema | Quellenentscheidung |
|---|---|
| Fahrzeuganschlüsse | Das IDML *WiPro III Mercedes Vito W447 2014+* Stand `04/20` ist die fahrzeugspezifische Primärquelle. |
| DIP-Grundstellung | Das IDML nennt ausdrücklich `SW1 + SW3 + SW4`; die freigegebene Projektmatrix ergänzt `SW6` und wird als aktuelles Projektprofil geführt. |
| Software `6.2` | stammt aus der freigegebenen Projektmatrix, nicht aus dem IDML. |
| CAN-Bezeichnung | weiß/orange ist gemäß allgemeiner Steckerbelegung Pin 17 / CAN-High; violett/orange ist Pin 18 / CAN-Low. Die vertauschte Altbeschriftung wurde korrigiert. |
| Blinkerstecker M | laut IDML braun, nicht violett; die Leitung ist schwarz/weiß, nicht schwarz/grau. |
| Blinkerpins | Das zugängliche IDML nennt Stecker und Leitungsfarben, aber keine Pinnummern. Deshalb werden keine Pins rekonstruiert. |
| ILS-Vorder-/Hinterachse | Die Quelle schreibt nur den Anschluss der hinteren Blinker vor, ordnet die doppelt vorkommenden Farben im zugänglichen Text jedoch nicht eindeutig Vorder- oder Hinterachse zu. Vor dem Abgriff messtechnisch zuordnen. |
| Art. `100754` | im Fahrzeug-IDML als WiPro-Set genannt, im Projektregister jedoch nicht als allgemein bestellbarer Artikel bestätigt. |
| fehlende Quellen | `WiiPro III 1.docx` und `FAQ_WiPro-III_DE.md` sind lokal nicht vorhanden und werden nicht als Beleg verwendet. |

Die IDML-Titelzeile enthält einmal den Schreibfehler „W477“. Dateiname, Deckblatt, Geltungsbereich und alle übrigen Texte nennen W447; der Tippfehler wird nicht übernommen. Die extern verknüpften Foto-, PSD- und TIFF-Dateien des IDML fehlen lokal. Sämtliche unten genannten Anschlusswerte sind jedoch als Text oder Tabelle im IDML enthalten; bildabhängige Pinnummern werden bewusst nicht ergänzt.

## Sicherheit und Fahrzeugprüfung

- Arbeiten an Fahrzeugelektrik und -elektronik dürfen nur qualifizierte Fachwerkstätten ausführen.
- Vor elektrischen Arbeiten Batterie-Minus und vorhandene Zusatzbatterien nach Herstellervorgabe trennen; Radiocode und flüchtige Fahrzeugdaten berücksichtigen.
- Vor dem Öffnen der Zentrale und vor DIP-Änderungen 20-poligen Stecker, Spannungsversorgung und optionalen Pro-Finder trennen.
- Ungenutzte Ein- und Ausgänge einzeln gegen Kurzschluss isolieren.
- Kabel gegen Scheuern, Hitze, Vibration und Zug sichern; Pedale, Lenkung, Airbag-Bauteile und andere Fahrzeugfunktionen dürfen nicht behindert werden.
- Anschlussstellen nicht allein nach Farbe auswählen, sondern zusätzlich Stecker, Spannung und Funktion prüfen.
- Bei abweichender Ausstattung, fehlender Leitung oder anderem Steckbild Arbeit stoppen und Hersteller oder THITRONIK Support kontaktieren.

Vor Beginn prüfen und dokumentieren:

1. Handelt es sich tatsächlich um Vito oder V-Klasse W447 im Zeitraum 2014–06/2023?
2. Stimmen Artikelnummer, Seriennummer und Software mit der vorgesehenen Ausführung überein?
3. Ist mindestens Seriennummer `0823-014` vorhanden?
4. Besitzt das Fahrzeug ILS/LED-Scheinwerfer?
5. Funktionieren Funkfernbedienung, Zentralverriegelung, Innenbeleuchtung und alle Blinker?
6. Werden Fahrerhaustüren bei eingeschalteter Zündung im Fahrzeug angezeigt?
7. Welche zusätzlichen Türen und Klappen der Aufbauausführung werden tatsächlich über CAN erfasst?
8. Bestehen Warnlampen, Fehlerspeichereinträge, Beleuchtungsfehler oder andere elektrische Fehler?

## Geräteprofil und DIP-Schalter einstellen

| Einstellung | Stellung | Bedeutung |
|---|---|---|
| aktuelles Vito-Projektprofil | `SW1 + SW3 + SW4 + SW6 ON` | Fahrzeugprofil gemäß freigegebener Projektmatrix |
| übrige Grundschalter | `SW2`, `SW5`, `SW7`, `SW8 OFF` | keine zusätzlichen allgemeinen Sonderfunktionen |
| Fahrzeug-IDML `04/20` | `SW1 + SW3 + SW4 ON` | ältere fahrzeugspezifische Textangabe ohne Erwähnung von `SW6` |
| optionaler Replay-Schutz | zusätzlich `SW5 ON` ab `0823-014 / 5.8` | Original-Funkschlüssel steuert WiPro dann nicht mehr; Türauswertung bleibt aktiv |

1. Artikelnummer, Seriennummer und Softwarestand ablesen und dokumentieren.
2. Zentrale vollständig spannungsfrei machen und alle Zusatzstecker trennen.
3. Gehäuse vorsichtig öffnen.
4. Für das freigegebene Projektprofil `SW1`, `SW3`, `SW4` und `SW6` auf `ON` stellen.
5. `SW2`, `SW5`, `SW7` und `SW8` auf `OFF` belassen.
6. `SW5` nur nach bewusster Entscheidung für den allgemeinen Replay-Schutz aktivieren und vorher eine alternative Bedienung vorsehen.
7. Weicht die gerätespezifische Unterlage beim vorhandenen Gerät hinsichtlich `SW6` ab, nicht raten, sondern die aktuelle THITRONIK-Freigabe einholen.
8. Schalterstellung fotografisch dokumentieren, Gehäuse schließen und erst danach fortfahren.

> **Wichtig:** `SW5` ist kein allgemeiner safe.lock-Schalter. Bei `SW5 ON` kann der originale Fahrzeugfunkschlüssel die WiPro III nicht mehr schärfen oder entschärfen.

## Armaturenbereich und Handschuhfach freilegen

1. Fahrzeug spannungsfrei schalten und Arbeitsbereich schützen.
2. Geclipste Seitenverkleidung am Armaturenbrett vorsichtig lösen.
3. Geclipste A-Säulenverkleidung im Beifahrerfußraum lösen.
4. Sechs Schrauben Torx `T20` am Handschuhfach entfernen.
5. Handschuhfach abnehmen, ohne Leitungen oder Airbag-Bauteile zu belasten.
6. CAN-Verteiler im Bereich der A-Säule aus Sicht des Beifahrerfußraums freilegen.
7. Bordnetzsteuergerät an der rechten A-Säule sowie Sicherungskasten identifizieren.
8. Ausgangszustand, Stecker und Leitungsführung vor dem Abgriff fotografisch dokumentieren.

## CAN-Bus anschließen und diagnostizieren

| Fahrzeugleitung | WiPro-Leitung | WiPro-Pin | Signal |
|---|---|---|---|
| braun/rot | weiß/orange | 17 | CAN-High |
| braun | violett/orange | 18 | CAN-Low |

1. CAN-Verteiler an der A-Säule eindeutig identifizieren.
2. Braun/rote und braune Fahrzeugleitung vor dem Anschluss gemeinsam als CAN-Paar prüfen.
3. Braun/rot mit weiß/orange, Pin `17`, verbinden.
4. Braun mit violett/orange, Pin `18`, verbinden.
5. Für beide Abgriffe gelgefüllte Verbinder verwenden und mechanisch entlasten.
6. Diagnosemodus durch kurzen Druck auf den Taster rechts neben dem Anschlussstecker aktivieren und Funk-Fahrzeugschlüssel oder Warnblinker betätigen.
7. Flackert die Status-LED bei CAN-Verkehr nicht, Verbindung prüfen und insbesondere eine Vertauschung von CAN-High und CAN-Low ausschließen.

## Analoge Blinker am Bordnetzsteuergerät anschließen

Die Fahrzeugquelle verwendet für die vier analogen Blinkerleitungen den Diodenverteiler. Die beiden WiPro-Blinkerausgänge liegen am 20-poligen Stecker auf Pin `12` und Pin `14`; für die Verteilung auf vier Fahrzeugleitungen ist Art. `100455` vorgesehen. Vor Bestellung prüfen, ob der Verteiler bereits im tatsächlich vorhandenen Set enthalten ist.

| Stecker am Bordnetzsteuergerät | Fahrzeugleitung | WiPro-Seite | Zuordnung |
|---|---|---|---|
| A, blau | schwarz/weiß | grau am Diodenverteiler | Blinkerleitung 1 |
| A, blau | schwarz/grün | grau am Diodenverteiler | Blinkerleitung 2 |
| M, braun | schwarz/weiß | grau am Diodenverteiler | Blinkerleitung 3 |
| M, braun | schwarz/grün | grau am Diodenverteiler | Blinkerleitung 4 |

1. Bordnetzsteuergerät an der rechten A-Säule eindeutig identifizieren.
2. Blauen Stecker A und braunen Stecker M anhand Bezeichnung und Steckbild prüfen.
3. Diodenverteiler Art. `100455` und seine vier grauen Ausgänge identifizieren.
4. Die beiden Leitungen von Stecker A nach Tabelle anschließen.
5. Die beiden Leitungen von Stecker M nach Tabelle anschließen.
6. Keine Pinnummer aus einer anderen Mercedes-Baureihe übernehmen.
7. Bei ILS/LED nur die beiden messtechnisch eindeutig als hintere Blinker bestimmten Leitungen anschließen.
8. Nicht verwendete vordere Blinkerleitungen bei ILS einzeln isolieren.
9. Nach Inbetriebnahme jede angeschlossene Fahrzeugseite separat prüfen und auf Fehlermeldungen achten.

> **ILS-Warnung:** Die Fahrzeugquelle erklärt die vorderen Blinker bei ILS/LED ausdrücklich für nicht ansteuerbar. Wegen der doppelt vorkommenden Farben schwarz/weiß und schwarz/grün niemals allein anhand der Farbe entscheiden, welche Leitung zur Vorder- oder Hinterachse führt.

## Dauerplus, Zündung und Masse anschließen

| Funktion | Fahrzeugpunkt | Fahrzeugleitung | WiPro-Leitung / Pin |
|---|---|---|---|
| Klemme 30 | Schraubklemme `M6` im Sicherungskasten | — | rot, Pin `11`, über `10 A` |
| Klemme 15 | Rückseite Sicherungskasten, unten | schwarz/rosa | gelb, Pin `7` |
| Klemme 31 | Massepunkt an der A-Säule | — | schwarz, Pin `1`, mit Ringöse |

1. Sicherungskasten lösen und so herausklappen, dass die Rückseite ohne Zug an Leitungen erreichbar ist.
2. Schwarz/rosa Leitung unten an der Rückseite als geschaltetes Zündungsplus messen.
3. Gelbe WiPro-Leitung an einem geeigneten Querschnitt von mindestens `1 mm²` anschließen.
4. Rote WiPro-Leitung mit Ringöse direkt an der Schraubklemme `M6` auflegen.
5. Spannungsversorgung nahe der Abgriffstelle mit dem beiliegenden Sicherungshalter und `10 A` absichern.
6. Schwarze WiPro-Leitung mit Ringöse am geprüften Massepunkt der A-Säule befestigen.
7. Ringösen gegen Losdrehen und Leitungen gegen Zug oder Scheuern sichern.
8. Dauerplus, Zündungsplus und Spannungsabfall unter Last vor dem endgültigen Zusammenbau erneut messen.

## Zusatzsirene oder Back-up Sirene anschließen

Die Fahrzeughupe wird bei ausgeschalteter Zündung nicht mit Spannung versorgt. Eine direkte Hupenansteuerung ist daher für den Alarmfall nicht sinnvoll. Die Fahrzeugquelle empfiehlt dringend eine Sirene oder Back-up Sirene im Motorraum; eine Kabeldurchführung liegt fahrerseitig an der Spritzwand im Bereich des Motorhaubenzugs.

| Ausführung | WiPro-Anschluss | Alarmgeber |
|---|---|---|
| normale Sirene | Pin `15`, weiß | rot der Sirene |
| normale Sirene | Pin `16`, weiß/schwarz | schwarz der Sirene |
| Back-up Sirene | Dauerplus / Bordspannung | rot der Back-up Sirene |
| Back-up Sirene | Fahrzeugmasse | schwarz der Back-up Sirene |
| Back-up Sirene | Pin `15`, weiß | weiß der Back-up Sirene, positiver Trigger |
| Back-up Sirene | nicht verwendet | blau einzeln isolieren |

1. Sirenenvariante auswählen und deren eigene Anleitung bereithalten.
2. Geeignete Kabeldurchführung an der Spritzwand beim Motorhaubenzug prüfen.
3. Alarmgeber geschützt vor Hitze, Wasser und beweglichen Teilen montieren.
4. Normale Sirene mit weiß auf rot und weiß/schwarz auf schwarz verbinden.
5. Back-up Sirene dauerhaft über rot und schwarz versorgen.
6. Weiße Back-up-Leitung mit der weißen WiPro-Leitung Pin `15` verbinden.
7. Blaue negative Triggerleitung der Back-up Sirene einzeln isolieren.
8. Leitungen sichern und die gewählte Sirene mit einem echten Testalarm prüfen.

Siehe [[Sirenen und Hupen — Akustische Alarmmittel|Sirenen und Hupen]] und [[Artikelnummern-Register — Dokumentierte THITRONIK-Produkte und Zubehör|Artikelnummern-Register]].

## Status-LED montieren

1. LED-Position vorab mit dem Kunden abstimmen.
2. Bereich hinter der vorgesehenen Bohrstelle auf Leitungen, Airbagteile und Freiraum prüfen.
3. Oberfläche schützen und Bohrpunkt markieren.
4. Loch mit `8 mm` Durchmesser bohren.
5. Status-LED einsetzen.
6. Rot/schwarzes LED-Kabel mit weißem Steckverbinder am Gegenstück des WiPro-Kabelsatzes anschließen.
7. Leitung zugentlastet verlegen und LED nach Inbetriebnahme in allen Zuständen prüfen.

## Zentrale und optionalen Pro-Finder montieren

Die Fahrzeugquelle zeigt die Demontage des Beifahrer-Armaturenbereichs, nennt aber keinen eindeutig festgelegten Klebepunkt für die Zentrale. Der Montageort muss deshalb im freigelegten Bereich fachgerecht gewählt werden.

1. Trockenen, servicezugänglichen und von außen nicht direkt erreichbaren Montageort wählen.
2. Abstand zu Airbag-Bauteilen, Heizung, beweglichen Teilen und scharfen Kanten einhalten.
3. Zentrale nahe der Fahrzeugelektronik platzieren, um Leitungswege kurz zu halten.
4. Zentrale mit den beiliegenden Klebepads befestigen und Kunststoffflansche zusätzlich am Gehäuse fixieren.
5. Kabelbaum zugfrei führen; endgültige Umwicklung erst nach erfolgreichem Funktionstest vornehmen.
6. Antennen weder kürzen noch aufwickeln oder hinter abschirmendem Metall platzieren.

Bei gleichzeitigem Ortungsmodul Einbauort, Versorgung und Masse im selben Arbeitsschritt vorsehen; siehe [[Pro-Finder — GSM/GPS Telemetriemodul|Pro-Finder]].

## Funk-Zubehör anlernen

1. Sämtliches Zubehör mit Kennzeichnung `868` vor der endgültigen Montage bereitlegen.
2. 20-poligen Stecker anschließen und Taster rechts neben dem Anschlussstecker gedrückt halten, bis die Anlage piept und die LED dauerhaft leuchtet.
3. Jeden Funk-Magnetkontakt, Funk-Handsender, Funk-Gaswarner und jede Funk-Kabelschleife zwei- bis dreimal auslösen.
4. Für einen Magnetkontakt Magnet und Sender um mehr als `30 mm` trennen.
5. Speicherung durch Piepton und kurzes Erlöschen der Status-LED bestätigen.
6. Anlernmodus durch kurzen Tastendruck oder kurzes Spannungsfreimachen beenden.
7. Prüfen, dass alle vorgesehenen Sender einzeln reagieren und nach einer Spannungsunterbrechung gespeichert bleiben.
8. Beachten, dass der dokumentierte Löschvorgang sämtliche gespeicherten Funkkomponenten gemeinsam entfernt.

Siehe [[Anlernvorgang — Funk-Zubehör an WiPro III anlernen|Anlernvorgang]].

## Funk-Magnetkontakte montieren

Für die dokumentierten Kontakte Art. `100757` schwarz und `100758` weiß gelten:

1. Sendergehäuse passend zu Fensterrahmen, Tür oder Klappe ausrichten.
2. Platine so einsetzen, dass die Sende-LED vom Magneten wegweist.
3. Falsche Orientierung vermeiden: Anlernen ist dann möglich, eine Alarmierung jedoch nicht.
4. Magnet im fahrzeugspezifisch dokumentierten Bereich `22–30 mm` und nicht jenseits der roten Grenzlinie positionieren.
5. Vor dem Kleben Empfang und Funktion am geplanten Ort prüfen.
6. Klebefläche reinigen, trocknen und entfetten.
7. Nicht unter `15 °C` verkleben und etwa `24 Stunden` bis zur Endfestigkeit abwarten.
8. Bei größerem Abstand oder ungünstiger Antennenlage Adapter Art. `100428` oder `100729` verwenden.
9. Wenn Klebepads ungeeignet sind, nur an den vorgesehenen Gehäusemarkierungen verschrauben.
10. Jeden Kontakt nach der endgültigen Montage einzeln testen.

Weitere Hinweise: [[Funk-Magnetkontakt 868 — Montage und Betrieb|Funk-Magnetkontakt 868]].

## Bedienlogik und abschließender Funktionstest

Im Grundprofil schärft der originale Fahrzeugfunkschlüssel beim Verriegeln und entschärft beim Entriegeln. Eine direkte separate Verbindung der blauen beziehungsweise blau/schwarzen WiPro-ZV-Leitungen ist in der Vito-Quelle nicht dokumentiert; ungenutzte Leitungen bleiben einzeln isoliert.

1. Alle Verbindungen, Sicherung, Masse und DIP-Profil prüfen.
2. Alle Türen und angelernten Aufbaukontakte schließen.
3. Mit der Originalfernbedienung verriegeln.
4. Schärfung, Zentralverriegelung, Status-LED und Blinker-Rückmeldung prüfen.
5. Mechanisch von innen mit dem Türgriff oder von außen mit dem mechanischen Schlüssel die Fahrertür öffnen.
6. Prüfen, dass das Öffnen bei geschärfter Anlage Alarm auslöst.
7. Akustischen Alarm für etwa `30 Sekunden` kontrollieren.
8. Optischen Alarm für etwa `180 Sekunden` kontrollieren.
9. Alarm mit einer beliebigen Taste des Funk-Handsenders oder mit der Öffnen-Taste der Originalfernbedienung beenden.
10. Blinkfolge des Alarmspeichers an der Status-LED dokumentieren.
11. Jede weitere vom Fahrzeug-CAN erfasste Tür einzeln testen.
12. Jeden Funk-Magnetkontakt einzeln bei geschärfter Anlage öffnen.
13. Funk-Gaswarner nach etwa `4 Minuten` Vorheizzeit gemäß eigener Anleitung testen.
14. Funk-Kabelschleife durch Entnahme aus der Halterung testen.
15. Alle vier analogen Blinker oder bei ILS ausschließlich die angebundenen hinteren Blinker prüfen.
16. Zusatzsirene oder Back-up Sirene mit einem realen Alarm prüfen.
17. Prüfen, dass keine neuen Warnlampen, Beleuchtungsfehler oder Fehlerspeichereinträge entstanden sind.
18. Verkleidungen in umgekehrter Reihenfolge montieren und die Kundendokumentation vervollständigen.

## Fehlerdiagnose

| Symptom | Prüfung und Maßnahme |
|---|---|
| Keine Reaktion auf Originalschlüssel | Seriennummer, Software, DIP-Profil und insbesondere versehentlich aktiviertes `SW5` prüfen. |
| Keine CAN-Reaktion | CAN-Paar am Verteiler, gelgefüllte Verbinder und Zuordnung weiß/orange = CAN-High sowie violett/orange = CAN-Low prüfen. |
| Alarm schärft, aber Türen lösen nicht aus | prüfen, ob die jeweilige Tür im Fahrzeug angezeigt und über CAN erfasst wird; andernfalls Funk-Magnetkontakt vorsehen. |
| Nur einzelne Blinker funktionieren | Stecker A blau, Stecker M braun, Diodenverteiler `100455` und vier Leitungen prüfen. |
| ILS-Fahrzeug meldet Fehler oder vordere Blinker bleiben aus | vordere Leitungen nicht ansteuern; nur eindeutig gemessene hintere Blinker anschließen. |
| WiPro ohne Versorgung | `M6`, `10-A`-Sicherung, rote Leitung Pin 11, schwarzen Masseanschluss Pin 1 und Ringösen prüfen. |
| Zündung wird nicht erkannt | schwarz/rosa an der unteren Rückseite des Sicherungskastens messen und gelbe Leitung Pin 7 prüfen. |
| Fahrzeughupe bleibt stumm | erwartetes Verhalten bei ausgeschalteter Zündung; installierte Zusatz- oder Back-up Sirene prüfen. |
| Back-up Sirene gibt Dauerton | weiße Leitung muss als positiver Trigger verwendet werden; blaue negative Triggerleitung isolieren. |
| Funkkontakt wird nicht erkannt | Anlernen, Platinenorientierung, Magnetabstand, Antennenlage und Metallabschirmung prüfen. |
| Fahrzeug, Stecker oder Leitung weicht ab | Arbeit stoppen und fahrzeugspezifische Freigabe von Hersteller oder THITRONIK Support einholen. |

Siehe [[Störungsbeseitigung — Sichere Diagnose häufiger Probleme|Störungsbeseitigung]].

## Quellenentscheidung

- Das IDML *WiPro III Mercedes Vito W447 2014+* wurde vollständig auf enthaltene Story-Texte, Tabellen, Seitenzuordnung, Metadaten und verknüpfte Grafiken geprüft.
- Die Quelle nennt Stand `04/20`, WiPro-Set `100754`, Mindest-SN `0823-014`, `SW1 + SW3 + SW4`, Demontage, CAN-Farben, vier Blinkerleitungen, Versorgung, Masse, Sirenen, Status-LED, Anlernen, Testzeiten und Magnetkontaktwerte.
- Die freigegebene Projektmatrix ergänzt den Modellzeitraum bis `06/2023`, Software `6.2` und `SW6`; diese Ergänzungen sind im Artikel transparent gekennzeichnet.
- Das allgemeine Installationshandbuch `1.8` wurde für Sicherheitsregeln, 20-polige Pinbelegung, Replay-Schutz, Diagnose und Sirenenlogik verwendet; alle 15 deutschen PDF-Seiten wurden textlich und visuell geprüft.
- Die fehlenden IDML-Bilddateien verhindern die sichere Rekonstruktion von Blinkerpins und der eindeutigen Vorder-/Hinterachszuordnung der doppelt vorkommenden Leitungsfarben. Deshalb sind nur die im Text belegten Stecker und Farben freigegeben.
- Die Altbeschriftung von CAN-High/CAN-Low sowie die alten Angaben „Stecker M violett“ und „schwarz/grau“ wurden anhand der vorhandenen Quellen korrigiert.

## Querverweise

- [[WiPro III — Funk-Alarmsystem für Freizeitfahrzeuge|WiPro III]]
- [[Sirenen und Hupen — Akustische Alarmmittel|Sirenen und Hupen]]
- [[Fahrzeugkompatibilität — Übersichtsmatrix & DIP-Grundlagen|Fahrzeugkompatibilität]]
- [[Seriennummern und Softwarestände — Präfixe, Schwellen und Meilensteine|Seriennummern und Softwarestände]]
- [[Artikelnummern-Register — Dokumentierte THITRONIK-Produkte und Zubehör|Artikelnummern-Register]]
- [[Funk-Magnetkontakt 868 — Montage und Betrieb|Funk-Magnetkontakt 868]]
- [[Anlernvorgang — Funk-Zubehör an WiPro III anlernen|Anlernvorgang]]
- [[Störungsbeseitigung — Sichere Diagnose häufiger Probleme|Störungsbeseitigung]]
- [[Pro-Finder — GSM/GPS Telemetriemodul|Pro-Finder]]
- [[Funk-Handsender 868 — Fernbedienung für WiPro III|Funk-Handsender 868]]
- [[Mercedes Sprinter VS30 (BR907/910, ab 2018)|Mercedes Sprinter VS30]]
- [[Mercedes Sprinter NCV3 / VW Crafter (BR906, 2006–2018)|Mercedes Sprinter NCV3 / VW Crafter]]
