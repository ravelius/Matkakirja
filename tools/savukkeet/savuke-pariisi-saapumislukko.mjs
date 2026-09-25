/*
 * Savuke: LATTIAKERTOIMELLA EI LUKITA — PARIISI PYSYY PISTEESSÄÄN
 * SAAPUMISESSA (Fablen päätös 25.9.2026; mekanismi ja mittaus
 * js/pallolauta/nimet.js LATTIAKERTOIMELLA LADOTTUA NIMEÄ EI LUKITA).
 *
 * Löydös: Natiivi-UI:n webmittaus 25.9.2026 (Ranska iPhone 402 × 874):
 * PARIISI piirtyi 185 px:n päähän pisteestään. Syy: ensimmäinen
 * ladonta ajettiin maailmanäkymässä (kerroin lattiassa 0,2, koko
 * 2,70 px), lukko syntyi siellä (dx 37,03) ja kerrottiin saapumisessa
 * 13,5 / 2,696 = 5,008-kertaiseksi → dx 185,42. Toistui kolmessa
 * ajossa yhdestätoista.
 *
 * ── VARTIOT ───────────────────────────────────────────────────────
 *   1. JOKA AJOSSA (11) Pariisin nimen näkyvä etäisyys pisteestään
 *      (hypot(dx, dy) × kuoren kerroin) on levossa < 16 px.
 *   2. SAAPUMISEN AIKANA ei yhtään luettavaa kehystä (nimi ≥ 6 px),
 *      jossa Pariisin etäisyys olisi ≥ 16 px — nimi ei hyppää
 *      paikalleen kaukaa.
 *   3. SAAPUMISEN AIKANA kummankaan nimen (Pariisi, Marseille) koko ei
 *      ylitä 16 px:ää yhdessäkään kehyksessä (saapumisnäkymän koko on
 *      13,5 px). Maailmanäkymän datumi kuoren kertoimella oli mainissa
 *      110–150 ms 402 px:n kokoinen (ks. nimet.js).
 *
 * Mitta luetaan samoista luvuista kuin runko piirtää: GL-sovittimen
 * viimeisin datumi (dx, dy, koko) × kotelon --nimiokerroin.
 *
 * VASTAKOE: `NIMET=<polku>` tarjoilee toisen js/pallolauta/nimet.js:n
 * (esim. `git show origin/main:js/pallolauta/nimet.js`). Mainin
 * versiolla vartio 3 kaatui Marseillen kohdalla 4/4 ajossa. Vartion 1
 * vika (Pariisi lukittuna maailmanäkymässä) toistui tuotannossa 3/11,
 * mutta paikallisesti ei: täällä Pariisi ei mahdu maailmanäkymän
 * ladontaan (65 nostovarausta sen ympärillä), joten lukkoa ei synny.
 * Mekanismi on siksi lisäksi yksikkötestissä
 * (tests/pallonimikyltti.test.mjs vartio 10).
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1).
 * Aja:  NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-pariisi-saapumislukko.mjs [ajoja]
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

const paketti = await import('playwright')
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const AJOJA = Number(process.argv[2] ?? 11);
/** Suurin sallittu näkyvä etäisyys nimestä pisteeseen (px). Normaali on 14,5. */
const ETAISYYDEN_RAJA_PX = 16;
/** Tätä pienempi nimi ei ole luettava (maailmanäkymän 2,7 px). */
const LUETTAVA_PX = 6;
/** Suurin sallittu nimen koko saapumisessa (px). Saapumisnäkymässä 13,5. */
const KOON_RAJA_PX = 16;
const NIMET = process.env.NIMET ?? null;
/*
 * VERKON VIIVE ON OSA KOETTA. Ilman viivettä paikallinen palvelin ja
 * Noden välimuisti ovat niin nopeita, ettei maailmanäkymän datumi ehdi
 * kuoren alle (mainin versio läpäisi vartion 3 4/4 ilman viivettä ja
 * kaatui 4/4 viiveellä). Tuotannossa ämpärin vastaukset tulevat
 * hitaammin; tasajakauma 0…VIIVE_MS ms jokaiselle ämpärin vastaukselle
 * palauttaa sen järjestyksen.
 */
const VIIVE_MS = Number(process.env.VIIVE_MS ?? 1500);

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(NIMET && polku.endsWith('js/pallolauta/nimet.js') ? NIMET : polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

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

const selain = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? (existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined),
  // Macilla oikea GPU headlessissä (muistiinpano gpu-headless-metal).
  args: process.platform === 'darwin' ? ['--use-angle=metal'] : [],
});

