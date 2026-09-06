/*
 * MAAMASKI IHMISEN MATKA -LINSSILLE (docs/moduulit/ihmisen-matka-virrat.md
 * luku 5.1).
 *
 *   node tools/tee-maamaski.mjs            kirjoittaa js/linssit/ihmisen-matka-maamaski.js
 *   node tools/tee-maamaski.mjs --kuva     lisäksi ASCII-kartta ja komponentit ruudulle
 *
 * Maa jaetaan 0,5°:n ruudukkoon (720 × 360) PELIN OMASTA DATASTA:
 * js/packs/maailmankartta.js OUTLINES ja COUNTRY_SHAPES-renkaat
 * rasteroidaan laudan Milleristä (js/fokusmitat.js) skannausviivalla,
 * 3 × 3 alinäytettä per ruutu, ruutu on maata kun ≥ 2/9 osuu. Työkalu
 * lisää käsin Tyynenmeren saaret pisteinä (liian pieniä laudan
 * ääriviivoille) ja ESTOT: ruudut, jotka pakotetaan mereksi, koska
 * puolen asteen ruudukko siltaisi salmen, jota ihmiset eivät
 * ylittäneet (Gibraltar, Bab-el-Mandeb).
 *
 * Tuloste kertoo yhtenäiset maa-alueet ja tarkistuspisteet, jotta
 * jokainen salmi on todennettu: Afrikka–Euraasia yksi komponentti,
 * Amerikat toinen, Australia, Britannia, Japani, Borneo, Sulawesi,
 * Madagaskar, Islanti, Kuuba, Uusi-Seelanti erillisiä — juuri ne,
 * joille virtadatan ylitykset ja nauhat on kirjoitettu.
 *
 * HIONTA 6.9.2026 (omistajan huomiot kuvakaappauksista):
 *
 *   1. MAAPEITTO (`peitot`, 0…9 osumaa yhdeksästä): maski ratkaisee
 *      yhä kulun (≥ 2/9 = maata, jotta kapeat kannakset pysyvät
 *      yhtenäisinä), mutta PIIRTO käyttää peittoa — rannikkoruutu,
 *      josta viidennes on maata, ei enää piirry täytenä neliönä.
 *      Malakan itäpuolen "ylimääräinen maa" oli juuri tätä:
 *      kynnys 2/9 leventää jokaista rannikkoa puoleen asteeseen.
 *   2. LAUDAN SAUMA 175°W: Tšuktšien niemimaan kärki (175°W…169,7°W,
 *      Dežnjovinniemi) puuttuu laudan polygoneista, joten Beringinsalmi
 *      oli maskissa 7–11° leveä. Kärki lisätään käsin polygonina
 *      (LISAYKSET), rasteroituna samalla alinäytteistyksellä.
 */
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';
import { laudaltaAsteiksi, projisoiLaudalle } from '../js/fokusmitat.js';
import {
  RUUDUKON_LEVEYS, RUUDUKON_KORKEUS, RUUDUN_ASTE, pakkaaMaamaski, puraMaamaski,
  pakkaaPeitto, puraPeitto, maaKomponentit, ruutu, ruudunKeskus,
} from '../js/aikajana-virrat-laskenta.js';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const KOHDE = join(JUURI, 'js/linssit/ihmisen-matka-maamaski.js');
const KUVA = process.argv.includes('--kuva');
const LAUTA = 'maailmankartta';
const W = RUUDUKON_LEVEYS;
const H = RUUDUKON_KORKEUS;
const ALI = 3; // alinäytteitä per sivu
const KYNNYS = 2; // osumia 9:stä

/*
 * KÄSIN LISÄTTÄVÄT SAARET (lat, lon): Tyynenmeren ja Intian valtameren
 * saaret, jotka ovat laudan ääriviivoille liian pieniä mutta kaaren
 * nauhoille välttämättömiä (Lapita, Polynesia, Madagaskarin reitti).
 * Koordinaatit en-Wikipedian artikkeleista, pyöristettyinä ruutuun.
 */
