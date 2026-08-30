/*
 * SELAINSAVUKE: FOKUSLEHDEN MUISTIJALANJÄLKI KUORESSA JA PUHELIMESSA
 *
 *   node tools/savuke-lehtimuisti.mjs
 *
 * OMISTAJAN TESTFLIGHT-PELITESTI 25.8.2026: peli kuoli aloituslogon
 * silmukkaan sekä iPhonella että iPadilla. Yksi fokuslehti on 6400 x
 * 4000 = 25,6 megapikseliä eli PURETTUNA noin 102 megatavua, ja
 * WKWebView'n sisältöprosessi kuoli, kun sen purku osui samaan hetkeen
 * laudan rasteroinnin kanssa. Vastaus on pienentää lehti jo purussa
 * (js/fokuskartta.js, osio "LEHTI PIENENNETÄÄN JO PURUSSA").
 *
 * MIKSI SAVUKE EIKÄ YKSIKKÖTESTI. Koko ketju on selaimen omaa:
 * CORS-nouto, createImageBitmap, canvas, toBlob, blob-osoite ja
 * SVG:n <image>. Nodessa ei ole niistä yhtäkään, joten pienennys
 * voisi kadota huomaamatta — juuri se vikaluokka, jonka takia
 * savukevartija (tools/tarkista-savukkeet.mjs) on olemassa.
 *
 * LEHTI VÄÄRENNETÄÄN OIKEAN KOKOISENA. Ämpäriin ei oteta yhteyttä:
 * jokainen fokuslehtipyyntö vastataan tässä tehdyllä 6400 x 4000
 * -kuvalla ja CORS-otsakkeella (ämpäri vastaa samoin tuotannossa, ks.
 * sw.js kuvalähde-haara). Pikkukuva ei kelpaisi — koko väite on siinä,
 * että ISO kuva kutistuu.
 *
 * KOLME AJOA:
 *   puhelin    kapea ruutu (390 x 844), ei siltaa
 *   kuori      iPadin kokoinen ruutu + natiivisilta → pienennys silti
 *   varareitti CORS-nouto katkaistaan → lehti on alkuperäinen, peli
 *              toimii kuten ennen pakettia
 *
 * VÄITTEET (kussakin ajossa):
 *   1. Ympäristö tunnistuu oikein (kapea ruutu / silta).
 *   2. Lehti on kartalla täsmälleen rajauksensa kokoisena — pienennys
 *      ei siirrä eikä venytä mitään.
 *   3. Lehden pikselimitat: 3200 x 2000 (varareitillä 6400 x 4000).
 *   4. Megapikselikirjanpito raportoi PIENENNETYN koon (6,4 / 25,6).
 *   5. Näkymästä poistuneen lehden blob-osoite vapautetaan
 *      (URL.revokeObjectURL) — ilman sitä vuoto söisi hyödyn.
 *   6. Kartalla yhä olevaa osoitetta EI vapauteta.
 */

import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { deflateSync } from 'node:zlib';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const ULOS = process.env.KAAPPAUSKANSIO ?? '/tmp/matkakirja-kaappaukset';
mkdirSync(ULOS, { recursive: true });

/* ---------- oikean kokoinen valelehti (6400 x 4000 PNG) ---------- */

