/* ==========================================================================
   THITRONIK Campus — THI, der Assistent.
   --------------------------------------------------------------------------
   Nimmt die Frage aus dem Browser an, sucht selbst im Wissensbestand und
   fragt das Sprachmodell über Anymize. Antwortet als Textstrom.

   Der API-Schlüssel bleibt hier. Er steht in den Netlify-Umgebungsvariablen
   und erreicht den Browser nie — deshalb überhaupt eine Function und kein
   Aufruf aus der Seite heraus.

   UNTERSCHIED ZUM STANDALONE-ENTWURF (thi-standalone/):

   1. Das Retrieval läuft vollständig hier. Im Entwurf lädt der Browser die
      Suchindizes und sucht selbst vor. Das wären im Campus rund 3 MB
      Download vor der ersten Frage — im Hallen-WLAN, auf Telefonen, für eine
      Funktion, die viele gar nicht oeffnen.

   2. Keine Verweise ins Wiki. Der Campus hat kein Wiki, also gibt es nichts
      zu verlinken. THI nennt Artikel und Abschnitt im Fließtext ("steht im
      Abschnitt Batterie"), damit die Aussage nachvollziehbar bleibt.

   3. Keine Rollen. Der Bestand ist beim Bau auf die Händler-Fassung
      reduziert (tools/thi-wissen-bauen.js) — es gibt hier keinen internen
      Text, der versehentlich herausgehen könnte.

   Netlify-Function im v2-Format (Web-API), weil das Streaming ermöglicht.
   Die übrigen Functions des Campus sind v1 — beide Formate dürfen
   nebeneinander im selben Ordner liegen, Netlify erkennt sie am Export.
   ========================================================================== */

import {
  sucheArtikel, sucheAbschnitte, besterAbschnitt, sucheAnfrage,
  ausschnitt, verwandteArtikel, normalisiere
} from "./thi-lib/suche.mjs";
import { campusWissen } from "./thi-lib/campus-wissen.mjs";

/* STATISCHER Import mit Typangabe — und zwar genau so, nicht anders.
   Nachgeprüft am echten Netlify-Bundler (zip-it-and-ship-it):

   Diese Datei ist ESM (.mjs). Netlify verpackt ESM-Functions nicht mit
   esbuild, sondern mit nft (Node File Trace): nft bündelt nicht, es verfolgt
   die Importe und kopiert die gefundenen Dateien ins Paket. Verfolgt werden
   dabei nur STATISCHE Importe.

   Ein `createRequire(import.meta.url)` mit require("./…json") — wie es
   submit-quiz.js als CommonJS-Function benutzt — bleibt hier als
   Laufzeitaufruf stehen. Die JSON-Dateien landen dann NICHT im Paket, und die
   Function stirbt beim ersten Aufruf mit MODULE_NOT_FOUND. Im lokalen
   Entwicklungsserver fällt das nicht auf, weil der die Originaldatei lädt.

   `with { type: "json" }` funktioniert in beiden Welten: nft und esbuild
   nehmen die Datei mit, und Node lädt sie ohne Bundling direkt. Die
   Typangabe ist für Node dabei Pflicht. */
import ARTIKEL from "./thi-wissen/artikel.de.json" with { type: "json" };
import ABSCHNITTE from "./thi-wissen/abschnitte.de.json" with { type: "json" };
import INSELN from "../../public/data/inseln.json" with { type: "json" };

/* Wiki-Artikel und Campus-Seiten in einem Bestand: THI soll auf "Wie läuft
   der Wissenscheck ab?" und "Wie lerne ich einen Magnetkontakt an?" mit
   derselben Suche antworten. */
const BESTAND = [...ARTIKEL, ...campusWissen(INSELN)];

// ------------------------------------------------------- Konfiguration ------

const ANBIETER = (process.env.THI_PROVIDER || "anymize").toLowerCase();
const ANYMIZE_URL = process.env.ANYMIZE_API_URL || process.env.Anymize_API_URL || "";
const ANYMIZE_KEY = process.env.ANYMIZE_API_KEY || process.env.Anymize_API_KEY || "";
const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY || "";
const MODELL = process.env.THI_MODEL || "anthropic/claude-sonnet-4.6";

/* Zahlen aus Umgebungsvariablen nie ungeprüft übernehmen. `Number()` macht
   aus einem Tippfehler NaN; jeder spätere Vergleich dagegen ist false und
   würde gerade die Missbrauchsbremse lautlos abschalten. Auch Schreibweisen
   wie "1.000" sind hier kein Tausenderwert und deshalb bewusst ungültig. */
