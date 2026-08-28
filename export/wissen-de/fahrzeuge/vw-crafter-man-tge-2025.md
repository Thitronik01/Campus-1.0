# VW Crafter / MAN TGE (2025+, mit Startknopf)

Route: /de/fahrzeuge/vw-crafter-man-tge-2025 | Stand: 2026-07-22 | Sichtbarkeit: standard
Quelle: Thitronik Online/project-data/runtime/wiki/wiki-articles/de/fahrzeuge/vw-crafter-man-tge-2025.json

---
VW Crafter / MAN TGE (2025+, mit Startknopf)

Diese Seite gilt für VW Crafter II und MAN TGE ab Modelljahr 2025 mit Startknopf. Die aktuelle THITRONIK-Produktseite bestätigt das WiPro III safe.lock Set 105458 für VW Crafter II und MAN TGE, nennt für Fahrzeuge mit Startknopf jedoch eine wichtige Einschränkung: Die Zentralverriegelung kann derzeit nicht durch WiPro III safe.lock angesteuert werden.

Freigabegrenze: Für diese Generation liegt lokal keine aktuelle fahrzeugspezifische Einbauanleitung vor. Deshalb enthält diese Seite bewusst keine freigegebenen DIP-, Pin- oder Fahrzeugleitungsangaben. Vor dem Einbau ist die aktuelle, fahrzeug- und gerätespezifische THITRONIK-Anleitung zu beschaffen.

## Überblick

Parameter | Verifizierter Stand | 
 Fahrzeug | VW Crafter II / MAN TGE mit Startknopf | 
 Modelljahr | ab 2025 | 
 Gerätesatz | WiPro III safe.lock, Art. 105458 | 
 Zentralverriegelung über THITRONIK-Zubehör | derzeit nicht ansteuerbar | 
 Alarmfunktion | separat in der Abnahme vollständig prüfen | 
 Akustischer Alarm | Zusatzhupe wird vom Hersteller für diesen Fahrzeugtyp dringend empfohlen | 
 DIP-Profil | in der aktuellen öffentlichen Quelle nicht fahrzeugspezifisch angegeben | 
 Mindestseriennummer / Mindestsoftware | für diese 2025+-Variante nicht aktuell öffentlich belegt | 
 Einbauverdrahtung | nur nach aktueller fahrzeugspezifischer Anleitung | 

## Quellenlage und verworfene Altangaben

Die frühere Fassung verwies auf vier lokale DOCX-/CSV-Dateien. Keine dieser Dateien ist im Projekt oder im vorhandenen THITRONIK-Archiv auffindbar. Die Angaben dürfen daher nicht als freigegebene Einbaudaten weitergeführt werden.

Altangabe | Redaktionsentscheidung | 
 SW3 ON | nicht durch die aktuelle öffentliche Fahrzeugquelle belegt; nicht einstellen, bevor die passende Anleitung vorliegt | 
 5458-010 / 1.2.1sx | fehlende Seriennummernliste; nicht als Mindeststand veröffentlichen | 
 BCM Stecker A Pin 20/21 und Stecker C Pin 42 | fehlende fahrzeugspezifische Einbauanleitung; nicht anschließen | 
 WiPro-Leitungsfarben für CAN, Zündung und Warnblinker | ohne zugehörigen Schaltplan nicht freigegeben | 
 Zusatzhupe oder Back-up Sirene „zwingend“ | zu streng formuliert; die aktuelle FAQ empfiehlt für diesen Fahrzeugtyp dringend eine Zusatzhupe | 

## Abgrenzung zur Generation 2017–2024

Diese Seite gilt ausschließlich für Fahrzeuge mit Startknopf ab 2025.

Für Fahrzeuge ohne Startknopf der Modelljahre 2017–2024 gilt VW Crafter / MAN TGE (2017–2024, ohne Startknopf) .

Das dort dokumentierte Standard-WiPro-III-Profil SW2 + SW3 + SW4 + SW6 darf nicht auf diese safe.lock-Variante übertragen werden.

Ebenso dürfen ältere safe.lock-Werte, ein Sleep-Mode-Test oder BCM-Pins nicht ohne aktuelle Freigabe übernommen werden.

Fahrzeug, Modelljahr, Startsystem, Gerätesatz, Seriennummer und Software müssen zusammen zur verwendeten Anleitung passen.

## Zentralverriegelung: bekannte Einschränkung

Bei Fahrzeugen mit Startknopf kann WiPro III safe.lock die Zentralverriegelung derzeit nicht ansteuern. Daraus folgen drei klare Regeln:

Mit THITRONIK-Zubehör darf für diese Variante kein Ver- oder Entriegeln des Fahrzeugs versprochen werden.

Scharf-/Unscharfschaltung und Alarmüberwachung sind bei der Abnahme getrennt von der Fahrzeugverriegelung zu prüfen.

