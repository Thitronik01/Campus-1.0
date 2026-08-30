"use strict";

/* ==========================================================================
   Bereitet die Einzelmotive der Insel-Bühnen auf.

     npm install sharp --no-save
     node tools/szenen-bauen.js            # alle Inseln
     node tools/szenen-bauen.js fehmarn    # nur eine

   Quelle sind die generierten PNG-Dateien in `export/Bilder <Insel>/`,
   Ziel ist `public/media/<insel>/` als WebP.

   Warum ein Werkzeug und kein einmaliges Kopieren von Hand:

   1. ZUSCHNITT. Die Motive liegen freigestellt auf großen, überwiegend
      leeren Flächen — beim Verkäufer auf USEDOM sind 76 % des Bildes
      transparent, bei der Kundin 82 %. Ohne Zuschnitt positioniert man in
      CSS nicht das Motiv, sondern seinen leeren Rand: Eine Angabe wie
      "Verkäufer bei 36 % der Breite" verschiebt dann das Kästchen, nicht die
      Person. Nach dem Zuschnitt beschreibt jede Kante wirklich das Motiv.

   2. GRÖSSE. Die Quelldateien sind je Insel mehrere Megabyte. Der Campus
      läuft im WLAN einer Messehalle; eine Bühne darf davon nur einen
      Bruchteil kosten.

   Die Dateinamen der Quelle sind Zufallsnamen aus dem Bildgenerator. Die
   Zuordnung steht deshalb unten explizit — sie ist der Teil, den man beim
   Nachziehen eines Motivs anpasst.
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
const EXPORT = path.join(WURZEL, "..", "export");

/* Je Insel: Quellordner, Dateipräfix und die Motive.
 *
 *  `breite` / `hoehe`  Zielmaß in Pixeln — genau eines von beiden. Personen
 *            werden nach HÖHE bemessen, Geräte und Flächen nach BREITE: Auf
 *            der Bühne bestimmt bei Menschen ihre Körpergröße den Platz, bei
 *            einem Aufsteller seine Breite. Nach Breite skaliert kam der
 *            schmale Profilzuschnitt der USEDOM-Kundin auf 1445 px Höhe —
 *            viermal so viel wie gebraucht.
 *  `trimmen` Transparente Ränder entfernen. Bei Lichteffekten mit Schwelle,
 *            weil ihr Auslauf selbst fast durchsichtig ist und ein scharfer
 *            Zuschnitt die weiche Kante abschneiden würde.
 */
const INSELN = {
  usedom: {
    ordner: "Bilder Usedom",
    stamm: "ChatGPT Image 30. Aug. 2026, ",
    motive: [
      { von: "18_19_36 (1).png", nach: "use-szene-raum.webp",
        breite: 1400, trimmen: false, qualitaet: 70,
        zweck: "Hintergrund: Neonraum mit Spiegelboden" },
      { von: "18_19_38 (8).png", nach: "use-szene-display.webp",
        breite: 1100, trimmen: true, qualitaet: 82,
        zweck: "Verkaufsdisplay, das Hauptmotiv" },
      { von: "18_19_37 (6).png", nach: "use-szene-verkaeufer.webp",
        hoehe: 760, trimmen: true, qualitaet: 82,
        zweck: "Verkaeufer im THITRONIK-Polo" },
      { von: "18_19_38 (7).png", nach: "use-szene-kundin.webp",
        hoehe: 720, trimmen: true, qualitaet: 82,
        zweck: "Kundin im Profil" },
      { von: "18_19_36 (2).png", nach: "use-szene-podest.webp",
        breite: 1000, trimmen: 12, qualitaet: 72,
        zweck: "Neon-Buehnenplattform unter der Szene" }
      /* Nicht eingebunden: radialer Lichtschein (152 KB fuer einen weichen
         Kreisverlauf) und vertikaler Lichtstab (64 KB fuer einen leuchtenden
         Balken) — beides macht CSS ohne Ladezeit und verlustfrei skalierend.
         Der diagonale Lichtstrahl liegt auf der Flaeche der Ueberschrift. */
    ]
  },

  langeland: {
    ordner: "Bilder Langeland",
    stamm: "ChatGPT Image 30. Aug. 2026, ",
    motive: [
      /* Eine einzige, fertige Szene — und zwar eine, die die Textflaeche
         schon mitbringt: Links liegt eine grosse, fast leere dunkle Zone,
         rechts stehen Uebergabe und Fahrzeug. Sie gehoert deshalb als Buehne
         ueber die ganze Flaeche, nicht als Motiv darauf. Das Vorgaengerbild
         war ein freigestelltes Haendepaar auf Weiss. */
      { von: "21_21_08.png", nach: "lan-szene-uebergabe.webp",
        breite: 1500, trimmen: false, qualitaet: 76,
        zweck: "Schluesseluebergabe am Fahrzeug, komplette Szene" }
    ]
  },

  fehmarn: {
    ordner: "Bilder Fehmarn",
    stamm: "ChatGPT Image 30. Aug. 2026, ",
    motive: [
      { von: "19_52_26 (1).png", nach: "feh-szene-raum.webp",
        breite: 1400, trimmen: false, qualitaet: 70,
        zweck: "Hintergrund: Sci-Fi-Raum mit Bodenglow und Lichtlinie" },
      /* Die Hauptszene ist bewusst EIN Bild: Mitarbeiterin, ProFinder,
         Tablet, Notizblock und Zubehoer sind darin fotografisch aufeinander
         abgestimmt. Auseinandergenommen und in CSS neu gestapelt ginge genau
         diese Abstimmung verloren. Entsprechend hoch die Qualitaet — es ist
         das Motiv, das der Teilnehmer wirklich ansieht. */
      { von: "19_52_26 (2).png", nach: "feh-szene-arbeitsplatz.webp",
        breite: 1240, trimmen: true, qualitaet: 84,
        zweck: "Hauptmotiv: Support-Arbeitsplatz, komplette Komposition" },
      { von: "19_52_27 (3).png", nach: "feh-szene-welle.webp",
        breite: 900, trimmen: 12, qualitaet: 74,
        zweck: "Telefonhoerer mit Signalwellen, dekorativ" }
    ]
  }
};

