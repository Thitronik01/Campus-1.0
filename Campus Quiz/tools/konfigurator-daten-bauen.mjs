import fs from "node:fs";
import crypto from "node:crypto";

// Bewusst nur nach einem geprüften Abruf aktualisieren, nicht bei jedem Build.
const raw = fs.readFileSync(process.argv[2]);
const data = JSON.parse(raw);
const pick = (row, keys) => Object.fromEntries(keys.filter(key => row[key] !== undefined).map(key => [key, row[key]]));
const snapshot = {
  stand: "2026-09-06", quelle: "https://www.thitronik.de/configuratorData.json",
  md5: crypto.createHash("md5").update(raw).digest("hex"),
  vehicleOptions: data.vehicleOptions.map(r => pick(r, ["id", "title", "parent_id", "hasSecurityIssues"])),
  products: data.products.map(r => pick(r, ["id", "itemNumber", "title", "solvesSecurityIssues"])),
  accessories: data.accessories.map(r => pick(r, ["id", "itemNumber", "title"])),
  ...Object.fromEntries(["vehicleOptionProduct_mm", "dependencies", "dependencyConditionVehicleOption_mm", "accessoryRequiredAccessory_mm", "accessoryHideVehicleOption_mm", "productSupplyAccessory_mm"].map(k => [k, data[k]]))
};
fs.writeFileSync(new URL("../public/arbeitskarte/assets/konfigurator-daten.js", import.meta.url), `// Geprüfter DE-Konfiguratorstand; erzeugt mit tools/konfigurator-daten-bauen.mjs.\nexport default ${JSON.stringify(snapshot)};\n`);
console.log(`Konfiguratorstand: ${snapshot.md5}, ${snapshot.dependencies.length} Regeln.`);
