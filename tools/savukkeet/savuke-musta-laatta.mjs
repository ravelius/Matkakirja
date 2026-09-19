/*
 * SAVUKE: MUSTA LAATTA PANOROITAESSA — kartalla ei saa olla yhtään
 * täysin mustaa suorakaidetta liikkeen aikana.
 *
 *   PATH=/opt/homebrew/opt/node@22/bin:$PATH \
 *   PLAYWRIGHT_JS=<polku> node tools/savukkeet/savuke-musta-laatta.mjs \
 *     [--webkit] [--kuvat <kansio>] [--vanha] [--viive 550]
 *
 * === OMISTAJAN LÖYDÖS ==============================================
 *
 * 19.9.2026 klo 14.58 Suomen aikaa, iPhone, tuotanto v1954, kuva
 * Ranskan pelinäkymästä Pariisi-zoomilla (sanatarkasti):
 * *"Panoroidessa viela bugittaa hetkellisesti. Korjaantuu kylla mutta
 * liikkeen aikana nain"*. Keski-Ranskaan, Vézelayn ja Lascaux'n
 * väliin, ilmestyi yhden laatan kokoinen TÄYSIN MUSTA suorakaide
 * (n. 230 × 260 px 390 px:n ruudulla), joka hävisi liikkeen
 * päätyttyä.
 *
 * === MIKSI MUSTA ON ERI ASIA KUIN VÄLKKYMINEN ======================
 *
 * savuke-kerma-heti vartioi sitä, että kartan SÄVY ei hypähdä
 * panoroitaessa (kerma saapuu myöhässä). Se mittaa muutamaa kiinteää
 * pistettä eikä voisi nähdä yhtä laattaa, joka sattuu pisteiden
 * väliin — eikä se kysy mustaa lainkaan. Tämä savuke kysyy koko
 * kartan alalta yhden kysymyksen: onko kehyksessä yhtenäinen musta
 * suorakaide.
 *
 * MUSTA ON AINA VIKA. Pelin kartalla ei ole mustaa pintaa: pohja on
 * seepiaa, meri on sinistä, kerma on vaaleaa ja avaruus (pallon ohi
 * katsottaessa) on tähtitaustaa eikä RGB(0,0,0). Kynnys on siksi
 * ankara — kaikki kolme kanavaa alle 10 — ja mitta on SUURIN
 * täysin musta suorakaide kartan alalla.
 *
 * === MIKSI VERKKO HIDASTETAAN ======================================
 *
 * Omistajan havainto on liikkeen AIKANA. Mac Studion ja localhostin
 * välissä laatta saapuu millisekunneissa, jolloin se ikkuna, jossa
 * laatta on olemassa mutta sen kuva ei, on lyhyempi kuin yksi kehys.
 * Route-välitys viivyttää jokaista laattapyyntöä
 * (`/z<z>/<sarake>/<rivi>.webp`) satoja millisekunteja, jolloin
 * puhelinverkon tila on ruudulla mitattavan ajan.
 *
 * === VÄITE =========================================================
 *
 *   V1  Yhdessäkään panoroinnin kehyksessä ei ole kartan alalla
 *       täysin mustaa suorakaidetta ≥ 40 × 40 CSS-pikseliä.
 *   V2  (tieto) Sama levossa ennen panorointia ja sen jälkeen.
 *
 * Vastakoe: `--vanha` ajaa js/pallolaatat.js:n ja js/pallo.js:n
 * origin/mainista (gitistä, ei kopiona) — jos korjaus on se, mikä
 * mustan poistaa, vanha ajo kaatuu ja uusi ei.
 *
 * KAAPPAUKSET: `--kuvat <kansio>` tallentaa pahimman kehyksen ja
 * lepokuvat.
 */
