---
title: Fiat Ducato 8/9 / Citroën Jumper / Peugeot Boxer / Opel Movano (2022–2024)
sources:
  - >-
    D:/Thitronik WIKI
    (ml)/wiki/de/Zusatzanleitung_safe.lock-Upgrade-alleFahrzeuge_2024.pdf
  - 'D:/Texte/de/seriennummern-softwarestaende.md'
  - 'D:/Texte/de/fahrzeugkompatibilitaet.md'
  - 'D:/Thitronik WIKI (ml)/wiki/de/fahrzeuge/fiat-ducato-2022-2024.md'
updated: '2026-07-19'
confidence: high
lang: de
dealerStatus: approved
---

# Fiat Ducato 8/9 / Citroën Jumper / Peugeot Boxer / Opel Movano (2022–2024)

Dieser Artikel beschreibt den Anschluss einer WiPro III safe.lock an Fiat Ducato 8/9 und die dokumentierten baugleichen Modelle der Jahre 2022–2024. Gegenüber der Vorgängergeneration ändern sich Zugang zum Bordcomputer, Steckerpositionen, Pinbelegung und die Ermittlung der DIP-Konfiguration.

> **Abgrenzung:** Die Erstzulassung allein reicht nicht zur Fahrzeugzuordnung. Bauform, Modelljahr, Bordcomputer, Stecker, Seriennummer und Softwarestand der WiPro müssen gemeinsam geprüft werden. Fahrzeuge mit dem späteren Facelift und abweichender Elektronik gehören zu [[Fiat Ducato Facelift / Citroën Jumper / Peugeot Boxer / Opel Movano (2024+)|Fiat Ducato ab 2024]].

## Geltungsbereich

| Merkmal | Vorgabe |
|---|---|
| Fahrzeuge | Fiat Ducato 8/9, Citroën Jumper, Peugeot Boxer und Opel Movano |
| Modelljahre | 2022–2024; tatsächliche elektrische Ausführung prüfen |
| Alarmsystem | WiPro III safe.lock beziehungsweise fachgerecht auf safe.lock erweiterte WiPro III |
| Anschlussort | Bordcomputer neben dem Sicherungskasten hinter dem Ablagefach |
| DIP-Konfiguration | fahrzeugabhängig; sechs dokumentierte Kombinationen nacheinander prüfen |
| Mindeststand Standardausführung | `1050-016` / Software `7.1s` |
| Mindeststand großes Fiat-Touch-Infotainment | `1050-042` / Software `7.5.2s` |

Für die ältere Fahrzeuggruppe gilt [[Fiat Ducato / Citroën Jumper / Peugeot Boxer / Toyota Proace Max / Opel Movano (2012–2021)|Fiat Ducato 2012–2021]]. Vollständige Präfixe und Softwaremeilensteine stehen unter [[Seriennummern und Softwarestände — Präfixe, Schwellen und Meilensteine|Seriennummern und Softwarestände]].

## Quellenstand und Softwaregrenze

| Fahrzeugausführung | Mindest-Seriennummer | Zugeordneter Softwarestand | Einordnung |
|---|---|---|---|
| Ducato 8, Modelljahr 2021/2022 | `1050-016` | `7.1s` | erste dokumentierte Unterstützung dieser Fahrzeuggeneration |
| Ducato 8/9 mit großem Fiat-Touch-Infotainment | `1050-042` | `7.5.2s` | belastbarer Mindeststand der freigegebenen Versionshistorie |

Der Altbestand der Fahrzeugseite nennt beim großen Infotainment `7.5.1S`. Die freigegebene Seriennummern- und Versionshistorie ordnet der Mindest-Seriennummer `1050-042` jedoch `7.5.2s` zu und bezeichnet diesen Stand als Mindestvoraussetzung. Für die Freigabe ist deshalb die Kombination **`1050-042` und mindestens `7.5.2s`** maßgeblich. Artikelnummer, vollständige Seriennummer und tatsächlich installierte Software dürfen nicht miteinander verwechselt werden.

## Sicherheit und Vorbereitung

