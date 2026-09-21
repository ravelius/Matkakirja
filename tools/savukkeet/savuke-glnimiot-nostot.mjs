/*
 * SAVUKE: LADONNAN NOSTOT GL-KERROKSESSA (vaihe 3, Pelikoodari 21.9.2026).
 *
 * Avaa pallolaudan `?lauta=pallo` (GL on oletus; `?glnimiot=0` = CSS2D),
 * saapuu Marseilleen ja odottaa ladontaa. Sovitin vie nostot (ikoni +
 * nimiö) rungolle ja jättää CSS2D:hen vain ne, jotka eivät ole GL-
 * kelpoisia (ankkurit, liuskat, luonnokset, pisteet) tai joiden rasteri
 * on kesken. Vartiot:
 *   1. runko syntyi ja sovitin jakoi nostot: gl + css2d = ladotut;
 *   2. fonttien ja rasterien jälkeen DOMissa on täsmälleen CSS2D:hen
 *      jääneiden verran .pallolauta-nosto-elementtejä ja rungolla
 *      ikoni + nimiö jokaisesta GL-nostosta (instansseja ≥ 2 × gl);
 *   3. paikka: kaappaus kerros näkyvissä ja piilossa — jokaisen ikonin
 *      laatikossa (nostot.laatikot(), ruutupiste levossa) on mustetta;
 *   4. liike: panorointi rakentaa kerrosta enintään ladontojen tahdissa
 *      ja kehys pysyy alle 0,5 ms;
 *   5. pelinappula (vaihe 4): lepotilan nappula on rungolla, DOMissa ei
 *      CSS2D-nappulaa ja sovitin antaa sen laatikon ladonnan esteeksi;
 *   6. ei sivuvirheitä.
 *
 *   PLAYWRIGHT_JS=<playwright/index.js> node tools/savukkeet/savuke-glnimiot-nostot.mjs
 *       NAKYMA=puhelin|tyopoyta  ULOS=<kansio>
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { extname, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { decodePng } from './pallon-liike-mittarit.mjs';

const JUURI = process.env.JUURI ?? join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const { Game } = await import(`${JUURI}/js/game.js`);
const { packById } = await import(`${JUURI}/js/pack.js`);
const pw = await import('playwright').catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = pw.chromium ?? pw.default?.chromium;
const NAKYMA = process.env.NAKYMA ?? 'puhelin';
const ULOS = process.env.ULOS ?? '/tmp/matkakirja-kaappaukset/glnimiot-nostot';
mkdirSync(ULOS, { recursive: true });
const NAKYMAT = {
  puhelin: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  tyopoyta: { viewport: { width: 1400, height: 900 }, deviceScaleFactor: 2 },
};
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
const selain = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined, args: [] });
const virheet = [];
const ctx = await selain.newContext({ ...NAKYMAT[NAKYMA], serviceWorkers: 'block' });
await ctx.addInitScript((d) => { localStorage.setItem('matkakirja-save-v1', d); localStorage.removeItem('matkakirja-lauta'); }, JSON.stringify(peli.toJSON()));
const sivu = await ctx.newPage();
sivu.on('pageerror', (e) => virheet.push(String(e.message)));
sivu.on('console', (m) => { const t = m.text(); if (m.type() === 'error' && /THREE|shader|WebGL|glnimiot|rasteri/i.test(t)) virheet.push(t.slice(0, 600)); });
await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (r) => { const v = await ampari(r.request().url()); if (!v) { r.abort(); return; } r.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body, headers: { 'access-control-allow-origin': '*' } }); });
await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
await sivu.route(/wikimedia\.org/, (r) => r.abort());
await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 90000 });
await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
await sivu.waitForTimeout(2500);
await sivu.evaluate(() => { setInterval(() => { const ui = window.matkakirja?.ui; const n = ui?.ohitaNappi?.isConnected ? ui.ohitaNappi : document.querySelector('.fokusvirta-ohitanappi'); if (n) n.click(); }, 150); });
await sivu.waitForTimeout(2500);
await sivu.evaluate(() => window.matkakirja.ui.pallolauta.saavu?.({ kesto: 0 }));
await sivu.waitForTimeout(1500);
await sivu.evaluate((p) => { window.matkakirja.ui.pallolauta.heraa?.(); window.matkakirja.ui.pallonInstanssi.pointOfView(p, 0); }, { lat: 46.5, lng: 2.5, altitude: 0.2 });
await sivu.waitForTimeout(6000);

const tulos = { nakyma: NAKYMA, vartiot: [] };
const vartio = (nimi, ok, tieto) => { tulos.vartiot.push({ nimi, ok: Boolean(ok), tieto }); console.log(`${ok ? '✓' : '✗'} ${nimi} ${tieto ?? ''}`); };
const lueTila = () => sivu.evaluate(() => {
  const ui = window.matkakirja.ui; const l = ui.pallolauta;
  const k = ui.pallolautaGL?.();
  const s = l.glSovitin?.();
  const t = s?.tila?.() ?? null;
  return {
    kerros: k?.mittarit?.() ?? null,
    sovitin: t,
    ladottu: s?.viimeisetNostot?.().length ?? null,
    dom: [...document.querySelectorAll('.pallolauta-nosto')].filter((e) => !e.classList.contains('pallolauta-poistuu')).length,
    // Vaihe 4: lepotilan nappula rungolla (CSS2D-nappulaa ei DOMissa), liikkuva nappula on pelin omaa DOMia.
    nappulaDom: document.querySelectorAll('.pallolauta-nappula:not(.pallolauta-liikkuva)').length,
    nappulaRungolla: Boolean(s?.onRungolla?.('nappula')),
    nappulanLaatikoita: s?.pelinLaatikot?.().length ?? 0,
    fontit: document.fonts?.status ?? 'n/a',
  };
});
// Fontit ja rasterit valmiiksi: jako uudestaan, kunnes CSS2D:hen ei jää mitään.
await sivu.waitForFunction(() => document.fonts?.status === 'loaded', null, { timeout: 15000 }).catch(() => {});
await sivu.waitForFunction(() => {
  const l = window.matkakirja.ui.pallolauta; const s = l.glSovitin?.(); const t = s?.tila?.();
  if (!t || !(t.nostojakoja > 0) || !(t.nostotGl > 0)) return false;
  // CSS2D:hen saa jäädä vain ei-kelpoisia (ankkuri, liuska, luonnos, piste), ei kesken olevia.
  const dom = [...document.querySelectorAll('.pallolauta-nosto')].filter((e) => !e.classList.contains('pallolauta-poistuu')).length;
  return dom === t.nostotCss2d;
}, null, { timeout: 20000 }).catch(() => {});
await sivu.waitForTimeout(600);
const t1 = await lueTila();
tulos.tila = t1;
vartio('runko syntyi ja sovitin jakoi nostot', t1.kerros?.tila === 'valmis' && t1.sovitin?.nostojakoja > 0, JSON.stringify({ kerros: t1.kerros?.tila, nostojakoja: t1.sovitin?.nostojakoja }));
vartio('gl + css2d = ladotut nostot', t1.sovitin && t1.ladottu != null && t1.sovitin.nostotGl + t1.sovitin.nostotCss2d === t1.ladottu && t1.sovitin.nostotGl > 0,
  `gl ${t1.sovitin?.nostotGl}, css2d ${t1.sovitin?.nostotCss2d}, ladottu ${t1.ladottu}`);
vartio('nappula rungolla, ei CSS2D-nappulaa, laatikko ladonnan esteeksi', t1.nappulaRungolla && t1.nappulaDom === 0 && t1.nappulanLaatikoita === 1,
  `rungolla ${t1.nappulaRungolla}, DOM ${t1.nappulaDom}, laatikoita ${t1.nappulanLaatikoita}`);
vartio('DOMissa vain CSS2D:hen jääneet; rungolla ikoni + nimiö', t1.dom === t1.sovitin?.nostotCss2d && t1.kerros?.instansseja >= 2 * t1.sovitin?.nostotGl,
  `DOM ${t1.dom}, css2d ${t1.sovitin?.nostotCss2d}, instansseja ${t1.kerros?.instansseja}, gl ${t1.sovitin?.nostotGl}, fontit ${t1.fontit}`);

// 3. Paikka: kaappaus kerros näkyvissä ja piilossa, erot ladonnan laatikoissa.
// Laatat tarkkaan laatuun ennen vertailua, ettei laatan tarkentuminen näy erona.
await sivu.waitForFunction(async () => {
  const m = await import('/js/laattapyramidi.js');
  return Boolean(m.pyramidinTasoitus()?.suoja?.tarkka);
}, null, { timeout: 60000 }).catch(() => {});
await sivu.waitForTimeout(2500);
const odotetut = await sivu.evaluate(() => {
  const ui = window.matkakirja.ui; const p = ui.pallonInstanssi; const pov = p.pointOfView();
  const r = p.renderer(); let W = 0; let H = 0; r.getSize({ set(a, b) { W = a; H = b; } });
  const kam = p.camera();
  // Ikonien laatikot kotelon pikseleinä (nostot.laatikot(): kiinteä muste levossa).
  const koti = ui.pallolauta.kotelo.getBoundingClientRect();
  const laatikot = ui.pallolauta.nostot.laatikot().map((b, i) => ({ id: String(i), x0: koti.left + b.x0, y0: koti.top + b.y0, x1: koti.left + b.x1, y1: koti.top + b.y1 }));
  return { pov, W, H, fov: kam.fov, kuvasuhde: kam.aspect, sade: p.getGlobeRadius(), suhde: r.getPixelRatio(), laatikot };
});
// Kelluvat kortit ja kirjoittuva teksti pois vertailusta (kuten savuke-glnimiot.mjs).
await sivu.addStyleTag({ content: '.fokusvirta-kortti, .fokusvirta-isokuva, .fokusvirta-kupla, .fokusvirta-lentokerros, .saapumistraileri, .fokusnosto-kerros, .fokuskohde-popup, .pollo, .pulu, .kartuutsi { visibility: hidden !important; }' });
await sivu.waitForTimeout(300);
const kaappausGL = await sivu.screenshot({ type: 'png' });
writeFileSync(join(ULOS, `glnimiot-nostot-${NAKYMA}-paalla.png`), kaappausGL);
await sivu.evaluate(() => window.matkakirja.ui.pallolautaGL().nakyvyys(false));
await sivu.waitForTimeout(150);
const kaappausIlman = await sivu.screenshot({ type: 'png' });
writeFileSync(join(ULOS, `glnimiot-nostot-${NAKYMA}-ilman.png`), kaappausIlman);
await sivu.evaluate(() => window.matkakirja.ui.pallolautaGL().nakyvyys(true));
await sivu.waitForTimeout(150);
// Kolmas kaappaus kerros taas näkyvissä: vain VAKAAT erot lasketaan (laatta
// tai lepokerros voi vaihtua kaappausten välissä; se ei ole nimiön ero).
const kaappausGL3 = await sivu.screenshot({ type: 'png' });
{
  const a = decodePng(kaappausGL); const b = decodePng(kaappausIlman); const c = decodePng(kaappausGL3);
  const W = a.width; const H = a.height;
  const s = odotetut.suhde;
  const vara = 3 * s;
  const laatikot = odotetut.laatikot.map((l) => {
    const r = { id: l.id, x0: l.x0 * s - vara, x1: l.x1 * s + vara, y0: l.y0 * s - vara, y1: l.y1 * s + vara };
    r.x0 = Math.max(0, r.x0); r.y0 = Math.max(0, r.y0); r.x1 = Math.min(W - 1, r.x1); r.y1 = Math.min(H - 1, r.y1);
    return r.x1 - r.x0 > 4 * s && r.y1 - r.y0 > 4 * s ? r : null;
  }).filter(Boolean);
  let sisalla = 0; let ulkona = 0;
  const peitto = laatikot.map(() => 0);
  for (let y = 0; y < H; y += 1) for (let x = 0; x < W; x += 1) {
    const i = (y * W + x) * 4;
    const d = Math.abs(a.data[i] - b.data[i]) + Math.abs(a.data[i + 1] - b.data[i + 1]) + Math.abs(a.data[i + 2] - b.data[i + 2]);
    if (d < 40) continue;
    const vakaa = Math.abs(a.data[i] - c.data[i]) + Math.abs(a.data[i + 1] - c.data[i + 1]) + Math.abs(a.data[i + 2] - c.data[i + 2]) < 40;
    if (!vakaa) continue;
    const j = laatikot.findIndex((l) => x >= l.x0 && x <= l.x1 && y >= l.y0 && y <= l.y1);
    if (j >= 0) { sisalla += 1; peitto[j] += 1; } else ulkona += 1;
  }
  const osuus = sisalla / Math.max(1, sisalla + ulkona);
  // Lähes jokaisen ikonin laatikossa on mustetta (≥ 2 % alasta: viivapiirros);
  // nimiöt ovat ikonin kyljessä laatikon ulkopuolella, joten ulkona-lukua ei tuomita.
  const osuudet = laatikot.map((l, j) => +(peitto[j] / Math.max(1, (l.x1 - l.x0) * (l.y1 - l.y0))).toFixed(3));
  const osuvat = osuudet.filter((o) => o >= 0.02).length;
  tulos.erot = { sisalla, ulkona, osuus: +osuus.toFixed(3), laatikoita: laatikot.length, osuudet };
  vartio('ikonit omissa laatikoissaan (≥ 90 % laatikoista)', laatikot.length >= 10 && osuvat >= 0.9 * laatikot.length,
    `${osuvat}/${laatikot.length} laatikossa mustetta; sisällä ${sisalla}, ulkona ${ulkona}`);
}

// 4. Liike: panorointi ei rakenna kerrosta uudestaan kesken liikkeen; kehys halpa.
const liike = await sivu.evaluate(async () => {
  const p = window.matkakirja.ui.pallonInstanssi; const k = window.matkakirja.ui.pallolautaGL();
  const alku = k.mittarit();
  let n = 0; let ms = 0;
  const alkuperainen = k.kehys; k.kehys = (m) => { const a = performance.now(); alkuperainen.call(k, m); ms += performance.now() - a; n += 1; };
  p.pointOfView({ lat: 47.2, lng: 3.2, altitude: 0.2 }, 1200);
  await new Promise((r) => setTimeout(r, 1000));
  const kesken = k.mittarit();
  await new Promise((r) => setTimeout(r, 1500));
  k.kehys = alkuperainen;
  return { n, ka: ms / Math.max(1, n), alku, kesken, loppu: k.mittarit() };
});
tulos.liike = liike;
vartio('kehys alle 0,5 ms liikkeessä', liike.ka < 0.5, `${liike.ka.toFixed(3)} ms × ${liike.n}`);
// Ladonta kulkee liikkeen mukana enintään kerran 200 ms:ssä (lauta.js LADONNAN_TAHTI_MS),
// ja jokainen ladonta on yksi jako → yksi rakennus; enempää ei saa syntyä.
vartio('rakennuksia liikkeessä enintään ladontojen verran', liike.kesken.rakennuksia - liike.alku.rakennuksia <= 1 + Math.ceil(1000 / 200), `${liike.alku.rakennuksia} → ${liike.kesken.rakennuksia} (levon jälkeen ${liike.loppu.rakennuksia})`);
tulos.virheet = virheet;
vartio('ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 2).join(' | '));
writeFileSync(join(ULOS, `glnimiot-nostot-${NAKYMA}.json`), JSON.stringify(tulos, null, 1));
await ctx.close();
await selain.close(); palvelin.close();
const kaatui = tulos.vartiot.filter((v) => !v.ok).length;
console.log(`glnimiot-nostot ${NAKYMA}: ${tulos.vartiot.length - kaatui}/${tulos.vartiot.length}`);
process.exit(kaatui ? 1 : 0);
