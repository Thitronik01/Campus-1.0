import daten from "./konfigurator-daten.js?v=1.4.0";

export { daten };
const fahrzeuge = new Map(daten.vehicleOptions.map(v => [v.id, v]));
const produkte = new Map(daten.products.map(p => [p.id, p]));
const zubehoer = new Map(daten.accessories.map(a => [a.id, a]));
export function fahrzeugName(id) {
  const teile = [];
  const gesehen = new Set();
  for (let v = fahrzeuge.get(Number(id)); v && !gesehen.has(v.id); v = fahrzeuge.get(v.parent_id)) {
    gesehen.add(v.id); teile.unshift(v.title);
  }
  return teile.join(" · ");
}
export const fahrzeugListe = daten.vehicleOptions.filter(v => !daten.vehicleOptions.some(child => child.parent_id === v.id))
  .map(v => ({ id: v.id, label: fahrzeugName(v.id) })).sort((a,b) => a.label.localeCompare(b.label, "de"));
export function produktVarianten(item, vehicleId) {
  if (!/^WiPro III(?: safe\.lock)?$/.test(item.artikel)) return [];
  return daten.products.filter(p => p.title === item.artikel && (!vehicleId || p.id === Number(item.konfiguratorProdukt) ||
    daten.vehicleOptionProduct_mm.some(r => r.vehicleOption_id === Number(vehicleId) && r.product_id === p.id)));
}
export const istKontakt = item => ["100758", "100757"].includes(item.artNr);
export const pruefSignatur = card => JSON.stringify([daten.md5, card.formData.konfigurator?.fahrzeugId || "", card.materials.filter(i => i.verbaut || i.geplant).map(i => [i.id, i.artikel, i.artNr, i.menge, i.garagenMenge || 0, i.konfiguratorProdukt || "", Boolean(i.verbaut), Boolean(i.geplant)])]);
export const pruefungBestaetigt = card => Boolean(card.formData.konfigurator?.pruefvermerk.trim()) && card.formData.konfigurator.pruefstand === pruefSignatur(card);

