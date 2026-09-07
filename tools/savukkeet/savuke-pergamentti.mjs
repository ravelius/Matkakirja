/*
 * SELAINSAVUKE: PERGAMENTIN REPALEINEN REUNA (js/pergamentti.js).
 *
 *   node tools/savukkeet/savuke-pergamentti.mjs [kuvakansio]
 *
 * MIKSI. Omistaja 7.9.2026 ilta (iPad, Ihmisen matkan avauslaatikko),
 * sanatarkasti: *"Paperin rosoiset reunat ovat aivan liian geometrisiä
 * ja niiden takaa näkyy täysin mustaa, vaikka paperin ympärillä on
 * sitten kevyt hehku. Saisiko sen paperin ääriviivan tehtyä
 * luonnollisemmin?"* Kumpikaan vika ei näy yksikkötestissä: reunan
 * muoto ja kajon osuminen ovat PIKSELEITÄ. Siksi tämä savuke lukee
 * kuvakaappauksen pikselit itse (oma pieni PNG-purku) ja mittaa
 * paperin ääriviivan sekä sen ulkopuolen kirkkauden.
 *
 * VÄITTEET (834 × 1100 dpr 2 ja 390 × 844 dpr 2):
 *   1. Rakenne: paperi on maskattu (.pergamentti-repale +
 *      --pergamentti-maski), kajokerros on olemassa
 *      (.pergamentti-hehku + --pergamentti-hehkukuva) eikä vanhaa
 *      clip-path-monikulmiota ole enää.
 *   2. REUNA EI OLE SUORA: paperin vasemman reunan x-paikka vaihtelee
 *      riviltä toiselle vähintään 6 laitepikseliä (huipusta huippuun)
 *      ja keskihajonta on yli 1 px. Tasavälinen sahalaita läpäisisi
 *      tämän myös — siksi mukana on kolmas mittari:
 *   3. REUNAN MUOTO TULEE TURBULENSSISTA: maskikuvassa on kaksi
 *      feTurbulence + feDisplacementMap -paria ja pehmennys. Reunan
 *      JAKSOLLISUUS raportoidaan INFO-rivinä mutta siitä ei väitetä:
 *      mittaus vanhaa monikulmiota vasten (6/16 läpi, 7.9.2026)
 *      osoitti, ettei tasavälistä sahalaitaa erota pikselitasolla
 *      kohinasta, kun poikkeama on kummassakin noin 14 px. Se, mikä
 *      EROTTUU, on kajo (väite 4) ja maskin olemassaolo.
 *   4. EI MUSTAA RAKOA: 3 px reunan ULKOPUOLELLA kirkkaus on JOKA
 *      RIVILLÄ vähintään 15/255 (kajo myötäilee reunaa). Vanhassa
 *      versiossa lovien pohjalla oli puhdasta mustaa.
 *   5. Kajo VAIMENEE ulospäin: 3 px:n päässä kirkkaampi kuin 24 px:n
 *      päässä — hehku on hehku, ei kehys. Ja se on KEVYT: keskimäärin
 *      alle 45/255 reunan vieressä (omistaja 7.9.2026 ilta:
 *      *"ylä- ja alareuna on, kuin paperi olisi tulessa"* — silloin
 *      lukema oli 58).
 *   6. YLÄ- JA ALAREUNA OVAT RAUHALLISET. Mitataan MASKISTA
 *      ERISTETTYNÄ (valkoinen laatta mustaa vasten, ei paperia eikä
 *      lyhtyjä): vaakareunojen aaltoilun on oltava korkeintaan puolet
 *      sivujen aaltoilusta, ja sivujen on pysyttävä revittyinä
 *      (omistaja: *"Sivut ovat ihan ok"*). Sama mittaus antaa
 *      repeämän SYVIMMÄN puraisun osuutena paperin leveydestä.
 *   7. TEKSTI EI OLE REUNASSA: pehmuste miinus syvin puraisu on joka
 *      reunalla vähintään 1,6 rem, ja Käynnistä-napin alle jää sama
 *      tila (*"ei saa olla leikannut noin lähelle tekstiä"*).
 *   8. Ei sivuvirheitä.
 *
 * Kuvakaappaus (jos kuvakansio annetaan): `pergamentti-<näkymä>.png`.
 */
