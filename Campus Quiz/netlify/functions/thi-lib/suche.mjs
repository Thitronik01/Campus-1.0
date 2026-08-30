/* ==========================================================================
   Such- und Retrieval-Kern für THI.
   --------------------------------------------------------------------------
   Übernommen aus dem Standalone-Export (`lib/search-core.js`) und auf den
   Campus zugeschnitten. Die Bewertungslogik ist unverändert — sie ist dort
   gegen echte Fragen eingestellt worden, und jede Änderung an den Gewichten
   verschiebt, welcher Artikel bei welcher Frage gewinnt.

   Zwei Parameter sind weggefallen:

   - `access`. Der Standalone filtert interne Inhalte zur Laufzeit anhand der
     Nutzerrolle. Der Campus-Bestand ist beim Bau gefiltert
     (tools/thi-wissen-bauen.js), enthält also nur Händler-Inhalte. Ein
     Rollenparameter, der immer denselben Wert hat, wäre hier eine Attrappe.
   - `lang`. Der Bestand ist deutsch, der Chat ist deutsch.

   Reine Funktionen, keine Abhängigkeiten — damit tools/test-thi.js sie ohne
   Server prüfen kann.
   ========================================================================== */

/* Umlaut-Digraphen MÜSSEN vor dem NFD-Strip laufen. Andersherum wird aus "ä"
   erst "a", und die ae/oe/ue-Normalisierung greift nie — getipptes
   "Türkontakt" fand dann den Artikel "Türkontakt" nicht. Query und Text
   laufen beide durch diese Funktion, die Normalisierung bleibt also
   symmetrisch. */
export function normalisiere(wert) {
  return String(wert || "")
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    // Punktierte Akronyme kollabieren: "G.A.S." → "gas", "T.S.A." → "tsa".
    // Greift nur bei mindestens zwei Buchstabe-Punkt-Paaren, damit Versionen
    // ("1.1"), Artikelnummern und Pfade unberührt bleiben.
    .replace(/\b(?:[a-z]\.){2,}/g, (m) => m.replace(/\./g, ""));
}

/* FAQ- und Anleitungsextrakte fluten den Index mit generischen Begriffen —
   jede zweite FAQ-Frage enthält den Produktnamen. Ohne Abwertung verdrängen
   sie die kanonischen Fachartikel aus dem Kontextfenster. Multiplikativ, nicht
   ausschliessend: ein deutlich stärkerer PDF-Treffer gewinnt weiterhin. */
const PDF_TYPEN = new Set(["faq", "anleitung"]);
const PDF_FAKTOR = 0.4;

/* Ankerlose Intro-Abschnitte tragen als Überschrift den Artikel-H1, also den
   Produktnamen — der matcht in fast jeder Produktfrage und würde sonst die
   konkreten Unterabschnitte verdrängen. */
const INTRO_FAKTOR = 0.25;

/* Fahrzeugartikel enthalten durch die ausführlichen Einbauanleitungen sehr
   viele allgemeine Begriffe (Montage, Batterie, CAN, Alarm). Ohne genanntes
   Fahrzeugmodell verdrängen sie dadurch die Produkt- und Diagnoseartikel.
   Nennt die Frage ein Modell, bleiben sie voll gewichtet. */
const FAHRZEUG_FAKTOR = 0.35;

const FAHRZEUG_RE = /\b(?:adria|boxer|citroen|coral|crafter|daily|ducato|fiat|ford|iveco|jumper|knaus|man|master|matrix|mercedes|movano|ncv3|nissan|opel|peugeot|primastar|renault|sprinter|talento|tge|toyota|trafic|transit|t1n|vito|volkswagen|vw|w447|vs30|x250|t5|t6(?:\.1)?)\b/;

/* Die Normalisierung eines Artikelkörpers kostet bei 1,8 MB Bestand spürbar
   Zeit. Da dieselben Objekte über die Lebensdauer der Function immer wieder
   durchsucht werden, lohnt der Cache — WeakMap, damit er nichts am Leben hält. */
