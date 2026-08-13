---
title: Mercedes Sprinter T1N (2000–2006)
sources:
  - sources/wipro_iii_mercedes_sprinter_t1n.pdf
  - sources/wipro_iii-installationsanleitung_1.8.pdf
updated: '2026-07-20'
confidence: high
lang: de
dealerStatus: approved
---

# Mercedes Sprinter T1N (2000–2006)

Dieser Artikel beschreibt den Universalanschluss einer WiPro III im Mercedes Sprinter T1N der Modelljahre 2000 bis 2006. Die fahrzeugspezifische Einbauanleitung, Stand `12/20`, dokumentiert das DIP-Grundprofil, den Abgriff der Innenbeleuchtung und beide Blinkerleitungen. Versorgung, Masse, Zündung, Sirene und allgemeine Prüfregeln werden durch das WiPro-III-Installationshandbuch `1.8` ergänzt.

> **Abgrenzung:** Der T1N wird ohne CAN-Anschluss eingebunden. Für Mercedes Sprinter NCV3/BR906 ab 2006 und VS30/BR907/910 ab 2018 gelten eigene Artikel, andere DIP-Profile und andere Anschlusspunkte. Entscheidend ist die tatsächlich vorhandene Fahrzeugelektronik, nicht allein das Erstzulassungsdatum.

## Geltungsbereich

| Merkmal | Vorgabe |
|---|---|
| Fahrzeug | Mercedes Sprinter T1N |
| dokumentierte Modelljahre | 2000–2006 |
| Anschlussart | Universalanschlussplan, ohne CAN-Bus |
| Fahrzeugprofil | `SW1–SW4 OFF`; fahrzeugspezifische Quelle: „alle Schalter aus“ |
| Türsignal | Innenbeleuchtung an sechspoliger Steckverbindung Richtung A-Säule, Fahrerseite |
| Blinker | zwei getrennte Fahrzeugleitungen |
| fahrzeugspezifische Quelle | Stand `12/20` |
| Kompatibilitätsbasis | `0823-001 / 2.1`; tatsächliche Geräte- und Fahrzeugausführung prüfen |

Siehe auch [[Fahrzeugkompatibilität — Übersichtsmatrix & DIP-Grundlagen|Fahrzeugkompatibilität]].

## Quellenrang und bereinigte Altangaben

| Aussage | Quellenentscheidung |
|---|---|
| DIP-Profil | Die fahrzeugspezifische Anleitung schreibt „alle Schalter aus“ vor. Das alte Wiki-Profil `SW1` war falsch und gehört laut allgemeiner Tabelle zum Sprinter ab 2006. |
| Modelljahre | Die Fahrzeug-PDF grenzt den beschriebenen T1N ausdrücklich auf `2000–2006` ein; die alte Angabe „bis 2006“ war zu ungenau. |
| CAN-Bus | Die Installation erfolgt nach Universalanschlussplan ohne CAN. Pins 17 und 18 werden für diesen Einbau nicht verwendet. |
| Türüberwachung | Die Fahrzeug-PDF nennt ausschließlich den Abgriff der Innenbeleuchtung an einer sechspoligen Steckverbindung; ein separater fahrzeugseitiger Türkontakt ist dort nicht dokumentiert. |
| akustischer Alarm | Das allgemeine Handbuch empfiehlt bei Sprintern eine Sirene im Motorraum oder eine Back-up Sirene, weil die Fahrzeughupe bei manchen Ausführungen nur mit Zündung funktioniert. „Zwingend“ ist nicht belegt. |
| Back-up Sirene Art. `100089` | im Produktartikel dokumentiert, aber in der T1N-Fahrzeug-PDF nicht als Pflicht oder konkrete Artikelnummer genannt |

Bei Widersprüchen hat die neuere fahrzeugspezifische Anleitung Vorrang. Nicht dokumentierte Stecker, Leitungsfarben oder Fahrzeugfunktionen dürfen nicht aus späteren Sprinter-Generationen übernommen werden.

## Sicherheit und Fahrzeugprüfung

- Arbeiten an Fahrzeugelektrik und -elektronik dürfen nur qualifizierte Fachwerkstätten ausführen.
- Vor elektrischen Arbeiten Batterie-Minus und vorhandene Zusatzbatterien nach Herstellervorgabe trennen; Radiocode und flüchtige Fahrzeugdaten berücksichtigen.
- WiPro vor dem Öffnen und vor jeder DIP-Änderung vollständig spannungsfrei machen. Auch der 20-polige Stecker und ein Pro-finder-Stecker dürfen dabei nicht verbunden sein.
- Unbenutzte Ein- und Ausgänge einzeln gegen Kurzschluss isolieren.
- Kabel gegen Scheuern, Hitze und mechanische Belastung sichern; Lenkung, Pedale, Airbag-Bauteile und andere Fahrzeugfunktionen dürfen nicht behindert werden.
- Vor jedem Abgriff Stecker, Pin, Leitungsfarbe, Spannung und Schaltverhalten am tatsächlichen Fahrzeug messen oder eindeutig identifizieren.
- Weichen Fahrzeug, Steckverbinder oder Leitungsfarben von der Anleitung ab, Arbeit stoppen und Hersteller oder THITRONIK Support kontaktieren.

