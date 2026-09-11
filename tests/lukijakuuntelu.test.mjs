import test from 'node:test';
import assert from 'node:assert/strict';
import { lueAaneen, lueVirtana, pysaytaLukija, lukijaLukee } from '../js/lukija.js';
import { kuunteleLivianTilanteita, luoLivianKuunteluvuoro } from '../js/livia-tilanteet.js';
import { livianKasvopuheenTila } from '../js/livia-puhetila.js';

function ymparisto(t, window) {
  const ennen=Object.getOwnPropertyDescriptor(globalThis,'window');
  Object.defineProperty(globalThis,'window',{configurable:true,writable:true,value:window});
  const events=[],off=kuunteleLivianTilanteita((laji,tiedot)=>events.push({laji,...tiedot}));
  t.after(()=>{pysaytaLukija();off();ennen?Object.defineProperty(globalThis,'window',ennen):delete globalThis.window;});
  t.mock.timers.enable({apis:['setTimeout','setInterval']});
  return events;
}

function selain(t) {
  const lausumat=[];
  const events=ymparisto(t,{
    navigator:{onLine:false},
    speechSynthesis:{getVoices:()=>[],cancel(){},speak:a=>lausumat.push(a)},
    SpeechSynthesisUtterance:class {constructor(text){this.text=text;}},
  });
  return {events,lausumat};
}

test('kuunteluvuoro: oma tunnus, 12 sekunnin rytmi, tauko ja lopullinen purku',t=>{
  const events=ymparisto(t,{}),tunnus={};
  const v=luoLivianKuunteluvuoro(tunnus,{lahde:'lukija'});
  v.paivita(false);assert.equal(events.length,0);
  v.paivita(true,0);v.paivita(true,11);assert.equal(events.length,1);
  assert.equal(events[0].ele,'lookUp');assert.equal(events[0].tunnus,tunnus);
  v.paivita(true,12);assert.equal(events.length,2);
  v.paivita(false);v.paivita(false);assert.equal(events.length,3);
  v.paivita(true,13);assert.equal(events.length,4);
  v.paivita(true,1);assert.equal(events.length,5,'taaksepäin kelaus palauttaa eleen');
  v.lopeta();v.lopeta();v.paivita(true,50);assert.equal(events.length,6);
  assert.equal(events.at(-1).laji,'narrationEnd');
});

test('selainlukija kuuntelee vasta onstartista, säilyttää vuoron palojen yli ja purkaa lopussa',t=>{
  const {events,lausumat}=selain(t);
  assert.equal(lueAaneen('Ensimmäinen kappale.\nToinen kappale.'),true);
  const a=lausumat[0];a.onboundary();assert.equal(events.length,0,'jonotus ei ole ääntä');
  a.onstart();assert.equal(events[0].ele,'lookUp');assert.equal(events[0].lahde,'lukija');
  assert.deepEqual(livianKasvopuheenTila(),[],'kertoja ei liikuta Pulun suuta');
  const vanhaLoppu=a.onend,vanhaAlku=a.onstart;
  a.onend();const b=lausumat[1];assert.equal(events.length,1,'kappale ei katkaise kuuntelua');
  vanhaLoppu();vanhaAlku();assert.equal(lausumat.length,2,'myöhäinen tuplaloppu ei ohita seuraavaa palaa');
  b.onstart();assert.equal(events.length,1,'sama vuoro ei tee aloituseleitä jokaiselle virkkeelle');
  b.onpause();assert.equal(events.at(-1).laji,'narrationEnd');
  b.onresume();assert.equal(events.at(-1).laji,'narration');
  b.onend();assert.equal(events.at(-1).laji,'narrationEnd');assert.equal(lukijaLukee(),false);
});

test('selainlukijan virhe vapauttaa kuuntelun; vanhat kutsut eivät muuta uutta lukijaa',t=>{
  const {events,lausumat}=selain(t);
  lueAaneen('Ensimmäinen.\nToinen.');const a=lausumat[0];a.onstart();a.onerror();
  assert.equal(events.at(-1).laji,'narrationEnd');
  const b=lausumat[1];assert.equal(events.length,2);b.onstart();
  const vanhaAlku=b.onstart,vanhaLoppu=b.onend,vanhaVirhe=b.onerror;
  lueAaneen('Uusi lukija.');const c=lausumat.at(-1);c.onstart();const n=events.length;
  vanhaAlku();vanhaLoppu();vanhaVirhe();assert.equal(events.length,n);
  assert.equal(lukijaLukee(),true);pysaytaLukija();assert.equal(events.length,n+1);
  pysaytaLukija();assert.equal(events.length,n+1);
});

