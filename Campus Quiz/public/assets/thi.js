"use strict";

/* ==========================================================================
   THI — Assistent im THITRONIK Campus (Browserteil)
   --------------------------------------------------------------------------
   Baut den Schalter in der Kopfzeile, das Panel und den Gesprächsverlauf.
   Gefragt wird die Netlify Function /.netlify/functions/thi; alles Weitere —
   Suche im Wissensbestand, Modellaufruf, Schlüssel — passiert dort.

   Ohne Rahmenwerk, wie der Rest des Campus. Die Engine ist Vanilla, und ein
   zweites Programmiermodell für ein Seitenpanel wäre schlechter Tausch.

   ZWEI ENTSCHEIDUNGEN, DIE ERKLÄRUNG BRAUCHEN:

   1. Der Verlauf liegt in sessionStorage, nicht in localStorage. Die
      Campus-Tablets werden weitergereicht. Ein Verlauf, der den Tab überlebt,
      zeigt dem nächsten Teilnehmer die Fragen des vorigen. sessionStorage
      überlebt Screenwechsel und Neuladen, endet aber mit dem Tab.

   2. Antworttext wird NIE als HTML eingesetzt. Der Text kommt aus einem
      Sprachmodell und damit aus einer Quelle, die niemand kontrolliert. Alles
      geht über textContent; die Formatierung baut zeichenweise echte
      Elemente. Die Sicherheitsregeln der Seite (script-src 'self') würden
      eingeschleustes Skript zwar ohnehin nicht ausführen — aber sich darauf
      zu verlassen, wäre eine Ebene zu wenig.
   ========================================================================== */

