/* THITRONIK Campus — Auswertungsendpunkt für Langdock
 *
 * Langdock stellt eine Frage wie "Wie viele Händler haben heute VEJRØ
 * gespielt?" und bekommt aggregierte Zahlen zurück. Rohdaten verlassen die
 * Datenbank nicht: Diese Funktion kann nur die vier `campus_auswertung*`
 * Datenbankfunktionen aufrufen, und die geben Namen, Händlernummern,
 * Session-IDs und Freitexte gar nicht erst heraus.
 *
 * Vier Bereiche über einen Endpunkt, gewählt mit `bereich`:
 *   inseln      Kennzahlen je Schulungsinsel (Vorgabe)
 *   fragen      Trefferquote je Quizfrage
 *   taetigkeit  Verkauf gegen Werkstatt
 *   feedback    Feedbackbogen, aggregiert
 *
 * Der Name der Datenbankfunktion wird nicht aus der Anfrage gebaut, sondern
 * aus einer festen Liste von Endungen an einen festen Stamm gehängt. Ein
 * Bereich, der nicht in der Liste steht, kann deshalb keinen anderen Pfad
 * erzeugen — auch nicht mit einem geschickt gewählten Wert.
 *
 * Eigener Zugangswert statt Supabase-JWT: Der Endpunkt wird mit
 * `verify_jwt = false` ausgerollt und prüft stattdessen ein Bearer-Token aus
 * den Function Secrets. So lässt sich der Langdock-Zugang widerrufen, ohne
 * Projektschlüssel zu tauschen.
 *
 * Der Secret Key des Projekts steht Edge Functions von Haus aus zur
 * Verfügung. Er bleibt in dieser Funktion und geht nie an Langdock.
 */

const INSELN = new Set([
  "vejro", "poel", "hiddensee", "samsoe", "fehmarn", "usedom", "langeland"
]);

const TAG = /^\d{4}-\d{2}-\d{2}$/;

/* Bereich -> Endung an `campus_auswertung`. Der Stamm steht als Literal im
 * Pfad weiter unten; hier stehen ausschliesslich Endungen. Damit ist der
 * erreichbare Namensraum vollständig aufgezählt und nicht erweiterbar.
 *
 * `nimmt_insel` sagt, ob die Funktion einen dritten Parameter hat. Der
 * Feedbackbogen kennt keine Insel: Er wird einmal für den ganzen Tag
 * ausgefüllt, nicht je Station. */
const BEREICHE: Record<string, { endung: string; nimmt_insel: boolean }> = {
  inseln:     { endung: "",             nimmt_insel: true  },
  fragen:     { endung: "_fragen",      nimmt_insel: true  },
  taetigkeit: { endung: "_taetigkeit",  nimmt_insel: true  },
  feedback:   { endung: "_feedback",    nimmt_insel: false }
};

/** Vergleich in konstanter Zeit. Ein `===` auf Zeichenketten bricht beim
 *  ersten Unterschied ab und verrät über die Laufzeit, wie viele Zeichen
 *  stimmen. Bei einem Wert, der über Monate gleich bleibt, ist das kein
 *  theoretischer Einwand. */
function gleich(a: string, b: string): boolean {
  const kodierer = new TextEncoder();
  const x = kodierer.encode(a);
  const y = kodierer.encode(b);
  if (x.length !== y.length) return false;
  let rest = 0;
  for (let i = 0; i < x.length; i++) rest |= x[i] ^ y[i];
  return rest === 0;
}

