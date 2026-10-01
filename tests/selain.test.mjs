// YHTEINEN CHROMIUM-KÄYNNISTYS (tools/selain.mjs, omistaja 29.9.2026): GPU oletuksena Macilla,
// CPU vain pyydettäessä, kutsujan piirtotapa kunnioitettu, disable-features yhdeksi lipuksi. Vartija:
// Playwright-työkalut käynnistävät Chromiumin avaaChromiumilla eivätkä suoraan chromium.launch-kutsulla.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { GPU_LIPUT, piirtoLiput, yhdistaLiput } from '../tools/selain.mjs';

const mac = process.platform === 'darwin';

test('GPU-liput oletuksena Macilla, ei Linuxissa', () => {
  delete process.env.SELAIN_CPU;
  assert.deepEqual(piirtoLiput([]), mac ? GPU_LIPUT : []);
});

test('CPU pyydettäessä: valinta tai SELAIN_CPU=1', () => {
  assert.deepEqual(piirtoLiput([], { cpu: true }), []);
  process.env.SELAIN_CPU = '1';
  assert.deepEqual(piirtoLiput([]), []);
  delete process.env.SELAIN_CPU;
});

test('kutsujan oma piirtotapa (--use-gl / --use-angle) kunnioitetaan', () => {
  assert.deepEqual(piirtoLiput(['--use-gl=angle', '--use-angle=swiftshader']), []);
});

test('disable-features yhdistetään yhdeksi lipuksi, pilkulliset liput ehjinä', () => {
  const liput = yhdistaLiput(['--window-size=1400,900', '--disable-features=A', '--disable-features=B']);
  assert.ok(liput.includes('--window-size=1400,900'));
  const pois = liput.filter((l) => l.startsWith('--disable-features='));
  assert.equal(pois.length, 1);
  for (const f of ['HardwareMediaKeyHandling', 'MediaSessionService', 'A', 'B']) assert.match(pois[0], new RegExp(f));
});

test('Playwright-työkalut käyttävät avaaChromiumia (ei suoraa chromium.launch-kutsua)', () => {
  const tiedostot = execSync("git ls-files 'tools/*.mjs' 'tools/**/*.mjs'", { encoding: 'utf8' }).split('\n').filter(Boolean);
  const suorat = tiedostot.filter((t) => t !== 'tools/selain.mjs' && t !== 'tools/savukkeet/chromium-liput.mjs'
    && /\bchromium\.launch\(/.test(readFileSync(t, 'utf8')));
  assert.deepEqual(suorat, [], `suora chromium.launch: ${suorat.join(', ')}`);
});

test('ääni mykistetty oletuksena, kuultava vain pyydettäessä (omistaja 30.9.2026)', async () => {
  const { aaniLiput } = await import('../tools/selain.mjs');
  const ennen = process.env.SELAIN_AANI;
  delete process.env.SELAIN_AANI;
  assert.deepEqual(aaniLiput([]), ['--mute-audio']);
  assert.deepEqual(aaniLiput(['--mute-audio']), [], 'ei kahdesti');
  assert.deepEqual(aaniLiput([], { aani: true }), []);
  process.env.SELAIN_AANI = '1';
  assert.deepEqual(aaniLiput([]), []);
  if (ennen === undefined) delete process.env.SELAIN_AANI; else process.env.SELAIN_AANI = ennen;
});
