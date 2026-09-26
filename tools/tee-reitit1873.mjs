#!/usr/bin/env node
// VUODEN 1873 LAIVAREITIT JA RAUTATIET (Karttaseppä 26.9.2026, omistajan ELÄVÄ KARTTA,
// docs/raportit/elava-kartta-suunnitelma-20260926.md kohta 5: laiva lipuu 1873-reittiä,
// junan savu nousee 1873-radalta). Siirtosepän skeema 1.46 lukee tuloksen:
//
//   node tools/tee-reitit1873.mjs <ne_10m_admin_0_countries.geojson> [--ohm <välimuisti.json>]
//     → tools/vienti/reitit1873.json.gz  { lahteet: [...], reitit: [...] }
//
// RAUTATIET: OpenHistoricalMap (CC0), Overpass-kysely: radat (railway=rail ja myöhemmin
// hylätyt), joiden start_date ≤ 1873 ja end_date puuttuu tai ≥ 1873. OHM:n kattavuus
// vaihtelee: Brittein saaret, Benelux, Saksa, Italia, Skandinavia ja Venäjä hyvin; Ranskan
// pääradoilla on usein nykyaikainen start_date (Pariisin säteet puuttuvat) — tunnettu aukko,
// täydennys myöhemmin. Erä 2 (26.9.2026): kyselyruutu etelään 27°N, jotta Egyptin radat 1854–69
// tulevat mukaan; OHM:stä kokonaan puuttuvat 1873 toiminnassa olleet radat (Pireus–Ateena 1869)
// TAYDENNYKSET-taulukosta asemien koordinaateista (julkiset tosiasiat). Sivuraiteet (service=*) pois. Reitti = OHM:n `name` (tai 5°-ruutu),
// viivat harvennettu 0,005° ja pyöristetty 1e-3°.
//
// LAIVAT: aikakauden höyrylaivalinjat satamajärjestyksinä (julkiset tosiasiat, lähteet
// kentässä), reititetty merta pitkin A*:llä 0,05°:n ruudukossa (maa = NE admin-0; maan
// yli pääsee kalliisti, jotta kapeat salmet ja Suezin kanava toimivat), harvennus 0,05°.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { maamaski } from './maarajat-maamaa.mjs';
import { harvenna } from './vienti/maarajat.mjs';

const TAMA = dirname(fileURLToPath(import.meta.url));
export const ULOS = join(TAMA, 'vienti', 'reitit1873.json.gz');
const OHM_LISENSSI = 'CC0 1.0 (OpenHistoricalMap)';
const OMA_LISENSSI = 'CC0 1.0 (Karttasepän digitointi julkisista tosiasioista)';
const pyorista = (v) => Math.round(v * 1000) / 1000;

export const LAHTEET = [
  { id: 'ohm', nimi: 'OpenHistoricalMap-rautatiet (start_date ≤ 1873)', url: 'https://www.openhistoricalmap.org/', lisenssi: OHM_LISENSSI },
  { id: 'linjat-1873', nimi: 'Höyrylaivalinjojen satamajärjestykset 1873 (Messageries Maritimes, Österreichischer Lloyd, P&O, ROPiT)', url: 'https://en.wikipedia.org/wiki/Messageries_Maritimes', lisenssi: OMA_LISENSSI },
];

