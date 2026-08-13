---
title: VW T6 (2015–2019)
sources:
  - 'H:/Thitronik WIKI (ml)/wiki/de/wipro_iii_vw_t6_2015_.pdf'
  - 'H:/Thitronik WIKI (ml)/wiki/de/wipro_iii-installationsanleitung_1.8.pdf'
updated: '2026-07-22'
confidence: high
lang: de
dealerStatus: approved
---

# VW T6 (2015–2019)

Diese Seite beschreibt den Einbau einer WiPro III in den VW T6 der Modelljahre 2015–2019. Maßgeblich ist das zehnseitige gemeinsame Einbauhandbuch für T6 und T6.1, Stand `12/20`; das allgemeine WiPro-III-Installationshandbuch Revision `1.8` ergänzt Sicherheit und die Pinbelegung des 20-poligen Kabelsatzes.

> **Abgrenzung:** Für den Vorgänger gilt [[VW T5 Facelift (ab MJ 2010)]], für Fahrzeuge ab Modelljahr 2019 [[VW T6.1 (ab 2019)]]. Das gemeinsame Fahrzeughandbuch zeigt für beide Generationen unterschiedliche DIP-Profile, Mindestseriennummern und CAN-High-Leitungen. Diese Seite darf ausschließlich für den T6 2015–2019 verwendet werden.

## Überblick

| Parameter | Verifizierter Stand |
|---|---|
| Fahrzeug | VW T6 |
| Modelljahre | 2015–2019 |
| System / Set | WiPro III / Universal-Set `100754` |
| Mindestseriennummer | `0823-012` |
| Mindestsoftware | in den Primärquellen nicht genannt |
| DIP → ON | `SW3 + SW4 + SW6` |
| CAN-Anschluss | Sicherungskasten und Kabeltunnel im Fahrerfußraum |
| Bedienung | originale Fahrzeugfernbedienung; Funk-Handsender 868 zusätzlich möglich |
| Akustischer Alarmgeber | normale oder Back-up Sirene dringend empfohlen; Fahrzeughupe ohne Zündung inaktiv |
| Alarmdauer | akustisch ca. `30 Sekunden`, optisch ca. `180 Sekunden` |

## Quellenumfang und Freigabegrenzen

| Thema | Freigegebene Aussage |
|---|---|
| Fahrzeugprofil | ausschließlich T6 2015–2019 mit `SW3 + SW4 + SW6` |
| Gerätebasis | Universal-Set `100754`, WiPro ab Seriennummer `0823-012` |
| CAN-Leitungen | T6 orange/braun und orange/grün; die T6.1-Abweichung wird nicht übertragen |
| Versorgung | fahrzeugspezifische Abgriffstellen; WiPro-Pins und Absicherung nach allgemeinem Handbuch |
| Sirene | normale oder Back-up Sirene nach dem fahrzeugspezifischen Schaltbild |
| Abweichendes Fahrzeug | Arbeiten stoppen und aktuelle Freigabe bei THITRONIK beziehungsweise Fahrzeughersteller einholen |

Die früher referenzierten Dateien `VW.docx`, `Fahrzeugbesonderheiten.docx`, `WiPro 13safe.lock.docx` und `WiPro III12safe.lock.docx` sind lokal nicht vorhanden. Aussagen daraus – etwa alternative CAN-Abgriffe, DoKa-Ausschlüsse oder safe.lock-Sonderfälle – werden deshalb nicht als freigegebene Einbaudaten fortgeführt.

1. Modell und Modelljahr anhand der Fahrzeugunterlagen bestätigen.
2. T6 eindeutig vom T5 Facelift und T6.1 abgrenzen.
3. Universal-Set `100754` und Seriennummer ab `0823-012` bestätigen.
4. Artikelnummer, Seriennummer und Softwarestand dokumentieren.
5. Bei abweichenden Leitungsfarben oder Einbaupositionen keine Werte aus dieser Seite übertragen.

## Sicherheit und Fahrzeugvorprüfung