Die Bezeichnung „safe.lock“ ist der Produktname des Sets; sie ist bei dieser Fahrzeugvariante kein Nachweis einer nutzbaren ZV-Ansteuerung.

Der Kunde muss vor Übergabe über die Einschränkung informiert werden.

## Vor dem Einbau prüfen

Fahrzeug als VW Crafter II oder MAN TGE identifizieren.

Modelljahr 2025 oder neuer anhand der Fahrzeugunterlagen bestätigen.

Startknopf als Abgrenzungsmerkmal dokumentieren.

Artikelnummer , Seriennummer und Softwarestand der gelieferten Zentrale notieren.

Prüfen, ob tatsächlich Set 105458 vorliegt.

Aktuelle fahrzeugspezifische THITRONIK-Anleitung für genau diese Variante beschaffen.

DIP-Stellung, Kabelsatz, Sicherung, Abgriffstellen und zulässige Alarmmittel mit dieser Anleitung abgleichen.

Bei fehlender oder widersprüchlicher Freigabe den Einbau stoppen und THITRONIK-Support beziehungsweise Fachhändler einbeziehen.

## DIP, Software und Verdrahtung

Für die Startknopf-Generation werden auf dieser Seite keine DIP-Stellung und kein Mindeststand freigegeben. Auch die im Altbestand genannten BCM-Anschlüsse sind nicht belastbar.

Keine DIP-Schalter aus der 2017–2024-Anleitung übernehmen.

SW3 nicht allein aufgrund der alten Wiki-Fassung aktivieren.

5458-010 / 1.2.1sx nicht als Freigabeschwelle verwenden.

Fahrzeugleitungen nicht nur nach Farbe identifizieren; Stecker, Pin, Signal und Messwert müssen gemeinsam passen.

Versorgung, Masse, CAN, Zündung, Warnblinker, Hupe und Sirene ausschließlich nach der aktuellen Anleitung anschließen.

Nach Software- oder Fahrzeugupdate die Kompatibilität erneut prüfen.

Siehe auch Fahrzeugkompatibilität — Übersichtsmatrix & DIP-Grundlagen und Seriennummern und Softwarestände — Präfixe, Schwellen und Meilensteine .

## Akustischer Alarm

Die THITRONIK-FAQ weist darauf hin, dass die Fahrzeughupe bei diesem Fahrzeugtyp nur bei eingeschalteter Zündung arbeitet und empfiehlt deshalb dringend eine Zusatzhupe.

Vor der Montage prüfen, ob die Fahrzeughupe bei ausgeschalteter Zündung tatsächlich verfügbar ist.

Akustisches Alarmmittel nach aktueller Anleitung auswählen und absichern.

Eine Zusatzhupe nicht mit einer Back-up Sirene gleichsetzen; Anschluss und Funktion unterscheiden sich.

Bei der Abnahme einen realen Alarm bei ausgeschalteter Zündung auslösen.

Alarmton außerhalb des Fahrzeugs kontrollieren und das Ergebnis dokumentieren.

Weitere Grundlagen stehen unter Sirenen und Hupen — Akustische Alarmmittel .

## Sichere Einbaureihenfolge

Batterie- und Fahrzeugherstellervorgaben beachten.

Vor Arbeiten an der Fahrzeugelektrik die Anlage spannungsfrei schalten.

Einbauort der Zentrale trocken, geschützt und servicezugänglich wählen.

Kabel gegen Scheuern, Zug, Hitze und Feuchtigkeit sichern.

Sicherung erst nach vollständiger Verdrahtungsprüfung einsetzen.

DIP-Schalter nur nach der aktuellen fahrzeugspezifischen Anleitung setzen.

Jeden Fahrzeugabgriff elektrisch messen und mit Stecker sowie Pin dokumentieren.

Keine ZV-Leitung anschließen, wenn die Anleitung für die Startknopf-Variante keine Freigabe enthält.

Funk-Zubehör erst nach stabiler Spannungsversorgung anlernen.

Abschließend alle Alarmwege einzeln prüfen.

## Inbetriebnahme und Abnahme

Versorgungsspannung und Ruhestrom auf Plausibilität prüfen.

Zündung EIN/AUS und Startknopf-Erkennung prüfen.

Jede serienmäßige Fahrerhaustür einzeln öffnen und auf Alarmauslösung prüfen.

Aufbau-, Heck-, Schiebe- und Staufachtüren einzeln prüfen.

Nicht über den Fahrzeugbus erfasste Öffnungen mit Funk-Magnetkontakten absichern.

Funk-Handsender und optionales NFC Modul getrennt testen.

Scharf- und Unscharfschaltung mehrfach prüfen.

Zentralverriegelung separat prüfen und die bekannte Nichtansteuerbarkeit protokollieren.

