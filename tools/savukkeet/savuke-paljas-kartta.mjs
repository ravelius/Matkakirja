/*
 * SAVUKE: PALJAS KARTTA JA KERROKSET-KYTKIMET (Syötekoe 5, omistaja
 * 23.9.2026 klo 09.20 ja 09.25). Valinta laitteen muistissa kuten valikosta.
 * Joka tilasta mitataan ryhmien tunnusluvut:
 *   muuDc     piirtokutsut ilman laattoja (laatat hetkeksi piiloon, yksi
 *             render): nimiöt, symbolit, runko, ilmakehä ja pohja
 *   dom       näkyvät sivun elementit kartan päällä (kangas, kehysprofiili,
 *             ratasvalikko, pulu ja pieni liike eivät lasketa)
 *   pulu, liike, lepo, ilmakehä, häive, äänet  — päällä vai ei
 *   K1 paljas: dom 0, kaikki ryhmät pois
 *   K2 paljas: valikkonappi näkyy ja avaa valikon (paluu tilasta)
 *   K3 paljas: tilarivi "koe 5/8 Paljas kartta"; kytkimen kanssa "+lyhenne"
 *   K4 vastakoe normaali: ryhmät päällä (pulun nappi on tässä näkymässä
 *      normaalistikin piilossa, joten sitä ei vaadita)
 *   K5 jokainen kytkin yksin päällä muuttaa vain oman ryhmänsä
 *   K8 pikavalinta 6 "Paljas + nimiöt" = paljas + nimiöt-ryhmä
 *   K7 valikon kytkimen napautus lataa sivun ja tuo ryhmän ("+nimiöt")
 *   K6 ei sivuvirheitä
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

const mittaa = (sivu) => sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  const pallo = ui.pallonInstanssi;
  const kotelo = ui.pallolauta.kotelo;
  const r = pallo.renderer();
  await new Promise((ok) => requestAnimationFrame(() => requestAnimationFrame(ok)));
  const dc = r.info.render.calls;
  // Muut kuin laattojen piirtokutsut tarkasti: laatat (userData.laattakerros) hetkeksi piiloon, yksi render.
  const piilotetut = [];
  pallo.scene().traverse((o) => { if (o.userData?.laattakerros && o.visible) { o.visible = false; piilotetut.push(o); } });
  r.render(pallo.scene(), pallo.camera());
  const muuDc = r.info.render.calls;
  for (const o of piilotetut) o.visible = true;
  const kangas = r.domElement;
  const alue = kotelo.getBoundingClientRect();
  const nakyy = (el) => {
    if (!el) return false;
    const cs = getComputedStyle(el); const b = el.getBoundingClientRect();
    return cs.visibility === 'visible' && cs.display !== 'none' && Number(cs.opacity) > 0 && b.width >= 1 && b.height >= 1;
  };
  const omat = '.profiilinaytto, #menu-btn, #paavalikko, .pollo-nappi, .pollo-paneeli, .pollo-kuplapino-kehys, .pallolauta-liike';
  const dom = [...document.body.querySelectorAll('*')].filter((el) => {
    if (el === kangas || el.contains(kangas) || el.closest(omat)) return false;
    if (!nakyy(el)) return false;
    const b = el.getBoundingClientRect();
    return b.right > alue.left && b.left < alue.right && b.bottom > alue.top && b.top < alue.bottom;
  });
  const { laattakerroksenKokeet } = await import('/js/pallolaatat.js');
  const nappi = document.getElementById('menu-btn');
  return {
    muuDc, dc, dom: dom.length, esim: dom.slice(0, 3).map((el) => `${el.tagName.toLowerCase()}.${[...el.classList].slice(0, 2).join('.')}`),
    pulu: nakyy(document.querySelector('.pollo-nappi')),
    liike: nakyy(document.querySelector('.pallolauta-liike')),
    lepo: Boolean(pallo.__piirto?.tila?.()?.paalla),
    // Kuori näkyy vain kaukaa (ilmakehän vahti), joten ryhmä luetaan lipuista.
    ilmakeha: !laattakerroksenKokeet().has('eiilmakeha') && !laattakerroksenKokeet().has('eipohja'),
    haive: !laattakerroksenKokeet().has('eihaive'),
    aanet: (await import('/js/pallolauta/kerrokset.js')).kerrosKaytossa('aanet'),
    nappi: nakyy(nappi),
    rivi: document.querySelector('.profiilinaytto > div')?.textContent ?? '',
  };
});
const RYHMAT = ['nimiot', 'symbolit', 'runko', 'ilmakeha', 'haive', 'lepo', 'pulu', 'dom', 'aanet'];
const tulos = {};
const virheet = [];
const tila = async (nimi, muisti) => {
  const { ctx, sivu, virheet: v } = await avaa('', { 'matkakirja-kehysprofiili': '1', ...muisti });
  await sivu.waitForTimeout(4500);
  await ylinRivi(sivu);
  tulos[nimi] = await mittaa(sivu);
  tieto(nimi, JSON.stringify({ ...tulos[nimi], rivi: undefined, esim: tulos[nimi].esim.join(',') }));
  if (nimi === 'paljas') {
    await sivu.click('#menu-btn');
    tulos.valikko = await sivu.evaluate(() => {
      const m = document.getElementById('paavalikko');
      const k = document.getElementById('paljaat-kerrokset-valikko');
      return { auki: Boolean(m && !m.hidden && getComputedStyle(m).visibility === 'visible'), kytkimia: k && !k.hidden ? k.querySelectorAll('button').length : 0 };
    });
    // K7: kytkimen napautus → "Ladataan…" → lataus → tilarivi "+nimiöt".
    const lataus = sivu.waitForEvent('load', { timeout: 15000 }).then(() => true).catch(() => false);
    await sivu.click('#paljaat-kerrokset-valikko button[data-paljas-kerros="nimiot"]');
    const ladattu = await lataus;
    await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 }).catch(() => {});
    tulos.napautus = { ladattu, rivi: await ylinRivi(sivu, '+nimiöt') };
  }
  virheet.push(...v);
  await ctx.close();
};
try {
  await tila('normaali', { 'matkakirja-piirtokoe': 'normaali' });
  await tila('paljas', { 'matkakirja-piirtokoe': 'paljas' });
  for (const r of RYHMAT) await tila(r, { 'matkakirja-piirtokoe': 'paljas', 'matkakirja-paljaat-kerrokset': r });
  // Pikavalinta 6 = paljas + nimiöt.
  await tila('paljasnimet', { 'matkakirja-piirtokoe': 'paljasnimet' });
} finally {
  await selain.close();
  palvelin.close();
}
const P = tulos.paljas; const N = tulos.normaali;
vaadi('K1 paljas: dom 0, kaikki ryhmät pois', P.dom === 0 && !P.pulu && !P.liike && !P.lepo && !P.ilmakeha && !P.haive && !P.aanet, JSON.stringify(P));
vaadi('K2 paljas: valikkonappi näkyy ja avaa valikon, 9 kytkintä', P.nappi && tulos.valikko?.auki && tulos.valikko?.kytkimia === RYHMAT.length, JSON.stringify(tulos.valikko));
vaadi('K3 tilarivi', /^koe 5\/8 Paljas kartta · profiili p\d+/.test(P.rivi) && /^koe 5\/8 Paljas kartta \+nimiöt · /.test(tulos.nimiot.rivi), `${P.rivi} | ${tulos.nimiot.rivi}`);
vaadi('K4 vastakoe normaali: ryhmät päällä', N.muuDc > P.muuDc + 5 && N.dom > 5 && N.liike && N.lepo && N.haive && N.ilmakeha, JSON.stringify(N));
/* Oma muutos ja muiden pysyvyys. Piirtokutsut: +1 riittää omaksi muutokseksi, ±1 on sama. */
const omaMuutos = {
  nimiot: (t) => t.muuDc > P.muuDc, symbolit: (t) => t.muuDc > P.muuDc, runko: (t) => t.muuDc > P.muuDc + 3,
  ilmakeha: (t) => t.ilmakeha, haive: (t) => t.haive, lepo: (t) => t.lepo, pulu: (t) => t.pulu && t.liike, dom: (t) => t.dom > 5, aanet: (t) => t.aanet,
};
const dcRyhmat = new Set(['nimiot', 'symbolit', 'runko', 'ilmakeha']);
// Ilmakehä ja pohja: pohja on piilossa aina kun laatat peittävät, joten muuDc voi pysyä.
const rikkeet = [];
for (const r of RYHMAT) {
  const t = tulos[r];
  if (!omaMuutos[r](t)) rikkeet.push(`${r}: oma ryhmä ei muuttunut`);
  // Pulu-ryhmä tuo myös pienen liikkeen.
  for (const k of ['pulu', 'liike', 'lepo', 'ilmakeha', 'haive', 'aanet']) if (k !== r && !(r === 'pulu' && k === 'liike') && t[k] !== P[k]) rikkeet.push(`${r}: myös ${k}`);
  if (r !== 'dom' && t.dom !== 0) rikkeet.push(`${r}: dom ${t.dom} (${t.esim.join(',')})`);
  if (!dcRyhmat.has(r) && Math.abs(t.muuDc - P.muuDc) > 1) rikkeet.push(`${r}: muuDc ${t.muuDc} vs ${P.muuDc}`);
}
vaadi('K5 jokainen kytkin muuttaa vain oman ryhmänsä', rikkeet.length === 0, rikkeet.join(' · '));
vaadi('K8 pikavalinta Paljas + nimiöt = paljas + nimiöt-ryhmä', tulos.paljasnimet.muuDc === tulos.nimiot.muuDc && tulos.paljasnimet.dom === 0 && /^koe 6\/8 Paljas \+ nimiöt · /.test(tulos.paljasnimet.rivi), JSON.stringify({ pika: tulos.paljasnimet.muuDc, ryhma: tulos.nimiot.muuDc, rivi: tulos.paljasnimet.rivi }));
vaadi('K7 kytkimen napautus lataa sivun ja tuo ryhmän', tulos.napautus?.ladattu && /^koe 5\/8 Paljas kartta \+nimiöt/.test(tulos.napautus?.rivi ?? ''), JSON.stringify(tulos.napautus));
vaadi('K6 ei sivuvirheitä', virheet.length === 0, virheet.join(' | '));
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
