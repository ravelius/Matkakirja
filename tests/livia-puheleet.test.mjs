import test from 'node:test';
import assert from 'node:assert/strict';
import { kytkeLivianPuheEleet, LIVIAN_PUHEELEEN_MAX_MS, tarkistaLivianPuheEleet, paivitaLivianPuheEleet } from '../js/livia-puheleet.js';
import { LIVIA_SVG_ELEET } from '../js/livia-svg.js';
import { kuunteleLivianTilanteita } from '../js/livia-tilanteet.js';

class KoeAudio extends EventTarget {
  currentTime = 0;
  playbackRate = 1;
  paused = true;
  ended = false;
  muted = false;
  volume = 1;
  laheta(nimi) { this.dispatchEvent(new Event(nimi)); }
}

const eleet = [
  { id: 'marseille.livia.c1', alku: 500, loppu: 2100, tarkoitus: 'selittaa', voimakkuus: .45 },
  { id: 'marseille.livia.c2', alku: 2600, loppu: 3400, tarkoitus: 'selittaa', voimakkuus: .35 },
];

test('piirtokello havaitsee rajat ilman timeupdatea, ei herätä taukoa tai keskeneräistä kelausta',t=>{
 const audio=new KoeAudio(),tapahtumat=[];
 const off=kuunteleLivianTilanteita((laji,tiedot)=>tapahtumat.push([laji,tiedot.tunnus]));
 const pura=kytkeLivianPuheEleet(audio,eleet);t.after(()=>{pura();off();});
 audio.paused=false;audio.laheta('playing');
 audio.currentTime=.51;paivitaLivianPuheEleet(audio);
 assert.deepEqual(tapahtumat.at(-1),['speechCue','marseille.livia.c1']);
 audio.currentTime=2.11;paivitaLivianPuheEleet(audio);
 assert.equal(tapahtumat.at(-1)[0],'speechCueEnd');
 audio.laheta('seeking');audio.currentTime=2.8;
 const n=tapahtumat.length;paivitaLivianPuheEleet(audio);assert.equal(tapahtumat.length,n);
 audio.laheta('seeked');assert.equal(tapahtumat.at(-1)[1],'marseille.livia.c2');
 for(const event of ['waiting','stalled','pause']){
  audio.laheta(event);const maara=tapahtumat.length;
  paivitaLivianPuheEleet(audio);assert.equal(tapahtumat.length,maara,event);
  audio.laheta('playing');
 }
 pura();const maara=tapahtumat.length;paivitaLivianPuheEleet(audio);assert.equal(tapahtumat.length,maara);
});

test('saman audion uusi sidonta korvaa vanhan eikä vanha purku poista uutta piirtoyhteyttä',t=>{
 const audio=new KoeAudio(),tapahtumat=[];
 const off=kuunteleLivianTilanteita((laji,tiedot)=>tapahtumat.push([laji,tiedot.tunnus]));
 const vanha=kytkeLivianPuheEleet(audio,eleet);
 const uusi=kytkeLivianPuheEleet(audio,[{...eleet[0],id:'uusi.c1'}]);
 t.after(()=>{vanha();uusi();off();});vanha();
 audio.paused=false;audio.laheta('playing');audio.currentTime=.6;paivitaLivianPuheEleet(audio);
 assert.deepEqual(tapahtumat,[['speechCue','uusi.c1']]);
});

test('kohdistettu lista hylkää epäselvän datan kokonaan', () => {
  assert.equal(LIVIA_SVG_ELEET.find((ele) => ele.id === 'cityExplain').duration, LIVIAN_PUHEELEEN_MAX_MS);
  assert.deepEqual(tarkistaLivianPuheEleet(eleet).map((r) => r.id), ['marseille.livia.c1', 'marseille.livia.c2']);
  assert.deepEqual(tarkistaLivianPuheEleet([...eleet, { ...eleet[0] }]), []);
  assert.deepEqual(tarkistaLivianPuheEleet([{ ...eleet[0], loppu: 400 }]), []);
  assert.deepEqual(tarkistaLivianPuheEleet([{ ...eleet[0], tarkoitus: '[excited]' }]), []);
  assert.deepEqual(tarkistaLivianPuheEleet([eleet[0], { ...eleet[1], alku: 2000 }]), []);
  assert.deepEqual(tarkistaLivianPuheEleet([{ ...eleet[0], alku: 0, loppu: LIVIAN_PUHEELEEN_MAX_MS + 1 }]), []);
});

