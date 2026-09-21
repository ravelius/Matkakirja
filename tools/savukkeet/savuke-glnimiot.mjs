/*
 * SAVUKE: GL-NIMIÖKERROKSEN RUNKO (vaihe 1, 21.9.2026).
 *
 * Avaa pallolaudan `?lauta=pallo&glnimiot=testi` (rungon testinimiöt;
 * `glnimiot=1` on ladonnan nimet sovittimen kautta, savuke-glnimiot-nimet.mjs), odottaa, että kerros syntyy
 * (kirjaston luokat scenestä) ja saa 40 testinimiötä, ja mittaa:
 *   1. kerros: instansseja 40, sivuja ≥ 1, drawcalls = sivut, rakennus < 20 ms;
 *   2. paikka: kaappaus kytkimen kanssa ja ilman — erot keskittyvät
 *      pinnanRuutupisteellä laskettujen maapisteiden viereen (nimiö
 *      ripustetaan ankkuristaan, joka on maapisteessä) eikä muualle;
 *   3. liike: kamera-ajon aikana kerroksen kehys < 0,5 ms (mitattu
 *      kehyskoukun kuuntelijasta), ei pitkiä tehtäviä kerroksesta.
 *
 *   PLAYWRIGHT_JS=<playwright/index.js> node tools/savukkeet/savuke-glnimiot.mjs
 *       NAKYMA=puhelin|tyopoyta  ULOS=<kansio>
 *
 * SwiftShader (ei GPU-lippuja): kaappaus näyttää WebGL-kankaan; GPU-
 * headlessissä kangas on kaappauksessa musta (muistiinpano gpu-headless-metal).
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { extname, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { decodePng } from './pallon-liike-mittarit.mjs';

const JUURI = process.env.JUURI ?? join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const { Game } = await import(`${JUURI}/js/game.js`);
const { packById } = await import(`${JUURI}/js/pack.js`);
const { pinnanRuutupiste } = await import(`${JUURI}/js/pallolaatat.js`);
const pw = await import('playwright').catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = pw.chromium ?? pw.default?.chromium;
const NAKYMA = process.env.NAKYMA ?? 'puhelin';
const ULOS = process.env.ULOS ?? '/tmp/matkakirja-kaappaukset/glnimiot';
mkdirSync(ULOS, { recursive: true });
const NAKYMAT = {
  puhelin: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  tyopoyta: { viewport: { width: 1400, height: 900 }, deviceScaleFactor: 2 },
};
const TYYPIT = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.geojson': 'application/json' };
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
const avaa = async (glnimiot) => {
  const ctx = await selain.newContext({ ...NAKYMAT[NAKYMA], serviceWorkers: 'block' });
  await ctx.addInitScript((d) => { localStorage.setItem('matkakirja-save-v1', d); localStorage.removeItem('matkakirja-lauta'); }, JSON.stringify(peli.toJSON()));
  const sivu = await ctx.newPage();
  sivu.on('pageerror', (e) => virheet.push(String(e.message)));
  sivu.on('console', (m) => { const t = m.text(); if (m.type() === 'error' && /THREE|shader|WebGL|glnimiot/i.test(t)) virheet.push(t.slice(0, 600)); });
  await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (r) => { const v = await ampari(r.request().url()); if (!v) { r.abort(); return; } r.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body, headers: { 'access-control-allow-origin': '*' } }); });
  await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
  await sivu.route(/wikimedia\.org/, (r) => r.abort());
  await sivu.goto(`${osoite}?lauta=pallo${glnimiot ? '&glnimiot=testi' : ''}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
  await sivu.waitForTimeout(2500);
  await sivu.evaluate(() => { setInterval(() => { const ui = window.matkakirja?.ui; const n = ui?.ohitaNappi?.isConnected ? ui.ohitaNappi : document.querySelector('.fokusvirta-ohitanappi'); if (n) n.click(); }, 150); });
  await sivu.waitForTimeout(2500);
  await sivu.evaluate(() => window.matkakirja.ui.pallolauta.saavu?.({ kesto: 0 }));
  await sivu.waitForTimeout(1500);
  await sivu.evaluate((p) => { window.matkakirja.ui.pallolauta.heraa?.(); window.matkakirja.ui.pallonInstanssi.pointOfView(p, 0); }, { lat: 46.5, lng: 2.5, altitude: 0.2 });
  await sivu.waitForTimeout(6000);
  return { ctx, sivu };
};

const tulos = { nakyma: NAKYMA, vartiot: [] };
const vartio = (nimi, ok, tieto) => { tulos.vartiot.push({ nimi, ok: Boolean(ok), tieto }); console.log(`${ok ? '✓' : '✗'} ${nimi} ${tieto ?? ''}`); };

// 1. Kerros päällä
const gl = await avaa(true);
const m = await gl.sivu.evaluate(() => window.matkakirja.ui.pallolautaGL?.()?.mittarit?.() ?? null);
vartio('kerros syntyi', m && m.tila === 'valmis', JSON.stringify(m));
vartio('instansseja 40', m?.instansseja === 40, m?.instansseja);
vartio('yksi drawcall per sivu', m && m.sivuja >= 1 && m.drawcalls === m.sivuja, `${m?.drawcalls}/${m?.sivuja}`);
vartio('rakennus alle 20 ms', m && m.rakennusMs / Math.max(1, m.rakennuksia) < 20, `${m?.rakennusMs?.toFixed?.(1)} ms / ${m?.rakennuksia}`);
const kaappausGL = await gl.sivu.screenshot({ type: 'png' });
writeFileSync(join(ULOS, `glnimiot-${NAKYMA}-paalla.png`), kaappausGL);
// Odotetut paikat: 40 lähintä kaupunkia samasta kaavasta kuin kerros.
const odotetut = await gl.sivu.evaluate(() => {
  const ui = window.matkakirja.ui; const p = ui.pallonInstanssi; const pov = p.pointOfView();
  const r = p.renderer(); let W = 0; let H = 0; r.getSize({ set(a, b) { W = a; H = b; } });
  const kam = p.camera();
  const kotelo = r.domElement.getBoundingClientRect();
  return { pov, W, H, fov: kam.fov, kuvasuhde: kam.aspect, sade: p.getGlobeRadius(), suhde: r.getPixelRatio(), vasen: kotelo.left, yla: kotelo.top };
});
const kehysMs = await gl.sivu.evaluate(async () => {
  const p = window.matkakirja.ui.pallonInstanssi; const k = window.matkakirja.ui.pallolautaGL();
  const alku = k.mittarit();
  const t0 = performance.now(); let n = 0; let ms = 0;
  const alkuperainen = k.kehys; k.kehys = (m) => { const a = performance.now(); alkuperainen.call(k, m); ms += performance.now() - a; n += 1; };
  p.pointOfView({ lat: 48.8, lng: 4.5, altitude: 0.1 }, 1500);
  await new Promise((r) => setTimeout(r, 1800));
  k.kehys = alkuperainen;
  return { n, ka: ms / Math.max(1, n), max: 0, kesto: performance.now() - t0, loppu: k.mittarit(), alku };
});
vartio('kehys alle 0,5 ms liikkeessä', kehysMs.ka < 0.5, `${kehysMs.ka.toFixed(3)} ms × ${kehysMs.n}`);
vartio('ei uusia rakennuksia liikkeessä', kehysMs.loppu.rakennuksia === kehysMs.alku.rakennuksia, `${kehysMs.alku.rakennuksia} → ${kehysMs.loppu.rakennuksia}`);
// 2. Vertailu SAMASTA sivusta kerros piilossa: erot ovat vain GL-nimiöitä,
//    ja niiden on osuttava maapisteiden viereen (ei uutta sivulatausta,
//    jotta CSS2D-ladonnan satunnaisuus ei sotke).
await gl.sivu.evaluate((p) => { window.matkakirja.ui.pallonInstanssi.pointOfView(p, 0); }, { lat: 46.5, lng: 2.5, altitude: 0.2 });
await gl.sivu.waitForTimeout(2500);
const kaappausGL2 = await gl.sivu.screenshot({ type: 'png' });
await gl.sivu.evaluate(() => window.matkakirja.ui.pallolautaGL().nakyvyys(false));
await gl.sivu.waitForTimeout(400);
const kaappausIlman = await gl.sivu.screenshot({ type: 'png' });
// CSS2D-elementtien laatikot (css-px) — ne elävät kaappausten välissä (Pelikoodarin
// E3-ladonta), joten niiden alue ohitetaan vertailussa.
const css2dLaatikot = await gl.sivu.evaluate(() => {
  const kangas = document.querySelector('.pallo-kotelo canvas, #board canvas, .map-pane canvas');
  const juuri = kangas?.parentElement ?? document.body;
  return [...juuri.querySelectorAll('div[style*="translate"]')].map((el) => { const r = el.getBoundingClientRect(); return [r.left, r.top, r.right, r.bottom]; }).filter((r) => r[2] > r[0] && r[3] > r[1]);
});
writeFileSync(join(ULOS, `glnimiot-${NAKYMA}-ilman.png`), kaappausIlman);
await gl.sivu.evaluate(() => window.matkakirja.ui.pallolautaGL().nakyvyys(true));
await gl.ctx.close();
{
  const a = decodePng(kaappausGL2); const b = decodePng(kaappausIlman);
  const W = a.width; const H = a.height;
  const { pack } = peli;
  const { pallonKaupungit } = await import(`${JUURI}/js/pallo.js`);
  const pov = odotetut.pov;
  const linssi = { fov: odotetut.fov, kuvasuhde: odotetut.kuvasuhde, sade: odotetut.sade };
  const lahimmat = pallonKaupungit(pack)
    .map((k) => ({ ...k, d: Math.hypot(k.lat - pov.lat, ((k.lon - pov.lng + 540) % 360 - 180) * Math.cos((pov.lat * Math.PI) / 180)) }))
    .sort((x, y) => x.d - y.d).slice(0, 40);
  const laatikot = lahimmat.map((k) => {
    const r = pinnanRuutupiste(pov, k.lat, k.lon, linssi);
    if (!r?.edessa) return null;
    // Kankaan koordinaatit → sivun kaappauksen koordinaatit (kotelon paikka sivulla).
    const kw = odotetut.W * odotetut.suhde; const kh = odotetut.H * odotetut.suhde;
    const x = odotetut.vasen * odotetut.suhde + ((r.sx + 1) / 2) * kw; const y = odotetut.yla * odotetut.suhde + ((1 - r.sy) / 2) * kh;
    // Testinimiö: ankkuri tekstin vasemmassa keskikohdassa, 12 px × dpr korkea, ≤ 12 merkkiä.
    return { nimi: k.n, x, y, x0: x - 3, x1: x + 12 * odotetut.suhde * 9, y0: y - 12 * odotetut.suhde, y1: y + 12 * odotetut.suhde };
  }).filter(Boolean);
  let sisalla = 0; let ulkona = 0;
  const s = odotetut.suhde; const marg = 6 * s;
  const css2d = css2dLaatikot.map(([l, t, r, b2]) => [l * s - marg, t * s - marg, r * s + marg, b2 * s + marg]);
  for (let y = 0; y < H; y += 1) for (let x = 0; x < W; x += 1) {
    const i = (y * W + x) * 4;
    const d = Math.abs(a.data[i] - b.data[i]) + Math.abs(a.data[i + 1] - b.data[i + 1]) + Math.abs(a.data[i + 2] - b.data[i + 2]);
    if (d < 40) continue;
    if (css2d.some((l) => x >= l[0] && x <= l[2] && y >= l[1] && y <= l[3])) continue;
    if (laatikot.some((l) => x >= l.x0 && x <= l.x1 && y >= l.y0 && y <= l.y1)) sisalla += 1; else ulkona += 1;
  }
  const osuus = sisalla / Math.max(1, sisalla + ulkona);
  // Missä ulkopuoliset erot ovat (40 px:n ruudukko, suurimmat solut) — vianhaku.
  const solut = new Map();
  for (let y = 0; y < H; y += 1) for (let x = 0; x < W; x += 1) {
    const i = (y * W + x) * 4;
    const d = Math.abs(a.data[i] - b.data[i]) + Math.abs(a.data[i + 1] - b.data[i + 1]) + Math.abs(a.data[i + 2] - b.data[i + 2]);
    if (d < 40) continue;
    if (laatikot.some((l) => x >= l.x0 && x <= l.x1 && y >= l.y0 && y <= l.y1)) continue;
    if (css2d.some((l) => x >= l[0] && x <= l[2] && y >= l[1] && y <= l[3])) continue;
    const k = `${Math.floor(x / 40) * 40},${Math.floor(y / 40) * 40}`; solut.set(k, (solut.get(k) ?? 0) + 1);
  }
  tulos.erot = { sisalla, ulkona, osuus: +osuus.toFixed(3), laatikoita: laatikot.length, css2dLaatikoita: css2dLaatikot.length, ulkosolut: [...solut].sort((p, q) => q[1] - p[1]).slice(0, 8), odotetut: laatikot.slice(0, 6).map((l) => `${l.nimi} ${l.x.toFixed(0)},${l.y.toFixed(0)}`) };
  vartio('nimiöt maapisteissään (erot laatikoissa ≥ 85 %)', sisalla > 200 && osuus >= 0.85, `sisällä ${sisalla}, ulkona ${ulkona}, laatikoita ${laatikot.length}`);
}
tulos.virheet = virheet;
vartio('ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 2).join(' | '));
writeFileSync(join(ULOS, `glnimiot-${NAKYMA}.json`), JSON.stringify(tulos, null, 1));
await selain.close(); palvelin.close();
const kaatui = tulos.vartiot.filter((v) => !v.ok).length;
console.log(`glnimiot ${NAKYMA}: ${tulos.vartiot.length - kaatui}/${tulos.vartiot.length}`);
process.exit(kaatui ? 1 : 0);
