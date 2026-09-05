# Korrekturen nach dem Projektreview

Stand: 5. September 2026. Arbeitszweig: `codex/campus-review-korrekturen`.
Ausgangspunkt: `a516552`, der aktuelle Hauptzweig nach PR #98. Zusätzlich
wurde `origin/claude/langdock-anbindung` bis `74b5770` übernommen
(lokaler Merge `7becc91`). GitHub ist die maßgebliche Quelle; die vorhandene
Langdock-Anbindung und das neuere Betriebsprotokoll sind damit enthalten.

## Datenbank

Im Campus-Projekt `pstohdeknhgsywmogmiu` wurde die Migration
`supabase/migrations/20260905122449_campus_review_korrekturen.sql` eingespielt.
Sie ist der Upgradeweg für eine bestehende Datenbank. Die SQL-Dateien
im Quellordner bilden weiterhin den Neuaufbau ab.

- Händlernummern werden in der kombinierten Auswertung korrekt erkannt.
- Wiederholungen zählen nicht mehr als zusätzliche absolvierte Inseln.
- Je Betrieb wird ein zusammengehöriger letzter Feedbackbogen ausgewählt.
- Fragen verschiedener Quizversionen werden getrennt ausgewertet.
- Anonymisierte Einsendungen zählen nicht als ein fiktiver gemeinsamer Betrieb.
- Die Aufbewahrungsfunktion entfernt auch Einzelkommentare, URL,
  Sitzungskennung und Einwilligungsnachweise. Bereits anonymisierte
  Feedbackbögen werden auf verbliebene Einzelkommentare nachbereinigt.
- Beide Annahmewege können Zeitpunkt und Version der Einwilligung speichern.

Nach der Migration unverändert: zwei Quizeinsendungen, ein Feedbackbogen,
16 Einzelbewertungen. Der bestehende Feedbackbogen wird jetzt zugeordnet.
Keine Testeinsendungen in der Produktivdatenbank. Der Aufbewahrungsjob bleibt
aktiv. Die Advisor-Prüfung meldete keine Warnungen oder Fehler; die drei
Informationshinweise zu RLS ohne öffentliche Policies sind bei diesem
serverseitigen Schreibweg beabsichtigt.

## Oberfläche und Fragen

Engine 1.39.0: Einwilligung mit Fassung 1.1 durchgehend bis zu den Functions
und zum Forms-Pilotweg; eigener Haken im eingebundenen Feedbackbogen.
Alte Profile ohne Nachweis müssen erneut zustimmen. Ein Namens- oder
Betriebswechsel setzt den Haken zurück. Historische Nachweise werden nicht
nachträglich erzeugt.

Direkte Insel- und QR-Links bleiben nach der Profileinrichtung erhalten.
Die Navigation erhält den Demomodus. Das optionale Profilfoto steht
aufklappbar nach den Pflichtangaben. Größere Profileingaben und Fotoknöpfe
berücksichtigen den Seitenzoom; mobile Inselbühnen sind kompakter.

Die mobile Teilnehmerdarstellung und die drei Quizhinweise sind flacher
gesetzt. Die Werkzeugnamen bleiben auch unter 400 Pixeln sichtbar. Auf
allen sieben Inseln liegt der Startknopf bei 320 × 740 Pixeln mit dem
Testprofil vollständig im ersten Bildschirm (Unterkante 682 bis 719 Pixel).
Längere Namen oder größere Schrift dürfen die Seite weiterhin verlängern.

Designentscheidung: behutsame Weiterentwicklung der vorhandenen maritimen
Oberfläche für Händler am Telefon. Navy, Cyan, Lime, Schrift, Bilder und
Seitenstruktur bleiben erhalten. Design-Varianz 3, Bewegung 2, Dichte 4:
Lesbarkeit und kurze Wege haben Vorrang vor zusätzlichen Effekten.

## THI

