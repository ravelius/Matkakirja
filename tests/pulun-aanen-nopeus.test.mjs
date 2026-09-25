/**
 * PULUN ÄÄNESSÄ EI OLE FFMPEG-NOPEUTUSTA.
 *
 * Omistaja 13.9.2026 sanatarkasti: "Ota pulun äänestä fmpeg nopeutus
 * pois". Aiemmin viimeistelyketju ajoi `atempo=1.080`. Tämä vahti pitää
 * huolen siitä, ettei nopeutus palaa vahingossa takaisin: oletusketjussa
 * ei saa olla atempoa lainkaan, ja lipulla annettu nopeus saa silti
 * toimia kokeiluja varten.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { viimeistelySuodatin, tulkitseArgumentit } from '../tools/generoi-pulu.mjs';

test('oletusviimeistely ei nopeuta puhetta ffmpegillä', () => {
  const ketju = viimeistelySuodatin({ kesto: 6, korjausDb: -1.5 });
  assert.equal(ketju.includes('atempo'), false, `atempo löytyi: ${ketju}`);
  // Muu ketju säilyy: häivytykset, taso ja hiljainen häntä.
  assert.match(ketju, /afade=t=in/);
  assert.match(ketju, /afade=t=out/);
  assert.match(ketju, /volume=-1\.50dB/);
  assert.match(ketju, /apad=pad_dur=/);
});

test('tempo-lipun oletus on 1,0', () => {
  assert.equal(tulkitseArgumentit([]).tempo, 1);
  assert.equal(viimeistelySuodatin({ kesto: 6, korjausDb: 0, tempo: 1 }).includes('atempo'), false);
});

test('nimenomainen --tempo toimii yhä kokeiluja varten', () => {
  const liput = tulkitseArgumentit(['--tempo', '1.08']);
  assert.equal(liput.tempo, 1.08);
  const ketju = viimeistelySuodatin({ kesto: 6, korjausDb: 0, tempo: liput.tempo });
  assert.match(ketju, /atempo=1\.080/);
});
