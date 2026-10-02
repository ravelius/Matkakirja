// Kohdekortti NOSTOKORTTI-pohjalla (kokeilu 1.10.2026, pysyvä 2.10.2026): ei lippua, kuvien kuvaus.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { kohteenPohjakuvat } from '../js/fokuskohteet.js';
import { FOKUSKOHTEET_GRC } from '../js/packs/fokuskohteet-grc.js';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

test('kohdekortti on pysyvästi pohjalla: ei lippua eikä vanhaa korttia (omistaja 2.10.2026)', () => {
  const koodi = lue('../js/fokuskohteet.js');
  assert.doesNotMatch(koodi, /KOHDEKORTTI_POHJA|kohdekorttiPohjalla|matkakirja-kohdekortti/);
  assert.doesNotMatch(koodi, /html\('div', 'fokuskohde-popup'\)/);
  assert.match(koodi, /return avaaKohdePohjalla\(ui, kohde, \{ ankkuri \}\);/);
});

test('Akropolis: havainnekuva heroksi, nykykuva upotukseksi tekijärivin kanssa', () => {
  const kuvat = kohteenPohjakuvat(FOKUSKOHTEET_GRC.find((k) => k.id === 'akropolis'));
  assert.equal(kuvat.length, 2);
  assert.match(kuvat[0].url, /ihme-parthenon/);
  assert.equal(kuvat[0].lahde, '');
  assert.match(kuvat[1].lahde, /CC BY 2\.0/);
});

test('maapaneeli ei syö pohjakortin napautusta (peitetty kohta)', () => {
  const k = lue('../js/pallolauta/maapaneeli.js');
  assert.match(k, /closest\?\.\('\.tk-nostokortti, \.tk-kortti-tausta'\)/);
  assert.match(k, /if \(peitetty\(e\.clientX, e\.clientY\)\) return;/);
});
