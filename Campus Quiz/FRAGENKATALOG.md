# Fragenkatalog — THITRONIK Campus

> **Dieses Dokument nennt alle Lösungen.** Es ist für die fachliche
> Freigabe und die Schulungsvorbereitung gedacht, nicht für die
> Teilnehmer.

**Erzeugt** mit `node tools/fragenkatalog.js` aus den Fragensätzen in
`public/data/inseln/`. Änderungen gehören dorthin, nicht in diese Datei.

73 Fragen auf 7 Inseln.

| Fragetyp | Anzahl |
|---|---:|
| Einfachauswahl | 56 |
| Mehrfachauswahl | 11 |
| Zuordnung | 3 |
| Reihenfolge | 2 |
| Richtig/Falsch | 1 |

## Inhalt

- [VEJRØ — Produktneuheiten: Zugang & Wasserschutz](#vejrø--produktneuheiten-zugang--wasserschutz) · 10 Fragen
- [POEL — Händlerbereich](#poel--händlerbereich) · 10 Fragen
- [HIDDENSEE — Funk-Magnetkontakte & Leitungsverbindungen](#hiddensee--funk-magnetkontakte--leitungsverbindungen) · 12 Fragen
- [SAMSØ — Einbauorte im Fahrzeug](#samsø--einbauorte-im-fahrzeug) · 10 Fragen
- [FEHMARN — Fehlersuche & Support](#fehmarn--fehlersuche--support) · 11 Fragen
- [USEDOM — Verkaufsdisplay & Konfigurator](#usedom--verkaufsdisplay--konfigurator) · 10 Fragen
- [LANGELAND — Fahrzeugannahme & Fahrzeugübergabe](#langeland--fahrzeugannahme--fahrzeugübergabe) · 10 Fragen

---
## VEJRØ — Produktneuheiten: Zugang & Wasserschutz

| | |
|---|---|
| Fragen | 10 |
| Fragensatz-Version | 4 |
| Art | Neuheiten verstehen, passend beraten |
| Lernziel | CampLock und VanLock sicher abgrenzen, den Fingerprint ehrlich beraten und die neuen Funklösungen gegen Wassereinbruch passend einsetzen. |

**Quellen im Produktwissen:** `produkte/camplock-fingerprint.md`, `produkte/vanlock-fingerprint.md`, `produkte/funk-wassermelder.md`, `produkte/funk-magnetkontakt.md`, `referenz/zugang-bedienung.md`

> **Redaktioneller Hinweis (erscheint nicht im Quiz):** Fragenkatalog v4. VEJRØ bündelt Produktneuheiten: CampLock/VanLock, Funk-Wassermelder 868 und wasserdichter Funk-Magnetkontakt. VanLock-Einsatzbereich sowie alle Werte der Produktneuheiten vor jeder Schulung gegen den aktuellen Freigabestand prüfen.

#### 1. Ein Kunde hat einen Kastenwagen ohne Hartal-Aufbautür und möchte biometrischen Zugang. Was empfiehlst du?

`VEJ-01` · Einfachauswahl · Kundensituation

- CampLock Fingerprint
- **VanLock Fingerprint** ✓
- CampLock Fingerprint mit Montageadapter
- Erst nach Umbau auf eine Hartal-Tür möglich

**Auflösung:** CampLock ist für Hartal-Aufbautüren mit Zentralverriegelung gebaut, VanLock für Reisemobile und Kastenwagen. Zwei Produkte, zwei Einsatzbereiche.

**Falsch gewählt?**

- *CampLock oder CampLock mit Adapter:* Der Unterschied sitzt nicht in der Befestigung, sondern im Sensor und in der Türanbindung. Einen Adapter, der CampLock auf andere Türen bringt, gibt es nicht.
  <br>↳ bezogen auf: „CampLock Fingerprint“ · „CampLock Fingerprint mit Montageadapter“
- *Umbau auf Hartal-Tür:* Technisch absurd teuer — und unnötig, weil es für genau diesen Fall ein eigenes Produkt gibt.
  <br>↳ bezogen auf: „Erst nach Umbau auf eine Hartal-Tür möglich“

**Mitnehmen:** Erste Frage am Fahrzeug ist nie „welcher Fingerprint“, sondern „welche Tür“.

#### 2. Eine Außenklappe ist regelmäßig Spritzwasser ausgesetzt. Was gehört zur korrekten Montage des wasserdichten Funk-Magnetkontakts? Wähle alle zutreffenden.

`VEJ-03` · Mehrfachauswahl · Produktneuheit: Wasserdichter Funk-Magnetkontakt

- **Die wasserdichte Ausführung für den feuchtebelasteten Einbauort wählen** ✓
- **Die Gehäusepfeile von Sender und Magnet zueinander ausrichten** ✓
- **Im geschlossenen Zustand höchstens 22 mm Abstand einplanen** ✓
- Grundsätzlich den Montageadapter des Standardkontakts verwenden
- Den Sender dauerhaft unter Wasser montieren — IP67 erlaubt das

**Auflösung:** Für feuchte- und spritzwasserbelastete Öffnungen ist die wasserdichte Ausführung vorgesehen. Pfeile zueinander, geschlossen maximal 22 mm — und IP67 bedeutet nicht Dauereintauchen.

**Falsch gewählt?**

- *Standardadapter übernommen:* Die Montageregeln der Standardausführung dürfen nicht ungeprüft auf die wasserdichte Ausführung übertragen werden.
  <br>↳ bezogen auf: „Grundsätzlich den Montageadapter des Standardkontakts verwenden“
- *IP67 mit Dauereintauchen verwechselt:* IP67 schützt gegen zeitweiliges Untertauchen unter definierten Bedingungen. Es ist keine Freigabe für dauerhafte Montage unter Wasser oder den direkten Hochdruckstrahl.
  <br>↳ bezogen auf: „Den Sender dauerhaft unter Wasser montieren — IP67 erlaubt das“

**Mitnehmen:** Produktvariante zuerst nach dem Einbauort auswählen, danach nach ihrer eigenen Anleitung montieren — nicht nach der Regel eines ähnlich aussehenden Kontakts.

#### 3. Eine vierköpfige Familie soll Zugang bekommen, jede Person mit zwei Fingern. Reicht der Speicher?

`VEJ-05` · Einfachauswahl · Speicher in der Praxis

- Nein — es passen nur 8 Finger insgesamt
- **Ja — 16 Finger sind anlernbar, davon 2 als Master** ✓
- Ja, aber nur wenn auf Master-Finger verzichtet wird
- Ja — die Zahl ist unbegrenzt

**Auflösung:** 16 anlernbare Finger, davon 2 Master. Vier Personen × zwei Finger sind acht — der Speicher ist hier nicht die Grenze.

**Falsch gewählt?**

- *Auf Master verzichten:* Ohne Master lässt sich später kein Nutzer anlegen oder löschen. Die zwei Master sind keine optionale Zugabe, sie sind die Verwaltung.
  <br>↳ bezogen auf: „Ja, aber nur wenn auf Master-Finger verzichtet wird“
- *Unbegrenzt:* Verlockend, weil der Speicher in der Praxis nie knapp wird. Bei einem Vermietfahrzeug mit wechselnden Nutzern wird er es aber sehr wohl.
  <br>↳ bezogen auf: „Ja — die Zahl ist unbegrenzt“

**Mitnehmen:** Speicher ist selten das Problem — die Verteilung schon. Zwei Finger pro Person, damit ein Pflaster nicht den Urlaub kostet.

#### 4. Wo platzierst du beim Funk-Wassermelder 868 Sendeeinheit und Fühler?

`VEJ-08` · Einfachauswahl · Produktneuheit: Funk-Wassermelder 868

- **Sendeeinheit trocken und zugänglich; Fühler am tiefen Punkt, an dem Wasser früh erkannt werden soll** ✓
- Beide Komponenten direkt auf dem Fahrzeugboden im möglichen Wasserbereich
- Sendeeinheit hinter einer Metallverkleidung; Fühler möglichst hoch an der Wand
- Fühler in den Frischwassertank; Sendeeinheit außen unter das Fahrzeug

**Auflösung:** Die Sendeeinheit bleibt trocken, funkgünstig und für Wartung erreichbar. Der kabelgebundene Fühler sitzt tief am gewünschten Frühwarnpunkt, beide Kontaktflächen am Boden.

**Falsch gewählt?**

- *Sendeeinheit in den Nassbereich gesetzt:* Der Fühler erkennt das Wasser; die Sendeeinheit soll trocken bleiben. Wasserschutz ist keine Einladung, die Elektronik im möglichen Wasserstand zu montieren.
  <br>↳ bezogen auf: „Beide Komponenten direkt auf dem Fahrzeugboden im möglichen Wasserbereich“ · „Fühler in den Frischwassertank; Sendeeinheit außen unter das Fahrzeug“
- *Zu hoch und funktechnisch abgeschirmt:* Ein hoch montierter Fühler meldet erst spät. Metall unmittelbar um die Sendeeinheit kann zusätzlich die Funkstrecke verschlechtern.
  <br>↳ bezogen auf: „Sendeeinheit hinter einer Metallverkleidung; Fühler möglichst hoch an der Wand“

**Mitnehmen:** Beim Wassermelder haben Sender und Fühler bewusst zwei verschiedene Einbauorte: Elektronik trocken, Messpunkt tief.

#### 5. Bringe die Inbetriebnahme in die richtige Reihenfolge.

`VEJ-04` · Reihenfolge · Reihenfolge

1. Fahrzeug- und Türkompatibilität klären
2. Steuergerät und Sensor montieren, mit 12/24 V versorgen
3. WiPro und Fingerprint in den Anlernmodus versetzen und koppeln
4. Zwei Master-Finger einlernen
5. Nutzerfinger einlernen
6. Funktionstest an der geschlossenen Tür, zweiten Zugangsweg mitprüfen

**Auflösung:** Kompatibilität → Montage → Anlernmodus und Kopplung → Master → Nutzer → Test. Die Master-Finger kommen immer vor den Nutzerfingern: Ohne sie lässt sich später niemand verwalten.

**Falsch gewählt?**

- *Kompatibilität später:* Der teuerste aller Fehler. Ist die Tür ungeeignet, sitzt bereits ein Loch in der Verkleidung.
- *Test vor dem Anlernen:* Ein Test ohne angelernte Finger prüft nur, ob Strom anliegt.

**Mitnehmen:** Der Funktionstest gehört an die **geschlossene** Tür. Offen getestet heißt gar nicht getestet — Prinzip 3.

#### 6. Ein Ehepaar bekommt das System. Wie legst du die beiden Master-Finger an?

`VEJ-10` · Einfachauswahl · Übergabe

- Beide Master auf denselben Finger des Halters
- **Je ein Master pro Person, an unterschiedlichen Händen** ✓
- Beide Master auf die linke Hand des Halters
- Master überspringen, direkt Nutzerfinger anlernen

**Auflösung:** Die Master-Finger steuern die Verwaltung. Verteilt auf zwei Personen und zwei Hände bleibt sie auch dann verfügbar, wenn eine Person nicht da ist oder sich die Hand verletzt.

**Falsch gewählt?**

- *Beide beim Halter:* Der häufigste Fall in der Praxis, weil der Halter beim Einbau danebensteht und die zweite Person nicht. Genau deshalb bewusst nachfragen, wer noch fährt.
  <br>↳ bezogen auf: „Beide Master auf denselben Finger des Halters“
- *Beide auf eine Hand:* Fühlt sich ordentlich an, ist aber ein einziger Ausfallpunkt. Ein Gipsarm sperrt dann die gesamte Verwaltung.
  <br>↳ bezogen auf: „Beide Master auf die linke Hand des Halters“

**Mitnehmen:** Frag bei der Übergabe: „Wer fährt das Fahrzeug außer Ihnen?“ — diese eine Frage verhindert den halben Reklamationsanteil dieser Insel.

#### 7. Ein Kunde meldet: „Morgens am Meer erkennt das Gerät meinen Finger oft nicht.“ Wahrscheinlichste Ursache?

`VEJ-07` · Einfachauswahl · Reklamationsfall

- **Feuchte, salzige oder verschmutzte Fingerkuppen** ✓
- Zu niedrige Bordspannung am Steuergerät
- Der Sensor ist defekt und muss getauscht werden
- Der Finger wurde bei anderer Temperatur eingelernt

**Auflösung:** Feuchtigkeit und Salz auf der Fingerkuppe verändern das Bild, das der Sensor liest. „Morgens am Meer“ ist die Beschreibung der Ursache, nicht nur der Umstände.

**Falsch gewählt?**

- *Sensor defekt:* Der teuerste Reflex im Sortiment. Ein Sensor, der zeitweise und wetterabhängig nicht erkennt, ist fast nie defekt — ein defekter Sensor erkennt gar nicht.
  <br>↳ bezogen auf: „Der Sensor ist defekt und muss getauscht werden“
- *Bordspannung:* Klingt technisch fundiert, passt aber nicht zum Muster: Zu wenig Spannung wirkt nicht nur morgens und nicht nur bei einer Person.
  <br>↳ bezogen auf: „Zu niedrige Bordspannung am Steuergerät“

**Mitnehmen:** Vor jedem Austausch die Frage stellen: „Passiert das immer oder nur manchmal?“ Manchmal heißt fast nie Defekt.

#### 8. In welchen Situationen ist ein Fingerprint allein nicht die passende Empfehlung? Wähle alle zutreffenden.

`VEJ-09` · Mehrfachauswahl · Beratungsgrenzen

- **Der Kunde will damit die Fahrzeug-Zentralverriegelung bedienen, hat aber keine safe.lock-Anlage** ✓
- **Der Kunde plant bewusst keinen zweiten Zugangsweg** ✓
- **Der Kunde arbeitet beruflich viel mit Handschuhen und nassen Händen** ✓
- Der Kunde hat eine Hartal-Aufbautür mit Zentralverriegelung
- Der Kunde möchte zusätzlich eine Fahrzeugortung

**Auflösung:** Drei echte Grenzen: eine technische (ohne safe.lock keine Fahrzeug-ZV), eine konzeptionelle (kein zweiter Weg) und eine praktische (Handschuhe und nasse Hände).

**Falsch gewählt?**

- *Hartal-Aufbautür mitangekreuzt:* Das ist genau der vorgesehene Einsatzfall. Wer hier ein Problem sieht, verwechselt Voraussetzung mit Einschränkung.
  <br>↳ bezogen auf: „Der Kunde hat eine Hartal-Aufbautür mit Zentralverriegelung“
- *Ortungswunsch mitangekreuzt:* Kein Ausschlussgrund. Der Pro-finder kommt **zusätzlich** dazu, nicht anstelle. Verschiedene Ebenen schließen sich nicht aus, sie ergänzen sich.
  <br>↳ bezogen auf: „Der Kunde möchte zusätzlich eine Fahrzeugortung“

**Mitnehmen:** Grenzen anzusprechen kostet im Gespräch zwei Minuten. Nachträglich kostet es einen Werkstatttermin.

#### 9. Kunde mit WiPro III (ohne safe.lock): „Mit dem Finger mache ich dann das ganze Fahrzeug auf.“ Was stimmt?

`VEJ-02` · Einfachauswahl · Systemgrenze

- Richtig — der Finger entriegelt Aufbautür und Fahrzeug
- **Nur die Aufbautür — die Fahrzeug-Zentralverriegelung braucht safe.lock** ✓
- Nur das Fahrzeug — die Aufbautür bleibt am Originalschloss
- Weder noch — ohne safe.lock arbeitet CampLock gar nicht

**Auflösung:** Zwei getrennte Vorgänge. Die **Aufbautür** bedient CampLock selbst. Die **Fahrzeug-Zentralverriegelung** wird nur bei WiPro III safe.lock mit passender ZV-Anbindung mitgeführt. Scharf-/Unscharfschalten der Alarmanlage geht auch mit der Standard-WiPro III.

**Falsch gewählt?**

- *Beides geht:* Der häufigste Irrtum im ganzen Sortiment — und er entsteht nicht aus Unwissen, sondern weil der Kunde es so erwartet und man ihm nicht widersprechen will. Genau deshalb ist es der Beratungsfehler Nr. 1.
  <br>↳ bezogen auf: „Richtig — der Finger entriegelt Aufbautür und Fahrzeug“
- *CampLock arbeitet ohne safe.lock gar nicht:* Übervorsichtig gedacht. Die Aufbautür und die Alarmsteuerung funktionieren sehr wohl — nur eben nicht die Fahrzeug-ZV.
  <br>↳ bezogen auf: „Weder noch — ohne safe.lock arbeitet CampLock gar nicht“

**Mitnehmen:** **Prinzip 1 — Scharf/Unscharf ≠ Auf/Zu.** Diese Trennung begegnet dir heute noch dreimal: bei der KeyCard, bei BT-connect und im Campingmodus. Ein Satz für den Kunden: „Der Finger öffnet Ihre Aufbautür und schaltet die Anlage. Das ganze Fahrzeug entriegeln — dafür brauchen wir safe.lock.“

#### 10. Kunde: „Super, dann kann ich den Fahrzeugschlüssel ja zu Hause lassen.“ Deine beste Antwort?

`VEJ-06` · Einfachauswahl · Verkaufsgespräch

- Ja, der Fingerprint ersetzt den Schlüssel
- **Nein — immer einen zweiten, unabhängigen Zugangsweg vorsehen** ✓
- Ja, sofern zusätzlich ein Pro-finder verbaut ist
- Ja, sobald safe.lock verbaut ist

**Auflösung:** Jeder Bedienweg hat einen Ausfallmodus. Nasse Finger, leerer Akku, verlorene Kopplung — keiner davon darf dazu führen, dass der Kunde vor dem Fahrzeug steht.

**Falsch gewählt?**

- *Mit Pro-finder ja:* Naheliegend, aber der Pro-finder ist der **Fernsteuerungs**weg und braucht Mobilfunk. Ohne Netz auf dem Stellplatz ist er kein Zugang. Ein Backup, das dieselbe Voraussetzung wie das Original hat, ist keines.
  <br>↳ bezogen auf: „Ja, sofern zusätzlich ein Pro-finder verbaut ist“
- *Mit safe.lock ja:* safe.lock erweitert, was der Fingerprint kann — es macht ihn nicht ausfallsicher.
  <br>↳ bezogen auf: „Ja, sobald safe.lock verbaut ist“

**Mitnehmen:** **Prinzip 2 — Ein Zugangsweg ist kein Zugangsweg.** Sauberster Zweitweg: Funk-Handsender 868 (101064), unabhängig vom Smartphone, bis ca. 75 m, CR2032, kein Neuanlernen nach Batteriewechsel. Satz für den Kunden: „Nehmen Sie den Schlüssel trotzdem mit — nicht weil ich dem Finger misstraue, sondern weil Sie sonst nur einen Weg ins Fahrzeug haben.“

---

## POEL — Händlerbereich

| | |
|---|---|
| Fragen | 10 |
| Fragensatz-Version | 4 |
| Art | Das digitale Werkzeug für Beratung und Werkstatt |
| Lernziel | Den THITRONIK-Händlerbereich als tägliches Arbeitsmittel nutzen: Kundenunterlagen sauber von geschützten Einbaudaten trennen, Aufträge fundiert vorbereiten und den eigenen Werkstattservice stärken. |

**Quellen im Produktwissen:** `Öffentliche Website-Struktur (Stand 13.08.2026)`, `_intern/werkseinbau-eckernfoerde.md`, `produkte/gas-pro-iii.md`

> **Redaktioneller Hinweis (erscheint nicht im Quiz):** Fragenkatalog v4. POEL erklärt den Händlerbereich und stärkt den professionellen Einbau durch den Fachbetrieb. Vor dem Einsatz die konkreten Menüpunkte nach dem Login und den Serienbereich 1286-008 bis 1286-012 der Rückrufaktion in POE-05 gegenprüfen.

#### 1. Ein Kunde braucht die Konformitätserklärung nach 2014/53/EU für seinen Funk-Magnetkontakt. Wo findest du sie?

`POE-01` · Einfachauswahl · Suchauftrag

- Im Konfigurator
- **Im öffentlichen Supportbereich** ✓
- Beim Werkskundendienst anfordern
- Im Händlerfinder

**Auflösung:** Konformitätserklärungen liegen öffentlich unter thitronik.de/support. Weder Login noch Anruf nötig.

**Falsch gewählt?**

- *Werkskundendienst:* Genau der Reflex, den diese Insel abgewöhnen soll. Es ist eine der häufigsten telefonischen Anfragen — und sie ist zwei Klicks entfernt.
  <br>↳ bezogen auf: „Beim Werkskundendienst anfordern“

**Mitnehmen:** Alles, was ein Kunde bekommen darf, ist öffentlich. Wenn du es nicht findest, suchst du an der falschen Stelle — nicht im falschen Bereich.

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

`POE-03` · Einfachauswahl · Grenzfall

- Öffentlicher Downloadbereich, Rubrik Alarmanlagen
- **Über den geschützten Händlerbereich bzw. THITRONIK direkt** ✓
- In der FAQ Allgemein
- Im Konfigurator-PDF

**Auflösung:** CAN-Anschlusspläne, Steckerbelegungen und Bauteillagen sind bewusst nicht öffentlich. Für Fachhändler: thitronik.de/haendler-bereich, technischer Support +49 4351 76744-112.

**Falsch gewählt?**

- *Öffentlicher Downloadbereich:* Wer dort sucht, sucht vergeblich — und das fühlt sich an wie ein Fehler der Website. Es ist Absicht: Diese Unterlagen gehören in Fachhand, nicht in die Hände dessen, der am Samstag selbst schrauben will.
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

- *Nur über den Außendienst:* Funktioniert auch — dauert aber Tage statt Minuten und bindet jemanden, der besser verkauft.
  <br>↳ bezogen auf: „Nur über den Außendienst“

**Mitnehmen:** Der Login lohnt sich einmalig und spart dauerhaft. Vieles, was Händler telefonisch anfragen, liegt dort bereits fertig.

#### 6. Ein Kunde bringt eine G.A.S.-pro III mit Seriennummer 1286-010 in die Werkstatt. Was tust du?

`POE-05` · Einfachauswahl · Sicherheitsrelevant

- Normal einbauen — der Rückruf betraf nur CO-Geräte
- **Rückrufseite prüfen, Gerät anmelden, kostenloses Update** ✓
- Sensor tauschen und Gerät weiterverkaufen
- Gerät entsorgen und Ersatz berechnen

**Auflösung:** Der Serienbereich **1286-008 bis 1286-012** ist in Kombination mit dem Zusatzsensor **101289** von der freiwilligen Rückrufaktion betroffen. Das Update ist kostenlos.

**Falsch gewählt?**

- *Normal einbauen:* Der Gedanke „das betraf doch die anderen Geräte“ ist genau die Lücke, die eine Rückrufaktion aufspüren soll. Bei sicherheitsrelevanten Geräten wird nicht aus dem Gedächtnis entschieden.
  <br>↳ bezogen auf: „Normal einbauen — der Rückruf betraf nur CO-Geräte“
- *Entsorgen:* Übervorsichtig und teuer. Das Gerät ist reparabel, das Update kostenlos — der Kunde verliert nichts außer ein paar Tagen.
  <br>↳ bezogen auf: „Gerät entsorgen und Ersatz berechnen“

**Mitnehmen:** Bei jeder Seriennummer im Rückrufbereich gilt: erst Rückrufseite, dann Schraubendreher. Kostenlos ist nur das Update — der Einbau eines betroffenen Geräts ohne Prüfung ist es später nicht.

#### 7. Ein Endkunde aus Bayern fragt, wo er den Einbau machen lassen kann. Worauf verweist du?

`POE-07` · Einfachauswahl · Kunde am Telefon

- **Den Händlerfinder auf der THITRONIK-Website** ✓
- Die Support-Hotline
- Den Konfigurator
- Den Werkseinbau in Eckernförde

**Auflösung:** Der Händlerfinder ist genau dafür gebaut.

**Falsch gewählt?**

- *Werkseinbau Eckernförde:* Eine Möglichkeit, aber für einen Kunden aus Bayern selten die naheliegende — und wer sie als einzige nennt, verschenkt einen Auftrag an einen Kollegen in der Nähe des Kunden.
  <br>↳ bezogen auf: „Den Werkseinbau in Eckernförde“

**Mitnehmen:** Der Händlerfinder ist auch dein eigener Vertriebskanal. Wer ihn kennt, wird über ihn gefunden.

#### 8. Ein Kunde möchte das Gerät nur abholen und selbst einbauen. Welche Argumente sprechen für einen professionellen Einbautermin in deinem Fachbetrieb? Wähle alle zutreffenden.

`POE-08` · Mehrfachauswahl · Eigener Werkstatttermin

- **Fahrzeugkompatibilität und aktuelle Einbauunterlage werden vorab geprüft** ✓
- **Einbauort, Funkstrecke und Anschluss werden am konkreten Fahrzeug bewertet** ✓
- **Das Gesamtsystem wird nach dem Einbau getestet und verständlich übergeben** ✓
- **Verbaute Komponenten, Seriennummern und Prüfergebnisse werden dokumentiert** ✓
- Nur ein Fachbetrieb darf THITRONIK-Produkte überhaupt einschalten
- Ein professioneller Einbau macht jeden späteren Defekt unmöglich

**Auflösung:** Der Wert des Werkstatttermins liegt in Prüfung, fachgerechtem Einbau, Systemtest, Übergabe und Dokumentation — nicht nur in der Montagezeit.

**Falsch gewählt?**

- *Unzulässiges Ausschließlichkeitsargument:* Verkaufe die Qualität deiner Arbeit, nicht eine pauschale Behauptung. Entscheidend sind Fahrzeugkenntnis, Unterlagen, Prüfung und sichere Übergabe.
  <br>↳ bezogen auf: „Nur ein Fachbetrieb darf THITRONIK-Produkte überhaupt einschalten“
- *Fehlerfreiheit versprochen:* Auch ein professioneller Einbau macht Technik nicht unfehlbar. Er reduziert Risiken und schafft eine dokumentierte Basis für Wartung und Diagnose.
  <br>↳ bezogen auf: „Ein professioneller Einbau macht jeden späteren Defekt unmöglich“

**Mitnehmen:** Der professionelle Besuch beginnt mit Beratung und endet erst nach dokumentiertem Funktionstest und Einweisung. Genau darin liegt der Mehrwert deines Betriebs.

#### 9. Ein Endkunde möchte direkt bei THITRONIK bestellen, weil du das Gerät nicht vorrätig hast. Was gilt?

`POE-10` · Einfachauswahl · Bezugsweg

- **THITRONIK liefert nicht an Endkunden — Bezug läuft über den Fachhandel** ✓
- THITRONIK liefert direkt, du erhältst eine Provision
- Direktbestellung ist ab zwei Geräten möglich
- Nur Ersatzteile gehen direkt an Endkunden

**Auflösung:** Der Bezug läuft ausschließlich über den Fachhandel — Caravaning, Car-HiFi, Bosch-Dienste. Einzige Ausnahme: Direktverkauf im Rahmen des Werkseinbauservice in Eckernförde.

**Falsch gewählt?**

- *Provision:* Klingt nach einer eleganten Lösung für einen unangenehmen Moment. Sie existiert nicht — und die Frage kommt meist genau dann, wenn du gerade nicht liefern kannst und dich schwach fühlst.
  <br>↳ bezogen auf: „THITRONIK liefert direkt, du erhältst eine Provision“
- *Ersatzteile direkt:* Verlockend, weil es harmlos wirkt. Es würde aber die Kette aufbrechen, an der auch dein Servicegeschäft hängt.
  <br>↳ bezogen auf: „Nur Ersatzteile gehen direkt an Endkunden“

**Mitnehmen:** Der Fachhandelsweg ist keine Formalie — er ist der Grund, warum Beratung, Einbau und Support beim Fachbetrieb zusammenbleiben. Also bei dir.

#### 10. Der Kunde bringt eine ältere Einbauanleitung mit, im Händlerbereich liegt eine neuere Fassung. Was ist der professionelle Umgang damit?

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

---

## HIDDENSEE — Funk-Magnetkontakte & Leitungsverbindungen

| | |
|---|---|
| Fragen | 12 |
| Fragensatz-Version | 4 |
| Art | Anlernen, montieren, abzweigen und crimpen |
| Lernziel | Funk-Magnetkontakte zuverlässig anlernen und montieren sowie elektrische Abgriffe mit dem passenden Verbinder und Werkzeug fachgerecht ausführen. |

**Quellen im Produktwissen:** `produkte/funk-magnetkontakt.md`, `fahrzeuge/ford-transit-6g.md`, `referenz/fahrzeugkompatibilitaet.md`

> **Redaktioneller Hinweis (erscheint nicht im Quiz):** Fragenkatalog v4. HIDDENSEE umfasst Funk-Magnetkontakte, gelgefüllte Abzweigverbinder und fachgerechte Crimpverbindungen. HID-01, HID-05 und HID-09 gewinnen später durch echte Werkstattfotos. Die Auslöseschwelle über 30 mm in HID-03 vor Einsatz fachlich bestätigen.

#### 1. Ein Funk-Magnetkontakt ließ sich problemlos anlernen — beim Öffnen der Klappe passiert aber nichts. Woran liegt es?

`HID-01` · Einfachauswahl · Der Klassiker

- Die Batterie ist zu schwach zum Senden
- **Die Platine liegt falsch herum — Sende-LED zeigt zum Magneten** ✓
- Der Kontakt wurde an der Zentrale nicht gespeichert
- Die Anlage war beim Test nicht scharf geschaltet

**Auflösung:** In dieser Ausrichtung ist Anlernen möglich, eine Alarmierung aber nicht. Richtig: Sende-LED zeigt **weg** vom Magneten, nach oben.

**Falsch gewählt?**

- *Nicht gespeichert:* Der Denkfehler steckt schon in der Frage — „ließ sich problemlos anlernen“. Genau das macht diesen Fehler so tückisch: Die Anlern-Bestätigung kommt, und man glaubt, alles sei gut.
  <br>↳ bezogen auf: „Der Kontakt wurde an der Zentrale nicht gespeichert“
- *Anlage nicht scharf:* Ein guter Reflex und immer wert zu prüfen. Bei einem frisch montierten Kontakt in falscher Lage bleibt der Alarm aber auch scharf geschaltet aus.
  <br>↳ bezogen auf: „Die Anlage war beim Test nicht scharf geschaltet“

**Mitnehmen:** Die Anlern-Bestätigung beweist gar nichts. Nur der Testalarm mit scharfer Anlage tut es — **Prinzip 3**.

#### 2. In den Unterlagen stehen unterschiedliche Maximalabstände zwischen Sender und Magnet — 22 mm und 25 mm. Wie legst du die Montage aus?

`HID-02` · Einfachauswahl · Umgang mit Quellen

- Auf 25 mm — das ist der höhere Wert
- **Auf 22 mm — den kleineren der genannten Werte** ✓
- Auf den Mittelwert, rund 23 mm
- Unkritisch, solange der Kontakt im geschlossenen Zustand schließt

**Auflösung:** Die Standard-Produktanleitung nennt 25 mm, das WiPro-III-Handbuch und die wasserdichte Ausführung 22 mm. Wer auf 22 mm auslegt, liegt in jedem Fall innerhalb der Spezifikation.

**Falsch gewählt?**

- *25 mm:* Nicht falsch gelernt — dieser Wert steht tatsächlich in der Produktanleitung. Aber er gilt nicht für alle Ausführungen, und du weißt beim Einbau nicht immer, welche Unterlage der Kunde später zitiert.
  <br>↳ bezogen auf: „Auf 25 mm — das ist der höhere Wert“
- *Mittelwert:* Der schlechteste aller Wege. Bei widersprüchlichen Spezifikationen gibt es kein „ungefähr richtig“ — es gibt nur innerhalb oder außerhalb.
  <br>↳ bezogen auf: „Auf den Mittelwert, rund 23 mm“

**Mitnehmen:** Bei abweichenden Quellenangaben immer konservativ auslegen. Und danach den Reichweitentest fahren — der schlägt jeden Papierwert.

#### 3. Bei der wasserdichten Ausführung: Ab welchem Abstand gilt der Kontakt sicher als „offen“?

`HID-03` · Einfachauswahl · Falle

- Ab 22 mm
- **Ab mehr als 30 mm** ✓
- Sobald die Teile sichtbar getrennt sind
- Ab 15 mm

**Auflösung:** Zwei verschiedene Werte für zwei verschiedene Zustände: **22 mm** ist die Obergrenze im **geschlossenen** Zustand, **über 30 mm** ist die **Auslöseschwelle**.

**Falsch gewählt?**

- *22 mm:* Der wahrscheinlichste Fehlgriff, weil 22 mm die Zahl ist, die man sich zu dieser Ausführung merkt. Genau darin liegt die Falle: Zwei Werte, die im selben Datenblatt stehen und Gegenteiliges bedeuten.
  <br>↳ bezogen auf: „Ab 22 mm“
- *Sichtbar getrennt:* Beim Funktionstest reicht das oft nicht. Zwei Finger breit auseinander sind je nach Handgröße 20 mm — und damit noch „geschlossen“.
  <br>↳ bezogen auf: „Sobald die Teile sichtbar getrennt sind“

**Mitnehmen:** Beim Test großzügig trennen, nicht andeutungsweise. Ein halber Test ist ein falsches Ergebnis mit Brief und Siegel.

#### 4. Welche Regel gilt für welche Ausführung?

`HID-04` · Zuordnung · Nicht vermischen

| Zuzuordnen | Richtig |
|---|---|
| Sende-LED muss vom Magneten weg zeigen | Standard |
| Gehäusepfeile müssen zueinander zeigen | Wasserdicht |
| Montageadapter 100428 / 100729 | Standard |
| V4A-Senkkopfschrauben (nicht im Lieferumfang) | Wasserdicht |

**Auflösung:** Standard: Sende-LED weg vom Magneten, Montageadapter 100428 (schwarz) / 100729 (weiß). Wasserdicht: Gehäusepfeile zueinander, V4A-Senkkopfschrauben.

**Falsch gewählt?**

- *Regeln vertauscht:* Der häufigste Fehler an dieser Station. Beide Ausführungen sehen ähnlich aus und heißen fast gleich — aber die Ausrichtungsregel der einen ist bei der anderen nutzlos.

**Mitnehmen:** Erst die Ausführung bestimmen, dann die Regel anwenden. Nie umgekehrt. Und bei der wasserdichten Ausführung dran denken: Die Schrauben sind **nicht** im Lieferumfang — das merkt man sonst auf der Hebebühne.

#### 5. Der Kontakt an der metallischen Heckgarage arbeitet unzuverlässig. Erste Maßnahme?

`HID-05` · Einfachauswahl · Werkstattfall

- Batterie tauschen
- Kontakt löschen und neu anlernen
- **Montageadapter setzen und Reichweitentest wiederholen** ✓
- Zweiten Kontakt parallel montieren

**Auflösung:** Metall in unmittelbarer Nähe dämpft die Funkstrecke. Der Adapter (100428 schwarz / 100729 weiß) schafft Abstand zur Metallfläche und überbrückt zugleich größere Spaltmaße.

**Falsch gewählt?**

- *Neu anlernen:* Der Standardreflex bei Funkproblemen. Aber „unzuverlässig“ heißt: Er funktioniert manchmal — also ist er angelernt. Anlernen behebt keine Reichweitenprobleme.
  <br>↳ bezogen auf: „Kontakt löschen und neu anlernen“
- *Zweiter Kontakt:* Verdoppelt das Problem statt es zu lösen. Beide sitzen dann auf demselben Metall.
  <br>↳ bezogen auf: „Zweiten Kontakt parallel montieren“

**Mitnehmen:** „Manchmal“ zeigt fast immer auf die Funkstrecke, „nie“ auf Anlernen oder Ausrichtung. Diese Unterscheidung spart dir die halbe Fehlersuche.

#### 6. Beim Öffnen einer Klappe ertönt ca. 2 Sekunden ein Ton aus der Zentrale, die rote Sende-LED bleibt rund 30 Sekunden an. Was bedeutet das?

`HID-06` · Einfachauswahl · Batteriediagnose

- Der Kontakt ist nicht angelernt
- **Die CR2032 des zuletzt betätigten Senders ist schwach** ✓
- Die Zentrale meldet einen Störsender
- Normale Sendebestätigung nach dem Anlernen

**Auflösung:** Batteriewarnung unterhalb von ca. 2,6 V. Sie betrifft **immer nur den zuletzt betätigten Sender**.

**Falsch gewählt?**

- *Normale Sendebestätigung:* Gefährlichster Irrtum, weil er zu Nichtstun führt. Wer die Warnung für normal hält, schickt den Kunden mit einem Sender los, der in wenigen Wochen verstummt.
  <br>↳ bezogen auf: „Normale Sendebestätigung nach dem Anlernen“
- *Störsender:* Verwechslung mit dem Anti-Jamming-Alarm der WiPro. Der zeigt sich im Blinkcode der Status-LED, nicht als Ton beim Öffnen einer Klappe.
  <br>↳ bezogen auf: „Die Zentrale meldet einen Störsender“

**Mitnehmen:** Wurden alle Kontakte gleichzeitig verbaut, stehen die übrigen kurz davor — Lebensdauer rund 2 Jahre. Gleich alle Knopfzellen ähnlichen Alters mitplanen, statt den Kunden dreimal kommen zu lassen.

#### 7. An einer Aufbautür: Welches Teil kommt wohin?

`HID-09` · Einfachauswahl · Montagelogik

- Sendergehäuse an den festen Rahmen, Magnet ans Türblatt
- Umgekehrt — der Sender muss mit der Tür mitschwingen
- **Beliebig, solange der Abstand stimmt** ✓
- Beide auf dem Türblatt, versetzt zueinander

**Auflösung:** Für die Funktion ist es beliebig, ob Sender oder Magnet am beweglichen Teil sitzt. Entscheidend sind der korrekte Abstand, die Ausrichtung der jeweiligen Ausführung und eine dauerhaft sichere Befestigung.

**Falsch gewählt?**

- *Eine feste Seite vorgeschrieben:* Die elektrische Kontaktfunktion schreibt nicht vor, welches Bauteil am Rahmen oder Türblatt sitzt. Die konkrete Montage muss lediglich Abstand, Ausrichtung und mechanische Belastung sicher beherrschen.
  <br>↳ bezogen auf: „Sendergehäuse an den festen Rahmen, Magnet ans Türblatt“ · „Umgekehrt — der Sender muss mit der Tür mitschwingen“
- *Beide Teile auf derselben Seite:* Sender und Magnet müssen sich beim Öffnen voneinander entfernen. Sitzen beide auf dem Türblatt, ändert sich ihr Abstand nicht zuverlässig.
  <br>↳ bezogen auf: „Beide auf dem Türblatt, versetzt zueinander“

**Mitnehmen:** Rahmen oder Türblatt ist funktional frei wählbar — Abstand, Ausrichtung und eine robuste Befestigung sind es nicht.

#### 8. „Jede Fahrzeugtür braucht einen Funk-Magnetkontakt.“

`HID-07` · Richtig/Falsch · Richtig oder falsch

- Richtig
- **Falsch** ✓

**Auflösung:** Türen, deren Öffnung im Kombi-Instrument angezeigt wird, werden bei korrekt angeschlossener WiPro III bereits über den CAN-Bus überwacht.

**Falsch gewählt?**

- *Richtig:* Sicherheitsdenken — lieber einen zu viel. Hier führt es zu unnötigen Kosten für den Kunden, mehr Batterien im Wartungsplan und mehr Bauteilen, die ausfallen können.
  <br>↳ bezogen auf: „Richtig“

**Mitnehmen:** Schneller Praxistest am Fahrzeug: Tür öffnen und aufs Display schauen. Wird sie dort angezeigt, ist kein Kontakt nötig. Diese fünf Sekunden ersetzen jede Diskussion.

#### 9. Es ist November, die Werkstatt ist auf 8 °C runtergekühlt. Du sollst Klebepads verarbeiten. Was gilt?

`HID-08` · Einfachauswahl · Praxis, Winter

- Kein Problem, Pads sind temperaturunabhängig
- **Nicht kleben — unter 15 °C Oberflächentemperatur nicht verarbeiten** ✓
- Pad kurz mit Heißluft erwärmen und sofort belasten
- Zusätzlich Sekundenkleber auftragen

**Auflösung:** Unter 15 °C Oberflächentemperatur bindet der Kleber nicht richtig ab.

**Falsch gewählt?**

- *Mit Heißluft erwärmen:* Der cleverste der falschen Wege — und der verlockendste, weil er den Termin rettet. Das Pad wird warm, klebt sofort scheinbar gut, und die Endfestigkeit erreicht es trotzdem nie. Der Fehler zeigt sich Wochen später beim Kunden.
  <br>↳ bezogen auf: „Pad kurz mit Heißluft erwärmen und sofort belasten“
- *Temperaturunabhängig:* Der Fehler mit der längsten Latenz im ganzen Katalog. Der Kontakt hält den ganzen Winter und fällt im Frühjahr ab.
  <br>↳ bezogen auf: „Kein Problem, Pads sind temperaturunabhängig“

**Mitnehmen:** Zwei Dinge gehören dazu: Endfestigkeit erst nach ca. **24 Stunden**, und die Fläche muss sauber, trocken und fettfrei sein. Ein zu kalt oder zu schmutzig geklebter Kontakt fällt nicht sofort ab — er fällt dann ab, wenn niemand mehr an den Einbau denkt.

#### 10. Bringe die Montageschritte des Funk-Magnetkontakts in die richtige Reihenfolge.

`HID-10` · Reihenfolge · Reihenfolge

1. WiPro III in den Anlernmodus versetzen und Funk-Magnetkontakt anlernen
2. Reichweitentest am geplanten Ort
3. Endgültig kleben oder verschrauben
4. Testalarm mit scharfer Anlage

**Auflösung:** Jeder Schritt setzt den vorherigen voraus — und jeder prüft etwas anderes. Der Reichweitentest prüft den **Ort**, der Testalarm die **Funktion**.

**Falsch gewählt?**

- *Erst kleben, dann testen:* Der teuerste Ablauf. Stimmt der Ort nicht, brauchst du ein neues Pad, eine neu vorbereitete Fläche und wieder 24 Stunden.
- *Testalarm weggelassen:* Dann bleibt der Klassiker mit der falsch herum liegenden Platine unentdeckt — angelernt, montiert, und im Ernstfall passiert nichts.

**Mitnehmen:** **Prinzip 3 — montiert ist nicht funktionsfähig.** Zwei Tests, zwei verschiedene Fragen: „Kommt das Signal von hier an?“ und „Löst die Anlage wirklich aus?“ Keiner ersetzt den anderen.

#### 11. Du willst an einer Fahrzeugleitung einen gelgefüllten Abzweigverbinder setzen. Was muss vor dem Verpressen feststehen?

`HID-11` · Einfachauswahl · Gelgefüllter Abzweigverbinder

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

#### 12. Woran erkennst du eine fachgerechte Crimpverbindung? Wähle alle zutreffenden.

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

---

## SAMSØ — Einbauorte im Fahrzeug

| | |
|---|---|
| Fragen | 10 |
| Fragensatz-Version | 4 |
| Art | Wo kommt was hin? |
| Lernziel | Physik bestimmt den Einbauort, nicht der freie Platz. Wer das verstanden hat, muss keine Liste auswendig lernen. |

**Quellen im Produktwissen:** `produkte/pro-finder.md`, `produkte/gas-pro-iii.md`, `produkte/nfc-modul.md`, `produkte/funk-rauchmelder.md`, `produkte/wipro-iii.md`, `fahrzeuge/*`

> **Redaktioneller Hinweis (erscheint nicht im Quiz):** Fragenkatalog v4. SAM-02 und SAM-03 nutzen echte Einbaufotos aus dem bestehenden FehlerQuiz. SAM-04 prüft jetzt die Qualitätskriterien für den Einbauort einer WiPro III. Fachlich zu bestätigen: die max. 7 m Gesamtlänge des Zusatzsensorkabels in SAM-08.

#### 1. Ordne jedem Gerät den vorgesehenen Einbauort zu.

`SAM-01` · Zuordnung · Einbauorte

| Zuzuordnen | Richtig |
|---|---|
| G.A.S.-pro III (Propan, Butan, KO-Gase) | Senkrecht, ca. 10–20 cm über dem Boden |
| G.A.S.-pro III CO | Senkrecht, ca. 10–20 cm unter der Decke |
| T.S.A. Funk-Rauchmelder | An oder nahe der Decke |
| NFC Modul | Innenseite einer geeigneten Scheibe |

Weitere Auswahlmöglichkeiten, die zu nichts passen: Im Bodenstauraum außerhalb des Wohnraums · Neben der WiPro-Zentrale im Schrank

**Auflösung:** Jeder Ort folgt aus der Physik. Flüssiggas ist schwerer als Luft und sammelt sich unten. CO verteilt sich anders und wird deckennah erfasst. Rauch steigt auf. Das NFC Modul muss von außen erreichbar sein und sitzt deshalb hinter der Scheibe.

**Falsch gewählt?**

- *Gas und CO vertauscht:* Der folgenreichste Fehler dieser Insel. Ein tief montierter CO-Sensor meldet zu spät, ein hoch montierter Gassensor gar nicht.
- *Gaswarner in den Bodenstauraum:* Nah dran gedacht — unten ist richtig, aber der Sensor muss den **Wohnraum** überwachen, nicht einen abgetrennten Stauraum.

**Mitnehmen:** Wenn du den Ort vergessen hast, frag dich: Wohin bewegt sich das, was das Gerät finden soll? Die Antwort ist der Einbauort.

#### 2. Welches Bild zeigt den vorgesehenen Einbauort des Gaswarners?

`SAM-02` · Einfachauswahl · Einbauort Gaswarner

> Achte auf die Höhe über dem Boden und auf die direkte Umgebung.

- `/media/samsoe/sam-gas-a.webp` — Gaswarner an einer senkrechten Fläche neben einer runden Öffnung, auf einer schwarzen Montageplatte
- `/media/samsoe/sam-gas-b.webp` — Gaswarner im Inneren eines Kleiderschranks, darüber hängen Kleiderbügel
- `/media/samsoe/sam-gas-c.webp` — Gaswarner oben an der Bedienkonsole über der Fahrerhaustür
- **`/media/samsoe/sam-gas-d.webp` — Gaswarner bodennah an der Verkleidung eines Sitzkastens** ✓

**Auflösung:** Senkrechte Fläche, etwa 10–20 cm über dem Boden, im überwachten Wohnraum.

**Falsch gewählt?**

- *Der Kleiderschrank:* Die Höhe stimmt manchmal sogar — aber ein geschlossener Schrank ist ein eigener Luftraum. Was dort gemessen wird, sagt über den Wohnraum nichts.
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

- *Das hochkant stehende Modul:* Platzsparend und sauber verlegt — aber eine hochkant stehende GPS-Antenne verliert einen Großteil ihres Empfangs. Und niemand merkt es beim Einbau.
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

#### 5. Die Antennenleitung der WiPro III (Pin 10, weiß) ist deutlich zu lang für den gewählten Einbauort. Was tust du?

`SAM-05` · Einfachauswahl · Falle

- Auf 20 cm kürzen
- Sauber aufwickeln und mit Kabelbinder fixieren
- **Weder kürzen noch aufwickeln — Verlegung anpassen** ✓
- Mit Lautsprecherkabel verlängern

**Auflösung:** Die Leitung **ist** die Antenne. Ihre Länge ist Teil der Funktion, nicht eine Zugabe fürs Verlegen.

**Falsch gewählt?**

- *Aufwickeln:* Der mit Abstand häufigste Fehler — und der, der wie sauberes Arbeiten aussieht. Ein aufgewickeltes Kabel ist eine Spule und verändert das Sendeverhalten. Die Anlage arbeitet dann mit verringerter Reichweite und meldet keinen Fehler.
  <br>↳ bezogen auf: „Sauber aufwickeln und mit Kabelbinder fixieren“
- *Kürzen:* Konsequent zu Ende gedacht, aber irreversibel. Danach ist die Zentrale nur noch mit Ersatzkabelbaum zu retten.
  <br>↳ bezogen auf: „Auf 20 cm kürzen“

**Mitnehmen:** Antennenleitungen werden gestreckt verlegt — nie gekürzt, nie aufgewickelt. Passt es nicht, ändert sich der Montageort, nicht das Kabel.

#### 6. Wo wird das NFC Modul montiert?

`SAM-06` · Einfachauswahl · NFC Modul

- Außen an der Karosserie, IP-geschützt
- **Innen an einer geeigneten Scheibe, von außen gut erreichbar** ✓
- Neben der WiPro-Zentrale im Schrank
- Im Fahrerhaus unter dem Armaturenbrett

**Auflösung:** Innen an der Scheibe — geschützt vor Wetter und Zugriff, aber von außen bedienbar.

**Falsch gewählt?**

- *Außen an der Karosserie:* Naheliegend, weil es von außen bedient wird. Es wäre aber auch von außen demontierbar — und damit ein Angriffspunkt an einer Sicherheitsanlage.
  <br>↳ bezogen auf: „Außen an der Karosserie, IP-geschützt“
- *Im Schrank neben der Zentrale:* Verwechselt Modul mit Steuergerät. Die Lesestelle muss dort sein, wo der Nutzer steht.
  <br>↳ bezogen auf: „Neben der WiPro-Zentrale im Schrank“

**Mitnehmen:** Einen Nebeneffekt sprichst du von dir aus an: Bei **beheizbaren Frontscheiben** ist mit höherem Verbrauch und kürzerer Batterielebensdauer zu rechnen. Und beim Einbau: Das NFC Modul darf nicht als erstes Zubehör angelernt werden.

#### 7. Das Fahrzeug hat eine Stoffdecke. Wie montierst du den T.S.A.?

`SAM-07` · Einfachauswahl · Rauchmelder

- Klebepad direkt auf den Stoff drücken, 60 s halten
- **Nicht auf Stoff kleben — Montageadapter verwenden** ✓
- Durch die Stoffdecke schrauben
- In eine Fahrzeugecke setzen

**Auflösung:** Auf Stoff hält kein Klebepad dauerhaft. Montageadapter 105755 (weiß) / 105756 (grau) an einem seitlichen Kunststoffelement nahe der Decke.

**Falsch gewählt?**

- *Aufs Klebepad und fest andrücken:* Hält beim Verlassen der Werkstatt einwandfrei — deshalb ist es so verführerisch. Der Melder fällt später herunter, im schlechtesten Fall unbemerkt.
  <br>↳ bezogen auf: „Klebepad direkt auf den Stoff drücken, 60 s halten“
- *In eine Ecke setzen:* Ecken sind strömungstechnisch tote Zonen. Rauch kommt dort verzögert an.
  <br>↳ bezogen auf: „In eine Fahrzeugecke setzen“

**Mitnehmen:** Bei einem Melder, der Leben schützen soll, gilt keine Lösung, die „erstmal hält“.

#### 8. Ein Liner hat 7,4 m Innenlänge, der Schlafbereich ist durch eine Schiebetür getrennt. Was folgt für die CO-Überwachung?

`SAM-08` · Einfachauswahl · Fahrzeuggröße

- Ein Gerät reicht, solange es mittig sitzt
- **Zweiten Detektionspunkt vorsehen** ✓
- Zwei komplette Hauptgeräte sind zwingend
- Ein Gerät genügt, wenn die Schiebetür offen bleibt

**Auflösung:** Ab **6,5 m Innenlänge** oder bei mehreren Schlafbereichen braucht es einen zweiten Detektionspunkt — ein zweites G.A.S.-pro III CO oder einen zusätzlichen CO-Sensor.

**Falsch gewählt?**

- *Wenn die Tür offen bleibt:* Setzt auf das Verhalten des Kunden. Genau diese Tür wird nachts geschlossen — also dann, wenn CO am gefährlichsten ist und alle schlafen.
  <br>↳ bezogen auf: „Ein Gerät genügt, wenn die Schiebetür offen bleibt“
- *Zwei komplette Hauptgeräte zwingend:* Überdimensioniert und unnötig teuer. Ein Zusatzsensor am vorhandenen Gerät genügt oft.
  <br>↳ bezogen auf: „Zwei komplette Hauptgeräte sind zwingend“

**Mitnehmen:** Eine geschlossene Tür trennt den Luftraum. Bei einer Sicherheitsfunktion planst du für den geschlossenen Zustand, nie für den bequemen. Zusatzsensorkabel konservativ auf max. 7 m Gesamtlänge auslegen.

#### 9. WiPro III und Pro-finder werden eingebaut. Was gilt für die Versorgung?

`SAM-09` · Einfachauswahl · Verdrahtung

- **Beide an dieselbe Fahrzeugbatterie, Verbindung über RJ11** ✓
- WiPro an Starter-, Pro-finder an Aufbaubatterie
- Beide direkt an die Solaranlage
- Pro-finder über Klemme 15 absichern

**Auflösung:** Gemeinsame Versorgung heißt gemeinsames Bezugspotenzial. Verbindung untereinander über das dafür vorgesehene RJ11-Kabel.

**Falsch gewählt?**

- *Getrennte Batterien:* Wirkt durchdacht — die Aufbaubatterie hat mehr Reserve. Unterschiedliche Bezugspotenziale erzeugen aber Störungen, die später kaum auffindbar sind und sich als sporadische Fehler zeigen.
  <br>↳ bezogen auf: „WiPro an Starter-, Pro-finder an Aufbaubatterie“
- *Klemme 15:* Der Klassiker aus der Kfz-Elektrik. Klemme 15 fällt ab, sobald die Zündung aus ist — also genau dann, wenn eine Diebstahlwarnanlage arbeiten soll.
  <br>↳ bezogen auf: „Pro-finder über Klemme 15 absichern“

**Mitnehmen:** Alles, was im abgestellten Fahrzeug wachen soll, hängt an Dauerplus. Klemme 15 ist für Geräte, die nur beim Fahren gebraucht werden.

#### 10. Welche Komponenten haben keinen festen Einbauort im Fahrzeug? Wähle alle zutreffenden.

`SAM-10` · Mehrfachauswahl · Medium oder Gerät

- **Funk-Handsender** ✓
- **KeyCard** ✓
- **KeyTag** ✓
- **KeyStrap** ✓
- NFC Modul
- Pro-finder
- G.A.S.-pro III

**Auflösung:** Funk-Handsender, KeyCard, KeyTag und KeyStrap sind persönliche Zugangs**medien**. NFC Modul, Pro-finder und G.A.S.-pro III sind Geräte mit genau vorgegebenem Einbauort.

**Falsch gewählt?**

- *NFC Modul mitangekreuzt:* Die verständlichste Verwechslung — KeyCard und NFC Modul gehören zusammen und werden gemeinsam verkauft. Aber das Modul ist die **Lesestelle am Fahrzeug**, die Karte ist das Medium in der Hosentasche.
  <br>↳ bezogen auf: „NFC Modul“

**Mitnehmen:** Diese Trennung — Medium, Lesestelle, Steuergerät — ist die Grundordnung des ganzen Sortiments. Auf USEDOM begegnet sie dir am Display wieder.

---

## FEHMARN — Fehlersuche & Support

| | |
|---|---|
| Fragen | 11 |
| Fragensatz-Version | 4 |
| Art | Erst lesen, dann tauschen |
| Lernziel | Bevor du tauschst, lies. Jedes Gerät sagt, was los ist — über Blinkcode, Ton, Seriennummer, Spannungsverhalten. Tauschen ist die teuerste Form der Diagnose. |

**Quellen im Produktwissen:** `referenz/stoerungsbeseitigung.md`, `_intern/support-fallaufnahme.md`, `produkte/wipro-iii.md`, `produkte/pro-finder.md`, `referenz/mobilfunk-sim.md`

> **Redaktioneller Hinweis (erscheint nicht im Quiz):** Fragenkatalog v4. Das bestehende FehlerQuiz mit sechs Bildfragen läuft separat; FEHMARN ist die anspruchsvollere Supportebene. Neu: konkrete Bedeutung des gelben Blinkens bei 0699-045, strukturierte Fehleranalyse und belastbare Kriterien für Provider/SIM. Vor Einsatz Blinkcode 9×, Spannungsschwellen und Stillstandsbedingung des kill-Befehls fachlich bestätigen.

#### 1. Eine frisch angeschlossene G.A.S.-pro III: Ordne die LED-Signale ihrer Bedeutung zu.

`FEH-06` · Zuordnung · Zustand richtig lesen

| Zuzuordnen | Richtig |
|---|---|
| Blaues Pulsieren, ca. 4 Minuten | Vorheizphase — noch nicht betriebsbereit |
| Grünes helles Pulsieren | Betriebsbereit |
| Gelbes Blinken einer Sensor-LED | Sensorfehler |
| Gelbes Pulsieren beider LEDs | Unterspannung |

**Auflösung:** Die vollständige Sequenz lautet rot → grün → blaues Dauerlicht → ca. 4 Minuten blaues Pulsieren → grünes helles Pulsieren. Erst Grün bestätigt die Betriebsbereitschaft.

**Falsch gewählt?**

- *Blaues Pulsieren als Fehler gelesen:* Führt zum Ausbau eines einwandfreien Geräts. Vier Minuten sind lang, wenn man daneben steht und es nicht weiß.
- *Gelb generell als Unterspannung:* Fast richtig — aber die Unterscheidung liegt darin, **wie viele** LEDs reagieren. Eine LED: Sensorfehler. Beide: Unterspannung.

**Mitnehmen:** Wer die Werkstatt vor dem grünen Zustand verlässt, weiß nicht, ob das Gerät überhaupt bereit geworden ist — **Prinzip 3**. Und: Bei Übertemperatur über 60 °C blinkt das Gerät in allen Farben und meldet das **nicht** über die WiPro III.

#### 2. Nach dem Unscharfschalten blinkt die Status-LED wiederholt 9× mit 5 s Pause. Was war los?

`FEH-01` · Einfachauswahl · Alarmspeicher lesen

- Panikalarm über den Handsender
- **Anti-Jamming-Ereignis — mögliche Funkstörung** ✓
- Auslösung über die Funk-Kabelschleife
- Meldung vom Innenbeleuchtungseingang

**Auflösung:** Der Blinkcode ist die einzige Quelle dafür, was tatsächlich ausgelöst hat.

**Falsch gewählt?**

- *Innenbeleuchtungseingang:* Guter Tipp, falsche Zahl — das ist **11×**. Die beiden liegen im Blinkcode dicht beieinander und werden beim Zählen im Halbdunkel schnell verwechselt. Zweimal zählen lohnt sich.
  <br>↳ bezogen auf: „Meldung vom Innenbeleuchtungseingang“

**Mitnehmen:** Anti-Jamming lässt sich über DIP 7 → ON abschalten. Das macht das Symptom weg, nicht die Ursache — und nimmt der Anlage eine Schutzfunktion. Erst Ort und Zeitpunkt dokumentieren, Störquellen suchen.

#### 3. Bei einem Pro-finder mit der Seriennummer 0699-045 blinkt die Status-LED gelb. Was bedeutet das?

`FEH-03` · Einfachauswahl · Pro-finder 0699-045

- **Die zuletzt beauftragte SMS konnte nicht gesendet werden** ✓
- Der Zielrufnummernspeicher ist leer
- Die GPS-Antenne hat keinen Satellitenempfang
- Die Fahrzeugbatterie liegt unter 12,5 V

**Auflösung:** Ab Seriennummer **0699-045** bedeutet gelbes Blinken: Die letzte SMS konnte nicht versendet werden. Jetzt Tarif/Guthaben, Zielrufnummer, Netz und SIM-Konfiguration prüfen.

**Falsch gewählt?**

- *Bedeutung älterer Geräte übernommen:* Bei älteren Pro-findern kann gelbes Blinken auf den leeren Zielrufnummernspeicher hinweisen. Ab 0699-045 hat derselbe Blinkcode eine andere Bedeutung.
  <br>↳ bezogen auf: „Der Zielrufnummernspeicher ist leer“
- *GPS- mit Mobilfunkfehler verwechselt:* Die gelbe Anzeige dieses Gerätestands bezieht sich auf den fehlgeschlagenen SMS-Versand, nicht auf die Satellitenposition.
  <br>↳ bezogen auf: „Die GPS-Antenne hat keinen Satellitenempfang“

**Mitnehmen:** Der Gerätestand entscheidet über die Bedeutung eines Blinkcodes. Deshalb bei jeder Diagnose zuerst die vollständige Seriennummer aufnehmen.

#### 4. „Seit dem Einbau schaltet mein Original-Fahrzeugschlüssel die Alarmanlage nicht mehr scharf — die Zentralverriegelung geht aber normal.“ Ursache?

`FEH-02` · Einfachauswahl · Kundenanruf

- CAN-High und CAN-Low sind vertauscht
- **DIP 5 steht auf ON — der Replay-Schutz ist aktiv** ✓
- Die Batterie des Fahrzeugschlüssels ist schwach
- Die WiPro-Zentrale ist defekt und muss getauscht werden

**Auflösung:** Genau dieses Bild — ZV funktioniert, Alarmsteuerung nicht — ist das **erwartete** Verhalten bei aktivem Replay-Schutz (wirksam ab SN 0823-014 / SW 5.8).

**Falsch gewählt?**

- *CAN vertauscht:* Technisch gute Idee und der richtige zweite Schritt — aber bei vertauschtem CAN funktioniert typischerweise gar nichts, nicht nur die Alarmsteuerung. Das Symptom ist zu selektiv.
  <br>↳ bezogen auf: „CAN-High und CAN-Low sind vertauscht“
- *Zentrale defekt:* Die teuerste Fehldiagnose im Katalog. Ein Gerät, das teilweise korrekt arbeitet, ist selten defekt — es ist meist konfiguriert.
  <br>↳ bezogen auf: „Die WiPro-Zentrale ist defekt und muss getauscht werden“

**Mitnehmen:** Ist der Schutz gewollt, steuert der Kunde über Handsender, App oder Pro-finder. **Achtung beim Umstellen:** DIP-Schalter nur spannungsfrei ändern — weder der 20-polige Stecker noch der Pro-finder-Stecker dürfen gesteckt sein.

#### 5. Ein Pro-finder sendet eine Spannungswarnung und reagiert danach auf keine SMS mehr. Was ist passiert?

`FEH-04` · Einfachauswahl · Spannung

- Das Modem ist defekt, Gerät einsenden
- **Tiefentladeschutz — das Gerät geht in Standby** ✓
- Die SIM-Karte ist abgelaufen
- Die Sicherung hat ausgelöst und muss neu gesetzt werden

**Auflösung:** Warnung bei ca. **11,2 V**, danach Standby zum Schutz der Batterie. Ab einer Versorgung über ca. **12,5 V** kehrt das Gerät in den Normalbetrieb zurück.

**Falsch gewählt?**

- *Modem defekt, einsenden:* Der teuerste mögliche Weg zum selben Ergebnis — das Gerät kommt geprüft und unverändert zurück. Der entscheidende Hinweis stand im ersten Halbsatz der Frage: Es hat **vorher gewarnt**. Ein defektes Modem warnt nicht, es schweigt einfach.
  <br>↳ bezogen auf: „Das Modem ist defekt, Gerät einsenden“

**Mitnehmen:** Wenn ein Gerät vor dem Ausfall gewarnt hat, hat es meist genau das getan, wofür es gebaut wurde. Erst laden, dann urteilen.

#### 6. Nach einem Sicherungswechsel meldet die WiPro einen offenen Magnetkontakt, obwohl alle Klappen zu sind. Was tust du?

`FEH-07` · Einfachauswahl · Nach Spannungsunterbrechung

- **Alle betroffenen Kontakte mehrmals öffnen und schließen** ✓
- Alle Kontakte löschen und neu anlernen
- Die Zentrale auf Werkseinstellung zurücksetzen
- Die Batterien aller Kontakte tauschen

**Auflösung:** Nach einer Trennung von der Betriebsspannung kennt die Zentrale den Zustand erst wieder, wenn jeder Kontakt einmal gesendet hat.

**Falsch gewählt?**

- *Löschen und neu anlernen:* Führt zum selben Ergebnis — mit erheblich mehr Aufwand und dem zusätzlichen Risiko, dabei einen Kontakt zu vergessen. Genau dieser vergessene Kontakt fällt erst im Ernstfall auf.
  <br>↳ bezogen auf: „Alle Kontakte löschen und neu anlernen“
- *Werkseinstellung:* Löscht auch alles andere, inklusive Handsender und Konfiguration. Ein sehr großer Hammer für ein sehr kleines Problem.
  <br>↳ bezogen auf: „Die Zentrale auf Werkseinstellung zurücksetzen“

**Mitnehmen:** Nach jeder Spannungsunterbrechung: einmal alles auf und zu. Zwei Minuten Arbeit statt einer halben Stunde.

#### 7. Ein Kollege will die G.A.S.-pro III „mal eben mit dem Feuerzeug testen“. Was sagst du?

`FEH-05` · Einfachauswahl · Sicherheitsgrenze

- Kurz und aus 1 m Abstand ist unbedenklich
- **Nicht durchführen — dieser Test ist nicht vorgesehen** ✓
- Nur bei der CO-Variante zulässig
- Nur bei geöffnetem Fenster

**Auflösung:** Wegen des Auswertungsalgorithmus ist ein Anwendertest mit Feuerzeuggas laut Kurzanleitung nicht vorgesehen. Das Gerät führt einen automatischen Sensorselbsttest durch.

**Falsch gewählt?**

- *Kurz und aus Abstand:* Der pragmatische Werkstattreflex — man will dem Kunden ja etwas zeigen. Der Test kann den Sensor beeinflussen und sagt über die tatsächliche Funktion nichts Belastbares aus.
  <br>↳ bezogen auf: „Kurz und aus 1 m Abstand ist unbedenklich“
- *Bei geöffnetem Fenster:* Behandelt es als Belüftungsfrage. Das Problem ist nicht die Gaskonzentration im Raum, sondern was der Sensor daraus macht.
  <br>↳ bezogen auf: „Nur bei geöffnetem Fenster“

**Mitnehmen:** Meldet der Selbsttest einen Fehler, zeigt sich das eindeutig: 1 Ton pro Sekunde und die betroffene Sensor-LED blinkt gelb. Dem Kunden zeigst du den grünen Normalzustand — das ist der Nachweis, den es braucht.

#### 8. „Meine Frau bekommt die Alarm-SMS, ich nie.“ Woran liegt es?

`FEH-09` · Einfachauswahl · Alarmweiterleitung

- **Alarm-SMS werden nacheinander versendet** ✓
- Nur die Masternummer bekommt Alarm-SMS
- Die zweite Nummer muss als Smartphone gekennzeichnet sein
- Es ist immer nur eine Zielrufnummer möglich

**Auflösung:** Der Versand läuft der Reihe nach. Wird ein Testalarm sofort beendet, kommen die späteren Zielrufnummern gar nicht mehr an die Reihe.

**Falsch gewählt?**

- *Nur die Masternummer:* Passt scheinbar perfekt zur Beobachtung — und führt dazu, dass man dem Kunden eine Einschränkung erklärt, die es nicht gibt. Der vermeintliche Fehler entsteht beim Testen selbst.
  <br>↳ bezogen auf: „Nur die Masternummer bekommt Alarm-SMS“

**Mitnehmen:** Einen kontrollierten Test vollständig durchlaufen lassen, dann bekommt jede Nummer ihre SMS. Gehört so auch in die Fahrzeugübergabe — Masternummer zuerst.

#### 9. Ein Fahrzeug wurde gestohlen, eine Abschalteinrichtung ist verbaut. Welcher Befehl ist zulässig?

`FEH-08` · Einfachauswahl · Höchste Sicherheitsstufe

- a an
- a 30
- **kill** ✓
- status genügt

**Auflösung:** **kill** wartet, bis die GPS-Geschwindigkeit mindestens 5 Sekunden durchgehend 0 km/h beträgt, und schaltet erst dann Ausgang A.

**Falsch gewählt?**

- *„a an“ oder „a 30“:* Schalten **ohne** Geschwindigkeitsprüfung. Zur Fahrzeugstilllegung unzulässig — im schlimmsten Fall wird ein fahrendes Fahrzeug abgeschaltet, mit einem Menschen darin und anderen daneben.
  <br>↳ bezogen auf: „a an“ · „a 30“
- *„status“ genügt:* Zu passiv, aber der Reflex ist nicht falsch: Der erste Schritt ist tatsächlich, sich ein Bild zu verschaffen.
  <br>↳ bezogen auf: „status genügt“

**Mitnehmen:** Der richtige Befehl ist nur die halbe Antwort. Diebstahl der Polizei melden, Ortungsdaten dorthin geben — und **nicht selbst zum Fahrzeug fahren**. Am anderen Ende steht kein Kunde, sondern ein Täter. Abschalteinrichtungen: 101283 (einpolig) / 105821 (mehrpolig).

#### 10. Welche Angaben solltest du für eine belastbare Fehleranalyse zusammentragen? Wähle alle zutreffenden.

`FEH-10` · Mehrfachauswahl · Strukturierte Fehleranalyse

- **Vollständige Seriennummern aller beteiligten Komponenten** ✓
- **Fahrzeug, Modelljahr, Aufbauart** ✓
- **Erwartetes und tatsächliches Verhalten sowie die Bedienreihenfolge** ✓
- **LED- und Blinkcode, Signalton, SMS-Wortlaut möglichst wörtlich** ✓
- SIM-PIN und Kundenpasswörter
- Kilometerstand des Fahrzeugs

**Auflösung:** Diese vier Angaben verbinden Gerätestand, Fahrzeugkontext, reproduzierbaren Ablauf und die Eigendiagnose des Systems. Damit lässt sich der Fehler gezielt eingrenzen oder vollständig an den Support übergeben.

**Falsch gewählt?**

- *SIM-PIN mitangekreuzt:* Gut gemeint — man will alles liefern, was helfen könnte. Für die Diagnose wird sie nicht gebraucht, und was nicht im Ticket steht, kann auch nicht abhandenkommen.
  <br>↳ bezogen auf: „SIM-PIN und Kundenpasswörter“
- *Blinkcode weggelassen:* Der wertvollste Einzelhinweis überhaupt. Er sagt, was das Gerät selbst über den Fehler weiß — genau die Information, die aus der Ferne sonst fehlt.
  <br>↳ bezogen auf: „LED- und Blinkcode, Signalton, SMS-Wortlaut möglichst wörtlich“

**Mitnehmen:** Das ist die Insel in einem Satz: Alles, was du vor dem Anruf sammelst, ersetzt drei Rückfragen danach. Und „möglichst wörtlich“ heißt wörtlich — nicht „irgendwas mit gelb“.

#### 11. Welche Kriterien muss ein empfehlenswerter Mobilfunktarif für den Pro-finder erfüllen? Wähle alle zutreffenden.

`FEH-11` · Mehrfachauswahl · Provider & SIM

- **Klassische SMS und Telefonie sind freigeschaltet** ✓
- **Die SIM besitzt eine eindeutig erreichbare eigene Rufnummer** ✓
- **Das Hostnetz bietet am Fahrzeugstandort und in den geplanten Reiseländern passende Abdeckung und Roaming** ✓
- **SIM-Format und PIN-Regel passen zum Gerätestand; die vorbereitete Karte wird im Fahrzeug getestet** ✓
- Ein reiner Datentarif ohne SMS und Telefonie genügt
- Der Markenname des Providers allein garantiert die Kompatibilität dauerhaft

**Auflösung:** Eine belastbare Empfehlung richtet sich nach Diensten, Hostnetz, Einsatzland und Gerätestand. Prepaid und Vertrag sind grundsätzlich möglich; eine starre Providerliste wäre wegen wechselnder Tarife und Netze nicht dauerhaft zuverlässig.

**Falsch gewählt?**

- *Reine Daten-SIM gewählt:* Der Pro-finder steuert und meldet über klassische SMS und Telefonie. Mobile Daten ersetzen diese Dienste nicht.
  <br>↳ bezogen auf: „Ein reiner Datentarif ohne SMS und Telefonie genügt“
- *Nur nach Providernamen entschieden:* Tarife, Hostnetze und Roamingbedingungen ändern sich. Entscheidend ist die konkrete SIM mit ihren Diensten am vorgesehenen Einsatzort.
  <br>↳ bezogen auf: „Der Markenname des Providers allein garantiert die Kompatibilität dauerhaft“

**Mitnehmen:** Empfohlen wird kein Logo, sondern eine nachweislich passende und getestete Verbindung: SMS, Telefonie, erreichbare Rufnummer und geeignetes Netz.

---

## USEDOM — Verkaufsdisplay & Konfigurator

| | |
|---|---|
| Fragen | 10 |
| Fragensatz-Version | 4 |
| Art | Vom Einzelprodukt zum System |
| Lernziel | Wer die vier Ebenen trennt — Zentrale, Fernsteuerung, Lesestelle, Medium —, beantwortet fast jede Kundenfrage von selbst. |

**Quellen im Produktwissen:** `referenz/systemueberblick.md`, `produkte/bt-connect.md`, `produkte/nfc-modul.md`, `referenz/zugang-bedienung.md`

> **Redaktioneller Hinweis (erscheint nicht im Quiz):** Fragenkatalog v4. USEDOM erklärt das Verkaufsdisplay über Kundensituationen statt über reines Produkt-Zuordnen. Produktbilder liegen in Wissen/03_Medien/produkte/ und können USE-04 später visuell ergänzen. Fachlich zu bestätigen: die Artikelnummern 101286 / 101287 in USE-07 und die 94 dB der internen Sirene in USE-06.

#### 1. Ein Kunde zeigt auf BT-connect, Pro-finder und NFC Modul: „Das ist doch dreimal dasselbe — das Fahrzeug ohne Schlüssel bedienen.“ Welche Erklärung trennt die Produkte sauber?

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

- **WiPro III (safe.lock je nach Fahrzeug)** ✓
- **Pro-finder** ✓
- **NFC Modul** ✓
- **KeyCard, KeyTag oder KeyStrap** ✓
- G.A.S.-pro III
- T.S.A. Funk-Rauchmelder

**Auflösung:** Drei Kundenwünsche, drei Bausteine — plus das Zugangsmedium.

**Falsch gewählt?**

- *Zugangsmedium vergessen:* Der häufigste Fehler im Angebot. Das NFC Modul ist nur die Lesestelle — ohne KeyCard, KeyTag oder KeyStrap öffnet niemand etwas. Der Kunde merkt es am Tag der Übergabe.
  <br>↳ bezogen auf: „KeyCard, KeyTag oder KeyStrap“
- *Gaswarner mitangekreuzt:* Sinnvolles Produkt, aber es deckt keinen der drei genannten Wünsche ab. Zusatzverkauf ja — aber nicht in dieser Position.
  <br>↳ bezogen auf: „G.A.S.-pro III“

**Mitnehmen:** Geh die Kundenwünsche einzeln durch und hak sie am Angebot ab. Drei Wünsche, drei Häkchen — plus die Frage: „Womit macht er es auf?“

#### 3. Kunde: „Ich nehme nur das BT-connect, eine Alarmanlage brauche ich nicht.“ Geht das?

`USE-02` · Einfachauswahl · Abhängigkeit

- Geht — BT-connect arbeitet eigenständig
- **Geht nicht — BT-connect setzt eine WiPro III voraus** ✓
- Geht nur zusammen mit dem Pro-finder
- Geht nur zusammen mit dem NFC Modul

**Auflösung:** BT-connect (106000) ist ein Bedienweg, kein eigenes System. Ohne WiPro III bzw. WiPro III safe.lock gibt es nichts zu bedienen.

**Falsch gewählt?**

- *Geht eigenständig:* Der Kunde hört „Bluetooth-Modul fürs Wohnmobil“ und denkt an ein eigenständiges Produkt wie einen Tracker. Der Name legt das nahe — genau deshalb muss die Abhängigkeit aktiv erklärt werden.
  <br>↳ bezogen auf: „Geht — BT-connect arbeitet eigenständig“

**Mitnehmen:** Frag dich bei jedem Zubehör: Ist das ein **Bedienweg** oder ein **System**? Bedienwege brauchen immer etwas, das sie bedienen. Bis zu 9 Geräte lassen sich koppeln, Smartwatch inklusive.

#### 4. Kunde: „Mit BT-connect kann ich also aus dem Restaurant am Hafen mein Wohnmobil scharfschalten?“

`USE-03` · Einfachauswahl · Reichweiten-Falle

- Ja, bis 50 m zuverlässig
- **Nein — BT-connect wirkt nur im Bluetooth-Nahbereich** ✓
- Ja, wenn das Handy im WLAN eingebucht ist
- Ja, sobald safe.lock verbaut ist

**Auflösung:** BT-connect ist ein lokaler Bluetooth-Weg ohne Mobilfunk und GPS. Für die Bedienung aus der Ferne ist der Pro-finder zuständig.

**Falsch gewählt?**

- *Wenn das Handy im WLAN ist:* Klingt modern und plausibel — das Modul hat aber keine Internetverbindung. Das WLAN des Kunden hilft seinem Telefon, nicht dem Fahrzeug.
  <br>↳ bezogen auf: „Ja, wenn das Handy im WLAN eingebucht ist“
- *Ja, bis 50 m:* Die ehrlichste der falschen Antworten, weil sie eine Grenze nennt. Nur ist der Hafen weiter weg als 50 m — und genau darum ging es dem Kunden.
  <br>↳ bezogen auf: „Ja, bis 50 m zuverlässig“

**Mitnehmen:** Diese Erwartung entsteht im Verkaufsgespräch schnell und fällt dem Kunden erst im Urlaub auf. Besser jetzt klarstellen — und den Pro-finder gleich mit anbieten. Aus einem enttäuschten Kunden wird so ein größerer Auftrag.

#### 5. Ein Kunde hat keine WiPro und will nur Gaswarnung. Was zeigst du?

`USE-06` · Einfachauswahl · Gaswarnung ohne Alarmanlage

- G.A.S.-connect — die günstigste Lösung
- **G.A.S.-pro III, G.A.S. oder G.A.S.-plug** ✓
- Ohne WiPro ist keine Gaswarnung möglich
- Nur den externen Zusatzsensor

**Auflösung:** Alle drei arbeiten eigenständig: G.A.S.-pro III mit eigener 94-dB-Sirene, G.A.S. (105700) als Standalone-Gerät, G.A.S.-plug (100042) mobil über den Zigarettenanzünder.

**Falsch gewählt?**

- *G.A.S.-connect:* Der gefährlichste Fehlgriff dieser Insel, weil er über den Preis kommt. G.A.S.-connect (105750) hat **keine eigene Sirene** und ist Funkzubehör für die WiPro III. Als Standalone-Lösung verkauft, warnt es niemanden — der Kunde merkt es nur nie, weil hoffentlich nie etwas passiert.
  <br>↳ bezogen auf: „G.A.S.-connect — die günstigste Lösung“

**Mitnehmen:** Bei Sicherheitsprodukten ist die erste Frage nie der Preis, sondern: **Wer wird gewarnt und wodurch?** Kein eigener Signalgeber heißt: Es braucht etwas anderes, das den Alarm ausgibt.

#### 6. Ein Kunde verliert seinen KeyTag. Was bedeutet das für die übrigen Medien?

`USE-08` · Einfachauswahl · Zugangsmedien verwalten

- Nur der verlorene Tag wird gelöscht
- **Kompletter Tag-Reset — alle Medien müssen neu angelernt werden** ✓
- Der Tag wird über die App gesperrt
- Nichts — verlorene Medien verfallen automatisch

**Auflösung:** Einzelne Medien lassen sich **nicht selektiv löschen**. Bei Verlust ist ein kompletter Reset fällig, danach werden alle übrigen Medien neu angelernt. Insgesamt speicherbar: 14 Medien, die mitgelieferte KeyCard zählt mit.

**Falsch gewählt?**

- *Über die App sperren:* Die Erwartung aus der Smartphone-Welt. Das NFC Modul ist eine autarke Lesestelle ohne Verbindung zur App — es weiß nichts von einem verlorenen Tag.
  <br>↳ bezogen auf: „Der Tag wird über die App gesperrt“
- *Nur den verlorenen löschen:* Wäre komfortabel und ist genau das, was der Kunde annimmt. Wer es zusagt, verspricht etwas, das erst beim Verlust auffliegt.
  <br>↳ bezogen auf: „Nur der verlorene Tag wird gelöscht“

**Mitnehmen:** Sag es bei der Übergabe, nicht beim Verlust. Und: Wer alle Medien ohnehin einmal neu anlernen muss, kauft bei dieser Gelegenheit oft gleich einen zweiten Satz.

#### 7. Kunde: „Der Gaswarner erkennt dann auch Kohlenmonoxid von meiner Heizung?“

`USE-07` · Einfachauswahl · CO-Falle

- Ja, alle G.A.S.-Geräte erkennen CO
- **Nein — Gas- und CO-Erkennung sind getrennte Geräte** ✓
- Ja, sobald das Gerät an der WiPro angebunden ist
- CO wird vom Rauchmelder mit abgedeckt

**Auflösung:** G.A.S.-pro III (101286) und G.A.S.-pro III CO (101287) sind getrennte Geräte; beide Funktionen lassen sich nicht in einem Gerät vereinen. Ohne geeigneten externen CO-Sensor (100433) erkennt die Standardausführung kein CO.

**Falsch gewählt?**

- *Der Rauchmelder deckt es ab:* Der verbreitetste Irrtum überhaupt — auch unter Fachleuten. Rauchmelder erkennen Partikel, CO ist ein geruchloses Gas ohne Rauchentwicklung. Ein Kunde, der sich darauf verlässt, hat keinen Schutz.
  <br>↳ bezogen auf: „CO wird vom Rauchmelder mit abgedeckt“
- *Mit WiPro-Anbindung ja:* Verwechselt Funkanbindung mit Sensorik. Die Anbindung leitet weiter, was der Sensor erkennt — sie erkennt nichts selbst.
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

- *Zu teuer:* Macht aus einer Konstruktionsentscheidung ein Sparargument — und aus einem Vorteil einen Mangel. Der Kunde hört: „Da wurde gespart.“
  <br>↳ bezogen auf: „Bewegungsmelder sind für diese Preisklasse zu teuer“
- *Vollständig fehlalarmfrei:* Verlockend im Verkaufsgespräch und deshalb gefährlich. Diese Zusage ist unzulässig; keine Alarmanlage ist fehlalarmfrei.
  <br>↳ bezogen auf: „Dadurch ist die Anlage vollständig fehlalarmfrei“

**Mitnehmen:** Der zweite Vorteil zieht im Gespräch oft stärker: Die Anlage kann scharf bleiben, **während Personen im Fahrzeug sind** — beim Schlafen auf dem Stellplatz. Das kann keine Anlage mit Bewegungsmelder.

#### 9. Was machst du mit dem Konfigurator-Ergebnis?

`USE-10` · Einfachauswahl · Konfigurator

- Ungeprüft als verbindliche Zusage an den Kunden geben
- **Auf Plausibilität prüfen, dann als PDF für Angebot oder Termin nutzen** ✓
- Nur intern verwenden, nie dem Kunden zeigen
- Zusammen mit den internen Einbauunterlagen aushändigen

**Auflösung:** Der Konfigurator ist ein Werkzeug, keine Freigabe.

**Falsch gewählt?**

- *Ungeprüft als Zusage:* Der Konfigurator kennt das konkrete Fahrzeug nicht. Hupe ohne Zündung, Sleep Mode, Freigabestatus des Modelljahrs — nichts davon steht dort drin. Genau diese Punkte sprengen später das Angebot.
  <br>↳ bezogen auf: „Ungeprüft als verbindliche Zusage an den Kunden geben“
- *Nie dem Kunden zeigen:* Verschenkt ein gutes Verkaufsinstrument. Das PDF macht ein Angebot nachvollziehbar.
  <br>↳ bezogen auf: „Nur intern verwenden, nie dem Kunden zeigen“

**Mitnehmen:** Dein Fahrzeugwissen entscheidet, ob das Ergebnis am konkreten Fahrzeug trägt. Interne Einbauunterlagen gehören nicht in Kundenhand — siehe POEL.

#### 10. Kunde: „Mit der KeyCard schließe ich mein Fahrzeug auf und zu, oder?“

`USE-05` · Einfachauswahl · Die wichtigste Abgrenzung

- Ja, in beiden Richtungen
- **Scharf/Unscharf ja — Zentralverriegelung nur mit safe.lock** ✓
- Nein, die KeyCard kann ausschließlich entriegeln
- Nur in Verbindung mit BT-connect

**Auflösung:** Scharf-/Unscharfschalten und Ver-/Entriegeln sind technisch zwei verschiedene Vorgänge. Die Zentralverriegelung wird nur bei WiPro III safe.lock mit passender Fahrzeuganbindung und geeignetem Softwarestand mitgeführt.

**Falsch gewählt?**

- *Ja, in beiden Richtungen:* Der häufigste Beratungsfehler des gesamten Sortiments. Er entsteht nicht aus Unwissen, sondern aus dem Wunsch, dem Kunden zuzustimmen. Der Preis dafür fällt bei der Übergabe an.
  <br>↳ bezogen auf: „Ja, in beiden Richtungen“
- *Nur mit BT-connect:* Vermischt zwei unabhängige Bedienwege. Sie ergänzen einander, sie bedingen einander nicht.
  <br>↳ bezogen auf: „Nur in Verbindung mit BT-connect“

**Mitnehmen:** **Prinzip 1 — Scharf/Unscharf ≠ Auf/Zu.** Heute ist es dir schon auf VEJRØ begegnet und es kommt auf LANGELAND wieder. Satz für den Kunden: „Die Karte schaltet Ihre Anlage. Ob sie auch die Türen öffnet, hängt davon ab, ob wir safe.lock verbaut haben — schauen wir uns Ihr Fahrzeug an.“

---

## LANGELAND — Fahrzeugannahme & Fahrzeugübergabe

| | |
|---|---|
| Fragen | 10 |
| Fragensatz-Version | 4 |
| Art | Der Prozess vor und nach dem Schraubendreher |
| Lernziel | Ein Fahrzeug vollständig und freigabebewusst annehmen, den Einbau prüfbar dokumentieren und dem Kunden System, Grenzen und Bedienwege sicher übergeben. |

**Quellen im Produktwissen:** `referenz/fahrzeugkompatibilitaet.md`, `produkte/wipro-iii.md`, `referenz/zugang-bedienung.md`, `_intern/support-fallaufnahme.md`

> **Redaktioneller Hinweis (erscheint nicht im Quiz):** Fragenkatalog v4. Die vom Fachreview bestätigten Annahme- und Übergabefragen wurden inhaltlich erhalten und sprachlich auf den vollständigen Werkstattprozess ausgerichtet. Die 60 Sekunden in LAN-04 und der Freigabestand zum Iveco Daily in LAN-03 sind vor jeder Schulung gegen den aktuellen Stand zu prüfen.

#### 1. Ein Kunde bringt sein Fahrzeug zur Erweiterung eines bestehenden Systems. Was gehört zwingend in die Annahme?

`LAN-01` · Einfachauswahl · Annahme, Pflichtangaben

- Fahrzeugmodell, Kundenwunsch und gewünschter Termin
- **Fahrzeugdaten plus Seriennummer und Softwarestand jeder Komponente** ✓
- Artikelnummern der Neuteile und die geplante Einbaudauer
- Kilometerstand, Tankfüllung und Anzahl der Schlüssel

**Auflösung:** Ohne Seriennummer und Softwarestand ist keine belastbare Kompatibilitätsaussage möglich.

**Falsch gewählt?**

- *Modell, Wunsch, Termin:* Reicht für die Terminvergabe und fühlt sich vollständig an. Es fehlt genau die Information, die entscheidet, ob der Einbau überhaupt geht — und die du später nur noch am zerlegten Fahrzeug bekommst.
  <br>↳ bezogen auf: „Fahrzeugmodell, Kundenwunsch und gewünschter Termin“

**Mitnehmen:** Die Seriennummer sitzt nach dem Einbau hinter der Verkleidung. Bei der Annahme kostet sie zwei Minuten, im Supportfall einen halben Tag.

#### 2. Ein Mercedes Sprinter VS30 (Baujahr 2021) soll eine WiPro III bekommen. Welchen Punkt sprichst du schon bei der Annahme an?

`LAN-02` · Einfachauswahl · Risiko früh ansprechen

- Der Sprinter benötigt grundsätzlich safe.lock
- **Die Fahrzeughupe ist ohne Zündung nicht verfügbar** ✓
- Ein Testalarm ist bei diesem Fahrzeug nicht möglich
- Kein Thema — die Hupe funktioniert bei jedem Fahrzeug

**Auflösung:** Je nach Anleitung ist eine Back-up-Sirene (100089) oder Zusatzhupe (105339) nötig — und die gehört ins **Angebot**, nicht auf die Rechnung.

**Falsch gewählt?**

- *Kein Thema:* Betrifft weit mehr Fahrzeuge, als man denkt: alle Sprinter, VW T5 Facelift, T6 und T6.1, alle Crafter/MAN TGE sowie Iveco Daily ab MJ 2019. Wer das nicht auf dem Schirm hat, verkauft regelmäßig Anlagen, die im Ernstfall stumm bleiben.
  <br>↳ bezogen auf: „Kein Thema — die Hupe funktioniert bei jedem Fahrzeug“

**Mitnehmen:** Ein Zusatzteil, das erst auf der Rechnung auftaucht, ist ein Konflikt. Dasselbe Teil im Angebot ist eine Selbstverständlichkeit. Beim VS30 zusätzlich: ILS-LED-Scheinwerfer erfordern einen 220-Ω-Widerstand.

#### 3. Ein Kunde ruft an: „Ich habe einen Iveco Daily, Modelljahr 2026, wann kann ich kommen?“

`LAN-03` · Einfachauswahl · Freigabe-Falle

- Termin zusagen — der Daily ist ein Standardfahrzeug
- **Kein Termin ohne Prüfung — dieses Modelljahr ist nicht freigegeben** ✓
- Termin zusagen und vor Ort improvisieren
- Termin zusagen und den Universalanschluss verwenden

**Auflösung:** Für den Iveco Daily ab Modelljahr 2025/2026 ist wegen BCM-Änderungen derzeit kein Einbau freigegeben (Stand 01/2026).

**Falsch gewählt?**

- *Universalanschluss:* Die klügste der falschen Antworten — es gibt ihn ja wirklich. Er ist aber für ältere Fahrzeuge **ohne** CAN-Bus gedacht, nicht als Notlösung für ein nicht freigegebenes modernes Fahrzeug.
  <br>↳ bezogen auf: „Termin zusagen und den Universalanschluss verwenden“
- *Standardfahrzeug:* Stimmte jahrelang. Genau das macht Freigabe-Fallen gefährlich: Sie treffen die Erfahrenen.
  <br>↳ bezogen auf: „Termin zusagen — der Daily ist ein Standardfahrzeug“

**Mitnehmen:** Ein zugesagter und dann abgesagter Termin kostet mehr Vertrauen als ein ehrliches „das kläre ich und rufe zurück“. Bei neuen Modelljahren gilt Erfahrung nicht — dort gilt nur die aktuelle Freigabe.

#### 4. Fahrerhaustüren sind über den Innenbeleuchtungseingang angebunden, nicht über den CAN-Bus. Wann kannst du den Testalarm durchführen?

`LAN-04` · Einfachauswahl · Testfalle bei der Abnahme

- Sofort nach dem Scharfschalten
- **Frühestens 60 Sekunden nach Aktivierung** ✓
- Erst nach 5 Minuten
- Gar nicht — nur CAN-Türen sind testbar

**Auflösung:** Die Anlage braucht diese Zeit, bevor sie über diesen Eingang auslöst.

**Falsch gewählt?**

- *Sofort:* Der wahrscheinlichste Fehler, weil man am Ende des Einbaus zügig fertig werden will. Ergebnis: Eine korrekt arbeitende Anlage wird für defekt gehalten, und es beginnt eine Fehlersuche, die es nicht braucht.
  <br>↳ bezogen auf: „Sofort nach dem Scharfschalten“
- *Gar nicht testbar:* Wäre bequem, ist aber falsch — und würde bedeuten, das Fahrzeug ungeprüft zu übergeben.
  <br>↳ bezogen auf: „Gar nicht — nur CAN-Türen sind testbar“

**Mitnehmen:** Diese eine Minute ist einer der häufigsten Gründe für einen vermeintlichen Mangel bei der Abnahme. Warten ist hier Teil des Tests — **Prinzip 3**.

#### 5. Fahrzeug mit safe.lock im Campingmodus. Welchen Hinweis gibst du dem Kunden zwingend mit?

`LAN-06` · Einfachauswahl · Campingmodus

- Der Originalschlüssel funktioniert immer als Rückfallebene
- **Im Campingmodus konsequent über den THITRONIK-Bedienweg verriegeln** ✓
- Der Campingmodus muss vor jeder Fahrt deaktiviert werden
- Im Campingmodus ist der Alarm inaktiv

**Auflösung:** Wird mit THITRONIK-Zubehör verriegelt, bleibt der Originalschlüssel als Fallback nutzbar. Umgekehrt gilt das nicht: Wird zuerst mit dem Originalschlüssel verriegelt, kann die spätere Entriegelung über THITRONIK-Zubehör bei bestimmten Fahrzeugen blockiert sein.

**Falsch gewählt?**

- *Originalschlüssel immer als Rückfallebene:* Die vernünftigste Annahme der Welt — und in dieser Richtung falsch. Genau diese Asymmetrie ist der Kern der Frage: Ein Weg führt zurück, der andere nicht.
  <br>↳ bezogen auf: „Der Originalschlüssel funktioniert immer als Rückfallebene“
- *Alarm im Campingmodus inaktiv:* Wäre ein gravierender Sicherheitsirrtum. Der Campingmodus ist eine Zugangslogik, keine Abschaltung.
  <br>↳ bezogen auf: „Im Campingmodus ist der Alarm inaktiv“

**Mitnehmen:** Genau dieser Fall führt zu Anrufen vom Stellplatz — abends, wenn niemand mehr erreichbar ist. Einmal bei der Übergabe erklärt, tritt er nicht auf.

#### 6. Die Zentrale kam aus dem safe.lock-Upgrade zurück und ist wieder eingebaut. Was ist jetzt zwingend?

`LAN-09` · Einfachauswahl · Nach einem safe.lock-Upgrade

- Nur den Master-Handsender neu anlernen
- **Sämtliches Funk-Zubehör neu anlernen — der Speicher wurde gelöscht** ✓
- Nichts — der Speicher bleibt beim Upgrade erhalten
- Nur die Seriennummer in der App aktualisieren

**Auflösung:** Beim Upgrade wird der Speicher geleert.

**Falsch gewählt?**

- *Nur den Handsender:* Der gefährlichste Fehler, weil er sich richtig anfühlt. Die Bedienung funktioniert danach einwandfrei — es fehlen aber sämtliche Magnetkontakte. Und das merkt niemand bis zum Ernstfall.
  <br>↳ bezogen auf: „Nur den Master-Handsender neu anlernen“

**Mitnehmen:** Nach dem Upgrade vollständige Ein- und Ausgangstests inklusive Zentralverriegelung. Wer nur prüft, was er gerade angelernt hat, prüft das Falsche.

#### 7. Der Kunde bedient alles nur über die App. Was empfiehlst du?

`LAN-08` · Einfachauswahl · Backup-Beratung

- Das reicht aus, die App ist zuverlässig
- **Einen zweiten, technisch unabhängigen Bedienweg ergänzen** ✓
- Ein zweites Smartphone koppeln
- Den Originalschlüssel im Fahrzeug deponieren

**Auflösung:** Jeder Bedienweg hat einen Ausfallmodus. Zwei Wege dürfen nicht denselben haben.

**Falsch gewählt?**

- *Zweites Smartphone:* Klingt nach einer echten Redundanz und ist keine. Beide Geräte teilen dieselbe Technik und dieselben Fehlerquellen — deaktiviertes Bluetooth oder eine verlorene Kopplung sperrt beide gleichzeitig.
  <br>↳ bezogen auf: „Ein zweites Smartphone koppeln“
- *Schlüssel im Fahrzeug:* Löst das Zugangsproblem und hebt dafür die gesamte Sicherung auf. Ein sicherer Zugang, der die Anlage sinnlos macht.
  <br>↳ bezogen auf: „Den Originalschlüssel im Fahrzeug deponieren“

**Mitnehmen:** **Prinzip 2 — ein Zugangsweg ist kein Zugangsweg**, und zwei gleichartige sind auch nur einer. Sauberste Lösung: ein zuvor geprüfter Funk-Handsender 868 (101064) — unabhängig vom Smartphone, bis ca. 75 m, CR2032, kein Neuanlernen nach Batteriewechsel.

#### 8. Ein Kunde holt sein Fahrzeug nach Einbau von WiPro III und Pro-finder ab. Was gehört in die Übergabe? Wähle alle zutreffenden.

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

- *DIP-Einstellungen durchgehen:* Gut gemeint und fachlich beeindruckend — aber Werkstattwissen. Es überfordert den Kunden und lädt ihn dazu ein, selbst daran zu drehen. Die DIP-Stellung gehört in **deine** Akte.
  <br>↳ bezogen auf: „Alle DIP-Schaltereinstellungen mit dem Kunden durchgehen“
- *Testalarm weggelassen:* Verständlich, weil laut und unangenehm. Aber ein Kunde, der den Alarm noch nie gehört hat, erkennt ihn im Ernstfall nicht als seinen.
  <br>↳ bezogen auf: „Einen echten Testalarm zeigen, den der Kunde selbst auslöst“

**Mitnehmen:** Der Kunde muss jeden Bedienweg **einmal selbst** ausgeführt haben. Zusehen reicht nicht — was man nicht selbst gemacht hat, kann man abends auf dem Stellplatz nicht.

#### 9. Welche Aussage darfst du bei der Übergabe nicht machen?

`LAN-07` · Einfachauswahl · Erwartungsmanagement

- „Die Anlage meldet Einbruchereignisse akustisch und optisch.“
- **„Damit kann Ihnen niemand mehr ins Fahrzeug einbrechen.“** ✓
- „Nicht abgesicherte Öffnungen bleiben ungeschützt — abgesichert sind X, Y und Z.“
- „Nach einem Alarm bleibt die Überwachung aktiv.“

**Auflösung:** Eine Alarmanlage meldet, sie verhindert nicht. Die Zusage ist inhaltlich falsch und im Schadensfall ein Problem.

**Falsch gewählt?**

- *„Nicht abgesicherte Öffnungen bleiben ungeschützt“:* Klingt nach einem schwachen Verkaufsargument und wird deshalb gern vermieden. Es ist aber die wichtigste Aussage der ganzen Übergabe — und sie schafft Vertrauen, statt es zu kosten.
  <br>↳ bezogen auf: „„Nicht abgesicherte Öffnungen bleiben ungeschützt — abgesichert sind X, Y und Z.““

**Mitnehmen:** Zur Einordnung für den Kunden: Der akustische Alarm läuft ca. 30 Sekunden, der optische ca. 180 Sekunden. Die Anlage macht auf den Vorgang aufmerksam — sie hält niemanden auf. Wer das sagt, wird nach einem Schaden nicht zum Beklagten.

#### 10. Was gehört nach der Übergabe in die Akte? Wähle alle zutreffenden.

`LAN-10` · Mehrfachauswahl · Dokumentation

- **Verbaute Produkte mit Artikel- und Seriennummern** ✓
- **Softwarestände und ein Foto der DIP-Stellung** ✓
- **Fahrzeugdaten sowie Einbaudatum** ✓
- **Durchgeführte Tests und deren Ergebnis** ✓
- Nur die Rechnungsnummer
- Die SIM-PIN des Kunden

**Auflösung:** Diese vier Blöcke sind genau die Angaben, die FEHMARN im Supportfall verlangt. Wer sie jetzt notiert, hat sie dann.

**Falsch gewählt?**

- *Tests weggelassen:* Der am leichtesten übersehene Punkt. Ohne Testdokumentation lässt sich später nicht unterscheiden, ob etwas nie funktioniert hat oder erst später ausgefallen ist — und genau daran hängt die Frage, wer den nächsten Termin zahlt.
  <br>↳ bezogen auf: „Durchgeführte Tests und deren Ergebnis“
- *Nur die Rechnungsnummer:* Trägt keinen einzigen Supportfall.
  <br>↳ bezogen auf: „Nur die Rechnungsnummer“

**Mitnehmen:** Das **Foto der DIP-Stellung** ist der am häufigsten vergessene und im Supportfall wertvollste Teil der Dokumentation — es beantwortet in zwei Sekunden eine Frage, die sonst eine Demontage kostet. Damit schließt sich der Kreis: Deine Akte von heute ist die Fallaufnahme von FEHMARN in zwei Jahren.

