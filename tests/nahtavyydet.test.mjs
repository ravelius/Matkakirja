/*
 * KOHDEKARTAN MERKIT (js/nahtavyydet.js).
 *
 * Omistajan kuvakaappaus 6.9.2026 klo 01.09 (iPhone, Ateenan
 * kaupunkilehti): *"Kartalla pisteitä jotka eivät toimi"*. Kaksi eri
 * vikaa saman näköisenä:
 *
 *   1. Miniatyyri ei latautunut (ämpärin r2.dev vastasi 429:llä koko
 *      purskeeseen), ja merkki putosi varatäpläksi ENSIMMÄISESTÄ
 *      virheestä. Kuva oli koko ajan ämpärissä.
 *   2. Kolmella Sevillan kohteella ei ollut juttua eikä wiki-otsikkoa,
 *      joten merkki ei ollut napautettava lainkaan.
 *
 * Nämä testit pitävät molemmat korjaukset paikallaan.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { KAUPUNKIKARTAT } from '../js/packs/maakartat.js';
import { NAHTAVYYSJUTUT } from '../js/packs/nahtavyysjutut.js';

const LAHDE = readFileSync(new URL('../js/nahtavyydet.js', import.meta.url), 'utf8');

test('miniatyyri ladataan sitkeästi: täplä vasta kaikkien yritysten jälkeen', () => {
  /*
   * Lataus kulkee js/media.js:n lataaKuvaSitkeasti-funktion läpi, joka
   * uusii saman osoitteen kasvavalla odotuksella ja kutsuu onVirhe-
   * haaraa vasta viimeisen yrityksen jälkeen. Suora `pikku.src = …`
   * yhdessä error-kuuntelijan kanssa oli juuri se, mikä pudotti
   * ohimenevän 429:n saaneen kohteen täpläksi.
   */
  assert.match(LAHDE, /lataaKuvaSitkeasti\(pikku, miniatyyri, \{\s*onVirhe:/,
    'kohdekartan miniatyyri kulkee sitkeän latauksen läpi');
  assert.doesNotMatch(LAHDE, /pikku\.addEventListener\('error'/,
    'täplään ei saa pudota suoraan ensimmäisestä virheestä');
  assert.doesNotMatch(LAHDE, /pikku\.src\s*=/,
    'osoite asetetaan vain sitkeän latauksen kautta (uusinta ja jono)');
});

test('täplä säilyttää nimen ja napin: vain piirros poistuu', () => {
  // onVirhe poistaa KUVAN ja kohde-piirros-luokan — ei merkkiä
  // itseään. Nimilappu ja napin tyyppi (avattava → <button>) tulevat
  // merkistä, joten kohde pysyy napautettavana täplänäkin.
  const virhehaara = LAHDE.match(/lataaKuvaSitkeasti\(pikku, miniatyyri, \{[\s\S]{0,300}?\}\);/)?.[0] ?? '';
  assert.match(virhehaara, /pikku\.remove\(\)/);
  assert.match(virhehaara, /piste\.classList\.remove\('kohde-piirros'\)/);
  assert.doesNotMatch(virhehaara, /piste\.remove\(\)/, 'merkki jää kartalle');
  assert.match(LAHDE, /const avattava = Boolean\(k\.teksti \|\| k\.wiki\);/);
  assert.match(LAHDE, /html\(avattava \? 'button' : 'span',/);
});

test('jokainen kohdekartan merkki on napautettava (juttu tai wiki)', () => {
  /*
   * Sääntö: jokainen kartalla näkyvä merkki on nimetty JA napautettava.
   * Sevillan Maestranza, Trianan silta ja Plaza de España olivat
   * 29.8.–6.9.2026 kartaston ainoat, joilla ei ollut kumpaakaan; ne
   * saivat englanninkielisen wiki-otsikon (js/wiki.js fetchSummary
   * kokeilee fi:n ensin ja siirtyy englantiin).
   */
  const ilman = [];
  for (const [kaupunki, kartta] of Object.entries(KAUPUNKIKARTAT)) {
    for (const kohde of kartta.kohteet ?? []) {
      const juttu = NAHTAVYYSJUTUT[kaupunki]?.[kohde.nimi];
      if (!(juttu?.teksti ?? kohde.teksti) && !kohde.wiki) {
        ilman.push(`${kaupunki}: ${kohde.nimi}`);
      }
    }
  }
  assert.deepEqual(ilman, [],
    'kohteelle on kirjoitettava juttu tai annettava wiki-otsikko — '
    + 'muuten kartalle jää merkki, jota ei voi napauttaa');
});

test('Sevillan kolme kohdetta osoittavat englanninkielisiin artikkeleihin', () => {
  // Otsikot tarkistettu Wikipedian rajapinnasta 6.9.2026: fi vastaa
  // 404:llä ja en palauttaa tavallisen artikkelin (ei täsmennyssivua).
  const nimella = (nimi) => KAUPUNKIKARTAT.sevilla.kohteet.find((k) => k.nimi === nimi);
  assert.equal(nimella('Maestranzan areena').wiki, 'Maestranza (Seville)');
  assert.equal(nimella('Trianan silta').wiki, 'Puente de Isabel II');
  assert.equal(nimella('Plaza de España').wiki, 'Plaza de España, Seville');
});
