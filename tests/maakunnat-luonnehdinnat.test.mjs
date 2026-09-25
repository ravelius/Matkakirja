import { test } from 'node:test';
import assert from 'node:assert/strict';
import { MAAKUNTIEN_LUONNEHDINNAT } from '../js/packs/maakunnat-luonnehdinnat.js';

const ODOTETUT_MAARAT = {
  FRA: 13,
  DEU: 16,
  ITA: 20,
  ESP: 19,
  GBR: 4,
  POL: 16,
  AUT: 9,
  GRC: 14,
  NLD: 15,
  BEL: 11,
  DNK: 5,
  SVK: 8,
  FIN: 18,
  EST: 15,
  LVA: 5,
  LTU: 10,
  SVN: 12,
  ROU: 42,
  CZE: 14,
  LUX: 3,
  MLT: 6,
  BGR: 28,
  HRV: 20,
  MNE: 21,
  SRB: 24,
  BIH: 18,
  MKD: 8,
  ALB: 12,
  CYP: 5,
  MDA: 39,
  UKR: 25,
  BLR: 7,
  ISL: 9,
  TUR: 81,
  RUS: 86,
};

/*
 * GRC lisättiin 25.9.2026 (Sisältökirjuri, löydös 115:n yhteydessä) ja
 * on vielä erässä 1 — vain `lyhyt`. `97 maakuntaa`-testi jäljempänä
 * koskee siis yhä vain alkuperäisiä 97 aluetta (7 maata), kunnes
 * GRC:n kuvat saapuvat kuvaputkelta ja se lasketaan mukaan. NLD, BEL,
 * DNK ja SVK lisättiin samana päivänä samalla tavalla (erä 1, vain
 * `lyhyt`), samoin FIN, EST, LVA, LTU ja SVN sekä erässä 3A MDA, UKR,
 * BLR ja ISL.
 */
const ERASSA_1 = new Set(['GRC', 'NLD', 'BEL', 'DNK', 'SVK', 'FIN', 'EST', 'LVA', 'LTU', 'SVN', 'ROU', 'CZE', 'LUX', 'MLT', 'BGR', 'HRV', 'MNE', 'SRB', 'BIH', 'MKD', 'ALB', 'CYP', 'MDA', 'UKR', 'BLR', 'ISL', 'TUR', 'RUS']);
const KUVATTU_VALMIIKSI = (iso) => !ERASSA_1.has(iso);

test('jokaisella maalla on odotettu määrä alueita', () => {
  for (const [iso, maara] of Object.entries(ODOTETUT_MAARAT)) {
    assert.ok(MAAKUNTIEN_LUONNEHDINNAT[iso], `${iso} puuttuu kokonaan`);
    const avaimet = Object.keys(MAAKUNTIEN_LUONNEHDINNAT[iso]);
    assert.equal(avaimet.length, maara, `${iso}: ${avaimet.length} aluetta, odotettu ${maara}`);
  }
});

/*
 * Erä 1 täyttää vain `lyhyt`. `pitka`, `kuva` ja `pulu` tulevat
 * myöhemmissä erissä eivätkä saa olla pakollisia vielä — testi
 * tarkistaa ne vain jos ne ovat olemassa.
 */
test('jokaisella alueella on ei-tyhjä lyhyt-teksti enintään 160 merkkiä', () => {
  for (const [iso, alueet] of Object.entries(MAAKUNTIEN_LUONNEHDINNAT)) {
    for (const [tunnus, alue] of Object.entries(alueet)) {
      const { lyhyt } = alue;
      assert.equal(typeof lyhyt, 'string', `${iso}:${tunnus} lyhyt puuttuu tai ei ole merkkijono`);
      assert.ok(lyhyt.trim().length > 0, `${iso}:${tunnus} lyhyt on tyhjä`);
      assert.ok(
        [...lyhyt].length <= 160,
        `${iso}:${tunnus} lyhyt on ${[...lyhyt].length} merkkiä, raja 160`,
      );
    }
  }
});

test('pitka, kuvat ja pulu ovat oikeaa muotoa kun ne on annettu', () => {
  for (const [iso, alueet] of Object.entries(MAAKUNTIEN_LUONNEHDINNAT)) {
    for (const [tunnus, alue] of Object.entries(alueet)) {
      if (alue.pitka !== undefined) {
        assert.equal(typeof alue.pitka, 'string', `${iso}:${tunnus} pitka ei ole merkkijono`);
        assert.ok(alue.pitka.trim().length > 0, `${iso}:${tunnus} pitka on tyhjä`);
      }
      if (alue.kuva !== undefined) {
        const kuvat = Array.isArray(alue.kuva) ? alue.kuva : [alue.kuva];
        assert.ok(kuvat.length > 0, `${iso}:${tunnus} kuva on tyhjä lista`);
        for (const [indeksi, kuva] of kuvat.entries()) {
          assert.equal(typeof kuva, 'object', `${iso}:${tunnus} kuva ${indeksi} ei ole olio`);
          for (const kentta of ['osoite', 'lahde', 'lisenssi', 'tekija']) {
            assert.ok(kuva[kentta], `${iso}:${tunnus} kuva ${indeksi}.${kentta} puuttuu`);
          }
        }
      }
      if (alue.pulu !== undefined) {
        assert.ok(Array.isArray(alue.pulu), `${iso}:${tunnus} pulu ei ole taulukko`);
        for (const rivi of alue.pulu) {
          assert.ok(rivi.q, `${iso}:${tunnus} pulu-rivin kysymys puuttuu`);
          assert.ok(rivi.a, `${iso}:${tunnus} pulu-rivin vastaus puuttuu`);
        }
      }
    }
  }
});

test('97 maakuntaa säilyttää Commons-kuvan ja saa vuoden 1873 havainnekuvan', () => {
  const osoitteet = new Set();
  let maara = 0;
  for (const [iso, alueet] of Object.entries(MAAKUNTIEN_LUONNEHDINNAT)) {
    if (!KUVATTU_VALMIIKSI(iso)) continue;
    for (const [tunnus, alue] of Object.entries(alueet)) {
      assert.ok(Array.isArray(alue.kuva), `${iso}:${tunnus} kuva ei ole lista`);
      assert.equal(alue.kuva.length, 2, `${iso}:${tunnus} kuvien määrä`);
      const [commons, havainnekuva] = alue.kuva;
      assert.match(commons.lahdeUrl ?? '', /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/,
        `${iso}:${tunnus} ensimmäinen kuva ei ole alkuperäinen Commons-kuva`);
      assert.equal(havainnekuva.havainnekuva, true, `${iso}:${tunnus} toinen kuva ei ole merkitty havainnekuvaksi`);
      assert.equal(havainnekuva.vuosi, 1873, `${iso}:${tunnus} havainnekuvan vuosi`);
      assert.match(havainnekuva.osoite,
        new RegExp(`^https://media\\.matkakirja\\.app/karttanostot/20260922/${iso}-[a-z0-9-]+-1873\\.jpg$`),
        `${iso}:${tunnus} havainnekuvan osoite`);
      assert.equal(havainnekuva.lahde, 'Matkakirjan havainnekuva vuodelta 1873');
      assert.equal(havainnekuva.lisenssi, 'Matkakirjan oma kuvitus');
      assert.ok(!osoitteet.has(havainnekuva.osoite), `${iso}:${tunnus} havainnekuvan osoite on kahdesti`);
      osoitteet.add(havainnekuva.osoite);
      maara += 1;
    }
  }
  assert.equal(maara, 97);
});
