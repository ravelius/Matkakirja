import test from 'node:test';
import assert from 'node:assert/strict';
import { kohteenKuvalista } from '../js/fokuskohteet.js';
import { MAASTOKOHTEET_SWE } from '../js/packs/maastokohteet-swe.js';
import { MAASTOKOHTEET_NOR } from '../js/packs/maastokohteet-nor.js';
// Omistaja hyväksyi 13.9.2026 kustakin näistä neljästä vain yhden kuvan
// (havainnekuvan); rinnakkainen aito valokuva poistui pelikytkennöistä.
const tapaukset = [
  [MAASTOKOHTEET_SWE, 'ales-stenar', 'a5345172fddc', '52b283639af9', 'CC BY-SA 3.0'],
  [MAASTOKOHTEET_NOR, 'urnes', '13afbfbbe1bf', 'ef7aa0a1467d', 'CC BY-SA 3.0 NO'],
  [MAASTOKOHTEET_SWE, 'visby', '727d4c9ed518', '05552be7d145', 'CC0 1.0'],
  [MAASTOKOHTEET_SWE, 'gamla-uppsala', 'd025b78f39b0', 'c2efa57c7bb1', 'CC BY 4.0'],
];
test('Nordic8-kohteilla on vain hyväksytty havainnekuva', () => {
  for (const [paketti, id, havainne, hylatty, lisenssi] of tapaukset) {
    const kohde = paketti.find((x) => x.id === id);
    assert.ok(kohde, `kohde ${id} puuttuu`);
    const kuvat = kohteenKuvalista(kohde);
    assert.equal(kuvat.length, 1);
    assert.match(kuvat[0].osoite, new RegExp(`${havainne}\\.jpg$`));
    assert.match(kuvat[0].lahde, /^Matkakirjan havainnekuva/);
    assert.equal(kuvat[0].lisenssi, lisenssi);
    assert.ok(kuvat.every((x) => x.tekija && x.lisenssiUrl && x.lahdeUrl));
    assert.ok(kuvat.every((x) => [...x.lyhyt].length <= 100));
    assert.ok(!JSON.stringify(kohde).includes(hylatty), `hylätty ${hylatty} yhä pelissä`);
  }
});