Vor Beginn prüfen und dokumentieren:

1. Entspricht das Fahrzeug dem T1N und dem dokumentierten Zeitraum `2000–2006`?
2. Funktionieren Innenbeleuchtung, beide Blinkerzweige und Zündung fehlerfrei?
3. Welche Fahrerhaus-, Wohnraum- und Klappenkontakte schalten die Innenbeleuchtung tatsächlich?
4. Bestehen Warnlampen, Beleuchtungsfehler oder andere elektrische Fehler?
5. Welche zusätzlichen Öffnungen müssen mit Funk-Magnetkontakten abgesichert werden?

## Fahrzeugprofil einstellen

1. WiPro vollständig von der Versorgung trennen.
2. Sicherstellen, dass weder der 20-polige Anschlussstecker noch ein Pro-finder verbunden ist.
3. Gehäusedeckel der Zentrale vorsichtig öffnen.
4. Für den Universalanschluss `SW1`, `SW2`, `SW3` und `SW4` auf `OFF` stellen.
5. Weitere DIP-Schalter nur für eine ausdrücklich gewünschte und für Seriennummer sowie Softwarestand freigegebene Sonderfunktion verändern.
6. Tatsächliche Schalterstellung dokumentieren und Gehäuse wieder schließen.

> **Verwechslungsgefahr:** `SW1 ON` ist das Grundprofil für Mercedes Sprinter ab 2006 in der älteren allgemeinen Tabelle. Es gilt nicht für den hier beschriebenen T1N.

## Versorgung, Masse und Zündung vorbereiten

Die fahrzeugspezifische T1N-PDF nennt hierfür keine Fahrzeugstecker oder Leitungsfarben. Deshalb müssen geeignete Anschlusspunkte nach Fahrzeugunterlagen bestimmt und elektrisch geprüft werden.

| Funktion | WiPro-Leitung / Pin | Vorgabe aus dem Universalanschlussplan |
|---|---|---|
| Masse / Klemme 31 | schwarz, Pin 1 | an einen zuverlässigen Fahrzeugmassepunkt anschließen |
| Zündung / Klemme 15 | gelb, Pin 7 | sichere Zündungsleitung verwenden; kein fahrzeugspezifischer T1N-Abgriff dokumentiert |
| Versorgung / Klemme 30 | rot, Pin 11 | `+12/24 V` über mitgelieferte `10-A`-Sicherung |

1. Geeignete Anschlusspunkte anhand der Fahrzeugunterlagen auswählen.
2. Dauerplus, Masse und Zündung vor dem Anschluss messen.
3. Sicherungshalter in der Versorgungsleitung zugänglich montieren.
4. Verbindungen fachgerecht herstellen, mechanisch entlasten und isolieren.
5. Noch keine Versorgung an die WiPro anlegen, bevor alle weiteren Anschlüsse geprüft sind.

## Innenbeleuchtung anschließen

Die sechspolige Steckverbindung in Richtung A-Säule auf der Fahrerseite aufsuchen. Nicht allein nach der Farbe arbeiten: Steckverbinder, WiPro-Pin, Fahrzeugleitung und gemessenes Schaltverhalten müssen gemeinsam passen.

| WiPro-Leitung / Pin | Mercedes-Leitung | Funktion |
|---|---|---|
| blau, Pin 20 | rot/gelb | Dauerplusleitung der Innenbeleuchtung |
| blau/schwarz, Pin 19 | braun/weiß | geschaltete Masse der Innenbeleuchtung |

1. Sechspoligen Steckverbinder eindeutig identifizieren.
2. An `rot/gelb` Dauerplus der Innenbeleuchtung verifizieren.
3. An `braun/weiß` prüfen, dass beim Öffnen einer überwachten Tür Masse geschaltet wird.
4. Blau, Pin 20, mit `rot/gelb` verbinden.
5. Blau/schwarz, Pin 19, mit `braun/weiß` verbinden.
6. Jede relevante Tür einzeln öffnen und prüfen, ob sie das Signal auslöst.

Aufbauöffnungen, die nicht auf diese Innenbeleuchtung wirken, benötigen einen eigenen Türkontakt oder einen angelernten Funk-Magnetkontakt. Siehe [[Funk-Magnetkontakt 868 — Montage und Betrieb|Funk-Magnetkontakt 868]].