- Arbeiten an Fahrzeugelektrik und -elektronik nur durch eine qualifizierte Fachwerkstatt ausführen lassen.
- Vor dem Öffnen der WiPro, dem Umstellen von DIP-Schaltern oder elektrischen Arbeiten die Spannungsversorgung nach Herstellervorgabe trennen.
- Klemme 30, Klemme 15 und Masse messtechnisch bestätigen; Leitungen nicht allein nach Farbe zuordnen.
- Ungenutzte Ein- und Ausgänge einzeln gegen Kurzschluss isolieren.
- Stecker, Pin-Nummern und Leitungsfarben mit der tatsächlichen Fahrzeugausführung vergleichen.
- Bei jeder Abweichung von der dokumentierten Ausführung die Arbeit stoppen und Fahrzeughersteller oder THITRONIK Support einbeziehen.

Vor Beginn sind Funk-Fernbedienung, Zentralverriegelung, Fahrzeughupe, Türanzeigen, Warnlampen und vorhandene Fehlerspeichereinträge zu prüfen und zu dokumentieren.

## DIP-Konfiguration sicher ermitteln

Die sechs fahrzeugabhängigen DIP-Kombinationen müssen aus der aktuellen fahrzeugspezifischen Einbauunterlage übernommen werden. Nicht dokumentierte Schalterstellungen dürfen nicht ausprobiert werden.

1. Vollständige WiPro-Seriennummer und installierten Softwarestand notieren.
2. Fahrzeug, Modelljahr, Infotainment-Ausführung und vorhandene Zentralverriegelungsfunktionen bestimmen.
3. WiPro spannungsfrei schalten und das Gehäuse öffnen.
4. Die erste der sechs dokumentierten DIP-Kombinationen einstellen; alle nicht genannten Schalter bleiben gemäß Einbauunterlage stehen.
5. Gehäuse schließen und Spannungsversorgung wiederherstellen.
6. Den in der Quelle als **„8× Ver-/Entriegeln“** bezeichneten Lernlauf durchführen und zwischen jeder Betätigung mindestens **8 Sekunden** warten.
7. Prüfen, ob WiPro Scharf-/Unscharfschalten und die Fahrzeugreaktion zuverlässig erkennt.
8. Bei erfolglosem Versuch erneut spannungsfrei schalten und erst dann die nächste dokumentierte Kombination einstellen.
9. Erfolgreiche DIP-Stellung, Fahrzeugausführung, Seriennummer und Softwarestand dauerhaft dokumentieren.

> **Wichtig:** DIP-Schalter niemals unter Spannung umstellen. Scharf-/Unscharfschalten und Ver-/Entriegeln bleiben getrennte Funktionen und müssen im Test einzeln bewertet werden.

## Zugang zum Bordcomputer und Grundanschluss

1. Ablagefach und erforderliche Verkleidungsteile nach Fahrzeugvorgabe entfernen.
2. Bordcomputer neben dem Sicherungskasten zugänglich machen.
3. Vor dem Lösen der Stecker deren Lage und Verriegelung dokumentieren.
4. Schwarze WiPro-Leitung an einem freigegebenen Fahrzeug-Massepunkt anschließen.
5. Braunen und grauen Stecker an der Rückseite bearbeiten; den grünen Stecker nach dem Zurückklappen des Bordcomputers anschließen.

Alle Abzweige sind dauerhaft und zugentlastet nach WiPro-Installationsvorgabe auszuführen. Die nachfolgenden Farben bezeichnen zuerst die Fahrzeugleitung und danach die WiPro-Leitung.

## Brauner Stecker: Warnblinker und Fahrzeughupe

| Pin | Fahrzeugleitung | WiPro-Leitung | Funktion |
|---:|---|---|---|
| 59 | violett/orange | rot/rosa | Warnblinker |
| 11 | grün/weiß | rosa | Fahrzeughupe |

Sirene und Fahrzeughupe sind unterschiedliche Alarmgeber. Die rosa WiPro-Leitung an Pin 11 steuert hier die Fahrzeughupe; sie darf nicht mit einem Sirenenausgang gleichgesetzt werden.

## Grauer Stecker: Spannungsversorgung und Zündung

