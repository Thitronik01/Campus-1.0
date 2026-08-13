---
title: 'Mercedes Sprinter VS30 (BR907/910, ab 2018)'
sources:
  - sources/wipro_iii_mercedes_sprinter_vs30_01.pdf
  - >-
    sources/Einbauhandbuch_WiPro III safe.lock_Art.Nr.105458(Mercedes Sprinter
    VS30)_Rev 1.0_DE.pdf
  - sources/wipro_iii-installationsanleitung_1.8.pdf
updated: '2026-07-20'
confidence: high
lang: de
dealerStatus: approved
---

# Mercedes Sprinter VS30 (BR907/910, ab 2018)

Dieser Artikel beschreibt den Einbau einer WiPro III oder einer WiPro III safe.lock in den Mercedes Sprinter VS30 der Baureihen BR907/BR910 ab Modelljahr 2018. Die Standardanleitung Stand `03/23` und die neuere safe.lock-Anleitung Stand `01/24`, Rev. `1.0`, dokumentieren zwei unterschiedliche DIP-Profile, den Bodycomputer, vier analoge beziehungsweise eine digitale Blinkeransteuerung, CAN, Zündung, Stromversorgung, Sirene, Montageorte, Funk-Zubehör und Funktionstest.

> **Abgrenzung:** Standard-WiPro III und safe.lock-Set `105458` dürfen bei DIP-Profil und Zentralverriegelungsansteuerung nicht vermischt werden. Fahrzeuggeneration, Scheinwerfervariante, Bodycomputer, Steckerbezeichnung, Pin, Leitungsfarbe und Geräteausführung müssen gemeinsam zur gewählten Anleitung passen.

## Geltungsbereich

| Merkmal | Standard-WiPro III | WiPro III safe.lock |
|---|---|---|
| Fahrzeug | Mercedes Sprinter VS30, BR907/BR910, ab 2018 | Mercedes Sprinter VS30, BR907/BR910, ab 2018 |
| Fahrzeugquelle | Stand `03/23` | Stand `01/24`, Rev. `1.0` |
| dokumentierte Gerätebasis | WiPro III ab Software `V6.8` | Set Art. `105458`, ab SN `5458-001`, Software `1.0.0sx` |
| DIP-Grundprofil | `SW4 + SW6 ON`, alle übrigen `OFF` | `SW1–SW8 OFF` |
| Bedienung | originaler Fahrzeugfunkschlüssel | Fahrzeugschlüssel sowie im Campingmodus THITRONIK Zubehör mit ZV-Ansteuerung |
| ILS/LED-Scheinwerfer | digitale Blinkeransteuerung erforderlich | digitale Blinkeransteuerung erforderlich |
| akustischer Alarm | Zusatzsirene oder Back-up Sirene empfohlen | Zusatzsirene oder Back-up Sirene empfohlen |

Die freigegebene Projektmatrix ergänzt für die Standardausführung die Schwelle `0823-019 / 6.8` und für die Auswertung aller vier Fahrzeugschlüssel `0823-034`. Siehe [[Fahrzeugkompatibilität — Übersichtsmatrix & DIP-Grundlagen|Fahrzeugkompatibilität]] und [[Seriennummern und Softwarestände — Präfixe, Schwellen und Meilensteine|Seriennummern und Softwarestände]].

## Quellenrang und bereinigte Altangaben

| Thema | Quellenentscheidung |
|---|---|
| Standard-DIP | Fahrzeuganleitung `03/23`: nur `SW4 + SW6 ON` |
| safe.lock-DIP | neuere Fahrzeuganleitung `01/24`: alle Schalter `1–8 OFF`; die alte Formulierung „Set 5458 alle OFF“ wird damit präzisiert |
| safe.lock-ZV | ausschließlich am Fahrertür-Steuergerät, Stecker 5 blau, Pin 4, gelbe Fahrzeugleitung; die alte Angabe „weißer BC-Stecker Pin 1“ ist in keiner der beiden Fahrzeug-PDFs belegt und wurde entfernt |
| ILS-Blinker | rot/rosa über `220 Ω` an Pin 14 gelb/rot; bei dieser Variante alle grauen WiPro-Blinkerleitungen auspinnen oder einzeln isolieren |
| Sirene | Zusatzsirene Art. `100190` oder Back-up Sirene Art. `100089` werden empfohlen, nicht als zwingende Freigabevoraussetzung bezeichnet |
| Zündungsalternative `F61` | nur in der fehlenden internen Word-Notiz genannt; nicht als belegter Fahrzeuganschluss übernommen |
| Aufbauhersteller-Sonderfälle | Hymer-Campermode, Eura-Mobil, Memory-Sitze und weitere Altangaben stammen aus lokal fehlenden Word-Notizen; ohne Primärquelle keine Einbauanweisung daraus ableiten |
| PSM | im Altbestand erwähnt, aber in den geprüften Fahrzeug-PDFs nicht als Anschlussweg dokumentiert; daher entfernt |

