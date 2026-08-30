# Claude Code in diesem Repository

**Die Arbeitsregeln stehen in [`AGENTS.md`](AGENTS.md).** Bitte dort lesen —
Projektaufbau, was Quelle und was erzeugt ist, Prüfungen vor dem Commit,
`?demo=1`, Geheimnisse, Ton der Kommentare, und der Abschnitt „Fallen, die
schon Zeit gekostet haben".

Hier steht nur, was allein Claude Code betrifft.

---

## Warum zwei Dateien

An diesem Repository arbeiten mehrere Werkzeuge — es gibt einen
`codex/`-Zweig, und Claude Code liest `CLAUDE.md`. Zwei vollständige
Anleitungen für dieselben Regeln driften auseinander; nach dem zweiten
Nachtrag folgt jedes Werkzeug einer anderen Fassung. Deshalb: `AGENTS.md` ist
die Quelle, diese Datei verweist darauf.

---

## `/montag`

Der Befehl [`.claude/commands/montag.md`](.claude/commands/montag.md) wird
abgearbeitet, sobald jemand **„es ist Montag"**, **„Arbeitsbeginn"** sagt
oder `/montag` aufruft: Stand holen, offene Zweige prüfen, bauen, alle
Prüfungen laufen lassen, Entwicklungsserver starten, kurz melden.

---

## Was sich im Umgang bewährt hat

**Messen statt vermuten.** Die Engine läuft im Browser, und der Browser kann
befragt werden. Ein `getBoundingClientRect()` beantwortet in Sekunden, was
sonst zu einer Vermutung wird. Zwei Fehlschlüsse aus einer einzigen Sitzung
stehen als Beispiel in `AGENTS.md`, Abschnitt 7.

**Mehrere Inseln zugleich prüfen.** Sieben Startbildschirme einzeln
anzusteuern kostet vierzehn Schritte. Sieben `<iframe>` fester Breite in
einer Seite kosten einen — und Medienabfragen richten sich nach dem Rahmen,
die Messung stimmt also.

**Kein Bild löschen, ohne den ganzen Baum zu durchsuchen.**
`public/data/` gehört dazu; dort hängen Bilder an Fragen.

**Bei Zahlen in der Dokumentation nachrechnen.** Anzahl Fragen, Anzahl
Prüfungen, Dateigrößen — sie veralten still. `node tools/montag.js
--ohne-server` nennt die aktuellen.
