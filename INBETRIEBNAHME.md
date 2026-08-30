# Inbetriebnahme: THI und Supabase scharfschalten

Beides ist eingebaut und läuft ohne Schlüssel im Leerlauf weiter. Dieser
Ablauf macht es scharf. Er ist so geordnet, dass nach jedem Schritt ein
prüfbarer Zustand steht und man an jeder Stelle stehenbleiben kann.

**Reihenfolge: erst THI, dann Supabase.** THI ist die kleinere Änderung —
eine Function, keine Datenbank, kein Datenmodell. Geht dort etwas schief,
merkt man es an einem Chatfenster. Bei Supabase hängen Teilnehmerdaten dran,
und ein Fehler dort ist teurer.

---

## Vorher: eine Entscheidung, die nicht warten kann

Der Deploy schaltet mit Supabase auch die **Speicherung von Klarnamen** scharf
— Name, Betrieb, Händlernummer, Tätigkeitsbereich, alle Antworten. Drei
Punkte dazu sind offen und stehen ausführlich in [`BACKLOG.md`](BACKLOG.md):

| | |
|---|---|
| **Kein Datenschutzhinweis** | Es gibt einen Zwecksatz, aber keinen Verantwortlichen, keine Rechtsgrundlage, keine Speicherdauer, keine Empfänger (Netlify und Supabase), keine Betroffenenrechte. Bei einer Schulung mit Klarnamenpflicht ist das der wahrscheinlichste Beanstandungspunkt. |
| **Kein Löschweg** | Angaben und nicht zugestellte Ergebnisse bleiben dauerhaft im `localStorage`. Auf einem Tablet, das herumgereicht wird, findet der nächste Teilnehmer den Namen des vorigen im Formular. |
| **Keine Bremse an den Annahme-Functions** | `submit-quiz` und `submit-feedback` haben weder Ratenbegrenzung noch Herkunftsprüfung. Die Fragen samt Lösungen liegen öffentlich unter `/data/inseln/`; damit lassen sich beliebig viele Einsendungen unter erfundenen Namen erzeugen. |

Keiner der drei Punkte hindert technisch am Deploy. Aber sie sollten
**bewusst** entschieden und nicht übersehen werden. Der Pilotbetrieb über
Netlify Forms hat dieselben Fragen bereits aufgeworfen — mit Supabase werden
sie nur sichtbarer.

---

## Schritt A — THI

### A1. Drei Umgebungsvariablen setzen

In Netlify unter **Site configuration → Environment variables**:

| Variable | Wert |
|---|---|
| `ANYMIZE_API_KEY` | der Schlüssel aus dem Anymize-Konto |
| `ANYMIZE_API_URL` | `https://app.anymize.ai/api/v1/llm-anonymous/chat/completions` |
| `THI_MODEL` | `anthropic/claude-sonnet-4.6` |

Der Schlüssel gehört ausschließlich hierher. Nicht ins Repository, nicht in
eine Datei im Paket, nicht in Browser-Code.

### A2. Neu deployen

Umgebungsvariablen greifen erst beim nächsten Bau.

### A3. Prüfen

1. Eine Insel öffnen, in der Kopfzeile **THI fragen** anklicken.
2. Eine Frage stellen, deren Antwort im Produktwissen steht — etwa
   *„Wie lerne ich einen Funk-Magnetkontakt an?"*
3. Die Antwort muss fachlich und mit Quellenbezug kommen, nicht allgemein.

**Fehlt der Schlüssel**, sagt das Fenster das ausdrücklich. Die Seite sieht
dann nicht kaputt aus, sie erklärt sich — daran erkennt man diesen Fall
sofort.

### A4. Wenn es klemmt

| Bild | Ursache | Nachsehen |
|---|---|---|
| „Der Schlüssel fehlt" trotz gesetzter Variable | Deploy lief vor dem Setzen | erneut deployen |
| Antwort bricht nach ~60 s ab | Netlify-Zeitgrenze | `THI_ZEITBUDGET_MS` senken (Vorgabe 40000) |
| `MODULE_NOT_FOUND` im Function-Log | Wissensdaten nicht mitverpackt | siehe „Was auf Netlify zu beachten ist" in [`Campus Quiz/THI.md`](Campus%20Quiz/THI.md) |
| 400 vom Anymize-Dienst | Der `llm-anonymous`-Endpunkt weist `role:"tool"` ab | ist umschifft; falls doch: `THI_TOOLS=false` |

Alle Einzelheiten und alle weiteren Einstellungen stehen in
[`Campus Quiz/THI.md`](Campus%20Quiz/THI.md).

---

## Schritt B — Supabase

Projekt: `mhzlayhnyqlxdyiceyqz` (thitronik-profinder-quiz).
Alle Skripte sind idempotent — mehrfaches Ausführen ist gefahrlos.

### B1. Migrationen einspielen

Im Supabase-SQL-Editor, **in dieser Reihenfolge**:

1. `Feedbackbogen/supabase_v11_migration.sql`
   — laut Kopfzeile bereits am 11.08.2026 angewendet; liegt nur zur
   Wiederherstellung bei. Ein zweiter Lauf schadet nicht.
2. `Feedbackbogen/supabase_v14_migration.sql`
3. `Campus Quiz/supabase_campus_quiz_migration.sql`

