// Kaupunkiliuskan malli (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 34):
// kaupungin sisäiset nostot liuskaan, ulkopuoliset kartalle.
import assert from 'node:assert/strict';
import test from 'node:test';

import {
  KAUPUNGIN_SADE_KM, NAHTAVYYDET_NIMIO, TURISTIOPPAAN_NIMIO, etaisyysKm,
  kategoriat, kaupunginNostot, liuskanRivit, onKaupunginSisainen, ylaryhmanMaara,
} from '../js/pallolauta/kaupunkiliuska.js';

const PARIISI = { lat: 48.8566, lng: 2.3522, nimi: 'Pariisi' };

/** Nostorivi samassa muodossa kuin js/pallolauta/nostot.js latoo. */
const nosto = (nimi, lat, lng, aihe, extra = {}) => ({
  avain: `nosto:${nimi}`,
  perhe: 'nosto',
  nimi,
  lat,
  lng,
  aihe,
  avaa: () => true,
  ...extra,
});

test('etäisyys tunnetuille pareille on oikeaa suuruusluokkaa', () => {
  assert.ok(Math.abs(etaisyysKm(PARIISI, { lat: 48.8049, lng: 2.1204 }) - 17) < 3);
  assert.ok(Math.abs(etaisyysKm(PARIISI, { lat: 48.4469, lng: 1.4874 }) - 80) < 8);
  assert.equal(etaisyysKm(PARIISI, { lat: NaN, lng: 0 }), Infinity);
});

test('Versailles, Chartres ja Chambord jäävät kaupungin ulkopuolelle', () => {
  assert.equal(onKaupunginSisainen(nosto('Louvre', 48.8606, 2.3376, 'taide'), PARIISI), true);
  assert.equal(onKaupunginSisainen(nosto('Versailles', 48.8049, 2.1204, 'historia'), PARIISI), false);
  assert.equal(onKaupunginSisainen(nosto('Chartres', 48.4469, 1.4874, 'historia'), PARIISI), false);
  assert.equal(onKaupunginSisainen(nosto('Chambord', 47.6161, 1.5169, 'historia'), PARIISI), false);
  assert.ok(KAUPUNGIN_SADE_KM > 10 && KAUPUNGIN_SADE_KM < 17);
});

test('kaupunkimerkki ja poltettu muste eivät ole kaupungin sisäisiä nostoja', () => {
  assert.equal(onKaupunginSisainen(nosto('Pariisi', 48.8566, 2.3522, null, { kaupunki: true }), PARIISI), false);
  assert.equal(onKaupunginSisainen(nosto('Seine', 48.85, 2.35, 'luonto', { poltettu: true }), PARIISI), false);
});

test('kaupungin nostot suodattuvat ja kategoriat lasketaan', () => {
  const rivit = [
    nosto('Louvre', 48.8606, 2.3376, 'taide', { ladontaNro: 2 }),
    nosto('Mona Lisan varkaus', 48.8608, 2.3378, 'taide', { ladontaNro: 1 }),
    nosto('Bastilji', 48.8532, 2.3692, 'historia', { ladontaNro: 3 }),
    nosto('Versailles', 48.8049, 2.1204, 'historia', { ladontaNro: 4 }),
    nosto('Nimikyltti', 48.86, 2.34, 'historia', { vainNimi: true }),
  ];
  const sisaiset = kaupunginNostot(rivit, PARIISI);
  assert.deepEqual(sisaiset.map((r) => r.nimi), ['Mona Lisan varkaus', 'Louvre', 'Bastilji']);
  const kasat = kategoriat(sisaiset);
  assert.equal(kasat.length, 2);
  assert.equal(kasat[0].maara, 2);
  assert.equal(kasat.reduce((a, k) => a + k.maara, 0), sisaiset.length);
});

test('liuskassa on kolme yläryhmän riviä ja kategoriat lukumäärineen', () => {
  const nostot = kaupunginNostot([
    nosto('Louvre', 48.8606, 2.3376, 'taide'),
    nosto('Bastilji', 48.8532, 2.3692, 'historia'),
    nosto('Ranskan vallankumous', 48.8534, 2.3688, 'historia'),
  ], PARIISI);
  const rivit = liuskanRivit({ kaupunki: PARIISI, nostot });
  assert.equal(ylaryhmanMaara(rivit), 3);
  assert.equal(rivit[0].nimi, 'Pariisi');
  assert.equal(rivit[1].nimi, NAHTAVYYDET_NIMIO);
  assert.equal(rivit[2].nimi, TURISTIOPPAAN_NIMIO);
  const kategoriarivit = rivit.filter((r) => r.laji === 'kategoria');
  assert.equal(kategoriarivit.length, 2);
  assert.ok(kategoriarivit.every((r) => /\(\d+\)$/.test(r.nimi)));
  // Haitari kiinni: yhtään kohderiviä ei ole.
  assert.equal(rivit.filter((r) => r.laji === 'kohde').length, 0);
});

test('haitari avaa vain yhden kategorian kerrallaan', () => {
  const nostot = kaupunginNostot([
    nosto('Louvre', 48.8606, 2.3376, 'taide'),
    nosto('Bastilji', 48.8532, 2.3692, 'historia'),
    nosto('Ranskan vallankumous', 48.8534, 2.3688, 'historia'),
  ], PARIISI);
  const rivit = liuskanRivit({ kaupunki: PARIISI, nostot, avattuKategoria: 'historia' });
  const kohteet = rivit.filter((r) => r.laji === 'kohde');
  assert.equal(kohteet.length, 2);
  assert.ok(kohteet.every((r) => r.aihe === 'historia' && r.sisennys === 1));
  // Avattu kategoria on merkitty ja se on ainoa avoin.
  assert.equal(rivit.filter((r) => r.laji === 'kategoria' && r.auki).length, 1);
});

test('nostoton kaupunki näyttää vain yläryhmän (kohta 9)', () => {
  const rivit = liuskanRivit({ kaupunki: { nimi: 'Lyon', lat: 45.76, lng: 4.84 }, nostot: [] });
  assert.equal(rivit.length, 3);
  assert.equal(ylaryhmanMaara(rivit), 3);
});

test('puuttuva opas tai kohdekartta jättää rivinsä pois', () => {
  const rivit = liuskanRivit({ kaupunki: PARIISI, nostot: [], nahtavyyksia: false, opas: false });
  assert.deepEqual(rivit.map((r) => r.laji), ['lehti']);
});
