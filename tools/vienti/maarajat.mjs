/*
 * MAARAJAT PALLOLLE (Siirtoseppä 23.9.2026, skeema 1.9, Natiivisepän tarve).
 *
 * Natiivin sumu (PaljastaMaa) ja Linssisepän maatila tarvitsevat maan
 * rajan asteina. Lähde on assets/data/maapolygonit.json (Natural Earth
 * 10m admin-0, sama geometria kuin laattoihin poltettu rajaviiva), ja
 * purku tehdään pelin omilla funktioilla (js/maanaariviivat.js
 * maanRenkaatAsteina: deltapurku, Millerin käänteiskaava, sauman purku).
 * Harvennus Douglas–Peucker 0,05° ja pyöristys 1e-3°. Aineisto ei
 * erottele saaria ja reikiä: renkaat täytetään parillisuussäännöllä
 * (even-odd), kuten webissä.
 */
import { readFileSync } from 'node:fs';
import { maanRenkaatAsteina } from '../../js/maanaariviivat.js';
import { laudaltaAsteiksi } from '../../js/fokusmitat.js';
import { ISO2 } from './iso2.mjs';

export const MAARAJOJEN_TOLERANSSI = 0.05;
const asteet = ({ x, y }) => laudaltaAsteiksi('maailmankartta', x, y);

function etaisyys([px, py], [ax, ay], [bx, by]) {
  const dx = bx - ax; const dy = by - ay;
  const l = dx * dx + dy * dy;
  const t = l ? Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / l)) : 0;
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

/** Douglas–Peucker ilman rekursiota (suljettu rengas: ensimmäinen ja viimeinen säilyvät). */
export function harvenna(pisteet, tol = MAARAJOJEN_TOLERANSSI) {
  if (pisteet.length <= 4) return pisteet;
  const pidetaan = new Uint8Array(pisteet.length);
  pidetaan[0] = 1; pidetaan[pisteet.length - 1] = 1;
  const pino = [[0, pisteet.length - 1]];
  while (pino.length) {
    const [a, b] = pino.pop();
    let max = -1; let i = -1;
    for (let k = a + 1; k < b; k++) {
      const d = etaisyys(pisteet[k], pisteet[a], pisteet[b]);
      if (d > max) { max = d; i = k; }
    }
    if (max > tol) { pidetaan[i] = 1; pino.push([a, i], [i, b]); }
  }
  return pisteet.filter((_, k) => pidetaan[k]);
}

const pyorista = (v) => Math.round(v * 1000) / 1000;

const laatikko = (renkaat) => {
  let [w, s, e, n] = [Infinity, Infinity, -Infinity, -Infinity];
  for (const r of renkaat) for (const [lon, lat] of r) {
    w = Math.min(w, lon); e = Math.max(e, lon); s = Math.min(s, lat); n = Math.max(n, lat);
  }
  return [w, s, e, n];
};

export function maarajaRivit(polku) {
  const data = JSON.parse(readFileSync(polku, 'utf8'));
  return Object.keys(data.maat).sort().map((iso) => {
    const kaikki = maanRenkaatAsteina(data, iso, asteet)
      .map((r) => harvenna(r).map(([lon, lat]) => [pyorista(lon), pyorista(lat)]))
      .filter((r) => r.length >= 4);
    // Skeema 1.34 (Fable 24.9.2026): web piirtää pallon maat nyt Natural Earth 10m
    // -aineistosta (#3078, Huippuvuoret Norjalle), joten rajausta ei enää tehdä:
    // renkaat = kaikki admin-0-renkaat. muutRenkaat (tyhjä) ja kokoBbox säilyvät.
    const renkaat = kaikki;
    return {
      id: iso, iso2: ISO2[iso] ?? null, bbox: laatikko(renkaat), renkaat, muutRenkaat: [], kokoBbox: laatikko(kaikki),
    };
  });
}
