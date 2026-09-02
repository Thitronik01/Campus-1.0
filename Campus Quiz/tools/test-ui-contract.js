"use strict";

/* Kleine Quellverträge für Bedienung und Responsive Design. Die sichtbare
   Browserprüfung bleibt wichtig; diese Tests verhindern zusätzlich, dass die
   konkreten Ursachen der behobenen GitHub-Issues unbemerkt zurückkehren. */

const fs = require("fs");
const path = require("path");

const WURZEL = path.join(__dirname, "..");
const lies = (datei) => fs.readFileSync(path.join(WURZEL, datei), "utf8");

const html = lies(path.join("public", "index.html"));
const css = lies(path.join("public", "assets", "styles.css"));
const thiCss = lies(path.join("public", "assets", "thi.css"));
const engine = lies(path.join("public", "assets", "engine.js"));
const thi = lies(path.join("public", "assets", "thi.js"));

let bestanden = 0;
const fehler = [];

function pruefe(name, bedingung) {
  if (bedingung) bestanden += 1;
  else fehler.push(name);
}

pruefe("dauerhafter Live-Bereich", /id="live-announcer"[^>]*role="status"[^>]*aria-live="polite"/.test(html));
pruefe("kein Live-Bereich in verborgener Quizauflösung", !/id="q-feedback"[^>]*aria-live/.test(html));
pruefe("Arbeitskarte hat zugänglichen Namen", /id="arbeitskarte-link"[^>]*aria-label="Arbeitskarte öffnen"/.test(html));
pruefe("Feedbackbogen hat zugänglichen Namen", /id="tagesabschluss"[^>]*aria-label="Feedbackbogen öffnen"/.test(html));
pruefe("THI hat zugänglichen Namen", /setAttribute\("aria-label", "THI fragen"\)/.test(thi));
pruefe("Shell gleicht den Seitenzoom aus", /\.shell\s*\{[\s\S]*?min-height:\s*125vh;[\s\S]*?min-height:\s*125dvh;/.test(css));
pruefe("gemeinsame Inselregeln bleiben überschreibbar", /#screen-start:where\(\[data-island\]\) \.start-layout/.test(css));
pruefe("Bildantworten behalten ihr Raster", /\.answers:not\(\.answers-bild\)/.test(css));
pruefe("Dialog-Fallback versteckt geschlossene Dialoge", /\.lightbox:not\(\[open\]\),\s*\n?\.confirm-dialog:not\(\[open\]\)\s*\{\s*display:\s*none;/.test(css));
pruefe("Usedom-Licht wird auf Tablet neu ausgerichtet", /@media \(max-width: 900px\)[\s\S]*?\.usedom-start-visual::before\s*\{[^}]*left:\s*24%;/.test(css));
pruefe("Usedom-Licht wird auf Telefon neu ausgerichtet", /@media \(max-width: 640px\)[\s\S]*?\.usedom-start-visual::before\s*\{[^}]*left:\s*21%;/.test(css));
pruefe("THI-Schliessen erfüllt die Trefferfläche", /\.thi-kopf-knopf\s*\{[^}]*width:\s*var\(--tap\);[^}]*height:\s*var\(--tap\);/.test(thiCss));
pruefe("THI-Senden erfüllt die Trefferfläche", /\.thi-senden\s*\{[^}]*width:\s*var\(--tap\);[^}]*height:\s*var\(--tap\);/.test(thiCss));
pruefe("erste Frage wird vor dem Fokus eingeblendet", /state\.roundActive = true;[\s\S]*?show\("quiz"\);\s*renderQuestion\(\);/.test(engine));
pruefe("aktive Runde schützt Zurück und Neuladen", /addEventListener\("popstate"[\s\S]*?state\.roundActive[\s\S]*?addEventListener\("beforeunload"/.test(engine));
pruefe("Audioknopf wird für neue Fragen zurückgesetzt", /qAudioButton\.disabled = false;[\s\S]*?qAudioStatus\.textContent = "";/.test(engine));

if (fehler.length) {
  console.error(`UI-Verträge: ${bestanden} bestanden, ${fehler.length} fehlgeschlagen.`);
  fehler.forEach((name) => console.error(`  FEHLER  ${name}`));
  process.exit(1);
}

console.log(`UI-Verträge: ${bestanden} bestanden, 0 fehlgeschlagen.`);
