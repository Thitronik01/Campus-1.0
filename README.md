# THITRONIK Campus Feedbackbogen

Feedbackbogen für Händlerinnen und Händler zum THITRONIK Campus 2026.
Statische Seite, kein Framework, Speicherung über eine Supabase-RPC.

---

## Drei Varianten

Im Repo liegen drei lauffähige Stände nebeneinander. Produktiv ist aktuell **v11**.

| Variante | Einstieg | Form |
|---|---|---|
| **v11** | `index.html` | Ursprünglicher Stand, aktuell live |
| **v12** | `index-v12.html` | Neugestaltung als eine lange Seite |
| **v13** | `index-v13.html` | Schritt für Schritt, sechs Panels, mobile first |

Umstellen heißt: die gewünschte Datei zu `index.html` machen. `styles-*` und
`app-*` tragen die Versionsnummer absichtlich im Dateinamen, damit kein alter
Browser- oder CDN-Cache greift.

### Was v12 und v13 gegenüber v11 ändern

- Fehlendes Hero-Bild auf Smartphones behoben (`campus-hero-1280.webp` existierte nie)
- Bildlast von 9,5 MB auf 327 KB, alle Bilder als WebP in passenden Größen
- Skalen-Beschriftung „sehr gut / verbesserungswürdig" bleibt auf jedem Gerät sichtbar
- Pflichtkommentar nur noch bei Note 5, nicht mehr bei Note 1
- Automatisch gespeicherter Entwurf im `localStorage`
- Fehlerliste mit Sprunglinks statt flüchtiger Browser-Blasen
- Danke-Ansicht als echter Dialog mit `inert`-gesperrtem Hintergrund
- CSS von 1773 auf rund 800 Zeilen, eine `:root` statt drei widersprüchlichen

### Zusätzlich in v13

- Startbildschirm, danach ein Abschnitt pro Bildschirm
- Prüfung beim Weitergehen statt erst beim Absenden
- Browser-Zurück funktioniert, jeder Schritt hat eine eigene Adresse (`#schritt-3`)
- Segment-Fortschrittsanzeige, erledigte Schritte sind anklickbar
- Campus-Inseln: höchstens drei Favoriten, Rangfolge nach Auswahlreihenfolge

---

## Markenpalette (verbindlich)

| Token | HEX | Einsatz |
|---|---|---|
| `th_blue_primary` | `#1D3661` | Primary Flächen, Headlines, Primary Buttons |
| `th_blue_secondary` | `#3BA9D3` | Akzente, Badges, Links, Info-Flächen |
| `th_accent_lime` | `#AFCA05` | Marker und Status, sehr sparsam |
| `th_red_brand` | `#CE132D` | Logo-Segel, sehr sparsam |
| `graySoft` | `#F0F0F0` | Backgrounds, Card-Flächen |
| `white` | `#FFFFFF` | Ruheflächen |
| `ink` | `#111111` | Text und Icons auf hell |

In v13 umgesetzt: Primary Buttons sind blau, nicht rot. Rot erscheint nur bei
Fehlern und in der Skalen-Note 5, also dort, wo die Signalwirkung inhaltlich
verdient ist. Lime markiert Status, nie Fläche. Auf Lime steht immer `ink`,
weißer Text darauf erreicht nur 1,9:1 und wäre unlesbar.

---

## Backend

Gespeichert wird ausschließlich über die Security-Definer-RPC
`public.submit_campus_feedback(jsonb)` im Supabase-Projekt `mhzlayhnyqlxdyiceyqz`.
Die Tabellen `campus_feedback` und `campus_feedback_ratings` bleiben per Row
Level Security gesperrt. Der Publishable Key steht im Browser-Code, das ist so
vorgesehen.

**Der Payload ist in allen drei Varianten identisch.** Feldnamen, die
`itemLabel`-Strings, `source: 'thitronik-campus-feedback-v11'` und `formVersion`
dürfen sich nicht ändern, ohne die Auswertung mit anzupassen. Ebenso der
Insel-Mechanismus: jede gewählte Insel wird als `rating: 1` unter
`sectionKey: 'schulungsinseln'` abgelegt, damit der Contest über
`campus_feedback_langdock_stats` weiterzählt.

In v13 steht `islandChoices` in der Reihenfolge der Auswahl, also Platz 1 bis 3.
Die Rating-Einträge bleiben trotzdem alle bei 1, eine Gewichtung nach Platz
würde den bestehenden Contest still verändern.

---

## Deployment

Der fertige Ordner für Netlify liegt unter `netlify-v13/`. Diesen Ordner
komplett hochladen, nicht nur `index.html`. Er enthält `_headers` mit Caching
und Sicherheitsheadern.

Nach jeder Änderung an v13 neu bauen:

```bash
node tools/build-netlify.js
```

### Vorschaumodus

`?demo=1` prüft den kompletten Durchlauf und zeigt die Danke-Ansicht, speichert
aber absichtlich nichts. **Für Tests immer verwenden**, sonst landen Testdaten in
der Produktivdatenbank.

---

## Werkzeuge

| Skript | Zweck |
|---|---|
| `tools/optimize-images.js` | Erzeugt die WebP-Varianten unter `assets/v12/` |
| `tools/build-index-v13.js` | Erzeugt `index-v13.html` aus einer Datenquelle |
| `tools/build-netlify.js` | Baut `netlify-v13/` inklusive `_headers` |
| `tools/build-standalone.js` | Baut die beiden Einzeldateien |

Voraussetzung für `optimize-images.js`: `npm install sharp`.

Die beiden Einzeldateien im Wurzelverzeichnis:

- `THITRONIK_Campus_Feedbackbogen_v13_Standalone.html` (282 KB) enthält alles
  eingebettet und läuft per Doppelklick.
- `THITRONIK_Campus_Feedbackbogen_v13_Code.html` (95 KB) ist derselbe Code ohne
  Base64-Bilder, gedacht zum Weitergeben an ein Sprachmodell.

---

## Bekannte offene Punkte

- Keine der Varianten wurde je auf einem echten Telefon getestet, nur emuliert
  bei 320, 390, 1280 und 1990 Pixeln.
- v13 wurde nie mit echtem Absenden gegen Supabase getestet, nur über `?demo=1`.
- `_archiv/` enthält zwei Bilddateien, die von keiner Variante referenziert
  werden. Sie liegen dort statt gelöscht zu sein, falls sie noch gebraucht werden.