const FELDER_CACHE = new WeakMap();

function felder(eintrag) {
  if (eintrag && typeof eintrag === "object" && FELDER_CACHE.has(eintrag)) {
    return FELDER_CACHE.get(eintrag);
  }
  const f = {
    titel: normalisiere(eintrag?.title),
    slug: normalisiere(eintrag?.slug),
    ueberschriften: normalisiere(eintrag?.headings),
    ueberschrift: normalisiere(`${eintrag?.heading || ""} ${eintrag?.headingPath || ""}`),
    boost: normalisiere(eintrag?.boostKeywords),
    schlagworte: normalisiere(eintrag?.keywords),
    auszug: normalisiere(eintrag?.excerpt),
    text: normalisiere(eintrag?.body)
  };
  f.alles = `${f.titel} ${f.slug} ${f.ueberschriften} ${f.ueberschrift} ${f.boost} ${f.schlagworte} ${f.auszug} ${f.text}`;
  if (eintrag && typeof eintrag === "object") FELDER_CACHE.set(eintrag, f);
  return f;
}

/* Deutsche Stoppwörter. Ohne sie bestimmt "wie" oder "ist" mit, welcher
   Artikel gewinnt — die kommen in jedem Artikel vor und tragen nichts bei. */
const STOPPWOERTER = new Set([
  "aber", "als", "am", "an", "auch", "auf", "aus", "bei", "bin", "bitte", "bis",
  "da", "damit", "dann", "das", "dass", "dem", "den", "denn", "der", "des",
  "die", "diese", "dieser", "dieses", "doch", "dort", "du", "durch", "ein",
  "eine", "einem", "einen", "einer", "eines", "er", "es", "etwas", "fuer",
  "geht", "gibt", "habe", "haben", "hat", "hier", "ich", "ihr", "im", "in",
  "ist", "ja", "kann", "koennen", "machen", "mal", "man", "mehr", "mein",
  "mich", "mir", "mit", "muss", "nach", "nein", "nicht", "noch", "nur", "ob",
  "oder", "ohne", "sehr", "sein", "sich", "sie", "sind", "so", "soll", "um",
  "und", "uns", "unter", "vom", "von", "vor", "war", "warum", "was", "wenn",
  "wer", "werden", "wie", "wieder", "wird", "wieso", "wir", "wo", "zu", "zum",
  "zur", "tun", "jetzt", "dazu", "davon", "darauf", "danach", "denen", "dies"
]);

/** Aussagekräftige Begriffe: keine Stoppwörter, mindestens drei Zeichen —
 *  oder ziffernhaltig, damit "g5" und "t6" durchkommen. */
export function begriffe(text) {
  return normalisiere(text)
    .split(/\s+/)
    .map((t) => t.replace(/^[^a-z0-9]+|[^a-z0-9.-]+$/g, ""))
    .filter((t) => t && !STOPPWOERTER.has(t) && (t.length >= 3 || /\d/.test(t)));
}

/* Umgangssprache und Schreibvarianten auf die kanonischen Slugs abbilden. Die
   Muster laufen auf dem normalisierten Text, Umlaute sind dort bereits
   aufgelöst. Ein Treffer auf dem Slug ist im Scoring zehn Punkte wert — die
   Aliasse holen also genau die Artikel nach vorn, die gemeint sind. */
