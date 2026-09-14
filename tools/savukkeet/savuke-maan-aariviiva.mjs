/*
 * Savuke: KOHDEMAAN ÄÄRIVIIVA PALLOLLA — EHJÄ, MUIDEN RAJOJEN VÄRINEN,
 * EROTTUU PAKSUUDELLA (karttauudistuksen PÄÄTÖKSET 11 kohta 2, 14
 * kohta 2 ja 15 kohta 3; omistaja 14.9.2026 ensin *"jostain syysta
 * kartan punainen aariviiva ei piirry koko matkalta. aariviiva saisi
 * olla murretumpi ja tummempi punainen ja aariviiva hieman leveampi."*,
 * sitten *"vaihda samalla kartan reuna musteen siniseksi"*, ja
 * lopuksi *"Muuta maanraja saman variseksi kuin muut rajat."*)
 *
 * Leveys ja katkokorjaus pysyvät; VÄRI vaihtui kolmannen kerran, ja
 * sen mukana tämän savukkeen VÄRIMITTA. Kehä ei enää erotu omalla
 * sävyllään — se on täsmälleen naapurirajojen muste (RAJA_MUSTE
 * #6b5539, paletissa `--raja-muste`) — vaan LEVEYDELLÄ (3 css-px
 * vs. tavallisen rajan ~1) ja TÄYDELLÄ PEITOLLA (1 vs. 0,34).
 *
 * ── MITÄ TÄMÄ MITTAA ───────────────────────────────────────────────
 *
 * Kehä piirretään pallolla LineSegments2:na (js/pallovektorit.js), eli
 * jokainen renkaan jana on oma nelikulmionsa. Peräkkäiset janat EIVÄT
 * kohtaa kulmassa — päätypyörylä on se, mikä kulman täyttää — ja
 * 7.9.2026 pyörylä leikattiin varjostimessa pois, koska LÄPINÄKYVÄ
 * rantaviivan muste kasautui kärjissä tummaksi. Kohdemaan kehä on
 * täysin peittävä (KOROSTUS_PEITTO 1), joten kasautumista ei ole, ja
 * pyöryläin poisto jätti siihen vain lovet. Lovia on sitä tiheämmin
 * mitä rosoisempi raja on: Ranskan maarajat (Belgia, Rein, Alpit,
 * Pyreneet) ovat aineistossa lyhyttä siksakkia — juuri siellä viiva
 * "ei piirry koko matkalta".
 *
 * Savuke mittaa PEITTOA renkaan omilta pisteiltä: jokainen näkyvä
 * rengaspiste projisoidaan ruudulle (pallon oma getScreenCoords) ja
 * kuvasta katsotaan, onko sen kohdalla rajan mustetta TÄYDELLÄ
 * PEITOLLA. Kahdeksan NIMETTYÄ kohtaa rajaa (Pyreneet, Atlantti,
 * Bretagne, Kanaali, Belgia, Rein, Alpit, Välimeri) mitataan erikseen,
 * jotta katko ei voi piiloutua keskiarvoon.
 *
 * ── VARTIOT ────────────────────────────────────────────────────────
 *
 *  1. RENKAITA ON YHTÄ MONTA KUIN AINEISTOSSA: kerroksen mittari
 *     `korostusRenkaita` = assets/data/maapolygonit.json FRA-renkaat
 *     (16, Korsika mukaan lukien). Yksikään rengas ei saa pudota.
 *  2. PEITTO: vähintään PEITTO_RAJA osuus näkyvistä rengaspisteistä on
 *     täyden peiton rajamustetta.
 *  3. KAHDEKSAN KOHTAA: jokaisessa nimetyssä kohdassa on rajan väriä.
 *  4. VÄRI ON MUIDEN RAJOJEN VÄRI: kehän materiaalin sävy = paletin
 *     `--raja-muste` = pallon RAJA_MUSTE (naapurirajan muste) ±0
 *     ja, kun tavallinen raja on samassa kuvassa, sama kuin SEN
 *     materiaalin sävy VARITOLERANSSIn rajoissa. Se ei ole `--mark`
 *     eikä entinen sininen #1f3a5f.
 *  5. LEVEYS on 3 css-pikselin luokkaa lähipäässä ja moninkertainen
 *     tavalliseen rajaan — juuri se erottaa kohdemaan, kun väri ei.
 *
 * VASTAKOE: `SAVUKE_VASTAKOE=1` maalaa kehän ajossa takaisin ENTISEEN
 * SINISEEN (#1f3a5f) leveyteen koskematta. Silloin värivartiot (4) ja
 * PEITTO putoavat punaisiksi: ruskea mitta ei löydä sinisestä
 * viivasta mitään. Juuri se osoittaa, että mitta mittaa uutta väriä
 * eikä mitä tahansa viivaa.
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1).
 *
 * Aja: NODE_USE_ENV_PROXY=1 PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers \
 *      node tools/savukkeet/savuke-maan-aariviiva.mjs [--ulos=<kansio>]
 */
