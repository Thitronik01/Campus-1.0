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

| | Stand 3. September 2026 |
|---|---|
| **Datenschutzhinweis** | Umgesetzt und live. Die Einwilligung nach Art. 6 Abs. 1 lit. a wird beim Anlegen des Profils eingeholt, die Speicherdauer beträgt zwölf Monate, und die Aufräumroutine in der Datenbank setzt sie durch. Siehe [`Campus Quiz/DATENSCHUTZ.md`](Campus%20Quiz/DATENSCHUTZ.md). |
| **Löschweg** | Umgesetzt mit Pull Request #92. Der Knopf „Lokale Campusdaten löschen" räumt Profil, Inselstand und Ausgang von diesem Gerät. Der serverseitige Weg nach einem Widerruf ist in `DATENSCHUTZ.md` beschrieben, aber Handarbeit im SQL-Editor. |
| **Bremse an den Annahme-Functions** | Umgesetzt mit Pull Request #91: Herkunftsprüfung und Ratenbegrenzung in `netlify/functions/campus-schutz.js`. |

Alle drei Punkte sind entschieden. Der Campus soll frühestens im November 2026
spielbar sein — bis dahin bleibt Zeit für die Belege zu den
Auftragsverarbeitern und den Nachweis der Einwilligung, beide in
`DATENSCHUTZ.md` beschrieben.

---

## Wo es steht — 3. September 2026, 15:30 Uhr

| | |
|---|---|
| Datenschutzhinweis | **live** unter `https://thitronik-campus.netlify.app/datenschutz/`, Fassung 1.0 |
| `SUPABASE_URL`, `SUPABASE_SECRET_KEY` in Netlify | **gesetzt**, Schlüssel nur im Production-Kontext |
| Deploy mit den Variablen | **erfolgt**, 15:16 Uhr, `Site is live` |
| Alle vier Migrationen | **eingespielt** — Basis, Quiz, Aufbewahrung, Auswertung |
| Zwölf-Monats-Frist | **läuft** — Job `campus-aufbewahrung`, täglich 03:30 UTC, aktiv |
| Endpunkt `campus-auswertung` | **ausgerollt**, Version 1, ACTIVE — antwortet `503`, solange das Token fehlt |
| Security-Advisor | keine Warnung mehr; drei gewollte INFO-Zeilen „RLS Enabled No Policy" |
| Bestand | **0 Zeilen** in Quiz und Feedback |

### Was als Nächstes zu tun ist

**1. Den ersten echten Durchlauf machen** — Schritt B4 unten. Eine Insel ohne
`?demo=1` durchspielen, in Supabase nachsehen, ob Zeile und Bewertung stimmen,
und die Testzeile danach löschen. Sie trägt einen echten Namen, und die
Aufbewahrungsfrist greift erst in zwölf Monaten.

**2. Für Langdock das Token setzen.** Der Endpunkt steht, aber ohne
Function Secret antwortet er auf jede Anfrage mit `503`:

```bash
openssl rand -base64 32
supabase secrets set CAMPUS_AUSWERTUNG_TOKEN=<der erzeugte Wert> --project-ref pstohdeknhgsywmogmiu
```

Denselben Wert in Langdock ins Passwortfeld der Verbindung eintragen. Danach
muss ein Aufruf **ohne** `Authorization`-Kopf `401` liefern — diese Probe
gehört dazu, denn ein offener Endpunkt fällt sonst erst auf, wenn Daten drin
sind. Der vollständige Ablauf steht in
[`Campus Quiz/SUPABASE-NEUAUFBAU.md`](Campus%20Quiz/SUPABASE-NEUAUFBAU.md),
Schritt 5c.

**3. Offen bleiben zwei Datenschutzpunkte** aus
[`Campus Quiz/DATENSCHUTZ.md`](Campus%20Quiz/DATENSCHUTZ.md): die Belege zu
den Auftragsverarbeitern und der Nachweis der Einwilligung, der heute nur im
Browser liegt. Beide haben bis November Zeit, keiner blockiert den Betrieb.

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

Projekt: `pstohdeknhgsywmogmiu` (thitronik-campus, Frankfurt).

