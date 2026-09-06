import {
  checklistItemsUebergabe, createEmptyWorkCard, generateId, groupOrder,
  grundfunktionenLabels, normalizeSketches, proFinderLabels,
  rueckfahrkameraLabels, vehicleSketchViews
} from "./data-v1.js?v=1.3.0";
import { deleteCard, loadInitialCard, readHistory, writeCard } from "./storage-v1.js?v=1.3.0";
import { imageFileToDataUrl, prepareInkCanvas, prepareSignatureCanvas, startDictation } from "./media-v1.js?v=1.3.0";
import { renderPrintView } from "./print-v1.js?v=1.3.0";
import { fahrzeugListe, produktVarianten, istKontakt, pruefeArbeitskarte, pruefSignatur, pruefungBestaetigt } from "./konfigurator-check.js?v=1.3.0";

const $ = (selector, root = document) => root.querySelector(selector);
if (new URLSearchParams(location.search).get("demo") === "1") {
  document.querySelectorAll('a[href^="/quiz"], a[href^="/praxis/"]').forEach(a => { a.search = "?demo=1"; });
}
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const esc = (value) => String(value ?? "").replace(/[&<>'"]/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
}[character]));

let card = loadInitialCard();
let activeTab = "auftrag";
let triedSave = false;
let saveTimer = 0;
let toastTimer = 0;
let signaturePath = "";
let signaturePad = null;
const collapsedGroups = new Set();

function getPath(object, path) {
  return String(path).split(".").reduce((value, key) => value?.[key], object);
}

function setPath(object, path, value) {
  const keys = String(path).split(".");
  const last = keys.pop();
  const target = keys.reduce((current, key) => current[key], object);
  target[last] = value;
}

function toast(message) {
  const element = $("#toast");
  element.textContent = message;
  element.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { element.hidden = true; }, 3600);
}

function markChanged({ rerender = false } = {}) {
  if (card.status === "completed") {
    card.status = "draft";
    card.completedAt = null;
  }
  $("#save-state").textContent = "Änderungen werden gespeichert …";
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => saveCard(false), 450);
  if (rerender) renderDynamic();
  else updateStatus();
  renderKonfigurator();
}

function saveCard(withFeedback = true) {
  clearTimeout(saveTimer);
  try {
    card = writeCard(card);
    $("#save-state").textContent = `Lokal gespeichert · ${new Intl.DateTimeFormat("de-DE", { hour: "2-digit", minute: "2-digit" }).format(new Date())}`;
    renderPrintView(card, $("#print-view"));
    if (withFeedback) toast("Arbeitskarte wurde lokal gespeichert.");
  } catch (error) {
    console.error(error);
    $("#save-state").textContent = "Speichern fehlgeschlagen";
    toast("Der lokale Speicher ist voll. Bitte Fotos verkleinern und die Arbeitskarte als PDF sichern.");
  }
}

function pageStatus(page) {
  const f = card.formData;
  if (page === "auftrag") {
    const customer = f.kunde.name || f.kunde.firma;
    const installer = f.monteur.name;
    const order = f.orderType.einbau || f.orderType.nachruestung || f.orderType.service;
    if (customer && installer && order) return "complete";
    if (customer || installer || order) return "partial";
    return "empty";
  }
  if (page === "sichtkontrolle") {
    const photo = Object.values(f.vorschadenFotos || {}).some(Boolean);
    const checked = Object.values(f.checklistGrundfunktionen || {}).some(Boolean);
    if (photo && checked) return "complete";
    if (photo || checked) return "partial";
    return "empty";
  }
  if (page === "material") return card.materials.some((item) => item.verbaut) ? "complete" : "empty";
  const signed = Boolean(f.uebergabe.unterschriftKunde);
  const any = checklistItemsUebergabe.some((item) => Boolean(f.uebergabe[item.key]));
  if (signed) return "complete";
  if (any || f.uebergabe.ort) return "partial";
  return "empty";
}

