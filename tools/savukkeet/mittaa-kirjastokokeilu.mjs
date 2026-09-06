/*
 * MITTARI: valmiit karttapallokirjastot pelin laatoilla (Fablemax 6.9.2026,
 * omistaja: *"Tai löytyisikö netistä tähän jo valmista koodiratkaisua?"*).
 *
 *   NODE_USE_ENV_PROXY=1 node tools/savukkeet/mittaa-kirjastokokeilu.mjs
 *       --koe=maplibre|kolmiulotteiset-laatat|openglobus|cesium
 *       [--nakyma=puhelin|tyopoyta] [--throttle=4] [--ulos=<kansio>] [--haku=tilesize=256]
 *
 * Ajaa tools/kokeilut/pallon-liike/<koe>.html:n samoilla ehdoilla kuin
 * mittaa-pallon-liike.mjs ajaa pelin pallon: puhelinkoko 390 × 844 dpr 3,
 * CPU-throttle 4× mittausjaksoilla, kirjasto ja laatat reititetään Noden
 * fetchillä (selain ei pääse kontista verkkoon). Kirjaa: kirjaston tavut
 * ja käynnistysaika, reunan leveys levossa ja liikkeessä, panoroinnin
 * kehysajat ja laattapyynnöt, zoomin kuvasarja (tyhjän osuus, perättäisten
 * kuvien ero). Sivut toteuttavat yhteisen window.koe-rajapinnan.
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { extname, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { decodePng, reunanLeveys, tyhjanOsuus, kuvienEro, pinta, p } from './pallon-liike-mittarit.mjs';

const JUURI = process.env.JUURI ?? join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const arg = (n, d) => (process.argv.find((a) => a.startsWith(`--${n}=`))?.split('=')[1] ?? d);
const KOE = arg('koe', 'maplibre');
const NAKYMA = arg('nakyma', 'puhelin');
const THROTTLE = Number(arg('throttle', NAKYMA === 'puhelin' ? 4 : 1));
const HAKU = arg('haku', '');
const KORKEUS = Number(arg('korkeus', 0.35));
const ZOOM_LOPPU = Number(arg('zoomloppu', 0.05));
/** Levon odotus ennen kaappausta (ms): laatat kulkevat kontissa Noden fetchin kautta hitaasti. */
const LEPO_MS = Number(arg('lepo', 5000));
const TUNNISTE = arg('tunniste', KOE + (HAKU ? `-${HAKU.replace(/[^a-z0-9]+/gi, '_')}` : ''));
const ULOS = arg('ulos', process.env.ULOS ?? '/tmp/matkakirja-kaappaukset/pallon-liike');
mkdirSync(ULOS, { recursive: true });
const paketti = await import('/opt/node22/lib/node_modules/playwright/index.js');
const chromium = paketti.chromium ?? paketti.default?.chromium;

