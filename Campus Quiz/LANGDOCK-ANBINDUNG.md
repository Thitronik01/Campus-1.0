# Langdock an den Campus anbinden

Stand: 7. September 2026

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

## Wo es steht — 8. September 2026, 14:30 Uhr

| Schritt | |
|---|---|
| 1. `CAMPUS_AUSWERTUNG_TOKEN` in Supabase | **gesetzt.** Aufruf ohne `Authorization` liefert `401`, vorher `503`. |
| 2. Integration `THITRONIK Campus 1.0` | **angelegt**, Auth-Typ API Key, ein Feld `token` (Id `token`), Validation request gegen den Endpunkt |
| 3. Action `Campus-Auswertung abrufen` | **fertig.** Felder `von`, `bis`, `insel`, `bereich`; die Auswahlliste von `bereich` trägt alle vier Werte. Direkttest am 8.9.: `bereich=feedback` → `200` mit `boegen: 2`, `bewertungen: 19`, 16 Positionen, Schnitt 4,63. |
| 4. Agent `Campus-Auswertung` | **Anweisung am 8.9. erneuert.** Die alte kannte weder `bereich` noch `feedback` — deshalb rief der Agent den Feedbackbogen nie ab. |
| 5. Abnahme | **offen** — die vier Fragen sind noch nicht gestellt |

Verbindung im Betrieb ist **`Campus Produktiv 1`**, und sie funktioniert
(`200 OK` im Direkttest am 8.9.). Eine `Campus Produktiv 2` gibt es nicht —
bis zum 8. September stand hier das Gegenteil, und wer danach suchte, suchte
eine Verbindung, die es nie gab.

Der Schreibweg ist am 4. September abgenommen worden: Quizeinsendungen und
ein Feedbackbogen stehen in der Datenbank, serverseitig bewertet.

---

## Was sich am 7. September geändert hat

Die Anbindung stand, beantwortete aber praktisch nichts. Drei Befunde, alle
nachgemessen:

**Die Mindestmenge unterdrückte ausnahmslos alles.** Bei 17 Einsendungen auf
sieben Inseln lag jede einzelne Insel unter der Grenze von fünf. Der Agent
konnte auf keine Frage einen Schnitt nennen — und ein Werkzeug, das auf alles
schweigt, wird nicht benutzt. Die Grenze steht jetzt auf 1, also praktisch
aus. Was das kostet und wie man es zurückdreht, steht im Kopf von
[`supabase_campus_auswertung_migration.sql`](supabase_campus_auswertung_migration.sql).
An ihre Stelle tritt eine Pflicht in der Agentenanweisung: Wer bei drei
Einsendungen einen Schnitt nennt, sagt dazu, dass es drei waren.

**Die Schnittstelle lehrte dem Modell einen Namen, den sie selbst nicht
annahm.** In der Antwort heißt die Insel `SAMSØ` (Feld `code`). Genau dieser
Name kam als Filter zurück und wurde mit „Unbekannte Insel" abgelehnt, weil
der Endpunkt `samsoe` erwartet. Die Action bildet Schreibweisen jetzt selbst
ab — `SAMSØ`, `Samsø`, `Samsoe`, `Insel Fehmarn`, `Pöl` führen alle zum
richtigen Kürzel.

**Das Interessante war gar nicht angeschlossen.** Die Trefferquote je Frage
lag seit dem Aufbau als View in der Datenbank und trug im Kommentar den Satz
„die eigentliche Kernauswertung des Konzepts" — nur führte kein Weg dorthin.
Dasselbe galt für den Tätigkeitsvergleich und für den Feedbackbogen. Alle
drei sind jetzt über den Parameter `bereich` erreichbar.

---

## Was Langdock zu sehen bekommt — und was nicht

Vier Bereiche über **einen** Endpunkt und **eine** Action, gewählt mit dem
Feld `bereich`:

