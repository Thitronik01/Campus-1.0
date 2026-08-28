# Support-Korrekturen — Meeting 27.08.2026

Mitschrift von Max Behrens, strukturiert und gegen das Wiki abgeglichen (2026-08-28).
**Diese Korrekturen haben Vorrang vor dem Fragenkatalog.** Bei markierten Konflikten
mit dem Wiki gilt: Support-Stand für das Quiz übernehmen, Konfliktvermerk stehen lassen,
bis die Anleitungslage geklärt ist.

Legende: ✅ = vom Wiki bestätigt/konsistent · ➕ = neues Support-Wissen (nicht im Wiki) · ⚠️ = Konflikt mit Wiki

---

## Insel SAMSØ — Einbauorte

### S1 ➕ NFC Modul: konkrete Platzierungsempfehlung
**Support:** Das NFC Modul unter der Umweltplakette an der Frontscheibe platzieren.
**Wiki:** „im trockenen Fahrzeuginnenraum an der Innenseite einer geeigneten Scheibe …
von außen unmittelbar vor die Lesestelle gehalten werden kann" (`nfc-modul.md`).
**Bewertung:** Konsistent — der Support konkretisiert den Wiki-Grundsatz. Die Umweltplakette
markiert eine erlaubte, nicht metallbedampfte Zone und kaschiert das Modul optisch.
→ In die Auflösung von SAMSØ 6 aufnehmen.

### S2 ✅ Montageadapter (T.S.A. Rauchmelder): Wandmontage
**Support:** Den Montageadapter am besten an einer Wand kleben, schrauben bzw. montieren.
**Wiki:** „den passenden Montageadapter verwenden und den Rauchmelder an einem seitlichen
Kunststoffelement nahe der Decke befestigen" (Adapter 105755 weiß / 105756 grau).
**Bewertung:** Konsistent. Für die Auflösung von SAMSØ 7 beide Präzisierungen kombinieren:
Wandmontage **nahe der Decke**, am seitlichen Kunststoffelement.

### S3 ➕ Neue Frage: Pro-Finder im VW Crafter
**Support:** Gute Einbauort-Frage — beim VW Crafter wird der Pro-Finder **hinter dem Tacho
(Kombiinstrument)** eingesetzt.
**Wiki:** Nicht dokumentiert; die Crafter-Artikel nennen keinen konkreten Pro-Finder-Einbauort.
Allgemeine Pro-Finder-Regeln (trockener Innenraum, nicht Motorraum, Oberseite nach oben, wenig
Metallabschirmung) sind mit „hinter dem Tacho" vereinbar.
→ Als neue SAMSØ-Frage aufnehmen; Quelle: Support-Meeting 2026-08-27.

### S4 ✅ WiPro-Frage: Begründung ergänzen
**Support:** Die WiPro darf nicht durch Metall abgeschirmt werden, weil sonst die Verbindung zu
den Funk-Einheiten (z. B. Funk-Magnetkontakt) instabil bzw. fehleranfällig wird (Fehlalarm).
**Wiki:** „keine unmittelbare Metallabschirmung von Antenne und Funkstrecke"; Störtabelle:
„Abschirmung durch Metall → Lage der Zentrale/Antenne ändern".
**Bewertung:** Bestätigt. → Die Kausalkette (Metall → instabile Funkstrecke → Fehlauslösung/
ausbleibender Alarm) explizit in die Auflösung von SAMSØ 4 schreiben.

### S5 ⚠️ „Der Einbauort Gaswarner ist für CO" — mehrdeutig, Rückfrage nötig
**Support-Mitschrift:** „Der Einbau Ort Gaswarner ist für CO."
**Wiki-Physik (eindeutig):** G.A.S.-pro III (Propan/Butan/KO-Gase) → senkrecht, ca. 10–20 cm
**über dem Boden**; G.A.S.-pro III CO → senkrecht, ca. 10–20 cm **unter der Decke**.
**Problem:** Wenn das Foto in SAMSØ 2 den bodennah am Sitzkasten montierten Warner zeigt, ist
das die Flüssiggas-Variante — nicht CO. Möglich ist auch: Die Frage soll auf die CO-Variante
umgestellt werden, dann braucht sie ein deckennahes Bild.
→ **Vor der Änderung bei Max klären**, welche Variante die Frage künftig zeigen soll.
Die Höhenregeln selbst sind unstrittig.