Die dokumentierten Freigaben FEH-04/05 vom 31. August stehen nun in
`thi-lib/campus-freigaben.mjs` und erreichen THI als serverseitige
Systemanweisung. Sie benennen den abweichenden Wiki-Stand und gelten für die
Campus-Besprechung. Geräteprüfungen außerhalb dieses Rahmens benötigen die
passende Revision. Flamme und CO-Sensor bleiben ausdrücklich ausgeschlossen.
Das Wiki wurde nicht umgeschrieben. 107 THI-Prüfungen bestehen, einschließlich
Abgleich mit dem Quiz und Übertragung im Streaming- und Werkzeugweg.

Vier Fragen wurden redaktionell bearbeitet, jeweils mit neuer Fragenversion:
USE-01 benennt passende Alternativen für die Beratung, FEH-09 fragt nach
einem Prüfschritt statt einer vermeintlich eindeutigen Ursache, VEJ-06 prüft
die praktische Vorführung des Zweitzugangs. SAM-09 verwendet das unpassende
GSM-Antennenfoto nicht mehr für eine GPS-Frage.

## Prüfung und Auslieferung

`node tools/montag.js --ohne-server` baut das Gesamtpaket und sieben
Einzelpakete und führt die vorhandenen Prüfungen aus. Zusätzlich:

Browserprüfung am gebauten Gesamtpaket mit `?demo=1`: vollständige
USEDOM-Runde und Feedbackbogen bis zum Abschluss; fehlende Zustimmung
blockiert das Absenden. Ein Namenswechsel setzt den Profilhaken zurück.
QR-Einstieg und Rückweg zur Karte erhalten das Ziel beziehungsweise den
Demomodus. Ansichten mit 320, 390 und 1440 Pixeln geprüft; keine horizontale
Überbreite in den geprüften Ansichten, keine Browserfehler. Profileingaben
und Fotoknöpfe messen bei 320 Pixeln rund 53,6 Bildschirmpixel in der Höhe.

Der zusätzliche Datenbanktest wird separat aufgerufen:

```powershell
npm install --prefix "$env:TEMP/campus-db-test" --save-exact @electric-sql/pglite@0.5.8
$env:CAMPUS_PGLITE_PATH = "$env:TEMP/campus-db-test/node_modules/@electric-sql/pglite/dist/index.js"
node tools/test-datenbank.mjs
```

Der zusätzliche Test verwendet eine flüchtige PostgreSQL-Datenbank ohne
Supabase-Verbindung. Er prüft den Upgradepfad vom festgehaltenen alten
Git-Stand, wiederholte Migration, Einwilligung, Versionsgruppen,
Händlerauswertung, Anonymisierung und Zugriffsrechte. Dafür muss der
Ausgangscommit in der lokalen Git-Historie vorhanden sein.

Die Website wurde noch nicht produktiv bereitgestellt. Frontend und
Netlify Functions müssen gemeinsam aus dem neu gebauten Gesamtpaket
ausgeliefert werden. Die bereits eingespielte Datenbankmigration ist mit
der bisherigen Website kompatibel. Die neuen Functions lehnen alte
Einsendungen ohne Einwilligungsnachweis ab, auch aus dem lokalen Sende-Ausgang.

Der Bau erzeugt jetzt `Campus Quiz/build/feedback-netlify/` als ergänztes
Einzelpaket mit Einwilligung und Datenschutzhinweis. Die Feedbackquelle und
ihr bisheriges versioniertes Netlify-Paket bleiben unangetastet. Der Bogen wurde auf
einem eigenen lokalen Server vollständig im Demomodus durchgespielt;
fehlende Zustimmung blockiert, mit Zustimmung erscheint der Abschluss.
Nach einem alleinigen Rohbau im Feedbackordner muss die Campus-Ergänzung
erneut ausgeführt werden; `montag.js` übernimmt sie automatisch.

## Bewusst offen

Die Auswertungsgrenze von fünf Einsendungen ist
weiterhin keine Garantie für fünf unterschiedliche Personen. Ein
produktiver Speichertest und eine vollständige Live-Abnahme von THI sind
nicht Teil dieser Prüfung.

Vor Push und Deployment ist die Repository-Sichtbarkeit zu klären: GitHub
meldet `Thitronik01/Campus-1.0` öffentlich, während AGENTS.md privat verlangt.
Bis zu einer Entscheidung werden keine weiteren Inhalte dorthin übertragen.
