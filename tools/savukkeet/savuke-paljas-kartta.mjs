/*
 * SAVUKE: PALJAS KARTTA (Syötekoe 5–8, omistaja 23.9.2026 klo 09.20:
 * "riisutaan kartalta kaikki ylimääräiset elementit ja katsotaan loppuuko
 * tökkiminen"). Sama näkymä normaalisti ja jokaisessa paljaassa tilassa
 * (valinta laitteen muistissa kuten valikosta):
 *   K1 paljas: piirtokutsuja enintään PALJAS_DC_MAX (vain laatat)
 *   K2 paljas: kartan päällä ei yhtään näkyvää sivun elementtiä
 *      (kangas, kehysprofiili ja ratasvalikon nappi sallittu)
 *   K3 paljas: valikkonappi näkyy ja avaa valikon (paluu tilasta)
 *   K4 paljas: lepopiirto pois (piirto joka rAF:ssa), tilarivi "koe 5/8 Paljas kartta"
 *   K5 vastakoe normaali: piirtokutsuja ja DOM-elementtejä selvästi enemmän
 *   K6 puolitus: nimiöt ja symbolit lisäävät piirtokutsuja, DOM-tila tuo
 *      elementit takaisin
 *   K7 ei sivuvirheitä
 * KÄYTTÖ: PLAYWRIGHT_JS=... SAVUKE_MOOTTORI=webkit node tools/savukkeet/savuke-paljas-kartta.mjs
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

const PALJAS_DC_MAX = 80;
const mittaa = (sivu) => sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  const kotelo = ui.pallolauta.kotelo;
  const r = ui.pallonInstanssi.renderer();
  // Kaksi kehystä, jotta viimeisin render on tältä tilalta.
  await new Promise((ok) => requestAnimationFrame(() => requestAnimationFrame(ok)));
  const dc = r.info.render.calls;
  const kangas = r.domElement;
  const alue = kotelo.getBoundingClientRect();
  const sallittu = (el) => el === kangas || el.closest('.profiilinaytto') || el.closest('#menu-btn') || el.closest('#paavalikko');
  const nakyvat = [...document.body.querySelectorAll('*')].filter((el) => {
    if (sallittu(el) || el.contains(kangas)) return false;
    const cs = getComputedStyle(el);
    if (cs.visibility !== 'visible' || cs.display === 'none' || Number(cs.opacity) === 0) return false;
    const b = el.getBoundingClientRect();
    if (b.width < 1 || b.height < 1) return false;
    return b.right > alue.left && b.left < alue.right && b.bottom > alue.top && b.top < alue.bottom;
  });
  const nappi = document.getElementById('menu-btn');
  const nb = nappi?.getBoundingClientRect();
  return {
    dc, dom: nakyvat.length, esim: nakyvat.slice(0, 4).map((el) => `${el.tagName.toLowerCase()}.${[...el.classList].slice(0, 2).join('.')}`),
    nappi: Boolean(nappi && getComputedStyle(nappi).visibility === 'visible' && nb.width > 0),
    lepo: ui.pallonInstanssi.__piirto?.tila?.()?.paalla ?? null,
    rivi: document.querySelector('.profiilinaytto > div')?.textContent ?? '',
  };
});
const tulos = {};
const virheet = [];
try {
  for (const koe of ['normaali', 'paljas', 'paljasnimet', 'paljassymbolit', 'paljasdom']) {
    const { ctx, sivu, virheet: v } = await avaa('', { 'matkakirja-piirtokoe': koe, 'matkakirja-kehysprofiili': '1' });
    await sivu.waitForTimeout(4500);
    await ylinRivi(sivu);
    tulos[koe] = await mittaa(sivu);
    tieto(koe, JSON.stringify(tulos[koe]));
    if (koe === 'paljas') {
      await sivu.click('#menu-btn');
      tulos.valikko = await sivu.evaluate(() => { const m = document.getElementById('paavalikko'); return Boolean(m && !m.hidden && getComputedStyle(m).visibility === 'visible'); });
    }
    virheet.push(...v);
    await ctx.close();
  }
} finally {
  await selain.close();
  palvelin.close();
}
const P = tulos.paljas; const N = tulos.normaali;
vaadi('K1 paljas: piirtokutsuja ≤ ' + PALJAS_DC_MAX, P.dc <= PALJAS_DC_MAX, `dc ${P.dc}`);
vaadi('K2 paljas: kartan päällä ei näkyviä sivun elementtejä', P.dom === 0, `${P.dom}: ${P.esim.join(', ')}`);
vaadi('K3 paljas: valikkonappi näkyy ja avaa valikon', P.nappi && tulos.valikko === true, JSON.stringify({ nappi: P.nappi, valikko: tulos.valikko }));
vaadi('K4 paljas: lepopiirto pois ja tilarivi', P.lepo !== true && /^koe 5\/8 Paljas kartta · profiili p\d+/.test(P.rivi), JSON.stringify({ lepo: P.lepo, rivi: P.rivi }));
vaadi('K5 vastakoe normaali: enemmän piirtokutsuja ja DOM-elementtejä', N.dc > P.dc && N.dom > 5, `normaali dc ${N.dc} dom ${N.dom}, paljas dc ${P.dc} dom ${P.dom}`);
vaadi('K6 puolitus: nimiöt ja symbolit lisäävät dc:tä, DOM-tila tuo elementit', tulos.paljasnimet.dc > P.dc && tulos.paljassymbolit.dc > P.dc && tulos.paljasdom.dom > 0 && tulos.paljasnimet.dom === 0 && tulos.paljassymbolit.dom === 0,
  ['paljasnimet', 'paljassymbolit', 'paljasdom'].map((k) => `${k} dc ${tulos[k].dc} dom ${tulos[k].dom}`).join(' · '));
vaadi('K7 ei sivuvirheitä', virheet.length === 0, virheet.join(' | '));
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
