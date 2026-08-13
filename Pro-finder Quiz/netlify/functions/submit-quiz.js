"use strict";

const QUIZ_ID = "pro-finder-de";
const QUIZ_VERSION = "5";
const LETTERS = ["A", "B", "C", "D"];
const MAX_BODY_BYTES = 160_000;

const QUESTIONS = {"PF-05":{"category":"Diagnose","type":"Einzelauswahl","question":"Welche beiden Angaben sind für eine eindeutige technische Diagnose des Pro-Finders erforderlich?","options":["Vollständige Seriennummer und installierter Softwarestand","Artikelnummer und Mobilfunkanbieter","SIM-PIN und Fahrzeugfarbe","Telefonnummer und Kennzeichen"],"correct":["A"]},"PF-10":{"category":"Programmierung","type":"Einzelauswahl","question":"Welche Bedeutung hat die erste erfolgreich programmierte Rufnummer?","options":["Sie wird als Hauptnutzer hinterlegt und kann weitere Rufnummern verwalten.","Sie kann nur Alarmmeldungen empfangen, aber keine Befehle senden.","Sie wird automatisch nach 24 Stunden gelöscht.","Sie dient ausschließlich der Guthabenabfrage."],"correct":["A"]},"PF-11":{"category":"Programmierung","type":"Einzelauswahl","question":"Was bewirkt das (S) vor einer Rufnummer in der Programmier-SMS?","options":["Es kennzeichnet eine Servicenummer.","Es deaktiviert den SMS-Versand.","Es kennzeichnet ein Smartphone, sodass Positionen als anklickbarer Kartenlink aufbereitet werden.","Es schaltet den Pro-Finder stumm."],"correct":["C"]},"PF-15":{"category":"Geofencing","type":"Einzelauswahl","question":"In welcher Größenordnung liegt die dokumentierte Auslösedistanz des Geofencings?","options":["Etwa 90 Meter","Etwa 300 Meter","Etwa 900 Meter bis 1 Kilometer","Etwa 9 Kilometer"],"correct":["C"]},"PF-21":{"category":"Spannung","type":"Mehrfachauswahl (genau 2)","question":"Welche zwei Aussagen zum Tiefentladeschutz sind richtig?","options":["Bei 11,2 V wird eine Spannungswarnung ausgelöst.","Bei 12,0 V kehrt das Gerät in den Normalbetrieb zurück.","Bei 11,2 V wird die SIM-Karte gelöscht.","Bereits ab 9 V wird automatisch eine Alarm-SMS an die Polizei gesendet."],"correct":["A","B"]},"PF-22":{"category":"Montage","type":"Mehrfachauswahl (genau 2)","question":"Welche zwei Vorgaben gelten für den Montageort?","options":["Montage im trockenen Fahrzeuginnenraum, z. B. geschützt im Bereich des Armaturenbretts.","Geräteoberseite möglichst nach oben ausrichten.","Montage direkt im Motorraum.","Das Gerät vollständig mit Metall umschließen."],"correct":["A","B"]},"LED-01":{"category":"Signal → Bedeutung","type":"Einzelauswahl","question":"Die fest verbaute Pro-Finder-LED blinkt grün. Welchen Zustand zeigt das an?","options":["Normalbetrieb: Das Gerät ist im Mobilfunknetz eingebucht und Zielrufnummern sind gespeichert.","Die SIM-Karte fehlt oder ist defekt.","Das Gerät sucht nach dem Mobilfunknetz und hat keinen Empfang.","Die letzte SMS konnte nicht gesendet werden."],"correct":["A"]},"LED-02":{"category":"Bedeutung → Signal","type":"Einzelauswahl","question":"Die SIM-Karte fehlt oder ist defekt. Welches Lichtsignal zeigt die fest verbaute Pro-Finder-LED?","options":["Sie leuchtet dauerhaft rot.","Sie blinkt grün.","Sie blinkt abwechselnd rot und gelb.","Sie leuchtet dauerhaft grün."],"correct":["A"]},"LED-03":{"category":"Diagnosefall","type":"Einzelauswahl","question":"Ein Pro-Finder ab Seriennummer 0699-045: Die fest verbaute Pro-Finder-LED blinkt gelb. Welcher Prüfschritt ist richtig?","options":["Tarif, Guthaben, Rufnummer und Netz prüfen, denn die letzte SMS konnte nicht gesendet werden.","Die Zielrufnummern neu programmieren, denn der Rufnummernspeicher ist leer.","Die SIM-Karte tauschen, denn sie ist defekt.","Das Gerät sofort zur Reparatur einschicken."],"correct":["A"]},"PF-N01":{"category":"SIM","type":"Einzelauswahl","question":"Welche Leistungen muss die SIM-Karte für den Pro-Finder zwingend bereitstellen?","options":["Klassische SMS, Telefonie und eine eindeutig erreichbare Rufnummer","Nur mobiles Datenvolumen","Einen 5G-Tarif mit unbegrenztem Datenvolumen","Eine eSIM mit App-Anbindung"],"correct":["A"]},"PF-N02":{"category":"SIM","type":"Einzelauswahl","question":"Welche SIM-Regel gilt für Pro-Finder ab Seriennummer 0699-045?","options":["Nano-SIM verwenden und die PIN-Abfrage vollständig deaktivieren.","Micro-SIM mit PIN 0000 verwenden.","Mini-SIM mit beliebiger PIN verwenden.","Das SIM-Format ist beliebig, solange die PIN 0000 lautet."],"correct":["A"]},"PF-N03":{"category":"SIM","type":"Einzelauswahl","question":"Welche PIN-Regel gilt für Pro-Finder bis Seriennummer 0699-044?","options":["Die PIN muss 0000 sein oder die PIN-Abfrage muss vollständig deaktiviert sein.","Die PIN muss immer 0000 sein und die PIN-Abfrage muss aktiv bleiben.","Eine beliebige PIN kann verwendet werden.","Die PIN wird per SMS an den Pro-Finder gesendet."],"correct":["A"]},"PF-N04":{"category":"Programmierung","type":"Einzelauswahl","question":"Was bedeutet das + vor einer Rufnummer in der Programmier-SMS?","options":["Die Rufnummer ist autorisiert und darf den Pro-Finder steuern.","Es ersetzt die Ländervorwahl.","Die Rufnummer empfängt keine Meldungen mehr.","Die Rufnummer wird aus dem Speicher gelöscht."],"correct":["A"]},"PF-N05":{"category":"Meldungen","type":"Einzelauswahl","question":"An wie viele Zielrufnummern kann der Pro-Finder Alarm- und Statusmeldungen senden?","options":["An bis zu 10 Zielrufnummern","An genau 2 Zielrufnummern","An maximal 5 Zielrufnummern","An beliebig viele Zielrufnummern"],"correct":["A"]},"PF-N06":{"category":"SIM","type":"Einzelauswahl","question":"Warum müssen Mailbox und Rufumleitungen der Pro-Finder-SIM deaktiviert werden?","options":["Weil sie Anrufe an den Pro-Finder annehmen bzw. umleiten und so Bedienung und Tests stören.","Weil sonst das Guthaben schneller verbraucht wird.","Weil der Anbieter die SIM sonst sperrt.","Weil die Mailbox die GPS-Position speichert."],"correct":["A"]},"PF-N07":{"category":"Befehle","type":"Einzelauswahl","question":"Mit welchem SMS-Befehl fordert ein deutsch programmierter Pro-Finder eine Positionsmeldung an?","options":["pos – je nach Softwarestand auch position","standort","status","fence an"],"correct":["A"]},"PF-N08":{"category":"Geofencing","type":"Einzelauswahl","question":"Wie wird das Geofencing per SMS geschaltet?","options":["Mit „fence an\" und „fence aus\"","Mit „geo start\" und „geo stop\"","Mit „zone ein\" und „zone aus\"","Mit „alarm an\" und „alarm aus\""],"correct":["A"]},"PF-N09":{"category":"Geofencing","type":"Einzelauswahl","question":"Wann ist das Geofencing gemäß Produktunterlagen automatisch aktiv?","options":["Bei verbundener und scharfgeschalteter WiPro","Immer, sobald eine SIM eingelegt ist","Nur bei eingeschalteter Zündung","Nie – es muss immer manuell aktiviert werden"],"correct":["A"]},"PF-N10":{"category":"Ausgänge","type":"Mehrfachauswahl (genau 2)","question":"Welche zwei Aussagen zu den Ausgängen A und B sind richtig?","options":["Jeder Ausgang darf mit maximal 500 mA belastet werden.","Der Befehl „a 30\" schaltet Ausgang A für 30 Minuten ein.","Der Befehl „a 30\" schaltet Ausgang A für 30 Sekunden ein.","Die Ausgänge können 5-A-Verbraucher direkt schalten."],"correct":["A","B"]},"PF-N11":{"category":"Sicherheit","type":"Einzelauswahl","question":"Welcher Befehl ist für die Fahrzeugstilllegung über Ausgang A ausschließlich zulässig?","options":["„kill\" – er schaltet erst, wenn die GPS-Geschwindigkeit mindestens 5 Sekunden durchgehend 0 km/h beträgt.","„a an\" – er schaltet Ausgang A sofort dauerhaft ein.","„a 120\" – er schaltet Ausgang A für die maximale Zeit ein.","„a impuls\" – er schaltet Ausgang A kurz ein und aus."],"correct":["A"]},"PF-N12":{"category":"Diagnose","type":"Einzelauswahl","question":"Ein Pro-Finder reagiert nicht auf Befehle vom Smartphone. Welche Versandart ist für Befehle zwingend erforderlich?","options":["Klassische SMS – RCS-Chatnachrichten und iMessage werden nicht verarbeitet.","WhatsApp-Nachrichten an die Pro-Finder-Nummer","E-Mail-to-SMS über den Anbieter","Die Versandart ist beliebig."],"correct":["A"]},"PF-N13":{"category":"Montage","type":"Einzelauswahl","question":"Was gilt beim Einsetzen oder Wechseln der SIM-Karte?","options":["SIM nur bei spannungsfrei geschaltetem Pro-Finder einsetzen oder entnehmen.","Die SIM kann im laufenden Betrieb gewechselt werden.","Vor dem Wechsel mehrfach die Fahrzeugsicherung ziehen und wieder einsetzen.","Die SIM darf nur vom Mobilfunkanbieter gewechselt werden."],"correct":["A"]},"PF-N14":{"category":"Grundlagen","type":"Einzelauswahl","question":"Welche Aussage beschreibt den Pro-Finder korrekt?","options":["Er meldet Alarme und Positionen per SMS, ist aber kein Live-Tracking-System und zeichnet keine Route auf.","Er zeichnet dauerhaft die komplette Reiseroute auf.","Er verhindert einen Diebstahl selbstständig.","Er funktioniert auch ohne SIM-Karte vollständig."],"correct":["A"]},"PF-N15":{"category":"SIM","type":"Einzelauswahl","question":"Warum darf bei einer Vertrags-SIM kein Guthaben-Abfragecode programmiert sein?","options":["Ein falscher Code kann Alarmmeldungen verzögern oder blockieren, während das Gerät auf die Providerantwort wartet.","Der Anbieter berechnet sonst zusätzliche Gebühren.","Der Code löscht die gespeicherten Zielrufnummern.","Die SIM-Karte wird dadurch dauerhaft gesperrt."],"correct":["A"]}};

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    },
    body: JSON.stringify(body)
  };
}

