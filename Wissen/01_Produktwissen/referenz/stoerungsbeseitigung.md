---
title: Störungsbeseitigung — Sichere Diagnose häufiger Probleme
sources:
  - sources/wipro_iii-installationsanleitung_1.8.pdf
  - sources/pro-finder_-_bedienungs-_und_montageanleitung_2.6_01.pdf
  - sources/pro_finder-kurzanleitung-international_sn-045.pdf
  - sources/Stromverbrauch.docx
  - sources/technische_zusatzinformationen_gas-pro_iii.pdf
  - sources/FAQ Allgemeine Fragen.pdf
  - sources/Fragen zu WiPro III.pdf
  - sources/Fragen zu Funk-Magnetkontakt 868.pdf
  - sources/Fragen zu Pro-finder.pdf
  - sources/Fragen zu BT-connect.pdf
  - sources/Fragen zu G.A.S.-pro III.pdf
  - sources/FAQ_Haeufige-Fragen-zur-THITRONIK-App_DE.md
  - wiki/support-fallaufnahme.md
  - wiki/anlernvorgang.md
  - wiki/app-befehle.md
  - wiki/stromversorgung-standzeiten.md
updated: '2026-07-15'
confidence: high
lang: de
dealerStatus: approved
---

# Störungsbeseitigung — Sichere Diagnose häufiger Probleme

Diese Seite führt von einem beobachteten Symptom zu einer sicheren Erstprüfung. Vor einer technischen Bewertung die Pflichtdaten aus [[Support-Fallaufnahme — Pflichtangaben und Eskalationsprüfung]] erfassen und Seriennummer, Fahrzeugprofil sowie Softwarestand berücksichtigen.

> **Grundregel:** Scharf-/Unscharfschalten der Alarmanlage und Ver-/Entriegeln der Zentralverriegelung getrennt prüfen. Eine Maßnahme erst ausführen, wenn Produktgeneration, Fahrzeug und Einbauzustand eindeutig feststehen.

---

## Diagnose sicher beginnen

1. Erwartetes und tatsächliches Verhalten sowie die genaue Bedienreihenfolge dokumentieren.
2. Seriennummern, Softwarestände, Fahrzeug und Modelljahr erfassen.
3. Status-LED, Blinkcode, Signalton, App-Meldung oder SMS möglichst wörtlich festhalten.
4. Versorgungsspannung und sichtbare Steckverbindungen prüfen, ohne sicherheitsrelevante Verdrahtung zu verändern.
5. Immer nur eine Maßnahme durchführen und ihr Ergebnis dokumentieren.

Bei Rauch, Brandgeruch, starker Erwärmung oder einem aktiven Gas-, CO- oder Rauchalarm gilt nicht dieser Diagnoseablauf, sondern die sofortige Eskalation am Seitenende.

---

## WiPro III-Zentrale

