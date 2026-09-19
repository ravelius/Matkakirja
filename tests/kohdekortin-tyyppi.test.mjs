/*
 * KOHDEKORTIN YLÄRIVI KERTOO KOHTEEN OMAN TYYPIN (Sonnet 1, kierros 13,
 * laitekuvat 19.9.2026): tekniikka- ja merenkulkunostot näyttivät
 * "KAUPPA", koska ylärivi luki kartan seliteryhmän kärkisymbolin
 * ("Kauppa ja tekniikka" → kauppa). Vartio: jokainen aineistossa
 * esiintyvä tyyppi saa oman nimikkeensä, eikä yksikään muu kuin kauppa
 * piirry nimellä "Kauppa".
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { KOHDE_MAAT, kohteenYlarivinNimike } from '../js/fokuskohteet.js';

const ODOTETUT = {
  historia: 'Historia',
  ruoka: 'Ruoka ja juoma',
  kulttuuri: 'Kulttuuri',
  tekniikka: 'Tekniikka',
  kauppa: 'Kauppa',
  merenkulku: 'Merenkulku',
  urheilu: 'Urheilu',
  sana: 'Tarinat',
  elain: 'Eläimet',
  vuori: 'Luonto · vuori',
  meri: 'Luonto · meri',
  saari: 'Luonto · saari',
  joki: 'Luonto · joki',
  jarvi: 'Luonto · järvi',
};

test('jokainen kohdetyyppi piirtyy omalla nimikkeellään', () => {
  for (const [tyyppi, nimike] of Object.entries(ODOTETUT)) {
    assert.equal(kohteenYlarivinNimike({ tyyppi }), nimike, tyyppi);
  }
});

test('aineiston jokaisella tyypillä on nimike, eikä muu kuin kauppa ole "Kauppa"', () => {
  const tyypit = new Map();
  for (const kohteet of Object.values(KOHDE_MAAT)) {
    for (const k of kohteet ?? []) {
      if (!k?.tyyppi || tyypit.has(k.tyyppi)) continue;
      // Pelkkä tyyppi: kohteen oma symboli- tai ihmekenttä ei saa sotkea vartiota.
      tyypit.set(k.tyyppi, kohteenYlarivinNimike({ tyyppi: k.tyyppi }));
    }
  }
  assert.ok(tyypit.size >= 10, `tyyppejä ${tyypit.size}`);
  for (const [tyyppi, nimike] of tyypit) {
    if (tyyppi === 'multimedia' || tyyppi === 'kaupunki') continue;
    assert.ok(nimike, `tyypillä ${tyyppi} ei ole nimikettä`);
    if (tyyppi !== 'kauppa') assert.notEqual(nimike, 'Kauppa', `${tyyppi} näkyy kauppana`);
  }
});

test('Karlskoga, Fiskars, Kalavryta ja Cobh eivät ole kauppaa', () => {
  const haku = (sana) => Object.values(KOHDE_MAAT).flat()
    .find((k) => new RegExp(sana, 'i').test(`${k?.id} ${k?.nimi}`));
  for (const [sana, odotettu] of [['karlskoga', 'Tekniikka'], ['fiskars', 'Tekniikka'],
    ['kalavryt', 'Tekniikka'], ['cobh', 'Merenkulku']]) {
    const k = haku(sana);
    assert.ok(k, `${sana} puuttuu aineistosta`);
    assert.equal(kohteenYlarivinNimike(k), odotettu, `${sana}: ${k.tyyppi}`);
  }
});
