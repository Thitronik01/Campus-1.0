# Stromversorgung & Standzeiten — Ruhestrom, Unterspannung und Ladepraxis

Route: /de/stromversorgung-standzeiten | Stand: 2026-07-15 | Sichtbarkeit: standard
Quelle: Thitronik Online/project-data/runtime/wiki/wiki-articles/de/stromversorgung-standzeiten.json

---
Stromversorgung & Standzeiten — Ruhestrom, Unterspannung und Ladepraxis

Querschnittsseite für Supportfälle rund um leere Starterbatterien , längere Standzeiten und das Unterspannungsverhalten des Pro-Finder .

## Richtwerte für THITRONIK-Komponenten im Standby

Komponente | Richtwert | Einordnung | 
 WiPro III safe.lock | ca. 11 mA | Ruhestrom der Alarmzentrale im Standby | 
 Pro-Finder | ca. 16–25 mA | abhängig vom Betriebszustand des Mobilfunkmoduls | 
 Kombination | ca. 27–36 mA | nur THITRONIK-Komponenten, ohne Fahrzeuggrundlast | 

Wichtig: Diese Werte beschreiben nur die THITRONIK-Komponenten. Wegfahrsperre, Steuergeräte, Funkempfänger, Türsysteme oder andere Kriechströme des Fahrzeugs kommen zusätzlich hinzu.

## Warum die Starterbatterie trotzdem leer werden kann

Moderne Fahrzeuge haben auch ohne Alarmanlage eine eigene Dauerlast.

Jede Blei-Batterie entlädt sich zusätzlich selbst.

Die praktisch nutzbare Kapazität liegt oft nur bei etwa 50–80 % der Nennkapazität.

### Selbstentladung als Faustwert

Batterietyp | Typischer Wert | 
 Nass-/Blei-Säure | ca. 5–10 % Kapazitätsverlust pro Monat bei Raumtemperatur | 
 AGM | etwa halb so schnell | 

## Beispielrechnung

Bei einer Dauerlast von 50 mA werden pro Tag etwa 1,2 Ah verbraucht.

Annahme | Ergebnis | 
 60 Ah rein rechnerisch | ca. 50 Tage bis vollständig entladen | 
 30 Ah praktisch nutzbar | ca. 25 Tage | 
 48 Ah praktisch nutzbar | ca. 40 Tage | 

Praxis: Diese Beispielrechnung ist idealisiert. Batteriezustand, Temperatur, Batterietyp und zusätzliche Fahrzeuglasten verkürzen die reale Standzeit oft deutlich.

## Unterspannung beim Pro-Finder

Bei einer Versorgungsspannung von 11,2 V sendet der Pro-Finder eine Warn-SMS.

Danach geht das Gerät in eine Pause / einen Standby-Zustand und sendet bzw. empfängt keine Befehle mehr.

Die Batterie sollte ab diesem Zeitpunkt zeitnah geladen werden, um Zellschäden zu vermeiden.

Für die restlichen Spannungsschwellen und die Rückkehr in den Normalbetrieb siehe Pro-Finder .

## Praxisempfehlungen für längere Standzeiten

Fahrzeug vor der Standzeit mit möglichst voller Starterbatterie abstellen.

Ladeerhaltung je nach Batteriezustand spätestens nach etwa zwei Wochen einplanen.

Bei regelmäßig langen Standzeiten größere Batterie, zusätzliche Kapazität oder Ladeerhaltung über Solar/Ladegerät prüfen.

Nach einer 11,2-V-Warnung die Batterie nicht weiter unbeaufsichtigt stehen lassen.

## Einordnung für Supportfälle

Aussage | Bedeutung | 
 „Nur die Alarmanlage hat die Batterie leergezogen." | In der Regel zu kurz gegriffen; entscheidend ist die Summe aus THITRONIK-Verbrauch, Fahrzeuggrundlast, Selbstentladung und Batteriezustand. | 
 „Der Pro-Finder reagiert plötzlich nicht mehr." | Nach Unterspannung kann das Gerät im Standby sein; zuerst Batteriespannung prüfen. | 
 „Das Fahrzeug steht viele Wochen ohne Bewegung." | Ohne Ladeerhaltung ist das ein generelles Batteriethema, nicht nur ein Thema der Alarmanlage. | 

## Querverweise

WiPro III 

Pro-Finder 

Störungsbeseitigung
