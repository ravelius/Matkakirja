import test from 'node:test';
import assert from 'node:assert/strict';
import { soitaLinssiluenta, pysaytaLinssiluenta } from '../js/linssipuhe.js';
import { kuunteleLivianTilanteita } from '../js/livia-tilanteet.js';

function ymparisto(t) {
  class Audio extends EventTarget {
    currentTime=0; paused=true; ended=false; playCount=0;
    constructor(src){super();this.src=src;}
    play(){this.playCount++;return Promise.resolve();}
    pause(){this.paused=true;this.dispatchEvent(new Event('pause'));}
    removeAttribute(name){delete this[name];}
    soi(){this.paused=false;this.dispatchEvent(new Event('playing'));}
  }
  const ennen=Object.getOwnPropertyDescriptor(globalThis,'Audio');
  Object.defineProperty(globalThis,'Audio',{configurable:true,writable:true,value:Audio});
  t.after(()=>ennen?Object.defineProperty(globalThis,'Audio',ennen):delete globalThis.Audio);
  t.mock.timers.enable({apis:['setTimeout']});
  const ui={},events=[];const off=kuunteleLivianTilanteita((laji,tiedot)=>events.push({laji,...tiedot}));
  t.after(()=>{pysaytaLinssiluenta(ui);off();});
  return {ui,events,Audio};
}

test('linssin viive ja lataus eivät elehdi, oikea ääni ja tauot ohjaavat kuuntelua',t=>{
  const {ui,events}=ymparisto(t);
  const a=soitaLinssiluenta(ui,null,{runko:'koe',viive:350});
  assert.ok(a);assert.equal(events.length,0);assert.equal(a.playCount,0);
  t.mock.timers.tick(350);assert.equal(a.playCount,1);assert.equal(events.length,0);
  a.soi();assert.equal(events.at(-1).ele,'lookUp');assert.equal(events.at(-1).lahde,'linssiluenta');
  a.currentTime=13;a.dispatchEvent(new Event('timeupdate'));assert.equal(events.filter(x=>x.laji==='narration').length,2);
  for(const event of ['pause','waiting','stalled']){
    a.dispatchEvent(new Event(event));assert.equal(events.at(-1).laji,'narrationEnd');
    a.soi();assert.equal(events.at(-1).laji,'narration');
  }
  const count=events.length;pysaytaLinssiluenta(ui);
  assert.equal(events.length,count+1,'eksplisiittinen purku ja pause eivät monista loppua');
  assert.equal(events.at(-1).laji,'narrationEnd');assert.equal(ui.linssiluenta,null);
  a.soi();a.currentTime=30;a.dispatchEvent(new Event('timeupdate'));assert.equal(events.length,count+1);
});

test('linssin vaihto, luonnollinen loppu ja virhe vapauttavat vain oman soittimen',t=>{
  const {ui,events}=ymparisto(t);
  const a=soitaLinssiluenta(ui,null,{runko:'eka',viive:0});a.soi();
  const b=soitaLinssiluenta(ui,null,{runko:'toka',viive:0});b.soi();
  const count=events.length;
  a.soi();a.dispatchEvent(new Event('ended'));assert.equal(ui.linssiluenta,b);
  assert.equal(events.length,count,'vanha soitin ei lähetä uutta kuuntelua tai loppua');
  b.ended=true;b.dispatchEvent(new Event('ended'));assert.equal(ui.linssiluenta,null);
  assert.equal(events.at(-1).tunnus,b);assert.equal(events.at(-1).laji,'narrationEnd');
  const c=soitaLinssiluenta(ui,null,{runko:'kolmas',viive:0});c.soi();c.dispatchEvent(new Event('error'));
  assert.equal(ui.linssiluenta,null);const after=events.length;c.soi();assert.equal(events.length,after);
});

test('linssin peruttu ajastus ja hylätty play eivät jätä kuuntelua päälle',async t=>{
  const {ui,events,Audio}=ymparisto(t);
  const a=soitaLinssiluenta(ui,null,{runko:'peruttu',viive:350});pysaytaLinssiluenta(ui);
  t.mock.timers.tick(400);assert.equal(a.playCount,0);
  t.mock.method(Audio.prototype,'play',()=>Promise.reject(new Error('ei ääntä')));
  soitaLinssiluenta(ui,null,{runko:'puuttuva',viive:0});await Promise.resolve();await Promise.resolve();
  assert.equal(ui.linssiluenta,null);assert.equal(events.filter(x=>x.laji==='narration').length,0);
  assert.equal(ui.luennat.size,0);
});
