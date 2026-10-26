// SAAPUMISEN VARATEKSTI POIS (omistaja 6.10.2026: "Nuo varatekstit kannattaa poistaa koko pelistä. Se kuulostaa
// vaaralliselta, että siellä on roikkumassa tälläisiä tekstejä. Voivat äkkiä vain sotkea asioita."). Kun kaupungilla ei
// ole omaa merkintää, saapuminen etenee ilman varatekstiä: ei paikkatiedon ensimmäistä virkettä luentoineen eikä arvottua
// paikkatietoa saapumiskorttiin. Paikkatiedot-kokoelma jää (reitin "Matkalla — X" -havainnot käyttävät sitä).
// Vika toistetaan ensin: renderFactin saapumishaara käytti placeFacts-varaa.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const ui = readFileSync(new URL('../js/ui.js', import.meta.url), 'utf8');
const alku = ui.indexOf('const saapuminen = game.arrivalFact;');
const saapumishaara = ui.slice(alku, ui.indexOf('const player = game.player;', alku));

test('renderFactin saapumishaara ei käytä paikkatietoa varatekstinä', () => {
  assert.ok(alku > 0, 'saapumishaara löytyy');
  assert.doesNotMatch(saapumishaara, /placeFacts/, 'toisto: saapuminen käytti paikkatietoa varatekstinä');
  assert.doesNotMatch(saapumishaara, /aloitaHavainto|HAVAINTOLUENNAT/, 'toisto: varatekstin luenta');
});

test('reitin havainnot (Matkalla — X) käyttävät yhä paikkatietoja', () => {
  assert.match(ui, /Matkalla — \$\{city\.name\}/);
});
