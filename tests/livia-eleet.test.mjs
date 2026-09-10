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
  classList={items:new Set(),add:(...xs)=>xs.forEach(x=>this.classList.items.add(x)),remove:(...xs)=>xs.forEach(x=>this.classList.items.delete(x)),contains:(x)=>this.classList.items.has(x),toggle:(x,on)=>on?this.classList.items.add(x):this.classList.items.delete(x)};
  ctx={rects:[],clearRect(){this.rects=[];},fillRect(...r){this.rects.push(r);},imageSmoothingEnabled:true};
  append(e){if(e.parent)e.parent.children=e.parent.children.filter(x=>x!==e);this.children.push(e);e.parent=this;}remove(){this.isConnected=false;if(this.parent)this.parent.children=this.parent.children.filter(x=>x!==this);}
  setAttribute(n,v){this.attrs[n]=v;}getContext(){return this.ctx;}
  querySelector(){return this.children.find(x=>x.className==='pollo-odottaa'&&x.isConnected)||null;}
 }
 const doc=new EventTarget(),lehti=new El();doc.hidden=false;doc.body=new El();doc.createElement=()=>new El();doc.querySelector=()=>null;doc.getElementById=id=>id==='arrival-dialog'?lehti:null;
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
 return{pollo,button,virta,doc,lehti,reduced,El,tick,notify,raf,timers};
}

test('pöllö odottaa poissa, vastaus palaa heti; puhe ja tuho eivät jätä ajastimia',t=>{
 let c;t.after(()=>c?.tuhoa());const e=liviaTestYmparisto(t);c=asennaLivianKasvot(e.pollo);assert.ok(c);
 const canvas=e.doc.body.children[0].children[0];assert.equal(canvas.style.width,'152px');assert.equal(canvas.style.height,'304px');
 e.tick(5000);assert.equal(e.raf.size,0,'lepo ei pyöritä piirtoa');
 e.pollo.auki=true;e.notify(e.button);
 const row=new e.El();row.className='pollo-odottaa';row.textContent='Käyn kysymässä pöllöltä';e.virta.append(row);e.notify(e.virta);
 e.tick(3300);assert.equal(canvas.innerHTML.includes('data-part="whole-bird"'),false,'pöllöretki odottaa ruudun ulkopuolella');assert.equal(e.raf.size,0,'odotus ei kuluta ruutuja');
 row.remove();e.notify(e.virta);assert.ok(e.raf.size>0,'paluuta ei viivytetä valmiin klipin loppuun');e.tick(2200);assert.ok(canvas.innerHTML.includes('data-part="whole-bird"'));
 const token={};ilmoitaLivianKasvopuhe(token,true,'Selvennys');e.tick(3300);assert.ok(e.raf.size>0,'jatkuva ääni pitää nokan liikkeessä');
 ilmoitaLivianKasvopuhe(token,false);e.tick(40);assert.equal(e.raf.size,0,'äänen loppu pysäyttää nokan');
 c.tuhoa();assert.equal(e.raf.size,0);assert.equal(e.timers.size,0);assert.equal(e.doc.body.children.length,0);
 ilmoitaLivianKasvopuhe(token,true,'myöhässä');assert.equal(e.raf.size,0);ilmoitaLivianKasvopuhe(token,false);
});

test('taustalle siirtyminen ja vähennetty liike pysäyttävät eleet, uni herää kosketuksesta',t=>{
 let c;t.after(()=>c?.tuhoa());const e=liviaTestYmparisto(t);c=asennaLivianKasvot(e.pollo);
 e.tick(5000);c.toista('shock');assert.ok(e.raf.size);e.doc.hidden=true;e.doc.dispatchEvent(new Event('visibilitychange'));assert.equal(e.raf.size,0);
 e.doc.hidden=false;e.doc.dispatchEvent(new Event('visibilitychange'));e.reduced.matches=true;e.reduced.dispatchEvent(new Event('change'));assert.equal(c.toista('crash'),false);assert.equal(e.raf.size,0);assert.equal(e.timers.size,0);
 e.reduced.matches=false;e.reduced.dispatchEvent(new Event('change'));e.tick(230000);assert.equal(e.raf.size,0,'nukkuva pulu lepää paikallaan');
 e.doc.dispatchEvent(new Event('pointerdown'));assert.ok(e.raf.size>0,'kosketus herättää');e.tick(2400);assert.equal(e.raf.size,0);
});

