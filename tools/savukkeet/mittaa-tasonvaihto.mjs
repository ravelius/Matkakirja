#!/usr/bin/env node
/*
 * MISTÄ ZOOMIN "LIKA" TULEE: LAATASTA, HÄIVEESTÄ VAI KERMASTA?
 * (Karttaseppä 22.9.2026, omistajan tuntumatesti v2106: meren alue
 * likaantuu zoomatessa.)
 *
 * Kysymys on erotettavissa kolmeen osaan, kun KAMERA PIDETÄÄN
 * PAIKALLAAN ja vaihdetaan vain taso. Sen tekee laattakerroksen
 * KERTOMUSLUKKO (js/pallolaatat.js lukitseKertomus): lukko naulaa
 * nykyisen tason, joten kameran voi viedä syvemmälle ilman että taso
 * vaihtuu.
 *
 *   A  lukko päällä, kamera syvällä  -> NÄKYMÄ X, TASO z
 *   C  lukko auki, kaappaus häiveen puolivälissä -> X, z ja z+1 sekaisin
 *   B  häive ohi                      -> NÄKYMÄ X, TASO z+1
 *
 * Silloin:
 *   - A vs B kertoo, kuinka paljon LAATAT itse eroavat (poltto);
 *   - C vs (A+B)/2 kertoo, tuottaako SEKOITUS jotain, mitä kummassakaan
 *     päässä ei ole (häive, kerman maski, mipmapit).
 * Mitta on korkeataajuinen rms: pikselin poikkeama 9 x 9 keskiarvosta,
 * vain merialueelta (lämpimät maapikselit rajataan pois).
 *
 *   JUURI=<repo> PLAYWRIGHT_JS=... ULOS=<kansio> [KOE='&koe=kangasaina']
 *   [SAVUKE_MOOTTORI=chromium] node tools/savukkeet/mittaa-tasonvaihto.mjs
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
const ULOS = process.env.ULOS ?? '/tmp/matkakirja-kaappaukset/tasonvaihto';
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


const nayta = (n) => (Number.isFinite(n) ? n.toFixed(2) : '-');

/** Kaappaa ruudun ja palauttaa tiedostopolun. */
const kaappaa = async (nimi) => {
  const polku = join(ULOS, `${nimi}.png`);
  await sivu.screenshot({ path: polku });
  return polku;
};

/** Lepokerroksen mittarit. */
const mittarit = () => sivu.evaluate(() => window.matkakirja.ui.pallolauta.lepokerros?.()?.mittarit?.() ?? {});

const NAKYMAT = {
  /* `lahto` on korkeus, jolla taso on z, ja `syva` se, jolla se olisi z+1. */
  rannikko: { lat: 43.2, lng: 5.3, lahto: 0.12, syva: 0.045 },
  avomeri: { lat: 40.5, lng: 6.0, lahto: 0.2, syva: 0.08 },
};

const tulokset = {};
for (const [nimi, kohde] of Object.entries(NAKYMAT)) {
  /* 1. Lähtökorkeus: taso asettuu, laatat latautuvat. */
  await sivu.evaluate((pov) => window.matkakirja.ui.pallonInstanssi.pointOfView({ lat: pov.lat, lng: pov.lng, altitude: pov.lahto }, 0), { ...kohde });
  await sivu.waitForTimeout(4000);
  const lahto = await mittarit();
  /* 2. Lukko naulaa tason; kamera syvemmälle, laatat täyttävät näkymän. */
  const naulattu = await sivu.evaluate(() => window.matkakirja.ui.pallolauta.lepokerros?.()?.lukitseKertomus?.(true) ?? null);
  await sivu.evaluate((pov) => window.matkakirja.ui.pallonInstanssi.pointOfView({ lat: pov.lat, lng: pov.lng, altitude: pov.syva }, 0), { ...kohde });
  await sivu.waitForTimeout(4500);
  const A = await kaappaa(`${nimi}-A-taso${naulattu}`);
  const aTila = await mittarit();
  /* 3. Lukko auki: taso vaihtuu, häive kulkee. Kaappaus puolivälissä. */
  await sivu.evaluate(() => {
    window.__haive = { otos: null, kehykset: [] };
    const askel = () => {
      const m = window.matkakirja.ui.pallolauta.lepokerros?.()?.mittarit?.() ?? {};
      window.__haive.kehykset.push({ t: performance.now(), taso: m.taso, nakyvia: m.nakyvia, scenessa: m.nakyviaScenessa });
      if (window.__haive.kaynnissa !== false) requestAnimationFrame(askel);
    };
    requestAnimationFrame(askel);
  });
  await sivu.evaluate(() => window.matkakirja.ui.pallolauta.lepokerros?.()?.lukitseKertomus?.(false));
  /*
   * Puoliväli: mittaria luetaan tiheään ja kaappaus otetaan heti, kun
   * uuden tason peitto on 0,25-0,8 — silloin ruudulla on kumpaakin
   * tasoa. waitForFunction ei kelpaa: se palaa jo ensimmäisestä
   * kehyksestä, jossa ehto täyttyy, ja peitto ehtii nousta täyteen.
   */
  let cTila = {};
  let osui = false;
  for (let i = 0; i < 140; i += 1) {
    const m = await mittarit();
    const p = m.nakyvia > 0 ? m.nakyviaScenessa / m.nakyvia : 0;
    if (m.taso !== aTila.taso && p >= 0.2 && p <= 0.85) { cTila = m; osui = true; break; }
    await sivu.waitForTimeout(40);
  }
  if (!osui) cTila = await mittarit();
  const C = await kaappaa(`${nimi}-C-haive`);
  /* 4. Häive ohi. */
  await sivu.waitForTimeout(5000);
  const B = await kaappaa(`${nimi}-B-taso${cTila.taso ?? '?'}`);
  const bTila = await mittarit();
  await sivu.evaluate(() => { window.__haive.kaynnissa = false; });
  tulokset[nimi] = {
    naulattu, lahtoTaso: lahto.taso, aTaso: aTila.taso, cTaso: cTila.taso, bTaso: bTila.taso,
    cPeitto: cTila.nakyvia ? cTila.nakyviaScenessa / cTila.nakyvia : null,
    cOsui: osui,
    A, B, C,
  };
  console.log(`${nimi}: lähtö z${lahto.taso}, naulattu z${naulattu}, A z${aTila.taso}, C z${cTila.taso} (peitto ${nayta(100 * (tulokset[nimi].cPeitto ?? 0))} %, osui ${osui}), B z${bTila.taso}`);
}

writeFileSync(join(ULOS, `tasonvaihto-${MOOTTORI}.json`), JSON.stringify({ koe: KOE, tulokset, virheet }, null, 1));
console.log(`Kaappaukset: ${ULOS}`);
await selain.close();
palvelin.close();
process.exit(virheet.length ? 1 : 0);