import http from 'node:http';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { extname, join } from 'node:path';
import { inflateSync } from 'node:zlib';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import(process.env.PLAYWRIGHT_JS ?? 'playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
/*
 * SELAINMOOTTORI LIPULLA TAI YMPÄRISTÖSTÄ. Löydös on iOS Safarista,
 * joten WebKit on ensisijainen; Chromium ajetaan omana rivinään
 * (sarjat.json jaetut rivit lukevat SAVUKE_MOOTTORIn).
 */
const MOOTTORI = (process.argv.includes('--webkit') || process.env.SAVUKE_MOOTTORI === 'webkit')
  ? 'webkit' : 'chromium';
const moottori = paketti[MOOTTORI] ?? paketti.default?.[MOOTTORI];

const JUURI = new URL('../..', import.meta.url).pathname;
const argv = process.argv.slice(2);
const valitsin = (nimi, oletus) => {
  const i = argv.indexOf(`--${nimi}`);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : oletus;
};
const KUVAT = valitsin('kuvat', '');
const VANHA = argv.includes('--vanha');
const VIIVE = Number(valitsin('viive', '550'));
/** Musta = kaikki kanavat alle tämän. */
const MUSTA_RAJA = 10;
/** Pienin suorakaide, joka on vika (CSS-pikseliä). */
const RAJA_PX = 40;

/*
 * VERTAILUAJON VANHAT MODUULIT TULEVAT GITISTÄ, EI KOPIONA (sama
 * ratkaisu kuin savuke-kerma-heti ja savuke-kerma-reuna).
 */
const VANHAT = VANHA ? Object.fromEntries(
  ['/js/pallolaatat.js', '/js/pallo.js'].map((p) => [
    p, execFileSync('git', ['show', `origin/main:${p.slice(1)}`], { cwd: JUURI, encoding: 'utf8' }),
  ]),
) : null;

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.webp': 'image/webp', '.geojson': 'application/json',
};
const palvelin = http.createServer((req, res) => {
  const reitti = req.url.split('?')[0];
  if (VANHAT?.[reitti]) {
    res.writeHead(200, { 'content-type': 'text/javascript' });
    res.end(VANHAT[reitti]);
    return;
  }
  const polku = join(JUURI, reitti === '/' ? 'index.html' : reitti);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(Number(process.env.PORTTI) || 0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

/* Ämpäri Noden kautta: CORS estää 127.0.0.1:n suoran haun. */
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
  console.log('OHITUS: ämpäri ei vastaa — pallo ei voi latautua, savuke ei voi mitata.');
  palvelin.close();
  process.exit(0);
}

/* ---------------- PNG → RGBA (sama purku kuin savuke-topografialinssi) ------- */
function pngRGBA(buf) {
  let i = 8; let w = 0; let h = 0; let kanavia = 4; const idat = [];
  while (i < buf.length) {
    const len = buf.readUInt32BE(i);
    const tyyppi = buf.toString('ascii', i + 4, i + 8);
    const data = buf.subarray(i + 8, i + 8 + len);
    if (tyyppi === 'IHDR') {
      w = data.readUInt32BE(0); h = data.readUInt32BE(4);
      kanavia = data[9] === 6 ? 4 : (data[9] === 2 ? 3 : 4);
    }
    else if (tyyppi === 'IDAT') idat.push(data);
    else if (tyyppi === 'IEND') break;
    i += 12 + len;
  }
  const raaka = inflateSync(Buffer.concat(idat));
  const bpp = kanavia; const rivi = w * bpp;
  const ulos = Buffer.alloc(w * h * bpp);
  let p = 0;
  for (let y = 0; y < h; y += 1) {
    const f = raaka[p]; p += 1;
    for (let x = 0; x < rivi; x += 1) {
      const a = x >= bpp ? ulos[y * rivi + x - bpp] : 0;
      const b = y > 0 ? ulos[(y - 1) * rivi + x] : 0;
      const c = (x >= bpp && y > 0) ? ulos[(y - 1) * rivi + x - bpp] : 0;
      const v = raaka[p + x];
      let out = v;
      if (f === 1) out = v + a;
      else if (f === 2) out = v + b;
      else if (f === 3) out = v + ((a + b) >> 1);
      else if (f === 4) {
        const pp = a + b - c;
        const pa = Math.abs(pp - a); const pb = Math.abs(pp - b); const pc = Math.abs(pp - c);
        out = v + (pa <= pb && pa <= pc ? a : (pb <= pc ? b : c));
      }
      ulos[y * rivi + x] = out & 255;
    }
    p += rivi;
  }
  return { w, h, bpp, data: ulos };
}

/*
 * SUURIN TÄYSIN MUSTA SUORAKAIDE annetulla alalla. Mitta on
 * histogrammipinon klassikko (suurin suorakaide histogrammissa rivi
 * riviltä): O(leveys × korkeus), eli koko kehyssarja purkautuu
 * sekunneissa eikä savuke muutu itse pullonkaulaksi. Yksittäinen
 * musta pikseli (nimiön muste, merkin ääriviiva) ei riitä — vain
 * yhtenäinen suorakaide, jonka MOLEMMAT sivut ylittävät rajan.
 */
function mustinSuorakaide(kuva, alue) {
  const { w, bpp, data } = kuva;
  const x0 = Math.max(0, Math.round(alue.x));
  const y0 = Math.max(0, Math.round(alue.y));
  const x1 = Math.min(kuva.w, Math.round(alue.x + alue.w));
  const y1 = Math.min(kuva.h, Math.round(alue.y + alue.h));
  const lev = x1 - x0;
  if (lev <= 0 || y1 - y0 <= 0) return { leveys: 0, korkeus: 0, x: 0, y: 0, ala: 0 };
  const korkeudet = new Int32Array(lev);
  let paras = { leveys: 0, korkeus: 0, x: 0, y: 0, ala: 0 };
  const pino = new Int32Array(lev + 1);
  for (let y = y0; y < y1; y += 1) {
    for (let x = 0; x < lev; x += 1) {
      const i = (y * w + x0 + x) * bpp;
      const musta = data[i] < MUSTA_RAJA && data[i + 1] < MUSTA_RAJA && data[i + 2] < MUSTA_RAJA;
      korkeudet[x] = musta ? korkeudet[x] + 1 : 0;
    }
    let ylin = 0;
    for (let x = 0; x <= lev; x += 1) {
      const h = x === lev ? 0 : korkeudet[x];
      while (ylin > 0 && korkeudet[pino[ylin - 1]] >= h) {
        const kork = korkeudet[pino[ylin - 1]];
        ylin -= 1;
        const vasen = ylin > 0 ? pino[ylin - 1] + 1 : 0;
        const leveys = x - vasen;
        /*
         * VALINTA ON PIENEMMÄN SIVUN MUKAAN, EI PINTA-ALAN. Väite on
         * "≥ 40 × 40", joten 4 × 900 pikselin raita (kahden laatan
         * sauma) ei saa voittaa 60 × 60 laattaa mittarissa.
         */
        const mitta = Math.min(leveys, kork);
        if (mitta > Math.min(paras.leveys, paras.korkeus)) {
          paras = { leveys, korkeus: kork, x: x0 + vasen, y: y + 1 - kork, ala: leveys * kork };
        }
      }
      pino[ylin] = x; ylin += 1;
    }
  }
  return paras;
}

/* ---------------- peli ---------------- */
const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'ateena' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
const tallenne = JSON.stringify(peli.toJSON());

const selain = await (MOOTTORI === 'webkit'
  ? moottori.launch()
  : moottori.launch({
    executablePath: process.env.CHROMIUM || undefined,
    args: ['--disable-dev-shm-usage'],
  }));

const LEVEYS = 390;
const KORKEUS = 844;
const DPR = 2;

const ctx = await selain.newContext({
  viewport: { width: LEVEYS, height: KORKEUS },
  hasTouch: true,
  ...(MOOTTORI === 'webkit' ? {} : { isMobile: true }),
  deviceScaleFactor: DPR,
  serviceWorkers: 'block',
});
await ctx.addInitScript((data) => {
  try {
    localStorage.setItem('matkakirja-save-v1', data);
    localStorage.removeItem('matkakirja-lauta');
  } catch { /* yksityinen selaus */ }
}, tallenne);
const sivu = await ctx.newPage();
sivu.setDefaultTimeout(120000);
await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
await sivu.route(/wikimedia\.org/, (r) => r.abort());

/*
 * HIDAS VERKKO VAIN LAATOILLE. Luettelo (pyramidi.json), kirjasto ja
 * muu aineisto tulevat täydellä nopeudella — muuten savuke mittaisi
 * avauksen hitautta eikä laatan saapumisen ikkunaa. Viive on
 * PORRASTETTU (300…800 ms), jotta naapurilaatat eivät saavu samassa
 * nipussa: omistajan kuvassa MUSTA OLI YKSI LAATTA naapureidensa
 * keskellä, eli laatat saapuivat eri aikaan.
 */
/*
 * AUKKOKOE (`--aukkokoe`): joka N:s laattapyyntö kaatuu. Tämä EI ole
 * väite vaan ERITTELYKOE. Omistajan mustaa ei saatu toistumaan Mac
 * Studion verkolla edes 300…800 ms:n viiveellä — laatta ehtii aina
 * paikalle — joten kysymys "MIKÄ VÄRI on laatan tilalla, kun laattaa
 * ei ole" on pakko kysyä suoraan. Koe avaa aukon ja mittaa sen sävyn:
 * vanhoilla moduuleilla aukko on puhdas musta (globe.gl:n pohjapallon
 * RGB(0,0,0)) ja korjatuilla kartan oma sävy.
 */
const AUKKOKOE = argv.includes('--aukkokoe') || process.env.SAVUKE_AUKKOKOE === '1';
const LAATTA_RE = /\/z\d+\/\d+\/\d+\.(webp|png|jpg)(\?|$)/;
/** Kirjaston oma pohjalaatta: `.../<taso>/<x>/<y>.jpg` (ei z-etuliitettä). */
const POHJALAATTA_RE = /\/\d+\/\d+\/\d+\.jpg(\?|$)/;
let laattapyyntoja = 0;
let hidastettuja = 0;
let kaadettuja = 0;
await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (route) => {
  const url = route.request().url();
  if (AUKKOKOE && (LAATTA_RE.test(url) || POHJALAATTA_RE.test(url))) {
    laattapyyntoja += 1;
    if (laattapyyntoja % 4 === 0) { kaadettuja += 1; route.abort().catch(() => {}); return; }
  }
  const vastaus = await ampariHaku(url);
  if (LAATTA_RE.test(url)) {
    if (!AUKKOKOE) laattapyyntoja += 1;
    if (VIIVE > 0) {
      hidastettuja += 1;
      const ms = 300 + ((laattapyyntoja * 137) % 500) * (VIIVE / 550);
      await new Promise((ok) => { setTimeout(ok, ms); });
    }
  }
  if (!vastaus || vastaus.status !== 200) { route.abort().catch(() => {}); return; }
  route.fulfill({
    status: 200,
    contentType: vastaus.tyyppi ?? 'application/octet-stream',
    body: vastaus.body,
    headers: { 'access-control-allow-origin': '*' },
  }).catch(() => {});
});

await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 60000 });
const auki = await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 })
  .then(() => true).catch(() => false);
