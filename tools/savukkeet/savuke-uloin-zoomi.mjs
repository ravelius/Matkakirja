/*
 * Savuke: ULOIN ZOOMI — koko lauta ruudulle, kerran, paperi ympärille.
 *
 * === MIKÄ VIKA OLI (mitattu 2.9.2026, Chromium, kehittäjän
 * maailmanäkymä, uloin zoomiporras) =================================
 *
 * Omistajan havainto, sanatarkasti: *"Jos ruutu on vaakamuotoinen,
 * niin silloin pitäisi pystyä zoomaamaan ulos niin paljon, että kartta
 * näkyy kokonaisena. nyt jostain syystä yläosa hyppää näkymättömiin."*
 *
 * Uloin mittakaava ei ollut laudan sovitus vaan kiertävän kartan
 * saumavara (js/kartta.js rajaaSkaala): se nosti mittakaavan arvoon
 * paneeli / (lauta x 0,97), eli kolme prosenttia yli sen, mihin lauta
 * juuri mahtuisi. Vaakaruudulla leveys on rajoittava mitta, joten
 * korkeus ei enää mahtunut. Mitattu (arkki = lauta reunuksineen,
 * karttaruutu = ylä- ja alapalkin väliin jäävä alue):
 *
 *     ruutu        karttaruutu   arkin ylä/ala   leikkautui
 *     2000x1300      67…1290        57…1300      10 px + 10 px
 *     2560x1080      67…1070      -285…1310     352 px + 240 px
 *     1440x900       67…890        -23…868       90 px
 *     834x1112       67…1102       329…840       mahtui (pystyruutu)
 *
 * Korjauksen jälkeen samat ruudut (arkki kokonaan karttaruudun sisällä
 * ja sivuille jäävä tyhjä on pergamenttia):
 *
 *     2000x1300     82…1275     20…1980
 *     2560x1080     72…953     557…2003
 *     1440x900      72…774     144…1296
 *     834x1112     340…830      15…819
 *
 * === MITÄ TÄMÄ SAVUKE VARTIOI =====================================
 *
 *   1. ULOIN ZOOMI SOVITTAA KOKO LAUDAN. Arkin kaikki neljä reunaa
 *      (astelukemat, kompassi, painotiedot) ovat karttaruudun sisällä
 *      jokaisella koolla. Tämä on omistajan havainto suoraan mitattuna.
 *   2. LAUTA PIIRTYY KERRAN. Kierron <use>-kopio on piilossa ja laudan
 *      juuriryhmä on leikattu arkin levyiseksi (css .lauta-kokonaan),
 *      joten maailma ei toistu ruudun laidassa.
 *   3. ULKOPUOLI ON PAPERIA. Arkin ulkopuolelta poimittu pikseli on
 *      pergamenttia — ei paneelin tummaa taustaa (#241a12) eikä
 *      kartan merta.
 *
 * === VERKKO =======================================================
 *
 * Ämpäriin ei mennä. Laattapyramidi (js/laattapyramidi.js) on pelin
 * ainoa karttapohja, joten se korvataan tässä TEKOLUETTELOLLA ja
 * yhdellä yksivärisellä laatalla: kartta-ala on silloin tunnettua
 * sinistä ja arkin ulkopuoli pergamenttia, ja väite 3 voi mitata eron
 * pikselistä. Luettelon mitat (arkki, rajaus, projektio) ovat oikean
 * luettelon lukuja — geometria on juuri se, jota tämä savuke mittaa.
 */
import http from 'node:http';
import { deflateSync } from 'node:zlib';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

// Playwright repon node_modulesista, muuten kontin globaalista (README).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.webp': 'image/webp', '.geojson': 'application/json', '.woff2': 'font/woff2',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/?lauta=kartta`;

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};

/* ------------------------------------------------ tekolaattapyramidi */

// Oikean luettelon mitat (pyramidi.json 2.9.2026): arkki on lauta
// reunuksineen, ja juuri se on tämän savukkeen mittatikku.
const ARKKI = { x: 0, y: -1046.3149255312064, w: 12000, h: 7307.715927310571 };
const LUETTELO = {
  versio: 'savuke',
  lauta: 'maailmankartta',
  projektio: { tyyppi: 'miller', leveys: 12000, lon0: -175, pohjoinen: 76 },
  laatta: 512,
  muoto: 'png',
  patina: 'taysi',
  arkki: ARKKI,
  rajaus: { x: 0, y: -611.3149255312065, w: 12000, h: 6422.715927310571 },
  kehys: { yla: 232, ala: 240 },
  // Ilman laatasto-bittikarttaa jokainen laatta on olemassa
  // (js/laattapyramidi.js laattaOlemassa), eli kartta-ala täyttyy.
  tasot: [
    { z: 0, leveys: 675, korkeus: 411, pikseliaPerYksikko: 0.05625, sarakkeita: 2, riveja: 1 },
    { z: 1, leveys: 1350, korkeus: 822, pikseliaPerYksikko: 0.1125, sarakkeita: 3, riveja: 2 },
    { z: 2, leveys: 2700, korkeus: 1644, pikseliaPerYksikko: 0.225, sarakkeita: 6, riveja: 4 },
  ],
};