export const PRODUKT_ALIASSE = [
  [/wipro\s*-?\s*(3|iii)\b|wipro3|wi\s+pro\b/, "wipro-iii"],
  [/alarmanlage|alarmsystem|funk-?alarm/, "wipro-iii"],
  [/g\.?\s?a\.?\s?s\.?[\s-]*pro|gas\s*-?\s*pro|gaspro|gaswarner|gasalarm|narkosegas|betaeubungsgas/, "gas-pro-iii gas-pro"],
  [/ortung|\bgps\b|tracker|tracking|peilsender|orten\b/, "pro-finder"],
  [/pro\s*-?\s*finder|profinder/, "pro-finder"],
  [/bt\s*-?\s*connect|btconnect|\bbluetooth\b/, "bt-connect"],
  [/fernbedienung|hand\s*-?\s*sender/, "funk-handsender"],
  [/magnetkontakt|tuer\s*-?\s*kontakt|fensterkontakt/, "funk-magnetkontakt"],
  [/\bnfc\b|schluesselkarte/, "nfc-modul"],
  [/sirene|\bhupe\b/, "sirenen-hupen"],
  [/einlernen|\bpairing\b|koppeln\b/, "anlernen"],
  [/\btsa\b|funk[-\s]?rauchmelder|rauchmelder|brandmelder/, "funk-rauchmelder"]
];

/** Hängt die kanonischen Begriffe an, wenn die Frage Umgangssprache nutzt. */
export function erweitere(frage) {
  const norm = normalisiere(frage);
  if (!norm.trim()) return frage;
  const zusatz = [];
  for (const [muster, kanonisch] of PRODUKT_ALIASSE) {
    if (!muster.test(norm)) continue;
    for (const begriff of kanonisch.split(/\s+/)) {
      if (!norm.includes(begriff) && !zusatz.includes(begriff)) zusatz.push(begriff);
    }
  }
  return zusatz.length ? `${frage} ${zusatz.join(" ")}` : frage;
}

/** Baut die Suchanfrage aus der Frage und dem bisherigen Gespräch.
 *
 *  Kurze Folgefragen ("und wie lösche ich ihn?") haben für sich genommen
 *  keine suchbaren Begriffe. Sie erben deshalb die aussagekräftigen Begriffe
 *  der letzten Nutzerfragen. Lange, eigenständige Fragen bleiben unberührt. */
export function sucheAnfrage(frage, fruehereFragen = []) {
  const eigene = begriffe(frage);
  let zusammen = frage;
  if (eigene.length < 3) {
    const geerbt = [];
    for (const frueher of [...fruehereFragen].reverse()) {
      for (const begriff of begriffe(frueher)) {
        if (!eigene.includes(begriff) && !geerbt.includes(begriff)) geerbt.push(begriff);
      }
      if (geerbt.length >= 4) break; // eine Vorgängerfrage reicht meist
    }
    if (geerbt.length) zusammen = `${frage} ${geerbt.slice(0, 6).join(" ")}`;
  }
  return erweitere(zusammen);
}

function suchBegriffe(frage) {
  const b = begriffe(frage);
  if (b.length) return [...new Set(b)];
  return [...new Set(normalisiere(frage).split(/\s+/).filter(Boolean))];
}

/** Seltene Fachbegriffe zählen mehr als überall vorkommende Wörter.
 *  Der Aufschlag ist bei 4 gedeckelt, damit ein einzelner exotischer Begriff
 *  nicht die ganze Frage überstimmt. */
function gewichte(eintraege, terme) {
  const w = new Map();
  const gesamt = Math.max(1, eintraege.length);
  for (const term of terme) {
    let vorkommen = 0;
    for (const e of eintraege) if (felder(e).alles.includes(term)) vorkommen += 1;
    w.set(term, Math.min(4, 1 + Math.log((gesamt + 1) / (vorkommen + 1))));
  }
  return w;
}

function fahrzeugAbsicht(frage) {
  return FAHRZEUG_RE.test(normalisiere(frage));
}

/** Ein Artikel, der drei von drei Begriffen enthält, ist verlässlicher als
 *  einer, der einen davon dreimal nennt. */
function deckung(treffer, anzahlTerme) {
  if (!anzahlTerme) return 1;
  return 0.55 + (0.45 * (treffer / anzahlTerme));
}

