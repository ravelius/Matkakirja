/*
 * SELAINSAVUKE: NOSTOKORTIN KUVASARJA KOSKETUKSELLA — PYSTYKUVA JA NUOLI.
 *
 *   PLAYWRIGHT_JS=… CHROMIUM=… node tools/savukkeet/savuke-nostokuva-karuselli.mjs [kuvakansio]
 *
 * Omistajan laitekuva 19.9.2026 klo 17.44 Suomen aikaa (iPhone, v1957,
 * Annonay/Montgolfier-nosto, kuva 2/2 pystykuva): kuva oli vasemmalla ja
 * oikealla ~25 % leveydeltä tummanruskea tyhjä paneeli. Juurisyy
 * (docs/raportit/viesti-fable-pystykuva-20260919.md): yleinen
 * `button:hover:not(:disabled) { background: #43331f }` (css/styles.css)
 * voitti nuolen oman `background: none` -säännön, ja iOS jättää :hoverin
 * päälle napautuksen jälkeen — seuraava-nuolen 24 %:n osuma-alue jäi
 * tummaksi kuvan päälle.
 *
 * Kosketuslaite (hasTouch, isMobile, 390 × 844 dpr 3), WebKit ja Chromium.
 * VÄITTEET per selain:
 *   1. seuraava-nuolen napautuksen jälkeen nuolen tausta on läpinäkyvä
 *      (alfa 0) — myös kun osoitin on yhä sen päällä;
 *   2. pystykuva on kehyksen keskellä ±2 px (object-fit: contain);
 *   3. kortin yläreuna on ruudun sisällä (≥ 0) eikä yläpalkin alla.
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketinLahde = await import('playwright')
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const paketti = paketinLahde?.webkit ? paketinLahde : (paketinLahde?.default ?? paketinLahde);

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? process.env.KAAPPAUKSET ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });
const NOSTO = 'maalehti-montgolfier';

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

for (const nimi of (process.env.SELAIMET ?? 'webkit,chromium').split(',')) {
  const selain = nimi === 'webkit'
    ? await paketti.webkit.launch()
    : await paketti.chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });
  const ctx = await selain.newContext({
    viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, hasTouch: true, isMobile: nimi !== 'webkit' ? true : undefined,
    serviceWorkers: 'block',
  });
  await ctx.addInitScript((d) => {
    try {
      localStorage.setItem('matkakirja-save-v1', d);
      localStorage.removeItem('matkakirja-lauta');
    } catch { /* yksityinen tila */ }
  }, tallenne);
  const s = await ctx.newPage();
  await s.route((u) => !/^(127\.0\.0\.1|localhost)$/.test(u.hostname), (r) => r.abort());
  await s.route(/media\.matkakirja\.app|r2\.dev\//, async (r) => {
    const v = await ampariHaku(r.request().url());
    if (!v) { r.abort(); return; }
    r.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body, headers: { 'access-control-allow-origin': '*' } });
  });
  await s.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 90000 });
  const auki = await s.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 })
    .then(() => true).catch(() => false);
  vaadi(`${nimi}: pallolauta aukesi`, auki);
  if (!auki) { await selain.close(); continue; }
  await s.waitForTimeout(3000);
  const avattu = await s.evaluate(async (id) => {
    for (const el of document.querySelectorAll('.saapumistraileri, .fokusvirta-isokuva')) el.remove();
    const { avaaNostonTunnuksella } = await import('/js/fokusnosto.js');
    const ok = avaaNostonTunnuksella(window.matkakirja.ui, id);
    await new Promise((v) => setTimeout(v, 600));
    document.querySelector('.fokusnosto-kortti .nostokuva-lisaa')?.click();
    await new Promise((v) => setTimeout(v, 800));
    return { ok, nuolia: document.querySelectorAll('.fokusnosto-kortti .nostosarja-kuvanuoli').length };
  }, NOSTO);
  tieto(`${nimi}: kortti`, JSON.stringify(avattu));
  const nuoli = s.locator('.fokusnosto-kortti .nostosarja-kuvanuoli.seuraava').first();
  await nuoli.tap({ timeout: 10000 }).catch(() => {});
  // Kuvan lataus ja ladonta.
  await s.waitForFunction(() => {
    const img = document.querySelector('.fokusnosto-kortti .nostokuva-img, .fokusnosto-kortti .fokusnosto-kuvanappi img');
    return img?.complete && img.naturalWidth > 0;
  }, null, { timeout: 15000 }).catch(() => {});
  await s.waitForTimeout(600);
  const mitat = await s.evaluate(() => {
    const k = document.querySelector('.fokusnosto-kortti');
    const nuoli = k?.querySelector('.nostosarja-kuvanuoli.seuraava');
    const img = k?.querySelector('.nostokuva-img, .fokusnosto-kuvanappi img');
    const kehys = img?.parentElement;
    const tausta = nuoli ? getComputedStyle(nuoli).backgroundColor : null;
    const alfa = (() => {
      const m = /rgba?\(([^)]+)\)/.exec(tausta ?? '');
      if (!m) return tausta === 'transparent' ? 0 : null;
      const osat = m[1].split(',').map((x) => Number(x.trim()));
      return osat.length === 4 ? osat[3] : 1;
    })();
    const ib = img?.getBoundingClientRect();
    const kb = kehys?.getBoundingClientRect();
    // Näkyvä kuva-ala object-fit: contain -laatikon sisällä.
    let nakyva = null;
    if (img && ib && img.naturalWidth) {
      const s2 = Math.min(ib.width / img.naturalWidth, ib.height / img.naturalHeight);
      const w = img.naturalWidth * s2; const h = img.naturalHeight * s2;
      const fit = getComputedStyle(img).objectFit;
      const pos = getComputedStyle(img).objectPosition;
      nakyva = { w, h, fit, pos, keskiX: ib.left + ib.width / 2, keskiY: ib.top + ib.height / 2 };
    }
    return {
      laskuri: k?.querySelector('[class*="laskuri"]')?.textContent ?? null,
      tausta, alfa,
      hover: nuoli?.matches(':hover') ?? null,
      kuva: ib && { x: Math.round(ib.left), y: Math.round(ib.top), w: Math.round(ib.width), h: Math.round(ib.height), luonnollinen: [img.naturalWidth, img.naturalHeight] },
      kehys: kb && { x: Math.round(kb.left), y: Math.round(kb.top), w: Math.round(kb.width), h: Math.round(kb.height) },
      nakyva,
      kortinYla: k ? Math.round(k.getBoundingClientRect().top) : null,
    };
  });
  tieto(`${nimi}: mitat`, JSON.stringify(mitat));
  if (KUVAKANSIO) {
    await s.screenshot({ path: join(KUVAKANSIO, `nostokuva-karuselli-${nimi}-390.jpg`), type: 'jpeg', quality: 70 }).catch(() => {});
  }
  vaadi(`${nimi}: 1. seuraava-nuolen tausta on läpinäkyvä napautuksen jälkeen`,
    mitat.alfa === 0, `tausta ${mitat.tausta}, :hover ${mitat.hover}`);
  const kx = mitat.kehys ? mitat.kehys.x + mitat.kehys.w / 2 : NaN;
  const ix = mitat.kuva ? mitat.kuva.x + mitat.kuva.w / 2 : NaN;
  vaadi(`${nimi}: 2. kuva on kehyksen keskellä ±2 px (object-fit ${mitat.nakyva?.fit}, ${mitat.nakyva?.pos})`,
    Math.abs(kx - ix) <= 2 && mitat.nakyva?.fit === 'contain' && /50%\s+50%|center/.test(mitat.nakyva?.pos ?? ''),
    `kehyksen keski ${kx}, kuvan keski ${ix}, ${JSON.stringify(mitat.nakyva)}`);
  vaadi(`${nimi}: 3. kortin yläreuna on ruudulla`, Number.isFinite(mitat.kortinYla) && mitat.kortinYla >= 0,
    `kortin yläreuna ${mitat.kortinYla}`);
  await selain.close();
}
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
