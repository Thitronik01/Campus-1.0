"use strict";

/* ==========================================================================
   Schreibt alle Fragensätze als ein lesbares Dokument heraus.

     node tools/fragenkatalog.js

   Erzeugt FRAGENKATALOG.md neben dem README. Gedacht für die fachliche
   Freigabe: die Fragen liegen sonst als JSON in sieben Dateien, und darin
   liest niemand gern Korrektur.

   Erzeugt, nicht gepflegt. Wer eine Frage ändert, ändert sie im JSON und
   lässt dieses Werkzeug erneut laufen — sonst driftet das Dokument von den
   Fragen weg, die tatsächlich ausgeliefert werden.

   Das Dokument nennt alle Lösungen. Es gehört nicht in Teilnehmerhand.
   ========================================================================== */

const fs = require("fs");
const path = require("path");

const WURZEL = path.join(__dirname, "..");
const ZIEL = path.join(WURZEL, "FRAGENKATALOG.md");

const TYPNAME = {
  single: "Einfachauswahl",
  multi: "Mehrfachauswahl",
  truefalse: "Richtig/Falsch",
  order: "Reihenfolge",
  match: "Zuordnung"
};

/** Nur die Pipe stört: sie zerlegt sonst die Tabellenzeilen der Zuordnung. */
const zelle = (text) => String(text).replace(/\|/g, "\\|");

/** Anker, wie GitHub sie aus Überschriften bildet: kleingeschrieben, alles
 *  außer Buchstaben, Ziffern, Leerzeichen und Bindestrich fällt weg, dann
 *  wird jedes einzelne Leerzeichen zu einem Bindestrich. Zwei Feinheiten
 *  entscheiden hier über funktionierende Links: Ø und ø sind Buchstaben und
 *  bleiben stehen (deshalb \p{L} statt \w), und aus dem entfernten
 *  Gedankenstrich werden zwei Bindestriche, weil die Leerzeichen links und
 *  rechts davon erhalten bleiben. */
function anker(text) {
  return text.toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s/g, "-");
}

// ------------------------------------------------------------------ Lesen --

const katalog = JSON.parse(fs.readFileSync(path.join(WURZEL, "public", "data", "inseln.json"), "utf8"));

const inseln = katalog.inseln.map((eintrag) => {
  const datei = path.join(WURZEL, "public", "data", "inseln", `${eintrag.slug}.json`);
  return JSON.parse(fs.readFileSync(datei, "utf8"));
});

// ---------------------------------------------------------------- Aufbau ---

/** Die Antwortmöglichkeiten einer Frage, richtige Antworten hervorgehoben. */
function antworten(frage) {
  const zeilen = [];

  if (frage.type === "truefalse") {
    ["richtig", "falsch"].forEach((wert) => {
      const richtig = frage.correct.includes(wert);
      const text = wert === "richtig" ? "Richtig" : "Falsch";
      zeilen.push(richtig ? `- **${text}** ✓` : `- ${text}`);
    });
    return zeilen.join("\n");
  }

  if (frage.type === "single" || frage.type === "multi") {
    frage.options.forEach((option) => {
      const richtig = frage.correct.includes(option.id);
      // Bildantworten tragen oft keinen Text — dann ist der Alt-Text die
      // einzige Benennung, und der Pfad sagt, welches Foto gemeint ist.
      const text = option.image
        ? `\`${option.image}\`${option.imageAlt ? ` — ${option.imageAlt}` : ""}`
        : option.text;
      zeilen.push(richtig ? `- **${text}** ✓` : `- ${text}`);
    });
    return zeilen.join("\n");
  }

  if (frage.type === "order") {
    // Die richtige Reihenfolge ist hier die Lösung, also steht sie so da.
    frage.correct.forEach((id, i) => {
      const eintrag = frage.items.find((item) => item.id === id);
      zeilen.push(`${i + 1}. ${eintrag ? eintrag.text : id}`);
    });
    return zeilen.join("\n");
  }

  if (frage.type === "match") {
    zeilen.push("| Zuzuordnen | Richtig |", "|---|---|");
    Object.entries(frage.correct).forEach(([links, rechts]) => {
      const l = (frage.left.find((x) => x.id === links) || {}).text || links;
      const r = (frage.right.find((x) => x.id === rechts) || {}).text || rechts;
      zeilen.push(`| ${zelle(l)} | ${zelle(r)} |`);
    });

    // Rechte Einträge, die zu keinem linken gehören, sind Ablenker. Sie
    // stehen im Quiz zur Auswahl, tauchen in der Lösungstabelle aber
    // naturgemäß nicht auf — und ob ein Ablenker plausibel ist, entscheidet
    // sich gerade bei der fachlichen Freigabe. Also gehören sie hierhin.
    const vergeben = new Set(Object.values(frage.correct));
    const ablenker = frage.right.filter((r) => !vergeben.has(r.id));
    if (ablenker.length) {
      zeilen.push("");
      zeilen.push(`Weitere Auswahlmöglichkeiten, die zu nichts passen: ${ablenker.map((a) => a.text).join(" · ")}`);
    }
    return zeilen.join("\n");
  }

  return "";
}