/** Artikelweise Suche. Liefert die besten Treffer mit Bewertung. */
export function sucheArtikel(bestand, frage, grenze = 12) {
  if (normalisiere(frage).trim().length < 2) return [];
  const terme = suchBegriffe(frage);
  const kandidaten = bestand || [];
  const w = gewichte(kandidaten, terme);
  const fahrzeug = fahrzeugAbsicht(frage);

  return kandidaten
    .map((e) => {
      const f = felder(e);
      let punkte = 0;
      let treffer = 0;
      for (const term of terme) {
        if (!f.alles.includes(term)) continue;
        treffer += 1;
        const g = w.get(term) || 1;
        if (f.titel.includes(term)) punkte += 12 * g;
        if (f.slug.includes(term)) punkte += 10 * g;
        if (f.ueberschriften.includes(term)) punkte += 6 * g;
        if (f.boost.includes(term)) punkte += 9 * g;
        if (f.schlagworte.includes(term)) punkte += 4 * g;
        if (f.auszug.includes(term)) punkte += 2 * g;
        else if (f.text.includes(term)) punkte += 1 * g;
      }
      punkte *= deckung(treffer, terme.length);
      punkte += treffer * treffer;
      if (punkte > 0 && PDF_TYPEN.has(e.articleType)) punkte *= PDF_FAKTOR;
      if (punkte > 0 && e.articleType === "vehicle" && !fahrzeug) punkte *= FAHRZEUG_FAKTOR;
      return { ...e, punkte };
    })
    .filter((e) => e.punkte > 0)
    .sort((a, b) => b.punkte - a.punkte || a.title.localeCompare(b.title, "de"))
    .slice(0, grenze);
}

/** Abschnittsweise Suche (H2/H3 statt ganzer Artikel).
 *
 *  Sie findet Unterthemen, die im Artikel-Scoring von einem dominanten
 *  Produktnamen verdrängt werden: "Zusatzhupe an Pin ..." steht in einem
 *  Abschnitt von sirenen-hupen, nicht im Top-Artikel wipro-iii. Für THI im
 *  Campus liefert sie ausserdem den kürzeren, präziseren Textausschnitt —
 *  ein ganzer Artikel im Kontext verwässert die Antwort eher, als dass er
 *  hilft. */
export function sucheAbschnitte(bestand, frage, grenze = 6) {
  if (normalisiere(frage).trim().length < 2) return [];
  const terme = suchBegriffe(frage);
  const kandidaten = bestand || [];
  const w = gewichte(kandidaten, terme);
  const fahrzeug = fahrzeugAbsicht(frage);

  return kandidaten
    .map((s) => {
      const f = felder(s);
      let punkte = 0;
      let treffer = 0;
      for (const term of terme) {
        if (!f.alles.includes(term)) continue;
        treffer += 1;
        const g = w.get(term) || 1;
        if (f.ueberschrift.includes(term)) punkte += 14 * g;
        if (f.slug.includes(term)) punkte += 9 * g;
        if (f.titel.includes(term)) punkte += 5 * g;
        if (f.text.includes(term)) punkte += 1.5 * g;
      }
      punkte *= deckung(treffer, terme.length);
      punkte += treffer * treffer;
      if (punkte > 0 && PDF_TYPEN.has(s.articleType)) punkte *= PDF_FAKTOR;
      if (punkte > 0 && s.articleType === "vehicle" && !fahrzeug) punkte *= FAHRZEUG_FAKTOR;
      if (punkte > 0 && !s.anchor) punkte *= INTRO_FAKTOR;
      return { ...s, punkte };
    })
    .filter((s) => s.punkte > 0)
    .sort((a, b) => b.punkte - a.punkte || (b.heading?.length || 0) - (a.heading?.length || 0))
    .slice(0, grenze);
}

/** Wählt für einen gefundenen Artikel den zur Frage passendsten Abschnitt.
 *  Damit bekommt ein artikelweiser Treffer eine präzise Fundstelle, auf die
 *  THI im Text verweisen kann ("siehe Abschnitt Batterie"). */
