# Campus-Konzept

Die inhaltliche Grundlage für Campus 1.0.

| Datei | Inhalt |
|---|---|
| [`Campus-Konzept.md`](Campus-Konzept.md) | Das Konzept: Grundidee, Ablauf, die sieben Inseln, Technikstack, Datenerfassung, Auswertung |
| [`Insel-Quizfragen.md`](Insel-Quizfragen.md) | **~60 ausgearbeitete Fragen**, 8–10 je Insel, mit richtigen Antworten und Feedback-Texten |

---

## Quellen aus dem Bestandsprojekt

Unter [`quellen/`](quellen/) liegen vier Dokumente der bestehenden Campus-Plattform,
die für den Neubau nützlich sind:

| Datei | Warum relevant |
|---|---|
| `QUIZ_SYSTEMS.md` | Beschreibt die **zwei bestehenden Quiz-Systeme**: Kurs-Quiz (80 % Bestehensgrenze, Bilder als Antworten) und Live-Quiz im Kahoot-Stil (Host/Player, Solo). Zeigt, was schon gedacht wurde und wo die Grenzen lagen |
| `DEALER_TRAINING_QUIZ_BLUEPRINT.md` | Blueprint für die Händler-Quizze, die aus dem Wiki generiert werden |
| `CONTENT_MODEL.md` | Frontmatter-Schema der Wiki-Artikel — nötig, wenn im Folgeprojekt Inhalte ergänzt oder gepflegt werden sollen |
| `HYPERLINKING_STRATEGY.md` | Autolinks, Glossar-Popover, Related Links — wie Begriffe im Text automatisch verknüpft werden |

---

## Wichtiger Hinweis zum Live-Quiz

Das bestehende Multiplayer-Quiz synchronisiert über die **BroadcastChannel API**.
Die funktioniert nur auf derselben Origin, also im LAN-Setup — es gibt kein
WebSocket-Backend.

Für Campus 1.0 ist das relevant: Wenn Teilnehmer über ihr eigenes Mobilfunknetz
teilnehmen sollen (was bei einer Präsenzschulung mit QR-Code-Einstieg naheliegt),
braucht es entweder Supabase Realtime oder ein anderes Signaling. Die bestehende
Lösung lässt sich nicht einfach übernehmen.

Für die Campus-Inseln ist das aber kein Problem: Das Konzept sieht ohnehin
**individuelle Quizze nach jeder Station** vor, kein synchrones Gruppenquiz.
Ein einfaches Formular pro Insel mit Supabase-Speicherung reicht — und ist
robuster als die Kahoot-Mechanik.

---

## Bestehende Quizfragen

In [`../01_Produktwissen/daten/dealer-quizzes.de.json`](../01_Produktwissen/daten/dealer-quizzes.de.json)
liegen 11 fertige Händler-Quizze mit insgesamt 97 Fragen:

| ID | Titel | Fragen |
|---|---|---|
| `quiz-wipro-iii-grundlagen` | WiPro III Grundlagen | 12 |
| `quiz-pro-finder-app` | Pro-Finder & App | 12 |
| `quiz-gas-sensorik` | Gaswarner & Sensorik | 12 |
| `wipro-iii-montage` | WiPro III richtig montieren | 10 |
| `intro-schulung` | Einführung Schulungsvideos | 5 |
| `funkzubehoer-anlernen` | Funkzubehör richtig anlernen | 5 |
| `montageadapter` | Montageadapter richtig anbringen | 5 |
| `pro-finder-montage` | Pro-Finder Montageort & Spannungsversorgung | 5 |
| `can-bus-tueren` | Welche Fahrzeugtüren werden vom CAN-Bus überwacht? | 5 |
| `konfigurator` | THITRONIK Konfigurator richtig benutzen | 5 |
| `uebergabe` | Fahrzeug an den Kunden übergeben | 5 |

Das JSON-Format enthält je Frage: Prompt, Antwortoptionen mit `correct`-Flag und
einen Erklärtext. Als Datenformat für Campus 1.0 direkt nachnutzbar.

**Inhaltlich** sind diese Quizze leichter als die Fragen in `Insel-Quizfragen.md` —
ihre falschen Antworten sind meist offensichtlich falsch. Gut als Einstieg oder
Wiederholung, weniger gut als trennscharfer Wissenscheck.
