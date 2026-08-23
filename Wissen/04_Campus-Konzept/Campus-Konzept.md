# Digitalisierung THITRONIK Campus — Konzept

**Quelle:** Konzeptpapier von Max Behrens, festgehalten am 13.08.2026.
Dieses Dokument gibt das Konzept strukturiert wieder, damit es im Folgeprojekt
als Grundlage dient.

---

## Grundidee

Der THITRONIK Campus bleibt eine **Präsenzschulung** mit Schulungsinseln. Die
Digitalisierung ersetzt sie nicht, sondern begleitet die einzelnen Stationen.

Nach jeder Insel beantworten die Händler auf Smartphone oder Tablet ein kurzes
Quiz mit etwa 5–12 Fragen. Am Ende des Schulungstages wird der bereits vorhandene
digitale Feedbackbogen ausgefüllt.

**Das zentrale Prinzip:**

> Sehen → anfassen → ausprobieren → Quiz beantworten → Wissen festigen

Jede Insel bekommt einen klaren Lernschwerpunkt und anschließend eine kleine
digitale Wissenskontrolle.

---

## Technische Basis — bewusst klein

| Baustein | Rolle |
|---|---|
| **Netlify** | Bereitstellung der Schulungsseiten und Quiz-Oberflächen |
| **Supabase** | Teilnehmer, Quiz-Sessions, Antworten, Ergebnisse, Feedback |
| **Langdock** | optional, später: KI-gestützte Auswertungen und Zusammenfassungen |
| **Browser** | die einzige Anwendung, die der Händler braucht |

Ausdrücklich **nicht** vorgesehen: eine eigene Campus-App, eine Installation,
ein vollständiger E-Learning-Kurs.

---

## Ablauf für den Händler

**1. Start**
Zugang über QR-Code. Der Teilnehmer gibt ein: Name, Händlerbetrieb, Händlernummer,
ggf. Tätigkeitsbereich. Damit lassen sich Quiz-Ergebnisse und Feedback zuordnen.

**2. Die Inseln**
Jede Insel folgt demselben Muster:

```
Präsenzschulung → praktische Aufgabe/Demonstration → kurzes digitales Quiz
```

**3. Abschluss**
Nach allen Inseln folgt der bestehende Campus-Feedbackbogen (Gesamteindruck,
Organisation, Ablauf, Schulungsqualität, einzelne Inseln, Verbesserungsvorschläge,
Wünsche für zukünftige Schulungen).

Damit entstehen zwei Datentypen:

- **Quizdaten** = Was wurde verstanden?
- **Feedbackdaten** = Wie wurde die Schulung wahrgenommen?

---

## Die sieben Inseln

| Insel | Thema | Schwerpunkt | Geeignete Fragetypen |
|---|---|---|---|
| **VEJRØ** | Produktschulung CAMP / VANLOCK | Neue Produkte: Problem, Aufbau, Funktion, Verkaufsargumentation, Abgrenzung | Produkt am Bild erkennen, Funktionen zuordnen, Kundensituation, Verkaufsargument |
| **POEL** | Händlerbereich | Wo finde ich was auf thitronik.de/haendler-bereich | „Finde die Information": Kunde braucht X, wo findest du das? |
| **HIDDENSEE** | Funkkomponenten | Funk-Magnetkontakt und Adapter: Aufbau, Positionierung, Montage, Abstände, typische Fehler | **Bildfragen:** Welcher Kontakt ist korrekt montiert? Wo ist der Fehler? |
| **SAMSØ** | Einbauorte | Wo werden die Komponenten im Fahrzeug eingebaut, je nach Basisfahrzeug | Fahrzeug-/Einbauort-Quiz mit markierten Positionen |
| **FEHMARN** | Fehlersuche & Support | Fehler erkennen, analysieren, Ursache bestimmen, Lösung wählen | **Bestehende Bildquiz-Struktur — dient als Vorlage für alle anderen Inseln** |
| **USEDOM** | Verkaufsdisplay & Konfigurator | Produkte am Display erklären, kombinieren, Kundenbedarf erkennen, Konfigurator einsetzen | Verkaufsszenario, Komponentenzuordnung |
| **LANGELAND** | Fahrzeugannahme & -übergabe | Der gesamte Ablauf mit dem Kunden, nicht nur Technik | Situationsfragen |

