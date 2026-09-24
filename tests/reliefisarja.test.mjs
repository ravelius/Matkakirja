/*
 * Reliefisarja (tools/tee-pallolaatat.mjs --relief): reliefipyramidi
 * Web Mercator -laatoiksi natiivin topografialinssille (23.9.2026).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  LAATTA, julisteenLeveysvali, laskeLaatta, reliefinKansio, reliefinLuettelo, rivinLeveysaste,
} from '../tools/tee-pallolaatat.mjs';

const ARKKI = { x: 0, y: -1046.3149255312064, w: 12000, h: 7307.715927310571 };
const POHJA = {
  versio: '2026-09-22c-pohja',
  projektio: { tyyppi: 'miller', leveys: 12000, lon0: -175, pohjoinen: 76 },
  arkki: ARKKI,
  rajaus: { x: 0, y: -611.3149255312065, w: 12000, h: 6422.715927310571 },
  kehys: { yla: 232, ala: 240 },
  viivataso: { versio: 'v' },
  tasot: [],
};
const RELIEF = {
  tunnus: 'reliefipyramidi',
  lahde: { nimi: 'ETOPO 2022', lisenssi: 'public domain' },
  arkki: ARKKI,
  laatta: 512,
  tasot: [0, 1, 2].map((z) => ({
    z, leveys: 675 * 2 ** z, korkeus: Math.ceil(411 * 2 ** z), sarakkeita: 2 ** z, riveja: 2 ** z,
  })),
};

test('reliefin luettelo: pohjan geometria, reliefin tasot, ei kehystä eikä kerroksia', () => {
  const l = reliefinLuettelo(POHJA, RELIEF, '20260920');
  assert.equal(l.versio, '20260920');
  assert.equal(l.relief, true);
  assert.deepEqual(l.projektio, POHJA.projektio);
  assert.deepEqual(l.rajaus, POHJA.rajaus);
  assert.equal(l.viivataso, undefined);
  assert.equal(l.tasot[2].pikseliaPerYksikko, (675 * 4) / 12000);
  // Ilman alakehystä etelä on rajauksen alareuna (66° S), ei 61,5° S.
  const v = julisteenLeveysvali(l);
  assert.ok(Math.abs(v.pohjoinen - 84) < 0.01, v.pohjoinen);
  assert.ok(Math.abs(v.etela + 66) < 0.01, v.etela);
  assert.ok(julisteenLeveysvali(POHJA).etela > -62);
  assert.equal(reliefinKansio('20260920'), 'matkakirja/reliefipyramidi/20260920/pallo/');
});

test('reliefin luettelo: eri arkki on virhe', () => {
  assert.throws(() => reliefinLuettelo(POHJA, { ...RELIEF, arkki: { ...ARKKI, y: 0 } }, 'x'), /arkki/);
});

test('reliefin laatta: kartan ulkopuoli jatkaa reunan sävyä, ei pergamentin merta', async () => {
  const SININEN = [10, 60, 200];
  const lukija = {
    varmista: async () => {},
    pikseli: (z, px, py, ulos, o) => { [ulos[o], ulos[o + 1], ulos[o + 2]] = SININEN; },
    mittaaMeri: async () => ({ pohjoinen: [1, 2, 3], etela: [1, 2, 3] }),
  };
  // Z3 Y0 kattaa 85,05°–79,17° N: yläosa kartan ulkopuolella (yli 84° N).
  const relief = await laskeLaatta(reliefinLuettelo(POHJA, RELIEF, '20260920'), lukija, 3, 4, 0);
  const pohja = await laskeLaatta({ ...reliefinLuettelo(POHJA, RELIEF, 'x'), relief: false }, lukija, 3, 4, 0);
  const rivi = 2; // 85° N
  assert.ok(rivinLeveysaste(3, 0, rivi) > 84);
  const o = (rivi * LAATTA + 100) * 3;
  assert.deepEqual([...relief.subarray(o, o + 3)], SININEN);
  // Ilman reliefiä kylläinen sininen ei kelpaa merisävyksi → yleissävy.
  assert.deepEqual([...pohja.subarray(o, o + 3)], [1, 2, 3]);
  // Kartan sisällä molemmat lukevat lähdettä.
  const sisa = (200 * LAATTA + 100) * 3;
  assert.deepEqual([...relief.subarray(sisa, sisa + 3)], SININEN);
});
