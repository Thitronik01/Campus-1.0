# Projektprüfung vom 5. September 2026

Dieser Bericht hält den Ausgangsbefund fest. Die anschließenden Änderungen,
die eingespielte Datenbankmigration und die noch offenen Punkte stehen in
[KORREKTUREN-2026-09-05.md](KORREKTUREN-2026-09-05.md).

Der Campus hat ein gutes gestalterisches und technisches Fundament. Die Inselwelt passt zum Schulungskonzept, die Fragen sind überwiegend praxisnah und der Datenbankzugriff ist sinnvoll abgeschirmt. Vor dem Händlereinsatz sollten jedoch die Auswertung, die Anonymisierung und einzelne Fragen korrigiert werden. Ein gestalterischer Neustart ist nicht nötig.

## Prüfgrundlage

- Geprüfter Quellstand: `origin/main`, Commit `a5165524ccbd938386c1690d2905b728c6f25fe6`. Der ursprüngliche lokale Checkout liegt 43 Commits dahinter und wurde nicht umgestellt.
- Separate Prüfkopie: `C:/Users/Rüpprich/AppData/Local/Temp/campus-audit-20260905`.
- Noch offene Commits auf `claude/langdock-anbindung`, `claude/inbetriebnahme-protokoll` und `codex/campus-quiz-polish` wurden berücksichtigt. Insbesondere dokumentiert der Langdock-Zweig bereits durchgeführte Inbetriebnahmeschritte. Diese Funktionen sollten nicht erneut entwickelt werden.
- Alle sieben Fragensätze gelesen: 70 Fragen, davon 56 Einfachauswahl, zehn Mehrfachauswahl, zwei Zuordnungen und zwei Reihenfolgen. Die hinterlegten Bearbeitungszeiten summieren sich auf 54 Minuten.
- Oberfläche im gebauten Gesamtpaket geprüft: Desktop 1440 × 900, Tablet 768 × 1024, Telefon 390 × 844. Vollständiger VEJRØ-Durchlauf einschließlich Auswertung im Demo-Modus; keine Browserfehler festgestellt. Kein Gerätetest unter realem Hallen-WLAN.
- Supabase-Zielprojekt `pstohdeknhgsywmogmiu` direkt lesend geprüft. Die Projektliste des Connectors ließ dieses Projekt zunächst aus; der direkte Zugriff funktionierte.
- Keine produktiven Schreibtests, Datenänderungen, Deployments oder Anwendungscodeänderungen. Dieser Bericht ist das Ergebnis der Prüfung.

## 1. Was bereits gut ist

**Gestaltung.** Die maritime Karte, eigene Inselmotive, Produktbilder und die dunkle THITRONIK-Typografie ergeben einen wiedererkennbaren Auftritt. Die Quizansicht ist auf dem Telefon ruhig und verständlich. Richtig und falsch werden zusätzlich zur Farbe beschriftet. Fortschritt, Erklärungen und Wiederholung falscher Fragen unterstützen das Lernen.

**Fragen.** Beratungsfälle, Montageentscheidungen und Fehlersuche sind sinnvoller als reine Artikelnummernabfragen. Die Erklärungen gehen häufig darauf ein, warum eine falsche Antwort naheliegt. Bild-, Ton- und Zuordnungsaufgaben ergänzen die Textfragen. Die Antworten werden gemischt; die häufige richtige Option `b` in den JSON-Dateien ist deshalb kein verlässlicher Lösungstrick.

**Technik.** Die statische Architektur passt zum Einsatzzweck. Ergebnisse werden serverseitig neu bewertet. Der Sende-Ausgang berücksichtigt Verbindungsprobleme. Die vollständige Prüfung mit `node tools/montag.js --ohne-server` war erfolgreich: Syntax, Elementverweise, Fragen, Medien, Audio, Arbeitskarte, responsive Bedienung, Bewertungslogik, Feedback, Supabase-Verträge, THI und beide Paketformen.

Die 39 Supabase-Prüfungen untersuchen allerdings SQL-Texte und Sicherheitsverträge, nicht die tatsächlich installierte Datenbank. Grüne Tests ersetzen hier keinen Schemaabgleich.

## 2. Supabase: Zugangsschutz gut, fachlich noch nicht vollständig korrekt

### Direkt bestätigt