function cleanString(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function validDate(value) {
  const time = Date.parse(value);
  return Number.isFinite(time) ? new Date(time) : null;
}

function sameValues(left, right) {
  const a = [...left].sort();
  const b = [...right].sort();
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

function validLetterArray(value, { min = 0, max = 4, unique = true } = {}) {
  if (!Array.isArray(value) || value.length < min || value.length > max) return false;
  if (!value.every((letter) => LETTERS.includes(letter))) return false;
  return !unique || new Set(value).size === value.length;
}

function normalizeAnswer(answer) {
  if (!answer || typeof answer !== "object") throw new Error("Ungültiger Antwortdatensatz.");

  const id = cleanString(answer.id, 40);
  const source = QUESTIONS[id];
  if (!source) throw new Error(`Unbekannte Fragen-ID: ${id || "(leer)"}`);

  const selected = Array.isArray(answer.selected) ? answer.selected.map(String).sort() : [];
  const optionOrder = Array.isArray(answer.option_order) ? answer.option_order.map(String) : [];

  if (!validLetterArray(selected, { min: 1, max: source.correct.length })) {
    throw new Error(`Ungültige Auswahl bei ${id}.`);
  }
  if (!validLetterArray(optionOrder, { min: 4, max: 4 }) || new Set(optionOrder).size !== 4) {
    throw new Error(`Ungültige Antwortreihenfolge bei ${id}.`);
  }
  if (selected.length !== source.correct.length) {
    throw new Error(`Falsche Anzahl ausgewählter Antworten bei ${id}.`);
  }

  const displayedCorrect = LETTERS.filter((displayLetter, index) =>
    source.correct.includes(optionOrder[index])
  ).sort();

  const displayedText = (displayLetter) => {
    const displayIndex = LETTERS.indexOf(displayLetter);
    const sourceLetter = optionOrder[displayIndex];
    return source.options[LETTERS.indexOf(sourceLetter)];
  };

  const isCorrect = sameValues(selected, displayedCorrect);
  const responseSeconds = Number(answer.response_seconds);

  return {
    id,
    category: source.category,
    type: source.type,
    question: source.question,
    selected,
    selected_texts: selected.map(displayedText),
    correct: displayedCorrect,
    correct_texts: displayedCorrect.map(displayedText),
    option_order: optionOrder,
    is_correct: isCorrect,
    attempt_mode: "standard",
    review_round: 0,
    response_seconds: Number.isFinite(responseSeconds)
      ? Math.min(7200, Math.max(0, Math.round(responseSeconds)))
      : 0,
    answered_at: validDate(answer.answered_at)?.toISOString() || new Date().toISOString()
  };
}

function normalizePayload(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new Error("Ungültige Anfrage.");
  }

  if (payload.quiz_id !== QUIZ_ID || String(payload.quiz_version) !== QUIZ_VERSION) {
    throw new Error("Quiz-ID oder Quiz-Version stimmt nicht.");
  }

  const sessionId = cleanString(payload.session_id, 80);
  const participant = cleanString(payload.participant, 120);
  const team = cleanString(payload.team, 120);
  if (!sessionId || !participant || !team) {
    throw new Error("Session-ID, Teilnehmer und Firma/Gruppe sind Pflichtfelder.");
  }

  if (!Array.isArray(payload.answers) || payload.answers.length !== Object.keys(QUESTIONS).length) {
    throw new Error(`Es werden genau ${Object.keys(QUESTIONS).length} Antworten erwartet.`);
  }

  const seen = new Set();
  const answers = payload.answers.map((answer) => {
    const normalized = normalizeAnswer(answer);
    if (seen.has(normalized.id)) throw new Error(`Doppelte Fragen-ID: ${normalized.id}`);
    seen.add(normalized.id);
    return normalized;
  });

  const missingIds = Object.keys(QUESTIONS).filter((id) => !seen.has(id));
  if (missingIds.length) throw new Error(`Fehlende Fragen: ${missingIds.join(", ")}`);

  const startedAt = validDate(payload.started_at);
  const finishedAt = validDate(payload.finished_at);
  if (!startedAt || !finishedAt || finishedAt < startedAt) {
    throw new Error("Start- oder Endzeit ist ungültig.");
  }

  const durationSeconds = Math.min(
    86_400,
    Math.max(0, Math.round((finishedAt.getTime() - startedAt.getTime()) / 1000))
  );
  const score = answers.filter((answer) => answer.is_correct).length;
  const total = answers.length;
  const incorrect = total - score;
  const percent = Math.round((score / total) * 100);

  let streak = 0;
  let maxStreak = 0;
  for (const answer of answers) {
    streak = answer.is_correct ? streak + 1 : 0;
    maxStreak = Math.max(maxStreak, streak);
  }

  return {
    session_id: sessionId,
    quiz_id: QUIZ_ID,
    quiz_version: QUIZ_VERSION,
    language: "de",
    participant,
    team,
    started_at: startedAt.toISOString(),
    finished_at: finishedAt.toISOString(),
    duration_seconds: durationSeconds,
    score,
    incorrect,
    total,
    percent,
    max_streak: maxStreak,
    shuffle_enabled: Boolean(payload.shuffle_enabled),
    page_url: cleanString(payload.page_url, 500),
    answers
  };
}

exports.handler = async function handler(event) {
  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { error: "Nur POST ist erlaubt." });
  }

  if (!event.body || Buffer.byteLength(event.body, "utf8") > MAX_BODY_BYTES) {
    return jsonResponse(413, { error: "Anfrage ist leer oder zu groß." });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing SUPABASE_URL or Supabase server key.");
    return jsonResponse(500, { error: "Backend ist noch nicht vollständig konfiguriert." });
  }

  try {
    const payload = normalizePayload(JSON.parse(event.body));
    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "apikey": supabaseKey,
      "Prefer": "return=minimal"
    };

    // Legacy service_role keys are JWTs and may also be sent as Bearer tokens.
    // Modern sb_secret_ keys belong only in the apikey header.
    if (!supabaseKey.startsWith("sb_secret_")) {
      headers.Authorization = `Bearer ${supabaseKey}`;
    }

    const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/quiz_submissions`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload)
    });

    if (response.status === 409) {
      return jsonResponse(409, { ok: true, duplicate: true });
    }
    if (!response.ok) {
      const detail = await response.text();
      console.error("Supabase insert failed", response.status, detail);
      return jsonResponse(502, { error: "Supabase hat die Speicherung abgelehnt." });
    }

    return jsonResponse(201, { ok: true, duplicate: false });
  } catch (error) {
    console.error("Invalid quiz submission", error);
    return jsonResponse(400, { error: error instanceof Error ? error.message : "Ungültige Quizdaten." });
  }
};
