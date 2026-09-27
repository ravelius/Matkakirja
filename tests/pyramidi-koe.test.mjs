/*
 * Koepyramidi ?pyramidi=<sarja> (js/media.js, Fable 25.9.2026): omistaja
 * kokeilee uutta peruskarttaa ennen tuotannon osoitinvaihtoa. Selaimessa
 * savuke tools/savukkeet/savuke-pyramidi-koe.mjs.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { koepyramidinPallokansio, pyramidiKoe, pyramidinLuettelonPolku } from '../js/media.js';
import { PALLO_LAATTAKANSIO, TUOTANNON_PALLO_LAATTAKANSIO } from '../js/pallo.js';

test('pyramidiKoe hyväksyy vain sarjan päivämäärämuodossa', () => {
  assert.equal(pyramidiKoe('?pyramidi=2026-09-25'), '2026-09-25');
  assert.equal(pyramidiKoe('?lauta=pallo&pyramidi=2026-09-25b'), '2026-09-25b');
  assert.equal(pyramidiKoe(''), null);
  assert.equal(pyramidiKoe('?pyramidi='), null);
  assert.equal(pyramidiKoe('?pyramidi=../pyramidi'), null);
  assert.equal(pyramidiKoe('?pyramidi=2026-09-25/../x'), null);
});

test('luettelon polku: koesarjan kopio tai tuotannon osoitin', () => {
  assert.equal(pyramidinLuettelonPolku('2026-09-25'), 'koe/2026-09-25/pyramidi.json');
  assert.equal(pyramidinLuettelonPolku(null), 'pyramidi.json');
  // Nodessa ei ole osoiteriviä: oletus on tuotanto.
  assert.equal(pyramidinLuettelonPolku(), 'pyramidi.json');
});

test('koesarjan pallokansio on polton nimeämä kansio', () => {
  assert.equal(koepyramidinPallokansio('2026-09-25'), '2026-09-25-pohja-20260925');
  // Ilman lippua pallo pysyy tuotannon kansiossa.
  assert.equal(PALLO_LAATTAKANSIO, TUOTANNON_PALLO_LAATTAKANSIO);
});
