#!/usr/bin/env node
// MAAMASKI MAITTAIN NATIIVILLE (Karttaseppä 26.9.2026, Natiivisepän löydös 157 "rantaporras"):
// maakunnan täyttö leikataan natiivissa rantaan rasteroimalla maan oma maski. Tämä antaa
// jokaiselle maakuntarajat-kokoelman maalle (138, ISO3) GSHHG full -maan (sama rantaviiva kuin
// polttojen ranta ja natiivin rantavektorit) sekä järvet reikinä:
//
//   node tools/tee-maamaski-maittain.mjs <gshhs-data/ne_10m_ocean.geojson> \
//     <ne_10m_admin_0_countries.geojson> <ne_10m_lakes.geojson> <ulos-kansio>
//     → <ulos>/<ISO3>.geojson + <ulos>/hakemisto.json
//
// MAA EI OLE RAJATTU VALTION RAJAAN vaan maan osien RAJAUSLAATIKOIHIN (+ MARGINAALI): täyttö
// on jo valmiiksi maan sisällä, ja maski kertoo vain, mikä on maata ja mikä merta. Siksi
// naapurin maata voi näkyä laatikon reunassa, eikä se haittaa. Rengas leikataan laatikkoon
// Sutherland–Hodgmanilla (laatikko on kupera; leikkausreunaan jää nollapinta-alaisia
// saumoja, jotka eivät näy rasterissa). Rasterointi: maa = kaikkien `maa`-monikulmioiden
// unioni, josta vähennetään `jarvet`.
//
// LÄHTEET: maarenkaat GSHHG 2.3.7 full (Wessel & Smith, LGPL 3+) tools/gshhs-meri.mjs:n
// tulosteesta (ensimmäinen piirre on koko maailman suorakaide, loput ovat maan renkaita);
// järvet Natural Earth 10m lakes (public domain), koska GSHHG-taso 2 ei ole tässä tulosteessa.
// Rajauslaatikot Natural Earth 10m admin-0 (public domain).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const TAMA = dirname(fileURLToPath(import.meta.url));
export const TOLERANSSI = 0.001; // Douglas–Peucker, ~110 m (Natiivisepän pyyntö 100–150 m)
export const MARGINAALI = 0.1; // astetta rajauslaatikon ympärille
const pyorista = (v) => Math.round(v * 1e5) / 1e5;

/* ------------------------------------------------------------ geometria */

/** Iteratiivinen Douglas–Peucker (Euraasian rengas on yli miljoona pistettä: ei rekursiota). */
export function yksinkertaista(p, tol = TOLERANSSI) {
  const n = p.length; if (n < 4) return p.slice();
  const pida = new Uint8Array(n); pida[0] = 1; pida[n - 1] = 1;
  const pino = [[0, n - 1]]; const t2 = tol * tol;
  while (pino.length) {
    const [a, b] = pino.pop();
    const [ax, ay] = p[a]; const [bx, by] = p[b]; const dx = bx - ax; const dy = by - ay; const l2 = dx * dx + dy * dy;
    let maks = -1; let mi = -1;
    for (let i = a + 1; i < b; i += 1) {
      const [x, y] = p[i];
      let d;
      if (l2 === 0) d = (x - ax) ** 2 + (y - ay) ** 2;
      else { const t = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / l2)); d = (x - ax - t * dx) ** 2 + (y - ay - t * dy) ** 2; }
      if (d > maks) { maks = d; mi = i; }
    }
    if (maks > t2) { pida[mi] = 1; pino.push([a, mi], [mi, b]); }
  }
  const ulos = []; for (let i = 0; i < n; i += 1) if (pida[i]) ulos.push(p[i]);
  return ulos;
}

