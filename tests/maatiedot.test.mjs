/*
 * MAALEHDEN TUNNUSLUVUT: JOKAISELLA MAALLA, JOLLA ON LEHTI, ON MYÖS RIVI.
 *
 * js/maalehti.js hakee tunnusluvut MAATIEDOT[laudan tunnus][maatunnus]
 * ja piilottaa koko laatikon, jos riviä ei ole. Vika on hiljainen:
 * mikään ei kaadu eikä lokiin tule mitään, kartan alta vain puuttuvat
 * väkiluku, pinta-ala, demokratiaindeksi ja tervehdykset. Juuri niin
 * kävi USA:lle, Kanadalle, Meksikolle, Brasilialle, Argentiinalle,
 * Perulle, Ecuadorille, Australialle ja Uudelle-Seelannille: maalehti
 * oli olemassa (MAA_KATEGORIAT), mutta Amerikoille ja Oseanialle ei
 * ollut yhtään maatietotaulua. Tämä testi tekee samasta puutteesta
 * äänekkään.
 *
 * Sama ansa uhkaa myös yhdistelmää: taulu voi olla olemassa mutta
 * jäädä kytkemättä js/sisaltotaulut.js:n KAIKKI_MAATIEDOTiin, jolloin
 * maailmankartan lauta ei näe siitä mitään.
 */
import { strict as assert } from 'node:assert';
import { test } from 'node:test';

import { MAATIEDOT } from '../js/sisaltotaulut.js';
import { MAA_KATEGORIAT } from '../js/packs/maa-kategoriat.js';

/*
 * Maat, joiden tunnusluvut ovat vielä tekemättä. Lista saa vain
 * lyhentyä: uutta maalehteä ei kirjoiteta ilman tunnuslukuja, mutta
 * jo olemassa olevia aukkoja ei kannata sulkea tyhjällä rivillä.
 * 6.9.2026 lista tyhjeni: viimeiset kuusi (BHR, IND, THA, VNM, IDN,
 * MYS) saivat rivinsä js/packs/asia-maatiedot.js:ään.
 *
 * 6.9.2026 (ilta): Uruguayn, Paraguayn ja Venezuelan maalehdet
 * kirjoitettiin, ja niiden tunnusluvut tehdään erikseen samalla
 * tools/kirjoita-maatiedot.mjs-työkalulla ja samasta aineistosta kuin
 * muutkin Amerikkojen rivit (js/packs/southamerica-maatiedot.js).
 * Siihen asti nämä kolme ovat odotuslistalla.
 */
/*
 * Oseanian uudet maalehdet (FJI, PNG, SLB) saivat aihesivunsa 6.9.2026,
 * mutta tunnusluvut kirjoitetaan omana eränään js/packs/
 * oceania-maatiedot.js:ään. Lista saa vain lyhentyä.
 */
/*
 * Väli-Amerikan uudet maalehdet (GTM, NIC, PAN) saivat aihesivunsa
 * 6.9.2026. Niiden tunnusluvut kirjoitetaan samalla
 * tools/kirjoita-maatiedot.mjs-työkalulla ja samasta aineistosta kuin
 * muutkin Pohjois-Amerikan rivit (js/packs/northamerica-maatiedot.js).
 * Lista saa vain lyhentyä.
 */
const VIELA_ILMAN_TUNNUSLUKUJA = new Set([
  'TLS',
  // Grönlanti ja Saint Helena eivät ole Maailmanpankin suvereenien
  // valtioiden aineistossa, Hongkong on rajattu sekä Maailmanpankin
  // maalistalta että V-Demin 172 valtion joukosta (maalehdet 6.9.2026):
  // sijaluvut eivät ole vertailukelpoisia, joten rivit odottavat
  // päätöstä vertailujoukosta.
  'GRL', 'SHN', 'HKG',
]);

const SIJA = /^\d+\.\/\d+$/;

/*
 * Pelin oma maatunnus poikkeaa ISO-koodista vain Etelä-Sudanissa
 * (kartta-aineiston SDS, ISO SSD), ja Our World in Data tuntee vain
 * ISO-koodin. Poikkeus on nimetty tässä, jottei linkkitarkistusta
 * tarvitse löysätä koko taulun osalta.
 */
const OWID_TUNNUS = { SDS: 'SSD' };