test('virtalukijan tyhjä jono vapauttaa kuuntelun ja uusi teksti odottaa oikeaa alkua',t=>{
  const {events,lausumat}=selain(t);const v=lueVirtana();
  v.lisaa('Ensimmäinen.');const a=lausumat[0];assert.equal(events.length,0);
  a.onstart();a.onend();assert.equal(events.at(-1).laji,'narrationEnd');
  v.lisaa('Seuraava.');assert.equal(events.length,2);lausumat[1].onstart();
  v.paata();assert.equal(events.at(-1).laji,'narration','jonon päättäminen ei katkaise soivaa palaa');
  lausumat[1].onend();assert.equal(events.at(-1).laji,'narrationEnd');assert.equal(lukijaLukee(),false);
});

test('Pulun oma selainpuhe ei muutu kertojan kuunteluksi',t=>{
  const {events,lausumat}=selain(t);
  lueAaneen('Pulun puhe.',null,{persoona:'pollo'});lausumat[0].onstart();
  assert.equal(events.length,0);assert.equal(livianKasvopuheenTila().length,1);
  pysaytaLukija();assert.deepEqual(livianKasvopuheenTila(),[]);
});

test('natiivisillan todellinen aloitus, loppu, peruutus ja hylätty lupaus ohjaavat kuuntelua',async t=>{
  const listeners=new Map();let hylkaa;
  const events=ymparisto(t,{matkakirjaNatiivi:{
    onkoNatiivi:true,ominaisuudet:{luenta:true},
    luenta:{puhu:()=>new Promise((_,reject)=>{hylkaa=reject;}),pysayta(){}},
    kuuntele(n,f){listeners.set(n,f);return()=>{if(listeners.get(n)===f)listeners.delete(n);};},
  }});
  lueAaneen('Natiiviluenta.');assert.equal(events.length,0);
  const vanhaAlku=listeners.get('luenta-alkoi'),vanhaLoppu=listeners.get('luenta-loppui'),vanhaHylkaa=hylkaa;
  vanhaAlku();assert.equal(events[0].ele,'lookUp');assert.deepEqual(livianKasvopuheenTila(),[]);
  lueAaneen('Uusi natiiviluenta.');listeners.get('luenta-alkoi')();const n=events.length;
  vanhaAlku();vanhaLoppu();vanhaHylkaa(new Error('peruttu'));await Promise.resolve();await Promise.resolve();
  assert.equal(events.length,n);assert.equal(lukijaLukee(),true);
  hylkaa(new Error('luenta epäonnistui'));await Promise.resolve();await Promise.resolve();
  assert.equal(events.at(-1).laji,'narrationEnd');assert.equal(lukijaLukee(),false);
  lueAaneen('Luonnollinen loppu.');listeners.get('luenta-alkoi')();listeners.get('luenta-loppui')();
  assert.equal(events.at(-1).laji,'narrationEnd');assert.equal(listeners.size,0);
});

