"use strict";

/* ==========================================================================
   Schneidet Mitarbeiterfotos auf das runde Format des Betreuungsstreifens.

     npm install sharp --no-save
     node tools/betreuer-fotos.js "../export/Bilder Thitronik Mitarbeiter"

   Die Quellfotos sind Querformat (meist 400x228) und stammen von der
   Website. Der Streifen zeigt sie rund und 64 px gross. Ein stumpf
   zentrierter Quadratzuschnitt setzt das Gesicht dabei zu hoch und zu
   klein — deshalb schneidet sharp mit `attention`, das die auffaelligste
   Bildregion sucht und bei Portraits das Gesicht trifft.

   320 px sind das Fuenffache der Anzeigegroesse: scharf auch auf einem
   Telefon mit hoher Pixeldichte und trotzdem unter 20 KB. Das Zielgeraet
   ist ein Haendlertelefon in einer Messehalle.

   Die Zuordnung Datei -> Zieldatei steht bewusst hier und nicht in
   betreuer.json: Die Quelldateien tragen Umlaute und Leerzeichen, die
   Zieldateien sind ASCII. Wer eine Person ergaenzt, traegt sie in beide
   Dateien ein und sieht dabei, dass der Name zweimal gebraucht wird.
   ========================================================================== */

const fs = require("fs");
const path = require("path");

let sharp;
try {
  sharp = require("sharp");
} catch {
  console.error("sharp fehlt. Einmalig installieren:\n\n  npm install sharp --no-save\n");
  process.exit(1);
}

const KANTE = 320;
const ZIEL = path.join(__dirname, "..", "public", "media", "betreuer");

/** Quelldateiname (ohne Endung) -> Kuerzel aus betreuer.json. */
const PERSONEN = {
  "Dennis Behrendt": "dennis-behrendt",
  "Sascha Fehlau": "sascha-fehlau",
  "Anton Passau": "anton-passau",
  "Steffen Kunz": "steffen-kunz",
  "Peer Flaig": "peer-flaig",
  "Mark Havenstein": "mark-havenstein",
  "Julie Marier": "julie-marier",
  "Miriam Batliner": "miriam-batliner",
  "Emmanuel Simon": "emmanuel-simon",
  "Delphine Passaret": "delphine-passaret",
  "Thomas Schapke": "thomas-schapke",
  "Regina Heyn": "regina-heyn",
  "Stephan Manns": "stephan-manns",
  "Mark Thitje": "mark-thitje",
  "Hermine Bender": "hermine-bender",
  "Carolin Kinder": "carolin-kinder"
};

const quelle = process.argv[2];
if (!quelle) {
  console.error('Aufruf: node tools/betreuer-fotos.js "<Ordner mit den Originalfotos>"');
  process.exit(1);
}
if (!fs.existsSync(quelle)) {
  console.error(`Ordner nicht gefunden: ${quelle}`);
  process.exit(1);
}

fs.mkdirSync(ZIEL, { recursive: true });

(async function () {
  let fehlt = 0;

  for (const [original, kuerzel] of Object.entries(PERSONEN)) {
    const datei = path.join(quelle, `${original}.webp`);
    if (!fs.existsSync(datei)) {
      console.error(`  FEHLT ${original}.webp`);
      fehlt++;
      continue;
    }

    // Vollstaendig einlesen: unter Windows haelt sharp die Quelldatei sonst
    // offen — dieselbe Falle wie in bilder-aufbereiten.js.
    const eingabe = fs.readFileSync(datei);
    const ergebnis = await sharp(eingabe)
      .rotate()
      .resize(KANTE, KANTE, { fit: "cover", position: sharp.strategy.attention })
      .webp({ quality: 82 })
      .toBuffer();

    fs.writeFileSync(path.join(ZIEL, `${kuerzel}.webp`), ergebnis);
    console.log(`  ok    ${(kuerzel + ".webp").padEnd(24)} ${Math.round(ergebnis.length / 1024)} KB`);
  }

  console.log(`\n${Object.keys(PERSONEN).length - fehlt} Fotos geschrieben nach public/media/betreuer/.`);
  if (fehlt) process.exit(1);
})();
