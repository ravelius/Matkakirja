/*
 * MAAKOHTAISET PAIKALLISAARTEET (js/packs/paikallisaarteet.js).
 *
 * Taulu on puhdasta sisältöä: pelaaja näkee nimen paljastuskortilla ja
 * faktan löytötekstissä. Kirjoitusvirhe ei kaada peliä vaan menee
 * hiljaa läpi ruudulle asti, joten testin tehtävä on vahtia sitä, mikä
 * on koneellisesti tarkistettavissa:
 *
 *   1. avain on ISO3-maakoodi, joka on oikeasti jonkin laudan
 *      kaupungin maa (muuten pari ei näy pelissä koskaan);
 *   2. rivillä on MOLEMMAT aarteet — puolikas pari tarkoittaisi, että
 *      maan toinen laatta putoaa laudan yleisnimeen kesken matkan;
 *   3. nimi ei ole tyhjä eikä niin pitkä, että paljastuskortin
 *      otsikko hajoaisi (mitta katsottu selaimessa: Itämeren
 *      meripihka 18 merkkiä, pisin kirjoitettu 31);
 *   4. fakta on 1–450 merkkiä eli lyhyt tietoisku, ei artikkeli;
 *   5. sama maa ei esiinny taulussa kahdesti (JS pitäisi hiljaa
 *      jälkimmäisen, ja ensimmäinen jäisi näyttämään voimassa
 *      olevalta — sama ansa kuin muissa pakettitauluissa);
 *   6. legenda sanoo olevansa legenda. Aarteet, jotka ovat tarua eivätkä
 *      löytöjä, on merkitty tekstissä sanalla ("tarun mukaan", "saagan
 *      mukaan", "legendan mukaan", "myytti") — Raamatun linja on, ettei
 *      pelaajalle koskaan kerrota tarua faktana.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { PAIKALLISAARTEET, paikallisaarre } from '../js/packs/paikallisaarteet.js';
import { EUROPE_CITY_COUNTRY } from '../js/packs/europe-countries.js';
import { PACKS } from '../js/pack.js';
import { kaksoisavaimet } from '../tools/tarkista-kaksoisavaimet.mjs';

const LAHDE = 'js/packs/paikallisaarteet.js';
const FAKTAN_KATTO = 450;
const NIMEN_KATTO = 40;

/** Kaikkien lautojen maat: pari kelpaa vain, jos maahan pääsee. */
const PELIN_MAAT = new Set();
for (const pack of PACKS) {
  for (const iso of Object.values(pack.map?.cityCountry ?? {})) PELIN_MAAT.add(iso);
}

/** Aarteet, jotka ovat tarua — teksti ei saa esittää niitä löytönä. */
const TARUT = {
  FIN: 'Sammon siru',
  ISL: 'Egillin hopea-arkku',
  DEU: 'Nibelungein aarre',
  CHE: 'Wilhelm Tellin varsijousi',
  HUN: 'Attilan hauta-aarre',
  UKR: 'Hetmani Polubotokin kultakätkö',
};
const TARUSANAT = ['taru', 'tarina', 'saaga', 'legend', 'myytti', 'runo'];

test('jokaisella maalla on molemmat aarteet nimineen ja faktoineen', () => {
  const rivit = Object.entries(PAIKALLISAARTEET);
  assert.ok(rivit.length > 0, 'taulu on tyhjä');
  for (const [iso, pari] of rivit) {
    for (const tyyppi of ['pieniAarre', 'isoAarre']) {
      const aarre = pari[tyyppi];
      assert.ok(aarre, `${iso}: ${tyyppi} puuttuu — puolikas pari`);
      assert.equal(typeof aarre.name, 'string', `${iso} ${tyyppi}: nimi ei ole teksti`);
      assert.ok(aarre.name.trim().length > 0, `${iso} ${tyyppi}: nimi on tyhjä`);
      assert.equal(
        aarre.name, aarre.name.trim(), `${iso} ${tyyppi}: nimen reunoilla on välilyönti`,
      );
      assert.ok(
        aarre.name.length <= NIMEN_KATTO,
        `${iso} ${tyyppi}: nimi ${aarre.name.length} merkkiä — paljastuskortin otsikko hajoaa`,
      );
      assert.equal(typeof aarre.fakta, 'string', `${iso} ${tyyppi}: fakta ei ole teksti`);
      const pituus = aarre.fakta.trim().length;
      assert.ok(pituus > 0, `${iso} ${tyyppi}: fakta on tyhjä`);
      assert.ok(
        pituus <= FAKTAN_KATTO,
        `${iso} ${tyyppi}: fakta ${pituus} merkkiä (katto ${FAKTAN_KATTO}) — lyhennä`,
      );
    }
  }
});

test('avaimet ovat pelin omia ISO3-maakoodeja', () => {
  for (const iso of Object.keys(PAIKALLISAARTEET)) {
    assert.match(iso, /^[A-Z]{3}$/, `${iso}: avaimen pitää olla ISO3-koodi`);
    assert.ok(
      PELIN_MAAT.has(iso),
      `${iso}: yhdelläkään laudan kaupungilla ei ole tätä maata — pari ei näkyisi pelissä`,
    );
  }
});

test('jokaisella Euroopan laudan maalla on oma pari', () => {
  const puuttuvat = [...new Set(Object.values(EUROPE_CITY_COUNTRY))]
    .filter((iso) => !PAIKALLISAARTEET[iso]);
  assert.deepEqual(puuttuvat, [], 'Euroopan lauta on kirjoitettu — uusi maa tarvitsee parin');
});

test('sama maa ei ole taulussa kahdesti', () => {
  const tuplat = kaksoisavaimet(readFileSync(LAHDE, 'utf8'));
  assert.deepEqual(tuplat, [], 'kaksoisavain: jälkimmäinen voittaa hiljaa');
});

test('taru on merkitty taruksi', () => {
  for (const [iso, nimi] of Object.entries(TARUT)) {
    const aarre = PAIKALLISAARTEET[iso]?.isoAarre;
    assert.ok(aarre, `${iso}: taruaarre puuttuu`);
    assert.equal(aarre.name, nimi, `${iso}: taruaarteen nimi vaihtui — tarkista merkintä`);
    const teksti = aarre.fakta.toLowerCase();
    assert.ok(
      TARUSANAT.some((sana) => teksti.includes(sana)),
      `${iso}: legendaa ei ole merkitty legendaksi (${TARUSANAT.join(', ')})`,
    );
  }
});

test('paikallisaarre palauttaa parin vain paikallisaarteille', () => {
  assert.equal(paikallisaarre('pieniAarre', 'FIN')?.name, PAIKALLISAARTEET.FIN.pieniAarre.name);
  assert.equal(paikallisaarre('isoAarre', 'ITA')?.name, PAIKALLISAARTEET.ITA.isoAarre.name);
  assert.equal(paikallisaarre('star', 'FIN'), null);
  assert.equal(paikallisaarre('mannerAarre', 'FIN'), null);
  assert.equal(paikallisaarre('pieniAarre', 'ZZZ'), null);
  assert.equal(paikallisaarre('pieniAarre', null), null);
});