## Blinkerleitungen anschließen

| WiPro-Leitung / Pin | Mercedes-Leitung | Funktion |
|---|---|---|
| grau, Pin 12 | schwarz/grün | Blinkerzweig |
| grau, Pin 14 | schwarz/weiß | Blinkerzweig |

1. Beide Fahrzeugleitungen vor dem Trennen oder Verbinden eindeutig identifizieren.
2. Mit Warnblinker oder Fahrtrichtungsanzeiger prüfen, welcher Zweig jeweils geschaltet wird.
3. Grau, Pin 12, mit `schwarz/grün` verbinden.
4. Grau, Pin 14, mit `schwarz/weiß` verbinden.
5. Verbindungen isolieren und gegen Zug sowie Scheuern sichern.
6. Nach Inbetriebnahme beide Fahrzeugseiten getrennt und im Alarmfall gemeinsam prüfen.

Die Fahrzeug-PDF dokumentiert für den T1N zwei direkte Blinkeranschlüsse; ein Diodenverteiler ist dort nicht gefordert.

## Sirene oder Back-up Sirene vorsehen

Bei manchen Sprintern funktioniert die Fahrzeughupe nur bei eingeschalteter Zündung. Die WiPro kann sie dann bei abgestelltem Fahrzeug nicht als Alarmgeber verwenden. Das allgemeine Installationshandbuch empfiehlt deshalb eine Sirene im Motorraum oder eine Back-up Sirene.

| Ausführung | WiPro-Anschluss | Hinweis |
|---|---|---|
| normale Sirene | weiß, Pin 15 | Sirene `+12 V` |
| normale Sirene | weiß/schwarz, Pin 16 | Sirenenmasse |
| Back-up Sirene | nach eigener Produktanleitung | Versorgung, Trigger und Schlüsselschalterstellung produktbezogen prüfen |

1. Vor Einbau prüfen, ob die Fahrzeughupe bei ausgeschalteter Zündung tatsächlich verfügbar ist.
2. Falls nicht, geeignete Sirene oder Back-up Sirene auswählen.
3. Alarmgeber im Motorraum geschützt vor Hitze, Wasser und beweglichen Teilen montieren.
4. Verdrahtung nach der jeweiligen Sirenenanleitung ausführen.
5. Nicht verwendete Leitungen einzeln isolieren.
6. Akustischen Alarmgeber nach Montage separat prüfen.

Die Back-up Sirene Art. `100089` ist eine mögliche 12-V-Ausführung, jedoch keine in der T1N-PDF festgelegte Pflichtkomponente. Auswahl und Anschluss: [[Sirenen und Hupen — Akustische Alarmmittel|Sirenen und Hupen]] und [[Artikelnummern-Register — Dokumentierte THITRONIK-Produkte und Zubehör|Artikelnummern-Register]].

## Zentrale, Status-LED und Funk-Zubehör montieren

Die Fahrzeug-PDF legt keinen Montageort der WiPro-Zentrale fest. Einen geschützten, trockenen und für Diagnose erreichbaren Ort wählen; Antenne nicht hinter abschirmendem Metall platzieren, nicht kürzen und nicht aufwickeln.

1. Montageort der Zentrale und Position der Status-LED festlegen.
2. Vor einer LED-Bohrung den Bereich dahinter kontrollieren und den Bohrdurchmesser an der tatsächlich mitgelieferten Status-LED beziehungsweise ihrer Montagevorgabe prüfen.
3. Funk-Zubehör mit Kennzeichnung `868` vor der endgültigen Montage anlernen.
4. Jeden Sender am geplanten Montageort auf zuverlässigen Empfang prüfen.
5. Zentrale und Leitungen so befestigen, dass nichts in den Pedalbereich oder an bewegliche Fahrzeugteile gelangen kann.
6. Funk-Magnetkontakte erst nach erfolgreichem Reichweiten- und Funktionstest endgültig befestigen.

Einzelheiten zum Anlernen: [[Anlernvorgang — Funk-Zubehör an WiPro III anlernen|Anlernvorgang]].

## Inbetriebnahme und Funktionstest

