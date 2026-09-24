/*
 * KARTTASELITTEEN UUDISTUS 22.9.2026: välilehdet, yksi-kerrallaan
 * -valinta ja peukalolevy (js/karttaselite.js, js/karttavalot.js,
 * js/karttaselite-levy.js).
 *
 * Tässä testataan vain PUHDAS LOGIIKKA ilman DOMia — sama rajaus kuin
 * muillakin puhtailla moduuleilla (esim. tests/ilme.test.mjs): rivien
 * piirto, liu'un raahaus ja kartan valokerrokset vaativat selaimen ja
 * niitä todennetaan savukkeella (tools/savukkeet/savuke-selitevalikko.mjs).
 *
 *   1. KARTTASELITE_JARJESTYS sisältää kaikki KARTTAVALO_AIHEET tasan
 *      kerran, plus 'kaikki' ensimmäisenä ja 'ei' viimeisenä.
 *   2. karttavaloValitse/karttavaloValinta: yksi kerrallaan, kaikki/ei
 *      kirjoittavat koko joukon, ja vanha monivalintatila
 *      normalisoituu ensimmäiseen annetussa järjestyksessä.
 *   3. lahinRivi (js/karttaselite-levy.js): peukalolevyn lähimmän
 *      rivin valinta pystykoordinaatista.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { KARTTASELITE_JARJESTYS } from '../js/karttaselite.js';
import {
  KARTTAVALO_AIHEET, karttavaloValitse, karttavaloValinta, karttavalotLue,
} from '../js/karttavalot.js';
import { lahinRivi } from '../js/karttaselite-levy.js';

test('KARTTASELITE_JARJESTYS: kaikki KARTTAVALO_AIHEET tasan kerran, kaikki ja ei reunoilla', () => {
  assert.equal(KARTTASELITE_JARJESTYS[0], 'kaikki', 'ylin rivi on Kaikki');
  assert.equal(KARTTASELITE_JARJESTYS.at(-1), 'ei', 'alin rivi on Ei mitään');
  const aiheet = KARTTASELITE_JARJESTYS.slice(1, -1);
  const odotetut = KARTTAVALO_AIHEET.map((r) => r.aihe);
  assert.deepEqual([...aiheet].sort(), [...odotetut].sort(),
    'valikon rivit ja KARTTAVALO_AIHEET ovat sama joukko');
  assert.equal(new Set(aiheet).size, aiheet.length, 'ei kaksoiskappaleita');
  assert.equal(new Set(KARTTASELITE_JARJESTYS).size, KARTTASELITE_JARJESTYS.length,
    'ei kaksoiskappaleita edes kaikki/ei mukaan lukien');
});

test('karttavaloValitse: yksi kerrallaan — vaihto korvaa edellisen, ei lisää siihen', () => {
  karttavaloValitse('kaupungit');
  assert.deepEqual([...karttavalotLue()], ['kaupungit']);
  assert.equal(karttavaloValinta(), 'kaupungit');

  karttavaloValitse('historia');
  assert.deepEqual([...karttavalotLue()], ['historia']);
  assert.equal(karttavaloValinta(), 'historia');

  karttavaloValitse('ei-olemassa-oleva-aihe');
  assert.deepEqual([...karttavalotLue()], ['historia'], 'tuntematon aihe ei muuta tilaa');
});

test('karttavaloValitse: kaikki ja ei kirjoittavat koko joukon', () => {
  karttavaloValitse('kaikki');
  assert.equal(karttavalotLue().size, KARTTAVALO_AIHEET.length);
  assert.equal(karttavaloValinta(), 'kaikki');

  karttavaloValitse('ei');
  assert.equal(karttavalotLue().size, 0);
  assert.equal(karttavaloValinta(), 'ei');
});

test('karttavaloValinta: vanha monivalintatila normalisoidaan ensimmäiseen annetussa järjestyksessä', () => {
  karttavaloValitse('ei');
  karttavalotLue().add('kauppa');
  karttavalotLue().add('kaupungit');
  assert.equal(karttavalotLue().size, 2, 'testi asettaa tahallaan vanhan monivalintatilan');

  assert.equal(karttavaloValinta(['kaupungit', 'kauppa']), 'kaupungit');
  assert.deepEqual([...karttavalotLue()], ['kaupungit'],
    'normalisointi KIRJOITTAA tilan yhteen aiheeseen, ei vain lue sitä');

  karttavalotLue().add('luonto');
  assert.equal(karttavaloValinta(['luonto', 'kaupungit']), 'luonto');
});

test('lahinRivi: valitsee pystykoordinaattia lähimmän rivin', () => {
  const rivit = [
    { valinta: 'a', y: 10 },
    { valinta: 'b', y: 40 },
    { valinta: 'c', y: 90 },
  ];
  assert.equal(lahinRivi(12, rivit), 'a');
  assert.equal(lahinRivi(38, rivit), 'b');
  assert.equal(lahinRivi(65, rivit), 'b', 'tasavälin lähempi on ensin löytynyt');
  assert.equal(lahinRivi(1000, rivit), 'c');
  assert.equal(lahinRivi(5, []), null, 'tyhjä lista ei kaada eikä arvaa');
});
