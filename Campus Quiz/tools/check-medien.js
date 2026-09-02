"use strict";

/* ==========================================================================
   Medienbudget und Verweise — für die Quelle oder ein erzeugtes Paket.

     node tools/check-medien.js                              # Quelle (public/)
     node tools/check-medien.js "../Campus Gesamtpaket/public"

   Warum es das gibt: Zielgerät ist das Telefon eines Händlers in einer
   Messehalle. check-fragen.js warnt bei Bildern über 150 KB — aber nur bei
   denen, die in einem Fragensatz stehen. Ein 1,77-MB-Symbol im Stylesheet
   und die vier Fahrzeugansichten der Arbeitskarte mit zusammen 5 MB gingen
   an jeder Prüfung vorbei (Rückstand R-12, R-46). Hier wird alles gezählt,
   was unter public/ liegt und ausgeliefert werden könnte.

   Drei Fragen, in dieser Reihenfolge:
   1. Ist eine Datei zu groß?                       → FEHLER ab GRENZE_DATEI
   2. Ist das Ganze zu groß?                        → FEHLER ab GRENZE_GESAMT
   3. Zeigt ein Verweis ins Leere, oder liegt eine Datei herum, auf die
      nichts zeigt?                                 → FEHLER bzw. Hinweis

   Verweise werden aus CSS (url()), HTML (src, href, srcset, poster), JS und
   JSON (jede Zeichenkette, die auf eine Medienendung endet) gelesen. Eine
   Datei, auf die nichts zeigt, ist nur ein Hinweis: Die Prüfung liest Text,
   und ein Pfad, der zur Laufzeit zusammengesetzt wird, sähe verwaist aus.
   Vor dem Löschen gilt weiter die Regel aus AGENTS.md: den ganzen Baum
   durchsuchen, public/data/ eingeschlossen.
   ========================================================================== */

const fs = require("fs");
const path = require("path");

const WURZEL = path.resolve(process.argv[2] || path.join(__dirname, "..", "public"));

const GRENZE_DATEI = 500 * 1024;        // eine Datei
const HINWEIS_DATEI = 250 * 1024;       // ab hier lohnt ein Blick
const GRENZE_GESAMT = 12 * 1024 * 1024; // alles unter public/ zusammen
const GRENZE_PNG = 150 * 1024;          // PNG/JPG darüber: als WebP bringen

const MEDIEN = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif", ".svg", ".mp3", ".m4a", ".ogg", ".wav", ".mp4"]);
const TEXT = new Set([".css", ".html", ".js", ".mjs", ".json"]);

/* Dateien, auf die absichtlich nichts im Paket zeigt: Das Logo im Kopf
   steht in index.html, aber Einzelpakete ohne Feedbackbogen tragen es
   trotzdem unter /feedback nicht — deshalb nur die Wurzel prüfen. */
const AUSNAHMEN_VERWAIST = new Set([]);

let fehler = 0;
let hinweise = 0;
const FEHLER = (text) => { console.error(`FEHLER ${text}`); fehler++; };
const HINWEIS = (text) => { console.log(`  Hinweis ${text}`); hinweise++; };
const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;
const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;

if (!fs.existsSync(WURZEL)) {
  FEHLER(`Ordner fehlt: ${WURZEL}`);
  process.exit(1);
}

function laufe(ordner, liste = []) {
  for (const eintrag of fs.readdirSync(ordner, { withFileTypes: true })) {
    const voll = path.join(ordner, eintrag.name);
    if (eintrag.isDirectory()) laufe(voll, liste);
    else liste.push(voll);
  }
  return liste;
}

const dateien = laufe(WURZEL);
const medien = dateien.filter((d) => MEDIEN.has(path.extname(d).toLowerCase()));
const texte = dateien.filter((d) => TEXT.has(path.extname(d).toLowerCase()));

// ------------------------------------------------------------- 1. Größe ---