function antwort(status: number, koerper: unknown): Response {
  return new Response(JSON.stringify(koerper), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
}

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method !== "GET" && req.method !== "POST") {
    return antwort(405, { fehler: "Nur GET und POST." });
  }

  const erwartet = Deno.env.get("CAMPUS_AUSWERTUNG_TOKEN");
  if (!erwartet) {
    console.error("CAMPUS_AUSWERTUNG_TOKEN fehlt in den Function Secrets.");
    return antwort(503, { fehler: "Der Endpunkt ist noch nicht eingerichtet." });
  }

  const kopf = req.headers.get("Authorization") ?? "";
  const gesendet = kopf.startsWith("Bearer ") ? kopf.slice(7).trim() : "";
  if (!gesendet || !gleich(gesendet, erwartet)) {
    // Ohne Grund im Text: Wer das Token errät, soll nicht auch noch erfahren,
    // ob er nah dran war.
    return antwort(401, { fehler: "Kein Zugang." });
  }

  // Parameter kommen als Query (GET) oder als JSON-Rumpf (POST). Langdock
  // kann beides; beides führt hier auf denselben Weg.
  let von: string | null = null;
  let bis: string | null = null;
  let insel: string | null = null;
  let bereich: string | null = null;

  if (req.method === "GET") {
    const q = new URL(req.url).searchParams;
    von = q.get("von");
    bis = q.get("bis");
    insel = q.get("insel");
    bereich = q.get("bereich");
  } else {
    const rumpf = await req.json().catch(() => ({}));
    von = rumpf?.von ?? null;
    bis = rumpf?.bis ?? null;
    insel = rumpf?.insel ?? null;
    bereich = rumpf?.bereich ?? null;
  }

  const gewaehlt = (bereich ?? "").trim().toLowerCase() || "inseln";
  const eintrag = Object.prototype.hasOwnProperty.call(BEREICHE, gewaehlt)
    ? BEREICHE[gewaehlt]
    : undefined;
  if (!eintrag) {
    return antwort(400, {
      fehler: "Unbekannter Bereich.",
      erlaubt: Object.keys(BEREICHE)
    });
  }

  for (const [name, wert] of [["von", von], ["bis", bis]] as const) {
    if (wert !== null && wert !== "" && !TAG.test(wert)) {
      return antwort(400, { fehler: `${name} muss ein Datum im Format JJJJ-MM-TT sein.` });
    }
  }
  if (insel !== null && insel !== "" && !INSELN.has(insel)) {
    return antwort(400, {
      fehler: "Unbekannte Insel.",
      erlaubt: [...INSELN]
    });
  }

  const url = Deno.env.get("SUPABASE_URL");
  const schluessel = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !schluessel) {
    console.error("SUPABASE_URL oder SUPABASE_SERVICE_ROLE_KEY fehlt.");
    return antwort(503, { fehler: "Der Endpunkt ist noch nicht eingerichtet." });
  }

  // Weggelassene Parameter gar nicht erst mitschicken: Dann greifen die
  // Vorgabewerte der Datenbankfunktion, und "heute" wird dort in
  // Europe/Berlin bestimmt statt hier in UTC.
  const parameter: Record<string, string> = {};
  if (von) parameter.von = von;
  if (bis) parameter.bis = bis;
  // Eine Insel an eine Funktion ohne diesen Parameter zu schicken, wäre ein
  // PostgREST-404 auf eine Signatur, die es nicht gibt.
  if (insel && eintrag.nimmt_insel) parameter.insel = insel;

  try {
    const rpc = await fetch(
      `${url.replace(/\/$/, "")}/rest/v1/rpc/campus_auswertung${eintrag.endung}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "apikey": schluessel,
          "Authorization": `Bearer ${schluessel}`
        },
        body: JSON.stringify(parameter)
      }
    );

    if (!rpc.ok) {
      // Nur Status ins Log. PostgREST legt in `details` gern die betroffene
      // Zeile ab — dieselbe Falle wie in submit-quiz (Rückstand R-41).
      console.error("Auswertung abgelehnt:", gewaehlt, rpc.status);
      return antwort(502, { fehler: "Die Auswertung ist nicht verfügbar." });
    }

    return antwort(200, await rpc.json());
  } catch (fehler) {
    console.error("Auswertung fehlgeschlagen:", fehler instanceof Error ? fehler.message : fehler);
    return antwort(502, { fehler: "Die Auswertung ist nicht verfügbar." });
  }
});
