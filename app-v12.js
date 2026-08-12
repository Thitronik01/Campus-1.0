/* ============================================================================
   THITRONIK Campus 2026 Feedbackbogen - v12

   Der RPC-Payload ist gegenueber v11 unveraendert (gleiche Feldnamen, gleiche
   itemLabel-Strings, gleiches source/formVersion). Auswertung und Insel-Contest
   laufen dadurch ohne Anpassung weiter.
   ========================================================================== */
(() => {
  'use strict';

  const form = document.getElementById('feedbackForm');
  if (!form) return;

  const statusEl = document.getElementById('statusMessage');
  const sendButton = document.getElementById('sendButton');
  const doneScreen = document.getElementById('thankYouScreen');
  const doneName = document.getElementById('thankYouName');
  const rail = document.getElementById('rail');
  const railFill = document.getElementById('railFill');
  const railCount = document.getElementById('railCount');
  const draftNote = document.getElementById('draftNote');
  const draftClear = document.getElementById('draftClear');

  /* Campus-Live-Projekt. Der Publishable Key darf im Browser stehen: die
     Tabellen bleiben per RLS gesperrt, gespeichert wird ausschliesslich ueber
     die Security-Definer-RPC public.submit_campus_feedback(jsonb). */
  const SUPABASE_URL = 'https://mhzlayhnyqlxdyiceyqz.supabase.co';
  const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_bJN8jgtj-Lx6mRyE2hWBgQ_8alccYFG';
  const SUPABASE_RPC = 'submit_campus_feedback';
  const DRAFT_KEY = 'thitronik-campus-2026-feedback-draft';

  const demoMode = new URLSearchParams(window.location.search).get('demo') === '1';

  /* itemLabel-Strings exakt wie in v11. Nicht aendern, ohne die Auswertung
     mit anzupassen. */
  const ratingDefinitions = [
    ['organisation_ablauf', 'kommunikation_vorfeld', 'Kommunikation und Information im Vorfeld'],
    ['organisation_ablauf', 'anmeldung_vorbereitung', 'Anmeldung & Vorbereitung'],
    ['organisation_ablauf', 'zeitplanung_tagesablauf', 'Zeitplanung / Tagesablauf'],
    ['organisation_ablauf', 'organisation_vor_ort', 'Organisation vor Ort'],
    ['organisation_ablauf', 'raeumlichkeiten_technik', 'Räumlichkeiten & Technik'],
    ['organisation_ablauf', 'bewirtung_haus', 'Bewirtung im Haus'],
    ['organisation_ablauf', 'abendveranstaltung', 'Abendveranstaltung'],
    ['durchfuehrung', 'relevanz_themen', 'Relevanz der Themen'],
    ['durchfuehrung', 'verstaendlichkeit', 'Verständlichkeit der Inhalte'],
    ['durchfuehrung', 'praxisbezug', 'Praxisbezug'],
    ['durchfuehrung', 'produktvorfuehrungen', 'Produktvorführungen & Demonstrationen'],
    ['durchfuehrung', 'fragen', 'Möglichkeit für Fragen'],
    ['durchfuehrung', 'betreuung_thitronik', 'Betreuung durch THITRONIK']
  ];

  const islandDefinitions = {
    '1': ['insel_vejroe', 'Vejrø'],
    '2': ['insel_hiddensee', 'Hiddensee'],
    '3': ['insel_fehmarn', 'Fehmarn'],
    '4': ['insel_poel', 'Poel'],
    '5': ['insel_usedom', 'Usedom'],
    '6': ['insel_langeland', 'Langeland'],
    '7': ['insel_samsoe', 'Samsø'],
    '8': ['insel_ruegen', 'Rügen']
  };

  const RATING_KEYS = ratingDefinitions.map((definition) => definition[1]);

  if (demoMode) {
    const badge = document.createElement('p');
    badge.textContent = 'Vorschau: es wird nichts gespeichert';
    badge.style.cssText =
      'position:fixed;z-index:3000;right:12px;bottom:12px;margin:0;padding:9px 15px;' +
      'border-radius:999px;background:#fff;color:#a5102a;border:1px solid #f0c2ca;' +
      'font-size:.78rem;font-weight:800;box-shadow:0 8px 24px rgba(6,38,63,.2)';
    document.body.appendChild(badge);
  }

  /* ---------------------------------------------------------- Bewertungszeilen
     Kommentar ist NUR bei 5 verpflichtend. Bei 1 laden wir freundlich zum
     Kommentieren ein, erzwingen ihn aber nicht: eine Pflichtbegruendung fuer
     die Bestnote treibt Teilnehmende systematisch auf die 2 aus. */

  function setupRatingRow(row) {
    const radios = [...row.querySelectorAll('input[type="radio"]')];
    const box = row.querySelector('[data-comment]');
    const label = row.querySelector('[data-comment-label]');
    const help = row.querySelector('[data-comment-help]');
    const textarea = box && box.querySelector('textarea');
    if (!box || !label || !help || !textarea || !radios.length) return;

    function update(fromUser) {
      const selected = radios.find((radio) => radio.checked);
      const value = selected ? selected.value : '';
      const wasHidden = box.hidden;

      box.hidden = value !== '1' && value !== '5';

      /* Ein aufklappendes Kommentarfeld landet auf dem Handy sonst unter der
         Falz oder hinter der Tastatur. "nearest" scrollt nur, wenn noetig. */
      if (fromUser && wasHidden && !box.hidden) {
        box.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
      box.classList.toggle('rate__comment--must', value === '5');
      box.classList.toggle('rate__comment--good', value === '1');
      textarea.dataset.required = value === '5' ? 'true' : 'false';

      if (value === '5') {
        label.textContent = 'Was sollten wir hier verbessern?';
        help.textContent = 'Kurz genügt. Diese Angabe brauchen wir.';
      } else if (value === '1') {
        label.textContent = 'Was hat hier besonders gut funktioniert?';
        help.textContent = 'Freiwillig. Hilft uns aber sehr, das beizubehalten.';
      }

      if (value !== '5') clearFieldError(textarea);
    }

    radios.forEach((radio) => radio.addEventListener('change', () => {
      update(true);
      onFormChanged();
    }));
    textarea.addEventListener('input', () => clearFieldError(textarea));
    update(false);
  }

  const rows = [...document.querySelectorAll('[data-rate]')];
  rows.forEach(setupRatingRow);

  /* ------------------------------------------------------------- Fehlerausgabe */

  function fieldWrapper(el) {
    return el.closest('.field') || el.closest('.rate__comment') || el.parentElement;
  }

  /* Der Fehlertext muss per aria-describedby am Feld haengen, sonst liest ihn
     keine Vorlesesoftware vor. Bei dynamisch erzeugten Meldungen (Kommentar-
     felder) verknuepfen wir ihn deshalb hier ausdruecklich. */
  function errorNodeFor(el) {
    const wrapper = fieldWrapper(el);
    const id = `${el.id}_err`;

    let target = document.getElementById(id);
    if (target) return target;
    if (!wrapper) return null;

    target = wrapper.querySelector('[data-err]');
    if (!target) {
      target = document.createElement('p');
      target.className = 'field__err';
      target.setAttribute('data-err', '');
      target.hidden = true;
      wrapper.appendChild(target);
    }
    if (!target.id) target.id = id;

    const described = (el.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean);
    if (!described.includes(target.id)) {
      described.push(target.id);
      el.setAttribute('aria-describedby', described.join(' '));
    }
    return target;
  }

  function showFieldError(el, message) {
    const wrapper = fieldWrapper(el);
    if (wrapper) wrapper.classList.add('field--bad');

    const target = errorNodeFor(el);
    if (target) {
      target.textContent = message;
      target.hidden = false;
    }
    el.setAttribute('aria-invalid', 'true');
  }

  function clearFieldError(el) {
    const wrapper = fieldWrapper(el);
    if (wrapper) wrapper.classList.remove('field--bad');

    const target =
      document.getElementById(`${el.id}_err`) ||
      (wrapper && wrapper.querySelector('[data-err]'));
    if (target) {
      target.textContent = '';
      target.hidden = true;
    }
    el.removeAttribute('aria-invalid');
  }

  const missingBox = document.getElementById('missingBox');
  const missingList = document.getElementById('missingList');

  function renderMissing(problems) {
    if (!missingBox || !missingList) return;

    if (!problems.length) {
      missingBox.hidden = true;
      missingList.replaceChildren();
      return;
    }

    missingList.replaceChildren(...problems.map(({ el, label }) => {
      const link = document.createElement('a');
      link.href = `#${el.id}`;
      link.textContent = label;
      link.addEventListener('click', (event) => {
        event.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.focus({ preventScroll: true });
      });
      const item = document.createElement('li');
      item.appendChild(link);
      return item;
    }));
    missingBox.hidden = false;
  }

  function validate() {
    const problems = [];

    [['dealer_name', 'Händlerbetrieb', 'Bitte tragen Sie Ihren Händlerbetrieb ein.'],
     ['name', 'Ihr Name', 'Bitte tragen Sie Ihren Namen ein.']].forEach(([id, label, message]) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (el.value.trim().length < 2) {
        showFieldError(el, message);
        problems.push({ el, label });
      } else {
        clearFieldError(el);
      }
    });

    rows.forEach((row) => {
      const textarea = row.querySelector('[data-comment] textarea');
      if (!textarea) return;
      if (textarea.dataset.required === 'true' && !textarea.value.trim()) {
        showFieldError(textarea, 'Bitte beschreiben Sie kurz, was wir verbessern können.');
        const legend = row.querySelector('.rate__label');
        problems.push({
          el: textarea,
          label: `Kommentar zu "${legend ? legend.textContent.trim() : 'Bewertung'}"`
        });
      } else {
        clearFieldError(textarea);
      }
    });

    renderMissing(problems);

    if (problems.length) {
      /* Bewusst NICHT zum ersten Feld springen: auf dem Handy landet man sonst
         ohne Kontext weit oben. Die Liste steht dort, wo gerade getippt wurde. */
      setStatus(
        problems.length === 1
          ? 'Eine Angabe fehlt noch.'
          : `${problems.length} Angaben fehlen noch.`,
        'error'
      );
      if (missingBox) missingBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return false;
    }
    return true;
  }

  /* ------------------------------------------------------------- Fortschritt */

  const TRACKED = ['dealer_name', 'name', 'overall', ...RATING_KEYS, 'weiterempfehlung'];

  function answeredCount() {
    let count = 0;
    for (const key of TRACKED) {
      const nodes = form.elements[key];
      if (!nodes) continue;
      if (nodes instanceof RadioNodeList) {
        if (nodes.value) count += 1;
      } else if (typeof nodes.value === 'string') {
        if (nodes.value.trim().length >= 2) count += 1;
      }
    }
    return count;
  }

  /* Zaehler je Bewertungsblock: sieben bzw. sechs gleich aussehende Zeilen
     brauchen am Handy eine sichtbare Restlaufzeit. */
  const TALLIES = [
    ['3', 'organisation_ablauf'],
    ['4', 'durchfuehrung']
  ].map(([id, sectionKey]) => ({
    el: document.querySelector(`[data-tally="${id}"]`),
    keys: ratingDefinitions.filter((d) => d[0] === sectionKey).map((d) => d[1])
  })).filter((tally) => tally.el);

  function updateTallies() {
    TALLIES.forEach(({ el, keys }) => {
      const done = keys.filter((key) => {
        const nodes = form.elements[key];
        return nodes && nodes.value;
      }).length;
      el.textContent = `${done} von ${keys.length}`;
      el.classList.toggle('card__tally--full', done === keys.length);
    });
  }

  function updateProgress() {
    updateTallies();
    if (!railFill || !railCount) return;
    const done = answeredCount();
    const total = TRACKED.length;
    railFill.style.width = `${Math.round((done / total) * 100)}%`;
    railCount.textContent = `${done} von ${total} beantwortet`;
  }

  /* ------------------------------------------------------------------ Entwurf */

  let saveTimer = 0;

  function collectDraft() {
    const draft = {};
    for (const el of form.elements) {
      if (!el.name || el.name === 'website') continue;
      if (el.type === 'radio') {
        if (el.checked) draft[el.name] = el.value;
      } else if (el.type === 'checkbox') {
        if (el.checked) (draft[el.name] = draft[el.name] || []).push(el.value);
      } else if (el.value) {
        draft[el.name] = el.value;
      }
    }
    return draft;
  }

  function saveDraft() {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(collectDraft()));
    } catch (error) {
      /* Privater Modus oder voller Speicher: Entwurf ist ein Komfortfeature,
         der Bogen funktioniert auch ohne. */
    }
  }

  function dropDraft() {
    try { localStorage.removeItem(DRAFT_KEY); } catch (error) { /* siehe oben */ }
  }

  function restoreDraft() {
    let draft;
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return false;
      draft = JSON.parse(raw);
    } catch (error) {
      return false;
    }
    if (!draft || typeof draft !== 'object') return false;

    let restored = 0;
    for (const [name, value] of Object.entries(draft)) {
      const nodes = form.elements[name];
      if (!nodes) continue;

      if (Array.isArray(value)) {
        const list = nodes instanceof RadioNodeList ? [...nodes] : [nodes];
        list.forEach((el) => {
          if (value.includes(el.value)) { el.checked = true; restored += 1; }
        });
      } else if (nodes instanceof RadioNodeList) {
        [...nodes].forEach((el) => {
          if (el.value === value) { el.checked = true; restored += 1; }
        });
      } else if (typeof nodes.value === 'string') {
        nodes.value = value;
        restored += 1;
      }
    }

    if (!restored) return false;
    rows.forEach(setupRatingRow);
    return true;
  }

  function onFormChanged() {
    updateProgress();
    window.clearTimeout(saveTimer);
    saveTimer = window.setTimeout(saveDraft, 400);
  }

  form.addEventListener('input', onFormChanged);
  form.addEventListener('change', onFormChanged);

  if (draftClear) {
    draftClear.addEventListener('click', () => {
      dropDraft();
      form.reset();
      rows.forEach((row) => {
        const box = row.querySelector('[data-comment]');
        const textarea = box && box.querySelector('textarea');
        if (box) box.hidden = true;
        if (textarea) { textarea.value = ''; textarea.dataset.required = 'false'; }
      });
      if (draftNote) draftNote.hidden = true;
      updateProgress();
      document.getElementById('dealer_name').focus();
    });
  }

  /* --------------------------------------------------------- Abschnittsnavigation */

  const SECTION_NAMES = ['Angaben', 'Eindruck', 'Organisation', 'Schulung', 'Inseln', 'Ausblick'];

  const navLinks = [...document.querySelectorAll('.rail__jump a')];
  const steps = [...document.querySelectorAll('[data-step][id^="step-"]')];
  const railStep = document.getElementById('railStep');
  const railName = document.getElementById('railName');

  /* Der aktive Abschnitt wird aus den tatsaechlichen Positionen berechnet,
     nicht aus der Reihenfolge der Observer-Meldungen: bei schnellem Scrollen
     melden mehrere Abschnitte gleichzeitig und die letzte Meldung gewinnt
     sonst willkuerlich. Der Observer ist hier nur der Ausloeser. */
  const RAIL_LINE = 120;

  function syncRail() {
    if (!steps.length) return;

    let current = steps[0];
    for (const step of steps) {
      if (step.getBoundingClientRect().top <= RAIL_LINE) current = step;
    }

    const step = current.dataset.step;
    navLinks.forEach((link) => {
      link.setAttribute('aria-current', link.dataset.step === step ? 'true' : 'false');
    });

    const index = Number(step) - 1;
    if (railStep) railStep.textContent = `${step} von ${SECTION_NAMES.length}`;
    if (railName && SECTION_NAMES[index]) railName.textContent = SECTION_NAMES[index];
  }

  /* Bewusst ein Scroll-Listener statt IntersectionObserver: der Observer meldet
     nur Zustandswechsel und verpasst dadurch Spruenge und lange Abschnitte.
     Die Frage "in welchem Abschnitt stehe ich" braucht eine Position, keinen
     Wechsel. Der Handler ist passiv, per requestAnimationFrame gedrosselt und
     schreibt hoechstens zwei Textknoten. */
  if (steps.length) {
    let ticking = false;
    let lastY = window.scrollY;

    /* Beim Ausfuellen scrollt man abwaerts. Dort ist Platz wertvoller als
       Orientierung, also bleibt nur die Fortschrittslinie stehen. Sobald
       jemand zurueckscrollt, um etwas nachzusehen, ist die Leiste sofort da. */
    const collapseRail = () => {
      if (!rail || window.innerWidth >= 1060) {
        if (rail) rail.classList.remove('rail--tight');
        return;
      }
      const y = window.scrollY;
      if (y > lastY + 8 && y > 420) rail.classList.add('rail--tight');
      else if (y < lastY - 8) rail.classList.remove('rail--tight');
      lastY = y;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        syncRail();
        collapseRail();
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
  }

  /* -------------------------------------------------------------- Danke-Ansicht */

  const pageRegions = ['.masthead', '.rail', '.main', '.foot']
    .map((selector) => document.querySelector(selector))
    .filter(Boolean);

  function showDone(name) {
    if (!doneScreen || !doneName) return;
    doneName.textContent = String(name || '').trim() || 'Teilnehmer';
    doneScreen.hidden = false;
    document.body.classList.add('is-done');
    pageRegions.forEach((region) => { region.inert = true; });
    doneScreen.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  /* -------------------------------------------------------------------- Payload */

  function submissionId() {
    if (form.dataset.submissionId) return form.dataset.submissionId;
    const id = window.crypto && window.crypto.randomUUID
      ? window.crypto.randomUUID()
      : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
    form.dataset.submissionId = id;
    return id;
  }

  function normalizeRecommendation(value) {
    switch (value) {
      case 'Ja': return 'Ja, auf jeden Fall';
      case 'Vielleicht': return 'Eher ja';
      case 'Nein': return 'Nein';
      case 'Ja, auf jeden Fall':
      case 'Eher ja':
      case 'Eher nein':
        return value;
      default: return null;
    }
  }

  function buildRpcPayload() {
    const data = new FormData(form);
    const ratings = [];

    for (const [sectionKey, itemKey, itemLabel] of ratingDefinitions) {
      const raw = data.get(itemKey);
      if (!raw || raw === 'na') continue;
      ratings.push({
        sectionKey,
        itemKey,
        itemLabel,
        rating: Number(raw),
        comment: String(data.get(`${itemKey}_comment`) || '').trim() || null
      });
    }

    const islandChoices = [];
    for (const value of data.getAll('inseln').map(String)) {
      const definition = islandDefinitions[value];
      if (!definition) continue;
      const [itemKey, itemLabel] = definition;
      islandChoices.push(itemLabel);

      /* Eine gewaehlte Insel ist eine Favoritenstimme. Im aktuellen System ist
         1 die beste Bewertung, dadurch zaehlt campus_feedback_langdock_stats
         den Insel-Contest unveraendert weiter. */
      ratings.push({ sectionKey: 'schulungsinseln', itemKey, itemLabel, rating: 1, comment: null });
    }

    return {
      submissionId: submissionId(),
      createdClientAt: new Date().toISOString(),
      eventSlug: 'campus-2026',
      formVersion: form.dataset.formVersion || 'campus-2026-haendler-v11',
      dealerName: String(data.get('dealer_name') || '').trim(),
      participantName: String(data.get('name') || '').trim(),
      participantAreas: data.getAll('bereich').map(String),
      overallRating: data.get('overall') || null,
      recommendation: normalizeRecommendation(data.get('weiterempfehlung')),
      recommendationReason: String(data.get('weiterempfehlung_grund') || '').trim() || null,
      topicWishes: String(data.get('themenwuensche') || '').trim() || null,
      teamMood: null,
      improvementSuggestions: String(data.get('verbesserungen') || '').trim() || null,
      positiveAspects: String(data.get('positive_aspekte') || '').trim() || null,
      additionalNotes: String(data.get('weitere_anmerkungen') || '').trim() || null,
      islandChoices,
      source: 'thitronik-campus-feedback-v11',
      ratings
    };
  }

  function setStatus(message, type) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.className = `send__status${type ? ` is-${type}` : ''}`;
  }

  async function saveToSupabase(payload) {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 18000);

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${SUPABASE_RPC}`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_PUBLISHABLE_KEY,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({ payload }),
        signal: controller.signal
      });

      const text = await response.text();
      if (!response.ok) {
        const error = new Error(`Supabase RPC HTTP ${response.status}${text ? `: ${text}` : ''}`);
        error.httpStatus = response.status;
        throw error;
      }
      return text;
    } finally {
      window.clearTimeout(timeout);
    }
  }

  function messageForError(error) {
    if (error && error.name === 'AbortError') {
      return 'Die Speicherung hat zu lange gedauert. Bitte prüfen Sie Ihre Verbindung und senden Sie erneut. Ihre Eingaben bleiben erhalten.';
    }
    const status = error && error.httpStatus;
    if (status === 401 || status === 403) {
      return 'Die Verbindung zur Feedback-Datenbank wurde abgewiesen. Bitte wenden Sie sich kurz an das THITRONIK Team.';
    }
    if (status === 404) {
      return 'Der Feedback-Dienst ist momentan nicht erreichbar. Bitte wenden Sie sich kurz an das THITRONIK Team.';
    }
    return 'Das Feedback konnte gerade nicht gespeichert werden. Bitte versuchen Sie es erneut. Ihre Eingaben bleiben erhalten.';
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    setStatus('');

    if (form.elements.website && form.elements.website.value) return;
    if (!validate()) return;

    const payload = buildRpcPayload();

    if (demoMode) {
      console.info('Campus-Feedback Vorschau-Payload:', payload);
      setStatus('Vorschau: geprüft, aber absichtlich nicht gespeichert.', 'success');
      showDone(payload.participantName);
      return;
    }

    sendButton.disabled = true;
    sendButton.setAttribute('aria-busy', 'true');
    setStatus('Feedback wird gespeichert …');

    try {
      await saveToSupabase(payload);
      const participantName = payload.participantName;
      dropDraft();
      delete form.dataset.submissionId;
      setStatus('Vielen Dank, Ihr Feedback wurde gespeichert.', 'success');
      showDone(participantName);
    } catch (error) {
      console.error('Supabase-Speicherfehler:', error);
      setStatus(messageForError(error), 'error');
      if (statusEl) statusEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } finally {
      sendButton.disabled = false;
      sendButton.removeAttribute('aria-busy');
    }
  });

  /* ------------------------------------------------------------------- Aufbau */

  if (rail) rail.hidden = false;
  if (restoreDraft() && draftNote) draftNote.hidden = false;
  updateProgress();
  syncRail();
})();
