# Arbeitsregeln für dieses Repository

Kurz, weil es nur wenige Regeln gibt — aber diese wenigen haben schon Arbeit
gekostet, als sie fehlten.

---

## 1. Vor dem ersten Handgriff: nachsehen, wer sonst noch arbeitet

```bash
git fetch --all --prune
git branch -r
```

**Der weiteste Stand ist nicht automatisch `main`.** Im August 2026 lag
`codex/campus-quiz-polish` fünf Tage vor `main` — mit Campus-Karte,
Feedbackbogen und 14 neuen Bildern. Wer nur auf `main` schaute, sah davon
nichts, baute den Gesamtfortschritt ein zweites Mal und produzierte
27 Konflikte.

Steht ein Branch vor `main`, gilt: **erst darauf aufsetzen, dann anfangen.**
Und wenn eine Funktion gebaut werden soll, vorher prüfen, ob es sie in einem
offenen Zweig schon gibt.

---

## 2. Geändert wird ausschließlich in `Campus Quiz/`

| | |
|---|---|
| **Quelle** | `Campus Quiz/` — Engine, Fragensätze, Styles, Werkzeuge |
| **Quelle** | `Feedbackbogen/` — eigener Stand, wird ins Gesamtpaket kopiert |
| **Quelle** | `Wissen/` — Produktwissen, Design-System, Medien |
| **Erzeugt** | `Campus Gesamtpaket/`, `<Insel> Quiz/` — **nicht versioniert** |
| **Bestand** | `FehlerQuiz/`, `Pro-finder Quiz/` — laufen getrennt weiter |

Die Paketordner stehen in `.gitignore`. Sie entstehen beim Bau und sind nach
einem frischen Klon zunächst nicht da — das ist Absicht:

```bash
cd "Campus Quiz"
node tools/build-insel.js gesamt     # Deploy-Paket, alle Inseln auf einer Site
node tools/build-insel.js alle       # sieben Einzelpakete
```

Bis August 2026 lagen sie mit im Repository: 216 Dateien, ein Drittel des
Projekts, bei jeder Engine-Änderung achtfach mitgeschrieben. Von 27
Merge-Konflikten kamen 24 allein daher.

---

## 3. Vor jedem Commit

```bash
cd "Campus Quiz"
node tools/check-fragen.js                        # Fragensätze
node tools/test-function.js                       # Bewertungslogik (26)
node tools/build-insel.js gesamt && node tools/build-insel.js alle
node tools/test-paket.js "../Campus Gesamtpaket" vejro   # je Insel-Slug
```

Alles muss grün sein. `test-paket.js` läuft je Insel einzeln; über alle
sieben sind es rund 103 Prüfungen je Paketform.

---

## 4. Testen immer mit `?demo=1`

```
http://localhost:8788/quiz?demo=1
```

Läuft vollständig durch, speichert absichtlich nichts. **Ohne `demo=1`
landen Testdaten in der Produktivdatenbank.**

Lokal starten:

```bash
cd "Campus Quiz"
node tools/dev-server.js                          # Quelle, Port 8788
node tools/dev-server.js "../Campus Gesamtpaket/public"   # gebautes Paket
```

---

## 5. Was nie ins Repository gehört

- **Der Supabase Secret Key.** Ausschließlich Netlify-Umgebungsvariablen; er
  umgeht Row Level Security.
- **Echte Teilnehmerdaten** aus Testläufen.

Das Repository ist privat und muss es bleiben: interne Artikel,
Fremdmarken-Logos mit ungeklärten Rechten, fahrzeugspezifische
Einbauunterlagen. Vor einer Weitergabe den Abschnitt „Vor der Weitergabe
prüfen" in `Wissen/README.md` abarbeiten.

---

## 6. Ton der Dokumentation und Kommentare

Deutsch, sachlich, ohne Werbesprache. Kommentare erklären **warum** etwas so
ist, nicht was die Zeile tut — die bestehenden Dateien zeigen das Muster.
Umlaute ausgeschrieben (`ä`, nicht `ae`) in Text und Kommentaren;
Bezeichner im Code bleiben ASCII (`fluechtig`, `spaeter`).

---

## Wo was ausführlich steht

| Thema | Datei |
|---|---|
| Überblick, Stand, Sicherheit | [`README.md`](README.md) |
| Engine, Fragetypen, Backend, Sende-Ausgang | [`Campus Quiz/README.md`](Campus%20Quiz/README.md) |
| Produktwissen, Design-System, Medien | [`Wissen/README.md`](Wissen/README.md) |
