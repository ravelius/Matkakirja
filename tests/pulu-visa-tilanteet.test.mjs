import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { ilmoitaLivianVisaTilanne } from '../js/visa.js';
import { kuunteleLivianTilanteita } from '../js/livia-tilanteet.js';

test('visan kertatilanteilla on hyväksytyt tunnetagit ja vakaa tunnus',t=>{
 const tapahtumat=[];const irrota=kuunteleLivianTilanteita((laji,tiedot)=>tapahtumat.push({laji,tiedot}));t.after(irrota);
 for(const [nimi,tunnus,tunne,voimakkuus] of [
  ['viimeinenYritys','aarre.kysymys.viimeinenYritys','jannitys',.6],
  ['lukittui','aarre.lukittui','vakava',.6],
  ['rosvoVoitto','aarre.rosvo.voitto','ilo',.65],
  ['rosvoTappio','aarre.rosvo.tappio','vakava',.55],
 ]){
  const kohde={};
  assert.deepEqual(ilmoitaLivianVisaTilanne({},kohde,nimi),{tunne,voimakkuus,ele:{jannitys:'doubleTake',vakava:'listen',ilo:'grin'}[tunne]});
  assert.equal(ilmoitaLivianVisaTilanne({},kohde,nimi),null,'sama siirtymä ei toistu renderissä');
  assert.equal(tapahtumat.at(-1).laji,'emotion');
  assert.equal(tapahtumat.at(-1).tiedot.tunnus,tunnus);
 }
 assert.equal(tapahtumat.length,4);
});

test('tuntematon, puuttuva ja purettu visa pysyvät hiljaisina',t=>{
 const tapahtumat=[];const irrota=kuunteleLivianTilanteita((...x)=>tapahtumat.push(x));t.after(irrota);
 assert.equal(ilmoitaLivianVisaTilanne({},null,'lukittui'),null);
 assert.equal(ilmoitaLivianVisaTilanne({}, {},'tuntematon'),null);
 assert.equal(ilmoitaLivianVisaTilanne({dead:true},{},'lukittui'),null);
 assert.equal(tapahtumat.length,0);
});

test('kytkennät ovat vain selkeissä kertasiirtymissä eikä aarteen oikea vastaus saa toista ilojuhlaa',async()=>{
 const lahde=await readFile(new URL('../js/visa.js',import.meta.url),'utf8');
 assert.match(lahde,/viimeinenYritys\) ilmoitaLivianVisaTilanne\(ui,quiz,'viimeinenYritys'\)/);
 assert.match(lahde,/if\(quiz\.aarreLukittui\)ilmoitaLivianVisaTilanne\(ui,quiz,'lukittui'\)/);
 assert.match(lahde,/ilmoitaLivianVisaTilanne\(ui,duel,duel\.right\?'rosvoVoitto':'rosvoTappio'\)/);
 assert.match(lahde,/ilmoitaLivianVisaTilanne\(ui,duel,'rosvoTappio'\)/);
 assert.doesNotMatch(lahde,/ilmoitaLivianVisaTilanne\(ui,quiz,'(?:oikein|loyto)'\)/);
 assert.match(lahde,/liviaVisaJalkiele\(ui,Boolean\(quiz\.right\)\)/,'nykyinen sulun jälkiele säilyy');
});