const SAARET = [
  ['Tongatapu', -21.15, -175.2], ['Samoa (Upolu)', -13.85, -171.75], ['Savai\'i', -13.6, -172.4],
  ['Rarotonga', -21.25, -159.8], ['Tahiti', -17.65, -149.45], ['Moorea', -17.55, -149.85],
  ['Marquesas (Nuku Hiva)', -8.9, -140.1], ['Mangareva', -23.1, -134.95], ['Rapa Nui', -27.1, -109.35],
  ['Havaiji (Hawaii)', 19.6, -155.5], ['Havaiji (Maui)', 20.8, -156.3], ['Havaiji (Oahu)', 21.45, -158.0],
  ['Havaiji (Kauai)', 22.05, -159.5], ['Guam', 13.45, 144.75], ['Palau', 7.5, 134.55],
  ['Chuuk', 7.45, 151.85], ['Pohnpei', 6.9, 158.2], ['Tarawa', 1.45, 173.0], ['Tuvalu (Funafuti)', -8.5, 179.2],
  ['Uusi-Kaledonia', -21.5, 165.5], ['Vanuatu (Efate)', -17.7, 168.35], ['Vanuatu (Espiritu Santo)', -15.4, 166.9],
  ['Fidži (Viti Levu)', -17.8, 178.0], ['Fidži (Vanua Levu)', -16.6, 179.3],
  ['Santa Cruz', -10.7, 165.85], ['Guadalcanal', -9.6, 160.2], ['Malaita', -9.0, 160.95],
  ['Bougainville', -6.2, 155.3], ['Uusi-Britannia', -5.5, 150.5], ['Uusi-Irlanti', -3.3, 152.0],
  ['Manus', -2.1, 147.0], ['Andamaanit', 12.0, 92.8], ['Färsaaret', 62.0, -7.0],
  ['Norfolk', -29.05, 167.95], ['Kermadec (Raoul)', -29.25, -177.9], ['Niue', -19.05, -169.9],
  ['Wallis', -13.3, -176.2], ['Rotuma', -12.5, 177.05], ['Tubuai', -23.35, -149.45],
  ['Chathamsaaret', -44.0, -176.5], ['Komorit', -11.7, 43.3], ['Mauritius', -20.3, 57.55],
];

/*
 * ESTOT: salmet, jotka ruudukko siltaisi. Gibraltar (Marokon väri
 * valuisi Iberiaan 250 ka) ja Bab-el-Mandeb (jotta ylitys tapahtuu
 * ikkunassa eikä 200 ka). Laatikko { lat: [etelä, pohjoinen], lon: [länsi, itä] }.
 */
const ESTOT = [
  { nimi: 'Gibraltar', lat: [35.5, 36.5], lon: [-6.0, -5.0] },
  { nimi: 'Bab-el-Mandeb', lat: [12.0, 13.0], lon: [43.0, 43.5] },
];

/*
 * LISÄYKSET: polygonit asteina [lat, lon], jotka rasteroidaan maskiin
 * laudan polygonien lisäksi. Tšuktšien kärki laudan sauman itäpuolella;
 * pisteet Tšuktšien niemimaan rannikolta (en-Wikipedia: Chukchi
 * Peninsula, Cape Dezhnev 66,08°N 169,65°W; Uelen; Cape Serdtse-Kamen
 * 66,95°N 171,7°W; Lavrentiya Bay; Provideniya 64,4°N 173,2°W;
 * tarkistettu 6.9.2026), pyöristettyinä puolen asteen tarkkuuteen.
 */
const LISAYKSET = [
  {
    nimi: 'Tšuktšien kärki',
    pisteet: [
      [67.1, -175.0], [67.1, -173.6], [66.95, -172.2], [66.9, -171.6], [66.5, -170.5], [66.3, -169.9],
      [66.0, -169.6], [65.8, -170.0], [65.6, -170.6], [65.3, -171.4], [64.8, -172.3], [64.45, -172.9],
      [64.35, -173.6], [64.6, -174.5], [64.95, -175.0],
    ],
  },
];

/** Tarkistuspisteet: nimi, lat, lon, odotettu (1 maa / 0 meri). */
const TARKISTUS = [
  ['Siinai', 30.0, 33.7, 1], ['Panama', 8.8, -80.0, 1], ['Beringinsalmi', 65.8, -169.0, 0],
  ['Dežnjov (Tšuktšien kärki)', 66.2, -169.9, 1], ['Provideniya', 64.5, -173.2, 1], ['Tšuktšimeri', 68.0, -172.0, 0],
  ['Gibraltar-esto', 36.0, -5.5, 0], ['Lontoo', 51.5, -0.1, 1], ['Sumatra', -0.5, 101.0, 1],
  ['Australia (Madjedbebe)', -12.5, 132.9, 1], ['Madagaskar', -19.0, 47.0, 1], ['Islanti', 64.8, -18.5, 1],
  ['Kuuba', 22.0, -79.5, 1], ['Uusi-Seelanti', -41.5, 174.0, 1], ['Tongatapu', -21.15, -175.2, 1],
  ['Havaiji', 19.6, -155.5, 1], ['Grönlanti', 70.0, -40.0, 1], ['Tšuktšit', 66.0, -172.0, 1],
  ['Seward', 65.0, -164.0, 1], ['Atlantti', 30.0, -40.0, 0], ['Sri Lanka', 7.5, 80.5, 1],
];