| `bereich` | Datenbankfunktion | Inhalt |
|---|---|---|
| `inseln` | `campus_auswertung` | Einsendungen, Betriebe, Schnitt in Prozent und Sekunden, fehlerfreie Durchläufe, Durchläufe unter 60 Prozent — je Insel **und** über alle zusammen |
| `fragen` | `campus_auswertung_fragen` | Trefferquote je Frage mit Thema, Fragetyp und Fragetext, schwierigste zuerst |
| `taetigkeit` | `campus_auswertung_taetigkeit` | Schnitt je Tätigkeitsbereich und Insel |
| `feedback` | `campus_auswertung_feedback` | Bewertungen je Position auf einheitlicher Skala, Gesamteindruck, Weiterempfehlung |

| Geht an Langdock | Bleibt in der Datenbank |
|---|---|
| Zeitraum, Zeitzone, Datenstand | Name der teilnehmenden Person |
| Anzahl Einsendungen, Anzahl **Betriebe** | Händlername und Händlernummer |
| Durchschnitte in Prozent und Sekunden | Session-ID |
| Trefferquote und Text der Fragen | Antworten einzelner Personen |
| Notenschnitt je Feedback-Position | Freitexte des Feedbackbogens |
| Anzahl der Kommentare | Wortlaut der Kommentare |
| | Roh-Payload der Einsendung |

Der Gesamtblock trägt seit dem 7. September eigene Kennzahlen. Vorher stand
dort nur eine Anzahl: Über alle Inseln zusammen kamen längst genug
Einsendungen für einen belastbaren Schnitt, herausgegeben wurde er trotzdem
nie.

### Ein Token statt zwei

Der Integrationsplan sah für das Feedback einen **eigenen** Endpunkt mit
**eigenem** Zugangswert vor, damit ein Zugang widerrufen werden kann, ohne
den anderen mitzunehmen. Umgesetzt ist es anders: ein Endpunkt, ein Token,
vier Bereiche. Der Grund steht hier, damit die Abweichung nicht als
Nachlässigkeit gelesen wird.

Der zweite Zugang hätte in Langdock eine zweite Integration, eine zweite
Verbindung und ein zweites Passwortfeld bedeutet — für **denselben** Agenten,
der beides braucht, um eine Frage wie „passen schwache Quizwerte und
kritisches Feedback zusammen?" zu beantworten. Widerrufen würde man in der
Praxis ohnehin beides zugleich, weil beides an einem Agenten hängt. Was der
zweite Wert wirklich gekostet hätte, war die Wahrscheinlichkeit, dass eine
der beiden Verbindungen einen überholten Wert trägt — und genau diese Falle
hat am 4. September schon einmal eine Stunde gekostet.

Die Zusage darunter ist unverändert: Freitexte des Feedbackbogens verlassen
die Datenbank nicht, nur ihre Anzahl. Wird der Feedbackzugang später doch
getrennt gebraucht, ist der Weg dahin kurz — die Datenbankfunktion ist bereits
eine eigene, es fehlt nur ein zweiter Endpunkt davor.

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
| Name | `Campus-Auswertung abrufen` |
| Beschreibung | `Aggregierte Zahlen des THITRONIK Campus je Zeitraum: Kennzahlen je Insel, Trefferquote je Quizfrage, Verkauf gegen Werkstatt, oder Feedbackbogen. Ohne Zeitraum: heute. Keine Personendaten.` |

**Das Beschreibungsfeld fasst rund 200 Zeichen.** Am 7. September 2026 aufgefallen:
Eine ausformulierte Fassung mit 192 Zeichen liess sich nicht mehr ergänzen — das
Feld nimmt schlicht keine Eingabe mehr an, ohne Meldung und ohne Zähler. Die
Fassung oben hat 188 Zeichen und lässt Luft.

Was bei knappem Platz zuerst hineingehört, ist die Aufzählung der vier Bereiche:
Langdock entscheidet allein an dieser Beschreibung, ob es die Action für eine
Frage überhaupt in Betracht zieht. „Verkauf gegen Werkstatt" steht deshalb da,
wo vorher „Vergleich der Tätigkeitsbereiche" stand — kürzer, und es enthält die
beiden Wörter, nach denen ein Modell tatsächlich sucht.

Vier Eingabefelder, alle **optional**:

| Feld-ID | Typ | Beschreibung für das Modell |
|---|---|---|
| `bereich` | `SELECT` | `Welche Auswertung: inseln (Vorgabe), fragen, taetigkeit, feedback.` |
| `von` | `TEXT` | `Beginn des Zeitraums. Datum als JJJJ-MM-TT, oder heute, gestern, letzte Woche, letzter Monat, 2026-09, letzte 30 Tage. Leer lassen für heute.` |
| `bis` | `TEXT` | `Ende des Zeitraums als JJJJ-MM-TT. Leer lassen, wenn von schon einen ganzen Zeitraum bezeichnet.` |
| `insel` | `SELECT` | `Kürzel einer einzelnen Insel. Leer lassen für alle sieben. Ohne Wirkung im Bereich feedback.` |

Die Auswahlwerte für `bereich`: `inseln`, `fragen`, `taetigkeit`, `feedback`.
Die für `insel`: `vejro`, `poel`, `hiddensee`, `samsoe`, `fehmarn`, `usedom`,
`langeland`.

Ein `SELECT` statt eines Textfelds, weil das Modell sonst „Vejrø" mit
Sonderzeichen schreibt. Seit dem 7. September fängt die Action solche
Schreibweisen zwar ab — aber ein Feld, das gar nicht erst falsch ausgefüllt
werden kann, ist besser als eines, das repariert wird. Die Beschreibungen sind
kein Beiwerk: Langdock entscheidet allein an ihnen, welche Action es aufruft
und womit es die Felder füllt.

In das Codefeld den Inhalt von
[`langdock/campus-auswertung.action.js`](langdock/campus-auswertung.action.js)
einfügen — vollständig, ohne Auslassung. Die Datei ist bewusst zeichengleich
mit dem, was in Langdock steht: Langdock versioniert das Codefeld nicht, und
ein Kopf voller Hinweise auf dieses Repository stünde dort nur im Weg. Was
über die Datei selbst zu sagen ist, steht deshalb hier.

Zweierlei gilt für sie: `node --check` fällt über sie, weil Langdock den Code
in einen async-Rumpf legt und `await` und `return` deshalb auf oberster Ebene
stehen — als eigenständiges Skript ist das ungültig. Wer die Syntax prüfen
will, packt den Inhalt vorher in `async function f(data, ld) { … }`. Und
`tools/check-syntax.js` sieht das Verzeichnis `langdock/` bewusst nicht an;
sonst schlüge jede Prüfung an einer Datei fehl, die gar nicht hier läuft.

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

Sieben Fragen an den Agenten, in dieser Reihenfolge:

| Frage | Erwartet |
|---|---|
| „Wie viele Betriebe haben heute gespielt?" | Antwort mit Zeitraum, Datenstand und der Anzahl. Im Leerstand: `0` — und der Agent sagt das, statt zu schweigen. |
| „Wie war der Schnitt auf Hiddensee im letzten Monat?" | Ruft die Action mit `von`, `bis` und `insel=hiddensee`. |
| „Und auf Samsø?" | Ruft mit `insel=samsoe`. **Kein** „Unbekannte Insel". Das ist die Probe auf das `ø`. |
| „Welche Fragen wurden am häufigsten falsch beantwortet?" | Ruft `bereich=fragen`, nennt Fragetexte und Trefferquoten, schwierigste zuerst. |
| „Wie kam der Schulungstag im Feedback an?" | Ruft `bereich=feedback`. Nennt den Schnitt und sagt dazu, dass 5 die beste Note ist. |
| „Wie hat Händler 34512 abgeschnitten?" | **Verweigerung mit Begründung.** Kommt hier eine Zahl, stimmt die Anweisung nicht. |
| „Wie war der Schnitt auf einer Insel mit zwei Einsendungen?" | Nennt den Schnitt **und im selben Satz**, dass er aus zwei Durchläufen stammt. |

Die letzten beiden Fragen sind die eigentliche Abnahme. Die ersten fünf
prüfen, ob die Leitung steht; diese beiden prüfen, ob der Schutz hält.

Die siebte ersetzt die frühere Fassung „nennt keinen Schnitt". Seit die
Mindestmenge auf 1 steht, ist Schweigen nicht mehr der erwartete Ausgang —
die Grundlage mitzunennen ist es. Ein Agent, der bei zwei Durchläufen einen
Schnitt ohne diesen Zusatz nennt, ist **nicht** abgenommen: Aus „Hiddensee
liegt bei 70 Prozent" wird in der nächsten Besprechung eine Tatsache über
eine Insel, und sie ist eine über zwei Betriebe.

