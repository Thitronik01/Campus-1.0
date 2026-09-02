"use strict";

/* ==========================================================================
   Deploy-Konfiguration: Stimmen die Fassungen überein, die Netlify liest?

     node tools/check-deploy.js          # nach dem Bau des Gesamtpakets

   Drei Dinge, die bis September 2026 niemand zusammenhielt (Rückstand R-01,
   R-14, R-39):

   1. Die Wurzel-netlify.toml ist die, die Netlify beim Produktionsdeploy
      liest. build-insel.js erzeugt eine zweite ins Paket. Wer eine
      Header-Regel dort ändert, wo der Bau sie erzeugt, erreicht die
      Produktion nicht — und umgekehrt. Hier werden Header- und
      Redirect-Blöcke beider Dateien als Mengen verglichen; die Reihenfolge
      darf abweichen, der Inhalt nicht.

   2. Die Node-Version steht in .nvmrc (GitHub Actions) und in netlify.toml
      (Netlify-Bauserver). Laufen sie auseinander, wird thi.mjs mit einer
      anderen Version verpackt als der, gegen die geprüft wurde.

   3. Actions im Workflow müssen auf einen vollständigen Commit-SHA zeigen,
      nicht auf einen beweglichen Tag. Ein übernommenes Action-Repository
      kann v7 auf beliebigen Code umbiegen; im Deploy-Job liegt dabei der
      Netlify-Token in der Umgebung. Der Klartext-Tag steht als Kommentar
      dahinter, damit man ihn noch lesen kann. Ebenso darf der Token nur
      an einzelnen Schritten hängen, nicht am Job.
   ========================================================================== */

const fs = require("fs");
const path = require("path");

const QUELLE = path.join(__dirname, "..");
const PROJEKT = path.join(QUELLE, "..");

let fehler = 0;
let geprueft = 0;
const FEHLER = (text) => { console.error(`FEHLER ${text}`); fehler++; };
const ok = (text) => { console.log(`  ok  ${text}`); geprueft++; };

// ------------------------------------------------ 1. netlify.toml doppelt ---

/** Liest [[headers]]- und [[redirects]]-Blöcke einer netlify.toml als
 *  Menge normalisierter Zeichenketten. Kein TOML-Parser: Die Dateien sind
 *  klein und folgen einem festen Muster, das der Bau selbst schreibt. */