test('äänet osuvat eleeseen, mykistys peruu hännän ja puhe vaimentaa tehosteen',async t=>{
 const{sfx,AANIVALINTA_TAPAHTUMA}=await import('../js/sound.js');
 let c;t.after(()=>c?.tuhoa());const e=liviaTestYmparisto(t),calls=[];let stopped=0;
 t.mock.method(sfx,'play',(name,opts)=>{calls.push({name,...opts});return()=>stopped++;});
 c=asennaLivianKasvot(e.pollo);e.tick(5000);calls.length=0;
 c.toista('glassCrash');e.tick(1620);assert.ok(calls.some(x=>x.kind==='glass'));assert.equal(calls.filter(x=>x.kind==='glass').length,1);
 const before=stopped;e.doc.dispatchEvent(new Event(AANIVALINTA_TAPAHTUMA));assert.ok(stopped>before);
 calls.length=0;const token={};ilmoitaLivianKasvopuhe(token,true,'pulla');c.toista('bread');e.tick(1800);
 assert.ok(calls.length>0&&calls.every(x=>x.voima<=.42*.25));ilmoitaLivianKasvopuhe(token,false);
 calls.length=0;c.toista('walkRight',{hiljaa:true});e.tick(2400);assert.equal(calls.length,0);
});

test('piirtopinta ulottuu napista viewportin oikeaan reunaan myös koon vaihtuessa',t=>{
 let c;t.after(()=>c?.tuhoa());const e=liviaTestYmparisto(t);let right=370;
 e.doc.documentElement={clientWidth:390};e.button.getBoundingClientRect=()=>({right,bottom:700});
 c=asennaLivianKasvot(e.pollo);e.tick(5000);const surface=e.doc.body.children[0],canvas=surface.children[0];
 assert.equal(surface.style.left,'218px');assert.equal(surface.style.width,'172px');assert.equal(canvas.style.width,'172px');
 right=340;e.doc.dispatchEvent(new Event('scroll'));assert.equal(surface.style.left,'188px');assert.equal(surface.style.width,'202px');
 c.toista('walkRight');e.tick(2300);assert.equal(canvas.innerHTML.includes('data-part="whole-bird"'),false);c.palaa();e.tick(2400);assert.ok(canvas.innerHTML.includes('data-part="whole-bird"'));
});

test('Pulu pienenee avoimessa lehdessä mutta chatinappi säilyy ennallaan',t=>{
 let c;t.after(()=>c?.tuhoa());const e=liviaTestYmparisto(t);c=asennaLivianKasvot(e.pollo);e.tick(5000);
 const surface=e.doc.body.children[0];assert.equal(surface.classList.contains('livia-lehdessa'),false);
 e.lehti.open=true;e.lehti.classList.add('lehti');e.notify(e.lehti);
 assert.equal(surface.classList.contains('livia-lehdessa'),true);assert.equal(e.button.classList.contains('livia-kasvot-valmis'),true);
 assert.equal(surface.parent,e.lehti,'piirros on modaalin ylimmässä kerroksessa');
 e.tick(12000);assert.match(surface.children[0].innerHTML,/data-part="glasses"/,'lasit pysyvät eleen päätyttyä');
 c.toista('scratch');e.tick(1000);assert.match(surface.children[0].innerHTML,/data-part="glasses"/);
 e.lehti.open=false;e.notify(e.lehti);assert.equal(surface.classList.contains('livia-lehdessa'),false);
 e.tick(3000);assert.equal(surface.parent,e.doc.body);assert.doesNotMatch(surface.children[0].innerHTML,/data-part="glasses"/);
});

test('pyyntöjen odotus reagoi ilman chattia ja kestää rinnakkaiset sekä pitkät pyynnöt',t=>{
 let c;t.after(()=>c?.tuhoa());const e=liviaTestYmparisto(t);c=asennaLivianKasvot(e.pollo);e.tick(5000);
 const a={},b={};c.tilanne('waiting',{tunnus:a});assert.ok(e.raf.size);
 c.tilanne('waiting',{tunnus:b});e.tick(4000);c.tilanne('waitingEnd',{tunnus:a});
 e.tick(15000);assert.equal(c.tilanne('photo'),false,'toisen pyynnön odotus jatkuu');
 c.tilanne('waitingEnd',{tunnus:b});e.tick(5000);assert.equal(c.tilanne('photo'),true);
});

