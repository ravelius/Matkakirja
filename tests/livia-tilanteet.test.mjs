import test from 'node:test';
import assert from 'node:assert/strict';
import {LIVIAN_TUNTEET,ilmoitaLivianTunne,livianAiheEle,livianTunnetaginTiedot,seuraaLivianKuuntelua,kuunteleLivianTilanteita} from '../js/livia-tilanteet.js';
import {livianNostoAsettelu} from '../js/livia-nostotila.js';
test('kaikilla nostoluokilla on reaktio; vakava sisältö voittaa hymyn',()=>{
 for(const symboli of ['huuto','elain','silma','historia','luonto','ruoka','kulttuuri','tekniikka','kauppa','sana','merenkulku','urheilu','kaupunki','ihme','hetki'])assert.ok(livianAiheEle({symboli}));
 assert.equal(livianAiheEle({symboli:'elain',otsikko:'Valkoinen hevonen syntyy tummana'}),'doubleTake');
 assert.equal(livianAiheEle({symboli:'elain',otsikko:'Kyyhkyn muisti'}),'grin');
 assert.equal(livianAiheEle({symboli:'tekniikka'}),'glasses');
 assert.equal(livianAiheEle({symboli:'ruoka',teksti:'Kaupunki kärsi nälänhädästä.'}),'listen');
 assert.equal(livianAiheEle({symboli:'kulttuuri',teksti:'Hän kuoli sodassa.'}),'listen');
});
test('ulkoinen tunnetagi on vain tunne ja rajattu voimakkuus',t=>{
 assert.deepEqual(Object.keys(LIVIAN_TUNTEET),['utelias','lammin','ilo','hammastys','miettiva','vakava','ylpea','rakkaus','hammentynyt','jannitys']);
 assert.deepEqual(livianTunnetaginTiedot({tunne:' UTELIAS ',voimakkuus:1.4}),{tunne:'utelias',voimakkuus:1,ele:'lookUp'});
 assert.deepEqual(livianTunnetaginTiedot({tunne:'lammin'}),{tunne:'lammin',voimakkuus:.5,ele:'smile'});
 assert.equal(livianTunnetaginTiedot({tunne:'tuntematon',voimakkuus:.4}),null);
 assert.equal(livianTunnetaginTiedot({tunne:'ilo',voimakkuus:'paljon'}),null);
 const calls=[],off=kuunteleLivianTilanteita((...x)=>calls.push(x));t.after(off);
 assert.deepEqual(ilmoitaLivianTunne({tunne:'ilo',voimakkuus:.7},{lahde:'koe',teksti:'ei kuulu tagiin'}),{tunne:'ilo',voimakkuus:.7,ele:'grin'});
 assert.equal(calls[0][0],'emotion');assert.equal(calls[0][1].lahde,'koe');assert.equal(calls[0][1].ele,'grin');
});
test('luennan reaktiot seuraavat soitinta, eivät seinäkelloa tai vanhaa kaupunkia',t=>{
 const a=new EventTarget();a.currentTime=0;a.paused=false;let current=true;const calls=[];
 const off=kuunteleLivianTilanteita((...x)=>calls.push(x));t.after(off);
 const stop=seuraaLivianKuuntelua(a,()=>current,()=> 'Kirjastossa luin kirjaa.');t.after(stop);
 a.dispatchEvent(new Event('playing'));assert.equal(calls.at(-1)[1].ele,'lookUp');
 a.currentTime=4;a.dispatchEvent(new Event('timeupdate'));assert.equal(calls.length,1);
 a.paused=true;a.dispatchEvent(new Event('pause'));assert.equal(calls.at(-1)[0],'narrationEnd');
 a.currentTime=18;a.dispatchEvent(new Event('timeupdate'));assert.equal(calls.length,2);
 a.paused=false;a.dispatchEvent(new Event('playing'));assert.equal(calls.length,3);
 current=false;a.currentTime=40;a.dispatchEvent(new Event('timeupdate'));assert.equal(calls.length,3);
 stop();a.dispatchEvent(new Event('playing'));assert.equal(calls.length,4,'irrotettu soitin ei reagoi');
});
test('iPhonen nostokortti jättää suuren ilmeen ja otsakepalkin näkyviin',()=>{
 for(const [width,height,safe]of [[390,844,34],[393,852,34],[375,667,0],[430,932,34]]){
  const feet=height-safe-61;
  const a=livianNostoAsettelu({width,height,headerBottom:114,birdBottom:feet,birdLeft:width-130});
  assert.ok(height-a.bottom<=feet-118);assert.ok(a.top>=126);assert.ok(a.height>=250);assert.equal(a.top+a.height,height-a.bottom);
 }
 const a=livianNostoAsettelu({width:844,height:390,headerBottom:82,birdBottom:370,birdLeft:700});
 assert.ok(844-a.right<=686);assert.ok(a.height>=270,'matalalla ruudulla kortti väistää sivulle');
});
