// Raamatun ovi tools/kirjaa.mjs: KK:n kahdeksan hyväksymiskoetta (suunnitelma 20261112-raamattu-uusiksi.md osa 9).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

test('kirjaa.mjs: kahdeksan hyväksymiskoetta väliaikaisessa repossa', () => {
  const r = spawnSync('node', ['tools/kirjaa-kokeet.mjs'], { encoding: 'utf8' });
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.match(r.stdout, /KAIKKI 8 KOETTA ODOTETUSTI/);
});

// OHJEET-osio (KK 12.11.2026, 20261112-kirjaa-hae-ohjeet.md): hae löytää elävät ohjeet nimestä tai alusta, nimiosumat ensin.
test('kirjaa hae: OHJEET-osio löytää ohjeet (sanasto, linssit, kuumailmapallokierros)', () => {
  const hae = (s) => spawnSync('node', ['tools/kirjaa.mjs', 'hae', s, '--juuri', process.cwd()],
    { encoding: 'utf8', env: { ...process.env, KIRJAA_LUKULOKI: '/dev/null' } }).stdout;
  const sanasto = hae('sanasto');
  assert.match(sanasto, /^OHJEET \(\d+\)$/m);
  assert.match(sanasto.split('OHJEET')[1].split('\n')[1], /docs\/tuotanto\/sanasto\.md/);
  const linssi = hae('linssi').split('OHJEET')[1];
  assert.match(linssi, /docs\/moduulit\/linssit\.md/);
  assert.match(linssi, /docs\/tuotanto\/reseptit\/linssi-[a-z]+\.md/);
  assert.match(hae('kuumailmapallokierros'), /docs\/tuotanto\/reseptit\/kuumailmapallokierros\.md/);
});