export function besterAbschnitt(abschnittsBestand, route, frage) {
  const terme = suchBegriffe(erweitere(frage));
  if (!terme.length) return null;
  const kandidaten = (abschnittsBestand || []).filter((s) => s.route === route);
  const w = gewichte(kandidaten, terme);
  let bestMitAnker = null;
  let bestUeberhaupt = null;
  for (const s of kandidaten) {
    const f = felder(s);
    let punkte = 0;
    let treffer = 0;
    for (const term of terme) {
      if (!f.ueberschrift.includes(term) && !f.text.includes(term)) continue;
      treffer += 1;
      const g = w.get(term) || 1;
      if (f.ueberschrift.includes(term)) punkte += 12 * g;
      if (f.text.includes(term)) punkte += 1.5 * g;
    }
    if (punkte <= 0) continue;
    punkte *= deckung(treffer, terme.length);
    punkte += treffer * treffer;
    const t = { anchor: s.anchor, heading: s.heading, headingPath: s.headingPath, body: s.body, punkte };
    if (!bestUeberhaupt || punkte > bestUeberhaupt.punkte) bestUeberhaupt = t;
    if (s.anchor && (!bestMitAnker || punkte > bestMitAnker.punkte)) bestMitAnker = t;
  }
  return bestMitAnker || bestUeberhaupt;
}

/* Der Fundort eines Begriffs muss vom normalisierten Text auf den Originaltext
   zurückgerechnet werden: die Normalisierung ändert die Länge ("ä" → "ae"). */
function originalIndex(text, normIndex) {
  let verbraucht = 0;
  for (let i = 0; i < text.length; i++) {
    verbraucht += normalisiere(text[i]).length;
    if (verbraucht > normIndex) return i;
  }
  return text.length;
}

/** Schneidet ein Textfenster UM die Fundstelle statt stur vom Artikelanfang.
 *  Ein Ausschnitt ab Zeichen 0 zeigt bei langen Artikeln die Einleitung —
 *  die Antwort steht aber meist weiter hinten. */
export function ausschnitt(text, frage, groesse = 800) {
  const t = String(text || "");
  if (t.length <= groesse) return t;
  const norm = normalisiere(t);
  // Der längste Begriff ist der spezifischste und damit der beste Ankerpunkt.
  const terme = begriffe(frage).sort((a, b) => b.length - a.length);
  let fund = -1;
  for (const term of terme) {
    const idx = norm.indexOf(term);
    if (idx >= 0) { fund = idx; break; }
  }
  if (fund < 0) return t.slice(0, groesse);
  const stelle = originalIndex(t, fund);
  let start = Math.max(0, stelle - Math.floor(groesse / 4));
  if (start > 0) {
    const leer = t.indexOf(" ", start);
    if (leer >= 0 && leer < stelle) start = leer + 1;
  }
  const teil = t.slice(start, start + groesse).trim();
  return `${start > 0 ? "… " : ""}${teil}${start + groesse < t.length ? " …" : ""}`;
}

/** Lockere Einzelbegriff-Suche für den Fall, dass die volle Frage nichts
 *  findet. Jeder Begriff sucht für sich, lange zusätzlich als Präfix
 *  ("anlernprozedur" → "anlern"). Besser ein verwandter Artikel als nichts. */
export function verwandteArtikel(bestand, frage, grenze = 3) {
  const terme = begriffe(erweitere(frage)).sort((a, b) => b.length - a.length);
  const nachRoute = new Map();
  for (const term of terme) {
    const proben = term.length >= 8 ? [term, term.slice(0, 6)] : [term];
    for (const probe of proben) {
      for (const treffer of sucheArtikel(bestand, probe, grenze)) {
        const vorher = nachRoute.get(treffer.route);
        if (!vorher || treffer.punkte > vorher.punkte) nachRoute.set(treffer.route, treffer);
      }
      if (nachRoute.size >= grenze * 2) break;
    }
  }
  return [...nachRoute.values()].sort((a, b) => b.punkte - a.punkte).slice(0, grenze);
}
