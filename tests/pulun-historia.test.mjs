/*
 * PULUN ÄÄNIHISTORIA — VARTIO.
 *
 * Työkalu (tools/pulun-historia.mjs) on olemassa yhtä kysymystä varten
 * (omistaja 13.9.2026: *"Säilyykö generointi elevenin päässä
 * tallessa?"*). Sen arvo on siinä, että se on PELKKÄ LUKU: jos se
 * alkaisi generoida, ilmainen tarkistus muuttuisi maksulliseksi ajoksi
 * ohi sovitun ajo-omistajuuden.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { tulkitseArgumentit, rivinTiedot, PULU_AANI } from '../tools/pulun-historia.mjs';

const LAHDE = readFileSync(new URL('../tools/pulun-historia.mjs', import.meta.url), 'utf8');

test('oletukset ovat turvalliset: ei latausta, suodatus omistajan ääneen', () => {
  const liput = tulkitseArgumentit([]);
  assert.equal(liput.lataa, null);
  assert.equal(liput.kaikki, false);
  assert.equal(liput.aani, PULU_AANI);
  assert.equal(PULU_AANI, 'piI8Kku0DcvcL6TTSeQt');
});

test('liput luetaan oikein', () => {
  const liput = tulkitseArgumentit(['--kaikki', '--sivut', '3', '--lataa', 'media/koe']);
  assert.equal(liput.kaikki, true);
  assert.equal(liput.sivut, 3);
  assert.equal(liput.lataa, 'media/koe');
});

test('rivi kestää puuttuvat kentät kaatumatta', () => {
  assert.deepEqual(rivinTiedot({}), {
    id: '', voiceId: '', voiceName: '', malli: '', aika: '', teksti: '',
  });
  const r = rivinTiedot({
    history_item_id: 'abc', voice_id: 'v1', model_id: 'eleven_v3',
    date_unix: 0, text: '  kaksi   väliä  ',
  });
  assert.equal(r.id, 'abc');
  assert.equal(r.teksti, 'kaksi väliä');
  assert.equal(r.aika, '1970-01-01T00:00:00.000Z');
});

test('työkalu ei generoi eikä vuoda avainta', () => {
  assert.equal(LAHDE.includes('text-to-speech'), false,
    'historiatyökalu ei saa kutsua puhesyntetisaattoria');
  assert.equal(LAHDE.includes("method: 'POST'"), false, 'vain GET-kutsuja');
  // Avain kulkee vain otsakkeessa: sitä ei tulosteta eikä kirjoiteta.
  assert.equal(/console\.(log|error)\([^)]*avain[^)]*\)/.test(LAHDE), false,
    'avainta ei saa tulostaa');
  assert.equal(/writeFileSync\([^)]*avain/.test(LAHDE), false,
    'avainta ei saa kirjoittaa tiedostoon');
});
