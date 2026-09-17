/*
 * Savuke: LUENTAKUVAT PIENEMMIKSI, KUVATEKSTI PAPERILLA, OHITA,
 * PIKKUKUVAT MATKAKIRJAN LOPUSSA (Raamattu, KARTTAUUDISTUKSEN
 * PAATOKSET 35 + TARKENNUS, omistaja 17.9.2026 klo 22.05 ja 22.10).
 *
 * VARTIOT (390 x 844, Pariisin saapuminen):
 *   1. KUVA ON PIENENTYNYT. Sama kuva mitataan kahdesti samassa
 *      ajossa: ensin nykyisella css:lla, sitten vanhat katot
 *      (92vw/78vh) takaisin kirjoittavalla lisatyylilla. Ero on
 *      ENNEN/JALKEEN-luku, ei muistikuva.
 *   2. PAPERI LIMITTYY KUVAN TAAKSE. Paperin (figcaption) ylareuna on
 *      kuvan alareunan YLAPUOLELLA: limitys > 0 px, jolloin sauman
 *      kohdalle ei jaa lapinakyvaa viivaa millaan dpr:lla.
 *   3. KUVATEKSTI ON PAPERIN SISALLA (span figcaptionin laatikossa).
 *   4. OHITA NAKYY KUVAN JA KUVATEKSTIN ALLA.
 *   5. OHITA PYSAYTTAA LUENNAN: alle 1 s:ssa aani on pysahtynyt, isot
 *      kuvat ovat poissa ja kartta nakyy; pulun sarja ei enaa nouse.
 *   6. PIKKUKUVAT MATKAKIRJAN LOPUSSA: auki-tilassa kuvien maara,
 *      pienennetyssa kortissa 0 nakyvaa.
 *   7. PIKKUKUVAN NAPAUTUS AVAA SUURENNOKSEN.
 *
 * Aja:
 *   PLAYWRIGHT_JS=... CHROMIUM="..." PORTTI=8911 \
 *   node tools/savukkeet/mittaa-luentakuvat.mjs [kuvakansio]
 */
import http from 'node:http';
import zlib from 'node:zlib';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const PW = process.env.PLAYWRIGHT_JS ?? 'playwright';
const paketti = await import(PW).catch(() => import('playwright'));
const chromium = paketti.chromium ?? paketti.default?.chromium;
const CHROME = process.env.CHROMIUM ?? '/opt/pw-browsers/chromium';

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

const KAUPUNKI = 'pariisi';
const RUUTU = { width: 390, height: 844 };

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
const PORTTI = Number(process.env.PORTTI ?? 0);
await new Promise((ok) => palvelin.listen(PORTTI, ok));
const osoite = `http://localhost:${palvelin.address().port}/?lauta=pallo`;

/*
 * VERKOTON KUVA. Savuke ajetaan ilman ulkoverkkoa, joten ampari- ja
 * Commons-osoitteet taytetaan paikallisesti tehdylla 3:2 PNG:lla —
 * mitattavat luvut ovat silloin css:n, eivat verkon.
 */
let taulu = null;
function crc32(buf) {
  if (!taulu) {
    taulu = new Int32Array(256);
    for (let n = 0; n < 256; n += 1) {
      let c = n;
      for (let k = 0; k < 8; k += 1) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
      taulu[n] = c;
    }
  }
  let c = -1;
  for (let i = 0; i < buf.length; i += 1) c = taulu[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}
function pngSuorakaide(leveys, korkeus) {
  const rivit = Buffer.alloc((leveys * 3 + 1) * korkeus);
  for (let y = 0; y < korkeus; y += 1) {
    const alku = y * (leveys * 3 + 1);
    rivit[alku] = 0;
    for (let x = 0; x < leveys; x += 1) {
      const i = alku + 1 + x * 3;
      rivit[i] = 150; rivit[i + 1] = 120; rivit[i + 2] = 80;
    }
  }
  const pala = (tyyppi, data) => {
    const pituus = Buffer.alloc(4);
    pituus.writeUInt32BE(data.length);
    const runko = Buffer.concat([Buffer.from(tyyppi), data]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(runko));
    return Buffer.concat([pituus, runko, crc]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(leveys, 0); ihdr.writeUInt32BE(korkeus, 4);
  ihdr[8] = 8; ihdr[9] = 2;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    pala('IHDR', ihdr), pala('IDAT', zlib.deflateSync(rivit)), pala('IEND', Buffer.alloc(0)),
  ]);
}
/*
 * KUVA ON ISO TAHALLAAN (1500 x 1000). Pieni sijaiskuva jaisi css:n
 * kattojen ALLE, jolloin mittari mittaisi sijaiskuvan omaa kokoa eika
 * sita kattoa, jota PAATOKSET 35 muuttaa.
 */
const VARAKUVA = pngSuorakaide(1500, 1000);
/* Aanen runko: dekooderi hylkaa sen, jolloin <audio> paatyy virheeseen
   ja `paused` on tosi — riittaa, koska mitattava on OHITA eika toisto. */
const VARAAANI = Buffer.from('SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA', 'base64');

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: KAUPUNKI }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
const tallenne = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({
  executablePath: CHROME,
  args: ['--autoplay-policy=no-user-gesture-required'],
});
const virheet = [];

