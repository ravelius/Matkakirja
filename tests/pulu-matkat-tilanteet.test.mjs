import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { Game } from '../js/game.js';
import { packById } from '../js/pack.js';

const UI = readFileSync(new URL('../js/ui.js', import.meta.url), 'utf8');

test('jumissa ja uusi linssi kantavat vakaata emit-metadataa', () => {
  const jumissa = new Game({ players: [{ name: 'Fogg', color: '#123', start: 'marseille' }], pack: packById('maailmankartta'), seed: 1 });
  jumissa.phase = 'roll';
  jumissa.travelMode = 'sea';
  jumissa.rollDie = () => 1;
  const heitto = jumissa.actionRoll();
  assert.equal(heitto.moved, false);
  assert.deepEqual(jumissa.takeEvents().filter(({ kind }) => kind === 'stuck')
    .map(({ kind, tilanne }) => ({ kind, tilanne })),
  [{ kind: 'stuck', tilanne: 'matka.jumissa' }]);

  const linssi = new Game({ players: [{ name: 'Fogg', color: '#123', start: 'lontoo' }], pack: packById('maailmankartta'), seed: 1 });
  linssi.player.xp = 399;
  linssi.awardXp(linssi.player, 1);
  const tapahtuma = linssi.takeEvents().find(({ tilanne }) => tilanne === 'peli.linssi.avautui');
  assert.equal(tapahtuma?.kind, 'aid');
  assert.equal(typeof tapahtuma?.linssi, 'string');
});

test('UI reagoi vain vakaaseen jumissa-, linssi- ja pankkiapumetadataan', () => {
  const playEvents = UI.slice(UI.indexOf('async playEvents()'), UI.indexOf('async naytaTietajaNousut()'));
  for (const tunnus of ['peli.vararikko.pankkiapu', 'matka.jumissa', 'peli.linssi.avautui']) {
    assert.ok(playEvents.includes(`event.tilanne === '${tunnus}'`));
  }
  assert.doesNotMatch(playEvents, /event\.kind === 'aid'/);
});

test('maitse ja meritse reagoivat kerran vain kaupungista lähdettäessä', () => {
  const doMove = UI.slice(UI.indexOf('doMove(key)'), UI.indexOf('\n  doFly(destination)'));
  assert.match(doMove, /after: \(result\) => \{[\s\S]*?result\?\.ok && from\.type === 'city'/);
  assert.match(doMove, /matka\.kavely\.lahto/);
  assert.match(doMove, /matka\.laiva\.lahto/);
  assert.equal((doMove.match(/ilmoitaLivianTunne\(/g) ?? []).length, 1);
});

test('kelvollinen lento reagoi ennen flight-active-kalvoa', () => {
  const doFly = UI.slice(UI.indexOf('doFly(destination)'), UI.indexOf('\n  async animateFlight'));
  assert.match(doFly, /kelvollinenLento = !this\.busy && !this\.dead && game\.phase === 'action'[\s\S]*?game\.airportDestinations\(\)\.includes\(destination\)/);
  assert.match(doFly, /if \(kelvollinenLento\) \{[\s\S]*?matka\.lento\.lahto/);
  const tunne = doFly.indexOf("tunnus: 'matka.lento.lahto'");
  const kalvo = doFly.indexOf("classList.add('flight-active')");
  assert.ok(tunne > 0 && kalvo > tunne);
  assert.equal((doFly.match(/matka\.lento\.lahto/g) ?? []).length, 1);
});

test('aikataulu-, päivä- ja rahapalkkioreaktioita ei lisätty', () => {
  for (const tunnus of ['peli.aikataulu.merkinta', 'peli.ennatys.ohi', 'eteneminen.raha.nousi']) {
    assert.equal(UI.includes(`tunnus: '${tunnus}'`), false);
  }
});