function positiveGanzeZahl(name, vorgabe) {
  const roh = process.env[name];
  if (roh === undefined || roh === "") return vorgabe;
  const text = String(roh).trim();
  const wert = /^\d+$/.test(text) ? Number(text) : NaN;
  if (!Number.isSafeInteger(wert) || wert < 1) {
    console.warn(`${name} ist ungültig; THI verwendet den Vorgabewert ${vorgabe}.`);
    return vorgabe;
  }
  return wert;
}

/* Werkzeuge: THI schlägt bei Bedarf selbst nach, statt nur den vorab
   eingefügten Kontext zu nutzen. Nur bei Anymize — dort ist Function-Calling
   im Entwurf verifiziert worden. THI_TOOLS=false schaltet auf den reinen
   Streaming-Pfad zurueck, falls der Anbieter das Format ändert. */
const WERKZEUGE_AN =
  ANBIETER === "anymize" &&
  String(process.env.THI_TOOLS ?? "true").toLowerCase() !== "false";
const MAX_RUNDEN = positiveGanzeZahl("THI_TOOL_HOPS", 3);

/* Zeitgrenze für die Werkzeugrunden. Netlify bricht eine Function nach
   60 Sekunden ab — dann steht der Teilnehmer ohne Antwort da, obwohl das
   Modell bereits dreimal nachgeschlagen hat. Ab dieser Frist wird deshalb
   keine weitere Werkzeugrunde mehr angeboten: das Modell muss dann mit dem
   antworten, was es hat. Lieber eine Antwort aus unvollständigem Kontext als
   ein Abbruch nach einer Minute Wartezeit. */
const FRIST_MS = Math.max(5000, positiveGanzeZahl("THI_ZEITBUDGET_MS", 40000));

/* Missbrauchsbremsen. Der Campus hat keine Anmeldung — ohne diese Grenzen
   wäre die Function ein offener Zugang zu einem kostenpflichtigen Modell.

   EINSCHRÄNKUNG, die man kennen muss: Die Zähler leben im Arbeitsspeicher
   der jeweiligen Function-Instanz. Netlify startet unter Last mehrere davon,
   und jede zählt für sich. Das Tageslimit ist damit eine Notbremse gegen
   eine entlaufene Schleife, keine belastbare Kostenobergrenze. Wer die
   braucht, setzt sie im Anymize-Konto. */
const FENSTER_MS = 5 * 60 * 1000;
const PRO_IP = positiveGanzeZahl("THI_RATE_LIMIT", 30);
const PRO_TAG = positiveGanzeZahl("THI_DAILY_LIMIT", 1000);
const VERTRAUTE_PROXY_HOPS = positiveGanzeZahl("THI_TRUSTED_PROXIES", 1);
const MAX_NACHRICHTEN = 24;
const MAX_ZEICHEN = 4000;

const SUPPORT = "+49 (0)4351 76744-112";

// ------------------------------------------------------- Systemanweisung ----

/* Die Anweisung ist aus dem Entwurf übernommen und an zwei Stellen geändert:
   die Quellen-Zeile mit Wiki-Pfaden ist weg (es gibt keine Wiki-Seiten, auf
   die sie zeigen könnte), und der Campus-Teil ist dazugekommen. Die
   Verhaltensregeln selbst bleiben — sie sind gegen echte Händlerfragen
   eingestellt worden. */
