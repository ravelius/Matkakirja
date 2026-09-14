/*
 * ROOMAN KULTTUURIVISA — kysymys, vastaukset ja pisteytys.
 *
 * MIKSI TÄMÄ ON OLEMASSA. Karttauudistuksen erän 10 raportti
 * (docs/raportit/viesti-fable-karttauudistus-era10-20260913.md, avoin
 * kohta 11.2) löysi, että Rooman visalle ei ole omaa vartiota:
 * tests/lehdet.test.mjs mittaa vain, käsitelläänkö visan aihetta
 * kansisivun jutuissa, ja Rooma läpäisi sen SANAVARTALOLLA `rooman`
 * nostossa "Norsu kantaa obeliskia" — norsupatsas ei kerro
 * akvedukteista mitään. Testi oli siis vihreä väärästä syystä.
 *
 * Tämä testi mittaa saman, mitä muiden kaupunkien visoilta mitataan
 * (tests/lehdet.test.mjs tarkistaTehtava ja "kulttuurivisan vastaus
 * löytyy kaupunkilehden kansisivulta"), mutta Rooman osalta
 * täsmällisesti ja ilman kaupungin nimen vartaloa:
 *
 *   1. MUOTO: neljä eri vaihtoehtoa, kelvollinen `correct`-indeksi,
 *      kysymys ja fakta olemassa, eikä teksti lupaa palkkiota
 *      (palkkion suuruus tulee mekanismista).
 *   2. SISÄLTÖ: oikea vastaus on painovoima, ja harhautukset ovat niitä
 *      selityksiä, jotka aineisto nimenomaan kumoaa.
 *   3. KYTKÖS: visan aihe käsitellään Rooman sisällössä oikeasti —
 *      mitattuna avainsanoilla, joista kaupungin nimi on POISTETTU.
 *      Lähdejuttu "Vesi kulkee yhä" on kohdekartan nosto `aqua-virgo`
 *      (js/packs/fokusvirta-rooma.js), ei lehden kansisivu.
 *   4. PISTEYTYS: oikea vastaus maksaa KULTTUURI_PALKKIO-verran kerran,
 *      väärä ei maksa mitään, eikä samaan kaupunkiin saa uutta yritystä.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { Game } from '../js/game.js';
import { EUROPE_KULTTUURI } from '../js/packs/europe-kulttuuri.js';
import { KULTTUURI_PALKKIO } from '../js/packs/africa-kulttuuri.js';
import { FOKUSVIRRAT } from '../js/packs/fokusvirrat.js';
import { KULTTUURI_KATEGORIAT } from '../js/packs/kulttuuri-kategoriat.js';

const visa = EUROPE_KULTTUURI.rooma?.kysymys;

/* ==================== 1. MUOTO ==================== */

test('Rooman kulttuurivisassa on kysymys, neljä vaihtoehtoa ja fakta', () => {
  assert.ok(visa, 'Roomalta puuttuu kulttuurivisa');
  assert.ok(visa.q?.length > 0, 'kysymys puuttuu');
  assert.ok(visa.fact?.length > 0, 'fakta puuttuu');
  assert.equal(visa.options?.length, 4, 'vaihtoehtoja pitää olla neljä');
  assert.equal(new Set(visa.options).size, 4, 'vaihtoehdot toistavat toisiaan');
  assert.ok(Number.isInteger(visa.correct) && visa.correct >= 0 && visa.correct <= 3,
    `correct on indeksi 0–3, ei ${visa.correct}`);
  assert.ok(visa.options.every((v) => typeof v === 'string' && v.trim().length > 0),
    'tyhjä vaihtoehto');
  // Sama sääntö kuin lehtitehtävillä: palkkion suuruus tulee
  // mekanismista, ja tekstiin kirjoitettuna luku vanhenisi.
  for (const teksti of [visa.q, visa.fact, ...visa.options]) {
    assert.doesNotMatch(teksti, /\b(punta|puntaa|pistettä|palkkio)/i,
      `teksti ei saa mainita palkkiota: "${teksti}"`);
  }
});

