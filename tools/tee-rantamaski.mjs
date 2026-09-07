/*
 * RANTAMASKI IHMISEN MATKAN KAISTALLE (docs/moduulit/ihmisen-matka-vanat.md
 * luku 14; Raamattu IHMISEN MATKA: VANAT RANNIKKOA MAALAAVINA KAISTOINA).
 *
 *   node tools/tee-rantamaski.mjs            kirjoittaa js/linssit/ihmisen-matka-rantamaski.js
 *   node tools/tee-rantamaski.mjs --kuva     lisäksi ASCII-kartta ruudulle
 *
 * MIKSI OMA MASKI EIKÄ VIRTOJEN MAAMASKI: js/linssit/ihmisen-matka-maamaski.js
 * on 0,5° (55 km) pelin laudasta rasteroitu KULKUMASKI, jonka
 * rannikkoruutu on maata jo 2/9 osumalla (kannakset pysyvät ehjinä),
 * laudan yläpuoli 76°N on merta ja Tyynenmeren saaret ovat pisteitä.
 * Kaista sen sijaan MAALAA rannikkoa: sen meren puoleinen reuna on
 * rantaviiva, joka piirtyy samalle pallolle vektoreina (js/pallovektorit.js,
 * Natural Earth). Siksi kaistan maski rasteroidaan samasta perheestä
 * (repon ne50.geojson, Natural Earth 1:50m maat) 0,125°:n (14 km)
 * ruudukkoon 3 × 3 alinäytteellä ja ENEMMISTÖSÄÄNNÖLLÄ (≥ 5/9), jolloin
 * ruudukon 0,5-tasa-arvokäyrä (varjostimen bilineaarinen luku) kulkee
 * rantaviivan päällä ±0,06°:n tarkkuudella eikä leviä mereen.
 *
 * Varjostin (js/aikajana-vanat.js) lukee maskin tekstuurina: 1 = maa.
 * Rivi 0 = 90°N…89,875°N, sarake 0 = 180°W…179,875°W (sama järjestys
 * kuin maamaskissa). Rivijuoksut varint-tavuina base64:nä; purku
 * js/aikajana-virrat-laskenta.js puraMaamaski(juoksut, leveys × korkeus).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { pakkaaMaamaski, puraMaamaski } from '../js/aikajana-virrat-laskenta.js';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const LAHDE = join(JUURI, 'ne50.geojson');
const KOHDE = join(JUURI, 'js/linssit/ihmisen-matka-rantamaski.js');
const KUVA = process.argv.includes('--kuva');
export const RANTAMASKIN_ASTE = 0.125;
const W = Math.round(360 / RANTAMASKIN_ASTE);
const H = Math.round(180 / RANTAMASKIN_ASTE);
const ALI = 3; // alinäytteitä per sivu
const KYNNYS = 5; // osumia 9:stä (enemmistö)

/** Tarkistuspisteet: nimi, lat, lon, odotettu (1 maa / 0 meri). Selvästi rannasta sisään tai ulos. */
const TARKISTUS = [
  ['Siinai', 30.0, 33.7, 1], ['Panama', 8.8, -80.0, 1], ['Beringinsalmi', 65.8, -169.0, 0],
  ['Tšuktšien kärki', 66.1, -170.2, 1], ['Sewardin niemimaa', 65.3, -163.5, 1],
  ['Kaspianmeri', 42.0, 50.0, 0], ['Punainenmeri', 20.0, 38.5, 0], ['Bab-el-Mandeb', 12.55, 43.35, 0],
  ['Jemenin Tihama', 14.0, 43.5, 1], ['Oman', 22.0, 57.5, 1], ['Intian rannikko (Goa)', 15.3, 74.4, 1],
  ['Sri Lanka', 7.5, 80.7, 1], ['Malakan salmi', 3.0, 100.5, 0], ['Sumatra', -0.5, 101.5, 1],
  ['Borneo', 0.5, 114.0, 1], ['Sulawesi', -2.0, 121.0, 1], ['Timorinmeri', -12.0, 128.0, 0],
  ['Arnhem Land', -13.0, 133.5, 1], ['Tasmania', -42.0, 146.5, 1], ['Honshu', 36.0, 138.5, 1],
  ['Japaninmeri', 40.0, 135.0, 0], ['Balkan (Bacho Kiro)', 42.9, 25.4, 1], ['Iberia', 40.0, -4.0, 1],
  ['Gibraltar', 35.95, -5.6, 0], ['Lappi', 68.0, 27.0, 1], ['Itämeri', 58.0, 20.0, 0],
  ['Islanti', 64.8, -18.5, 1], ['Grönlanti', 70.0, -40.0, 1], ['Baffininlahti', 72.0, -65.0, 0],
  ['Alaska', 64.0, -152.0, 1], ['White Sands', 32.8, -106.2, 1], ['Amazonia', -5.0, -62.0, 1],
  ['Chilen järvialue (Monte Verden itäpuoli)', -41.3, -72.5, 1], ['Tyynimeri', -20.0, -140.0, 0], ['Madagaskar', -19.0, 47.0, 1],
  ['Omo', 4.8, 36.0, 1], ['Etelä-Afrikka', -33.0, 22.0, 1], ['Kongo', 0.0, 20.0, 1],
  ['Altai', 51.4, 84.7, 1], ['Yana', 70.0, 135.0, 1], ['Laptevinmeri', 76.0, 125.0, 0],
];

