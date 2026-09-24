/*
 * Reliefisarja (tools/tee-pallolaatat.mjs --relief): reliefipyramidi
 * Web Mercator -laatoiksi natiivin topografialinssille (23.9.2026).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  LAATTA, RELIEFIN_TAYTE, RELIEFIN_VALI, julisteenLeveysvali, laskeLaatta, reliefinKansio, reliefinLuettelo,
  rivinLeveysaste,
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
  // Väli on reliefin kattavuus, ei julisteen rajaus kehyksineen (61,5° S).
  assert.deepEqual(julisteenLeveysvali(l), RELIEFIN_VALI);
  assert.ok(julisteenLeveysvali(POHJA).etela > -62);
  assert.equal(reliefinKansio('20260920'), 'matkakirja/reliefipyramidi/20260920/pallo/');
});

test('reliefin luettelo: eri arkki on virhe', () => {
  assert.throws(() => reliefinLuettelo(POHJA, { ...RELIEF, arkki: { ...ARKKI, y: 0 } }, 'x'), /arkki/);
});

test('reliefin laatta: kartan ulkopuoli on reliefin täytesävyä, ei pergamentin merta', async () => {
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
  assert.deepEqual([...relief.subarray(o, o + 3)], RELIEFIN_TAYTE);
  // Ilman reliefiä kylläinen sininen ei kelpaa merisävyksi → yleissävy.
  assert.deepEqual([...pohja.subarray(o, o + 3)], [1, 2, 3]);
  // Kartan sisällä molemmat lukevat lähdettä.
  const sisa = (200 * LAATTA + 100) * 3;
  assert.deepEqual([...relief.subarray(sisa, sisa + 3)], SININEN);
});

test('kylläisyys: CSS saturate -matriisi, harmaa säilyy, oma kansio', async () => {
  const { kyllaista, reliefinKansio: kansio } = await import('../tools/tee-pallolaatat.mjs');
  const b = Buffer.from([200, 100, 50, 128, 128, 128, 0, 0, 0]);
  kyllaista(b, 0.8);
  // Selaimen saturate(0.8) samoille arvoille (feColorMatrix, sRGB).
  assert.deepEqual([...b], [184, 104, 64, 128, 128, 128, 0, 0, 0]);
  assert.deepEqual([...kyllaista(Buffer.from([10, 20, 30]), 1)], [10, 20, 30]);
  assert.equal(kansio('20260920', 0.8), 'matkakirja/reliefipyramidi/20260920/pallo-k08/');
  assert.equal(kansio('20260920'), 'matkakirja/reliefipyramidi/20260920/pallo/');
});

test('--ilman-viivoja: luettelossa ei viivatasoa, vaatii tunnisteen', () => {
  const src = readFileSync(new URL('../tools/tee-pallolaatat.mjs', import.meta.url), 'utf8');
  assert.match(src, /--ilman-viivoja vaatii oman --tunniste-lipun/);
  assert.match(src, /luettelo = \{ \.\.\.luettelo, viivataso: null \}/);
});

test('väritaso pallolle: luettelo ja kansio', async () => {
  const { varitasonLuettelo, varitasonPallokansio } = await import('../tools/tee-pallolaatat.mjs');
  const pohja = { ...POHJA, viivataso: { versio: 'v' }, varitasot: { FRA: { versio: '2026-09-14b-tasoitus', maa: 'FRA', maaPolussa: true, tasot: [4, 5, 6, 7, 8], alue: { lon0: -11, lon1: 16, lat0: 30, lat1: 59 } } } };
  const l = varitasonLuettelo(pohja, 'FRA');
  assert.equal(l.versio, '2026-09-14b-tasoitus/vari/FRA');
  assert.equal(l.viivataso, null);
  assert.equal(l.vari.maa, 'FRA');
  assert.throws(() => varitasonLuettelo(pohja, 'SWE'), /ei väritasoa/);
  assert.equal(varitasonPallokansio('2026-09-14b-tasoitus', 'FRA'), 'julisteet/pallo/vari/2026-09-14b-tasoitus/FRA/');
  assert.equal(varitasonPallokansio('2026-09-14b-tasoitus', 'FRA', 'k2'), 'julisteet/pallo/vari/2026-09-14b-tasoitus-k2/FRA/');
});
