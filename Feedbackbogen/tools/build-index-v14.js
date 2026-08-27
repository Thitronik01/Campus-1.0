/* Erzeugt index-v14.html. Einzige Wahrheitsquelle fuer Bewertungszeilen und Inseln.

   Gegenueber v13 geaendert:
   - Skala umgedreht: 5 ist die beste Note, 1 die schlechteste.
   - Neues Pflichtfeld Haendlernummer, genau fuenf Ziffern.
   - Inselnamen kommen aus dem Katalog des Wissenschecks, nicht mehr von hier.
*/
const fs = require('fs');
const P = require('path').resolve(__dirname, '..');

const ORGA = [
  ['kommunikation_vorfeld', 'Kommunikation &amp; Information im Vorfeld'],
  ['anmeldung_vorbereitung', 'Anmeldung &amp; Vorbereitung'],
  ['zeitplanung_tagesablauf', 'Zeitplanung &amp; Tagesablauf'],
  ['organisation_vor_ort', 'Organisation vor Ort'],
  ['raeumlichkeiten_technik', 'R&auml;umlichkeiten &amp; Technik'],
  ['bewirtung_haus', 'Bewirtung im Haus'],
  ['abendveranstaltung', 'Abendveranstaltung', 'Nicht teilgenommen'],
];
const SCHULUNG = [
  ['relevanz_themen', 'Relevanz der Themen'],
  ['verstaendlichkeit', 'Verst&auml;ndlichkeit der Inhalte'],
  ['praxisbezug', 'Praxisbezug'],
  ['produktvorfuehrungen', 'Produktvorf&uuml;hrungen &amp; Demonstrationen'],
  ['fragen', 'M&ouml;glichkeit f&uuml;r Fragen'],
  ['betreuung_thitronik', 'Betreuung durch THITRONIK'],
];
/* Die Inseln kommen aus dem Katalog des Wissenschecks. Vorher fuehrten der
   Bogen und das Quiz je eine eigene Liste, und sie liefen auseinander:
   Samsoe hiess hier 'Basisfahrzeuge, Gaswarner & Einbaupraxis' und dort
   'Einbauorte', Fehmarn 'Wichtige Supportthemen' gegen 'Fehlersuche &
   Support'. Ein Haendler las am selben Tag zwei Namen fuer dieselbe
   Station. */
const KATALOG = JSON.parse(fs.readFileSync(
  require('path').resolve(P, '..', 'Campus Quiz', 'public', 'data', 'inseln.json'), 'utf8'));

/* Der itemKey wandert in die Datenbank und bleibt deshalb, wie er war —
   auch das unregelmaessige insel_vejroe gegenueber dem Slug vejro. */
const ITEM_KEYS = {
  vejro: 'insel_vejroe', poel: 'insel_poel', hiddensee: 'insel_hiddensee',
  samsoe: 'insel_samsoe', fehmarn: 'insel_fehmarn', usedom: 'insel_usedom',
  langeland: 'insel_langeland', ruegen: 'insel_ruegen'
};

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const STEP_NAMES = ['Angaben', 'Eindruck', 'Organisation', 'Schulung', 'Inseln', 'Ausblick'];

const CATERING_SVG =
  '<svg viewBox="0 0 64 64" focusable="false" aria-hidden="true">' +
  '<path d="M12 42h40M18 39a14 14 0 0 1 28 0M32 24v-5M28 18h8M9 47h46"/></svg>';

/* Skalenrichtung seit v14: 5 ist die beste Note. Die Ziffern stehen weiter
   aufsteigend von links nach rechts, es wandert nur die Bedeutung mit den
   Ankern. Eine absteigende Reihe 5-4-3-2-1 waere die zweite Umgewoehnung in
   derselben Aenderung. */
