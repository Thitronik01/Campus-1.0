"use strict";

/* ==========================================================================
   Baut aus der gemeinsamen Quelle einen fertigen, eigenständigen
   Netlify-Ordner für eine Insel.

     node tools/build-insel.js samsoe
     node tools/build-insel.js alle

   Warum erzeugt statt von Hand kopiert:
   Sieben Kopien der Engine wären sieben Stellen, an denen dieselbe Änderung
   nachgezogen werden muss — genau das Problem, das dieses Projekt ablösen
   soll. Hier bleibt die Wahrheit in Campus Quiz/, die Insel-Ordner sind
   Ausgabe. Wer in einem Insel-Ordner etwas ändert, verliert es beim nächsten
   Bau; die Datei ZIEL-ORDNER-WIRD-ERZEUGT.txt sagt das auch dort.

   Die Ordner der Bestandsquizze (Fehmarn, Vejrø) werden NICHT überschrieben —
   dort liegen die laufenden Quizze mit eigener Geschichte.
   ========================================================================== */

const fs = require("fs");
const path = require("path");

const WURZEL = path.join(__dirname, "..");
const PROJEKT = path.join(WURZEL, "..");            // "Campus 1.0"
const MARKER = "ZIEL-ORDNER-WIRD-ERZEUGT.txt";

/** Ordnername je Insel. Bewusst wie die bestehenden Ordner benannt. */
const ORDNER = {
  vejro: "Vejrø Quiz",
  poel: "Poel Quiz",
  hiddensee: "Hiddensee Quiz",
  samsoe: "Samsø Quiz",
  fehmarn: "Fehmarn Quiz",
  usedom: "Usedom Quiz",
  langeland: "Langeland Quiz"
};

/** Das Gesamtpaket: alle sieben Inseln auf einer Netlify-Site.
 *
 *  Der Name hält bewusst Abstand zu "Campus Quiz" — das ist die Quelle und
 *  gehört NICHT hochgeladen. Dort liegen neben public/ auch FRAGENKATALOG.md
 *  mit sämtlichen Lösungen, die Werkzeuge und das Migrations-SQL. Ausgeliefert
 *  würde davon nichts, weil publish auf "public" zeigt — aber das hängt dann
 *  an einer einzigen Zeile. Dieses Paket enthält von vornherein nur das, was
 *  ausgeliefert werden soll. */
const GESAMT = "Campus Gesamtpaket";

/* Ein Schutz gegen versehentliches Überschreiben ist unten eingebaut: ein
   Zielordner, der Inhalt hat und keinen MARKER trägt, wurde nicht von diesem
   Werkzeug erzeugt und wird übersprungen. Damit ist keine gepflegte Liste
   nötig — "Fehmarn Quiz" etwa schützt sich dadurch von selbst. */

// ------------------------------------------------------------------ Helfer --

function lies(...teile) {
  return fs.readFileSync(path.join(WURZEL, ...teile), "utf8");
}

function schreib(ziel, inhalt) {
  fs.mkdirSync(path.dirname(ziel), { recursive: true });
  fs.writeFileSync(ziel, inhalt, "utf8");
}

function kopiere(von, nach) {
  fs.mkdirSync(path.dirname(nach), { recursive: true });
  fs.copyFileSync(von, nach);
}

/** Leert einen Ordner, ohne ihn selbst zu entfernen.
 *
 *  Unter Windows scheitert das Löschen des Ordners mit EPERM, sobald irgendwer
 *  ihn offen hält — ein Explorer-Fenster genügt, der Virenscanner auch. Der
 *  Ordner selbst muss aber gar nicht weg: nur sein Inhalt. Das ist zugleich
 *  freundlicher, weil ein geöffnetes Explorer-Fenster bestehen bleibt. */
function leeren(ordner) {
  for (const eintrag of fs.readdirSync(ordner)) {
    const pfad = path.join(ordner, eintrag);
    for (let versuch = 1; ; versuch++) {
      try {
        fs.rmSync(pfad, { recursive: true, force: true });
        break;
      } catch (error) {
        // Kurz warten und erneut versuchen — Virenscanner geben die Datei
        // meist nach Millisekunden wieder frei.
        if (versuch >= 3) {
          throw new Error(
            `${eintrag} lässt sich nicht ersetzen (${error.code}). ` +
            `Offene Programme auf dem Ordner schließen und erneut bauen.`);
        }
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 150);
      }
    }
  }
}

