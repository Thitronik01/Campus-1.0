"use strict";

/* ==========================================================================
   Prüft die Function eines erzeugten Insel-Pakets — ohne Datenbank.

     node ../Campus\ Quiz/tools/test-paket.js "../Vejrø Quiz" vejro

   oder aus dem Quellordner:

     node tools/test-paket.js "../Vejrø Quiz" vejro

   Getestet wird das, worauf es ankommt: dass die Bewertung stimmt und dass
   ein manipuliertes Ergebnis aus dem Browser nicht durchgeht.
   ========================================================================== */

process.env.SUPABASE_URL = "https://beispiel.invalid";
process.env.SUPABASE_SECRET_KEY = "sb_secret_test";

const path = require("path");

const paketArg = process.argv[2];
const slug = process.argv[3];
if (!paketArg || !slug) {
  console.error('Aufruf: node tools/test-paket.js "<Paketordner>" <insel-slug>');
  process.exit(1);
}

const paket = path.resolve(paketArg);
const insel = require(path.join(paket, "public", "data", "inseln", `${slug}.json`));

let cap = null;
global.fetch = async (url, opt) => {
  cap = JSON.parse(opt.body);
  return { ok: true, status: 201, text: async () => "", json: async () => ({}) };
};

const { handler } = require(path.join(paket, "netlify", "functions", "submit-quiz.js"));

let bestanden = 0;
let durchgefallen = 0;

function pruefe(name, bedingung, detail) {
  if (bedingung) { console.log(`  ok    ${name}`); bestanden++; }
  else { console.error(`  FEHLT ${name}${detail ? " — " + detail : ""}`); durchgefallen++; }
}

/** Baut eine vollständige Einsendung. modus: "richtig" | "falsch" */
function bauen(modus, aenderungen = {}) {
  const answers = insel.questions.map((q) => {
    let answer;

    if (q.type === "truefalse") {
      const gegenteil = q.correct[0] === "richtig" ? "falsch" : "richtig";
      answer = { selected: [modus === "richtig" ? q.correct[0] : gegenteil] };

    } else if (q.type === "order") {
      answer = { order: modus === "richtig" ? q.correct.slice() : q.correct.slice().reverse() };

    } else if (q.type === "match") {
      const pairs = {};
      Object.keys(q.correct).forEach((l) => {
        if (modus === "richtig") pairs[l] = q.correct[l];
        else {
          const andere = q.right.find((r) => r.id !== q.correct[l]);
          pairs[l] = andere ? andere.id : q.correct[l];
        }
      });
      answer = { pairs };

    } else {
      const pool = q.options.map((o) => o.id);
      answer = modus === "richtig"
        ? { selected: q.correct.slice() }
        : { selected: q.type === "multi"
            ? pool.filter((id) => !q.correct.includes(id))
            : [pool.find((id) => !q.correct.includes(id))] };
    }

    return { id: q.id, answer, response_seconds: 8 };
  });

  return Object.assign({
    event: "campus-2026",
    island: slug,
    quiz_version: insel.version,
    engine_version: "1.0",
    session_id: `${slug}-${Math.random().toString(36).slice(2)}`,
    participant: "Paket Test",
    dealer: "Testbetrieb",
    dealer_number: "34512",
    area: "werkstatt",
    started_at: "2026-08-13T09:00:00.000Z",
    finished_at: "2026-08-13T09:05:00.000Z",
    shuffle_enabled: true,
    page_url: "https://beispiel.invalid/",
    answers
  }, aenderungen);
}

async function ruf(payload) {
  cap = null;
  const r = await handler({ httpMethod: "POST", body: JSON.stringify(payload) });
  return { status: r.statusCode, body: JSON.parse(r.body), gespeichert: cap };
}