test('jokaisella maalehdellä on tunnusluvut maailmankartan laudalla', () => {
  const taulu = MAATIEDOT.maailmankartta;
  const puuttuvat = Object.keys(MAA_KATEGORIAT)
    .filter((iso) => !taulu[iso] && !VIELA_ILMAN_TUNNUSLUKUJA.has(iso));
  assert.deepEqual(puuttuvat, [], `MAATIEDOT-rivi puuttuu: ${puuttuvat.join(', ')}`);
});

test('odotuslistalla ei ole maita, joiden tunnusluvut ovat jo olemassa', () => {
  const turhat = [...VIELA_ILMAN_TUNNUSLUKUJA].filter((iso) => MAATIEDOT.maailmankartta[iso]);
  assert.deepEqual(turhat, [], `poista odotuslistalta: ${turhat.join(', ')}`);
});

test('jokaisella tunnuslukurivillä on pakolliset kentät ja tervehdys', () => {
  const taulu = MAATIEDOT.maailmankartta;
  const isot = Object.keys(taulu);
  assert.ok(isot.length > 80, `maita odotettua vähemmän: ${isot.length}`);
  for (const iso of isot) {
    const rivi = taulu[iso];
    for (const kentta of ['vakiluku', 'pintaAla']) {
      assert.equal(typeof rivi[kentta], 'string', `${iso}: ${kentta} puuttuu`);
      assert.ok(rivi[kentta].length > 0, `${iso}: ${kentta} on tyhjä`);
    }
    for (const kentta of ['vakilukuSija', 'pintaAlaSija']) {
      assert.match(rivi[kentta] ?? '', SIJA, `${iso}: ${kentta} väärässä muodossa`);
    }
    // Käyttöliittymä näyttää sijoituksen sellaisenaan, joten muoto on
    // osa aineistoa (sama tarkistus kuin tools/kirjoita-maatiedot.mjs).
    assert.ok(rivi.demokratia, `${iso}: demokratia puuttuu`);
    assert.match(rivi.demokratia.arvo ?? '', /^\d,\d+$/, `${iso}: demokratia.arvo väärässä muodossa`);
    assert.match(rivi.demokratia.sija ?? '', SIJA, `${iso}: demokratia.sija väärässä muodossa`);
    assert.ok(
      (rivi.demokratia.linkki ?? '').includes(`~${OWID_TUNNUS[iso] ?? iso}`),
      `${iso}: demokratia.linkki ei osoita tähän maahan`,
    );
    assert.ok(
      (rivi.demokratia.selitys ?? '').length > 80,
      `${iso}: demokratia.selitys puuttuu tai on liian lyhyt`,
    );
    assert.ok(rivi.keskitulo, `${iso}: keskitulo puuttuu`);
    assert.ok((rivi.keskitulo.arvo ?? '').length > 0, `${iso}: keskitulo.arvo puuttuu`);
    assert.match(rivi.keskitulo.sija ?? '', SIJA, `${iso}: keskitulo.sija väärässä muodossa`);
    assert.ok(
      Array.isArray(rivi.tervehdykset) && rivi.tervehdykset.length >= 1,
      `${iso}: tervehdyksiä ei ole yhtään`,
    );
    for (const t of rivi.tervehdykset) {
      for (const kentta of ['teksti', 'kieli', 'osuus']) {
        assert.ok(
          typeof t[kentta] === 'string' && t[kentta].length > 0,
          `${iso}: tervehdyksestä puuttuu ${kentta}`,
        );
      }
      /*
       * Lippu on vapaaehtoinen — js/maalehti.js piirtää sen vain jos se
       * on (Ukrainan venäjänkielinen tervehdys on tarkoituksella ilman).
       * Jos se on, se haetaan Commonsista tiedostonimellä, ja pääte
       * erottaa oikean nimen vahingossa jääneestä kuvauksesta.
       */
      if (t.lippu !== undefined) {
        assert.match(t.lippu, /\.(svg|png|jpg)$/i, `${iso}: lipun tiedostonimi näyttää väärältä`);
      }
    }
  }
});

test('mantereiden taulut ovat mukana maailmankartan yhdistelmässä', () => {
  // Yhdistelmä kootaan käsin js/sisaltotaulut.js:ssä, ja unohtunut
  // spread jättäisi koko mantereen tunnusluvut pois hiljaa.
  for (const iso of ['EGY', 'ITA', 'JPN', 'USA', 'BRA', 'AUS']) {
    assert.ok(MAATIEDOT.maailmankartta[iso], `${iso} puuttuu maailmankartan tauluista`);
    assert.ok(MAATIEDOT.maailma[iso], `${iso} puuttuu maailma-laudan tauluista`);
  }
});
