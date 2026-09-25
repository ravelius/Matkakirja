/*
 * Savuke: MAAKUNNAT-VÄLILEHDEN OLETUSMAA (löydös 70, Fable 25.9.2026:
 * *"Maakunnat-välilehti näyttää Kreikassa Ranskan"*).
 *
 * VARTIOT:
 *   1. KREIKASSA (ei maakuntia) teksti "Tälle maalle ei ole vielä
 *      maakuntia" näkyy listan yllä, eikä yhtäkään maaryhmää ole avattu —
 *      ei Ranskaa varalle.
 *   2. SAAPUMINEN MAAKUNTAMAAHAN päivittää listan: pelaaja siirretään
 *      Pariisiin ja lauta piirretään, jolloin Ranskan ryhmä aukeaa ja
 *      teksti katoaa (karttaselitteen paivita → paivitaMaa).
 *   3. PARIISISTA LADATTU PELI avaa suoraan Ranskan ryhmän.
 *
 * Ajo: node tools/savukkeet/savuke-maakunnat-oletusmaa.mjs
 * (Macilla PLAYWRIGHT_JS=<repo>/node_modules/playwright/index.js, jos
 * worktreessä ei ole node_modulesia).
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import('playwright')
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};

/** Tallenne, jossa Fogg seisoo annetussa kaupungissa ja kaupungin virta on jo käyty. */
function tallenne(kaupunki) {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: kaupunki }],
    pack: packById('maailmankartta'),
    seed: 11,
  });
  peli.phase = 'action';
  peli.fokusvirrat = {
    ...peli.fokusvirrat,
    [`${peli.pack.id}:${kaupunki}`]: { vaihe: 'valmis', taky: null, tehdyt: [], kohde: null, kohteet: [] },
  };
  return JSON.stringify(peli.toJSON());
}

const PIKSELI = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
);

const selain = await chromium.launch(existsSync('/opt/pw-browsers/chromium')
  ? { executablePath: '/opt/pw-browsers/chromium' } : {});

/** Sivu kaupungissa, Maakunnat-välilehti auki; palauttaa sivun. */
async function avaa(kaupunki) {
  const ctx = await selain.newContext({ viewport: { width: 1100, height: 900 }, reducedMotion: 'reduce' });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.setItem('matkakirja-karttaselite-valilehti', 'maakunnat');
      // Vanha valinta Ranskasta: juuri se piti ennen Ranskan auki Kreikassakin.
      localStorage.setItem('matkakirja-karttatyokalu-maakunta', 'FRA:Bretagne');
    } catch { /* yksityinen tila */ }
  }, tallenne(kaupunki));
  const sivu = await ctx.newPage();
  await sivu.route(/r2\.dev|wikimedia\.org|media\.matkakirja\.app/, (route) => route.fulfill({
    status: 200, contentType: 'image/png', body: PIKSELI,
  }));
  await sivu.route('**workers.dev/**', (route) => route.abort());
  await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.karttaselite, null, { timeout: 60000 });
  await sivu.waitForFunction(() => document.querySelector('.maakunnat-ryhma'), null, { timeout: 30000 });
  return sivu;
}

const tila = (sivu) => sivu.evaluate(() => {
  const teksti = document.querySelector('.maakunnat-ei-maakuntia');
  const auki = [...document.querySelectorAll('.maakunnat-maaotsikko')]
    .filter((o) => o.getAttribute('aria-expanded') === 'true').map((o) => o.textContent);
  return { tekstiNakyy: Boolean(teksti && !teksti.hidden), teksti: teksti?.textContent, auki };
});

try {
  const ateena = await avaa('ateena');
  const kreikka = await tila(ateena);
  vaadi('Kreikka: teksti näkyy', kreikka.tekstiNakyy && kreikka.teksti === 'Tälle maalle ei ole vielä maakuntia',
    JSON.stringify(kreikka));
  vaadi('Kreikka: yhtään ryhmää ei ole auki (ei Ranskaa varalle)', kreikka.auki.length === 0, JSON.stringify(kreikka));

  // Saapuminen Ranskaan: pelaaja Pariisiin ja lauta uudelleen piirtoon.
  await ateena.evaluate(() => {
    const ui = window.matkakirja.ui;
    ui.game.player.pos = { type: 'city', city: 'pariisi' };
    ui.render();
  });
  await ateena.waitForTimeout(500);
  const saapui = await tila(ateena);
  vaadi('saapuminen Pariisiin: Ranskan ryhmä auki, teksti pois',
    !saapui.tekstiNakyy && saapui.auki.length === 1 && /Ranska/i.test(saapui.auki[0]), JSON.stringify(saapui));

  const pariisi = await avaa('pariisi');
  const ranska = await tila(pariisi);
  vaadi('Pariisista ladattu: Ranska auki, ei tekstiä',
    !ranska.tekstiNakyy && ranska.auki.length === 1 && /Ranska/i.test(ranska.auki[0]), JSON.stringify(ranska));
} finally {
  await selain.close();
  palvelin.close();
}

console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
