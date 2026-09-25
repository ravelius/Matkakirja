/*
 * KOHTAAMISTEN TUNNETAGIT (omistajan prioriteetti 11.9.2026: *"Pulu
 * valmiiksi kaikissa pelitilanteissa"*; docs/pulu-reaktiot.md osa-alue
 * E2 ja toteutusohjeen kohdat 2–3).
 *
 * Neljä lupausta, jotka eivät saa rikkoutua hiljaa:
 *   1. KATTAVUUS: jokaisella js/packs/kohtaamiset.js -kohtaamisella on
 *      kaikki neljä tunnekenttää (tervehdys, löytö, tyhjä, väärin), ja
 *      jokaisella KAARI_PAKETIT-kohteella tunnetagi kummallekin
 *      tekstilleen (kohtaaminen, aarre). Rekisteri sallisi kenttien
 *      puuttua, mutta omistajan linjaus on täysi kattavuus — puuttuva
 *      kenttä tarkoittaisi mykkää pulua kesken kohtaamisen.
 *   2. TUNNE ON SALLITTU: nimi luetaan js/livia-tilanteet.js:n
 *      LIVIAN_TUNTEET-taulusta, joka on pelin ainoa tunnerekisteri
 *      (kirjoitusvirhe kelpaisi dataan mutta ei koskaan laukaisisi
 *      elettä — livianTunnetaginTiedot palauttaisi null).
 *   3. VOIMAKKUUS ON VÄLILLÄ 0 < v ≤ 1 — sama sääntö kuin
 *      luentareaktioilla (tests/luentareaktiot.test.mjs): nolla olisi
 *      eleetön tagi, ykköstä suurempi rajautuisi hiljaa clampissa.
 *   4. REKISTERIN POIKKEUSTAULUKKO TÄSMÄÄ: E2:n taulukossa luetellut
 *      tervehdykset ja sodan varjossa olevat kaarikaupungit on
 *      kirjattu sisältöön juuri niillä arvoilla, jotka rekisterissä
 *      lukevat. Näin dokumentti ja data eivät eriydy vaivihkaa.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { LIVIAN_TUNTEET, livianTunnetaginTiedot } from '../js/livia-tilanteet.js';
import { KOHTAAMISET } from '../js/packs/kohtaamiset.js';
import { KAARI_PAKETIT } from '../js/tyohuone-kehitys-data.js';

const SALLITUT = Object.keys(LIVIAN_TUNTEET);

/* Rekisterin poikkeukset tervehdyksen oletustagiin (docs/pulu-reaktiot.md,
 * E2:n taulukko "Poikkeukset tervehdyksen oletustagiin"). */
const TERVEHDYS_POIKKEUKSET = {
  venetsia: ['rakkaus', 0.55],
  kairo: ['jannitys', 0.6],
  madrid: ['miettiva', 0.5],
  berliini: ['lammin', 0.6],
  lontoo: ['utelias', 0.55],
  dubrovnik: ['utelias', 0.5],
  odessa: ['lammin', 0.5],
  tukholma: ['ylpea', 0.5],
};

/* Sodan varjossa olevat kaarikaupungit (sama taulukko, viimeinen rivi). */
const SODAN_VARJO = ['kiova', 'odessa', 'varsova', 'sarajevo'];

function tarkistaTagi(tagi, mista) {
  assert.ok(tagi && typeof tagi === 'object', `${mista}: tunnetagi puuttuu`);
  assert.ok(
    SALLITUT.includes(tagi.tunne),
    `${mista}: tuntematon tunne "${tagi.tunne}" (sallitut: ${SALLITUT.join(', ')})`,
  );
  assert.equal(typeof tagi.voimakkuus, 'number', `${mista}: voimakkuus ei ole luku`);
  assert.ok(
    tagi.voimakkuus > 0 && tagi.voimakkuus <= 1,
    `${mista}: voimakkuus ${tagi.voimakkuus} ei ole välillä 0 < v ≤ 1`,
  );
  // Kaksi desimaalia enintään — kolmas desimaali olisi näennäistarkkuutta.
  assert.equal(
    Math.round(tagi.voimakkuus * 100) / 100, tagi.voimakkuus,
    `${mista}: voimakkuudessa yli kaksi desimaalia`,
  );
  // Moottorin oma lukija hyväksyy tagin eikä hylkää sitä hiljaa.
  assert.ok(livianTunnetaginTiedot(tagi), `${mista}: livianTunnetaginTiedot hylkäsi tagin`);
}

