import test from 'node:test';
import assert from 'node:assert/strict';
import { LIVIA_PIX_ELEET, LIVIA_PIX_RUUDUT, LIVIA_PIX_W, LIVIA_PIX_H, LIVIA_PIX_LEFT, LIVIA_PIX_PALETTI, livianNayttamo, livianPikseliAsento, livianPikselit } from '../js/livia-pikselit.js';
import { livianMietintaEle, livianRepliikinEle } from '../js/livia-eleet.js';
import { ilmoitaLivianKasvopuhe, livianKasvopuheenTila, kuunteleLivianKasvopuhetta, seuraaLivianKasvoAanitetta, lopetaLivianKasvoAanite, seuraaLivianKasvoLausumaa } from '../js/livia-puhetila.js';

test('pikselisarjan kaikki 51 liikettä pysyvät lavalla, ja aktiivikasvo varaa vain 44 × 44',()=>{
 assert.equal(LIVIA_PIX_ELEET.length,51);assert.equal(new Set(LIVIA_PIX_ELEET.map(x=>x.id)).size,51);
 const rest=livianPikseliAsento('blink',0),restPix=livianPikselit(rest);
 assert.equal(LIVIA_PIX_W,38);assert.equal(LIVIA_PIX_H,44);
 assert.ok(restPix.slice(0,42).flat().every(x=>x===0));
 assert.ok(restPix.every(r=>r.slice(0,LIVIA_PIX_LEFT*2).every(v=>v===0)));
 for(const id of ['bread','manic','puff','sneeze'])assert.ok(Array.from({length:99},(_,i)=>livianPikselit(livianPikseliAsento(id,(i+1)/100))).some(p=>p.some(r=>r.slice(0,LIVIA_PIX_LEFT*2).some(Boolean))),id+' käyttää lyhyesti vasenta sivua');
 for(const clip of LIVIA_PIX_ELEET){
  if(!['arrive','crash','emerge','handoff','flyBack','clumsyLand','glassCrash','walkBack'].includes(clip.id))assert.deepEqual(livianPikseliAsento(clip.id,0),rest);
  if(!['leaveRight','leaveDown','flyAway','walkRight'].includes(clip.id))assert.deepEqual(livianPikseliAsento(clip.id,1),rest);
  let changed=false;
  for(let i=0;i<=120;i++){
   const s=livianPikseliAsento(clip.id,i/120),pix=livianPikselit(s);
   assert.ok(Number.isInteger(s.x)&&s.x>=0,clip.id+' ei saa lähteä vasemmalle');assert.ok(Number.isInteger(s.y));
   assert.equal(pix.length,88);assert.ok(pix.every(r=>r.length===76&&r.every(v=>Number.isInteger(v)&&v>=0&&v<LIVIA_PIX_PALETTI.length)));
   if(JSON.stringify(livianNayttamo(s))!==JSON.stringify(livianNayttamo(rest)))changed=true;
  }
  assert.ok(changed,clip.id+' on todellinen ele');
 }
});

test('pään sivut ja suora asento ovat eri piirroksia; poistumiset todella poistuvat',()=>{
 for(const id of ['front','left','right'])assert.notDeepEqual(LIVIA_PIX_RUUDUT[id],LIVIA_PIX_RUUDUT.rest);
 assert.notDeepEqual(LIVIA_PIX_RUUDUT.left,LIVIA_PIX_RUUDUT.right);
 assert.ok(livianNayttamo(livianPikseliAsento('leaveRight',1)).flat().every(x=>x===0));
 assert.ok(livianPikselit(livianPikseliAsento('leaveDown',1)).slice(0,86).flat().every(x=>x===0));
 assert.ok(livianPikselit(livianPikseliAsento('owl',.48)).flat().every(x=>x===0));
 for(const id of ['arrive','crash','emerge'])assert.ok(livianPikselit(livianPikseliAsento(id,0)).slice(0,86).flat().every(x=>x===0));
});

test('puheen nokka liikkuu säilyttäen ilmeen silmät; myös sivuprofiilissa',()=>{
 for(const frame of ['angry','embarrassed','rest','front','right','left']){
  const s={...livianPikseliAsento('blink',0),frame};
  const a=livianPikselit(s),b=livianPikselit({...s,mouth:'talk'});
  assert.deepEqual(a.slice(0,63),b.slice(0,63));assert.notDeepEqual(a,b,frame);
 }
});

test('filler ja näkyvä repliikki valitsevat tilanteeseen sopivan eleen',()=>{
 for(const [text,id]of[
 ['Siivet märkinä sateesta.','rain'],['Tämä tieto tulee vastatuuleen.','wind'],['Luen pienellä painetun.','reading'],
 ['Kynä on väärässä siivessä.','preen'],['Tarkistan faktat.','think'],['Käyn pöllöllä.','flyAway'],['Pulla suussa.','crumb'],
 ])assert.equal(livianMietintaEle(text),id,text);
 for(const[text,id]of[['Kääk!','shock'],['Hups, nolottaa.','embarrassed'],['Miten kehtaat!','angry'],['Olen kyllästynyt.','bored'],['Pöh! Posket.','puff'],['Pulla ensin.','manic'],['Minähän sanoin, tiedän.','expert'],['En voi uskoa!','disbelief'],['Rakas, aivan tavallinen.','love']])assert.equal(livianRepliikinEle(text),id,text);
});

