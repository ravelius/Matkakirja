import test from 'node:test';
import assert from 'node:assert/strict';
import { MAASTOKOHTEET_CZE } from '../js/packs/maastokohteet-cze.js';
import { kohteenKuvalista } from '../js/fokuskohteet.js';

const ODOTETUT = [
  ['cesky-krumlov', 'cze-kohde-cesky-krumlov-0855c1b7e53b.jpg', 'cze-kohde-cesky-krumlov-93adb842e252.jpg'],
  ['plzensky-prazdroj', 'cze-kohde-plzensky-prazdroj-5711ddfee90f.jpg', 'cze-kohde-plzensky-prazdroj-a4f9adc0995f.jpg'],
  ['mendelin-luostari', 'cze-kohde-mendelin-luostari-56a42eb73e55.jpg', 'cze-kohde-mendelin-luostari-c9bb1706dad9.jpg'],
  ['litomysl', 'cze-kohde-litomysl-91c788e7564e.jpg', 'cze-kohde-litomysl-763c119efc7f.jpg'],
];

test('neljän CZE-kohteen karusellissa havainne on ennen aitoa valokuvaa', () => {
  for (const [id, havainne, valokuva] of ODOTETUT) {
    const kohde = MAASTOKOHTEET_CZE.find((x) => x.id === id);
    assert.ok(kohde, `${id}: tietuetta ei löydy`);
    const kuvat = kohteenKuvalista(kohde);
    assert.equal(kuvat.length, 2, `${id}: karusellissa pitää olla täsmälleen kaksi kuvaa`);
    assert.equal(kuvat[0].osoite, `https://media.matkakirja.app/karttanostot/20260912/${havainne}`);
    assert.equal(kuvat[1].osoite, `https://media.matkakirja.app/karttanostot/20260912/${valokuva}`);
    assert.match(kuvat[0].lahde, /^Matkakirjan havainnekuva/);
    assert.match(kuvat[1].lahde, /^Valokuva:/);
    assert.equal(new Set(kuvat.map((x) => x.osoite)).size, 2);
  }
});

test('Mendelin kuvatekstit erottavat elävän munkin ja patsaan', () => {
  const kohde = MAASTOKOHTEET_CZE.find((x) => x.id === 'mendelin-luostari');
  const kuvat = kohteenKuvalista(kohde);
  assert.match(kuvat[0].selite, /Gregor Mendelistä tutkimassa herneitä/);
  assert.match(kuvat[0].selite, /noin vuonna 1860/);
  assert.doesNotMatch(kuvat[0].selite, /patsas/i);
  assert.match(kuvat[1].selite, /patsas/);
});
