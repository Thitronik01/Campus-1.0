"use strict";

document.querySelectorAll(".steps button").forEach(button => {
  button.setAttribute("aria-label", `Schritt ${button.dataset.goto}: ${button.querySelector(".steps__label").textContent}`);
});

/* Sichtbare Auswahl und klare Skalenanker ergänzen die vorhandene
   Formularlogik; Namen und Werte für die Auswertung bleiben unverändert. */
document.querySelectorAll("[data-rate]").forEach(row => {
  const label = row.querySelector("legend");
  const selection = document.createElement("span");
  selection.className = "rate__selection";
  selection.setAttribute("aria-hidden", "true");
  label.appendChild(selection);
  const refresh = () => {
    const checked = row.querySelector("input[type=radio]:checked");
    row.classList.toggle("is-answered", Boolean(checked));
    selection.textContent = checked ? (checked.value === "na" ? "Nicht beurteilt" : `${checked.value} / 5`) : "";
  };
  row.addEventListener("change", refresh);
  // Der Entwurf wird vom nachfolgenden App-Skript wiederhergestellt.
  window.addEventListener("load", refresh, { once: true });
});
document.querySelectorAll("#panel-3 > .card__note, #panel-4 > .card__note").forEach(note => {
  if (note.textContent.includes("5 ist")) note.textContent = "5 ist die beste Bewertung. Bei 1 ist ein kurzer Kommentar erforderlich.";
});