> **Die Anleitung dazu steht nicht hier.** Sie steht in
> [`Campus Quiz/SUPABASE-NEUAUFBAU.md`](Campus%20Quiz/SUPABASE-NEUAUFBAU.md),
> und zwar vollständig: Reihenfolge der Migrationen, die Prüfabfragen mit
> ihren erwarteten Ergebnissen und das Betriebsprotokoll, das festhält, was
> wann tatsächlich lief. Bis September 2026 stand hier eine zweite Fassung
> desselben Ablaufs — mit dem alten Projekt `mhzlayhnyqlxdyiceyqz` und den
> Dateien `supabase_v11_migration.sql` und `supabase_v14_migration.sql`.
> **Diese beiden Dateien dürfen im neuen Projekt nicht laufen**; sie setzen
> Tabellen des Altprojekts voraus. Wer der veralteten Fassung gefolgt wäre,
> hätte im falschen Projekt gearbeitet.

### B1. Migrationen einspielen

`SUPABASE-NEUAUFBAU.md`, Schritte 1 bis 3. Kurzfassung der Reihenfolge:

1. `Campus Quiz/supabase_campus_basis_migration.sql` — erledigt 03.09.2026
2. `Campus Quiz/supabase_campus_quiz_migration.sql` — erledigt 03.09.2026
3. `Campus Quiz/supabase_campus_aufbewahrung_migration.sql` — erledigt 03.09.2026
4. `Campus Quiz/supabase_campus_auswertung_migration.sql` — erledigt 03.09.2026
5. `Campus Quiz/supabase_campus_haertung_migration.sql` — erledigt 03.09.2026,
   Nachtrag zu einem Advisor-Befund

Die Rechteprüfungen nach jedem Schritt stehen im Neuaufbau-Protokoll. Die
wichtigste in einem Satz: Kommt bei der Abfrage nach Rechten für `anon` oder
`authenticated` auch nur **eine** Zeile zurück, ist der Riegel nicht gesetzt —
dann nicht weitermachen.

### B2. Zwei Umgebungsvariablen setzen — erledigt 03.09.2026

| Variable | Wert |
|---|---|
| `SUPABASE_URL` | `https://pstohdeknhgsywmogmiu.supabase.co` |
| `SUPABASE_SECRET_KEY` | Secret Key aus dem Projekt, nur im Kontext **Production** |

**Der Secret Key umgeht Row Level Security.** Er gehört ausschließlich in die
Netlify-Umgebungsvariablen — niemals ins Repository, niemals in Browser-Code.

Der Schlüssel steht bewusst nur im Production-Kontext. Läge er auch in Deploy
Previews, schriebe jeder Testaufbau aus einem Pull Request echte
Teilnehmerzeilen in dieselbe Datenbank.

### B3. Neu deployen — erledigt 03.09.2026, 15:16 Uhr

Ohne neuen Deploy sehen die Functions die Variablen nicht.

### B4. Prüfen — zuerst ohne Datenbank, dann mit

1. **`/quiz/hiddensee?demo=1`** vollständig durchspielen.
   Der Vorschaumodus speichert absichtlich nichts. Die Fußzeile sagt das:
   *„Vorschaumodus: nichts wird gespeichert"*.
2. Danach **einmal ohne `?demo=1`** durchspielen.
3. In Supabase nachsehen:

```sql
select created_at, island, participant, dealer, dealer_number, score, total
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

6. **Die Testzeile wieder entfernen.** Sie trägt einen echten Namen, und die
   Aufbewahrungsfrist greift erst in zwölf Monaten:

```sql
delete from public.campus_quiz_submissions where session_id = '…';
```

### B5. Danach: Netlify Forms

Der Pilotweg über Netlify Forms bleibt als Sicherheitsnetz bestehen und
schadet nicht. Er darf abgeschaltet werden, sobald ein paar Tage lang
zuverlässig in Supabase geschrieben wurde. Vorher nicht — ein Netz nimmt man
nicht weg, solange man es noch braucht.

**Eine Nebenwirkung, die man kennen sollte:** Der Forms-Rückfallweg umgeht die
serverseitige Bewertung. Was dort ankommt, ist das vom Browser gemeldete
Ergebnis. Für die Auswertung zählt allein, was in Supabase steht.

**Und eine zweite, die den Datenschutz betrifft:** Was in Netlify Forms liegt,
erreicht die Aufräumroutine der Datenbank nicht. Die Zwölf-Monats-Frist gilt
dort nur, wenn jemand die Einträge von Hand räumt.

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
