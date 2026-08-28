# Prüfbericht: Campus-1.0-Fragenkatalog gegen THITRONIK-Wiki

Stand: 2026-08-28 · Quelle: 82 deutsche Wiki-Artikel (`wissen-de/`)
Hinweis: Wo dieser Bericht dem Dokument `02_SUPPORT-KORREKTUREN_2026-08-27.md` widerspricht,
gilt das Support-Dokument (es ist neuer und hat Vorrang).

**Gesamtergebnis:** Fachlich sehr solide. Keine der geprüften Aussagen ist sachlich falsch.
5 Punkte mit echtem Risiko, 14 Präzisierungen, eine systematische Terminologieabweichung.

---

## A. Fünf Punkte mit echtem Risiko

### A1 — „V002+" existiert im Wiki nicht (VEJRØ 9, POEL 6)
Suche über alle 893 Wiki-Dateien: **0 Treffer für „V002"**. Der Anleitungsindex (82 Einträge)
enthält keine einzige CampLock-/VanLock-Anleitung — nur safe.lock-Dokumente. Beide Fragen
stützen sich auf einen Revisionsstand, den die Wissensbasis nicht kennt. Entweder Wiki
nachziehen oder Fragen auf belegtes Wissen umstellen.

### A2 — VEJRØ 9 ist logisch mehrdeutig
„…trifft auf eine WiPro III ohne safe.lock. Darf **die Funktion** zugesagt werden? → Nein."
Welche Funktion? Das Wiki trennt sauber: „Scharf/Unscharf ist mit WiPro III möglich;
Ver-/Entriegeln setzt WiPro III safe.lock und eine passende Zentralverriegelungs-Anbindung
voraus" (`camplock-fingerprint.md`, wortgleich `vanlock-fingerprint.md`). Ein pauschales
„Nein" ist irreführend — Scharf-/Unscharfschalten funktioniert. Frage schärfen auf:
„Darf die **Bedienung der Zentralverriegelung** zugesagt werden?"

