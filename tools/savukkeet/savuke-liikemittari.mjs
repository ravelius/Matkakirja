/*
 * SAVUKE: LIIKKEEN TASAISUUSMITTARI (kehysprofiili p5, omistaja ja Fable
 * 23.9.2026: kehysaika ei mittaa nähtyä nykimistä). Mittari kirjaa joka
 * renderin jälkeen vedon alussa tartutun maapisteen ruutupaikan ja sormen.
 * Synteettinen veto edestakaisin (6 × 0,7 s, 400 px/s) pysyy
 * panorointirajan sisällä:
 *   M1 mittari kirjaa vedon (≥ 60 liikekehystä), tahdistettu syöte: ei nollia,
 *      virhe ka < 10 px
 *   M2 vastakoe ?koe=interpvanha + iOS-tyylinen syöte (pointermove omalla
 *      17,4 ms:n ajastimella, 0–6 ms kuorma): mittari näkee 0/2-kuvion (nollat > 10)
 *   M3 oletus (interp) samalla syötteellä: ei nollia
 *   M4 ?koe=syotekello samalla syötteellä: ei nollia (tieto: CV verrattuna interpiin)
 *   M5 ei sivuvirheitä
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = process.env.JUURI ?? join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const { Game } = await import(`${JUURI}/js/game.js`);
const { packById } = await import(`${JUURI}/js/pack.js`);
const pw = await import('playwright').catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const paketti = pw.webkit ? pw : (pw.default ?? pw);
const MOOTTORI = process.env.SAVUKE_MOOTTORI ?? 'webkit';
const KUVAKANSIO = process.argv[2] ?? process.env.KAAPPAUKSET ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });
const TYYPIT = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.geojson': 'application/json', '.woff2': 'font/woff2' };
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
const peli = new Game({ players: [{ name: 'Fogg', color: '#c9a227', start: 'marseille' }], pack: packById('maailmankartta'), seed: 5 });
peli.phase = 'action'; peli.tokens.delete('marseille');
const tallenne = JSON.stringify(peli.toJSON());
let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => { kaikki += 1; if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`); };
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);
const p = (x, n = 3) => (Number.isFinite(x) ? x.toFixed(n) : '—');

const selain = MOOTTORI === 'webkit' ? await paketti.webkit.launch() : await paketti.chromium.launch({ executablePath: process.env.CHROMIUM || undefined });
const avaa = async (haku) => {
  const ctx = await selain.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, serviceWorkers: 'block' });
  await ctx.addInitScript((d) => { localStorage.setItem('matkakirja-save-v1', d); localStorage.removeItem('matkakirja-lauta'); }, tallenne);
  const sivu = await ctx.newPage();
  const virheet = [];
  // Synteettinen veto: OrbitControlsin setPointerCapture ei tunne keksittyä pointerId:tä (sama kuin savuke-zoomiraja).
  sivu.on('pageerror', (e) => { const t = String(e.message ?? e); if (!/PointerCapture|can not be found here/i.test(t)) virheet.push(t); });
  await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (r) => { const v = await ampari(r.request().url()); if (!v) { r.abort(); return; } r.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body, headers: { 'access-control-allow-origin': '*' } }); });
  await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
  await sivu.route(/wikimedia\.org/, (r) => r.abort());
  await sivu.goto(`${osoite}?lauta=pallo${haku}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta && window.__kehysprofiili), null, { timeout: 90000 });
  // Lähelle, jotta veto tuo uusia laattoja (häive syntyy vain uudesta laatasta).
  await sivu.evaluate(() => window.matkakirja.ui.pallonInstanssi.pointOfView({ lat: 46.5, lng: 2.5, altitude: 0.35 }, 0));
  await sivu.waitForTimeout(5000);
  return { ctx, sivu, virheet };
};
const { liikkeenTasaisuus } = await import(`${JUURI}/js/pallolauta/profiilinaytto.js`);
const mittaa = async (sivu, asetus) => {
  const kaikki = [];
  for (const suunta of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 0.5], [-1, -0.5]]) {
    const v = await sivu.evaluate((a) => window.__kehysprofiili.veto(a).then((r) => ({ kehykset: r.kehykset })), { kesto: 700, nopeusPx: 400, suunta, ...asetus });
    kaikki.push(...v.kehykset.slice(3));
    kaikki.push({});
  }
  return liikkeenTasaisuus(kaikki);
};
const f = (x, n = 1) => (Number.isFinite(x) ? x.toFixed(n) : '—');
const tulokset = {};
const virheet = [];
try {
  for (const koe of ['tuntematon', 'interpvanha', 'syotekello']) {
    const x = await avaa(`&koe=${koe}`);
    for (const [nimi, asetus] of [['raf', { syote: 'raf' }], ['ios', { syote: 'ajastin', vali: 17.4, kuorma: 6 }]]) {
      if (koe !== 'tuntematon' && nimi === 'raf') continue;
      const L = await mittaa(x.sivu, asetus);
      tulokset[`${koe}/${nimi}`] = L;
      tieto(`${koe}/${nimi}`, `n ${L?.kehyksia} siirt ${f(L?.siirtymaKa)} CV ${f((L?.siirtymaCv ?? NaN) * 100, 0)} % nollat ${L?.nollat} tuplat ${L?.tuplat} virhe ${f(L?.virheKa)}±${f(L?.virheSd)} syöte/k ${f(L?.syotteitaKa, 2)} ilman ${L?.ilmanSyotetta}`);
    }
    virheet.push(...x.virheet);
    await x.ctx.close();
  }
} finally { await selain.close(); palvelin.close(); }
const r = tulokset['tuntematon/raf'];
vaadi('M1 mittari kirjaa vedon, tahdistettu syöte tasainen', r && r.kehyksia >= 60 && r.nollat === 0 && r.virheKa < 10, JSON.stringify(r));
vaadi('M2 vastakoe interpvanha näkee 0/2-kuvion', (tulokset['interpvanha/ios']?.nollat ?? 0) > 10, JSON.stringify(tulokset['interpvanha/ios']));
vaadi('M3 oletus interp: ei nollia', tulokset['tuntematon/ios']?.nollat === 0, JSON.stringify(tulokset['tuntematon/ios']));
vaadi('M4 syotekello: ei nollia', tulokset['syotekello/ios']?.nollat === 0, JSON.stringify(tulokset['syotekello/ios']));
vaadi('M5 ei sivuvirheitä', virheet.length === 0, virheet.join(' | '));
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);

