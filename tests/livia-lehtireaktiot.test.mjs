import assert from 'node:assert/strict';
import test from 'node:test';
import { kuunteleLivianTilanteita } from '../js/livia-tilanteet.js';
import { aloitaLivianLehtikierros, reagoiLivianLehtisivuun } from '../js/livia-lehtireaktiot.js';

function tarkkaile() {
  const tapahtumat = [];
  const lopeta = kuunteleLivianTilanteita((laji, tiedot) => tapahtumat.push({ laji, tiedot }));
  return { tapahtumat, lopeta };
}

test('vakaa kategoria-id määrää symbolin ja rajatun tunnetagin', () => {
  const ui = {};
  const { tapahtumat, lopeta } = tarkkaile();
  const tulos = reagoiLivianLehtisivuun(ui, {
    kategoria: { id: 'keksinnot', nimi: 'Keksinnöt' }, sivu: 2, tila: 'maa', omistaja: 'GBR',
  });
  lopeta();
  assert.equal(tulos.symboli, 'tekniikka');
  assert.deepEqual(tapahtumat.map(({ laji, tiedot }) => [laji, tiedot.tunne, tiedot.voimakkuus, tiedot.ele]),
    [['emotion', 'miettiva', .5, 'glasses']]);
});

test('aineiston tarkempi id saa vakaan olemassa olevan aihesymbolin', () => {
  const ui = {};
  const tulos = reagoiLivianLehtisivuun(ui, {
    kategoria: { id: 'arkkitehtuuri', nimi: 'Arkkitehtuuri' },
    sivu: 3, tila: 'maa', omistaja: 'ITA',
  });
  assert.equal(tulos.symboli, 'kulttuuri');
  assert.equal(tulos.ele, 'smile');
});

test('vakava sisältö voittaa aiheen tavallisen sävyn', () => {
  const ui = {};
  const { tapahtumat, lopeta } = tarkkaile();
  reagoiLivianLehtisivuun(ui, {
    kategoria: { id: 'ruoka', nimi: 'Ruoka', teksti: 'Kaupunki kärsi nälänhädästä.' },
    sivu: 1, tila: 'kaupunki', omistaja: 'krakova',
  });
  lopeta();
  assert.equal(tapahtumat[0].tiedot.tunne, 'vakava');
  assert.equal(tapahtumat[0].tiedot.voimakkuus, .5);
  assert.equal(tapahtumat[0].tiedot.ele, 'listen');
  assert.equal(tapahtumat[0].tiedot.lahde, 'lehti');
  assert.equal(tapahtumat[0].tiedot.tunnus, 'kaupunki:krakova:1:ruoka');
});

test('saman näkyvän sivun uusintapiirto vaimennetaan, uusi sivu reagoi', () => {
  const ui = {};
  const { tapahtumat, lopeta } = tarkkaile();
  const yhteinen = { tila: 'kaupunki', omistaja: 'lontoo' };
  reagoiLivianLehtisivuun(ui, { ...yhteinen, sivu: 1, kategoria: { id: 'historia' } });
  reagoiLivianLehtisivuun(ui, { ...yhteinen, sivu: 1, kategoria: { id: 'historia' } });
  reagoiLivianLehtisivuun(ui, { ...yhteinen, sivu: 2, kategoria: { id: 'taide' } });
  lopeta();
  assert.equal(tapahtumat.length, 2);
});

test('uusi avaus nollaa deduplikoinnin; esikatselu ja kehittäjäliite vaikenevat', () => {
  const ui = {};
  const { tapahtumat, lopeta } = tarkkaile();
  const sivu = { kategoria: { id: 'historia' }, sivu: 1, tila: 'kaupunki', omistaja: 'lontoo' };
  reagoiLivianLehtisivuun(ui, sivu);
  reagoiLivianLehtisivuun(ui, { ...sivu, nakyva: false });
  reagoiLivianLehtisivuun(ui, { ...sivu, tila: 'kehittaja' });
  aloitaLivianLehtikierros(ui);
  reagoiLivianLehtisivuun(ui, sivu);
  lopeta();
  assert.equal(tapahtumat.length, 2);
});