const ctx = await selain.newContext({ viewport: RUUTU, serviceWorkers: 'block' });
await ctx.addInitScript((data) => {
  try {
    localStorage.setItem('matkakirja-save-v1', data);
    localStorage.setItem('matkakirja-livia-avaus', '1');
    localStorage.setItem('matkakirja-livia-paljastus', '1');
  } catch { /* yksityinen tila */ }
}, tallenne);
const sivu = await ctx.newPage();
sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
await sivu.route(/wikimedia\.org|media\.matkakirja\.app|r2\.dev\//, (route) => {
  const url = route.request().url();
  const aani = /\.mp3(\?|$)/.test(url);
  route.fulfill({
    status: 200,
    contentType: aani ? 'audio/mpeg' : 'image/png',
    body: aani ? VARAAANI : VARAKUVA,
    headers: { 'access-control-allow-origin': '*' },
  });
});
await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui), null, { timeout: 60000 });
await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null,
  { timeout: 90000 }).catch(() => console.log('HUOM  pallolauta ei ehtinyt avautua'));
await sivu.waitForTimeout(4000);

/* Saapuminen Pariisiin ja isoisän sarja ruudulle. */
await sivu.evaluate(async (id) => {
  const { ui, game } = window.matkakirja;
  game.player.pos = { type: 'city', city: id };
  game.world.visited.add(id);
  game.arrivalFact = { packId: game.pack.id, cityId: id };
  ui.render();
  const m = await import('/js/fokusvirta.js');
  ui.diaryVoice = { paused: false, currentTime: 1, ended: false, error: null };
  m.naytaLuentakuvasarja(ui, game.cityOf());
}, KAUPUNKI);
await sivu.waitForSelector('.fokusvirta-isokuva-ruutu', { timeout: 30000 });
await sivu.waitForTimeout(1500);

const laatikot = () => sivu.evaluate(() => {
  const b = (el) => (el ? (({ x, y, width, height, bottom, top }) => ({
    x: Math.round(x), y: Math.round(y), w: Math.round(width), h: Math.round(height),
    top: Math.round(top), bottom: Math.round(bottom),
  }))(el.getBoundingClientRect()) : null);
  const ruutu = [...document.querySelectorAll('.fokusvirta-isokuva-ruutu')].pop();
  const ohitaEl = document.querySelector('.fokusvirta-isokuva-ohita');
  return {
    kuva: b(ruutu?.querySelector('.fokusvirta-isokuva-kuva')),
    paperi: b(ruutu?.querySelector('.fokusvirta-isokuva-teksti')),
    selite: b(ruutu?.querySelector('.fokusvirta-isokuva-selite')),
    ohita: b(ohitaEl),
    ohitaNakyy: Boolean(ohitaEl) && getComputedStyle(ohitaEl).visibility !== 'hidden',
  };
});

const jalkeen = await laatikot();
if (KUVAKANSIO) {
  await sivu.screenshot({ path: join(KUVAKANSIO, 'luentakuva-paperi-ohita.png') });
}

/* 2–4: paperi, kuvateksti, Ohita */
const limitys = jalkeen.kuva && jalkeen.paperi ? jalkeen.kuva.bottom - jalkeen.paperi.top : null;
tieto('kuva (jälkeen)', JSON.stringify(jalkeen.kuva));
tieto('paperi', JSON.stringify(jalkeen.paperi));
tieto('limitys px', limitys);
vaadi('paperin yläreuna on kuvan alareunan yläpuolella (limitys > 0)',
  limitys !== null && limitys > 0, `limitys ${limitys}`);