| Pin | Fahrzeugleitung | WiPro-Leitung | Funktion |
|---:|---|---|---|
| 18 | rot/grün | rot | Klemme 30, Dauerplus |
| 17 | blau/grau | gelb | Klemme 15, Zündung |

Klemme 30 und Klemme 15 vor dem Anschluss messen. Nach dem Abziehen des grauen Steckers muss die **Fahrzeuguhr gegebenenfalls neu eingestellt** werden; dies ist kein Fehler der WiPro.

## Grüner Stecker: Zentralverriegelung und CAN

| Pin | Fahrzeugleitung | WiPro-Leitung | Funktion |
|---:|---|---|---|
| 9 | blau/gelb | blau/schwarz | Zentralverriegelung vorn |
| 41 | grau/weiß | blau | Zentralverriegelung hinten |
| 42 | weiß | violett/orange | CAN-Low |
| 43 | blau | weiß/orange | CAN-High |

CAN-High und CAN-Low sowie die beiden Zentralverriegelungsleitungen dürfen nicht vertauscht werden. Bei teil- oder vollintegrierten Fahrzeugen ist die tatsächliche Türerfassung zu prüfen; es gilt keine pauschale Freigabe zum Weglassen oder Verbinden einzelner Leitungen.

## Native safe.lock oder safe.lock-Upgrade

Eine ab Werk vorhandene WiPro III safe.lock ist von einer hardwareseitig auf safe.lock erweiterten WiPro III zu unterscheiden. Für das Upgrade dokumentiert die Zusatzanleitung folgende neu einzusteckende WiPro-Leitungen:

| WiPro-Pin | Neue Leitung | Bedeutung |
|---:|---|---|
| 20 | blau | Zentralverriegelungsleitung |
| 19 | blau/schwarz | Zentralverriegelungsleitung |
| 16 | weiß/schwarz | falls bereits belegt, parallel abgreifen |

Nach der Ein-/Ausgangskontrolle eines Upgrades ist der Funkspeicher geleert. Sämtliches Funk-Zubehör muss deshalb erneut nach [[Anlernvorgang — Funk-Zubehör an WiPro III anlernen|Anlernvorgang]] angelernt werden. Die Upgrade-Anleitung ersetzt nicht die fahrzeugspezifische Pinbelegung an braunem, grauem und grünem Fahrzeugstecker.

## Fahrzeugeinstellungen bei großem Infotainment

Bei Ducato 8/9 der Jahre 2023–2024 mit großem Fiat-Touch-Infotainment sind zusätzlich folgende Fahrzeugfunktionen zu aktivieren:

- „Blinker beim Verriegeln“
- „Türentriegelung beim Aussteigen“

Die Bezeichnungen können je nach Sprache und Softwarestand des Fahrzeugs abweichen. Nach jeder Änderung sind Verriegelung, Entriegelung, Blinkerquittierung und WiPro-Reaktion real zu prüfen.

## Abschließende Funktionsprüfung

1. Alle Stecker, Verriegelungen, Abzweige, Isolierungen, Masseverbindung, Sicherung und DIP-Stellung kontrollieren.
2. Seriennummer, Softwarestand, gewählte DIP-Kombination und Infotainment-Ausführung dokumentieren.
3. WiPro scharfschalten und prüfen, ob der Alarmzustand korrekt bestätigt wird.
4. Fahrzeug verriegeln und die gemeinsame Funktion von Vorder- und Hintertüren prüfen.
5. Fahrzeug entriegeln und beide Zentralverriegelungswege erneut prüfen.
6. Jede über CAN überwachte Originaltür einzeln öffnen und die Alarmreaktion kontrollieren.
7. Warnblinker über Pin 59 und Fahrzeughupe über Pin 11 im Testalarm prüfen.
8. Bei großem Infotainment die beiden erforderlichen Fahrzeugeinstellungen verifizieren.
9. Bei einem safe.lock-Upgrade jedes neu angelernte Funk-Zubehör einzeln auslösen.
10. Abschließend kontrollieren, dass keine neuen Warnlampen oder Fehlerspeichereinträge entstanden sind.

