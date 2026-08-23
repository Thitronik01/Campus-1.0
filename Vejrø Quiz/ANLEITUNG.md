# VEJRØ — CampLock & VanLock Fingerprint

Fertiges Netlify-Paket für die Schulungsinsel VEJRØ.
**Wird erzeugt** — Änderungen gehören nach `Campus 1.0/Campus Quiz/`.

| | |
|---|---|
| Fragen | 10 |
| Fragensatz-Version | 3 |
| Bilder | keine |

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

    https://<deine-adresse>.netlify.app/?demo=1

Dann **einmal ohne** `?demo=1`. Unter dem Ergebnis muss stehen:

> Ergebnis gespeichert. Danke!

Steht dort etwas anderes, ist es eine dieser drei Ursachen:

| Meldung | Ursache |
|---|---|
| „Backend ist noch nicht vollständig konfiguriert" | Umgebungsvariablen fehlen oder es wurde danach nicht neu deployt |
| „Die Datenbank hat die Speicherung abgelehnt" | Die Tabelle `campus_quiz_submissions` fehlt — Migration einspielen |
| „Noch keine Verbindung" | Die Function wurde nicht mitdeployt: der komplette Ordner muss hoch, nicht nur `public/` |

**Ein Ergebnis geht dabei nicht verloren.** Es liegt auf dem Gerät, bis der
Server bestätigt hat, und wird von selbst nachgesendet — beim nächsten Aufruf
der Seite oder sobald wieder Empfang da ist. Solange etwas aussteht, steht
oben ein Hinweisband mit „Jetzt senden", und die Insel meldet „noch nicht
gesendet" statt „abgeschlossen".

Das heißt auch: Wer den Fehler oben behebt und die Teilnehmer die Seite noch
einmal aufrufen lässt, bekommt die liegengebliebenen Ergebnisse nachträglich
noch in die Datenbank.

Zum Nachsehen in Supabase:

```sql
select created_at, participant, dealer, dealer_number, percent, duration_seconds
  from public.campus_quiz_submissions
 where island = 'vejro'
 order by created_at desc
 limit 10;
```

---

## QR-Code für die Station

Auf die nackte Adresse zeigen lassen:

    https://<deine-adresse>.netlify.app/

Die Engine geht direkt in VEJRØ — es gibt in diesem Paket keine
Inselauswahl.

---

## Was hier drin liegt

    netlify.toml                  Netlify-Konfiguration
    netlify/functions/            Nimmt Ergebnisse an und bewertet serverseitig
    public/index.html             Die Seite
    public/assets/                Engine, Stile, Logo
    public/data/                  Der Fragensatz
    public/media/                 Die Bilder (in diesem Paket keine)

Der Browser bekommt nie zu sehen, welche Antwort richtig gewertet wird — er
sendet nur, **was** gewählt wurde. Bewertet wird in der Function.
