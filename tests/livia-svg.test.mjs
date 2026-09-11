import test from 'node:test';
import assert from 'node:assert/strict';
import {LIVIA_SVG_ELEET,livianSvgAsento,livianSvgKuva,livianSvgMalli,livianEleenVoima} from '../js/livia-svg.js';

test('kaikki nykyiset eleet piirtyvät kokonaisella SVG-pululla ilman virheellisiä koordinaatteja',()=>{
 assert.equal(LIVIA_SVG_ELEET.length,69);
 for(const e of LIVIA_SVG_ELEET)for(const p of [0,.1,.25,.43,.6,.8,.95,1]){
  const s=livianSvgAsento(e.id,p),svg=livianSvgKuva(s,{right:42,prefix:'qa'});
  assert.match(svg,/^<svg /);assert.doesNotMatch(svg,/NaN|Infinity|undefined|<image|<canvas/);
  if(livianSvgMalli(s,{right:42}).visible)assert.match(svg,/data-part="whole-bird"/);
 }
});
test('kartan pinnan nokkiminen tekee kaksi erillistä lempeää nokkaisua jalat paikallaan',()=>{
 const ele=LIVIA_SVG_ELEET.find(e=>e.id==='mapPeck');
 assert.equal(ele?.duration,2500);
 const samples=[0,.12,.27,.42,.47,.52,.67,.82,1].map(p=>livianSvgAsento('mapPeck',p));
 const models=samples.map(s=>livianSvgMalli(s));
 assert.equal(samples[2].mapPeck.peck,1);assert.equal(samples[6].mapPeck.peck,2);
 assert.ok(samples[2].mapPeck.amount>.99);assert.ok(samples[6].mapPeck.amount>.84);
 assert.equal(samples[4].mapPeck.amount,0,'nokkaisujen välissä pää käy selvästi ylhäällä');
 // Nokankarki on paa-SVG:ssa (19,68). Down-ilmeen oma +8 asteen kierto
 // tapahtuu ensin pisteen (57,74) ympäri, sitten sisempi translate/scale,
 // ulompi pään kierto pisteen (105,146) ympäri ja lopuksi koko linnun skaala.
 const beakWorldY=m=>{
  const rad=d=>d*Math.PI/180,twist=rad(8),x0=19-57,y0=68-74;
  const x1=57+x0*Math.cos(twist)-y0*Math.sin(twist);
  const y1=74+x0*Math.sin(twist)+y0*Math.cos(twist);
  const x2=44+x1,y2=61+y1*.87,a=rad(m.headAngle),dx=x2-105,dy=y2-146;
  const y3=146+dx*Math.sin(a)+dy*Math.cos(a)+m.headY;
  return 302+.56*(y3-188);
 };
 assert.ok(models[2].headAngle<0&&Math.abs(beakWorldY(models[2])-300)<1.25&&beakWorldY(models[2])<301.5,'ensimmäinen nokka osuu kartan pintaan mutta ei sen alle');
 assert.ok(models[6].headAngle<0&&Math.abs(beakWorldY(models[6])-301)<.1,'toinenkin nokka osuu kartan pintaan');
 for(const i of [0,4,8]){
  assert.equal(models[i].x,128);assert.equal(models[i].y,302);assert.equal(models[i].scale,.56);
 }
 const svgs=samples.map(s=>livianSvgKuva(s,{prefix:'peckqa'}));
 const feet=svgs.map(svg=>svg.match(/<g data-part="feet">.*?<\/g>/)?.[0]);
 assert.ok(feet.every(markup=>markup===feet[0]),'jalkojen SVG-ankkurit eivät liiku');
 assert.match(svgs[2],/data-map-peck="1" data-map-peck-amount="1"/);
 assert.match(svgs[6],/data-map-peck="2" data-map-peck-amount="1"/);
 for(const svg of svgs)assert.doesNotMatch(svg,/NaN|Infinity|undefined|<image|<canvas/);
 const start=models[0],end=models[8];
 assert.deepEqual({x:end.x,y:end.y,headY:end.headY,headAngle:end.headAngle,bodyLean:end.bodyLean,face:end.face,wing:end.wing},
  {x:start.x,y:start.y,headY:start.headY,headAngle:start.headAngle,bodyLean:start.bodyLean,face:start.face,wing:start.wing});
});
test('chatin pikapyrähdyksillä on sovitut kestot ja vaakasuora vakioskaalainen rata',()=>{
 assert.equal(LIVIA_SVG_ELEET.find(e=>e.id==='chatDashOut')?.duration,300);
 assert.equal(LIVIA_SVG_ELEET.find(e=>e.id==='chatDashBack')?.duration,100);
 for(const right of [0,42,120]){
  const rest=livianSvgMalli(livianSvgAsento('chatDashOut',0),{right});
  const edge=livianSvgMalli(livianSvgAsento('chatDashOut',.55),{right});
  const backStart=livianSvgMalli(livianSvgAsento('chatDashBack',0),{right});
  const backEnd=livianSvgMalli(livianSvgAsento('chatDashBack',1),{right});
  assert.equal(rest.x,128);assert.equal(rest.y,302);assert.equal(rest.scale,.56);
  assert.equal(edge.x,128+right+96);assert.ok(edge.x>152+right);assert.equal(edge.visible,false);
  assert.equal(backStart.x,edge.x);assert.equal(backStart.visible,false);
  assert.equal(backEnd.x,128);assert.equal(backEnd.y,302);assert.equal(backEnd.scale,.56);
  assert.equal(backEnd.angle,0);assert.equal(backEnd.visible,true);assert.equal(Boolean(backEnd.mirror),false);
  assert.equal(backEnd.wing,'fold');assert.equal(backEnd.wingAmount,0);
 }
});
test('chatin pölyjen ravistelu pysyy lepoankkurissa, jättää kasvot puheelle ja päättyy neutraalina',()=>{
 assert.equal(LIVIA_SVG_ELEET.find(e=>e.id==='chatDustOff')?.duration,1400);
 const s=livianSvgAsento('chatDustOff',.45),m=livianSvgMalli({...s,mouth:'talk'});
 assert.equal(m.x,128);assert.equal(m.y,302);assert.equal(m.scale,.56);assert.equal(m.face,s.frame);
 assert.equal(m.wing,'spread');assert.match(livianSvgKuva({...s,mouth:'talk'}),/data-part="chat-dust"/);
 assert.match(livianSvgKuva({...s,mouth:'talk'}),/data-part="chat-dust-speck"/);
 const end=livianSvgMalli(livianSvgAsento('chatDustOff',1));
 assert.equal(end.x,128);assert.equal(end.y,302);assert.equal(end.angle,0);assert.equal(end.wing,'fold');
 assert.doesNotMatch(livianSvgKuva(livianSvgAsento('chatDustOff',1)),/data-part="chat-dust"/);
});
test('chatista poistumisen vauhtipilvi jää lähtökohtaan ja häipyy linnusta riippumatta',()=>{
 const middle=livianSvgKuva(livianSvgAsento('chatDashOut',.4),{right:80,prefix:'dashqa'});
 const birdGone=livianSvgKuva(livianSvgAsento('chatDashOut',.7),{right:80,prefix:'dashqa'});
 assert.match(middle,/data-part-chat-dash="chatDashOut"/);
 assert.match(middle,/data-part="chat-speed-cloud" transform="translate\(128 302\)"/);
 assert.match(middle,/data-part="chat-dash-streak"/);
 assert.doesNotMatch(birdGone,/data-part="whole-bird"/);
 assert.match(birdGone,/data-part="chat-speed-cloud"/);
 for(const id of ['chatDashOut','chatDashBack'])for(const p of [0,.11,.4,.55,.8,1]){
  assert.doesNotMatch(livianSvgKuva(livianSvgAsento(id,p),{right:120}),/NaN|Infinity|undefined/);
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
test('karttaleijunta on nollakorkeudella täsmälleen lepoasento',()=>{
 const rest=livianSvgAsento('blink',0);
 assert.deepEqual(livianSvgMalli({...rest,mapHover:{height:0,phase:12}}),livianSvgMalli(rest));
 assert.equal(livianSvgKuva({...rest,mapHover:{height:0,phase:12}}),livianSvgKuva(rest));
 assert.doesNotMatch(livianSvgKuva({...rest,mapHover:{height:0,phase:12}}),/data-map-hover/);
});
test('karttaleijunta nostaa Pulua ja liikuttaa siipiä pehmeästi vaiheen mukana',()=>{
 const rest=livianSvgAsento('blink',0),ground=livianSvgMalli(rest);
 const low=livianSvgMalli({...rest,mapHover:{height:.5,phase:0}});
 const high=livianSvgMalli({...rest,mapHover:{height:1,phase:0}});
 assert.equal(low.y,ground.y-6);assert.equal(high.y,ground.y-12);
 assert.equal(high.wing,'flap');assert.notEqual(high.wingAmount,livianSvgMalli({...rest,mapHover:{height:1,phase:Math.PI/2}}).wingAmount);
 assert.match(livianSvgKuva({...rest,mapHover:{height:1,phase:0}}),/data-map-hover="1"/);
});
test('karttaleijunta vetää jalat sisään korkeuden mukana',()=>{
 const rest=livianSvgKuva(livianSvgAsento('blink',0));
 const hover=livianSvgKuva({...livianSvgAsento('blink',0),mapHover:{height:1,phase:0}});
 assert.doesNotMatch(rest,/data-hover-tuck/);assert.match(hover,/data-part="feet" data-hover-tuck="1"/);
 assert.match(rest,/M99 177l-1 8/);assert.match(hover,/M99 174l-1 3/);
});
test('karttaleijunnan kosketusvarjo pysyy maassa mutta pienenee ja haalistuu',()=>{
 const rest=livianSvgAsento('blink',0),hover={...rest,mapHover:{height:1,phase:Math.PI/2}};
 const restSvg=livianSvgKuva(rest,{prefix:'shadowqa'}),hoverSvg=livianSvgKuva(hover,{prefix:'shadowqa'});
 assert.match(restSvg,/data-part="ground-shadow" cx="128" cy="301" rx="19" ry="2.8"[^>]+opacity="1"/);
 assert.match(hoverSvg,/data-part="ground-shadow" cx="128" cy="301" rx="10.45" ry="2.8"[^>]+opacity="0.35"/);
 assert.equal(livianSvgMalli(hover).y,288);
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