function updateStatus() {
  const pages = ["auftrag", "sichtkontrolle", "material", "uebergabe"];
  const labels = { empty: "leer", partial: "teilweise ausgefüllt", complete: "vollständig" };
  const score = pages.reduce((sum, page) => sum + (pageStatus(page) === "complete" ? 25 : pageStatus(page) === "partial" ? 12.5 : 0), 0);
  pages.forEach((page) => {
    const status = pageStatus(page);
    const icon = $(`[data-status-for="${page}"]`);
    icon.dataset.status = status;
    const tab = $(`[data-tab="${page}"]`);
    const base = tab.textContent.replace(/\s+/g, " ").trim();
    tab.setAttribute("aria-label", `${base}: ${labels[status]}`);
  });
  $("#progress-label").textContent = `${score} %`;
  $("#progress-fill").style.width = `${score}%`;
  $("#progress-track").setAttribute("aria-valuenow", String(score));
  $("#card-state-label").textContent = card.status === "completed" ? "Abgeschlossen" : "In Arbeit";
  $(".ak-card-state").classList.toggle("is-completed", card.status === "completed");
  $("#material-installed-count").textContent = String(card.materials.filter((item) => item.verbaut).length);
  $("#handoff-count").textContent = `${checklistItemsUebergabe.filter((item) => card.formData.uebergabe[item.key]).length} / ${checklistItemsUebergabe.length}`;
}

function missingRequired({ includeHandoff = false } = {}) {
  const f = card.formData;
  const missing = [];
  if (!(f.orderType.einbau || f.orderType.nachruestung || f.orderType.service)) missing.push({ id: "order-type-group", label: "Auftragsart" });
  if (!f.kunde.name.trim()) missing.push({ id: "kunde-name", label: "Kundenname" });
  if (!f.monteur.name.trim()) missing.push({ id: "monteur-name", label: "Monteur-Name" });
  if (includeHandoff && !f.uebergabe.unterschriftKunde) missing.push({ id: "uebergabe-heading", label: "Kundenunterschrift bei der Übergabe" });
  return missing;
}

function showValidation({ includeHandoff = false, focus = false } = {}) {
  const missing = missingRequired({ includeHandoff });
  const orderInvalid = missing.some((item) => item.id === "order-type-group");
  $("#order-type-group").classList.toggle("is-invalid", triedSave && orderInvalid);
  $("#error-order-type").hidden = !(triedSave && orderInvalid);
  [["#kunde-name","#error-kunde-name","kunde-name"],["#monteur-name","#error-monteur-name","monteur-name"]].forEach(([field,error,id]) => {
    const invalid = triedSave && missing.some((item) => item.id === id);
    $(field).setAttribute("aria-invalid", String(invalid));
    $(error).hidden = !invalid;
  });
  const summary = $("#error-summary");
  if (triedSave && missing.length) {
    summary.innerHTML = `<strong>Bitte noch prüfen:</strong><ul>${missing.map((item) => `<li><a href="#${item.id}">${esc(item.label)}</a></li>`).join("")}</ul>`;
    summary.hidden = false;
    if (focus) summary.focus();
  } else summary.hidden = true;
  return missing;
}

function fillInputs() {
  $$('[data-path]').forEach((input) => {
    const value = getPath(card.formData, input.dataset.path);
    if (input.type === "checkbox") input.checked = Boolean(value);
    else input.value = value ?? "";
  });
  $("input[name='tacho-fehler'][value='ja']").checked = Boolean(card.formData.tachoFehler.ja);
  $("input[name='tacho-fehler'][value='nein']").checked = Boolean(card.formData.tachoFehler.nein);
}

function switchTab(page) {
  activeTab = page;
  $$(".ak-tab").forEach((tab) => {
    const selected = tab.dataset.tab === page;
    tab.classList.toggle("is-active", selected);
    tab.setAttribute("aria-selected", String(selected));
  });
  $$(".ak-page").forEach((panel) => { panel.hidden = panel.dataset.page !== page; });
  $("#arbeitskarte-main").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
}

