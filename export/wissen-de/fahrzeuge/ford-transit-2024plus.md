# Ford Transit / Tourneo Custom / Transit Custom (2024+)

Route: /de/fahrzeuge/ford-transit-2024plus | Stand: 2026-07-19 | Sichtbarkeit: standard
Quelle: Thitronik Online/project-data/runtime/wiki/wiki-articles/de/fahrzeuge/ford-transit-2024plus.json

---
Ford Transit / Tourneo Custom / Transit Custom (2024+)

Dieser Artikel beschreibt den Einbau des Ford-spezifischen WiPro III safe.lock Sets in die neue Fahrzeugelektronik des Ford Transit, Ford Tourneo Custom und Ford Transit Custom. Maßgeblich sind Fahrzeugvariante, Produktionszeitraum, Steckerbezeichnungen, Set- Seriennummer und Softwarestand .

Kritische Abgrenzung: Dieses Profil ist nur für den Campingmodus dokumentiert. Das Fahrzeug mit einem unterstützten THITRONIK® Bedienweg verriegeln. Wird zuerst mit dem Originalschlüssel verriegelt, kann die spätere Entriegelung mit THITRONIK® Zubehör blockiert sein.

## Geltungsbereich

Merkmal | Vorgabe | 
 Fahrzeuge | Ford Transit; Ford Tourneo Custom; Ford Transit Custom | 
 Ford Transit | ab 07/2024 | 
 Tourneo Custom / Transit Custom | ab 08/2023 | 
 System | WiPro III safe.lock Set Ford, Art. 105298 | 
 Mindeststand | 5298-005 / 1.0.1sf | 
 Fahrzeugprofil | SW1 bis SW8 jeweils OFF | 
 Betriebsart | ausschließlich Campingmodus; kein dokumentierter Normalbetrieb | 
 Erkennungsmerkmale | Digitaltacho und, bei entsprechender Automatik-Ausführung, Drehwahlschalter für die Fahrstufen | 

Die genannten Erkennungsmerkmale unterstützen die Zuordnung, ersetzen aber nicht die Prüfung von Modell, Produktionsdatum, Steckerform und Pinbelegung. Für den Ford Transit bis 07/2024 gilt die separate Seite Ford Transit 7G Facelift .

## Seriennummer, Software und Kabelsatz unterscheiden

Ab Set-Seriennummer | Software / Stand | Bedeutung für diesen Einbau | 
 5298-005 | 1.0.1sf | Mindeststand für Ford Transit ab 07/2024 sowie Tourneo Custom / Transit Custom ab 08/2023 ; Campingmodus und Aussperrschutz | 
 5298-006 | Kabelsatzänderung | blaue safe.lock Leitungen besitzen direkte Steckkontakte für J4 Pin 9 und Pin 23 | 
 5298-008 | 1.0.3sf | dokumentierte Korrektur des Aussperrschutzes bei Kombination mit Pro-Finder für Ford Transit 2019–2024 ; nicht ohne Variantenprüfung als pauschaler Mindeststand für alle 2024+-Fahrzeuge verwenden | 

Der Artikel trennt bewusst Fahrzeugunterstützung ab 5298-005 und Kabelsatzbauform ab 5298-006 . Vor Arbeitsbeginn vollständige Seriennummer, Softwarestand und vorhandene Kontaktbauform dokumentieren. Weitere Schwellen stehen unter Seriennummern und Softwarestände .

## DIP-Profil sicher einstellen

Für die hier behandelte neue Ford-Generation müssen alle acht DIP-Schalter auf OFF stehen.

Fahrzeug spannungsfrei schalten und gegen unbeabsichtigtes Wiedereinschalten sichern.

Sicherstellen, dass weder der 20-polige WiPro-Stecker noch der Pro-Finder-Stecker eingesteckt ist.

Gehäusedeckel der WiPro vorsichtig öffnen.