/** Sutherland–Hodgman suorakaiteeseen [w, s, e, n]. */
export function leikkaaLaatikkoon(rengas, [w, s, e, n]) {
  const puoli = (r, sis, leik) => {
    const ulos = []; const m = r.length;
    for (let i = 0; i < m; i += 1) {
      const a = r[(i + m - 1) % m]; const b = r[i]; const aS = sis(a); const bS = sis(b);
      if (aS !== bS) ulos.push(leik(a, b));
      if (bS) ulos.push(b);
    }
    return ulos;
  };
  const x = (raja) => (a, b) => { const t = (raja - a[0]) / (b[0] - a[0]); return [raja, a[1] + t * (b[1] - a[1])]; };
  const y = (raja) => (a, b) => { const t = (raja - a[1]) / (b[1] - a[1]); return [a[0] + t * (b[0] - a[0]), raja]; };
  let r = rengas;
  r = puoli(r, (p) => p[0] >= w, x(w)); if (!r.length) return r;
  r = puoli(r, (p) => p[0] <= e, x(e)); if (!r.length) return r;
  r = puoli(r, (p) => p[1] >= s, y(s)); if (!r.length) return r;
  return puoli(r, (p) => p[1] <= n, y(n));
}

const laatikko = (r) => {
  let w = Infinity; let s = Infinity; let e = -Infinity; let n = -Infinity;
  for (const [x, y] of r) { if (x < w) w = x; if (x > e) e = x; if (y < s) s = y; if (y > n) n = y; }
  return [w, s, e, n];
};
const leikkaavat = (a, b) => a[0] <= b[2] && b[0] <= a[2] && a[1] <= b[3] && b[1] <= a[3];
const ala = (r) => { let s = 0; for (let i = 0, j = r.length - 1; i < r.length; j = i, i += 1) s += (r[j][0] - r[i][0]) * (r[j][1] + r[i][1]); return Math.abs(s) / 2; };

/** Päällekkäiset laatikot yhdeksi (iteratiivisesti, kunnes mikään ei leikkaa). */
export function yhdistaLaatikot(laatikot) {
  let l = laatikot.map((b) => b.slice());
  for (let muuttui = true; muuttui;) {
    muuttui = false;
    for (let i = 0; i < l.length && !muuttui; i += 1) for (let j = i + 1; j < l.length; j += 1) {
      if (!leikkaavat(l[i], l[j])) continue;
      l[i] = [Math.min(l[i][0], l[j][0]), Math.min(l[i][1], l[j][1]), Math.max(l[i][2], l[j][2]), Math.max(l[i][3], l[j][3])];
      l.splice(j, 1); muuttui = true; break;
    }
  }
  return l;
}

const ulkorenkaat = (g) => (g.type === 'Polygon' ? [g.coordinates[0]] : g.type === 'MultiPolygon' ? g.coordinates.map((p) => p[0]) : []);

/** Maan osien rajauslaatikot + marginaali, päällekkäiset yhdistettyinä. */
export function maanLaatikot(piirre, marginaali = MARGINAALI) {
  return yhdistaLaatikot(ulkorenkaat(piirre.geometry).map(laatikko)
    .map(([w, s, e, n]) => [Math.max(-180, w - marginaali), Math.max(-90, s - marginaali), Math.min(180, e + marginaali), Math.min(90, n + marginaali)]));
}

const neIso = (p) => [p.ADM0_A3, p.ISO_A3, p.ISO_A3_EH, p.SOV_A3].find((v) => v && v !== '-99');

/** Renkaat → leikattuina laatikoihin ja yksinkertaistettuina (laatikon ala kelpaa pienimmäksi). */
function leikatut(renkaat, laatikot) {
  const ulos = [];
  for (const r of renkaat) for (const b of laatikot) {
    if (!leikkaavat(r.laatikko, b)) continue;
    const l = leikkaaLaatikkoon(r.pisteet, b);
    if (l.length < 3) continue;
    const suljettu = [...l.map(([x, y]) => [pyorista(x), pyorista(y)])]; suljettu.push(suljettu[0]);
    if (suljettu.length >= 4 && ala(suljettu) > 1e-8) ulos.push([suljettu]);
  }
  return ulos;
}

