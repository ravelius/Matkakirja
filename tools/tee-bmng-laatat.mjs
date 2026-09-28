/*
 * BLUE MARBLE NEXT GENERATION KUUKAUDEN PINNAKSI (Karttaseppä 28.9.2026,
 * ISS-realismi kohta 4a, docs/raportit/iss-realismi-suunnitelma-20260928.md).
 *
 *   node tools/tee-bmng-laatat.mjs --lahde <kansio> --kk 09 --ulos <kansio>
 *        [--lahteet A1,A2,…] [--min 0] [--max 7] [--laatu 85]
 *
 * LÄHDE: NASA Blue Marble Next Generation (Stöckli ym., NASA Earth
 * Observatory), perussarja ilman topografia- ja batymetriavarjostusta:
 * assets.science.nasa.gov/…/bmng/bmng-base/<kuukausi>/world.2004MM.*.jpg.
 * NASAn kuvat ovat public domain. Varjostamaton sarja valitaan, koska
 * astronautin kyydissä aurinko valaisee pinnan dynaamisesti (kohta 1):
 * kuvaan poltettu rinnevarjo osoittaisi aina samaan suuntaan.
 *
 * Kansiossa on kuukauden kahdeksan 500 m:n osaa (21600 × 21600,
 * world.2004MM.3x21600x21600.{A1…D2}.jpg; A–D = 90°:n pituuskaistat
 * 180° W:stä itään, 1 = pohjoinen 90°…0°, 2 = eteläinen 0°…90° S) ja
 * koko maailma 21600 × 10800 (…3x21600x10800.jpg).
 *
 * TULOS:
 *   <ulos>/<kk>/{z}/{x}/{y}.jpg  Web Mercator XYZ 256 px (kuten yövalot),
 *                                ämpärissä julisteet/pallo/bmng/<kk>/
 *   <ulos>/<kk>-4096.jpg         tasakulmainen 4096 × 2048 (pilvialfan
 *                                vertailukuva, ämpärissä data/bmng/)
 *
 * MIKSI LAATTA KERRALLAAN SUORAAN LÄHTEESTÄ. Tasot 4–7 osuvat kokonaan
 * yhden 90°:n osan sisään (pituusrajat ovat 90°:n kerrannaisia ja
 * päiväntasaaja on Mercatorin laattaraja tasosta 1 alkaen), joten
 * jokainen laatta lasketaan omasta osastaan: sharp rajaa laatan alueen
 * ja pienentää sen vaakasuunnassa 256 px:iin (lanczos3, alueen
 * keskiarvo), ja Mercatorin pystymittakaava tehdään riveittäin
 * lineaarisella interpoloinnilla. Tasot 0–3 lasketaan samalla tavalla
 * koko maailman kuvasta (21600 px riittää tasolle 3, 2048 px). Näin
 * matalia tasoja ei koota uudelleenpakatuista JPEG-laatoista.
 */
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);

export const LAATTA = 256;
export const OSAT = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'];

/** Mercator-laatan rivin yläreunan leveysaste. */
export function mercLat(z, y) {
  const n = Math.PI - (2 * Math.PI * y) / 2 ** z;
  return (180 / Math.PI) * Math.atan(Math.sinh(n));
}

/** Osan maantieteellinen alue: { lon0, lat0 (yläreuna), aste }. */
export function osanAlue(osa) {
  const sarake = 'ABCD'.indexOf(osa[0]);
  if (sarake < 0 || !['1', '2'].includes(osa[1])) throw new Error(`tuntematon osa ${osa}`);
  return { lon0: -180 + 90 * sarake, lat0: osa[1] === '1' ? 90 : 0, aste: 90 };
}

/** Tason z laatat, jotka osuvat kokonaan osan sisään (z ≥ 2). */
export function osanLaatat(osa, z) {
  const { lon0, lat0 } = osanAlue(osa);
  const n = 2 ** z;
  const x0 = ((lon0 + 180) / 360) * n; const x1 = x0 + n / 4;
  const [y0, y1] = lat0 === 90 ? [0, n / 2] : [n / 2, n];
  const ulos = [];
  for (let x = x0; x < x1; x += 1) for (let y = y0; y < y1; y += 1) ulos.push([x, y]);
  return ulos;
}

/**
 * Yksi laatta tasakulmaisesta lähteestä. `lahde` = { raw, leveys, korkeus,
 * lon0, lat0, pxAste } (raw RGB, rivi ylhäältä; lat0 = yläreunan leveys).
 */