SW1 , SW2 , SW3 , SW4 , SW5 , SW6 , SW7 und SW8 jeweils auf OFF stellen.

Schalterstellung fotografisch oder auf der Arbeitskarte dokumentieren.

Gehäuse schließen, bevor die Spannungsversorgung wiederhergestellt wird.

Nicht übertragen: Die alte allgemeine Installationsanleitung nennt für „Ford Transit ab 2006“ SW1 + SW2 . Diese historische Sammelstellung gilt nicht für das hier beschriebene Profil. Für die neue Generation hat die freigegebene Fahrzeugmatrix mit alle OFF Vorrang.

Grundlagen zu den DIP-Funktionen enthält Fahrzeugkompatibilität .

## Sicherheit und Arbeitsvorbereitung

Arbeiten an Fahrzeugelektrik, CAN-Bus und Zentralverriegelung gehören in die Hände einer qualifizierten Fachkraft.

Vor dem Ausbau vorhandene Warnmeldungen, Beleuchtungsfehler und Fehlerspeichereinträge prüfen und dokumentieren.

Fahrzeug und WiPro während der Anschlussarbeiten spannungsfrei halten.

Steckerbezeichnung, Pinnummer, Leitungsfarbe und gemessenes Signal immer gemeinsam verifizieren.

Niemals nur nach einer Leitungsfarbe anschließen; am Stecker C214 liegen zwei blau-weiße Leitungen nebeneinander.

CAN-Leitungen nicht verlängern, vertauschen oder unnötig entdrillen.

Unbenutzte Leitungen einzeln isolieren und alle Leitungen scheuerfrei, zugentlastet und außerhalb bewegter Bauteile verlegen.

Weichen Stecker, Pins oder Fahrzeugausstattung von diesem Artikel ab, Arbeiten stoppen und die aktuelle fahrzeugspezifische Einbauunterlage beziehungsweise den THITRONIK-Support heranziehen.

Benötigt werden unter anderem geeignetes Demontagewerkzeug, Multimeter, Crimpwerkzeug, freigegebene Verbinder, Isoliermaterial und Mittel zur Zugentlastung. Der konkrete Demontageweg ist in den lokal erhaltenen Quellen nicht belastbar dokumentiert und wird deshalb hier nicht rekonstruiert.

## Anschlussübersicht

Fahrzeuganschluss | Fahrzeugleitung | WiPro-Leitung | Funktion | 
 J6, Pin 17 | braun/gelb | rot/rosa | Warnblinker | 
 J6, Pin 3 | weiß/orange | gelb | Zündung / Klemme 15 | 
 J4, Pin 9 | violett/grau | blau | Zentralverriegelung / safe.lock | 
 J4, Pin 23 | grau/gelb | blau/schwarz | Zentralverriegelung / safe.lock | 
 schwarzer Gegenstecker, Pin 20 | rot, über 10-A -Sicherung F8 | rot | Dauerplus / Klemme 30 | 
 schwarzer Gegenstecker, Pin 10 | violett/orange | violett/orange | CAN-Low | 
 schwarzer Gegenstecker, Pin 9 | grau/orange | weiß/orange | CAN-High | 
 C214, Pin 17 | blau/weiß | rosa | Fahrzeughupe | 
 geeigneter Fahrzeug-Massepunkt | Karosseriemasse | schwarz | Masse / Klemme 31 | 

Die Anschlussorte stammen aus dem erhaltenen fahrzeugspezifischen Redaktionsbestand. Vor dem Verbinden ist jede Zuordnung am tatsächlichen Fahrzeug zu bestätigen.

## Warnblinker und Zündung an J6

Stecker J6 eindeutig identifizieren und verriegelt spannungsfrei zugänglich machen.

An J6 Pin 17 die braun/gelbe Fahrzeugleitung über einen freigegebenen Verbinder mit der rot/rosa WiPro-Leitung verbinden.