test('luenta säilyy odotuksen alun ja lopun yli sekä eleiden välissä',t=>{
 let c;t.after(()=>c?.tuhoa());const e=liviaTestYmparisto(t);c=asennaLivianKasvot(e.pollo);e.tick(5000);
 const a={},b={},surface=e.doc.body.children[0].children[0];
 assert.equal(c.tilanne('narration',{tunnus:a,ele:'lookUp'}),true);e.tick(800);
 const pose=surface.innerHTML;
 c.tilanne('waiting',{tunnus:b});assert.equal(surface.innerHTML,pose);
 c.tilanne('waitingEnd',{tunnus:b});assert.equal(surface.innerHTML,pose);
 e.tick(30000);assert.equal(e.raf.size,0,'kuuntelun tauko ei käynnistä taustaelettä');
 assert.equal(c.tilanne('emotion',{ele:'grin',voimakkuus:.5}),false);
 c.tilanne('narrationEnd',{tunnus:a});assert.equal(c.tilanne('photo'),true);
});

test('luenta ohittaa odotuksen, joka jatkuu vasta viimeisen luennan loputtua',t=>{
 let c;t.after(()=>c?.tuhoa());const e=liviaTestYmparisto(t);c=asennaLivianKasvot(e.pollo);e.tick(5000);
 const a={},b={},w={};c.tilanne('waiting',{tunnus:w});
 assert.equal(c.tilanne('narration',{tunnus:a,ele:'lookUp'}),true);
 assert.equal(c.tilanne('narration',{tunnus:b,ele:'nod'}),true);e.tick(400);
 const pose=e.doc.body.children[0].children[0].innerHTML;
 c.tilanne('narrationEnd',{tunnus:a});assert.equal(e.doc.body.children[0].children[0].innerHTML,pose,'vanha ääni ei katkaise uutta');
 c.tilanne('narrationEnd',{tunnus:b});assert.ok(e.raf.size,'odotus jatkuu');
 assert.equal(c.tilanne('photo'),false);
 c.tilanne('waitingEnd',{tunnus:w});e.tick(4000);assert.equal(c.tilanne('photo'),true);
});

test('modaalissa kuunnellaan vain jos Pulu on itse sen sisällä',t=>{
 let c;t.after(()=>c?.tuhoa());const e=liviaTestYmparisto(t);c=asennaLivianKasvot(e.pollo);e.tick(5000);
 e.lehti.open=true;e.lehti.classList.add('lehti');e.doc.querySelector=s=>s==='dialog[open]'?e.lehti:null;
 assert.equal(c.tilanne('emotion',{ele:'grin',voimakkuus:.5}),false,'peittyvän Pulun ei kuulu reagoida');
 e.button.closest=()=>e.lehti;
 const a={};assert.equal(c.tilanne('narration',{tunnus:a,ele:'lookUp'}),true);
 assert.equal(e.doc.body.children.length,0,'piirtopinta siirtyi samaan modaaliin');
 e.tick(800);c.tilanne('narrationEnd',{tunnus:a});
 assert.equal(c.tilanne('card',{symboli:'historia'}),true,'korttiele sallitaan näkyvässä modaalissa');
});

test('puhe ja nostokortti palauttavat yhä soivan luennan kuuntelun',t=>{
 let c;t.after(()=>c?.tuhoa());const e=liviaTestYmparisto(t);c=asennaLivianKasvot(e.pollo);e.tick(5000);
 const a={},speech={};c.tilanne('narration',{tunnus:a,ele:'lookUp'});
 ilmoitaLivianKasvopuhe(speech,true,'Kääk!');e.tick(5000);
 ilmoitaLivianKasvopuhe(speech,false);assert.ok(e.raf.size,'puheen jälkeen jatketaan kuuntelua');
 assert.equal(c.tilanne('card',{symboli:'historia'}),true);e.tick(3000);
 c.tilanne('cardEnd');assert.ok(e.raf.size,'kortin jälkeen jatketaan kuuntelua');
 c.tilanne('narrationEnd',{tunnus:a});e.tick(40);assert.equal(e.raf.size,0);
});

