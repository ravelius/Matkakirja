/*
 * Lukijaääni (js/puhe.js + tools/pollo/rajat.js:n puheosuus).
 *
 * Soitinta ei voi testata Nodessa (ei Audiota eikä fetchiä), mutta
 * pilkonta ja rajalogiikka ovat puhtaita funktioita — ja juuri niissä
 * asuvat virheet, jotka eivät näy pelaamalla: väärin niputettu pala
 * ylittäisi workerin merkkikaton ja katkaisisi luennan keskeltä
 * lausetta, ja väärä laskuriavain sekoittaisi puheen ja pöllön rajat.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  PUHE_PALA_KATTO,
  niputaPalat,
  paloitteleVirkkeiksi,
  puheTuettu,
} from '../js/puhe.js';
import {
  PUHE_TEKSTIN_KATTO,
  kuukausiAvain,
  paivaAvain,
  puheKuukausiAvain,
  puhePaivaAvain,
  tarkistaPuheRajat,
} from '../tools/pollo/rajat.js';

test('virkkeet katkeavat välimerkeistä ja rivinvaihdoista', () => {
  const virkkeet = paloitteleVirkkeiksi(
    'Otsikko\nEnsimmäinen virke. Toinen virke! Kolmas kysyy? Neljäs jää…\nViides.',
  );
  assert.deepEqual(virkkeet, [
    'Otsikko',
    'Ensimmäinen virke.',
    'Toinen virke!',
    'Kolmas kysyy?',
    'Neljäs jää…',
    'Viides.',
  ]);
});

test('tyhjä ja pelkkä tyhjätila tuottavat tyhjän listan', () => {
  assert.deepEqual(paloitteleVirkkeiksi(''), []);
  assert.deepEqual(paloitteleVirkkeiksi('  \n \n'), []);
  assert.deepEqual(paloitteleVirkkeiksi(null), []);
});

test('desimaalit ja lyhenteet eivät katkea ilman välilyöntiä', () => {
  // Piste katkaisee vain, kun sitä seuraa tyhjätila — "3.5" ja
  // "v.1873" pysyvät koossa.
  assert.deepEqual(paloitteleVirkkeiksi('Lämpö on 3.5 astetta v.1873 mitattuna.'), [
    'Lämpö on 3.5 astetta v.1873 mitattuna.',
  ]);
});

test('ensimmäinen pala on pelkkä ensimmäinen virke', () => {
  const palat = niputaPalat(['Eka.', 'Toka.', 'Kolmas.']);
  assert.equal(palat[0], 'Eka.');
  assert.equal(palat.length, 2);
  assert.equal(palat[1], 'Toka. Kolmas.');
});

test('nippu ei ylitä kattoa, ja ylipitkä virke kulkee omanaan', () => {
  const pitka = 'x'.repeat(PUHE_PALA_KATTO + 50);
  const palat = niputaPalat(['Eka.', 'Toka.', pitka, 'Viimeinen.'], 20);
  assert.equal(palat[0], 'Eka.');
  for (const pala of palat.slice(1)) {
    // Vain yli katon oleva YKSITTÄINEN virke saa ylittää katon.
    if (pala.length > 20) assert.equal(pala, pitka);
  }
  assert.ok(palat.includes('Viimeinen.'));
});

test('pelin palakatto mahtuu workerin kovaan rajaan', () => {
  assert.ok(PUHE_PALA_KATTO < PUHE_TEKSTIN_KATTO);
});

test('puheTuettu on Nodessa false eikä kaadu', () => {
  // Ei selainta → ei puhetta; tärkeintä on ettei kysyminen heitä.
  assert.equal(puheTuettu(), false);
});

test('puheen laskuriavaimet eivät sekoitu pöllön avaimiin', () => {
  const nyt = new Date('2026-08-14T12:00:00Z');
  assert.notEqual(puhePaivaAvain('1.2.3.4', nyt), paivaAvain('1.2.3.4', nyt));
  assert.notEqual(puheKuukausiAvain(nyt), kuukausiAvain(nyt));
  assert.match(puhePaivaAvain('1.2.3.4', nyt), /^puhe:p:2026-08-14:/);
  assert.equal(puheKuukausiAvain(nyt), 'puhe:k:2026-08');
  // Raakaa IP-osoitetta ei saa näkyä avaimessa.
  assert.ok(!puhePaivaAvain('1.2.3.4', nyt).includes('1.2.3.4'));
});

test('puherajat: kuukausikatto voittaa päiväkaton ja nollaraja on pois päältä', () => {
  assert.equal(tarkistaPuheRajat({ paiva: 0, kuukausi: 0 }).ok, true);
  const paiva = tarkistaPuheRajat({ paiva: 999999, kuukausi: 0 });
  assert.equal(paiva.ok, false);
  assert.equal(paiva.syy, 'paivaraja');
  const kuukausi = tarkistaPuheRajat({ paiva: 999999, kuukausi: 9999999 });
  assert.equal(kuukausi.syy, 'kuukausiraja');
  // Nolla tarkoittaa "raja pois päältä" — sama sopimus kuin pöllöllä.
  assert.equal(tarkistaPuheRajat({ paiva: 5, paivaraja: 0, kuukausi: 5, kuukausiraja: 0 }).ok, true);
});
