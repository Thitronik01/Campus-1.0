# THITRONIK Campus auf Netlify

Dieses Repository ist für eine gemeinsame Netlify-Site vorbereitet:

- `/quiz` zeigt die Campus-Karte mit allen sieben Wissensinseln.
- `/quiz/<insel>` öffnet die jeweilige Insel direkt.
- `/feedback/` ist der Tagesabschluss.
- Quiz-Ergebnisse und Feedback werden immer zuerst an geschützte Netlify Functions gesendet.
- Solange Supabase noch nicht eingerichtet ist, dienen Netlify Forms nur als Pilot-Sicherheitsnetz.
- Sobald Supabase eingerichtet ist, speichern beide Functions automatisch dort. Langdock kann anschließend direkt auf den vorhandenen Supabase-Views auswerten.

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
5. Für den datenbanklosen Pilotstand eine CSV exportieren und prüfen, ob Name, Händlernummer, Insel und Ergebnis beziehungsweise Feedback enthalten sind.

## Später: THI aktivieren

Der Assistent ist eingebaut, aber ohne Schlüssel stumm. Zum Aktivieren in
Netlify unter **Site configuration → Environment variables**:

| Variable | Wert |
|---|---|
| `ANYMIZE_API_KEY` | der Schlüssel aus dem Anymize-Konto |
| `ANYMIZE_API_URL` | `https://app.anymize.ai/api/v1/llm-anonymous/chat/completions` |
| `THI_MODEL` | `anthropic/claude-sonnet-4.6` |

Danach neu deployen. Der Schlüssel gehört ausschließlich hierher — nie ins
Repository und nie in Browser-Code.

Ohne diese Werte bleibt der Campus vollständig benutzbar; THI meldet im Panel,
dass der Schlüssel fehlt. Alle Einzelheiten in
[`Campus Quiz/THI.md`](Campus%20Quiz/THI.md).

## Später: Supabase aktivieren

Erst nach der Abstimmung der Fragen:

1. `Campus Quiz/supabase_campus_quiz_migration.sql` in Supabase ausführen.
2. `Feedbackbogen/supabase_v11_migration.sql` als Feedback-Grundlage und danach `Feedbackbogen/supabase_v14_migration.sql` ausführen.
3. In Netlify `SUPABASE_URL` und `SUPABASE_SECRET_KEY` als Umgebungsvariablen setzen.
4. Neu deployen.

Danach ist kein Umbau an Quiz oder Feedbackbogen nötig: Die Functions erkennen
die Konfiguration und schreiben direkt nach Supabase. Netlify Forms bleibt nur
der Ausweichweg, falls Supabase nicht konfiguriert oder vorübergehend nicht
erreichbar ist. Der Langdock-Agent greift weiterhin auf Supabase zu; er braucht
keinen Zugang zu Netlify Forms.

Der Secret Key gehört ausschließlich in die Netlify-Umgebungsvariablen und nie in Browser-Code oder Git.

## Fertiges lokales Veröffentlichungspaket

`node "Campus Quiz/tools/montag.js" --ohne-server` baut und prüft das komplette Paket. Das Ergebnis liegt anschließend unter `Campus Gesamtpaket/`.
