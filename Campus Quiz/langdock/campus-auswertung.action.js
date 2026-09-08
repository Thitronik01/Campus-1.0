/* THITRONIK Campus — Action „Campus-Auswertung abrufen"
 * ==========================================================================
 *
 * Langdock ruft diese Action auf, die Action ruft die Supabase Edge Function
 * `campus-auswertung`, und die ruft eine der vier Datenbankfunktionen. Erst
 * dort werden Rohdaten gelesen. Auf dem Rückweg kommen nur aggregierte
 * Zahlen — Namen, Händlernummern, Session-IDs und Freitexte verlassen die
 * Datenbank nicht.
 *
 * Warum die Action überhaupt Code enthält und nicht bloß ein HTTP-Request
 * ist: Sie übersetzt, was ein Sprachmodell schreibt, in das, was der Endpunkt
 * annimmt. Drei Fälle, alle in echten Gesprächen aufgetreten:
 *
 *   1. Die Antwort nennt eine Insel „SAMSØ" — genau dieser Name kam als
 *      Filter zurück und wurde abgelehnt, weil der Endpunkt „samsoe" will.
 *      Die Schnittstelle brachte dem Modell einen Namen bei, den sie selbst
 *      nicht annahm.
 *   2. „letzte Woche" landete unübersetzt im Datumsfeld und ergab einen 400.
 *   3. Leere Felder mit Platzhaltern: Ein `von=` ohne Wert ist kein Datum.
 *      Weggelassen greifen stattdessen die Vorgabewerte der Datenbank, und
 *      „heute" wird dort in Europe/Berlin bestimmt.
 *
 * Der Zugangswert steht im Auth-Feld `token` der Integration, nicht hier.
 * ========================================================================== */

const ENDPUNKT =
  "https://pstohdeknhgsywmogmiu.supabase.co/functions/v1/campus-auswertung";

const TAG = /^\d{4}-\d{2}-\d{2}$/;

const BEREICHE = {
  inseln: "inseln", insel: "inseln", uebersicht: "inseln", gesamt: "inseln",
  fragen: "fragen", frage: "fragen", quizfragen: "fragen",
  // Zweimal, weil der Normalisierer aus „ä" ein „a" macht und nicht „ae":
  // „Tätigkeit" wird zu tatigkeit, die getippte Ersatzschreibung zu taetigkeit.
  taetigkeit: "taetigkeit", tatigkeit: "taetigkeit",
  taetigkeitsbereich: "taetigkeit", tatigkeitsbereich: "taetigkeit",
  verkauf: "taetigkeit", werkstatt: "taetigkeit",
  feedback: "feedback", feedbackbogen: "feedback", bogen: "feedback"
};

/* Schreibweisen, die aus einem Gespräch zurückkommen. Die Schlüssel sind
 * bereits normalisiert: klein, ohne Sonderzeichen, ø und ö zu o. */
const INSEL_ALIAS = {
  vejro: "vejro", vejroe: "vejro", vejr: "vejro",
  poel: "poel", pol: "poel",
  hiddensee: "hiddensee", hidensee: "hiddensee",
  samsoe: "samsoe", samso: "samsoe",
  fehmarn: "fehmarn", femarn: "fehmarn",
  usedom: "usedom",
  langeland: "langeland", langland: "langeland"
};

const INSELN = ["vejro", "poel", "hiddensee", "samsoe", "fehmarn", "usedom", "langeland"];

function sauber(wert) {
  return typeof wert === "string" ? wert.trim() : "";
}

/* ø und ö fallen auf o, alles Übrige weg. „SAMSØ", „Samsø", „Samsoe" und
 * „Insel Samsø" landen damit auf demselben Schlüssel. */
function normal(wert) {
  return sauber(wert)
    .toLowerCase()
    .replace(/ø/g, "o")
    .replace(/ö/g, "o")
    .replace(/ä/g, "a")
    .replace(/ü/g, "u")
    .replace(/å/g, "a")
    .replace(/æ/g, "ae")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]/g, "");
}

/* Der Kalendertag in Deutschland, nicht der des Langdock-Servers. Ohne die
 * Zeitzone fiele „gestern" für jeden Aufruf vor 02:00 Ortszeit auf den
 * falschen Tag — und genau abends werden die Bögen ausgefüllt. */
function heuteBerlin() {
  try {
    const wert = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Europe/Berlin",
      year: "numeric", month: "2-digit", day: "2-digit"
    }).format(new Date());
    return TAG.test(wert) ? wert : null;
  } catch (fehler) {
    return null;
  }
}

function tagPlus(tag, tage) {
  const teile = tag.split("-").map(Number);
  const d = new Date(Date.UTC(teile[0], teile[1] - 1, teile[2] + tage));
  return d.toISOString().slice(0, 10);
}

function monatsEnde(jahr, monat) {
  return new Date(Date.UTC(jahr, monat, 0)).toISOString().slice(0, 10);
}

