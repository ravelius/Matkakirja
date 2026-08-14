/*
 * Savuke: matkakirjakortti (fact-card) pysyy AINA vasemmassa yläkulmassa.
 * Omistaja 14.8.2026: kortti hyppäsi tietyllä zoomitasolla oikeaan
 * reunaan, koska kulma valittiin näkyvän viewBoxin merenpinta-alan
 * mukaan. Vartiot:
 *  1. Kortin kulma on 'tl' heti sijoituksen jälkeen.
 *  2. Kulma pysyy 'tl':nä vaikka viewBox zoomataan merelliseen
 *     oikeaan reunaan ja sijoitus ajetaan uudelleen (vanha logiikka
 *     olisi valinnut 'tr':n).
 *  3. Maapillerillä ei ole enää data-kortti-väistöä (kuollut koodi
 *     poistettu — kortti ei koskaan ole pillerin nurkassa).
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
  ui.placeFactCard(800, 600);
  const alussa = ui.factCard?.dataset.corner;
  // Zoomataan merelliseen oikeaan yläreunaan — vanha merilaskenta
  // olisi tässä valinnut 'tr':n.
  const vb = ui.svg.viewBox.baseVal;
  const leveys = vb.width;
  ui.svg.setAttribute('viewBox', `${vb.x + leveys * 0.6} ${vb.y} ${leveys * 0.4} ${vb.height * 0.4}`);
  ui.placeFactCard(800, 600);
  const zoomattuna = ui.factCard?.dataset.corner;
  const pilleriVaisto = ui.maaPilleri?.dataset?.kortti ?? null;
  return { alussa, zoomattuna, pilleriVaisto };
});
vaadi("kortin kulma on 'tl' alussa", tulos.alussa === 'tl', JSON.stringify(tulos));
vaadi("kulma pysyy 'tl':nä merellisessä zoomissa", tulos.zoomattuna === 'tl', JSON.stringify(tulos));
vaadi('pillerin data-kortti-väistö on poistettu', tulos.pilleriVaisto === null, JSON.stringify(tulos));

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi.`);
process.exit(lapi === kaikki ? 0 : 1);
