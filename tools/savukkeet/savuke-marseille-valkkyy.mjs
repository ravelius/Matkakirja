/*
 * SAVUKE: KAUPUNGIN NIMI EI VÄLKY ZOOMISSA (omistajan tuntuma v2026,
 * 21.9.2026 ilta: *"MARSEILLE välkkyy zoomatessa"*; Karttasepän mittaus
 * WebKit 1400 × 900 dpr 2: nimi poissa yhden kehyksen joka kuoren
 * portaan vaihdossa, tekstin peitto 55 ‰ → 21 ‰ → 56 ‰).
 *
 * JUURISYY: js/pallolauta/glnimiot-sovitin.js `jaa` pudotti nimen
 * CSS2D:hen, kun uuden portaan rasteri ei ollut valmis, ja nosti sen
 * takaisin rungolle rasterin valmistuttua — CSS2D piirtyy vasta
 * seuraavassa kehyksessä, joten nimi puuttui kehyksen. Korjaus: rungolla
 * oleva nimi pysyy rungolla vanhalla rasterilla (viimeSpritet) kunnes
 * uusi on valmis.
 *
 * Ajo: WebKit (oletus) 1400 × 900 dpr 2, Marseille-tallenne, kamera
 * Marseillen päällä; zoom 0,14 → 0,05 40 askeleena, jokainen askel
 * pointOfView(…, 0) + yksi kehys. Joka askeleella luetaan
 *   a) rakenne: onko Marseillen nimi rungolla (sovitin.onRungolla) vai
 *      CSS2D:ssä (.pallolauta-nimi[data-kaupunki]);
 *   b) kuva: tumman musteen osuus nimen laatikossa (pisteen ympärillä
 *      ±130 × ±40 px, nimi on pisteen kyljessä).
 * Vartiot:
 *   1. nimi on joka askeleella rungolla — ei kertaakaan CSS2D:ssä eikä poissa;
 *   2. GL↔CSS2D-vaihtoja zoomin aikana 0;
 *   3. musteen osuus ei putoa alle 80 %:iin edellisestä askeleesta;
 *   4. ei sivuvirheitä.
 *
 *   PLAYWRIGHT_JS=… node tools/savukkeet/savuke-marseille-valkkyy.mjs [kuvakansio]
 *       SAVUKE_MOOTTORI=webkit|chromium
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { decodePng } from './pallon-liike-mittarit.mjs';

const JUURI = process.env.JUURI ?? join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const { Game } = await import(`${JUURI}/js/game.js`);
const { packById } = await import(`${JUURI}/js/pack.js`);
const pw = await import('playwright').catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const paketti = pw.webkit ? pw : (pw.default ?? pw);
const MOOTTORI = process.env.SAVUKE_MOOTTORI ?? 'webkit';
const KUVAKANSIO = process.argv[2] ?? process.env.KAAPPAUKSET ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });
const MARSEILLE = { lat: 43.2965, lng: 5.3698 };
const ASKELIA = 40;
const ALKU = 0.14;
const LOPPU = 0.05;
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

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => { kaikki += 1; if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`); };
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);
const p = (x, n = 1) => (Number.isFinite(x) ? x.toFixed(n) : '—');

const selain = MOOTTORI === 'webkit' ? await paketti.webkit.launch() : await paketti.chromium.launch({ executablePath: process.env.CHROMIUM || undefined });
const virheet = [];
const ctx = await selain.newContext({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 2, serviceWorkers: 'block' });
await ctx.addInitScript((d) => { localStorage.setItem('matkakirja-save-v1', d); localStorage.removeItem('matkakirja-lauta'); }, JSON.stringify(peli.toJSON()));
const sivu = await ctx.newPage();
sivu.on('pageerror', (e) => virheet.push(String(e.message)));
await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (r) => { const v = await ampari(r.request().url()); if (!v) { r.abort(); return; } r.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body, headers: { 'access-control-allow-origin': '*' } }); });
await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
await sivu.route(/wikimedia\.org/, (r) => r.abort());
await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 90000 });
await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
await sivu.waitForTimeout(2500);
await sivu.evaluate(() => { setInterval(() => { const ui = window.matkakirja?.ui; const n = ui?.ohitaNappi?.isConnected ? ui.ohitaNappi : document.querySelector('.fokusvirta-ohitanappi'); if (n) n.click(); }, 150); });
await sivu.waitForTimeout(2000);
await sivu.evaluate(() => window.matkakirja.ui.pallolauta.saavu?.({ kesto: 0 }));
await sivu.waitForTimeout(1500);
await sivu.evaluate((pov) => { window.matkakirja.ui.pallolauta.heraa?.(); window.matkakirja.ui.pallonInstanssi.pointOfView(pov, 0); }, { ...MARSEILLE, altitude: ALKU });
await sivu.waitForTimeout(4000);
await sivu.waitForFunction(() => document.fonts?.status === 'loaded', null, { timeout: 15000 }).catch(() => {});
// Kelluvat kortit pois kuvasta.
await sivu.addStyleTag({ content: '.fokusvirta-kortti, .fokusvirta-isokuva, .fokusvirta-kupla, .saapumistraileri, .fokusnosto-kerros, .fokuskohde-popup, .pollo-nappi, .pollo-paneeli, .kartuutsi, .pallolauta-maapaneeli { visibility: hidden !important; }' });
await sivu.waitForTimeout(500);

const tila = () => sivu.evaluate((m) => {
  const ui = window.matkakirja.ui; const l = ui.pallolauta; const s = l.glSovitin?.();
  const d = (s?.viimeiset?.() ?? []).find((x) => x.id === 'marseille' || x.avain === 'nimi:marseille');
  const tunnus = d ? (d.avain ?? `nimi:${d.id}`) : 'nimi:marseille';
  const el = document.querySelector('.pallolauta-nimi[data-kaupunki="marseille"]');
  const css2d = Boolean(el && el.isConnected && !el.classList.contains('pallolauta-poistuu') && el.getBoundingClientRect().width > 0);
  const koti = l.kotelo.getBoundingClientRect();
  const pp = ui.pallonInstanssi.getScreenCoords(m.lat, m.lng, 0);
  return {
    rungolla: Boolean(s?.onRungolla?.(tunnus)), css2d, ladottu: Boolean(d),
    piste: pp ? { x: koti.left + pp.x, y: koti.top + pp.y } : null,
    alt: ui.pallonInstanssi.pointOfView().altitude,
    rasterit: s?.tila?.().rasterit ?? null,
  };
}, MARSEILLE);

/** Tumman musteen osuus laatikossa (‰): r,g,b < 90. */
const muste = async (piste) => {
  if (!piste) return NaN;
  const clip = { x: Math.max(0, piste.x - 130), y: Math.max(0, piste.y - 40), width: 260, height: 80 };
  const png = decodePng(await sivu.screenshot({ clip, type: 'png' }));
  let tummia = 0; const n = png.width * png.height;
  for (let i = 0; i < n; i += 1) { const o = i * 4; if (png.data[o] < 90 && png.data[o + 1] < 90 && png.data[o + 2] < 90) tummia += 1; }
  return (1000 * tummia) / n;
};