import http from 'node:http';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { inflateSync } from 'node:zlib';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { maskiKuva, siemenNimesta } from '../../js/pergamentti.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

const NAKYMAT = [
  { nimi: 'ipad', width: 834, height: 1100, dpr: 2 },
  { nimi: 'puhelin', width: 390, height: 844, dpr: 2 },
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
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

/* ---------- PNG-purku (8-bittinen RGB/RGBA, ei lomitusta) ----------
 * Chromen kaappaus on juuri tätä muotoa. Oma purku, koska savukkeilla
 * ei ole kuvakirjastoa eikä sellaista haluta yhden mittauksen takia.
 */
function lueP(buf) {
  let kohta = 8;
  let w = 0; let h = 0; let bitti = 0; let tyyppi = 0;
  const idat = [];
  while (kohta + 8 <= buf.length) {
    const pituus = buf.readUInt32BE(kohta);
    const nimi = buf.toString('ascii', kohta + 4, kohta + 8);
    const data = buf.subarray(kohta + 8, kohta + 8 + pituus);
    if (nimi === 'IHDR') {
      w = data.readUInt32BE(0); h = data.readUInt32BE(4); bitti = data[8]; tyyppi = data[9];
      if (data[12] !== 0) throw new Error('lomitettu PNG');
    } else if (nimi === 'IDAT') idat.push(Buffer.from(data));
    else if (nimi === 'IEND') break;
    kohta += 12 + pituus;
  }
  if (bitti !== 8 || (tyyppi !== 2 && tyyppi !== 6)) {
    throw new Error(`odottamaton PNG (bitti ${bitti}, tyyppi ${tyyppi})`);
  }
  const kanavia = tyyppi === 6 ? 4 : 3;
  const raaka = inflateSync(Buffer.concat(idat));
  const rivi = w * kanavia;
  const ulos = Buffer.alloc(w * h * kanavia);
  let edellinen = Buffer.alloc(rivi);
  for (let y = 0; y < h; y += 1) {
    const alku = y * (rivi + 1);
    const suodatin = raaka[alku];
    const lahde = raaka.subarray(alku + 1, alku + 1 + rivi);
    const kohde = ulos.subarray(y * rivi, y * rivi + rivi);
    for (let i = 0; i < rivi; i += 1) {
      const a = i >= kanavia ? kohde[i - kanavia] : 0;
      const b = edellinen[i];
      const c = i >= kanavia ? edellinen[i - kanavia] : 0;
      let v = lahde[i];
      if (suodatin === 1) v += a;
      else if (suodatin === 2) v += b;
      else if (suodatin === 3) v += (a + b) >> 1;
      else if (suodatin === 4) {
        const ennuste = a + b - c;
        const pa = Math.abs(ennuste - a); const pb = Math.abs(ennuste - b);
        const pc = Math.abs(ennuste - c);
        v += (pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c);
      }
      kohde[i] = v & 255;
    }
    edellinen = kohde;
  }
  const kirkkaus = (x, y) => {
    if (x < 0 || y < 0 || x >= w || y >= h) return 0;
    const i = (y * w + x) * kanavia;
    return 0.2126 * ulos[i] + 0.7152 * ulos[i + 1] + 0.0722 * ulos[i + 2];
  };
  return { w, h, kirkkaus };
}

const keskiarvo = (a) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0);
const hajonta = (a) => {
  if (a.length < 2) return 0;
  const k = keskiarvo(a);
  return Math.sqrt(keskiarvo(a.map((v) => (v - k) ** 2)));
};

/*
 * Paperin vasen reuna rivillä: JYRKIN NOUSU, ei kiinteä kirkkausraja.
 * Paperi tummuu alaspäin ja vasempaan laitaan (lyhtyjen varjo ja
 * kulmien kellastumat), joten yksi kirkkausraja löytäisi alarivien
 * reunan syvältä paperin sisältä. Kajo sen sijaan on tasainen liuku ja
 * reuna terävä — suurin muutos kuuden pikselin matkalla osuu reunaan.
 * Palauttaa { x, jyrkkyys } tai null.
 */