(function () {
  const ENDPUNKT = "/.netlify/functions/thi";
  const SPEICHER = "thiCampusVerlauf";
  const MAX_NACHRICHTEN = 24;
  const MAX_ZEICHEN = 4000;
  const SUPPORT = "+49 (0)4351 76744-112";

  /* Vorschläge für den leeren Zustand. Bewusst gemischt: eine Produktfrage,
     eine Einbaufrage, eine Diagnosefrage, eine Campusfrage — damit auf einen
     Blick klar ist, wofür THI zuständig ist. */
  const VORSCHLAEGE = [
    "Wie lerne ich einen Funk-Magnetkontakt an?",
    "Wo darf die WiPro-III-Zentrale eingebaut werden?",
    "Was bedeutet ein Fehlalarm am Erschütterungssensor?",
    "Wie läuft der Wissenscheck ab?"
  ];

  // --------------------------------------------------------------- Zustand --

  let nachrichten = [];   // [{ rolle: "nutzer" | "thi", text }]
  let laeuft = false;
  let abbruch = null;     // AbortController der laufenden Anfrage
  let offen = false;
  let zuletztFokussiert = null;

  let panel, schleier, schalter, verlaufEl, eingabeEl, sendenEl, leerenEl;

  // ----------------------------------------------------------------- Symbole -

  /* Alle Symbole werden aus Einzelteilen gebaut statt als HTML-Zeichenkette
     eingesetzt — dieselbe Regel wie für den Antworttext, ohne Ausnahme. */
  function svg(viewBox, teile, klasse) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    el.setAttribute("viewBox", viewBox);
    el.setAttribute("focusable", "false");
    el.setAttribute("aria-hidden", "true");
    if (klasse) el.setAttribute("class", klasse);
    for (const [name, attribute] of teile) {
      const kind = document.createElementNS("http://www.w3.org/2000/svg", name);
      for (const schluessel in attribute) kind.setAttribute(schluessel, attribute[schluessel]);
      el.appendChild(kind);
    }
    return el;
  }

  /* Das Gesicht von THI, unverändert aus dem Standalone-Entwurf übernommen.
     Die Farben stehen bewusst fest statt als Token: das Gesicht ist ein
     Logo-Element und soll überall gleich aussehen. */
  function avatar() {
    return svg("0 0 48 48", [
      ["line", { x1: 24, y1: 7, x2: 24, y2: 12, stroke: "#3BA9D3", "stroke-width": 2, "stroke-linecap": "round" }],
      ["circle", { cx: 24, cy: 5.5, r: 2.6, fill: "#CE132D" }],
      ["rect", { x: 5.5, y: 21, width: 3, height: 8, rx: 1.5, fill: "#3BA9D3" }],
      ["rect", { x: 39.5, y: 21, width: 3, height: 8, rx: 1.5, fill: "#3BA9D3" }],
      ["rect", { x: 9, y: 12, width: 30, height: 26, rx: 9, fill: "#1D3661", stroke: "#3BA9D3", "stroke-width": 2 }],
      ["rect", { x: 16, y: 20, width: 5, height: 8, rx: 2.5, fill: "#3BA9D3" }],
      ["rect", { x: 27, y: 20, width: 5, height: 8, rx: 2.5, fill: "#3BA9D3" }],
      ["circle", { cx: 18.5, cy: 22.5, r: 1, fill: "#EAF6FC" }],
      ["circle", { cx: 29.5, cy: 22.5, r: 1, fill: "#EAF6FC" }],
      ["path", { d: "M18 31 Q24 35 30 31", stroke: "#3BA9D3", "stroke-width": 2, "stroke-linecap": "round", fill: "none" }]
    ]);
  }

  /* Derselbe Roboter als Strichzeichnung. Der Schalter in der Kopfzeile
     steht neben Arbeitskarte und Feedbackbogen; deren Symbole sind
     einfarbige Linien auf hellblauem Feld. Ein vollfarbiger Avatar auf
     Navy daneben liest sich nicht als drittes Werkzeug, sondern als
     Fremdkoerper. Die Farbfassung bleibt dort, wo sie Platz hat: im
     Kopf des Fensters und vor den Antworten. */
  const symbolTHI = () => svg("0 0 24 24", [
    ["circle", { cx: 12, cy: 3, r: 1.2 }],
    ["path", { d: "M12 4.4V6.6" }],
    ["rect", { x: 3.8, y: 6.6, width: 16.4, height: 12.6, rx: 4.2 }],
    ["path", { d: "M2 11.6v3M22 11.6v3" }],
    ["path", { d: "M9.2 11.3v1.7M14.8 11.3v1.7" }],
    ["path", { d: "M9.6 16q2.4 1.5 4.8 0" }]
  ]);

  const symbolSchliessen = () => svg("0 0 24 24", [["path", { d: "M6 6l12 12M18 6L6 18" }]]);
  const symbolSenden = () => svg("0 0 24 24", [["path", { d: "M4 12h15M13 6l6 6-6 6" }]]);
  const symbolStop = () => svg("0 0 24 24", [["rect", { x: 6, y: 6, width: 12, height: 12, rx: 2 }]]);
  const symbolFrage = () => svg("0 0 24 24", [["path", { d: "M4 12h14M12 6l6 6-6 6" }]]);
  const symbolPfeil = () => svg("0 0 24 24", [["path", { d: "M5 8v6a3 3 0 0 0 3 3h11M15 13l4 4-4 4" }]]);

  // ------------------------------------------------------------- Textausgabe -

  /* Fett und Code innerhalb einer Zeile. Alles andere bleibt Text — auch ein
     Sternchen, das keinen Partner hat. */
  function zeileEinsetzen(ziel, text) {
    const muster = /(\*\*[^*]+\*\*|`[^`]+`)/g;
    let letzte = 0;
    let treffer;
    while ((treffer = muster.exec(text)) !== null) {
      if (treffer.index > letzte) {
        ziel.appendChild(document.createTextNode(text.slice(letzte, treffer.index)));
      }
      const stueck = treffer[0];
      if (stueck.startsWith("**")) {
        const stark = document.createElement("strong");
        stark.textContent = stueck.slice(2, -2);
        ziel.appendChild(stark);
      } else {
        const code = document.createElement("code");
        code.textContent = stueck.slice(1, -1);
        ziel.appendChild(code);
      }
      letzte = treffer.index + stueck.length;
    }
    if (letzte < text.length) ziel.appendChild(document.createTextNode(text.slice(letzte)));
  }

  /** Setzt eine Antwort als Absätze und Aufzählungen in ein Element.
   *
   *  Bewusst klein gehalten: THI antwortet in Fließtext mit kurzen Listen.
   *  Ein vollständiger Markdown-Umsetzer wäre mehr Angriffsfläche für
   *  Formatierung, die hier nie vorkommt. */
  function textEinsetzen(ziel, text) {
    ziel.textContent = "";
    const zeilen = String(text || "").split("\n");
    let liste = null;
    let absatz = null;

    const absatzSchliessen = () => { absatz = null; };
    const listeSchliessen = () => { liste = null; };

    for (const roh of zeilen) {
      const zeile = roh.trimEnd();
      const punkt = /^\s*[-*•]\s+(.*)$/.exec(zeile);
      const nummer = /^\s*\d+[.)]\s+(.*)$/.exec(zeile);

      if (!zeile.trim()) { absatzSchliessen(); listeSchliessen(); continue; }

      if (punkt || nummer) {
        absatzSchliessen();
        const art = punkt ? "ul" : "ol";
        if (!liste || liste.tagName.toLowerCase() !== art) {
          liste = document.createElement(art);
          ziel.appendChild(liste);
        }
        const eintrag = document.createElement("li");
        zeileEinsetzen(eintrag, (punkt || nummer)[1]);
        liste.appendChild(eintrag);
        continue;
      }

      listeSchliessen();
      if (!absatz) {
        absatz = document.createElement("p");
        ziel.appendChild(absatz);
      } else {
        absatz.appendChild(document.createTextNode(" "));
      }
      zeileEinsetzen(absatz, zeile.trim());
    }
  }

  /** Trennt den Folgefragen-Marker vom Antworttext.
   *  Format: [[FOLGEFRAGEN: Erste Frage? | Zweite Frage?]] */
  function folgefragenTrennen(text) {
    const muster = /\[\[FOLGEFRAGEN:\s*([^\]]*)\]\]/;
    const treffer = muster.exec(text);
    if (!treffer) return { text, fragen: [] };
    const fragen = treffer[1]
      .split("|")
      .map((f) => f.trim())
      .filter((f) => f.length > 1 && f.length < 140)
      .slice(0, 3);
    return { text: text.replace(muster, "").trim(), fragen };
  }

  // ----------------------------------------------------------------- Aufbau --

  function baueSchalter() {
    const knopf = document.createElement("button");
    knopf.type = "button";
    knopf.className = "masthead-tool thi-schalter";
    knopf.id = "thi-schalter";
    knopf.setAttribute("aria-expanded", "false");
    knopf.setAttribute("aria-controls", "thi-panel");

    const symbol = document.createElement("span");
    symbol.className = "ta-icon";
    symbol.appendChild(symbolTHI());

    const text = document.createElement("span");
    text.className = "ta-text";
    const titel = document.createElement("span");
    titel.className = "ta-title";
    titel.textContent = "THI fragen";
    text.appendChild(titel);

    const punkt = document.createElement("span");
    punkt.className = "thi-punkt";

    knopf.append(symbol, text, punkt);
    knopf.addEventListener("click", umschalten);
    return knopf;
  }

  function baueKopf() {
    const kopf = document.createElement("div");
    kopf.className = "thi-kopf";

    const bild = document.createElement("span");
    bild.className = "thi-kopf-avatar";
    bild.appendChild(avatar());

    const text = document.createElement("span");
    text.className = "thi-kopf-text";
    const name = document.createElement("strong");
    name.className = "thi-kopf-name";
    name.id = "thi-panel-titel";
    name.textContent = "THI";
    const rolle = document.createElement("small");
    rolle.className = "thi-kopf-rolle";
    rolle.textContent = "Assistent für Produkt- und Campusfragen";
    text.append(name, rolle);

    const zu = document.createElement("button");
    zu.type = "button";
    zu.className = "thi-kopf-knopf";
    zu.setAttribute("aria-label", "THI schließen");
    zu.appendChild(symbolSchliessen());
    zu.addEventListener("click", schliessen);

    kopf.append(bild, text, zu);
    return kopf;
  }

  function baueFuss() {
    const fuss = document.createElement("div");
    fuss.className = "thi-fuss";

    const feld = document.createElement("div");
    feld.className = "thi-eingabe-feld";

    eingabeEl = document.createElement("textarea");
    eingabeEl.className = "thi-eingabe";
    eingabeEl.rows = 1;
    eingabeEl.placeholder = "Frage an THI …";
    eingabeEl.setAttribute("aria-label", "Frage an THI");
    eingabeEl.maxLength = MAX_ZEICHEN;
    eingabeEl.addEventListener("input", hoeheAnpassen);
    eingabeEl.addEventListener("keydown", (e) => {
      // Enter sendet, Umschalt+Enter macht einen Zeilenumbruch. Auf dem Tablet
      // liefert die Bildschirmtastatur häufig isComposing — dann nicht senden,
      // sonst reisst die Worterkennung die Eingabe auseinander.
      if (e.key === "Enter" && !e.shiftKey && !e.isComposing) {
        e.preventDefault();
        absenden();
      }
    });

    sendenEl = document.createElement("button");
    sendenEl.type = "button";
    sendenEl.className = "thi-senden";
    sendenEl.setAttribute("aria-label", "Frage senden");
    sendenEl.appendChild(symbolSenden());
    sendenEl.addEventListener("click", () => (laeuft ? abbrechen() : absenden()));

    feld.append(eingabeEl, sendenEl);

    const zeile = document.createElement("div");
    zeile.className = "thi-fuss-zeile";
    const hinweis = document.createElement("small");
    hinweis.className = "thi-fuss-text";
    hinweis.textContent = "THI kann sich irren. Im Zweifel: Support " + SUPPORT;

    leerenEl = document.createElement("button");
    leerenEl.type = "button";
    leerenEl.className = "thi-leeren";
    leerenEl.textContent = "Gespräch löschen";
    leerenEl.hidden = true;
    leerenEl.addEventListener("click", leeren);

    zeile.append(hinweis, leerenEl);
    fuss.append(feld, zeile);
    return fuss;
  }

  function bauePanel() {
    schleier = document.createElement("div");
    schleier.className = "thi-schleier";
    schleier.addEventListener("click", schliessen);

    panel = document.createElement("aside");
    panel.className = "thi-panel";
    panel.id = "thi-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "false");
    panel.setAttribute("aria-labelledby", "thi-panel-titel");
    panel.hidden = false;

    verlaufEl = document.createElement("div");
    verlaufEl.className = "thi-verlauf";
    // Neue Antworten sollen angesagt werden, aber nicht Wort für Wort
    // während des Stroms — deshalb polite und kein aria-atomic.
    verlaufEl.setAttribute("aria-live", "polite");

    panel.append(baueKopf(), verlaufEl, baueFuss());
    document.body.append(schleier, panel);
  }

  function hoeheAnpassen() {
    eingabeEl.style.height = "auto";
    eingabeEl.style.height = Math.min(eingabeEl.scrollHeight, 132) + "px";
  }

  // ------------------------------------------------------------- Darstellung -

  function startAnzeigen() {
    const start = document.createElement("div");
    start.className = "thi-start";

    const kopf = document.createElement("div");
    kopf.className = "thi-start-kopf";
    kopf.appendChild(avatar());
    const titel = document.createElement("p");
    titel.className = "thi-start-titel";
    titel.textContent = begruessung() + "! Ich bin THI.";
    const text = document.createElement("p");
    text.className = "thi-start-text";
    text.textContent =
      "Frag mich zu THITRONIK-Produkten — WiPro III, G.A.S.-Reihe, Pro-Finder, "
      + "Einbau und Fehlersuche — oder zum Ablauf des Campus.";
    kopf.append(titel, text);

    const liste = document.createElement("div");
    liste.className = "thi-vorschlaege";
    for (const frage of VORSCHLAEGE) {
      const knopf = document.createElement("button");
      knopf.type = "button";
      knopf.className = "thi-vorschlag";
      knopf.appendChild(symbolFrage());
      const beschriftung = document.createElement("span");
      beschriftung.textContent = frage;
      knopf.appendChild(beschriftung);
      knopf.addEventListener("click", () => stellen(frage));
      liste.appendChild(knopf);
    }

    start.append(kopf, liste);
    verlaufEl.appendChild(start);
  }

  function begruessung() {
    const stunde = new Date().getHours();
    if (stunde < 11) return "Guten Morgen";
    if (stunde >= 18) return "Guten Abend";
    return "Hallo";
  }

  /** Baut eine Nachrichtenzeile. Gibt die Blase zurueck, damit der Strom
   *  weiterschreiben kann. */
  function zeileAnlegen(rolle) {
    const zeile = document.createElement("div");
    zeile.className = "thi-zeile " + (rolle === "nutzer" ? "von-nutzer" : "von-thi");

    if (rolle === "thi") {
      const bild = document.createElement("span");
      bild.className = "thi-zeile-avatar";
      bild.appendChild(avatar());
      zeile.appendChild(bild);
    }

    const blase = document.createElement("div");
    blase.className = "thi-blase";
    zeile.appendChild(blase);
    verlaufEl.appendChild(zeile);
    return blase;
  }

  function folgefragenAnzeigen(blase, fragen) {
    if (!fragen.length) return;
    const feld = document.createElement("div");
    feld.className = "thi-folge";
    for (const frage of fragen) {
      const knopf = document.createElement("button");
      knopf.type = "button";
      knopf.className = "thi-folge-knopf";
      knopf.appendChild(symbolPfeil());
      const text = document.createElement("span");
      text.textContent = frage;
      knopf.appendChild(text);
      knopf.addEventListener("click", () => {
        feld.remove();  // eine Folgefrage wird einmal gestellt
        stellen(frage);
      });
      feld.appendChild(knopf);
    }
    blase.appendChild(feld);
  }

  function hinweisAnzeigen(titel, text, ruhig) {
    const feld = document.createElement("div");
    feld.className = "thi-hinweis" + (ruhig ? " ist-ruhig" : "");
    if (titel) {
      const stark = document.createElement("strong");
      stark.textContent = titel;
      feld.appendChild(stark);
    }
    feld.appendChild(document.createTextNode(text));
    verlaufEl.appendChild(feld);
    nachUnten();
  }

  function nachUnten() {
    verlaufEl.scrollTop = verlaufEl.scrollHeight;
  }

  function neuZeichnen() {
    verlaufEl.textContent = "";
    if (!nachrichten.length) {
      startAnzeigen();
    } else {
      for (const n of nachrichten) {
        const blase = zeileAnlegen(n.rolle);
        if (n.rolle === "nutzer") blase.textContent = n.text;
        else {
          const { text, fragen } = folgefragenTrennen(n.text);
          textEinsetzen(blase, text);
          folgefragenAnzeigen(blase, fragen);
        }
      }
    }
    leerenEl.hidden = nachrichten.length === 0;
    // Nur bei laufendem Gespräch ans Ende springen — im leeren Zustand stünde
    // sonst die Begrüßung über dem sichtbaren Bereich (siehe oeffnen()).
    if (nachrichten.length) nachUnten();
  }

  // ------------------------------------------------------------- Speicherung -

  function sichern() {
    try {
      sessionStorage.setItem(SPEICHER, JSON.stringify(nachrichten.slice(-MAX_NACHRICHTEN)));
    } catch { /* privater Modus oder voll — der Verlauf ist dann nur flüchtig */ }
  }

  function laden() {
    try {
      const roh = sessionStorage.getItem(SPEICHER);
      if (!roh) return;
      const wert = JSON.parse(roh);
      if (!Array.isArray(wert)) return;
      nachrichten = wert
        .filter((n) => n && (n.rolle === "nutzer" || n.rolle === "thi") && typeof n.text === "string")
        .slice(-MAX_NACHRICHTEN);
    } catch { /* unlesbar: leer starten */ }
  }

  function leeren() {
    if (laeuft) abbrechen();
    nachrichten = [];
    try { sessionStorage.removeItem(SPEICHER); } catch { /* egal */ }
    neuZeichnen();
    eingabeEl.focus();
  }

  // ------------------------------------------------------------------ Fragen -

  function absenden() {
    const text = eingabeEl.value.trim();
    if (!text) return;
    eingabeEl.value = "";
    hoeheAnpassen();
    stellen(text);
  }

  function stellen(frage) {
    if (laeuft) return;
    const text = String(frage || "").trim().slice(0, MAX_ZEICHEN);
    if (!text) return;

    // Der leere Zustand verschwindet mit der ersten Frage.
    const start = verlaufEl.querySelector(".thi-start");
    if (start) start.remove();

    nachrichten.push({ rolle: "nutzer", text });
    const nutzerBlase = zeileAnlegen("nutzer");
    nutzerBlase.textContent = text;
    leerenEl.hidden = false;
    nachUnten();

    fragen();
  }

  function laufendSetzen(an) {
    laeuft = an;
    sendenEl.classList.toggle("ist-abbruch", an);
    sendenEl.textContent = "";
    sendenEl.appendChild(an ? symbolStop() : symbolSenden());
    sendenEl.setAttribute("aria-label", an ? "Antwort abbrechen" : "Frage senden");
  }

  function abbrechen() {
    if (abbruch) abbruch.abort();
  }

  async function fragen() {
    laufendSetzen(true);
    abbruch = new AbortController();

    const blase = zeileAnlegen("thi");
    const status = document.createElement("div");
    status.className = "thi-status";
    const beschriftung = document.createElement("span");
    beschriftung.textContent = "Denkt nach …";
    const punkte = document.createElement("span");
    punkte.className = "thi-punkte";
    punkte.append(
      document.createElement("span"),
      document.createElement("span"),
      document.createElement("span")
    );
    status.append(punkte, beschriftung);
    blase.appendChild(status);
    nachUnten();

    let antwort = "";

    try {
      const res = await fetch(ENDPUNKT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nachrichten: nachrichten.slice(-MAX_NACHRICHTEN) }),
        signal: abbruch.signal
      });

      if (!res.ok) {
        let meldung = "THI ist gerade nicht erreichbar.";
        let titel = "Nicht erreichbar";
        try {
          const fehler = await res.json();
          if (fehler && fehler.meldung) meldung = fehler.meldung;
          if (fehler && fehler.fehler === "kein_schluessel") titel = "Noch nicht aktiviert";
          if (fehler && fehler.fehler === "keine_adresse") titel = "Noch nicht aktiviert";
          if (fehler && fehler.fehler === "limit") titel = "Kurz warten";
        } catch {
          // Der lokale Entwicklungsserver liefert bei fehlender Function eine
          // Textseite statt JSON — das ist kein Fehlerfall, den der Teilnehmer
          // je sieht, aber beim Entwickeln der häufigste.
          meldung = "Die THI-Function antwortet nicht. Läuft sie lokal mit?";
        }
        blase.parentElement.remove();
        hinweisAnzeigen(titel, meldung, res.status === 503 || res.status === 429);
        return;
      }

      const leser = res.body.getReader();
      const decoder = new TextDecoder();
      let puffer = "";

      for (;;) {
        const { done, value } = await leser.read();
        if (done) break;
        puffer += decoder.decode(value, { stream: true });

        // Statusmarker [[STATUS:…]] aus dem Strom lösen. Sie kommen nur,
        // solange THI nachschlägt, und stehen nie mitten im Antworttext.
        let treffer;
        const muster = /\[\[STATUS:([^\]]*)\]\]/g;
        let letzteMeldung = null;
        while ((treffer = muster.exec(puffer)) !== null) letzteMeldung = treffer[1];
        if (letzteMeldung !== null) {
          beschriftung.textContent = letzteMeldung;
          puffer = puffer.replace(muster, "");
        }
        // Ein halb angekommener Marker darf nicht als Text erscheinen: alles ab
        // einer offenen Klammerfolge zurückhalten, bis sie vollständig ist.
        const offenerMarker = puffer.lastIndexOf("[[");
        const sichtbar = offenerMarker >= 0 && !puffer.slice(offenerMarker).includes("]]")
          ? puffer.slice(0, offenerMarker)
          : puffer;

        if (sichtbar.trim()) {
          if (status.isConnected) status.remove();
          antwort = sichtbar;
          const { text } = folgefragenTrennen(antwort);
          textEinsetzen(blase, text);
          nachUnten();
        }
      }

      antwort = puffer.replace(/\[\[STATUS:[^\]]*\]\]/g, "").trim();
      if (status.isConnected) status.remove();

      if (!antwort) {
        blase.parentElement.remove();
        hinweisAnzeigen(
          "Keine Antwort",
          "THI hat nichts zurückgegeben. Bitte die Frage neu stellen.",
          true
        );
        return;
      }

      const { text, fragen: folge } = folgefragenTrennen(antwort);
      textEinsetzen(blase, text);
      folgefragenAnzeigen(blase, folge);
      nachrichten.push({ rolle: "thi", text: antwort });
      sichern();
      nachUnten();

    } catch (fehler) {
      if (status.isConnected) status.remove();
      if (fehler && fehler.name === "AbortError") {
        // Abgebrochen: Teiltext behalten, wenn schon etwas da war.
        if (antwort.trim()) {
          const { text, fragen: folge } = folgefragenTrennen(antwort);
          textEinsetzen(blase, text);
          folgefragenAnzeigen(blase, folge);
          nachrichten.push({ rolle: "thi", text: antwort });
          sichern();
        } else {
          blase.parentElement.remove();
        }
      } else {
        blase.parentElement.remove();
        hinweisAnzeigen(
          "Verbindung unterbrochen",
          "Die Antwort kam nicht an. Bitte erneut versuchen — im Zweifel hilft der Support unter " + SUPPORT + ".",
          false
        );
      }
    } finally {
      laufendSetzen(false);
      abbruch = null;
    }
  }

  // ---------------------------------------------------------------- Bedienung -

  function umschalten() {
    if (offen) schliessen(); else oeffnen();
  }

  function oeffnen() {
    offen = true;
    zuletztFokussiert = document.activeElement;
    panel.classList.add("ist-offen");
    schleier.classList.add("ist-offen");
    schalter.setAttribute("aria-expanded", "true");
    schalter.classList.add("ist-gesehen");
    try { sessionStorage.setItem(SPEICHER + "Gesehen", "1"); } catch { /* egal */ }
    // Auf dem Telefon öffnet ein sofortiger Fokus die Tastatur und verdeckt
    // das halbe Panel, bevor man den Verlauf gesehen hat.
    if (window.matchMedia("(min-width: 641px)").matches) eingabeEl.focus();
    // Nur bei laufendem Gespräch ans Ende springen. Im leeren Zustand stünde
    // sonst die Begrüßung über dem sichtbaren Bereich und man sähe als Erstes
    // die letzte Vorschlagszeile.
    if (nachrichten.length) nachUnten();
  }

  function schliessen() {
    if (!offen) return;
    offen = false;
    panel.classList.remove("ist-offen");
    schleier.classList.remove("ist-offen");
    schalter.setAttribute("aria-expanded", "false");
    if (zuletztFokussiert && zuletztFokussiert.isConnected) zuletztFokussiert.focus();
    else schalter.focus();
  }

  // ------------------------------------------------------------------ Start --

  function starten() {
    const werkzeuge = document.querySelector(".masthead-tools");
    if (!werkzeuge) return; // Seite ohne Campus-Kopfzeile: THI gehört dort nicht hin

    schalter = baueSchalter();
    werkzeuge.appendChild(schalter);
    bauePanel();

    try {
      if (sessionStorage.getItem(SPEICHER + "Gesehen")) schalter.classList.add("ist-gesehen");
    } catch { /* egal */ }

    laden();
    neuZeichnen();

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && offen) schliessen();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", starten);
  } else {
    starten();
  }
})();
