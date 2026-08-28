# Renault Master (2019–2024) — safe.lock

Route: /de/fahrzeuge/renault-master-2019 | Stand: 2026-07-21 | Sichtbarkeit: standard
Quelle: Thitronik Online/project-data/runtime/wiki/wiki-articles/de/fahrzeuge/renault-master-2019.json

---
Renault Master (2019–2024) — safe.lock 

Dieser Artikel beschreibt den belegten Projektstand für die WiPro III safe.lock im Renault Master der Modelljahre 2019–2024 mit dem fahrzeugspezifischen Set Art. 105832 . Hersteller-Produktseite, Herstellerhinweis vom 16.07.2025, Kurzanleitung Rev. 1.3 und die freigegebenen Projektregister werden mit klarer Quellenabgrenzung zusammengeführt.

Freigabegrenze: Die drei im Altbestand genannten internen Dateien sind lokal nicht vorhanden. Die öffentlich zugänglichen Herstellerquellen enthalten keine fahrzeugspezifische Stecker-, Pin-, Leitungsfarben-, Sicherungs- oder DIP-Tabelle. Solche Werte aus dem Altbestand werden deshalb nicht als freigegebene Einbauangaben fortgeführt. Vor dem Einbau ist die aktuelle fahrzeugspezifische THITRONIK-Werkstattunterlage für Set 105832 erforderlich.

## Geltungsbereich und belegter Stand

Merkmal | Freigegebener Stand | 
 Fahrzeug | Renault Master | 
 Modellzeitraum | 2019–2024 | 
 Produkt | WiPro III safe.lock, fahrzeugspezifisches Set Art. 105832 | 
 Mindestseriennummer | 5832-001 | 
 Softwarebasis | 1.0.0sr | 
 öffentliche Verfügbarkeit | Herstellerankündigung vom 16.07.2025 | 
 Original-Fahrzeugschlüssel | verriegelt und entriegelt ausschließlich das Fahrzeug; steuert den Alarmzustand nicht | 
 gleichzeitige Fahrzeug- und Alarmbedienung | Funk-Handsender oder anderes kompatibles THITRONIK-Zubehör verwenden | 

Seriennummer und Softwarezweig vor dem Einbau am Typenschild prüfen. Höhere laufende Nummern dürfen nur innerhalb der Produktlinie 5832- als spätere Stände eingeordnet werden. Siehe Seriennummern und Softwarestände und Fahrzeugkompatibilität .

## Quellenrang und bereinigter Altbestand

Thema | Quellenentscheidung | 
 Modellzeitraum, Set und Mindeststand | durch die aktuelle THITRONIK-Produktseite bestätigt | 
 besondere Bedienlogik | durch Produktseite und Herstellerhinweis vom 16.07.2025 bestätigt | 
 allgemeine Bedienung und Systemwerte | durch die visuell geprüfte Kurzanleitung Rev. 1.3 bestätigt | 
 Versionszeile 5832-001 / 1.0.0sr | zusätzlich im freigegebenen Projektregister dokumentiert | 
 interne DOCX-/CSV-Quellen | lokal nicht vorhanden; nicht als eingesehener Beleg behandelt | 
 frühere P201-, Versorgungs- und Hupenangaben | ohne zugängliche Primärquelle nicht freigegeben und bewusst nicht als Anschlussanweisung wiederholt | 
 frühere Campingmodus-Aussage | nicht in den Renault-spezifischen Herstellerhinweisen belegt und deshalb entfernt | 

Die Freigabe dieses Artikels bestätigt damit den belegten Einsatzbereich und die Bedienlogik. Sie ersetzt nicht die fahrzeugspezifische Werkstattunterlage und keine Messung am konkreten Fahrzeug.

## Sicherheit und Vorprüfung

Einbau und Arbeiten an Fahrzeugelektrik dürfen nur qualifizierte Fachwerkstätten ausführen.

Vor elektrischen Arbeiten Batterie-Minus und vorhandene Zusatzbatterien nach Renault- und Aufbauherstellervorgabe trennen.