/* Montag als Wochenbeginn. getUTCDay() zählt Sonntag als 0. */
function wochenbeginn(tag) {
  const teile = tag.split("-").map(Number);
  const d = new Date(Date.UTC(teile[0], teile[1] - 1, teile[2]));
  const versatz = (d.getUTCDay() + 6) % 7;
  return tagPlus(tag, -versatz);
}

/* Übersetzt eine Angabe in einen Zeitraum. Rückgabe:
 *   { von, bis }            verstanden
 *   null                    Feld war leer
 *   { unklar: "…" }         nicht verstanden — der Aufrufer bricht ab
 *
 * Ein nicht verstandener Zeitraum wird bewusst NICHT stillschweigend
 * übergangen: Er verschiebt jede Zahl der Antwort, ohne dass man es ihr
 * ansieht. Eine nicht verstandene Insel darf dagegen wegfallen, weil in der
 * Antwort dann alle Inseln mit Namen stehen und der Fehler sichtbar bleibt. */
function zeitraumAus(eingabe) {
  const roh = sauber(eingabe);
  if (!roh) return null;

  if (TAG.test(roh)) return { von: roh, bis: roh };

  // TT.MM.JJJJ — die Schreibweise, die ein deutschsprachiges Modell wählt,
  // wenn es das Format nicht ausdrücklich vorgegeben bekommt.
  const deutsch = roh.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
  if (deutsch) {
    const tag = `${deutsch[3]}-${String(deutsch[2]).padStart(2, "0")}-` +
                `${String(deutsch[1]).padStart(2, "0")}`;
    return TAG.test(tag) ? { von: tag, bis: tag } : { unklar: roh };
  }

  const monat = roh.match(/^(\d{4})-(\d{1,2})$/);
  if (monat) {
    const j = Number(monat[1]);
    const m = Number(monat[2]);
    if (m < 1 || m > 12) return { unklar: roh };
    return {
      von: `${j}-${String(m).padStart(2, "0")}-01`,
      bis: monatsEnde(j, m)
    };
  }

  if (/^\d{4}$/.test(roh)) {
    return { von: `${roh}-01-01`, bis: `${roh}-12-31` };
  }

  const wort = normal(roh);
  const heute = heuteBerlin();
  if (!heute) {
    // Ohne verlässliches Datum lieber nachfragen als raten.
    return { unklar: roh };
  }

  if (wort === "heute" || wort === "today" || wort === "jetzt") {
    return { von: heute, bis: heute };
  }
  if (wort === "gestern" || wort === "yesterday") {
    return { von: tagPlus(heute, -1), bis: tagPlus(heute, -1) };
  }
  if (wort === "vorgestern") {
    return { von: tagPlus(heute, -2), bis: tagPlus(heute, -2) };
  }
  if (wort === "diesewoche" || wort === "laufendewoche") {
    return { von: wochenbeginn(heute), bis: heute };
  }
  if (wort === "letztewoche" || wort === "vergangenewoche" || wort === "vorwoche") {
    const montag = tagPlus(wochenbeginn(heute), -7);
    return { von: montag, bis: tagPlus(montag, 6) };
  }
  if (wort === "diesermonat" || wort === "diesenmonat" || wort === "laufendermonat") {
    return { von: `${heute.slice(0, 7)}-01`, bis: heute };
  }
  if (wort === "letztermonat" || wort === "letztenmonat" || wort === "vergangenermonat" ||
      wort === "vormonat") {
    const j = Number(heute.slice(0, 4));
    const m = Number(heute.slice(5, 7));
    const vj = m === 1 ? j - 1 : j;
    const vm = m === 1 ? 12 : m - 1;
    return { von: `${vj}-${String(vm).padStart(2, "0")}-01`, bis: monatsEnde(vj, vm) };
  }
  if (wort === "diesesjahr" || wort === "laufendesjahr") {
    return { von: `${heute.slice(0, 4)}-01-01`, bis: heute };
  }
  if (wort === "letztesjahr" || wort === "vergangenesjahr" || wort === "vorjahr") {
    const j = Number(heute.slice(0, 4)) - 1;
    return { von: `${j}-01-01`, bis: `${j}-12-31` };
  }

  // „letzte 7 tage", „letzten 30 tagen", „seit 14 tagen"
  const spanne = wort.match(/^(?:letzte|letzten|vergangene|vergangenen|seit)(\d{1,3})tage?n?$/);
  if (spanne) {
    const anzahl = Number(spanne[1]);
    if (anzahl >= 1 && anzahl <= 366) {
      return { von: tagPlus(heute, -(anzahl - 1)), bis: heute };
    }
  }

  return { unklar: roh };
}

/* ---------------------------------------------------------------------- */

const hinweise = [];