class LiviaTestAudio extends EventTarget{muted=false;volume=1;paused=true;ended=false;emit(n){if(n==='playing')this.paused=false;if(n==='pause')this.paused=true;this.dispatchEvent(new Event(n));}}
test('äänite odottaa playing-tapahtumaa, hiljenee taukoon ja vanha loppu ei lopeta uutta',()=>{
 const a=new LiviaTestAudio(),b=new LiviaTestAudio();let calls=0;
 const off=kuunteleLivianKasvopuhetta(()=>calls++);
 seuraaLivianKasvoAanitetta(a,'A');seuraaLivianKasvoAanitetta(b,'B');assert.equal(livianKasvopuheenTila().length,0);
 a.emit('play');assert.equal(livianKasvopuheenTila().length,0);
 a.emit('playing');assert.deepEqual(livianKasvopuheenTila(),[{teksti:'A'}]);
 const count=calls;a.emit('playing');assert.equal(calls,count,'sama tila ei aiheuta uudelleenaloitusta');
 a.emit('waiting');assert.equal(livianKasvopuheenTila().length,0);a.emit('playing');b.emit('playing');a.emit('ended');
 assert.deepEqual(livianKasvopuheenTila(),[{teksti:'B'}]);
 b.muted=true;b.emit('volumechange');assert.equal(livianKasvopuheenTila().length,0);
 b.muted=false;b.emit('volumechange');assert.equal(livianKasvopuheenTila().length,1);
 lopetaLivianKasvoAanite(b);assert.equal(livianKasvopuheenTila().length,0);
 b.emit('playing');assert.equal(livianKasvopuheenTila().length,0,'purettu soitin ei herää myöhäisestä tapahtumasta');off();
});

test('selaimen kertoja ei liikuta pulua; perutun pululausuman myöhäinen alku on inertti',()=>{
 const kertoja={text:'isoisä'},pulu={text:'pulu'};
 const stopK=seuraaLivianKasvoLausumaa(kertoja,'kertoja');assert.equal(kertoja.onstart,undefined);stopK();
 const stop=seuraaLivianKasvoLausumaa(pulu,'pollo'),late=pulu.onstart;
 assert.equal(livianKasvopuheenTila().length,0);pulu.onstart();assert.equal(livianKasvopuheenTila().length,1);
 pulu.onpause();assert.equal(livianKasvopuheenTila().length,0);pulu.onresume();stop();late();assert.equal(livianKasvopuheenTila().length,0);
});

test('puhetilan kuulija irtoaa eikä vaikuta muiden puheeseen',()=>{
 const id={};let n=0;const off=kuunteleLivianKasvopuhetta(()=>n++);off();
 ilmoitaLivianKasvopuhe(id,true,'a');ilmoitaLivianKasvopuhe(id,false);assert.equal(n,1);
});

test('lento muuttuu pisteeksi, kävely ylittää napin ja lepotila on 24 × 24',()=>{
 const rest=livianPikseliAsento('blink',0),compact=livianNayttamo(rest,{compact:true,right:9});
 const xy=compact.flatMap((r,y)=>r.flatMap((v,x)=>v?[[x,y]]:[]));
 assert.ok(Math.max(...xy.map(p=>p[0]))-Math.min(...xy.map(p=>p[0]))<24);
 assert.ok(Math.max(...xy.map(p=>p[1]))-Math.min(...xy.map(p=>p[1]))<24);
 const dot=livianNayttamo(livianPikseliAsento('flyAway',.89));assert.equal(dot.flat().filter(Boolean).length,1);
 for(const right of [0,7,25,120]){
  for(const id of ['flyAway','walkRight','leaveRight'])assert.ok(livianNayttamo(livianPikseliAsento(id,1),{right}).flat().every(v=>!v));
  const walk=livianNayttamo(livianPikseliAsento('walkRight',.55),{right});
  if(right>0)assert.ok(walk.some(r=>r.slice(76).some(Boolean)),'kävelee myös alkuperäisen kuvakkeen oikealla puolella');
 }
 for(const id of ['flyAway','flyBack','clumsyLand','glassCrash','walkRight','walkBack'])for(let i=0;i<=100;i++){
  const p=livianNayttamo(livianPikseliAsento(id,i/100),{right:7});assert.equal(p.length,152);assert.ok(p.every(r=>r.length===90&&r.every(v=>v>=0&&v<LIVIA_PIX_PALETTI.length)));
 }
});
