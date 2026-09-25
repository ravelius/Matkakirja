/*
 * Savuke: MAAILMATILASSA SAA LOITONTAA KOKO PALLOON.
 *
 *   NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-maailmatila-zoomi.mjs \
 *     [kuvakansio] [--vastakoe] [--webkit]
 *
 * === MITÄ TÄMÄ VARTIOI =============================================
 *
 * Raamattu, KARTTAUUDISTUKSEN PAATOKSET 34 kohta 19 (omistaja
 * 18.9.2026 klo 18.05, iPhone, v1942, sanatarkasti): *"Vaikka maailma
 * tila päällä, peli ei anna zoomata ulospäin"*.
 *
 * Maailmatila = kehittäjätilan maailmanäkymä (js/ui.js maailmanakyma:
 * kehittäjätila JA maailmanappi JA ei katselukuva). Sen ollessa päällä
 * pelaajan on päästävä loitontamaan koko maapalloon asti; muuten katto
 * on kohdemaan saapumisnäkymä (js/pallolauta/lauta.js maanZoomiraja).
 *
 * KAKSI VIKAA, JOTKA TÄMÄ MITTAA (molemmat js/pallolauta/lauta.js):
 *
 *   1. KYTKIN EI TAHDISTANUT RAJOJA. `tahdistaZoomirajat` ajettiin
 *      maan vaihtuessa, ruudun mitatessa ja linssin/matkan
 *      kytkennöistä — ei maailmanapista. OrbitControlsin `maxDistance`
 *      jäi siihen lukuun, jonka kohdemaan saapumisnäkymä asetti, eli
 *      nipistys ja rulla pysähtyivät saapumisnäkymään.
 *   2. LAUDAN OMA KATTO EI RIITÄ PYSTYRUUDULLE. `PALLO_KORKEUS_MAX`
 *      on 2,5, ja Globe.gl:n fov on PYSTYkulma: 390 × 844 vaatii
 *      korkeuden 4,37 (kamera.js kokoPallonKorkeus), jotta pallo
 *      mahtuu ruudun kapeammalle sivulle.
 *
 * MITTA ON PUHELIN: 390 × 844, dpr 3, kosketus päällä — sama laite,
 * jolla omistaja vian näki.
 *
 * Yksi peli (Fogg Budapestissa), kolme vaihetta:
 *
 *   A  MAAILMATILA POIS. Rulla ulos pohjaan: korkeus pysähtyy
 *      kohdemaan kattoon (kirjataan luku).
 *   B  MAAILMATILA PÄÄLLÄ. Katto luetaan HETI kytkennästä (ilman
 *      ruudun mittausta), sitten rulla ulos pohjaan.
 *   C  NIPISTYS ERIKSEEN. Sama loitonnus kahdella sormella (CDP
 *      Input.dispatchTouchEvent) — iPhonella loitonnus tehdään
 *      nipistämällä, eikä rulla todista siitä mitään.
 *
 * Väitteet:
 *
 *   V1  A: loitonnus pysähtyy kohdemaan kattoon (korkeus ≤ MAA_KATTO
 *       ja kiinni katossa ±2 %). Tämä on se raja, jonka on säilyttävä.
 *   V2  B: katto nousee HETI kytkennästä vähintään KATTO_KERROIN-
 *       kertaiseksi — ilman ruudun mittausta tai maan vaihtoa.
 *   V3  B: rulla ulos vie korkeuden A:n katon yli vähintään
 *       KATTO_KERROIN-kertaiseksi.
 *   V4  B: pallon halkaisija ruudulla ≤ ruudun leveys (ja ≥ puolet
 *       siitä, eli pallo todella täyttää näkymän).
 *   V5  C: nipistys vie yhtä kauas kuin rulla (±NIPISTYS_VARA).
 *   V6  Ei sivuvirheitä.
 *
 * === VASTAKOE ON PAKOLLINEN ========================================
 *
 * `--vastakoe` tarjoilee js/pallolauta/lauta.js:n ilman korjausta:
 * maailmatilan katto ja kytkennän tahdistus kytketään pois. Silloin
 * V2, V3 ja V4 OVAT KAADUTTAVA. Ilman tätä koe mittaisi vain sitä,
 * että pallo pyörii.
 *
 * VERKKO: pyramidin laatat haetaan tuotannon ämpäristä Noden kautta
 * (NODE_USE_ENV_PROXY=1), kuten savuke-maailma-ei-kermaa.mjs tekee.
 */
