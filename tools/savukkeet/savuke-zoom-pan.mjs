/*
 * SELAINSAVUKE: PELINÄKYMÄN PANOROINTI JA ZOOM PYSYVÄT SUJUVINA.
 *
 *   PLAYWRIGHT_JS=… CHROMIUM=… node tools/savukkeet/savuke-zoom-pan.mjs
 *
 * Omistaja 20.9.2026: *"Pystyykö normaalin pelinäkymän zoomausta ja
 * panorointia parantamaan? Nyt vähän tökkii"*.
 *
 * MITTAUS TEHDÄÄN KURISTETULLA SUORITTIMELLA (CDP
 * Emulation.setCPUThrottlingRate 6×). Macilla tökkimistä ei näy —
 * mitattu 20.9.2026: kuristamattomana kehysajan p95 oli 26 ms sekä
 * levossa että vedossa, eli mittari ei erottanut elettä lepotilasta.
 * Kuudesosanopeudella ero näkyy: ennen korjausta vedon p95 oli 61,6 ms
 * ja pitkiä tehtäviä 29 (pisin 93 ms).
 *
 * Mitataan kehysvälit (requestAnimationFrame) ja pitkät tehtävät
 * (PerformanceObserver longtask) kolmessa vaiheessa: lepo (vertailu),
 * veto ja rullazoom. Rajat on asetettu mitatun korjatun tason ja
 * korjaamattoman väliin, jotta savuke kaatuu jos tökkiminen palaa.
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';
const JUURI = new URL('../..', import.meta.url).pathname;
const { Game } = await import(`${JUURI}/js/game.js`);
const { packById } = await import(`${JUURI}/js/pack.js`);
const pw = await import('playwright').catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const paketti = pw.chromium ? pw : pw.default;
const TYYPIT = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.geojson': 'application/json' };
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(Number(process.env.PORTTI) || 8930, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;
const muisti = new Map();
const ampari = (url) => {
  if (!muisti.has(url)) muisti.set(url, fetch(url).then(async (v) => (v.ok ? { body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') } : null)).catch(() => null));
  return muisti.get(url);
};
const peli = new Game({ players: [{ name: 'Fogg', color: '#c9a227', start: 'pariisi' }], pack: packById('maailmankartta'), seed: 5 });
peli.phase = 'action'; peli.tokens.delete('pariisi');
const selain = await paketti.chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });
const LAUDAT = (process.env.LAUDAT ?? 'pelinakyma').split(',');
const KURISTUS = Number(process.env.KURISTUS ?? 6);
/* Rajat: mitattu korjattuna p95 17,8 / 14,5 ms, korjaamattomana 61,6 / 26,7. */
const PAN_P95_KATTO_MS = 40;
const ZOOM_P95_KATTO_MS = 30;
const PITKIA_KATTO = 8;
let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ok, lisa = '') => {
  kaikki += 1;
  if (ok) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);
