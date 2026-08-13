---
title: Fiat Ducato 244 / Peugeot Boxer / Citroën Jumper (bis 2006)
sources:
  - 'D:/Thitronik WIKI (ml)/wiki/de/wipro_iii_fiat_ducato_244.pdf'
  - 'D:/Thitronik WIKI (ml)/wiki/de/wipro_iii-installationsanleitung_1.8.pdf'
updated: '2026-07-19'
confidence: high
lang: de
dealerStatus: approved
---

# Fiat Ducato 244 / Peugeot Boxer / Citroën Jumper (bis 2006)

Dieser Artikel beschreibt den Einbau einer WiPro III in Fiat Ducato 244, Peugeot Boxer und Citroën Jumper bis Baujahr 2006. Die fahrzeugspezifische Anleitung Stand `12/20` verwendet direkte Anschlüsse für Blinker, Fahrerhaustüren, Versorgung und Masse; eine CAN-Verbindung der WiPro ist in diesem Einbauschema nicht vorgesehen.

> **Abgrenzung:** Baujahr, Armaturenbrett, Tachoeinheit, Stecker und Leitungsfarben müssen mit der Anleitung übereinstimmen. Für die nachfolgende X250-Generation gilt [[Fiat Ducato X250 / Peugeot Boxer / Citroën Jumper (Euro 4, 2006–2011)|Fiat Ducato X250 2006–2011]].

## Geltungsbereich

| Merkmal | Vorgabe |
|---|---|
| Fahrzeuge | Fiat Ducato 244, Peugeot Boxer und Citroën Jumper |
| Baujahre | bis 2006; tatsächliche Fahrzeugausführung prüfen |
| Alarmsystem | WiPro III mit fahrzeugspezifischem Direktanschluss |
| DIP-Konfiguration | ausschließlich `SW6` auf `ON`; übrige Schalter nach Grundkonfiguration `OFF` |
| Bedienung im dokumentierten Funktionstest | WiPro-Funk-Handsender; Fahrzeugfunkschlüssel nicht verwenden |
| Türüberwachung Fahrerhaus | direkter Alarmtrigger am weißen 6-poligen Stecker |
| WiPro-CAN-Anschluss | in diesem Einbauschema nicht verwendet |

Die Kompatibilitätsmatrix führt für diese Fahrzeuggruppe die Baureihenbasis `0823-001 / 2.1`. Das fahrzeugspezifische Handbuch nennt jedoch keine eigene Mindest-Seriennummer. Seriennummer, Softwarestand und tatsächliche Geräteausführung sind deshalb zusätzlich über [[Seriennummern und Softwarestände — Präfixe, Schwellen und Meilensteine|Seriennummern und Softwarestände]] zu prüfen.

## Quellenstand und Bedienungsentscheidung

| Quellenstelle | Aussage | Redaktionsentscheidung |
|---|---|---|
| Vorprüfung auf Seite 2 | Eine vorhandene Fahrzeug-Funkfernbedienung soll auf Funktion geprüft werden; anschließend wird eine mögliche WiPro-Bedienung erwähnt. | als allgemeiner, aber widersprüchlicher Vorprüfungshinweis dokumentieren |
| Konkreter Funktionstest auf Seite 7 | Fahrzeugfunkschlüssel dient ausdrücklich nicht zum Aktivieren oder Deaktivieren. | für Einbau, Prüfung und Übergabe maßgeblich |
| DIP-Anweisung auf Seite 2 | Schalter 6 am 8-fach-Codierschalter auf `ON`. | verbindliche Fahrzeugkonfiguration |

Wegen des internen Widerspruchs wird die Alarmanlage in diesem Artikel ausschließlich mit dem WiPro-Funk-Handsender geprüft. Optionale Fernbedienwege dürfen nur nach ihrer eigenen Produktanleitung und einem realen Funktionstest freigegeben werden.

## Sicherheit und Vorprüfung

- Arbeiten an Fahrzeugelektrik und -elektronik nur durch eine qualifizierte Fachwerkstatt ausführen lassen.
- Vor dem Öffnen der Zentrale, dem Umstellen des DIP-Schalters oder elektrischen Arbeiten die Spannungsversorgung trennen.
- Ungenutzte Ein- und Ausgänge einzeln gegen Kurzschluss isolieren.
- Leitungen nicht allein nach Farbe anschließen; Stecker, Pin und Funktion am Fahrzeug bestätigen.
- Vorhandene Warnlampen, Fehlerspeichereinträge und elektrische Fehler vor dem Einbau dokumentieren.
- Bei Abweichungen von Abbildungen, Steckerform oder Leitungsfarben die Arbeit stoppen und Hersteller oder THITRONIK Support einbeziehen.

