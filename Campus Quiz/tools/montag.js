"use strict";

/* ==========================================================================
   Arbeitsbeginn — ein Befehl, der den Stand herstellt und beweist.

     cd "Campus Quiz"
     node tools/montag.js

   Reihenfolge ist Absicht: erst bauen, dann prüfen, erst danach der Server.
   Ein Entwicklungsserver, der auf einem kaputten Stand läuft, sieht aus wie
   ein funktionierendes Projekt — das ist genau die halbe Stunde, die man
   morgens nicht verlieren will.

     --ohne-server   nur bauen und prüfen (für die Prüfung vor einem Commit)
     --schnell       Pakete nicht neu bauen, nur prüfen
   ========================================================================== */

const { execFileSync, spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const QUELLE = path.join(__dirname, "..");
const PROJEKT = path.join(QUELLE, "..");
const OHNE_SERVER = process.argv.includes("--ohne-server");
const SCHNELL = process.argv.includes("--schnell");

const INSELN = ["vejro", "poel", "hiddensee", "samsoe", "fehmarn", "usedom", "langeland"];
const PAKETE = {
  vejro: "Vejrø Quiz", poel: "Poel Quiz", hiddensee: "Hiddensee Quiz",
  samsoe: "Samsø Quiz", fehmarn: "Fehmarn Quiz", usedom: "Usedom Quiz",
  langeland: "Langeland Quiz"
};

// Farben nur, wenn wirklich ein Terminal dranhängt — in einer Log-Datei
// wären es sonst unlesbare Steuerzeichen.
const farbig = process.stdout.isTTY && !process.env.NO_COLOR;
const f = (code, text) => (farbig ? `[${code}m${text}[0m` : text);
const gruen = (t) => f("32", t);
const rot = (t) => f("31", t);
const gelb = (t) => f("33", t);
const grau = (t) => f("90", t);
const fett = (t) => f("1", t);

function titel(text) {
  console.log(`\n${fett(text)}\n${grau("─".repeat(Math.max(text.length, 34)))}`);
}

/** Führt ein Werkzeug aus und gibt seine Ausgabe zurück, ohne sie zu zeigen.
 *  Gezeigt wird sie nur im Fehlerfall — dann aber vollständig. */
function lauf(datei, argumente, arbeitsverzeichnis = QUELLE) {
  try {
    const ausgabe = execFileSync(process.execPath, [datei, ...argumente], {
      cwd: arbeitsverzeichnis,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      maxBuffer: 32 * 1024 * 1024
    });
    return { ok: true, ausgabe };
  } catch (fehler) {
    return {
      ok: false,
      ausgabe: `${fehler.stdout || ""}${fehler.stderr || ""}` || String(fehler)
    };
  }
}

let fehlgeschlagen = 0;

/** Aus der Ausgabe eines Werkzeugs die Zeilen herausziehen, die etwas sagen.
 *
 *  Die Werkzeuge schreiben auf dem Negativpfad absichtlich Stapelspuren mit —
 *  "Ungültige Einsendung: Error ..." ist dort ein bestandener Test, kein
 *  Problem. Ungefiltert sind das über hundert Zeilen Rauschen um die drei
 *  Zeilen herum, auf die es ankommt. Wer die volle Ausgabe braucht, ruft das
 *  Werkzeug einzeln auf; der Hinweis darauf steht darunter. */
function kernAussage(text) {
  const GRENZE = 8;

  // Nur die Marker, die die Werkzeuge selbst für ein Problem setzen. Ein
  // "Ungültige Einsendung: Error ..." ist hier gerade KEIN Problem — die
  // Werkzeuge prüfen Abweisungen und protokollieren sie dabei mit.
  const treffer = [...new Set(
    text.trim().split("\n").filter((z) => /^\s*(FEHLT|FEHLER)\b/.test(z))
  )];

  // Kein Marker heißt: das Werkzeug ist abgestürzt statt durchgefallen. Dann
  // steht das Wesentliche am Ende, nicht am Anfang.
  if (!treffer.length) return text.trim().split("\n").slice(-GRENZE).join("\n");

  return treffer.slice(0, GRENZE).join("\n")
    + (treffer.length > GRENZE ? `\n… und ${treffer.length - GRENZE} weitere` : "");
}

/** `ergebnis.schonGekuerzt` verhindert, dass eine bereits aufbereitete
 *  Meldung ein zweites Mal durch kernAussage läuft — die Hinweiszeilen
 *  darin tragen keinen Fehlermarker und fielen sonst wieder heraus. */
function schritt(name, ergebnis, kurzfassung) {
  if (ergebnis.ok) {
    console.log(`  ${gruen("ok")}    ${name}${kurzfassung ? grau("  " + kurzfassung) : ""}`);
    return true;
  }
  fehlgeschlagen += 1;
  console.log(`  ${rot("FEHLT")} ${name}`);
  const text = ergebnis.schonGekuerzt ? ergebnis.ausgabe : kernAussage(ergebnis.ausgabe);
  console.log(grau(text.split("\n").map((z) => "        " + z).join("\n")));
  return false;
}

// ------------------------------------------------------------------ Stand ---

titel("Wo stehen wir");

try {
  const zweig = execFileSync("git", ["rev-parse", "--abbrev-ref", "HEAD"],
    { cwd: PROJEKT, encoding: "utf8" }).trim();
  const schmutzig = execFileSync("git", ["status", "--porcelain"],
    { cwd: PROJEKT, encoding: "utf8" }).trim();
  const letzter = execFileSync("git", ["log", "-1", "--format=%h  %s"],
    { cwd: PROJEKT, encoding: "utf8" }).trim();

  console.log(`  Zweig          ${zweig}`);
  console.log(`  Letzter Commit ${letzter}`);
  console.log(`  Arbeitskopie   ${schmutzig ? gelb(schmutzig.split("\n").length + " Datei(en) geändert") : "sauber"}`);

  // Regel 1 aus CLAUDE.md: der weiteste Stand ist nicht automatisch main.
  const zweige = execFileSync("git", ["for-each-ref", "--format=%(refname:short)", "refs/remotes/origin"],
    { cwd: PROJEKT, encoding: "utf8" }).trim().split("\n").filter((z) => z && !z.endsWith("/HEAD"));

  const voraus = zweige.filter((z) => {
    try {
      const n = execFileSync("git", ["rev-list", "--count", `HEAD..${z}`],
        { cwd: PROJEKT, encoding: "utf8" }).trim();
      return Number(n) > 0;
    } catch { return false; }
  });

  if (voraus.length) {
    console.log(`\n  ${gelb("Achtung:")} diese Zweige haben Commits, die hier fehlen:`);
    voraus.forEach((z) => {
      const n = execFileSync("git", ["rev-list", "--count", `HEAD..${z}`],
        { cwd: PROJEKT, encoding: "utf8" }).trim();
      console.log(`    ${z}  (${n})`);
    });
    console.log(grau("    Erst darauf aufsetzen, dann anfangen — siehe CLAUDE.md, Regel 1."));
  } else {
    console.log(`  Andere Zweige  ${grau("nichts, was hier fehlt")}`);
  }
} catch {
  console.log(grau("  (kein Git-Repository oder git nicht im Pfad — übersprungen)"));
}

// ------------------------------------------------------------------- Bau ---

if (!SCHNELL) {
  titel("Pakete bauen");
  const feedbackQuelle = path.join(PROJEKT, "Feedbackbogen");
  schritt("Feedbackbogen erzeugen", lauf(path.join("tools", "build-index-v14.js"), [], feedbackQuelle));
  schritt("Feedbackbogen als Einzeldatei", lauf(path.join("tools", "build-standalone.js"), [], feedbackQuelle));
  schritt("Feedbackbogen für Netlify", lauf(path.join("tools", "build-netlify.js"), [], feedbackQuelle));
  schritt("Gesamtpaket", lauf(path.join("tools", "build-insel.js"), ["gesamt"]));
  schritt("sieben Einzelpakete", lauf(path.join("tools", "build-insel.js"), ["alle"]));
} else {
  titel("Pakete bauen");
  console.log(grau("  übersprungen (--schnell)"));
}

// ---------------------------------------------------------------- Prüfen ---

titel("Quelle prüfen");

/* Steht bewusst an erster Stelle: Alle folgenden Pruefungen lesen die
   ausgelieferten Dateien nur als TEXT und klopfen sie mit regulaeren
   Ausdruecken ab. Ein Syntaxfehler in engine.js oder thi.js lief bis August
   2026 gruen durch die gesamte Kette — nachgestellt und belegt. Wer hier
   durchfaellt, braucht den Rest nicht zu lesen. */
const syntax = lauf(path.join("tools", "check-syntax.js"), []);
schritt("Syntax", syntax,
  (syntax.ausgabe.match(/^Syntax: .*$/m) || [""])[0].replace(/^Syntax: /, ""));

const fragen = lauf(path.join("tools", "check-fragen.js"), []);
/* Hinweise und redaktionelle Notizen aus check-fragen.js sind zum Lesen
   gedacht — bis September 2026 verschluckte dieser Schritt sie im
   Erfolgsfall vollständig (Rückstand R-47). Gezählt stehen sie jetzt in der
   Kurzfassung; den Wortlaut zeigt check-fragen.js selbst. */
const fragenZahl = (fragen.ausgabe.match(/^\d+ Fragen geprüft\.$/m) || [""])[0];
const hinweisZahl = Number((fragen.ausgabe.match(/, (\d+) Hinweise\.$/m) || [0, "0"])[1]);
const notizBlock = fragen.ausgabe.split("Offene redaktionelle Punkte")[1] || "";
const notizZahl = (notizBlock.match(/^ {2}\S/gm) || []).length;
schritt("Fragensätze", fragen,
  fragenZahl
  + (hinweisZahl ? `, ${hinweisZahl} Hinweise` : "")
  + (notizZahl ? `, ${notizZahl} redaktionelle Notizen` : "")
  + (hinweisZahl || notizZahl ? " — Wortlaut: node tools/check-fragen.js" : ""));

// Alles unter public/, nicht nur die Bilder aus den Fragensätzen: Grenze je
// Datei, Grenze insgesamt, Verweise ins Leere.
const medien = lauf(path.join("tools", "check-medien.js"), []);
const medienHinweise = Number((medien.ausgabe.match(/, (\d+) Hinweise\.$/m) || [0, "0"])[1]);
schritt("Medienbudget", medien,
  (medien.ausgabe.match(/^Medien: (.*)$/m) || ["", ""])[1]
  + (medienHinweise ? ` — ${medienHinweise} Hinweise: node tools/check-medien.js` : ""));

const audio = lauf(path.join("tools", "test-audio.mjs"), []);
schritt("Audio-Fragen", audio);

const arbeitskarte = lauf(path.join("tools", "test-arbeitskarte.mjs"), []);
schritt("Digitale Arbeitskarte", arbeitskarte);

const ui = lauf(path.join("tools", "test-ui-contract.js"), []);
schritt("Responsive Bedienung", ui,
  (ui.ausgabe.match(/^UI-Verträge: .*$/m) || [""])[0].replace(/^UI-Verträge: /, ""));

const funktion = lauf(path.join("tools", "test-function.js"), []);
schritt("Bewertungslogik", funktion,
  (funktion.ausgabe.match(/^\d+ bestanden.*$/m) || [""])[0]);

const feedbackFunktion = lauf(path.join("tools", "test-feedback-function.js"), []);
schritt("Feedback-Backend", feedbackFunktion,
  (feedbackFunktion.ausgabe.match(/^\d+ bestanden.*$/m) || [""])[0]);

// THI braucht keinen API-Schlüssel für diese Prüfung: der Modellaufruf läuft
// gegen einen nachgebildeten Anymize-Dienst. Geprüft werden Wissensbestand,
// Retrieval, Werkzeugschleife und die Missbrauchsbremsen.
const thi = lauf(path.join("tools", "test-thi.js"), []);
schritt("THI", thi, (thi.ausgabe.match(/^THI: .*$/m) || [""])[0].replace(/^THI: /, ""));

/** Zählt die Prüfungen eines Paket-Durchlaufs zusammen und meldet die erste
 *  Insel, die durchfällt — eine Liste mit sieben Zeilen liest morgens niemand. */
function paketPruefen(bezeichnung, ordnerFuer) {
  let summe = 0;
  const kaputt = [];
  for (const slug of INSELN) {
    const ordner = ordnerFuer(slug);
    if (!fs.existsSync(path.join(PROJEKT, ordner))) {
      kaputt.push({
        slug,
        ausgabe: `FEHLT Ordner "${ordner}" fehlt — erst bauen: node tools/build-insel.js alle`
      });
      continue;
    }
    const r = lauf(path.join("tools", "test-paket.js"), [path.join("..", ordner), slug]);
    const treffer = r.ausgabe.match(/^(\d+) bestanden, (\d+) fehlgeschlagen\.$/m);
    if (!r.ok || !treffer || Number(treffer[2]) > 0) {
      kaputt.push({ slug, ausgabe: r.ausgabe });
      continue;
    }
    summe += Number(treffer[1]);
  }

  // Fällt eine gemeinsame Datei aus, fallen alle sieben Inseln gleich durch.
  // Sieben identische Fehlerlisten helfen niemandem — eine reicht, der Rest
  // wird gezählt.
  let bericht = "";
  if (kaputt.length) {
    const erste = kaputt[0];
    bericht = `${erste.slug}:\n${kernAussage(erste.ausgabe)}`;
    if (kaputt.length > 1) {
      bericht += `\n\nEbenfalls durchgefallen: ${kaputt.slice(1).map((k) => k.slug).join(", ")}`;
    }
    bericht += `\n\nVollständig:  node tools/test-paket.js "../${ordnerFuer(erste.slug)}" ${erste.slug}`;
  }

  return schritt(bezeichnung,
    { ok: kaputt.length === 0, ausgabe: bericht, schonGekuerzt: true },
    `${summe} Prüfungen`);
}

titel("Pakete prüfen");
paketPruefen("Gesamtpaket", () => "Campus Gesamtpaket");
paketPruefen("Einzelpakete", (slug) => PAKETE[slug]);

// Wurzel-netlify.toml gegen die erzeugte, Node-Version, Action-Pins.
const deploy = lauf(path.join("tools", "check-deploy.js"), []);
schritt("Deploy-Konfiguration", deploy,
  (deploy.ausgabe.match(/^Deploy: (.*)$/m) || ["", ""])[1]);

// ----------------------------------------------------------------- Bilanz ---

titel("Bilanz");

if (fehlgeschlagen) {
  console.log(`  ${rot(`${fehlgeschlagen} Schritt(e) fehlgeschlagen.`)} Der Server wird nicht gestartet —`);
  console.log("  ein laufender Server auf einem kaputten Stand sieht aus wie ein heiler.");
  process.exit(1);
}

console.log(`  ${gruen("Alles grün.")}`);

// Die Datenbank ist bewusst der spätere Ausbauschritt. Bis dahin ist der
// Netlify-Forms-Pilot ein Sicherheitsnetz; danach laufen Quiz und Feedback
// automatisch über die geschützten Functions nach Supabase.
const migration = path.join(QUELLE, "supabase_campus_quiz_migration.sql");
if (fs.existsSync(migration)) {
  console.log(`\n  ${gruen("Pilotbereit:")} Quiz und Feedback nutzen bis Supabase das Forms-Sicherheitsnetz.`);
  console.log(grau("         Supabase kann nach der Fragenabstimmung ohne Frontend-Umbau zugeschaltet werden:"));
  console.log(grau(`         → ${path.relative(PROJEKT, migration)}`));
  console.log(grau("         → Feedbackbogen\\supabase_v11_migration.sql"));
  console.log(grau("         → Feedbackbogen\\supabase_v14_migration.sql"));
}

if (OHNE_SERVER) {
  console.log(`\n  ${grau("Server nicht gestartet (--ohne-server).")}`);
  process.exit(0);
}

// ----------------------------------------------------------------- Server ---

const PORT = Number(process.env.PORT) || 8788;
const ZIEL = path.join(PROJEKT, "Campus Gesamtpaket", "public");

titel("Entwicklungsserver");
console.log(`  Gesamtpaket auf  ${fett(`http://localhost:${PORT}/quiz`)}`);
console.log(grau(`  Ordner           ${path.relative(PROJEKT, ZIEL)}`));
console.log("");
console.log(`  ${fett("Sende-Ausgang ansehen:")} ohne ?demo=1 durchspielen.`);
console.log(grau("    Der Entwicklungsserver kennt die Netlify-Function nicht und antwortet"));
console.log(grau("    mit 501 — es geht also nichts an Netlify. Die Engine legt das Ergebnis"));
console.log(grau("    in den Ausgang, die Inselkachel meldet \"noch nicht gesendet\"."));
console.log("");
console.log(`  ${fett("Sonst immer")} ${fett(`http://localhost:${PORT}/quiz?demo=1`)} — speichert absichtlich nichts.`);
console.log(grau("    Ohne demo=1 landen Testdaten nach dem Deploy in Netlify Forms oder"));
console.log(grau("    später — wenn eingerichtet — in Supabase."));
console.log(`\n  ${grau("Beenden mit Strg+C")}\n`);

const server = spawn(process.execPath, [path.join("tools", "dev-server.js"), ZIEL], {
  cwd: QUELLE,
  stdio: "inherit",
  env: { ...process.env, PORT: String(PORT) }
});

// Best effort: manche Umgebungen haben keinen Browser (Server, Container).
// Schlägt es fehl, steht die Adresse oben — deshalb wird der Fehler geschluckt.
setTimeout(() => {
  const url = `http://localhost:${PORT}/quiz`;
  const [befehl, argumente] = process.platform === "darwin" ? ["open", [url]]
    : process.platform === "win32" ? ["cmd", ["/c", "start", "", url]]
      : ["xdg-open", [url]];
  try {
    const auf = spawn(befehl, argumente, { stdio: "ignore", detached: true });
    auf.on("error", () => {});
    auf.unref();
  } catch { /* dann eben von Hand */ }
}, 700);

const beenden = () => { server.kill(); process.exit(0); };
process.on("SIGINT", beenden);
process.on("SIGTERM", beenden);
server.on("exit", (code) => process.exit(code || 0));
