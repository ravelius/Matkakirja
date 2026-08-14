/*
 * Savuke: päiväkirjan valokuvapostikortti ei sulkeudu matkakirjan
 * napautuksesta (fact-card, topbar) — mutta sulkeutuu kartasta.
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
let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => { kaikki += 1; if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`); };
const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const sivu = await (await selain.newContext({ viewport: { width: 834, height: 1194 } })).newPage();
await sivu.goto(`http://localhost:${palvelin.address().port}/`, { waitUntil: 'load' });
await sivu.waitForTimeout(1500);
const tulos = await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  const nayta = async () => {
    // Rakennetaan kortti suoraan: verkkokuvia ei ladata testissä.
    ui.suljePostikortti();
    const kortti = document.createElement('div');
    kortti.className = 'postikortti';
    kortti.appendChild(document.createElement('div')).className = 'postikortti-kortti';
    kortti.style.left = '50%'; kortti.style.top = '50%';
    document.body.appendChild(kortti);
    ui.postikortti = kortti;
    document.addEventListener('pointerdown', ui.postikorttiSulkija, { capture: true });
    await odota(50);
  };
  const napauta = (el) => {
    el.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, composed: true }));
  };
  await nayta();
  napauta(document.querySelector('.fact-card') ?? document.body);
  const paivakirjanJalkeen = Boolean(document.querySelector('body > .postikortti'));
  napauta(document.querySelector('.topbar'));
  const palkinJalkeen = Boolean(document.querySelector('body > .postikortti'));
  napauta(document.querySelector('.map-pane svg') ?? document.body);
  await odota(50);
  const kartanJalkeen = Boolean(document.querySelector('body > .postikortti'));
  ui.suljePostikortti();
  return { paivakirjanJalkeen, palkinJalkeen, kartanJalkeen };
});
vaadi('päiväkirjan napautus ei sulje valokuvaa', tulos.paivakirjanJalkeen === true, JSON.stringify(tulos));
vaadi('yläpalkin napautus ei sulje valokuvaa', tulos.palkinJalkeen === true, JSON.stringify(tulos));
vaadi('kartan napautus sulkee valokuvan', tulos.kartanJalkeen === false, JSON.stringify(tulos));
await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi.`);
process.exit(lapi === kaikki ? 0 : 1);