| Symptom | Wahrscheinliche Ursache | Sichere Erstprüfung / Maßnahme |
|---------|-------------------------|-------------------------------|
| Original-Fahrzeugfunkschlüssel bedient die Zentralverriegelung, aber nicht die WiPro III | Replay-Schutz aktiv, nicht unterstütztes Fahrzeugprofil, falsche DIP-Stellung oder fehlerhafter CAN-Anschluss | Zuerst prüfen, ob DIP 5 bewusst auf ON steht. In diesem Fall ist die fehlende WiPro-Bedienung über den Originalschlüssel erwartungsgemäß. Andernfalls Fahrzeugprofil, DIP-Stellung und CAN-Anschluss durch Fachpersonal prüfen lassen. |
| WiPro III reagiert auf keinen Zugangsweg | Versorgung, 10-A-Sicherung, Steckverbindung oder Zentrale gestört | Spannung und Sicherung zerstörungsfrei prüfen; Sicherung nicht wiederholt ziehen. Einbau und Versorgung bei wiederkehrendem Ausfall fachlich prüfen lassen. |
| Status-LED blinkt nach einem Alarm **9×** | Alarmspeicher meldet einen Störsender bzw. Anti-Jamming-Ereignis | Ort und Zeitpunkt dokumentieren und mögliche Funkstörquellen prüfen. Anti-Jamming nicht pauschal abschalten. DIP 7 nur nach dokumentierter Abwägung auf ON setzen. |
| Status-LED blinkt nach einem Alarm **11×** | Innenbeleuchtungseingang hat ausgelöst; möglich sind außerdem unpassende Zentrale, Kabelbaum oder Fahrzeugkonfiguration | Innenlichtsignal, Seriennummer, Fahrzeugprofil und Kabelbaum prüfen. |
| Geschlossener Funk-Magnetkontakt wird nach einer Spannungsunterbrechung als offen gemeldet | Kontaktzustand ist noch nicht neu eingelesen | Alle betroffenen Kontakte mehrmals vollständig öffnen und schließen. |
| Funk-Komponente wird nicht empfangen | nicht angelernt, Batterie schwach, Reichweitenproblem oder Abschirmung durch Metall | Anlernstatus und produktspezifische Batterieanzeige prüfen; Reichweitentest durchführen und Montageort bzw. Antennenlage prüfen. |
| Heckgaragenkontakt arbeitet unzuverlässig | Metalluntergrund dämpft das Funksignal | Montageadapter Art. 100428 (schwarz) oder 100729 (weiß) verwenden und erneut einen Reichweitentest durchführen. |
| WiPro III fällt insbesondere nach Lade- oder Solarereignissen aus | Spannungsspitze oder instabile Versorgung möglich | Zeitpunkt, Batteriespannung und beteiligte Ladegeräte dokumentieren. Versorgung und Überspannungsschutz durch Fachpersonal prüfen lassen; einen Sicherungsreset nicht als Dauerlösung verwenden. |

> **Sicherheitsgrenze:** Replay-Schutz und Anti-Jamming sind Sicherheitsfunktionen. Ihre Deaktivierung beseitigt nicht die Ursache und darf nur mit dokumentierter Folgenabschätzung erfolgen.

---

## Pro-Finder

### Status-LED immer nach Seriennummer bewerten

| LED-Zustand | Bis SN 0699-044 | Ab SN 0699-045 | Maßnahme |
|-------------|-----------------|----------------|----------|
| blinkt rot/gelb | Netzsuche und keine Zielrufnummern | Netzsuche und keine Zielrufnummern | Netzabdeckung und Programmierung der Zielrufnummern prüfen. |
| blinkt rot | Netzsuche / kein Mobilfunkempfang | Netzsuche / kein Mobilfunkempfang | Standort und aktuelle Netzabdeckung des SIM-Anbieters prüfen. |
| leuchtet gelb | Modem stellt Verbindung her | Modem stellt Verbindung her | Beim Start zunächst abwarten; bleibt der Zustand bestehen, SIM und Empfang prüfen. |
| leuchtet rot | SIM fehlt oder ist defekt | SIM fehlt oder ist defekt | Gerät spannungsfrei schalten lassen und SIM sowie Kartenformat prüfen. |
| blinkt rot/grün | SIM-PIN ist nicht `0000` | SIM-PIN-Abfrage ist nicht korrekt deaktiviert | Bis SN 044: PIN `0000`, Abfrage aktiv. Ab SN 045: PIN-Abfrage vollständig deaktivieren. |
| blinkt gelb | Zielrufnummernspeicher leer | letzte SMS konnte nicht gesendet werden | Seriennummer beachten; bei alter Hardware Zielrufnummern, bei neuer Hardware Rufnummer, Guthaben/Tarif und Netz prüfen. |
| leuchtet grün | SMS wird versendet | SMS wird empfangen oder versendet | Kurzzeitiger normaler Kommunikationszustand. |
| blinkt gelb/grün (alt) bzw. grün/gelb (neu) | eingebucht, aber keine Zielrufnummern | eingebucht, aber keine Zielrufnummern | Zielrufnummern programmieren. |
| blinkt grün | Normalbetrieb: eingebucht und Zielrufnummern vorhanden | Normalbetrieb: eingebucht und Zielrufnummern vorhanden | Keine Maßnahme erforderlich. |

> **Wichtig:** Gelbes Blinken hat vor und ab SN 0699-045 eine andere Bedeutung. Ohne Seriennummer ist keine eindeutige Diagnose möglich.

### SIM-, SMS- und Unterspannungsprobleme

