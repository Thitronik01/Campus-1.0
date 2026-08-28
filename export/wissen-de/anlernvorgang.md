# Anlernvorgang — Funk-Zubehör an WiPro III anlernen

Route: /de/anlernvorgang | Stand: 2026-07-14 | Sichtbarkeit: standard
Quelle: Thitronik Online/project-data/runtime/wiki/wiki-articles/de/anlernvorgang.json

---
Anlernvorgang — Funk-Zubehör an WiPro III anlernen

WICHTIG: Im Auslieferungszustand sind keine Funk-Komponenten gespeichert. Nicht angelernte Funk-Komponenten werden von der WiPro III nicht ausgewertet und können keinen Alarm auslösen.

Jeder Funk-Sender muss einzeln an der WiPro III-Zentrale angelernt werden. Das Anlernen von WiPro-Zubehör ist vom Bluetooth- Koppeln zu unterscheiden.

## Anlernmodus starten

### Methode 1 — Taster an der WiPro III-Zentrale

Diese Methode ist der Standardweg, wenn die WiPro III-Zentrale zugänglich ist.

Den 20-poligen Stecker der WiPro III-Zentrale einstecken.

Den Taster „B“ an der Gehäusevorderseite gedrückt halten, bis ein langer Signalton ertönt.

Die Status-LED leuchtet dauerhaft: Der Anlernmodus ist aktiv.

Die gewünschten Komponenten wie im Abschnitt „Zubehör auslösen und speichern“ auslösen.

Zum Beenden den Taster „B“ kurz drücken. Ein Doppelton ertönt und die Status-LED erlischt.

### Methode 2 — Easy-Add 1.0 mit Funk-Handsender 

Diese Methode setzt einen bereits angelernten Funk- Handsender 868 voraus und ermöglicht das Nachlernen ohne direkten Zugriff auf die WiPro III-Zentrale.

Alle überwachten Öffnungen des Fahrzeugs schließen.

Die Spannungsversorgung der WiPro III-Zentrale für etwa 10 Sekunden unterbrechen, beispielsweise über Sicherung oder Stecker.

Die Spannungsversorgung wiederherstellen.

Innerhalb von 30 Sekunden die Lautsprechertaste des bereits angelernten Handsenders 5× drücken.

Die WiPro wechselt mehrfach den Zustand; anschließend leuchtet die Status-LED dauerhaft rot. Der Anlernmodus ist aktiv.

Die gewünschten Komponenten auslösen und nach jeder Komponente die Bestätigung abwarten.

Zum Beenden die Spannungsversorgung erneut unterbrechen und wiederherstellen.

### Methode 3 — Easy-Add 2.0 über CAN-Bus 

Diese Methode setzt eine aktive, kompatible CAN-Bus-Anbindung voraus.

Die Spannungsversorgung der WiPro III-Zentrale unterbrechen und wiederherstellen.

Innerhalb von 30 Sekunden die Fahrertür 5× öffnen und schließen .

Die WiPro wechselt mehrfach den Zustand; anschließend leuchtet die Status-LED dauerhaft rot. Der Anlernmodus ist aktiv.

Die gewünschten Komponenten auslösen und nach jeder Komponente die Bestätigung abwarten.

Zum Beenden die Spannungsversorgung erneut unterbrechen und wiederherstellen.

WICHTIG: Über Easy-Add 2.0 beziehungsweise die CAN-Bus-Methode können Komponenten nur angelernt, aber nicht gelöscht werden.

### Methode 4 — Easy-Add 3.0 über die THITRONIK® App

Bei kompatiblem Softwarestand kann der Anlernmodus über die THITRONIK® App gestartet werden, ohne die Spannungsversorgung zu unterbrechen. Voraussetzung ist ein geeigneter Pro-Finder oder ein Bluetooth-Vernetzungsmodul .

In der THITRONIK® App die Anlernfunktion für das Fahrzeug starten.

Die gewünschte Komponente auslösen.

Die akustische Bestätigung der WiPro III-Zentrale abwarten.

Den Anlernmodus anschließend über die App beenden.

Die Verfügbarkeit und die angezeigten Bedienschritte hängen von den verbauten Geräten und deren Softwareständen ab.

## Unterschiede der Verfahren

Verfahren | Auslöser | Voraussetzung | Löschen über dieses Verfahren | 
 Taster „B“ | Taster an der WiPro III-Zentrale | Direkter Zugang zur Zentrale | Gesamtspeicher kann mit gesondertem Ablauf gelöscht werden | 
 Easy-Add 1.0 | Lautsprechertaste 5× | Bereits angelernter Funk-Handsender 868 | Teilweises Löschen mit gesondertem Tastenablauf; nur der Master-Handsender bleibt erhalten | 
 Easy-Add 2.0 | Fahrertür 5× öffnen und schließen | Kompatible CAN-Bus-Anbindung | Nein | 
 Easy-Add 3.0 | THITRONIK® App | Pro-Finder oder Bluetooth-Vernetzungsmodul; kompatible Software | Kein Ersatz für Teil- oder Gesamtlöschung | 

## Zubehör auslösen und speichern

Komponente | Auslösen im Anlernmodus | 
 Funk-Magnetkontakt 868 | Sender und Magnet voneinander trennen, bis die Sende-LED kurz aufleuchtet | 
 Funk-Handsender 868 | Eine Taste am Handsender drücken | 
 Funk-Kabelschleife 868 | Elektronikeinheit aus der Halterung nehmen | 
 G.A.S.-connect | Gerät einschalten | 
 T.S.A. Funk-Rauchmelder | Gehäusedeckel durch Drehen lösen und die Taste im Inneren drücken | 
 NFC Modul | Batteriesicherung entfernen und die mitgelieferte KeyCard an das Modul halten; nicht als erste Komponente anlernen | 

