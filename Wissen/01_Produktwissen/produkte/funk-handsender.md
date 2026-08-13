---
title: Funk-Handsender 868 — Fernbedienung für WiPro III
sources:
  - sources/einleger_funk_handsender_2_101064_ce.pdf
  - sources/Funk-Handsender_868__101064__Overview_DE.md
  - sources/Funk-Handsender_868__101064__Reference__Technische_Daten_DE.md
  - sources/wipro_iii-installationsanleitung_1.8.pdf
  - sources/Funk Zubehör.docx
  - sources/Fragen zu Funk-Handsender 868.pdf
updated: '2026-07-18'
confidence: high
lang: de
dealerStatus: approved
---

# Funk-Handsender 868 — Fernbedienung für WiPro III

**Art.-Nr. 101064**

Der Funk-Handsender 868 ist eine batteriebetriebene Fernbedienung für die **WiPro III-Produktfamilie**. Er schaltet die Alarmanlage scharf oder unscharf und kann einen Panikalarm auslösen. Mit anderen Funksystemen ist er nicht kompatibel.

Bei einer **WiPro III safe.lock** kann der Handsender zusätzlich die Zentralverriegelung bedienen. Ob das Fahrzeug dabei tatsächlich ver- oder entriegelt wird, hängt vom Fahrzeugprofil, der Anbindung und dem Softwarestand ab.

> **WICHTIG:** Scharf-/Unscharfschalten und Ver-/Entriegeln sind unterschiedliche Vorgänge. Eine normale WiPro III steuert mit dem Handsender die Alarmanlage; die Zentralverriegelung wird nur bei einer kompatiblen safe.lock-Anbindung mitbedient.

---

## Technische Daten

| Parameter | Wert |
|-----------|------|
| Spannungsversorgung | 1 × CR2032-Knopfzelle, 3 V |
| Sendefrequenz | 868,35 MHz |
| Sendeleistung | < 10 mW |
| Reichweite | maximal 75 m im Freifeld |
| Batterielebensdauer | typischerweise ca. 2 Jahre |
| Anzahl Codes | > 4 Milliarden |
| Betriebstemperatur | –10 °C bis +60 °C |
| Gewicht | ca. 20 g |
| Abmessungen | 67 × 35 × 15 mm |

Die angegebene Reichweite ist ein Freifeldwert. Metallische Aufbauten, Einbaulage und andere Abschirmungen können die Reichweite im Fahrzeug deutlich verringern.

---

## Tasten und Rückmeldungen

Der Handsender besitzt eine Taste mit Lautsprechersymbol und eine Taste mit durchgestrichenem Lautsprechersymbol. Beide Tasten können die WiPro scharf oder unscharf schalten; sie unterscheiden sich durch die akustische Quittierung.

| Ausgangszustand | Bedienung | Ergebnis | Typische Rückmeldung |
|-----------------|-----------|----------|----------------------|
| Anlage unscharf | eine beliebige Taste drücken | Anlage wird scharf geschaltet | 1× Blinker; mit Lautsprechertaste zusätzlich 1× Signalton; Status-LED blinkt |
| Anlage scharf | eine beliebige Taste drücken | Anlage wird unscharf geschaltet | 2× Blinker; mit Lautsprechertaste zusätzlich 2× Signaltöne; Status-LED erlischt |

Die Rückmeldung der Fahrzeugblinker und die Bedienung der Zentralverriegelung setzen eine passende Fahrzeuginstallation voraus.

### Besonderheit bei WiPro III safe.lock

Bei kompatibler safe.lock-Anbindung werden in der Regel zwei Vorgänge gekoppelt:

- Scharfschalten und Verriegeln
- Unscharfschalten und Entriegeln

Die konkrete Funktion ist fahrzeug- und softwareabhängig. Besonders im Campingmodus ist der zuvor verwendete Verriegelungsweg zu beachten; die fahrzeugspezifischen Hinweise sind verbindlich.

---

## Panikalarm

Der Panikalarm kann bei scharf- und bei unscharfgeschalteter Anlage ausgelöst werden. Dabei werden die Sirene, die Warnblinker und — abhängig vom Fahrzeug — gegebenenfalls die Fahrzeughupe aktiviert.

| Serienstand des Handsenders | Panikalarm auslösen |
|-----------------------------|---------------------|
| ab `0756-063` | beide Tasten gleichzeitig drücken |
| vor `0756-063` | eine Taste gedrückt halten und anschließend die zweite Taste drücken |

Zum Beenden des Panikalarms eine beliebige Taste des Funk-Handsenders drücken.

Ist ein Pro-Finder angeschlossen und entsprechend eingerichtet, wird der manuelle Alarm zusätzlich weitergeleitet.

---

## Anlernen an die WiPro III

Ein neuer Handsender muss vor der Verwendung an der WiPro III angelernt werden. Ohne Anlernen kann die Zentrale seine Funksignale nicht auswerten.

### Direkt an der WiPro III-Zentrale

1. Sicherstellen, dass der 20-polige Stecker an der WiPro III-Zentrale eingesteckt ist.
2. Den Taster **„B“** an der Gehäusevorderseite gedrückt halten, bis ein langer Signalton ertönt und die Status-LED dauerhaft leuchtet.
3. Eine Taste am Funk-Handsender drücken.
4. Den kurzen Bestätigungston abwarten; die Status-LED erlischt dabei kurz.
5. Zum Beenden den Taster **„B“** kurz drücken. Ein Doppelton ertönt und die Status-LED erlischt.

Der zuerst angelernte Funk-Handsender wird zum **Master-Handsender**. Er wird für bestimmte Easy-Add- und Löschabläufe benötigt.

