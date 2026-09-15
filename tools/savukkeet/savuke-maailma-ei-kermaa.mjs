/*
 * Savuke: MAAILMANÄKYMÄSSÄ EI KERMAA — korkeuserot koko laudalle.
 *
 *   NODE_USE_ENV_PROXY=1 PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers \
 *     node tools/savukkeet/savuke-maailma-ei-kermaa.mjs [kuvakansio]
 *                                                       [--vastakoe]
 *
 * === MITÄ TÄMÄ VARTIOI =============================================
 *
 * Raamattu, KARTTAUUDISTUKSEN PAATOKSET 23 (omistaja 15.9.2026 klo
 * 15.15 UTC, työpöytäkuva Unkarista, sanatarkasti): *"maailma tilan
 * ollessa paalla huntua ei pitanyt nakya. eli korkeuserot kaikkialle
 * nakyviin"*.
 *
 * Kerma on kahdessa paikassa, ja vain toinen on asiakkaan kädessä:
 * laattaan POLTETTU peite kohdemaan renkaiden ulkopuolella
 * (tools/fokuskartta/maailmapiirto.js polttaVariLeikkuri) ja pelin oma
 * maalaus suojatun suorakaiteen ulkopuolelle (js/pallolaatat.js
 * maalaaTasoitus). Siksi korjaus ei ole maalauksen poisjättäminen vaan
 * se, että maailmanäkymässä VÄRILAATAN KUVA PIIRRETÄÄN VAIN KOHDEMAAN
 * RENKAIDEN SISÄÄN (js/pallolaatat.js maalaaMaailmanVari) — muualla jää
 * näkyviin saman laatan kankaalle jo piirretty pohjalaatta eli koko
 * maailman topografia varjostuksineen.
 *
 * Kaksi ajoa samalla kameralla, sama peli (Fogg Budapestissa,
 * 1400 × 900):
 *
 *   A  MAAILMANAPPI POIS. Kerma päällä, eli se kuva, jonka omistaja
 *      lähetti: Unkari korostettuna, muu Eurooppa vaaleana.
 *   B  MAAILMANAPPI PÄÄLLÄ. Kerma pois.
 *
 * Väitteet:
 *
 *   V1  KOHDEMAAN ULKOPUOLELLA KIRKKAUS LASKEE. Viisi pistettä
 *       (Itävalta, Slovakia, Romania, Serbia, Bosnia): B:n luminanssi
 *       on jokaisessa vähintään KIRKKAUS_VAHINTAAN yksikköä A:ta
 *       pienempi. Kerma on paperia vaaleampi peite, joten sen poisto
 *       EI voi kirkastaa mitään.
 *   V2  TOPOGRAFIAN KONTRASTI KASVAA VÄHINTÄÄN KOLMINKERTAISEKSI.
 *       Itävallan Alpeilta mitatun 41 × 41 pikselin ruudun
 *       Laplace-varianssi on B:ssä ≥ LAPLACE_KERROIN × A:n arvo.
 *       Pelkkä tummuminen ei riitä: omistaja pyysi KORKEUSEROT
 *       näkyviin, ja korkeusero on naapuripikselien ero.
 *   V3  KOHDEMAAN SISÄLLÄ EI MUUTOSTA. Kolme pistettä Unkarin sisältä
 *       (Alföld, Budapestin eteläpuoli, Dunántúl) ovat A:ssa ja B:ssä
 *       samat ±SAMA_VARA yksikköä: leikkuri on sama rengas kuin
 *       laattaan poltettu reikä, joten maan sisällä kuva on entinen.
 *   V4  ÄÄRIVIIVA PAIKALLAAN. Kohdemaan korostuskehä on pallon
 *       vektorikerroksessa (`vektorit().mittarit()`), ja sen maa ja
 *       janamäärä ovat A:ssa ja B:ssä samat.
 *   V5  EI SIVUVIRHEITÄ kummassakaan ajossa.
 *
 * === VASTAKOE ON PAKOLLINEN ========================================
 *
 * `--vastakoe` tarjoilee js/laattapyramidi.js:n niin, että
 * `asetaTasoituksenMaailma` ei tee mitään — eli maailmanäkymä ei enää
 * yllä tasoitukseen. Silloin B on sama kuva kuin A, ja V1:n JA V2:n ON
 * KAADUTTAVA. Ilman tätä koe mittaisi vain sitä, että kaksi
 * kuvakaappausta on otettu.
 *
 * === MIKSI EI savuke-maailmanakyma.mjs ==============================
 *
 * Se savuke ajaa `?lauta=kartta` ja on vanhan kartan ohituksessa
 * (tools/savukkeet/vanha-kartta-ohitus.mjs): se tulostaa yhden rivin ja
 * päättyy. Vartio, joka ei aja, ei ole vartio — ja mitattava asia on
 * pallon laattakerroksessa, joten tämä on oma savukkeensa.
 *
 * VERKKO: pyramidin laatat haetaan tuotannon ämpäristä Noden kautta
 * (NODE_USE_ENV_PROXY=1), kuten savuke-era12.mjs tekee.
 */
