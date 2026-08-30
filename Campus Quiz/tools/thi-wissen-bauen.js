"use strict";

/* ==========================================================================
   Erzeugt den Wissensbestand für THI aus dem Standalone-Export.

     node tools/thi-wissen-bauen.js

   Quelle ist `thi-standalone/thi-standalone/project-data/runtime/wiki/`
   (33 MB, elf Sprachen, mit internen Abschnitten). Ziel ist
   `netlify/functions/thi-wissen/` — rund 3,5 MB, nur Deutsch, ohne alles,
   was ein Händler nicht sehen darf.

   Warum überhaupt umbauen und nicht die Originaldateien einbinden:

   1. GRÖSSE. Eine Netlify Function lädt ihr Bundle bei jedem Kaltstart neu.
      33 MB JSON zu parsen dauert Sekunden — und zwar bei der ersten Frage
      jedes Teilnehmers. Deutsch allein sind 3,5 MB, das parst in ~80 ms.
      Die zehn anderen Sprachen sind hier tote Last: der Chat läuft deutsch.

   2. SICHERHEIT. Der Runtime-Index trägt in `body`/`excerpt` auch die
      "Service & Intern"-Abschnitte der Standardartikel. Im Standalone filtert
      sie eine Rollenprüfung zur Laufzeit heraus. Der Campus hat keine
      Anmeldung und damit keine Rollen — also wird hier beim BAU gefiltert.
      Was nicht im Bestand liegt, kann auch kein Fehler in der Function
      versehentlich ausliefern.

   Die Filterlogik stammt unverändert aus dem Standalone
   (`lib/wiki-dealer-view.mjs`), damit beide Seiten dieselbe Vorstellung davon
   haben, was "intern" ist.
   ========================================================================== */

const fs = require("fs");
const path = require("path");

const WURZEL = path.join(__dirname, "..");
const PROJEKT = path.join(WURZEL, "..");
const QUELLE = path.join(
  PROJEKT, "thi-standalone", "thi-standalone", "project-data", "runtime", "wiki"
);
const ZIEL = path.join(WURZEL, "netlify", "functions", "thi-wissen");

const SPRACHE = "de";

/* Anker der "Service & Intern"-Abschnitte, wortgleich aus
   thi-standalone/lib/wiki-dealer-view.mjs übernommen. Die Überschrift wurde
   im Juli 2026 redaktionell umbenannt, deshalb stehen alte und neue
   Schreibweise nebeneinander. Nur die deutschen Varianten werden gebraucht —
   die übrigen Sprachen fallen ohnehin weg —, die restlichen bleiben als
   Sicherheitsnetz stehen, falls jemand den Bestand später mehrsprachig baut. */
const INTERNE_ANKER = new Set([
  "service-amp-intern",
  "service-intern",
  "service--intern",
  "service--internal",
  "service--interne",
  "servicio-e-interno",
  "servizio-e-interno",
  "service--internt",
  "service-og-internt",
  "serwis-i-wewnętrzne",
  "servis--interní",
  "service-und-interne-abläufe",
  "service-and-internal-processes",
  "service-et-procédures-internes",
  "servicio-y-procesos-internos",
  "assistenza-e-procedure-interne",
  "service-en-interne-processen",
  "service-og-interne-processer",
  "service-och-interna-processer",
  "service-og-interne-prosesser",
  "serwis-i-procesy-wewnętrzne",
  "servis-a-interní-procesy"
]);

/* Felder, die im Bestand nichts zu suchen haben. `dealerBody` und Verwandte
   sind Rohmaterial der Projektion und nach ihr redundant; `path` verrät die
   Ordnerstruktur des Wikis, `primaryImage` zeigt auf Bilder, die es im Campus
   nicht gibt. */
const FELDER_ARTIKEL = [
  "route", "title", "slug", "section", "headings", "excerpt", "body",
  "keywords", "boostKeywords", "articleType", "updated"
];
const FELDER_ABSCHNITT = [
  "route", "anchor", "title", "slug", "heading", "headingPath", "body", "articleType"
];

// ------------------------------------------------------------------ Helfer --

function lies(datei) {
  const voll = path.join(QUELLE, datei);
  if (!fs.existsSync(voll)) {
    throw new Error(
      `Quelldatei fehlt: ${voll}\n` +
      "Liegt der Ordner thi-standalone/ neben Campus Quiz/? " +
      "Er ist die Quelle des Wissensbestands und wird nur hier gebraucht."
    );
  }
  return JSON.parse(fs.readFileSync(voll, "utf8"));
}

/** Nur die gewünschten Felder übernehmen, leere weglassen.
 *  Spart im fertigen Bestand rund 8 % — vor allem durch die vielen
 *  Einträge ohne `boostKeywords` oder `headingPath`. */
function schlank(eintrag, felder) {
  const out = {};
  for (const feld of felder) {
    const wert = eintrag[feld];
    if (wert === undefined || wert === null || wert === "") continue;
    out[feld] = wert;
  }
  return out;
}

