# Adria Coral / Matrix (ab Modelljahr 2021) — Wohnmobil-Aufbauhinweis

Route: /de/fahrzeuge/adria-coral-matrix | Stand: 2026-07-19 | Sichtbarkeit: standard
Quelle: Thitronik Online/project-data/runtime/wiki/wiki-articles/de/fahrzeuge/adria-coral-matrix.json

---
Adria Coral / Matrix (ab Modelljahr 2021) — Wohnmobil-Aufbauhinweis

Bei Adria Coral und Matrix ab Modelljahr 2021 mit der neuen Version der Aufbautür kann die elektrische Ausführung des Aufbautürkontakts nach dem Einbau einer WiPro III oder WiPro III safe.lock regelmäßig einen CAN-Bus -Alarm auslösen. Dieser Artikel beschreibt die dafür vorgesehene Anpassung am Adria-Aufbau.

Abgrenzung: Dies ist keine eigene Basisfahrzeug-Konfiguration. DIP-Stellung, CAN-Anschluss und weitere Leitungsbelegungen richten sich ausschließlich nach der aktuellen Anleitung des tatsächlich verwendeten Basisfahrzeugs und der verbauten WiPro-Ausführung.

## Geltungsbereich

Merkmal | Vorgabe | 
 Aufbauhersteller | Adria | 
 Baureihen | Coral und Matrix | 
 Modelljahr | ab 2021 | 
 Türversion | neue Version der Aufbautür | 
 Alarmsystem | WiPro III oder WiPro III safe.lock | 
 Quellenstand | August 2021 | 

Weichen Fahrzeug, Aufbau, Stecker, Leitungsfarbe oder Einbausituation von der Herstellerabbildung ab, darf die Leitung nicht auf Verdacht getrennt werden. In diesem Fall sind Fahrzeughersteller oder THITRONIK Support einzubeziehen.

## Fehlerbild und Ursache

Nach dem Einbau der Alarmanlage wird in regelmäßigen Abständen von 15 Minuten ein CAN-Bus-Alarm ausgelöst, obwohl kein Einbruch vorliegt.

Die Ursache ist die von Adria gewählte elektrische Installation des Aufbautürkontaktschalters. Dessen Signale werden von der WiPro III beziehungsweise WiPro III safe.lock als Alarmauslösung ausgewertet.

Beobachtung | Einordnung | 
 Alarm ungefähr alle 15 Minuten | typisches Fehlerbild dieses Aufbauhinweises | 
 Alarmquelle | CAN-Bus-Auswertung des Aufbautürkontakts | 
 Abhilfe | serienmäßige Überwachung dieses Kontakts außer Kraft setzen und durch Funk-Magnetkontakt 868 ersetzen | 

## Erforderliche Maßnahme

Die serienmäßige Überwachung der Aufbautür über den betroffenen Adria-Leitungskreis wird deaktiviert. Anschließend übernimmt ein Funk-Magnetkontakt 868 die Überwachung der Aufbautür.

Wichtig: Ohne den montierten und erfolgreich angelernten Funk- Magnetkontakt wird die Aufbautür nach der Leitungstrennung nicht mehr durch die WiPro überwacht.

## Sicherheit und Vorbereitung

Arbeiten an Fahrzeugelektrik und -elektronik nur durch eine qualifizierte Fachwerkstatt ausführen lassen.

Die allgemeinen Sicherheitshinweise der WiPro-Installationsanleitung und die Vorgaben des Basisfahrzeugs beachten.

Vor elektrischen Arbeiten Fahrzeug und Alarmanlage nach den einschlägigen Anweisungen spannungsfrei schalten.

Vor dem Trennen die weiß/braune Leitung anhand der originalen Herstellerabbildung und der tatsächlichen Einbausituation eindeutig identifizieren.

Nicht verwendete Ein- und Ausgänge sowie beide getrennten Leitungsenden fachgerecht isolieren.

Bei jeder Abweichung von der dokumentierten Ausführung die Arbeit unterbrechen und technische Freigabe einholen.

## Arbeitsschritte

Zugang zur Aufbauherstellerschnittstelle an der B-Säule auf der Beifahrerseite herstellen.

