"use strict";

/* ==========================================================================
   Bereitet die Motive der Campus-Karte auf.

     npm install sharp --no-save
     node tools/karten-assets.js

   Quelle ist das Asset-Pack unter

     export/thitronik_campus_asset_pack/thitronik_campus_asset_pack/

   Ziel sind die sieben Inselmotive in `public/media/inseln/` und die
   Kartendeko in `public/media/campus/karte/`.

   Warum ein Werkzeug und kein Kopieren von Hand — dieselben zwei Gründe wie
   bei `szenen-bauen.js`, hier nur noch deutlicher:

   1. ZUSCHNITT. Alle Inseln liegen als 1254x1254-Quadrate vor, das Motiv
      selbst füllt davon je nach Form zwischen 39 % und 78 % der Breite.
      USEDOM etwa ist real 587x1249 — wer das ungeschnittene Quadrat in CSS
      auf "26 % der Bühne" setzt, positioniert zu mehr als der Hälfte
      transparente Luft. Nach dem Zuschnitt beschreibt jede Kante das Motiv,
      und die Prozentangaben auf der Karte meinen, was sie sagen.

   2. GEWICHT. Das Pack wiegt 28 MB. Der Campus läuft im WLAN einer
      Messehalle; die ganze Karte darf davon einen Bruchteil kosten. Nach
      Zuschnitt, Verkleinerung auf die lange Kante und WebP bleiben rund
      600 KB — davon lädt das Telefon nur die Inseln, weil die Deko
      ausschließlich in der Karten-Medienabfrage als CSS-Hintergrund steht
      und der Browser Hintergründe nicht passender Abfragen nicht holt.

   Bemessen wird nach der LANGEN KANTE, nicht nach der Breite. Die sieben
   Inseln sind verschieden herum: FEHMARN ist breit (1230x839), HIDDENSEE
   hochkant (613x1232). Nach Breite skaliert käme Hiddensee auf 1250 px Höhe
   für ein Motiv, das auf der Karte 12 % breit ist.

   Am Ende druckt das Werkzeug die entstandenen Maße. Die gehören als
   `imageBreite` / `imageHoehe` in `public/data/inseln.json`, damit die
   Kachel ihre Fläche vor dem Laden kennt und nichts nachrutscht.
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

const WURZEL = path.join(__dirname, "..");
const PACK = path.join(
  WURZEL, "..", "export",
  "thitronik_campus_asset_pack", "thitronik_campus_asset_pack"
);

const ZIEL_INSELN = path.join(WURZEL, "public", "media", "inseln");
const ZIEL_KARTE = path.join(WURZEL, "public", "media", "campus", "karte");

/* Die Dateinamen im Pack tragen eine laufende Nummer und das Lernthema. Der
   Campus kennt Inseln nur über ihren Slug — die Zuordnung steht deshalb hier
   und nicht in einer Namenskonvention, die beim nächsten Pack anders lautet.

   `lang` ist die Zielgröße der langen Kante in Pixeln. 620 deckt die größte
   Darstellung ab: eine Insel nimmt auf der Bühne höchstens 28 % ein, das
   sind auf einem Retina-Notebook rund 700 Gerätepixel. Der Rest ist
   Schärfe, die niemand sieht, und Gewicht, das jeder lädt. */
const INSELN = {
  fehmarn:   { datei: "island_01_fehmarn_fehler_support",              lang: 620 },
  usedom:    { datei: "island_02_usedom_verkaufsdisplay_konfigurator", lang: 620 },
  langeland: { datei: "island_03_langeland_annahme_uebergabe",         lang: 620 },
  samsoe:    { datei: "island_04_samsoe_einbauorte",                   lang: 620 },
  vejro:     { datei: "island_05_vejroe_produktneuheiten",             lang: 620 },
  hiddensee: { datei: "island_06_hiddensee_funkkontakte_verbindungen", lang: 620 },
  poel:      { datei: "island_07_poel_haendlerbereich",                lang: 620 }
};

/* Die Kartendeko. `trimmen: false` nur für den Seegrund — er ist
   randabfallend und hat nichts abzuschneiden.

   Die Größen sind an der Darstellung bemessen: Der Seegrund liegt als
   `cover` unter der ganzen Bühne, die Kompassrose sitzt oben rechts bei
   rund 11 % Breite, Boot, Wal und Möwen sind Streuung im Wasser. */