### A3 — LANGELAND 3 nennt nur 2026, das Wiki sperrt ab 2025
Wiki: „Iveco Daily **ab Modelljahr 2025/2026** — derzeit kein freigegebener Einbau **wegen
BCM-Änderungen**. Stand Januar 2026" (`fahrzeugkompatibilitaet.md`). Wer nur „2026 gesperrt"
lernt, nimmt einen 2025er an. Auflösung nicht selbstbezüglich formulieren („im aktuellen
Fragenstand…"), sondern mit Grund und Datum.

### A4 — LANGELAND 2 ist kein Sprinter-Spezifikum
Wiki führt eine Liste: „Fahrzeughupe ohne Zündung nicht verfügbar — u. a. Sprinter,
VW T5 Facelift/T6/T6.1, Crafter/MAN TGE und Iveco Daily ab Modelljahr 2019." Technischer
Grund: „kein Dauerplus bei ausgeschalteter Zündung"; Abhilfe: Zusatzsirene Art. 100190 oder
Back-up Sirene Art. 100089 (`mercedes-sprinter-vs30.md`). Annahme-Punkt: Die Zusatzsirene
muss vor dem Termin im Angebot stehen.

### A5 — VEJRØ 8: „Handschuhe" ist nicht belegt
Wiki nennt als Fingerprint-Grenze nur: „Nasse, verschmutzte oder **verletzte** Finger können
Erkennung erschweren." Handschuhe sind plausibel, stehen aber nirgends. Wiki ergänzen oder
auf die belegte Formulierung wechseln.

---

## B. Präzisierungen, die den Lernwert heben

| # | Frage | Befund |
|---|---|---|
| B1 | HIDDENSEE 2 (22 vs. 25 mm) | Der Konflikt gilt nur für die **Standardausführung**. Wasserdicht: 22 mm harte Vorgabe. Wiki-Warnung: Vorgaben der Varianten nicht vermischen. Variante in der Frage nennen. |
| B2 | FEHMARN 1 (grün = bereit) | Nur bei DIP 2 OFF „hellgrün pulsierend"; DIP 2 ON = „konstant grün, gedimmt". |
| B3 | FEHMARN 4 (DIP 5) | Wirkt erst ab SN 0823-014 / SW 5.8. *(Frage lt. Support gestrichen — Fakt bleibt nützlich.)* |
| B4 | FEHMARN 3 (0699-045 gelb) | Kontrast explizit machen: bis 0699-044 = „Zielrufnummernspeicher leer", ab 0699-045 = „letzte SMS nicht gesendet". „Gelbes Blinken bedeutet vor und ab 0699-045 etwas anderes." |
| B5 | FEHMARN 5 (Tiefentladeschutz) | Warn-SMS bei 11,2 V, danach Standby. Rückkehrschwelle: siehe Konflikt F1 im Support-Dokument. |
| B6 | FEHMARN 6 (offener Kontakt) | Wiki: „**Alle** Kontakte mehrmals öffnen und schließen" — nicht nur „betroffene". |
| B7 | FEHMARN 8 (zweite Nummer später) | Der Praxispunkt ist „gar nicht": bei schnellem Unscharfschalten bleiben spätere Nummern unbenachrichtigt. *(Siehe auch Support F4: Smartphone-Kennzeichnung.)* |
| B8 | FEHMARN 9 (Übertemperatur) | Zusatz: bei Übertemperatur **keine Meldung über die WiPro III** — der Kunde merkt nichts. |
| B9 | SAMSØ 8 (7,4-m-Liner) | Wiki-Schwelle: **6,5 m Innenlänge**. Und: „zusätzlichen **passenden** Sensor / Detektionspunkt" — nicht spezifisch CO. |
| B10 | SAMSØ 7 (Stoffdecke) | Montageort ergänzen: seitliches Kunststoffelement nahe der Decke; Adapter 105755 (weiß) / 105756 (grau). |
| B11 | SAMSØ 9 (GPS-Antenne) | Zusatz: Initialisierungsanweisung der Gerätegeneration beachten. *(Plus Support S6: Aufkleber nach unten.)* |
| B12 | USEDOM 8 (keine Bewegungsmelder) | Zweiter Grund: Anlage muss beim Aufenthalt im Fahrzeug nicht teilabgeschaltet werden. Warnsatz: „vollständig fehlalarmfrei" darf nicht abgeleitet werden. |
| B13 | USEDOM 10 (KeyCard) | „KeyCard ist kein eigenständiger Sender und funktioniert nur am NFC Modul." |
| B14 | LANGELAND 5 (Campingmodus) | Konsequenz ergänzen: „Wird zuerst mit dem Originalschlüssel verriegelt, kann die spätere Entriegelung mit THITRONIK-Zubehör blockiert sein." |

Kleinere Schärfungen: USEDOM 7 — „getrennte Geräte" → getrennte **Sensoren mit
unterschiedlichen Einbauorten** („der CO-Sensor erkennt kein Propan, Butan oder KO-Gas").
USEDOM 4 — Wert 50 m Freifeld nennen. SAMSØ 6 — Ausschluss: dicke, mehrwandige oder
metallbedampfte Scheiben.

---

## C. Bestätigt korrekt (keine Änderung nötig)

**VEJRØ:** CampLock = Hartal-Aufbautüren, VanLock = ohne (1) · wasserdicht: Gehäusepfeile +
≤ 22 mm (2) · Art. 106020 / IP67 (3) · Sendeeinheit trocken, Sensor am tiefen Punkt (4) ·
Testreihenfolge Wassermelder exakt nach Wiki (5) · Wassermelder ist Funk-Zubehör, kein
Standalone-Warner (7).

**HIDDENSEE:** Platine falsch herum / Sende-LED zum Magneten (1) · > 30 mm = offen,
wasserdicht (3) · alle vier Zuordnungen inkl. Adapter 100428/100729 = Standard, V4A =
wasserdicht (4) · Sender an Rahmen, Magnet an Türblatt (7) · Klebepads nicht unter 15 °C (9) ·
Reihenfolge anlernen → Reichweitentest → kleben → Testalarm (10) · Prüfpunkte vor dem
Verpressen (11) · Crimp-Merkmale (12).

**SAMSØ:** alle vier Gerätezuordnungen, 10–20 cm über Boden / unter Decke (1) · Pro-Finder-
Oberseite nach oben (3) · WiPro-Einbauort (4) · NFC innen an der Scheibe (6).

**FEHMARN:** 9× Blinken = Störsender/Jamming (2) · Diagnose-Pflichtangaben (10).

**USEDOM:** Rollentrennung BT-connect / Pro-Finder / NFC Modul (1) · Systemzusammenstellung (2)
· BT-connect setzt WiPro III voraus (3) · kein Fernzugriff außerhalb Bluetooth (4).

**LANGELAND:** Testalarm frühestens 60 Sekunden nach Aktivierung bei Innenbeleuchtungseingang,
wörtlich belegt (4) · Masternummer zuerst (8) · Dokumentationsumfang (10).

---

## D. Wiki-Wissen ohne Frage — Kandidaten für den Ausbau

1. NFC Modul darf nicht als erstes Funk-Zubehör angelernt werden (zuerst Funk-Handsender 868 als Master).
2. Aderendhülsen-Falle: G.A.S.-pro **mit**, G.A.S.-pro III **ohne** Aderendhülsen; Enden nicht verzinnen.
3. CO-Sensoren haben ein Verfallsdatum („Exp. Date"), Austausch nur durch THITRONIK, kostenpflichtig.
4. WiPro III speichert maximal 100 Funksender (geteilter Speicher).
5. Niederbatterie-Signatur: ~2 s Signalton + rote Sende-LED ~30 s (< 2,6 V).
6. Geofencing: ~1 km Radius, `fence aus` vor Hallenparken (GPS-Reflexionen).
7. Vent-check (kanonischer Begriff, toleriertes Offenlassen beim Scharfschalten).
8. IGN/Klemme 15 schaltet die G.A.S.-pro III stumm — Alarm nur noch über LEDs.
9. Blinkcode 11× = Innenbeleuchtungseingang.
10. Pause-Modus 60 Minuten; sehr hohe CO-Konzentration hat Vorrang vor der Stummschaltung.
11. *(Support 27.08.)* Pro-Finder im VW Crafter: hinter dem Tacho.
12. *(Support 27.08.)* Magenta-Sequenz = Übertemperatur.

---

## E. Hinweise zur Wissensbasis selbst

**Widerspruch Magnetkontakt-Abstände:** Master-Artikel: geschlossen ≤ 22 mm, offen > 30 mm.
Mehrere Fahrzeugartikel (Ford Transit 6G/7G, Fiat Talento): „geschlossen im Bereich 22–30 mm".
Einmal ist 22 mm Obergrenze, einmal Untergrenze — im Wiki auflösen. Für HIDDENSEE 2 ist der
Master maßgeblich.

**POEL am schwächsten gedeckt:** „Händlerfinder": 0 Treffer · „Werbemittel": 0 Treffer ·
Menüpfad „Support → Downloads → Alarmanlagen → Sonstiges" nicht dokumentiert. Belegt sind nur:
Konformitätserklärung im öffentlichen Supportbereich (thitronik.de/support), fahrzeugspezifische
Einbauanleitungen im Händlerbereich. Vor Freigabe am eingeloggten Händlerkonto verifizieren.
