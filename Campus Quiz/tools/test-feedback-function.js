"use strict";

/* Prüft die Feedback-Function ohne echte Datenbank. */

const path = require("path");

process.env.SUPABASE_URL = "https://beispiel.supabase.co";
process.env.SUPABASE_SECRET_KEY = "sb_secret_test";
process.env.CAMPUS_WRITE_RATE_LIMIT = "3";
process.env.CAMPUS_WRITE_DAILY_LIMIT = "10000";

let captured = null;
let nextResponse = { ok: true, status: 200, text: '"f8bd9888-3a5a-4df6-8d93-10aefb6131ac"' };

global.fetch = async (url, options) => {
  captured = { url, options, body: JSON.parse(options.body) };
  const response = nextResponse;
  nextResponse = { ok: true, status: 200, text: '"f8bd9888-3a5a-4df6-8d93-10aefb6131ac"' };
  return {
    ok: response.ok,
    status: response.status,
    text: async () => response.text || ""
  };
};

const { handler } = require(path.join("..", "netlify", "functions", "submit-feedback.js"));

let bestanden = 0;
let durchgefallen = 0;

function pruefe(name, condition, detail) {
  if (condition) { console.log(`  ok    ${name}`); bestanden++; }
  else { console.error(`  FEHLT ${name}${detail ? ` — ${detail}` : ""}`); durchgefallen++; }
}

function payload(changes = {}) {
  return Object.assign({
    submissionId: "a2c58233-d122-4a23-a63d-2144a2e6ef49",
    createdClientAt: "2026-08-27T12:00:00.000Z",
    eventSlug: "campus-2026",
    formVersion: "campus-2026-haendler-v14",
    dealerName: "Testbetrieb",
    dealerNumber: "03451",
    participantName: "Paket Test",
    participantAreas: ["Werkstatt"],
    overallRating: "Sehr zufrieden",
    recommendation: "Ja, auf jeden Fall",
    recommendationReason: "Praxisnah",
    topicWishes: null,
    teamMood: null,
    improvementSuggestions: null,
    positiveAspects: "Gute Gespräche",
    additionalNotes: null,
    islandChoices: ["Samsø"],
    source: "wird-serverseitig-ignoriert",
    ratings: [{
      sectionKey: "durchfuehrung",
      itemKey: "praxisbezug",
      itemLabel: "Praxisbezug",
      rating: 5,
      comment: null
    }],
    unerlaubtesFeld: "wird-nicht-gespeichert"
  }, changes);
}

let testIp = 1;

function browserHeaders(ip = `203.0.114.${testIp++}`) {
  return {
    host: "beispiel.supabase.co",
    origin: "https://beispiel.supabase.co",
    "x-forwarded-for": ip
  };
}

async function call(body, method = "POST", eventOverrides = {}) {
  captured = null;
  const response = await handler(Object.assign({
    httpMethod: method,
    body: body === undefined ? undefined : JSON.stringify(body),
    headers: browserHeaders()
  }, eventOverrides));
  return { status: response.statusCode, body: JSON.parse(response.body), captured };
}

(async function () {
  let result = await call(payload());
  pruefe("Gültiges Feedback → 201", result.status === 201, JSON.stringify(result.body));
  pruefe("Bestehende Feedback-RPC wird aufgerufen",
    result.captured?.url === "https://beispiel.supabase.co/rest/v1/rpc/submit_campus_feedback",
    result.captured?.url);
  pruefe("Payload liegt im RPC-Parameter payload", Boolean(result.captured?.body?.payload));
  pruefe("Geheime Zusatzfelder werden verworfen",
    !("unerlaubtesFeld" in (result.captured?.body?.payload || {})));
  pruefe("Source wird serverseitig festgelegt",
    result.captured?.body?.payload?.source === "thitronik-campus-feedback-v14");
  pruefe("Führende Null der Händlernummer bleibt erhalten",
    result.captured?.body?.payload?.dealerNumber === "03451");

  result = await call(payload({ dealerNumber: "3451" }));
  pruefe("Vierstellige Händlernummer → 400", result.status === 400, result.body.error);

  result = await call(payload({ eventSlug: "anderes-event" }));
  pruefe("Fremde Veranstaltung → 400", result.status === 400, result.body.error);

  result = await call(payload({ ratings: [{ sectionKey: "x", itemKey: "y", itemLabel: "Z", rating: 6 }] }));
  pruefe("Note außerhalb 1 bis 5 → 400", result.status === 400, result.body.error);

  const previousUrl = process.env.SUPABASE_URL;
  delete process.env.SUPABASE_URL;
  result = await call(payload());
  pruefe("Ohne Supabase → 503", result.status === 503, `${result.status}`);
  pruefe("Ohne Supabase → Netlify-Forms-Ausweichweg",
    result.body.fallback === "netlify_forms", JSON.stringify(result.body));
  process.env.SUPABASE_URL = previousUrl;

  nextResponse = { ok: false, status: 500, text: "database unavailable" };
  result = await call(payload());
  pruefe("Datenbankfehler → 502", result.status === 502, `${result.status}`);
  pruefe("Datenbankfehler behält Sicherheitsnetz",
    result.body.fallback === "netlify_forms", JSON.stringify(result.body));

  result = await call(undefined);
  pruefe("Leerer Body → 413", result.status === 413, `${result.status}`);

  result = await call(undefined, "GET");
  pruefe("GET → 405", result.status === 405, `${result.status}`);

  console.log("\nHerkunft und Ratenbegrenzung\n");

  result = await call(payload(), "POST", { headers: { host: "beispiel.supabase.co" } });
  pruefe("Fehlender Origin → 403",
    result.status === 403 && result.body.code === "INVALID_ORIGIN", JSON.stringify(result.body));

  result = await call(payload(), "POST", {
    headers: { host: "beispiel.supabase.co", origin: "https://fremd.invalid" }
  });
  pruefe("Fremder Origin → 403",
    result.status === 403 && result.body.code === "INVALID_ORIGIN", JSON.stringify(result.body));

  const rateIp = "198.51.100.41";
  for (let index = 0; index < 3; index++) {
    result = await call(payload(), "POST", { headers: browserHeaders(rateIp) });
  }
  pruefe("Drei Einsendungen im Zeitfenster erlaubt", result.status === 201, `${result.status}`);
  result = await call(payload(), "POST", { headers: browserHeaders(rateIp) });
  pruefe("Vierte Einsendung im Zeitfenster → 429",
    result.status === 429 && result.body.code === "RATE_LIMIT", JSON.stringify(result.body));

  console.log(`\n${bestanden} bestanden, ${durchgefallen} fehlgeschlagen.`);
  process.exit(durchgefallen ? 1 : 0);
})();
