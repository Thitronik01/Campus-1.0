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

/* 47 statt vormals 48: Das "Netzteil GBA-I 230 V" (100083) ist aus dem
   Angebot und im September 2026 aus dem Katalog genommen worden. Die Zahl
   steht hier, damit ein versehentliches Loeschen auffaellt — wer sie
   aendert, sollte wissen, welche Position warum entfallen ist. */
check("47 produktive Materialpositionen übernommen", initialMaterials.length === 47);
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
check("Reload erhält alle Materialien und Verbaut-Status", loaded.materials.length === initialMaterials.length && loaded.materials[0].verbaut && loaded.materials[0].notiz === "Testnotiz");

const imported = normalizeWorkCard({
  formData: { kunde: { name: "Import" }, uebergabe: { datum: "2026-08-28" } },
  materials: [{ id: 1, gruppe: "Zubehör", artikel: "NFC-Modul", artNr: "105299", menge: "2", verbaut: true }],
  sketches: { dach: "data:image/png;base64,DACH" }
});
check("Altdaten ergänzen fehlende Formularfelder robust", imported.formData.monteur.name === "" && imported.formData.kunde.name === "Import");
check("Altdaten normalisieren Material und Terminologie", imported.materials[0].menge === 2 && imported.materials[0].artikel === "NFC Modul");
check("Altdaten übernehmen den Front-Alias", imported.sketches.front.endsWith("DACH"));

const html = fs.readFileSync(path.join(publicDir, "arbeitskarte/index.html"), "utf8");
const storageSource = fs.readFileSync(path.join(publicDir, "arbeitskarte/assets/storage-v1.js"), "utf8");
const appSource = fs.readFileSync(path.join(publicDir, "arbeitskarte/assets/app-v1.js"), "utf8");
const printSource = fs.readFileSync(path.join(publicDir, "arbeitskarte/assets/print-v1.js"), "utf8");
for (const page of ["auftrag", "sichtkontrolle", "material", "uebergabe"]) {
  check(`Seite ${page} ist vorhanden`, html.includes(`data-page="${page}"`));
}
for (const view of vehicleSketchViews) {
  check(`Bild ${view.key} ist vorhanden`, fs.existsSync(path.join(publicDir, view.backgroundSrc)));
}
check("Druckansicht ist angebunden", html.includes('id="print-view"') && fs.existsSync(path.join(publicDir, "arbeitskarte/assets/print-v1.js")));
check("Arbeitskarte trägt die bereinigte Bezeichnung", html.includes("<h1>Arbeitskarte</h1>") && !html.includes("Arbeitskarte Digital") && !html.includes("v3.0"));
check("JSON-Import ist aus der Oberfläche entfernt", !html.includes('id="btn-import"') && !html.includes("application/json"));
check("PDF-Export ist bedienbar", html.includes('id="btn-export"') && html.includes("PDF exportieren") && appSource.includes("window.print()"));
check("JSON-Exportcode ist entfernt", !storageSource.includes("downloadCard") && !storageSource.includes("readImportedCard"));
check("PDF-Druckansicht verwendet THITRONIK CI", printSource.includes("THITRONIK Campus") && printSource.includes("Arbeitskarte") && printSource.includes("Seite ${page} von 4"));
check("Zurücksetzen ist bedienbar", html.includes('id="btn-reset"'));

console.log(`Arbeitskarte: ${checks.length} Prüfungen erfolgreich.`);
