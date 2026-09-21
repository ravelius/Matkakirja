/*
 * SAVUKE: NIMIÖIDEN SULAVUUS — KARTAN SULAVUUS ENSIN (omistaja 21.9.2026,
 * Raamatun loki "KARTAN SULAVUUS ENSIN"; Fablen erä E1 = mittari).
 *
 * Google Earthin mitta: nimiö pysyy kiinni maapisteessään panoroinnissa
 * ja zoomissa ilman hyppyjä tai jälkeen jäämistä, ja sen koko muuttuu
 * zoomin aikana jatkuvasti, ei portaina. Sama kaupunkien nimille
 * (.pallolauta-nimi) ja nostojen nimiöille (.pallolauta-nosto).
 *
 * MITTAUS on sivun sisällä joka kehyksessä (requestAnimationFrame,
 * rekisteröity pallon silmukan jälkeen, joten se näkee saman kehyksen
 * DOM-tilan): jokaisesta merkistä
 *   - maapisteen ruutukohta  = pallo.getScreenCoords(lat, lng) kotelossa
 *   - nimiön ruutukohta      = sisäryhmän (.pallolauta-*-siirto)
 *                              getBoundingClientRect-keskipiste
 *   - koko                   = nostolla ryhmän scale(), nimellä font-size
 * Nimiön SIIRTYMÄ maapisteestä on sovittelun offset ja saa olla mitä
 * tahansa, mutta sen pitää pysyä SAMANA liikkeen ajan: mittari on
 * siirtymän suurin muutos (px) eleen ensimmäiseen kehykseen nähden.
 * Zoomissa koko saa muuttua joka kehys; PORRAS on yhden kehyksen
 * kokohyppy, joka on selvästi suurempi kuin kameran mittakaavan muutos
 * samassa kehyksessä, tai levossa tuleva hyppy kun kamera ei liiku.
 *
 * VARTIOT (390 dpr 2 ja 1400 dpr 1; Ranska, Marseille):
 *   1. Panorointi: nimiön siirtymä maapisteestä muuttuu < 1 px
 *      (mediaani näytteistä, ja 95. persentiili < 2 px).
 *   2. Zoomi (kamera-ajo 2,5×, 1,5 s): siirtymä < 1 px samoin.
 *   3. Zoomi: koko liukuu joka kehys — liikkeen kehyksistä ≥ 90 %
 *      muuttaa kokoa, yhden kehyksen porras < 5 % (myös levossa).
 *   4. Ei sivuvirheitä.
 * Vartiot 1–3 tuomitaan vain ≥ 20 fps:n mittauksesta (SAVUKE_IKKUNA=1,
 * ks. alla); headlessissä ne kirjataan tiedoksi. LÄHTÖTASO 21.9.2026
 * (ikkunallinen Chromium, Mac Studio): panorointi 0 px; zoomi 0,04 /
 * 0,31 px, koko muuttuu 77 %:ssa kehyksistä ja yhden kehyksen porras
 * 16 % — ladonta kulkee 200 ms:n tahdissa (lauta.js LADONNAN_TAHTI_MS)
 * ja nimet vaihtavat kokoa vasta ladonnassa. E2 vie koon joka kehykseen.
 *
 * Aja: PLAYWRIGHT_JS=… CHROMIUM=… node tools/savukkeet/savuke-nimiot-sulavat.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { kehysnopeus, koonLiukuvuus, siirtymanMuutokset } from '../../js/pallolauta/sulavuusmittari.js';

const JUURI = new URL('../..', import.meta.url).pathname;
const paketti = await import('playwright')
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

const LAHTOKAUPUNKI = 'marseille';
const KAIKKI_RUUDUT = [
  { nimi: '390', width: 390, height: 844, dpr: 2 },
  { nimi: '1400', width: 1400, height: 900, dpr: 1 },
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

/*
 * IKKUNALLINEN CHROMIUM (SAVUKE_IKKUNA=1): headless piirtää pallon
 * ohjelmallisesti 2–6 fps, jolloin lepoladonta ehtii kehysten väliin ja
 * mittari näkee vain portaita. Sulavuus mitataan GPU:lla — Macilla
 * ikkunallisena (60 fps), laitteella Laitetestaaja.
 */
const selain = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium',
  headless: process.env.SAVUKE_IKKUNA !== '1',
});

