/*
 * Maakortin pääkaupunkirivi (PT 10.10.2026, linjaus A; natiivi tekee saman):
 * "Pääkaupunki: <nimi>", hallinnon paikalla "Hallinnon paikka: <nimi>",
 * ilman tietoa ei riviä. Sama lähde kuin viennin maat.*.paakaupunki.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { maanPaakaupunki, maanRivit } from '../js/fokusmitat.js';
import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';
import { HALLINNON_PAIKAT, PAAKAUPUNGIT } from '../js/packs/laudan-paakaupungit.js';
import { PAAKAUPUNGIT as VIENNIN } from '../tools/vienti/paakaupungit.mjs';

const ui = { game: { pack: MAAILMANKARTTA } };
const ensimmainen = (iso) => maanRivit(ui, iso)[0] ?? null;

test('laudan pääkaupunki, pääkaupunkipiste ja hallinnon paikka', () => {
  assert.deepEqual(maanPaakaupunki(MAAILMANKARTTA, 'FRA'), { nimi: 'Pariisi', asema: 'pääkaupunki' });
  assert.deepEqual(maanPaakaupunki(MAAILMANKARTTA, 'SRB'), { nimi: 'Belgrad', asema: 'pääkaupunki' });
  assert.deepEqual(maanPaakaupunki(MAAILMANKARTTA, 'ISR'), { nimi: 'Jerusalem', asema: 'hallinnon paikka' });
  assert.deepEqual(maanPaakaupunki(MAAILMANKARTTA, 'PSE'), { nimi: 'Ramallah', asema: 'hallinnon paikka' });
  assert.equal(maanPaakaupunki(MAAILMANKARTTA, 'USA'), null);
});

test('rivi on kortin ensimmäinen ja Israel/Palestiina eivät koskaan saa "Pääkaupunki"-riviä', () => {
  assert.deepEqual(ensimmainen('FRA'), ['Pääkaupunki', 'Pariisi', '']);
  assert.deepEqual(ensimmainen('ISR'), ['Hallinnon paikka', 'Jerusalem', '']);
  assert.deepEqual(ensimmainen('PSE'), ['Hallinnon paikka', 'Ramallah', '']);
  for (const iso of ['ISR', 'PSE']) {
    assert.ok(!maanRivit(ui, iso).some(([o]) => o === 'Pääkaupunki'), iso);
  }
  assert.ok(!maanRivit(ui, 'USA').some(([o]) => o === 'Pääkaupunki' || o === 'Hallinnon paikka'));
});

test('jokaisella pääkaupungilla on nimi laudalla ja vienti lukee saman taulun', () => {
  assert.equal(VIENNIN, PAAKAUPUNGIT);
  for (const [iso, id] of Object.entries({ ...PAAKAUPUNGIT, ...HALLINNON_PAIKAT })) {
    assert.ok(maanPaakaupunki(MAAILMANKARTTA, iso)?.nimi, `${iso}: ${id}`);
  }
});