const DEKO = {
  see:       { datei: "map_background_topographic_ocean", lang: 1440, trimmen: false, qualitaet: 70 },
  kompass:   { datei: "compass_rose",                     lang: 300,  trimmen: true,  qualitaet: 76 },
  segelboot: { datei: "sailboat_thitronik",               lang: 420,  trimmen: true,  qualitaet: 76 },
  wal:       { datei: "whale_tail",                       lang: 420,  trimmen: true,  qualitaet: 76 },
  moewen:    { datei: "seagulls",                         lang: 420,  trimmen: true,  qualitaet: 76 },
  wellen:    { datei: "wave_ornaments",                   lang: 520,  trimmen: true,  qualitaet: 76 }
};

const QUALITAET_INSEL = 70;

// ------------------------------------------------------------------ Helfer --

function ordner(p) {
  fs.mkdirSync(p, { recursive: true });
}

function kilobyte(bytes) {
  return `${Math.round(bytes / 1024)} KB`;
}

/** Zuschneiden, auf die lange Kante verkleinern, als WebP schreiben.
 *  Gibt die entstandenen Maße zurück — sie werden am Ende gedruckt. */
async function aufbereiten(quelle, ziel, { lang, trimmen = true, qualitaet }) {
  if (!fs.existsSync(quelle)) throw new Error(`Quelle fehlt: ${quelle}`);

  let bild = sharp(quelle);
  // Schwelle 8 statt 0: Die Motive haben weiche, fast durchsichtige
  // Schattenkanten. Ein Zuschnitt bei exakt 0 liesse davon einen breiten,
  // unsichtbaren Rand stehen — genau den Rand, den der Zuschnitt weg soll.
  if (trimmen) bild = bild.trim({ threshold: 8 });

  const roh = await bild.toBuffer({ resolveWithObject: true });
  const quer = roh.info.width >= roh.info.height;

  const daten = await sharp(roh.data)
    .resize(quer ? { width: lang } : { height: lang })
    .webp({ quality: qualitaet, effort: 6, alphaQuality: 88 })
    .toBuffer();

  ordner(path.dirname(ziel));
  fs.writeFileSync(ziel, daten);

  const masse = await sharp(daten).metadata();
  return { breite: masse.width, hoehe: masse.height, bytes: daten.length };
}

// ------------------------------------------------------------------- Ablauf --

(async () => {
  if (!fs.existsSync(PACK)) {
    console.error(
      `Asset-Pack nicht gefunden:\n\n  ${PACK}\n\n` +
      "Es ist bewusst nicht versioniert (siehe .gitignore). Wer die Motive\n" +
      "nachziehen will, legt das Pack dorthin zurueck.\n"
    );
    process.exit(1);
  }

  let gesamt = 0;
  const katalog = [];

  console.log("Inseln");
  for (const [slug, angabe] of Object.entries(INSELN)) {
    const ergebnis = await aufbereiten(
      path.join(PACK, "02_islands", `${angabe.datei}.png`),
      path.join(ZIEL_INSELN, `${slug}.webp`),
      { lang: angabe.lang, trimmen: true, qualitaet: QUALITAET_INSEL }
    );
    gesamt += ergebnis.bytes;
    katalog.push({ slug, ...ergebnis });
    console.log(
      `  ${slug.padEnd(10)} ${String(ergebnis.breite).padStart(4)}x${String(ergebnis.hoehe).padEnd(4)}` +
      `  ${kilobyte(ergebnis.bytes).padStart(7)}`
    );
  }

  console.log("\nKartendeko");
  for (const [name, angabe] of Object.entries(DEKO)) {
    const ergebnis = await aufbereiten(
      path.join(PACK, "03_map_assets", `${angabe.datei}.png`),
      path.join(ZIEL_KARTE, `${name}.webp`),
      angabe
    );
    gesamt += ergebnis.bytes;
    console.log(
      `  ${name.padEnd(10)} ${String(ergebnis.breite).padStart(4)}x${String(ergebnis.hoehe).padEnd(4)}` +
      `  ${kilobyte(ergebnis.bytes).padStart(7)}`
    );
  }

  console.log(`\nZusammen ${kilobyte(gesamt)}.`);
  console.log("Davon holt das Telefon nur die Inseln — die Deko steht als");
  console.log("Hintergrund in der Karten-Medienabfrage und wird dort nicht geladen.\n");

  console.log("Fuer public/data/inseln.json (verhindert das Nachrutschen der Kachel):");
  for (const eintrag of katalog) {
    console.log(`  ${eintrag.slug.padEnd(10)} "imageBreite": ${eintrag.breite}, "imageHoehe": ${eintrag.hoehe}`);
  }
})().catch((fehler) => {
  console.error(fehler.message);
  process.exit(1);
});
