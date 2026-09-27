#!/usr/bin/env node
/*
 * PALLON KERMAHUNTU NATIIVILLE — webin laattakerma-shaderin sääntö
 * poltettuna Web Mercator -laatoiksi (Karttaseppä 24.9.2026, Fable:
 * löydös 22 vaihtoehto A).
 *
 *   node tools/tee-pallokerma.mjs --pohja <kansio Z/X/Y.jpg> --polygonit <maapolygonit.geojson>
 *        --ulos <kansio> (--maa ISO --alue lon0,lat0,lon1,lat1 | --maailma)
 *        [--min 5] [--max 8] [--osa i/n] [--vain-luettelo] [--peitto 0.8] [--pohjanimi <sarja>]
 *   node tools/tee-pallokerma.mjs --ulos <sarjan kansio> --alasnayte 3 [--vara <_maailma-kansio>]
 *        (tasot 3…min−1 valmiista alimmasta tasosta, laatat.json tasot.min → 3)
 *
 * WEBIN SÄÄNTÖ (js/laattakerma-shader.js, js/laattapyramidi.js
 * pyramidinTasoitus): pallon pohjalaatan jokaiselle texelille
 *
 *   ero = (R − B) sRGB-arvoina (0…255)
 *   t   = smoothstep(KERMA_MERI_ERO 36, KERMA_MAA_ERO 52, ero)   maa vs. meri
 *   a   = t × KERMAN_PEITTO_KIINTEA 0,80 × (1 − sisällä)
 *   väri = mix(texel, kerma #faf4d6, a)
 *
 * missä `sisällä` on nykyisen maan renkaiden maski (assets/data/
 * maapolygonit.json; tässä sen lon/lat-muunnos). Natiivissa ei ole
 * shaderia, joten laatta on RGBA-kerros: väri = kerma, alfa = a.
 * Meri (pieni R − B) jää läpinäkyväksi ja naapurimaiden nimet ja relief
 * näkyvät 20 %:n läpi — kuten webissä.
 *
 * KAKSI SARJAA. `--maa ISO` tekee maan laatikon (varitasot[ISO].alue)
 * laatat, joissa oma maa on reikä; `--maailma` saman säännön ilman
 * reikää koko maailmalle. Natiivi ottaa laatikon sisällä maan sarjan ja
 * muualla maailman sarjan. Täysin läpinäkyvää laattaa ei kirjoiteta
 * (natiivi: puuttuva laatta = läpinäkyvä).
 *
 * MASKIN REUNA. Web rasteroi renkaat 2048 px:n maskiin maan laatikon
 * yli ja lukee sen bilineaarisesti, joten reuna on noin yhden maskipikselin
 * pehmeä. Tässä renkaat rasteroidaan laatan tarkkuudella (antialiasoitu
 * SVG) ja sumennetaan saman maskipikselin levyisesti.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

export const KERMA = [0xfa, 0xf4, 0xd6];
export const KERMA_PEITTO = 0.8;
export const KERMA_MERI_ERO = 36;
export const KERMA_MAA_ERO = 52;
export const LAATTA = 256;
const MASKIN_SIVU = 2048;
const RAD = Math.PI / 180;

const smoothstep = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

/*
 * Ajon peitto (omistajan löydös 128, build 16: p080 peittää liikaa; Natiiviseppä
 * 25.9.2026: vaihtoehdot p060 ja p045 kuvapariin). `--peitto 0.6`; oletus on
 * webin KERMA_PEITTO, jolloin tulos on tavulleen entinen.
 */
let ajonPeitto = KERMA_PEITTO;
export function asetaPeitto(p) {
  if (!(p > 0 && p <= 1)) throw new Error(`--peitto ${p}: oltava 0 < p <= 1`);
  ajonPeitto = p;
}

/** Kerman alfa (0…255) texelin sRGB-arvoista. */
export function kermanAlfa(r, b, sisalla = 0) {
  return Math.round(255 * smoothstep(KERMA_MERI_ERO, KERMA_MAA_ERO, r - b) * ajonPeitto * (1 - sisalla));
}