### FEHMARN als Muster

Die Insel FEHMARN existiert bereits digital und zeigt, wie die Digitalisierung der
anderen Inseln aussehen soll:

```
Situation → Bild → Frage → Entscheidung → direktes Feedback
```

### Komponenten auf dem Verkaufsdisplay (USEDOM)

| Gruppe | Komponenten |
|---|---|
| Alarmsystem | WiPro III, Funk-Handsender |
| Vernetzung | BT-connect |
| Ortung | Pro-finder, Pro-finder Antenne |
| Zubehör | NFC Modul, KeyCard, Funk-Magnetkontakt, Funk-Kabelschleife, T.S.A. Funk-Rauchmelder |
| Gaswarnsystem | G.A.S.-pro III, G.A.S. |

---

## Quiz-System

Ein **gemeinsames** Quiz-System mit unterschiedlichen Fragensätzen — nicht sieben
Einzelanwendungen. Die Darstellung darf je nach Inhalt variieren, die technische
Basis bleibt gleich:

```
/quiz/vejro      /quiz/poel      /quiz/hiddensee   /quiz/samsoe
/quiz/fehmarn    /quiz/usedom    /quiz/langeland
```

**Vorgesehene Fragetypen:**
Multiple Choice · Richtig/Falsch · Bilder auswählen · Fehler auf Bildern erkennen ·
richtige Reihenfolge bestimmen · Komponenten zuordnen · Einbauorte erkennen ·
kurze Praxissituationen beurteilen

---

## Datenerfassung

Pro Insel werden nur die schulungsrelevanten Daten gespeichert:

- Teilnehmer, Händler, Insel
- beantwortete Fragen, richtig/falsch
- Ergebnis in Prozent
- benötigte Zeit, Zeitpunkt
- ggf. besonders häufig falsch beantwortete Fragen

**Wichtig — die Zielrichtung:** Es geht *nicht* darum, einzelne Händler zu benoten.
Die Daten sollen zeigen:

> Welche Inhalte wurden verstanden, und bei welchen Themen müssen **wir** die
> Schulung verbessern?

---

## Auswertung

Sinnvolle Auswertungen in Supabase:

- durchschnittliche Quiz-Ergebnisse pro Insel
- häufigste Fehler pro Frage
- schwierigste Themen
- Unterschiede zwischen Verkauf und Werkstatt
- Bewertung der einzelnen Inseln
- Zusammenhang zwischen Quiz-Ergebnis und Schulungsfeedback
- Verbesserung gegenüber vorherigen Campus-Veranstaltungen

Langdock kann später optional Zusammenfassungen aus den gesammelten Daten
erzeugen — etwa „Welche drei Themen haben den Händlern beim Campus 2026 die
größten Schwierigkeiten bereitet?". Die eigentlichen Daten bleiben strukturiert
in Supabase.

---

## Was das für die Fragenentwicklung bedeutet

Aus der Zielrichtung „Wo müssen **wir** besser werden?" folgt eine konkrete
Anforderung an die Fragen: Sie müssen **trennscharf** sein. Eine Frage, die alle
richtig beantworten, liefert keine Information. Eine Frage mit offensichtlich
falschen Antwortoptionen ebenfalls nicht.

Deshalb sind die Fragen in [`Insel-Quizfragen.md`](Insel-Quizfragen.md) so gebaut,
dass die falschen Antworten echte Praxis-Halbwahrheiten sind — Annahmen, die
Händler tatsächlich mitbringen und die im Support später Zeit kosten.