const CRC_TAULU = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();
function crc32(puskuri) {
  let c = 0xffffffff;
  for (let i = 0; i < puskuri.length; i += 1) c = CRC_TAULU[(c ^ puskuri[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function pngPala(tyyppi, data) {
  const pituus = Buffer.alloc(4);
  pituus.writeUInt32BE(data.length);
  const runko = Buffer.concat([Buffer.from(tyyppi, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(runko));
  return Buffer.concat([pituus, runko, crc]);
}
/** Shakkiruudukko reunaviivoineen: pienennys näkyy, paikka on mitattava. */
function teeLehti(leveys, korkeus) {
  const rivi = Buffer.alloc(1 + leveys * 3);
  const pikselit = Buffer.alloc(rivi.length * korkeus);
  for (let y = 0; y < korkeus; y += 1) {
    for (let x = 0; x < leveys; x += 1) {
      const i = 1 + x * 3;
      const shakki = (Math.floor(x / 400) + Math.floor(y / 400)) % 2;
      if (x < 24 || y < 24 || x > leveys - 25 || y > korkeus - 25) {
        rivi[i] = 200; rivi[i + 1] = 30; rivi[i + 2] = 30;
      } else if (x % 40 < 4 || y % 40 < 4) {
        rivi[i] = 60; rivi[i + 1] = 60; rivi[i + 2] = 50;
      } else if (shakki) {
        rivi[i] = 230; rivi[i + 1] = 215; rivi[i + 2] = 170;
      } else {
        rivi[i] = 150; rivi[i + 1] = 180; rivi[i + 2] = 140;
      }
    }
    rivi.copy(pikselit, y * rivi.length);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(leveys, 0);
  ihdr.writeUInt32BE(korkeus, 4);
  ihdr[8] = 8; ihdr[9] = 2;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    pngPala('IHDR', ihdr),
    pngPala('IDAT', deflateSync(pikselit, { level: 6 })),
    pngPala('IEND', Buffer.alloc(0)),
  ]);
}
const LEHTI = teeLehti(6400, 4000);

/* ---------- palvelin ---------- */

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.mp3': 'audio/mpeg',
  '.webmanifest': 'application/manifest+json',
};
const palvelin = createServer((req, res) => {
  const polku = join(JUURI, decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html');
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((r) => palvelin.listen(8763, r));

const paketti = await import(process.env.PLAYWRIGHT_JS
  ?? '/opt/node22/lib/node_modules/playwright/index.js');
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium',
});

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok, lisa });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

/* Kreikan lehden rajaus laudan yksiköinä (js/packs/fokus-grc.js). */
const GRC = { x: 6329.2, y: 1681.71, w: 608.26, h: 380.16 };
const GRC_IKKUNA = {
  x: 6399.39, y: 1725.58, w: 467.89, h: 292.43,
};

/**
 * Yksi ajo: avaa pelin, siirtää nappulan Ateenaan ja mittaa lehden.
 *
 * @param {object} asetus { nimi, kuori, varareitti }
 */
async function ajo({ nimi, kuori = false, varareitti = false }) {
  console.log(`\n--- ${nimi} ---`);
  const ctx = await selain.newContext({
    viewport: kuori ? { width: 1024, height: 1300 } : { width: 390, height: 844 },
    // screen erikseen: puhelinvihje luetaan siitä (ATLAS_PUHELIN).
    screen: kuori ? { width: 1024, height: 1366 } : { width: 390, height: 844 },
    deviceScaleFactor: 1,
    serviceWorkers: 'block',
  });
  if (kuori) {
    // Kuori ruiskuttaa sillan ennen pelin skriptejä
    // (ios/Matkakirja/Selain/natiivi-silta.js).
    await ctx.addInitScript(() => {
      window.matkakirjaNatiivi = {
        onkoNatiivi: true, alusta: 'ios', versio: '1.1.0', ominaisuudet: {},
      };
    });
  }
  const sivu = await ctx.newPage();
  await sivu.route((url) => /julisteet\/fokus\/.*\.webp(\?|$)/.test(url.href), (route) => {
    // Varareittiajossa CORS-nouto katkaistaan (fetch), mutta kuvan oma
    // lataus menee läpi — täsmälleen se tilanne, jossa ämpärin sääntö
    // ei osu pyyntöön ja pienennys putoaa varareitille.
    if (varareitti && route.request().resourceType() === 'fetch') { route.abort(); return; }
    route.fulfill({
      status: 200,
      contentType: 'image/png',
      headers: { 'access-control-allow-origin': '*' },
      body: LEHTI,
    });
  });
  await sivu.route(
    (url) => !/127\.0\.0\.1|localhost/.test(url.href)
      && !/julisteet\/fokus\/.*\.webp(\?|$)/.test(url.href),
    (route) => route.abort(),
  );
  const virheet = [];
  sivu.on('pageerror', (e) => virheet.push(String(e)));

  await sivu.goto('http://127.0.0.1:8763/index.html', { waitUntil: 'load' });
  // Vahti heti alkuun: jokainen vapautus kirjataan.
  await sivu.evaluate(() => {
    window.__vapautetut = [];
    const alkuperainen = URL.revokeObjectURL.bind(URL);
    URL.revokeObjectURL = (u) => { window.__vapautetut.push(String(u)); return alkuperainen(u); };
  });
  await sivu.waitForTimeout(2000);

  const ymparisto = await sivu.evaluate(() => ({
    kapea: Math.min(screen.width || 9999, screen.height || 9999) < 500,
    silta: Boolean(window.matkakirjaNatiivi?.onkoNatiivi),
  }));
  vaadi(`${nimi}: ympäristö tunnistuu`,
    kuori ? (ymparisto.silta && !ymparisto.kapea) : ymparisto.kapea,
    JSON.stringify(ymparisto));

  await sivu.evaluate(() => {
    [...document.querySelectorAll('button')]
      .find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
  });
  await sivu.waitForTimeout(2500);
  await sivu.evaluate(async () => {
    const { game, ui } = window.matkakirja;
    if (game.phase === 'pickstart') {
      game.actionPickStart(game.pack.cities.find((c) => c.links?.length).id, 0);
    }
    game.player.pos = { type: 'city', city: 'ateena' };
    game.world.visited.add('ateena');
    game.phase = 'action';
    ui.render();
    await new Promise((r) => setTimeout(r, 3000));
  });
  await sivu.waitForTimeout(3000);

  const lehti = await sivu.evaluate(async () => {
    const kuva = document.querySelector('.fokus-lehti image');
    const osoite = kuva?.getAttribute('href') ?? null;
    // Pikselimitat luetaan siitä samasta osoitteesta, jonka kartta
    // näyttää — muu olisi arvausta.
    const mitat = await new Promise((valmis) => {
      if (!osoite) { valmis(null); return; }
      const i = new Image();
      i.onload = () => valmis(`${i.naturalWidth}x${i.naturalHeight}`);
      i.onerror = () => valmis('ei lataudu');
      i.src = osoite;
    });
    return {
      blob: Boolean(osoite?.startsWith('blob:')),
      paikka: kuva && {
        x: Number(kuva.getAttribute('x')),
        y: Number(kuva.getAttribute('y')),
        w: Number(kuva.getAttribute('width')),
        h: Number(kuva.getAttribute('height')),
      },
      mitat,
      omaMp: window.matkakirja.ui.atlasOmaMp,
    };
  });
  const paikallaan = lehti.paikka
    && Math.abs(lehti.paikka.x - GRC.x) < 0.01 && Math.abs(lehti.paikka.y - GRC.y) < 0.01
    && Math.abs(lehti.paikka.w - GRC.w) < 0.01 && Math.abs(lehti.paikka.h - GRC.h) < 0.01;
  vaadi(`${nimi}: lehti on rajauksessaan oikean kokoisena`,
    paikallaan, JSON.stringify(lehti.paikka));
  vaadi(`${nimi}: pikselimitat ${varareitti ? '6400x4000' : '3200x2000'}`,
    lehti.mitat === (varareitti ? '6400x4000' : '3200x2000')
    && lehti.blob === !varareitti, `${lehti.mitat} blob=${lehti.blob}`);
  vaadi(`${nimi}: kirjanpito ${varareitti ? '25,6' : '6,4'} Mp`,
    Math.abs(lehti.omaMp - (varareitti ? 25.6 : 6.4)) < 0.01, `omaMp=${lehti.omaMp}`);
  await sivu.screenshot({ path: join(ULOS, `savuke-lehtimuisti-${nimi}.png`) });

  /* --- atlas kartalle, sitten kauas: vapautuuko osoite? ---
   *
   * KEHITTÄJÄTILA JA MAAILMANÄKYMÄ MOLEMMAT (omistajan tilaus
   * 27.8.2026): kehittäjätila yksin ei enää vapauta kameraa, vaan
   * uloszoomauksen pohja on maan fokusikkuna (js/kartta.js
   * fokusRajaukset) — myös pelin omalle kamera-ajolle. Vapaus asuu nyt
   * ylärivin ainoan napin takana.
   */
  await sivu.evaluate(() => {
    localStorage.setItem('matkakirja-kehittaja', '1');
    localStorage.setItem('matkakirja-kehittaja-maailma', '1');
    window.matkakirja.ui.paivitaKehittajaTila();
    window.matkakirja.ui.paivitaKehittajaMaailma();
  });
  await sivu.waitForTimeout(800);
  await sivu.evaluate(async (ikkuna) => {
    const { ui } = window.matkakirja;
    const p = ui.fokusPohjaRajaus ?? ui.fokusPohjaBbox ?? ikkuna;
    await ui.kartta.ajaKamera({
      bbox: {
        x: p.x - p.w, y: p.y - p.h, w: p.w * 3, h: p.h * 3,
      },
      marginaali: 0,
    }, { kesto: 0 });
    await new Promise((r) => setTimeout(r, 300));
    ui.paivitaMaastonimet();
  }, GRC_IKKUNA);
  await sivu.waitForTimeout(6000);
  const ennen = await sivu.evaluate(() => ({
    lehdet: [...(window.matkakirja.ui.atlasLehdet?.keys() ?? [])],
    osoitteet: [...document.querySelectorAll('.fokus-atlas image')]
      .map((e) => e.getAttribute('href')),
  }));

  // Kauas Atlantille: siellä ei ole yhtäkään lehteä, joten kaikki
  // vapautuvat (ATLAS_VARA:n tuplavaran takana, ei hystereesiä).
  await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    await ui.kartta.ajaKamera({
      bbox: {
        x: 1500, y: 2200, w: 600, h: 400,
      },
      marginaali: 0,
    }, { kesto: 0 });
    await new Promise((r) => setTimeout(r, 600));
    ui.paivitaMaastonimet();
    await new Promise((r) => setTimeout(r, 2000));
  });
  await sivu.waitForTimeout(1500);
  const jalkeen = await sivu.evaluate(() => ({
    vapautetut: window.__vapautetut,
    kartalla: [...document.querySelectorAll('.fokus-atlas image, .fokus-lehti image')]
      .map((e) => e.getAttribute('href')),
  }));
  const poistuneet = ennen.osoitteet
    .filter((o) => o?.startsWith('blob:') && !jalkeen.kartalla.includes(o));
  vaadi(`${nimi}: poistuneiden lehtien blob-osoite vapautetaan`,
    varareitti
      ? poistuneet.length === 0
      : (poistuneet.length > 0 && poistuneet.every((o) => jalkeen.vapautetut.includes(o))),
    `atlas=${ennen.lehdet} poistuneita=${poistuneet.length}`);
  vaadi(`${nimi}: kartalla olevaa osoitetta ei vapauteta`,
    jalkeen.kartalla.length > 0
    && jalkeen.kartalla.every((o) => !jalkeen.vapautetut.includes(o)),
    `kartalla=${jalkeen.kartalla.length}`);
  vaadi(`${nimi}: ei sivuvirheitä`, virheet.length === 0, virheet.join(' | '));
  await ctx.close();
}

await ajo({ nimi: 'puhelin' });
await ajo({ nimi: 'kuori', kuori: true });
await ajo({ nimi: 'varareitti', varareitti: true });

await selain.close();
palvelin.close();

const kaatui = tulokset.filter((t) => !t.ok);
console.log(`\n${tulokset.length - kaatui.length}/${tulokset.length} läpi. Kaappaukset: ${ULOS}`);
process.exit(kaatui.length ? 1 : 0);
