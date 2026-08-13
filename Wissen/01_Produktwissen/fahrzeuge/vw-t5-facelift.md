---
title: VW T5 Facelift (ab MJ 2010)
sources:
  - 'H:/Thitronik WIKI (ml)/wiki/de/wipro_iii_vw_t5_facelift_2009_.pdf'
  - 'H:/Thitronik WIKI (ml)/wiki/de/wipro_iii-installationsanleitung_1.8.pdf'
updated: '2026-07-22'
confidence: high
lang: de
dealerStatus: approved
---

# VW T5 Facelift (ab MJ 2010)

Diese Seite beschreibt den Einbau einer WiPro III in den VW T5 Facelift ab Modelljahr 2010. Maßgeblich ist das neunseitige fahrzeugspezifische Einbauhandbuch Stand `12/20`; das allgemeine WiPro-III-Installationshandbuch Revision `1.8` ergänzt Sicherheit und die Pinbelegung des 20-poligen Kabelsatzes.

> **Abgrenzung:** Für den T5 der Baujahre 2006–2009 gilt [[VW T5 (2006–2009)]]. Modelljahr, Einbauort, Leitungsfarben und Signale müssen gemeinsam zur hier beschriebenen Facelift-Ausführung passen.

## Überblick

| Parameter | Verifizierter Stand |
|---|---|
| Fahrzeug | VW T5 Facelift |
| Modelljahr | ab 2010 |
| System | WiPro III |
| DIP → ON | `SW1 + SW4 + SW6` |
| CAN-Anschluss | orange/braun und orange/grün im Leitungsbereich hinter dem Handschuhfach |
| Bedienung | Fahrzeugfunkschlüssel; Funk-Zubehör zusätzlich anlernbar |
| Akustischer Alarmgeber | normale oder Back-up Sirene dringend empfohlen; Fahrzeughupe ohne Zündung inaktiv |
| Mindestseriennummer / Software | in den Primärquellen nicht genannt |
| Alarmdauer | akustisch ca. `30 Sekunden`, optisch ca. `180 Sekunden` |

## Quellenumfang und Freigabegrenzen

| Thema | Freigegebene Aussage |
|---|---|
| Fahrzeugprofil | ausschließlich T5 Facelift ab Modelljahr 2010 mit `SW1 + SW4 + SW6` |
| Leitungsabgriff | Einbauposition, Fahrzeugfarbe und gemessenes Signal gemeinsam identifizieren |
| Spannungsversorgung | Batterieanschluss nach Fahrzeuganleitung; WiPro-Pins `1`, `7` und `11` nach allgemeinem Handbuch |
| Sirene | normale Sirene oder Back-up Sirene nach dem fahrzeugspezifischen Schaltbild |
| Serien-/Softwaregrenze | `0823-001 / 2.1` ist nicht belegt und wird nicht als Mindeststand fortgeführt |
| Abweichendes Fahrzeug | Arbeiten stoppen und aktuelle Freigabe bei THITRONIK beziehungsweise Fahrzeughersteller einholen |

1. Modell und Modelljahr anhand der Fahrzeugunterlagen bestätigen.
2. Facelift-Ausführung vom T5 der Baujahre 2006–2009 abgrenzen.
3. Artikelnummer, Seriennummer und Software der WiPro dokumentieren.
4. Leitungsfarben und Einbausituation mit der Anleitung vergleichen.
5. Bei Abweichungen keine Werte aus dieser Seite übertragen.

## Sicherheit und Vorbereitung

Das Fahrzeughandbuch richtet sich an professionelle Servicebetriebe. Unsachgemäße Arbeiten an Fahrzeugelektrik, Airbag-Bereich oder Verkleidung können Personen und Verkehrssicherheit gefährden.

