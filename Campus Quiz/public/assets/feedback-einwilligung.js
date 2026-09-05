/* Der Feedbackbogen ist auch direkt erreichbar. Seine Einwilligung wird
   deshalb beim Absenden erhoben und gehört zur dort genannten Person. */
(() => {
  "use strict";
  if (new URLSearchParams(location.search).get("demo") === "1") {
    for (const link of document.querySelectorAll('a[href="/quiz"]')) {
      link.href = "/quiz?demo=1";
    }
  }
  const form = document.getElementById("feedbackForm");
  const status = document.getElementById("statusMessage");
  if (!form || !status) return;
  const feld = document.createElement("div");
  feld.className = "campus-feedback-consent";
  feld.innerHTML = `<label for="feedback-privacy"><input id="feedback-privacy" type="checkbox">
    <span>Ich willige ein, dass meine Angaben und mein Feedback nach dem
    <a href="/datenschutz/" target="_blank" rel="noopener">Datenschutzhinweis</a>
    verarbeitet werden. Ich kann die Einwilligung jederzeit widerrufen.</span></label>`;
  status.before(feld);
  const input = feld.querySelector("input");
  let consent = null;
  input.addEventListener("change", () => {
    consent = input.checked ? window.CampusEinwilligung.erfassen() : null;
    input.removeAttribute("aria-invalid");
  });
  // Bei einem Personenwechsel gilt ein vorher gesetzter Haken nicht weiter.
  form.addEventListener("input", (event) => {
    if (!["name", "dealer_name", "dealer_number"].includes(event.target.name)) return;
    input.checked = false;
    consent = null;
  });
  window.CampusFeedbackEinwilligung = {
    nachweis() {
      if (!input.checked || !window.CampusEinwilligung.gueltig(consent)) {
        input.setAttribute("aria-invalid", "true");
        input.focus();
        throw new Error("Bitte vor dem Absenden dem Datenschutzhinweis zustimmen.");
      }
      return window.CampusEinwilligung.pruefen(consent);
    }
  };
})();
