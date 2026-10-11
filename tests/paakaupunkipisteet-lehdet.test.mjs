/*
 * Pääkaupunkipisteiden lehdet (PT 11.10.2026, pääkaupunkien kytkentä): pilvierien e01–e02 kaupunkilehti,
 * kohdekartta ja esittely on avaimistettu pisteen id:llä (js/packs/paakaupungit.js), ja maakortin
 * pääkaupunkirivi avaa esittelyn (js/fokusmitat.js paakaupunkipisteenLehti).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { PAAKAUPUNKIPISTEET } from '../js/packs/paakaupungit.js';
import { KULTTUURI_KATEGORIAT } from '../js/packs/kulttuuri-kategoriat.js';
import { KAUPUNKIKARTAT } from '../js/packs/maakartat.js';
import { EUROPE_ARTIKKELIT, PAAKAUPUNKIEN_ARTIKKELIAVAIMET } from '../js/packs/europe-artikkelit.js';
import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';
import { paakaupunkipisteenLehti } from '../js/fokusmitat.js';

const pisteet = PAAKAUPUNKIPISTEET.filter((p) => KULTTUURI_KATEGORIAT[p.id]);

test('jokaisella lehdellisellä pisteellä on kansi, esittely ja piirretty kohdekartta', () => {
  assert.ok(pisteet.length >= 14, `pisteitä ${pisteet.length}`);
  for (const p of pisteet) {
    assert.ok(KULTTUURI_KATEGORIAT[p.id].some((a) => a.id === 'kaupunki'), `${p.id}: kansi`);
    const avain = PAAKAUPUNKIEN_ARTIKKELIAVAIMET[p.id];
    assert.ok(EUROPE_ARTIKKELIT[avain]?.intro, `${p.id}: esittely (${avain})`);
    const kartta = KAUPUNKIKARTAT[p.id];
    assert.ok(kartta, `${p.id}: kohdekartta`);
    assert.ok(existsSync(new URL(`../${kartta.polku}`, import.meta.url)), `${p.id}: ${kartta.polku} puuttuu`);
  }
});

test('maakortin pääkaupunkirivi: piste saa lehden, laudan pääkaupunki ei', () => {
  for (const p of pisteet) {
    assert.deepEqual(paakaupunkipisteenLehti(MAAILMANKARTTA, p.maa),
      { id: p.id, name: p.nimi, wiki: PAAKAUPUNKIEN_ARTIKKELIAVAIMET[p.id] }, p.id);
  }
  assert.equal(paakaupunkipisteenLehti(MAAILMANKARTTA, 'FRA'), null);
  assert.equal(paakaupunkipisteenLehti({ id: 'europe' }, 'SRB'), null);
  assert.equal(paakaupunkipisteenLehti(MAAILMANKARTTA, 'HKG'), null);
});