1. Arbeiten nur durch eine qualifizierte Fachkraft ausführen lassen.
2. Batterie nach Fahrzeugherstellervorgabe trennen; Radiocode und flüchtige Daten beachten.
3. DIP-Schalter ausschließlich spannungsfrei ändern.
4. Ungenutzte Ein- und Ausgänge einzeln isolieren.
5. Leitungen gegen Scheuern, Zug, Hitze und Feuchtigkeit sichern.
6. Pedale, Lenkung, Airbags und bewegte Teile freihalten.
7. Funk-Zubehör vor der endgültigen Montage anlernen.

## DIP-Profil einstellen

1. Spannungsversorgung der WiPro vollständig entfernen.
2. Gehäuse öffnen und den achtfachen Codierschalter zugänglich machen.
3. `SW1`, `SW4` und `SW6` auf `ON` stellen.
4. Alle anderen Schalter in der in der Fahrzeuganleitung dargestellten Grundstellung belassen.
5. Schalterstellung fotografieren oder dokumentieren.
6. Gehäuse schließen und erst danach mit dem Anschluss fortfahren.

## Handschuhfach ausbauen und Zentrale montieren

1. Fünf Schrauben entfernen: je eine an beiden Seiten, zwei innen an der Front und eine hinten mittig.
2. Handschuhfach vorsichtig anheben.
3. Vorhandenen AUX-Eingang oder eine iPod-Schnittstelle hinten ausstecken.
4. Vordere Abdeckung beziehungsweise das Gehäuse lösen.
5. Handschuhfach entnehmen, ohne Leitungen oder Clips zu belasten.
6. WiPro III vor dem Handschuhfach unterhalb des Lüftungskanals trocken und servicezugänglich mit geeignetem doppelseitigem Klebeband befestigen.
7. Einen optionalen Pro-Finder bei Bedarf am selben geschützten Montagebereich befestigen.

## Fahrzeuganschlüsse

Die Fahrzeuganleitung nennt keine Stecker- oder Fahrzeug-Pinnummern. Deshalb sind Einbauposition, Leitungsfarbe und gemessenes Signal gemeinsam zu prüfen; eine Leitung niemals nur aufgrund ihrer Farbe anschließen.

| Fahrzeugleitung | WiPro-Leitung / Pin | Funktion |
|---|---|---|
| orange/braun | violett/orange, Pin `18` | CAN-Low |
| orange/grün | weiß/orange, Pin `17` | CAN-High |
| schwarz/gelb | gelb, Pin `7` | Zündung, Klemme 15 |
| weiß/grün, dünn, kräftig grüne Markierung | rot/pink, Pin `6` | Smart-Blinker / Warnblinker |

1. CAN-Leitungspaar im dargestellten Leitungsbereich hinter dem Handschuhfach lokalisieren.
2. Orange/braun messen und mit violett/orange Pin `18` verbinden.
3. Orange/grün messen und mit weiß/orange Pin `17` verbinden.
4. Schwarz/gelb als Klemme 15 prüfen und mit gelb Pin `7` verbinden.
5. Dünnen Kabelbaum in Richtung Warnblinkschalter identifizieren.
6. Dünne weiß/grüne Leitung mit kräftig grüner Markierung prüfen und mit rot/pink Pin `6` verbinden.
7. Verbindungen fachgerecht crimpen, isolieren und zugentlasten.

## Versorgung, Kabeldurchführung und Sirene

Da die Fahrzeughupe ohne Zündung inaktiv ist und dann nicht angesteuert werden kann, empfiehlt die Fahrzeuganleitung dringend eine normale oder eine Back-up Sirene.

| Bauteil | Anschluss |
|---|---|
| WiPro-Masse | schwarz Pin `1` an Batterie-Minus / zuverlässige Fahrzeugmasse |
| WiPro-Dauerplus | rot Pin `11` über Sicherungshalter an Batterie-Plus |
| normale Sirene | WiPro weiß Pin `15` an Sirene rot; WiPro weiß/schwarz Pin `16` an Sirene schwarz |
| Back-up Sirene Versorgung | rot dauerhaft an `+12 V`, schwarz an Masse |
| Back-up Sirene Trigger | weiß an WiPro weiß Pin `15`; blau nicht verwenden und isolieren |