test('soittimen kello ohjaa cueita; tauko, kelaus ja nopeus eivät jätä vanhaa elettä', (t) => {
  const audio = new KoeAudio();
  const tapahtumat = [];
  const off = kuunteleLivianTilanteita((laji, tiedot) => tapahtumat.push([laji, tiedot]));
  const pura = kytkeLivianPuheEleet(audio, eleet);
  t.after(() => { pura(); off(); });

  audio.currentTime = .6; audio.paused = false; audio.laheta('playing');
  assert.deepEqual(tapahtumat.map(([l, d]) => [l, d.tunnus]), [['speechCue', 'marseille.livia.c1']]);
  assert.deepEqual(Object.fromEntries(['alkuMs','loppuMs','cueKestoMs'].map((k)=>[k,tapahtumat[0][1][k]])),
    { alkuMs: 500, loppuMs: 2100, cueKestoMs: 1600 });
  audio.currentTime = 1.2; audio.laheta('ratechange');
  assert.equal(tapahtumat.length, 1, 'nopeusmuutos ei käynnistä samaa cuea uudelleen');
  audio.paused = true; audio.laheta('pause');
  assert.equal(tapahtumat.at(-1)[0], 'speechCueEnd');
  audio.currentTime = 2.8; audio.paused = false; audio.laheta('playing');
  assert.equal(tapahtumat.at(-1)[1].tunnus, 'marseille.livia.c2', 'jatko sovittaa nykyhetkeen');
  audio.laheta('seeking'); audio.currentTime = .2; audio.laheta('seeked');
  assert.equal(tapahtumat.at(-1)[0], 'speechCueEnd', 'kelaus purkaa eikä ammu väliin jäänyttä cuea');
  audio.currentTime = .7; audio.laheta('timeupdate');
  assert.equal(tapahtumat.at(-1)[1].tunnus, 'marseille.livia.c1', 'taakse kelaus sallii oikean cuen uudelleen');
});

test('puskurointi, virhe ja stale-soitin purkavat vain aktiivisen cuen', (t) => {
  const audio = new KoeAudio();
  const tapahtumat = [];
  let voimassa = true;
  const off = kuunteleLivianTilanteita((laji, tiedot) => tapahtumat.push([laji, tiedot]));
  const pura = kytkeLivianPuheEleet(audio, eleet, { voimassa: () => voimassa });
  t.after(() => { pura(); off(); });
  audio.currentTime = .8; audio.paused = false; audio.laheta('playing');
  audio.laheta('waiting');
  assert.deepEqual(tapahtumat.map(([l]) => l), ['speechCue', 'speechCueEnd']);
  audio.laheta('playing');
  voimassa = false; audio.laheta('timeupdate');
  assert.deepEqual(tapahtumat.map(([l]) => l), ['speechCue', 'speechCueEnd', 'speechCue', 'speechCueEnd']);
  audio.laheta('playing');
  assert.equal(tapahtumat.length, 4, 'purettu stale-soitin ei enää reagoi');
});

test('mykistys ei niele cuea ja äänen palautus sovittaa saman kohdan uudelleen', (t) => {
  const audio = new KoeAudio();
  const tapahtumat = [];
  const off = kuunteleLivianTilanteita((laji, tiedot) => tapahtumat.push([laji, tiedot]));
  const pura = kytkeLivianPuheEleet(audio, eleet);
  t.after(() => { pura(); off(); });
  audio.currentTime = .8; audio.paused = false; audio.muted = true; audio.laheta('playing');
  assert.deepEqual(tapahtumat, [], 'alun mykistys ei merkitse cuea aktiiviseksi');
  audio.muted = false; audio.laheta('volumechange');
  assert.equal(tapahtumat.at(-1)[0], 'speechCue');
  audio.volume = 0; audio.laheta('volumechange');
  assert.equal(tapahtumat.at(-1)[0], 'speechCueEnd');
  audio.volume = .5; audio.laheta('volumechange');
  assert.equal(tapahtumat.at(-1)[0], 'speechCue', 'äänen palautus käynnistää saman cuen uudelleen');
});
