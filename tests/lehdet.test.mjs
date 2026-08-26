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

test('kulttuurivisan vastaus löytyy kaupunkilehden kansisivulta', async () => {
  /*
   * Visa näkyy lehden kansisivulla (2/4). Vaihe B siirsi juttuja
   * kannelta aihesivuille ja maalehtiin, ja viisi visaa jäi kannelle
   * ilman lähdejuttuaan — omistaja löysi ensimmäisen testipelissä
   * ("Mitä evzonin puvun 400 laskosta esittävät?" sivulla, jolla ei
   * puhuttu evzoneista). Siirto tehtiin, mutta riippuvuutta ei
   * tarkistettu siirron jälkeen; tämä testi tarkistaa sen koneellisesti.
   */
  const { EUROPE_KULTTUURI } = await import('../js/packs/europe-kulttuuri.js');
  const ytimet = (s) => s.toLowerCase()
    .split(/[^a-zåäöáéíóúüñ0-9]+/)
    .filter((w) => w.length >= 6)
    .map((w) => w.slice(0, 7));

  for (const [kaupunki, tiedot] of Object.entries(EUROPE_KULTTUURI)) {
    const visa = tiedot.kysymys;
    if (!visa) continue;
    const sivut = KULTTUURI_KATEGORIAT[kaupunki];
    const nostot = sivut
      ? (sivut.find((s) => s.id === 'kaupunki') ?? sivut[0]).nostot ?? []
      : tiedot.nostot ?? [];
    const kansi = nostot.map((n) => `${n.otsikko ?? ''} ${n.teksti ?? ''}`).join(' ').toLowerCase();
    const avain = [...new Set([...ytimet(visa.q), ...ytimet(visa.options[visa.correct])])];
    assert.ok(avain.some((w) => kansi.includes(w)),
      `${kaupunki}: kulttuurivisan aihetta ei käsitellä kansisivun jutuissa `
      + `— "${visa.q}"`);
  }
});

test('jokainen kohdekartta on avaimistettu laudan kaupunki-id:llä', async () => {
  /*
   * MIKSI TÄMÄ ON OLEMASSA. ui.js hakee kohdekartan
   * KAUPUNKIKARTAT[this.lehtitila.arrivalShownFor] eli laudan kaupunki-id:llä.
   * Jos kartta on avaimistettu jollain muulla nimellä, se ei
   * renderöidy lainkaan — eikä mikään kerro siitä: ei virhettä, ei
   * testiä, ei tyhjää laatikkoa. Sivu näyttää samalta kuin
   * kaupungilla, jolle ei ole karttaa tehty.
   *
   * Aleppo (13.8.2026) meni juuri näin: kartta piirrettiin, kohteet
   * tarkistettiin ja kaikki oli kunnossa, mutta avain oli `aleppo`
   * kun laudan id on `halab`. Vika löytyi vasta selaintarkistuksesta,
   * joka sattui ilmoittamaan "aleppo ei laudalla". Ilman sitä
   * kaupunkilehti olisi julkaistu kartattomana.
   */
  const { KAUPUNKIKARTAT } = await import('../js/packs/maakartat.js');
  const { PACKS } = await import('../js/pack.js');
  const idt = new Set(PACKS.flatMap((p) => (p.cities ?? []).map((c) => c.id)));
  for (const avain of Object.keys(KAUPUNKIKARTAT)) {
    assert.ok(idt.has(avain),
      `kohdekartta "${avain}" ei vastaa yhdenkään laudan kaupunki-id:tä — `
      + 'kartta ei renderöidy pelissä. Tarkista js/packs/<lauta>.js:n id.');
  }
});

test('tehtäväkohtainen juliste voittaa kaupungin oletuksen', async () => {
  /*
   * Omistajan tilaus v1119 (kohta 21): *"tehtävä voi kantaa oman
   * juliste-avaimen (esim. tehtava.juliste = 'ateena-nike'), joka
   * voittaa kaupungin oletuksen — pelaaja voi näin saada samasta
   * kaupungista USEAMMAN eri julisteen eri tehtävistä"*.
   *
   * Kolme asiaa vartioidaan: avaimet ovat olemassa julistetaulussa,
   * Ateenan Athena Nike -tehtävä on kytketty omaansa, ja kytkentä
   * oikeasti kulkee koodin läpi (js/fokustehtavat.js julisteAvain)
   * eikä jää dataan.
   */
  const { readFileSync } = await import('node:fs');
  const { JULISTEET, juliste } = await import('../js/packs/julisteet.js');
  for (const avain of ['ateena-nike', 'ateena-nike-temppeli']) {
    assert.ok(JULISTEET[avain], `julistetta ${avain} ei ole taulussa`);
    assert.equal(juliste(avain)?.kaupunki, 'Ateena');
    assert.match(JULISTEET[avain].tiedosto, /^tuotanto\//,
      `${avain}: tiedosto ei ole tuotanto-kansiossa`);
  }
  // Kaupungin oma oletusjuliste säilyy niille tehtäville, joilla ei ole
  // omaa avainta.
  assert.ok(JULISTEET.ateena, 'Ateenan oletusjuliste katosi');
  assert.notEqual(JULISTEET.ateena.tiedosto, JULISTEET['ateena-nike'].tiedosto);

  const { FOKUSVIRTA_ATEENA } = await import('../js/packs/fokusvirta-ateena.js');
  const tehtava = (FOKUSVIRTA_ATEENA.lehtitehtavat ?? [])
    .find((t) => t.palkinto === 'juliste');
  assert.ok(tehtava, 'Ateenalla ei ole julistepalkintoista tehtävää');
  assert.equal(tehtava.juliste, 'ateena-nike',
    'Athena Nike -tehtävä ei kanna omaa juliste-avaintaan');

  const tehtavat = readFileSync(new URL('../js/fokustehtavat.js', import.meta.url), 'utf8');
  assert.match(tehtavat, /const julisteAvain = tehtava\.juliste/,
    'tehtäväkohtaista avainta ei lueta tehtävästä');
  assert.match(tehtavat, /myonnaJuliste\(julisteAvain\)/,
    'kokoelmaan myönnetään yhä kaupungin tunnus eikä tehtävän avainta');
  assert.match(tehtavat, /naytaJuliste\(julisteAvain\)/,
    'lunastus näyttää yhä kaupungin oletusjulisteen');
});