const S = {
  marseille: [5.36, 43.30], malta: [14.51, 35.90], aleksandria: [29.88, 31.20], portsaid: [32.30, 31.27],
  beirut: [35.50, 33.90], smyrna: [27.13, 38.43], konstantinopoli: [28.98, 41.01], trieste: [13.76, 45.65],
  korfu: [19.92, 39.62], patras: [21.73, 38.25], pireus: [23.64, 37.94], syros: [24.94, 37.44],
  southampton: [-1.40, 50.89], gibraltar: [-5.35, 36.14], brindisi: [17.95, 40.64], odessa: [30.73, 46.49],
};
/* Bosporin läpivienti Mustallemerelle. */
const BOSPORI = [[29.02, 41.06], [29.06, 41.12], [29.08, 41.18], [29.12, 41.23], [29.25, 41.35]];
/* Salmien ja kanavan läpivientipisteet (maan yli kulkisi muuten oikotie). */
const DARDANELLIT = [[26.20, 40.03], [26.68, 40.40], [27.00, 40.55]];
/* Peloponnesoksen ympäri: Korintin kanavaa ei vielä ollut (avattu 1893). */
const MATAPAN = [[21.3, 37.2], [22.48, 36.25], [23.3, 36.35]];
export const LINJAT = [
  {
    id: 'laiva-messageries-levantti', nimi: 'Messageries Maritimes: Marseille – Levantti', vuosi: 1873,
    lahde: 'https://en.wikipedia.org/wiki/Messageries_Maritimes; https://www.um.edu.mt/library/oar/bitstream/123456789/72379/1/JMPS36(2)A2.pdf',
    reitti: [S.marseille, S.malta, S.aleksandria, S.portsaid, S.beirut, S.smyrna, ...DARDANELLIT, S.konstantinopoli],
  },
  {
    id: 'laiva-lloyd-levantti', nimi: 'Österreichischer Lloyd: Trieste – Konstantinopoli', vuosi: 1873,
    lahde: 'https://en.wikipedia.org/wiki/%C3%96sterreichischer_Lloyd',
    reitti: [S.trieste, S.korfu, S.patras, ...MATAPAN, S.pireus, S.syros, S.smyrna, ...DARDANELLIT, S.konstantinopoli],
  },
  {
    id: 'laiva-lloyd-aleksandria', nimi: 'Österreichischer Lloyd: Trieste – Aleksandria', vuosi: 1873,
    lahde: 'https://en.wikipedia.org/wiki/%C3%96sterreichischer_Lloyd',
    reitti: [S.trieste, S.brindisi, S.aleksandria],
  },
  {
    id: 'laiva-po-intia', nimi: 'P&O: Southampton – Gibraltar – Malta – Aleksandria (Suez)', vuosi: 1873,
    lahde: 'https://en.wikipedia.org/wiki/P%26O; https://www.benjidog.co.uk/TheShipsList/PAndOLine.php',
    reitti: [S.southampton, [-9.6, 43.2], [-9.6, 37.0], S.gibraltar, S.malta, S.aleksandria, S.portsaid],
  },
  {
    id: 'laiva-ropit-odessa', nimi: 'ROPiT: Odessa – Konstantinopoli', vuosi: 1873,
    lahde: 'https://en.wikipedia.org/wiki/Russian_Steam_Navigation_and_Trading_Company',
    reitti: [S.odessa, ...[...BOSPORI].reverse(), S.konstantinopoli],
  },
];

/*
 * OHM:stä puuttuvat radat, jotka olivat liikenteessä 1873: viiva asemalta asemalle
 * (asemien koordinaatit ovat julkisia tosiasioita, oma digitointi CC0).
 */
export const TAYDENNYKSET = [
  {
    id: 'rautatie-pireus-ateena', nimi: 'Pireus – Ateena (Thiseio)', vuosi: 1869,
    lahde: 'https://en.wikipedia.org/wiki/Line_1_(Athens_Metro)',
    viivat: [[[23.643, 37.948], [23.666, 37.945], [23.680, 37.955], [23.697, 37.961], [23.709, 37.969], [23.721, 37.977]]],
  },
];

/* ------------------------------------------------------------ merireititys */

