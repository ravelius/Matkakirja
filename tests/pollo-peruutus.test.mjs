import test from 'node:test';
import assert from 'node:assert/strict';
import {Pollo} from '../js/pollo.js';
import {kuunteleLivianTilanteita} from '../js/livia-tilanteet.js';
import {sfx} from '../js/sound.js';

const viive=()=>{let resolve;const promise=new Promise(r=>resolve=r);return {promise,resolve};};
const asiakas=()=>Object.assign(Object.create(Pollo.prototype),{palvelin:'https://example.invalid',otsakkeet:()=>({})});
function tapahtumat(t){const list=[];t.after(kuunteleLivianTilanteita((laji,data)=>list.push({laji,...data})));return list;}
const sse=teksti=>'event: pala\ndata: '+JSON.stringify({teksti})+'\n\n';

test('peruutus päättää vain oman odotuksen heti, vaikka vanha fetch vastaa myöhemmin',async t=>{
 const calls=tapahtumat(t),a=new AbortController(),p=asiakas(),first=viive(),second=viive();
 let n=0;t.mock.method(globalThis,'fetch',(_url,opts)=>{assert.equal(opts.signal,n?undefined:a.signal);return n++?second.promise:first.promise;});
 const old=p.pyyda({tehtava:'vastaus'},{signal:a.signal});
 const other=p.pyyda({tehtava:'muu'});const rejected=assert.rejects(old,{name:'AbortError'});
 a.abort();assert.equal(calls.length,3);assert.equal(calls[2].laji,'waitingEnd');assert.equal(calls[2].tunnus,calls[0].tunnus);
 first.resolve(Response.json({vastaus:'Vanha'}));await rejected;
 assert.equal(calls.length,3,'finally ei lopeta kahdesti eikä peru toista pyyntöä');
 second.resolve(Response.json({vastaus:'Muu'}));assert.equal((await other).vastaus,'Muu');
 assert.equal(calls.length,4);assert.equal(calls[3].tunnus,calls[1].tunnus);
});

test('JSON-rungon aikana peruttu vastaus ei palaudu onnistumisena',async t=>{
 for(const stream of [false,true]){
  const a=new AbortController(),body=viive(),started=viive(),p=asiakas();
  t.mock.method(globalThis,'fetch',async()=>({ok:true,headers:new Headers({'content-type':'application/json'}),json:()=>{started.resolve();return body.promise;}}));
  const pending=stream?p.pyydaStriimi({},()=>{}, {signal:a.signal}):p.pyyda({}, {signal:a.signal});
  const rejected=assert.rejects(pending,{name:'AbortError'});await started.promise;a.abort();body.resolve({vastaus:'Liian myöhään'});await rejected;
 }
});

test('valmiiksi peruttu pyyntö ei lähde verkkoon kummallakaan sovittimella',async t=>{
 const p=asiakas(),a=new AbortController();a.abort();
 const f=t.mock.method(globalThis,'fetch',()=>assert.fail('ei verkkokutsua'));
 await assert.rejects(p.pyyda({}, {signal:a.signal}),{name:'AbortError'});
 await assert.rejects(p.pyydaStriimi({},()=>{}, {signal:a.signal}),{name:'AbortError'});
 assert.equal(f.mock.callCount(),0);
});

test('SSE:n ensimmäinen pala päättää odotuksen; peruutus ei välitä loppupaloja',async t=>{
 const p=asiakas(),a=new AbortController(),events=tapahtumat(t),seen=[];
 let controller;const body=new ReadableStream({start(c){controller=c;}});
 t.mock.method(globalThis,'fetch',async()=>new Response(body,{headers:{'content-type':'text/event-stream'}}));
 const pending=p.pyydaStriimi({},text=>{seen.push(text);a.abort();},{signal:a.signal});
 controller.enqueue(new TextEncoder().encode(sse('Ensimmäinen')+sse('Vanha toinen')));
 await assert.rejects(pending,{name:'AbortError'});controller.close();
 assert.deepEqual(seen,['Ensimmäinen']);assert.deepEqual(events.map(x=>x.laji),['waiting','waitingEnd']);assert.equal(body.locked,false);
});