vaadi('paperi on kuvan levyinen (>= 96 % kuvan leveydestä)',
  Boolean(jalkeen.paperi) && jalkeen.paperi.w >= jalkeen.kuva.w * 0.96,
  `${jalkeen.paperi?.w} vs ${jalkeen.kuva?.w}`);
vaadi('kuvateksti on paperin sisällä',
  Boolean(jalkeen.selite) && jalkeen.selite.top >= jalkeen.paperi.top - 1
    && jalkeen.selite.bottom <= jalkeen.paperi.bottom + 1,
  JSON.stringify(jalkeen.selite));
vaadi('Ohita näkyy kuvan ja kuvatekstin alla',
  jalkeen.ohitaNakyy && Boolean(jalkeen.ohita) && jalkeen.ohita.top > jalkeen.paperi.bottom,
  JSON.stringify(jalkeen.ohita));

/* 1: ENNEN/JÄLKEEN samassa ajossa (vanhat katot takaisin). */
const ennen = await sivu.evaluate(() => {
  const tyyli = document.createElement('style');
  tyyli.textContent = `.fokusvirta-isokuva-ruutu{max-width:92vw;max-height:78vh}
    .fokusvirta-isokuva-kotelo{max-width:92vw}
    .fokusvirta-isokuva-kuva{max-width:92vw !important;max-height:78vh !important}`;
  document.head.appendChild(tyyli);
  const ruutu = [...document.querySelectorAll('.fokusvirta-isokuva-ruutu')].pop();
  const r = ruutu?.querySelector('.fokusvirta-isokuva-kuva')?.getBoundingClientRect();
  tyyli.remove();
  return r ? { w: Math.round(r.width), h: Math.round(r.height) } : null;
});
const muutos = ennen && jalkeen.kuva
  ? Math.round((1 - jalkeen.kuva.w / ennen.w) * 1000) / 10 : null;
tieto('kuvan leveys ENNEN (92vw/78vh)', `${ennen?.w} px`);
tieto('kuvan leveys JÄLKEEN', `${jalkeen.kuva?.w} px`);
tieto('pienennys', `${muutos} %`);
vaadi('kuva on 18–30 % pienempi kuin ennen',
  muutos !== null && muutos >= 18 && muutos <= 30, `${muutos} %`);

/* 6: pikkukuvat matkakirjan lopussa */
const pikku = await sivu.evaluate(async () => {
  const { ui, game } = window.matkakirja;
  const m = await import('/js/fokusvirta.js');
  const odotetut = m.matkakirjanPikkukuvat(ui, game.cityOf()).length;
  const kortti = document.querySelector('.fact-card');
  const napit = () => [...document.querySelectorAll('.fact-pikkukuva')];
  /*
   * LASKETTU OPACITY EI PERIYDY: kortin kutistuminen vie näkyvyyden
   * RIVILTÄ (`.fact-card.pieni > *`), ja napin oma opacity jää ykköseen.
   * Siksi ketju kuljetaan kortille asti — mitattava on se, mitä pelaaja
   * näkee, ei yhden solmun tyyliarvo.
   */
  const nakyvia = () => napit().filter((n) => {
    const r = n.getBoundingClientRect();
    if (!(r.width > 0 && r.height > 0)) return false;
    let el = n;
    while (el && el !== document.body) {
      const t = getComputedStyle(el);
      if (Number(t.opacity) === 0 || t.visibility === 'hidden' || t.display === 'none') return false;
      el = el.parentElement;
    }
    return true;
  }).length;
  /*
   * KORTIN AUKEAMINEN ON SIIRTYMA (160 ms, css/styles.css
   * `.fact-card > *`): heti luokanvaihdon jalkeen mitattu opacity on
   * yha nolla. Odotus on mittarin, ei pelin, hitautta.
   */
  const hetki = () => new Promise((ok) => setTimeout(ok, 400));
  kortti.classList.remove('pieni');
  await hetki();
  const auki = nakyvia();
  const jarjestys = kortti.querySelector('.fact-teksti-rivi')
    ?.nextElementSibling?.classList?.contains('fact-pikkukuvat') ?? false;
  kortti.classList.add('pieni');
  await hetki();
  const pienena = nakyvia();
  kortti.classList.remove('pieni');
  await hetki();
  return { odotetut, auki, pienena, jarjestys, yhteensa: napit().length };
});
tieto('pikkukuvat', JSON.stringify(pikku));
vaadi('pikkukuvia matkakirjan lopussa auki-tilassa = kuvien määrä',
  pikku.auki === pikku.odotetut && pikku.odotetut > 0,
  `${pikku.auki} / ${pikku.odotetut}`);
