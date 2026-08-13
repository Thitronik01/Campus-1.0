---
title: Pro-Finder — GSM/GPS Telemetriemodul
sources:
  - sources/pro-finder_-_bedienungs-_und_montageanleitung_2.6_01.pdf
  - sources/pro_finder-kurzanleitung-international.pdf
  - sources/pro_finder-kurzanleitung-international_sn-045.pdf
  - >-
    sources/pro-finder_ab_sn045_bedienungs_und_installationsanleitung_zehn_sprachen.pdf
  - sources/pro-finder_ocr_abschrift.pdf
  - sources/wipro_iii-installationsanleitung_1.8.pdf
  - sources/Fragen zu Pro-finder.pdf
  - sources/Pro Finder.docx
  - sources/Anbieter.docx
  - sources/Handy.docx
  - sources/NUR_INTERNER_GEBRAUCH_Pro-finder_Befehle_abV9.1_(V1.1).pdf
  - >-
    sources/SMS-Konfiguration für Pro-Finder - SMS-Konfiguration für
    Pro-Finder.csv
  - wiki/app-befehle.md
  - wiki/mobilfunk-sim.md
  - wiki/seriennummern-softwarestaende.md
  - wiki/stoerungsbeseitigung.md
updated: '2026-07-15'
confidence: high
lang: de
dealerStatus: approved
---

# Pro-Finder — GSM/GPS Telemetriemodul

**Art.-Nr. 100699**

Der Pro-Finder ist ein Mobilfunk- und Ortungsmodul für Freizeitfahrzeuge. Er übermittelt Alarm- und Statusmeldungen per SMS, liefert GPS-Positionen und ermöglicht abhängig von Gerätegeneration, Softwarestand, angeschlossener WiPro und Fahrzeuganbindung ausgewählte Fernsteuerfunktionen.

> **Grundregel:** Vor jeder Aussage zu SIM, Mobilfunk, App, Status-LED oder Anschlüssen die vollständige Seriennummer mit Präfix `0699` erfassen. Führende Nullen dürfen nicht entfallen. `100699` ist die Artikelnummer der Produktfamilie, nicht die Seriennummer.

---

## Schnellüberblick

- Alarmweiterleitung per SMS an bis zu **zehn Zielrufnummern**
- GPS-Position als Koordinaten oder anklickbarer Kartenlink bei einer als Smartphone gekennzeichneten Rufnummer
- Geofencing zur Meldung einer unzulässigen Ortsveränderung
- Statusabfrage mit den für Generation und Betriebsart verfügbaren Werten
- Fernbedienung kompatibler WiPro-Funktionen per SMS oder, in bestimmten Betriebsarten, per Anruf
- Schalten der Ausgänge A und B per SMS
- optionale sichere Fahrzeugstilllegung über Ausgang A und eine fachgerecht installierte Abschalteinrichtung
- Spannungswarnung und Tiefentladeschutz bei Unterspannung

Der Pro-Finder ist kein Live-Tracking-System und zeichnet keine Reiseroute auf. Er kann einen Diebstahl melden und die Wiederauffindung unterstützen, verhindert den Diebstahl aber nicht selbst. Alle Fernfunktionen setzen eine aktive SIM, einen passenden Tarif und Mobilfunkempfang voraus.

---

## Gerätegenerationen und Seriennummern

### SIM- und Mobilfunkgenerationen

| Vollständige Seriennummer | Mobilfunkgeneration | SIM-Format | PIN-Regel |
|---|---|---|---|
| `0699-001` bis `0699-007` | frühe Hardwaregeneration | Mini-SIM | PIN `0000`, PIN-Abfrage aktiv |
| `0699-008` bis `0699-017` | ältere Hardwaregeneration | Micro-SIM | PIN `0000`, PIN-Abfrage aktiv |
| `0699-018` bis `0699-044` | dokumentiertes 2G-/3G-Modem | Micro-SIM | PIN `0000`, PIN-Abfrage aktiv |
| ab `0699-045` | LTE-fähige Hardwaregeneration | Nano-SIM | PIN-Abfrage vollständig deaktivieren |