const KENTAT = [
  ['tunneTervehdys', 'tervehdys'],
  ['tunneLoyto', 'loyto'],
  ['tunneTyhja', 'tyhja'],
  ['tunneVaarin', 'vaarin'],
];

test('jokaisella kohtaamisella on neljä kelvollista tunnetagia', () => {
  const kaupungit = Object.keys(KOHTAAMISET);
  assert.ok(kaupungit.length >= 8, 'kohtaamisia pitäisi olla vähintään kahdeksan');
  for (const kaupunki of kaupungit) {
    const k = KOHTAAMISET[kaupunki];
    for (const [kentta, teksti] of KENTAT) {
      assert.ok(k[teksti], `${kaupunki}: repliikki ${teksti} puuttuu`);
      tarkistaTagi(k[kentta], `KOHTAAMISET.${kaupunki}.${kentta}`);
    }
  }
});

test('kohtaamisten löytö, tyhjä ja väärin pitävät rekisterin oletukset', () => {
  for (const [kaupunki, k] of Object.entries(KOHTAAMISET)) {
    assert.deepEqual(
      k.tunneLoyto, { tunne: 'ilo', voimakkuus: 0.7 },
      `${kaupunki}: löytö on pelin suuri hetki (rekisteri: ilo 0,7)`,
    );
    assert.deepEqual(
      k.tunneTyhja, { tunne: 'miettiva', voimakkuus: 0.45 },
      `${kaupunki}: tyhjä kätkö ei moiti oikeaa vastausta (rekisteri: miettiva 0,45)`,
    );
    assert.deepEqual(
      k.tunneVaarin, { tunne: 'hammentynyt', voimakkuus: 0.4 },
      `${kaupunki}: väärä vastaus on sama tagi kuin aarre.vastaus.vaarin`,
    );
  }
});

test('rekisterin poikkeustaulukko täsmää kohtaamisten tervehdyksiin', () => {
  for (const [kaupunki, [tunne, voimakkuus]] of Object.entries(TERVEHDYS_POIKKEUKSET)) {
    const k = KOHTAAMISET[kaupunki];
    if (!k) continue; // kaupunki voi elää vain tarinakaaressa
    assert.deepEqual(
      k.tunneTervehdys, { tunne, voimakkuus },
      `${kaupunki}: tervehdyksen tagi eroaa docs/pulu-reaktiot.md:n E2-taulukosta`,
    );
  }
});

test('jokaisella kaarikohteella on tunnetagi kohtaamiselle ja aarteelle', () => {
  const kohteet = KAARI_PAKETIT.kohteet;
  assert.ok(kohteet.length >= 41, 'kaarikohteita pitäisi olla vähintään 41');
  for (const kohde of kohteet) {
    if (kohde.kohtaaminen) {
      tarkistaTagi(kohde.tunneKohtaaminen, `KAARI_PAKETIT ${kohde.id}.tunneKohtaaminen`);
    }
    if (kohde.aarre) {
      tarkistaTagi(kohde.tunneAarre, `KAARI_PAKETIT ${kohde.id}.tunneAarre`);
    }
  }
});

test('sodan varjossa olevien kaarikaupunkien kohtaaminen on vakava', () => {
  for (const tunnus of SODAN_VARJO) {
    const kohde = KAARI_PAKETIT.kohteet.find((k) => k.id === tunnus);
    assert.ok(kohde, `kaarikohde ${tunnus} puuttuu`);
    assert.deepEqual(
      kohde.tunneKohtaaminen, { tunne: 'vakava', voimakkuus: 0.55 },
      `${tunnus}: rekisteri (E2/E3) vaatii vakavan tagin sodan varjossa`,
    );
  }
});

test('kaaren aarremerkinnän oletus on vakava 0,55 ja poikkeuksia on vähän', () => {
  const kohteet = KAARI_PAKETIT.kohteet.filter((k) => k.aarre);
  const oletuksella = kohteet.filter(
    (k) => k.tunneAarre.tunne === 'vakava' && k.tunneAarre.voimakkuus === 0.55,
  );
  // Aarremerkintä on isoisän myöhempi sivu: oletus on vakava (rekisteri,
  // toteutusohjeen kohta 2). Jos poikkeuksia karkaisi enemmistöksi, oletus
  // olisi valittu väärin — silloin rekisteri on päivitettävä eikä testi.
  assert.ok(
    oletuksella.length > kohteet.length / 2,
    `aarretageista vain ${oletuksella.length}/${kohteet.length} on oletuksella`,
  );
});
