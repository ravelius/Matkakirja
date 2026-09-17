/*
 * Savuke: NIMIKYLTTI ON KIINNI KAUPUNGISSA, EI RUUDUSSA.
 *
 * Omistaja 14.9.2026 (Raamattu KARTTAUUDISTUKSEN PAATOKSET 12 kohta 1,
 * sanatarkasti): *"Pariisin nimikyltti liikkuu panoroitaessa. sen pitaa
 * pysya paikallaan."* Sitova tausta on PAATOKSET 2: staattinen
 * käsinpiirretty kartta, jossa kaikki on kiinnitetty karttaan eikä
 * ruutuun.
 *
 * ── VARTIOT ───────────────────────────────────────────────────────
 *
 *   1. KYLTTI PYSYY KIINNI KAUPUNGISSA. Kaupungin nimen ruutulaatikon
 *      keskipiste MIINUS kaupungin oma pallopiste (`getScreenCoords`)
 *      on sama luku ennen ja jälkeen panoroinnin: hajonta ≤ 1 px sekä
 *      x- että y-suunnassa, neljän 100 px:n vedon yli.
 *   2. SAMA KAHDELLA RUUDULLA (390 × 844 ja 1400 × 900) ja KAHDESSA
 *      KAUPUNGISSA (Pariisi, Marseille).
 *   3. NIMI EI KATOA VEDON AIKANA: kyltti on ruudulla joka
 *      mittauksessa, jossa kaupunki on syvällä ruudulla (yli 90 px
 *      joka reunasta). Laidalla lukko purkautuu tarkoituksella
 *      (js/pallolauta/nimet.js RUUDUN REUNA PURKAA LUKON).
 *   8. KOHDEMAAN MERKIT ILMAN KATTOA JA KAUPUNGIN NIMIÖ 11–12 px
 *      saapumisnäkymässä (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 25),
 *      vastakokeena sama aineisto katon kanssa (22 / 62).
 *
 * MITTA ON KAUPUNGIN PIIRRETTY PISTE, EI LAUDAN KOHTA: pallolla
 * kaupungilla on oma pallopiste (js/pallo.js pallonOmatPisteet), ja
 * juuri sen päällä merkki ja nimi ovat — sama lähde, jota osumatesti
 * lukee (docs/raportit/viesti-fable-osumareititys-20260914.md).
 *
 * MITTAUS AJETAAN VEDON JÄLKEEN LEVOSSA, ja veto tehdään aidolla
 * hiirellä kankaaseen (sivu.mouse), jotta ladonta ajautuu vedon aikana
 * juuri niin monta kertaa kuin oikeassa pelissä (js/pallolauta/lauta.js
 * LADONTA KULKEE MUKANA, enintään kerran 200 ms:ssä).
 *
 * VETO EI SAA VIEDÄ KAUPUNKIA RUUDUN LAITAAN: siellä lukko purkautuu
 * tarkoituksella (js/pallolauta/nimet.js RUUDUN REUNA PURKAA LUKON),
 * koska muuten nimi putoaisi kokonaan. Sarja on siksi −100, +200, +200
 * alas, −200 ylös: 200 px kumpaankin suuntaan ilman laitaa.
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1).
 *
 * Aja:  NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-nimikyltti.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { MAAILMANKARTTA } from '../../js/packs/maailmankartta.js';
import { NOSTOSYM_NIMIO_KOKO } from '../../js/fokusnosto-symbolit.js';
import {
  NOSTON_MITAN_KATTO, NOSTON_NIMIO_KATTO_PX, PAAKARTAN_MERKKIKATTO, merkkiPortti,
} from '../../js/pallolauta/nostot.js';
import { RYHMITYKSEN_ETAISYYS_PX, ryhmitaNostot } from '../../js/pallolauta/aihemerkit.js';
import { paakartanNostot } from '../tarkista-nostopaikat.mjs';

const paketti = await import('playwright')
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

/** Suurin sallittu hajonta kyltin ja kaupungin välisessä erossa (px). */
const HAJONNAN_RAJA_PX = 1;
/** Vedot pikseleinä: 200 px itään ja 200 px etelään ilman ruudun laitaa. */
const VEDOT = [[-100, 0], [200, 0], [0, 200], [0, -200]];
/*
 * KYLTIN KOKO SAAPUMISNÄKYMÄSSÄ ENNEN MUUTOSTA (ruutuvakio, mitattu
 * Chromiumilla 14.9.2026 dpr 2, pelaaja Pariisissa). Karttaan sidotun
 * kyltin vertailu on KUNKIN LAITTEEN oma saapuminen, joten saapumisessa
 * koko ei saa muuttua yhdelläkään ruudulla (Fablen päätös 14.9.2026).
 */
const RUUDUT = [
  { nimi: 'puhelin', w: 390, h: 844 },
  { nimi: 'tyopoyta', w: 1400, h: 900 },
];
/*
 * 2560 × 1352 EI OLE MUKANA: kontin Chromium kaatuu siihen kesken
 * vedon (*"GPU process isn't usable. Goodbye."*, mitattu 14.9.2026
 * myös dpr 1:llä). Saman väitteen — saapumisnäkymän kyltti on
 * kaikilla ruuduilla entisen kokoinen — mittaa sen sijaan
 * tests/pallonimikyltti.test.mjs vartio 7 kolmella MITATULLA
 * mittakaavalla (0,6552 / 1,8370 / 2,8483), joista viimeinen on juuri
 * tämän ruudun saapumisnäkymä.
 */
