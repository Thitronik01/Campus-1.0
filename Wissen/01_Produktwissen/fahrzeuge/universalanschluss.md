---
title: Universalanschluss (ältere / nicht gelistete Fahrzeuge)
sources:
  - 'H:/Thitronik WIKI (ml)/wiki/de/wipro_iii-installationsanleitung_1.8.pdf'
updated: '2026-07-22'
confidence: high
lang: de
dealerStatus: approved
---

# Universalanschluss (ältere / nicht gelistete Fahrzeuge)

Dieser Artikel beschreibt den konventionellen Anschluss einer WiPro III an ein Fahrzeug ohne nutzbare CAN-Bus-Einbindung. Er gilt für ältere oder nicht fahrzeugspezifisch dokumentierte Fahrzeuge nur dann, wenn die benötigten analogen Signale am konkreten Fahrzeug eindeutig gemessen und ihre elektrische Eignung bestätigt wurden.

> **Wichtige Abgrenzung:** „Nicht gelistet“ bedeutet nicht automatisch „universell anschließbar“. Bei modernen, vernetzten Fahrzeugen dürfen keine Leitungen allein nach Farbe oder vermuteter Funktion angeschlossen werden. Gibt es eine fahrzeugspezifische THITRONIK-Anleitung, hat sie Vorrang.

## Geltungsbereich

| Merkmal | Vorgabe |
|---|---|
| Anschlussart | Universalanschluss ohne CAN-Auswertung |
| geeignete Fahrzeuge | Fahrzeuge mit eindeutig prüfbaren analogen Signalen für Versorgung, Zündung, Innenbeleuchtung/Türkontakt und Blinker |
| CAN-High / CAN-Low | Pins `17` und `18` bleiben unbenutzt |
| DIP-Grundstellung | `SW1`, `SW2`, `SW3`, `SW4` auf `OFF` |
| Türüberwachung | über Innenbeleuchtung beziehungsweise geeigneten Türkontakt an Universalpins `19` und `20`; zusätzliche Öffnungen separat absichern |
| Bedienung | abhängig von der geprüften Ausführung über THITRONIK-Funk-Handsender oder eine ausdrücklich freigegebene ZV-Auswertung |
| Mindeststand | im Universalanschlussplan nicht genannt; Seriennummer, Software und Geräteausführung dokumentieren |

Die frühere pauschale Angabe „alle Schalter OFF“ wird nicht fortgeführt: Das Installationshandbuch fordert für den Universalanschluss ausdrücklich nur `SW1–SW4 OFF`. `SW5`, `SW7` und `SW8` haben Sonderfunktionen; für `SW6` nennt diese Quelle keine universelle Funktion. Siehe [[Fahrzeugkompatibilität — Übersichtsmatrix & DIP-Grundlagen|Fahrzeugkompatibilität]].

## Sicherheit und Vorprüfung

- Arbeiten an Fahrzeugelektrik und -elektronik dürfen nur qualifizierte Fachkräfte ausführen.
- Vor Beginn Batterie-Minus und vorhandene Zusatzbatterien nach Herstellervorgabe trennen; Radiocode und flüchtige Fahrzeugdaten berücksichtigen.
- DIP-Schalter ausschließlich im spannungsfreien Zustand ändern. Dabei dürfen weder der 20-polige Stecker noch der Pro-Finder-Stecker eingesteckt sein.
- Vor jedem Abgriff Spannung, Polarität, Strombelastbarkeit und Schaltverhalten mit geeigneter Messtechnik prüfen.
- Fahrzeugunterlagen, Steckerform, Pinnummer und tatsächliches Signal gemeinsam verifizieren; Leitungsfarben allein reichen nicht aus.
- Unbenutzte Leitungen einzeln isolieren. Kabel gegen Scheuern, Hitze, Feuchtigkeit und Zug sichern; Lenkung, Pedale, Airbags und bewegte Bauteile freihalten.
- Weichen Fahrzeug oder Signale vom Anschlussplan ab, Arbeit stoppen und eine fahrzeugspezifische Freigabe bei THITRONIK beziehungsweise dem Fahrzeughersteller einholen.

Vor dem Einbau klären:

1. Existiert eine aktuellere fahrzeugspezifische Anleitung?
2. Arbeitet das Fahrzeug tatsächlich ohne geeignete WiPro-CAN-Einbindung?
3. Welche Türen und Klappen schalten die gewählte Innenbeleuchtung?
4. Liegt am Türsignal geschaltete Masse oder eine andere Signalform an?
5. Sind beide Blinkerzweige analog und ohne unzulässige Rückspeisung ansteuerbar?
6. Funktioniert die Fahrzeughupe bei ausgeschalteter Zündung oder wird eine separate Sirene benötigt?
7. Welche weiteren Öffnungen benötigen Funk-Magnetkontakte?

