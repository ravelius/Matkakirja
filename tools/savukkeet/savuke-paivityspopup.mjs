/*
 * Savuke: päivityksen jälkeinen popup.
 *  1. Ensikäynti (ei tallennettua versiota) → EI popupia.
 *  2. Laitteella vanha versio → popup, jossa täsmälleen 2 riviä,
 *     uusin versio ensin; Jatka sulkee.
 *  3. Toinen lataus samalla versiolla → EI popupia.
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

// Playwright repon node_modulesista, muuten kontin globaalista (README).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const TYYPIT = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp' };
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto) => { kaikki += 1; if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi}`); };

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({ viewport: { width: 390, height: 844 } });
const sivu = await ctx.newPage();

// 1. Ensikäynti
await sivu.goto(osoite, { waitUntil: 'load' });
await sivu.waitForTimeout(800);
vaadi('ensikäynnillä ei popupia', !(await sivu.locator('#paivitys-dialog[open]').count()));

// 2. Vanha versio laitteella
await sivu.evaluate(() => localStorage.setItem('matkakirja-nahty-versio', '2026-08-13.1'));
await sivu.reload({ waitUntil: 'load' });
await sivu.waitForTimeout(800);
vaadi('päivityksen jälkeen popup auki', (await sivu.locator('#paivitys-dialog[open]').count()) === 1);
const rivit = await sivu.locator('#paivitys-lista li').allTextContents();
vaadi('täsmälleen 2 riviä', rivit.length === 2);
const nykyinen = await sivu.evaluate(() => Number(document.getElementById('versio-kulma').textContent.match(/\d+/)[0]));
vaadi(`ylin rivi on nykyinen versio v${nykyinen}`, rivit[0]?.startsWith(`v${nykyinen}`));
vaadi('rivit eivät ole tyhjiä', rivit.every((r) => r.replace(/^v\d+/, '').trim().length > 5));
await sivu.click('#paivitys-sulje');
vaadi('Jatka sulkee popupin', !(await sivu.locator('#paivitys-dialog[open]').count()));

// 3. Toinen lataus samalla versiolla
await sivu.reload({ waitUntil: 'load' });
await sivu.waitForTimeout(800);
vaadi('samalla versiolla ei popupia', !(await sivu.locator('#paivitys-dialog[open]').count()));

await sivu.screenshot({ path: '/tmp/claude-0/-home-user-Matkakirja/c5b894db-1cea-56f5-9739-4e6b1ebb57bd/scratchpad/paivityspopup.png' });
await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi.`);
process.exit(lapi === kaikki ? 0 : 1);
