/*
 * NAAPURIMAAN POLTETTU NOSTO ON NIMILADONNAN VARAUS.
 *
 * OMISTAJAN PÄÄTÖS 2.9.2026 ilta, sanatarkasti: *"Korjaa: lataa
 * naapurimaat"*. Mitattu vika: Bulgarian maalehtinäkymässä (mittajana
 * 200 km) kaupungin nimi *"WIEN"* leikkasi Wienin oman poltetun noston
 * nimeä. Laattapyramidiin on poltettu jokaisen maan nostot, mutta peli
 * tunsi varauksina vain sen maan, jossa pelaaja seisoo
 * (js/fokuskohteet.js poltettujenNostojenVaraukset).
 *
 * ── MITÄ TÄMÄ TESTI TODISTAA ───────────────────────────────────────
 *
 *   1. Naapurimaan poltetun noston laatikko TULEE varausjoukkoon, kun
 *      näkymä kattaa sen — ja nimenomaan Wienin kohdalla, samasta
 *      pisteestä jonka omistaja kaappasi.
 *   2. Laatikot ovat SAMASTA ladonnasta kuin poltto: jokainen mukaan
 *      otettu rivi on luettelossa tiivisteineen. Luettelo tulee tässä
 *      laattageneraattorin omalta passilta (tools/fokuskartta/nostot.mjs
 *      keraaNostot) — Nodessa ei ole verkkoa, ja juuri se sauma on
 *      `onPoltettu`-parametri. Jos pelin ladonta eroaisi poltetusta,
 *      yksikään tiiviste ei täsmäisi ja joukko olisi tyhjä.
 *   3. Näkymän ulkopuolinen maa ei tule mukaan, eikä oma maa (sen
 *      hoitaa poltettujenNostojenVaraukset).
 *
 * DOM-ITON: kaikki passit ovat laudan datan funktioita, kuten
 * laattageneraattorilla.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { keraaNostot } from '../tools/fokuskartta/nostot.mjs';
import { packById } from '../js/pack.js';
import { FOKUS_POHJAT } from '../js/packs/fokus-grc.js';
import { maanPoltetutVaraukset, naapurienPoltetutVaraukset } from '../js/fokuskohteet.js';
import { kytkeFokusnosto } from '../js/fokusnosto.js';
import { kytkeSyvennys } from '../js/syvennys.js';
import { kytkeSkandaalit } from '../js/skandaalit.js';
import { kytkeHistorianHetket } from '../js/historian-hetket.js';

/*
 * LISÄLÄHTEET REKISTERIIN, KUTEN PELISSÄ (js/main.js). Ilman niitä
 * naapurin ladonnasta puuttuisivat syvennystarinat, skandaalit,
 * historian hetket ja täkynostot — ja koska ne ovat samassa
 * sarakkeessa ja työntävät naapureitaan erottelusiirrolla, koko maan
 * ladonta eroaisi poltetusta.
 */
kytkeFokusnosto();
kytkeSyvennys();
kytkeSkandaalit();
kytkeHistorianHetket();

const pack = packById('maailmankartta');
const { luettelo, merkit } = keraaNostot(pack);
const onPoltettu = (tunnus, tiiviste) => luettelo[tunnus] === tiiviste;

const kaupunki = (id) => pack.cities.find((c) => c.id === id);
const WIEN = kaupunki('wien');
const SOFIA = kaupunki('sofia');

/** Bulgarian maalehtinäkymä (mittajana 200 km) laudan yksiköissä. */
const BULGARIA_NAKYMA = {
  x: SOFIA.x - 250, y: SOFIA.y - 330, w: 500, h: 660, skaala: 1.719,
};

/** Pelin tynkä: naapurivaraus lukee vain laudan ja pelaajan maan. */
const teeUi = () => ({
  game: { pack, cityOf: () => SOFIA },
  kiertoKohdat: (x) => [x],
});

const limittyy = (a, b) => a.x0 < b.x1 && a.x1 > b.x0 && a.y0 < b.y1 && a.y1 > b.y0;

test('Itävallan poltetut nostot antavat laatikot laudan yksiköissä', () => {
  const laatikot = maanPoltetutVaraukset(pack, 'AUT', FOKUS_POHJAT.AUT, onPoltettu);
  const poltetut = merkit.filter((m) => m.iso === 'AUT' && m.poltettava);
  assert.ok(poltetut.length > 0, 'Itävallan nostoja ei ole poltettu — testin oletus vanhentui');
  /*
   * Symboli aina, nimiö silloin kun väistö sen salli — eli laatikoita
   * on vähintään yhtä monta kuin poltettuja merkkejä ja enintään
   * kaksi kertaa niin monta.
   */
  assert.ok(laatikot.length >= poltetut.length, `${laatikot.length} < ${poltetut.length}`);
  assert.ok(laatikot.length <= poltetut.length * 2);
  for (const l of laatikot) {
    assert.ok(l.x1 > l.x0 && l.y1 > l.y0, 'laatikko on mitaton');
  }
});

/*
 * KOKO MAAILMA, EI VAIN ITÄVALTA. Jos naapurin ladonta eroaisi
 * poltetusta yhdessäkin maassa, sen tiivisteet eivät täsmäisi ja
 * laatikot jäisivät saamatta. Mitattu 2.9.2026: 870/870 — ja
 * lisälähteiden VÄÄRÄSSÄ järjestyksessä (kutsujärjestys, täky ensin)
 * 863/870, eli tämä väite vartioi myös rekisterin jarjestys-lukuja.
 */