function renderSketches() {
  const root = $("#sketch-grid");
  root.innerHTML = vehicleSketchViews.map((view) => `
    <figure class="ak-sketch-card ${card.sketches[view.key] ? "has-drawing" : ""}">
      <div class="ak-sketch-stage"><img src="${view.backgroundSrc}" alt="Wohnmobil, Ansicht ${esc(view.label)}" width="1536" height="1024"><canvas data-sketch="${view.key}" aria-label="Skizzenfläche ${esc(view.label)}"></canvas></div>
      <figcaption><span>${esc(view.label)}<small>${card.sketches[view.key] ? "Markierung vorhanden" : "Noch ohne Markierung"}</small></span><button type="button" class="ak-mini-button" data-clear-sketch="${view.key}">Leeren</button></figcaption>
    </figure>`).join("");
  vehicleSketchViews.forEach((view) => {
    const canvas = $(`[data-sketch="${view.key}"]`, root);
    const clear = prepareInkCanvas(canvas, card.sketches[view.key], (value) => {
      card.sketches[view.key] = value;
      markChanged();
    });
    $(`[data-clear-sketch="${view.key}"]`, root).addEventListener("click", clear);
  });
}

function renderPhotos() {
  const views = [["fahrerseite","Fahrerseite"],["beifahrerseite","Beifahrerseite"],["front","Front"],["heck","Heck"]];
  const root = $("#photo-grid");
  root.innerHTML = views.map(([key,label]) => {
    const image = card.formData.vorschadenFotos[key];
    return `<figure class="ak-photo-card"><div class="ak-photo-preview">${image ? `<img src="${esc(image)}" alt="Vorschaden, Ansicht ${esc(label)}">` : "Noch kein Foto"}</div><figcaption>${esc(label)}</figcaption><div class="ak-photo-controls"><label>${image ? "Foto ersetzen" : "Foto aufnehmen"}<input type="file" accept="image/*" capture="environment" data-photo="${key}"></label>${image ? `<button type="button" class="ak-button ak-button--danger" data-clear-photo="${key}">Entfernen</button>` : ""}</div></figure>`;
  }).join("");
  $$('[data-photo]', root).forEach((input) => input.addEventListener("change", async () => {
    const file = input.files?.[0];
    if (!file) return;
    input.disabled = true;
    try {
      card.formData.vorschadenFotos[input.dataset.photo] = await imageFileToDataUrl(file, { maxWidth: 1200, maxHeight: 900, quality: .76 });
      markChanged();
      renderPhotos();
      updateStatus();
    } catch (error) { toast(error.message); }
  }));
  $$('[data-clear-photo]', root).forEach((button) => button.addEventListener("click", () => {
    delete card.formData.vorschadenFotos[button.dataset.clearPhoto];
    markChanged();
    renderPhotos();
  }));
}

function checkTile(path, label, description = "") {
  return `<label class="ak-check-tile"><input type="checkbox" data-dynamic-path="${path}" ${getPath(card.formData, path) ? "checked" : ""}><span><b>${esc(label)}</b>${description ? `<small>${esc(description)}</small>` : ""}</span></label>`;
}

function bindDynamicChecks(root = document) {
  $$('[data-dynamic-path]', root).forEach((input) => input.addEventListener("change", () => {
    setPath(card.formData, input.dataset.dynamicPath, input.checked);
    markChanged();
    updateStatus();
  }));
}

function renderInspectionChecks() {
  const groups = [
    ["Grundfunktionen", "checklistGrundfunktionen", grundfunktionenLabels],
    ["Pro-Finder-Alarme", "checklistProFinder", proFinderLabels],
    ["Rückfahrkamera", "checklistRueckfahrkamera", rueckfahrkameraLabels]
  ];
  const root = $("#inspection-checklists");
  root.innerHTML = groups.map(([title,path,labels]) => `<article class="ak-section"><header><h3>${esc(title)}</h3></header>${Object.entries(labels).map(([key,label]) => checkTile(`${path}.${key}`, label)).join("")}</article>`).join("");
  bindDynamicChecks(root);
}

function signatureCard(path, title) {
  const value = getPath(card.formData, path);
  return `<article class="ak-signature"><h4>${esc(title)}</h4><div class="ak-signature-preview">${value ? `<img src="${esc(value)}" alt="Erfasste ${esc(title)}">` : "Noch nicht unterschrieben"}</div><div class="ak-signature-actions"><button type="button" class="ak-button ak-button--quiet" data-signature="${path}" data-title="${esc(title)}">${value ? "Neu" : "Unterschreiben"}</button>${value ? `<button type="button" class="ak-button ak-button--danger" data-clear-signature="${path}">Leeren</button>` : ""}</div></article>`;
}

