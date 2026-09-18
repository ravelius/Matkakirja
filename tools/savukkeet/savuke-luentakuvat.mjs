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
 *   5b. OHITA PYSAYTTAA MYOS PULUN (PAATOKSET 35 TARKENNUS 2 kohta 6).
 *      Saapumisen koko ketju viritetaan (fokusvirtaSaapumiskupla), ja
 *      HTMLMediaElement.play seka AudioBufferSourceNode.start on
 *      vakoitu. Ohitan jalkeen: kaikki <audio> paused/ended 1 s:ssa,
 *      eika 10 s:n kuluessa yhtaan uutta play/start-kutsua, yhtaan
 *      soivaa audiota eika pulun kuplia tai kuvasolmuja.
 *   8. VARJO EI LANKEA KUVATEKSTIN PAPERILLE (TARKENNUS 2 kohta 5).
 *      Paperin pikselit kuvan alareunan alla luetaan KAAPPAUKSESTA
 *      (oma png-purku): kaikkien on oltava paperin varia (#f7f1e2)
 *      +-6. Sama mittaus ajetaan vastakokeena vanhalla tyylilla (varjo
 *      takaisin kuvaan), jolloin saman kaistan on oltava selvasti
 *      tummempi — muuten mittari ei nakisi varjoa lainkaan.
 *   6. PIKKUKUVAT MATKAKIRJAN LOPUSSA: auki-tilassa kuvien maara,
 *      pienennetyssa kortissa 0 nakyvaa.
 *   7. PIKKUKUVAN NAPAUTUS AVAA SUURENNOKSEN.
 *   9.  LAPPU JAA LAPUKSI LUENNAN JALKEEN MOLEMMILLA RUUDUILLA
 *      (PAATOKSET 38 kohta 1, 390 x 844 JA 1400 x 900): kortti
 *      avataan ensin, luenta kutistaa sen lapuksi, ja luennan
 *      paatyttya .fact-card.pieni on YHA paalla. Napautus avaa.
 *  10.  KUVAT LENTAVAT LAPUN YLAREUNAAN (PAATOKSET 38 kohta 2): sarjan
 *      loppu (paataLuentakuvasarja) synnyttaa .fokusvirta-lento-kuvat,
 *      joiden laatikkoa naytteistetaan kehyksittain. Loppupiste lapun
 *      ylareunan +-8 px, loppukoko <= pikkukuvan koko (3,1 rem).
 *  11.  LAPPU EI LIIKAHDA EIKA VAIHDA LUOKKAA lennon aikana.
 *  12.  OHITA LAUKAISEE SAMAN LENNON.
 *  13.  OHITA ON KELLUVA SOLMU, EI PAALLYKSEN LAPSI (PAATOKSET 43
 *      kohta 10) — ja nakyy luennan aikana.
 *  14.  KARTAN OIKEA NAPAUTUS EI VIE OHITAA: kuvat lentavat lappuun,
 *      paallys purkautuu, mutta Ohita on yha DOMissa, nakyvissa
 *      (opacity > 0, koko > 0) ja tasan samassa kohdassa ruutua.
 *  15.  MOLEMPIEN LUENTOJEN LOPPU VIE OHITAN (vahdin oma odotus).
 *  16.  KELLUVA OHITA PYSAYTTAA YHA KAIKEN: luenta pysahtyy, yksikaan
 *      <audio> ei soi ja nappi poistuu itse painalluksesta.
 *
 * Aja:
 *   PLAYWRIGHT_JS=... CHROMIUM="..." PORTTI=8911 \
 *   node tools/savukkeet/savuke-luentakuvat.mjs [kuvakansio]
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
/*
 * PNG-PURKU KAAPPAUKSESTA. Playwright palauttaa 8-bittisen RGBA-png:n
 * (varityyppi 6, ei lomitusta); tama purkaa sen suodattimineen, jotta
 * varjon kaista voidaan lukea PIKSELEINA eika css-arvoina.
 */
function puraPng(buf) {
  let i = 8;
  let leveys = 0; let korkeus = 0; let syvyys = 0; let tyyppi = 0;
  const palat = [];
  while (i < buf.length) {
    const pituus = buf.readUInt32BE(i);
    const nimi = buf.toString('latin1', i + 4, i + 8);
    const data = buf.subarray(i + 8, i + 8 + pituus);
    if (nimi === 'IHDR') {
      leveys = data.readUInt32BE(0); korkeus = data.readUInt32BE(4);
      syvyys = data[8]; tyyppi = data[9];
    } else if (nimi === 'IDAT') palat.push(data);
    else if (nimi === 'IEND') break;
    i += 12 + pituus;
  }
  if (syvyys !== 8 || (tyyppi !== 6 && tyyppi !== 2)) {
    throw new Error(`png: syvyys ${syvyys} tyyppi ${tyyppi} ei tuettu`);
  }
  const kanavia = tyyppi === 6 ? 4 : 3;
  const raaka = zlib.inflateSync(Buffer.concat(palat));
  const rivi = leveys * kanavia;
  const kuva = Buffer.alloc(rivi * korkeus);
  const paeth = (a, b, c) => {
    const pa = Math.abs(b - c); const pb = Math.abs(a - c);
    const pc = Math.abs(a + b - 2 * c);
    return (pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c);
  };
  for (let y = 0; y < korkeus; y += 1) {
    const suodatin = raaka[y * (rivi + 1)];
    const lahde = y * (rivi + 1) + 1;
    const kohde = y * rivi;
    for (let x = 0; x < rivi; x += 1) {
      const raw = raaka[lahde + x];
      const a = x >= kanavia ? kuva[kohde + x - kanavia] : 0;
      const b = y > 0 ? kuva[kohde - rivi + x] : 0;
      const c = (x >= kanavia && y > 0) ? kuva[kohde - rivi + x - kanavia] : 0;
      let arvo = raw;
      if (suodatin === 1) arvo = raw + a;
      else if (suodatin === 2) arvo = raw + b;
      else if (suodatin === 3) arvo = raw + ((a + b) >> 1);
      else if (suodatin === 4) arvo = raw + paeth(a, b, c);
      kuva[kohde + x] = arvo & 0xff;
    }
  }
  return {
    leveys,
    korkeus,
    pikseli: (x, y) => {
      const xi = Math.round(x); const yi = Math.round(y);
      if (xi < 0 || yi < 0 || xi >= leveys || yi >= korkeus) return null;
      const k = yi * rivi + xi * kanavia;
      return [kuva[k], kuva[k + 1], kuva[k + 2]];
    },
  };
}
/** Paperin savy (css/fokusvirta.css .fokusvirta-isokuva-teksti). */
const PAPERI = [0xf7, 0xf1, 0xe2];
const poikkeama = (p) => (p ? Math.max(
  Math.abs(p[0] - PAPERI[0]), Math.abs(p[1] - PAPERI[1]), Math.abs(p[2] - PAPERI[2]),
) : 999);

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
/*
 * AANIVAKOOJA. Mitattava vaite on "Ohitan jalkeen ei ala uutta aanta",
 * ja se on kutsu, ei tyyliarvo: jokainen HTMLMediaElement.play ja
 * jokainen Web Audio -lahteen start kirjataan aikaleimoineen. Vakooja
 * ei muuta toistoa, se vain laskee.
 */
await ctx.addInitScript(() => {
  const vakooja = { play: [], start: [], alkoi: 0 };
  window.__aanivakooja = vakooja;
  const soita = HTMLMediaElement.prototype.play;
  HTMLMediaElement.prototype.play = function play(...a) {
    vakooja.play.push({ t: Date.now(), src: String(this.currentSrc || this.src || '') });
    return soita.apply(this, a);
  };
  const lahde = window.AudioScheduledSourceNode ?? window.AudioBufferSourceNode;
  if (lahde?.prototype?.start) {
    const alku = lahde.prototype.start;
    lahde.prototype.start = function start(...a) {
      vakooja.start.push({ t: Date.now() });
      return alku.apply(this, a);
    };
  }
});
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
/*
 * PAKKA MITATAAN OIKEANA PAKKANA: odotetaan toinen kortti (sarja
 * vaihtaa kuvaa ISON_KUVAN_VAIHTO_MS = 4000 ms valein), jotta varjon
 * mittaus kattaa myos takana olevan kortin varjon.
 */
await sivu.waitForFunction(
  () => document.querySelectorAll('.fokusvirta-isokuva-ruutu').length >= 2,
  null, { timeout: 20000 },
).catch(() => console.log('HUOM  toinen kortti ei ehtinyt pakkaan'));
await sivu.waitForTimeout(800);
const kortteja = await sivu.evaluate(
  () => document.querySelectorAll('.fokusvirta-isokuva-ruutu').length,
);
tieto('kortteja pakassa', kortteja);

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

/*
 * 8: VARJO EI SAA LANGETA KUVATEKSTIN PAPERILLE.
 *
 * Mittapisteet lasketaan paperin OMASSA koordinaatistossa ja
 * kaannetaan ruudulle kortin kiertokulmalla (pakan kortti on
 * kallistettu, mutta kierto on sama kuvalle, paperille ja varjolle).
 * Kaista on kuvan alareunan ALAPUOLELLA ja kuvatekstin YLAPUOLELLA:
 * juuri se ala, jolle kuvan oma varjo lankesi.
 */
const varjoPisteet = await sivu.evaluate(() => {
  const ruutu = [...document.querySelectorAll('.fokusvirta-isokuva-ruutu')].pop();
  const paperi = ruutu?.querySelector('.fokusvirta-isokuva-teksti');
  const selite = ruutu?.querySelector('.fokusvirta-isokuva-selite');
  if (!paperi || !selite) return null;
  const m = new DOMMatrix(getComputedStyle(ruutu).transform);
  const kulma = Math.atan2(m.b, m.a);
  const r = paperi.getBoundingClientRect();
  const cx = r.x + r.width / 2;
  const cy = r.y + r.height / 2;
  const w = paperi.offsetWidth;
  const h = paperi.offsetHeight;
  const limitys = parseFloat(getComputedStyle(paperi)
    .getPropertyValue('--isokuva-paperin-limitys')) || 3;
  const ruudulle = (x, y) => {
    const dx = x - w / 2;
    const dy = y - h / 2;
    return [
      cx + dx * Math.cos(kulma) - dy * Math.sin(kulma),
      cy + dx * Math.sin(kulma) + dy * Math.cos(kulma),
    ];
  };
  const pisteet = [];
  // Kaista kuvan alareunan alla, kuvatekstin ylapuolella.
  const yAlku = limitys + 2;
  const yLoppu = Math.max(yAlku + 1, selite.offsetTop - 2);
  for (let i = 0; i <= 10; i += 1) {
    const x = w * (0.06 + (0.88 * i) / 10);
    for (let j = 0; j <= 4; j += 1) {
      pisteet.push(ruudulle(x, yAlku + ((yLoppu - yAlku) * j) / 4));
    }
  }
  // Sivukaistat: paperin oma pehmuste kuvatekstin vierella.
  for (let j = 0; j <= 6; j += 1) {
    const y = yAlku + ((h - 6 - yAlku) * j) / 6;
    pisteet.push(ruudulle(3, y));
    pisteet.push(ruudulle(w - 3, y));
  }
  return { pisteet, w, h, limitys, kaistaPx: Math.round(yLoppu - yAlku) };
});
const lueVarjo = async (nimi) => {
  const kuva = puraPng(await sivu.screenshot());
  let pahin = 0;
  let missa = null;
  for (const [x, y] of varjoPisteet.pisteet) {
    const ero = poikkeama(kuva.pikseli(x, y));
    if (ero > pahin) { pahin = ero; missa = [Math.round(x), Math.round(y)]; }
  }
  tieto(`paperin pahin poikkeama (${nimi})`, `${pahin} @ ${JSON.stringify(missa)}`);
  return pahin;
};
vaadi('paperin mittapisteet loytyivat', Boolean(varjoPisteet?.pisteet?.length),
  JSON.stringify(varjoPisteet));
tieto('mittakaista px', varjoPisteet?.kaistaPx);
tieto('mittapisteita', varjoPisteet?.pisteet?.length);
const varjoNyt = await lueVarjo('nyt');
vaadi('paperi on tasaisesti paperin väriä kuvan alla (±6)', varjoNyt <= 6,
  `poikkeama ${varjoNyt}`);
if (KUVAKANSIO) {
  await sivu.screenshot({ path: join(KUVAKANSIO, 'luentakuva-paperi-ei-varjoa.png') });
}
/*
 * VASTAKOE: vanha tyyli takaisin (varjo kuvassa, ei kotelossa). Jos
 * mittari ei nae varjoa silloinkaan, se ei mittaa mitaan.
 */
const varjoEnnen = await (async () => {
  await sivu.evaluate(() => {
    const t = document.createElement('style');
    t.id = 'vanha-varjo';
    t.textContent = `.fokusvirta-isokuva-kotelo{box-shadow:none !important}
      .fokusvirta-isokuva-kuva{box-shadow:0 10px 26px rgba(20,14,6,0.45) !important}`;
    document.head.appendChild(t);
  });
  await sivu.waitForTimeout(200);
  if (KUVAKANSIO) {
    await sivu.screenshot({ path: join(KUVAKANSIO, 'luentakuva-paperi-vanha-varjo.png') });
  }
  const arvo = await lueVarjo('vanha varjo kuvassa');
  await sivu.evaluate(() => document.getElementById('vanha-varjo')?.remove());
  await sivu.waitForTimeout(200);
  return arvo;
})();
vaadi('vastakoe: vanha kuvan varjo NÄKYY paperilla (mittari toimii)',
  varjoEnnen > 12, `poikkeama ${varjoEnnen}`);

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

/*
 * 5: Ohita pysäyttää luennan alle 1 s:ssa.
 *
 * SAAPUMISEN KOKO KETJU VIRITETAAN ENSIN (fokusvirtaSaapumiskupla):
 * pulun kommentti ei ole luenta vaan puheenvuoro, joka odottaa luennan
 * LOPPUA — ja Ohita on juuri se loppu. Ilman viritysta mittari ei
 * koskisi siihen ketjuun, joka omistajan puhelimessa jai soimaan.
 * Sijaisluenta saa kuuntelijarungot, koska luennanLoppuun kuuntelee
 * `ended`/`error`-tapahtumia.
 */
const viritys = await sivu.evaluate(async () => {
  const { ui, game } = window.matkakirja;
  ui.diaryVoice = {
    paused: false, currentTime: 1, ended: false, error: null, duration: 30,
    addEventListener() {}, removeEventListener() {}, pause() { this.paused = true; },
  };
  ui.luennat ??= new Set();
  /*
   * KERRAN NAYTETTY EI NAYTETA UUDESTAAN: saapuminen on jo ajettu
   * kerran taman mittauksen alussa (ui.render), ja ketju muistaa sen
   * kaupungittain. Muisti tyhjennetaan, jotta ketju voidaan virittaa
   * uudelleen juuri ennen Ohitaa — samaan tilaan kuin omistajan
   * puhelimessa, jossa Ohita painetaan luennan aikana.
   */
  ui.saapumiskuplaNaytetty?.clear?.();
  ui.huudahdusNaytetty?.clear?.();
  const m = await import('/js/fokusvirta.js');
  const city = game.cityOf();
  const sisalto = m.fokusvirtaSisalto?.(ui, city) ?? null;
  const kupla = m.fokusvirtaSaapumiskupla(ui, city);
  const huudahdus = m.fokusvirtaHuudahdus?.(ui, city) ?? false;
  return {
    kupla,
    huudahdus,
    kentta: sisalto?.pollo?.kommentti ? 'kommentti'
      : (sisalto?.pollo?.maadoitus ? 'maadoitus' : ''),
  };
});
tieto('saapumisketju viritetty', JSON.stringify(viritys));
vaadi('pulun puheenvuoro on oikeasti vireessä (muuten mittari ei mittaa mitään)',
  viritys.kupla === true, JSON.stringify(viritys));
await sivu.evaluate(() => { window.__aanivakooja.alkoi = Date.now(); });
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

/* 5b: sekunnissa jokainen <audio> on pysähtynyt. */
await sivu.waitForTimeout(1000);
const sekunnissa = await sivu.evaluate(() => {
  const kaikki = [...document.querySelectorAll('audio')];
  return {
    yhteensa: kaikki.length,
    soi: kaikki.filter((a) => !a.paused && !a.ended).length,
  };
});
tieto('audiot 1 s ohituksen jälkeen', JSON.stringify(sekunnissa));
vaadi('yksikään <audio> ei soi sekunnin kuluttua Ohitasta', sekunnissa.soi === 0,
  JSON.stringify(sekunnissa));

/*
 * 5b: KYMMENEN SEKUNTIA MYOHEMMIN. Pulun kommentti tuli omalla
 * kellollaan noin sekunti luennan lopusta, ja huudahdus oman
 * kellonsa mukaan — kymmenen sekuntia kattaa molemmat reilusti.
 */
await sivu.waitForTimeout(10000);
const myohemmin = await sivu.evaluate(() => {
  const v = window.__aanivakooja;
  const kaikki = [...document.querySelectorAll('audio')];
  return {
    play: v.play.filter((k) => k.t >= v.alkoi).map((k) => k.src.split('/').pop()),
    start: v.start.filter((k) => k.t >= v.alkoi).length,
    audioita: kaikki.length,
    soi: kaikki.filter((a) => !a.paused && !a.ended).length,
    // Pulun kupla on `.pollo-vihje` kuplapinossa (js/pollo.js luoKupla).
    kuplia: document.querySelectorAll(
      '.pollo-kuplapino .pollo-vihje, .fokusvirta-huudahdus',
    ).length,
    pulunSolmuja: document.querySelectorAll(
      '.fokusvirta-isokuva-ruutu, .fokusvirta-isokuva, .fokusvirta-luentakuva, .pulucam-kortti',
    ).length,
    luentakuvasarja: Boolean(window.matkakirja.ui.luentakuvasarja),
    /*
     * KETJUN KELLO. Pulun kommentti lahtee matkaan nain: luennan loppu
     * tayttaa odotuksen, ja `nayta` asettaa uuden ajastimen. Tama luku
     * on siis se juurisyy, joka omistajan puhelimessa soi — mitattuna
     * ennen kuin siita tulee aanta.
     */
    kuplaAjastin: Boolean(window.matkakirja.ui.saapumiskuplaAjastin),
  };
});
tieto('10 s ohituksen jälkeen', JSON.stringify(myohemmin));
vaadi('Ohitan jälkeen ei ala yhtään uutta ääntä (play/start)',
  myohemmin.play.length === 0 && myohemmin.start === 0, JSON.stringify(myohemmin));
vaadi('10 s myöhemmin yksikään <audio> ei soi', myohemmin.soi === 0,
  `${myohemmin.soi} / ${myohemmin.audioita}`);
vaadi('pulun kuplia ei nouse ohituksen jälkeen', myohemmin.kuplia === 0,
  `${myohemmin.kuplia}`);
vaadi('pulun sarjan solmuja ei ole DOMissa', myohemmin.pulunSolmuja === 0,
  `${myohemmin.pulunSolmuja}`);
vaadi('pulun puheenvuoron kello ei käy ohituksen jälkeen',
  myohemmin.kuplaAjastin === false, `ajastin ${myohemmin.kuplaAjastin}`);

/* Pulun sarja ei nouse ohituksen jälkeen edes suoraan kutsuttuna. */
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

/*
 * VASTAKOE ILMAN OHITUSTA: sama ketju, sama luennan loppu — mutta
 * lippu alhaalla. Jos pulu ei puhu tallekaan, mittari mittaisi tyhjaa
 * ja kohdan 5b lapimeno olisi silkkaa sattumaa.
 */
const ilmanOhitusta = await sivu.evaluate(async () => {
  const { ui, game } = window.matkakirja;
  const m = await import('/js/fokusvirta.js');
  const city = game.cityOf();
  ui.luennanOhitus = null;
  ui.saapumiskuplaNaytetty?.clear?.();
  ui.diaryVoice = {
    paused: false, currentTime: 1, ended: false, error: null, duration: 30,
    addEventListener() {}, removeEventListener() {}, pause() { this.paused = true; },
  };
  const kupla = m.fokusvirtaSaapumiskupla(ui, city);
  // Luenta loppuu luonnollisesti: sama hetki, jonka Ohita ennen teki.
  ui.diaryVoice = null;
  return kupla;
});
/*
 * Mitattava on KETJU, ei kupla: paljas mittarisivu ei avaa pöllön
 * kuplapinoa lainkaan (pallolauta jää nousematta), joten puheenvuoron
 * lähtö luetaan siitä kellosta, jonka `nayta` asettaa.
 */
let puluLahti = false;
for (let i = 0; i < 20; i += 1) {
  // eslint-disable-next-line no-await-in-loop
  puluLahti = await sivu.evaluate(
    () => Boolean(window.matkakirja.ui.saapumiskuplaAjastin),
  );
  if (puluLahti) break;
  // eslint-disable-next-line no-await-in-loop
  await sivu.waitForTimeout(200);
}
tieto('vastakoe ilman ohitusta', `kupla ${ilmanOhitusta}, kello ${puluLahti}`);
vaadi('vastakoe: ilman ohitusta pulun puheenvuoro LÄHTEE (mittari ei mittaa tyhjää)',
  ilmanOhitusta === true && puluLahti === true, `${ilmanOhitusta} / ${puluLahti}`);
if (KUVAKANSIO) {
  await sivu.screenshot({ path: join(KUVAKANSIO, 'ohita-kartta-nakyy.png') });
}

await ctx.close();

/* ====================================================================
 * 9–12: PAATOKSET 38 — TEKSTIT PIILOSSA, KUVAT LENTAVAT LAPPUUN.
 *
 * OMA KONTEKSTINSA JA OMA RUUTUNSA. Yllä oleva ajo on käyttänyt Ohitan
 * ja jättänyt `ui.luennanOhitus`-lipun pystyyn (uusi päällys ei enää
 * nouse), joten nämä väitteet eivät voi jatkaa samalla sivulla. Sama
 * mittaus ajetaan MOLEMMILLA ruuduilla, koska kohta 1 on nimenomaan
 * "kaikilla laitteilla" — työpöytä oli se, joka avasi kortin itsestään.
 *
 * LUENTA ON OIKEA PUHEENVUORO, EI LIPPU. Vahti (js/ui.js
 * kaynnistaLuentavahti) lukee `soivaPuhuja()`-kyselyä, joten mittari
 * merkitsee sijaisäänen puhujaksi luennan omalla rajapinnalla
 * (merkitsePuhuja / vapautaPuhuja). Niin mitattava polku on se sama,
 * jota pelaajan ääni kulkee — ei mittarin oma oikopolku.
 */
const PIKKUKUVA_REM = 3.1;

async function mittaaPaatokset38(ruutu, lappuNimi, kuvia = false) {
  const konteksti = await selain.newContext({ viewport: ruutu, serviceWorkers: 'block' });
  await konteksti.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.setItem('matkakirja-livia-avaus', '1');
      localStorage.setItem('matkakirja-livia-paljastus', '1');
    } catch { /* yksityinen tila */ }
  }, tallenne);
  const s = await konteksti.newPage();
  s.on('pageerror', (e) => virheet.push(`${lappuNimi}: ${String(e.message ?? e)}`));
  await s.route('**samireivinen.workers.dev/**', (r) => r.abort());
  await s.route(/wikimedia\.org|media\.matkakirja\.app|r2\.dev\//, (route) => {
    const url = route.request().url();
    const aani = /\.mp3(\?|$)/.test(url);
    route.fulfill({
      status: 200,
      contentType: aani ? 'audio/mpeg' : 'image/png',
      body: aani ? VARAAANI : VARAKUVA,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
  await s.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await s.waitForFunction(() => Boolean(window.matkakirja?.ui), null, { timeout: 60000 });
  await s.waitForTimeout(3000);

  /* Saapuminen Pariisiin, kortti AUKI ja luenta käyntiin. */
  await s.evaluate(async (id) => {
    const { ui, game } = window.matkakirja;
    game.player.pos = { type: 'city', city: id };
    game.world.visited.add(id);
    game.arrivalFact = { packId: game.pack.id, cityId: id };
    ui.render();
    // Pelaaja on kortin auki: vain silloin luennan loppu voisi sen
    // sulkea tai jättää auki — kutistettu lappu ei mittaisi mitään.
    ui.asetaPaivakirjanKoko(false);
    const l = await import('/js/luenta.js');
    const aani = {
      paused: false, ended: false, error: null, currentTime: 1, duration: 30,
      addEventListener() {}, removeEventListener() {}, removeAttribute() {},
      pause() { this.paused = true; },
    };
    window.__savukeAani = aani;
    ui.luennat ??= new Set();
    ui.luennat.add(aani);
    ui.diaryVoice = aani;
    l.merkitsePuhuja(ui, aani, l.PUHUJA_KERTOJA);
  }, KAUPUNKI);
  // Vahdin kysely on 200 ms: tässä ajassa lappu on kutistunut.
  await s.waitForTimeout(700);
  const luennanAikana = await s.evaluate(
    () => document.querySelector('.fact-card')?.classList?.contains('pieni') === true,
  );
  vaadi(`${lappuNimi}: luenta kutistaa kortin lapuksi`, luennanAikana);

  /* Isoisän sarja ruudulle ja toinen kortti pakkaan (porrastus). */
  await s.evaluate(async () => {
    const { ui, game } = window.matkakirja;
    const m = await import('/js/fokusvirta.js');
    m.naytaLuentakuvasarja(ui, game.cityOf());
  });
  await s.waitForSelector('.fokusvirta-isokuva-ruutu', { timeout: 30000 });
  await s.waitForFunction(
    () => document.querySelectorAll('.fokusvirta-isokuva-ruutu').length >= 2,
    null, { timeout: 20000 },
  ).catch(() => console.log(`HUOM  ${lappuNimi}: toinen kortti ei ehtinyt pakkaan`));

  /*
   * LENTO KÄYNTIIN JA NÄYTTEET KEHYKSITTÄIN. Laukaisu ja näytteenotto
   * ovat sivun puolella (requestAnimationFrame), jotta Nodesta voidaan
   * samaan aikaan ottaa kaappauksia kesken lennon.
   */
  await s.evaluate(async (rem) => {
    const { ui } = window.matkakirja;
    const m = await import('/js/fokusvirta.js');
    const kortti = document.querySelector('.fact-card');
    const laatikko = (el) => {
      const r = el.getBoundingClientRect();
      return {
        x: Math.round(r.x * 10) / 10,
        y: Math.round(r.y * 10) / 10,
        w: Math.round(r.width * 10) / 10,
        h: Math.round(r.height * 10) / 10,
      };
    };
    const juuri = Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const tulos = {
      pikkukuvaPx: rem * juuri,
      lappuEnnen: laatikko(kortti),
      luokatEnnen: kortti.className,
      naytteet: [],
      lappuNaytteet: [],
      lentoja: 0,
      valmis: false,
    };
    window.__lento = tulos;
    m.paataLuentakuvasarja(ui);
    const lennot = [...document.querySelectorAll('.fokusvirta-lento')];
    tulos.lentoja = lennot.length;
    const eka = lennot[0] ?? null;
    const alku = performance.now();
    const askel = () => {
      if (eka?.isConnected) {
        tulos.naytteet.push({ t: Math.round(performance.now() - alku), ...laatikko(eka) });
      }
      tulos.lappuNaytteet.push({ ...laatikko(kortti), luokat: kortti.className });
      if (performance.now() - alku < 900) requestAnimationFrame(askel);
      else tulos.valmis = true;
    };
    requestAnimationFrame(askel);
  }, PIKKUKUVA_REM);
  if (kuvia && KUVAKANSIO) {
    for (const [i, odota] of [120, 180, 200].entries()) {
      // eslint-disable-next-line no-await-in-loop
      await s.waitForTimeout(odota);
      // eslint-disable-next-line no-await-in-loop
      await s.screenshot({ path: join(KUVAKANSIO, `kuvat-lentavat-${i + 1}.png`) });
    }
  }
  await s.waitForTimeout(1200);
  const lento = await s.evaluate(() => window.__lento);
  const viimeinen = lento.naytteet.at(-1) ?? null;
  const ensimmainen = lento.naytteet[0] ?? null;
  const maaliY = lento.lappuEnnen.y;
  const maaliX = lento.lappuEnnen.x + lento.lappuEnnen.w / 2;
  tieto(`${lappuNimi} lentoja`, lento.lentoja);
  tieto(`${lappuNimi} näytteitä`, lento.naytteet.length);
  tieto(`${lappuNimi} lento alku`, JSON.stringify(ensimmainen));
  tieto(`${lappuNimi} lento loppu`, JSON.stringify(viimeinen));
  tieto(`${lappuNimi} lapun yläreuna`, `${maaliY} (keskilinja ${Math.round(maaliX)})`);
  tieto(`${lappuNimi} pikkukuva px`, Math.round(lento.pikkukuvaPx));
  vaadi(`${lappuNimi}: kuvat lähtevät lentoon sarjan lopussa`, lento.lentoja > 0,
    `lentoja ${lento.lentoja}`);
  vaadi(`${lappuNimi}: laatikkoa mitattiin vähintään kolmessa kehyksessä`,
    lento.naytteet.length >= 3, `näytteitä ${lento.naytteet.length}`);
  const matkaAlussa = ensimmainen
    ? Math.hypot(ensimmainen.x + ensimmainen.w / 2 - maaliX, ensimmainen.y - maaliY) : null;
  const matkaLopussa = viimeinen
    ? Math.hypot(viimeinen.x + viimeinen.w / 2 - maaliX, viimeinen.y - maaliY) : null;
  tieto(`${lappuNimi} etäisyys maaliin`,
    `${Math.round(matkaAlussa)} → ${Math.round(matkaLopussa)} px`);
  vaadi(`${lappuNimi}: laatikko liikkuu kohti lapun yläreunaa`,
    matkaAlussa !== null && matkaLopussa !== null && matkaLopussa < matkaAlussa,
    `${matkaAlussa} → ${matkaLopussa}`);
  vaadi(`${lappuNimi}: loppupiste on lapun yläreunassa (±8 px)`,
    viimeinen !== null && Math.abs(viimeinen.y - maaliY) <= 8,
    `y ${viimeinen?.y} vs ${maaliY}`);
  vaadi(`${lappuNimi}: loppupiste on lapun keskilinjalla (±8 px)`,
    viimeinen !== null && Math.abs(viimeinen.x + viimeinen.w / 2 - maaliX) <= 8,
    `x ${viimeinen?.x} + ${viimeinen?.w} vs ${maaliX}`);
  vaadi(`${lappuNimi}: loppukoko on enintään pikkukuvan kokoinen`,
    viimeinen !== null && viimeinen.w <= lento.pikkukuvaPx + 1,
    `${viimeinen?.w} vs ${Math.round(lento.pikkukuvaPx)}`);
  const lappuLiikkui = lento.lappuNaytteet.some((n) => n.x !== lento.lappuEnnen.x
    || n.y !== lento.lappuEnnen.y || n.w !== lento.lappuEnnen.w || n.h !== lento.lappuEnnen.h);
  const luokatVaihtui = lento.lappuNaytteet.some((n) => n.luokat !== lento.luokatEnnen);
  tieto(`${lappuNimi} lapun näytteitä`, lento.lappuNaytteet.length);
  vaadi(`${lappuNimi}: lappu ei liikahda lennon aikana`, !lappuLiikkui,
    JSON.stringify(lento.lappuNaytteet.find((n) => n.x !== lento.lappuEnnen.x) ?? {}));
  vaadi(`${lappuNimi}: lapun luokkalista ei muutu lennon aikana`, !luokatVaihtui,
    lento.luokatEnnen);
  vaadi(`${lappuNimi}: lappu on yhä pienennettynä lennon jälkeen`,
    lento.luokatEnnen.includes('pieni'), lento.luokatEnnen);

  /* 9: luennan loppu ei avaa korttia — napautus avaa. */
  await s.evaluate(async () => {
    const { ui } = window.matkakirja;
    const l = await import('/js/luenta.js');
    const aani = window.__savukeAani;
    aani.paused = true;
    aani.ended = true;
    l.vapautaPuhuja(ui, aani);
    ui.diaryVoice = null;
  });
  // Vahdin välirauha on 1300 ms (LUENNAN_VALIRAUHA_MS) + kyselyn väli.
  await s.waitForTimeout(2200);
  const luennanJalkeen = await s.evaluate(() => {
    const kortti = document.querySelector('.fact-card');
    return {
      pieni: kortti?.classList?.contains('pieni') === true,
      luokat: kortti?.className ?? '',
    };
  });
  tieto(`${lappuNimi} kortti luennan jälkeen`, JSON.stringify(luennanJalkeen));
  vaadi(`${lappuNimi}: luennan loppu EI avaa korttia (lappu jää lapuksi)`,
    luennanJalkeen.pieni, luennanJalkeen.luokat);
  if (kuvia && KUVAKANSIO) {
    await s.screenshot({ path: join(KUVAKANSIO, 'lappu-jaa-lapuksi.png') });
  }
  await s.evaluate(() => document.querySelector('.fact-card')?.click());
  await s.waitForTimeout(500);
  const napautuksenJalkeen = await s.evaluate(
    () => document.querySelector('.fact-card')?.classList?.contains('pieni') === true,
  );
  vaadi(`${lappuNimi}: napautus avaa kortin`, napautuksenJalkeen === false);

  /* 12: Ohita laukaisee saman lennon. */
  const ohitus = await s.evaluate(async () => {
    const { ui, game } = window.matkakirja;
    const m = await import('/js/fokusvirta.js');
    const l = await import('/js/luenta.js');
    const aani = {
      paused: false, ended: false, error: null, currentTime: 1, duration: 30,
      addEventListener() {}, removeEventListener() {}, removeAttribute() {},
      pause() { this.paused = true; },
    };
    ui.luennat ??= new Set();
    ui.luennat.add(aani);
    ui.diaryVoice = aani;
    ui.luennanOhitus = null;
    l.merkitsePuhuja(ui, aani, l.PUHUJA_KERTOJA);
    m.naytaLuentakuvasarja(ui, game.cityOf());
    return true;
  });
  await s.waitForSelector('.fokusvirta-isokuva-ruutu', { timeout: 30000 });
  await s.waitForTimeout(600);
  await s.evaluate(() => document.querySelector('.fokusvirta-isokuva-ohita')?.click());
  await s.waitForTimeout(80);
  const ohitanLento = await s.evaluate(() => ({
    lentoja: document.querySelectorAll('.fokusvirta-lento').length,
    isoja: document.querySelectorAll('.fokusvirta-isokuva-ruutu').length,
  }));
  tieto(`${lappuNimi} Ohita → lento`, `${JSON.stringify(ohitanLento)} (viritys ${ohitus})`);
  vaadi(`${lappuNimi}: Ohita laukaisee saman lennon`, ohitanLento.lentoja > 0,
    JSON.stringify(ohitanLento));

  /* ==================================================================
   * 13–16: OHITA PYSYY KUNNES KUMPIKIN LUENTA ON LOPPU
   * (PAATOKSET 43 kohta 10, omistaja 18.9.2026 klo 22.50:
   * *"Ohita nappi ei saisi havita vaikka pelaaja painaa jostain
   * muualta ennen kuin kumpikin luenta on loppu."*)
   *
   * Napautus on OIKEA hiiren napautus kartalle (s.mouse.click), ei
   * tapahtuman lähetys: juuri se polku (document pointerdown →
   * onkoKartanLiike → paataLuentakuvasarja) vei ennen Ohitan mukanaan.
   * Mittapiste haetaan elementFromPointilla, jotta napautus ei osu
   * kaupunkimerkkiin eikä kelluvaan nappiin.
   * ================================================================== */
  const ohitanTila = () => s.evaluate(() => {
    const el = document.querySelector('.fokusvirta-isokuva-ohita');
    if (!el?.isConnected) return { domissa: false };
    const r = el.getBoundingClientRect();
    let opacity = 1;
    let piilossa = false;
    let n = el;
    while (n && n !== document.body) {
      const t = getComputedStyle(n);
      opacity *= Number(t.opacity);
      if (t.visibility === 'hidden' || t.display === 'none') piilossa = true;
      n = n.parentElement;
    }
    return {
      domissa: true,
      opacity: Math.round(opacity * 1000) / 1000,
      w: Math.round(r.width),
      h: Math.round(r.height),
      y: Math.round(r.y),
      piilossa,
      kelluva: el.classList.contains('fokusvirta-ohitanappi'),
      paallyksessa: Boolean(el.closest('.fokusvirta-isokuva')),
    };
  });
  const viritaLuenta = () => s.evaluate(async () => {
    const { ui, game } = window.matkakirja;
    const m = await import('/js/fokusvirta.js');
    const l = await import('/js/luenta.js');
    // Edellinen vaihe painoi Ohitaa: lippu alas, tai päällys ei nouse.
    ui.luennanOhitus = null;
    const aani = {
      paused: false, ended: false, error: null, currentTime: 1, duration: 30,
      addEventListener() {}, removeEventListener() {}, removeAttribute() {},
      pause() { this.paused = true; },
    };
    window.__ohitaAani = aani;
    ui.luennat ??= new Set();
    ui.luennat.add(aani);
    ui.diaryVoice = aani;
    l.merkitsePuhuja(ui, aani, l.PUHUJA_KERTOJA);
    m.naytaLuentakuvasarja(ui, game.cityOf());
  });

  await viritaLuenta();
  await s.waitForSelector('.fokusvirta-isokuva-ruutu', { timeout: 30000 });
  await s.waitForTimeout(900);
  const ennenNapautusta = await ohitanTila();
  tieto(`${lappuNimi} Ohita ennen napautusta`, JSON.stringify(ennenNapautusta));
  vaadi(`${lappuNimi}: Ohita on kelluva solmu, ei päällyksen lapsi`,
    ennenNapautusta.kelluva === true && ennenNapautusta.paallyksessa === false,
    JSON.stringify(ennenNapautusta));
  vaadi(`${lappuNimi}: Ohita näkyy luennan aikana`,
    ennenNapautusta.domissa && ennenNapautusta.opacity > 0
      && ennenNapautusta.w > 0 && ennenNapautusta.h > 0 && !ennenNapautusta.piilossa,
    JSON.stringify(ennenNapautusta));

  const piste = await s.evaluate(() => {
    const kartta = document.querySelector('.map-pane');
    const r = kartta?.getBoundingClientRect();
    if (!r) return null;
    for (const osuus of [0.22, 0.3, 0.38, 0.46, 0.14]) {
      for (const dx of [24, 40, 60]) {
        const x = Math.round(r.x + dx);
        const y = Math.round(r.y + r.height * osuus);
        const el = document.elementFromPoint(x, y);
        if (!el?.closest('.map-pane')) continue;
        if (el.closest('button, a, [role="button"], .fact-card')) continue;
        return { x, y, tagi: el.tagName, luokat: el.className?.baseVal ?? el.className };
      }
    }
    return null;
  });
  tieto(`${lappuNimi} napautuspiste kartalla`, JSON.stringify(piste));
  vaadi(`${lappuNimi}: kartalta löytyi napautuspiste (mittari ei mittaa tyhjää)`,
    piste !== null, 'ei pistettä');
  if (piste) await s.mouse.click(piste.x, piste.y);
  await s.waitForTimeout(160);
  const heti = await ohitanTila();
  const lentoja = await s.evaluate(
    () => document.querySelectorAll('.fokusvirta-lento').length,
  );
  tieto(`${lappuNimi} napautuksen jälkeen heti`, `${JSON.stringify(heti)} lentoja ${lentoja}`);
  vaadi(`${lappuNimi}: kartan napautus laukaisee kuvien lennon lappuun`,
    lentoja > 0, `lentoja ${lentoja}`);
  vaadi(`${lappuNimi}: Ohita on yhä DOMissa heti kartan napautuksen jälkeen`,
    heti.domissa === true, JSON.stringify(heti));

  await s.waitForTimeout(1400);
  const lennonJalkeen = await ohitanTila();
  const isojaJaljella = await s.evaluate(() => ({
    ruutuja: document.querySelectorAll('.fokusvirta-isokuva-ruutu').length,
    paallyksia: document.querySelectorAll('.fokusvirta-isokuva').length,
    lentoja: document.querySelectorAll('.fokusvirta-lento').length,
  }));
  tieto(`${lappuNimi} lennon jälkeen`,
    `${JSON.stringify(lennonJalkeen)} ${JSON.stringify(isojaJaljella)}`);
  vaadi(`${lappuNimi}: kuvat todella lensivät pois (päällys purettu)`,
    isojaJaljella.ruutuja === 0 && isojaJaljella.paallyksia === 0,
    JSON.stringify(isojaJaljella));
  vaadi(`${lappuNimi}: Ohita näkyy yhä, kun kuva on lentänyt lappuun`,
    lennonJalkeen.domissa && lennonJalkeen.opacity > 0
      && lennonJalkeen.w > 0 && lennonJalkeen.h > 0 && !lennonJalkeen.piilossa,
    JSON.stringify(lennonJalkeen));
  vaadi(`${lappuNimi}: Ohita ei liikahtanut lennon aikana`,
    lennonJalkeen.y === ennenNapautusta.y,
    `${ennenNapautusta.y} → ${lennonJalkeen.y}`);
  if (kuvia && KUVAKANSIO) {
    await s.screenshot({ path: join(KUVAKANSIO, 'ohita-pysyy-kartan-napautuksen-jalkeen.png') });
  }

  /*
   * 15: MOLEMPIEN LUENTOJEN LOPPU VIE OHITAN. Isoisän luenta päättyy
   * (vapautaPuhuja + diaryVoice null) eikä pulun repliikki ala:
   * vahdin oma odotus (OHITAN_PULUN_ODOTUS_MS = 6 s) kuluu loppuun.
   */
  await s.evaluate(async () => {
    const { ui } = window.matkakirja;
    const l = await import('/js/luenta.js');
    const aani = window.__ohitaAani;
    aani.paused = true;
    aani.ended = true;
    l.vapautaPuhuja(ui, aani);
    ui.diaryVoice = null;
    ui.liviaAani = null;
  });
  let loppui = null;
  for (let i = 0; i < 40; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    loppui = await ohitanTila();
    if (!loppui.domissa) break;
    // eslint-disable-next-line no-await-in-loop
    await s.waitForTimeout(250);
  }
  tieto(`${lappuNimi} Ohita luentojen jälkeen`, JSON.stringify(loppui));
  vaadi(`${lappuNimi}: Ohita poistuu, kun kumpikin luenta on loppu`,
    loppui.domissa === false, JSON.stringify(loppui));

  /*
   * 16: KELLUVA OHITA PYSÄYTTÄÄ YHÄ KAIKEN (PAATOKSET 35 kohta 6:
   * yksi pysäytys kattaa kaikki saapumisen äänet ja kuvat). Nappi ei
   * ole enää päällyksen lapsi, joten pysäytysketju mitataan uudelleen.
   */
  await viritaLuenta();
  await s.waitForSelector('.fokusvirta-isokuva-ruutu', { timeout: 30000 });
  await s.waitForTimeout(700);
  await s.evaluate(() => document.querySelector('.fokusvirta-isokuva-ohita')?.click());
  await s.waitForTimeout(1000);
  const pysaytys = await s.evaluate(() => {
    const { ui } = window.matkakirja;
    const aani = window.__ohitaAani;
    const kaikki = [...document.querySelectorAll('audio')];
    return {
      luentaPysahtyi: aani.paused === true || aani.ended === true || ui.diaryVoice === null,
      audioita: kaikki.length,
      soi: kaikki.filter((a) => !a.paused && !a.ended).length,
      ohitaDomissa: Boolean(document.querySelector('.fokusvirta-isokuva-ohita')),
      isoja: document.querySelectorAll('.fokusvirta-isokuva-ruutu').length,
    };
  });
  tieto(`${lappuNimi} kelluva Ohita → pysäytys`, JSON.stringify(pysaytys));
  vaadi(`${lappuNimi}: kelluva Ohita pysäyttää luennan sekunnissa`,
    pysaytys.luentaPysahtyi === true, JSON.stringify(pysaytys));
  vaadi(`${lappuNimi}: kelluvan Ohitan jälkeen yksikään <audio> ei soi`,
    pysaytys.soi === 0, JSON.stringify(pysaytys));
  vaadi(`${lappuNimi}: kelluva Ohita poistuu itse painalluksesta`,
    pysaytys.ohitaDomissa === false && pysaytys.isoja === 0, JSON.stringify(pysaytys));

  await konteksti.close();
}

await mittaaPaatokset38(RUUTU, '390 px', true);
await mittaaPaatokset38({ width: 1400, height: 900 }, '1400 px');

vaadi('ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));
await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} vartiota läpi`);
process.exit(lapi === kaikki ? 0 : 1);
