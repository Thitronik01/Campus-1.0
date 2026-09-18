"use strict";

/* ==========================================================================
   App-Icons für die Installation — erzeugt aus dem vorhandenen Logo.

     npm install sharp --no-save
     node tools/app-icons.js

   Warum es das gibt: Seit der Campus ein `manifest.webmanifest` hat, lässt
   er sich als App installieren — auf Windows und Android über den
   Installieren-Knopf, auf dem iPad über "Zum Home-Bildschirm". Dabei legt
   das Betriebssystem ein Icon an. Ohne eigene Dateien nimmt es einen
   Bildschirmausschnitt oder einen grauen Platzhalter; auf dem Startbildschirm
   eines Händlers steht dann ein namenloses Kästchen neben WhatsApp.

   Die Icons werden nicht von Hand gezeichnet, sondern hier gerechnet. Ein
   von Hand exportiertes PNG ist nach dem dritten Logowechsel nicht mehr
   nachvollziehbar: Niemand weiß dann noch, aus welcher Quelle es kam und mit
   welchem Rand. Quelle ist `public/assets/thitronik-logo.png` — dieselbe
   Datei, die auch die Kopfzeile zeigt.

   ---------------------------------------------------------------- Farbe ---

   Das Feld ist Navy (#1D3661), die Segelmarke steht weiß darauf. Die
   naheliegende Fassung — rote Marke auf Navy, wie im Logo — scheidet
   gemessen aus: #CE132D erreicht gegen #1D3661 nur 2,0:1. Auf einem
   Startbildschirm in einer hellen Messehalle, hinter dem Daumenabdruck auf
   dem Glas, verschwimmt die Marke dann zu einem dunklen Fleck. Weiß liegt
   bei 9,4:1. Dieselbe Überlegung steht in styles.css beim Fokusring.

   Navy statt Weiß als Feld, weil `index.html` bereits
   `<meta name="theme-color" content="#1D3661">` setzt: In der installierten
   App sind Titelleiste, Startbildschirm und Icon damit dieselbe Farbe. Ein
   weißes Icon wäre außerdem auf hellen Startbildschirmen randlos.

   ------------------------------------------------------------- Zuschnitt ---

   `purpose: "any"` bekommt abgerundete Ecken mit durchsichtigem Rand — so
   wird es unter Windows und im Chrome-Tab als eigenständige Marke gezeigt.
   `purpose: "maskable"` bekommt ein randvolles Quadrat: Android schneidet
   sich daraus selbst seine Form (Kreis, Squircle, Tropfen). Die Marke sitzt
   dort kleiner, weil nur der innere Kreis mit 80 % Durchmesser garantiert
   sichtbar bleibt — wer sie dort so groß setzt wie im "any"-Icon, verliert
   auf einem Kreis-Launcher die Spitzen.

   Apple liest weder `purpose` noch das Manifest-Icon zuverlässig, sondern
   `apple-touch-icon` — und setzt die Rundung selbst. Deshalb dort ebenfalls
   randvoll.
   ========================================================================== */

const fs = require("fs");
const path = require("path");

let sharp;
try {
  sharp = require("sharp");
} catch {
  console.error("FEHLER sharp fehlt. Einmalig: npm install sharp --no-save");
  process.exit(1);
}

const WURZEL = path.join(__dirname, "..");
const QUELLE = path.join(WURZEL, "public", "assets", "thitronik-logo.png");
const ZIEL = path.join(WURZEL, "public", "icons");

const NAVY = { r: 0x1d, g: 0x36, b: 0x61, alpha: 1 };

/* Die Segelmarke im Logo, ausgemessen statt geschätzt: Alle Bildpunkte, bei
   denen Rot deutlich über Grün und Blau liegt, liegen in x 14–150, y 17–144.
   Die Zahlen stehen hier trotzdem nicht fest — sie werden bei jedem Lauf neu
   gesucht, sonst schneidet das Werkzeug nach dem nächsten Logowechsel
   stillschweigend den falschen Ausschnitt. */
