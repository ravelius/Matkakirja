import test from 'node:test';
import assert from 'node:assert/strict';
import {LIVIA_SVG_ELEET,LIVIAN_PAIVITETYT_ELEET} from '../js/livia-svg.js';

test('gallerian aidot valitsimet kokoavat ryhmät, päivitetyt eleet ja viisi karttapaluuta',async t=>{
 class El extends EventTarget {
  constructor(tag='div'){super();this.tagName=tag;this.children=[];this.dataset={};this.attrs={};this.value='0';this.checked=false;}
  append(el){this.children.push(el);}
  setAttribute(k,v){this.attrs[k]=v;}
  querySelectorAll(tag){return this.children.flatMap(e=>[...(e.tagName===tag?[e]:[]),...e.querySelectorAll(tag)]);}
 }
 const ids=['gesture-drawers','gesture','variation','map-return','map-move','cue-duration','actual','zoom','position','progress','strength-label','strength','pause','all','play','slow','description','reduced'];
 const elements=Object.fromEntries(ids.map(id=>[id,new El()]));elements['cue-duration'].value='6200';
 const doc=new EventTarget();doc.hidden=false;doc.getElementById=id=>elements[id];doc.createElement=tag=>new El(tag);
 const reduced=new EventTarget();reduced.matches=false;let n=0;const raf=new Map();
 for(const [key,value]of Object.entries({document:doc,matchMedia:()=>reduced,requestAnimationFrame:f=>{raf.set(++n,f);return n;},cancelAnimationFrame:id=>raf.delete(id)})){
  const old=Object.getOwnPropertyDescriptor(globalThis,key);Object.defineProperty(globalThis,key,{value,configurable:true,writable:true});
  t.after(()=>old?Object.defineProperty(globalThis,key,old):delete globalThis[key]);
 }
 await import('../docs/livia-svg-demo.mjs');
 const drawers=elements['gesture-drawers'].children;
 assert.equal(drawers.length,1+new Set(LIVIA_SVG_ELEET.map(e=>e.group)).size);
 assert.ok(drawers.every(d=>d.tagName==='details'));assert.equal(drawers[0].open,true);
 const regular=drawers.slice(1).flatMap(d=>d.querySelectorAll('button'));
 assert.deepEqual(regular.map(b=>b.dataset.gesture).sort(),LIVIA_SVG_ELEET.map(e=>e.id).sort());
 const recent=drawers[0].querySelectorAll('button');
 assert.equal(recent.filter(b=>b.dataset.gesture).length,LIVIAN_PAIVITETYT_ELEET.length);
 for(const b of regular){b.onclick();assert.equal(elements.gesture.value,b.dataset.gesture);assert.equal(b.attrs['aria-pressed'],'true');}
 const returns=recent.filter(b=>b.dataset.return!==undefined);assert.equal(returns.length,5);
 for(const b of returns){
  b.onclick();assert.equal(b.attrs['aria-pressed'],'true');assert.match(elements.actual.innerHTML,/data-map-escape="poistuu"/);
  elements.position.value='780';elements.position.oninput();assert.match(elements.actual.innerHTML,/data-map-peek="true"/);
 }
 reduced.matches=true;reduced.dispatchEvent(new Event('change'));assert.equal(raf.size,0);
});
