import test from 'node:test';
import assert from 'node:assert/strict';
import { MAASTOKOHTEET_FIN } from '../js/packs/maastokohteet-fin.js';
import { MAASTOKOHTEET_CZE } from '../js/packs/maastokohteet-cze.js';
import { kohteenKuvalista } from '../js/fokuskohteet.js';

const KUVAT = [
  [MAASTOKOHTEET_FIN, 'olavinlinna', 'fin-kohde-olavinlinna-e88c76b06013.jpg'],
  [MAASTOKOHTEET_FIN, 'turunlinna', 'fin-kohde-turunlinna-1f7e32294ce6.jpg'],
  [MAASTOKOHTEET_FIN, 'petajavedenvanhakirkko', 'fin-kohde-petajavedenvanhakirkko-eb06c20d1502.jpg'],
  [MAASTOKOHTEET_CZE, 'snezka', 'cze-maasto-snezka-fd8fdae69415.jpg'],
  [MAASTOKOHTEET_CZE, 'labe', 'cze-maasto-labe-787fd7b9f6a7.jpg'],
  [MAASTOKOHTEET_CZE, 'vltava', 'cze-maasto-vltava-8f6ff00782e2.jpg'],
  [MAASTOKOHTEET_CZE, 'kutna-hora', 'cze-kohde-kutna-hora-02c6c8b4acda.jpg'],
];

test('seitsemän hyväksyttyä valokuvaa säilyvät kohdekorttien kuvalistoissa', () => {
  for (const [lista, id, tiedosto] of KUVAT) {
    const kohde = lista.find((x) => x.id === id);
    assert.ok(kohde, `${id}: tietuetta ei löydy`);
    const kuvat = kohteenKuvalista(kohde);
    const valokuva = kuvat.find((kuva) => kuva.osoite
      === `https://media.matkakirja.app/karttanostot/20260912/${tiedosto}`);
    assert.ok(valokuva, `${id}: aito valokuva puuttuu renderer-listasta`);
    assert.match(valokuva.lyhyt, /\S/);
    assert.match(valokuva.selite, /\S/);
    assert.match(valokuva.lahde, /^Valokuva:/);
    assert.match(valokuva.lahdeUrl, /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
    assert.match(valokuva.lisenssi, /^CC BY(?:-SA)? /);
    assert.match(valokuva.lisenssiUrl, /^https:\/\/creativecommons\.org\/licenses\//);
    assert.equal(new Set(kuvat.map((x) => x.osoite ?? x.tiedosto)).size, kuvat.length,
      `${id}: renderer-listassa on kaksoiskappale`);
  }
});

const CZE_KUVAT = [
  ['snezka', 'cze-maasto-snezka-d4df56329dd5.jpg', 'cze-maasto-snezka-fd8fdae69415.jpg'],
  ['labe', 'cze-maasto-labe-0bc730ebdf0a.jpg', 'cze-maasto-labe-787fd7b9f6a7.jpg'],
  ['vltava', 'cze-maasto-vltava-dcdde8f4e527.jpg', 'cze-maasto-vltava-8f6ff00782e2.jpg'],
  ['kutna-hora', 'cze-kohde-kutna-hora-27d638bbe487.jpg', 'cze-kohde-kutna-hora-02c6c8b4acda.jpg'],
];

test('Tšekin havainne avautuu ensin ja aito valokuva säilyy karusellissa', () => {
  for (const [id, havainne, aito] of CZE_KUVAT) {
    const kohde = MAASTOKOHTEET_CZE.find((x) => x.id === id);
    const kuvat = kohteenKuvalista(kohde);
    assert.equal(kuvat.length, 2, `${id}: havainne ja valokuva säilyvät`);
    assert.equal(kuvat[0].osoite,
      `https://media.matkakirja.app/karttanostot/20260912/${havainne}`);
    assert.equal(kuvat[1].osoite,
      `https://media.matkakirja.app/karttanostot/20260912/${aito}`);
    assert.match(kuvat[0].lahde, /^Matkakirjan havainnekuva/);
    assert.match(kuvat[0].lahde, /Wikimedia Commons \(CC BY-SA 3\.0\)/);
    assert.match(kuvat[0].lahdeUrl, /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
    assert.equal(kuvat[0].lisenssi, 'CC BY-SA 3.0');
    assert.equal(kuvat[0].lisenssiUrl, 'https://creativecommons.org/licenses/by-sa/3.0/');
    assert.match(kuvat[0].muokkaus, /johdannainen/);
    assert.match(kuvat[1].lahde, /^Valokuva:/);
    assert.equal(new Set(kuvat.map((x) => x.osoite ?? x.tiedosto)).size, 2);
  }
});

test('Laben johdannaisen ja valokuvan tekijä säilyy täsmällisenä', () => {
  const labe = MAASTOKOHTEET_CZE.find((x) => x.id === 'labe');
  assert.equal(labe.kuva.tekija,
    'OpenAI; referenssikuva Pavel Hrdlička, Wikipedia');
  assert.equal(labe.kuvat[0].tekija, 'Pavel Hrdlička, Wikipedia');
});
