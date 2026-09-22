/*
 * SAVUKE: LEPOPIIRTO — levossa harvoin, liikkeessä joka kehys, muutokset heti.
 *
 *   PLAYWRIGHT_JS=<polku> node tools/savukkeet/savuke-lepopiirto.mjs [--webkit]
 *   (SAVUKE_MOOTTORI=webkit|chromium; sarjat.json ajaa molemmat rivit)
 *
 * === MIKSI ==========================================================
 *
 * js/pallolauta/lepopiirto.js (sulavuuskatsaus kohta 18) ohittaa piirron,
 * kun mikään ei muuttunut, ja piirtää sykkeellä 4 fps. Automaatiossa se
 * on pois (navigator.webdriver: kaappaukset saisivat tyhjän kankaan),
 * joten tämä savuke pyytää sen lipulla `?koe=lepopiirto` ja mittaa
 * renderer.info.render.frame-laskurista, ei kaappauksesta.
 *
 * === VÄITTEET =======================================================
 *
 *   V1  LEVOSSA HARVOIN: 2 s levossa piirtoja ≤ 20 fps (syke 4 fps tai
 *       hehkupisteen syke 15 fps), ja yhtään 'kamera'-syytä ei kerry
 *       (kameran vertailu ei värähtele).
 *   V2  LIIKKEESSÄ JOKA KEHYS: tasaisuusmittarin veto — pysähdyksiä ≤ 2
 *       (headless WebKit pysähtyy 1–2 kehystä ilman lepopiirtoakin).
 *   V3  MUUTOS NÄKYY HETI: kamera uuteen paikkaan → laattojen saapuminen
 *       kirjaa 'pakko'/'tarve'-piirtoja (ryhmän add ilmoittaa), ja
 *       levossa readPixels ilman pakotusta antaa laatan värin, ei taustaa.
 *   V4  KOELIPPU: ilman lippua (webdriver) piirto joka kehys (≥ 50 fps).
 */