### S6 ➕ GPS-Antenne (extern, Pro-Finder): Aufkleber nach unten
**Support:** Bei der Frage zur externen GPS-Antenne fehlt die Ausrichtung: Der **Aufkleber muss
nach unten zeigen** — anders als beim Pro-Finder selbst (dort zeigt „GPS inside" nach oben).
**Wiki:** „Empfangsseite waagerecht nach oben ausrichten" — konsistent (Aufkleber unten =
Empfangsseite oben). Der Aufkleber-Merksatz ist neu und werkstatttauglicher.
→ In SAMSØ 9 aufnehmen; den Kontrast Pro-Finder (Aufkleber oben) vs. externe Antenne
(Aufkleber unten) als Merkhilfe ausformulieren. Wiki-Zusatz nicht vergessen:
Initialisierungsanweisung der Gerätegeneration beachten.

### S7 ✅ Frage „fester Einbauort" umformulieren
**Support:** Die Frage „Welche Komponenten besitzen keinen festen Einbauort?" ändern zu
„…keinen **funktional vorgegebenen Installationsort**".
**Bewertung:** Sprachlich präziser — Handsender/KeyCard/KeyTag/KeyStrap haben keinen Ort,
weil ihre Funktion keinen vorgibt. → SAMSØ 10 umformulieren, Antwortset bleibt.