Stecker und Leitungsverlauf mit der Herstellerabbildung vergleichen.

Die weiß/braune Leitung eindeutig identifizieren.

Die weiß/braune Leitung an der dokumentierten Stelle trennen.

Beide Leitungsenden einzeln, dauerhaft und gegen Kurzschluss geschützt isolieren.

Einen Funk-Magnetkontakt 868 an der Aufbautür montieren.

Den Funk-Magnetkontakt gemäß Anlernvorgang an der WiPro einlernen.

Anlage wieder in Betrieb nehmen und die vollständige Funktionsprüfung durchführen.

Die Montageposition, Abstände und Befestigung des Funk-Magnetkontakts richten sich nach dessen eigener Montageanleitung .

## DIP- und Basisfahrzeug-Konfiguration

Der Adria-Aufbauhinweis enthält keine eigene DIP-Kombination . Die Schalterstellung darf durch diese Maßnahme nicht pauschal geändert werden.

Basisfahrzeug und Modelljahr bestimmen.

Seriennummer und Softwarestand der WiPro dokumentieren.

DIP-Stellung aus der aktuellen fahrzeugspezifischen Anleitung übernehmen.

Bei einem Fiat Ducato 8/9 der Baujahre 2022–2024 zusätzlich die Hinweise unter Fiat Ducato 2022–2024 beachten.

Weitere Profile stehen in der Fahrzeugkompatibilität .

## Ergebnis der Anpassung

Nach fachgerechter Ausführung gelten laut Herstellerhinweis folgende Funktionen:

Die Funktion der originalen Zentralverriegelung bleibt vollständig erhalten.

Die Fahrzeugvordertüren lassen sich auch bei geöffneter Aufbautür verriegeln.

Der Funk-Magnetkontakt 868 stellt die Alarmüberwachung der Aufbautür wieder her.

Die wiederkehrende CAN-Bus-Alarmauslösung durch den ursprünglichen Aufbautürkontakt wird beseitigt.

## Funktionsprüfung

Alle Fahrzeug- und Aufbautüren schließen.

WiPro scharfschalten und prüfen, ob die Anlage den geschlossenen Funk-Magnetkontakt akzeptiert.

Aufbautür öffnen und sicherstellen, dass der Funk-Magnetkontakt einen Alarm auslöst.

Aufbautür geöffnet lassen und prüfen, ob sich die Fahrzeugvordertüren weiterhin verriegeln lassen.

Jede weitere überwachte Tür und jedes Funk-Zubehör einzeln prüfen.

Einen vollständigen Testalarm auslösen und Sirene beziehungsweise Hupe sowie Blinker kontrollieren.

Die Anlage länger als das bisherige 15-Minuten-Intervall scharfgeschaltet beobachten und sicherstellen, dass kein unbegründeter CAN-Bus-Alarm mehr auftritt.

## Wenn der Fehler bestehen bleibt

Prüfung | Maßnahme | 
 Alarm weiterhin im 15-Minuten-Rhythmus | Leitungsauswahl und vollständige elektrische Trennung der weiß/braunen Leitung prüfen. | 
 Aufbautür löst keinen Alarm aus | Montage, Abstand, Batterie und Anlernstatus des Funk-Magnetkontakts prüfen. | 
 Zentralverriegelung verhält sich unerwartet | Änderungen stoppen, Leitungsenden und fahrzeugspezifische Anschlüsse prüfen; keine weiteren Leitungen auf Verdacht trennen. | 
 Fahrzeug weicht von der Abbildung ab | Hersteller oder THITRONIK Support kontaktieren und fahrzeugspezifische Freigabe einholen. | 

Weitere systemübergreifende Prüfungen beschreibt Störungsbeseitigung .

## Quelle

THITRONIK, Installationshinweise WiPro III und WiPro III safe.lock — Adria, Coral und Matrix ab Modelljahr 2021, neue Version Aufbautür , Stand 08/21 , zwei Seiten.

## Querverweise

WiPro III 

Funk-Magnetkontakt 868 

Anlernvorgang 

Fiat Ducato 2022–2024 

Fahrzeugkompatibilität 

Störungsbeseitigung
