import test from 'node:test';
import assert from 'node:assert/strict';
import { kohteenKuvalista } from '../js/fokuskohteet.js';
import { MAASTOKOHTEET_FRA } from '../js/packs/maastokohteet-fra.js';
const tapaukset = [
  ['montblanc', 'fra-maasto-montblanc-69d1dc31dec3.jpg', 'fra-maasto-montblanc-f39f71151b35.jpg', 'CC BY-SA 2.0 France'],
  ['vignemale', 'fra-maasto-vignemale-18e16a3e8da6.jpg', 'fra-maasto-vignemale-8bcfbcf0ef86.jpg', 'CC BY-SA 3.0'],
];
test('Ranskan vuorilla havainne on ensin ja aito kuva toisena', () => {
  for (const [id, havainne, aito, lisenssi] of tapaukset) {
    const kohde = MAASTOKOHTEET_FRA.find((x) => x.id === id);
    const kuvat = kohteenKuvalista(kohde);
    assert.equal(kuvat.length, 2);
    assert.ok(kuvat[0].osoite.endsWith(`/${havainne}`));
    assert.ok(kuvat[1].osoite.endsWith(`/${aito}`));
    assert.match(kuvat[0].lahde, /^Matkakirjan havainnekuva/);
    assert.match(kuvat[1].lahde, /^Valokuva:/);
    assert.equal(kuvat[0].lisenssi, lisenssi);
    assert.equal(kuvat[1].lisenssi, lisenssi);
    assert.equal(kuvat[0].lahdeUrl, kuvat[1].lahdeUrl);
    assert.ok([...kuvat[0].lyhyt].length <= 100);
    assert.ok([...kuvat[1].lyhyt].length <= 100);
    assert.equal(new Set(kuvat.map((x) => x.osoite)).size, 2);
  }
});
