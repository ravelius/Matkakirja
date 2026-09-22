import test from 'node:test';
import assert from 'node:assert/strict';
import {LIVIA_SVG_ELEET} from '../js/livia-svg.js';
import {livianSvgPaa} from '../js/livia-svg-paa.js';
import {LIVIAN_UUDET_VERSIOT,uudenEleenAsento,uudenEleenKuva} from '../docs/livia-uudet-versiot.mjs';

test('kasvopohjien polut vastaavat toisiaan myös tuotantopään muuttuessa',()=>{
  const topologia=frame=>[...livianSvgPaa({frame},{prefix:'koe'}).replace(/<path data-part="smile"[^>]*\/>/,'')
    .matchAll(/\b(d|transform|cx|cy|rx|ry|x|y)="([^"]*)"/g)]
    .map(m=>[m[1],m[2].replace(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi,'#')]);
  for(const ilme of ['glance','down','shock','blink','smile','smug','grin','disbelief','yawn'])assert.deepEqual(topologia(ilme),topologia('rest'),ilme);
});

test('sarjakuvakokeilu käyttää omaa piirrosta, huivia ja jatkuvaa silmänräpäytystä',()=>{
  const a=p=>uudenEleenAsento('uusi-sarjakuvapulu',p),kuva=p=>uudenEleenKuva(a(p));
  assert.match(kuva(.22),/data-style="sarjakuvakokeilu"/);
  assert.match(kuva(.22),/data-face-shape="slender"/,'poskien siluetti kapenee kohti leukaa');
  assert.match(kuva(.22),/data-part="face-outline"/);
  assert.equal((kuva(.22).match(/data-part="cartoon-eye"/g)||[]).length,2);
  assert.equal((kuva(.22).match(/data-eye-shape="almond"/g)||[]).length,2);
  assert.equal((kuva(.22).match(/<path data-part="eye-white"/g)||[]).length,2,'silmän muoto ei ole pelkkä pyöreä ellipsi');
  assert.equal((kuva(.22).match(/data-part="upper-lid"/g)||[]).length,2);
  assert.match(kuva(.22),/data-part="cartoon-beak" data-opening="1"/);
  assert.match(kuva(.22),/data-beak-shape="pigeon"/,'oma kyyhkyn nokka, ei pitkä ankan nokka');
  assert.equal((kuva(.22).match(/data-part="eyelashes"/g)||[]).length,2);
  assert.match(kuva(.22),/data-part="soft-cheek"/);
  assert.match(kuva(.22),/data-part="mouth-space"/);
  assert.match(kuva(.22),/data-part="tongue"/);
  assert.match(kuva(.1),/data-part="cartoon-lid" transform="[^"]*scale\(1 0.04\)/);
  assert.match(kuva(.85),/data-part="folded-wing-layer"/,'suljettu siipi ei katoa väliruuduissa');
  assert.match(kuva(.22),/data-part="scarf"/);
  assert.match(kuva(.22),/fill="#d98a98"/);
  const huivi=p=>kuva(p).match(/data-part="scarf-tails" transform="([^"]+)"/)[1];
  assert.notEqual(huivi(.2),huivi(.3),'huivin päät seuraavat tervehdyksen jälkiliikettä');
  for(const e of LIVIAN_UUDET_VERSIOT.filter(e=>!['uusi-sarjakuvapulu','uusi-livia-ilahtuu'].includes(e.id))){
    assert.doesNotMatch(uudenEleenKuva(uudenEleenAsento(e.id,.4)),/cartoon-eye|data-part="scarf"/,'ei uutta hahmopiirrosta tai huivia muihin eleisiin');
  }
  for(let i=0;i<=100;i++){
    const s=a(i/100),perus=uudenEleenAsento('uusi-welcome',i/100);
    for(const k of ['paaKulma','siipi','sulat','suu','rapaytys'])assert.equal(s[k],perus[k],'piirrostyylin koe säilyttää tutun tervehdyksen liikeavaimet');
  }
});