- Drei Campus-Rohdatentabellen vorhanden, jeweils RLS aktiv.
- Keine SELECT-, INSERT-, UPDATE-, DELETE- oder TRUNCATE-Rechte für `anon` und `authenticated` auf den geprüften Campus-Tabellen und -Views.
- Alle fünf Campus-Views haben `security_invoker=on`.
- Die geprüften Campus-Funktionen sind für beide Browserrollen nicht ausführbar.
- Der Security Advisor meldet keine WARN- oder ERROR-Befunde. Seine drei INFO-Hinweise „RLS Enabled No Policy“ passen zum beabsichtigten rein serverseitigen Zugriff. [Supabase erläutert diesen Hinweis](https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy).
- `campus-aufbewahrung` ist aktiv und läuft täglich um 03:30 UTC. Die Läufe vom 4. und 5. September waren erfolgreich. Das beweist die Ausführung, nicht die Vollständigkeit der Anonymisierung.
- Bestand zum Prüfzeitpunkt: zwei Quiz-Einsendungen, ein Feedbackbogen, 16 Einzelbewertungen. Punktzahl, Prozentwert und Antwortanzahl der zwei Quizdatensätze sind konsistent. Dieser Bestand reicht nicht für eine statistische Bewertung der Fragen.
- Der Performance Advisor meldet nur unbenutzte Indizes. Bei diesem kleinen Bestand besteht daraus kein sinnvoller Löschbedarf. [Hinweis zu unbenutzten Indizes](https://supabase.com/docs/guides/database/database-linter?lint=0005_unused_index).

### P1: Live-View schließt gültiges Feedback aus

In `public.campus_quiz_und_feedback` steht live der Ausdruck `'^\\d{5}$'`: zwei Backslashes im SQL-String. Unter der hier wirksamen Zeichenkettenbehandlung erkennt er keine fünfstellige Händlernummer. Gegenprobe mit dem synthetischen Wert `12345`: installierter Ausdruck `false`, `[0-9]{5}` dagegen `true`. Der eine vorhandene, ansonsten passende Feedbackbogen fällt dadurch aus dem Feedbackteil der Verknüpfung.

Im aktuellen Repository steht an dieser Stelle bereits ein einzelner Backslash. Es handelt sich um eine Abweichung zwischen Installation und Quellstand. Die View sollte kontrolliert aktualisiert und anschließend mit einem lesenden Mengenvergleich geprüft werden. Ein Neuaufbau der Datenbank ist dafür nicht nötig.

Quelle: `Campus Quiz/supabase_campus_quiz_migration.sql`, insbesondere Zeilen 189–222; installierte Definition direkt aus `pg_views` gelesen.

### P1: Anonymisierung übersieht Bewertungskommentare

`campus_daten_anonymisieren()` entfernt Namen und Freitexte aus `campus_feedback`, lässt aber `campus_feedback_ratings.comment` unverändert. Die Spalte nimmt bis zu 2000 Zeichen Freitext auf und kann Namen oder andere identifizierende Angaben enthalten. Die installierte Funktion hat dieselbe Lücke wie das Repository. Derzeit sind keine Bewertungskommentare gespeichert; die Lücke betrifft zukünftige Einsendungen.

Korrektur: Kommentare der betroffenen Feedbackbögen mitbereinigen, einschließlich eventuell bereits anonymisierter Hauptdatensätze. Verbleibende Kennungen und frei angelieferte Felder wie `page_url` ebenfalls auf den vorgesehenen Restdatenumfang prüfen.

Quellen: `supabase_campus_aufbewahrung_migration.sql:83` und `:98`; `supabase_campus_basis_migration.sql:118`.

### P1: Einwilligungsnachweis endet im Browser

Die Oberfläche verlangt eine Einwilligung, aber `privacyAccepted` bleibt im lokalen Profil. Der Quiz-Payload überträgt weder Zeitpunkt noch Textfassung; die geprüften Rohdatentabellen enthalten keine entsprechenden Nachweisspalten. Das ist bereits in `DATENSCHUTZ.md` als offen dokumentiert.

Empfehlung: Einwilligungszeitpunkt und Hinweisfassung als durchgängigen Vertrag von Oberfläche über Annahme-Functions bis Datenbank ergänzen. Auch den separat erreichbaren Feedbackweg berücksichtigen. Dies ist ein technischer Befund zum Nachweis, keine vollständige rechtliche Prüfung.

Quellen: `public/assets/engine.js:3073`, `:3382`; `DATENSCHUTZ.md`, Abschnitt zum Einwilligungsnachweis.

### P2: Kennzahlen haben missverständliche Definitionen

- `count(*) AS inseln_absolviert` zählt Einsendungen je Händlernummer, keine unterschiedlichen Inseln. Zwei Personen desselben Betriebs oder ein erneuter vollständiger Durchlauf erhöhen den Wert. Für Händlerabdeckung wäre `count(distinct island)` sinnvoll; Personenfortschritt benötigt eine eigene Definition und Zuordnung.
- `max(overall_rating)` und `max(recommendation)` wählen Texte nach Sortierreihenfolge. Das ist weder die neueste Bewertung noch eine fachlich definierte Zusammenfassung.
- `campus_quiz_fragen` gruppiert ohne `quiz_version`. Geänderte Fragen mit gleicher ID werden gemeinsam ausgewertet.
- Nach der Anonymisierung erhalten alle Händlernummern `00000`. Die bestehenden Händlerzählungen behandeln alte Einsendungen dann als einen Händler; die gemeinsame View kann unzusammengehörige historische Datensätze zusammenfassen. Anonymisierte Daten benötigen eine eigene Auswertungsregel.
- Die Grenze von fünf Einsendungen im Langdock-Endpunkt garantiert keine fünf verschiedenen Personen. Wiederholungen können die Grenze ebenfalls erreichen.

Quellen: `supabase_campus_quiz_migration.sql:150`, `:194`, `:203`; `supabase_campus_aufbewahrung_migration.sql:73`; `supabase_campus_auswertung_migration.sql`.

## 3. Fragen: gute Grundlage, gezielt redigieren

### P1: USE-01 bestraft eine plausible Bedarfslösung

Die Frage lautet „Welche Komponenten brauchst du?“ und verlangt WiPro, Pro-finder, NFC-Modul, Zugangsmedium **und** Fingerprint. Die Erklärung beschreibt NFC und Fingerprint dagegen als zwei alternative Zugangswege. Wer eine vollständige NFC-Lösung auswählt, wird ohne zusätzlichen Fingerprint als falsch bewertet. Der interne Hinweis nennt den Fingerprint zudem noch eine falsche Option, während die Lösung ihn verlangt.

Saubere Varianten: entweder nach allen passenden Beratungsoptionen fragen oder ein konkretes Zugangsszenario vorgeben und nur dessen notwendige Komponenten verlangen. Danach Fragenversion erhöhen.

Quelle: `public/data/inseln/usedom.json:45`.

### P1: Quiz und THI können widersprüchlich lehren

FEH-05 erlaubt den Feuerzeuggas-Test; Teile des ausgelieferten THI-Wissens untersagen ihn. FEH-04 nennt etwa 12,0 V zur Rückkehr des Pro-finders in den Normalbetrieb; der THI-Artikel nennt 12,5 V. Andere FAQ-Texte im THI-Bestand weichen wiederum von den zusammengefassten Artikeln ab.

Die interne Entscheidung zugunsten des Quizstands vom 31. August ist dokumentiert. Der Befund lautet deshalb nicht, dass diese Entscheidung falsch sei, sondern dass die Wissensquellen nicht nachgezogen wurden. Ein Teilnehmer kann vom Quiz und vom Assistenten gegensätzliche Antworten bekommen. Fachlich freigegebenen Stand mit Revision und Datum festlegen und in beiden Systemen synchronisieren.

Quellen: `public/data/inseln/fehmarn.json:16`, `:72`, `:121`; ausgeliefertes `netlify/functions/thi-wissen/artikel.de.json`.

### P2: Weitere redaktionelle Verbesserungen

- **SAM-09:** Die Auflösung zur GPS-Antenne verwendet nach eigenem Redaktionshinweis eine GSM-Antenne. Durch ein passendes Originalfoto ersetzen.
- **VEJ-06 und VEJ-10:** Beide fragen nahezu gleich nach dem Mitführen des Fahrzeugschlüssels. Eine davon durch einen anderen Anwendungsfall ersetzen; zwei von zehn Fragen gewichten sonst denselben Kernpunkt.
- **FEH-09:** Aus „Meine Frau bekommt die Alarm-SMS, ich nie“ lässt sich die verlangte Ursache nicht eindeutig ableiten. Die eigene Erklärung nennt einen zu früh beendeten Testalarm als zweite mögliche Ursache. Besser nach dem nächsten Prüfschritt fragen oder zusätzliche Diagnoseinformationen geben.
- **POEL:** Viele Fragen prüfen Fundorte und Dokumentenwahl. Eine reale Suchaufgabe mit einem konkreten Fahrzeugfall würde den Transfer besser zeigen als zusätzliche Menüabfragen.
- Erklärungen sind hilfreich, auf dem Telefon aber teilweise sehr lang. Erst Kernaussage und nächste Handlung zeigen, Vertiefung aufklappbar anbieten.

Die 70 Fragen sollten vor der Veranstaltung fachlich gegen freigegebene Produktunterlagen abgenommen werden. Diese Prüfung hat die interne Konsistenz untersucht, nicht sämtliche Produktwerte extern zertifiziert.

## 4. Design: Grundkonzept behalten, Einstieg erleichtern

Die Desktop-Karte wirkt eigenständig und übersichtlich. Die mobile Inselwahl und die eigentliche Quizansicht sind grundsätzlich brauchbar. In den geprüften Kartenansichten bei 390 und 768 Pixeln trat kein horizontaler Seitenüberlauf auf.

Konkrete Verbesserungen:

1. **Quizstart früher sichtbar machen.** Bei 390 × 844 füllt die VEJRØ-Bühne einen großen Teil des Bildschirms; unter ihr folgt noch die Teilnehmerkarte, bevor der Startknopf kommt. Eine kompakte mobile Bühne mit unmittelbar sichtbarem Startknopf würde den Weg verkürzen.
2. **Foto später anbieten.** Das optionale Profilfoto steht vor den Pflichtfeldern. Die mobile Erstansicht zeigt deshalb den Abschlussknopf noch nicht. Foto nach dem Einstieg anbieten; gespeicherten Profilen einen kürzeren Wiedereinstieg geben.
3. **44-Pixel-Regel konsequent anwenden.** Gemessen: Fotoknöpfe rund 35,2 Pixel hoch, Profileingaben rund 41,6 Pixel. Ursache ist `zoom: .8` bei festen CSS-Mindesthöhen von 44 bzw. 52 Pixeln. Das unterschreitet die eigene Projektvorgabe trotz grüner UI-Vertragsprüfung.
4. **Navigation vereinheitlichen.** Auf der Karte gibt es beschriftete mobile Navigationsfelder, auf Inseln bei 390 Pixeln nur Symbole im Kopf. Kurze sichtbare Bezeichnungen würden die Wiedererkennung verbessern; zugängliche Namen sind dort bereits vorhanden.
5. **QR-Ziel erhalten.** Im Gesamtpaket führt auch ein direkter Insel-Link nach der Profileinrichtung zur Karte. Das ist ausdrücklich implementiert, aber für einen QR-Code an einer bestimmten Station umständlich. Das ursprüngliche Ziel könnte nach dem Profil fortgesetzt werden.

Quellen: Browsermessungen; `public/assets/styles.css:680`, `:712`; `public/assets/engine.js:790`.

## 5. Sinnvolle Erweiterungen in dieser Reihenfolge

1. **Verlässliche Lernanalyse:** Zeitraum und Fragenversion, klare Trennung von Einsendungen, Personen und Betrieben sowie Erstversuchen und Wiederholungen. Erst darauf belastbare Empfehlungen für die Schulungsleitung aufbauen.
2. **Gemeinsamer Freigabestand für Quiz und THI:** Quelle, Revision, fachlich verantwortliche Person und Freigabedatum je kritischem Thema. Vor Veranstaltungen gezielt die überfälligen Inhalte anzeigen.
3. **Kurze Nachlernstrecke:** Aus falsch beantworteten Themen drei gezielte Übungen und passende Wissensartikel zusammenstellen. Die vorhandene Wiederholungsfunktion ist dafür eine gute Grundlage.
4. **Station direkt öffnen und schnell starten:** QR-Ziel nach Profileinrichtung fortsetzen, optionales Foto verschieben und mobile Bühne verkürzen.
5. **Langdock fertig abnehmen:** Vorhandene Anbindung und Betriebsprotokoll aus dem offenen Zweig konsolidieren; keine zweite Integration daneben bauen.

Zusätzliche Gamification oder ein größeres Framework wären derzeit weniger wertvoll als diese Verbesserungen.

## Grenzen und nächster Schritt

Kein Produktiv-Schreibtest, kein Live-Test der kostenpflichtigen THI-Antworten und keine vollständige Prüfung von Netlify-Umgebungsvariablen oder realen Mobilgeräten. Die direkt gelesenen Rechte und Funktionen belegen den beschriebenen Datenbankstand; sie ersetzen keinen Ende-zu-Ende-Test des produktiven Speicherns.

Empfohlene erste Arbeitseinheit: Live-View und Anonymisierung korrigieren, Einwilligungsnachweis ergänzen und USE-01 präzisieren. Änderungen anschließend mit gezielten Datenbanktests und dem vorhandenen Gesamtprüflauf absichern.