## DIP-Schalter einstellen

1. WiPro vollständig spannungsfrei machen.
2. 20-poligen Stecker und gegebenenfalls Pro-Finder-Stecker abziehen.
3. Gehäusedeckel vorsichtig öffnen.
4. `SW1`, `SW2`, `SW3` und `SW4` auf `OFF` stellen.
5. `SW5` nur bewusst verwenden: Ab Seriennummer `0823-014` beziehungsweise Software `5.8` verhindert `ON` die Steuerung über den Fahrzeugfunkschlüssel; die Türauswertung bleibt aktiv.
6. `SW7` normalerweise `OFF` lassen; `ON` deaktiviert den Anti-Jamming-Alarm.
7. `SW8` normalerweise `OFF` lassen; `ON` reduziert die Lautstärke der internen Sirene.
8. `SW6` nicht aus anderen Fahrzeugprofilen übernehmen; nur nach aktueller geräte- oder fahrzeugspezifischer Freigabe einstellen.
9. Schalterstellung, Seriennummer und Softwarestand dokumentieren und Gehäuse schließen.

## Belegung des 20-poligen WiPro-Steckers

| Pin | Leitung | Funktion im Universalanschluss |
|---|---|---|
| `1` | schwarz | Masse, Klemme 31 |
| `2` | braun | Alarmeingang NO; optionaler Schließerkontakt, etwa G.A.S.-pro |
| `3` | grün | Alarmeingang COM |
| `4` / `5` | rot / schwarz | Status-LED plus / Masse |
| `6` | rot/pink | Smart-Blinker; im Universalplan nicht verwendet |
| `7` | gelb | Zündung, Klemme 15 |
| `8` | beige | Universalpin 3; im Universalplan nicht verwendet |
| `9` | pink | Hupenausgang; nur nach fahrzeugspezifischer elektrischer Prüfung verwenden |
| `10` | weiß | Antenne; nicht kürzen und nicht aufwickeln |
| `11` | rot | Versorgung `+12/24 V`, Klemme 30, über `10 A` absichern |
| `12` / `14` | grau / grau | Blinker links / rechts |
| `13` | grau/schwarz | Universalpin 4; nicht verwendet und isolieren |
| `15` / `16` | weiß / weiß-schwarz | Sirene `+12 V` / Sirenenmasse |
| `17` / `18` | weiß-orange / violett-orange | CAN-High / CAN-Low; im Universalanschluss nicht verwenden |
| `19` / `20` | blau-schwarz / blau | Universalpin 2 / 1 für Innenbeleuchtungs- beziehungsweise Türsignal nach Anschlussplan |

Die Tabelle beschreibt die WiPro-Seite, nicht fahrzeugseitige Pinnummern. Fahrzeugleitungen müssen am jeweiligen Fahrzeug bestimmt und gemessen werden.

## Versorgung, Masse und Zündung anschließen

1. Geeignete Anschlusspunkte anhand der Fahrzeugunterlagen auswählen.
2. Dauerplus, Masse und Zündung vor dem Anschluss unter den relevanten Betriebszuständen messen.
3. Schwarze WiPro-Leitung Pin `1` mit einem zuverlässigen Massepunkt, Klemme 31, verbinden.
4. Rote WiPro-Leitung Pin `11` über den mitgelieferten Sicherungshalter und eine `10-A`-Sicherung an Klemme 30 anschließen.
5. Gelbe WiPro-Leitung Pin `7` an ein eindeutig geprüftes Zündungssignal, Klemme 15, anschließen.
6. Sicherungshalter zugänglich, trocken und scheuerfrei befestigen.
7. Versorgung erst nach Prüfung aller übrigen Anschlüsse herstellen.

## Innenbeleuchtung und Türkontakte anschließen

Der Universalplan bildet eine konventionelle Innenbeleuchtung mit Türkontaktschalter ab. Die blauen Universalpins `19` und `20` werden entsprechend der gemessenen Versorgung und Schaltseite eingebunden. Eine pauschale Zuordnung nach Leitungsfarbe ist fahrzeugseitig nicht zulässig.

