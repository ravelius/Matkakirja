import test from 'node:test';
import assert from 'node:assert/strict';
import { MAASTOKOHTEET_FIN } from '../js/packs/maastokohteet-fin.js';
import { MAASTOKOHTEET_CZE } from '../js/packs/maastokohteet-cze.js';
import { kohteenKuvalista } from '../js/fokuskohteet.js';

const KUVAT = [
  [MAASTOKOHTEET_FIN, 'olavinlinna', 'fin-kohde-olavinlinna-e88c76b06013.jpg'],
  [MAASTOKOHTEET_FIN, 'turunlinna', 'fin-kohde-turunlinna-1f7e32294ce6.jpg'],
  [MAASTOKOHTEET_FIN, 'petajavedenvanhakirkko', 'fin-kohde-petajavedenvanhakirkko-eb06c20d1502.jpg'],
  [MAASTOKOHTEET_CZE, 'snezka', 'cze-maasto-snezka-13142fb9530f.jpg'],
  [MAASTOKOHTEET_CZE, 'labe', 'cze-maasto-labe-787fd7b9f6a7.jpg'],
  [MAASTOKOHTEET_CZE, 'vltava', 'cze-maasto-vltava-20c8bea20384.jpg'],
  [MAASTOKOHTEET_CZE, 'kutna-hora', 'cze-kohde-kutna-hora-398dd5161ce6.jpg'],
];

test('seitsemän hyväksyttyä valokuvaa ovat kohdekorttien ensisijaiset kuvat', () => {
  for (const [lista, id, tiedosto] of KUVAT) {
    const kohde = lista.find((x) => x.id === id);
    assert.ok(kohde, `${id}: tietuetta ei löydy`);
    const kuvat = kohteenKuvalista(kohde);
    assert.equal(kuvat[0]?.osoite, `https://media.matkakirja.app/karttanostot/20260912/${tiedosto}`);
    assert.match(kuvat[0].lyhyt, /\S/);
    assert.match(kuvat[0].selite, /\S/);
    assert.match(kuvat[0].lahde, /^Valokuva:/);
    assert.match(kuvat[0].lahdeUrl, /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
    assert.match(kuvat[0].lisenssiUrl, /^https:\/\/creativecommons\.org\/licenses\//);
    assert.equal(new Set(kuvat.map((x) => x.osoite ?? x.tiedosto)).size, kuvat.length,
      `${id}: renderer-listassa on kaksoiskappale`);
  }
});

test('Laben valokuvan edellyttämä attribuutio säilyy täsmällisenä', () => {
  assert.equal(MAASTOKOHTEET_CZE.find((x) => x.id === 'labe').kuva.tekija,
    'Pavel Hrdlička, Wikipedia');
});
