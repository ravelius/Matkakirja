/*
 * Miniatyyripiirrosten eheystarkistus (omistajan tilaus 15.8.2026).
 *
 * Kolme asiaa, jotka rikkoutuisivat hiljaa ilman konetta:
 *   1. Jokainen taulun polku osoittaa olemassa olevaan tiedostoon —
 *      kuollut polku näkyisi vasta napauttamalla juuri sitä pistettä.
 *   2. Jokainen kohteen nimi vastaa kartan kohdetta JA nähtävyys-
 *      juttua: kortin lauseet tulevat jutusta ja piirroksesta
 *      avataan juttu, joten nimen kirjoitusasun on täsmättävä.
 *   3. Jokainen kuva on myös sw:n esilatauslistalla — kartta toimii
 *      offline, joten sen korttien pitää toimia myös.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { MINIATYYRIT } from '../js/packs/miniatyyrit.js';
import { KAUPUNKIKARTAT } from '../js/packs/maakartat.js';
import { NAHTAVYYSJUTUT } from '../js/packs/nahtavyysjutut.js';

const SW = readFileSync(new URL('../sw.js', import.meta.url), 'utf8');

test('jokainen miniatyyri osoittaa olemassa olevaan tiedostoon', () => {
  for (const [kaupunki, kohteet] of Object.entries(MINIATYYRIT)) {
    for (const [nimi, polku] of Object.entries(kohteet)) {
      assert.ok(existsSync(new URL(`../${polku}`, import.meta.url)),
        `${kaupunki}/${nimi}: tiedostoa ${polku} ei ole`);
    }
  }
});

test('jokainen miniatyyrin nimi vastaa kartan kohdetta ja juttua', () => {
  for (const [kaupunki, kohteet] of Object.entries(MINIATYYRIT)) {
    const kartalla = new Set((KAUPUNKIKARTAT[kaupunki]?.kohteet ?? []).map((k) => k.nimi));
    for (const nimi of Object.keys(kohteet)) {
      assert.ok(kartalla.has(nimi),
        `${kaupunki}: "${nimi}" ei ole kartan kohde (maakartat.js)`);
      assert.ok(NAHTAVYYSJUTUT[kaupunki]?.[nimi],
        `${kaupunki}: "${nimi}" ilman nähtävyysjuttua — kortin lauseet `
        + 'ja piirroksen linkki tarvitsevat jutun');
    }
  }
});

test('jokainen miniatyyri on sw:n esilatauslistalla', () => {
  for (const kohteet of Object.values(MINIATYYRIT)) {
    for (const polku of Object.values(kohteet)) {
      assert.ok(SW.includes(`'./${polku}'`),
        `${polku} puuttuu sw.js:n SHELL-listalta — kortti ei toimisi offline.`);
    }
  }
});