export function teeMaskit({ meri, maat, jarvet, isot }) {
  const valmista = (pisteet) => { const p = yksinkertaista(pisteet); return { pisteet: p, laatikko: laatikko(p) }; };
  const maarenkaat = meri.features.slice(1).flatMap((f) => ulkorenkaat(f.geometry)).map(valmista).filter((r) => r.pisteet.length >= 4);
  const jarvirenkaat = jarvet.features.flatMap((f) => ulkorenkaat(f.geometry)).map(valmista).filter((r) => r.pisteet.length >= 4);
  const neMaat = new Map(); for (const f of maat.features) { const i = neIso(f.properties); if (i && !neMaat.has(i)) neMaat.set(i, f); }
  const tulos = {};
  for (const iso of isot) {
    const f = neMaat.get(iso);
    if (!f) { tulos[iso] = null; continue; }
    const laatikot = maanLaatikot(f);
    tulos[iso] = {
      type: 'FeatureCollection', iso, laatikot,
      features: [
        { type: 'Feature', properties: { iso, osa: 'maa' }, geometry: { type: 'MultiPolygon', coordinates: leikatut(maarenkaat, laatikot) } },
        { type: 'Feature', properties: { iso, osa: 'jarvet' }, geometry: { type: 'MultiPolygon', coordinates: leikatut(jarvirenkaat, laatikot) } },
      ],
    };
  }
  return tulos;
}

if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
  const [,, meriP, maatP, jarvetP, ulos] = process.argv;
  if (!ulos) { console.error('Käyttö: node tools/tee-maamaski-maittain.mjs <ne_10m_ocean.geojson (GSHHG)> <ne_10m_admin_0_countries.geojson> <ne_10m_lakes.geojson> <ulos>'); process.exit(2); }
  const lue = (p) => JSON.parse(readFileSync(p, 'utf8'));
  const kokoelma = JSON.parse(gunzipSync(readFileSync(join(TAMA, 'vienti', 'maakuntarajat.json.gz'))).toString('utf8'));
  const isot = Object.values(kokoelma.maat).map((m) => m.iso3).sort();
  const maskit = teeMaskit({ meri: lue(meriP), maat: lue(maatP), jarvet: lue(jarvetP), isot });
  mkdirSync(ulos, { recursive: true });
  const hakemisto = {
    versio: 1, toleranssi: TOLERANSSI, marginaali: MARGINAALI,
    lahteet: [
      { id: 'gshhg', nimi: 'GSHHG 2.3.7 full, maa (taso 1)', lisenssi: 'LGPL 3+', url: 'https://www.soest.hawaii.edu/pwessel/gshhg/' },
      { id: 'natural-earth', nimi: 'Natural Earth 10m lakes ja admin-0 (rajauslaatikot)', lisenssi: 'public domain', url: 'https://www.naturalearthdata.com/' },
    ],
    rasterointi: 'maa = maa-monikulmioiden unioni (nonzero) miinus jarvet; laatikot = maan osien rajauslaatikot + marginaali',
    maat: {},
  };
  const puuttuvat = [];
  for (const [iso, fc] of Object.entries(maskit)) {
    if (!fc) { puuttuvat.push(iso); continue; }
    const teksti = JSON.stringify(fc);
    writeFileSync(join(ulos, `${iso}.geojson`), teksti);
    const [maa, jarvi] = fc.features.map((f) => f.geometry.coordinates);
    hakemisto.maat[iso] = { tavuja: Buffer.byteLength(teksti), maa: maa.length, jarvet: jarvi.length, pisteita: maa.reduce((s, p) => s + p[0].length, 0), laatikot: fc.laatikot };
  }
  writeFileSync(join(ulos, 'hakemisto.json'), JSON.stringify(hakemisto));
  const yht = Object.values(hakemisto.maat).reduce((s, m) => s + m.tavuja, 0);
  console.log(`${Object.keys(hakemisto.maat).length} maata, ${(yht / 1e6).toFixed(1)} Mt, puuttuu: ${puuttuvat.join(' ') || '-'}`);
}