function renderSignatures() {
  $("#inspection-signatures").innerHTML = signatureCard("unterschriftMonteur", "Unterschrift Monteur") + signatureCard("unterschriftKunde", "Unterschrift Kunde");
  $("#handoff-signatures").innerHTML = signatureCard("unterschriftMonteur", "Monteur") + signatureCard("unterschriftKunde", "Kunde (Sichtkontrolle)") + signatureCard("uebergabe.unterschriftKunde", "Kunde (Übergabe)");
  $$('[data-signature]').forEach((button) => button.addEventListener("click", () => openSignature(button.dataset.signature, button.dataset.title)));
  $$('[data-clear-signature]').forEach((button) => button.addEventListener("click", () => {
    setPath(card.formData, button.dataset.clearSignature, "");
    markChanged();
    renderSignatures();
    updateStatus();
  }));
}

function openSignature(path, title) {
  signaturePath = path;
  $("#signature-title").textContent = title;
  const dialog = $("#signature-dialog");
  dialog.showModal();
  requestAnimationFrame(() => { signaturePad = prepareSignatureCanvas($("#signature-canvas"), getPath(card.formData, path)); });
}

function renderHandoff() {
  const root = $("#handoff-checklist");
  root.innerHTML = checklistItemsUebergabe.map((item) => checkTile(`uebergabe.${item.key}`, item.label)).join("");
  bindDynamicChecks(root);
}

function updateMaterial(id, updates, rerender = false) {
  card.materials = card.materials.map((item) => item.id === id ? { ...item, ...updates } : item);
  markChanged();
  if (rerender) renderMaterials();
}

function renderKonfigurator() {
  const result = pruefeArbeitskarte(card);
  const offen = result.hinweise.filter(h => h.typ === "pruefen").length;
  const bestaetigt = pruefungBestaetigt(card);
  $("#konfigurator-ergebnis").innerHTML = `${result.vehicle ? `<p><b>Gewähltes Fahrzeug:</b> ${esc(result.vehicle)}</p>` : ""}<p class="ak-check-status"><strong>${!result.aktiv ? "Noch keine Teile zur Prüfung markiert." : offen ? `${offen} ${offen === 1 ? "Punkt" : "Punkte"} fachlich prüfen${bestaetigt ? " · Prüfvermerk aktuell" : ""}` : "Keine offenen Prüfpunkte im erfassten Konfiguratorumfang."}</strong></p>${result.hinweise.length ? `<ul class="ak-check-results">${result.hinweise.map(h => `<li class="ak-check-result ak-check-result--${h.typ}"><strong>${h.typ === "pruefen" ? "Prüfen" : "Hinweis"}</strong><span>${esc(h.text)}</span></li>`).join("")}</ul>` : ""}`;
}

function materialOptionen(item) {
  if (/^WiPro III(?: safe\.lock)?$/.test(item.artikel)) {
    return `<label class="ak-material-detail">Artikelvariante<select data-material-variant><option value="">Bitte auswählen</option>${produktVarianten(item, card.formData.konfigurator.fahrzeugId).map(p => `<option value="${p.id}" ${String(p.id) === item.konfiguratorProdukt ? "selected" : ""}>${esc(p.itemNumber)} · ${esc(p.title)}</option>`).join("")}</select></label>`;
  }
  return istKontakt(item) ? `<label class="ak-material-detail">Davon Garagenklappe<input type="number" min="0" max="${item.menge}" value="${item.garagenMenge || 0}" data-material-garage></label>` : "";
}

