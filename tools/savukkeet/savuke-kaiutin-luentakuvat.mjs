/*
 * Savuke: KAIUTIN VU-MITTARIKSI SAMALLE RIVILLE, LUENTAKUVAT PAKAKSI.
 *
 * Omistaja 15.9.2026 klo 05.10 UTC, iPhone-kuva Dubrovnikin
 * saapumisluennasta, sanatarkasti:
 *   *"Tasaa kaiutin symboli tekstin kanssa samalle riville. Ja onko
 *   mahdollista animoida kaiuttimen kolmea kaarta elamaan Vu mittarin
 *   tapaan ja ottaa feidaus animaatio siita pois? Ota isoisan ja pulun
 *   valokuvista haivytykset pois ja lado ne hieman vinottain toistensa
 *   paalle vuorotellen vasemmalle ja oikealle kallistettuina. Pida
 *   kartta pehmennettyna ja tummennettuna."*
 *
 * VARTIOT:
 *   1. SAMA RIVI: kaiutinkuvakkeen keskilinja = otsikon ensimmäisen
 *      rivin keskilinja ±1 px, molemmilla ruuduilla.
 *   2. VU-MITTARI ELÄÄ: kolme kaarta ovat omia polkujaan, ja niiden
 *      tila vaihtuu luennan aikana (kolme näytettä, vähintään kaksi
 *      eri tilaa).
 *   3. KOKO KUVAKKEEN SYKE ON POISSA: napilla ei ole animaatiota.
 *   4. HÄIVYTYS POIS: isojen luentakuvien mask-image on `none`.
 *   5. PAKKA VINOON: kortteja on useampi yhtä aikaa ruudulla ja
 *      niiden kiertokulmat vuorottelevat eri etumerkillä.
 *   6. KARTTA ENNALLAAN: luennan hunnun sumennus ja peite mitataan ja
 *      raportoidaan (linjaus ei muutu).
 *
 * VASTAKOE: mittari pysäytetään pakolla → kaarien tila ei enää vaihdu
 * → vartio 2 kääntyy punaiseksi. Näin tiedetään, että vartio mittaa
 * animaatiota eikä pelkkää luokan olemassaoloa.
 *
 * Aja:  NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-kaiutin-luentakuvat.mjs [kuvakansio]
 */
import http from 'node:http';
import {
  readFileSync, writeFileSync, existsSync, mkdirSync,
} from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