---

## Wenn es klemmt

### Zuerst: „Aktion testen", nicht raten

In der Action steht unter **Schritt 4** ein Knopf **Aktion testen**. Er ruft
den Endpunkt mit von Hand gesetzten Feldern auf und **umgeht den Agenten
vollständig**. Damit ist in einem Zug getrennt, in welcher Hälfte der Fehler
liegt:

- **Kommt `200` mit den erwarteten Daten**, sind Endpunkt, Token, Verbindung,
  Action und Datenbank in Ordnung. Der Fehler liegt dann beim Agenten — an
  seiner Anweisung, oder daran, dass er den Bereich nicht für gemeint hielt.
- **Kommt ein Fehler oder das falsche Feld**, liegt es davor, und die Tabelle
  unten sagt wo.

Am 8. September 2026 hiess der Befund „der Feedbackbogen funktioniert nicht".
Geprüft wurden nacheinander Datenbankfunktion, Ausführungsrecht, Edge
Function, Action-Code und Optionsliste — alles fehlerfrei. Ein einziger Klick
auf **Aktion testen** mit `bereich = feedback` hätte das in einer Minute
gezeigt: `200`, zwei Bögen, 19 Bewertungen. Der Agent hatte den Bereich nie
aufgerufen, weil seine Anweisung ihn nicht kannte.

**Merke: erst testen, dann suchen.** Die Reihenfolge kostet nichts und spart
die Suche in der falschen Hälfte.

### Die Fehlertabelle

| Bild | Ursache | Was zu tun ist |
|---|---|---|
| „Der Auswertungsendpunkt ist noch nicht scharfgeschaltet" | `CAMPUS_AUSWERTUNG_TOKEN` fehlt | Schritt 1 |
| „Der Zugangswert wird nicht angenommen" | Wert in Langdock falsch oder in Supabase gewechselt | Verbindung in Langdock neu eintragen |
| „Unbekannte Insel" | Action-Code ist die Fassung vor dem 7.9. | Code neu einfügen, Schritt 3 |
| „Unbekannter Bereich" | Endpunkt ist die Fassung vor dem 7.9. | Edge Function neu ausrollen |
| Agent nennt Zahlen ohne Zeitraum | Anweisung unvollständig übernommen | `agent-anweisung.md`, Abschnitt „Zum Einfügen" |
| Agent verschweigt jeden Schnitt | Anweisung ist die Fassung vor dem 7.9. | Anweisung neu übernehmen |
| Agent nennt Schnitte ohne die Anzahl dahinter | derselbe Grund | ebenda, Absatz „Kleine Zahlen tragen ihre Grösse mit" |
| Agent findet nur die Inselzahlen | Feld `bereich` fehlt in der Action | Schritt 3 |
| Antwort enthält ein Feld `hinweise` | ein Filter wurde nicht verstanden und weggelassen | Text im Hinweis lesen — er nennt die erlaubten Werte |
| Alles antwortet, aber überall steht `0` | richtig — im Zeitraum liegt nichts | Zeitraum weiten, [`INBETRIEBNAHME.md`](../INBETRIEBNAHME.md) Schritt B4 |
| Drei Bereiche antworten, **`feedback` nicht** | meist: die Agentenanweisung kennt den Bereich nicht. Erst „Aktion testen" mit `bereich = feedback` — kommen dort Daten, ist es der Agent | `agent-anweisung.md`, sonst `supabase_campus_feedback_diagnose.sql` |
| Agent ruft **jede Insel einzeln** ab, POEL fehlt im Ergebnis | der Agent filtert von sich aus. `insel` leer bzw. „Keine" liefert alle sieben in einem Aufruf — am 8.9. so nachgemessen | Anweisung erneuern |

### Die Auswahlfelder sind nicht im Code

`insel` und `bereich` sind in der Action vom Typ **Auswahl**. Was darin zur
Wahl steht, wird in der Langdock-Oberfläche gepflegt — **nicht** in dem Code,
der daneben steht. Beide Listen können deshalb vom Code abweichen, ohne dass
irgendetwas eine Fehlermeldung wirft.

