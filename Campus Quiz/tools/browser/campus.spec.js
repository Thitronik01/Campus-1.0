import { test as basis, expect } from '@playwright/test';
import fs from 'node:fs';

// Neben demo=1 verhindert diese Netzsperre selbst bei einer Regression jeden
// echten API-Aufruf. Ein Übertragungsversuch lässt den Test trotzdem scheitern.
const test = basis.extend({
  page: async ({ page, context }, use) => {
    const probleme = [];
    page.on('pageerror', error => probleme.push(error.message));
    page.on('response', response => { if (response.status() >= 400) probleme.push(`${response.status()} ${response.url()}`); });
    await context.route('**/*', async route => {
      const req = route.request(), url = new URL(req.url());
      if (!['http:','https:'].includes(url.protocol)) return route.continue();
      if (url.origin !== 'http://127.0.0.1:8876' || !['GET','HEAD'].includes(req.method())) {
        probleme.push(`Unerlaubte Anfrage: ${req.method()} ${url.origin}${url.pathname}`);
        return route.abort();
      }
      if (req.isNavigationRequest() && /^\/(quiz|feedback|arbeitskarte)(\/|$)/.test(url.pathname) && url.searchParams.get('demo') !== '1') {
        probleme.push(`Demo-Modus verloren: ${url.pathname}`); return route.abort();
      }
      return route.continue();
    });
    await use(page);
    expect(probleme, 'Keine Skript-, Medien- oder Übertragungsfehler').toEqual([]);
  }
});

async function ohneUeberlauf(page) {
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
}
async function bedienbar(locator) {
  await expect(locator).toBeVisible();
  const box = await locator.boundingBox();
  expect(box.width).toBeGreaterThanOrEqual(43.5);
  expect(box.height).toBeGreaterThanOrEqual(43.5);
}
async function profil(page, url = '/quiz?demo=1') {
  await page.goto(url);
  await expect(page.locator('#profile-submit')).toBeDisabled();
  await page.locator('#profile-first-name').fill('Demo');
  await page.locator('#profile-last-name').fill('Browserprüfung');
  await page.locator('#profile-company').fill('Demobetrieb');
  await page.locator('#profile-number').fill('00000');
  await expect(page.locator('#profile-submit')).toBeDisabled();
  await page.locator('#profile-privacy').check();
  await page.locator('#profile-submit').click();
}
async function arbeitskarte(page) {
  await page.goto('/arbeitskarte/?demo=1');
  await page.locator('[data-tab="material"]').click();
  await page.locator('#konfigurator-fahrzeug').selectOption('654');
  await page.locator('[data-material-id="2"] [data-material-variant]').selectOption('151');
  await page.locator('[data-material-id="2"] [data-material-planned]').click();
  await expect(page.locator('[data-add-suggestion="regel-203"]')).toBeVisible();
}

test('Inseln sind erreichbar, beschriftet und per Tastatur auswählbar', async ({ page }) => {
  await profil(page);
  await expect(page.locator('#screen-islands')).toBeVisible();
  await ohneUeberlauf(page);
  const mobil = page.viewportSize().width < 768;
  const buttons = page.locator(mobil ? '.orbit-thumb' : '#island-grid .island-card');
  await expect(buttons).toHaveCount(7);
  for (const button of await buttons.all()) {
    await bedienbar(button);
    await button.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#orbit-start')).toHaveAttribute('href', /\/quiz\/[^?]+\?demo=1/);
  }
  await bedienbar(page.locator('#orbit-start'));
  await page.locator('#orbit-start').click();
  await expect(page.locator('#btn-start')).toBeVisible();
  await ohneUeberlauf(page);
});