/** Renkaat [lon, lat] -pisteinä kaikista polygoneista. */
function renkaat(geojson) {
  const ulos = [];
  for (const f of geojson.features) {
    const g = f.geometry;
    if (!g) continue;
    const polyt = g.type === 'Polygon' ? [g.coordinates] : g.type === 'MultiPolygon' ? g.coordinates : [];
    for (const p of polyt) for (const r of p) if (r.length >= 4) ulos.push(r);
  }
  return ulos;
}

/**
 * Skannausviivarasterointi: jokaiselle alirivin leveyspiirille kerätään
 * särmien leikkauspituusasteet (puoliavoin sääntö, jotta kärki ei
 * kahdennu), ja parittomien välit täyttävät alisarakkeet (even-odd:
 * reiät toimivat). Osumat lasketaan ruutuun.
 */
function rasteroi(rengasLista) {
  const askel = RANTAMASKIN_ASTE / ALI;
  const HS = H * ALI;
  const WS = W * ALI;
  const rivit = Array.from({ length: HS }, () => []);
  let sarmia = 0;
  for (const r of rengasLista) {
    for (let k = 0; k + 1 < r.length; k += 1) {
      const [x0, y0] = r[k];
      const [x1, y1] = r[k + 1];
      if (y0 === y1) continue;
      sarmia += 1;
      const yMax = Math.max(y0, y1);
      const yMin = Math.min(y0, y1);
      const k0 = Math.max(0, Math.floor((90 - yMax) / askel - 0.5));
      const k1 = Math.min(HS - 1, Math.ceil((90 - yMin) / askel - 0.5));
      for (let kk = k0; kk <= k1; kk += 1) {
        const y = 90 - (kk + 0.5) * askel;
        if ((y0 > y) !== (y1 > y)) rivit[kk].push(x0 + ((y - y0) * (x1 - x0)) / (y1 - y0));
      }
    }
  }
  const osumat = new Uint8Array(W * H);
  for (let kk = 0; kk < HS; kk += 1) {
    const xs = rivit[kk];
    if (xs.length < 2) continue;
    xs.sort((a, b) => a - b);
    const rivi = Math.floor(kk / ALI) * W;
    for (let i = 0; i + 1 < xs.length; i += 2) {
      const a = Math.max(0, Math.ceil((xs[i] + 180) / askel - 0.5));
      const b = Math.min(WS - 1, Math.floor((xs[i + 1] + 180) / askel - 0.5));
      for (let s = a; s <= b; s += 1) osumat[rivi + Math.floor(s / ALI)] += 1;
    }
  }
  const maa = new Uint8Array(W * H);
  for (let i = 0; i < maa.length; i += 1) maa[i] = osumat[i] >= KYNNYS ? 1 : 0;
  return { maa, osumat, sarmia };
}

