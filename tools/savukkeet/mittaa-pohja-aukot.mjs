#!/usr/bin/env node
/*
 * POHJAN PIILOTUS: AUKOT ZOOMIN VENYTYKSESSÄ (Karttaseppä 22.9.2026,
 * Pelikoodarin sulavuuserän 1 kohta 2, PR #2779). Kun kirjaston pohja
 * (pohjapallo + z5) piilotetaan kerroksen peittäessä koko ruudun, on
 * varmistettava, ettei z7→z8-venytyksessä (vanha taso venytettynä, uusi
 * vielä matkalla) näy tyhjää: pikseli, jossa on vain taustan (paperin)
 * väri tai alpha 0.
 *
 * Johdettu mittaa-zoomiennakko-meri.mjs:stä: sama lento (MERI 40,5 N 6 E,
 * MAA 46,5 N 2,5 E), sama zoomi 0,2 → 0,067 → 0,022. Lisäksi renderin
 * jälkeen luetaan gl.readPixels 24 riviltä joka kehyksellä: taustan väri
 * otetaan avaruudesta (korkeus 3, kulmapikseli), ja lasketaan taustaväriset
 * pikselit (±2), pisin yhtenäinen jono ja ≥ 12 px:n jonot sekä alpha 0
 * -pikselit; lisäksi moottori.pohjaPiilossa joka kehyksellä.
 *
 * HUOM: meren kermaväri on lähellä paperin väriä, joten taustavärisiä
 * pikseleitä löytyy merellä ilman aukkojakin — vertaa AINA kahta ajoa:
 *   KOE=''                 pohja piiloon (PR:n oletus)
 *   KOE='&koe=pohjavanha'  pohja aina piirrossa
 * Aukko = luvut eroavat samoissa kehyksissä tai alpha0 > 0.
 *
 *   JUURI=<repo> PLAYWRIGHT_JS=… KOE='' ULOS=<kansio> node tools/savukkeet/mittaa-pohja-aukot.mjs
 */