test('Ihmisen matkan jakson tunne voittaa vain linssiluennan kuuntelun',t=>{
 let c;t.after(()=>c?.tuhoa());const e=liviaTestYmparisto(t);c=asennaLivianKasvot(e.pollo);e.tick(5000);
 const a={},b={},speech={},n={tunnus:a,ele:'lookUp',lahde:'linssiluenta'};
 const tunne={ele:'grin',voimakkuus:.5,lahde:'ihmisen-matka'};
 assert.equal(c.tilanne('narration',n),true);
 assert.equal(c.tilanne('emotion',tunne),true,'jakson alun tagi saa vuoron myös alle 2,8 s edellisestä');
 assert.equal(c.tilanne('narration',n),false,'kuuntelu ei katkaise jakson elettä');
 e.tick(3500);assert.equal(c.tilanne('narration',n),true,'kuuntelu täyttää eleen jälkeiset välit');
 assert.equal(c.tilanne('emotion',{...tunne,lahde:'muu'}),false);
 c.tilanne('narration',{tunnus:b,ele:'lookUp'});
 assert.equal(c.tilanne('emotion',tunne),false,'toinen kertoja ei menetä etusijaa');
 c.tilanne('narrationEnd',{tunnus:b});
 ilmoitaLivianKasvopuhe(speech,true);assert.equal(c.tilanne('emotion',tunne),false);
 ilmoitaLivianKasvopuhe(speech,false);c.tilanne('narrationEnd',{tunnus:a});
});

test('virhe ohittaa avauksen aikarajan, muttei odotusta, puhetta tai luentaa',t=>{
 let c;t.after(()=>c?.tuhoa());const e=liviaTestYmparisto(t);c=asennaLivianKasvot(e.pollo);e.tick(5000);
 const error={ele:'confused',voimakkuus:.4},w={},a={},speech={};
 c.tilanne('chatOpen');assert.equal(c.tilanne('error',error),true);
 c.tilanne('waiting',{tunnus:w});assert.equal(c.tilanne('error',error),false);
 c.tilanne('waitingEnd',{tunnus:w});assert.equal(c.tilanne('error',error),true);
 c.tilanne('narration',{tunnus:a,ele:'lookUp'});assert.equal(c.tilanne('error',error),false);
 c.tilanne('narrationEnd',{tunnus:a});ilmoitaLivianKasvopuhe(speech,true);
 assert.equal(c.tilanne('error',error),false);ilmoitaLivianKasvopuhe(speech,false);
 assert.equal(c.tilanne('error',error),true);
});
test('poistuneen odotusrivin viive ei estä tai nollaa uutta virhe-elettä',t=>{
 let c;t.after(()=>c?.tuhoa());const e=liviaTestYmparisto(t);c=asennaLivianKasvot(e.pollo);e.tick(5000);
 e.pollo.auki=true;e.notify(e.button);
 const row=new e.El();row.className='pollo-odottaa';row.textContent='Tarkistan tiedon';e.virta.append(row);e.notify(e.virta);
 row.remove(); // DOM muuttui, mutta sen observer ei ole vielä ajossa.
 assert.equal(c.tilanne('error',{ele:'confused',voimakkuus:.5}),true);
 e.tick(400);const pose=e.doc.body.children[0].children[0].innerHTML;
 e.notify(e.virta);assert.equal(e.doc.body.children[0].children[0].innerHTML,pose);
 assert.ok(e.raf.size,'virheen ele jatkuu odotusrivin siivouksen yli');
});
test('tilannereaktiot eivät katkaise saapumista, puhetta tai jonota vanhoja kuvia',t=>{
 let c;t.after(()=>c?.tuhoa());const e=liviaTestYmparisto(t);c=asennaLivianKasvot(e.pollo);
 assert.equal(c.tilanne('photo'),false,'pöllön vaihto saa loppua');e.tick(5000);
 assert.equal(c.tilanne('chatOpen'),true);e.tick(3100);
 assert.equal(c.tilanne('photo',{cityId:'marseille'}),true);
 assert.equal(c.tilanne('photo',{cityId:'venetsia'}),false,'nopeat kortit eivät käynnistä elettä uudelleen');e.tick(4000);
 assert.equal(e.raf.size,0,'hylättyä kuvaa ei soiteta myöhemmin');
 const token={};ilmoitaLivianKasvopuhe(token,true,'Kääk!');
 assert.equal(c.tilanne('narration',{ele:'glasses'}),false);
 assert.equal(c.tilanne('photo'),false,'kuvan hymy ei peitä kääk-ilmettä');
 c.tilanne('narrationEnd');
 ilmoitaLivianKasvopuhe(token,false);e.tick(3000);
 assert.equal(c.tilanne('card',{symboli:'tekniikka'}),true);e.tick(1800);
 const markup=e.doc.body.children[0].children[0].innerHTML;assert.ok(markup.includes('data-part="glasses"'));
 c.tilanne('cardEnd');e.tick(40);assert.equal(e.raf.size,0,'kortin sulku lopettaa sen eleen');
});
