"use strict";
const demo = new URLSearchParams(location.search).get("demo") === "1";
document.querySelectorAll("[data-campus]").forEach(a => { if (demo) a.search = "?demo=1"; });
// Einzelpakete enthalten das Formular nicht; dort bleibt nur der Lernbegleiter.
fetch("/data/inseln.json").then(r => r.ok ? r.json() : null).then(katalog => {
  if (!katalog?.arbeitskarte) document.getElementById("digital-link").closest("aside").hidden = true;
}).catch(() => { document.getElementById("digital-link").closest("aside").hidden = true; });
document.getElementById("fall-form").addEventListener("submit", ev => {
  ev.preventDefault();
  const werte = new FormData(ev.currentTarget).getAll("befund");
  const richtig = ["software", "meldung", "bedienung"].every(w => werte.includes(w)) && !werte.includes("fertig");
  const ausgabe = document.getElementById("fall-ergebnis");
  ausgabe.hidden = false;
  ausgabe.classList.toggle("richtig", richtig);
  ausgabe.textContent = (richtig ? "Richtig erkannt. " : "Prüfe die drei offenen Punkte noch einmal. ") + "Softwarestände fehlen, der zweite Meldeweg ist ungeprüft und ein unabhängiger Bedienweg wurde noch nicht besprochen. Eine funktionierende App bestätigt keinen anderen Meldeweg. Ergänze die Dokumentation und kläre diese Punkte vor der Übergabe.";
});
const checks = [...document.querySelectorAll(".praxis-check")];
function stand() { document.getElementById("check-stand").textContent = `${checks.filter(c => c.checked).length} von ${checks.length} Punkten abgehakt`; }
checks.forEach(c => c.addEventListener("change", stand));
document.getElementById("zuruecksetzen").addEventListener("click", () => { checks.forEach(c => { c.checked = false; }); stand(); });
document.getElementById("drucken").addEventListener("click", () => window.print());