1. Stromlaufplan des Fahrzeugs beschaffen und die Innenbeleuchtungsschaltung bestimmen.
2. Prüfen, welcher Leiter die Leuchte versorgt und welcher Leiter über den Türkontakt schaltet.
3. Blau/schwarz Pin `19` und blau Pin `20` genau nach dem Universalanschlussplan und der gemessenen Polarität verbinden.
4. Jede Fahrerhaustür einzeln öffnen und prüfen, ob sie das gewählte Signal verändert.
5. Heck-, Schiebe-, Aufbau- und Stauraumtüren ebenfalls einzeln prüfen.
6. Nicht erfasste Öffnungen mit geeigneten kabelgebundenen Kontakten oder [[Funk-Magnetkontakt 868 — Montage und Betrieb|Funk-Magnetkontakten]] absichern.
7. Bei Anschluss über den Innenbeleuchtungseingang einen Testalarm mit Fahrerhaustüren frühestens `60 Sekunden` nach dem Scharfschalten durchführen.

Die `60 Sekunden` sind eine Scharfschaltverzögerung für diesen Eingang, nicht die Dauer des Alarms.

## Blinker und optionale Hupe anschließen

1. Linken und rechten Blinkerzweig am Fahrzeug getrennt identifizieren und messen.
2. Graue WiPro-Leitung Pin `12` mit einem Blinkerzweig verbinden.
3. Graue WiPro-Leitung Pin `14` mit dem anderen Blinkerzweig verbinden.
4. Prüfen, dass keine unzulässige Rückspeisung zwischen beiden Fahrzeugseiten entsteht.
5. Den Smart-Blinker-Ausgang Pin `6` nicht zusätzlich anschließen, sofern keine gesonderte Freigabe vorliegt.
6. Pinken Hupenausgang Pin `9` nur verwenden, wenn Schaltart, Belastung und Verfügbarkeit der Fahrzeughupe ohne Zündung eindeutig geeignet sind.
7. Andernfalls eine normale oder Back-up Sirene nach eigener Produktanleitung vorsehen.

## Sirene, Status-LED und Zentrale montieren

| Bauteil | Anschluss / Vorgabe |
|---|---|
| normale Sirene | rot der Sirene an weiß Pin `15`; schwarz der Sirene an weiß/schwarz Pin `16` |
| Back-up Sirene | rote und schwarze Leitung dauerhaft versorgen; weiße Triggerleitung an Pin `15`; blaue negative Triggerleitung laut Handbuch nicht verwenden und isolieren |
| Status-LED | weißen Steckverbinder der rot/schwarzen LED-Leitung mit dem Gegenstück an Pins `4`/`5` verbinden |
| Zentrale | geschützt, trocken, servicezugänglich und möglichst nahe der Fahrzeugelektrik befestigen |
| Antenne | frei von abschirmendem Metall verlegen, nicht kürzen und nicht aufwickeln |

Sirene und Leitungen mit Abstand zu heißen, scharfen und bewegten Teilen montieren. Eine Back-up Sirene ertönt bei Versorgungsausfall nur, wenn sie über ihren Schlüsselschalter aktiviert ist. Weitere Hinweise: [[Sirenen und Hupen — Akustische Alarmmittel|Sirenen und Hupen]].

## Funk-Zubehör anlernen und montieren

1. Funk-Magnetkontakte, [[Funk-Handsender 868 — Fernbedienung für WiPro III|Funk-Handsender]], Funk-Kabelschleifen und Funk-Gaswarner vor der endgültigen Montage anlernen.
2. Taster an der Zentrale halten, bis ein langer Ton ertönt und die Status-LED leuchtet.
3. Jede Funkkomponente auslösen und kurzen Bestätigungston sowie kurzes Erlöschen der LED abwarten.
4. Anlernmodus durch kurzes Drücken des Tasters beenden; der Doppelton bestätigt das Ende.
5. Jeden Sender am geplanten Montageort im Diagnosemodus testen.
6. Funk-Magnetkontakte mit höchstens etwa `22 mm` Abstand im geschlossenen Zustand positionieren.
7. Klebeflächen sauber, trocken und fettfrei vorbereiten; nicht unter `15 °C` verkleben und etwa `24 Stunden` bis zur Endfestigkeit warten.
8. Bei Abschirmung oder großem Abstand Montageadapter Art. `100428` beziehungsweise `100729` prüfen.

Der vollständige Ablauf steht unter [[Anlernvorgang — Funk-Zubehör an WiPro III anlernen|Anlernvorgang]].

## Inbetriebnahme und Funktionstest

