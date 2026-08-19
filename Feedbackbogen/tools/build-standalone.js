/* Baut zwei Einzeldateien aus einer Version:
   1. Standalone  - alles eingebettet, per Doppelklick lauffaehig
   2. fuer ChatGPT - identischer Code, Bilder als Platzhalter statt Base64

   Version als Argument, sonst die aktuelle:  node tools/build-standalone.js v13
   Die Datei ist bewusst nicht pro Version kopiert - hier steckt keine
   Version-spezifische Logik, nur Dateinamen. */
const fs = require('fs');
const path = require('path');

const P = require('path').resolve(__dirname, '..');
const V = process.argv[2] || 'v14';

const html = fs.readFileSync(`${P}/index-${V}.html`, 'utf8');
const css = fs.readFileSync(`${P}/styles-${V}.css`, 'utf8');
const js = fs.readFileSync(`${P}/app-${V}.js`, 'utf8');
const rays = fs.readFileSync(`${P}/rays-${V}.js`, 'utf8');

const MIME = { webp: 'image/webp', png: 'image/png', jpg: 'image/jpeg', svg: 'image/svg+xml' };

function dataUri(rel) {
  const file = path.join(P, rel);
  const ext = rel.split('.').pop().toLowerCase();
  const buf = fs.readFileSync(file);
  return `data:${MIME[ext] || 'application/octet-stream'};base64,${buf.toString('base64')}`;
}

/* 1x1 transparentes PNG. Haelt das Layout, kostet 70 Zeichen statt 100 KB. */
const PLACEHOLDER =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII=';

function build({ embed, outFile, kopf }) {
  let out = html;

  /* Stylesheet und Skript einbetten. */
  let cssOut = css;
  const cssRefs = [...new Set(css.match(/assets\/[A-Za-z0-9._/-]+\.(webp|png|jpg|svg)/g) || [])];
  cssRefs.forEach((rel) => {
    cssOut = cssOut.split(rel).join(embed ? dataUri(rel) : PLACEHOLDER);
  });

  out = out.replace(
    new RegExp(`  <link rel="stylesheet" href="styles-${V}\\.css">`),
    `  <style>\n${cssOut.trim()}\n  </style>`
  );
  out = out.replace(
    new RegExp(`  <script src="app-${V}\\.js" defer></script>`),
    `  <script>\n${js.trim()}\n  </script>`
  );
  out = out.replace(
    new RegExp(`  <script src="rays-${V}\\.js" defer></script>`),
    `  <script>\n${rays.trim()}\n  </script>`
  );

  /* Preload zeigt auf eine externe Datei und ergibt in einer Einzeldatei
     keinen Sinn mehr. Das Favicon dagegen bleibt: als Data-URI funktioniert
     es auch ohne Nachbardateien. Ohne es fragt der Browser /favicon.ico an
     und quittiert mit einem 404 in der Konsole - in einer Datei, die per
     Doppelklick laufen soll, ein unnoetiger Fehler. In der Platzhalter-
     Fassung bleibt es beim 1x1-Pixel, dort zaehlt nur der Code. */
  out = out.replace(/ {2}<link rel="preload"[\s\S]*?fetchpriority="high">\n/, '');
  out = out.replace(
    / {2}<link rel="icon"[^>]*>/,
    `  <link rel="icon" href="${embed ? dataUri('assets/thitronik-logo.png') : PLACEHOLDER}">`
  );

  /* srcset und sizes entfernen: eine Einzeldatei traegt nur eine Bildgroesse. */
  out = out.replace(/\n\s*srcset="[^"]*"/g, '');
  out = out.replace(/\n\s*sizes="[^"]*"/g, '');
  out = out.replace(/\s+srcset="[^"]*"/g, '');
  out = out.replace(/\s+sizes="[^"]*"/g, '');

  /* Alle verbleibenden Bildpfade ersetzen. */
  const imgRefs = [...new Set(out.match(/assets\/[A-Za-z0-9._/-]+\.(webp|png|jpg|svg)/g) || [])];
  imgRefs.forEach((rel) => {
    out = out.split(`"${rel}"`).join(`"${embed ? dataUri(rel) : PLACEHOLDER}"`);
  });

  out = out.replace(`<body data-build="${V}">`, `<body data-build="${V}">\n${kopf}`);
  out = out.replace(/<!doctype html>/, `<!--\n${kopf.replace(/<!--|-->/g, '').trim()}\n-->\n<!doctype html>`);

  fs.writeFileSync(path.join(P, outFile), out, 'utf8');
  return { outFile, size: Buffer.byteLength(out, 'utf8'), bilder: imgRefs.length };
}

const a = build({
  embed: true,
  outFile: `THITRONIK_Campus_Feedbackbogen_${V}_Standalone.html`,
  kopf: '  <!-- Einzeldatei: HTML, CSS, JavaScript und Bilder vollstaendig eingebettet.\n' +
        '       Per Doppelklick lauffaehig. Speichert echt in Supabase, ausser mit ?demo=1. -->'
});

const b = build({
  embed: false,
  outFile: `THITRONIK_Campus_Feedbackbogen_${V}_Code.html`,
  kopf: '  <!-- Codefassung zum Weitergeben an ein Sprachmodell.\n' +
        '       Identisch zur Standalone-Datei, aber ohne Base64-Bilder: alle Bilder sind\n' +
        '       durch ein 1x1-Pixel ersetzt. Die echten Dateien liegen unter:\n' +
        '         assets/thitronik-logo.png\n' +
        '         assets/v12/hero-640|1024|1600.webp\n' +
        '         assets/v12/background-800|1600.webp\n' +
        '         assets/v12/inselhopping-700|1100.webp\n' +
        '         assets/v12/islands/{vejro,hiddensee,fehmarn,poel,usedom,langeland,samsoe}.webp -->'
});

[a, b].forEach((r) => {
  console.log(r.outFile.padEnd(52) + String(Math.round(r.size / 1024)).padStart(6) + ' KB   Bilder: ' + r.bilder);
});
