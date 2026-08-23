"use strict";

/* ==========================================================================
   Testet die Bewertungslogik der Netlify-Function ohne Datenbank.
   fetch wird abgefangen — geprüft wird, WAS die Function speichern würde.

     node tools/test-function.js
   ========================================================================== */

process.env.SUPABASE_URL = "https://beispiel.invalid";
process.env.SUPABASE_SECRET_KEY = "sb_secret_test";

const path = require("path");
const island = require("../public/data/inseln/hiddensee.json");

// fetch abfangen und den Body zurückgeben, statt ihn zu senden.
let captured = null;
global.fetch = async function (url, options) {
  captured = JSON.parse(options.body);
  return { ok: true, status: 201, text: async () => "", json: async () => ({}) };
};

const { handler } = require(path.join(__dirname, "..", "netlify", "functions", "submit-quiz.js"));

let passed = 0;
let failed = 0;

function check(name, condition, detail) {
  if (condition) { console.log(`  ok    ${name}`); passed++; }
  else { console.error(`  FEHLT ${name}${detail ? " — " + detail : ""}`); failed++; }
}

async function call(payload) {
  captured = null;
  const response = await handler({ httpMethod: "POST", body: JSON.stringify(payload) });
  return { status: response.statusCode, body: JSON.parse(response.body), gespeichert: captured };
}

/** Baut eine Einsendung. mode: 'richtig' | 'falsch' */
function buildPayload(mode, overrides = {}) {
  const answers = island.questions.map((q) => {
    let answer;
    if (q.type === "single" || q.type === "truefalse" || q.type === "multi") {
      if (mode === "richtig") {
        answer = { selected: q.correct.slice() };
      } else {
        const pool = q.type === "truefalse"
          ? ["richtig", "falsch"]
          : q.options.map((o) => o.id);
        answer = { selected: [pool.find((id) => !q.correct.includes(id))] };
      }
    } else if (q.type === "order") {
      answer = { order: mode === "richtig" ? q.correct.slice() : q.correct.slice().reverse() };
    } else if (q.type === "match") {
      const pairs = {};
      Object.keys(q.correct).forEach((l) => {
        if (mode === "richtig") pairs[l] = q.correct[l];
        else {
          const wrong = q.right.find((r) => r.id !== q.correct[l]);
          pairs[l] = wrong ? wrong.id : q.correct[l];
        }
      });
      answer = { pairs };
    }
    return { id: q.id, answer, response_seconds: 11 };
  });

  return Object.assign({
    event: "campus-2026",
    island: "hiddensee",
    quiz_version: island.version,
    engine_version: "1.0",
    session_id: "test-" + Math.random().toString(36).slice(2),
    participant: "Testlauf Campus",
    dealer: "Mustermann Caravaning",
    dealer_number: "34512",
    area: "werkstatt",
    started_at: "2026-08-13T09:00:00.000Z",
    finished_at: "2026-08-13T09:04:10.000Z",
    shuffle_enabled: true,
    page_url: "https://beispiel.invalid/quiz/hiddensee",
    answers
  }, overrides);
}

