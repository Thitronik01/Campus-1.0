/* THITRONIK Campus — Langdock-Action „Quizauswertung abrufen"
 * ==========================================================================
 *
 * Diese Datei läuft nicht in diesem Repository. Sie ist die Vorlage für das
 * Codefeld einer Action in einer eigenen Langdock-Integration. Sie liegt
 * trotzdem hier, weil sonst niemand nachlesen kann, was in Langdock steht:
 * Der Code dort ist nicht versioniert, und wer ihn ändert, hinterlässt keine
 * Spur. Wird er geändert, gehört die Änderung auch hierher.
 *
 * Ablauf: Langdock ruft diese Action auf, die Action ruft die Supabase Edge
 * Function `campus-auswertung`, und die ruft die Datenbankfunktion gleichen
 * Namens. Erst dort werden Rohdaten gelesen. Auf dem Rückweg kommen nur
 * aggregierte Zahlen — Namen, Händlernummern und Session-IDs verlassen die
 * Datenbank nicht.
 *
 * Warum die Action überhaupt Code enthält und nicht bloß ein HTTP-Request
 * ist: Die drei Parameter dürfen leer bleiben, und leer heißt „nicht
 * mitschicken". Ein `von=` ohne Wert wäre kein Datum, sondern ein 400. Das
 * Modell füllt Felder gern mit Platzhaltern; hier werden sie weggeworfen,
 * bevor sie zur Datenbank kommen.
 *
 * Zugangswert: Er steht im Auth-Feld `token` der Integration, nicht hier.
 * Siehe LANGDOCK-ANBINDUNG.md, Schritt 2.
 *
 * `node --check` fällt über diese Datei — und das ist richtig so. Langdock
 * legt den Code in einen async-Rumpf, deshalb stehen hier `await` und
 * `return` auf oberster Ebene. Als eigenständiges Skript ist das ungültig.
 * Wer die Syntax prüfen will, packt den Inhalt vorher in
 * `async function f(data, ld) { ... }`. `tools/check-syntax.js` sieht das
 * Verzeichnis `langdock/` bewusst nicht an.
 * ========================================================================== */

const ENDPUNKT =
  "https://pstohdeknhgsywmogmiu.supabase.co/functions/v1/campus-auswertung";

const TAG = /^\d{4}-\d{2}-\d{2}$/;

const INSELN = [
  "vejro", "poel", "hiddensee", "samsoe", "fehmarn", "usedom", "langeland"
];

function sauber(wert) {
  return typeof wert === "string" ? wert.trim() : "";
}

const von = sauber(data.input.von);
const bis = sauber(data.input.bis);
const insel = sauber(data.input.insel).toLowerCase();

// Vor dem Netzaufruf prüfen, nicht danach. Ein Tippfehler im Datum soll dem
// Modell als Satz zurückkommen, den es korrigieren kann — nicht als 400 aus
// einer fremden Schicht, der im Gesprächsverlauf wie ein Ausfall aussieht.
for (const [name, wert] of [["von", von], ["bis", bis]]) {
  if (wert && !TAG.test(wert)) {
    return {
      fehler: `Das Feld ${name} muss ein Datum im Format JJJJ-MM-TT sein, ` +
              `angekommen ist "${wert}".`
    };
  }
}

if (insel && !INSELN.includes(insel)) {
  return {
    fehler: `Unbekannte Insel "${insel}".`,
    erlaubt: INSELN
  };
}

if (von && bis && bis < von) {
  // Zeichenkettenvergleich genügt: JJJJ-MM-TT sortiert wie ein Datum.
  return { fehler: `Der Zeitraum endet vor seinem Beginn: ${von} bis ${bis}.` };
}

// Weggelassenes gar nicht erst mitschicken. Dann greifen die Vorgabewerte der
// Datenbankfunktion, und „heute" wird dort in Europe/Berlin bestimmt statt
// hier in der Zeitzone des Langdock-Servers.
const params = {};
if (von) params.von = von;
if (bis) params.bis = bis;
if (insel) params.insel = insel;

const token = sauber(data.auth.token);
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

  return antwort.json;
} catch (fehler) {
  ld.log("campus-auswertung nicht erreichbar:", fehler.message);
  return { fehler: `Die Auswertung ist nicht erreichbar: ${fehler.message}` };
}
