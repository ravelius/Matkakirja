/*
 * SANAVAHTI (muisti pala 5, suunnitelma 20261117-muisti-ilman-uudelleenkertomista luvut 4 ja 7).
 * Ajaa peilin tools/tyotavat/sanavahti.py --itsetesti: sääntöjen esimerkit, vanhat rikkomuslauseet luovutuksista
 * (talletettu kopio, jos Macin tiedostoa ei ole) ja säännön oma teksti ilman osumaa. Lisäksi --teksti ja --hook.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const juuri = join(dirname(fileURLToPath(import.meta.url)), '..');
const skripti = join(juuri, 'tools/tyotavat/sanavahti.py');
const aja = (args, input = '') => spawnSync('python3', ['-I', skripti, ...args], { input, encoding: 'utf8' });

test('itsetesti vihreä', () => {
  const r = aja(['--itsetesti']);
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.match(r.stdout, / 0 virhettä/);
});

test('teksti: mittausehto osuu, jälkikäteinen mittaus ei', () => {
  const o = aja(['--teksti'], 'NUI valmis. Ei junaan ennen iPad-lukuja.');
  assert.equal(o.status, 1);
  assert.match(o.stdout, /S-01/);
  assert.match(o.stdout, /tyolista\.py avaa/);
  const e = aja(['--teksti'], 'NUI valmis, junaan heti; mittaus yöllä jälkikäteen.');
  assert.equal(e.status, 0, e.stdout);
});

test('hook: KK:N PÄÄTÖS ilman hakua varoittaa, merkinnällä ei', () => {
  const h = (m) => aja(['--hook'], JSON.stringify({ hook_event_name: 'PostToolUse', tool_input: { message: m } })).stdout;
  assert.match(h('KK:N PÄÄTÖS 13.40: Temple junaan.'), /KK-PAATOS/);
  assert.equal(h('KK:N PÄÄTÖS 13.40 (aiempi: P-261117-55): Temple junaan.'), '');
});