vaadi('pallolauta avautuu', auki);
if (!auki) {
  await ctx.close(); await selain.close(); palvelin.close();
  process.exit(1);
}
await sivu.waitForTimeout(2500);
await sivu.evaluate(async () => {
  const g = window.matkakirja.game;
  if (g.phase === 'pickstart') g.actionPickStart('lontoo', 0);
  const p = g.player;
  p.pos = { type: 'city', city: 'pariisi' };
  g.visitCity(p);
  window.matkakirja.ui.render();
});
await sivu.waitForTimeout(4000);
await sivu.evaluate(() => window.matkakirja.ui.pallolauta.saavu({ kesto: 0 }));
await sivu.waitForTimeout(9000);

const lepo = await sivu.evaluate(() => window.matkakirja.ui.pallolauta.lepokerros()?.mittarit?.() ?? null);
tieto('laattakerros levossa', JSON.stringify({
  taso: lepo?.taso, syy: lepo?.syy, laattoja: lepo?.laattoja,
  valmiita: lepo?.valmiita, varillisia: lepo?.varillisia, variMaa: lepo?.variMaa,
}));

/*
 * KARTAN ALA LUETAAN PALLON OMASTA KANKAASTA. UI:ta ei piiloteta:
 * piilotus muuttaisi juuri sitä sommittelua, jota mitataan, ja
 * kankaan suorakaide riittää rajaamaan yläpalkin ja Liiku-napin
 * mittarin ulkopuolelle. Reunasta jätetään 6 px, koska laudan
 * pyöristetty kulma on kankaan sisällä.
 */