Vor Beginn sind Fahrzeug-Funkfernbedienung, Zentralverriegelung, Fahrzeughupe und die Türanzeige bei eingeschalteter Zündung zu prüfen. Bei vollintegrierten Fahrzeugen können einzelne Türen oder Klappen fahrzeugseitig elektronisch erfasst sein; daraus folgt keine pauschale CAN-Anschlussfreigabe für die WiPro.

## Funk-Zubehör anlernen und DIP einstellen

Funk-Magnetkontakte, Funk-Gaswarner und Funk-Kabelschleifen sollen vor dem Einbau angelernt werden. Bereits gespeicherte Kontakte bleiben beim beschriebenen Lernvorgang erhalten.

1. Gehäuse der WiPro-Zentrale öffnen.
2. Versorgungsspannung einstecken.
3. Taster rechts neben dem 20-poligen Stecker halten, bis die Zentrale piept und die rote Status-LED leuchtet.
4. Jeden zu speichernden Kontakt, Gaswarner oder jede Kabelschleife zwei- bis dreimal auslösen; Piepton und kurz erlöschende LED bestätigen das Speichern.
5. Spannungsversorgung wieder entfernen.
6. Am 8-fach-Codierschalter ausschließlich `SW6` auf `ON` stellen.
7. Prüfen, dass die übrigen fahrzeugbezogenen Schalter der Grundkonfiguration auf `OFF` stehen.
8. Gehäuse schließen und erst danach mit dem Einbau fortfahren.

Der systemübergreifende Lernablauf ist zusätzlich unter [[Anlernvorgang — Funk-Zubehör an WiPro III anlernen|Anlernvorgang]] beschrieben.

## Armaturenbrett und Montageort

1. Die vier dokumentierten Schrauben der Armaturenbrettverkleidung entfernen und die Verkleidung nach vorn abziehen.
2. Blenden links und rechts neben dem Lenkrad entfernen und die darunterliegenden Torxschrauben lösen.
3. Drei Torxschrauben vor der Tachoeinheit entfernen.
4. Tachoeinheit vorsichtig ausbauen und Stecker nicht an Leitungen belasten.
5. WiPro-Zentrale und gegebenenfalls das GSM-Modul im Freiraum unter der Tachoeinheit dauerhaft befestigen.

Der Montageort muss trocken, zugänglich und frei von beweglichen oder heißen Fahrzeugteilen bleiben. Antenne nicht kürzen oder aufgewickelt montieren.

## Blinkeranschluss an der Tachoeinheit

| Anschlussort | Fahrzeugleitung | WiPro-Leitung | Funktion |
|---|---|---|---|
| blauer Stecker an der Tachoeinheit | rosa/weiß | grau | Blinker links |
| blauer Stecker an der Tachoeinheit | blau/schwarz | grau | Blinker rechts |

Beide Fahrzeugleitungen werden jeweils mit einer der beiden grauen WiPro-Leitungen verbunden. Die zwei getrennten Blinkerpfade müssen im abschließenden Alarmtest gemeinsam geprüft werden.

## Sirene und akustischer Alarmgeber

| Ausführung | Montage- und Anschlussvorgabe |
|---|---|
| mitgelieferte Sirene | kann im Freiraum unter der Tachoeinheit montiert werden; Anschluss exakt nach fahrzeugspezifischem Schaltbild |
| Back-up-Sirene | wahlweise im Innenraum oder spritzwassergeschützt im Motorraum, nicht an heißen Motorteilen; Anschluss exakt nach Schaltbild |

Standard- und Back-up-Sirene besitzen unterschiedliche Anschlussbilder. Leitungen dürfen nicht allein anhand einer allgemeinen Sirenenbelegung übertragen werden. Fahrzeughupe und separate Sirene sind unterschiedliche Alarmgeber.

## Alarmtrigger der Fahrerhaustüren

Am Sicherungskasten auf der Beifahrerseite wird der weiße 6-polige Stecker verwendet:

