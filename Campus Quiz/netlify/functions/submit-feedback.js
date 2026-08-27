"use strict";

/* ========================================================================== 
   THITRONIK Campus — Feedbackannahme
   --------------------------------------------------------------------------
   Der Browser spricht nie direkt mit Supabase. Diese Function prüft und
   normalisiert die Eingabe und ruft anschließend die bestehende
   submit_campus_feedback-RPC auf. Solange Supabase noch nicht eingerichtet
   ist, darf der Pilot über das statisch erkannte Netlify-Formular laufen.
   ========================================================================== */

const EVENT_SLUG = "campus-2026";
const FORM_VERSION = "campus-2026-haendler-v14";
const SOURCE = "thitronik-campus-feedback-v14";
const RPC = "submit_campus_feedback";
const MAX_BODY_BYTES = 120_000;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const OVERALL = new Set(["Sehr zufrieden", "Zufrieden", "Teils/teils", "Eher unzufrieden", "Unzufrieden"]);
const RECOMMENDATIONS = new Set(["Ja, auf jeden Fall", "Eher ja", "Eher nein", "Nein"]);

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

function optionalString(value, maxLength) {
  return cleanString(value, maxLength) || null;
}

function stringArray(value, name, maxItems, maxLength) {
  if (!Array.isArray(value)) throw new Error(`${name} muss eine Liste sein.`);
  if (value.length > maxItems) throw new Error(`${name} enthält zu viele Einträge.`);

  const normalized = value.map((entry) => cleanString(entry, maxLength)).filter(Boolean);
  if (normalized.length !== value.length || new Set(normalized).size !== normalized.length) {
    throw new Error(`${name} enthält ungültige oder doppelte Einträge.`);
  }
  return normalized;
}

function normalizePayload(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new Error("Ungültige Anfrage.");
  }
  if (input.eventSlug !== EVENT_SLUG) throw new Error("Unbekannte Veranstaltung.");
  if (input.formVersion !== FORM_VERSION) throw new Error("Unbekannte Formularversion.");

  const submissionId = cleanString(input.submissionId, 80);
  if (!UUID.test(submissionId)) throw new Error("Ungültige Einsendungs-ID.");

  const created = Date.parse(input.createdClientAt);
  if (!Number.isFinite(created)) throw new Error("Ungültiger Erstellungszeitpunkt.");

  const dealerName = cleanString(input.dealerName, 160);
  const dealerNumber = cleanString(input.dealerNumber, 40);
  const participantName = cleanString(input.participantName, 120);
  if (dealerName.length < 2) throw new Error("Händlerbetrieb fehlt.");
  if (!/^\d{5}$/.test(dealerNumber)) {
    throw new Error("Händlernummer muss aus genau fünf Ziffern bestehen.");
  }
  if (participantName.length < 2) throw new Error("Name fehlt.");

  const participantAreas = stringArray(input.participantAreas, "Tätigkeitsbereiche", 8, 80);
  const islandChoices = stringArray(input.islandChoices, "Insel-Auswahl", 3, 120);

  const overallRating = optionalString(input.overallRating, 40);
  if (overallRating && !OVERALL.has(overallRating)) throw new Error("Ungültige Gesamtbewertung.");

  const recommendation = optionalString(input.recommendation, 40);
  if (recommendation && !RECOMMENDATIONS.has(recommendation)) {
    throw new Error("Ungültige Weiterempfehlung.");
  }

  if (!Array.isArray(input.ratings)) throw new Error("Bewertungen müssen eine Liste sein.");
  if (input.ratings.length > 40) throw new Error("Zu viele Bewertungen.");

  const seen = new Set();
  const ratings = input.ratings.map((entry) => {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      throw new Error("Ungültiger Bewertungsdatensatz.");
    }
    const sectionKey = cleanString(entry.sectionKey, 80);
    const itemKey = cleanString(entry.itemKey, 100);
    const itemLabel = cleanString(entry.itemLabel, 240);
    const rating = Number(entry.rating);

    if (!sectionKey || !itemKey || !itemLabel) throw new Error("Unvollständiger Bewertungsdatensatz.");
    if (seen.has(itemKey)) throw new Error(`Doppelte Bewertung: ${itemKey}.`);
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      throw new Error(`Ungültige Note bei ${itemKey}.`);
    }
    seen.add(itemKey);
    return {
      sectionKey,
      itemKey,
      itemLabel,
      rating,
      comment: optionalString(entry.comment, 2000)
    };
  });

  return {
    submissionId,
    createdClientAt: new Date(created).toISOString(),
    eventSlug: EVENT_SLUG,
    formVersion: FORM_VERSION,
    dealerName,
    dealerNumber,
    participantName,
    participantAreas,
    overallRating,
    recommendation,
    recommendationReason: optionalString(input.recommendationReason, 4000),
    topicWishes: optionalString(input.topicWishes, 4000),
    teamMood: optionalString(input.teamMood, 1000),
    improvementSuggestions: optionalString(input.improvementSuggestions, 4000),
    positiveAspects: optionalString(input.positiveAspects, 4000),
    additionalNotes: optionalString(input.additionalNotes, 4000),
    islandChoices,
    source: SOURCE,
    ratings
  };
}

exports.handler = async function handler(event) {
  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { error: "Nur POST ist erlaubt." });
  }
  if (!event.body || Buffer.byteLength(event.body, "utf8") > MAX_BODY_BYTES) {
    return jsonResponse(413, { error: "Anfrage ist leer oder zu groß." });
  }

  let payload;
  try {
    payload = normalizePayload(JSON.parse(event.body));
  } catch (error) {
    console.error("Ungültige Feedback-Einsendung:", error);
    return jsonResponse(400, {
      error: error instanceof Error ? error.message : "Ungültige Feedbackdaten."
    });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.info("Supabase ist noch nicht konfiguriert; Übergabe an Netlify Forms.");
    return jsonResponse(503, {
      error: "Die Campus-Datenbank ist noch nicht aktiviert.",
      code: "BACKEND_NOT_CONFIGURED",
      fallback: "netlify_forms"
    });
  }

  try {
    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "apikey": supabaseKey
    };
    if (!supabaseKey.startsWith("sb_secret_")) {
      headers.Authorization = `Bearer ${supabaseKey}`;
    }

    const response = await fetch(
      `${supabaseUrl.replace(/\/$/, "")}/rest/v1/rpc/${RPC}`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({ payload })
      }
    );

    if (!response.ok) {
      const detail = await response.text();
      console.error("Supabase hat Feedback abgelehnt:", response.status, detail);
      return jsonResponse(502, {
        error: "Die Datenbank hat die Speicherung abgelehnt.",
        fallback: "netlify_forms"
      });
    }

    let id = null;
    try { id = JSON.parse(await response.text()); } catch { /* RPC-Antwort ist optional. */ }
    return jsonResponse(201, { ok: true, duplicate: false, id });
  } catch (error) {
    console.error("Feedback-Speicherung fehlgeschlagen:", error);
    return jsonResponse(502, {
      error: "Die Datenbank war nicht erreichbar.",
      fallback: "netlify_forms"
    });
  }
};