Airbag-, Lenkungs-, Brems-, Wegfahrsperren- und andere Sicherheitssysteme dürfen weder geprüft noch angezapft oder behindert werden.

Anschlussstellen nie allein nach Leitungsfarbe wählen; Stecker, Pin, Spannung, Signalart und Funktion müssen gemeinsam stimmen.

Ungenutzte Leitungen einzeln gegen Kurzschluss isolieren; Kabel gegen Scheuern, Hitze, Vibration und Zug sichern.

Bei anderem Modelljahr, abweichendem Steckerbild, fehlender Leitung oder widersprüchlicher Unterlage Arbeit stoppen und THITRONIK-Support kontaktieren.

Vor Beginn prüfen und dokumentieren:

Handelt es sich tatsächlich um einen Renault Master der Modelljahre 2019–2024?

Ist Set Art. 105832 vorhanden?

Beginnt die Seriennummer mit 5832- und liegt mindestens bei 5832-001 ?

Zeigt das Gerät Software 1.0.0sr oder einen von THITRONIK für dieses Fahrzeug freigegebenen neueren Stand?

Liegt die aktuelle fahrzeugspezifische Werkstattunterlage vor und stimmt deren Revision mit Set und Fahrzeug überein?

Funktionieren Fahrzeugschlüssel, Zentralverriegelung, Warnblinker, Zündung, Türen und vorhandene Zusatzkontakte vor dem Eingriff fehlerfrei?

Sind vorhandene Fehlerspeichereinträge, Umbauten und Aufbauvarianten dokumentiert?

## Verbindliche fahrzeugspezifische Werkstattunterlage

Vor dem ersten Abgriff müssen aus der aktuellen Unterlage für Set 105832 eindeutig hervorgehen:

Prüfpunkt | Erforderlicher Nachweis | 
 Geräteprofil | vollständige DIP-Stellung für genau diese Geräte- und Softwareversion | 
 Fahrzeugkommunikation | Stecker, Pin, Leitungsfarbe und CAN-High-/CAN-Low-Zuordnung | 
 safe.lock/Zentralverriegelung | vorgesehener Ausgang, Fahrzeugleitung und zulässige Ansteuerung | 
 Warnblinker | Stecker, Pin, Leitung und Signalart | 
 Versorgung | Klemme 30 , Klemme 15 , Klemme 31, Leitungsquerschnitt und Sicherung | 
 akustischer Alarm | freigegebene Hupen- oder Sirenenschaltung einschließlich Ausgangsbelastung | 
 Montage | zulässiger Einbauort, Demontageweg und sichere Kabelführung | 

Dokumenttitel, Revision und Bezugsquelle in der Arbeitskarte notieren.

Fahrzeug und Steckerbild mit der Unterlage abgleichen.

Jede Leitung vor dem Anschließen messen und die Messung dokumentieren.

DIP-Stellung fotografieren, bevor die Zentrale geschlossen wird.

Abweichungen nicht durch Werte anderer Renault-Master-Generationen oder baugleicher Fahrzeuge ersetzen.

Die frühere P201-Tabelle dieses Artikels nicht als Arbeitsunterlage verwenden.

## Belegte allgemeine Systemdaten

Die folgenden Werte stammen aus der THITRONIK-Kurzanleitung Rev. 1.3 ; sie geben keine fahrzeugspezifische Anschlussstelle vor.

Größe | Wert | 
 Versorgung der Zentrale | 9–30 V | 
 Stromaufnahme | ca. 11 mA | 
 Sirenenausgang | 9–30 V entsprechend Eingangsspannung, max. 1 A | 
 Blinkerausgang | max. 60 W | 
 anlernbare Sender | max. 100 | 
 Empfangs-/Sendefrequenz | 868,35 MHz | 
 Sendeleistung des Funkzubehörs | <10 mW | 
 Reichweite im Freifeld | bis 75 m | 
 Senderbatterie | CR2032 , 3 V , typische Lebensdauer ca. zwei Jahre | 
 Temperaturbereich Zentrale | −10 °C bis +80 °C | 
 Temperaturbereich Funkzubehör | −10 °C bis +60 °C | 

