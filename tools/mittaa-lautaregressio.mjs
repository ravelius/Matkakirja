/*
 * MITTAA LAUTAREGRESSIO — vanha kartta vs. karttapallo samalla tallenteella.
 *
 * Pallolaudan vaihe 6 (docs/moduulit/karttapallo.md luku 7 rivi 6) vaatii
 * regressiotaulukon ennen/jälkeen: mitä pelaaja saa ja mitä maksaa, kun
 * lauta vaihtuu. Tämä työkalu ajaa saman tallenteen (Fogg Ateenassa)
 * kummallakin laudalla ja tulostaa samat luvut kummastakin:
 *
 *   - DOM-solmut ja svg#board-elementit
 *   - laattapyramidin pyynnöt (tasokartan laatat) ja pallolaattojen pyynnöt
 *   - kehysaika joutilaana Ateenassa: mediaani ja p95 (4 s rAF-otanta)
 *   - JS-keko (performance.memory, jos selain antaa)
 *   - käynnistys: navigoinnista ensimmäiseen piirtoon (FCP) ja lautaan
 *     valmiina (svg#board täynnä / pallolauta pystyssä)
 *
 * VAROITUS TULKINTAAN: kontin Chromium piirtää OHJELMISTO-WebGL:llä
 * (SwiftShader), joten pallon kehysaika EI kerro laitteen kehysajasta.
 * Luvut ovat vertailukelpoisia vain keskenään samassa kontissa; laitteen
 * totuus mitataan TestFlightissä (karttapallo.md luku 8, riski 1).
 *
 * Aja:  NODE_USE_ENV_PROXY=1 node tools/mittaa-lautaregressio.mjs [markdown]
 *       (toinen argumentti: tulosta markdown-taulukko raporttiin)
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../js/game.js';
import { packById } from '../js/pack.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('..', import.meta.url).pathname;
const MARKDOWN = process.argv[2] === 'markdown';

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

const AMPARI = 'https://pub-7bc0ed2083a74a68bd7115618bca4709.r2.dev/';
const valimuisti = new Map();
async function ampariHaku(url) {
  if (valimuisti.has(url)) return valimuisti.get(url);
  const lupaus = fetch(url).then(async (v) => (v.ok
    ? { status: 200, body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
    : { status: v.status, body: Buffer.alloc(0), tyyppi: 'text/plain' }))
    .catch(() => null);
  valimuisti.set(url, lupaus);
  return lupaus;
}

/* Sama tallenne kummallekin laudalle: Fogg Ateenassa, aarre löydetty. */
const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'ateena' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('ateena');
const tallenne = JSON.stringify(peli.toJSON());

const OTANTA_MS = 4000;
const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

const jarjestysluku = (lista, osuus) => {
  const s = [...lista].sort((a, b) => a - b);
  return s[Math.min(s.length - 1, Math.floor(s.length * osuus))] ?? 0;
};

