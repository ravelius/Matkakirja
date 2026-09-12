import test from 'node:test';
import assert from 'node:assert/strict';

import { kohteenKuvalista } from '../js/fokuskohteet.js';
import { MAASTOKOHTEET_POL } from '../js/packs/maastokohteet-pol.js';
import { MAASTOKOHTEET_UKR } from '../js/packs/maastokohteet-ukr.js';

const TAPaukset = [
  [MAASTOKOHTEET_POL, 'itameri',
    'pol-maasto-itameri-478fe5caffe9.jpg', 'pol-maasto-itameri-89e455fc25a8.jpg', 2],
  [MAASTOKOHTEET_POL, 'veiksel',
    'pol-maasto-veiksel-30c4f5e8b267.jpg', 'pol-maasto-veiksel-7d5c82de93e4.jpg', 3],
  [MAASTOKOHTEET_UKR, 'mustameri',
    'ukr-maasto-mustameri-d9d62ef8f8bd.jpg', 'ukr-maasto-mustameri-e9b34a7c286f.jpg', 2],
  [MAASTOKOHTEET_UKR, 'asovanmeri',
    'ukr-maasto-asovanmeri-216f7d9b1a0d.jpg', 'ukr-maasto-asovanmeri-e7912ccb63a8.jpg', 2],
];

test('seas8 näyttää havainteen ensin ja toimitetun aidon kuvan toisena', () => {
  for (const [pakka, id, havainne, aito, maara] of TAPaukset) {
    const kohde = pakka.find((x) => x.id === id);
    assert.ok(kohde, `${id}: tietuetta ei löydy`);
    const kuvat = kohteenKuvalista(kohde);
    assert.equal(kuvat.length, maara, `${id}: renderer-listan kuvamäärä`);
    assert.equal(kuvat[0].osoite,
      `https://media.matkakirja.app/karttanostot/20260912/${havainne}`);
    assert.equal(kuvat[1].osoite,
      `https://media.matkakirja.app/karttanostot/20260912/${aito}`);
    assert.match(kuvat[0].lahde, /^Matkakirjan havainnekuva/);
    assert.match(kuvat[1].lahde, /^Valokuva:/);
    assert.doesNotMatch(`${kuvat[0].lyhyt} ${kuvat[0].selite}`, /havainnekuva/i);
    assert.ok([...kuvat[0].lyhyt].length <= 100, `${id}: havainteen lyhyt`);
    assert.ok([...kuvat[1].lyhyt].length <= 100, `${id}: aidon kuvan lyhyt`);
    assert.equal(new Set(kuvat.map((kuva) => kuva.osoite ?? kuva.tiedosto)).size, maara,
      `${id}: renderer-listassa on kaksoiskappale`);
  }
});

test('seas8 säilyttää lisenssit ja Veikselin aiemman eri Commons-kuvan', () => {
  for (const [pakka, id] of TAPaukset) {
    const [havainne, aito] = kohteenKuvalista(pakka.find((x) => x.id === id));
    assert.match(havainne.tekija, /^OpenAI; referenssikuva /);
    assert.equal(havainne.lisenssi, aito.lisenssi);
    assert.equal(havainne.lisenssiUrl, aito.lisenssiUrl);
    assert.equal(havainne.lahdeUrl, aito.lahdeUrl);
  }
  const veiksel = kohteenKuvalista(MAASTOKOHTEET_POL.find((x) => x.id === 'veiksel'));
  assert.equal(veiksel[2].tiedosto, 'VistulaKrakow.JPG');
  assert.equal(veiksel[2].lahdeUrl,
    'https://commons.wikimedia.org/wiki/File:VistulaKrakow.JPG');
});