/** Kuinka paljon saapumisnäkymän karttakerroin saa poiketa ykkösestä. */
const SAAPUMISEN_VARA = 0.02;
/*
 * ANKKURIN VARAT (vartio 7, tehtävänannon mitta): kyltin suunta
 * merkistä ±5° ja tekstikorkeuteen suhteutettu etäisyys ±10 %.
 */
const ANKKURIN_KULMAVARA = 5;
const ANKKURIN_ETAISYYSVARA = 0.1;
const KAUPUNGIT = ['pariisi', 'marseille'];
/** Ranskan merkit pääkartalla (savuke-ranska-sisalto FRA_MERKKEJA). */
const FRA_MERKKEJA = 62;
/*
 * Limittyvien nimiöparien katto saapumisnäkymässä (PAATOKSET 27:n
 * mittaus). Mitattu tämän erän jälkeen: työpöydällä 1 pari ja
 * puhelimella 3 — kaikki ERI aiheiden välillä, joita ryhmitys ei
 * sääntönsä mukaan yhdistä. Ennen erää pareja oli 9 ja 11.
 */
const LIMITYSPARIEN_KATTO = 4;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);
const p = (v, n = 2) => (Number.isFinite(v) ? v.toFixed(n) : '—');

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json', '.mp3': 'audio/mpeg',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

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

function tallenne(kaupunki) {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: kaupunki }],
    pack: packById('maailmankartta'),
    seed: 5,
  });
  peli.phase = 'action';
  peli.tokens.delete(kaupunki);
  return JSON.stringify(peli.toJSON());
}

const selain = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });

async function avaaSivu(ruutu, kaupunki) {
  const ctx = await selain.newContext({
    viewport: { width: ruutu.w, height: ruutu.h },
    deviceScaleFactor: 2,
    serviceWorkers: 'block',
  });
  await ctx.addInitScript((d) => {
    try {
      localStorage.setItem('matkakirja-save-v1', d);
      localStorage.removeItem('matkakirja-lauta');
      localStorage.setItem('matkakirja-kehittaja', '1');
    } catch { /* yksityinen tila */ }
  }, tallenne(kaupunki));
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
  await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
  /*
   * SAAPUMINEN AJETAAN LOPPUUN ENNEN MITTAUSTA. Isoisän luentakuva
   * nousee kartalle isona luennan ajaksi ja pienenee vasta sen
   * jälkeen (js/fokusvirta.js), ja iso kuva on nimiladonnalle VARAUS:
   * sen alta nimi väistyy ja palaa kuvan kutistuessa. Se on ajan, ei
   * panoroinnin, aiheuttama siirto — mitattu 14.9.2026, ja se
   * peittäisi juuri sen ilmiön, jota tämä savuke mittaa.
   */
  await sivu.waitForTimeout(42000);
  return { ctx, sivu, virheet };
}

/** Kyltin ruutulaatikon keskipiste MIINUS kaupungin piirretty pallopiste. */
const mittaaSuhde = (sivu, id) => sivu.evaluate((kaupunkiId) => {
  const ui = window.matkakirja.ui;
  const lauta = ui.pallolauta;
  const city = ui.game.pack.cities.find((c) => c.id === kaupunkiId);
  const asteet = lauta.asteet({ x: city.x, y: city.y });
  const piste = asteet ? lauta.pallo.getScreenCoords(asteet.lat, asteet.lon, 0) : null;
  const teksti = document.querySelector(`.pallolauta-nimi[data-kaupunki="${kaupunkiId}"] text`);
  const r = teksti ? teksti.getBoundingClientRect() : null;
  const koti = (document.querySelector('.pallolauta-kotelo') ?? document.body).getBoundingClientRect();
  if (!piste || !r || !(r.width > 0)) {
    return {
      piste,
      kyltti: null,
      syvalla: Boolean(piste) && piste.x > 90 && piste.y > 90
        && piste.x < koti.width - 90 && piste.y < koti.height - 90,
    };
  }
  const koti2 = koti;
  return {
    piste,
    // Onko kaupunki niin syvällä ruudulla, että kyltti mahtuu joka
    // kyljelle? Laidalla ladonta saa yhä pudottaa nimen (nimet.js
    // RUUDUN REUNA PURKAA LUKON), eikä sitä lasketa vikaan.
    syvalla: piste.x > 90 && piste.y > 90
      && piste.x < koti2.width - 90 && piste.y < koti2.height - 90,
    kyltti: {
      x: r.left + r.width / 2 - koti.left,
      y: r.top + r.height / 2 - koti.top,
      w: r.width,
      h: r.height,
    },
    dx: r.left + r.width / 2 - koti.left - piste.x,
    dy: r.top + r.height / 2 - koti.top - piste.y,
  };
}, id);

/** Aito veto kankaalla: sormi alas, kaksikymmentä askelta, ylös, lepo. */
async function veda(sivu, dx, dy) {
  const laatikko = await sivu.evaluate(() => {
    const k = document.querySelector('.pallolauta-kotelo canvas') ?? document.querySelector('canvas');
    const r = k.getBoundingClientRect();
    return { x: r.left, y: r.top, w: r.width, h: r.height };
  });
  const x0 = laatikko.x + laatikko.w / 2;
  const y0 = laatikko.y + laatikko.h / 2;
  await sivu.mouse.move(x0, y0);
  await sivu.mouse.down();
  /*
   * KAHDEKSAN ASKELTA RIITTAA. Veto on aito (kirjaston oma
   * pointermove-ketju) ja kattaa useamman ladonnan
   * (LADONNAN_TAHTI_MS 200 ms); tiheampi ketju vain moninkertaistaa
   * savukkeen keston, koska jokainen askel odottaa pallon piirron.
   */
  for (let i = 1; i <= 8; i += 1) {
    await sivu.mouse.move(x0 + (dx * i) / 8, y0 + (dy * i) / 8);
    await sivu.waitForTimeout(40);
  }
  await sivu.mouse.up();
  await sivu.waitForTimeout(1200);
}