(async function run() {
  console.log("Bewertung\n");

  let r = await call(buildPayload("richtig"));
  check("Alles richtig → 201", r.status === 201, `Status ${r.status}: ${r.body.error || ""}`);
  check("Alles richtig → 100 %", r.gespeichert && r.gespeichert.percent === 100, `percent=${r.gespeichert?.percent}`);
  check("score = total", r.gespeichert && r.gespeichert.score === island.questions.length);
  check("incorrect = 0", r.gespeichert && r.gespeichert.incorrect === 0);
  check("Dauer berechnet", r.gespeichert && r.gespeichert.duration_seconds === 250, `${r.gespeichert?.duration_seconds}`);
  check("island_code ergänzt", r.gespeichert && r.gespeichert.island_code === "HIDDENSEE");
  check("Antworten tragen is_correct", r.gespeichert && r.gespeichert.answers.every((a) => a.is_correct === true));
  check("Antworten tragen category", r.gespeichert && r.gespeichert.answers.every((a) => typeof a.category === "string"));

  r = await call(buildPayload("falsch"));
  check("Alles falsch → 0 %", r.gespeichert && r.gespeichert.percent === 0, `percent=${r.gespeichert?.percent}`);
  check("Alles falsch → score 0", r.gespeichert && r.gespeichert.score === 0);

  console.log("\nAbwehr\n");

  // Der entscheidende Test: ein manipuliertes Ergebnis darf nicht durchgehen.
  const gefaelscht = buildPayload("falsch", { score: 10, percent: 100, total: 10 });
  r = await call(gefaelscht);
  check("Mitgesendetes percent wird ignoriert", r.gespeichert && r.gespeichert.percent === 0,
    `gespeichert wurde ${r.gespeichert?.percent} %`);

  const mitIsCorrect = buildPayload("falsch");
  mitIsCorrect.answers.forEach((a) => { a.is_correct = true; });
  r = await call(mitIsCorrect);
  check("Mitgesendetes is_correct wird ignoriert",
    r.gespeichert && r.gespeichert.answers.every((a) => a.is_correct === false));

  r = await call(buildPayload("richtig", { island: "atlantis" }));
  check("Unbekannte Insel → 400", r.status === 400 && /Unbekannte Insel/.test(r.body.error), r.body.error);

  r = await call(buildPayload("richtig", { event: "campus-2099" }));
  check("Falsche Veranstaltung → 400", r.status === 400, r.body.error);

  r = await call(buildPayload("richtig", { quiz_version: "99" }));
  check("Alte Fragensatz-Version → 400", r.status === 400 && /neu laden/.test(r.body.error), r.body.error);

  r = await call(buildPayload("richtig", { dealer_number: "3451" }));
  check("Vierstellige Händlernummer → 400", r.status === 400 && /fünf Ziffern/.test(r.body.error), r.body.error);

  r = await call(buildPayload("richtig", { dealer_number: "34512x" }));
  check("Händlernummer mit Buchstabe → 400", r.status === 400, r.body.error);

  r = await call(buildPayload("richtig", { participant: "" }));
  check("Name fehlt → 400", r.status === 400 && /Name/.test(r.body.error), r.body.error);

  const zuWenig = buildPayload("richtig");
  zuWenig.answers = zuWenig.answers.slice(0, 5);
  r = await call(zuWenig);
  check("Unvollständiger Satz → 400", r.status === 400 && r.body.error.includes(`genau ${island.questions.length}`), r.body.error);

  const doppelt = buildPayload("richtig");
  doppelt.answers[1] = JSON.parse(JSON.stringify(doppelt.answers[0]));
  r = await call(doppelt);
  check("Doppelte Fragen-ID → 400", r.status === 400 && /Doppelte/.test(r.body.error), r.body.error);

  const fremdeOption = buildPayload("richtig");
  const single = fremdeOption.answers.find((a) =>
    island.questions.find((q) => q.id === a.id).type === "single");
  single.answer = { selected: ["zzz"] };
  r = await call(fremdeOption);
  check("Erfundene Option → 400", r.status === 400 && /Unbekannte Option/.test(r.body.error), r.body.error);

  const mehrfachBeiSingle = buildPayload("richtig");
  const s2 = mehrfachBeiSingle.answers.find((a) =>
    island.questions.find((q) => q.id === a.id).type === "single");
  const frage = island.questions.find((q) => q.id === s2.id);
  s2.answer = { selected: frage.options.slice(0, 2).map((o) => o.id) };
  r = await call(mehrfachBeiSingle);
  check("Zwei Antworten bei single → 400", r.status === 400 && /genau eine/.test(r.body.error), r.body.error);

  const luecke = buildPayload("richtig");
  const m = luecke.answers.find((a) => island.questions.find((q) => q.id === a.id).type === "match");
  delete m.answer.pairs[Object.keys(m.answer.pairs)[0]];
  r = await call(luecke);
  check("Unvollständige Zuordnung → 400", r.status === 400 && /Zuordnung/.test(r.body.error), r.body.error);

  r = await handler({ httpMethod: "GET" });
  check("GET → 405", r.statusCode === 405);

  r = await handler({ httpMethod: "POST", body: "" });
  check("Leerer Body → 413", r.statusCode === 413);

  r = await handler({ httpMethod: "POST", body: "kein json" });
  check("Kaputtes JSON → 400", r.statusCode === 400);

  console.log(`\n${passed} bestanden, ${failed} fehlgeschlagen.`);
  process.exit(failed ? 1 : 0);
})();
