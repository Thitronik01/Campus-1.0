---
title: BT-connect — Bluetooth-Modul für WiPro III
sources:
  - sources/BT-connect__Overview_DE.md
  - sources/Fragen zu BT-connect.pdf
  - sources/FAQ_BT-connect_DE.md
  - sources/Vernetzungsmodul und BT Connect unterschiede.md
  - >-
    sources/Kompatibilität Smartphone-Smartwatch mit Vernetzungsmodul Stand
    08.23.pdf
  - sources/Seriennummer 6000 BT-connect.csv
  - sources/BT-connect_DE_RAG_Pack/BT-connect__Reference__Technische_Daten_DE.md
  - sources/BT-connect_DE_RAG_Pack/BT-connect__Snippets_DE.md
  - wiki/app-befehle.md
  - wiki/seriennummern-softwarestaende.md
  - wiki/stoerungsbeseitigung.md
  - wiki/zugang-bedienung.md
updated: '2026-07-15'
confidence: high
lang: de
dealerStatus: approved
---

# BT-connect — Bluetooth-Modul für WiPro III

**Art.-Nr. 106000 · Seriennummern-Präfix `6000-`**

BT-connect verbindet ein kompatibles Smartphone oder eine kompatible Smartwatch im lokalen Bluetooth-Nahbereich mit der THITRONIK® App und einer WiPro III beziehungsweise WiPro III safe.lock. Ein Pro-Finder kann zusätzlich über die zweite RJ10-Buchse in das System eingebunden werden.

> **Abgrenzung:** BT-connect ist ein lokaler Bluetooth-Bedienweg. Es besitzt weder Mobilfunk noch GPS und ersetzt nicht die Fernsteuerung, Alarmweiterleitung und Ortung über den [[Pro-Finder — GSM/GPS Telemetriemodul]].

---

## Technische Daten

| Parameter | Dokumentierter Wert |
|---|---|
| Spannungsversorgung | 12 / 24 V DC |
| Stromaufnahme | unter 1,5 mA |
| Betriebstemperatur | –20 °C bis +70 °C |
| Funkstandard | Bluetooth® 5.0 Low Energy |
| Reichweite im Freifeld | maximal 50 m |
| speicherbare Geräte | maximal 9 |
| Schnittstellen | 2 gleichwertige RJ10-Buchsen |
| Abmessungen B × H × T | 53 × 57 × 26 mm |
| Gewicht | ca. 41 g |

Die Freifeldreichweite ist kein garantierter Wert im Fahrzeug. Metallflächen, Einbauort, Abschirmung, andere Funkquellen und das verwendete Endgerät können die nutzbare Reichweite deutlich verringern.

---

## Schnellcheck

- Prüfen, dass tatsächlich **BT-connect, Art. 106000, Präfix `6000-`** verbaut ist.
- BT-connect und das ältere Bluetooth-Vernetzungsmodul mit Präfix `1290-` nicht verwechseln.
- Smartphone beziehungsweise Smartwatch, aktuelle THITRONIK® App und eingeschaltetes Bluetooth bereithalten.
- Vor dem Koppeln sicherstellen, dass keine andere aktive Verbindung zum Modul besteht.
- Taster halten, bis die LED **dauerhaft blau** leuchtet; anschließend in der App koppeln und speichern.
- Einen vollständigen Reset nur bewusst durchführen: Er löscht alle gespeicherten Geräte.
- Nach der Einrichtung Scharfschalten/Unscharfschalten und Ver-/Entriegeln getrennt testen.
- Immer einen unabhängigen Zugangsweg bereithalten, beispielsweise den Funk-Handsender 868.

---

## Produktrolle und Grenzen

BT-connect stellt den lokalen Bluetooth-Zugang zur angeschlossenen Alarmanlage bereit. Welche Schaltflächen und Funktionen die App tatsächlich anbietet, hängt vom Gesamtsystem ab.

| Funktion | Voraussetzung / Einordnung |
|---|---|
| WiPro scharfschalten und unscharfschalten | kompatible WiPro III beziehungsweise WiPro III safe.lock und passende App-Konfiguration |
| Fahrzeug verriegeln und entriegeln | kompatible WiPro III safe.lock, unterstützte Fahrzeuganbindung und geeigneter Softwarestand |
| weitere App-Funktionen | abhängig von angeschlossenen Geräten, Zubehör, Softwareständen und Fahrzeugprofil |
| Bedienung außerhalb der Bluetooth-Reichweite | nicht möglich; dafür gegebenenfalls Pro-Finder verwenden |