Die Tabelle beschreibt dokumentierte Hardwaregrenzen. Ob das jeweils benötigte Netz im Land, beim konkreten Betreiber und am Standort noch verfügbar ist, muss aktuell geprüft werden. Eine als 5G vermarktete SIM kann nur verwendet werden, wenn Tarif und Netz zusätzlich die vom Gerät unterstützte Technik sowie klassische SMS und Telefonie bereitstellen.

### Dokumentierte Meilensteine

| Ab Seriennummer | Dokumentierter Stand | Änderung |
|---|---|---|
| `0699-003` | SW `5.0` | 24-V-Fähigkeit dokumentiert |
| `0699-009` | SW `8.7` | Guthabenabfrage für weitere Prepaid-Anbieter dokumentiert |
| `0699-013` | SW `9.1` | App-Kompatibilität, Alarmanruf und weitere Melderarten |
| `0699-015` | — | Kombifunktion „Verriegeln und Scharfschalten“ als Funktionsschwelle |
| `0699-018` | SW `9.1` | neues 2G-/3G-Modem |
| `0699-029` | SW `10.0.0` | korrigierte französische Befehle und verbesserte Modemkommunikation |
| `0699-045` | SW `11.0.4` | Hardwarewechsel auf 4G LTE, Nano-SIM und deaktivierte PIN-Abfrage |
| `0699-056` | SW `11.0.6` | verbesserte Kompatibilität mit O2-SIM-Karten |
| `0699-065` | SW `11.1.0` | neue obere Platine und neues Lötverfahren |

Ein Seriennummern-Meilenstein beschreibt den dokumentierten Produktionsstand. Nachträgliche Updates können dazu führen, dass der tatsächlich installierte Softwarestand abweicht. Eine in der App eingetragene Ersatz-Seriennummer ändert weder Hardware noch Software. Details stehen unter [[Seriennummern und Softwarestände — Präfixe, Schwellen und Meilensteine]].

---

## Bestimmungsgemäßer Einsatz und Grenzen

Der Pro-Finder ist für die Standortbestimmung und Überwachung eines Fahrzeugs vorgesehen. Zusammen mit einer kompatiblen [[WiPro III — Funk-Alarmsystem für Freizeitfahrzeuge]] leitet er Einbruch-, Gas-, Panik- und weitere Systemmeldungen weiter. Ohne WiPro stehen insbesondere Ortung, Geofencing, Statusabfragen und die dokumentierten Ein- und Ausgänge zur Verfügung.

- Positionsmeldungen werden per SMS übertragen.
- Die Genauigkeit und Aktualität der Position hängen vom Satellitenempfang ab.
- Mobilfunkbefehle sind nicht für zeitkritische Steuerungen geeignet; Zustellung und Antwort können vom Netz verzögert werden.
- Scharfschalten/Unscharfschalten und Verriegeln/Entriegeln sind getrennte Funktionen. Zentralverriegelungsbefehle setzen eine kompatible WiPro III safe.lock, eine passende Fahrzeuganbindung und geeignete Softwarestände voraus.
- Sicherheitsrelevante Fahrzeugverdrahtung und die Abschalteinrichtung dürfen nur durch qualifiziertes Fachpersonal installiert werden.

---

## Technische Eckdaten

| Merkmal | Dokumentierter Wert / Einordnung |
|---|---|
| Spannungsversorgung | 9–30 V DC; 24-V-Fähigkeit ab `0699-003` dokumentiert |
| Absicherung | 3 A nach produktspezifischer Einbauanleitung |
| Ruhestrom Pro-Finder | ca. 16–25 mA, abhängig vom Betriebszustand des Mobilfunkmoduls |
| Ausgänge A und B | 12 V, maximal 500 mA je dokumentierter Anleitung |
| Spannungsmesseingänge | U2–U5 bei älteren Geräteausführungen; konkrete Belegung nach Seriennummer und Anleitung |
| Satellitennavigation | GPS; ab `0699-045` GPS/QZSS dokumentiert |
| Zielrufnummern | bis zu 10 |
| Betriebstemperatur | –10 °C bis +80 °C |

