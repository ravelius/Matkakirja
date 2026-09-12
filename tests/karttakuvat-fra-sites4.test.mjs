import test from 'node:test';
import assert from 'node:assert/strict';
import { kohteenKuvalista } from '../js/fokuskohteet.js';
import { MAASTOKOHTEET_FRA } from '../js/packs/maastokohteet-fra.js';

const tapaukset = [
  ['mont-saint-michel', 'fra-kohde-mont-saint-michel-a312017d024b.jpg', 'fra-kohde-mont-saint-michel-66406eae047e.jpg', 'Lynx1211'],
  ['carcassonnen-linnoituskaupunki', 'fra-kohde-carcassonnen-linnoituskaupunki-25ec0b1e82ce.jpg', 'fra-kohde-carcassonnen-linnoituskaupunki-29c43cfd2d39.jpg', 'Lesueur André'],
];

test('Ranskan kahdella kohteella havainne on ensin ja aito kuva toisena', () => {
  for (const [id, havainne, aito, tekija] of tapaukset) {
    const kohde = MAASTOKOHTEET_FRA.find((x) => x.id === id);
    assert.ok(kohde);
    const kuvat = kohteenKuvalista(kohde);
    assert.equal(kuvat.length, 2);
    assert.ok(kuvat[0].osoite.endsWith(`/${havainne}`));
    assert.ok(kuvat[1].osoite.endsWith(`/${aito}`));
    assert.match(kuvat[0].lahde, /^Matkakirjan havainnekuva/);
    assert.match(kuvat[1].lahde, /^Valokuva:/);
    assert.equal(kuvat[0].lisenssi, 'CC BY-SA 4.0');
    assert.equal(kuvat[1].lisenssi, 'CC BY-SA 4.0');
    assert.equal(kuvat[0].lahdeUrl, kuvat[1].lahdeUrl);
    assert.match(kuvat[0].tekija, new RegExp(tekija));
    assert.equal(kuvat[1].tekija, tekija);
    assert.ok(kuvat.every((x) => x.lisenssiUrl === 'https://creativecommons.org/licenses/by-sa/4.0/'));
    assert.ok(kuvat.every((x) => [...x.lyhyt].length <= 100));
    assert.equal(new Set(kuvat.map((x) => x.osoite)).size, 2);
  }
});