const TYYPIT = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.jpg': 'image/jpeg', '.png': 'image/png' };
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/tools/kokeilut/pallon-liike/${KOE}.html${HAKU ? `?${HAKU}` : ''}`;

const valimuisti = new Map();
const kirjastoTavut = { yht: 0, tiedostoja: 0 };
async function haeVerkosta(url) {
  if (valimuisti.has(url)) return valimuisti.get(url);
  const lupaus = fetch(url).then(async (v) => (v.ok
    ? { status: 200, body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
    : { status: v.status, body: Buffer.alloc(0), tyyppi: 'text/plain' }))
    .catch(() => null);
  valimuisti.set(url, lupaus);
  return lupaus;
}

const NAKYMAT = {
  puhelin: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
  tyopoyta: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 },
};
const nakyma = { ...NAKYMAT[NAKYMA] };
if (arg('dpr', null)) nakyma.deviceScaleFactor = Number(arg('dpr'));
const dpr = nakyma.deviceScaleFactor;
const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({ ...nakyma, serviceWorkers: 'block' });
const sivu = await ctx.newPage();
const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
sivu.on('console', (m) => { if (m.type() === 'error') virheet.push(m.text().slice(0, 200)); });
const pyynnot = [];
sivu.on('request', (r) => { const url = r.url(); if (url.includes('julisteet/')) pyynnot.push({ t: Date.now(), url }); });
await sivu.route(/cdn\.jsdelivr\.net|unpkg\.com|media\.matkakirja\.app|r2\.dev\//, async (route) => {
  const url = route.request().url();
  const vastaus = await haeVerkosta(url);
  if (!vastaus || vastaus.status !== 200) { route.abort(); return; }
  if (!url.includes('julisteet/')) { kirjastoTavut.yht += vastaus.body.length; kirjastoTavut.tiedostoja += 1; }
  route.fulfill({ status: 200, contentType: vastaus.tyyppi ?? 'application/octet-stream', body: vastaus.body, headers: { 'access-control-allow-origin': '*' } });
});
const cdp = await ctx.newCDPSession(sivu);
const hidasta = (paalla) => cdp.send('Emulation.setCPUThrottlingRate', { rate: paalla && THROTTLE > 1 ? THROTTLE : 1 });

const t0 = Date.now();
await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 180000 });
await sivu.waitForFunction(() => Boolean(window.koe), null, { timeout: Number(arg('odotus', 180000)) })
  .catch((e) => { console.log('SIVUN VIRHEET', JSON.stringify(virheet.slice(0, 8))); throw e; });
const kaynnistys = await sivu.evaluate(() => window.koe.valmis.then((v) => v ?? true));
const kaynnistysMs = Date.now() - t0;
const tulos = { koe: KOE, nakyma: NAKYMA, dpr, throttle: THROTTLE, haku: HAKU, kaynnistysMs, kaynnistys, kirjasto: null, kirjastoTavut: null };
tulos.kirjasto = await sivu.evaluate(() => ({ nimi: window.koe.nimi, versio: window.koe.versio, lisenssi: window.koe.lisenssi }));
tulos.kirjastoTavut = { ...kirjastoTavut, kt: Math.round(kirjastoTavut.yht / 1024) };

const kuvat = [];
const kaappaa = async (nimi) => {
  const polku = join(ULOS, `${NAKYMA}-koe-${TUNNISTE}-${nimi}.png`);
  const buf = await sivu.screenshot({ path: polku, timeout: 120000 });
  kuvat.push(polku);
  return decodePng(buf);
};
const keski = {
  x0: Math.round(nakyma.viewport.width * 0.2 * dpr), x1: Math.round(nakyma.viewport.width * 0.8 * dpr),
  y0: Math.round(nakyma.viewport.height * 0.25 * dpr), y1: Math.round(nakyma.viewport.height * 0.75 * dpr),
};
await sivu.evaluate(() => {
  const M = { kehykset: [], mittaa: false };
  window.__mittarit = M;
  let edellinen = performance.now();
  const askel = (t) => { if (M.mittaa) M.kehykset.push(t - edellinen); edellinen = t; requestAnimationFrame(askel); };
  requestAnimationFrame(askel);
});
const mittausAlkaa = async () => { await hidasta(true); await sivu.evaluate(() => { window.__mittarit.kehykset = []; window.__mittarit.mittaa = true; }); };
const mittausLoppuu = async () => { const m = await sivu.evaluate(() => { window.__mittarit.mittaa = false; return window.__mittarit.kehykset; }); await hidasta(false); return m; };
const tila = () => sivu.evaluate(() => window.koe.tila());
const aseta = (n) => sivu.evaluate((n) => window.koe.asetaNakyma(n), n);
const aja = (n, kesto) => sivu.evaluate(({ n, kesto }) => window.koe.ajaNakyma(n, kesto), { n, kesto });
const ATEENA = { lat: 37.98, lng: 23.73 };
// Näkyvä leveys asteina (fov 50°, kuvasuhde): sama kaava kuin pelin kamera.
const leveysAst = KORKEUS * 2 * Math.tan((25 * Math.PI) / 180) * (180 / Math.PI) * (nakyma.viewport.width / nakyma.viewport.height);
tulos.leveysAst = +leveysAst.toFixed(2);

/* 1. lepo */
await aseta({ ...ATEENA, korkeus: KORKEUS });
await sivu.waitForTimeout(LEPO_MS);
tulos.lepo = { tila: await tila(), viiva: pinta(await kaappaa('1-lepo'), keski) };

/* 2. panorointi kaksi ruudunleveyttä itään, hidastettuna */
const kohde = { lat: ATEENA.lat, lng: ATEENA.lng + 2 * leveysAst, korkeus: KORKEUS };
const pyyntojaEnnen = pyynnot.length;
await mittausAlkaa();
const tp = Date.now();
await aja(kohde, 4000);
const kesto = Date.now() - tp;
const kehykset = await mittausLoppuu();
tulos.pano = {
  kestoMs: kesto, kehyksia: kehykset.length, p50: p(kehykset, 0.5), p95: p(kehykset, 0.95), max: p(kehykset, 1),
  laattapyyntoja: pyynnot.length - pyyntojaEnnen, tilaJalkeen: await tila(),
};
await sivu.waitForTimeout(LEPO_MS);
tulos.pano.levossaJalkeen = { tila: await tila(), viiva: pinta(await kaappaa('1b-lepo-perilla'), keski) };
/* paluu: kaappaus kesken liikkeen */
const paluu = aja({ ...ATEENA, korkeus: KORKEUS }, 8000);
await sivu.waitForTimeout(2500);
const t1 = await tila();
const k1 = await kaappaa('2-liike');
await sivu.waitForTimeout(1500);
const t2 = await tila();
const k2 = await kaappaa('2b-liike');
await paluu;
tulos.liike = { tila: t1, viiva: pinta(k1, keski), tila2: t2, viiva2: pinta(k2, keski) };
await sivu.waitForTimeout(4000);
tulos.lepoPaluu = { tila: await tila(), viiva: pinta(await kaappaa('3-lepo-paluu'), keski) };

/* 3. zoom: kehysajat hidastettuna, sitten kuvasarja */
await aseta({ ...ATEENA, korkeus: 2.5 });
await sivu.waitForTimeout(4000);
const pyyntojaZ = pyynnot.length;
await mittausAlkaa();
await aja({ ...ATEENA, korkeus: ZOOM_LOPPU }, 8000);
const zk = await mittausLoppuu();
tulos.zoom = { p50: p(zk, 0.5), p95: p(zk, 0.95), max: p(zk, 1), kehyksia: zk.length, laattapyyntoja: pyynnot.length - pyyntojaZ };
await sivu.waitForTimeout(3000);
await aseta({ ...ATEENA, korkeus: 2.5 });
await sivu.waitForTimeout(4000);
const SARJA_MS = Number(arg('sarjams', 12000));
const ajo = aja({ ...ATEENA, korkeus: ZOOM_LOPPU }, SARJA_MS);
const sarja = [];
let edellinenKuva = null;
const alku = Date.now();
let i = 0;
while (Date.now() - alku < SARJA_MS + 300) {
  const t = await tila();
  const kuva = await kaappaa(`4-zoom-${String(i).padStart(2, '0')}`);
  sarja.push({ i, t: Date.now() - alku, korkeus: t.korkeus, taso: t.taso ?? null, laattoja: t.laattoja, tyhja: tyhjanOsuus(kuva, keski), ero: edellinenKuva ? kuvienEro(edellinenKuva, kuva, keski) : null, reuna: reunanLeveys(kuva, keski).leveys });
  edellinenKuva = kuva;
  i += 1;
}
await ajo;
tulos.zoom.sarja = sarja;
await sivu.waitForTimeout(LEPO_MS);
tulos.zoom.lepo = { tila: await tila(), viiva: pinta(await kaappaa('5-zoom-lepo'), keski) };

tulos.virheet = virheet.slice(0, 6);
tulos.kuvat = kuvat;
const raportti = join(ULOS, `${NAKYMA}-koe-${TUNNISTE}.json`);
writeFileSync(raportti, JSON.stringify(tulos, null, 1));
console.log(JSON.stringify(tulos, null, 1));
console.log('RAPORTTI', raportti);
await selain.close();
palvelin.close();