function markeSuchen(daten, breite, hoehe, kanaele) {
  let x0 = breite, y0 = hoehe, x1 = -1, y1 = -1;
  for (let y = 0; y < hoehe; y++) {
    for (let x = 0; x < breite; x++) {
      const i = (y * breite + x) * kanaele;
      const r = daten[i], g = daten[i + 1], b = daten[i + 2], a = daten[i + 3];
      if (a > 40 && r > 110 && r - g > 60 && r - b > 60) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
    }
  }
  if (x1 < 0) throw new Error(`Keine rote Marke in ${path.basename(QUELLE)} gefunden — hat sich das Logo geändert?`);
  return { links: x0, oben: y0, breite: x1 - x0 + 1, hoehe: y1 - y0 + 1 };
}

/** Die Marke als weiße Silhouette mit weichen Kanten.
 *
 *  Nicht "alles außer Weiß behalten": Das Logo liegt auf deckendem Weiß, es
 *  gibt also gar keine Durchsichtigkeit, die man übernehmen könnte. Die
 *  Deckkraft wird stattdessen aus der Farbe gerechnet — je weniger Grün und
 *  Blau ein Bildpunkt hat, desto mehr Marke ist er. Weiß (255/255) ergibt 0,
 *  das Rot der Marke den Höchstwert, die weichen Übergänge dazwischen die
 *  Zwischenstufen. Ohne diesen Schritt bekäme das Icon eine harte Treppe. */
function silhouette(daten, info, feld) {
  const { width: breite, channels: kanaele } = info;
  const roh = Buffer.alloc(feld.breite * feld.hoehe * 4);
  let hoechste = 0;

  for (let y = 0; y < feld.hoehe; y++) {
    for (let x = 0; x < feld.breite; x++) {
      const i = ((y + feld.oben) * breite + (x + feld.links)) * kanaele;
      const deckung = Math.max(0, 255 - (daten[i + 1] + daten[i + 2]) / 2);
      if (deckung > hoechste) hoechste = deckung;
      roh[(y * feld.breite + x) * 4 + 3] = deckung;
    }
  }

  /* Der Kern der Marke erreicht rechnerisch nur rund 223 von 255, weil das
     Markenrot nicht reines Rot ist. Ohne diese Streckung wirkte die
     Silhouette grau statt weiß. */
  const streckung = hoechste > 0 ? 255 / hoechste : 1;
  for (let p = 0; p < feld.breite * feld.hoehe; p++) {
    roh[p * 4] = 255;
    roh[p * 4 + 1] = 255;
    roh[p * 4 + 2] = 255;
    roh[p * 4 + 3] = Math.min(255, Math.round(roh[p * 4 + 3] * streckung));
  }

  return sharp(roh, { raw: { width: feld.breite, height: feld.hoehe, channels: 4 } })
    .png()
    .toBuffer();
}

/* Die Deckkraftkurve nach dem Hochrechnen. Zwei Fliegen, eine Klappe:

   Die Quelle ist nur 137 px breit. Auf 512 px hochgerechnet wird aus jeder
   Kante ein Verlauf über mehrere Bildpunkte — das Segel bekam dadurch einen
   weichen Saum und sah aus wie ein unscharfes Foto, nicht wie eine Marke.
   Und im Zwischenraum der beiden Segel liegt in der Logodatei ein schwach
   deckender Rest (rund ein Viertel Deckkraft), der auf Navy als heller
   Fleck sichtbar wurde.

   Die Kurve schneidet unter UNTEN alles weg und sättigt über OBEN alles
   durch. Der Fleck fällt damit heraus, und der mehrere Bildpunkte breite
   Saum schrumpft auf zwei — scharf, aber nicht treppig. Erst hochrechnen,
   dann versteilen: in umgekehrter Reihenfolge weicht das Hochrechnen die
   gewonnene Kante sofort wieder auf. */
const UNTEN = 0.22;
const OBEN = 0.72;

