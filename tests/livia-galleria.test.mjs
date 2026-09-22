import test from 'node:test';
import assert from 'node:assert/strict';
import {LIVIA_SVG_ELEET} from '../js/livia-svg.js';

test('katselusivu näyttää kategoriat ja vain valitun kategorian eleet',async t=>{
 class El extends EventTarget{
  constructor(tag='div'){super();this.tagName=tag;this.children=[];this.dataset={};this.attrs={};this.value='0';this.checked=false;this.hidden=false;this.innerHTML='';}
  append(el){this.children.push(el);}
  replaceChildren(...els){this.children=els;}
  setAttribute(key,value){this.attrs[key]=String(value);}
  querySelectorAll(tag){return this.children.flatMap(el=>[...(el.tagName===tag?[el]:[]),...el.querySelectorAll(tag)]);}
 }
 const ids=['gesture-categories','gesture-options','strength','strength-label','actual','zoom','position','progress','play','pause','all','slow','description','reduced'];
 const elements=Object.fromEntries(ids.map(id=>[id,new El()]));
 const doc=new EventTarget();doc.hidden=false;doc.getElementById=id=>elements[id];doc.createElement=tag=>new El(tag);
 const reduced=new EventTarget();reduced.matches=false;let serial=0;const raf=new Map();
 const globals={document:doc,matchMedia:()=>reduced,requestAnimationFrame:fn=>{raf.set(++serial,fn);return serial;},cancelAnimationFrame:id=>raf.delete(id)};
 for(const [key,value]of Object.entries(globals)){
  const old=Object.getOwnPropertyDescriptor(globalThis,key);Object.defineProperty(globalThis,key,{value,configurable:true,writable:true});
  t.after(()=>old?Object.defineProperty(globalThis,key,old):delete globalThis[key]);
 }
 await import(`../docs/livia-svg-demo.mjs?test=${Date.now()}`);
 const ryhmat=[...new Set(LIVIA_SVG_ELEET.map(ele=>ele.group))],kategoriat=elements['gesture-categories'].children;
 assert.equal(kategoriat.length,ryhmat.length+1);
 assert.match(kategoriat[0].textContent,/^Uudet eleet \(19\)$/);assert.equal(kategoriat[0].attrs['aria-pressed'],'true');
 assert.equal(elements['gesture-options'].children.length,19,'vain Uudet eleet näkyy aluksi');
 const ryhmitellyt=[];
 for(const ryhma of ryhmat){
  elements['gesture-categories'].children.find(nappi=>nappi.dataset.category===ryhma).onclick();
  const odotetut=LIVIA_SVG_ELEET.filter(ele=>ele.group===ryhma);
  assert.deepEqual(elements['gesture-options'].children.map(nappi=>nappi.dataset.gesture),odotetut.map(ele=>ele.id));
  assert.equal(elements.description.textContent,odotetut[0].label,'kategoria valitsee ensimmäisen eleen');
  ryhmitellyt.push(...elements['gesture-options'].children.map(nappi=>nappi.dataset.gesture));
 }
 assert.deepEqual(ryhmitellyt.sort(),LIVIA_SVG_ELEET.map(ele=>ele.id).sort(),'kaikki eleet löytyvät varsinaisista kategorioistaan');
 const toinen=elements['gesture-options'].children[1];toinen.onclick();assert.equal(toinen.attrs['aria-pressed'],'true');
 assert.equal(raf.size,1,'valinta pitää vain yhden esikatselun käynnissä');
 reduced.matches=true;reduced.dispatchEvent(new Event('change'));assert.equal(raf.size,0);
});