/** Die netlify.toml ist für Einzelinsel und Gesamtpaket identisch — bis auf
 *  den Kommentar, der erklärt, wohin die Routen führen. Einmal geschrieben,
 *  damit eine Änderung an den Headern nicht an zwei Stellen nachgezogen
 *  werden muss. */
function netlifyToml(kommentar) {
  return `[build]
  publish = "public"
  functions = "netlify/functions"

[functions]
  node_bundler = "esbuild"

${kommentar}
[[redirects]]
  from = "/quiz/*"
  to = "/index.html"
  status = 200

[[redirects]]
  from = "/quiz"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "SAMEORIGIN"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"

[[headers]]
  for = "/index.html"
  [headers.values]
    Cache-Control = "no-cache"

[[headers]]
  for = "/data/*"
  [headers.values]
    Cache-Control = "public, max-age=300, must-revalidate"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/media/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/.netlify/functions/*"
  [headers.values]
    Cache-Control = "no-store"
`;
}

/** Text der Marker-Datei. Sie steht in jedem erzeugten Ordner und ist zugleich
 *  der Überschreibschutz: Ein Zielordner mit Inhalt, aber ohne Marker, wurde
 *  nicht von diesem Werkzeug erzeugt und wird übersprungen. */
function markerText(befehl) {
  return `Dieser Ordner wird erzeugt und bei jedem Bau vollständig ersetzt.

Änderungen gehören nach:
  Campus 1.0/Campus Quiz/

Neu bauen:
  cd "Campus 1.0/Campus Quiz"
  node tools/build-insel.js ${befehl}

Erzeugt am: (siehe Dateidatum)
`;
}

/** Gemeinsamer Überschreibschutz. Gibt false zurück, wenn der Ordner stehen
 *  bleiben muss. */
function zielVorbereiten(ziel, ordnerName) {
  if (fs.existsSync(ziel)) {
    const inhalt = fs.readdirSync(ziel);
    if (inhalt.length && !inhalt.includes(MARKER)) {
      console.error(`  ÜBERSPRUNGEN  ${ordnerName} — nicht leer und nicht von diesem Werkzeug erzeugt.`);
      console.error(`                Vorhandenes erst wegräumen, dann erneut bauen.`);
      return false;
    }
    leeren(ziel);
  }
  return true;
}

// ------------------------------------------------------------------- Bauen --