function renderMaterials() {
  const query = $("#material-search").value.trim().toLocaleLowerCase("de");
  const filtered = card.materials.filter((item) => [item.artikel,item.artNr,item.gruppe].some((value) => String(value).toLocaleLowerCase("de").includes(query)));
  const foundGroups = [...groupOrder.filter((group) => filtered.some((item) => item.gruppe === group)), ...new Set(filtered.map((item) => item.gruppe).filter((group) => !groupOrder.includes(group)))];
  const root = $("#material-groups");
  root.innerHTML = foundGroups.length ? foundGroups.map((group) => {
    const items = filtered.filter((item) => item.gruppe === group);
    const count = items.filter((item) => item.verbaut).length;
    return `<details class="ak-material-group" data-material-group="${esc(group)}" ${collapsedGroups.has(group) ? "" : "open"}><summary><span><strong>${esc(group)}</strong><small> · ${items.length} Artikel</small></span><span>${count} verbaut</span></summary><div class="ak-material-list">${items.map((item) => `<div class="ak-material-row" data-material-id="${esc(item.id)}"><div class="ak-material-name"><strong>${esc(item.artikel)}</strong><small class="ak-mono">${esc(item.artNr || "ohne Artikelnummer")}</small></div><input type="number" min="1" value="${esc(item.menge)}" aria-label="Menge ${esc(item.artikel)}" data-material-count><button type="button" class="ak-installed" aria-pressed="${item.verbaut}" data-material-installed>${item.verbaut ? "Verbaut" : "Offen"}</button><input value="${esc(item.notiz)}" aria-label="Notiz ${esc(item.artikel)}" placeholder="Notiz" data-material-note><button type="button" class="ak-delete-material" aria-label="${esc(item.artikel)} entfernen" data-material-delete>×</button></div>`).join("")}</div></details>`;
  }).join("") : `<div class="ak-section ak-empty">Keine passende Materialposition gefunden.</div>`;
  $$('[data-material-group]', root).forEach((details) => details.addEventListener("toggle", () => {
    if (details.open) collapsedGroups.delete(details.dataset.materialGroup);
    else collapsedGroups.add(details.dataset.materialGroup);
  }));
  $$('[data-material-id]', root).forEach((row) => {
    const id = row.dataset.materialId;
    const item = card.materials.find(i => i.id === id);
    $('.ak-material-name', row).insertAdjacentHTML("beforeend", materialOptionen(item));
    $('[data-material-installed]', row).insertAdjacentHTML("beforebegin", `<button type="button" class="ak-installed ak-planned" aria-pressed="${Boolean(item.geplant)}" data-material-planned>Geplant</button>`);
    $('[data-material-planned]', row).addEventListener("click", () => updateMaterial(id, { geplant: !item.geplant }, true));
    $('[data-material-variant]', row)?.addEventListener("change", event => {
      const product = produktVarianten(item, card.formData.konfigurator.fahrzeugId).find(p => p.id === Number(event.target.value));
      updateMaterial(id, { konfiguratorProdukt: event.target.value, artNr: product?.itemNumber || "" }, true);
    });
    $('[data-material-garage]', row)?.addEventListener("change", event => updateMaterial(id, { garagenMenge: Math.min(item.menge, Math.max(0, Number.parseInt(event.target.value, 10) || 0)) }, true));
    $('[data-material-count]', row).addEventListener("change", (event) => {
      const menge = Math.max(1, Number.parseInt(event.target.value, 10) || 1);
      updateMaterial(id, { menge, garagenMenge: Math.min(item.garagenMenge || 0, menge) }, true);
    });
    $('[data-material-note]', row).addEventListener("input", (event) => updateMaterial(id, { notiz: event.target.value }));
    $('[data-material-installed]', row).addEventListener("click", (event) => updateMaterial(id, { verbaut: event.currentTarget.getAttribute("aria-pressed") !== "true" }, true));
    $('[data-material-delete]', row).addEventListener("click", () => {
      if (!confirm("Diese Materialposition aus der Karte entfernen?")) return;
      card.materials = card.materials.filter((item) => item.id !== id);
      markChanged();
      renderMaterials();
      updateStatus();
    });
  });
  updateStatus();
  renderKonfigurator();
}

function renderDynamic() {
  fillInputs();
  renderSketches();
  renderPhotos();
  renderInspectionChecks();
  renderSignatures();
  renderHandoff();
  renderMaterials();
  showValidation();
  updateStatus();
  renderPrintView(card, $("#print-view"));
}