import http from 'node:http';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import(process.env.PLAYWRIGHT_JS ?? 'playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const moottorit = paketti.default ?? paketti;

const JUURI = new URL('../..', import.meta.url).pathname;
const argv = process.argv.slice(2);
const VASTAKOE = argv.includes('--vastakoe');
const WEBKIT = argv.includes('--webkit');
const KUVAKANSIO = argv.find((a) => !a.startsWith('--')) ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

/** Puhelimen ruutu (omistajan iPhone). */
const RUUTU = { width: 390, height: 844 };
/** Katon nousun vähimmäiskerroin maailmatilassa (A:n kattoon nähden). */
const KATTO_KERROIN = 2;
/** Nipistyksen ja rullan sallittu ero (osuus korkeudesta). */
const NIPISTYS_VARA = 0.08;
/** Kiinni katossa: korkeuden ja katon sallittu ero (osuus). */
const KATOSSA_VARA = 0.02;

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json', '.woff2': 'font/woff2',
};
const palvelin = http.createServer((req, res) => {
  const polkuOsa = req.url.split('?')[0];
  const polku = join(JUURI, polkuOsa === '/' ? 'index.html' : polkuOsa);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  let runko = readFileSync(polku);
  if (VASTAKOE && polkuOsa.endsWith('/js/pallolauta/lauta.js')) {
    /*
     * VASTAKOE: korjaus pois kahdesta kohdasta — maailmatilan katto ja
     * kytkennän tahdistus. Muu koodi on täsmälleen sama.
     */
    const ennen = runko.toString('utf8');
    const jalkeen = ennen
      .replace('else if (maailmatilassa()) max = maailmatilanKatto();',
        'else if (false) max = maailmatilanKatto(); // vastakoe')
      .replace('if (maailmatilassa() !== maailmatilaEnnen) {',
        'if (false && maailmatilassa() !== maailmatilaEnnen) { // vastakoe');
    if (jalkeen === ennen) {
      console.log('FAIL  vastakoe ei löytänyt korjauskohtia js/pallolauta/lauta.js:stä');
      process.exit(1);
    }
    runko = Buffer.from(jalkeen);
  }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(runko);
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}`;

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`      ${nimi}: ${arvo}`);

/* ---- ämpäri Noden kautta (README: NODE_USE_ENV_PROXY=1) ----------- */
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
  console.log('OHITUS  ämpäri ei vastaa — palloa ei voi avata; savuke ohitetaan');
  palvelin.close();
  process.exit(0);
}

/* ---- peli: Fogg Budapestissa -------------------------------------- */
const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'budapest' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('budapest');
const tallenne = JSON.stringify(peli.toJSON());

const moottori = WEBKIT ? moottorit.webkit : moottorit.chromium;
const kaynnistys = {};
if (!WEBKIT && process.env.CHROMIUM) kaynnistys.executablePath = process.env.CHROMIUM;
if (!WEBKIT && !process.env.CHROMIUM && existsSync('/opt/pw-browsers/chromium')) {
  kaynnistys.executablePath = '/opt/pw-browsers/chromium';
}
const selain = await moottori.launch(kaynnistys);
const ctx = await selain.newContext({
  viewport: RUUTU, deviceScaleFactor: 3, hasTouch: true, isMobile: !WEBKIT,
  serviceWorkers: 'block',
});
await ctx.addInitScript((data) => {
  try {
    localStorage.setItem('matkakirja-save-v1', data);
    localStorage.removeItem('matkakirja-lauta');
  } catch { /* yksityinen tila */ }
}, tallenne);
const sivu = await ctx.newPage();
const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
await sivu.route(/wikimedia\.org/, (r) => r.abort());
await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (route) => {
  const v = await ampariHaku(route.request().url());
  if (!v || v.status !== 200) { route.abort(); return; }
  route.fulfill({
    status: 200,
    contentType: v.tyyppi ?? 'application/octet-stream',
    body: v.body,
    headers: { 'access-control-allow-origin': '*' },
  });
});
await sivu.goto(`${osoite}/?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 60000 });
await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 90000 });
const auki = await sivu
  .waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 })
  .then(() => true).catch(() => false);