test('tavallinen JSON ja kokonainen SSE toimivat ilman peruutussignaalia',async t=>{
 const p=asiakas();t.mock.method(globalThis,'fetch',async()=>Response.json({vastaus:'Valmis'}));
 assert.equal((await p.pyyda({})).vastaus,'Valmis');
 t.mock.method(globalThis,'fetch',async()=>new Response(sse('Valmis')+'event: loppu\ndata: {"vastaus":"Valmis"}\n\n',{headers:{'content-type':'text/event-stream'}}));
 const seen=[];assert.equal((await p.pyydaStriimi({},x=>seen.push(x))).vastaus,'Valmis');assert.deepEqual(seen,['Valmis']);
});

function chat(t){
 t.mock.timers.enable({apis:['setTimeout']});
 t.mock.method(sfx,'play',()=>{});
 const p=asiakas(),rows=[];p.rows=rows;
 Object.assign(p,{kentta:{},saneluTila:{},ehdotukset:{replaceChildren(){}},kaytetytTarjonnat:new Set(),virta:{querySelectorAll:()=>[]},historia:[],paneeli:{classList:{remove(){}}},nappi:{setAttribute(){},classList:{remove(){}}},aaniPaalla:false,auki:true,naputusStop:0});
 for(const key of ['poistaValmiit','suljeKuvapopup','nollaaTyhjaTila','viritaTyhjaTila','ankkuroiYlos','lopetaSanelu','peruLuenta','merkitseAuki','oikaiseNakyma','paivitaTyhjaTila','aloitaNaputus','korostaLinkit','naytaJatkot','liitaVastausKuva','liitaPoimintaNapit','lueVastaus','suljeMikkiKanava','purkaSaneluKuulijat','merkitseMikki'])p[key]=()=>{};
 p.sailytaVieritys=fn=>fn();p.taytaVastaus=(row,text)=>{row.textContent=text;};p.poimiLinkit=()=>[];p.paataLuenta=()=>false;
 p.naytaUusinta=()=>{p.uusinnat=(p.uusinnat||0)+1;};p.vaihdaTilaan=tila=>{p.tila=tila;};p.keraaMikkiDiagnoosi=async()=> 'koe';
 p.kysymysAvain=()=>'';p.konteksti=()=>'';p.naytaPaikkaKartalla=()=>null;
 p.asetaKesken=value=>{p.kesken=value;};p.lopetaNaputus=()=>{p.naputusStop++;};p.syotaLuennalle=()=>false;
 p.lisaaViesti=(laji,text)=>{const row={laji,textContent:text,isConnected:true,remove(){this.isConnected=false;}};rows.push(row);return row;};
 return p;
}

test('suljettu chat ei saa myöhäisiä paloja, virhettä tai vanhaa finallyä uuden kysymyksen päälle',async t=>{
 const p=chat(t),requests=[];
 p.pyydaStriimi=(runko,onPala,{signal})=>{const wait=viive();requests.push({runko,onPala,signal,...wait});return wait.promise;};
 const old=p.kysy('Ensimmäinen');assert.equal(p.kesken,true);assert.equal(requests.length,1);
 requests[0].onPala('Jo nähty osa');p.sulje();
 assert.equal(requests[0].signal.aborted,true);assert.equal(p.kesken,false);assert.equal(p.rows.filter(x=>x.laji==='odottaa'&&x.isConnected).length,0);
 const second=p.kysy('Uusi kysymys'),stops=p.naputusStop,rows=p.rows.length;
 requests[0].onPala('Vanhaa tekstiä lisää');requests[0].resolve({vastaus:'Vanha lopullinen'});await old;
 assert.equal(p.kesken,true);assert.equal(p.naputusStop,stops);assert.equal(p.rows.length,rows);assert.deepEqual(p.historia,[]);
 assert.equal(p.rows.find(x=>x.laji==='pollo').textContent,'Jo nähty osa');
 assert.equal(requests[1].signal.aborted,false);p.sulje();requests[1].resolve({vastaus:'Peruttu uusi'});await second;
 assert.equal(p.kesken,false);assert.equal(p.kysymysPyynto,null);
});

test('JSON-varapolun peruutus ei kirjoita myöhäistä vastausta',async t=>{
 const p=chat(t),wait=viive(),stream=globalThis.ReadableStream;
 globalThis.ReadableStream=undefined;t.after(()=>{globalThis.ReadableStream=stream;});
 let signal;p.pyyda=(_runko,options)=>{signal=options.signal;return wait.promise;};
 const pending=p.kysy('Kysymys');p.sulje();assert.equal(signal.aborted,true);
 wait.resolve({vastaus:'Myöhäinen'});await pending;
 assert.deepEqual(p.historia,[]);assert.equal(p.rows.some(x=>x.laji==='pollo'),false);
});