test('Quizabbruch lässt sich mit Escape abbrechen und danach fortsetzen', async ({ page }) => {
  await profil(page, '/quiz/vejro?demo=1');
  await page.locator('#btn-start').click();
  await page.locator('#btn-abort').click();
  await expect(page.locator('#abort-dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('#abort-dialog')).not.toBeVisible();
  await expect(page.locator('#screen-quiz')).toBeVisible();
  await page.locator('#q-input .answer, #q-input .order-item').first().focus();
  await page.keyboard.press('Enter');
  await ohneUeberlauf(page);
});

const fragen = JSON.parse(fs.readFileSync(new URL('../../public/data/inseln/vejro.json', import.meta.url))).questions;
async function quizRunde(page, anzahl) {
  for (let i = 0; i < anzahl; i++) {
    const prompt = await page.locator('#q-title').textContent();
    const frage = fragen.find(q => q.prompt === prompt);
    expect(frage).toBeTruthy();
    if (frage.type === 'order') {
      for (const button of await page.locator('#q-input .order-item').all()) await button.click();
    } else {
      // Absichtlich falsche Einzelwahl: Die Wiederholung muss sicher erscheinen.
      const falsch = frage.options.find(o => !frage.correct.includes(o.id));
      await page.locator(`#q-input .answer[data-id="${falsch.id}"]`).click();
    }
    await bedienbar(page.locator('#btn-check'));
    await page.locator('#btn-check').click();
    await expect(page.locator('#screen-quiz')).toHaveAttribute('data-revealed', 'true');
    await ohneUeberlauf(page);
    // Die Oberfläche sperrt Doppeltipps für 450 ms, auch bei reduzierter Bewegung.
    await page.waitForTimeout(500);
    await page.locator('#btn-check').click();
  }
  await expect(page.locator('#screen-result')).toBeVisible();
}
test('Vollständiges Quiz und gezieltes Nachlernen ohne Datenübertragung', async ({ page }) => {
  await profil(page, '/quiz/vejro?demo=1');
  await page.locator('#btn-start').click();
  await quizRunde(page, 10);
  await expect(page.locator('#r-save')).toContainText('absichtlich nichts gespeichert');
  const count = Number((await page.locator('#btn-wrong-only').textContent()).match(/^\d+/)[0]);
  expect(count).toBeGreaterThan(0);
  await page.locator('#btn-wrong-only').click();
  await expect(page.locator('#q-mode')).toContainText('Übungsrunde');
  await expect(page.locator('#q-counter')).toHaveText(`Frage 1 von ${count}`);
  await quizRunde(page, count);
  await expect(page.locator('#r-save')).toContainText('nicht zusätzlich gespeichert');
  await ohneUeberlauf(page);
});

test('Arbeitskarte ergänzt, filtert und erhält ihren Stand nach Neuladen', async ({ page }) => {
  await arbeitskarte(page);
  await page.locator('[data-material-filter="pruefen"]').click();
  await expect(page.locator('[data-material-id]')).toHaveCount(1);
  await bedienbar(page.locator('[data-add-suggestion="regel-203"]'));
  await page.locator('[data-add-suggestion="regel-203"]').click();
  await expect(page.locator('[data-add-suggestion="regel-203"]')).toHaveCount(0);
  await page.locator('[data-material-filter="geplant"]').click();
  await expect(page.locator('[data-material-id]')).toHaveCount(2);
  await expect(page.locator('[data-material-id="49"] [data-material-installed]')).toHaveAttribute('aria-pressed', 'false');
  await page.locator('#material-search').fill('105339');
  await expect(page.locator('[data-material-id]')).toHaveCount(1);
  await page.locator('#btn-save').click();
  await page.reload();
  await page.locator('[data-tab="material"]').click();
  await expect(page.locator('#konfigurator-fahrzeug')).toHaveValue('654');
  await expect(page.locator('[data-material-id="49"] [data-material-planned]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('[data-material-id="2"] [data-material-variant]')).toHaveValue('151');
  await ohneUeberlauf(page);
});

test('Arbeitskarte schützt Abschluss und entwertet alten Prüfvermerk', async ({ page }) => {
  await arbeitskarte(page);
  await page.locator('[data-tab="uebergabe"]').click();
  await page.locator('#btn-finalize').click();
  await expect(page.locator('#konfigurator-heading')).toBeFocused();
  await page.locator('.ak-konfigurator summary').click();
  await page.locator('[data-path="konfigurator.pruefvermerk"]').fill('Demoprüfung: Ausstattung fachlich geklärt.');
  await expect(page.locator('.ak-check-status')).toContainText('Prüfvermerk aktuell');
  await page.locator('[data-material-id="2"] [data-material-count]').fill('2');
  await page.keyboard.press('Tab');
  await expect(page.locator('.ak-check-status')).not.toContainText('Prüfvermerk aktuell');
});

test('Materialfilter und Verlauf funktionieren mit Tab, Enter und Escape', async ({ page }) => {
  await arbeitskarte(page);
  await page.locator('[data-material-filter="alle"]').focus();
  await page.keyboard.press('Tab');
  await expect(page.locator('[data-material-filter="geplant"]')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('[data-material-id]')).toHaveCount(1);
  await page.locator('#btn-history').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#history-dialog')).toBeVisible();
  await page.keyboard.press('Tab');
  expect(await page.locator('#history-dialog').evaluate(e => e.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(page.locator('#history-dialog')).not.toBeVisible();
  await expect(page.locator('#btn-history')).toBeFocused();
});

test('Feedback validiert Pflichtfelder und setzt den Entwurf nach Neuladen fort', async ({ page }) => {
  await page.goto('/feedback/?demo=1');
  await page.locator('#startButton').click();
  await page.locator('#nextButton').click();
  await expect(page.locator('#panel-1')).toBeVisible();
  await expect(page.locator('#dealer_err')).toBeVisible();
  await page.locator('#dealer_name').fill('Demobetrieb');
  await page.locator('#dealer_number').fill('00000');
  await page.locator('#name').fill('Demo Browserprüfung');
  await page.locator('#nextButton').click();
  await expect(page.locator('#panel-2')).toBeVisible();
  await page.locator('label').filter({ has: page.locator('input[name="overall"][value="Zufrieden"]') }).click();
  await page.locator('#nextButton').click();
  await expect(page.locator('#panel-3')).toBeVisible();
  await page.reload();
  await expect(page.locator('#panel-3')).toBeVisible();
  await expect(page.locator('#dealer_name')).toHaveValue('Demobetrieb');
  await expect(page.locator('input[name="overall"][value="Zufrieden"]')).toBeChecked();
  await page.goto('/feedback/?demo=1');
  await expect(page.locator('#draftNote')).toBeVisible();
  await page.locator('#startButton').click();
  await expect(page.locator('#panel-3')).toBeVisible();
  await ohneUeberlauf(page);
});

test('Feedback durchläuft sechs Schritte und verlangt Einwilligung', async ({ page }) => {
  await page.goto('/feedback/?demo=1');
  await page.locator('#startButton').focus();
  await page.keyboard.press('Enter');
  await page.locator('#dealer_name').fill('Demobetrieb');
  await page.locator('#dealer_number').fill('00000');
  await page.locator('#name').fill('Demo Browserprüfung');
  for (let n = 1; n < 6; n++) {
    await expect(page.locator(`#panel-${n}`)).toBeVisible();
    await bedienbar(page.locator('#nextButton'));
    await ohneUeberlauf(page);
    await page.locator('#nextButton').click();
  }
  await expect(page.locator('#panel-6')).toBeVisible();
  await page.locator('#nextButton').click();
  await expect(page.locator('#thankYouScreen')).not.toBeVisible();
  await expect(page.locator('#feedback-privacy')).toHaveAttribute('aria-invalid', 'true');
  await page.locator('#feedback-privacy').check();
  await page.locator('#nextButton').click();
  await expect(page.locator('#thankYouScreen')).toBeVisible();
  await expect(page.locator('#thankYouName')).toContainText('Demo');
  await ohneUeberlauf(page);
});
