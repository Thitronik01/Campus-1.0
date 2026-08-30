"use strict";

/* ==========================================================================
   Legt aus BACKLOG.md GitHub-Issues an.

     node .github/issues-anlegen.js --probe        nur zeigen, was entstuende
     node .github/issues-anlegen.js                wirklich anlegen
     node .github/issues-anlegen.js R-01 R-05      nur diese beiden

   WARUM ALS WERKZEUG UND NICHT VON HAND

   BACKLOG.md ist die Quelle. Wer die Eintraege zusaetzlich von Hand in
   GitHub tippt, hat sie zweimal — und ab dem ersten Nachtrag
   unterschiedlich. Dieses Werkzeug liest dieselbe Datei, die auch der
   Mensch liest.

   VORAUSSETZUNG

   Die GitHub-CLI, angemeldet:

     winget install GitHub.cli
     gh auth login

   Ohne sie zeigt --probe trotzdem, was entstehen wuerde.

   Ein zweiter Lauf verdoppelt nichts: Titel, die es schon gibt — offen oder
   geschlossen —, werden uebersprungen.
   ========================================================================== */

const fs = require("fs");
const path = require("path");
const { execFileSync, spawnSync } = require("child_process");

const WURZEL = path.join(__dirname, "..");
const BACKLOG = path.join(WURZEL, "BACKLOG.md");

const argumente = process.argv.slice(2);
const probe = argumente.some((a) => a === "--probe" || a === "-n");
const gewuenscht = argumente.filter((a) => /^R-\d+$/.test(a));

if (!fs.existsSync(BACKLOG)) {
  console.error(`BACKLOG.md fehlt: ${BACKLOG}`);
  process.exit(1);
}

/** Zerlegt BACKLOG.md in Eintraege.
 *
 *  Der Aufbau ist bewusst schlicht gehalten, damit die Datei fuer Menschen
 *  lesbar bleibt und trotzdem maschinell zerlegbar ist:
 *
 *    ## R-07 · Titel des Befunds
 *    <!-- labels: sicherheit, hoch -->
 *
 *    **Befund.** …
 *
 *  Der Rumpf reicht bis zur naechsten Ueberschrift zweiter Ordnung. */
function eintraegeLesen() {
  const zeilen = fs.readFileSync(BACKLOG, "utf8").split(/\r?\n/);
  const raus = [];
  let aktuell = null;

  for (const zeile of zeilen) {
    const kopf = zeile.match(/^## (R-\d+) · (.+)$/);
    if (kopf) {
      if (aktuell) raus.push(aktuell);
      aktuell = { id: kopf[1], titel: kopf[2].trim(), labels: [], rumpf: [] };
      continue;
    }
    if (/^## /.test(zeile)) {        // anderer Abschnitt beendet den Eintrag
      if (aktuell) raus.push(aktuell);
      aktuell = null;
      continue;
    }
    if (!aktuell) continue;

    const marken = zeile.match(/^<!--\s*labels:\s*(.+?)\s*-->$/);
    if (marken) {
      aktuell.labels = marken[1].split(",").map((s) => s.trim()).filter(Boolean);
      continue;
    }
    if (zeile.trim() === "---") continue;   // Trenner gehoert nicht in den Rumpf
    aktuell.rumpf.push(zeile);
  }
  if (aktuell) raus.push(aktuell);

  return raus.map((e) => ({
    ...e,
    // Fuehrende und abschliessende Leerzeilen abschneiden
    rumpf: e.rumpf.join("\n").replace(/^\n+|\n+$/g, "")
  }));
}

/* Ohne `shell: true` aufrufen: Node warnt zu Recht davor, weil Argumente
   dabei nicht maskiert, sondern nur aneinandergehaengt werden — und hier
   gehen Titel und Rumpf aus einer Datei mit hindurch. execFileSync findet
   gh.exe auch ohne Shell ueber den PATH. */
function ghDa() {
  const r = spawnSync("gh", ["--version"], { stdio: "ignore" });
  return r.status === 0 && !r.error;
}

function vorhandeneTitel() {
  try {
    const roh = execFileSync("gh",
      ["issue", "list", "--state", "all", "--limit", "500", "--json", "title", "--jq", ".[].title"],
      { cwd: WURZEL, encoding: "utf8" });
    return new Set(roh.split("\n").map((z) => z.trim()).filter(Boolean));
  } catch {
    return new Set();
  }
}

// ---------------------------------------------------------------- Durchlauf --

let eintraege = eintraegeLesen();
if (gewuenscht.length) {
  eintraege = eintraege.filter((e) => gewuenscht.includes(e.id));
  if (!eintraege.length) {
    console.error(`Keiner der genannten Eintraege steht in BACKLOG.md: ${gewuenscht.join(", ")}`);
    process.exit(1);
  }
}

if (!eintraege.length) {
  console.error("BACKLOG.md enthaelt keine Eintraege im erwarteten Aufbau (## R-nn · Titel).");
  process.exit(1);
}

const habenGh = ghDa();
if (!probe && !habenGh) {
  console.error(`
Die GitHub-CLI (gh) fehlt.

  winget install GitHub.cli
  gh auth login

Ohne sie zeigt --probe, was entstehen wuerde:

  node .github/issues-anlegen.js --probe
`);
  process.exit(1);
}

const schon = (!probe && habenGh) ? vorhandeneTitel() : new Set();

let angelegt = 0;
let uebersprungen = 0;

for (const e of eintraege) {
  const titel = `${e.id} · ${e.titel}`;

  if (schon.has(titel)) {
    console.log(`  schon da     ${titel.slice(0, 88)}`);
    uebersprungen++;
    continue;
  }

  if (probe) {
    console.log(`  ${e.id}  [${e.labels.join(", ")}]  ${e.titel.slice(0, 80)}`);
    angelegt++;
    continue;
  }

  const rumpf = `${e.rumpf}\n\n---\n_Angelegt aus [\`BACKLOG.md\`](../blob/main/BACKLOG.md), Eintrag ${e.id}._\n`;
  const args = ["issue", "create", "--title", titel, "--body", rumpf];
  for (const l of e.labels) args.push("--label", l);

  try {
    const url = execFileSync("gh", args,
      { cwd: WURZEL, encoding: "utf8" }).trim();
    console.log(`  angelegt     ${e.id}  ${url}`);
    angelegt++;
  } catch (fehler) {
    /* Der haeufigste Grund ist ein Label, das es im Repository noch nicht
       gibt. Deshalb ein zweiter Versuch ohne Marken statt eines Abbruchs —
       ein Issue ohne Label ist brauchbarer als keines. */
    try {
      const url = execFileSync("gh", ["issue", "create", "--title", titel, "--body", rumpf],
        { cwd: WURZEL, encoding: "utf8" }).trim();
      console.log(`  angelegt*    ${e.id}  ${url}   (ohne Marken: ${e.labels.join(", ")} fehlen im Repository)`);
      angelegt++;
    } catch (zweiter) {
      console.error(`  FEHLER       ${e.id}: ${String(zweiter.stderr || zweiter.message).trim().split("\n")[0]}`);
    }
  }
}

console.log("");
console.log(probe
  ? `Probe: ${angelegt} Issue(s) wuerden angelegt. Ohne --probe wirklich anlegen.`
  : `${angelegt} angelegt, ${uebersprungen} uebersprungen.`);
