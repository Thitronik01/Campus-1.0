"use strict";

/* ==========================================================================
   THITRONIK Campus — Ergebnisannahme
   --------------------------------------------------------------------------
   Der Browser sendet nur, WAS gewählt wurde. Bewertet wird ausschließlich
   hier, gegen dieselben JSON-Dateien, die auch die Engine ausliefert. Damit
   gibt es genau eine Wahrheitsquelle für die richtigen Antworten — und ein
   manipuliertes Ergebnis aus dem Browser landet nicht in der Datenbank.

   Die JSONs werden statisch eingebunden, damit esbuild sie mitbündelt.
   Eine neue Insel braucht deshalb zwei Zeilen: hier und in inseln.json.
   ========================================================================== */

const ISLANDS = {
  usedom: require("../../public/data/inseln/usedom.json")
};

const EVENT_SLUG = "campus-2026";
const TABLE = "campus_quiz_submissions";
const MAX_BODY_BYTES = 120_000;
const AREAS = ["", "verkauf", "werkstatt", "verkauf-werkstatt", "leitung", "sonstiges"];

// ------------------------------------------------------------------ Helfer --

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    },
    body: JSON.stringify(body)
  };
}

function cleanString(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function validDate(value) {
  const time = Date.parse(value);
  return Number.isFinite(time) ? new Date(time) : null;
}

function sameSet(left, right) {
  if (!Array.isArray(left) || !Array.isArray(right) || left.length !== right.length) return false;
  const a = left.slice().sort();
  const b = right.slice().sort();
  return a.every((value, index) => value === b[index]);
}

// ---------------------------------------------------------------- Bewertung --

/** Bewertet eine einzelne Antwort und normalisiert sie für die Ablage.
 *  Wirft bei allem, was strukturell nicht zur Frage passt. */
function scoreAnswer(question, given) {
  const answer = given && typeof given === "object" ? given : {};

  if (question.type === "single" || question.type === "truefalse" || question.type === "multi") {
    const selected = Array.isArray(answer.selected) ? answer.selected.map(String) : [];
    const valid = question.type === "truefalse"
      ? ["richtig", "falsch"]
      : question.options.map((option) => option.id);

    if (!selected.length) throw new Error(`Keine Auswahl bei ${question.id}.`);
    if (new Set(selected).size !== selected.length) throw new Error(`Doppelte Auswahl bei ${question.id}.`);
    if (!selected.every((id) => valid.includes(id))) throw new Error(`Unbekannte Option bei ${question.id}.`);
    if (question.type !== "multi" && selected.length !== 1) {
      throw new Error(`Bei ${question.id} ist genau eine Antwort erlaubt.`);
    }

    return { selected, is_correct: sameSet(selected, question.correct) };
  }

  if (question.type === "order") {
    const order = Array.isArray(answer.order) ? answer.order.map(String) : [];
    const valid = question.items.map((item) => item.id);

    if (order.length !== valid.length) throw new Error(`Unvollständige Reihenfolge bei ${question.id}.`);
    if (new Set(order).size !== order.length) throw new Error(`Doppelter Eintrag bei ${question.id}.`);
    if (!order.every((id) => valid.includes(id))) throw new Error(`Unbekannter Eintrag bei ${question.id}.`);

    return { order, is_correct: order.every((id, index) => id === question.correct[index]) };
  }

  if (question.type === "match") {
    const pairs = answer.pairs && typeof answer.pairs === "object" && !Array.isArray(answer.pairs)
      ? answer.pairs
      : null;
    if (!pairs) throw new Error(`Ungültige Zuordnung bei ${question.id}.`);

    const leftIds = question.left.map((item) => item.id);
    const rightIds = question.right.map((item) => item.id);
    const keys = Object.keys(pairs);

    if (!sameSet(keys, leftIds)) throw new Error(`Unvollständige Zuordnung bei ${question.id}.`);
    if (!keys.every((key) => rightIds.includes(String(pairs[key])))) {
      throw new Error(`Unbekannte Zuordnung bei ${question.id}.`);
    }

    const normalized = {};
    keys.forEach((key) => { normalized[key] = String(pairs[key]); });

    return {
      pairs: normalized,
      is_correct: Object.keys(question.correct).every((key) => normalized[key] === question.correct[key])
    };
  }

  throw new Error(`Unbekannter Fragetyp bei ${question.id}.`);
}

// ------------------------------------------------------------ Normalisierung --

function normalizePayload(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new Error("Ungültige Anfrage.");
  }

  if (payload.event !== EVENT_SLUG) throw new Error("Unbekannte Veranstaltung.");

  const slug = cleanString(payload.island, 40).toLowerCase();
  const island = ISLANDS[slug];
  if (!island) throw new Error(`Unbekannte Insel: ${slug || "(leer)"}`);

  if (String(payload.quiz_version) !== String(island.version)) {
    throw new Error("Der Fragensatz hat sich geändert. Bitte die Seite neu laden.");
  }

  const sessionId = cleanString(payload.session_id, 80);
  const participant = cleanString(payload.participant, 120);
  const dealer = cleanString(payload.dealer, 160);

  // Bewusst NICHT auf fünf Zeichen kappen: aus "34512x" würde sonst "34512"
  // und die Prüfung unten winkt eine ungültige Nummer durch. Erst prüfen,
  // was tatsächlich ankam — bei Name und Betrieb ist Kappen dagegen harmlos.
  const dealerNumber = cleanString(payload.dealer_number, 40);

  if (!sessionId) throw new Error("Session-ID fehlt.");
  if (participant.length < 2) throw new Error("Name fehlt.");
  if (dealer.length < 2) throw new Error("Händlerbetrieb fehlt.");
  if (!/^\d{5}$/.test(dealerNumber)) throw new Error("Händlernummer muss aus genau fünf Ziffern bestehen.");

  const area = AREAS.includes(payload.area) ? payload.area : "";

  if (!Array.isArray(payload.answers) || !payload.answers.length) {
    throw new Error("Es wurden keine Antworten übermittelt.");
  }

  // Eine Wiederholungsrunde ("nur falsche Fragen") sendet nicht, deshalb muss
  // hier der vollständige Satz ankommen — sonst wäre die Prozentzahl nicht
  // mit den übrigen Einsendungen vergleichbar.
  const byId = new Map(island.questions.map((question) => [question.id, question]));
  if (payload.answers.length !== island.questions.length) {
    throw new Error(`Es werden genau ${island.questions.length} Antworten erwartet.`);
  }

  const seen = new Set();
  const answers = payload.answers.map((entry) => {
    if (!entry || typeof entry !== "object") throw new Error("Ungültiger Antwortdatensatz.");

    const id = cleanString(entry.id, 40);
    const question = byId.get(id);
    if (!question) throw new Error(`Unbekannte Fragen-ID: ${id || "(leer)"}`);
    if (seen.has(id)) throw new Error(`Doppelte Fragen-ID: ${id}`);
    seen.add(id);

    const scored = scoreAnswer(question, entry.answer);
    const seconds = Number(entry.response_seconds);

    return {
      id,
      type: question.type,
      category: question.category || "",
      prompt: question.prompt,
      ...scored,
      response_seconds: Number.isFinite(seconds) ? Math.min(3600, Math.max(0, Math.round(seconds))) : 0
    };
  });

  const startedAt = validDate(payload.started_at);
  const finishedAt = validDate(payload.finished_at);
  if (!startedAt || !finishedAt || finishedAt < startedAt) {
    throw new Error("Start- oder Endzeit ist ungültig.");
  }

  const total = answers.length;
  const score = answers.filter((answer) => answer.is_correct).length;
  const durationSeconds = Math.min(
    86_400,
    Math.max(0, Math.round((finishedAt.getTime() - startedAt.getTime()) / 1000))
  );

  return {
    session_id: sessionId,
    event: EVENT_SLUG,
    island: slug,
    island_code: island.code,
    quiz_version: String(island.version),
    engine_version: cleanString(payload.engine_version, 20) || "unbekannt",
    participant,
    dealer,
    dealer_number: dealerNumber,
    area,
    started_at: startedAt.toISOString(),
    finished_at: finishedAt.toISOString(),
    duration_seconds: durationSeconds,
    score,
    incorrect: total - score,
    total,
    percent: Math.round((score / total) * 100),
    shuffle_enabled: Boolean(payload.shuffle_enabled),
    page_url: cleanString(payload.page_url, 500),
    answers
  };
}