Scharfschalten/Unscharfschalten und Verriegeln/Entriegeln sind getrennte Funktionen. Eine vorhandene Schaltfläche in der App bestätigt nicht automatisch, dass das Fahrzeug die Funktion hardwareseitig unterstützt.

Ohne aktive Bluetooth-Verbindung steht dieser Bedienweg nicht zur Verfügung. Ein leerer Smartphone-Akku, eine deaktivierte Bluetooth-Funktion, ein Betriebssystemproblem oder eine verlorene Kopplung können deshalb den lokalen Zugang verhindern.

---

## Produktlinie und dokumentierte Serienstände

| Merkmal | BT-connect |
|---|---|
| Artikelnummer | `106000` |
| Seriennummern-Präfix | `6000-` |
| `6000-001` | SW `1.0.2`, erste dokumentierte Serie |
| `6000-002` | SW `1.0.2`, letzter Eintrag der vorliegenden Seriennummernliste |

Der letzte Eintrag einer vorliegenden Liste ist nur deren Quellenendstand und keine Aussage zum aktuellsten lieferbaren Gerät. Vollständige Seriennummer und, sofern ermittelbar, Softwarestand getrennt dokumentieren; siehe [[Seriennummern und Softwarestände — Präfixe, Schwellen und Meilensteine]].

### Abgrenzung zum Bluetooth-Vernetzungsmodul

| Merkmal | Bluetooth-Vernetzungsmodul | BT-connect |
|---|---|---|
| Artikelnummer | `101290` | `106000` |
| Seriennummern-Präfix | `1290-` | `6000-` |
| Produktrolle | älteres Bluetooth-Modul | dokumentierter Nachfolger für Neuinstallationen |
| Stromaufnahme | ca. 4 mA | unter 1,5 mA |
| speicherbare Geräte | maximal 8 | maximal 9 |
| dokumentierte Freifeldreichweite | ca. 10 m | maximal 50 m |

Die Unterlagen führen das Bluetooth-Vernetzungsmodul seit September 2025 als eingestellt und BT-connect als Nachfolger. Die tatsächliche Verfügbarkeit vor Bestellung prüfen. Serienstands-, Smartwatch- und Resetangaben der Produktlinie `1290-` dürfen nicht ungeprüft auf `6000-` übertragen werden; siehe [[Bluetooth-Vernetzungsmodul — Smartphone-Steuerung via Bluetooth]].

---

## Voraussetzungen und Kompatibilität

Für die Einrichtung werden benötigt:

- BT-connect mit korrekt angeschlossener Versorgung
- kompatible WiPro III oder WiPro III safe.lock
- aktuelle THITRONIK® App
- Smartphone oder Smartwatch mit aktivem Bluetooth
- bei Zentralverriegelungsfunktionen zusätzlich eine kompatible safe.lock-Fahrzeuganbindung

App-, Smartphone- und Smartwatch-Kompatibilität können sich mit Betriebssystem- und App-Versionen ändern. Deshalb vor einer verbindlichen Zusage das konkrete Endgerät, Betriebssystem, die installierte THITRONIK® App und die gewünschte Funktion gemeinsam prüfen. Historische Mindestversionen oder die Smartwatch-Matrix des älteren Vernetzungsmoduls sind keine dauerhafte Freigabe für BT-connect.

Eine in der App ausgewählte Fahrzeug- oder Geräteoption erweitert nicht die vorhandene Hardware. Funktionsschwellen der WiPro und des Pro-Finders stehen unter [[THITRONIK® App — Befehle, Einrichtung und Fehlerbehebung]].

---

## Montage und elektrischer Anschluss

BT-connect im trockenen Fahrzeuginnenraum und in der Nähe der WiPro montieren. Taster und LED müssen für Kopplung und Service erreichbar bleiben. Kabel zugentlastet, scheuerfrei und fern von heißen oder beweglichen Teilen verlegen.

| Anschluss | Verbindung |
|---|---|
| GND, schwarz | Fahrzeugmasse |
| 12/24 V, rot | abgesicherter Dauerplusanschluss nach Einbauanleitung |
| RJ10-Buchse 1 | WiPro III / WiPro III safe.lock oder Pro-Finder |
| RJ10-Buchse 2 | WiPro III / WiPro III safe.lock oder Pro-Finder |

