/*
 * MATALAN VEDEN VIILEYS (omistaja 27.9.2026, Euroopan laatukierros V1 a).
 * Vyöhyke 0…−10 m viileämmäksi, häivytys −20 m:iin; syvempi meri ennallaan.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SYVYYS, MATALA_SIIRTO, asetaMatalaViileys, lerpSyvyysAsteikolla,
} from '../tools/fokuskartta/piirto.js';

test('asetaMatalaViileys: matala viilenee, syvä ennallaan, ramppi järjestyksessä', () => {
  const ennen = (m) => lerpSyvyysAsteikolla(SYVYYS, m).map((c) => Math.round(c));
  const syva = ennen(-200);
  const nolla = ennen(0);
  asetaMatalaViileys(0);
  assert.deepEqual(ennen(0), nolla, '0 = tavulleen entinen');
  asetaMatalaViileys(0.5, 10);
  const nyt = ennen(0);
  assert.ok(nyt[0] < nolla[0] && nyt[2] > nolla[2], `viileämpi: ${nolla} → ${nyt}`);
  assert.deepEqual(ennen(-200), syva, 'syvä meri ei muutu');
  assert.deepEqual(MATALA_SIIRTO, nyt.map((c, k) => c - nolla[k]));
  for (let i = 1; i < SYVYYS.length; i += 1) assert.ok(SYVYYS[i].m < SYVYYS[i - 1].m);
});