/** Händler-Fassung eines Suchindex-Eintrags.
 *
 *  Trägt der Eintrag `dealerBody`/`dealerExcerpt`, hat der Ingest dort die um
 *  interne Abschnitte bereinigte Fassung abgelegt — die ersetzt dann die
 *  ungefilterten Felder. Fehlt sie, enthält der Artikel keinen internen
 *  Anteil und bleibt, wie er ist.
 *
 *  Fail-closed: Ist `dealerBody` vorhanden aber leer, wird der Text leer —
 *  nie ersatzweise der ungefilterte. */
function haendlerSicht(eintrag) {
  const { dealerExcerpt, dealerBody, dealerKeywords, dealerHeadings, ...rest } = eintrag;
  if (dealerBody === undefined && dealerExcerpt === undefined) return rest;
  return {
    ...rest,
    excerpt: dealerExcerpt ?? "",
    body: dealerBody ?? "",
    keywords: dealerKeywords ?? "",
    headings: dealerHeadings ?? ""
  };
}

function mb(text) {
  return `${(Buffer.byteLength(text, "utf8") / 1024 / 1024).toFixed(2)} MB`;
}

// -------------------------------------------------------------------- Bau ---

function bauen() {
  console.log(`Quelle: ${QUELLE}`);

  // --- Artikel -------------------------------------------------------------
  const suchIndexRoh = lies("search-index.json");
  if (!Array.isArray(suchIndexRoh)) throw new Error("search-index.json ist kein Array.");

  const artikel = suchIndexRoh
    .filter((e) => e.lang === SPRACHE)
    .filter((e) => e.visibility !== "internal")
    .map(haendlerSicht)
    .map((e) => schlank(e, FELDER_ARTIKEL))
    // Einträge ohne jeden Text sind für das Retrieval wertlos: sie können
    // nie gewinnen, kosten aber in jeder Suche einen Durchlauf.
    .filter((e) => (e.body || e.excerpt || "").length > 0);

  // --- Abschnitte ----------------------------------------------------------
  const abschnitteRoh = lies("section-index.json");
  if (!Array.isArray(abschnitteRoh)) throw new Error("section-index.json ist kein Array.");

  const abschnitte = abschnitteRoh
    .filter((s) => s.lang === SPRACHE)
    .filter((s) => s.visibility !== "internal" && s.dealerHidden !== true)
    // Zweiter Riegel: Der Ingest markiert interne Abschnitte als dealerHidden.
    // Sollte diese Markierung bei einem künftigen Ingest einmal fehlen, fängt
    // die Ankerliste denselben Abschnitt trotzdem ab.
    .filter((s) => !INTERNE_ANKER.has(String(s.anchor || "")))
    .map((s) => schlank(s, FELDER_ABSCHNITT))
    .filter((s) => (s.body || "").length > 0);

  // --- Gegenprobe ----------------------------------------------------------
  // Ein Bestand, der das Wort aus einer internen Überschrift noch enthält,
  // wäre still kaputt: die Function liefert dann Text aus, den der Händler
  // nicht sehen soll. Deshalb hier ein Abbruch statt einer Warnung.
  const verdaechtig = abschnitte.filter((s) =>
    INTERNE_ANKER.has(String(s.anchor || ""))
  );
  if (verdaechtig.length) {
    throw new Error(
      `${verdaechtig.length} interne Abschnitte haben die Filter überlebt — Bau abgebrochen.`
    );
  }

  // --- Schreiben -----------------------------------------------------------
  fs.mkdirSync(ZIEL, { recursive: true });

  const artikelText = JSON.stringify(artikel);
  const abschnitteText = JSON.stringify(abschnitte);

  fs.writeFileSync(path.join(ZIEL, "artikel.de.json"), artikelText, "utf8");
  fs.writeFileSync(path.join(ZIEL, "abschnitte.de.json"), abschnitteText, "utf8");

  const stand = {
    erzeugtAm: new Date().toISOString().slice(0, 10),
    quelle: "thi-standalone/project-data/runtime/wiki",
    sprache: SPRACHE,
    artikel: artikel.length,
    abschnitte: abschnitte.length,
    hinweis:
      "Erzeugt von tools/thi-wissen-bauen.js. Nicht von Hand ändern — " +
      "der nächste Bau überschreibt die Dateien."
  };
  fs.writeFileSync(
    path.join(ZIEL, "stand.json"), `${JSON.stringify(stand, null, 2)}\n`, "utf8"
  );

  console.log(`Ziel:   ${ZIEL}`);
  console.log("");
  console.log(`  artikel.de.json      ${String(artikel.length).padStart(5)} Einträge   ${mb(artikelText)}`);
  console.log(`  abschnitte.de.json   ${String(abschnitte.length).padStart(5)} Einträge   ${mb(abschnitteText)}`);
  console.log("");
  console.log(`Von ${suchIndexRoh.length} Artikeln und ${abschnitteRoh.length} Abschnitten in elf Sprachen`);
  console.log("bleiben die deutschen ohne interne Anteile.");
}

if (require.main === module) {
  try {
    bauen();
  } catch (fehler) {
    console.error(`\nFehlgeschlagen: ${fehler.message}\n`);
    process.exit(1);
  }
}

module.exports = { bauen, haendlerSicht, INTERNE_ANKER };