Als unabhängige Bedienwege können je nach Systemausführung [[Funk-Handsender 868 — Fernbedienung für WiPro III|Funk-Handsender 868]] und [[NFC Modul — Steuerung der WiPro via NFC|NFC Modul]] vorgesehen werden. Ihre tatsächliche Zentralverriegelungsfunktion hängt von der korrekten safe.lock-Anbindung ab.

## Fehlerdiagnose

| Fehlerbild | Prüfung und Maßnahme |
|---|---|
| WiPro erkennt Ver-/Entriegeln nicht zuverlässig | Seriennummer und Softwarestand prüfen; dokumentierten DIP-Lernlauf erneut vollständig mit mindestens 8 Sekunden Abstand durchführen. |
| Zentralverriegelung funktioniert nur vorn oder hinten | Verbindungen an Pin 9 und Pin 41 sowie blaue und blau/schwarze WiPro-Leitung prüfen. |
| Originaltüren lösen keinen CAN-Alarm aus | CAN-Low an Pin 42 und CAN-High an Pin 43 prüfen; Leitungen nicht auf Verdacht tauschen. |
| Keine Blinkeransteuerung | Verbindung von Pin 59 zur rot/rosa WiPro-Leitung und erforderliche Fahrzeugeinstellung prüfen. |
| Fahrzeughupe bleibt ohne Funktion | Verbindung von Pin 11 zur rosa WiPro-Leitung und die Hupenfunktion des Fahrzeugs prüfen. |
| Funk-Zubehör reagiert nach safe.lock-Upgrade nicht | Zubehör vollständig neu anlernen; der Speicher wurde bei der Upgrade-Prüfung geleert. |
| Fahrzeug oder Stecker weicht von der Beschreibung ab | Änderungen stoppen und eine fahrzeugspezifische Freigabe einholen. |

Weitere systemübergreifende Prüfungen beschreibt [[Störungsbeseitigung — Sichere Diagnose häufiger Probleme|Störungsbeseitigung]].

## Quellenentscheidung

- Die Pin- und Leitungsangaben sowie das Verfahren mit sechs DIP-Kombinationen stammen aus dem vorhandenen fahrzeugspezifischen Redaktionsbestand; die dort genannten DOCX-Primärdateien sind im lokalen Quellbestand nicht mehr auffindbar.
- Die Schwellen `1050-016 / 7.1s` und `1050-042 / 7.5.2s` folgen der freigegebenen [[Seriennummern und Softwarestände — Präfixe, Schwellen und Meilensteine|Seriennummern- und Versionshistorie]].
- Die vierseitige THITRONIK-Zusatzanleitung *WiPro III safe.lock Upgrade*, Revision `2.0`, wurde vollständig textlich und visuell geprüft. Sie belegt die WiPro-Pins 20, 19 und 16 sowie das notwendige erneute Anlernen des Funk-Zubehörs.
- Bei fehlender aktueller fahrzeugspezifischer Einbauunterlage dürfen weder die sechs DIP-Kombinationen noch abweichende Leitungen rekonstruiert oder erraten werden.

## Querverweise

- [[WiPro III — Funk-Alarmsystem für Freizeitfahrzeuge|WiPro III]]
- [[Seriennummern und Softwarestände — Präfixe, Schwellen und Meilensteine|Seriennummern und Softwarestände]]
- [[Fahrzeugkompatibilität — Übersichtsmatrix & DIP-Grundlagen|Fahrzeugkompatibilität]]
- [[Funk-Handsender 868 — Fernbedienung für WiPro III|Funk-Handsender 868]]
- [[NFC Modul — Steuerung der WiPro via NFC|NFC Modul]]
- [[Anlernvorgang — Funk-Zubehör an WiPro III anlernen|Anlernvorgang]]
- [[Fiat Ducato / Citroën Jumper / Peugeot Boxer / Toyota Proace Max / Opel Movano (2012–2021)|Fiat Ducato 2012–2021]]
- [[Fiat Ducato Facelift / Citroën Jumper / Peugeot Boxer / Opel Movano (2024+)|Fiat Ducato ab 2024]]
- [[Störungsbeseitigung — Sichere Diagnose häufiger Probleme|Störungsbeseitigung]]
