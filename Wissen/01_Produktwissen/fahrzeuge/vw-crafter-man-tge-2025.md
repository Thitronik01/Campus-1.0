---
title: 'VW Crafter / MAN TGE (2025+, mit Startknopf)'
sources:
  - 'https://www.thitronik.de/produkte/produkt/wipro-iii-safelock/'
  - 'H:/Thitronik WIKI (ml)/wiki/de/wipro_iii_safe.lock.pdf'
updated: '2026-07-22'
confidence: medium
lang: de
dealerStatus: approved
---

# VW Crafter / MAN TGE (2025+, mit Startknopf)

Diese Seite gilt für VW Crafter II und MAN TGE ab Modelljahr 2025 mit Startknopf. Die aktuelle THITRONIK-Produktseite bestätigt das WiPro III safe.lock Set `105458` für VW Crafter II und MAN TGE, nennt für Fahrzeuge mit Startknopf jedoch eine wichtige Einschränkung: Die Zentralverriegelung kann derzeit nicht durch WiPro III safe.lock angesteuert werden.

> **Freigabegrenze:** Für diese Generation liegt lokal keine aktuelle fahrzeugspezifische Einbauanleitung vor. Deshalb enthält diese Seite bewusst keine freigegebenen DIP-, Pin- oder Fahrzeugleitungsangaben. Vor dem Einbau ist die aktuelle, fahrzeug- und gerätespezifische THITRONIK-Anleitung zu beschaffen.

## Überblick

| Parameter | Verifizierter Stand |
|---|---|
| Fahrzeug | VW Crafter II / MAN TGE mit Startknopf |
| Modelljahr | ab 2025 |
| Gerätesatz | WiPro III safe.lock, Art. `105458` |
| Zentralverriegelung über THITRONIK-Zubehör | derzeit nicht ansteuerbar |
| Alarmfunktion | separat in der Abnahme vollständig prüfen |
| Akustischer Alarm | Zusatzhupe wird vom Hersteller für diesen Fahrzeugtyp dringend empfohlen |
| DIP-Profil | in der aktuellen öffentlichen Quelle nicht fahrzeugspezifisch angegeben |
| Mindestseriennummer / Mindestsoftware | für diese 2025+-Variante nicht aktuell öffentlich belegt |
| Einbauverdrahtung | nur nach aktueller fahrzeugspezifischer Anleitung |

## Quellenlage und verworfene Altangaben

Die frühere Fassung verwies auf vier lokale DOCX-/CSV-Dateien. Keine dieser Dateien ist im Projekt oder im vorhandenen THITRONIK-Archiv auffindbar. Die Angaben dürfen daher nicht als freigegebene Einbaudaten weitergeführt werden.

| Altangabe | Redaktionsentscheidung |
|---|---|
| `SW3 ON` | nicht durch die aktuelle öffentliche Fahrzeugquelle belegt; nicht einstellen, bevor die passende Anleitung vorliegt |
| `5458-010 / 1.2.1sx` | fehlende Seriennummernliste; nicht als Mindeststand veröffentlichen |
| BCM Stecker A Pin 20/21 und Stecker C Pin 42 | fehlende fahrzeugspezifische Einbauanleitung; nicht anschließen |
| WiPro-Leitungsfarben für CAN, Zündung und Warnblinker | ohne zugehörigen Schaltplan nicht freigegeben |
| Zusatzhupe oder Back-up Sirene „zwingend“ | zu streng formuliert; die aktuelle FAQ empfiehlt für diesen Fahrzeugtyp dringend eine Zusatzhupe |

## Abgrenzung zur Generation 2017–2024

1. Diese Seite gilt ausschließlich für Fahrzeuge mit Startknopf ab 2025.
2. Für Fahrzeuge ohne Startknopf der Modelljahre 2017–2024 gilt [[VW Crafter / MAN TGE (2017–2024, ohne Startknopf)]].
3. Das dort dokumentierte Standard-WiPro-III-Profil `SW2 + SW3 + SW4 + SW6` darf nicht auf diese safe.lock-Variante übertragen werden.
4. Ebenso dürfen ältere safe.lock-Werte, ein Sleep-Mode-Test oder BCM-Pins nicht ohne aktuelle Freigabe übernommen werden.
5. Fahrzeug, Modelljahr, Startsystem, Gerätesatz, Seriennummer und Software müssen zusammen zur verwendeten Anleitung passen.

## Zentralverriegelung: bekannte Einschränkung

Bei Fahrzeugen mit Startknopf kann WiPro III safe.lock die Zentralverriegelung derzeit nicht ansteuern. Daraus folgen drei klare Regeln:

1. Mit THITRONIK-Zubehör darf für diese Variante kein Ver- oder Entriegeln des Fahrzeugs versprochen werden.
2. Scharf-/Unscharfschaltung und Alarmüberwachung sind bei der Abnahme getrennt von der Fahrzeugverriegelung zu prüfen.
3. Die Bezeichnung „safe.lock“ ist der Produktname des Sets; sie ist bei dieser Fahrzeugvariante kein Nachweis einer nutzbaren ZV-Ansteuerung.
4. Der Kunde muss vor Übergabe über die Einschränkung informiert werden.

