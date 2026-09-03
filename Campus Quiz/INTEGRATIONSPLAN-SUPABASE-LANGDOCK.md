# Integrationsplan: Supabase und Langdock

Stand: 3. September 2026

Ziel ist eine sichere, nachvollziehbare Auswertung. Das Quiz und der
Feedbackbogen bleiben dabei unabhängig von Langdock funktionsfähig.

## Entscheidung zum Neuaufbau

Das frühere Projekt `mhzlayhnyqlxdyiceyqz` ist über das verfügbare
Supabase-Konto nicht erreichbar und enthielt nur Testdaten. Es wird nicht
migriert. Das neue Ziel ist `thitronik-campus` in der Organisation
`Thitronik Campus`, Projekt-ID `pstohdeknhgsywmogmiu`, Region Frankfurt.

Die vorhandenen Langdock-Plugins bestätigen zwei eigene Endpunkte im
Altprojekt: `quiz-analytics` mit einem benutzerdefinierten API-Key-Header und
`campus-feedback-langdock` mit einem Bearer-Token. Beide Verbindungen werden
neu aufgebaut; ihre alten Schlüssel werden nicht übernommen.

## Was bereits vorbereitet ist

- Der Feedbackbogen sendet über die RPC `submit_campus_feedback(jsonb)`.
- Das Quiz sendet über die serverseitige Netlify-Funktion `submit-quiz`.
- Für das leere Projekt legt `supabase_campus_basis_migration.sql` die
  vollständige Feedbackbasis im aktuellen v14-Zielstand an.
- Danach legt `supabase_campus_quiz_migration.sql` Quizdaten und gemeinsame
  Views an.
- Ein lokaler Vertragstest prüft RLS, Rechteentzug, `security_invoker`,
  Zielprojekt und das Fehlen destruktiver SQL-Befehle.
- Der manuelle Ablauf und seine erwarteten Resultate stehen vollständig in
  `SUPABASE-NEUAUFBAU.md`.

Beide Datenbankmigrationen sind am 3. September 2026 im neuen Projekt
eingespielt und anhand von RLS, Rollenrechten, View-Eigenschaften und leeren
Startbeständen geprüft worden. Herkunftsprüfung und Ratenbegrenzung der beiden
Schreibfunktionen sowie der lokale Löschweg für die drei Campus-Schlüssel sind
umgesetzt und lokal geprüft. Noch nicht durchgeführt sind Datenschutzhinweis,
Langdock-Endpunkte oder produktive Schlüsseländerungen.

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

**Stand 3. September 2026: Der Datenbankaufbau ist abgeschlossen.** Die drei
Rohdatentabellen haben RLS aktiviert. `anon` und `authenticated` besitzen keine
Tabellenrechte. Alle fünf Auswertungs-Views laufen mit `security_invoker=on`;
Feedback, Bewertungen und Quiz beginnen jeweils mit null Datensätzen. Der
Schreibweg wird erst nach der Codehärtung mit bewusst erzeugten Testdaten
abgenommen.

1. Die vollständige Basismigration im leeren Projekt einspielen und prüfen.
2. Die Quiz-Migration einspielen und alle Rechte erneut prüfen.
3. Berechtigungen und RLS kontrollieren. `anon` darf keine Rohdaten lesen.
4. Die vorhandenen Auswertungs-Views mit bekannten Testfällen verifizieren.
5. Vor einem Schreibtest Herkunftsschutz, Ratenbegrenzung, Datenschutzhinweis
   und lokalen Löschweg fertigstellen.

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

Der Zugriff erfolgt über zwei kleine Supabase Edge Functions mit getrennten
Zugangswerten und festen Antwortstrukturen. Die Trennung entspricht den beiden
bereits in Langdock vorhandenen Aufgaben und ermöglicht, einen Zugang ohne
Ausfall des anderen zu widerrufen. Supabase beschreibt Edge Functions
ausdrücklich als serverseitigen Ort für Drittanbieteraufrufe und Geheimnisse.

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

## Bis zur Datenbank- und Datenschutzabnahme ausgeschlossen

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
