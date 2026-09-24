/*
 * Pallon sarjan lähdesarakkeet sauman yli (tools/tee-pallolaatat.mjs
 * varmistettavatSarakkeet, Karttaseppä 24.9.2026). Arkin leveys
 * 675 · 2^z ei ole 512:n monikerta, joten viimeinen sarake on kapea;
 * L:n askel sauman yli hyppäsi sen yli ja kaistale lon −176,6…−175
 * maalautui täytteellä.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { varmistettavatSarakkeet } from '../tools/tee-pallolaatat.mjs';

const L = 512;

test('sauman yli: kapea viimeinen sarake noudetaan', () => {
  // z4: leveys 10 800, sarakkeita 22, viimeinen (21) vain 48 px.
  const W = 10800;
  // Z5 x0 = lon −180…−168,75 → px 10 650 … 10 800 + 187,5 (kierretty).
  const s = varmistettavatSarakkeet(10650, 10800 + 187.5, W, L);
  assert.ok(s.has(20), 'sarake 20');
  assert.ok(s.has(21), 'kapea viimeinen sarake 21 jäi noutamatta');
  assert.ok(s.has(0), 'sauman takainen sarake 0');
  // z5: leveys 21 600, viimeinen sarake 42 on 96 px.
  const s5 = varmistettavatSarakkeet(21300, 21600 + 375, 21600, L);
  assert.ok(s5.has(41) && s5.has(42) && s5.has(0), [...s5].join(','));
});

test('ilman saumaa sarakkeet pysyvät ennallaan', () => {
  const s = varmistettavatSarakkeet(1000, 2100, 10800, L);
  for (const tx of [1, 2, 3, 4]) assert.ok(s.has(tx), `sarake ${tx}`);
  assert.ok(!s.has(0) && !s.has(21), [...s].join(','));
  // Koko leveys: kaikki sarakkeet.
  assert.equal(varmistettavatSarakkeet(0, 20000, 10800, L).size, 22);
});