function reunaRivilla(kuva, y, alkuX, loppuX) {
  let paras = -1;
  let jyrkkyys = 0;
  for (let x = alkuX + 3; x < loppuX; x += 1) {
    const d = kuva.kirkkaus(x + 3, y) - kuva.kirkkaus(x - 3, y);
    if (d > jyrkkyys) { jyrkkyys = d; paras = x; }
  }
  return paras > 0 && jyrkkyys >= 8 ? { x: paras, jyrkkyys } : null;
}

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

/* ---------- 1. MASKI ERISTETTYNÄ ----------
 * Valkoinen suorakaide mustaa vasten, maski päällä, ei muuta. Näin
 * repeämän muoto mitataan ILMAN paperin tekstuuria, kellastumaa ja
 * lyhtyjä — pelinäkymässä ne peittävät reunan alleen niin, ettei
 * pikselihaku erota repeämää sisäreunan varjon rinteestä.
 *
 * MITÄ MITATAAN: kunkin reunan syvyys eli kuinka monta pikseliä
 * elementin suorasta reunasta paperi alkaa. Ylä- ja alareunan pitää
 * aaltoilla SELVÄSTI vähemmän kuin sivujen (omistaja 7.9.2026 ilta:
 * *"Sivut ovat ihan ok, mutta ylä- ja alareuna on, kuin paperi olisi
 * tulessa, eli saa liikkua rauhallisemmin."*), ja syvin puraisu
 * kertoo, paljonko pehmustetta laatikko tarvitsee.
 */
const MASKI_W = 600;
const MASKI_H = 450;
const MASKI_M = 60;
const maskiSivu = await (await selain.newContext({
  viewport: { width: MASKI_W + 2 * MASKI_M, height: MASKI_H + 2 * MASKI_M },
})).newPage();
const maskiUrl = maskiKuva(siemenNimesta('Ihmisen matka'), MASKI_W / MASKI_H);
await maskiSivu.setContent('<body style="margin:0;background:#000">'
  + `<div style="position:absolute;left:${MASKI_M}px;top:${MASKI_M}px;`
  + `width:${MASKI_W}px;height:${MASKI_H}px;background:#fff;`
  + `-webkit-mask-image:url('${maskiUrl}');mask-image:url('${maskiUrl}');`
  + '-webkit-mask-size:100% 100%;mask-size:100% 100%;'
  + "-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat\"></div></body>");
await maskiSivu.waitForTimeout(400);
const maskiKuvake = lueP(await maskiSivu.screenshot());
const RAJA = 128;
const syvyys = { yla: [], ala: [], vasen: [], oikea: [] };
for (let x = Math.round(MASKI_M + MASKI_W * 0.15); x < MASKI_M + MASKI_W * 0.85; x += 1) {
  let y = MASKI_M - 30;
  while (y < MASKI_M + 140 && maskiKuvake.kirkkaus(x, y) < RAJA) y += 1;
  syvyys.yla.push(y - MASKI_M);
  let y2 = MASKI_M + MASKI_H + 30;
  while (y2 > MASKI_M + MASKI_H - 140 && maskiKuvake.kirkkaus(x, y2) < RAJA) y2 -= 1;
  syvyys.ala.push(MASKI_M + MASKI_H - y2);
}
for (let y = Math.round(MASKI_M + MASKI_H * 0.15); y < MASKI_M + MASKI_H * 0.85; y += 1) {
  let x = MASKI_M - 30;
  while (x < MASKI_M + 140 && maskiKuvake.kirkkaus(x, y) < RAJA) x += 1;
  syvyys.vasen.push(x - MASKI_M);
  let x2 = MASKI_M + MASKI_W + 30;
  while (x2 > MASKI_M + MASKI_W - 140 && maskiKuvake.kirkkaus(x2, y) < RAJA) x2 -= 1;
  syvyys.oikea.push(MASKI_M + MASKI_W - x2);
}
const p2p = (a) => Math.max(...a) - Math.min(...a);
const vaaka = Math.max(p2p(syvyys.yla), p2p(syvyys.ala));
const sivut = Math.max(p2p(syvyys.vasen), p2p(syvyys.oikea));
const syvin = Math.max(...Object.values(syvyys).map((a) => Math.max(...a)));
/** Syvin puraisu osuutena paperin LEVEYDESTÄ — sama luku joka koossa. */
const syomaOsuus = syvin / MASKI_W;
tieto('maskin reunasyvyydet (600 × 450 px)', Object.entries(syvyys)
  .map(([k, a]) => `${k} ${Math.min(...a)}–${Math.max(...a)}`).join(', '));