const askeleet = [];
for (let i = 0; i <= ASKELIA; i += 1) {
  const alt = ALKU + ((LOPPU - ALKU) * i) / ASKELIA;
  await sivu.evaluate(async (pov) => {
    window.matkakirja.ui.pallonInstanssi.pointOfView(pov, 0);
    // Yksi kehys: pallo piirtää, sovitin jakaa (ladonta kulkee liikkeen mukana), CSS2D kirjoittaa.
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  }, { ...MARSEILLE, altitude: alt });
  const t = await tila();
  t.muste = await muste(t.piste);
  t.i = i;
  askeleet.push(t);
}
if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, `marseille-valkkyy-${MOOTTORI}-loppu.jpg`), type: 'jpeg', quality: 60 }).catch(() => {});
tieto('askeleet', askeleet.map((a) => `${a.i}:${a.rungolla ? 'GL' : a.css2d ? 'css' : '—'}/${p(a.muste, 0)}`).join(' '));
const poissa = askeleet.filter((a) => !a.rungolla);
vaadi('1. Marseillen nimi on joka askeleella rungolla (ei CSS2D-välitilaa, ei poissa)', askeleet.length === ASKELIA + 1 && poissa.length === 0,
  `poissa rungolta askeleilla ${poissa.map((a) => `${a.i}(${a.css2d ? 'css2d' : 'ei missään'})`).join(', ')}`);
let vaihtoja = 0;
for (let i = 1; i < askeleet.length; i += 1) if (askeleet[i].rungolla !== askeleet[i - 1].rungolla) vaihtoja += 1;
vaadi('2. GL↔CSS2D-vaihtoja zoomin aikana 0', vaihtoja === 0, `vaihtoja ${vaihtoja}`);
const pudotukset = [];
for (let i = 1; i < askeleet.length; i += 1) {
  const a = askeleet[i - 1].muste; const b = askeleet[i].muste;
  if (Number.isFinite(a) && Number.isFinite(b) && a > 5 && b < 0.8 * a) pudotukset.push(`${i}: ${p(a, 0)}→${p(b, 0)} ‰`);
}
vaadi('3. musteen osuus nimen laatikossa ei putoa alle 80 %:iin edellisestä askeleesta', pudotukset.length === 0, pudotukset.join(', '));
vaadi('4. ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 2).join(' | '));
await ctx.close(); await selain.close(); palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi (${MOOTTORI})`);
process.exit(lapi === kaikki ? 0 : 1);