Nach jedem erfolgreichen Speichervorgang ertönt ein kurzer Signalton aus der WiPro III-Zentrale und die Status-LED erlischt kurz.

Reihenfolge beim NFC Modul: Das NFC Modul darf nicht als erste Komponente angelernt werden. Andernfalls kann es als Master-Funk-Handsender erkannt werden.

## Speichergrenze

Die WiPro III kann höchstens 100 Sender speichern. Funk-Magnetkontakte, Funk-Handsender, Funk-Kabelschleifen und weitere Funk-Komponenten teilen sich diesen Speicher.

## Funk-Komponenten löschen

### Teilweises Löschen — Master-Handsender bleibt erhalten

Dieser Ablauf löscht sämtliche angelernten Funk-Komponenten außer dem zuerst angelernten Funk-Handsender. Dieser bleibt als Master-Handsender gespeichert.

Alle überwachten Öffnungen des Fahrzeugs schließen.

Die Spannungsversorgung der WiPro III-Zentrale unterbrechen und wiederherstellen.

Innerhalb von 30 Sekunden die Taste „Durchgestrichener Lautsprecher“ des Master-Handsenders 5× drücken.

Die WiPro wechselt mehrfach den Zustand und bestätigt das Löschen mit einem langen Signalton.

Die Anlage befindet sich anschließend im Anlernmodus. Neue Komponenten können unmittelbar angelernt werden.

Zum Beenden die Spannungsversorgung erneut unterbrechen und wiederherstellen.

Danach müssen alle gelöschten Komponenten neu angelernt werden. Auch weitere Funk-Handsender werden gelöscht; nur der Master-Handsender bleibt gespeichert.

### Vollständiges Löschen — Gesamtspeicher

Dieser Ablauf löscht alle angelernten Sender einschließlich des Master-Handsenders.

Den 20-poligen weißen Stecker von der WiPro III-Zentrale abziehen.

Den Taster „B“ gedrückt halten.

Den 20-poligen Stecker wieder einstecken und den Taster weiter gedrückt halten, bis ein langer Signalton ertönt.

Der gesamte Senderspeicher ist nun gelöscht.

ACHTUNG: Nach dem Gesamtlöschen zuerst einen Funk-Handsender 868 anlernen. Dieser wird zum neuen Master-Handsender. Anschließend alle weiteren Komponenten neu anlernen; das NFC Modul darf nicht zuerst angelernt werden.

## Anlernen und Reichweite vor der Montage prüfen

Funk-Zubehör möglichst vor der endgültigen Montage anlernen und am vorgesehenen Einbauort testen.

Die bereits angelernte Komponente provisorisch am geplanten Montageort positionieren.

Den Diagnosemodus der WiPro III-Zentrale durch kurzes Drücken des Tasters „B“ starten; die Status-LED blinkt.

Die Komponente auslösen. Die WiPro III-Zentrale muss den empfangenen Sendevorgang mit einem akustischen Signal bestätigen.

Erfolgt keine Bestätigung, den Montageort verändern und auf Abschirmung durch Metallteile prüfen.

Nach der endgültigen Montage mit jeder Komponente einen vollständigen Testalarm durchführen.

## Batteriehinweise für Funk-Zubehör

### Austauschbare CR2032-Knopfzellen

Funk-Handsender 868, Funk- Magnetkontakt 868 und Funk- Kabelschleife 868 verwenden eine CR2032-Knopfzelle mit 3 V . Die typische Lebensdauer beträgt etwa zwei Jahre .

Panasonic oder Varta werden empfohlen.

Duracell, No-Name- und Billigbatterien werden wegen möglicher Spannungs- oder Lebensdauerprobleme nicht empfohlen.

Beim Wechsel die Knopfzelle nicht mit bloßen Fingern berühren, auf richtige Polung achten und verbrauchte Batterien vorschriftsgemäß entsorgen.

Nach einem Batteriewechsel ist kein erneutes Anlernen erforderlich.

### Batteriewarnungen

Je nach Sendergeneration werden unterschiedliche Warnstufen angezeigt:

Anzeige | Bedeutung | Maßnahme | 
 Gelbe Anzeige für etwa 5 Sekunden | Batterie wird schwach | Innerhalb von 2–6 Wochen wechseln | 
 Etwa 2 Sekunden Signalton aus der WiPro III-Zentrale und rote Sende-LED für etwa 30 Sekunden | Batterie kritisch | Batterie sofort wechseln | 

Meldet eine Komponente eine schwache Batterie, sind gleich alte Knopfzellen häufig ebenfalls bald verbraucht. Ein gemeinsamer Austausch ist daher sinnvoll.

### Abweichende Versorgungsarten

G.A.S.-connect wird mit 12 V oder 24 V aus dem Fahrzeug versorgt und verwendet keine CR2032-Knopfzelle.

Der T.S.A. Funk-Rauchmelder besitzt eine fest eingebaute 3-V-Lithium-Langzeitbatterie CR123A mit einer Lebensdauer von bis zu zehn Jahren . Die Batterie kann nicht gewechselt werden; sobald die Batteriewarnung mehr als viermal ausgegeben wurde, muss der Rauchmelder ersetzt werden.

## Querverweise

WiPro III 

Funk-Magnetkontakt 868 

Funk-Handsender 868 

Funk-Kabelschleife 868 

T.S.A. Funk-Rauchmelder 

G.A.S.-connect 

NFC Modul 

Systemüberblick
