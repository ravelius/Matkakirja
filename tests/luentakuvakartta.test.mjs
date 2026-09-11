/*
 * SINISET KAUPUNKILAATAT POIS, ALKUPERÄISET VÄRIT TAKAISIN (omistaja
 * 11.9.2026: *"siniset kaupunkilaatat voi palauttaa takaisin
 * alkuperäiseen väriin"*).
 *
 * Sininen oli 9.9.2026 tehty työmerkintä siitä, missä isoisän
 * luentakuva jo oli ("Voisit nyt merkata eri värillä sellaiset
 * kaupungit, joissa tällaiset kuvat on"). Kuvia on nyt kaikissa 45
 * Euroopan kaupungissa (v1766), joten merkintä väritti koko reitin
 * eikä erottanut enää mitään. Joukko itse jää: sitä käytetään muualla
 * ja se on halpa johtaa pakeista.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { FOKUSVIRRAT, luentakuvallisetKaupungit } from '../js/packs/fokusvirrat.js';
import { LIVIAN_KOROSTUS_KAYTOSSA, livianKorostetutKaupungit } from '../js/liviapuhe.js';
import { kaupunkipisteenVari, KAUPUNKIPISTEEN_VARI } from '../js/pallolauta/lauta.js';

const lue = (polku) => readFileSync(new URL(polku, import.meta.url), 'utf8');

test('luentakuvalliset kaupungit johdetaan pakeista', () => {
  const joukko = luentakuvallisetKaupungit();
  const odotus = Object.entries(FOKUSVIRRAT)
    .filter(([, v]) => v?.matkakirja?.luentakuva).map(([id]) => id);
  assert.deepEqual([...joukko].sort(), odotus.sort());
  assert.equal(joukko.size, Object.keys(FOKUSVIRRAT).length,
    'kuva on nyt kaikissa kaupungeissa — siksi erillinen väri ei erota mitään');
});

test('kaupungin piste on alkuperäisessä värissään: ei sinistä merkintää', () => {
  assert.equal(LIVIAN_KOROSTUS_KAYTOSSA, false);
  assert.equal(livianKorostetutKaupungit().size, 0);
  for (const id of Object.keys(FOKUSVIRRAT)) {
    assert.equal(kaupunkipisteenVari({ id }), KAUPUNKIPISTEEN_VARI, id);
  }
  // Käyty/alku-värit ovat pelin tilaa ja jäävät.
  assert.notEqual(kaupunkipisteenVari({ id: 'ateena', kayty: true }), KAUPUNKIPISTEEN_VARI);
  assert.notEqual(kaupunkipisteenVari({ id: 'ateena', alku: true }), KAUPUNKIPISTEEN_VARI);
});

test('kumpikaan lauta ei enää piirrä luentakuvamerkintää', () => {
  const lauta = lue('../js/pallolauta/lauta.js');
  assert.ok(!lauta.includes('LUENTAKUVAN_VARI'), 'pallon sininen piste on yhä koodissa');
  const ui = lue('../js/ui.js');
  assert.ok(!ui.includes("'city-luentakuva'"), 'tasokartan sininen kehä on yhä koodissa');
});