`Mercedes.docx`, `Fahrzeugbesonderheiten.docx` und `WiPro III 8 safe.lock.docx` sind lokal nicht vorhanden und dienen nicht als Beleg. Bei Widersprüchen zwischen den beiden Fahrzeuganleitungen gilt diejenige, die zur tatsächlich verbauten Geräteausführung gehört; innerhalb der safe.lock-Ausführung hat die neuere Anleitung Vorrang.

## Sicherheit und Fahrzeugprüfung

- Arbeiten an Fahrzeugelektrik und -elektronik dürfen nur qualifizierte Fachwerkstätten ausführen.
- Vor elektrischen Arbeiten Batterie-Minus und vorhandene Zusatzbatterien nach Herstellervorgabe trennen; Radiocode und flüchtige Fahrzeugdaten berücksichtigen.
- Vor dem Öffnen der Zentrale und vor jeder DIP-Änderung alle Versorgungs- und Zusatzstecker trennen.
- Ungenutzte Ein- und Ausgänge einzeln gegen Kurzschluss isolieren.
- Kabel gegen Scheuern, Hitze und mechanische Belastung sichern; Pedale, Lenkung, Airbag-Bauteile und andere Fahrzeugfunktionen dürfen nicht behindert werden.
- Vor jedem Anschluss Steckerbezeichnung, Pin, Leitungsfarbe, Spannung und Funktion am tatsächlichen Fahrzeug prüfen.
- Bei abweichender Ausstattung, fehlender Leitung oder anderem Steckbild Arbeit stoppen und Hersteller oder THITRONIK Support kontaktieren.

Vor Beginn prüfen und dokumentieren:

1. Handelt es sich tatsächlich um VS30/BR907/BR910 ab 2018?
2. Ist eine Standard-WiPro III oder das safe.lock-Set Art. `105458` vorhanden?
3. Stimmen Seriennummer und Software mit der vorgesehenen Ausführung überein?
4. Besitzt das Fahrzeug ILS/LED-Scheinwerfer?
5. Funktionieren Funkfernbedienung, Zentralverriegelung, Innenbeleuchtung und alle Blinker?
6. Werden Originaltüren bei eingeschalteter Zündung im Kombiinstrument angezeigt?
7. Welche Türen und Klappen eines Aufbaus werden tatsächlich über CAN erfasst?
8. Bestehen Warnlampen, Fehlerspeichereinträge oder andere elektrische Fehler?

## Geräteausführung und DIP-Profil einstellen

| Ausführung | Mindeststand aus der Fahrzeugquelle | DIP-Profil |
|---|---|---|
| Standard-WiPro III | Software `V6.8` | `SW4 + SW6 ON`; `SW1`, `SW2`, `SW3`, `SW5`, `SW7`, `SW8 OFF` |
| WiPro III safe.lock Set | Art. `105458`, SN `5458-001`, Software `1.0.0sx` | `SW1–SW8 OFF` |
| Standard, vier Fahrzeugschlüssel | Projektmatrix: ab `0823-034` | Standardprofil `SW4 + SW6` beibehalten |
| safe.lock Fehlerkorrektur | Projektregister: ab `5458-006 / 1.2.0sx` | kein abweichendes Fahrzeug-DIP dokumentiert |

1. Artikelnummer, Seriennummer und Softwarestand ablesen und dokumentieren.
2. Zentrale vollständig spannungsfrei machen.
3. Gehäuse vorsichtig öffnen.
4. Für Standard-WiPro III ausschließlich `SW4` und `SW6` auf `ON` stellen.
5. Für das safe.lock-Set `105458` alle Schalter `SW1–SW8` auf `OFF` stellen.
6. Schalterstellung nochmals gegen die Geräteausführung prüfen.
7. Gehäuse schließen und erst danach mit der Installation fortfahren.