Die Stromaufnahme des Fahrzeugs setzt sich nicht nur aus dem Pro-Finder zusammen. Fahrzeuggrundlast, WiPro, weitere Verbraucher, Batteriezustand und Selbstentladung müssen getrennt berücksichtigt werden; siehe [[Stromversorgung & Standzeiten — Ruhestrom, Unterspannung und Ladepraxis]].

---

## Montage und Anschluss

### Montageort

- Pro-Finder im trockenen Fahrzeuginnenraum montieren, nicht im Motorraum.
- Geräteoberseite nach oben ausrichten und den Montageort so wählen, dass der integrierte GPS-Empfänger möglichst wenig durch Metall abgeschirmt wird.
- Modul gegen unbefugten Zugriff sichern, für Servicearbeiten aber erreichbar halten.
- Kabel zugentlastet, scheuerfrei und fern von heißen oder beweglichen Teilen verlegen.
- Bei Verwendung einer externen GPS-Antenne die Empfangsseite waagerecht nach oben ausrichten und die zur Gerätegeneration gehörende Initialisierungsanweisung beachten.

### Elektrischer Anschluss

Der Anschluss muss nach der mitgelieferten Anleitung der tatsächlichen Gerätegeneration erfolgen. Der ältere Hauptkabelbaum dokumentiert unter anderem:

| Anschluss | Funktion |
|---|---|
| Pin 1, schwarz | Masse |
| Pins 2–5 | Spannungsmesseingänge U2–U5, je nach Betriebsart mit Zusatzfunktion |
| Pin 6 | Ausgang B |
| Pin 7, gelb | Ausgang A |
| Pin 8, rot | Betriebsspannung |

Bei abweichendem Kabelbaum oder Geräten ab `0699-045` ist ausschließlich die passende Anleitung maßgeblich. WiPro und Pro-Finder müssen an dieselbe Fahrzeugbatterie angeschlossen sein. Die Verbindung zwischen beiden Modulen erfolgt über das dafür vorgesehene Verbindungskabel.

> **Ausgangslast:** Ausgänge A und B nicht über 500 mA belasten. Für größere oder induktive Lasten ist eine fachgerecht dimensionierte Relaisschaltung mit geeigneter Schutzbeschaltung erforderlich. Unbenutzte Leitungen einzeln isolieren.

SIM-Karte, Stecker und Antenne nur bei spannungsfreiem Pro-Finder einsetzen oder lösen. Wiederholtes Ziehen einer Fahrzeugsicherung ist keine Reparaturmaßnahme; wiederkehrende Ausfälle der Versorgung oder mögliche Spannungsspitzen müssen fachlich untersucht werden.

---

## SIM-Karte und Mobilfunk

Der Pro-Finder benötigt eine SIM mit **klassischen SMS, Telefonie und einer eindeutig erreichbaren Rufnummer**. Mobile Daten sind für seine SMS-Steuerung nicht erforderlich. Prepaid und Vertrag sind grundsätzlich möglich, wenn Tarif, Guthaben beziehungsweise Vertragsstatus, Netz und PIN-Regel passen.

| Seriennummer | SIM | PIN |
|---|---|---|
| `0699-001` bis `0699-007` | Mini-SIM | `0000`, Abfrage aktiv |
| `0699-008` bis `0699-044` | Micro-SIM | `0000`, Abfrage aktiv |
| ab `0699-045` | Nano-SIM | PIN-Abfrage vollständig aus |

Mailbox, Rufumleitungen und störende Komfortdienste über den Anbieter oder ein Smartphone deaktivieren. Dafür nur vom Anbieter beziehungsweise Endgerät bestätigte Codes verwenden. Für Auslandsnutzung müssen Roaming, Partnernetz, unterstützte Mobilfunktechnik und Kosten vorab geprüft werden.

