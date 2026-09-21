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
 *   5. Katto pätee myös liikkeessä (E2): noston nimiö ≤ 16 px joka
 *      kehyksessä (NOSTOSYM_NIMIO_KATTO_PX, sallittu ylitys 0,5 %).
 *   6. Levossa kuori on 1 (±0,3 %) ja liikkeen luokka
 *      (.pallolauta-liikkuu) on poissa — siirtymät ovat taas käytössä.
 *   7. Kylkivaihto häivyttää (E3): kun noston datumin kylki käännetään
 *      ja asetteleNosto ajetaan, vanha nimiökuva jää häipymään
 *      (.nostosym-nimio-vanha), uusi tulee häivytyksellä ja vanha on
 *      poissa DOMista 400 ms:n kuluttua; ikoni ei liiku.
 * ENNUSTE (E4b, Karttasepän kameran ennuste): kun kehyksen mitoissa on
 * ennuste, nimiö johtaa todellista kameraa yhden kehyksen verran
 * tahallaan; vartiot 1–2 mittaavat silloin siirtymän ENNUSTETUSTA
 * maapisteestä (ennustevirhe) ja johto kirjataan tiedoksi. Vartiot 1–3
 * tuomitaan vain ≥ 20 fps:n mittauksesta (SAVUKE_IKKUNA=1,
 * ks. alla); headlessissä ne kirjataan tiedoksi. LÄHTÖTASO 21.9.2026
 * (ikkunallinen Chromium, Mac Studio): panorointi 0 px; zoomi 0,04 /
 * 0,31 px, koko muuttuu 77 %:ssa kehyksistä ja yhden kehyksen porras
 * 16 % — ladonta kulkee 200 ms:n tahdissa (lauta.js LADONNAN_TAHTI_MS)
 * ja nimet vaihtavat kokoa vasta ladonnassa. E2 (21.9.2026, kuori
 * liukuu joka kehys, js/pallolauta/nimet.js KOKO LIUKUU JOKA
 * KEHYKSESSÄ): koko muuttuu 97 %:ssa kehyksistä, porras 0, zoomin
 * pahin siirtymä 3,2 px → 0,7 px.
 *
 * Aja: PLAYWRIGHT_JS=… CHROMIUM=… node tools/savukkeet/savuke-nimiot-sulavat.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { ennustevirhe, kehysnopeus, koonLiukuvuus, siirtymanMuutokset } from '../../js/pallolauta/sulavuusmittari.js';
