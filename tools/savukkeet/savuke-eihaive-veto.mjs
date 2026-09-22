/*
 * SAVUKE: PIIRTOKOE "EI HÄIVYTYSTÄ VEDOSSA" (?koe=eihaivevedossa, Fable 22.9.2026).
 * Omistajan v2126-kaappauksissa vedon aikana häipyi 10–22 laattaa, eli uusi ja
 * vanha laatta piirrettiin päällekkäin läpinäkyvinä. Koe poistaa häiveen vain
 * liikkeen ajaksi. Sama synteettinen veto (__kehysprofiili.veto) kahdesti:
 *   V1 vastakoe normaali: vedossa häipyviä > 0 (vartija näkee häiveen)
 *   V2 eihaivevedossa: vedossa häipyviä 0 kuudennesta kehyksestä alkaen
 *   V3 laattoja tuli sceneen vedon aikana myös kokeessa (koe ei jäädytä kerrosta)
 *   V4 ei sivuvirheitä
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
const vedot = async (sivu) => sivu.evaluate(async () => {
  const tulokset = [];
  for (const suunta of [[1, 0.3], [-1, -0.2], [0.4, 1]]) {
    const v = await window.__kehysprofiili.veto({ kesto: 1500, nopeusPx: 900, suunta });
    /*
     * Viisi ensimmäistä kehystä (~80 ms) pois: profiili lukee kehyksen
     * ennen laattakerroksen päivitystä, ja liikkeen tieto (pallo.js
     * lepoajastin) ehtii kerrokseen vasta seuraavissa tickeissä — levossa
     * juuri alkanut häive voi näkyä siirtymäkehyksessä.
     */
    const k = v.kehykset.slice(5);
    tulokset.push({ hapyviaMax: Math.max(0, ...k.map((f) => f.hapyvia ?? 0)), sceneenKasvu: Math.max(0, ...k.map((f) => f.scenessa ?? 0)) - (k[0]?.scenessa ?? 0), paivityksia: (k.at(-1)?.paivityksia ?? 0) - (k[0]?.paivityksia ?? 0) });
  }
  return tulokset;
});

try {
  const n = await avaa('&koe=tuntematon');
  const normaali = await vedot(n.sivu);
  tieto('V1 normaali', JSON.stringify(normaali));
  vaadi('V1 vastakoe: normaalissa vedossa häipyviä > 0', normaali.some((t) => t.hapyviaMax > 0), JSON.stringify(normaali));
  await n.ctx.close();

  const e = await avaa('&koe=eihaivevedossa');
  const koe = await vedot(e.sivu);
  tieto('V2 eihaivevedossa', JSON.stringify(koe));
  vaadi('V2 kokeessa vedon aikana häipyviä 0', koe.every((t) => t.hapyviaMax === 0), JSON.stringify(koe));
  vaadi('V3 laattoja vietiin vedon aikana myös kokeessa', koe.some((t) => t.paivityksia > 0), JSON.stringify(koe));
  vaadi('V4 ei sivuvirheitä', n.virheet.length + e.virheet.length === 0, [...n.virheet, ...e.virheet].join(' | '));
  await e.ctx.close();
} finally {
  await selain.close();
  palvelin.close();
}
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