Beide RJ10-Buchsen sind gleichwertig. Bei einer Kombination aus WiPro und Pro-Finder spielt es daher keine Rolle, welches der beiden Geräte an Buchse 1 beziehungsweise 2 angeschlossen wird.

> ⚠️ **Elektrische Arbeiten:** Vor Arbeiten an Masse, Versorgung oder den verbundenen Geräten den Spannungsversorgungsstecker des BT-connect abziehen. Verdrahtung nur nach der passenden Einbauanleitung und durch fachkundige Personen ändern. Ungenutzte Leitungen isolieren.

---

## Erstkopplung mit der THITRONIK® App

Die Bezeichnungen einzelner App-Menüs können sich mit der App-Version ändern. Der dokumentierte Ablauf ist:

1. Bluetooth am Smartphone beziehungsweise an der Smartwatch einschalten.
2. THITRONIK® App öffnen und das betreffende Fahrzeug auswählen.
3. Fahrzeugeinstellungen öffnen und BT-connect als vorhandenes Modul auswählen.
4. Prüfen, dass BT-connect nicht bereits aktiv mit einem anderen Endgerät verbunden ist.
5. Taster am BT-connect gedrückt halten, bis die LED **dauerhaft blau** leuchtet.
6. In der App **Koppeln** wählen und die angezeigten Schritte bestätigen.
7. Fahrzeug beziehungsweise Einstellungen speichern.
8. Verbindung und gewünschte Funktionen im Fahrzeugumfeld kontrolliert testen.

Wenn BT-connect in den Bluetooth-Einstellungen des Endgeräts bereits als alte oder fehlerhafte Kopplung erscheint, diesen Eintrag vor dem neuen Versuch entfernen. Die Kopplung in der THITRONIK® App durchführen und nicht allein im allgemeinen Bluetooth-Menü des Betriebssystems.

> **Koppelmodus und Reset unterscheiden:** Das Starten des Koppelmodus löscht nicht automatisch alle gespeicherten Geräte. Der vollständige Reset im nächsten Abschnitt tut dies.

---

## Gespeicherte Geräte vollständig löschen

Ein vollständiger Reset ist sinnvoll, wenn ein Gerätewechsel, eine verlorene Kopplung oder ein nicht mehr zuordenbarer Speicherzustand vorliegt. Er entfernt **alle** im BT-connect gespeicherten Endgeräte.

1. Spannungsversorgung des BT-connect trennen.
2. Taster am Modul gedrückt halten.
3. Bei weiterhin gedrücktem Taster die Spannungsversorgung wiederherstellen.
4. Taster gedrückt halten, bis die LED dauerhaft blau leuchtet.
5. Taster loslassen; alle gespeicherten Geräte sind gelöscht und der Koppelmodus ist aktiv.
6. Alte BT-connect-Einträge auch aus den Bluetooth-Einstellungen der betroffenen Smartphones und Smartwatches entfernen.
7. Benötigte Geräte anschließend einzeln über die THITRONIK® App neu koppeln.

Es ist nicht dokumentiert, dass am Modul einzelne gespeicherte Geräte selektiv gelöscht werden können. Vor dem Reset daher klären, welche weiteren Nutzer ihre Kopplung anschließend neu einrichten müssen.

---

## LED-Anzeige

| LED-Zustand | Dokumentierte Bedeutung |
|---|---|
| leuchtet dauerhaft blau | Koppelmodus aktiv; nach vollständigem Reset außerdem Speicher gelöscht und Koppelmodus gestartet |
| abweichender oder dauerhafter unbekannter Zustand | Versorgung, aktive Verbindung, App-Ablauf und genaue Beobachtung prüfen; nicht ohne Quelle interpretieren |

LED-Farbe, Leuchtart und Zeitpunkt möglichst wörtlich dokumentieren. LED-Angaben des älteren Bluetooth-Vernetzungsmoduls nicht automatisch auf BT-connect übertragen.

---

## Sicher bedienen und Zugang absichern

- Vor dem Verlassen des Fahrzeugs prüfen, ob der gewünschte Alarm- und Verriegelungszustand tatsächlich erreicht wurde.
- Scharfschalten und Verriegeln sowie Unscharfschalten und Entriegeln getrennt kontrollieren.
- Smartphone oder Smartwatch nicht als einzigen Zugangsweg einplanen.
- Einen zuvor geprüften Funk-Handsender 868 oder einen anderen kompatiblen, unabhängigen Zugang mitführen.
- Bei Smartphone-Wechsel, Betriebssystem-Update oder App-Neuinstallation die Kopplung vor Reisebeginn testen.
- Für Fernbedienung außerhalb des Bluetooth-Nahbereichs ist BT-connect ungeeignet; dafür gegebenenfalls Pro-Finder verwenden.