> **Verwechslungsgefahr:** `SW6` stellt in der Standardanleitung zugleich die laut/lautlos-Funktion des Funk-Handsenders bereit. Diese Standardangabe darf nicht auf das safe.lock-Profil übertragen werden.

## Armaturenbereich und Bodycomputer freilegen

1. Fußraummatten, Abdeckung des Bordwerkzeugs und Gummimatte entfernen.
2. Bordwerkzeug herausnehmen.
3. Starterbatterie im Fußboden, Batterieabdeckung und Sicherungskasten im Beifahrerfußraum freilegen.
4. Kleine Verkleidung am unteren Ende der Beifahrer-A-Säule lösen.
5. Prüfen, ob der weiße Bodycomputer rechts neben dem Sicherungskasten sichtbar ist.
6. Falls nicht, den Bodycomputer unterhalb des Mitteltunnels zwischen den Fußräumen suchen.
7. Beim Mitteltunnel die beiden Schrauben der unteren Laschen entfernen und Abdeckung ausclipsen.
8. Bei der A-Säulen-Variante obere Abdeckung, Schraube, Spreizniete und Fußmattenklemme lösen.
9. Verkleidung unten aus der hinterhakten Lasche ziehen und abnehmen.
10. Leitungen und Stecker vor weiteren Arbeiten fotografisch dokumentieren.

## Analoge Blinker und CAN am Bodycomputer anschließen

Diese Belegung gilt für Fahrzeuge ohne ILS-Digitalanschluss. Alle Verbindungen liegen am Bodycomputer, unabhängig von dessen Einbauort.

| WiPro-Leitung | Mercedes-Stecker | Pin | Mercedes-Leitung | Funktion |
|---|---|---|---|---|
| grau | RBA1 blue, blauer Stecker | 12 | schwarz/weiß | Blinker hinten links |
| grau | RBA2 white, weißer Stecker | 61 | schwarz/grün | Blinker hinten rechts |
| grau | MR1 purple, violetter Stecker | 1 | schwarz/weiß | Blinker vorne links |
| grau | MR2 white, weißer Stecker | 5, **nicht 36** | schwarz/grün oder schwarz/grau | Blinker vorne rechts |
| violett/orange | Stem white | 7; alternativ 5, falls 7 unbelegt | braun | CAN-Low |
| weiß/orange | Stem white | 17; alternativ 15, falls 17 unbelegt | braun/rot | CAN-High |

1. Bodycomputer und alle genannten Stecker eindeutig identifizieren.
2. Steckerbezeichnung und Pin vor dem Abgriff prüfen.
3. Vier graue Leitungen mit den vier dokumentierten Blinkerleitungen verbinden.
4. MR2 Pin `5` ausdrücklich gegen den fälschlich naheliegenden Pin `36` abgrenzen.
5. CAN-Low violett/orange mit Stem white Pin `7` braun verbinden.
6. Nur wenn Pin 7 unbelegt ist, den dokumentierten Alternativpin `5` am Stem-white-Stecker verwenden.
7. CAN-High weiß/orange mit Stem white Pin `17` braun/rot verbinden.
8. Nur wenn Pin 17 unbelegt ist, den dokumentierten Alternativpin `15` verwenden.
9. Verbindungen mechanisch entlasten und isolieren.

> **Doppelte Pinnummer:** MR2 Pin `5` für den vorderen rechten Blinker und Stem white Pin `5` als CAN-Alternative liegen an unterschiedlichen Steckern. Niemals nur nach der Pinnummer arbeiten.

## ILS/LED-Scheinwerfer digital ansteuern

Bei ILS/LED-Scheinwerfern dürfen die vorderen Blinker nicht über die vier grauen Leistungsleitungen angesteuert werden. Die digitale Variante steuert alle Blinker gemeinsam.

| WiPro-Seite | Zusatzbauteil | Mercedes-Seite | Funktion |
|---|---|---|---|
| rot/rosa | Widerstand `220 Ω` in Reihe | weißer Stecker mit grauer Verriegelung, Pin 14, gelb/rot | digitale Ansteuerung aller Blinker |
| vier graue Blinkerleitungen | nicht verwendet | — | auspinnen oder jede Leitung einzeln isolieren |

