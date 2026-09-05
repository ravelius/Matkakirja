/*
 * KEHITTÄJÄN KOHTAAMISLISTA (js/kohtaamistesti.js, omistajan tilaus
 * 5.9.2026: *"Tarvitaan joku kehittäjätila missä pääsen testaamaan
 * kaikki aarre kohtaamiset ja niiden tehtävä pelit listasta
 * valitsemalla. Lajittele listat maanosien mukaan."*).
 *
 * Kolme lupausta, jotka eivät saa rikkoutua hiljaa:
 *   1. LISTA KATTAA KAIKKI kirjoitetut aarrekohtaamiset — yksikään ei
 *      saa pudota listalta, tai omistaja testaisi vajaan joukon.
 *   2. RYHMITTELY ON MAANOSITTAIN pelin oman taulun mukaan
 *      (MANNER_NIMET-järjestys, Eurooppa ensin; manner luetaan
 *      maailmankartan cityMannerista eikä omasta listasta).
 *   3. HIEKKALAATIKKO EI KIRJOITA TALLENTEESEEN: testi ajetaan
 *      kloonatulla Game-oliolla, eikä oikea peli muutu edes silloin,
 *      kun kohtaaminen pelataan loppuun oikein vastaten. Renderin
 *      kirjoittajat (onChange, stampPassport) on lisäksi suljettu
 *      lipulla js/ui.js:ssä.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { Game, MANNER_NIMET } from '../js/game.js';
import {
  kohtaamistestinPuutteita, kohtaamistestinRivit, kohtaamistestinRyhmat,
} from '../js/kohtaamistesti.js';
import { packById } from '../js/pack.js';
import { TARINAKAARI } from '../js/packs/tarinakaari.js';
import { KAARI_PAKETIT } from '../js/tyohuone-kehitys-data.js';

const JUURI = new URL('..', import.meta.url).pathname;

/* ---------- 1. lista kattaa kaikki kohtaamiset ---------- */

test('lista sisältää jokaisen kirjoitetun aarrekohtaamisen', () => {
  const rivit = kohtaamistestinRivit();
  assert.equal(rivit.length, KAARI_PAKETIT.kohteet.length);
  const listalla = new Set(rivit.map((r) => r.id));
  for (const kohde of KAARI_PAKETIT.kohteet) {
    assert.ok(listalla.has(kohde.id), `${kohde.id} puuttuu kohtaamislistalta`);
  }
});

test('jokainen pelissä oleva kaarikohde on listalla ja merkitty pelattavaksi', () => {
  const rivit = new Map(kohtaamistestinRivit().map((r) => [r.id, r]));
  for (const id of Object.keys(TARINAKAARI)) {
    assert.ok(rivit.has(id), `${id} puuttuu listalta`);
    assert.equal(rivit.get(id).pelissa, true, `${id} pitäisi olla pelattavissa`);
  }
});

test('rivillä on kaupunki, otsikko, henkilö ja tehtäväpelin laji', () => {
  const pack = packById('maailmankartta');
  const nimet = new Map(pack.cities.map((c) => [c.id, c.name]));
  for (const rivi of kohtaamistestinRivit()) {
    assert.equal(rivi.kaupunki, nimet.get(rivi.id) ?? rivi.id);
    assert.ok(rivi.otsikko.length > 0, `${rivi.id}: otsikko puuttuu`);
    assert.ok(rivi.aihe.length > 0, `${rivi.id}: aihe puuttuu`);
    assert.ok(rivi.henkilo, `${rivi.id}: henkilön nimi puuttuu`);
    assert.ok(['visa', 'sähke', 'pulma'].includes(rivi.laji), `${rivi.id}: outo laji`);
    assert.ok([null, 'valokuva', 'piirros'].includes(rivi.kuva), `${rivi.id}: outo kuvatieto`);
    assert.ok(rivi.luennat >= 0 && rivi.luennat <= 3, `${rivi.id}: outo luentaluku`);
  }
});