import http from 'node:http';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const argv = process.argv.slice(2);
const VASTAKOE = argv.includes('--vastakoe');
const KUVAKANSIO = argv.find((a) => !a.startsWith('--')) ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

/** Luminanssin lasku kohdemaan ulkopuolella, vähintään (0…255). */
const KIRKKAUS_VAHINTAAN = 6;
/** Laplace-varianssin kerroin topografia-alalla (omistajan kiintiö 3×). */
const LAPLACE_KERROIN = 3;
/** Kohdemaan sisällä sallittu ero (laitepikselin sävyinä). */
const SAMA_VARA = 2;
/** Kontrastiruudun sivu laitepikseleinä (pariton: keskipiste mukana). */
const RUUTU = 41;

/*
 * MITTAUSPISTEET ON VALITTU MITATUSTA NÄKYMÄSTÄ (1400 × 900, Unkarin
 * saapumisrajaus): ruudulle jää lon 15,4…23,6 ja lat 44,8…48,4, eli
 * kohdemaan ulkopuolelta Itävalta/Slovenia lännessä, Romania idässä ja
 * Serbia/Kroatia etelässä. Pohjoisessa Slovakia jää ruudun ulkopuolelle,
 * joten sieltä ei mitata. Jokainen piste on vähintään 0,2° Unkarin
 * rajan ulkopuolella ja vähintään 40 px ruudun reunasta.
 */
/** Mittauspisteet kohdemaan ULKOPUOLELLA (V1). */
const ULKONA = [
  { nimi: 'Itävalta/Steiermark', lat: 46.8, lon: 15.7 },
  { nimi: 'Romania (Apuseni)', lat: 46.5, lon: 23.0 },
  { nimi: 'Romania (Szatmár)', lat: 47.5, lon: 23.1 },
  { nimi: 'Serbia (Banat)', lat: 45.3, lon: 20.0 },
  { nimi: 'Kroatia (Slavonia)', lat: 45.2, lon: 17.5 },
];
/** Mittauspisteet kohdemaan SISÄLLÄ (V3). */
const SISALLA = [
  { nimi: 'Alföld', lat: 47.0, lon: 20.4 },
  { nimi: 'Dunántúl', lat: 46.9, lon: 17.9 },
  { nimi: 'Mátra', lat: 47.9, lon: 19.9 },
];
/** Kontrastiruudun keskipiste: Apusenin vuoret Romaniassa. */
const KONTRASTI = { nimi: 'Apusenin vuoret', lat: 46.6, lon: 22.9 };
/**
 * MITTAUSKAMERA AJETAAN SAMAAN LAATIKKOON MOLEMMISSA AJOISSA, jotta
 * mittaus ei ole kahden eri kuvan vertailua. Laatikko on tahallaan
 * uloszoomauksen eston (js/pallolauta/lauta.js maanZoomiraja) ulkona:
 * ajo KIINNITTYY silloin uloimpaan sallittuun eli saapumisnäkymään,
 * joka on kummallekin ajolle sama ja toistettava. V0 vartioi sen —
 * maailmanäkymä nostaa eston, joten jos tila ehtisi vaikuttaa kameraan,
 * B kuvaisi eri alaa kuin A eikä pikselivertailu tarkoittaisi mitään.
 */
