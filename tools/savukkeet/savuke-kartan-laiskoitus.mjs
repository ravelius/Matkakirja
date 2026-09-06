/*
 * Savuke: TASOKARTAN LAISKOITUS (erä 5b; omistaja 5.9.2026 ilta *"laita
 * laiskoitus työn alle"*; docs/moduulit/karttapallo.md luvut 3, 5b ja
 * 10.3).
 *
 * Vaiheessa 1 tasokartta pantiin LEPOTILAAN: pallolaudalla se ei piirrä
 * mitään. Tämä erä vei saman askeleen loppuun — js/kartta.js ja sen omat
 * aineistopakat LADATAAN vasta kun kartta oikeasti tarvitaan
 * (js/kartta-lataus.js lataaTasokartta).
 *
 * ── VARTIOT ───────────────────────────────────────────────────────
 *
 *   PALLOLAUDALLA (oletuslauta):
 *   1. js/kartta.js:ää EI haeta lainkaan — eikä maasto-tekstit,
 *      maasto-tekstit-malli, maailmankartta-varjostus (laiskoitetut) tai
 *      maailmankartta-syvyys (poistettu tuonti).
 *   2. ui.kartta on nukkuva sijaisolio (sijainen === true, lepotila ===
 *      true) ja svg#board on tyhjä.
 *   3. Sijaisen rajapinta vastaa oikeaa: kiertava, boardBounds ja
 *      dieRestingSpot antavat pallolaudalla samat luvut kuin ladattu
 *      Kartta antaisi (nämä kutsutaan pallolla oikeasti).
 *   4. Käynnistyksessä ladattu JS-määrä (raportoidaan; vertailuluku
 *      karttapallo.md 5b:ssä).
 *
 *   HERÄTYS (linssikartta pallon päälle, ui.avaaLinssikartta):
 *   5. js/kartta.js haetaan vasta nyt, ui.kartta vaihtuu oikeaksi
 *      (sijainen === false), kartta herää (lepotila === false) ja
 *      svg#board saa kerroksensa.
 *   6. Kuori on pystyssä (ui.linssikartta) ja Sulje purkaa sen: kartta
 *      nukkuu, svg#board tyhjenee — mutta moduulia ei ladata uudestaan.
 *
 *   VARAPOLKU (pallo ei lataudu, esim. lentokoneessa ensimmäisellä
 *   käynnistyksellä):
 *   8. pallolautaVarapolku herättää tasokartan laiskan latauksen läpi ja
 *      lauta piirtyy.
 *
 *   TASOKARTTA (?lauta=kartta):
 *   7. Moduuli ladataan heti mountissa ja lauta piirtyy kuten ennen
 *      (svg#board saa kerrokset, kartta on hereillä).
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1) kuten
 * savuke-pallolaudassa; ilman ämpäriä pallo ei lataudu, ja silloin
 * ajetaan vain tasokartan vartiot.
 *
 * Aja:  NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-kartan-laiskoitus.mjs
 */
import http from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json', '.mp3': 'audio/mpeg',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

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
const AMPARI_TOIMII = kirjasto?.status === 200;
if (!AMPARI_TOIMII) console.log('HUOM  ämpäri ei vastaa — pallo ei lataudu; ajetaan vain tasokartan vartiot');

/* Tallenne: Fogg Ateenassa, aarre löydetty. */
const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'ateena' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('ateena');
const tallenne = JSON.stringify(peli.toJSON());

/* Laiskoitetut moduulit: näitä EI saa hakea pallolaudalla. */
const LAISKAT = [
  'js/kartta.js',
  'js/packs/maasto-tekstit.js',
  'js/packs/maasto-tekstit-malli.js',
  'js/packs/maailmankartta-varjostus.js',
];
const POISTETTU = 'js/packs/maailmankartta-syvyys.js';

const selain = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  args: ['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'],
});