(async function () {
  const anzahl = insel.questions.length;
  const typen = [...new Set(insel.questions.map((q) => q.type))];
  console.log(`\n${insel.code} — ${anzahl} Fragen [${typen.join(", ")}]\n`);

  let r = await ruf(bauen("richtig"));
  pruefe("Alles richtig → 201", r.status === 201, r.body.error);
  pruefe("Alles richtig → 100 %", r.gespeichert?.percent === 100, `${r.gespeichert?.percent}`);
  pruefe("Insel-Kürzel ergänzt", r.gespeichert?.island_code === insel.code);
  pruefe("Alle Antworten als richtig", r.gespeichert?.answers.every((a) => a.is_correct));
  pruefe("Alle Fragetypen gespeichert",
    typen.every((t) => r.gespeichert?.answers.some((a) => a.type === t)),
    [...new Set(r.gespeichert?.answers.map((a) => a.type))].join(", "));

  r = await ruf(bauen("falsch"));
  pruefe("Alles falsch → 0 %", r.gespeichert?.percent === 0, `${r.gespeichert?.percent}`);

  r = await ruf(bauen("falsch", { percent: 100, score: anzahl }));
  pruefe("Gefälschtes percent wird ignoriert", r.gespeichert?.percent === 0, `${r.gespeichert?.percent}`);

  const mitFlag = bauen("falsch");
  mitFlag.answers.forEach((a) => { a.is_correct = true; });
  r = await ruf(mitFlag);
  pruefe("Gefälschtes is_correct wird ignoriert", r.gespeichert?.answers.every((a) => !a.is_correct));

  r = await ruf(bauen("richtig", { island: slug === "vejro" ? "poel" : "vejro" }));
  pruefe("Fremde Insel → 400", r.status === 400 && /Unbekannte Insel/.test(r.body.error), r.body.error);

  r = await ruf(bauen("richtig", { quiz_version: "999" }));
  pruefe("Falsche Fragensatz-Version → 400", r.status === 400, r.body.error);

  r = await ruf(bauen("richtig", { dealer_number: "3451" }));
  pruefe("Vierstellige Händlernummer → 400", r.status === 400, r.body.error);

  const unvollstaendig = bauen("richtig");
  unvollstaendig.answers = unvollstaendig.answers.slice(0, anzahl - 1);
  r = await ruf(unvollstaendig);
  pruefe("Unvollständiger Satz → 400", r.status === 400, r.body.error);

  // Bei Mehrfachauswahl darf eine Teilmenge nicht als richtig gelten.
  const mehrfach = insel.questions.find((q) => q.type === "multi");
  if (mehrfach && mehrfach.correct.length > 1) {
    const teil = bauen("richtig");
    teil.answers.find((a) => a.id === mehrfach.id).answer.selected =
      mehrfach.correct.slice(0, mehrfach.correct.length - 1);
    r = await ruf(teil);
    pruefe("Teilmenge bei Mehrfachauswahl zählt nicht",
      r.gespeichert?.answers.find((a) => a.id === mehrfach.id)?.is_correct === false);
  }

  // Bei Reihenfolge muss die Position stimmen, nicht nur die Menge.
  const reihenfolge = insel.questions.find((q) => q.type === "order");
  if (reihenfolge && reihenfolge.correct.length > 2) {
    const getauscht = bauen("richtig");
    const o = reihenfolge.correct.slice();
    [o[0], o[1]] = [o[1], o[0]];
    getauscht.answers.find((a) => a.id === reihenfolge.id).answer.order = o;
    r = await ruf(getauscht);
    pruefe("Vertauschte Reihenfolge zählt nicht",
      r.gespeichert?.answers.find((a) => a.id === reihenfolge.id)?.is_correct === false);
  }

  // Bei Zuordnung genügt ein falsches Paar.
  const zuordnung = insel.questions.find((q) => q.type === "match");
  if (zuordnung) {
    const einFalsch = bauen("richtig");
    const ersterSchluessel = Object.keys(zuordnung.correct)[0];
    const andere = zuordnung.right.find((r2) => r2.id !== zuordnung.correct[ersterSchluessel]);
    if (andere) {
      einFalsch.answers.find((a) => a.id === zuordnung.id).answer.pairs[ersterSchluessel] = andere.id;
      r = await ruf(einFalsch);
      pruefe("Ein falsches Paar genügt zum Fehler",
        r.gespeichert?.answers.find((a) => a.id === zuordnung.id)?.is_correct === false);
    }
  }

  r = await handler({ httpMethod: "GET" });
  pruefe("GET → 405", r.statusCode === 405);

  console.log(`\n${bestanden} bestanden, ${durchgefallen} fehlgeschlagen.`);
  process.exit(durchgefallen ? 1 : 0);
})();