function renderHistory() {
  const query = $("#history-search").value.trim().toLocaleLowerCase("de");
  const history = readHistory().filter((item) => [item.formData.kunde.name,item.formData.kunde.firma,item.formData.kunde.kennzeichen,item.formData.kunde.fahrzeugtyp,item.formData.monteur.name].some((value) => String(value || "").toLocaleLowerCase("de").includes(query)));
  const root = $("#history-list");
  root.innerHTML = history.length ? history.map((item) => {
    const customer = item.formData.kunde.name || item.formData.kunde.firma || "Ohne Kundenname";
    const meta = [item.formData.kunde.kennzeichen, item.formData.kunde.fahrzeugtyp, new Intl.DateTimeFormat("de-DE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(item.updatedAt))].filter(Boolean).join(" · ");
    return `<article class="ak-history-card"><div><strong>${esc(customer)}</strong><p>${esc(meta)}</p><span class="ak-history-status ${item.status === "completed" ? "is-completed" : ""}">${item.status === "completed" ? "Abgeschlossen" : "In Arbeit"}</span></div><div class="ak-history-actions"><button type="button" class="ak-button ak-button--quiet" data-open-card="${esc(item.id)}">Öffnen</button><button type="button" class="ak-button ak-button--danger" data-delete-card="${esc(item.id)}">Löschen</button></div></article>`;
  }).join("") : `<p class="ak-empty">Keine Arbeitskarte gefunden.</p>`;
  $$('[data-open-card]', root).forEach((button) => button.addEventListener("click", () => {
    const selected = readHistory().find((item) => item.id === button.dataset.openCard);
    if (!selected) return;
    card = selected;
    triedSave = false;
    $("#history-dialog").close();
    switchTab("auftrag");
    renderDynamic();
    toast("Arbeitskarte geöffnet.");
  }));
  $$('[data-delete-card]', root).forEach((button) => button.addEventListener("click", () => {
    if (!confirm("Diese Arbeitskarte endgültig aus dem lokalen Verlauf löschen?")) return;
    deleteCard(button.dataset.deleteCard);
    if (card.id === button.dataset.deleteCard) {
      card = createEmptyWorkCard();
      saveCard(false);
      renderDynamic();
    }
    renderHistory();
  }));
}

function bindEvents() {
  $$('.ak-tab').forEach((tab) => tab.addEventListener("click", () => switchTab(tab.dataset.tab)));
  $$('[data-path]').forEach((input) => input.addEventListener(input.type === "checkbox" || input.tagName === "SELECT" ? "change" : "input", () => {
    if (input.dataset.uppercase !== undefined) input.value = input.value.toUpperCase();
    setPath(card.formData, input.dataset.path, input.type === "checkbox" ? input.checked : input.value);
    if (input.dataset.path === "konfigurator.pruefvermerk") card.formData.konfigurator.pruefstand = pruefSignatur(card);
    markChanged();
    if (input.dataset.path === "konfigurator.fahrzeugId") renderMaterials();
    if (triedSave) showValidation();
  }));
  $$('input[name="tacho-fehler"]').forEach((input) => input.addEventListener("change", () => {
    card.formData.tachoFehler.ja = input.value === "ja";
    card.formData.tachoFehler.nein = input.value === "nein";
    markChanged();
  }));
  $$('[data-dictate]').forEach((button) => {
    if (!(window.SpeechRecognition || window.webkitSpeechRecognition)) { button.hidden = true; return; }
    button.addEventListener("click", () => {
      const textarea = $(`#${button.dataset.dictate}`);
      startDictation(textarea, button, (value) => {
        setPath(card.formData, textarea.dataset.path, value);
        markChanged();
      });
    });
  });
  $("#material-search").addEventListener("input", renderMaterials);
  $("#material-add-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const name = $("#new-material-name").value.trim();
    if (!name) return;
    card.materials.push({ id: generateId(), gruppe: $("#new-material-group").value || "Sonstiges", artikel: name, artNr: $("#new-material-number").value.trim(), menge: Math.max(1, Number.parseInt($("#new-material-count").value, 10) || 1), verbaut: false, notiz: $("#new-material-note").value.trim() });
    event.currentTarget.reset();
    $("#new-material-count").value = "1";
    markChanged();
    renderMaterials();
    toast("Eigene Materialposition hinzugefügt.");
  });
  $("#signature-clear").addEventListener("click", () => signaturePad?.clear());
  $("#signature-save").addEventListener("click", () => {
    const value = signaturePad?.value();
    if (!value) { toast("Bitte zuerst im Feld unterschreiben."); return; }
    setPath(card.formData, signaturePath, value);
    $("#signature-dialog").close();
    markChanged();
    renderSignatures();
    updateStatus();
  });
  $("#btn-save").addEventListener("click", () => {
    triedSave = true;
    showValidation({ focus: missingRequired().length > 0 });
    saveCard(true);
  });
  $("#btn-export").addEventListener("click", () => {
    triedSave = true;
    const missing = showValidation({ focus: true });
    if (missing.length && !confirm(`Folgende Pflichtangaben fehlen:\n\n• ${missing.map((item) => item.label).join("\n• ")}\n\nTrotzdem exportieren?`)) return;
    saveCard(false);
    renderPrintView(card, $("#print-view"));
    const previousTitle = document.title;
    const plate = String(card.formData.kunde.kennzeichen || "OHNE-KZ").trim().replace(/\s+/g, "-").toUpperCase();
    document.title = `Arbeitskarte_${plate || "OHNE-KZ"}_${new Date().toISOString().slice(0, 10)}`;
    window.addEventListener("afterprint", () => { document.title = previousTitle; }, { once: true });
    window.print();
    toast("Im Druckdialog bitte „Als PDF speichern“ wählen.");
  });
  $("#btn-new").addEventListener("click", () => {
    saveCard(false);
    card = createEmptyWorkCard();
    triedSave = false;
    saveCard(false);
    switchTab("auftrag");
    renderDynamic();
    toast("Neue Arbeitskarte angelegt.");
  });
  $("#btn-reset").addEventListener("click", () => {
    if (!confirm("Die aktive Arbeitskarte vollständig zurücksetzen? Andere Karten im Verlauf bleiben erhalten.")) return;
    deleteCard(card.id);
    card = createEmptyWorkCard();
    triedSave = false;
    saveCard(false);
    switchTab("auftrag");
    renderDynamic();
    toast("Arbeitskarte wurde zurückgesetzt.");
  });
  $("#btn-history").addEventListener("click", () => {
    renderHistory();
    $("#history-dialog").showModal();
  });
  $("#history-search").addEventListener("input", renderHistory);
  $("#btn-finalize").addEventListener("click", () => {
    if (pruefeArbeitskarte(card).hinweise.some(h => h.typ === "pruefen") && !pruefungBestaetigt(card)) {
      switchTab("material");
      $("#konfigurator-heading").focus();
      toast("Bitte die offenen Materialpunkte klären oder die fachliche Prüfung im Prüfvermerk dokumentieren.");
      return;
    }
    triedSave = true;
    const missing = showValidation({ includeHandoff: true, focus: true });
    if (missing.length) {
      if (missing.some((item) => item.id !== "uebergabe-heading")) switchTab("auftrag");
      else switchTab("uebergabe");
      return;
    }
    card.status = "completed";
    card.completedAt = card.completedAt || new Date().toISOString();
    saveCard(false);
    updateStatus();
    toast("Arbeitskarte ist abgeschlossen.");
  });
  addEventListener("beforeunload", () => { if (saveTimer) saveCard(false); });
}

function start() {
  $("#konfigurator-fahrzeug").innerHTML = `<option value="">Fahrzeug wählen / noch nicht zugeordnet</option>${fahrzeugListe.map(v => `<option value="${v.id}">${esc(v.label)}</option>`).join("")}`;
  const now = new Date();
  $("#current-date").textContent = new Intl.DateTimeFormat("de-DE", { dateStyle: "full" }).format(now);
  $("#current-time").textContent = `${new Intl.DateTimeFormat("de-DE", { hour: "2-digit", minute: "2-digit" }).format(now)} Uhr`;
  $("#new-material-group").innerHTML = groupOrder.map((group) => `<option>${esc(group)}</option>`).join("");
  bindEvents();
  renderDynamic();
  saveCard(false);
}

start();