1. Alle Anschlüsse, Isolierungen und die `10-A`-Sicherung nochmals prüfen.
2. Bestätigen, dass `SW1–SW4` auf `OFF` stehen.
3. WiPro an die Versorgung anschließen und auf die Einschaltreaktion achten.
4. System schärfen und Aktivierungsquittung über Status-LED und Blinker prüfen.
5. Jede Fahrerhaustür einzeln öffnen und kontrollieren, ob das Innenbeleuchtungssignal einen Alarm auslöst.
6. Jede Aufbau- und Stauraumöffnung mit eigenem Kontakt einzeln testen.
7. Beide Blinkerzweige bei Schärfung und Alarm prüfen.
8. Sirene oder Back-up Sirene mit einem realen Testalarm prüfen.
9. System entschärfen und prüfen, ob der Alarm zuverlässig beendet wird.
10. Zündung einschalten und sicherstellen, dass die Anlage während der Fahrt keinen Alarm auslöst.
11. Abschließend kontrollieren, dass Innenbeleuchtung, Blinker und übrige Fahrzeugelektrik weiterhin fehlerfrei arbeiten.
12. DIP-Stellung, Anschlusspunkte, Sicherung und verbautes Zubehör in den Kundenunterlagen dokumentieren.

## Fehlerdiagnose

| Symptom | Prüfung und Maßnahme |
|---|---|
| WiPro reagiert nicht | Versorgung an Pin 11, Masse an Pin 1, `10-A`-Sicherung und Steckverbindungen direkt am Gerät prüfen. |
| Falsches oder instabiles Verhalten | `SW1–SW4` müssen für den T1N auf `OFF` stehen; Anlage vor einer Korrektur spannungsfrei machen. |
| Türöffnung löst keinen Alarm aus | sechspoligen Stecker, Pin 19/20, `rot/gelb`, `braun/weiß` und das geschaltete Massesignal der betroffenen Tür messen. |
| Nur einige Öffnungen werden erkannt | prüfen, welche Türen tatsächlich die Innenbeleuchtung schalten; übrige Öffnungen separat absichern. |
| Blinker fehlen auf einer Seite | Pin 12/14 sowie `schwarz/grün` und `schwarz/weiß` einzeln prüfen. |
| Fahrzeughupe bleibt bei Alarm stumm | prüfen, ob sie ohne Zündung funktioniert; andernfalls installierte Sirene oder Back-up Sirene verwenden und deren Verdrahtung prüfen. |
| Geschlossener Funk-Magnetkontakt wird als offen gemeldet | nach Spannungsunterbrechung alle Kontakte mehrfach öffnen und schließen. |
| Funkkontakt wird nicht empfangen | Anlernen, Magnetabstand, Antennenlage und Abschirmung durch Metall prüfen. |
| Fahrzeug oder Leitungen weichen von der Anleitung ab | Arbeit stoppen und fahrzeugspezifische Freigabe von Hersteller oder THITRONIK Support einholen. |

Weitere systematische Prüfungen: [[Störungsbeseitigung — Sichere Diagnose häufiger Probleme|Störungsbeseitigung]].

## Quellenentscheidung

- Die zweiseitige fahrzeugspezifische Einbauanleitung *WiPro III – Mercedes Sprinter T1N 2000–2006*, Stand `12/20`, wurde vollständig textlich und visuell geprüft.
- Sie belegt „alle Schalter aus“, den Innenbeleuchtungsabgriff an der sechspoligen Steckverbindung sowie beide Blinkerleitungen.
- Das allgemeine WiPro-III-Installationshandbuch `1.8` bestätigt Universalanschluss, Sicherheitsregeln, Pinbelegung, `10-A`-Absicherung, Sirenenempfehlung und Diagnosegrundlagen.
- Das alte `SW1`-Profil wurde entfernt, weil es laut allgemeiner Tabelle für Sprinter ab 2006 gilt.
- Die alte Pflichtformulierung zur externen Sirene wurde auf eine quellengetreue Empfehlung korrigiert.
- Nicht fahrzeugspezifisch belegte Anschlusspunkte für Masse, Zündung, Versorgung und Zentrale werden nicht erfunden; sie müssen am tatsächlichen Fahrzeug bestimmt werden.

## Querverweise

- [[WiPro III — Funk-Alarmsystem für Freizeitfahrzeuge|WiPro III]]
- [[Sirenen und Hupen — Akustische Alarmmittel|Sirenen und Hupen]]
- [[Fahrzeugkompatibilität — Übersichtsmatrix & DIP-Grundlagen|Fahrzeugkompatibilität]]
- [[Artikelnummern-Register — Dokumentierte THITRONIK-Produkte und Zubehör|Artikelnummern-Register]]
- [[Funk-Magnetkontakt 868 — Montage und Betrieb|Funk-Magnetkontakt 868]]
- [[Anlernvorgang — Funk-Zubehör an WiPro III anlernen|Anlernvorgang]]
- [[Störungsbeseitigung — Sichere Diagnose häufiger Probleme|Störungsbeseitigung]]
- [[Mercedes Sprinter NCV3 / VW Crafter (BR906, 2006–2018)|Mercedes Sprinter NCV3 / VW Crafter]]
- [[Mercedes Sprinter VS30 (BR907/910, ab 2018)|Mercedes Sprinter VS30]]