import http from 'node:http';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { extname, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = process.env.JUURI ?? join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const KOE = process.env.KOE ?? '';
const { Game } = await import(`${JUURI}/js/game.js`);
const { packById } = await import(`${JUURI}/js/pack.js`);
const pw = await import('playwright').catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const paketti = pw.webkit ? pw : (pw.default ?? pw);
const MOOTTORI = process.env.SAVUKE_MOOTTORI ?? 'webkit';
const ULOS = process.env.ULOS ?? '/tmp/matkakirja-kaappaukset/pohja-aukot';
mkdirSync(ULOS, { recursive: true });
const DPR = Number(process.env.DPR) || 3;
const VIEWPORT = { width: 390, height: 844 };
const TYYPIT = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.geojson': 'application/json', '.woff2': 'font/woff2', '.bin': 'application/octet-stream' };
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

const vartiot = [];
const vartio = (nimi, ehto, tieto = '') => { vartiot.push({ nimi, ok: Boolean(ehto), tieto }); console.log(`${ehto ? 'OK ' : 'VIKA'} ${nimi}${tieto ? ` — ${tieto}` : ''}`); };
const mediaani = (a) => { const s = [...a].sort((x, y) => x - y); return s.length ? s[Math.floor((s.length - 1) / 2)] : NaN; };
const MERI_KATTO_MS = Number(process.env.MERI_KATTO_MS) || 700;
const NAKYMAT = { meri: { lat: 40.5, lng: 6.0 }, maa: { lat: 46.5, lng: 2.5 } };

const selain = MOOTTORI === 'webkit'
  ? await paketti.webkit.launch()
  : await paketti.chromium.launch({ executablePath: process.env.CHROMIUM || undefined, args: ['--use-angle=metal'] });
const ctx = await selain.newContext({ viewport: VIEWPORT, deviceScaleFactor: DPR, isMobile: true, hasTouch: true, serviceWorkers: 'block' });
await ctx.addInitScript((d) => { localStorage.setItem('matkakirja-save-v1', d); localStorage.removeItem('matkakirja-lauta'); }, tallenne);
const sivu = await ctx.newPage();
const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e.message)));
await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (r) => { const v = await ampari(r.request().url()); if (!v) { r.abort(); return; } r.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body, headers: { 'access-control-allow-origin': '*' } }); });
await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
await sivu.route(/wikimedia\.org/, (r) => r.abort());
await sivu.goto(`${osoite}?lauta=pallo${KOE}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
await sivu.waitForTimeout(2500);
await sivu.evaluate(() => { setInterval(() => { const ui = window.matkakirja?.ui; const n = ui?.ohitaNappi?.isConnected ? ui.ohitaNappi : document.querySelector('.fokusvirta-ohitanappi'); if (n) n.click(); }, 150); });
await sivu.waitForTimeout(2000);
await sivu.evaluate(() => window.matkakirja.ui.pallolauta.saavu?.({ kesto: 0 }));
await sivu.waitForTimeout(1500);

/** Aukot: readPixels heti renderin jälkeen, 24 riviä, lasketaan taustan väriset pikselit. */
await sivu.evaluate(() => {
  const inst = window.matkakirja.ui.pallonInstanssi;
  const r = inst.renderer();
  const gl = r.getContext();
  let moottori = null;
  inst.scene().traverse((o) => { if (moottori == null && 'pohjaPiilossa' in o) moottori = o; });
  window.__moottori = moottori;
  const RIVIT = 24;
  let tausta = null;
  const alkup = r.render.bind(r);
  window.__aukot = { viime: null, mittaa: false };
  r.render = (...a) => {
    const t = alkup(...a);
    if (!window.__aukot.mittaa) return t;
    const w = gl.drawingBufferWidth; const h = gl.drawingBufferHeight;
    const buf = new Uint8Array(w * 4);
    let aukkoja = 0; let alpha0 = 0; let n = 0; let jono = 0; let pisin = 0; let jonoja = 0;
    for (let i = 0; i < RIVIT; i += 1) {
      const y = Math.floor((i + 0.5) * h / RIVIT);
      gl.readPixels(0, y, w, 1, gl.RGBA, gl.UNSIGNED_BYTE, buf);
      jono = 0;
      for (let x = 0; x < w * 4; x += 4) {
        n += 1;
        if (buf[x + 3] === 0) alpha0 += 1;
        const osuu = tausta && Math.abs(buf[x] - tausta[0]) <= 2 && Math.abs(buf[x + 1] - tausta[1]) <= 2 && Math.abs(buf[x + 2] - tausta[2]) <= 2;
        if (osuu) { aukkoja += 1; jono += 1; if (jono > pisin) pisin = jono; if (jono === 12) jonoja += 1; } else jono = 0;
      }
    }
    if (!tausta) { gl.readPixels(2, 2, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, buf); tausta = [buf[0], buf[1], buf[2], buf[3]]; window.__aukot.tausta = tausta; }
    window.__aukot.viime = { aukkoja, alpha0, n, w, h, pisin, jonoja };
    return t;
  };
});
/** Kehysprofiili: taso ja peitto joka kehyksellä. */
await sivu.evaluate(() => {
  window.__zoomi = {
    aloita() {
      this.kehykset = []; this.kaynnissa = true; window.__aukot.mittaa = true;
      const askel = () => {
        if (!this.kaynnissa) return;
        const m = window.matkakirja.ui.pallolauta.lepokerros?.()?.mittarit?.() ?? {};
        const a = window.__aukot.viime ?? {}; this.kehykset.push({ t: performance.now(), taso: m.taso, nakyvia: m.nakyvia, scenessa: m.nakyviaScenessa, ennakkoja: m.zoomiennakkoja, meri: m.meriOsuus, merella: m.zoomiennakkoMerella, piilossa: window.__moottori?.pohjaPiilossa ?? null, peittoOsuus: m.peittoOsuus, aukkoja: a.aukkoja, alpha0: a.alpha0, n: a.n, pisin: a.pisin, jonoja: a.jonoja });
        requestAnimationFrame(askel);
      };
      requestAnimationFrame(askel);
    },
    lopeta() { this.kaynnissa = false; window.__aukot.mittaa = false; return this.kehykset; },
  };
});

/** Tason vaihdot ja aika 90 %:n peittoon. */
const vaihdot = (kehykset) => {
  const ulos = [];
  for (let i = 1; i < kehykset.length; i += 1) {
    if (kehykset[i].taso === kehykset[i - 1].taso || kehykset[i].taso == null) continue;
    const alku = kehykset[i].t;
    let ms = null;
    for (let j = i; j < kehykset.length; j += 1) {
      if (kehykset[j].taso !== kehykset[i].taso) break;
      if (kehykset[j].nakyvia > 0 && kehykset[j].scenessa / kehykset[j].nakyvia >= 0.9) { ms = kehykset[j].t - alku; break; }
    }
    ulos.push({ taso: `${kehykset[i - 1].taso}→${kehykset[i].taso}`, ms: ms === null ? Infinity : Math.round(ms) });
  }
  return ulos;
};

const tulokset = {};
// Taustan väri avaruudesta: kulmapikseli korkeudelta 3.
await sivu.evaluate(() => window.matkakirja.ui.pallonInstanssi.pointOfView({ lat: 40, lng: 6, altitude: 3 }, 0));
await sivu.waitForTimeout(1200);
await sivu.evaluate(() => { window.__aukot.mittaa = true; });
await sivu.waitForTimeout(300);
await sivu.evaluate(() => { window.__aukot.mittaa = false; });
console.log('tausta', await sivu.evaluate(() => JSON.stringify(window.__aukot.tausta)));
for (const [nimi, kohde] of Object.entries(NAKYMAT)) {
  await sivu.evaluate((pov) => window.matkakirja.ui.pallonInstanssi.pointOfView({ ...pov, altitude: 0.2 }, 0), kohde);
  await sivu.waitForTimeout(3500);
  const lahto = await sivu.evaluate(() => window.matkakirja.ui.pallolauta.lepokerros?.()?.mittarit?.() ?? {});
  await sivu.evaluate(() => window.__zoomi.aloita());
  await sivu.evaluate((pov) => window.matkakirja.ui.pallonInstanssi.pointOfView({ ...pov, altitude: 0.067 }, 1500), kohde);
  await sivu.waitForTimeout(2200);
  await sivu.evaluate((pov) => window.matkakirja.ui.pallonInstanssi.pointOfView({ ...pov, altitude: 0.022 }, 1500), kohde);
  for (let i = 0; i < 6; i += 1) { await sivu.waitForTimeout(300); const a = await sivu.evaluate(() => ({ ...window.__aukot.viime, piilossa: window.__moottori?.pohjaPiilossa })); if ((a.jonoja ?? 0) > 0 || (a.alpha0 ?? 0) > 0) await sivu.screenshot({ path: join(ULOS, `aukko-${nimi}-${i}.png`) }); }
  await sivu.waitForTimeout(400);
  const kehykset = await sivu.evaluate(() => window.__zoomi.lopeta());
  await sivu.screenshot({ path: join(ULOS, `zoomiennakko-${nimi}-${MOOTTORI}.jpg`), type: 'jpeg', quality: 80 });
  const v = vaihdot(kehykset);
  if (process.env.DEBUG) console.log(nimi, kehykset.filter((k, i) => i % 15 === 0).map((k) => `${Math.round(k.t)}:${k.taso}/${k.nakyvia}/${k.scenessa}/m${(k.meri ?? 0).toFixed(2)}/e${k.ennakkoja}`).join(' '));
  const loppu = kehykset[kehykset.length - 1];
  const aukkoKehykset = kehykset.filter((k) => (k.jonoja ?? 0) > 0 || (k.alpha0 ?? 0) > 0);
  console.log(`${nimi}: taustavärisiä pikseleitä max ${Math.max(0, ...kehykset.map((k) => k.aukkoja ?? 0))}/${kehykset[0]?.n}, pisin jono max ${Math.max(0, ...kehykset.map((k) => k.pisin ?? 0))} px`);
  const piilossa = kehykset.filter((k) => k.piilossa).length;
  const tausta = await sivu.evaluate(() => window.__aukot.tausta);
  console.log(`${nimi}: kehyksiä ${kehykset.length}, pohja piilossa ${piilossa} kehyksessä, aukkokehyksiä ${aukkoKehykset.length} (max aukkoja ${Math.max(0, ...aukkoKehykset.map((k) => k.aukkoja))}/${loppu?.n}, max alpha0 ${Math.max(0, ...aukkoKehykset.map((k) => k.alpha0))}), tausta ${JSON.stringify(tausta)}`);
  if (aukkoKehykset.length) console.log('  aukot:', aukkoKehykset.slice(0, 12).map((k) => `${Math.round(k.t)}:z${k.taso} ${k.scenessa}/${k.nakyvia} peitto${k.peittoOsuus} piilo${k.piilossa} aukkoja${k.aukkoja} jonoja${k.jonoja} pisin${k.pisin} a0=${k.alpha0}`).join(' | '));
  tulokset[`${nimi}Aukot`] = { aukkoKehyksia: aukkoKehykset.length, piilossaKehyksia: piilossa, kehyksia: kehykset.length };
  tulokset[nimi] = { lahtoMeri: lahto.meriOsuus, vaihdot: v, mediaaniMs: mediaani(v.map((x) => x.ms).filter(Number.isFinite)), ennakkojaMax: Math.max(0, ...kehykset.map((k) => k.ennakkoja ?? 0)), merella: kehykset.some((k) => k.merella), loppuMeri: loppu?.meri };
  console.log(`${nimi}: lähtö meriOsuus ${(lahto.meriOsuus ?? 0).toFixed(2)}, vaihdot ${v.map((x) => `${x.taso} ${x.ms} ms`).join(', ') || '-'}, mediaani ${tulokset[nimi].mediaaniMs} ms, zoomiennakkoja max ${tulokset[nimi].ennakkojaMax}, merellä ${tulokset[nimi].merella}`);
}
// Meren tunnistus (laatat.meriOsuus) on vain kokeiluhaarassa karttaseppa-zoomiennakko-2: vartioidaan, jos mittari on.
if (Number.isFinite(tulokset.meri.lahtoMeri)) {
  vartio('meri: näkyvät laatat tunnistetaan mereksi (meriOsuus ≥ 0,6)', tulokset.meri.lahtoMeri >= 0.6, String(tulokset.meri.lahtoMeri));
  vartio('maa: näkyvät laatat eivät ole merta (meriOsuus < 0,6)', tulokset.maa.lahtoMeri < 0.6, String(tulokset.maa.lahtoMeri));
}
vartio('meri: zoomiennakko tilasi laattoja', tulokset.meri.ennakkojaMax > 0, `ennakkoja ${tulokset.meri.ennakkojaMax}`);
vartio(`meri: karkean tason näkymisaika mediaani ≤ ${MERI_KATTO_MS} ms`, tulokset.meri.vaihdot.length > 0 && tulokset.meri.mediaaniMs <= MERI_KATTO_MS, `${tulokset.meri.mediaaniMs} ms (${tulokset.meri.vaihdot.length} vaihtoa)`);
vartio('ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));
writeFileSync(join(ULOS, `zoomiennakko-${MOOTTORI}.json`), JSON.stringify(tulokset, null, 1));

await selain.close();
palvelin.close();
const viat = vartiot.filter((v) => !v.ok);
console.log(`Vartio: ${vartiot.length - viat.length}/${vartiot.length} OK`);
process.exit(viat.length ? 1 : 0);
