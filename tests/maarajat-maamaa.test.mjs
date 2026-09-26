// Maa–maa-rajat (omistajan löydös 127): renkaasta jää vain osuus, jonka
// toisella puolella on toinen maa; rannikko ja saman maan vuono putoavat.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { maamaski, rajajaksot } from '../tools/maarajat-maamaa.mjs';

const nelio = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]];
// A = 0…10 °E, B = 10…20 °E, molemmat 0…10 °N; ympärillä merta.
const ne = { features: [
  { geometry: { type: 'Polygon', coordinates: [nelio(0, 0, 10, 10)] } },
  { geometry: { type: 'Polygon', coordinates: [nelio(10, 0, 20, 10)] } },
] };
const maski = maamaski(ne, 0.25);
// A:n rengas tiheästi (1° janat), jotta lyhyiden jaksojen yhdistäminen ei osu.
const tihea = (r) => r.flatMap((p, i) => (i === r.length - 1 ? [p] : Array.from({ length: 10 }, (_, k) => [p[0] + ((r[i + 1][0] - p[0]) * k) / 10, p[1] + ((r[i + 1][1] - p[1]) * k) / 10])));

test('vain A:n ja B:n yhteinen särmä jää rajaksi', () => {
  const jaksot = rajajaksot(tihea(nelio(0, 0, 10, 10)), maski, 0.5);
  assert.equal(jaksot.length, 1);
  assert.ok(jaksot[0].every(([lon]) => lon === 10), JSON.stringify(jaksot[0]));
  assert.ok(jaksot[0].length >= 9);
});

test('saari (sama maa tai meri molemmin puolin) ei saa rajaa', () => {
  const saari = { features: [{ geometry: { type: 'Polygon', coordinates: [nelio(0, 0, 10, 10)] } }] };
  assert.deepEqual(rajajaksot(tihea(nelio(0, 0, 10, 10)), maamaski(saari, 0.25), 0.5), []);
});

test('salmi: eri maat kapean meren takana eivät tee rajaa, kun meren rantaviiva annetaan', async () => {
  const { meriviivat } = await import('../tools/maarajat-maamaa.mjs');
  // A = 0…10 °E ja B = 10,2…20 °E; välissä 0,2°:n salmi (meri).
  const ne2 = { features: [
    { geometry: { type: 'Polygon', coordinates: [nelio(0, 0, 10, 10)] } },
    { geometry: { type: 'Polygon', coordinates: [nelio(10.2, 0, 20, 10)] } },
  ] };
  const meri = { features: [{ geometry: { type: 'Polygon', coordinates: [nelio(10, -5, 10.2, 15)] } }] };
  const m2 = maamaski(ne2, 0.25);
  const rengas = tihea(nelio(0, 0, 10, 10));
  // Ilman rantaviivaa karkea rasteri ei näe salmea (0,5° koepisteet osuvat B:hen).
  assert.ok(rajajaksot(rengas, m2, 0.5).length >= 1);
  assert.deepEqual(rajajaksot(rengas, m2, 0.5, meriviivat(meri)), []);
});
