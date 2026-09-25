import test from 'node:test';import assert from 'node:assert/strict';
import{LIVIA_ELEAANI_TYYPIT,livianEleaaniNaytteet,livianEleaaniIskut}from'../js/livia-tehosteet.js';
import{LIVIA_PIX_ELEET}from'../js/livia-pikselit.js';
test('eleäänet ovat lyhyitä, vaimeita ja napsahtamatta päättyviä',()=>{
 for(const kind of LIVIA_ELEAANI_TYYPIT){const a=livianEleaaniNaytteet(kind,22050);
  assert.ok(a.length>0&&a.length<22050*.3);assert.ok(a.some(x=>Math.abs(x)>.001));
  assert.ok(a.every(x=>Number.isFinite(x)&&Math.abs(x)<.25));assert.equal(a[0],0);assert.ok(Math.abs(a.at(-1))<.00001);
 }
 for(const clip of LIVIA_PIX_ELEET){let previous=-1;for(const cue of livianEleaaniIskut(clip.id)){assert.ok(cue.at>previous&&cue.at<1);previous=cue.at;assert.ok(LIVIA_ELEAANI_TYYPIT.includes(cue.kind));assert.ok(cue.level>0&&cue.level<=.7);}}
 for(const id of ['blink','glance','bored','talk','listen','sleep'])assert.deepEqual(livianEleaaniIskut(id),[]);
});