| Symptom | Prüfung / Maßnahme |
|---------|--------------------|
| SIM passt mechanisch nicht | SN 0699-001 bis -007: Mini-SIM; -008 bis -044: Micro-SIM; ab -045: Nano-SIM. Keine Adapter mit Gewalt einsetzen. |
| Pro-Finder reagiert nicht auf SMS | Mobilfunkempfang, Zielrufnummern und exakte Befehlssyntax prüfen. RCS/Chatnachrichten ausschalten und klassische SMS im GSM-Alphabet bzw. ASCII verwenden. |
| Anruf erreicht die Mailbox | Mailbox und Rufumleitungen der Pro-Finder-SIM deaktivieren; keine Komfortfunktionen verwenden, die Anrufe umleiten. |
| Erste Zielrufnummer erhält eine Alarm-SMS, spätere Nummern nicht | Alarm-SMS werden nacheinander versendet. Für einen kontrollierten Test den Alarm nicht sofort beenden. |
| Warn-SMS bei **11,2 V**, danach keine Reaktion | Pro-Finder ist zum Tiefentladeschutz im Standby. Batterie laden und Versorgung prüfen; über **12,5 V** kehrt das Gerät in den Normalbetrieb zurück. |

---

## THITRONIK® App und Programmier-SMS

| Symptom | Sichere Prüfung / Maßnahme |
|---------|---------------------------|
| Programmier-SMS wird nicht akzeptiert | SMS in der App neu erzeugen, als klassische SMS senden und RCS/Chatfunktionen deaktivieren. Keine typografischen Anführungszeichen oder zusätzlichen Leerzeichen in Befehle einfügen. |
| iPhone sendet keine wirksame SMS | iMessage auf dem zur Konfiguration verwendeten iPhone versuchsweise deaktivieren und erneut ausdrücklich als SMS senden. |
| Schaltfläche für Kopplung oder Konfiguration ist nicht sichtbar | Systemschrift oder Bildschirmzoom vorübergehend verkleinern, App neu öffnen und den Vorgang wiederholen. |
| Funktion fehlt oder verhält sich anders als beschrieben | Seriennummern und Softwarestände von WiPro III, Pro-Finder oder Bluetooth-Modul gegen die Funktionsvoraussetzungen in [[THITRONIK® App — Befehle, Einrichtung und Fehlerbehebung]] prüfen. Ersatz-Seriennummern in der App bestätigen keine Hardwarekompatibilität. |

---

## BT-connect und Bluetooth-Vernetzungsmodul

| Symptom | Sichere Prüfung / Maßnahme |
|---------|---------------------------|
| Kopplung ist nicht möglich | Zuerst den genauen Modultyp feststellen. Bestehende Kopplung am Smartphone und am Modul löschen, dann den produktspezifischen Koppelmodus neu starten. |
| BT-connect startet den Koppelmodus nicht | Sicherstellen, dass keine aktive Verbindung besteht; Taster halten, bis die LED dauerhaft blau leuchtet. Ein vollständiger Reset löscht alle gespeicherten Geräte. |
| Fahrzeug lässt sich über Bluetooth nicht entriegeln | Bluetooth-Verbindung, Smartphone-Akku und unterstützte Fahrzeugfunktion prüfen. Ohne aktive Verbindung ist keine Bedienung über BT-connect möglich; Funk-Handsender 868 als unabhängigen Zugang bereithalten. |
| Verbindung bricht nach Smartphone- oder Betriebssystemwechsel ab | Alte Kopplungen auf beiden Seiten entfernen und das Gerät in der THITRONIK® App neu koppeln. App- und Betriebssystemversion dokumentieren. |

---

## Funk-Zubehör

### Funk-Magnetkontakt

| Symptom | Ursache / Maßnahme |
|---------|--------------------|
| Kontakt lässt sich anlernen, löst beim Öffnen aber keinen Alarm aus | Platine prüfen: Die Sende-LED muss **vom Magneten weg** zeigen. Zeigt sie zum Magneten, Platine drehen und Funktion erneut testen. |
| Kontakt fällt vom Klebepad ab | Fläche sauber, trocken und fettfrei vorbereiten; nicht unter 15 °C verkleben und etwa 24 Stunden bis zur Endfestigkeit warten. |
| Kontakt arbeitet auf Metall unzuverlässig | Montageadapter verwenden und Reichweite am endgültigen Montageort testen. |

