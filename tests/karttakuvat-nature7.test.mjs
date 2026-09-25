import test from 'node:test';
import assert from 'node:assert/strict';

import { MAASTOKOHTEET_POL } from '../js/packs/maastokohteet-pol.js';
import { MAASTOKOHTEET_UKR } from '../js/packs/maastokohteet-ukr.js';
import { kohteenKuvalista } from '../js/fokuskohteet.js';

const KUVAT = [
  [MAASTOKOHTEET_POL, 'rysy', 'pol-maasto-rysy-d416f9d31745.jpg', 'pol-maasto-rysy-024f6a6ea9a6.jpg'],
  [MAASTOKOHTEET_POL, 'sniezka', 'pol-maasto-sniezka-d0a256c0ac10.jpg', 'pol-maasto-sniezka-ae71dca3eea8.jpg'],
  [MAASTOKOHTEET_UKR, 'hoverla', 'ukr-maasto-hoverla-dfd136ce749c.jpg', 'ukr-maasto-hoverla-09745035da4f.jpg'],
];

test('kolmen vuoren havainne avautuu ensin ja aito valokuva säilyy toisena', () => {
  for (const [lista, id, havainne, aito] of KUVAT) {
    const kohde = lista.find((x) => x.id === id);
    assert.ok(kohde, `${id}: tietuetta ei löydy`);
    const kuvat = kohteenKuvalista(kohde);
    assert.equal(kuvat.length, 2, `${id}: kuvia pitää olla kaksi`);
    assert.equal(kuvat[0].osoite,
      `https://media.matkakirja.app/karttanostot/20260912/${havainne}`);
    assert.equal(kuvat[1].osoite,
      `https://media.matkakirja.app/karttanostot/20260912/${aito}`);
    assert.match(kuvat[0].lahde, /^Matkakirjan havainnekuva/);
    assert.doesNotMatch(`${kuvat[0].lyhyt} ${kuvat[0].selite}`, /Matkakirjan havainnekuva/);
    assert.match(kuvat[1].lahde, /^Valokuva:/);
    assert.match(kuvat[1].lahdeUrl, /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
    assert.match(kuvat[1].lisenssi, /^CC BY(?:-SA)? 4\.0$/);
    assert.match(kuvat[1].lisenssiUrl, /^https:\/\/creativecommons\.org\/licenses\//);
    assert.ok([...kuvat[0].lyhyt].length <= 100, `${id}: havainteen lyhyt kuvateksti`);
    assert.ok([...kuvat[1].lyhyt].length <= 100, `${id}: valokuvan lyhyt kuvateksti`);
    assert.equal(new Set(kuvat.map((kuva) => kuva.osoite)).size, 2,
      `${id}: renderer-listassa on kaksoiskappale`);
  }
});

test('Dneprin aito valokuva on ainoa renderer-listan kuva', () => {
  const dnepr = MAASTOKOHTEET_UKR.find((x) => x.id === 'dnepr');
  assert.equal(dnepr.kuva.osoite,
    'https://media.matkakirja.app/karttanostot/20260912/ukr-maasto-dnepr-f2350376bd1c.jpg');
  assert.equal(dnepr.kuvat, undefined);
  const kuvat = kohteenKuvalista(dnepr);
  assert.equal(kuvat.length, 1);
  assert.equal(kuvat[0].osoite,
    'https://media.matkakirja.app/karttanostot/20260912/ukr-maasto-dnepr-f2350376bd1c.jpg');
  assert.equal(kuvat[0].tekija, 'Dmitry A. Mottl');
  assert.equal(kuvat[0].lisenssi, 'CC BY-SA 3.0');
  assert.match(kuvat[0].lahde, /^Valokuva:/);
  assert.ok([...kuvat[0].lyhyt].length <= 100);
});
