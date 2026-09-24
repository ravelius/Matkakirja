#!/usr/bin/env node
/*
 * TASONVAIHDON SALMIAKIT — pysyvätkö karkeat laatat hienomman takana
 * tason vaihtuessa? (Karttaseppä 23.9.2026; omistaja: "vaihdos ei ole
 * nätti, siinä tulee aika häiritsevääkin värinää", kaappaukset
 * docs/raportit/kaappaukset/omistaja-20260923/meri-ropelo-1335-*.webp.)
 *
 * Vika: vaihdossa z → z+1 vanha z ja entinen tuki z−2 saivat saman
 * polygonOffsetin, ja z−2 pisti esiin karkean verkon kärkien ympäriltä
 * tummina salmiakkeina (js/pallolaatat.js laatanSyvyyssiirto).
 *
 * MITTAUS TEHDÄÄN PYSÄYTETYSSÄ VAIHDOSSA: kamera Lioninlahdelle tasolle 7,
 * sitten lähemmäs tasolle 8, mutta z8-laattojen lataus estetään. Vaihdon
 * välitila (vanha z7 + entinen tuki z5) jää ruudulle, ja salmiakit
 * lasketaan kahdelta merialueelta, joilla ei ole koristeita: pikselit,
 * jotka ovat yli 30 harmaasävyaskelta sumennettua ympäristöään tummempia.
 * Main 23.9.2026: 86 (WebKit) / 85 (Chromium); korjattu: 0.
 *
 *   PLAYWRIGHT_JS=… NODE_USE_ENV_PROXY=1 [SAVUKE_MOOTTORI=chromium] [ULOS=kansio]
 *   node tools/savukkeet/mittaa-tasonvaihto-salmiakit.mjs
 * (node_modules repossa tai symlinkkinä: sharp laskee pikselit.)
 */
import http from 'node:http';
import { existsSync, readFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { extname, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = process.env.JUURI ?? join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const { Game } = await import(`${JUURI}/js/game.js`);
const { packById } = await import(`${JUURI}/js/pack.js`);
const pw = await import('playwright').catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const paketti = pw.webkit ? pw : (pw.default ?? pw);
const sharp = createRequire(`${JUURI}/`)('sharp');
const MOOTTORI = process.env.SAVUKE_MOOTTORI ?? 'webkit';
const ULOS = process.env.ULOS ?? '';
if (ULOS) mkdirSync(ULOS, { recursive: true });

const TYYPIT = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.geojson': 'application/json', '.woff2': 'font/woff2', '.bin': 'application/octet-stream' };
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;
const muisti = new Map();
const ampari = (url) => {
  if (!muisti.has(url)) muisti.set(url, fetch(url).then(async (v) => (v.ok ? { body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') } : null)).catch(() => null));
  return muisti.get(url);
};
if (!await ampari('https://media.matkakirja.app/vendor/globe.gl-2.46.2.min.js')) {
  console.log('OHITUS  ämpäri ei vastaa'); palvelin.close(); process.exit(0);
}
const peli = new Game({ players: [{ name: 'Fogg', color: '#c9a227', start: 'pariisi' }], pack: packById('maailmankartta'), seed: 5 });
peli.phase = 'action'; peli.tokens.delete('pariisi');
const tallenne = JSON.stringify(peli.toJSON());

/** Tummat täplät: pikselit, jotka ovat yli KYNNYS sumennettua ympäristöään tummempia. */
const KYNNYS = 30;
const ALUEET = [{ left: 1000, top: 1850, width: 640, height: 250 }, { left: 1200, top: 1450, width: 440, height: 350 }];
async function taplat(kuva) {
  let n = 0;
  for (const alue of ALUEET) {
    const pala = sharp(kuva).extract(alue).greyscale();
    const raaka = await pala.clone().raw().toBuffer();
    const sumea = await pala.clone().blur(12).raw().toBuffer();
    for (let i = 0; i < raaka.length; i += 1) if (sumea[i] - raaka[i] > KYNNYS) n += 1;
  }
  return n;
}

const selain = MOOTTORI === 'chromium'
  ? await paketti.chromium.launch({ executablePath: process.env.CHROMIUM || undefined, args: ['--use-angle=metal'] })
  : await paketti.webkit.launch();
let esta = null;
let tulos = 1;
try {
  const ctx = await selain.newContext({ viewport: { width: 834, height: 1210 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, serviceWorkers: 'block' });
  await ctx.addInitScript((d) => { localStorage.setItem('matkakirja-save-v1', d); localStorage.removeItem('matkakirja-lauta'); localStorage.setItem('matkakirja-suoraan-kartalle', '1'); }, tallenne);
  const sivu = await ctx.newPage();
  const virheet = [];
  sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
  await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (r) => {
    if (esta?.test(r.request().url())) { r.abort(); return; }
    const v = await ampari(r.request().url());
    if (!v) { r.abort(); return; }
    r.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body, headers: { 'access-control-allow-origin': '*' } });
  });
  await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
  await sivu.route(/wikimedia\.org/, (r) => r.abort());
  await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
  await sivu.waitForTimeout(4000);
  await sivu.evaluate(() => {
    const o = window.matkakirja.ui.pallonInstanssi.controls(); o.minDistance = 0; o.maxDistance = 1e9;
    for (const el of document.querySelectorAll('.saapumistraileri, .fokusvirta-isokuva, .fokuskohde-popup, .fokusnosto-kerros')) el.remove();
  });
  const pov = (altitude) => sivu.evaluate((a) => window.matkakirja.ui.pallonInstanssi.pointOfView({ lat: 42.6, lng: 4.0, altitude: a }, 0), altitude);
  const taso = () => sivu.evaluate(() => window.matkakirja.ui.pallolauta.lepokerros?.()?.mittarit?.()?.taso ?? null);
  await pov(0.13);
  await sivu.waitForTimeout(10000);
  const alku = await taso();
  esta = /\/z8\//;
  await pov(0.065);
  await sivu.waitForTimeout(6000);
  const loppu = await taso();
  const kuva = await sivu.screenshot(ULOS ? { path: join(ULOS, `salmiakit-${MOOTTORI}.png`) } : {});
  const n = await taplat(kuva);
  console.log(`INFO  ${MOOTTORI}: taso ${alku} → ${loppu} (z8 estetty), salmiakkipikseleitä ${n}`);
  if (alku !== 7 || loppu !== 8) console.log(`FAIL  tasot eivät olleet 7 → 8 (${alku} → ${loppu})`);
  else if (n > 10) console.log(`FAIL  karkea laatta pistää hienomman läpi tasonvaihdossa (${n} > 10)`);
  else { console.log('OK    tasonvaihdon välitila ilman salmiakkeja'); tulos = 0; }
  if (virheet.length) console.log(`INFO  sivuvirheitä ${virheet.length}: ${virheet[0].slice(0, 160)}`);
} finally {
  await selain.close();
  palvelin.close();
}
process.exit(tulos);
