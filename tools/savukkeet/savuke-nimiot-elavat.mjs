/*
 * Savuke: KOHDEMAAN NIMIÖT ELÄVINÄ — EI POLTETTUJA, REUNA JA RANTAVIIVA
 * SOVITTELUSSA (Fable 20.9.2026, omistajan päätös nimiöt-erän jatkoksi;
 * js/laattapyramidi.js KOHDEMAAN_NIMIOT_ELAVINA).
 *
 * VARTIOT (390 × 844 ja 1400 × 900, Fogg Marseillessa, Ranska):
 *   1. Osumalistalla ei ole yhtään poltettua nostoa: kohdemaan kaikki
 *      nostot ovat eläviä (ennen: FRA 31 poltettua / 57).
 *   2. Nimiöllisiä eläviä nostoja on selvästi enemmän kuin ennen
 *      (390 px ≥ 32, prep 21; 1400 px ≥ 55, prep 40), eikä kaupunkien
 *      nimiä ole pudotettu nollaan (nimibudjetti HTML_MERKKIEN_KATTO 180).
 *   3. Välimeri (tyyppi meri) on kartalla nimiöllisenä eikä sen laatikko
 *      leikkaa kohdemaan korostuskehän janoja (rantaviivasääntö).
 *   4. Yksikään elävä nimiö ei ylitä ruudun reunaa (Sisältökirjurin
 *      mittarin sääntö, 4 px) saapumisnäkymässä eikä Marseillen
 *      lähizoomissa (½ ja ¼ saapumisnäkymän leveydestä).
 *   5. Ladonta (ladoHeti) pysyy nopeana: 30 toiston mediaani ≤ 12 ms
 *      (mitattu 2,5 ms Macilla kuormassa; prep 2,2 ms).
 *   6. Ei sivuvirheitä.
 *
 * Aja: PLAYWRIGHT_JS=… CHROMIUM=… node tools/savukkeet/savuke-nimiot-elavat.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? '';
const paketti = await import('playwright')
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

const LAHTOKAUPUNKI = 'marseille';
const KAIKKI_RUUDUT = [
  { nimi: '390 px', width: 390, height: 844, dpr: 2 },
  { nimi: '1400 px', width: 1400, height: 900, dpr: 1 },
];
const RUUDUT = process.env.SAVUKE_RUUTU
  ? KAIKKI_RUUDUT.filter((r) => String(r.width) === String(process.env.SAVUKE_RUUTU))
  : KAIKKI_RUUDUT;

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json', '.webmanifest': 'application/manifest+json',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

const AMPARI = 'https://media.matkakirja.app/';
const valimuisti = new Map();
async function ampariHaku(url) {
  if (valimuisti.has(url)) return valimuisti.get(url);
  const lupaus = fetch(url).then(async (v) => (v.ok
    ? { status: 200, body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
    : { status: v.status, body: Buffer.alloc(0), tyyppi: 'text/plain' }))
    .catch(() => null);
  valimuisti.set(url, lupaus);
  return lupaus;
}
const kirjasto = await ampariHaku(`${AMPARI}vendor/globe.gl-2.46.2.min.js`);
if (kirjasto?.status !== 200) {
  console.log('OHITUS  ämpäri ei vastaa — palloa ei voi avata; savuke ohitetaan');
  palvelin.close();
  process.exit(0);
}

const PALLON_PACK = packById('maailmankartta');
const MAA = PALLON_PACK.map.cityCountry;
const KOHDEMAA = MAA[LAHTOKAUPUNKI];

const selain = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium',
});


/** Nostot, nimet, Välimeri ja rantaviiva yhdestä hetkestä. */
const LUE = `async (kohde) => {
  const { ui } = window.matkakirja;
  const l = ui.pallolauta;
  const pallo = ui.pallonInstanssi;
  if (kohde) {
    const c = ui.game.board.cityById.get(kohde.kaupunki);
    const leveys = (l.kamera.kameranTila()?.leveys ?? 300) * kohde.osuus;
    await l.kamera.ajaKamera({ x: c.x, y: c.y, leveys }, { kesto: 0 });
    await new Promise((v) => setTimeout(v, 400));
  }
  l.ladoHeti();
  await new Promise((v) => setTimeout(v, 400));
  const osumat = l.nostot.osumat();
  const laput = l.nostot.lappuLaatikot();
  const W = innerWidth; const H = innerHeight;
  const yli = laput.filter((r) => r.x0 < -4 || r.y0 < -4 || r.x1 > W + 4 || r.y1 > H + 4).map((r) => r.nimi);
  const { pallonKorostusRenkaat, pallonKorostettuMaa } = await import('/js/maanaariviivat.js');
  const renkaat = pallonKorostusRenkaat(pallonKorostettuMaa());
  const janat = [];
  for (const rengas of renkaat) {
    let ed = null;
    for (const [lon, lat] of rengas) {
      const p = pallo.getScreenCoords(lat, lon, 0);
      const ok = p && Number.isFinite(p.x) && p.x > -40 && p.y > -40 && p.x < W + 40 && p.y < H + 40;
      if (ok && ed) janat.push({ x0: Math.min(p.x, ed.x) - 4, y0: Math.min(p.y, ed.y) - 4, x1: Math.max(p.x, ed.x) + 4, y1: Math.max(p.y, ed.y) + 4 });
      ed = ok ? p : null;
    }
  }
  const vm = laput.find((r) => r.id === 'valimeri');
  const vmOsuma = osumat.find((o) => o.id === 'valimeri');
  const leikkaa = vm ? janat.filter((j) => vm.x0 < j.x1 && j.x0 < vm.x1 && vm.y0 < j.y1 && j.y0 < vm.y1).length : null;
  const ajat = [];
  for (let i = 0; i < 30; i += 1) { const t0 = performance.now(); l.ladoHeti(); ajat.push(performance.now() - t0); }
  ajat.sort((a, b) => a - b);
  return {
    osumia: osumat.length,
    poltettuja: osumat.filter((o) => o.poltettu).length,
    nimiollisia: laput.length,
    nimia: document.querySelectorAll('.pallolauta-nimi').length,
    yli,
    janoja: janat.length,
    valimeri: vm ? { puoli: vm.puoli, dx: vm.dx, dy: vm.dy, leikkaa } : null,
    valimeriOsuma: Boolean(vmOsuma), valimeriNimio: Boolean(vmOsuma?.datum?.nimioNakyy),
    ladontaMs: ajat[15],
    W, H,
  };
}`;

