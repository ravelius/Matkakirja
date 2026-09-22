import test from 'node:test';
import assert from 'node:assert/strict';
import {LIVIA_SVG_ELEET} from '../js/livia-svg.js';
import {livianSvgPaa} from '../js/livia-svg-paa.js';
import {LIVIAN_UUDET_VERSIOT,uudenEleenAsento,uudenEleenKuva} from '../docs/livia-uudet-versiot.mjs';

test('kasvopohjien polut vastaavat toisiaan myös tuotantopään muuttuessa',()=>{
  const topologia=frame=>[...livianSvgPaa({frame},{prefix:'koe'}).replace(/<path data-part="smile"[^>]*\/>/,'')
    .matchAll(/\b(d|transform|cx|cy|rx|ry|x|y)="([^"]*)"/g)]
    .map(m=>[m[1],m[2].replace(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi,'#')]);
  for(const ilme of ['glance','down','shock','blink','smile'])assert.deepEqual(topologia(ilme),topologia('rest'),ilme);
});

test('neljä katseluehdotusta pysyvät erillään pelieleistä ja kestävät kelauksen',()=>{
  const perus=LIVIA_SVG_ELEET.map(e=>e.id);
  for(const e of LIVIAN_UUDET_VERSIOT){
    assert.ok(!perus.includes(e.id)&&perus.includes(e.baseId));
    const asento=p=>uudenEleenAsento(e.id,p);
    for(const p of [0,.45,1,.23,.001,.999,.68]){
      const s=asento(p),kuva=uudenEleenKuva(s,{prefix:'koe'});
      assert.deepEqual(s,asento(p),'ei historiaan tai sattumaan perustuvaa asentoa');
      assert.doesNotMatch(kuva,/NaN|Infinity|undefined/);
      const ids=[...kuva.matchAll(/ id="([^"]+)"/g)].map(m=>m[1]);
      assert.equal(new Set(ids).size,ids.length);
      for(const m of kuva.matchAll(/url\(#([^)]+)\)/g))assert.ok(ids.includes(m[1]),m[1]);
      assert.ok(ids.every(id=>id.startsWith('koe')));
    }
    for(const k of ['paaKulma','paaY','paaX','rinta','siipi','takasiipi','rapaytys','ilme'])assert.equal(asento(0)[k],asento(1)[k],e.id+' '+k);
    const jalat=p=>uudenEleenKuva(asento(p)).match(/<g data-part="feet">.*?<\/g>/)[0];
    assert.equal(jalat(0),jalat(.45),'jalkojen ankkurit pysyvät maassa');
  }
});

test('nyökkäyksellä on valmistelu, nopea painotus ja pienempi toinen nyökkäys',()=>{
  const a=p=>uudenEleenAsento('uusi-nod',p).paaKulma;
  assert.ok(a(.15)>0&&a(.245)<-20,'suunnan vastainen valmistelu ja selvä painotus');
  assert.ok(Math.abs(a(.53))<Math.abs(a(.245))*.7,'vahvistus on ensimmäistä pienempi');
  const nopeus=p=>Math.abs(a(p+.001)-a(p-.001))/.002;
  assert.ok(nopeus(.20)>nopeus(.67)*2,'painotus on palautumista nopeampi');
  let suurinAskel=0;
  for(let i=1;i<=2100;i++)suurinAskel=Math.max(suurinAskel,Math.abs(a(i/2100)-a((i-1)/2100)));
  assert.ok(suurinAskel<.4,'ei hyppiviä asentoja edes nopean painotuksen aikana');
});

test('havahtuminen pysähtyy, tervehdys seuraa viiveellä ja sivu kääntyy kerran',()=>{
  const a=(id,p)=>uudenEleenAsento('uusi-'+id,p);
  assert.equal(a('doubleTake',.18).paaX,a('doubleTake',.23).paaX,'ensivilkaisu pysyy ennen toista reaktiota');
  assert.ok(a('doubleTake',.40).paaY<a('doubleTake',.24).paaY-5);
  assert.ok(a('welcome',.20).siipi>a('welcome',.20).takasiipi*2,'siivet eivät aukea samana robottieleenä');
  assert.ok(a('welcome',.60).siipi>.5&&a('welcome',1).siipi===0);
  let edellinen=0;
  for(let i=0;i<=100;i++){
    const s=a('bookStudy',i/100);
    assert.ok(s.sivu>=edellinen-1e-8,'paperi etenee eikä toista samaa kääntöä');edellinen=s.sivu;
  }
  assert.equal(a('bookStudy',.4).sivu,0);
  assert.ok(a('bookStudy',.60).sivu>.98);
});