/* ---------------------------------------------------------- renkaat */

/** Kaikki renkaat laudan yksiköissä: ääriviivat + maiden renkaat. */
function renkaat() {
  const ulos = [];
  for (const o of MAAILMANKARTTA.map.outlines) ulos.push(o);
  for (const maa of Object.values(MAAILMANKARTTA.map.countryShapes ?? {})) {
    for (const r of maa.renkaat ?? []) ulos.push(r);
  }
  return ulos;
}

/**
 * Skannausviiva: renkaiden leikkauskohdat vaakasuoralla y. Palauttaa
 * union-välit [x0, x1] laudan yksiköissä (parillinen-pariton per rengas).
 */
function skannaa(rengasLista, y) {
  const valit = [];
  for (const rengas of rengasLista) {
    const xs = [];
    const n = rengas.length;
    for (let k = 0; k < n; k += 1) {
      const [x1, y1] = rengas[k];
      const [x2, y2] = rengas[(k + 1) % n];
      if ((y1 <= y) === (y2 <= y)) continue;
      xs.push(x1 + ((y - y1) * (x2 - x1)) / (y2 - y1));
    }
    if (xs.length < 2) continue;
    xs.sort((a, b) => a - b);
    for (let k = 0; k + 1 < xs.length; k += 2) valit.push([xs[k], xs[k + 1]]);
  }
  valit.sort((a, b) => a[0] - b[0]);
  // Yhdistä päällekkäiset.
  const ulos = [];
  for (const v of valit) {
    const e = ulos[ulos.length - 1];
    if (e && v[0] <= e[1]) e[1] = Math.max(e[1], v[1]);
    else ulos.push([v[0], v[1]]);
  }
  return ulos;
}

/* ---------------------------------------------------------- rasteri */

/**
 * Onko piste (lat, lon) asteina annetussa polygonissa (parillinen-
 * pariton sääntö). Pituusaste kierretään polygonin ensimmäisen pisteen
 * lähelle, jotta antimeridiaanin ylittävä muoto toimii.
 */
function polygonissa(lat, lon, pisteet) {
  const lon0 = pisteet[0][1];
  let l = lon;
  while (l - lon0 > 180) l -= 360;
  while (l - lon0 < -180) l += 360;
  let sisalla = false;
  for (let k = 0, j = pisteet.length - 1; k < pisteet.length; j = k, k += 1) {
    const [y1, x1] = pisteet[k];
    const [y2, x2] = pisteet[j];
    if ((y1 > lat) !== (y2 > lat) && l < x1 + ((lat - y1) * (x2 - x1)) / (y2 - y1)) sisalla = !sisalla;
  }
  return sisalla;
}

/** Käsin lisätyt polygonit osumiin: sama alinäytteistys kuin laudalla. */
function rasteroiLisaykset(osumat) {
  let ruutuja = 0;
  for (const { pisteet } of LISAYKSET) {
    const latMin = Math.min(...pisteet.map((p) => p[0]));
    const latMax = Math.max(...pisteet.map((p) => p[0]));
    const r0 = Math.max(0, Math.floor((90 - latMax) / RUUDUN_ASTE) - 1);
    const r1 = Math.min(H - 1, Math.floor((90 - latMin) / RUUDUN_ASTE) + 1);
    for (let r = r0; r <= r1; r += 1) {
      for (let c = 0; c < W; c += 1) {
        let n = 0;
        for (let a = 0; a < ALI; a += 1) {
          const lat = 90 - (r + (a + 0.5) / ALI) * RUUDUN_ASTE;
          for (let b = 0; b < ALI; b += 1) {
            const lon = -180 + (c + (b + 0.5) / ALI) * RUUDUN_ASTE;
            if (polygonissa(lat, lon, pisteet)) n += 1;
          }
        }
        if (!n) continue;
        const i = r * W + c;
        const ennen = osumat[i];
        osumat[i] = Math.max(ennen, n);
        if (ennen < KYNNYS && n >= KYNNYS) ruutuja += 1;
      }
    }
  }
  return ruutuja;
}

