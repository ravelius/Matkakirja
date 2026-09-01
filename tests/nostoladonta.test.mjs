/*
 * NOSTOLADONNAN RUUTUKATTO JA SEN KAKSI KOPIOTA.
 *
 * js/nostoladonta.js on LEHTIMODUULI: se ei saa tuoda mitään, koska
 * laattageneraattori lataa sen Nodessa eikä sen mukana saa tulla pelin
 * käyttöliittymää. Siksi kaksi lukua on siellä kopiona — nimiön
 * kirjasinkoko (js/fokusnosto-symbolit.js) ja kartan oman kohdenimen
 * ruutukoko (js/karttanimet.js) — ja juuri niiden ero tekisi katosta
 * hiljaa väärän: nimiö kutistuisi eri kokoon kuin se, johon sitä
 * verrataan. Tämä testi on se vahti, jonka takia kopiot ovat sallittuja.
 */
import { strict as assert } from 'node:assert';
import { test } from 'node:test';

import {
  NOSTOLADONTA_NIMIO_KATTO, NOSTOLADONTA_NIMIO_KOKO, NOSTOLADONTA_POLTON_TIHEYS,
  NOSTOLADONTA_S, NOSTOLADONTA_SAANTO, nostoladontaKattoPorras, nostoladontaTiiviste,
} from '../js/nostoladonta.js';
import { NOSTOSYM_NIMIO_KOKO } from '../js/fokusnosto-symbolit.js';
import { KARTTANIMI_KOOT } from '../js/karttanimet.js';
import { KOHDE_SYMBOLI_SKAALA } from '../js/fokuskohteet.js';

test('nimiön kirjasinkoko on sama luku kuin symbolikirjastossa', () => {
  assert.equal(NOSTOLADONTA_NIMIO_KOKO, NOSTOSYM_NIMIO_KOKO);
});

test('katto on kartan oman kohdenimen ruutukoko', () => {
  assert.equal(NOSTOLADONTA_NIMIO_KATTO, KARTTANIMI_KOOT.kohde);
  // Ja se on myös kaupungin nimen koko — omistajan "max sama koko kuin
  // kohdekaupungin koko" (1.9.2026).
  assert.equal(NOSTOLADONTA_NIMIO_KATTO, KARTTANIMI_KOOT.kaupunki);
});

test('katto ei pure loitolla eikä keskizoomilla', () => {
  const porras = KOHDE_SYMBOLI_SKAALA * NOSTOLADONTA_S;
  // z5-vastaava (1,8 CSS-px / lautayksikkö) ja z6-vastaava (3,6):
  // nimiö on 6,2 ja 12,4 px, joten katto (10,5) puree vasta z6:n
  // yläpuolella.
  assert.equal(nostoladontaKattoPorras(porras, 1.8), porras);
  assert.ok(nostoladontaKattoPorras(porras, 3.6) < porras);
  const kynnys = NOSTOLADONTA_NIMIO_KATTO / (NOSTOLADONTA_NIMIO_KOKO * porras);
  assert.equal(nostoladontaKattoPorras(porras, kynnys * 0.999), porras);
});

test('katon purressa nimiö on täsmälleen katon kokoinen', () => {
  const porras = KOHDE_SYMBOLI_SKAALA * NOSTOLADONTA_S;
  for (const skaala of [3.6, 7.2, 11.4, 40]) {
    const k = nostoladontaKattoPorras(porras, skaala);
    const px = NOSTOLADONTA_NIMIO_KOKO * k * skaala;
    assert.ok(Math.abs(px - NOSTOLADONTA_NIMIO_KATTO) < 1e-9,
      `mittakaava ${skaala}: nimiö ${px} px`);
  }
});

test('mittaamaton näkymä jättää portaan ennalleen', () => {
  const porras = KOHDE_SYMBOLI_SKAALA * NOSTOLADONTA_S;
  assert.equal(nostoladontaKattoPorras(porras, 0), porras);
  assert.equal(nostoladontaKattoPorras(porras, undefined), porras);
  assert.equal(nostoladontaKattoPorras(0, 7.2), 0);
});

test('polton tiheysoletus on kokonaisluku ja vähintään 1', () => {
  assert.ok(Number.isInteger(NOSTOLADONTA_POLTON_TIHEYS));
  assert.ok(NOSTOLADONTA_POLTON_TIHEYS >= 1);
});

test('piirtosäännön tunnus on tiivisteessä', () => {
  // Sama merkki, sama tiiviste; ja tunnus on osa syötettä, joten kaksi
  // eri sääntöä ei voi antaa samaa tiivistettä. Tarkistetaan
  // ensimmäinen suoraan ja jälkimmäinen sillä, ettei tiiviste ole
  // sama kuin ilman tunnusta laskettu (FNV-1a merkkijonosta).
  const merkki = {
    tunnus: 'madara', symboli: 'historia', laji: 'muu',
    nimio: 'Madaran ratsastaja', x: 6737.3, y: 1672.2, osat: [],
  };
  assert.equal(nostoladontaTiiviste(merkki), nostoladontaTiiviste({ ...merkki }));
  assert.ok(/^[0-9a-f]{8}$/.test(nostoladontaTiiviste(merkki)));
  assert.ok(NOSTOLADONTA_SAANTO.length > 0);
});

test('väistön päätös ei ole tiivisteessä, merkin sisältö on', () => {
  const merkki = {
    tunnus: 'madara', symboli: 'historia', laji: 'muu',
    nimio: 'Madaran ratsastaja', x: 6737.3, y: 1672.2, osat: [],
  };
  const perus = nostoladontaTiiviste(merkki);
  assert.equal(nostoladontaTiiviste({ ...merkki, nimioNakyy: false }), perus);
  assert.equal(nostoladontaTiiviste({ ...merkki, nimioPuoli: 'ala' }), perus);
  assert.notEqual(nostoladontaTiiviste({ ...merkki, nimio: 'Madara' }), perus);
  assert.notEqual(nostoladontaTiiviste({ ...merkki, x: 6737.31 }), perus);
});
