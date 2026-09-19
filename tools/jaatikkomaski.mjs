/*
 * JÄÄTIKKÖMASKI — MISSÄ POHJOISEN MAA ON OIKEASTI JÄÄTÄ.
 *
 * Fablen päätös 19.9.2026 klo 16.55 Suomen aikaa (suunnitelma
 * docs/raportit/viesti-fable-maajaa-suunnitelma-20260919.md):
 * tools/reliefivarit.mjs sekoitti KAIKEN yli 70°:n maan 88-prosenttisesti
 * jään väriin, ja Astronautin kameran navalle jäi vaalea rengas Siperian,
 * Taimyrin ja Kanadan tundran kohdalle. Tundra ei ole jäätikköä. Tämä
 * moduuli kertoo, missä jäätikkö oikeasti on: Natural Earthin 10m
 * "Glaciated areas" -polygonit (public domain,
 * https://www.naturalearthdata.com/) rasteroituna samaan 1′-hilaan kuin
 * tools/tee-pallotopografia-koko.mjs:n korkeusruudukko.
 *
 * VAIN POHJOINEN. Maski lasketaan leveysasteesta LAT_ALKU pohjoiseen;
 * etelässä reliefivarit.mjs käyttää yhä leveysastesääntöä, koska
 * Etelämanner on käytännössä kokonaan jäätä.
 *
 * REUNA PEHMENNETÄÄN. Polygonin raja on 1:10M-aineistossa 2–5 km:n
 * tarkkuudella, ja terävä raja näkyisi kuvassa porrasviivana. Maski
 * sumennetaan erotuvalla laatikkosuodattimella (säde PEHMENNYS
 * ruutua, eli 5′ leveä ikkuna) ja tallennetaan 0…255-tavuina.
 *
 * Zip- ja shp-lukija on sama kuin tools/hae-vedet.mjs:ssä (siellä ne
 * eivät ole vietyjä funktioita, koska tiedosto on ajettava skripti).
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { inflateRawSync } from 'node:zlib';

/** Maskin eteläraja asteina: jäätikköpaino kysytään vain tästä pohjoiseen. */
export const LAT_ALKU = 45;
/** Reunan pehmennys ruutuina (1′-hilassa 2 ruutua = ±2′). */
export const PEHMENNYS = 2;
export const AINEISTO = 'ne_10m_glaciated_areas';
const URL_POHJA = 'https://naciscdn.org/naturalearth/10m/physical/';
const VALIMUISTI = process.env.JAATIKKO_VALIMUISTI || join(tmpdir(), 'matkakirja-jaatikot');

function lueZip(buf) {
  let eocd = -1;
  for (let i = buf.length - 22; i >= 0 && i > buf.length - 70000; i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) { eocd = i; break; }
  }
  if (eocd < 0) throw new Error('zip: keskushakemiston loppua ei löytynyt');
  const maara = buf.readUInt16LE(eocd + 10);
  let off = buf.readUInt32LE(eocd + 16);
  const tiedostot = new Map();
  for (let k = 0; k < maara; k++) {
    const menetelma = buf.readUInt16LE(off + 10);
    const pakattu = buf.readUInt32LE(off + 20);
    const nimiPit = buf.readUInt16LE(off + 28);
    const lisaPit = buf.readUInt16LE(off + 30);
    const kommPit = buf.readUInt16LE(off + 32);
    const paikOff = buf.readUInt32LE(off + 42);
    const nimi = buf.toString('utf8', off + 46, off + 46 + nimiPit);
    const alku = paikOff + 30 + buf.readUInt16LE(paikOff + 26) + buf.readUInt16LE(paikOff + 28);
    const raaka = buf.subarray(alku, alku + pakattu);
    tiedostot.set(nimi, menetelma === 0 ? Buffer.from(raaka) : inflateRawSync(raaka));
    off += 46 + nimiPit + lisaPit + kommPit;
  }
  return tiedostot;
}

/** Shapefilen alueet: jokainen muoto on lista renkaita [[lon, lat], …]. */
function lueAlueet(buf) {
  const muodot = [];
  let p = 100;
  while (p + 8 <= buf.length) {
    const pituus = buf.readInt32BE(p + 4) * 2;
    const c = p + 8;
    if (buf.readInt32LE(c) === 5) {
      const osia = buf.readInt32LE(c + 36);
      const pisteita = buf.readInt32LE(c + 40);
      const osaOff = c + 44;
      const pisteOff = osaOff + osia * 4;
      const renkaat = [];
      for (let i = 0; i < osia; i++) {
        const a = buf.readInt32LE(osaOff + i * 4);
        const b = i + 1 < osia ? buf.readInt32LE(osaOff + (i + 1) * 4) : pisteita;
        const rengas = [];
        for (let j = a; j < b; j++) {
          rengas.push([buf.readDoubleLE(pisteOff + j * 16), buf.readDoubleLE(pisteOff + j * 16 + 8)]);
        }
        renkaat.push(rengas);
      }
      muodot.push(renkaat);
    }
    p = c + pituus;
  }
  return muodot;
}

