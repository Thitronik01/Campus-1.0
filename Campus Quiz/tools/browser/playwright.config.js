import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: '.', testMatch: '*.spec.js', timeout: 60000,
  expect: { timeout: 7000 }, workers: 2, retries: 0, forbidOnly: true,
  reporter: [['list'], ['html', { outputFolder: 'bericht', open: 'never' }]],
  outputDir: 'ergebnisse',
  use: {
    baseURL: 'http://127.0.0.1:8876', browserName: 'chromium',
    locale: 'de-DE', timezoneId: 'Europe/Berlin', reducedMotion: 'reduce',
    serviceWorkers: 'block', trace: 'retain-on-failure', screenshot: 'only-on-failure'
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 1000 } } },
    { name: 'tablet', use: { viewport: { width: 820, height: 1180 }, hasTouch: true } },
    { name: 'handy', use: { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true } },
    { name: 'handy-klein', use: { viewport: { width: 320, height: 740 }, hasTouch: true, isMobile: true } }
  ],
  webServer: {
    command: 'node serve.mjs', url: 'http://127.0.0.1:8876/__bereit',
    reuseExistingServer: false, timeout: 15000
  }
});