async function mittaa(lauta) {
  const ctx = await selain.newContext({
    viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, serviceWorkers: 'block',
  });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.removeItem('matkakirja-lauta');
    } catch { /* yksityinen tila */ }
  }, tallenne);
  const sivu = await ctx.newPage();
  const pyynnot = { pyramidi: 0, pallolaatat: 0, kirjasto: 0 };
  sivu.on('request', (r) => {
    const url = r.url();
    if (url.includes('julisteet/pyramidi')) pyynnot.pyramidi += 1;
    if (url.includes('julisteet/pallo/laatat')) pyynnot.pallolaatat += 1;
    if (url.includes('vendor/globe.gl')) pyynnot.kirjasto += 1;
  });
  await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
  await sivu.route(/wikimedia\.org/, (route) => route.abort());
  await sivu.route(/r2\.dev\//, async (route) => {
    const vastaus = await ampariHaku(route.request().url());
    if (!vastaus || vastaus.status !== 200) { route.abort(); return; }
    route.fulfill({ status: 200, contentType: vastaus.tyyppi ?? 'application/octet-stream', body: vastaus.body });
  });

  const alku = Date.now();
  await sivu.goto(`${osoite}?lauta=${lauta}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 60000 });
  // Lauta valmiina: pallolla pallolauta pystyssä, kartalla svg#board täynnä.
  const valmis = lauta === 'pallo'
    ? await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 }).then(() => true).catch(() => false)
    : await sivu.waitForFunction(() => document.querySelectorAll('#board *').length > 100, null, { timeout: 60000 }).then(() => true).catch(() => false);
  const lautaValmisMs = Date.now() - alku;

  // Laatat ja merkit ehtivät paikoilleen, ennen kuin joutilas kehys mitataan.
  await sivu.waitForTimeout(6000);
  const kehykset = await sivu.evaluate((kesto) => new Promise((valmisKehykset) => {
    const otos = [];
    let edellinen = performance.now();
    const alkuhetki = edellinen;
    const askel = (nyt) => {
      otos.push(nyt - edellinen);
      edellinen = nyt;
      if (nyt - alkuhetki < kesto) requestAnimationFrame(askel);
      else valmisKehykset(otos);
    };
    requestAnimationFrame(askel);
  }), OTANTA_MS);

  const luvut = await sivu.evaluate(() => {
    const maali = performance.getEntriesByType('paint').find((p) => p.name === 'first-contentful-paint');
    return {
      domSolmut: document.getElementsByTagName('*').length,
      svgLapsia: document.querySelectorAll('#board *').length,
      pallonMerkit: document.querySelectorAll('.pallolauta-merkki, .pallo-html-merkki').length,
      keko: performance.memory?.usedJSHeapSize ?? null,
      fcp: maali ? Math.round(maali.startTime) : null,
      loadEnd: Math.round(performance.timing?.loadEventEnd - performance.timing?.navigationStart) || null,
      pallo: Boolean(window.matkakirja?.ui?.pallolauta),
      lepotila: window.matkakirja?.ui?.kartta?.lepotila ?? null,
    };
  });
  await ctx.close();
  // Ensimmäinen kehys otannassa on herätys — se ei kerro joutilaasta.
  const otos = kehykset.slice(1);
  return {
    lauta,
    ...luvut,
    ...pyynnot,
    valmis,
    lautaValmisMs,
    kehysMediaani: Number(jarjestysluku(otos, 0.5).toFixed(1)),
    kehysP95: Number(jarjestysluku(otos, 0.95).toFixed(1)),
    kehyksia: otos.length,
  };
}

const tulokset = [];
for (const lauta of ['kartta', 'pallo']) tulokset.push(await mittaa(lauta));
await selain.close();
palvelin.close();

const Mt = (b) => (b === null ? '–' : `${(b / 1048576).toFixed(1)} Mt`);
if (MARKDOWN) {
  const rivit = [
    ['DOM-solmut', (t) => t.domSolmut],
    ['svg#board-elementit', (t) => t.svgLapsia],
    ['pyramidipyynnöt', (t) => t.pyramidi],
    ['pallolaattapyynnöt', (t) => t.pallolaatat],
    ['kehysaika mediaani (ms)', (t) => t.kehysMediaani],
    ['kehysaika p95 (ms)', (t) => t.kehysP95],
    ['JS-keko', (t) => Mt(t.keko)],
    ['FCP (ms)', (t) => t.fcp],
    ['lauta valmiina (ms)', (t) => t.lautaValmisMs],
  ];
  console.log('| mittari | vanha kartta | karttapallo |');
  console.log('| --- | --- | --- |');
  for (const [nimi, arvo] of rivit) console.log(`| ${nimi} | ${arvo(tulokset[0])} | ${arvo(tulokset[1])} |`);
} else {
  for (const t of tulokset) console.log(JSON.stringify(t));
}