/** Die Rubrik „Falsch gewählt?".
 *
 *  Jeder Absatz nennt hinter `fuer` die Optionen, auf die er sich bezieht —
 *  daraus entscheidet die Engine, wessen eigener Irrtum hervorgehoben wird.
 *  Dass diese Zuordnung stimmt, kann kein Werkzeug prüfen: Ein Absatz, der
 *  auf die falsche Option zeigt, ist gültiges JSON und trotzdem falsch. Also
 *  steht die Zuordnung im Klartext hier, wo sie gegengelesen wird. */
function irrtuemer(frage) {
  if (!Array.isArray(frage.irrtum) || !frage.irrtum.length) return "";

  const benennung = (id) => {
    if (frage.type === "truefalse") return id === "richtig" ? "Richtig" : "Falsch";
    const option = (frage.options || []).find((o) => o.id === id);
    if (!option) return id;
    return option.text || option.imageAlt || id;
  };

  const zeilen = ["**Falsch gewählt?**", ""];
  frage.irrtum.forEach((eintrag) => {
    zeilen.push(`- *${eintrag.titel}:* ${eintrag.text}`);
    if (Array.isArray(eintrag.fuer) && eintrag.fuer.length) {
      zeilen.push(`  <br>↳ bezogen auf: ${eintrag.fuer.map((id) => `„${benennung(id)}“`).join(" · ")}`);
    }
  });
  return zeilen.join("\n");
}

function frageBlock(frage, nummer) {
  const teile = [];
  teile.push(`#### ${nummer}. ${frage.prompt}`);
  teile.push("");

  const kopf = [`\`${frage.id}\``, TYPNAME[frage.type] || frage.type];
  if (frage.category) kopf.push(frage.category);
  teile.push(kopf.join(" · "));
  teile.push("");

  if (frage.hint) {
    teile.push(`> ${frage.hint}`);
    teile.push("");
  }

  if (frage.media && frage.media.src) {
    const bu = frage.media.caption || frage.media.alt || "";
    teile.push(`**Bild zur Frage:** \`${frage.media.src}\`${bu ? ` — ${bu}` : ""}`);
    teile.push("");
  }

  if (frage.audio && frage.audio.src) {
    teile.push(`**Ton zur Frage:** \`${frage.audio.src}\` — ${frage.audio.fallbackText || "ohne Textbeschreibung"}`);
    teile.push("");
  }

  teile.push(antworten(frage));
  teile.push("");

  if (frage.feedback) {
    teile.push(`**Auflösung:** ${frage.feedback}`);
    teile.push("");
  }

  if (frage.feedbackMedia && frage.feedbackMedia.src) {
    const bu = frage.feedbackMedia.caption || frage.feedbackMedia.alt || "";
    teile.push(`**Bild zur Auflösung:** \`${frage.feedbackMedia.src}\`${bu ? ` — ${bu}` : ""}`);
    teile.push("");
  }

  // Reihenfolge wie im Quiz: erst die Auflösung, dann die Irrtümer, zuletzt
  // der Merksatz. Wer hier gegenliest, sieht dieselbe Abfolge wie der
  // Teilnehmer auf dem Telefon.
  const irr = irrtuemer(frage);
  if (irr) {
    teile.push(irr);
    teile.push("");
  }

  if (frage.mitnehmen) {
    teile.push(`**Mitnehmen:** ${frage.mitnehmen}`);
    teile.push("");
  }

  return teile.join("\n");
}

