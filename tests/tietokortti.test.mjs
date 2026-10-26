// Kartan tietokortit (Raamattu 2.203): suomenkielisen kaavan luvut ja välimuistin avaimet (tools/pollo/tietokortti.js).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { asukkaatTeksti, vakiluku, korttiAvain, tekstiAvain, KARTAN_TIETOKORTTI_KEHOTE, tarkistaTeksti, LUE_LISAA, EI_LAHDETTA } from '../tools/pollo/tietokortti.js';

test('asukkaat kaavalla: noin, kaksi merkitsevää, tuhaterotin välilyönti, vuosi', () => {
  assert.equal(asukkaatTeksti({ maara: 183631, vuosi: '2021' }), 'noin 180 000 asukasta (2021)');
  assert.equal(asukkaatTeksti({ maara: 21469, vuosi: '2011' }), 'noin 21 000 asukasta (2011)');
  assert.equal(asukkaatTeksti({ maara: 536, vuosi: '2021' }), '536 asukasta (2021)');
  assert.equal(asukkaatTeksti({ maara: 1, vuosi: null }), '1 asukas');
  assert.equal(asukkaatTeksti(null), null);
});

test('väkiluku: ensisijainen voittaa, muuten uusin', () => {
  const c = (amount, vuosi, rank = 'normal') => ({ rank, mainsnak: { datavalue: { value: { amount: `+${amount}` } } },
    qualifiers: { P585: [{ datavalue: { value: { time: `+${vuosi}-01-01T00:00:00Z` } } }] } });
  assert.deepEqual(vakiluku({ claims: { P1082: [c(100, 2011), c(120, 2021)] } }), { maara: 120, vuosi: '2021', ensisijainen: false });
  assert.equal(vakiluku({ claims: { P1082: [c(100, 2011, 'preferred'), c(120, 2021)] } }).maara, 100);
  assert.equal(vakiluku({ claims: {} }), null);
});

test('välimuistin avaimet: sama paikka eri palasta = sama kortti, teksti kohteen tunnuksella', () => {
  assert.equal(korttiAvain({ nimi: 'Richmond ', lat: 51.4613, lon: -0.3037, luokka: 'town' }),
    korttiAvain({ nimi: 'richmond', lat: 51.4611, lon: -0.3041, luokka: 'town' }));
  assert.match(tekstiAvain('Q2500974', 'pitka'), /teksti:pitka:Q2500974$/);
});

