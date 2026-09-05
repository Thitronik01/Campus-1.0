/* Derselbe Vertrag im Browser und in beiden Annahme-Functions. Ein alter
   Profilhaken ohne Zeitpunkt ist kein nachträglicher Einwilligungsnachweis. */
(function (root, factory) {
  const vertrag = factory();
  if (typeof module === "object" && module.exports) module.exports = vertrag;
  else root.CampusEinwilligung = vertrag;
})(typeof globalThis === "object" ? globalThis : this, function () {
  "use strict";
  const VERSION = "1.1";

  function pruefen(proof, jetzt = Date.now()) {
    const zeit = proof && typeof proof.at === "string" ? Date.parse(proof.at) : NaN;
    if (!proof || proof.accepted !== true || proof.version !== VERSION
        || !/^\d{4}-\d{2}-\d{2}T/.test(proof.at || "") || !Number.isFinite(zeit)
        || zeit < Date.UTC(2026, 8, 5) || zeit > jetzt + 5 * 60 * 1000) {
      throw new Error("Bitte dem aktuellen Datenschutzhinweis zustimmen. Ältere Einsendungen ohne Nachweis können nicht erneut gesendet werden.");
    }
    return { accepted: true, at: new Date(zeit).toISOString(), version: VERSION };
  }

  function gueltig(proof) {
    try { pruefen(proof); return true; } catch { return false; }
  }

  function erfassen() {
    return { accepted: true, at: new Date().toISOString(), version: VERSION };
  }

  return { VERSION, pruefen, gueltig, erfassen };
});
