# THITRONIK Campus — Wissenscheck, alle Inseln

Fertiges Netlify-Paket mit **allen 7 Schulungsinseln auf einer Site**.
**Wird erzeugt** — Änderungen gehören nach `Campus 1.0/Campus Quiz/`.

| | |
|---|---|
| Inseln | 7 |
| Fragen | 70 |
| Bilder | 9 |

> Nicht zu verwechseln mit `Campus Quiz/`. Das ist die **Quelle** und gehört
> nicht hochgeladen: Dort liegen neben `public/` auch `FRAGENKATALOG.md` mit
> sämtlichen Lösungen, die Werkzeuge und das Migrations-SQL. Dieses Paket
> enthält nur, was ausgeliefert werden soll.

---

## Eine Site oder sieben?

Beides ist gebaut — die sieben Einzelpakete liegen als `<Insel> Quiz/` daneben.
Der Unterschied, der im Schulungsalltag zählt:

| | Sieben Sites | Dieses Paket |
|---|---|---|
| Name, Betrieb, Händlernummer | **siebenmal eintippen** | einmal, dann gespeichert |
| Fortschritt über die Inseln | nicht sichtbar | Übersicht zeigt „Abgeschlossen · 90 %" |
| Umgebungsvariablen | 7 × 2 setzen | 2 setzen |
| Fragen-Update | 7 × neu hochladen | einmal |

Der Grund für die erste Zeile: Die Teilnehmerangaben liegen im localStorage,
und der gilt **pro Domain**. Sieben Sites sind sieben Domains.

---

## Hochladen

1. Auf [app.netlify.com](https://app.netlify.com) einloggen
2. **Add new site → Deploy manually**
3. **Diesen kompletten Ordner** ins Feld ziehen — nicht nur `public/`.
   Sonst fehlt die Function und es wird nichts gespeichert.

### Danach zwingend: die zwei Umgebungsvariablen

**Site configuration → Environment variables → Add a variable**

| Name | Wert |
|---|---|
| `SUPABASE_URL` | `https://mhzlayhnyqlxdyiceyqz.supabase.co` |
| `SUPABASE_SECRET_KEY` | Der Secret Key aus den Supabase-Projekteinstellungen |

Danach **einmal neu deployen** — Umgebungsvariablen greifen erst beim nächsten
Bau.

> Der Secret Key gehört ausschließlich hierhin, nie in den Browser-Code. Er
> umgeht Row Level Security.

---

## Prüfen, ob es wirklich läuft

Erst mit `?demo=1` durchspielen — das speichert absichtlich nichts:

    https://<deine-adresse>.netlify.app/quiz?demo=1

Dann **einmal ohne** `?demo=1`. Unter dem Ergebnis muss stehen:

> Ergebnis gespeichert. Danke!

Steht dort etwas anderes, ist es eine dieser drei Ursachen:

| Meldung | Ursache |
|---|---|
| „Backend ist noch nicht vollständig konfiguriert" | Umgebungsvariablen fehlen oder es wurde danach nicht neu deployt |
| „Die Datenbank hat die Speicherung abgelehnt" | Die Tabelle `campus_quiz_submissions` fehlt — Migration einspielen |
| „Keine Verbindung" | Die Function wurde nicht mitdeployt: der komplette Ordner muss hoch, nicht nur `public/` |

Zum Nachsehen in Supabase:

```sql
select created_at, island_code, participant, dealer_number, percent
  from public.campus_quiz_submissions
 order by created_at desc
 limit 20;
```

---

## QR-Codes für die Stationen

Ein QR-Code je Insel, jeweils auf die Insel-Adresse:

| Insel | Adresse | Fragen | Thema |
|---|---|---|---|
| **VEJRØ** | `/quiz/vejro` | 10 | CampLock & VanLock Fingerprint |
| **POEL** | `/quiz/poel` | 10 | Händlerbereich |
| **HIDDENSEE** | `/quiz/hiddensee` | 10 | Funk-Magnetkontakt & Adapter |
| **SAMSØ** | `/quiz/samsoe` | 10 | Einbauorte im Fahrzeug |
| **FEHMARN** | `/quiz/fehmarn` | 10 | Fehlersuche & Support |
| **USEDOM** | `/quiz/usedom` | 10 | Verkaufsdisplay & Konfigurator |
| **LANGELAND** | `/quiz/langeland` | 10 | Fahrzeugannahme & Fahrzeugübergabe |

Die nackte Adresse `https://<deine-adresse>.netlify.app/` zeigt die
**Inselübersicht** — praktisch für den Empfang oder als Ausweichweg, wenn ein
Stations-QR nicht lesbar ist.

---

## Was hier drin liegt

    netlify.toml                  Netlify-Konfiguration
    netlify/functions/            Nimmt Ergebnisse an und bewertet serverseitig
    public/index.html             Die Seite
    public/assets/                Engine, Stile, Logo
    public/data/                  Inselübersicht und alle 7 Fragensätze
    public/media/                 Die Bilder

Der Browser bekommt nie zu sehen, welche Antwort richtig gewertet wird — er
sendet nur, **was** gewählt wurde. Bewertet wird in der Function, gegen
dieselben JSON-Dateien, die auch die Engine ausliefert.
