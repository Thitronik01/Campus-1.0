const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC = require('path').resolve(__dirname, '..', 'assets');
const OUT = path.join(SRC, 'v12');
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(path.join(OUT, 'islands'), { recursive: true });

const jobs = [
  // Hero: responsive Varianten. Das Original ist 2048x714.
  { in: 'campus-hero.webp', out: 'hero-1600.webp', width: 1600, q: 76 },
  { in: 'campus-hero.webp', out: 'hero-1024.webp', width: 1024, q: 76 },
  { in: 'campus-hero.webp', out: 'hero-640.webp', width: 640, q: 74 },

  // Poster: wird maximal ~560px breit dargestellt, 2x reicht voellig.
  { in: 'campus-feedback-inselhopping.png', out: 'inselhopping-1100.webp', width: 1100, q: 74 },
  { in: 'campus-feedback-inselhopping.png', out: 'inselhopping-700.webp', width: 700, q: 72 },

  // Seitenhintergrund
  { in: 'campus-background.webp', out: 'background-1600.webp', width: 1600, q: 68 },
  { in: 'campus-background.webp', out: 'background-800.webp', width: 800, q: 66 },
];

const islands = ['vejro', 'hiddensee', 'fehmarn', 'poel', 'usedom', 'langeland', 'samsoe'];
for (const name of islands) {
  jobs.push({ in: `islands/${name}.png`, out: `islands/${name}.webp`, width: 180, q: 82, alpha: true });
}

(async () => {
  let before = 0, after = 0;
  const rows = [];
  for (const job of jobs) {
    const src = path.join(SRC, job.in);
    const dst = path.join(OUT, job.out);
    const srcSize = fs.statSync(src).size;

    await sharp(src)
      .resize({ width: job.width, withoutEnlargement: true })
      .webp({ quality: job.q, alphaQuality: job.alpha ? 100 : 80, effort: 6 })
      .toFile(dst);

    const dstSize = fs.statSync(dst).size;
    before += srcSize;
    after += dstSize;
    rows.push(`${job.out.padEnd(28)} ${(srcSize / 1024).toFixed(0).padStart(6)} KB -> ${(dstSize / 1024).toFixed(0).padStart(5)} KB`);
  }
  console.log(rows.join('\n'));
  console.log('-'.repeat(52));
  console.log(`Summe Quellen ${(before / 1024 / 1024).toFixed(2)} MB -> Ausgabe ${(after / 1024).toFixed(0)} KB`);
})();