export function pruefeArbeitskarte(card) {
  const k = card.formData.konfigurator || {};
  const vehicleId = Number(k.fahrzeugId);
  const vehicle = fahrzeugListe.find(v => v.id === vehicleId);
  const installed = card.materials.filter(i => i.verbaut || i.geplant);
  const p = new Map(), a = new Map(), hinweise = [];
  const materialIds = (productIds = [], accessoryIds = []) => installed.filter(item =>
    productIds.some(id => Number(item.konfiguratorProdukt) === id || produkte.get(id)?.itemNumber === item.artNr) ||
    accessoryIds.some(id => zubehoer.get(id)?.itemNumber === item.artNr)).map(item => item.id);
  const add = (id, typ, text, extra = {}) => { if (!hinweise.some(h => h.id === id)) hinweise.push({ id, typ, text, materialIds: installed.map(i => i.id), ...extra }); };
  const ergaenzung = (acc, zielmenge) => daten.accessoryHideVehicleOption_mm.some(r => r.vehicleOption_id === vehicleId && r.accessory_id === acc.id)
    ? {} : { ergaenzung: { artNr: acc.itemNumber, artikel: acc.title, zielmenge } };
  const count = (map, id) => map.get(id) || 0;
  const sum = (map, id, n) => map.set(id, count(map, id) + n);
  if (!installed.length) return { hinweise, vehicle: vehicle?.label || "", aktiv: false };
  if (!vehicle) add("fahrzeug", "pruefen", "Fahrzeug mit Aufbau und Baujahr auswählen. Fahrzeugabhängige Ergänzungen sind noch nicht geprüft.");
  for (const item of installed) {
    const n = Math.max(1, Number(item.menge) || 1);
    let matches = daten.products.filter(product => product.itemNumber === item.artNr && item.artNr);
    if (/^WiPro III(?: safe\.lock)?$/.test(item.artikel)) {
      const chosen = produkte.get(Number(item.konfiguratorProdukt));
      matches = chosen && chosen.title === item.artikel ? [chosen] : [];
      if (!matches.length) add(`variante-${item.id}`, "pruefen", `${item.artikel}: genaue Artikelvariante auswählen.`, { materialIds: [item.id] });
    } else if (matches.length > 1 && vehicle) {
      matches = matches.filter(product => daten.vehicleOptionProduct_mm.some(r => r.vehicleOption_id === vehicleId && r.product_id === product.id));
    }
    matches.forEach(product => sum(p, product.id, n));
    if (istKontakt(item)) {
      const garage = Math.min(n, Math.max(0, Number(item.garagenMenge) || 0));
      sum(a, item.artNr === "100758" ? 23 : 26, garage);
      sum(a, item.artNr === "100758" ? 22 : 25, n - garage);
      if (!garage) add(`kontakt-${item.artNr}`, "info", `${item.artikel}: bei Einsatz an Garagenklappen die Anzahl unter „Davon Garagenklappe“ eintragen, damit die Montageadapter berechnet werden.`);
    } else {
      const accessories = daten.accessories.filter(acc => acc.itemNumber === item.artNr && item.artNr);
      accessories.forEach(acc => sum(a, acc.id, n));
      if (!matches.length && !accessories.length && !/^WiPro III/.test(item.artikel)) add(`unbekannt-${item.id}`, "info", `${item.artikel}: im Konfiguratorstand nicht eindeutig zugeordnet; separat prüfen.`);
    }
  }
  if (vehicle) {
    for (const [id] of p) if (!daten.vehicleOptionProduct_mm.some(r => r.vehicleOption_id === vehicleId && r.product_id === id)) {
      const product = produkte.get(id);
      add(`produkt-${id}`, "pruefen", `${product.title} (${product.itemNumber}) wird für dieses Fahrzeug im Konfigurator nicht angeboten. Variante und Kompatibilität prüfen.`, { materialIds: materialIds([id]) });
    }
    for (const row of daten.accessoryHideVehicleOption_mm) if (row.vehicleOption_id === vehicleId && count(a, row.accessory_id)) {
      const acc = zubehoer.get(row.accessory_id);
      add(`hidden-${row.accessory_id}`, "pruefen", `${acc.title} (${acc.itemNumber}) ist für dieses Fahrzeug im Konfigurator ausgeblendet. Einsatz fachlich klären.`, { materialIds: materialIds([], [row.accessory_id]) });
    }
    let node = fahrzeuge.get(vehicleId), security = false;
    while (node) { security ||= Boolean(node.hasSecurityIssues); node = fahrzeuge.get(node.parent_id); }
    if (security && ![...p.keys()].some(id => produkte.get(id).solvesSecurityIssues)) add("replay", "pruefen", "Für dieses Fahrzeug ist im Konfigurator eine Sicherheitslücke durch Replay-Attacken vermerkt. Nur WiPro III safe.lock 101050 ist dort als Lösung gekennzeichnet; angebotene Variante und Fahrzeugschlüssel prüfen.");
  }
  // Der Warenkorb prüft nur beim Hinzufügen. Hier wird der gesamte aktuelle
  // Materialstand geprüft, einschließlich später entfernter Ergänzungen.
  for (const r of daten.dependencies) {
    if (r.id === 258 || !(r.triggerProductAdd_id || r.triggerAccessoryAdd_id)) continue;
    if (r.triggerProductAdd_id && !count(p, r.triggerProductAdd_id)) continue;
    if (r.triggerAccessoryAdd_id && !count(a, r.triggerAccessoryAdd_id)) continue;
    if (r.conditionProductInOrder_id && !count(p, r.conditionProductInOrder_id)) continue;
    if (r.conditionProductNotInOrder_id && count(p, r.conditionProductNotInOrder_id)) continue;
    if (r.conditionAccessoryInOrder_id && !count(a, r.conditionAccessoryInOrder_id)) continue;
    if (r.conditionAccessoryNotInOrder_id && count(a, r.conditionAccessoryNotInOrder_id)) continue;
    if (r.triggerAccessoryAdd_id && r.triggerAccessoryAdd_id === r.conditionAccessoryInOrder_id && count(a, r.triggerAccessoryAdd_id) < 2) continue;
    if (r.conditionVehicleOptionCount && (!vehicle || !daten.dependencyConditionVehicleOption_mm.some(row => row.dependency_id === r.id && row.conditionVehicleOption_id === vehicleId))) continue;
    const target = zubehoer.get(r.actionAccessoryAdd_id);
    if (target && count(a, target.id)) continue;
    let text = [r.triggerText, r.triggerActionText].filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
    if (target) text = `${r.actionRequired ? "Im Konfigurator verpflichtend" : "Empfehlung"}: ${target.title} (${target.itemNumber}) ergänzen. ${text}`;
    if (r.actionAccessoryRemove_id && r.actionAccessoryRemove_id !== r.triggerAccessoryAdd_id) {
      const trigger = produkte.get(r.triggerProductAdd_id) || zubehoer.get(r.triggerAccessoryAdd_id);
      text = `${trigger.title} zusammen mit ${zubehoer.get(r.actionAccessoryRemove_id).title}: Der Konfigurator entfernt diese Kombination. Bestückung prüfen. ${text}`;
    }
    add(`regel-${r.id}`, r.actionRequired || r.actionProductRemove_id || (r.actionAccessoryRemove_id && r.actionAccessoryRemove_id !== r.triggerAccessoryAdd_id) ? "pruefen" : "info", text, {
      materialIds: materialIds([r.triggerProductAdd_id, r.conditionProductInOrder_id].filter(Boolean), [r.triggerAccessoryAdd_id, r.conditionAccessoryInOrder_id].filter(Boolean)),
      ...(target ? ergaenzung(target, 1) : {})
    });
  }
  for (const r of daten.accessoryRequiredAccessory_mm) {
    const needed = Math.round(count(a, r.triggerAccessory_id) * r.quantity);
    if (needed > count(a, r.requiredAccessory_id)) {
      const acc = zubehoer.get(r.requiredAccessory_id);
      add(`adapter-${acc.id}`, "pruefen", `Für ${count(a, r.triggerAccessory_id)} Garagenkontakt(e): ${needed} × ${acc.title} (${acc.itemNumber}) erforderlich; ${count(a, acc.id)} Set(s) erfasst.`, { materialIds: materialIds([], [r.triggerAccessory_id, acc.id]), ...ergaenzung(acc, needed) });
    }
  }
  const gasIII = count(p, 56) + count(p, 57);
  if (gasIII && count(a, 13) + count(a, 15) > gasIII) add("sensorlimit", "pruefen", "G.A.S.-pro III / CO besitzt je Gerät einen externen Sensoreingang. Die erfasste Sensoranzahl überschreitet diese Zahl. Zuordnung zu weiteren Geräten gegebenenfalls dokumentieren.", { materialIds: materialIds([56,57], [13,15]) });
  for (const [id, n] of p) if (produkte.get(id).title.startsWith("WiPro III")) {
    add(`lieferumfang-${id}`, "info", `${n} × ${produkte.get(id).title}: laut Lieferumfang je 1 Funk-Handsender 868 und 1 schwarzer Funk-Magnetkontakt 868 enthalten. Gesamtmenge einschließlich Lieferumfang erfassen; nicht zusätzlich doppelt bestellen.`);
  }
  if (count(a, 232)) add("keyless", "pruefen", "Abschalteinrichtung mehrpolig: laut Konfigurator nicht mit Keyless Entry & Go kompatibel. Fahrzeugausstattung und aktuelle Einbauunterlagen prüfen.", { materialIds: materialIds([], [232]) });
  return { hinweise, vehicle: vehicle?.label || "", aktiv: true };
}
