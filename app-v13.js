/* ============================================================================
   THITRONIK Campus 2026 Feedbackbogen - v13 (Schritt fuer Schritt)

   Ein Abschnitt pro Bildschirm. Der RPC-Payload ist gegenueber v11/v12
   unveraendert (gleiche Feldnamen, gleiche itemLabel-Strings, gleiches
   source/formVersion), damit Auswertung und Insel-Contest weiterlaufen.
   ========================================================================== */
(() => {
  'use strict';

  const form = document.getElementById('feedbackForm');
  if (!form) return;

  const statusEl = document.getElementById('statusMessage');
  const doneScreen = document.getElementById('thankYouScreen');
  const doneName = document.getElementById('thankYouName');
  const rail = document.getElementById('rail');
  const railFill = document.getElementById('railFill');
  const railCount = document.getElementById('railCount');
  const railStep = document.getElementById('railStep');
  const railName = document.getElementById('railName');
  const stepbar = document.getElementById('stepbar');
  const backButton = document.getElementById('backButton');
  const nextButton = document.getElementById('nextButton');
  const nextLabel = document.getElementById('nextLabel');
  const startButton = document.getElementById('startButton');
  const announce = document.getElementById('stepAnnounce');
  const draftNote = document.getElementById('draftNote');
  const draftClear = document.getElementById('draftClear');
  const missingBox = document.getElementById('missingBox');
  const missingList = document.getElementById('missingList');

  const SUPABASE_URL = 'https://mhzlayhnyqlxdyiceyqz.supabase.co';
  const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_bJN8jgtj-Lx6mRyE2hWBgQ_8alccYFG';
  const SUPABASE_RPC = 'submit_campus_feedback';
  const DRAFT_KEY = 'thitronik-campus-2026-feedback-draft-v13';

  const demoMode = new URLSearchParams(window.location.search).get('demo') === '1';

  /* itemLabel-Strings exakt wie in v11. Nicht ohne Anpassung der Auswertung
     aendern. */
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
  const SECTION_NAMES = ['Angaben', 'Eindruck', 'Organisation', 'Schulung', 'Inseln', 'Ausblick'];

  const panels = [...document.querySelectorAll('[data-panel]')]
    .sort((a, b) => Number(a.dataset.panel) - Number(b.dataset.panel));
  const LAST = panels.length - 1;

  if (demoMode) {
    const badge = document.createElement('p');
    badge.textContent = 'Vorschau: es wird nichts gespeichert';
    badge.style.cssText =
      /* Unten links: oben rechts verdeckte es auf dem Handy das Logo. */
      'position:fixed;z-index:3000;left:12px;bottom:calc(96px + env(safe-area-inset-bottom,0px));' +
      'margin:0;padding:8px 14px;border-radius:999px;background:#fff;color:#A50F24;' +
      'border:1px solid #EFC3CA;font-size:.74rem;font-weight:800;' +
      'box-shadow:0 8px 24px rgba(29,54,97,.22)';
    document.body.appendChild(badge);
  }

  /* ------------------------------------------------------------ Fehlerausgabe */

  function fieldWrapper(el) {
    return el.closest('.field') || el.closest('.rate__comment') || el.parentElement;
  }

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

  function setStatus(message, type) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.className = `send__status${type ? ` is-${type}` : ''}`;
  }

  /* ----------------------------------------------------------- Bewertungszeilen
     Kommentar ist NUR bei 5 verpflichtend. Eine Pflichtbegruendung fuer die
     Bestnote treibt Teilnehmende systematisch auf die 2 aus. */

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
      box.classList.toggle('rate__comment--must', value === '5');
      box.classList.toggle('rate__comment--good', value === '1');
      textarea.dataset.required = value === '5' ? 'true' : 'false';

      if (fromUser && wasHidden && !box.hidden) {
        box.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }

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

  /* ------------------------------------------------------------- Validierung */

  function panelOf(el) {
    const panel = el.closest('[data-panel]');
    return panel ? Number(panel.dataset.panel) : 0;
  }

  /* scope === null prueft das gesamte Formular, sonst nur ein Panel. */
  function collectProblems(scope) {
    const problems = [];
    const inScope = (el) => !scope || scope.contains(el);

    [['dealer_name', 'Händlerbetrieb', 'Bitte tragen Sie Ihren Händlerbetrieb ein.'],
     ['name', 'Ihr Name', 'Bitte tragen Sie Ihren Namen ein.']].forEach(([id, label, message]) => {
      const el = document.getElementById(id);
      if (!el || !inScope(el)) return;
      if (el.value.trim().length < 2) {
        showFieldError(el, message);
        problems.push({ el, label, panel: panelOf(el) });
      } else {
        clearFieldError(el);
      }
    });

    rows.forEach((row) => {
      const textarea = row.querySelector('[data-comment] textarea');
      if (!textarea || !inScope(textarea)) return;
      if (textarea.dataset.required === 'true' && !textarea.value.trim()) {
        showFieldError(textarea, 'Bitte beschreiben Sie kurz, was wir verbessern können.');
        const legend = row.querySelector('.rate__label');
        problems.push({
          el: textarea,
          label: `Kommentar zu "${legend ? legend.textContent.trim() : 'Bewertung'}"`,
          panel: panelOf(textarea)
        });
      } else {
        clearFieldError(textarea);
      }
    });

    return problems;
  }

  function renderMissing(problems) {
    if (!missingBox || !missingList) return;

    if (!problems.length) {
      missingBox.hidden = true;
      missingList.replaceChildren();
      return;
    }

    missingList.replaceChildren(...problems.map(({ el, label, panel }) => {
      const link = document.createElement('a');
      link.href = `#${el.id}`;
      link.textContent = label;
      link.addEventListener('click', (event) => {
        event.preventDefault();
        goTo(panel, true);
        window.setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          el.focus({ preventScroll: true });
        }, 60);
      });
      const item = document.createElement('li');
      item.appendChild(link);
      return item;
    }));
    missingBox.hidden = false;
  }

  /* ------------------------------------------------------------- Fortschritt */

  const TRACKED = ['dealer_name', 'name', 'overall', ...RATING_KEYS, 'weiterempfehlung'];

  const TALLIES = [
    ['3', 'organisation_ablauf'],
    ['4', 'durchfuehrung']
  ].map(([id, sectionKey]) => ({
    el: document.querySelector(`[data-tally="${id}"]`),
    keys: ratingDefinitions.filter((d) => d[0] === sectionKey).map((d) => d[1])
  })).filter((tally) => tally.el);

  /* ------------------------------------------------------------------ Inseln
     Hoechstens drei Favoriten, in der Reihenfolge der Auswahl. Eine
     unbegrenzte Mehrfachauswahl macht den Insel-Contest wertlos: wer alle
     acht ankreuzt, liefert kein Signal. */

  const ISLAND_MAX = 3;
  const islandBoxes = [...document.querySelectorAll('input[name="inseln"]')];
  const islandTally = document.querySelector('[data-tally="isles"]');
  let islandOrder = [];

  function updateIslands() {
    islandOrder = islandOrder.filter((value) =>
      islandBoxes.some((box) => box.value === value && box.checked));

    islandBoxes.forEach((box) => {
      if (box.checked && !islandOrder.includes(box.value)) islandOrder.push(box.value);
    });
    islandOrder = islandOrder.slice(0, ISLAND_MAX);

    const voll = islandOrder.length >= ISLAND_MAX;
    islandBoxes.forEach((box) => {
      box.disabled = voll && !box.checked;
      const rank = box.parentElement.querySelector('[data-rank]');
      if (!rank) return;
      const platz = islandOrder.indexOf(box.value);
      rank.textContent = platz >= 0 ? `PLATZ ${platz + 1}` : '';
    });

    if (islandTally) {
      islandTally.textContent = `${islandOrder.length} von ${ISLAND_MAX}`;
      islandTally.classList.toggle('card__tally--full', voll);
    }
  }

  islandBoxes.forEach((box) => box.addEventListener('change', updateIslands));

  /* ----------------------------------------------------------- Schrittsegmente */

  const stepItems = [...document.querySelectorAll('#steps li')];
  let maxVisited = 1;

  function updateSteps(active) {
    stepItems.forEach((item) => {
      const n = Number(item.dataset.step);
      const button = item.querySelector('button');
      const state = n === active ? 'current' : (n < active || n <= maxVisited ? 'done' : 'todo');
      item.dataset.state = state;
      /* Zurueckspringen ist erlaubt, vorspringen nicht: sonst umgeht man die
         Pruefung der Pflichtangaben. */
      button.disabled = !(state === 'done' && n < active);
    });
  }

  stepItems.forEach((item) => {
    item.querySelector('button').addEventListener('click', () => {
      const target = Number(item.dataset.step);
      if (target < current) goTo(target, true);
    });
  });

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

  function updateProgress() {
    TALLIES.forEach(({ el, keys }) => {
      const done = keys.filter((key) => {
        const nodes = form.elements[key];
        return nodes && nodes.value;
      }).length;
      el.textContent = `${done} von ${keys.length}`;
      el.classList.toggle('card__tally--full', done === keys.length);
    });

    if (!railFill || !railCount) return;
    const done = answeredCount();
    railFill.style.width = `${Math.round((done / TRACKED.length) * 100)}%`;
    railCount.textContent = `${done} von ${TRACKED.length} beantwortet`;
  }

  /* ------------------------------------------------------------------ Entwurf */

  let saveTimer = 0;
  let current = 0;

  function collectDraft() {
    const draft = { __panel: current, __isles: islandOrder.slice() };
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
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(collectDraft())); } catch (error) { /* egal */ }
  }

  function dropDraft() {
    try { localStorage.removeItem(DRAFT_KEY); } catch (error) { /* egal */ }
  }

  let draftPanel = 0;

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

    if (Array.isArray(draft.__isles)) islandOrder = draft.__isles.slice(0, 3);

    let restored = 0;
    for (const [name, value] of Object.entries(draft)) {
      if (name === '__panel' || name === '__isles') continue;
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
    draftPanel = Math.min(Math.max(Number(draft.__panel) || 1, 1), LAST);
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

  /* --------------------------------------------------------------- Schritte */

  function goTo(index, push) {
    const target = Math.min(Math.max(index, 0), LAST);
    current = target;

    panels.forEach((panel) => {
      panel.hidden = Number(panel.dataset.panel) !== target;
    });

    const stepping = target > 0;
    document.body.classList.toggle('is-stepping', stepping);
    if (rail) rail.hidden = !stepping;
    if (stepbar) stepbar.hidden = !stepping;

    if (stepping) {
      maxVisited = Math.max(maxVisited, target);
      if (railStep) railStep.textContent = String(target);
      if (railName) railName.textContent = SECTION_NAMES[target - 1] || '';
      if (announce) announce.textContent = `Schritt ${target} von ${LAST}: ${SECTION_NAMES[target - 1] || ''}`;
      if (backButton) backButton.hidden = target === 1;
      if (nextLabel) nextLabel.textContent = target === LAST ? 'Feedback absenden' : 'Weiter';
      updateSteps(target);
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
    const panel = panels[target];
    if (panel) panel.focus({ preventScroll: true });

    if (push) {
      const state = { panel: target };
      if (window.history.state && window.history.state.panel === target) {
        window.history.replaceState(state, '', `#schritt-${target}`);
      } else {
        window.history.pushState(state, '', target === 0 ? '#start' : `#schritt-${target}`);
      }
    }

    saveDraft();
  }

  window.addEventListener('popstate', (event) => {
    const panel = event.state && typeof event.state.panel === 'number' ? event.state.panel : 0;
    goTo(panel, false);
  });

  if (startButton) {
    startButton.addEventListener('click', () => goTo(draftPanel || 1, true));
  }
  if (backButton) {
    backButton.addEventListener('click', () => {
      if (current > 1) window.history.back();
    });
  }
  if (nextButton) {
    nextButton.addEventListener('click', () => {
      if (current < LAST) {
        const problems = collectProblems(panels[current]);
        if (problems.length) {
          const first = problems[0].el;
          first.scrollIntoView({ behavior: 'smooth', block: 'center' });
          first.focus({ preventScroll: true });
          return;
        }
        goTo(current + 1, true);
        return;
      }
      form.requestSubmit();
    });
  }

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
      draftPanel = 1;
      islandOrder = [];
      updateIslands();
      if (draftNote) draftNote.hidden = true;
      updateProgress();
    });
  }

  /* -------------------------------------------------------------- Danke-Ansicht */

  const pageRegions = ['.masthead', '.rail', '.main', '.stepbar', '.foot']
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

    /* islandChoices steht in der Reihenfolge der Auswahl, also Platz 1 bis 3.
       Die Rating-Eintraege bleiben ALLE bei 1: der bestehende Contest zaehlt
       ueber anzahl_note_1, eine Gewichtung nach Platz wuerde ihn still
       veraendern. Die Rangfolge steckt in islandChoices und im raw_payload. */
    const islandChoices = [];
    const gewaehlt = islandOrder.length
      ? islandOrder
      : data.getAll('inseln').map(String);

    for (const value of gewaehlt) {
      const definition = islandDefinitions[value];
      if (!definition) continue;
      const [itemKey, itemLabel] = definition;
      islandChoices.push(itemLabel);
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

    const problems = collectProblems(null);
    renderMissing(problems);
    if (problems.length) {
      setStatus(
        problems.length === 1 ? 'Eine Angabe fehlt noch.' : `${problems.length} Angaben fehlen noch.`,
        'error'
      );
      if (missingBox) missingBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const payload = buildRpcPayload();

    if (demoMode) {
      console.info('Campus-Feedback Vorschau-Payload:', payload);
      showDone(payload.participantName);
      return;
    }

    nextButton.disabled = true;
    nextButton.setAttribute('aria-busy', 'true');
    if (nextLabel) nextLabel.textContent = 'Wird gesendet';
    setStatus('Ihr Feedback wird gespeichert.');

    try {
      await saveToSupabase(payload);
      const participantName = payload.participantName;
      dropDraft();
      delete form.dataset.submissionId;
      showDone(participantName);
    } catch (error) {
      console.error('Supabase-Speicherfehler:', error);
      setStatus(messageForError(error), 'error');
      if (statusEl) statusEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } finally {
      nextButton.disabled = false;
      nextButton.removeAttribute('aria-busy');
      if (nextLabel) nextLabel.textContent = 'Feedback absenden';
    }
  });

  /* -------------------------------------------------------------------- Aufbau */

  if (restoreDraft() && draftNote) draftNote.hidden = false;
  updateIslands();
  updateProgress();

  /* Direkteinstieg per #schritt-N erlauben, sonst Startbildschirm. */
  const fromHash = /^#schritt-(\d)$/.exec(window.location.hash);
  const initial = fromHash ? Number(fromHash[1]) : 0;
  window.history.replaceState({ panel: initial }, '', window.location.hash || '#start');
  goTo(initial, false);
})();
