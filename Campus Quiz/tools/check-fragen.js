"use strict";

/* ==========================================================================
   Prüft die Fragensätze auf innere Stimmigkeit.
   Ein Tippfehler in einem "correct"-Eintrag bricht nichts sichtbar — er
   bewertet nur still falsch. Deshalb vor jedem Deploy laufen lassen:

     node tools/check-fragen.js
   ========================================================================== */

const fs = require("fs");
const path = require("path");

const DATA = path.join(__dirname, "..", "public", "data");
const TYPES = ["single", "multi", "truefalse", "order", "match"];

let errors = 0;
let warnings = 0;
const notizen = [];

const fail = (where, message) => { console.error(`  FEHLER  ${where}: ${message}`); errors++; };
const warn = (where, message) => { console.warn(`  Hinweis ${where}: ${message}`); warnings++; };

/** Liest eine JSON-Datei und meldet die typischen Editor-Unfälle als Befund,
 *  statt mit einem Stacktrace abzubrechen.
 *
 *  Die UTF-8-BOM ist der häufigste davon: Windows-PowerShell schreibt sie bei
 *  `Set-Content -Encoding UTF8` von selbst mit. Der Browser verdaut sie
 *  klaglos, JSON.parse nicht — der Fehler fällt also erst hier auf und sieht
 *  dann aus wie ein kaputtes Werkzeug statt wie eine kaputte Datei. */
function readJson(file, label) {
  let raw = fs.readFileSync(file, "utf8");

  if (raw.charCodeAt(0) === 0xFEFF) {
    fail(label, "Datei beginnt mit einer UTF-8-BOM. JSON.parse bricht daran ab — " +
      "ohne BOM speichern (in PowerShell: [IO.File]::WriteAllText mit UTF8Encoding($false)).");
    raw = raw.slice(1);
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    fail(label, `Kein gültiges JSON — ${error.message}`);
    return null;
  }
}

const catalog = readJson(path.join(DATA, "inseln.json"), "inseln.json");
if (!catalog) {
  console.error("\nAbbruch: Die Inselübersicht ist nicht lesbar.");
  process.exit(1);
}

console.log(`Prüfe ${catalog.inseln.length} Inseln …\n`);

let totalQuestions = 0;

