import test from 'node:test';
import assert from 'node:assert/strict';
import {LIVIA_SVG_ELEET,livianSvgAsento,livianSvgKuva,livianSvgMalli,livianEleenVoima} from '../js/livia-svg.js';

test('kaikki nykyiset eleet piirtyvät kokonaisella SVG-pululla ilman virheellisiä koordinaatteja',()=>{
 assert.equal(LIVIA_SVG_ELEET.length,65);
 for(const e of LIVIA_SVG_ELEET)for(const p of [0,.1,.25,.43,.6,.8,.95,1]){
  const s=livianSvgAsento(e.id,p),svg=livianSvgKuva(s,{right:42,prefix:'qa'});
  assert.match(svg,/^<svg /);assert.doesNotMatch(svg,/NaN|Infinity|undefined|<image|<canvas/);
  if(livianSvgMalli(s,{right:42}).visible)assert.match(svg,/data-part="whole-bird"/);
 }
});
test('pullariemu näyttää kiljahduksen, kolme pienenevää haukkua ja tyytyväisen pureskelun',()=>{
 const ele=LIVIA_SVG_ELEET.find(e=>e.id==='bunFeast');
 assert.equal(ele.duration,4600);
 const alku=livianSvgKuva(livianSvgAsento('bunFeast',0));
 const kiljahdus=livianSvgAsento('bunFeast',.1),hyppy=livianSvgMalli(kiljahdus);
 assert.equal(kiljahdus.feast.phase,'squeal');assert.equal(kiljahdus.mouth,'talk');
 assert.equal(hyppy.wing,'spread');assert.ok(hyppy.y<302);
 for(const [p,bites] of [[.25,0],[.35,1],[.49,2],[.63,3]]){
  const s=livianSvgAsento('bunFeast',p),svg=livianSvgKuva(s,{prefix:'bunqa'});
  assert.equal(s.feast.bites,bites);assert.match(svg,new RegExp(`data-part="bun-feast" data-bites="${bites}"`));
  assert.doesNotMatch(svg,/NaN|Infinity|undefined/);
 }
 const chew=livianSvgAsento('bunFeast',.8),chewSvg=livianSvgKuva(chew);
 assert.equal(chew.feast.phase,'chew');assert.equal(chew.frame,'smile');
 assert.doesNotMatch(chewSvg,/data-part="bun-feast"|data-part="bun-crumb"/);
 const loppu=livianSvgKuva(livianSvgAsento('bunFeast',1));
 assert.doesNotMatch(alku,/data-part="bun-feast"|data-part="bun-crumb"/);
 assert.doesNotMatch(loppu,/data-part="bun-feast"|data-part="bun-crumb"/);
 assert.equal(livianSvgAsento('bunFeast',1).frame,'rest');
});
test('jokainen puremamaski poistaa aidosti uuden osan pullan sisältä',()=>{
 const svg=livianSvgKuva(livianSvgAsento('bunFeast',.65),{prefix:'biteqa'});
 const mask=svg.match(/<mask id="biteqabun-bites">(.*?)<\/mask>/)?.[1];assert.ok(mask);
 const cuts=[...mask.matchAll(/<circle cx="([\d.-]+)" cy="([\d.-]+)" r="([\d.-]+)"/g)].map(m=>m.slice(1).map(Number));
 assert.equal(cuts.length,3);
 for(let i=0;i<cuts.length;i++){
  const[x,y]=cuts[i];assert.ok((x/19)**2+(y/13)**2<1,'puraisun keskus osuu pullaan');
  assert.ok(cuts.slice(0,i).every(([a,b,r])=>Math.hypot(x-a,y-b)>r),'uusi puraisu ei jää aiempaan reikään');
 }
});