/**
 * Rasteroi alueet hilaan parillisuussäännöllä (reiät ja saaret oikein).
 * Solu (x, y) on PISTE lon = −180 + x·ruutu, lat = lat0 + y·ruutu, sama
 * sopimus kuin korkeusruudukossa. Puhdas funktio (tests/jaatikkomaski.test.mjs).
 *
 * @returns {Uint8Array} leveys × rivit, 255 = sisällä, 0 = ulkona
 */
export function rasteroi(muodot, {
  ruutu, lat0, rivit, leveys,
}) {
  const ulos = new Uint8Array(leveys * rivit);
  const leikkaukset = [];
  for (const renkaat of muodot) {
    let ymin = Infinity; let ymax = -Infinity;
    for (const r of renkaat) for (const [, y] of r) { if (y < ymin) ymin = y; if (y > ymax) ymax = y; }
    const r0 = Math.max(0, Math.ceil((ymin - lat0) / ruutu));
    const r1 = Math.min(rivit - 1, Math.floor((ymax - lat0) / ruutu));
    for (let rv = r0; rv <= r1; rv++) {
      const lat = lat0 + rv * ruutu;
      leikkaukset.length = 0;
      for (const r of renkaat) {
        for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
          const [xa, ya] = r[j]; const [xb, yb] = r[i];
          // Puoliavoin väli: kärkipiste ei tuota kahta leikkausta.
          if ((ya <= lat) !== (yb <= lat)) leikkaukset.push(xa + ((lat - ya) / (yb - ya)) * (xb - xa));
        }
      }
      leikkaukset.sort((a, b) => a - b);
      const rivi = rv * leveys;
      for (let k = 0; k + 1 < leikkaukset.length; k += 2) {
        const x0 = Math.max(0, Math.ceil((leikkaukset[k] + 180) / ruutu));
        const x1 = Math.min(leveys - 1, Math.floor((leikkaukset[k + 1] + 180) / ruutu));
        if (x1 >= x0) ulos.fill(255, rivi + x0, rivi + x1 + 1);
      }
    }
  }
  return ulos;
}

/** Erotuva laatikkosumennus (vaaka kiertäen sauman yli, pysty reunaan asti). */
export function pehmenna(maski, leveys, rivit, sade = PEHMENNYS) {
  if (sade <= 0) return maski;
  const valiaika = new Float32Array(leveys * rivit);
  const leveysIkkuna = 2 * sade + 1;
  for (let y = 0; y < rivit; y++) {
    const o = y * leveys;
    let summa = 0;
    for (let k = -sade; k <= sade; k++) summa += maski[o + ((k + leveys) % leveys)];
    for (let x = 0; x < leveys; x++) {
      valiaika[o + x] = summa / leveysIkkuna;
      summa += maski[o + ((x + sade + 1) % leveys)] - maski[o + ((x - sade + leveys) % leveys)];
    }
  }
  const ulos = new Uint8Array(leveys * rivit);
  for (let x = 0; x < leveys; x++) {
    for (let y = 0; y < rivit; y++) {
      let summa = 0; let n = 0;
      for (let k = Math.max(0, y - sade); k <= Math.min(rivit - 1, y + sade); k++) {
        summa += valiaika[k * leveys + x]; n++;
      }
      ulos[y * leveys + x] = Math.round(summa / n);
    }
  }
  return ulos;
}

/**
 * Lataa aineiston (välimuisti tmpdirissä) ja palauttaa maskin koko
 * 1′-hilan pohjoisosalle. `rivi(gy)` antaa hilarivin 0…255-tavut tai
 * nullin, jos rivi on LAT_ALKUa etelämpänä.
 */
export async function lataaJaatikkomaski({ ruutu, leveys, korkeus }) {
  mkdirSync(VALIMUISTI, { recursive: true });
  const zipPolku = join(VALIMUISTI, `${AINEISTO}.zip`);
  if (!existsSync(zipPolku)) {
    const v = await fetch(`${URL_POHJA}${AINEISTO}.zip`);
    if (!v.ok) throw new Error(`${AINEISTO}: ${v.status}`);
    writeFileSync(zipPolku, Buffer.from(await v.arrayBuffer()));
  }
  const muodot = lueAlueet(lueZip(readFileSync(zipPolku)).get(`${AINEISTO}.shp`));
  const alkuRivi = Math.round((LAT_ALKU + 90) / ruutu);
  const rivit = korkeus - alkuRivi;
  const lat0 = -90 + alkuRivi * ruutu;
  const maski = pehmenna(rasteroi(muodot, { ruutu, lat0, rivit, leveys }), leveys, rivit);
  let sisalla = 0;
  for (let i = 0; i < maski.length; i++) if (maski[i] > 127) sisalla++;
  return {
    muotoja: muodot.length,
    osuus: sisalla / maski.length,
    rivi(gy) {
      const r = gy - alkuRivi;
      if (r < 0 || r >= rivit) return null;
      return maski.subarray(r * leveys, (r + 1) * leveys);
    },
  };
}
