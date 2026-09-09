/*
 * LUENTAKUVALLISET KAUPUNGIT ERI VÄRILLÄ KARTALLE (omistaja 9.9.2026,
 * Raamattu "LUENTAKUVALLISET KAUPUNGIT ERI VARILLA KARTALLE, MUUT
 * VARIMERKINNAT NOLLATAAN"): joukko johdetaan pakeista, pallon piste
 * saa luentakuvan värin, ja tarkistuskorostus on nollattu.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { FOKUSVIRRAT, luentakuvallisetKaupungit } from '../js/packs/fokusvirrat.js';
import { LIVIAN_KOROSTUS_KAYTOSSA, livianKorostetutKaupungit } from '../js/liviapuhe.js';
import { kaupunkipisteenVari, LUENTAKUVAN_VARI, KAUPUNKIPISTEEN_VARI } from '../js/pallolauta/lauta.js';

test('luentakuvalliset kaupungit johdetaan pakeista', () => {
  const joukko = luentakuvallisetKaupungit();
  const odotus = Object.entries(FOKUSVIRRAT)
    .filter(([, v]) => v?.matkakirja?.luentakuva).map(([id]) => id);
  assert.deepEqual([...joukko].sort(), odotus.sort());
});

test('pallon piste: luentakuva sinisenä, muut ennallaan; tarkistuskorostus nollattu', () => {
  assert.equal(LIVIAN_KOROSTUS_KAYTOSSA, false);
  assert.equal(livianKorostetutKaupungit().size, 0);
  const joukko = luentakuvallisetKaupungit();
  for (const id of Object.keys(FOKUSVIRRAT)) {
    const vari = kaupunkipisteenVari({ id });
    assert.equal(vari, joukko.has(id) ? LUENTAKUVAN_VARI : KAUPUNKIPISTEEN_VARI, id);
  }
  // Käyty/alku-värit ovat pelin tilaa ja jäävät (kaupunki ilman luentakuvaa).
  const ilman = Object.keys(FOKUSVIRRAT).find((id) => !joukko.has(id));
  assert.notEqual(kaupunkipisteenVari({ id: ilman, kayty: true }), KAUPUNKIPISTEEN_VARI);
});
