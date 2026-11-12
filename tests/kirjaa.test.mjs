// Raamatun ovi tools/kirjaa.mjs: KK:n kahdeksan hyväksymiskoetta (suunnitelma 20261112-raamattu-uusiksi.md osa 9).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

test('kirjaa.mjs: kahdeksan hyväksymiskoetta väliaikaisessa repossa', () => {
  const r = spawnSync('node', ['tools/kirjaa-kokeet.mjs'], { encoding: 'utf8' });
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.match(r.stdout, /KAIKKI 8 KOETTA ODOTETUSTI/);
});
