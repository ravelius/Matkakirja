/*
 * Savuke: NUMEROYMPYRÄT KOHDEKARTALLA (Bryssel ja Ljubljana, omistajan
 * päätös 20.9.2026: kohteet numeroituina ympyröinä ilman miniatyyrejä,
 * ei "Muut"-riviä liuskassa).
 *
 * Vartiot (Chromium, 390 × 844, kosketus):
 *   1. Nähtävyydet-näkymän kartalla on tasan yhtä monta numeroympyrää
 *      kuin kohteita, numerot 1…N järjestyksessä ja jokainen ympyrä on
 *      näkyvissä kartan kehyksen sisällä.
 *   2. Jokaisella ympyrällä on nimi alla (.kohde-nimi).
 *   3. Ympyrän napautus avaa kohteen kortin, jonka otsikossa lukee
 *      "Kohde N" tai, wiki-kohteilla, nimi (kortti aukeaa).
 *   4. Liuskassa ei ole "Muut"-riviä (kohteet eivät siirry liuskaan).
 *
 * Aja: NODE_USE_ENV_PROXY=1 NODE_PATH=<repon node_modules> \
 *      CHROMIUM=<chromium> node tools/savukkeet/savuke-numeroympyrat.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO) mkdirSync(KUVAKANSIO, { recursive: true });
const TYYPIT = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg' };
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : decodeURIComponent(req.url.split('?')[0]));
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://127.0.0.1:${palvelin.address().port}/`;

const { Game } = await import(new URL('../../js/game.js', import.meta.url));
const { packById } = await import(new URL('../../js/pack.js', import.meta.url));
const { KAUPUNKIKARTAT } = await import(new URL('../../js/packs/maakartat.js', import.meta.url));

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};

const selain = await chromium.launch({ executablePath: process.env.CHROMIUM });
for (const kaupunki of ['bryssel', 'ljubljana']) {
  const kohteita = KAUPUNKIKARTAT[kaupunki].kohteet.length;
  const peli = new Game({ players: [{ name: 'Fogg', color: '#c9a227', start: kaupunki }], pack: packById('maailmankartta'), seed: 5 });
  peli.phase = 'action'; peli.tokens.delete(kaupunki);
  const ctx = await selain.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true, serviceWorkers: 'block' });
  await ctx.addInitScript((d) => { localStorage.setItem('matkakirja-save-v1', d); localStorage.removeItem('matkakirja-lauta'); localStorage.setItem('matkakirja-kehittaja', '1'); }, JSON.stringify(peli.toJSON()));
  const sivu = await ctx.newPage();
  const virheet = [];
  sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
  await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
  await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (route) => {
    try { const v = await fetch(route.request().url()); route.fulfill({ status: v.status, contentType: v.headers.get('content-type') ?? 'application/octet-stream', body: Buffer.from(await v.arrayBuffer()), headers: { 'access-control-allow-origin': '*' } }); } catch { route.abort(); }
  });
  await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.pallolauta, null, { timeout: 90000 });
  await sivu.waitForTimeout(3000);
  await sivu.evaluate(async () => { const l = window.matkakirja.ui.pallolauta; await l.saavu({ kesto: 0 }); await new Promise((v) => setTimeout(v, 1400)); l.ladoHeti(); });
  const auki = await sivu.evaluate(async (id) => {
    const ui = window.matkakirja.ui;
    const kn = await import('/js/kaupunkinosto.js');
    kn.avaaNahtavyysnakyma(ui, ui.game.board.cityById.get(id));
    await new Promise((v) => setTimeout(v, 2500));
    return true;
  }, kaupunki);
  vaadi(`${kaupunki}: Nähtävyydet-näkymä aukesi`, auki);
  const ympyrat = await sivu.evaluate(() => [...document.querySelectorAll('.maakartta-piste.kohde-numeroympyra')].map((e) => {
    const r = e.getBoundingClientRect(); const kehys = e.closest('.kartta-kehys')?.getBoundingClientRect();
    return { teksti: e.querySelector('.kohde-numeroteksti')?.textContent, nimi: e.querySelector('.kohde-nimi')?.textContent, x: r.x, y: r.y, w: r.width, h: r.height,
      sisalla: kehys ? r.left >= kehys.left - 1 && r.right <= kehys.right + 1 && r.top >= kehys.top - 1 && r.bottom <= kehys.bottom + 1 : false };
  }));
  vaadi(`${kaupunki}: numeroympyriä ${kohteita} kpl`, ympyrat.length === kohteita, `löytyi ${ympyrat.length}`);
  vaadi(`${kaupunki}: numerot 1…${kohteita} järjestyksessä`, ympyrat.map((y) => y.teksti).join(',') === Array.from({ length: kohteita }, (_, i) => i + 1).join(','), ympyrat.map((y) => y.teksti).join(','));
  vaadi(`${kaupunki}: ympyrät ovat näkyvissä kartan kehyksessä`, ympyrat.every((y) => y.sisalla && y.w >= 20), JSON.stringify(ympyrat.filter((y) => !y.sisalla || y.w < 20)));
  vaadi(`${kaupunki}: jokaisella ympyrällä on nimi`, ympyrat.every((y) => (y.nimi ?? '').length > 2));
  if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, `numeroympyrat-${kaupunki}-390.png`) });
  // Napautus avaa kortin (kolmas kohde).
  const kolmas = ympyrat[2];
  await sivu.touchscreen.tap(kolmas.x + kolmas.w / 2, kolmas.y + kolmas.h / 2);
  await sivu.waitForTimeout(2500);
  const kortti = await sivu.evaluate(() => {
    const e = [...document.querySelectorAll('.nahtavyys-arkki, dialog[open]')].filter((x) => x.offsetParent !== null || x.open).pop();
    return e ? (e.innerText || '').replace(/\s+/g, ' ').slice(0, 120) : null;
  });
  vaadi(`${kaupunki}: kolmannen ympyrän napautus avaa kortin`, Boolean(kortti) && /Kohde 3|Oikeuspalatsi|Prešernin|Križanke|Tromostovje/.test(kortti), String(kortti));
  // Liuska: ei Muut-riviä.
  await sivu.evaluate(async () => { document.querySelectorAll('dialog[open]').forEach((d) => d.close?.()); });
  const rivit = await sivu.evaluate(async ([id, lat, lng]) => {
    const l = window.matkakirja.ui.pallolauta;
    l.nostot.suljeLiuska?.();
    l.pallo.pointOfView({ lat, lng, altitude: 0.25 }, 0);
    await new Promise((v) => setTimeout(v, 1500)); l.ladoHeti(); await new Promise((v) => setTimeout(v, 500));
    l.nostot.avaaLiuskaKaupungista(lat, lng, { id, nimi: id });
    await new Promise((v) => setTimeout(v, 900)); l.ladoHeti(); await new Promise((v) => setTimeout(v, 500));
    return (l.nostot.liuskanRivit?.() ?? []).map((r) => `${r.laji}:${r.nimi}`);
  }, [kaupunki, kaupunki === 'bryssel' ? 50.85 : 46.05, kaupunki === 'bryssel' ? 4.35 : 14.51]);
  vaadi(`${kaupunki}: liuskassa ei ole "Muut"-riviä`, rivit.length > 0 && !rivit.some((r) => /Muut/.test(r)), rivit.join(' / '));
  vaadi(`${kaupunki}: ei sivuvirheitä`, virheet.length === 0, virheet.join(' | '));
  await ctx.close();
}
await selain.close(); palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