test('chatin virhepolut lähettävät yhden rekisterin tagin odotuksen päätyttyä',async t=>{
 const p=chat(t),events=tapahtumat(t);let reply;
 t.mock.method(globalThis,'fetch',()=>reply());
 for(const [response,id,power,mood,retry] of [
  [()=>Promise.reject(new Error('verkko')),'chat.virhe',.5,'hammentynyt',true],
  [()=>Response.json({virhe:'paivaraja'},{status:429}),'chat.virhe.kayttoraja',.4,'vakava',false],
  [()=>Response.json({virhe:'kuukausiraja'},{status:429}),'chat.virhe.kayttoraja',.4,'vakava',false],
  [()=>Response.json({vastaus:''}),'chat.vastaus.varateksti',.3,'hammentynyt',true],
  [()=>Response.json({vastaus:'Varateksti',syy:'kieltaytyi'}),'chat.vastaus.varateksti',.3,'hammentynyt',false],
  [()=>new Response(sse('Osittainen'),{headers:{'content-type':'text/event-stream'}}),'chat.vastaus.katkesi',.4,'hammentynyt',true],
 ]){
  reply=response;events.length=0;p.uusinnat=0;await p.kysy('Koekysymys');
  const osittainen=id==='chat.vastaus.katkesi';
  assert.deepEqual(events.map(x=>x.laji),osittainen
    ? ['waiting','waitingAnswer','waitingEnd','error'] : ['waiting','waitingEnd','error']);
  const virhe=events.at(-1);assert.equal(virhe.tilanneId,id);assert.equal(virhe.voimakkuus,power);assert.equal(virhe.tunne,mood);
  assert.equal(p.uusinnat>0,retry);assert.deepEqual(p.historia,[]);assert.equal(p.kesken,false);
 }
 reply=()=>Response.json({vastaus:'Aito vastaus'});events.length=0;await p.kysy('Onnistuva kysymys');
 assert.deepEqual(events.map(x=>x.laji),['waiting','waitingAnswer','waitingEnd']);assert.equal(p.historia.length,2);
});

test('mikrofonin lupa, toinen kaappausvirhe ja hiljaisuus saavat eri voimakkuudet',async t=>{
 const p=chat(t),events=tapahtumat(t);
 p.saneluVirhe('audio-capture');assert.equal(events.length,0,'ensimmäinen automaattinen uusinta on hiljainen');
 p.saneluVirhe('audio-capture');assert.equal(events.at(-1).tilanneId,'mikrofoni.virhe.audiocapture');assert.equal(events.at(-1).voimakkuus,.45);
 p.saneluVirhe('not-allowed');assert.equal(events.at(-1).tilanneId,'mikrofoni.virhe.lupa');assert.equal(events.at(-1).voimakkuus,.5);
 p.saneluVirhe('no-speech');assert.equal(events.at(-1).tilanneId,'mikrofoni.eikuullut');assert.equal(events.at(-1).voimakkuus,.3);
 const count=events.length;p.saneluVirhe('aborted');assert.equal(events.length,count);
 p.auki=false;p.saneluVirhe('network');assert.equal(events.length,count,'suljettuun chattiin ei myöhäistä elettä');
 await Promise.resolve();
});

test('natiivisanelun epäämä lupa ja tyhjä lopputulos käyttävät samoja tageja',async t=>{
 const p=chat(t),events=tapahtumat(t),listeners=new Map();p.saneluKuulijat=[];
 await p.aloitaNatiiviSanelu({sanelu:{luvat:async()=>({kunnossa:false})}});
 assert.equal(events.at(-1).tilanneId,'mikrofoni.virhe.lupa');events.length=0;
 const native={sanelu:{luvat:async()=>({kunnossa:true}),aloita:async()=>{}},kuuntele:(key,fn)=>{listeners.set(key,fn);return()=>listeners.delete(key);}};
 await p.aloitaNatiiviSanelu(native);listeners.get('sanelu-valmis')({teksti:''});
 assert.equal(events.length,1);assert.equal(events[0].tilanneId,'mikrofoni.eikuullut');
});