async function avaaSivu({ lauta = null, ampari = true } = {}) {
  const ctx = await selain.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    serviceWorkers: 'block',
  });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.removeItem('matkakirja-lauta');
    } catch { /* yksityinen tila */ }
  }, tallenne);
  const sivu = await ctx.newPage();
  const haetut = new Set();
  let jsTavuja = 0;
  const virheet = [];
  sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
  sivu.on('console', (m) => { if (m.type() === 'error') virheet.push(m.text()); });
  sivu.on('response', (r) => {
    const url = new URL(r.url());
    if (url.origin !== new URL(osoite).origin || !/\.m?js$/.test(url.pathname)) return;
    const polku = join(JUURI, url.pathname);
    if (!existsSync(polku)) return;
    haetut.add(url.pathname.slice(1));
    jsTavuja += statSync(polku).size;
  });
  await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
  await sivu.route(/wikimedia\.org/, (route) => route.abort());
  await sivu.route(/r2\.dev\//, async (route) => {
    // Varapolun vartio: ilman kirjastoa pallo ei avaudu.
    if (!ampari && route.request().url().includes('vendor/globe.gl')) { route.abort(); return; }
    const vastaus = await ampariHaku(route.request().url());
    if (!vastaus || vastaus.status !== 200) { route.abort(); return; }
    route.fulfill({ status: 200, contentType: vastaus.tyyppi ?? 'application/octet-stream', body: vastaus.body });
  });
  await sivu.goto(lauta ? `${osoite}?lauta=${lauta}` : osoite,
    { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 60000 });
  return {
    ctx, sivu, virheet, haetut, tavut: () => jsTavuja,
  };
}

/* ================= PALLOLAUTA ================= */
if (AMPARI_TOIMII) {
  const {
    ctx, sivu, virheet, haetut, tavut,
  } = await avaaSivu({});
  const auki = await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 45000 })
    .then(() => true).catch(() => false);
  vaadi('pallolauta avautuu oletuslautana', auki, 'ui.pallolauta ei syntynyt 45 s:ssa');
  await sivu.waitForTimeout(3000);

  const ladatut = LAISKAT.filter((p) => haetut.has(p));
  vaadi('1. laiskoitettuja karttamoduuleja ei haeta pallolaudalla', ladatut.length === 0,
    `haettiin: ${ladatut.join(', ')}`);
  vaadi('1b. merisyvyyspakka ei lataudu (tuonti poistettu)', !haetut.has(POISTETTU));

  const tila = await sivu.evaluate(() => {
    const { ui } = window.matkakirja;
    return {
      sijainen: ui.kartta.sijainen,
      lepotila: ui.kartta.lepotila,
      svgLapsia: document.querySelectorAll('#board *').length,
      kiertava: ui.kartta.kiertava(),
      rajat: ui.kartta.boardBounds(),
      noppa: ui.kartta.dieRestingSpot(),
      kuori: Boolean(ui.kartta.kuori),
    };
  });
  vaadi('2. ui.kartta on nukkuva sijainen ja svg#board tyhjä',
    tila.sijainen === true && tila.lepotila === true && tila.svgLapsia === 0,
    JSON.stringify(tila));
  vaadi('3. sijaisen rajapinta antaa oikeat luvut (kiertava, boardBounds, dieRestingSpot)',
    tila.kiertava === true && tila.rajat?.w > 0 && tila.noppa?.x > 0 && tila.kuori,
    JSON.stringify(tila));
  tieto('käynnistyksen JS pallolaudalla (tavua)', tavut());
  tieto('moduuleja haettu', haetut.size);
  if (virheet.length) tieto('sivun virheet', virheet.slice(0, 5).join(' | '));

  /* ---- herätys: linssikartta pallon päälle ---- */
  const ennen = tavut();
  const herasi = await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    ui.avaaLinssikartta({});
    // Lataus + uudelleenavaus: portti muistaa lupauksen, joten tämä on
    // yksi verkkohaku ja sen jälkeinen mikrotehtävä.
    for (let i = 0; i < 100 && !ui.linssikartta; i++) {
      await new Promise((ok) => setTimeout(ok, 100));
    }
    return {
      linssikartta: Boolean(ui.linssikartta),
      sijainen: ui.kartta.sijainen,
      lepotila: ui.kartta.lepotila,
      svgLapsia: document.querySelectorAll('#board *').length,
    };
  });
  vaadi('5. herätys lataa moduulin ja piirtää laudan',
    herasi.linssikartta && herasi.sijainen === false && herasi.lepotila === false
    && herasi.svgLapsia > 100 && haetut.has('js/kartta.js'),
    `${JSON.stringify(herasi)} kartta.js haettu: ${haetut.has('js/kartta.js')}`);
  tieto('herätyksen lataama JS (tavua)', tavut() - ennen);

  await sivu.waitForTimeout(1500);
  const jalkeen = tavut();
  const suljettu = await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    ui.suljeLinssikartta();
    await new Promise((ok) => setTimeout(ok, 1200));
    return {
      linssikartta: Boolean(ui.linssikartta),
      lepotila: ui.kartta.lepotila,
      sijainen: ui.kartta.sijainen,
      svgLapsia: document.querySelectorAll('#board *').length,
    };
  });
  vaadi('6. Sulje nukuttaa kartan; moduulia ei ladata uudestaan',
    !suljettu.linssikartta && suljettu.lepotila === true && suljettu.sijainen === false
    && suljettu.svgLapsia === 0 && tavut() === jalkeen,
    JSON.stringify(suljettu));
  await ctx.close();
}

