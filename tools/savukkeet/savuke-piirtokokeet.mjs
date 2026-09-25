/*
 * SAVUKE: PIIRTOKOKEET (?koe=alpha0, vahemmandc; ratasvalikon
 * "Piirtokoe"-lista, js/piirtokoe-asetus.js).
 *
 * MIKSI TÄMÄ SAVUKE ON OLEMASSA. Kokeet elävät paikoissa, joita
 * yksikkötesti ei näe: toinen WebGL-kontekstin MÄÄREISSÄ, toinen
 * laattojen näkyvyydessä scenessä. Molemmat voivat lakata purematta
 * hiljaa — kolmonen voi ottaa kontekstin luonnin takaisin itselleen,
 * ja peiton laskenta voi muuttua niin ettei mitään enää piiloteta.
 * Silloin omistaja mittaisi kokeita, jotka eivät tee mitään.
 *
 * VARTIOT:
 *   P1  ALFA ON OIKEASTI POIS: `?koe=alpha0` → kankaan
 *       getContextAttributes().alpha === false. Ilman lippua se on
 *       tosi (three.js r185 luo kontekstin aina alfalla), joten
 *       molemmat suunnat mitataan.
 *   P2  ALFATTOMALLA KANKAALLA ON TAUSTA: taustaväri ei ole
 *       läpinäkyvä, tai kartan ympärys olisi musta.
 *   P3  VÄHEMMÄN PIIRTOKUTSUJA: `?koe=vahemmandc` piilottaa tuki- ja
 *       ennakkolaatat täydellä peitolla (piilotettuja > 0) ja
 *       piirtokutsuja on vähemmän kuin ilman lippua.
 *   P4  KUVA EI HÄVIÄ: peitto on kokeessa yhä täysi (peittoOsuus === 1)
 *       eikä näkyviä laattoja ole piilotettu.
 *
 *   PLAYWRIGHT_JS=<polku> node tools/savukkeet/savuke-piirtokokeet.mjs [--webkit]
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

/* ── mittaus ─────────────────────────────────────────────────────── */

const lue = () => sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  const pallo = ui.pallonInstanssi;
  const m = ui.pallolauta.lepokerros?.()?.mittarit?.() ?? {};
  const maareet = pallo.renderer().getContext().getContextAttributes?.() ?? {};
  return {
    alpha: maareet.alpha,
    antialias: maareet.antialias,
    tausta: pallo.backgroundColor?.() ?? null,
    peitto: m.peittoOsuus ?? null,
    scenessa: m.scenessa ?? null,
    nakyvia: m.nakyvia ?? null,
    nakyviaScenessa: m.nakyviaScenessa ?? null,
    piilotettuja: m.piilotettuja ?? null,
    dc: pallo.renderer().info.render.calls,
  };
});

/** Kamera samaan paikkaan joka kierroksella: vertailu vaatii saman kuvan. */
const asetu = async () => {
  await sivu.evaluate(() => window.matkakirja.ui.pallonInstanssi.pointOfView({ lat: 43.7, lng: 4.6, altitude: 0.05 }, 0));
  await sivu.waitForTimeout(5000);
  return lue();
};

vaadi('pallolauta avautuu (ilman lippua)', await avaa('mittaus'));
const perus = await asetu();
tieto(`${MOOTTORI} ilman lippua`, JSON.stringify(perus));

vaadi('pallolauta avautuu (alpha0)', await avaa('mittaus,alpha0'));
const alfaton = await asetu();
tieto(`${MOOTTORI} alpha0`, JSON.stringify(alfaton));
vaadi(`P1 ${MOOTTORI}: ?koe=alpha0 antaa kankaan ilman alfaa`,
  alfaton.alpha === false && perus.alpha === true,
  `alpha0 ${alfaton.alpha}, ilman lippua ${perus.alpha}`);
vaadi(`P2 ${MOOTTORI}: alfattomalla kankaalla on läpinäkymätön tausta`,
  Boolean(alfaton.tausta) && !/rgba\(0,\s*0,\s*0,\s*0\)|transparent/.test(String(alfaton.tausta)),
  String(alfaton.tausta));

vaadi('pallolauta avautuu (vahemmandc)', await avaa('mittaus,vahemmandc'));
const vahemman = await asetu();
tieto(`${MOOTTORI} vahemmandc`, JSON.stringify(vahemman));
vaadi(`P3 ${MOOTTORI}: tuki- ja ennakkolaatat piiloon, piirtokutsuja vähemmän`,
  vahemman.piilotettuja > 0 && vahemman.dc < perus.dc,
  `piilotettuja ${vahemman.piilotettuja}, dc ${vahemman.dc} vs ${perus.dc}`);
vaadi(`P4 ${MOOTTORI}: kuva ei häviä (peitto täysi, näkyvät laatat scenessä)`,
  vahemman.peitto === 1 && vahemman.nakyviaScenessa >= vahemman.nakyvia,
  JSON.stringify({ peitto: vahemman.peitto, nakyvia: vahemman.nakyvia, scenessa: vahemman.nakyviaScenessa }));

console.log(`\n${lapi}/${kaikki} väitettä läpi (${MOOTTORI})`);
await selain.close();
process.exit(lapi === kaikki ? 0 : 1);