| Pin | Fahrzeugleitung | WiPro-Leitung | Funktion laut Einbauhandbuch |
|---:|---|---|---|
| 1 | rot/schwarz | blau | Alarmtrigger Fahrerhaustüren |
| 4 | violett/schwarz | blau/schwarz | Alarmtrigger Fahrerhaustüren |

Diese beiden Leitungen sind im fahrzeugspezifischen Handbuch als Alarmtrigger der Fahrerhaustüren dokumentiert. Sie dürfen nicht ohne Einzelnachweis als frei verwendbare Zentralverriegelungsausgänge behandelt oder bei integrierten Fahrzeugen pauschal weggelassen werden.

## Versorgung, Zündung und Masse am Autoradio

| Fahrzeuganschluss | WiPro-Leitung | Funktion |
|---|---|---|
| Klemme 30 am Autoradio | rot | Dauerplus |
| Klemme 15 am Autoradio | gelb | Zündung |
| Masse am Autoradio | schwarz | Fahrzeugmasse |

Autoradio entriegeln und entnehmen. Klemme 30, Klemme 15 und Masse vor dem Anschluss messen und gegen die tatsächliche Fahrzeugbelegung prüfen. Alle Verbindungen dauerhaft, isoliert und zugentlastet ausführen.

## Status-LED montieren

Für die in der Anleitung gezeigte Position wird auf der Beifahrerseite ein Loch mit `8 mm` Durchmesser gebohrt. Vor dem Bohren ist der rückwärtige Bauraum auf Leitungen, Steuergeräte und andere Bauteile zu prüfen.

LED einsetzen und das rot/schwarze LED-Kabel mit weißem Steckverbinder wieder mit dem Gegenstück des WiPro-Kabelsatzes verbinden. Die Status-LED muss nach dem Zusammenbau aus der vorgesehenen Blickrichtung erkennbar sein.

## Abschließende Funktionsprüfung

1. Alle Türen schließen und die WiPro mit der Verriegeln-Taste des WiPro-Funk-Handsenders scharfschalten.
2. Einen Piepton, einmaliges Blinken der Fahrtrichtungsanzeiger und blinkende Status-LED als Scharfschaltbestätigung prüfen.
3. Mindestens `60 Sekunden` warten; dies ist eine Scharfschaltverzögerung für die Fahrerhaustüren, keine Alarmverzögerung.
4. Nach Ablauf der 60 Sekunden eine Fahrerhaustür öffnen und die Alarmreaktion prüfen.
5. Mit Funk-Magnetkontakten gesicherte Türen und Fenster unmittelbar nach dem Scharfschalten prüfen; für sie gilt die 60-sekündige Verzögerung nicht.
6. Prüfen, dass Sirene und interner Pieper etwa `30 Sekunden` akustisch alarmieren.
7. Prüfen, dass die Fahrzeugblinker etwa `180 Sekunden` optisch alarmieren, sofern der Alarm nicht vorher beendet wird.
8. Mit einer beliebigen Taste des WiPro-Funk-Handsenders entschärfen beziehungsweise den Alarm unterbrechen.
9. Zwei Pieptöne, zweimaliges Blinken und das Ende des Status-LED-Blinkens als Unscharfbestätigung prüfen.
10. Abschließend kontrollieren, dass keine neuen Warnlampen, elektrischen Fehler oder Fehlerspeichereinträge entstanden sind.

Eine Folge kurzer Pieptöne beim Scharfschalten zeigt einen offenen angelernten Magnetkontakt an; die Anlage schaltet laut Quelle dennoch scharf. Alle Kontakte sind deshalb vor der Übergabe einzeln zu öffnen und zu schließen. Geeignete Zubehörartikel beschreibt [[Funk-Magnetkontakt 868 — Montage und Betrieb|Funk-Magnetkontakt 868]].

## Bedienwege und Zubehör

Die Primärquelle verwendet für den verbindlichen Funktionstest den [[Funk-Handsender 868 — Fernbedienung für WiPro III|Funk-Handsender 868]]. Ein [[Pro-Finder — GSM/GPS Telemetriemodul|Pro-Finder]] kann je nach Systemausführung zusätzliche Melde- und Fernsteuerfunktionen bereitstellen, ersetzt aber weder die korrekte Grundinstallation noch die Prüfung vor Ort.

Zusätzliches Funk-Zubehör muss vor der Montage angelernt und nach dem Einbau einzeln ausgelöst werden. Produktgeneration, Artikelnummer und tatsächliche Kompatibilität sind vor der Freigabe zu kontrollieren.

