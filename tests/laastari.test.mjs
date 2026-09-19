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

test('aukko laajenee reunan sekoitettuihin pikseleihin, ei batymetriaan', () => {
  // 5 × 1: aukko | reunan sekoitus | reunan sekoitus | batymetria | maa
  const rivi = [[38, 78, 145], [50, 88, 150], [60, 95, 160], [110, 150, 200], [120, 140, 90]];
  const data = new Uint8ClampedArray(rivi.flatMap((p) => [...p, 255]));
  merkitseMerivariAukoksi(data, LAASTARIN_MERIVARI, 3, 5);
  assert.deepEqual([3, 7, 11, 15, 19].map((i) => data[i]), [0, 0, 0, 255, 255]);
});

/* ── Erä G (19.9.2026): koko meri on aukko, ei vain tasainen MERIVARI ── */
import { merkitseMeriAukoksi, onReliefinMeri } from '../js/pallolaatat.js';
import { MAA, MERI } from '../tools/reliefivarit.mjs';

test('reliefipaletin jokainen merisävy on merta ja jokainen maasävy maata, myös varjossa', () => {
  for (const kerroin of [1, 0.6, 0.3, 0.15]) {
    for (const [z, r, g, b] of MERI) {
      assert.ok(onReliefinMeri(r * kerroin, g * kerroin, b * kerroin), `meri ${z} m × ${kerroin}`);
    }
    for (const [z, r, g, b] of MAA) {
      assert.ok(!onReliefinMeri(r * kerroin, g * kerroin, b * kerroin), `maa ${z} m × ${kerroin}`);
    }
  }
  assert.ok(!onReliefinMeri(236, 240, 244), 'jää');
});

test('MERIVARI on −4000 m:n merisävy, joten vanha ±6-maski lävisti polttetun batymetrian', () => {
  assert.ok(MERI.some(([, r, g, b]) => `${r},${g},${b}` === LAASTARIN_MERIVARI.join(',')));
});

test('meri aukoksi ja rannan sekoitettu pikseli mukaan, maa jää', () => {
  // 4 × 1: syvä meri | matala meri | rannan sekoitus | maa
  const rivi = [[33, 69, 130], [150, 195, 230], [120, 140, 150], [110, 150, 80]];
  const data = new Uint8ClampedArray(rivi.flatMap((p) => [...p, 255]));
  merkitseMeriAukoksi(data, 4);
  assert.deepEqual([3, 7, 11, 15].map((i) => data[i]), [0, 0, 0, 255]);
});