Das Fahrzeughandbuch richtet sich an professionelle Servicebetriebe. Unsachgemäße Arbeiten an Fahrzeugelektrik, Airbag-Bereich oder Verkleidung können Personen und Verkehrssicherheit gefährden.

1. Arbeiten nur durch eine qualifizierte Fachkraft ausführen lassen.
2. Vor dem Einbau Fahrzeughupe, Beleuchtung, Warnanzeigen und Fehlerspeicher prüfen und den Zustand dokumentieren.
3. Batterie nach Fahrzeugherstellervorgabe trennen; Radiocode und flüchtige Daten beachten.
4. DIP-Schalter ausschließlich spannungsfrei ändern.
5. Ungenutzte Ein- und Ausgänge einzeln isolieren.
6. Leitungen gegen Scheuern, Zug, Hitze und Feuchtigkeit sichern.
7. Pedale, Lenkung, Airbags und bewegte Teile freihalten.
8. Benötigte Werkzeuge bereitlegen: Kombi- oder Wasserpumpenzange, PH2-Kreuzschlitzschraubendreher, Torx 25 und Akkuschrauber mit `8-mm`-Bohrer für die Status-LED.

## DIP-Profil einstellen

1. Spannungsversorgung der WiPro vollständig entfernen.
2. Gehäuse öffnen und den achtfachen Codierschalter zugänglich machen.
3. Beim T6 ausschließlich `SW3`, `SW4` und `SW6` auf `ON` stellen.
4. Alle anderen Schalter in der im Fahrzeughandbuch dargestellten Grundstellung belassen.
5. Nicht das darunter abgebildete T6.1-Profil `SW2 + SW3 + SW4 + SW6` übernehmen.
6. Schalterstellung fotografieren oder dokumentieren.
7. Gehäuse schließen und erst danach mit dem Anschluss fortfahren.

## Armaturenbrett freilegen

1. Seitenabdeckungen des Armaturenbretts abziehen.
2. Handschuhfach durch Lösen von sieben Torx-Schrauben ausbauen.
3. Lichtschalter eindrücken, auf Standlicht drehen und herausziehen.
4. Lichtschalterblende durch Lösen einer Torx-Schraube und zweier Clips ausbauen.
5. Blende unter dem Lenkrad ausclipsen.
6. Schalthebelmanschette ausclipsen.
7. Mittelkonsole durch Lösen von acht Torx-Schrauben ausbauen.
8. Sicherungskasten und Kabeltunnel im Fahrerfußraum freilegen, ohne Fahrzeugleitungen zu verspannen.

## CAN, Warnblinker und Zündung anschließen

Die Fahrzeuganleitung verlangt für die CAN-Verbindungen gelgefüllte Verbinder. Ein Anschluss darf nie allein anhand der Farbe erfolgen; Lage, Farbe und gemessenes Signal müssen gemeinsam passen.

| Fahrzeugleitung / Ort | WiPro-Leitung / Pin | Funktion |
|---|---|---|
| orange/braun am Sicherungskasten/Kabeltunnel | violett/orange, Pin `18` | CAN-Low |
| orange/grün am Sicherungskasten/Kabeltunnel | weiß/orange, Pin `17` | CAN-High |
| weiß/grün am Warnblinkschalter | rot/rosa, Pin `6` | Smart-Blinker / Warnblinker |
| OBD-Stecker Pin `1`, schwarz/violett | gelb, Pin `7` | Zündung, Klemme 15 |

1. Sicherungskasten und Kabeltunnel aus Blickrichtung Fahrerfußraum lokalisieren.
2. Orange/braun messen und mit violett/orange Pin `18` über einen gelgefüllten Verbinder verbinden.
3. Orange/grün messen und mit weiß/orange Pin `17` über einen gelgefüllten Verbinder verbinden.
4. Warnblinkschalter ausbauen.
5. Weiß/grüne Warnblinkerleitung prüfen und mit rot/rosa Pin `6` verbinden.
6. OBD-Stecker identifizieren und Pin `1` sicher bestimmen.
7. Schwarz/violette Leitung an OBD-Pin `1` als Klemme 15 prüfen und mit gelb Pin `7` verbinden.
8. Alle Verbindungen fachgerecht isolieren und zugentlasten.

