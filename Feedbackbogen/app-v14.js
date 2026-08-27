/* ============================================================================
   THITRONIK Campus 2026 Feedbackbogen - v14 (Schritt fuer Schritt)

   Ein Abschnitt pro Bildschirm.

   ACHTUNG, hier bricht v14 bewusst mit v11 bis v13:

   1. Die Notenskala ist umgedreht. 5 ist ab jetzt die beste Note, 1 die
      schlechteste. Die Zahl wird SO gespeichert, wie sie angekreuzt wurde -
      es wird nichts zurueckgerechnet.
   2. Deshalb tragen formVersion und source neue Werte. Die Auswertungs-Views
      gruppieren nach form_version; nur so stehen die alten Einsendungen mit
      "1 = beste" nicht in derselben Durchschnittsrechnung wie die neuen.
      Wer diese Strings zurueckdreht, mischt zwei Bedeutungen in einer Spalte.
   3. Neues Pflichtfeld dealerNumber, genau fuenf Ziffern.

   Die itemLabel-Strings und Feldnamen bleiben unveraendert, damit sich
   dieselbe Frage ueber alle Jahrgaenge hinweg wiederfinden laesst.
   ========================================================================== */
(() => {
  'use strict';

  const form = document.getElementById('feedbackForm');
  if (!form) return;

  const statusEl = document.getElementById('statusMessage');
  const doneScreen = document.getElementById('thankYouScreen');
  const doneName = document.getElementById('thankYouName');
  const rail = document.getElementById('rail');
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
  const netlifyPayload = document.getElementById('netlifyPayload');
  /* Eigener Schluessel fuer v14, und das ist kein Schoenheitsfehler: ein
     liegengebliebener v13-Entwurf enthaelt Noten der alten Richtung. Unter
     demselben Schluessel wiederhergestellt wuerde aus einer 1 ("war sehr gut")
     stillschweigend die schlechteste Bewertung. Lieber faengt so jemand neu an,
     als dass sein Urteil unbemerkt kippt. */
  const DRAFT_KEY = 'thitronik-campus-2026-feedback-draft-v14';

  /* Der Wissenscheck legt dieselben drei Pflichtangaben unter diesem
     Schluessel ab. localStorage gilt pro Domain — seit der Bogen unter
     /feedback derselben Site liegt, ist der Eintrag hier lesbar. Genau
     dafuer wurde zusammengelegt: Wer morgens an der ersten Insel getippt
     hat, soll abends nur noch bestaetigen. */
  const QUIZ_KEY = 'thitronik.campus.2026.participant';

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

  /* Die Inseln stehen nicht mehr hier. Sie kommen als Datenblock aus dem
     Generator, der sie seinerseits aus dem Katalog des Wissenschecks liest —
     sonst fuehrten Bogen und Quiz die Namen an drei Stellen und liefen
     wieder auseinander. Faellt der Block aus, bleiben die Inselwahlen leer;
     das ist die richtige Folge, denn geraten wird hier nichts. */
  const islandDefinitions = (() => {
    try {
      const knoten = document.getElementById('insel-daten');
      return knoten ? JSON.parse(knoten.textContent) : {};
    } catch (error) { return {}; }
  })();

  const RATING_KEYS = ratingDefinitions.map((definition) => definition[1]);
  const SECTION_NAMES = ['Angaben', 'Eindruck', 'Organisation', 'Schulung', 'Inseln', 'Ausblick'];

  /* Genau fuenf Ziffern. Fuehrende Nullen bleiben erhalten, die Nummer wird
     als Zeichenkette gefuehrt und nirgends in eine Zahl umgewandelt. */
  const DEALER_NUMBER = /^\d{5}$/;

  const panels = [...document.querySelectorAll('[data-panel]')]
    .sort((a, b) => Number(a.dataset.panel) - Number(b.dataset.panel));
  const LAST = panels.length - 1;

  /* Unten links: oben rechts verdeckte es auf dem Handy das Logo. Die Lage
     steht jetzt im Stylesheet, damit sie sich mitbewegen kann, wenn die
     Schrittleiste erscheint. Vorher lag der Hinweis auf dem Startbildschirm
     genau auf der Fusszeile. */
  if (demoMode) {
    const badge = document.createElement('p');
    badge.className = 'demo';
    badge.textContent = 'Vorschau: es wird nichts gespeichert';
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
     Kommentar ist NUR bei der schlechtesten Note verpflichtend, seit v14 also
     bei der 1. Eine Pflichtbegruendung fuer die Bestnote treibt Teilnehmende
     systematisch auf die zweitbeste Note aus. */

  /* refreshRatingRow ist absichtlich von der Verdrahtung getrennt. Vorher rief
     das Wiederherstellen eines Entwurfs die komplette Einrichtung ein zweites
     Mal auf und haengte damit an jedes Bewertungsfeld einen zweiten Listener:
     jede Auswahl loeste danach doppelt aus. Jetzt darf refresh beliebig oft
     laufen, addEventListener genau einmal. */
  function refreshRatingRow(row, fromUser) {
    const parts = row.__rate;
    if (!parts) return;
    const { radios, box, label, help, textarea } = parts;

    const selected = radios.find((radio) => radio.checked);
    const value = selected ? selected.value : '';
    const wasHidden = box.hidden;

    /* Beide Enden der Skala oeffnen ein Feld, nur mit vertauschten Rollen:
       die 1 verlangt eine Begruendung, die 5 laedt zu einer ein. */
    box.hidden = value !== '1' && value !== '5';
    box.classList.toggle('rate__comment--must', value === '1');
    box.classList.toggle('rate__comment--good', value === '5');
    textarea.dataset.required = value === '1' ? 'true' : 'false';

    if (fromUser && wasHidden && !box.hidden) {
      /* Nur das Aufblenden erklaert, dass dieses Feld eine Folge der eigenen
         Auswahl ist. Beim Wiederherstellen waere es eine Animation ohne
         Ursache, deshalb haengt die Klasse an fromUser. */
      box.classList.remove('is-revealed');
      void box.offsetWidth;
      box.classList.add('is-revealed');
      box.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
    if (box.hidden) box.classList.remove('is-revealed');

    if (value === '1') {
      label.textContent = 'Was sollten wir hier verbessern?';
      help.textContent = 'Kurz genügt. Diese Angabe brauchen wir.';
    } else if (value === '5') {
      label.textContent = 'Was hat hier besonders gut funktioniert?';
      help.textContent = 'Freiwillig. Hilft uns aber sehr, das beizubehalten.';
    }

    if (value !== '1') clearFieldError(textarea);
  }

  function setupRatingRow(row) {
    const radios = [...row.querySelectorAll('input[type="radio"]')];
    const box = row.querySelector('[data-comment]');
    const label = row.querySelector('[data-comment-label]');
    const help = row.querySelector('[data-comment-help]');
    const textarea = box && box.querySelector('textarea');
    if (!box || !label || !help || !textarea || !radios.length) return;

    row.__rate = { radios, box, label, help, textarea };

    radios.forEach((radio) => radio.addEventListener('change', () => {
      refreshRatingRow(row, true);
      onFormChanged();
    }));
    textarea.addEventListener('input', () => clearFieldError(textarea));
    refreshRatingRow(row, false);
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

    [['dealer_name', 'Händlerbetrieb', 'Bitte trag deinen Händlerbetrieb ein.'],
     ['name', 'Dein Name', 'Bitte trag deinen Namen ein.']].forEach(([id, label, message]) => {
      const el = document.getElementById(id);
      if (!el || !inScope(el)) return;
      if (el.value.trim().length < 2) {
        showFieldError(el, message);
        problems.push({ el, label, panel: panelOf(el) });
      } else {
        clearFieldError(el);
      }
    });

    /* Zwei Meldungen statt einer: "fehlt" und "hat das falsche Format" sind
       verschiedene Lagen, und wer 3451 getippt hat, sucht sonst den Fehler an
       der falschen Stelle. */
    const nummer = document.getElementById('dealer_number');
    if (nummer && inScope(nummer)) {
      const wert = nummer.value.trim();
      if (!wert) {
        showFieldError(nummer, 'Bitte trag deine Händlernummer ein.');
        problems.push({ el: nummer, label: 'Händlernummer', panel: panelOf(nummer) });
      } else if (!DEALER_NUMBER.test(wert)) {
        showFieldError(nummer, 'Die Händlernummer besteht aus genau fünf Ziffern, zum Beispiel 34512.');
        problems.push({ el: nummer, label: 'Händlernummer', panel: panelOf(nummer) });
      } else {
        clearFieldError(nummer);
      }
    }

    rows.forEach((row) => {
      const textarea = row.querySelector('[data-comment] textarea');
      if (!textarea || !inScope(textarea)) return;
      if (textarea.dataset.required === 'true' && !textarea.value.trim()) {
        showFieldError(textarea, 'Bitte beschreib kurz, was wir verbessern können.');
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

  /* --------------------------------------------------------- Haendlernummer
     Alles, was keine Ziffer ist, faellt schon beim Tippen weg: Leerzeichen aus
     "34 512", Punkte, ein vorangestelltes "Nr.". Sonst scheitert die Pruefung
     an einer Eingabe, die der Teilnehmer fuer richtig haelt - und er sieht
     nicht, woran. Der Wert wird nur zurueckgeschrieben, wenn wirklich etwas
     entfernt wurde, sonst springt die Schreibmarke bei jedem Zeichen ans Ende. */

  const dealerNumberInput = document.getElementById('dealer_number');
  if (dealerNumberInput) {
    dealerNumberInput.addEventListener('input', () => {
      const nurZiffern = dealerNumberInput.value.replace(/\D/g, '').slice(0, 5);
      if (nurZiffern !== dealerNumberInput.value) dealerNumberInput.value = nurZiffern;
      clearFieldError(dealerNumberInput);
    });
  }

  /* ------------------------------------------------------------- Fortschritt */

  const TRACKED = ['dealer_name', 'dealer_number', 'name', 'overall', ...RATING_KEYS, 'weiterempfehlung'];

  /* Zwei Zeichen genuegen sonst, um ein Textfeld als beantwortet zu zaehlen.
     Bei der Haendlernummer waere "34" damit erledigt, obwohl die Pruefung sie
     zurueckweist: der Zaehler im Kopf verspraeche einen Fortschritt, den der
     Weiter-Knopf gleich wieder einkassiert. */
  const ANSWERED_MIN = { dealer_number: 5 };

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
      /* Normal geschrieben, die Versalien macht das Stylesheet: der Text ist
         Teil des Beschriftungstextes und wird mitgelesen. Das Wort steht in
         einem eigenen Element, weil es auf schmalen Geraeten nur noch
         vorgelesen und nicht mehr angezeigt wird. */
      if (platz < 0) {
        rank.replaceChildren();
        return;
      }
      const wort = document.createElement('span');
      wort.className = 'isle__rankWord';
      wort.textContent = 'Platz ';
      rank.replaceChildren(wort, document.createTextNode(String(platz + 1)));
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
      /* Ohne aria-current hoert man beim Durchtabben sechs gleich klingende
         Schaltflaechen und nicht, an welcher Stelle man gerade steht. */
      if (state === 'current') button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
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
        if (nodes.value.trim().length >= (ANSWERED_MIN[key] || 2)) count += 1;
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

    /* Frueher haengte diese Zeile an einem Balken-Element, das es in v13 gar
       nicht mehr gibt: die Segmentanzeige hat ihn abgeloest. Die Pruefung auf
       das fehlende Element brach die Funktion vorher ab, weshalb im Kopf
       dauerhaft "0 von 17 beantwortet" stand, egal wie viel ausgefuellt war. */
    if (!railCount) return;
    const done = answeredCount();
    railCount.textContent = `${done} von ${TRACKED.length} beantwortet`;
  }

  /* ------------------------------------------------------------------ Entwurf */

  let saveTimer = 0;
  let current = 0;
  let aufgebaut = false;

  function collectDraft() {
    const draft = { __panel: current, __isles: islandOrder.slice() };
    for (const el of form.elements) {
      if (!el.name || ['website', 'form-name', 'payload'].includes(el.name)) continue;
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
    rows.forEach((row) => refreshRatingRow(row, false));
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
    const rueckwaerts = target < current;
    const wechsel = target !== current;
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

    /* 'instant' statt 'auto': 'auto' bedeutet laut Spezifikation "nimm das
       CSS scroll-behavior", und das steht hier auf smooth. Jeder Schrittwechsel
       hat deshalb den ganzen Weg nach oben weggescrollt, teils ueber 800 px.
       Das kostete bei jedem Klick eine halbe Sekunde, in der die neue Seite
       schon da war. Fuer Ankerspruenge bleibt smooth erhalten. */
    window.scrollTo({ top: 0, behavior: 'instant' });
    const panel = panels[target];
    if (panel) {
      /* Beim ersten Aufbau nicht animieren: da erklaert die Bewegung nichts,
         sie verzoegert nur den ersten Eindruck. */
      if (wechsel && aufgebaut) {
        panel.classList.remove('is-entering', 'is-entering--back');
        void panel.offsetWidth;
        panel.classList.add('is-entering');
        if (rueckwaerts) panel.classList.add('is-entering--back');
      }
      /* Fokus NUR beim echten Schrittwechsel setzen. Beim Aufbau der Seite
         haette ihn das auf das Panel gezogen, und weil der Sprunglink im
         Quelltext davor steht, war er danach mit Tab nicht mehr erreichbar:
         der erste Tabulator landete direkt auf "Feedback starten". Ohne
         diesen Aufruf bleibt der Startpunkt der Tabreihenfolge am
         Dokumentanfang, wo der Sprunglink hingehoert. */
      if (aufgebaut) panel.focus({ preventScroll: true });
    }

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

  /* Der Sprunglink zeigte auf #panel-1, und dieses Panel ist auf dem
     Startbildschirm noch versteckt: der Klick landete im Nichts, der Fokus
     blieb auf dem Body. Fuer Tastaturnutzende war das der einzige angebotene
     Weg an den Anfang des Bogens. Jetzt startet er ihn wirklich. */
  const skipLink = document.querySelector('.skip');
  if (skipLink) {
    skipLink.addEventListener('click', (event) => {
      event.preventDefault();
      const ziel = current > 0 ? current : (draftPanel || 1);
      goTo(ziel, true);
      const panel = panels[ziel];
      if (panel) panel.focus({ preventScroll: true });
    });
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
          /* Sehend erkennt man den Stillstand am roten Feld. Ohne Ansage bleibt
             fuer Vorlesesoftware sonst nur ein Knopf, der scheinbar nichts tut. */
          if (announce) {
            announce.textContent = problems.length === 1
              ? `Es fehlt noch eine Angabe: ${problems[0].label}.`
              : `Es fehlen noch ${problems.length} Angaben auf diesem Schritt.`;
          }
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
      rows.forEach((row) => refreshRatingRow(row, false));
      draftPanel = 1;
      maxVisited = 1;
      islandOrder = [];
      updateIslands();
      if (draftNote) draftNote.hidden = true;
      updateProgress();
      if (announce) announce.textContent = 'Der gespeicherte Entwurf wurde gelöscht. Du beginnst von vorn.';
      /* Der geklickte Knopf verschwindet mit dem Hinweis. Ohne dieses Umsetzen
         faellt der Fokus auf den Body und die Tastaturposition geht verloren. */
      if (startButton) {
        startButton.textContent = 'Feedback starten';
        startButton.focus();
      }
    });
  }

  /* -------------------------------------------------------------- Danke-Ansicht */

  function showDone(name) {
    if (!doneScreen || !doneName) return;
    /* Erst hier einsammeln: der Vorschau-Hinweis wird nachtraeglich angehaengt
       und muss ebenfalls aus dem Zugriff, sonst bleibt hinter dem Dialog ein
       fokussierbarer Rest liegen. */
    const pageRegions = ['.masthead', '.rail', '.main', '.stepbar', '.foot', '.demo', '.skip']
      .map((selector) => document.querySelector(selector))
      .filter(Boolean);
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
       Die Rating-Eintraege tragen ALLE dieselbe Zahl - eine Gewichtung nach
       Platz wuerde den Contest still veraendern. Die Rangfolge steckt in
       islandChoices und im raw_payload.

       Diese Zahl ist seit v14 die 5 statt der 1: es ist die Bestnote, und eine
       Lieblingsinsel mit der schlechtesten Note zu markieren waere im Bestand
       nicht mehr lesbar. Der Contest zaehlt fuer v14-Zeilen entsprechend ueber
       anzahl_note_5, nicht mehr ueber anzahl_note_1 (siehe
       supabase_v14_migration.sql). */
    const islandChoices = [];
    const gewaehlt = islandOrder.length
      ? islandOrder
      : data.getAll('inseln').map(String);

    for (const value of gewaehlt) {
      const definition = islandDefinitions[value];
      if (!definition) continue;
      const [itemKey, itemLabel] = definition;
      islandChoices.push(itemLabel);
      ratings.push({ sectionKey: 'schulungsinseln', itemKey, itemLabel, rating: 5, comment: null });
    }

    return {
      submissionId: submissionId(),
      createdClientAt: new Date().toISOString(),
      eventSlug: 'campus-2026',
      formVersion: form.dataset.formVersion || 'campus-2026-haendler-v14',
      dealerName: String(data.get('dealer_name') || '').trim(),
      /* Zeichenkette, nicht Number: 03451 ist eine gueltige Haendlernummer und
         wuerde als Zahl zu 3451 zusammenfallen. Bis die Migration eingespielt
         ist, landet der Wert ausschliesslich im raw_payload - der Bogen
         funktioniert dadurch schon vorher vollstaendig. */
      dealerNumber: String(data.get('dealer_number') || '').trim(),
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
      source: 'thitronik-campus-feedback-v14',
      ratings
    };
  }

  async function saveToNetlify(payload) {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 18000);

    try {
      if (netlifyPayload) netlifyPayload.value = JSON.stringify(payload);
      const fields = new URLSearchParams();
      for (const [name, value] of new FormData(form).entries()) {
        fields.append(name, String(value));
      }

      const response = await fetch(form.action || window.location.pathname, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: fields.toString(),
        signal: controller.signal
      });

      const text = await response.text();
      if (!response.ok) {
        const error = new Error(`Netlify Forms HTTP ${response.status}${text ? `: ${text}` : ''}`);
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
      return 'Die Speicherung hat zu lange gedauert. Bitte prüf deine Verbindung und send erneut. Deine Eingaben bleiben erhalten.';
    }
    const status = error && error.httpStatus;
    if (status === 401 || status === 403) {
      return 'Die Speicherung wurde abgewiesen. Bitte wend dich kurz an das THITRONIK Team.';
    }
    if (status === 404) {
      return 'Der Feedback-Dienst ist momentan nicht erreichbar. Bitte wend dich kurz an das THITRONIK Team.';
    }
    return 'Das Feedback konnte gerade nicht gespeichert werden. Bitte versuch es erneut. Deine Eingaben bleiben erhalten.';
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
    setStatus('Dein Feedback wird gespeichert.');

    try {
      await saveToNetlify(payload);
      const participantName = payload.participantName;
      dropDraft();
      delete form.dataset.submissionId;
      showDone(participantName);
    } catch (error) {
      console.error('Feedback-Speicherfehler:', error);
      setStatus(messageForError(error), 'error');
      if (statusEl) statusEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } finally {
      nextButton.disabled = false;
      nextButton.removeAttribute('aria-busy');
      if (nextLabel) nextLabel.textContent = 'Feedback absenden';
    }
  });

  /* -------------------------------------------------------------------- Aufbau */

  if (restoreDraft()) {
    if (draftNote) draftNote.hidden = false;
    /* "Feedback starten" waere hier gelogen: der Knopf setzt fort. */
    if (startButton) startButton.textContent = 'Weiter ausfüllen';
  }

  /* Nach dem Entwurf, nicht davor: Was hier schon steht, hat der Teilnehmer
     selbst eingetippt und wiegt schwerer als der Eintrag aus dem Quiz. Es
     werden ausschliesslich leere Felder gefuellt, und nichts wird
     abgeschickt, ohne dass jemand die Angaben gesehen hat — sie stehen auf
     Schritt 1 offen da. */
  (function ausQuizVorbelegen() {
    let daten;
    try {
      const roh = localStorage.getItem(QUIZ_KEY);
      daten = roh ? JSON.parse(roh) : null;
    } catch (error) { return; }
    if (!daten || typeof daten !== 'object') return;

    const felder = [
      ['dealer_name', daten.dealer],
      ['dealer_number', daten.dealerNumber],
      ['name', daten.name]
    ];
    let gefuellt = 0;
    for (const [id, wert] of felder) {
      const feld = document.getElementById(id);
      if (!feld || feld.value.trim() || typeof wert !== 'string' || !wert.trim()) continue;
      feld.value = wert.trim();
      gefuellt++;
    }
    if (!gefuellt) return;

    const hinweis = document.getElementById('quiz-uebernahme');
    if (hinweis) hinweis.hidden = false;
  })();
  updateIslands();
  updateProgress();

  /* Direkteinstieg per #schritt-N erlauben, sonst Startbildschirm. */
  const fromHash = /^#schritt-(\d)$/.exec(window.location.hash);
  const initial = fromHash ? Number(fromHash[1]) : 0;
  window.history.replaceState({ panel: initial }, '', window.location.hash || '#start');
  goTo(initial, false);
  aufgebaut = true;
})();
