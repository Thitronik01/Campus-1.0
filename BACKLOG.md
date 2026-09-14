# Rückstand

Befunde aus dem Audit vom 30. August 2026. Jeder war am Code belegt und von
einem zweiten Durchgang gegengeprüft, der ihn zu **widerlegen** versuchte —
von 123 Funden haben 73 das überstanden, 50 nicht.

**Stand 14. September 2026: 72 der 73 sind erledigt.** Neun am Tag des
Audits, zwölf am 2. September (Pull Requests #81, #82, #85), sechs am
3. September (Fragenansicht und THI-Fragenkontext), sechs am 8. September
(Hygiene, #99) und 39 am 14. September (#104 bis #112: Doku, THI-Härtung,
Medien, tote CSS-Regeln, Sende-Ausgang ohne Netlify-Forms-Hintertür,
Cache-Marken). Jeder erledigte Befund hat ein geschlossenes Issue mit Beleg;
die Liste steht unter <https://github.com/Thitronik01/Campus-1.0/issues?q=is%3Aissue+R->.

Was hier noch steht, ist keine Arbeit, sondern eine Entscheidung — deshalb
bleibt der Eintrag, bis sie getroffen ist. Neue Befunde gehören nicht mehr in
diese Datei, sondern direkt als Issue ins Repository; `.github/issues-anlegen.js`
war das Werkzeug für die Erstübernahme und wird nicht mehr gebraucht.

| Schwere | Zahl |
|---|---|
| hoch | 0 |
| mittel | 1 |
| niedrig | 0 |

---

## R-36 · export/ ist versioniert, obwohl sein eigenes README ihn als temporaer und loeschbar bezeichnet
<!-- labels: hygiene, mittel -->

**Schwere:** mittel · **Bereich:** hygiene · **Ort:** `export/README.md:4` · **Issue:** #51

**Befund.** Der Uebergabeordner liegt mit 7,6 MB im Repository, enthaelt als intern gekennzeichnete Artikel und dupliziert Bestaende, die schon anderswo im Repo liegen.

**Beleg.** export/README.md:4 „Dieser Ordner ist temporaer und wird von Max nach der Uebernahme geloescht.“ Getrackt sind u. a. export/wissen-de/intern/rag-*.md (6 RAG-Wissenspakete), 30 fahrzeugspezifische Einbauartikel unter export/wissen-de/fahrzeuge/ und export/campus-kontext/02_SUPPORT-KORREKTUREN_2026-08-27.md. Ein Blob-Vergleich ueber `git ls-files -s` zeigt Bit-Identitaet zwischen export/alarmtoene/*.mp3 und Wissen/03_Medien/alarmtoene/*.mp3 sowie zwischen export/arbeitskarte/bilder/*.png (4,8 MB) und Campus Quiz/public/assets/arbeitskarte/*.png.

**Folge.** Das Loeschen des Ordners entfernt ihn nur aus der Spitze, nicht aus der Historie — die 7,6 MB samt interner Artikel bleiben in jedem Klon. Die Checkliste „Vor der Weitergabe pruefen“ in Wissen/README.md:85-93 nennt nur Wissen/ und deckt export/wissen-de/intern/ und export/wissen-de/fahrzeuge/ nicht ab, obwohl README.md:251-259 genau diese Inhaltsklassen als vertraulich benennt. Wer die Checkliste abarbeitet, uebersieht sie.

**Vorschlag.** Entscheiden und dokumentieren: entweder export/ als dauerhafte Quelle anerkennen (dann Doppelbestaende zu Wissen/03_Medien/alarmtoene und public/assets/arbeitskarte aufloesen und die Weitergabe-Checkliste um export/ ergaenzen) oder als temporaer behandeln — dann jetzt entfernen, solange die Historie kurz ist, und die drei noch gebrauchten Teile (wissen-de/ als THI-Quelle, arbeitskarte/, alarmtoene/) an ihren Zielort verschieben.

**Seit dem Audit dazugekommen:** Die Bildordner `export/Bilder */`, das Asset-Pack und lose Bilddateien in der Wurzel stehen inzwischen in `.gitignore` (Begründung dort); die vier Fahrzeugansichten der Arbeitskarte liegen als WebP unter `public/assets/arbeitskarte/`, die PNG-Doppel unter `export/arbeitskarte/bilder/` sind damit reine Quelle. Die Entscheidung über `wissen-de/` und `alarmtoene/` steht weiter aus.