const bereichRoh = sauber(data.input && data.input.bereich);
const bereich = BEREICHE[normal(bereichRoh)] || "inseln";
if (bereichRoh && !BEREICHE[normal(bereichRoh)]) {
  hinweise.push(
    `Der Bereich "${bereichRoh}" ist unbekannt; ausgewertet wurden die Inseln. ` +
    `Möglich sind: inseln, fragen, taetigkeit, feedback.`
  );
}

const vonFeld = zeitraumAus(data.input && data.input.von);
const bisFeld = zeitraumAus(data.input && data.input.bis);

for (const [name, feld] of [["von", vonFeld], ["bis", bisFeld]]) {
  if (feld && feld.unklar) {
    return {
      fehler: `Das Feld ${name} wurde nicht verstanden: "${feld.unklar}".`,
      erwartet: "ein Datum als JJJJ-MM-TT, ein Monat als JJJJ-MM, ein Jahr als JJJJ, " +
                "oder heute, gestern, diese Woche, letzte Woche, letzter Monat, " +
                "dieses Jahr, letzte 30 Tage"
    };
  }
}

/* Ein Feld darf für sich schon einen ganzen Zeitraum bezeichnen. Steht in
 * `von` „letzter Monat" und `bis` ist leer, ist der Monat gemeint — nicht
 * sein erster Tag bis heute. */
let von = "";
let bis = "";
if (vonFeld && bisFeld) {
  von = vonFeld.von;
  bis = bisFeld.bis;
} else if (vonFeld) {
  von = vonFeld.von;
  bis = vonFeld.bis;
} else if (bisFeld) {
  von = bisFeld.von;
  bis = bisFeld.bis;
}

if (von && bis && bis < von) {
  // Zeichenkettenvergleich genügt: JJJJ-MM-TT sortiert wie ein Datum.
  return { fehler: `Der Zeitraum endet vor seinem Beginn: ${von} bis ${bis}.` };
}

let insel = "";
const inselRoh = sauber(data.input && data.input.insel);
if (inselRoh) {
  const wort = normal(inselRoh).replace(/^(die|der|insel)/, "").replace(/(insel|quiz)$/, "");
  insel = INSEL_ALIAS[normal(inselRoh)] || INSEL_ALIAS[wort] || "";
  if (!insel) {
    // Kein Abbruch: Die Antwort enthält dann alle Inseln mit Namen, der
    // fehlende Filter fällt also auf. Ein Abbruch kostete dagegen eine
    // ganze Gesprächsrunde für einen Tippfehler.
    hinweise.push(
      `Die Insel "${inselRoh}" ist unbekannt; ausgewertet wurden alle sieben. ` +
      `Möglich sind: ${INSELN.join(", ")}.`
    );
  }
}
if (insel && bereich === "feedback") {
  insel = "";
  hinweise.push(
    "Der Feedbackbogen wird einmal je Schulungstag ausgefüllt, nicht je Insel. " +
    "Der Inselfilter blieb deshalb unberücksichtigt."
  );
}

// Weggelassenes gar nicht erst mitschicken. Dann greifen die Vorgabewerte der
// Datenbankfunktion, und „heute" wird dort in Europe/Berlin bestimmt.
const params = { bereich };
if (von) params.von = von;
if (bis) params.bis = bis;
if (insel) params.insel = insel;

const token = sauber(data.auth && data.auth.token);
if (!token) {
  return {
    fehler: "In dieser Verbindung ist kein Zugangswert hinterlegt. " +
            "Die Integration muss neu verbunden werden."
  };
}

try {
  const antwort = await ld.request({
    method: "GET",
    url: ENDPUNKT,
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    },
    params
  });

  // Die Statuscodes einzeln benennen. Sonst steht im Chatfenster „Fehler 503"
  // und jemand sucht in der Datenbank, obwohl nur ein Function Secret fehlt.
  if (antwort.status === 401) {
    return {
      fehler: "Der Zugangswert wird nicht angenommen. Entweder ist er in " +
              "Langdock falsch eingetragen oder er wurde in Supabase gewechselt."
    };
  }
  if (antwort.status === 503) {
    return {
      fehler: "Der Auswertungsendpunkt ist noch nicht scharfgeschaltet: In " +
              "Supabase fehlt das Function Secret CAMPUS_AUSWERTUNG_TOKEN."
    };
  }
  if (antwort.status !== 200) {
    return {
      fehler: `Die Auswertung antwortete mit Status ${antwort.status}.`,
      einzelheiten: antwort.json ?? null
    };
  }

  const ergebnis = antwort.json;
  if (hinweise.length && ergebnis && typeof ergebnis === "object") {
    ergebnis.hinweise = hinweise;
  }
  return ergebnis;
} catch (fehler) {
  ld.log("campus-auswertung nicht erreichbar:", fehler.message);
  return { fehler: `Die Auswertung ist nicht erreichbar: ${fehler.message}` };
}
