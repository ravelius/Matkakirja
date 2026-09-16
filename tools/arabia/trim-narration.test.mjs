import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { correctedManifest, CUT } from './trim-narration.mjs';
import { IHMISEN_MATKA_KERTOMUS } from '../../js/linssit/ihmisen-matka-kertomus.js';
import { kertomuksenJasennys } from '../generoi-linssiluennat.mjs';

// Fixture from the pinned live manifest; it contains public text/timestamps only.
const fixture = JSON.parse(await readFile(new URL('./original-manifest.fixture.json', import.meta.url)));
test('the sole removed words are the owner-scoped Arabia clause', () => {
  const m = correctedManifest(fixture, 387.51, 'versioned.mp3');
  const j = m.jaksot.find(x => x.tunnus === 'arabia');
  assert.equal(j.sanat.length, 40);
  assert.deepEqual(j.lauseet, [108620,115360,122260,127140,129920]);
  assert.equal(m.jaksoja, 21);
  assert.equal(m.tiedosto, 'versioned.mp3');
  assert.equal(m.malli, 'eleven_v3');
  assert.equal(m.korjaus.synthesizedCharacters, 0);
});
test('all other words retained, pre-cut timestamps exact, later timestamps shifted exactly', () => {
  const m = correctedManifest(fixture, 387.51, 'versioned.mp3');
  fixture.jaksot.forEach((j,i) => {
    if (j.tunnus === 'arabia') return;
    const shift = j.alku < CUT.start ? 0 : CUT.removed;
    assert.equal(m.jaksot[i].alku, j.alku-shift);
    assert.equal(m.jaksot[i].loppu, j.loppu-shift);
    assert.deepEqual(m.jaksot[i].sanat, j.sanat.map(w=>({...w,alku:w.alku-shift})));
    assert.deepEqual(m.jaksot[i].lauseet, j.lauseet.map(t=>t-shift));
  });
});
test('wrong source words, unsupported model, or incomplete timing fail closed', () => {
  const words=structuredClone(fixture); words.jaksot[0].sanat[0].sana='changed';
  assert.throws(()=>correctedManifest(words,387.51,'file.mp3'));
  assert.throws(()=>correctedManifest({...fixture,malli:'eleven_multilingual_v2'},387.51,'file.mp3'));
  assert.throws(()=>correctedManifest(fixture,120,'file.mp3'));
  const sentences=structuredClone(fixture); sentences.jaksot[0].lauseet.pop();
  assert.throws(()=>correctedManifest(sentences,387.51,'file.mp3'));
});
test('all 21 canonical passages and lengths remain current', () => {
  const m=correctedManifest(fixture,387.51,'file.mp3');
  const p=kertomuksenJasennys(IHMISEN_MATKA_KERTOMUS.map(x=>({avain:x.id,teksti:x.teksti,puhe:x.luenta})),{tagit:false});
  assert.equal(m.merkkeja,p.teksti.length);
  assert.equal(m.jaksot.reduce((n,x)=>n+x.sanat.length,0),p.jaksot.reduce((n,x)=>n+x.sanat.length,0));
});