Die Hersteller-Produktseite nennt außerdem die Ausführung für 12- oder 24-V-Fahrzeuge, ECE-R10-Zulassung, Schutzklasse IP 40 , etwa 102 dB , Abmessungen 80 × 29 × 80 mm und ein Gewicht der Zentrale von 90 g .

## Bedienlogik des Renault Master

Beim Renault Master 2019–2024 sind Fahrzeugverriegelung und Alarmzustand bei Verwendung des Originalschlüssels getrennt:

Der Original-Fahrzeugschlüssel verriegelt oder entriegelt die Türen.

Der Original-Fahrzeugschlüssel schärft oder entschärft die WiPro III safe.lock nicht.

Für gleichzeitiges Verriegeln und Schärfen beziehungsweise Entriegeln und Entschärfen ist der Funk- Handsender oder ein anderes kompatibles THITRONIK-Zubehör erforderlich.

Je nach eingebauter Systemkombination können NFC Modul oder THITRONIK App als weitere Bedienwege dienen; ihre Einrichtung ist in den jeweiligen Produktartikeln beschrieben.

Der Alarmzustand darf nie aus dem Verriegelungszustand der Türen abgeleitet werden. Status-LED und tatsächliche Systemreaktion prüfen.

Aussperr- und Alarmrisiko: Wer nur den Originalschlüssel verwendet, verändert nach Herstellerangabe nicht den Alarmzustand. Vor Übergabe müssen alle Nutzer verstehen, welches Bedienelement Fahrzeug und Alarm gemeinsam steuert.

## Inbetriebnahme und Funktionstest

Alle Anschlüsse, Sicherungen, Massepunkte und das Geräteprofil gegen die aktuelle Werkstattunterlage prüfen.

Fahrzeugbatterie und Zusatzbatterien nach Herstellervorgabe wieder anschließen.

Kontrollieren, dass keine Warnlampen, Fehlermeldungen oder neuen Fehlerspeichereinträge entstanden sind.

Alle Türen und angelernten Kontakte schließen.

Mit kompatiblem THITRONIK-Zubehör verriegeln und schärfen; Türverriegelung, einmalige Blinkerquittierung, akustische Quittierung entsprechend Taste und blinkende Status-LED prüfen.

Mit demselben Zubehör entriegeln und entschärfen; Türentriegelung, zweimalige Blinkerquittierung, akustische Quittierung entsprechend Taste und erloschene Status-LED prüfen.

Mit dem Original-Fahrzeugschlüssel verriegeln und entriegeln; bestätigen, dass nur die Fahrzeugschlösser reagieren und der zuvor gewählte Alarmzustand unverändert bleibt.

Anlage mit THITRONIK-Zubehör schärfen und jede vom Fahrzeug erfasste Tür einzeln öffnen.

Jeden Funk-Magnetkontakt und jedes weitere Funkzubehör einzeln auslösen.

Einen echten Testalarm auslösen und ungefähr 30 Sekunden akustischen sowie 180 Sekunden optischen Alarm einschließlich Status-LED prüfen.

Panikalarm durch gleichzeitiges Drücken beider Tasten des Funk-Handsenders auslösen und mit einer beliebigen Taste beenden.

Empfang, Alarmmeldung und Bedienung an allen vorgesehenen Standorten prüfen.

Erst nach bestandener Prüfung Kabel endgültig sichern, Verkleidungen montieren und das Fahrzeug übergeben.

## Fehlerdiagnose

