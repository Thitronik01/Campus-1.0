import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const cwd = fileURLToPath(new URL('.', import.meta.url));
function run(bin, args) {
  const r = spawnSync(bin, args, { cwd, stdio: 'inherit', windowsHide: true });
  if (r.status !== 0) { if (r.error) console.error(r.error.message); process.exit(r.status || 1); }
}
if (!fs.existsSync(new URL('node_modules/@playwright/test/cli.js', import.meta.url))) {
  if (!process.env.CI) {
    console.error('FEHLT Browserwerkzeuge. Einmalig in Campus Quiz/tools/browser: npm ci; danach node node_modules/@playwright/test/cli.js install chromium');
    process.exit(1);
  }
  run(process.platform === 'win32' ? 'cmd.exe' : 'npm', process.platform === 'win32' ? ['/c', 'npm', 'ci', '--no-audit', '--no-fund'] : ['ci', '--no-audit', '--no-fund']);
}
if (process.env.CI) run(process.execPath, ['node_modules/@playwright/test/cli.js', 'install', ...(process.platform === 'linux' ? ['--with-deps'] : []), 'chromium']);
run(process.execPath, ['node_modules/@playwright/test/cli.js', 'test', ...process.argv.slice(2)]);
