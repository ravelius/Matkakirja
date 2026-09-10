import test from 'node:test';
import assert from 'node:assert/strict';
import {LIVIA_SVG_ELEET,livianSvgAsento,livianSvgKuva,livianSvgMalli,livianEleenVoima} from '../js/livia-svg.js';

test('kaikki nykyiset eleet piirtyvät kokonaisella SVG-pululla ilman virheellisiä koordinaatteja',()=>{
 assert.equal(LIVIA_SVG_ELEET.length,57);
 for(const e of LIVIA_SVG_ELEET)for(const p of [0,.1,.25,.43,.6,.8,.95,1]){
  const s=livianSvgAsento(e.id,p),svg=livianSvgKuva(s,{right:42,prefix:'qa'});
  assert.match(svg,/^<svg /);assert.doesNotMatch(svg,/NaN|Infinity|undefined|<image|<canvas/);
  if(livianSvgMalli(s,{right:42}).visible)assert.match(svg,/data-part="whole-bird"/);
 }
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

 test('poislento kääntää koko linnun kohti oikeaa yläkulmaa, paluu takaisin',()=>{
 for(const p of [.08,.2,.5,.85])assert.equal(livianSvgMalli(livianSvgAsento('flyAway',p)).mirror,true);
 assert.equal(Boolean(livianSvgMalli(livianSvgAsento('flyBack',.3)).mirror),false);
 });
