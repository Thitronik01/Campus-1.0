import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  checklistItemsUebergabe, createEmptyWorkCard, initialMaterials,
  normalizeSketches, normalizeWorkCard, vehicleSketchViews
} from "../public/arbeitskarte/assets/data-v1.js";
import { loadInitialCard, readHistory, writeCard } from "../public/arbeitskarte/assets/storage-v1.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(here, "../public");

class MemoryStorage {
  data = new Map();
  get length() { return this.data.size; }
  key(index) { return [...this.data.keys()][index] ?? null; }
  getItem(key) { return this.data.has(key) ? this.data.get(key) : null; }
  setItem(key, value) { this.data.set(String(key), String(value)); }
  removeItem(key) { this.data.delete(String(key)); }
}

const checks = [];
function check(label, condition) {
  assert.ok(condition, label);
  checks.push(label);
}

check("48 produktive Materialpositionen übernommen", initialMaterials.length === 48);
check("NFC Modul kanonisch geschrieben", initialMaterials.some((item) => item.artikel === "NFC Modul" && item.artNr === "105299"));
check("Pro-Finder kanonisch geschrieben", initialMaterials.some((item) => item.artikel === "Pro-Finder" && item.artNr === "100699"));
check("13 Übergabepunkte übernommen", checklistItemsUebergabe.length === 13);
check("Vier Fahrzeugansichten definiert", vehicleSketchViews.length === 4);
check("Dach-Altdaten werden auf Front gemappt", normalizeSketches({ dach: "data:image/png;base64,ALT" }).front.endsWith("ALT"));

const storage = new MemoryStorage();
let card = createEmptyWorkCard("test-karte", "2026-08-28T10:00:00.000Z");
card.formData.kunde.name = "Testkunde";
card.formData.kunde.kennzeichen = "PLÖ AK 1";
card.formData.vorschadenFotos.front = "data:image/jpeg;base64,FOTO";
card.formData.unterschriftMonteur = "data:image/png;base64,SIGNATUR";
card.formData.uebergabe.unterschriftKunde = "data:image/png;base64,UEBERGABE";
card.sketches.front = "data:image/png;base64,SKIZZE";
card.materials[0].verbaut = true;
card.materials[0].notiz = "Testnotiz";
card = writeCard(card, storage);

const history = readHistory(storage);
check("Arbeitskarte wird in der lokalen Historie gespeichert", history.length === 1 && history[0].id === "test-karte");
const loaded = loadInitialCard(storage);
check("Reload erhält Kunden- und Fahrzeugdaten", loaded.formData.kunde.name === "Testkunde" && loaded.formData.kunde.kennzeichen === "PLÖ AK 1");
check("Reload erhält Fotos, Skizzen und Unterschriften", loaded.formData.vorschadenFotos.front.includes("FOTO") && loaded.sketches.front.includes("SKIZZE") && loaded.formData.uebergabe.unterschriftKunde.includes("UEBERGABE"));
check("Reload erhält alle Materialien und Verbaut-Status", loaded.materials.length === 48 && loaded.materials[0].verbaut && loaded.materials[0].notiz === "Testnotiz");

const imported = normalizeWorkCard({
  formData: { kunde: { name: "Import" }, uebergabe: { datum: "2026-08-28" } },
  materials: [{ id: 1, gruppe: "Zubehör", artikel: "NFC-Modul", artNr: "105299", menge: "2", verbaut: true }],
  sketches: { dach: "data:image/png;base64,DACH" }
});
check("Import ergänzt fehlende Formularfelder robust", imported.formData.monteur.name === "" && imported.formData.kunde.name === "Import");
check("Import normalisiert Material und Terminologie", imported.materials[0].menge === 2 && imported.materials[0].artikel === "NFC Modul");
check("Import übernimmt den Front-Altdaten-Alias", imported.sketches.front.endsWith("DACH"));

const html = fs.readFileSync(path.join(publicDir, "arbeitskarte/index.html"), "utf8");
const storageSource = fs.readFileSync(path.join(publicDir, "arbeitskarte/assets/storage-v1.js"), "utf8");
for (const page of ["auftrag", "sichtkontrolle", "material", "uebergabe"]) {
  check(`Seite ${page} ist vorhanden`, html.includes(`data-page="${page}"`));
}
for (const view of vehicleSketchViews) {
  check(`Bild ${view.key} ist vorhanden`, fs.existsSync(path.join(publicDir, view.backgroundSrc)));
}
check("Druckansicht ist angebunden", html.includes('id="print-view"') && fs.existsSync(path.join(publicDir, "arbeitskarte/assets/print-v1.js")));
check("JSON-Import und -Export sind bedienbar", html.includes('id="btn-import"') && html.includes('id="btn-export"'));
check("JSON-Export enthält die komplette Karte", storageSource.includes("const payload = { ...card") && !storageSource.includes("materials.filter"));
check("Zurücksetzen ist bedienbar", html.includes('id="btn-reset"'));

console.log(`Arbeitskarte: ${checks.length} Prüfungen erfolgreich.`);