Eine permanente Providerfreigabe oder starre Länder-Abschalttabelle ist nicht belastbar. Auswahl, Vorbereitung und Test sind unter [[Mobilfunk und SIM-Karten — Pro-Finder sicher in Betrieb nehmen]] beschrieben.

---

## Zielrufnummern programmieren

Der Pro-Finder reagiert erst auf Bedienbefehle, nachdem mindestens eine Rufnummer erfolgreich programmiert wurde. Die erste Rufnummer ist die **Masternummer**. Sie kann den gespeicherten Rufnummernblock später mit einer neuen Programmier-SMS ersetzen.

### Syntaxbeispiele

| SIM-Typ | Smartphone-Kennzeichnung | Programmier-SMS |
|---|---|---|
| Prepaid | ja | `*100#PDE+S491701234567` |
| Prepaid | nein | `*100#PDE+491701234567` |
| Vertrag | ja | `DE+S491701234567` |
| Vertrag | nein | `DE+491701234567` |

| Bestandteil | Bedeutung |
|---|---|
| `*100#` | anbieterspezifisches Beispiel für eine Guthabenabfrage; nur bei Prepaid und passend zum Provider verwenden |
| `P` | Prepaid-Kennzeichnung |
| `DE` | Gerätesprache Deutsch |
| `+` | autorisierte Rufnummer; die erste Nummer ist die Masternummer |
| `-` | nicht autorisierte Zielrufnummer ohne Steuerungsberechtigung |
| `S` | Smartphone-Kennzeichnung für einen anklickbaren Kartenlink |
| `491701234567` | Beispiel im internationalen Format, mit Ländervorwahl und ohne führende Inlandsnull |

Keine Leerzeichen, typografischen Anführungszeichen oder automatische Formatierung in die Programmier-SMS einfügen. Bei einer Vertragskarte darf kein Guthaben-Abfragecode programmiert sein. Ein falscher Code kann Alarmmeldungen verzögern oder blockieren, während das Gerät auf die Providerantwort wartet.

Die dokumentierten Sprachkürzel sind `DE`, `FR`, `DK`, `GB`, `NL`, `IT`, `SE` und `CZ`. Die vollständige Einrichtung ist unter [[THITRONIK® App — Befehle, Einrichtung und Fehlerbehebung]] beschrieben.

---

## Bedienung per SMS und Anruf

Die gültige Befehlsform hängt von der im Pro-Finder programmierten Sprache ab. Sie wird nicht pauschal durch die Hardwaregeneration bestimmt. Für ein deutsch programmiertes Gerät sind unter anderem folgende Befehle dokumentiert:

| Funktion | Befehl |
|---|---|
| WiPro scharfschalten | `scharf` |
| WiPro unscharfschalten | `unscharf` |
| Status anfordern | `status` |
| Position anfordern | `pos` oder, je nach dokumentiertem Stand, `position` |
| Geofencing einschalten | `fence an` |
| Geofencing ausschalten | `fence aus` |
| Ausgang A dauerhaft einschalten | `a an` |
| Ausgang A für 1–120 Minuten einschalten | `a N`, zum Beispiel `a 30` |
| Ausgang A ausschalten | `a aus` |
| Ausgang A für 1 Sekunde einschalten | `a impuls` |
| Ausgang B entsprechend schalten | `b an`, `b N`, `b aus`, `b impuls` |
| angelernte Komponenten abfragen | `melder` |
| GPS ein- oder ausschalten | `gps an` beziehungsweise `gps aus` |

Die App bereitet Befehle passend zur eingestellten Sprache vor. Bedienung per Anruf hängt von der gewählten Betriebsart ab: Ein Anruf kann einen Statusbericht anfordern oder bei entsprechend eingerichteter WiPro-Steuerung den Alarmzustand wechseln. Deshalb die Schalterstellung nicht ohne Abgleich mit Seriennummer, Anschlussart und passender Anleitung ändern.

