# Sirenen und Hupen — Akustische Alarmmittel

Route: /de/sirenen-hupen | Stand: 2026-07-15 | Sichtbarkeit: standard
Quelle: Thitronik Online/project-data/runtime/wiki/wiki-articles/de/sirenen-hupen.json

---
Sirenen und Hupen — Akustische Alarmmittel

Thitronik bietet für die akustische Alarmierung die folgenden Produkte, die jeweils unterschiedliche Zwecke erfüllen.

## Übersicht

Produkt | Art.-Nr. | Zweck | 
 Back-up Sirene | 100089 | Sirene mit internem Akku — unabhängig von Fahrzeugbatterie | 
 Back-up Sirene 24V | 105267 | Wie 100089, aber für 24V-Fahrzeuge (LKW-Chassis) | 
 Zusatzsirene | 100190 | Weitere externe Sirene ohne eigenen Akku | 
 Zusatzhupe | 105339 | Hupenfunktion für Fahrzeuge ohne nutzbare Hupe im Alarm | 

## Wichtige Anschlusshinweise

⚠️ KRITISCH — Falscher Anschluss erzeugt Dauerton: 
Zusätzliche Hupen (Fahrzeughupen oder Zusatzhupen) müssen an Pin 9 (pinkes Kabel) der WiPro III angeschlossen werden — nicht an Pin 15 (weißes Kabel). Bei Anschluss an Pin 15 ertönt die Hupe im Alarmfall als Dauerton statt im gewünschten Intervall.

Relais-Pflicht bei neuen Hupen: Wenn eine neue Hupe installiert wird, die nicht ab Werk verbaut war, muss zwingend ein Relais zwischengeschaltet werden. Ohne Relais löst die Hupe beim Unscharfschalten der Alarmanlage ungewollt aus.

## Back-up Sirene (Art. 100089)

### Funktion

Die Back-up Sirene hat einen integrierten Akku (Selbstversorgung). Sie alarmiert auch dann, wenn die Fahrzeugbatterie abgeklemmt oder leer ist.

Betriebszustände (LED-Anzeige): 

Status | LED | 
 Alarm | rot | 
 Back-up (Akku aktiv) | — | 
 Aufladen | — | 

### Anschluss

Versorgung: 8–30 V DC 

Kabel | Verbindung | 
 Rot (+12V, Klemme 30 ) | Dauerstrom — lädt den internen Akku permanent | 
 Schwarz (GND, Klemme 31) | Fahrzeugmasse | 
 Weiß (Trigger/Alarm) | WiPro III: Pin 15 (Sirene +12V) | 
 Blau (negativer Trigger) | Nicht benötigt → isolieren | 

Trigger-Quellen (alternativ): WiPro III / WiPro III safe.lock , G.A.S.-pro , G.A.S.-pro III , Schlüsselstellung Klemme 15 

Hinweis: Nicht verwendete Triggerleitungen isolieren . Die Back-up Sirene ertönt nur, wenn sie über den Schlüsselschalter aktiviert ist.

### Schlüsselstellung — Alarm vs. Aufladen

Der Schlüsselschalter hat zwei Stellungen. In beiden Stellungen wird die Sirene im Alarmfall von der WiPro III ausgelöst. Der Unterschied liegt in der Akku-/Back-up-Funktion: 

Schlüsselstellung | Alarm über WiPro | Interne Back-up-Funktion | Akku wird geladen | 
 Stellung „Aus/Aufladen" | ✅ | ❌ (kein Eigen-Alarm bei Leitungstrennung) | ✅ | 
 Stellung „Aktiv/Scharf" | ✅ | ✅ (bei Sabotage/Leitungstrennung löst die Sirene selbst aus) | ❌ | 

Wichtig: Vor Reisebeginn in die Aktiv-Stellung drehen, damit die Sabotagefunktion scharf ist. Für längere Standzeiten mit angeschlossenem Ladegerät (Winter) in Aufladen-Stellung belassen, damit der interne Akku nicht tiefentladen wird.

## Zusatzsirene (Art. 100190)

### Funktion

Externe Zusatzsirene ohne eigenen Akku. Wird parallel zur WiPro III Sirene betrieben.

Versorgung: 8–30 V DC 

### Anschluss

WiPro III: Pin 15 und Pin 16

WiPro III safe.lock : Pin 15 und Pin 16

Pin 16 ist bereits belegt → parallel abgreifen 

G.A.S.-pro: Pin 16

