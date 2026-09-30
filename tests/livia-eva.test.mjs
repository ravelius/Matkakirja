import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {livianSvgAsento,livianSvgKuva,livianEvaKerrosSvg} from '../js/livia-svg.js';

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
