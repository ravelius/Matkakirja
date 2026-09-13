import test from 'node:test';
import assert from 'node:assert/strict';
import { kohteenKuvalista } from '../js/fokuskohteet.js';
import { MAASTOKOHTEET_FRA } from '../js/packs/maastokohteet-fra.js';

// Omistaja hyväksyi 13.9.2026 Mont-Saint-Michelistä vain aidon valokuvan;
// rinnakkainen havainnekuva poistui pelikytkennöistä. Carcassonne säilyy parina.
test('Mont-Saint-Michelillä on vain hyväksytty aito valokuva', () => {
  const kohde = MAASTOKOHTEET_FRA.find((x) => x.id === 'mont-saint-michel');
  assert.ok(kohde);
  const kuvat = kohteenKuvalista(kohde);
  assert.equal(kuvat.length, 1);
  assert.ok(kuvat[0].osoite.endsWith('/fra-kohde-mont-saint-michel-66406eae047e.jpg'));
  assert.match(kuvat[0].lahde, /^Valokuva:/);
  assert.equal(kuvat[0].lisenssi, 'CC BY-SA 4.0');
  assert.equal(kuvat[0].tekija, 'Lynx1211');
  assert.equal(kuvat[0].lisenssiUrl, 'https://creativecommons.org/licenses/by-sa/4.0/');
  assert.ok([...kuvat[0].lyhyt].length <= 100);
  assert.ok(!JSON.stringify(kohde).includes('fra-kohde-mont-saint-michel-a312017d024b'));
});

test('Carcassonnella havainne on ensin ja aito kuva toisena', () => {
  const kohde = MAASTOKOHTEET_FRA.find((x) => x.id === 'carcassonnen-linnoituskaupunki');
  assert.ok(kohde);
  const kuvat = kohteenKuvalista(kohde);
  assert.equal(kuvat.length, 2);
  assert.ok(kuvat[0].osoite.endsWith('/fra-kohde-carcassonnen-linnoituskaupunki-25ec0b1e82ce.jpg'));
  assert.ok(kuvat[1].osoite.endsWith('/fra-kohde-carcassonnen-linnoituskaupunki-29c43cfd2d39.jpg'));
  assert.match(kuvat[0].lahde, /^Matkakirjan havainnekuva/);
  assert.match(kuvat[1].lahde, /^Valokuva:/);
  assert.equal(kuvat[0].lisenssi, 'CC BY-SA 4.0');
  assert.equal(kuvat[1].lisenssi, 'CC BY-SA 4.0');
  assert.equal(kuvat[0].lahdeUrl, kuvat[1].lahdeUrl);
  assert.match(kuvat[0].tekija, /Lesueur André/);
  assert.equal(kuvat[1].tekija, 'Lesueur André');
  assert.ok(kuvat.every((x) => x.lisenssiUrl === 'https://creativecommons.org/licenses/by-sa/4.0/'));
  assert.ok(kuvat.every((x) => [...x.lyhyt].length <= 100));
  assert.equal(new Set(kuvat.map((x) => x.osoite)).size, 2);
});
