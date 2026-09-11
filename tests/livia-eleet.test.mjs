import test from 'node:test';
import assert from 'node:assert/strict';
import { asennaLivianKasvot, valitseLivianTaustaEle } from '../js/livia-eleet.js';
import { ilmoitaLivianKasvopuhe } from '../js/livia-puhetila.js';
import { livianDialogikoti, seuraaLivianDialogeja } from '../js/livia-dialogitila.js';

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
 const doc=new EventTarget(),lehti=new El();lehti.id='arrival-dialog';lehti.localName='dialog';doc.hidden=false;doc.body=new El();doc.createElement=()=>new El();doc.querySelector=()=>null;doc.getElementById=id=>id==='arrival-dialog'?lehti:null;
 const button=new El(),virta=new El(),reduced=new EventTarget();reduced.matches=false;
 const set=(key,value)=>{const before=Object.getOwnPropertyDescriptor(globalThis,key);Object.defineProperty(globalThis,key,{configurable:true,writable:true,value});t.after(()=>before?Object.defineProperty(globalThis,key,before):delete globalThis[key]);};
 set('requestAnimationFrame',fn=>{raf.set(++id,fn);return id;});set('cancelAnimationFrame',id=>raf.delete(id));
 set('setTimeout',(fn,ms)=>{timers.set(++id,{fn,at:now+ms});return id;});set('clearTimeout',id=>timers.delete(id));
 set('matchMedia',()=>reduced);set('getComputedStyle',e=>({display:e.hidden?'none':'block',visibility:'visible'}));
 set('MutationObserver',class{constructor(fn){this.fn=fn;observers.push(this);}observe(el){this.el=el;}disconnect(){this.el=null;}});
 t.mock.method(performance,'now',()=>now);
 const tick=ms=>{const end=now+ms;while(now<end){now=Math.min(end,now+20);const rs=[...raf.values()];raf.clear();rs.forEach(f=>f(now));for(const[k,v]of[...timers])if(v.at<=now){timers.delete(k);v.fn();}}};
 const notify=(el,rs=[])=>observers.filter(o=>o.el===el).forEach(o=>o.fn(rs));
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

test('pitkä odotus reagoi kerran, ei herää päättyneenä eikä keskeytä luentaa',t=>{
 let c;t.after(()=>c?.tuhoa());const e=liviaTestYmparisto(t);c=asennaLivianKasvot(e.pollo);e.tick(5000);
 const wait={};c.tilanne('waiting',{tunnus:wait});c.tilanne('waiting',{tunnus:wait});e.tick(5900);assert.equal(e.raf.size,0,'sama token ei saa toista ajastinta');
 e.tick(200);assert.ok(e.raf.size,'6 sekunnin jälkeen tulee yksi rauhallinen vastaus');
 e.tick(4000);assert.equal(e.raf.size,0);e.tick(7000);assert.equal(e.raf.size,0,'sama odotus ei vastaa uudelleen');
 c.tilanne('waitingEnd',{tunnus:wait});
 const stale={};c.tilanne('waiting',{tunnus:stale});c.tilanne('waitingEnd',{tunnus:stale});e.tick(7000);assert.equal(e.raf.size,0,'päättynyt odotus ei herää');
 const hidden={};c.tilanne('waiting',{tunnus:hidden});e.tick(3000);e.doc.hidden=true;e.doc.dispatchEvent(new Event('visibilitychange'));e.tick(10000);
 assert.equal(e.raf.size,0,'piilotettu sivu ei esitä viivästynyttä elettä');e.doc.hidden=false;e.doc.dispatchEvent(new Event('visibilitychange'));e.tick(3100);
 assert.ok(e.raf.size,'aktiivisen odotuksen jäljellä oleva viive jatkuu palatessa');c.tilanne('waitingEnd',{tunnus:hidden});e.tick(3000);
 const narration={};c.tilanne('narration',{tunnus:narration,ele:'lookUp'});const queued={};c.tilanne('waiting',{tunnus:queued});e.tick(7000);
 assert.equal(e.raf.size,0,'pitkä odotus ei keskeytä luentaa');c.tilanne('narrationEnd',{tunnus:narration});assert.ok(e.raf.size,'odotus jatkuu luennan jälkeen');
 c.tilanne('waitingEnd',{tunnus:queued});
 c.tuhoa();assert.equal(e.timers.size,0,'odotus-, tausta- tai paluuajastimia ei vuoda purussa');c=null;
});