## Vor dem Einbau prüfen

1. Fahrzeug als VW Crafter II oder MAN TGE identifizieren.
2. Modelljahr 2025 oder neuer anhand der Fahrzeugunterlagen bestätigen.
3. Startknopf als Abgrenzungsmerkmal dokumentieren.
4. Artikelnummer, Seriennummer und Softwarestand der gelieferten Zentrale notieren.
5. Prüfen, ob tatsächlich Set `105458` vorliegt.
6. Aktuelle fahrzeugspezifische THITRONIK-Anleitung für genau diese Variante beschaffen.
7. DIP-Stellung, Kabelsatz, Sicherung, Abgriffstellen und zulässige Alarmmittel mit dieser Anleitung abgleichen.
8. Bei fehlender oder widersprüchlicher Freigabe den Einbau stoppen und THITRONIK-Support beziehungsweise Fachhändler einbeziehen.

## DIP, Software und Verdrahtung

Für die Startknopf-Generation werden auf dieser Seite keine DIP-Stellung und kein Mindeststand freigegeben. Auch die im Altbestand genannten BCM-Anschlüsse sind nicht belastbar.

1. Keine DIP-Schalter aus der 2017–2024-Anleitung übernehmen.
2. `SW3` nicht allein aufgrund der alten Wiki-Fassung aktivieren.
3. `5458-010 / 1.2.1sx` nicht als Freigabeschwelle verwenden.
4. Fahrzeugleitungen nicht nur nach Farbe identifizieren; Stecker, Pin, Signal und Messwert müssen gemeinsam passen.
5. Versorgung, Masse, CAN, Zündung, Warnblinker, Hupe und Sirene ausschließlich nach der aktuellen Anleitung anschließen.
6. Nach Software- oder Fahrzeugupdate die Kompatibilität erneut prüfen.

Siehe auch [[Fahrzeugkompatibilität — Übersichtsmatrix & DIP-Grundlagen]] und [[Seriennummern und Softwarestände — Präfixe, Schwellen und Meilensteine]].

## Akustischer Alarm

Die THITRONIK-FAQ weist darauf hin, dass die Fahrzeughupe bei diesem Fahrzeugtyp nur bei eingeschalteter Zündung arbeitet und empfiehlt deshalb dringend eine Zusatzhupe.

1. Vor der Montage prüfen, ob die Fahrzeughupe bei ausgeschalteter Zündung tatsächlich verfügbar ist.
2. Akustisches Alarmmittel nach aktueller Anleitung auswählen und absichern.
3. Eine Zusatzhupe nicht mit einer Back-up Sirene gleichsetzen; Anschluss und Funktion unterscheiden sich.
4. Bei der Abnahme einen realen Alarm bei ausgeschalteter Zündung auslösen.
5. Alarmton außerhalb des Fahrzeugs kontrollieren und das Ergebnis dokumentieren.

Weitere Grundlagen stehen unter [[Sirenen und Hupen — Akustische Alarmmittel]].

## Sichere Einbaureihenfolge

1. Batterie- und Fahrzeugherstellervorgaben beachten.
2. Vor Arbeiten an der Fahrzeugelektrik die Anlage spannungsfrei schalten.
3. Einbauort der Zentrale trocken, geschützt und servicezugänglich wählen.
4. Kabel gegen Scheuern, Zug, Hitze und Feuchtigkeit sichern.
5. Sicherung erst nach vollständiger Verdrahtungsprüfung einsetzen.
6. DIP-Schalter nur nach der aktuellen fahrzeugspezifischen Anleitung setzen.
7. Jeden Fahrzeugabgriff elektrisch messen und mit Stecker sowie Pin dokumentieren.
8. Keine ZV-Leitung anschließen, wenn die Anleitung für die Startknopf-Variante keine Freigabe enthält.
9. Funk-Zubehör erst nach stabiler Spannungsversorgung anlernen.
10. Abschließend alle Alarmwege einzeln prüfen.

## Inbetriebnahme und Abnahme

1. Versorgungsspannung und Ruhestrom auf Plausibilität prüfen.
2. Zündung EIN/AUS und Startknopf-Erkennung prüfen.
3. Jede serienmäßige Fahrerhaustür einzeln öffnen und auf Alarmauslösung prüfen.
4. Aufbau-, Heck-, Schiebe- und Staufachtüren einzeln prüfen.
5. Nicht über den Fahrzeugbus erfasste Öffnungen mit Funk-Magnetkontakten absichern.
6. Funk-Handsender und optionales NFC Modul getrennt testen.
7. Scharf- und Unscharfschaltung mehrfach prüfen.
8. Zentralverriegelung separat prüfen und die bekannte Nichtansteuerbarkeit protokollieren.
9. Warnblinker und akustisches Alarmmittel bei ausgeschalteter Zündung prüfen.
10. Panikalarm und Alarmabbruch testen.
11. Starterbatterie-Ruheverhalten nach Fahrzeugvorgabe kontrollieren.
12. Kundenübergabe mit dokumentiertem Funktionsumfang durchführen.

