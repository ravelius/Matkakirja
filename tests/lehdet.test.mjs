/*
 * Kaupunki- ja maalehtien rakenne.
 *
 * Lehdet kirjoitetaan käsin ja agenttien avulla, kymmenen kaupunkia
 * kerrallaan, joten yksittäisen sivun unohtunut kenttä ei näy diffiä
 * lukemalla. Nämä testit ovat se kohta, jossa unohdus näkyy.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { Game } from '../js/game.js';
import { KULTTUURI_KATEGORIAT } from '../js/packs/kulttuuri-kategoriat.js';
import { MAA_KATEGORIAT } from '../js/packs/maa-kategoriat.js';

/** Minitehtävän ja kulttuurivisan yhteiset muotovaatimukset. */
function tarkistaTehtava(t, missa) {
  assert.equal(t.vaihtoehdot?.length, 4, `${missa}: vaihtoehtoja pitää olla neljä`);
  assert.equal(new Set(t.vaihtoehdot).size, 4, `${missa}: vaihtoehdot toistavat toisiaan`);
  assert.ok(Number.isInteger(t.oikea) && t.oikea >= 0 && t.oikea <= 3,
    `${missa}: oikea on indeksi 0–3, ei ${t.oikea}`);
  assert.ok(t.kysymys?.length > 0, `${missa}: kysymys puuttuu`);
  assert.ok(t.fakta?.length > 0, `${missa}: fakta puuttuu`);
  // Palkkion suuruus tulee mekanismista ja on jo ehtinyt muuttua kahdesti
  // saman päivän aikana. Tekstiin kirjoitettuna luku vanhenisi.
  for (const teksti of [t.kysymys, t.fakta, ...t.vaihtoehdot]) {
    assert.doesNotMatch(teksti, /\b(punta|puntaa|pistettä|palkkio)/i,
      `${missa}: teksti ei saa mainita palkkiota — peli lisää sen itse`);
  }
}

test('kaupunkilehden jokaisella aihesivulla on minitehtävä', () => {
  for (const [kaupunki, sivut] of Object.entries(KULTTUURI_KATEGORIAT)) {
    for (const sivu of sivut) {
      if (sivu.id === 'kaupunki') continue;
      assert.ok(sivu.tehtava, `${kaupunki}/${sivu.id}: aihesivulta puuttuu minitehtävä`);
      tarkistaTehtava(sivu.tehtava, `${kaupunki}/${sivu.id}`);
    }
  }
});

test('kannella ei ole minitehtävää — siellä on jo kulttuurivisa', () => {
  for (const [kaupunki, sivut] of Object.entries(KULTTUURI_KATEGORIAT)) {
    const kansi = sivut.find((s) => s.id === 'kaupunki');
    assert.ok(kansi, `${kaupunki}: lehdeltä puuttuu kansi`);
    assert.equal(kansi.tehtava, undefined,
      `${kaupunki}: kannelle ei tule minitehtävää, siellä on kulttuurivisa`);
  }
});

test('sama nosto ei ole sekä lehdessä että vanhoissa litteissä nostoissa', async () => {
  const { EUROPE_KULTTUURI } = await import('../js/packs/europe-kulttuuri.js');
  for (const [kaupunki, sivut] of Object.entries(KULTTUURI_KATEGORIAT)) {
    const vanhat = EUROPE_KULTTUURI[kaupunki]?.nostot ?? [];
    // Kun kaupunki saa lehden, sen litteät nostot siirretään lehteen ja
    // poistetaan täältä. Jos poisto unohtuu, sama juttu näkyy pelissä
    // kahdesti — eikä se näy mistään muualta kuin pelaamalla.
    assert.equal(vanhat.length, 0,
      `${kaupunki}: lehti on olemassa, joten europe-kulttuuri.js:n `
      + `${vanhat.length} nostoa näkyisivät kahdesti`);
  }
});

test('kahden maan samanniminen aihesivu palkitsee erikseen', () => {
  /*
   * Maan lehden saa auki kartalta mistä tahansa (v390), joten Prahassa
   * seisova pelaaja voi avata sekä Tšekin että Saksan lehden. Molemmilla
   * on Historia-sivu. Palkkioavain oli pakka:kaupunki:aihe, jolloin
   * jälkimmäinen näytti tekstin "Tämän sivun minitehtävä on jo
   * ratkaistu" eikä maksanut mitään. ui.js lisää nyt maatunnuksen
   * aiheen eteen; tämä testi pitää sopimuksen voimassa.
   */
  const game = new Game({
    players: [{ name: 'A', color: '#f00', start: 'tanger' }],
    seed: 7,
  });
  const raha = () => game.players[0].money;
  const alku = raha();

  const eka = game.actionMinitehtava('praha', 'CZE:historia', true);
  assert.equal(eka.ok, true, 'ensimmäinen vastaus menee läpi');
  assert.equal(raha(), alku + 10, 'ensimmäinen palkitsee');

  const toinen = game.actionMinitehtava('praha', 'DEU:historia', true);
  assert.equal(toinen.ok, true, 'toisen maan sama aihe on eri tehtävä');
  assert.equal(raha(), alku + 20, 'myös toinen palkitsee');

  const uudelleen = game.actionMinitehtava('praha', 'CZE:historia', true);
  assert.equal(uudelleen.ok, false, 'sama tehtävä ei palkitse kahdesti');
  assert.equal(raha(), alku + 20, 'raha ei kasva toistosta');
});

test('maalehden aihesivuilla on minitehtävä ja menovinkit on viimeisenä', () => {
  for (const [iso, sivut] of Object.entries(MAA_KATEGORIAT)) {
    if (sivut.length < 2) continue;
    const vinkki = sivut.findIndex((s) => s.id === 'menovinkit');
    if (vinkki >= 0) {
      assert.equal(vinkki, sivut.length - 1,
        `${iso}: menovinkit on linkkilista ja kuuluu viimeiseksi`);
    }
    for (const s of sivut) {
      if (s.id === 'menovinkit' || !s.tehtava) continue;
      tarkistaTehtava(s.tehtava, `${iso}/${s.id}`);
    }
  }
});
