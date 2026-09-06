import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  checklistItemsUebergabe, createEmptyWorkCard, initialMaterials,
  normalizeSketches, normalizeWorkCard, vehicleSketchViews
} from "../public/arbeitskarte/assets/data-v1.js";
import { loadInitialCard, readHistory, writeCard } from "../public/arbeitskarte/assets/storage-v1.js";
import { daten, fahrzeugListe, pruefeArbeitskarte, pruefSignatur, pruefungBestaetigt } from "../public/arbeitskarte/assets/konfigurator-check.js";

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

/* Nach Entfernung des alten Netzteils ergänzt der Materialabgleich die
   Zusatzhupe und den separaten Sensor für die ältere G.A.S.-pro. */
check("49 Materialpositionen einschließlich Zusatzhupe und G.A.S.-pro-Sensor übernommen", initialMaterials.length === 49);
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

/* Jede Datei unter /arbeitskarte/assets/ wird ein Jahr lang `immutable`
   ausgeliefert (netlify.toml). Ein Modul-Import ohne ?v=-Marke holt dann
   auf jedem Gerät, das die Arbeitskarte schon einmal offen hatte, für ein
   Jahr die alte Datei — auch wenn auf dem Server längst eine neue liegt.
   Genau das ist im September 2026 passiert: data-v1.js zeigte in der
   alten Fassung auf vier PNG, die es nach dem Umstieg auf WebP nicht mehr
   gab, und die Fahrzeugansichten waren auf allen bekannten Geräten leer.
   Deshalb: eine Fassung in index.html, und jeder relative Import in den
   Modulen trägt dieselbe. Wer eine Datei der Arbeitskarte ändert, zählt
   die Fassung hoch — an allen Stellen, sonst fällt diese Prüfung. */
