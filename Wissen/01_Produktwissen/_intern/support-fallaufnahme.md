---
title: Support-Fallaufnahme — Pflichtangaben und Eskalationsprüfung
sources:
  - sources/Support Fragen.csv
  - wiki/seriennummern-softwarestaende.md
  - wiki/stoerungsbeseitigung.md
  - wiki/fahrzeugkompatibilitaet.md
  - wiki/zugang-bedienung.md
  - wiki/app-befehle.md
  - wiki/abschalteinrichtung.md
updated: '2026-07-15'
confidence: high
lang: de
---

# Support-Fallaufnahme — Pflichtangaben und Eskalationsprüfung

Interne Vorlage für die strukturierte Erstaufnahme technischer Supportfälle. Sie hilft, Rückfragen zu vermeiden und einen Fall anhand von Fahrzeug, Produkten, Seriennummern und beobachtetem Verhalten belastbar einzuordnen.

> **Grundregel:** Beobachtungen, Erwartungen und bereits durchgeführte Maßnahmen getrennt dokumentieren. Scharf-/Unscharfschalten der Alarmanlage und Ver-/Entriegeln der Zentralverriegelung sind unterschiedliche Vorgänge.

---

## Pflichtangaben vor der technischen Bewertung

### Kontakt

- Name und Vorname
- erreichbare Telefonnummer
- E-Mail-Adresse, falls Unterlagen oder Bilder ausgetauscht werden sollen
- aktuelles Land und Mobilfunknetz, wenn der Fall Pro-Finder, SIM oder SMS betrifft

### Fahrzeug

- Hersteller und genaue Modellbezeichnung des Basisfahrzeugs bzw. Chassis
- Modelljahr sowie Baujahr oder Erstzulassung
- Aufbauart: Kastenwagen, teilintegriert, vollintegriert, Alkoven oder Liner
- relevante Besonderheiten, zum Beispiel Aufbau- oder Hecktür, Startknopf oder nachgerüstete Zentralverriegelung

### THITRONIK-System

- genaue Bezeichnung aller beteiligten THITRONIK-Produkte
- Seriennummer jeder relevanten Komponente
- bekannte Softwarestände
- Einbaudatum und einbauender Betrieb, soweit bekannt
- seit dem Einbau vorgenommene Änderungen, Reparaturen oder Erweiterungen

### Fehlerbild

- erwartetes Verhalten und tatsächlich beobachtetes Verhalten
- Zeitpunkt des ersten Auftretens
- dauerhaft, sporadisch oder zuverlässig reproduzierbar
- genauer Auslöser und Reihenfolge der Bedienhandlungen
- Zustand vor und nach dem Fehler: scharf/unscharf sowie verriegelt/entriegelt
- Status-LED, Blinkcode, Signalton, App-Meldung oder SMS möglichst wörtlich
- bisherige Prüfungen und Maßnahmen mit Ergebnis

### Belege

- gut lesbare Fotos der Seriennummern und, falls relevant, der DIP-Schalter
- Fotos oder kurze Videos von LED-Anzeigen und reproduzierbarem Verhalten
- bei Einbaufragen Fotos der betroffenen Anschlüsse und Kabelfarben

> **Datenschutz:** Keine Passwörter, vollständigen SIM-PINs oder sonstigen Zugangsdaten im Ticket speichern. Rufnummern und Bilder nur erfassen, soweit sie für die Bearbeitung erforderlich sind.

---

## Zusätzliche Angaben nach Themenbereich

| Thema | Zusätzlich erfassen |
|-------|---------------------|
| WiPro III / safe.lock | genaue Fahrzeugvariante, DIP-Stellung, verwendeter Zugangsweg, Status-LED-Blinkcode sowie getrenntes Verhalten von Alarmanlage und Zentralverriegelung |
| fahrzeugspezifische Zentralverriegelung | Basisfahrzeug und Modelljahr, Original- und Aufbautüren, Startknopf, verwendeter Schlüssel oder THITRONIK-Zugang sowie Verhalten von Zentralverriegelung, Blinker, Hupe und Sirene |
| Pro-Finder / SIM / SMS | Seriennummer, SIM-Anbieter, Kartenformat, PIN-Abfrage aktiv oder deaktiviert, Mailbox- und Rufumleitungsstatus, LED-Zustand, Versorgungsspannung sowie gesendeter Befehl und Antwort im genauen Wortlaut |
| BT-connect / Bluetooth-Vernetzungsmodul | eindeutiger Modultyp, Seriennummer, Smartphone-Modell, Betriebssystem- und App-Version, LED-Zustand sowie bestehende oder gelöschte Kopplungen |
| NFC Modul | Seriennummer, Art des Zugangsmediums, LED-Anzeige, Batteriezustand und Reihenfolge der bereits angelernten Komponenten |
| Funk-Zubehör | genaue Komponente, Seriennummer, Montageort, Entfernung zur WiPro III-Zentrale, Untergrund, Batteriezustand nur bei batteriebetriebenen Sendern sowie Anzahl betroffener Sender |
| Gaswarner / Sensoren | genaue Produktvariante, Alarmart, LED- und Tonsignal, Montageort und -höhe, Versorgungsspannung sowie Zustand von IGN bzw. Klemme 15, soweit vorhanden |
| Stromversorgung / Standzeit | gemessene Spannung, Batterietyp und -kapazität, Standzeit, Ladezustand, vorhandene Ladeerhaltung und weitere fahrzeugseitige Verbraucher |
| App / Programmier-SMS | Betriebssystem- und App-Version, beteiligtes Modul mit Seriennummer, exakter Bedienweg oder SMS-Befehl, sichtbare Meldung und Ergebnis |
| Abschalteinrichtung | Artikelnummer der Abschalteinrichtung, Pro-Finder-Seriennummer, Einbauzustand und Anlass der Prüfung; keine Funktionsprüfung bei fahrendem Fahrzeug |