test('sähkekaupungit tunnistetaan omaksi lajikseen', () => {
  const rivit = new Map(kohtaamistestinRivit().map((r) => [r.id, r]));
  // Sähketehtävän pilottikaupungit (Raamattu, PÖLLÖN SÄHKETEHTÄVÄ).
  assert.equal(rivit.get('tukholma').laji, 'sähke');
  assert.equal(rivit.get('sofia').laji, 'sähke');
  // Isoisän piirrospulman kaupunki (js/packs/europe-puzzles.js).
  assert.equal(rivit.get('ateena').laji, 'pulma');
});

/* ---------- 2. ryhmittely maanosittain ---------- */

test('ryhmät ovat MANNER_NIMET-järjestyksessä ja Eurooppa on ensin', () => {
  const ryhmat = kohtaamistestinRyhmat();
  assert.deepEqual(ryhmat.map((r) => r.manner), Object.keys(MANNER_NIMET));
  assert.equal(ryhmat[0].manner, 'europe');
  assert.equal(ryhmat[0].nimi, 'Eurooppa');
});

test('jokainen kohtaaminen on täsmälleen yhdessä ryhmässä ja oikeassa', () => {
  const ryhmat = kohtaamistestinRyhmat();
  const mantereet = packById('maailmankartta').map.cityManner;
  const nahdyt = new Set();
  for (const ryhma of ryhmat) {
    for (const rivi of ryhma.rivit) {
      assert.equal(rivi.manner, ryhma.manner, `${rivi.id} on väärässä ryhmässä`);
      assert.equal(rivi.manner, mantereet[rivi.id],
        `${rivi.id}: manner ei tule maailmankartan cityMannerista`);
      assert.ok(!nahdyt.has(rivi.id), `${rivi.id} on kahdessa ryhmässä`);
      nahdyt.add(rivi.id);
    }
  }
  assert.equal(nahdyt.size, kohtaamistestinRivit().length);
});

test('ryhmä kertoo laudan kaupunkimäärän myös ilman kohtaamisia', () => {
  const ryhmat = kohtaamistestinRyhmat();
  for (const ryhma of ryhmat) {
    assert.ok(ryhma.kaupunkeja > 0, `${ryhma.nimi}: laudan kaupunkeja ei laskettu`);
    assert.ok(ryhma.rivit.length <= ryhma.kaupunkeja);
  }
  // Eurooppa on ainoa manner, jolla kohtaamisia on jo lähes joka
  // kaupungissa — tyhjät mantereet ovat listan tarkoitus, eivät vika.
  assert.ok(ryhmat[0].rivit.length > 30);
});

test('suodatin jättää jäljelle vain ne, joilta puuttuu kuva tai teksti', () => {
  const kaikki = kohtaamistestinRyhmat().flatMap((r) => r.rivit);
  const puuttuvat = kohtaamistestinRyhmat({ vainPuuttuvat: true }).flatMap((r) => r.rivit);
  assert.ok(puuttuvat.length < kaikki.length, 'suodatin ei karsinut mitään');
  for (const rivi of puuttuvat) assert.ok(kohtaamistestinPuutteita(rivi));
  const suodatetut = new Set(puuttuvat.map((r) => r.id));
  for (const rivi of kaikki) {
    if (!kohtaamistestinPuutteita(rivi)) {
      assert.ok(!suodatetut.has(rivi.id), `${rivi.id} ei kuulu puuttuvien listalle`);
    }
  }
});

/* ---------- 3. hiekkalaatikko ei kirjoita tallenteeseen ---------- */

/** Pelin tallennettava tila vertailukelpoisena merkkijonona. */
const talletus = (peli) => JSON.stringify(peli.toJSON());