function baue(slug) {
  const katalog = JSON.parse(lies("public", "data", "inseln.json"));
  const insel = katalog.inseln.find((i) => i.slug === slug);
  if (!insel) throw new Error(`Unbekannte Insel: ${slug}`);

  const satzDatei = path.join(WURZEL, "public", "data", "inseln", `${slug}.json`);
  const satz = JSON.parse(fs.readFileSync(satzDatei, "utf8"));

  const ordnerName = ORDNER[slug];
  if (!ordnerName) throw new Error(`Kein Ordnername für ${slug} hinterlegt.`);

  const ziel = path.join(PROJEKT, ordnerName);

  // Nur den Marker prüfen, wenn der Ordner Inhalt hat: ein bestehender,
  // nicht von uns erzeugter Ordner soll nicht stillschweigend verschwinden.
  if (!zielVorbereiten(ziel, ordnerName)) return null;

  const oeff = path.join(ziel, "public");

  // --- index.html: nur der Titel wird angepasst --------------------------
  let html = lies("public", "index.html");
  html = html
    .replace(/<title>.*?<\/title>/,
      `<title>${satz.code} — ${satz.title} · THITRONIK Campus</title>`)
    .replace(/<meta name="description" content=".*?">/,
      `<meta name="description" content="THITRONIK Campus — Wissenscheck ${satz.code}: ${satz.title}.">`);
  schreib(path.join(oeff, "index.html"), html);

  // --- Engine und Stile unverändert --------------------------------------
  kopiere(path.join(WURZEL, "public", "assets", "engine.js"), path.join(oeff, "assets", "engine.js"));
  kopiere(path.join(WURZEL, "public", "assets", "styles.css"), path.join(oeff, "assets", "styles.css"));
  kopiere(path.join(WURZEL, "public", "assets", "thitronik-logo.png"), path.join(oeff, "assets", "thitronik-logo.png"));

  // --- Daten: Katalog auf genau diese eine Insel eindampfen ---------------
  // Die Engine erkennt daran den Einzelbetrieb und überspringt die Übersicht.
  schreib(path.join(oeff, "data", "inseln.json"),
    JSON.stringify({ event: katalog.event, titel: katalog.titel, inseln: [insel] }, null, 2) + "\n");
  kopiere(satzDatei, path.join(oeff, "data", "inseln", `${slug}.json`));

  // --- Bilder -------------------------------------------------------------
  const bildQuelle = path.join(WURZEL, "public", "media", slug);
  let bilder = 0;
  if (fs.existsSync(bildQuelle)) {
    for (const datei of fs.readdirSync(bildQuelle)) {
      kopiere(path.join(bildQuelle, datei), path.join(oeff, "media", slug, datei));
      bilder++;
    }
  }

  // --- Function: nur diese eine Insel einbinden ---------------------------
  let fn = lies("netlify", "functions", "submit-quiz.js");
  fn = fn.replace(
    /const ISLANDS = \{[\s\S]*?\};/,
    `const ISLANDS = {\n  ${slug}: require("../../public/data/inseln/${slug}.json")\n};`
  );
  schreib(path.join(ziel, "netlify", "functions", "submit-quiz.js"), fn);

  // --- netlify.toml -------------------------------------------------------
  schreib(path.join(ziel, "netlify.toml"), netlifyToml(
    `# Einzel-Insel-Paket: jede Adresse liefert dieselbe Seite, die Engine geht
` +
    `# direkt in ${satz.code}.`));

  // --- Marker und Anleitung ----------------------------------------------
  schreib(path.join(ziel, MARKER), markerText(slug));

  schreib(path.join(ziel, "ANLEITUNG.md"), anleitung(satz, insel, bilder));

  return { ordnerName, ziel, bilder, fragen: satz.questions.length, version: satz.version };
}

/** Alle sieben Inseln auf einer Site: Übersicht unter /quiz, jede Insel unter
 *  /quiz/<slug>.
 *
 *  Der Unterschied zum Einzelpaket ist klein und liegt fast ganz in den Daten:
 *  Der Katalog bleibt vollständig, damit die Engine die Übersicht zeigt statt
 *  direkt in eine Insel zu springen. Die Function wird unverändert kopiert —
 *  sie bindet ohnehin alle sieben ein, und ihre require-Pfade sind relativ zu
 *  netlify/functions/, also im Paket dieselben wie in der Quelle.
 *
 *  Der eigentliche Gewinn steckt aber nicht in der Technik: localStorage gilt
 *  pro Domain. Auf einer Site trägt der Händler Name, Betrieb und Nummer
 *  einmal ein statt siebenmal, und die Übersicht zeigt ihm, welche Inseln er
 *  schon hinter sich hat. */