Symptom | Prüfung und Maßnahme | 
 Originalschlüssel verriegelt, Alarmzustand ändert sich nicht | erwartetes Renault-Verhalten; zum Schärfen oder Entschärfen THITRONIK-Zubehör verwenden | 
 THITRONIK-Zubehör ändert den Alarmzustand, aber nicht die Türverriegelung | fahrzeugspezifischen ZV-Anschluss, aktuelle Werkstattunterlage, Sicherung und Signalprüfung kontrollieren | 
 Keine CAN-Reaktion | Stecker und CAN-High-/CAN-Low-Zuordnung ausschließlich anhand der aktuellen Werkstattunterlage und Messung prüfen | 
 Keine Blinkerquittierung | freigegebenen Warnblinkeranschluss, Ausgangsbelastung und Fahrzeugfunktion prüfen | 
 Keine akustische Alarmierung | dokumentierte Hupen-/Sirenenschaltung und maximal zulässige Ausgangsbelastung prüfen | 
 Funkzubehör reagiert nicht | Anlernvorgang, Batterie, Frequenzkennzeichnung 868 , Reichweite und Abschirmung prüfen | 
 Fahrzeug oder Stecker weicht von der Unterlage ab | Arbeit stoppen; keine Pins oder Farben aus Altbestand oder anderer Generation übernehmen | 
 Softwarestand oder Seriennummer unklar | Typenschild fotografieren und mit Arbeitskarte an THITRONIK-Support eskalieren | 

## Übergabe und Dokumentation

In der Arbeitskarte festhalten:

Fahrzeugmodell, Modelljahr, FIN und relevante Aufbauvariante

Set-Art.-Nr. 105832 , vollständige Seriennummer und Softwarestand

Titel und Revision der verwendeten fahrzeugspezifischen Werkstattunterlage

bestätigte DIP-Stellung und Fotos vor dem Schließen der Zentrale

Messwerte und Lage aller tatsächlich verwendeten Anschlussstellen

Sicherungswert, Montageorte und Leitungswege

angelerntes Zubehör und einzeln geprüfte Alarmquellen

Ergebnis des Tests mit Originalschlüssel und THITRONIK-Zubehör

akustische und optische Alarmdauer sowie mögliche Abweichungen

Fehlerspeicherstatus vor und nach dem Einbau

Bei der Übergabe demonstrieren, dass der Originalschlüssel nur das Fahrzeug verriegelt und entriegelt. Gemeinsam bedient werden Fahrzeug und Alarm über den Funk-Handsender oder anderes passend eingerichtetes THITRONIK-Zubehör.

## Quellenentscheidung

Die aktuelle THITRONIK-Produktseite bestätigt Renault Master 2019–2024, Set Art. 105832 , Mindeststand 5832-001 / 1.0.0sr und die getrennte Bedienlogik des Originalschlüssels.

Der Herstellerhinweis vom 16.07.2025 bestätigt die Verfügbarkeit sowie die Pflicht, zum Schärfen und Entschärfen Funk-Handsender oder anderes THITRONIK-Zubehör zu verwenden.

Die zweitseitige WiPro-III-safe.lock-Kurzanleitung Rev. 1.3 wurde textlich und visuell geprüft; Systemwerte, Quittierungen, Vent-check , Panikalarm und Alarmzeiten wurden daraus übernommen.

Das Projektregister bestätigt den separaten Softwarezweig 5832- und die erste dokumentierte Version 5832-001 / 1.0.0sr .

Fahrzeugbesonderheiten.docx , Seriennummer 5832 Wipro III safe.lock Renault Set .csv und Wipro III 9 safe.lock.docx sind lokal nicht auffindbar. Daher werden keine fahrzeugspezifischen Pins, Leitungsfarben, DIP-Stellungen oder Montagewege aus dem Altbestand freigegeben.

Die alte Campingmodus-Aussage war in den zugänglichen Renault-spezifischen Herstellerquellen nicht belegt und wurde entfernt.

## Querverweise

WiPro III 

Funk-Handsender 868 

NFC Modul 

BT-connect 

Pro-Finder 

Fahrzeugkompatibilität 

Seriennummern und Softwarestände 

Artikelnummern-Register 

Renault Master III — Vorgängergeneration