## Dauerplus, Masse und Status-LED

| Funktion | Fahrzeugabgriff | WiPro-Leitung / Pin |
|---|---|---|
| Klemme 30 | rote Leitung am Zigarettenanzünder oder rot/schwarze Leitung am Relais unten rechts im Sicherungskasten | rot, Pin `11` |
| Klemme 31 | Massepunkt links oder rechts in Verlängerung der A-Säule oder braune Leitung am Zigarettenanzünder | schwarz mit Ringöse, Pin `1` |
| Status-LED | mit dem Kunden abgestimmte, gut sichtbare Position | rot/schwarzes LED-Kabel mit weißem Steckverbinder an Gegenstück des WiPro-Kabelsatzes |

1. Gewählte Klemme-30-Abgriffstelle messen und dokumentieren.
2. Rote WiPro-Leitung Pin `11` über den zugänglichen `10-A`-Sicherungshalter des Kabelsatzes anschließen.
3. Gewählten Massepunkt auf niedrigen Übergangswiderstand und mechanische Belastbarkeit prüfen.
4. Schwarze WiPro-Leitung Pin `1` mit Ringöse anlegen.
5. Position der Status-LED vor dem Bohren mit dem Kunden abstimmen.
6. Airbags, Leitungen und Bauteile hinter der Bohrstelle ausschließen.
7. Loch mit `8 mm` bohren und Status-LED einsetzen.
8. Rot/schwarzes LED-Kabel mit weißem Steckverbinder an das Gegenstück des WiPro-Kabelsatzes anschließen.

## Sirene anschließen

Da die Fahrzeughupe ohne Zündung inaktiv ist und kein Dauerplus besitzt, kann sie in diesem Einbauschema nicht angesteuert werden. Das Fahrzeughandbuch empfiehlt dringend eine normale oder eine Back-up Sirene.

| Bauteil | Anschluss |
|---|---|
| normale Sirene | WiPro weiß Pin `15` an Sirene rot; WiPro weiß/schwarz Pin `16` an Sirene schwarz |
| Back-up Sirene Versorgung | rot dauerhaft an `+12 V`, schwarz an Masse |
| Back-up Sirene Trigger | weiß an WiPro weiß Pin `15`; blau nicht verwenden und isolieren |

1. Weiße und weiß/schwarze WiPro-Leitung scheuerfrei in den Motorraum verlängern.
2. Sirene entsprechend dem im Handbuch gezeigten Einbauplatz geschützt befestigen.
3. Normale Sirene ausschließlich nach der Pin-`15`/`16`-Variante anschließen.
4. Alternativ die Back-up Sirene dauerhaft versorgen und ihre weiße Triggerleitung an Pin `15` anschließen.
5. Blaue Leitung der Back-up Sirene einzeln isolieren.
6. Leitungsdurchführung abdichten und alle Leitungen gegen Hitze und Bewegung sichern.
7. Sicherung erst einsetzen, wenn alle Verbindungen kontrolliert sind.

Weitere Grundlagen: [[Sirenen und Hupen — Akustische Alarmmittel]].

## Funk-Zubehör anlernen

Sämtliches Funk-Zubehör – auch Komponenten aus dem Lieferumfang – muss einmalig angelernt werden und den Zusatz `868` tragen.

1. WiPro mit stabiler Versorgung bereitstellen.
2. Taster rechts neben dem Anschlussstecker gedrückt halten, bis die Anlage piept.
3. Prüfen, dass die Status-LED dauerhaft leuchtet.
4. Funk-Magnetkontakt 868 durch Entfernen des Magneten um mehr als `30 mm` mehrfach `2–3 Mal` auslösen.
5. Beim Funk-Handsender 868 die Tasten, beim Funk-Gaswarner 868 das Einschalten und bei der Funk-Kabelschleife 868 das Entfernen aus der Halterung jeweils `2–3 Mal` auslösen.
6. Bestätigungston und kurzes Erlöschen der Status-LED für jedes Zubehör abwarten.
7. Anlernmodus durch kurzes Spannungsfreischalten oder kurzen Druck auf den WiPro-Taster beenden.
8. Jedes Zubehör eindeutig beschriften und seinem Montageort zuordnen.
9. Vollständigen Ablauf mit [[Anlernvorgang — Funk-Zubehör an WiPro III anlernen]] abgleichen.