export function meriReititin(maski, { lon0 = -12, lat0 = 28, lon1 = 38, lat1 = 52, askel = 0.05, maanHinta = 40 } = {}) {
  const W = Math.round((lon1 - lon0) / askel) + 1; const H = Math.round((lat1 - lat0) / askel) + 1;
  const maa = new Uint8Array(W * H);
  for (let y = 0; y < H; y += 1) for (let x = 0; x < W; x += 1) maa[y * W + x] = maski.maa(lon0 + x * askel, lat1 - y * askel) ? 1 : 0;
  const solu = ([lon, lat]) => [Math.max(0, Math.min(W - 1, Math.round((lon - lon0) / askel))), Math.max(0, Math.min(H - 1, Math.round((lat1 - lat) / askel)))];
  const piste = (x, y) => [lon0 + x * askel, lat1 - y * askel];
  return function reita(a, b) {
    const [ax, ay] = solu(a); const [bx, by] = solu(b);
    const N = W * H; const g = new Float64Array(N).fill(Infinity); const tulo = new Int32Array(N).fill(-1);
    const kasa = []; // [f, i] binäärikeko
    const lisaa = (f, i) => { kasa.push([f, i]); let k = kasa.length - 1; while (k) { const p = (k - 1) >> 1; if (kasa[p][0] <= kasa[k][0]) break; [kasa[p], kasa[k]] = [kasa[k], kasa[p]]; k = p; } };
    const ota = () => { const t = kasa[0]; const v = kasa.pop(); if (kasa.length) { kasa[0] = v; let k = 0; for (;;) { const l = 2 * k + 1; const r = l + 1; let m = k; if (l < kasa.length && kasa[l][0] < kasa[m][0]) m = l; if (r < kasa.length && kasa[r][0] < kasa[m][0]) m = r; if (m === k) break; [kasa[m], kasa[k]] = [kasa[k], kasa[m]]; k = m; } } return t; };
    const h = (x, y) => Math.hypot(x - bx, y - by);
    const alku = ay * W + ax; const loppu = by * W + bx; g[alku] = 0; lisaa(h(ax, ay), alku);
    while (kasa.length) {
      const [, i] = ota(); if (i === loppu) break;
      const x = i % W; const y = (i - x) / W;
      for (let dy = -1; dy <= 1; dy += 1) for (let dx = -1; dx <= 1; dx += 1) {
        if (!dx && !dy) continue;
        const nx = x + dx; const ny = y + dy; if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
        const j = ny * W + nx; const hinta = Math.hypot(dx, dy) * (maa[j] && j !== loppu ? maanHinta : 1);
        if (g[i] + hinta < g[j]) { g[j] = g[i] + hinta; tulo[j] = i; lisaa(g[j] + h(nx, ny), j); }
      }
    }
    const polku = []; for (let i = loppu; i !== -1; i = tulo[i]) { const x = i % W; polku.push(piste(x, (i - x) / W)); }
    polku.reverse(); polku[0] = a; polku[polku.length - 1] = b;
    return suorista(polku);
  };
  /*
   * NARUNVETO: ruudukon A* antaa 45°:n portaita. Jokaisesta pisteestä hypätään
   * kauimmaiseen, johon suora jana kulkee pelkkää merta (näytteet 0,02°), ja
   * lopuksi kaksi Chaikin-kierrosta pehmentää kulmat. Alku- ja loppupää
   * saavat olla maalla (satama rannalla, salmen läpivienti).
   */
  function vapaa([x0, y0], [x1, y1]) {
    const n = Math.ceil(Math.hypot(x1 - x0, y1 - y0) / 0.02);
    for (let k = 1; k < n; k += 1) { const t = k / n; if (maski.maa(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t)) return false; }
    return true;
  }
  function suorista(polku) {
    const ulos = [polku[0]]; let i = 0;
    while (i < polku.length - 1) {
      let j = polku.length - 1;
      while (j > i + 1 && !vapaa(polku[i], polku[j])) j -= 1;
      ulos.push(polku[j]); i = j;
    }
    let p = ulos;
    for (let kierros = 0; kierros < 2; kierros += 1) {
      const q = [p[0]];
      for (let k = 0; k < p.length - 1; k += 1) {
        const [ax, ay] = p[k]; const [bx, by] = p[k + 1];
        q.push([0.75 * ax + 0.25 * bx, 0.75 * ay + 0.25 * by], [0.25 * ax + 0.75 * bx, 0.25 * ay + 0.75 * by]);
      }
      q.push(p.at(-1)); p = q;
    }
    return p;
  }
}

export function laivareitit(maski) {
  const reita = meriReititin(maski);
  return LINJAT.map(({ id, nimi, vuosi, lahde, reitti }) => {
    const viiva = [];
    for (let i = 1; i < reitti.length; i += 1) {
      const osa = reita(reitti[i - 1], reitti[i]);
      viiva.push(...(viiva.length ? osa.slice(1) : osa));
    }
    return {
      id, laji: 'laiva', nimi, vuosi, viivat: [harvenna(viiva, 0.01).map(([x, y]) => [pyorista(x), pyorista(y)])],
      lahde, lisenssi: OMA_LISENSSI,
    };
  });
}