vaadi('ylä- ja alareuna aaltoilevat sivuja rauhallisemmin',
  vaaka * 2 <= sivut && vaaka >= 1,
  `vaaka ${vaaka} px, sivut ${sivut} px — omistaja pyysi vaakareunalle noin kolmasosaa`);
vaadi('sivut ovat yhä revityt (omistaja: "sivut ovat ihan ok")', sivut >= 6,
  `sivujen vaihtelu ${sivut} px`);
vaadi('repeämä pysyy maskin marginaalissa eikä yllä syvälle paperiin',
  syvin <= 0.06 * MASKI_W, `syvin puraisu ${syvin} px (${(syomaOsuus * 100).toFixed(1)} % leveydestä)`);
await maskiSivu.context().close();

/* ---------- 2. AVAUSLAATIKKO PELISSÄ ---------- */
const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'ateena' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
const tallenne = JSON.stringify(peli.toJSON());

for (const nakyma of NAKYMAT) {
  const n = (t) => `[${nakyma.nimi}] ${t}`;
  const ctx = await selain.newContext({
    viewport: { width: nakyma.width, height: nakyma.height },
    deviceScaleFactor: nakyma.dpr,
    serviceWorkers: 'block',
  });
  await ctx.addInitScript((d) => {
    try {
      localStorage.setItem('matkakirja-save-v1', d);
      localStorage.setItem('matkakirja-livia-avaus', '1');
      localStorage.setItem('matkakirja-livia-paljastus', '1');
    } catch { /* yksityinen tila */ }
  }, tallenne);
  const sivu = await ctx.newPage();
  const virheet = [];
  sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
  await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());

  await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui), null, { timeout: 60000 });
  await sivu.waitForTimeout(2500);

  /* Avausjakso auki: Ihmisen matkan laatikko, sama kuin omistajan kuvassa. */
  const tila = await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    ui.busy = false;
    const lahti = await ui.kaynnistaAikajana('ihmisen-matka');
    for (let i = 0; i < 400; i += 1) {
      if (document.querySelector('.aikajana-avaus.laatikko-nakyy')) break;
      await new Promise((r) => setTimeout(r, 50));
    }
    const laatikko = document.querySelector('.aikajana-avaus-laatikko');
    const hehku = document.querySelector('.aikajana-avaus-hehku');
    const tyyli = laatikko ? getComputedStyle(laatikko) : null;
    return {
      lahti,
      repale: Boolean(laatikko?.classList.contains('pergamentti-repale')),
      maski: (laatikko?.style.getPropertyValue('--pergamentti-maski') ?? '').slice(0, 40),
      maskiKokonaan: laatikko?.style.getPropertyValue('--pergamentti-maski') ?? '',
      hehkuLuokka: Boolean(hehku?.classList.contains('pergamentti-hehku')),
      hehkuKuva: (hehku?.style.getPropertyValue('--pergamentti-hehkukuva') ?? '').slice(0, 40),
      clip: tyyli?.clipPath ?? '',
      maskiLaskettu: (tyyli?.maskImage ?? tyyli?.webkitMaskImage ?? '').slice(0, 30),
    };
  });
  const { maskiKokonaan, ...lyhyt } = tila;
  tieto(n('avaustila'), JSON.stringify(lyhyt));
  vaadi(n('avauslaatikko aukeaa ja on maskattu pergamentiksi'),
    tila.lahti && tila.repale && tila.maski.startsWith('url("data:image/svg+xml'),
    JSON.stringify(lyhyt));
  vaadi(n('kajokerros on olemassa ja saa saman muodon'),
    tila.hehkuLuokka && tila.hehkuKuva.startsWith('url("data:image/svg+xml'),
    JSON.stringify(lyhyt));
  vaadi(n('vanha clip-path-monikulmio on poistettu'),
    !tila.clip.includes('polygon'), tila.clip.slice(0, 80));

  await sivu.waitForTimeout(900);

  /* Kaappaus laatikon ympäriltä laitepikseleinä (CDP: ei fonttiodotusta). */
  const laatikko = await sivu.evaluate(() => {
    const r = document.querySelector('.aikajana-avaus-laatikko').getBoundingClientRect();
    const otsikko = document.querySelector('.aikajana-avaus-otsikko')?.getBoundingClientRect();
    const nappi = document.querySelector('.aikajana-avaus-nappi')?.getBoundingClientRect();
    const cs = getComputedStyle(document.querySelector('.aikajana-avaus-laatikko'));
    return {
      x: r.x, y: r.y, width: r.width, height: r.height,
      pehmuste: [cs.paddingTop, cs.paddingRight, cs.paddingBottom, cs.paddingLeft].map(parseFloat),
      otsikkoVali: otsikko ? otsikko.top - r.top : 0,
      nappiVali: nappi ? r.bottom - nappi.bottom : 0,
      rem: parseFloat(getComputedStyle(document.documentElement).fontSize) || 16,
    };
  });
  const reuna = 46;
  // Kapealla ruudulla laatikon vasemmalle puolelle ei mahdu koko
  // marginaalia: leikkaus alkaa nollasta, ja reunan odotettu paikka
  // lasketaan TODELLISESTA leikkauskohdasta.
  const leikkausX = Math.max(0, laatikko.x - reuna);
  const leikkausY = Math.max(0, laatikko.y - reuna);
  const cdp = await ctx.newCDPSession(sivu);
  const { data } = await cdp.send('Page.captureScreenshot', {
    format: 'png',
    clip: {
      x: leikkausX,
      y: leikkausY,
      width: laatikko.width + 2 * reuna,
      height: laatikko.height + 2 * reuna,
      scale: nakyma.dpr,
    },
  });
  const puskuri = Buffer.from(data, 'base64');
  if (KUVAKANSIO) writeFileSync(join(KUVAKANSIO, `pergamentti-${nakyma.nimi}.png`), puskuri);
  const kuva = lueP(puskuri);

  /*
   * MITTAUS RIVEITTÄIN kuvan keskiosasta (kulmat ja alareunan varjo
   * pois). Etsintäikkuna on laatikon vasemman laidan ympärillä, jotta
   * tekstin kirjaimet eivät kelpaa reunaksi.
   */
  const yAlku = Math.round(kuva.h * 0.15);
  // Yläosaan asti: alareunassa paperi painuu varjoon (::after), eikä
  // reunan jyrkkyys erotu enää kajon liu'usta.
  const yLoppu = Math.round(kuva.h * 0.6);
  /*
   * Etsintäikkuna on TIUKKA: reunan odotettu paikka tunnetaan
   * leikkauskohdasta, ja ±30 px riittää repeämälle. Ilman rajausta
   * haku eksyy alarivien varjossa kuvan laitaan (karttaruudun oma
   * reunaviiva), jonka nousu on loivan paperireunan nousua jyrkempi.
   */
  const odotettu = Math.round((laatikko.x - leikkausX) * nakyma.dpr);
  const profiili = [];
  for (let y = yAlku; y < yLoppu; y += 1) {
    const osuma = reunaRivilla(kuva, y, Math.max(0, odotettu - 30), odotettu + 30);
    if (osuma) profiili.push({ y, x: osuma.x });
  }
  const xt = profiili.map((r) => r.x);
  const vaihtelu = xt.length ? Math.max(...xt) - Math.min(...xt) : 0;
  const keskih = hajonta(xt);
  tieto(n('reunan profiili'), `rivejä ${xt.length}/${yLoppu - yAlku}, huipusta huippuun ${vaihtelu} px, `
    + `keskihajonta ${keskih.toFixed(2)} px`);
  /*
   * Ylä- ja alaraja: repeämä on repeämä, ei suora viiva eikä kaaos.
   * Yläraja paljastaa myös sen, jos reunanhaku eksyy paperin sisään.
   */
  vaadi(n('reuna ei ole suora viiva'),
    xt.length > (yLoppu - yAlku) * 0.8 && vaihtelu >= 6 && vaihtelu <= 70 && keskih >= 1 && keskih <= 25,
    `rivejä ${xt.length}, vaihtelu ${vaihtelu}, hajonta ${keskih.toFixed(2)}`);

  /*
   * JAKSOLLISUUS RAPORTOIDAAN, EI VÄITETÄ. Profiili tasoitetaan
   * yhdeksän rivin liukuvalla keskiarvolla ja käännökseksi lasketaan
   * vain yli 1,5 px:n heilahdus. Luku on ihmiselle: repeämä antaa
   * tiheät ja epätasaiset käännökset, tasavälinen monikulmio harvat ja
   * säännölliset. Vartijaksi se ei kelpaa — vanhaa monikulmiota vasten
   * mitattuna (7.9.2026) iPadin luvut olivat lähes samat, koska
   * poikkeama on kummassakin noin 14 px ja mittaus tasoittaa loput.
   */
  const tasoitettu = xt.map((_, i) => keskiarvo(xt.slice(Math.max(0, i - 4), i + 5)));
  const kaannokset = [];
  let suunta = 0;
  let viimeisin = tasoitettu[0] ?? 0;
  for (let i = 1; i < tasoitettu.length; i += 1) {
    const muutos = tasoitettu[i] - viimeisin;
    if (Math.abs(muutos) < 1.5) continue;
    if (suunta !== 0 && Math.sign(muutos) !== suunta) kaannokset.push(i);
    suunta = Math.sign(muutos);
    viimeisin = tasoitettu[i];
  }
  const valit = kaannokset.slice(1).map((v, i) => v - kaannokset[i]);
  const valiKa = keskiarvo(valit);
  const kerroin = valiKa > 0 ? hajonta(valit) / valiKa : 0;
  tieto(n('reunan jaksollisuus'), `käännöksiä ${kaannokset.length}, väli ka ${valiKa.toFixed(1)} px, vaihtelukerroin ${kerroin.toFixed(2)}`);

  /*
   * MUOTO TULEE TURBULENSSISTA: maskikuva luetaan DOMista ja
   * puretaan. Tämä erottaa uuden reunan vanhasta varmasti — vanhassa
   * ei ole maskia lainkaan.
   */
  const maski = decodeURIComponent(maskiKokonaan);
  vaadi(n('maskin reuna rikotaan kahdella turbulenssilla ja pehmennetään'),
    (maski.match(/feTurbulence/g) ?? []).length === 2
    && (maski.match(/feDisplacementMap/g) ?? []).length === 2
    && maski.includes('feGaussianBlur'),
    maski.slice(0, 200));

  /*
   * KAJO: 3 px ja 24 px reunan ULKOPUOLELLA, joka riviltä erikseen.
   * Vertailu ei ole "taustaan": kuvan reunoilla on peitteen lisäksi
   * pelin omaa kuorta, eikä puhdasta mustaa aina näy otoksessa. Vanha
   * vika näkyy suoraan MINIMISSÄ — lovien pohjalla kirkkaus putosi
   * lähelle nollaa, vaikka muualla reunan vieressä oli kajo.
   */
  const lahi = [];
  const kauko = [];
  for (const { y, x } of profiili) {
    lahi.push(kuva.kirkkaus(x - 3, y));
    kauko.push(kuva.kirkkaus(x - 24, y));
  }
  const lahiMin = Math.min(...lahi);
  const lahiKa = keskiarvo(lahi);
  const kaukoKa = keskiarvo(kauko);
  tieto(n('kajo reunan ulkopuolella'), `3 px: ka ${lahiKa.toFixed(1)} min ${lahiMin.toFixed(1)} | `
    + `24 px: ka ${kaukoKa.toFixed(1)} min ${Math.min(...kauko).toFixed(1)}`);
  vaadi(n('reunan ulkopuolella ei ole mustaa rakoa (kajo myötäilee reunaa)'), lahiMin >= 8,
    `himmein kohta 3 px reunan ulkopuolella oli ${lahiMin.toFixed(1)} (raja 8)`);
  /*
   * ALARAJA vartioi mustaa rakoa, YLÄRAJA liekkiä. Omistajan
   * hylkäämässä versiossa (7.9.2026 ilta, *"kuin paperi olisi
   * tulessa"*) tämä lukema oli 58; vanhassa monikulmiossa 0,0.
   */
  vaadi(n('kajo on kevyt eikä liekki'), lahiKa <= 45 && lahiKa > kaukoKa + 3,
    `3 px ${lahiKa.toFixed(1)} (katto 45), 24 px ${kaukoKa.toFixed(1)}`);

  /*
   * TEKSTI EI SAA OLLA REUNASSA (omistaja 7.9.2026 ilta: *"ei saa olla
   * leikannut noin lähelle tekstiä"*).
   *
   * Tätä EI mitata pikseleistä. Kokeiltiin ja hylättiin: jyrkimmän
   * kirkkausmuutoksen haku pystysuunnassa löytää paperin SISÄREUNAN
   * kellastuman rinteen (inset-varjo, säde 20–86 px) eikä repeämää,
   * koska repeämän kohdalla kontrasti on pieni — ulkona himmeä kajo,
   * sisällä tumma reunavyö. Sen sijaan kaksi mitattua lukua kerrotaan
   * keskenään: repeämän syvyys mitataan MASKISTA ERISTETTYNÄ (osio
   * yllä, `syomaOsuus` = syvin puraisu jaettuna paperin leveydellä) ja
   * pehmuste luetaan DOMista. Erotus on se vapaa tila, jonka omistaja
   * pyysi — ja se pätee sellaisenaan myös leveämmällä paperilla, koska
   * kumpikin luku on osuus laatikon leveydestä.
   */
  const vara = 1.6 * laatikko.rem;
  const syoma = syomaOsuus * laatikko.width;
  const vapaa = {
    yla: laatikko.pehmuste[0] - syoma,
    oikea: laatikko.pehmuste[1] - syoma,
    ala: laatikko.pehmuste[2] - syoma,
    vasen: laatikko.pehmuste[3] - syoma,
  };
  tieto(n('vapaa tila repeämän ja tekstin välissä'), `ylä ${vapaa.yla.toFixed(1)} `
    + `oikea ${vapaa.oikea.toFixed(1)} ala ${vapaa.ala.toFixed(1)} vasen ${vapaa.vasen.toFixed(1)} px `
    + `(repeämä syö ${syoma.toFixed(1)} px, vaadittu vara ${vara.toFixed(1)} px)`);
  vaadi(n('repeämä ei ylety tekstiin: vapaata tilaa joka reunalla'),
    Math.min(...Object.values(vapaa)) >= vara,
    JSON.stringify(Object.fromEntries(Object.entries(vapaa).map(([k, v]) => [k, Math.round(v)]))));

  // Käynnistä-nappi ei kosketa alareunaa: sen alle jää koko alapehmuste.
  vaadi(n('Käynnistä-nappi ei kosketa alareunaa'), laatikko.nappiVali >= vara + syoma,
    `napin alla ${laatikko.nappiVali.toFixed(1)} px, vaadittu ${(vara + syoma).toFixed(1)} px`);

  vaadi(n('ei sivuvirheitä'), virheet.length === 0, virheet.join(' | ').slice(0, 300));
  await ctx.close();
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
