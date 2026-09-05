"use strict";

/* Prüft die Sicherheitsverträge der SQL-Dateien ohne Datenbankzugang. Die
   fachliche Probe im echten Projekt bleibt nötig; dieser Test verhindert,
   dass eine spätere Bearbeitung den öffentlichen Zugriff unbemerkt öffnet. */

const fs = require("fs");
const path = require("path");

const BASIS = fs.readFileSync(
  path.join(__dirname, "..", "supabase_campus_basis_migration.sql"),
  "utf8"
);
const QUIZ = fs.readFileSync(
  path.join(__dirname, "..", "supabase_campus_quiz_migration.sql"),
  "utf8"
);
const FRIST = fs.readFileSync(
  path.join(__dirname, "..", "supabase_campus_aufbewahrung_migration.sql"),
  "utf8"
);
const AUSWERTUNG = fs.readFileSync(
  path.join(__dirname, "..", "supabase_campus_auswertung_migration.sql"),
  "utf8"
);
const HAERTUNG = fs.readFileSync(
  path.join(__dirname, "..", "supabase_campus_haertung_migration.sql"),
  "utf8"
);
/* Die Edge Function ist kein SQL, gehört aber zur selben Kette: Sie ist das
   einzige Tor, durch das Langdock an die Auswertung kommt. */
const ENDPUNKT = fs.readFileSync(
  path.join(__dirname, "..", "supabase", "functions", "campus-auswertung", "index.ts"),
  "utf8"
);
const BEIDE = `${BASIS}\n${QUIZ}\n${FRIST}\n${AUSWERTUNG}\n${HAERTUNG}`;

let bestanden = 0;
let durchgefallen = 0;

function pruefe(name, condition) {
  if (condition) {
    console.log(`  ok    ${name}`);
    bestanden += 1;
  } else {
    console.error(`  FEHLT ${name}`);
    durchgefallen += 1;
  }
}

function hat(muster, text = BEIDE) {
  return muster.test(text);
}

pruefe("neues Zielprojekt ist dokumentiert",
  hat(/pstohdeknhgsywmogmiu/) && !hat(/mhzlayhnyqlxdyiceyqz/));

for (const tabelle of [
  "campus_feedback",
  "campus_feedback_ratings",
  "campus_quiz_submissions"
]) {
  pruefe(`${tabelle} wird wiederholbar angelegt`,
    hat(new RegExp(`create\\s+table\\s+if\\s+not\\s+exists\\s+public\\.${tabelle}\\b`, "i")));
  pruefe(`${tabelle} hat RLS`,
    hat(new RegExp(`alter\\s+table\\s+public\\.${tabelle}\\s+enable\\s+row\\s+level\\s+security`, "i")));
  pruefe(`${tabelle} ist für anon/authenticated verschlossen`,
    hat(new RegExp(`revoke\\s+all\\s+on\\s+public\\.${tabelle}\\s+from\\s+anon,\\s*authenticated`, "i")));
}

pruefe("RPC validiert serverseitig und läuft als Security Definer",
  hat(/create\s+or\s+replace\s+function\s+public\.submit_campus_feedback\(payload\s+jsonb\)[\s\S]*?security\s+definer[\s\S]*?set\s+search_path\s+to\s+''/i, BASIS));
pruefe("RPC ist nur für service_role ausführbar",
  hat(/revoke\s+execute\s+on\s+function\s+public\.submit_campus_feedback\(jsonb\)[\s\S]*?from\s+public,\s*anon,\s*authenticated/i, BASIS)
  && hat(/grant\s+execute\s+on\s+function\s+public\.submit_campus_feedback\(jsonb\)[\s\S]*?to\s+service_role/i, BASIS));