if (!auki) {
  console.log('FAIL  pallolauta ei avautunut');
  await selain.close();
  palvelin.close();
  process.exit(1);
}
// Saapumisajo ja laatat ehtivät asettua ennen ensimmäistä mittaa.
await sivu.waitForTimeout(9000);

/**
 * KAMERAN MITTA. `alt` on Globe.gl:n altitude (pallonsäteinä pinnasta),
 * `maxAlt` OrbitControlsin katto samassa yksikössä, `halkaisijaPx`
 * pallon siluetin halkaisija css-pikseleinä: perspektiivikuvassa
 * r = (K / 2) · tan(asin(R / d)) / tan(fov / 2), missä K on kankaan
 * KORKEUS ja fov kameran pystykulma (sama kaava kuin kamera.js
 * kokoPallonKorkeus, käänteisenä).
 */
const mitta = () => sivu.evaluate(() => {
  const lauta = window.matkakirja.ui.pallolauta;
  const { pallo } = lauta;
  const ohj = pallo.controls();
  const R = pallo.getGlobeRadius();
  const cam = pallo.camera();
  const d = cam.position.length();
  const kangas = document.querySelector('.pallolauta canvas') ?? document.querySelector('canvas');
  const k = kangas.getBoundingClientRect();
  const sinA = Math.min(1, R / d);
  const halkaisijaPx = k.height
    * (Math.tan(Math.asin(sinA)) / Math.tan((cam.fov / 2) * (Math.PI / 180)));
  return {
    alt: pallo.pointOfView().altitude,
    etaisyys: d,
    sade: R,
    maxAlt: ohj.maxDistance / R - 1,
    minAlt: ohj.minDistance / R - 1,
    leveysPx: k.width,
    korkeusPx: k.height,
    halkaisijaPx,
    fov: cam.fov,
  };
});

/** Rulla ulos (ctrl = zoom, js/pallo.js päästää sen OrbitControlsille). */
const rulla = async (suunta, kierroksia = 6) => {
  for (let i = 0; i < kierroksia; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await sivu.evaluate((delta) => {
      const kangas = document.querySelector('.pallolauta canvas') ?? document.querySelector('canvas');
      const k = kangas.getBoundingClientRect();
      for (let n = 0; n < 6; n += 1) {
        kangas.dispatchEvent(new WheelEvent('wheel', {
          deltaY: delta, deltaMode: 0, ctrlKey: true, bubbles: true, cancelable: true,
          clientX: k.left + k.width / 2, clientY: k.top + k.height / 2,
        }));
      }
    }, suunta * 240);
    // eslint-disable-next-line no-await-in-loop
    await sivu.waitForTimeout(350);
  }
  await sivu.waitForTimeout(600);
};

/**
 * NIPISTYS ULOS (kaksi sormea lähenee) CDP:n kosketustapahtumilla —
 * iPhonen oma loitonnusele. Chromium synteesoi näistä pointerit, joten
 * sekä js/pallo.js:n sormilaskuri että OrbitControls näkevät eleen.
 */
const nipistaUlos = async (cdp, kierroksia = 6) => {
  const k = await sivu.evaluate(() => {
    const kangas = document.querySelector('.pallolauta canvas') ?? document.querySelector('canvas');
    const r = kangas.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  });
  for (let i = 0; i < kierroksia; i += 1) {
    const pisteet = (d) => [
      { x: k.x - d, y: k.y, id: 1 }, { x: k.x + d, y: k.y, id: 2 },
    ];
    /* eslint-disable no-await-in-loop */
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: pisteet(150) });
    for (const d of [120, 90, 60, 40, 24, 14]) {
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: pisteet(d) });
      await sivu.waitForTimeout(40);
    }
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await sivu.waitForTimeout(250);
    /* eslint-enable no-await-in-loop */
  }
  await sivu.waitForTimeout(600);
};

const maailmatilaPaalle = () => sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  const { asetaKehittajaTila, asetaKehittajaMaailma } = await import('./js/ui-apurit.js');
  asetaKehittajaTila(true);
  asetaKehittajaMaailma(true);
  ui.kehittajaTila = true;
  ui.kehittajaMaailma = true;
  ui.paivitaKehittajaMaailma();
});

const kuva = async (nimi) => {
  if (!KUVAKANSIO) return;
  writeFileSync(join(KUVAKANSIO, `maailmatila-zoomi-${nimi}-390-20260918.png`),
    await sivu.screenshot());
};