Weitere Anlernwege, Voraussetzungen und Löschverfahren stehen unter [[Anlernvorgang — Funk-Zubehör an WiPro III anlernen|Anlernvorgang]].

---

## Batterie prüfen und wechseln

Der Funk-Handsender verwendet eine **CR2032-Knopfzelle mit 3 V**. Die typische Lebensdauer beträgt etwa zwei Jahre; längere Kälteperioden können sie verkürzen.

### Niederbatterie-Signal

Bei einer schwachen Senderbatterie zeigt die WiPro nach dem Betätigen des Handsenders folgende Hinweise:

- Aus der WiPro III-Zentrale ertönt etwa **2 Sekunden** lang ein Signalton.
- Die rote Sende-LED am Handsender erlischt erst nach ungefähr **30 Sekunden**.

### Batteriewechsel

1. Die Schrauben am Gehäuse entfernen und den Handsender öffnen.
2. Die verbrauchte Knopfzelle entnehmen.
3. Eine neue **CR2032, 3 V** mit korrekter Polung einsetzen.
4. Die Knopfzelle möglichst nicht an den Kontaktflächen mit bloßen Fingern berühren.
5. Das Gehäuse schließen und wieder verschrauben.
6. Die Funktion am Fahrzeug prüfen.

Nach dem Batteriewechsel ist **kein erneutes Anlernen** erforderlich.

> **VORSICHT:** Bei unsachgemäßem Batteriewechsel besteht Explosionsgefahr. Nur den vorgesehenen Batterietyp verwenden, auf die richtige Polung achten und verbrauchte Knopfzellen dem Batterierecycling zuführen.

Wenn eine CR2032-Funkkomponente wegen schwacher Batterie auffällt, empfiehlt sich die zeitnahe Prüfung weiterer Knopfzellen ähnlichen Alters. Das gilt insbesondere für Funk-Handsender, Funk-Magnetkontakte und Funk-Kabelschleifen; andere Zubehörprodukte können eine abweichende Stromversorgung besitzen.

---

## Störungen eingrenzen

| Beobachtung | Mögliche Ursache | Maßnahme |
|-------------|------------------|----------|
| Keine Reaktion auf Tastendruck | Handsender nicht angelernt | Handsender nach dem vorgesehenen Verfahren anlernen |
| 2 Sekunden Signalton, rote Sender-LED bleibt lange an | CR2032 schwach | Batterie ersetzen und Funktion prüfen |
| Funktion nur in geringer Entfernung | Batterie schwach oder Funkweg abgeschirmt | Batterie prüfen; Abstand und Position zur WiPro III verändern |
| Alarm lässt sich bedienen, Fahrzeug wird aber nicht ver- oder entriegelt | keine oder nicht kompatible safe.lock-Anbindung | Fahrzeugprofil, Verkabelung und Softwarestand prüfen lassen |
| Panikalarm startet nicht | Tastenkombination passt nicht zum Serienstand | Seriennummer prüfen und den passenden Tastenablauf verwenden |

Bei ungeklärten Reichweiten- oder Bedienproblemen vollständige Seriennummern von WiPro III und Handsender, Batteriezustand, Fahrzeugdaten und Einbausituation für den Support dokumentieren.

---

## Häufige Fragen (FAQ)

**Mit welchen Systemen ist der Funk-Handsender 868 kompatibel?**  
Mit der WiPro III-Produktfamilie. Eine Verwendung mit anderen Funksystemen ist nicht vorgesehen.

**Verriegelt der Handsender immer auch das Fahrzeug?**  
Nein. Er schaltet die Alarmanlage scharf oder unscharf. Die Zentralverriegelung wird nur bei kompatibler WiPro III safe.lock-Anbindung und passendem Fahrzeugprofil mitbedient.

**Welche Batterie wird benötigt?**  
Eine CR2032-Knopfzelle mit 3 V. Die typische Lebensdauer beträgt etwa zwei Jahre.

**Muss der Handsender nach einem Batteriewechsel neu angelernt werden?**  
Nein. Nach dem Wechsel sind lediglich Polung, Gehäusemontage und Funktion zu prüfen.

**Wie erkenne ich eine schwache Batterie?**  
Beim Betätigen ertönt etwa 2 Sekunden lang ein Signalton aus der WiPro III-Zentrale; die rote Sende-LED am Handsender bleibt ungefähr 30 Sekunden aktiv.

**Wie beende ich einen Panikalarm?**  
Eine beliebige Taste am Funk-Handsender drücken.

---

## Konformität und Entsorgung

Der Funk-Handsender entspricht laut Hersteller den Anforderungen der Richtlinie **2014/53/EU**. Die Konformitätserklärung ist im Supportbereich von THITRONIK verfügbar: `https://www.thitronik.de/support`

Das Gerät und verbrauchte Batterien nicht über den Hausmüll entsorgen. Knopfzellen getrennt dem Batterierecycling zuführen.

---

## Querverweise

- [[WiPro III — Funk-Alarmsystem für Freizeitfahrzeuge|WiPro III]]
- [[Anlernvorgang — Funk-Zubehör an WiPro III anlernen|Anlernvorgang]]
- [[Zugangsmedien & Bedienung — Zutrittswege im THITRONIK-System|Zugang und Bedienung]]
- [[Funk-Magnetkontakt 868 — Montage und Betrieb|Funk-Magnetkontakt 868]]
- [[Funk-Kabelschleife 868 — Außensicherung für mobile Güter|Funk-Kabelschleife 868]]
- [[Pro-Finder — GSM/GPS Telemetriemodul|Pro-Finder]]