/** Yksi saapuminen: Pariisin nimi kehys kehykseltä. */
async function ajo() {
  const ctx = await selain.newContext({
    viewport: { width: 402, height: 874 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true,
    serviceWorkers: 'block',
  });
  await ctx.addInitScript(() => {
    window.__kehykset = { pariisi: [], marseille: [] };
    const kierros = () => {
      try {
        const ui = window.matkakirja?.ui;
        const s = ui?.pallolauta?.glSovitin?.();
        const kotelo = document.querySelector('.pallo-kotelo');
        const kuori = parseFloat(kotelo?.style.getPropertyValue('--nimiokerroin')) || 1;
        for (const id of ['pariisi', 'marseille']) {
          const d = s?.viimeiset?.().find((x) => x.id === id);
          if (!d) continue;
          window.__kehykset[id].push({
            t: performance.now(), eta: Math.hypot(d.dx, d.dy) * kuori, px: d.koko * kuori, dx: d.dx, dy: d.dy,
          });
        }
      } catch { /* ohi */ }
      requestAnimationFrame(kierros);
    };
    requestAnimationFrame(kierros);
  });
  const sivu = await ctx.newPage();
  await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
  await sivu.route(/wikimedia\.org/, (r) => r.abort());
  await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (route) => {
    const v = await ampariHaku(route.request().url());
    if (!v || v.status !== 200) { route.abort(); return; }
    await new Promise((ok) => setTimeout(ok, Math.random() * VIIVE_MS));
    route.fulfill({
      status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
  await sivu.goto(`${osoite}?lauta=pallo&dev=marseille`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  // Perillä: Pariisin nimi on ladottu saapumisnäkymän koossa.
  await sivu.waitForFunction(() => (window.__kehykset?.pariisi ?? []).some((k) => k.px >= 10), null, { timeout: 90000 })
    .catch(() => {});
  await sivu.waitForTimeout(3000);
  const kehykset = await sivu.evaluate(() => window.__kehykset);
  await ctx.close();
  return kehykset;
}

const levossa = [];
for (let i = 1; i <= AJOJA; i++) {
  const kaikkiKehykset = await ajo();
  const k = kaikkiKehykset.pariisi;
  const loppu = k.at(-1);
  const kaukana = k.filter((x) => x.px >= LUETTAVA_PX && x.eta >= ETAISYYDEN_RAJA_PX);
  const eta = loppu?.eta ?? NaN;
  levossa.push(eta);
  console.log(`INFO  ajo ${i}: levossa ${eta.toFixed(1)} px (dx ${loppu?.dx?.toFixed(1)}, dy ${loppu?.dy?.toFixed(1)}), `
    + `koko ${loppu?.px?.toFixed(1)} px, kehyksiä ${k.length} (alle ${LUETTAVA_PX} px: `
    + `${k.filter((x) => x.px < LUETTAVA_PX).length}), luettavia kaukana ${kaukana.length}`);
  vaadi(`1. ajo ${i}: Pariisi levossa < ${ETAISYYDEN_RAJA_PX} px pisteestään`, eta < ETAISYYDEN_RAJA_PX, `${eta.toFixed(1)} px`);
  vaadi(`2. ajo ${i}: ei luettavaa kehystä ≥ ${ETAISYYDEN_RAJA_PX} px`, kaukana.length === 0,
    `${kaukana.length} kehystä, suurin ${Math.max(...kaukana.map((x) => x.eta)).toFixed(1)} px`);
  for (const [id, lista] of Object.entries(kaikkiKehykset)) {
    const isot = lista.filter((x) => x.px > KOON_RAJA_PX);
    vaadi(`3. ajo ${i}: ${id} ei kasva yli ${KOON_RAJA_PX} px saapumisessa`, isot.length === 0,
      `${isot.length} kehystä (${isot.length ? (isot.at(-1).t - isot[0].t).toFixed(0) : 0} ms), `
      + `suurin ${Math.max(...isot.map((x) => x.px)).toFixed(1)} px`);
  }
}
console.log(`INFO  levossa: ${levossa.map((v) => v.toFixed(1)).join(', ')}`);
console.log(`\n${lapi}/${kaikki} vartiota läpi`);
await selain.close();
palvelin.close();
process.exit(lapi === kaikki ? 0 : 1);
