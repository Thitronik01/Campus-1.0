# THITRONIK Campus auf Netlify

Dieses Repository ist für eine gemeinsame Netlify-Site vorbereitet:

- `/quiz` zeigt die Campus-Karte mit allen sieben Wissensinseln.
- `/quiz/<insel>` öffnet die jeweilige Insel direkt.
- `/feedback/` ist der Tagesabschluss.
- `/arbeitskarte/` ist die digitale Arbeitskarte.
- `/datenschutz/` ist der Datenschutzhinweis nach Art. 13 DSGVO. Beide Einwilligungsdialoge verlinken dorthin, er darf also nicht wegfallen.
- Quiz-Ergebnisse und Feedback werden immer zuerst an geschützte Netlify Functions gesendet.
- Supabase ist seit dem 03.09.2026 eingerichtet; beide Functions speichern dort — siehe `Campus Quiz/SUPABASE-NEUAUFBAU.md`. Für Quiz-Ergebnisse gibt es seit Engine 1.47 keinen Ausweichweg über Netlify Forms mehr: Lehnt die Datenbank ab, bleibt das Ergebnis im Sende-Ausgang auf dem Gerät. Nur der Feedbackbogen hat diesen Ausweichweg noch.
- Langdock wertet über die Supabase-Views aus, nicht über Netlify Forms.

## Empfohlener Weg: Git-Deployment

1. Das Repository zu GitHub, GitLab oder Bitbucket übertragen.
2. In Netlify **Add new site → Import an existing project** wählen.
3. Dieses Repository verbinden. Build-Befehl und Publish-Verzeichnis nicht von Hand überschreiben; sie stehen bereits in `netlify.toml`.
4. Unter **Forms → Enable form detection** die Formularerkennung aktivieren.
5. Einen neuen Deploy auslösen, damit Netlify das Feedback-Formular erkennt.

Die Formularerkennung bleibt aktiv, weil der Feedbackbogen Netlify Forms
noch als Ausweichweg nutzt; das Quiz tut das seit Engine 1.47 nicht mehr.
Für den Betrieb werden die Supabase-Umgebungsvariablen gebraucht; welche das
sind, steht in `Campus Quiz/SUPABASE-NEUAUFBAU.md`. Sie greifen erst nach
einem neuen Deploy.

## Direkt nach dem Deploy prüfen

1. `/quiz?demo=1` öffnen und eine Insel als Vorschau durchspielen.
2. Danach einmal ohne `?demo=1` testen.
3. `/feedback/?demo=1` als Vorschau prüfen, danach einmal regulär absenden.
4. In Supabase muss danach eine neue Zeile in `campus_quiz_submissions` und eine in `campus_feedback` stehen — dort nachzählen, nicht dem Bildschirm glauben (`INBETRIEBNAHME.md`, „Drei Fallen").
5. In Netlify unter **Forms** muss `campus-feedback` erscheinen; ein Formular `campus-quiz-result` gibt es seit Engine 1.47 nicht mehr.

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
die Konfiguration und schreiben direkt nach Supabase. Ist Supabase nicht
konfiguriert oder vorübergehend nicht erreichbar, behält das Quiz das Ergebnis
im Sende-Ausgang auf dem Gerät; nur der Feedbackbogen weicht dann noch auf
Netlify Forms aus. Der Langdock-Agent greift auf Supabase zu; er braucht keinen
Zugang zu Netlify Forms.

Der Secret Key gehört ausschließlich in die Netlify-Umgebungsvariablen und nie in Browser-Code oder Git.

## Fertiges lokales Veröffentlichungspaket

`node "Campus Quiz/tools/montag.js" --ohne-server` baut und prüft das komplette Paket. Das Ergebnis liegt anschließend unter `Campus Gesamtpaket/`.
