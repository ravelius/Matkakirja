/*
 * MAAKUNTAVEKTORIT PALLOLLA (erä M1, js/pallomaakunnat.js) — savuke.
 *
 * Avaa pallolaudan `?lauta=pallo&maakunnat=1` puhelinkoossa (390 × 844
 * dpr 3, WebKit oletus), pelaaja Marseillessa (FRA), ja vartioi:
 *
 *   1. kerros lataa maan FRA ja piirtää sen (mittarit.tila 'nakyy',
 *      alueita 18, kolmioita > 0, yksi uusi drawcall);
 *   2. osuma: Pariisi (48,85 N 2,35 E) → Île-de-France, Marseille →
 *      Provence-Alpes-Côte d'Azur, meri (42,8 N 6,5 E, Toulonin edusta) → null;
 *   3. valinta korostaa alueen (värit päivittyvät, ei uutta oliota);
 *   4. panoroinnin kehysajat kerroksen kanssa: p95 ja > 50 ms kirjataan
 *      (ei vartiota — kerros on pois oletuksena, luvut Fablelle);
 *   5. maanvaihto: asetaMaa('CHE') vaihtaa oliota ja FRA jää muistiin.
 *
 * Aineisto luetaan paikallisesta kansiosta (MAAKUNNAT=<kansio>, oletus
 * /Users/koodaus/pyramidi-poltto/maakunnat-2026-09-22a), koska sitä ei
 * ole vielä ämpärissä: ämpärin maakuntapolku ohjataan kansioon.
 *
 *   PLAYWRIGHT_JS=… MAAKUNNAT=<kansio> node tools/savukkeet/savuke-pallomaakunnat.mjs
 *     [SAVUKE_MOOTTORI=webkit|chromium] [ULOS=<kansio>]
 */
import http from 'node:http';
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { extname, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = process.env.JUURI ?? join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const { Game } = await import(`${JUURI}/js/game.js`);
const { packById } = await import(`${JUURI}/js/pack.js`);
const pw = await import('playwright').catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const paketti = pw.webkit ? pw : (pw.default ?? pw);
const MOOTTORI = process.env.SAVUKE_MOOTTORI ?? 'webkit';
const MAAKUNNAT = process.env.MAAKUNNAT ?? '/Users/koodaus/pyramidi-poltto/maakunnat-2026-09-22a';
const ULOS = process.env.ULOS ?? '/tmp/matkakirja-kaappaukset/pallomaakunnat';
mkdirSync(ULOS, { recursive: true });
const DPR = Number(process.env.DPR) || 3;
const VIEWPORT = { width: 390, height: 844 };
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
const peli = new Game({ players: [{ name: 'Fogg', color: '#c9a227', start: 'marseille' }], pack: packById('maailmankartta'), seed: 5 });
peli.phase = 'action'; peli.tokens.delete('marseille');
const tallenne = JSON.stringify(peli.toJSON());

const vartiot = [];
const vartio = (nimi, ehto, tieto = '') => { vartiot.push({ nimi, ok: Boolean(ehto), tieto }); console.log(`${ehto ? 'OK ' : 'VIKA'} ${nimi}${tieto ? ` — ${tieto}` : ''}`); };
const prosenttipiste = (arvot, q) => { const s = [...arvot].sort((a, b) => a - b); return s.length ? s[Math.min(s.length - 1, Math.floor(q * (s.length - 1)))] : NaN; };

const selain = MOOTTORI === 'webkit'
  ? await paketti.webkit.launch()
  : await paketti.chromium.launch({ executablePath: process.env.CHROMIUM || undefined, args: ['--use-angle=metal'] });
const ctx = await selain.newContext({ viewport: VIEWPORT, deviceScaleFactor: DPR, isMobile: true, hasTouch: true, serviceWorkers: 'block' });
await ctx.addInitScript((d) => { localStorage.setItem('matkakirja-save-v1', d); localStorage.removeItem('matkakirja-lauta'); }, tallenne);
const sivu = await ctx.newPage();
const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e.message)));
await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (r) => { const v = await ampari(r.request().url()); if (!v) { r.abort(); return; } r.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body, headers: { 'access-control-allow-origin': '*' } }); });
await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
await sivu.route(/wikimedia\.org/, (r) => r.abort());
// Viimeksi rekisteröity reitti voittaa: maakuntapolku ämpärin reitin edelle.
let maakuntapyyntoja = 0;
await sivu.route(/julisteet\/pallo\/maakunnat\//, (r) => {
  const tiedosto = r.request().url().split('/').pop().split('?')[0];
  const polku = join(MAAKUNNAT, tiedosto);
  maakuntapyyntoja += 1;
  if (!existsSync(polku)) { r.fulfill({ status: 404, body: '' }); return; }
  r.fulfill({ status: 200, contentType: TYYPIT[extname(polku)] ?? 'application/octet-stream', body: readFileSync(polku), headers: { 'access-control-allow-origin': '*' } });
});
await sivu.goto(`${osoite}?lauta=pallo&maakunnat=1`, { waitUntil: 'domcontentloaded', timeout: 90000 });
await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
await sivu.waitForTimeout(2500);
await sivu.evaluate(() => { setInterval(() => { const ui = window.matkakirja?.ui; const n = ui?.ohitaNappi?.isConnected ? ui.ohitaNappi : document.querySelector('.fokusvirta-ohitanappi'); if (n) n.click(); }, 150); });
await sivu.waitForTimeout(2000);
await sivu.evaluate(() => window.matkakirja.ui.pallolauta.saavu?.({ kesto: 0 }));
await sivu.waitForTimeout(1500);

