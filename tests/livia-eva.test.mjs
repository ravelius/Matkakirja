import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {livianSvgAsento,livianSvgKuva,livianEvaKerrosSvg,livianEvaRobottiKerrosSvg} from '../js/livia-svg.js';

const lepo=livianSvgAsento('rest',0);
const layerNames={perus:'perus',kasvovalo:'kasvovalo',kypärälamput:'kyparalamput',maavalo:'maavalo',turvaköysi:'turvakoysi'};

test('EVA-puku kuuluu nykyiseen Liviaan ja valot voi sammuttaa itsenäisesti',()=>{
  const s={...lepo,astronautti:true};
  const web=livianSvgKuva(s);
  assert.match(web,/data-part="eva-puku"/);
  assert.match(web,/data-part="astronautti-kypara"/);
  assert.match(web,/data-part="eva-turvaköysi"/);
  for(const part of ['eva-kasvovalo','eva-kyparalamput','eva-maavalo'])assert.match(web,new RegExp(`data-part="${part}"`));
  const varjossa=livianSvgKuva({...s,evaValot:false,evaTether:false});
  for(const part of ['eva-kasvovalo','eva-kyparalamput','eva-maavalo','eva-turvaköysi'])assert.doesNotMatch(varjossa,new RegExp(`data-part="${part}"`));
  assert.match(varjossa,/data-part="eva-puku"/);
  assert.doesNotMatch(varjossa,/data-part="ground-shadow"/);
});

test('natiivin viisi 2x-kerrosta jakavat saman läpinäkyvän koordinaatiston',()=>{
  for(const [name,fileName] of Object.entries(layerNames)){
    const svg=livianEvaKerrosSvg(name,lepo);
    assert.match(svg,/viewBox="0 0 152 304"/);
    const png=readFileSync(new URL(`../assets/livia/livia-eva-${fileName}-2x.png`,import.meta.url));
    assert.equal(png.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
    assert.equal(png.readUInt32BE(16),304);
    assert.equal(png.readUInt32BE(20),608);
    assert.equal(png[25],6); // RGBA, ei mustaan taustaan sulatettua kuvaa
  }
  assert.doesNotMatch(livianEvaKerrosSvg('kasvovalo',lepo),/data-part="eva-puku"/);
  assert.doesNotMatch(livianEvaKerrosSvg('turvaköysi',lepo),/data-part="eva-maavalo"/);
});

test('robottikäsi sitoo saman Pulun jalkatukeen ilman vapaata köyden päätä',()=>{
  const tavallinen=livianSvgKuva({...lepo,astronautti:true});
  const robotti=livianSvgKuva({...lepo,astronautti:true,evaRobottikasi:true});
  assert.doesNotMatch(tavallinen,/data-part="eva-robotin-varsi"/);
  for(const osa of ['eva-robotin-varsi','eva-robotin-pidikkeet','eva-robotin-turvaköysi','eva-robotin-reunavalo','eva-keinunta'])
    assert.match(robotti,new RegExp(`data-part="${osa}"`));
  assert.match(robotti,/data-eva-robotissa="true"/);
  assert.match(robotti,/data-part="eva-robotti-sommittelu" transform="translate\(0 -75\)"/);
  assert.doesNotMatch(robotti,/data-part="eva-turvaköysi"/);
  assert.match(robotti,/data-part="eva-puku"/);
  assert.match(robotti,/data-part="astronautti-kypara"/);
  const poistumassa=livianSvgKuva({...livianSvgAsento('chatDashOut',.7),astronautti:true,evaRobottikasi:true});
  const kokoLinnunMuunnos=kuva=>/data-part="whole-bird"[^>]*transform="([^"]+)"/.exec(kuva)?.[1];
  assert.equal(kokoLinnunMuunnos(poistumassa),kokoLinnunMuunnos(robotti),'pelin lentorata ei irrota jalkoja tuesta');
  assert.doesNotMatch(poistumassa,/data-part="chat-speed-cloud"/);
  const ilmanValoja=livianSvgKuva({...lepo,astronautti:true,evaRobottikasi:true,evaValot:false,evaTether:false});
  assert.match(ilmanValoja,/data-part="eva-robotin-varsi"/);
  assert.doesNotMatch(ilmanValoja,/data-part="eva-robotin-reunavalo"|data-part="eva-robotin-turvaköysi"/);
});

test('robotin pitkät ja lyhyet 2x-kerrokset säilyvät erillisinä',()=>{
  for(const [kerros,tiedosto] of Object.entries({varsi:'varsi',reunavalo:'reunavalo','turvaköysi':'turvakoysi',pidikkeet:'pidikkeet'})){
    const svg=livianEvaRobottiKerrosSvg(kerros);
    const korkeus=['varsi','reunavalo'].includes(kerros)?800:kerros==='turvaköysi'?400:304;
    assert.match(svg,new RegExp(`viewBox="0 0 152 ${korkeus}"`));
    assert.doesNotMatch(svg,/data-part="eva-puku"|data-part="astronautti-kypara"/);
    const png=readFileSync(new URL(`../assets/livia/livia-eva-robotin-${tiedosto}-2x.png`,import.meta.url));
    assert.equal(png.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
    assert.equal(png.readUInt32BE(16),304);
    assert.equal(png.readUInt32BE(20),korkeus*2);
    assert.equal(png[25],6);
  }
  const css=readFileSync(new URL('../css/satelliitti.css',import.meta.url),'utf8');
  assert.match(css,/livia-eva-jalkatuessa 6s ease-in-out infinite/);
  assert.match(css,/\[data-part="eva-robotin-reunavalo"\]/);
});

test('robottikäsi on pelissä aina EVA-asun kanssa (omistaja 2.10.2026)', () => {
  const eleet = readFileSync(new URL('../js/livia-eleet.js', import.meta.url), 'utf8');
  assert.match(eleet, /const piirrettava=\{\.\.\.s,compactExplain,astronautti,evaRobottikasi:astronautti\};/);
});