test('jokaisen maan poltetut nostot saavat laatikkonsa', () => {
  let odotettu = 0;
  let saatu = 0;
  const vajaat = [];
  for (const [iso, pohja] of Object.entries(FOKUS_POHJAT)) {
    if (pohja.lauta !== pack.id) continue;
    const omat = merkit.filter((m) => m.perhe === 'nosto' && m.iso === iso && m.poltettava);
    // Symboli aina, nimiö kun väistö sen salli.
    const maanOdotus = omat.length + omat.filter((m) => m.nimioNakyy).length;
    const maanSaanti = maanPoltetutVaraukset(pack, iso, pohja, onPoltettu).length;
    odotettu += maanOdotus;
    saatu += maanSaanti;
    if (maanSaanti !== maanOdotus) vajaat.push(`${iso}: ${maanSaanti}/${maanOdotus}`);
  }
  assert.ok(odotettu > 800, `poltettuja nostoja vain ${odotettu} — testin oletus vanhentui`);
  assert.deepEqual(vajaat, [], `naapurin ladonta eroaa poltetusta: ${vajaat.join(', ')}`);
  assert.equal(saatu, odotettu);
});

test('Wienin poltettu nostonimiö on varausjoukossa Bulgarian näkymästä', () => {
  const varaukset = naapurienPoltetutVaraukset(teeUi(), BULGARIA_NAKYMA, onPoltettu);
  assert.ok(varaukset.length > 0, 'naapurimaiden varauksia ei tullut lainkaan');
  /*
   * WIENIN NIMEN PAIKKA. Nimikerros latoo kaupungin nimen sen oman
   * pisteen ympärille; laatikko tässä on karkea kaista sen kohdalla
   * (± 30 x ± 8 lautayksikköä), koska kirjasinkoko elää zoomin mukana.
   * Riittää, että jokin naapurin poltettu laatikko osuu siihen — juuri
   * se on se muste, jota nimi ei tiennyt väistää.
   */
  const nimenKaista = {
    x0: WIEN.x - 30, y0: WIEN.y - 8, x1: WIEN.x + 30, y1: WIEN.y + 8,
  };
  const osuvat = varaukset.filter((v) => limittyy(v, nimenKaista));
  assert.ok(osuvat.length > 0, 'Wienin kohdalta ei löytynyt yhtään poltettua laatikkoa');
  /*
   * Itävallan omat laatikot ovat joukossa sellaisinaan (ei kiertoa) —
   * ne, jotka näkymään yltävät. Alppien merkit (Großglockner,
   * Wildspitze) jäävät tästä ikkunasta länteen, ja juuri niitä ei saa
   * varata: varaus on sitä mustetta, joka on RUUDULLA.
   */
  const nakyy = (l) => l.x1 > BULGARIA_NAKYMA.x
    && l.x0 < BULGARIA_NAKYMA.x + BULGARIA_NAKYMA.w
    && l.y1 > BULGARIA_NAKYMA.y && l.y0 < BULGARIA_NAKYMA.y + BULGARIA_NAKYMA.h;
  const aut = maanPoltetutVaraukset(pack, 'AUT', FOKUS_POHJAT.AUT, onPoltettu)
    .filter(nakyy);
  assert.ok(aut.length > 0, 'Itävallan laatikoista yksikään ei osu näkymään');
  for (const l of aut) {
    assert.ok(varaukset.some((v) => Math.abs(v.x0 - l.x0) < 1e-6
      && Math.abs(v.y0 - l.y0) < 1e-6
      && Math.abs(v.x1 - l.x1) < 1e-6
      && Math.abs(v.y1 - l.y1) < 1e-6),
    `Itävallan laatikko puuttuu varausjoukosta: ${JSON.stringify(l)}`);
  }
});

test('oma maa ja näkymän ulkopuoliset maat jäävät pois', () => {
  const varaukset = naapurienPoltetutVaraukset(teeUi(), BULGARIA_NAKYMA, onPoltettu);
  const bgr = maanPoltetutVaraukset(pack, 'BGR', FOKUS_POHJAT.BGR, onPoltettu);
  for (const l of bgr) {
    assert.ok(!varaukset.some((v) => Math.abs(v.x0 - l.x0) < 1e-6
      && Math.abs(v.y0 - l.y0) < 1e-6),
    'oman maan laatikko tuli naapurijoukkoon kahdesti');
  }
  // Jokainen mukaan tullut laatikko on näkymän sisällä.
  for (const v of varaukset) {
    assert.ok(v.x1 > BULGARIA_NAKYMA.x && v.x0 < BULGARIA_NAKYMA.x + BULGARIA_NAKYMA.w
      && v.y1 > BULGARIA_NAKYMA.y && v.y0 < BULGARIA_NAKYMA.y + BULGARIA_NAKYMA.h,
    `laatikko näkymän ulkopuolelta: ${JSON.stringify(v)}`);
  }
  // Sofian oma lähikuva ei yllä Itävaltaan asti.
  const lahikuva = {
    x: SOFIA.x - 40, y: SOFIA.y - 55, w: 80, h: 110, skaala: 5.8,
  };
  const kapea = naapurienPoltetutVaraukset(teeUi(), lahikuva, onPoltettu);
  const nimenKaista = {
    x0: WIEN.x - 30, y0: WIEN.y - 8, x1: WIEN.x + 30, y1: WIEN.y + 8,
  };
  assert.equal(kapea.filter((v) => limittyy(v, nimenKaista)).length, 0);
});

test('ilman laattaluetteloa naapurivarauksia ei synny', () => {
  // Peli ennen luettelon saapumista: mikään ei ole poltettu.
  const varaukset = naapurienPoltetutVaraukset(teeUi(), BULGARIA_NAKYMA);
  assert.deepEqual(varaukset, []);
});