Die Einordnung weiterer Zugangsmedien und Backup-Wege steht unter [[Zugangsmedien & Bedienung — Zutrittswege im THITRONIK-System]].

---

## Fehler systematisch eingrenzen

| Beobachtung | Sichere Prüfung / Maßnahme |
|---|---|
| BT-connect wird in der App nicht gefunden | Versorgung und Bluetooth prüfen, aktive Verbindung zu einem anderen Endgerät ausschließen, Koppelmodus bis zur dauerhaft blauen LED starten. |
| alter Eintrag verhindert die Neukopplung | Eintrag am Endgerät entfernen und Kopplung erneut in der THITRONIK® App durchführen. |
| Koppelmodus startet nicht | Sicherstellen, dass keine aktive Verbindung besteht; Taster erneut bis zur dauerhaft blauen LED halten. |
| Verbindung bricht nach Smartphone- oder Betriebssystemwechsel ab | alte Kopplung auf beiden Seiten entfernen; falls nötig vollständigen Reset durchführen und alle benötigten Geräte neu koppeln. |
| Schaltfläche fehlt in der App | Geräteauswahl, App-Version, WiPro-Variante, Softwarestand und Fahrzeugprofil prüfen; bei verdeckten Bedienelementen Schriftgröße beziehungsweise Bildschirmzoom vorübergehend verkleinern. |
| Scharfschalten funktioniert, Verriegeln aber nicht | Funktionen getrennt bewerten; safe.lock-Variante, Fahrzeuganbindung und Softwarestand prüfen. |
| Fahrzeug lässt sich nicht per Bluetooth öffnen | Bluetooth-Verbindung und Smartphone-Akku prüfen und unabhängigen Zugangsweg verwenden; keine Funktionszusage aus einer bloß sichtbaren App-Schaltfläche ableiten. |
| Reichweite ist deutlich geringer als 50 m | Freifeldangabe nicht mit Fahrzeugpraxis gleichsetzen; Einbauort, Metallabschirmung, Endgerät und Funkumgebung prüfen. |

Weitere Diagnosewege stehen unter [[Störungsbeseitigung — Sichere Diagnose häufiger Probleme]].

---

## Angaben für den Support

Für eine technische Bewertung dokumentieren:

- Produktbezeichnung und Artikelnummer `106000`
- vollständige Seriennummer mit Präfix `6000-`
- sichtbarer Softwarestand, falls verfügbar
- WiPro-Variante und vollständige Seriennummer
- vorhandener Pro-Finder und Anschlussbelegung der RJ10-Buchsen
- Fahrzeug, Modelljahr und gewünschte Funktion
- Smartphone- beziehungsweise Smartwatch-Modell
- Betriebssystem- und THITRONIK®-App-Version
- LED-Zustand und genaue Bedienreihenfolge
- bereits gelöschte oder weiterhin vorhandene Kopplungen
- Ergebnis mit einem alternativen Zugangsweg

Die strukturierte Erfassung ist unter [[Support-Fallaufnahme — Pflichtangaben und Eskalationsprüfung]] beschrieben.

---

## Querverweise

- [[THITRONIK® App — Befehle, Einrichtung und Fehlerbehebung]]
- [[WiPro III — Funk-Alarmsystem für Freizeitfahrzeuge]]
- [[Pro-Finder — GSM/GPS Telemetriemodul]]
- [[Bluetooth-Vernetzungsmodul — Smartphone-Steuerung via Bluetooth]]
- [[NFC Modul — Steuerung der WiPro via NFC]]
- [[Zugangsmedien & Bedienung — Zutrittswege im THITRONIK-System]]
- [[Seriennummern und Softwarestände — Präfixe, Schwellen und Meilensteine]]
- [[Störungsbeseitigung — Sichere Diagnose häufiger Probleme]]
- [[Support-Fallaufnahme — Pflichtangaben und Eskalationsprüfung]]
- [[Artikelnummern-Register — Dokumentierte THITRONIK-Produkte und Zubehör]]
- [[Systemüberblick — THITRONIK-Produktwelt]]
