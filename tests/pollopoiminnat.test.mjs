/*
 * Pöllöpoiminnat: avaimen muoto, kuratointiraja ja vientilohko.
 *
 * TÄRKEIN TESTI on kuratointiraja: laitteelle tallennettu pari EI saa
 * näkyä ilman kehittäjätilaa. Vuoto ei näkyisi diffistä vaan siitä,
 * että pelaajan lehteen ilmestyisi tarkistamatonta tekstiä.
 *
 * Vientilohko testataan pyörittämällä se takaisin arvoksi: lohko
 * liitetään js/packs/pollo-poiminnat.js:ään sellaisenaan, joten sen on
 * kestettävä heittomerkit ja rivinvaihdot vastauksissa.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  aiheAvain, juttuAvain, nykyinenPoimintaAvain, poiminnat, vientiLohko,
} from '../js/pollopoiminnat.js';

const PAKKA = {
  'juttu:praha:Vanhauusi synagoga': [
    { kysymys: 'Kuka on Golem?', vastaus: 'Savesta muovattu suojelija.' },
  ],
};
const OMAT = {
  'juttu:praha:Vanhauusi synagoga': [
    { kysymys: 'Miksi ullakolle ei nousta?', vastaus: 'Tarinan mukaan Golem lepää siellä.' },
  ],
};

test('avaimet syntyvät sovitussa muodossa', () => {
  assert.equal(juttuAvain('praha', 'Vanhauusi synagoga'), 'juttu:praha:Vanhauusi synagoga');
  assert.equal(aiheAvain('CZE', 'historia'), 'aihe:CZE:historia');
  assert.equal(juttuAvain('', 'Nimi'), null);
  assert.equal(aiheAvain('praha', ''), null);
});

test('pelaaja näkee vain paketin parit', () => {
  const parit = poiminnat('juttu:praha:Vanhauusi synagoga',
    { kehittaja: false, omat: OMAT, pakka: PAKKA });
  assert.deepEqual(parit.map((p) => p.kysymys), ['Kuka on Golem?']);
});

test('kehittäjä näkee myös laitteen omat, tuplat pois', () => {
  const omat = {
    'juttu:praha:Vanhauusi synagoga': [
      ...OMAT['juttu:praha:Vanhauusi synagoga'],
      { kysymys: 'Kuka on Golem?', vastaus: 'Sama kysymys kuin paketissa.' },
    ],
  };
  const parit = poiminnat('juttu:praha:Vanhauusi synagoga',
    { kehittaja: true, omat, pakka: PAKKA });
  assert.deepEqual(parit.map((p) => p.kysymys),
    ['Kuka on Golem?', 'Miksi ullakolle ei nousta?']);
  assert.equal(parit[0].oma, undefined);
  assert.equal(parit[1].oma, true);
});

test('tuntematon avain ei tuota pillereitä', () => {
  assert.deepEqual(poiminnat('aihe:praha:historia',
    { kehittaja: true, omat: OMAT, pakka: PAKKA }), []);
  assert.deepEqual(poiminnat(null, { kehittaja: true, omat: OMAT, pakka: PAKKA }), []);
});

test('vientilohko on ajettavaa JavaScriptiä myös hankalilla merkeillä', async () => {
  const omat = {
    "juttu:praha:Kaarlen'silta": [
      { kysymys: 'Onko tässä \'heittomerkki\'?', vastaus: 'Kappale.\n\nToinen "kappale".' },
    ],
  };
  const lohko = vientiLohko(omat);
  const moduuli = await import(
    `data:text/javascript;base64,${Buffer.from(lohko, 'utf8').toString('base64')}`);
  assert.deepEqual(moduuli.POLLO_POIMINNAT, omat);
  assert.equal(vientiLohko({}), '');
  assert.equal(vientiLohko({ 'juttu:x:y': [] }), '');
});

test('avain luetaan pelin tilasta, ei DOMin tekstistä', () => {
  const doc = (auki) => ({ getElementById: (id) => ({ open: auki.includes(id) }) });
  const juttuTila = {
    lehtitila: {
      arrivalShownFor: 'praha',
      nahtavyysAuki: { kohde: { nimi: 'Vanhauusi synagoga' } },
    },
  };
  assert.equal(nykyinenPoimintaAvain(juttuTila, doc(['nahtavyys-dialog'])),
    'juttu:praha:Vanhauusi synagoga');

  const maalehti = {
    lehtitila: {
      arrivalShownFor: 'praha', tutkiTila: 'maa', tutkiMaaLehti: 'CZE',
      tutkiSivu: 2, tutkiSivut: [{ id: 'kartta' }, { id: 'historia' }],
    },
  };
  assert.equal(nykyinenPoimintaAvain(maalehti, doc(['arrival-dialog'])), 'aihe:CZE:historia');

  const kaupunkilehti = {
    lehtitila: {
      arrivalShownFor: 'praha', tutkiTila: 'kaupunki',
      tutkiSivu: 1, tutkiSivut: [{ id: 'historia' }],
    },
  };
  assert.equal(nykyinenPoimintaAvain(kaupunkilehti, doc(['arrival-dialog'])),
    'aihe:praha:historia');

  // Kehittäjän liite ei ole artikkeli, eikä kartalla ole mitään auki.
  const liite = {
    lehtitila: { tutkiTila: 'kehittaja', tutkiSivu: 1, tutkiSivut: [{ id: 'tilanne-taulu' }] },
  };
  assert.equal(nykyinenPoimintaAvain(liite, doc(['arrival-dialog'])), null);
  assert.equal(nykyinenPoimintaAvain(kaupunkilehti, doc([])), null);
  assert.equal(nykyinenPoimintaAvain(null, doc(['arrival-dialog'])), null);
});
