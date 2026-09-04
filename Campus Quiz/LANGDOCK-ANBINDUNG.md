# Langdock an den Campus anbinden

Stand: 4. September 2026

Ziel: Ein Langdock-Agent beantwortet Fragen wie *„Wie viele Betriebe haben
heute VEJRØ gespielt?"* aus echten Zahlen — ohne dass Namen, Händlernummern
oder Session-IDs die Datenbank verlassen.

Der Weg dahin besteht aus vier Schritten, und der erste liegt nicht in
Langdock:

```text
1. Supabase: Zugangswert setzen     <- ohne diesen Schritt antwortet alles mit 503
2. Langdock: Integration anlegen    <- haelt den Zugangswert
3. Langdock: Action anlegen         <- holt die Zahlen
4. Langdock: Agent anlegen          <- erklaert sie
```

Der technische Unterbau steht bereits: Die Datenbankfunktion
`public.campus_auswertung` und die Edge Function `campus-auswertung` sind seit
dem 3. September 2026 ausgerollt. Der Aufbau und die Begründungen dazu stehen
in [`SUPABASE-NEUAUFBAU.md`](SUPABASE-NEUAUFBAU.md), Schritt 5, und in
[`INTEGRATIONSPLAN-SUPABASE-LANGDOCK.md`](INTEGRATIONSPLAN-SUPABASE-LANGDOCK.md).

---

## Was Langdock zu sehen bekommt — und was nicht

| Geht an Langdock | Bleibt in der Datenbank |
|---|---|
| Zeitraum, Zeitzone, Datenstand | Name der teilnehmenden Person |
| Anzahl Einsendungen je Insel | Händlername und Händlernummer |
| Anzahl **Betriebe** je Insel | Session-ID |
| Durchschnitt in Prozent und Sekunden | Einzelne Antworten |
| Anzahl fehlerfreier Durchläufe | Tätigkeitsbereich |
| Anzahl Durchläufe unter 60 Prozent | Roh-Payload der Einsendung |

**Unter fünf Einsendungen je Insel entfallen alle Kennzahlen.** Dann kommt nur
die Anzahl zurück, dazu `kennzahlen_unterdrueckt: true` und der Grund. Die
Grenze steht als Konstante im Rumpf der Datenbankfunktion und ist von außen
nicht abschaltbar — ein Parameter ließe sich auf 1 setzen, und damit wäre der
Schutz kleiner Gruppen weg.

---

## Schritt 1 — Zugangswert in Supabase setzen

**Ohne diesen Schritt ist alles Weitere wirkungslos.** Der Endpunkt steht,
prüft aber ein eigenes Bearer-Token aus den Function Secrets. Fehlt das
Secret, antwortet er auf jede Anfrage mit `503` — auch auf eine mit
erfundenem Token. Geprüft am 4. September 2026:

```bash
curl -s -o /dev/null -w "%{http_code}\n" \
  "https://pstohdeknhgsywmogmiu.supabase.co/functions/v1/campus-auswertung"
# 503
```

Einen Wert erzeugen. Er wird einmal angezeigt und gehört danach an genau zwei
Stellen: in die Function Secrets und in das Passwortfeld der
Langdock-Verbindung. **Nicht in dieses Repository, nicht in einen Chat, nicht
in eine Notiz.**

```bash
openssl rand -base64 32
```

Hinterlegen, entweder im Dashboard unter **Edge Functions → Secrets**
(`https://supabase.com/dashboard/project/pstohdeknhgsywmogmiu/functions/secrets`)
mit dem Schlüssel `CAMPUS_AUSWERTUNG_TOKEN`, oder über die CLI:

```bash
supabase secrets set CAMPUS_AUSWERTUNG_TOKEN=<der erzeugte Wert> --project-ref pstohdeknhgsywmogmiu
```

### Beide Proben gehören dazu

```bash
curl -s -H "Authorization: Bearer <der erzeugte Wert>" \
  "https://pstohdeknhgsywmogmiu.supabase.co/functions/v1/campus-auswertung"
```

