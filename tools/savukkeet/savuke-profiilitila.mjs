/*
 * SAVUKE: KEHYSPROFIILIN YLIN RIVI KERTOO KOETILAN (Pelikoodari 22.9.2026).
 * Omistajan iPhone-kaappauksia ei voinut kohdistaa Piirtokoe-tilaan, koska
 * overlay ei näyttänyt sitä. Tarkistaa oikeassa selaimessa:
 *   T1 osoitelippu ?koe=profiili,dpr15 → "koe: dpr15 · profiili pN · vNNNN"
 *   T2 valikon tallennus (eipuskuri + kytkin) ilman lippua → "koe: eipuskuri"
 *   T3 valinta vaihdetaan kesken istunnon → "(seuraavassa latauksessa: normaali)"
 *   T4 ei sivuvirheitä
 * KÄYTTÖ: PLAYWRIGHT_JS=... SAVUKE_MOOTTORI=webkit node tools/savukkeet/savuke-profiilitila.mjs
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
const avaa = async (haku, muistiin = {}) => {
  const ctx = await selain.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, serviceWorkers: 'block' });
  await ctx.addInitScript(([d, m]) => {
    if (sessionStorage.getItem('savuke-alustettu')) return;
    sessionStorage.setItem('savuke-alustettu', '1');
    localStorage.setItem('matkakirja-save-v1', d); localStorage.removeItem('matkakirja-lauta');
    for (const [k, v] of Object.entries(m)) localStorage.setItem(k, v);
  }, [tallenne, muistiin]);
  const sivu = await ctx.newPage();
  const virheet = [];
  sivu.on('pageerror', (e) => virheet.push(String(e.message)));
  await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (r) => { const v = await ampari(r.request().url()); if (!v) { r.abort(); return; } r.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body, headers: { 'access-control-allow-origin': '*' } }); });
  await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
  await sivu.route(/wikimedia\.org/, (r) => r.abort());
  await sivu.goto(`${osoite}?lauta=pallo${haku}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
  return { ctx, sivu, virheet };
};
const ylinRivi = (sivu, ehto = '') => sivu.waitForFunction((e) => {
  const r = document.querySelector('.profiilinaytto > div')?.textContent ?? '';
  return r.startsWith('koe:') && r.includes(e) ? r : false;
}, ehto, { timeout: 20000 }).then((h) => h.jsonValue()).catch(() => '');

const versio = `v${readFileSync(join(JUURI, 'js/main.js'), 'utf8').match(/APP_VERSION = '([^']+)'/)[1].split('.').pop()}`;
try {
  {
    const { ctx, sivu, virheet } = await avaa('&koe=profiili,dpr15');
    const r = await ylinRivi(sivu);
    tieto('T1 rivi', r);
    vaadi('T1 osoitelippu näkyy ylimpänä', /^koe: dpr15 · profiili p\d+ · v\d+$/.test(r) && r.endsWith(versio), r);
    vaadi('T4a ei sivuvirheitä', virheet.length === 0, virheet.join(' | '));
    await ctx.close();
  }
  {
    const { ctx, sivu, virheet } = await avaa('', { 'matkakirja-piirtokoe': 'eipuskuri', 'matkakirja-kehysprofiili': '1' });
    const r = await ylinRivi(sivu);
    tieto('T2 rivi', r);
    vaadi('T2 valikon valinta näkyy', r.startsWith('koe: eipuskuri · profiili p'), r);
    await sivu.evaluate(() => localStorage.setItem('matkakirja-piirtokoe', 'normaali'));
    const r3 = await ylinRivi(sivu, 'seuraavassa');
    tieto('T3 rivi', r3);
    vaadi('T3 vaihto näkyy seuraavana', r3.startsWith('koe: eipuskuri (seuraavassa latauksessa: normaali)'), r3);
    vaadi('T4b ei sivuvirheitä', virheet.length === 0, virheet.join(' | '));
    await ctx.close();
  }
} finally {
  await selain.close();
  palvelin.close();
}
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
