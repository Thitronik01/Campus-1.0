"use strict";

/* ==========================================================================
   Parst jede ausgelieferte Datei einmal, bevor irgendetwas anderes geprüft
   wird.

     node tools/check-syntax.js

   WARUM ES DAS GIBT

   Bis August 2026 hat niemand den Browser-Code jemals geparst. Alle
   bestehenden Prüfungen lesen `engine.js`, `thi.js` und `styles.css` als
   TEXT ein und klopfen sie mit regulären Ausdrücken ab — `test-paket.js`
   sucht die `ENGINE_VERSION`, `test-audio.mjs` sucht Zeichenketten,
   `test-thi.js` sucht `innerHTML`. Keine dieser Prüfungen bemerkt, ob die
   Datei überhaupt gültiges JavaScript ist.

   Die Folge war nachstellbar: Ein Syntaxfehler in `engine.js` ließ die 28
   Prüfungen der Bewertungslogik, alle Paketprüfungen und die gesamte CI grün
   durchlaufen. Deployt worden wäre eine Seite, die im Browser sofort mit
   einem Parse-Fehler abbricht. Und weil alle vier Bildschirme in
   `index.html` das Attribut `hidden` tragen und erst die Engine einen davon
   einblendet, hätte jeder Teilnehmer eine leere Seite mit Logo gesehen — bei
   grüner Pipeline.

   Ein Aufruf von `node --check` je Datei kostet Millisekunden und schließt
   genau diese Lücke.

   WAS ES NICHT IST

   Kein Linter. Es beantwortet allein die Frage „lässt sich das parsen?".
   Unbenutzte Variablen, Tippfehler in Bezeichnern und tote Zweige findet es
   nicht — dafür wäre ESLint nötig, und das ist ein eigener Schritt.
   ========================================================================== */

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const WURZEL = path.join(__dirname, "..");

let geprueft = 0;
const fehler = [];

/** Sammelt Dateien mit passender Endung, ohne in Unterordner zu steigen,
 *  die uns nicht gehören. */
function dateien(relativ, endungen, rekursiv = false) {
  const voll = path.join(WURZEL, relativ);
  if (!fs.existsSync(voll)) return [];
  const raus = [];
  for (const eintrag of fs.readdirSync(voll, { withFileTypes: true })) {
    const p = path.join(relativ, eintrag.name);
    if (eintrag.isDirectory()) {
      if (rekursiv) raus.push(...dateien(p, endungen, true));
    } else if (endungen.some((e) => eintrag.name.endsWith(e))) {
      raus.push(p);
    }
  }
  return raus;
}

/* Node erkennt die Modulart an der Endung: `.mjs` wird als ESM geparst,
 * `.js` als CommonJS. Die Browser-Dateien sind IIFEs und damit auch als
 * CommonJS gültig — geprüft wird die Syntax, nicht die Laufzeit. */
function javascriptPruefen(relativ) {
  geprueft += 1;
  try {
    execFileSync(process.execPath, ["--check", path.join(WURZEL, relativ)],
      { stdio: ["ignore", "pipe", "pipe"], encoding: "utf8" });
  } catch (e) {
    const meldung = String(e.stderr || e.message)
      .split("\n")
      .filter((z) => z.includes("Error") || z.includes("^") || /^\s*\d+ \|/.test(z))
      .slice(0, 3)
      .join(" · ")
      .trim();
    fehler.push(`${relativ}\n        ${meldung || "nicht parsebar"}`);
  }
}

/* Für CSS gibt es keinen eingebauten Parser. Die Klammerbilanz findet aber
 * genau den Fehler, der beim Bearbeiten großer Stylesheets wirklich
 * passiert: eine geschluckte oder verdoppelte schließende Klammer. Danach
 * gilt der halbe Rest der Datei als Inhalt eines Blocks und wirkt nicht
 * mehr — ohne dass irgendetwas meckert.
 *
 * Kommentare werden vorher entfernt, weil `{` darin nichts bedeutet. */
function cssPruefen(relativ) {
  geprueft += 1;
  const roh = fs.readFileSync(path.join(WURZEL, relativ), "utf8");
  const ohneKommentare = roh.replace(/\/\*[\s\S]*?\*\//g, "");
  const auf = (ohneKommentare.match(/\{/g) || []).length;
  const zu = (ohneKommentare.match(/\}/g) || []).length;
  if (auf !== zu) {
    fehler.push(`${relativ}\n        Klammern unausgeglichen: ${auf} × { gegen ${zu} × }`);
  }
}

/* Eine kaputte JSON-Datei im Datenordner nimmt der Engine die Grundlage.
 * check-fragen.js prüft die Fragensätze; hier geht es um alles andere unter
 * public/data/ — inseln.json, betreuer.json, und was noch dazukommt. */
function jsonPruefen(relativ) {
  geprueft += 1;
  const roh = fs.readFileSync(path.join(WURZEL, relativ), "utf8");
  if (roh.charCodeAt(0) === 0xFEFF) {
    fehler.push(`${relativ}\n        beginnt mit einer UTF-8-BOM — JSON.parse im Browser scheitert daran`);
    return;
  }
  try {
    JSON.parse(roh);
  } catch (e) {
    fehler.push(`${relativ}\n        ${e.message}`);
  }
}

// --------------------------------------------------------------- Durchlauf --

const jsDateien = [
  ...dateien(path.join("public", "assets"), [".js"]),
  ...dateien(path.join("public", "praxis", "langeland"), [".js"]),
  ...dateien(path.join("public", "arbeitskarte", "assets"), [".js"]),
  ...dateien(path.join("netlify", "functions"), [".js", ".mjs"], true),
  ...dateien("tools", [".js", ".mjs"])
];
jsDateien.forEach(javascriptPruefen);

dateien(path.join("public", "assets"), [".css"]).forEach(cssPruefen);
dateien(path.join("public", "praxis", "langeland"), [".css"]).forEach(cssPruefen);
dateien(path.join("public", "arbeitskarte", "assets"), [".css"]).forEach(cssPruefen);
dateien(path.join("public", "data"), [".json"]).forEach(jsonPruefen);

if (fehler.length) {
  console.error(`\nSyntax: ${fehler.length} von ${geprueft} Dateien fehlerhaft.\n`);
  for (const f of fehler) console.error(`  FEHLER  ${f}`);
  console.error("");
  process.exit(1);
}

console.log(`Syntax: ${geprueft} Dateien geprüft, alle parsebar.`);