import http from 'node:http';
import {
  existsSync, mkdirSync, readFileSync, writeFileSync,
} from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { RAJA_MUSTE } from '../../js/pallovektorit.js';
import { packById } from '../../js/pack.js';
import { decodePng } from './pallon-liike-mittarit.mjs';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const arg = (n, d) => (process.argv.find((a) => a.startsWith(`--${n}=`))?.split('=')[1] ?? d);
const ULOS = arg('ulos', process.env.ULOS ?? '/tmp/matkakirja-kaappaukset/maan-aariviiva');
const VASTAKOE = process.env.SAVUKE_VASTAKOE === '1';
/** Saapumiskohtauksen (kortti + traileri) kesto: mitattu ~150 s. */
const SAAPUMISKOHTAUS_MS = Number(process.env.SAVUKE_KOHTAUS_MS ?? 155000);
mkdirSync(ULOS, { recursive: true });

/* ── rajat (perustelut yllä) ──────────────────────────────────────── */
/**
 * TÄYDEN PEITON RAJAMUSTE, MITATTUNA. Kehä ja naapurien rajat ovat
 * samaa mustetta #6b5539, joten VÄRI EI ENÄÄ EROTA NIITÄ — peitto
 * erottaa. Mitatut pikselit (Chromium, työpöytä 1400 × 900,
 * docs/raportit/viesti-fable-rajavari-20260914.md):
 *
 *   kohdemaan kehä (peitto 1)          rgb(107, 85, 57)   L  88  mitattu
 *   naapurin raja  (peitto 0,34)       rgb(205,194,163)   L 196  mitattu
 *   rantaviiva     (peitto 0,58)       rgb(153,131,103)   L 134  laskettu
 *   syvin meri (ei sininen, viileä)    rgb(134,132,124)   L 131  vakio
 *   seepiapaperi                       rgb(239,220,180)   L 222  vakio
 *
 * Mitta on siis kaksiosainen: pikseli on kehää, jos se on TUMMA
 * (L ≤ TUMMUUS_RAJA) ja LÄMMIN (R − B ≥ LAMPO_RAJA). Tummuusraja on
 * kehän (88) ja seuraavaksi tummimman taustan (rantaviiva 134)
 * puolivälissä: se kestää reunanpehmennyksen mutta ei kelpuuta
 * rantaviivaa, naapurirajaa eikä merta. Lämpöehto pudottaa lisäksi
 * kaiken kylmän (meri +10, entinen sininen kehä −64).
 *
 * MIKSI EI ENÄÄ SINIKANAVA: sinimitta oli oikea niin kauan kuin kehä
 * oli sininen. Ruskealla kehällä se antaisi peitoksi 0 % — savuke
 * mittaisi väärää asiaa.
 */
const TUMMUUS_RAJA = 111;
const LAMPO_RAJA = 25;
/** Värivartion sieto sRGB-kanavaa kohti, kun kahta materiaalia verrataan. */
const VARITOLERANSSI = 4;
/** Entinen sävy: ei saa enää esiintyä (vastakoe maalaa juuri tämän). */
const ENTINEN_SININEN = '#1f3a5f';
/** Kuinka läheltä rengaspistettä väri kelpaa (css-pikseliä). */
const HAKUSADE_CSS = 3;
/** Peiton alaraja: osuus näkyvistä rengaspisteistä, joilla on väri. */
const PEITTO_RAJA = 0.9;
/** Odotettu rengasmäärä luetaan aineistosta, ei kirjoiteta tähän. */
const AINEISTO = JSON.parse(readFileSync(join(JUURI, 'assets/data/maapolygonit.json'), 'utf8'));
const RENKAITA_FRA = (AINEISTO.maat?.FRA ?? []).filter((r) => Array.isArray(r) && r.length >= 6).length;