for (const ruutu of RUUDUT) {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: LAHTOKAUPUNKI }],
    pack: PALLON_PACK,
    seed: 5,
  });
  peli.phase = 'action';
  peli.tokens.delete(LAHTOKAUPUNKI);
  const tallenne = JSON.stringify(peli.toJSON());

  const ctx = await selain.newContext({
    viewport: { width: ruutu.width, height: ruutu.height },
    deviceScaleFactor: ruutu.dpr,
    serviceWorkers: 'block',
  });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.removeItem('matkakirja-lauta');
      localStorage.setItem('matkakirja-kehittaja', '1');
    } catch { /* yksityinen tila */ }
  }, tallenne);
  const sivu = await ctx.newPage();
  const virheet = [];
  sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
  await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
  await sivu.route(/wikimedia\.org/, (r) => r.abort());
  await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (route) => {
    const v = await ampariHaku(route.request().url());
    if (!v || v.status !== 200) { route.abort(); return; }
    route.fulfill({
      status: 200,
      contentType: v.tyyppi ?? 'application/octet-stream',
      body: v.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });

  const tunnus = ruutu.nimi;
  await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 90000 });
  const auki = await sivu
    .waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 })
    .then(() => true).catch(() => false);
  vaadi(`${tunnus}: pallolauta aukesi`, auki, virheet.join(' | '));
  if (!auki) { await ctx.close(); continue; }
  await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    clearTimeout(ui.automaattiheittoAjastin);
    ui.automaattiheittoAjastin = null;
    const { suljeFokusvirta } = await import('/js/fokusvirta.js');
    suljeFokusvirta(ui);
    await ui.pallolauta.saavu({ kesto: 0 });
    await new Promise((v) => setTimeout(v, 1600));
  });

  // Saapumisen kuvakortti ja sen sumennus pois ennen mittausta ja
  // kaappauksia (sama kuin savuke-kuvalahteet): mittari ei koske niihin,
  // mutta kaappaus on lukukelvoton sumun takana.
  await sivu.evaluate(() => {
    for (const el of document.querySelectorAll('.saapumistraileri, .fokusvirta-isokuva, .fokuskohde-popup, .fokuskohde-zoom, .fokusnosto-kerros, [class*="zoomkerros"], [class*="fokuskohde-zoom"]')) el.remove();
  });
  await sivu.waitForTimeout(400);
  const saapuminen = await sivu.evaluate(`(${LUE})(null)`);
  tieto(`${tunnus}: saapumisnäkymä`, JSON.stringify({ ...saapuminen, yli: saapuminen.yli.length }));
  if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, `elavat-${ruutu.width}.png`), scale: 'css' });
  vaadi(`${tunnus}: 1. osumalistalla ei ole poltettuja nostoja`,
    saapuminen.osumia > 30 && saapuminen.poltettuja === 0,
    JSON.stringify({ osumia: saapuminen.osumia, poltettuja: saapuminen.poltettuja }));
  /*
   * VERTAILU PREPIIN (mitattu 20.9.2026 samalla mittarilla ilman
   * kytkintä): 390 px nimiöllisiä 21 + poltettuja 24, kaupunkien nimiä
   * 1; 1400 px nimiöllisiä 40 + poltettuja 34, nimiä 1. Elävinä: 40 ja
   * 69, nimiä 2 ja 2. Raja on puolivälissä, jotta kytkimen putoaminen
   * (takaisin 21/40) näkyy eikä ladonnan pieni vaihtelu kaada.
   */
  const nimioRaja = ruutu.width >= 1000 ? 55 : 32;
  vaadi(`${tunnus}: 2. nimiöllisiä eläviä nostoja ≥ ${nimioRaja} (prep ${ruutu.width >= 1000 ? 40 : 21}) ja kaupunkien nimiä yhä`,
    saapuminen.nimiollisia >= nimioRaja && saapuminen.nimia >= 1,
    JSON.stringify({ nimiollisia: saapuminen.nimiollisia, nimia: saapuminen.nimia }));
  vaadi(`${tunnus}: 3. Välimeri on kartalla nimiöllisenä eikä leikkaa korostuskehää`,
    saapuminen.valimeriOsuma && saapuminen.valimeriNimio && saapuminen.valimeri
      && saapuminen.janoja > 50 && saapuminen.valimeri.leikkaa === 0,
    JSON.stringify({ valimeri: saapuminen.valimeri, osuma: saapuminen.valimeriOsuma, nimio: saapuminen.valimeriNimio, janoja: saapuminen.janoja }));
  vaadi(`${tunnus}: 4a. saapumisnäkymässä yksikään elävä nimiö ei ylitä reunaa`,
    saapuminen.yli.length === 0, JSON.stringify(saapuminen.yli));
  vaadi(`${tunnus}: 5. ladonta pysyy nopeana (mediaani ≤ 12 ms)`,
    saapuminen.ladontaMs <= 12, `${saapuminen.ladontaMs.toFixed(2)} ms`);

  for (const osuus of [0.5, 0.25]) {
    const zoom = await sivu.evaluate(`(${LUE})(${JSON.stringify({ kaupunki: LAHTOKAUPUNKI, osuus })})`);
    tieto(`${tunnus}: Marseille × ${osuus}`, JSON.stringify({ ...zoom, yli: zoom.yli }));
    vaadi(`${tunnus}: 4b. Marseille × ${osuus}: ei poltettuja, ei reunan ylityksiä`,
      zoom.poltettuja === 0 && zoom.yli.length === 0, JSON.stringify({ poltettuja: zoom.poltettuja, yli: zoom.yli }));
    if (zoom.valimeri) {
      vaadi(`${tunnus}: 3b. Marseille × ${osuus}: Välimeri irti korostuskehästä`,
        zoom.valimeri.leikkaa === 0, JSON.stringify(zoom.valimeri));
    }
    if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, `elavat-${ruutu.width}-x${osuus}.png`), scale: 'css' });
  }

  vaadi(`${tunnus}: 6. ei sivuvirheitä`, virheet.length === 0, virheet.join(' | '));
  await ctx.close();
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
