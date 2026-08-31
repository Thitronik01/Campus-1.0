# Fragenkatalog — THITRONIK Campus

> **Dieses Dokument nennt alle Lösungen.** Es ist für die fachliche
> Freigabe und die Schulungsvorbereitung gedacht, nicht für die
> Teilnehmer.

**Erzeugt** mit `node tools/fragenkatalog.js` aus den Fragensätzen in
`public/data/inseln/`. Änderungen gehören dorthin, nicht in diese Datei.

70 Fragen auf 7 Inseln.

| Fragetyp | Anzahl |
|---|---:|
| Einfachauswahl | 56 |
| Mehrfachauswahl | 10 |
| Reihenfolge | 2 |
| Zuordnung | 2 |

## Inhalt

- [VEJRØ — Produktneuheiten: Zugang & Wasserschutz](#vejrø--produktneuheiten-zugang--wasserschutz) · 10 Fragen
- [POEL — Händlerbereich](#poel--händlerbereich) · 10 Fragen
- [HIDDENSEE — Funk-Magnetkontakte & Leitungsverbindungen](#hiddensee--funk-magnetkontakte--leitungsverbindungen) · 10 Fragen
- [SAMSØ — Einbauorte im Fahrzeug](#samsø--einbauorte-im-fahrzeug) · 10 Fragen
- [FEHMARN — Fehlersuche & Support](#fehmarn--fehlersuche--support) · 10 Fragen
- [USEDOM — Verkaufsdisplay & Konfigurator](#usedom--verkaufsdisplay--konfigurator) · 10 Fragen
- [LANGELAND — Fahrzeugannahme & Fahrzeugübergabe](#langeland--fahrzeugannahme--fahrzeugübergabe) · 10 Fragen

---
## VEJRØ — Produktneuheiten: Zugang & Wasserschutz

| | |
|---|---|
| Fragen | 10 |
| Fragensatz-Version | 6 |
| Art | Neuheiten verstehen, passend beraten |
| Lernziel | CampLock und VanLock sicher abgrenzen, den Fingerprint ehrlich beraten und die neuen Funklösungen gegen Wassereinbruch passend einsetzen. |

**Quellen im Produktwissen:** `produkte/camplock-fingerprint.md`, `produkte/vanlock-fingerprint.md`, `produkte/funk-wassermelder.md`, `produkte/funk-magnetkontakt.md`, `referenz/zugang-bedienung.md`

> **Redaktioneller Hinweis (erscheint nicht im Quiz):** Fragenkatalog v6. Zehn Fragen. Redaktionsrunde 08/2026: Markenname Hartal aus VEJ-01 und VEJ-09 genommen - die Fragen laufen jetzt ueber den Tuertyp. Achtung, das Produktwissen nennt die Hartal-Kompatibilitaet weiterhin als entscheidenden Punkt fuer CampLock (produkte/camplock-fingerprint.md). VEJ-02 ohne Revisionskuerzel V002+. VEJ-03 und VEJ-09 haben je eine weitere falsche Option. VEJ-08 benennt den Einbaupunkt des Fuehlers konkret. Offen: VEJ-06 und VEJ-10 fragen beide, ob der Fahrzeugschluessel zu Hause bleiben darf. Fingerprint-Kompatibilitaet und Sicherheitshinweis vom 27.07.2026 vor jeder Schulung gegen den aktuellen Freigabestand pruefen.

#### 1. Ein Kunde hat einen Kastenwagen ohne Aufbautür und möchte biometrischen Zugang. Was empfiehlst du?

`VEJ-01` · Einfachauswahl · CampLock oder VanLock

- CampLock Fingerprint
- **VanLock Fingerprint** ✓
- CampLock Fingerprint mit Montageadapter
- Erst nach Nachrüstung einer Aufbautür möglich

**Auflösung:** CampLock ist für Aufbautüren mit Zentralverriegelung gebaut, VanLock für Reisemobile und Kastenwagen. Zwei Produkte, zwei Einsatzbereiche.

**Falsch gewählt?**

- *CampLock oder CampLock mit Adapter:* Der Unterschied sitzt nicht in der Befestigung, sondern im Sensor und in der Türanbindung. Einen Adapter, der CampLock auf andere Türen bringt, gibt es nicht.
  <br>↳ bezogen auf: „CampLock Fingerprint“ · „CampLock Fingerprint mit Montageadapter“
- *Umbau auf eine Aufbautür:* Technisch absurd teuer - und unnötig, weil es für genau diesen Fall ein eigenes Produkt gibt.
  <br>↳ bezogen auf: „Erst nach Nachrüstung einer Aufbautür möglich“

**Mitnehmen:** Erste Frage am Fahrzeug ist nie „welcher Fingerprint“, sondern „welche Tür“.

#### 2. Eine Außenklappe ist regelmäßig Spritzwasser ausgesetzt. Was gehört zur korrekten Montage des wasserdichten Funk-Magnetkontakts? Wähle alle zutreffenden.

`VEJ-03` · Mehrfachauswahl · Produktneuheit: Wasserdichter Funk-Magnetkontakt

- **Die wasserdichte Ausführung für den feuchtebelasteten Einbauort wählen** ✓
- **Die Gehäusepfeile von Sender und Magnet zueinander ausrichten** ✓
- **Im geschlossenen Zustand höchstens 22 mm Abstand einplanen** ✓
- Grundsätzlich den Montageadapter des Standardkontakts verwenden
- Den Sender dauerhaft unter Wasser montieren - IP67 erlaubt das
- Die Sende-LED vom Magneten weg ausrichten, wie bei der Standardausführung

**Auflösung:** Für feuchte- und spritzwasserbelastete Öffnungen ist die wasserdichte Ausführung vorgesehen. Die kleinen **Pfeile auf Sendeeinheit und Magnet zeigen aufeinander**, geschlossen sind es höchstens 22 mm - und IP67 bedeutet nicht Dauereintauchen.

**Falsch gewählt?**

- *Standardadapter übernommen:* Die Montageregeln der Standardausführung dürfen nicht ungeprüft auf die wasserdichte Ausführung übertragen werden.
  <br>↳ bezogen auf: „Grundsätzlich den Montageadapter des Standardkontakts verwenden“
- *LED-Regel der Standardausführung übertragen:* Der verführerischste Fehler dieser Frage, weil die Regel für den Standardkontakt richtig ist. Die wasserdichte Ausführung wird nicht über die LED ausgerichtet, sondern über die Gehäusepfeile - und die zeigen aufeinander.
  <br>↳ bezogen auf: „Die Sende-LED vom Magneten weg ausrichten, wie bei der Standardausführung“
- *IP67 mit Dauereintauchen verwechselt:* IP67 schützt gegen zeitweiliges Untertauchen unter definierten Bedingungen. Es ist keine Freigabe für dauerhafte Montage unter Wasser oder den direkten Hochdruckstrahl.
  <br>↳ bezogen auf: „Den Sender dauerhaft unter Wasser montieren - IP67 erlaubt das“

**Mitnehmen:** Produktvariante zuerst nach dem Einbauort auswählen, danach nach ihrer eigenen Anleitung montieren - nicht nach der Regel eines ähnlich aussehenden Kontakts.

#### 3. Welches Produkt wählst du für eine Dachbox oder Außenklappe, die regelmäßig Spritzwasser ausgesetzt ist?

`VEJ-05` · Einfachauswahl · Produkt erkennen

- `/media/vejro/vej-produkt-camplock.webp` — Runder CampLock Fingerprint-Sensor
- `/media/vejro/vej-produkt-wassermelder.webp` — Funk-Wassermelder mit kabelgebundenem Fühler
- **`/media/vejro/vej-produkt-magnetkontakt-wasserdicht.webp` — Wasserdichter Funk-Magnetkontakt mit Sender und Magnet** ✓
- `/media/vejro/vej-produkt-magnetkontakt-standard.webp` — Standard-Funk-Magnetkontakt mit Sender und Magnet

**Auflösung:** Für eine direkt feuchte- oder spritzwasserbelastete Außenöffnung ist die wasserdichte Ausführung vorgesehen. Der Wassermelder erkennt dagegen austretendes Wasser an einem tiefen Punkt; der Standardkontakt gehört an geschützte Öffnungen.

**Falsch gewählt?**

- *Wassermelder statt Öffnungskontakt:* Der Wassermelder erkennt Wasser an seinen Fühlerkontakten. Er überwacht nicht, ob eine Klappe geöffnet wird.
  <br>↳ bezogen auf: „Funk-Wassermelder 868“
- *Standardkontakt gewählt:* Bei direkter Spritzwasserbelastung wird nicht die ähnlich aussehende Standardausführung übernommen, sondern die dafür freigegebene wasserdichte Variante.
  <br>↳ bezogen auf: „Funk-Magnetkontakt 868 Standard“

**Mitnehmen:** Nicht nach Produktname oder Form entscheiden, sondern nach Aufgabe und Einbauumgebung: Öffnung erkennen, Wasser erkennen oder Zugang bedienen.

#### 4. Wo platzierst du beim Funk-Wassermelder 868 Sendeeinheit und Fühler?

`VEJ-08` · Einfachauswahl · Produktneuheit: Funk-Wassermelder 868

- **Sendeeinheit trocken und zugänglich; Fühler tief am gefährdeten Punkt - etwa unter dem Frischwassertank oder unter der Spüle** ✓
- Beide Komponenten direkt auf dem Fahrzeugboden im möglichen Wasserbereich
- Sendeeinheit hinter einer Metallverkleidung; Fühler möglichst hoch an der Wand
- Fühler in den Frischwassertank; Sendeeinheit außen unter das Fahrzeug

**Auflösung:** Die Sendeeinheit bleibt trocken, funkgünstig und für Wartung erreichbar. Der Fühler sitzt am 30 cm langen Kabel tief dort, wo zuerst Wasser ankommt: **unter dem Frisch- oder Brauchwassertank, unter der Spüle, unter Leitungen und Anschlüssen, in Staufächern mit wasserführenden Bauteilen oder hinter einer Serviceklappe**. Beide Kontaktstifte liegen dabei am Boden auf.

**Falsch gewählt?**

- *Sendeeinheit in den Nassbereich gesetzt:* Der Fühler erkennt das Wasser; die Sendeeinheit soll trocken bleiben. Wasserschutz ist keine Einladung, die Elektronik im möglichen Wasserstand zu montieren.
  <br>↳ bezogen auf: „Beide Komponenten direkt auf dem Fahrzeugboden im möglichen Wasserbereich“ · „Fühler in den Frischwassertank; Sendeeinheit außen unter das Fahrzeug“
- *Zu hoch und funktechnisch abgeschirmt:* Ein hoch montierter Fühler meldet erst spät. Metall unmittelbar um die Sendeeinheit kann zusätzlich die Funkstrecke verschlechtern.
  <br>↳ bezogen auf: „Sendeeinheit hinter einer Metallverkleidung; Fühler möglichst hoch an der Wand“

**Mitnehmen:** Beim Wassermelder haben Sender und Fühler bewusst zwei verschiedene Einbauorte: Elektronik trocken, Messpunkt tief. Die 30 cm Kabellänge entscheiden mit - der Sendeeinbauort muss zum gewählten Messpunkt passen, nicht umgekehrt.

#### 5. Bringe den vollständigen Funktionstest des eingebauten Funk-Wassermelders in die richtige Reihenfolge.

`VEJ-04` · Reihenfolge · Funk-Wassermelder prüfen

**Bild zur Frage:** `/media/vejro/vej-produkt-wassermelder.webp` — Funk-Wassermelder mit Sendeeinheit und Fühler

1. WiPro III scharf schalten
2. Beide Fühlerkontakte mit einem feuchten Tuch elektrisch überbrücken
3. Lokalen Alarm am Fahrzeug bestätigen
4. Falls Pro-finder verbaut ist: Alarm-SMS an den vorgesehenen Zielrufnummern bestätigen
5. Fühlerkontakte wieder vollständig freigeben und trocknen
6. Alarm beenden und Prüfergebnis dokumentieren

**Auflösung:** Scharfschalten → Fühler auslösen → lokalen Alarm prüfen → optionalen Fernalarm prüfen → Fühler freigeben → Alarm beenden und dokumentieren. Nur so wird die gesamte zugesagte Meldekette geprüft.

**Falsch gewählt?**

- *Nur die Funkverbindung geprüft:* Anlernen bestätigt den Funkempfang, nicht den Alarmweg vom nassen Fühler bis zur Sirene und gegebenenfalls zur Zielrufnummer.
- *Fernmeldung vorausgesetzt:* Eine Alarm-SMS gehört nur dann zum Test, wenn ein Pro-finder eingebaut und entsprechend eingerichtet ist.

**Mitnehmen:** Ein bestandener Test endet nicht beim Piepen: Jede zugesagte Meldestrecke wird ausgelöst, empfangen und dokumentiert.

#### 6. Bei der Übergabe fragt der Kunde, ob der Fahrzeugschlüssel dank Fingerprint künftig zu Hause bleiben kann. Was gilt nach dem aktuellen Sicherheitshinweis?

`VEJ-10` · Einfachauswahl · Aktueller Sicherheitshinweis

**Bild zur Frage:** `/media/vejro/vej-produkt-camplock.webp` — CampLock Fingerprint-Sensor

- Ja - nach erfolgreichem Test ersetzt der Fingerprint den Schlüssel vollständig
- **Nein - Fahrzeugschlüssel mitführen und den aktuellen Update-Stand beachten** ✓
- Ja - sofern zwei Master-Finger angelernt sind
- Nur bei VanLock muss der Schlüssel mitgeführt werden

**Auflösung:** THITRONIK weist aktuell darauf hin, den Fahrzeugschlüssel mitzuführen. Bei CampLock und VanLock Fingerprint kann es in seltenen Fällen zu einer nicht korrekt ausgeführten Zentralverriegelung und damit zu einem Aussperren kommen; der angekündigte Softwarestand ist zu beachten.

**Falsch gewählt?**

- *Fingerprint als alleinigen Zugang behandelt:* Auch ein korrekt eingerichteter Fingerprint und mehrere Master-Finger ersetzen den unabhängigen mechanischen Zugang nicht.
  <br>↳ bezogen auf: „Ja - nach erfolgreichem Test ersetzt der Fingerprint den Schlüssel vollständig“ · „Ja - sofern zwei Master-Finger angelernt sind“
- *Hinweis nur auf VanLock begrenzt:* Der veröffentlichte Hinweis betrifft CampLock und VanLock Fingerprint.
  <br>↳ bezogen auf: „Nur bei VanLock muss der Schlüssel mitgeführt werden“

**Mitnehmen:** Aktuelle Produkthinweise gehören in die Übergabe. Bis zur technischen Lösung bleibt der Fahrzeugschlüssel der unabhängige Zugangsweg.

#### 7. Ein Kunde möchte den Funk-Wassermelder 868 ohne WiPro III als eigenständigen akustischen Wasserwarner einsetzen. Was sagst du?

`VEJ-07` · Einfachauswahl · Systemgrenze Wassermelder

**Bild zur Frage:** `/media/vejro/vej-produkt-wassermelder.webp` — Funk-Wassermelder 868

- Das geht - der Melder besitzt eine eigene Sirene
- Das geht nur mit einer zusätzlichen SIM-Karte
- **Das geht nicht - der Melder ist Funk-Zubehör und benötigt eine kompatible WiPro III** ✓
- Das geht nur, wenn der Fühler direkt an 12 V angeschlossen wird

**Auflösung:** Der Funk-Wassermelder ist Zubehör zur Alarmanlage und hat keine eigene akustische Alarmierung. Die WiPro III übernimmt den lokalen Alarm; ein Pro-finder kann die Meldung zusätzlich weiterleiten.

**Falsch gewählt?**

- *Eigene Sirene angenommen:* Der Fühler erkennt Wasser und der Sender funkt das Ereignis. Die akustische Reaktion kommt von der eingebundenen Alarmanlage.
  <br>↳ bezogen auf: „Das geht - der Melder besitzt eine eigene Sirene“
- *Pro-finder zur Voraussetzung gemacht:* Der Pro-finder ist für die Fernmeldung optional. Die notwendige Basis für den Funk-Wassermelder ist die kompatible WiPro III.
  <br>↳ bezogen auf: „Das geht nur mit einer zusätzlichen SIM-Karte“

**Mitnehmen:** Zubehör nie isoliert versprechen: Sensor, Funkweg, Alarmzentrale und optionale Fernmeldung sind getrennte Bausteine.

#### 8. In welchen Situationen ist ein Fingerprint allein nicht die passende Empfehlung? Wähle alle zutreffenden.

`VEJ-09` · Mehrfachauswahl · Beratungsgrenzen

- **Der Kunde will damit die Fahrzeug-Zentralverriegelung bedienen, hat aber keine safe.lock-Anlage** ✓
- **Der Kunde plant bewusst keinen zweiten Zugangsweg** ✓
- **Der Kunde arbeitet beruflich viel mit Handschuhen und nassen Händen** ✓
- Der Kunde hat eine Aufbautür mit Zentralverriegelung
- Der Kunde möchte zusätzlich eine Fahrzeugortung
- Der Kunde will den Fingerprint ergänzend zum vorhandenen Funk-Handsender nutzen

**Auflösung:** Drei echte Grenzen: eine technische (ohne safe.lock keine Fahrzeug-ZV), eine konzeptionelle (kein zweiter Weg) und eine praktische (Handschuhe und nasse Hände).

**Falsch gewählt?**

- *Aufbautür mit Zentralverriegelung mitangekreuzt:* Das ist genau der vorgesehene Einsatzfall. Wer hier ein Problem sieht, verwechselt Voraussetzung mit Einschränkung.
  <br>↳ bezogen auf: „Der Kunde hat eine Aufbautür mit Zentralverriegelung“
- *Der zweite Bedienweg mitangekreuzt:* Dreht die Regel genau um. Ein vorhandener Funk-Handsender ist nicht das Problem, sondern die Lösung - er ist der zweite, technisch unabhängige Zugangsweg, den wir in jeder Beratung suchen.
  <br>↳ bezogen auf: „Der Kunde will den Fingerprint ergänzend zum vorhandenen Funk-Handsender nutzen“
- *Ortungswunsch mitangekreuzt:* Kein Ausschlussgrund. Der Pro-finder kommt **zusätzlich** dazu, nicht anstelle. Verschiedene Ebenen schließen sich nicht aus, sie ergänzen sich.
  <br>↳ bezogen auf: „Der Kunde möchte zusätzlich eine Fahrzeugortung“

**Mitnehmen:** Grenzen anzusprechen kostet im Gespräch zwei Minuten. Nachträglich kostet es einen Werkstatttermin.

#### 9. Vor dir liegen ein CampLock oder VanLock Fingerprint und eine vorhandene WiPro III ohne safe.lock. Darfst du die Funktion zusagen?

`VEJ-02` · Einfachauswahl · Varianten und Freigabestand

- Ja - jede WiPro III ist mit dem Fingerprint kompatibel
- **Nein - die aktuelle Anleitung nennt WiPro III safe.lock; Produktstand und passende Anleitung zuerst eindeutig zuordnen** ✓
- Ja - wenn ein Pro-finder ergänzt wird
- Ja - sofern nur die Aufbautür geöffnet werden soll

**Auflösung:** Für CampLock und VanLock Fingerprint beschreibt die aktuelle Anleitung den Betrieb als Zubehör zu **WiPro III safe.lock**. Vor einer Zusage werden Ausführung, Serien- und Revisionsstand, Fahrzeug und die zugehörige aktuelle Anleitung zusammen geprüft.

**Falsch gewählt?**

- *Älteren Funktionsstand übertragen:* Bei ähnlich benannten Produktständen darf eine frühere Kompatibilitätsaussage nicht auf den neuen übertragen werden. Entscheidend ist die Anleitung der konkreten Ausführung.
  <br>↳ bezogen auf: „Ja - jede WiPro III ist mit dem Fingerprint kompatibel“ · „Ja - sofern nur die Aufbautür geöffnet werden soll“
- *Pro-finder als Kompatibilitätsadapter behandelt:* Der Pro-finder ergänzt Ortung und Fernmeldung. Er ersetzt keine geforderte safe.lock-Zentrale.
  <br>↳ bezogen auf: „Ja - wenn ein Pro-finder ergänzt wird“

**Mitnehmen:** Bei Produktneuheiten gehört die Revision zum Produktnamen. Erst konkrete Ausführung und aktuelle Anleitung zusammenbringen, dann versprechen.

#### 10. Kunde: „Super, dann kann ich den Fahrzeugschlüssel ja zu Hause lassen.“ Deine beste Antwort?

`VEJ-06` · Einfachauswahl · Unabhängiger Zweitzugang

- Ja, der Fingerprint ersetzt den Schlüssel
- **Nein - immer einen zweiten, unabhängigen Zugangsweg vorsehen** ✓
- Ja, sofern zusätzlich ein Pro-finder verbaut ist
- Ja, sobald safe.lock verbaut ist

**Auflösung:** Jeder Bedienweg hat einen Ausfallmodus. Nasse Finger, leerer Akku, verlorene Kopplung - keiner davon darf dazu führen, dass der Kunde vor dem Fahrzeug steht.

**Falsch gewählt?**

- *Mit Pro-finder ja:* Naheliegend, aber der Pro-finder ist der **Fernsteuerungs**weg und braucht Mobilfunk. Ohne Netz auf dem Stellplatz ist er kein Zugang. Ein Backup, das dieselbe Voraussetzung wie das Original hat, ist keines.
  <br>↳ bezogen auf: „Ja, sofern zusätzlich ein Pro-finder verbaut ist“
- *Mit safe.lock ja:* safe.lock erweitert, was der Fingerprint kann - es macht ihn nicht ausfallsicher.
  <br>↳ bezogen auf: „Ja, sobald safe.lock verbaut ist“

**Mitnehmen:** **Prinzip 2 - Ein Zugangsweg ist kein Zugangsweg.** Sauberster Zweitweg: Funk-Handsender 868 (101064), unabhängig vom Smartphone, bis ca. 75 m, CR2032, kein Neuanlernen nach Batteriewechsel. Satz für den Kunden: „Nehmen Sie den Schlüssel trotzdem mit - nicht weil ich dem Finger misstraue, sondern weil Sie sonst nur einen Weg ins Fahrzeug haben.“

---

## POEL — Händlerbereich

| | |
|---|---|
| Fragen | 10 |
| Fragensatz-Version | 6 |
| Art | Das digitale Werkzeug für Beratung und Werkstatt |
| Lernziel | Den THITRONIK-Händlerbereich als tägliches Arbeitsmittel nutzen: Kundenunterlagen sauber von geschützten Einbaudaten trennen, Aufträge fundiert vorbereiten und den eigenen Werkstattservice stärken. |

**Quellen im Produktwissen:** `Öffentliche Website-Struktur (Stand 13.08.2026)`, `_intern/werkseinbau-eckernfoerde.md`, `produkte/gas-pro-iii.md`

> **Redaktioneller Hinweis (erscheint nicht im Quiz):** Fragenkatalog v6. Zehn Fragen. Redaktionsrunde 08/2026: POE-05 (Zuordnung Fundorte) entfernt, dafuer POE-11 zur Fahrzeugfreigabe - auch damit die Insel nicht aus zehn Einfachauswahlen besteht. POE-08 nennt Dateiname und vollen Pfad des Upgrade-/Update-Formulars. POE-10 laeuft jetzt ueber den Pro-finder statt ueber CampLock/VanLock; damit bleibt die Seriennummernlogik im Lehrplan, die mit FEH-03 auf FEHMARN weggefallen ist. Menuenamen, Dateiname und Dokumentenstaende vor jeder Schulung gegen die Website pruefen - der Pfad in POE-08 traegt die Jahreszahl 2024 im Dateinamen.

#### 1. Ein Kunde braucht die Konformitätserklärung nach 2014/53/EU für seinen Funk-Magnetkontakt. Wo findest du sie?

`POE-01` · Einfachauswahl · Suchauftrag

- Im Konfigurator
- **Im öffentlichen Supportbereich** ✓
- Beim Werkskundendienst anfordern
- Im Händlerfinder

**Auflösung:** Konformitätserklärungen liegen öffentlich unter thitronik.de/support. Weder Login noch Anruf nötig.

**Falsch gewählt?**

- *Werkskundendienst:* Genau der Reflex, den diese Insel abgewöhnen soll. Es ist eine der häufigsten telefonischen Anfragen - und sie ist zwei Klicks entfernt.
  <br>↳ bezogen auf: „Beim Werkskundendienst anfordern“

**Mitnehmen:** Alles, was ein Kunde bekommen darf, ist öffentlich. Wenn du es nicht findest, suchst du an der falschen Stelle - nicht im falschen Bereich.

#### 2. Du sendest dem Kunden eine Bedienungsanleitung und bereitest intern die fahrzeugspezifische Steckerbelegung vor. Welche Aufteilung ist richtig?

`POE-02` · Einfachauswahl · Öffentlich oder geschützt?

- Beides aus dem öffentlichen Supportbereich an den Kunden senden
- **Bedienungsanleitung öffentlich beziehen; Steckerbelegung geschützt im Händlerbereich nutzen** ✓
- Beides ausschließlich telefonisch bei THITRONIK anfordern
- Bedienungsanleitung aus dem Händlerbereich; Steckerbelegung aus dem Konfigurator

**Auflösung:** Kundenfähige Bedienungs- und Konformitätsunterlagen liegen öffentlich. Fahrzeugspezifische Steckerbelegungen und Einbauinformationen bleiben im geschützten Fachhändlerbereich.

**Falsch gewählt?**

- *Interne Einbaudaten weitergegeben:* Öffentliche Kundenunterlagen und geschützte Werkstattinformationen haben unterschiedliche Zielgruppen. Die Steckerbelegung ist Arbeitsgrundlage des Fachbetriebs, keine Kundenbeilage.
  <br>↳ bezogen auf: „Beides aus dem öffentlichen Supportbereich an den Kunden senden“
- *Alles telefonisch angefordert:* Der Händlerbereich soll genau diese Routineanfragen vermeiden und stellt die aktuelle Unterlage direkt für die Auftragsvorbereitung bereit.
  <br>↳ bezogen auf: „Beides ausschließlich telefonisch bei THITRONIK anfordern“

**Mitnehmen:** Faustregel: Bedienung für den Kunden öffentlich, fahrzeugspezifischer Einbau für den Fachbetrieb geschützt.

#### 3. Du brauchst die fahrzeugspezifische Einbauunterlage mit Steckerbelegung für einen Sprinter VS30. Wo bekommst du sie?

`POE-03` · Einfachauswahl · Geschützte Einbauunterlagen

- Öffentlicher Downloadbereich, Rubrik Alarmanlagen
- **Über den geschützten Händlerbereich bzw. THITRONIK direkt** ✓
- In der FAQ Allgemein
- Im Konfigurator-PDF

**Auflösung:** CAN-Anschlusspläne, Steckerbelegungen und Bauteillagen sind bewusst nicht öffentlich. Für Fachhändler: thitronik.de/haendler-bereich, technischer Support +49 4351 76744-112.

**Falsch gewählt?**

- *Öffentlicher Downloadbereich:* Wer dort sucht, sucht vergeblich - und das fühlt sich an wie ein Fehler der Website. Es ist Absicht: Diese Unterlagen gehören in Fachhand, nicht in die Hände dessen, der am Samstag selbst schrauben will.
  <br>↳ bezogen auf: „Öffentlicher Downloadbereich, Rubrik Alarmanlagen“

**Mitnehmen:** Nicht auffindbar heißt hier nicht „gibt es nicht“, sondern „nicht für alle“. Der Anruf unter -112 ist an dieser Stelle der richtige Weg, nicht der faule.

#### 4. Eine neue Fahrzeugvariante steht in der Werkstatt, im Händlerbereich findest du aber keine passende Einbauunterlage. Wie gehst du vor?

`POE-04` · Einfachauswahl · Freigabestatus

- Anhand eines ähnlichen Modelljahrs anschließen und testen
- **Freigabe und passende Unterlage über den technischen Support klären, bevor eingebaut wird** ✓
- Den öffentlichen Schaltplan des Basisfahrzeugs verwenden
- Den Einbau beginnen und offene Anschlüsse später ergänzen

**Auflösung:** Fehlt die fahrzeugspezifische Unterlage, fehlt die belastbare Einbaugrundlage. Erst Freigabe und aktuellen Anschlussweg klären, dann Termin und Arbeit bestätigen.

**Falsch gewählt?**

- *Ähnliches Fahrzeug übernommen:* Modellpflege kann Stecker, CAN-Signale und Softwarestände ändern. Ähnlich ist keine Freigabe.
  <br>↳ bezogen auf: „Anhand eines ähnlichen Modelljahrs anschließen und testen“
- *Einbau auf Verdacht begonnen:* Ohne belastbare Einbaugrundlage riskierst du Zusatzarbeit, beschädigte Fahrzeugelektrik und einen Termin, den du nicht seriös halten kannst.
  <br>↳ bezogen auf: „Den Einbau beginnen und offene Anschlüsse später ergänzen“

**Mitnehmen:** Nicht gefundene Unterlage bedeutet nicht improvisieren, sondern Freigabestatus klären.

#### 5. Wo findest du Werbemittel und Displaymaterial für dein Sortiment?

`POE-06` · Einfachauswahl · Werkstattbedarf

- Im öffentlichen Downloadbereich
- **Im eingeloggten Händlerbereich** ✓
- Nur über den Außendienst
- Im Händlerfinder

**Auflösung:** Der Händlerbereich enthält News, Termine, Werkstattunterlagen und Werbemittel.

**Falsch gewählt?**

- *Nur über den Außendienst:* Funktioniert auch - dauert aber Tage statt Minuten und bindet jemanden, der besser verkauft.
  <br>↳ bezogen auf: „Nur über den Außendienst“

**Mitnehmen:** Der Login lohnt sich einmalig und spart dauerhaft. Vieles, was Händler telefonisch anfragen, liegt dort bereits fertig.

#### 6. Ein Endkunde aus Bayern fragt, wo er den Einbau machen lassen kann. Worauf verweist du?

`POE-07` · Einfachauswahl · Kunde am Telefon

- **Den Händlerfinder auf der THITRONIK-Website** ✓
- Die Support-Hotline
- Den Konfigurator
- Den Werkseinbau in Eckernförde

**Auflösung:** Der Händlerfinder ist genau dafür gebaut.

**Falsch gewählt?**

- *Werkseinbau Eckernförde:* Eine Möglichkeit, aber für einen Kunden aus Bayern selten die naheliegende - und wer sie als einzige nennt, verschenkt einen Auftrag an einen Kollegen in der Nähe des Kunden.
  <br>↳ bezogen auf: „Den Werkseinbau in Eckernförde“

**Mitnehmen:** Der Händlerfinder ist auch dein eigener Vertriebskanal. Wer ihn kennt, wird über ihn gefunden.

#### 7. Eine WiPro III soll zum Upgrade oder Update eingesendet werden. Wo findest du das aktuelle Formular?

`POE-08` · Einfachauswahl · Formular finden

- **Support → Downloads → Alarmanlagen → Sonstiges** ✓
- Konfigurator → Ergebnis-PDF
- Händlerfinder → eigener Betrieb
- FAQ → Mobilfunk

**Auflösung:** Das aktuelle WiPro III Upgrade-/Update-Formular liegt im öffentlichen Support unter Downloads → Alarmanlagen → Sonstiges - als **wipro_iii_upgrade_update_service_2024-de.pdf**.

**Falsch gewählt?**

- *Konfigurator gewählt:* Der Konfigurator erstellt eine Systemempfehlung. Serviceformulare werden im Downloadbereich gepflegt.
  <br>↳ bezogen auf: „Konfigurator → Ergebnis-PDF“
- *Falschen Website-Bereich gewählt:* Händlerfinder und FAQ lösen andere Aufgaben. Für ein auszufüllendes Serviceformular führt der Weg direkt zu den Downloads.
  <br>↳ bezogen auf: „Händlerfinder → eigener Betrieb“ · „FAQ → Mobilfunk“

**Mitnehmen:** Voller Pfad, falls es schnell gehen muss: thitronik.de/fileadmin/user_upload/downloads/alarmanlagen/sonstiges/wipro_iii_upgrade_update_service_2024-de.pdf - und trotzdem jedes Mal frisch herunterladen. Eine gespeicherte alte Kopie kann Pflichtfelder oder aktuelle Versandhinweise missen.

#### 8. Im Downloadbereich findest du verschiedene Pro-finder-Anleitungen. Wie wählst du die richtige aus?

`POE-10` · Einfachauswahl · Passende Anleitung wählen

- Immer die Datei mit dem neuesten Upload-Datum öffnen
- **Gerätegeneration an der vollständigen Seriennummer bestimmen und genau die dazu gekennzeichnete Anleitung verwenden** ✓
- Pro-finder-Anleitungen gelten über alle Gerätestände hinweg gleich
- Die kürzeste Anleitung ist die aktuelle Werkstattfassung

**Auflösung:** Die vollständige Seriennummer entscheidet. Beim Pro-finder hängen SIM-Format, PIN-Verhalten, Blinkcodes und Anschlussbelegung am Gerätestand - ab **0699-045** etwa Nano-SIM und abgeschaltete PIN-Abfrage, davor Micro- beziehungsweise Mini-SIM.

**Falsch gewählt?**

- *Nur nach Datum gewählt:* Die neueste Datei kann für eine andere Gerätegeneration gedacht sein. Der Abgleich beginnt am verbauten Gerät, nicht in der Dateiliste.
  <br>↳ bezogen auf: „Immer die Datei mit dem neuesten Upload-Datum öffnen“
- *Dokumente nach Ähnlichkeit gewählt:* Ähnlicher Name oder Umfang ist kein Nachweis für den Gerätestand. Nur die Seriennummer verbindet Gerät und Anleitung eindeutig.
  <br>↳ bezogen auf: „Pro-finder-Anleitungen gelten über alle Gerätestände hinweg gleich“ · „Die kürzeste Anleitung ist die aktuelle Werkstattfassung“

**Mitnehmen:** Dokumentenstand heißt nicht neuestes Datum, sondern passendster freigegebener Stand für genau dieses Gerät. Deshalb steht die vollständige Seriennummer am Anfang jeder Recherche - nicht am Ende.

#### 9. Der Kunde bringt eine ältere Einbauanleitung mit, im Händlerbereich liegt eine neuere Fassung. Was ist der professionelle Umgang damit?

`POE-09` · Einfachauswahl · Dokumentenstand

- Die ältere Anleitung verwenden, weil sie zum Kaufdatum gehört
- **Aktuellen Freigabe- und Dokumentenstand prüfen und die gültige Fassung verwenden** ✓
- Beide Anleitungen mischen und jeweils den leichteren Schritt wählen
- Nur nach Erinnerung arbeiten, damit sich die Fassungen nicht widersprechen

**Auflösung:** Für den Einbau zählt der aktuell freigegebene Dokumentenstand zum konkreten Fahrzeug und Produkt. Abweichungen werden geklärt, nicht gemischt.

**Falsch gewählt?**

- *Kaufdatum mit Gültigkeit verwechselt:* Eine neuere Anleitung kann technische Korrekturen oder geänderte Fahrzeugstände enthalten. Das Alter des Geräts allein entscheidet nicht.
  <br>↳ bezogen auf: „Die ältere Anleitung verwenden, weil sie zum Kaufdatum gehört“
- *Dokumente vermischt:* Ein Mischverfahren ist nicht reproduzierbar und kann sicherheitsrelevante Änderungen aushebeln. Widersprüche werden vor dem Einbau geklärt.
  <br>↳ bezogen auf: „Beide Anleitungen mischen und jeweils den leichteren Schritt wählen“

**Mitnehmen:** Der Händlerbereich ist nicht nur ein Archiv, sondern deine Quelle für den aktuellen Arbeitsstand.

#### 10. Ein Kunde fragt, ob seine Fahrzeugvariante freigegeben ist. Woran machst du die Antwort fest? Wähle alle zutreffenden.

`POE-11` · Mehrfachauswahl · Fahrzeugfreigabe prüfen

- **An der aktuellen fahrzeug- und ausführungsspezifischen Einbauanleitung aus dem Händlerbereich** ✓
- **An Baujahr beziehungsweise Modelljahr der konkreten Fahrzeugvariante** ✓
- **An Seriennummer und Softwarestand der vorgesehenen Zentrale** ✓
- An der Fahrzeugübersicht auf der Website - sie ist das Freigabedokument
- An der Anleitung einer baugleichen Variante desselben Herstellers
- An der Auskunft eines Kollegen, der dieselbe Baureihe schon gemacht hat

**Auflösung:** Die Fahrzeugübersicht ordnet ein, sie gibt nicht frei. Verbindlich ist die **aktuelle fahrzeug- und ausführungsspezifische Einbauanleitung** - und die passt nur, wenn Fahrzeug, Baujahr beziehungsweise Modelljahr, Ausführung, Seriennummer und Softwarestand zusammengehören.

**Falsch gewählt?**

- *Die Übersicht als Freigabe gelesen:* Sie ist gemacht, um schnell einzuordnen, nicht um zuzusagen. Zwischen Übersicht und Anleitung liegen Modelljahr, Ausstattung und Softwarestand.
  <br>↳ bezogen auf: „An der Fahrzeugübersicht auf der Website - sie ist das Freigabedokument“
- *Von der baugleichen Variante abgeleitet:* Der teuerste Kurzschluss dieser Insel. Der Iveco Daily ab Modelljahr 2025/2026 hat ein geändertes BCM und ist derzeit nicht freigegeben - von außen sieht er aus wie der Daily daneben.
  <br>↳ bezogen auf: „An der Anleitung einer baugleichen Variante desselben Herstellers“
- *Auf die Kollegenauskunft gebaut:* Erfahrung ist wertvoll und ersetzt trotzdem kein Dokument. Was der Kollege verbaut hat, war vielleicht ein anderer Softwarestand.
  <br>↳ bezogen auf: „An der Auskunft eines Kollegen, der dieselbe Baureihe schon gemacht hat“

**Mitnehmen:** Freigabe ist kein einzelner Haken, sondern eine Kette: Fahrzeug, Modelljahr, Ausführung, Softwarestand, passende Anleitung. Reißt ein Glied, ist die Frage nicht beantwortet, sondern geraten.

---

## HIDDENSEE — Funk-Magnetkontakte & Leitungsverbindungen

| | |
|---|---|
| Fragen | 10 |
| Fragensatz-Version | 6 |
| Art | Anlernen, montieren, abzweigen und crimpen |
| Lernziel | Funk-Magnetkontakte zuverlässig anlernen und montieren sowie elektrische Abgriffe mit dem passenden Verbinder und Werkzeug fachgerecht ausführen. |

**Quellen im Produktwissen:** `produkte/funk-magnetkontakt.md`, `fahrzeuge/ford-transit-6g.md`, `referenz/fahrzeugkompatibilitaet.md`

> **Redaktioneller Hinweis (erscheint nicht im Quiz):** Fragenkatalog v6. Zehn Fragen. Redaktionsrunde 08/2026: HID-02 (22 mm gegen 25 mm), HID-04 (Zuordnung Regel je Ausfuehrung) und HID-09 (welches Teil kommt wohin) entfernt. Neu HID-13 zur Ausrichtung des Klebepads. Mit HID-02 und HID-04 sind zwei Angaben aus dem Fragensatz verschwunden, die in der Werkstatt zaehlen: der Montageradius von hoechstens 22 mm bei der Standardausfuehrung und die Montageadapter 100428 / 100729. Wenn sie zurueck sollen, gehoeren sie in eine neue Frage, nicht in die alte Form. Die Abstandsangaben der Kontaktvarianten sowie konkrete Verbinderfreigaben vor jeder Schulung gegen den aktuellen Anleitungsstand pruefen.

#### 1. Ein Funk-Magnetkontakt ließ sich problemlos anlernen - beim Öffnen der Klappe passiert aber nichts. Woran liegt es?

`HID-01` · Einfachauswahl · Anlernen und Funktionstest

- Die Batterie ist zu schwach zum Senden
- **Die Platine liegt falsch herum - Sende-LED zeigt zum Magneten** ✓
- Der Kontakt wurde an der Zentrale nicht gespeichert
- Die Anlage war beim Test nicht scharf geschaltet

**Auflösung:** In dieser Ausrichtung ist Anlernen möglich, eine Alarmierung aber nicht. Richtig: Sende-LED zeigt **weg** vom Magneten, nach oben.

**Falsch gewählt?**

- *Nicht gespeichert:* Der Denkfehler steckt schon in der Frage - „ließ sich problemlos anlernen“. Genau das macht diesen Fehler so tückisch: Die Anlern-Bestätigung kommt, und man glaubt, alles sei gut.
  <br>↳ bezogen auf: „Der Kontakt wurde an der Zentrale nicht gespeichert“
- *Anlage nicht scharf:* Ein guter Reflex und immer wert zu prüfen. Bei einem frisch montierten Kontakt in falscher Lage bleibt der Alarm aber auch scharf geschaltet aus.
  <br>↳ bezogen auf: „Die Anlage war beim Test nicht scharf geschaltet“

**Mitnehmen:** Die Anlern-Bestätigung beweist gar nichts. Nur der Testalarm mit scharfer Anlage tut es - **Prinzip 3**.

#### 2. Bei der wasserdichten Ausführung: Ab welchem Abstand gilt der Kontakt sicher als „offen“?

`HID-03` · Einfachauswahl · Öffnungsabstand

- Ab 22 mm
- **Ab mehr als 30 mm** ✓
- Sobald die Teile sichtbar getrennt sind
- Ab 15 mm

**Auflösung:** Zwei verschiedene Werte für zwei verschiedene Zustände: **22 mm** ist die Obergrenze im **geschlossenen** Zustand, **über 30 mm** ist die **Auslöseschwelle**.

**Falsch gewählt?**

- *22 mm:* Der wahrscheinlichste Fehlgriff, weil 22 mm die Zahl ist, die man sich zu dieser Ausführung merkt. Genau darin liegt die Falle: Zwei Werte, die im selben Datenblatt stehen und Gegenteiliges bedeuten.
  <br>↳ bezogen auf: „Ab 22 mm“
- *Sichtbar getrennt:* Beim Funktionstest reicht das oft nicht. Zwei Finger breit auseinander sind je nach Handgröße 20 mm - und damit noch „geschlossen“.
  <br>↳ bezogen auf: „Sobald die Teile sichtbar getrennt sind“

**Mitnehmen:** Beim Test großzügig trennen, nicht andeutungsweise. Ein halber Test ist ein falsches Ergebnis mit Brief und Siegel.

#### 3. Der Kontakt an der metallischen Heckgarage arbeitet unzuverlässig. Erste Maßnahme?

`HID-05` · Einfachauswahl · Funkreichweite

- Batterie tauschen
- Kontakt löschen und neu anlernen
- **Montageadapter setzen und Reichweitentest wiederholen** ✓
- Zweiten Kontakt parallel montieren

**Auflösung:** Metall in unmittelbarer Nähe dämpft die Funkstrecke. Der Adapter (100428 schwarz / 100729 weiß) schafft Abstand zur Metallfläche und überbrückt zugleich größere Spaltmaße.

**Falsch gewählt?**

- *Neu anlernen:* Der Standardreflex bei Funkproblemen. Aber „unzuverlässig“ heißt: Er funktioniert manchmal - also ist er angelernt. Anlernen behebt keine Reichweitenprobleme.
  <br>↳ bezogen auf: „Kontakt löschen und neu anlernen“
- *Zweiter Kontakt:* Verdoppelt das Problem statt es zu lösen. Beide sitzen dann auf demselben Metall.
  <br>↳ bezogen auf: „Zweiten Kontakt parallel montieren“

**Mitnehmen:** „Manchmal“ zeigt fast immer auf die Funkstrecke, „nie“ auf Anlernen oder Ausrichtung. Diese Unterscheidung spart dir die halbe Fehlersuche.

#### 4. Ein elektrischer Abzweig funktioniert im Stand, fällt aber bei Fahrt über Bodenwellen sporadisch aus. Was prüfst du zuerst?

`HID-06` · Einfachauswahl · Verbindungsfehler diagnostizieren

**Bild zur Frage:** `/media/hiddensee/hid-gelverbinder.webp` — Gelgefüllte Abzweigverbinder mit Leitungen

- **Verbindergröße, vollständigen Leitersitz, definierte Verpressung, Zugprobe und Zugentlastung** ✓
- Nur den Softwarestand der WiPro III
- Die Batterie jedes Funk-Magnetkontakts
- Ob der Kunde die App neu installiert hat

**Auflösung:** Ein erschütterungsabhängiger Ausfall passt zuerst zu einem mechanisch unzuverlässigen Leitungsabgriff: falscher Querschnitt, unvollständiger Sitz, ungeeignetes Werkzeug oder fehlende Zugentlastung.

**Falsch gewählt?**

- *Mechanisches Muster übersehen:* Softwarestände ändern sich nicht mit der Bodenwelle. Das reproduzierbare Bewegungsmuster lenkt die erste Prüfung an Verbindung und Verlegung.
  <br>↳ bezogen auf: „Nur den Softwarestand der WiPro III“
- *Anderes Teilsystem geprüft:* Funkbatterien und App erklären keinen ausschließlich erschütterungsabhängigen kabelgebundenen Abzweig.
  <br>↳ bezogen auf: „Die Batterie jedes Funk-Magnetkontakts“ · „Ob der Kunde die App neu installiert hat“

**Mitnehmen:** Symptom und Einbauart zusammen denken: Bei Bewegungsaussetzern zuerst mechanischen Sitz und Zugentlastung prüfen, bevor Teile getauscht werden.

#### 5. Ein Kollege will feindrähtige Litzen vor dem Crimpen verzinnen, damit sie kompakter werden. Wie reagierst du?

`HID-07` · Einfachauswahl · Crimpvorbereitung

- **Nicht verzinnen; passenden Verbinder und definiertes Crimpwerkzeug für den vorgesehenen Leiter verwenden** ✓
- Vollständig verzinnen und mit einer Kombizange flach drücken
- Nur die vordere Hälfte verzinnen, damit der Leiter flexibel bleibt
- Zusätzlich Sekundenkleber in den Verbinder geben

**Auflösung:** Verzinnte Litzen können unter dauerhaftem Pressdruck nachgeben. Eine belastbare Crimpung entsteht mit passendem Leiterzustand, Verbinder und dafür vorgesehenem Werkzeug.

**Falsch gewählt?**

- *Verzinnen als Verstärkung missverstanden:* Lötzinn macht aus einer nicht passenden Crimpkombination keine passende. Unter Druck kann die Verbindung mit der Zeit an Klemmkraft verlieren.
  <br>↳ bezogen auf: „Vollständig verzinnen und mit einer Kombizange flach drücken“ · „Nur die vordere Hälfte verzinnen, damit der Leiter flexibel bleibt“
- *Klebstoff statt Verbindungstechnik:* Klebstoff ersetzt weder den definierten elektrischen Kontakt noch die mechanische Kontrolle der Crimpung.
  <br>↳ bezogen auf: „Zusätzlich Sekundenkleber in den Verbinder geben“

**Mitnehmen:** Crimpen ist ein abgestimmtes System aus Leiter, Verbinder und Werkzeug. Zusätze nach Gefühl verschlechtern die Reproduzierbarkeit.

#### 6. Es ist November, die Werkstatt ist auf 8 °C runtergekühlt. Du sollst Klebepads verarbeiten. Was gilt?

`HID-08` · Einfachauswahl · Klebemontage bei Kälte

- Kein Problem, Pads sind temperaturunabhängig
- **Nicht kleben - unter 15 °C Oberflächentemperatur nicht verarbeiten** ✓
- Pad kurz mit Heißluft erwärmen und sofort belasten
- Zusätzlich Sekundenkleber auftragen

**Auflösung:** Unter 15 °C Oberflächentemperatur bindet der Kleber nicht richtig ab.

**Falsch gewählt?**

- *Mit Heißluft erwärmen:* Der cleverste der falschen Wege - und der verlockendste, weil er den Termin rettet. Das Pad wird warm, klebt sofort scheinbar gut, und die Endfestigkeit erreicht es trotzdem nie. Der Fehler zeigt sich Wochen später beim Kunden.
  <br>↳ bezogen auf: „Pad kurz mit Heißluft erwärmen und sofort belasten“
- *Temperaturunabhängig:* Der Fehler mit der längsten Latenz im ganzen Katalog. Der Kontakt hält den ganzen Winter und fällt im Frühjahr ab.
  <br>↳ bezogen auf: „Kein Problem, Pads sind temperaturunabhängig“

**Mitnehmen:** Zwei Dinge gehören dazu: Endfestigkeit erst nach ca. **24 Stunden**, und die Fläche muss sauber, trocken und fettfrei sein. Ein zu kalt oder zu schmutzig geklebter Kontakt fällt nicht sofort ab - er fällt dann ab, wenn niemand mehr an den Einbau denkt.

#### 7. Bringe die Montageschritte des Funk-Magnetkontakts in die richtige Reihenfolge.

`HID-10` · Reihenfolge · Montageablauf

1. WiPro III in den Anlernmodus versetzen und Funk-Magnetkontakt anlernen
2. Reichweitentest am geplanten Ort
3. Endgültig kleben oder verschrauben
4. Testalarm mit scharfer Anlage

**Auflösung:** Jeder Schritt setzt den vorherigen voraus - und jeder prüft etwas anderes. Der Reichweitentest prüft den **Ort**, der Testalarm die **Funktion**.

**Falsch gewählt?**

- *Erst kleben, dann testen:* Der teuerste Ablauf. Stimmt der Ort nicht, brauchst du ein neues Pad, eine neu vorbereitete Fläche und wieder 24 Stunden.
- *Testalarm weggelassen:* Dann bleibt der Klassiker mit der falsch herum liegenden Platine unentdeckt - angelernt, montiert, und im Ernstfall passiert nichts.

**Mitnehmen:** **Prinzip 3 - montiert ist nicht funktionsfähig.** Zwei Tests, zwei verschiedene Fragen: „Kommt das Signal von hier an?“ und „Löst die Anlage wirklich aus?“ Keiner ersetzt den anderen.

#### 8. Du willst an einer Fahrzeugleitung einen gelgefüllten Abzweigverbinder setzen. Was muss vor dem Verpressen feststehen?

`HID-11` · Einfachauswahl · Gelgefüllter Abzweigverbinder

**Bild zur Frage:** `/media/hiddensee/hid-gelverbinder.webp` — Blaue gelgefüllte Abzweigverbinder mit Leitungen

- **Stecker, Pin, Leitungsfarbe und gemessenes Signal stimmen mit der fahrzeugspezifischen Unterlage überein** ✓
- Die Leitungsfarbe ähnelt der Farbe in einem anderen Fahrzeugmodell
- Der Verbinder lässt sich mit möglichst wenig Kraft schließen
- Die Fahrzeugbatterie bleibt angeschlossen, damit das Signal sofort sichtbar ist

**Auflösung:** Ein Abzweig wird erst gesetzt, wenn Stecker, Pin, Leitungsfarbe und das tatsächlich gemessene Signal gemeinsam verifiziert sind. Anschlussarbeiten erfolgen spannungsfrei.

**Falsch gewählt?**

- *Nur nach Leitungsfarbe gearbeitet:* Leitungsfarben können sich zwischen Modelljahren und Steckern wiederholen. Ohne Pin und Messung ist die Farbe kein belastbarer Anschlussnachweis.
  <br>↳ bezogen auf: „Die Leitungsfarbe ähnelt der Farbe in einem anderen Fahrzeugmodell“
- *Unter Spannung verpresst:* Gemessen wird vorab kontrolliert; die eigentliche Anschlussarbeit erfolgt spannungsfrei, um Kurzschluss und Schäden an Steuergeräten zu vermeiden.
  <br>↳ bezogen auf: „Die Fahrzeugbatterie bleibt angeschlossen, damit das Signal sofort sichtbar ist“

**Mitnehmen:** Erst eindeutig identifizieren und messen, dann spannungsfrei verbinden. Der Verbinder ersetzt keine Diagnose.

#### 9. Woran erkennst du eine fachgerechte Crimpverbindung? Wähle alle zutreffenden.

`HID-12` · Mehrfachauswahl · Crimpen

- **Verbinder und Crimpeinsatz passen zum Leitungsquerschnitt** ✓
- **Es wird das dafür vorgesehene Crimpwerkzeug verwendet** ✓
- **Die Verbindung hält einer vorsichtigen Zugprobe stand** ✓
- **Leitung und Verbindung sind anschließend isoliert, geschützt und zugentlastet** ✓
- Eine Kombizange drückt den Verbinder sichtbar flach
- Die Litzen werden vor dem Crimpen verdrillt und verzinnt

**Auflösung:** Eine belastbare Crimpung entsteht aus passendem Material, definiertem Werkzeug, mechanischer Kontrolle und geschützter Verlegung.

**Falsch gewählt?**

- *Kombizange statt Crimpwerkzeug:* Sichtbar flach ist kein Qualitätsmerkmal. Ohne definierten Pressbereich können Leiter beschädigt oder nur scheinbar festgeklemmt werden.
  <br>↳ bezogen auf: „Eine Kombizange drückt den Verbinder sichtbar flach“
- *Litzen verzinnt:* Verzinnte Litzen können unter Druck nachgeben. Eine Crimpverbindung wird mit dem dafür vorgesehenen Leiterzustand und Verbinder hergestellt.
  <br>↳ bezogen auf: „Die Litzen werden vor dem Crimpen verdrillt und verzinnt“

**Mitnehmen:** Die Zugprobe prüft die Verbindung; Zugentlastung sorgt dafür, dass sie im Fahrzeugbetrieb nicht ständig erneut geprüft wird.

#### 10. Du klebst einen Funk-Magnetkontakt auf eine raue Kunststoffverkleidung. Wie herum gehört das Klebepad?

`HID-13` · Einfachauswahl · Klebemontage

- **Unbedruckte Seite auf die Fahrzeugoberfläche, bedruckte Seite auf Sender und Magnet** ✓
- Bedruckte Seite auf die Fahrzeugoberfläche, unbedruckte auf Sender und Magnet
- Egal - das Pad klebt auf beiden Seiten gleich
- Beide Flächen vorher anschleifen, dann spielt die Ausrichtung keine Rolle

**Auflösung:** Auf rauen Oberflächen kommt die **unbedruckte** Padseite auf die Fahrzeugoberfläche und die bedruckte auf Sender beziehungsweise Magnet. Auf Glas oder Acrylglas dreht sich das Bild: Dort zeigt die bedruckte Seite nach außen - sie soll gesehen werden und wirkt abschreckend.

**Falsch gewählt?**

- *Egal, es klebt ja beidseitig:* Stimmt sogar - und genau deshalb fällt der Fehler in der Werkstatt nie auf. Die beiden Seiten sind trotzdem für verschiedene Untergründe gemacht, und der Unterschied zeigt sich erst nach Monaten.
  <br>↳ bezogen auf: „Egal - das Pad klebt auf beiden Seiten gleich“
- *Fläche anschleifen:* Bringt nichts und beschädigt die Verkleidung. Verlangt ist eine ebene Fläche, sauber, trocken und fettfrei - mehr nicht.
  <br>↳ bezogen auf: „Beide Flächen vorher anschleifen, dann spielt die Ausrichtung keine Rolle“

**Mitnehmen:** Nach dem Kleben nichts belasten: Die Endfestigkeit ist erst nach etwa **24 Stunden** erreicht. Und unter **15 °C** Oberflächentemperatur wird gar nicht erst geklebt.

---

## SAMSØ — Einbauorte im Fahrzeug

| | |
|---|---|
| Fragen | 10 |
| Fragensatz-Version | 11 |
| Art | Wo kommt was hin? |
| Lernziel | Physik bestimmt den Einbauort, nicht der freie Platz. Wer das verstanden hat, muss keine Liste auswendig lernen. |

**Quellen im Produktwissen:** `produkte/pro-finder.md`, `produkte/gas-pro-iii.md`, `produkte/nfc-modul.md`, `produkte/funk-rauchmelder.md`, `produkte/wipro-iii.md`, `fahrzeuge/*`

> **Redaktioneller Hinweis (erscheint nicht im Quiz):** Fragenkatalog v11. Zehn Fragen. Redaktionsrunde 08/2026: SAM-11 neu (Sicherheitsabstand zu Batterie und Nasszelle). SAM-06 nennt die Praxisempfehlung, das NFC Modul hinter der Umweltplakette zu verstecken. SAM-09 fragt nach der Montage der externen GPS-Antenne: Aufkleber nach unten, Empfangsseite nach oben; die Aufloesung zeigt dazu sam-antenne-unterseite.webp. ACHTUNG bei diesem Bild: Es zeigt die externe GSM-Antenne, nicht die GPS-pro - die Bauform und die Lage des Aufklebers stimmen, der Schriftzug auf dem Etikett liest aber GSM ANTENNA. Deshalb nennen Alt-Text und Bildunterschrift bewusst kein Produkt. Sobald ein Foto der GPS-pro vorliegt, wird es getauscht. Nicht verwendbar sind das alte sam-produkt-gps-pro.webp und seine Quelle Wissen/03_Medien/produkte/GPS-pro.png - beide tragen Fantasietext auf dem Etikett und zeigen den Aufkleber oben. SAM-02, SAM-03 und SAM-10 arbeiten mit echten Produkt- beziehungsweise Einbaufotos. Einbauabstaende und Kabellaengen vor jeder Schulung gegen den aktuellen Anleitungsstand pruefen.

#### 1. Ordne jedem Gerät den vorgesehenen Einbauort zu.

`SAM-01` · Zuordnung · Einbauorte

| Zuzuordnen | Richtig |
|---|---|
| G.A.S.-pro III (Propan, Butan, KO-Gase) | Senkrecht im Wohnraum, ca. 10-20 cm über dem Boden |
| G.A.S.-pro III CO | Senkrecht, ca. 10-20 cm unter der Decke |
| T.S.A. Funk-Rauchmelder | An der Decke oder seitlich nahe der Decke |
| NFC Modul | Innen an einer geeigneten Scheibe, von außen erreichbar |

Weitere Auswahlmöglichkeiten, die zu nichts passen: Im abgetrennten Bodenstauraum · Im Schrank neben der WiPro III

**Auflösung:** Jeder Ort folgt aus der Physik. Flüssiggas ist schwerer als Luft und sammelt sich unten. CO verteilt sich anders und wird deckennah erfasst. Rauch steigt auf. Das NFC Modul muss von außen erreichbar sein und sitzt deshalb hinter der Scheibe.

**Falsch gewählt?**

- *Gas und CO vertauscht:* Der folgenreichste Fehler dieser Insel. Ein tief montierter CO-Sensor meldet zu spät, ein hoch montierter Gassensor gar nicht.
- *Gaswarner in den Bodenstauraum:* Nah dran gedacht - unten ist richtig, aber der Sensor muss den **Wohnraum** überwachen, nicht einen abgetrennten Stauraum.

**Mitnehmen:** Wenn du den Ort vergessen hast, frag dich: Wohin bewegt sich das, was das Gerät finden soll? Die Antwort ist der Einbauort.

#### 2. Welches Bild zeigt den vorgesehenen Einbauort des Gaswarners?

`SAM-02` · Einfachauswahl · Einbauort Gaswarner

> Achte auf die Höhe über dem Boden und auf die direkte Umgebung.

- `/media/samsoe/sam-gas-a.webp` — Gaswarner an einer senkrechten Fläche neben einer runden Öffnung, auf einer schwarzen Montageplatte
- `/media/samsoe/sam-gas-b.webp` — Gaswarner im Inneren eines Kleiderschranks, darüber hängen Kleiderbügel
- `/media/samsoe/sam-gas-c.webp` — Gaswarner oben an der Bedienkonsole über der Fahrerhaustür
- **`/media/samsoe/sam-gas-d.webp` — Gaswarner bodennah an der Verkleidung eines Sitzkastens** ✓

**Auflösung:** Senkrechte Fläche, etwa 10-20 cm über dem Boden, im überwachten Wohnraum.

**Falsch gewählt?**

- *Der Kleiderschrank:* Die Höhe stimmt manchmal sogar - aber ein geschlossener Schrank ist ein eigener Luftraum. Was dort gemessen wird, sagt über den Wohnraum nichts.
  <br>↳ bezogen auf: „Gaswarner im Inneren eines Kleiderschranks, darüber hängen Kleiderbügel“
- *Die Bedienkonsole über der Fahrerhaustür:* Sieht nach ordentlicher Werkstattarbeit aus und ist gut erreichbar. Für einen Sensor, der schweres Gas finden soll, ist es der denkbar schlechteste Ort.
  <br>↳ bezogen auf: „Gaswarner oben an der Bedienkonsole über der Fahrerhaustür“

**Mitnehmen:** Weitere ungeeignete Orte: gegenüber einem Heizungsausströmer und neben einer AGM-Blei-Aufbaubatterie, die beim Laden ausgast und Fehlalarme auslöst. Mindestens 1 m Abstand zu Batterien und Nasszelle.

#### 3. Auf welchem Bild ist der Pro-finder korrekt montiert?

`SAM-03` · Einfachauswahl · Einbauort Pro-finder

> Prüfe Gehäuselage, Anschlüsse und Gerätekennzeichnung.

- `/media/samsoe/sam-finder-a.webp` — Modul mit Antennenanschluss, hochkant hinter einer Verkleidung
- `/media/samsoe/sam-finder-b.webp` — Unbeschriftetes Modul mit rotem Klebepad
- `/media/samsoe/sam-finder-c.webp` — Modul mit zwei weißen Steckverbindern
- **`/media/samsoe/sam-finder-d.webp` — Modul mit blauem Aufkleber und mehrfarbigem Kabelsatz, flach liegend** ✓

**Auflösung:** Flach liegend, Aufkleber „GPS inside“ nach oben, damit die integrierte GPS-Antenne freie Sicht zum Himmel hat.

**Bild zur Auflösung:** `/media/samsoe/sam-finder-loesung.webp` — Der Aufkleber muss bei der Montage nach oben zeigen.

**Falsch gewählt?**

- *Das hochkant stehende Modul:* Platzsparend und sauber verlegt - aber eine hochkant stehende GPS-Antenne verliert einen Großteil ihres Empfangs. Und niemand merkt es beim Einbau.
  <br>↳ bezogen auf: „Modul mit Antennenanschluss, hochkant hinter einer Verkleidung“

**Mitnehmen:** Der Pro-finder wird versteckt montiert, aber nicht vergraben: trockener Innenraum, gegen Zugriff gesichert, für den Service erreichbar. Beim Einbau immer zuerst schauen, wo „GPS inside“ steht.

#### 4. Welche Merkmale erfüllt ein geeigneter Einbauort der WiPro III? Wähle alle zutreffenden.

`SAM-04` · Mehrfachauswahl · Einbauort der Zentrale

- **Trocken und vor direkter Feuchtigkeit geschützt** ✓
- **Für Diagnose und Service weiterhin erreichbar** ✓
- **So gewählt, dass Antenne und Funkstrecke nicht unmittelbar durch Metall abgeschirmt werden** ✓
- Im Motorraum nahe der Fahrzeugbatterie
- Hinter einer vollständig geschlossenen Metallverkleidung
- Dort, wo die Antennenleitung möglichst eng aufgewickelt werden kann

**Auflösung:** Ein guter Einbauort schützt die Zentrale, hält sie servicefähig und berücksichtigt die Funkphysik. Freier Platz allein ist kein Auswahlkriterium.

**Falsch gewählt?**

- *Motorraum gewählt:* Kurze Versorgungswege ersetzen keinen geschützten Innenraum-Einbau. Temperatur, Feuchtigkeit und Servicezugang sprechen dagegen.
  <br>↳ bezogen auf: „Im Motorraum nahe der Fahrzeugbatterie“
- *Funkstrecke verschlechtert:* Metall schirmt ab, eine eng aufgewickelte Antennenleitung verändert die vorgesehene Antennenwirkung. Der Einbauort muss beides vermeiden.
  <br>↳ bezogen auf: „Hinter einer vollständig geschlossenen Metallverkleidung“ · „Dort, wo die Antennenleitung möglichst eng aufgewickelt werden kann“

**Mitnehmen:** Einbauort = Schutz + Servicezugang + Funkstrecke. Wenn einer der drei Punkte fehlt, ist der Platz nicht fertig bewertet.

#### 5. Wo wird das NFC Modul montiert?

`SAM-06` · Einfachauswahl · NFC Modul

- Außen an der Karosserie, IP-geschützt
- **Innen an einer geeigneten Scheibe, von außen gut erreichbar** ✓
- Neben der WiPro-Zentrale im Schrank
- Im Fahrerhaus unter dem Armaturenbrett

**Auflösung:** Innen an der Scheibe - geschützt vor Wetter und Zugriff, aber von außen bedienbar. Aus der Praxis: Das Modul lässt sich gut **hinter der Umweltplakette** verstecken. Von außen fällt dort nichts auf, und der Kunde trifft die Lesestelle trotzdem punktgenau.

**Falsch gewählt?**

- *Außen an der Karosserie:* Naheliegend, weil es von außen bedient wird. Es wäre aber auch von außen demontierbar - und damit ein Angriffspunkt an einer Sicherheitsanlage.
  <br>↳ bezogen auf: „Außen an der Karosserie, IP-geschützt“
- *Im Schrank neben der Zentrale:* Verwechselt Modul mit Steuergerät. Die Lesestelle muss dort sein, wo der Nutzer steht.
  <br>↳ bezogen auf: „Neben der WiPro-Zentrale im Schrank“

**Mitnehmen:** Einen Nebeneffekt sprichst du von dir aus an: Bei **beheizbaren Frontscheiben** ist mit höherem Verbrauch und kürzerer Batterielebensdauer zu rechnen. Und beim Einbau: Das NFC Modul darf nicht als erstes Zubehör angelernt werden.

#### 6. Das Fahrzeug hat einen Stoffhimmel. Wie montierst du den T.S.A. Funk-Rauchmelder?

`SAM-07` · Einfachauswahl · Rauchmelder

- Klebepad direkt auf den Stoff drücken, 60 s halten
- **Nicht auf Stoff kleben - Montageadapter verwenden** ✓
- Durch den Stoffhimmel schrauben
- In eine Fahrzeugecke setzen

**Auflösung:** Auf Stoff hält kein Klebepad dauerhaft. Montageadapter 105755 (weiß) / 105756 (grau) an einem seitlichen Kunststoffelement nahe der Decke.

**Falsch gewählt?**

- *Aufs Klebepad und fest andrücken:* Hält beim Verlassen der Werkstatt einwandfrei - deshalb ist es so verführerisch. Der Melder fällt später herunter, im schlechtesten Fall unbemerkt.
  <br>↳ bezogen auf: „Klebepad direkt auf den Stoff drücken, 60 s halten“
- *In eine Ecke setzen:* Ecken sind strömungstechnisch tote Zonen. Rauch kommt dort verzögert an.
  <br>↳ bezogen auf: „In eine Fahrzeugecke setzen“

**Mitnehmen:** Bei einem Melder, der Leben schützen soll, gilt keine Lösung, die „erstmal hält“.

#### 7. Ein Liner hat 7,4 m Innenlänge, der Schlafbereich ist durch eine Schiebetür getrennt. Was folgt für die CO-Überwachung?

`SAM-08` · Einfachauswahl · Fahrzeuggröße

- Ein Gerät reicht, solange es mittig sitzt
- **Zweiten Detektionspunkt vorsehen** ✓
- Zwei komplette Hauptgeräte sind zwingend
- Ein Gerät genügt, wenn die Schiebetür offen bleibt

**Auflösung:** Ab **6,5 m Innenlänge** oder bei mehreren Schlafbereichen braucht es einen zweiten Detektionspunkt - ein zweites G.A.S.-pro III CO oder einen zusätzlichen CO-Sensor.

**Falsch gewählt?**

- *Wenn die Tür offen bleibt:* Setzt auf das Verhalten des Kunden. Genau diese Tür wird nachts geschlossen - also dann, wenn CO am gefährlichsten ist und alle schlafen.
  <br>↳ bezogen auf: „Ein Gerät genügt, wenn die Schiebetür offen bleibt“
- *Zwei komplette Hauptgeräte zwingend:* Überdimensioniert und unnötig teuer. Ein Zusatzsensor am vorhandenen Gerät genügt oft.
  <br>↳ bezogen auf: „Zwei komplette Hauptgeräte sind zwingend“

**Mitnehmen:** Eine geschlossene Tür trennt den Luftraum. Bei einer Sicherheitsfunktion planst du für den geschlossenen Zustand, nie für den bequemen. Zusatzsensorkabel konservativ auf max. 7 m Gesamtlänge auslegen.

#### 8. Der Pro-finder braucht wegen eines abgeschirmten Einbauorts eine externe GPS-Antenne. Wie wird sie montiert?

`SAM-09` · Einfachauswahl · GPS-Antenne ausrichten

- **Waagerecht mit dem Aufkleber nach unten, freie Sicht nach oben durch ein nichtmetallisches Fahrzeugteil** ✓
- Waagerecht mit dem Aufkleber nach oben, damit die Beschriftung lesbar bleibt
- Direkt unter eine geschlossene Metallverkleidung
- Beliebig - GPS funktioniert unabhängig von der Ausrichtung

**Auflösung:** Die Empfangsseite zeigt waagerecht **nach oben** - der Aufkleber sitzt auf der Unterseite und kommt beim Kleben nach unten. Metall unmittelbar über oder um die Antenne schirmt Satellitensignale ab; ein nichtmetallischer Bereich darüber verbessert den Empfang.

**Bild zur Auflösung:** `/media/samsoe/sam-antenne-unterseite.webp` — So sieht die Seite aus, die nach unten kommt: Auf dem Aufkleber wird geklebt. Die glatte Gegenseite ist die Empfangsseite und schaut zum Himmel.

**Falsch gewählt?**

- *Aufkleber nach oben geklebt:* Sieht nach Ordnung aus und dreht die Antenne genau falsch herum. Meist steckt eine Verwechslung mit dem Pro-finder selbst dahinter: Dort muss „GPS inside“ nach **oben** zeigen. Bei der externen Antenne ist es umgekehrt.
  <br>↳ bezogen auf: „Waagerecht mit dem Aufkleber nach oben, damit die Beschriftung lesbar bleibt“
- *Ausrichtung unterschätzt:* Eine GPS-Antenne hat eine definierte Empfangsseite. Beliebige Montage verschenkt Empfangsreserve - und niemand merkt es beim Einbau.
  <br>↳ bezogen auf: „Beliebig - GPS funktioniert unabhängig von der Ausrichtung“
- *Unter Metall versteckt:* Ein unauffälliger Ort ist nur dann gut, wenn das Material darüber Satellitensignale nicht abschirmt.
  <br>↳ bezogen auf: „Direkt unter eine geschlossene Metallverkleidung“

**Mitnehmen:** Zwei Geräte, zwei entgegengesetzte Regeln: Beim Pro-finder zeigt der Aufkleber nach oben, bei der externen GPS-Antenne nach unten. Dahinter steht beide Male dasselbe Prinzip - die Empfangsseite schaut zum Himmel. Wer das Prinzip kennt, muss sich keine der beiden Regeln merken.

#### 9. Welche Komponenten haben keinen funktional vorgegebenen Installationsort im Fahrzeug? Wähle alle zutreffenden.

`SAM-10` · Mehrfachauswahl · Medium oder Gerät

- `/media/samsoe/sam-produkt-nfc-modul.webp` — Schwarzes THITRONIK NFC Modul
- **`/media/samsoe/sam-produkt-keycard.webp` — THITRONIK KeyCard** ✓
- **`/media/samsoe/sam-produkt-keytag.webp` — Blauer THITRONIK KeyTag** ✓
- **`/media/samsoe/sam-produkt-keystrap.webp` — Schwarzer THITRONIK KeyStrap** ✓
- **`/media/samsoe/sam-produkt-funk-handsender.webp` — Funk-Handsender von THITRONIK** ✓
- `/media/samsoe/sam-produkt-gas-pro-iii.webp` — Schwarzer THITRONIK G.A.S.-pro III Gaswarner
- `/media/samsoe/sam-produkt-pro-finder.webp` — THITRONIK Pro-finder mit Anschlüssen und Antenne
- `/media/samsoe/sam-produkt-tsa-funk-rauchmelder.webp` — Zwei weiße T.S.A. Funk-Rauchmelder von THITRONIK

**Auflösung:** Funk-Handsender, KeyCard, KeyTag und KeyStrap sind persönliche Zugangs**medien**. NFC Modul, Pro-finder, G.A.S.-pro III und T.S.A. Funk-Rauchmelder sind Geräte mit funktional vorgegebenem Installationsort.

**Falsch gewählt?**

- *NFC Modul mitangekreuzt:* Die verständlichste Verwechslung - KeyCard und NFC Modul gehören zusammen und werden gemeinsam verkauft. Aber das Modul ist die **Lesestelle am Fahrzeug**, die Karte ist das Medium in der Hosentasche.
  <br>↳ bezogen auf: „NFC Modul“
- *T.S.A. Funk-Rauchmelder mitangekreuzt:* Der Rauchmelder ist kein persönliches Medium. Sein Einbauort ist funktional vorgegeben: an oder nahe der Decke, damit aufsteigender Rauch früh erkannt wird.
  <br>↳ bezogen auf: „T.S.A. Funk-Rauchmelder“

**Mitnehmen:** Diese Trennung - Medium, Lesestelle, Steuergerät - ist die Grundordnung des ganzen Sortiments. Auf USEDOM begegnet sie dir am Display wieder.

#### 10. Der einzige freie Platz für den Gaswarner liegt 40 cm neben der Aufbaubatterie - Höhe und Fläche stimmen. Was machst du?

`SAM-11` · Einfachauswahl · Abstände am Einbauort

- **Anderen Ort suchen - zu Batterien und Nasszelle gehört mindestens 1 m Abstand** ✓
- Passt - entscheidend ist allein die Höhe über dem Boden
- Passt, solange eine AGM-Batterie verbaut ist
- Passt, wenn der Sensor von der Batterie weg ausgerichtet wird

**Auflösung:** Zum Einbauort gehören nicht nur Höhe und Fläche, sondern auch Abstände: mindestens **1 m** zu Batterien und Nasszelle, und nicht direkt gegenüber einem **Heizungsausströmer**. Eine Blei-Aufbaubatterie gast beim Laden aus - das erzeugt genau die Fehlalarme, die der Kunde nach drei Nächten abstellen lässt.

**Falsch gewählt?**

- *Nur auf die Höhe geschaut:* Die Höhe ist die bekannteste Regel und deshalb die einzige, an die man denkt. Sie ist notwendig, aber sie reicht nicht: Ein Ort ist erst bewertet, wenn auch die Nachbarschaft geprüft ist.
  <br>↳ bezogen auf: „Passt - entscheidend ist allein die Höhe über dem Boden“
- *AGM als Freibrief:* AGM gast weniger, nicht gar nicht. Der Sicherheitsabstand gilt für Batterien - ohne Unterscheidung nach Bauart.
  <br>↳ bezogen auf: „Passt, solange eine AGM-Batterie verbaut ist“
- *Sensor wegdrehen:* Behandelt den Gaswarner wie eine Kamera. Er misst die Luft, die ihn umgibt, nicht die Richtung, in die er zeigt.
  <br>↳ bezogen auf: „Passt, wenn der Sensor von der Batterie weg ausgerichtet wird“

**Mitnehmen:** Ein Fehlalarm um drei Uhr nachts kostet die Anlage das Vertrauen des Kunden - und danach schaltet er sie ab. Der halbe Meter, den du beim Einbau sparst, kommt genau so zurück.

---

## FEHMARN — Fehlersuche & Support

| | |
|---|---|
| Fragen | 10 |
| Fragensatz-Version | 8 |
| Art | Erst lesen, dann tauschen |
| Lernziel | Bevor du tauschst, lies. Jedes Gerät sagt, was los ist - über Blinkcode, Ton, Seriennummer, Spannungsverhalten. Tauschen ist die teuerste Form der Diagnose. |

**Quellen im Produktwissen:** `referenz/stoerungsbeseitigung.md`, `_intern/support-fallaufnahme.md`, `produkte/wipro-iii.md`, `produkte/pro-finder.md`, `referenz/mobilfunk-sim.md`

> **Redaktioneller Hinweis (erscheint nicht im Quiz):** Fragenkatalog v8. Zehn Fragen. Redaktionsrunde 08/2026: FEH-03 (gelbe Status-LED ab 0699-045) entfernt, FEH-01 im Prompt gekuerzt. FEH-05 folgt der internen Praxis - der Test mit unangezuendetem Feuerzeuggas ist zulaessig. FEH-04 nennt ca. 12,0 V als Rueckkehrschwelle, FEH-09 prueft die Smartphone-Kennzeichnung. Diese drei Fragen widersprechen bewusst dem Produktwissen: produkte/gas-pro-iii.md, referenz/gas.md und referenz/stoerungsbeseitigung.md verbieten den Feuerzeuggas-Test weiterhin, produkte/pro-finder.md nennt zweimal 12,5 V. Am 31.08.2026 so entschieden - das Wiki bleibt unveraendert, der Fragensatz gilt. Wer eine dieser Fragen gegen das Wiki prueft, findet dort also den alten Stand und muss nicht neu diskutieren. Blinkcodes und Spannungsschwellen vor jeder Schulung gegen den aktuellen Anleitungsstand pruefen.

#### 1. Eine frisch angeschlossene G.A.S.-pro III: Ordne die LED-Signale ihrer Bedeutung zu.

`FEH-06` · Zuordnung · Zustand richtig lesen

| Zuzuordnen | Richtig |
|---|---|
| Blaues Pulsieren, ca. 4 Minuten | Vorheizphase - noch nicht betriebsbereit |
| Grünes helles Pulsieren | Betriebsbereit |
| Gelbes Blinken einer Sensor-LED | Sensorfehler |
| Gelbes Pulsieren beider LEDs | Unterspannung |

**Auflösung:** Die vollständige Sequenz lautet rot → grün → blaues Dauerlicht → ca. 4 Minuten blaues Pulsieren → grünes helles Pulsieren. Erst Grün bestätigt die Betriebsbereitschaft.

**Falsch gewählt?**

- *Blaues Pulsieren als Fehler gelesen:* Führt zum Ausbau eines einwandfreien Geräts. Vier Minuten sind lang, wenn man daneben steht und es nicht weiß.
- *Gelb generell als Unterspannung:* Fast richtig - aber die Unterscheidung liegt darin, **wie viele** LEDs reagieren. Eine LED: Sensorfehler. Beide: Unterspannung.

**Mitnehmen:** Wer die Werkstatt vor dem grünen Zustand verlässt, weiß nicht, ob das Gerät überhaupt bereit geworden ist - **Prinzip 3**. Und: Bei Übertemperatur über 60 °C blinkt das Gerät in allen Farben und meldet das **nicht** über die WiPro III.

#### 2. Die Status-LED blinkt wiederholt 9× mit 5 s Pause. Was war los?

`FEH-01` · Einfachauswahl · Alarmspeicher lesen

- Panikalarm über den Handsender
- **Anti-Jamming-Ereignis - mögliche Funkstörung** ✓
- Auslösung über die Funk-Kabelschleife
- Meldung vom Innenbeleuchtungseingang

**Auflösung:** Der Blinkcode ist die einzige Quelle dafür, was tatsächlich ausgelöst hat.

**Falsch gewählt?**

- *Innenbeleuchtungseingang:* Guter Tipp, falsche Zahl - das ist **11×**. Die beiden liegen im Blinkcode dicht beieinander und werden beim Zählen im Halbdunkel schnell verwechselt. Zweimal zählen lohnt sich.
  <br>↳ bezogen auf: „Meldung vom Innenbeleuchtungseingang“

**Mitnehmen:** Anti-Jamming lässt sich über DIP 7 → ON abschalten. Das macht das Symptom weg, nicht die Ursache - und nimmt der Anlage eine Schutzfunktion. Erst Ort und Zeitpunkt dokumentieren, Störquellen suchen.

#### 3. Ein Pro-finder sendet eine Spannungswarnung und reagiert danach auf keine SMS mehr. Was ist passiert?

`FEH-04` · Einfachauswahl · Spannung

- Das Modem ist defekt, Gerät einsenden
- **Tiefentladeschutz - das Gerät geht in Standby** ✓
- Die SIM-Karte ist abgelaufen
- Die Sicherung hat ausgelöst und muss neu gesetzt werden

**Auflösung:** Warnung bei ca. **11,2 V**, danach Standby zum Schutz der Batterie. Ab einer Versorgung über ca. **12,0 V** kehrt das Gerät in den Normalbetrieb zurück.

**Falsch gewählt?**

- *Modem defekt, einsenden:* Der teuerste mögliche Weg zum selben Ergebnis - das Gerät kommt geprüft und unverändert zurück. Der entscheidende Hinweis stand im ersten Halbsatz der Frage: Es hat **vorher gewarnt**. Ein defektes Modem warnt nicht, es schweigt einfach.
  <br>↳ bezogen auf: „Das Modem ist defekt, Gerät einsenden“

**Mitnehmen:** Wenn ein Gerät vor dem Ausfall gewarnt hat, hat es meist genau das getan, wofür es gebaut wurde. Erst laden, dann urteilen.

#### 4. Nach einem Sicherungswechsel meldet die WiPro einen offenen Magnetkontakt, obwohl alle Klappen zu sind. Was tust du?

`FEH-07` · Einfachauswahl · Nach Spannungsunterbrechung

- **Alle betroffenen Kontakte mehrmals öffnen und schließen** ✓
- Alle Kontakte löschen und neu anlernen
- Die Zentrale auf Werkseinstellung zurücksetzen
- Die Batterien aller Kontakte tauschen

**Auflösung:** Nach einer Trennung von der Betriebsspannung kennt die Zentrale den Zustand erst wieder, wenn jeder Kontakt einmal gesendet hat.

**Falsch gewählt?**

- *Löschen und neu anlernen:* Führt zum selben Ergebnis - mit erheblich mehr Aufwand und dem zusätzlichen Risiko, dabei einen Kontakt zu vergessen. Genau dieser vergessene Kontakt fällt erst im Ernstfall auf.
  <br>↳ bezogen auf: „Alle Kontakte löschen und neu anlernen“
- *Werkseinstellung:* Löscht auch alles andere, inklusive Handsender und Konfiguration. Ein sehr großer Hammer für ein sehr kleines Problem.
  <br>↳ bezogen auf: „Die Zentrale auf Werkseinstellung zurücksetzen“

**Mitnehmen:** Nach jeder Spannungsunterbrechung: einmal alles auf und zu. Zwei Minuten Arbeit statt einer halben Stunde.

#### 5. Ein Kollege will die G.A.S.-pro III „mal eben mit dem Feuerzeug testen“. Was sagst du?

`FEH-05` · Einfachauswahl · Funktionstest

- **Geht - unangezündetes Feuerzeuggas auf den Sensor geben und die Reaktion abwarten** ✓
- Nicht durchführen - ein Funktionstest am eingebauten Gerät ist nicht vorgesehen
- Nur mit gezündeter Flamme direkt vor dem Sensor
- Nur an der CO-Ausführung - die spricht auf Feuerzeuggas an

**Auflösung:** Aus dem Feuerzeug kommt Butan - genau eines der Gase, auf die der integrierte Sensor der G.A.S.-pro III ausgelegt ist. Der Test mit **unangezündetem** Gas ist deshalb zulässig und zeigt dem Kunden die Funktion. Danach lüften und abwarten, bis das Gerät in den grünen Normalzustand zurückkehrt.

**Falsch gewählt?**

- *Mit gezündeter Flamme:* Eine offene Flamme und eine Gasprüfung im Fahrzeug sind die beiden Dinge, die nie zusammenkommen dürfen. Getestet wird mit ausströmendem Gas, nicht mit Feuer.
  <br>↳ bezogen auf: „Nur mit gezündeter Flamme direkt vor dem Sensor“
- *Nur an der CO-Ausführung:* Vertauscht die Sensoren. Der CO-Sensor misst Kohlenmonoxid und spricht auf Feuerzeuggas gerade nicht an - dort sagt der Test nichts aus.
  <br>↳ bezogen auf: „Nur an der CO-Ausführung - die spricht auf Feuerzeuggas an“
- *Lieber gar nicht testen:* Die Vorsicht ist ehrenwert, geht hier aber zu weit. Ein Kunde, dem die Anlage einmal vorgeführt wurde, vertraut ihr anders als einer, dem sie nur beschrieben wurde.
  <br>↳ bezogen auf: „Nicht durchführen - ein Funktionstest am eingebauten Gerät ist nicht vorgesehen“

**Mitnehmen:** Meldet der Selbsttest einen Fehler, zeigt sich das eindeutig: 1 Ton pro Sekunde und die betroffene Sensor-LED blinkt gelb. Nach dem Gastest ist der grüne Normalzustand der eigentliche Nachweis - er zeigt, dass das Gerät wieder frei misst.

#### 6. „Meine Frau bekommt die Alarm-SMS, ich nie.“ Woran liegt es?

`FEH-09` · Einfachauswahl · Alarmweiterleitung

- Sein Mobilfunkanbieter blockiert automatisiert versendete SMS
- Nur die Masternummer bekommt Alarm-SMS
- **Die zweite Nummer muss als Smartphone gekennzeichnet sein** ✓
- Es ist immer nur eine Zielrufnummer möglich

**Auflösung:** Die Nummer ist ohne die Smartphone-Kennzeichnung **S** programmiert. Erst mit ihr wird eine Zielrufnummer als Smartphone geführt. Beispiel Vertragskarte: **DE+S491701234567** mit Kennzeichnung, **DE+491701234567** ohne.

**Falsch gewählt?**

- *Nur die Masternummer:* Passt scheinbar perfekt zur Beobachtung - und führt dazu, dass man dem Kunden eine Einschränkung erklärt, die es nicht gibt. Bis zu zehn Zielrufnummern sind möglich.
  <br>↳ bezogen auf: „Nur die Masternummer bekommt Alarm-SMS“
- *Der Anbieter blockiert:* Die bequemste Erklärung, weil sie den Fehler aus der eigenen Reichweite schiebt. Bevor der Provider verdächtigt wird, gehört die Programmier-SMS Zeichen für Zeichen geprüft.
  <br>↳ bezogen auf: „Sein Mobilfunkanbieter blockiert automatisiert versendete SMS“

**Mitnehmen:** Ein zweiter Effekt sieht dem hier zum Verwechseln ähnlich: Alarm-SMS gehen **nacheinander** raus. Wer einen Testalarm sofort beendet, lässt die späteren Nummern gar nicht erst an die Reihe kommen. Deshalb bei der Übergabe jede vereinbarte Zielrufnummer einzeln und vollständig durchtesten - Masternummer zuerst.

#### 7. Eine G.A.S.-pro III blinkt plötzlich in allen Farben. Was ist die passende erste Reaktion?

`FEH-08` · Einfachauswahl · G.A.S.-pro III diagnostizieren

**Bild zur Frage:** `/media/fehmarn/feh-fehlersuche.webp` — Systematische Fehlersuche an Fahrzeugkomponenten

- **Übertemperatur über etwa 60 °C vermuten, Wärmequelle und Einbauort prüfen, abkühlen lassen und Wiederholung dokumentieren** ✓
- Sofort beide Sensoren ersetzen
- Eine SMS an den Pro-finder senden, damit er die Temperatur zurücksetzt
- Den Zustand als normale Vorheizphase ignorieren

**Auflösung:** Blinken in allen Farben weist auf Übertemperatur oberhalb von etwa 60 °C hin. Zuerst werden Wärmeeintrag, Einbauort und Belüftung geprüft; nach dem Abkühlen folgt ein kontrollierter Funktionstest. Wiederholt sich der Zustand ohne erkennbare Wärmequelle, wird der Fall mit Gerätedaten eskaliert.

**Falsch gewählt?**

- *Bauteiltausch vor Ursachenprüfung:* Ein klarer Temperaturcode ist zunächst kein Beweis für einen defekten Sensor. Ein ungeeigneter heißer Einbauort würde auch das Ersatzgerät wieder treffen.
  <br>↳ bezogen auf: „Sofort beide Sensoren ersetzen“
- *Zustand falsch eingeordnet:* Die Vorheizphase pulsiert blau. Ein Farbwechsel aller LEDs ist ein eigener Diagnosehinweis und wird nicht per Fernbefehl zurückgesetzt.
  <br>↳ bezogen auf: „Eine SMS an den Pro-finder senden, damit er die Temperatur zurücksetzt“ · „Den Zustand als normale Vorheizphase ignorieren“

**Mitnehmen:** Blinkmuster erst sauber benennen, dann Ursache prüfen. Bei Temperaturhinweisen gehört der Einbauort in die Diagnose, nicht nur das Gerät.

#### 8. Welche Angaben solltest du für eine belastbare Fehleranalyse zusammentragen? Wähle alle zutreffenden.

`FEH-10` · Mehrfachauswahl · Strukturierte Fehleranalyse

- **Vollständige Seriennummern aller beteiligten Komponenten** ✓
- **Fahrzeug, Modelljahr, Aufbauart** ✓
- **Erwartetes und tatsächliches Verhalten sowie die Bedienreihenfolge** ✓
- **LED- und Blinkcode, Signalton, SMS-Wortlaut möglichst wörtlich** ✓
- SIM-PIN und Kundenpasswörter
- Kilometerstand des Fahrzeugs

**Auflösung:** Diese vier Angaben verbinden Gerätestand, Fahrzeugkontext, reproduzierbaren Ablauf und die Eigendiagnose des Systems. Damit lässt sich der Fehler gezielt eingrenzen oder vollständig an den Support übergeben.

**Falsch gewählt?**

- *SIM-PIN mitangekreuzt:* Gut gemeint - man will alles liefern, was helfen könnte. Für die Diagnose wird sie nicht gebraucht, und was nicht im Ticket steht, kann auch nicht abhandenkommen.
  <br>↳ bezogen auf: „SIM-PIN und Kundenpasswörter“
- *Blinkcode weggelassen:* Der wertvollste Einzelhinweis überhaupt. Er sagt, was das Gerät selbst über den Fehler weiß - genau die Information, die aus der Ferne sonst fehlt.
  <br>↳ bezogen auf: „LED- und Blinkcode, Signalton, SMS-Wortlaut möglichst wörtlich“

**Mitnehmen:** Das ist die Insel in einem Satz: Alles, was du vor dem Anruf sammelst, ersetzt drei Rückfragen danach. Und „möglichst wörtlich“ heißt wörtlich - nicht „irgendwas mit gelb“.

#### 9. Die Pro-finder-SIM kann im Smartphone telefonieren und SMS senden, im Fahrzeug kommt trotzdem keine Kommunikation zustande. Welcher nächste Schritt trennt die Ursachen am besten?

`FEH-11` · Einfachauswahl · SIM-Fehler eingrenzen

- **Seriennummer, LED-Zustand, Versorgung und Standort dokumentieren und mit einer bekannten Referenz-SIM im Pro-finder gegenprüfen** ✓
- Die WiPro III sofort ersetzen
- Die gleiche SIM noch einmal im Smartphone testen und den Fall schließen
- Beliebige SMS-Befehle senden, bis einer beantwortet wird

**Auflösung:** Der Smartphone-Test beweist nur, dass die SIM grundsätzlich Dienste nutzen kann. Eine bekannte Referenz-SIM im Pro-finder trennt SIM/Tarif/Netz von Gerät, Versorgung, Gerätestand und Einbauort; vollständige Gerätedaten machen das Ergebnis supportfähig.

**Falsch gewählt?**

- *Zentrale ohne Trennung getauscht:* Ohne Kreuztest ist nicht klar, ob SIM, Tarif, Empfang, Pro-finder, Versorgung oder Konfiguration die Kommunikation verhindert.
  <br>↳ bezogen auf: „Die WiPro III sofort ersetzen“
- *Kein neuer Diagnosewert gewonnen:* Ein weiterer Smartphone-Test oder zufällige Befehle verändern die offene Frage nicht. Der Referenztausch setzt eine kontrollierte Vergleichsbedingung.
  <br>↳ bezogen auf: „Die gleiche SIM noch einmal im Smartphone testen und den Fall schließen“ · „Beliebige SMS-Befehle senden, bis einer beantwortet wird“

**Mitnehmen:** Ein guter nächster Schritt verändert genau eine Variable. Referenz-SIM, dokumentierter Gerätezustand und gleicher Standort machen aus Vermutung eine Diagnose.

#### 10. Du hörst den Alarmton aus einem Kundenmitschnitt. Beim Unscharfschalten danach hörte der Kunde zusätzlich 1 langen und 2 kurze Töne. Was prüfst du als Nächstes?

`FEH-A01` · Einfachauswahl · Alarmton und Alarmspeicher

**Ton zur Frage:** `/media/fehmarn/feh-wipro-hauptalarm.mp3` — Anhaltender, lauter Sirenenalarm der WiPro III.

- **Status-LED-Blinkfolge sauber zählen, den gespeicherten Alarmgrund dokumentieren und anschließend dessen Ursache prüfen** ✓
- Die Sirene ersetzen, weil der Ton einen Defekt des Alarmgebers belegt
- Die WiPro III auf Werkseinstellung zurücksetzen, damit der Alarmton gelöscht wird
- Den Fall schließen, weil der akustische Alarm beim Unscharfschalten beendet wurde

**Auflösung:** Die Aufnahme ist der Einbruch-/Hauptalarm der WiPro III. 1 langer und 2 kurze Töne beim Unscharfschalten zeigen einen belegten Alarmspeicher an. Die Status-LED nennt über ihren Blinkcode den Alarmgrund; das Muster wiederholt sich mit 5 Sekunden Pause.

**Falsch gewählt?**

- *Alarmton als Sirenendefekt gelesen:* Die Sirene hat hörbar gearbeitet. Der Ton belegt einen Alarm, nicht einen Defekt des Alarmgebers.
  <br>↳ bezogen auf: „Die Sirene ersetzen, weil der Ton einen Defekt des Alarmgebers belegt“
- *Diagnoseinformation gelöscht:* Ein Zurücksetzen vor dem Auslesen beseitigt wertvolle Hinweise und verändert mehr als die zu prüfende Ursache.
  <br>↳ bezogen auf: „Die WiPro III auf Werkseinstellung zurücksetzen, damit der Alarmton gelöscht wird“
- *Alarm aus mit Problem gelöst verwechselt:* Das Unscharfschalten beendet den Ton, erklärt aber nicht, welcher Eingang oder Sensor den Alarm ausgelöst hat.
  <br>↳ bezogen auf: „Den Fall schließen, weil der akustische Alarm beim Unscharfschalten beendet wurde“

**Mitnehmen:** Erst hören, dann den Alarmspeicher lesen: Der Ton ordnet das Ereignis ein, der Blinkcode führt zur Ursache.

---

## USEDOM — Verkaufsdisplay & Konfigurator

| | |
|---|---|
| Fragen | 10 |
| Fragensatz-Version | 6 |
| Art | Vom Einzelprodukt zum System |
| Lernziel | Wer die vier Ebenen trennt - Zentrale, Fernsteuerung, Lesestelle, Medium -, beantwortet fast jede Kundenfrage von selbst. |

**Quellen im Produktwissen:** `referenz/systemueberblick.md`, `produkte/bt-connect.md`, `produkte/nfc-modul.md`, `referenz/zugang-bedienung.md`

> **Redaktioneller Hinweis (erscheint nicht im Quiz):** Fragenkatalog v6. Zehn Fragen. Redaktionsrunde 08/2026: USE-01 hat zwei weitere falsche Optionen bekommen - Funk-Wassermelder 868 (deckt keinen der drei Wuensche ab) und Fingerprint (deckt einen Wunsch doppelt ab und setzt safe.lock voraus). Damit steht die Frage bei acht Bildoptionen, dem Maximum des Produktlayouts. Die beiden Bilder sind Kopien aus media/vejro; wird dort ein Motiv ausgetauscht, muss media/usedom mitgezogen werden, weil Einzelpakete nur den eigenen Insel-Ordner mitnehmen. USE-01 nutzt ausschliesslich echte Produktbilder. Artikelnummern und Leistungswerte vor jeder Schulung gegen den aktuellen Produktstand pruefen.

#### 1. Ein Kunde zeigt auf BT-connect, Pro-finder und NFC Modul: „Das ist doch dreimal dasselbe - das Fahrzeug ohne Schlüssel bedienen.“ Welche Erklärung trennt die Produkte sauber?

`USE-04` · Einfachauswahl · Gespräch am Display

- **BT-connect bedient die WiPro per Smartphone im Nahbereich; Pro-finder ermöglicht Mobilfunk-Fernzugriff und Ortung; das NFC Modul liest KeyCard, KeyTag oder KeyStrap direkt am Fahrzeug** ✓
- Alle drei sind eigenständige Alarmanlagen; sie unterscheiden sich nur in der Reichweite
- BT-connect und NFC Modul orten das Fahrzeug, Pro-finder öffnet ausschließlich die Aufbautür
- Es genügt immer eines der drei Produkte, eine WiPro III wird dafür nicht benötigt

**Auflösung:** Die Produkte bedienen unterschiedliche Situationen: Smartphone nah am Fahrzeug, Mobilfunk aus der Ferne oder ein physisches NFC-Medium direkt am Fahrzeug. BT-connect und NFC Modul setzen eine kompatible Alarmzentrale voraus.

**Falsch gewählt?**

- *Bedienwege mit eigenständigen Systemen verwechselt:* BT-connect und NFC Modul sind Bedienwege für eine kompatible WiPro. Sie ersetzen die Alarmzentrale nicht.
  <br>↳ bezogen auf: „Alle drei sind eigenständige Alarmanlagen; sie unterscheiden sich nur in der Reichweite“ · „Es genügt immer eines der drei Produkte, eine WiPro III wird dafür nicht benötigt“
- *Ortung falsch zugeordnet:* Die Ortung gehört zum Pro-finder. Bluetooth und NFC lösen lokale Bedienvorgänge aus, bestimmen aber keine Fahrzeugposition.
  <br>↳ bezogen auf: „BT-connect und NFC Modul orten das Fahrzeug, Pro-finder öffnet ausschließlich die Aufbautür“

**Mitnehmen:** Am Display nicht mit Gerätenamen beginnen, sondern mit drei Fragen: nah oder fern, Smartphone oder Medium, bedienen oder orten?

#### 2. Kunde: „Ich will eine Alarmanlage, Ortung bei Diebstahl und bequem ohne Schlüssel öffnen.“ Welche Komponenten brauchst du? Wähle alle zutreffenden.

`USE-01` · Mehrfachauswahl · Bedarfsanalyse

- **`/media/usedom/use-produkt-wipro-iii.webp` — WiPro III Alarmzentrale mit Zubehör** ✓
- **`/media/usedom/use-produkt-pro-finder.webp` — Pro-finder Ortungs- und Kommunikationsmodul** ✓
- **`/media/usedom/use-produkt-nfc-modul.webp` — Schwarzes NFC Modul als Lesestelle** ✓
- **`/media/usedom/use-produkt-keycard.webp` — THITRONIK KeyCard als Zugangsmedium** ✓
- `/media/usedom/use-produkt-gas-pro-iii.webp` — G.A.S.-pro III Gaswarner
- `/media/usedom/use-produkt-tsa-funk-rauchmelder.webp` — T.S.A. Funk-Rauchmelder
- `/media/usedom/use-produkt-wassermelder.webp` — Funk-Wassermelder 868 mit Sendeeinheit und Sensor am Kabel
- `/media/usedom/use-produkt-fingerprint.webp` — Runder Fingerprint-Sensor mit grün leuchtendem Ring

**Auflösung:** Drei Kundenwünsche, drei Bausteine - plus das Zugangsmedium. Alles Weitere ist Zusatzverkauf und gehört getrennt besprochen, nicht in diese Position.

**Falsch gewählt?**

- *Zugangsmedium vergessen:* Der häufigste Fehler im Angebot. Das NFC Modul ist nur die Lesestelle - ohne KeyCard, KeyTag oder KeyStrap öffnet niemand etwas. Der Kunde merkt es am Tag der Übergabe.
  <br>↳ bezogen auf: „KeyCard, KeyTag oder KeyStrap“
- *Gutes Produkt, falscher Wunsch:* Gaswarner, Rauchmelder und Wassermelder sind sinnvolle Produkte - nur deckt keines davon einen der drei genannten Wünsche ab. Zusatzverkauf ja, aber als eigenes Thema und nicht in dieser Position.
  <br>↳ bezogen auf: „G.A.S.-pro III“ · „T.S.A. Funk-Rauchmelder“ · „Funk-Wassermelder 868“
- *Fingerprint zusätzlich mitangekreuzt:* Der teure Fehler, weil er richtig klingt: Der Fingerprint löst denselben Wunsch wie NFC Modul und KeyCard - nur ein zweites Mal, und er setzt zusätzlich WiPro III safe.lock voraus. Ein Wunsch, ein Weg.
  <br>↳ bezogen auf: „CampLock oder VanLock Fingerprint“

**Mitnehmen:** Geh die Kundenwünsche einzeln durch und hak sie am Angebot ab. Drei Wünsche, drei Häkchen - plus die Frage: „Womit macht er es auf?“ Jede Position ohne Haken gehört begründet oder gestrichen.

#### 3. Kunde: „Ich nehme nur das BT-connect, eine Alarmanlage brauche ich nicht.“ Geht das?

`USE-02` · Einfachauswahl · Abhängigkeit

- Geht - BT-connect arbeitet eigenständig
- **Geht nicht - BT-connect setzt eine WiPro III voraus** ✓
- Geht nur zusammen mit dem Pro-finder
- Geht nur zusammen mit dem NFC Modul

**Auflösung:** BT-connect (106000) ist ein Bedienweg, kein eigenes System. Ohne WiPro III bzw. WiPro III safe.lock gibt es nichts zu bedienen.

**Falsch gewählt?**

- *Geht eigenständig:* Der Kunde hört „Bluetooth-Modul fürs Wohnmobil“ und denkt an ein eigenständiges Produkt wie einen Tracker. Der Name legt das nahe - genau deshalb muss die Abhängigkeit aktiv erklärt werden.
  <br>↳ bezogen auf: „Geht - BT-connect arbeitet eigenständig“

**Mitnehmen:** Frag dich bei jedem Zubehör: Ist das ein **Bedienweg** oder ein **System**? Bedienwege brauchen immer etwas, das sie bedienen. Bis zu 9 Geräte lassen sich koppeln, Smartwatch inklusive.

#### 4. Kunde: „Mit BT-connect kann ich also aus dem Restaurant am Hafen mein Wohnmobil scharfschalten?“

`USE-03` · Einfachauswahl · Bluetooth-Reichweite

- Ja, bis 50 m zuverlässig
- **Nein - BT-connect wirkt nur im Bluetooth-Nahbereich** ✓
- Ja, wenn das Handy im WLAN eingebucht ist
- Ja, sobald safe.lock verbaut ist

**Auflösung:** BT-connect ist ein lokaler Bluetooth-Weg ohne Mobilfunk und GPS. Für die Bedienung aus der Ferne ist der Pro-finder zuständig.

**Falsch gewählt?**

- *Wenn das Handy im WLAN ist:* Klingt modern und plausibel - das Modul hat aber keine Internetverbindung. Das WLAN des Kunden hilft seinem Telefon, nicht dem Fahrzeug.
  <br>↳ bezogen auf: „Ja, wenn das Handy im WLAN eingebucht ist“
- *Ja, bis 50 m:* Die ehrlichste der falschen Antworten, weil sie eine Grenze nennt. Nur ist der Hafen weiter weg als 50 m - und genau darum ging es dem Kunden.
  <br>↳ bezogen auf: „Ja, bis 50 m zuverlässig“

**Mitnehmen:** Diese Erwartung entsteht im Verkaufsgespräch schnell und fällt dem Kunden erst im Urlaub auf. Besser jetzt klarstellen - und den Pro-finder gleich mit anbieten. Aus einem enttäuschten Kunden wird so ein größerer Auftrag.

#### 5. Ein Kunde hat keine WiPro und will nur Gaswarnung. Was zeigst du?

`USE-06` · Einfachauswahl · Gaswarnung ohne Alarmanlage

- G.A.S.-connect - die günstigste Lösung
- **G.A.S.-pro III, G.A.S. oder G.A.S.-plug** ✓
- Ohne WiPro ist keine Gaswarnung möglich
- Nur den externen Zusatzsensor

**Auflösung:** Alle drei arbeiten eigenständig: G.A.S.-pro III mit eigener 94-dB-Sirene, G.A.S. (105700) als Standalone-Gerät, G.A.S.-plug (100042) mobil über den Zigarettenanzünder.

**Falsch gewählt?**

- *G.A.S.-connect:* Der gefährlichste Fehlgriff dieser Insel, weil er über den Preis kommt. G.A.S.-connect (105750) hat **keine eigene Sirene** und ist Funkzubehör für die WiPro III. Als Standalone-Lösung verkauft, warnt es niemanden - der Kunde merkt es nur nie, weil hoffentlich nie etwas passiert.
  <br>↳ bezogen auf: „G.A.S.-connect - die günstigste Lösung“

**Mitnehmen:** Bei Sicherheitsprodukten ist die erste Frage nie der Preis, sondern: **Wer wird gewarnt und wodurch?** Kein eigener Signalgeber heißt: Es braucht etwas anderes, das den Alarm ausgibt.

#### 6. Welche Angaben brauchst du vor dem Start im Konfigurator, damit aus dem Ergebnis ein belastbarer Angebotsentwurf wird?

`USE-08` · Einfachauswahl · Konfiguration vorbereiten

**Bild zur Frage:** `/media/usedom/use-konfigurator.webp` — THITRONIK-Konfigurator mit Fahrzeugauswahl

- **Basisfahrzeug und Modelljahr, Fahrzeugaufbau/Nutzung, gewünschte Absicherung und gewünschte Bedien- beziehungsweise Meldewege** ✓
- Nur das verfügbare Kundenbudget
- Nur Länge und Farbe des Fahrzeugs
- Keine Angaben - der Konfigurator erkennt das Fahrzeug automatisch

**Auflösung:** Der Konfigurator strukturiert eine Empfehlung, aber die Eingabe beginnt mit dem konkreten Fahrzeug und dem tatsächlichen Kundenbedarf. Diese Angaben entscheiden über Zentrale, Sensorik, Zugangs- und Meldewege.

**Falsch gewählt?**

- *Zu wenig Bedarf aufgenommen:* Budget oder Fahrzeugmaß allein erklärt weder Kompatibilität noch Schutzziel. Das Ergebnis wäre eine Produktliste ohne belastbare Zuordnung.
  <br>↳ bezogen auf: „Nur das verfügbare Kundenbudget“ · „Nur Länge und Farbe des Fahrzeugs“
- *Automatische Fahrzeugerkennung angenommen:* Der Konfigurator arbeitet mit den eingegebenen Angaben. Fehlende oder ungenaue Fahrzeugdaten werden nicht durch das Werkzeug geheilt.
  <br>↳ bezogen auf: „Keine Angaben - der Konfigurator erkennt das Fahrzeug automatisch“

**Mitnehmen:** Erst Bedarf und Fahrzeug klären, dann konfigurieren. Ein Werkzeug kann nur so belastbar sein wie seine Eingaben.

#### 7. Kunde: „Der Gaswarner erkennt dann auch Kohlenmonoxid von meiner Heizung?“

`USE-07` · Einfachauswahl · Gas und Kohlenmonoxid

- Ja, alle G.A.S.-Geräte erkennen CO
- **Nein - Gas- und CO-Erkennung sind getrennte Geräte** ✓
- Ja, sobald das Gerät an der WiPro angebunden ist
- CO wird vom Rauchmelder mit abgedeckt

**Auflösung:** G.A.S.-pro III (101286) und G.A.S.-pro III CO (101287) sind getrennte Geräte; beide Funktionen lassen sich nicht in einem Gerät vereinen. Ohne geeigneten externen CO-Sensor (100433) erkennt die Standardausführung kein CO.

**Falsch gewählt?**

- *Der Rauchmelder deckt es ab:* Der verbreitetste Irrtum überhaupt - auch unter Fachleuten. Rauchmelder erkennen Partikel, CO ist ein geruchloses Gas ohne Rauchentwicklung. Ein Kunde, der sich darauf verlässt, hat keinen Schutz.
  <br>↳ bezogen auf: „CO wird vom Rauchmelder mit abgedeckt“
- *Mit WiPro-Anbindung ja:* Verwechselt Funkanbindung mit Sensorik. Die Anbindung leitet weiter, was der Sensor erkennt - sie erkennt nichts selbst.
  <br>↳ bezogen auf: „Ja, sobald das Gerät an der WiPro angebunden ist“

**Mitnehmen:** Eine falsche Zusage ist hier sicherheitsrelevant: Der Kunde verlässt sich auf einen Schutz, den das Gerät nicht bietet. Fürs Servicegespräch: CO-Sensoren haben ein Verfallsdatum auf dem Typenschild und müssen vor dessen Ablauf durch THITRONIK ersetzt werden (kostenpflichtig).

#### 8. Warum arbeitet die WiPro III bewusst ohne Bewegungsmelder?

`USE-09` · Einfachauswahl · Verkaufsargument

- Bewegungsmelder sind für diese Preisklasse zu teuer
- **Sie erzeugen in Freizeitfahrzeugen zu viele Fehlalarme** ✓
- Sie sind in Fahrzeugen gesetzlich nicht zugelassen
- Dadurch ist die Anlage vollständig fehlalarmfrei

**Auflösung:** Gardinen, Erschütterungen, Insekten und Haustiere lösen Bewegungsmelder in Freizeitfahrzeugen zuverlässig aus.

**Falsch gewählt?**

- *Zu teuer:* Macht aus einer Konstruktionsentscheidung ein Sparargument - und aus einem Vorteil einen Mangel. Der Kunde hört: „Da wurde gespart.“
  <br>↳ bezogen auf: „Bewegungsmelder sind für diese Preisklasse zu teuer“
- *Vollständig fehlalarmfrei:* Verlockend im Verkaufsgespräch und deshalb gefährlich. Diese Zusage ist unzulässig; keine Alarmanlage ist fehlalarmfrei.
  <br>↳ bezogen auf: „Dadurch ist die Anlage vollständig fehlalarmfrei“

**Mitnehmen:** Der zweite Vorteil zieht im Gespräch oft stärker: Die Anlage kann scharf bleiben, **während Personen im Fahrzeug sind** - beim Schlafen auf dem Stellplatz. Das kann keine Anlage mit Bewegungsmelder.

#### 9. Was machst du mit dem Konfigurator-Ergebnis?

`USE-10` · Einfachauswahl · Konfigurator

- Ungeprüft als verbindliche Zusage an den Kunden geben
- **Auf Plausibilität prüfen, dann als PDF für Angebot oder Termin nutzen** ✓
- Nur intern verwenden, nie dem Kunden zeigen
- Zusammen mit den internen Einbauunterlagen aushändigen

**Auflösung:** Der Konfigurator ist ein Werkzeug, keine Freigabe.

**Falsch gewählt?**

- *Ungeprüft als Zusage:* Der Konfigurator kennt das konkrete Fahrzeug nicht. Hupe ohne Zündung, Sleep Mode, Freigabestatus des Modelljahrs - nichts davon steht dort drin. Genau diese Punkte sprengen später das Angebot.
  <br>↳ bezogen auf: „Ungeprüft als verbindliche Zusage an den Kunden geben“
- *Nie dem Kunden zeigen:* Verschenkt ein gutes Verkaufsinstrument. Das PDF macht ein Angebot nachvollziehbar.
  <br>↳ bezogen auf: „Nur intern verwenden, nie dem Kunden zeigen“

**Mitnehmen:** Dein Fahrzeugwissen entscheidet, ob das Ergebnis am konkreten Fahrzeug trägt. Interne Einbauunterlagen gehören nicht in Kundenhand - siehe POEL.

#### 10. Kunde: „Mit der KeyCard schließe ich mein Fahrzeug auf und zu, oder?“

`USE-05` · Einfachauswahl · KeyCard und Zentralverriegelung

- Ja, in beiden Richtungen
- **Scharf/Unscharf ja - Zentralverriegelung nur mit safe.lock** ✓
- Nein, die KeyCard kann ausschließlich entriegeln
- Nur in Verbindung mit BT-connect

**Auflösung:** Scharf-/Unscharfschalten und Ver-/Entriegeln sind technisch zwei verschiedene Vorgänge. Die Zentralverriegelung wird nur bei WiPro III safe.lock mit passender Fahrzeuganbindung und geeignetem Softwarestand mitgeführt.

**Falsch gewählt?**

- *Ja, in beiden Richtungen:* Der häufigste Beratungsfehler des gesamten Sortiments. Er entsteht nicht aus Unwissen, sondern aus dem Wunsch, dem Kunden zuzustimmen. Der Preis dafür fällt bei der Übergabe an.
  <br>↳ bezogen auf: „Ja, in beiden Richtungen“
- *Nur mit BT-connect:* Vermischt zwei unabhängige Bedienwege. Sie ergänzen einander, sie bedingen einander nicht.
  <br>↳ bezogen auf: „Nur in Verbindung mit BT-connect“

**Mitnehmen:** **Prinzip 1 - Scharf/Unscharf ≠ Auf/Zu.** Heute ist es dir schon auf VEJRØ begegnet und es kommt auf LANGELAND wieder. Satz für den Kunden: „Die Karte schaltet Ihre Anlage. Ob sie auch die Türen öffnet, hängt davon ab, ob wir safe.lock verbaut haben - schauen wir uns Ihr Fahrzeug an.“

---

## LANGELAND — Fahrzeugannahme & Fahrzeugübergabe

| | |
|---|---|
| Fragen | 10 |
| Fragensatz-Version | 6 |
| Art | Der Prozess vor und nach dem Schraubendreher |
| Lernziel | Ein Fahrzeug vollständig und freigabebewusst annehmen, den Einbau prüfbar dokumentieren und dem Kunden System, Grenzen und Bedienwege sicher übergeben. |

**Quellen im Produktwissen:** `referenz/fahrzeugkompatibilitaet.md`, `produkte/wipro-iii.md`, `referenz/zugang-bedienung.md`, `_intern/support-fallaufnahme.md`

> **Redaktioneller Hinweis (erscheint nicht im Quiz):** Fragenkatalog v6. Zehn Fragen. Redaktionsrunde 08/2026: LAN-06 (safe.lock im Campingmodus) entfernt, dafuer LAN-11 zu Ruhestrom und Standzeit. Mit LAN-06 ist der Campingmodus aus dem Fragensatz verschwunden - falls er in der Uebergabe eine Rolle spielen soll, gehoert er in eine neue Frage. LAN-09 macht die vollstaendige Pruefung aller zugesagten Meldewege zur Uebergabebedingung. Zeitwerte, Ruhestromrichtwerte und Fahrzeugfreigaben vor jeder Schulung gegen den aktuellen Stand pruefen.

#### 1. Ein Kunde bringt sein Fahrzeug zur Erweiterung eines bestehenden Systems. Was gehört zwingend in die Annahme?

`LAN-01` · Einfachauswahl · Annahme, Pflichtangaben

- Fahrzeugmodell, Kundenwunsch und gewünschter Termin
- **Fahrzeugdaten plus Seriennummer und Softwarestand jeder Komponente** ✓
- Artikelnummern der Neuteile und die geplante Einbaudauer
- Kilometerstand, Tankfüllung und Anzahl der Schlüssel

**Auflösung:** Ohne Seriennummer und Softwarestand ist keine belastbare Kompatibilitätsaussage möglich.

**Falsch gewählt?**

- *Modell, Wunsch, Termin:* Reicht für die Terminvergabe und fühlt sich vollständig an. Es fehlt genau die Information, die entscheidet, ob der Einbau überhaupt geht - und die du später nur noch am zerlegten Fahrzeug bekommst.
  <br>↳ bezogen auf: „Fahrzeugmodell, Kundenwunsch und gewünschter Termin“

**Mitnehmen:** Die Seriennummer sitzt nach dem Einbau hinter der Verkleidung. Bei der Annahme kostet sie zwei Minuten, im Supportfall einen halben Tag.

#### 2. Ein Mercedes Sprinter VS30 (Baujahr 2021) soll eine WiPro III bekommen. Welchen Punkt sprichst du schon bei der Annahme an?

`LAN-02` · Einfachauswahl · Risiko früh ansprechen

- Der Sprinter benötigt grundsätzlich safe.lock
- **Die Fahrzeughupe ist ohne Zündung nicht verfügbar** ✓
- Ein Testalarm ist bei diesem Fahrzeug nicht möglich
- Kein Thema - die Hupe funktioniert bei jedem Fahrzeug

**Auflösung:** Je nach Anleitung ist eine Back-up-Sirene (100089) oder Zusatzhupe (105339) nötig - und die gehört ins **Angebot**, nicht auf die Rechnung.

**Falsch gewählt?**

- *Kein Thema:* Betrifft weit mehr Fahrzeuge, als man denkt: alle Sprinter, VW T5 Facelift, T6 und T6.1, alle Crafter/MAN TGE sowie Iveco Daily ab MJ 2019. Wer das nicht auf dem Schirm hat, verkauft regelmäßig Anlagen, die im Ernstfall stumm bleiben.
  <br>↳ bezogen auf: „Kein Thema - die Hupe funktioniert bei jedem Fahrzeug“

**Mitnehmen:** Ein Zusatzteil, das erst auf der Rechnung auftaucht, ist ein Konflikt. Dasselbe Teil im Angebot ist eine Selbstverständlichkeit. Beim VS30 zusätzlich: ILS-LED-Scheinwerfer erfordern einen 220-Ω-Widerstand.

#### 3. Ein Kunde ruft an: „Ich habe einen Iveco Daily, Modelljahr 2026, wann kann ich kommen?“

`LAN-03` · Einfachauswahl · Freigabestatus Iveco

- Termin zusagen - der Daily ist ein Standardfahrzeug
- **Kein Termin ohne Prüfung - dieses Modelljahr ist nicht freigegeben** ✓
- Termin zusagen und vor Ort improvisieren
- Termin zusagen und den Universalanschluss verwenden

**Auflösung:** Für den Iveco Daily ab Modelljahr 2025/2026 ist wegen BCM-Änderungen derzeit kein Einbau freigegeben (Stand 01/2026).

**Falsch gewählt?**

- *Universalanschluss:* Die klügste der falschen Antworten - es gibt ihn ja wirklich. Er ist aber für ältere Fahrzeuge **ohne** CAN-Bus gedacht, nicht als Notlösung für ein nicht freigegebenes modernes Fahrzeug.
  <br>↳ bezogen auf: „Termin zusagen und den Universalanschluss verwenden“
- *Standardfahrzeug:* Stimmte jahrelang. Genau das macht Freigabe-Fallen gefährlich: Sie treffen die Erfahrenen.
  <br>↳ bezogen auf: „Termin zusagen - der Daily ist ein Standardfahrzeug“

**Mitnehmen:** Ein zugesagter und dann abgesagter Termin kostet mehr Vertrauen als ein ehrliches „das kläre ich und rufe zurück“. Bei neuen Modelljahren gilt Erfahrung nicht - dort gilt nur die aktuelle Freigabe.

#### 4. Fahrerhaustüren sind über den Innenbeleuchtungseingang angebunden, nicht über den CAN-Bus. Wann kannst du den Testalarm durchführen?

`LAN-04` · Einfachauswahl · Testverzögerung Innenlicht

- Sofort nach dem Scharfschalten
- **Frühestens 60 Sekunden nach Aktivierung** ✓
- Erst nach 5 Minuten
- Gar nicht - nur CAN-Türen sind testbar

**Auflösung:** Die Anlage braucht diese Zeit, bevor sie über diesen Eingang auslöst.

**Falsch gewählt?**

- *Sofort:* Der wahrscheinlichste Fehler, weil man am Ende des Einbaus zügig fertig werden will. Ergebnis: Eine korrekt arbeitende Anlage wird für defekt gehalten, und es beginnt eine Fehlersuche, die es nicht braucht.
  <br>↳ bezogen auf: „Sofort nach dem Scharfschalten“
- *Gar nicht testbar:* Wäre bequem, ist aber falsch - und würde bedeuten, das Fahrzeug ungeprüft zu übergeben.
  <br>↳ bezogen auf: „Gar nicht - nur CAN-Türen sind testbar“

**Mitnehmen:** Diese eine Minute ist einer der häufigsten Gründe für einen vermeintlichen Mangel bei der Abnahme. Warten ist hier Teil des Tests - **Prinzip 3**.

#### 5. Die App schaltet die Anlage korrekt, aber die Alarm-SMS des Pro-finders hat die zweite vereinbarte Zielrufnummer noch nicht erreicht. Der Kunde möchte losfahren. Was tust du?

`LAN-09` · Einfachauswahl · Übergabe erst nach Volltest

**Bild zur Frage:** `/media/langeland/lan-start-schluesseluebergabe.webp` — Dokumentierte Fahrzeugübergabe mit Schlüssel

- Übergeben - die funktionierende App beweist das Gesamtsystem
- **Übergabe noch nicht abschließen; Alarmweg und alle vereinbarten Zielrufnummern vollständig testen, Ursache klären und Ergebnis dokumentieren** ✓
- Die zweite Zielrufnummer aus dem Auftrag streichen
- Dem Kunden sagen, die SMS könne später von selbst kommen

**Auflösung:** Ein funktionierender Bedienweg beweist keinen anderen Meldeweg. Die Übergabe ist erst vollständig, wenn jede zugesagte Funktion einmal real ausgelöst, empfangen und nachvollziehbar dokumentiert wurde.

**Falsch gewählt?**

- *Bedienweg mit Meldeweg verwechselt:* Die App bestätigt die Steuerung der Anlage, nicht den SMS-Versand an jede gespeicherte Rufnummer.
  <br>↳ bezogen auf: „Übergeben - die funktionierende App beweist das Gesamtsystem“
- *Offene Funktion zur Kundensache gemacht:* Die vereinbarte Fernmeldung gehört zum Auftrag. Ein ungeklärter oder gestrichener Zielweg ist keine abgeschlossene Übergabe.
  <br>↳ bezogen auf: „Die zweite Zielrufnummer aus dem Auftrag streichen“ · „Dem Kunden sagen, die SMS könne später von selbst kommen“

**Mitnehmen:** Übergabe bedeutet: Kunde kann es bedienen, jede zugesagte Funktion wurde real geprüft und das Ergebnis liegt in der Akte.

#### 6. Der Kunde bedient alles nur über die App. Was empfiehlst du?

`LAN-08` · Einfachauswahl · Backup-Beratung

- Das reicht aus, die App ist zuverlässig
- **Einen zweiten, technisch unabhängigen Bedienweg ergänzen** ✓
- Ein zweites Smartphone koppeln
- Den Originalschlüssel im Fahrzeug deponieren

**Auflösung:** Jeder Bedienweg hat einen Ausfallmodus. Zwei Wege dürfen nicht denselben haben.

**Falsch gewählt?**

- *Zweites Smartphone:* Klingt nach einer echten Redundanz und ist keine. Beide Geräte teilen dieselbe Technik und dieselben Fehlerquellen - deaktiviertes Bluetooth oder eine verlorene Kopplung sperrt beide gleichzeitig.
  <br>↳ bezogen auf: „Ein zweites Smartphone koppeln“
- *Schlüssel im Fahrzeug:* Löst das Zugangsproblem und hebt dafür die gesamte Sicherung auf. Ein sicherer Zugang, der die Anlage sinnlos macht.
  <br>↳ bezogen auf: „Den Originalschlüssel im Fahrzeug deponieren“

**Mitnehmen:** **Prinzip 2 - ein Zugangsweg ist kein Zugangsweg**, und zwei gleichartige sind auch nur einer. Sauberste Lösung: ein zuvor geprüfter Funk-Handsender 868 (101064) - unabhängig vom Smartphone, bis ca. 75 m, CR2032, kein Neuanlernen nach Batteriewechsel.

#### 7. Ein Kunde holt sein Fahrzeug nach Einbau von WiPro III und Pro-finder ab. Was gehört in die Übergabe? Wähle alle zutreffenden.

`LAN-05` · Mehrfachauswahl · Übergabe, Pflichtprogramm

- **Scharf- und Unscharfschalten über jeden vorgesehenen Bedienweg vorführen** ✓
- **Einen echten Testalarm zeigen, den der Kunde selbst auslöst** ✓
- **Zielrufnummern des Pro-finders gemeinsam testen, Masternummer zuerst** ✓
- **Alarmspeicher und Batteriewarnung erklären** ✓
- Dem Kunden die SIM-PIN notieren
- Einen Ersatzschlüssel im Fahrzeug deponieren
- Alle DIP-Schaltereinstellungen mit dem Kunden durchgehen

**Auflösung:** Diese vier Punkte entscheiden, ob der Kunde die Anlage im Ernstfall bedienen kann. Dazu gehören Panikfunktion und deren Beenden sowie der Hinweis, dass sich die Batteriewarnung als ca. 2 s Ton aus der Zentrale plus rote Sende-LED für ca. 30 s zeigt.

**Falsch gewählt?**

- *DIP-Einstellungen durchgehen:* Gut gemeint und fachlich beeindruckend - aber Werkstattwissen. Es überfordert den Kunden und lädt ihn dazu ein, selbst daran zu drehen. Die DIP-Stellung gehört in **deine** Akte.
  <br>↳ bezogen auf: „Alle DIP-Schaltereinstellungen mit dem Kunden durchgehen“
- *Testalarm weggelassen:* Verständlich, weil laut und unangenehm. Aber ein Kunde, der den Alarm noch nie gehört hat, erkennt ihn im Ernstfall nicht als seinen.
  <br>↳ bezogen auf: „Einen echten Testalarm zeigen, den der Kunde selbst auslöst“

**Mitnehmen:** Der Kunde muss jeden Bedienweg **einmal selbst** ausgeführt haben. Zusehen reicht nicht - was man nicht selbst gemacht hat, kann man abends auf dem Stellplatz nicht.

#### 8. Welche Aussage darfst du bei der Übergabe nicht machen?

`LAN-07` · Einfachauswahl · Erwartungsmanagement

- „Die Anlage meldet Einbruchereignisse akustisch und optisch.“
- **„Damit kann Ihnen niemand mehr ins Fahrzeug einbrechen.“** ✓
- „Nicht abgesicherte Öffnungen bleiben ungeschützt - abgesichert sind X, Y und Z.“
- „Nach einem Alarm bleibt die Überwachung aktiv.“

**Auflösung:** Eine Alarmanlage meldet, sie verhindert nicht. Die Zusage ist inhaltlich falsch und im Schadensfall ein Problem.

**Falsch gewählt?**

- *„Nicht abgesicherte Öffnungen bleiben ungeschützt“:* Klingt nach einem schwachen Verkaufsargument und wird deshalb gern vermieden. Es ist aber die wichtigste Aussage der ganzen Übergabe - und sie schafft Vertrauen, statt es zu kosten.
  <br>↳ bezogen auf: „„Nicht abgesicherte Öffnungen bleiben ungeschützt - abgesichert sind X, Y und Z.““

**Mitnehmen:** Zur Einordnung für den Kunden: Der akustische Alarm läuft ca. 30 Sekunden, der optische ca. 180 Sekunden. Die Anlage macht auf den Vorgang aufmerksam - sie hält niemanden auf. Wer das sagt, wird nach einem Schaden nicht zum Beklagten.

#### 9. Was gehört nach der Übergabe in die Akte? Wähle alle zutreffenden.

`LAN-10` · Mehrfachauswahl · Dokumentation

- **Verbaute Produkte mit Artikel- und Seriennummern** ✓
- **Softwarestände und ein Foto der DIP-Stellung** ✓
- **Fahrzeugdaten sowie Einbaudatum** ✓
- **Durchgeführte Tests und deren Ergebnis** ✓
- Nur die Rechnungsnummer
- Die SIM-PIN des Kunden

**Auflösung:** Diese vier Blöcke sind genau die Angaben, die FEHMARN im Supportfall verlangt. Wer sie jetzt notiert, hat sie dann.

**Falsch gewählt?**

- *Tests weggelassen:* Der am leichtesten übersehene Punkt. Ohne Testdokumentation lässt sich später nicht unterscheiden, ob etwas nie funktioniert hat oder erst später ausgefallen ist - und genau daran hängt die Frage, wer den nächsten Termin zahlt.
  <br>↳ bezogen auf: „Durchgeführte Tests und deren Ergebnis“
- *Nur die Rechnungsnummer:* Trägt keinen einzigen Supportfall.
  <br>↳ bezogen auf: „Nur die Rechnungsnummer“

**Mitnehmen:** Das **Foto der DIP-Stellung** ist der am häufigsten vergessene und im Supportfall wertvollste Teil der Dokumentation - es beantwortet in zwei Sekunden eine Frage, die sonst eine Demontage kostet. Damit schließt sich der Kreis: Deine Akte von heute ist die Fallaufnahme von FEHMARN in zwei Jahren.

#### 10. Der Kunde stellt sein Wohnmobil über den Winter ab. Was gehört bei der Übergabe zum Thema Ruhestrom gesagt?

`LAN-11` · Einfachauswahl · Standzeit und Ruhestrom

- **Die THITRONIK-Komponenten ziehen zusammen rund 27-36 mA; dazu kommen Fahrzeuggrundlast und Selbstentladung - ohne Ladeerhaltung wird es nach wenigen Wochen knapp** ✓
- Nichts - die Anlage schaltet sich bei längeren Standzeiten selbst ab
- Die Anlage hat keinen nennenswerten Ruhestrom; eine leere Batterie kommt vom Fahrzeug
- Er soll vor der Standzeit einfach die Batterie abklemmen

**Auflösung:** WiPro III safe.lock rund **11 mA**, Pro-finder **16-25 mA**, zusammen etwa **27-36 mA** - und das ist nur THITRONIK. Fahrzeuggrundlast, Selbstentladung und Batteriezustand kommen dazu. Bei rund 50 mA Gesamtlast sind das etwa **1,2 Ah pro Tag**: von 30 Ah praktisch nutzbarer Kapazität bleiben rund **25 Tage**.

**Falsch gewählt?**

- *Die Anlage schaltet sich schon ab:* Sie tut das Gegenteil - wach bleiben ist ihre Aufgabe. Der Pro-finder geht erst bei 11,2 V in den Tiefentladeschutz, und dann ist die Batterie bereits in einem Zustand, den niemand wollte.
  <br>↳ bezogen auf: „Nichts - die Anlage schaltet sich bei längeren Standzeiten selbst ab“
- *Kein nennenswerter Ruhestrom:* Bequem in beide Richtungen. Die Anlage ist nicht der ganze Grund für eine leere Batterie, aber sie ist ein realer Anteil - und wer ihn bei der Übergabe verschweigt, diskutiert ihn im Frühjahr am Telefon.
  <br>↳ bezogen auf: „Die Anlage hat keinen nennenswerten Ruhestrom; eine leere Batterie kommt vom Fahrzeug“
- *Batterie abklemmen:* Löst das Stromproblem und schafft ein größeres: Eine abgeklemmte Anlage bewacht nichts. Die Antwort heißt Ladeerhaltung, nicht Abklemmen.
  <br>↳ bezogen auf: „Er soll vor der Standzeit einfach die Batterie abklemmen“

**Mitnehmen:** Ladeerhaltung spätestens nach etwa **zwei Wochen** einplanen und das Fahrzeug mit voller Batterie abstellen. Zwei Sätze bei der Übergabe ersparen den Anruf im März.
