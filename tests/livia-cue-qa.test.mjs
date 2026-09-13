import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { luoLivianQaToistokerta } from '../docs/livia-cue-qa-session.mjs';
import { kuunteleLivianTilanteita } from '../js/livia-tilanteet.js';
import { livianKasvopuheenTila } from '../js/livia-puhetila.js';

const html = fs.readFileSync(new URL('../docs/livia-cue-ab.html', import.meta.url), 'utf8');
const script = fs.readFileSync(new URL('../docs/livia-cue-ab.mjs', import.meta.url), 'utf8');
const sessionScript = fs.readFileSync(new URL('../docs/livia-cue-qa-session.mjs', import.meta.url), 'utf8');

test('cue-QA käyttää oikeaa audioelementtiä ja tuotannon ohjainketjua', () => {
  assert.match(html, /<audio id="audio" controls/);
  assert.match(script, /lataaLivianPilottiEleet/);
  assert.match(script, /luoLivianQaToistokerta/);
  assert.match(sessionScript, /kytkeLivianPuheEleet/);
  assert.match(script, /asennaLivianKasvot/);
  assert.match(sessionScript, /seuraaLivianKasvoAanitetta/);
  assert.match(script, /audio\.currentTime/);
  assert.match(script, /audio\.playbackRate/);
  assert.match(html, /<audio[^>]+inert[^>]+aria-disabled="true"/);
  assert.match(html, /<fieldset id="transport" disabled>/);
});

test('cue-QA rajaa tapaukset ja näyttää paikallisoriginin CORS-portin', () => {
  assert.match(script, /berliini-3/);
  assert.match(script, /tromssa-3/);
  assert.doesNotMatch(script, /helsinki-3/);
  assert.match(script, /location\.origin === 'https:\/\/matkakirja\.app'/);
  assert.match(script, /Odotettu CORS-raja paikallisoriginilla/);
  assert.match(html, /390 px/);
  assert.match(html, /Vähennetty liike/);
  assert.match(html, /html,body\{height:auto;min-height:100%;overflow-x:hidden;overflow-y:auto/);
});

class FakeAudio extends EventTarget {
  constructor() {
    super();
    this.currentTime = 0;
    this.playbackRate = 1;
    this.paused = true;
    this.ended = false;
    this.muted = false;
    this.volume = 1;
  }

  fire(type) { this.dispatchEvent(new Event(type)); }
}

test('QA-soittimen istunto sitoo puheidentiteetin ennen cuea ja rakentuu uudelleen vasta terminal-lopun jälkeen', (t) => {
  const audio = new FakeAudio();
  const starts = [];
  const stopSituations = kuunteleLivianTilanteita((kind, detail) => {
    if (kind === 'speechCue' && detail.puheTunnus === audio) {
      starts.push({ id: detail.tunnus, voiceActive: livianKasvopuheenTila().length === 1 });
    }
  });
  const session = luoLivianQaToistokerta(audio, [
    { id: 'qa.c1', alku: 100, loppu: 900, tarkoitus: 'selittaa', voimakkuus: 0.4 },
  ], 'QA-puhe');
  t.after(() => { session.tuhoa(); stopSituations(); });

  const playAt = (seconds) => {
    audio.currentTime = seconds;
    audio.paused = false;
    audio.ended = false;
    audio.fire('play');
    audio.fire('playing');
    audio.fire('timeupdate');
  };

  playAt(0.2);
  assert.deepEqual(starts.at(-1), { id: 'qa.c1', voiceActive: true });

  audio.paused = true;
  audio.fire('pause');
  playAt(0.5);
  assert.equal(starts.length, 2, 'tauolta jatko käynnistää nykyisen cuen');
  assert.equal(starts.at(-1).voiceActive, true);

  audio.paused = true;
  audio.fire('pause');
  audio.currentTime = 0.7;
  audio.fire('seeking');
  audio.fire('seeked');
  assert.equal(starts.length, 2, 'tauolla kelaus ei käynnistä cuea');
  playAt(0.7);
  assert.equal(starts.length, 3, 'kelauksen jälkeinen play sovittaa oikeaan cueen');
  assert.equal(starts.at(-1).voiceActive, true);

  audio.paused = true;
  audio.ended = true;
  audio.fire('ended');
  assert.equal(session.kytketty(), false);
  playAt(0.2);
  assert.equal(starts.length, 4, 'luonnollisen lopun jälkeinen replay saa uuden sidonnan');
  assert.equal(starts.at(-1).voiceActive, true);

  session.tuhoa();
  audio.paused = true;
  audio.fire('pause');
  playAt(0.2);
  assert.equal(starts.length, 4, 'purun jälkeen native play ei rakenna uutta istuntoa');
});
