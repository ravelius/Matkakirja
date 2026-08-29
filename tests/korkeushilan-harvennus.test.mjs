/*
 * KORKEUSHILAN HARVENNUS — pysyykö maasto paikallaan, kun ruudukko
 * karkenee?
 *
 * Omistajan linjaus 29.8.2026: *"Sen voisi pudottaa heti 3
 * kaariminuuttiin jo euroopassa"*. Harvennus (tools/fokuskartta/etopo.mjs
 * `harvenna`) on lehden kannalta vaarallinen paikka, koska se koskee
 * GEOREFEROINTIIN: korkeusruudukko ja rantaviiva tulevat eri lähteistä
 * (ruudukko ETOPOsta, ranta Natural Earthin vektoreista), ja jos
 * harvennus siirtää ruudukkoa puoli lohkoa, maasto luisuu rannan yli.
 * Silmällä sitä ei huomaa pienissä lehdissä, mutta se olisi väärin
 * jokaisessa niistä.
 *
 * Siksi tässä mitataan LUVUT eikä pikseleitä:
 *
 *   1. Karkean ruudun arvo on lohkonsa KESKIARVO — ei sen ensimmäinen
 *      piste. Poiminta olisi aliasointia, ja koko harvennuksen tarkoitus
 *      (pehmeämpi varjostus) kääntyisi päinvastaiseksi.
 *   2. Kulmat siirtyvät puoli lohkoa sisäänpäin, koska arvo edustaa
 *      lohkon keskipistettä.
 *   3. Väli pysyy TASAISENA myös silloin, kun ruudukko ei ole jaollinen
 *      lohkon koolla — reuna täydennetään toistamalla eikä pudoteta,
 *      jottei viimeisen sarakkeen keskipiste jää ruudukon ulkopuolelle.
 *   4. `harvenna(pala, 1)` ei muuta mitään: oletusreitti on sama koodi.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { harvenna } from '../tools/fokuskartta/etopo.mjs';

/** Tekee `leikkaa`-muotoisen palan annetuista korkeuksista. */
function pala(w, h, arvot, kulmat = {
  lon0: 10, lon1: 10 + (w - 1) / 60, lat1: 50, lat0: 50 - (h - 1) / 60,
}) {
  const grid = Int16Array.from(arvot);
  return {
    w,
    h,
    ...kulmat,
    aukkoja: 0,
    b64: Buffer.from(grid.buffer, grid.byteOffset, grid.byteLength).toString('base64'),
  };
}

/** Purkaa palan takaisin numeroiksi. */
function arvot(p) {
  const puskuri = Buffer.from(p.b64, 'base64');
  return [...new Int16Array(puskuri.buffer, puskuri.byteOffset, puskuri.byteLength / 2)];
}

test('harvennus ottaa lohkon keskiarvon eikä poimi ensimmäistä pistettä', () => {
  /*
   * 3 x 3 -ruudukko, jossa ensimmäinen piste on 900 ja loput nollia.
   * Poiminta antaisi 900 (terävä piikki jäisi henkiin), keskiarvo 100.
   */
  const iso = pala(3, 3, [900, 0, 0, 0, 0, 0, 0, 0, 0]);
  const karkea = harvenna(iso, 3);
  assert.equal(karkea.w, 1);
  assert.equal(karkea.h, 1);
  assert.deepEqual(arvot(karkea), [100]);
});

test('harvennus keskiarvoistaa jokaisen lohkon erikseen', () => {
  // 6 x 3: vasen lohko pelkkää 30:tä, oikea pelkkää 60:tä.
  const rivi = [30, 30, 30, 60, 60, 60];
  const iso = pala(6, 3, [...rivi, ...rivi, ...rivi]);
  const karkea = harvenna(iso, 3);
  assert.equal(karkea.w, 2);
  assert.deepEqual(arvot(karkea), [30, 60]);
});

test('kulmat siirtyvät puoli lohkoa sisäänpäin ja väli pysyy tasaisena', () => {
  // 9 x 9 kaariminuutin ruudukkoa -> 3 x 3 kolmen kaariminuutin ruutua.
  const iso = pala(9, 9, new Array(81).fill(0));
  const karkea = harvenna(iso, 3);
  assert.equal(karkea.w, 3);
  assert.equal(karkea.h, 3);
  // Puoli lohkoa on (3 - 1) / 2 = 1 kaariminuutti.
  assert.ok(Math.abs(karkea.lon0 - (iso.lon0 + 1 / 60)) < 1e-12,
    `lon0 ${karkea.lon0} != ${iso.lon0 + 1 / 60}`);
  assert.ok(Math.abs(karkea.lat1 - (iso.lat1 - 1 / 60)) < 1e-12,
    `lat1 ${karkea.lat1} != ${iso.lat1 - 1 / 60}`);
  // Väli on täsmälleen kolme kaariminuuttia molempiin suuntiin.
  const lonVali = (karkea.lon1 - karkea.lon0) / (karkea.w - 1);
  const latVali = (karkea.lat1 - karkea.lat0) / (karkea.h - 1);
  assert.ok(Math.abs(lonVali - 3 / 60) < 1e-12, `lon-väli ${lonVali}`);
  assert.ok(Math.abs(latVali - 3 / 60) < 1e-12, `lat-väli ${latVali}`);
});

test('vajaa reunalohko ei riko tasaista väliä', () => {
  /*
   * 8 saraketta ei ole jaollinen kolmella. Reuna täydennetään
   * toistamalla, joten sarakkeita on kolme ja väli pysyy kolmessa
   * kaariminuutissa — ei 8/3 sarakkeen levyisessä venytyksessä.
   */
  const iso = pala(8, 8, new Array(64).fill(7));
  const karkea = harvenna(iso, 3);
  assert.equal(karkea.w, 3);
  assert.equal(karkea.h, 3);
  const lonVali = (karkea.lon1 - karkea.lon0) / (karkea.w - 1);
  assert.ok(Math.abs(lonVali - 3 / 60) < 1e-12, `lon-väli ${lonVali}`);
  // Reunan toisto ei saa muuttaa tasaisen kentän arvoa.
  assert.deepEqual(arvot(karkea), new Array(9).fill(7));
});

test('harvenna(pala, 1) palauttaa palan koskemattomana', () => {
  const iso = pala(4, 2, [1, 2, 3, 4, 5, 6, 7, 8]);
  assert.equal(harvenna(iso, 1), iso);
});

test('kelvoton harvennus kaataa ajon eikä tuota vinoa ruudukkoa', () => {
  const iso = pala(3, 3, new Array(9).fill(0));
  assert.throws(() => harvenna(iso, 0), /ei ole kelvollinen/);
  assert.throws(() => harvenna(iso, 2.5), /ei ole kelvollinen/);
});
