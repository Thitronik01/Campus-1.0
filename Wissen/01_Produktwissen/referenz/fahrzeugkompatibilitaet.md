---
title: Fahrzeugkompatibilität — Übersichtsmatrix & DIP-Grundlagen
sources:
  - >-
    D:/Anleitungen/Anleitungen/01_Quellanleitungen/WiPro
    III/wipro_iii-installationsanleitung_1.8.pdf
  - >-
    D:/Anleitungen/Anleitungen/06_Max und KI Handover/Wipro III safe.lock/02
    Bedienungsanleitung/bedienungsanleitung_zehn_sprachen/2025-05-05_Bedienungsanleitung_WiPro_III_WiPro_III_safe-lock_010_01_DE_original.docx
  - 'https://www.thitronik.de/support/faq-produkte/produkt/wipro-iii/'
  - 'https://www.thitronik.de/support/faq-produkte/produkt/wipro-iii-safelock/'
  - fahrzeuge/*.md
updated: '2026-07-22'
confidence: high
lang: de
dealerStatus: approved
---

# Fahrzeugkompatibilität — Übersichtsmatrix & DIP-Grundlagen

Diese Seite dient als zentrale Orientierung für die Fahrzeugauswahl und die DIP-Grundlagen der WiPro III. Verbindlich für Einbau, Leitungsbelegung und Codierung ist immer die **aktuelle fahrzeug- und ausführungsspezifische Einbauanleitung**. Seriennummer, Softwarestand, Modelljahr und Ausstattung müssen zusammenpassen.

> **Sicherheit:** Einbau und Anschluss gehören in die Hände einer qualifizierten Fachkraft. DIP-Einstellungen niemals aus einer ähnlichen Fahrzeugvariante ableiten. Vor Beginn Fahrzeug, Baujahr, Systemausführung, Seriennummer und Softwarestand eindeutig bestimmen.

## DIP-Schalter — Grundlagen

Die WiPro-III-Zentrale wird über den achtfachen DIP-Schalter auf das Fahrzeug und einzelne Funktionen eingestellt.

> **Wichtig:** DIP-Einstellungen nur im spannungsfreien Zustand ändern. Dabei dürfen weder der 20-polige Stecker noch der Pro-Finder-Stecker eingesteckt sein.

| Schalter | Dokumentierte Bedeutung |
|---|---|
| SW1–SW4 | Grundprofil des Fahrzeugs. Die Kombination ergibt sich aus der Fahrzeugtabelle beziehungsweise der aktuellen Detailanleitung. |
| SW5 | Ab Seriennummer `0823-014` beziehungsweise Software `5.8`: Bei ON lässt sich die WiPro III nicht mehr über den Original-Funkschlüssel steuern; die Auswertung der Fahrzeugtüren bleibt aktiv. SW5 ist **kein allgemeiner safe.lock-Schalter**. |
| SW6 | Zusätzlicher fahrzeugspezifischer Profilschalter, den zahlreiche Detailanleitungen ausdrücklich vorgeben. Die allgemeine Installationsanleitung weist SW6 keine universelle Sonderfunktion zu. |
| SW7 | ON deaktiviert den Störsenderalarm (Anti-Jamming). |
| SW8 | ON reduziert die Lautstärke der internen Sirene. |

Die Spalte **„DIP → ON“** nennt die von der jeweiligen Einbauanleitung vorgegebenen Profilschalter. SW7 und SW8 sind dort nicht aufgeführt, weil sie optionale Funktionen betreffen. Alle nicht genannten Schalter bleiben OFF, sofern die konkrete Anleitung nichts anderes verlangt.

## Fahrzeugübersicht nach Hersteller

### Fiat / Peugeot / Citroën / Opel / Toyota

| Fahrzeug | Baujahr | DIP → ON | Mindeststand / Set | Detailseite |
|---|---:|---|---|---|
| Fiat Ducato 244 / Peugeot Boxer / Citroën Jumper | bis 2006 | SW6 | `0823-001` / `2.1` | [[Fiat Ducato 244 / Peugeot Boxer / Citroën Jumper (bis 2006)|Fiat Ducato 244]] |
| Fiat Ducato X250 / Peugeot Boxer / Citroën Jumper, Euro 4 | 2006–2011 | SW2 + SW6 | `0823-001` / `2.1` | [[Fiat Ducato X250 / Peugeot Boxer / Citroën Jumper (Euro 4, 2006–2011)|Fiat Ducato X250]] |
| Fiat Ducato / Citroën Jumper / Peugeot Boxer / Toyota Proace Max / Opel Movano | 2012–2021 | ausführungsspezifisch | ab Set `1050-001`; Detailseite beachten | [[Fiat Ducato / Citroën Jumper / Peugeot Boxer / Toyota Proace Max / Opel Movano (2012–2021)|Fiat Ducato 2012–2021]] |
| Fiat Ducato 8/9 / Citroën Jumper / Peugeot Boxer / Opel Movano | 2022–2024 | fahrzeugabhängig; sechs Kombinationen nach Anleitung prüfen | `1050-016` / `7.1s`; großes Infotainment: `1050-042` / `7.5.2s` | [[Fiat Ducato 8/9 / Citroën Jumper / Peugeot Boxer / Opel Movano (2022–2024)|Fiat Ducato 2022–2024]] |
| Fiat Ducato Facelift / Citroën Jumper / Peugeot Boxer / Opel Movano | ab 2024 | variantenabhängig | `1050-046` / `7.5.3s` | [[Fiat Ducato Facelift / Citroën Jumper / Peugeot Boxer / Opel Movano (2024+)|Fiat Ducato ab 2024]] |
| Fiat Talento / Renault Trafic III / Opel Vivaro B / Nissan NV300 | 2014–2021 | SW3 + SW6 | `0823-014` / `5.9` | [[Fiat Talento / Renault Trafic III / Opel Vivaro B / Nissan NV300 (2014–2021)|Fiat Talento]] |

### Iveco

| Fahrzeug | Baujahr | DIP → ON | Mindeststand / Set | Detailseite |
|---|---:|---|---|---|
| Iveco Daily Euro 4 | 2006–2011 | SW4 + SW6 | `0823-001` / `2.1` | [[Iveco Daily Euro 4 (2006–2011)|Iveco Daily Euro 4]] |
| Iveco Daily Euro 5 und neuer | 2011–2024 | ohne Umrüstplatine: SW2 + SW6; mit Umrüstplatine: SW2 + SW5 + SW6 | `0823-001` / `2.1`; genaue Ausführung prüfen | [[Iveco Daily Euro 5 und neuer (2011–2024)|Iveco Daily Euro 5 und neuer]] |
| Iveco Daily | ab Modelljahr 2025/2026 | — | derzeit kein freigegebener Einbau wegen BCM-Änderungen | — |

### Mercedes-Benz

| Fahrzeug | Baujahr | DIP → ON | Mindeststand / Set | Detailseite |
|---|---:|---|---|---|
| Mercedes Sprinter T1N | 2000–2006 | alle aus | `0823-001` / `2.1` | [[Mercedes Sprinter T1N (2000–2006)|Mercedes Sprinter T1N]] |
| Mercedes Sprinter NCV3 / VW Crafter, BR906 | Sprinter 2006–2018; Crafter I 2006–2017 | SW1 + SW6 | `0823-001` / `2.1` | [[Mercedes Sprinter NCV3 / VW Crafter (BR906, 2006–2018)|Mercedes Sprinter NCV3 / VW Crafter]] |
| Mercedes Sprinter VS30, BR907/910 | ab 2018 | Standard: SW4 + SW6; Set 5458: alle OFF | Standard: `0823-019` / `6.8`; vier Schlüssel: `0823-034`; safe.lock: `5458-001` / `1.0.0sx` | [[Mercedes Sprinter VS30 (BR907/910, ab 2018)|Mercedes Sprinter VS30]] |
| Mercedes-Benz Vito / V-Klasse W447 | 2014–06/2023 | SW1 + SW3 + SW4 + SW6 | `0823-014` / `6.2` | [[Mercedes Benz Vito W447 (2014–06/2023)|Mercedes-Benz Vito W447]] |

### Renault / Opel / Nissan

| Fahrzeug | Baujahr | DIP → ON | Mindeststand / Set | Detailseite |
|---|---:|---|---|---|
| Renault Master II / Opel Movano A / Nissan Interstar | 1998–2010 | SW1 + SW2 + SW3 + SW6 | `0823-001` / `2.1` | [[Renault Master II / Opel Movano A / Nissan Interstar (1998–2010)|Renault Master II]] |
| Renault Master III / Opel Movano B / Nissan NV400 | ab 2011 | SW2 + SW3 + SW6 | Set `100754`; Mindeststand in Fahrzeugquelle nicht genannt | [[Renault Master III / Opel Movano B / Nissan NV400 (ab 2011)|Renault Master III]] |
| Renault Master safe.lock | 2019–2024 | setabhängig | Set `105832`; `5832-001` / `1.0.0sr` | [[Renault Master (2019–2024) — safe.lock|Renault Master safe.lock]] |
| Renault Trafic III / Opel Vivaro B / Nissan NV300 / Fiat Talento | 2014–2021 | SW3 + SW6 | `0823-014` / `5.9` | [[Renault Trafic III / Opel Vivaro B / Nissan NV300 / Fiat Talento (2014–2021)|Renault Trafic III 2014–2021]] |
| Renault Trafic III / Nissan Primastar | ab 2022 | SW1 + SW2 + SW4 + SW5 + SW6 | Software mindestens `6.10.0`; keine Mindestseriennummer genannt | [[Renault Trafic III / Nissan Primastar (ab 2022)|Renault Trafic III ab 2022]] |

### Ford

| Fahrzeug | Baujahr | DIP → ON | Mindeststand / Set | Detailseite |
|---|---:|---|---|---|
| Ford Transit 6. Generation | 2006–2013 | SW1 + SW2 + SW6 | `0823-001` / `2.1` | [[Ford Transit 6. Generation (2006–2013)|Ford Transit 6G]] |
| Ford Transit 7. Generation früh | 2014–2015 | SW1 + SW2 + SW3 + SW4 + SW6 | `0823-011` / `4.7` | [[Ford Transit 7. Generation früh (2014–2015)|Ford Transit 7G 2014–2015]] |
| Ford Transit 7. Generation | 2016–2019 | **SW2 + SW4 + SW6** | `0823-013` / `5.6` | [[Ford Transit 7. Generation (2016–2019)|Ford Transit 7G 2016–2019]] |
| Ford Transit 7. Generation Facelift | 2019–07/2024 | fahrzeugspezifisch; Detailseite beachten | Standard: `0823-016` / `6.1`; safe.lock: `5298-001` / `7.4.0s` | [[Ford Transit 7. Generation Facelift (2019–07/2024)|Ford Transit Facelift]] |
| Ford Transit / Tourneo Custom / Transit Custom | ab 2024 beziehungsweise 08/2023 | alle OFF | `5298-005` / `1.0.1sf` | [[Ford Transit / Tourneo Custom / Transit Custom (2024+)|Ford Transit ab 2024]] |

### Volkswagen / MAN

| Fahrzeug | Baujahr | DIP → ON | Mindeststand / Set | Detailseite |
|---|---:|---|---|---|
| VW T5 | 2006–2009 | SW1 + SW3 + SW6 | keine Mindest-SN oder Mindestsoftware in den Primärquellen genannt | [[VW T5 (2006–2009)|VW T5]] |
| VW T5 Facelift | ab Modelljahr 2010 | SW1 + SW4 + SW6 | keine Mindest-SN oder Mindestsoftware in den Primärquellen genannt | [[VW T5 Facelift (ab MJ 2010)|VW T5 Facelift]] |
| VW T6 | 2015–2019 | **SW3 + SW4 + SW6** | mindestens `0823-012`; keine Mindestsoftware in den Primärquellen genannt | [[VW T6 (2015–2019)|VW T6]] |
| VW T6.1 | ab 2019 | **SW2 + SW3 + SW4 + SW6** | mindestens `0823-019`; keine fahrzeugspezifische Mindestsoftware in der Primärquelle genannt | [[VW T6.1 (ab 2019)|VW T6.1]] |
| VW Crafter / MAN TGE ohne Startknopf | 2017–2024 | Standard: SW2 + SW3 + SW4 + SW6 | mindestens `V6.8`; keine Mindest-SN genannt; safe.lock nur nach aktueller Set-Anleitung | [[VW Crafter / MAN TGE (2017–2024, ohne Startknopf)|VW Crafter / MAN TGE 2017–2024]] |
| VW Crafter / MAN TGE mit Startknopf | ab 2025 | nicht öffentlich belegt | safe.lock-Set `105458`; kein aktuell öffentlich belegter Mindeststand; ZV-Ansteuerung derzeit nicht möglich | [[VW Crafter / MAN TGE (2025+, mit Startknopf)|VW Crafter / MAN TGE ab 2025]] |

### Aufbau- und Universalvarianten

| Fall | Kernaussage | Detailseite |
|---|---|---|
| Adria Coral / Matrix ab Modelljahr 2021 | Aufbau-Türkontakt kann nach etwa 15 Minuten einen Fehlalarm auslösen; separate Funkabsicherung nach Detailanleitung | [[Adria Coral / Matrix (ab Modelljahr 2021) — Wohnmobil-Aufbauhinweis|Adria Coral / Matrix]] |
| Ältere oder nicht gelistete Fahrzeuge | Universalanschluss nur nach Prüfung; SW1–SW4 bleiben gemäß allgemeiner Anleitung OFF | [[Universalanschluss (ältere / nicht gelistete Fahrzeuge)|Universalanschluss]] |

## CAN-Bus — Anschluss und Diagnose

Ob serienmäßige Türen über den CAN-Bus ausgewertet werden, ergibt sich aus der fahrzeugspezifischen Anleitung. Eine Anzeige im Kombiinstrument ist ein nützlicher Hinweis, ersetzt aber nicht die Prüfung der Anleitung. Nicht über CAN erfasste Öffnungen benötigen einen separaten Eingang oder Funk-Magnetkontakt.

| WiPro-III-Leitung | Funktion | Beispiel VW T5/T6 |
|---|---|---|
| violett/orange | CAN-Low | orange/braun |
| weiß/orange | CAN-High | orange/grün |

Die Fahrzeugfarben sind nur Beispiele. Maßgeblich sind Messung und aktuelle Anschlussunterlage.

### CAN-Diagnose

1. Taster an der Zentrale kurz drücken.
2. Prüfen, ob die Status-LED am Kabelbaum blinkt.
3. Original-Funkschlüssel oder Warnblinker betätigen.
4. Bei empfangenen CAN-Daten muss die Status-LED flackern.

Bleibt die Reaktion aus, CAN-Anschluss und Leitungszuordnung prüfen; CAN-High und CAN-Low können vertauscht oder nicht korrekt verbunden sein. Die allgemeine Anleitung legt für diese Diagnose keine bestimmte LED-Farbe fest.

## safe.lock — Konfiguration und Nachrüstung

### Keine allgemeine safe.lock-DIP-Formel

SW5 darf nicht pauschal zu den Fahrzeugschaltern addiert werden. Die Stellung hängt von Fahrzeug, WiPro-Ausführung, Seriennummer, Software und verwendetem Set ab. Beispiele für ausdrücklich dokumentierte Sonderkonfigurationen sind:

| Ausführung | Dokumentierte Vorgabe |
|---|---|
| Iveco Daily Euro 5 und neuer | ohne Umrüstplatine SW2 + SW6; mit Umrüstplatine SW2 + SW5 + SW6 |
| Ford Transit Facelift | fahrzeugspezifisches Set ab `5298-001` / `7.4.0s`; Detailanleitung verwenden |
| Sprinter VS30 sowie Crafter / MAN TGE | Set 5458 mit eigener DIP-Vorgabe; Detailanleitung verwenden |
| Renault Master 2019–2024 | Set `105832`, Zentrale ab `5832-001` / `1.0.0sr`; Originalschlüssel steuert nur die Fahrzeugschlösser; für gleichzeitiges Verriegeln/Schärfen und Entriegeln/Entschärfen Funk-Handsender oder anderes kompatibles THITRONIK-Zubehör verwenden |

> **Merksatz:** Die Bezeichnung „safe.lock“ allein bestimmt keine Schalterstellung. Auch eine Umrüstplatine Art. `101052` rechtfertigt keine abgeleitete Standardkombination.

### Nachrüstung einer bestehenden WiPro III

Für die klassische Nachrüstung mit fahrzeugspezifischer Freigabe werden drei Leitungen am 20-poligen Steckverbinder ergänzt:

1. Pin 20: blau — Zentralverriegelung auf.
2. Pin 19: blau/schwarz — Zentralverriegelung zu.
3. Pin 16: weiß/schwarz — Sirenenausgang; bei bereits belegtem Pin parallel abgreifen.
4. Leitungen nach der fahrzeugspezifischen Unterlage anschließen und geeignete gelgefüllte Verbinder verwenden.
5. Nach dem Upgrade alle Funk-Zubehörteile neu anlernen, weil der Speicher gelöscht wird.
6. Zentralverriegelung, Scharf-/Unscharfschaltung und sämtliche Alarmwege vollständig prüfen.

## Wichtige Einschränkungen und Vorabtests

| Thema | Fahrzeuge / Ausführungen | Konsequenz |
|---|---|---|
| Fahrzeughupe ohne Zündung nicht verfügbar | unter anderem Sprinter, VW T5 Facelift/T6/T6.1, Crafter/MAN TGE und Iveco Daily ab Modelljahr 2019 | Je nach Anleitung Back-up-Sirene Art. `100089` oder Zusatzhupe Art. `105339` verwenden. |
| Vier getrennt angesteuerte Blinker | Sprinter NCV3 / VW Crafter bis 2017 | Diodenverteiler Art. `100455` erforderlich. |
| Replay-Angriffe auf den Originalschlüssel | bestimmte Ducato-/Boxer-/Jumper- und Iveco-Ausführungen | Fahrzeug- und systemabhängig [[safe.lock Umrüstplatine — Schlüsselsicherheit für Ducato/Boxer/Jumper|safe.lock-Umrüstung]] beziehungsweise aktuelle Set-Lösung prüfen. |
| Deadlock | bestimmte Ford-Transit-7G-Ausführungen | Original-Fernbedienung kann nicht auswertbar sein; [[Funk-Handsender 868 — Fernbedienung für WiPro III|Funk-Handsender 868]] nach Detailanleitung verwenden. |
| Startknopf | VW Crafter / MAN TGE | safe.lock kann die Zentralverriegelung derzeit nicht steuern. |
| Schaltsperre | Ford Transit Facelift 2019–2024 | Option im Fahrzeugcomputer muss vorhanden, anwählbar und deaktiviert sein. |
| ILS-/LED-Ausstattung | Sprinter VS30 / Vito W447 | Widerstand beziehungsweise Blinkerausgang nach Detailanleitung ausführen; beim Vito können die vorderen Blinker nicht ansteuerbar sein. |
| BCM-Änderung | Iveco Daily ab Modelljahr 2025/2026 | Stand Januar 2026 kein freigegebener Einbau. |

## Alarmdauer

| Alarmweg | Dauer laut detailliertem Alarmkapitel der aktuellen Bedienungsanleitung |
|---|---:|
| Sirene oder Fahrzeughupe | etwa 30 Sekunden |
| Warnblinker | etwa 180 Sekunden |
| Status-LED bei Einbruch- oder Gasalarm | etwa 180 Sekunden |

> **Quellenhinweis:** Die aktuelle Bedienungsanleitung ist bei der optischen Alarmdauer nicht widerspruchsfrei: Die Funktionsübersicht nennt 120 Sekunden, das ausführliche Alarmkapitel 180 Sekunden. Diese Seite folgt dem detaillierten Alarmkapitel. Wenn die exakte Dauer für Abnahme oder Diagnose relevant ist, gilt die Dokumentation des konkret verbauten Geräts.

## Abschlussprüfung nach dem Einbau

1. DIP-Stellung im spannungsfreien Zustand kontrollieren.
2. Seriennummer, Softwarestand und Set-Version dokumentieren.
3. CAN-Empfang prüfen.
4. Jede Fahrzeug- und Aufbautür einzeln testen.
5. Scharf- und Unscharfschaltung mit allen vorgesehenen Bedienelementen prüfen.
6. Zentralverriegelung einschließlich Sleep Mode testen, sofern safe.lock verwendet wird.
7. Sirene oder Hupe sowie alle Blinker prüfen.
8. Zubehör erneut anlernen und einzeln auslösen, wenn ein Upgrade den Speicher gelöscht hat.

## Aktuelle Unterlagen und Support

- [WiPro-III-FAQ](https://www.thitronik.de/support/faq-produkte/produkt/wipro-iii/)
- [WiPro-III-safe.lock-FAQ](https://www.thitronik.de/support/faq-produkte/produkt/wipro-iii-safelock/)
- [Downloads und Anleitungen](https://www.thitronik.de/support/downloads/bereich/alarmanlagen/anleitungen/)
- THITRONIK Support: +49 (0)4351 76744-112

## Querverweise

- [[WiPro III — Funk-Alarmsystem für Freizeitfahrzeuge|WiPro III]]
- [[safe.lock Umrüstplatine — Schlüsselsicherheit für Ducato/Boxer/Jumper|safe.lock Umrüstplatine]]
- [[Sirenen und Hupen — Akustische Alarmmittel|Sirenen und Hupen]]
- [[Anlernvorgang — Funk-Zubehör an WiPro III anlernen|Anlernvorgang]]
- [[Systemüberblick — THITRONIK-Produktwelt|Systemüberblick]]
- [[Quellen-Matrix]]
- [[Störungsbeseitigung — Sichere Diagnose häufiger Probleme|Störungsbeseitigung]]
