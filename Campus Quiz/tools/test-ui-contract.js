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
pruefe("Jeder neue Campus-Einstieg beginnt mit der Profileinrichtung", /if \(!state\.campusEntered \|\| !participantComplete\(participant\)\) \{\s*renderOnboarding\(participant\);/.test(engine));
pruefe("Profilabschluss führt im Gesamtcampus zur Inselkarte", /function enterCampusAfterProfile\(\)[\s\S]*?params\.delete\("insel"\);[\s\S]*?history\.replaceState\([^;]+\/quiz[\s\S]*?renderIslands\(\);/.test(engine));
pruefe("Profilformular gibt den Campus-Einstieg frei", /profileForm\.addEventListener\("submit"[\s\S]*?state\.campusEntered = true;\s*await enterCampusAfterProfile\(\);/.test(engine));
pruefe("lokaler Löschweg ist im Profil, Menü und Fuß erreichbar",
  (html.match(/data-campusdaten-loeschen/g) || []).length === 3);
pruefe("Löschdialog nennt Umfang und Servergrenze",
  /id="daten-loeschen-dialog"[\s\S]*?Profil, Inselfortschritt und noch nicht übertragene Quizergebnisse[\s\S]*?Bereits an den Server übermittelte/.test(html));
pruefe("Löschweg entfernt genau die drei Campus-Schlüssel",
  /\[LS_PARTICIPANT, LS_DONE, LS_OUTBOX\][\s\S]*?localStorage\.removeItem\(schluessel\)/.test(engine));
pruefe("Löschweg verlangt eine Bestätigung",
  /datenLoeschenDialog\.returnValue !== "delete"/.test(engine));

pruefe("Rückblick liefert die gespeicherte Reihenfolge", /state\.results\.push\(\{ question: q, answer, isCorrect, draft: draftSnapshot\(\) \}\)/.test(engine));
pruefe("Rückblick prüft nie eine schon bewertete Frage", /if \(!state\.results\[state\.viewIndex\]\) \{ reveal\(\); return; \}/.test(engine));
pruefe("Fragenübersicht steht im Kopf der Karte", /<div class="quiz-head">[\s\S]*?id="q-overview"[\s\S]*?<div class="quiz-body">/.test(html));
pruefe("nur eine Fortschrittsanzeige in der Fragenansicht", !/id="q-progress"|id="q-dots"|class="quiz-legend"|quiz-progress-row/.test(html));
pruefe("Kopfzeile in der Fragenansicht ausgeblendet", /body\.ist-quiz \.masthead \{ display: none; \}/.test(css) && /classList\.toggle\("ist-quiz", name === "quiz"\)/.test(engine));
pruefe("Übersichtsknöpfe erfüllen die Trefferfläche", /\.quiz-overview button \{[^}]*width: var\(--tap\);[^}]*height: var\(--tap\);/.test(css));
pruefe("THI in der Fragenansicht erreichbar", /id="btn-quiz-thi"[^>]*aria-label="THI zu dieser Frage fragen"/.test(html) && /btnQuizThi\.addEventListener\("click", thiOeffnen\)/.test(engine));
pruefe("THI kennt die laufende Frage, nie die Lösung", /function thiKontextMelden/.test(engine) && !/correct/.test(engine.slice(engine.indexOf("function thiKontextMelden"), engine.indexOf("function thiKontextMelden") + 2200)) && /window\.THI = /.test(thi) && /quizfrage: kontext/.test(thi));
pruefe("THI vergisst die Frage beim Verlassen", /if \(name !== "quiz"\) thiKontextMelden\(null\);/.test(engine));
pruefe("Seitenleiste nur ab Desktopbreite", /\.quiz-aside \{ display: none; \}\s*@media \(min-width: 1100px\) \{ \.quiz-aside \{ display: grid;/.test(css));
pruefe("Auflösung in Zellen", /id="q-feedback-erklaert"[\s\S]*?id="q-feedback-irrtum"[\s\S]*?id="q-feedback-mitnehmen"/.test(html));

if (fehler.length) {
  console.error(`UI-Verträge: ${bestanden} bestanden, ${fehler.length} fehlgeschlagen.`);
  fehler.forEach((name) => console.error(`  FEHLER  ${name}`));
  process.exit(1);
}

console.log(`UI-Verträge: ${bestanden} bestanden, 0 fehlgeschlagen.`);
