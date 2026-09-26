// Vuoden 1873 laivareitit ja rautatiet (Elävä kartta; tools/tee-reitit1873.mjs → tools/vienti/reitit1873.json.gz).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';
import { ULOS, LINJAT } from '../tools/tee-reitit1873.mjs';

const data = JSON.parse(gunzipSync(readFileSync(ULOS)).toString('utf8'));

test('jokaisella reitillä laji, lähde ja lisenssi; koordinaatit järkeviä', () => {
  assert.ok(statSync(ULOS).size < 1_500_000);
  const idt = new Set();
  for (const r of data.reitit) {
    assert.ok(['laiva', 'rautatie'].includes(r.laji), r.id);
    assert.ok(r.lahde && r.lisenssi && r.lisenssi.startsWith('CC0'), r.id);
    assert.ok(!idt.has(r.id), `kaksoistunniste ${r.id}`); idt.add(r.id);
    assert.ok(r.vuosi <= 1873, r.id);
    for (const v of r.viivat) {
      assert.ok(v.length >= 2, r.id);
      for (const [lon, lat] of v) assert.ok(lon >= -20 && lon <= 60 && lat >= 25 && lat <= 70, `${r.id} ${lon},${lat}`);
    }
  }
  assert.ok(data.lahteet.every((l) => l.lisenssi && l.url));
});

test('kaikki laivalinjat mukana ja alkavat/päättyvät satamaansa', () => {
  for (const l of LINJAT) {
    const r = data.reitit.find((x) => x.id === l.id);
    assert.ok(r, l.id);
    const v = r.viivat[0]; const d = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
    assert.ok(d(v[0], l.reitti[0]) < 0.01 && d(v.at(-1), l.reitti.at(-1)) < 0.01, l.id);
  }
});

test('rautatiet kattavat Euroopan ydinalueen (yli 80 000 km)', () => {
  let km = 0;
  for (const r of data.reitit) if (r.laji === 'rautatie') for (const v of r.viivat) for (let i = 1; i < v.length; i += 1) {
    km += Math.hypot((v[i][0] - v[i - 1][0]) * Math.cos((v[i][1] * Math.PI) / 180), v[i][1] - v[i - 1][1]) * 111;
  }
  assert.ok(km > 80000, `${Math.round(km)} km`);
});

test('erä 2: Egyptin radat (OHM, ruutu 27°N) ja Pireus–Ateena 1869 (täydennys) mukana', () => {
  const alussa = (b) => data.reitit.some((r) => r.laji === 'rautatie'
    && r.viivat.some((v) => v.some(([lon, lat]) => lon >= b[0] && lon <= b[2] && lat >= b[1] && lat <= b[3])));
  assert.ok(alussa([29.8, 30.9, 31.4, 31.3]), 'Aleksandria–Kairo');
  assert.ok(alussa([23.6, 37.9, 23.75, 38.0]), 'Pireus–Ateena');
  assert.ok(data.reitit.find((r) => r.id === 'rautatie-pireus-ateena')?.lisenssi.startsWith('CC0'));
});
