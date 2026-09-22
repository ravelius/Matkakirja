import test from 'node:test';
import assert from 'node:assert/strict';
import { LIVIA_SVG_ELEET, livianSvgAsento, livianSvgMalli, livianSvgKuva, livianEleMuunnelma, LIVIAN_KARTTAPALUUT, livianKarttavaistonAsento } from '../js/livia-svg.js';
import { livianRepliikinEle, valitseLivianTaustaEle } from '../js/livia-eleet.js';

const asento=(id,p,asetukset={})=>livianSvgMalli(livianSvgAsento(id,p,asetukset));
test('viisi karttapaluuta näyttää ensin vain pään, liittyy kurkistukseen ja päättyy kotiin',()=>{
 assert.equal(LIVIAN_KARTTAPALUUT.length,5);
 const keskipisteet=new Set();
 for(let i=0;i<5;i++)for(const right of [0,44,90]){
  const pose=(vaihe,p)=>livianKarttavaistonAsento(vaihe,p,i);
  const model=(vaihe,p)=>livianSvgMalli(pose(vaihe,p),{right});
  const kurkistus=livianSvgKuva(pose('kurkistaa',.9),{right});
  assert.match(kurkistus,/data-part="head"/);assert.doesNotMatch(kurkistus,/data-part="feet"|data-part="near-wing"|ground-shadow/);
  assert.doesNotMatch(livianSvgKuva(pose('piilossa',1)),/data-part="whole-bird"|ground-shadow/);
  const ennen=model('kurkistaa',1),jalkeen=model('palaa',0),loppu=model('palaa',1);
  assert.equal(ennen.x,jalkeen.x);assert.equal(ennen.y,jalkeen.y);
  assert.equal(loppu.x,128);assert.equal(loppu.y,302);assert.equal(loppu.angle,0);assert.equal(loppu.wing,'fold');
  keskipisteet.add(model('palaa',.5).y);
  for(const vaihe of ['poistuu','kurkistaa','palaa'])for(let j=0;j<=100;j++){
   const m=model(vaihe,j/100);for(const k of ['x','y','angle','headAngle','scale'])assert.ok(Number.isFinite(m[k]));
  }
 }
 assert.equal(keskipisteet.size,5,'paluut eroavat myös radaltaan, eivät vain nimeltään');
});
test('nyökkäys valmistautuu vastasuuntaan, iskee nopeasti ja vaimentaa toisen nyökkäyksen',()=>{
 assert.ok(asento('nod',.13).headY<0);
 assert.ok(asento('nod',.23).headY>asento('nod',.57).headY);
 const liike=(a,b)=>Math.abs(asento('nod',b).headY-asento('nod',a).headY)/(b-a);
 assert.ok(liike(.16,.21)>4*liike(.42,.47),'pääliike on aidosti nopeampi kuin rauhallinen väli');
 assert.equal(asento('nod',0).headY,asento('nod',1).headY);
 for(let i=1;i<=500;i++)assert.ok(Math.abs(asento('nod',i/500).headY-asento('nod',(i-1)/500).headY)<.2,'SVG:n pää ei hyppää pikseliasennosta toiseen');
});
test('siipi nousee asteittain ja palautus on nostoa rauhallisempi',()=>{
 const opt={cueKestoMs:1500};
 const alku=asento('cityExplain',.15,opt),kesken=asento('cityExplain',.18,opt),koholla=asento('cityExplain',.24,opt);
 assert.ok(alku.wingLift<kesken.wingLift&&kesken.wingLift<koholla.wingLift);
 assert.equal(koholla.wingLift,1);
 assert.ok(asento('cityExplain',.75,opt).wingLift>0,'palautus hengittää eikä napsahda');
 assert.match(livianSvgKuva(livianSvgAsento('cityExplain',.18,opt)),/data-wing-lift="0\./);
});
test('nokkaisun huippu ja jalat säilyvät mutta lähestyminen nopeutuu lopussa',()=>{
 const amount=p=>livianSvgAsento('mapPeck',p).mapPeck.amount;
 assert.equal(amount(.27),1);assert.equal(amount(.67),1);
 assert.ok((amount(.26)-amount(.23))>4*(amount(.19)-amount(.16)));
 for(const p of [0,.15,.26,.3,.42,.63,.67,.82,1])assert.equal(asento('mapPeck',p).y,302);
});
test('selityksen kolme tapaa säilyttävät tunnetilan, keston ja liikealueen',()=>{
 for(const cueKestoMs of [1500,6200]){
  const tavat=[0,1,2].map(muunnelma=>asento('cityExplain',.35,{cueKestoMs,muunnelma}));
  assert.equal(tavat[0].wing,'point');assert.equal(tavat[1].wing,'shrug');assert.equal(tavat[2].wing,'point');
  assert.ok(tavat[2].wingAmount<tavat[0].wingAmount);
  assert.ok(tavat.every(m=>m.x===tavat[0].x&&m.face===tavat[0].face));
  for(const muunnelma of [0,1,2])assert.equal(
   livianSvgKuva(livianSvgAsento('cityExplain',0,{cueKestoMs,muunnelma})),
   livianSvgKuva(livianSvgAsento('cityExplain',1,{cueKestoMs,muunnelma})));
 }
 const tunnukset=Array.from({length:45},(_,i)=>`kaupunki-${i}|c1`);
 assert.equal(new Set(tunnukset.map(livianEleMuunnelma)).size,3);
 assert.equal(livianEleMuunnelma('berliini|c1'),livianEleMuunnelma('berliini|c1'));
});
test('tausta välttää kolmea viime elettä eikä lainaa tunne- tai törmäystemppuja',()=>{
 const historia=[];
 for(let i=0;i<80;i++){
  const ele=valitseLivianTaustaEle(historia,(i%7)/7);
  assert.ok(!historia.includes(ele));
  assert.ok(['blink','turn','preen','glance','tilt','lookUp','lookDown','mapPeck'].includes(ele));
  historia.push(ele);if(historia.length>3)historia.shift();
 }
 assert.equal(livianRepliikinEle('Voi minua, se oli minun vikani.'),'facepalm');
 assert.equal(livianRepliikinEle('Anteeksi, en huomannut.'),'embarrassed');
});
test('kaikki 70 elettä pysyvät kelattavina ja äärellisinä kaikilla muunnelmilla',()=>{
 for(const e of LIVIA_SVG_ELEET)for(const muunnelma of [0,1,2])for(let i=0;i<=40;i++){
  const s=livianSvgAsento(e.id,i/40,{muunnelma,cueKestoMs:6200});
  const m=livianSvgMalli(s);
  for(const key of ['x','y','headY','headAngle','bodyLean','scale','wingAmount'])assert.ok(Number.isFinite(m[key]),`${e.id} ${key}`);
  assert.deepEqual(s,livianSvgAsento(e.id,i/40,{muunnelma,cueKestoMs:6200}),'piirto ei riipu aiemmista kehyksistä');
 }
});