export async function laskeLaatta(sharp, lahde, z, x, y, laatu = 85) {
  const n = 2 ** z;
  const lonA = (x / n) * 360 - 180; const lonB = ((x + 1) / n) * 360 - 180;
  const latA = mercLat(z, y); const latB = mercLat(z, y + 1);
  const riviA = (lahde.lat0 - latA) * lahde.pxAste; const riviB = (lahde.lat0 - latB) * lahde.pxAste;
  const left = Math.max(0, Math.round((lonA - lahde.lon0) * lahde.pxAste));
  const width = Math.min(lahde.leveys - left, Math.round((lonB - lahde.lon0) * lahde.pxAste) - left);
  const top = Math.max(0, Math.floor(riviA)); const bot = Math.min(lahde.korkeus, Math.ceil(riviB));
  const height = Math.max(1, bot - top);
  // Pysty samassa suhteessa kuin vaaka, vähintään laatan korkeus (interpolointivara).
  const hs = Math.max(LAATTA, Math.round((height * LAATTA) / width));
  const pala = await sharp(lahde.raw, { raw: { width: lahde.leveys, height: lahde.korkeus, channels: 3 } })
    .extract({ left, top, width, height })
    .resize(LAATTA, hs, { fit: 'fill', kernel: 'lanczos3' })
    .raw().toBuffer();
  const ulos = Buffer.alloc(LAATTA * LAATTA * 3);
  const rivi = LAATTA * 3;
  for (let j = 0; j < LAATTA; j += 1) {
    const lat = mercLat(z, y + (j + 0.5) / LAATTA);
    const r = (((lahde.lat0 - lat) * lahde.pxAste - top) / height) * hs - 0.5;
    const r0 = Math.max(0, Math.min(hs - 1, Math.floor(r))); const r1 = Math.min(hs - 1, r0 + 1);
    const t = Math.max(0, Math.min(1, r - r0));
    const a = r0 * rivi; const b = r1 * rivi; const o = j * rivi;
    for (let i = 0; i < rivi; i += 1) ulos[o + i] = Math.round(pala[a + i] * (1 - t) + pala[b + i] * t);
  }
  return sharp(ulos, { raw: { width: LAATTA, height: LAATTA, channels: 3 } }).jpeg({ quality: laatu, mozjpeg: true }).toBuffer();
}

async function lue(sharp, tiedosto) {
  const { data, info } = await sharp(tiedosto, { limitInputPixels: false }).removeAlpha().raw()
    .toBuffer({ resolveWithObject: true });
  return { raw: data, leveys: info.width, korkeus: info.height };
}

async function kirjoitaTaso(sharp, lahde, z, laatat, kohde, laatu) {
  for (const [x, y] of laatat) {
    const kansio = join(kohde, String(z), String(x));
    mkdirSync(kansio, { recursive: true });
    writeFileSync(join(kansio, `${y}.jpg`), await laskeLaatta(sharp, lahde, z, x, y, laatu)); // eslint-disable-line no-await-in-loop
  }
  return laatat.length;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const argv = process.argv.slice(2);
  const lippu = (n) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : null; };
  const lahdeKansio = lippu('--lahde'); const kk = lippu('--kk'); const ulos = lippu('--ulos');
  if (!lahdeKansio || !/^(0[1-9]|1[0-2])$/.test(kk ?? '') || !ulos) {
    console.error('käyttö: node tools/tee-bmng-laatat.mjs --lahde <kansio> --kk 01…12 --ulos <kansio> [--lahteet A1,…|maailma] [--min 0] [--max 7] [--laatu 85]');
    process.exit(2);
  }
  const min = Number(lippu('--min') ?? 0); const max = Number(lippu('--max') ?? 7);
  const laatu = Number(lippu('--laatu') ?? 85);
  const valitut = (lippu('--lahteet') ?? ['maailma', ...OSAT].join(',')).split(',');
  const sharp = require('sharp');
  sharp.cache(false);
  const kohde = join(ulos, kk);
  const alku = Date.now();
  let yht = 0;
  if (valitut.includes('maailma')) {
    const f = join(lahdeKansio, `world.2004${kk}.3x21600x10800.jpg`);
    const m = { ...(await lue(sharp, f)), lon0: -180, lat0: 90 };
    m.pxAste = m.leveys / 360;
    for (let z = min; z <= Math.min(max, 3); z += 1) {
      const n = 2 ** z; const laatat = [];
      for (let x = 0; x < n; x += 1) for (let y = 0; y < n; y += 1) laatat.push([x, y]);
      yht += await kirjoitaTaso(sharp, m, z, laatat, kohde, laatu); // eslint-disable-line no-await-in-loop
    }
    mkdirSync(ulos, { recursive: true });
    await sharp(m.raw, { raw: { width: m.leveys, height: m.korkeus, channels: 3 } })
      .resize(4096, 2048, { kernel: 'lanczos3' }).jpeg({ quality: 90, mozjpeg: true })
      .toFile(join(ulos, `${kk}-4096.jpg`));
    console.log(`maailma: tasot ${min}–${Math.min(max, 3)} + ${kk}-4096.jpg (${Math.round((Date.now() - alku) / 1000)} s)`);
  }
  for (const osa of valitut.filter((v) => OSAT.includes(v))) {
    if (max < 4) break;
    const f = join(lahdeKansio, `world.2004${kk}.3x21600x21600.${osa}.jpg`);
    if (!existsSync(f)) throw new Error(`puuttuu ${f}`);
    const o = { ...(await lue(sharp, f)), ...osanAlue(osa) }; // eslint-disable-line no-await-in-loop
    o.pxAste = o.leveys / o.aste;
    let n = 0;
    for (let z = Math.max(min, 4); z <= max; z += 1) n += await kirjoitaTaso(sharp, o, z, osanLaatat(osa, z), kohde, laatu); // eslint-disable-line no-await-in-loop
    yht += n;
    console.log(`${osa}: ${n} laattaa (${Math.round((Date.now() - alku) / 1000)} s)`);
  }
  console.log(`valmis: ${yht} laattaa → ${kohde}`);
}