Warnblinker und akustisches Alarmmittel bei ausgeschalteter Zündung prüfen.

Panikalarm und Alarmabbruch testen.

Starterbatterie-Ruheverhalten nach Fahrzeugvorgabe kontrollieren.

Kundenübergabe mit dokumentiertem Funktionsumfang durchführen.

## Bedienhinweise

Die allgemeine Kurzanleitung Rev. 1.3 beschreibt Funk- Handsender , Panikalarm, Vent-check , Alarmablauf und Alarmspeicher. Bei dieser Fahrzeugvariante hat jedoch die fahrzeugspezifische Einschränkung Vorrang: Eine Betätigung des THITRONIK-Zubehörs darf nicht als Nachweis gelten, dass das Fahrzeug tatsächlich ver- oder entriegelt wurde.

Bedienung und Rückmeldungen immer am realen Fahrzeug prüfen.

Verriegelungszustand vor dem Entfernen vom Fahrzeug kontrollieren.

Funk-Handsender 868 — Fernbedienung für WiPro III und NFC Modul — Steuerung der WiPro via NFC nur im freigegebenen Funktionsumfang erklären.

Nach einem Alarm den Alarmspeicher auswerten und die Ursache beseitigen.

## Technische Produktdaten

Die folgenden Werte stammen aus der allgemeinen WiPro III safe.lock Kurzanleitung Rev. 1.3 ; sie ersetzen keine fahrzeugspezifische Anschlussfreigabe.

Merkmal | Wert | 
 Versorgung der Zentrale | 9–30 V | 
 Stromaufnahme | ca. 11 mA | 
 Sirenenausgang | 9–30 V (Uin) / 1 A | 
 Blinkerausgang | 60 W | 
 Funkfrequenz | 868,35 MHz | 
 maximale Anzahl anlernbarer Sender | 100 | 
 Funkreichweite im Freifeld | bis 75 m | 
 Senderbatterie | CR2032 , etwa 2 Jahre | 

## Diagnose

Beobachtung | Prüfung / Maßnahme | 
 THITRONIK-Zubehör schaltet die Alarmanlage, aber nicht die Türen | entspricht der veröffentlichten Einschränkung bei Startknopf-Fahrzeugen; nicht als Verdrahtungsfehler kaschieren | 
 Fahrzeughupe bleibt bei Alarm stumm | Zündung aus; Zusatzhupe und deren freigegebenen Anschluss prüfen | 
 Tür löst keinen Alarm aus | Tür einzeln prüfen; CAN-Erfassung und gegebenenfalls Funk-Magnetkontakt nach aktueller Anleitung klären | 
 Reaktion nach Softwareupdate verändert | Fahrzeug- und WiPro-Software dokumentieren; aktuelle Freigabe erneut einholen | 
 DIP oder Mindeststand unklar | nicht raten; Einbau stoppen und fahrzeugspezifische Anleitung beschaffen | 

## Dokumentation

Zur Fahrzeugakte gehören mindestens:

Fahrzeugmodell, Modelljahr, VIN und Startsystem.

WiPro-Artikelnummer, Seriennummer und Softwarestand.

Versionsstand der verwendeten fahrzeugspezifischen Anleitung.

Tatsächliche DIP-Stellung und alle Abgriffstellen mit Stecker, Pin und Signal.

Verwendetes akustisches Alarmmittel.

Ergebnis jedes Tür-, Funk-, Blinker-, Alarm- und ZV-Tests.

Schriftlicher Hinweis an den Kunden, dass die Zentralverriegelung über THITRONIK-Zubehör derzeit nicht angesteuert wird.

## Quellen

Aktuelle THITRONIK-Produktseite „WiPro III safe.lock“ mit Fahrzeugliste, technischen Daten und FAQ; geprüft am 22.07.2026.

H:/Thitronik WIKI (ml)/wiki/de/wipro_iii_safe.lock.pdf — allgemeine WiPro III safe.lock Kurzanleitung, Rev. 1.3 , zwei Seiten vollständig textlich und visuell geprüft.

Die früher genannten Dateien Seriennummer 5458 Wipro III safe.lock Sprinter Set.csv , MAN TGE.docx , Fahrzeugbesonderheiten.docx und Wi Pro III 11safe.lock.docx fehlen lokal und wurden nicht als Beleg verwendet.

## Querverweise

WiPro III — Funk-Alarmsystem für Freizeitfahrzeuge 

Fahrzeugkompatibilität — Übersichtsmatrix & DIP-Grundlagen 

Seriennummern und Softwarestände — Präfixe, Schwellen und Meilensteine 

Sirenen und Hupen — Akustische Alarmmittel 

Funk-Handsender 868 — Fernbedienung für WiPro III 

NFC Modul — Steuerung der WiPro via NFC 

VW Crafter / MAN TGE (2017–2024, ohne Startknopf)