for (const view of [
  "campus_feedback_langdock_stats",
  "campus_quiz_inseln",
  "campus_quiz_fragen",
  "campus_quiz_taetigkeit",
  "campus_quiz_und_feedback"
]) {
  pruefe(`${view} nutzt die Rechte des Aufrufers`,
    hat(new RegExp(
      view === "campus_feedback_langdock_stats"
        ? `view\\s+public\\.${view}[\\s\\S]*?security_invoker\\s*=\\s*on`
        : `alter\\s+view\\s+public\\.${view}\\s+set\\s*\\(security_invoker\\s*=\\s*on\\)`,
      "i"
    )));
  pruefe(`${view} ist öffentlich nicht lesbar`,
    hat(new RegExp(`revoke\\s+all\\s+on\\s+public\\.${view}\\s+from\\s+anon,\\s*authenticated`, "i")));
}

pruefe("gemeinsame View liest die geprüfte Händlernummernspalte",
  hat(/f\.dealer_number\s+as\s+dealer_number/i, QUIZ)
  && !hat(/raw_payload\s*->>\s*'dealerNumber'/i, QUIZ));
pruefe("Feedbackschnitt ist skalenbereinigt",
  hat(/round\(avg\(public\.campus_note_einheitlich\(f\.form_version,\s*r\.rating\)\)\s*filter\s*\(where\s+r\.section_key\s*<>\s*'schulungsinseln'\)\)/i, QUIZ));

/* Aufbewahrungsfrist. Die zwoelf Monate stehen zugleich im Datenschutzhinweis
   unter /datenschutz/ — wer sie hier aendert, aendert dort mit. */
pruefe("Aufbewahrungsfrist betraegt zwoelf Monate",
  hat(/frist\s+interval\s+default\s+interval\s+'12 months'/i, FRIST));