function kb(datei) {
  return Math.round(fs.statSync(datei).size / 1024);
}

async function baueInsel(slug) {
  const insel = INSELN[slug];
  const quellOrdner = path.join(EXPORT, insel.ordner);
  const ziel = path.join(WURZEL, "public", "media", slug);

  if (!fs.existsSync(quellOrdner)) {
    throw new Error(`Quellordner fehlt: ${quellOrdner}`);
  }
  fs.mkdirSync(ziel, { recursive: true });

  console.log(`\n${slug.toUpperCase()}`);
  let summe = 0;
  for (const motiv of insel.motive) {
    const quelle = path.join(quellOrdner, insel.stamm + motiv.von);
    if (!fs.existsSync(quelle)) throw new Error(`Quelldatei fehlt: ${quelle}`);
    const zielDatei = path.join(ziel, motiv.nach);

    let bild = sharp(quelle);
    const vorher = await bild.metadata();

    if (motiv.trimmen) {
      bild = bild.trim(
        typeof motiv.trimmen === "number" ? { threshold: motiv.trimmen } : { threshold: 1 }
      );
    }

    await bild
      .resize(motiv.hoehe
        ? { height: motiv.hoehe, withoutEnlargement: true }
        : { width: motiv.breite, withoutEnlargement: true })
      .webp({ quality: motiv.qualitaet, effort: 6 })
      .toFile(zielDatei);

    const nachher = await sharp(zielDatei).metadata();
    summe += kb(zielDatei);
    console.log(
      `  ${motiv.nach.padEnd(30)} ${String(vorher.width).padStart(4)}x${String(vorher.height).padEnd(4)}` +
      ` -> ${String(nachher.width).padStart(4)}x${String(nachher.height).padEnd(4)}` +
      ` ${String(kb(zielDatei)).padStart(4)} KB   ${motiv.zweck}`
    );
  }
  console.log(`  Summe: ${summe} KB fuer ${insel.motive.length} Motive.`);
  return summe;
}

async function bauen() {
  const gewaehlt = process.argv[2];
  const slugs = gewaehlt ? [gewaehlt] : Object.keys(INSELN);
  for (const slug of slugs) {
    if (!INSELN[slug]) {
      throw new Error(`Unbekannte Insel "${slug}". Bekannt: ${Object.keys(INSELN).join(", ")}`);
    }
    await baueInsel(slug);
  }
}

bauen().catch((fehler) => {
  console.error(`\nFehlgeschlagen: ${fehler.message}\n`);
  process.exit(1);
});