const asettuu=()=>new Promise(resolve=>setImmediate(resolve));
async function verkko(t) {
  const piirit=[],pyynnot=[];
  class AudioContext {
    currentTime=0;state='running';destination={};lahteet=[];
    constructor(){piirit.push(this);}
    resume(){this.state='running';return Promise.resolve();}
    suspend(){this.state='suspended';return Promise.resolve();}
    createGain(){return {connect(){},disconnect(){},gain:{setValueAtTime(){},linearRampToValueAtTime(){}}};}
    createBufferSource(){const s={connect(){},disconnect(){},stop(){},start(alku,offset,kesto){Object.assign(this,{alku,kesto});}};this.lahteet.push(s);return s;}
    decodeAudioData(){return Promise.resolve({sampleRate:10,duration:5,getChannelData:()=>new Float32Array(50)});}
  }
  const fetch=async(url,options)=>{
    if(String(url).startsWith('blob:'))return new Response(new Uint8Array(8));
    return new Promise((resolve,reject)=>pyynnot.push({resolve,reject,body:JSON.parse(options.body)}));
  };
  t.mock.method(globalThis,'fetch',fetch);
  const events=ymparisto(t,{Audio:class {},fetch,navigator:{onLine:true},AudioContext});
  // Oma WebAudio-piiri / muistivälimuisti jokaiselle kokeelle.
  const {luoPuheSoitin}=await import(`../js/puhe.js?lukijakoe=${encodeURIComponent(t.name)}`);
  const soittimet=[];
  t.after(()=>soittimet.forEach(s=>s.pysayta()));
  return {events,pyynnot,piirit,luo(options){const s=luoPuheSoitin(options);soittimet.push(s);return s;},
    vastaa(i){pyynnot[i].resolve(new Response(new Uint8Array(8)));},
    tick(aika){piirit[0].currentTime=aika;t.mock.timers.tick(150);},
  };
}

test('WebAudio: lataus, todellinen alku, suunniteltu väli, tauko, hyppy ja loppu',async t=>{
  const q=await verkko(t),s=q.luo();s.lisaa('Ensimmäinen.\nToinen.');s.paata();await asettuu();
  assert.equal(q.events.length,0);q.vastaa(0);q.vastaa(1);await asettuu();
  assert.equal(q.piirit[0].lahteet.length,2);q.tick(0);assert.equal(q.events.length,0);
  q.tick(.1);assert.equal(q.events[0].ele,'lookUp');assert.deepEqual(livianKasvopuheenTila(),[]);
  q.tick(5.2);assert.equal(q.events.length,1,'0,45 sekunnin kappaleväli ei katkaise kuuntelua');
  s.tauko();assert.equal(q.events.at(-1).laji,'narrationEnd');s.jatka();assert.equal(q.events.at(-1).laji,'narration');
  await asettuu();
  s.siirryKappale(1);assert.equal(q.events.at(-1).laji,'narrationEnd');await asettuu();
  q.tick(5.5);assert.equal(q.events.at(-1).laji,'narration');
  q.tick(11);assert.equal(q.events.at(-1).laji,'narrationEnd');const n=q.events.length;
  s.pysayta();q.tick(50);assert.equal(q.events.length,n);
});

test('WebAudio: puskurin loppu, keskeytetty piiri ja virhe eivät jätä kuuntelua päälle',async t=>{
  const q=await verkko(t),s=q.luo();s.lisaa('Ensimmäinen.');await asettuu();q.vastaa(0);await asettuu();
  q.tick(.1);q.piirit[0].state='interrupted';q.tick(.2);assert.equal(q.events.at(-1).laji,'narrationEnd');
  q.piirit[0].state='running';q.tick(.3);assert.equal(q.events.at(-1).laji,'narration');
  q.tick(6);assert.equal(q.events.at(-1).laji,'narrationEnd');
  await asettuu();
  const n=q.events.length;s.lisaa('Lisää odotettavaa.');await asettuu();assert.equal(q.events.length,n);
  q.vastaa(1);await asettuu();q.tick(6.2);assert.equal(q.events.at(-1).laji,'narration');
  await asettuu();
  s.lisaa('Viallinen pala.');await asettuu();q.pyynnot[2].reject(new Error('verkkovirhe'));await asettuu();
  assert.equal(q.events.at(-1).laji,'narrationEnd');
});

test('WebAudio: pysäytetyn lukijan myöhäinen haku ei käynnistä kuuntelua; Pulun puhe erillään',async t=>{
  const q=await verkko(t),s=q.luo();s.lisaa('Peruttu.');await asettuu();s.pysayta();q.vastaa(0);await asettuu();
  q.tick(1);assert.equal(q.events.length,0);assert.equal(q.piirit[0].lahteet.length,0);
  const p=q.luo({persoona:'pollo'});p.lisaa('Pulun vastaus.');await asettuu();q.vastaa(1);await asettuu();
  q.tick(1.2);assert.equal(q.events.length,0);assert.equal(livianKasvopuheenTila().length,1);
  p.pysayta();assert.deepEqual(livianKasvopuheenTila(),[]);
});