### S8 🗑️ Pin-10-Frage streichen
**Support:** Die Frage zur weißen Antennenleitung an Pin 10 (SAMSØ 5) kann raus.
→ Aus dem Fragensatz entfernen. Der Fakt selbst bleibt korrekt („Nicht kürzen oder
aufwickeln!", `wipro-iii.md`) und kann in einer Auflösung weiterleben.

---

## Insel FEHMARN — Fehlersuche & Support

### F1 ⚠️ Rückkehrschwelle Pro-Finder: 12 V statt 12,5 V
**Support:** Der Normalbetrieb kehrt nicht bei 12,5 V zurück, sondern bei **12 V**.
**Wiki (6 Fundstellen):** „Nach dem Laden und einer Versorgung **über 12,5 V** kehrt er in den
Normalbetrieb zurück" (`pro-finder.md`, `faq-master.md`, `stoerungsbeseitigung.md`).
**Konflikt.** Für das Quiz den Support-Wert 12 V übernehmen; Vermerk stehen lassen und die
Wiki-Angabe von THITRONIK bestätigen/korrigieren lassen. (Unstrittig daneben: Warn-SMS bei
11,2 V, danach Standby/Tiefentladeschutz.)

### F2 ⚠️ Feuerzeugtest: laut Support erlaubt
**Support:** Ein Feuerzeugtest ist bei uns **erlaubt** — die bisherige Quizantwort („Nein —
dieser Test ist nicht vorgesehen") sei falsch.
**Wiki/Anleitungen:** „Anwender-Funktionstest mit Prüfgas: nicht vorgesehen; kein Feuerzeuggas
verwenden" · „Eine Vor-Ort-Funktionsprüfung durch Feuerzeuggas oder anderes Prüfgas ist laut
beiden Kurzanleitungen wegen des Auswertungsalgorithmus nicht möglich" (`gas-pro-iii.md`).
Beim älteren G.A.S.-pro beschreibt das Handbuch dagegen einen Test der KO-/Flaschengassensoren.
Für den **CO-Sensor** gilt in jedem Fall: niemals mit Feuerzeuggas/Propan/Butan testen.
**Konflikt.** Mögliche Auflösung: Der Support meint den Flüssiggas-Sensortest (ggf. am
G.A.S.-pro oder als internes Werkstattverfahren), die Anleitung den Anwendertest. → Frage
FEHMARN 7 bis zur Klärung entweder streichen oder auf den unstrittigen Kern drehen
(„Darf der **CO-Sensor** mit Feuerzeuggas getestet werden? → Nein").

### F3 ➕ Blinkcodes G.A.S.-pro III / Magenta
**Support:** Blinkcodes der G.A.S.-pro III ansehen — wann leuchtet magenta?
**Wiki-Stand (vollständige LED-Tabelle, `gas-pro-iii.md`):**
- Einschaltphase: rot, grün, kurz blaues Dauerlicht (steigende Tonfolge)
- Vorheizphase: ca. 4 Minuten blau pulsierend
- Normalbetrieb DIP 2 OFF: hellgrün pulsierend · DIP 2 ON: konstant grün, gedimmt
- Gas-/CO-Alarm: betroffene LED schnell rot blitzend
- Sensorfehler: Sensor-LED gelb blinkend, ein Ton pro Sekunde
- Unterspannung: beide LEDs gelb pulsierend, 3× drei Töne, dann Abschaltung
- **Übertemperatur (> 60 °C): beide LEDs wiederholt rot, grün, MAGENTA, blau, gelb, türkis** —
  auf-/abschwellender Dauerton; keine Meldung über die WiPro III
- Ausschalten: blau, grün, rot (fallende Tonfolge)
**Antwort:** Magenta erscheint laut Wiki **nur innerhalb der Übertemperatur-Farbsequenz**.
Ein eigenständiges Magenta-Signal ist nicht dokumentiert — falls der Support eines kennt,
Wiki ergänzen lassen. → Gute neue FEHMARN-Frage: „In der mehrfarbigen Sequenz mit Magenta —
was meldet das Gerät?" (Übertemperatur, kein Gasalarm, keine WiPro-Meldung).

### F4 ➕ „Meine Frau bekommt keine Alarm-SMS"
**Support:** Richtige Antwort: **Die zweite Nummer muss als Smartphone gekennzeichnet sein.**
**Wiki:** Die Smartphone-Kennzeichnung ist belegt für die GPS-Position als Kartenlink
(`pro-finder.md`). Als zweiter Mechanismus ist belegt: „Der Pro-Finder versendet Alarm-SMS
nacheinander. Wird der Alarm schnell unscharf geschaltet, können später gespeicherte
Zielrufnummern unbenachrichtigt bleiben" (`app-befehle.md`).
→ Support-Antwort als richtige Lösung übernehmen; den sequenziellen Versand als zweiten
Lernpunkt (oder Distraktor-Erklärung) in die Auflösung nehmen. Wiki-Ergänzung zur
Smartphone-Kennzeichnung bei Alarm-SMS empfehlen.

### F5 🗑️ Frage mit dem Originalfahrzeugschlüssel streichen
**Support:** Die Frage (FEHMARN 4: Originalschlüssel schaltet nicht mehr scharf → DIP 5/
Replay-Schutz) kann raus.
→ Aus dem Fragensatz entfernen. Fachlich war sie korrekt (DIP 5 → ON ab SN 0823-014 / SW 5.8);
der Fakt kann in einer anderen Auflösung weiterverwendet werden.

---

## Zusammenfassung der Katalog-Änderungen

| Insel | Aktion | Frage |
|---|---|---|
| SAMSØ | Streichen | Pin 10 / Antennenleitung (Nr. 5) |
| SAMSØ | Umformulieren | „fester Einbauort" → „funktional vorgegebener Installationsort" (Nr. 10) |
| SAMSØ | Ergänzen | NFC unter Umweltplakette (Nr. 6) · Adapter-Wandmontage (Nr. 7) · Metall-Kausalkette (Nr. 4) · Aufkleber-Regel GPS-Antenne (Nr. 9) |
| SAMSØ | Neu | Pro-Finder VW Crafter: hinter dem Tacho |
| SAMSØ | Klären | Gaswarner-Bildfrage: Flüssiggas- oder CO-Variante? (Nr. 2) |
| FEHMARN | Streichen | Originalschlüssel/DIP 5 (Nr. 4) |
| FEHMARN | Ändern (Konflikt offen) | Feuerzeugtest (Nr. 7) · 12,5 V → 12 V (Tiefentladeschutz-Kontext) |
| FEHMARN | Ändern | Alarm-SMS zweite Nummer → Smartphone-Kennzeichnung |
| FEHMARN | Neu | Magenta-Sequenz = Übertemperatur |

Nach den Streichungen/Neuaufnahmen die Fragenzahlen und Zeitangaben der Inseln sowie die
Gesamtzahl (73) im Katalog-Kopf aktualisieren.
