import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { Game, STRANDED_AID, mulberry32 } from '../js/game.js';

const UI = readFileSync(new URL('../js/ui.js', import.meta.url), 'utf8');

test('pankkiapu saa vakaan tilannetunnisteen mutta muut aid-tapahtumat eivät', () => {
  const game = new Game({
    players: [
      { name: 'A', color: '#f00', start: 'tanger' },
      { name: 'B', color: '#00f', start: 'kairo' },
    ],
    rng: mulberry32(7),
  });
  game.player.money = 0;
  game.player.pos = { type: 'city', city: 'sansibar' };
  game.beginTurn();

  assert.equal(game.player.money, STRANDED_AID);
  const pankkiapu = game.takeEvents().find((event) => event.kind === 'aid');
  assert.equal(pankkiapu?.tilanne, 'peli.vararikko.pankkiapu');

  game.emit('aid', 'Tavallinen rahapalkkio', { icon: 'kukkaro' });
  assert.equal(game.takeEvents()[0].tilanne, undefined);
});

test('aarteen ilo laukeaa kuvan nousussa tasan kerran kummallakin liikepolulla', () => {
  const paljastus = UI.slice(UI.indexOf('  async playTokenReveal('), UI.indexOf('  async naytaPolloAarre('));
  const kohta = paljastus.slice(paljastus.indexOf('    if (this.reducedMotion)'), paljastus.indexOf('    overlay.remove();'));
  const kutsut = kohta.match(/ilmoitaLivianTunne\(/g) ?? [];
  assert.equal(kutsut.length, 2, 'yksi kutsupaikka reducedMotion- ja yksi animaatiopolulle');
  assert.equal((kohta.match(/if \(onAarre\(type\)\)/g) ?? []).length, 2);
  assert.equal((kohta.match(/tunne: 'ilo', voimakkuus: 0\.8/g) ?? []).length, 2);
  assert.match(kohta, /pohja\.classList\.add\('shown'\);\s*\n\s*kuvaEl\?\.classList\.add\('shown'\);\s*\n\s*if \(onAarre\(type\)\)/);
});

test('pankkiapu reagoi vain vakaaseen metadataan tapahtumakuplan hetkellä', () => {
  const kohta = UI.slice(UI.indexOf('  async playEvents()'), UI.indexOf('  async naytaTietajaNousut()'));
  assert.match(kohta, /const box = this\.buildToast\(event\);\s*\n\s*if \(event\.tilanne === 'peli\.vararikko\.pankkiapu'\)/);
  assert.match(kohta, /tunne: 'lammin', voimakkuus: 0\.5/);
  assert.doesNotMatch(kohta, /event\.text/);
});

test('laukun tunteet seuraavat vain todellisia avaus- ja sulkusiirtymiä', () => {
  const avaus = UI.slice(UI.indexOf('  openPassport()'), UI.indexOf('  suljeLaukku()'));
  assert.match(avaus, /const avautuu = !this\.passportDialog\.open;/);
  assert.match(avaus, /if \(avautuu\) \{[\s\S]*tunne: 'utelias', voimakkuus: 0\.4[\s\S]*tunnus: 'laukku\.auki'/);

  const sulkusiivous = UI.slice(
    UI.indexOf("this.passportDialog?.addEventListener('close'"),
    UI.indexOf("this.passportDialog?.addEventListener('close'") + 1400,
  );
  assert.match(sulkusiivous, /if \(!this\.dead\)/);
  assert.match(sulkusiivous, /tunne: 'lammin', voimakkuus: 0\.3/);
  assert.match(sulkusiivous, /tunnus: 'laukku\.kiinni'/);
});