1. ILS/LED-Scheinwerfer am tatsächlichen Fahrzeug bestätigen.
2. Rot/rosa der WiPro mit dem `220-Ω`-Widerstand versehen.
3. Weißen Stecker mit grauer Verriegelung eindeutig identifizieren.
4. Verbindung an Pin `14`, gelb/rot, herstellen.
5. Alle vier grauen WiPro-Blinkerleitungen auspinnen oder einzeln isolieren.
6. Nach Inbetriebnahme alle Blinker gemeinsam prüfen.

Beim safe.lock-Set ist der `220-Ω`-Widerstand laut Anleitung enthalten; bei der Standardausführung war er nicht Bestandteil des Lieferumfangs.

## Zündung anschließen

| WiPro-Leitung | Mercedes-Punkt | Mercedes-Leitung | Funktion |
|---|---|---|---|
| gelb | grauer Sicherungshalter, vierte Sicherung von unten | schwarz/rot | Klemme 15 / Zündung |

1. Grauen Sicherungshalter im Beifahrerfußraum identifizieren.
2. Vierte Sicherung von unten lokalisieren.
3. Schwarz/rote Leitung vor dem Anschluss messen.
4. Gelbe WiPro-Leitung fachgerecht verbinden.
5. Prüfen, ob ausstattungsabhängig ein Prüfimpuls auftritt, der im Betrieb einen „vent check“ auslöst.
6. Bei Problemen einen anderen, messtechnisch eindeutig ermittelten Zündungspunkt verwenden; die Quellen nennen dafür keinen festen Alternativpin.

## safe.lock-Zentralverriegelung anschließen

Dieser Abschnitt gilt ausschließlich für WiPro III safe.lock Set Art. `105458`. Die Standard-WiPro III besitzt diesen fahrzeugspezifischen ZV-Anschluss nicht.

| Mercedes-Bauteil | Stecker / Pin | Mercedes-Leitung | WiPro-Leitung | Funktion |
|---|---|---|---|---|
| Fahrertür-Steuergerät | Stecker 5 blau, Pin 4 | gelb | blau/schwarz | safe.lock-ZV-Ansteuerung |

1. Türverkleidung der Fahrertür fachgerecht demontieren.
2. Fahrertür-Steuergerät freilegen.
3. Stecker `5` in Blau und Pin `4` eindeutig identifizieren.
4. Gelbe Fahrzeugleitung elektrisch prüfen.
5. Blau/schwarze safe.lock-Leitung mit Gelverbinder anschließen.
6. Vorhandene Kabelführung von der A-Säule in die Tür verwenden.
7. Kabel gegen Bewegung, Quetschen und Scheuern sichern.
8. Fehlt Fahrertür-Steuergerät, Stecker oder gelbe Leitung, keine Ersatzbelegung aus dem Altbestand ableiten; Supportfreigabe einholen.

## Spannungsversorgung und Hibernation beachten

| Anschluss | WiPro-Leitung | Fahrzeugpunkt | Vorgabe |
|---|---|---|---|
| Klemme 30 | rot | direkt am Batterie-Pluspol | mit `10 A` absichern |
| Klemme 31 | schwarz | Batterie-Minuspol oder geprüfter Massepunkt nahe Bodycomputer | dauerhafte Masseverbindung |
| Klemme 30T | rot, nur bewusst gewählte Alternative | abschaltbarer Fahrzeugpunkt | nach Abschaltung WiPro aus; nach Reaktivierung unscharf |

1. Batterieabdeckung entfernen und beide Polklemmen zugänglich machen.
2. Rote Leitung über eine `10-A`-Sicherung direkt am Pluspol anschließen.
3. Schwarze Leitung am Minuspol oder an einem geprüften Massepunkt nahe dem Bodycomputer anschließen.
4. Ringösen fachgerecht befestigen und gegen Losdrehen sichern.
5. Klemme 30T nur verwenden, wenn das dokumentierte Abschalt- und Unscharfverhalten akzeptiert wird.
6. Versorgung nach allen Stromsparzuständen erneut messen.
7. Hibernation-Mode am MBUX berücksichtigen: Er kann Teile des CAN-Busses abschalten und damit die Alarmfunktion beeinträchtigen.
8. Kunden über die Folgen von Klemme 30T und Hibernation informieren.

Die Direktversorgung an den Polklemmen verhindert die Abschaltung der WiPro-Versorgung, kann aber eine durch Hibernation abgeschaltete CAN-Kommunikation nicht ersetzen.

## Status-LED montieren

