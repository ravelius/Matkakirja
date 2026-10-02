// Kohdekortti NOSTOKORTTI-pohjalla (omistajan kokeilu 1.10.2026, loki f344f1034): peruttava lippu ja kuvien kuvaus.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { kohdekorttiPohjalla, kohteenPohjakuvat } from '../js/fokuskohteet.js';
import { FOKUSKOHTEET_GRC } from '../js/packs/fokuskohteet-grc.js';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

test('lippu: oletuksena pohja, ?kohdekortti=vanha ja localStorage kääntävät takaisin', () => {
  assert.equal(kohdekorttiPohjalla(), true);
  assert.match(lue('../js/fokuskohteet.js'), /const KOHDEKORTTI_POHJA = true;/);
  assert.match(lue('../js/fokuskohteet.js'), /if \(valinta === 'vanha'\) return false;/);
  // Vanha kortti on yhä koodissa (peruttavuus): pohja-avaus on ennen sitä, ei sen tilalla.
  assert.match(lue('../js/fokuskohteet.js'), /if \(kohdekorttiPohjalla\(\)\) return avaaKohdePohjalla[\s\S]*const popup = html\('div', 'fokuskohde-popup'\)/);
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
