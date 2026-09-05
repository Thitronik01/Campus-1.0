"use strict";

/* Das alte Netlify-Paket ist ebenfalls versioniert. Deshalb entsteht die
   ergänzte Auslieferung ausschließlich unter Campus Quiz/build/. */
const fs = require("fs");
const path = require("path");
const quelle = path.resolve(__dirname, "..");
const vorlage = path.resolve(quelle, "..", "Feedbackbogen", "netlify-v14");
const ziel = path.join(quelle, "build", "feedback-netlify");
if (!fs.existsSync(path.join(vorlage, "index.html"))) {
  throw new Error("Erst den Feedbackbogen mit seinen bestehenden Werkzeugen bauen.");
}
if (path.dirname(ziel) !== path.join(quelle, "build") || path.basename(ziel) !== "feedback-netlify") {
  throw new Error("Unerwartetes Bauziel.");
}
fs.rmSync(ziel, { recursive: true, force: true });
function kopieren(von, nach) {
  fs.mkdirSync(nach, { recursive: true });
  for (const eintrag of fs.readdirSync(von, { withFileTypes: true })) {
    if (eintrag.isDirectory()) kopieren(path.join(von, eintrag.name), path.join(nach, eintrag.name));
    else if (eintrag.isFile()) fs.copyFileSync(path.join(von, eintrag.name), path.join(nach, eintrag.name));
    else throw new Error("Unerwarteter Dateityp im Feedbackpaket.");
  }
}
kopieren(vorlage, ziel);
const engine = fs.readFileSync(path.join(quelle, "public", "assets", "engine.js"), "utf8");
const version = engine.match(/const ENGINE_VERSION = "([^"]+)"/)[1];
require("./feedback-einwilligung-bauen.js")(ziel, version);
// Einzelne Dateien kopieren: fs.cpSync scheitert hier an OneDrive-Ordnern
// unter Windows mit EIO, obwohl mkdir und copyFile zuverlässig funktionieren.
const datenschutzZiel = path.join(ziel, "datenschutz");
fs.mkdirSync(path.join(datenschutzZiel, "assets"), { recursive: true });
for (const datei of ["index.html", "assets/datenschutz-v1.css"]) {
  fs.copyFileSync(path.join(quelle, "public", "datenschutz", datei), path.join(datenschutzZiel, datei));
}
const headers = path.join(ziel, "_headers");
const regel = "/datenschutz/*\n  Cache-Control: no-cache\n";
const bisher = fs.readFileSync(headers, "utf8");
if (!bisher.includes("/datenschutz/*")) fs.appendFileSync(headers, "\n" + regel);
// Auf der separaten Site gibt es keine Quiz-Engine. Das Ziel stammt aus
// dem Betriebsprotokoll; Netlify erhält vorhandene Query-Parameter.
fs.writeFileSync(path.join(ziel, "_redirects"), "/quiz https://thitronik-campus.netlify.app/quiz 302\n");
const readme = path.join(ziel, "README.txt");
const grundtext = fs.readFileSync(readme, "utf8").split("\nCampus-Ergänzung ")[0];
fs.writeFileSync(readme, grundtext + `
Campus-Ergänzung ${version}
-------------------------
Dieser Build enthält den Einwilligungshaken und den Campus-Datenschutzhinweis.
Im statischen Pilotbetrieb stehen Zeitpunkt und Hinweisfassung im JSON-Payload
des Netlify-Formulars. Die Aufbewahrungsfrist für Forms wird nicht automatisch
durch Supabase durchgesetzt; Einträge müssen dort gesondert entfernt werden.
Nach einem erneuten Rohbau diesen Schritt wieder ausführen:
node "Campus Quiz/tools/feedback-paket-ergaenzen.js"
Ein vollständiger Campus-Bau mit tools/montag.js erledigt das automatisch.
`);
console.log("Feedback-Einzelpaket: build/feedback-netlify mit Einwilligung und Datenschutzhinweis erzeugt.");
