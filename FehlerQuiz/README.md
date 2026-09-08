# FehlerQuiz — Bestand, wird von hier aus **nicht** ausgeliefert

Dieser Ordner ist eine **Arbeitskopie**, kein Deploy-Paket. Wer die
`index.html` hier ändert, ändert nichts an der laufenden Seite.

Das ist keine Nachlässigkeit, sondern der Stand: Das FehlerQuiz stammt aus der
Zeit vor dem Campus und läuft als eigene Site weiter. Die Überführung in das
gemeinsame System ist beschlossen und steht als
[Issue #11](https://github.com/Thitronik01/Campus-1.0/issues/11). Bis dahin
bleibt es, wie es ist.

---

## Wo es läuft

| | |
|---|---|
| Adresse | `thitronik-fehlerquiz.netlify.app` |
| Netlify-Projekt | `thitronik-fehlerquiz` |
| Ausgeliefert seit | **10. August 2026**, ein einziger Deploy |
| Art des Deploys | **Netlify Drop** — ein von Hand abgelegter Ordner, kein Git, keine CI |
| Speicherweg | Netlify Function `submit-quiz` → Supabase, Tabelle `quiz_submissions` |
| Bestand | 15 Einsendungen auf `fehlerquiz-de` v4 |

Die CI dieses Repositories baut und deployt allein das **Campus Gesamtpaket**.
Das FehlerQuiz kommt in `.github/workflows/campus.yml` mit keinem Wort vor.

---

## Warum ein Drag-and-drop die Seite beschädigen würde

Am 8. September 2026 durchgespielt, damit es niemand ein zweites Mal
herausfinden muss.

**Der abgelegte Ordner enthielt mehr als das, was hier liegt.** Netlifys
Deploy file browser zeigt für den Deploy vom 10. August genau zwei Dateien —
`index.html` und `netlify.toml`, letztere auf das Byte so groß wie die hier —
und meldet zugleich „1 function deployed". Functions listet der Browser nicht;
sie lagen also im selben Ordner unter `netlify/functions/`. Dieser Ordner
**fehlt hier** und ist auf keinem Rechner mehr auffindbar.

Ein Drop-Deploy ersetzt die Site **vollständig**. Wer nur die `index.html`
ablegt, veröffentlicht eine Seite ohne Function: Sie lädt, sieht richtig aus
und speichert kein Ergebnis mehr. Auffallen würde das erst, wenn jemand die
Zahlen braucht.

**Und die Function bewertet selbst.** Die Vorlage derselben Bauart
(`thitronik-profinder-backend`) trägt eine eigene vollständige Fragenliste mit
Antwortschlüssel und rechnet `is_correct` neu aus; was der Browser meldet,
wird verworfen. Eine Korrektur allein in der `index.html` würde also die
Anzeige richtigstellen, die **Bewertung aber nicht** — wer danach richtig
antwortet, bekäme vom Server „falsch". Das wäre schlimmer als der jetzige
Zustand.

Die `netlify.toml` hier nennt `publish = "public"`, obwohl es diesen Ordner
nicht gibt. Bei einem Drop-Deploy stört das nicht, Netlify nimmt den
abgelegten Ordner selbst. Für einen Git-Deploy müsste dort `publish = "."`
stehen, so wie beim Pro-finder-Quiz.

---

## Zwei bekannte Fehler, hier behoben, live noch vorhanden

Beide am 8. September an den Bildern nachgeprüft — nicht an den
Beschreibungen, sondern an den Bildern selbst, herausgeschnitten aus
`QUIZ_DATA`.

**Q01** — die vier `alts` waren gegenüber den `images` um eine Position
gedreht. Der Schlüssel war richtig. Betroffen war, wer vorlesen lässt oder bei
wem ein Bild nicht lädt.

**Q02** — `correct` stand auf `2` und traf damit einen Alarm-Aufkleber, bei
einer Frage nach dem Funk-Magnetkontakt. Titel, Hinweis, Kategorie und
Feedbacktext sprechen alle vier vom Magnetkontakt; nur der Bildersatz ist
gemischt. Steht jetzt auf `3`, dem einzigen Bild mit einem Magnetkontakt.

Beides gilt **nur hier**. Live zeigt Q02 weiterhin den Aufkleber als richtig.
Das ist bewusst so entschieden: Die Korrektur wandert mit der Migration nach
Issue #11 mit, statt dass für eine von sechs Fragen ein produktiver
Schreibpfad nachgebaut wird.

---

## Wenn es doch einmal live soll

Dann ist es kein Hochladen, sondern ein Umbau:

1. Die Function nachbauen — Vorlage ist
   `thitronik-profinder-backend/netlify/functions/submit-quiz.js` (221 Zeilen).
   Zu ändern sind `QUIZ_ID` auf `fehlerquiz-de`, `QUIZ_VERSION` auf `4` und
   die `QUESTIONS`-Map auf die sechs Fragen samt Schlüssel.
2. `netlify.toml` auf `publish = "."` stellen.
3. Ordner ablegen, danach **einen Testdurchlauf machen und in Supabase
   nachzählen**. Ohne diese Gegenprobe ist nicht zu sehen, ob der Nachbau
   anders speichert als das Original.

Der einfachere Weg bleibt Issue #11.
