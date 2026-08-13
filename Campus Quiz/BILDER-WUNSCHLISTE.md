# Bilder-Wunschliste — alle Inseln

Kompakte Übersicht: was gebraucht wird, wie dringend, und **was sich generieren
lässt und was nicht**. Ausführlich für Hiddensee in
[`FOTOLISTE-HIDDENSEE.md`](FOTOLISTE-HIDDENSEE.md).

Ablage: `public/media/<insel>/`, Namen wie `hid-01-a.webp`. Format hochkant 3:4,
als WebP unter 150 KB. `node tools/check-fragen.js` prüft Pfad, Alt-Text und Größe.

---

## Zum Generieren — die Grenze

Ein generiertes Bild erfindet genau die Details, die eine Montagefrage prüft.
Ein Modell, das einen „Funk-Magnetkontakt an einer Aufbautür" zeichnet, erfindet
Gehäuseform, LED-Lage und Abstand — und der Händler lernt eine Montage, die es
nicht gibt. Bei sicherheitsrelevanten Inhalten (Gaswarner, Alarmanlage) trägt
das weiter, als es aussieht.

Deshalb in den Tabellen unten:

| Markierung | Bedeutung |
|---|---|
| **Echt** | Muss ein echtes Foto sein. Die Frage prüft genau das, was ein Modell erfinden würde. |
| **Generierbar** | Schematisch, illustrativ oder ein Motiv ohne THITRONIK-Detail. Generieren ist hier unbedenklich. |
| **Vorhanden** | Liegt schon im Projekt, nur umrechnen oder verschieben. |

Ein Mittelweg, der gut funktioniert: **echtes Foto plus generierte Markierung.**
Ein Werkstattfoto aufnehmen und die vier Kandidatenpositionen als Kreise
darüberlegen — das ist bei SAMSØ ohnehin der vorgesehene Fragetyp.

---

## HIDDENSEE — Magnetkontakt & Adapter · höchste Priorität

| Frage | Bilder | Art |
|---|---|---|
| Platinenlage: Sende-LED richtig / verkehrt / Batterie verkantet / Deckel offen | 4 | **Echt** |
| Sender/Magnet an der Tür: 4 Anordnungen, Tür halb geöffnet | 4 | **Echt** |
| Heckgarage: direkt auf Metall / mit Adapter / zweiter Kontakt / Adapter verkantet | 4 | **Echt** |
| Abstand: Spalt mit Messmittel, ca. 10 / 20 / 28 / 40 mm | 4 | **Echt** |
| Standard gegen wasserdicht | 2 | **Vorhanden** (`03_Medien/produkte/`) |
| Adapter erkennen: Magnetkontakt- gegen T.S.A.-Adapter | 2 | **Vorhanden** |

Details und Aufnahmehinweise in der Fotoliste.

---

## SAMSØ — Einbauorte · zweithöchste Priorität

| Frage | Bilder | Art |
|---|---|---|
| Einbauort G.A.S.: bodennah / Kleiderschrank / mittig an Lüftung / Bedienkonsole | 4 | **Vorhanden** — aus dem Fehmarn-Quiz gehoben, siehe unten |
| Einbauort Pro-finder: 4 Varianten | 4 | **Vorhanden** — ebenso |
| Fahrzeuginnenraum mit 4 markierten Positionen, Frage je Komponente | 1–3 | **Echt + generierte Markierung** |
| GPS-Antenne: Empfangsseite oben / senkrecht / nach unten / verdeckt | 4 | **Echt** |
| NFC Modul an der Scheibe: geeignet / beheizbare Frontscheibe / außen / im Schrank | 4 | **Echt** |
| T.S.A. an Stoffdecke: direkt geklebt / mit Adapter seitlich / geschraubt / in der Ecke | 4 | **Echt** |
| CO gegen Flüssiggas: Schnittbild, wo sich welches Gas sammelt | 1 | **Generierbar** — reine Schemazeichnung |

Der Innenraum mit markierten Positionen ist der stärkste Kandidat: ein echtes
Foto pro Basisfahrzeug, die Kandidatenpositionen als nummerierte Kreise
darübergelegt. Ein Foto trägt dann mehrere Fragen.