// ----------------------------------------------------------------- Handler --

exports.handler = async function handler(event) {
  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { error: "Nur POST ist erlaubt." });
  }

  if (!event.body || Buffer.byteLength(event.body, "utf8") > MAX_BODY_BYTES) {
    return jsonResponse(413, { error: "Anfrage ist leer oder zu groß." });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("SUPABASE_URL oder Server-Key fehlt in den Netlify-Umgebungsvariablen.");
    return jsonResponse(500, { error: "Das Backend ist noch nicht vollständig konfiguriert." });
  }

  let payload;
  try {
    payload = normalizePayload(JSON.parse(event.body));
  } catch (error) {
    console.error("Ungültige Einsendung:", error);
    return jsonResponse(400, { error: error instanceof Error ? error.message : "Ungültige Quizdaten." });
  }

  try {
    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "apikey": supabaseKey,
      "Prefer": "return=minimal"
    };

    // Alte service_role-Keys sind JWTs und werden zusätzlich als Bearer
    // gesendet. Moderne sb_secret_-Keys gehören nur in den apikey-Header.
    if (!supabaseKey.startsWith("sb_secret_")) {
      headers.Authorization = `Bearer ${supabaseKey}`;
    }

    const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/${TABLE}`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload)
    });

    if (response.status === 409) {
      return jsonResponse(200, { ok: true, duplicate: true });
    }

    if (!response.ok) {
      const detail = await response.text();
      console.error("Supabase hat abgelehnt:", response.status, detail);
      return jsonResponse(502, { error: "Die Datenbank hat die Speicherung abgelehnt." });
    }

    return jsonResponse(201, { ok: true, duplicate: false, percent: payload.percent });
  } catch (error) {
    console.error("Speicherung fehlgeschlagen:", error);
    return jsonResponse(502, { error: "Die Datenbank war nicht erreichbar." });
  }
};