/* ================= VARAPOLKU: PALLO EI LATAUDU ================= */
if (AMPARI_TOIMII) {
  const {
    ctx, sivu, virheet, haetut,
  } = await avaaSivu({ ampari: false });
  const piirtyi = await sivu.waitForFunction(
    () => document.querySelectorAll('#board *').length > 100, null, { timeout: 30000 },
  ).then(() => true).catch(() => false);
  const tila = await sivu.evaluate(() => ({
    sijainen: window.matkakirja.ui.kartta.sijainen,
    lepotila: window.matkakirja.ui.kartta.lepotila,
    pallolauta: Boolean(window.matkakirja.ui.pallolauta),
    svgLapsia: document.querySelectorAll('#board *').length,
  }));
  vaadi('8. pallon varapolku herättää tasokartan laiskan latauksen läpi',
    piirtyi && tila.sijainen === false && tila.lepotila === false && !tila.pallolauta
    && haetut.has('js/kartta.js'),
    JSON.stringify(tila));
  if (virheet.length) tieto('varapolun virheet', virheet.slice(0, 3).join(' | '));
  await ctx.close();
}

/* ================= TASOKARTTA ================= */
{
  const {
    ctx, sivu, virheet, haetut, tavut,
  } = await avaaSivu({ lauta: 'kartta' });
  const piirtyi = await sivu.waitForFunction(
    () => document.querySelectorAll('#board *').length > 100, null, { timeout: 30000 },
  ).then(() => true).catch(() => false);
  const tila = await sivu.evaluate(() => ({
    sijainen: window.matkakirja.ui.kartta.sijainen,
    lepotila: window.matkakirja.ui.kartta.lepotila,
    svgLapsia: document.querySelectorAll('#board *').length,
    pallo: Boolean(window.matkakirja.ui.pallolauta),
  }));
  vaadi('7. ?lauta=kartta lataa moduulin heti ja piirtää laudan',
    piirtyi && tila.sijainen === false && tila.lepotila === false && !tila.pallo
    && haetut.has('js/kartta.js'),
    JSON.stringify(tila));
  vaadi('7b. poistettua merisyvyyspakkaa ei haeta kartallakaan', !haetut.has(POISTETTU));
  tieto('käynnistyksen JS tasokartalla (tavua)', tavut());
  if (virheet.length) tieto('sivun virheet', virheet.slice(0, 5).join(' | '));
  await ctx.close();
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} vartiota läpi`);
process.exit(lapi === kaikki ? 0 : 1);
