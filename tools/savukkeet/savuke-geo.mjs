/*
 * Savuke: GEO-APURI SELAIMESSA (js/geo.js, omistajan päätös 5.9.2026,
 * kirjastokartoituksen TOP 6 kohta 3 — d3-geo + d3-geo-projection +
 * topojson-client ämpärin vendor/-polusta).
 *
 * Node-testi (tests/geo.test.mjs) ajaa saman matematiikan paketeista.
 * Tämä savuke ajaa sen SELAIMESSA ja ämpärin UMD-paketeilla — eli
 * juuri sillä polulla, jota peli käyttää: neljä skriptiä peräkkäin
 * (d3-array ensin, ks. js/geo.js GEO_KIRJASTOT), globaali `d3` ja
 * `topojson`, ja virhehaara, kun niitä ei saada.
 *
 * ── VARTIOT ───────────────────────────────────────────────────────
 *
 *   1. Kirjasto latautuu ämpäristä ja globaalit ovat paikoillaan
 *      (d3.geoPath, d3.geoMiller, topojson.feature).
 *   2. laudanProjektio vastaa pelin omaa projisoiLaudalle-funktiota
 *      KAIKILLA 261 kaupungilla ±0,01 lautayksikköä.
 *   3. Isokaari Lontoo–Bombay osuu d3:n omaan geoInterpolateen ±0,5°.
 *   4. Natural Earthin rajat (ne50.geojson) projisoituvat laudalle
 *      polkuna, jonka bbox on laudan sisällä (rajaus laudan mittoihin).
 *   5. VARAPOLKU: kun ämpäri ei vastaa, lataaGeo() palauttaa null eikä
 *      mikään kaadu — kutsuja jää vanhaan polkuun.
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1): kontin
 * selain ei osaa välityspalvelinta, Noden fetch osaa — malli on
 * tools/savukkeet/savuke-pallolauta.mjs. Ilman ämpäriä ajetaan vain
 * varapolun vartio.
 *
 * Aja:  NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-geo.mjs
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.geojson': 'application/json',
};

/* Tyhjä sivu palvelimen omasta osoitteesta: moduulituonti vaatii
 * saman alkuperän, eikä peliä haluta käynnistää tämän mittaamiseksi. */