1. Rote Leitung Pin `11` und schwarze Leitung Pin `1` in den Motorraum verlängern.
2. Rechts unterhalb des Handschuhfachs den Durchführungsstopfen zum Wischergestängekasten nutzen.
3. Vom Motorraum aus die herausnehmbare Metallabdeckung unterhalb der oberen Gummilippe zur Motorhaube öffnen.
4. Leitungen scheuerfrei durchführen und die Durchführung wieder sicher abdichten.
5. Dauerplus über einen zugänglichen Sicherungshalter an Batterie-Plus anschließen; Sicherungswert nach dem allgemeinen Handbuch auslegen.
6. Masse niederohmig und mechanisch belastbar herstellen.
7. Normale Sirene nach der Pin-`15`/`16`-Variante anschließen oder die Back-up Sirene dauerhaft versorgen und ihre weiße Triggerleitung an Pin `15` anschließen.
8. Blaue Leitung der Back-up Sirene einzeln isolieren.
9. Sicherung erst einsetzen, wenn alle Verbindungen kontrolliert sind.

Weitere Grundlagen: [[Sirenen und Hupen — Akustische Alarmmittel]].

## Funk-Zubehör anlernen

Funk-Magnetkontakte, Gaswarner und Funk-Kabelschleifen sollen vor dem Einbau gespeichert werden.

1. WiPro mit stabiler Versorgung bereitstellen.
2. Taster rechts neben dem Anschlussstecker gedrückt halten, bis die Anlage piept.
3. Prüfen, dass die Status-LED dauerhaft leuchtet.
4. Jeden zu speichernden Funk-Magnetkontakt `2–3 Mal` auslösen.
5. Gaswarner oder Funk-Kabelschleife ebenfalls `2–3 Mal` auslösen.
6. Bestätigungston und kurzes Erlöschen der Status-LED abwarten.
7. Jedes Zubehör eindeutig beschriften und seinem Montageort zuordnen.
8. Vollständigen Ablauf mit [[Anlernvorgang — Funk-Zubehör an WiPro III anlernen]] abgleichen.

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

## Inbetriebnahme und vollständiger Funktionstest

1. DIP-Stellung `SW1 + SW4 + SW6` nochmals prüfen.
2. Alle Crimpverbindungen, Isolierungen, Zugentlastungen und die Sicherung kontrollieren.
3. Versorgung herstellen und auf den Einschalt-Piepton achten.
4. Zündung ausschalten; bei eingeschalteter Zündung ist die Anlage deaktiviert.
5. Alle Fahrerhaustüren schließen. Bei geöffneter Fahrerhaustür verriegelt das Fahrzeug nicht und die Anlage wird nicht aktiviert.
6. Fahrzeug mit der Verriegeln-Taste des Funkschlüssels verschließen und die Anlage scharfschalten.
7. Einen Quittierton, Blinken der Fahrtrichtungsanzeiger und blinkende Status-LED prüfen.
8. Falls die Anlage zunächst nicht reagiert, mehrfach verriegeln und entriegeln, damit sich die CAN-Daten synchronisieren.
9. Alle vom Fahrzeug und durch Funk-Zubehör überwachten Öffnungen einzeln auslösen.
10. Normale oder Back-up Sirene mit einem realen Alarm prüfen.
11. Akustische Alarmdauer von ca. `30 Sekunden` und optische Alarmdauer von ca. `180 Sekunden` prüfen.
12. Mit der Entriegeln-Taste entschärfen beziehungsweise den Alarm unterbrechen.

## Bedienung und Rückmeldungen

