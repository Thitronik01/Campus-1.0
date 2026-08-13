# Fotoliste HIDDENSEE — Funk-Magnetkontakt & Adapter

Was fotografiert werden muss, damit die Bildfragen funktionieren. Die Technik
dafür ist fertig: sobald die Bilder da sind, ist es reine Datenarbeit an
[`public/data/inseln/hiddensee.json`](public/data/inseln/hiddensee.json).

---

## Vorab: was eine gute Quizfrage vom Katalogfoto unterscheidet

Ein Produktfoto zeigt, **wie das Teil aussieht**. Eine Quizfrage braucht, **wie
es verbaut ist** — und zwar in mehreren Varianten, von denen genau eine richtig
ist. Die falschen Varianten müssen aus der Werkstattpraxis stammen, nicht
offensichtlich absurd sein.

Faustregel: Wenn ein Händler, der nie geschult wurde, die richtige Antwort
allein durch Hinsehen findet, prüft die Frage nichts.

**Aufnahmehinweise für alle Bilder**

| | |
|---|---|
| Format | Hochkant, 3:4. Vier Bilder passen dann zweispaltig auf jedes Telefon. |
| Abstand | Bei allen vier Varianten **gleich**. Ein näher aufgenommenes Bild verrät sich als das gemeinte. |
| Licht | Werkstattlicht ist in Ordnung. Kein Blitz direkt auf Metall oder Glas. |
| Hintergrund | Der echte Einbauort, kein Fototisch. Der Wiedererkennungswert ist der Punkt. |
| Auflösung | Ab 1200 px lange Kante. Vorher auf WebP umrechnen, Ziel unter 150 KB je Bild. |
| Was nicht drauf soll | Kennzeichen, Kundennamen, Auftragspapiere im Bild. |

Ablage: `public/media/hiddensee/`, Dateinamen nach Frage — `hid-01-a.webp`,
`hid-01-b.webp` und so fort.

---

## Die vier Fragen, die am meisten gewinnen

### 1 · HID-01 — Die Platinenlage (wichtigste Aufnahme)

Die Frage: *Ein Standardkontakt ließ sich anlernen, beim Öffnen passiert nichts.*
Der Grund ist die verkehrt eingelegte Platine — die Sende-LED zeigt zum Magneten.

**Vier Aufnahmen des geöffneten Senders:**

| | Zeigt |
|---|---|
| a | Platine **richtig** — Sende-LED zeigt vom Magneten weg |
| b | Platine **verkehrt** — Sende-LED zeigt zum Magneten (die gesuchte Antwort) |
| c | Platine richtig, aber Batterie sichtbar verkantet |
| d | Platine richtig, Gehäusedeckel nicht bündig geschlossen |

Alle vier aus **derselben Perspektive**, Gehäuse gleich ausgerichtet. Die LED
muss auf jedem Bild erkennbar sein — notfalls mit einem Pfeil nachschärfen, aber
dann auf **allen vier** Bildern einen Pfeil setzen.

### 2 · HID-09 — Sender oder Magnet an die Tür?

Die Frage: *Sendergehäuse an den festen Rahmen, Magnet an das bewegliche
Türblatt.* Bisher reine Textfrage, als Bildfrage deutlich stärker.

**Vier Aufnahmen einer Aufbautür, jeweils halb geöffnet,** damit erkennbar ist,
welches Teil mitschwingt:

| | Zeigt |
|---|---|
| a | Sender am Rahmen, Magnet am Türblatt (richtig) |
| b | Umgekehrt — Sender am Türblatt |
| c | Beide auf dem Türblatt |
| d | Sender am Rahmen, Magnet aber am Rahmen gegenüber, Tür schlägt nicht dazwischen |

### 3 · HID-05 — Metallische Heckgarage, Adapter

Die Frage: *Der Kontakt arbeitet unzuverlässig, Adapter 100428 / 100729 nutzen.*

**Vier Aufnahmen an einer metallischen Heckgarage:**

| | Zeigt |
|---|---|
| a | Kontakt direkt auf Metall geklebt (der Fehlerfall) |
| b | Kontakt mit Montageadapter, Abstand zum Metall sichtbar (richtig) |
| c | Kontakt auf Metall, dafür zweiter Kontakt daneben |
| d | Kontakt mit Adapter, aber Adapter selbst verkantet montiert |

### 4 · Neue Frage — Der Abstand

Bisher nicht im Fragensatz, lohnt sich als Bildfrage sehr: HID-02 und HID-03
prüfen die Zahlen 22 mm und über 30 mm rein textlich.