function inselBlock(insel) {
  const teile = [];
  teile.push(`## ${insel.code} — ${insel.title}`);
  teile.push("");

  const fakten = [
    ["Fragen", String(insel.questions.length)],
    ["Fragensatz-Version", String(insel.version)],
    ["Lernziel", insel.lernziel || "—"]
  ];
  if (insel.subtitle) fakten.splice(2, 0, ["Art", insel.subtitle]);
  teile.push("| | |", "|---|---|");
  fakten.forEach(([k, v]) => teile.push(`| ${k} | ${zelle(v)} |`));
  teile.push("");

  if (insel.quellen && insel.quellen.length) {
    teile.push(`**Quellen im Produktwissen:** ${insel.quellen.map((q) => `\`${q}\``).join(", ")}`);
    teile.push("");
  }

  if (insel.internerHinweis) {
    teile.push(`> **Redaktioneller Hinweis (erscheint nicht im Quiz):** ${insel.internerHinweis}`);
    teile.push("");
  }

  insel.questions.forEach((frage, i) => teile.push(frageBlock(frage, i + 1)));
  return teile.join("\n");
}

// --------------------------------------------------------------- Schreiben --

const gesamt = inseln.reduce((summe, insel) => summe + insel.questions.length, 0);

const nachTyp = {};
inseln.forEach((insel) => insel.questions.forEach((frage) => {
  nachTyp[frage.type] = (nachTyp[frage.type] || 0) + 1;
}));

const kopf = [];
kopf.push("# Fragenkatalog — THITRONIK Campus");
kopf.push("");
kopf.push("> **Dieses Dokument nennt alle Lösungen.** Es ist für die fachliche");
kopf.push("> Freigabe und die Schulungsvorbereitung gedacht, nicht für die");
kopf.push("> Teilnehmer.");
kopf.push("");
kopf.push("**Erzeugt** mit `node tools/fragenkatalog.js` aus den Fragensätzen in");
kopf.push("`public/data/inseln/`. Änderungen gehören dorthin, nicht in diese Datei.");
kopf.push("");
kopf.push(`${gesamt} Fragen auf ${inseln.length} Inseln.`);
kopf.push("");
kopf.push("| Fragetyp | Anzahl |");
kopf.push("|---|---:|");
Object.entries(nachTyp)
  .sort((a, b) => b[1] - a[1])
  .forEach(([typ, anzahl]) => kopf.push(`| ${TYPNAME[typ] || typ} | ${anzahl} |`));
kopf.push("");
kopf.push("## Inhalt");
kopf.push("");
inseln.forEach((insel) => {
  const titel = `${insel.code} — ${insel.title}`;
  kopf.push(`- [${titel}](#${anker(titel)}) · ${insel.questions.length} Fragen`);
});
kopf.push("");
kopf.push("---");
kopf.push("");

const dokument = (kopf.join("\n") + inseln.map(inselBlock).join("\n---\n\n")).trimEnd() + "\n";

fs.writeFileSync(ZIEL, dokument, "utf8");

console.log(`FRAGENKATALOG.md geschrieben — ${gesamt} Fragen, ${inseln.length} Inseln, ${(dokument.length / 1024).toFixed(1)} KB.`);
Object.entries(nachTyp).forEach(([typ, anzahl]) => {
  console.log(`  ${(TYPNAME[typ] || typ).padEnd(16)} ${anzahl}`);
});
