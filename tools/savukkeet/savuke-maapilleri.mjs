/*
 * Savuke: maapilleri ei jää kummittelemaan uuden pelin alle.
 *  1. Pelissä on täsmälleen yksi pilleri.
 *  2. destroy() poistaa pillerin DOM:ista.
 *  3. Orpo pilleri siivotaan, kun uusi luodaan (varmistushaara).
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
const vaadi = (nimi, ehto, lisa = '') => { kaikki += 1; if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`); };

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({ viewport: { width: 834, height: 1194 } });
const sivu = await ctx.newPage();
await sivu.goto(osoite, { waitUntil: 'load' });
await sivu.waitForTimeout(1500);

const tulos = await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  const pane = ui.mapPane;
  // Kutsutaan päivitystä suoraan kuten tarkista-maakyltit tekee —
  // muotojen asynkronista latausta ei tarvitse odottaa.
  ui.paivitaMaaPilleri({ nimi: 'Testimaa' }, 'TST');
  const alussa = pane.querySelectorAll('.maa-pilleri').length;
  // Varmistushaara: istutetaan orpo pilleri ja pakotetaan uusi luonti
  // (kuin edellinen UI olisi jäänyt purkamatta).
  const orpo = document.createElement('button');
  orpo.className = 'maa-pilleri';
  orpo.textContent = 'KUMMITUS';
  pane.appendChild(orpo);
  ui.maaPilleri = null;
  ui.paivitaMaaPilleri({ nimi: 'Toinen maa' }, 'TOI');
  const luonninJalkeen = pane.querySelectorAll('.maa-pilleri').length;
  const kummitusJai = [...pane.querySelectorAll('.maa-pilleri')]
    .some((p) => p.textContent.includes('KUMMITUS'));
  // destroy poistaa pillerin.
  ui.destroy();
  const purunJalkeen = pane.querySelectorAll('.maa-pilleri').length;
  return { alussa, luonninJalkeen, kummitusJai, purunJalkeen };
});
vaadi('pelissä on täsmälleen yksi pilleri', tulos.alussa === 1, JSON.stringify(tulos));
vaadi('orpo pilleri siivotaan uuden luonnissa',
  tulos.luonninJalkeen === 1 && !tulos.kummitusJai, JSON.stringify(tulos));
vaadi('destroy poistaa pillerin', tulos.purunJalkeen === 0, JSON.stringify(tulos));

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi.`);
process.exit(lapi === kaikki ? 0 : 1);
