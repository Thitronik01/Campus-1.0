# Integrationsplan: Supabase und Langdock

Stand: 26. August 2026

Ziel ist eine sichere, nachvollziehbare Auswertung. Das Quiz und der
Feedbackbogen bleiben dabei unabhängig von Langdock funktionsfähig.

## Was bereits vorbereitet ist

- Der Feedbackbogen sendet über die RPC `submit_campus_feedback(jsonb)`.
- Das Quiz sendet über die serverseitige Netlify-Funktion `submit-quiz`.
- Für Quizdaten liegt `supabase_campus_quiz_migration.sql` bereit.
- Für den Feedbackbogen liegen die noch offenen Abschnitte 1 und 2 in
  `Feedbackbogen/supabase_v14_migration.sql` bereit.
- Skalenbewusste Feedback-Views und eine gemeinsame Quiz-und-Feedback-View sind
  bereits im SQL entworfen.

Noch nicht durchgeführt werden Datenbankmigrationen, Langdock-Zugriffe oder
produktive Schlüsseländerungen.

## Empfohlene Architektur

```text
Campus im Browser
  -> Netlify-Funktion oder Supabase-RPC
  -> geschützte Rohdaten in Supabase
  -> freigegebene, aggregierte Auswertungs-View
  -> schmaler serverseitiger Lese-Endpunkt
  -> Langdock Workflow oder Agent
  -> Auswertung mit Quellenstand und Zeitraum
```

Langdock wird nicht direkt aus dem Browser aufgerufen. Langdock blockiert
Browseraufrufe seiner API bewusst zum Schutz von API-Schlüsseln. Supabase weist
ebenfalls darauf hin, geheime oder Service-Role-Schlüssel ausschließlich
serverseitig zu verwenden.

## Phase 1: Datenbasis stabilisieren

1. Die offene Feedback-Migration zuerst in einer Sicherung oder Staging-Umgebung
   testen und anschließend produktiv einspielen.
2. Die Quiz-Migration einspielen und mit einer Demo-Einsendung prüfen.
3. Berechtigungen und RLS kontrollieren. `anon` darf keine Rohdaten lesen.
4. Die vorhandenen Auswertungs-Views mit bekannten Testfällen verifizieren.
5. Die dokumentierte Testeinsendung aus produktiven Kennzahlen ausschließen
   oder nach Freigabe löschen.

Abnahmekriterium: Quiz und Feedback werden zuverlässig gespeichert, alte und
neue Feedbackskalen ergeben vergleichbare Kennzahlen und Rohdaten sind nicht
öffentlich lesbar.

## Phase 2: Datenschutzarme Auswertungsschnittstelle

Eine neue View liefert nur die Daten, die Langdock wirklich benötigt:

- Zeitraum und Insel
- Anzahl Einsendungen
- durchschnittlicher Quizwert
- häufig falsch beantwortete Fragen
- aggregierte Feedbackwerte auf einheitlicher Skala
- Themen aus Freitexten erst ab einer festgelegten Mindestmenge

Nicht an Langdock gehen standardmäßig Name, Händlernummer, Händlername,
Session-ID oder vollständige Roh-Payloads. Kleine Gruppen werden unterdrückt,
damit einzelne Personen nicht aus Kombinationen erkannt werden können.

Der Zugriff erfolgt bevorzugt über eine kleine Supabase Edge Function mit
eigenem Dienstschlüssel und einer festen Antwortstruktur. Supabase beschreibt
Edge Functions ausdrücklich als serverseitigen Ort für Drittanbieteraufrufe
und Geheimnisse.

## Phase 3: Langdock-Pilot

Für den ersten Pilot reicht ein Langdock Workflow:

1. manueller oder täglicher Start
2. HTTP Request an den geschützten Auswertungs-Endpunkt
3. Agent fasst Erkenntnisse strukturiert zusammen
4. menschliche Freigabe vor Versand oder Veröffentlichung

Die Ausgabe sollte immer Zeitraum, Datenstand, Stichprobengröße und verwendete
Views nennen. Empfohlene erste Fragen:

- Welche drei Fragen verursachen je Insel die meisten Fehlannahmen?
- Wo passen schwache Quizwerte und kritisches Feedback zusammen?
- Welche Themen sollten im nächsten Campus stärker erklärt werden?
- Welche Aussagen beruhen auf zu kleinen Stichproben und dürfen nicht bewertet
  werden?

## MCP nur für Entwicklung

Langdock führt den offiziellen Supabase-MCP-Server in seinem Verzeichnis. Für
Produktivdaten ist er hier trotzdem nicht die erste Wahl: Supabase beschreibt
seinen MCP-Server als Werkzeug für Entwicklung und Tests und empfiehlt, ihn
nicht mit Produktionsdaten zu verbinden. Falls er für die technische
Vorbereitung genutzt wird, dann nur projektgebunden, read-only und mit auf die
nötigen Funktionsgruppen begrenztem Zugriff.

## Nicht in dieser Runde

- keine produktive Migration
- keine Langdock-API-Schlüssel im Repository oder Browser
- kein direkter Langdock-Zugriff auf Rohdaten
- kein automatisches Versenden von KI-Auswertungen
- keine individuelle Bewertung von Teilnehmenden oder Händlern

## Offizielle Grundlagen

- [Langdock: MCP-Server verbinden](https://docs.langdock.com/de/product/integrations/mcp-directory)
- [Langdock: Workflows mit HTTP Requests](https://docs.langdock.com/product/workflows/use-cases/finance)
- [Langdock: Unternehmenswissen und Berechtigungen](https://docs.langdock.com/de/product/chat/company-knowledge)
- [Supabase: MCP-Sicherheitsregeln](https://supabase.com/docs/guides/ai-tools/mcp)
- [Supabase: Edge Functions](https://supabase.com/docs/guides/functions)
- [Supabase: Geheimnisse in Edge Functions](https://supabase.com/docs/guides/functions/secrets)
- [Supabase: Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
