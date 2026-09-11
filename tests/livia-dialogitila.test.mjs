import test from 'node:test';
import assert from 'node:assert/strict';
import { livianYlinDialogi, livianDialogikoti, livianDialogiSalliiReaktion, seuraaLivianDialogeja } from '../js/livia-dialogitila.js';

function ymparisto(t) {
 let pending=[],callback,disconnected=false;
 const before=Object.getOwnPropertyDescriptor(globalThis,'MutationObserver');
 t.after(()=>before?Object.defineProperty(globalThis,'MutationObserver',before):delete globalThis.MutationObserver);
 Object.defineProperty(globalThis,'MutationObserver',{configurable:true,writable:true,value:class {
  constructor(fn) { callback=fn; }
  observe() {}
  takeRecords() { const rs=pending;pending=[];return rs; }
  disconnect() { disconnected=true; }
 }});
 const dialogs=['arrival-dialog','passport-dialog','quiz-dialog','rules-dialog','winner-dialog','wiki-dialog','event-dialog','nahtavyys-dialog']
  .map(id=>({id,localName:'dialog',open:false,isConnected:true}));
 const doc={body:{},querySelectorAll:()=>dialogs.filter(d=>d.open&&d.isConnected)};
 const changes=[],off=seuraaLivianDialogeja(doc,(a,b)=>changes.push([a?.id,b?.id]));t.after(off);
 function set(id,open) {const d=dialogs.find(d=>d.id===id);pending.push({type:'attributes',attributeName:'open',target:d,oldValue:d.open?'':null});d.open=open;return d;}
 function flush() {const rs=pending;pending=[];callback(rs);}
 return {doc,dialogs,set,flush,changes,off,disconnected:()=>disconnected};
}

test('dialogin koti ja reaktiolupa seuraavat avausjärjestystä myös ennen observeria',t=>{
 const e=ymparisto(t),p={closest:()=>livianDialogikoti(e.doc)};
 assert.equal(livianYlinDialogi(e.doc),null);assert.equal(livianDialogiSalliiReaktion(e.doc,p),true);
 for(const id of ['quiz-dialog','arrival-dialog','passport-dialog']) {
  const d=e.set(id,true);assert.equal(livianYlinDialogi(e.doc),d);
  assert.equal(livianDialogikoti(e.doc),d);assert.equal(livianDialogiSalliiReaktion(e.doc,p),true);
 }
 e.set('passport-dialog',false);assert.equal(livianYlinDialogi(e.doc).id,'arrival-dialog');
 e.set('arrival-dialog',false);assert.equal(livianYlinDialogi(e.doc).id,'quiz-dialog');
 e.set('quiz-dialog',false);assert.equal(livianYlinDialogi(e.doc),null);
 assert.equal(e.changes.length,6);
});

test('asetukset, voitto ja ilmoitus hiljentävät myös alla avoinna olevan lehden',t=>{
 const e=ymparisto(t),lehti=e.set('arrival-dialog',true),p={closest:()=>lehti};e.flush();
 for(const id of ['rules-dialog','winner-dialog','event-dialog','wiki-dialog']) {
  e.set(id,true);e.flush();assert.equal(livianDialogiSalliiReaktion(e.doc,p),false,id);
  assert.equal(livianDialogikoti(e.doc)?.id,id==='wiki-dialog'?'wiki-dialog':undefined);
  const self={closest:()=>livianYlinDialogi(e.doc)};
  assert.equal(livianDialogiSalliiReaktion(e.doc,self),false,'pelkkä sisällä olo ei anna lupaa');
  e.set(id,false);e.flush();assert.equal(livianDialogiSalliiReaktion(e.doc,p),true);
 }
});

test('saman tehtävän sulje-avaa nostaa dialogin kärkeen, poistettu dialogi ei jää pinoksi',t=>{
 const e=ymparisto(t);e.set('arrival-dialog',true);e.set('quiz-dialog',true);e.flush();
 e.set('arrival-dialog',false);e.set('arrival-dialog',true);e.flush();
 assert.equal(livianYlinDialogi(e.doc).id,'arrival-dialog');
 e.dialogs[0].isConnected=false;assert.equal(livianYlinDialogi(e.doc).id,'quiz-dialog');
 e.off();assert.equal(e.disconnected(),true);
});

test('oma chat saa reagoida nähtävyydessä ja wikissä, ei muissa hiljaisissa ikkunoissa',t=>{
 const e=ymparisto(t),nappi={closest:()=>livianYlinDialogi(e.doc)};
 for(const id of ['nahtavyys-dialog','wiki-dialog','rules-dialog','winner-dialog','event-dialog']) {
  e.set(id,true);e.flush();
  assert.equal(livianDialogiSalliiReaktion(e.doc,nappi),false);
  assert.equal(livianDialogiSalliiReaktion(e.doc,nappi,true),['nahtavyys-dialog','wiki-dialog'].includes(id));
  assert.equal(livianDialogiSalliiReaktion(e.doc,{closest:()=>null},true),false,'peittyvä Pulu ei saa lupaa');
  e.set(id,false);e.flush();
 }
});
