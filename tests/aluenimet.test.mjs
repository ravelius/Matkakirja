// Aluenimien vienti natiiville (tools/vie-aluenimet.mjs, löydös 38 b).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  aluenimet, korkeusMetreina, laatikonKeskipiste, millerLat, millerY, tyyliavain, VALTAMERET,
} from '../tools/vie-aluenimet.mjs';

test('Millerin y ja käänteinen', () => {
  for (const lat of [-60, 0, 38, 48.9, 75]) assert.ok(Math.abs(millerLat(millerY(lat)) - lat) < 1e-9);
});

test('laatikon keskipiste Millerin y:n mukaan, ei asteiden keskiarvona', () => {
  const k = laatikonKeskipiste({ lon0: 4, lat0: 40, lon1: 5, lat1: 60 });
  assert.equal(k.lon, 4.5);
  assert.ok(k.lat > 50, `Millerin keskikohta on pohjoisempana kuin 50° (${k.lat})`);
});

test('tyyliavain kuten maailmapiirto.js', () => {
  assert.equal(tyyliavain({ luokka: 'meri' }), 'meri');
  assert.equal(tyyliavain({ luokka: 'maakunta', koko: 'pieni' }), 'maakunta-pieni');
  assert.equal(tyyliavain({ luokka: 'nykyalue', koko: 'suuri' }), 'nykyalue');
});

test('korkeus metreinä: 32 px z8:lla 49°:ssa noin 5,75 km', () => {
  const m = korkeusMetreina(32, 172800, 48.9);
  assert.ok(m > 5600 && m < 5900, `${m}`);
});

test('vienti: nimet, pallotasot, muste ja ohitetut', () => {
  const pyramidi = {
    versio: 'p', tasot: [7, 8].map((z) => ({ z, leveys: 675 * 2 ** z })),
    nimiotaso: {
      versio: 'n',
      nimiot: {
        champagne: { luokka: 'maakunta', teksti: 'CHAMPAGNE', iso: 'FRA', koko: 'suuri', tasot: [7, 8], laatikot: { 7: { lon0: 4, lat0: 48.8, lon1: 5, lat1: 49 }, 8: { lon0: 4.2, lat0: 48.85, lon1: 4.8, lat1: 48.95 } } },
        'grand-est': { luokka: 'nykyalue', teksti: 'Grand Est', iso: 'FRA', koko: 'suuri', tasot: [8], laatikot: { 8: { lon0: 4.7, lat0: 48.9, lon1: 5.1, lat1: 49 } } },
        kompassi: { luokka: 'kuva', tasot: [5], laatikot: {} },
        raja: { luokka: 'raja', tasot: [6], laatikot: {} },
      },
    },
  };
  const t = aluenimet(pyramidi, { muste: new Map([['FRA|Grand Est', 'ruoste-vahva']]), versio: 'v' });
  assert.equal(t.nimet.length, 2);
  assert.deepEqual(t.lukumaarat.ohitetut, { kuva: 1, raja: 1, eiLaatikkoa: 0 });
  const c = t.nimet.find((n) => n.id === 'champagne');
  assert.deepEqual(c.pallotasot, [8, 9]);
  assert.equal(c.paikat[8].korkeus_px, 32);
  assert.equal(t.nimet.find((n) => n.id === 'grand-est').muste, 'ruoste-vahva');
  assert.equal(t.valtameret.length, VALTAMERET.length);
  assert.deepEqual(t.valtameret[0].pallotasot, [1, 2, 3, 4]);
});

test('valtamerten kopio on sama kuin generaattorin MERET', () => {
  const src = readFileSync(new URL('../tools/generoi-laattapyramidi.mjs', import.meta.url), 'utf8');
  for (const m of VALTAMERET) {
    assert.ok(src.includes(`{ nimi: '${m.nimi}', lon: ${m.lon}, lat: ${m.lat}, koko: ${m.koko} }`), m.nimi);
  }
});