function baueGesamt() {
  const katalog = JSON.parse(lies("public", "data", "inseln.json"));
  const ziel = path.join(PROJEKT, GESAMT);

  if (!zielVorbereiten(ziel, GESAMT)) return null;

  const oeff = path.join(ziel, "public");

  // --- index.html: Titel bleibt allgemein, es ist keine einzelne Insel ----
  let html = lies("public", "index.html");
  html = html
    .replace(/<title>.*?<\/title>/,
      `<title>Wissenscheck · THITRONIK Campus</title>`)
    .replace(/<meta name="description" content=".*?">/,
      `<meta name="description" content="THITRONIK Campus — Wissenscheck zu allen sieben Schulungsinseln.">`);
  schreib(path.join(oeff, "index.html"), html);

  // --- Engine und Stile unverändert --------------------------------------
  kopiere(path.join(WURZEL, "public", "assets", "engine.js"), path.join(oeff, "assets", "engine.js"));
  kopiere(path.join(WURZEL, "public", "assets", "styles.css"), path.join(oeff, "assets", "styles.css"));
  kopiere(path.join(WURZEL, "public", "assets", "thitronik-logo.png"), path.join(oeff, "assets", "thitronik-logo.png"));

  // --- Daten: vollständiger Katalog, alle Fragensätze --------------------
  kopiere(path.join(WURZEL, "public", "data", "inseln.json"),
    path.join(oeff, "data", "inseln.json"));

  const inseln = [];
  let fragen = 0;
  for (const eintrag of katalog.inseln) {
    const satzDatei = path.join(WURZEL, "public", "data", "inseln", `${eintrag.slug}.json`);
    if (!fs.existsSync(satzDatei)) throw new Error(`Fragensatz fehlt: ${eintrag.slug}.json`);
    kopiere(satzDatei, path.join(oeff, "data", "inseln", `${eintrag.slug}.json`));
    const satz = JSON.parse(fs.readFileSync(satzDatei, "utf8"));
    inseln.push(satz);
    fragen += satz.questions.length;
  }

  // --- Bilder aller Inseln ------------------------------------------------
  let bilder = 0;
  for (const eintrag of katalog.inseln) {
    const bildQuelle = path.join(WURZEL, "public", "media", eintrag.slug);
    if (!fs.existsSync(bildQuelle)) continue;
    for (const datei of fs.readdirSync(bildQuelle)) {
      kopiere(path.join(bildQuelle, datei), path.join(oeff, "media", eintrag.slug, datei));
      bilder++;
    }
  }

  // --- Function unverändert: sie kennt bereits alle sieben Inseln --------
  kopiere(path.join(WURZEL, "netlify", "functions", "submit-quiz.js"),
    path.join(ziel, "netlify", "functions", "submit-quiz.js"));

  // --- netlify.toml -------------------------------------------------------
  schreib(path.join(ziel, "netlify.toml"), netlifyToml(
    `# Gesamtpaket: /quiz zeigt die Inselübersicht, /quiz/<insel> geht direkt\n` +
    `# in eine Insel. Beides liefert dieselbe index.html.`));

  // --- Marker und Anleitung ----------------------------------------------
  schreib(path.join(ziel, MARKER), markerText("gesamt"));
  schreib(path.join(ziel, "ANLEITUNG.md"), anleitungGesamt(katalog, inseln, bilder));

  return { ordnerName: GESAMT, ziel, bilder, fragen, inseln: inseln.length };
}

// -------------------------------------------------------------- Anleitung --

function anleitung(satz, insel, bilder) {
  return `# ${satz.code} — ${satz.title}

Fertiges Netlify-Paket für die Schulungsinsel ${satz.code}.
**Wird erzeugt** — Änderungen gehören nach \`Campus 1.0/Campus Quiz/\`.

| | |
|---|---|
| Fragen | ${satz.questions.length} |
| Fragensatz-Version | ${satz.version} |
| Bilder | ${bilder || "keine"} |

---

## Hochladen

1. Auf [app.netlify.com](https://app.netlify.com) einloggen
2. **Add new site → Deploy manually**
3. **Diesen kompletten Ordner** ins Feld ziehen — nicht nur \`public/\`.
   Sonst fehlt die Function und es wird nichts gespeichert.

### Danach zwingend: die zwei Umgebungsvariablen

**Site configuration → Environment variables → Add a variable**

| Name | Wert |
|---|---|
| \`SUPABASE_URL\` | \`https://mhzlayhnyqlxdyiceyqz.supabase.co\` |
| \`SUPABASE_SECRET_KEY\` | Der Secret Key aus den Supabase-Projekteinstellungen |

Danach **einmal neu deployen** — Umgebungsvariablen greifen erst beim nächsten
Bau.

> Der Secret Key gehört ausschließlich hierhin, nie in den Browser-Code. Er
> umgeht Row Level Security.

---

## Prüfen, ob es wirklich läuft

Erst mit \`?demo=1\` durchspielen — das speichert absichtlich nichts:

    https://<deine-adresse>.netlify.app/?demo=1

Dann **einmal ohne** \`?demo=1\`. Unter dem Ergebnis muss stehen:

> Ergebnis gespeichert. Danke!

Steht dort etwas anderes, ist es eine dieser drei Ursachen:

| Meldung | Ursache |
|---|---|
| „Backend ist noch nicht vollständig konfiguriert" | Umgebungsvariablen fehlen oder es wurde danach nicht neu deployt |
| „Die Datenbank hat die Speicherung abgelehnt" | Die Tabelle \`campus_quiz_submissions\` fehlt — Migration einspielen |
| „Noch keine Verbindung" | Die Function wurde nicht mitdeployt: der komplette Ordner muss hoch, nicht nur \`public/\` |

**Ein Ergebnis geht dabei nicht verloren.** Es liegt auf dem Gerät, bis der
Server bestätigt hat, und wird von selbst nachgesendet — beim nächsten Aufruf
der Seite oder sobald wieder Empfang da ist. Solange etwas aussteht, steht
oben ein Hinweisband mit „Jetzt senden", und die Insel meldet „noch nicht
gesendet" statt „abgeschlossen".

Das heißt auch: Wer den Fehler oben behebt und die Teilnehmer die Seite noch
einmal aufrufen lässt, bekommt die liegengebliebenen Ergebnisse nachträglich
noch in die Datenbank.

Zum Nachsehen in Supabase:

\`\`\`sql
select created_at, participant, dealer, dealer_number, percent, duration_seconds
  from public.campus_quiz_submissions
 where island = '${satz.island}'
 order by created_at desc
 limit 10;
\`\`\`

---

## QR-Code für die Station

Auf die nackte Adresse zeigen lassen:

    https://<deine-adresse>.netlify.app/

Die Engine geht direkt in ${satz.code} — es gibt in diesem Paket keine
Inselauswahl.

---

## Was hier drin liegt

    netlify.toml                  Netlify-Konfiguration
    netlify/functions/            Nimmt Ergebnisse an und bewertet serverseitig
    public/index.html             Die Seite
    public/assets/                Engine, Stile, Logo
    public/data/                  Der Fragensatz
    public/media/                 Die Bilder${bilder ? "" : " (in diesem Paket keine)"}

Der Browser bekommt nie zu sehen, welche Antwort richtig gewertet wird — er
sendet nur, **was** gewählt wurde. Bewertet wird in der Function.
`;
}

