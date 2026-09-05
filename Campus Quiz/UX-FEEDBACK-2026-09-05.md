# Feedbackbogen: responsive Überarbeitung

Fassung 1.41.0. Änderungen werden beim Bau in den Gesamtbogen und das eigenständige Netlify-Paket übernommen. Die Quelle der Ergänzungen liegt ausschließlich in `Campus Quiz/public/assets/feedback-ux.css` und `feedback-ux.js`; das Bauwerkzeug `feedback-einwilligung-bauen.js` bindet sie ein.

- Einstieg ab 1000 px mit Foto und Text nebeneinander; darunter kompakte Bildhöhe. Bildgrößenhinweise passen zur neuen Aufteilung.
- Desktop nutzt bis zu 1400 px. Händlerangaben stehen nebeneinander, Bewertungen in zwei Spalten; auf schmalen Geräten bleibt eine Spalte.
- Bewertungsskalen behalten beide Textanker. Die gewählte Zahl erscheint zusätzlich beim Fragetitel. Pflichtkommentar bei Bewertung 1 wird ausdrücklich angekündigt.
- Fortschrittsknöpfe besitzen auch mobil vollständige zugängliche Namen und mindestens 44 px große Klickflächen.
- Inselauswahl mit aktuellen Campus-Motiven statt alten Silhouetten und abweichendem Plakat. Acht Auswahlmöglichkeiten einschließlich Catering bleiben erhalten.
- Datenfelder, Bewertungswerte, Kommentarvalidierung, Einwilligung und Übertragung bleiben unverändert.

Prüfung: alle sechs Formularschritte bei 320, 768 und 1440 px ohne horizontalen Überlauf. Bei 320 px messen die Skalenknöpfe 44 × 52 px und die Fortschrittsknöpfe etwa 45 × 44 px. Pflichtkommentar bei 1, Top-3-Rangfolge mit Begrenzung und vollständiger Demo-Durchlauf bis zur Abschlussbestätigung geprüft. `node tools/montag.js --ohne-server` erfolgreich; die Paketprüfung kontrolliert zusätzlich die wiederholte Einbindung und alle sieben Inseldateien.

Nur lokale Vorschau; keine Veröffentlichung und keine Testeinsendung in die Produktivdatenbank.