vaadi('pikkukuvat ovat heti merkinnän tekstin jälkeen', pikku.jarjestys);
vaadi('pienennetyssä matkakirjassa pikkukuvia ei näy',
  pikku.pienena === 0, `näkyvissä ${pikku.pienena}`);
if (KUVAKANSIO) {
  await sivu.screenshot({ path: join(KUVAKANSIO, 'matkakirja-pikkukuvat.png') });
}

/* 7: pikkukuvan napautus avaa suurennoksen */
await sivu.evaluate(() => document.querySelector('.fact-pikkukuva')?.click());
await sivu.waitForTimeout(800);
const suurennos = await sivu.evaluate(
  () => document.querySelectorAll('.fokuszoom, .fokusvirta-suurennos, dialog[open]').length,
);
vaadi('pikkukuvan napautus avaa suurennoksen', suurennos > 0, `solmuja ${suurennos}`);
await sivu.keyboard.press('Escape');
await sivu.waitForTimeout(400);

/* 5: Ohita pysäyttää luennan alle 1 s:ssa */
await sivu.evaluate(() => {
  const { ui } = window.matkakirja;
  ui.diaryVoice = { paused: false, currentTime: 1, ended: false, error: null };
});
const t0 = Date.now();
await sivu.evaluate(() => document.querySelector('.fokusvirta-isokuva-ohita')?.click());
let ohitus = null;
for (let i = 0; i < 20; i += 1) {
  ohitus = await sivu.evaluate(() => {
    const { ui } = window.matkakirja;
    const kartta = document.querySelector('.map-pane');
    const r = kartta?.getBoundingClientRect();
    return {
      aaniPoissa: !ui.diaryVoice || ui.diaryVoice.paused === true || ui.diaryVoice.ended === true,
      kuviaRuudulla: document.querySelectorAll('.fokusvirta-isokuva-ruutu').length,
      pakkaKartalla: document.querySelectorAll('.fokusvirta-luentakuva').length,
      karttaNakyy: Boolean(r && r.width > 0 && r.height > 0
        && getComputedStyle(kartta).visibility !== 'hidden'),
      sarja: Boolean(ui.luentakuvasarja),
    };
  });
  if (ohitus.aaniPoissa && ohitus.kuviaRuudulla === 0) break;
  await sivu.waitForTimeout(50);
}
const kesto = Date.now() - t0;
tieto('Ohita → tila', JSON.stringify(ohitus));
tieto('Ohita → kesto ms', kesto);
vaadi('Ohita pysäyttää äänen', ohitus.aaniPoissa);
vaadi('Ohita vie isot kuvat pois', ohitus.kuviaRuudulla === 0);
vaadi('Ohita ei jätä pakkaa kartalle (PAATOKSET 31)', ohitus.pakkaKartalla === 0);
vaadi('kartta näkyy heti', ohitus.karttaNakyy);
vaadi('Ohita toimii alle 1 s:ssa', kesto < 1000, `${kesto} ms`);

/* Pulun sarja ei nouse ohituksen jälkeen. */
await sivu.evaluate(async () => {
  const { ui, game } = window.matkakirja;
  const m = await import('/js/fokusvirta.js');
  m.naytaPulunKuvapakka(ui, game.cityOf());
});
await sivu.waitForTimeout(1200);
const puluJalkeen = await sivu.evaluate(
  () => document.querySelectorAll('.fokusvirta-isokuva-ruutu, .fokusvirta-luentakuva').length,
);
vaadi('pulun kuvat eivät enää nouse ohituksen jälkeen', puluJalkeen === 0, `${puluJalkeen}`);
if (KUVAKANSIO) {
  await sivu.screenshot({ path: join(KUVAKANSIO, 'ohita-kartta-nakyy.png') });
}

vaadi('ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));
await ctx.close();
await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} vartiota läpi`);
process.exit(lapi === kaikki ? 0 : 1);
