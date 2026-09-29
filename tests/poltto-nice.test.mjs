/*
 * NICE-OLETUS (omistaja 28.9.2026, Raamattu #3527): paikallinen poltto ajaa
 * nice 15:llä, ja kevyt tila /tmp/matkakirja-kevyt lisää taustaprioriteetin.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const s = readFileSync(new URL('../tools/polta-paikallisesti.sh', import.meta.url), 'utf8');

test('polttoskripti asettaa nice 15:n ennen työtä ja kevyen tilan taustaprioriteetin', () => {
  const nice = s.indexOf('renice -n 15 -p $$');
  assert.ok(nice > 0 && nice < s.indexOf('JUURI="$('));
  assert.match(s, /if \[ -f \/tmp\/matkakirja-kevyt \] && command -v taskpolicy/);
  assert.match(s, /taskpolicy -b -p \$\$ >\/dev\/null 2>&1 \|\| true/);
});
