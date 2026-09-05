/* Echte PostgreSQL-Ausführung in einer flüchtigen PGlite-Datenbank.
   Keine Netzwerkverbindung zu Supabase, ausschließlich künstliche Daten.
   Aufruf: CAMPUS_PGLITE_PATH als Pfad zum installierten PGlite-ESM-Modul
   setzen oder @electric-sql/pglite@0.5.8 lokal installieren. */
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { PGlite } = await import(process.env.CAMPUS_PGLITE_PATH
  ? pathToFileURL(process.env.CAMPUS_PGLITE_PATH).href : "@electric-sql/pglite");
const db = new PGlite();
const read = name => fs.readFileSync(path.join(root, name), "utf8");
let count = 0;
const check = (name, actual, expected) => { assert.deepEqual(actual, expected, name); count++; };
const query = async (sql, args = []) => (await db.query(sql, args)).rows;
const migration = read("supabase/migrations/20260905122449_campus_review_korrekturen.sql");
try {
  await db.exec(`create role anon; create role authenticated; create role service_role bypassrls;
    alter default privileges in schema public grant all on tables to service_role;`);
  // Der Ausgangsstand ist vor der Korrektur festgehalten, damit der Test
  // auch Monate später weiterhin einen echten Upgradepfad prüft.
  const old = name => execFileSync("git", ["show", `a5165524ccbd938386c1690d2905b728c6f25fe6:Campus Quiz/${name}`],
    { cwd: root, encoding: "utf8" });
  await db.exec(old("supabase_campus_basis_migration.sql"));
  await db.exec(old("supabase_campus_quiz_migration.sql"));
  await db.exec(`alter table public.campus_feedback add column anonymized_at timestamptz;
    alter table public.campus_quiz_submissions add column anonymized_at timestamptz;`);

  const feedback = (name, changes = {}) => ({
    submissionId: crypto.randomUUID(), createdClientAt: new Date().toISOString(),
    eventSlug: "campus-2026", formVersion: "campus-2026-haendler-v14",
    source: "thitronik-campus-feedback-v14", dealerName: "Demobetrieb", dealerNumber: "01234",
    participantName: name, participantAreas: ["Werkstatt"], islandChoices: [],
    overallRating: "Sehr zufrieden", recommendation: "Ja, auf jeden Fall",
    ratings: [{ sectionKey: "durchfuehrung", itemKey: "praxis", itemLabel: "Praxis", rating: 4, comment: "Demo Kommentar" }],
    ...changes
  });
  const submit = async payload => (await query("select public.submit_campus_feedback($1::jsonb) as id", [JSON.stringify(payload)]))[0].id;
  const legacyId = await submit(feedback("Demo Alt"));
  await db.exec(migration);
  await db.exec(migration);
  check("Altbestand bleibt ohne erfundenen Nachweis", (await query("select consent_accepted_at,consent_version from campus_feedback where id=$1", [legacyId]))[0],
    { consent_accepted_at: null, consent_version: null });

  const consent = { accepted: true, at: new Date().toISOString(), version: "1.1" };
  const latestId = await submit(feedback("Demo Neu", { consent, overallRating: "Eher unzufrieden", recommendation: "Eher nein" }));
  await db.exec("update campus_feedback set client_created_at=now()-interval '1 day' where id='" + legacyId + "'");
  const saved = (await query("select consent_version,consent_accepted_at is not null as dated from campus_feedback where id=$1", [latestId]))[0];
  check("Feedback speichert Datum und Hinweisfassung", saved, { consent_version: "1.1", dated: true });
  await assert.rejects(submit(feedback("Demo Falsch", { consent: { ...consent, accepted: false } })), /invalid consent/); count++;

  for (const [island, version] of [["usedom", "6"], ["usedom", "7"], ["samsoe", "11"]]) {
    await db.query(`insert into campus_quiz_submissions
      (session_id,island,quiz_version,participant,dealer,dealer_number,started_at,finished_at,duration_seconds,score,incorrect,total,percent,answers)
      values ($1,$2,$3,'Demo Person','Demobetrieb','01234',now(),now(),0,1,0,1,100,$4::jsonb)`,
      [crypto.randomUUID(), island, version, JSON.stringify([{ id: "Q1", prompt: "Testfrage " + version, category: "Test", type: "single", is_correct: true, response_seconds: 3 }])]);
  }
  const joined = (await query("select inseln_absolviert,gesamteindruck,weiterempfehlung,feedback_schnitt from campus_quiz_und_feedback"))[0];
  check("Feedback wird verbunden; unterschiedliche Inseln und letzter Bogen zählen", joined,
    { inseln_absolviert: 2, gesamteindruck: "Eher unzufrieden", weiterempfehlung: "Eher nein", feedback_schnitt: "4" });
  check("Fragenversionen getrennt", (await query("select quiz_version from campus_quiz_fragen where island='usedom' order by quiz_version")).map(x => x.quiz_version), ["6", "7"]);

  await db.exec(`update campus_feedback set created_at=now()-interval '13 months' where id='${legacyId}';
    update campus_quiz_submissions set created_at=now()-interval '13 months',page_url='https://demo.invalid/person' where island='usedom';`);
  await db.exec("select * from public.campus_daten_anonymisieren()");
  check("Abgelaufene Kommentare entfernt, aktuelle erhalten", (await query("select count(*)::int as n from campus_feedback_ratings where comment is not null"))[0].n, 1);
  check("Historische Kennungen und URLs bereinigt", (await query("select count(*)::int as n from campus_quiz_submissions where anonymized_at is not null and (page_url<>'' or session_id not like 'anon-%')"))[0].n, 0);
  check("Anonyme Händler werden nicht als ein Betrieb gezählt", (await query("select haendler from campus_quiz_inseln where island='usedom'"))[0].haendler, 0);
  check("Anonyme Quizdaten nicht mit dem aktuellen Feedback verbunden", (await query("select inseln_absolviert from campus_quiz_und_feedback"))[0].inseln_absolviert, 1);
  await db.query("update campus_feedback_ratings set comment='Nachträglicher Demokommentar' where feedback_id=$1", [legacyId]);
  await db.exec("select * from public.campus_daten_anonymisieren()");
  check("Bereits anonymisierte Bögen werden nachbereinigt", (await query("select count(*)::int as n from campus_feedback_ratings where feedback_id=$1 and comment is not null", [legacyId]))[0].n, 0);

  for (const role of ["anon", "authenticated"]) {
    const rows = await query(`select c.relname from pg_class c join pg_namespace n on n.oid=c.relnamespace
      where n.nspname='public' and c.relname like 'campus_%' and c.relkind in ('r','v')
      and (has_table_privilege($1,c.oid,'SELECT') or has_table_privilege($1,c.oid,'INSERT'))`, [role]);
    check(`${role} erhält keine Tabellenrechte`, rows, []);
  }
  // Derselbe Zielstand muss sich auch aus der vollständigen Erstinstallation
  // ergeben. Ein späterer Neuaufbau darf die Korrektur nicht zurückdrehen.
  const definitions = await query("select viewname,definition from pg_views where schemaname='public' order by viewname");
  await db.exec(read("supabase_campus_basis_migration.sql"));
  await db.exec(read("supabase_campus_quiz_migration.sql"));
  check("Installationsquelle und Upgrade liefern gleiche Views", await query("select viewname,definition from pg_views where schemaname='public' order by viewname"), definitions);
  console.log(`Datenbank: ${count} Prüfungen bestanden, einschließlich wiederholtem Upgrade und Anonymisierung.`);
} finally {
  await db.close();
}