function bloecke(text) {
  const menge = new Set();
  const teile = text.split(/^\[\[(headers|redirects)\]\]\s*$/m);
  // split liefert [vorher, art, inhalt, art, inhalt, …]
  for (let i = 1; i < teile.length; i += 2) {
    const art = teile[i];
    const inhalt = teile[i + 1]
      .split("\n")
      .map((z) => z.trim())
      .filter((z) => z && !z.startsWith("#") && !z.startsWith("[["))
      // Der nächste Abschnitt ([build] o. ä.) beendet den Block.
      .reduce((acc, z) => { if (acc.ende) return acc; if (/^\[[^[]/.test(z) && !/^\[headers\.values\]$/.test(z)) { acc.ende = true; return acc; } acc.zeilen.push(z); return acc; }, { zeilen: [], ende: false })
      .zeilen
      .filter((z) => z !== "[headers.values]")
      .sort()
      .join(" | ");
    menge.add(`${art}: ${inhalt}`);
  }
  return menge;
}

const wurzelToml = path.join(PROJEKT, "netlify.toml");
const paketToml = path.join(PROJEKT, "Campus Gesamtpaket", "netlify.toml");

if (!fs.existsSync(paketToml)) {
  FEHLER(`${path.relative(PROJEKT, paketToml)} fehlt — erst bauen: node tools/build-insel.js gesamt`);
} else {
  const wurzel = bloecke(fs.readFileSync(wurzelToml, "utf8"));
  const paket = bloecke(fs.readFileSync(paketToml, "utf8"));
  const nurWurzel = [...wurzel].filter((b) => !paket.has(b));
  const nurPaket = [...paket].filter((b) => !wurzel.has(b));
  if (nurWurzel.length || nurPaket.length) {
    nurWurzel.forEach((b) => FEHLER(`netlify.toml (Wurzel) hat einen Block, den das Gesamtpaket nicht kennt: ${b.slice(0, 90)}…`));
    nurPaket.forEach((b) => FEHLER(`Campus Gesamtpaket/netlify.toml hat einen Block, der in der Wurzel fehlt: ${b.slice(0, 90)}…`));
    console.error("       Beide Fassungen kommen aus netlifyToml() in tools/build-insel.js — die Wurzel von Hand nachziehen.");
  } else {
    ok(`Header und Redirects: Wurzel-netlify.toml und Gesamtpaket stimmen überein (${wurzel.size} Blöcke)`);
  }

  const csp = (t) => (t.match(/Content-Security-Policy = "([^"]+)"/) || [])[1];
  const cspWurzel = csp(fs.readFileSync(wurzelToml, "utf8"));
  if (!cspWurzel) FEHLER("Wurzel-netlify.toml trägt keine Content-Security-Policy.");
  else ok("Content-Security-Policy steht in der Wurzel-netlify.toml");
}

// ------------------------------------------------------ 2. Node-Version ---

const nvmrcPfad = path.join(PROJEKT, ".nvmrc");
if (!fs.existsSync(nvmrcPfad)) {
  FEHLER(".nvmrc fehlt — die Node-Version für GitHub Actions steht sonst nirgends.");
} else {
  const nvmrc = fs.readFileSync(nvmrcPfad, "utf8").trim();
  const toml = fs.readFileSync(wurzelToml, "utf8");
  const netlifyNode = (toml.match(/NODE_VERSION\s*=\s*"([^"]+)"/) || [])[1];
  const major = (v) => String(v).replace(/^v/, "").split(".")[0];
  if (!netlifyNode) FEHLER("netlify.toml setzt kein NODE_VERSION — der Netlify-Bauserver nimmt dann seinen Standard.");
  else if (major(nvmrc) !== major(netlifyNode)) FEHLER(`Node-Version läuft auseinander: .nvmrc sagt ${nvmrc}, netlify.toml sagt ${netlifyNode}.`);
  else ok(`Node ${nvmrc} in .nvmrc und netlify.toml`);
}

// ------------------------------------------------------- 3. Workflows ---

const workflowOrdner = path.join(PROJEKT, ".github", "workflows");
const workflows = fs.existsSync(workflowOrdner)
  ? fs.readdirSync(workflowOrdner).filter((d) => /\.ya?ml$/.test(d))
  : [];
if (!workflows.length) FEHLER("Kein Workflow unter .github/workflows/.");

for (const datei of workflows) {
  const text = fs.readFileSync(path.join(workflowOrdner, datei), "utf8");
  const zeilen = text.split("\n");
  let actions = 0;

  zeilen.forEach((zeile, i) => {
    const uses = zeile.match(/^\s*(?:-\s*)?uses:\s*(\S+)(.*)$/);
    if (!uses) return;
    actions++;
    const [, ref, rest] = uses;
    if (ref.startsWith("./") || ref.startsWith("docker://")) return;
    const sha = /@[0-9a-f]{40}$/.test(ref);
    const kommentar = /#\s*v?\d/.test(rest);
    if (!sha) FEHLER(`${datei}:${i + 1}: ${ref} — auf einen vollständigen Commit-SHA pinnen, Tag als Kommentar dahinter.`);
    else if (!kommentar) FEHLER(`${datei}:${i + 1}: ${ref} — der Klartext-Tag fehlt als Kommentar (# v7.0.1).`);
  });
  if (actions) ok(`${datei}: ${actions} Actions per Commit-SHA gebunden`);

  // Der Token darf nur an einem Schritt hängen. Ein Schritt-env steht
  // mindestens zehn Zeichen eingerückt (jobs > job > steps > - name > env >
  // Variable); ein Job-env bei sechs. Grob, aber die Datei ist unsere.
  zeilen.forEach((zeile, i) => {
    if (!/secrets\.NETLIFY_AUTH_TOKEN/.test(zeile)) return;
    const einzug = zeile.match(/^(\s*)/)[1].length;
    if (einzug < 10) FEHLER(`${datei}:${i + 1}: NETLIFY_AUTH_TOKEN hängt am Job — nur an den Schritten setzen, die ihn brauchen.`);
  });

  if (!/^permissions:\s*$/m.test(text) || !/^\s+contents:\s*read/m.test(text)) {
    FEHLER(`${datei}: permissions fehlt oder ist weiter als contents: read.`);
  } else ok(`${datei}: permissions auf contents: read begrenzt`);
}

// ------------------------------------------------------------- Bilanz ---

console.log(`\nDeploy: ${geprueft} Prüfungen, ${fehler} Fehler.`);
process.exit(fehler ? 1 : 0);