const kanvasAla = await sivu.evaluate(() => {
  const k = [...document.querySelectorAll('canvas')]
    .map((c) => ({ c, r: c.getBoundingClientRect() }))
    .sort((a, b) => b.r.width * b.r.height - a.r.width * a.r.height)[0];
  if (!k) return null;
  const { r } = k;
  return {
    x: r.x + 6,
    y: r.y + 6,
    w: r.width - 12,
    h: r.height - 12,
    koko: `${Math.round(r.width)}×${Math.round(r.height)}`,
  };
});
vaadi('pallon kangas löytyy', Boolean(kanvasAla), 'ei canvasia');
tieto('kartan ala (CSS px)', kanvasAla
  ? `${Math.round(kanvasAla.w)}×${Math.round(kanvasAla.h)} @ ${Math.round(kanvasAla.x)},${Math.round(kanvasAla.y)}`
  : '-');
const ALA = {
  x: kanvasAla.x * DPR, y: kanvasAla.y * DPR, w: kanvasAla.w * DPR, h: kanvasAla.h * DPR,
};

const cdp = MOOTTORI === 'webkit' ? null : await ctx.newCDPSession(sivu);
const kaappaa = async () => (cdp
  ? Buffer.from((await cdp.send('Page.captureScreenshot', { format: 'png' })).data, 'base64')
  : sivu.screenshot());