test('taustaeleet ovat neutraaleja eivätkä toistu heti',()=>{
 const neutraalit=new Set(['blink','turn','preen','glance','tilt','lookUp','lookDown']);
 for(const edellinen of neutraalit)for(const arpa of [0,.25,.5,.999]){
  const ele=valitseLivianTaustaEle(edellinen,arpa);assert.ok(neutraalit.has(ele));assert.notEqual(ele,edellinen);
 }
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

test('matkakirjan katse pysyy koko luennan, palautuu sisääntulon ja peittymisen jälkeen ja loppuu taukoon',t=>{
 let c;t.after(()=>c?.tuhoa());const e=liviaTestYmparisto(t);c=asennaLivianKasvot(e.pollo);
 const canvas=e.doc.body.children[0].children[0],a={};
 assert.equal(c.tilanne('narration',{tunnus:a,ele:'lookUp',lahde:'matkakirja'}),false,'sisääntulo saa valmistua');
 e.tick(6000);assert.match(canvas.innerHTML,/data-gaze="up-left"/);
 e.tick(30000);assert.match(canvas.innerHTML,/data-gaze="up-left"/);assert.equal(e.raf.size,0,'pysyvä asento ei kuluta kehyksiä');
 assert.doesNotMatch(canvas.innerHTML,/data-part="glasses"/);
 e.doc.hidden=true;e.doc.dispatchEvent(new Event('visibilitychange'));assert.doesNotMatch(canvas.innerHTML,/data-gaze="up-left"/);
 e.doc.hidden=false;e.doc.dispatchEvent(new Event('visibilitychange'));assert.match(canvas.innerHTML,/data-gaze="up-left"/);
 e.reduced.matches=true;e.reduced.dispatchEvent(new Event('change'));assert.match(canvas.innerHTML,/data-gaze="up-left"/);assert.equal(e.raf.size,0);
 c.tilanne('narrationEnd',{tunnus:a});assert.doesNotMatch(canvas.innerHTML,/data-gaze="up-left"/);
 c.tilanne('narration',{tunnus:a,ele:'nod',lahde:'matkakirja'});assert.match(canvas.innerHTML,/data-gaze="up-left"/);
 c.tilanne('narrationEnd',{tunnus:a});assert.doesNotMatch(canvas.innerHTML,/data-gaze="up-left"/);
});
test('tekstireaktio kuuluu vain oikealle luennalle, perusnyökkäys ei keskeytä ja tauko/seek purkavat',t=>{
 let c;t.after(()=>c?.tuhoa());const e=liviaTestYmparisto(t);c=asennaLivianKasvot(e.pollo);e.tick(5000);
 const canvas=e.doc.body.children[0].children[0],a={},b={};
 const r={lahde:'matkakirja',luentaTunnus:a,tunnus:'marseille.r6',tarkoitus:'huvittuu',voimakkuus:.6};
 const n={tunnus:a,lahde:'matkakirja',ele:'nod',reaktiotAjastettu:true};
 assert.equal(c.tilanne('reaction',r),false,'ilman luentaa ei reaktiota');
 c.tilanne('narration',n);assert.equal(e.raf.size,0,'ajastetun pilotin perusnyökkäys on hiljainen');
 assert.equal(c.tilanne('reaction',{...r,luentaTunnus:b}),false);
 assert.equal(c.tilanne('reaction',r),true);e.tick(500);const pose=canvas.innerHTML;
 assert.equal(c.tilanne('reaction',r),false,'sama tapahtuma ei aloita uudestaan');
 assert.equal(c.tilanne('narration',n),false);assert.equal(canvas.innerHTML,pose);
 assert.equal(c.tilanne('reactionEnd',{luentaTunnus:b}),false);assert.equal(canvas.innerHTML,pose);
 assert.equal(c.tilanne('reactionEnd',{luentaTunnus:a}),true);assert.match(canvas.innerHTML,/data-gaze="up-left"/);assert.equal(e.raf.size,0);
 assert.equal(c.tilanne('reaction',r),true,'seekin jälkeen sallitaan oikeasti uudelleen saavutettu kohta');e.tick(500);
 c.tilanne('narrationEnd',{tunnus:a});assert.equal(e.raf.size,0);assert.doesNotMatch(canvas.innerHTML,/data-gaze="up-left"/);
 assert.equal(c.tilanne('reaction',r),false,'myöhäinen osuma ei herätä päättynyttä ääntä');
 c.tilanne('narration',n);c.tilanne('reaction',r);e.tick(3000);assert.match(canvas.innerHTML,/data-gaze="up-left"/);assert.equal(e.raf.size,0);
 c.tilanne('reaction',r);c.tilanne('narration',{...n,tunnus:b});assert.equal(e.raf.size,0,'äänenvaihto lopettaa vanhan eleen');
 assert.equal(c.tilanne('reaction',r),false);c.tilanne('narrationEnd',{tunnus:a});c.tilanne('narrationEnd',{tunnus:b});
});
test('tekstireaktio väistää puhetta, chattia ja korttia ilman paluujonoa; reduced-motion on staattinen',t=>{
 let c;t.after(()=>c?.tuhoa());const e=liviaTestYmparisto(t);c=asennaLivianKasvot(e.pollo);e.tick(5000);
 const canvas=e.doc.body.children[0].children[0],a={},speech={};
 const r={lahde:'matkakirja',luentaTunnus:a,tunnus:'marseille.r6',tarkoitus:'huvittuu',voimakkuus:.6};
 const n={tunnus:a,lahde:'matkakirja',ele:'nod',reaktiotAjastettu:true};
 c.tilanne('narration',n);c.tilanne('reaction',r);ilmoitaLivianKasvopuhe(speech,true,'Hei!');
 assert.equal(c.tilanne('reaction',r),false);ilmoitaLivianKasvopuhe(speech,false);e.tick(3500);assert.match(canvas.innerHTML,/data-gaze="up-left"/);
 c.tilanne('reaction',r);e.pollo.auki=true;e.notify(e.button);assert.equal(e.raf.size,0);assert.equal(c.tilanne('reaction',r),false);
 e.pollo.auki=false;e.notify(e.button);c.tilanne('narration',n);assert.equal(e.raf.size,0);
 c.tilanne('card',{symboli:'historia'});assert.equal(c.tilanne('reaction',r),false);c.tilanne('cardEnd');
 e.reduced.matches=true;e.reduced.dispatchEvent(new Event('change'));c.tilanne('narration',n);
 assert.equal(c.tilanne('reaction',r),true);const pose=canvas.innerHTML;assert.equal(e.raf.size,0);
 e.tick(800);assert.equal(canvas.innerHTML,pose);c.tilanne('reactionEnd',{luentaTunnus:a});assert.match(canvas.innerHTML,/data-gaze="up-left"/);
 c.tilanne('reaction',r);e.tick(3000);assert.match(canvas.innerHTML,/data-gaze="up-left"/);assert.equal(e.raf.size,0);
 c.tilanne('reaction',r);e.doc.hidden=true;e.doc.dispatchEvent(new Event('visibilitychange'));e.tick(3000);
 e.doc.hidden=false;e.doc.dispatchEvent(new Event('visibilitychange'));assert.match(canvas.innerHTML,/data-gaze="up-left"/);
 c.tilanne('narrationEnd',{tunnus:a});c.tuhoa();assert.equal(e.timers.size,0);
});
for(const jarjestys of ['luenta ensin','reaktio ensin','tavallinen reaktio ennen loppua'])for(const reduced of [false,true])test(`loppunauru valmistuu: ${jarjestys}, reduced=${reduced}`,t=>{
 let c;t.after(()=>c?.tuhoa());const e=liviaTestYmparisto(t);e.reduced.matches=reduced;c=asennaLivianKasvot(e.pollo);e.tick(5000);
 const canvas=e.doc.body.children[0].children[0],a={paused:false,ended:false};
 const r={lahde:'matkakirja',luentaTunnus:a,tunnus:'marseille.r6',tarkoitus:'huvittuu',voimakkuus:.6,jalkireaktio:true};
 c.tilanne('narration',{tunnus:a,lahde:'matkakirja',reaktiotAjastettu:true});
 const end=()=>c.tilanne('narrationEnd',{tunnus:a,luonnollinenLoppu:true});
 if(jarjestys==='luenta ensin'){a.paused=a.ended=true;end();assert.equal(c.tilanne('reaction',r),true);}
 else if(jarjestys==='reaktio ensin'){a.ended=true;assert.equal(c.tilanne('reaction',r),true);end();a.paused=true;}
 else{assert.equal(c.tilanne('reaction',{...r,jalkireaktio:false}),true);e.tick(20);a.paused=true;end();}
 e.tick(600);assert.notEqual(canvas.innerHTML,'');assert.doesNotMatch(canvas.innerHTML,/data-gaze="up-left"/);
 const pose=canvas.innerHTML;c.tilanne('narrationEnd',{tunnus:a,luonnollinenLoppu:true});assert.equal(canvas.innerHTML,pose,'kaksoisloppu ei katkaise');
 if(!reduced)assert.ok(e.raf.size,'nauru jatkuu yli 500 ms vastaanottoikkunan');else assert.equal(e.raf.size,0);
 e.tick(3000);assert.equal(e.raf.size,0);assert.notEqual(canvas.innerHTML,pose,'ele palautuu lepoon');
 assert.equal(c.tilanne('reaction',r),false,'ei myöhäistä uusintaa');c.tuhoa();assert.equal(e.timers.size,0);
});
for(const viive of [0,500,501])test(`jälkireaktion vastaanottoikkuna ${viive} ms, vain yksi`,t=>{
 let c;t.after(()=>c?.tuhoa());const e=liviaTestYmparisto(t);c=asennaLivianKasvot(e.pollo);e.tick(5000);const a={paused:false};
 const r={lahde:'matkakirja',luentaTunnus:a,tunnus:'r6',tarkoitus:'huvittuu',voimakkuus:.6,jalkireaktio:true};
 c.tilanne('narration',{tunnus:a,lahde:'matkakirja',reaktiotAjastettu:true});a.paused=true;c.tilanne('narrationEnd',{tunnus:a,luonnollinenLoppu:true});
 e.tick(viive);assert.equal(c.tilanne('reaction',r),viive<=500);
 assert.equal(c.tilanne('reaction',{...r,tunnus:'r7'}),false);assert.equal(c.tilanne('reaction',{...r,luentaTunnus:{}}),false);
});
for(const katkaisu of ['reactionEnd','tauko','uusi luenta','puhe','chat','kortti','piilossa','tuho'])test(`loppuikkuna ei palaudu katkaisun jälkeen: ${katkaisu}`,t=>{
 let c;t.after(()=>c?.tuhoa());const e=liviaTestYmparisto(t);c=asennaLivianKasvot(e.pollo);e.tick(5000);const a={paused:false};
 const r={lahde:'matkakirja',luentaTunnus:a,tunnus:'r6',tarkoitus:'huvittuu',voimakkuus:.6,jalkireaktio:true};
 c.tilanne('narration',{tunnus:a,lahde:'matkakirja',reaktiotAjastettu:true});a.paused=true;c.tilanne('narrationEnd',{tunnus:a,luonnollinenLoppu:true});
 if(katkaisu==='reactionEnd')c.tilanne('reactionEnd',{luentaTunnus:a});
 if(katkaisu==='tauko')c.tilanne('narrationEnd',{tunnus:a});
 if(katkaisu==='uusi luenta')c.tilanne('narration',{tunnus:{},lahde:'matkakirja',reaktiotAjastettu:true});
 if(katkaisu==='puhe'){const p={};ilmoitaLivianKasvopuhe(p,true);ilmoitaLivianKasvopuhe(p,false);}
 if(katkaisu==='chat'){e.pollo.auki=true;e.notify(e.button);e.pollo.auki=false;e.notify(e.button);}
 if(katkaisu==='kortti'){c.tilanne('card',{symboli:'historia'});c.tilanne('cardEnd');}
 if(katkaisu==='piilossa'){e.doc.hidden=true;e.doc.dispatchEvent(new Event('visibilitychange'));e.doc.hidden=false;e.doc.dispatchEvent(new Event('visibilitychange'));}
 if(katkaisu==='tuho')c.tuhoa();
 assert.equal(c.tilanne('reaction',r),false);c.tilanne('narrationEnd',{tunnus:a,luonnollinenLoppu:true});
 assert.equal(c.tilanne('reaction',r),false,'myöhäinen kaksoisloppu ei avaa ikkunaa');
});
test('luonnollisesti päättynyt jälkiele on yhä katkaistavissa oikealla tunnuksella',t=>{
 let c;t.after(()=>c?.tuhoa());const e=liviaTestYmparisto(t);c=asennaLivianKasvot(e.pollo);e.tick(5000);const a={},b={};
 const r={lahde:'matkakirja',luentaTunnus:a,tunnus:'r6',tarkoitus:'huvittuu',voimakkuus:.6,jalkireaktio:true};
 c.tilanne('narration',{tunnus:a,lahde:'matkakirja',reaktiotAjastettu:true});c.tilanne('narrationEnd',{tunnus:a,luonnollinenLoppu:true});
 assert.equal(c.tilanne('reaction',r),true);e.tick(700);
 assert.equal(c.tilanne('reactionEnd',{luentaTunnus:b}),false);assert.ok(e.raf.size);
 assert.equal(c.tilanne('reactionEnd',{luentaTunnus:a}),true);assert.equal(e.raf.size,0);
});
test('lehtilasit eivät katoa uuden lasieleen alussa, hieraisussa tai levossa; sulku riisuu heti',t=>{
 let c;t.after(()=>c?.tuhoa());const e=liviaTestYmparisto(t);c=asennaLivianKasvot(e.pollo);e.tick(5000);
 const surface=e.doc.body.children[0],canvas=surface.children[0];
 e.lehti.open=true;e.lehti.classList.add('lehti');e.notify(e.lehti);e.tick(6000);
 c.toista('glasses');assert.match(canvas.innerHTML,/data-part="glasses"[^>]+translate\(0 0\)/);
 e.tick(6000);c.toista('eyeRub');e.tick(2600);
 assert.match(canvas.innerHTML,/data-part="rubEyes"/);assert.match(canvas.innerHTML,/translate\(0 -22\)/);
 e.tick(4000);assert.match(canvas.innerHTML,/data-part="glasses"[^>]+translate\(0 0\)/);
 c.toista('eyeRub');e.tick(2000);e.lehti.open=false;e.notify(e.lehti);
 assert.doesNotMatch(canvas.innerHTML,/data-part="glasses"|data-part="rubEyes"/);
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
 e.doc.querySelectorAll=()=>[e.lehti];
 assert.equal(c.tilanne('emotion',{ele:'grin',voimakkuus:.5}),false,'peittyvän Pulun ei kuulu reagoida');
 e.button.closest=()=>e.lehti;
 const a={};assert.equal(c.tilanne('narration',{tunnus:a,ele:'lookUp'}),true);
 assert.equal(e.doc.body.children.length,0,'piirtopinta siirtyi samaan modaaliin');
 e.tick(800);c.tilanne('narrationEnd',{tunnus:a});
 assert.equal(c.tilanne('card',{symboli:'historia'}),true,'korttiele sallitaan näkyvässä modaalissa');
});

test('T1 sallii kolme dialogia, muu modaali katkaisee myös odotuksen ja oman puheen',t=>{
 let c;t.after(()=>c?.tuhoa());const e=liviaTestYmparisto(t);
 const dialogs=['passport-dialog','quiz-dialog','rules-dialog','wiki-dialog'].map(id=>Object.assign(new e.El(),{id,localName:'dialog'}));
 dialogs.unshift(e.lehti);e.doc.querySelectorAll=s=>s==='dialog[open]'?dialogs.filter(d=>d.open):[];
 let host=null;e.button.closest=()=>host;
 const off=seuraaLivianDialogeja(e.doc,()=>{host=livianDialogikoti(e.doc);});t.after(off);
 c=asennaLivianKasvot(e.pollo);e.tick(5000);const surface=e.doc.body.children[0];
 function toggle(id,open) {
  const d=dialogs.find(d=>d.id===id),oldValue=d.open?'':null;d.open=open;
  e.notify(e.doc.body,[{type:'attributes',attributeName:'open',target:d,oldValue}]);e.notify(e.button);
 }
 for(const id of ['arrival-dialog','passport-dialog','quiz-dialog']) {
  toggle(id,true);assert.equal(surface.parent.id,id);assert.equal(surface.hidden,false);
  assert.equal(c.tilanne('card',{symboli:'historia'}),true);e.tick(3500);
  const wait={};c.tilanne('waiting',{tunnus:wait});assert.ok(e.raf.size);
  toggle('rules-dialog',true);assert.equal(e.raf.size,0);assert.equal(surface.hidden,true);
  assert.equal(c.toista('grin'),false);assert.equal(c.tilanne('card',{symboli:'historia'}),false);
  const speech={};ilmoitaLivianKasvopuhe(speech,true,'Kääk!');e.tick(26000);
  assert.equal(e.raf.size,0,'odotus ja puhe eivät ohita dialogiporttia');
  toggle('rules-dialog',false);assert.ok(e.raf.size,'yhä soivan oman puheen nokka jatkuu sallitussa näkymässä');
  toggle('rules-dialog',true);assert.equal(e.raf.size,0);
  ilmoitaLivianKasvopuhe(speech,false);c.tilanne('waitingEnd',{tunnus:wait});
  toggle('rules-dialog',false);assert.equal(surface.parent.id,id);assert.equal(surface.hidden,false);
  assert.equal(e.raf.size,0,'sulkeminen ei toista vanhaa elettä tai saapumista');
  toggle(id,false);
 }
 toggle('wiki-dialog',true);assert.equal(surface.hidden,false,'aiempi chat saa staattisen pulun');
 assert.equal(c.toista('grin'),false);assert.equal(e.raf.size,0);
 e.pollo.auki=true;e.notify(e.button);const kysymys={};c.tilanne('waiting',{tunnus:kysymys});
 assert.ok(e.raf.size,'artikkelin oma chat reagoi kysymykseen heti');e.tick(7000);
 let jatkui=false;for(let i=0;i<36;i++){e.tick(250);jatkui ||= e.raf.size>0;}
 assert.ok(jatkui,'pitkä odotus jatkaa eleitä myös ensimmäisen eleen jälkeen');
 c.tilanne('waitingEnd',{tunnus:kysymys});e.pollo.auki=false;e.notify(e.button);
 assert.equal(e.raf.size,0,'chatin sulku palauttaa artikkelin hiljaisuuden');
 toggle('wiki-dialog',false);assert.equal(surface.parent,e.doc.body);
 e.button.hidden=true;e.notify(e.button);toggle('quiz-dialog',true);
 assert.equal(surface.hidden,true,'löytämätön tai intron piilottama pulu ei ilmesty dialogissa');
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

test('kortin avausele valmistuu kerran ja avoimen kortin lukija saa sitten kuuntelun',t=>{
 let c;t.after(()=>c?.tuhoa());const e=liviaTestYmparisto(t);
 let kortit=[];e.doc.head=new e.El();e.doc.querySelectorAll=()=>kortit;
 const win=new EventTarget();Object.assign(win,{innerHeight:844,innerWidth:390,getComputedStyle:()=>({visibility:'visible'})});
 e.doc.defaultView=win;e.doc.documentElement={clientWidth:390};
 e.button.getClientRects=()=>[{}];e.button.getBoundingClientRect=()=>({bottom:790,right:340});
 c=asennaLivianKasvot(e.pollo);e.tick(5000);
 const k=new e.El();k.classList={toggle(){},remove(){}};
 k.style={getPropertyValue:()=>'',setProperty(){}};kortit=[k];e.notify(e.doc.body);
 const a={},n={tunnus:a,ele:'lookUp',lahde:'lukija'};
 assert.equal(c.tilanne('narration',n),false,'avauselettä ei katkaista');
 e.tick(2500);assert.ok(e.raf.size,'kuuntelu alkaa heti avauseleen loputtua');
 e.tick(5000);assert.equal(c.tilanne('narration',n),true,'avoin kortti ei estä omaa lukijaa');
 const muu={};assert.equal(c.tilanne('narration',{tunnus:muu,ele:'lookUp',lahde:'linssiluenta'}),false,'muiden soittimien korttiportti säilyy');
 c.tilanne('narrationEnd',{tunnus:muu});c.tilanne('narrationEnd',{tunnus:a});e.tick(40);
 assert.equal(e.raf.size,0,'lopetettu lukija ei jää elejonoon');
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
