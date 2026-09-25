/*
 * Nostojen kokoluokituksen eheys (elävä kartta, 26.9.2026): jokaisella
 * maan ankkuroidulla nostolla on luokka, luokat ovat sallittuja, eikä
 * taulussa ole avaimia, joilla ei ole ankkuria. Pääkohteita on vähän
 * (hehku kuluu, jos kaikki hehkuvat).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { KOKOLUOKAT, NOSTOJEN_KOKOLUOKAT } from '../js/packs/nostojen-kokoluokat.js';
import { NOSTOANKKURIT_GRC } from '../js/packs/nostoankkurit-grc.js';

const ANKKURIT = { GRC: NOSTOANKKURIT_GRC };

for (const [iso, luokat] of Object.entries(NOSTOJEN_KOKOLUOKAT)) {
  test(`${iso}: jokaisella ankkuroidulla nostolla on kokoluokka, ei ylimääräisiä`, () => {
    const ankkurit = Object.keys(ANKKURIT[iso]);
    const puuttuu = ankkurit.filter((id) => !(id in luokat));
    const ylimaara = Object.keys(luokat).filter((id) => !(id in ANKKURIT[iso]));
    assert.deepEqual(puuttuu, [], `${iso}: luokka puuttuu`);
    assert.deepEqual(ylimaara, [], `${iso}: avain ilman ankkuria`);
  });

  test(`${iso}: luokat ovat sallittuja ja pääkohteita on 5–25 % nostoista`, () => {
    const arvot = Object.values(luokat);
    assert.ok(arvot.every((a) => KOKOLUOKAT.includes(a)));
    const paa = arvot.filter((a) => a === 'paakohde').length;
    assert.ok(paa >= arvot.length * 0.05 && paa <= arvot.length * 0.25,
      `${iso}: ${paa}/${arvot.length} pääkohdetta`);
  });
}
