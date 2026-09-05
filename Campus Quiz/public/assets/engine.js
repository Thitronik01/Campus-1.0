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
  const ENGINE_VERSION = "1.40.0";
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
  const Einwilligung = window.CampusEinwilligung;
  const campusUrl = (pfad) => pfad + (DEMO ? "?demo=1" : "");

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
    liveAnnouncer: $("live-announcer"),

    screens: {
      onboarding: $("screen-onboarding"),
      islands: $("screen-islands"),
      start: $("screen-start"),
      quiz: $("screen-quiz"),
      result: $("screen-result"),
      error: $("screen-error")
    },

    campusMap: $("campus-map"),
    campusSzene: $("campus-szene"),
    bogen: $("insel-bogen"),
    bogenZu: $("bogen-zu"),
    bogenCode: $("bogen-code"),
    bogenTitel: $("bogen-titel"),
    bogenThema: $("bogen-thema"),
    bogenStand: $("bogen-stand"),
    bogenScore: $("bogen-score"),
    bogenStart: $("bogen-start"),
    campusMapArt: $("campus-map-art"),
    islandGrid: $("island-grid"),

    orbit: $("orbit"),
    orbitPille: $("orbit-pille"),
    orbitBuehne: $("orbit-buehne"),
    orbitThumbs: $("orbit-thumbs"),
    orbitHeroBild: $("orbit-hero-bild"),
    orbitHeroCode: $("orbit-hero-code"),
    orbitHeroTitel: $("orbit-hero-titel"),
    orbitHeroStand: $("orbit-hero-stand"),
    orbitStart: $("orbit-start"),
    orbitZurueck: $("orbit-zurueck"),
    orbitWeiter: $("orbit-weiter"),
    orbitPunkte: $("orbit-punkte"),
    orbitFortschrittCopy: $("orbit-fortschritt-copy"),
    orbitFortschrittWert: $("orbit-fortschritt-wert"),
    orbitFortschrittRing: $("orbit-fortschritt-ring"),

    menueKnopf: $("menue-knopf"),
    menueDialog: $("menue-dialog"),
    menueZu: $("menue-zu"),
    menueFeedback: $("menue-feedback"),
    menueThi: $("menue-thi"),
    datenLoeschenDialog: $("daten-loeschen-dialog"),
    kopfAvatar: $("kopf-avatar"),
    campusProgressKurz: $("campus-progress-kurz"),
    campusProgressKurzwert: $("campus-progress-kurzwert"),

    aktionFeedback: $("aktion-feedback"),
    aktionThi: $("aktion-thi"),
    mobilNavFeedback: $("mobil-nav-feedback"),
    mobilNavThi: $("mobil-nav-thi"),

    tagesabschluss: $("tagesabschluss"),
    ausgang: $("ausgang"),
    ausgangText: $("ausgang-text"),
    btnAusgangSenden: $("btn-ausgang-senden"),
    taKicker: $("ta-kicker"),
    taTitle: $("ta-title"),
    taDesc: $("ta-desc"),

    profileForm: $("profile-form"),
    profileTitle: $("profile-title"),
    profileFirstName: $("profile-first-name"),
    profileLastName: $("profile-last-name"),
    profileCompany: $("profile-company"),
    profileNumber: $("profile-number"),
    profilePrivacy: $("profile-privacy"),
    profileCamera: $("profile-camera"),
    profileUpload: $("profile-upload"),
    profileCameraButton: $("profile-camera-button"),
    profileUploadButton: $("profile-upload-button"),
    profilePhotoPreview: $("profile-photo-preview"),
    profilePhotoImage: $("profile-photo-image"),
    profilePhotoPlaceholder: $("profile-photo-placeholder"),
    profilePhotoRemove: $("profile-photo-remove"),
    profilePhotoError: $("profile-photo-error"),
    profileSaveError: $("profile-save-error"),
    profileSubmit: $("profile-submit"),

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
    usedomStartLayers: [
      $("usedom-szene-raum"),
      $("usedom-szene-podest"),
      $("usedom-szene-display"),
      $("usedom-szene-verkaeufer"),
      $("usedom-szene-kundin")
    ],
    langelandStartVisual: $("langeland-start-visual"),
    langelandStartUebergabe: $("langeland-szene-uebergabe"),
    fehmarnStartVisual: $("fehmarn-start-visual"),
    fehmarnStartLayers: [
      $("fehmarn-szene-raum"),
      $("fehmarn-szene-welle"),
      $("fehmarn-szene-arbeitsplatz")
    ],
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
    qFeedbackIrrtumText: $("q-feedback-irrtum-text"),
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
    btnPrev: $("btn-prev"),
    btnAsideThi: $("btn-aside-thi"),
    btnQuizThi: $("btn-quiz-thi"),
    qCrumbCode: $("q-crumb-code"),
    qCrumbTitle: $("q-crumb-title"),
    qOverview: $("q-overview"),
    qAsideInsel: $("q-aside-insel"),
    qAsideCode: $("q-aside-code"),
    qAsideTitle: $("q-aside-title"),
    qAsideBild: $("q-aside-bild"),
    qFeedbackErklaert: $("q-feedback-erklaert"),

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

    toast: $("toast"),
    betreuung: $("betreuung"),
    betreuungListe: $("betreuung-liste")
  };

  // ---------------------------------------------------------------- State ---

  const state = {
    catalog: null,      // inseln.json
    betreuung: null,    // betreuer.json, fehlt sie, bleibt der Streifen leer
    island: null,       // geladener Fragensatz
    slug: null,
    questions: [],      // laufende Runde (ggf. gemischt / gefiltert)
    index: 0,
    viewIndex: 0,       // angezeigte Frage; beim Rückblick kleiner als index
    activeDraft: null,  // begonnene Auswahl der aktiven Frage während eines Rückblicks
    responses: [],      // { id, answer, response_seconds }
    results: [],        // clientseitige Bewertung für die Sofortanzeige
    startedAt: null,
    questionStartedAt: null,
    revealed: false,
    lastSession: null,   // session_id der zuletzt beendeten Runde
    sendetGerade: false,
    isRepeatRound: false,
    campusEntered: false,
    roundActive: false,
    pendingAbortAction: null,
    weiterFrei: 0       // Zeitpunkt, ab dem "Nächste Frage" wieder zählt
  };

  let profilePhoto = "";
  const profileTouched = new Set();

  // ------------------------------------------------------------- Helfer ----

  function show(name) {
    if (name !== "quiz" && el.qAudioPlayer) {
      el.qAudioPlayer.pause();
    }
    Object.entries(el.screens).forEach(([key, node]) => {
      node.hidden = key !== name;
    });
    document.body.classList.toggle("ist-onboarding", name === "onboarding");
    el.mastheadProgress.hidden = name !== "islands";
    /* Die Karten-Kopfzeile (Hamburger, Avatar, Kompaktfortschritt, mobile
       Leisten) gilt nur auf der Uebersicht. Ueber eine Klasse am <body>
       statt sieben einzelner hidden-Schalter: Das Stylesheet entscheidet
       je Geraet, was davon sichtbar ist. */
    document.body.classList.toggle("ist-karte", name === "islands");
    /* In der Fragenansicht ist die Kopfzeile der Seite ausgeblendet (siehe
       styles.css, body.ist-quiz) und THI steht neben der Frage. Beim
       Verlassen vergisst THI die Frage — sonst spräche er auf der Karte noch
       über Frage 7 von USEDOM. */
    document.body.classList.toggle("ist-quiz", name === "quiz");
    if (name !== "quiz") thiKontextMelden(null);
    // Der Ausgangshinweis hängt am Bildschirm, nicht am Sendezustand.
    if (el.ausgang) paintAusgang();
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  /** Ein einziger, dauerhaft im Accessibility-Baum vorhandener Live-Bereich
   *  übernimmt Meldungen aus Dialogen und Bildschirmen, die sonst beim
   *  Befüllen noch `hidden` sind. */
  function announce(message) {
    if (!el.liveAnnouncer || !message) return;
    const token = (announce.token || 0) + 1;
    announce.token = token;
    el.liveAnnouncer.textContent = "";
    requestAnimationFrame(() => {
      if (announce.token === token) el.liveAnnouncer.textContent = String(message).trim();
    });
  }

  function toast(message, ms = 2600) {
    el.toast.textContent = message;
    delete el.toast.dataset.closing;
    el.toast.hidden = false;
    announce(message);
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

  function closeLightbox() {
    if (typeof el.lightbox.close === "function") el.lightbox.close();
    else el.lightbox.removeAttribute("open");
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
      return raw ? normalizeParticipant(JSON.parse(raw)) : null;
    } catch { return null; }
  }

  function normalizeParticipant(data) {
    if (!data || typeof data !== "object") return null;
    const name = String(data.name || "").trim();
    const teile = name.split(/\s+/).filter(Boolean);
    const firstName = String(data.firstName || teile[0] || "").trim();
    const lastName = String(data.lastName || teile.slice(1).join(" ") || "").trim();
    return {
      ...data,
      firstName,
      lastName,
      name: [firstName, lastName].filter(Boolean).join(" ") || name,
      dealer: String(data.dealer || "").trim(),
      dealerNumber: String(data.dealerNumber || "").trim(),
      privacyAccepted: data.privacyAccepted === true,
      profilePhoto: typeof data.profilePhoto === "string" ? data.profilePhoto : ""
    };
  }

  function saveParticipant(data) {
    const participant = normalizeParticipant({ ...(loadParticipant() || {}), ...data });
    try {
      localStorage.setItem(LS_PARTICIPANT, JSON.stringify(participant));
      loeschwegeAktualisieren();
      return participant;
    } catch {
      return null;
    }
  }

  function lokaleCampusdatenVorhanden() {
    try {
      return [LS_PARTICIPANT, LS_DONE, LS_OUTBOX]
        .some((schluessel) => localStorage.getItem(schluessel) !== null);
    } catch {
      return false;
    }
  }

  function loeschwegeAktualisieren() {
    const vorhanden = lokaleCampusdatenVorhanden();
    document.querySelectorAll("[data-campusdaten-loeschen]")
      .forEach((knopf) => { knopf.hidden = !vorhanden; });
  }

  /** Entfernt nur die drei Campus-Schlüssel. Arbeitskarten haben einen
   *  eigenen Verlauf, THI nutzt sessionStorage, und bereits übertragene
   *  Daten liegen auf dem Server — diese Bereiche dürfen einander beim
   *  lokalen Löschen nicht überraschend mitreißen. */
  function lokaleCampusdatenLoeschen() {
    try {
      [LS_PARTICIPANT, LS_DONE, LS_OUTBOX]
        .forEach((schluessel) => localStorage.removeItem(schluessel));
      fluechtig.length = 0;
      return true;
    } catch {
      return false;
    }
  }

  const AREA_LABELS = {
    verkauf: "Verkauf",
    werkstatt: "Werkstatt",
    "verkauf-werkstatt": "Verkauf und Werkstatt",
    leitung: "Betriebsleitung",
    sonstiges: "Sonstiges"
  };

  /** Das Profil ist die verbindliche Eintrittskarte zum Campus. Alte lokale
   *  Teilnehmerdaten bleiben als Vorbelegung erhalten, gelten ohne getrennten
   *  Vor- und Nachnamen sowie Datenschutzbestätigung aber nicht als fertig. */
  function participantComplete(data) {
    if (!data) return false;
    return String(data.firstName || "").trim().length >= 2
      && String(data.lastName || "").trim().length >= 2
      && String(data.dealer || "").trim().length >= 2
      && /^\d{5}$/.test(String(data.dealerNumber || "").trim())
      && Einwilligung.gueltig(data.consent);
  }

  const PROFILE_FIELDS = [
    ["profile-first-name", "profile-first-name-error"],
    ["profile-last-name", "profile-last-name-error"],
    ["profile-company", "profile-company-error"],
    ["profile-number", "profile-number-error"],
    ["profile-privacy", "profile-privacy-error"]
  ];

  function profileFieldValid(input) {
    const value = input.type === "checkbox" ? input.checked : input.value.trim();
    if (input === el.profileNumber) return /^\d{5}$/.test(value);
    if (input === el.profilePrivacy) return value === true;
    return String(value).length >= 2;
  }

  function paintProfileField(input, errorNode, force = false) {
    const valid = profileFieldValid(input);
    const field = input.closest(".profile-field, .profile-consent");
    const showError = !valid && (force || profileTouched.has(input.id));
    field.classList.toggle("has-error", showError);
    errorNode.hidden = !showError;
    if (showError) input.setAttribute("aria-invalid", "true");
    else input.removeAttribute("aria-invalid");
    return valid;
  }

  function profileIsValid({ showErrors = false } = {}) {
    let firstBad = null;
    for (const [inputId, errorId] of PROFILE_FIELDS) {
      const input = $(inputId);
      const valid = paintProfileField(input, $(errorId), showErrors);
      if (!valid && !firstBad) firstBad = input;
    }
    el.profileSubmit.disabled = Boolean(firstBad);
    return firstBad;
  }

  function paintProfilePhoto() {
    const hatFoto = Boolean(profilePhoto);
    el.profilePhotoImage.hidden = !hatFoto;
    el.profilePhotoPlaceholder.hidden = hatFoto;
    el.profilePhotoRemove.hidden = !hatFoto;
    el.profilePhotoPreview.classList.toggle("has-photo", hatFoto);
    if (hatFoto) el.profilePhotoImage.src = profilePhoto;
    else el.profilePhotoImage.removeAttribute("src");
  }

  function renderOnboarding(data = loadParticipant()) {
    const saved = data || {};
    el.profileFirstName.value = saved.firstName || "";
    el.profileLastName.value = saved.lastName || "";
    el.profileCompany.value = saved.dealer || "";
    el.profileNumber.value = saved.dealerNumber || "";
    el.profilePrivacy.checked = Einwilligung.gueltig(saved.consent);
    el.profilePrivacy.dataset.uebernommen = el.profilePrivacy.checked ? "ja" : "nein";
    profilePhoto = saved.profilePhoto || "";
    profileTouched.clear();
    PROFILE_FIELDS.forEach(([inputId, errorId]) => paintProfileField($(inputId), $(errorId), false));
    el.profilePhotoError.hidden = true;
    el.profileSaveError.hidden = true;
    el.profileForm.removeAttribute("aria-busy");
    el.profileSubmit.querySelector("span").textContent = "Profil speichern & Campus starten";
    profileIsValid();
    paintProfilePhoto();
    show("onboarding");
    requestAnimationFrame(() => el.profileTitle.focus({ preventScroll: true }));
  }

  function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("Datei konnte nicht gelesen werden"));
      reader.readAsDataURL(file);
    });
  }

  /** Das Foto wird vor dem lokalen Speichern auf einen kleinen quadratischen
   *  Ausschnitt verkleinert. So sprengt ein aktuelles Handyfoto nicht den
   *  lokalen Speicher, und die Vorschau bleibt auch im Hallen-WLAN leicht. */
  async function prepareProfilePhoto(file) {
    const allowed = new Set(["image/jpeg", "image/png", "image/webp"]);
    if (!allowed.has(file.type)) throw new Error("Bitte ein JPEG-, PNG- oder WebP-Bild auswählen.");
    if (file.size > 5 * 1024 * 1024) throw new Error("Das Bild ist größer als 5 MB.");

    const dataUrl = await readFileAsDataUrl(file);
    const image = await new Promise((resolve, reject) => {
      const node = new Image();
      node.onload = () => resolve(node);
      node.onerror = () => reject(new Error("Das Bild konnte nicht verarbeitet werden."));
      node.src = dataUrl;
    });
    const canvas = document.createElement("canvas");
    const kantenlaenge = 512;
    const ausschnitt = Math.min(image.naturalWidth, image.naturalHeight);
    canvas.width = kantenlaenge;
    canvas.height = kantenlaenge;
    const context = canvas.getContext("2d");
    context.drawImage(
      image,
      (image.naturalWidth - ausschnitt) / 2,
      (image.naturalHeight - ausschnitt) / 2,
      ausschnitt,
      ausschnitt,
      0,
      0,
      kantenlaenge,
      kantenlaenge
    );
    const webp = canvas.toDataURL("image/webp", .82);
    return webp.startsWith("data:image/webp") ? webp : canvas.toDataURL("image/jpeg", .84);
  }

  function setProfileBusy(busy) {
    el.profileForm.toggleAttribute("aria-busy", busy);
    el.profileSubmit.disabled = busy || Boolean(profileIsValid());
    el.profileSubmit.querySelector("span").textContent = busy
      ? "Profil wird gespeichert"
      : "Profil speichern & Campus starten";
  }

  /** Inseln, deren Bühne die Quizfakten selbst trägt.
   *
   *  Zurzeit keine. Sowohl auf USEDOM als auch auf FEHMARN standen sie eine
   *  Fassung lang links in der Bühne. In beiden Fällen war das Ergebnis
   *  dasselbe: Sie nahmen der Szene die Fläche, während die rechte Spalte
   *  unter der Teilnehmerzeile leer blieb. Der Schalter bleibt, weil die
   *  Frage bei der nächsten Bühne wiederkommt. */
  const FAKTEN_IM_HERO = new Set();

  /** Bei vollständigen Teilnehmerdaten wird die rechte Spalte auf jeder
   *  Insel zum kompakten Startpanel. Beim Bearbeiten kehren die Hinweise in
   *  den Hero zurück, damit das lange Formular nicht zusätzlich wächst.
   *
   *  Zwei Klassen, weil es zwei Fragen sind: `is-panel` schaltet die rechte
   *  Spalte in den kompakten Modus, `has-participant-facts` sagt zusätzlich,
   *  dass die Fakten dort mit drinstehen. Auf Inseln aus FAKTEN_IM_HERO ist
   *  nur die erste wahr — sonst verlöre die Teilnehmerkarte ihre Gestaltung,
   *  weil die haengt am selben Schalter. */
  function placeStartFacts(byParticipant) {
    const panel = byParticipant && Boolean(state.island);
    // state.island ist der Fragensatz, nicht der Slug — der steht in seinem
    // Feld `island` und ist derselbe Wert, der auch data-island trägt.
    const rechts = panel && !FAKTEN_IM_HERO.has(state.island && state.island.island);
    el.startForm.classList.toggle("is-panel", panel);
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

  /** Nach der verbindlichen Profileinrichtung beginnt die Lernreise immer
   *  am ursprünglich gewählten Ziel. So führt der QR-Code einer Station
   *  auch nach dem Anlegen des Profils direkt zu dieser Insel. */
  async function enterCampusAfterProfile() {
    if (readSlug() || state.catalog.inseln.length === 1) {
      await route();
      return;
    }

    const params = new URLSearchParams(location.search);
    params.delete("insel");
    const query = params.toString();
    history.replaceState({}, "", `/quiz${query ? `?${query}` : ""}`);
    renderIslands();
  }

  async function fetchJson(url) {
    const separator = url.includes("?") ? "&" : "?";
    const versionedUrl = `${url}${separator}v=${encodeURIComponent(ENGINE_VERSION)}`;
    const response = await fetch(versionedUrl, { cache: "no-store" });
    if (!response.ok) throw new Error(`${versionedUrl} → HTTP ${response.status}`);
    return response.json();
  }

  /** Hängt die Fassung an eine Datei unter /media/.
   *
   *  `netlify.toml` liefert `/media/*` mit `max-age=31536000, immutable`
   *  aus. `immutable` heißt: Der Browser fragt ein Jahr lang nicht nach, ob
   *  es etwas Neues gibt — auch beim Neuladen nicht. Das geht nur gut,
   *  solange ein geänderter Inhalt auch einen geänderten Namen bekommt.
   *
   *  Genau das war im September 2026 nicht der Fall: Aus den flachen
   *  Silhouetten wurden die Dioramen, `fehmarn.webp` hieß aber weiter
   *  `fehmarn.webp`. Wer den Campus vorher offen hatte, bekam die neuen
   *  Motive nie zu sehen — die Karte war neu, die Inseln darauf alt.
   *
   *  Für `/assets/*` gilt dieselbe Regel und geht gut, weil `engine.js` und
   *  `styles.css` ihre Fassung in der URL tragen. Hier fehlte sie. */
  function medienUrl(pfad) {
    if (!pfad) return pfad;
    const separator = pfad.includes("?") ? "&" : "?";
    return `${pfad}${separator}v=${encodeURIComponent(ENGINE_VERSION)}`;
  }

  // -------------------------------------------------------- Inselübersicht --

  /** Hat diese Insel einen Wissenscheck?
   *
   *  Alles ausser der Verpflegungsinsel RÜGEN hat einen. Das Feld steht
   *  negativ in inseln.json (`"wissenscheck": false`), damit die sieben
   *  Lerninseln nichts eintragen muessen und ein vergessenes Feld die
   *  Insel zur Lerninsel macht — nicht umgekehrt. Eine Insel, die
   *  versehentlich aus dem Fortschritt faellt, faellt still aus. */
  const hatWissenscheck = (insel) => insel.wissenscheck !== false;

  /** Foto und Name der Betreuung als kompakte Reihe fuer die Kartenkachel.
   *
   *  Fehlt betreuer.json oder die Zuordnung, kommt ein leerer String
   *  zurueck und die Zeile bleibt weg — dieselbe Regel wie beim
   *  Betreuungsstreifen auf dem Startbildschirm: lieber nichts als eine
   *  leere Ueberschrift. */
  function betreuungKurz(slug) {
    const daten = state.betreuung;
    const kuerzel = (daten && daten.inseln && daten.inseln[slug]) || [];
    const personen = (daten && daten.personen) || {};
    const liste = kuerzel.map((k) => personen[k]).filter(Boolean);
    if (!liste.length) return "";

    return liste.map((person) => {
      const foto = person.bild
        ? `<img src="${escapeHtml(medienUrl(person.bild))}" alt="" width="240" height="240" loading="lazy" decoding="async">`
        : escapeHtml(person.name.split(/\s+/).slice(0, 2).map((t) => t.charAt(0)).join(""));
      return `<span class="i-crew-person"><span class="i-crew-bild${person.bild ? "" : " ohne-foto"}">${foto}</span>` +
        `<span class="i-crew-name">${escapeHtml(person.name)}</span></span>`;
    }).join("");
  }

  /* ====================== Die Karte: eine Konfiguration ==================

     ALLE Masse der Archipelkarte stehen hier und nirgends sonst. Vorher
     lagen die Inselpositionen in zwei CSS-Bloecken (quer und hoch) und die
     Routen wurden zur Laufzeit aus dem DOM GEMESSEN: `campusAnchor()` las
     die Pixelposition der Wegpunkte, `updateCampusRoutes()` setzte den
     viewBox auf die gemessene Pixelgroesse. Das waren drei Quellen fuer
     eine Anordnung, die nur zufaellig uebereinstimmten — und die Messung
     lief zuverlaessig, bevor die Motive geladen waren, also gegen Kaesten
     der Hoehe 0.

     Jetzt gibt es EINE Szene: 1600 x 900 virtuelle Einheiten, 16:9. Jede
     Zahl unten ist ein Prozentwert DIESER Szene — nicht des Fensters, nicht
     des Elternkastens. Inseln, Infokarten, Wegpunkte und Routen lesen
     dieselben Werte, also koennen sie beim Skalieren nicht auseinander
     laufen. Die Szene ist ueberall dieselbe; nur der Ausschnitt, durch den
     man sie sieht, aendert sich je nach Geraet.

     `scale` ist die Groesse der LANGEN Kante als Vielfaches von `basis`.
     Nicht die Breite: HIDDENSEE ist hochkant und USEDOM noch schmaler —
     gleiche Breite hiesse bei ihnen die doppelte Hoehe. Die kurze Kante
     folgt dem Seitenverhaeltnis des Motivs aus dem Katalog.

     Drei Groessenklassen: VEJRO fuehrt (1.15), FEHMARN und POEL tragen
     (0.95), der Rest ordnet sich unter (0.75-0.82). Die Mitte der Szene
     bleibt frei — dort liegen nur Segelboot, Walfluke, Wellen und Moewen. */
  const KARTE = {
    /* ZWEI Anordnungen, ein Datensatz je Insel. Quer ist die Archipelkarte
       fuer Desktop und Tablet im Querformat, hoch die eigene senkrechte
       Komposition fuer das Tablet im Hochformat. Das Telefon zeigt keine
       Szene mehr, sondern den Orbit (siehe unten) — dafuer steht `mobil`
       als Reihenfolge im Karussell, VEJRO ist mit 0 der Startpunkt.

       Welche Anordnung gilt, sagt das STYLESHEET ueber `--anordnung` an
       `.campus-map` — nicht eine zweite Fassung der Medienabfrage hier im
       Skript. Die Kopie einer Grenze ist in diesem Projekt schon einmal
       auseinandergelaufen (siehe buehneAktiv). */
    szenen: {
      quer: { breite: 1600, hoehe: 900,  basis: 18, karteBreite: 15.5, karteAbstand: 2.4 },
      hoch: { breite: 900,  hoehe: 1200, basis: 26, karteBreite: 24,   karteAbstand: 2 }
    },

    /* x/y ist der Mittelpunkt des Motivs in Prozent der jeweiligen Szene.
       `karte` ist die Seite der Infokarte: links/rechts wie gehabt, `unten`
       haengt sie mittig unter das Motiv (im Hochformat ueberall, weil
       seitliche Karten dort aus der Szene laufen). `karteY` verschiebt in
       Prozent der SZENENHOEHE. `abstand` ueberschreibt je Insel den Abstand
       zur Karte in cqw — NEGATIV heisst: die Karte ueberlappt das Motiv
       leicht, wie in der Vorlage; der Anschlussstrich entfaellt dann.

       VEJRO ist der gemeinsame Mittelpunkt und deutlich am groessten, die
       sechs Themeninseln bilden den Ring darum. */
    inseln: {
      vejro:     { mobil: 0,
                   quer: { x: 50, y: 45, scale: 1.25, karte: "unten",  karteY: -9 },
                   hoch: { x: 50, y: 48, scale: 1.15, karte: "unten",  karteY: -5 } },
      samsoe:    { mobil: 1,
                   quer: { x: 47, y: 14, scale:  .80, karte: "rechts", karteY: 0 },
                   hoch: { x: 50, y: 13, scale:  .80, karte: "unten",  karteY: -2 } },
      fehmarn:   { mobil: 2,
                   quer: { x: 23, y: 33, scale:  .95, karte: "links",  karteY: 5, abstand: -3.5 },
                   hoch: { x: 20, y: 35, scale:  .95, karte: "unten",  karteY: -2 } },
      hiddensee: { mobil: 3,
                   quer: { x: 75, y: 36, scale:  .82, karte: "rechts", karteY: 6, abstand: -1 },
                   hoch: { x: 78, y: 34, scale:  .78, karte: "unten",  karteY: -2 } },
      usedom:    { mobil: 4,
                   quer: { x: 22, y: 68, scale:  .90, karte: "links",  karteY: 5, abstand: -1 },
                   hoch: { x: 18, y: 65, scale:  .85, karte: "unten",  karteY: -2 } },
      langeland: { mobil: 5,
                   quer: { x: 46, y: 83, scale:  .72, karte: "rechts", karteY: 5, abstand: -2.5 },
                   hoch: { x: 48, y: 81, scale:  .80, karte: "unten",  karteY: -3 } },
      poel:      { mobil: 6,
                   quer: { x: 71, y: 66, scale:  .95, karte: "rechts", karteY: 1, abstand: 1 },
                   hoch: { x: 77, y: 65, scale:  .95, karte: "unten",  karteY: -2 } }
    }
  };

  /** Welche Anordnung die Szene gerade zeigt — gefragt wird das Stylesheet,
   *  das `--anordnung` an `.campus-map` je Medienabfrage setzt. */
  function kartenAnordnung() {
    if (!el.campusMap) return "quer";
    const wert = getComputedStyle(el.campusMap).getPropertyValue("--anordnung").trim();
    return wert === "hoch" ? "hoch" : "quer";
  }

  /* Die Rundreise als gestrichelte Boegen ist ausgebaut. Sie kreuzte
     Inseln und Infokarten: Ein Bogen zwischen zwei Stationen weiss nichts
     von dem, was zwischen ihnen liegt, und keine Woelbungszahl loest das.
     Hier standen die Stationsfolge und je Route ein Bogenanteil.

     Was bleibt, sind die ANKER in KARTE. `campusAnchor()` rechnet sie
     weiter, die Wegpunkte zeichnen sich daraus, und ein neuer Entwurf fuer
     die Linienfuehrung braucht nur eine Zeichenfunktion — nicht noch einmal
     das ganze Koordinatensystem. */

  let campusRouteFrame = 0;

  /** Ob die Bühne überhaupt gezeichnet wird, beantwortet das Stylesheet.
   *
   *  Hier stand vorher `innerWidth < 760` — eine zweite Fassung derselben
   *  Grenze, die schon einmal auseinandergelaufen ist. Die Medienabfrage
   *  fragt inzwischen Breite UND Höhe ab; eine Zahl an dieser Stelle hätte
   *  das nicht mitbekommen. Ob die Routenfläche sichtbar ist, weiß der
   *  Browser besser als eine Kopie der Bedingung. */
  function buehneAktiv() {
    return Boolean(el.campusMapArt) &&
      getComputedStyle(el.campusMapArt).display !== "none";
  }

  /** Breite eines Motivs in Prozent der Szenenbreite.
   *
   *  `scale` beschreibt die LANGE Kante. Bei einem hochkanten Motiv ist das
   *  die Hoehe, die Breite folgt also dem Seitenverhaeltnis. Ohne diese
   *  Umrechnung waere USEDOM (291x620) bei gleicher Breite doppelt so hoch
   *  wie FEHMARN und wuerde die Szene sprengen. */
  function inselBreite(slug, anordnung) {
    const a = anordnung || kartenAnordnung();
    const eintrag = KARTE.inseln[slug];
    const cfg = eintrag && eintrag[a];
    if (!cfg) return 0;
    const insel = (state.catalog.inseln || []).find((i) => i.slug === slug);
    const bw = Number(insel && insel.imageBreite) || 1;
    const bh = Number(insel && insel.imageHoehe) || 1;
    return KARTE.szenen[a].basis * cfg.scale * (bw / Math.max(bw, bh));
  }

  /** Mittelpunkt und halbe Breite eines Motivs in SZENENEINHEITEN — die
   *  Ankerpunkte fuer Orbitkreise und Strahlen. */
  function inselMitte(slug, anordnung) {
    const a = anordnung || kartenAnordnung();
    const eintrag = KARTE.inseln[slug];
    const cfg = eintrag && eintrag[a];
    if (!cfg) return null;
    const szene = KARTE.szenen[a];
    return {
      x: cfg.x / 100 * szene.breite,
      y: cfg.y / 100 * szene.hoehe,
      halb: inselBreite(slug, a) / 2 / 100 * szene.breite
    };
  }

  /** Der Stationspunkt einer Insel — in SZENENEINHEITEN, nicht in Pixeln.
   *
   *  Er liegt auf der Kante des Motivs, die zur Infokarte zeigt, auf deren
   *  Hoehe. Dort sitzt auch der sichtbare Punkt: Die Infokarte haengt mit
   *  `karteAbstand` daneben, ihr Punkt-Pseudoelement genau um diesen
   *  Abstand zurueckversetzt.
   *
   *  Vorher wurde diese Stelle aus dem DOM gemessen. Das ging so lange gut,
   *  wie das Motiv geladen war — davor lieferte der Kasten Hoehe 0 und die
   *  Route wurde einmal falsch gezeichnet. Aus der Konfiguration gerechnet
   *  stimmt sie ab dem ersten Bild. */
  function campusAnchor(slug) {
    const a = kartenAnordnung();
    const eintrag = KARTE.inseln[slug];
    const cfg = eintrag && eintrag[a];
    if (!cfg) return null;
    /* Ueberlappt die Infokarte das Motiv oder haengt sie darunter, gibt es
       keinen Anschlussstrich — und ohne Strich waere der Wegpunkt ein Ring
       mitten unter der Karte. Dann lieber keiner. */
    const abstand = cfg.abstand !== undefined ? cfg.abstand : KARTE.szenen[a].karteAbstand;
    if (cfg.karte === "unten" || abstand <= 0) return null;
    const halb = inselBreite(slug, a) / 2;
    const richtung = cfg.karte === "links" ? -1 : 1;
    return {
      x: (cfg.x + richtung * halb) / 100 * KARTE.szenen[a].breite,
      y: (cfg.y + (cfg.karteY || 0)) / 100 * KARTE.szenen[a].hoehe
    };
  }

  /** Zeichnet die Wegpunkte im Koordinatensystem der Szene.
   *
   *  Der viewBox ist fest — 1600 x 900 — und wird NICHT auf die gemessene
   *  Buehne gesetzt. Damit haengt die Zeichnung an keiner Pixelgroesse:
   *  Sie stimmt vor dem ersten Bild genauso wie danach, bei jeder
   *  Fensterbreite und in jedem Ausschnitt. `xMidYMid meet` haelt
   *  waagerechten und senkrechten Massstab gleich — nichts wird gestaucht.
   *
   *  Ein Kreis je Station, gerechnet aus KARTE. Der Radius steht in
   *  Szeneneinheiten und wird ueber `vector-effect: non-scaling-stroke` im
   *  Stylesheet auf eine geraetetreue Strichstaerke gebracht. */
  function updateCampusRoutes() {
    if (!el.campusMap || !el.campusMapArt) return;
    if (el.screens.islands.hidden || !buehneAktiv()) return;

    /* Der viewBox folgt der Anordnung: 1600x900 quer, 900x1200 hoch. Er
       bleibt fest je Anordnung und wird NICHT auf gemessene Pixel gesetzt —
       die Zeichnung haengt damit an keiner Fenstergroesse. */
    const anordnung = kartenAnordnung();
    const szene = KARTE.szenen[anordnung];
    el.campusMapArt.setAttribute("viewBox", `0 0 ${szene.breite} ${szene.hoehe}`);

    const punkte = el.campusMapArt.querySelector(".campus-wegpunkte");
    if (!punkte) return;
    const vorhanden = new Set();
    Object.keys(KARTE.inseln).forEach((slug) => {
      if (!el.islandGrid.querySelector(`.island-${slug}`)) return;
      const a = campusAnchor(slug);
      if (!a) return;
      vorhanden.add(slug);
      let kreis = punkte.querySelector(`[data-wegpunkt="${slug}"]`);
      if (!kreis) {
        kreis = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        kreis.setAttribute("data-wegpunkt", slug);
        kreis.setAttribute("r", "7");
        punkte.appendChild(kreis);
      }
      kreis.setAttribute("cx", a.x.toFixed(1));
      kreis.setAttribute("cy", a.y.toFixed(1));
    });
    punkte.querySelectorAll("[data-wegpunkt]").forEach((k) => {
      if (!vorhanden.has(k.dataset.wegpunkt)) k.remove();
    });

    zeichneOrbitlinien(anordnung);
  }

  /** Die Expeditionsmetapher der Karte: feine Kreise um VEJRO und
   *  gepunktete Strahlen zu den sechs Themeninseln.
   *
   *  Anders als die frueheren Rundreise-Boegen koennen die Strahlen nichts
   *  kreuzen: Sie laufen von der Mitte nach aussen, und zwischen Mitte und
   *  Insel liegt konstruktionsbedingt nur Wasser. Beschnitten werden sie an
   *  beiden Enden — am Orbitkreis und vor der Zielinsel —, damit sie unter
   *  keinem Motiv verschwinden. Alles in Szeneneinheiten aus KARTE, nichts
   *  wird aus dem DOM gemessen. */
  function zeichneOrbitlinien(anordnung) {
    const gruppe = el.campusMapArt.querySelector(".campus-orbit");
    if (!gruppe) return;
    gruppe.textContent = "";

    const mitte = inselMitte("vejro", anordnung);
    if (!mitte) return;

    const ns = "http://www.w3.org/2000/svg";
    const radien = [mitte.halb * 1.16, mitte.halb * 1.38];
    radien.forEach((r) => {
      const kreis = document.createElementNS(ns, "circle");
      kreis.setAttribute("cx", mitte.x.toFixed(1));
      kreis.setAttribute("cy", mitte.y.toFixed(1));
      kreis.setAttribute("r", r.toFixed(1));
      gruppe.appendChild(kreis);
    });

    Object.keys(KARTE.inseln).forEach((slug) => {
      if (slug === "vejro") return;
      if (!el.islandGrid.querySelector(`.island-${slug}`)) return;
      const ziel = inselMitte(slug, anordnung);
      if (!ziel) return;
      const dx = ziel.x - mitte.x;
      const dy = ziel.y - mitte.y;
      const abstand = Math.hypot(dx, dy);
      const von = radien[1] + 10;
      const bis = abstand - ziel.halb * 0.95;
      if (bis <= von) return;
      const linie = document.createElementNS(ns, "line");
      linie.setAttribute("x1", (mitte.x + dx / abstand * von).toFixed(1));
      linie.setAttribute("y1", (mitte.y + dy / abstand * von).toFixed(1));
      linie.setAttribute("x2", (mitte.x + dx / abstand * bis).toFixed(1));
      linie.setAttribute("y2", (mitte.y + dy / abstand * bis).toFixed(1));
      gruppe.appendChild(linie);
    });
  }

  /** Schreibt Position, Groesse und Kartenlage jeder Insel aus der
   *  Konfiguration in die CSS-Variablen ihrer Station.
   *
   *  Die Werte standen vorher in zwei CSS-Bloecken — einer fuer quer, einer
   *  fuer hoch. Zwei Anordnungen fuer dieselben sieben Inseln laufen
   *  auseinander, sobald jemand nur eine davon anfasst. Jetzt gibt es eine,
   *  und die Geraete unterscheiden sich nur noch im Ausschnitt. */
  function applyKartenLayout(li, slug) {
    const a = kartenAnordnung();
    const eintrag = KARTE.inseln[slug];
    const cfg = eintrag && eintrag[a];
    if (!cfg) return;
    const szene = KARTE.szenen[a];
    const breite = inselBreite(slug, a);
    li.style.setProperty("--x", `${cfg.x}%`);
    li.style.setProperty("--y", `${cfg.y}%`);
    li.style.setProperty("--w", `${breite.toFixed(2)}%`);
    li.style.setProperty("--karte-w", `${szene.karteBreite}cqw`);
    const abstand = cfg.abstand !== undefined ? cfg.abstand : szene.karteAbstand;
    li.style.setProperty("--karte-x", `${abstand}cqw`);
    // karteY steht in Prozent der SZENENHOEHE. Die Infokarte ist an der
    // Insel aufgehaengt, deren Hoehe je Motiv anders ist — deshalb wird
    // hier in cqw umgerechnet statt in Prozent weitergereicht.
    const versatz = (cfg.karteY || 0) * (szene.hoehe / szene.breite);
    li.style.setProperty("--karte-y-szene", `${versatz.toFixed(2)}cqw`);
    li.dataset.karte = cfg.karte;
    // Ohne Abstand kein Anschluss: Strich und Punkt gehoeren nur an Karten,
    // die neben ihrem Motiv haengen — nicht an ueberlappende oder unten
    // angehaengte.
    li.dataset.anschluss = (cfg.karte === "unten" || abstand <= 0) ? "aus" : "an";
  }

  /* Beim Wechsel der Anordnung (Tablet gedreht, Fenster schmaler gezogen)
     stehen die Stationen noch auf den alten Prozentwerten. Nachgezogen wird
     nur, wenn sich die Anordnung wirklich geaendert hat — bei jeder anderen
     Groessenaenderung ist nichts zu tun, die Szene skaliert von selbst. */
  let anordnungZuletzt = null;

  function layoutNachziehen() {
    if (!el.islandGrid || el.screens.islands.hidden) return;
    const a = kartenAnordnung();
    if (a === anordnungZuletzt) return;
    anordnungZuletzt = a;
    el.islandGrid.querySelectorAll(".island-map-item").forEach((li) => {
      if (li.dataset.slug) applyKartenLayout(li, li.dataset.slug);
    });
    updateCampusRoutes();
  }

  /** Routen neu zeichnen.
   *
   *  SOFORT, nicht im naechsten Frame. Der Umweg ueber `requestAnimationFrame`
   *  stammt aus der Zeit, als die Anker aus dem DOM gemessen wurden — dafuer
   *  musste das Layout stehen. Seit sie aus der Konfiguration kommen, gibt es
   *  nichts abzuwarten, und das Warten hat aktiv geschadet: Ein Browser haelt
   *  `requestAnimationFrame` in einem unsichtbaren Tab an. Wer den Campus in
   *  einem Hintergrundtab oeffnete, bekam eine Karte ganz ohne Routen —
   *  nachgemessen bei `document.visibilityState === "hidden"`, alle sieben
   *  Pfade leer.
   *
   *  Beim Zusammenlegen vieler Groessenaenderungen ist ein Frame dagegen
   *  sinnvoll; dafuer gibt es `scheduleCampusRoutes`. */
  function scheduleCampusRoutes() {
    updateCampusRoutes();
  }

  function coalesceCampusRoutes() {
    if (campusRouteFrame) cancelAnimationFrame(campusRouteFrame);
    campusRouteFrame = requestAnimationFrame(() => {
      campusRouteFrame = 0;
      updateCampusRoutes();
    });
  }

  /* ===================== Die Karte mit dem Finger schieben ===============

     Auf einem breiten Schirm passt die Szene vollstaendig in den Ausschnitt
     und es gibt nichts zu schieben. Auf einem Telefon waere dieselbe Szene
     auf 390 px zusammengedrueckt: Die Motive verlieren jede Lesbarkeit, und
     die Trefferflaechen fallen weit unter das Mindestmass. Deshalb bleibt
     die Szene dort auf einer Mindestbreite stehen und ragt ueber den
     Ausschnitt hinaus — man schiebt sie wie eine Seekarte auf dem Tisch.

     Wichtig dabei:

     - Verschoben wird ueber `translate3d` in CSS-Variablen. Wer `left`/`top`
       animiert, loest bei JEDEM Zeigerereignis ein neues Layout aus, und
       zwar fuer sieben Inseln, sieben Infokarten und sieben Bezierkurven.
     - Der Weg wird geklemmt. Ohne das laesst sich der Archipel aus dem
       Ausschnitt schieben, und der Teilnehmer sieht leeres Wasser ohne zu
       wissen, wohin er zurueck muss.
     - `touch-action: pan-y` am Ausschnitt: Waagerecht schiebt die Karte,
       senkrecht scrollt weiterhin die Seite. Sonst haengt der Teilnehmer in
       der Karte fest und kommt nicht mehr zum Tagesabschluss darunter. */

  const pan = { x: 0, y: 0, aktiv: false, id: null, startX: 0, startY: 0, vonX: 0, vonY: 0, weg: 0 };

  function panGrenzen() {
    if (!el.campusMap || !el.campusSzene) return { x: 0, y: 0 };
    const aus = el.campusMap.getBoundingClientRect();
    const szene = el.campusSzene.getBoundingClientRect();
    // Was ueber den Ausschnitt hinausragt, ist der Weg, den man schieben
    // darf — nie mehr. Passt die Szene hinein, ist der Weg null.
    return {
      x: Math.max(0, Math.round(szene.width - aus.width)),
      y: Math.max(0, Math.round(szene.height - aus.height))
    };
  }

  function panSchreiben() {
    if (!el.campusSzene) return;
    el.campusSzene.style.setProperty("--pan-x", `${pan.x}px`);
    el.campusSzene.style.setProperty("--pan-y", `${pan.y}px`);
  }

  function panKlemmen() {
    const g = panGrenzen();
    pan.x = Math.min(0, Math.max(-g.x, pan.x));
    pan.y = Math.min(0, Math.max(-g.y, pan.y));
    if (el.campusMap) {
      el.campusMap.classList.toggle("kann-schieben", g.x > 4 || g.y > 4);
    }
    panSchreiben();
  }

  /** Holt eine Insel in den sichtbaren Ausschnitt.
   *
   *  Noetig fuer die Tastatur: Wer sich durch die sieben Stationen tabbt,
   *  landet sonst auf einem Knopf ausserhalb des Ausschnitts und sieht den
   *  Fokusring nicht. `scrollIntoView` hilft hier nicht — geschoben wird
   *  per transform, nicht gescrollt. */
  function panZuInsel(slug) {
    if (!el.campusMap || !el.campusSzene) return;
    const g = panGrenzen();
    if (!g.x && !g.y) return;
    const li = el.islandGrid.querySelector(`.island-${slug}`);
    if (!li) return;

    const aus = el.campusMap.getBoundingClientRect();
    const insel = li.getBoundingClientRect();
    const mitteX = insel.left + insel.width / 2 - aus.left;
    const mitteY = insel.top + insel.height / 2 - aus.top;
    pan.x += aus.width / 2 - mitteX;
    pan.y += aus.height / 2 - mitteY;
    panKlemmen();
  }

  /* ======================== Der Inselbogen (Telefon) ====================

     Ob der Bogen gebraucht wird, entscheidet dieselbe Grenze wie im
     Stylesheet — aber nicht als zweite Zahl im Skript, sondern indem
     gefragt wird, ob die Infokarte ueberhaupt sichtbar ist. Eine Kopie der
     Bedingung ist hier schon einmal auseinandergelaufen (siehe
     `buehneAktiv`), und dieselbe Falle noch einmal zu stellen waere
     leichtfertig. */
  function bogenNoetig() {
    if (!el.bogen || typeof el.bogen.showModal !== "function") return false;
    const karte = el.islandGrid.querySelector(".island-card .i-content");
    return Boolean(karte) && getComputedStyle(karte).display === "none";
  }

  function zeigeBogen(island, entry, unterwegs) {
    if (!el.bogen) return;
    el.bogenCode.textContent = island.code || island.name || "";
    el.bogenTitel.textContent = island.title || island.name || "";
    el.bogenThema.textContent = island.beschreibung || "";
    el.bogenStand.textContent = !entry
      ? "Noch nicht begonnen"
      : unterwegs
        ? `Abgeschlossen · ${entry.percent} % – noch nicht gesendet`
        : `Abgeschlossen · ${entry.percent} %`;

    const prozent = entry ? Math.max(0, Math.min(100, Number(entry.percent) || 0)) : 0;
    el.bogenScore.hidden = !entry;
    el.bogenScore.style.setProperty("--score", prozent);

    el.bogenStart.textContent = entry ? "Wissenscheck wiederholen" : "Wissenscheck starten";
    el.bogenStart.href = campusUrl(`/quiz/${island.slug}`);
    el.bogenStart.dataset.slug = island.slug;

    if (!el.bogen.open) el.bogen.showModal();
  }

  function bogenEinrichten() {
    if (!el.bogen) return;
    el.bogenZu.addEventListener("click", () => el.bogen.close());

    /* Der Startknopf ist ein <a> mit echter Adresse: Wer ihn mit der
       mittleren Maustaste oeffnet oder das Ziel kopiert, bekommt eine
       brauchbare URL. Der Klick selbst bleibt aber im Einseiter. */
    el.bogenStart.addEventListener("click", (ev) => {
      if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.button !== 0) return;
      ev.preventDefault();
      el.bogen.close();
      history.pushState({}, "", campusUrl(`/quiz/${el.bogenStart.dataset.slug}`));
      route();
    });

    /* Klick auf den Hintergrund schliesst. <dialog> meldet solche Klicks am
       Dialog selbst — die Flaeche daneben gehoert technisch dazu. */
    el.bogen.addEventListener("click", (ev) => {
      if (ev.target === el.bogen) el.bogen.close();
    });
  }

  /* ========================= Der Orbit (Telefon) =========================

     Unter 768 px gibt es keine geschobene Szene mehr, sondern eine eigene
     Komposition: die aktive Insel gross im Rampenlicht, die sechs uebrigen
     als kleine runde Stationen auf einem Ring darum. Gewechselt wird per
     Wisch, Pfeil, Punkt oder Tipp auf eine Station; VEJRO ist Start und
     bleibt der Mittelpunkt der Reihenfolge (KARTE.inseln[…].mobil).

     Ein Index auf die Reihenfolge genuegt: Die Insel dahinter steht im
     Rampenlicht, die uebrigen ruecken im Kreis weiter — die naechste immer
     oben (ihr Name steht in der Pille darueber), danach im Uhrzeigersinn.
     Der vierte Ringplatz liegt unten hinter dem Rampenlicht und bleibt
     unsichtbar; sichtbar sind fuenf Stationen, wie in der Vorlage. */

  const ORBIT_PLAETZE = [
    { x: 50, y: 7 },               // oben — die naechste Insel
    { x: 88, y: 30 },
    { x: 87, y: 78 },
    { x: 50, y: 100, versteckt: true },
    { x: 13, y: 78 },
    { x: 12, y: 30 }
  ];

  const orbit = { folge: [], aktiv: 0, thumbs: new Map(), punkte: [] };

  /** Reihenfolge im Karussell. RUEGEN und andere Stationen ohne
   *  Wissenscheck haben keinen `mobil`-Rang und bleiben dem Telefon
   *  erspart — ein Rampenlicht ohne Startknopf verspraeche ein Quiz,
   *  das es nicht gibt. */
  function orbitFolge() {
    if (!orbit.folge.length) {
      orbit.folge = (state.catalog.inseln || [])
        .filter((i) => hatWissenscheck(i) && KARTE.inseln[i.slug] && KARTE.inseln[i.slug].mobil !== undefined)
        .sort((a, b) => KARTE.inseln[a.slug].mobil - KARTE.inseln[b.slug].mobil)
        .map((i) => i.slug);
    }
    return orbit.folge;
  }

  function orbitInsel(slug) {
    return (state.catalog.inseln || []).find((i) => i.slug === slug);
  }

  function orbitAufbauen() {
    if (!el.orbitThumbs || orbit.thumbs.size) return;
    const folge = orbitFolge();

    folge.forEach((slug, index) => {
      const insel = orbitInsel(slug);
      if (!insel) return;
      const li = document.createElement("li");
      li.className = "orbit-station";
      const knopf = document.createElement("button");
      knopf.type = "button";
      knopf.className = "orbit-thumb";
      knopf.setAttribute("aria-label", `${insel.name || insel.code} – ${insel.title} – in die Mitte holen`);
      if (insel.image) {
        const bild = document.createElement("img");
        bild.src = medienUrl(insel.image);
        bild.alt = "";
        if (insel.imageBreite) bild.width = Number(insel.imageBreite);
        if (insel.imageHoehe) bild.height = Number(insel.imageHoehe);
        bild.decoding = "async";
        knopf.appendChild(bild);
      }
      const label = document.createElement("span");
      label.className = "orbit-thumb-label";
      label.textContent = insel.code || insel.name;
      knopf.appendChild(label);
      knopf.setAttribute("aria-label", insel.name + ": " + insel.title + " anzeigen");
      knopf.addEventListener("click", () => orbitAktivieren(index));
      li.appendChild(knopf);
      el.orbitThumbs.appendChild(li);
      orbit.thumbs.set(slug, li);

      const punkt = document.createElement("button");
      punkt.type = "button";
      punkt.className = "orbit-punkt";
      punkt.setAttribute("aria-label", `${insel.name || slug} anzeigen`);
      punkt.addEventListener("click", () => orbitAktivieren(index));
      el.orbitPunkte.appendChild(punkt);
      orbit.punkte.push(punkt);
    });

    el.orbitZurueck.addEventListener("click", () => orbitAktivieren(orbit.aktiv - 1));
    el.orbitWeiter.addEventListener("click", () => orbitAktivieren(orbit.aktiv + 1));

    /* Wischen: waagerecht, ab 44 px, und deutlicher waagerecht als
       senkrecht — sonst wird jedes Scrollen mit schraegem Daumen zum
       Inselwechsel. Kein Pointer-Capture: Die Knoepfe auf der Buehne
       sollen normale Klicks bleiben. */
    const wisch = { x: 0, y: 0, id: null };
    el.orbitBuehne.addEventListener("pointerdown", (ev) => {
      wisch.id = ev.pointerId;
      wisch.x = ev.clientX;
      wisch.y = ev.clientY;
    });
    el.orbitBuehne.addEventListener("pointerup", (ev) => {
      if (ev.pointerId !== wisch.id) return;
      wisch.id = null;
      const dx = ev.clientX - wisch.x;
      const dy = ev.clientY - wisch.y;
      if (Math.abs(dx) < 44 || Math.abs(dx) < Math.abs(dy)) return;
      // Wisch nach links blaettert weiter, wie in jedem Karussell.
      orbitAktivieren(orbit.aktiv + (dx < 0 ? 1 : -1));
    });

    /* Wie am Inselbogen: ein <a> mit echter Adresse fuer mittlere Maustaste
       und Kopieren, der Klick selbst bleibt im Einseiter. */
    el.orbitStart.addEventListener("click", (ev) => {
      if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.button !== 0) return;
      ev.preventDefault();
      history.pushState({}, "", el.orbitStart.getAttribute("href"));
      route();
    });
  }

  function orbitAktivieren(index) {
    const folge = orbitFolge();
    if (!folge.length) return;
    orbit.aktiv = ((index % folge.length) + folge.length) % folge.length;
    const wartend = new Set(outboxAlle().map((e) => e.payload.session_id));
    orbitZeichnen(loadDone(), wartend);
  }

  function orbitZeichnen(done, wartend) {
    if (!el.orbit || !el.orbitThumbs) return;
    orbitAufbauen();
    const folge = orbitFolge();
    if (!folge.length) return;
    if (orbit.aktiv >= folge.length) orbit.aktiv = 0;

    const aktivSlug = folge[orbit.aktiv];
    const insel = orbitInsel(aktivSlug);
    if (!insel) return;

    $("overview-description").textContent = insel.beschreibung || "";
    $("overview-praxis").hidden = aktivSlug !== "langeland";
    $("overview-praxis").href = campusUrl("/praxis/langeland/");
    el.islandGrid.querySelectorAll(".island-map-item").forEach(li => {
      const button = li.querySelector("button");
      if (button) button.setAttribute("aria-pressed", String(li.dataset.slug === aktivSlug));
    });
    orbit.thumbs.forEach((li, slug) => li.querySelector("button").setAttribute("aria-pressed", String(slug === aktivSlug)));
    const entry = done[aktivSlug];
    const unterwegs = Boolean(entry && entry.session && wartend.has(entry.session));
    if (insel.image) {
      el.orbitHeroBild.src = medienUrl(insel.image);
      if (insel.imageBreite) el.orbitHeroBild.width = Number(insel.imageBreite);
      if (insel.imageHoehe) el.orbitHeroBild.height = Number(insel.imageHoehe);
    }
    el.orbitHeroCode.textContent = insel.code || insel.name || "";
    el.orbitHeroTitel.textContent = insel.title || "";
    el.orbitHeroStand.textContent = !entry
      ? "Noch nicht begonnen"
      : unterwegs
        ? `Abgeschlossen · ${entry.percent} % – noch nicht gesendet`
        : `Abgeschlossen · ${entry.percent} %`;
    el.orbitStart.textContent = entry ? "Wissenscheck wiederholen" : "Wissenscheck starten";
    el.orbitStart.setAttribute("href", campusUrl(`/quiz/${aktivSlug}`));
    el.orbitStart.setAttribute("aria-label",
      `${insel.name || insel.code}: Wissenscheck ${entry ? "wiederholen" : "starten"}`);

    // Der Ring: die uebrigen sechs, die naechste oben, dann im Uhrzeigersinn.
    folge.forEach((slug, i) => {
      const li = orbit.thumbs.get(slug);
      if (!li) return;
      if (i === orbit.aktiv) {
        li.dataset.platz = "mitte";
        return;
      }
      const abstand = ((i - orbit.aktiv) % folge.length + folge.length) % folge.length;
      const platz = ORBIT_PLAETZE[(abstand - 1) % ORBIT_PLAETZE.length];
      li.dataset.platz = platz.versteckt ? "versteckt" : "ring";
      li.style.setProperty("--px", `${platz.x}%`);
      li.style.setProperty("--py", `${platz.y}%`);
    });

    // Die Pille nennt die Insel oben im Ring — die naechste Station.
    const oben = orbitInsel(folge[(orbit.aktiv + 1) % folge.length]);
    el.orbitPille.textContent = oben ? (oben.code || oben.name) : "";

    orbit.punkte.forEach((punkt, i) => {
      punkt.classList.toggle("ist-aktiv", i === orbit.aktiv);
      if (i === orbit.aktiv) punkt.setAttribute("aria-current", "true");
      else punkt.removeAttribute("aria-current");
    });
  }

  /* ==================== Kopfzeile: Menue, THI, Avatar ==================== */

  /** THI haengt seinen Schalter selbst in die Kopfzeile (thi.js). Der Orbit
   *  und die Werkzeugleisten stossen denselben Schalter an, statt das Panel
   *  ein zweites Mal zu bauen. Faellt thi.js aus, sagt der Hinweis
   *  wenigstens, warum nichts passiert. */
  function thiOeffnen() {
    const schalter = document.getElementById("thi-schalter");
    if (schalter) schalter.click();
    else toast("THI ist gerade nicht verfügbar.");
  }

  /** Sagt THI, welche Frage gerade auf dem Schirm steht — Text, Thema und
   *  Antwortmöglichkeiten in der angezeigten Reihenfolge, nie die Lösung.
   *  Die geht zwar ohnehin durch den Browser, aber was THI nicht bekommt,
   *  kann er auch nicht vorsagen; er soll erklären, nicht abschreiben
   *  lassen. thi.js hängt dafür `window.THI` an; fehlt es, passiert nichts.
   *  `null` räumt den Kontext beim Verlassen der Fragenansicht. */
  function thiKontextMelden(q, beantwortet) {
    const thi = window.THI;
    if (!thi || typeof thi.kontext !== "function") return;
    if (!q) { thi.kontext(null); return; }

    // Die Engine mischt die Antworten; die Buchstaben auf dem Schirm folgen
    // der gemischten Reihenfolge aus `draft.options`, nicht der JSON.
    const angezeigt = draft && Array.isArray(draft.options) && draft.options.length
      ? draft.options
      : (Array.isArray(q.options) ? q.options : []);
    const optionen = angezeigt.map((o) => {
      if (o && typeof o === "object") return o.text || "";
      const treffer = (q.options || []).find((x) => x.id === o);
      return treffer ? treffer.text || "" : "";
    }).filter(Boolean);
    const schritte = !optionen.length && Array.isArray(q.items)
      ? q.items.map((i) => (i && (i.text || i.label)) || "").filter(Boolean)
      : [];

    const insel = state.island || {};
    thi.kontext({
      insel: insel.code || state.slug || "",
      nummer: `Frage ${state.viewIndex + 1} von ${state.questions.length}`,
      kategorie: q.category || "",
      art: el.qMode.textContent || "",
      prompt: q.prompt || "",
      optionen: optionen.length ? optionen : schritte,
      beantwortet: Boolean(beantwortet)
    });
  }

  function kopfEinrichten() {
    el.menueKnopf.addEventListener("click", () => el.menueDialog.showModal());
    el.menueZu.addEventListener("click", () => el.menueDialog.close());
    el.menueDialog.addEventListener("click", (ev) => {
      if (ev.target === el.menueDialog) el.menueDialog.close();
    });
    el.menueThi.addEventListener("click", () => {
      el.menueDialog.close();
      thiOeffnen();
    });
    document.querySelectorAll("[data-campusdaten-loeschen]").forEach((knopf) => {
      knopf.addEventListener("click", () => {
        if (el.menueDialog.open) el.menueDialog.close();
        el.datenLoeschenDialog.showModal();
      });
    });
    el.datenLoeschenDialog.addEventListener("close", () => {
      if (el.datenLoeschenDialog.returnValue !== "delete") return;
      if (!lokaleCampusdatenLoeschen()) {
        toast("Die lokalen Campusdaten konnten nicht gelöscht werden.");
        return;
      }
      state.roundActive = false;
      state.campusEntered = false;
      location.replace("/quiz");
    });
    [el.aktionThi, el.mobilNavThi].forEach((knopf) => {
      knopf.addEventListener("click", thiOeffnen);
    });

    /* Der Avatar zeigt die Initialen des Teilnehmers, sobald es ihn gibt —
       dieselbe Regel wie bei der Betreuung ohne Foto. Vorher bleibt das
       neutrale Symbol aus dem HTML stehen. */
    const teilnehmer = loadParticipant();
    if (teilnehmer && teilnehmer.name) {
      el.kopfAvatar.textContent = teilnehmer.name
        .split(/\s+/).slice(0, 2).map((t) => t.charAt(0).toUpperCase()).join("");
    }
  }

  function panEinrichten() {
    if (!el.campusMap || !el.campusSzene) return;

    el.campusMap.addEventListener("pointerdown", (ev) => {
      const g = panGrenzen();
      if (!g.x && !g.y) return;
      if (ev.pointerType === "mouse" && ev.button !== 0) return;
      pan.aktiv = true;
      pan.id = ev.pointerId;
      pan.startX = ev.clientX;
      pan.startY = ev.clientY;
      pan.vonX = pan.x;
      pan.vonY = pan.y;
      pan.weg = 0;
      el.campusMap.classList.add("is-schiebend");
    });

    el.campusMap.addEventListener("pointermove", (ev) => {
      if (!pan.aktiv || ev.pointerId !== pan.id) return;
      const dx = ev.clientX - pan.startX;
      const dy = ev.clientY - pan.startY;
      pan.weg = Math.max(pan.weg, Math.hypot(dx, dy));
      // Erst ab ein paar Pixeln uebernehmen: Sonst wird jeder Tipp mit
      // zitternder Hand zum Schieben und der Knopf darunter loest nicht aus.
      if (pan.weg < 4) return;
      if (!el.campusMap.hasPointerCapture(ev.pointerId)) {
        el.campusMap.setPointerCapture(ev.pointerId);
      }
      pan.x = pan.vonX + dx;
      pan.y = pan.vonY + dy;
      panKlemmen();
      el.campusMap.classList.add("hat-geschoben");
    });

    const loslassen = (ev) => {
      if (!pan.aktiv || (ev && ev.pointerId !== pan.id)) return;
      pan.aktiv = false;
      pan.id = null;
      el.campusMap.classList.remove("is-schiebend");
      panKlemmen();
    };
    el.campusMap.addEventListener("pointerup", loslassen);
    el.campusMap.addEventListener("pointercancel", loslassen);

    /* Ein Schieben darf nicht als Klick auf die darunterliegende Insel
       enden. Die Schwelle ist dieselbe wie oben. */
    el.campusMap.addEventListener("click", (ev) => {
      if (pan.weg >= 4) {
        ev.stopPropagation();
        ev.preventDefault();
        pan.weg = 0;
      }
    }, true);

    el.islandGrid.addEventListener("focusin", (ev) => {
      const li = ev.target.closest(".island-map-item");
      if (li && li.dataset.slug) panZuInsel(li.dataset.slug);
    });
  }

  function renderIslands() {
    const done = loadDone();
    // RUEGEN ist die Verpflegungsinsel: eine Station auf der Karte, aber
    // ohne Wissenscheck. Sie darf den Nenner nicht vergroessern — sonst
    // stuende dort ewig "7 von 8" und der Balken erreichte nie 100 %.
    const quizInseln = state.catalog.inseln.filter(hatWissenscheck);
    const total = quizInseln.length;
    const abgeschlossen = quizInseln.filter((island) => done[island.slug]).length;
    const fortschritt = total ? Math.round((abgeschlossen / total) * 100) : 0;

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

    // Dieselben Zahlen an den kompakteren Stellen: Kurzform im Tablet-Kopf
    // und Fortschrittskarte samt Ring unter dem Telefon-Orbit.
    el.campusProgressKurz.textContent = `${abgeschlossen} von ${total}`;
    el.campusProgressKurzwert.textContent = `${fortschritt} %`;
    el.orbitFortschrittCopy.textContent = fortschrittText;
    el.orbitFortschrittWert.textContent = `${fortschritt} %`;
    el.orbitFortschrittRing.style.setProperty("--pct", String(fortschritt));

    state.catalog.inseln.forEach((island, index) => {
      const entry = done[island.slug];
      // Altbestand ohne session gilt als versendet.
      const unterwegs = Boolean(entry && entry.session && wartend.has(entry.session));
      const li = document.createElement("li");
      li.className = `island-map-item island-${island.slug}`;
      // Der Slug steht als data-Attribut dran, weil ihn zwei Stellen
      // brauchen: das Nachziehen beim Anordnungswechsel und die Tastatur-
      // Zentrierung. Aus dem Klassennamen gegriffen traefe die Suche nach
      // `island-…` zuerst `island-map-item`.
      li.dataset.slug = island.slug;
      li.style.setProperty("--island-order", index);
      applyKartenLayout(li, island.slug);

      // width/height stehen im Katalog, weil die Insel auf der Buehne ihre
      // Hoehe aus dem Seitenverhaeltnis des Motivs zieht. Ohne die Angaben
      // ist der Kasten bis zum Laden 0 hoch — und die Routen, die an den
      // Stationspunkten haengen, wuerden einmal falsch gezeichnet.
      const masse = island.imageBreite && island.imageHoehe
        ? ` width="${Number(island.imageBreite)}" height="${Number(island.imageHoehe)}"`
        : "";

      // Die Verpflegungsinsel fuehrt nirgendwo hin. Ein Knopf, der nichts
      // tut, ist schlechter als kein Knopf: Er verspricht ein Quiz, das es
      // nicht gibt. Deshalb ein div, und statt des Fortschritts stehen die
      // beiden Namen mit Foto da — das ist die Auskunft, die man an dieser
      // Station wirklich sucht.
      if (!hatWissenscheck(island)) {
        const kachel = document.createElement("div");
        kachel.className = "island-card is-service";
        kachel.innerHTML = `
        ${island.image ? `<span class="i-visual" aria-hidden="true"><img src="${escapeHtml(medienUrl(island.image))}" alt="" loading="lazy"${masse}></span>` : ""}
        <span class="i-content">
          <span class="i-code">${escapeHtml(island.code)}</span>
          <span class="i-title">${escapeHtml(island.title)}</span>
          <span class="i-desc">${escapeHtml(island.beschreibung)}</span>
          <span class="i-crew">${betreuungKurz(island.slug)}</span>
        </span>`;
        li.appendChild(kachel);
        el.islandGrid.appendChild(li);
        return;
      }

      const card = document.createElement("button");
      card.type = "button";
      card.className = "island-card" + (entry ? (unterwegs ? " is-warten" : " is-done") : "");
      /* Auf dem Telefon zeigt die Karte nur das Motiv; die Beschriftung
         steht im Bogen unten. Ohne eigenen Namen hiesse der Knopf dort fuer
         eine Vorlesehilfe schlicht "Schaltflaeche". Der Name traegt deshalb
         Insel, Thema und Stand — dieselbe Auskunft, die das Auge bekommt. */
      card.setAttribute("aria-label", [
        island.name || island.code,
        island.title,
        !entry ? "noch nicht begonnen"
          : unterwegs ? `abgeschlossen mit ${entry.percent} Prozent, noch nicht gesendet`
            : `abgeschlossen mit ${entry.percent} Prozent`,
        "Inseldetails anzeigen"
      ].filter(Boolean).join(" – "));
      if (entry) card.style.setProperty("--score", Math.max(0, Math.min(100, Number(entry.percent) || 0)));
      card.innerHTML = `
        ${island.image ? `<span class="i-visual" aria-hidden="true"><img src="${escapeHtml(medienUrl(island.image))}" alt="" loading="lazy"${masse}></span>` : ""}
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
        orbitAktivieren(orbitFolge().indexOf(island.slug));
        if (matchMedia("(max-width: 1099px)").matches) {
          el.orbit.scrollIntoView({ block: "start", behavior: "instant" });
        }
      });
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
      el.taTitle.textContent = "Feedbackbogen";
      el.taDesc.textContent = fertig
        ? "Es fehlt nur noch deine Rückmeldung zum Tag."
        : "Deine Rückmeldung zur Schulung, etwa sechs Minuten. Geht auch, bevor alle Inseln erledigt sind.";
    } else {
      el.tagesabschluss.hidden = true;
    }


    el.mastheadTitle.textContent = "Wissenscheck";
    el.mastheadMeta.hidden = true;
    // Der Orbit zeichnet aus denselben Daten wie die Karte — welcher von
    // beiden sichtbar ist, entscheidet allein das Stylesheet.
    orbitZeichnen(done, wartend);
    anordnungZuletzt = kartenAnordnung();
    show("islands");
    scheduleCampusRoutes();
    /* Direkt, nicht im naechsten Frame: `requestAnimationFrame` ruht in
       einem unsichtbaren Tab. Wer den Campus im Hintergrund oeffnete, bekam
       eine Karte, die sich nicht schieben liess, bis er das Fenster
       anfasste — nachgemessen im Hochformat, Szene 34 px breiter als der
       Ausschnitt und `kann-schieben` trotzdem aus. */
    panKlemmen();
  }

  // ------------------------------------------------------------ Startbild ---

  /** Enthält der Katalog nur eine Insel, gibt es keine Übersicht - dann
   *  führen „Andere Insel" und „Nächste Insel" ins Leere. */
  function istEinzelinsel() {
    return state.catalog.inseln.length === 1;
  }

  /* Die Betreuung einer Insel.
   *
   *  Zwei Ebenen in betreuer.json, weil eine Person mehrere Inseln betreuen
   *  kann: `personen` haelt sie einmal, `inseln` ordnet sie zu. Bei einer
   *  flachen Liste je Insel stuende dieselbe Person mehrfach da — und beim
   *  naechsten Wechsel des Fotos an drei Stellen.
   *
   *  Fehlt die Datei oder hat die Insel keinen Eintrag, bleibt der Streifen
   *  ausgeblendet. Eine Ueberschrift ueber einer leeren Liste ist eine
   *  Zusage, die die Seite nicht einhaelt. */
  function renderBetreuung(slug) {
    const daten = state.betreuung;
    const kuerzel = (daten && daten.inseln && daten.inseln[slug]) || [];
    const personen = (daten && daten.personen) || {};
    const liste = kuerzel.map((k) => personen[k]).filter(Boolean);

    el.betreuung.hidden = liste.length === 0;
    el.betreuungListe.textContent = "";
    if (!liste.length) return;

    el.betreuung.classList.toggle("ist-einzeln", liste.length === 1);

    for (const person of liste) {
      const zeile = document.createElement("li");
      zeile.className = "betreuung-karte";

      const bild = document.createElement("span");
      bild.className = "betreuung-bild";
      if (person.bild) {
        const img = document.createElement("img");
        img.src = medienUrl(person.bild);
        img.alt = "";
        img.width = 240;
        img.height = 240;
        img.loading = "lazy";
        img.decoding = "async";
        bild.appendChild(img);
      } else {
        /* Ohne Foto die Initialen statt eines grauen Kastens: Sie sagen
           wenigstens, wer gemeint ist, und halten die Zeile in Form. */
        bild.classList.add("ohne-foto");
        bild.textContent = person.name
          .split(/\s+/).slice(0, 2).map((t) => t.charAt(0)).join("");
      }

      const text = document.createElement("span");
      text.className = "betreuung-text";
      if (person.rolle) {
        const rolle = document.createElement("span");
        rolle.className = "betreuung-rolle";
        rolle.textContent = person.rolle;
        text.appendChild(rolle);
      }
      const name = document.createElement("span");
      name.className = "betreuung-name";
      name.textContent = person.name;
      const koennen = document.createElement("span");
      koennen.className = "betreuung-koennen";
      koennen.textContent = person.koennen || "";
      text.append(name, koennen);

      zeile.append(bild, text);
      el.betreuungListe.appendChild(zeile);
    }
  }

  function renderStart() {
    const island = state.island;
    const isSamsoe = island.island === "samsoe";
    const isHiddensee = island.island === "hiddensee";
    const isVejro = island.island === "vejro";
    const isPoel = island.island === "poel";
    const isUsedom = island.island === "usedom";
    const isLangeland = island.island === "langeland";
    $("langeland-praxis").hidden = !isLangeland;
    $("langeland-praxis-link").href = campusUrl("/praxis/langeland/");
    const isFehmarn = island.island === "fehmarn";

    el.screens.start.dataset.island = island.island || "";
    renderBetreuung(island.island || "");
    el.samsoeStartVisual.hidden = !isSamsoe;
    el.hiddenseeStartVisual.hidden = !isHiddensee;
    el.vejroStartVisual.hidden = !isVejro;
    el.poelStartVisual.hidden = !isPoel;
    el.usedomStartVisual.hidden = !isUsedom;
    el.langelandStartVisual.hidden = !isLangeland;
    el.fehmarnStartVisual.hidden = !isFehmarn;
    // Das jeweilige Motiv ist der große Inhalt oberhalb der Falz. Feste
    // HTML-Abmessungen reservieren den Platz; hohe Ladepriorität verhindert,
    // dass die Produktbühne erst nach nachgelagerten Quizmedien erscheint.
    const startMotive = [
      [isSamsoe, [el.samsoeStartVehicle, el.samsoeStartTechnician]],
      [isHiddensee, [el.hiddenseeStartContact]],
      [isVejro, el.vejroStartLayers],
      [isPoel, [el.poelStartHaendler]],
      [isUsedom, el.usedomStartLayers],
      [isLangeland, [el.langelandStartUebergabe]],
      [isFehmarn, el.fehmarnStartLayers]
    ];
    startMotive.forEach(([aktiv, bilder]) => {
      if (!aktiv) return;
      bilder.forEach((image) => {
        if (image.getAttribute("src")) return;
        image.loading = "eager";
        image.decoding = "async";
        image.fetchPriority = "high";
        image.src = image.dataset.src;
      });
    });

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
    state.roundActive = true;
    state.viewIndex = 0;
    state.activeDraft = null;
    history.pushState({ quiz: state.slug }, "", location.href);
    renderInselkarte();
    show("quiz");
    renderQuestion();
  }

  function currentQuestion() {
    return state.questions[state.index];
  }

  function displayedQuestion() {
    return state.questions[state.viewIndex];
  }

  /** Knopfbeschriftung ohne innerHTML: Das Pfeilsymbol im Knopf bleibt
   *  stehen, nur der Text wechselt. */
  function beschrifte(knopf, text) {
    const label = knopf.querySelector(".btn-label");
    if (label) label.textContent = text;
    else knopf.textContent = text;
  }

  /** Die aktive Frage — die, die gerade beantwortet wird. `preset` bringt
   *  eine begonnene Auswahl zurück, wenn der Teilnehmer zwischendurch eine
   *  frühere Frage angesehen hat; die Zeitmessung läuft dann weiter, statt
   *  von vorn zu beginnen. */
  function renderQuestion(preset) {
    const q = currentQuestion();
    state.viewIndex = state.index;
    state.revealed = false;
    state.questionStartedAt = Date.now() - (preset ? preset.elapsed : 0);

    paintQuestion(q, preset ? preset.draft : null);

    el.qFeedback.hidden = true;
    el.qFeedback.className = "feedback";
    el.qFeedbackMedia.hidden = true;
    el.qFeedbackErklaert.hidden = true;
    el.qFeedbackIrrtum.hidden = true;
    el.qFeedbackMitnehmen.hidden = true;

    paintButtons();
    fokusAufFrage();
    preloadNext();
  }

  /** Eine bereits beantwortete Frage noch einmal ansehen — in der damaligen
   *  Reihenfolge, mit der eigenen Antwort und der Auflösung. Geändert werden
   *  kann dort nichts mehr: Die Bewertung ist gefallen und steht im Ergebnis.
   *  Der Rückblick ist zum Nachlesen da, nicht zum Nachbessern. */
  function reviewQuestion(i) {
    const r = state.results[i];
    if (!r) return;
    // Wer die aktive Frage halb beantwortet verlässt, bekommt sie so zurück.
    if (state.viewIndex === state.index && !state.revealed) {
      state.activeDraft = { draft, elapsed: Date.now() - state.questionStartedAt };
    }
    state.viewIndex = i;
    paintQuestion(r.question, r.draft);
    paintReveal(r.question, r.answer);
    paintFeedback(r.question, r.answer, r.isCorrect);
    paintButtons();
    fokusAufFrage();
  }

  /** Sprung in der Fragenübersicht oder über „Vorherige Frage". Erreichbar
   *  sind beantwortete Fragen und die aktive; was noch offen ist, nicht —
   *  die Reihenfolge ist Teil des Checks. */
  function gotoQuestion(i) {
    if (i < 0 || i > state.index) return;
    if (i < state.index || state.revealed) { reviewQuestion(i); return; }
    if (i === state.viewIndex) return;
    const preset = state.activeDraft;
    state.activeDraft = null;
    renderQuestion(preset);
  }

  function fokusAufFrage() {
    // preventScroll, weil der Browser sonst nur so weit scrollt, bis die
    // Überschrift eben im Bild ist - bei einer langen Frage steht man dann
    // mitten im Text. Der Blick gehört an den Anfang der Frage.
    el.qTitle.focus({ preventScroll: true });
    el.screens.quiz.scrollIntoView({ block: "start", behavior: scrollArt() });
  }

  /** Frage, Medien und Eingabe zeichnen — für die aktive Frage wie für den
   *  Rückblick. `vorgabe` ist die gespeicherte Reihenfolge samt Auswahl. */
  function paintQuestion(q, vorgabe) {
    const hatMedienbild = Boolean(q.media && q.media.src);
    /* Nur zwei Haken am Bildschirm, und beide werden gelesen: data-has-media
       schaltet das zweispaltige Layout, data-revealed die Auflösung. Die
       früheren Haken für Fragetyp, Bildantworten und Bildausrichtung las
       kein Stylesheet (Rückstand R-61/R-62) und sind weg. */
    el.screens.quiz.dataset.hasMedia = String(hatMedienbild);
    el.screens.quiz.dataset.revealed = "false";

    // Der Zähler ist nur noch für die Vorlesehilfe da; sichtbar ist der
    // Stand an den Kreisen der Fragenübersicht (renderOverview).
    el.qCounter.textContent = `Frage ${state.viewIndex + 1} von ${state.questions.length}`;

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
      // Maße aus dem Fragensatz reservieren den Platz, bevor das Bild da ist;
      // ohne Angabe darf der Browser die Fläche nicht mit alten Werten füllen.
      const mediaWidth = Number(q.media.width);
      const mediaHeight = Number(q.media.height);
      if (mediaWidth > 0 && mediaHeight > 0) {
        el.qMediaImg.width = mediaWidth;
        el.qMediaImg.height = mediaHeight;
      } else {
        el.qMediaImg.removeAttribute("width");
        el.qMediaImg.removeAttribute("height");
      }
      el.qMediaImg.alt = q.media.alt || "";
      el.qMediaImg.dataset.layout = q.media.layout || q.layout || "landscape";
      el.qMediaCaption.textContent = q.media.caption || "Zum Vergrößern antippen";
      el.qMedia.hidden = false;
      el.qMediaImg.src = q.media.src;
    } else {
      el.qMedia.hidden = true;
    }

    renderAudio(q);
    renderInput(q, vorgabe);
    renderOverview();
    thiKontextMelden(q, Boolean(state.results[state.viewIndex]));
  }

  /** Beschriftung und Sichtbarkeit der beiden Knöpfe unter der Frage. Vor der
   *  Antwort heißt der Hauptknopf „Antwort prüfen", danach nennt er die
   *  nächste Frage beim Namen — so ist klar, wohin es geht. */
  function paintButtons() {
    const i = state.viewIndex;
    const last = state.questions.length - 1;
    const beantwortet = Boolean(state.results[i]);
    el.btnPrev.hidden = i === 0;
    if (!beantwortet) {
      beschrifte(el.btnCheck, "Antwort prüfen");
      updateCheckState();
      return;
    }
    beschrifte(el.btnCheck, i === last ? "Auswertung ansehen" : `Weiter mit Frage ${i + 2}`);
    el.btnCheck.disabled = false;
    el.qStatus.textContent = "";
  }

  /** Die Fragenübersicht im Kopf der Karte: ein Knopf je Frage, auf allen
   *  Breiten dieselbe Reihe. Sie ist die einzige Fortschrittsanzeige der
   *  Fragenansicht — Zähler, Balken und Punktreihe daneben sagten dreimal
   *  dasselbe und sind seit 1.36 weg. */
  function renderOverview() {
    const total = state.questions.length;
    el.qOverview.innerHTML = "";
    for (let i = 0; i < total; i++) {
      const r = state.results[i];
      const zustand = r ? (r.isCorrect ? "is-correct" : "is-wrong") : "is-open";
      const aktuell = i === state.viewIndex;
      const erreichbar = Boolean(r) || i === state.index;
      const text = r
        ? (r.isCorrect ? "richtig beantwortet" : "noch nicht richtig")
        : (i === state.index ? "aktuelle Frage" : "offen");

      const li = document.createElement("li");
      li.className = zustand + (aktuell ? " is-current" : "");
      const knopf = document.createElement("button");
      knopf.type = "button";
      knopf.textContent = String(i + 1);
      knopf.disabled = !erreichbar;
      knopf.setAttribute("aria-label", `Frage ${i + 1}: ${text}`);
      if (aktuell) knopf.setAttribute("aria-current", "step");
      knopf.addEventListener("click", () => gotoQuestion(i));
      li.appendChild(knopf);
      el.qOverview.appendChild(li);
    }
  }

  /** Brotkrume im Kopf und Inselkarte in der Seitenleiste. Code und Bild
   *  kommen aus dem Katalog, der Titel aus dem Fragensatz — dort steht die
   *  ausführliche Form („Einbauorte im Fahrzeug"). Ohne Bild im Katalog
   *  bleibt die Karte weg; ein leerer Kasten wäre ein Versprechen ohne Inhalt. */
  function renderInselkarte() {
    const insel = state.island || {};
    const katalog = (state.catalog && state.catalog.inseln) || [];
    const eintrag = katalog.find((i) => i.slug === state.slug) || {};
    const code = insel.code || eintrag.code || "";
    const titel = insel.title || eintrag.title || "";
    el.qCrumbCode.textContent = code;
    el.qCrumbTitle.textContent = titel;
    el.qAsideCode.textContent = code;
    el.qAsideTitle.textContent = titel;
    if (eintrag.image) {
      if (eintrag.imageBreite && eintrag.imageHoehe) {
        el.qAsideBild.width = eintrag.imageBreite;
        el.qAsideBild.height = eintrag.imageHoehe;
      }
      el.qAsideBild.src = medienUrl(eintrag.image);
      el.qAsideInsel.hidden = false;
    } else {
      el.qAsideBild.removeAttribute("src");
      el.qAsideInsel.hidden = true;
    }
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
    el.qAudioButton.disabled = false;
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
    // Im Rückblick gibt es nichts zu prüfen; die Knöpfe setzt paintButtons.
    if (state.results[state.viewIndex]) return;
    const q = displayedQuestion();
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

  function renderInput(q, vorgabe) {
    el.qInput.innerHTML = "";

    if (q.type === "single" || q.type === "multi" || q.type === "truefalse") {
      renderChoices(q, vorgabe);
    } else if (q.type === "order") {
      renderOrder(q, vorgabe);
    } else if (q.type === "match") {
      renderMatch(q, vorgabe);
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

  function renderChoices(q, vorgabe) {
    draft = vorgabe
      ? { selected: (vorgabe.selected || []).slice(), options: vorgabe.options }
      : { selected: [], options: optionsFor(q) };

    // Bildmodus wird an den Daten erkannt, nicht an einem Extra-Feld: sobald
    // eine Option ein Bild trägt, ist es eine Bildfrage.
    const bildmodus = draft.options.some((option) => option.image);

    const wrap = document.createElement("div");
    wrap.className = "answers"
      + (bildmodus ? " answers-bild" : "")
      + (!bildmodus && q.type === "truefalse" ? " answers-narrow" : "");
    if (bildmodus) wrap.dataset.layout = q.layout || "portrait";
    // Das Stylesheet wählt die Spaltenzahl nach der Anzahl der Antworten.
    wrap.dataset.count = String(draft.options.length);
    wrap.setAttribute("role", "group");
    wrap.setAttribute("aria-labelledby", "q-title");

    draft.options.forEach((option, i) => {
      const letter = String.fromCharCode(65 + i);

      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer opt-" + ((i % 7) + 1) + (bildmodus ? " answer-bild" : "");
      button.dataset.id = option.id;
      const gewaehlt = draft.selected.includes(option.id);
      button.classList.toggle("is-selected", gewaehlt);
      button.setAttribute("aria-pressed", String(gewaehlt));

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

  function renderOrder(q, vorgabe) {
    draft = vorgabe
      ? { order: (vorgabe.order || []).slice(), items: vorgabe.items }
      : { order: [], items: shuffled(q.items) };

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

  function renderMatch(q, vorgabe) {
    draft = {
      pairs: {},
      left: vorgabe ? vorgabe.left : shuffled(q.left),
      right: vorgabe ? vorgabe.right : shuffled(q.right)
    };
    q.left.forEach((item) => {
      draft.pairs[item.id] = (vorgabe && vorgabe.pairs && vorgabe.pairs[item.id]) || "";
    });

    // Die Auswahlliste wird einmal je Frage gemischt, nicht je Zeile: alle
    // Zeilen zeigen dieselbe Reihenfolge, sonst müsste man in jeder Zeile
    // neu suchen. Vorher stand sie unverändert in der Reihenfolge der
    // Quelldatei - und dort steht die Lösung meist der Reihe nach (erster
    // linker Eintrag zum ersten rechten). Wer die Frage ein zweites Mal
    // sah, konnte sich das Muster merken, ohne die Sache zu kennen.
    const auswahl = draft.right;

    const list = document.createElement("div");
    list.className = "match-list";

    draft.left.forEach((item) => {
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
      select.value = draft.pairs[item.id];
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

    // Nur der Text wechselt; das Symbol davor bleibt stehen.
    el.qFeedbackIrrtumText.textContent = isCorrect ? "Typische Fehler" : "Falsch gewählt?";
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
    state.results.push({ question: q, answer, isCorrect, draft: draftSnapshot() });
    state.revealed = true;

    paintReveal(q, answer);
    paintFeedback(q, answer, isCorrect);
    announce([
      el.qFeedbackTitle.textContent,
      el.qFeedbackCopy.textContent,
      el.qFeedbackSolution.hidden ? "" : el.qFeedbackSolution.textContent
    ].filter(Boolean).join(". "));

    paintButtons();
    renderOverview();
    // Ab jetzt darf THI die Auflösung offen besprechen.
    thiKontextMelden(q, true);

    // Auflösung in den Blick holen, Nachtippen kurz verschlucken. Der Knopf
    // wechselt an derselben Stelle von "Antwort prüfen" auf "Weiter" -
    // ein zweiter Tipp aus Gewohnheit übersprang bisher genau das, wofür der
    // Check gemacht ist.
    state.weiterFrei = Date.now() + 450;
    el.qFeedback.scrollIntoView({ block: "nearest", behavior: scrollArt() });
  }

  /** Reihenfolge und Auswahl der laufenden Frage festhalten, damit der
   *  Rückblick sie genau so zeigt, wie sie beantwortet wurde. */
  function draftSnapshot() {
    return {
      options: draft.options,
      items: draft.items,
      left: draft.left,
      right: draft.right,
      selected: (draft.selected || []).slice(),
      order: (draft.order || []).slice(),
      pairs: { ...(draft.pairs || {}) }
    };
  }

  /** Die Auflösung zeichnen — nach der Antwort wie im Rückblick. */
  function paintFeedback(q, answer, isCorrect) {
    el.screens.quiz.dataset.revealed = "true";
    el.qFeedback.className = "feedback " + (isCorrect ? "is-correct" : "is-wrong");
    el.qFeedbackTitle.textContent = isCorrect ? "Richtig" : "Noch nicht richtig";
    el.qFeedbackCopy.innerHTML = q.feedback ? richText(q.feedback) : "";
    el.qFeedbackErklaert.hidden = !q.feedback;

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
  }

  function paintReveal(q, answer) {
    const verdict = (node, text, klasse) => {
      const label = document.createElement("span");
      label.className = `answer-verdict ${klasse}`;
      label.textContent = text;
      node.appendChild(label);
      if (node.hasAttribute("aria-label")) {
        node.setAttribute("aria-label", `${node.getAttribute("aria-label")}. ${text}`);
      }
    };

    if (q.type === "single" || q.type === "multi" || q.type === "truefalse") {
      el.qInput.querySelectorAll(".answer").forEach((node) => {
        const id = node.dataset.id;
        const chosen = (answer.selected || []).includes(id);
        const right = q.correct.includes(id);
        node.disabled = true;
        node.classList.remove("is-selected");
        if (chosen && right) {
          node.classList.add("is-correct");
          verdict(node, "Deine Auswahl: richtig", "is-correct");
        } else if (chosen && !right) {
          node.classList.add("is-wrong");
          verdict(node, "Deine Auswahl: falsch", "is-wrong");
        } else if (!chosen && right) {
          node.classList.add("is-missed");
          verdict(node, "Richtige Antwort, nicht ausgewählt", "is-missed");
        }
      });
    } else if (q.type === "order") {
      el.qInput.querySelectorAll(".order-item").forEach((node) => {
        const id = node.dataset.id;
        const pos = (answer.order || []).indexOf(id);
        const correctPos = q.correct.indexOf(id);
        const richtig = q.correct[pos] === id;
        node.disabled = true;
        node.classList.remove("is-picked");
        node.classList.add(richtig ? "is-correct" : "is-wrong");
        verdict(node,
          richtig
            ? `Deine Position ${pos + 1}: richtig`
            : `Deine Position ${pos + 1}; richtig wäre ${correctPos + 1}`,
          richtig ? "is-correct" : "is-wrong");
      });
      el.qInput.querySelector(".order-reset")?.setAttribute("hidden", "");
    } else if (q.type === "match") {
      el.qInput.querySelectorAll(".match-row").forEach((node) => {
        const id = node.dataset.id;
        const select = node.querySelector("select");
        select.disabled = true;
        const richtig = (answer.pairs || {})[id] === q.correct[id];
        node.classList.add(richtig ? "is-correct" : "is-wrong");
        verdict(node,
          richtig ? "Richtig zugeordnet" : "Noch nicht richtig zugeordnet",
          richtig ? "is-correct" : "is-wrong");

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
    state.roundActive = false;
    const finishedAt = new Date();
    const total = state.results.length;
    const score = state.results.filter((r) => r.isCorrect).length;
    const percent = total ? Math.round((score / total) * 100) : 0;
    const seconds = Math.max(0, Math.round((finishedAt - state.startedAt) / 1000));

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
      // ?demo=1 speichert nichts — auch nicht den Inselstand. Vorher stand
      // die Insel nach einem Testlauf als abgeschlossen auf der Karte, und
      // nach sieben Demoläufen meldete die Seite den Tagesabschluss
      // (Rückstand R-18). Die Sperre in submit() greift eine Ebene tiefer.
      if (!DEMO) markDone(state.slug, percent, payload.session_id);
      submit(payload);
    } else {
      setSaveState("Wiederholungsrunde - sie wird nicht zusätzlich gespeichert.");
      el.btnRetrySave.hidden = true;
    }

    // Erst nach markDone: sonst stünde die gerade beendete Insel noch in der
    // Liste der offenen.
    paintRest();

    show("result");
    announce(`${el.rRating.textContent} ${el.rSave.textContent}`);

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
    // Die Verpflegungsinsel gehoert nicht in "Noch offen" — sie liesse
    // sich nie abhaken und der Tagesabschluss erschiene nie.
    const offen = state.catalog.inseln.filter((i) => hatWissenscheck(i) && !done[i.slug]);
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
      consent: participant.consent,
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
      setSaveState("Vorschaumodus (?demo=1) - es wurde absichtlich nichts gespeichert.");
      el.btnRetrySave.hidden = true;
      return;
    }

    state.lastSession = payload.session_id;
    outboxAdd(payload);
    setSaveState("Ergebnis wird gesendet …");
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
      answers_json: JSON.stringify(payload.answers),
      consent_accepted_at: payload.consent.at,
      consent_version: payload.consent.version
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
      const meldung = ausgangSatz(offen);
      const geaendert = el.ausgangText.textContent !== meldung;
      el.ausgangText.textContent = meldung;
      el.btnAusgangSenden.disabled = state.sendetGerade;
      el.btnAusgangSenden.textContent = state.sendetGerade ? "Sendet …" : "Jetzt senden";
      if (geaendert) announce(meldung);
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

  function setSaveState(message) {
    const geaendert = el.rSave.textContent !== message;
    el.rSave.textContent = message;
    if (geaendert && !el.screens.result.hidden) announce(message);
  }

  /** Die Zeile unter dem Ergebnisring. Sie spricht nur über die Runde, die
   *  gerade gelaufen ist, nicht über den ganzen Ausgang. */
  function paintSpeicherstand(offen) {
    if (DEMO || state.isRepeatRound || !state.lastSession) return;

    const eigen = offen.find((e) => e.payload.session_id === state.lastSession);

    if (!eigen) {
      setSaveState("Ergebnis gespeichert. Danke!");
      el.btnRetrySave.hidden = true;
      return;
    }

    if (state.sendetGerade) {
      setSaveState("Ergebnis wird gesendet …");
      el.btnRetrySave.hidden = true;
      return;
    }

    if (eigen.blockiert) {
      setSaveState(`Nicht gespeichert: ${eigen.fehler}. Das Ergebnis bleibt auf dem Gerät - bitte der Schulungsleitung Bescheid geben.`);
    } else if (eigen.fehler && eigen.fehler !== KEIN_NETZ) {
      // Der Server war erreichbar und hat trotzdem nicht gespeichert. Der
      // Grund gehört hierhin: solange die Migration fehlt, steht hier genau
      // das, und niemand sucht den Fehler beim Funknetz.
      setSaveState(`Der Server konnte gerade nicht speichern (${eigen.fehler}). Das Ergebnis liegt auf dem Gerät und wird automatisch nachgesendet.`);
    } else {
      setSaveState("Noch keine Verbindung. Das Ergebnis liegt auf dem Gerät und wird automatisch nachgesendet.");
    }
    el.btnRetrySave.hidden = false;
  }

  // ------------------------------------------------------------- Ereignisse --

  [el.profileFirstName, el.profileLastName, el.profileCompany, el.profileNumber].forEach((input) => {
    input.addEventListener("input", () => {
      if (input === el.profileNumber) {
        const cleaned = input.value.replace(/\D/g, "").slice(0, 5);
        if (cleaned !== input.value) input.value = cleaned;
      }
      profileTouched.add(input.id);
      profileIsValid();
    });
    input.addEventListener("blur", () => {
      profileTouched.add(input.id);
      profileIsValid();
    });
  });

  el.profilePrivacy.addEventListener("change", () => {
    el.profilePrivacy.dataset.uebernommen = "nein";
    profileTouched.add(el.profilePrivacy.id);
    profileIsValid();
  });

  el.profileCameraButton.addEventListener("click", () => el.profileCamera.click());
  el.profileUploadButton.addEventListener("click", () => el.profileUpload.click());

  async function handleProfilePhoto(input) {
    const file = input.files && input.files[0];
    if (!file) return;
    el.profilePhotoError.hidden = true;
    el.profileCameraButton.disabled = true;
    el.profileUploadButton.disabled = true;
    try {
      profilePhoto = await prepareProfilePhoto(file);
      paintProfilePhoto();
    } catch (error) {
      el.profilePhotoError.textContent = error.message || "Das Bild konnte nicht verarbeitet werden.";
      el.profilePhotoError.hidden = false;
    } finally {
      input.value = "";
      el.profileCameraButton.disabled = false;
      el.profileUploadButton.disabled = false;
    }
  }

  el.profileCamera.addEventListener("change", () => handleProfilePhoto(el.profileCamera));
  el.profileUpload.addEventListener("change", () => handleProfilePhoto(el.profileUpload));
  el.profilePhotoRemove.addEventListener("click", () => {
    profilePhoto = "";
    el.profilePhotoError.hidden = true;
    paintProfilePhoto();
    el.profileCameraButton.focus();
  });

  for (const input of [el.profileFirstName, el.profileLastName, el.profileCompany, el.profileNumber]) {
    input.addEventListener("input", () => {
      el.profilePrivacy.checked = false;
      el.profilePrivacy.dataset.uebernommen = "nein";
      profileIsValid();
    });
  }

  el.profileForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const firstBad = profileIsValid({ showErrors: true });
    if (firstBad) {
      firstBad.focus();
      return;
    }

    setProfileBusy(true);
    el.profileSaveError.hidden = true;
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

    const saved = saveParticipant({
      firstName: el.profileFirstName.value.trim(),
      lastName: el.profileLastName.value.trim(),
      name: `${el.profileFirstName.value.trim()} ${el.profileLastName.value.trim()}`,
      dealer: el.profileCompany.value.trim(),
      dealerNumber: el.profileNumber.value.trim(),
      privacyAccepted: true,
      consent: el.profilePrivacy.dataset.uebernommen === "ja" && Einwilligung.gueltig(loadParticipant()?.consent)
        ? loadParticipant().consent : Einwilligung.erfassen(),
      profilePhoto
    });

    if (!saved) {
      el.profileSaveError.textContent = "Das Profil konnte auf diesem Gerät nicht gespeichert werden. Bitte prüfe, ob der private Modus oder eine Speichersperre aktiv ist.";
      el.profileSaveError.hidden = false;
      setProfileBusy(false);
      return;
    }

    el.chipParticipant.textContent = saved.name;
    el.chipParticipant.hidden = false;
    state.campusEntered = true;
    await enterCampusAfterProfile();
    setProfileBusy(false);
  });

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
    // Unbeantwortet ist nur die aktive Frage — alles davor liegt im Ergebnis.
    if (!state.results[state.viewIndex]) { reveal(); return; }
    // Der Knopf bleibt bedienbar und behält den Fokus, nur der zu frühe
    // zweite Tipp zählt nicht. Ein disabled hätte Tastaturnutzern den Fokus
    // aus der Hand genommen.
    if (Date.now() < state.weiterFrei) return;
    if (state.viewIndex < state.index) { gotoQuestion(state.viewIndex + 1); return; }
    advance();
  });
  el.btnPrev.addEventListener("click", () => gotoQuestion(state.viewIndex - 1));
  el.btnAsideThi.addEventListener("click", thiOeffnen);
  el.btnQuizThi.addEventListener("click", thiOeffnen);

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
  el.qAudioPlayer.addEventListener("canplay", () => {
    el.qAudioButton.disabled = false;
    el.qAudioStatus.textContent = "";
  });

  function requestRoundAbort(onAbort) {
    state.pendingAbortAction = onAbort;
    if (typeof el.abortDialog.showModal === "function") {
      if (el.abortDialog.open) return;
      el.abortDialog.returnValue = "";
      el.abortDialog.showModal();
      return;
    }
    if (confirm("Quiz abbrechen? Die bisherigen Antworten gehen verloren.")) {
      state.roundActive = false;
      const action = state.pendingAbortAction;
      state.pendingAbortAction = null;
      if (action) action();
    } else {
      state.pendingAbortAction = null;
    }
  }

  el.btnAbort.addEventListener("click", () => {
    requestRoundAbort(() => show("start"));
  });

  el.abortDialog.addEventListener("close", () => {
    const action = state.pendingAbortAction;
    state.pendingAbortAction = null;
    if (el.abortDialog.returnValue === "abort") {
      state.roundActive = false;
      if (action) action();
    }
  });

  el.btnToIslands.addEventListener("click", () => {
    history.pushState({}, "", campusUrl("/quiz"));
    route();
  });

  el.btnEditParticipant.addEventListener("click", () => {
    renderOnboarding(loadParticipant());
  });

  el.btnNextIsland.addEventListener("click", () => {
    history.pushState({}, "", campusUrl("/quiz"));
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

  el.lightboxClose.addEventListener("click", closeLightbox);
  // Klick auf den abgedunkelten Rand schließt ebenfalls. Das Ereignis trifft
  // den Dialog selbst nur außerhalb seines Inhalts.
  el.lightbox.addEventListener("click", (event) => {
    if (event.target === el.lightbox) closeLightbox();
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
    history.pushState({}, "", campusUrl("/quiz"));
    route();
  });

  window.addEventListener("popstate", () => {
    if (!state.roundActive) {
      route();
      return;
    }
    /* Der Browser ist bereits einen Eintrag zurückgegangen. Ein neuer
       Wächter stellt die Quiz-URL wieder her; erst nach Bestätigung geht es
       wirklich zurück und route() zeigt den Startbildschirm. */
    history.pushState({ quiz: state.slug }, "", location.href);
    requestRoundAbort(() => history.back());
  });
  window.addEventListener("beforeunload", (event) => {
    if (!state.roundActive) return;
    event.preventDefault();
    event.returnValue = "";
  });
  /* Bei jeder Groessenaenderung neu klemmen: Wird das Fenster breiter, passt
     die Szene womoeglich vollstaendig hinein — ein alter Versatz liesse sie
     dann schief im Ausschnitt stehen. Die Routen selbst brauchen das nicht
     mehr (sie stehen in Szeneneinheiten), der Aufruf bleibt aber fuer den
     Fall, dass eine Station erst nach dem Zeichnen dazukommt. */
  window.addEventListener("resize", () => {
    layoutNachziehen();
    coalesceCampusRoutes();
    panKlemmen();
  }, { passive: true });

  /* Sicherheitsnetz: Wird der Tab erst spaeter sichtbar, ist alles bereits
     gezeichnet — aber eine Groessenaenderung im Hintergrund kann der Browser
     verschluckt haben. Einmal nachziehen kostet nichts. */
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      layoutNachziehen();
      updateCampusRoutes();
      panKlemmen();
    }
  });
  window.addEventListener("orientationchange", () => {
    layoutNachziehen();
    panKlemmen();
  }, { passive: true });

  // ---------------------------------------------------------------- Start ---

  async function route() {
    // Ohne Katalog gibt es nichts zu routen: boot() ist am Laden gescheitert
    // und zeigt den Fehlerbildschirm. Ein Klick auf „Zur Campus-Karte" oder
    // die Zurück-Geste liefen dann in state.catalog.inseln und warfen —
    // der Knopf tat sichtbar nichts (Rückstand R-15). Neu laden ist hier
    // die einzige Handlung, die etwas ändern kann.
    if (!state.catalog) { location.reload(); return; }
    const participant = loadParticipant();
    // Ein gespeichertes Profil erspart das erneute Tippen, ersetzt aber nicht
    // den bewussten Einstieg: Bei jedem neuen Seitenaufruf ist die Landingpage
    // der erste Bildschirm. Erst ihr CTA gibt die Navigation dieser Sitzung
    // zur Inselkarte beziehungsweise zum Einzel-Insel-Start frei.
    if (!state.campusEntered || !participantComplete(participant)) {
      renderOnboarding(participant);
      return;
    }

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

    // Zu einer Insel ohne Wissenscheck gibt es keinen Fragensatz. Ohne
    // diesen Zweig liefe /quiz/ruegen in fetchJson und der Teilnehmer
    // laese "Der Fragensatz konnte nicht geladen werden" — ein Fehler, wo
    // gar keiner ist. Ein aufgerufener QR-Code oder ein alter Link landet
    // deshalb auf der Uebersicht.
    if (!hatWissenscheck(known)) {
      history.replaceState({}, "", campusUrl("/quiz"));
      renderIslands();
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
    panEinrichten();
    bogenEinrichten();
    kopfEinrichten();
    loeschwegeAktualisieren();

    try {
      state.catalog = await fetchJson("/data/inseln.json");
    } catch (error) {
      fail("Die Inselübersicht konnte nicht geladen werden. Bitte die Seite neu laden.");
      console.error(error);
      return;
    }

    /* Eigener Versuch mit eigenem catch: Die Betreuung ist Beiwerk. Faellt
       sie aus, laeuft das Quiz weiter — nur der Streifen bleibt leer. */
    try {
      state.betreuung = await fetchJson("/data/betreuer.json");
    } catch (error) {
      console.warn("Betreuung nicht geladen:", error);
    }

    // Die beiden Campus-Werkzeuge gehören in den Kopf und bleiben auch bei
    // einem direkten Einstieg über eine Insel-URL auffindbar. Einzelpakete
    // liefern diese Links nicht und behalten die Knöpfe deshalb ausgeblendet.
    if (state.catalog.feedback) {
      el.tagesabschluss.href = state.catalog.feedback;
      el.tagesabschluss.hidden = false;
      // Dieselbe Adresse in Menue, Tablet-Leiste und Telefon-Navigation:
      // Einzelpakete liefern sie nicht, dort bleiben die Eintraege weg.
      [el.menueFeedback, el.aktionFeedback, el.mobilNavFeedback].forEach((a) => {
        a.href = state.catalog.feedback;
        a.hidden = false;
      });
    }


    await route();

    // Bewusst ohne await: die Seite steht sofort, das Nachsenden läuft
    // daneben und malt die Karte nach, wenn es durch ist.
    flushOutbox();
  }

  boot();
})();