function rate(key, label, naLabel) {
  const na = naLabel || 'Nicht beurteilt';
  const opts = [1, 2, 3, 4, 5].map((n) => {
    const aria = n === 5 ? '5 (sehr gut)' : n === 1 ? '1 (verbesserungsw&uuml;rdig)' : String(n);
    return `            <label class="rate__opt"><input type="radio" name="${key}" value="${n}" aria-label="${aria}"><span>${n}</span></label>`;
  }).join('\n');

  return `        <fieldset class="rate" data-rate>
          <legend class="rate__label">${label}</legend>
          <div class="rate__control">
            <div class="rate__options">
${opts}
            </div>
            <p class="rate__anchors" aria-hidden="true"><span>verbesserungsw&uuml;rdig</span><span>sehr gut</span></p>
            <label class="rate__na"><input type="radio" name="${key}" value="na"><span>${na}</span></label>
          </div>
          <div class="rate__comment" data-comment hidden>
            <label for="${key}_comment" class="rate__commentLabel" data-comment-label>Kommentar</label>
            <textarea id="${key}_comment" name="${key}_comment" maxlength="1200" rows="3" aria-describedby="${key}_help"></textarea>
            <p class="rate__commentHelp" id="${key}_help" data-comment-help>Optional</p>
          </div>
        </fieldset>`;
}

/* Die Rangmarke steht rechts, wo vorher die laufende Nummer der Insel stand.
   Sie traegt bewusst KEIN aria-hidden: als Teil des Label-Textes liest eine
   Vorlesesoftware beim Ankreuzen "... Platz 1" mit, sonst bliebe die einzige
   Rueckmeldung zur Reihenfolge rein visuell. Die Grossschreibung macht das
   CSS, damit der Text im Zugaenglichkeitsbaum normal geschrieben bleibt. */
function isle(value, inner) {
  return `          <label class="isle">
            <input type="checkbox" name="inseln" value="${value}">
            <span class="isle__box">
${inner}
              <span class="isle__slot"><span class="isle__rank" data-rank></span></span>
            </span>
          </label>`;
}

/* Der Wert der Kachel ist der Slug, nicht mehr die laufende Nummer. Die
   Reihenfolge folgt jetzt dem Katalog, und positionsgebundene Zahlen haetten
   dabei still ihre Bedeutung getauscht — aus der 4 waere Poel statt Usedom
   geworden, ohne dass irgendetwas gemeldet haette. */
const islandMarkup = KATALOG.inseln.map((insel) => isle(insel.slug,
  `              <span class="isle__thumb"><img src="assets/v12/islands/${insel.slug}.webp" alt="" width="90" height="76" loading="lazy" decoding="async"></span>
              <span class="isle__text"><strong>${esc(insel.name)}</strong><small>${esc(insel.title)}</small></span>`
)).join('\n');

/* Dieselben Angaben noch einmal als Daten, damit app-v14.js keine dritte
   Liste fuehren muss. Vorher stand dort islandDefinitions mit denselben
   Namen ein zweites Mal. */
const inselDaten = JSON.stringify(Object.fromEntries(
  KATALOG.inseln.map((i) => [i.slug, [ITEM_KEYS[i.slug], i.name]])
    .concat([['ruegen', [ITEM_KEYS.ruegen, 'Rügen']]])
));

const cateringMarkup = isle('ruegen',
  `              <span class="isle__thumb isle__thumb--icon">${CATERING_SVG}</span>
              <span class="isle__text"><strong>R&uuml;gen</strong><small>Catering</small></span>`
);

const stepList = STEP_NAMES.map((name, i) => {
  const n = i + 1;
  return `        <li data-step="${n}"><button type="button" data-goto="${n}" disabled>` +
    `<span class="sr-only">Schritt ${n}: </span><span class="steps__label">${name}</span></button></li>`;
}).join('\n');

