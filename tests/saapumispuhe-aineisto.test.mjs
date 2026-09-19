import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {EUROPE} from '../js/packs/europe.js';
import {FOKUSVIRRAT} from '../js/packs/fokusvirrat.js';
import {ISKULAUSEET} from '../js/packs/iskulauseet.js';
import {SAAPUMISPUHEET, SAAPUMISPUHE_AANI} from '../js/packs/saapumispuheet.js';
import {haeSaapumispuhe} from '../js/media.js';
const delivery=JSON.parse(readFileSync(new URL('../docs/raportit/horatio-saapumisaanet-eurooppa-20260915.json',import.meta.url),'utf8'));
test('media lookup exposes the new take without fallback or playback',()=>{
  assert.equal(haeSaapumispuhe('ateena'),SAAPUMISPUHEET.ateena);
  assert.equal(haeSaapumispuhe({id:'sofia'}),SAAPUMISPUHEET.sofia);
  for(const id of ['missing','toString','__proto__',undefined,null])assert.equal(haeSaapumispuhe(id),null);
});
/*
 * KAUPUNGIT ILMAN HORATION SAAPUMISOTTOA — nimetty poikkeus, ei
 * löysennys. Bryssel (19.9.2026, omistajan päätös: Belgian
 * pelikaupunki, pilotti) on ensimmäinen fokusvirtakaupunki sen 15.9.2026
 * suljetun 45 kaupungin erän jälkeen. Sonnet-sisältösessiolla ei ole
 * pääsyä ElevenLabs-äänituotantoon, joten saapumisottoa ei voi luoda
 * tässä sessiossa — se vaatii oman Horatio-tuotantoerän (ks.
 * docs/raportit/horatio-saapumisaanet-eurooppa-20260915.json ja
 * tools/, joilla erä ajettiin). Poikkeus on nimetty, jotta uusi
 * äänetön kaupunki ei livahda mukaan huomaamatta.
 */
const ILMAN_SAAPUMISOTTOA = new Set(['bryssel', 'ljubljana']);

test('saapumispuheet cover exactly the canonical 45 Europe cities plus named gaps',()=>{
  const odotettu=Object.keys(FOKUSVIRRAT).filter((id)=>!ILMAN_SAAPUMISOTTOA.has(id));
  assert.deepEqual(Object.keys(SAAPUMISPUHEET),odotettu);
  const puuttuu=Object.keys(FOKUSVIRRAT).filter((id)=>!Object.hasOwn(SAAPUMISPUHEET,id));
  assert.deepEqual(puuttuu.sort(),[...ILMAN_SAAPUMISOTTOA].sort());
  assert.equal(delivery.cities.length,45);
  assert.equal(new Set(delivery.cities.map(r=>r.id)).size,45);
});
test('one exact name plus unchanged slogan, Horatio only, no tags or fixed pause',()=>{
  const names=new Map(EUROPE.cities.map(c=>[c.id,c.name]));
  assert.equal(SAAPUMISPUHE_AANI.voiceId,'Sz0tRTEpybtDJ9ru2kgD');
  assert.equal(SAAPUMISPUHE_AANI.model,'eleven_v3');
  assert.equal(SAAPUMISPUHE_AANI.stability,0.5);
  for(const [id,row] of Object.entries(SAAPUMISPUHEET)){
    assert.equal(row.name,names.get(id));
    assert.equal(row.slogan,ISKULAUSEET[id]);
    assert.equal(row.text,row.name+'.\n'+row.slogan+'.');
    assert.ok(!/[\[\]<>]/.test(row.text));
    assert.equal(row.singleTake,true);
  }
});
test('every runtime asset matches the verified immutable receipt',()=>{
  for(const row of delivery.cities){
    const runtime=SAAPUMISPUHEET[row.id];
    assert.equal(runtime.url,row.url);
    assert.equal(runtime.sha256,row.sha256);
    assert.equal(runtime.duration,row.duration);
    assert.equal(runtime.text,row.spokenText);
    assert.match(runtime.url,/^https:\/\/media\.matkakirja\.app\/audio\/textdesk\/aani-[a-f0-9]{24}\/[a-f0-9]{64}\.mp3$/);
    assert.match(runtime.sha256,/^[a-f0-9]{64}$/);
    assert.ok(runtime.duration>1&&runtime.duration<20);
  }
  assert.equal(new Set(delivery.cities.map(r=>r.url)).size,45);
  assert.equal(new Set(delivery.cities.map(r=>r.sha256)).size,45);
});
test('the three approved pilot takes are reused byte-for-byte',()=>{
  const expected={
    ateena:'d435da7d700290c712784489ad777f806726ccd4e5553242cb59dc5af9bd2cf1',
    sofia:'029fe471c0a1fe42a36e1b97a85bf193064c0b787c8971d31e9841eef6137934',
    istanbul:'fe9c15542fcfee73ebfcd65df2eeacb56f5c8685a8b29d4a7d86a9d5ffc729da',
  };
  assert.deepEqual(delivery.cities.filter(r=>r.reusedApprovedPilot).map(r=>r.id),Object.keys(expected));
  for(const [id,sha] of Object.entries(expected))assert.equal(SAAPUMISPUHEET[id].sha256,sha);
  assert.equal(delivery.verification.newGenerations,42);
  assert.equal(delivery.verification.reusedApprovedPilot,3);
  assert.equal(delivery.voice.postprocess,'none');
});