// Omistajan kuva on Dubrovnikista; sillä on isoisän kaksi luentakuvaa
// ja pulun omat kuvat, eli koko pakka.
const KAUPUNKI = 'dubrovnik';
const RUUDUT = [
  { nimi: 'puhelin', width: 390, height: 844 },
  { nimi: 'tyopoyta', width: 1400, height: 900 },
];

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/?lauta=pallo`;

/* Ämpäri Noden kautta (selaimessa ei ole ulkoverkkoa). */
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

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'ateena' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
const tallenne = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const virheet = [];

/** Avaa pelin ja saapuu koekaupunkiin. */
async function avaaAjo(viewport) {
  const ctx = await selain.newContext({ viewport, serviceWorkers: 'block' });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.setItem('matkakirja-livia-avaus', '1');
      localStorage.setItem('matkakirja-livia-paljastus', '1');
    } catch { /* yksityinen tila */ }
  }, tallenne);
  const sivu = await ctx.newPage();
  const cdp = await ctx.newCDPSession(sivu);
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
  await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui), null, { timeout: 60000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null,
    { timeout: 90000 }).catch(() => console.log('HUOM  pallolauta ei ehtinyt avautua'));
  await sivu.waitForTimeout(4000);
  await sivu.evaluate((id) => {
    const { ui, game } = window.matkakirja;
    game.player.pos = { type: 'city', city: id };
    game.world.visited.add(id);
    game.arrivalFact = { packId: game.pack.id, cityId: id };
    ui.render();
  }, KAUPUNKI);
  return { ctx, sivu, cdp };
}

/** Kaarien tila merkkijonona, esim. "110" = kaksi alinta palaa. */
const KAARINAYTE = `(() => {
  const kaaret = [...document.querySelectorAll('#fact-kuuntele .kaiutin-kaari')];
  return {
    tila: kaaret.map((k) => (k.classList.contains('palaa') ? '1' : '0')).join(''),
    opacity: kaaret.map((k) => getComputedStyle(k).opacity).join('/'),
    maara: kaaret.length,
  };
})()`;

for (const ruutu of RUUDUT) {
  console.log(`\n=== ${ruutu.nimi} ${ruutu.width}x${ruutu.height} ===`);
  const { ctx, sivu, cdp } = await avaaAjo({ width: ruutu.width, height: ruutu.height });

  // 1–3. KAIUTIN: sama rivi ja VU-mittari. Odotetaan kertojan vuoroa.
  const kertoja = await sivu.waitForFunction(
    () => document.body.classList.contains('kertoja-aanessa'), null, { timeout: 60000 },
  ).then(() => true).catch(() => false);
  vaadi(`${ruutu.nimi}: isoisän luenta alkaa (kertoja-aanessa)`, kertoja);

  const rivi = await sivu.evaluate(() => {
    const h2 = document.querySelector('.fact-card h2');
    const svg = document.querySelector('#fact-kuuntele svg');
    if (!h2 || !svg) return null;
    const alue = document.createRange();
    alue.selectNodeContents(h2);
    const rivit = [...alue.getClientRects()].filter((r) => r.height > 1);
    if (!rivit.length) return null;
    const eka = rivit[0];
    const kuva = svg.getBoundingClientRect();
    return {
      teksti: h2.textContent.trim(),
      tekstiKeski: eka.top + eka.height / 2,
      kuvakeKeski: kuva.top + kuva.height / 2,
      rivienMaara: rivit.length,
      napinNakyy: !document.getElementById('fact-kuuntele').hidden,
    };
  });
  tieto(`${ruutu.nimi} otsikkorivi`, JSON.stringify(rivi));
  const ero = rivi ? Math.abs(rivi.tekstiKeski - rivi.kuvakeKeski) : 999;
  vaadi(`${ruutu.nimi}: kuvakkeen ja tekstin keskilinjat ±1 px`,
    Boolean(rivi) && rivi.napinNakyy && ero <= 1, `ero ${ero.toFixed(2)} px`);

  const naytteet = [];
  for (let i = 0; i < 3; i += 1) {
    naytteet.push(await sivu.evaluate(KAARINAYTE));
    if (i < 2) await sivu.waitForTimeout(320);
  }
  const tilat = naytteet.map((n) => n.tila);
  tieto(`${ruutu.nimi} kaarien tilat (3 hetkeä, 320 ms välein)`,
    `${tilat.join(' → ')}  opacity ${naytteet[2].opacity}`);
  vaadi(`${ruutu.nimi}: kaaria on kolme omana polkunaan`, naytteet[0].maara === 3,
    `kaaria ${naytteet[0].maara}`);
  vaadi(`${ruutu.nimi}: VU-mittari elää (vähintään kaksi eri tilaa)`,
    new Set(tilat).size >= 2, tilat.join(' → '));

  const syke = await sivu.evaluate(() => {
    const nappi = document.getElementById('fact-kuuntele');
    const t = getComputedStyle(nappi);
    return { animation: t.animationName, transform: t.transform, opacity: t.opacity };
  });
  tieto(`${ruutu.nimi} napin oma animaatio`, JSON.stringify(syke));
  vaadi(`${ruutu.nimi}: koko kuvakkeen syke on poissa`,
    syke.animation === 'none', syke.animation);

  // 4–6. LUENTAKUVAT: häivytys pois, pakka vinoon, kartta ennallaan.
  /*
   * Kolmas kortti on ensimmäinen PuluCam-kuva: vasta sillä nähdään,
   * että kallistus vuorottelee myös isoisän kahden kuvan jälkeen. Sitä
   * ei kuitenkaan VAADITA — kolmas kortti tulee vasta noin 31 s
   * kohdalla, ja kuormitetulla koneella luennan kellot venyvät
   * (mitattu: rinnakkainen savukeajo jätti työpöytäruudulle yhden
   * kortin 90 sekunnissa). Vartio tarkistaa vuorottelun sillä määrällä,
   * joka ehti ruudulle, ja kaksi korttia riittää.
   */
  await sivu.waitForFunction(
    () => document.querySelectorAll('.fokusvirta-isokuva-ruutu').length >= 3,
    null, { timeout: 120000 },
  ).catch(() => {});
  const kuvat = await sivu.evaluate(() => {
    const ruudut = [...document.querySelectorAll('.fokusvirta-isokuva-ruutu')];
    const kulma = (el) => {
      const arvo = el.style.getPropertyValue('--pakka-kallistus').trim();
      return arvo ? Number.parseFloat(arvo) : 0;
    };
    const img = document.querySelector('.fokusvirta-isokuva-kuva');
    const tyyli = img ? getComputedStyle(img) : null;
    const kartta = document.querySelector('.map-pane');
    const huntu = kartta ? getComputedStyle(kartta, '::after') : null;
    return {
      ruutuja: ruudut.length,
      kulmat: ruudut.map(kulma),
      matriisit: ruudut.map((r) => getComputedStyle(r).transform),
      tekstit: ruudut.map((r) => Boolean(r.querySelector('.fokusvirta-isokuva-teksti'))),
      maski: tyyli ? `${tyyli.maskImage} | ${tyyli.webkitMaskImage}` : null,
      reuna: tyyli ? `${tyyli.borderTopWidth} ${tyyli.borderTopColor}` : null,
      huntuPaalla: document.body.classList.contains('luenta-huntu'),
      huntuSuodatin: huntu ? (huntu.backdropFilter ?? huntu.webkitBackdropFilter) : null,
      huntuPeite: huntu ? huntu.backgroundColor : null,
    };
  });
  tieto(`${ruutu.nimi} luentakuvat`, JSON.stringify(kuvat));
  vaadi(`${ruutu.nimi}: kuvia on pakassa useampi yhtä aikaa`, kuvat.ruutuja >= 2,
    `ruutuja ${kuvat.ruutuja}`);
  vaadi(`${ruutu.nimi}: reunahäivytys (mask) on poissa`,
    Boolean(kuvat.maski) && !/gradient/.test(kuvat.maski), String(kuvat.maski));
  const vuorottelee = kuvat.kulmat.length >= 2
    && kuvat.kulmat.every((k, i) => (i % 2 === 0 ? k < 0 : k > 0));
  vaadi(`${ruutu.nimi}: kallistukset vuorottelevat eri etumerkillä`,
    vuorottelee, JSON.stringify(kuvat.kulmat));
  vaadi(`${ruutu.nimi}: jokaisella kortilla on oma kuvateksti`,
    kuvat.tekstit.every(Boolean), JSON.stringify(kuvat.tekstit));
  tieto(`${ruutu.nimi} kartan huntu`,
    `paalla=${kuvat.huntuPaalla} suodatin=${kuvat.huntuSuodatin} peite=${kuvat.huntuPeite}`);

  if (KUVAKANSIO) {
    // Kaappaus otetaan HETI kolmen kortin mittauksen jälkeen: sarja
    // purkautuu pieneksi pakaksi noin 44 s kohdalla, ja neljättä korttia
    // odotellessa kaappaus osui jo purkautuneeseen näkymään (mitattu
    // 1400 × 900).
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 72 });
    writeFileSync(join(KUVAKANSIO, `kaiutin-luentakuvat-${ruutu.width}-20260915.jpg`),
      Buffer.from(data, 'base64'));
  }
  await ctx.close();
}

/* ================================================================
   VASTAKOE: mittari pakolla seis → kaaret staattiset → vartio punainen
   ================================================================ */
console.log('\n=== VASTAKOE: mittari pysäytettynä ===');
{
  const { ctx, sivu } = await avaaAjo({ width: 1400, height: 900 });
  await sivu.waitForFunction(() => document.body.classList.contains('kertoja-aanessa'),
    null, { timeout: 60000 }).catch(() => {});
  await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    /*
     * ANIMAATIO POIS KAHDELLA KÄDELLÄ: luentavahti pysäytetään (se
     * käynnistäisi mittarin 200 ms:n välein uudestaan) ja mittari
     * sammutetaan. Luennan merkki jätetään päälle, jotta vartio mittaa
     * nimenomaan animaatiota eikä luennan olemassaoloa.
     */
    clearInterval(ui.luentavahti);
    ui.luentavahti = null;
    const m = await import('/js/kaiutinmittari.js');
    m.pysaytaKaiutinmittari();
    document.body.classList.add('kertoja-aanessa');
  });
  const tilat = [];
  for (let i = 0; i < 3; i += 1) {
    tilat.push((await sivu.evaluate(KAARINAYTE)).tila);
    await sivu.waitForTimeout(320);
  }
  tieto('vastakokeen tilat', tilat.join(' → '));
  vaadi('VASTAKOE: pysäytetty mittari EI läpäise elävyysvartiota',
    new Set(tilat).size < 2, tilat.join(' → '));
  await ctx.close();
}

vaadi('sivulla ei ole JS-virheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));

console.log(`\n${lapi}/${kaikki} vartiota läpi.`);
await selain.close();
await new Promise((ok) => palvelin.close(ok));
process.exit(lapi === kaikki ? 0 : 1);
