/*
 * HIOMASSA-LINSSI JA OPTIKON HYVITYS (omistaja 21.9.2026; Raamatun loki
 * "HIOMASSA-LINSSI JA OPTIKON HYVITYS: MEKANIIKKA HYVAKSYTTY").
 *
 * Linssi on kaupungin ISON paikallisaarteen kylkiäinen: aarteen raha
 * pysyy, linssi myönnetään lisäksi. Keskeneräinen (rekisterissä
 * `tila: 'hiomassa'`) linssi tuo optikon hyvityksen kerran per linssi
 * eikä tietäjäpisteitä; kun rekisterin rivi valmistuu, linssi on jo
 * omistettu (passi + player.linssit) ja herää itsestään. Kehittäjätila
 * ei myönnä hiomassa-linssejä.
 *
 * LINSSIAARTEET-tuotantotaulun sisältö (rengas 1, 21 riviä) on
 * vartioitu erikseen (tests/linssiaarteet.test.mjs); tämä testi antaa
 * mekaniikalle oman taulunsa `game.linssiAarteet` ja lisää rekisteriin
 * testilinssin.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { Game } from '../js/game.js';
import { LINSSIT } from '../js/linssit/rekisteri.js';
import { LINSSIAARTEET, linssiAarteesta } from '../js/linssit/aarteet.js';
import {
  HYVITYS_ETULIITE, LEIMA_ETULIITE, NAHTY_ETULIITE, OPTIKON_HYVITYS,
  hiomassa, hiomassaNimi, hiomassaOlevat, hyvitaHiomassa, merkitseNahdyksi, omistetut, valmistuneet,
} from '../js/linssit/omistus.js';
import { STAMP_KEY } from '../js/passport.js';
import { ISO_AARRE_ARVO } from '../js/tokens.js';

/* localStorage passia varten (js/passport.js lukee globalThis.localStorage). */
const muisti = new Map();
globalThis.localStorage = {
  getItem: (k) => muisti.get(k) ?? null,
  setItem: (k, v) => muisti.set(k, String(v)),
  removeItem: (k) => muisti.delete(k),
};
const leimat = () => JSON.parse(muisti.get(STAMP_KEY) ?? '{}');

const TESTIRIVI = { tunnus: 'testilinssi', manner: null, tila: 'hiomassa', nimi: 'Testilinssi', ikoni: 'assets/linssit/testilinssi.png' };
const TAULU = { timbuktu: 'testilinssi' };

function peli() {
  muisti.clear();
  const game = new Game({
    players: [{ name: 'A', color: '#f00', start: 'tanger' }],
    rng: () => 0.5,
  });
  game.polloLoydetty = true;
  game.linssiAarteet = TAULU;
  game.player.pos = { type: 'city', city: 'timbuktu' };
  return game;
}

test.beforeEach(() => { if (!LINSSIT.includes(TESTIRIVI)) LINSSIT.push(TESTIRIVI); TESTIRIVI.tila = 'hiomassa'; });
test.after(() => { const i = LINSSIT.indexOf(TESTIRIVI); if (i >= 0) LINSSIT.splice(i, 1); });

test('linssiAarteesta: vain iso aarre antaa linssin, annettu taulu ohittaa tuotantotaulun', () => {
  assert.ok(!('timbuktu' in LINSSIAARTEET), 'testikaupunki ei ole tuotantotaulussa');
  assert.equal(linssiAarteesta('timbuktu', 'isoAarre', TAULU), 'testilinssi');
  assert.equal(linssiAarteesta('timbuktu', 'pieniAarre', TAULU), null);
  assert.equal(linssiAarteesta('timbuktu', 'mannerAarre', TAULU), null);
  assert.equal(linssiAarteesta('kairo', 'isoAarre', TAULU), null);
});

