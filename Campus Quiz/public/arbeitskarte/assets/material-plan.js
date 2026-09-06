import { pruefeArbeitskarte } from "./konfigurator-check.js?v=1.4.0";
import { initialMaterials, generateId } from "./data-v1.js?v=1.4.0";

export function ergaenzeMaterial(card, hinweisId) {
  // Hinweise können nach einem Fahrzeugwechsel oder Doppelklick veraltet sein.
  const ziel = pruefeArbeitskarte(card).hinweise.find(h => h.id === hinweisId)?.ergaenzung;
  if (!ziel) return null;
  const passend = card.materials.filter(i => i.artNr === ziel.artNr);
  const vorhanden = passend.filter(i => i.geplant || i.verbaut).reduce((n,i) => n + i.menge, 0);
  const fehlend = Math.max(0, ziel.zielmenge - vorhanden);
  if (!fehlend) return null;
  // Bereits bestätigten Einbau niemals nachträglich um eine Planmenge erhöhen.
  let item = passend.find(i => i.geplant && !i.verbaut) || passend.find(i => !i.verbaut);
  if (item) {
    item.menge = item.geplant ? item.menge + fehlend : fehlend;
    item.geplant = true;
  } else {
    const vorlage = initialMaterials.find(i => i.artNr === ziel.artNr);
    item = { ...(vorlage || { gruppe: "Zubehör", garagenMenge: 0, konfiguratorProdukt: "", notiz: "" }), id: generateId(), artikel: vorlage?.artikel || ziel.artikel, artNr: ziel.artNr, menge: fehlend, geplant: true, verbaut: false };
    card.materials.push(item);
  }
  return { id: item.id, artikel: item.artikel, hinzugefuegt: fehlend };
}

export function materialAnsicht(card, filter = "alle", query = "") {
  const hinweise = pruefeArbeitskarte(card).hinweise.filter(h => h.typ === "pruefen");
  const betroffen = new Set(hinweise.flatMap(h => h.materialIds));
  const counts = { alle: card.materials.length, geplant: card.materials.filter(i => i.geplant && !i.verbaut).length, verbaut: card.materials.filter(i => i.verbaut).length, pruefen: betroffen.size };
  const suche = query.trim().toLocaleLowerCase("de");
  const items = card.materials.filter(i => (filter === "alle" || filter === "geplant" && i.geplant && !i.verbaut || filter === "verbaut" && i.verbaut || filter === "pruefen" && betroffen.has(i.id)) &&
    [i.artikel, i.artNr, i.gruppe].some(value => String(value).toLocaleLowerCase("de").includes(suche)));
  return { items, counts, pruefpunkte: hinweise.length };
}
