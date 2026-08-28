# Audio-Fragen für FEHMARN — Konzept und Entwürfe

Idee (Max, 28.08.): Einen Alarmton abspielen und fragen, wozu er gehört — WiPro oder G.A.S.
Das passt exakt zur FEHMARN-Leitlinie **„Erst lesen (und hören), dann tauschen"**: Töne sind
neben Blinkcodes das zweite Diagnosesignal, das Händler am Telefon und in der Werkstatt
auswerten müssen, bevor sie Komponenten verdächtigen.

Audiodateien: `../alarmtoene/` (11 MP3s) · Zuordnungen: `../alarmtoene/TONREFERENZ.md`

## Qualitätsleitplanken für Audio-Fragen

1. **Jede Frage prüft eine Handlungsentscheidung, nicht Tonerkennung als Selbstzweck.**
   Schlecht: „Welcher Ton ist das?" Gut: „Du hörst diesen Ton — was tust du als Nächstes?"
   Die Geräte-Zuordnung (WiPro vs. G.A.S.) ist der Einstieg, die Konsequenz ist der Lernwert.
2. **Vor Freigabe jeden Ton anhören und vom Support bestätigen lassen** — drei Dateien sind in
   der Tonreferenz mit ❓ markiert (gas-alarm, nicht-anlernen, offen-meldung). Keine Frage auf
   einen unbestätigten Ton bauen.
3. **Technik zuerst prüfen:** Die Campus-Engine kann Bildfragen; ein Audio-Fragetyp braucht
   einen Play-Button im Fragenkopf (HTML5 `<audio>`, Trefferfläche ≥ 44 × 44 px, beliebig oft
   wiederholbar, Fortschrittsanzeige). Kein Autoplay — der Teilnehmer startet den Ton selbst.
4. **Barrierefreiheit & Werkstattlärm:** Jede Audio-Frage braucht eine Textbeschreibung der
   Tonsignatur als Fallback (aufklappbar, z. B. „♪ zwei kurze Töne"), damit die Frage auch bei
   Lärm, defektem Lautsprecher oder Hörbeeinträchtigung lösbar bleibt. Hinweis am Inselstart:
   „Für diese Station Ton einschalten oder Kopfhörer nutzen."
5. **Ein Ton pro Frage.** Vergleichsfragen („Welcher von drei Tönen…") sind auf Mobilgeräten
   frustrierend. Kontrast entsteht über die Distraktoren, nicht über mehrere Player.
6. **Statistik im Blick:** Wenn eine Audio-Frage auffällig schlecht ausfällt, kann auch die
   Abspielsituation schuld sein (Lautstärke, Umgebung) — bei der Auswertung berücksichtigen.

---

## A1 · Die Kernfrage: WiPro oder G.A.S.? *(Max' Idee)*

**Audio:** `gas-alarm.mp3` *(erst nach Support-Bestätigung der Zuordnung!)*
**Frage:** ▶ Höre dir den Alarmton an. Ein Kunde ruft an: „Bei mir piept irgendwas im
Fahrzeug!" Du erkennst diesen Ton. Welches System meldet sich — und was fragst du als Erstes?

- A) **Gasalarm der G.A.S.-Familie — erste Frage: „Sind alle Personen wach und ist das Fahrzeug gelüftet/verlassen?"** ✓
- B) Einbruchalarm der WiPro III — erste Frage: „Ist eine Tür oder Klappe offen?" ✗
- C) Batteriewarnung eines Funk-Magnetkontakts — erste Frage: „Wann wurde die CR2032 gewechselt?" ✗
- D) Panikalarm — erste Frage: „Wer hat den Handsender gedrückt?" ✗

**Auflösung:** Der Ton gehört zur Gaswarnung. Bei Gas- oder CO-Alarm gilt Sicherheit vor
Diagnose: Personen wecken, Fahrzeug verlassen, nur ohne Eigengefährdung lüften, Zündquellen
vermeiden — ein Alarm darf nie allein per Fernsupport als Fehlalarm eingestuft werden.
Erst danach beginnt die technische Eingrenzung.
**Typische Fehler:** Alle vier Optionen sind reale THITRONIK-Signale — wer den Ton nicht
kennt, rät die Reaktion. Genau deshalb gehört die Tonkenntnis zur Diagnose-Grundausstattung.
**Mitnehmen:** Erst der Ton sagt dir, welches Playbook gilt: Gasalarm = Sicherheits-Playbook,
Einbruchalarm = Ursachen-Playbook.
**Quelle:** `faq-master.md` (Verhalten bei Alarm), `gas-pro-iii.md`, TONREFERENZ.

