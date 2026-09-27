// Natiivin pallon Z10 kaupungeille (tools/tee-pallolaatat.mjs --kaupungit, Karttaseppä 27.9.2026).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { kaupunkienLaatat, tasonLaatat } from '../tools/tee-pallolaatat.mjs';

test('kaupunkienLaatat = tasonLaatat kaupungin laatikolle (sama leikkausehto)', () => {
  for (const [lon, lat] of [[24.94, 60.17], [-0.13, 51.51], [151.2, -33.87], [-179.5, -16.5], [139.7, 35.7]]) {
    for (const Z of [6, 8]) {
      const odotus = new Set(tasonLaatat(Z, [lon - 1, lat - 1, lon + 1, lat + 1]).map(([x, y]) => `${Z}/${x}/${y}`));
      const saatu = kaupunkienLaatat([{ lon, lat }], Z, Z, 1);
      assert.deepEqual([...saatu].sort(), [...odotus].sort(), `${lon},${lat} Z${Z}`);
    }
  }
});

test('kaupunkienLaatat: päällekkäiset alueet yhdistyvät, tasot min–max', () => {
  const j = kaupunkienLaatat([{ lon: 10, lat: 50 }, { lon: 10.5, lat: 50.2 }], 7, 8, 1);
  const z7 = [...j].filter((k) => k.startsWith('7/')).length;
  const z8 = [...j].filter((k) => k.startsWith('8/')).length;
  assert.ok(z7 > 0 && z8 > z7, `${z7} ${z8}`);
});