for (const island of catalog.inseln) {
  const file = path.join(DATA, "inseln", `${island.slug}.json`);

  if (!fs.existsSync(file)) {
    fail(island.slug, "Fragensatz-Datei fehlt.");
    continue;
  }

  const set = readJson(file, `${island.slug}.json`);
  if (!set) continue;

  const where = (id) => `${island.slug}/${id}`;

  if (set.island !== island.slug) {
    fail(island.slug, `island-Feld ist "${set.island}", erwartet "${island.slug}".`);
  }
  if (!set.version) fail(island.slug, "version fehlt.");
  if (!Array.isArray(set.questions) || !set.questions.length) {
    fail(island.slug, "Keine Fragen enthalten.");
    continue;
  }

  // Fachlich dichte Inseln dürfen bis zu zwölf Fragen enthalten.
  if (set.questions.length < 5 || set.questions.length > 12) {
    warn(island.slug, `${set.questions.length} Fragen — vorgesehen sind 5 bis 12.`);
  }

  const ids = new Set();

  for (const q of set.questions) {
    totalQuestions++;

    if (!q.id) { fail(island.slug, "Frage ohne id."); continue; }
    if (ids.has(q.id)) fail(where(q.id), "Doppelte Fragen-ID.");
    ids.add(q.id);

    if (!TYPES.includes(q.type)) { fail(where(q.id), `Unbekannter Typ "${q.type}".`); continue; }
    if (!q.prompt) fail(where(q.id), "prompt fehlt.");
    if (!q.feedback) warn(where(q.id), "Kein Feedback-Text — die Sofortauflösung bleibt dann leer.");
    if (!q.category) warn(where(q.id), "Keine category — fehlt später in der Themenauswertung.");

    // --- „Falsch gewählt?" und „Mitnehmen" ---------------------------------
    // Beide Felder sind optional, damit ältere Fragensätze weiterlaufen.
    // Sobald sie da sind, muss die Form stimmen: Ein "fuer" auf eine Option,
    // die es nicht gibt, bleibt sonst still unmarkiert — die Frage sieht
    // richtig aus, und der Teilnehmer bekommt ausgerechnet seinen eigenen
    // Irrtum nie angestrichen.
    const irrtumTexte = [];

    if (q.irrtum === undefined) {
      warn(where(q.id), 'Kein irrtum — die Rubrik "Falsch gewählt?" bleibt bei dieser Frage leer.');
    } else if (!Array.isArray(q.irrtum) || !q.irrtum.length) {
      fail(where(q.id), "irrtum muss eine nicht leere Liste sein.");
    } else {
      const irrtumIds = q.type === "truefalse"
        ? ["richtig", "falsch"]
        : (q.options || []).map((o) => o.id);

      q.irrtum.forEach((eintrag, i) => {
        const stelle = `irrtum[${i}]`;
        if (!eintrag || typeof eintrag !== "object" || Array.isArray(eintrag)) {
          fail(where(q.id), `${stelle} ist kein Objekt.`);
          return;
        }
        if (!eintrag.titel) fail(where(q.id), `${stelle}: titel fehlt.`);
        if (!eintrag.text) fail(where(q.id), `${stelle}: text fehlt.`);
        irrtumTexte.push([`${stelle}.titel`, eintrag.titel], [`${stelle}.text`, eintrag.text]);

        if (eintrag.fuer === undefined) return;
        if (!Array.isArray(eintrag.fuer) || !eintrag.fuer.length) {
          fail(where(q.id), `${stelle}: fuer muss eine nicht leere Liste sein — oder ganz entfallen.`);
          return;
        }
        if (!["single", "multi", "truefalse"].includes(q.type)) {
          warn(where(q.id), `${stelle}: fuer wird bei Typ "${q.type}" nicht ausgewertet — der Absatz bleibt unmarkiert.`);
          return;
        }
        eintrag.fuer.forEach((id) => {
          if (!irrtumIds.includes(id)) {
            fail(where(q.id), `${stelle}: fuer verweist auf unbekannte Option "${id}".`);
          }
        });
      });
    }

    if (q.mitnehmen === undefined) {
      warn(where(q.id), "Kein mitnehmen — der Merksatz fehlt bei dieser Frage.");
    } else if (typeof q.mitnehmen !== "string" || !q.mitnehmen.trim()) {
      fail(where(q.id), "mitnehmen muss ein nicht leerer Text sein.");
    }

    // Die Engine macht aus **Wort** eine Hervorhebung. Ein einzelnes **
    // findet keinen Partner und bleibt als Sternchen im Text stehen — das
    // sieht auf dem Telefon nach einem Tippfehler aus und ist einer.
    [["feedback", q.feedback], ["mitnehmen", q.mitnehmen], ...irrtumTexte]
      .forEach(([feld, text]) => {
        if (typeof text !== "string") return;
        if ((text.match(/\*\*/g) || []).length % 2) {
          warn(where(q.id), `${feld}: ungerade Anzahl **, die Hervorhebung bleibt als Sternchen stehen.`);
        }
      });

    // --- Bilder: Pfad muss existieren, Alt-Text ist Pflicht -----------------
    const bilder = [];
    if (q.media && q.media.src) bilder.push({ src: q.media.src, alt: q.media.alt, feld: "media" });
    if (q.feedbackMedia && q.feedbackMedia.src) {
      bilder.push({ src: q.feedbackMedia.src, alt: q.feedbackMedia.alt, feld: "feedbackMedia" });
    }
    (q.options || []).forEach((o) => {
      if (o.image) bilder.push({ src: o.image, alt: o.imageAlt || o.text, feld: `Option ${o.id}` });
    });

    for (const bild of bilder) {
      if (!bild.src.startsWith("/")) {
        fail(where(q.id), `${bild.feld}: Pfad muss mit / beginnen ("${bild.src}").`);
        continue;
      }
      const datei = path.join(__dirname, "..", "public", bild.src.replace(/^\//, ""));
      if (!fs.existsSync(datei)) {
        fail(where(q.id), `${bild.feld}: Bild fehlt — ${bild.src}`);
      } else {
        const kb = fs.statSync(datei).size / 1024;
        // Vier Bilder je Frage, im Schulungsnetz einer Halle: über 150 KB
        // je Bild wird das spürbar.
        if (kb > 150) warn(where(q.id), `${bild.feld}: ${Math.round(kb)} KB — als WebP unter 150 KB bringen.`);
      }
      if (!bild.alt) fail(where(q.id), `${bild.feld}: imageAlt bzw. alt fehlt (Vorlesetext und Ersatz bei Ladefehler).`);
    }

    if (q.layout && !["portrait", "square", "landscape", "product"].includes(q.layout)) {
      fail(where(q.id), `Unbekanntes layout "${q.layout}" — erlaubt: portrait, square, landscape, product.`);
    }

    // --- single / multi ---
    if (q.type === "single" || q.type === "multi") {
      if (!Array.isArray(q.options) || q.options.length < 2) {
        fail(where(q.id), "Mindestens zwei options nötig.");
        continue;
      }
      const bildOptionen = q.options.filter((o) => Boolean(o.image));
      if (bildOptionen.length > 0 && bildOptionen.length !== q.options.length) {
        fail(
          where(q.id),
          `Bildauswahl unvollständig: ${bildOptionen.length} von ${q.options.length} Optionen haben ein Bild — bei Bildantworten brauchen alle Optionen ein Bild.`
        );
      }
      const maxOptions = q.layout === "product" ? 8 : 7;
      if (q.options.length > maxOptions) {
        fail(where(q.id), `${q.options.length} Optionen — dieses Antwortlayout unterstützt höchstens ${maxOptions}.`);
      }
      const optionIds = q.options.map((o) => o.id);
      if (new Set(optionIds).size !== optionIds.length) fail(where(q.id), "Doppelte option-id.");
      // Bildfragen tragen statt text nur image + imageAlt — beides ist gültig,
      // aber irgendetwas Benennbares muss die Option haben.
      q.options.forEach((o) => {
        if (!o.text && !o.image) fail(where(q.id), `Option ${o.id} hat weder text noch image.`);
      });

      if (!Array.isArray(q.correct) || !q.correct.length) {
        fail(where(q.id), "correct fehlt oder ist leer.");
        continue;
      }
      q.correct.forEach((id) => {
        if (!optionIds.includes(id)) fail(where(q.id), `correct verweist auf unbekannte Option "${id}".`);
      });
      if (q.type === "single" && q.correct.length !== 1) {
        fail(where(q.id), `Typ single, aber ${q.correct.length} richtige Antworten.`);
      }
      if (q.type === "multi" && q.correct.length === q.options.length) {
        warn(where(q.id), "Alle Optionen sind richtig — die Frage trennt nicht.");
      }
    }

    // --- truefalse ---
    if (q.type === "truefalse") {
      if (!Array.isArray(q.correct) || q.correct.length !== 1 ||
          !["richtig", "falsch"].includes(q.correct[0])) {
        fail(where(q.id), 'correct muss genau ["richtig"] oder ["falsch"] sein.');
      }
      if (q.options) warn(where(q.id), "options werden bei truefalse ignoriert.");
    }

    // --- order ---
    if (q.type === "order") {
      if (!Array.isArray(q.items) || q.items.length < 2) {
        fail(where(q.id), "Mindestens zwei items nötig.");
        continue;
      }
      const itemIds = q.items.map((i) => i.id);
      if (new Set(itemIds).size !== itemIds.length) fail(where(q.id), "Doppelte item-id.");
      q.items.forEach((i) => { if (!i.text) fail(where(q.id), `Item ${i.id} ohne text.`); });

      if (!Array.isArray(q.correct) || q.correct.length !== q.items.length) {
        fail(where(q.id), `correct muss alle ${q.items.length} items enthalten.`);
        continue;
      }
      if (new Set(q.correct).size !== q.correct.length) fail(where(q.id), "correct enthält Dubletten.");
      q.correct.forEach((id) => {
        if (!itemIds.includes(id)) fail(where(q.id), `correct verweist auf unbekanntes Item "${id}".`);
      });
    }

    // --- match ---
    if (q.type === "match") {
      if (!Array.isArray(q.left) || !q.left.length) { fail(where(q.id), "left fehlt."); continue; }
      if (!Array.isArray(q.right) || q.right.length < 2) { fail(where(q.id), "Mindestens zwei right-Optionen nötig."); continue; }

      const leftIds = q.left.map((l) => l.id);
      const rightIds = q.right.map((r) => r.id);
      if (new Set(leftIds).size !== leftIds.length) fail(where(q.id), "Doppelte left-id.");
      if (new Set(rightIds).size !== rightIds.length) fail(where(q.id), "Doppelte right-id.");
      q.left.forEach((l) => { if (!l.text) fail(where(q.id), `Left ${l.id} ohne text.`); });
      q.right.forEach((r) => { if (!r.text) fail(where(q.id), `Right ${r.id} ohne text.`); });

      if (!q.correct || typeof q.correct !== "object" || Array.isArray(q.correct)) {
        fail(where(q.id), "correct muss ein Objekt sein.");
        continue;
      }
      const keys = Object.keys(q.correct);
      if (keys.length !== leftIds.length) {
        fail(where(q.id), `correct deckt ${keys.length} von ${leftIds.length} left-Einträgen ab.`);
      }
      keys.forEach((k) => {
        if (!leftIds.includes(k)) fail(where(q.id), `correct-Schlüssel "${k}" ist kein left-Eintrag.`);
        if (!rightIds.includes(q.correct[k])) fail(where(q.id), `correct["${k}"] verweist auf unbekanntes right "${q.correct[k]}".`);
      });
    }
  }

  console.log(`  ${island.slug.padEnd(11)} ${String(set.questions.length).padStart(2)} Fragen  ` +
    `[${[...new Set(set.questions.map((q) => q.type))].join(", ")}]`);

  // Redaktionelle Notizen hier ausgeben statt im Quiz: auf dem Startbildschirm
  // läse sie der Händler am Aufsteller mit.
  if (set.internerHinweis) notizen.push({ insel: set.code || island.slug, text: set.internerHinweis });

  if (set.hinweis) {
    warn(island.slug, 'Feld "hinweis" wird nicht mehr angezeigt — in "internerHinweis" umbenennen.');
  }
}

// Gegenprobe: kennt die Function alle Inseln?
const fnSource = fs.readFileSync(
  path.join(__dirname, "..", "netlify", "functions", "submit-quiz.js"), "utf8");
for (const island of catalog.inseln) {
  if (!fnSource.includes(`${island.slug}: require(`)) {
    fail("submit-quiz.js", `Insel "${island.slug}" ist nicht eingebunden — Einsendungen würden abgewiesen.`);
  }
}

if (notizen.length) {
  console.log("\nOffene redaktionelle Punkte (erscheinen nicht im Quiz):");
  for (const n of notizen) {
    const zeilen = n.text.match(/.{1,72}(\s|$)/g) || [n.text];
    console.log(`\n  ${n.insel}`);
    zeilen.forEach((z) => console.log(`    ${z.trim()}`));
  }
}

console.log(`\n${totalQuestions} Fragen geprüft.`);
console.log(errors ? `\n${errors} Fehler, ${warnings} Hinweise.` : `Keine Fehler, ${warnings} Hinweise.`);
process.exit(errors ? 1 : 0);