/** Yksivärinen 1 x 1 PNG ilman riippuvuuksia (venytetään laatan kokoiseksi). */
function pngVarista([r, g, b]) {
  const crcTaulu = [...Array(256)].map((_, n) => {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    return c >>> 0;
  });
  const crc = (buf) => {
    let c = 0xffffffff;
    for (const tavu of buf) c = crcTaulu[(c ^ tavu) & 0xff] ^ (c >>> 8);
    return (c ^ 0xffffffff) >>> 0;
  };
  const lohko = (tyyppi, data) => {
    const nimi = Buffer.from(tyyppi, 'ascii');
    const pituus = Buffer.alloc(4);
    pituus.writeUInt32BE(data.length);
    const summa = Buffer.alloc(4);
    summa.writeUInt32BE(crc(Buffer.concat([nimi, data])));
    return Buffer.concat([pituus, nimi, data, summa]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(1, 0); ihdr.writeUInt32BE(1, 4);
  ihdr[8] = 8; ihdr[9] = 2; // 8 bittiä, RGB
  const idat = deflateSync(Buffer.from([0, r, g, b]));
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    lohko('IHDR', ihdr), lohko('IDAT', idat), lohko('IEND', Buffer.alloc(0)),
  ]);
}

const MERI = [0, 90, 190];
const MERILAATTA = pngVarista(MERI);

/* ------------------------------------------------------------ ajo */

const KOOT = [
  { nimi: '2000x1300', width: 2000, height: 1300, dpr: 1 },
  { nimi: '2560x1080', width: 2560, height: 1080, dpr: 1 },
  { nimi: '1440x900', width: 1440, height: 900, dpr: 1 },
  { nimi: '834x1112', width: 834, height: 1112, dpr: 2 },
];

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

