import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fixture = JSON.parse(fs.readFileSync(path.join(root, "tools/fixtures/audio-question.json"), "utf8"));
const html = fs.readFileSync(path.join(root, "public/index.html"), "utf8");
const engine = fs.readFileSync(path.join(root, "public/assets/engine.js"), "utf8");
const css = fs.readFileSync(path.join(root, "public/assets/styles.css"), "utf8");
const audioFile = path.join(root, "public", fixture.audio.src.replace(/^\//, ""));

assert.equal(fixture.audio.src.endsWith(".mp3"), true, "Testfrage verwendet MP3");
assert.ok(fixture.audio.fallbackText, "Testfrage hat Textalternative");
assert.ok(fs.existsSync(audioFile) && fs.statSync(audioFile).size > 1000, "Test-Audiodatei existiert");
for (const id of ["q-audio", "q-audio-button", "q-audio-progress", "q-audio-time", "q-audio-fallback-text", "q-audio-player"]) {
  assert.ok(html.includes(`id="${id}"`), `${id} ist im Quiz vorhanden`);
}
assert.ok(!/<audio[^>]+autoplay/i.test(html), "Audio startet nicht automatisch");
assert.ok(engine.includes("function renderAudio(q)") && engine.includes('addEventListener("timeupdate"'), "Engine rendert Audio und Fortschritt");
assert.ok(engine.includes('qAudioButton.addEventListener("click"'), "Wiederholbarer Play-/Pause-Knopf ist verdrahtet");
assert.ok(css.includes("min-height: var(--tap)") && css.includes(".q-audio-button"), "Audio-Bedienung erfüllt die Campus-Trefferfläche");

console.log("Audio-Testfrage: Engine, MP3, Textalternative, Fortschritt und No-Autoplay geprüft.");