/* ==================== 2. SISÄLTÖ ==================== */

test('Rooman visan oikea vastaus on painovoima, ei pumppu eikä ämpäri', () => {
  assert.match(visa.q, /akvedukt/i, 'kysymyksen pitää koskea akvedukteja');
  const oikea = visa.options[visa.correct];
  assert.match(oikea, /painovoima/i,
    `oikea vaihtoehto on painovoima, ei "${oikea}"`);
  // Harhautukset ovat juuri ne selitykset, jotka lähde kumoaa: käsin
  // nostaminen, pumput ja tuulivoima. Jos joku niistä merkitään
  // oikeaksi, tämä kaatuu.
  const vaarat = visa.options.filter((_, i) => i !== visa.correct);
  assert.equal(vaarat.length, 3);
  assert.ok(vaarat.every((v) => !/painovoima/i.test(v)),
    'vain yksi vaihtoehto saa puhua painovoimasta');
  // Fakta perustelee vastauksen: kaltevuus on se, mikä veden liikuttaa.
  assert.match(visa.fact, /kalte|laske|kaar/i,
    'fakta ei perustele painovoimaa');
});

/* ==================== 3. KYTKÖS LÄHDEJUTTUUN ==================== */

/** Sama ydintys kuin tests/lehdet.test.mjs:ssä. */
const ytimet = (s) => s.toLowerCase()
  .split(/[^a-zåäöáéíóúüñ0-9]+/)
  .filter((w) => w.length >= 6)
  .map((w) => w.slice(0, 7));

/**
 * Visan avainsanat ILMAN kaupungin nimeä. Juuri kaupungin nimen
 * vartalo teki erän 10 mittauksesta valheellisen (avoin kohta 11.2).
 */
function avainsanatIlmanKaupunkia() {
  const kaupunki = new Set(ytimet('Rooma Rooman Roomaan Roomassa roomalainen'));
  return [...new Set([...ytimet(visa.q), ...ytimet(visa.options[visa.correct])])]
    .filter((w) => !kaupunki.has(w));
}

test('Rooman visan avainsanoissa on muutakin kuin kaupungin nimi', () => {
  const avain = avainsanatIlmanKaupunkia();
  assert.ok(avain.length >= 3,
    `visasta ei saa kolmea sisältösanaa ilman kaupungin nimeä: ${avain.join(', ')}`);
  assert.ok(avain.some((w) => 'akveduktit'.startsWith(w)),
    `akvedukti puuttuu avainsanoista: ${avain.join(', ')}`);
});

test('Rooman visan vastaus käsitellään pelin Rooma-sisällössä', () => {
  /*
   * Lähdejuttu on kohdekartan nosto "Vesi kulkee yhä" (`aqua-virgo`).
   * Mittaus kattaa sekä lehden sivut että kartan nostot, koska erä 10
   * siirsi juttuja juuri kartalle — mutta avainsanoista on poistettu
   * kaupungin nimi, joten pelkkä sana "Rooman" ei enää kelpaa osumaksi.
   */
  const avain = avainsanatIlmanKaupunkia();
  const lehti = (KULTTUURI_KATEGORIAT.rooma ?? [])
    .flatMap((sivu) => sivu.nostot ?? [])
    .map((n) => `${n.otsikko ?? ''} ${n.teksti ?? ''}`);
  const kartalla = (FOKUSVIRRAT.rooma?.takynostot ?? [])
    .map((n) => `${n.otsikko ?? ''} ${(n.lunastus ?? []).join(' ')} ${n.teksti ?? ''}`);
  const sisalto = [...lehti, ...kartalla].join(' ').toLowerCase();
  const osumat = avain.filter((w) => sisalto.includes(w));
  assert.ok(osumat.length >= 2,
    'Rooman visan aihetta ei käsitellä pelin Rooma-sisällössä '
    + `— osumia vain ${osumat.length} (${osumat.join(', ') || 'ei yhtään'})`);
  const lahde = (FOKUSVIRRAT.rooma?.takynostot ?? []).find((n) => n.id === 'aqua-virgo');
  assert.ok(lahde, 'akveduktinoston `aqua-virgo` pitää olla Rooman poolissa');
  const lahdeteksti = `${lahde.otsikko} ${(lahde.lunastus ?? []).join(' ')}`.toLowerCase();
  assert.match(lahdeteksti, /akvedukt/,
    'lähdejuttu "Vesi kulkee yhä" ei puhu akvedukteista');
  assert.match(lahdeteksti, /painovoima/,
    'lähdejuttu ei kerro, että vesi liikkuu painovoimalla');
});

