/* Baut netlify-<version>/ aus den tatsaechlichen Referenzen einer Version.

   Version als Argument, sonst die aktuelle:  node tools/build-netlify.js v13
   Die Datei ist bewusst nicht pro Version kopiert - hier steckt keine
   Version-spezifische Logik, nur Dateinamen. */
const fs = require('fs');
const path = require('path');

const SRC = require('path').resolve(__dirname, '..');
const V = process.argv[2] || 'v14';
const OUT = path.join(SRC, `netlify-${V}`);

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const html = fs.readFileSync(path.join(SRC, `index-${V}.html`), 'utf8');
const css = fs.readFileSync(path.join(SRC, `styles-${V}.css`), 'utf8');
const js = fs.readFileSync(path.join(SRC, `app-${V}.js`), 'utf8');
const rays = fs.readFileSync(path.join(SRC, `rays-${V}.js`), 'utf8');

/* Alle assets/... Pfade aus HTML und CSS einsammeln. */
const refs = new Set();
for (const text of [html, css, js, rays]) {
  const matches = text.match(/assets\/[A-Za-z0-9._/-]+\.(webp|png|jpg|jpeg|svg|ico)/g) || [];
  matches.forEach((m) => refs.add(m));
}

/* Einstiegsdateien. index-<version>.html wird zu index.html, weil Netlify das
   am Wurzelpfad ausliefert. CSS und JS behalten die Versionsnamen als
   Cache-Schutz (gleiche Begruendung wie im bestehenden README). */
const entries = [
  [`index-${V}.html`, 'index.html'],
  [`styles-${V}.css`, `styles-${V}.css`],
  [`app-${V}.js`, `app-${V}.js`],
  [`rays-${V}.js`, `rays-${V}.js`],
];

const fehlend = [];
let gesamt = 0;
const zeilen = [];

function kopiere(relSrc, relDst) {
  const from = path.join(SRC, relSrc);
  const to = path.join(OUT, relDst);
  if (!fs.existsSync(from)) { fehlend.push(relSrc); return; }
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
  const size = fs.statSync(to).size;
  gesamt += size;
  zeilen.push([relDst, size]);
}

entries.forEach(([a, b]) => kopiere(a, b));
[...refs].sort().forEach((rel) => kopiere(rel, rel));

/* Netlify-Header: HTML immer frisch pruefen, versionierte Dateien lange
   cachen. Ohne das laedt ein Teilnehmer beim zweiten Besuch alles neu. */
fs.writeFileSync(path.join(OUT, '_headers'), `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: DENY

/index.html
  Cache-Control: public, max-age=0, must-revalidate

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/styles-${V}.css
  Cache-Control: public, max-age=31536000, immutable

/app-${V}.js
  Cache-Control: public, max-age=31536000, immutable

/rays-${V}.js
  Cache-Control: public, max-age=31536000, immutable
`, 'utf8');

/* Skalenumkehr und Haendlernummer gibt es erst ab v14. Dieselbe Datei baut
   auch aeltere Pakete; ohne diese Weiche behauptete ein v13-README Regeln,
   die fuer v13 nicht gelten. */
const versionsNummer = Number(String(V).replace(/^v/, '')) || 0;

const skalaAbschnitt = versionsNummer >= 14 ? `
Notenskala
----------
Ab v14 ist 5 die BESTE und 1 die schlechteste Note. Bis v13 war es umgekehrt.
Die Zahl wird so gespeichert, wie sie angekreuzt wurde. Damit die Auswertung
beides nicht vermischt, tragen v14-Einsendungen form_version
"campus-2026-haendler-v14"; die Views gruppieren danach.
` : '';

const nummerAbschnitt = versionsNummer >= 14 ? `
Die Haendlernummer braucht supabase_v14_migration.sql, um eine eigene Spalte
zu bekommen. Ohne die Migration wird sie trotzdem gespeichert, aber nur
innerhalb von raw_payload. Der Bogen funktioniert in beiden Faellen.
` : '';

const titel = `THITRONIK Campus 2026 Feedbackbogen - Netlify-Paket (${V})`;
const readme = `${titel}
${'='.repeat(titel.length)}

Hochladen
---------
Diesen gesamten Ordner bei Netlify ablegen (Drag and Drop auf
app.netlify.com/drop oder als Publish-Verzeichnis im Deploy).
NICHT nur index.html hochladen, sonst fehlen Bilder und Stile.

Inhalt
------
index.html        Der Feedbackbogen (aus index-${V}.html)
styles-${V}.css    Stile
app-${V}.js        Logik und Anbindung an Supabase
rays-${V}.js       Lichtstrahlen im Kopfbereich und in der Danke-Ansicht.
                  Reine Dekoration. Faellt die Datei weg oder kann der Browser
                  kein WebGL, bleibt es beim bisherigen Hintergrund.
assets/           Logo und optimierte Bilder
_headers          Caching und Sicherheitsheader fuer Netlify

Der Ordner assets/v12 heisst absichtlich so. Die Bilder wurden fuer v12
optimiert und werden unveraendert mitgenutzt. Ein Umbenennen wuerde die
Pfade in HTML und CSS auseinanderlaufen lassen.
${skalaAbschnitt}
Backend
-------
Gespeichert wird ueber die bestehende RPC public.submit_campus_feedback(jsonb)
im Supabase-Projekt mhzlayhnyqlxdyiceyqz. Der Publishable Key steht im
Browser-Code, das ist beabsichtigt: die Tabellen bleiben per Row Level
Security gesperrt.
${nummerAbschnitt}
Test ohne Speichern
-------------------
index.html?demo=1 prueft alles durch und zeigt die Danke-Ansicht,
speichert aber absichtlich nichts.
`;
fs.writeFileSync(path.join(OUT, 'README.txt'), readme, 'utf8');

zeilen.push(['_headers', fs.statSync(path.join(OUT, '_headers')).size]);
zeilen.push(['README.txt', fs.statSync(path.join(OUT, 'README.txt')).size]);
gesamt += zeilen.slice(-2).reduce((s, r) => s + r[1], 0);

console.log('Referenzen gefunden:', refs.size);
zeilen.sort((a, b) => a[0].localeCompare(b[0]));
zeilen.forEach(([name, size]) => {
  console.log('  ' + name.padEnd(42) + String(Math.max(1, Math.round(size / 1024))).padStart(5) + ' KB');
});
console.log('  ' + '-'.repeat(48));
console.log('  ' + 'GESAMT'.padEnd(42) + String(Math.round(gesamt / 1024)).padStart(5) + ' KB');
if (fehlend.length) console.log('FEHLEND:', fehlend);
else console.log('Alle referenzierten Dateien vorhanden.');