const talleta = (nimi, png) => {
  if (!KUVAT || !png) return null;
  mkdirSync(KUVAT, { recursive: true });
  const polku = join(KUVAT, `${nimi}.png`);
  writeFileSync(polku, png);
  return polku;
};

const mittaa = (png) => mustinSuorakaide(pngRGBA(png), ALA);
const cssMitat = (m) => `${Math.round(m.leveys / DPR)}×${Math.round(m.korkeus / DPR)} px `
  + `@ ${Math.round(m.x / DPR)},${Math.round(m.y / DPR)}`;

const lepoPng = await kaappaa();
const lepoMusta = mittaa(lepoPng);
tieto('levossa suurin musta', cssMitat(lepoMusta));
talleta(`musta-laatta-${MOOTTORI}${VANHA ? '-vanha' : ''}-levossa`, lepoPng);

/*
 * PANOROINTI PALLON OMALLA KAMERALLA. Kosketuseleen inertia tekisi
 * matkasta eri mittaisen joka ajolla (savuke-kerma-hetin oppi).
 * Omistaja panoroi Pariisista etelään, joten liike on latitudissa,
 * ja se tehdään KOLMENA ELEENÄ tauolla välissä: jokainen ele avaa
 * uuden rivin laattoja, ja juuri rivin ensimmäiset laatat ovat
 * niitä, joiden kuva ei ole vielä saapunut.
 */
const alkuPov = await sivu.evaluate(() => window.matkakirja.ui.pallolauta.pallo.pointOfView());
tieto('alku-pov', JSON.stringify(alkuPov));

