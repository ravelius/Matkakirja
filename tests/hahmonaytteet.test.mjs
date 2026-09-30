// Hahmojen ääninäytteiden CI-työkalu (tools/hahmonaytteet.mjs): syötteen rajat ja whisper-osuma, ei verkkoa.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { tarkistaGeneroi, osuma, tunnus, MALLI, MUOTO } from '../tools/hahmonaytteet.mjs';

const rivi = (hahmo, ab, teksti = 'Kolme kuutosta!') => ({ hahmo, ab, voice_id: 'abcdefghij0123456789', voice_nimi: 'Testi', teksti });

test('syöte: lupa pakollinen, rajat ja kaksoiskappaleet', () => {
  assert.throws(() => tarkistaGeneroi({ naytteet: [rivi('Vouti', 'A')] }), /lupa/);
  const t = tarkistaGeneroi({ lupa: 'omistaja 30.9. loki', naytteet: [rivi('Muurin vartija', 'A'), rivi('Muurin vartija', 'B')] });
  assert.equal(t.naytteet[0].tiedosto, 'naytteet/01-muurin-vartija-A.mp3');
  assert.throws(() => tarkistaGeneroi({ lupa: 'omistaja 30.9.', naytteet: [rivi('Vouti', 'A'), rivi('Vouti', 'A')] }), /kahdesti/);
  assert.throws(() => tarkistaGeneroi({ lupa: 'omistaja 30.9.', naytteet: Array.from({ length: 31 }, (_, i) => rivi(`H${i}`, 'A')) }), /30/);
  assert.throws(() => tarkistaGeneroi({ lupa: 'omistaja 30.9.', naytteet: [{ ...rivi('Vouti', 'A'), voice_id: 'x' }] }), /voice_id/);
});

test('whisper-osuma sanatasolla, tunnus ilman ääkkösiä', () => {
  assert.equal(osuma('Kolme kuutosta! Maksa, kun vielä kehtaat.', 'kolme kuutosta maksa kun vielä kehtaat'), 100);
  assert.ok(osuma('Kolme kuutosta!', 'kolme kutosta') < 100);
  assert.equal(tunnus('Aitan hoitaja'), 'aitan-hoitaja');
  assert.equal(tunnus('Pappi'), 'pappi');
});

test('malli ja muoto ovat omistajan linjaus (eleven_v4, 192 kbit/s), avaimet vain salaisuuksista', () => {
  assert.equal(MALLI, 'eleven_v4');
  assert.equal(MUOTO, 'mp3_44100_192');
  const wf = readFileSync(new URL('../.github/workflows/generoi-hahmonaytteet.yml', import.meta.url), 'utf8');
  assert.match(wf, /ELEVEN_API_KEY: \$\{\{ secrets\.ELEVEN_API_KEY \}\}/);
  assert.doesNotMatch(readFileSync(new URL('../tools/hahmonaytteet.mjs', import.meta.url), 'utf8'), /console\.log\([^)]*API_KEY/);
});