### Batteriewarnungen richtig zuordnen

| Komponente | Versorgung / Diagnose |
|------------|----------------------|
| Funk-Handsender 868, Funk-Magnetkontakt, Funk-Kabelschleife, Funk-Wassermelder | CR2032. Ein etwa 2 Sekunden langer Signalton der WiPro beim Auslösen und eine etwa 30 Sekunden leuchtende rote Sender-LED weisen auf eine schwache Batterie hin. Nach dem Wechsel ist kein Neuanlernen erforderlich. |
| Funk-Rauchmelder T.S.A. | fest eingebaute CR123A-Langzeitbatterie; bei Batteriewarnung Gerät ersetzen, Batterie nicht wechseln. |
| G.A.S.-connect | Versorgung aus dem Fahrzeug; **keine CR2032**. Bei Ausfall Versorgung und Anschluss prüfen. |

---

## G.A.S.-pro III

| Symptom | Sichere Prüfung / Maßnahme |
|---------|---------------------------|
| Aktiver Gas-, CO- oder Rauchalarm | Personen und Tiere aus dem Gefahrenbereich bringen und den Bereich nur gefahrlos lüften. Ursache klären, bevor das Fahrzeug wieder genutzt wird; einen Alarm nicht als bloße Störung behandeln. |
| Alarm beim Kochen, obwohl keine Gefahr vorliegt | Kurzer Tasterdruck schaltet das Gerät 60 Minuten stumm; erneuter Druck beendet die Stummschaltung. LEDs bleiben aktiv. Bei sehr hoher CO-Konzentration hat der CO-Alarm Vorrang. |
| Alarm während der Fahrt durch Abgase | IGN-Anschluss an Klemme 15 durch Fachpersonal prüfen lassen. Bei anliegender Zündung ist das Gerät automatisch stummgeschaltet. |
| Gelbes Blinken einer Sensor-LED mit etwa einem Ton pro Sekunde | Sensorfehler; Händler oder Support kontaktieren. |
| Beide LEDs pulsieren gelb; dreifacher Signalton wird dreimal wiederholt | Unterspannung unter **11,1 V**; Gerät schaltet sich aus. Versorgung wiederherstellen und G.A.S.-pro III anschließend neu einschalten. |
| Funktion soll mit Feuerzeuggas getestet werden | Nicht durchführen. Der Auswertungsalgorithmus eignet sich nicht für diesen Test; das Gerät besitzt einen automatischen Sensorselbsttest. |
| Alle Farben blinken | Übertemperatur über etwa **60 °C**; Wärmequelle und Montageort prüfen, Gerät abkühlen lassen und bei Wiederholung eskalieren. |

> **Hinweis:** Die 60-minütige Stummschaltung unterdrückt auch Funksignal und Alarmausgang. Sie ersetzt keine Gefahrenprüfung.

---

## Stromversorgung und Standzeit

| Symptom | Sichere Prüfung / Maßnahme |
|---------|---------------------------|
| Starterbatterie nach längerer Standzeit leer | Ruhestrom der THITRONIK-Komponenten, Fahrzeuggrundlast, Batteriezustand und Selbstentladung gemeinsam bewerten. Batterie vollständig laden und Ladeerhaltung einplanen. |
| Wiederkehrende Ausfälle beim Laden oder bei Solarbetrieb | Batteriespannung und Zeitpunkt dokumentieren; Ladegerät, Solarregler, Masseverbindungen und Überspannungsschutz durch Fachpersonal prüfen lassen. |
| Gerät funktioniert nach Unterspannung nicht sofort wieder | Produktspezifische Rückkehrschwelle und Einschaltbedingung beachten: Pro-Finder kehrt über 12,5 V zurück; G.A.S.-pro III muss nach Wiederherstellung der Versorgung neu eingeschaltet werden. |

Ruhestromwerte und Beispielrechnungen stehen unter [[Stromversorgung & Standzeiten — Ruhestrom, Unterspannung und Ladepraxis]].

---

## Alarm sicher beenden und Ursache prüfen