const kehykset = [];
const ELEITA = 3;
const ELE_ASTETTA = 1.6;
const ELE_MS = 1400;
for (let ele = 0; ele < ELEITA; ele += 1) {
  /* eslint-disable no-await-in-loop */
  await sivu.evaluate((a) => {
    const pallo = window.matkakirja.ui.pallolauta.pallo;
    const alku = pallo.pointOfView();
    window.__panorointi = new Promise((valmis) => {
      const t0 = performance.now();
      const askel = (nyt) => {
        const t = Math.min(1, (nyt - t0) / a.ms);
        pallo.pointOfView({ lat: alku.lat - a.asteet * t, lng: alku.lng, altitude: alku.altitude }, 0);
        if (t < 1) requestAnimationFrame(askel); else valmis();
      };
      requestAnimationFrame(askel);
    });
  }, { asteet: ELE_ASTETTA, ms: ELE_MS });
  /*
   * KAAPPAUKSET TALTEEN, ANALYYSI VASTA JÄLKEEN: pikselipurku on
   * satoja millisekunteja eikä sitä saa tehdä kesken liikkeen.
   */
  for (let i = 0; i < 18; i += 1) {
    kehykset.push({ ele, i, png: await kaappaa() });
    await sivu.waitForTimeout(80);
  }
  await sivu.evaluate(() => window.__panorointi);
  await sivu.waitForTimeout(250);
  /* eslint-enable no-await-in-loop */
}
tieto('kehyksiä', `${kehykset.length} (${ELEITA} elettä × ${ELE_ASTETTA}° etelään)`);
tieto('laattapyyntöjä', `${laattapyyntoja}, hidastettuja ${hidastettuja}, kaadettuja ${kaadettuja}`
  + ` (viive ${VIIVE} ms -asteikko${AUKKOKOE ? ', AUKKOKOE' : ''})`);

let pahin = null;
for (const kehys of kehykset) {
  const m = mittaa(kehys.png);
  if (!pahin || Math.min(m.leveys, m.korkeus) > Math.min(pahin.m.leveys, pahin.m.korkeus)) {
    pahin = { ...kehys, m };
  }
}
const pahinCss = Math.min(pahin.m.leveys, pahin.m.korkeus) / DPR;
tieto('pahin kehys', `ele ${pahin.ele} kehys ${pahin.i}: ${cssMitat(pahin.m)}`);
if (pahinCss >= RAJA_PX / 2) talleta(`musta-laatta-${MOOTTORI}${VANHA ? '-vanha' : ''}-pahin`, pahin.png);

const loppuPng = await kaappaa();
const loppuMusta = mittaa(loppuPng);
talleta(`musta-laatta-${MOOTTORI}${VANHA ? '-vanha' : ''}-lopussa`, loppuPng);

if (AUKKOKOE) {
  /* Erittelykoe ei ole väite: se KIRJAA aukon sävyn. */
  tieto(`AUKKOKOE ${MOOTTORI}${VANHA ? ' (vanha)' : ''} suurin musta`,
    `${cssMitat(pahin.m)} (ele ${pahin.ele}, kehys ${pahin.i})`);
}
else {
  vaadi(`V1 ${MOOTTORI}: panoroinnin aikana ei mustaa suorakaidetta ≥ ${RAJA_PX} × ${RAJA_PX} px`,
    !(pahin.m.leveys / DPR >= RAJA_PX && pahin.m.korkeus / DPR >= RAJA_PX),
    `pahin ${cssMitat(pahin.m)} (ele ${pahin.ele}, kehys ${pahin.i})`);
}
tieto('V2 levossa ennen', cssMitat(lepoMusta));
tieto('V2 levossa jälkeen', cssMitat(loppuMusta));

const jalki = await sivu.evaluate(() => window.matkakirja.ui.pallolauta.lepokerros()?.mittarit?.() ?? null);
tieto('laattakerros lopussa', JSON.stringify({
  taso: jalki?.taso, syy: jalki?.syy, laattoja: jalki?.laattoja, valmiita: jalki?.valmiita,
  scenessa: jalki?.scenessa, jonossa: jalki?.jonossa, ladattavia: jalki?.ladattavia,
}));

await ctx.close();
await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} väitettä läpi (${MOOTTORI}${VANHA ? ', vanha' : ''})`);
process.exit(lapi === kaikki ? 0 : 1);
