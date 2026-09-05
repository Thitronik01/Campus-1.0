"use strict";

/* Der eigenständige Feedbackbogen wird außerhalb von Campus Quiz gepflegt.
   Hier werden seine erzeugten Netlify-Pakete angebunden. Ein geänderter
   Einstiegspunkt bricht den Bau ab, statt den Nachweis still wegzulassen. */
const fs = require("fs");
const path = require("path");

module.exports = function feedbackEinwilligung(ziel, version) {
  const appPath = path.join(ziel, "app-v14.js");
  const htmlPath = path.join(ziel, "index.html");
  const app = fs.readFileSync(appPath, "utf8");
  const anker = "    const payload = buildRpcPayload();";
  const ersatz = `    let consent;
    try { consent = window.CampusFeedbackEinwilligung.nachweis(); }
    catch (error) { setStatus(error.message, 'error'); return; }
    const payload = { ...buildRpcPayload(), consent };`;
  if (app.split(anker).length === 2 && !app.includes(ersatz)) {
    fs.writeFileSync(appPath, app.replace(anker, ersatz));
  } else if (app.includes(anker) || app.split(ersatz).length !== 2) {
    throw new Error("Feedback: Einstiegspunkt für den Einwilligungsnachweis hat sich geändert.");
  }

  // Das Gesamtpaket kopiert den bereits ergänzten Einzelbogen. Die zweite
  // Anwendung aktualisiert nur die Fassung, ohne Skripte zu verdoppeln.
  let html = fs.readFileSync(htmlPath, "utf8")
    .replace(/<link rel="stylesheet" href="(?:feedback-einwilligung|feedback-ux)\.css\?v=[^"]+">\s*/g, "")
    .replace(/<script src="(?:campus-einwilligung|feedback-einwilligung|feedback-ux)\.js\?v=[^"]+" defer><\/script>\s*/g, "")
    .replaceAll('href="https://www.thitronik.de/datenschutz/"', 'href="/datenschutz/"')
    .replaceAll('(max-width: 1228px) calc(100vw - 28px), 1200px', '(min-width: 1400px) 595px, (min-width: 1000px) 42vw, calc(100vw - 28px)');
  // Dieselben Motive wie auf der Campus-Karte helfen beim Wiedererkennen.
  // Das alte Plakat zeigt abweichende Themen und entfällt deshalb.
  html = html.replace(/<figure class="isles__poster">[\s\S]*?<\/figure>/g, "");
  const inselZiel = path.join(ziel, "assets", "campus-inseln");
  fs.mkdirSync(inselZiel, { recursive: true });
  for (const slug of ["vejro", "poel", "hiddensee", "samsoe", "fehmarn", "usedom", "langeland"]) {
    fs.copyFileSync(path.join(__dirname, "..", "public", "media", "inseln", `${slug}.webp`), path.join(inselZiel, `${slug}.webp`));
    html = html.replaceAll(`assets/v12/islands/${slug}.webp`, `assets/campus-inseln/${slug}.webp`);
  }
  const script = /<script src="app-v14\.js\?v=[^"]+" defer><\/script>/g;
  if ([...html.matchAll(script)].length !== 1) throw new Error("Feedback: Script-Einbindung hat sich geändert.");
  const dateien = ["campus-einwilligung.js", "feedback-einwilligung.js", "feedback-ux.js"];
  fs.writeFileSync(htmlPath, html.replace(script,
    `<link rel="stylesheet" href="feedback-einwilligung.css?v=${version}">\n<link rel="stylesheet" href="feedback-ux.css?v=${version}">\n` +
    dateien.map(name => `<script src="${name}?v=${version}" defer></script>`).join("\n") +
    `\n<script src="app-v14.js?v=${version}" defer></script>`));
  for (const name of [...dateien, "feedback-einwilligung.css", "feedback-ux.css"]) {
    fs.copyFileSync(path.join(__dirname, "..", "public", "assets", name), path.join(ziel, name));
  }
  return 12;
};
