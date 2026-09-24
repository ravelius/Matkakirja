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
import { maanRenkaatAsteina, rengasAsteiksi } from '../../js/maanaariviivat.js';
import { MAAILMANKARTTA } from '../../js/packs/maailmankartta.js';
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
const leikkaa = (a, b, vara) => a[0] <= b[2] + vara && a[2] >= b[0] - vara && a[1] <= b[3] + vara && a[3] >= b[1] - vara;

/*
 * SKEEMA 1.29 (Natiivisepän tilaus 24.9.2026): maan korostus ja valinta
 * kuten webissä. Web piirtää pelaajan maan ja vertailun laudan muodoista
 * (map.countryShapes, js/vertailu.js maapolygonitPallolle), joissa ei ole
 * Huippuvuoria, Ranskan merentakaisia alueita, Kanarioita jne. Muodot ovat
 * laudan tyyliteltyä geometriaa (esim. ISL siirretty, MYS puuttuu), joten
 * niitä ei viedä; sen sijaan admin-0-renkaista pidetään ne, joiden laatikko
 * osuu webin muodon laatikkoon (vara 1°). Muut → muutRenkaat. Jos muotoa ei
 * ole tai mikään rengas ei osu, kaikki renkaat pidetään.
 */
export const MUODON_VARA = 1;

export function rajaaWebinMuotoon(renkaat, muoto, asteetFn = asteet) {
  const muodot = (muoto?.renkaat ?? []).map((r) => rengasAsteiksi(r, asteetFn)).filter(Boolean);
  if (!muodot.length) return { renkaat, muut: [] };
  const alue = laatikko(muodot);
  const pidetaan = renkaat.filter((r) => leikkaa(laatikko([r]), alue, MUODON_VARA));
  if (!pidetaan.length) return { renkaat, muut: [] };
  return { renkaat: pidetaan, muut: renkaat.filter((r) => !pidetaan.includes(r)) };
}

export function maarajaRivit(polku) {
  const data = JSON.parse(readFileSync(polku, 'utf8'));
  const muodot = MAAILMANKARTTA.map.countryShapes;
  return Object.keys(data.maat).sort().map((iso) => {
    const kaikki = maanRenkaatAsteina(data, iso, asteet)
      .map((r) => harvenna(r).map(([lon, lat]) => [pyorista(lon), pyorista(lat)]))
      .filter((r) => r.length >= 4);
    const { renkaat, muut } = rajaaWebinMuotoon(kaikki, muodot[iso]);
    return {
      id: iso, iso2: ISO2[iso] ?? null, bbox: laatikko(renkaat), renkaat, muutRenkaat: muut, kokoBbox: laatikko(kaikki),
    };
  });
}
