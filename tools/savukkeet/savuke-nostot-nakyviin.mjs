/*
 * SAVUKE: NOSTOT NÄKYVIIN MAAN RAJAN YLÄPUOLELLA (omistajan tuotanto-
 * kaappaus v2000, 21.9.2026: Ranska z6 työpöydällä, tallennettu peli
 * Marseillessa — "nostot puuttuvat": vain neljä näkyi, muut olivat
 * pelkkiä pisteitä).
 *
 * JUURISYY: nostot.js:n portti aukesi vain, kun maan lehti täytti puolet
 * näkymästä. Kun kamera on maan uloszoomausrajan yläpuolella (ajon
 * nostama katto jää perillä voimaan, lauta.js AJON KATTO), Ranska on
 * kokonaan ruudulla mutta alle puolet siitä → portti kiinni →
 * `pisteetVain` → 69 nostoa pisteiksi. Nyt portti aukeaa myös, kun maa
 * on kokonaan ruudulla ja vähintään 30 % siitä (lehtiNakyvissa), ja
 * osuus on suurempi leveydestä ja korkeudesta.
 *
 * Vartiot (FRA, Marseille, tallennettu peli; 2000 × 1300 dpr 2 ja
 * 390 × 844):
 *   1. Saapumisnäkymä (maan rajalla): nostoja ≥ 60, kaikilla ikoni,
 *      nimiöllisiä ≥ 20 (vertailu ennen ja jälkeen).
 *   2. Rajan yläpuolella (katto nostettu ajon tapaan, korkeus × 1,8
 *      = omistajan kuvan mittakaava, Ranska ~40 % leveydestä ja ~75 %
 *      korkeudesta): portti auki (lehdenOsuus ≥ 0,5), nostoja ≥ 60,
 *      kaikilla ikoni, nimiöllisiä ≥ 20 — ei pisteetVain-tilaa.
 *   3. Puhelimella 390 saapumisnäkymä ennallaan: nostoja ≥ 30, nimiöt.
 *   4. Ei sivuvirheitä.
 *
 * Aja: PLAYWRIGHT_JS=… CHROMIUM=… node tools/savukkeet/savuke-nostot-nakyviin.mjs [kuvakansio]
 */
