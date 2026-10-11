/*
 * PULLA ON TURVAVERKKO MYÖS SÄHKEKAUPUNGISSA (PT 11.10.2026, aloituskaupunkien tarkistus).
 *
 * Tukholman vihreä piste avaa sähketehtävän eikä kohtaamista. Pullaa ei tarjottu siellä, joten yksi väärä vastaus
 * lehden aarrekysymykseen lukitsi aarteen (Ruotsissa ei ole karttavisaa). Väärä vastaus → pulla → piste auki.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { Game, PULLA_HINTA } from '../js/game.js';
import { packById } from '../js/pack.js';
import { FOKUSVIRRAT } from '../js/packs/fokusvirrat.js';
import { fokusAarreAvattu, fokusAarreVastattu, pullaTarjolla } from '../js/fokustehtavat.js';
import { AARREPISTEEN_LUKKOVIESTI } from '../js/fokusvirta.js';

function peli(start) {
  return new Game({ pack: packById('maailmankartta'), players: [{ name: 'A', color: '#f00', start }], seed: 7 });
}

/** Kaikkiin kaupungin aarteen avaajiin vastattu väärin (vastattu, ei oikein). */
function vastaaVaarin(game, cityId) {
  const avaimet = [...(FOKUSVIRRAT[cityId].lehtitehtavat ?? []).map((t) => t.id), 'kulttuurivisa'];
  for (const id of avaimet) game.minitehtavatVastatut.add(`${game.pack.id}:${cityId}:fokus:${id}`);
}

for (const cityId of ['tukholma', 'ateena', 'pariisi']) {
  test(`${cityId}: väärä vastaus → pulla tarjolla → osto avaa aarrepisteen`, () => {
    const game = peli(cityId);
    const ui = { game };
    const city = game.board.cityById.get(cityId);
    vastaaVaarin(game, cityId);
    assert.equal(fokusAarreVastattu(ui, city), true, 'kaikkiin avaajiin on vastattu');
    assert.equal(fokusAarreAvattu(ui, city), false, 'väärä vastaus ei avaa pistettä');
    assert.equal(pullaTarjolla(ui, city), true, 'pulla on turvaverkko eikä aarre lukitu');
    game.player.money = Math.max(game.player.money, PULLA_HINTA);
    assert.equal(game.actionPullaOstos(`${game.pack.id}:${cityId}`).ok, true);
    assert.equal(fokusAarreAvattu(ui, city), true, 'ostettu pulla avaa pisteen');
    assert.equal(pullaTarjolla(ui, city), false, 'samaa pullaa ei myydä kahdesti');
  });
}

test('lukitun pisteen viesti ohjaa kaupunkilehteen (Kreikassa ei ole karttavisoja)', () => {
  assert.equal(AARREPISTEEN_LUKKOVIESTI, 'Ratkaise kysymys kaupunkilehdestä.');
});
