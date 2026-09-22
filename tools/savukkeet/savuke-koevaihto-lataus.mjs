/*
 * SAVUKE: PIIRTOKOKEEN VALINTA LATAA SIVUN (omistaja 22.9.2026 klo 23.05).
 * v2133-kierroksen kolme viidestä kaappauksesta mittasi vanhaa koetta, koska
 * sivua ei ladattu valinnan jälkeen. Tarkistaa oikeassa selaimessa:
 *   L1 valikosta "Pikselisuhde 1,5" → vihje "Ladataan…"
 *   L2 sivu latautuu itse (navigaatio tapahtuu viiveen jälkeen)
 *   L3 latauksen jälkeen overlayn ylin rivi "koe 3/7 Pikselisuhde 1,5" ilman
 *      "seuraavassa latauksessa" — koe on voimassa
 *   L4 paluu samaan tilaan viiveen aikana perii latauksen
 *   L5 ei sivuvirheitä
 * KÄYTTÖ: PLAYWRIGHT_JS=... SAVUKE_MOOTTORI=webkit node tools/savukkeet/savuke-koevaihto-lataus.mjs
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
  return r.startsWith('koe') && r.includes(e) ? r : false;
}, ehto, { timeout: 20000 }).then((h) => h.jsonValue()).catch(() => '');

const avaaValikko = async (sivu) => {
  await sivu.evaluate(() => { const m = document.getElementById('paavalikko'); if (m?.hidden) document.getElementById('menu-btn')?.click(); });
  await sivu.waitForSelector('#piirtokoe-valikko button[data-piirtokoe="dpr15"]', { state: 'visible', timeout: 10000 });
};
try {
  const { ctx, sivu, virheet } = await avaa('', { 'matkakirja-piirtokoe': 'normaali', 'matkakirja-kehysprofiili': '1' });
  await ylinRivi(sivu, 'Normaali');
  // L4 ensin: valinta ja paluu viiveen aikana ei lataa.
  let navigaatioita = 0;
  sivu.on('framenavigated', (f) => { if (f === sivu.mainFrame()) navigaatioita += 1; });
  await avaaValikko(sivu);
  // Samassa tehtävässä: Playwrightin kaksi erillistä klikkausta voi viedä yli viiveen (Chromium).
  await sivu.evaluate(() => {
    document.querySelector('#piirtokoe-valikko button[data-piirtokoe="eipuskuri"]').click();
    document.querySelector('#piirtokoe-valikko button[data-piirtokoe="normaali"]').click();
  });
  await sivu.waitForTimeout(1500);
  vaadi('L4 paluu samaan tilaan perii latauksen', navigaatioita === 0, `navigaatioita ${navigaatioita}`);
  await avaaValikko(sivu);
  const lataus = sivu.waitForEvent('load', { timeout: 15000 }).then(() => true).catch(() => false);
  await sivu.click('#piirtokoe-valikko button[data-piirtokoe="dpr15"]');
  const vihje = await sivu.evaluate(() => { const v = document.getElementById('piirtokoe-vihje'); return v && !v.hidden ? v.textContent : ''; });
  tieto('vihje', vihje);
  vaadi('L1 vihje "Ladataan…"', vihje === 'Ladataan…', vihje);
  vaadi('L2 sivu latautuu itse', await lataus, `navigaatioita ${navigaatioita}`);
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
  const r = await ylinRivi(sivu, 'Pikselisuhde');
  tieto('rivi latauksen jälkeen', r);
  vaadi('L3 koe voimassa latauksen jälkeen', /^koe 3\/7 Pikselisuhde 1,5 · profiili p\d+/.test(r) && !r.includes('seuraavassa'), r);
  vaadi('L5 ei sivuvirheitä', virheet.length === 0, virheet.join(' | '));
  await ctx.close();
} finally {
  await selain.close();
  palvelin.close();
}
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
