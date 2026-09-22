/*
 * MITTARI: PANOROINNIN TASAISUUS ENNEN/JÄLKEEN (Pelikoodari 22.9.2026,
 * sulavuuskatsauksen erä 1). Ajaa pelin GPU-headlessissä (ANGLE Metal, ks.
 * muistiinpano gpu-headless-metal) ja mittaa kaksi vetoa:
 *
 *   sisainen  tasaisuusmittari __kehysprofiili.veto: PointerEvent kankaalle
 *             joka kehyksellä (sivun sisältä), siirtymä/kehys ja px/ms-vaihtelu
 *   cdp       oikea kosketusveto CDP:n Input.dispatchTouchEvent 8 ms:n askelin
 *             (tapahtumia enemmän kuin kehyksiä → syötteen kehystys näkyy)
 *
 * Kummastakin: px/ms-vaihtelu, pysähdykset, dt p95 ja kehysprofiilin
 * tiivistelmä (pääsäie vs GPU). KOE-lippu vaihtaa vanhan polun samasta
 * rakennuksesta (`syotevanha` = syöte joka tapahtumasta).
 *
 *   PLAYWRIGHT_JS=<playwright/index.js> node tools/savukkeet/mittaa-tasaisuus.mjs
 *       KOE=syotevanha|mittaus   (?koe=-lippu; 'mittaus' = uusi polku, lippu vain asentaa profiilin)
 *       KORKEUS=0.2  TOISTOJA=3  NOPEUS=80 (px/s)  ASKEL_MS=4 (cdp-askel)  KURISTUS=1|4
 *       ULOS=<kansio>            (tasaisuus-<koe>.json)
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { extname, join, dirname, join as liita } from 'node:path';
import { fileURLToPath } from 'node:url';
const JUURI = process.env.JUURI ?? liita(dirname(fileURLToPath(import.meta.url)), '..', '..');
const { Game } = await import(`${JUURI}/js/game.js`); const { packById } = await import(`${JUURI}/js/pack.js`);
const pw = await import('playwright').catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = pw.chromium ?? pw.default?.chromium;
const KOE = process.env.KOE ?? 'mittaus'; const KURISTUS = Number(process.env.KURISTUS ?? 1);
const KORKEUS = Number(process.env.KORKEUS ?? 0.2); const TOISTOJA = Number(process.env.TOISTOJA ?? 3); const NOPEUS = Number(process.env.NOPEUS ?? 80);
const ASKEL_MS = Number(process.env.ASKEL_MS ?? 4);
const ULOS = process.env.ULOS ?? '/tmp/matkakirja-kaappaukset/tasaisuus'; mkdirSync(ULOS, { recursive: true });
const TYYPIT = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.geojson': 'application/json' };
const palvelin = http.createServer((req, res) => { const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]); if (!existsSync(polku)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' }); res.end(readFileSync(polku)); });
await new Promise((ok) => palvelin.listen(0, ok)); const osoite = `http://localhost:${palvelin.address().port}/`;
const muisti = new Map(); const ampari = (url) => { if (!muisti.has(url)) muisti.set(url, fetch(url).then(async (v) => (v.ok ? { body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') } : null)).catch(() => null)); return muisti.get(url); };
const peli = new Game({ players: [{ name: 'Fogg', color: '#c9a227', start: 'marseille' }], pack: packById('maailmankartta'), seed: 5 }); peli.phase = 'action'; peli.tokens.delete('marseille');
const selain = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined, args: ['--use-angle=metal', '--ignore-gpu-blocklist', '--enable-gpu-rasterization'] });
const ctx = await selain.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, serviceWorkers: 'block' });
await ctx.addInitScript((d) => { localStorage.setItem('matkakirja-save-v1', d); localStorage.removeItem('matkakirja-lauta'); }, JSON.stringify(peli.toJSON()));
const sivu = await ctx.newPage(); const virheet = []; sivu.on('pageerror', (e) => virheet.push(String(e.message)));
await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort()); await sivu.route(/wikimedia\.org/, (r) => r.abort());
await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (r) => { const v = await ampari(r.request().url()); if (!v) { r.abort(); return; } r.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body, headers: { 'access-control-allow-origin': '*' } }); });
const cdp = await ctx.newCDPSession(sivu);
await sivu.goto(`${osoite}?lauta=pallo&koe=${encodeURIComponent(KOE)}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta && window.__kehysprofiili), null, { timeout: 90000 });
await sivu.waitForTimeout(2500);
await sivu.evaluate(() => { setInterval(() => { const ui = window.matkakirja?.ui; const n = ui?.ohitaNappi?.isConnected ? ui.ohitaNappi : document.querySelector('.fokusvirta-ohitanappi'); if (n) n.click(); }, 150); });
await sivu.waitForTimeout(2500);
await sivu.evaluate(() => window.matkakirja.ui.pallolauta.saavu?.({ kesto: 0 }));
await sivu.waitForTimeout(1500);
if (KURISTUS > 1) await cdp.send('Emulation.setCPUThrottlingRate', { rate: KURISTUS });
const gpu = await sivu.evaluate(() => { const gl = window.matkakirja.ui.pallonInstanssi.renderer().getContext(); const d = gl.getExtension('WEBGL_debug_renderer_info'); return d ? gl.getParameter(d.UNMASKED_RENDERER_WEBGL) : '?'; });
const syote = await sivu.evaluate(() => ({ vanha: window.matkakirja.ui.pallonSyote?.vanha ?? null }));
console.log('GPU:', gpu, '| koe', KOE, '| syöte vanha:', syote.vanha, '| korkeus', KORKEUS, '| kuristus', KURISTUS);
const kamera = (lat, lng, altitude) => sivu.evaluate((p) => { window.matkakirja.ui.pallolauta.heraa?.(); window.matkakirja.ui.pallonInstanssi.pointOfView(p, 0); }, { lat, lng, altitude });
const kotelo = await sivu.evaluate(() => { const r = document.querySelector('.pallo-kotelo').getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; });
const tulokset = { gpu, KOE, KORKEUS, KURISTUS, syote, sisainen: [], cdp: [], virheet };
const p = (x, n = 1) => (Number.isFinite(x) ? x.toFixed(n) : '—');
const tiivis = (t) => `px/ms-vaihtelu ${p((t.nopeusVaihtelu ?? 0) * 100, 0)} % | siirtymä/kehys ${p(t.siirtymaKa, 2)} px (hajonta/ka ${p((t.vaihtelu ?? 0) * 100, 0)} %) | pysähdyksiä ${t.pysahdyksia}/${t.kehyksia}, pisin ${p(t.pisinPysahdysMs, 0)} ms | dt p95 ${p(t.dtP95)}`;
for (let i = 0; i < TOISTOJA; i += 1) {
  // SISÄINEN VETO (tasaisuusmittari): suunta vuorotellen.
  await kamera(46.5, 2.5, KORKEUS); await sivu.waitForTimeout(2500);
  const s = await sivu.evaluate(async ({ nopeusPx, suunta }) => {
    const v = await window.__kehysprofiili.veto({ kesto: 3000, nopeusPx, suunta });
    return { tasaisuus: v.tasaisuus, profiili: window.__kehysprofiili.tiivista(v), teksti: window.__kehysprofiili.vetoTeksti(v), sovelluksia: window.matkakirja.ui.pallonSyote?.sovelluksia ?? null, kehykset: v.kehykset.map((k) => [+k.dt.toFixed(2), +(k.siirtyma ?? NaN).toFixed(3)]) };
  }, { nopeusPx: NOPEUS, suunta: i % 2 ? [-1, -0.3] : [1, 0.3] });
  tulokset.sisainen.push(s);
  console.log(`sisäinen ${i + 1}: ${tiivis(s.tasaisuus)} | kehys med ${p(s.profiili.mediaani)} p95 ${p(s.profiili.p95)} max ${p(s.profiili.max)} | varattu med ${p(s.profiili.varattuMed)} p95 ${p(s.profiili.varattuP95)}`);
  // CDP-KOSKETUSVETO: 8 ms:n askelin (tapahtumia ~2/kehys), siirtymä luetaan joka kehys.
  await kamera(46.5, 2.5, KORKEUS); await sivu.waitForTimeout(2500);
  await sivu.evaluate(() => {
    const pallo = window.matkakirja.ui.pallonInstanssi; const pov = pallo.pointOfView();
    const viite = { lat: pov.lat, lng: pov.lng }; const K = window.__K = { kehykset: [], kaynnissa: true, edellinen: null, t: performance.now() };
    window.__kehysprofiili.aloita();
    const askel = () => { if (!K.kaynnissa) return; const t = performance.now(); const r = pallo.getScreenCoords(viite.lat, viite.lng); const nyt = r ? { x: r.x, y: r.y } : null; K.kehykset.push({ dt: t - K.t, siirtyma: nyt && K.edellinen ? Math.hypot(nyt.x - K.edellinen.x, nyt.y - K.edellinen.y) : NaN }); K.t = t; K.edellinen = nyt; requestAnimationFrame(askel); };
    requestAnimationFrame(askel);
  });
  const x0 = kotelo.x + kotelo.w * (i % 2 ? 0.7 : 0.3); const y0 = kotelo.y + kotelo.h * 0.55; const suunta = i % 2 ? -1 : 1;
  const tp = (x, y) => [{ x, y, id: 0 }];
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: tp(x0, y0) });
  // Askeleet ASKEL_MS:n välein ilman odotusta vastauksesta (CDP:n kierros on
  // ~16 ms; odottaen tapahtumia tulisi vain joka toiseen kehykseen).
  const askelia = Math.round(2400 / ASKEL_MS); const nopeus = NOPEUS / 1000; // px/ms
  const lahetykset = []; const alku = Date.now();
  for (let k = 1; k <= askelia; k += 1) { const t = k * ASKEL_MS; lahetykset.push(cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: tp(x0 + suunta * nopeus * t, y0 + 0.3 * nopeus * t) }).catch(() => {})); const odota = alku + t - Date.now(); if (odota > 0) await new Promise((r) => setTimeout(r, odota)); }
  await Promise.all(lahetykset);
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  const c = await sivu.evaluate(() => {
    const K = window.__K; K.kaynnissa = false; const tulos = window.__kehysprofiili.lopeta();
    const t = window.__kehysprofiili.tasaisuus({ kehykset: K.kehykset.slice(2) });
    return { tasaisuus: t, profiili: window.__kehysprofiili.tiivista(tulos), sovelluksia: window.matkakirja.ui.pallonSyote?.sovelluksia ?? null, kehykset: K.kehykset.map((k) => [+k.dt.toFixed(2), +(k.siirtyma ?? NaN).toFixed(3)]) };
  });
  tulokset.cdp.push(c);
  console.log(`cdp      ${i + 1}: ${tiivis(c.tasaisuus)} | kehys med ${p(c.profiili.mediaani)} p95 ${p(c.profiili.p95)} max ${p(c.profiili.max)} | varattu med ${p(c.profiili.varattuMed)} p95 ${p(c.profiili.varattuP95)}`);
  await sivu.waitForTimeout(1500);
}
const ka = (t, avain) => t.length ? t.reduce((a, r) => a + (r.tasaisuus?.[avain] ?? 0), 0) / t.length : NaN;
console.log(`KESKIARVO sisäinen: px/ms-vaihtelu ${p(ka(tulokset.sisainen, 'nopeusVaihtelu') * 100, 0)} %, pysähdyksiä ${p(ka(tulokset.sisainen, 'pysahdyksia'), 1)} | cdp: px/ms-vaihtelu ${p(ka(tulokset.cdp, 'nopeusVaihtelu') * 100, 0)} %, pysähdyksiä ${p(ka(tulokset.cdp, 'pysahdyksia'), 1)}`);
writeFileSync(`${ULOS}/tasaisuus-${KOE}.json`, JSON.stringify(tulokset, null, 1));
console.log('virheet', virheet.slice(0, 3));
await selain.close(); palvelin.close();
