// --kuiva ei saa kutsua ElevenLabsia, kirjoittaa tiedostoja eikä viedä raakaa (PT 12.10.2026: kuiva-ajo generoi aiemmin oikeasti).
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = resolve(dirname(fileURLToPath(import.meta.url)), '..');

test('generoi-kaari --kuiva: ei API-avainta, ei verkkoa, ei tiedostoja', () => {
  const env = { ...process.env, HTTPS_PROXY: 'http://127.0.0.1:1', HTTP_PROXY: 'http://127.0.0.1:1', NODE_USE_ENV_PROXY: '1' };
  delete env.ELEVEN_API_KEY; delete env.ELEVENLABS_API_KEY;
  const ajo = spawnSync(process.execPath, ['tools/generoi-kaari.mjs', 'sarajevo', '--mykistetyt', '--osat=kohtaaminen,aarre', '--kuiva'], { cwd: JUURI, env, encoding: 'utf8', timeout: 60000 });
  assert.equal(ajo.status, 0, ajo.stderr);
  assert.match(ajo.stdout, /KUIVA — generoitaisiin/);
  assert.match(ajo.stdout, /Kuiva-ajo valmis — 2 luentaa/);
  assert.doesNotMatch(ajo.stdout, /raaka talteen|generoidaan \(/);
  assert.equal(existsSync(resolve(JUURI, 'assets/audio/puhe-kaari-kohtaaminen-sarajevo.mp3.kuiva')), false);
});
