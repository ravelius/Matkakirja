/*
 * MITTA: ONKO POLTETTU MUSTE LUKITUN ANKKURIN KOHDALLA — LAATASTA
 * LUETTUNA.
 *
 *   node tools/mittaa-nostomuste.mjs <nostotasoajon kansio> [taso]
 *
 * Erien 1–2 mitat todistivat ketjun datasta: elävä ankkuri = taulu,
 * poltettava merkki = taulu. Tämä lukee VIIMEISEN lenkin eli oikeat
 * webp-laatat: jokaiselle lukitulle, poltettavalle Ranskan nostolle
 * lasketaan arkin pikseli (luettelon `arkki` ja tason
 * `pikseliaPerYksikko`), avataan se laatta, johon piste osuu, ja
 * etsitään lähin pikseli, jonka alfa ≥ 120 — eli lähin mustepikseli.
 *
 * Mitta on laatan pikseleissä, ei ruudun: z6:lla yksi lautayksikkö on
 * 3,6 px ja z7:llä 7,2 px. Saapumisnäkymässä pelin oma mittakaava on
 * ~2,1 px/yksikkö, joten laatan pikseleissä mitattu ero on aina
 * PESSIMISTISEMPI kuin se, minkä pelaaja näkee.
 *
 * Ajo vaatii `sharp`:n (npm install) ja ajetaan repon juuresta.
 */
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';
import { keraaNostot } from './fokuskartta/nostot.mjs';
import { NOSTOANKKURIT_FRA } from '../js/packs/nostoankkurit-fra.js';

const KANSIO = process.argv[2];
const luettelo = JSON.parse(readFileSync(join(KANSIO, 'pyramidi.json'), 'utf8'));
const { merkit } = keraaNostot(MAAILMANKARTTA);
const lukitut = new Set(Object.keys(NOSTOANKKURIT_FRA ?? {}));

const arkki = luettelo.arkki;
const L = luettelo.laatta;

function arkkiPiste(z, x, y) {
  const t = luettelo.tasot.find((tt) => tt.z === z);
  return { px: (x - arkki.x) * t.pikseliaPerYksikko, py: (y - arkki.y) * t.pikseliaPerYksikko };
}

const z = Number(process.argv[3] ?? 6);
const kohteet = merkit.filter((m) => m.poltettava && lukitut.has(`nosto:${m.tunnus}`));
console.log(`lukittuja ankkureita ${lukitut.size}, poltettavia lukittuja merkkejä ${kohteet.length}, taso z${z}`);

const tulokset = [];
for (const m of kohteet) {
  const { px, py } = arkkiPiste(z, m.x, m.y);
  const sarake = Math.floor(px / L);
  const rivi = Math.floor(py / L);
  const polku = join(KANSIO, 'nostot', `z${z}`, String(sarake), `${rivi}.webp`);
  if (!existsSync(polku)) { tulokset.push({ m, tila: 'EI LAATTAA', polku }); continue; }
  // eslint-disable-next-line no-await-in-loop
  const { data, info } = await sharp(polku).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const kx = px - sarake * L;
  const ky = py - rivi * L;
  let paras = Infinity;
  const R = 8;
  for (let dy = -R; dy <= R; dy += 1) {
    for (let dx = -R; dx <= R; dx += 1) {
      const x = Math.round(kx) + dx;
      const y = Math.round(ky) + dy;
      if (x < 0 || y < 0 || x >= info.width || y >= info.height) continue;
      const a = data[(y * info.width + x) * info.channels + 3];
      if (a < 120) continue;
      const d = Math.hypot(x + 0.5 - kx, y + 0.5 - ky);
      if (d < paras) paras = d;
    }
  }
  tulokset.push({ m, tila: paras === Infinity ? 'EI MUSTETTA 8px' : 'ok', ero: paras, laatta: `z${z}/${sarake}/${rivi}` });
}

const ok = tulokset.filter((t) => t.tila === 'ok');
const erot = ok.map((t) => t.ero).sort((a, b) => a - b);
console.log(`muste löytyi ${ok.length}/${tulokset.length}`);
if (erot.length) {
  console.log(`  suurin ero ${erot[erot.length - 1].toFixed(2)} px · mediaani ${erot[Math.floor(erot.length / 2)].toFixed(2)} px`);
}
for (const t of tulokset) {
  console.log(`  ${t.tila.padEnd(14)} ${t.ero !== undefined ? `${t.ero.toFixed(2)} px` : ''} ${(t.m.nimi ?? t.m.id ?? '').slice(0, 28)} ${t.laatta ?? t.polku ?? ''}`);
}