function rasteroi() {
  const lista = renkaat();
  const osumat = new Uint8Array(W * H);
  const leveysX = MAAILMANKARTTA.map.width;
  for (let r = 0; r < H; r += 1) {
    for (let a = 0; a < ALI; a += 1) {
      const lat = 90 - (r + (a + 0.5) / ALI) * RUUDUN_ASTE;
      const p = projisoiLaudalle(LAUTA, 0, lat);
      if (!p) continue;
      const y = p.y;
      // Laudan ulkopuolella (76°N…58°S) ei ole maata datassa.
      if (y < 0 || y > MAAILMANKARTTA.map.height) continue;
      const valit = skannaa(lista, y);
      if (!valit.length) continue;
      for (let c = 0; c < W; c += 1) {
        for (let b = 0; b < ALI; b += 1) {
          const lon = -180 + (c + (b + 0.5) / ALI) * RUUDUN_ASTE;
          const q = projisoiLaudalle(LAUTA, lon, lat);
          if (!q) continue;
          const x = ((q.x % leveysX) + leveysX) % leveysX;
          // Binäärihaku väleistä.
          let lo = 0;
          let hi = valit.length - 1;
          let sisalla = false;
          while (lo <= hi) {
            const m = (lo + hi) >> 1;
            const [x0, x1] = valit[m];
            if (x < x0) hi = m - 1;
            else if (x > x1) lo = m + 1;
            else { sisalla = true; break; }
          }
          if (sisalla) osumat[r * W + c] += 1;
        }
      }
    }
  }
  const lisattyja = rasteroiLisaykset(osumat);
  const maa = new Uint8Array(W * H);
  for (let i = 0; i < maa.length; i += 1) maa[i] = osumat[i] >= KYNNYS ? 1 : 0;
  return { maa, osumat, lisattyja };
}

/* ------------------------------------------------------------- pää */

const alku = performance.now();
const { maa, osumat, lisattyja } = rasteroi();
const rasterMs = performance.now() - alku;
/*
 * Käsin lisätty saari on yksi ruutu, mutta oikea saari on ruutua
 * pienempi: peitto 5/9, jotta se piirtyy pehmeänä täplänä eikä
 * täytenä neliönä.
 */
const SAAREN_PEITTO = 5;
let lisatyt = 0;
for (const [, lat, lon] of SAARET) {
  const i = ruutu(lat, lon);
  if (!maa[i]) { maa[i] = 1; osumat[i] = Math.max(osumat[i], SAAREN_PEITTO); lisatyt += 1; }
}
let estetyt = 0;
for (const e of ESTOT) {
  for (let i = 0; i < maa.length; i += 1) {
    const { lat, lon } = ruudunKeskus(i);
    if (lat >= e.lat[0] && lat <= e.lat[1] && lon >= e.lon[0] && lon <= e.lon[1] && maa[i]) { maa[i] = 0; osumat[i] = 0; estetyt += 1; }
  }
}
// Peitto vain maaruuduille (meriruudun osumat alle kynnyksen eivät piirry).
const peitto = new Uint8Array(W * H);
for (let i = 0; i < maa.length; i += 1) peitto[i] = maa[i] ? Math.min(9, osumat[i]) : 0;
const maata = maa.reduce((s, v) => s + v, 0);
const pakattu = pakkaaMaamaski(maa);
const takaisin = puraMaamaski(pakattu);
let ero = 0;
for (let i = 0; i < maa.length; i += 1) if (maa[i] !== takaisin[i]) ero += 1;
if (ero) throw new Error(`pakkaus ei palaa samana: ${ero} ruutua`);
const pakattuPeitto = pakkaaPeitto(peitto);
const peittoTakaisin = puraPeitto(pakattuPeitto);
for (let i = 0; i < peitto.length; i += 1) if (peitto[i] !== peittoTakaisin[i]) ero += 1;
if (ero) throw new Error(`peiton pakkaus ei palaa samana: ${ero} ruutua`);
let osittaisia = 0;
for (let i = 0; i < peitto.length; i += 1) if (maa[i] && peitto[i] < 9) osittaisia += 1;

