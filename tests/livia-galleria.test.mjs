import test from 'node:test';
import assert from 'node:assert/strict';
import {LIVIA_SVG_ELEET} from '../js/livia-svg.js';

test('katselusivu ryhmittelee kaikki eleet ja avaa uudet eleet ensimmäisenä',async t=>{
 class El extends EventTarget{
  constructor(tag='div'){super();this.tagName=tag;this.children=[];this.dataset={};this.attrs={};this.value='0';this.checked=false;this.hidden=false;this.innerHTML='';}
  append(el){this.children.push(el);}
  setAttribute(key,value){this.attrs[key]=String(value);}
  querySelectorAll(tag){return this.children.flatMap(el=>[...(el.tagName===tag?[el]:[]),...el.querySelectorAll(tag)]);}
 }
 const ids=['gesture-drawers','gesture','strength','strength-label','actual','zoom','position','progress','play','pause','all','slow','description','reduced'];
 const elements=Object.fromEntries(ids.map(id=>[id,new El()]));
 const doc=new EventTarget();doc.hidden=false;doc.getElementById=id=>elements[id];doc.createElement=tag=>new El(tag);
 const reduced=new EventTarget();reduced.matches=false;let serial=0;const raf=new Map();
 const globals={document:doc,matchMedia:()=>reduced,requestAnimationFrame:fn=>{raf.set(++serial,fn);return serial;},cancelAnimationFrame:id=>raf.delete(id)};
 for(const [key,value]of Object.entries(globals)){
  const old=Object.getOwnPropertyDescriptor(globalThis,key);Object.defineProperty(globalThis,key,{value,configurable:true,writable:true});
  t.after(()=>old?Object.defineProperty(globalThis,key,old):delete globalThis[key]);
 }
 await import(`../docs/livia-svg-demo.mjs?test=${Date.now()}`);
 const ryhmat=[...new Set(LIVIA_SVG_ELEET.map(ele=>ele.group))],laatikot=elements['gesture-drawers'].children;
 assert.equal(laatikot.length,ryhmat.length+1);
 assert.equal(laatikot[0].tagName,'details');assert.equal(laatikot[0].open,true);
 assert.match(laatikot[0].children[0].textContent,/^Uudet eleet \(19\)$/);
 const tavalliset=laatikot.slice(1).flatMap(laatikko=>laatikko.querySelectorAll('button'));
 assert.deepEqual(tavalliset.map(nappi=>nappi.dataset.gesture).sort(),LIVIA_SVG_ELEET.map(ele=>ele.id).sort());
 for(const nappi of tavalliset){nappi.onclick();assert.equal(elements.gesture.value,nappi.dataset.gesture);assert.equal(nappi.attrs['aria-pressed'],'true');}
 assert.equal(raf.size,1,'valinta pitää vain yhden esikatselun käynnissä');
 reduced.matches=true;reduced.dispatchEvent(new Event('change'));assert.equal(raf.size,0);
});