test('trailerin väistö poistuu ja varovainen paluu päätyy täsmälleen lepoankkuriin',()=>{
 const poissa=livianSvgMalli(livianSvgAsento('trailerFlee',1));assert.equal(poissa.visible,false);
 const alku=livianSvgMalli(livianSvgAsento('trailerBack',0)),loppu=livianSvgMalli(livianSvgAsento('trailerBack',1));
 assert.ok(alku.scale<.05);assert.equal(loppu.x,128);assert.equal(loppu.y,302);assert.equal(loppu.scale,.56);assert.ok(Math.abs(loppu.angle)<1e-9);
});
test('tietäväinen vastaus pitää lasit ja kirjan sekä kääntää sivua rauhallisesti',()=>{
 const alku=livianSvgAsento('bookStudy',.2),keskella=livianSvgAsento('bookStudy',.5),loppu=livianSvgAsento('bookStudy',.9);
 assert.equal(keskella.glasses,1);assert.equal(keskella.frame,'smug');assert.ok(keskella.pageTurn>alku.pageTurn&&keskella.pageTurn>loppu.pageTurn);
 assert.match(livianSvgKuva(keskella),/data-part="book"/);
});
test('kiireinen ensiliito jatkuu ilman laskuhyppyä ja ottaa kaksi haparoivaa askelta',()=>{
 const pohja=livianSvgAsento('glideIn',0),ennen=livianSvgMalli({...pohja,flight:{kind:'opening',t:.7799}}),jalkeen=livianSvgMalli({...pohja,flight:{kind:'opening',t:.7801}});
 assert.ok(Math.abs(ennen.y-jalkeen.y)<1,'laskukaaren rajalla ei hypätä');
 const a=livianSvgMalli(livianSvgAsento('glideIn',.80)),b=livianSvgMalli(livianSvgAsento('glideIn',.86));
 assert.equal(a.walking,true);assert.notEqual(Math.sign(a.step),Math.sign(b.step));
 const loppu=livianSvgMalli(livianSvgAsento('glideIn',1));assert.equal(loppu.y,302);assert.ok(Math.abs(loppu.angle)<1e-9);
});
test('yläviistoon katselu nostaa vasemmalle osoittavan nokan, lasit käyvät otsalla ja palaavat',()=>{
 const svg=livianSvgKuva({...livianSvgAsento('blink',0),gazeUp:true});
 assert.match(svg,/data-gaze="up-left" transform="rotate\(18 57 74\)"/);
 assert.doesNotMatch(svg,/data-part="glasses"/);
 for(const p of [0,.2,.5,.8,1])assert.equal(livianSvgAsento('eyeRub',p).glasses,1);
 assert.equal(livianSvgAsento('eyeRub',0).glassesLift,0);
 assert.equal(livianSvgAsento('eyeRub',.5).glassesLift,22);
 assert.equal(livianSvgAsento('eyeRub',1).glassesLift,0);
 assert.match(livianSvgKuva(livianSvgAsento('eyeRub',.5)),/data-part="rubEyes"/);
 assert.match(livianSvgKuva(livianSvgAsento('eyeRub',.5)),/data-part="glasses"[^>]+translate\(0 -22\)/);
});
test('voimakas tunne tuo päätä lähemmäs; jalat ja liikkumisen mittasuhteet säilyvät',()=>{
 const low=livianSvgMalli(livianSvgAsento('angry',.45,{voimakkuus:.2}));
 const high=livianSvgMalli(livianSvgAsento('angry',.45,{voimakkuus:1}));
 assert.ok(high.headScale>low.headScale);assert.ok(high.lean>low.lean);
 assert.ok(Math.abs(high.bodyLean)>Math.abs(low.bodyLean));
 assert.equal(high.scale,low.scale);assert.equal(high.y,low.y);
 assert.ok(high.wingAmount>low.wingAmount);
 for(const id of ['flyAway','flyBack','clumsyLand','glassCrash','walkRight','walkBack','talk']){
  assert.equal(livianSvgMalli(livianSvgAsento(id,.45,{voimakkuus:1})).headScale,1,id);
 }
 assert.equal(livianSvgMalli(livianSvgAsento('angry',1,{voimakkuus:1})).headScale,1);
});
test('oikealle poistuminen saavuttaa näytön reunan ja paluu jatkuu samassa hahmossa',()=>{
 for(const right of [24,42,120]){
  for(const id of ['walkRight','leaveRight']){
   const away=livianSvgMalli(livianSvgAsento(id,1),{right});
   assert.ok(away.x>152+right,id);assert.equal(away.visible,false,id);
  }
  const back=livianSvgMalli(livianSvgAsento('walkBack',1),{right});
  assert.equal(back.visible,true);assert.equal(back.x,128);
 }
 assert.equal(livianSvgMalli(livianSvgAsento('flyAway',1)).visible,false);
 assert.equal(livianSvgMalli(livianSvgAsento('flyBack',1)).visible,true);
});
test('kasvopuhe säilyttää tunnetilan silmissä ja voimakkuus pysyy rajattuna',()=>{
 const s=livianSvgAsento('angry',.43),before=livianSvgKuva(s),talk=livianSvgKuva({...s,mouth:'talk'});
 assert.notEqual(before,talk);assert.equal(s.frame,'angry');
 assert.equal(livianEleenVoima('shock','KÄÄK!!!'),1);
 assert.equal(livianSvgAsento('shock',.4,{voimakkuus:99}).voimakkuus,1);
 assert.equal(livianSvgAsento('shock',.4,{voimakkuus:NaN}).voimakkuus,0);
});
test('naurun voima muuttaa pientä päänliikettä, ei jalkojen ankkuria tai lentoa',()=>{
 const a=livianSvgAsento('chuckle',.4,{voimakkuus:.2}),b=livianSvgAsento('chuckle',.4,{voimakkuus:.8});
 assert.equal(a.frame,'grin');assert.equal(b.frame,'grin');assert.ok(Math.abs(b.y)>Math.abs(a.y));
 assert.equal(livianSvgMalli(a).y,livianSvgMalli(b).y);assert.equal(livianSvgMalli(b).flight,false);
 assert.equal(livianSvgAsento('chuckle',1).frame,'rest');
});

 test('poislento kääntää koko linnun kohti oikeaa yläkulmaa, paluu takaisin',()=>{
 for(const p of [.08,.2,.5,.85])assert.equal(livianSvgMalli(livianSvgAsento('flyAway',p)).mirror,true);
 assert.equal(Boolean(livianSvgMalli(livianSvgAsento('flyBack',.3)).mirror),false);
 });