An J6 Pin 3 die weiß/orange Fahrzeugleitung messen und mit der gelben WiPro-Leitung verbinden.

Prüfen, dass Pin 3 nur das dokumentierte Zündungssignal liefert und nicht mit einer gleichfarbigen Leitung an einem anderen Stecker verwechselt wurde.

Stecker vollständig verriegeln und beide Leitungen zugentlasten.

## Zentralverriegelung und safe.lock an J4

Stecker J4 eindeutig identifizieren.

Violett/graue Fahrzeugleitung an J4 Pin 9 der blauen WiPro-Leitung zuordnen.

Grau/gelbe Fahrzeugleitung an J4 Pin 23 der blau/schwarzen WiPro-Leitung zuordnen.

Bei einem Kabelsatz ab 5298-006 die vorhandenen direkten Steckkontakte an den vorgesehenen Positionen einsetzen und den sicheren Sitz kontrollieren.

Bei 5298-005 oder abweichender Kontaktbauform keine improvisierte Kontaktierung herstellen; die zur Set-Version passende fahrzeugspezifische Unterlage beziehungsweise Freigabe verwenden.

Verriegelung des Steckers und Zugentlastung beider safe.lock Leitungen kontrollieren.

Die beiden Leitungen bilden gemeinsam die dokumentierte safe.lock/ZV-Anbindung. Sie dürfen nicht vertauscht, zusammengelegt oder als frei wählbare Schließkontakte behandelt werden.

## Dauerplus, CAN und Masse

Am schwarzen Gegenstecker liegen Dauerplus und CAN an drei getrennten Pins.

Rote Fahrzeugleitung an Pin 20 identifizieren und Sicherung F8 mit 10 A prüfen.

Rote WiPro-Leitung mit der roten Fahrzeugleitung an Pin 20 verbinden.

Violett/orange Fahrzeugleitung an Pin 10 mit violett/orange WiPro-Leitung als CAN-Low verbinden.

Grau/orange Fahrzeugleitung an Pin 9 mit weiß/orange WiPro-Leitung als CAN-High verbinden.

Schwarze WiPro-Leitung an einem geeigneten, tragfähigen Fahrzeug-Massepunkt anschließen.

CAN-Adernpaar nur so weit wie für den Anschluss erforderlich öffnen und anschließend wieder mechanisch sichern.

Versorgung erst nach Kontrolle sämtlicher Anschlüsse herstellen.

CAN-High und CAN-Low dürfen nicht vertauscht werden. Die allgemeine Steckerbelegung der WiPro bestätigt weiß/orange als CAN-High, violett/orange als CAN-Low, rot als Klemme 30 und schwarz als Klemme 31.

## Fahrzeughupe an C214

Stecker C214 eindeutig identifizieren.

Pin 17 anhand der Pinmarkierung bestimmen.

Blau/weiße Fahrzeugleitung an genau diesem Pin messen.

Leitung mit der rosa WiPro-Leitung verbinden.

Verbindung isolieren, zugentlasten und Stecker vollständig verriegeln.

Verwechslungsgefahr: Am Stecker C214 befinden sich zwei blau-weiße Leitungen direkt nebeneinander. Ausschließlich die Leitung an Pin 17 verwenden; die Farbe allein genügt nicht zur Identifikation.

Fahrzeughupe, interne Sirene und gegebenenfalls eine separate Zusatzsirene sind unterschiedliche Alarmgeber. Die Abgrenzung erläutert Sirenen und Hupen .

## Campingmodus und Bedienwege