1. LED-Position mit dem Kunden abstimmen.
2. Bereich hinter der vorgesehenen Bohrstelle prüfen.
3. Verkleidungsteil von unten an den drei Schrauben lösen und ausclipsen.
4. Loch von `8 mm` bohren.
5. Status-LED einsetzen.
6. Rot/schwarzes LED-Kabel mit weißem Steckverbinder am Gegenstück des WiPro-Kabelsatzes verbinden.
7. Leitung zugentlastet verlegen und LED nach Inbetriebnahme prüfen.

## Zusatzsirene oder Back-up Sirene anschließen

Die Fahrzeughupe besitzt bei ausgeschalteter Zündung kein Dauerplus und kann hier nicht direkt angesteuert werden. Beide Fahrzeuganleitungen empfehlen eine Zusatzsirene Art. `100190` oder Back-up Sirene Art. `100089`; alternativ ist eine Zusatzhupe nach ihrer eigenen Anleitung möglich.

| Ausführung | WiPro-Anschluss | Alarmgeber |
|---|---|---|
| Zusatzsirene | Pin 15, weiß | rot der Sirene |
| Zusatzsirene | Pin 16, weiß/schwarz | schwarz der Sirene |
| Back-up Sirene | Pin 11 / `+12 V` | rot der Back-up Sirene |
| Back-up Sirene | Pin 15, weiß | weiß der Back-up Sirene |
| Back-up Sirene | Fahrzeugmasse | schwarz der Back-up Sirene |
| Back-up Sirene | nicht verwendet | blau einzeln isolieren |

1. Alarmgeber auswählen und dessen eigene Anleitung bereithalten.
2. Geeignete Kabeldurchführung im dokumentierten Bereich des Motorraums verwenden.
3. Alarmgeber an einem vorgebohrten Blechteil geschützt vor Hitze, Wasser und beweglichen Teilen befestigen.
4. Gewählte Variante nach Tabelle anschließen.
5. Nicht verwendete Leitung einzeln isolieren.
6. Akustischen Alarmgeber separat prüfen.

Siehe [[Sirenen und Hupen — Akustische Alarmmittel|Sirenen und Hupen]] und [[Artikelnummern-Register — Dokumentierte THITRONIK-Produkte und Zubehör|Artikelnummern-Register]].

## WiPro und optionalen Pro-finder montieren

WiPro und optionaler Pro-finder können unter dem Ablagefach zwischen Beifahrerairbag und Windschutzscheibe montiert werden. Das Fahrzeug besitzt dort ein geschlossenes oder offenes Fach.

1. Bei geschlossenem Fach das Fach öffnen.
2. Zwei Torx-Schrauben entfernen und Bauteil nach oben ausclipsen.
3. Bei offenem Fach die Abdeckung des Hochtöners ausclipsen.
4. Darunterliegende Torx-Schraube der schmalen Leiste entfernen.
5. Leiste ausclipsen und die zwei weiteren Schrauben lösen.
6. Bauteil nach oben ausclipsen.
7. WiPro und gegebenenfalls Pro-finder links oder rechts unter dem Fach befestigen.
8. Abstand zu Airbag-Bauteilen, Scheuerstellen und beweglichen Teilen einhalten.
9. Geräte für Service erreichbar, aber von außen nicht direkt zugänglich montieren.
10. Antennen weder kürzen noch aufwickeln und nicht hinter abschirmendem Metall platzieren.

Zum optionalen Ortungsmodul siehe [[Pro-Finder — GSM/GPS Telemetriemodul|Pro-Finder]].

## Funk-Zubehör anlernen

1. Sämtliches Zubehör mit Kennzeichnung `868` vor der endgültigen Montage bereitlegen.
2. Taster rechts neben dem WiPro-Anschlussstecker gedrückt halten, bis die Anlage piept und die Status-LED dauerhaft leuchtet.
3. Jeden Funk-Magnetkontakt, Funk-Handsender, Funk-Gaswarner und jede Funk-Kabelschleife zwei- bis dreimal auslösen.
4. Zum Anlernen eines Magnetkontakts Magnet und Sender um mehr als `30 mm` trennen.
5. Speicherung durch Piepton und kurzes Erlöschen der LED bestätigen.
6. Anlernmodus durch kurzes Spannungsfreimachen oder kurzen Tastendruck beenden.
7. Prüfen, dass der nichtflüchtige Speicher die Sender nach Spannungsunterbrechung behält.
8. Bei erforderlichem Löschen beachten, dass der dokumentierte Löschvorgang den Funkspeicher betrifft.

