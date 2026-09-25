// Löydös 129: meren syvyysrampin kontrasti (tools/fokuskartta/piirto.js asetaSyvyyskontrasti).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SYVYYS, lerpSyvyys, asetaSyvyyskontrasti } from '../tools/fokuskartta/piirto.js';

test('k = 1 jättää rampin tavulleen ennalleen, k > 1 tummentaa syvää ja säilyttää matalan', () => {
  const ennen = JSON.stringify(SYVYYS);
  asetaSyvyyskontrasti(1);
  assert.equal(JSON.stringify(SYVYYS), ennen);
  const syva = lerpSyvyys(-4000); const pinta = lerpSyvyys(0);
  asetaSyvyyskontrasti(1.5);
  assert.deepEqual(lerpSyvyys(0), pinta);
  const syva2 = lerpSyvyys(-4000);
  for (let i = 0; i < 3; i += 1) assert.ok(syva2[i] < syva[i] - 10, `kanava ${i}: ${syva2[i]} vs ${syva[i]}`);
  // Seepia säilyy: punainen ≥ sininen myös syvällä.
  assert.ok(syva2[0] > syva2[2]);
});
