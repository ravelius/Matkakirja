/*
 * LEHDEN OSUUS: leveys tai korkeus, kumpi on suurempi (omistajan
 * tuotantokaappaus v2000, 21.9.2026: Ranska z6 työpöydällä, nostot
 * putosivat pisteiksi, koska maa täytti alle puolet LEVEYDESTÄ vaikka
 * 77 % korkeudesta). Ks. js/pallolauta/nostot.js lehdenOsuus.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  LEHDEN_KOKONAISENA_OSUUS, lehdenOsuus, lehtiKokonaanRuudulla, lehtiNakyvissa,
} from '../js/pallolauta/nostot.js';
import { LEHDEN_VAHIN_OSUUS } from '../js/fokuskohteet.js';

const RANSKA = { lauta: 'maailmankartta', bbox: { x: 0, y: 0, w: 200, h: 220 } };

test('pystyruudulla leveys ratkaisee kuten ennen', () => {
  // Puhelin: näkymä kapea ja korkea, maa täyttää leveyden.
  assert.equal(lehdenOsuus(RANSKA, { w: 250, h: 600 }), 0.8);
});

test('vaakaruudulla korkea maa avaa portin korkeudellaan', () => {
  // Omistajan kuva: Ranska 40 % leveydestä, 77 % korkeudesta.
  const nakyva = { w: 500, h: 286 };
  const osuus = lehdenOsuus(RANSKA, nakyva);
  assert.ok(osuus > 0.76 && osuus < 0.78, `osuus ${osuus}`);
  assert.ok(osuus >= LEHDEN_VAHIN_OSUUS, 'portti auki');
  // Pelkällä leveydellä portti olisi kiinni — juuri se oli vika.
  assert.ok(RANSKA.bbox.w / nakyva.w < LEHDEN_VAHIN_OSUUS);
});

test('maailmankuvassa portti pysyy kiinni', () => {
  assert.ok(lehdenOsuus(RANSKA, { w: 2000, h: 1300 }) < LEHDEN_VAHIN_OSUUS);
});

test('ilman korkeutta osuus on leveyden osuus; ilman lehteä nolla', () => {
  assert.equal(lehdenOsuus(RANSKA, { w: 400 }), 0.5);
  assert.equal(lehdenOsuus({ lauta: 'maailmankartta', bbox: { w: 200 } }, { w: 400, h: 100 }), 0.5);
  assert.equal(lehdenOsuus(null, { w: 400, h: 300 }), 0);
  assert.equal(lehdenOsuus(RANSKA, { w: 400, h: 300 }, 'toinen-lauta'), 0);
});

test('maa kokonaan ruudulla avaa portin, vaikka osuus on alle puolen', () => {
  // Omistajan kuva: Ranska kokonaan näkymässä reunuksineen, osuus ~0,44.
  const nakyva = { x: -150, y: -140, w: 500, h: 500 };
  assert.ok(lehdenOsuus(RANSKA, nakyva) < 0.5);
  assert.ok(lehdenOsuus(RANSKA, nakyva) >= LEHDEN_KOKONAISENA_OSUUS);
  assert.equal(lehtiKokonaanRuudulla(RANSKA, nakyva), true);
  assert.equal(lehtiNakyvissa(RANSKA, nakyva), true);
});

test('maailmankuvassa maa on kokonaan ruudulla mutta liian pieni: portti kiinni', () => {
  const nakyva = { x: -900, y: -600, w: 2000, h: 1300 };
  assert.equal(lehtiKokonaanRuudulla(RANSKA, nakyva), true);
  assert.equal(lehtiNakyvissa(RANSKA, nakyva), false);
});

test('reunaa leikkaava maa alle puolen osuudella: pisteet riittävät kuten ennen', () => {
  const nakyva = { x: 100, y: -140, w: 500, h: 500 };
  assert.equal(lehtiKokonaanRuudulla(RANSKA, nakyva), false);
  assert.equal(lehtiNakyvissa(RANSKA, nakyva), false);
});

test('lähikuvassa portti on auki kuten ennen', () => {
  assert.equal(lehtiNakyvissa(RANSKA, { x: 20, y: 30, w: 120, h: 80 }), true);
});
