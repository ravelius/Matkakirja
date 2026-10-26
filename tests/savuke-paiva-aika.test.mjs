// WebKit päivällä Chromiumilla (tools/savukkeet/paiva-aika.mjs, Päätoimittaja 30.9.2026): 07–22 Helsingin aikaa.
import test from 'node:test';
import assert from 'node:assert/strict';
import { paivaAika, webkitChromiumilla } from '../tools/savukkeet/paiva-aika.mjs';

// 30.9.2026 Helsinki = UTC+3.
const klo = (h, m = 0) => new Date(Date.UTC(2026, 8, 30, h - 3, m));

test('päivä 07.00–21.59 Helsingin aikaa', () => {
  assert.equal(paivaAika(klo(6, 59)), false);
  assert.equal(paivaAika(klo(7, 0)), true);
  assert.equal(paivaAika(klo(21, 59)), true);
  assert.equal(paivaAika(klo(22, 0)), false);
  assert.equal(paivaAika(klo(2, 30)), false);
});

test('WEBKIT_PAKOTA=1 ohittaa päiväsäännön, yöllä WebKit kuten ennen', () => {
  assert.equal(webkitChromiumilla({}, klo(12)), true);
  assert.equal(webkitChromiumilla({ WEBKIT_PAKOTA: '1' }, klo(12)), false);
  assert.equal(webkitChromiumilla({}, klo(23)), false);
});