/**
 * KAHDEKSAN NIMETTYÄ KOHTAA Ranskan rajalta. Pisteet ovat rajalla
 * (Natural Earthin 10m-renkaan tuntumassa), ja mittaus etsii lähimmän
 * rengaspisteen niiden ympäriltä — piste ei siis ole oma totuutensa
 * rajan paikasta, vaan osoite, jonka lähellä rajan pitää olla.
 */
const KOHDAT = [
  { nimi: 'Pyreneet (keskeltä)', lat: 42.75, lon: 1.0 },
  { nimi: 'Atlantin rannikko (Gironde)', lat: 45.5, lon: -1.15 },
  { nimi: 'Bretagne (kärki)', lat: 48.4, lon: -4.7 },
  { nimi: 'Kanaali (Cotentin)', lat: 49.7, lon: -1.3 },
  { nimi: 'Belgian raja (Ardennit)', lat: 49.9, lon: 4.8 },
  { nimi: 'Rein (Alsace)', lat: 48.6, lon: 7.8 },
  { nimi: 'Alpit (Mont Blanc)', lat: 45.9, lon: 6.9 },
  { nimi: 'Välimeri (Camargue)', lat: 43.35, lon: 4.6 },
];

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.geojson': 'application/json',
};
const palvelin = http.createServer((req, res) => {
  const reitti = req.url.split('?')[0];
  const polku = join(JUURI, reitti === '/' ? 'index.html' : reitti);
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
/** Suurin kanavaero kahden heksavärin välillä (0 = sama väri). */
const kanavaEro = (a, b) => {
  const osat = (v) => [1, 3, 5].map((i) => parseInt(String(v).slice(i, i + 2), 16));
  if (!a || !b) return 255;
  const [r1, g1, b1] = osat(a); const [r2, g2, b2] = osat(b);
  return Math.max(Math.abs(r1 - r2), Math.abs(g1 - g2), Math.abs(b1 - b2));
};

const AMPARI = 'https://media.matkakirja.app/';
const valimuisti = new Map();
async function ampariHaku(url) {
  if (valimuisti.has(url)) return valimuisti.get(url);
  const lupaus = fetch(url).then(async (v) => (v.ok
    ? { status: 200, body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
    : { status: v.status, body: Buffer.alloc(0), tyyppi: 'text/plain' })).catch(() => null);
  valimuisti.set(url, lupaus);
  return lupaus;
}
const kirjasto = await ampariHaku(`${AMPARI}vendor/globe.gl-2.46.2.min.js`);
if (kirjasto?.status !== 200) {
  console.log('OHITUS: ämpäri ei vastaa — pallo ei voi latautua, savuke ei voi mitata.');
  palvelin.close();
  process.exit(0);
}

/* Tallenne: Fogg Pariisissa — kohdemaa on Ranska. */
const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'pariisi' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('pariisi');
const tallenne = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  args: ['--disable-dev-shm-usage'],
});

/**
 * Yksi ruutukoko: peli auki, saapumistraileri ohi, kamera Ranskaan.
 * Palauttaa mittaukset kummastakin kamerasta.
 */
async function ajo(nimi, viewport, dpr, mobiili) {
  const ctx = await selain.newContext({
    viewport,
    deviceScaleFactor: dpr,
    serviceWorkers: 'block',
    ...(mobiili ? { hasTouch: true, isMobile: true } : {}),
  });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.removeItem('matkakirja-lauta');
    } catch { /* yksityinen selaus */ }
  }, tallenne);
  const sivu = await ctx.newPage();
  sivu.setDefaultTimeout(120000);
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
  const auki = await sivu
    .waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 })
    .then(() => true).catch(() => false);
  vaadi(`${nimi}: pallolauta avautuu`, auki);
  if (!auki) { await ctx.close(); return []; }
  /*
   * SAAPUMISTRAILERI PEITTÄÄ KOKO RUUDUN ja sen pointer-events on
   * none, joten elementFromPoint näkee sen läpi — ainoa luotettava
   * tapa on odottaa, että se poistuu itse (trailerinKesto).
   */
  /*
   * ODOTA ENSIN, ETTÄ TRAILERI ON OLLUT RUUDULLA, VASTA SITTEN ETTÄ SE
   * ON POISSA. Pelkkä "ei ole nyt" palaa heti sivun latauduttua —
   * traileri ilmestyy vasta saapumisketjun myöhemmässä vaiheessa, ja
   * silloin mitattaisiin kuva, jonka traileri peittää (mitattu: peitto
   * 0 % työpöydällä, koska kortti on koko Ranskan päällä).
   */
  await sivu.waitForFunction(
    () => Boolean(document.querySelector('[class*="saapumistraileri"]')),
    null,
    { timeout: 60000 },
  ).catch(() => {});
  /*
   * SAAPUMISTRAILERI PIILOON TYYLILLÄ. Kortti on ruudulla yli kaksi
   * minuuttia, sen `pointer-events` on none (elementFromPoint näkee
   * läpi) eikä ohjelmallinen klikkaus ohita sitä — mitattu kolmella
   * tavalla. Savuke mittaa WebGL-kerrosta, ei saapumiskohtausta, joten
   * kortti piilotetaan yhdellä tyylisäännöllä: pelin tila ei muutu,
   * eikä pallon piirto tiedä kortista mitään.
   */
  /*
   * SAAPUMISKOHTAUS ODOTETAAN LOPPUUN. Kortti ja traileri peittävät
   * ruudun toista minuuttia, niiden pointer-events on none eikä
   * ohjelmallinen napautus ohita niitä (mitattu kolmella tavalla).
   * Savuke mittaa pallon kerrosta, ei saapumiskohtausta, joten se
   * odottaa kohtauksen ohi — sama kuin pelaaja tekee.
   */
  await sivu.waitForTimeout(SAAPUMISKOHTAUS_MS);
  await sivu.waitForTimeout(4000);
  if (VASTAKOE) {
    const tulos = await sivu.evaluate((sininen) => {
      const pallo = window.matkakirja.ui.pallolauta.pallo;
      let n = 0;
      pallo.scene().traverse((o) => {
        if (o.userData?.pallovektorit?.laji !== 'korostus') return;
        // Vain VÄRI takaisin entiseen siniseen: leveys ja pyörylät
        // pysyvät, jotta vastakoe koettelee juuri sitä, mikä muuttui.
        o.material.color.set(sininen);
        o.material.needsUpdate = true;
        n += 1;
      });
      return n;
    }, ENTINEN_SININEN);
    tieto(`${nimi}: VASTAKOE — entinen sininen kehä (${ENTINEN_SININEN})`, `${tulos} materiaalia`);
  }

  const ulos = [];
  for (const [portaanNimi, alt] of [['saapuminen', 0.55], ['zoom', 0.30]]) {
    // eslint-disable-next-line no-await-in-loop
    await sivu.evaluate((a) => {
      window.matkakirja.ui.pallolauta.pallo.pointOfView({ lat: 46.6, lng: 2.4, altitude: a }, 0);
    }, alt);
    // eslint-disable-next-line no-await-in-loop
    await sivu.waitForTimeout(9000);
    const avain = `${nimi}-${portaanNimi}`;
    /*
     * RAJATTU KAAPPAUS, EI KOKO SIVUA: kontin ohjelmistorasteroija ei
     * jaksa toistuvaa täyttä 390 × 844 dpr 3 -kuvaa (sama havainto kuin
     * savuke-pallo-rantaviivat). Rajaus on pallon kotelo, eli juuri se,
     * mitä mitataan.
     */
    // eslint-disable-next-line no-await-in-loop
    const rajaus = await sivu.evaluate(() => {
      const r = window.matkakirja.ui.pallolauta.pallo.renderer().domElement.getBoundingClientRect();
      return {
        x: Math.round(r.left), y: Math.round(r.top), width: Math.round(r.width), height: Math.round(r.height),
      };
    });
    // eslint-disable-next-line no-await-in-loop
    const kuva = decodePng(await sivu.screenshot({
      path: join(ULOS, `${avain}.png`), clip: rajaus, timeout: 120000,
    }));
    // eslint-disable-next-line no-await-in-loop
    const mitta = await sivu.evaluate(() => {
      const lauta = window.matkakirja.ui.pallolauta;
      const pallo = lauta.pallo;
      const mittarit = lauta.vektorit?.().mittarit?.() ?? null;
      let olio = null;
      let rajaOlio = null;
      pallo.scene().traverse((o) => {
        const laji = o.userData?.pallovektorit?.laji;
        if (!olio && laji === 'korostus') olio = o;
        // Naapurien raja SAMASTA KUVASTA: sen materiaali on se totuus,
        // johon kehän sävyä verrataan (ei toinen heksaluku savukkeessa).
        if (!rajaOlio && laji === 'rajat') rajaOlio = o;
      });
      const kotelo = pallo.renderer().domElement;
      const kehys = kotelo.getBoundingClientRect();
      const pov = pallo.pointOfView();
      const RAD = Math.PI / 180;
      const yks = (lat, lon) => [
        Math.cos(lat * RAD) * Math.sin(lon * RAD), Math.sin(lat * RAD), Math.cos(lat * RAD) * Math.cos(lon * RAD),
      ];
      const c = yks(pov.lat, pov.lng);
      const raja = 1 / (1 + pov.altitude);
      const pisteet = [];
      if (olio) {
        const a = olio.geometry.attributes.instanceStart;
        for (let i = 0; i < a.count; i += 1) {
          const x = a.getX(i); const y = a.getY(i); const z = a.getZ(i);
          const r = Math.hypot(x, y, z) || 1;
          const lat = Math.asin(Math.max(-1, Math.min(1, y / r))) / RAD;
          const lon = Math.atan2(x, z) / RAD;
          const p = yks(lat, lon);
          // Reunavara: limbillä viiva on aidosti näkymätön eikä sitä mitata.
          if (p[0] * c[0] + p[1] * c[1] + p[2] * c[2] < raja + 0.02) continue;
          const s = pallo.getScreenCoords(lat, lon, 0);
          if (!s) continue;
          if (!(s.x >= 3 && s.y >= 3 && s.x < kotelo.clientWidth - 3 && s.y < kotelo.clientHeight - 3)) continue;
          const rx = s.x + kehys.left; const ry = s.y + kehys.top;
          /*
           * PANEELIN ALLA OLEVAA VIIVAA EI MITATA. Työpöydällä
           * matkapäiväkirjan kortti ja maapaneeli ovat puoliläpinäkyviä
           * ja PELIN OMIA: niiden alla kehä näkyy haaleana (mitattu
           * Bretagnen kärjessä rgb(180,164,138) = noin puolet mustetta),
           * eikä se ole kehän vika vaan kortin. Piste, jossa
           * elementFromPoint ei anna pallon kangasta, jätetään pois
           * sekä peitosta että nimetyistä kohdista — pelaajakaan ei näe
           * sitä kohtaa. (Kortit, joiden pointer-events on none, eivät
           * osu tähän: ne läpäisevät elementFromPointin, ja niiden alta
           * mitataan kuten ennenkin.)
           */
          const paalla = document.elementFromPoint(rx, ry);
          const peitossa = !(paalla === kotelo || kotelo.contains(paalla));
          pisteet.push([+rx.toFixed(1), +ry.toFixed(1), +lat.toFixed(3), +lon.toFixed(3), peitossa ? 1 : 0]);
        }
      }
      return {
        mittarit,
        pisteet,
        pov,
        materiaali: olio ? {
          vari: `#${olio.material.color.getHexString()}`,
          linewidth: olio.material.linewidth,
          paatyt: olio.material.uniforms?.paatyt?.value ?? null,
          opacity: olio.material.opacity,
        } : null,
        rajaMateriaali: rajaOlio ? {
          vari: `#${rajaOlio.material.color.getHexString()}`,
          linewidth: rajaOlio.material.linewidth,
          opacity: rajaOlio.material.opacity,
        } : null,
        paletti: getComputedStyle(document.documentElement).getPropertyValue('--raja-muste').trim(),
        mark: getComputedStyle(document.documentElement).getPropertyValue('--mark').trim(),
      };
    });
    const dprK = kuva.width / rajaus.width;
    const sade = Math.max(2, Math.round(HAKUSADE_CSS * dprK));
    const musteinen = (sx, sy) => {
      const px = Math.round((sx - rajaus.x) * dprK); const py = Math.round((sy - rajaus.y) * dprK);
      for (let dy = -sade; dy <= sade; dy += 1) {
        for (let dx = -sade; dx <= sade; dx += 1) {
          const x = px + dx; const y = py + dy;
          if (x < 0 || y < 0 || x >= kuva.width || y >= kuva.height) continue;
          const i = (y * kuva.width + x) * 4;
          const R = kuva.data[i]; const G = kuva.data[i + 1]; const B = kuva.data[i + 2];
          const L = 0.2126 * R + 0.7152 * G + 0.0722 * B;
          if (L <= TUMMUUS_RAJA && R - B >= LAMPO_RAJA) return true;
        }
      }
      return false;
    };
    const nakyvat = mitta.pisteet.filter((p) => !p[4]);
    const osumat = mitta.pisteet.map((p) => (musteinen(p[0], p[1]) ? 1 : 0));
    const nakyvatOsumat = mitta.pisteet.map((p, i) => (p[4] ? null : osumat[i])).filter((x) => x !== null);
    const peitto = nakyvatOsumat.length
      ? nakyvatOsumat.reduce((a, b) => a + b, 0) / nakyvatOsumat.length : 0;
    // Kahdeksan nimettyä kohtaa: lähin rengaspiste ja sen osuma.
    const kohdat = KOHDAT.map((k) => {
      let paras = null; let parasEt = Infinity;
      mitta.pisteet.forEach((p, i) => {
        const et = (p[2] - k.lat) ** 2 + (p[3] - k.lon) ** 2;
        if (et < parasEt) { parasEt = et; paras = i; }
      });
      return {
        nimi: k.nimi,
        etaisyysAst: paras === null ? null : +Math.sqrt(parasEt).toFixed(2),
        osuma: paras === null ? false : Boolean(osumat[paras]),
        paneelinAlla: paras === null ? false : Boolean(mitta.pisteet[paras][4]),
      };
    });
    ulos.push({
      avain, pov: mitta.pov, mittarit: mitta.mittarit, materiaali: mitta.materiaali,
      rajaMateriaali: mitta.rajaMateriaali, paletti: mitta.paletti, mark: mitta.mark,
      pisteita: mitta.pisteet.length, nakyvia: nakyvat.length,
      peitto: +peitto.toFixed(3), kohdat,
    });
  }
  vaadi(`${nimi}: sivu ei kaadu`, virheet.filter((v) => !/ERR_FAILED|ERR_ABORTED/.test(v)).length === 0,
    virheet.slice(0, 2).join(' | '));
  await ctx.close();
  return ulos;
}