---

## Copy/Paste-Vorlage für interne Tickets

```text
Kontakt
Name:
Telefon:
E-Mail:
Land / Mobilfunknetz:

Fahrzeug
Hersteller / Modell:
Modelljahr:
Baujahr / Erstzulassung:
Aufbauart / Besonderheiten:

THITRONIK-System
Verbaute Produkte:
Seriennummern:
Softwarestände:
Einbaudatum / Einbaubetrieb:
Änderungen seit dem Einbau:

Fehlerbild
Erwartetes Verhalten:
Tatsächliches Verhalten:
Erstes Auftreten:
Reproduzierbarkeit:
Auslöser / Bedienreihenfolge:
Status-LED / Blinkcode / Signalton:
App-Meldung / SMS-Wortlaut:
Bisherige Maßnahmen und Ergebnisse:

Belege / Anhänge:
```

---

## Erstprüfung vor der Eskalation

1. Pflichtangaben auf Vollständigkeit prüfen.
2. Seriennummer und Softwarestand über [[Seriennummern & Softwarestaende]] einordnen.
3. Fahrzeugprofil, Modelljahr und DIP-Stellung mit [[Fahrzeugkompatibilität — Übersichtsmatrix & DIP-Grundlagen]] und der jeweiligen Fahrzeugseite vergleichen.
4. Standardsymptome und sichere Prüfmaßnahmen in [[Störungsbeseitigung — Häufige Probleme & Lösungen]] nachschlagen.
5. Ergebnis jeder Prüfung dokumentieren; erfolglose Schritte nicht ohne geänderte Voraussetzung wiederholen.

---

## Sofortige Eskalation und Sicherheitsgrenzen

- Bei Rauch, Brandgeruch, starker Erwärmung oder einem akuten Gas-, CO- oder Rauchalarm zuerst Personen und Tiere aus dem Gefahrenbereich bringen. Den Fall nicht durch weitere Schalt- oder Funktionstests am Fahrzeug diagnostizieren.
- Arbeiten an Bordnetz, CAN-Bus, Klemme 15, 30 oder 31 sowie an sicherheitsrelevanten Ausgängen gehören in die Hände einer qualifizierten Fachkraft.
- Replay-Schutz, Anti-Jamming oder andere Sicherheitsfunktionen nicht ohne dokumentierte Ursache und Folgenabschätzung deaktivieren.
- Bei Aussperrung, unbeabsichtigter Fahrzeugstilllegung oder unkontrolliertem Alarm direkt eskalieren und keine weiteren Fernschaltversuche veranlassen.
- Für die Abschalteinrichtung ausschließlich den dokumentierten Befehl `kill` verwenden; `a an` ist dafür unzulässig. Die Sicherheitsbedingungen aus [[Abschalteinrichtung — Fahrzeugstilllegung über Pro-Finder]] gelten vollständig.
- Ohne belastbare Seriennummer und genaue Fahrzeugangabe keine definitive Kompatibilitäts-, Software- oder Verdrahtungsaussage treffen.

---

## Querverweise

- [[Störungsbeseitigung — Häufige Probleme & Lösungen]]
- [[Seriennummern & Softwarestaende]]
- [[Fahrzeugkompatibilität — Übersichtsmatrix & DIP-Grundlagen]]
- [[Zugangsmedien & Bedienung — Zutrittswege im THITRONIK-System]]
- [[THITRONIK® App — Befehle, Einrichtung und Fehlerbehebung]]
- [[Abschalteinrichtung — Fahrzeugstilllegung über Pro-Finder]]
- [[Pro-Finder — GSM/GPS Telemetriemodul]]
- [[WiPro III — Funk-Alarmsystem für Freizeitfahrzeuge]]
