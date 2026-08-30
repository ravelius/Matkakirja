// Erillislaudan siirto maailmankartalle (Raamattu 30.8.2026,
// "erillislaudasta luovutaan"): vanha tallennus, jossa peli on Euroopan
// erillislaudalla — tai vielä vanhempi yhden laudan Afrikka-peli — ei
// enää lataudu poistuneelle laudalle, vaan siirtyy maailmankartalle
// menettämättä etenemistä: laatat, aarteet, raha ja kaupunki säilyvät.

import test from 'node:test';
import assert from 'node:assert/strict';

import { Game } from '../js/game.js';
import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';

const MANNER = MAAILMANKARTTA.map.cityManner;

/** Euroopan erillislaudalle tallennettu peli, muodoltaan v2. */
function europeTallennus(muutokset = {}) {
  return {
    version: 2,
    packId: 'europe',
    roaming: true,
    seed: 5,
    rngCalls: 0,
    players: [{
      id: 0,
      name: 'Matkaaja',
      color: '#f00',
      isBot: false,
      start: 'lontoo',
      packId: 'europe',
      quizLevel: 'normal',
      money: 777,
      pos: { type: 'city', city: 'wien' },
      stars: 1,
      finds: ['pieniAarre', 'star'],
      findManner: [null, null],
      findMaa: [null, null],
      linssit: [],
      xp: 12,
      quizAsked: 5,
      quizCorrect: 4,
    }],
    worlds: {
      europe: {
        tokens: [['madrid', 'isoAarre'], ['praha', 'pieniAarre']],
        revealed: [['lontoo', 'pieniAarre'], ['pariisi', 'star']],
        visited: ['lontoo', 'pariisi', 'wien'],
        starsFound: [['europe', 'pariisi']],
      },
    },
    usedQuestions: [],
    current: 0,
    phase: 'roll',
    travelMode: null,
    autoTravel: false,
    pendingFare: 0,
    die: 3,
    quiz: null,
    duel: null,
    duelArmed: false,
    fokusvirrat: { 'europe:ateena': { vaihe: 'kortti' } },
    explored: ['europe:lontoo'],
    kulttuuriVastatut: ['europe:wien'],
    winnerId: null,
    turnCount: 7,
    log: [],
    ...muutokset,
  };
}

test('Euroopan laudan tallennus siirtyy maailmankartalle', () => {
  const game = Game.fromJSON(europeTallennus());
  assert.ok(game, 'tallennus kelpaa');

  // Pelaaja: sama kaupunki, sama raha, sama matkalaukku.
  const p = game.player;
  assert.equal(p.packId, 'maailmankartta');
  assert.deepEqual(p.pos, { type: 'city', city: 'wien' });
  assert.equal(p.money, 777);
  assert.equal(p.stars, 1);
  assert.deepEqual(p.finds, ['pieniAarre', 'star']);

  // Erillislaudan maailmaa ei enää ole; maailmankartta on.
  assert.equal(game.worlds.has('europe'), false);
  const world = game.worlds.get('maailmankartta');
  assert.ok(world, 'maailmankartan maailma rakentui');
  assert.equal(game.pack.id, 'maailmankartta');

  // Käännetyt laatat ja löydöt siirtyivät.
  assert.equal(world.revealed.get('lontoo'), 'pieniAarre');
  assert.equal(world.revealed.get('pariisi'), 'star');
  assert.equal(world.starsFound.get('europe'), 'pariisi');
  for (const city of ['lontoo', 'pariisi', 'wien']) {
    assert.ok(world.visited.has(city), `${city} on käyty`);
  }
  // Käännetyillä kaupungeilla ei ole enää laattaa laudalla.
  assert.equal(world.tokens.has('lontoo'), false);
  assert.equal(world.tokens.has('pariisi'), false);

  // Euroopan pääaarretta ei voi löytää toista kertaa: laudalla ei ole
  // yhtään piilotettua Euroopan mantereen tähtilaattaa.
  const eurooppalaisetTahdet = [...world.tokens]
    .filter(([city, type]) => type === 'star' && MANNER[city] === 'europe');
  assert.deepEqual(eurooppalaisetTahdet, []);

  // Lauta-avaimet siirtyivät maailmankartan avaimiksi.
  assert.ok(game.fokusvirrat['maailmankartta:ateena']);
  assert.equal(game.fokusvirrat['europe:ateena'], undefined);
  assert.ok(game.explored.has('maailmankartta:lontoo'));
  assert.ok(game.kulttuuriVastatut.has('maailmankartta:wien'));

  // Kesken jäänyt välitila (heittovuoro) alkaa puhtaalta pöydältä.
  assert.equal(game.phase, 'action');
  assert.equal(game.die, null);

  // Tallennus kirjoittuu jatkossa maailmankartan pelinä.
  const uudelleen = game.toJSON();
  assert.equal(uudelleen.packId, 'maailmankartta');
  assert.deepEqual(Object.keys(uudelleen.worlds), ['maailmankartta']);

  // Ja pyöreä matka säilyttää kaiken.
  const toinen = Game.fromJSON(uudelleen);
  assert.equal(toinen.player.pos.city, 'wien');
  assert.equal(toinen.worlds.get('maailmankartta').revealed.get('pariisi'), 'star');
  assert.equal(toinen.phase, 'action');
});

test('v1-muotoinen yhden laudan Afrikka-peli siirtyy maailmankartalle', () => {
  const game = Game.fromJSON({
    version: 1,
    seed: 3,
    rngCalls: 0,
    players: [{
      id: 0,
      name: 'Vanha matkaaja',
      color: '#00f',
      isBot: false,
      start: 'tanger',
      money: 250,
      pos: { type: 'city', city: 'kairo' },
      finds: ['star'],
      hasStar: true,
    }],
    tokens: [['mombasa', 'pieniAarre']],
    revealed: [['timbuktu', 'star']],
    starFound: true,
    starCity: 'timbuktu',
    current: 0,
    phase: 'action',
  });
  assert.ok(game, 'v1-tallennus kelpaa');
  const p = game.player;
  assert.equal(p.packId, 'maailmankartta');
  assert.equal(p.pos.city, 'kairo');
  assert.equal(p.money, 250);
  assert.equal(p.stars, 1, 'hasStar kääntyi laskuriksi');
  assert.equal(game.worlds.has('africa'), false);
  const world = game.worlds.get('maailmankartta');
  assert.equal(world.revealed.get('timbuktu'), 'star');
  assert.equal(world.starsFound.get('africa'), 'timbuktu');
  const afrikanTahdet = [...world.tokens]
    .filter(([city, type]) => type === 'star' && MANNER[city] === 'africa');
  assert.deepEqual(afrikanTahdet, []);
});

test('maailmankartan tallennus ei muutu siirrossa', () => {
  // Tavallinen nykytallennus: peli alkoi aloitusnäytöltä (maailma) ja
  // jatkuu maailmankartalla. Siirron ei pidä koskea siihen lainkaan.
  const pohja = new Game({
    players: [{ name: 'Nykyinen', color: '#0a0', start: null }],
    pack: { ...MAAILMANKARTTA },
    seed: 11,
  });
  pohja.phase = 'roll';
  const data = pohja.toJSON();
  const game = Game.fromJSON(data);
  assert.equal(game.phase, 'roll', 'välitila säilyy, kun siirtoa ei tarvita');
  assert.deepEqual([...game.worlds.keys()], ['maailmankartta']);
  assert.equal(game.rootPackId, 'maailmankartta');
});
