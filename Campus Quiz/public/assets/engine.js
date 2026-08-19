/* ==========================================================================
   THITRONIK Campus — Wissenscheck, gemeinsame Quiz-Engine
   --------------------------------------------------------------------------
   Eine Engine, sieben Fragensätze. Die Insel steht im Pfad (/quiz/hiddensee),
   die Fragen in /data/inseln/<slug>.json.

   Wichtig: Der Browser sendet nur, WAS gewählt wurde — nie, ob es richtig
   war. Die Bewertung macht die Netlify-Function gegen dieselbe JSON-Datei.
   Damit gibt es genau eine Wahrheitsquelle für die richtigen Antworten.
   ========================================================================== */

"use strict";

(function () {
  const EVENT_SLUG = "campus-2026";
  const ENGINE_VERSION = "1.2.19";
  const SUBMIT_ENDPOINT = "/.netlify/functions/submit-quiz";

  const LS_PARTICIPANT = "thitronik.campus.2026.participant";
  const LS_DONE = "thitronik.campus.2026.done";

  /** ?demo=1 läuft komplett durch, speichert aber absichtlich nichts.
   *  Gleiche Konvention wie im Feedbackbogen — für Tests immer verwenden. */
  const DEMO = new URLSearchParams(location.search).get("demo") === "1";

  /** Wer Bewegung abbestellt hat, bekommt auch keine weichen Sprünge. */
  const REDUZIERT = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : { matches: false };

  const scrollArt = () => (REDUZIERT.matches ? "auto" : "smooth");

  // ------------------------------------------------------------------ DOM ---

  const $ = (id) => document.getElementById(id);

  const el = {
    mastheadTitle: $("masthead-title"),
    mastheadProgress: $("masthead-progress"),
    campusProgressValue: $("campus-progress-value"),
    campusProgressTrack: $("campus-progress-track"),
    campusProgressFill: $("campus-progress-fill"),
    campusProgressCopy: $("campus-progress-copy"),
    mastheadMeta: $("masthead-meta"),
    chipIsland: $("chip-island"),
    chipParticipant: $("chip-participant"),
    colophon: $("colophon-version"),

    screens: {
      islands: $("screen-islands"),
      start: $("screen-start"),
      quiz: $("screen-quiz"),
      result: $("screen-result"),
      error: $("screen-error")
    },

    campusMap: $("campus-map"),
    campusMapArt: $("campus-map-art"),
    islandGrid: $("island-grid"),

    startCode: $("start-code"),
    startTitle: $("start-title"),
    startLead: $("start-lead"),
    startFacts: $("start-facts"),
    samsoeStartVisual: $("samsoe-start-visual"),
    samsoeStartVehicle: $("samsoe-start-vehicle"),
    samsoeStartTechnician: $("samsoe-start-technician"),
    hiddenseeStartVisual: $("hiddensee-start-visual"),
    hiddenseeStartContact: $("hiddensee-start-contact"),
    vejroStartVisual: $("vejro-start-visual"),
    vejroStartProducts: $("vejro-start-products"),
    poelStartVisual: $("poel-start-visual"),
    poelStartHaendler: $("poel-start-haendler"),
    usedomStartVisual: $("usedom-start-visual"),
    usedomStartDisplay: $("usedom-start-display"),
    langelandStartVisual: $("langeland-start-visual"),
    langelandStartHandover: $("langeland-start-handover"),
    fehmarnStartVisual: $("fehmarn-start-visual"),
    fehmarnStartDiagnostic: $("fehmarn-start-diagnostic"),
    formIntro: $("form-intro"),
    startForm: $("start-form"),
    fName: $("f-name"),
    fDealer: $("f-dealer"),
    fNumber: $("f-number"),
    fArea: $("f-area"),
    btnToIslands: $("btn-to-islands"),

    qCounter: $("q-counter"),
    qProgress: $("q-progress"),
    qProgressFill: $("q-progress-fill"),
    qCategory: $("q-category"),
    qMode: $("q-mode"),
    qTitle: $("q-title"),
    qHint: $("q-hint"),
    qMedia: $("q-media"),
    qMediaImg: $("q-media-img"),
    qMediaCaption: $("q-media-caption"),
    qInput: $("q-input"),
    qFeedback: $("q-feedback"),
    qFeedbackTitle: $("q-feedback-title"),
    qFeedbackCopy: $("q-feedback-copy"),
    qFeedbackSolution: $("q-feedback-solution"),
    qFeedbackMedia: $("q-feedback-media"),
    qFeedbackMediaImg: $("q-feedback-media-img"),
    qFeedbackMediaCaption: $("q-feedback-media-caption"),
    qFeedbackIrrtum: $("q-feedback-irrtum"),
    qFeedbackIrrtumList: $("q-feedback-irrtum-list"),
    qFeedbackMitnehmen: $("q-feedback-mitnehmen"),
    qFeedbackMitnehmenText: $("q-feedback-mitnehmen-text"),

    lightbox: $("lightbox"),
    lightboxImage: $("lightbox-image"),
    lightboxCaption: $("lightbox-caption"),
    lightboxClose: $("lightbox-close"),
    qStatus: $("q-status"),
    btnCheck: $("btn-check"),
    btnAbort: $("btn-abort"),

    rPercent: $("r-percent"),
    rFraction: $("r-fraction"),
    rRing: $("r-ring"),
    rRating: $("r-rating"),
    rDuration: $("r-duration"),
    rIsland: $("r-island"),
    rSave: $("r-save"),
    rTopics: $("r-topics"),
    rTopicsBlock: $("r-topics-block"),
    rReview: $("r-review"),
    btnRetrySave: $("btn-retry-save"),
    btnWrongOnly: $("btn-wrong-only"),
    btnNextIsland: $("btn-next-island"),
    btnRepeat: $("btn-repeat"),

    errCopy: $("err-copy"),
    btnErrBack: $("btn-err-back"),

    toast: $("toast")
  };

  // ---------------------------------------------------------------- State ---

  const state = {
    catalog: null,      // inseln.json
    island: null,       // geladener Fragensatz
    slug: null,
    questions: [],      // laufende Runde (ggf. gemischt / gefiltert)
    index: 0,
    responses: [],      // { id, answer, response_seconds }
    results: [],        // clientseitige Bewertung für die Sofortanzeige
    startedAt: null,
    questionStartedAt: null,
    revealed: false,
    lastPayload: null,
    isRepeatRound: false,
    weiterFrei: 0       // Zeitpunkt, ab dem "Nächste Frage" wieder zählt
  };

  // ------------------------------------------------------------- Helfer ----

  function show(name) {
    Object.entries(el.screens).forEach(([key, node]) => {
      node.hidden = key !== name;
    });
    el.mastheadProgress.hidden = name !== "islands";
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function toast(message, ms = 2600) {
    el.toast.textContent = message;
    el.toast.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => { el.toast.hidden = true; }, ms);
  }

  function fail(message) {
    el.errCopy.textContent = message;
    // Im Einzel-Insel-Paket gibt es keine Übersicht, auf die der Knopf
    // zurückführen könnte.
    if (state.catalog && state.catalog.inseln.length === 1) {
      el.btnErrBack.textContent = "Seite neu laden";
    }
    show("error");
  }

  /** Fisher-Yates. Ohne Seed — „gleiche Reihenfolge wiederholen" arbeitet
   *  stattdessen auf der bereits gemischten Liste. */
  function shuffled(list) {
    const out = list.slice();
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  }

  function sameSet(a, b) {
    if (a.length !== b.length) return false;
    const x = a.slice().sort();
    const y = b.slice().sort();
    return x.every((v, i) => v === y[i]);
  }

  function formatDuration(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m > 0 ? `${m} min ${String(s).padStart(2, "0")} s` : `${s} s`;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }

  /** Erst escapen, dann **fett** zulassen.
   *
   *  Der Fragenkatalog hebt in den Auflösungen einzelne Wörter hervor — die
   *  Trennung „Aufbautür" gegen „Fahrzeug-Zentralverriegelung" etwa lebt
   *  davon. Als reiner Text stünden dort sichtbare Sternchen.
   *
   *  Die Reihenfolge ist die Sicherung: Nach dem Escapen enthält die
   *  Zeichenkette kein < und kein > mehr, aus dem noch Markup werden könnte.
   *  Umgekehrt wäre es eine Lücke. */
  function richText(value) {
    return escapeHtml(value).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  }

  /** Großansicht. Bei einer Bildfrage ist das kein Extra: auf einem
   *  Telefon sind vier Fotos nebeneinander so klein, dass der Montagefehler
   *  darauf nicht zu erkennen wäre. */
  function openLightbox(src, alt, caption) {
    el.lightboxImage.src = src;
    el.lightboxImage.alt = alt || "";
    el.lightboxCaption.textContent = caption || alt || "";
    el.lightboxCaption.hidden = !el.lightboxCaption.textContent;
    if (typeof el.lightbox.showModal === "function") el.lightbox.showModal();
    else el.lightbox.setAttribute("open", "");   // sehr alte Browser
  }

  /** Bilder der nächsten Frage still im Hintergrund holen. Im Schulungsnetz
   *  einer Halle ist das der Unterschied zwischen „ist da" und „lädt noch". */
  function preloadNext() {
    const next = state.questions[state.index + 1];
    if (!next) return;

    const quellen = [];
    if (next.media && next.media.src) quellen.push(next.media.src);
    if (next.feedbackMedia && next.feedbackMedia.src) quellen.push(next.feedbackMedia.src);
    (next.options || []).forEach((option) => { if (option.image) quellen.push(option.image); });

    quellen.forEach((src) => { new Image().src = src; });
  }

  function sessionId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }
    return `s-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  }

  // ------------------------------------------------------ Teilnehmerdaten ---

  function loadParticipant() {
    try {
      const raw = localStorage.getItem(LS_PARTICIPANT);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }

  function saveParticipant(data) {
    try { localStorage.setItem(LS_PARTICIPANT, JSON.stringify(data)); } catch { /* privater Modus */ }
  }

  function loadDone() {
    try {
      const raw = localStorage.getItem(LS_DONE);
      const parsed = raw ? JSON.parse(raw) : {};
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch { return {}; }
  }

  function markDone(slug, percent) {
    try {
      const done = loadDone();
      done[slug] = { percent, at: new Date().toISOString() };
      localStorage.setItem(LS_DONE, JSON.stringify(done));
    } catch { /* privater Modus */ }
  }

  // ------------------------------------------------------------- Routing ---

  function readSlug() {
    const match = location.pathname.match(/^\/quiz\/([a-z0-9-]+)\/?$/i);
    if (match) return match[1].toLowerCase();
    const param = new URLSearchParams(location.search).get("insel");
    return param ? param.toLowerCase() : null;
  }

  async function fetchJson(url) {
    const separator = url.includes("?") ? "&" : "?";
    const versionedUrl = `${url}${separator}v=${encodeURIComponent(ENGINE_VERSION)}`;
    const response = await fetch(versionedUrl, { cache: "no-store" });
    if (!response.ok) throw new Error(`${versionedUrl} → HTTP ${response.status}`);
    return response.json();
  }

  // -------------------------------------------------------- Inselübersicht --

  const CAMPUS_ROUTES = [
    "fehmarn-samsoe",
    "samsoe-vejro",
    "vejro-hiddensee",
    "hiddensee-poel",
    "poel-langeland",
    "langeland-usedom",
    "usedom-fehmarn"
  ];

  let campusRouteFrame = 0;

  /** Ermittelt die Mitte des sichtbaren Stationspunkts. Die Punkte sind
   *  Pseudoelemente, weil sie zugleich die kurze Verbindung zur Infobox
   *  zeichnen. Ihre berechnete Position funktioniert auch bei höheren
   *  Ergebnisboxen und an jedem Desktop-Breakpoint. */
  function campusAnchor(slug, mapRect) {
    const content = el.islandGrid.querySelector(`.island-${slug} .i-content`);
    if (!content) return null;

    const rect = content.getBoundingClientRect();
    const dot = getComputedStyle(content, "::before");
    const width = parseFloat(dot.width) || 8;
    const height = parseFloat(dot.height) || 8;
    const left = parseFloat(dot.left);
    const right = parseFloat(dot.right);
    const top = parseFloat(dot.top);
    const screenX = Number.isFinite(left)
      ? rect.left + left + width / 2
      : rect.right - right - width / 2;
    const screenY = rect.top + top + height / 2;

    return {
      x: ((screenX - mapRect.left) / mapRect.width) * 1200,
      y: ((screenY - mapRect.top) / mapRect.height) * 760
    };
  }

  function campusCurve(name, a, b) {
    const point = (p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
    let c1;
    let c2;

    switch (name) {
      case "fehmarn-samsoe":
        c1 = { x: a.x - 60, y: a.y - 96 };
        c2 = { x: b.x - 66, y: b.y + 82 };
        break;
      case "samsoe-vejro":
        c1 = { x: a.x + 24, y: a.y + 32 };
        c2 = { x: b.x + 7, y: b.y - 78 };
        break;
      case "vejro-hiddensee":
        c1 = { x: a.x + 77, y: a.y + 32 };
        c2 = { x: b.x - 56, y: b.y - 90 };
        break;
      case "hiddensee-poel":
        c1 = { x: a.x + 99, y: a.y + 80 };
        c2 = { x: b.x + 158, y: b.y - 69 };
        break;
      case "poel-langeland":
        c1 = { x: a.x - 52, y: a.y + 121 };
        c2 = { x: b.x + 68, y: b.y + 128 };
        break;
      case "langeland-usedom":
        c1 = { x: a.x + 30, y: a.y + 80 };
        c2 = { x: b.x - 40, y: b.y + 100 };
        break;
      case "usedom-fehmarn":
        c1 = { x: a.x - 83, y: a.y - 17 };
        c2 = { x: b.x - 12, y: b.y + 64 };
        break;
      default:
        c1 = { x: a.x + (b.x - a.x) / 3, y: a.y };
        c2 = { x: a.x + ((b.x - a.x) * 2) / 3, y: b.y };
    }

    return `M ${point(a)} C ${point(c1)}, ${point(c2)}, ${point(b)}`;
  }

  function updateCampusRoutes() {
    if (!el.campusMap || !el.campusMapArt || el.screens.islands.hidden || innerWidth < 760) return;

    const mapRect = el.campusMap.getBoundingClientRect();
    if (!mapRect.width || !mapRect.height) return;

    CAMPUS_ROUTES.forEach((name) => {
      const [from, to] = name.split("-");
      const a = campusAnchor(from, mapRect);
      const b = campusAnchor(to, mapRect);
      const path = el.campusMapArt.querySelector(`[data-route="${name}"]`);
      if (a && b && path) path.setAttribute("d", campusCurve(name, a, b));
    });
  }

  function scheduleCampusRoutes() {
    if (campusRouteFrame) cancelAnimationFrame(campusRouteFrame);
    campusRouteFrame = requestAnimationFrame(() => {
      campusRouteFrame = 0;
      updateCampusRoutes();
    });
  }

  function setCampusRouteFocus(slug, active) {
    if (!el.campusMap || !el.campusMapArt) return;

    const routes = el.campusMapArt.querySelectorAll("[data-route]");
    el.campusMap.classList.toggle("has-route-focus", active);
    routes.forEach((path) => {
      const stations = path.dataset.route.split("-");
      path.classList.toggle("is-route-focus", active && stations.includes(slug));
    });
  }

  function renderIslands() {
    const done = loadDone();
    const total = state.catalog.inseln.length;
    const abgeschlossen = state.catalog.inseln.filter((island) => done[island.slug]).length;
    const fortschritt = total ? Math.round((abgeschlossen / total) * 100) : 0;

    setCampusRouteFocus("", false);
    el.islandGrid.innerHTML = "";
    el.campusProgressValue.textContent = `${fortschritt} %`;
    el.campusProgressCopy.textContent = `${abgeschlossen} von ${total} ${total === 1 ? "Insel" : "Inseln"} abgeschlossen`;
    el.campusProgressTrack.setAttribute("aria-valuenow", String(fortschritt));
    el.campusProgressFill.style.width = `${fortschritt}%`;

    state.catalog.inseln.forEach((island, index) => {
      const entry = done[island.slug];
      const li = document.createElement("li");
      li.className = `island-map-item island-${island.slug}`;
      li.style.setProperty("--island-order", index);
      const card = document.createElement("button");
      card.type = "button";
      card.className = "island-card" + (entry ? " is-done" : "");
      if (entry) card.style.setProperty("--score", Math.max(0, Math.min(100, Number(entry.percent) || 0)));
      card.innerHTML = `
        ${island.image ? `<span class="i-visual" aria-hidden="true"><img src="${escapeHtml(island.image)}" alt="" loading="lazy"></span>` : ""}
        <span class="i-content">
          <span class="i-code">${escapeHtml(island.code)}</span>
          <span class="i-title">${escapeHtml(island.title)}</span>
          <span class="i-desc">${escapeHtml(island.beschreibung)}</span>
          <span class="i-state">${entry ? `Ergebnis ${entry.percent} %` : "Noch offen"}</span>
          ${entry ? `<span class="i-score" aria-hidden="true"><span></span></span>` : ""}
        </span>
        <span class="i-open" aria-hidden="true"></span>`;
      card.addEventListener("click", () => {
        history.pushState({}, "", `/quiz/${island.slug}`);
        route();
      });
      const syncRouteFocus = () => requestAnimationFrame(() => {
        setCampusRouteFocus(island.slug, card.matches(":hover, :focus-visible"));
      });
      card.addEventListener("pointerenter", syncRouteFocus);
      card.addEventListener("pointerleave", syncRouteFocus);
      card.addEventListener("focus", syncRouteFocus);
      card.addEventListener("blur", syncRouteFocus);
      li.appendChild(card);
      el.islandGrid.appendChild(li);
    });

    el.mastheadTitle.textContent = "Wissenscheck";
    el.mastheadMeta.hidden = true;
    show("islands");
    scheduleCampusRoutes();
  }

  // ------------------------------------------------------------ Startbild ---

  /** Enthält der Katalog nur eine Insel, gibt es keine Übersicht — dann
   *  führen „Andere Insel" und „Nächste Insel" ins Leere. */
  function istEinzelinsel() {
    return state.catalog.inseln.length === 1;
  }

  function renderStart() {
    const island = state.island;
    const isSamsoe = island.island === "samsoe";
    const isHiddensee = island.island === "hiddensee";
    const isVejro = island.island === "vejro";
    const isPoel = island.island === "poel";
    const isUsedom = island.island === "usedom";
    const isLangeland = island.island === "langeland";
    const isFehmarn = island.island === "fehmarn";

    el.screens.start.dataset.island = island.island || "";
    el.samsoeStartVisual.hidden = !isSamsoe;
    el.hiddenseeStartVisual.hidden = !isHiddensee;
    el.vejroStartVisual.hidden = !isVejro;
    el.poelStartVisual.hidden = !isPoel;
    el.usedomStartVisual.hidden = !isUsedom;
    el.langelandStartVisual.hidden = !isLangeland;
    el.fehmarnStartVisual.hidden = !isFehmarn;
    if (isSamsoe) {
      [el.samsoeStartVehicle, el.samsoeStartTechnician].forEach((image) => {
        if (!image.getAttribute("src")) image.src = image.dataset.src;
      });
    }
    if (isHiddensee && !el.hiddenseeStartContact.getAttribute("src")) {
      el.hiddenseeStartContact.src = el.hiddenseeStartContact.dataset.src;
    }
    if (isVejro && !el.vejroStartProducts.getAttribute("src")) {
      el.vejroStartProducts.src = el.vejroStartProducts.dataset.src;
    }
    if (isPoel && !el.poelStartHaendler.getAttribute("src")) {
      el.poelStartHaendler.src = el.poelStartHaendler.dataset.src;
    }
    if (isUsedom && !el.usedomStartDisplay.getAttribute("src")) {
      el.usedomStartDisplay.src = el.usedomStartDisplay.dataset.src;
    }
    if (isLangeland && !el.langelandStartHandover.getAttribute("src")) {
      el.langelandStartHandover.src = el.langelandStartHandover.dataset.src;
    }
    if (isFehmarn && !el.fehmarnStartDiagnostic.getAttribute("src")) {
      el.fehmarnStartDiagnostic.src = el.fehmarnStartDiagnostic.dataset.src;
    }

    el.btnToIslands.hidden = istEinzelinsel();

    // Die Angaben liegen im localStorage, und der gilt pro Domain. Läuft jede
    // Insel als eigene Netlify-Site, tragen sie NICHT zur nächsten Insel
    // hinüber — dann darf hier auch nichts anderes stehen.
    el.formIntro.textContent = istEinzelinsel()
      ? "Damit lässt sich dein Ergebnis der Schulung zuordnen."
      : "Einmal ausfüllen — für die weiteren Inseln bleiben die Angaben gespeichert.";

    el.startCode.textContent = island.code;
    el.startTitle.textContent = island.title;
    el.startLead.textContent = island.lernziel || "";
    el.mastheadTitle.textContent = island.title;
    el.chipIsland.textContent = island.code;
    el.mastheadMeta.hidden = false;

    const count = island.questions.length;
    const types = new Set(island.questions.map((q) => q.type));
    const typeNames = {
      single: "Einfachauswahl",
      multi: "Mehrfachauswahl",
      truefalse: "Richtig/Falsch",
      order: "Reihenfolge",
      match: "Zuordnung"
    };

    el.startFacts.innerHTML = "";
    [
      `${count} ${count === 1 ? "Frage" : "Fragen"}`,
      `Fragetypen: ${[...types].map((t) => typeNames[t] || t).join(", ")}`,
      "Nach jeder Antwort gibt es sofort die Auflösung",
      "Kein Zeitlimit — es geht nicht um Tempo"
    ].forEach((text) => {
      const li = document.createElement("li");
      li.textContent = text;
      el.startFacts.appendChild(li);
    });

    // "internerHinweis" wird bewusst NICHT angezeigt. Das sind redaktionelle
    // Notizen an uns ("Menüpfade gegenprüfen", "Feld media ergänzen") — auf
    // dem Startbildschirm läse sie der Händler am Aufsteller mit. Sie
    // erscheinen stattdessen in der Ausgabe von tools/check-fragen.js.

    const saved = loadParticipant();
    if (saved) {
      el.fName.value = saved.name || "";
      el.fDealer.value = saved.dealer || "";
      el.fNumber.value = saved.dealerNumber || "";
      el.fArea.value = saved.area || "";
      el.chipParticipant.textContent = saved.name || "";
      el.chipParticipant.hidden = !saved.name;
    } else {
      el.chipParticipant.hidden = true;
    }

    show("start");
  }

  // --------------------------------------------------------- Validierung ---

  function setFieldError(input, errorNode, message) {
    const field = input.closest(".field");

    // Die Meldung wird an das Feld gebunden. Ohne das meldet ein Screenreader
    // beim Sprung ins Feld nur "ungültig" und verschweigt den Grund — die
    // Meldung steht zwar daneben, gehört aber zu nichts. Ein vorhandener
    // Hilfetext ("Genau fünf Ziffern") bleibt dabei erhalten.
    const beschreibungen = (input.getAttribute("aria-describedby") || "")
      .split(/\s+/)
      .filter((id) => id && id !== errorNode.id);

    if (message) {
      field.classList.add("has-error");
      errorNode.textContent = message;
      errorNode.hidden = false;
      input.setAttribute("aria-invalid", "true");
      input.setAttribute("aria-describedby", beschreibungen.concat(errorNode.id).join(" "));
    } else {
      field.classList.remove("has-error");
      errorNode.hidden = true;
      input.removeAttribute("aria-invalid");
      if (beschreibungen.length) input.setAttribute("aria-describedby", beschreibungen.join(" "));
      else input.removeAttribute("aria-describedby");
    }
  }

  function validateForm() {
    let firstBad = null;

    const name = el.fName.value.trim();
    if (name.length < 2) {
      setFieldError(el.fName, $("e-name"), "Bitte deinen Namen eintragen.");
      firstBad = firstBad || el.fName;
    } else setFieldError(el.fName, $("e-name"), null);

    const dealer = el.fDealer.value.trim();
    if (dealer.length < 2) {
      setFieldError(el.fDealer, $("e-dealer"), "Bitte den Händlerbetrieb eintragen.");
      firstBad = firstBad || el.fDealer;
    } else setFieldError(el.fDealer, $("e-dealer"), null);

    // Händlernummer: Zeichenkette, genau fünf Ziffern. Gleiche Regeln wie im
    // Feedbackbogen — erst putzen, dann prüfen, kein maxlength.
    const number = el.fNumber.value.trim();
    if (!number) {
      setFieldError(el.fNumber, $("e-number"), "Die Händlernummer fehlt.");
      firstBad = firstBad || el.fNumber;
    } else if (!/^\d{5}$/.test(number)) {
      setFieldError(el.fNumber, $("e-number"), "Die Händlernummer besteht aus genau fünf Ziffern.");
      firstBad = firstBad || el.fNumber;
    } else setFieldError(el.fNumber, $("e-number"), null);

    if (firstBad) {
      firstBad.focus();
      return null;
    }

    return { name, dealer, dealerNumber: number, area: el.fArea.value || "" };
  }

  // ------------------------------------------------------------ Quizlauf ---

  function beginRound(questions, { repeat = false } = {}) {
    state.questions = questions;
    state.index = 0;
    state.responses = [];
    state.results = [];
    state.startedAt = new Date();
    state.isRepeatRound = repeat;
    renderQuestion();
    show("quiz");
  }

  function currentQuestion() {
    return state.questions[state.index];
  }

  function renderQuestion() {
    const q = currentQuestion();
    state.revealed = false;
    state.questionStartedAt = Date.now();

    const total = state.questions.length;
    el.qCounter.textContent = `Frage ${state.index + 1} von ${total}`;
    const pct = Math.round((state.index / total) * 100);
    el.qProgressFill.style.width = `${pct}%`;
    el.qProgress.setAttribute("aria-valuenow", String(pct));

    el.qCategory.textContent = q.category || "";
    el.qCategory.hidden = !q.category;
    const modeNames = {
      single: "Eine Antwort auswählen",
      truefalse: "Eine Antwort auswählen",
      multi: "Mehrere Antworten auswählen",
      order: "Schritte in Reihenfolge antippen",
      match: "Jede Zeile zuordnen"
    };
    el.qMode.textContent = modeNames[q.type] || "Antwort auswählen";
    el.qTitle.textContent = q.prompt;

    if (q.hint) {
      el.qHint.textContent = q.hint;
      el.qHint.hidden = false;
    } else el.qHint.hidden = true;

    if (q.media && q.media.src) {
      el.qMediaImg.src = q.media.src;
      el.qMediaImg.alt = q.media.alt || "";
      el.qMediaImg.dataset.layout = q.media.layout || q.layout || "landscape";
      el.qMediaCaption.textContent = q.media.caption || "Zum Vergrößern antippen";
      el.qMedia.hidden = false;
    } else el.qMedia.hidden = true;

    el.qFeedback.hidden = true;
    el.qFeedback.className = "feedback";
    el.qFeedbackMedia.hidden = true;
    el.qFeedbackIrrtum.hidden = true;
    el.qFeedbackMitnehmen.hidden = true;
    el.btnCheck.textContent = "Antwort prüfen";
    el.btnCheck.disabled = true;

    renderInput(q);

    // preventScroll, weil der Browser sonst nur so weit scrollt, bis die
    // Überschrift eben im Bild ist — bei einer langen Frage steht man dann
    // mitten im Text. Der Blick gehört an den Anfang der Frage.
    el.qTitle.focus({ preventScroll: true });
    el.screens.quiz.scrollIntoView({ block: "start", behavior: scrollArt() });

    preloadNext();
  }

  /** Aktueller Antwortstand der laufenden Frage. Von den Renderern gefüllt. */
  let draft = null;

  function updateCheckState() {
    const q = currentQuestion();
    let ready = false;
    let status = "";

    if (q.type === "single" || q.type === "truefalse") {
      ready = draft.selected.length === 1;
      status = ready ? "" : "Wähle eine Antwort.";
    } else if (q.type === "multi") {
      ready = draft.selected.length > 0;
      status = ready
        ? `${draft.selected.length} ausgewählt`
        : "Wähle alle zutreffenden Antworten.";
    } else if (q.type === "order") {
      ready = draft.order.length === q.items.length;
      status = ready
        ? "Reihenfolge vollständig."
        : `${draft.order.length} von ${q.items.length} gesetzt — tippe die Schritte in der richtigen Reihenfolge an.`;
    } else if (q.type === "match") {
      const filled = Object.values(draft.pairs).filter(Boolean).length;
      ready = filled === q.left.length;
      status = ready ? "Alle zugeordnet." : `${filled} von ${q.left.length} zugeordnet.`;
    }

    el.btnCheck.disabled = !ready;
    el.qStatus.textContent = status;
  }

  function renderInput(q) {
    el.qInput.innerHTML = "";

    if (q.type === "single" || q.type === "multi" || q.type === "truefalse") {
      renderChoices(q);
    } else if (q.type === "order") {
      renderOrder(q);
    } else if (q.type === "match") {
      renderMatch(q);
    }

    updateCheckState();
  }

  // --- Einfach-, Mehrfachauswahl, Richtig/Falsch ---------------------------

  function optionsFor(q) {
    if (q.type === "truefalse") {
      return [
        { id: "richtig", text: "Richtig" },
        { id: "falsch", text: "Falsch" }
      ];
    }
    return q.shuffleOptions === false ? q.options.slice() : shuffled(q.options);
  }

  function renderChoices(q) {
    draft = { selected: [], options: optionsFor(q) };

    // Bildmodus wird an den Daten erkannt, nicht an einem Extra-Feld: sobald
    // eine Option ein Bild trägt, ist es eine Bildfrage.
    const bildmodus = draft.options.some((option) => option.image);

    const wrap = document.createElement("div");
    wrap.className = "answers"
      + (bildmodus ? " answers-bild" : "")
      + (!bildmodus && q.type === "truefalse" ? " answers-narrow" : "");
    if (bildmodus) wrap.dataset.layout = q.layout || "portrait";
    wrap.setAttribute("role", "group");
    wrap.setAttribute("aria-labelledby", "q-title");

    draft.options.forEach((option, i) => {
      const letter = String.fromCharCode(65 + i);

      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer opt-" + ((i % 7) + 1) + (bildmodus ? " answer-bild" : "");
      button.dataset.id = option.id;
      button.setAttribute("aria-pressed", "false");

      if (bildmodus) {
        const alt = option.imageAlt || option.text || `Bild ${letter}`;
        button.setAttribute("aria-label", `Antwort ${letter}: ${alt}`);
        // Bewusst NICHT loading="lazy": bei einer Bildfrage sind die Fotos die
        // Antwort. Sie müssen dastehen, sobald die Frage erscheint — sonst
        // vergleicht der Teilnehmer leere Kästen, und die unteren beiden
        // Kacheln lädt der Browser erst beim Scrollen nach.
        button.innerHTML = `
          <img class="answer-media" src="${escapeHtml(option.image)}" alt="${escapeHtml(alt)}"
               decoding="async" fetchpriority="high">
          <span class="answer-letter" aria-hidden="true">${letter}</span>
          ${option.text ? `<span class="answer-bild-text">${escapeHtml(option.text)}</span>` : ""}`;
      } else {
        button.innerHTML = `
          <span class="answer-letter" aria-hidden="true">${letter}</span>
          <span class="answer-text">${escapeHtml(option.text)}</span>`;
      }

      button.addEventListener("click", () => {
        if (state.revealed) return;
        const multi = q.type === "multi";
        if (multi) {
          const pos = draft.selected.indexOf(option.id);
          if (pos >= 0) draft.selected.splice(pos, 1);
          else draft.selected.push(option.id);
        } else {
          draft.selected = [option.id];
        }
        wrap.querySelectorAll(".answer").forEach((node) => {
          const on = draft.selected.includes(node.dataset.id);
          node.classList.toggle("is-selected", on);
          node.setAttribute("aria-pressed", String(on));
        });
        updateCheckState();
      });

      if (bildmodus) {
        // Kachel und Lupe nebeneinander im Wrapper — sonst stünde ein Button
        // im Button.
        const holder = document.createElement("div");
        holder.className = "answer-wrap";
        holder.appendChild(button);

        const zoom = document.createElement("button");
        zoom.type = "button";
        zoom.className = "answer-zoom";
        zoom.innerHTML = '<span aria-hidden="true">⤢</span>';
        zoom.setAttribute("aria-label", `Bild ${letter} vergrößern`);
        zoom.addEventListener("click", (event) => {
          event.stopPropagation();
          openLightbox(option.image, option.imageAlt || option.text, `Antwort ${letter}`);
        });
        holder.appendChild(zoom);

        wrap.appendChild(holder);
      } else {
        wrap.appendChild(button);
      }
    });

    el.qInput.appendChild(wrap);
  }

  // --- Reihenfolge ---------------------------------------------------------

  function renderOrder(q) {
    draft = { order: [], items: shuffled(q.items) };

    const list = document.createElement("div");
    list.className = "order-list";

    draft.items.forEach((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "order-item";
      button.dataset.id = item.id;
      button.innerHTML = `
        <span class="order-rank" aria-hidden="true">–</span>
        <span class="order-text">${escapeHtml(item.text)}</span>`;
      button.addEventListener("click", () => {
        if (state.revealed) return;
        const pos = draft.order.indexOf(item.id);
        if (pos >= 0) draft.order.splice(pos, 1);   // erneut tippen = zurücknehmen
        else draft.order.push(item.id);
        paintOrder(list);
        updateCheckState();
      });
      list.appendChild(button);
    });

    const reset = document.createElement("button");
    reset.type = "button";
    reset.className = "btn btn-secondary btn-small order-reset";
    reset.textContent = "Reihenfolge zurücksetzen";
    reset.addEventListener("click", () => {
      if (state.revealed) return;
      draft.order = [];
      paintOrder(list);
      updateCheckState();
    });

    el.qInput.appendChild(list);
    el.qInput.appendChild(reset);
    paintOrder(list);
  }

  function paintOrder(list) {
    list.querySelectorAll(".order-item").forEach((node) => {
      const pos = draft.order.indexOf(node.dataset.id);
      const rank = node.querySelector(".order-rank");
      rank.textContent = pos >= 0 ? String(pos + 1) : "–";
      node.classList.toggle("is-picked", pos >= 0);
      node.setAttribute("aria-label",
        `${node.querySelector(".order-text").textContent} — ${pos >= 0 ? `Position ${pos + 1}` : "noch nicht gesetzt"}`);
    });
  }

  // --- Zuordnung -----------------------------------------------------------

  function renderMatch(q) {
    draft = { pairs: {} };
    q.left.forEach((item) => { draft.pairs[item.id] = ""; });

    // Die Auswahlliste wird einmal je Frage gemischt, nicht je Zeile: alle
    // Zeilen zeigen dieselbe Reihenfolge, sonst müsste man in jeder Zeile
    // neu suchen. Vorher stand sie unverändert in der Reihenfolge der
    // Quelldatei — und dort steht die Lösung meist der Reihe nach (erster
    // linker Eintrag zum ersten rechten). Wer die Frage ein zweites Mal
    // sah, konnte sich das Muster merken, ohne die Sache zu kennen.
    const auswahl = shuffled(q.right);

    const list = document.createElement("div");
    list.className = "match-list";

    shuffled(q.left).forEach((item) => {
      const row = document.createElement("div");
      row.className = "match-row";
      row.dataset.id = item.id;

      const label = document.createElement("label");
      label.className = "match-label";
      label.textContent = item.text;
      label.setAttribute("for", `m-${item.id}`);

      const select = document.createElement("select");
      select.id = `m-${item.id}`;
      select.innerHTML = `<option value="">Bitte wählen</option>` +
        auswahl.map((r) => `<option value="${escapeHtml(r.id)}">${escapeHtml(r.text)}</option>`).join("");
      select.addEventListener("change", () => {
        if (state.revealed) return;
        draft.pairs[item.id] = select.value;
        updateCheckState();
      });

      row.appendChild(label);
      row.appendChild(select);
      list.appendChild(row);
    });

    el.qInput.appendChild(list);
  }

  // ------------------------------------------------- Sofortige Bewertung ---

  /** Clientseitige Bewertung — ausschließlich für die Sofortanzeige.
   *  Verbindlich ist die Bewertung in der Netlify-Function. */
  function evaluate(q, answer) {
    if (q.type === "single" || q.type === "truefalse" || q.type === "multi") {
      return sameSet(answer.selected || [], q.correct);
    }
    if (q.type === "order") {
      const given = answer.order || [];
      return given.length === q.correct.length && given.every((id, i) => id === q.correct[i]);
    }
    if (q.type === "match") {
      const given = answer.pairs || {};
      return Object.keys(q.correct).every((key) => given[key] === q.correct[key]);
    }
    return false;
  }

  /** Beschriftung einer Option. Bildfragen tragen keinen text, dort ist der
   *  Alt-Text die einzige Benennung — sonst bliebe die Auflösungszeile leer. */
  function optionLabel(option) {
    if (!option) return "";
    return option.text || option.imageAlt || "";
  }

  function solutionText(q) {
    if (q.type === "truefalse") {
      return `Richtige Antwort: ${q.correct[0] === "richtig" ? "Richtig" : "Falsch"}`;
    }
    if (q.type === "single" || q.type === "multi") {
      const texts = q.correct.map((id) => optionLabel(q.options.find((o) => o.id === id))).filter(Boolean);
      return `Richtig ${texts.length > 1 ? "wären" : "wäre"}: ${texts.join(" · ")}`;
    }
    if (q.type === "order") {
      const texts = q.correct.map((id) => (q.items.find((o) => o.id === id) || {}).text).filter(Boolean);
      return `Richtige Reihenfolge: ${texts.join(" → ")}`;
    }
    if (q.type === "match") {
      const parts = Object.entries(q.correct).map(([l, r]) => {
        const left = (q.left.find((o) => o.id === l) || {}).text;
        const right = (q.right.find((o) => o.id === r) || {}).text;
        return `${left} → ${right}`;
      });
      return parts.join(" · ");
    }
    return "";
  }

  // --- „Falsch gewählt?" ---------------------------------------------------

  /** Betrifft dieser Irrtum die Antwort, die gerade gegeben wurde? Und wenn
   *  ja: auf welche Art?
   *
   *  Ein Irrtums-Absatz nennt in `fuer` die Optionen, um die es ihm geht. Ob
   *  daraus ein Treffer wird, leitet sich aus der Frage selbst ab und muss
   *  nicht zusätzlich gepflegt werden: Eine falsche Option trifft zu, wenn sie
   *  angekreuzt wurde — eine richtige, wenn sie fehlt. Genau so sind die
   *  Absätze geschrieben: „Sensor defekt" (gewählt) steht neben „Blinkcode
   *  weggelassen" (nicht gewählt).
   *
   *  Reihenfolge- und Zuordnungsfragen haben keine Optionen, auf die sich das
   *  beziehen ließe. Dort bleiben die Absätze unmarkiert — sie gelten ohnehin
   *  allen. */
  function irrtumMarke(eintrag, q, answer) {
    if (!Array.isArray(eintrag.fuer) || !eintrag.fuer.length) return "";
    if (!["single", "multi", "truefalse"].includes(q.type)) return "";

    const gewaehlt = answer.selected || [];
    const richtige = Array.isArray(q.correct) ? q.correct : [];
    let falschGewaehlt = false;
    let uebersehen = false;

    eintrag.fuer.forEach((id) => {
      if (richtige.includes(id)) { if (!gewaehlt.includes(id)) uebersehen = true; }
      else if (gewaehlt.includes(id)) falschGewaehlt = true;
    });

    if (falschGewaehlt && uebersehen) return "betrifft deine Antwort";
    if (falschGewaehlt) return "das hast du gewählt";
    if (uebersehen) return "das hast du übersehen";
    return "";
  }

  /** Alle Irrtümer erscheinen, nicht nur der eigene: Wer richtig geklickt hat,
   *  erkennt in den anderen die Sätze seiner Kunden wieder. Der eigene wird
   *  hervorgehoben — und zwar benannt, nicht nur eingefärbt, damit die
   *  Markierung auch bei Farbenblindheit und im Vorlesemodus ankommt. */
  function renderIrrtum(q, answer) {
    const eintraege = Array.isArray(q.irrtum) ? q.irrtum : [];
    if (!eintraege.length) {
      el.qFeedbackIrrtum.hidden = true;
      return;
    }

    el.qFeedbackIrrtumList.innerHTML = "";
    eintraege.forEach((eintrag) => {
      const marke = irrtumMarke(eintrag, q, answer);
      const li = document.createElement("li");
      li.className = "irrtum-item" + (marke ? " is-mine" : "");
      li.innerHTML = `<b>${richText(eintrag.titel)}${marke ? ` — ${marke}` : ""}:</b> ` +
        richText(eintrag.text);
      el.qFeedbackIrrtumList.appendChild(li);
    });
    el.qFeedbackIrrtum.hidden = false;
  }

  function reveal() {
    const q = currentQuestion();
    const answer = q.type === "order" ? { order: draft.order.slice() }
      : q.type === "match" ? { pairs: { ...draft.pairs } }
        : { selected: draft.selected.slice() };

    const seconds = Math.min(3600, Math.round((Date.now() - state.questionStartedAt) / 1000));
    const isCorrect = evaluate(q, answer);

    state.responses.push({ id: q.id, answer, response_seconds: seconds });
    state.results.push({ question: q, answer, isCorrect });
    state.revealed = true;

    paintReveal(q, answer);

    el.qFeedback.className = "feedback " + (isCorrect ? "is-correct" : "is-wrong");
    el.qFeedbackTitle.textContent = isCorrect ? "Richtig" : "Noch nicht richtig";
    el.qFeedbackCopy.innerHTML = q.feedback ? richText(q.feedback) : "";
    el.qFeedbackCopy.hidden = !q.feedback;

    if (isCorrect) {
      el.qFeedbackSolution.hidden = true;
    } else {
      el.qFeedbackSolution.textContent = solutionText(q);
      el.qFeedbackSolution.hidden = false;
    }

    // Erklärbild zur Auflösung — im Fehmarn-Quiz zeigt das etwa den
    // „GPS inside"-Aufkleber, auf den es bei der Montage ankommt.
    if (q.feedbackMedia && q.feedbackMedia.src) {
      el.qFeedbackMediaImg.src = q.feedbackMedia.src;
      el.qFeedbackMediaImg.alt = q.feedbackMedia.alt || "";
      el.qFeedbackMediaCaption.textContent = q.feedbackMedia.caption || "";
      el.qFeedbackMediaCaption.hidden = !q.feedbackMedia.caption;
      el.qFeedbackMedia.hidden = false;
    } else {
      el.qFeedbackMedia.hidden = true;
    }

    renderIrrtum(q, answer);

    // Der Mitnehmen-Satz steht zuletzt, nach Auflösung, Bild und Irrtümern:
    // Er ist das, was nach der Frage übrig bleiben soll — eine Faustregel oder
    // ein Satz für das Kundengespräch. Am Ende der Insel steht er noch einmal
    // in der Ergebnisliste.
    if (q.mitnehmen) {
      el.qFeedbackMitnehmenText.innerHTML = richText(q.mitnehmen);
      el.qFeedbackMitnehmen.hidden = false;
    } else {
      el.qFeedbackMitnehmen.hidden = true;
    }

    el.qFeedback.hidden = false;

    // Der Balken zählt beantwortete Fragen, nicht aufgerufene. Vorher rührte
    // er sich nach der ersten Antwort nicht: er stand auf null, obwohl gerade
    // eine Frage fertig war.
    const beantwortet = Math.round(((state.index + 1) / state.questions.length) * 100);
    el.qProgressFill.style.width = `${beantwortet}%`;
    el.qProgress.setAttribute("aria-valuenow", String(beantwortet));

    const last = state.index === state.questions.length - 1;
    el.btnCheck.textContent = last ? "Auswertung ansehen" : "Nächste Frage";
    el.btnCheck.disabled = false;
    el.qStatus.textContent = "";

    // Auflösung in den Blick holen, Nachtippen kurz verschlucken. Der Knopf
    // wechselt an derselben Stelle von "Antwort prüfen" auf "Nächste Frage" —
    // ein zweiter Tipp aus Gewohnheit übersprang bisher genau das, wofür der
    // Check gemacht ist.
    state.weiterFrei = Date.now() + 450;
    el.qFeedback.scrollIntoView({ block: "nearest", behavior: scrollArt() });
  }

  function paintReveal(q, answer) {
    if (q.type === "single" || q.type === "multi" || q.type === "truefalse") {
      el.qInput.querySelectorAll(".answer").forEach((node) => {
        const id = node.dataset.id;
        const chosen = (answer.selected || []).includes(id);
        const right = q.correct.includes(id);
        node.disabled = true;
        node.classList.remove("is-selected");
        if (chosen && right) node.classList.add("is-correct");
        else if (chosen && !right) node.classList.add("is-wrong");
        else if (!chosen && right) node.classList.add("is-missed");
      });
    } else if (q.type === "order") {
      el.qInput.querySelectorAll(".order-item").forEach((node) => {
        const id = node.dataset.id;
        const pos = (answer.order || []).indexOf(id);
        node.disabled = true;
        node.classList.remove("is-picked");
        node.classList.add(q.correct[pos] === id ? "is-correct" : "is-wrong");
      });
      el.qInput.querySelector(".order-reset")?.setAttribute("hidden", "");
    } else if (q.type === "match") {
      el.qInput.querySelectorAll(".match-row").forEach((node) => {
        const id = node.dataset.id;
        const select = node.querySelector("select");
        select.disabled = true;
        const richtig = (answer.pairs || {})[id] === q.correct[id];
        node.classList.add(richtig ? "is-correct" : "is-wrong");

        // Bei einer falschen Zuordnung genügt Rot nicht. Die Gesamtauflösung
        // nennt alle Paare in einer einzigen Zeile ("A → 1 · B → 2 · C → 3");
        // welches davon zu dieser Zeile gehört, muss man sich heraussuchen.
        // Also steht es an der Zeile, um die es geht.
        if (!richtig) {
          const ziel = (q.right.find((r) => r.id === q.correct[id]) || {}).text;
          if (ziel) {
            const loesung = document.createElement("p");
            loesung.className = "match-solution";
            loesung.textContent = `Richtig wäre: ${ziel}`;
            node.appendChild(loesung);
          }
        }
      });
    }
  }

  function advance() {
    if (state.index < state.questions.length - 1) {
      state.index += 1;
      renderQuestion();
    } else {
      finish();
    }
  }

  // ------------------------------------------------------------ Ergebnis ---

  function finish() {
    const finishedAt = new Date();
    const total = state.results.length;
    const score = state.results.filter((r) => r.isCorrect).length;
    const percent = total ? Math.round((score / total) * 100) : 0;
    const seconds = Math.max(0, Math.round((finishedAt - state.startedAt) / 1000));

    el.qProgressFill.style.width = "100%";
    el.rPercent.textContent = `${percent} %`;
    el.rFraction.textContent = `${score} von ${total} richtig`;
    el.rRing.style.setProperty("--pct", "0");
    el.rDuration.textContent = formatDuration(seconds);
    el.rIsland.textContent = state.island.code;

    el.rRating.textContent =
      percent === 100 ? "Alles richtig — sehr gut."
        : percent >= 80 ? "Sitzt. Die wichtigsten Punkte sind angekommen."
          : percent >= 60 ? "Solide Grundlage, ein paar Details lohnen den zweiten Blick."
            : "Schau dir die markierten Punkte noch einmal an — genau dafür ist der Check da.";

    renderTopics();
    renderReview();

    const wrong = state.results.filter((r) => !r.isCorrect);
    el.btnWrongOnly.hidden = wrong.length === 0;
    el.btnNextIsland.hidden = istEinzelinsel();

    if (!state.isRepeatRound) {
      markDone(state.slug, percent);
      submit(finishedAt);
    } else {
      el.rSave.textContent = "Wiederholungsrunde — sie wird nicht zusätzlich gespeichert.";
      el.btnRetrySave.hidden = true;
    }

    show("result");

    // Der Ring steht erst auf 0, ein erzwungener Reflow macht diesen Stand
    // zum Ausgangswert, dann folgt der Zielwert — der Übergang läuft.
    // Bewusst synchron statt in requestAnimationFrame: rAF ruht in einem
    // Tab, das gerade nicht im Vordergrund ist. Wer beim Absenden kurz die
    // App wechselt, käme sonst auf einen Ring zurück, der auf null steht,
    // während daneben "80 %" steht. Hier hängt nur die Bewegung am Übergang,
    // nie der Endstand.
    void el.rRing.offsetWidth;
    el.rRing.style.setProperty("--pct", String(percent));
  }

  function renderTopics() {
    const groups = new Map();
    state.results.forEach((r) => {
      const key = r.question.category || "Ohne Thema";
      const entry = groups.get(key) || { total: 0, right: 0 };
      entry.total += 1;
      if (r.isCorrect) entry.right += 1;
      groups.set(key, entry);
    });

    // Die Aufschlüsselung lohnt nur, wenn sie tatsächlich etwas gruppiert.
    // Zehn Themen mit je einer Frage sind bloß die Antwortliste in anderer
    // Form — die steht ohnehin darunter.
    const grouped = [...groups.values()].some((entry) => entry.total > 1);
    if (groups.size < 3 || !grouped) {
      el.rTopicsBlock.hidden = true;
      return;
    }
    el.rTopicsBlock.hidden = false;

    el.rTopics.innerHTML = "";
    [...groups.entries()]
      .sort((a, b) => (a[1].right / a[1].total) - (b[1].right / b[1].total))
      .forEach(([name, data]) => {
        const pct = Math.round((data.right / data.total) * 100);
        const row = document.createElement("div");
        row.className = "topic-row";
        row.innerHTML = `
          <span class="topic-name">${escapeHtml(name)}</span>
          <span class="topic-bar${pct < 60 ? " is-weak" : ""}"><span style="width:${pct}%"></span></span>
          <span class="topic-score">${data.right}/${data.total}</span>`;
        el.rTopics.appendChild(row);
      });
  }

  function givenText(q, answer) {
    if (q.type === "truefalse") {
      const v = (answer.selected || [])[0];
      return v === "richtig" ? "Richtig" : v === "falsch" ? "Falsch" : "—";
    }
    if (q.type === "single" || q.type === "multi") {
      const texts = (answer.selected || [])
        .map((id) => optionLabel(q.options.find((o) => o.id === id)))
        .filter(Boolean);
      return texts.length ? texts.join(" · ") : "—";
    }
    if (q.type === "order") {
      const texts = (answer.order || [])
        .map((id) => (q.items.find((o) => o.id === id) || {}).text)
        .filter(Boolean);
      return texts.length ? texts.join(" → ") : "—";
    }
    if (q.type === "match") {
      const parts = Object.entries(answer.pairs || {})
        .filter(([, r]) => r)
        .map(([l, r]) => {
          const left = (q.left.find((o) => o.id === l) || {}).text;
          const right = (q.right.find((o) => o.id === r) || {}).text;
          return `${left} → ${right}`;
        });
      return parts.length ? parts.join(" · ") : "—";
    }
    return "—";
  }

  function renderReview() {
    el.rReview.innerHTML = "";
    state.results.forEach((r, i) => {
      const item = document.createElement("div");
      item.className = "review-item " + (r.isCorrect ? "is-correct" : "is-wrong");
      item.innerHTML = `
        <div class="review-head">
          <span class="review-index">Frage ${i + 1}</span>
          <span class="review-verdict">${r.isCorrect ? "Richtig" : "Falsch"}</span>
        </div>
        <p class="review-q">${escapeHtml(r.question.prompt)}</p>
        <p class="review-a"><strong>Deine Antwort:</strong> ${escapeHtml(givenText(r.question, r.answer))}</p>
        ${r.isCorrect ? "" : `<p class="review-a"><strong>${escapeHtml(solutionText(r.question))}</strong></p>`}
        ${r.question.feedback ? `<p class="review-a">${richText(r.question.feedback)}</p>` : ""}
        ${r.question.mitnehmen ? `<p class="review-mitnehmen"><b>Mitnehmen:</b> ${richText(r.question.mitnehmen)}</p>` : ""}`;
      el.rReview.appendChild(item);
    });
  }

  // ------------------------------------------------------------- Speichern --

  async function submit(finishedAt) {
    const participant = loadParticipant() || {};

    const payload = {
      event: EVENT_SLUG,
      island: state.slug,
      quiz_version: String(state.island.version || "1"),
      engine_version: ENGINE_VERSION,
      session_id: sessionId(),
      participant: participant.name || "",
      dealer: participant.dealer || "",
      dealer_number: participant.dealerNumber || "",
      area: participant.area || "",
      started_at: state.startedAt.toISOString(),
      finished_at: finishedAt.toISOString(),
      shuffle_enabled: true,
      page_url: location.href.split("?")[0],
      answers: state.responses
    };
    state.lastPayload = payload;

    if (DEMO) {
      el.rSave.textContent = "Vorschaumodus (?demo=1) — es wurde absichtlich nichts gespeichert.";
      el.btnRetrySave.hidden = true;
      return;
    }

    el.rSave.textContent = "Ergebnis wird gespeichert …";
    el.btnRetrySave.hidden = true;

    try {
      const response = await fetch(SUBMIT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const body = await response.json().catch(() => ({}));

      if (response.ok) {
        el.rSave.textContent = body.duplicate
          ? "Ergebnis war bereits gespeichert."
          : "Ergebnis gespeichert. Danke!";
        return;
      }

      el.rSave.textContent = body.error
        ? `Nicht gespeichert: ${body.error}`
        : `Nicht gespeichert (Fehler ${response.status}).`;
      el.btnRetrySave.hidden = false;
    } catch {
      el.rSave.textContent = "Keine Verbindung. Das Ergebnis wurde noch nicht gespeichert.";
      el.btnRetrySave.hidden = false;
    }
  }

  async function retrySubmit() {
    if (!state.lastPayload) return;
    el.btnRetrySave.disabled = true;
    el.rSave.textContent = "Neuer Versuch …";
    try {
      const response = await fetch(SUBMIT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state.lastPayload)
      });
      const body = await response.json().catch(() => ({}));
      if (response.ok) {
        el.rSave.textContent = "Ergebnis gespeichert. Danke!";
        el.btnRetrySave.hidden = true;
      } else {
        el.rSave.textContent = body.error ? `Nicht gespeichert: ${body.error}` : `Nicht gespeichert (Fehler ${response.status}).`;
      }
    } catch {
      el.rSave.textContent = "Weiterhin keine Verbindung.";
    } finally {
      el.btnRetrySave.disabled = false;
    }
  }

  // ------------------------------------------------------------- Ereignisse --

  el.startForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = validateForm();
    if (!data) return;
    saveParticipant(data);
    el.chipParticipant.textContent = data.name;
    el.chipParticipant.hidden = false;
    beginRound(shuffled(state.island.questions));
  });

  // Händlernummer: alles außer Ziffern fällt schon beim Tippen weg, danach
  // auf fünf kappen. Reihenfolge ist wichtig — sonst frisst das Kappen eine
  // Ziffer aus eingefügtem Text mit Leerzeichen.
  el.fNumber.addEventListener("input", () => {
    const cleaned = el.fNumber.value.replace(/\D/g, "").slice(0, 5);
    if (cleaned !== el.fNumber.value) el.fNumber.value = cleaned;
  });

  el.btnCheck.addEventListener("click", () => {
    if (!state.revealed) { reveal(); return; }
    // Der Knopf bleibt bedienbar und behält den Fokus, nur der zu frühe
    // zweite Tipp zählt nicht. Ein disabled hätte Tastaturnutzern den Fokus
    // aus der Hand genommen.
    if (Date.now() < state.weiterFrei) return;
    advance();
  });

  el.btnAbort.addEventListener("click", () => {
    if (!confirm("Quiz abbrechen? Die bisherigen Antworten gehen verloren.")) return;
    show("start");
  });

  el.btnToIslands.addEventListener("click", () => {
    history.pushState({}, "", "/quiz");
    route();
  });

  el.btnNextIsland.addEventListener("click", () => {
    history.pushState({}, "", "/quiz");
    route();
  });

  el.btnRepeat.addEventListener("click", () => {
    beginRound(shuffled(state.island.questions));
  });

  el.btnWrongOnly.addEventListener("click", () => {
    const wrong = state.results.filter((r) => !r.isCorrect).map((r) => r.question);
    if (!wrong.length) return;
    toast(`${wrong.length} ${wrong.length === 1 ? "Frage" : "Fragen"} zur Wiederholung`);
    beginRound(shuffled(wrong), { repeat: true });
  });

  // Frage- und Feedbackbild lassen sich ebenfalls vergrößern.
  el.qMediaImg.addEventListener("click", () => {
    const q = currentQuestion();
    if (q && q.media) openLightbox(q.media.src, q.media.alt, q.media.caption);
  });
  el.qFeedbackMediaImg.addEventListener("click", () => {
    const q = currentQuestion();
    if (q && q.feedbackMedia) openLightbox(q.feedbackMedia.src, q.feedbackMedia.alt, q.feedbackMedia.caption);
  });

  el.lightboxClose.addEventListener("click", () => el.lightbox.close());
  // Klick auf den abgedunkelten Rand schließt ebenfalls. Das Ereignis trifft
  // den Dialog selbst nur außerhalb seines Inhalts.
  el.lightbox.addEventListener("click", (event) => {
    if (event.target === el.lightbox) el.lightbox.close();
  });
  // Die Bildquelle wird beim Schließen bewusst NICHT geleert: das nächste
  // Öffnen setzt sie ohnehin vor showModal(), es gäbe also kein Nachblitzen —
  // ein geleertes src würde dagegen kurz das Platzhalter-Icon zeigen.

  el.btnRetrySave.addEventListener("click", retrySubmit);
  el.btnErrBack.addEventListener("click", () => {
    history.pushState({}, "", "/quiz");
    route();
  });

  window.addEventListener("popstate", route);
  window.addEventListener("resize", scheduleCampusRoutes, { passive: true });

  // ---------------------------------------------------------------- Start ---

  async function route() {
    // Einzel-Insel-Paket: enthält der Katalog nur eine Insel, gibt es nichts
    // auszuwählen — dann direkt dorthin, ohne Übersicht.
    const einzelinsel = state.catalog.inseln.length === 1;
    const slug = readSlug() || (einzelinsel ? state.catalog.inseln[0].slug : null);

    if (!slug) {
      renderIslands();
      return;
    }

    const known = state.catalog.inseln.find((i) => i.slug === slug);
    if (!known) {
      fail(`Die Insel „${slug}" gibt es nicht. Bitte den QR-Code noch einmal scannen oder eine Insel aus der Übersicht wählen.`);
      return;
    }

    if (state.slug !== slug) {
      try {
        state.island = await fetchJson(`/data/inseln/${slug}.json`);
        state.slug = slug;
      } catch (error) {
        fail("Der Fragensatz konnte nicht geladen werden. Prüfe die Internetverbindung und lade die Seite neu.");
        console.error(error);
        return;
      }
    }

    renderStart();
  }

  async function boot() {
    el.colophon.textContent = DEMO ? "Vorschaumodus: nichts wird gespeichert" : "Wissenscheck";

    try {
      state.catalog = await fetchJson("/data/inseln.json");
    } catch (error) {
      fail("Die Inselübersicht konnte nicht geladen werden. Bitte die Seite neu laden.");
      console.error(error);
      return;
    }

    await route();
  }

  boot();
})();