/* ------------------------------------------------------------ rautatiet */

export const OHM_KYSELY = `[out:json][timeout:300][bbox:27,-11,66,45];
way["railway"~"^(rail|abandoned|disused|razed|dismantled)$"]["start_date"][!"service"](if: t["start_date"] < "1874" && (!is_tag("end_date") || t["end_date"] >= "1873"));
out tags geom;`;

export async function haeOhm(valimuisti) {
  if (valimuisti && existsSync(valimuisti)) return JSON.parse(readFileSync(valimuisti, 'utf8'));
  const v = await fetch('https://overpass-api.openhistoricalmap.org/api/interpreter', {
    method: 'POST', body: new URLSearchParams({ data: OHM_KYSELY }), headers: { 'User-Agent': 'Matkakirja-karttaseppa/1.0 (1873-rautatiet)' },
  });
  if (!v.ok) throw new Error(`OHM Overpass ${v.status}`);
  const teksti = await v.text();
  if (valimuisti) writeFileSync(valimuisti, teksti);
  return JSON.parse(teksti);
}

const vuosi = (s) => { const m = String(s ?? '').match(/\d{4}/); return m ? Number(m[0]) : null; };

export function rautatiet(ohm) {
  const ryhmat = new Map();
  for (const w of ohm.elements) {
    if (w.type !== 'way' || !w.geometry?.length) continue;
    const a = vuosi(w.tags.start_date); const b = vuosi(w.tags.end_date);
    if (a === null || a > 1873 || (b !== null && b < 1873)) continue;
    const viiva = harvenna(w.geometry.map((p) => [p.lon, p.lat]), 0.005).map(([x, y]) => [pyorista(x), pyorista(y)]);
    if (viiva.length < 2) continue;
    const [lon, lat] = viiva[0];
    const avain = w.tags.name ?? `ruutu ${Math.floor(lat / 5) * 5},${Math.floor(lon / 5) * 5}`;
    if (!ryhmat.has(avain)) ryhmat.set(avain, { viivat: [], vuosi: a });
    const r = ryhmat.get(avain); r.viivat.push(viiva); r.vuosi = Math.min(r.vuosi, a);
  }
  let n = 0;
  return [...ryhmat.entries()].sort(([x], [y]) => x.localeCompare(y)).map(([nimi, { viivat, vuosi: v }]) => ({
    id: `rautatie-${(n += 1)}`, laji: 'rautatie', ...(nimi.startsWith('ruutu ') ? {} : { nimi }), vuosi: v, viivat,
    lahde: 'https://www.openhistoricalmap.org/', lisenssi: OHM_LISENSSI,
  }));
}

if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
  const argv = process.argv.slice(2);
  const nePolku = argv[0]; const i = argv.indexOf('--ohm'); const valimuisti = i >= 0 ? argv[i + 1] : null;
  if (!nePolku) { console.error('Käyttö: node tools/tee-reitit1873.mjs <ne_10m_admin_0_countries.geojson> [--ohm <välimuisti.json>]'); process.exit(1); }
  const maski = maamaski(JSON.parse(readFileSync(nePolku, 'utf8')));
  const laivat = laivareitit(maski);
  const radat = [...rautatiet(await haeOhm(valimuisti)), ...TAYDENNYKSET.map((r) => ({ ...r, laji: 'rautatie', lisenssi: OMA_LISENSSI }))];
  const tulos = { lahteet: LAHTEET, reitit: [...laivat, ...radat] };
  writeFileSync(ULOS, gzipSync(JSON.stringify(tulos), { level: 9 }));
  const pisteita = tulos.reitit.reduce((s, r) => s + r.viivat.reduce((t, v) => t + v.length, 0), 0);
  console.log(`${laivat.length} laivalinjaa, ${radat.length} rautatieryhmää (${radat.reduce((s, r) => s + r.viivat.length, 0)} viivaa), ${pisteita} pistettä → ${ULOS}`);
}