// 1. kerros näkyy
const nakyy = await sivu.waitForFunction(() => window.matkakirja.ui.pallolauta.maakunnat?.()?.mittarit?.().tila === 'nakyy', null, { timeout: 30000 }).then(() => true).catch(() => false);
const m1 = await sivu.evaluate(() => window.matkakirja.ui.pallolauta.maakunnat?.()?.mittarit?.() ?? null);
vartio('kerros piirtää FRA:n', nakyy && m1?.maa === 'FRA' && m1.alueita === 18 && m1.kolmioita > 0, JSON.stringify(m1));
vartio('aineisto haettiin paikallisesta kansiosta', maakuntapyyntoja >= 2, `pyyntöjä ${maakuntapyyntoja}`);
await sivu.waitForTimeout(400);
await sivu.screenshot({ path: join(ULOS, `maakunnat-fra-${MOOTTORI}.jpg`), type: 'jpeg', quality: 80 });

// 2. osuma
const osumat = await sivu.evaluate(() => {
  const k = window.matkakirja.ui.pallolauta.maakunnat();
  return { pariisi: k.osuma(48.85, 2.35)?.nimi ?? null, marseille: k.osuma(43.3, 5.37)?.nimi ?? null, meri: k.osuma(42.8, 6.5) };
});
vartio('osuma: Pariisi → Île-de-France', osumat.pariisi === 'Île-de-France', osumat.pariisi);
vartio('osuma: Marseille → Provence-Alpes-Côte d\'Azur', /Provence/.test(osumat.marseille ?? ''), osumat.marseille);
vartio('osuma: meri → null', osumat.meri === null, String(osumat.meri));

// 3. valinta
const valinta = await sivu.evaluate(() => {
  const k = window.matkakirja.ui.pallolauta.maakunnat();
  const ennen = window.matkakirja.ui.pallonInstanssi.renderer().info.memory.geometries;
  const o = k.osuma(48.85, 2.35);
  k.valitse(o.indeksi);
  return { valittu: k.mittarit().valittu, indeksi: o.indeksi, geometriat: window.matkakirja.ui.pallonInstanssi.renderer().info.memory.geometries - ennen };
});
vartio('valinta korostaa ilman uutta geometriaa', valinta.valittu === valinta.indeksi && valinta.geometriat === 0, JSON.stringify(valinta));
await sivu.waitForTimeout(400);
await sivu.screenshot({ path: join(ULOS, `maakunnat-fra-valittu-${MOOTTORI}.jpg`), type: 'jpeg', quality: 80 });

// 4. panoroinnin kehysajat kerroksen kanssa
await sivu.evaluate(() => {
  window.__kehykset = []; let t = performance.now(); window.__kaynnissa = true;
  const askel = () => { if (!window.__kaynnissa) return; const n = performance.now(); window.__kehykset.push(n - t); t = n; requestAnimationFrame(askel); };
  requestAnimationFrame(askel);
});
await sivu.mouse.move(195, 500);
await sivu.mouse.down();
for (let i = 1; i <= 60; i += 1) { await sivu.mouse.move(195 - i * 2, 500 - i, { steps: 1 }); await sivu.waitForTimeout(33); }
await sivu.mouse.up();
await sivu.waitForTimeout(500);
const kehykset = await sivu.evaluate(() => { window.__kaynnissa = false; return window.__kehykset.slice(1); });
const p95 = prosenttipiste(kehykset, 0.95); const yli50 = kehykset.filter((d) => d > 50).length;
console.log(`panorointi kerroksen kanssa (${MOOTTORI}): kehyksiä ${kehykset.length}, mediaani ${prosenttipiste(kehykset, 0.5).toFixed(1)}, p95 ${p95.toFixed(1)}, max ${Math.max(...kehykset).toFixed(1)} ms, >50: ${yli50}`);
const m2 = await sivu.evaluate(() => window.matkakirja.ui.pallolauta.maakunnat().mittarit());
vartio('kerros pysyy panoroinnissa', m2.tila === 'nakyy' && m2.maa === 'FRA', m2.tila);

// 5. maanvaihto
const vaihto = await sivu.evaluate(async () => {
  const k = window.matkakirja.ui.pallolauta.maakunnat();
  k.asetaMaa('CHE');
  await new Promise((ok) => { setTimeout(ok, 3000); });
  const che = k.mittarit();
  k.asetaMaa('FRA');
  await new Promise((ok) => { setTimeout(ok, 600); });
  return { che, fra: k.mittarit() };
});
vartio('maanvaihto CHE (26 aluetta) ja takaisin FRA muistista', vaihto.che.maa === 'CHE' && vaihto.che.alueita === 26 && vaihto.fra.maa === 'FRA' && vaihto.fra.tila === 'nakyy' && vaihto.fra.muistissa === 2, JSON.stringify({ che: vaihto.che.alueita, fra: vaihto.fra.tila, muistissa: vaihto.fra.muistissa }));
vartio('ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));

await selain.close();
palvelin.close();
const viat = vartiot.filter((v) => !v.ok);
console.log(`Vartio: ${vartiot.length - viat.length}/${vartiot.length} OK`);
process.exit(viat.length ? 1 : 0);