Siehe [[Anlernvorgang — Funk-Zubehör an WiPro III anlernen|Anlernvorgang]].

## Funk-Magnetkontakte montieren

Für die dokumentierten Kontakte Art. `100757` und `100758` gelten:

1. Sendergehäuse passend zu Rahmen, Rollo und Fenster ausrichten.
2. Platine so einsetzen, dass die Sende-LED vom Magneten wegweist.
3. Falsche Orientierung vermeiden: Anlernen ist dann möglich, eine Alarmierung jedoch nicht.
4. Magnet im dokumentierten Bereich `22–30 mm` und nicht jenseits der roten Grenzlinie positionieren.
5. Vor dem Kleben Empfang und Funktion am geplanten Ort prüfen.
6. Klebefläche reinigen, trocknen und entfetten.
7. Nicht unter `15 °C` verkleben und etwa `24 Stunden` Endfestigkeit abwarten.
8. Bei größerem Abstand oder ungünstiger Antennenlage Adapter Art. `100428` oder `100729` verwenden.
9. Wenn Klebepads ungeeignet sind, nur an den vorgesehenen Gehäusemarkierungen verschrauben.
10. Jeden Kontakt nach endgültiger Montage einzeln testen.

Weitere Hinweise: [[Funk-Magnetkontakt 868 — Montage und Betrieb|Funk-Magnetkontakt 868]].

## Bedienlogik und abschließender Funktionstest

Bei der Standard-WiPro III schärft der originale Fahrzeugfunkschlüssel beim Verriegeln und entschärft beim Entriegeln. safe.lock kann im Campingmodus zusätzlich mit THITRONIK Funk-Handsender, NFC-Modul, Pro-finder oder Bluetooth-Vernetzungsmodul die Zentralverriegelung steuern.

> **Aussperrschutz:** Wird das Fahrzeug mit dem Original-Fahrzeugschlüssel verriegelt, lässt es sich laut safe.lock-Anleitung ausschließlich mit diesem Fahrzeugschlüssel wieder entriegeln, nicht mit THITRONIK Zubehör. Schlüssel niemals im Fahrzeug einschließen.

1. Alle Anschlüsse, Sicherung, Masse und das zur Geräteausführung passende DIP-Profil prüfen.
2. Originaltüren und alle Aufbaukontakte schließen.
3. Mit dem Fahrzeugfunkschlüssel verriegeln und Schärfung, Status-LED sowie Blinker prüfen.
4. Mit dem Fahrzeugfunkschlüssel entriegeln und Entschärfung prüfen.
5. Bei safe.lock im Campingmodus mit jedem vorgesehenen THITRONIK Bedienelement ver- und entriegeln.
6. Bestätigen, dass der Funk-Handsender zugleich Alarmzustand und Zentralverriegelung logisch weiter schaltet.
7. Beide Handsendertasten etwa `1 Sekunde` drücken und Panikalarm prüfen.
8. Alarm mit einer Handsendertaste oder der Öffnen-Taste des Fahrzeugschlüssels beenden.
9. Jede Originaltür und jeden Funk-Magnetkontakt einzeln bei geschärfter Anlage öffnen.
10. Mit geöffnetem Funkkontakt schärfen, Lüftungsfunktion und Ausschluss des offenen Kontakts prüfen.
11. Kontakt schließen und Reaktivierung nach etwa `4 Sekunden` prüfen.
12. Funk-Gaswarner etwa `4 Minuten` vorheizen und nach dessen Anleitung testen.
13. Funk-Kabelschleife durch Entnahme aus der Halterung testen.
14. Analoge Vierfach- oder digitale ILS-Blinkeransteuerung vollständig prüfen.
15. Zusatzsirene oder Back-up Sirene mit realem Testalarm prüfen.
16. Hibernation- und Stromsparzustände nur kontrolliert testen und danach Alarmbereitschaft erneut bestätigen.
17. Prüfen, dass keine neuen Warnlampen, Beleuchtungsfehler oder Fehlerspeichereinträge entstanden sind.
18. Verkleidungsteile in umgekehrter Reihenfolge montieren und Kundendokumentation vervollständigen.

## Fehlerdiagnose

