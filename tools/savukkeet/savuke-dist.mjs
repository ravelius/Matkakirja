import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

// Playwright repon node_modulesista, muuten kontin globaalista (README).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const palvelin = createServer(async (req, res) => {
  const data = await readFile(new URL('../../dist/matkakirja.html', import.meta.url));
  res.writeHead(200, { 'content-type': 'text/html' }); res.end(data);
});
await new Promise((ok) => palvelin.listen(8139, ok));
const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const sivu = await (await selain.newContext({ serviceWorkers: 'block' })).newPage();
await sivu.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());
const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e).slice(0, 150)));
await sivu.goto('http://localhost:8139/', { waitUntil: 'domcontentloaded' });
await sivu.waitForTimeout(4000);
console.log('DIST', JSON.stringify(await sivu.evaluate(() => ({
  peli: Boolean(window.matkakirja?.game), animaatiot: document.getAnimations().length,
}))));
console.log('VIRHEET', JSON.stringify(virheet));
await selain.close(); palvelin.close();
