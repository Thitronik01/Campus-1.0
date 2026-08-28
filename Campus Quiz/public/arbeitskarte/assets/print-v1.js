import {
  checklistItemsUebergabe, groupOrder, grundfunktionenLabels,
  proFinderLabels, rueckfahrkameraLabels, vehicleSketchViews
} from "./data-v1.js";

const esc = (value) => String(value ?? "").replace(/[&<>'"]/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
}[character]));

function field(label, value) {
  return `<div class="ak-pr-field"><span>${esc(label)}</span><strong>${esc(value || "—")}</strong></div>`;
}

function checks(labels, values) {
  return `<ul class="ak-pr-checks">${Object.entries(labels).map(([key, label]) =>
    `<li class="${values?.[key] ? "is-checked" : ""}">${esc(label)}</li>`).join("")}</ul>`;
}

function signature(title, value) {
  return `<div class="ak-pr-signature">${value ? `<img src="${esc(value)}" alt="">` : ""}<small>${esc(title)}</small></div>`;
}

function germanDate(value) {
  if (!value) return "—";
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("de-DE").format(date);
}

export function renderPrintView(card, target) {
  const f = card.formData;
  const orderTypes = [f.orderType.einbau && "Einbau", f.orderType.nachruestung && "Nachrüstung", f.orderType.service && "Service"].filter(Boolean).join(", ");
  const error = f.tachoFehler.ja ? `Ja${f.tachoFehler.code ? ` (${f.tachoFehler.code})` : ""}` : f.tachoFehler.nein ? "Nein" : "—";
  const installed = card.materials.filter((item) => item.verbaut);
  const groups = [...groupOrder.filter((group) => installed.some((item) => item.gruppe === group)), ...new Set(installed.map((item) => item.gruppe).filter((group) => !groupOrder.includes(group)))];
  const uebergabeLabels = Object.fromEntries(checklistItemsUebergabe.map((item) => [item.key, item.label]));
  const photos = [["fahrerseite","Fahrerseite"],["beifahrerseite","Beifahrerseite"],["front","Front"],["heck","Heck"]];

  target.innerHTML = `
    <header class="ak-pr-head">
      <div><img src="/assets/thitronik-logo.png" alt="THITRONIK"><h1>Arbeitskarte Digital v3.0</h1></div>
      <div class="ak-pr-meta"><div><b>Auftragsart:</b> ${esc(orderTypes || "—")}</div><div><b>Stand:</b> ${esc(new Intl.DateTimeFormat("de-DE", { dateStyle: "medium", timeStyle: "short" }).format(new Date()))}</div></div>
    </header>
    <section class="ak-pr-section">
      <h2>1 · Auftrag</h2>
      <div class="ak-pr-grid-2"><div><h3>Kundendaten</h3>${field("Firma",f.kunde.firma)}${field("Name",f.kunde.name)}${field("Telefon",f.kunde.telefon)}${field("Kennzeichen",f.kunde.kennzeichen)}${field("Fahrzeugtyp",f.kunde.fahrzeugtyp)}${field("Fahrgestellnummer",f.kunde.fahrgestellnummer)}</div>
      <div><h3>Monteur</h3>${field("Name",f.monteur.name)}${field("Seriennummern",f.monteur.seriennummern)}${field("Funktionen geprüft",f.monteur.funktionenGeprueft ? "Ja" : "Nein")}<h3>OBD & Tacho</h3>${field("OBD Eingang",f.obd.eingang)}${field("OBD Ausgang",f.obd.ausgang)}${field("Uhrzeit",f.obd.uhrzeit)}${field("Tacho-Fehler",error)}</div></div>
      <div class="ak-pr-grid-2"><div>${field("Hinweise / Bemerkungen",f.hinweis)}</div><div>${field("LED Einbauort",f.ledEinbauort)}</div></div>
      <h3>Fahrzeug-Visualisierung</h3>
      <div class="ak-pr-sketches">${vehicleSketchViews.map((view) => `<figure><div class="ak-pr-stack"><img src="${view.backgroundSrc}" alt="${esc(view.label)}">${card.sketches[view.key] ? `<img src="${esc(card.sketches[view.key])}" alt="">` : ""}</div><figcaption>${esc(view.label)}</figcaption></figure>`).join("")}</div>
    </section>
    <section class="ak-pr-section">
      <h2>2 · Sichtkontrolle</h2>
      <div class="ak-pr-photos">${photos.map(([key,label]) => `<figure>${f.vorschadenFotos[key] ? `<img src="${esc(f.vorschadenFotos[key])}" alt="${esc(label)}">` : `<div class="ak-pr-empty-photo">kein Foto</div>`}<figcaption>${esc(label)}</figcaption></figure>`).join("")}</div>
      ${field("Schadensmeldung / Beschreibung",f.schadensmeldung)}
      <div class="ak-pr-grid-3"><div><h3>Grundfunktionen</h3>${checks(grundfunktionenLabels,f.checklistGrundfunktionen)}</div><div><h3>Pro-Finder-Alarme</h3>${checks(proFinderLabels,f.checklistProFinder)}</div><div><h3>Rückfahrkamera</h3>${checks(rueckfahrkameraLabels,f.checklistRueckfahrkamera)}</div></div>
      <div class="ak-pr-signatures">${signature("Unterschrift Monteur",f.unterschriftMonteur)}${signature("Unterschrift Kunde",f.unterschriftKunde)}</div>
    </section>
    <section class="ak-pr-section">
      <h2>3 · Verbautes Material</h2>
      ${installed.length ? `<table class="ak-pr-table"><thead><tr><th>Gruppe / Artikel</th><th>Art.-Nr.</th><th>Menge</th><th>Notiz</th></tr></thead><tbody>${groups.map((group) => `<tr class="group"><td colspan="4">${esc(group)}</td></tr>${installed.filter((item) => item.gruppe === group).map((item) => `<tr><td>${esc(item.artikel)}</td><td>${esc(item.artNr || "—")}</td><td>${esc(item.menge)}</td><td>${esc(item.notiz)}</td></tr>`).join("")}`).join("")}</tbody></table>` : "<p>Keine Materialien als verbaut markiert.</p>"}
    </section>
    <section class="ak-pr-section">
      <h2>4 · Übergabe</h2>
      <h3>Übergabe-Checkliste</h3>${checks(uebergabeLabels,f.uebergabe)}
      <div class="ak-pr-grid-2"><div>${field("Sonstiger Vermerk",f.uebergabe.sonstigerVermerk)}</div><div>${field("Ort",f.uebergabe.ort)}${field("Datum",germanDate(f.uebergabe.datum))}</div></div>
      <div class="ak-pr-signatures">${signature("Monteur",f.unterschriftMonteur)}${signature("Kunde (Sichtkontrolle)",f.unterschriftKunde)}${signature("Kunde (Übergabe)",f.uebergabe.unterschriftKunde)}</div>
    </section>`;
}