Alarm-SMS an mehrere Rufnummern werden nacheinander versendet. Wird ein kontrollierter Alarmtest sofort beendet, können später gespeicherte Zielrufnummern unbenachrichtigt bleiben.

---

## Geofencing und Position

Geofencing überwacht eine Ortsveränderung des abgestellten Fahrzeugs und meldet sie als stillen Diebstahlalarm. Bei einer verbundenen und scharfgeschalteten WiPro ist Geofencing gemäß den Produktunterlagen automatisch aktiv; außerdem kann es per SMS oder, bei entsprechend eingerichteten älteren Betriebsarten, über einen Spannungseingang gesteuert werden.

Die Unterlagen verschiedener Generationen nennen für die Auslösedistanz Größenordnungen von etwa **500 m bis 1 km**. Diese Werte sind keine präzise geografische Grenze. Satellitenempfang, Gerätestand und Bewegungsverlauf beeinflussen die Auslösung. In Hallen oder bei starken GPS-Reflexionen kann eine unplausible Positionsänderung entstehen; Geofencing dort bei Bedarf bewusst mit `fence aus` deaktivieren und später wieder aktivieren.

Wenn keine aktuelle GPS-Position verfügbar ist, wartet der Pro-Finder je nach Gerätestand bis zu etwa **10 Minuten** und kann danach die letzte gültige Position senden. Der Hinweis `GPS: Standby` bedeutet, dass die übertragene Position nicht aktuell ist. Die angezeigte UTC-Zeit gehört dann zur zuletzt gültigen Position und nicht zwingend zum Versandzeitpunkt.

Positionsmeldungen dienen der Orientierung und ersetzen weder ein zertifiziertes Ortungsgerät noch polizeiliche Maßnahmen. Bei einem Diebstahl nicht selbst eingreifen.

---

## Alarm- und Statusmeldungen

| Meldung | Typischer Auslöser / Inhalt |
|---|---|
| Statusbericht | auf Anforderung, per Anruf oder automatisch entsprechend der Betriebsart |
| Einbruchmeldung | Alarmereignis der verbundenen WiPro |
| Gasalarm | Gasmeldung über die verbundene WiPro und kompatible Sensorik |
| manueller Alarm | bewusst ausgelöster Panik-/Notfallalarm |
| Diebstahlmeldung | Geofencing erkennt eine relevante Ortsveränderung; stiller Alarm |
| Notruf-SMS | Eingangssignal in einer entsprechend eingerichteten Betriebsart |
| Spannungswarnung | Versorgung erreicht die Unterspannungsschwelle |
| Positions-SMS | Antwort auf eine Positionsabfrage |
| Hilfe-SMS | Antwort auf einen nicht erkannten Befehl, abhängig vom Softwarestand |

Ab dem dokumentierten Meilenstein `0699-013` ist bei Alarmen zusätzlich ein Signalisierungsanruf an die Masternummer aufgeführt. Der genaue Ablauf hängt von Gerätestand und Konfiguration ab. Der Pro-Finder nimmt kein Gespräch an; der Anruf dient als zusätzliche Aufmerksamkeitssignalisierung.

Ein Statusbericht kann je nach Gerätegeneration, Betriebsart und angeschlossenen Komponenten enthalten:

- Alarmzustand der WiPro
- Zustand des Geofencings
- GPS-Position und Geschwindigkeit
- Zustand der Ausgänge A und B
- Versorgung U1 und bei älteren Geräten die verfügbaren Messeingänge U2–U5
- Gerätetemperatur ab `0699-045`
- Prepaid-Guthaben, wenn ein passender Abfragecode programmiert ist

---

## Ausgänge und sichere Fahrzeugstilllegung

Ausgänge A und B können Verbraucher bis zur dokumentierten Lastgrenze schalten. Zeitbefehle `a N` und `b N` verwenden Minuten, nicht Sekunden; zulässig sind **1 bis 120 Minuten**. `a impuls` und `b impuls` schalten für eine Sekunde.

