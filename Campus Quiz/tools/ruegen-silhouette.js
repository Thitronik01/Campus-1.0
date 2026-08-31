"use strict";

/* ==========================================================================
   Zeichnet die Inselsilhouette fuer RUEGEN.

     npm install sharp --no-save
     node tools/ruegen-silhouette.js

   Die uebrigen sieben Motive in public/media/inseln/ sind einfarbige
   Silhouetten mit Alphakanal, 1400x933, im Sandton #ECD9C4 — abgegriffen
   aus poel.webp. RUEGEN kam als achte Station spaeter dazu und hatte kein
   Motiv; dieses Werkzeug erzeugt eines im selben Format.

   Die Form ist stilisiert, nicht kartografisch: Wittow im Nordwesten,
   Jasmund im Nordosten, das Muttland in der Mitte und Moenchgut im
   Suedosten, dazwischen die Bodden als Einschnitte. Die uebrigen Motive
   sind ebenso vereinfacht — auf 300 px Kachelbreite traegt ohnehin nur die
   grobe Kontur.
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

/* Eng auf die Kontur zugeschnitten statt auf das 1400x933 der uebrigen
   Motive. Rügen sitzt auf der Karte in der schmalsten Kachel — dort blieb
   von einer Silhouette mit breitem Rand nur ein blasser Fleck von rund
   70 px uebrig. Der enge Rahmen ist derselbe Trick wie ein
   Bildausschnitt: Die Insel wird groesser, ohne dass die Kachel waechst. */
const RAHMEN = { x: 234, y: 98, w: 908, h: 716 };
const BREITE = RAHMEN.w;
const HOEHE = RAHMEN.h;
const SAND = "#ECD9C4";
const ZIEL = path.join(__dirname, "..", "public", "media", "inseln", "ruegen.webp");

/* Polygonzug statt weicher Bezierkurven.
 *
 *  Der erste Versuch war aus langen C-Segmenten gebaut und lief zu einem
 *  Klecks zusammen: Ruegens Halbinseln verschmolzen, weil weiche Kurven
 *  genau die Einschnitte wegrunden, die die Insel ausmachen. Ein
 *  Polygonzug mit vielen Stuetzpunkten haelt Wittow, Jasmund und
 *  Moenchgut auseinander; die Rundung kommt anschliessend aus
 *  stroke-linejoin, nicht aus der Kurve selbst. */
const KONTUR = [
  // Wittow — Kap Arkona im Norden, dann nach Suedwesten
  [566, 128], [614, 140], [636, 176], [624, 214], [596, 240], [560, 252],
  [520, 246], [486, 262], [462, 296], [444, 336], [430, 372],
  // Schaabe — die schmale Landbruecke nach Osten
  [462, 372], [508, 356], [560, 340], [612, 326], [664, 300], [716, 268],
  // Jasmund — Block im Nordosten mit dem Kap an der Ostkueste
  [768, 226], [820, 190], [878, 176], [936, 186], [982, 216], [1012, 262],
  [1020, 316], [1006, 366], [974, 404], [936, 428],
  // Prorer Wiek — die lange offene Ostkueste nach Sueden
  [948, 476], [956, 528], [948, 578], [928, 618],
  // Moenchgut — der zerfranste Zipfel im Suedosten
  [982, 630], [1036, 626], [1084, 644], [1112, 680], [1104, 720],
  [1064, 742], [1020, 736], [992, 706], [968, 676], [936, 664],
  [908, 690], [872, 706], [836, 700],
  // Suedkueste mit dem Zudar-Zipfel
  [808, 728], [772, 762], [730, 784], [690, 776], [668, 742], [660, 704],
  [622, 716], [580, 714], [546, 692], [528, 658],
  // Westkueste — Einschnitte der Bodden Richtung Festland
  [488, 668], [444, 660], [408, 632], [392, 592], [400, 552], [426, 522],
  [388, 502], [356, 470], [344, 428], [356, 386], [386, 354],
  // zurueck nach Norden auf Wittow
  [400, 316], [432, 276], [468, 240], [502, 194], [530, 148]
];

/* Der grosse Jasmunder Bodden. Er ist wirklich ein Binnengewaesser, also
   ein Loch — mit evenodd, sonst fuellt der zweite Pfad die Bucht wieder
   zu. Auf 300 px Kachelbreite bleibt davon ein Schatten, der die Kontur
   auflockert; das ist genau, was der Klecks vorher nicht hatte. */
const BODDEN = [
  [640, 402], [700, 386], [762, 392], [808, 420], [822, 462], [800, 502],
  [752, 522], [696, 518], [652, 494], [628, 452]
];

/* Hiddensee liegt Ruegen westlich vor — auf der Campus-Karte gibt es
   Hiddensee als eigene Station, hier steht der Streifen nur als Motiv. */
const VORGELAGERT = [
  [[276, 396], [292, 388], [302, 420], [304, 466], [296, 516], [282, 548],
   [268, 542], [264, 494], [268, 442]]
];

const zuPfad = (punkte) =>
  `M ${punkte.map(([x, y]) => `${x} ${y}`).join(" L ")} Z`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${BREITE}" height="${HOEHE}" viewBox="${RAHMEN.x} ${RAHMEN.y} ${RAHMEN.w} ${RAHMEN.h}">
  <g fill="${SAND}" stroke="${SAND}" stroke-width="26" stroke-linejoin="round" stroke-linecap="round">
    <path fill-rule="evenodd" d="${zuPfad(KONTUR)} ${zuPfad(BODDEN)}"/>
    ${VORGELAGERT.map((p) => `<path d="${zuPfad(p)}"/>`).join("\n    ")}
  </g>
</svg>`;

(async function () {
  const ergebnis = await sharp(Buffer.from(svg))
    .webp({ quality: 90, alphaQuality: 100 })
    .toBuffer();

  fs.writeFileSync(ZIEL, ergebnis);
  const meta = await sharp(ergebnis).metadata();
  console.log(`  ok  ruegen.webp  ${meta.width}x${meta.height}  alpha=${meta.hasAlpha}  ` +
    `${Math.round(ergebnis.length / 1024)} KB`);
})();
