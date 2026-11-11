import test from 'node:test';
import assert from 'node:assert/strict';
import {EUROPE} from '../js/packs/europe.js';
import {FOKUSVIRRAT} from '../js/packs/fokusvirrat.js';
import {ISKULAUSEET} from '../js/packs/iskulauseet.js';
import {SAAPUMISPUHEET, SAAPUMISPUHEET_NIMET, SAAPUMISPUHE_AANI} from '../js/packs/saapumispuheet.js';
import {haeSaapumispuhe} from '../js/media.js';
/*
 * Saapumispuheet = kertoja William (omistaja 11.11.2026 klo 08.34 ja 08.50, Raamattu 5.1):
 * YKSI otto, 61 riviä, leikattu kaupungeittain (url = nimi + iskulause, nameUrl = pelkkä nimi).
 * Isoisän (Viisas Kertoja Sz0tRTEpybtDJ9ru2kgD) otot eivät ole enää kytkettyinä.
 */
test('media lookup exposes the take without fallback or playback',()=>{
  assert.equal(haeSaapumispuhe('ateena'),SAAPUMISPUHEET.ateena);
  assert.equal(haeSaapumispuhe({id:'sofia'}),SAAPUMISPUHEET.sofia);
  for(const id of ['missing','toString','__proto__',undefined,null])assert.equal(haeSaapumispuhe(id),null);
});
test('saapumispuheet cover every Europe focus city, each with a slogan',()=>{
  const ids=Object.keys(FOKUSVIRRAT);
  assert.equal(ids.length,61);
  assert.deepEqual(Object.keys(SAAPUMISPUHEET),ids);
  assert.deepEqual(Object.keys(ISKULAUSEET).sort(),[...ids].sort());
});
test('William, forced Finnish, name plus unchanged slogan, no tags',()=>{
  const names=new Map(EUROPE.cities.map(c=>[c.id,c.name]));
  assert.equal(SAAPUMISPUHE_AANI.voiceId,'oae6GCCzwoEbfc5FHdEu');
  assert.notEqual(SAAPUMISPUHE_AANI.voiceId,'Sz0tRTEpybtDJ9ru2kgD');
  assert.equal(SAAPUMISPUHE_AANI.model,'eleven_v4_turbo');
  assert.equal(SAAPUMISPUHE_AANI.languageCode,'fi');
  for(const [id,row] of Object.entries(SAAPUMISPUHEET)){
    assert.equal(row.name,names.get(id));
    assert.equal(row.slogan,ISKULAUSEET[id]);
    assert.ok(!/[\[\]<>]/.test(row.text));
    assert.ok(row.text.endsWith('.'));
    assert.equal(row.singleTake,true);
  }
});
test('every asset has an immutable v2 path, a sha256 and a sane duration',()=>{
  const urls=new Set(),shas=new Set();
  for(const [id,row] of Object.entries(SAAPUMISPUHEET)){
    assert.equal(row.url,`https://media.matkakirja.app/aanet/kaupunkinimet-william-v2/${id}/nimi-iskulause.mp3`);
    const n=SAAPUMISPUHEET_NIMET[id];
    assert.equal(n.url,`https://media.matkakirja.app/aanet/kaupunkinimet-william-v2/${id}/nimi.mp3`);
    for(const sha of [row.sha256,n.sha256])assert.match(sha,/^[a-f0-9]{64}$/);
    assert.ok(row.duration>1&&row.duration<6,`${id} duration`);
    assert.ok(n.duration>0.4&&n.duration<2,`${id} nameDuration`);
    urls.add(row.url);urls.add(n.url);shas.add(row.sha256);shas.add(n.sha256);
  }
  assert.equal(urls.size,122);
  assert.equal(shas.size,122);
});