test('Pulun kehote on Sisältökirjurin reseptin (2.2)', () => {
  assert.match(KARTAN_TIETOKORTTI_KEHOTE, /^VASTAUKSEN LAJI: KARTAN TIETOKORTTI/);
  assert.match(KARTAN_TIETOKORTTI_KEHOTE, /###LUE-LISÄÄ###/);
});

test('tarkistukset 2.4: muoto, sanat, luvut syötteessä, kielletyt', () => {
  const s = (n, sana = 'kylä') => Array.from({ length: n }, () => sana).join(' ') + '.';
  const syote = JSON.stringify({ nimi: 'Kylä', wikipedia: { teksti: 'kirkko valmistui vuonna 1889' } });
  assert.equal(tarkistaTeksti(EI_LAHDETTA, syote).ok, true);
  assert.equal(tarkistaTeksti(`${s(45)}\n${LUE_LISAA}\n${s(120)}`, syote).ok, true);
  assert.equal(tarkistaTeksti(s(30), syote).ok, true, 'niukka: pelkkä lyhyt ≥ 20 sanaa');
  assert.match(tarkistaTeksti(s(10), syote).syy, /lyhyt/);
  assert.match(tarkistaTeksti(`${s(44)} vuonna 1777.`, syote).syy, /luku/);
  assert.equal(tarkistaTeksti(`${s(44)} vuonna 1889.`, syote).ok, true);
  const en = JSON.stringify({ wikipedia: { teksti: 'The church dates from the 12th century.' } });
  assert.equal(tarkistaTeksti(`${s(44)} kirkko on 1100-luvulta.`, en).ok, true, 'vuosisata englannista');
  assert.match(tarkistaTeksti(`${s(40)} se on toiminut yli 580 vuotta.`, en).syy, /luku/);
  assert.match(tarkistaTeksti(`${s(44)} ihana.`, syote).syy, /sana/);
  assert.match(tarkistaTeksti(`${s(44)} (sulut).`, syote).syy, /merkit/);
});

import { laji, asukasluku, pituus, pintaAla, korkeus, vuosi, alarivi, faktarivit } from '../tools/pollo/tietokortti-kaava.js';

test('resepti 1.9: luvut, vuodet, laji ja alarivi', () => {
  const N = ' ';
  assert.equal(asukasluku(1, '2021'), '1 asukas (2021)');
  assert.equal(asukasluku(182700, '2021'), `noin 180${N}000 asukasta (2021)`);
  assert.equal(asukasluku(1482000, null), 'noin 1,5 miljoonaa asukasta');
  assert.equal(asukasluku(37400000, '2021'), 'noin 37 miljoonaa asukasta (2021)');
  assert.equal(asukasluku(1410000000, '2021'), 'noin 1,4 miljardia asukasta (2021)');
  assert.equal(asukasluku(0, '2021'), null);
  assert.equal(asukasluku(2345, '2021'), `noin 2${N}300 asukasta (2021)`);
  assert.equal(pituus(1230.4), `noin 1${N}230${N}km`);
  assert.equal(pituus(0.8), `800${N}m`);
  assert.equal(pintaAla(105.3), `noin 105${N}km²`);
  assert.equal(korkeus(4806.4), `4${N}806${N}m`);
  assert.equal(vuosi('+1889-00-00T00:00:00Z', 9), '1889');
  assert.equal(vuosi('+1100-00-00T00:00:00Z', 7), '1100-luvulla');
  assert.equal(vuosi('+1880-00-00T00:00:00Z', 8), '1880-luvulla');
  assert.equal(vuosi('-0052-00-00T00:00:00Z', 9), '52 eaa.');
  assert.equal(vuosi('+1000-00-00T00:00:00Z', 6), null);
  assert.equal(laji(['Q2977', 'Q41176']).nimi, 'Tuomiokirkko');
  assert.equal(laji(['Q515', 'Q5119']).nimi, 'Pääkaupunki');
  assert.equal(laji(['Q999999999']).nimi, 'Paikka');
  assert.equal(laji(['Q1234'], { Q1234: ['Q3957'] }).nimi, 'Pikkukaupunki', 'P279-ketju');
  assert.equal(alarivi('Kaupunki', []), 'Kaupunki');
  assert.equal(alarivi('Vuori', ['Ranska', 'Italia']), 'Vuori · Ranska, Italia');
  assert.equal(alarivi('Joki', ['a', 'b', 'c', 'd']), 'Joki · useita maita');
});

test('faktarivit: asutus, puuttuva pois, enintään viisi', () => {
  const q = (amount, unit) => ({ mainsnak: { datavalue: { value: { amount: `+${amount}`, unit: `http://www.wikidata.org/entity/${unit}` } } } });
  const e = { claims: {
    P1082: [{ rank: 'normal', mainsnak: { datavalue: { value: { amount: '+97124' } } }, qualifiers: { P585: [{ datavalue: { value: { time: '+2021-01-01T00:00:00Z' } } }] } }],
    P2046: [q(38.8, 'Q712226')], P571: [{ mainsnak: { datavalue: { value: { time: '+1030-00-00T00:00:00Z', precision: 7 } } } }],
  } };
  assert.deepEqual(faktarivit(e, { nimi: 'Kaupunki', ryhma: 'asutus' }),
    ['noin 97 000 asukasta (2021)', 'Pinta-ala: 38,8 km²', 'Perustettu: 1000-luvulla']);
  assert.deepEqual(faktarivit({ claims: {} }, { nimi: 'Paikka', ryhma: 'paikka' }), []);
});
