# Quiz-Systeme — Wann welches?

Die Plattform hat zwei (vorher drei) Quiz-Engines. Sie zielen auf unterschiedliche Lernkontexte und dürfen NICHT vermischt werden, sonst entstehen Konflikte zwischen Stateful-Multiplayer-Logik und Single-User-Lernfluss.

## Engine A — Schulungs-Quiz (Single-User)

**Wo:** `app/courses/[id]/lesson/[lessonId]/page.js`
**Wann:** Eine Person absolviert ein Schulungsmodul, Bestehensgrenze 70 %.

### Was sie kann
- **Bildfragen** (zentrales Feature laut `AGENTS.md`: „Fragen verwenden Bilder als Antworten") — Single Choice + Multiple Choice
- Text-Fragen mit `options[]` (neueres Format)
- **Video-Intro** vor dem Quiz (`lesson.videoUrl` + Poster)
- **Wrong-Only-Wiederholung** — `?mode=wrongOnly` lädt nur die Fragen, die letztes Mal falsch waren
- **Animierter SVG-Timer-Ring** (grün → gelb → rot mit Pulsation)
- **Streak-Bonus** — bei 2/3/5+ Folgetreffern gibt's 10 / 25 / 50 % Punkte-Multiplier, sichtbares 🔥-Badge
- **Erklärung + Wiki-Refs** nach jeder Frage (optional pro Frage konfigurierbar)
- **Quellen-Hinweis** pro Frage (`question.source`)
- Persistierung über `API.saveQuizAttempt` + `API.saveProgress` in localStorage

### Datenmodell (Frage)
```json
{
  "id": "q1",
  "text": "Welche Funktion löst Panikalarm aus?",
  "type": "single",
  "category": "WiPro III",
  "options": [
    { "id": "a", "text": "Drücken aller drei Tasten gleichzeitig", "isCorrect": true },
    { "id": "b", "text": "Lange Drücken der oberen Taste", "isCorrect": false }
  ],
  "mediaType": "image",
  "mediaRef": "/Produkte/funk_handsender_001.webp",
  "explanation": "Panikalarm wird durch Drücken aller drei Sender-Tasten ausgelöst …",
  "source": "WiPro III Bedienungsanleitung 1.8, S. 12",
  "wikiRefs": ["/de/wipro-iii#panikalarm", "/de/funk-handsender"]
}
```

Legacy-Format (Bildfragen ohne `options`):
```json
{
  "id": "q1",
  "question": "Welche dieser Bedienteile gehören zu WiPro?",
  "type": "multiple",
  "answers": ["/Produkte/wipro_a.png", "/Produkte/wipro_b.png", "/Produkte/handsender.png"],
  "correctAnswers": ["/Produkte/wipro_a.png", "/Produkte/wipro_b.png"]
}
```

Beide Formate werden parallel unterstützt — neue Fragen sollten das `options[]`-Format nutzen.

### Wann NICHT einsetzen
- Wenn mehrere Spieler gleichzeitig dieselbe Frage beantworten sollen
- Wenn ein zentraler Host die Fragen freigibt
- Wenn ein Podium / Leaderboard live während der Session sichtbar sein soll

## Engine C — Live-Quiz (Multi-User / Kahoot-Style)

**Wo:** `app/quiz/host/[sessionId]`, `app/quiz/play/[sessionId]`, `app/quiz/solo/[sessionId]`
**Wann:** Workshop, Schulungs-Event, Messe — eine Person hostet, mehrere Spieler antworten parallel.

### Was sie kann
- **Multi-Player-Echtzeit** über Zustand-Store (`lib/quiz/quiz-store.js`)
- **3-2-1-GO! Countdown** vor jeder Frage (`components/quiz/QuizCountdown.js`)
- **Animierter Timer** mit framer-motion (`components/quiz/QuizTimer.js`)
- **Podium-Animation** für Top 3 am Ende
- **Punkte + Streak + Zeit-Bonus** kombiniert
- **Reveal-Phase** mit Korrekt/Falsch-Anzeige für alle Spieler
- **Erklärungs-Toggle** für den Host
- **Solo-Modus** (`app/quiz/solo/`) für Vorab-Tests des Hosts

### Datenmodell
Fragen liegen in `lib/quiz/quiz-data.js` als `QUIZ_COURSES`-Konstanten. Spieler-State + Punkte sind flüchtig (kein Persist).

### Wann NICHT einsetzen
- Für reguläre Schulungs-Module mit Bildfragen
- Wenn Wrong-Only-Wiederholung gewünscht ist
- Wenn Pass-/Fail-Tracking persistiert werden soll

## Architektur-Entscheidung 2026-05

Engine **B** (`app/wiki-training/`) wurde am 2026-05-27 ersatzlos gestrichen:

| Was war es | Warum entfernt |
|---|---|
| Multiple-Choice-Quiz mit Wiki-Refs, 30s-Timer, Kahoot-Optik | Doppelte alle Engine A Features, aber ohne Bildfrage-Support |
| Eigenes Datenformat in `public/dealer-quizzes.de.json` | Daten-Roundtrip war separat von der Lernplattform |
| Routen `/wiki-training/[moduleId]` + `/wiki-training/[moduleId]/quiz/[quizId]` | Sorgten für UX-Spaltung in der `/courses` Übersicht |

Die nützlichen Features wurden in Engine A integriert:
- ✅ **Erklärung** pro Frage (`question.explanation`)
- ✅ **Wiki-Refs** als klickbare Pillen unter der Erklärung (`question.wikiRefs[]`)
- ✅ **Streak-Bonus** mit visueller Anzeige
- ✅ **Animierter Timer-Ring** statt nüchterner Textanzeige

`lib/wiki-training.js` ist gelöscht; `public/dealer-quizzes.de.json` und `public/training-modules.json` bleiben als Daten-Archiv erhalten — falls man die Inhalte irgendwann in `lib/seed.js` als neue Kurse migrieren will.

## Migration alter Wiki-Schulungs-Fragen nach Engine A

Falls Inhalte aus `dealer-quizzes.de.json` als Lernplattform-Kurse weitergeführt werden sollen:

1. **Kurs anlegen** in `lib/seed.js` (Version-Key hochsetzen!)
2. **Lektion zuweisen** — eine pro Modul, optional mit Video
3. **Fragen mappen**:
   ```
   { "prompt": "...", "answers": [{ "text": "...", "correct": true }] }
   ```
   ⇩
   ```
   { "text": "...", "type": "single", "options": [{ "id": "a", "text": "...", "isCorrect": true }] }
   ```
4. **Wiki-Refs** direkt übernehmen (Engine A liest `wikiRefs[]`)
5. **Erklärung** in `explanation`-Feld umbenennen
6. **Pass-Score** — falls < 70 % auf das Standard-Schwellenwert anpassen oder als Kurs-Property speichern

## Datei-Referenz

| Aufgabe | Datei |
|---|---|
| Schulungs-Quiz-Engine (A) | `app/courses/[id]/lesson/[lessonId]/page.js` |
| Live-Quiz-Engine — Host | `app/quiz/host/[sessionId]/page.js` |
| Live-Quiz-Engine — Player | `app/quiz/play/[sessionId]/page.js` |
| Live-Quiz-Engine — Solo | `app/quiz/solo/[sessionId]/page.js` |
| Live-Quiz Komponenten | `components/quiz/*` |
| Live-Quiz Store | `lib/quiz/quiz-store.js` |
| Live-Quiz Daten | `lib/quiz/quiz-data.js` |
| Live-Quiz Scoring | `lib/quiz/quiz-scoring.js` |
| Kurse + Fragen + Lektionen Seed | `lib/seed.js` |
| Schulungs-CRUD | `lib/store.js` (`API.saveQuizAttempt`, `API.saveProgress`) |
| Doku Engine A Datenmodell | dieser File, oben |

## Wenn du ein neues Quiz brauchst — Entscheidungsbaum

```
Hast du Bildfragen?                   → JA → Engine A
Soll mehrere Spieler gleichzeitig?    → JA → Engine C
Soll der Fortschritt persistiert?     → JA → Engine A
Workshop/Event mit Countdown + Podium? → JA → Engine C
Standard Schulung mit Pass-Score?     → Engine A
```
