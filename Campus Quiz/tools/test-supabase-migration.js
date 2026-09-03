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
const BEIDE = `${BASIS}\n${QUIZ}`;

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
