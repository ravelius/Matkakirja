import test from 'node:test';
import assert from 'node:assert/strict';
import { kohteenKuvalista } from '../js/fokuskohteet.js';
import { MAASTOKOHTEET_FRA } from '../js/packs/maastokohteet-fra.js';
// Omistaja hyväksyi 13.9.2026 kummastakin vuoresta vain aidon valokuvan;
// rinnakkainen HAVAINNEKUVA poistui pelikytkennöistä eikä saa palata — se
// kielto on yhä voimassa ja mitataan alla hylatty-tunnuksella.
//
// PAATOKSET 44 (omistaja 18.9.2026) laajensi vaatimusta toiseen suuntaan:
// jokaisella nostolla on oltava VÄHINTÄÄN KAKSI Commons-kuvaa. Pari on siis
// nyt aito valokuva + toinen aito Commons-kuva (PD / CC0 / CC BY / CC BY-SA),
// ei havainnekuva. Ensimmäisenä pysyy omistajan hyväksymä kuva.
const tapaukset = [
  ['montblanc', 'fra-maasto-montblanc-f39f71151b35.jpg', 'fra-maasto-montblanc-69d1dc31dec3', 'CC BY-SA 2.0 France'],
  ['vignemale', 'fra-maasto-vignemale-8bcfbcf0ef86.jpg', 'fra-maasto-vignemale-18e16a3e8da6', 'CC BY-SA 3.0'],
];
test('Ranskan vuorilla on hyväksytty aito valokuva ensin ja aito Commons-pari', () => {
  const SALLITUT = /^(Public domain|CC0|CC BY |CC BY-SA )/;
  for (const [id, aito, hylatty, lisenssi] of tapaukset) {
    const kohde = MAASTOKOHTEET_FRA.find((x) => x.id === id);
    assert.ok(kohde, `kohde ${id} puuttuu`);
    const kuvat = kohteenKuvalista(kohde);
    assert.equal(kuvat.length, 2, `${id}: kuvia ${kuvat.length}, pitää olla 2`);
    assert.ok(kuvat[0].osoite.endsWith(`/${aito}`));
    assert.match(kuvat[0].lahde, /^Valokuva:/);
    assert.equal(kuvat[0].lisenssi, lisenssi);
    for (const kuva of kuvat) {
      assert.ok(kuva.tekija && kuva.lisenssiUrl && kuva.lahdeUrl, `${id}: kuvatiedot puuttuvat`);
      assert.ok([...kuva.lyhyt].length <= 100);
      assert.match(kuva.lisenssi, SALLITUT, `${id}: lisenssi ${kuva.lisenssi} ei kelpaa`);
      assert.ok(!/havainnekuva/i.test(kuva.lahde), `${id}: havainnekuva palasi peliin`);
    }
    assert.equal(new Set(kuvat.map((x) => x.osoite)).size, 2);
    assert.ok(!JSON.stringify(kohde).includes(hylatty), `hylätty ${hylatty} yhä pelissä`);
  }
});