const { tunnus, koot } = maaKomponentit(maa);
const nimet = new Map();
const nimea = (nimi, lat, lon) => {
  const id = tunnus[ruutu(lat, lon)];
  if (id >= 0 && !nimet.has(id)) nimet.set(id, nimi);
  return id;
};
for (const [nimi, lat, lon] of [
  ['Afrikka–Euraasia', 30.0, 33.7], ['Amerikat', 8.8, -80.0], ['Australia', -25, 135], ['Britannia', 52, -1],
  ['Irlanti', 53, -8], ['Japani (Honshu)', 36, 138], ['Borneo', 1, 114], ['Sulawesi', -2, 121], ['Sumatra', -0.5, 101],
  ['Jaava', -7, 110], ['Madagaskar', -19, 47], ['Islanti', 64.8, -18.5], ['Kuuba', 22, -79.5], ['Uusi-Seelanti (etelä)', -44, 170],
  ['Uusi-Seelanti (pohjoinen)', -38, 176], ['Tasmania', -42, 146.5], ['Uusi-Guinea', -5, 141], ['Sri Lanka', 7.5, 80.5],
  ['Grönlanti', 70, -40], ['Taiwan', 23.7, 121], ['Hokkaido', 43, 142.5], ['Sahalin', 50, 143], ['Kyushu', 32.5, 131],
  ['Filippiinit (Luzon)', 16, 121], ['Mindanao', 7.5, 125], ['Timor', -9, 125.5], ['Flores', -8.6, 121], ['Halmahera', 0.9, 127.9],
  ['Uusi-Britannia', -5.5, 150.5], ['Hispaniola', 19, -71], ['Tulimaa', -54, -68], ['Vancouver', 49.5, -125], ['Sisilia', 37.5, 14],
]) nimea(nimi, lat, lon);

console.log(`rasterointi ${Math.round(rasterMs)} ms, maaruutuja ${maata} (${(100 * maata / maa.length).toFixed(1)} %), `
  + `saaria lisätty ${lisatyt}, polygoneista ${lisattyja} ruutua, estoja ${estetyt}, pakattu ${pakattu.length} merkkiä; `
  + `peitto: osittaisia ruutuja ${osittaisia}, pakattu ${pakattuPeitto.length} merkkiä`);
console.log('Komponentit (koko ruutuina, ≥ 4 tai nimetty):');
koot.map((k, id) => ({ id, k })).filter(({ id, k }) => k >= 4 || nimet.has(id)).sort((a, b) => b.k - a.k)
  .forEach(({ id, k }) => console.log(`  ${String(k).padStart(6)}  ${nimet.get(id) ?? ''}`));
console.log(`  (komponentteja kaikkiaan ${koot.length})`);
console.log('Tarkistuspisteet:');
let vikoja = 0;
for (const [nimi, lat, lon, odotus] of TARKISTUS) {
  const arvo = maa[ruutu(lat, lon)];
  const ok = arvo === odotus;
  if (!ok) vikoja += 1;
  console.log(`  ${ok ? 'OK  ' : 'FAIL'} ${nimi}: ${arvo ? 'maa' : 'meri'}`);
}

if (KUVA) {
  // ASCII-kartta 180 × 90 (4 × 4 ruutua per merkki).
  for (let r = 0; r < H; r += 4) {
    let rivi = '';
    for (let c = 0; c < W; c += 4) {
      let n = 0;
      for (let dr = 0; dr < 4; dr += 1) for (let dc = 0; dc < 4; dc += 1) n += maa[(r + dr) * W + c + dc];
      rivi += n >= 8 ? '#' : n > 0 ? '+' : '.';
    }
    console.log(rivi);
  }
}

const otsikko = `/*
 * MAAMASKI IHMISEN MATKA -LINSSILLE — GENEROITU, ÄLÄ MUOKKAA KÄSIN.
 *
 *   node tools/tee-maamaski.mjs
 *
 * 720 × 360 ruutua (0,5°), rivi 0 = 90°N…89,5°N, sarake 0 = 180°W…179,5°W.
 * Rasteroitu pelin omasta laudasta (js/packs/maailmankartta.js OUTLINES
 * ja COUNTRY_SHAPES) Millerin käänteiskaavalla; laudan ulkopuoli
 * (76°N pohjoispuoli, 58°S eteläpuoli) on merta. Tyynenmeren saaret ja
 * salmien estot ja käsin lisätty Tšuktšien kärki: ks. työkalu.
 * Rivijuoksut (meri, maa, meri, …) varint-tavuina base64:nä; purku
 * js/aikajana-virrat-laskenta.js puraMaamaski. \`peitot\` on maapeitto
 * 0…9 (osumia yhdeksästä alinäytteestä) piirtoa varten, purku
 * puraPeitto — kulku käyttää vain \`juoksut\`-maskia.
 *
 * Maaruutuja ${maata} (${(100 * maata / maa.length).toFixed(1)} %), komponentteja ${koot.length},
 * osittaisia rannikkoruutuja ${osittaisia}.
 */

export const MAAMASKI = {
  leveys: ${W},
  korkeus: ${H},
  juoksut: '${pakattu}',
  peitot: '${pakattuPeitto}',
};
`;
writeFileSync(KOHDE, otsikko);
console.log(`kirjoitettu ${KOHDE}${vikoja ? ` — ${vikoja} tarkistuspistettä pielessä` : ''}`);
process.exit(vikoja ? 1 : 0);
