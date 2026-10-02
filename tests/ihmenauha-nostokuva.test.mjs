/*
 * Kulmanauha kohdekortin nostokuvassa (28.9.2026): nauha oli 0 × 0 px,
 * koska mittamuuttujat ja mittasäiliö olivat vain vanhalla
 * .fokuskohde-kuva-paikalla. Kaanon: Raamattu, Matkakirjan ihmeet.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const tyyli = lue('../css/fokuskohteet.css');
const lahde = lue('../js/fokuskohteet.js');

test('nostokuvan napille lasketaan nauhan mitat kuvan leveydestä', () => {
  const lohko = tyyli.match(/\.nostokuva-kehys\.fokuskohde-kuva-nauhalla > \.nostokuva-nappi \{([^}]*)\}/)?.[1] ?? '';
  for (const [nimi, osuus] of [['pituus', '0.368'], ['korkeus', '0.048'], ['teksti', '0.0156']]) {
    assert.match(lohko, new RegExp(`--nauha-${nimi}: calc\\(${osuus.replace('.', '\\.')} \\* var\\(--nauha-kuva, 0px\\)\\);`), nimi);
  }
  assert.match(lohko, /--nauha-marginaali: 0px;/);
  // Ei mittasäiliötä: inline-size-säiliö nollaisi fit-content-napin leveyden.
  assert.doesNotMatch(lohko, /container-type/);
});

