"use strict";

/* ==========================================================================
   Gleicht die Elementtabelle der Engine gegen `index.html` ab.

     node tools/check-elemente.js

   WARUM ES DAS GIBT

   Am 4. September 2026 kam niemand mehr zur Auswertung, und keine Einsendung
   erreichte die Datenbank. Eine einzige Zeile war schuld:

       el.qProgressFill.style.width = "100%";

   Der Fortschrittsbalken war mit 1.36 entfernt worden — der Zugriff blieb
   stehen. `el.qProgressFill` war damit `undefined`, und `undefined.style`
   wirft. Die Zeile stand in `finish()`, und zwar vor allem anderen: kein
   Ergebnisbildschirm, kein Payload, keine Einsendung. Zwei Symptome aus
   einer Zeile.

   Vorbeigelaufen sind daran ausnahmslos alle Prüfungen. `check-syntax.js`
   parst die Datei, und parsebar war sie — ein Zugriff auf eine nicht
   vorhandene Eigenschaft ist gültiges JavaScript und fällt erst zur Laufzeit
   auf. Alles andere liest den Code als Text. Der Fehler war nur im Browser
   sichtbar, und zwar erst nach zehn beantworteten Fragen.

   WAS ES PRÜFT

   Zwei Richtungen, denn beide enden im selben Absturz:

   1. Jeder `el.X`-Zugriff muss in der Elementtabelle stehen. Fehlt er, ist
      der Wert `undefined` — das war dieser Fall.
   2. Jede `$("id")` in der Tabelle muss ein `id="…"` in `index.html` haben.
      Fehlt es, ist der Wert `null`, und `null.style` wirft genauso.

   WAS ES NICHT IST

   Kein Linter und keine Laufzeitprüfung. Es sieht Zeichenketten an, nicht
   den Programmfluss. Ein Element, das aus einer zusammengesetzten Id geholt
   wird, entgeht ihm — bewusst: lieber eine Prüfung, die nichts Falsches
   meldet, als eine, die man abschaltet.
   ========================================================================== */

const fs = require("fs");
const path = require("path");

const WURZEL = path.join(__dirname, "..");
const ENGINE = path.join("public", "assets", "engine.js");
const SEITE = path.join("public", "index.html");

const quelle = fs.readFileSync(path.join(WURZEL, ENGINE), "utf8");
const seite = fs.readFileSync(path.join(WURZEL, SEITE), "utf8");

const fehler = [];

// --- Die Tabelle herausschneiden -------------------------------------------
// Sie beginnt bei `const el = {` und endet bei der schließenden Klammer auf
// derselben Einrückungstiefe. Eine Klammerzählung wäre genauer, aber die
// Tabelle ist seit jeher so formatiert, und ein Fund weniger ist besser als
// ein erfundener.

const tabelle = quelle.match(/const el = \{[\s\S]*?\n {2}\};/);
if (!tabelle) {
  console.error("\nElemente: Die Tabelle `const el = {` wurde in engine.js nicht gefunden.");
  console.error("  Wurde sie umbenannt oder anders eingerückt? Dann gehört diese Prüfung nachgezogen.\n");
  process.exit(1);
}
const rumpf = tabelle[0];

// --- 1. Jeder el.X-Zugriff braucht einen Eintrag ---------------------------

const schluessel = new Set(
  [...rumpf.matchAll(/^ {4}([A-Za-z0-9_]+)\s*:/gm)].map((m) => m[1])
);
const genutzt = new Set(
  [...quelle.matchAll(/\bel\.([A-Za-z0-9_]+)/g)].map((m) => m[1])
);

for (const name of genutzt) {
  if (!schluessel.has(name)) {
    fehler.push(
      `el.${name} wird verwendet, steht aber nicht in der Elementtabelle.\n` +
      `        Der Wert ist damit undefined — jeder Zugriff darauf wirft zur Laufzeit.`
    );
  }
}

// --- 2. Jede Id aus der Tabelle muss es in index.html geben ----------------

const ids = [...rumpf.matchAll(/\$\("([^"]+)"\)/g)].map((m) => m[1]);
const vorhanden = new Set(
  [...seite.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1])
);

for (const id of ids) {
  if (!vorhanden.has(id)) {
    fehler.push(
      `$("${id}") steht in der Elementtabelle, aber index.html hat kein id="${id}".\n` +
      `        Der Wert ist damit null — jeder Zugriff darauf wirft zur Laufzeit.`
    );
  }
}

// --- Bilanz ----------------------------------------------------------------

if (fehler.length) {
  console.error(`\nElemente: ${fehler.length} Abweichung${fehler.length === 1 ? "" : "en"}.\n`);
  for (const f of fehler) console.error(`  FEHLER  ${f}`);
  console.error("");
  process.exit(1);
}

console.log(
  `Elemente: ${schluessel.size} Einträge, ${ids.length} Ids, ` +
  `${genutzt.size} Zugriffe — alle aufgelöst.`
);