**Vier Aufnahmen der geschlossenen Klappe, Spalt jeweils mit Messmittel im Bild**
(Fühlerlehre oder Messschieber, gut ablesbar):

| | Zeigt |
|---|---|
| a | ca. 10 mm |
| b | ca. 20 mm (richtig — unter der 22-mm-Grenze) |
| c | ca. 28 mm |
| d | ca. 40 mm |

Der Messwert muss **lesbar** sein, sonst rät man. Wenn das fotografisch nicht
geht: Wert als Beschriftung unter die Kachel setzen (`text` neben `image`) —
dann prüft die Frage die Grenze statt das Augenmaß, was auch in Ordnung ist.

---

## Zwei Fragen mit vorhandenem Material

Diese brauchen keine neuen Fotos — die Freisteller liegen bereits in
`Wissen/03_Medien/produkte/`:

**HID-04 (Standard gegen wasserdicht)** — `Funk-Magnetkontakt 868.png` und
`Funk-Magnetkontakt 868 wasserdicht.png` nebeneinander. Macht die
Zuordnungsfrage sofort anschaulich.

**Adapter erkennen** — `Montageadapter.png` und `Montageadapter für T.S.A..png`.
Taugt für eine neue Frage „Welcher Adapter gehört zum Magnetkontakt?", weil der
T.S.A.-Adapter ein echter Verwechslungskandidat ist.

Achtung: Die vier Dateien liegen mit je gut 2 MB vor. Vor dem Einsatz auf WebP
umrechnen, sonst lädt eine Frage 9 MB.

---

## Was sich nicht fotografieren lässt

Diese Fragen bleiben Text — das ist keine Lücke, sondern richtig so:

- **HID-06 Batteriediagnose** — ein Signalton und eine 30 Sekunden leuchtende
  LED. Wäre höchstens als Tonfrage denkbar; die elf Alarmtöne in
  `Wissen/03_Medien/alarmtoene/` sind dafür ein ungenutztes Fundstück.
- **HID-07 CAN-Bus-Überwachung** — eine Wissensfrage ohne Bildmotiv.
- **HID-08 Klebepads bei 8 °C** — ein Foto von einem Klebepad zeigt die
  Temperaturgrenze nicht.
- **HID-10 Reihenfolge** — der Typ ist eine Sortieraufgabe.

---

## Wenn die Bilder da sind

So sieht eine fertige Bildfrage aus:

```json
{
  "id": "HID-01",
  "type": "single",
  "layout": "portrait",
  "category": "Der Klassiker",
  "prompt": "Auf welchem Bild ist die Platine korrekt eingelegt?",
  "hint": "Achte darauf, wohin die Sende-LED zeigt.",
  "options": [
    { "id": "a", "image": "/media/hiddensee/hid-01-a.webp", "imageAlt": "Geöffneter Sender, Sende-LED zeigt vom Magneten weg" },
    { "id": "b", "image": "/media/hiddensee/hid-01-b.webp", "imageAlt": "Geöffneter Sender, Sende-LED zeigt zum Magneten" },
    { "id": "c", "image": "/media/hiddensee/hid-01-c.webp", "imageAlt": "Geöffneter Sender mit verkanteter Batterie" },
    { "id": "d", "image": "/media/hiddensee/hid-01-d.webp", "imageAlt": "Geöffneter Sender, Deckel nicht bündig" }
  ],
  "correct": ["a"],
  "feedback": "Zeigt die Sende-LED zum Magneten, lässt sich der Kontakt zwar anlernen, alarmiert aber nicht. Deshalb nach der Montage immer Testalarm.",
  "feedbackMedia": {
    "src": "/media/hiddensee/hid-01-loesung.webp",
    "alt": "Richtige Platinenlage, Sende-LED markiert",
    "caption": "Die Sende-LED zeigt vom Magneten weg."
  }
}
```

`layout` steuert das Seitenverhältnis: `portrait` (3:4, Normalfall), `square`
oder `landscape` (4:3). `imageAlt` ist Pflicht — es ist der Vorlesetext und
erscheint, wenn ein Bild nicht lädt. **Es darf die Lösung nicht verraten**, also
beschreiben was zu sehen ist, nicht ob es richtig ist.

Danach:

```bash
node tools/check-fragen.js
```

Und die `version` in `hiddensee.json` hochzählen, sonst weisen laufende
Browsersitzungen die Einsendung ab.
