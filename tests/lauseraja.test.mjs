/*
 * LAUSERAJA (js/lauseraja.js) — omistajan sääntö sanatarkasti
 * (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 34 kohta 16): *"ensimmäinen
 * lause päättyy pisteeseen, huuto- tai kysymysmerkkiin, jota seuraa
 * välilyönti ja iso kirjain — lyhenteet (esim. 'n.', 'v.', 'ns.') eivät
 * katkaise"*.
 *
 * Testi on tässä eikä savukkeessa, koska sääntö on pelkkää tekstiä: se
 * on mitattavissa ilman selainta, ja juuri siksi se on oma moduulinsa.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { ensimmainenLause, LYHENTEET } from '../js/lauseraja.js';

test('lause katkeaa pisteeseen, jota seuraa välilyönti ja iso kirjain', () => {
  const { ensimmainen, loput } = ensimmainenLause(
    'Pariisi on Seinen kaupunki. Sen kadut ovat leveitä. Kolmas lause.',
  );
  assert.equal(ensimmainen, 'Pariisi on Seinen kaupunki.');
  assert.equal(loput, 'Sen kadut ovat leveitä. Kolmas lause.');
});

test('huuto- ja kysymysmerkki katkaisevat samalla säännöllä', () => {
  assert.equal(ensimmainenLause('Katso tätä! Se on upea.').ensimmainen, 'Katso tätä!');
  assert.equal(ensimmainenLause('Mitä täällä on? Paljon.').ensimmainen, 'Mitä täällä on?');
  assert.equal(ensimmainenLause('Mitä?! Sepä kummallista.').ensimmainen, 'Mitä?!');
});

test('lyhenteet eivät katkaise lausetta', () => {
  for (const [teksti, odotettu] of [
    ['Torni on n. Kolmesataa metriä korkea. Loppu.', 'Torni on n. Kolmesataa metriä korkea.'],
    ['Rakennettu v. Vuonna 1889 maailmannäyttelyyn. Loppu.',
      'Rakennettu v. Vuonna 1889 maailmannäyttelyyn.'],
    ['Se on ns. Rautarouva kaupungin yllä. Loppu.', 'Se on ns. Rautarouva kaupungin yllä.'],
    ['Kohteita, esim. Louvre, on useita. Loppu.', 'Kohteita, esim. Louvre, on useita.'],
  ]) {
    assert.equal(ensimmainenLause(teksti).ensimmainen, odotettu, teksti);
  }
});

test('nimikirjain ja järjestysluku eivät katkaise', () => {
  assert.equal(
    ensimmainenLause('Kadun nimesi J. K. Paasikivi aikoinaan. Toinen lause.').ensimmainen,
    'Kadun nimesi J. K. Paasikivi aikoinaan.',
  );
  assert.equal(
    ensimmainenLause('Kerroksia on 3. Ylin on katolla.').ensimmainen,
    'Kerroksia on 3. Ylin on katolla.',
  );
});

test('pieni kirjain pisteen jälkeen ei katkaise', () => {
  const { ensimmainen, loput } = ensimmainenLause('Torni nousi 1889. vuoden näyttelyyn. Loppu.');
  assert.equal(loput, 'Loppu.');
  assert.equal(ensimmainen, 'Torni nousi 1889. vuoden näyttelyyn.');
});

test('sulkeva lainausmerkki kuuluu vielä ensimmäiseen lauseeseen', () => {
  const { ensimmainen, loput } = ensimmainenLause('Hän sanoi "tule pian." Sitten hän lähti.');
  assert.equal(ensimmainen, 'Hän sanoi "tule pian."');
  assert.equal(loput, 'Sitten hän lähti.');
});

test('yhden lauseen teksti palautuu kokonaan, loput on tyhjä', () => {
  const { ensimmainen, loput } = ensimmainenLause('Vain yksi lause ilman jatkoa.');
  assert.equal(ensimmainen, 'Vain yksi lause ilman jatkoa.');
  assert.equal(loput, '');
});

test('tyhjä ja puuttuva teksti eivät kaada', () => {
  assert.deepEqual(ensimmainenLause(''), { ensimmainen: '', loput: '' });
  assert.deepEqual(ensimmainenLause(null), { ensimmainen: '', loput: '' });
  assert.deepEqual(ensimmainenLause('   '), { ensimmainen: '', loput: '' });
});

test('osat yhdistettynä ovat sama teksti kuin lähtöteksti', () => {
  const teksti = 'Ensimmäinen lause. Toinen lause. Kolmas lause.';
  const { ensimmainen, loput } = ensimmainenLause(teksti);
  assert.equal(`${ensimmainen} ${loput}`, teksti);
});

test('lyhenneluettelo on pienaakkosia eikä sisällä päällekkäisyyksiä', () => {
  assert.equal(new Set(LYHENTEET).size, LYHENTEET.length);
  for (const s of LYHENTEET) assert.equal(s, s.toLocaleLowerCase('fi'));
});