/* ---- A: maailmatila pois ------------------------------------------ */
const alku = await mitta();
tieto('A alku', JSON.stringify(alku));
await rulla(+1);
const A = await mitta();
tieto('A pohja (rulla ulos)', `korkeus ${A.alt.toFixed(4)} · katto ${A.maxAlt.toFixed(4)}`
  + ` · pallon halkaisija ${A.halkaisijaPx.toFixed(0)} px / ruutu ${A.leveysPx} px`);
await kuva('a-maailmatila-pois');

/* ---- B: maailmatila päälle ---------------------------------------- */
await maailmatilaPaalle();
await sivu.waitForTimeout(1200);
const Bkytkin = await mitta();
tieto('B katto heti kytkennästä', `${Bkytkin.maxAlt.toFixed(4)} (A:ssa ${A.maxAlt.toFixed(4)})`);
await rulla(+1, 10);
const B = await mitta();
tieto('B pohja (rulla ulos)', `korkeus ${B.alt.toFixed(4)} · katto ${B.maxAlt.toFixed(4)}`
  + ` · pallon halkaisija ${B.halkaisijaPx.toFixed(0)} px / ruutu ${B.leveysPx} px`);
await kuva('b-maailmatila-paalla');

/* ---- C: sama nipistämällä ----------------------------------------- */
let C = null;
let nipistysToimi = false;
if (!WEBKIT) {
  const cdp = await ctx.newCDPSession(sivu);
  // Ensin sisään, jotta nipistyksellä on matkaa ulos.
  await rulla(-1, 8);
  const Csisalla = await mitta();
  tieto('C lähtökorkeus (rulla sisään)', Csisalla.alt.toFixed(4));
  await nipistaUlos(cdp);
  C = await mitta();
  nipistysToimi = C.alt > Csisalla.alt * 1.05;
  tieto('C pohja (nipistys ulos)', `korkeus ${C.alt.toFixed(4)} · katto ${C.maxAlt.toFixed(4)}`);
  await kuva('c-nipistys');
} else {
  tieto('C nipistys', 'ohitettu WebKitissä (CDP ei käytettävissä)');
}

/* ---- väitteet ----------------------------------------------------- */
vaadi('V1 maailmatila pois: loitonnus pysähtyy kohdemaan kattoon',
  Number.isFinite(A.maxAlt) && A.maxAlt < 2.5
  && Math.abs(A.alt - A.maxAlt) <= KATOSSA_VARA * A.maxAlt,
  JSON.stringify({ alt: A.alt, katto: A.maxAlt }));

vaadi(`V2 maailmatila päälle: katto nousee heti kytkennästä ≥ ${KATTO_KERROIN}×`,
  Bkytkin.maxAlt >= KATTO_KERROIN * A.maxAlt,
  JSON.stringify({ ennen: A.maxAlt, jalkeen: Bkytkin.maxAlt }));

vaadi(`V3 maailmatila päällä: rulla ulos vie korkeuden ≥ ${KATTO_KERROIN}× A:n katosta`,
  B.alt >= KATTO_KERROIN * A.maxAlt,
  JSON.stringify({ B: B.alt, Akatto: A.maxAlt }));

vaadi('V4 pallon halkaisija ≤ ruudun leveys (ja ≥ puolet siitä)',
  B.halkaisijaPx <= B.leveysPx + 1 && B.halkaisijaPx >= B.leveysPx / 2,
  JSON.stringify({ halkaisija: B.halkaisijaPx, leveys: B.leveysPx }));

if (C && nipistysToimi) {
  vaadi(`V5 nipistys vie yhtä kauas kuin rulla (±${Math.round(NIPISTYS_VARA * 100)} %)`,
    Math.abs(C.alt - B.alt) <= NIPISTYS_VARA * B.alt,
    JSON.stringify({ nipistys: C.alt, rulla: B.alt }));
} else {
  console.log('      V5 nipistys: ele ei liikuttanut kameraa tässä selaimessa — ei mitattu');
}

vaadi('V6 ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));

console.log(VASTAKOE
  ? `\nVASTAKOE: V2, V3 ja V4 OVAT KAATUNEET, jos korjaus on oikea. ${lapi}/${kaikki}`
  : `\n${lapi}/${kaikki}`);
await selain.close();
palvelin.close();
process.exit(VASTAKOE ? 0 : (lapi === kaikki ? 0 : 1));