## Funk-Magnetkontakte montieren

Die Fahrzeugquelle beschreibt die Artikel `100757` und `100758`.

| Merkmal | Vorgabe |
|---|---|
| Platinenrichtung | Sende-LED muss vom Magneten wegweisen |
| Magnetbereich | im geschlossenen Zustand innerhalb des gelben Bereichs, typisch `22–30 mm` |
| Klebefläche | sauber, trocken und fettfrei |
| Verarbeitungstemperatur | nicht unter `15 °C` |
| Endfestigkeit Klebepad | nach etwa `24 Stunden` |
| Montageadapter | Art. `100428` oder `100729` bei größerem Abstand beziehungsweise zur Antennenausrichtung |

1. Sendergehäuse möglichst auf dem festen Rahmen montieren.
2. Magnet am bewegten Fenster-, Tür- oder Klappenteil ausrichten.
3. Platine so einsetzen, dass die Sende-LED vom Magneten wegweist.
4. Falsche Platinenrichtung ausschließen: Anlernen kann sonst funktionieren, Alarmierung jedoch ausbleiben.
5. Magnet nur im dargestellten Arbeitsbereich positionieren und nicht jenseits der roten Grenzlinie montieren.
6. Klebeflächen reinigen, trocknen und entfetten.
7. Nicht unter `15 °C` verkleben und etwa `24 Stunden` bis zur Endfestigkeit warten.
8. Bei ungeeigneter Klebefläche die vorgesehenen Schraubmarkierungen verwenden.
9. Bei großen Abständen Adapter `100428` oder `100729` einsetzen.
10. Jeden Kontakt nach der Montage bei geschlossener und geöffneter Öffnung testen.

Siehe [[Funk-Magnetkontakt 868 — Montage und Betrieb]] und [[Funk-Kabelschleife 868 — Außensicherung für mobile Güter]].

## Inbetriebnahme und Funktionstest

1. DIP-Stellung `SW3 + SW4 + SW6` und Seriennummer ab `0823-012` nochmals prüfen.
2. Alle Crimpverbindungen, Gelverbinder, Isolierungen, Zugentlastungen und die `10-A`-Sicherung kontrollieren.
3. Versorgung herstellen und auf den Einschalt-Piepton achten.
4. Fahrzeugtüren schließen.
5. Verriegeln-Taste der originalen Fahrzeugfernbedienung drücken.
6. Prüfen, dass die WiPro schärft, das Fahrzeug verriegelt und die Blinker rückmelden.
7. Fahrertür mechanisch von innen mit dem Türgriff oder von außen mit dem mechanischen Schlüssel öffnen und Alarm auslösen.
8. Normale oder Back-up Sirene mit dem realen Alarm prüfen.
9. Akustische Alarmdauer von ca. `30 Sekunden` und optische Alarmdauer von ca. `180 Sekunden` prüfen.
10. Alarm mit einer beliebigen Taste des Funk-Handsenders oder der Öffnen-Taste der originalen Fahrzeugfernbedienung beenden.
11. Blinkfolge des Alarmspeichers über die Status-LED nach Alarmunterbrechung beobachten.
12. Alle weiteren vom Fahrzeug oder Funk-Zubehör überwachten Öffnungen einzeln prüfen.

## Bedienung und Rückmeldungen

- Verriegeln mit der originalen Fahrzeugfernbedienung schärft die WiPro und verriegelt das Fahrzeug; die Blinker geben Rückmeldung.
- Öffnen mit der originalen Fahrzeugfernbedienung oder eine beliebige Taste des Funk-Handsenders beendet einen laufenden Alarm.
- Nach einem unterbrochenen Alarm zeigt die Status-LED den Alarmspeicher als Blinkfolge an.
- Jede reale Tür, Klappe und jedes Funk-Zubehör muss bei Übergabe einzeln geprüft werden; eine Abdeckung darf nicht nur aus der Fahrzeugausstattung abgeleitet werden.

