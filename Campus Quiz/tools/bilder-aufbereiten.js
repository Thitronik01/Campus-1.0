"use strict";

/* ==========================================================================
   Rechnet Quizbilder auf WebP um und begrenzt die Kantenlänge.

     npm install sharp --no-save
     node tools/bilder-aufbereiten.js public/media/samsoe

   Vier Bilder je Frage müssen im Schulungsnetz einer Halle gleichzeitig da
   sein. 1400 px lange Kante reicht für die Großansicht auf einem Tablet;
   darüber wird nur Ladezeit bezahlt.
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

const MAX_KANTE = 1400;
const ZIEL_KB = 150;

const ordner = process.argv[2];
if (!ordner) {
  console.error("Aufruf: node tools/bilder-aufbereiten.js <ordner>");
  process.exit(1);
}

const dateien = fs.readdirSync(ordner).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));
if (!dateien.length) {
  console.log("Keine Bilder gefunden.");
  process.exit(0);
}

(async function () {
  for (const datei of dateien) {
    const quelle = path.join(ordner, datei);
    const ziel = path.join(ordner, datei.replace(/\.[^.]+$/, ".webp"));

    // Erst vollständig einlesen: unter Windows hält sharp die Quelldatei sonst
    // offen, und das Zurückschreiben derselben .webp schlägt fehl.
    const eingabe = fs.readFileSync(quelle);
    const vorher = eingabe.length / 1024;

    // Qualität so weit senken, bis das Bild unter das Ziel passt — aber nicht
    // unter 55, darunter werden Kanten an Kabeln und Schriftzügen matschig.
    let ergebnis = null;
    let qualitaet = 82;
    while (qualitaet >= 55) {
      ergebnis = await sharp(eingabe)
        .rotate()                                   // EXIF-Ausrichtung anwenden
        .resize({ width: MAX_KANTE, height: MAX_KANTE, fit: "inside", withoutEnlargement: true })
        .webp({ quality: qualitaet })
        .toBuffer();
      if (ergebnis.length / 1024 <= ZIEL_KB) break;
      qualitaet -= 7;
    }

    const nachher = ergebnis.length / 1024;
    if (quelle !== ziel && fs.existsSync(quelle)) fs.unlinkSync(quelle);
    fs.writeFileSync(ziel, ergebnis);

    const marke = nachher <= ZIEL_KB ? "ok  " : "groß";
    console.log(`  ${marke} ${path.basename(ziel).padEnd(26)} ` +
      `${Math.round(vorher)} → ${Math.round(nachher)} KB  (q${qualitaet})`);
  }
})();