| Symptom | Prüfung und Maßnahme |
|---|---|
| Keine Reaktion auf Fahrzeugschlüssel | Geräteausführung, Software, DIP-Profil, CAN-Pins 7/17 beziehungsweise Alternativen 5/15 und CAN-Farben prüfen. |
| Nur einzelne Blinker funktionieren | bei Fahrzeug ohne ILS alle vier grauen Anschlüsse RBA1/RBA2/MR1/MR2 prüfen; MR2 Pin 5 nicht mit Pin 36 verwechseln. |
| ILS-Fahrzeug zeigt Blinkerfehler | digitale Leitung rot/rosa, `220 Ω`, Pin 14 gelb/rot und isolierte graue Leitungen prüfen. |
| „vent check“ oder unerwünschter Prüfimpuls | Zündungsabgriff an vierter Sicherung von unten messen und bei Bedarf einen anderen eindeutig gemessenen Klemme-15-Punkt wählen. |
| safe.lock verriegelt nicht | Stecker 5 blau, Pin 4, gelbe Fahrzeugleitung und blau/schwarze WiPro-Leitung am Fahrertür-Steuergerät prüfen. |
| THITRONIK Zubehör entriegelt nach Verriegeln mit Originalschlüssel nicht | dokumentierte safe.lock-Bedienlogik; mit Original-Fahrzeugschlüssel entriegeln. |
| WiPro nach Standzeit aus oder unscharf | prüfen, ob Klemme 30T statt direkter Batterieversorgung verwendet wurde oder ein Stromsparzustand die Versorgung abgeschaltet hat. |
| Versorgung vorhanden, aber keine CAN-Reaktion | Hibernation-Mode, CAN-Aktivität und CAN-Verbindung prüfen; Direktversorgung ersetzt keinen abgeschalteten CAN-Bus. |
| Fahrzeughupe bleibt stumm | erwartetes Verhalten ohne Zündung; installierte Zusatzsirene, Back-up Sirene oder Zusatzhupe prüfen. |
| Funkkontakt wird nicht erkannt | Anlernen, Platinenorientierung, Magnetabstand, Antennenlage und Metallabschirmung prüfen. |
| Fahrzeug, Stecker oder Leitung weicht ab | Arbeit stoppen und fahrzeugspezifische Freigabe von Hersteller oder THITRONIK Support einholen. |

Siehe [[Störungsbeseitigung — Sichere Diagnose häufiger Probleme|Störungsbeseitigung]].

## Quellenentscheidung

- Die 14-seitige Standardanleitung *WiPro III – Mercedes Sprinter VS30*, Stand `03/23`, wurde vollständig textlich und visuell geprüft.
- Die 14-seitige safe.lock-Anleitung für Set Art. `105458`, Stand `01/24`, Rev. `1.0`, wurde ebenfalls vollständig textlich und visuell geprüft und hat für diese Ausführung Vorrang.
- Standardprofil `SW4 + SW6` und safe.lock-Profil `SW1–SW8 OFF` sind getrennt dokumentiert.
- Beide Quellen bestätigen Bodycomputer-Varianten, Blinker, CAN, Zündung, direkte Batterieversorgung, Hibernation-Hinweis, `8-mm`-LED, Sirenenvarianten, Montageort, Funk-Zubehör und Magnetkontaktwerte.
- Die neuere safe.lock-Quelle ergänzt die ZV-Ansteuerung ausschließlich am Fahrertür-Steuergerät, Stecker 5 blau, Pin 4.
- `0823-019`, `0823-034` und `5458-006 / 1.2.0sx` werden transparent als freigegebene Projektmatrix beziehungsweise Serienregister geführt, nicht als Inhalt der Fahrzeug-PDF `01/24` ausgegeben.
- Nicht lokal verfügbare Word-Notizen wurden nicht als Beleg verwendet; daraus stammende Aufbauhersteller-, Komfortsitz-, PSM- und `F61`-Anweisungen wurden entfernt.

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
- [[NFC Modul — Steuerung der WiPro via NFC|NFC Modul]]
- [[Funk-Handsender 868 — Fernbedienung für WiPro III|Funk-Handsender 868]]
- [[Mercedes Sprinter NCV3 / VW Crafter (BR906, 2006–2018)|Mercedes Sprinter NCV3 / VW Crafter]]
- [[Mercedes Benz Vito W447 (2014–06/2023)|Mercedes Benz Vito W447]]