for (const lauta of LAUDAT) {
  const ctx = await selain.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true, serviceWorkers: 'block' });
  await ctx.addInitScript((d) => { localStorage.setItem('matkakirja-save-v1', d); localStorage.removeItem('matkakirja-lauta'); }, JSON.stringify(peli.toJSON()));
  const s = await ctx.newPage();
  await s.route((u) => !/^(127\.0\.0\.1|localhost)$/.test(u.hostname), (r) => r.abort());
  await s.route(/media\.matkakirja\.app|r2\.dev\//, async (r) => {
    const v = await ampari(r.request().url());
    if (!v) { r.abort(); return; }
    r.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body, headers: { 'access-control-allow-origin': '*' } });
  });
  await s.goto(`${osoite}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await s.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta) || Boolean(window.matkakirja?.ui?.svg), null, { timeout: 90000 });
  await s.waitForTimeout(5000);
  if (KURISTUS > 1) {
    const cdp = await ctx.newCDPSession(s);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: KURISTUS });
  }
  await s.evaluate(() => { for (const el of document.querySelectorAll('.saapumistraileri, .fokusvirta-isokuva, .fokuskohde-popup, .fokusnosto-kerros')) el.remove(); });
  const alaVahti = async () => s.evaluate(() => {
    window.__kehykset = []; window.__pitkat = []; window.__tapahtumat = { pointermove: 0, wheel: 0 };
    let edellinen = performance.now();
    window.__raf = (t) => { window.__kehykset.push(+(t - edellinen).toFixed(1)); edellinen = t; window.__rafId = requestAnimationFrame(window.__raf); };
    window.__rafId = requestAnimationFrame(window.__raf);
    try {
      window.__po = new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__pitkat.push(Math.round(e.duration)); });
      window.__po.observe({ entryTypes: ['longtask'] });
    } catch { /* ei tukea */ }
    for (const laji of ['pointermove', 'wheel']) {
      document.addEventListener(laji, () => { window.__tapahtumat[laji] += 1; }, true);
    }
  });
  const lue = async (nimi) => s.evaluate((n) => {
    cancelAnimationFrame(window.__rafId); window.__po?.disconnect?.();
    const k = window.__kehykset.filter((x) => x > 0).sort((a, b) => a - b);
    const p = (q) => (k.length ? k[Math.min(k.length - 1, Math.floor(q * k.length))] : null);
    return {
      vaihe: n, kehyksia: k.length, mediaani: p(0.5), p95: p(0.95), max: k.at(-1) ?? null,
      isot: window.__kehykset.map((v, i) => [i, v]).filter(([, v]) => v > 50).slice(0, 6),
      kehyksia2: window.__kehykset.length,
      pitkia: window.__pitkat.length, pitkinMs: window.__pitkat.sort((a, b) => b - a)[0] ?? 0,
      tapahtumat: window.__tapahtumat,
    };
  }, nimi);
  const kotelo = await s.evaluate(() => {
    const e = document.querySelector('.map-pane, #board, .pallo-kotelo');
    const r = e.getBoundingClientRect();
    return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) };
  });
  const tulokset = [];
  // 1. Lepo (vertailutaso).
  await alaVahti(); await s.waitForTimeout(2000); tulokset.push(await lue('lepo'));
  // 2. Panorointi: hidas veto 2 s.
  await alaVahti();
  await s.mouse.move(kotelo.x, kotelo.y); await s.mouse.down();
  for (let i = 1; i <= 60; i += 1) { await s.mouse.move(kotelo.x - i * 2, kotelo.y + Math.sin(i / 8) * 8); await new Promise((r) => setTimeout(r, 16)); }
  await s.mouse.up();
  tulokset.push(await lue('panorointi'));
  await s.waitForTimeout(1500);
  // 3. Rullazoom (cmd = zoom pallolla, tavallinen kartta zoomaa rullalla).
  await alaVahti();
  await s.mouse.move(kotelo.x, kotelo.y);
  for (let i = 0; i < 30; i += 1) { await s.mouse.wheel(0, i % 2 ? -120 : -120); await new Promise((r) => setTimeout(r, 30)); }
  tulokset.push(await lue('rullazoom'));
  await s.waitForTimeout(1500);
  // 4. Nipistys (kaksi sormea).
  await alaVahti();
  await s.evaluate(async ({ x, y }) => {
    const kotelo = document.querySelector('.map-pane, #board, .pallo-kotelo');
    const tee = (laji, pisteet) => {
      const kosketukset = pisteet.map((p, i) => new Touch({ identifier: i, target: kotelo, clientX: p.x, clientY: p.y, pageX: p.x, pageY: p.y }));
      kotelo.dispatchEvent(new TouchEvent(laji, { bubbles: true, cancelable: true, touches: kosketukset, targetTouches: kosketukset, changedTouches: kosketukset }));
    };
    tee('touchstart', [{ x: x - 40, y }, { x: x + 40, y }]);
    for (let i = 1; i <= 40; i += 1) {
      const d = 40 + i * 3;
      tee('touchmove', [{ x: x - d, y }, { x: x + d, y }]);
      await new Promise((r) => setTimeout(r, 16));
    }
    tee('touchend', [{ x: x - 160, y }, { x: x + 160, y }]);
  }, kotelo);
  tulokset.push(await lue('nipistys'));
  const lue2 = (nimi) => tulokset.find((t) => t.vaihe === nimi) ?? {};
  const lepo = lue2('lepo');
  const pan = lue2('panorointi');
  const zoom = lue2('rullazoom');
  tieto(`${lauta} kehysajat (kuristus ${KURISTUS}×)`, JSON.stringify(tulokset));
  vaadi(`${lauta}: ele mitattiin (veto ja rulla menivät perille)`,
    pan.tapahtumat?.pointermove > 50 && zoom.tapahtumat?.wheel > 20,
    JSON.stringify({ pan: pan.tapahtumat, zoom: zoom.tapahtumat }));
  vaadi(`${lauta}: panorointi pysyy sujuvana (kehysajan p95 ≤ ${PAN_P95_KATTO_MS} ms)`,
    pan.p95 !== null && pan.p95 <= PAN_P95_KATTO_MS,
    `p95 ${pan.p95} ms, mediaani ${pan.mediaani}, max ${pan.max} (lepo p95 ${lepo.p95})`);
  vaadi(`${lauta}: panoroinnissa enintään ${PITKIA_KATTO} pitkää tehtävää`,
    pan.pitkia <= PITKIA_KATTO, `pitkiä ${pan.pitkia}, pisin ${pan.pitkinMs} ms`);
  vaadi(`${lauta}: rullazoom pysyy sujuvana (kehysajan p95 ≤ ${ZOOM_P95_KATTO_MS} ms)`,
    zoom.p95 !== null && zoom.p95 <= ZOOM_P95_KATTO_MS,
    `p95 ${zoom.p95} ms, mediaani ${zoom.mediaani}, max ${zoom.max}`);
  vaadi(`${lauta}: rullazoomissa enintään ${PITKIA_KATTO} pitkää tehtävää`,
    zoom.pitkia <= PITKIA_KATTO, `pitkiä ${zoom.pitkia}, pisin ${zoom.pitkinMs} ms`);
  await ctx.close();
}
await selain.close(); palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
