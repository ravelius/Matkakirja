/*
 * GSHHG-JÄRVET (Euroopan laatukierros 27.9.2026, N3).
 *
 * Natural Earthin järvistä puuttui Euroopassa mm. Müggelsee, Albano ja
 * Trasimeno, ja 0,4°:n kokoraja pudotti loput pienet (Bracciano 0,14°).
 * tools/gshhs-jarvet.mjs kokoaa järvet GSHHG full -tasolta 2, ja
 * maailma.mjs `jarvet` palauttaa laatikon piirron pikselikarsintaa varten.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { jarviPiirteet } from '../tools/gshhs-jarvet.mjs';
import { jarvet } from '../tools/fokuskartta/maailma.mjs';

/** GSHHG-monikulmio neliönä: keskipiste (lon 0..360), sivu asteina. */
function nelio(id, taso, lon, lat, sivu, container = -1) {
  const h = sivu / 2;
  const p = [[lon - h, lat - h], [lon + h, lat - h], [lon + h, lat + h], [lon - h, lat + h]];
  return {
    id, taso, n: 4, container,
    laajuus: { w: lon - h, e: lon + h, s: lat - h, n: lat + h },
    pisteet: Float64Array.from(p.flat()),
  };
}

test('jarviPiirteet: järvi saarineen, Kaspia ja pienet pois', () => {
  const { piirteet, tilasto } = jarviPiirteet([
    nelio(1, 1, 12, 42, 10),                 // maa: ei järvi
    nelio(2, 2, 12.23, 42.12, 0.14),         // Bracciano
    nelio(3, 3, 12.23, 42.12, 0.02, 2),      // saari Braccianossa
    nelio(4, 2, 13.6, 52.4, 0.002),          // alle pienimmän
    nelio(5, 2, 51, 42, 12),                 // Kaspianmeri
    nelio(6, 3, 30, 60, 0.05, 99),           // saari järvessä, jota ei ole
  ], { pienin: 0.004, askel: 0 });
  assert.equal(piirteet.length, 1);
  assert.equal(piirteet[0].properties.gshhs, 2);
  const renkaat = piirteet[0].geometry.coordinates;
  assert.equal(renkaat.length, 2, 'ulkorengas + saari sisärenkaana');
  assert.deepEqual(renkaat[0][0], renkaat[0].at(-1), 'rengas suljettu');
  assert.equal(tilasto.kaspia, 1);
  assert.equal(tilasto.pienetPois, 1);
});

test('jarvet: laatikko ja kokoraja (vahinKoko)', () => {
  const kansio = mkdtempSync(join(tmpdir(), 'jarvet-'));
  const rengas = (lon, lat, s) => [[lon, lat], [lon + s, lat], [lon + s, lat + s], [lon, lat + s], [lon, lat]];
  writeFileSync(join(kansio, 'ne_10m_lakes.geojson'), JSON.stringify({
    type: 'FeatureCollection',
    features: [
      { type: 'Feature', properties: { name: 'iso' }, geometry: { type: 'Polygon', coordinates: [rengas(17, 46, 0.9)] } },
      { type: 'Feature', properties: { name: '' }, geometry: { type: 'Polygon', coordinates: [rengas(12.16, 42.05, 0.14)] } },
    ],
  }));
  assert.deepEqual(jarvet(kansio).map((j) => j.nimi), ['iso'], 'oletus 0,4° pudottaa pienen (entinen käytös)');
  const pienet = jarvet(kansio, { vahinKoko: 0.004, harvennus: 0.001 });
  assert.equal(pienet.length, 2);
  assert.deepEqual(pienet[1].laatikko, [12.16, 42.05, 12.3, 42.19]);
});
