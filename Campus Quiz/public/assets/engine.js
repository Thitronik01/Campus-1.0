/* ==========================================================================
   THITRONIK Campus - Wissenscheck, gemeinsame Quiz-Engine
   --------------------------------------------------------------------------
   Eine Engine, sieben Fragensätze. Die Insel steht im Pfad (/quiz/hiddensee),
   die Fragen in /data/inseln/<slug>.json.

   Wichtig: Der Browser sendet nur, WAS gewählt wurde - nie, ob es richtig
   war. Die Bewertung macht die Netlify-Function gegen dieselbe JSON-Datei.
   Damit gibt es genau eine Wahrheitsquelle für die richtigen Antworten.
   ========================================================================== */

"use strict";

(function () {
  const EVENT_SLUG = "campus-2026";
  const ENGINE_VERSION = "1.9.0";
  const SUBMIT_ENDPOINT = "/.netlify/functions/submit-quiz";

  const LS_PARTICIPANT = "thitronik.campus.2026.participant";
  const LS_DONE = "thitronik.campus.2026.done";
  const LS_OUTBOX = "thitronik.campus.2026.ausgang";

  /** Unterscheidet "gar nicht erst rausgekommen" von "Server hat Nein gesagt".
   *  Für den Teilnehmer sind das zwei verschiedene Sätze. */
  const KEIN_NETZ = "Keine Verbindung";

  /** ?demo=1 läuft komplett durch, speichert aber absichtlich nichts.
   *  Gleiche Konvention wie im Feedbackbogen - für Tests immer verwenden. */
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
    arbeitskarteLink: $("arbeitskarte-link"),
    tagesabschluss: $("tagesabschluss"),
    ausgang: $("ausgang"),
    ausgangText: $("ausgang-text"),
    btnAusgangSenden: $("btn-ausgang-senden"),
    taKicker: $("ta-kicker"),
    taTitle: $("ta-title"),
    taDesc: $("ta-desc"),

    startCode: $("start-code"),
    startTitle: $("start-title"),
    startLead: $("start-lead"),
    startFacts: $("start-facts"),
    startDetails: $("start-details"),
    startTypes: $("start-types"),
    samsoeStartVisual: $("samsoe-start-visual"),
    samsoeStartVehicle: $("samsoe-start-vehicle"),
    samsoeStartTechnician: $("samsoe-start-technician"),
    hiddenseeStartVisual: $("hiddensee-start-visual"),
    hiddenseeStartContact: $("hiddensee-start-contact"),
    vejroStartVisual: $("vejro-start-visual"),
    vejroStartLayers: [
      $("vejro-start-light"),
      $("vejro-start-stage"),
      $("vejro-start-access"),
      $("vejro-start-water"),
      $("vejro-start-contact")
    ],
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
    startActions: document.querySelector("#start-form .start-actions"),
    startFields: $("start-fields"),
    participantSummary: $("participant-summary"),
    participantName: $("participant-name"),
    participantMeta: $("participant-meta"),
    btnEditParticipant: $("btn-edit-participant"),
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
    qAudio: $("q-audio"),
    qAudioButton: $("q-audio-button"),
    qAudioProgress: $("q-audio-progress"),
    qAudioTime: $("q-audio-time"),
    qAudioStatus: $("q-audio-status"),
    qAudioFallbackText: $("q-audio-fallback-text"),
    qAudioPlayer: $("q-audio-player"),
    qInput: $("q-input"),
    qFeedback: $("q-feedback"),
    qFeedbackTitle: $("q-feedback-title"),
    qFeedbackCopy: $("q-feedback-copy"),
    qFeedbackSolution: $("q-feedback-solution"),
    qFeedbackMedia: $("q-feedback-media"),
    qFeedbackMediaImg: $("q-feedback-media-img"),
    qFeedbackMediaCaption: $("q-feedback-media-caption"),
    qFeedbackIrrtum: $("q-feedback-irrtum"),
    qFeedbackIrrtumLabel: $("q-feedback-irrtum-label"),
    qFeedbackIrrtumList: $("q-feedback-irrtum-list"),
    qFeedbackMitnehmen: $("q-feedback-mitnehmen"),
    qFeedbackMitnehmenText: $("q-feedback-mitnehmen-text"),

    lightbox: $("lightbox"),
    lightboxImage: $("lightbox-image"),
    lightboxCaption: $("lightbox-caption"),
    lightboxClose: $("lightbox-close"),
    abortDialog: $("abort-dialog"),
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
    rRest: $("r-rest"),
    rTopics: $("r-topics"),
    rTopicsBlock: $("r-topics-block"),
    rReview: $("r-review"),
    btnRetrySave: $("btn-retry-save"),
    btnWrongOnly: $("btn-wrong-only"),
    btnFeedback: $("btn-feedback"),
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
    lastSession: null,   // session_id der zuletzt beendeten Runde
    sendetGerade: false,
    isRepeatRound: false,
    weiterFrei: 0       // Zeitpunkt, ab dem "Nächste Frage" wieder zählt
  };

  // ------------------------------------------------------------- Helfer ----

  function show(name) {
    if (name !== "quiz" && el.qAudioPlayer) {
      el.qAudioPlayer.pause();
    }
    Object.entries(el.screens).forEach(([key, node]) => {
      node.hidden = key !== name;
    });
    el.mastheadProgress.hidden = name !== "islands";
    // Der Ausgangshinweis hängt am Bildschirm, nicht am Sendezustand.
    if (el.ausgang) paintAusgang();
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function toast(message, ms = 2600) {
    el.toast.textContent = message;
    delete el.toast.dataset.closing;
    el.toast.hidden = false;
    clearTimeout(toast._t);
    clearTimeout(toast._hide);
    toast._t = setTimeout(() => {
      el.toast.dataset.closing = "true";
      toast._hide = setTimeout(() => {
        el.toast.hidden = true;
        delete el.toast.dataset.closing;
      }, 140);
    }, ms);
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

  /** Fisher-Yates. Ohne Seed - „gleiche Reihenfolge wiederholen" arbeitet
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
   *  Der Fragenkatalog hebt in den Auflösungen einzelne Wörter hervor - die
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
    if (next.audio && next.audio.src) {
      const audio = document.createElement("audio");
      audio.preload = "metadata";
      audio.src = next.audio.src;
    }
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

  const AREA_LABELS = {
    verkauf: "Verkauf",
    werkstatt: "Werkstatt",
    "verkauf-werkstatt": "Verkauf und Werkstatt",
    leitung: "Betriebsleitung",
    sonstiges: "Sonstiges"
  };

  /** Dieselben drei Pflichtfelder, die validateForm() prüft - nur ohne
   *  Fehlermeldung und Fokussprung. Der Tätigkeitsbereich bleibt freiwillig
   *  und darf die Zusammenfassung deshalb nicht verhindern. */
  function participantComplete(data) {
    if (!data) return false;
    return String(data.name || "").trim().length >= 2
      && String(data.dealer || "").trim().length >= 2
      && /^\d{5}$/.test(String(data.dealerNumber || "").trim());
  }

  /** Auf VEJRØ wechseln die drei Starthinweise nach rechts, sobald die
   *  Angaben vollständig sind. Beim Bearbeiten kehren sie in den Hero
   *  zurück, damit das lange Formular nicht noch mehr Inhalt tragen muss. */
  function placeStartFacts(byParticipant) {
    const rechts = byParticipant && state.island?.island === "vejro";
    el.startForm.classList.toggle("has-participant-facts", rechts);
    if (rechts) {
      el.startForm.insertBefore(el.startFacts, el.startActions);
    } else {
      el.startDetails.parentElement.insertBefore(el.startFacts, el.startDetails);
    }
  }

  /** Vollständige Angaben werden zur Zeile zusammengefaltet: Sie sind
   *  gespeichert, ihre erneute Eingabe ist also keine Aufgabe mehr, sondern
   *  eine Störung vor der eigentlichen - dem Quiz. Das Formular bleibt im
   *  Dokument und ist über "Angaben ändern" einen Klick entfernt. */
  function showParticipantSummary(data) {
    el.participantName.textContent = data.name;
    const teile = [data.dealer, "Händlernummer " + data.dealerNumber];
    const bereich = AREA_LABELS[data.area];
    if (bereich) teile.push(bereich);
    el.participantMeta.textContent = teile.join(", ");
    el.participantSummary.hidden = false;
    el.startFields.hidden = true;
    placeStartFacts(true);
  }

  function showParticipantForm(focus) {
    el.participantSummary.hidden = true;
    el.startFields.hidden = false;
    placeStartFacts(false);
    if (focus) el.fName.focus();
  }

  function loadDone() {
    try {
      const raw = localStorage.getItem(LS_DONE);
      const parsed = raw ? JSON.parse(raw) : {};
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch { return {}; }
  }

  /** Die session_id wird mitgeschrieben, damit die Übersicht später sagen
   *  kann, ob zu dieser Insel noch etwas im Ausgang liegt. Altbestand ohne
   *  session gilt als versendet - ein Ergebnis, das es nicht mehr gibt,
   *  lässt sich ohnehin nicht nachreichen. */
  function markDone(slug, percent, sessionId) {
    try {
      const done = loadDone();
      done[slug] = { percent, at: new Date().toISOString(), session: sessionId || null };
      localStorage.setItem(LS_DONE, JSON.stringify(done));
    } catch { /* privater Modus */ }
  }

  // -------------------------------------------------------- Sende-Ausgang ---

  /* Ein Ergebnis ist erst dann sicher, wenn der Server es bestätigt hat.
     Bis dahin liegt es hier - auf der Platte, nicht im Arbeitsspeicher. Das
     ist der Unterschied zwischen "wird nachgesendet" und "weg, sobald der
     Tab zugeht". In einer Halle mit einem Balken Empfang ist der zweite Fall
     der Regelfall, nicht die Ausnahme.

     Wiedereinsenden ist gefahrlos: session_id ist in der Datenbank unique,
     und die Function antwortet auf ein bereits bekanntes Ergebnis mit
     200 { duplicate: true } statt einen zweiten Datensatz anzulegen. */

  /** Was sich nicht speichern ließ (privater Modus, Speicher voll). Hält
   *  nur bis zum Schließen des Tabs - besser als gar nichts, und der
   *  Statustext sagt in diesem Fall auch nichts anderes. */
  const fluechtig = [];

  function outboxLoad() {
    try {
      const raw = localStorage.getItem(LS_OUTBOX);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed.filter((e) => e && e.payload && e.payload.session_id) : [];
    } catch { return []; }
  }

  function outboxSave(list) {
    try { localStorage.setItem(LS_OUTBOX, JSON.stringify(list)); return true; }
    catch { return false; }
  }

  function outboxAlle() {
    return outboxLoad().concat(fluechtig);
  }

  function outboxAdd(payload) {
    const eintrag = { payload, versuche: 0, fehler: null, blockiert: false };
    const liste = outboxLoad();
    liste.push(eintrag);
    if (!outboxSave(liste)) fluechtig.push(eintrag);
  }

  function outboxErsetzen(eintrag) {
    // Ein flüchtiger Eintrag liegt bereits per Referenz richtig.
    if (fluechtig.includes(eintrag)) return;
    outboxSave(outboxLoad().map((e) =>
      e.payload.session_id === eintrag.payload.session_id ? eintrag : e));
  }

  function outboxEntfernen(sessionId) {
    const i = fluechtig.findIndex((e) => e.payload.session_id === sessionId);
    if (i >= 0) fluechtig.splice(i, 1);
    outboxSave(outboxLoad().filter((e) => e.payload.session_id !== sessionId));
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
    // Was noch im Ausgang liegt, darf auf der Kachel nicht wie erledigt
    // aussehen - es ist auf diesem Gerät fertig, aber nirgends angekommen.
    const wartend = new Set(outboxAlle().map((e) => e.payload.session_id));
    el.islandGrid.innerHTML = "";
    // "1 von 7" ist die Aussage, die jemand am Aufsteller braucht. Der
    // Prozentwert ist dieselbe Zahl in ungenauer - er bleibt als Skala
    // stehen, tritt aber zurück. Für die Vorlesehilfe ersetzt aria-valuetext
    // die nackten "14", die als Fortschritt nichts aussagen.
    const fortschrittText = `${abgeschlossen} von ${total} ${total === 1 ? "Insel" : "Inseln"} abgeschlossen`;
    el.campusProgressValue.textContent = `${fortschritt} %`;
    el.campusProgressCopy.textContent = fortschrittText;
    el.campusProgressTrack.setAttribute("aria-valuenow", String(fortschritt));
    el.campusProgressTrack.setAttribute("aria-valuetext", fortschrittText);
    el.campusProgressFill.style.width = `${fortschritt}%`;

    state.catalog.inseln.forEach((island, index) => {
      const entry = done[island.slug];
      // Altbestand ohne session gilt als versendet.
      const unterwegs = Boolean(entry && entry.session && wartend.has(entry.session));
      const li = document.createElement("li");
      li.className = `island-map-item island-${island.slug}`;
      li.style.setProperty("--island-order", index);
      const card = document.createElement("button");
      card.type = "button";
      card.className = "island-card" + (entry ? (unterwegs ? " is-warten" : " is-done") : "");
      if (entry) card.style.setProperty("--score", Math.max(0, Math.min(100, Number(entry.percent) || 0)));
      card.innerHTML = `
        ${island.image ? `<span class="i-visual" aria-hidden="true"><img src="${escapeHtml(island.image)}" alt="" loading="lazy"></span>` : ""}
        <span class="i-content">
          <span class="i-code">${escapeHtml(island.code)}</span>
          <span class="i-title">${escapeHtml(island.title)}</span>
          <span class="i-desc">${escapeHtml(island.beschreibung)}</span>
          <span class="i-state">${escapeHtml(!entry
            ? "Noch nicht begonnen"
            : unterwegs
              ? `Abgeschlossen · ${entry.percent} % - noch nicht gesendet`
              : `Abgeschlossen · ${entry.percent} %`)}</span>
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

    // Der Tagesabschluss steht nur da, wo es ihn wirklich gibt: Die Adresse
    // kommt aus dem Katalog, und die schreibt der Generator allein ins
    // Gesamtpaket. In der Quelle und in den Einzelpaketen fuehrte eine fest
    // verdrahtete Verknuepfung ins Leere.
    if (state.catalog.feedback) {
      const fertig = total > 0 && abgeschlossen === total;
      el.tagesabschluss.href = state.catalog.feedback;
      el.tagesabschluss.hidden = false;
      el.tagesabschluss.classList.toggle("is-ready", fertig);
      el.taKicker.textContent = fertig ? "Expedition abgeschlossen" : "Tagesabschluss";
      el.taTitle.textContent = fertig
        ? `Alle ${total} ${total === 1 ? "Insel" : "Inseln"} geschafft`
        : "Feedbackbogen";
      el.taDesc.textContent = fertig
        ? "Es fehlt nur noch deine Rückmeldung zum Tag."
        : "Deine Rückmeldung zur Schulung, etwa sechs Minuten. Geht auch, bevor alle Inseln erledigt sind.";
    } else {
      el.tagesabschluss.hidden = true;
    }

    if (state.catalog.arbeitskarte) {
      el.arbeitskarteLink.href = state.catalog.arbeitskarte;
      el.arbeitskarteLink.hidden = false;
    } else {
      el.arbeitskarteLink.hidden = true;
    }

    el.mastheadTitle.textContent = "Wissenscheck";
    el.mastheadMeta.hidden = true;
    show("islands");
    scheduleCampusRoutes();
  }

  // ------------------------------------------------------------ Startbild ---

  /** Enthält der Katalog nur eine Insel, gibt es keine Übersicht - dann
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
        if (!image.getAttribute("src")) {
          // Beide Ebenen bilden gemeinsam das Startmotiv und liegen sofort im
          // sichtbaren Bereich. Der Browser soll sie deshalb nicht hinter
          // spaeteren Quizbildern einreihen.
          image.loading = "eager";
          image.decoding = "async";
          image.fetchPriority = "high";
          image.src = image.dataset.src;
        }
      });
    }
    if (isHiddensee && !el.hiddenseeStartContact.getAttribute("src")) {
      el.hiddenseeStartContact.src = el.hiddenseeStartContact.dataset.src;
    }
    if (isVejro) {
      el.vejroStartLayers.forEach((image) => {
        if (!image.getAttribute("src")) {
          image.loading = "eager";
          image.decoding = "async";
          image.fetchPriority = "high";
          image.src = image.dataset.src;
        }
      });
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
    // hinüber - dann darf hier auch nichts anderes stehen.
    el.formIntro.textContent = istEinzelinsel()
      ? "Damit lässt sich dein Ergebnis der Schulung zuordnen."
      : "Einmal ausfüllen - für die weiteren Inseln bleiben die Angaben gespeichert.";

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

    // Reihenfolge nach dem, was vor dem Start zählt: Umfang, Zeitbedarf,
    // kein Druck, sofortige Auflösung. "ca." steht bewusst dabei - die
    // Angabe ist eine Einschätzung, keine Messung.
    // Zeitbedarf und "kein Zeitlimit" stehen in einer Zeile: Es ist dieselbe
    // Auskunft - wie lange es dauert und dass niemand gehetzt wird.
    const minuten = Number(island.dauerMinuten) || 0;
    el.startFacts.innerHTML = "";
    [
      { klasse: "fact-fragen", text: `${count} ${count === 1 ? "Frage" : "Fragen"}` },
      { klasse: "fact-zeit", text: minuten
          ? `ca. ${minuten} Minuten - kein Zeitlimit`
          : "Kein Zeitlimit - es geht nicht um Tempo" },
      { klasse: "fact-aufloesung", text: "Nach jeder Antwort gibt es sofort die Auflösung" }
      , ...(island.questions.some((q) => q.audio && q.audio.src)
        ? [{ klasse: "fact-audio", text: "Ton einschalten oder Kopfhörer nutzen - eine Frage enthält Audio" }]
        : [])
    ].forEach((fakt) => {
      const li = document.createElement("li");
      li.className = fakt.klasse;
      li.textContent = fakt.text;
      el.startFacts.appendChild(li);
    });

    // Die Fragetypen beschreiben die Bedienung, nicht den Inhalt. Wer vor
    // dem Aufsteller steht, entscheidet nicht danach, ob er anfängt - sie
    // bleiben abrufbar, nehmen aber keinen Platz mehr vor dem Knopf weg.
    el.startTypes.textContent = `Fragetypen: ${[...types].map((t) => typeNames[t] || t).join(", ")}`;
    // Auf VEJRØ ist die kurze Fragetyp-Information direkt sichtbar. Der
    // zusätzliche Aufklappknopf konkurrierte dort mit der Produktbühne.
    el.startDetails.open = isVejro;

    // "internerHinweis" wird bewusst NICHT angezeigt. Das sind redaktionelle
    // Notizen an uns ("Menüpfade gegenprüfen", "Feld media ergänzen") - auf
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

    if (participantComplete(saved)) showParticipantSummary(saved);
    else showParticipantForm(false);

    show("start");
  }

  // --------------------------------------------------------- Validierung ---

  function setFieldError(input, errorNode, message) {
    const field = input.closest(".field");

    // Die Meldung wird an das Feld gebunden. Ohne das meldet ein Screenreader
    // beim Sprung ins Feld nur "ungültig" und verschweigt den Grund - die
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
    // Feedbackbogen - erst putzen, dann prüfen, kein maxlength.
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

    const hatMedienbild = Boolean(q.media && q.media.src);
    el.screens.quiz.dataset.hasMedia = String(hatMedienbild);
    el.screens.quiz.dataset.mediaLayout = hatMedienbild
      ? (q.media.layout || q.layout || "landscape")
      : "none";

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

    if (hatMedienbild) {
      el.qMediaImg.src = q.media.src;
      el.qMediaImg.alt = q.media.alt || "";
      el.qMediaImg.dataset.layout = q.media.layout || q.layout || "landscape";
      el.qMediaCaption.textContent = q.media.caption || "Zum Vergrößern antippen";
      el.qMedia.hidden = false;
    } else el.qMedia.hidden = true;

    renderAudio(q);

    el.qFeedback.hidden = true;
    el.qFeedback.className = "feedback";
    el.qFeedbackMedia.hidden = true;
    el.qFeedbackIrrtum.hidden = true;
    el.qFeedbackMitnehmen.hidden = true;
    el.btnCheck.textContent = "Antwort prüfen";
    el.btnCheck.disabled = true;

    renderInput(q);

    // preventScroll, weil der Browser sonst nur so weit scrollt, bis die
    // Überschrift eben im Bild ist - bei einer langen Frage steht man dann
    // mitten im Text. Der Blick gehört an den Anfang der Frage.
    el.qTitle.focus({ preventScroll: true });
    el.screens.quiz.scrollIntoView({ block: "start", behavior: scrollArt() });

    preloadNext();
  }

  function formatAudioTime(seconds) {
    const safe = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
    return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, "0")}`;
  }

  function paintAudioProgress() {
    const player = el.qAudioPlayer;
    const duration = Number.isFinite(player.duration) ? player.duration : 0;
    const current = Number.isFinite(player.currentTime) ? player.currentTime : 0;
    el.qAudioProgress.value = duration ? (current / duration) * 100 : 0;
    el.qAudioTime.textContent = `${formatAudioTime(current)} / ${formatAudioTime(duration)}`;
  }

  function renderAudio(q) {
    const player = el.qAudioPlayer;
    player.pause();
    player.removeAttribute("src");
    player.load();
    el.qAudioButton.textContent = "Ton abspielen";
    el.qAudioButton.setAttribute("aria-pressed", "false");
    el.qAudioStatus.textContent = "";
    el.qAudioProgress.value = 0;
    el.qAudioTime.textContent = "0:00 / 0:00";
    if (!q.audio || !q.audio.src) {
      el.qAudio.hidden = true;
      return;
    }
    player.src = q.audio.src;
    player.load();
    el.qAudioFallbackText.textContent = q.audio.fallbackText || "Für diesen Ton ist keine Textbeschreibung hinterlegt.";
    el.qAudio.hidden = false;
  }

  /** Aktueller Antwortstand der laufenden Frage. Von den Renderern gefüllt. */
  let draft = null;

  function updateCheckState() {
    const q = currentQuestion();
    let ready = false;
    let status = "";

    if (q.type === "single" || q.type === "truefalse") {
      ready = draft.selected.length === 1;
      // Die sichtbare Bedienhilfe steht bereits direkt über den Antworten.
      // Eine zweite gleichlautende Zeile unter dem Button erzeugt dort nur
      // Unruhe; der deaktivierte Button bildet den Zustand zusätzlich ab.
      status = "";
    } else if (q.type === "multi") {
      ready = draft.selected.length > 0;
      status = ready
        ? `${draft.selected.length} ausgewählt`
        : "Wähle alle zutreffenden Antworten.";
    } else if (q.type === "order") {
      ready = draft.order.length === q.items.length;
      status = ready
        ? "Reihenfolge vollständig."
        : `${draft.order.length} von ${q.items.length} gesetzt - tippe die Schritte in der richtigen Reihenfolge an.`;
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
        // Antwort. Sie müssen dastehen, sobald die Frage erscheint - sonst
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
        // Kachel und Lupe nebeneinander im Wrapper - sonst stünde ein Button
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
        <span class="order-rank" aria-hidden="true">-</span>
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
      rank.textContent = pos >= 0 ? String(pos + 1) : "-";
      node.classList.toggle("is-picked", pos >= 0);
      node.setAttribute("aria-label",
        `${node.querySelector(".order-text").textContent} - ${pos >= 0 ? `Position ${pos + 1}` : "noch nicht gesetzt"}`);
    });
  }

  // --- Zuordnung -----------------------------------------------------------

  function renderMatch(q) {
    draft = { pairs: {} };
    q.left.forEach((item) => { draft.pairs[item.id] = ""; });

    // Die Auswahlliste wird einmal je Frage gemischt, nicht je Zeile: alle
    // Zeilen zeigen dieselbe Reihenfolge, sonst müsste man in jeder Zeile
    // neu suchen. Vorher stand sie unverändert in der Reihenfolge der
    // Quelldatei - und dort steht die Lösung meist der Reihe nach (erster
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

  /** Clientseitige Bewertung - ausschließlich für die Sofortanzeige.
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
   *  Alt-Text die einzige Benennung - sonst bliebe die Auflösungszeile leer. */
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
      return `Richtig ${texts.length > 1 ? "wären" : "wäre"}: ${texts.join("; ")}`;
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
      return parts.join("; ");
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
   *  angekreuzt wurde - eine richtige, wenn sie fehlt. Genau so sind die
   *  Absätze geschrieben: „Sensor defekt" (gewählt) steht neben „Blinkcode
   *  weggelassen" (nicht gewählt).
   *
   *  Reihenfolge- und Zuordnungsfragen haben keine Optionen, auf die sich das
   *  beziehen ließe. Dort bleiben die Absätze unmarkiert - sie gelten ohnehin
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

  /** Alle Irrtümer erscheinen als Lerninhalt. Nach einer richtigen Antwort
   *  heißen sie neutral „Typische Fehler“; „Falsch gewählt?“ wäre dort eine
   *  falsche Aussage über die Leistung des Teilnehmers. Bei einer falschen
   *  Antwort wird der eigene Irrtum weiterhin benannt und nicht nur
   *  eingefärbt, damit die Zuordnung auch ohne Farbwahrnehmung ankommt. */
  function renderIrrtum(q, answer, isCorrect) {
    const eintraege = Array.isArray(q.irrtum) ? q.irrtum : [];
    if (!eintraege.length) {
      el.qFeedbackIrrtum.hidden = true;
      return;
    }

    el.qFeedbackIrrtumLabel.textContent = isCorrect ? "Typische Fehler" : "Falsch gewählt?";
    el.qFeedbackIrrtumList.innerHTML = "";
    eintraege.forEach((eintrag) => {
      const marke = irrtumMarke(eintrag, q, answer);
      const li = document.createElement("li");
      li.className = "irrtum-item" + (marke ? " is-mine" : "");
      li.innerHTML = `<b>${richText(eintrag.titel)}${marke ? ` - ${marke}` : ""}:</b> ` +
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

    // Erklärbild zur Auflösung - im Fehmarn-Quiz zeigt das etwa den
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

    renderIrrtum(q, answer, isCorrect);

    // Der Mitnehmen-Satz steht zuletzt, nach Auflösung, Bild und Irrtümern:
    // Er ist das, was nach der Frage übrig bleiben soll - eine Faustregel oder
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
    // wechselt an derselben Stelle von "Antwort prüfen" auf "Nächste Frage" -
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
      percent === 100 ? "Alles richtig - sehr gut."
        : percent >= 80 ? "Sitzt. Die wichtigsten Punkte sind angekommen."
          : percent >= 60 ? "Solide Grundlage, ein paar Details lohnen den zweiten Blick."
            : "Schau dir die markierten Punkte noch einmal an - genau dafür ist der Check da.";

    renderTopics();
    renderReview();

    const wrong = state.results.filter((r) => !r.isCorrect);
    el.btnWrongOnly.hidden = wrong.length === 0;
    el.btnNextIsland.hidden = istEinzelinsel();

    if (!state.isRepeatRound) {
      const payload = buildPayload(finishedAt);
      markDone(state.slug, percent, payload.session_id);
      submit(payload);
    } else {
      el.rSave.textContent = "Wiederholungsrunde - sie wird nicht zusätzlich gespeichert.";
      el.btnRetrySave.hidden = true;
    }

    // Erst nach markDone: sonst stünde die gerade beendete Insel noch in der
    // Liste der offenen.
    paintRest();

    show("result");

    // Der Ring steht erst auf 0, ein erzwungener Reflow macht diesen Stand
    // zum Ausgangswert, dann folgt der Zielwert - der Übergang läuft.
    // Bewusst synchron statt in requestAnimationFrame: rAF ruht in einem
    // Tab, das gerade nicht im Vordergrund ist. Wer beim Absenden kurz die
    // App wechselt, käme sonst auf einen Ring zurück, der auf null steht,
    // während daneben "80 %" steht. Hier hängt nur die Bewegung am Übergang,
    // nie der Endstand.
    void el.rRing.offsetWidth;
    el.rRing.style.setProperty("--pct", String(percent));
  }

  /** Was heute noch aussteht. Der Knopf daneben heißt "Nächste Insel" -
   *  dann darf daneben auch stehen, welche das überhaupt noch sein können. */
  function paintRest() {
    if (istEinzelinsel()) {
      el.rRest.hidden = true;
      if (el.btnFeedback) el.btnFeedback.hidden = true;
      el.btnWrongOnly.classList.add("btn-primary");
      el.btnWrongOnly.classList.remove("btn-secondary");
      return;
    }

    const done = loadDone();
    const offen = state.catalog.inseln.filter((i) => !done[i.slug]);
    const tagesabschlussBereit = offen.length === 0 && Boolean(state.catalog.feedback);

    el.rRest.textContent = offen.length
      ? `Noch offen: ${offen.map((i) => i.code).join(", ")}`
      : "Alle Inseln geschafft. Schließ den Tag jetzt mit deiner Rückmeldung ab.";
    el.rRest.hidden = false;

    if (el.btnFeedback) {
      el.btnFeedback.hidden = !tagesabschlussBereit;
      if (tagesabschlussBereit) el.btnFeedback.href = state.catalog.feedback;
    }
    // Auf dem letzten Ergebnis ist der Tagesabschluss die eine primäre
    // Handlung. Eine eventuelle Wiederholung bleibt erreichbar, tritt aber
    // visuell dahinter zurück.
    el.btnWrongOnly.classList.toggle("btn-primary", !tagesabschlussBereit);
    el.btnWrongOnly.classList.toggle("btn-secondary", tagesabschlussBereit);
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
    // Form - die steht ohnehin darunter.
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
      return v === "richtig" ? "Richtig" : v === "falsch" ? "Falsch" : "-";
    }
    if (q.type === "single" || q.type === "multi") {
      const texts = (answer.selected || [])
        .map((id) => optionLabel(q.options.find((o) => o.id === id)))
        .filter(Boolean);
      return texts.length ? texts.join("; ") : "-";
    }
    if (q.type === "order") {
      const texts = (answer.order || [])
        .map((id) => (q.items.find((o) => o.id === id) || {}).text)
        .filter(Boolean);
      return texts.length ? texts.join(" → ") : "-";
    }
    if (q.type === "match") {
      const parts = Object.entries(answer.pairs || {})
        .filter(([, r]) => r)
        .map(([l, r]) => {
          const left = (q.left.find((o) => o.id === l) || {}).text;
          const right = (q.right.find((o) => o.id === r) || {}).text;
          return `${left} → ${right}`;
        });
      return parts.length ? parts.join("; ") : "-";
    }
    return "-";
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

  function buildPayload(finishedAt) {
    const participant = loadParticipant() || {};

    return {
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
  }

  /** Nimmt das Ergebnis entgegen: erst auf die Platte, dann ins Netz. Die
   *  Reihenfolge ist der ganze Punkt - was hier zuerst gesendet und erst bei
   *  Erfolg gespeichert würde, wäre bei jedem Funkloch verloren. */
  function submit(payload) {
    if (DEMO) {
      el.rSave.textContent = "Vorschaumodus (?demo=1) - es wurde absichtlich nichts gespeichert.";
      el.btnRetrySave.hidden = true;
      return;
    }

    state.lastSession = payload.session_id;
    outboxAdd(payload);
    el.rSave.textContent = "Ergebnis wird gesendet …";
    el.btnRetrySave.hidden = true;
    flushOutbox();
  }

  /** Einen einzelnen Eintrag loswerden.
   *  → "ok"         gespeichert (oder war es schon)
   *  → "netz"       vorübergehend, später erneut versuchen
   *  → "abgelehnt"  der Server will genau diesen Datensatz nicht */
  async function sendeEinen(eintrag) {
    let response;
    try {
      response = await fetch(SUBMIT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eintrag.payload)
      });
    } catch {
      eintrag.fehler = KEIN_NETZ;
      return "netz";
    }

    const body = await response.json().catch(() => ({}));
    if (response.ok) return "ok";

    // Vor der späteren Datenbankphase nimmt Netlify Forms die bereits
    // serverseitig geprüften Ergebnisse als Pilotdaten an. Die Function
    // liefert dafür ausschließlich die berechnete Zusammenfassung zurück;
    // die korrekten Antworten selbst bleiben weiterhin im Servercode.
    if (body.fallback === "netlify_forms") {
      try {
        await sendeNetlifyPilot(eintrag.payload, body.pilot || {});
        return "ok";
      } catch {
        eintrag.fehler = "Netlify Forms ist noch nicht aktiviert oder nicht erreichbar.";
        return "netz";
      }
    }

    // 5xx, 408 und 429 gehen vorbei - hierher gehört auch der Fall, dass die
    // Migration noch nicht eingespielt ist: sobald die Tabelle steht, kommen
    // die liegengebliebenen Ergebnisse von selbst durch. Ein 400 dagegen ist
    // eine Absage an diesen Datensatz; ihn im Minutentakt erneut zu schicken
    // ändert daran nichts.
    const spaeter = response.status >= 500 || response.status === 408 || response.status === 429;
    eintrag.fehler = body.error || `Fehler ${response.status}`;
    return spaeter ? "netz" : "abgelehnt";
  }

  async function sendeNetlifyPilot(payload, pilot) {
    const fields = new URLSearchParams({
      "form-name": "campus-quiz-result",
      session_id: payload.session_id,
      event: payload.event,
      island: payload.island,
      quiz_version: payload.quiz_version,
      engine_version: payload.engine_version,
      participant: payload.participant,
      dealer: payload.dealer,
      dealer_number: payload.dealer_number,
      area: payload.area,
      started_at: payload.started_at,
      finished_at: payload.finished_at,
      page_url: payload.page_url,
      score: String(pilot.score ?? ""),
      total: String(pilot.total ?? ""),
      percent: String(pilot.percent ?? ""),
      answers_json: JSON.stringify(payload.answers)
    });

    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: fields.toString()
    });
    if (!response.ok) throw new Error(`Netlify Forms: HTTP ${response.status}`);
  }

  /** Arbeitet den Ausgang ab. Läuft beim Seitenaufruf, nach jeder Runde,
   *  sobald der Browser wieder online meldet und auf Knopfdruck.
   *  `force` nimmt auch die abgelehnten Einträge noch einmal mit. */
  async function flushOutbox({ force = false } = {}) {
    if (DEMO || state.sendetGerade) return;

    const offen = outboxAlle().filter((e) => force || !e.blockiert);
    if (!offen.length) { paintAusgang(); return; }

    state.sendetGerade = true;
    paintAusgang();

    let gesendet = 0;
    for (const eintrag of offen) {
      const ergebnis = await sendeEinen(eintrag);
      if (ergebnis === "ok") {
        outboxEntfernen(eintrag.payload.session_id);
        gesendet += 1;
        continue;
      }
      eintrag.versuche += 1;
      eintrag.blockiert = ergebnis === "abgelehnt";
      outboxErsetzen(eintrag);
      // Kein Netz heißt: für die übrigen gilt dasselbe. Der nächste
      // Anlauf kommt beim online-Ereignis oder beim nächsten Aufruf.
      if (ergebnis === "netz") break;
    }

    state.sendetGerade = false;
    if (!el.screens.islands.hidden) renderIslands();
    paintAusgang();

    // Nachgesendet, während der Teilnehmer längst woanders ist: dann sagt
    // es der Toast, denn das Ergebnisbild von damals sieht niemand mehr.
    if (gesendet && el.screens.result.hidden) {
      toast(gesendet === 1 ? "Ergebnis nachgesendet." : `${gesendet} Ergebnisse nachgesendet.`);
    }
  }

  // ------------------------------------------------------ Ausgang anzeigen ---

  function paintAusgang() {
    const offen = outboxAlle();

    // Nicht mitten in einer Frage, und nicht auf dem Ergebnisbild: dort steht
    // die Zeile unter dem Ring, und zwar genauer - sie spricht von dieser
    // Runde statt von "zwei Ergebnissen".
    const stoerend = !el.screens.quiz.hidden || !el.screens.result.hidden;

    if (!offen.length || stoerend) {
      el.ausgang.hidden = true;
    } else {
      el.ausgang.hidden = false;
      el.ausgang.classList.toggle("is-fehler", offen.every((e) => e.blockiert));
      el.ausgangText.textContent = ausgangSatz(offen);
      el.btnAusgangSenden.disabled = state.sendetGerade;
      el.btnAusgangSenden.textContent = state.sendetGerade ? "Sendet …" : "Jetzt senden";
    }

    paintSpeicherstand(offen);
  }

  function ausgangSatz(offen) {
    const n = offen.length;
    const kopf = n === 1 ? "Ein Ergebnis liegt" : `${n} Ergebnisse liegen`;

    if (state.sendetGerade) return `${kopf} noch auf diesem Gerät - wird gerade gesendet …`;

    if (offen.every((e) => e.blockiert)) {
      return `${kopf} auf diesem Gerät und ${n === 1 ? "wurde" : "wurden"} vom Server nicht angenommen `
        + `(${offen[0].fehler}). Bitte bei der Schulungsleitung melden - die Daten sind noch da, `
        + `solange diese Seite auf dem Gerät nicht gelöscht wird.`;
    }

    // Ein Serverfehler ist etwas anderes als ein Funkloch - beim fehlenden
    // Migrationsstand hilft es niemandem, auf besseren Empfang zu warten.
    const serverfehler = offen.find((e) => e.fehler && e.fehler !== KEIN_NETZ);
    if (serverfehler) {
      return `${kopf} noch auf diesem Gerät. Der Server konnte zuletzt nicht speichern `
        + `(${serverfehler.fehler}) - es wird automatisch weiter versucht.`;
    }

    return `${kopf} noch auf diesem Gerät. Sobald wieder Netz da ist, `
      + `${n === 1 ? "geht es" : "gehen sie"} automatisch raus - spätestens beim nächsten Aufruf dieser Seite.`;
  }

  /** Die Zeile unter dem Ergebnisring. Sie spricht nur über die Runde, die
   *  gerade gelaufen ist, nicht über den ganzen Ausgang. */
  function paintSpeicherstand(offen) {
    if (DEMO || state.isRepeatRound || !state.lastSession) return;

    const eigen = offen.find((e) => e.payload.session_id === state.lastSession);

    if (!eigen) {
      el.rSave.textContent = "Ergebnis gespeichert. Danke!";
      el.btnRetrySave.hidden = true;
      return;
    }

    if (state.sendetGerade) {
      el.rSave.textContent = "Ergebnis wird gesendet …";
      el.btnRetrySave.hidden = true;
      return;
    }

    if (eigen.blockiert) {
      el.rSave.textContent = `Nicht gespeichert: ${eigen.fehler}. Das Ergebnis bleibt auf dem Gerät - bitte der Schulungsleitung Bescheid geben.`;
    } else if (eigen.fehler && eigen.fehler !== KEIN_NETZ) {
      // Der Server war erreichbar und hat trotzdem nicht gespeichert. Der
      // Grund gehört hierhin: solange die Migration fehlt, steht hier genau
      // das, und niemand sucht den Fehler beim Funknetz.
      el.rSave.textContent = `Der Server konnte gerade nicht speichern (${eigen.fehler}). Das Ergebnis liegt auf dem Gerät und wird automatisch nachgesendet.`;
    } else {
      el.rSave.textContent = "Noch keine Verbindung. Das Ergebnis liegt auf dem Gerät und wird automatisch nachgesendet.";
    }
    el.btnRetrySave.hidden = false;
  }

  // ------------------------------------------------------------- Ereignisse --

  el.startForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Bei zusammengefalteten Angaben zeigte eine Fehlermeldung sonst auf ein
    // Feld, das gerade niemand sieht - und der Fokussprung ginge ins Leere.
    let data = validateForm();
    if (!data && el.startFields.hidden) {
      showParticipantForm(false);
      data = validateForm();
    }
    if (!data) return;
    saveParticipant(data);
    el.chipParticipant.textContent = data.name;
    el.chipParticipant.hidden = false;
    beginRound(shuffled(state.island.questions));
  });

  // Händlernummer: alles außer Ziffern fällt schon beim Tippen weg, danach
  // auf fünf kappen. Reihenfolge ist wichtig - sonst frisst das Kappen eine
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

  el.qAudioButton.addEventListener("click", async () => {
    const player = el.qAudioPlayer;
    if (!player.src) return;
    if (!player.paused) {
      player.pause();
      el.qAudioButton.textContent = "Ton fortsetzen";
      el.qAudioButton.setAttribute("aria-pressed", "false");
      el.qAudioStatus.textContent = "Ton pausiert.";
      return;
    }
    try {
      await player.play();
      el.qAudioButton.textContent = "Ton pausieren";
      el.qAudioButton.setAttribute("aria-pressed", "true");
      el.qAudioStatus.textContent = "Ton wird abgespielt.";
    } catch {
      el.qAudioStatus.textContent = "Der Ton konnte nicht abgespielt werden. Nutze die Textbeschreibung darunter.";
    }
  });
  el.qAudioPlayer.addEventListener("loadedmetadata", paintAudioProgress);
  el.qAudioPlayer.addEventListener("timeupdate", paintAudioProgress);
  el.qAudioPlayer.addEventListener("ended", () => {
    el.qAudioButton.textContent = "Ton noch einmal abspielen";
    el.qAudioButton.setAttribute("aria-pressed", "false");
    el.qAudioStatus.textContent = "Ton beendet.";
    paintAudioProgress();
  });
  el.qAudioPlayer.addEventListener("error", () => {
    if (el.qAudio.hidden) return;
    el.qAudioButton.disabled = true;
    el.qAudioStatus.textContent = "Audiodatei nicht verfügbar. Nutze die Textbeschreibung darunter.";
  });
  el.qAudioPlayer.addEventListener("canplay", () => { el.qAudioButton.disabled = false; });

  el.btnAbort.addEventListener("click", () => {
    if (typeof el.abortDialog.showModal === "function") {
      // Ein vorheriger Formularwert bleibt am Dialog haften. Vor jedem Öffnen
      // leeren, damit Escape niemals versehentlich einen alten Abbruch ausführt.
      el.abortDialog.returnValue = "";
      el.abortDialog.showModal();
      return;
    }
    if (confirm("Quiz abbrechen? Die bisherigen Antworten gehen verloren.")) show("start");
  });

  el.abortDialog.addEventListener("close", () => {
    if (el.abortDialog.returnValue === "abort") show("start");
  });

  el.btnToIslands.addEventListener("click", () => {
    history.pushState({}, "", "/quiz");
    route();
  });

  el.btnEditParticipant.addEventListener("click", () => {
    showParticipantForm(true);
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
  // Öffnen setzt sie ohnehin vor showModal(), es gäbe also kein Nachblitzen -
  // ein geleertes src würde dagegen kurz das Platzhalter-Icon zeigen.

  el.btnRetrySave.addEventListener("click", () => flushOutbox({ force: true }));
  el.btnAusgangSenden.addEventListener("click", () => flushOutbox({ force: true }));

  // Der Browser meldet sich, sobald er wieder Netz sieht. Das ist der Moment,
  // in dem das Nachsenden ohne Zutun des Teilnehmers passieren soll - er hat
  // die Insel längst verlassen und wird von sich aus nichts mehr antippen.
  window.addEventListener("online", () => flushOutbox());
  el.btnErrBack.addEventListener("click", () => {
    history.pushState({}, "", "/quiz");
    route();
  });

  window.addEventListener("popstate", route);
  window.addEventListener("resize", scheduleCampusRoutes, { passive: true });

  // ---------------------------------------------------------------- Start ---

  async function route() {
    // Einzel-Insel-Paket: enthält der Katalog nur eine Insel, gibt es nichts
    // auszuwählen - dann direkt dorthin, ohne Übersicht.
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

    // Bewusst ohne await: die Seite steht sofort, das Nachsenden läuft
    // daneben und malt die Karte nach, wenn es durch ist.
    flushOutbox();
  }

  boot();
})();
