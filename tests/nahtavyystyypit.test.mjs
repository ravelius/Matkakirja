/*
 * LÖYDÖS 178 (omistaja 26.9.2026, Fablen päätös vaihtoehto A): nähtävyyskartalla
 * vain paikat — rakennus, aukio, luonto — sekä tarinakohteet (karttanosto), kunnes
 * Sisältökirjuri siirtää ne. Vartija: yksikään kaupunki ei jää ilman kartan kohdetta.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  KAUPUNKIKARTAT, KOHDETYYPIT, kaupunkikartanKohteet, kohdeKartalla, kohteenTyyppi,
} from '../js/packs/maakartat.js';

const kaikki = Object.entries(KAUPUNKIKARTAT).flatMap(([kaupunki, k]) => (k.kohteet ?? []).map((kohde) => ({ kaupunki, kohde })));

test('jokaisen kohteen tyyppi on tunnettu (puuttuva = rakennus)', () => {
  const vieraat = kaikki.filter(({ kohde }) => !KOHDETYYPIT.includes(kohteenTyyppi(kohde)));
  assert.deepEqual(vieraat.map(({ kaupunki, kohde }) => `${kaupunki}/${kohde.nimi}`), []);
});

test('ei-paikka ilman karttanostoa ei ole kartalla; tarinakohde pysyy', () => {
  for (const { kohde } of kaikki) {
    const paikka = ['rakennus', 'aukio', 'luonto'].includes(kohteenTyyppi(kohde));
    assert.equal(kohdeKartalla(kohde), paikka || Boolean(kohde.nosto), kohde.nimi);
  }
  assert.ok(kaikki.some(({ kohde }) => !kohdeKartalla(kohde)), 'suodatin ei piilota mitään — testi ei mittaa');
});

test('vartija: jokaisella kaupunkikartalla vähintään yksi kohde kartalla', () => {
  const tyhjat = Object.entries(KAUPUNKIKARTAT).filter(([, k]) => (k.kohteet ?? []).length && !kaupunkikartanKohteet(k).length);
  assert.deepEqual(tyhjat.map(([kaupunki]) => kaupunki), []);
});