## A2 · Scharf oder unscharf?

**Audio:** `unscharf.mp3`
**Frage:** ▶ Bei der Fahrzeugübergabe drückt der Kunde eine Taste am Funk-Handsender und du
hörst dieses Signal. Was ist gerade passiert?

- A) Die Anlage wurde scharfgeschaltet ✗
- B) **Die Anlage wurde unscharfgeschaltet — zwei Signaltöne (und zwei Blinker, Status-LED aus)** ✓
- C) Der Handsender hat eine leere Batterie gemeldet ✗
- D) Die Anlage hat den Befehl abgelehnt ✗

**Auflösung:** Die WiPro III quittiert eindeutig: Scharf = **1** Ton + 1× Blinker
(Status-LED blinkt), Unscharf = **2** Töne + 2× Blinker (Status-LED aus). Wer das
verinnerlicht, erkennt bei der Übergabe sofort, ob ein Bedienweg wirklich funktioniert —
ohne aufs Fahrzeug zu schauen.
**Typische Fehler:** Die Batteriewarnung klingt anders (ein ~2-Sekunden-Ton) und käme aus der
Zentrale beim Betätigen des Zubehörs.
**Mitnehmen:** 1 Ton scharf, 2 Töne unscharf — die Quittung immer mitzählen.
**Quelle:** `wipro-iii.md` (Quittierungssignale), TONREFERENZ.

## A3 · Der 2-Sekunden-Ton

**Audio:** `batterie-leer.mp3`
**Frage:** ▶ Beim Öffnen der Heckgarage ertönt aus der WiPro-Zentrale dieser Ton; am
Magnetkontakt leuchtet die rote Sende-LED ungewöhnlich lange nach. Was tust du?

- A) Den Magnetkontakt neu anlernen und einen Testalarm auslösen ✗
- B) Die Zentrale spannungsfrei schalten und neu starten ✗
- C) **Die CR2032 des betätigten Kontakts zeitnah ersetzen — Neu-Anlernen ist nicht nötig; danach Funktion und Reichweite prüfen** ✓
- D) Nichts — das ist die normale Öffnungsquittung ✗

**Auflösung:** Der ~2-Sekunden-Signalton beim Betätigen von Funk-Zubehör plus die ~30 Sekunden
nachleuchtende Sende-LED sind die dokumentierte Niederbatterie-Signatur (unter ~2,6 V). Die
Funkzuordnung bleibt beim Batteriewechsel erhalten. Sinnvoll: weitere Knopfzellen ähnlichen
Alters gleich mitprüfen.
**Typische Fehler:** Neu anlernen und Neustarts sind unnötige Arbeit — die klassische
Verwechslung von Batteriesignal und Störung.
**Mitnehmen:** Langer Ton + lange LED = Knopfzelle, nicht Defekt.
**Quelle:** `wipro-iii.md`, `funk-magnetkontakt.md`, TONREFERENZ.

## A4 · Der lange Ton nach Taste „B"

**Audio:** `anlernmodus.mp3`
**Frage:** ▶ Ein Kollege hält die Taste „B" an der WiPro-III-Zentrale gedrückt, bis dieser Ton
kommt, und lässt dann los. In welchem Zustand ist die Anlage jetzt?

- A) **Im Anlernmodus — die Status-LED leuchtet dauerhaft, jetzt kann Funk-Zubehör angelernt werden** ✓
- B) Im Diagnosemodus für den CAN-Bus ✗
- C) Sie hat gerade ein Zubehörteil gelöscht ✗
- D) Sie ist in den Werkszustand zurückgesetzt ✗

**Auflösung:** Langer Druck auf „B" bis zum langen Signalton = Anlernmodus aktiv
(Status-LED leuchtet). Jeder erfolgreiche Anlernvorgang wird mit einem kurzen Ton quittiert;
kurzer Druck auf „B" beendet den Modus mit einem Doppelton (Datei `anlernvorgang-aus.mp3`).
Der Diagnosemodus wird dagegen mit **kurzem** Druck gestartet.
**Typische Fehler:** Langer und kurzer Tastendruck werden verwechselt — der Ton verrät, was
die Anlage wirklich verstanden hat.
**Mitnehmen:** Die Taste „B" spricht in Tönen: lang = Anlernmodus an, kurz+Doppelton = wieder aus.
**Quelle:** `anlernvorgang.md`, `wipro-iii.md`, TONREFERENZ.

## A5 · Vent-check richtig erklären

