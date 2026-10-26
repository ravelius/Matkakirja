import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { Game, mulberry32 } from '../js/game.js';

const UI = readFileSync(new URL('../js/ui.js', import.meta.url), 'utf8');

// Pankin apu poistui (talouden vaihe 1, omistaja 27.9.2026): rahattomuus on varoitus.
test('rahattomuuden varoitus saa vakaan tilannetunnisteen mutta muut aid-tapahtumat eivät', () => {
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
  assert.equal(game.player.money, 0, 'pankki ei enää anna rahaa');
  game.veloitaPaivakulut();
  const varoitus = game.takeEvents().find((event) => event.kind === 'rahat');
  assert.equal(varoitus?.tilanne, 'peli.vararikko.varoitus');

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

test('rahattomuuden varoitus reagoi vain vakaaseen metadataan tapahtumakuplan hetkellä', () => {
  const kohta = UI.slice(UI.indexOf('  async playEvents()'), UI.indexOf('  async naytaTietajaNousut()'));
  assert.match(kohta, /const box = this\.buildToast\(event\);\s*\n\s*if \(event\.tilanne === 'peli\.vararikko\.varoitus'\)/);
  assert.match(kohta, /tunne: 'lammin', voimakkuus: 0\.5/);
  assert.doesNotMatch(kohta, /event\.text/);
});

/*
 * PÄIVITETTY 29.9.2026 (pillerivalikkouudistus, omistaja): isoisän
 * matkalaukku (#passport-dialog) on poistettu, ja "avautuu"-vartiointi
 * (ettei Livian tunne laukea turhaan, jos avaus kutsutaan uudelleen jo
 * auki olevana) siirtyi js/ui.js:stä js/main.js:n avaaValikko/
 * suljeValikko-funktioihin — #paavalikko on tavallinen `hidden`-
 * attribuutilla piilotettava elementti, ei <dialog>, joten sillä ei
 * ole omaa `.open`-tilaa kysyttäväksi. ui.js:n avaaPilleriValikko/
 * suljePilleriValikko luottavat siis kutsujan (main.js) vartiointiin;
 * tämä testi vartioi molempia puolia.
 */
test('laukun tunteet seuraavat vain todellisia avaus- ja sulkusiirtymiä', () => {
  const avaus = UI.slice(UI.indexOf('  avaaPilleriValikko()'), UI.indexOf('  suljePilleriValikko()'));
  assert.match(avaus, /tunne: 'utelias', voimakkuus: 0\.4[\s\S]*tunnus: 'laukku\.auki'/);

  const sulkusiivous = UI.slice(
    UI.indexOf('  suljePilleriValikko()'),
    UI.indexOf('  openPassport()'),
  );
  assert.match(sulkusiivous, /if \(!this\.dead\)/);
  assert.match(sulkusiivous, /tunne: 'lammin', voimakkuus: 0\.3/);
  assert.match(sulkusiivous, /tunnus: 'laukku\.kiinni'/);
});
