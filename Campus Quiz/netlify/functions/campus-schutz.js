"use strict";

/* Gemeinsamer Schutz der beiden schreibenden Campus-Functions. Der Campus
   hat keine Anmeldung; Herkunftsprüfung und begrenzte Anfragen erschweren
   deshalb fremde Masseneinsendungen, ersetzen aber keine Identitätsprüfung.

   Die Zähler leben nur im Speicher einer Function-Instanz. Netlify kann
   mehrere Instanzen starten, daher ist das Tageslimit eine Notbremse und
   keine weltweit exakte Obergrenze. */

const FENSTER_MS = 5 * 60 * 1000;
const ipTreffer = new Map();
let tag = { anzahl: 0, datum: new Date().toDateString() };

function positiveGanzeZahl(name, fallback) {
  const wert = Number(process.env[name]);
  return Number.isInteger(wert) && wert > 0 ? wert : fallback;
}

function kopf(event, name) {
  const headers = event && event.headers && typeof event.headers === "object"
    ? event.headers
    : {};
  const gesucht = name.toLowerCase();
  const schluessel = Object.keys(headers).find((key) => key.toLowerCase() === gesucht);
  return schluessel ? String(headers[schluessel] || "").trim() : "";
}

function clientIp(event) {
  /* Wie bei THI zählt die Adresse rechts von den vertrauten Proxy-Hops.
     Ein Client kann den ersten X-Forwarded-For-Wert selbst setzen. */
  const xff = kopf(event, "x-forwarded-for");
  if (xff) {
    const teile = xff.split(",").map((wert) => wert.trim()).filter(Boolean);
    if (teile.length) {
      const hops = positiveGanzeZahl("CAMPUS_TRUSTED_PROXIES", 1);
      const index = teile.length - hops;
      return teile[index >= 0 ? index : teile.length - 1];
    }
  }
  return kopf(event, "x-nf-client-connection-ip")
    || kopf(event, "x-real-ip")
    || "unbekannt";
}

function gleicheHerkunft(event) {
  const herkunft = kopf(event, "origin");
  const host = kopf(event, "host") || kopf(event, "x-forwarded-host").split(",").pop().trim();

  /* Normale Browser-POSTs tragen Origin. Fehlt er, ist der Aufruf keinem
     Campus-Seitenaufruf zuzuordnen und wird vor jeder Verarbeitung beendet. */
  if (!herkunft || !host) return false;
  try {
    return new URL(herkunft).host === host;
  } catch {
    return false;
  }
}

function limitGeprueft(event) {
  const proIp = positiveGanzeZahl("CAMPUS_WRITE_RATE_LIMIT", 30);
  const proTag = positiveGanzeZahl("CAMPUS_WRITE_DAILY_LIMIT", 1000);
  const heute = new Date().toDateString();
  if (tag.datum !== heute) tag = { anzahl: 0, datum: heute };
  if (tag.anzahl >= proTag) return "tag";

  const ip = clientIp(event);
  const jetzt = Date.now();
  const eintrag = ipTreffer.get(ip);
  if (!eintrag || jetzt > eintrag.bis) {
    ipTreffer.set(ip, { anzahl: 1, bis: jetzt + FENSTER_MS });
  } else {
    eintrag.anzahl += 1;
    if (eintrag.anzahl > proIp) return "ip";
  }
  tag.anzahl += 1;

  if (ipTreffer.size > 5000) {
    for (const [ipAdresse, wert] of ipTreffer) {
      if (jetzt > wert.bis) ipTreffer.delete(ipAdresse);
    }
  }
  return null;
}

function schreibschutz(event, jsonResponse) {
  if (!gleicheHerkunft(event)) {
    return jsonResponse(403, { error: "Ungültige Herkunft.", code: "INVALID_ORIGIN" });
  }

  const gebremst = limitGeprueft(event);
  if (gebremst) {
    return jsonResponse(429, {
      error: gebremst === "tag"
        ? "Das Tageslimit für Einsendungen ist erreicht. Bitte später erneut versuchen."
        : "Zu viele Einsendungen in kurzer Zeit. Bitte einen Moment warten.",
      code: "RATE_LIMIT"
    });
  }
  return null;
}

module.exports = { schreibschutz };
