// Kartan tietokortit (Raamattu 2.203): suomenkielisen kaavan luvut ja välimuistin avaimet (tools/pollo/tietokortti.js).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { asukkaatTeksti, vakiluku, korttiAvain, tekstiAvain, pulunOhje } from '../tools/pollo/tietokortti.js';

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

test('Pulun ohje: vain lähteen faktat', () => {
  for (const p of [false, true]) assert.match(pulunOhje(p), /VAIN alla annetun lähdetekstin/);
});