const HALTUNG = `Du bist **THI**, der Assistent des THITRONIK Campus.

Du hilfst Händlern, Monteuren und Verkäufern während der Campus-Schulung.
Zwei Arten von Fragen kommen vor:

1. PRODUKTFRAGEN — Funk-Alarmanlage WiPro III und Zubehör, Gaswarner der
   G.A.S.-Reihe, Pro-Finder GPS-Ortung, Bedienung über App, Handsender und
   NFC, Einbau im Fahrzeug, Fehlersuche.
2. CAMPUSFRAGEN — Ablauf des Tages, die sieben Inseln, Wissenscheck,
   Arbeitskarte, Feedbackbogen.

Verhaltensregeln:

- IDENTITÄT: Dein Name ist THI. Wenn du nach deinem Namen oder deiner Rolle
  gefragt wirst, stellst du dich als THI, Assistent des THITRONIK Campus, vor.
- Antworte auf Deutsch: präzise, freundlich, fachlich korrekt und so knapp
  wie möglich. Du sprichst mit Fachleuten, nicht mit Endkunden.
- WORTLAUT SCHLÄGT ANNAHME: Eine ausdrückliche Aussage im Kontext
  ("Standalone immer nutzbar", "auch ohne WiPro verwendbar", "nicht kompatibel
  mit ...") hat IMMER Vorrang vor dem Produktnamen, dem Artikeltitel
  ("... für WiPro III") oder deinem Vorwissen. Schliesse NIEMALS von einer
  Produktkategorie (Zubehör, "für X") auf eine zwingende Voraussetzung, wenn
  der Text das nicht ausdrücklich sagt. Bei Voraussetzungs- und
  Kompatibilitätsfragen zitiere die belegende Stelle kurz.
- ERFINDE NICHTS. Keine Artikelnummern, DIP-Stellungen, Pinbelegungen,
  Anschlusspläne oder Masse, die nicht im Kontext stehen.
- LENKE DAS GESPRÄCH: Hängt eine präzise Antwort an Angaben, die noch
  fehlen — Fahrzeugmodell, Baujahr, Seriennummer beziehungsweise Softwarestand,
  verbaute THITRONIK-Produkte, Einbauzeitpunkt, genaues Fehlerbild, oder die
  Produktvariante (WiPro III gegen WiPro III safe.lock, G.A.S.-pro gegen
  G.A.S.-pro III) — dann stelle ZUERST genau eine kurze Rückfrage nach dieser
  Angabe, statt zu raten oder alle Varianten aufzuzählen. Frage nur nach dem,
  was wirklich fehlt: eine Angabe, höchstens zwei. Liegt sie vor, antworte
  konkret.
- SUPPORT STATT RATEN: Steht die Antwort nicht im Kontext oder nur unsicher,
  sage ehrlich, dass du dazu nichts Gesichertes findest, und verweise auf den
  THITRONIK-Support: ${SUPPORT}. Dasselbe bei sicherheitskritischer
  Unsicherheit.
- FUNDSTELLE NENNEN: Sage im Fließtext, worauf sich deine Antwort stützt —
  "steht im Abschnitt Batterie des WiPro-III-Artikels". Gib KEINE Pfade, URLs
  oder Links aus und hänge KEINE Quellenliste an: der Campus hat keine
  Wiki-Seiten, auf die sie zeigen könnten.
- FOLGEFRAGEN: Gibt es sinnvolle nächste Schritte, schliesse ganz am Ende mit
  ein bis zwei kurzen, klickbaren Folgefragen im exakten Format ab:
  [[FOLGEFRAGEN: Erste Frage? | Zweite Frage?]]
  Keine Folgefragen bei einer reinen Rückfrage oder wenn du nichts gefunden
  hast.
- Strukturiere längere Antworten mit kurzen Aufzählungen.
- Bei sicherheitsrelevanten Themen (Scharf- und Unscharfschalten, Gaswarnung,
  Diebstahlschutz, Abschalteinrichtung) arbeite besonders sorgfältig und weise
  auf Risiken hin, wenn der Kontext dazu Angaben macht.
- PRÜFUNGSFRAGEN: Fragt jemand nach der Lösung einer Wissenscheck-Frage, gib
  sie nicht heraus. Erkläre stattdessen das Thema, damit die Antwort selbst
  gefunden werden kann.
- Ist keine Frage erkennbar, bitte freundlich um eine konkrete Frage.`;

const HALTUNG_WERKZEUGE = `${HALTUNG}

Du hast zwei Werkzeuge:
- wiki_suchen(query): durchsucht den THITRONIK-Wissensbestand inklusive
  Anleitungen und FAQ sowie die Campus-Seiten.
- artikel_lesen(route): liest einen gefundenen Eintrag im Volltext.

Wann du sie nutzt:
- Der <kontext>-Block enthält bereits vorab gesuchte Auszüge. Reicht er nur
  für eine unsichere oder unvollständige Antwort, suche nach.
- VORAUSSETZUNGS-, JA-NEIN-, KOMPATIBILITÄTS- UND DETAILFRAGEN ("Brauche ich
  X für Y?", "Geht Y ohne X?", "Welche ... ausschliesslich / nicht empfohlen /
  Ausnahme?", konkrete Werte, Pins, Mengen): Verlass dich NICHT auf den kurzen
  Auszug. Die entscheidende Aussage steht oft in einem späteren Abschnitt,
  einer Tabelle oder im FAQ. Lies den relevantesten Artikel ZUERST mit
  artikel_lesen im Volltext und zitiere die belegende Stelle kurz wörtlich,
  bevor du Ja oder Nein sagst.
- KEINE-ANGABE-FALLE: Bevor du behauptest, der Bestand sage zu etwas nichts —
  zu einer empfohlenen oder ausdrücklich nicht empfohlenen Marke, einer
  Ausnahme, einem Detailwert —, lies den relevantesten Artikel im Volltext.
  Solche Angaben stehen häufig in Tabellen, Hinweiskästen oder im FAQ. Erst
  wenn sie dort wirklich fehlt, sage das.
- Lieber ein- bis zweimal gezielt nachschlagen als raten.`;

