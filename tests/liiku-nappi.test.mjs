/*
 * LIIKU-NAPPI ON PYSYVÄ — KEVYT KOHDE EI SAA OLLA UMPIKUJA.
 *
 * Omistajan linjaus 13.9.2026 (Raamattu, KARTTAUUDISTUS, sanatarkasti:
 * *"Alareunassa onkin kokojan nakyvilla pieni 'liiku' nappi."* ja
 * *"Pelaaja voi myos halutessaan jatkaa matkaa ilman loytamatta
 * aarretta."*) kumosi 25.8.2026 laattaportin, jonka mukaan Liiku
 * ilmestyi vasta käännetyn laatan jälkeen.
 *
 * MIKSI TÄMÄ TESTI ON OLEMASSA. Portti oli mitoitettu TÄYDELLE
 * fokusvirtapakille, jossa laatan kääntävä ketju on aina olemassa.
 * KEVYELLÄ pakilla (js/packs/fokusvirrat.js KEVYET_FOKUSVIRRAT) ketjua
 * ei ole — ei kohtaamispistettä eikä aarteen avaavaa lehtitehtävää —
 * mutta laatta on. Portti jäi siis ikuisesti kiinni, ja pelaaja jumittui
 * kohteeseen ilman ainuttakaan tapaa jatkaa matkaa (Codexin pelitesti
 * julkaistussa v1855, Alpit).
 *
 * Vartiot:
 *   1. Kaikki kuusi kevyttä kohdetta (alpit, islanti, kreeta, lappi,
 *      sisilia, tromssa) ovat oikeasti kevyitä JA laudalla — eli juuri
 *      niitä, joissa vanha portti ei olisi koskaan auennut.
 *   2. Liiku näkyy jokaisessa kuudessa, laatta paikallaan.
 *   3. Täyden pakin kaupunki (Pariisi): Liiku näkyy sekä LUKITUN että
 *      AVATUN aarteen kanssa — uusi linjaus ei saa rikkoa vanhaa
 *      toimivaa polkua.
 *   4. KYTKENTÄ: js/ui.js:n liikuNappiNakyy delegoi sääntöön eikä
 *      lue laattoja itse. Tämä on se vartio, joka kaataa vanhan portin
 *      palautuksen (vastakoe).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { liikuNappiNakyvissa } from '../js/fokusvirta.js';
import { KEVYET_FOKUSVIRRAT, fokusvirtaKaupungille } from '../js/packs/fokusvirrat.js';
import { Game } from '../js/game.js';
import { packById } from '../js/pack.js';

/*
 * Kevyet kohteet NIMETTYINÄ — ei pääteltynä (ks. fokusvirrat.js).
 * Bryssel (19.9.2026, omistajan päätös: Belgian pelikaupunki, pilotti)
 * liittyi seitsemänneksi samaan nimettyyn joukkoon.
 */
const KEVYET = ['alpit', 'islanti', 'kreeta', 'lappi', 'sisilia', 'tromssa', 'bryssel', 'ljubljana', 'kosice'];
/** Täyden pakin verrokki: Pariisilla on kohtaamispiste ja aarretehtävä. */
const TAYSI = 'pariisi';

const LAUTA = packById('maailmankartta');
const KAUPUNGIT = new Map(LAUTA.cities.map((c) => [c.id, c]));

/**
 * Peli, jossa Fogg seisoo annetussa kaupungissa toimintavaiheessa.
 * Laatta jätetään paikalleen (`tokens` sisältää kaupungin) — juuri se
 * oli vanhan portin mitta.
 */
function peliKaupungissa(id, { aarreLoydetty = false } = {}) {
  const game = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: id }],
    pack: LAUTA,
    seed: 5,
  });
  game.phase = 'action';
  if (aarreLoydetty) game.tokens.delete(id);
  return game;
}

test('kuusi kevyttä kohdetta ovat laudalla eikä yhdelläkään ole laatan kääntävää ketjua', () => {
  assert.deepEqual([...KEVYET_FOKUSVIRRAT].sort(), [...KEVYET].sort(),
    'nimetty joukko js/packs/fokusvirrat.js:ssä on yhä nämä kuusi');
  for (const id of KEVYET) {
    const city = KAUPUNGIT.get(id);
    assert.ok(city, `${id} on maailmankartan laudalla`);
    const data = fokusvirtaKaupungille(id);
    assert.ok(data, `${id} on fokusvirtapakki`);
    assert.equal(data.kohtaamispiste, undefined,
      `${id}: kevyellä pakilla ei ole kohtaamispistettä — aarrepiste ei voi syttyä`);
    assert.ok(!(data.lehtitehtavat?.length),
      `${id}: kevyellä pakilla ei ole aarteen avaavaa lehtitehtävää`);
  }
});

for (const id of KEVYET) {
  test(`Liiku-nappi näkyy kevyessä kohteessa: ${id} (laatta kääntämättä)`, () => {
    const game = peliKaupungissa(id);
    assert.ok(game.tokens.has(id), `${id}: laatta on yhä paikallaan`);
    assert.equal(liikuNappiNakyvissa({ game, fokusmoodi: true, katselu: false }), true,
      `${id}: ilman Liiku-nappia kohde on umpikuja`);
  });
}

test('Liiku-nappi näkyy täyden pakin kaupungissa LUKITUN aarteen kanssa (pariisi)', () => {
  const game = peliKaupungissa(TAYSI);
  assert.ok(game.tokens.has(TAYSI), 'laatta on kääntämättä');
  assert.ok(fokusvirtaKaupungille(TAYSI)?.kohtaamispiste, 'täydellä pakilla on kohtaamispiste');
  assert.equal(liikuNappiNakyvissa({ game, fokusmoodi: true, katselu: false }), true);
});

test('Liiku-nappi näkyy täyden pakin kaupungissa AVATUN aarteen kanssa (pariisi)', () => {
  const game = peliKaupungissa(TAYSI, { aarreLoydetty: true });
  assert.ok(!game.tokens.has(TAYSI), 'laatta on käännetty');
  assert.equal(liikuNappiNakyvissa({ game, fokusmoodi: true, katselu: false }), true);
});

test('sääntö ei riipu fokusmoodista eikä katselutilasta', () => {
  const game = peliKaupungissa('alpit');
  for (const fokusmoodi of [true, false]) {
    for (const katselu of [true, false]) {
      assert.equal(liikuNappiNakyvissa({ game, fokusmoodi, katselu }), true,
        `fokusmoodi=${fokusmoodi} katselu=${katselu}`);
    }
  }
});

test('js/ui.js delegoi sääntöön eikä lue laattoja Liiku-napin kohdalla', () => {
  const ui = readFileSync(new URL('../js/ui.js', import.meta.url), 'utf8');
  const alku = ui.indexOf('  liikuNappiNakyy() {');
  assert.ok(alku > 0, 'liikuNappiNakyy löytyy');
  const kohta = ui.slice(alku, ui.indexOf('\n  }\n', alku));
  assert.match(kohta, /return liikuNappiNakyvissa\(this\);/);
  assert.doesNotMatch(kohta, /tokens/,
    'vanha laattaportti ei saa palata: Liiku-nappi ei kysy laatoilta lupaa');
  assert.match(ui, /liikuNappiNakyvissa,/, 'sääntö on tuotu js/fokusvirta.js:stä');
});