Handlung | Dokumentiertes Verhalten / Vorgabe | 
 Verriegeln mit THITRONIK® Zubehör | vorgesehener Bedienweg im Campingmodus; die fahrzeugseitige Auto-Close-Funktion ist danach inaktiv | 
 Entriegeln mit Originalschlüssel nach THITRONIK® Verriegelung | bleibt laut systemweiter Campingmodus-Beschreibung möglich | 
 Verriegeln mit Originalschlüssel | kann die spätere Entriegelung mit THITRONIK® Zubehör blockieren; daher im Campingmodus vermeiden | 
 Aussperrschutz | bei bestimmten kritischen Verriegelungssituationen werden Verriegeln und Scharfschalten nicht ausgeführt; Warnton und Warnblinker dienen als Rückmeldung | 

Als THITRONIK® Bedienweg kommen je nach vorhandener und freigegebener Ausstattung beispielsweise Funk-Handsender 868 , NFC Modul oder die App in Betracht. Die genaue Zugangslogik beschreibt Zugangsmedien & Bedienung .

Bei Kombination mit Pro-Finder vollständige Seriennummer und Software dokumentieren. Die Schwelle 5298-008 / 1.0.3sf ist als Aussperrschutz-Korrektur für Ford Transit 2019–2024 belegt; bei der neuen Fahrzeugvariante muss ihre Anwendbarkeit anhand des konkreten Sets geprüft werden.

## Funk-Zubehör anlernen und prüfen

Funk-Zubehör vor der endgültigen Montage anlernen und am vorgesehenen Montageort auf Reichweite prüfen.

20-poligen Stecker erst nach korrekter DIP-Einstellung einstecken.

Taster an der WiPro halten, bis ein langer Piepton ertönt und die Status-LED dauerhaft leuchtet.

Jeden Funk-Magnetkontakt durch Trennen von Sender und Magnet auslösen; beim Funk-Handsender eine Taste drücken.

Kurzen Bestätigungston und kurzes Erlöschen der Status-LED für jede Komponente abwarten.

Anlernmodus durch kurzes erneutes Drücken des Tasters beenden; Doppelton und erlöschende Status-LED kontrollieren.

Diagnosemodus durch kurzes Drücken des Tasters aktivieren und jedes Zubehör am endgültigen Einbauort auslösen.

Fehlende Quittierung durch Prüfung von Anlernstatus, Abschirmung, Antennenlage und Montageort eingrenzen.

Der ausführliche Ablauf steht unter Anlernvorgang .

## Abschließende Funktionsprüfung

Seriennummer, Software, Fahrzeugzuordnung und die Stellung alle OFF nochmals dokumentieren.

Alle Stecker, Pins, Sicherungen, Masseverbindung und Zugentlastungen prüfen.

Fahrzeug und System in einen normalen prüffähigen Zustand bringen; Fehlermeldungen am Fahrzeug beachten.

CAN-Diagnosemodus aktivieren und durch Betätigen von Warnblinker beziehungsweise einem geeigneten Fahrzeugbedienvorgang Datenverkehr erzeugen.

Prüfen, ob die Status-LED abhängig von der CAN-Datenrate blinkt oder flackert.

Mit einem freigegebenen THITRONIK® Bedienweg verriegeln und Scharfschaltung, Zentralverriegelung und optische Rückmeldung prüfen.

Fahrzeughupe mit einem kontrollierten Testalarm prüfen.

Jede über CAN erfasste Tür sowie jeden angelernten Funkkontakt einzeln öffnen und die Alarmreaktion kontrollieren.

Anlage mit dem vorgesehenen THITRONIK® Bedienweg entschärfen und wieder entriegeln.

Entriegelung mit dem Originalschlüssel nur als getrennten, kontrollierten Test nach THITRONIK® Verriegelung prüfen; nicht zuerst mit dem Originalschlüssel verriegeln.

Abschließend Fehlerspeicher und Fahrzeugfunktionen kontrollieren und das Prüfergebnis dokumentieren.

## Typische Fehlerbilder

