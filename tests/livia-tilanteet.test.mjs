import test from 'node:test';
import assert from 'node:assert/strict';
import {LIVIAN_PITKAN_ODOTUKSEN_VIIVE,LIVIAN_PUHEMERKITYKSET,LIVIAN_TUNTEET,aloitaLivianOdotus,ilmoitaLivianPuheEle,ilmoitaLivianTunne,livianAiheEle,livianPuheeleenTiedot,livianTunnetaginTiedot,livianLuentareaktionTiedot,seuraaLivianKuuntelua,kuunteleLivianTilanteita} from '../js/livia-tilanteet.js';
import {livianNostoAsettelu} from '../js/livia-nostotila.js';
test('pitkän odotuksen raja vastaa chatin kuuden sekunnin rajaa',()=>assert.equal(LIVIAN_PITKAN_ODOTUKSEN_VIIVE,6000));
test('odotuksen lopetus paljastaa saman tokenin tuottajalle ja pysyy idempotenttina',t=>{
 const calls=[],off=kuunteleLivianTilanteita((laji,tiedot)=>calls.push({laji,...tiedot}));t.after(off);
 const lopeta=aloitaLivianOdotus({lahde:'kysymys'});assert.ok(lopeta.tunnus);assert.equal(calls[0].tunnus,lopeta.tunnus);
 lopeta();lopeta();assert.deepEqual(calls.map(x=>x.laji),['waiting','waitingEnd']);assert.equal(calls[1].tunnus,lopeta.tunnus);
});
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
 assert.equal(livianTunnetaginTiedot({tunne:'selittaa',voimakkuus:.45}),null,'selittäminen ei ole tunne- tai TTS-tagi');
 assert.equal(livianTunnetaginTiedot({tunne:'tuntematon',voimakkuus:.4}),null);
 assert.equal(livianTunnetaginTiedot({tunne:'ilo',voimakkuus:'paljon'}),null);
 const calls=[],off=kuunteleLivianTilanteita((...x)=>calls.push(x));t.after(off);
 assert.deepEqual(ilmoitaLivianTunne({tunne:'ilo',voimakkuus:.7},{lahde:'koe',teksti:'ei kuulu tagiin'}),{tunne:'ilo',voimakkuus:.7,ele:'grin'});
 assert.equal(calls[0][0],'emotion');assert.equal(calls[0][1].lahde,'koe');assert.equal(calls[0][1].ele,'grin');
});
test('semanttinen puhemerkitys valitsee teknisen eleen erillään TTS-tageista',t=>{
 assert.deepEqual(LIVIAN_PUHEMERKITYKSET,{selittaa:'cityExplain',utelias:'lookUp',lammin:'smile',ilo:'grin',miettiva:'think',rakkaus:'love',hammentynyt:'confused'});
 assert.deepEqual(livianPuheeleenTiedot({tarkoitus:' SELITTAA ',voimakkuus:.45}),{tarkoitus:'selittaa',voimakkuus:.45,ele:'cityExplain'});
 assert.deepEqual(livianPuheeleenTiedot({tarkoitus:'rakkaus',voimakkuus:.8}),{tarkoitus:'rakkaus',voimakkuus:.8,ele:'love'});
 assert.equal(livianPuheeleenTiedot({tarkoitus:'[excited]',voimakkuus:.5}),null);
 assert.equal(livianPuheeleenTiedot({tarkoitus:'toString',voimakkuus:.5}),null);
 const calls=[],puheTunnus={};const off=kuunteleLivianTilanteita((...x)=>calls.push(x));t.after(off);
 assert.deepEqual(ilmoitaLivianPuheEle({tarkoitus:'selittaa',voimakkuus:.6},{tunnus:'marseille.pulu.1',puheTunnus}),{tarkoitus:'selittaa',voimakkuus:.6,ele:'cityExplain'});
 assert.equal(calls[0][0],'speechCue');assert.equal(calls[0][1].tunnus,'marseille.pulu.1');assert.equal(calls[0][1].puheTunnus,puheTunnus);
});
test('luentareaktion semantiikka ja voimakkuus erottavat hymyn, virneen ja naurun',()=>{
 for(const [tarkoitus,voimakkuus,ele]of [['myotailee',.3,'nod'],['epailee',.5,'shake'],['torjuu',.7,'shake'],['huvittuu',.35,'smile'],['huvittuu',.45,'grin'],['huvittuu',.6,'chuckle'],['hammastyy',.4,'doubleTake'],['hammastyy',.8,'disbelief'],['vakavoituu',.5,'listen']]){
  assert.deepEqual(livianLuentareaktionTiedot({tarkoitus,voimakkuus}),{ele,voimakkuus});
 }
 for(const tarkoitus of ['tuntematon','toString','__proto__'])assert.equal(livianLuentareaktionTiedot({tarkoitus,voimakkuus:.5}),null);
 for(const voimakkuus of [undefined,null,0,-1,'0.5',NaN,Infinity])assert.equal(livianLuentareaktionTiedot({tarkoitus:'huvittuu',voimakkuus}),null);
 assert.equal(livianLuentareaktionTiedot({tarkoitus:'huvittuu',voimakkuus:9}).voimakkuus,1);
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
test('lyhyt tauko ja puskurointi palauttavat kuuntelun heti, eivät monista playing-elettä',t=>{
 const a=new EventTarget();a.currentTime=0;a.paused=false;const calls=[];
 const off=kuunteleLivianTilanteita((...x)=>calls.push(x));t.after(off);
 const stop=seuraaLivianKuuntelua(a,()=>true);t.after(stop);
 a.dispatchEvent(new Event('playing'));
 for(const event of ['pause','waiting','stalled']){
  a.currentTime+=1;a.dispatchEvent(new Event(event));
  assert.equal(calls.at(-1)[0],'narrationEnd');
  a.dispatchEvent(new Event('playing'));assert.equal(calls.at(-1)[0],'narration');
  const count=calls.length;a.dispatchEvent(new Event('playing'));assert.equal(calls.length,count);
 }
 a.dispatchEvent(new Event('ended'));const count=calls.length;
 a.dispatchEvent(new Event('playing'));assert.equal(calls.length,count);
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
test('isoisän luenta ei vaihda laseihin tai tekstin avainsanojen tunne-eleisiin',t=>{
 const a=new EventTarget();a.currentTime=0;a.paused=false;const calls=[];
 const off=kuunteleLivianTilanteita((kind,s)=>{if(kind==='narration')calls.push(s);});t.after(off);
 const stop=seuraaLivianKuuntelua(a,()=>true,()=> 'Leipä, rakkaus ja kuolema',{lahde:'matkakirja'});t.after(stop);
 a.dispatchEvent(new Event('playing'));
 for(const time of [12,24,36,48]){a.currentTime=time;a.dispatchEvent(new Event('timeupdate'));}
 assert.deepEqual(calls.map(x=>x.ele),['lookUp','nod','nod','nod','nod']);
 assert.ok(calls.every(x=>x.lahde==='matkakirja'));
});
test('asynkronisen kohdistuksen tila välittyy heti oikeasta soitintapahtumasta, ei latauksen seinäkellosta',t=>{
 const a=new EventTarget();a.currentTime=0;a.paused=false;let valmis=false,rikki=false;const calls=[];
 const off=kuunteleLivianTilanteita((kind,data)=>calls.push({kind,data}));t.after(off);
 const stop=seuraaLivianKuuntelua(a,()=>true,()=>'',{lahde:'matkakirja',reaktiotAjastettu:()=>{if(rikki)throw Error('metadata');return valmis;}});t.after(stop);
 a.dispatchEvent(new Event('playing'));assert.equal(calls.at(-1).data.reaktiotAjastettu,false);
 valmis=true;assert.equal(calls.length,1,'pelkkä latauksen valmistuminen ei esitä soittoa');
 a.currentTime=.3;a.dispatchEvent(new Event('timeupdate'));assert.equal(calls.at(-1).data.reaktiotAjastettu,true);assert.equal(calls.length,2);
 a.currentTime=.5;a.dispatchEvent(new Event('timeupdate'));assert.equal(calls.length,2,'muuttumaton tila ei monista tapahtumaa');
 rikki=true;a.currentTime=.7;a.dispatchEvent(new Event('timeupdate'));assert.equal(calls.at(-1).data.reaktiotAjastettu,false);
 a.paused=true;a.dispatchEvent(new Event('pause'));rikki=false;const n=calls.length;
 a.currentTime=.8;a.dispatchEvent(new Event('timeupdate'));assert.equal(calls.length,n,'tauko ei välitä reaktiotilaa');
 a.paused=false;a.dispatchEvent(new Event('playing'));assert.equal(calls.at(-1).data.reaktiotAjastettu,true);
 stop();const count=calls.length;a.dispatchEvent(new Event('playing'));assert.equal(calls.length,count);
});
for(const loppu of ['ended','matkakirja:luenta-loppu'])test(`${loppu}: luonnollinen loppu välittyy kerran ja irrottaa kaikki kuuntelijat`,t=>{
 const a=new EventTarget();a.paused=false;a.currentTime=29.26;const calls=[],listeners=new Set();
 const add=a.addEventListener.bind(a),remove=a.removeEventListener.bind(a);
 a.addEventListener=(n,f)=>{listeners.add(n);add(n,f);};a.removeEventListener=(n,f)=>{listeners.delete(n);remove(n,f);};
 const off=kuunteleLivianTilanteita((...x)=>calls.push(x));t.after(off);
 const stop=seuraaLivianKuuntelua(a,()=>true,()=>'',{lahde:'matkakirja'});t.after(stop);
 a.dispatchEvent(new Event('playing'));a.dispatchEvent(new Event(loppu));
 assert.deepEqual(calls.at(-1),['narrationEnd',{tunnus:a,luonnollinenLoppu:true}]);assert.equal(listeners.size,0);
 a.paused=true;for(const n of ['pause','ended','matkakirja:luenta-loppu','playing','timeupdate'])a.dispatchEvent(new Event(n));
 stop();assert.equal(calls.length,2,'autopause ja kaksoisloppu eivät katkaise jälkielettä');
});
for(const tapa of ['pause','waiting','stalled','error','emptied','purku','vanha'])test(`${tapa}: ei luonnollisen lopun poikkeusta edes loppurajalla`,t=>{
 const a=new EventTarget();a.paused=false;a.currentTime=29.279;a.duration=29.280;let valid=true;const calls=[];
 const off=kuunteleLivianTilanteita((...x)=>calls.push(x));t.after(off);
 const stop=seuraaLivianKuuntelua(a,()=>valid);t.after(stop);a.dispatchEvent(new Event('playing'));
 if(tapa==='purku')stop();else if(tapa==='vanha'){valid=false;a.dispatchEvent(new Event('ended'));}else a.dispatchEvent(new Event(tapa));
 assert.deepEqual(calls.at(-1),['narrationEnd',{tunnus:a}]);
 if(['pause','waiting','stalled','error'].includes(tapa)){a.dispatchEvent(new Event('ended'));assert.equal(calls.length,2);}
});