Erwartet wird `200` und eine JSON-Antwort mit `zeitraum`, `gesamt` und
`inseln`.

```bash
curl -s -o /dev/null -w "%{http_code}\n" \
  "https://pstohdeknhgsywmogmiu.supabase.co/functions/v1/campus-auswertung"
```

Erwartet wird jetzt `401`, nicht mehr `503`.

Die zweite Probe ist die wichtigere. Solange der Endpunkt `503` sagt, sieht
ein offener Endpunkt genauso aus wie ein geschlossener. Erst wenn `401`
kommt, ist belegt, dass die Prüfung greift — und ein offener Endpunkt fällt
sonst erst auf, wenn Daten drin sind.

---

## Schritt 2 — Integration in Langdock anlegen

In Langdock unter **Integrationen → Add integration**:

| Feld | Wert |
|---|---|
| Name | `THITRONIK Campus` |
| Beschreibung | `Aggregierte Quizzahlen des THITRONIK Campus` |
| Authentifizierung | **API Key** |

Bei der Authentifizierung ein einziges Eingabefeld anlegen:

| Feld-ID | Typ | Beschriftung |
|---|---|---|
| `token` | `PASSWORD` | `Zugangswert für die Campus-Auswertung` |

Die Feld-ID muss `token` heißen — der Action-Code liest sie als
`data.auth.token`. Wer sie anders nennt, muss die Zeile im Code mitziehen.

Beim Verbinden der Integration den in Schritt 1 erzeugten Wert eintragen.
Danach ist er in Langdock nicht mehr lesbar, sondern nur noch ersetzbar. Das
ist gewollt.

---

## Schritt 3 — Action anlegen

**Add Action**, dann:

| Feld | Wert |
|---|---|
| Name | `Quizauswertung abrufen` |
| Beschreibung | `Liefert aggregierte Quizkennzahlen des THITRONIK Campus für einen Zeitraum und optional eine einzelne Insel. Ohne Zeitraum: heute. Enthält keine personenbezogenen Daten.` |

Drei Eingabefelder, alle **optional**:

| Feld-ID | Typ | Beschreibung für das Modell |
|---|---|---|
| `von` | `TEXT` | `Erster Tag des Zeitraums als JJJJ-MM-TT. Leer lassen für heute.` |
| `bis` | `TEXT` | `Letzter Tag des Zeitraums als JJJJ-MM-TT. Leer lassen für heute.` |
| `insel` | `SELECT` | `Kürzel einer einzelnen Insel. Leer lassen für alle sieben.` |

Die Auswahlwerte für `insel`: `vejro`, `poel`, `hiddensee`, `samsoe`,
`fehmarn`, `usedom`, `langeland`.

Ein `SELECT` statt eines Textfelds, weil das Modell sonst „Vejrø" mit
Sonderzeichen schreibt und einen `400` bekommt. Die Beschreibungen sind kein
Beiwerk: Langdock entscheidet allein an ihnen, welche Action es aufruft und
womit es die Felder füllt.

In das Codefeld den Inhalt von
[`langdock/campus-auswertung.action.js`](langdock/campus-auswertung.action.js)
einfügen — vollständig, ohne Auslassung.

**`requires confirmation` ausschalten.** Die Action liest nur, ändert nichts
und gibt keine personenbezogenen Daten heraus. Bliebe die Rückfrage an, müsste
jemand jede einzelne Zahl einzeln bestätigen, und niemand liest eine Rückfrage
zum fünften Mal.

---

## Schritt 4 — Agenten anlegen

Einen Agenten `Campus-Auswertung` anlegen und die Integration verbinden.
Actions einer verbundenen Integration stehen dem Agenten unmittelbar zur
Verfügung; ein eigener Bindeschritt entfällt.

Als Anweisung den Text aus
[`langdock/agent-anweisung.md`](langdock/agent-anweisung.md) übernehmen, den
Teil unter der Überschrift „Zum Einfügen".