import { NOSTOSYM_NIMIO_KATTO_PX, NOSTOSYM_NIMIO_KOKO } from '../../js/fokusnosto-symbolit.js';

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
  await sivu.goto(`${osoite}?lauta=pallo&glnimiot=0`, { waitUntil: 'domcontentloaded', timeout: 60000 });
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
  /*
   * ENNUSTEEN KANSSA (E4b) nimiö johtaa todellista kameraa yhden kehyksen
   * verran tahallaan; silloin vartio mittaa siirtymän ENNUSTETUSTA
   * maapisteestä (ennustevirhe) ja johto todellisesta kirjataan tiedoksi.
   */
  const panEnnusteMitta = ennustevirhe(pan);
  const panMitta = panEnnusteMitta ?? panSiirtyma;
  if (panEnnusteMitta) tieto(`${tunnus}: panorointi, ennuste`, `ennustevirhe ${JSON.stringify(panEnnusteMitta)}; johto todellisesta kamerasta mediaani ${panSiirtyma.mediaani} px, p95 ${panSiirtyma.p95} px`);
  vaadi(`${tunnus}: 1. panoroinnissa nimiö pysyy maapisteessään (mediaani < 1 px, p95 < 2 px${panEnnusteMitta ? '; ennustetusta' : ''})`,
    panFps < 20 || (pan.length >= 5 && panMitta.n > 20 && panMitta.mediaani < 1 && panMitta.p95 < 2),
    JSON.stringify(panMitta));
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
  const zoomEnnuste = ennustevirhe(zoom);
  const zoomMitta = zoomEnnuste ?? zoomSiirtyma;
  if (zoomEnnuste) tieto(`${tunnus}: zoomi, ennuste`, `ennustevirhe ${JSON.stringify(zoomEnnuste)}; johto todellisesta kamerasta mediaani ${zoomSiirtyma.mediaani} px, p95 ${zoomSiirtyma.p95} px`);
  else tieto(`${tunnus}: ennuste (E4b)`, 'ei ennustetta kehyksen mitoissa (karttaseppa-ennuste ei mukana)');
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
  vaadi(`${tunnus}: 2. zoomissa nimiö pysyy maapisteessään (mediaani < 1 px, p95 < 2 px${zoomEnnuste ? '; ennustetusta' : ''})`,
    !tuomari || (zoom.length >= 5 && zoomMitta.n > 20 && zoomMitta.mediaani < 1 && zoomMitta.p95 < 2),
    JSON.stringify(zoomMitta));
  vaadi(`${tunnus}: 3. zoomissa koko liukuu joka kehys: liikkeen kehyksistä ≥ 90 % muuttaa kokoa, yhden kehyksen porras < 5 %`,
    !tuomari || (koko.liikkui >= 3 && koko.lepoaskel < 0.05 && koko.liikeaskel < 0.05 && koko.osuus >= 0.9),
    JSON.stringify(koko));
  if (KUVAKANSIO) writeFileSync(join(KUVAKANSIO, `sulavat-${tunnus}-zoom.png`), await sivu.screenshot());
  vaadi(`${tunnus}: 4. ei sivuvirheitä`, virheet.length === 0, virheet.join(' | '));

  /* ── 5. katto liikkeessä ────────────────────────────────────────── */
  // Noston koko näytteissä on pohja × kuori (mitta); nimiö = mitta × NOSTOSYM_NIMIO_KOKO.
  let suurinNimio = 0;
  let nostonaytteita = 0;
  for (const n of zoom) {
    for (const [avain, m] of Object.entries(n.merkit)) {
      if (avain.startsWith('kaupunki:')) continue;
      nostonaytteita += 1;
      suurinNimio = Math.max(suurinNimio, m.koko * NOSTOSYM_NIMIO_KOKO);
    }
  }
  tieto(`${tunnus}: katto`, `nostonäytteitä ${nostonaytteita}, suurin nimiö ${suurinNimio.toFixed(2)} px (katto ${NOSTOSYM_NIMIO_KATTO_PX} px)`);
  vaadi(`${tunnus}: 5. katto pätee liikkeessä: noston nimiö ≤ ${NOSTOSYM_NIMIO_KATTO_PX} px joka kehyksessä`,
    nostonaytteita > 0 && suurinNimio <= NOSTOSYM_NIMIO_KATTO_PX * 1.005,
    `suurin ${suurinNimio.toFixed(2)} px`);

  /* ── 6. lepo: kuori 1, liikkeen luokka pois ─────────────────────── */
  await odotaLepo();
  const lepo = await sivu.evaluate(() => {
    const l = window.matkakirja.ui.pallolauta;
    const kuoret = [...document.querySelectorAll('.pallolauta-nosto > svg, .pallolauta-nimi > svg')]
      .map((svg) => {
        const m = /matrix\(([-\d.e]+),/.exec(getComputedStyle(svg).transform ?? '');
        return m ? Math.abs(Number(m[1])) : 1;
      });
    return {
      kuoria: kuoret.length,
      min: Math.min(...kuoret),
      max: Math.max(...kuoret),
      kerroin: getComputedStyle(l.kotelo).getPropertyValue('--nimiokerroin').trim(),
      liikkuu: l.kotelo.classList.contains('pallolauta-liikkuu'),
    };
  });
  tieto(`${tunnus}: lepo`, JSON.stringify(lepo));
  vaadi(`${tunnus}: 6. levossa kuori on 1 (±0,3 %) ja liikkeen luokka on poissa`,
    lepo.kuoria > 0 && lepo.min > 0.997 && lepo.max < 1.003 && !lepo.liikkuu && lepo.kerroin !== '',
    JSON.stringify(lepo));

  /* ── 7. kylkivaihto häivyttää (E3) ──────────────────────────────── */
  const kylki = await sivu.evaluate(async () => {
    const { asetteleNosto } = await import('/js/pallolauta/nostot.js');
    const l = window.matkakirja.ui.pallolauta;
    const el = [...document.querySelectorAll('.pallolauta-nosto[data-nosto]')]
      .find((e) => e.dataset.nimio && !e.querySelector('.nostosym-nimio-piilossa'));
    if (!el) return { virhe: 'ei näkyvää nimiöllistä nostoa' };
    const d = l.merkit.datum(el);
    const g = el.querySelector('.pallolauta-nosto-siirto');
    const ikoni = g.querySelector('.nostosym-rasteri:not(.nostosym-nimiokuva)');
    const ennen = { lapsia: g.children.length, puoli: d.puoli, ikoniHref: ikoni?.getAttribute('href') ?? ikoni?.getAttribute('xlink:href') };
    d.puoli = d.puoli === 'oikea' ? 'vasen' : 'oikea';
    asetteleNosto(el, d);
    const heti = {
      vanha: g.querySelectorAll('.nostosym-nimio-vanha').length,
      tulee: g.querySelectorAll('.nostosym-nimio-tulee').length,
      lapsia: g.children.length,
      ikoniSama: g.querySelector('.nostosym-rasteri:not(.nostosym-nimiokuva)') !== null,
    };
    await new Promise((r) => setTimeout(r, 60));
    const kesken = {
      tulee: g.querySelectorAll('.nostosym-nimio-tulee').length,
      vanhaOpacity: getComputedStyle(g.querySelector('.nostosym-nimio-vanha') ?? g).opacity,
    };
    await new Promise((r) => setTimeout(r, 400));
    const lopuksi = {
      vanha: g.querySelectorAll('.nostosym-nimio-vanha').length,
      nimioita: g.querySelectorAll('.nostosym-nimiokuva').length,
      puoli: g.querySelector('.nostosym-nimiokuva')?.dataset.puoli ?? null,
      opacity: getComputedStyle(g.querySelector('.nostosym-nimiokuva') ?? g).opacity,
    };
    // Palautus: datumin kylki takaisin, jotta lepoladonta ei jää ristiriitaan.
    d.puoli = ennen.puoli;
    asetteleNosto(el, d);
    return { avain: el.dataset.nosto, ennen, heti, kesken, lopuksi };
  });
  tieto(`${tunnus}: kylkivaihto`, JSON.stringify(kylki));
  vaadi(`${tunnus}: 7. kylkivaihto häivyttää: vanha nimiö häipyy, uusi tulee häivytyksellä, vanha poissa 400 ms:ssa`,
    !kylki.virhe && kylki.heti.vanha === 1 && kylki.heti.tulee === 1 && kylki.heti.ikoniSama
      && kylki.kesken.tulee === 0 && Number(kylki.kesken.vanhaOpacity) < 1
      && kylki.lopuksi.vanha === 0 && kylki.lopuksi.nimioita === 1 && kylki.lopuksi.puoli !== kylki.ennen.puoli
      && Number(kylki.lopuksi.opacity) === 1,
    JSON.stringify(kylki));
  await ctx.close();
}

await selain.close();
palvelin.close();
console.log(`\nYHTEENVETO ${lapi}/${kaikki}`);
process.exit(lapi === kaikki ? 0 : 1);
