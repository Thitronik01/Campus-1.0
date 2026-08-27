# THITRONIK Campus auf Netlify

Dieses Repository ist für eine gemeinsame Netlify-Site vorbereitet:

- `/quiz` zeigt die Campus-Karte mit allen sieben Wissensinseln.
- `/quiz/<insel>` öffnet die jeweilige Insel direkt.
- `/feedback/` ist der Tagesabschluss.
- Quiz-Ergebnisse und Feedback werden in der Pilotphase über Netlify Forms gesammelt.
- Sobald Supabase später eingerichtet ist, speichert die Quiz-Function dort und behält Netlify Forms als Ausweichweg.

## Empfohlener Weg: Git-Deployment

1. Das Repository zu GitHub, GitLab oder Bitbucket übertragen.
2. In Netlify **Add new site → Import an existing project** wählen.
3. Dieses Repository verbinden. Build-Befehl und Publish-Verzeichnis nicht von Hand überschreiben; sie stehen bereits in `netlify.toml`.
4. Unter **Forms → Enable form detection** die Formularerkennung aktivieren.
5. Einen neuen Deploy auslösen, damit Netlify die beiden Formulare erkennt.

Für die Pilotphase sind keine Datenbank und keine Umgebungsvariablen nötig.

## Direkt nach dem Deploy prüfen

1. `/quiz?demo=1` öffnen und eine Insel als Vorschau durchspielen.
2. Danach einmal ohne `?demo=1` testen.
3. `/feedback/?demo=1` als Vorschau prüfen, danach einmal regulär absenden.
4. In Netlify unter **Forms** müssen danach diese Formulare erscheinen:
   - `campus-quiz-result`
   - `campus-feedback`
5. Eine CSV exportieren und prüfen, ob Name, Händlernummer, Insel und Ergebnis beziehungsweise Feedback enthalten sind.

## Später: Supabase aktivieren

Erst nach der Abstimmung der Fragen:

1. `Campus Quiz/supabase_campus_quiz_migration.sql` in Supabase ausführen.
2. In Netlify `SUPABASE_URL` und `SUPABASE_SECRET_KEY` als Umgebungsvariablen setzen.
3. Neu deployen.

Der Secret Key gehört ausschließlich in die Netlify-Umgebungsvariablen und nie in Browser-Code oder Git.

## Fertiges lokales Veröffentlichungspaket

`node "Campus Quiz/tools/montag.js" --ohne-server` baut und prüft das komplette Paket. Das Ergebnis liegt anschließend unter `Campus Gesamtpaket/`.