// -------------------------------------------------------------- Werkzeuge --

const WERKZEUG_DEFINITIONEN = [
  {
    type: "function",
    function: {
      name: "wiki_suchen",
      description:
        "Durchsucht den THITRONIK-Wissensbestand (Wiki, Bedienungsanleitungen, FAQ) " +
        "und die Campus-Seiten. Liefert die besten Treffer mit Titel und Textauszug. " +
        "Suche in Fachbegriffen (z. B. \"Fehlalarm Erschütterungssensor\") statt in " +
        "ganzen Sätzen; bei keinem Treffer mit anderen Begriffen erneut versuchen.",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string", description: "Suchbegriffe, deutsch, 2 bis 6 Wörter" }
        },
        required: ["query"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "artikel_lesen",
      description:
        "Liest einen Eintrag im Volltext. Die Kennung aus wiki_suchen oder dem " +
        "<kontext>-Block übergeben, z. B. \"/de/wipro-iii\".",
      parameters: {
        type: "object",
        properties: {
          route: { type: "string", description: "Kennung des Eintrags" }
        },
        required: ["route"]
      }
    }
  }
];

const MAX_WERKZEUG_ZEICHEN = 16000;
const TREFFER = 6;
const AUSZUG_ZEICHEN = 1000;

function fuehreSuche(args) {
  const frage = String(args?.query || "").trim();
  if (frage.length < 2) return "Fehler: query fehlt oder ist zu kurz.";
  const treffer = sucheArtikel(BESTAND, sucheAnfrage(frage), TREFFER);
  if (!treffer.length) {
    return `Keine Treffer für "${frage}". Versuche andere Begriffe: Produktname, Bauteil, Symptom.`;
  }
  const text = treffer.map((t, i) => {
    const abschnitt = besterAbschnitt(ABSCHNITTE, t.route, frage);
    const marke = abschnitt?.headingPath ? ` — Abschnitt: ${abschnitt.headingPath}` : "";
    const auszug = ausschnitt(t.body || t.excerpt || "", frage, AUSZUG_ZEICHEN)
      .replace(/\s+/g, " ").trim();
    return `[${i + 1}] ${t.title}${marke} (${t.route})\n${auszug}`;
  }).join("\n\n");
  return text.slice(0, MAX_WERKZEUG_ZEICHEN);
}

function fuehreLesen(args) {
  const gesucht = String(args?.route || "").trim();
  if (!gesucht) return "Fehler: route fehlt.";
  const schluessel = (v) => normalisiere(String(v || "")).replace(/\s+/g, "");
  const eintrag = BESTAND.find(
    (e) => e.route === gesucht
      || schluessel(e.route) === schluessel(gesucht)
      || (e.slug && schluessel(e.slug) === schluessel(gesucht))
  );
  if (!eintrag) {
    // Statt einer Sackgasse drei Alternativen anbieten — sonst gibt das Modell
    // an dieser Stelle oft auf, obwohl der passende Artikel existiert.
    const nahe = sucheArtikel(BESTAND, sucheAnfrage(gesucht.replace(/[/?=-]+/g, " ")), 3)
      .map((t) => `- ${t.title} (${t.route})`).join("\n");
    return `Kein Eintrag unter "${gesucht}".${nahe ? `\nÄhnliche Einträge:\n${nahe}` : ""}`;
  }
  const text = String(eintrag.body || eintrag.excerpt || "").trim();
  const kopf = `${eintrag.title} (${eintrag.route})${eintrag.updated ? ` — Stand ${eintrag.updated}` : ""}`;
  const gliederung = ABSCHNITTE
    .filter((s) => s.route === eintrag.route && s.anchor)
    .slice(0, 30)
    .map((s) => `- ${s.headingPath || s.heading}`)
    .join("\n");
  const block = gliederung ? `\n\nAbschnitte:\n${gliederung}` : "";
  if (!text) return `${kopf}${block}\n(Zu diesem Eintrag liegt kein Textauszug vor.)`;
  return `${kopf}${block}\n\n${text}`.slice(0, MAX_WERKZEUG_ZEICHEN);
}