function anleitungGesamt(katalog, inseln, bilder) {
  const zeilen = katalog.inseln.map((eintrag, i) => {
    const satz = inseln[i];
    return `| **${eintrag.code}** | \`/quiz/${eintrag.slug}\` | ${satz.questions.length} | ${satz.title} |`;
  }).join("\n");

  const fragen = inseln.reduce((s, i) => s + i.questions.length, 0);

  return `# THITRONIK Campus — Wissenscheck, alle Inseln

Fertiges Netlify-Paket mit **allen ${inseln.length} Schulungsinseln auf einer Site**.
**Wird erzeugt** — Änderungen gehören nach \`Campus 1.0/Campus Quiz/\`.

| | |
|---|---|
| Inseln | ${inseln.length} |
| Fragen | ${fragen} |
| Bilder | ${bilder || "keine"} |

> Nicht zu verwechseln mit \`Campus Quiz/\`. Das ist die **Quelle** und gehört
> nicht hochgeladen: Dort liegen neben \`public/\` auch \`FRAGENKATALOG.md\` mit
> sämtlichen Lösungen, die Werkzeuge und das Migrations-SQL. Dieses Paket
> enthält nur, was ausgeliefert werden soll.

---

## Eine Site oder sieben?

Beides ist gebaut — die sieben Einzelpakete liegen als \`<Insel> Quiz/\` daneben.
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
3. **Diesen kompletten Ordner** ins Feld ziehen — nicht nur \`public/\`.
   Sonst fehlt die Function und es wird nichts gespeichert.

### Danach zwingend: die zwei Umgebungsvariablen

**Site configuration → Environment variables → Add a variable**

| Name | Wert |
|---|---|
| \`SUPABASE_URL\` | \`https://mhzlayhnyqlxdyiceyqz.supabase.co\` |
| \`SUPABASE_SECRET_KEY\` | Der Secret Key aus den Supabase-Projekteinstellungen |

Danach **einmal neu deployen** — Umgebungsvariablen greifen erst beim nächsten
Bau.

> Der Secret Key gehört ausschließlich hierhin, nie in den Browser-Code. Er
> umgeht Row Level Security.

---

## Prüfen, ob es wirklich läuft

Erst mit \`?demo=1\` durchspielen — das speichert absichtlich nichts:

    https://<deine-adresse>.netlify.app/quiz?demo=1

Dann **einmal ohne** \`?demo=1\`. Unter dem Ergebnis muss stehen:

> Ergebnis gespeichert. Danke!

Steht dort etwas anderes, ist es eine dieser drei Ursachen:

| Meldung | Ursache |
|---|---|
| „Backend ist noch nicht vollständig konfiguriert" | Umgebungsvariablen fehlen oder es wurde danach nicht neu deployt |
| „Die Datenbank hat die Speicherung abgelehnt" | Die Tabelle \`campus_quiz_submissions\` fehlt — Migration einspielen |
| „Noch keine Verbindung" | Die Function wurde nicht mitdeployt: der komplette Ordner muss hoch, nicht nur \`public/\` |

**Ein Ergebnis geht dabei nicht verloren.** Es liegt auf dem Gerät, bis der
Server bestätigt hat, und wird von selbst nachgesendet — beim nächsten Aufruf
der Seite oder sobald wieder Empfang da ist. Solange etwas aussteht, steht
oben ein Hinweisband mit „Jetzt senden", und die Insel meldet „noch nicht
gesendet" statt „abgeschlossen".

Das heißt auch: Wer den Fehler oben behebt und die Teilnehmer die Seite noch
einmal aufrufen lässt, bekommt die liegengebliebenen Ergebnisse nachträglich
noch in die Datenbank.

Zum Nachsehen in Supabase:

\`\`\`sql
select created_at, island_code, participant, dealer_number, percent
  from public.campus_quiz_submissions
 order by created_at desc
 limit 20;
\`\`\`

---

## QR-Codes für die Stationen

Ein QR-Code je Insel, jeweils auf die Insel-Adresse:

| Insel | Adresse | Fragen | Thema |
|---|---|---|---|
${zeilen}

Die nackte Adresse \`https://<deine-adresse>.netlify.app/\` zeigt die
**Inselübersicht** — praktisch für den Empfang oder als Ausweichweg, wenn ein
Stations-QR nicht lesbar ist.

---

## Was hier drin liegt

    netlify.toml                  Netlify-Konfiguration
    netlify/functions/            Nimmt Ergebnisse an und bewertet serverseitig
    public/index.html             Die Seite
    public/assets/                Engine, Stile, Logo
    public/data/                  Inselübersicht und alle ${inseln.length} Fragensätze
    public/media/                 Die Bilder${bilder ? "" : " (in diesem Paket keine)"}

Der Browser bekommt nie zu sehen, welche Antwort richtig gewertet wird — er
sendet nur, **was** gewählt wurde. Bewertet wird in der Function, gegen
dieselben JSON-Dateien, die auch die Engine ausliefert.
`;
}

