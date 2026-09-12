import test from 'node:test';
import assert from 'node:assert/strict';

import { LIVIAN_PILOTTI_CUET } from '../js/livia-pilotti-cuet.js';
import { kokoaEledata, livianKohdistustyo, lueLiput, ratkaiseCueAjat } from '../tools/kohdista-pulu-eleet.mjs';

function alignment(teksti) {
  const characters = [...teksti];
  return {
    characters,
    character_start_times_seconds: characters.map((_, i) => i * .02),
    character_end_times_seconds: characters.map((_, i) => (i + 1) * .02),
  };
}

test('liput eivät vie ilman eksplisiittistä --vie-valintaa', () => {
  assert.deepEqual(lueLiput(['--kuiva']), { kuiva: true, vie: false, kaupungit: [] });
  assert.deepEqual(lueLiput(['--kaupungit', 'marseille,ateena', '--vie']),
    { kuiva: false, vie: true, kaupungit: ['marseille', 'ateena'] });
  assert.throws(() => lueLiput(['--generoi']), /tuntematon lippu/);
});

test('forced alignment ratkaisee cue-alkujen sanapaikat eikä päästä cueita päällekkäin', () => {
  const tyo = livianKohdistustyo('marseille');
  const eleet = ratkaiseCueAjat(tyo, alignment(tyo.teksti));
  assert.deepEqual(eleet.map((e) => e.id), LIVIAN_PILOTTI_CUET.marseille.cuet.map((e) => e.id));
  assert.ok(eleet.every((e) => Number.isInteger(e.alku) && Number.isInteger(e.loppu) && e.loppu > e.alku));
  for (let i = 1; i < eleet.length; i += 1) assert.ok(eleet[i - 1].loppu <= eleet[i].alku);
});

test('kirjoitettava data kantaa teksti- ja mp3-sidonnan ja kelpaa samalle runtimeportille', async () => {
  const tyo = livianKohdistustyo('ateena');
  const aanitavut = new TextEncoder().encode('lopullinen-mp3');
  const data = await kokoaEledata(tyo, aanitavut, alignment(tyo.teksti));
  assert.equal(data.tekstiSha256, tyo.tekstiSha256);
  assert.equal(data.aani.tavut, aanitavut.byteLength);
  assert.match(data.aani.sha256, /^[0-9a-f]{64}$/);
  assert.equal(data.eleet.length, tyo.cuet.length);
});
