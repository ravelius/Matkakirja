// Merikohdat (tools/tee-merikohdat.mjs, Fable 26.9.2026): kohdemaan meret ja ankkuripisteet meren koristeille.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  MAKS_PER_MERI, MERET, MERTEN_VALI_KM, RAJASTA_KM, RANNASTA_KM, REITISTA_KM,
  lahinRanta, laivareitit, maarasteri, merikohdat, meri,
} from '../tools/tee-merikohdat.mjs';

const nelio = (w, s, e, n) => ({ type: 'Polygon', coordinates: [[[w, s], [e, s], [e, n], [w, n], [w, s]]] });

test('merijako: tunnetut paikat', () => {
  const odotus = [
    [[4.3, 60.4], 'pohjanmeri'], [[4.1, 61.5], 'atlantti'], [[11, 65], 'atlantti'], [[-3, 44], 'atlantti'],
    [[5.3, 43], 'valimeri'], [[18, 42], 'valimeri'], [[18.5, 57], 'itameri'], [[20, 63], 'itameri'],
    [[37, 65.5], 'jaameri'], [[25, 71], 'jaameri'], [[1.5, 50.9], 'kanaali'], [[9, 58], 'pohjanmeri'],
    [[31, 43], 'mustameri'], [[34, 44.5], null], [[-9.5, 38.5], 'atlantti'], [[-5, 54], 'atlantti'],
  ];
  for (const [[lon, lat], m] of odotus) assert.equal(meri(lon, lat), m, `${lon},${lat}`);
});

test('kohdat: kohdemaan edustalla, 15–45 km rannasta, ei vierasta rantaa lähellä', () => {
  // Maa A (10–14°E) ja naapuri B (14–16°E) 40–42°N (Välimeren alue), meri ympärillä.
  const R = maarasteri([{ iso: 'AAA', geometry: nelio(10, 40, 14, 42) }, { iso: 'BBB', geometry: nelio(14, 40, 16, 42) }],
    { w: 8, e: 18, s: 38, n: 44 }, 0.02);
  const T = lahinRanta(R);
  const m = merikohdat(R, T, 'AAA');
  assert.deepEqual(m.meret, ['valimeri']);
  assert.ok(m.kohdat.length >= 1 && m.kohdat.length <= MAKS_PER_MERI, String(m.kohdat.length));
  for (const k of m.kohdat) {
    assert.ok(k.rannastaKm >= RANNASTA_KM[0] && k.rannastaKm <= RANNASTA_KM[1], JSON.stringify(k));
    // Etäisyys B:n suorakulmioon (14–16°E, 40–42°N) vähintään RAJASTA_KM (solun verran väljyyttä).
    const dx = Math.max(0, 14 - k.lon) * 111.32 * Math.cos(k.lat * Math.PI / 180); const dy = Math.max(0, 40 - k.lat, k.lat - 42) * 110.57;
    assert.ok(Math.hypot(dx, dy) >= RAJASTA_KM - 3, `B:n ranta liian lähellä: ${JSON.stringify(k)}`);
    assert.ok(k.lat < 40 || k.lat > 42 || k.lon < 10, JSON.stringify(k));
  }
});

test('assets/data/merikohdat.json: merijako, etäisyydet, välit ja laivareitit', () => {
  const j = JSON.parse(readFileSync(new URL('../assets/data/merikohdat.json', import.meta.url), 'utf8'));
  assert.deepEqual(j.meret, MERET);
  const speksi = {
    valimeri: ['ESP', 'FRA', 'ITA', 'GRC', 'HRV', 'MLT', 'CYP', 'TUR'], mustameri: ['BGR', 'ROU', 'TUR'],
    atlantti: ['PRT', 'ESP', 'FRA', 'IRL', 'GBR', 'ISL', 'NOR'], pohjanmeri: ['GBR', 'NLD', 'BEL', 'DEU', 'DNK', 'NOR'],
    kanaali: ['GBR', 'FRA'], itameri: ['FIN', 'SWE', 'EST', 'LVA', 'LTU', 'POL', 'DEU', 'DNK', 'RUS'], jaameri: ['NOR', 'RUS', 'ISL'],
  };
  for (const [m, isot] of Object.entries(speksi)) for (const iso of isot) assert.ok(j.maat[iso]?.meret.includes(m), `${iso} ${m}`);
  const reitit = laivareitit();
  const rad = Math.PI / 180;
  const km = (a, b) => 2 * 6371 * Math.asin(Math.sqrt(Math.sin(((b.lat - a.lat) * rad) / 2) ** 2
    + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(((b.lon - a.lon) * rad) / 2) ** 2));
  for (const [iso, m] of Object.entries(j.maat)) {
    for (const k of m.kohdat) {
      assert.equal(meri(k.lon, k.lat), k.meri, `${iso} ${JSON.stringify(k)}`);
      assert.ok(k.rannastaKm >= RANNASTA_KM[0] && k.rannastaKm <= RANNASTA_KM[1], `${iso} ${JSON.stringify(k)}`);
      // Reitin pisteitä vasten (tiheä murtoviiva riittää karkeaksi tarkistukseksi).
      for (const v of reitit) for (const [lon, lat] of v) assert.ok(km(k, { lon, lat }) >= REITISTA_KM * 0.9, `${iso} reitillä ${JSON.stringify(k)}`);
    }
    for (const mm of m.meret) assert.ok(m.kohdat.filter((k) => k.meri === mm).length <= MAKS_PER_MERI, `${iso} ${mm}`);
    for (let a = 0; a < m.kohdat.length; a += 1) for (let b = a + 1; b < m.kohdat.length; b += 1) {
      assert.ok(km(m.kohdat[a], m.kohdat[b]) >= MERTEN_VALI_KM, `${iso}: ${JSON.stringify([m.kohdat[a], m.kohdat[b]])}`);
    }
  }
});
