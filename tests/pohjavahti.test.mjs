/*
 * POHJAVAHTI (web) — omistaja 1.10.2026, UI-pohjat kohta 8: uudet pinnat vain tyylikirjan arvoilla ja pohjilla.
 * Kovakoodatut värit ja yli 250 ms UI-siirtymät eivät saa lisääntyä mistään css-tiedostosta (lähtötaso
 * tyylikirja/pohjavahti-web.json), ja pohjatiedostot (css/pohjat*.css) käyttävät vain --tk-*-tokeneita.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { tarkista } from '../tools/pohjavahti.mjs';

test('pohjien ohi menevät tyyliarvot eivät lisäänny', () => {
  const v = tarkista();
  assert.deepEqual(v, [], v.join('\n') + '\nKäytä var(--tk-…)-tokeneita; puuttuva arvo → tyylikirja.json (Päätoimittaja/omistaja).');
});