/*
 * 8d. VASTAKOE ILMAN SELAINTA: KATTO TAKAISIN → 22 MERKKIÄ.
 *
 * Selainvartio 8 vaatii, ettei saapumisnäkymässä jää yhtään kohdemaan
 * merkkiä piiloon. Jos merkkejä sattuisi olemaan alle katon, väite
 * menisi läpi ilman että katto on todella poistettu — siksi sama
 * aineisto ajetaan tässä portin läpi ILMAN kohdemaa-lippua: silloin
 * läpi menee enintään PAAKARTAN_MERKKIKATTO + poltettu velka ja
 * loput jäävät lähizoomiin. Mitattu 15.9.2026: 22 / 62 ja 40 piiloon.
 */
{
  /*
   * MERKIT SAMASTA LÄHTEESTÄ KUIN POLTTOKETJU (tools/
   * tarkista-nostopaikat.mjs paakartanNostot) — sama tapa kuin
   * tools/savukkeet/savuke-ranska-sisalto.mjs vartiossa 3. Pelin oma
   * `maanKohdemerkit` ei kelpaa tähän ilman selainta: se lukee
   * lisälähteet ui-rekisteristä, joka on Nodessa tyhjä.
   */
  const { kaikki: rivit, kartalla } = paakartanNostot(MAAILMANKARTTA);
  const elavat = rivit.filter((r) => r.iso === 'FRA' && kartalla.has(r.id));
  const kohdemaa = merkkiPortti(elavat, false, (m) => m, { kohdemaa: true });
  const katollinen = merkkiPortti(elavat, false, (m) => m);
  const paastetyt = katollinen.merkit.length - katollinen.polttovelka.length;
  tieto('vastakoe: FRA merkit portin läpi',
    `kohdemaana ${kohdemaa.merkit.length} / ${elavat.length}, `
    + `katon kanssa ${paastetyt} (piiloon ${katollinen.piiloon.length})`);
  vaadi(`8d. VASTAKOE — ilman kohdemaa-lippua katto ${PAAKARTAN_MERKKIKATTO} puree yhä`,
    paastetyt <= PAAKARTAN_MERKKIKATTO && katollinen.piiloon.length >= 30
      && kohdemaa.merkit.length === elavat.length && elavat.length >= FRA_MERKKEJA,
    `katon kanssa ${paastetyt}, piiloon ${katollinen.piiloon.length}, `
    + `kohdemaana ${kohdemaa.merkit.length} / ${elavat.length}`);
}

/*
 * YKSI SIVU RUUTUA KOHDEN, KAKSI KAUPUNKIA SAMASTA NÄKYMÄSTÄ: pelaaja
 * on Pariisissa ja Marseille näkyy samassa Ranskan saapumisnäkymässä,
 * joten molemmat mitataan samoista vedoista. Kaksi sivua neljän sijaan
 * — savuke ajaa saman mittauksen puolessa ajassa.
 */
