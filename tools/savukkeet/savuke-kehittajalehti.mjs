/*
 * Savuke: kehittäjän liitteet (omistajan tilaus 15.8.2026).
 *  1. Kehittäjä-kotelo näkyy valikossa vain kehittäjätilassa.
 *  2. Raamattu aukeaa lehtenä: sivuja johdanto + jokainen osio,
 *     sisältö oikeasta datasta, sivunvaihto toimii.
 *  3. Tilannelehti aukeaa: Tilanne- ja Testattavaa-sivut riveineen.
 *
 * Pöllöpalvelin katkaistaan — liitteet eivät saa tuottaa verkkokutsuja.
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

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
const konteksti = await selain.newContext({ viewport: { width: 390, height: 844 } });
await konteksti.route('**samireivinen.workers.dev/**', (route) => route.abort());
const sivu = await konteksti.newPage();
await sivu.addInitScript(() => {
  window.localStorage.setItem('matkakirja-kehittaja', '1');
});
await sivu.goto(`http://localhost:${palvelin.address().port}/`, { waitUntil: 'load' });
await sivu.waitForTimeout(1800);
await sivu.evaluate(() => {
  [...document.querySelectorAll('button')].find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
});
await sivu.waitForTimeout(1200);

// 1. Kotelo näkyy kehittäjätilassa; ilman sitä ei (tarkistetaan
//    piilottamalla vipu hetkeksi).
const kotelo = await sivu.evaluate(() => {
  document.getElementById('menu-btn')?.click();
  const nakyy = !document.getElementById('kehittaja-kotelo')?.hidden;
  return { nakyy };
});
vaadi('Kehittäjä-kotelo näkyy valikossa kehittäjätilassa', kotelo.nakyy, JSON.stringify(kotelo));

// 2. Raamattu -lehti.
const raamattu = await sivu.evaluate(async () => {
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  document.getElementById('raamattu-lehti-btn')?.click();
  await odota(700);
  const m = await import('/js/tyohuone-raamattu.js');
  const { ui } = window.matkakirja;
  const dialogi = document.getElementById('arrival-dialog');
  const otsikko = document.getElementById('arrival-city')?.textContent ?? '';
  const eka = document.querySelector('#arrival-dialog .aihe-nimi')?.textContent ?? '';
  const runko = document.querySelector('#arrival-dialog .leipa')?.textContent ?? '';
  ui.vaihdaTutkiSivu(1);
  await odota(400);
  const toinen = document.querySelector('#arrival-dialog .aihe-nimi')?.textContent ?? '';
  return {
    auki: Boolean(dialogi?.open),
    otsikko,
    sivuja: ui.tutkiSivuja(),
    odotus: m.RAAMATTU.osiot.length + 2, // kansi-indeksi 0 + johdanto + osiot
    ekaOk: /Raamattu/.test(eka),
    sisaltoOk: runko.includes('Koko pelin idea yhdessä dokumentissa'),
    toinenOk: /Ydinajatus/.test(toinen),
  };
});
vaadi('Raamattu aukeaa lehtenä ja sivuja on johdanto + osiot',
  raamattu.auki && raamattu.otsikko === 'Raamattu' && raamattu.sivuja === raamattu.odotus,
  JSON.stringify(raamattu));
vaadi('Raamatun sisältö tulee datasta ja sivunvaihto toimii',
  raamattu.ekaOk && raamattu.sisaltoOk && raamattu.toinenOk, JSON.stringify(raamattu));

// 3. Tilannelehti.
const tilanne = await sivu.evaluate(async () => {
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  document.querySelector('#arrival-dialog [aria-label="Sulje"], #arrival-dialog .dialog-close')?.click();
  await odota(400);
  document.getElementById('menu-btn')?.click();
  await odota(200);
  document.getElementById('tilanne-lehti-btn')?.click();
  await odota(700);
  const m = await import('/js/tyohuone-tilanne.js');
  const { ui } = window.matkakirja;
  const eka = document.querySelector('#arrival-dialog .aihe-nimi')?.textContent ?? '';
  const otsikot = [...document.querySelectorAll('#arrival-dialog .nosto h4, #arrival-dialog .nosto-otsikko, #arrival-dialog h4')]
    .map((e) => e.textContent);
  ui.vaihdaTutkiSivu(1);
  await odota(400);
  const toinen = document.querySelector('#arrival-dialog .aihe-nimi')?.textContent ?? '';
  const testirivit = document.querySelectorAll('#arrival-dialog .leipa').length;
  return {
    auki: document.getElementById('arrival-dialog')?.open ?? false,
    ekaOk: /Tilanne/.test(eka),
    riveja: otsikot.length,
    odotus: m.TILANNE.rivit.length,
    toinenOk: /Testattavaa/.test(toinen),
    testattavia: m.TESTATTAVAA.length,
    testirivit,
  };
});
vaadi('Tilannelehti aukeaa ja Testattavaa-sivu seuraa',
  tilanne.auki && tilanne.ekaOk && tilanne.toinenOk && tilanne.testirivit >= tilanne.testattavia,
  JSON.stringify(tilanne));

mkdirSync('/tmp/matkakirja-kaappaukset', { recursive: true });
await sivu.screenshot({ path: '/tmp/matkakirja-kaappaukset/kehittajalehti.png' });

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi.`);
process.exit(lapi === kaikki ? 0 : 1);
