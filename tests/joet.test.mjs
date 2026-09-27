// Jokiviivat (tools/tee-joet.mjs): GeoPackage-WKB-luku, pääuomaketjut ja maan osat.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { gpkgViivat, ketjuta, maanOsat } from '../tools/tee-joet.mjs';

function gpkg(viivat) {
  const osat = viivat.map((v) => { const b = Buffer.alloc(9 + v.length * 16); b[0] = 1; b.writeUInt32LE(2, 1); b.writeUInt32LE(v.length, 5); v.forEach(([x, y], i) => { b.writeDoubleLE(x, 9 + i * 16); b.writeDoubleLE(y, 17 + i * 16); }); return b; });
  const multi = Buffer.alloc(9); multi[0] = 1; multi.writeUInt32LE(5, 1); multi.writeUInt32LE(viivat.length, 5);
  const otsake = Buffer.alloc(8 + 32); otsake.write('GP'); otsake[3] = 0b011; otsake.writeInt32LE(3857, 4);
  return Buffer.concat([otsake, multi, ...osat]);
}

test('GeoPackage-geometria: MultiLineString kuoren (32 t) kanssa', () => {
  assert.deepEqual(gpkgViivat(gpkg([[[1, 2], [3, 4]], [[5, 6], [7, 8], [9, 10]]])), [[[1, 2], [3, 4]], [[5, 6], [7, 8], [9, 10]]]);
});

test('pääuoma jatkuu suurimman haaran kautta, sivujoki on oma viivansa', () => {
  const u = (id, alas, valuma, viiva) => ({ id, alas, valuma, jarjestys: 3, viiva });
  const ketjut = ketjuta([
    u(1, 3, 500, [[0, 2], [1, 1]]), // pääuoman yläjuoksu
    u(2, 3, 350, [[2, 2], [1, 1]]), // sivujoki
    u(3, -1, 900, [[1, 1], [1, 0]]), // alajuoksu
  ]);
  const paa = ketjut.find((k) => k.valuma === 900);
  assert.deepEqual(paa.pisteet, [[0, 2], [1, 1], [1, 0]]);
  assert.ok(ketjut.some((k) => k.valuma === 350 && k.pisteet.length === 2));
  assert.equal(ketjut.length, 2);
});

test('maan osat: toleranssi pitää rajajoen ja suun mukana', () => {
  const maaIso = (lon) => (lon < 10 ? 'AAA' : lon < 20 ? 'BBB' : null);
  const k = { pisteet: [[5, 0], [9.99, 0], [10.01, 0], [15, 0], [20.01, 0], [25, 0]] };
  assert.deepEqual(maanOsat(k, 'AAA', maaIso), [[[5, 0], [9.99, 0], [10.01, 0]]]);
  assert.deepEqual(maanOsat(k, 'BBB', maaIso), [[[9.99, 0], [10.01, 0], [15, 0], [20.01, 0]]]);
});