import http from 'node:http';
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const JUURI = new URL('../..', import.meta.url).pathname;
const paketti = await import('playwright')
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO) mkdirSync(KUVAKANSIO, { recursive: true });

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp',
  '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.geojson': 'application/json',
};
const palvelin = http.createServer((req, res) => {
  let polku = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (polku === '/') polku = '/index.html';
  const tiedosto = join(JUURI, polku);
  if (!existsSync(tiedosto) || statSync(tiedosto).isDirectory()) { res.statusCode = 404; res.end(); return; }
  res.setHeader('Content-Type', TYYPIT[extname(tiedosto)] ?? 'application/octet-stream');
  res.end(readFileSync(tiedosto));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/?lauta=pallo`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) lapi += 1;
  console.log(`${ehto ? 'OK  ' : 'FAIL'}  ${nimi}${ehto ? '' : ` — ${lisa}`}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

const valimuisti = new Map();
const ampariHaku = (url) => {
  if (!valimuisti.has(url)) {
    valimuisti.set(url, fetch(url).then(async (v) => (v.ok
      ? { body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') } : null))
      .catch(() => null));
  }
  return valimuisti.get(url);
};

// Tallennettu peli kuten omistajalla: Marseillessa, Pariisi ja Marseille käytyinä.
const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'marseille' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('marseille');
peli.world.visited.add('pariisi');
peli.world.visited.add('marseille');
const TALLENNE = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined });
const RUUDUT = [
  { nimi: '2000', width: 2000, height: 1300, dpr: 2, katto: true },
  { nimi: '390', width: 390, height: 844, dpr: 3, katto: false },
];
const virheet = [];

for (const ruutu of RUUDUT) {
  /* eslint-disable no-await-in-loop */
  const ctx = await selain.newContext({
    viewport: { width: ruutu.width, height: ruutu.height }, deviceScaleFactor: ruutu.dpr,
    serviceWorkers: 'block', hasTouch: ruutu.nimi === '390',
  });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.removeItem('matkakirja-lauta');
      localStorage.removeItem('matkakirja-loydetyt');
    } catch { /* yksityinen tila */ }
  }, TALLENNE);
  const sivu = await ctx.newPage();
  sivu.on('pageerror', (e) => virheet.push(`${ruutu.nimi}: ${e.message ?? e}`));
  await sivu.route(/^https?:\/\/(?!localhost)/, async (route) => {
    const url = route.request().url();
    if (/media\.matkakirja\.app|r2\.dev\//.test(url) && !/\.(mp3|mp4|webm|ogg|wav|m4a)(\?|$)/.test(url)) {
      const v = await ampariHaku(url);
      if (v) {
        route.fulfill({ status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body, headers: { 'access-control-allow-origin': '*' } });
        return;
      }
    }
    route.abort();
  });
  await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
  await sivu.waitForTimeout(8000);
  await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    clearTimeout(ui.automaattiheittoAjastin);
    ui.automaattiheittoAjastin = null;
    const { suljeFokusvirta } = await import('/js/fokusvirta.js');
    suljeFokusvirta(ui);
    for (const el of document.querySelectorAll('.fokusnosto-kerros, .fokuskohde-popup, .saapumistraileri, .fokusvirta-kortti')) el.remove();
  });
  await sivu.waitForTimeout(1500);

  const lueTila = () => sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    const { kohteidenNykyinenIso } = await import('/js/fokuskohteet.js'); const { FOKUS_POHJAT } = await import('/js/packs/fokus-grc.js');
    const pohja = FOKUS_POHJAT[kohteidenNykyinenIso(ui)] ?? null;
    const l = ui.pallolauta;
    const nostot = [...document.querySelectorAll('.pallolauta-nosto')].filter((e) => !e.classList.contains('pallolauta-poistuu'));
    const nakyva = l.kamera.nakyvaAlue();
    return {
      korkeus: +ui.pallonInstanssi.pointOfView().altitude.toFixed(4),
      osuus: +l.nostot.lehdenOsuus(nakyva).toFixed(3),
      // Pelkkä leveyden osuus (vanha mitta): osoittaa, milloin korjaus ratkaisee.
      leveysOsuus: nakyva && pohja?.bbox?.w > 0 ? +(pohja.bbox.w / nakyva.w).toFixed(3) : null,
      korkeusOsuus: nakyva && pohja?.bbox?.h > 0 ? +(pohja.bbox.h / nakyva.h).toFixed(3) : null,
      kokonaan: (await import('/js/pallolauta/nostot.js')).lehtiKokonaanRuudulla(pohja, nakyva),
      nostoja: nostot.length,
      ikonillisia: nostot.filter((e) => e.querySelector('image')).length,
      nimiollisia: nostot.filter((e) => e.querySelector('.nostosym-nimiokuva:not(.nostosym-nimio-vanha)') && !e.querySelector('.nostosym-nimio-piilossa')).length,
    };
  });
  const kuva = async (nimi) => {
    if (!KUVAKANSIO) return;
    writeFileSync(join(KUVAKANSIO, `nostot-nakyviin-${nimi}-${ruutu.nimi}.png`), await sivu.screenshot());
  };

  const saapuminen = await lueTila();
  tieto(`${ruutu.nimi} · saapuminen`, JSON.stringify(saapuminen));
  await kuva('saapuminen');
  if (ruutu.nimi === '390') {
    vaadi(`${ruutu.nimi} · 3. Puhelimen saapumisnäkymä ennallaan: nostoja ≥ 30, ikonit`,
      saapuminen.nostoja >= 30 && saapuminen.ikonillisia === saapuminen.nostoja, JSON.stringify(saapuminen));
  } else {
    vaadi(`${ruutu.nimi} · 1. Saapumisnäkymä maan rajalla: nostoja ≥ 60, kaikilla ikoni`,
      saapuminen.nostoja >= 60 && saapuminen.ikonillisia === saapuminen.nostoja, JSON.stringify(saapuminen));
  }

  if (ruutu.katto) {
    /*
     * RAJAN YLÄPUOLELLE kuten omistajalla: katto nostettuna (kuten ajon
     * jättämä katto, lauta.js AJON KATTO: OrbitControlsin maxDistance) ja
     * kamera sinne. Korkeus × 4,5 antaa omistajan kuvan mittakaavan
     * (Ranska alle puolet leveydestä, yli puolet korkeudesta).
     */
    const yla = await sivu.evaluate(async (kerroin) => {
      const { ui } = window.matkakirja;
      const l = ui.pallolauta;
      const p = ui.pallonInstanssi;
      const pov = p.pointOfView();
      const maali = { lat: pov.lat, lng: pov.lng, altitude: pov.altitude * kerroin };
      // Sama reitti kuin ajolla: katto ylös ennen kirjoitusta.
      const sade = p.getGlobeRadius();
      const katto = () => +(p.controls().maxDistance / sade - 1).toFixed(4);
      const ennen = katto();
      // Katto ylös kuten ajon jälkeen (OrbitControlsin maxDistance), sitten kamera sinne.
      p.controls().maxDistance = sade * (1 + maali.altitude * 1.05);
      const ajonJalkeen = katto();
      p.pointOfView(maali, 0);
      await new Promise((r) => setTimeout(r, 400));
      p.pointOfView(maali, 0);
      await new Promise((r) => setTimeout(r, 2500));
      l.heraa?.();
      l.ladoHeti?.();
      await new Promise((r) => setTimeout(r, 2000));
      return { korkeus: p.pointOfView().altitude, katot: [ennen, ajonJalkeen, katto()] };
    }, 4.5);
    const rajanYlla = await lueTila();
    tieto(`${ruutu.nimi} · rajan yläpuolella`, `${JSON.stringify(rajanYlla)} (pyydetty ${(saapuminen.korkeus * 1.8).toFixed(4)}, saatu ${yla.korkeus.toFixed(4)}, katot ${JSON.stringify(yla.katot)})`);
    await kuva('rajan-ylla');
    vaadi(`${ruutu.nimi} · 2a. Kamera pääsi rajan yläpuolelle (koe on aito)`,
      rajanYlla.korkeus > saapuminen.korkeus * 1.5, `korkeus ${rajanYlla.korkeus} vs ${saapuminen.korkeus}`);
    vaadi(`${ruutu.nimi} · 2b. Osuus alle puolen mutta maa kokonaan ruudulla (koe vastaa omistajan kuvaa)`,
      rajanYlla.osuus < 0.5 && rajanYlla.osuus >= 0.3 && rajanYlla.kokonaan === true,
      `osuus ${rajanYlla.osuus} (leveys ${rajanYlla.leveysOsuus}, korkeus ${rajanYlla.korkeusOsuus}), kokonaan ${rajanYlla.kokonaan}`);
    vaadi(`${ruutu.nimi} · 2c. Nostot ikoneineen ja nimiöineen, ei pisteetVain`,
      rajanYlla.nostoja >= 60 && rajanYlla.ikonillisia === rajanYlla.nostoja && rajanYlla.nimiollisia >= 20,
      JSON.stringify(rajanYlla));
  }
  await ctx.close();
}

vaadi('4. Ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));
await selain.close();
palvelin.close();
console.log(`\nYHTEENVETO ${lapi}/${kaikki}`);
process.exit(lapi === kaikki ? 0 : 1);
