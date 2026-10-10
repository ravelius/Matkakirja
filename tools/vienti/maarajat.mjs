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
/** Euroopan minivaltiot (sama joukko kuin tools/generoi-maapolygonit.mjs MINIVALTIOT). */
// Malediivit, Marshallinsaaret, Nauru ja Tuvalu (kaikki maat 10.10.2026): atollit
// ovat minivaltioiden kokoluokkaa.
const MINIVALTIOT = new Set(['AND', 'LIE', 'MCO', 'SMR', 'VAT', 'MDV', 'MHL', 'NRU', 'TUV']);
const laajuus = (r) => Math.max(Math.max(...r.map(([x]) => x)) - Math.min(...r.map(([x]) => x)),
  Math.max(...r.map(([, y]) => y)) - Math.min(...r.map(([, y]) => y)));
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

/*
 * SISÄKKÄISET RENKAAT POIS (A5, Natiiviseppä 10.10.2026): natiivi täyttää
 * renkaat even-odd-säännöllä (MaaOsuma, maamaski), joten mantereen
 * harvennetun rannikon sisään jäävä pikkusaari olisi reikä maassa. Rengas
 * pudotetaan, jos vähintään puolet sen näytepisteistä (kärjet, sivujen
 * keskipisteet ja keskipiste) on saman maan suuremman renkaan sisällä.
 * Webin tummennus täyttää nonzero-säännöllä, joten maapolygonit.json pitää
 * renkaat. Mitattu: sisäkkäisiä 79 → 32 (loput osittaisia, alle puolet).
 */
const ala = (r) => { let a = 0; for (let i = 0; i < r.length - 1; i++) a += r[i][0] * r[i + 1][1] - r[i + 1][0] * r[i][1]; return Math.abs(a / 2); };
function sisalla([x, y], r) {
  let s = false;
  for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
    const [xi, yi] = r[i]; const [xj, yj] = r[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) s = !s;
  }
  return s;
}
export function sisakkaisetPois(renkaat) {
  const tiedot = renkaat.map((r) => ({ a: ala(r), b: laatikko([r]) }));
  return renkaat.filter((r, i) => {
    const { a, b } = tiedot[i];
    const n = r.length - 1;
    const naytteet = [...r.slice(0, n), ...r.slice(0, n).map((p, k) => [(p[0] + r[k + 1][0]) / 2, (p[1] + r[k + 1][1]) / 2]),
      [r.slice(0, n).reduce((s, p) => s + p[0], 0) / n, r.slice(0, n).reduce((s, p) => s + p[1], 0) / n]];
    return !tiedot.some((t, j) => j !== i && t.a > a
      && t.b[0] <= b[2] && t.b[2] >= b[0] && t.b[1] <= b[3] && t.b[3] >= b[1]
      && naytteet.filter((p) => sisalla(p, renkaat[j])).length * 2 >= naytteet.length);
  });
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
    // Minivaltiot (10.10.2026): 0,05°:n harvennus litistäisi Vatikaanin ja
    // Monacon alle neljän pisteen ja ne putoaisivat; niille toleranssi
    // kymmenesosa renkaan koosta. Pienet saaret (A5, PT 10.10.2026): sama
    // vika kaikissa maissa, joten muille neljäsosa renkaan koosta (vaikuttaa
    // vain alle 0,2°:n renkaisiin; maarajat 1,076 → 1,158 Mt).
    const tol = (r) => Math.min(MAARAJOJEN_TOLERANSSI, laajuus(r) / (MINIVALTIOT.has(iso) ? 10 : 4));
    const kaikki = sisakkaisetPois(maanRenkaatAsteina(data, iso, asteet)
      .map((r) => harvenna(r, tol(r)).map(([lon, lat]) => [pyorista(lon), pyorista(lat)]))
      .filter((r) => r.length >= 4));
    // Skeema 1.34 (Fable 24.9.2026): web piirtää pallon maat nyt Natural Earth 10m
    // -aineistosta (#3078, Huippuvuoret Norjalle), joten rajausta ei enää tehdä:
    // renkaat = kaikki admin-0-renkaat. muutRenkaat (tyhjä) ja kokoBbox säilyvät.
    const renkaat = kaikki;
    return {
      id: iso, iso2: ISO2[iso] ?? null, bbox: laatikko(renkaat), renkaat, muutRenkaat: [], kokoBbox: laatikko(kaikki),
    };
  });
}