export function rantaruutu(lat, lon, leveys = W, korkeus = H, aste = RANTAMASKIN_ASTE) {
  const c = Math.min(leveys - 1, Math.max(0, Math.floor((((lon + 180) % 360 + 360) % 360) / aste)));
  const r = Math.min(korkeus - 1, Math.max(0, Math.floor((90 - lat) / aste)));
  return r * leveys + c;
}

const alku = performance.now();
const geojson = JSON.parse(readFileSync(LAHDE, 'utf8'));
const { maa, osumat, sarmia } = rasteroi(renkaat(geojson));
const kesto = performance.now() - alku;
let maata = 0;
let osittaisia = 0;
for (let i = 0; i < maa.length; i += 1) {
  maata += maa[i];
  if (osumat[i] > 0 && osumat[i] < 9) osittaisia += 1;
}
const pakattu = pakkaaMaamaski(maa);
const purettu = puraMaamaski(pakattu, W * H);
let eroja = 0;
for (let i = 0; i < maa.length; i += 1) if (maa[i] !== purettu[i]) eroja += 1;
if (eroja) throw new Error(`pakkaus ei ole häviötön: ${eroja} ruutua`);

let vikoja = 0;
for (const [nimi, lat, lon, odotettu] of TARKISTUS) {
  const arvo = maa[rantaruutu(lat, lon)];
  const ok = arvo === odotettu;
  if (!ok) vikoja += 1;
  console.log(`${ok ? 'OK  ' : 'VIKA'} ${nimi.padEnd(24)} ${String(lat).padStart(7)} ${String(lon).padStart(8)}  ${arvo ? 'maa' : 'meri'} (odotettu ${odotettu ? 'maa' : 'meri'})`);
}
if (KUVA) {
  for (let r = 0; r < H; r += 24) {
    let rivi = '';
    for (let c = 0; c < W; c += 24) {
      let n = 0;
      for (let dr = 0; dr < 24; dr += 1) for (let dc = 0; dc < 24; dc += 1) n += maa[(r + dr) * W + c + dc];
      rivi += n >= 288 ? '#' : n > 0 ? '+' : '.';
    }
    console.log(rivi);
  }
}
console.log(`ruudukko ${W} × ${H} (${RANTAMASKIN_ASTE}°), särmiä ${sarmia}, rasterointi ${Math.round(kesto)} ms`);
console.log(`maaruutuja ${maata} (${(100 * maata / maa.length).toFixed(1)} %), osittaisia rannikkoruutuja ${osittaisia}, base64 ${pakattu.length} merkkiä`);

const otsikko = `/*
 * RANTAMASKI IHMISEN MATKAN KAISTALLE — GENEROITU, ÄLÄ MUOKKAA KÄSIN.
 *
 *   node tools/tee-rantamaski.mjs
 *
 * ${W} × ${H} ruutua (${RANTAMASKIN_ASTE}°), rivi 0 = 90°N…, sarake 0 = 180°W…
 * Rasteroitu repon ne50.geojson:sta (Natural Earth 1:50m maat, sama
 * perhe kuin pallon vektorirantaviivat) 3 × 3 alinäytteellä ja
 * enemmistösäännöllä (≥ 5/9), joten maski ei leviä mereen: sen
 * 0,5-tasa-arvokäyrä on rantaviiva ±0,06°. Kaistan varjostin
 * (js/aikajana-vanat.js) lukee tämän tekstuurina; kulkumaski on
 * edelleen js/linssit/ihmisen-matka-maamaski.js. Rivijuoksut (meri,
 * maa, meri, …) varint-tavuina base64:nä; purku
 * js/aikajana-virrat-laskenta.js puraMaamaski(juoksut, leveys × korkeus).
 *
 * Maaruutuja ${maata} (${(100 * maata / maa.length).toFixed(1)} %), osittaisia rannikkoruutuja ${osittaisia}.
 */

export const RANTAMASKI = {
  leveys: ${W},
  korkeus: ${H},
  aste: ${RANTAMASKIN_ASTE},
  juoksut: '${pakattu}',
};
`;
writeFileSync(KOHDE, otsikko);
console.log(`kirjoitettu ${KOHDE} (${otsikko.length} merkkiä)${vikoja ? ` — ${vikoja} tarkistuspistettä pielessä` : ''}`);
process.exit(vikoja ? 1 : 0);
