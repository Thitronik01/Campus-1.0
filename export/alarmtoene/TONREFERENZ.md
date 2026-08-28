# Tonreferenz — THITRONIK Alarmtöne

11 MP3-Dateien, übernommen aus der Händlerplattform (`public/assets/Alarmtöne/`, identisch im
Soundboard unter `/tools/soundboard`). Die Bedeutungen stammen aus den Dateinamen, den
Soundboard-Labels und den im Wiki dokumentierten Tonsignaturen.

⚠️ **Vor der Quiz-Freigabe jede Datei einmal anhören und die Zuordnung vom Support bestätigen
lassen** — insbesondere die mit ❓ markierten. Ein falsch zugeordneter Ton in einer Audio-Frage
wäre ein Qualitäts-GAU.

| Datei | Gerät | Bedeutung (dokumentiert) | Wiki-Beleg |
|---|---|---|---|
| `scharf.mp3` | WiPro III | Scharfschalten: **1 Signalton** (+ 1× Blinker, Status-LED blinkt) | `wipro-iii.md` |
| `unscharf.mp3` | WiPro III | Unscharfschalten: **2 Signaltöne** (+ 2× Blinker, Status-LED aus) | `wipro-iii.md` |
| `alarm.mp3` | WiPro III | Einbruch-/Hauptalarm (Sirene) | `wipro-iii.md`, `sirenen-hupen.md` |
| `gas-alarm.mp3` | G.A.S.-Familie / WiPro-Gasmeldung ❓ | Gasalarm — klären: Ton der internen G.A.S.-Sirene oder der WiPro-Ausgabe? | `gas-pro-iii.md` |
| `batterie-leer.mp3` | WiPro III (Zentrale) | Niederbatterie-Warnung Funk-Zubehör: **~2 s Signalton** beim Betätigen; am Sender bleibt die rote Sende-LED ~30 s | `wipro-iii.md`, `funk-magnetkontakt.md` |
| `anlernmodus.mp3` | WiPro III | Anlernmodus aktiv: **langer Signalton** nach langem Druck auf Taste „B" | `anlernvorgang.md`, `wipro-iii.md` |
| `anlernvorgang-aus.mp3` | WiPro III | Anlernmodus beendet: **Doppelton** nach kurzem Druck auf Taste „B" | `anlernvorgang.md` |
| `nicht-anlernen.mp3` | WiPro III ❓ | Vermutlich Fehler-/Ablehnton beim Anlernen — im Wiki nicht als eigene Signatur dokumentiert | — |
| `offen-meldung.mp3` | WiPro III ❓ | Vermutlich Meldung „Kontakt offen" beim Scharfschalten — Abgrenzung zu Vent-check klären | `wipro-iii.md` (Vent-check) |
| `vent-check_kontakt_offen_unscharf.mp3` | WiPro III | Vent-check: toleriertes Offenlassen eines Kontakts beim Scharfschalten (kanonischer Begriff!) | `wipro-iii.md`, `glossar.md` |
| `verriegeln_nicht_ausgefuehrt_aussperrgefahr.mp3` | WiPro III safe.lock | Verriegeln nicht ausgeführt / Aussperrgefahr — passt zum Campingmodus-/Aussperrschutz-Kontext (z. B. Ford ab 2023/24) | `fahrzeuge/ford-transit-2024plus.md` |

## Weitere dokumentierte Tonsignaturen (ohne eigene MP3-Datei)

Nützlich für Distraktoren und Auflösungen — diese Signaturen sind belegt, liegen aber nicht
als Datei vor:

| Signatur | Gerät | Bedeutung |
|---|---|---|
| 1 langer + 2 kurze Töne beim Unscharfschalten | WiPro III | Alarmspeicher belegt — es gab einen Alarm (Blinkcode zeigt den Grund) |
| Steigende Tonfolge | G.A.S.-pro III | Einschalten |
| Fallende Tonfolge | G.A.S.-pro III | Ausschalten |
| Ein Ton pro Sekunde + Sensor-LED gelb | G.A.S.-pro III | Sensorfehler |
| 3× drei Töne innerhalb einer Minute + LEDs gelb | G.A.S.-pro III | Unterspannung (< 11,1 V), danach Abschaltung |
| Auf- und abschwellender Dauerton + mehrfarbige LEDs | G.A.S.-pro III | Übertemperatur (> 60 °C), keine WiPro-Meldung |
| Doppelton hoch–tief / tief–hoch | G.A.S.-pro III | Pause-Modus Beginn / Ende (60 Minuten) |
| Kurzer Signalton alle 43 Sekunden | T.S.A. Rauchmelder | Batteriewarnung |

Kandidaten für neue Aufnahmen (falls Audio-Fragen gut ankommen): Alarmspeicher-Tonfolge,
G.A.S.-Sensorfehler (1 Ton/s), Unterspannungs-Sequenz, Übertemperatur-Dauerton, Pause-Doppeltöne.