## Fehlerdiagnose

| Fehlerbild | Prüfung und Maßnahme |
|---|---|
| Handsenderbefehle werden erkannt, aber Fahrerhaustüren lösen keinen Alarm aus | Alarmtrigger am weißen 6-poligen Stecker, Pin 1 und Pin 4, sowie beide Verbindungen prüfen. |
| Keine Reaktion auf Handsender und kein Piepton beim Anlegen der Spannung | Versorgung, Sicherung, Masse und Crimpverbindungen prüfen. |
| Offener Kontakt wird trotz geschlossener Öffnungen gemeldet | Magnetabstand prüfen, alle Kontakte mehrfach betätigen und erneut scharfschalten; falls nötig bei geschlossenen Kontakten Versorgung kurz trennen und wiederherstellen. |
| Nur eine Fahrzeugseite blinkt | Beide grauen WiPro-Leitungen und rosa/weiße beziehungsweise blau/schwarze Fahrzeugleitung am blauen Tachostecker prüfen. |
| Fahrerhaustür löst sofort oder gar nicht aus | 60-sekündige Scharfschaltverzögerung vollständig abwarten und Triggeranschluss prüfen. |
| Fahrzeugfunkschlüssel verhält sich anders als erwartet | Nicht als Freigabenachweis verwenden; verbindlichen Test mit WiPro-Funk-Handsender durchführen. |
| Fahrzeug weicht von Bildern oder Steckern ab | Arbeit stoppen und fahrzeugspezifische Freigabe einholen. |

Weitere systemübergreifende Prüfungen beschreibt [[Störungsbeseitigung — Sichere Diagnose häufiger Probleme|Störungsbeseitigung]].

## Quellenentscheidung

- Das elfseitige fahrzeugspezifische Einbauhandbuch *WiPro III – Fiat Ducato 244*, Stand `12/20`, wurde vollständig textlich geprüft; die für Einbau und Funktion relevanten Seiten 1 bis 7 wurden zusätzlich visuell kontrolliert.
- Das allgemeine Installationshandbuch Version `1.8` wurde für Sicherheitsregeln und DIP-Grundlagen herangezogen. Seine Fahrzeugtabelle ab Baujahr 2006 ersetzt nicht die spezielle `SW6`-Anweisung für den Ducato 244 bis 2006.
- Die konkrete Funktionsprüfung auf Seite 7, nach der der Fahrzeugfunkschlüssel nicht zum Aktivieren oder Deaktivieren dient, hat Vorrang vor dem widersprüchlichen allgemeinen Vorprüfungssatz auf Seite 2.
- Die alte pauschale Aussage „CAN-Bus: nein“ wurde präzisiert: Die WiPro erhält in diesem Schema keinen CAN-Anschluss; einzelne Türen oder Klappen können fahrzeugseitig dennoch elektronisch erfasst sein.
- Die bisherige pauschale Anweisung, blaue Zentralverriegelungsleitungen bei integrierten Fahrzeugen nicht anzuschließen, wurde nicht fortgeführt, weil die Primärquelle sie an Pin 1 und 4 ausdrücklich als Alarmtrigger der Fahrerhaustüren verwendet.

## Querverweise

- [[WiPro III — Funk-Alarmsystem für Freizeitfahrzeuge|WiPro III]]
- [[Fahrzeugkompatibilität — Übersichtsmatrix & DIP-Grundlagen|Fahrzeugkompatibilität]]
- [[Seriennummern und Softwarestände — Präfixe, Schwellen und Meilensteine|Seriennummern und Softwarestände]]
- [[Funk-Handsender 868 — Fernbedienung für WiPro III|Funk-Handsender 868]]
- [[Funk-Magnetkontakt 868 — Montage und Betrieb|Funk-Magnetkontakt 868]]
- [[Anlernvorgang — Funk-Zubehör an WiPro III anlernen|Anlernvorgang]]
- [[Pro-Finder — GSM/GPS Telemetriemodul|Pro-Finder]]
- [[Fiat Ducato X250 / Peugeot Boxer / Citroën Jumper (Euro 4, 2006–2011)|Fiat Ducato X250 2006–2011]]
- [[Störungsbeseitigung — Sichere Diagnose häufiger Probleme|Störungsbeseitigung]]