---

## USEDOM — Verkaufsdisplay & Konfigurator

| Frage | Bilder | Art |
|---|---|---|
| Komponenten am Display erkennen (WiPro III, Pro-finder, BT-connect, NFC Modul, G.A.S.-pro III …) | je 1 | **Vorhanden** — 34 Freisteller in `03_Medien/produkte/` |
| Das Verkaufsdisplay als Ganzes, Gruppen erkennbar | 1 | **Echt** — steht beim Händler |
| Konfigurator: Bildschirmfoto eines Ergebnisses | 1 | **Echt** — Bildschirmfoto, keine Kundendaten drauf |

Am schnellsten umzusetzen: die Freisteller liegen bereits vor. Nur von je gut
2 MB auf WebP unter 150 KB bringen.

---

## VEJRØ — CampLock / VanLock

| Frage | Bilder | Art |
|---|---|---|
| CampLock gegen VanLock am Bild unterscheiden | 2 | **Vorhanden** (`CampLock Fingerprint.png`, `VanLock Fingerprint.png`) |
| Artikelnummern-Zuordnung silber/schwarz | 4 | **Echt** — die Farbvarianten fehlen im Bestand |
| Hartal-Aufbautür gegen Kastenwagentür | 2 | **Echt** |

---

## FEHMARN — Fehlersuche

| Frage | Bilder | Art |
|---|---|---|
| CR2032: Panasonic gegen andere Hersteller | 4 | **Vorhanden** — aus dem bestehenden Quiz |
| Status-LED-Blinkcodes | 4 | **Generierbar** — schematische LED-Darstellung, kein Produktdetail |
| G.A.S.-pro III Vorheizphase blau gegen Normalzustand grün | 2 | **Echt** — Farbe und Pulsieren am echten Gerät |
| DIP-Schalterstellung ablesen | 2–4 | **Echt** — genau das soll gelernt werden |

---

## LANGELAND — Annahme & Übergabe

| Frage | Bilder | Art |
|---|---|---|
| Was gehört ins Annahmeprotokoll | 1 | **Generierbar** — Formularausschnitt, keine echten Kundendaten |
| Seriennummernschild: wo steht was | 1–2 | **Echt** — die Positionen sind gerätespezifisch |
| Sleep-Mode-Test / Camper Mode Ablauf | je 4 | **Vorhanden** — im bestehenden Fehmarn-Quiz |

---

## POEL — Händlerbereich

| Frage | Bilder | Art |
|---|---|---|
| Bildschirmfotos der Rubriken (Downloads, FAQ, Konfigurator, Händlerfinder) | 4–6 | **Echt** — Bildschirmfotos der echten Seite |

Generieren wäre hier besonders falsch: Die Insel lehrt, sich auf der *echten*
Website zurechtzufinden. Ein erfundener Screenshot lehrt eine Navigation, die
es nicht gibt. Erst aufnehmen, wenn die Login-Navigation gegengeprüft ist —
siehe offener Punkt 3 im README.

---

## Was schon aus dem Bestand gehoben ist

Beim Analysieren wurden alle 25 Bilder aus dem laufenden Fehmarn-Quiz
extrahiert. Geprüft und brauchbar:

| Herkunft | Motiv | Verwendung |
|---|---|---|
| Fehmarn Q01 | 4 Fotos Einbauort Gaswarner | **übernommen nach SAMSØ** |
| Fehmarn Q03 | 4 Fotos Einbauort Pro-finder | **übernommen nach SAMSØ** |
| Fehmarn Q04 | 4 Produktfotos CR2032 | für FEHMARN nutzbar |
| Fehmarn Q05/Q06 | je 4 Ablaufbilder | für LANGELAND nutzbar |
| Fehmarn Q02 | 4 Fotos | **nicht nutzbar** — drei zeigen Alarmaufkleber, nicht den Magnetkontakt |

Die Bilder aus Q01 und Q03 sind bereits eingebunden. Ihre Alt-Texte wurden neu
geschrieben: im Bestandsquiz sind die Q01-Beschreibungen um eine Position
verrutscht (siehe README, offener Punkt 5a).