> **Warum v14 vor der Quiz-Migration:** Die View `campus_quiz_und_feedback`
> liest die Händlernummer aus `campus_feedback.raw_payload`, weil Abschnitt 1
> von v14 die eigene Spalte erst anlegt. Läuft v14 zuerst, steht die Spalte
> bereit. Die View funktioniert in beiden Reihenfolgen — sauberer ist diese.

### B2. Die Rechte gegenprüfen — das ist der wichtige Teil

Beide Migrationen wurden heute um einen Abschnitt ergänzt, der die
**Auswertungs-Views** verschließt. Ohne ihn wären sie über den öffentlichen
anon-Schlüssel lesbar gewesen, mit Händlernummer, Händlername, Quizschnitt
und Feedbackbewertung Zeile für Zeile. Zwei Voreinstellungen wirkten dabei
zusammen: Eine View läuft in PostgreSQL mit den Rechten ihres **Besitzers**,
nicht des Aufrufers — die RLS der Tabelle greift dadurch nicht —, und
Supabase räumt neuen Objekten im Schema `public` von sich aus Rechte für
`anon` und `authenticated` ein.

Nach dem Einspielen diese beiden Abfragen laufen lassen:

```sql
-- Erwartet: KEINE Zeile.
select table_name, grantee, privilege_type
  from information_schema.role_table_grants
 where table_name in ('campus_quiz_submissions',
                      'campus_quiz_inseln', 'campus_quiz_fragen',
                      'campus_quiz_taetigkeit', 'campus_quiz_und_feedback')
   and grantee in ('anon', 'authenticated');
```

```sql
-- Erwartet: viermal security_invoker=on.
select c.relname, c.reloptions
  from pg_class c join pg_namespace n on n.oid = c.relnamespace
 where n.nspname = 'public' and c.relkind = 'v'
   and c.relname like 'campus_quiz%';
```

Kommt bei der ersten Abfrage eine Zeile zurück, ist der Riegel nicht gesetzt
— dann nicht weitermachen.

> **Folge für die Auswertung:** Wer die Views liest — Langdock etwa —, braucht
> danach den Service Key oder eine eigene Rolle mit ausdrücklichem `grant`.
> Über den anon-Schlüssel geht es nicht mehr, und genau das ist der Zweck.
> Falls Langdock heute mit dem anon-Schlüssel arbeitet, muss das vor dem
> Scharfschalten umgestellt werden.

### B3. Zwei Umgebungsvariablen setzen

| Variable | Wert |
|---|---|
| `SUPABASE_URL` | `https://mhzlayhnyqlxdyiceyqz.supabase.co` |
| `SUPABASE_SECRET_KEY` | der Secret Key aus dem Supabase-Projekt |

**Der Secret Key umgeht Row Level Security.** Er gehört ausschließlich in die
Netlify-Umgebungsvariablen — niemals ins Repository, niemals in Browser-Code.

### B4. Neu deployen

### B5. Prüfen — zuerst ohne Datenbank, dann mit

1. **`/quiz/hiddensee?demo=1`** vollständig durchspielen.
   Der Vorschaumodus speichert absichtlich nichts. Die Fußzeile sagt das:
   *„Vorschaumodus: nichts wird gespeichert"*.
2. Danach **einmal ohne `?demo=1`** durchspielen.
3. In Supabase nachsehen:

```sql
select created_at, island, participant_name, dealer_number, score, total
  from public.campus_quiz_submissions
 order by created_at desc
 limit 5;
```

4. Dasselbe für den Feedbackbogen unter `/feedback/`.
5. Die vier Auswertungs-Views einmal öffnen:

```sql
select * from public.campus_quiz_inseln;
select * from public.campus_quiz_fragen limit 20;
select * from public.campus_quiz_taetigkeit;
select * from public.campus_quiz_und_feedback;
```

### B6. Danach: Netlify Forms

Der Pilotweg über Netlify Forms bleibt als Sicherheitsnetz bestehen und
schadet nicht. Er darf abgeschaltet werden, sobald ein paar Tage lang
zuverlässig in Supabase geschrieben wurde. Vorher nicht — ein Netz nimmt man
nicht weg, solange man es noch braucht.

**Ein Nebenwirkung, die man kennen sollte:** Der Forms-Rückfallweg umgeht die
serverseitige Bewertung. Was dort ankommt, ist das vom Browser gemeldete
Ergebnis. Für die Auswertung zählt allein, was in Supabase steht.

---

## Wenn etwas klemmt

| Bild | Wo nachsehen |
|---|---|
| Quiz meldet „konnte nicht speichern" | Netlify → Functions → `submit-quiz` → Logs |
| Function-Log zeigt 401 / 403 von Supabase | Secret Key falsch oder nicht gesetzt |
| Function-Log zeigt 42501 | Rechte — Abschnitt B2 erneut prüfen |
| Einsendung wird mit 400 abgewiesen | Fragensatz-Version stimmt nicht; `version` in der Insel-JSON gegen die gespeicherte prüfen |
| Ergebnis bleibt im Sende-Ausgang liegen | Der Streifen unter dem Startbildschirm sagt den Grund. „Jetzt senden" versucht es erneut. |

---

## Danach

Der Stand ist damit vollständig: Quiz, Feedbackbogen, Arbeitskarte, THI und
Datenbank. Was danach ansteht, steht nach Schwere geordnet in
[`BACKLOG.md`](BACKLOG.md) — die drei Punkte aus dem Abschnitt ganz oben
zuerst.