/** Führt einen Werkzeugaufruf aus. Wirft nie — ein Fehler kommt als Text
 *  zurueck, damit das Modell damit umgehen kann und der Strom nicht abreisst. */
function fuehreWerkzeug(name, rohArgs) {
  let args = {};
  try {
    args = typeof rohArgs === "string" ? JSON.parse(rohArgs || "{}") : (rohArgs || {});
  } catch {
    return `Fehler: Argumente für ${name} waren kein gültiges JSON.`;
  }
  try {
    if (name === "wiki_suchen") return fuehreSuche(args);
    if (name === "artikel_lesen") return fuehreLesen(args);
    return `Fehler: Unbekanntes Werkzeug "${name}".`;
  } catch (fehler) {
    console.error(`[thi] Werkzeug ${name} fehlgeschlagen:`, fehler);
    return `Fehler: ${name} ist intern fehlgeschlagen.`;
  }
}

// ------------------------------------------------------------- Retrieval ----

/** Sucht vorab, was zur Frage passt, und baut daraus den Kontextblock.
 *
 *  Zwei Wege gleichzeitig: abschnittsweise (präzise Fundstellen) und
 *  artikelweise (der ganze Zusammenhang). Abschnitte stehen vorn, weil ein
 *  passender Abschnitt fast immer besser antwortet als ein ganzer Artikel;
 *  die Artikel füllen auf, damit benachbarte Fakten nicht fehlen. */
function baueKontext(frage, fruehereFragen) {
  const anfrage = sucheAnfrage(frage, fruehereFragen);
  const abschnitte = sucheAbschnitte(ABSCHNITTE, anfrage, 4);
  const artikel = sucheArtikel(BESTAND, anfrage, 4);

  const teile = [];
  const gesehen = new Set();

  for (const a of abschnitte) {
    const marke = a.headingPath || a.heading || "";
    teile.push({
      titel: `${a.title}${marke ? ` — Abschnitt: ${marke}` : ""}`,
      route: a.route,
      text: String(a.body || "").slice(0, 2500)
    });
    gesehen.add(`${a.route}#${a.anchor || ""}`);
  }

  for (const t of artikel) {
    if (gesehen.has(`${t.route}#`)) continue;
    teile.push({
      titel: t.title,
      route: t.route,
      // Die beiden besten Artikel mit mehr Text: benachbarte Fakten
      // ("empfohlen: Panasonic" / "nicht empfohlen: Duracell") dürfen nicht
      // durch ein zu kurzes Fenster auseinandergeschnitten werden.
      text: ausschnitt(t.body || t.excerpt || "", anfrage, teile.length < 2 ? 6000 : 2500)
    });
    gesehen.add(`${t.route}#`);
  }

  if (!teile.length) {
    // Nichts gefunden: lockere Einzelbegriff-Suche als letzter Versuch. Die
    // Treffer werden als solche gekennzeichnet, damit THI sie nicht als
    // direkte Antwort ausgibt.
    for (const t of verwandteArtikel(BESTAND, anfrage, 3)) {
      teile.push({
        titel: `${t.title} (verwandter Eintrag, kein direkter Treffer)`,
        route: t.route,
        text: ausschnitt(t.body || t.excerpt || "", anfrage, 1500)
      });
    }
  }

  if (!teile.length) return "";
  const text = teile
    .map((t, i) => `[${i + 1}] ${t.titel}\n${t.text}`)
    .join("\n\n");
  return `<kontext>\n${text}\n</kontext>`;
}

// ------------------------------------------------------------- Anbieter -----

