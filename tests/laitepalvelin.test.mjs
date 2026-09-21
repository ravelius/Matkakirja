/*
 * Laitepalvelin (tools/laitepalvelin.mjs): ämpärin osoite kirjoitetaan
 * palvelimen omaksi /ampari/-poluksi, jotta WebKit lataa pallon
 * laatat ilman CORSia lähiverkosta (iPad, 21.9.2026).
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { kirjoitaAmpari } from '../tools/laitepalvelin.mjs';

test('kirjoitaAmpari vaihtaa jokaisen ämpäriosoitteen palvelimen omaksi poluksi', () => {
  const teksti = "const R2 = 'https://media.matkakirja.app/'; fetch('https://media.matkakirja.app/audio/x.mp3');";
  const ulos = kirjoitaAmpari(teksti, 'http://192.168.1.20:8791');
  assert.equal(ulos.includes('media.matkakirja.app'), false);
  assert.equal(ulos, "const R2 = 'http://192.168.1.20:8791/ampari/'; fetch('http://192.168.1.20:8791/ampari/audio/x.mp3');");
});