## Diagnose

| Fehlerbild | Prüfung / Maßnahme |
|---|---|
| kein Einschalt-Piepton | Versorgung Pin `11`, Masse Pin `1`, `10-A`-Sicherung und Crimpungen prüfen |
| WiPro reagiert nicht auf Fahrzeugfernbedienung | CAN-Leitungen und DIP-Profil prüfen; T6-Farben nicht mit T6.1 verwechseln |
| keine CAN-Aktivität im Diagnosemodus | Buszustand, gelgefüllte Verbinder, orange/braun Pin `18` und orange/grün Pin `17` prüfen |
| Anlage bei eingeschalteter Zündung deaktiviert | Zündung an OBD-Pin `1` und WiPro Pin `7` prüfen; Verhalten ist systembedingt |
| Blinker quittieren nicht | weiß/grüne Leitung am Warnblinkschalter und rot/rosa Pin `6` prüfen |
| Sirene bleibt stumm | Pin `15`/`16`, Dauerplus/Masse der Back-up Sirene und isolierte blaue Leitung prüfen |
| Zubehör lässt sich anlernen, löst aber keinen Alarm aus | Platine des Funk-Magnetkontakts prüfen; Sende-LED muss vom Magneten wegweisen |

Für den CAN-Diagnosemodus den Taster auf der Platine kurz drücken. Bedienung der Fahrzeugfernbedienung oder anderer CAN-Datenverkehr muss die grüne linke LED flackern lassen. Weitere systematische Prüfungen: [[Störungsbeseitigung — Sichere Diagnose häufiger Probleme]].

## Dokumentation

1. Fahrzeugmodell, Modelljahr und VIN erfassen.
2. Set `100754`, WiPro-Artikelnummer, Seriennummer und Softwarestand notieren.
3. DIP-Stellung `SW3 + SW4 + SW6` dokumentieren.
4. CAN-, Warnblinker-, OBD-, Dauerplus- und Masseabgriffe fotografieren.
5. Sicherungswert, Status-LED-Position und Sirenenvariante festhalten.
6. Alle überwachten Öffnungen und Funkkontakte einzeln protokollieren.
7. Alarmzeiten, Alarmspeicheranzeige und Kundenübergabe dokumentieren.

## Quellen

- `H:/Thitronik WIKI (ml)/wiki/de/wipro_iii_vw_t6_2015_.pdf` — gemeinsames fahrzeugspezifisches Einbauhandbuch für T6/T6.1, Stand `12/20`; alle zehn Seiten vollständig textlich und visuell geprüft.
- `H:/Thitronik WIKI (ml)/wiki/de/wipro_iii-installationsanleitung_1.8.pdf` — allgemeines Installationshandbuch, Revision `1.8`; vollständiger deutscher Abschnitt bereits textlich und visuell geprüft.
- Die Matrixangabe Software `5.1` wird nicht als Mindeststand fortgeführt, weil die Primärquelle für den T6 ausschließlich die Mindestseriennummer `0823-012` nennt.

## Querverweise

- [[WiPro III — Funk-Alarmsystem für Freizeitfahrzeuge]]
- [[Fahrzeugkompatibilität — Übersichtsmatrix & DIP-Grundlagen]]
- [[Anlernvorgang — Funk-Zubehör an WiPro III anlernen]]
- [[Funk-Magnetkontakt 868 — Montage und Betrieb]]
- [[Funk-Kabelschleife 868 — Außensicherung für mobile Güter]]
- [[Sirenen und Hupen — Akustische Alarmmittel]]
- [[Störungsbeseitigung — Sichere Diagnose häufiger Probleme]]
- [[VW T5 Facelift (ab MJ 2010)]]
- [[VW T6.1 (ab 2019)]]
