/*
 * PALLON Z10 PÄIVÄMÄÄRÄRAJALLA (Karttaseppä 28.9.2026): lähdelaattasuodatin kiersi
 * sarakkeet modulona, mutta ehto `x !== x1 + 1` ei täyty, kun x1 on viimeinen sarake
 * (674 / 1349): osa 1/64 (lon −180…) jäi ikuiseen silmukkaan 9 tunniksi.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const s = readFileSync(new URL('../tools/tee-pallolaatat.mjs', import.meta.url), 'utf8');

test('sarakekierto päättyy myös viimeisellä sarakkeella', () => {
  assert.doesNotMatch(s, /x !== x1 \+ 1;/);
  assert.match(s, /x !== \(x1 \+ 1\) % 675; x = \(x \+ 1\) % 675/);
  assert.match(s, /x !== \(x1 \+ 1\) % 1350; x = \(x \+ 1\) % 1350/);
  // Sama kierto kuin koodissa: x0 = x1 = 674 käy yhden sarakkeen ja päättyy.
  const kaydyt = []; const x0 = 674; const x1 = 674;
  for (let x = x0 % 675; x !== (x1 + 1) % 675; x = (x + 1) % 675) { kaydyt.push(x); if (kaydyt.length > 675) break; }
  assert.deepEqual(kaydyt, [674]);
});