const TYHJA = '/savuke-geo.html';
const palvelin = http.createServer((req, res) => {
  const pyydetty = req.url.split('?')[0];
  if (pyydetty === TYHJA) {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end('<!doctype html><meta charset="utf-8"><title>savuke-geo</title>');
    return;
  }
  const polku = join(JUURI, pyydetty === '/' ? 'index.html' : pyydetty);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

const AMPARI = 'https://pub-7bc0ed2083a74a68bd7115618bca4709.r2.dev/';
const valimuisti = new Map();
async function ampariHaku(url) {
  if (!valimuisti.has(url)) {
    valimuisti.set(url, fetch(url).then(async (v) => (v.ok
      ? { status: 200, body: Buffer.from(await v.arrayBuffer()) }
      : { status: v.status, body: Buffer.alloc(0) })).catch(() => null));
  }
  return valimuisti.get(url);
}
/*
 * ÄMPÄRISTÄ PUUTTUVA PAKETTI PAIKATAAN AJOSSA, MUTTA ÄÄNEEN.
 *
 * d3-geon ja d3-geo-projectionin UMD-paketit vaativat d3-arrayn ulkoa
 * (ks. js/geo.js GEO_KIRJASTOT). Jos sitä ei ole vielä viety ämpäriin,
 * savuke hakee sen paikallisesta node_modulesista, jotta matematiikka
 * tulee silti mitatuksi selaimessa — ja huutaa siitä, koska PELI ei voi
 * tehdä samaa: workflow vie-vendor on ajettava ennen kuin apuri toimii
 * oikeassa selaimessa.
 */
const paikkaus = new Map();
async function paikallinen(url) {
  const nimi = url.split('/vendor/')[1] ?? '';
  const paketti = nimi.replace(/-\d+(?:\.\d+)*\.min\.js$/, '');
  const polku = join(JUURI, 'node_modules', paketti, 'dist', `${paketti}.min.js`);
  if (!existsSync(polku)) return null;
  return { status: 200, body: readFileSync(polku) };
}
const puuttuvat = [];
for (const url of [
  `${AMPARI}vendor/d3-array-3.2.4.min.js`,
  `${AMPARI}vendor/d3-geo-3.1.1.min.js`,
  `${AMPARI}vendor/d3-geo-projection-4.0.0.min.js`,
  `${AMPARI}vendor/topojson-client-3.1.0.min.js`,
]) {
  const v = await ampariHaku(url); // eslint-disable-line no-await-in-loop
  if (v?.status === 200) continue;
  const oma = await paikallinen(url); // eslint-disable-line no-await-in-loop
  if (oma) paikkaus.set(url, oma);
  puuttuvat.push(url.split('/vendor/')[1]);
}
const AMPARI_TOIMII = puuttuvat.length === 0 || puuttuvat.length === paikkaus.size;
if (puuttuvat.length) {
  console.log(`HUOM  ämpäristä puuttuu: ${puuttuvat.join(', ')} — `
    + `${paikkaus.size ? 'paikattu node_modulesista tätä ajoa varten; ' : ''}`
    + 'aja workflow vie-vendor ennen julkaisua');
}

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

/** Sivu, jolle ämpärin vendor-polku reititetään Noden kautta (tai estetään). */
async function avaaSivu({ ampari }) {
  const sivu = await selain.newPage();
  sivu.on('pageerror', (e) => console.log('VIRHE', e.message));
  // Varapolun ajossa estetty pyyntö on juuri se, mitä mitataan — sitä ei
  // raportoida vikana.
  if (ampari) sivu.on('requestfailed', (r) => console.log('EI SAATU', r.url(), r.failure()?.errorText));
  await sivu.route('**/*.r2.dev/**', async (route) => {
    const url = route.request().url();
    if (!ampari) { await route.abort(); return; }
    const vastaus = paikkaus.get(url) ?? await ampariHaku(url);
    if (!vastaus || vastaus.status !== 200) { await route.abort(); return; }
    await route.fulfill({ status: 200, body: vastaus.body, contentType: 'text/javascript' });
  });
  await sivu.goto(`${osoite}${TYHJA}`);
  return sivu;
}

if (AMPARI_TOIMII) {
  const sivu = await avaaSivu({ ampari: true });
  const tulos = await sivu.evaluate(async () => {
    const geo = await import('/js/geo.js');
    const { projisoiLaudalle, laudaltaAsteiksi } = await import('/js/fokusmitat.js');
    const { MAAILMANKARTTA } = await import('/js/packs/maailmankartta.js');
    const kirjasto = await geo.lataaGeo();
    if (!kirjasto) return { kirjasto: false };

    const pr = geo.laudanProjektio('maailmankartta');
    let pahin = 0;
    let kaupunkeja = 0;
    for (const c of MAAILMANKARTTA.cities) {
      const a = laudaltaAsteiksi('maailmankartta', c.x, c.y);
      const oma = projisoiLaudalle('maailmankartta', a.lon, a.lat);
      const [x, y] = pr([a.lon, a.lat]);
      pahin = Math.max(pahin, Math.abs(oma.x - x), Math.abs(oma.y - y));
      kaupunkeja += 1;
    }

    const L = { lon: -0.13, lat: 51.51 };
    const B = { lon: 72.88, lat: 19.08 };
    const kaari = geo.isokaari(L, B, 64, 'maailmankartta');
    const valilla = window.d3.geoInterpolate([L.lon, L.lat], [B.lon, B.lat]);
    let kaariEro = 0;
    for (let i = 0; i <= 64; i += 1) {
      const [lon, lat] = valilla(i / 64);
      kaariEro = Math.max(kaariEro,
        Math.abs(kaari.asteet[i][0] - lon), Math.abs(kaari.asteet[i][1] - lat));
    }

    const { width, height } = MAAILMANKARTTA.map;
    const ne = await (await fetch('/ne50.geojson')).json();
    const alku = performance.now();
    const polku = geo.geojsonLaudalle(ne, 'maailmankartta', { rajaus: [[0, 0], [width, height]] });
    const kesto = performance.now() - alku;
    const luvut = polku.match(/-?\d+(?:\.\d+)?/g).map(Number);
    const bbox = [Infinity, Infinity, -Infinity, -Infinity];
    for (let i = 0; i < luvut.length; i += 2) {
      bbox[0] = Math.min(bbox[0], luvut[i]); bbox[2] = Math.max(bbox[2], luvut[i]);
      bbox[1] = Math.min(bbox[1], luvut[i + 1]); bbox[3] = Math.max(bbox[3], luvut[i + 1]);
    }
    return {
      kirjasto: true,
      globaalit: Boolean(window.d3?.geoPath && window.d3?.geoMiller && window.topojson?.feature),
      pahin,
      kaupunkeja,
      kaariEro,
      puolivali: kaari.asteet[32],
      km: geo.etaisyysKm(L, B),
      bbox,
      merkkeja: polku.length,
      kesto,
      lauta: [width, height],
    };
  });

  vaadi('kirjasto latautuu ämpärin vendor-polusta', tulos.kirjasto === true);
  vaadi('globaalit d3 ja topojson ovat paikoillaan', tulos.globaalit === true);
  if (tulos.kirjasto) {
    vaadi('261 kaupunkia osuu pelin omaan kaavaan ±0,01',
      tulos.kaupunkeja >= 261 && tulos.pahin < 0.01,
      `kaupunkeja ${tulos.kaupunkeja}, suurin ero ${tulos.pahin}`);
    tieto('suurin ero pelin kaavaan (lautayksikköä)', tulos.pahin.toExponential(2));
    vaadi('isokaari osuu d3:n geoInterpolateen ±0,5°', tulos.kaariEro < 0.5,
      `ero ${tulos.kaariEro}°`);
    tieto('Lontoo–Bombay', `${tulos.km.toFixed(0)} km, puoliväli ${tulos.puolivali.map((v) => v.toFixed(2)).join(', ')}`);
    const [x0, y0, x1, y1] = tulos.bbox;
    const [lev, kor] = tulos.lauta;
    vaadi('Natural Earthin rajat projisoituvat laudan sisään',
      x0 >= -1 && y0 >= -1 && x1 <= lev + 1 && y1 <= kor + 1,
      `bbox ${tulos.bbox.join(' ')} vs lauta ${lev}x${kor}`);
    tieto('ne50-polku', `${tulos.merkkeja} merkkiä, ${tulos.kesto.toFixed(0)} ms, bbox ${tulos.bbox.map((v) => v.toFixed(1)).join(' ')}`);
  }
  await sivu.close();
}

/* Varapolku: ämpäri ei vastaa → null, ei poikkeusta. */
{
  const sivu = await avaaSivu({ ampari: false });
  const tulos = await sivu.evaluate(async () => {
    const geo = await import('/js/geo.js');
    const kirjasto = await geo.lataaGeo();
    return {
      kirjasto,
      projektio: geo.laudanProjektio('maailmankartta'),
      polku: geo.geojsonLaudalle({ type: 'Point', coordinates: [0, 0] }, 'maailmankartta'),
      kaari: geo.isokaari({ lon: 0, lat: 0 }, { lon: 1, lat: 1 }),
      // Muodonvaihto pallolle ei tarvitse kirjastoa lainkaan.
      pallo: geo.pallolle({ type: 'LineString', coordinates: [[1, 2], [3, 4]] }),
    };
  });
  vaadi('ilman kirjastoa lataaGeo palauttaa nullin', tulos.kirjasto === null);
  vaadi('ilman kirjastoa apurit palauttavat nullin eivätkä kaadu',
    tulos.projektio === null && tulos.polku === null && tulos.kaari === null);
  vaadi('pallolle toimii ilman kirjastoa',
    JSON.stringify(tulos.pallo) === JSON.stringify([{ pisteet: [[2, 1], [4, 3]] }]),
    JSON.stringify(tulos.pallo));
  await sivu.close();
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} vartiota läpi`);
process.exit(lapi === kaikki ? 0 : 1);
