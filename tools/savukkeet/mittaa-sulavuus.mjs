/*
 * MITTARI: PALLON SULAVUUS OIKEASTA SYÖTTEESTÄ (sulavuus E1, Karttaseppä 21.9.2026).
 *
 * Omistajan päätös 21.9.2026 "KARTAN SULAVUUS ENSIN": pallon on panoroiduttava
 * ja zoomattava kuten Google Earth. Tämä mittari ajaa pelin GPU-headlessissä
 * (Chromium + ANGLE Metal: oikea näytönohjain, ks. muistiinpano
 * gpu-headless-metal) ja syöttää OIKEAT eleet — sormiveto 8 ms:n askelin,
 * cmd+rulla, kahden sormen nipistys CDP:n kosketustapahtumina — ja kirjaa
 * joka kehyksestä: rAF-väli, laattakerroksen päivitys, kirjaston updatePov,
 * tekstuurien vienti, renderer.render, kameran tila ja laattojen peitto
 * (näkyviä / scenessä / häive perillä). Pitkät tehtävät (longtask) erikseen.
 *
 *   PLAYWRIGHT_JS=<playwright/index.js> node tools/savukkeet/mittaa-sulavuus.mjs
 *       NAKYMA=puhelin|tyopoyta  (390×844 dpr 3 kosketus | 1400×900 dpr 2)
 *       KURISTUS=1|4             (CDP CPU-kuristus; 4 ≈ puhelin)
 *       KORKEUS=0.2              (kameran korkeus lähtönäkymässä)
 *       PROFIILI=1               (CPU-profiili .cpuprofile ULOS-kansioon)
 *       ULOS=<kansio>            (tulos-<nakyma>-k<kuristus>.json)
 *
 * TULKINTA: headlessin rAF on kaksijakoinen (11/26 ms) ja pysähtyy, kun sivu
 * ei piirrä — mediaani ja p95 ovat siksi ympäristön lukuja. Pelin omat
 * ongelmat näkyvät: `max` ja `>30 ms` kehykset liikkeen aikana, `pitkat`
 * (longtask), `peittamatta` (kehyksiä, joissa näkyvällä alueella on laatta
 * ilman scenessä olevaa kuvaa = pohja näkyy), `tasonVaihtoja`,
 * `zoomAskel` (ln-korkeuden askel per kehys; rullan pykälä näkyy tässä),
 * `sahaus` (kamera-askelten p90/p10 panoroinnissa) ja laattojen
 * valmistelun kesto (`laatat.valmisteluKa/Max`).
 *
 * MITATTU 21.9.2026 ENNEN E1:tä (puhelin, 4×): zoomissa 383 ms:n ja
 * nipistyksessä 352 ms:n tehtävä (naulaus + laattojen valmistelu samassa
 * kehyksessä); E1:n jälkeen pisin kehys 49 ms, pitkiä tehtäviä 0.
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';
import { dirname, join as liita } from 'node:path';
import { fileURLToPath } from 'node:url';
const JUURI = process.env.JUURI ?? liita(dirname(fileURLToPath(import.meta.url)), '..', '..');
const { Game } = await import(`${JUURI}/js/game.js`); const { packById } = await import(`${JUURI}/js/pack.js`);
const pw = await import('playwright').catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = pw.chromium ?? pw.default?.chromium;
const NAKYMA = process.env.NAKYMA ?? 'puhelin'; const KURISTUS = Number(process.env.KURISTUS ?? 1); const PROFIILI = process.env.PROFIILI === '1';
const KORKEUS = Number(process.env.KORKEUS ?? 0.2); const ULOS = process.env.ULOS ?? '/tmp/matkakirja-kaappaukset/sulavuus'; mkdirSync(ULOS, { recursive: true });
const NAKYMAT = { puhelin: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true }, tyopoyta: { viewport: { width: 1400, height: 900 }, deviceScaleFactor: 2 } };
const TYYPIT = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.geojson': 'application/json' };
const palvelin = http.createServer((req, res) => { const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]); if (!existsSync(polku)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' }); res.end(readFileSync(polku)); });
await new Promise((ok) => palvelin.listen(0, ok)); const osoite = `http://localhost:${palvelin.address().port}/`;
const muisti = new Map(); const ampari = (url) => { if (!muisti.has(url)) muisti.set(url, fetch(url).then(async (v) => (v.ok ? { body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') } : null)).catch(() => null)); return muisti.get(url); };
const peli = new Game({ players: [{ name: 'Fogg', color: '#c9a227', start: 'marseille' }], pack: packById('maailmankartta'), seed: 5 }); peli.phase = 'action'; peli.tokens.delete('marseille');
const selain = await chromium.launch({
  executablePath: process.env.CHROMIUM || undefined,
  // Oikea GPU Macilla (ANGLE Metal); muualla liput ovat harmittomia.
  args: ['--use-angle=metal', '--ignore-gpu-blocklist', '--enable-gpu-rasterization'],
});
const ctx = await selain.newContext({ ...NAKYMAT[NAKYMA], serviceWorkers: 'block' });
await ctx.addInitScript((d) => { localStorage.setItem('matkakirja-save-v1', d); localStorage.removeItem('matkakirja-lauta'); }, JSON.stringify(peli.toJSON()));
const sivu = await ctx.newPage(); const virheet = []; sivu.on('pageerror', (e) => virheet.push(String(e.message)));
await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort()); await sivu.route(/wikimedia\.org/, (r) => r.abort());
await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (r) => { const v = await ampari(r.request().url()); if (!v) { r.abort(); return; } r.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body, headers: { 'access-control-allow-origin': '*' } }); });
const cdp = await ctx.newCDPSession(sivu);
await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 90000 });
await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
await sivu.waitForTimeout(2500);
await sivu.evaluate(() => { setInterval(() => { const ui = window.matkakirja?.ui; const n = ui?.ohitaNappi?.isConnected ? ui.ohitaNappi : document.querySelector('.fokusvirta-ohitanappi'); if (n) n.click(); }, 150); });
await sivu.waitForTimeout(2500);
await sivu.evaluate(() => window.matkakirja.ui.pallolauta.saavu?.({ kesto: 0 }));
await sivu.waitForTimeout(1500);
const gpu = await sivu.evaluate(() => { const gl = window.matkakirja.ui.pallonInstanssi.renderer().getContext(); const d = gl.getExtension('WEBGL_debug_renderer_info'); return d ? gl.getParameter(d.UNMASKED_RENDERER_WEBGL) : '?'; });
console.log('GPU:', gpu, '| näkymä', NAKYMA, '| kuristus', KURISTUS);
// Koukut
await sivu.evaluate(() => {
  const M = { mittaa: false, kehykset: [], osat: { laatat: 0, moottori: 0, tekstuurit: 0, piirto: 0, vektorit: 0 }, pitkat: [], tekstuureja: 0, syotteet: 0, kamera: [] };
  window.__M = M; const { ui } = window.matkakirja; const pallo = ui.pallonInstanssi; const lauta = ui.pallolauta;
  let edellinen = performance.now();
  const askel = (t) => {
    if (M.mittaa) { const pov = pallo.pointOfView(); const km = window.__kerros?.mittarit?.() ?? {}; M.kehykset.push([+(t - edellinen).toFixed(2), +M.osat.laatat.toFixed(2), +M.osat.moottori.toFixed(2), +M.osat.tekstuurit.toFixed(2), +M.osat.piirto.toFixed(2), +M.osat.vektorit.toFixed(2), +pov.lat.toFixed(4), +pov.lng.toFixed(4), +pov.altitude.toFixed(5), M.syotteet, km.taso ?? -1, km.nakyvia ?? 0, km.nakyviaScenessa ?? 0, km.nakyviaTaysin ?? 0, M.osoitinX]); }
    M.osat = { laatat: 0, moottori: 0, tekstuurit: 0, piirto: 0, vektorit: 0 }; M.syotteet = 0; edellinen = t; requestAnimationFrame(askel);
  };
  requestAnimationFrame(askel);
  const mittaa = (olio, avain, nimi) => { const a = olio?.[avain]; if (typeof a !== 'function') return false; olio[avain] = function m(...args) { const t0 = performance.now(); try { return a.apply(this, args); } finally { M.osat[nimi] += performance.now() - t0; } }; return true; };
  try { new PerformanceObserver((l) => { if (M.mittaa) for (const e of l.getEntries()) M.pitkat.push(+e.duration.toFixed(1)); }).observe({ type: 'longtask', buffered: false }); } catch {}
  M.osoitinX = 0; for (const laji of ['pointermove', 'touchmove', 'wheel']) document.addEventListener(laji, (e) => { M.syotteet += 1; if (laji === 'pointermove') M.osoitinX = e.clientX; }, true);
  const renderer = pallo.renderer(); M.k = {};
  M.k.piirto = mittaa(renderer, 'render', 'piirto');
  const it = renderer.initTexture.bind(renderer); renderer.initTexture = (t) => { const t0 = performance.now(); try { return it(t); } finally { M.osat.tekstuurit += performance.now() - t0; if (M.mittaa) M.tekstuureja += 1; } };
  let moottori = null; pallo.scene().traverse((o) => { if (!moottori && Array.isArray(o.thresholds) && typeof o.updatePov === 'function') moottori = o; });
  if (moottori) M.k.moottori = mittaa(moottori, 'updatePov', 'moottori');
  const kerros = lauta.lepokerros?.(); if (kerros) M.k.laatat = mittaa(kerros, 'paivita', 'laatat');
  window.__kerros = kerros;
});
if (KURISTUS > 1) await cdp.send('Emulation.setCPUThrottlingRate', { rate: KURISTUS });
const kotelo = await sivu.evaluate(() => { const r = document.querySelector('.pallo-kotelo, #board, .map-pane').getBoundingClientRect(); return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2), w: r.width, h: r.height }; });
const kamera = (lat, lng, altitude) => sivu.evaluate((p) => { window.matkakirja.ui.pallolauta.heraa?.(); window.matkakirja.ui.pallonInstanssi.pointOfView(p, 0); }, { lat, lng, altitude });
const aloita = () => sivu.evaluate(() => { const M = window.__M; M.kehykset = []; M.pitkat = []; M.tekstuureja = 0; M.mittaa = true; });
const lopeta = (nimi) => sivu.evaluate((n) => {
  const M = window.__M; M.mittaa = false; const k = M.kehykset; const dt = k.map((r) => r[0]).sort((a, b) => a - b);
  const p = (q) => dt[Math.min(dt.length - 1, Math.floor(q * dt.length))];
  const pahimmat = [...k].map((r, i) => [i, ...r]).sort((a, b) => b[1] - a[1]).slice(0, 8);
  const yli = k.filter((r) => r[0] > 20).length;
  const peittamatta = k.filter((r) => r[11] > 0 && r[12] < r[11]).length; const eiTaysin = k.filter((r) => r[11] > 0 && r[13] < r[11]).length;
  const tasot = [...new Set(k.map((r) => r[10]))]; let tasonVaihtoja = 0; for (let i = 1; i < k.length; i++) if (k[i][10] !== k[i - 1][10]) tasonVaihtoja++;
  const altit = k.map((r) => r[8]); const zoomAskeleet = []; for (let i = 1; i < altit.length; i++) if (altit[i] !== altit[i - 1]) zoomAskeleet.push(+Math.abs(Math.log(altit[i] / altit[i - 1])).toFixed(3));
  const za = zoomAskeleet.sort((a, b) => a - b); const zp = (q) => za[Math.min(za.length - 1, Math.floor(q * za.length))] ?? 0;
  // kamera-askel per kehys (lng) vs syötteet: sahaus = max/min peräkkäisten liikkuvien kehysten välillä
  const dl = []; for (let i = 1; i < k.length; i++) { const d = Math.abs(k[i][7] - k[i - 1][7]); if (d > 1e-4 && k[i][9] > 0) dl.push(d); }
  const dls = [...dl].sort((a, b) => a - b); const sahaus = dls.length > 10 ? +(dls[Math.floor(dls.length * 0.9)] / dls[Math.floor(dls.length * 0.1)]).toFixed(2) : null;
  const liikkumatta = k.filter((r, i) => i > 0 && r[9] > 0 && Math.abs(r[7] - k[i - 1][7]) < 1e-4 && Math.abs(r[6] - k[i - 1][6]) < 1e-4).length;
  const summa = (j) => +k.reduce((s, r) => s + r[j], 0).toFixed(0);
  const km = window.__kerros?.mittarit?.() ?? {}; const vm = window.matkakirja.ui.pallolauta.vektorit?.()?.mittarit?.() ?? {};
  return { vektorit: { korostusJanoja: vm.korostusJanoja, naulaussaie: vm.naulaussaie, naulauksia: vm.naulauksia, harvennus: vm.harvennus, lod: vm.lod }, kehykset: k, vaihe: n, kehyksia: k.length, peittamatta, eiTaysin, tasot, tasonVaihtoja, zoomAskel: { n: za.length, p50: zp(0.5), p90: zp(0.9), max: za.at(-1) ?? 0, alkuAlt: altit[0], loppuAlt: altit.at(-1) }, sahaus, liikkumattaSyotteella: liikkumatta, mediaani: p(0.5), p95: p(0.95), max: dt.at(-1), yli20ms: yli, osuusYli: +(100 * yli / Math.max(1, k.length)).toFixed(1), summat: { laatat: summa(1), moottori: summa(2), tekstuurit: summa(3), piirto: summa(4) }, tekstuureja: M.tekstuureja, pitkat: M.pitkat.sort((a, b) => b - a).slice(0, 6), pahimmat, laatat: { taso: km.taso, laattoja: km.laattoja, valmisteluja: km.valmisteluja, valmisteluMs: km.valmisteluMs, valmisteluMax: km.valmisteluMax, purettuja: km.purettuja, pyyntoja: km.pyyntoja, jumissa: km.jumissa } };
}, nimi);
const tulokset = {};
let profiili = null;
if (PROFIILI) { await cdp.send('Profiler.enable'); await cdp.send('Profiler.setSamplingInterval', { interval: 200 }); }
// LEPO
await kamera(46.5, 2.5, KORKEUS); await sivu.waitForTimeout(3000);
await aloita(); await sivu.waitForTimeout(2000); tulokset.lepo = await lopeta('lepo');
// PANOROINTI: sormiveto 2,5 s, 8 ms askelin, itään 1,2 ruudunleveyttä, sitten liuku
if (PROFIILI) await cdp.send('Profiler.start');
await aloita();
await sivu.mouse.move(kotelo.x + kotelo.w * 0.4, kotelo.y); await sivu.mouse.down();
const askelia = 300; for (let i = 1; i <= askelia; i++) { await sivu.mouse.move(kotelo.x + kotelo.w * 0.4 - (kotelo.w * 1.2) * i / askelia, kotelo.y + Math.sin(i / 20) * 20); await new Promise((r) => setTimeout(r, 8)); }
await sivu.mouse.up(); await sivu.waitForTimeout(1500);
tulokset.panorointi = await lopeta('panorointi');
await sivu.waitForTimeout(1500);
// ZOOM: rulla sisään 3 s, sitten ulos
await kamera(46.5, 2.5, KORKEUS); await sivu.waitForTimeout(2500);
await aloita(); await sivu.mouse.move(kotelo.x + kotelo.w * 0.25, kotelo.y); await sivu.keyboard.down('Meta');
for (let i = 0; i < 40; i++) { await sivu.mouse.wheel(0, -40); await new Promise((r) => setTimeout(r, 40)); }
await sivu.waitForTimeout(800);
for (let i = 0; i < 40; i++) { await sivu.mouse.wheel(0, 40); await new Promise((r) => setTimeout(r, 40)); }
await sivu.keyboard.up('Meta');
await sivu.waitForTimeout(1200);
tulokset.zoom = await lopeta('zoom');
// NIPISTYS (vain kosketusnäkymä)
if (NAKYMAT[NAKYMA].hasTouch) {
  await kamera(46.5, 2.5, KORKEUS); await sivu.waitForTimeout(2500); await aloita();
  const tp = (a, b) => [{ x: a, y: kotelo.y, id: 0 }, { x: b, y: kotelo.y, id: 1 }];
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: tp(kotelo.x - 30, kotelo.x + 30) });
  for (let i = 1; i <= 120; i++) { const d = 30 + i * 1.2; await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: tp(kotelo.x - d, kotelo.x + d) }); await new Promise((r) => setTimeout(r, 8)); }
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await sivu.waitForTimeout(1500); tulokset.nipistys = await lopeta('nipistys');
}
if (PROFIILI) { profiili = (await cdp.send('Profiler.stop')).profile; writeFileSync(`${ULOS}/profiili-${NAKYMA}-k${KURISTUS}.cpuprofile`, JSON.stringify(profiili)); }
writeFileSync(`${ULOS}/tulos-${NAKYMA}-k${KURISTUS}.json`, JSON.stringify({ gpu, NAKYMA, KURISTUS, KORKEUS, tulokset, virheet }, null, 1));
for (const t of Object.values(tulokset)) console.log(JSON.stringify({ ...t, kehykset: undefined, pahimmat: undefined, summat: undefined, laatat: { valmisteluja: t.laatat.valmisteluja, valmisteluMax: Math.round(t.laatat.valmisteluMax), valmisteluKa: +(t.laatat.valmisteluMs / Math.max(1, t.laatat.valmisteluja)).toFixed(1) } }));
for (const t of Object.values(tulokset)) if (process.env.PAHIMMAT && t.vaihe !== 'lepo') console.log(t.vaihe, 'pahimmat [i, dt, laatat, moottori, tekst, piirto, vekt, lat, lng, alt, syötteitä]:', JSON.stringify(t.pahimmat));
console.log('virheet', virheet.slice(0, 3));
await selain.close(); palvelin.close();