for (const koko of KOOT) {
  const ctx = await selain.newContext({
    viewport: { width: koko.width, height: koko.height },
    deviceScaleFactor: koko.dpr,
    serviceWorkers: 'block',
  });
  const sivu = await ctx.newPage();
  // Kehittäjän maailmanäkymä päälle ennen ensimmäistäkään moduulia:
  // pelissä loitonnusta rajaa maan fokusikkuna, ja tämä savuke mittaa
  // koko laudan näkymää (js/ui-apurit.js).
  await sivu.addInitScript(() => {
    try {
      localStorage.setItem('matkakirja-kehittaja', '1');
      localStorage.setItem('matkakirja-kehittaja-maailma', '1');
    } catch { /* yksityinen tila: savuke ajaa ilman */ }
  });
  await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
  // JÄRJESTYS: Playwright kokeilee reittejä VIIMEKSI LISÄTTY ENSIN,
  // joten ämpärin yleinen katkaisu rekisteröidään ennen pyramidin
  // omaa reittiä — muuten se söisi myös tekolaatat.
  await sivu.route('**r2.dev/**', (route) => route.abort());
  await sivu.route('**/julisteet/pyramidi/**', (route) => {
    const url = route.request().url();
    if (url.endsWith('pyramidi.json')) {
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(LUETTELO) });
      return;
    }
    if (url.endsWith('.png')) {
      route.fulfill({ status: 200, contentType: 'image/png', body: MERILAATTA });
      return;
    }
    route.fulfill({ status: 404, body: 'ei' });
  });

  await sivu.goto(osoite, { waitUntil: 'load' });
  await sivu.waitForTimeout(2000);
  await sivu.evaluate(() => {
    [...document.querySelectorAll('button')]
      .find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
  });
  await sivu.waitForTimeout(1200);
  await sivu.evaluate(() => {
    const g = window.matkakirja.game;
    if (g.phase === 'pickstart') g.actionPickStart('ateena', 0);
    window.matkakirja.ui.render();
  });
  // Saapumisajo ja lehden asennus rauhassa loppuun.
  await sivu.waitForTimeout(6000);
  // Loitonnus rajaan asti: painike palauttaa false, kun porras ei muutu.
  for (let i = 0; i < 12; i++) {
    const muuttui = await sivu.evaluate(() => window.matkakirja.ui.kartta.zoomaaPainikkeella(-1));
    await sivu.waitForTimeout(600);
    if (!muuttui) break;
  }
  await sivu.waitForTimeout(2500);

  const tila = await sivu.evaluate(() => {
    const ui = window.matkakirja.ui;
    const pane = ui.mapPane.getBoundingClientRect();
    const box = ui.contentBox;
    const svgR = ui.svg.getBoundingClientRect();
    const vb = ui.svg.getAttribute('viewBox').split(/\s+/).map(Number);
    const skX = svgR.width / vb[2];
    const skY = svgR.height / vb[3];
    const kierto = document.querySelector('.lauta-kierto');
    const juuri = document.querySelector('.board-root');
    return {
      pane: {
        left: pane.left, right: pane.right, top: pane.top, bottom: pane.bottom,
      },
      lauta: {
        vasen: svgR.left + (box.x - vb[0]) * skX,
        oikea: svgR.left + (box.x + box.w - vb[0]) * skX,
        yla: svgR.top + (box.y - vb[1]) * skY,
        ala: svgR.top + (box.y + box.h - vb[1]) * skY,
      },
      skaala: skX,
      kokonaan: ui.svg.classList.contains('lauta-kokonaan'),
      kiertoNakyy: kierto ? getComputedStyle(kierto).display !== 'none' : null,
      leikkaus: juuri ? getComputedStyle(juuri).clipPath : null,
      laattoja: ui.svg.querySelectorAll('.laattapyramidi image').length,
    };
  });

  const nimi = koko.nimi;
  const p = tila.pane;
  const l = tila.lauta;
  console.log(`      mitattu ${nimi}: karttaruutu ${Math.round(p.top)}…${Math.round(p.bottom)},`
    + ` lauta ${Math.round(l.yla)}…${Math.round(l.ala)} (pysty)`
    + ` ja ${Math.round(l.vasen)}…${Math.round(l.oikea)} (vaaka), skaala ${tila.skaala.toFixed(5)}`);

  vaadi(`${nimi} laudan ylä- ja alareuna näkyvissä`,
    l.yla >= p.top - 1 && l.ala <= p.bottom + 1,
    `lauta ${Math.round(l.yla)}…${Math.round(l.ala)}, ruutu ${Math.round(p.top)}…${Math.round(p.bottom)}`);
  vaadi(`${nimi} laudan vasen ja oikea reuna näkyvissä`,
    l.vasen >= p.left - 1 && l.oikea <= p.right + 1,
    `lauta ${Math.round(l.vasen)}…${Math.round(l.oikea)}, ruutu ${Math.round(p.left)}…${Math.round(p.right)}`);
  vaadi(`${nimi} lauta piirtyy kerran`,
    tila.kokonaan && tila.kiertoNakyy === false
      && Boolean(tila.leikkaus) && tila.leikkaus !== 'none',
    JSON.stringify({ kokonaan: tila.kokonaan, kierto: tila.kiertoNakyy, leikkaus: tila.leikkaus }));

  /*
   * VÄRINÄYTE: laudan ULKOPUOLI ja laudan SISÄPUOLI samasta korkeudesta.
   *
   * Kuva luetaan kuvakaappauksesta ja puretaan sivun omalla canvaksella
   * — savuke ei tuo purkukirjastoa. Ulkopuolen näyte otetaan
   * karttaruudun laidasta ja sisäpuolen laudan keskeltä.
   */
  const naytto = koko.dpr;
  const ulkoX = Math.max(p.left + 3, Math.min(l.vasen - 4, p.right - 3));
  const keskiY = (Math.max(p.top, l.yla) + Math.min(p.bottom, l.ala)) / 2;
  const poimi = async (x, y) => {
    const kuva = (await sivu.screenshot({
      clip: {
        x: Math.round(x), y: Math.round(y), width: 1, height: 1,
      },
    })).toString('base64');
    return sivu.evaluate(async (b64) => {
      const img = new Image();
      img.src = `data:image/png;base64,${b64}`;
      await img.decode();
      const c = document.createElement('canvas');
      c.width = img.width; c.height = img.height;
      const g = c.getContext('2d');
      g.drawImage(img, 0, 0);
      const d = g.getImageData(0, 0, 1, 1).data;
      return [d[0], d[1], d[2]];
    }, kuva);
  };
  const ulko = await poimi(ulkoX, keskiY);
  const sisa = await poimi((l.vasen + l.oikea) / 2, keskiY);
  console.log(`      mitattu ${nimi}: ulkopuoli rgb(${ulko}) — sisäpuoli rgb(${sisa})`
    + ` (dpr ${naytto}, laattoja ${tila.laattoja})`);
  vaadi(`${nimi} laudan ulkopuoli on paperia`,
    ulko[0] > 150 && ulko[0] > ulko[2] + 25,
    `rgb(${ulko}) — odotettiin pergamenttia, ei paneelin taustaa eikä merta`);

  await ctx.close();
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} väitettä läpi`);
process.exit(lapi === kaikki ? 0 : 1);