## Bedienhinweise

Die allgemeine Kurzanleitung Rev. `1.3` beschreibt Funk-Handsender, Panikalarm, Vent-check, Alarmablauf und Alarmspeicher. Bei dieser Fahrzeugvariante hat jedoch die fahrzeugspezifische Einschränkung Vorrang: Eine Betätigung des THITRONIK-Zubehörs darf nicht als Nachweis gelten, dass das Fahrzeug tatsächlich ver- oder entriegelt wurde.

- Bedienung und Rückmeldungen immer am realen Fahrzeug prüfen.
- Verriegelungszustand vor dem Entfernen vom Fahrzeug kontrollieren.
- [[Funk-Handsender 868 — Fernbedienung für WiPro III]] und [[NFC Modul — Steuerung der WiPro via NFC]] nur im freigegebenen Funktionsumfang erklären.
- Nach einem Alarm den Alarmspeicher auswerten und die Ursache beseitigen.

## Technische Produktdaten

Die folgenden Werte stammen aus der allgemeinen WiPro III safe.lock Kurzanleitung Rev. `1.3`; sie ersetzen keine fahrzeugspezifische Anschlussfreigabe.

| Merkmal | Wert |
|---|---|
| Versorgung der Zentrale | `9–30 V` |
| Stromaufnahme | ca. `11 mA` |
| Sirenenausgang | `9–30 V (Uin) / 1 A` |
| Blinkerausgang | `60 W` |
| Funkfrequenz | `868,35 MHz` |
| maximale Anzahl anlernbarer Sender | `100` |
| Funkreichweite im Freifeld | bis `75 m` |
| Senderbatterie | `CR2032`, etwa 2 Jahre |

## Diagnose

| Beobachtung | Prüfung / Maßnahme |
|---|---|
| THITRONIK-Zubehör schaltet die Alarmanlage, aber nicht die Türen | entspricht der veröffentlichten Einschränkung bei Startknopf-Fahrzeugen; nicht als Verdrahtungsfehler kaschieren |
| Fahrzeughupe bleibt bei Alarm stumm | Zündung aus; Zusatzhupe und deren freigegebenen Anschluss prüfen |
| Tür löst keinen Alarm aus | Tür einzeln prüfen; CAN-Erfassung und gegebenenfalls Funk-Magnetkontakt nach aktueller Anleitung klären |
| Reaktion nach Softwareupdate verändert | Fahrzeug- und WiPro-Software dokumentieren; aktuelle Freigabe erneut einholen |
| DIP oder Mindeststand unklar | nicht raten; Einbau stoppen und fahrzeugspezifische Anleitung beschaffen |

## Dokumentation

Zur Fahrzeugakte gehören mindestens:

1. Fahrzeugmodell, Modelljahr, VIN und Startsystem.
2. WiPro-Artikelnummer, Seriennummer und Softwarestand.
3. Versionsstand der verwendeten fahrzeugspezifischen Anleitung.
4. Tatsächliche DIP-Stellung und alle Abgriffstellen mit Stecker, Pin und Signal.
5. Verwendetes akustisches Alarmmittel.
6. Ergebnis jedes Tür-, Funk-, Blinker-, Alarm- und ZV-Tests.
7. Schriftlicher Hinweis an den Kunden, dass die Zentralverriegelung über THITRONIK-Zubehör derzeit nicht angesteuert wird.

## Quellen

- Aktuelle THITRONIK-Produktseite „WiPro III safe.lock“ mit Fahrzeugliste, technischen Daten und FAQ; geprüft am 22.07.2026.
- `H:/Thitronik WIKI (ml)/wiki/de/wipro_iii_safe.lock.pdf` — allgemeine WiPro III safe.lock Kurzanleitung, Rev. `1.3`, zwei Seiten vollständig textlich und visuell geprüft.
- Die früher genannten Dateien `Seriennummer 5458 Wipro III safe.lock Sprinter Set.csv`, `MAN TGE.docx`, `Fahrzeugbesonderheiten.docx` und `Wi Pro III 11safe.lock.docx` fehlen lokal und wurden nicht als Beleg verwendet.

## Querverweise

- [[WiPro III — Funk-Alarmsystem für Freizeitfahrzeuge]]
- [[Fahrzeugkompatibilität — Übersichtsmatrix & DIP-Grundlagen]]
- [[Seriennummern und Softwarestände — Präfixe, Schwellen und Meilensteine]]
- [[Sirenen und Hupen — Akustische Alarmmittel]]
- [[Funk-Handsender 868 — Fernbedienung für WiPro III]]
- [[NFC Modul — Steuerung der WiPro via NFC]]
- [[VW Crafter / MAN TGE (2017–2024, ohne Startknopf)]]
