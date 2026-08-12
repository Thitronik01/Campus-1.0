/* Baut zwei Einzeldateien aus v13:
   1. Standalone  - alles eingebettet, per Doppelklick lauffaehig
   2. fuer ChatGPT - identischer Code, Bilder als Platzhalter statt Base64  */
const fs = require('fs');
const path = require('path');

const P = require('path').resolve(__dirname, '..');

const html = fs.readFileSync(`${P}/index-v13.html`, 'utf8');
const css = fs.readFileSync(`${P}/styles-v13.css`, 'utf8');
const js = fs.readFileSync(`${P}/app-v13.js`, 'utf8');

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
    /  <link rel="stylesheet" href="styles-v13\.css">/,
    `  <style>\n${cssOut.trim()}\n  </style>`
  );
  out = out.replace(
    /  <script src="app-v13\.js" defer><\/script>/,
    `  <script>\n${js.trim()}\n  </script>`
  );

  /* Preload und Favicon zeigen auf externe Dateien, in einer Einzeldatei
     ergeben sie keinen Sinn mehr. */
  out = out.replace(/ {2}<link rel="preload"[\s\S]*?fetchpriority="high">\n/, '');
  out = out.replace(/ {2}<link rel="icon"[^>]*>\n/, '');

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

  out = out.replace('<body data-build="v13">', `<body data-build="v13">\n${kopf}`);
  out = out.replace(/<!doctype html>/, `<!--\n${kopf.replace(/<!--|-->/g, '').trim()}\n-->\n<!doctype html>`);

  fs.writeFileSync(path.join(P, outFile), out, 'utf8');
  return { outFile, size: Buffer.byteLength(out, 'utf8'), bilder: imgRefs.length };
}

const a = build({
  embed: true,
  outFile: 'THITRONIK_Campus_Feedbackbogen_v13_Standalone.html',
  kopf: '  <!-- Einzeldatei: HTML, CSS, JavaScript und Bilder vollstaendig eingebettet.\n' +
        '       Per Doppelklick lauffaehig. Speichert echt in Supabase, ausser mit ?demo=1. -->'
});

const b = build({
  embed: false,
  outFile: 'THITRONIK_Campus_Feedbackbogen_v13_Code.html',
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