async function anymizeAufruf(schluessel, nachrichten, { werkzeuge } = {}) {
  const antwort = await fetch(ANYMIZE_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${schluessel}`, "content-type": "application/json" },
    body: JSON.stringify({
      model: MODELL,
      max_tokens: 4096,
      messages: nachrichten,
      ...(werkzeuge ? { tools: werkzeuge, tool_choice: "auto" } : {})
    })
  });
  if (!antwort.ok) {
    const detail = await antwort.text().catch(() => "");
    throw new Error(`anymize ${antwort.status}: ${detail.slice(0, 300)}`);
  }
  return antwort.json();
}

const WERKZEUG_STATUS = {
  wiki_suchen: "Durchsucht den Wissensbestand …",
  artikel_lesen: "Liest den passenden Artikel …"
};

/** Werkzeugschleife: lässt das Modell nachschlagen, bis es antworten kann.
 *
 *  Anymize-Besonderheit, im Entwurf live festgestellt: der llm-anonymous-
 *  Endpunkt lehnt Nachrichten mit role:"tool" mit 400 ab. Die Ergebnisse
 *  gehen deshalb als user-Nachricht mit Präfix zurueck; die
 *  assistant-Nachricht behält ihr tool_calls-Feld. */
async function werkzeugSchleife(schluessel, basis, aufStatus) {
  const nachrichten = [...basis];
  const beginn = Date.now();
  for (let runde = 0; ; runde++) {
    // Zwei Gründe, keine Werkzeuge mehr anzubieten: die Rundenzahl ist
    // erreicht, oder die Frist läuft ab (siehe FRIST_MS). In beiden Fällen
    // muss das Modell in diesem Aufruf antworten.
    const nochWerkzeuge = runde < MAX_RUNDEN && (Date.now() - beginn) < FRIST_MS;
    if (aufStatus) aufStatus(runde === 0 ? "Denkt nach …" : "Wertet die Treffer aus …");
    const daten = await anymizeAufruf(schluessel, nachrichten, {
      werkzeuge: nochWerkzeuge ? WERKZEUG_DEFINITIONEN : null
    });
    const nachricht = daten?.choices?.[0]?.message || {};
    const aufrufe = Array.isArray(nachricht.tool_calls) ? nachricht.tool_calls : [];

    if (nochWerkzeuge && aufrufe.length) {
      if (aufStatus) aufStatus(WERKZEUG_STATUS[aufrufe[0]?.function?.name] || "Schlägt nach …");
      nachrichten.push({ role: "assistant", content: nachricht.content || "", tool_calls: aufrufe });
      const bloecke = aufrufe.map((a) => {
        const name = a.function?.name || "";
        const roh = a.function?.arguments || "{}";
        return `[WERKZEUG-ERGEBNIS ${name}(${roh})]\n${fuehreWerkzeug(name, roh)}`;
      });
      nachrichten.push({
        role: "user",
        content: `${bloecke.join("\n\n---\n\n")}\n\nNutze diese Ergebnisse. Beantworte jetzt die ursprüngliche Frage, oder rufe bei Bedarf gezielt ein weiteres Werkzeug auf.`
      });
      continue;
    }
    return String(nachricht.content || "").trim();
  }
}

/* Der Weg mit Werkzeugen kann nicht wirklich streamen — das Modell antwortet
   erst, nachdem es nachgeschlagen hat. Statt einer stillen Wartezeit gehen
   währenddessen Statusmarker heraus; der Browser zeigt sie als Zeile an. Der
   Antworttext folgt in Stücken. Statustext enthält nie eckige Klammern. */
function werkzeugStrom(schluessel, basis) {
  const codierer = new TextEncoder();
  const STUECK = 80;
  return new ReadableStream({
    async start(steuerung) {
      const status = (t) => {
        try { steuerung.enqueue(codierer.encode(`[[STATUS:${t}]]`)); } catch { /* Strom zu */ }
      };
      try {
        const antwort = await werkzeugSchleife(schluessel, basis, status);
        const text = antwort
          || `Dazu habe ich leider keine gesicherte Antwort gefunden. Bitte wende dich an den THITRONIK-Support: ${SUPPORT}.`;
        for (let i = 0; i < text.length; i += STUECK) {
          steuerung.enqueue(codierer.encode(text.slice(i, i + STUECK)));
        }
      } catch (fehler) {
        console.error("[thi] Werkzeugschleife fehlgeschlagen:", fehler);
        steuerung.enqueue(codierer.encode(
          `Beim Nachschlagen ist ein Fehler aufgetreten. Bitte versuche es erneut oder wende dich an den THITRONIK-Support: ${SUPPORT}.`
        ));
      } finally {
        try { steuerung.close(); } catch { /* schon zu */ }
      }
    }
  });
}

// ---------------------------------------------------------------- Schutz ----

const ipTreffer = new Map();
let tag = { anzahl: 0, datum: new Date().toDateString() };

function clientIp(anfrage) {
  /* X-Forwarded-For ist vom Client setzbar: wer will, stellt beliebige Werte
     voran und umgeht so das Limit. Vertrauenswürdige Proxys hängen die echte
     Verbindungs-IP RECHTS an — also von rechts zählen, nicht den ersten
     Eintrag nehmen. Netlify setzt genau einen Hop. */
  const xff = anfrage.headers.get("x-forwarded-for");
  if (xff) {
    const teile = xff.split(",").map((s) => s.trim()).filter(Boolean);
    if (teile.length) {
      const idx = teile.length - VERTRAUTE_PROXY_HOPS;
      return teile[idx >= 0 ? idx : teile.length - 1];
    }
  }
  return anfrage.headers.get("x-nf-client-connection-ip")
    || anfrage.headers.get("x-real-ip")
    || "unbekannt";
}

function limitGeprueft(anfrage) {
  const heute = new Date().toDateString();
  if (tag.datum !== heute) tag = { anzahl: 0, datum: heute };
  if (tag.anzahl >= PRO_TAG) return "tag";

  const ip = clientIp(anfrage);
  const jetzt = Date.now();
  const eintrag = ipTreffer.get(ip);
  if (!eintrag || jetzt > eintrag.bis) {
    ipTreffer.set(ip, { anzahl: 1, bis: jetzt + FENSTER_MS });
  } else {
    eintrag.anzahl += 1;
    if (eintrag.anzahl > PRO_IP) return "ip";
  }
  tag.anzahl += 1;

  if (ipTreffer.size > 5000) {
    for (const [k, v] of ipTreffer) if (jetzt > v.bis) ipTreffer.delete(k);
  }
  return null;
}

function gleicheHerkunft(anfrage) {
  const herkunft = anfrage.headers.get("origin");
  /* Der Browser setzt Origin bei diesem POST. Fehlt der Kopf, stammt die
     Anfrage aus keinem normalen Campus-Seitenaufruf und wird abgewiesen —
     sonst wäre die Function per curl ein offener, kostenpflichtiger Zugang. */
  if (!herkunft) return false;
  try {
    return new URL(herkunft).host === anfrage.headers.get("host");
  } catch {
    return false;
  }
}

function json(status, koerper) {
  return new Response(JSON.stringify(koerper), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
  });
}

// ----------------------------------------------------------------- Ablauf ---

export default async function handler(anfrage) {
  if (anfrage.method !== "POST") {
    return json(405, { fehler: "methode", meldung: "Nur POST." });
  }
  if (!gleicheHerkunft(anfrage)) {
    return json(403, { fehler: "herkunft", meldung: "Ungültige Herkunft." });
  }

  const gebremst = limitGeprueft(anfrage);
  if (gebremst) {
    return json(429, {
      fehler: "limit",
      meldung: gebremst === "tag"
        ? "Das Tageslimit für THI-Anfragen ist erreicht. Bitte später erneut versuchen."
        : "Zu viele Anfragen in kurzer Zeit — bitte einen Moment warten."
    });
  }

  /* Ohne Schlüssel läuft die Oberfläche weiter und meldet klar, was fehlt.
     Das ist der Zustand vor Schritt 2 — die Seite soll dabei nicht kaputt
     aussehen, sondern erklären. */
  const schluessel = ANBIETER === "anymize" ? ANYMIZE_KEY : ANTHROPIC_KEY;
  if (!schluessel) {
    return json(503, {
      fehler: "kein_schluessel",
      meldung: ANBIETER === "anymize"
        ? "THI ist noch nicht aktiviert: In den Netlify-Umgebungsvariablen fehlt ANYMIZE_API_KEY."
        : "THI ist noch nicht aktiviert: In den Netlify-Umgebungsvariablen fehlt ANTHROPIC_API_KEY."
    });
  }
  if (ANBIETER === "anymize" && !ANYMIZE_URL) {
    return json(503, {
      fehler: "keine_adresse",
      meldung: "THI ist nicht vollständig eingerichtet: ANYMIZE_API_URL fehlt."
    });
  }

  let last;
  try {
    last = await anfrage.json();
  } catch {
    return json(400, { fehler: "anfrage", meldung: "Ungültiger Inhalt." });
  }

  const roh = Array.isArray(last?.nachrichten) ? last.nachrichten : [];
  /* Nur Nutzernachrichten sind Eingabe. Antworten mit rolle:"thi" kommen
     aus einem veränderbaren Browser-Speicher und dürfen deshalb nie wieder
     als vertrauenswürdige assistant-Turns ans Modell gehen. Für Folgefragen
     reichen die vorherigen Nutzerfragen; die sichtbare Unterhaltung bleibt
     davon unberührt im Browser bestehen. */
  const nachrichten = roh
    .filter((n) => n && n.rolle === "nutzer" && typeof n.text === "string" && n.text.trim())
    .map((n) => ({
      role: "user",
      content: n.text.length > MAX_ZEICHEN ? n.text.slice(0, MAX_ZEICHEN) : n.text
    }))
    .slice(-MAX_NACHRICHTEN);

  if (!nachrichten.length || nachrichten[nachrichten.length - 1].role !== "user") {
    return json(400, { fehler: "anfrage", meldung: "Die letzte Nachricht muss vom Nutzer stammen." });
  }

  const letzterIndex = nachrichten.length - 1;
  const frage = nachrichten[letzterIndex].content;
  const fruehere = nachrichten
    .slice(0, letzterIndex)
    .filter((n) => n.role === "user")
    .map((n) => n.content)
    .slice(-3);

  /* Der Kontext hängt an der letzten Nutzernachricht, nicht an der
     Systemanweisung: die bleibt so über alle Anfragen gleich und ist beim
     Anbieter zwischenspeicherbar. */
  const kontext = baueKontext(frage, fruehere);
  nachrichten[letzterIndex] = {
    role: "user",
    content: kontext ? `${kontext}\n\nFrage des Nutzers:\n${frage}` : frage
  };

  const stromKopf = {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Accel-Buffering": "no"
  };

  // --- Weg 1: mit Werkzeugen (Anymize) ------------------------------------
  if (WERKZEUGE_AN) {
    const basis = [{ role: "system", content: HALTUNG_WERKZEUGE }, ...nachrichten];
    return new Response(werkzeugStrom(schluessel, basis), { headers: stromKopf });
  }

  // --- Weg 2: reiner Textstrom --------------------------------------------
  const adresse = ANBIETER === "anymize" ? ANYMIZE_URL : ANTHROPIC_URL;
  const kopfzeilen = ANBIETER === "anymize"
    ? { Authorization: `Bearer ${schluessel}`, "content-type": "application/json" }
    : {
        "x-api-key": schluessel,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json"
      };
  const koerper = ANBIETER === "anymize"
    ? {
        model: MODELL,
        max_tokens: 4096,
        messages: [{ role: "system", content: HALTUNG }, ...nachrichten],
        stream: true
      }
    : {
        model: MODELL,
        max_tokens: 4096,
        system: [{ type: "text", text: HALTUNG, cache_control: { type: "ephemeral" } }],
        messages: nachrichten,
        stream: true
      };

  let oben;
  try {
    oben = await fetch(adresse, { method: "POST", headers: kopfzeilen, body: JSON.stringify(koerper) });
  } catch (fehler) {
    console.error("[thi] Verbindung zum Dienst fehlgeschlagen:", fehler);
    return json(502, { fehler: "dienst", meldung: "Der KI-Dienst ist momentan nicht erreichbar." });
  }

  if (!oben.ok || !oben.body) {
    // Details nur ins Log, nicht zum Browser: sie enthalten Anbieter- und
    // Konfigurationsangaben, die dort nichts zu suchen haben.
    const detail = await oben.text().catch(() => "");
    console.error(`[thi] Dienst antwortete ${oben.status}:`, detail.slice(0, 300));
    return json(oben.status === 401 ? 401 : 502, {
      fehler: "dienst",
      meldung: "Der KI-Dienst ist momentan nicht verfügbar. Bitte später erneut versuchen."
    });
  }

  const strom = new ReadableStream({
    async start(steuerung) {
      const leser = oben.body.getReader();
      const decoder = new TextDecoder();
      const codierer = new TextEncoder();
      let puffer = "";
      try {
        for (;;) {
          const { done, value } = await leser.read();
          if (done) break;
          puffer += decoder.decode(value, { stream: true });
          let nl;
          while ((nl = puffer.indexOf("\n")) >= 0) {
            const zeile = puffer.slice(0, nl).trim();
            puffer = puffer.slice(nl + 1);
            if (!zeile.startsWith("data:")) continue;
            const daten = zeile.slice(5).trim();
            if (!daten || daten === "[DONE]") continue;
            let ereignis;
            try { ereignis = JSON.parse(daten); } catch { continue; }
            const stueck = ANBIETER === "anymize"
              ? ereignis.choices?.[0]?.delta?.content
              : (ereignis.type === "content_block_delta" && ereignis.delta?.type === "text_delta"
                  ? ereignis.delta.text
                  : null);
            if (stueck) steuerung.enqueue(codierer.encode(stueck));
          }
        }
      } catch (fehler) {
        console.error("[thi] Übertragung abgebrochen:", fehler);
      } finally {
        try { steuerung.close(); } catch { /* schon zu */ }
      }
    }
  });

  return new Response(strom, { headers: stromKopf });
}