const html = `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="color-scheme" content="light">
  <meta name="theme-color" content="#1D3661">
  <meta name="description" content="THITRONIK Campus 2026 - Feedbackbogen f&uuml;r H&auml;ndlerinnen und H&auml;ndler.">
  <title>Campus 2026 Feedback | THITRONIK</title>
  <link rel="icon" href="assets/thitronik-logo.png" sizes="any">
  <link rel="preload" as="image" href="assets/v12/hero-1024.webp"
    imagesrcset="assets/v12/hero-640.webp 640w, assets/v12/hero-1024.webp 1024w, assets/v12/hero-1600.webp 1600w"
    imagesizes="(max-width: 1228px) calc(100vw - 28px), 1200px" fetchpriority="high">
  <link rel="stylesheet" href="styles-v14.css">
</head>
<body data-build="v14">
  <a class="skip" href="#panel-1">Direkt zum Feedbackbogen</a>

  <noscript>
    <p class="noscript">Dieser Feedbackbogen ben&ouml;tigt JavaScript. Bitte aktiviere es oder wende dich
      an das THITRONIK Team.</p>
  </noscript>

  <header class="masthead">
    <div class="shell masthead__bar">
      <a class="masthead__home" href="/quiz" aria-label="Zur Campus-Karte">
        <img class="masthead__logo" src="assets/thitronik-logo.png" alt="THITRONIK" width="485" height="118">
        <span>Zur Campus-Karte</span>
      </a>
      <span class="masthead__tag">Campus 2026</span>
    </div>
  </header>

  <div class="rail" id="rail" hidden>
    <div class="shell rail__inner">
      <div class="rail__head">
        <p class="rail__now">
          <span class="rail__step">Schritt <span id="railStep">1</span> von 6</span>
          <strong id="railName">Angaben</strong>
        </p>
        <p class="rail__count" id="railCount">0 von 18 beantwortet</p>
      </div>
      <ol class="steps" id="steps" aria-label="Fortschritt">
${stepList}
      </ol>
    </div>
  </div>

  <p class="sr-only" id="stepAnnounce" role="status" aria-live="polite"></p>

  <main class="main shell">

    <section class="intro panel" id="panel-0" data-panel="0" tabindex="-1">
      <div class="intro__media">
        <img
          src="assets/v12/hero-1024.webp"
          srcset="assets/v12/hero-640.webp 640w, assets/v12/hero-1024.webp 1024w, assets/v12/hero-1600.webp 1600w"
          sizes="(max-width: 1228px) calc(100vw - 28px), 1200px"
          alt="Teilnehmende der THITRONIK Campusschulung w&auml;hrend eines Programmpunkts."
          width="1600" height="558" fetchpriority="high" decoding="async">
        <span class="intro__time">ca. 4 bis 6 Minuten</span>
      </div>
      <div class="intro__copy">
        <h1>Dein Feedback zum <br>THITRONIK Campus 2026</h1>
        <p class="intro__lead">Deine R&uuml;ckmeldung entscheidet, wie der n&auml;chste Campus aussieht.</p>

        <ul class="intro__facts">
          <li><b>6</b> kurze Schritte</li>
          <li><b>3</b> Pflichtangaben</li>
          <li><b>&#8617;</b> jederzeit zur&uuml;ck</li>
        </ul>

        <p class="intro__privacy">Dein Entwurf bleibt auf diesem Ger&auml;t. Erst beim Absenden wird dein Feedback &uuml;bertragen.</p>

        <p class="draft" id="draftNote" hidden>
          <span>Wir haben deinen Entwurf gefunden. Du machst dort weiter, wo du aufgeh&ouml;rt hast.</span>
          <button type="button" id="draftClear">Neu beginnen</button>
        </p>

        <button type="button" class="intro__start" id="startButton">Feedback starten</button>
      </div>
    </section>

    <form id="feedbackForm" class="form" name="campus-feedback" method="POST" action="/feedback/"
      data-netlify="true" data-netlify-honeypot="website" autocomplete="on"
      data-form-version="campus-2026-haendler-v14" novalidate>
      <input type="hidden" name="form-name" value="campus-feedback">
      <input type="hidden" id="netlifyPayload" name="payload">
      <div class="hp" aria-hidden="true">
        <label for="website">Website</label>
        <input id="website" name="website" type="text" autocomplete="off" tabindex="-1">
      </div>

      <section class="card panel" id="panel-1" data-panel="1" tabindex="-1" aria-labelledby="section-1-title" hidden>
        <div class="card__head">
          <span class="card__no" aria-hidden="true">1</span>
          <h2 id="section-1-title">Angaben zum H&auml;ndlerbetrieb</h2>
        </div>
        <p class="card__note">Damit wir R&uuml;ckmeldungen mehrerer Teilnehmender eines Betriebs zuordnen k&ouml;nnen.
          Die H&auml;ndlernummer findest du auf deinen Rechnungen und Lieferscheinen.</p>

        <p class="draft__note" id="quiz-uebernahme" hidden>Wir haben deine Angaben aus dem Wissenscheck
          &uuml;bernommen. Stimmt etwas nicht, &auml;ndere es einfach.</p>

        <div class="grid grid--angaben">
          <div class="field">
            <label for="dealer_name">H&auml;ndlerbetrieb <span class="req" aria-hidden="true">Pflicht</span></label>
            <input id="dealer_name" name="dealer_name" type="text" autocomplete="organization"
              enterkeyhint="next" minlength="2" maxlength="160" required aria-describedby="dealer_err">
            <p class="field__err" id="dealer_err" data-err hidden></p>
          </div>
          <!-- type="text" statt type="number": eine Haendlernummer ist eine
               Ziffernfolge, keine Rechengroesse. type="number" wuerde eine
               fuehrende Null verschlucken (03451 wird 3451), blendet Drehpfeile
               ein und laesst sich versehentlich mit dem Mausrad verstellen.
               inputmode holt auf dem Smartphone trotzdem den Ziffernblock.

               BEWUSST OHNE maxlength: das Attribut kappt schon beim Einfuegen
               auf fuenf ZEICHEN, bevor der Ziffernfilter in app-v14.js die
               Nicht-Ziffern entfernen kann. Aus eingefuegtem " 34512" wurde so
               " 3451" und daraus "3451" - eine Ziffer weg, und der Teilnehmer
               liest "genau fuenf Ziffern", obwohl er fuenf eingefuegt hat.
               Die Begrenzung auf fuenf macht der Filter, in der richtigen
               Reihenfolge: erst putzen, dann kappen. -->
          <div class="field field--num">
            <label for="dealer_number">H&auml;ndlernummer <span class="req" aria-hidden="true">Pflicht</span></label>
            <input id="dealer_number" name="dealer_number" type="text" inputmode="numeric"
              autocomplete="off" enterkeyhint="next" pattern="[0-9]{5}"
              placeholder="34512" required aria-describedby="dealer_number_hint dealer_number_err">
            <p class="field__hint" id="dealer_number_hint">F&uuml;nf Ziffern</p>
            <p class="field__err" id="dealer_number_err" data-err hidden></p>
          </div>
          <div class="field field--wide">
            <label for="name">Dein Name <span class="req" aria-hidden="true">Pflicht</span></label>
            <input id="name" name="name" type="text" autocomplete="name"
              enterkeyhint="done" minlength="2" maxlength="120" required aria-describedby="name_err">
            <p class="field__err" id="name_err" data-err hidden></p>
          </div>
        </div>

        <fieldset class="chips">
          <legend>Aus welchem Bereich kommst du? <span class="hint">Mehrfachauswahl m&ouml;glich</span></legend>
          <div class="chips__row">
            <label class="chip"><input type="checkbox" name="bereich" value="Gesch&auml;ftsf&uuml;hrung"><span>Gesch&auml;ftsf&uuml;hrung</span></label>
            <label class="chip"><input type="checkbox" name="bereich" value="Verkauf"><span>Verkauf</span></label>
            <label class="chip"><input type="checkbox" name="bereich" value="Werkstatt"><span>Werkstatt</span></label>
            <label class="chip"><input type="checkbox" name="bereich" value="Service"><span>Service</span></label>
          </div>
        </fieldset>
      </section>

      <section class="card panel" id="panel-2" data-panel="2" tabindex="-1" aria-labelledby="section-2-title" hidden>
        <div class="card__head">
          <span class="card__no" aria-hidden="true">2</span>
          <h2 id="section-2-title">Wie zufrieden warst du insgesamt?</h2>
        </div>
        <p class="card__note">Dein spontaner Gesamteindruck vom Campus.</p>

        <fieldset class="overall">
          <legend class="sr-only">Gesamtzufriedenheit</legend>
          <div class="overall__row">
            <label class="overall__opt"><input type="radio" name="overall" value="Sehr zufrieden"><span>Sehr zufrieden</span></label>
            <label class="overall__opt"><input type="radio" name="overall" value="Zufrieden"><span>Zufrieden</span></label>
            <label class="overall__opt"><input type="radio" name="overall" value="Teils/teils"><span>Teils / teils</span></label>
            <label class="overall__opt"><input type="radio" name="overall" value="Eher unzufrieden"><span>Eher unzufrieden</span></label>
            <label class="overall__opt"><input type="radio" name="overall" value="Unzufrieden"><span>Unzufrieden</span></label>
          </div>
        </fieldset>
      </section>

      <section class="card panel" id="panel-3" data-panel="3" tabindex="-1" aria-labelledby="section-3-title" hidden>
        <div class="card__head">
          <span class="card__no" aria-hidden="true">3</span>
          <h2 id="section-3-title">Organisation &amp; Ablauf</h2>
          <p class="card__tally" data-tally="3" role="status" aria-live="polite">0 von 7</p>
        </div>
        <p class="card__note">5 ist die beste Bewertung. Bei einer 1 bitten wir um einen kurzen Hinweis.</p>
        <div class="rates">
${ORGA.map((r) => rate(r[0], r[1], r[2])).join('\n\n')}
        </div>
      </section>

      <section class="card panel" id="panel-4" data-panel="4" tabindex="-1" aria-labelledby="section-4-title" hidden>
        <div class="card__head">
          <span class="card__no" aria-hidden="true">4</span>
          <h2 id="section-4-title">Inhalte &amp; Durchf&uuml;hrung</h2>
          <p class="card__tally" data-tally="4" role="status" aria-live="polite">0 von 6</p>
        </div>
        <p class="card__note">Wie relevant und hilfreich waren die Inhalte f&uuml;r deinen H&auml;ndleralltag?</p>
        <div class="rates">
${SCHULUNG.map((r) => rate(r[0], r[1], r[2])).join('\n\n')}
        </div>
      </section>

      <section class="card panel" id="panel-5" data-panel="5" tabindex="-1" aria-labelledby="section-5-title" hidden>
        <div class="card__head">
          <span class="card__no" aria-hidden="true">5</span>
          <h2 id="section-5-title">Deine Top 3 der Campus-Inseln</h2>
          <p class="card__tally" data-tally="isles" role="status" aria-live="polite">0 von 3</p>
        </div>
        <p class="card__note">W&auml;hle bis zu drei Inseln in der Reihenfolge, die dir am besten gefallen hat.
          Die Reihenfolge deiner Auswahl ergibt Platz 1 bis 3.</p>

        <div class="isles">
          <fieldset class="isles__list">
            <legend class="sr-only">Favorisierte Campus-Inseln, bis zu drei</legend>
${islandMarkup}
${cateringMarkup}
          </fieldset>
          <figure class="isles__poster">
            <img src="assets/v12/inselhopping-700.webp"
              srcset="assets/v12/inselhopping-700.webp 700w, assets/v12/inselhopping-1100.webp 1100w"
              sizes="(max-width: 1100px) 90vw, 440px"
              alt="" width="700" height="1050" loading="lazy" decoding="async">
          </figure>
        </div>
      </section>

      <section class="card panel" id="panel-6" data-panel="6" tabindex="-1" aria-labelledby="section-6-title" hidden>
        <div class="card__head">
          <span class="card__no" aria-hidden="true">6</span>
          <h2 id="section-6-title">Was sollen wir mitnehmen?</h2>
        </div>
        <p class="card__note">Hier ist Platz f&uuml;r das, was in einer Zahl nicht sichtbar wird. Alles freiwillig.</p>

        <div class="grid grid--2">
          <div class="field">
            <label for="positive_aspekte">Was hat besonders gut funktioniert?</label>
            <textarea id="positive_aspekte" name="positive_aspekte" maxlength="2000" rows="4"></textarea>
          </div>
          <div class="field">
            <label for="verbesserungen">Hast du Verbesserungsvorschl&auml;ge?</label>
            <textarea id="verbesserungen" name="verbesserungen" maxlength="2000" rows="4"></textarea>
          </div>
          <div class="field">
            <label for="themenwuensche">Welche Themen w&uuml;nschst du dir in Zukunft?</label>
            <textarea id="themenwuensche" name="themenwuensche" maxlength="2000" rows="4"></textarea>
          </div>
          <div class="field">
            <label for="weitere_anmerkungen">Weitere Anmerkungen</label>
            <textarea id="weitere_anmerkungen" name="weitere_anmerkungen" maxlength="2000" rows="4"></textarea>
          </div>
        </div>

        <!-- Reihenfolge bewusst: erst das Textfeld, danach die Auswahl per Tipp.
             Sonst steht am Ende die Tastatur offen und verdeckt den Absenden-Knopf. -->
        <div class="field recommend__why">
          <label for="weiterempfehlung_grund">Was ist der wichtigste Grund f&uuml;r deine Einsch&auml;tzung?</label>
          <textarea id="weiterempfehlung_grund" name="weiterempfehlung_grund" maxlength="1600" rows="3"></textarea>
        </div>

        <fieldset class="recommend">
          <legend>W&uuml;rdest du die Campus-Schulung weiterempfehlen?</legend>
          <div class="recommend__row">
            <label class="chip"><input type="radio" name="weiterempfehlung" value="Ja"><span>Ja</span></label>
            <label class="chip"><input type="radio" name="weiterempfehlung" value="Vielleicht"><span>Vielleicht</span></label>
            <label class="chip"><input type="radio" name="weiterempfehlung" value="Nein"><span>Nein</span></label>
          </div>
        </fieldset>

        <div class="missing" id="missingBox" hidden>
          <p class="missing__head">Diese Angaben fehlen noch:</p>
          <ul class="missing__list" id="missingList"></ul>
        </div>
        <p class="send__note">Deine R&uuml;ckmeldung wird sicher im Campus-Projekt gespeichert und nur f&uuml;r die Auswertung verwendet.</p>
        <p class="send__status" id="statusMessage" role="status" aria-live="polite"></p>
      </section>
    </form>
  </main>

  <nav class="stepbar" id="stepbar" aria-label="Schrittnavigation" hidden>
    <div class="shell stepbar__inner">
      <button type="button" class="stepbar__back" id="backButton">Zur&uuml;ck</button>
      <button type="button" class="stepbar__next" id="nextButton">
        <span class="stepbar__spin" aria-hidden="true"></span>
        <span id="nextLabel">Weiter</span>
      </button>
    </div>
  </nav>

  <footer class="foot" id="foot">
    <div class="shell foot__inner">
      <span>THITRONIK Campus 2026</span>
      <span>Feedback f&uuml;r H&auml;ndler</span>
    </div>
  </footer>

  <div class="done" id="thankYouScreen" role="dialog" aria-modal="true" aria-labelledby="thankYouTitle" tabindex="-1" hidden>
    <div class="done__inner">
      <img class="done__logo" src="assets/thitronik-logo.png" alt="THITRONIK" width="485" height="118">
      <p class="done__check" aria-hidden="true">&#10003;</p>
      <h2 id="thankYouTitle">Vielen Dank, <span id="thankYouName">Teilnehmer</span></h2>
      <p class="done__lead">Dein Feedback ist bei uns angekommen.</p>
      <div class="done__card">
        <strong>Deine Teilnahmeurkunde wartet auf dich.</strong>
        <p>Zeig diese Best&auml;tigung vorne an der Garderobe, als Screenshot oder direkt auf deinem
          Smartphone. Dort erh&auml;ltst du deine pers&ouml;nliche Urkunde.</p>
      </div>
      <a class="done__back" href="/quiz">Zur&uuml;ck zur Campus-Karte</a>
    </div>
  </div>

  <script type="application/json" id="insel-daten">${inselDaten}</script>
  <script src="app-v14.js" defer></script>
  <!-- Dekoration, bewusst nach dem Formular: der Bogen soll bedienbar sein,
       bevor der Hintergrund kommt. Faellt er aus, aendert sich sonst nichts. -->
  <script src="rays-v14.js" defer></script>
</body>
</html>
`;

fs.writeFileSync(`${P}/index-v14.html`, html, 'utf8');
console.log('index-v14.html:', html.length, 'Zeichen');
