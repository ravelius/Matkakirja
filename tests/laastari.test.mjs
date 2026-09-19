/*
 * Astronautin laastari: tasainen MERIVARI on aukko (Opus 19.9.2026,
 * erä opus-local-laastari; docs/raportit/viesti-fable-webkit-napa-20260919.md).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  merkitseMerivariAukoksi, LAASTARIN_MERIVARI, LAASTARIN_LEVEYSRAJA,
} from '../js/pallolaatat.js';
import { MERIVARI } from '../js/reliefipyramidi.js';

test('laastarin MERIVARI on sama luku kuin reliefipyramidin', () => {
  assert.equal(`rgb(${LAASTARIN_MERIVARI.join(', ')})`, MERIVARI);
});

test('tasainen MERIVARI muuttuu aukoksi, batymetria ja maa eivät', () => {
  const pikselit = [
    [38, 78, 145], // polttamaton merilapsi
    [40, 76, 147], // sama WebP-pakkauksen heilunnalla
    [33, 69, 130], // syvää merta batymetriasta
    [120, 140, 90], // maata
  ];
  const data = new Uint8ClampedArray(pikselit.flatMap((p) => [...p, 255]));
  const aukkoja = merkitseMerivariAukoksi(data);
  assert.equal(aukkoja, 2);
  assert.deepEqual([data[3], data[7], data[11], data[15]], [0, 0, 255, 255]);
});

test('laastarin leveysraja jättää navat 4k-pohjalle', () => {
  assert.ok(LAASTARIN_LEVEYSRAJA <= 62, 'Grönlannin jää alkaa 60 °N:n tienoilla');
  assert.ok(LAASTARIN_LEVEYSRAJA >= 55, 'Välimeri ja Itämeren eteläosa kuuluvat laastariin');
});
