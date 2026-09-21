/*
 * Nimiöiden sulavuusmittarin laskenta (js/pallolauta/sulavuusmittari.js):
 * siirtymä normalisoidaan koolla, portaat erotetaan liikkeestä.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { kehysnopeus, koonLiukuvuus, siirtymanMuutokset } from '../js/pallolauta/sulavuusmittari.js';

const nayte = (t, skaala, merkit) => ({ t, skaala, merkit });

test('koon mukana kasvava siirtymä ei ole hyppy; irtoava nimiö on', () => {
  const naytteet = [
    nayte(0, 1, { a: { dx: 10, dy: 0, koko: 1 }, b: { dx: 10, dy: 0, koko: 1 } }),
    nayte(16, 2, { a: { dx: 20, dy: 0, koko: 2 }, b: { dx: 20, dy: 6, koko: 2 } }),
  ];
  const s = siirtymanMuutokset(naytteet);
  assert.equal(s.n, 2);
  // Kahdesta arvosta [0, 3] mediaani on ylempi; a:n oma ero on 0.
  assert.equal(s.mediaani, 3);
  assert.equal(s.pahin.avain, 'b', 'a: siirtymä kasvoi koon mukana → ei pahin');
  assert.equal(s.pahin.ero, 3, 'b: 6 px irtoama kahdella skaalalla = 3 px alun mitassa');
});

test('koko liukuu joka kehys vs. porras levossa ja liikkeessä', () => {
  const liukuva = [
    nayte(0, 1.00, { a: { dx: 0, dy: 0, koko: 1.00 } }),
    nayte(16, 1.02, { a: { dx: 0, dy: 0, koko: 1.02 } }),
    nayte(32, 1.04, { a: { dx: 0, dy: 0, koko: 1.04 } }),
    nayte(48, 1.04, { a: { dx: 0, dy: 0, koko: 1.04 } }),
  ];
  const k = koonLiukuvuus(liukuva);
  assert.deepEqual([k.liikkui, k.liikkuiJaKokoMuuttui, k.osuus], [2, 2, 1]);
  assert.equal(k.lepoaskel, 0);
  assert.ok(k.liikeaskel < 0.001);

  const portaikko = [
    nayte(0, 1.00, { a: { dx: 0, dy: 0, koko: 1.00 } }),
    nayte(16, 1.02, { a: { dx: 0, dy: 0, koko: 1.00 } }),
    nayte(32, 1.04, { a: { dx: 0, dy: 0, koko: 1.00 } }),
    nayte(48, 1.04, { a: { dx: 0, dy: 0, koko: 1.20 } }),
  ];
  const p = koonLiukuvuus(portaikko);
  assert.deepEqual([p.liikkui, p.liikkuiJaKokoMuuttui, p.osuus], [2, 0, 0]);
  assert.ok(Math.abs(p.lepoaskel - 0.2) < 1e-9, 'porras levossa 20 %');
});

test('kehysnopeus näytteistä', () => {
  assert.equal(kehysnopeus([]), 0);
  assert.equal(kehysnopeus([nayte(0, 1, {}), nayte(500, 1, {}), nayte(1000, 1, {})]), 2);
});