pruefe("Aufraeumroutine laeuft als Security Definer mit festem search_path",
  hat(/create\s+or\s+replace\s+function\s+public\.campus_daten_anonymisieren\([\s\S]*?security\s+definer[\s\S]*?set\s+search_path\s*=\s*public,\s*pg_temp/i, FRIST));
pruefe("Aufraeumroutine ist fuer Browserrollen gesperrt",
  hat(/revoke\s+execute\s+on\s+function\s+public\.campus_daten_anonymisieren\(interval\)[\s\S]*?from\s+public,\s*anon,\s*authenticated/i, FRIST));
pruefe("Aufraeumroutine wirkt nicht zweimal auf dieselbe Zeile",
  (FRIST.match(/anonymized_at\s+is\s+null/gi) || []).length >= 2);
/* raw_payload traegt jede Angabe des Feedbackbogens ein zweites Mal. Bliebe es
   stehen, waere die Anonymisierung eine Attrappe — deshalb hier geprueft. */
pruefe("Anonymisierung raeumt auch raw_payload und die Freitexte",
  hat(/raw_payload\s*=\s*jsonb_build_object\('anonymisiert',\s*true\)/i, FRIST)
  && ["recommendation_reason", "topic_wishes", "team_mood",
      "improvement_suggestions", "positive_aspects", "additional_notes"]
       .every((feld) => new RegExp(`${feld}\\s*=\\s*null`, "i").test(FRIST)));

/* Auswertung für Langdock. Der Endpunkt ist die einzige Stelle, an der Daten
   das Projekt in Richtung eines Sprachmodells verlassen — hier zaehlt jede
   Zusage aus dem Integrationsplan doppelt. */
pruefe("Auswertung laeuft als Security Definer mit festem search_path",
  hat(/create\s+or\s+replace\s+function\s+public\.campus_auswertung\([\s\S]*?security\s+definer[\s\S]*?set\s+search_path\s*=\s*public,\s*pg_temp/i, AUSWERTUNG));
pruefe("Auswertung ist nur fuer service_role ausfuehrbar",
  hat(/revoke\s+execute\s+on\s+function\s+public\.campus_auswertung\(date,\s*date,\s*text\)[\s\S]*?from\s+public,\s*anon,\s*authenticated/i, AUSWERTUNG)
  && hat(/grant\s+execute\s+on\s+function\s+public\.campus_auswertung\(date,\s*date,\s*text\)[\s\S]*?to\s+service_role/i, AUSWERTUNG));
/* Als Parameter liesse sich die Mindestmenge von aussen auf 1 setzen und der
   Schutz kleiner Gruppen damit abschalten. */
pruefe("Mindestmenge steht als Konstante, nicht als Parameter",
  hat(/mindestmenge\s+constant\s+integer\s*:=\s*[1-9]/i, AUSWERTUNG)
  && !/mindestmenge\s+integer\s+default/i.test(AUSWERTUNG));
pruefe("Tagesgrenzen liegen in Europe/Berlin, nicht in UTC",
  (AUSWERTUNG.match(/at time zone 'Europe\/Berlin'/gi) || []).length >= 3);
pruefe("Auswertung gibt keine Personenfelder heraus",
  !/'participant'|'dealer'|'dealer_number'|'session_id'|'page_url'/i.test(AUSWERTUNG));

pruefe("Langdock-Endpunkt verlangt ein eigenes Bearer-Token",
  /CAMPUS_AUSWERTUNG_TOKEN/.test(ENDPUNKT)
  && /Bearer /.test(ENDPUNKT)
  && /401/.test(ENDPUNKT));
/* Der Endpunkt darf ausschliesslich die aggregierende Funktion aufrufen. Ein
   Pfad auf /rest/v1/campus_... waere ein Fenster zu den Rohdaten. */
pruefe("Langdock-Endpunkt spricht nur die Auswertungsfunktion an",
  /\/rest\/v1\/rpc\/campus_auswertung/.test(ENDPUNKT)
  && !/\/rest\/v1\/campus_/.test(ENDPUNKT));
pruefe("Langdock-Endpunkt prueft das Token in konstanter Zeit",
  /function\s+gleich\s*\(/.test(ENDPUNKT) && /\^/.test(ENDPUNKT));

/* Haertung. Der Security-Advisor fand am 3. September 2026 eine
   SECURITY-DEFINER-Funktion, die ueber /rest/v1/rpc fuer anon erreichbar war —
   sie stammt nicht aus diesem Repository, sondern aus dem Projektaufbau. */
pruefe("Haertung entzieht rls_auto_enable die oeffentlichen Rechte",
  hat(/revoke\s+execute\s+on\s+function\s+public\.rls_auto_enable\(\)\s+from\s+public,\s*anon,\s*authenticated/i, HAERTUNG));
/* Ein blindes revoke auf eine Funktion, die es nicht gibt, bricht die
   Migration ab. Der Guard haelt sie idempotent und in einem frischen Projekt
   lauffaehig. */
pruefe("Haertung laeuft auch, wenn die Funktion fehlt",
  hat(/if\s+exists\s*\([\s\S]*?proname\s*=\s*'rls_auto_enable'/i, HAERTUNG));

// Beim Neuaufbau gibt es nichts zu entfernen. Destruktive Migrationen brauchen
// laut AGENTS.md eine eigene, ausdrückliche Freigabe und gehören nicht hierher.
const ohneKommentare = BEIDE
  .replace(/--.*$/gm, "")
  .replace(/\/\*[\s\S]*?\*\//g, "");
pruefe("Neuaufbau enthält kein DROP, DELETE oder TRUNCATE",
  !/^\s*(drop|delete|truncate)\b/im.test(ohneKommentare));
pruefe("keine Schlüsselwerte stehen im SQL",
  !/\bsb_(?:secret|publishable)_[A-Za-z0-9_-]{12,}/.test(BEIDE)
  && !/\beyJ[A-Za-z0-9_-]{20,}\./.test(BEIDE));

console.log(`\n${bestanden} bestanden, ${durchgefallen} fehlgeschlagen.`);
process.exit(durchgefallen ? 1 : 0);
