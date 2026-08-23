---
description: Arbeitsbeginn — Stand holen, bauen, prüfen, Server starten
---

Bring das Projekt in einen Zustand, in dem sofort weitergearbeitet werden
kann. Arbeite die Schritte der Reihe nach ab und melde am Ende **kurz**, was
läuft und was im Weg steht. Nicht jeden Befehl kommentieren.

## 1. Nachsehen, wer sonst gearbeitet hat

```bash
git fetch --all --prune
git branch -r -v
```

**Der weiteste Stand ist nicht automatisch `main`** (siehe `CLAUDE.md`,
Regel 1). Prüfe für jeden Fernzweig, ob er Commits hat, die dem aktuellen
Stand fehlen:

```bash
git rev-list --count HEAD..origin/<zweig>
```

Steht ein Zweig vorn, **halte an und frag**, bevor du irgendetwas baust —
sonst entsteht wieder Arbeit doppelt. Steht nichts vorn, weiter.

## 2. Auf den aktuellen Stand ziehen

Nur wenn die Arbeitskopie sauber ist (`git status --porcelain` leer):

```bash
git checkout main && git pull origin main
```

Liegen ungesicherte Änderungen herum, ziehe **nicht**. Zeig sie stattdessen
und frag, was damit passieren soll.

## 3. Bauen, prüfen, starten

```bash
cd "Campus Quiz" && node tools/montag.js
```

Das Werkzeug baut beide Paketformen, lässt alle Prüfungen laufen und startet
danach den Entwicklungsserver auf <http://localhost:8788/quiz>. Fällt etwas
durch, startet es den Server bewusst nicht — dann ist die Ursache zu
beheben, bevor irgendwer auf die Seite schaut.

Der Server läuft im Vordergrund. Starte ihn deshalb im Hintergrund, damit du
danach noch antworten kannst.

## 4. Melden

Halte dich kurz. Diese Punkte, mehr nicht:

- Auf welchem Stand wir sind (Zweig, letzter Commit)
- Ob alle Prüfungen grün waren, mit den Zahlen
- Die Adresse zum Anklicken
- Was heute im Weg steht — allen voran: **die Datenbank-Migration ist noch
  nicht eingespielt**, solange das so ist, nimmt Supabase nichts an
- Ob ein anderer Zweig etwas hat, das uns fehlt

## Zum Durchklicken

- **<http://localhost:8788/quiz>** — ohne `?demo=1`. Der Entwicklungsserver
  kennt die Netlify-Function nicht und antwortet mit 501, es geht also nichts
  an Supabase. So ist der Sende-Ausgang zu sehen: Ergebnis bleibt auf dem
  Gerät, die Inselkachel meldet „noch nicht gesendet".
- **<http://localhost:8788/quiz?demo=1>** — für alles andere. Läuft
  vollständig durch, speichert absichtlich nichts.

Am deployten Stand gilt weiterhin: **immer `?demo=1`**, sonst landen
Testdaten in der Produktivdatenbank.
