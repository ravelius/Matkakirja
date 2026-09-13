import test from 'node:test';
import assert from 'node:assert/strict';
import { kohteenKuvalista } from '../js/fokuskohteet.js';
import { MAASTOKOHTEET_FRA } from '../js/packs/maastokohteet-fra.js';
// Omistaja hyväksyi 13.9.2026 kummastakin vuoresta vain aidon valokuvan;
// rinnakkainen havainnekuva poistui pelikytkennöistä.
const tapaukset = [
  ['montblanc', 'fra-maasto-montblanc-f39f71151b35.jpg', 'fra-maasto-montblanc-69d1dc31dec3', 'CC BY-SA 2.0 France'],
  ['vignemale', 'fra-maasto-vignemale-8bcfbcf0ef86.jpg', 'fra-maasto-vignemale-18e16a3e8da6', 'CC BY-SA 3.0'],
];
test('Ranskan vuorilla on vain hyväksytty aito valokuva', () => {
  for (const [id, aito, hylatty, lisenssi] of tapaukset) {
    const kohde = MAASTOKOHTEET_FRA.find((x) => x.id === id);
    assert.ok(kohde, `kohde ${id} puuttuu`);
    const kuvat = kohteenKuvalista(kohde);
    assert.equal(kuvat.length, 1);
    assert.ok(kuvat[0].osoite.endsWith(`/${aito}`));
    assert.match(kuvat[0].lahde, /^Valokuva:/);
    assert.equal(kuvat[0].lisenssi, lisenssi);
    assert.ok(kuvat[0].tekija && kuvat[0].lisenssiUrl && kuvat[0].lahdeUrl);
    assert.ok([...kuvat[0].lyhyt].length <= 100);
    assert.ok(!JSON.stringify(kohde).includes(hylatty), `hylätty ${hylatty} yhä pelissä`);
  }
});