test('iso aarre antaa hiomassa-linssin: raha pysyy, hyvitys 500 kerran, ei tietäjäpisteitä', () => {
  const game = peli();
  const p = game.player;
  const rahat = p.money;
  const xp = p.xp ?? 0;
  game.tokens.set('timbuktu', 'isoAarre');
  game.revealToken('timbuktu');
  const saatu = p.money - rahat;
  assert.ok(saatu >= ISO_AARRE_ARVO.min + OPTIKON_HYVITYS && saatu <= ISO_AARRE_ARVO.max + OPTIKON_HYVITYS,
    `aarre + hyvitys yhteensä ${saatu}`);
  assert.ok(p.linssit.includes('testilinssi'), 'linssi player.linssit-listaan');
  assert.ok(leimat()[`${LEIMA_ETULIITE}testilinssi`], 'passileima linssistä');
  assert.equal(leimat()[`${LEIMA_ETULIITE}testilinssi`].label, 'Testilinssi', 'leima rekisterin nimellä');
  assert.ok(leimat()[`${HYVITYS_ETULIITE}testilinssi`], 'hyvitys kirjattu passiin');
  assert.equal(p.xp ?? 0, xp, 'hyvitys ei anna tietäjäpisteitä');
  assert.ok(hiomassaOlevat(game).includes('testilinssi'), 'laukun harmaa rivi näkee linssin');
  const kupla = game.events.find((t) => t.tilanne === 'peli.linssi.hiomassa');
  assert.ok(kupla, 'aid-kupla hiomassa-linssistä');
  assert.equal(kupla.hyvitys, OPTIKON_HYVITYS);
  assert.equal(kupla.linssi, 'testilinssi');
  assert.match(kupla.sub, /Optikko hioo vielä tätä linssiä.*500 puntaa hyvitystä/);
  // Toinen löytö (uusi peli, sama passi): ei hyvitystä uudestaan.
  const game2 = new Game({ players: [{ name: 'B', color: '#00f', start: 'tanger' }], rng: () => 0.5 });
  game2.polloLoydetty = true;
  game2.linssiAarteet = TAULU;
  game2.player.pos = { type: 'city', city: 'timbuktu' };
  const rahat2 = game2.player.money;
  game2.tokens.set('timbuktu', 'isoAarre');
  game2.revealToken('timbuktu');
  const saatu2 = game2.player.money - rahat2;
  assert.ok(saatu2 >= ISO_AARRE_ARVO.min && saatu2 <= ISO_AARRE_ARVO.max, `toinen kerta: vain aarre (${saatu2})`);
  assert.equal(hyvitaHiomassa(game2, game2.player, 'testilinssi'), 0, 'hyvitys vain kerran');
});

test('rekisterin rivin valmistuminen herättää linssin: omistus säilyy, valmistui-merkki kerran', () => {
  const game = peli();
  game.tokens.set('timbuktu', 'isoAarre');
  game.revealToken('timbuktu');
  assert.ok(hiomassa('testilinssi'));
  assert.equal(hiomassaNimi('testilinssi'), 'Testilinssi');
  assert.deepEqual(valmistuneet(game), [], 'hiomassa ollessaan ei valmistunut');
  // Optikko sai linssin valmiiksi: rivi avataan (tila pois).
  delete TESTIRIVI.tila;
  assert.ok(!hiomassa('testilinssi'));
  assert.ok(omistetut(game).has('testilinssi'), 'omistus ei kadonnut');
  assert.deepEqual(hiomassaOlevat(game), []);
  assert.deepEqual(valmistuneet(game), ['testilinssi'], 'valmistui-merkki kerran');
  merkitseNahdyksi('testilinssi');
  assert.ok(leimat()[`${NAHTY_ETULIITE}testilinssi`]);
  assert.deepEqual(valmistuneet(game), [], 'merkki kuitattu');
});

test('kehittäjätila ei myönnä hiomassa-linssejä', () => {
  const game = peli();
  muisti.set('matkakirja-kehittaja', '1');
  const omat = omistetut(game);
  assert.ok(!omat.has('testilinssi'), 'hiomassa-linssi ei tule kehittäjätilasta');
  assert.ok(omat.has('pallo'));
  muisti.delete('matkakirja-kehittaja');
});

test('hyvitys ei koske valmista linssiä eikä tuntematonta tunnusta', () => {
  const game = peli();
  assert.equal(hyvitaHiomassa(game, game.player, 'pallo'), 0);
  assert.equal(hyvitaHiomassa(game, game.player, 'olematon'), 0);
});