test('Livian oma tervehdys erottaa tunnistamisen, rintasiiven ja vilkutuksen',()=>{
  const a=p=>uudenEleenAsento('uusi-livia-ilahtuu',p),kuva=p=>uudenEleenKuva(a(p));
  assert.ok(a(.055).katse<-.8&&a(.055).siipi===0,'katse ehtii ennen siipeä');
  assert.equal(a(.155).suu,0,'lyhyt ennakointi ennen ilahtumista');
  assert.ok(a(.235).suu>.79&&a(.235).hengitys>.7,'nokka ja rinta aukeavat ilahtumiseen');
  assert.equal(a(.325).rintasiipi,1);assert.equal(a(.45).rintasiipi,1,'siipi lepää rinnalla noin puoli sekuntia');
  assert.match(kuva(.4),/data-part="chest-elbow"/);
  assert.ok(a(.4).paaKulma<-9&&a(.415).rapaytys>.8,'lempeä kallistus ja silmien sulkeminen kontaktin aikana');
  assert.equal(a(.535).rintasiipi,0,'siipi irtoaa rinnalta ennen ylös tervehtimistä');
  assert.ok(a(.615).siipi>.9&&a(.615).takasiipi<.25,'vain toinen siipi tervehtii korkealla');
  assert.ok(a(.615).sulat<a(.615).siipi,'siivenkärjet seuraavat jäljessä');
  assert.notEqual(a(.64).huiviliike,a(.74).huiviliike,'huivi heilahtaa takaisin');
  assert.match(kuva(.23),/data-part="breath"/);
  assert.match(kuva(.055),/data-part="gaze"/);
  assert.equal(kuva(0),kuva(1),'myös piirros palaa täsmälleen lepoon');
  let edellinen=a(0);
  for(let i=1;i<=1000;i++){
    const s=a(i/1000);
    for(const k of ['rintasiipi','siipi','suu','hengitys'])assert.ok(Math.abs(s[k]-edellinen[k])<.035,k+' vaihtuu jatkuvasti');
    edellinen=s;
  }
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
    if(e.id!=='uusi-bookPanic')for(const k of ['paaKulma','paaY','paaX','rinta','siipi','takasiipi','rapaytys','ilme','suu','suusiipi','hengitys','rintasiipi','huiviliike'])assert.equal(asento(0)[k],asento(1)[k],e.id+' '+k);
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
  for(const id of ['uusi-nod','uusi-doubleTake','uusi-bookStudy','uusi-bookPanic'])assert.doesNotMatch(uudenEleenKuva(uudenEleenAsento(id,.3)),/friendly-beak/);
});

test('uuden erän suu, silmät, hengitys ja siivet näyttelevät neljää eri reaktiota',()=>{
  const a=(id,p)=>uudenEleenAsento('uusi-'+id,p);
  assert.equal(a('chuckle',.25).suu,0,'nauru pidätetään ennen pyrskähdystä');
  assert.ok(a('chuckle',.32).suu>a('chuckle',.53).suu+.2,'kaksi erikokoista pyrskähdystä');
  assert.ok(a('chuckle',.40).suu<.1,'pyrskähdysten välissä hengähdetään');
  assert.ok(a('chuckle',.20).hengitys>0&&a('chuckle',.35).hengitys<0,'sisäänhengitys vaihtuu vatsan painotukseen');
  assert.ok(a('chuckle',.32).paaKulma<-15&&a('chuckle',.32).rinta<a('chuckle',.36).rinta,'pää johtaa, rinta seuraa');
  assert.equal(a('yawn',.48).suu,1);assert.equal(a('yawn',.61).suu,1);
  assert.ok(a('yawn',.29).suu<.2&&a('yawn',.53).hengitys===1,'haukotus kasvaa hitaasti venytykseen');
  assert.ok(a('yawn',.78).hengitys<0&&a('yawn',.78).paaY>4,'huokaus laskee koko asentoa');
  assert.ok(a('grin',.17).ilme>0&&a('grin',.23).suu===0,'silmät aloittavat virneen');
  assert.ok(a('grin',.37).suu>.5&&a('grin',.69).suu>.4,'leveä hymy pysyy hetken');
  assert.equal(a('disbelief',.13).paaKulma,a('disbelief',.26).paaKulma,'ensin täysin paikallaan oleva havainto');
  assert.equal(a('disbelief',.33).suu,a('disbelief',.51).suu,'nokka jää auki, ei puhetta muistuttavaa sykettä');
  assert.ok(a('disbelief',.46).siipi>a('disbelief',.46).takasiipi*2,'kohautus on epäsymmetrinen');
  assert.ok(a('disbelief',.66).katse>.9&&a('disbelief',.72).suu===0);
  for(const id of ['chuckle','yawn','grin','disbelief']){
    let edellinen=a(id,0);
    for(let i=0;i<=1000;i++){
      const s=a(id,i/1000);
      for(const k of ['suu','suusiipi','hengitys'])assert.ok(Math.abs(s[k]-edellinen[k])<.035,id+' '+k+' ei hypähdä');
      assert.ok(s.suu>=0&&s.suu<=1);
      edellinen=s;
    }
    const svg=uudenEleenKuva(a(id,.48));
    assert.equal((svg.match(/data-part="friendly-beak"/g)||[]).length,1);
    assert.match(svg,/data-part="mouth-space"/);assert.match(svg,/data-part="tongue"/);
    assert.doesNotMatch(svg,/fill="#2e4756"/);
  }
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
