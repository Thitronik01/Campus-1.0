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

const fs = require("fs");
const path = require("path");

const paketArg = process.argv[2];
const slug = process.argv[3];
if (!paketArg || !slug) {
  console.error('Aufruf: node tools/test-paket.js "<Paketordner>" <insel-slug>');
  process.exit(1);
}

const paket = path.resolve(paketArg);
const insel = require(path.join(paket, "public", "data", "inseln", `${slug}.json`));

/** Eine Insel, die dieses Paket NICHT ausliefert — für die Probe, dass eine
 *  fremde Einsendung abgewiesen wird.
 *
 *  Im Einzelpaket ist das jede andere Insel. Im Gesamtpaket sind alle sieben
 *  bekannt und damit gültig; dort muss ein Name her, den es nirgends gibt.
 *  Ohne diese Unterscheidung schlüge die Probe im Gesamtpaket fehl, obwohl
 *  die Function genau das Richtige tut. */
const katalog = require(path.join(paket, "public", "data", "inseln.json"));
const bekannt = new Set(katalog.inseln.map((i) => i.slug));
const fremdeInsel = ["vejro", "poel", "hiddensee", "samsoe", "fehmarn",
  "usedom", "langeland", "nordstrand"].find((s) => !bekannt.has(s));

let cap = null;

/** Antwort, die die Supabase-Attrappe beim nächsten Aufruf gibt. 201 ist der
 *  Normalfall; 409 bildet die Kollision auf dem unique-Index von session_id
 *  nach, 503 einen zeitweise nicht erreichbaren Dienst. */
let naechsteAntwort = { ok: true, status: 201 };

