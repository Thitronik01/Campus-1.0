(() => {
  'use strict';

  const form = document.getElementById('feedbackForm');
  const status = document.getElementById('statusMessage');
  const sendButton = document.getElementById('sendButton');
  const thankYouScreen = document.getElementById('thankYouScreen');
  const thankYouName = document.getElementById('thankYouName');

  if (!form) return;

  // Richtiges Campus-Live-Projekt. Der Publishable Key darf im Browser stehen.
  // Die Tabellen selbst bleiben durch RLS gesperrt; gespeichert wird ausschließlich
  // über die Security-Definer-RPC public.submit_campus_feedback(jsonb).
  const SUPABASE_URL = 'https://mhzlayhnyqlxdyiceyqz.supabase.co';
  const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_bJN8jgtj-Lx6mRyE2hWBgQ_8alccYFG';
  const SUPABASE_RPC = 'submit_campus_feedback';
  const BUILD_VERSION = 'v11';
  const demoMode = new URLSearchParams(window.location.search).get('demo') === '1';

  console.info(`THITRONIK Campus Feedback ${BUILD_VERSION} – Campus Live RPC aktiv`);

  if (demoMode) {
    const badge = document.createElement('div');
    badge.className = 'demo-badge';
    badge.textContent = 'VORSCHAU – keine Speicherung';
    document.body.appendChild(badge);
  }

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

  function setupRatingRow(row) {
    const radios = [...row.querySelectorAll('input[type="radio"]')];
    const comment = row.querySelector('.rating-comment');
    const textarea = comment?.querySelector('textarea');
    const label = comment?.querySelector('.comment-label');
    const help = comment?.querySelector('.comment-help');

    if (!comment || !textarea || !label || !help || !radios.length) return;

    function update() {
      const selected = radios.find((radio) => radio.checked);
      const value = selected?.value;
      const required = value === '1' || value === '5';

      comment.hidden = !required;
      comment.classList.toggle('is-required', required);
      textarea.required = required;
      textarea.setCustomValidity('');

      if (value === '1') {
        label.textContent = 'Was hat hier besonders gut funktioniert? *';
        help.textContent = 'Bitte beschreiben Sie kurz, was wir unbedingt beibehalten sollten.';
      } else if (value === '5') {
        label.textContent = 'Was sollten wir hier verbessern? *';
        help.textContent = 'Bitte nennen Sie kurz den wichtigsten Verbesserungsansatz.';
      } else {
        label.textContent = 'Kommentar';
        help.textContent = 'Bei 1 oder 5 erforderlich.';
      }
    }

    radios.forEach((radio) => radio.addEventListener('change', update));
    textarea.addEventListener('input', () => textarea.setCustomValidity(''));
    update();
  }

  document.querySelectorAll('.rating-row').forEach(setupRatingRow);

  function validateExtremeComments() {
    let firstInvalid = null;

    document.querySelectorAll('.rating-row').forEach((row) => {
      const selected = row.querySelector('input[type="radio"]:checked');
      const textarea = row.querySelector('.rating-comment textarea');
      if (!selected || !textarea) return;

      const needsComment = selected.value === '1' || selected.value === '5';
      if (needsComment && !textarea.value.trim()) {
        textarea.setCustomValidity(
          selected.value === '1'
            ? 'Bitte beschreiben Sie kurz, was besonders gut funktioniert hat.'
            : 'Bitte beschreiben Sie kurz, was wir verbessern können.'
        );
        firstInvalid ||= textarea;
      } else {
        textarea.setCustomValidity('');
      }
    });

    if (firstInvalid) {
      firstInvalid.reportValidity();
      firstInvalid.focus({ preventScroll: true });
      firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return false;
    }
    return true;
  }

  function getOrCreateSubmissionId() {
    if (form.dataset.submissionId) return form.dataset.submissionId;

    let id;
    if (window.crypto?.randomUUID) {
      id = window.crypto.randomUUID();
    } else {
      id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
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
      const rawRating = data.get(itemKey);
      if (!rawRating || rawRating === 'na') continue;

      ratings.push({
        sectionKey,
        itemKey,
        itemLabel,
        rating: Number(rawRating),
        comment: String(data.get(`${itemKey}_comment`) || '').trim() || null
      });
    }

    const islandValues = data.getAll('inseln').map(String);
    const islandChoices = [];
    for (const islandValue of islandValues) {
      const definition = islandDefinitions[islandValue];
      if (!definition) continue;
      const [itemKey, itemLabel] = definition;
      islandChoices.push(itemLabel);

      // Eine ausgewählte Insel ist eine Favoriten-Stimme. Im aktuellen System ist
      // 1 die beste Bewertung. Die Auswertung kann den Contest über anzahl_bewertungen
      // bzw. anzahl_note_1 in campus_feedback_langdock_stats zählen.
      ratings.push({
        sectionKey: 'schulungsinseln',
        itemKey,
        itemLabel,
        rating: 1,
        comment: null
      });
    }

    return {
      submissionId: getOrCreateSubmissionId(),
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

  function setStatus(message, type = '') {
    if (!status) return;
    status.textContent = message;
    status.className = `status${type ? ` is-${type}` : ''}`;
  }

  function showThankYou(name) {
    if (!thankYouScreen || !thankYouName) return;
    thankYouName.textContent = String(name || '').trim() || 'Teilnehmer';
    thankYouScreen.hidden = false;
    document.body.classList.add('thank-you-active');
    thankYouScreen.focus({ preventScroll: true });
  }

  async function saveToSupabase(payload) {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 18000);

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${SUPABASE_RPC}`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_PUBLISHABLE_KEY,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ payload }),
        signal: controller.signal
      });

      const responseText = await response.text();
      if (!response.ok) {
        throw new Error(`Supabase RPC HTTP ${response.status}${responseText ? `: ${responseText}` : ''}`);
      }

      return responseText;
    } finally {
      window.clearTimeout(timeout);
    }
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    setStatus('');

    if (form.elements.website?.value) return;

    if (!validateExtremeComments() || !form.reportValidity()) {
      setStatus('Bitte prüfen Sie die markierten Pflichtangaben.', 'error');
      return;
    }

    const payload = buildRpcPayload();

    if (demoMode) {
      console.info('Campus-Feedback Vorschau-Payload:', payload);
      setStatus('Vorschau: Das Feedback wurde geprüft, aber nicht gespeichert.', 'success');
      showThankYou(payload.participantName);
      return;
    }

    sendButton.disabled = true;
    sendButton.setAttribute('aria-busy', 'true');
    setStatus('Feedback wird sicher gespeichert …');

    try {
      await saveToSupabase(payload);

      const participantName = payload.participantName;
      form.reset();
      delete form.dataset.submissionId;

      document.querySelectorAll('.rating-row').forEach((row) => {
        const comment = row.querySelector('.rating-comment');
        const textarea = comment?.querySelector('textarea');
        if (comment) comment.hidden = true;
        if (textarea) {
          textarea.required = false;
          textarea.setCustomValidity('');
          textarea.value = '';
        }
      });

      setStatus('Vielen Dank! Ihr Feedback wurde erfolgreich gespeichert.', 'success');
      showThankYou(participantName);
    } catch (error) {
      console.error('Supabase-Speicherfehler:', error);
      const timedOut = error?.name === 'AbortError';
      const message = String(error?.message || '');
      let userMessage = 'Das Feedback konnte gerade nicht gespeichert werden. Bitte versuchen Sie es erneut.';

      if (timedOut) {
        userMessage = 'Die Speicherung hat zu lange gedauert. Bitte prüfen Sie Ihre Verbindung und versuchen Sie es erneut.';
      } else if (message.includes('401') || message.includes('403')) {
        userMessage = 'Die Verbindung zur Feedback-Datenbank wurde abgewiesen. Bitte wenden Sie sich kurz an das THITRONIK Team.';
      } else if (message.includes('404')) {
        userMessage = 'Der Feedback-Dienst ist momentan nicht erreichbar. Bitte wenden Sie sich kurz an das THITRONIK Team.';
      }

      setStatus(userMessage, 'error');
    } finally {
      sendButton.disabled = false;
      sendButton.removeAttribute('aria-busy');
    }
  });
})();