1. Alle Verbindungen, Isolierungen, Zugentlastungen und die `10-A`-Sicherung prüfen.
2. DIP-Stellung und unbenutzte, einzeln isolierte Leitungen kontrollieren.
3. Versorgung herstellen und auf ordnungsgemäße Einschaltreaktion achten.
4. WiPro mit dem für die konkrete Konfiguration vorgesehenen Bediengerät scharfschalten.
5. Status-LED, Quittierton und beide Blinkerzweige prüfen.
6. Nach mindestens `60 Sekunden` jede über die Innenbeleuchtung überwachte Fahrerhaustür einzeln öffnen.
7. Jeden zusätzlichen Türkontakt und jede angelernte Funkkomponente einzeln auslösen.
8. Sirene und gegebenenfalls geeignete Fahrzeughupe mit einem realen Testalarm prüfen.
9. Akustischen Alarm von etwa `30 Sekunden` und optische Alarmierung von bis zu `120 Sekunden` gemäß diesem allgemeinen Handbuch prüfen.
10. Alarm beenden, Zündungssignal prüfen und sicherstellen, dass die Fahrzeugelektrik weiterhin fehlerfrei arbeitet.
11. Einbauort, Leitungsabgriffe, Sicherung, DIP-Stellung, Seriennummer und Zubehör dokumentieren.

## Fehlerdiagnose

| Fehlerbild | Prüfung / Maßnahme |
|---|---|
| WiPro ohne Funktion | Pin `11`, Pin `1`, `10-A`-Sicherung und Steckverbindungen direkt am Gerät prüfen |
| unerwartetes Verhalten nach DIP-Änderung | WiPro spannungsfrei machen; `SW1–SW4 OFF` und Sonderfunktionen einzeln prüfen |
| Türöffnung löst nicht aus | Pins `19`/`20`, Polarität, Türkontakt und tatsächliche Abdeckung jeder Tür messen |
| Alarm sofort beim Scharfschalten | Schaltlogik und Ruhezustand des Innenbeleuchtungs-/Türsignals prüfen |
| nur eine Seite blinkt | Pins `12` und `14` sowie beide Fahrzeugzweige getrennt prüfen |
| Hupe bleibt stumm | Verfügbarkeit ohne Zündung, Schaltart und Pin `9` prüfen; gegebenenfalls separate Sirene verwenden |
| Funkkontakt wird nicht empfangen | Anlernstatus, Montageort, Metallabschirmung und Adapter prüfen |
| Fahrzeug besitzt komplexe oder gepulste Signale | Anschluss nicht improvisieren; fahrzeugspezifische Freigabe einholen |

Weitere Prüfungen beschreibt [[Störungsbeseitigung — Sichere Diagnose häufiger Probleme|Störungsbeseitigung]].

## Quellenentscheidung

- Das Installationshandbuch *WiPro III*, Revision `1.8`, wurde im vollständigen deutschen Abschnitt mit Titelseite und Seiten 1 bis 18 textlich und visuell geprüft.
- Seite 4 fordert für ältere oder nicht gelistete Fahrzeuge den konventionellen Anschluss nach Universalplan und ausdrücklich `SW1–SW4 OFF`.
- Seiten 6 und 11 belegen Steckerlage, Leitungsfarben und die Belegung aller 20 Pins.
- Seite 12 belegt Versorgung, `10-A`-Sicherung, Innenbeleuchtung/Türkontakt, zwei analoge Blinkerzweige, Sirene, Status-LED und die nicht verwendeten CAN-Leitungen.
- Seiten 5 bis 10 belegen Anlernen, Montage, Diagnose, Sirenenanschluss und die `60-Sekunden`-Verzögerung des Innenbeleuchtungseingangs.
- Seite 16 belegt `9–30 V`, `1 A`, `60 W`, etwa `11 mA`, maximal 100 Sender, `868,35 MHz`, `<10 mW`, `75 m`, `CR2032` und die Temperaturbereiche.
- Die frühere Aussage „alle Schalter OFF“ wurde auf die tatsächlich belegte Aussage `SW1–SW4 OFF` korrigiert. Für `SW6` wird keine unbelegte Universalstellung erfunden.

Primärquelle:

- `H:/Thitronik WIKI (ml)/wiki/de/wipro_iii-installationsanleitung_1.8.pdf`

## Querverweise

- [[WiPro III — Funk-Alarmsystem für Freizeitfahrzeuge|WiPro III]]
- [[Fahrzeugkompatibilität — Übersichtsmatrix & DIP-Grundlagen|Fahrzeugkompatibilität]]
- [[Anlernvorgang — Funk-Zubehör an WiPro III anlernen|Anlernvorgang]]
- [[Funk-Handsender 868 — Fernbedienung für WiPro III|Funk-Handsender 868]]
- [[Funk-Magnetkontakt 868 — Montage und Betrieb|Funk-Magnetkontakt 868]]
- [[Funk-Kabelschleife 868 — Außensicherung für mobile Güter|Funk-Kabelschleife 868]]
- [[Sirenen und Hupen — Akustische Alarmmittel|Sirenen und Hupen]]
- [[Störungsbeseitigung — Sichere Diagnose häufiger Probleme|Störungsbeseitigung]]