Die Fahrzeugstilllegung setzt eine fachgerecht installierte [[Abschalteinrichtung — Fahrzeugstilllegung über Pro-Finder]] an Ausgang A voraus.

> ⚠️ **WARNUNG — ausschließlich `kill` verwenden:** Zur Fahrzeugstilllegung niemals `a an` oder `a N` senden. Diese Befehle schalten Ausgang A ohne Geschwindigkeitsprüfung. `kill` wartet dagegen, bis die GPS-Geschwindigkeit mindestens **5 Sekunden durchgehend 0 km/h** beträgt, und schaltet erst dann Ausgang A.

Die Stilllegung wird mit `a aus` aufgehoben. Sie ist nur für einen Alarmfall und höchstens **drei Tage** vorgesehen. Der erhöhte Stromverbrauch kann sonst die Starterbatterie entladen. Keine Stilllegungsprüfung bei fahrendem Fahrzeug durchführen und nicht selbst zu einem mutmaßlich gestohlenen Fahrzeug fahren.

---

## Unterspannung und Standby

- Bei **11,2 V** Versorgungsspannung sendet der Pro-Finder eine Spannungswarnung.
- Danach wechselt er zum Tiefentladeschutz in einen Standby-Zustand und reagiert vorübergehend nicht auf Befehle.
- Nach dem Laden und einer Versorgung über **12,5 V** kehrt er in den Normalbetrieb zurück.
- Nach einer Unterspannungswarnung Batterie, Ladesystem und gesamte Dauerlast prüfen.

Ein nicht reagierender Pro-Finder ist deshalb nicht automatisch defekt. Zuerst die tatsächliche Versorgungsspannung am Gerät und die Ladefähigkeit der Batterie prüfen. Wiederholte Sicherungsresets beseitigen keine Ursache.

---

## Status-LED nach Gerätegeneration

| LED-Zustand | Bis `0699-044` | Ab `0699-045` | Sichere Erstprüfung |
|---|---|---|---|
| blinkt rot/gelb | Netzsuche und keine Zielrufnummern | Netzsuche und keine Zielrufnummern | Netzabdeckung und Programmierung prüfen. |
| blinkt rot | Netzsuche / kein Empfang | Netzsuche / kein Empfang | Standort, SIM und aktuelle Netzabdeckung prüfen. |
| leuchtet gelb | Modem stellt Verbindung her | Modem stellt Verbindung her | Beim Start abwarten; bei Dauerzustand SIM und Empfang prüfen. |
| leuchtet rot | SIM fehlt oder ist defekt | SIM fehlt oder ist defekt | Spannungsfrei schalten und SIM sowie Format prüfen. |
| blinkt rot/grün | PIN ist nicht `0000` | PIN-Abfrage nicht korrekt deaktiviert | Generationsabhängige PIN-Regel anwenden. |
| blinkt gelb | Zielrufnummernspeicher leer | letzte SMS konnte nicht gesendet werden | Alt: Zielrufnummern; neu: Tarif, Guthaben, Nummer und Netz prüfen. |
| leuchtet grün | SMS wird versendet | SMS wird empfangen oder versendet | Kurzzeitiger normaler Kommunikationszustand. |
| blinkt gelb/grün beziehungsweise grün/gelb | eingebucht, aber keine Zielrufnummern | eingebucht, aber keine Zielrufnummern | Zielrufnummern programmieren. |
| blinkt grün | Normalbetrieb | Normalbetrieb | eingebucht und Zielrufnummern vorhanden |

> **Wichtig:** Gelbes Blinken bedeutet vor und ab `0699-045` etwas anderes. Ohne vollständige Seriennummer ist keine eindeutige LED-Diagnose möglich.

---

## Systematische Fehlerprüfung