// ---------------------------------------------------------------- Aufruf ----

const arg = process.argv[2];
if (!arg) {
  console.error("Aufruf: node tools/build-insel.js <insel|alle|gesamt>\n");
  console.error("  <insel>   ein Einzelpaket        " + Object.keys(ORDNER).join(", "));
  console.error("  alle      alle sieben Einzelpakete");
  console.error("  gesamt    alle Inseln auf einer Site → " + GESAMT);
  process.exit(1);
}

const gebaut = [];

if (arg === "gesamt") {
  try {
    const r = baueGesamt();
    if (r) {
      gebaut.push(r);
      console.log(`  gebaut  ${r.ordnerName.padEnd(18)} ${r.inseln} Inseln, ${r.fragen} Fragen, ${r.bilder} Bilder`);
      console.log(`\nEin Paket erzeugt: Übersicht unter /quiz, jede Insel unter /quiz/<slug>.`);
    }
  } catch (error) {
    console.error(`  FEHLER  gesamt: ${error.message}`);
    process.exitCode = 1;
  }
} else {
  const slugs = arg === "alle" ? Object.keys(ORDNER) : [arg];

  for (const slug of slugs) {
    try {
      const r = baue(slug);
      if (r) {
        gebaut.push(r);
        console.log(`  gebaut  ${r.ordnerName.padEnd(18)} ${r.fragen} Fragen, v${r.version}, ${r.bilder} Bilder`);
      }
    } catch (error) {
      console.error(`  FEHLER  ${slug}: ${error.message}`);
      process.exitCode = 1;
    }
  }

  if (gebaut.length) {
    console.log(`\n${gebaut.length} Paket(e) erzeugt. Jeder Ordner ist einzeln bei Netlify hochladbar.`);
  }
}