/* ==================== 4. PISTEYTYS ==================== */

test('Rooman kulttuurivisa palkitsee oikeasta kerran', () => {
  const game = new Game({
    players: [{ name: 'A', color: '#f00', start: 'tanger' }],
    seed: 11,
  });
  const raha = () => game.players[0].money;
  const alku = raha();

  const eka = game.actionKulttuuri('rooma', true, KULTTUURI_PALKKIO);
  assert.equal(eka.ok, true, 'ensimmäinen vastaus menee läpi');
  assert.equal(eka.palkittu, true, 'oikea vastaus palkitaan');
  assert.equal(raha(), alku + KULTTUURI_PALKKIO, 'palkkio on KULTTUURI_PALKKIO');

  const toinen = game.actionKulttuuri('rooma', true, KULTTUURI_PALKKIO);
  assert.equal(toinen.ok, false, 'samaan kaupunkiin ei saa toista yritystä');
  assert.equal(raha(), alku + KULTTUURI_PALKKIO, 'palkkiota ei voi kalastella');
});

test('Rooman kulttuurivisa ei maksa väärästä vastauksesta', () => {
  const game = new Game({
    players: [{ name: 'A', color: '#f00', start: 'tanger' }],
    seed: 12,
  });
  const raha = () => game.players[0].money;
  const alku = raha();

  const vastaus = game.actionKulttuuri('rooma', false, KULTTUURI_PALKKIO);
  assert.equal(vastaus.ok, true, 'väärä vastaus kirjataan');
  assert.equal(vastaus.palkittu, false, 'väärästä ei palkita');
  assert.equal(raha(), alku, 'raha ei kasva väärästä vastauksesta');

  // Väärän jälkeen ei uutta yritystä — sama portti kuin oikean jälkeen.
  const uusi = game.actionKulttuuri('rooma', true, KULTTUURI_PALKKIO);
  assert.equal(uusi.ok, false, 'väärän jälkeen ei saa yrittää uudelleen');
  assert.equal(raha(), alku, 'toinen yritys ei maksa mitään');
});

test('jokainen vaihtoehto käyttäytyy oikein pisteytyksessä', () => {
  /*
   * Koko vaihtoehtolista ajetaan läpi: vain `correct` palkitsee.
   * Jokainen ajo on oma pelinsä, koska visa vastataan kerran per
   * kaupunki (js/game.js actionKulttuuri).
   */
  visa.options.forEach((_, i) => {
    const game = new Game({
      players: [{ name: 'A', color: '#f00', start: 'tanger' }],
      seed: 20 + i,
    });
    const alku = game.players[0].money;
    const vastaus = game.actionKulttuuri('rooma', i === visa.correct, KULTTUURI_PALKKIO);
    assert.equal(vastaus.ok, true);
    assert.equal(vastaus.palkittu, i === visa.correct,
      `vaihtoehto ${i} palkitsi väärin`);
    assert.equal(game.players[0].money,
      alku + (i === visa.correct ? KULTTUURI_PALKKIO : 0),
      `vaihtoehto ${i} maksoi väärin`);
  });
});
