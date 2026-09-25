import { test } from 'node:test';
import assert from 'node:assert/strict';
import { MAAKUNTIEN_LUONNEHDINNAT } from '../js/packs/maakunnat-luonnehdinnat.js';
import { MAAKUNTIEN_PULU } from '../js/packs/maakunnat-pulu.js';

/*
 * GRC, NLD, BEL, DNK, SVK, FIN, EST, LVA, LTU ja SVN ovat 25.9.2026
 * lähtien erässä 1 (vain lyhyt, ks. maakunnat-luonnehdinnat.js:n
 * kommentti) — pulu tulee vasta erässä 3, joten se ei kuulu vielä
 * tähän täydellisyystestiin.
 */
const ERASSA_1 = new Set(['GRC', 'NLD', 'BEL', 'DNK', 'SVK', 'FIN', 'EST', 'LVA', 'LTU', 'SVN', 'ROU', 'CZE', 'LUX', 'MLT']);
test('jokaisella luonnehdinta-avaimella on pulu 2-3 paria, ei ylimääräisiä avaimia', () => {
  for (const [iso, alueet] of Object.entries(MAAKUNTIEN_LUONNEHDINNAT)) {
    if (ERASSA_1.has(iso)) continue;
    assert.ok(MAAKUNTIEN_PULU[iso], `${iso} puuttuu MAAKUNTIEN_PULU:sta kokonaan`);
    for (const tunnus of Object.keys(alueet)) {
      const parit = MAAKUNTIEN_PULU[iso][tunnus];
      assert.ok(Array.isArray(parit), `${iso}:${tunnus} pulu puuttuu tai ei ole taulukko`);
      assert.ok(
        parit.length >= 2 && parit.length <= 3,
        `${iso}:${tunnus} pulu on ${parit?.length} paria, odotettu 2-3`,
      );
    }
  }
  for (const [iso, alueet] of Object.entries(MAAKUNTIEN_PULU)) {
    for (const tunnus of Object.keys(alueet)) {
      assert.ok(
        MAAKUNTIEN_LUONNEHDINNAT[iso]?.[tunnus],
        `${iso}:${tunnus} on MAAKUNTIEN_PULU:ssa mutta ei luonnehdinnoissa`,
      );
    }
  }
});

test('jokainen pulu-pari on { q, a }, vastaus enintään 400 merkkiä', () => {
  for (const [iso, alueet] of Object.entries(MAAKUNTIEN_PULU)) {
    for (const [tunnus, parit] of Object.entries(alueet)) {
      for (const rivi of parit) {
        assert.equal(typeof rivi.q, 'string', `${iso}:${tunnus} kysymys puuttuu tai ei ole merkkijono`);
        assert.ok(rivi.q.trim().length > 0, `${iso}:${tunnus} kysymys on tyhjä`);
        assert.equal(typeof rivi.a, 'string', `${iso}:${tunnus} vastaus puuttuu tai ei ole merkkijono`);
        assert.ok(rivi.a.trim().length > 0, `${iso}:${tunnus} vastaus on tyhjä`);
        assert.ok(
          [...rivi.a].length <= 400,
          `${iso}:${tunnus} vastaus on ${[...rivi.a].length} merkkiä, raja 400`,
        );
      }
    }
  }
});