test('kloonattu testipeli ei muuta oikeaa peliä edes läpipelattuna', () => {
  const oikea = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: 'lontoo' }],
    pack: packById('maailmankartta'),
    seed: 7,
  });
  oikea.phase = 'action';
  const ennen = talletus(oikea);
  const rahaEnnen = oikea.player.money;
  const xpEnnen = oikea.player.xp;
  const paivatEnnen = oikea.dayCount();
  const loydotEnnen = oikea.player.finds.length;

  // Sama kloonaus kuin js/kohtaamistesti.js:n hiekkalaatikossa.
  const testipeli = Game.fromJSON(JSON.parse(ennen));
  assert.ok(testipeli, 'kloonaus epäonnistui');

  // Sama polku kuin lehden rivin napautuksessa: siirto kaupunkiin ja
  // kohtaaminen auki. Praha on kaarikaupunki, jolla on kysymys.
  assert.equal(testipeli.actionKehittajaSiirto('praha').ok, true);
  const avaus = testipeli.actionQuiz();
  assert.equal(avaus.ok, true, avaus.error);
  assert.equal(testipeli.quiz.kaari, true, 'kohtaaminen ei avautunut kaarikysymyksenä');
  assert.equal(testipeli.quiz.question, TARINAKAARI.praha.kysymys.q);

  // Oikea vastaus vie aarteeseen asti.
  assert.equal(testipeli.answerQuiz(testipeli.quiz.correct).ok, true);
  assert.equal(testipeli.quiz.right, true);

  assert.equal(talletus(oikea), ennen, 'oikean pelin tallenne muuttui');
  assert.equal(oikea.player.money, rahaEnnen);
  assert.equal(oikea.player.xp, xpEnnen);
  assert.equal(oikea.dayCount(), paivatEnnen);
  assert.equal(oikea.player.finds.length, loydotEnnen);
  assert.equal(oikea.quiz, null);
  assert.notEqual(talletus(testipeli), ennen, 'testipeli ei muuttunut lainkaan');
});

test('sama kohtaaminen aukeaa listalta yhä uudelleen', () => {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: 'lontoo' }],
    pack: packById('maailmankartta'),
    seed: 9,
  });
  peli.phase = 'action';
  const avain = `${peli.pack.id}:praha`;
  for (let kerta = 0; kerta < 3; kerta += 1) {
    // Lehden nollaus ennen jokaista testiä (avaaKohtaaminen).
    peli.kaariYritykset?.delete(avain);
    peli.aarreLukot?.delete(avain);
    peli.phase = 'action';
    peli.quiz = null;
    assert.equal(peli.actionKehittajaSiirto('praha').ok, true);
    const avaus = peli.actionQuiz();
    assert.equal(avaus.ok, true, `kerta ${kerta + 1}: ${avaus.error}`);
    assert.equal(peli.quiz.kaari, true, `kerta ${kerta + 1}: kohtaaminen ei auennut`);
    // Väärä vastaus kuluttaisi yrityksen — nollaus purkaa senkin.
    const vaara = (peli.quiz.correct + 1) % peli.quiz.options.length;
    assert.equal(peli.answerQuiz(vaara).ok, true);
  }
});

test('js/ui.js:n render ei tallenna eikä leimaa kohtaamistestissä', () => {
  const ui = readFileSync(join(JUURI, 'js/ui.js'), 'utf8');
  assert.match(ui, /if \(!this\.kohtaamistesti\) this\.onChange\?\.\(this\.game\);/,
    'renderin tallennuskutsua ei ole suljettu kohtaamistestin lipulla');
  assert.match(ui, /if \(!this\.kohtaamistesti\) this\.stampPassport\(\);/,
    'passin leimausta ei ole suljettu kohtaamistestin lipulla');
});

test('kehittäjän ratasvalikossa on Kohtaamiset-nappi ja lehden dialogi', () => {
  const html = readFileSync(join(JUURI, 'index.html'), 'utf8');
  assert.match(html, /id="kehittaja-kohtaamiset-btn"/);
  assert.match(html, /id="kohtaamistesti-dialog"/);
  assert.match(html, /id="kohtaamistesti-sisalto"/);
  assert.match(html, /id="kohtaamistesti-suodatin"/);
  const main = readFileSync(join(JUURI, 'js/main.js'), 'utf8');
  assert.match(main, /kehittaja-kohtaamiset-btn/);
  assert.match(main, /avaaKohtaamistesti/);
});
