import test from 'node:test';
import assert from 'node:assert/strict';
import { asennaLivianKasvot } from '../js/livia-eleet.js';
import { ilmoitaLivianKasvopuhe } from '../js/livia-puhetila.js';

// Pieni DOM- ja kellosovitin: testataan pelin odotus/puhe/piilotus-elinkaarta,
// ei piirtofunktion kopiota. Soittimet eivät vaadi verkkoa tai uusia ääniä.
function liviaTestYmparisto(t){
 let now=1000,id=0;const raf=new Map(),timers=new Map(),observers=[];
 class El extends EventTarget{
  children=[];hidden=false;isConnected=true;style={};textContent='';className='';attrs={};
  classList={items:new Set(),add:(x)=>this.classList.items.add(x),remove:(x)=>this.classList.items.delete(x),contains:(x)=>this.classList.items.has(x)};
  ctx={rects:[],clearRect(){this.rects=[];},fillRect(...r){this.rects.push(r);},imageSmoothingEnabled:true};
  append(e){this.children.push(e);e.parent=this;}remove(){this.isConnected=false;if(this.parent)this.parent.children=this.parent.children.filter(x=>x!==this);}
  setAttribute(n,v){this.attrs[n]=v;}getContext(){return this.ctx;}
  querySelector(){return this.children.find(x=>x.className==='pollo-odottaa'&&x.isConnected)||null;}
 }
 const doc=new EventTarget();doc.hidden=false;doc.body=new El();doc.createElement=()=>new El();doc.querySelector=()=>null;
 const button=new El(),virta=new El(),reduced=new EventTarget();reduced.matches=false;
 const set=(key,value)=>{const before=Object.getOwnPropertyDescriptor(globalThis,key);Object.defineProperty(globalThis,key,{configurable:true,writable:true,value});t.after(()=>before?Object.defineProperty(globalThis,key,before):delete globalThis[key]);};
 set('requestAnimationFrame',fn=>{raf.set(++id,fn);return id;});set('cancelAnimationFrame',id=>raf.delete(id));
 set('setTimeout',(fn,ms)=>{timers.set(++id,{fn,at:now+ms});return id;});set('clearTimeout',id=>timers.delete(id));
 set('matchMedia',()=>reduced);set('getComputedStyle',e=>({display:e.hidden?'none':'block',visibility:'visible'}));
 set('MutationObserver',class{constructor(fn){this.fn=fn;observers.push(this);}observe(el){this.el=el;}disconnect(){this.el=null;}});
 t.mock.method(performance,'now',()=>now);
 const tick=ms=>{const end=now+ms;while(now<end){now=Math.min(end,now+20);const rs=[...raf.values()];raf.clear();rs.forEach(f=>f(now));for(const[k,v]of[...timers])if(v.at<=now){timers.delete(k);v.fn();}}};
 const notify=el=>observers.filter(o=>o.el===el).forEach(o=>o.fn());
 const pollo={doc,nappi:button,virta,auki:false,haeUi:()=>({})};
 return{pollo,button,virta,doc,reduced,El,tick,notify,raf,timers};
}

test('pöllö odottaa poissa, vastaus palaa heti; puhe ja tuho eivät jätä ajastimia',t=>{
 let c;t.after(()=>c?.tuhoa());const e=liviaTestYmparisto(t);c=asennaLivianKasvot(e.pollo);assert.ok(c);
 const canvas=e.button.children[0].children[0];assert.equal(canvas.width,44);assert.equal(canvas.height,88);
 e.tick(5000);assert.equal(e.raf.size,0,'lepo ei pyöritä piirtoa');
 e.pollo.auki=true;e.notify(e.button);
 const row=new e.El();row.className='pollo-odottaa';row.textContent='Käyn kysymässä pöllöltä';e.virta.append(row);e.notify(e.virta);
 e.tick(3000);assert.equal(canvas.ctx.rects.length,0,'pöllöretki odottaa ruudun ulkopuolella');assert.equal(e.raf.size,0,'odotus ei kuluta ruutuja');
 row.remove();e.notify(e.virta);assert.ok(e.raf.size>0,'paluuta ei viivytetä valmiin klipin loppuun');e.tick(2200);assert.ok(canvas.ctx.rects.length>0);
 const token={};ilmoitaLivianKasvopuhe(token,true,'Selvennys');e.tick(3300);assert.ok(e.raf.size>0,'jatkuva ääni pitää nokan liikkeessä');
 ilmoitaLivianKasvopuhe(token,false);e.tick(40);assert.equal(e.raf.size,0,'äänen loppu pysäyttää nokan');
 c.tuhoa();assert.equal(e.raf.size,0);assert.equal(e.timers.size,0);assert.equal(e.button.children.length,0);
 ilmoitaLivianKasvopuhe(token,true,'myöhässä');assert.equal(e.raf.size,0);ilmoitaLivianKasvopuhe(token,false);
});

test('taustalle siirtyminen ja vähennetty liike pysäyttävät eleet, uni herää kosketuksesta',t=>{
 let c;t.after(()=>c?.tuhoa());const e=liviaTestYmparisto(t);c=asennaLivianKasvot(e.pollo);
 e.tick(5000);c.toista('shock');assert.ok(e.raf.size);e.doc.hidden=true;e.doc.dispatchEvent(new Event('visibilitychange'));assert.equal(e.raf.size,0);
 e.doc.hidden=false;e.doc.dispatchEvent(new Event('visibilitychange'));e.reduced.matches=true;e.reduced.dispatchEvent(new Event('change'));assert.equal(c.toista('crash'),false);assert.equal(e.raf.size,0);assert.equal(e.timers.size,0);
 e.reduced.matches=false;e.reduced.dispatchEvent(new Event('change'));e.tick(230000);assert.equal(e.raf.size,0,'nukkuva pulu lepää paikallaan');
 e.doc.dispatchEvent(new Event('pointerdown'));assert.ok(e.raf.size>0,'kosketus herättää');e.tick(2400);assert.equal(e.raf.size,0);
});