import http from 'node:http';
import { existsSync, readFileSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import(process.env.PLAYWRIGHT_JS ?? 'playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const MOOTTORI = (process.argv.includes('--webkit') || process.env.SAVUKE_MOOTTORI === 'webkit')
  ? 'webkit' : 'chromium';
const moottori = paketti[MOOTTORI] ?? paketti.default?.[MOOTTORI];
const JUURI = new URL('../..', import.meta.url).pathname;

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.webp': 'image/webp', '.geojson': 'application/json',
};
const palvelin = http.createServer((req, res) => {
  const reitti = req.url.split('?')[0];
  const polku = join(JUURI, reitti === '/' ? 'index.html' : reitti);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(Number(process.env.PORTTI) || 0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

/* Ämpäri Noden kautta: CORS estää 127.0.0.1:n suoran haun. */
const AMPARI = 'https://media.matkakirja.app/';
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
const kirjasto = await ampariHaku(`${AMPARI}vendor/globe.gl-2.46.2.min.js`);
if (kirjasto?.status !== 200) {
  console.log('OHITUS: ämpäri ei vastaa — pallo ei voi latautua, savuke ei voi mitata.');
  palvelin.close();
  process.exit(0);
}

const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'marseille' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('marseille');
const tallenne = JSON.stringify(peli.toJSON());

const selain = await (MOOTTORI === 'webkit'
  ? moottori.launch()
  // Oikea GPU Macilla (ANGLE Metal): SwiftShaderin rAF on ~4 fps eikä erota lepoa liikkeestä.
  : moottori.launch({ executablePath: process.env.CHROMIUM || undefined, args: ['--disable-dev-shm-usage', '--use-angle=metal', '--ignore-gpu-blocklist'] }));
const ctx = await selain.newContext({
  viewport: { width: 390, height: 844 },
  hasTouch: true,
  ...(MOOTTORI === 'webkit' ? {} : { isMobile: true }),
  deviceScaleFactor: 2,
  serviceWorkers: 'block',
});
await ctx.addInitScript((data) => {
  try { localStorage.setItem('matkakirja-save-v1', data); localStorage.removeItem('matkakirja-lauta'); } catch { /* yksityinen selaus */ }
}, tallenne);
const sivu = await ctx.newPage();
sivu.setDefaultTimeout(120000);
const konsoli = [];
sivu.on('console', (m) => { if (m.type() === 'error') konsoli.push(m.text().slice(0, 300)); });
await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
await sivu.route(/wikimedia\.org/, (r) => r.abort());
await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (route) => {
  const vastaus = await ampariHaku(route.request().url());
  if (!vastaus || vastaus.status !== 200) { route.abort().catch(() => {}); return; }
  route.fulfill({
    status: 200, contentType: vastaus.tyyppi ?? 'application/octet-stream', body: vastaus.body,
    headers: { 'access-control-allow-origin': '*' },
  }).catch(() => {});
});


const avaa = async (koe) => {
  await sivu.goto(`${osoite}?lauta=pallo&koe=${koe}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  const auki = await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 })
    .then(() => true).catch(() => false);
  if (!auki) return false;
  await sivu.waitForTimeout(2500);
  await sivu.evaluate(() => {
    setInterval(() => {
      const ui = window.matkakirja?.ui;
      const n = ui?.ohitaNappi?.isConnected ? ui.ohitaNappi : document.querySelector('.fokusvirta-ohitanappi');
      if (n) n.click();
    }, 150);
  });
  await sivu.waitForTimeout(2000);
  await sivu.evaluate(() => window.matkakirja.ui.pallolauta.saavu?.({ kesto: 0 }));
  await sivu.waitForTimeout(3000);
  return true;
};
const laske = async (ms) => {
  const a = await sivu.evaluate(() => ({ f: window.matkakirja.ui.pallonInstanssi.renderer().info.render.frame, t: performance.now(), s: window.matkakirja.ui.pallonInstanssi.__piirto?.tila?.().syyt ?? null }));
  await sivu.waitForTimeout(ms);
  const b = await sivu.evaluate(() => ({ f: window.matkakirja.ui.pallonInstanssi.renderer().info.render.frame, t: performance.now(), s: window.matkakirja.ui.pallonInstanssi.__piirto?.tila?.().syyt ?? null }));
  const fps = (b.f - a.f) / ((b.t - a.t) / 1000);
  const syyt = {};
  for (const k of new Set([...Object.keys(a.s ?? {}), ...Object.keys(b.s ?? {})])) syyt[k] = (b.s?.[k] ?? 0) - (a.s?.[k] ?? 0);
  return { fps, syyt };
};

vaadi('pallolauta avautuu (lepopiirto)', await avaa(process.env.SAVUKE_LEPOPIIRTO_KOE ?? 'lepopiirto'));
const paalla = await sivu.evaluate(() => Boolean(window.matkakirja.ui.pallonInstanssi.__piirto));
vaadi('lepopiirto asennettu lipulla', paalla);
if (!paalla) { await ctx.close(); await selain.close(); palvelin.close(); process.exit(1); }
const lepo = await laske(2000);
tieto(`V1 ${MOOTTORI} lepo`, `${lepo.fps.toFixed(1)} fps, syyt ${JSON.stringify(lepo.syyt)}`);
vaadi(`V1 ${MOOTTORI}: levossa ≤ 20 fps`, lepo.fps <= 20, `${lepo.fps.toFixed(1)} fps`);
vaadi(`V1 ${MOOTTORI}: levossa ei kamera-syitä`, (lepo.syyt.kamera ?? 0) <= 1, `kamera ${lepo.syyt.kamera}`);
const veto = await sivu.evaluate(async () => {
  const v = await window.__kehysprofiili.veto({ kesto: 1500, nopeusPx: 80 });
  return { t: v.tasaisuus, teksti: window.__kehysprofiili.vetoTeksti(v) };
});
tieto(`V2 ${MOOTTORI} veto`, veto.teksti);
// Headless WebKit pysähtyy 1–2 kehystä myös ilman lepopiirtoa (mitattu 22.9.2026: 63 % / 2 vs 65 % / 1); raja 2.
vaadi(`V2 ${MOOTTORI}: liikkeessä joka kehys (pysähdyksiä ≤ 2)`, veto.t && veto.t.pysahdyksia <= 2 && veto.t.kehyksia > 30, JSON.stringify(veto.t));
await sivu.waitForTimeout(800);
/* V3: uusi paikka → laatat saapuvat → piirtoja ilman kameran liikettä; sitten pikseli ilman pakotusta. */
await sivu.evaluate(() => { window.matkakirja.ui.pallolauta.heraa?.(); window.matkakirja.ui.pallonInstanssi.pointOfView({ lat: 43.5, lng: 4.5, altitude: 0.05 }, 0); });
await sivu.waitForTimeout(300);
const saapuminen = await laske(2500);
const peitti = await sivu.waitForFunction(() => { const k = window.matkakirja.ui.pallolauta.lepokerros?.()?.mittarit?.(); return k && k.peittoOsuus === 1 && k.hapyvia === 0; }, null, { timeout: 30000 }).then(() => true).catch(() => false);
tieto(`V3 ${MOOTTORI} saapuminen`, `${saapuminen.fps.toFixed(1)} fps, syyt ${JSON.stringify(saapuminen.syyt)}, peitti ${peitti}`);
vaadi(`V3 ${MOOTTORI}: laattojen saapuminen piirretään ilmoituksesta`, (saapuminen.syyt.pakko ?? 0) + (saapuminen.syyt.tarve ?? 0) >= 3, JSON.stringify(saapuminen.syyt));
await sivu.waitForTimeout(600);
const pikseli = await sivu.evaluate(() => {
  const pallo = window.matkakirja.ui.pallonInstanssi; const r = pallo.renderer(); const gl = r.getContext();
  // Ei pakotusta: viimeisin sykkeen/hitaan piirto on puskurissa vain heti piirron jälkeen — piirretään ilman pakkoa
  // (lepopiirto päättää itse) ja luetaan; jos se ohitti, odotetaan sykettä ja luetaan piirron jälkeen.
  // Kääritään lepopiirron kääre: luetaan pikseli heti kirjaston OMAN, pakottamattoman piirron jälkeen.
  return new Promise((ok) => {
    const alku = performance.now();
    const alk = r.render;
    const palauta = () => { if (r.render === kaare) r.render = alk; };
    const kaare = function kaare(...a) {
      const ennen = r.info.render.frame;
      const tulos = alk.apply(this, a);
      if (r.info.render.frame > ennen) {
        const W = gl.drawingBufferWidth, H = gl.drawingBufferHeight; const px = new Uint8Array(4);
        gl.readPixels(Math.floor(W / 2), Math.floor(H / 2), 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
        palauta();
        ok({ px: [...px], odotti: Math.round(performance.now() - alku), syyt: pallo.__piirto?.tila?.().syyt });
      } else if (performance.now() - alku > 1500) { palauta(); ok({ px: null, odotti: 1500 }); }
      return tulos;
    };
    r.render = kaare;
  });
});
tieto(`V3 ${MOOTTORI} pikseli`, JSON.stringify(pikseli));
vaadi(`V3 ${MOOTTORI}: levossa syke piirtää laatan (pikseli ei tausta)`, pikseli.px && pikseli.px[3] === 255 && !(pikseli.px[0] < 10 && pikseli.px[1] < 10 && pikseli.px[2] < 10), JSON.stringify(pikseli));
/* V4: ilman lippua automaatiossa joka kehys. */
vaadi('pallolauta avautuu (ilman lippua)', await avaa('mittaus'));
const ilman = await sivu.evaluate(() => Boolean(window.matkakirja.ui.pallonInstanssi.__piirto));
const vanha = await laske(1500);
tieto(`V4 ${MOOTTORI} ilman lippua`, `${vanha.fps.toFixed(1)} fps, lepopiirto ${ilman}`);
vaadi(`V4 ${MOOTTORI}: automaatiossa ilman lippua piirto joka kehys`, !ilman && vanha.fps >= 50, `${vanha.fps.toFixed(1)} fps, lepopiirto ${ilman}`);
if (konsoli.length) tieto('konsolivirheet', JSON.stringify(konsoli.slice(0, 3)));

await ctx.close();
await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} väitettä läpi (${MOOTTORI})`);
process.exit(lapi === kaikki ? 0 : 1);