const tulokset = [
  ...await ajo('puhelin', { width: 390, height: 844 }, 2, true),
  ...await ajo('tyopoyta', { width: 1400, height: 900 }, 1, false),
];

for (const t of tulokset) {
  tieto(`${t.avain} rengaspisteitä ruudulla`, `${t.pisteita} (paneelien alla ${t.pisteita - t.nakyvia})`);
  tieto(`${t.avain} peitto`, `${(100 * t.peitto).toFixed(1)} %`);
  tieto(`${t.avain} kehä: väri / leveys (css-px) / peitto`,
    `${t.materiaali?.vari} / ${t.materiaali?.linewidth?.toFixed(2)} / ${t.materiaali?.opacity}`);
  tieto(`${t.avain} naapurin raja: väri / leveys / peitto`, t.rajaMateriaali
    ? `${t.rajaMateriaali.vari} / ${t.rajaMateriaali.linewidth?.toFixed(2)} / ${t.rajaMateriaali.opacity}`
    : 'ei kuvassa');
  tieto(`${t.avain} renkaita kerroksessa`, `${t.mittarit?.korostusRenkaita} (aineistossa ${RENKAITA_FRA})`);
  tieto(`${t.avain} kohdat`, t.kohdat.map((k) => `${k.osuma ? '+' : '−'}${k.nimi}`).join(', '));
  vaadi(`${t.avain}: renkaita yhtä monta kuin aineistossa`,
    t.mittarit?.korostusRenkaita === RENKAITA_FRA,
    `${t.mittarit?.korostusRenkaita} ≠ ${RENKAITA_FRA}`);
  vaadi(`${t.avain}: kehä on ehjä (peitto ≥ ${PEITTO_RAJA})`,
    t.peitto >= PEITTO_RAJA, `${(100 * t.peitto).toFixed(1)} %`);
  for (const k of t.kohdat) {
    if (k.paneelinAlla) {
      tieto(`${t.avain}: ${k.nimi}`, 'pelin oman paneelin alla — ei mitattavissa');
      continue;
    }
    vaadi(`${t.avain}: ${k.nimi}`, k.osuma, `ei rajan väriä (lähin rengaspiste ${k.etaisyysAst}°)`);
  }
  vaadi(`${t.avain}: väri on paletin --raja-muste`,
    t.materiaali?.vari?.toLowerCase() === t.paletti?.toLowerCase(),
    `${t.materiaali?.vari} ≠ ${t.paletti}`);
  // MUIDEN RAJOJEN VÄRI: paletin arvo on sama kuin pallon RAJA_MUSTE,
  // eli se muste, jolla naapurimaiden rajat piirretään.
  vaadi(`${t.avain}: paletin sävy on muiden rajojen muste (RAJA_MUSTE)`,
    t.paletti?.toLowerCase() === RAJA_MUSTE.toLowerCase(),
    `${t.paletti} ≠ ${RAJA_MUSTE}`);
  if (t.rajaMateriaali) {
    // Sama kuva, kaksi materiaalia: kehä ja naapurin raja rinnakkain.
    vaadi(`${t.avain}: kehä ja naapurin raja ovat samaa väriä (±${VARITOLERANSSI})`,
      kanavaEro(t.materiaali?.vari, t.rajaMateriaali.vari) <= VARITOLERANSSI,
      `${t.materiaali?.vari} vs. ${t.rajaMateriaali.vari}`);
    vaadi(`${t.avain}: kehä on naapurin rajaa selvästi leveämpi`,
      (t.materiaali?.linewidth ?? 0) >= 1.5 * (t.rajaMateriaali.linewidth ?? 99),
      `${t.materiaali?.linewidth?.toFixed(2)} vs. ${t.rajaMateriaali.linewidth?.toFixed(2)}`);
  } else {
    tieto(`${t.avain} naapurin raja kuvassa`, 'ei piirry tällä kameralla (VEKTORIT_RAJAT_PX_ASTE)');
  }
  vaadi(`${t.avain}: väri ei ole --mark`, t.materiaali?.vari?.toLowerCase() !== t.mark?.toLowerCase(),
    String(t.materiaali?.vari));
  vaadi(`${t.avain}: väri ei ole entinen sininen`,
    t.materiaali?.vari?.toLowerCase() !== ENTINEN_SININEN,
    String(t.materiaali?.vari));
  if (t.avain.endsWith('zoom')) {
    vaadi(`${t.avain}: viiva on 3 css-pikselin luokkaa (yli entisen 2,5)`,
      (t.materiaali?.linewidth ?? 0) > 2.5, String(t.materiaali?.linewidth));
  }
}

writeFileSync(join(ULOS, 'raportti.json'), JSON.stringify({ vastakoe: VASTAKOE, tulokset }, null, 2));
console.log(`\n${lapi}/${kaikki} vartiota läpi — kuvat ja raportti: ${ULOS}`);
await selain.close();
palvelin.close();
process.exit(lapi === kaikki ? 0 : 1);