Beide Dateien liegen in diesem Repository, weil die Felder in Langdock nicht
versioniert sind. Wer den Text dort ändert, hinterlässt keine Spur — und dann
klingt eine Auswertung im November anders als im September, ohne dass jemand
sagen kann, warum. **Wird in Langdock geändert, wird hier nachgezogen.**

---

## Schritt 5 — Abnahme

Vier Fragen an den Agenten, in dieser Reihenfolge:

| Frage | Erwartet |
|---|---|
| „Wie viele Betriebe haben heute gespielt?" | Antwort mit Zeitraum, Datenstand und der Anzahl. Im Leerstand: `0` — und der Agent sagt das, statt zu schweigen. |
| „Wie war der Schnitt auf Hiddensee im letzten Monat?" | Ruft die Action mit `von`, `bis` und `insel=hiddensee`. |
| „Wie hat Händler 34512 abgeschnitten?" | **Verweigerung mit Begründung.** Kommt hier eine Zahl, stimmt die Anweisung nicht. |
| „Wie war der Schnitt auf einer Insel mit drei Einsendungen?" | Nennt die drei, nennt keinen Schnitt, nennt den Grund. |

Die dritte und die vierte Frage sind die eigentliche Abnahme. Die ersten
beiden prüfen, ob die Leitung steht; diese beiden prüfen, ob der Schutz hält.

> **Solange die Datenbank leer ist**, lässt sich die vierte Frage nicht echt
> prüfen — es gibt keine Insel mit drei Einsendungen. Sie gehört nach dem
> ersten Schulungstag nachgeholt. Bis dahin belegt sie nur, dass der Agent
> nicht erfindet.

---

## Wenn es klemmt

| Bild | Ursache | Was zu tun ist |
|---|---|---|
| „Der Auswertungsendpunkt ist noch nicht scharfgeschaltet" | `CAMPUS_AUSWERTUNG_TOKEN` fehlt | Schritt 1 |
| „Der Zugangswert wird nicht angenommen" | Wert in Langdock falsch oder in Supabase gewechselt | Verbindung in Langdock neu eintragen |
| „Unbekannte Insel" | Modell hat `Vejrø` statt `vejro` geschickt | Feld `insel` ist ein `SELECT`? |
| Agent nennt Zahlen ohne Zeitraum | Anweisung unvollständig übernommen | `agent-anweisung.md`, Abschnitt „Zum Einfügen" |
| Agent schätzt bei unterdrückten Kennzahlen | derselbe Grund | ebenda, Absatz „Unterdrückte Kennzahlen" |
| Alles antwortet, aber überall steht `0` | richtig — die Datenbank ist noch leer | erster echter Durchlauf, [`INBETRIEBNAHME.md`](../INBETRIEBNAHME.md) Schritt B4 |

Im Zweifel zuerst mit `curl` prüfen (Schritt 1). Antwortet der Endpunkt dort
richtig, liegt es an der Langdock-Seite; antwortet er nicht, an Supabase. Das
spart das Suchen in der falschen Hälfte.

---

## Was hier noch nicht steht

**Der Feedback-Endpunkt.** Der Integrationsplan sieht ihn nach demselben
Muster vor, mit einem **eigenen** Zugangswert, damit ein Zugang widerrufen
werden kann, ohne den anderen mitzunehmen. Er wird gebaut, sobald dieser hier
im Betrieb steht — nicht vorher, denn was am ersten Endpunkt noch auffällt,
soll nicht zweimal gebaut sein.

**Ein Workflow statt eines Agenten.** Für einen täglichen Bericht ohne Frage
und Antwort reicht in Langdock ein Workflow mit einem HTTP-Request-Block auf
denselben Endpunkt. Der Agent ist der Weg für Rückfragen, der Workflow der für
Wiederholung. Beide können nebeneinander laufen; sie teilen sich den
Zugangswert.

**Automatischer Versand.** Bleibt ausgeschlossen, solange keine menschliche
Freigabe davor steht — so festgehalten im Integrationsplan.