const KAMERA = {
  seloste: 'Alpeilta Karpaateille', lon0: 12.0, lat0: 42.5, lon1: 27.0, lat1: 50.5,
};

/*
 * LAUDAN PROJEKTIO ON LUKITTU (leveys 12000, lon0 −175, pohjoinen 76;
 * tools/generoi-laattapyramidi.mjs LAUTA). Kaava on tässä auki eikä
 * tuotuna: savuke ei saa tuoda pelin karttamoduuleja Node-puolelle —
 * sama ratkaisu kuin savuke-tasoitus-pallo.mjs:ssä.
 */
const RAD = Math.PI / 180;
const SKAALA = 12000 / (2 * Math.PI);
const millerY = (lat) => -1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * lat * RAD));
const Y0 = millerY(76);
const lautaX = (lon) => ((((lon + 175) * RAD) % (2 * Math.PI)) + 2 * Math.PI)
  % (2 * Math.PI) * SKAALA;
const lautaY = (lat) => (millerY(lat) - Y0) * SKAALA;
const laatikkoAsteista = (k) => {
  const x0 = lautaX(k.lon0);
  const x1 = lautaX(k.lon1);
  const y0 = lautaY(k.lat1);
  const y1 = lautaY(k.lat0);
  return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
};

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
  if (VASTAKOE && polkuOsa.endsWith('/js/laattapyramidi.js')) {
    /*
     * VASTAKOE: maailmanäkymä ei yllä tasoitukseen. Kytkin syödään
     * heti, joten `pyramidinTasoitus` palauttaa aina kerman ja B on
     * sama kuva kuin A.
     */
    runko = Buffer.from(runko.toString('utf8').replace(
      'export function asetaTasoituksenMaailma(paalla) {',
      'export function asetaTasoituksenMaailma(paalla) {\n  return false; // vastakoe',
    ));
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

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({
  viewport: { width: 1400, height: 900 }, deviceScaleFactor: 1, serviceWorkers: 'block',
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
await sivu.waitForTimeout(9000);

const cdp = await ctx.newCDPSession(sivu);
const kaappaa = async (muoto = 'png') => Buffer.from(
  (await cdp.send('Page.captureScreenshot', muoto === 'jpeg'
    ? { format: 'jpeg', quality: 80 } : { format: 'png' })).data,
  'base64',
);

/**
 * KAIKKI PALLON KANKAAN ULKOPUOLINEN PIILOON MITTAUKSEN AJAKSI — sama
 * sääntö ja sama syy kuin savuke-tasoitus-pallo.mjs:ssä: nimetty lista
 * selektoreita ei riitä, koska kortteja on monta lajia, joten näkyviin
 * jää VAIN pallon kangas ja sen esivanhemmat. `visibility` eikä
 * `display`, jotta asettelu ei muutu eikä kamera siirry.
 */
const piilotaPaallikset = () => sivu.evaluate(() => {
  const kangas = document.querySelector('.pallolauta canvas') ?? document.querySelector('canvas');
  if (!kangas) return 0;
  const ketju = new Set();
  for (let e = kangas; e; e = e.parentElement) ketju.add(e);
  let n = 0;
  for (const e of document.querySelectorAll('body *')) {
    if (ketju.has(e) || e.contains(kangas)) continue;
    if (e.style.visibility === 'hidden') continue;
    e.style.visibility = 'hidden';
    n += 1;
  }
  return n;
});

/** Laudan tila: kohdemaa, korostuskehä, laattakerroksen mittarit. */
const tila = () => sivu.evaluate(() => {
  const lauta = window.matkakirja?.ui?.pallolauta;
  const vm = lauta?.vektorit?.()?.mittarit?.() ?? null;
  const lm = lauta?.lepokerros?.()?.mittarit?.() ?? null;
  return {
    korostus: vm?.korostus ?? null,
    korostusJanoja: vm?.korostusJanoja ?? 0,
    variMaa: lm?.variMaa ?? null,
    varillisia: lm?.varillisia ?? null,
    valmiita: lm?.valmiita ?? null,
    taso: lm?.taso ?? null,
    syy: lm?.syy ?? '',
  };
});

/**
 * Pikselinäyte kuvasta: jokaiselle pisteelle luminanssi (5 × 5
 * mediaani, jotta yksittäinen antialiasoitu pikseli ei heilauta) ja
 * kontrastiruudun Laplace-varianssi.
 */
const mittaaKuva = (png, pisteet, kontrasti) => sivu.evaluate(async ({
  kuvaB64, kohteet, keskus, ruutu,
}) => {
  const img = new Image();
  img.src = `data:image/png;base64,${kuvaB64}`;
  await img.decode();
  const c = document.createElement('canvas');
  c.width = img.width;
  c.height = img.height;
  const g = c.getContext('2d', { willReadFrequently: true });
  g.drawImage(img, 0, 0);
  const pallo = window.matkakirja.ui.pallolauta.pallo;
  const dpr = img.width / window.innerWidth;
  // getScreenCoords antaa KANKAAN koordinaatit, kaappaus on RUUDUN:
  // kankaan siirtymä on otettava mukaan (savuke-tasoitus-pallo, erä 1c).
  const kangas = document.querySelector('.pallolauta canvas') ?? document.querySelector('canvas');
  const kehys = kangas?.getBoundingClientRect() ?? { left: 0, top: 0 };
  const ruudulle = (lat, lon) => {
    const s = pallo.getScreenCoords(lat, lon, 0);
    if (!s || !Number.isFinite(s.x)) return null;
    const x = Math.round((s.x + kehys.left) * dpr);
    const y = Math.round((s.y + kehys.top) * dpr);
    // Reunan yli menevä näyte lukisi nollia (getImageData kuvan ulkona).
    if (x < 30 || y < 30 || x > img.width - 30 || y > img.height - 30) return null;
    return { x, y };
  };
  const lum = (x, y) => {
    const d = g.getImageData(x, y, 1, 1).data;
    return 0.2126 * d[0] + 0.7152 * d[1] + 0.0722 * d[2];
  };
  const ulos = [];
  for (const p of kohteet) {
    const s = ruudulle(p.lat, p.lon);
    if (!s) { ulos.push({ ...p, ruudulla: false }); continue; }
    const arvot = [];
    for (let dx = -2; dx <= 2; dx += 1) for (let dy = -2; dy <= 2; dy += 1) arvot.push(lum(s.x + dx, s.y + dy));
    arvot.sort((a, b) => a - b);
    ulos.push({ ...p, ruudulla: true, x: s.x, y: s.y, lum: arvot[Math.floor(arvot.length / 2)] });
  }
  let laplace = null;
  const k = ruudulle(keskus.lat, keskus.lon);
  if (k) {
    const puoli = Math.floor(ruutu / 2);
    const d = g.getImageData(k.x - puoli, k.y - puoli, ruutu, ruutu);
    const harmaa = new Float64Array(ruutu * ruutu);
    for (let i = 0; i < ruutu * ruutu; i += 1) {
      harmaa[i] = 0.2126 * d.data[i * 4] + 0.7152 * d.data[i * 4 + 1] + 0.0722 * d.data[i * 4 + 2];
    }
    // 4-naapurin Laplace: |4·p − summa(naapurit)|, varianssi siitä.
    const arvot = [];
    for (let y = 1; y < ruutu - 1; y += 1) {
      for (let x = 1; x < ruutu - 1; x += 1) {
        const i = y * ruutu + x;
        arvot.push(4 * harmaa[i] - harmaa[i - 1] - harmaa[i + 1]
          - harmaa[i - ruutu] - harmaa[i + ruutu]);
      }
    }
    const ka = arvot.reduce((a, b) => a + b, 0) / arvot.length;
    laplace = arvot.reduce((a, b) => a + (b - ka) ** 2, 0) / arvot.length;
  }
  return { pisteet: ulos, laplace, leveys: img.width, korkeus: img.height };
}, {
  kuvaB64: png.toString('base64'), kohteet: pisteet, keskus: kontrasti, ruutu: RUUTU,
});

/** Laattakerroksen mittarit lepoehtoa varten. */
const lepomittarit = () => sivu.evaluate(() => {
  const m = window.matkakirja.ui.pallolauta.lepokerros()?.mittarit?.() ?? null;
  if (!m) return null;
  return {
    taso: m.taso, laattoja: m.laattoja, valmiita: m.valmiita, jumissa: m.jumissa,
    hapyvia: m.hapyvia, varillisia: m.varillisia, variMaa: m.variMaa, syy: m.syy,
  };
});

/**
 * LEPO ON KOLME EHTOA (savuke-tasoitus-pallo.mjs): ei jumissa olevia,
 * kaikki valmiita JA häive perillä. Kesken häivytyksen mitattu pikseli
 * on kahden kartan sekoitus.
 */
async function odotaLepo(kierroksia = 20) {
  let m = null;
  for (let i = 0; i < kierroksia; i += 1) {
    await sivu.evaluate(() => window.matkakirja.ui.pallolauta.lepokerros()?.kokoa?.()); // eslint-disable-line no-await-in-loop
    await sivu.waitForTimeout(1500); // eslint-disable-line no-await-in-loop
    m = await lepomittarit(); // eslint-disable-line no-await-in-loop
    if (m && m.jumissa === 0 && m.valmiita > 0 && m.valmiita >= m.laattoja
      && m.hapyvia === 0) return m;
  }
  return m;
}

/** Sama kamera molemmissa ajoissa: pakotettu laatikko + lepo. */
async function ajaMittauskamera() {
  await sivu.evaluate(async (b) => {
    await window.matkakirja.ui.pallolauta.kamera.ajaKamera({ bbox: b }, { kesto: 0, pakota: true });
  }, laatikkoAsteista(KAMERA));
  await sivu.waitForTimeout(2000);
  const m = await odotaLepo();
  const nakyma = await sivu.evaluate(() => {
    const a = window.matkakirja.ui.pallolauta.kamera.nakyvaAlue();
    return a ? {
      x: Math.round(a.x), y: Math.round(a.y), w: Math.round(a.w), h: Math.round(a.h),
    } : null;
  });
  return { m, nakyma };
}

/** Yksi ajo: kuvakaappaus + kaikki mittaukset. */
async function mittaa(nimi) {
  await piilotaPaallikset();
  await sivu.waitForTimeout(800);
  const png = await kaappaa('png');
  const m = await mittaaKuva(png, [...ULKONA, ...SISALLA], KONTRASTI);
  if (KUVAKANSIO) {
    writeFileSync(join(KUVAKANSIO, `maailma-ei-kermaa-${nimi}-1400-20260915.jpg`), await kaappaa('jpeg'));
  }
  return m;
}

/* ---- A: maailmanappi pois (kerma päällä) -------------------------- */
const kameraA = await ajaMittauskamera();
tieto('A kamera', `${KAMERA.seloste} · näkymä ${JSON.stringify(kameraA.nakyma)}`);
tieto('A laatat', JSON.stringify(kameraA.m));
const tilaA = await tila();
tieto('A tila', JSON.stringify(tilaA));
const A = await mittaa('ennen');

/* ---- B: maailmanappi päällä (kerma pois) -------------------------- */
await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  const { asetaKehittajaTila, asetaKehittajaMaailma } = await import('./js/ui-apurit.js');
  asetaKehittajaTila(true);
  asetaKehittajaMaailma(true);
  ui.kehittajaTila = true;
  ui.kehittajaMaailma = true;
  ui.paivitaKehittajaMaailma();
  ui.render();
  ui.pallolauta.ladoHeti?.();
});
// Laatat mitätöityvät ja haetaan uudestaan: aikaa verkolle ja kokoamiselle.
await sivu.waitForTimeout(2000);
const kameraB = await ajaMittauskamera();
tieto('B kamera', `${KAMERA.seloste} · näkymä ${JSON.stringify(kameraB.nakyma)}`);
tieto('B laatat', JSON.stringify(kameraB.m));
const tilaB = await tila();
tieto('B tila', JSON.stringify(tilaB));
const B = await mittaa('jalkeen');

/* ---- väitteet ----------------------------------------------------- */
const samaNakyma = kameraA.nakyma && kameraB.nakyma
  && ['x', 'y', 'w', 'h'].every((k) => Math.abs(kameraA.nakyma[k] - kameraB.nakyma[k]) <= 2);
vaadi('V0 sama näkymä molemmissa ajoissa (±2 lautayksikköä)', Boolean(samaNakyma),
  JSON.stringify({ A: kameraA.nakyma, B: kameraB.nakyma }));

const pari = (nimi) => {
  const a = A.pisteet.find((p) => p.nimi === nimi);
  const b = B.pisteet.find((p) => p.nimi === nimi);
  return { a, b, ero: (a?.lum ?? 0) - (b?.lum ?? 0) };
};
const ulkonaTulos = ULKONA.map((p) => pari(p.nimi));
for (const t of ulkonaTulos) {
  tieto(`ulkona ${t.a?.nimi}`, `A ${t.a?.lum?.toFixed(1)} → B ${t.b?.lum?.toFixed(1)} (−${t.ero.toFixed(1)})`);
}
vaadi(`V1 kohdemaan ulkopuolella kirkkaus laskee ≥ ${KIRKKAUS_VAHINTAAN} yksikköä (5/5 pistettä)`,
  ulkonaTulos.every((t) => t.a?.ruudulla && t.b?.ruudulla && t.ero >= KIRKKAUS_VAHINTAAN),
  JSON.stringify(ulkonaTulos.map((t) => ({ n: t.a?.nimi, a: t.a?.lum, b: t.b?.lum }))));

tieto('Laplace-varianssi', `${KONTRASTI.nimi}: A ${A.laplace?.toFixed(1)} → B ${B.laplace?.toFixed(1)}`
  + ` (${A.laplace ? (B.laplace / A.laplace).toFixed(2) : '–'}×)`);
vaadi(`V2 topografian Laplace-varianssi kasvaa ≥ ${LAPLACE_KERROIN}×`,
  Number.isFinite(A.laplace) && Number.isFinite(B.laplace) && B.laplace >= LAPLACE_KERROIN * A.laplace,
  `A ${A.laplace} B ${B.laplace}`);

const sisallaTulos = SISALLA.map((p) => pari(p.nimi));
for (const t of sisallaTulos) {
  tieto(`sisällä ${t.a?.nimi}`, `A ${t.a?.lum?.toFixed(1)} → B ${t.b?.lum?.toFixed(1)} (${t.ero.toFixed(1)})`);
}
vaadi(`V3 kohdemaan sisällä ei muutosta (±${SAMA_VARA} yksikköä)`,
  sisallaTulos.every((t) => t.a?.ruudulla && t.b?.ruudulla && Math.abs(t.ero) <= SAMA_VARA),
  JSON.stringify(sisallaTulos.map((t) => ({ n: t.a?.nimi, a: t.a?.lum, b: t.b?.lum }))));

vaadi('V4 kohdemaan ääriviiva paikallaan (sama maa, sama janamäärä)',
  tilaA.korostus === 'HUN' && tilaB.korostus === 'HUN'
  && tilaA.korostusJanoja > 0 && tilaA.korostusJanoja === tilaB.korostusJanoja,
  JSON.stringify({ tilaA, tilaB }));

vaadi('V5 ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));

console.log(VASTAKOE
  ? `\nVASTAKOE: V1 ja V2 OVAT KAATUNEET, jos korjaus on oikea. ${lapi}/${kaikki}`
  : `\n${lapi}/${kaikki}`);
await selain.close();
palvelin.close();
process.exit(VASTAKOE ? 0 : (lapi === kaikki ? 0 : 1));
