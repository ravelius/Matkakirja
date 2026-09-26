/*
 * LÖYDÖS 178 (omistaja 26.9.2026 klo 22.4x): nähtävyyskartalla vain paikat —
 * rakennus, aukio, luonto. Tarinakohteet (karttanosto) ovat kaupungin nostoissa
 * (kaupunkiliuska). Vartija: yksikään kaupunki ei jää ilman kartan kohdetta.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  KAUPUNKIKARTAT, KOHDETYYPIT, kaupunginTarinakohteet, kaupunkikartanKohteet, kohdeKartalla, kohteenTyyppi,
} from '../js/packs/maakartat.js';
import { kaupunkikartanSiirretyt } from '../js/nahtavyydet.js';

const kaikki = Object.entries(KAUPUNKIKARTAT).flatMap(([kaupunki, k]) => (k.kohteet ?? []).map((kohde) => ({ kaupunki, kohde })));

test('jokaisen kohteen tyyppi on tunnettu (puuttuva = rakennus)', () => {
  const vieraat = kaikki.filter(({ kohde }) => !KOHDETYYPIT.includes(kohteenTyyppi(kohde)));
  assert.deepEqual(vieraat.map(({ kaupunki, kohde }) => `${kaupunki}/${kohde.nimi}`), []);
});

test('kartalla vain paikat; jokainen tarinakohde on kaupungin nostoissa (liuska)', () => {
  for (const { kohde } of kaikki) {
    assert.equal(kohdeKartalla(kohde), ['rakennus', 'aukio', 'luonto'].includes(kohteenTyyppi(kohde)), kohde.nimi);
  }
  let tarinoita = 0;
  for (const [kaupunki, kartta] of Object.entries(KAUPUNKIKARTAT)) {
    const liuskassa = new Set(kaupunkikartanSiirretyt(null, kaupunki).map((r) => r.id));
    for (const k of kaupunginTarinakohteet(kartta)) {
      tarinoita += 1;
      const tunnus = Array.isArray(k.nosto) ? k.nosto[0] : k.nosto;
      assert.ok(liuskassa.has(tunnus), `${kaupunki}/${k.nimi} (${tunnus}) puuttuu kaupungin nostoista`);
    }
  }
  assert.ok(tarinoita >= 60, `tarinakohteita vain ${tarinoita}`);
});

test('vartija: jokaisella kaupunkikartalla vähintään yksi kohde kartalla', () => {
  const tyhjat = Object.entries(KAUPUNKIKARTAT).filter(([, k]) => (k.kohteet ?? []).length && !kaupunkikartanKohteet(k).length);
  assert.deepEqual(tyhjat.map(([kaupunki]) => kaupunki), []);
});
