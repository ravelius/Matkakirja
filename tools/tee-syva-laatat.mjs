#!/usr/bin/env node
// SYVÄN SARJAN LAATTALISTA (Karttaseppä 26.9.2026, Fablen tilaus: Z10 pohjalle 26
// "kaupungit ±1° + fokusmaat", raportti docs/raportit/karttaseppa-z10-kattavuus-20260926.md):
//
//   node tools/tee-syva-laatat.mjs --ne <ne_10m_admin_0_countries.geojson> \
//     --kaupungit <sisältöpaketin kokoelmat/kaupungit.json> [--aste 1] \
//     [--maat AUT,BEL,…] --ulos <syva-laatat.json>
//
// → { z: 10, laatat: [[sarake, rivi], …], lahde } generoi-laattapyramidi.mjs:n
// `--syva-laatat`-lipulle. Ruudukko on laudan Miller-geometria (lon0 −175, pohjoinen 76,
// arkki y −1046,31, z10-laatta 12000/1350 yksikköä) — todennettu generaattorin omaa
// työlistaa vastaan (Ateena ±1°: 80/80 samaa laattaa). Maa = laatat, joihin maan
// Natural Earth -polygoni osuu (4 näyteriviä laattaa kohti, skannausviiva).
import { readFileSync, writeFileSync } from 'node:fs';

const RAD = Math.PI / 180; const SK = 12000 / (2 * Math.PI);
const miller = (f) => -1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * f * RAD));
const YP = miller(76); const Y0 = -1046.3149255312064;
export const T10 = 12000 / 1350;
export const lautaX = (lon) => (((lon + 175) / 360) * 12000 + 12000) % 12000;
export const lautaY = (lat) => SK * (miller(lat) - YP);

export function kaupunkiLaatat(kaupungit, aste = 1, joukko = new Set()) {
  for (const { lat, lon } of kaupungit) {
    const x0 = Math.floor(lautaX(lon - aste) / T10); const x1 = Math.floor(lautaX(lon + aste) / T10);
    const y0 = Math.floor((lautaY(Math.min(lat + aste, 85)) - Y0) / T10); const y1 = Math.floor((lautaY(Math.max(lat - aste, -85)) - Y0) / T10);
    for (let x = x0; x !== x1 + 1; x = (x + 1) % 1350) for (let y = y0; y <= y1; y += 1) joukko.add(`${x}:${y}`);
  }
  return joukko;
}

export function maaLaatat(piirteet, joukko = new Set(), naytteita = 4) {
  for (const f of piirteet) {
    const polyt = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
    for (const p of polyt) {
      const renkaat = p.map((r) => r.map(([lo, la]) => [lautaX(lo), lautaY(la)]));
      let ymin = Infinity; let ymax = -Infinity;
      for (const [, y] of renkaat[0]) { ymin = Math.min(ymin, y); ymax = Math.max(ymax, y); }
      for (let r = Math.floor((ymin - Y0) / T10); r <= Math.floor((ymax - Y0) / T10); r += 1) {
        for (let k = 0; k < naytteita; k += 1) {
          const y = Y0 + (r + (k + 0.5) / naytteita) * T10; const xs = [];
          for (const rengas of renkaat) {
            for (let i = 0, j = rengas.length - 1; i < rengas.length; j = i, i += 1) {
              const [x1, y1] = rengas[j]; const [x2, y2] = rengas[i];
              if (Math.abs(x2 - x1) > 6000) continue; // laudan saumaa ei ylitetä janalla
              if ((y1 > y) !== (y2 > y)) xs.push(x1 + ((y - y1) / (y2 - y1)) * (x2 - x1));
            }
          }
          xs.sort((a, b) => a - b);
          for (let q = 0; q + 1 < xs.length; q += 2) {
            for (let c = Math.floor(xs[q] / T10); c <= Math.floor(xs[q + 1] / T10); c += 1) joukko.add(`${c}:${r}`);
          }
        }
      }
    }
  }
  return joukko;
}

export const FOKUSMAAT = 'AUT BEL CZE DEU DNK ESP FRA GRC HUN ITA NLD POL PRT SWE'.split(' ');

if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
  const arg = (n, o) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : o; };
  const ne = arg('ne'); const kaupP = arg('kaupungit'); const ulos = arg('ulos');
  if (!ne || !kaupP || !ulos) { console.error('Käyttö: node tools/tee-syva-laatat.mjs --ne <admin0.geojson> --kaupungit <kaupungit.json> [--aste 1] [--maat A,B] --ulos <json>'); process.exit(2); }
  const aste = Number(arg('aste', 1)); const maat = (arg('maat', FOKUSMAAT.join(','))).split(',').filter(Boolean);
  const kaupungit = JSON.parse(readFileSync(kaupP, 'utf8')).alkiot.filter((c) => Number.isFinite(c.lat) && Number.isFinite(c.lon));
  const iso = (p) => [p.ADM0_A3, p.ISO_A3].find((v) => v && v !== '-99');
  const piirteet = JSON.parse(readFileSync(ne, 'utf8')).features.filter((f) => maat.includes(iso(f.properties)));
  const k = kaupunkiLaatat(kaupungit, aste); const m = maaLaatat(piirteet);
  const kaikki = new Set([...k, ...m]);
  const laatat = [...kaikki].map((s) => s.split(':').map(Number)).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const z9 = new Set(laatat.map(([a, b]) => `${a >> 1}:${b >> 1}`));
  writeFileSync(ulos, `${JSON.stringify({ z: 10, lahde: `kaupungit ±${aste}° (${kaupungit.length}) + maat ${maat.join(' ')}`, laatat })}\n`);
  console.log(`z10 ${laatat.length} (kaupungit ${k.size}, maat ${m.size}), z9 ${z9.size}, yhteensä ${laatat.length + z9.size}`);
}