for (const ruutu of RUUDUT) {
  const { ctx, sivu, virheet } = await avaaSivu(ruutu, 'pariisi');
  const sarjat = new Map(KAUPUNGIT.map((k) => [k, []]));
  const mittaaKaikki = async () => {
    for (const k of KAUPUNGIT) sarjat.get(k).push(await mittaaSuhde(sivu, k));
  };
  const alkuPov = await sivu.evaluate(() => window.matkakirja.ui.pallolauta.pallo.pointOfView());
  await mittaaKaikki();
  for (const [dx, dy] of VEDOT) {
    await veda(sivu, dx, dy);
    await mittaaKaikki();
  }
  /*
   * 4. NIMIKYLTTI ON KARTAN MITTA (omistajan päätös 14.9.2026
   * klo 15.05 UTC). Kyltin ruutukoon suhde maapaneelin leipätekstiin
   * — joka on jo karttaan sidottu (js/pallolauta/maapaneeli.js) — on
   * sama kolmella zoomilla. Jos kyltti olisi yhä ruutuvakio, suhde
   * muuttuisi zoomin mukana.
   */
  const zoomit = [];
  for (const osuus of [1, 0.85, 0.7, 0.6, 0.35]) {
    const mitta = await sivu.evaluate(async ([kerroin, pov]) => {
      const l = window.matkakirja.ui.pallolauta;
      // Takaisin saapumisnäkymän keskelle: vedot ovat vieneet Pariisin
      // laitaan, eikä laidalta mitata kyltin kokoa.
      l.pallo.pointOfView({ lat: pov.lat, lng: pov.lng, altitude: pov.altitude * kerroin }, 0);
      await new Promise((v) => setTimeout(v, 1400));
      l.ladoHeti();
      await new Promise((v) => setTimeout(v, 400));
      // NIMENOMAAN PELAAJAN KAUPUNKI: `.pallolauta-nimi text` antaisi
      // DOM-järjestyksen ensimmäisen, joka vaihtuu zoomin mukana.
      const teksti = document.querySelector('.pallolauta-nimi[data-kaupunki="pariisi"] text');
      // Karttanoston merkki: sama kerroin kuin kyltillä (nostot.js
      // KARTTANOSTON KYLTTI ON KARTAN MITTA). Mitta luetaan siitä
      // transformista, jota kerros oikeasti kirjoittaa.
      // EI KAUPUNKIMERKKIÄ: sen mitta on 1,35-kertainen (nostot.js
      // KAUPUNKIMERKIN NIMIÖ ON ISOMPI KUIN NOSTON), ja DOM-järjestyksen
      // ensimmäinen merkki vaihtuisi zoomin mukana kaupungin ja noston
      // välillä — suhde 6 mittaisi silloin kahta eri mittaa.
      const nosto = document.querySelector(
        '.pallolauta-nosto:not(.pallolauta-nosto-kaupunki) .pallolauta-nosto-siirto');
      const kaupunkiMerkki = document.querySelector(
        '.pallolauta-nosto-kaupunki .pallolauta-nosto-siirto');
      const kaupunginMitta = kaupunkiMerkki
        ? Number((kaupunkiMerkki.style.transform.match(/scale\(([\d.]+)\)/u) ?? [])[1] ?? 0) : 0;
      const portti = l.nostot?.portti?.() ?? null;
      const nostonMitta = nosto
        ? Number((nosto.style.transform.match(/scale\(([\d.]+)\)/u) ?? [])[1] ?? 0) : 0;
      /*
       * AIHEMERKIT JA VIUHKA (vartio 9, Raamattu KARTTAUUDISTUKSEN
       * PAATOKSET 27). Ryhmien määrä luetaan kerrokselta, limitys
       * samoista nimiölaatikoista kuin sovittelu käytti, ja viuhka
       * kokeillaan saapumisnäkymässä (kerroin 1) napauttamalla
       * suurinta aihemerkkiä — sama kutsu kuin sormella.
       */
      const aihemerkit = l.nostot?.aihemerkit?.() ?? [];
      const laput = l.nostot?.lappuLaatikot?.() ?? [];
      const limittyy = (a, b) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;
      let pareja = 0;
      for (let i = 0; i < laput.length; i += 1) {
        for (let j = i + 1; j < laput.length; j += 1) if (limittyy(laput[i], laput[j])) pareja += 1;
      }
      let viuhka = null;
      if (kerroin === 1 && aihemerkit.length) {
        const suurin = [...aihemerkit].sort((a, b) => b.maara - a.maara)[0];
        l.napautaNosto(suurin.id);
        await new Promise((v) => setTimeout(v, 300));
        l.ladoHeti();
        await new Promise((v) => setTimeout(v, 300));
        const koti = (document.querySelector('.pallo-kotelo') ?? document.body).getBoundingClientRect();
        const laatikot = l.nostot?.viuhkanOsumalaatikot?.() ?? [];
        viuhka = {
          jasenia: suurin.maara,
          kohtia: laatikot.length,
          ruudulla: laatikot.filter((b) => b.x0 >= 0 && b.y0 >= 0
            && b.x1 <= koti.width && b.y1 <= koti.height).length,
          auki: Boolean(l.nostot?.viuhkaAuki?.()),
          kohtia_dom: document.querySelectorAll('.pallolauta-viuhka-kohta').length,
        };
        l.nostot.suljeViuhka();
        l.ladoHeti();
        await new Promise((v) => setTimeout(v, 200));
        viuhka.sulkeutui = !l.nostot?.viuhkaAuki?.();
      }
      const arvo = document.querySelector('.pallolauta-maapaneeli .maapaneeli-arvo');
      const paneeli = document.querySelector('.pallolauta-maapaneeli .maapaneeli-kortti');
      const skaala = paneeli
        ? Number((paneeli.style.transform.match(/scale\(([\d.]+)\)/u) ?? [])[1] ?? 1) : 1;
      const perus = arvo ? parseFloat(getComputedStyle(arvo).fontSize) : 0;
      /*
       * KYLTIN ANKKURI MERKKIIN NÄHDEN (vartio 7, Raamattu
       * KARTTAUUDISTUKSEN PAATOKSET 24). Mitta on tekstin keskipiste
       * MIINUS oman CSS2D-solmun keskipiste: solmu on kaupungin
       * pisteessä (translate(-50%, -50%), css/styles.css), joten sen
       * 1 × 1 -laatikon keskipiste ON merkin paikka ruudulla.
       * `getScreenCoords(lat, lon, 0)` ei kelpaa tähän: se on eri
       * korkeudella kuin merkkikerros, ja ero kasvaa zoomatessa —
       * silloin mitta liikkuisi, vaikka kyltti olisi paikallaan.
       */
      const kyltit = [...document.querySelectorAll('.pallolauta-nimi')].map((el) => {
        const t = el.querySelector('text');
        const r = t ? t.getBoundingClientRect() : null;
        const a = el.getBoundingClientRect();
        const koko = t ? Number(t.getAttribute('font-size')) : 0;
        if (!r || !(r.width > 0) || !(koko > 0)) return null;
        const dx = r.left + r.width / 2 - (a.left + a.width / 2);
        const dy = r.top + r.height / 2 - (a.top + a.height / 2);
        return {
          id: el.dataset.kaupunki,
          kulma: (Math.atan2(dy, dx) * 180) / Math.PI,
          suhde: Math.hypot(dx, dy) / koko,
          ank: t.getAttribute('text-anchor'),
        };
      }).filter(Boolean);
      return {
        kyltit,
        alt: l.pallo.pointOfView().altitude,
        kyltti: teksti ? Number(teksti.getAttribute('font-size')) : 0,
        paneeli: perus * skaala,
        karttaskaala: l.kamera.nakyvaAlue()?.skaala ?? 0,
        // Vertailu on laudan oma saapumisskaala: karttakerroin on
        // uloimmalla sallitulla zoomilla tasan 1 joka ruudulla.
        vertailuskaala: l.saapumisenSkaala?.() ?? 0,
        nostonMitta,
        /*
         * KOHDEMAAN MERKIT JA KAUPUNGIN NIMIÖ (vartio 8, Raamattu
         * KARTTAUUDISTUKSEN PAATOKSET 25). Portin luvut tulevat
         * kerrokselta itseltään, kaupunkimerkin mitta sen omasta
         * transformista — sama lukutapa kuin nostolla yllä.
         */
        portinMerkkeja: portti?.merkit?.length ?? 0,
        portinPiiloon: portti?.piiloon?.length ?? 0,
        kaupunkeja: document.querySelectorAll('.pallolauta-nosto-kaupunki').length,
        kaupunginMitta,
        aihemerkkeja: aihemerkit.length,
        aiheryhmissa: aihemerkit.reduce((a, r) => a + r.maara, 0),
        lappuja: laput.length,
        limitysPareja: pareja,
        viuhka,
      };
    }, [osuus, alkuPov]);
    zoomit.push(mitta);
  }
  tieto(`${ruutu.nimi} · kyltti kolmella zoomilla`,
    zoomit.map((z) => `alt ${p(z.alt, 4)}: kyltti ${p(z.kyltti, 2)} px, `
      + `paneelin teksti ${p(z.paneeli, 2)} px, karttaskaala ${p(z.karttaskaala, 3)}`).join(' | '));
  /*
   * SUHDE MITATAAN NIILTÄ ZOOMEILTA, JOILLA KYLTTI ON OLEMASSA.
   * Syvimmällä zoomilla työpöydällä kyltti kasvaa karttasidonnan myötä
   * niin isoksi (karttaskaala 5,2 → ≈ 39 px), ettei se enää mahdu
   * nappulan ja maapaneelin väliin ja ladonta pudottaa sen — se on
   * MITTAUSTULOS eikä tämän vartion asia (ks. raportti). Kyltin
   * olemassaolon vartioi vartio 3.
   */
  const olemassa = zoomit.filter((z) => z.kyltti > 0 && z.paneeli > 0);
  const suhteet = olemassa.map((z) => z.kyltti / z.paneeli);
  const keski = suhteet.reduce((a, b) => a + b, 0) / (suhteet.length || 1);
  const ero = suhteet.length >= 2
    ? (Math.max(...suhteet) - Math.min(...suhteet)) / keski : Infinity;
  vaadi(`4. ${ruutu.nimi}: kyltti / maapaneelin teksti sama zoomista riippumatta `
    + `(${olemassa.length} tasoa, ±3 %)`,
    ero <= 0.03, `hajonta ${p(100 * ero, 2)} %`);

  /*
   * 5. SAAPUMISNÄKYMÄ EI MUUTU. Vertailu on kunkin laitteen oma
   * saapuminen, joten uloimmalla sallitulla zoomilla kyltti on
   * täsmälleen entisen kokoinen joka ruudulla (Fablen päätös).
   */
  const alku = zoomit[0];
  const kerroinSaapuessa = alku?.vertailuskaala > 0 ? alku.karttaskaala / alku.vertailuskaala : 0;
  const poikkeama = kerroinSaapuessa > 0 ? Math.abs(kerroinSaapuessa - 1) : Infinity;
  tieto(`${ruutu.nimi} · saapumisnäkymä`,
    `kyltti ${p(alku?.kyltti, 2)} px, karttaskaala ${p(alku?.karttaskaala, 3)}, `
    + `vertailu ${p(alku?.vertailuskaala, 3)}, kerroin ${p(kerroinSaapuessa, 4)}`);
  vaadi(`5. ${ruutu.nimi}: saapumisnäkymän kyltti on entinen `
    + `(karttakerroin 1 ±${100 * SAAPUMISEN_VARA} %)`,
    poikkeama <= SAAPUMISEN_VARA, `kerroin ${p(kerroinSaapuessa, 4)}`);

  /*
   * 6. KARTTANOSTON KYLTTI SKAALAUTUU SAMALLA KERTOIMELLA. Noston
   * merkin mitta jaettuna kaupungin kyltin koolla on sama luku joka
   * zoomilla — eli molemmat seuraavat samaa karttakerrointa.
   *
   * KATON ALAPUOLELTA (16.9.2026, Raamattu KARTTAUUDISTUKSEN PAATOKSET
   * 31 kohta 2). Noston nimiöllä on nyt RUUTUPIKSELIKATTO
   * (js/pallolauta/nostot.js NOSTON_MITAN_KATTO): katon yläpuolella se
   * EI enää seuraa kerrointa, ja juuri se on korjaus eikä vika.
   * Suhdemittaus ajetaan siksi niillä zoomtasoilla, joilla katto ei
   * pure — sarjan 0,35 on katon takana (mitattu: mitta 2,269 → 1,4545)
   * — ja katto itse mitataan omana vartionaan 6b. Sama koskee
   * kaupunkimerkkiä, jonka katto puree jo 0,72:ssa; kaupungin
   * NIMIKYLTTIIN (`kyltti`) katto ei koske lainkaan, joten se on yhä
   * puhdas kartan mitta ja kelpaa vertailuksi.
   */
  const KATON_VARA = 1e-3;
  const parit6 = zoomit.filter((z) => z.kyltti > 0 && z.nostonMitta > 0
    && z.nostonMitta < NOSTON_MITAN_KATTO - KATON_VARA);
  const suhteet6 = parit6.map((z) => z.nostonMitta / z.kyltti);
  const keski6 = suhteet6.reduce((a, b) => a + b, 0) / (suhteet6.length || 1);
  const ero6 = suhteet6.length >= 2
    ? (Math.max(...suhteet6) - Math.min(...suhteet6)) / keski6 : Infinity;
  tieto(`${ruutu.nimi} · noston mitta zoomeittain`,
    zoomit.map((z) => `${p(z.nostonMitta, 4)}`).join(' | '));
  vaadi(`6. ${ruutu.nimi}: karttanoston kyltti seuraa samaa kerrointa `
    + `katon alapuolella (${parit6.length} tasoa, ±3 %)`,
    parit6.length >= 2 && ero6 <= 0.03,
    `hajonta ${p(100 * ero6, 2)} %, tasoja ${parit6.length}`);
  /*
   * 6b. KATTO PUREE SISIMMÄLLÄ ZOOMILLA (PAATOKSET 31 kohta 2:
   * *"nimiö ei kasva yli n. 16 px ruudulla"*). Sarjan viimeinen taso
   * on lähizoomin puolella, ja siellä noston mitan on oltava
   * TÄSMÄLLEEN katossa — ei sen alla (katto ei purisi) eikä yli.
   * Syvemmän zoomin koko mittaus on omassa savukkeessaan
   * (tools/savukkeet/savuke-pariisi-lahizoom.mjs).
   */
  const sisinTaso = zoomit[zoomit.length - 1];
  const sisinNimio = sisinTaso.nostonMitta * NOSTOSYM_NIMIO_KOKO;
  tieto(`${ruutu.nimi} · noston nimiö sisimmällä mitatulla zoomilla`,
    `${p(sisinNimio)} px (katto ${p(NOSTON_NIMIO_KATTO_PX)} px)`);
  vaadi(`6b. ${ruutu.nimi}: noston nimiö ei ylitä ${NOSTON_NIMIO_KATTO_PX} px:n kattoa`,
    sisinNimio > 0 && sisinNimio <= NOSTON_NIMIO_KATTO_PX + 0.1,
    `${p(sisinNimio)} px`);

  /*
   * 8. KOHDEMAAN MERKIT ILMAN KATTOA JA KAUPUNGIN ISOMPI NIMIÖ
   * (omistaja 15.9.2026 klo 17.20 UTC, Raamattu KARTTAUUDISTUKSEN
   * PAATOKSET 25: *"Kohdemaalle ei kattoa"*, *"Isommaksi, n. 11-12
   * px"*). Mitta on SAAPUMISNÄKYMÄ eli sarjan ensimmäinen taso
   * (kerroin 1): siinä portti oli ennen tätä erää kiinni ja katto
   * voimassa, ja juuri siitä omistaja kysyi, miksi Ranskan nostot ja
   * muut kaupungit puuttuvat.
   */
  const saapuen = zoomit[0];
  tieto(`${ruutu.nimi} · saapumisnäkymän portti`,
    `päästää ${saapuen.portinMerkkeja}, piiloon ${saapuen.portinPiiloon}, `
    + `kaupunkimerkkejä ${saapuen.kaupunkeja}, kaupungin mitta ${p(saapuen.kaupunginMitta, 4)}`);
  vaadi(`8. ${ruutu.nimi}: saapumisnäkymässä ei jää yhtään kohdemaan merkkiä piiloon`,
    saapuen.portinPiiloon === 0 && saapuen.portinMerkkeja >= FRA_MERKKEJA,
    `päästää ${saapuen.portinMerkkeja}, piiloon ${saapuen.portinPiiloon}`);
  const kaupunginNimio = saapuen.kaupunginMitta * NOSTOSYM_NIMIO_KOKO;
  vaadi(`8b. ${ruutu.nimi}: lisäkaupungin nimiö on saapumiszoomilla 11–12 px`,
    saapuen.kaupunkeja > 0 && kaupunginNimio >= 11 && kaupunginNimio <= 12,
    `${p(kaupunginNimio, 2)} px, kaupunkimerkkejä ${saapuen.kaupunkeja}`);
  const nostonNimio = saapuen.nostonMitta * NOSTOSYM_NIMIO_KOKO;
  vaadi(`8c. ${ruutu.nimi}: noston nimiö on pienempi kuin kaupungin `
    + '(PAATOKSET 25 kohta 3)',
    nostonNimio > 0 && nostonNimio < kaupunginNimio,
    `nosto ${p(nostonNimio, 2)} px, kaupunki ${p(kaupunginNimio, 2)} px`);

  /*
   * 9. AIHEMERKIT JA VIUHKA (omistaja 15.9.2026 klo 20.00 UTC,
   * Raamattu KARTTAUUDISTUKSEN PAATOKSET 27: *"Tee saman aiheen
   * nostot yhdeksi ilman selitettyä. Klikattaessa vaihtoehdot tulevat
   * viuhkana näkyviin nimien kanssa"*).
   *
   * Mitat ovat samasta sarjasta kuin muutkin: saapuminen on kerroin 1
   * ja sarjan viimeinen taso (0,35) on syvällä lähizoomin puolella.
   *
   * VARTIO 9e ON KUMOTTU 16.9.2026 (Raamattu KARTTAUUDISTUKSEN
   * PAATOKSET 31). Se vaati, ettei lähizoomilla ole yhtään
   * aihemerkkiä — ja juuri se sääntö piilotti Pariisin nostot: portti
   * hajotti rykelmän jo osuudella 0,7, vaikka sen lyhin keskinäinen
   * ruutuväli on sisimmälläkin zoomilla 39,2 px eli alle sormen
   * 44 px:n. Ryhmitys noudattaa nyt PAATOKSET 27 kohtaa 3
   * sellaisenaan (pelkkä limitys).
   *
   * UUTTA VÄITETTÄ EI VOI TEHDÄ TÄSSÄ, ja se on syytä sanoa ääneen:
   * tämän savukkeen zoomisarja katsoo SAAPUMISNÄKYMÄN KESKIPISTETTÄ
   * (`alkuPov`), ei Pariisia, joten tasolla 0,35 Pariisin rykelmä on
   * ruudun ulkopuolella eikä aihemerkkien määrä kerro säännöstä
   * mitään suuntaan tai toiseen (mitattu 16.9.2026: 0 merkkiä).
   * Lähizoomin ryhmitys mitataan siellä, missä kamera on Pariisin
   * päällä: tools/savukkeet/savuke-pariisi-lahizoom.mjs vartiot 3, 3b
   * ja 3c. Tässä luku jää INFO-riviksi.
   */
  const sisalla = zoomit[zoomit.length - 1];
  tieto(`${ruutu.nimi} · aihemerkit`,
    `saapuen ${saapuen.aihemerkkeja} merkkiä / ${saapuen.aiheryhmissa} nostoa, `
    + `limityspareja ${saapuen.limitysPareja} (${saapuen.lappuja} nimiötä); `
    + `lähizoomilla ${sisalla.aihemerkkeja}`);
  vaadi(`9a. ${ruutu.nimi}: saapumisnäkymässä syntyy aihemerkkejä (Pariisin rykelmä)`,
    saapuen.aihemerkkeja >= 1 && saapuen.aiheryhmissa >= 2,
    `${saapuen.aihemerkkeja} merkkiä, ${saapuen.aiheryhmissa} nostoa`);
  vaadi(`9b. ${ruutu.nimi}: limittyviä nimiöpareja enintään ${LIMITYSPARIEN_KATTO}`,
    saapuen.limitysPareja <= LIMITYSPARIEN_KATTO, `${saapuen.limitysPareja} paria`);
  vaadi('9c. ' + `${ruutu.nimi}: viuhka avautuu ja jokainen kohta mahtuu ruudulle`,
    Boolean(saapuen.viuhka) && saapuen.viuhka.auki
      && saapuen.viuhka.kohtia === saapuen.viuhka.jasenia
      && saapuen.viuhka.ruudulla === saapuen.viuhka.kohtia
      && saapuen.viuhka.kohtia_dom === saapuen.viuhka.kohtia,
    saapuen.viuhka
      ? `kohtia ${saapuen.viuhka.kohtia}/${saapuen.viuhka.jasenia}, ruudulla `
        + `${saapuen.viuhka.ruudulla}, DOMissa ${saapuen.viuhka.kohtia_dom}`
      : 'viuhkaa ei avattu');
  vaadi(`9d. ${ruutu.nimi}: viuhka sulkeutuu`,
    Boolean(saapuen.viuhka?.sulkeutui), 'jäi auki');
  tieto(`${ruutu.nimi} · 9e KUMOTTU (PAATOKSET 31)`,
    `aihemerkkejä sarjan sisimmällä tasolla ${sisalla.aihemerkkeja} — `
    + 'kamera katsoo saapumisen keskipistettä, ei Pariisia; lähizoomin '
    + 'ryhmityksen mittaa savuke-pariisi-lahizoom');
  /*
   * 9f. VASTAKOE ILMAN SELAINTA: sama ryhmitys, mutta merkit
   * kaukana toisistaan eivätkä nimiöt koske — yksikään ryhmä ei saa
   * syntyä (PAATOKSET 27 kohta 4: maan laajat yksittäiset nostot
   * näkyvät nimiöin heti).
   */
  const kaukana = [0, 1, 2, 3].map((i) => ({
    avain: `k${i}`,
    aihe: 'historia',
    p: { x: 100 + i * 4 * RYHMITYKSEN_ETAISYYS_PX, y: 100 },
  }));
  const vastakoe = ryhmitaNostot(kaukana, (m) => ({
    x0: m.p.x - 5, y0: m.p.y - 5, x1: m.p.x + 5, y1: m.p.y + 5,
  }));
  vaadi('9f. vastakoe: kaukana toisistaan olevat saman aiheen nostot eivät ryhmity',
    vastakoe.ryhmat.length === 0 && vastakoe.yksin.length === kaukana.length,
    `${vastakoe.ryhmat.length} ryhmää`);

  /*
   * 7. KYLTIN ANKKURI ON KIINTEÄ KAIKILLA ZOOMEILLA (omistaja
   * 15.9.2026, Raamattu KARTTAUUDISTUKSEN PAATOKSET 24: *"nyt ne
   * hyppivat eri puolille kaupungin merkkia. pitaisi pysya samassa
   * kohdassa"*, ja *"koko voi muuttua"*). Jokaiselle kaupungille,
   * jonka kyltti on olemassa vähintään kahdella tämän sarjan
   * zoomtasolla: sama kylki (text-anchor), suunta ±ANKKURIN_KULMAVARA
   * astetta ja tekstikorkeuteen suhteutettu etäisyys
   * ±ANKKURIN_ETAISYYSVARA.
   */
  const ankkurit = new Map();
  for (const z of zoomit) {
    for (const k of z.kyltit ?? []) {
      if (!ankkurit.has(k.id)) ankkurit.set(k.id, []);
      ankkurit.get(k.id).push(k);
    }
  }
  const hajonta = (luvut) => Math.max(...luvut) - Math.min(...luvut);
  let mitattuja = 0;
  for (const [id, sarja] of ankkurit) {
    if (sarja.length < 2) continue;
    mitattuja += 1;
    const kulmat = sarja.map((k) => k.kulma);
    const suhteet7 = sarja.map((k) => k.suhde);
    const keski7 = suhteet7.reduce((a, b) => a + b, 0) / suhteet7.length;
    tieto(`${ruutu.nimi}/${id} · ankkuri zoomeittain`,
      sarja.map((k) => `${p(k.kulma, 1)}° / ${p(k.suhde, 2)}× ${k.ank}`).join('  |  '));
    vaadi(`7a. ${ruutu.nimi}/${id}: kylki sama kaikilla zoomeilla (${sarja.length} tasoa)`,
      sarja.every((k) => k.ank === sarja[0].ank), sarja.map((k) => k.ank).join('/'));
    vaadi(`7b. ${ruutu.nimi}/${id}: suunta pysyy (±${ANKKURIN_KULMAVARA}°)`,
      hajonta(kulmat) <= 2 * ANKKURIN_KULMAVARA, `hajonta ${p(hajonta(kulmat), 1)}°`);
    vaadi(`7c. ${ruutu.nimi}/${id}: etäisyys tekstikorkeuteen suhteutettuna pysyy `
      + `(±${100 * ANKKURIN_ETAISYYSVARA} %)`,
      hajonta(suhteet7) <= 2 * ANKKURIN_ETAISYYSVARA * keski7,
      `hajonta ${p((100 * hajonta(suhteet7)) / keski7, 1)} %`);
  }
  vaadi(`7. ${ruutu.nimi}: ankkuri mitattiin vähintään yhdestä kaupungista`,
    mitattuja > 0, `${mitattuja} kaupunkia kahdella zoomtasolla`);

  if (KUVAKANSIO) {
    await sivu.screenshot({
      // JPEG eikä PNG: raportin kuvien katto on 300 kt, ja työpöydän
      // ruutu on png:nä lähes megatavu.
      path: join(KUVAKANSIO, `nimikyltti-${ruutu.nimi}.jpg`),
      type: 'jpeg',
      quality: 72,
      scale: 'css',
      timeout: 120000,
    });
  }
  await ctx.close();
  for (const kaupunki of KAUPUNGIT) {
    const sarja = sarjat.get(kaupunki);
    const syvat = sarja.filter((m) => m.syvalla);
    const nakyvia = syvat.filter((m) => m.kyltti).length;
    /*
     * PELAAJAN OMA KAUPUNKI EI SAA KADOTA TYÖPÖYDÄLLÄ LAINKAAN.
     * Muualla sallitaan yksi pudotus: nimibudjetti on puhelimen
     * saapumisnäkymässä vain kourallinen nimiä (js/pallolauta/nimet.js
     * NIMIBUDJETTI ZOOMTASON MUKAAN), ja sivukaupungin nimi väistyy
     * tärkeämpien tieltä, kun näkymä siirtyy — mitattu 14.9.2026.
     */
    const sallitutPudotukset = (kaupunki === 'pariisi' && ruutu.w >= 700) ? 0 : 2;
    if (nakyvia === 0) {
      // Nimi ei mahdu tämän ruudun nimibudjettiin lainkaan (puhelimella
      // Marseille, kun pelaaja on Pariisissa) — ei mitattavaa.
      tieto(`${ruutu.nimi}/${kaupunki} · 3 ohitettu`,
        'kyltti ei ollut ruudulla kertaakaan (nimibudjetti)');
    } else {
      vaadi(`3. ${ruutu.nimi}/${kaupunki}: kyltti näkyy, kun kaupunki on syvällä ruudulla `
        + `(pudotuksia ≤ ${sallitutPudotukset})`,
        syvat.length - nakyvia <= sallitutPudotukset, `${nakyvia}/${syvat.length}`);
    }
    /*
     * MITTA ON PERÄKKÄISTEN VEDON JÄLKEISTEN MITTAUSTEN ERO, ei koko
     * sarjan hajonta: omistajan ilmiö on *"kyltti liikkuu
     * panoroitaessa"*, eli kyltti on ruudulla ennen vetoa ja sen
     * jälkeen mutta eri kohdassa. Jos kyltti katoaa välissä kokonaan,
     * kyseessä on eri vika — sen mittaa vartio 3.
     */
    const parit = [];
    for (let i = 1; i < sarja.length; i += 1) {
      if (sarja[i - 1].kyltti && sarja[i].kyltti) {
        parit.push({
          dx: Math.abs(sarja[i].dx - sarja[i - 1].dx),
          dy: Math.abs(sarja[i].dy - sarja[i - 1].dy),
        });
      }
    }
    const suurin = (avain) => (parit.length ? Math.max(...parit.map((v) => v[avain])) : Infinity);
    tieto(`${ruutu.nimi}/${kaupunki} kyltin ero kaupungista`,
      sarja.map((m) => (m.kyltti ? `${p(m.dx, 1)}/${p(m.dy, 1)}` : 'ei kylttiä')).join('  →  '));
    if (parit.length === 0) {
      /*
       * Ei yhtään vedon yli säilynyttä kyltti-paria: kaupungin nimi ei
       * mahdu tämän ruudun nimibudjettiin (puhelimella Marseille, kun
       * pelaaja on Pariisissa). Silloin ei ole mitään mitattavaa — se
       * ei ole tämän vartion vika eikä sen onnistuminen.
       */
      tieto(`${ruutu.nimi}/${kaupunki} · 1–2 ohitettu`,
        'kyltti ei ollut ruudulla kahdessa peräkkäisessä mittauksessa (nimibudjetti)');
    } else {
      vaadi(`1. ${ruutu.nimi}/${kaupunki}: ero x pysyy vedon yli (≤ ${HAJONNAN_RAJA_PX} px)`,
        suurin('dx') <= HAJONNAN_RAJA_PX, `suurin siirto ${p(suurin('dx'))} px`);
      vaadi(`2. ${ruutu.nimi}/${kaupunki}: ero y pysyy vedon yli (≤ ${HAJONNAN_RAJA_PX} px)`,
        suurin('dy') <= HAJONNAN_RAJA_PX, `suurin siirto ${p(suurin('dy'))} px`);
    }
  }
  vaadi(`${ruutu.nimi}: ei js-virheitä`, virheet.length === 0, virheet[0] ?? '');
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
