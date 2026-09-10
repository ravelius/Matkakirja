/*
 * PULUN TUNNETAGIT — 45 Euroopan kaupungin saapumiskommentti.
 *
 * Omistajan tilaus (Raamattu, PULUN REAKTIOREKISTERI): pulun eleen
 * pitää seurata sitä, mitä se juuri sanoo. Tagi on SISÄLLÖSSÄ
 * (js/packs/fokusvirta-*.js `pollo.tunne`), ei koodissa, ja rajapinta
 * on js/livia-tilanteet.js `ilmoitaLivianTunne`. Taulukko ja
 * perustelut: docs/pulu-reaktiot.md.
 *
 * MIKSI TÄMÄ TESTI ON. Tagi ei näy ruudulla eikä kaada mitään, jos se
 * katoaa tai kirjoitetaan väärin: väärä tunnenimi palauttaa vain
 * `null` (livianTunnetaginTiedot) ja pulu jää ilmeettömäksi. Kolme
 * vartiota: sisältö on olemassa ja sallittua, kytkentä on paikallaan,
 * eikä tagi vaikuta äänitteiden tiivisteisiin.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { LIVIAN_TUNTEET, livianTunnetaginTiedot } from '../js/livia-tilanteet.js';
import { FOKUSVIRRAT } from '../js/packs/fokusvirrat.js';
import {
  livianAaniAjanTasalla, livianKaupunkiIndeksi, livianKentanKuplat,
} from '../js/liviapuhe.js';

const KAUPUNGIT = Object.keys(FOKUSVIRRAT);
const LAHDE = readFileSync(new URL('../js/fokusvirta.js', import.meta.url), 'utf8');

/*
 * ISO TUNNE ON HARVINAINEN (toimituslinja, docs/pulu-reaktiot.md):
 * saapumiskommentti on huomio, ei suuri hetki. Voimakkuus ≥ 0,7 on
 * varattu Venetsian albumirepliikille — muut jäävät alle.
 */
const SUURI = new Set(['venetsia']);

test('jokaisella 45 kaupungilla on kelvollinen pulun tunnetagi', () => {
  assert.equal(KAUPUNGIT.length, 45, 'Euroopan fokusvirtapakkeja pitää olla 45');
  for (const id of KAUPUNGIT) {
    const tagi = FOKUSVIRRAT[id]?.pollo?.tunne;
    assert.ok(tagi, `${id}: pollo.tunne puuttuu`);
    assert.ok(Object.hasOwn(LIVIAN_TUNTEET, tagi.tunne),
      `${id}: tuntematon tunnetagi ${tagi.tunne}`);
    assert.equal(typeof tagi.voimakkuus, 'number', `${id}: voimakkuus ei ole luku`);
    assert.ok(tagi.voimakkuus >= 0 && tagi.voimakkuus <= 1,
      `${id}: voimakkuus ${tagi.voimakkuus} ei ole välillä 0–1`);
    assert.equal(tagi.voimakkuus >= 0.7, SUURI.has(id),
      `${id}: vain Venetsia saa yltää voimakkuuteen 0,7`);
    // Rajapinta hyväksyy tagin sellaisenaan — ele löytyy taulusta.
    const tiedot = livianTunnetaginTiedot(tagi);
    assert.ok(tiedot && tiedot.ele, `${id}: rajapinta ei tunnista tagia`);
  }
});

/*
 * KYTKENTÄ LÄHDEVARTIONA. Saapumiskuplan ketju odottaa luentaa,
 * paljastussarjaa ja ajastimia, joten DOM-testi joutuisi jäljittelemään
 * koko odotusketjun. Vartio lukee sen sijaan sen yhden kohdan, jossa
 * kupla oikeasti nousee ruudulle (sama kohta kuin Etsi aarre -napilla),
 * ja varmistaa, että tagi laukeaa kuplan ALUSSA — ennen puheenvuoroa.
 */
test('fokusvirta ilmoittaa tunnetagin kommenttikuplan alussa', () => {
  assert.match(LAHDE, /import \{[^}]*ilmoitaLivianTunne[^}]*\} from '\.\/livia-tilanteet\.js';/,
    'ilmoitaLivianTunne pitää tuoda js/livia-tilanteet.js:stä');
  const kutsu = LAHDE.indexOf("ilmoitaLivianTunne(tunnetagi, { lahde: 'fokusvirta', tunnus: city.id })");
  assert.ok(kutsu > 0, 'saapumiskuplasta puuttuu ilmoitaLivianTunne-kutsu');
  // Vain oma kommenttikenttä — ei maadoitus-varapolku eikä LIVIAN_SAAPUMISET.
  assert.match(LAHDE, /kentta === 'kommentti'\s*\n\s*\? fokusvirtaSisalto\(ui, city\)\?\.pollo\?\.tunne : null;/,
    'tagi saa laueta vain kommenttikentästä');
  // Kuplan alussa: kutsu on ENNEN polloPuheenvuoroa samassa lohkossa.
  const puheenvuoro = LAHDE.indexOf('polloPuheenvuoro(osat, {', kutsu - 2000);
  assert.ok(puheenvuoro > kutsu, 'tagin pitää laueta ennen puheenvuoron alkua');
});

/*
 * TIIVISTEET EIVÄT SAA LIIKKUA. Äänitteen portti vertaa kuplan tekstin
 * tiivistettä taulun arvoon (js/liviapuhe.js livianAaniAjanTasalla):
 * jos tunnetagi vuotaisi tekstiin, jokainen 45 kaupungin äänite
 * vaikenisi kerralla. Tämä testi ajaa saman portin läpi kaikki kuplat.
 */
test('tunnetagi ei muuta pulun äänitteiden tiivisteitä', () => {
  for (const id of KAUPUNGIT) {
    const kuplat = livianKentanKuplat(FOKUSVIRRAT[id], 'kommentti');
    assert.ok(kuplat.length, `${id}: kommenttikupla puuttuu`);
    kuplat.forEach((teksti, i) => {
      assert.ok(!teksti.includes(FOKUSVIRRAT[id].pollo.tunne.tunne)
        || !/tunne|voimakkuus/.test(teksti), `${id}: tagi vuoti kuplan tekstiin`);
      const indeksi = livianKaupunkiIndeksi(id, 'kommentti', i);
      assert.notEqual(indeksi, null, `${id}: kuplalla ${i} ei ole äänitepaikkaa`);
      assert.equal(livianAaniAjanTasalla(id, indeksi, teksti), true,
        `${id}-${indeksi + 1}: äänite ei ole enää ajan tasalla`);
    });
  }
});
