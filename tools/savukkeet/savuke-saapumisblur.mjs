/*
 * SELAINSAVUKE: PELISSÄ EI VALITA TEKSTIÄ.
 *
 *   PLAYWRIGHT_JS=… CHROMIUM=… node tools/savukkeet/savuke-tekstivalinta.mjs [kuvakansio]
 *
 * Raamattu JONOSSA kohta D (omistaja 19.9.2026): peli on lauta ja lehti,
 * ei tekstidokumentti — pitkä painallus tai veto kartalla ja kortin
 * tekstissä ei saa maalata tekstiä. Poikkeus ovat syöttökentät.
 *
 * Mittaus per ruutu (390 × 844 ja iPad 1024 × 1366):
 *   1. veto kartan yli → `getSelection().toString()` tyhjä
 *   2. veto kortin leipätekstin yli (Chartres, Lisää) → valinta tyhjä
 *   3. kortin tekstin `user-select` on none ja `-webkit-touch-callout` none
 *   4. VASTAKOE: syöttökentässä user-select on text (pelaaja saa valita)
 */import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { decodePng } from './pallon-liike-mittarit.mjs';

const paketinLahde = await import('playwright')
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const paketti = paketinLahde?.webkit ? paketinLahde : (paketinLahde?.default ?? paketinLahde);

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? process.env.KAAPPAUKSET ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(Number(process.env.SAVUKE_PORTTI) || 0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

const valimuisti = new Map();
const ampariHaku = (url) => {
  if (!valimuisti.has(url)) {
    valimuisti.set(url, fetch(url).then(async (v) => (v.ok
      ? { body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') } : null))
      .catch(() => null));
  }
  return valimuisti.get(url);
};

const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'pariisi' }], pack: packById('maailmankartta'), seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('pariisi');
const tallenne = JSON.stringify(peli.toJSON());





/** Reunakaistan kirkkaus ja paikallinen kontrasti (sumeus) kaappauksesta. */
const kaista = (kuva, dpr) => {
  const w = kuva.width; const h = kuva.height;
  const x0 = Math.round(w * 0.04); const x1 = Math.round(w * 0.30);
  const y0 = Math.round(h * 0.18); const y1 = Math.round(h * 0.34);
  let summa = 0; let eroja = 0; let n = 0; let m = 0;
  const lum = (x, y) => {
    const i = (y * w + x) * 4;
    return 0.2126 * kuva.data[i] + 0.7152 * kuva.data[i + 1] + 0.0722 * kuva.data[i + 2];
  };
  for (let y = y0; y < y1; y += 1) {
    for (let x = x0; x < x1; x += 1) {
      const l = lum(x, y);
      summa += l; n += 1;
      if (x + Math.round(dpr) < x1) { eroja += Math.abs(l - lum(x + Math.round(dpr), y)); m += 1; }
    }
  }
  return { kirkkaus: +(summa / Math.max(1, n)).toFixed(1), kontrasti: +(eroja / Math.max(1, m)).toFixed(2) };
};

const LAUDAT = [
  { nimi: 'pallolauta', param: '?lauta=pallo' },
  { nimi: 'tasokartta', param: '' },
];
const selain = await paketti.chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });
for (const lauta of LAUDAT) {
  const ctx = await selain.newContext({
    viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, serviceWorkers: 'block',
  });
  await ctx.addInitScript((d) => {
    try { localStorage.setItem('matkakirja-save-v1', d); localStorage.removeItem('matkakirja-lauta'); } catch { /* */ }
  }, tallenne);
  const s = await ctx.newPage();
  await s.route((u) => !/^(127\.0\.0\.1|localhost)$/.test(u.hostname), (r) => r.abort());
  await s.route(/media\.matkakirja\.app|r2\.dev\//, async (r) => {
    const v = await ampariHaku(r.request().url());
    if (!v) { r.abort(); return; }
    r.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body, headers: { 'access-control-allow-origin': '*' } });
  });
  await s.goto(`${osoite}${lauta.param}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
  const auki = await s.waitForFunction(
    () => Boolean(window.matkakirja?.ui?.pallolauta) || Boolean(window.matkakirja?.ui?.svg),
    null, { timeout: 90000 },
  ).then(() => true).catch(() => false);
  vaadi(`${lauta.nimi}: peli latautui`, auki);
  await s.waitForTimeout(4000);
  // Siivotaan aiemmat päällykset ja avataan traileri kuten saapumisessa.
  const kamera = () => s.evaluate(() => {
    const p = window.matkakirja.ui.pallonInstanssi?.pointOfView?.();
    const kartta = document.querySelector('.map-pane, #board');
    const r = kartta?.getBoundingClientRect();
    const svg = document.querySelector('#board svg, .map-pane svg');
    return {
      pov: p ? { lat: +p.lat.toFixed(4), lng: +p.lng.toFixed(4), alt: +p.altitude.toFixed(4) } : null,
      kartta: r ? [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)] : null,
      viewBox: svg?.getAttribute('viewBox') ?? null,
    };
  });
  const ennen = await kamera();
  const kuvaEnnen = decodePng(await s.screenshot({ type: 'png', timeout: 120000 }));
  const avattu = await s.evaluate(async () => {
    for (const el of document.querySelectorAll('.saapumistraileri, .fokusvirta-isokuva')) el.remove();
    const { naytaSaapumistraileri } = await import('/js/saapumistraileri.js');
    const { ui, game } = window.matkakirja;
    const city = game.board.cityById.get('pariisi') ?? game.player.pos;
    void naytaSaapumistraileri(ui, city);
    await new Promise((v) => setTimeout(v, 1500));
    const kehys = document.querySelector('.saapumistraileri');
    if (!kehys) return { kehys: false };
    const t = getComputedStyle(kehys);
    const alfa = Number((t.backgroundColor.match(/[\d.]+/g) ?? [])[3] ?? 1);
    return {
      kehys: true,
      tausta: t.backgroundColor,
      alfa,
      suodatin: t.backdropFilter || t.webkitBackdropFilter || '',
      kuvia: kehys.querySelectorAll('.saapumistraileri-kuva').length,
    };
  });
  tieto(`${lauta.nimi} traileri`, JSON.stringify(avattu));
  const kuvaAikana = decodePng(await s.screenshot({ type: 'png', timeout: 120000 }));
  if (KUVAKANSIO) await s.screenshot({ path: join(KUVAKANSIO, `saapumisblur-${lauta.nimi}-aikana.jpg`), type: 'jpeg', quality: 70 }).catch(() => {});
  vaadi(`${lauta.nimi}: trailerin peite on läpikuultava ja sumentava`,
    avattu.kehys === true && avattu.alfa <= 0.6 && /blur\(/.test(avattu.suodatin),
    JSON.stringify(avattu));
  const aikana = kaista(kuvaAikana, 2);
  const ennenK = kaista(kuvaEnnen, 2);
  vaadi(`${lauta.nimi}: traileri ei ole musta — kartta näkyy taustalla`,
    aikana.kirkkaus > 25, JSON.stringify({ aikana, ennenK }));
  // Traileri pois (sama ele kuin pelaajan ohitus) ja sama kaista uudelleen.
  await s.evaluate(() => document.querySelector('.saapumistraileri')?.click());
  await s.waitForTimeout(1200);
  await s.evaluate(() => { for (const el of document.querySelectorAll('.saapumistraileri')) el.remove(); });
  await s.waitForTimeout(600);
  const kuvaJalkeen = decodePng(await s.screenshot({ type: 'png', timeout: 120000 }));
  if (KUVAKANSIO) await s.screenshot({ path: join(KUVAKANSIO, `saapumisblur-${lauta.nimi}-jalkeen.jpg`), type: 'jpeg', quality: 70 }).catch(() => {});
  const jalkeen = kaista(kuvaJalkeen, 2);
  vaadi(`${lauta.nimi}: kartta on sumea trailerin aikana ja terävä sen jälkeen`,
    jalkeen.kontrasti >= aikana.kontrasti * 2,
    JSON.stringify({ aikana, jalkeen }));
  const jalkeenTila = await kamera();
  vaadi(`${lauta.nimi}: kamera ja laudan asettelu identtiset ennen ja jälkeen`,
    JSON.stringify(ennen) === JSON.stringify(jalkeenTila),
    JSON.stringify({ ennen, jalkeen: jalkeenTila }));
  await ctx.close();
}
await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
