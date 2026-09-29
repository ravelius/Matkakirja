// Isoisän linssi 1873: web natiivin ilmeen mukaiseksi (Päätoimittaja 29.9.2026).
// Natiivin arvot: Matkakirja-proto IsoisaKerros.cs:83-84, 104-119 ja Isoisa1873.cs:121-157.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  HISTORIA_MUSTE, HISTORIA2_MUSTE, HISTORIA_PEITTO, HISTORIA2_PEITTO, HISTORIA2_KATKO_AST,
  VEKTORIT_HISTORIA_LEVEYS_CSS, VEKTORIT_HISTORIA2_LEVEYS_CSS,
} from '../js/pallovektorit.js';
import {
  NIMIEN_KORKEUSRAJAT, NIMIEN_ARVO, NIMIEN_RAKO_PX, NAKYVYYDEN_JARRU_MS, LINSSI,
  ratkaiseTormaykset, nimiNakyy, valtioDatumit,
} from '../js/linssit/isoisa-1873.js';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

test('rajat natiivin mukaan: vakioleveys, täysi peitto, vasalli vaaleammalla ja katko asteina', () => {
  assert.deepEqual(VEKTORIT_HISTORIA_LEVEYS_CSS, [1.4, 1.4]);
  assert.deepEqual(VEKTORIT_HISTORIA2_LEVEYS_CSS, [1.0, 1.0]);
  assert.equal(HISTORIA_PEITTO, 1);
  assert.equal(HISTORIA2_PEITTO, 1);
  assert.equal(HISTORIA_MUSTE, '#4a3320');
  assert.equal(HISTORIA2_MUSTE, '#8a6a48');
  // Jakso 0,5°, täyttö 55 %.
  assert.ok(Math.abs(HISTORIA2_KATKO_AST[0] + HISTORIA2_KATKO_AST[1] - 0.5) < 1e-9);
  assert.ok(Math.abs(HISTORIA2_KATKO_AST[0] / 0.5 - 0.55) < 1e-9);
  // Selite kertoo samat värit kuin piirto.
  const selite = LINSSI.selite();
  assert.equal(selite[0].vari, HISTORIA_MUSTE);
  assert.equal(selite[1].vari, HISTORIA2_MUSTE);
});

test('nimet: korkeusrajat, arvojärjestys, rako ja jarru kuten natiivissa', () => {
  assert.equal(NIMIEN_KORKEUSRAJAT.pieni, 0.13);
  assert.equal(NIMIEN_KORKEUSRAJAT.maakunta, 0.15);
  assert.ok(nimiNakyy('suuri', 5) && nimiNakyy('keski', 5));
  assert.ok(!nimiNakyy('pieni', 0.2) && nimiNakyy('pieni', 0.1));
  assert.deepEqual(NIMIEN_ARVO, { suuri: 0, keski: 1, pieni: 2, maakunta: 3 });
  assert.equal(NIMIEN_RAKO_PX, 4);
  assert.equal(NAKYVYYDEN_JARRU_MS, 150);
  // Heikompi piiloon, ei siirtoa.
  const piiloon = ratkaiseTormaykset([
    { avain: 'pieni', arvo: 2, x0: 0, y0: 0, x1: 50, y1: 10 },
    { avain: 'suuri', arvo: 0, x0: 20, y0: 0, x1: 90, y1: 10 },
    { avain: 'kaukana', arvo: 1, x0: 200, y0: 0, x1: 260, y1: 10 },
  ]);
  assert.deepEqual([...piiloon], ['pieni']);
  // 106 valtiota, sama joukko kuin natiivin ämpäriaineistossa.
  assert.equal(valtioDatumit().length, 106);
});

test('jarru odottaa lepoa (debounce) eikä päästä päivitystä kesken liikkeen', () => {
  const src = lue('../js/linssit/isoisa-1873.js');
  assert.match(src, /if \(avain === liikeAvain\) return;/);
  assert.match(src, /if \(kello\) clearTimeout\(kello\);\n\s+kello = setTimeout\(paivita, NAKYVYYDEN_JARRU_MS\);/);
});

test('nimen asu: kaupunkinimien serif ja kiinteä paperiääriviiva, koot natiivin mukaan', () => {
  const css = lue('../css/styles.css');
  const lohko = css.slice(css.indexOf('.pallolauta-isoisa-nimi {'), css.indexOf('.pallolauta-isoisa-nimi.piilossa'));
  assert.match(lohko, /font-family: "Iowan Old Style"/);
  assert.match(lohko, /1px 0 0 rgba\(247, 241, 226, 0\.95\)/);
  assert.match(lohko, /--suuri \{ font-size: 15px; letter-spacing: 0\.34em; \}/);
  assert.match(lohko, /--maakunta \{\n\s+font-size: 10px;\n\s+letter-spacing: 0\.14em;\n\s+color: rgba\(96, 72, 48, 0\.85\);/);
});
