/*
 * Pulu avoimen paneelin yläpuolelle (PAATOKSET 50, js/pulu-paneelin-ylla.js).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { pulunAlareunaPaneelinYlla, PULUN_RAKO_PX } from '../js/pulu-paneelin-ylla.js';

test('pulu nousee paneelin yläreunan päälle rakoineen', () => {
  // 844 px ikkuna, paneeli alkaa 600 px:stä, pulu 48 px.
  const bottom = pulunAlareunaPaneelinYlla({ paneelinYla: 600, puluKorkeus: 48, ikkunanKorkeus: 844 });
  assert.equal(bottom, 844 - 600 + PULUN_RAKO_PX);
  // Pulun alareuna on siis paneelin yläreunan yläpuolella.
  assert.ok(844 - bottom < 600);
});

test('pulu ei nouse yläpalkin alle: silloin paikka jää ennalleen', () => {
  assert.equal(pulunAlareunaPaneelinYlla({
    paneelinYla: 90, puluKorkeus: 48, ikkunanKorkeus: 844, ylaraja: 60,
  }), null);
});

test('puuttuva mitta ei siirrä pulua', () => {
  assert.equal(pulunAlareunaPaneelinYlla({ paneelinYla: NaN, puluKorkeus: 48, ikkunanKorkeus: 844 }), null);
});
