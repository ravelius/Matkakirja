// Mapterhorn-lähde maastolaatoille (Karttaseppä 12.10.2026, vuoristokerros).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';
import { mapterhornLahde, mercatorLaatta, puraRaaka } from '../tools/maasto/mapterhorn.mjs';
import { kerroksenKuvaus, lueAsetukset } from '../tools/maasto/tee-maasto.mjs';

const raaka = (f) => {
  const b = Buffer.alloc(512 * 512 * 2);
  for (let j = 0; j < 512; j += 1) for (let i = 0; i < 512; i += 1) {
    const h = f(i, j);
    b.writeUInt16LE(Number.isNaN(h) ? 0 : Math.round((h + 1000) * 10), (j * 512 + i) * 2);
  }
  return gzipSync(b);
};

test('mercatorLaatta: Interlaken z6 = (33, 22)', () => {
  const [x, y] = mercatorLaatta(7.86, 46.69, 6);
  assert.equal(Math.floor(x), 33);
  assert.equal(Math.floor(y), 22);
});

test('puraRaaka: dm-koodaus ja tyhjä pikseli', () => {
  const h = puraRaaka(raaka((i) => (i === 0 ? NaN : 1234.5)));
  assert.ok(Number.isNaN(h[0]));
  assert.equal(h[1], 1234.5);
});

test('mapterhornLahde: oma data, varalähde laatan ulkopuolella', () => {
  const k = mkdtempSync(join(tmpdir(), 'mh-'));
  const z = 14;
  const [fx, fy] = mercatorLaatta(7.96, 46.55, z);
  mkdirSync(join(k, String(z)));
  writeFileSync(join(k, String(z), `${Math.floor(fx)}_${Math.floor(fy)}.u16.gz`), raaka(() => 2000));
  const vara = { korkeus: () => 77, onRuutu: () => true, ruutuja: 1, asetaLru() {}, sulje() {} };
  const L = mapterhornLahde(k, { z, vara });
  assert.equal(L.laattoja, 1);
  // Laatan keskeltä oma arvo, kaukaa varalähde.
  const lon = ((Math.floor(fx) + 0.5) / 2 ** z) * 360 - 180;
  const n = Math.PI - (2 * Math.PI * (Math.floor(fy) + 0.5)) / 2 ** z;
  const lat = (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
  assert.ok(Math.abs(L.korkeus(lon, lat, 0.0001) - 2000) < 0.01);
  assert.equal(L.korkeus(10, 50, 0.0001), 77);
  assert.equal(L.onOma(10, 50), false);
});

test('kerroksenKuvaus: vanhempi → parentUrl ja tyhjät matalat tasot', () => {
  const k = kerroksenKuvaus({ tasot: [13, 14], alue: [7.9, 46.5, 7.95, 46.55], versio: 'testi', vanhempi: '../2026-09-24-maailma/' });
  assert.equal(k.parentUrl, '../2026-09-24-maailma/');
  assert.equal(k.available.length, 15);
  assert.deepEqual(k.available.slice(0, 13), new Array(13).fill([]));
  assert.ok(k.available[13].length > 0);
  const a = lueAsetukset(['--mapterhorn', '/x', '--vanhempi', '../p/']);
  assert.equal(a.mapterhornKansio, '/x');
  assert.equal(a.vanhempi, '../p/');
});