global.fetch = async (url, opt) => {
  cap = JSON.parse(opt.body);
  const a = naechsteAntwort;
  naechsteAntwort = { ok: true, status: 201 };   // gilt nur für einen Aufruf
  return { ok: a.ok, status: a.status, text: async () => a.text || "", json: async () => ({}) };
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

  const audioFragen = insel.questions.filter((q) => q.audio && q.audio.src);
  if (audioFragen.length) {
    pruefe("Audiodateien und Textalternativen sind im Paket enthalten",
      audioFragen.every((q) => q.audio.fallbackText &&
        fs.existsSync(path.join(paket, "public", q.audio.src.replace(/^\//, "")))));
  }

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

  r = await ruf(bauen("richtig", { island: fremdeInsel }));
  pruefe(`Fremde Insel (${fremdeInsel}) → 400`,
    r.status === 400 && /Unbekannte Insel/.test(r.body.error), r.body.error);

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

  // ---- Nachsenden aus dem Sende-Ausgang ---------------------------------
  //
  // Der Browser legt ein Ergebnis auf dem Gerät ab und schickt es so lange
  // erneut, bis der Server bestätigt hat. Das ist nur dann gefahrlos, wenn
  // eine zweite Einsendung derselben session_id keinen zweiten Datensatz
  // anlegt und für den Teilnehmer nicht wie ein Fehler aussieht. Die
  // Datenbank verhindert das Duplikat über den unique-Index; geprüft wird
  // hier, dass die Function die 409 auch richtig übersetzt.
  const wiederholung = bauen("richtig", { session_id: "ausgang-probe-1" });

  r = await ruf(wiederholung);
  pruefe("Nachsenden: erste Einsendung → 201", r.status === 201, r.body.error);

  naechsteAntwort = { ok: false, status: 409, text: "duplicate key value" };
  r = await ruf(wiederholung);
  pruefe("Nachsenden: zweite mit gleicher session_id → 200",
    r.status === 200, `${r.status} ${r.body.error || ""}`);
  pruefe("Nachsenden: als Duplikat gemeldet, nicht als Fehler",
    r.body.duplicate === true && !r.body.error, JSON.stringify(r.body));

  // Ein zeitweiliger Serverfehler muss als 502 zurückkommen. Der Browser
  // wertet 5xx als "später erneut versuchen" und behält den Eintrag; käme
  // hier eine 4xx, würde er ihn als endgültig abgelehnt einstufen und nicht
  // mehr von selbst nachsenden.
  naechsteAntwort = { ok: false, status: 503, text: "service unavailable" };
  r = await ruf(bauen("richtig", { session_id: "ausgang-probe-2" }));
  pruefe("Nachsenden: Dienst weg → 502, damit weiter versucht wird",
    r.status === 502, `${r.status}`);
  pruefe("Nachsenden: 502 liegt im Wiederhol-Bereich (>= 500)", r.status >= 500);

  // ---- Cache-Buster ------------------------------------------------------
  //
  // netlify.toml cacht /assets/* mit max-age=31536000, immutable. Bleibt das
  // ?v= in der index.html beim Deploy stehen, holt jeder Browser, der schon
  // einmal da war, die alte Engine ein Jahr lang aus seinem Cache. Die
  // Zahl muss deshalb zur ausgelieferten Engine passen — build-insel.js setzt
  // sie ein, hier wird nachgesehen, ob das auch angekommen ist.
  const seite = fs.readFileSync(path.join(paket, "public", "index.html"), "utf8");
  const motor = fs.readFileSync(path.join(paket, "public", "assets", "engine.js"), "utf8");
  const fassung = (motor.match(/const ENGINE_VERSION = "([^"]+)"/) || [])[1];
  const verweise = [...seite.matchAll(/\/assets\/[a-z.]+\?v=([^"']+)/g)].map((m) => m[1]);

  pruefe("Engine nennt eine Fassung", Boolean(fassung), String(fassung));
  pruefe("index.html hängt ?v= an die Assets", verweise.length >= 2, `${verweise.length} Verweise`);
  pruefe("Cache-Buster passt zur Engine-Fassung",
    verweise.length > 0 && verweise.every((v) => v === fassung),
    `HTML: ${[...new Set(verweise)].join(", ")} — Engine: ${fassung}`);

  pruefe("Quiz-Pilotformular ist für Netlify erkennbar",
    /name="campus-quiz-result"/.test(seite) && /data-netlify="true"/.test(seite));

  if (katalog.feedback) {
    pruefe("Feedback-Function ist im Gesamtpaket enthalten",
      fs.existsSync(path.join(paket, "netlify", "functions", "submit-feedback.js")));
    const feedbackDatei = path.join(paket, "public", "feedback", "index.html");
    pruefe("Feedbackbogen ist im Gesamtpaket enthalten", fs.existsSync(feedbackDatei));
    if (fs.existsSync(feedbackDatei)) {
      const feedbackHtml = fs.readFileSync(feedbackDatei, "utf8");
      pruefe("Feedbackformular ist für Netlify erkennbar",
        /name="campus-feedback"/.test(feedbackHtml) && /data-netlify="true"/.test(feedbackHtml));
      pruefe("Feedbackbogen führt zurück zur Campus-Karte", /href="\/quiz"/.test(feedbackHtml));
    }
  }

  if (katalog.arbeitskarte) {
    const akRoot = path.join(paket, "public", "arbeitskarte");
    pruefe("Arbeitskarte ist im Gesamtpaket enthalten",
      fs.existsSync(path.join(akRoot, "index.html")));
    pruefe("Arbeitskarten-Logik und Druckansicht sind enthalten",
      fs.existsSync(path.join(akRoot, "assets", "app-v1.js")) &&
      fs.existsSync(path.join(akRoot, "assets", "print-v1.js")));
    const akBilder = ["fahrerseite", "beifahrerseite", "front", "heck"]
      .map((ansicht) => path.join(paket, "public", "assets", "arbeitskarte", `wohnmobil-${ansicht}.webp`));
    pruefe("Alle vier Fahrzeugansichten sind enthalten", akBilder.every(fs.existsSync));
    pruefe("Campus-Übersicht verlinkt die Arbeitskarte", /id="arbeitskarte-link"/.test(seite));
  }

  // THI wird mit jedem Paket ausgeliefert: Function, Bibliothek, Wissen.
  // Bis September 2026 prüfte hier nichts, ob das zusammenpasst (Rückstand
  // R-45) — ein Paket mit leerem Wissensbestand oder einem Import ins Leere
  // wäre durch alle Prüfungen gekommen.
  const thiFn = path.join(paket, "netlify", "functions", "thi.mjs");
  pruefe("THI-Function ist im Paket", fs.existsSync(thiFn));
  if (fs.existsSync(thiFn)) {
    const thiQuelle = fs.readFileSync(thiFn, "utf8");
    const importe = [...thiQuelle.matchAll(/^import[^"']*["'](\.[^"']+)["']/gm)].map((m) => m[1]);
    const fehlend = importe.filter((i) => !fs.existsSync(path.resolve(path.dirname(thiFn), i)));
    pruefe("Alle relativen Importe von thi.mjs zeigen auf Dateien im Paket",
      importe.length > 0 && fehlend.length === 0, fehlend.join(", ") || `${importe.length} Importe`);
    pruefe("thi.mjs bindet sein Wissen statisch ein (nft folgt nur import)",
      /^import \w+ from "\.\/thi-wissen\/artikel\.de\.json" with \{ type: "json" \};/m.test(thiQuelle));
    for (const wissen of ["artikel.de.json", "abschnitte.de.json"]) {
      const datei = path.join(paket, "netlify", "functions", "thi-wissen", wissen);
      let eintraege = 0;
      try {
        const inhalt = JSON.parse(fs.readFileSync(datei, "utf8"));
        eintraege = Array.isArray(inhalt) ? inhalt.length : Object.keys(inhalt).length;
      } catch { eintraege = 0; }
      pruefe(`THI-Wissen ${wissen} ist gültiges JSON mit Einträgen`, eintraege > 0, String(eintraege));
    }
    pruefe("thi.js und thi.css liegen im Paket",
      fs.existsSync(path.join(paket, "public", "assets", "thi.js"))
      && fs.existsSync(path.join(paket, "public", "assets", "thi.css")));
    pruefe("index.html bindet thi.js mit der Engine-Fassung ein",
      new RegExp(`/assets/thi\\.js\\?v=${String(fassung).replace(/\./g, "\\.")}"`).test(seite));
  }

  r = await handler({ httpMethod: "GET" });
  pruefe("GET → 405", r.statusCode === 405);

  console.log(`\n${bestanden} bestanden, ${durchgefallen} fehlgeschlagen.`);
  process.exit(durchgefallen ? 1 : 0);
})();
