import test from 'node:test';
import assert from 'node:assert/strict';
import {LIVIA_SVG_ELEET} from '../js/livia-svg.js';
import {livianSvgPaa} from '../js/livia-svg-paa.js';
import {LIVIAN_UUDET_VERSIOT,uudenEleenAsento,uudenEleenKuva} from '../docs/livia-uudet-versiot.mjs';

test('kasvopohjien polut vastaavat toisiaan myös tuotantopään muuttuessa',()=>{
  const topologia=frame=>[...livianSvgPaa({frame},{prefix:'koe'}).replace(/<path data-part="smile"[^>]*\/>/,'')
    .matchAll(/\b(d|transform|cx|cy|rx|ry|x|y)="([^"]*)"/g)]
    .map(m=>[m[1],m[2].replace(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi,'#')]);
  for(const ilme of ['glance','down','shock','blink','smile','smug'])assert.deepEqual(topologia(ilme),topologia('rest'),ilme);
});

test('katseluehdotukset pysyvät erillään pelieleistä ja kestävät kelauksen',()=>{
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
    if(e.id!=='uusi-bookPanic')for(const k of ['paaKulma','paaY','paaX','rinta','siipi','takasiipi','rapaytys','ilme','suu'])assert.equal(asento(0)[k],asento(1)[k],e.id+' '+k);
    const jalat=p=>uudenEleenKuva(asento(p)).match(/<g data-part="feet">.*?<\/g>/)[0];
    assert.equal(jalat(0),jalat(.45),'jalkojen ankkurit pysyvät maassa');
  }
});

test('kiireinen kirjanhaku erottaa sähläyksen, havahtumisen, peittelyn ja ryhdin',()=>{
  const a=p=>uudenEleenAsento('uusi-bookPanic',p),svg=p=>uudenEleenKuva(a(p));
  assert.equal(a(0).kirjaKulma,180);
  assert.equal(a(.246).sivu,7,'seitsemän nopeaa sivunkääntöä alle 2,8 sekunnissa');
  assert.ok(a(.15).kyyry>.95&&a(.15).paaY>20,'alussa pää ja koko vartalo painuvat kyyryyn');
  assert.ok(a(.40).paaY<-14&&a(.40).kyyry===0,'kirjan sulkemisen jälkeen Pulu suoristuu pitkäksi');
  assert.equal(a(.25).sivu,a(.80).sivu,'havahtumisessa ja kirjan käännössä ei plärätä');
  assert.ok(a(.28).havahdus>.8&&a(.32).havahdus===0);
  assert.equal(a(.286).kirjaKiinni,0);
  assert.equal(a(.304).kirjaKiinni,1,'läimäys kestää alle 200 ms');
  assert.equal(a(.728).kirjaKiinni,1,'kirja pysyy kiinni koko hitaan käännön');
  assert.equal(a(.80).kirjaKiinni,0);
  assert.equal(a(.43).kirjaKulma,180);
  assert.equal(a(.69).kirjaKulma,360);
  assert.ok(a(.449).kirjaKulma<180,'ranteen pieni vastaliike ennen kääntöä');
  assert.equal(a(.531).kirjaKulma,a(.544).kirjaKulma,'lyhyt otteenvaihto pysäyttää kierron');
  assert.ok(a(.54).kirjaX>15&&a(.54).kirjaY<0&&a(.54).kirjaKallistus>.85,'kirja nousee rinnan luo ja kääntyy myös syvyyssuunnassa');
  assert.ok(a(.50).siipi>a(.546).siipi+.2,'siipi päästää otetta vaihdon ajaksi');
  assert.ok(a(.54).vihellys>.9&&a(.54).katse>.9,'katsoo sivuun ja viheltää käännön aikana');
  assert.match(svg(.155),/data-part="sweat"/);
  assert.doesNotMatch(svg(.45),/data-part="sweat"/);
  assert.match(svg(.56),/data-part="whistle"/);
  assert.match(svg(.31),/data-part="book-closed" opacity="1"/);
  assert.match(svg(.31),/data-part="book-slap"/);
  assert.equal(a(.80).lasikorjaus,0,'lasit oikaistaan vasta avatun kirjan jälkeen');
  assert.equal(a(.855).lasikorjaus,1);
  assert.match(svg(.855),/data-part="glasses-adjust" transform="translate\(0 -4\)/);
  assert.equal(a(1).lasikorjaus,0);
  assert.ok(a(1).ryhti>.7&&a(1).paaKulma>0&&a(1).paaY<0,'leuka nousee lopuksi arvokkaasti');
  assert.equal(a(1).siipi,0);assert.equal(a(1).vihellys,0);
  assert.doesNotMatch(svg(1),/data-part="sweat"|data-part="whistle"/);
  assert.match(svg(.1),/>ATLAS<\/text>/,'kannen epäsymmetrinen otsikko kertoo kirjan suunnan');
  for(let i=1;i<=1000;i++)assert.ok(Math.abs(a(i/1000).kirjaKulma-a((i-1)/1000).kirjaKulma)<4,'kirja kääntyy jatkuvasti eikä hyppää');
});

test('tervehdyksen linnunsuu avautuu yhtenä eleenä eikä peitä toista nokkaa',()=>{
  const asento=p=>uudenEleenAsento('uusi-welcome',p);
  assert.equal(asento(0).suu,0);
  assert.equal(asento(.22).suu,1);
  assert.equal(asento(1).suu,0);
  let edellinen=0;
  for(let i=0;i<=1000;i++){
    const s=asento(i/1000),svg=uudenEleenKuva(s);
    assert.ok(s.suu>=0&&s.suu<=1);
    assert.ok(Math.abs(s.suu-edellinen)<.02,'nokka aukeaa ja sulkeutuu ilman hyppäyksiä');
    edellinen=s.suu;
    assert.equal((svg.match(/data-part="friendly-beak"/g)||[]).length,1);
    assert.doesNotMatch(svg,/fill="#2e4756"/,'vanha suljettu nokka ei jää uuden päälle');
    assert.match(svg,/data-part="tongue"/);
    assert.match(svg,/data-part="mouth-space"/,'poski leikataan pois nokan aukosta');
  }
  for(const e of LIVIAN_UUDET_VERSIOT.filter(e=>e.baseId!=='welcome'))assert.doesNotMatch(uudenEleenKuva(uudenEleenAsento(e.id,.3)),/friendly-beak/);
});

test('kirjan ulkokannet ovat katsojaan päin ja peittävät sivun alareunan',()=>{
  for(const p of [0,.45,.52,.57,.65,1]){
    const svg=uudenEleenKuva(uudenEleenAsento('uusi-bookStudy',p));
    assert.match(svg,/data-part="book" data-facing="pulu"/);
    assert.ok(svg.indexOf('data-part="page"')<svg.indexOf('data-part="book-covers"'),'kannet piirretään sivun eteen');
    assert.match(svg,/data-part="page-edges"/);
    assert.doesNotMatch(svg,/m-17-20l12 2/,'vanhat katsojaan päin näkyvät tekstirivit poistettu');
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
