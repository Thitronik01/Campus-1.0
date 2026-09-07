# Automatische Bedienungsprüfung

Die Browserprüfung ist Teil von `node tools/montag.js --ohne-server` und läuft dadurch auch im bestehenden GitHub-Workflow vor der Freigabe des Gesamtpakets. Fehlgeschlagene Browserabläufe lassen die Gesamtprüfung mit Rückgabewert 1 enden. Es gibt keine automatische Wiederholung, die sporadische Fehler verdecken würde.

## Umfang

Acht Abläufe laufen jeweils bei 1440 × 1000, 820 × 1180, 390 × 844 und 320 × 740 Pixeln, insgesamt 32 Tests:

- Profil mit erforderlicher Einwilligung, sieben Inseln, Tastaturauswahl und Quiz-Einstieg.
- Abbruchdialog des Quiz, Schließen mit Escape und Fortsetzen.
- Vollständiges Vejrø-Quiz mit bewusst falschen Antworten; anschließend genau diese Fragen nachlernen. Der Übungsstatus und die unterbleibende erneute Übertragung werden geprüft.
- Fahrzeug- und Produktwahl in der Arbeitskarte, Zubehör ergänzen, Plan-/Prüffilter, Artikelsuche und Erhalt der Daten nach Neuladen.
- Abschlusssperre bei offenen Materialpunkten und erneute Prüfpflicht nach einer Mengenänderung.
- Materialfilter und Verlaufsdialog mit Tab, Enter und Escape einschließlich Fokusrückgabe.
- Feedback-Pflichtfelder, Erhalt einer Antwort und Wiederaufnahme des Entwurfs nach Neuladen sowie erneutem Öffnen.
- Alle sechs Feedbackschritte, Einwilligung vor dem Absenden und Demo-Abschluss.

Zusätzlich werden horizontaler Seitenüberlauf, die Größe zentraler Schaltflächen, JavaScript-Ausnahmen, fehlende angeforderte Dateien und unerlaubte Netzaufrufe geprüft. Die Größenprüfungen verwenden Bildschirmkoordinaten und berücksichtigen damit auch den Zoom der Quizoberfläche.

Die Tests verwenden Chromium mit Touch-/Mobil-Emulation, keine echten Mobilgeräte. Sie ersetzen keine Prüfung mit Safari, Firefox oder einem Screenreader. Auch eine vollständige WCAG-Prüfung und die Verfügbarkeit der produktiven Backends sind nicht abgedeckt.

## Einmalig lokal einrichten

```powershell
cd "Campus Quiz/tools/browser"
npm ci
node node_modules/@playwright/test/cli.js install chromium
```

Danach aus `Campus Quiz/`:

```powershell
node tools/montag.js --ohne-server
```

Nur Browserabläufe erneut prüfen, wenn das Gesamtpaket bereits gebaut ist:

```powershell
node tools/browser/run.mjs
node tools/browser/run.mjs --project=handy-klein
```

Playwright ist ausschließlich eine Entwicklungsabhängigkeit unter `tools/browser/`. Version und Integrität stehen im Lockfile. Die statische Website bekommt weder ein Framework noch zusätzliche Browserbibliotheken. Im GitHub-Lauf richtet `run.mjs` die Werkzeuge aus dem Lockfile sowie Chromium mit seinen Linux-Abhängigkeiten ein. Lokal wird eine fehlende Installation ausdrücklich als Fehler gemeldet.

## Isolation und Fehleranalyse

Die Tests starten auf Port 8876 einen eigenen statischen Server für das **gebaute Gesamtpaket**. Ein bereits belegter Port wird nicht übernommen. Der Server lädt keine Netlify Functions und akzeptiert nur GET/HEAD. Jeder Test erhält einen frischen Browserkontext. Alle Formularabläufe verwenden `?demo=1` und synthetische Angaben; zusätzliche Netzregeln blockieren externe Ziele sowie Schreibanfragen und werten jeden Versuch als Fehler.

Nach einem Fehler liegen Bildschirmfoto, Kontext und Playwright-Trace unter `tools/browser/ergebnisse/`. Der lokale HTML-Bericht steht unter `tools/browser/bericht/index.html`. Diese Dateien werden nicht versioniert. In GitHub stehen die Fehler im Prüfprotokoll; ein automatischer Upload der Browserberichte ist im bestehenden Workflow nicht eingerichtet.

Bei einer beabsichtigten Änderung die fachlichen Erwartungen des betroffenen Tests mit anpassen. Nicht pauschal Wartezeiten erhöhen oder fehlerhafte Prüfungen überspringen. Einzig die 500-ms-Pause nach einer Quizantwort bildet die absichtliche 450-ms-Sperre gegen Doppeltippen ab; sonst warten die Tests auf sichtbare Zustände.
