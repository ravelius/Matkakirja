// Kohdekartan mittakaavajana (js/packs/maakartat.js: mittakaava).
//
// Jana lasketaan rajauksesta eikä kirjoiteta käsin, joten testin
// tehtävä on vahtia kolmea asiaa:
//
//   1. jokainen kohdekartta saa janan, ja se on järkevän kokoinen —
//      liian lyhyt jana on koriste ja liian pitkä peittää kartan;
//   2. pituus on karttojen vakiosarjasta, ei mikä tahansa luku;
//   3. leveysaste otetaan huomioon, koska pituuspiirit kapenevat
//      pohjoiseen mentäessä.

import test from 'node:test';
import assert from 'node:assert/strict';

import { KAUPUNKIKARTAT, MAAKARTAT, mittakaava } from '../js/packs/maakartat.js';

const SALLITUT = new Set([
  50, 100, 200, 250, 500, 1000, 2000, 2500, 5000, 10000, 20000, 25000, 50000,
]);

test('jokainen kohdekartta saa mittakaavajanan', () => {
  for (const [avain, kartta] of Object.entries(KAUPUNKIKARTAT)) {
    const jana = mittakaava(kartta);
    assert.ok(jana, `${avain}: jana puuttuu`);
    assert.ok(SALLITUT.has(jana.metria), `${avain}: ${jana.metria} m ei ole vakiosarjasta`);
  }
});

test('jana on 15-35 % kartan leveydestä', () => {
  // Alle 15 % ei erotu janaksi, yli 35 % vie kuvasta liikaa. Sarjan
  // pyöreät luvut eivät osu neljäsosaan tarkalleen, ja se on oikein:
  // "700 m" olisi tarkempi mutta ei mittakaavajana.
  for (const [avain, kartta] of Object.entries(KAUPUNKIKARTAT)) {
    const { osuus, teksti } = mittakaava(kartta);
    assert.ok(
      osuus >= 15 && osuus <= 35,
      `${avain}: jana ${teksti} on ${osuus.toFixed(1)} % kartan leveydestä`,
    );
  }
});

test('teksti on suomea: metrit alle kilometrin, muuten pilkullinen km', () => {
  assert.equal(mittakaava({ rajat: { pohjoinen: 0.01, etela: 0, lansi: 0, ita: 0.018 } }).teksti, '500 m');
  const iso = mittakaava({ rajat: { pohjoinen: 0.1, etela: 0, lansi: 0, ita: 0.09 } });
  assert.equal(iso.teksti, '2,5 km');
  assert.ok(!iso.teksti.includes('.'), 'desimaalipiste ei kuulu suomeen');
});

test('leveysaste kaventaa janaa pohjoisessa', () => {
  // Sama asteleveys on päiväntasaajalla noin kaksi kertaa niin monta
  // kilometriä kuin 60. leveyspiirillä. Jos kosini unohtuu, Tromssan
  // kartta väittäisi olevansa kolme kertaa todellista leveämpi.
  const rajat = (lat) => ({ pohjoinen: lat + 0.02, etela: lat - 0.02, lansi: 0, ita: 0.05 });
  const paivantasaaja = mittakaava({ rajat: rajat(0) });
  const pohjoinen = mittakaava({ rajat: rajat(60) });
  assert.ok(
    pohjoinen.metria < paivantasaaja.metria,
    `60. leveyspiirillä janan pitäisi olla lyhyempi (${pohjoinen.metria} vs ${paivantasaaja.metria})`,
  );
});

test('laea-kartat eivät saa janaa', () => {
  // Maiden korkokartoissa mittakaava vaihtelee kuvan sisällä, joten
  // yksi jana valehtelisi reunoilla.
  const laea = Object.entries(MAAKARTAT).find(([, k]) => k.projektio === 'laea');
  if (!laea) return;
  assert.equal(mittakaava(laea[1]), null, `${laea[0]}: laea-kartalle ei saa laskea janaa`);
});
