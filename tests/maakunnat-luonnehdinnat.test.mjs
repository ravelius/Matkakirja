import { test } from 'node:test';
import assert from 'node:assert/strict';
import { MAAKUNTIEN_LUONNEHDINNAT } from '../js/packs/maakunnat-luonnehdinnat.js';

const ODOTETUT_MAARAT = {
  FRA: 13,
  DEU: 16,
  ITA: 20,
  ESP: 19,
  GBR: 4,
  POL: 16,
  AUT: 9,
};

test('jokaisella maalla on odotettu määrä alueita', () => {
  for (const [iso, maara] of Object.entries(ODOTETUT_MAARAT)) {
    assert.ok(MAAKUNTIEN_LUONNEHDINNAT[iso], `${iso} puuttuu kokonaan`);
    const avaimet = Object.keys(MAAKUNTIEN_LUONNEHDINNAT[iso]);
    assert.equal(avaimet.length, maara, `${iso}: ${avaimet.length} aluetta, odotettu ${maara}`);
  }
});

/*
 * Erä 1 täyttää vain `lyhyt`. `pitka`, `kuva` ja `pulu` tulevat
 * myöhemmissä erissä eivätkä saa olla pakollisia vielä — testi
 * tarkistaa ne vain jos ne ovat olemassa.
 */
test('jokaisella alueella on ei-tyhjä lyhyt-teksti enintään 160 merkkiä', () => {
  for (const [iso, alueet] of Object.entries(MAAKUNTIEN_LUONNEHDINNAT)) {
    for (const [tunnus, alue] of Object.entries(alueet)) {
      const { lyhyt } = alue;
      assert.equal(typeof lyhyt, 'string', `${iso}:${tunnus} lyhyt puuttuu tai ei ole merkkijono`);
      assert.ok(lyhyt.trim().length > 0, `${iso}:${tunnus} lyhyt on tyhjä`);
      assert.ok(
        [...lyhyt].length <= 160,
        `${iso}:${tunnus} lyhyt on ${[...lyhyt].length} merkkiä, raja 160`,
      );
    }
  }
});

test('pitka, kuva ja pulu ovat oikeaa muotoa kun ne on annettu', () => {
  for (const [iso, alueet] of Object.entries(MAAKUNTIEN_LUONNEHDINNAT)) {
    for (const [tunnus, alue] of Object.entries(alueet)) {
      if (alue.pitka !== undefined) {
        assert.equal(typeof alue.pitka, 'string', `${iso}:${tunnus} pitka ei ole merkkijono`);
        assert.ok(alue.pitka.trim().length > 0, `${iso}:${tunnus} pitka on tyhjä`);
      }
      if (alue.kuva !== undefined) {
        assert.equal(typeof alue.kuva, 'object', `${iso}:${tunnus} kuva ei ole olio`);
        for (const kentta of ['osoite', 'lahde', 'lisenssi', 'tekija']) {
          assert.ok(alue.kuva[kentta], `${iso}:${tunnus} kuva.${kentta} puuttuu`);
        }
      }
      if (alue.pulu !== undefined) {
        assert.ok(Array.isArray(alue.pulu), `${iso}:${tunnus} pulu ei ole taulukko`);
        for (const rivi of alue.pulu) {
          assert.ok(rivi.q, `${iso}:${tunnus} pulu-rivin kysymys puuttuu`);
          assert.ok(rivi.a, `${iso}:${tunnus} pulu-rivin vastaus puuttuu`);
        }
      }
    }
  }
});