**Audio:** `vent-check_kontakt_offen_unscharf.mp3`
**Frage:** ▶ Ein Kunde schaltet scharf, während die Dachluke zum Lüften offen steht, und hört
dieses Signal. Er fragt: „Ist das ein Fehler?" Was antwortest du?

- A) Ja — die Anlage ist defekt und muss in die Werkstatt ✗
- B) Ja — die Dachluke muss vor jedem Scharfschalten geschlossen werden, sonst ist die Anlage aus ✗
- C) **Nein — das ist der Vent-check: Die Anlage meldet den offenen Kontakt, toleriert ihn und überwacht alle übrigen Öffnungen normal** ✓
- D) Nein — aber die Dachluke wird jetzt dauerhaft von der Überwachung ausgeschlossen ✗

**Auflösung:** Vent-check (kanonischer Begriff) ist das tolerierte Offenlassen eines Kontakts
beim Scharfschalten, z. B. zum Lüften. Das Signal ist eine Information, kein Fehler. Der
offene Kontakt ist so lange nicht überwacht, wie er offen steht — alle anderen bleiben scharf.
Genau so dem Kunden bei der Übergabe erklären.
**Typische Fehler:** „Dauerhaft ausgeschlossen" ist die gefährliche Fehldeutung — nach dem
Schließen ist der Kontakt wieder Teil der Überwachung.
**Mitnehmen:** Vent-check = gewolltes Lüften mit scharfer Anlage, kein Defekt.
**Quelle:** `wipro-iii.md`, `glossar.md` (Vent-check), TONREFERENZ.

## A6 · Aussperrgefahr *(Brücke zu LANGELAND)*

**Audio:** `verriegeln_nicht_ausgefuehrt_aussperrgefahr.mp3`
**Frage:** ▶ Bei der Übergabe eines Ford Transit (safe.lock, Campingmodus) verriegelt der Kunde
über den THITRONIK-Bedienweg und es kommt dieses Signal statt der normalen Quittung. Was
bedeutet es?

- A) Die Anlage ist scharf, das Fahrzeug ist verriegelt — alles in Ordnung ✗
- B) **Das Verriegeln wurde nicht ausgeführt — Aussperrgefahr: Zustand der Türen prüfen, bevor das Fahrzeug verlassen wird** ✓
- C) Die Batterie des Bedienmediums ist leer ✗
- D) Der Campingmodus wurde beendet ✗

**Auflösung:** Das Signal warnt, dass der Verriegelungsbefehl nicht ausgeführt wurde. Gerade
im Campingmodus (Ford ab 2023/24: Verriegeln konsequent über den THITRONIK-Bedienweg) darf
sich niemand auf die Quittung „irgendwas hat gepiept" verlassen — wer das Signal ignoriert,
steht schlimmstenfalls vor einem unverriegelten oder nicht mehr entriegelbaren Fahrzeug.
**Typische Fehler:** Warnton und Erfolgsquittung nicht unterscheiden — deshalb bei jeder
Übergabe die echten Quittungen einmal gemeinsam mit dem Kunden anhören.
**Mitnehmen:** Nicht jeder Piep ist ein Erfolg — dieses Signal heißt „nachsehen, bevor du gehst".
**Quelle:** `fahrzeuge/ford-transit-2024plus.md` (Campingmodus/Aussperrschutz), TONREFERENZ.

---

## Zurückgestellt (bis Support die Töne bestätigt)

- `nicht-anlernen.mp3` — Kandidat: „Anlernen wird abgelehnt — was prüfst du?" (Speicher voll?
  Falscher Modus? NFC Modul als erstes Zubehör?) Signatur im Wiki nicht dokumentiert.
- `offen-meldung.mp3` — Kandidat: Abgrenzung „Offen-Meldung beim Scharfschalten" vs.
  Vent-check. Erst klären, welcher Zustand den Ton wirklich auslöst.
- `alarm.mp3` vs. `gas-alarm.mp3` als Folgefrage-Paar (A1 spiegeln: Einbruchalarm hören →
  Ursachen-Playbook: Alarmspeicher lesen, 1×–11×-Blinkcode).

## Umsetzungshinweis für die Campus-KI

Die Fragensatz-JSONs brauchen ein Audio-Feld analog zu den Bildfragen (z. B. `audio:
"toene/gas-alarm.mp3"` + `audioFallbackText: "♪ …"`). Die Engine-Erweiterung (Play-Button,
Wiederholung, Fallback-Text, kein Autoplay) vor dem ersten Insel-Einsatz an einer Testfrage
im Demo-Modus verifizieren — auf einem Smartphone mit und ohne Kopfhörer.