/** Web Mercator: lon/lat → maailman pikseli tasolla Z. */
export function maailmanPikseli(lon, lat, Z) {
  const n = LAATTA * 2 ** Z;
  const s = Math.sin(Math.max(-85.06, Math.min(85.06, lat)) * RAD);
  return [((lon + 180) / 360) * n, (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * n];
}

/** Laatan (Z, X, Y) reunat asteina. */
export function laatanReunat(Z, X, Y) {
  const n = 2 ** Z;
  const lat = (y) => Math.atan(Math.sinh(Math.PI * (1 - (2 * y) / n))) / RAD;
  return { lansi: (X / n) * 360 - 180, ita: ((X + 1) / n) * 360 - 180, pohjoinen: lat(Y), etela: lat(Y + 1) };
}

/** Tason laatat alueella [lon0, lat0, lon1, lat1] (tai kaikki). */
export function tasonLaatat(Z, alue = null) {
  const n = 2 ** Z; const ulos = [];
  for (let X = 0; X < n; X += 1) {
    for (let Y = 0; Y < n; Y += 1) {
      if (alue) {
        const r = laatanReunat(Z, X, Y);
        if (r.ita <= alue[0] || r.lansi >= alue[2] || r.pohjoinen <= alue[1] || r.etela >= alue[3]) continue;
      }
      ulos.push([X, Y]);
    }
  }
  return ulos;
}

/** Maan renkaat [[lon, lat]…] ja niiden rajaavat laatikot. */
export function maanRenkaat(geojson, iso) {
  const f = geojson.features.find((x) => x.properties?.iso === iso);
  if (!f) throw new Error(`--maa ${iso}: ei polygonia`);
  const renkaat = [];
  for (const p of f.geometry.coordinates) {
    for (const r of p) {
      let l0 = 180; let l1 = -180; let b0 = 90; let b1 = -90;
      for (const [x, y] of r) { l0 = Math.min(l0, x); l1 = Math.max(l1, x); b0 = Math.min(b0, y); b1 = Math.max(b1, y); }
      renkaat.push({ r, laatikko: [l0, b0, l1, b1] });
    }
  }
  return renkaat;
}

/** Maan maskin reunan pehmeys asteina (webin maski: laatikko + 5 % / 2048 px). */
export function maskinPikseliAsteina(renkaat) {
  let l0 = 180; let l1 = -180; let b0 = 90; let b1 = -90;
  for (const { laatikko: [a, b, c, d] } of renkaat) { l0 = Math.min(l0, a); b0 = Math.min(b0, b); l1 = Math.max(l1, c); b1 = Math.max(b1, d); }
  return (Math.max(l1 - l0, b1 - b0) * 1.1) / MASKIN_SIVU;
}

/** Oman maan maski laatalle (Float32Array 0…1) tai null, jos laatta ei osu maahan. */
async function maskiLaatalle(sharp, renkaat, Z, X, Y, sumeusAsteina) {
  const rj = laatanReunat(Z, X, Y);
  const osuvat = renkaat.filter(({ laatikko: [a, b, c, d] }) => !(c < rj.lansi || a > rj.ita || d < rj.etela || b > rj.pohjoinen));
  if (!osuvat.length) return null;
  const polut = osuvat.map(({ r }) => `M${r.map(([lon, lat]) => {
    const [gx, gy] = maailmanPikseli(lon, lat, Z);
    return `${(gx - X * LAATTA).toFixed(2)},${(gy - Y * LAATTA).toFixed(2)}`;
  }).join('L')}Z`).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${LAATTA}" height="${LAATTA}"><path d="${polut}" fill="#fff" fill-rule="nonzero"/></svg>`;
  // Maskipikseli laatan pikseleinä (leveysasteen keskellä).
  const pxAsteella = (LAATTA * 2 ** Z) / 360;
  const sigma = Math.max(0.3, (sumeusAsteina * pxAsteella) / 2);
  let kuva = sharp(Buffer.from(svg)).ensureAlpha();
  if (sigma >= 0.3) kuva = kuva.blur(sigma);
  const { data } = await kuva.raw().toBuffer({ resolveWithObject: true });
  const m = new Float32Array(LAATTA * LAATTA);
  for (let i = 0; i < m.length; i += 1) m[i] = data[i * 4 + 3] / 255;
  return m;
}

/** Yhden laatan RGBA-huntu; null, jos laatta on kokonaan läpinäkyvä. */
export async function kermaLaatta(sharp, pohjaJpg, maski) {
  const { data, info } = await sharp(pohjaJpg).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const ulos = Buffer.alloc(LAATTA * LAATTA * 4);
  let jotain = false;
  for (let i = 0; i < LAATTA * LAATTA; i += 1) {
    const o = i * info.channels;
    const a = kermanAlfa(data[o], data[o + 2], maski ? maski[i] : 0);
    ulos[i * 4] = KERMA[0]; ulos[i * 4 + 1] = KERMA[1]; ulos[i * 4 + 2] = KERMA[2]; ulos[i * 4 + 3] = a;
    if (a > 0) jotain = true;
  }
  return jotain ? ulos : null;
}

/**
 * ALASNÄYTE (Natiiviseppä 24.9.2026, B7-3 "varalaatta"): Cesium sekoittaa
 * samassa näkymässä vierekkäisiä tasoja; jos Z4:llä ei ole huntua, Z5:n
 * alueet näkyvät vaaleina suorakulmioina. Taso Z tehdään tasosta Z+1:
 * 2 × 2 lasta 512 px:n läpinäkyvälle pohjalle (puuttuva lapsi =
 * läpinäkyvä) ja pienennys 256 px:iin (sharp esikertoo alfan, joten
 * reunan kerma ei tummu). Täysin läpinäkyvää laattaa ei kirjoiteta.
 */
export function vanhemmat(lapsiAvaimet) {
  const v = new Map();
  for (const [x, y] of lapsiAvaimet) {
    const k = `${x >> 1}/${y >> 1}`;
    if (!v.has(k)) v.set(k, [x >> 1, y >> 1]);
  }
  return [...v.values()];
}

function tasonTiedostot(ulos, Z) {
  const kansio = join(ulos, String(Z));
  if (!existsSync(kansio)) return [];
  const t = [];
  for (const x of readdirSync(kansio)) {
    if (!/^\d+$/.test(x)) continue;
    for (const f of readdirSync(join(kansio, x))) {
      const m = /^(\d+)\.webp$/.exec(f);
      if (m) t.push([Number(x), Number(m[1])]);
    }
  }
  return t;
}

/*
 * Maan sarjassa (alue = varitaso-laatikko) laatikon ULKOPUOLISET lapset
 * otetaan maailman sarjasta (vara): muuten laatikon reunan yli ulottuva
 * vanhempi saisi läpinäkyvän neljänneksen ja kovan suorakulmion reunan.
 * Laatikon sisällä puuttuva lapsi on aidosti läpinäkyvä (oma maa reikä).
 */
export async function alasnaytaTaso(sharp, ulos, Z, { alue = null, vara = null } = {}) {
  let kirjoitettu = 0;
  const sisalla = alue ? new Set(tasonLaatat(Z + 1, alue).map(([x, y]) => `${x}/${y}`)) : null;
  const lapset = alue ? tasonLaatat(Z + 1, alue) : tasonTiedostot(ulos, Z + 1);
  for (const [X, Y] of vanhemmat(lapset)) {
    const osat = [];
    for (const [dx, dy] of [[0, 0], [1, 0], [0, 1], [1, 1]]) {
      const x = 2 * X + dx; const y = 2 * Y + dy;
      const kansio = sisalla && !sisalla.has(`${x}/${y}`) ? vara : ulos;
      const p = kansio && join(kansio, String(Z + 1), String(x), `${y}.webp`);
      if (p && existsSync(p)) osat.push({ input: readFileSync(p), left: dx * LAATTA, top: dy * LAATTA });
    }
    if (!osat.length) continue; // eslint-disable-line no-continue
    const iso = await sharp({ create: { width: 2 * LAATTA, height: 2 * LAATTA, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } }) // eslint-disable-line no-await-in-loop
      .composite(osat).png().toBuffer();
    const { data } = await sharp(iso).resize(LAATTA, LAATTA, { kernel: 'lanczos3' }).ensureAlpha().raw() // eslint-disable-line no-await-in-loop
      .toBuffer({ resolveWithObject: true });
    let alfa = 0;
    for (let i = 3; i < data.length; i += 4) if (data[i] > alfa) alfa = data[i];
    if (!alfa) continue; // eslint-disable-line no-continue
    const webp = await sharp(data, { raw: { width: LAATTA, height: LAATTA, channels: 4 } }).webp({ quality: 90, alphaQuality: 90 }).toBuffer(); // eslint-disable-line no-await-in-loop
    mkdirSync(join(ulos, String(Z), String(X)), { recursive: true });
    writeFileSync(join(ulos, String(Z), String(X), `${Y}.webp`), webp);
    kirjoitettu += 1;
  }
  return kirjoitettu;
}

async function paa() {
  const argv = process.argv.slice(2);
  const lippu = (n) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : null; };
  const pohja = lippu('--pohja'); const ulos = lippu('--ulos');
  if (lippu('--peitto') !== null) asetaPeitto(Number(lippu('--peitto')));
  if (lippu('--alasnayte') !== null) {
    const lp = join(ulos, 'laatat.json');
    const l = JSON.parse(readFileSync(lp, 'utf8'));
    const alin = Number(lippu('--alasnayte')); const lahtotaso = l.alasnayte?.lahde ?? l.tasot.min;
    const sharp = (await import('sharp')).default;
    for (let Z = l.tasot.min - 1; Z >= alin; Z -= 1) {
      const a = l.varitaso?.alue; const alue = a ? [a.lon0, a.lat0, a.lon1, a.lat1] : null;
      const vara = alue ? lippu('--vara') : null;
      if (alue && !vara) throw new Error('maan sarja tarvitsee --vara <maailman sarja> laatikon ulkopuolisille lapsille');
      console.log(`${ulos}: Z${Z} ${await alasnaytaTaso(sharp, ulos, Z, { alue, vara })} laattaa (alasnäyte Z${Z + 1}:stä)`); // eslint-disable-line no-await-in-loop
    }
    l.tasot.min = Math.min(l.tasot.min, alin);
    l.alasnayte = { tasot: [l.tasot.min, lahtotaso - 1], lahde: lahtotaso, tapa: '2 × 2 lasta → 256 px (esikerrottu alfa), puuttuva lapsi läpinäkyvä' };
    writeFileSync(lp, `${JSON.stringify(l, null, 1)}\n`);
    return;
  }
  const iso = lippu('--maa'); const maailma = argv.includes('--maailma');
  if (!pohja || !ulos || (!iso && !maailma)) throw new Error('käyttö: --pohja --ulos (--maa ISO --alue … | --maailma) [--polygonit]');
  const min = Number(lippu('--min') ?? 5); const max = Number(lippu('--max') ?? 8);
  const alue = lippu('--alue')?.split(',').map(Number) ?? null;
  if (iso && !alue) throw new Error('--maa vaatii --alue (varitasot[ISO].alue)');
  const osa = lippu('--osa')?.split('/').map(Number) ?? null;
  mkdirSync(ulos, { recursive: true });
  const luettelo = {
    lahde: `webin laattakerma-shaderin sääntö (js/laattakerma-shader.js), pohja ${lippu('--pohjanimi') ?? '2026-09-23a-pohja-20260923a'}`,
    kerma: '#faf4d6', peitto: ajonPeitto, ero: [KERMA_MERI_ERO, KERMA_MAA_ERO],
    ...(iso ? { maa: iso, varitaso: { alue: { lon0: alue[0], lat0: alue[1], lon1: alue[2], lat1: alue[3] } } } : { maailma: true }),
    tasot: { min, max }, laatta: LAATTA, muoto: 'webp', puuttuva: 'läpinäkyvä', tehty: new Date().toISOString(),
  };
  if (argv.includes('--vain-luettelo')) { writeFileSync(join(ulos, 'laatat.json'), `${JSON.stringify(luettelo, null, 1)}\n`); return; }
  const sharp = (await import('sharp')).default;
  let renkaat = null; let sumeus = 0;
  if (iso) {
    renkaat = maanRenkaat(JSON.parse(readFileSync(lippu('--polygonit'), 'utf8')), iso);
    sumeus = maskinPikseliAsteina(renkaat);
  }
  let tehty = 0; let kirjoitettu = 0;
  for (let Z = min; Z <= max; Z += 1) {
    for (const [X, Y] of tasonLaatat(Z, alue)) {
      if (osa && X % osa[1] !== osa[0] - 1) continue;
      const lahde = join(pohja, String(Z), String(X), `${Y}.jpg`);
      tehty += 1;
      if (!existsSync(lahde)) continue;
      const maski = renkaat ? await maskiLaatalle(sharp, renkaat, Z, X, Y, sumeus) : null; // eslint-disable-line no-await-in-loop
      const rgba = await kermaLaatta(sharp, readFileSync(lahde), maski); // eslint-disable-line no-await-in-loop
      if (!rgba) continue;
      const webp = await sharp(rgba, { raw: { width: LAATTA, height: LAATTA, channels: 4 } }).webp({ quality: 90, alphaQuality: 90 }).toBuffer(); // eslint-disable-line no-await-in-loop
      mkdirSync(join(ulos, String(Z), String(X)), { recursive: true });
      writeFileSync(join(ulos, String(Z), String(X), `${Y}.webp`), webp);
      kirjoitettu += 1;
    }
  }
  if (!osa) writeFileSync(join(ulos, 'laatat.json'), `${JSON.stringify(luettelo, null, 1)}\n`);
  console.log(`${iso ?? 'maailma'}: ${tehty} laattaa käyty, ${kirjoitettu} kirjoitettu (loput läpinäkyviä)`);
}

if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
  paa().catch((e) => { console.error(e.message ?? e); process.exit(1); });
}