let gesamt = 0;
for (const datei of medien) {
  const groesse = fs.statSync(datei).size;
  gesamt += groesse;
  const rel = path.relative(WURZEL, datei).split(path.sep).join("/");
  const endung = path.extname(datei).toLowerCase();
  if (groesse > GRENZE_DATEI) {
    FEHLER(`${rel}: ${kb(groesse)} — Grenze ${kb(GRENZE_DATEI)}. Verkleinern oder als WebP bringen (tools/bilder-aufbereiten.js).`);
  } else if ((endung === ".png" || endung === ".jpg" || endung === ".jpeg") && groesse > GRENZE_PNG) {
    HINWEIS(`${rel}: ${kb(groesse)} als ${endung.slice(1).toUpperCase()} — als WebP wäre es ein Bruchteil.`);
  } else if (groesse > HINWEIS_DATEI) {
    HINWEIS(`${rel}: ${kb(groesse)} — groß für das Hallen-WLAN, im Zweifel nachsehen, ob es kleiner geht.`);
  }
}
if (gesamt > GRENZE_GESAMT) {
  FEHLER(`Alle Medien zusammen ${mb(gesamt)} — Grenze ${mb(GRENZE_GESAMT)}.`);
}

// ---------------------------------------------------------- 2. Verweise ---

/** Alle Pfade aus einer Textdatei, die auf eine Medienendung enden.
 *  Anführungszeichen, Klammern und ?v=-Marken werden abgestreift. */
function verweiseAus(text) {
  const treffer = new Set();
  const muster = /["'(=\s,]([^"'()\s,]+?\.(?:png|jpe?g|webp|gif|avif|svg|mp3|m4a|ogg|wav|mp4))(?:\?[^"')\s,]*)?["')\s,]/gi;
  let m;
  while ((m = muster.exec(text))) {
    let pfad = m[1];
    if (/^(https?:)?\/\//i.test(pfad) || pfad.startsWith("data:")) continue;
    treffer.add(pfad);
  }
  return treffer;
}

const referenziert = new Set();
for (const datei of texte) {
  const text = fs.readFileSync(datei, "utf8");
  const rel = path.relative(WURZEL, datei).split(path.sep).join("/");
  for (const pfad of verweiseAus(text)) {
    // Absolute Pfade zeigen auf die Wurzel des Pakets, relative auf den
    // Ordner der Datei, aus der sie stammen.
    const ziel = pfad.startsWith("/")
      ? path.join(WURZEL, pfad)
      : path.resolve(path.dirname(datei), pfad);
    const zielRel = path.relative(WURZEL, ziel).split(path.sep).join("/");
    if (zielRel.startsWith("..")) continue;   // aus dem Paket heraus — nicht unsere Sache
    if (!fs.existsSync(ziel)) {
      // Nur echte Pfade sind ein Fehler: absolut oder ausdrücklich relativ.
      // Ein Dateiname im Fließtext eines internen Hinweises („nicht
      // verwendbar ist sam-produkt-gps-pro.webp") ist kein Verweis, und
      // `${slug}.webp` ist eine Vorlage.
      if (!/^(\/|\.\.?\/)/.test(pfad) || /[${}]/.test(pfad)) continue;
      FEHLER(`${rel} verweist auf ${pfad} — die Datei gibt es nicht.`);
      continue;
    }
    referenziert.add(zielRel);
  }
}

for (const datei of medien) {
  const rel = path.relative(WURZEL, datei).split(path.sep).join("/");
  if (referenziert.has(rel) || AUSNAHMEN_VERWAIST.has(rel)) continue;
  HINWEIS(`${rel} (${kb(fs.statSync(datei).size)}) — kein Verweis gefunden. Vor dem Löschen den ganzen Baum durchsuchen.`);
}

// ------------------------------------------------------------- Bilanz ---

console.log(`\nMedien: ${medien.length} Dateien, ${mb(gesamt)} unter ${path.relative(process.cwd(), WURZEL) || "."}.`);
console.log(fehler ? `${fehler} Fehler, ${hinweise} Hinweise.` : `Keine Fehler, ${hinweise} Hinweise.`);
process.exit(fehler ? 1 : 0);