| Beobachtung | Prüfung |
|---|---|
| keine Reaktion auf SMS | Programmierung, Absenderberechtigung, Empfang, Tarif, Guthaben und exakte Befehlssyntax prüfen; klassische SMS statt RCS/iMessage verwenden |
| Statusabfrage funktioniert, WiPro-Alarme fehlen | Verbindungskabel und WiPro-Zustand im Statusbericht prüfen; falschen Prepaid-Abfragecode ausschließen |
| Mailbox nimmt einen Testanruf an | Mailbox oder Rufumleitung über Anbieter beziehungsweise Endgerät deaktivieren |
| erste Zielnummer erhält Alarm, spätere nicht | berücksichtigen, dass SMS nacheinander versendet werden; kontrollierten Alarm nicht sofort beenden |
| gelbes Blinken | immer anhand der Schwelle `0699-045` bewerten |
| keine aktuelle Position | Montageort, Abschirmung und GPS-Empfang prüfen; Kennzeichnung einer alten Position beachten |
| Gerät nach Unterspannung ohne Reaktion | Spannung messen, Batterie laden und Rückkehrschwelle über `12,5 V` beachten |
| wiederkehrender Ausfall nach Lade-/Solarereignissen | Versorgung und möglichen Überspannungseinfluss durch Fachpersonal prüfen; Sicherungsreset nicht als Dauerlösung verwenden |

Android-Nachrichten-Apps können Befehle als RCS-/Chatnachricht statt als SMS versenden. Für die Einrichtung RCS bei Bedarf vorübergehend deaktivieren und den Nachrichtentyp kontrollieren. Auf einem iPhone darf der Befehl nicht als iMessage gesendet werden; eine zuvor mit iMessage verknüpfte Pro-Finder-Nummer muss gegebenenfalls abgemeldet werden.

Weitere Diagnosewege und generationsabhängige Maßnahmen stehen unter [[Störungsbeseitigung — Sichere Diagnose häufiger Probleme]]. Für eine Eskalation vollständige Seriennummer, Softwarestand, SIM-Anbieter, Tarif, Land, Hostnetz, LED-Zustand, Versorgungsspannung und exakten Ablauf gemäß [[Support-Fallaufnahme — Pflichtangaben und Eskalationsprüfung]] dokumentieren.

---

## App-Kompatibilität und Updates

Die dokumentierte App-Kompatibilität des Pro-Finders beginnt bei `0699-013`, nicht erst beim LTE-Hardwarewechsel `0699-045`. Welche Schaltflächen tatsächlich funktionieren, hängt zusätzlich von Pro-Finder-Softwarestand, WiPro-Variante, Fahrzeuganbindung und eingebautem Zubehör ab.

Bei unbekannter Seriennummer kann die App einen Ersatz-Eingabewert anbieten. Dieser dient nur zur Darstellung von Optionen und ist weder eine Kompatibilitätsbestätigung noch ein Update. Auch das manuelle Eintragen von `0699-045` rüstet kein LTE-Modem nach.

Ob für ein bestimmtes Gerät ein Hardware- oder Softwareupdate angeboten wird, muss THITRONIK anhand der vollständigen Seriennummer und des tatsächlichen Gerätestands prüfen. Historische Preislisten, Rabattaktionen und pauschale Upgrade-Zusagen werden nicht als aktuelle Kondition geführt.

---

## Querverweise

- [[Mobilfunk und SIM-Karten — Pro-Finder sicher in Betrieb nehmen]]
- [[THITRONIK® App — Befehle, Einrichtung und Fehlerbehebung]]
- [[Seriennummern und Softwarestände — Präfixe, Schwellen und Meilensteine]]
- [[WiPro III — Funk-Alarmsystem für Freizeitfahrzeuge]]
- [[Abschalteinrichtung — Fahrzeugstilllegung über Pro-Finder]]
- [[Stromversorgung & Standzeiten — Ruhestrom, Unterspannung und Ladepraxis]]
- [[Störungsbeseitigung — Sichere Diagnose häufiger Probleme]]
- [[Support-Fallaufnahme — Pflichtangaben und Eskalationsprüfung]]
- [[Systemüberblick — THITRONIK-Produktwelt]]