Fehlerbild | Prüfung / Maßnahme | 
 Keine oder falsche Fahrzeugreaktion | Fahrzeugvariante und Produktionsdatum prüfen; DIP muss für dieses Profil vollständig OFF sein | 
 Keine CAN-Aktivität im Diagnosemodus | schwarzen Gegenstecker, Pin 9/10, Leitungsfarben, Verbinder und Zuordnung CAN-High/CAN-Low prüfen | 
 Warnblinker ohne Funktion | J6 Pin 17, braun/gelbe Fahrzeugleitung und rot/rosa WiPro-Leitung prüfen | 
 Zündung wird nicht erkannt | J6 Pin 3, weiß/orange Fahrzeugleitung und gelbe WiPro-Leitung messen | 
 Zentralverriegelung reagiert nicht korrekt | J4 Pin 9/23, Reihenfolge der blauen Leitungen, direkte Kontakte ab 5298-006 und Steckerverriegelung prüfen | 
 Fahrzeughupe bleibt stumm | C214 Pin 17 anhand der Pinnummer identifizieren; nicht die benachbarte blau-weiße Leitung verwenden | 
 WiPro ohne Funktion | Pin 20, rote Leitung, Sicherung F8 10 A , Massepunkt und 20-poligen Stecker prüfen | 
 THITRONIK® Zubehör entriegelt nach Originalschlüssel-Verriegelung nicht | Campingmodus-Bedienfolge beachten; Fahrzeug nicht zuerst mit Originalschlüssel verriegeln | 
 Warnton und synchrones Warnblinken statt Verriegelung | mögliche Aussperrschutz-Situation; Türen, vorherigen Bedienweg, Set-Stand und gegebenenfalls Pro-Finder-Kombination prüfen | 
 Funk-Zubehör wird nicht empfangen | Anlernstatus, Diagnosemodus, Abschirmung und Antennenlage prüfen | 

Weitere systemweite Prüfschritte enthält Störungsbeseitigung .

## Quellenbasis und Redaktionsentscheidung

Die erhaltene deutsche Altfassung nennt vier interne Primärquellen: die Seriennummernliste des Ford-Sets, Fahrzeugbesonderheiten.docx sowie zwei fahrzeugspezifische safe.lock-Dokumente mit Stand 12/2025 .

Diese vier Dateien sind im aktuell erreichbaren Projektbestand nicht auffindbar. Ihre Quellenverweise bleiben aus Gründen der Nachvollziehbarkeit im Frontmatter erhalten; sie wurden nicht durch erfundene Dateipfade ersetzt.

Fahrzeuggrenzen, DIP-Profil und Mindeststand wurden mit den freigegebenen deutschen Artikeln zur Fahrzeugkompatibilität und zu Seriennummern/Softwareständen abgeglichen.

Die erhaltene Altfassung liefert die fahrzeugspezifischen Stecker-, Pin- und Leitungsangaben sowie die Warnung zu den beiden blau-weißen Leitungen an C214.

Das vorhandene allgemeine Installationshandbuch Version 1.8 wurde textlich ausgewertet; die einschlägigen deutschen Seiten zu DIP-Arbeiten, Anlernen, Funk- und CAN-Diagnose, Testalarm, Anschlussstecker, technischen Daten und Fehlerdiagnose wurden zusätzlich visuell geprüft.

Die alte allgemeine Ford-DIP-Angabe SW1 + SW2 wird nicht auf diese neue Elektronikgeneration übertragen. Ebenso wurden keine nicht belegten Ausbaupositionen oder Demontageschritte ergänzt.

Vor einem realen Einbau ist die aktuelle fahrzeugspezifische Montageanleitung zwingend mit dem tatsächlichen Fahrzeug abzugleichen.

## Verwandte Artikel

WiPro III 

Fahrzeugkompatibilität 

Seriennummern und Softwarestände 

Zugangsmedien & Bedienung 

Funk-Handsender 868 

NFC Modul 

Pro-Finder 

Anlernvorgang 

Sirenen und Hupen 

Störungsbeseitigung 

Ford Transit 7G Facelift
