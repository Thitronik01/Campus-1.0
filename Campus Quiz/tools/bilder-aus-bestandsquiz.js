"use strict";

/* ==========================================================================
   Löst die eingebetteten Base64-Bilder aus einem Bestandsquiz heraus.

     node tools/bilder-aus-bestandsquiz.js "../FehlerQuiz/index.html" <zielordner>

   Die alten Quizze tragen ihre Bilder als data:-URLs in einer einzigen
   HTML-Zeile — beim FehlerQuiz sind das 3,0 MB in Zeile 523. Zum Migrieren
   (Issue #11) müssen sie als Dateien vorliegen.

   Die Bilder werden nach der Frage benannt, zu der sie gehören, damit die
   Zuordnung beim Übertragen ins JSON-Schema nicht verlorengeht. Erkannt wird
   das an den "id"-Feldern im QUIZ_DATA-Array.

   Danach durch tools/bilder-aufbereiten.js schicken — die Rohbilder sind
   teils deutlich über 150 KB.
   ========================================================================== */

const fs = require("fs");
const path = require("path");

const quelle = process.argv[2];
const ziel = process.argv[3];

if (!quelle || !ziel) {
  console.error('Aufruf: node tools/bilder-aus-bestandsquiz.js "<index.html>" <zielordner>');
  process.exit(1);
}

if (!fs.existsSync(quelle)) {
  console.error(`Datei nicht gefunden: ${quelle}`);
  process.exit(1);
}

const html = fs.readFileSync(quelle, "utf8");
fs.mkdirSync(ziel, { recursive: true });

const BILD = /data:image\/(png|jpe?g|webp|gif);base64,([A-Za-z0-9+/=]+)/g;
const FRAGE = /"id":"([A-Z]\d{2})"/g;

/** Fragengrenzen bestimmen, damit jedes Bild seiner Frage zugeordnet wird. */
const grenzen = [];
let treffer;
while ((treffer = FRAGE.exec(html)) !== null) {
  grenzen.push({ id: treffer[1], ab: treffer.index });
}

function frageZu(position) {
  let gefunden = null;
  for (const g of grenzen) {
    if (g.ab <= position) gefunden = g.id;
    else break;
  }
  return gefunden;
}

const zaehler = {};
let gesamt = 0;
let bytes = 0;

while ((treffer = BILD.exec(html)) !== null) {
  const endung = treffer[1].replace(/^jpeg$/, "jpg");
  const daten = Buffer.from(treffer[2], "base64");

  // Sehr kleine Treffer sind Favicons oder Platzhalter, keine Quizbilder.
  if (daten.length < 2048) continue;

  const frage = frageZu(treffer.index) || "kopf";
  zaehler[frage] = (zaehler[frage] || 0) + 1;

  const name = `${frage}-${zaehler[frage]}.${endung}`;
  fs.writeFileSync(path.join(ziel, name), daten);

  console.log(`  ${name.padEnd(16)} ${String(Math.round(daten.length / 1024)).padStart(4)} KB`);
  gesamt++;
  bytes += daten.length;
}

if (!gesamt) {
  console.log("\nKeine eingebetteten Bilder gefunden.");
  process.exit(0);
}

console.log(`\n${gesamt} Bilder, ${Math.round(bytes / 1024)} KB nach ${ziel}`);
console.log(`\nNächster Schritt:\n  node tools/bilder-aufbereiten.js ${ziel}`);