- Verriegeln schärft das System; die Zentrale bestätigt mit Piepton und Blinken, die Status-LED blinkt.
- Entriegeln entschärft das System beziehungsweise unterbricht einen Alarm.
- Eine offene Fahrerhaustür verhindert fahrzeugseitig das Verriegeln und damit die Aktivierung der Alarmanlage.
- Mehrere kurze Pieptöne beim Scharfschalten bedeuten, dass ein angelernter Funk-Magnetkontakt offen ist; die Anlage schaltet laut Quelle dennoch scharf.
- Nach dem Einbau können mehrere Verriegelungs- und Entriegelungsvorgänge zur CAN-Synchronisierung erforderlich sein.

## Diagnose

| Fehlerbild | Prüfung / Maßnahme |
|---|---|
| Einschalt-Piepton vorhanden, aber keine Reaktion auf Funkschlüssel | CAN-Leitungen weiß/orange und violett/orange prüfen; Diagnosemodus aktivieren |
| grüne linke LED flackert im Diagnosemodus | CAN-Datenverkehr ist vorhanden |
| grüne linke LED bleibt bei Bedienung dunkel | Bus inaktiv oder CAN-Verbindung fehlerhaft |
| weder Reaktion noch Einschalt-Piepton | Versorgung, Crimpung, Zündungszustand und Sicherung prüfen |
| Kontaktwarnung trotz geschlossener Öffnungen | Abstand zwischen Sender und Magnet prüfen; alle Kontakte mehrfach öffnen und schließen |
| Kontaktwarnung bleibt bestehen | bei geschlossenen Kontakten Versorgung trennen und wiederherstellen |
| Zubehör lässt sich anlernen, löst aber keinen Alarm aus | Platine prüfen; Sende-LED muss vom Magneten wegweisen |

Für den CAN-Diagnosemodus den Taster auf der Platine kurz drücken. Bedienung des Funkschlüssels oder anderer CAN-Datenverkehr muss die grüne linke LED flackern lassen. Weitere systematische Prüfungen: [[Störungsbeseitigung — Sichere Diagnose häufiger Probleme]].

## Dokumentation

1. Fahrzeugmodell, Modelljahr und VIN erfassen.
2. WiPro-Artikelnummer, Seriennummer und Softwarestand notieren.
3. DIP-Stellung `SW1 + SW4 + SW6` dokumentieren.
4. Leitungsfarben und tatsächliche Abgriffstellen fotografieren.
5. Sicherungswert, Massepunkt, Kabeldurchführung und Sirenenvariante festhalten.
6. Alle überwachten Öffnungen und Funkkontakte einzeln protokollieren.
7. Alarmzeiten, Diagnoseanzeige und Kundenübergabe dokumentieren.

## Quellen

- `H:/Thitronik WIKI (ml)/wiki/de/wipro_iii_vw_t5_facelift_2009_.pdf` — fahrzeugspezifisches Einbauhandbuch, Stand `12/20`; alle neun Seiten vollständig textlich und visuell geprüft.
- `H:/Thitronik WIKI (ml)/wiki/de/wipro_iii-installationsanleitung_1.8.pdf` — allgemeines Installationshandbuch, Revision `1.8`; vollständiger deutscher Abschnitt bereits textlich und visuell geprüft.
- Die bisherige Matrixangabe `0823-001 / 2.1` wird nicht als Mindeststand fortgeführt, weil sie in diesen Primärquellen nicht genannt wird.

## Querverweise

- [[WiPro III — Funk-Alarmsystem für Freizeitfahrzeuge]]
- [[Fahrzeugkompatibilität — Übersichtsmatrix & DIP-Grundlagen]]
- [[Anlernvorgang — Funk-Zubehör an WiPro III anlernen]]
- [[Funk-Magnetkontakt 868 — Montage und Betrieb]]
- [[Funk-Kabelschleife 868 — Außensicherung für mobile Güter]]
- [[Sirenen und Hupen — Akustische Alarmmittel]]
- [[Störungsbeseitigung — Sichere Diagnose häufiger Probleme]]
- [[VW T5 (2006–2009)]]
- [[VW T6 (2015–2019)]]
