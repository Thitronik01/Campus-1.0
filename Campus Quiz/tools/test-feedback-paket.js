"use strict";
const fs = require("fs");
const os = require("os");
const path = require("path");
const assert = require("assert/strict");
const bauen = require("./feedback-einwilligung-bauen.js");
const quelle = path.resolve(__dirname, "..", "..", "Feedbackbogen");
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "campus-feedback-test-"));
try {
  fs.copyFileSync(path.join(quelle, "app-v14.js"), path.join(tmp, "app-v14.js"));
  fs.copyFileSync(path.join(quelle, "index-v14.html"), path.join(tmp, "index.html"));
  bauen(tmp, "probe-1");
  bauen(tmp, "probe-2");
  const html = fs.readFileSync(path.join(tmp, "index.html"), "utf8");
  const app = fs.readFileSync(path.join(tmp, "app-v14.js"), "utf8");
  assert.equal((app.match(/CampusFeedbackEinwilligung.nachweis\(\)/g) || []).length, 1);
  for (const name of ["campus-einwilligung.js", "feedback-einwilligung.js", "feedback-einwilligung.css", "feedback-ux.js", "feedback-ux.css"]) {
    assert.equal(html.split(`${name}?v=probe-2`).length, 2);
    assert.ok(fs.existsSync(path.join(tmp, name)));
  }
  assert.ok(!html.includes("probe-1"));
  assert.ok(!html.includes('class="isles__poster"'));
  for (const slug of ["vejro", "poel", "hiddensee", "samsoe", "fehmarn", "usedom", "langeland"]) {
    assert.ok(html.includes(`assets/campus-inseln/${slug}.webp`));
    assert.ok(fs.existsSync(path.join(tmp, "assets", "campus-inseln", `${slug}.webp`)));
  }
  assert.ok(html.includes('href="/datenschutz/"'));
  assert.ok(app.indexOf("CampusFeedbackEinwilligung.nachweis()") < app.indexOf("const payload = { ...buildRpcPayload(), consent }"));
  // Der statische Forms-Weg muss den vollständigen Payload einschließlich
  // Nachweis übernehmen, nicht nur die sichtbaren Formulareingaben.
  assert.ok(app.includes("netlifyPayload.value = JSON.stringify(payload)"));
  fs.writeFileSync(path.join(tmp, "app-v14.js"), app.replace("...buildRpcPayload(), consent", "...buildRpcPayload(), veraendert"));
  assert.throws(() => bauen(tmp, "probe-3"), /Einstiegspunkt/);
  console.log("Feedback-Paket: wiederholter Bau, Nachweis, Forms-Weg und geänderter Einstiegspunkt geprüft.");
} finally {
  // mkdtemp erzeugt den eindeutigen, absoluten Ordner ausschließlich unter TEMP.
  if (path.dirname(tmp) !== path.resolve(os.tmpdir()) || !path.basename(tmp).startsWith("campus-feedback-test-")) {
    throw new Error("Unerwarteter temporärer Testpfad.");
  }
  fs.rmSync(tmp, { recursive: true, force: true });
}
