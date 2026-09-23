/*
 * MITTARI: HEITON TÖKKÄYS PALJAASSA KARTASSA (omistaja 23.9.2026 klo 12.4x:
 * "siinäkin on yksi tökkäys yleensä, jos vedän kerran ja jätän kartan
 * liikkumaan itsestään loppuun").
 *
 * Synteettinen heitto: veto HEITTO_MS vakionopeudella, irrotus, ja sitten
 * joka renderistä kiinteän maapisteen ruutupaikka kunnes liuku on ohi.
 * Kehyksittäin: dt, siirtymä px, laattavientejä, pyyntöjä, taso, dc,
 * rAF-kutsujen nimet (kehysprofiili). Tökkäys = kehys, jonka siirtymä/dt
 * poikkeaa ennustetusta (edellinen nopeus × kitka) yli TOKKAYS_SUHDE.
 *
 * KÄYTTÖ:
 *   PLAYWRIGHT_JS=... SAVUKE_MOOTTORI=webkit|chromium node tools/savukkeet/mittaa-heitto.mjs [kierroksia]
 * Chromium saa GPU:n lipulla --use-angle=metal (ks. mittaa-sulavuus.mjs).
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = process.env.JUURI ?? join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const { Game } = await import(`${JUURI}/js/game.js`);
const { packById } = await import(`${JUURI}/js/pack.js`);
const pw = await import('playwright').catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const paketti = pw.webkit ? pw : (pw.default ?? pw);
const MOOTTORI = process.env.SAVUKE_MOOTTORI ?? 'webkit';
const KIERROKSIA = Number(process.argv[2] ?? 4);
const PIIRTOKOE = process.env.PIIRTOKOE ?? 'paljas';
const HAKU = process.env.HAKU ?? '';
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
const peli = new Game({ players: [{ name: 'Fogg', color: '#c9a227', start: 'pariisi' }], pack: packById('maailmankartta'), seed: 5 });
peli.phase = 'action';
const tallenne = JSON.stringify(peli.toJSON());

const selain = MOOTTORI === 'webkit'
  ? await paketti.webkit.launch()
  : await paketti.chromium.launch({ executablePath: process.env.CHROMIUM || undefined, args: ['--use-angle=metal', '--ignore-gpu-blocklist'] });
const ctx = await selain.newContext({ viewport: { width: 820, height: 1180 }, deviceScaleFactor: 2, isMobile: MOOTTORI !== 'webkit' ? true : undefined, hasTouch: true, serviceWorkers: 'block' });
await ctx.addInitScript(([d, koe]) => {
  if (sessionStorage.getItem('savuke-alustettu')) return;
  sessionStorage.setItem('savuke-alustettu', '1');
  localStorage.setItem('matkakirja-save-v1', d); localStorage.removeItem('matkakirja-lauta');
  localStorage.setItem('matkakirja-piirtokoe', koe);
  localStorage.setItem('matkakirja-suoraan-kartalle', '1');
}, [tallenne, PIIRTOKOE]);
const sivu = await ctx.newPage();
const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e.message)));
await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (r) => { const v = await ampari(r.request().url()); if (!v) { r.abort(); return; } r.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body, headers: { 'access-control-allow-origin': '*' } }); });
await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
await sivu.route(/wikimedia\.org/, (r) => r.abort());
await sivu.goto(`${osoite}?lauta=pallo${HAKU}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta && window.__kehysprofiili), null, { timeout: 90000 });
await sivu.waitForTimeout(6000);

const heitto = (asetukset) => sivu.evaluate(async ({ nopeusPx, kesto, suunta }) => {
  const ui = window.matkakirja.ui;
  const pallo = ui.pallonInstanssi;
  const r = pallo.renderer();
  const kohde = r.domElement;
  const prof = window.__kehysprofiili;
  const laatat = () => ui.pallolauta?.lepokerros?.()?.mittarit?.() ?? {};
  const b = kohde.getBoundingClientRect();
  let x = b.left + b.width * 0.5 - suunta[0] * nopeusPx * kesto / 2000;
  let y = b.top + b.height * 0.5 - suunta[1] * nopeusPx * kesto / 2000;
  const alku0 = pallo.pointOfView();
  const viite = { lat: alku0.lat, lng: alku0.lng };
  const renderit = [];
  const alkuperainen = r.render;
  r.render = function render(...a) {
    const tulos = alkuperainen.apply(this, a);
    const p = pallo.getScreenCoords(viite.lat, viite.lng);
    const m = laatat();
    renderit.push({ t: performance.now(), x: p?.x, y: p?.y, vienteja: m.vienteja ?? 0, pyyntoja: m.pyyntoja ?? 0, taso: m.taso, scenessa: m.scenessa ?? 0, dc: r.info.render.calls, liu: Boolean(ui.pallonVauhti?.raf) });
    return tulos;
  };
  const tapahtuma = (tyyppi) => kohde.dispatchEvent(new PointerEvent(tyyppi, {
    bubbles: true, cancelable: true, composed: true, pointerId: 7, pointerType: 'touch', isPrimary: true,
    clientX: x, clientY: y, buttons: tyyppi === 'pointerup' ? 0 : 1, button: 0,
  }));
  prof.aloita();
  const t0 = performance.now();
  tapahtuma('pointerdown');
  let irti = 0;
  // Syöte omalla ajastimella kuten iOS:n pointermove (ei rAF-tahdissa).
  await new Promise((valmis) => {
    let ed = performance.now();
    const laheta = () => {
      const t = performance.now(); const d = t - ed; ed = t;
      x += suunta[0] * nopeusPx * d / 1000; y += suunta[1] * nopeusPx * d / 1000;
      tapahtuma('pointermove');
      if (t - t0 < kesto) setTimeout(laheta, 16.6); else { tapahtuma('pointerup'); irti = performance.now(); valmis(); }
    };
    setTimeout(laheta, 16.6);
  });
  // Odota liu'un loppuun (+400 ms lepoa).
  await new Promise((valmis) => {
    let loppu = 0;
    const odota = () => {
      const t = performance.now();
      if (!ui.pallonVauhti?.raf && !loppu) loppu = t;
      if ((loppu && t - loppu > 400) || t - irti > 6000) valmis(); else requestAnimationFrame(odota);
    };
    requestAnimationFrame(odota);
  });
  r.render = alkuperainen;
  const prof2 = prof.lopeta();
  const kehykset = prof2.kehykset.map((k) => ({ t: k.t + prof2.alku, dt: k.dt, varattu: k.varattu, kutsut: k.kutsut }));
  return { t0, irti, renderit, kehykset, alt: alku0.altitude };
}, asetukset);

const tulokset = [];
const suunnat = [[0.2, 1], [-0.2, -1], [1, 0.3], [-1, -0.3]];
for (let i = 0; i < KIERROKSIA; i += 1) {
  const s = suunnat[i % suunnat.length];
  const n = Math.hypot(...s);
  const h = await heitto({ nopeusPx: 1400, kesto: 260, suunta: [s[0] / n, s[1] / n] });
  await sivu.waitForTimeout(1500);
  // Renderien väliset siirtymät.
  const R = h.renderit;
  const rivit = [];
  for (let j = 1; j < R.length; j += 1) {
    const a = R[j - 1]; const b = R[j];
    const dt = b.t - a.t;
    const s2 = Number.isFinite(a.x) && Number.isFinite(b.x) ? Math.hypot(b.x - a.x, b.y - a.y) : NaN;
    rivit.push({ t: Math.round(b.t - h.irti), dt: +dt.toFixed(1), px: +s2.toFixed(1), v: +(s2 / dt).toFixed(3), vienti: b.vienteja - a.vienteja, pyynt: b.pyyntoja - a.pyyntoja, taso: b.taso, sc: b.scenessa, dc: b.dc, liu: b.liu });
  }
  // Liu'un vaihe: ensimmäinen irrotuksen jälkeinen render → liuku päättyy.
  const liuku = rivit.filter((r2) => r2.t >= 0);
  // Tökkäys: nopeus px/ms poikkeaa naapureiden mediaanista yli 35 %, tai dt > 25.
  const tokkaykset = [];
  for (let j = 1; j + 1 < liuku.length; j += 1) {
    const odotettu = (liuku[j - 1].v + liuku[j + 1].v) / 2;
    if (odotettu > 0.05 && Math.abs(liuku[j].v - odotettu) / odotettu > 0.35) tokkaykset.push({ ...liuku[j], syy: 'nopeus', odotettu: +odotettu.toFixed(3) });
    else if (liuku[j].dt > 25 && liuku[j].px > 0.5) tokkaykset.push({ ...liuku[j], syy: 'dt' });
  }
  // Kehysprofiilin pitkät kehykset liu'un aikana.
  const pitkat = h.kehykset.filter((k) => k.t >= h.irti && k.dt > 22).map((k) => ({ t: Math.round(k.t - h.irti), dt: Math.round(k.dt), varattu: Math.round(k.varattu ?? -1), kutsut: Object.entries(k.kutsut ?? {}).map(([n2, ms]) => `${n2.slice(0, 24)} ${ms.toFixed(1)}`).join(', ') }));
  const vienteja = liuku.reduce((a, r2) => a + r2.vienti, 0);
  const tasot = [...new Set(liuku.map((r2) => r2.taso))];
  console.log(`\n== heitto ${i + 1} suunta ${s} alt ${h.alt.toFixed(3)}: liuku ${liuku.length} renderiä, vientejä liu'ussa ${vienteja}, tasot ${tasot.join('/')}`);
  console.log('   ensimmäiset liu\'un kehykset:', liuku.slice(0, 6).map((r2) => `${r2.t}:${r2.dt}ms/${r2.px}px`).join('  '));
  console.log('   viimeiset:', liuku.filter((r2) => r2.px > 0).slice(-6).map((r2) => `${r2.t}:${r2.dt}ms/${r2.px}px`).join('  '));
  for (const t of tokkaykset) console.log('   TÖKKÄYS', JSON.stringify(t));
  for (const k of pitkat) console.log('   pitkä', JSON.stringify(k));
  tulokset.push({ tokkayksia: tokkaykset.length, vienteja, pitkia: pitkat.length });
  if (process.env.RAAKA) console.log(JSON.stringify(liuku));
}
console.log('\nYHTEENVETO', JSON.stringify(tulokset), 'virheet', virheet.length ? virheet.join(' | ') : 0);
await selain.close();
palvelin.close();
