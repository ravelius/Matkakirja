/*
 * IHMISEN MATKA — LISÄNOSTOJEN AIDOT COMMONS-KUVAT (omistaja 19.9.2026).
 *
 * Jokaisella lisänostolla on `kuvaAito`: Commons-kuva, jonka lisenssi on
 * sallittu (PD / CC0 / CC BY / CC BY-SA), jonka tekijä ja tiedostosivu
 * ovat tallessa ja jonka tiedostonimi kantaa sisällön tiivisteen
 * (im-<tunnus>-<sha8>.jpg). Testi vartioi juuri niitä kohtia, jotka
 * jäävät hiljaa pois: puuttuva lisenssi, NC/ND-lisenssi, väärä juuri
 * tai lähderivi, josta lisenssin nimi ei löydy (jolloin tekijänmaininta
 * ei muutu linkiksi).
 *
 * Paikallinen kuvakansio tarkistetaan vain, jos se on koneella
 * (/Users/samireivinen/Matkakirja-nostot-kuvat/ihmisen-matka/): tiedosto
 * on JPEG ja sen sha256:n 8 ensimmäistä merkkiä ovat nimessä.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {
  IHMISEN_MATKA_LISANOSTOT, IHMISEN_MATKA_LISANOSTOKUVAJUURI,
} from '../js/linssit/ihmisen-matka-data.js';
import { kokoaNostot } from '../js/linssit/ihmisen-matka-kortti.js';

const SALLITUT = /^(Public domain|CC0|CC BY(-SA)? [0-9]\.[0-9])$/;
const KANSIO = '/Users/samireivinen/Matkakirja-nostot-kuvat/ihmisen-matka';

test('lisänostojen kuvajuuri on oma erähakemistonsa', () => {
  assert.equal(IHMISEN_MATKA_LISANOSTOKUVAJUURI,
    'https://media.matkakirja.app/linssit/ihmisen-matka/lisanostot-20260920');
});

test('jokaisella lisänostolla on aito kuva täysin tiedoin', () => {
  assert.equal(IHMISEN_MATKA_LISANOSTOT.length, 20);
  for (const n of IHMISEN_MATKA_LISANOSTOT) {
    const k = n.kuvaAito;
    assert.ok(k, `${n.tunnus}: kuvaAito puuttuu`);
    assert.match(k.osoite, new RegExp(
      `^${IHMISEN_MATKA_LISANOSTOKUVAJUURI.replace(/[.]/g, '\\.')}/im-${n.tunnus}-[0-9a-f]{8}\\.jpg$`),
    `${n.tunnus}: osoite`);
    for (const kentta of ['lyhyt', 'selite', 'lahde', 'tekija']) {
      assert.ok(typeof k[kentta] === 'string' && k[kentta].trim().length > 3, `${n.tunnus}: ${kentta}`);
    }
    assert.ok(k.lyhyt.length <= 110, `${n.tunnus}: lyhyt liian pitkä`);
    assert.ok(k.lyhyt.endsWith('.') && k.selite.endsWith('.'), `${n.tunnus}: tekstit päättyvät pisteeseen`);
    assert.match(k.lisenssi, SALLITUT, `${n.tunnus}: lisenssi ${k.lisenssi} ei sallittu`);
    assert.match(k.lisenssiUrl, /^https:\/\/creativecommons\.org\/(licenses|publicdomain)\//, `${n.tunnus}: lisenssiUrl`);
    assert.match(k.lahdeUrl, /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/, `${n.tunnus}: lahdeUrl`);
    // taytaLahderivi linkittää vain nimet, jotka löytyvät lähderivin tekstistä.
    assert.ok(k.lahde.includes('Wikimedia Commons'), `${n.tunnus}: lähderivillä ei Commonsia`);
    assert.ok(k.lahde.includes(k.lisenssi), `${n.tunnus}: lähderivillä ei lisenssiä`);
    assert.ok(k.lahde.includes(k.tekija), `${n.tunnus}: lähderivillä ei tekijää`);
  }
});

test('jokainen kuva on eri tiedosto (ei samaa kuvaa kahdelle nostolle)', () => {
  const nimet = IHMISEN_MATKA_LISANOSTOT.map((n) => n.kuvaAito.osoite.split('/').pop().slice(-12));
  assert.equal(new Set(nimet).size, nimet.length);
});

test('kortti saa aidon kuvan osoitteen, selitteen ja lähderivin tiedot', () => {
  const nostot = kokoaNostot([], IHMISEN_MATKA_LISANOSTOT);
  for (const n of nostot) {
    const lahde = IHMISEN_MATKA_LISANOSTOT.find((l) => l.tunnus === n.tunnus).kuvaAito;
    assert.equal(n.kuvaAito, lahde.osoite);
    assert.equal(n.kuvaAitoSelite, lahde.lyhyt);
    assert.equal(n.kuvaAitoTiedot, lahde);
  }
});

test('paikallinen kuvakansio täsmää dataan (jos on koneella)', { skip: !fs.existsSync(KANSIO) }, () => {
  for (const n of IHMISEN_MATKA_LISANOSTOT) {
    const nimi = n.kuvaAito.osoite.split('/').pop();
    const polku = `${KANSIO}/${nimi}`;
    assert.ok(fs.existsSync(polku), `${nimi}: tiedostoa ei ole kansiossa`);
    const b = fs.readFileSync(polku);
    assert.ok(b[0] === 0xff && b[1] === 0xd8, `${nimi}: ei JPEG`);
    const sha8 = crypto.createHash('sha256').update(b).digest('hex').slice(0, 8);
    assert.equal(nimi, `im-${n.tunnus}-${sha8}.jpg`, `${nimi}: tiiviste ei täsmää`);
    assert.ok(b.length < 1_500_000, `${nimi}: yli 1,5 Mt`);
  }
});