/** Mittari on pelin oma moduuli (js/pallolauta/sulavuusmittari.js): sama luku laitteella. */
const ALOITA = `() => window.matkakirja.ui.pallolauta.sulavuus.aloita()`;
const PYSAYTA = `() => window.matkakirja.ui.pallolauta.sulavuus.lopeta()`;

for (const ruutu of RUUDUT) {
  /* eslint-disable no-await-in-loop */
  console.log(`\n=== RUUTU ${ruutu.nimi} ===`);
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: LAHTOKAUPUNKI }],
    pack: packById('maailmankartta'),
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
      status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });

  const tunnus = ruutu.nimi;
  await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  const auki = await sivu
    .waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 })
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
    for (const el of document.querySelectorAll('.saapumistraileri, .fokusvirta-isokuva, .fokuskohde-popup, .fokusnosto-kerros')) el.remove();
  });
  const odotaLepo = async () => {
    await sivu.waitForFunction(() => {
      const l = window.matkakirja.ui.pallolauta;
      const s = l.kamera.nakyvaAlue()?.skaala ?? 0;
      const ed = window.__lepoSkaala;
      window.__lepoSkaala = { s, t: performance.now() };
      return Boolean(ed) && Math.abs(ed.s - s) < 1e-6 && performance.now() - ed.t >= 400
        && l.nostot.sovittelunTulos()?.lukossa === false;
    }, null, { timeout: 15000, polling: 100 }).catch(() => {});
    await sivu.waitForTimeout(300);
  };
  await odotaLepo();

  const koti = await sivu.evaluate(() => { const r = window.matkakirja.ui.pallolauta.kotelo.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; });
  const x0 = koti.x + koti.w * 0.5;
  const y0 = koti.y + koti.h * 0.55;

  /* ── 1. panorointi ~2 s ─────────────────────────────────────────── */
  const seurattavia = await sivu.evaluate(`(${ALOITA})()`);
  await sivu.mouse.move(x0, y0);
  await sivu.mouse.down();
  const askelia = 20;
  const t0 = Date.now();
  for (let i = 1; i <= askelia; i += 1) {
    await sivu.mouse.move(x0 - (120 * i) / askelia, y0 - (60 * i) / askelia, { steps: 3 });
    const tavoite = t0 + (2000 * i) / askelia;
    const odota = tavoite - Date.now();
    if (odota > 0) await sivu.waitForTimeout(odota);
  }
  await sivu.mouse.up();
  // Lepo mukaan näytteisiin: ladonnan hyppy näkyy tässä.
  await sivu.waitForTimeout(900);
  const pan = await sivu.evaluate(`(${PYSAYTA})()`);
  const panSiirtyma = siirtymanMuutokset(pan);
  const panFps = kehysnopeus(pan);
  tieto(`${tunnus}: panorointi`, `${pan.length} kehystä (${panFps.toFixed(1)} fps), seurattavia ${seurattavia}; siirtymän muutos mediaani ${panSiirtyma.mediaani} px, p95 ${panSiirtyma.p95} px, pahin ${JSON.stringify(panSiirtyma.pahin)}`);
  vaadi(`${tunnus}: 1. panoroinnissa nimiö pysyy maapisteessään (mediaani < 1 px, p95 < 2 px)`,
    panFps < 20 || (pan.length >= 5 && panSiirtyma.n > 20 && panSiirtyma.mediaani < 1 && panSiirtyma.p95 < 2),
    JSON.stringify(panSiirtyma));
  if (KUVAKANSIO) writeFileSync(join(KUVAKANSIO, `sulavat-${tunnus}-pan.png`), await sivu.screenshot());
  await odotaLepo();

  /* ── 2–3. zoomi ─────────────────────────────────────────────────── */
  await sivu.mouse.move(x0, y0);
  /*
   * ZOOMI LAUDAN KAMERA-AJONA (kamera.ajaKamera, näkyvä leveys / 2,5,
   * 1,5 s): kameraAjossa on eleen tavoin päällä, joten lepoladonta
   * odottaa loppua kuten nipistyksessä — kirjaston oma pointOfView-
   * tween ei ole ele, ja sen aikana ladonta ajaisi joka kehys.
   * Playwrightin rulla ei zoomaa pallolautaa headlessissä.
   */
  // LÄMMITYS: sama zoomi kerran edestakaisin ilman mittaria, jotta
  // laatat ovat muistissa eikä mittaus mittaa laattojen latausta.
  await sivu.evaluate(`(${PYSAYTA})()`);
  const altEnnen = await sivu.evaluate(async () => {
    const l = window.matkakirja.ui.pallolauta;
    const pov = l.pallo.pointOfView();
    l.pallo.pointOfView({ lat: pov.lat, lng: pov.lng, altitude: pov.altitude / 2.5 }, 1500);
    await new Promise((r) => setTimeout(r, 3500));
    l.pallo.pointOfView({ lat: pov.lat, lng: pov.lng, altitude: pov.altitude }, 1500);
    await new Promise((r) => setTimeout(r, 3000));
    return pov.altitude;
  });
  await odotaLepo();
  await sivu.evaluate(`(${ALOITA})()`);
  await sivu.evaluate(() => {
    const l = window.matkakirja.ui.pallolauta;
    const t = l.kamera.kameranTila();
    l.kamera.ajaKamera({ x: t.x, y: t.y, leveys: t.leveys / 2.5 }, { kesto: 1500 });
  });
  await sivu.waitForTimeout(1200);
  const altJalkeen = await sivu.evaluate(() => window.matkakirja.ui.pallolauta.pallo.pointOfView().altitude);
  tieto(`${tunnus}: korkeus`, `${altEnnen.toFixed(4)} → ${altJalkeen.toFixed(4)}`);
  const zoom = await sivu.evaluate(`(${PYSAYTA})()`);
  const zoomSiirtyma = siirtymanMuutokset(zoom);
  const koko = koonLiukuvuus(zoom);
  const skaalat = zoom.map((n) => n.skaala);
  const fps = kehysnopeus(zoom);
  tieto(`${tunnus}: zoomi`, `${zoom.length} kehystä (${fps.toFixed(1)} fps), skaala ${skaalat[0]?.toFixed(4)} → ${skaalat.at(-1)?.toFixed(4)}; siirtymän muutos mediaani ${zoomSiirtyma.mediaani} px, p95 ${zoomSiirtyma.p95} px, pahin ${JSON.stringify(zoomSiirtyma.pahin)}; koko: kamera liikkui ${koko.liikkui} kehyksessä, koko muuttui niistä ${koko.liikkuiJaKokoMuuttui} (${koko.osuus}), kokoaskel levossa ${koko.lepoaskel}, liikkeessä ${koko.liikeaskel}`);
  /*
   * HEADLESS EI KELPAA SULAVUUDEN TUOMARIKSI: ohjelmallinen piirto antaa
   * 2–6 fps, jolloin lepoladonta ehtii kehysten väliin ja mittari näkee
   * pelkkiä portaita. Alle 20 fps:n mittaus kirjataan tiedoksi, ei
   * vartioksi — sulavuus tuomitaan ikkunallisena (SAVUKE_IKKUNA=1) ja
   * laitteella.
   */
  const tuomari = fps >= 20;
  if (!tuomari) tieto(`${tunnus}: ohitus`, `${fps} fps — sulavuusvartiot 2–3 vain ikkunallisena (SAVUKE_IKKUNA=1)`);
  vaadi(`${tunnus}: 2. zoomissa nimiö pysyy maapisteessään (mediaani < 1 px, p95 < 2 px)`,
    !tuomari || (zoom.length >= 5 && zoomSiirtyma.n > 20 && zoomSiirtyma.mediaani < 1 && zoomSiirtyma.p95 < 2),
    JSON.stringify(zoomSiirtyma));
  vaadi(`${tunnus}: 3. zoomissa koko liukuu joka kehys: liikkeen kehyksistä ≥ 90 % muuttaa kokoa, yhden kehyksen porras < 5 %`,
    !tuomari || (koko.liikkui >= 3 && koko.lepoaskel < 0.05 && koko.liikeaskel < 0.05 && koko.osuus >= 0.9),
    JSON.stringify(koko));
  if (KUVAKANSIO) writeFileSync(join(KUVAKANSIO, `sulavat-${tunnus}-zoom.png`), await sivu.screenshot());
  vaadi(`${tunnus}: 4. ei sivuvirheitä`, virheet.length === 0, virheet.join(' | '));
  await ctx.close();
}

await selain.close();
palvelin.close();
console.log(`\nYHTEENVETO ${lapi}/${kaikki}`);
process.exit(lapi === kaikki ? 0 : 1);