const fassung = (html.match(/app-v1\.js\?v=([0-9][0-9.]*)"/) || [])[1];
check("Arbeitskarte trägt eine Fassung an app-v1.js", Boolean(fassung));
check("Stylesheet der Arbeitskarte trägt dieselbe Fassung", html.includes(`arbeitskarte-v1.css?v=${fassung}"`));
const assetDir = path.join(publicDir, "arbeitskarte/assets");
for (const datei of fs.readdirSync(assetDir).filter((name) => name.endsWith(".js"))) {
  const quelle = fs.readFileSync(path.join(assetDir, datei), "utf8");
  const importe = [...quelle.matchAll(/from\s+"(\.\/[^"]+)"/g)].map((treffer) => treffer[1]);
  check(`${datei}: alle ${importe.length} relativen Importe tragen ?v=${fassung}`,
    importe.every((pfad) => pfad.endsWith(`?v=${fassung}`)));
}

function scenario(vehicleId, rows) {
  const c = createEmptyWorkCard();
  c.formData.konfigurator.fahrzeugId = String(vehicleId || "");
  c.materials = rows.map(([artNr, menge = 1, extra = {}], index) => ({ id: String(index), artNr, artikel: daten.products.find(p => p.itemNumber === artNr)?.title || daten.accessories.find(a => a.itemNumber === artNr)?.title || artNr, menge, geplant: true, verbaut: false, ...extra }));
  return c;
}
const ids = c => pruefeArbeitskarte(c).hinweise.map(h => h.id);
check("Exakter geprüfter Datenstand eingebunden", daten.md5 === "827e235c49b9c9565639b3631535767f" && fahrzeugListe.length === 176);
check("Unmarkierter Katalog löst keine Regeln aus", !pruefeArbeitskarte(createEmptyWorkCard()).aktiv);
check("Unbekanntes Fahrzeug bleibt ungeprüft", ids(scenario(null, [["100699"]])).includes("fahrzeug"));
check("Sprinter bis 2006 benötigt Zusatzsirene", ids(scenario(43, [["100754",1,{konfiguratorProdukt:"1"}]])).includes("regel-34"));
check("Sprinter ab 2006 benötigt Hupe und Abschaltung gleichzeitig", ["regel-33","regel-95"].every(id => ids(scenario(44, [["100753",1,{konfiguratorProdukt:"52"}],["100699"]])).includes(id)));
check("Sprinter safe.lock greift über exakte Produktvariante", ids(scenario(654, [["105458",1,{konfiguratorProdukt:"151"}]])).includes("regel-203"));
check("Vorhandene Zusatzhupe löst Pflichtpunkt", !ids(scenario(654, [["105458",1,{konfiguratorProdukt:"151"}],["105339"]])).includes("regel-203"));
check("Ducato 2024 erhält mehrpolige statt einpolige Abschaltung", ids(scenario(987, [["100699"]])).includes("regel-217") && !ids(scenario(987, [["100699"]])).includes("regel-95"));
check("Ausgeblendete Umrüstplatine wird gemeldet", ids(scenario(987, [["101052"]])).includes("hidden-3"));
check("Nicht angebotene WiPro-Variante wird gemeldet", ids(scenario(43, [["105458",1,{konfiguratorProdukt:"151"}]])).includes("produkt-151"));
check("Eine Sirene ist keine zweite Sirene", !ids(scenario(43, [["100089"]])).includes("regel-3"));
check("Zwei Sirenen gleicher Art werden geprüft", ids(scenario(43, [["100089",2]])).includes("regel-3"));
check("Gegenseitiger Sirenenausschluss unabhängig von Reihenfolge", ids(scenario(43, [["100089"],["100190"]])).includes("regel-1"));
for (const [kontakte, sets] of [[1,1],[2,1],[3,2],[4,2]]) {
  const c = scenario(43, [["100758",kontakte,{garagenMenge:kontakte}]]);
  check(`${kontakte} Garagenkontakte benötigen ${sets} Set(s)`, pruefeArbeitskarte(c).hinweise.some(h => h.id === "adapter-11" && h.text.includes(`${sets} ×`)));
  c.materials.push({id:"adapter",artNr:"100729",artikel:"Adapter",menge:sets,verbaut:true});
  check(`${sets} weiße Set(s) lösen Bedarf für ${kontakte} Kontakte`, !ids(c).includes("adapter-11"));
}
check("Normale Kontakte erzwingen keinen Garagenadapter", !ids(scenario(43, [["100758",3]])).includes("adapter-11"));
check("Falsche Adapterfarbe erfüllt Bedarf nicht", ids(scenario(43, [["100758",3,{garagenMenge:3}],["100428",2]])).includes("adapter-11"));
check("G.A.S.-pro III Sensorlimit über gemischte Sensoren", ids(scenario(43, [["101286"],["101289"],["100433"]])).includes("sensorlimit"));
check("G.A.S.-connect-Konflikt ohne Duplikat", ids(scenario(43, [["101286"],["105750"]])).includes("regel-11") && !ids(scenario(43, [["101286"],["105750"]])).includes("regel-258"));
check("T.S.A.-Empfehlung bleibt optional", pruefeArbeitskarte(scenario(43, [["105753"]])).hinweise.some(h => h.id === "regel-221" && h.typ === "info"));
const reviewed = scenario(44, [["100699"]]);
reviewed.formData.konfigurator.pruefvermerk = "Ausstattung geprüft";
reviewed.formData.konfigurator.pruefstand = pruefSignatur(reviewed);
check("Fachlicher Vermerk gilt für aktuellen Stand", pruefungBestaetigt(reviewed));
reviewed.materials[0].menge = 2;
check("Materialänderung entwertet vorherigen Prüfvermerk", !pruefungBestaetigt(reviewed));
check("Neue Prüffelder überleben Speicherung", normalizeWorkCard(reviewed).formData.konfigurator.pruefvermerk === "Ausstattung geprüft" && normalizeWorkCard(reviewed).materials[0].geplant);
const legacy = normalizeWorkCard({version:1, materials:[{id:"44",artNr:"100699",artikel:"Pro-Finder",verbaut:true}]});
check("Altkarten erhalten fehlende Hupe ohne Verbaut-Markierung", legacy.materials.some(i=>i.artNr === "105339" && !i.verbaut) && legacy.version === 2);
const removed = normalizeWorkCard({...legacy, materials:legacy.materials.filter(i=>i.artNr !== "105339")});
check("Bewusst gelöschte neue Position bleibt gelöscht", !removed.materials.some(i=>i.artNr === "105339"));
console.log(`Arbeitskarte: ${checks.length} Prüfungen erfolgreich.`);