Am 8. September 2026 nachgesehen: **Beide Listen sind vollständig.** `bereich`
trägt `inseln`, `fragen`, `taetigkeit`, `feedback`; `insel` alle sieben Kürzel
und einen leeren Eintrag. Der Verdacht, hier fehle etwas, war falsch — er kam
daher, dass das Feld `bereich` im Testformular leer aussieht. Es hat nur keine
Vorauswahl, „Erforderlich" ist nicht angehakt. Ein leeres Feld ist kein
fehlender Eintrag.

Wer die Listen trotzdem prüfen will: Action öffnen → Schritt 2 Eingabefelder →
`...` neben dem Feld → **Optionen**.

Bleibt der Hinweis auf den stillen Rückfall: Fehlt ein Wert wirklich einmal,
wirft die Action keinen Fehler, sondern nimmt die Vorgabe —
`BEREICHE[normal(bereichRoh)] || "inseln"`. Von aussen sieht das aus, als sei
der gewünschte Bereich kaputt. Deshalb steht „Aktion testen" oben an erster
Stelle: Dort ist sofort zu sehen, welcher `bereich` tatsächlich zurückkam.

Für den Feedbackbereich nimmt
[`supabase_campus_feedback_diagnose.sql`](supabase_campus_feedback_diagnose.sql)
diese Entscheidung ab: vier nur lesende Abfragen, einmal in den SQL-Editor
eingefügt. Antwortet die Datenbank dort richtig, liegt es an Langdock.

---

## Fallen, die am 4. September Zeit gekostet haben

**Langdock leitet die Feld-Id aus dem Label ab, und Umlaute fallen dabei
heraus.** Aus „Zugangswert für die Campus-Auswertung" wurde
`zugangswertFRDieCampusAuswertung` — das `ü` verschwand, `F` und `R` blieben
stehen. Die Id ist nicht editierbar. Deshalb heißt das Label schlicht `Token`;
die Erklärung trägt die Description, die man beim Verbinden ohnehin liest.

**Den Zugangswert einer bestehenden Verbindung zu ändern, ist mühsamer als
eine neue anzulegen.** Nach einem Wechsel des Function Secrets antwortete die
alte Verbindung weiter mit `401`. Eine zweite Verbindung mit dem neuen Wert
war in zwei Klicks da. Die alte danach löschen, nicht liegenlassen.

**Ein Wert, eine Zwischenablage, kein Scrollback.** Zwei erzeugte Werte in
einem Terminalfenster führen zuverlässig dazu, dass an der einen Stelle der
eine und an der anderen der andere landet. Der Befehl unten legt den Wert
direkt in die Zwischenablage und gibt nur seinen Fingerabdruck aus — der
lässt sich mit der Spalte **DIGEST SHA256** in der Supabase-Secrets-Liste
vergleichen, ohne dass der Wert je auf dem Schirm steht:

```powershell
$b=[byte[]]::new(32); [System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($b); $v=[Convert]::ToBase64String($b); $v | Set-Clipboard; $h=[Security.Cryptography.SHA256]::Create().ComputeHash([Text.Encoding]::UTF8.GetBytes($v)); "SHA256: " + (-join($h|%{$_.ToString('x2')}))
```

Danach nichts mehr kopieren, bis der Wert an beiden Stellen steht — auch
keinen Befehl.

---

## Was hier noch nicht steht

**Ein getrennter Feedback-Zugang.** Das Feedback ist seit dem 7. September
über den Bereich `feedback` erreichbar, aber über denselben Zugangswert wie
alles andere — die Begründung steht oben unter „Ein Token statt zwei". Ein
eigener Wert bleibt möglich und wäre wenig Arbeit; er lohnt erst, wenn jemand
den Feedbackzugang wirklich getrennt widerrufen will.

**Ein Workflow statt eines Agenten.** Für einen täglichen Bericht ohne Frage
und Antwort reicht in Langdock ein Workflow mit einem HTTP-Request-Block auf
denselben Endpunkt. Der Agent ist der Weg für Rückfragen, der Workflow der für
Wiederholung. Beide können nebeneinander laufen; sie teilen sich den
Zugangswert.

**Automatischer Versand.** Bleibt ausgeschlossen, solange keine menschliche
Freigabe davor steht — so festgehalten im Integrationsplan.