G.A.S.-pro III: Pin 16

## Zusatzhupe (Art. 105339)

### Funktion

Für Fahrzeuge, bei denen die Fahrzeughupe nicht im Alarmfall angesteuert werden kann (z.B. Sprinter, T5, T6 — Hupe nur bei eingeschalteter Zündung aktiv).

WICHTIG: Die Einbauanleitung richtet sich an professionelle Servicebetriebe . Entsprechendes Hintergrundwissen zur Fahrzeugelektronik wird vorausgesetzt. Unsachgemäße Eingriffe können zu Sach- und Personenschäden führen.

### Sicherheitshinweis

Arbeiten an der Fahrzeugelektronik (insbesondere Airbag-System) sind gefährlich und dürfen nur von einer qualifizierten Fachwerkstatt durchgeführt werden.

### Lieferumfang

Vorverdrahtetes Relais ( Dauerplus an Pin 30 und Pin 86 bereits durchverbunden)

Rotes Kabel mit Ringöse M8 (für Anschluss an Fahrzeugbatterie + 15A-Sicherung)

Vormontierte Hupe mit Halterung

Zusätzlich benötigtes Material: FLY-Kabel 2,5 mm², Flexrohr (Innen-∅ 8,5 mm), 15A-Sicherung

### Anschluss

Relais-Pin | Funktion | Verbindung | 
 Pin 30 | Dauerplus | Fahrzeugbatterie + (über 15A-Sicherung) — im Lieferumfang bereits mit Pin 86 durchverbunden | 
 Pin 86 | Relaisspule | Dauerplus (bereits durchverbunden mit Pin 30) | 
 Pin 85 | Relaisspule | Pin 9 WiPro III (Hupensignal, pinkes Kabel) | 
 Pin 87 | Geschalteter Ausgang | Hupe | 

ACHTUNG: Die Anordnung der Stecker kann je nach Relais variieren — maßgeblich ist die Nummerierung der Stecker, nicht die Position!

### Technische Daten

Parameter | Wert | 
 Spannungsversorgung | 12 V DC | 
 Stromverbrauch | ca. 8 A | 
 Lautstärke | 115 dB | 
 Abmessungen (B × H × T) | 90 × 85 × 80 mm | 
 Gewicht | ca. 433 g | 

## Back-up Sirene 24V (Art. 105267)

Für Fahrzeuge mit 24V-Bordnetz (z.B. LKW-Chassis). Funktionsprinzip identisch mit Art. 100089. Sonderartikel — nicht im regulären Katalog.

## Fahrzeugtypen ohne nutzbare Hupe

Bekannte Fahrzeuge, bei denen die Fahrzeughupe im Alarm nicht verfügbar ist:

Fahrzeug | Problem | 
 Mercedes Sprinter | Hupe nur bei eingeschalteter Zündung | 
 VW T5 | Hupe nur bei eingeschalteter Zündung | 
 VW T6 | Hupe nur bei eingeschalteter Zündung | 
 Mercedes Sprinter VS30 | Hupe nur bei Zündung; zusätzlich: starke Schalldämmung im Motorraum — interne Sirene oft nicht hörbar | 
 MAN TGE / VW Crafter (2017+) | Hupe nur bei eingeschalteter Zündung | 
 Iveco Daily ab MJ 2019 | Hupe nicht mehr ansteuerbar | 

Empfehlung: Back-up Sirene im Motorraum montieren oder Zusatzhupe einbauen. Bei stark gedämmten Fahrzeugen (z.B. Sprinter) ist eine externe Zusatzsirene (Art. 100190) oft effektiver als eine Zusatzhupe.

## Test / Validierung

Nach Montage einer Sirene oder Hupe mindestens diese Prüfschritte durchführen:

Anlage scharfschalten und einen realen Testalarm auslösen.

Prüfen, ob der Alarm intervallartig erfolgt und nicht als Dauerton anliegt.

Bei Back-up Sirene die Schlüsselschalter-Stellung bewusst kontrollieren:

Stellung Aktiv/Scharf für Sabotageschutz im Reisebetrieb

Stellung Aus/Aufladen für Lade- oder Winterbetrieb

Bei Zusatzhupe sicherstellen, dass das Relais korrekt verdrahtet ist und die Hupe beim Unscharfschalten nicht ungewollt anspricht.

## Querverweise

WiPro III 

Fahrzeugkompatibilität 

GAS-pro III 

Systemüberblick