async function kanteSchaerfen(bild) {
  const { data, info } = await sharp(bild).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let p = 0; p < info.width * info.height; p++) {
    const i = p * info.channels + 3;
    const t = (data[i] / 255 - UNTEN) / (OBEN - UNTEN);
    data[i] = Math.round(Math.min(1, Math.max(0, t)) * 255);
  }
  return sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } })
    .png()
    .toBuffer();
}

/** Ein fertiges Icon: Navy-Feld, Marke mittig, bei Bedarf runde Ecken. */
async function icon(marke, feld, { kante, anteil, rund }) {
  // Die Marke ist breiter als hoch; eingepasst wird über die längere Seite,
  // damit `anteil` unabhaengig vom Seitenverhaeltnis dasselbe bedeutet.
  const laengs = Math.max(feld.breite, feld.hoehe);
  const skala = (kante * anteil) / laengs;
  const mb = Math.max(1, Math.round(feld.breite * skala));
  const mh = Math.max(1, Math.round(feld.hoehe * skala));

  const skaliert = await kanteSchaerfen(
    await sharp(marke).resize(mb, mh, { fit: "fill", kernel: "lanczos3" }).toBuffer()
  );

  const ebenen = [{
    input: skaliert,
    left: Math.round((kante - mb) / 2),
    top: Math.round((kante - mh) / 2)
  }];

  /* Die Rundung wird als Maske aufgelegt, nicht als Rahmen gezeichnet:
     `dest-in` behaelt nur, was unter der weissen Flaeche liegt, und laesst
     die Ecken wirklich durchsichtig. Ein aufgemalter Rahmen haette die Ecken
     nur weiss uebertuencht — sichtbar, sobald das Icon auf dunklem Grund
     steht. */
  if (rund) {
    const radius = Math.round(kante * 0.22);
    ebenen.push({
      input: Buffer.from(
        `<svg xmlns="http://www.w3.org/2000/svg" width="${kante}" height="${kante}">` +
        `<rect width="${kante}" height="${kante}" rx="${radius}" ry="${radius}" fill="#fff"/></svg>`
      ),
      blend: "dest-in"
    });
  }

  return sharp({ create: { width: kante, height: kante, channels: 4, background: NAVY } })
    .composite(ebenen)
    .png({ compressionLevel: 9 })
    .toBuffer();
}

/* `anteil` ist die Kantenlaenge der Marke im Verhaeltnis zur Icon-Kante.
   Bei maskable deutlich kleiner — siehe Kopf der Datei. */
const ICONS = [
  { datei: "icon-32.png",            kante: 32,  anteil: 0.62, rund: true  },
  { datei: "icon-192.png",           kante: 192, anteil: 0.58, rund: true  },
  { datei: "icon-512.png",           kante: 512, anteil: 0.58, rund: true  },
  { datei: "icon-maskable-512.png",  kante: 512, anteil: 0.44, rund: false },
  { datei: "apple-touch-icon.png",   kante: 180, anteil: 0.56, rund: false }
];

(async () => {
  if (!fs.existsSync(QUELLE)) {
    console.error(`FEHLER Quelle fehlt: ${path.relative(WURZEL, QUELLE)}`);
    process.exit(1);
  }

  const { data, info } = await sharp(QUELLE).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const feld = markeSuchen(data, info.width, info.height, info.channels);
  console.log(`Marke gefunden: ${feld.breite}x${feld.hoehe} bei ${feld.links},${feld.oben}`);

  const marke = await silhouette(data, info, feld);

  fs.mkdirSync(ZIEL, { recursive: true });
  for (const eintrag of ICONS) {
    const bild = await icon(marke, feld, eintrag);
    fs.writeFileSync(path.join(ZIEL, eintrag.datei), bild);
    console.log(`  ${eintrag.datei.padEnd(24)} ${eintrag.kante}x${eintrag.kante}  ${Math.round(bild.length / 1024)} KB`);
  }

  console.log(`\n${ICONS.length} Icons unter public/icons/.`);
})().catch((fehler) => {
  console.error(`FEHLER ${fehler.message}`);
  process.exit(1);
});
