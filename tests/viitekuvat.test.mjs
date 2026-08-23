/*
 * VIITEKUVAPUTKEN SÄÄNNÖT KONEELLISESTI (omistajan tilaus 23.8.2026).
 *
 * Kaksi asiaa, joita ei saa vahingossa "optimoida" pois:
 *   1. Lisenssisuodatin on SALLITTUJEN lista. Tuntematon lisenssi
 *      hylätään — ei niin, että se pääsee läpi oletuksena.
 *   2. Generointiportti: alle kaksi viitekuvaa tai epävarma tunnistus
 *      tarkoittaa, ettei kuvaa generoida lainkaan.
 *
 * Nämä testit eivät koske verkkoa: ne testaavat suodatinta ja lukevat
 * ajurin portin ehdot lähdekoodista.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { lisenssiKelpaa, VIITTEITA_ENINTAAN, VAHIMMAISLEVEYS } from '../tools/hae-viitekuvat.mjs';

test('lisenssisuodatin päästää läpi vain PD, CC0, CC BY ja CC BY-SA', () => {
  for (const hyva of [
    'cc-by-sa-4.0', 'CC BY-SA 4.0', 'cc-by-3.0', 'CC BY 2.5',
    'cc0', 'CC0', 'pd', 'PD-old-100', 'Public domain', 'pdm',
  ]) {
    assert.ok(lisenssiKelpaa(hyva), `pitäisi kelvata: ${hyva}`);
  }
});

test('lisenssisuodatin hylkää NC:n, ND:n ja tuntemattoman', () => {
  for (const paha of [
    'cc-by-nc-sa-4.0', 'CC BY-NC 3.0', 'cc-by-nd-4.0', 'CC BY-ND 2.0',
    'fair use', 'non-free', 'Copyrighted free use',
    '', null, undefined, 'jokin outo teksti', 'all rights reserved',
  ]) {
    assert.ok(!lisenssiKelpaa(paha), `ei saisi kelvata: ${String(paha)}`);
  }
});

test('viitteiden katto ja vähimmäiskoko pysyvät linjauksen mukaisina', () => {
  // Enintään neljä viitettä (rajapinta sallisi 16), vähintään 1000 px.
  assert.equal(VIITTEITA_ENINTAAN, 4);
  assert.equal(VAHIMMAISLEVEYS, 1000);
});

test('generointiportti on ajurissa: kaksi viitettä ja varma tunnistus', () => {
  const ajuri = readFileSync(new URL('../tools/hero-ajuri.mjs', import.meta.url), 'utf8');
  assert.match(ajuri, /VIITTEITA_VAHINTAAN\s*=\s*2/,
    'portin raja ei saa laskea kahdesta');
  assert.match(ajuri, /EI TARPEEKSI VIITEITA/,
    'ajurin on kirjattava, kun portti pysäyttää kohteen');
  assert.match(ajuri, /TUNNISTUS EPAVARMA/,
    'ajurin on kirjattava myös epävarma tunnistus');
  assert.match(ajuri, /varmuus === 'kategoria'/,
    'tarkka kohde vaatii oman Commons-kategorian');
});

test('worker lähettää viitteet edits-päätepisteeseen image[]-kentässä', () => {
  const worker = readFileSync(new URL('../tools/pollo/worker.js', import.meta.url), 'utf8');
  assert.match(worker, /v1\/images\/edits/);
  assert.match(worker, /append\('image\[\]'/);
  // Viitteetön polku ei saa kadota.
  assert.match(worker, /v1\/images\/generations/);
});