| Situation | Vorgehen |
|-----------|----------|
| Einbruchalarm | Alarmanlage über einen für Fahrzeug und Softwarestand unterstützten Zugangsweg unscharfschalten. Entriegeln allein beendet den Alarm nicht in jeder Konfiguration. |
| Panikalarm | Beliebige Taste eines angelernten Funk-Handsenders 868 drücken. |
| Gasalarm | Zuerst Gefahrenbereich verlassen und Ursache klären. Alarmanlage und Gaswarner anschließend getrennt bedienen; der Alarm kann bei fortbestehender Konzentration erneut auslösen. |
| Akustischer Alarm endet, Blinker oder Status-LED bleiben aktiv | Akustische Alarmdauer und optische Anzeige sind unterschiedlich. Die Überwachung bleibt nach dem Alarm aktiv; Alarmspeicher und auslösende Komponente prüfen. |

> **Praxisregel:** Ein beendeter Alarm ist noch keine Fehlerbehebung. Offene Kontakte, Alarmspeicher, Sensorzustand und Ursache kontrollieren.

---

## Anlernen und Löschen

| Symptom / Vorhaben | Sichere Prüfung / Maßnahme |
|--------------------|---------------------------|
| Kein Bestätigungston beim Anlernen | Prüfen, ob der Anlernmodus wirklich aktiv ist, Komponente korrekt ausgelöst wird und der Abstand zur WiPro III-Zentrale gering genug ist. |
| Komponente funktioniert am Tisch, nicht am Montageort | Vor der Montage einen Reichweitentest am endgültigen Ort durchführen; Metallabschirmung und Antennenlage berücksichtigen. |
| Easy-Add 1.0 funktioniert nicht | Es wird ein bereits angelernter Funk-Handsender 868 benötigt; innerhalb von 30 Sekunden nach Wiederherstellung der Versorgung die Lautsprechertaste 5× drücken. |
| Easy-Add 2.0 soll zum Löschen verwendet werden | Nicht möglich. Die CAN-Bus-Methode kann Komponenten nur anlernen, nicht löschen. |
| Nur der Master-Handsender soll erhalten bleiben | Teilweises Löschen nach [[Anlernvorgang — Funk-Zubehör an WiPro III anlernen]] durchführen; alle anderen Sender werden gelöscht und müssen neu angelernt werden. |
| Gesamtspeicher wurde gelöscht | Zuerst einen Funk-Handsender 868 als neuen Master-Handsender anlernen, danach alle weiteren Komponenten. NFC Modul nicht zuerst anlernen. |

---

## Sofort eskalieren

- Rauch, Brandgeruch, starke Erwärmung oder ein akuter Gas-, CO- oder Rauchalarm.
- Beschädigte Leitungen, wiederholt auslösende Sicherungen oder Arbeiten an CAN-Bus, Klemme 15, 30 oder 31.
- Aussperrung, unbeabsichtigte Fahrzeugstilllegung oder unkontrollierter Alarm.
- Wiederkehrender Ausfall nach Unterspannung, Lade- oder Solarereignissen.
- Unklare Seriennummer, Fahrzeugvariante oder Verdrahtung bei sicherheitsrelevanten Funktionen.

Für die Abschalteinrichtung ausschließlich den dokumentierten Befehl `kill` verwenden; `a an` ist zur Fahrzeugstilllegung unzulässig. Keine Funktionsprüfung bei fahrendem Fahrzeug durchführen. Siehe [[Abschalteinrichtung — Fahrzeugstilllegung über Pro-Finder]].

---

## Querverweise

- [[Support-Fallaufnahme — Pflichtangaben und Eskalationsprüfung]]
- [[WiPro III — Funk-Alarmsystem für Freizeitfahrzeuge]]
- [[Pro-Finder — GSM/GPS Telemetriemodul]]
- [[THITRONIK® App — Befehle, Einrichtung und Fehlerbehebung]]
- [[Anlernvorgang — Funk-Zubehör an WiPro III anlernen]]
- [[Stromversorgung & Standzeiten — Ruhestrom, Unterspannung und Ladepraxis]]
- [[Fahrzeugkompatibilität — Übersichtsmatrix & DIP-Grundlagen]]
- [[Zugangsmedien & Bedienung — Zutrittswege im THITRONIK-System]]
