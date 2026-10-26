/*
 * "Maa numeroina" -sivun data-aineiston muoto (assets/data/maakayrat.json).
 *
 * Tiedosto on koneen kirjoittama (tools/hae-maakayrat.mjs), joten
 * testit vartioivat muotoa ja suuruusluokkia, eivät yksittäisiä
 * lukuja: piirtäjä nojaa siihen, että jokainen sarja on { alku,
 * arvot } ja pyramidi täsmää väkilukuun. Suuruusluokkavahdit ovat
 * samat kuin työkalun pistokokeet — jos joku ajaa työkalua käsin
 * muokatulla lähteellä, yksikkövirhe (tuhannet vs. asukkaat) jää
 * tähän haaviin.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const JUURI = new URL('..', import.meta.url).pathname;
const POLKU = join(JUURI, 'assets/data/maakayrat.json');
const data = JSON.parse(readFileSync(POLKU, 'utf8'));

// Lehtimaiden pilotti + Suomi vertailuviivana. Lista saa kasvaa
// (~200 maata vaiheessa 3), mutta nämä eivät saa kadota.
const PILOTTI = ['ITA', 'EGY', 'GBR', 'ESP', 'FIN'];
const WB_MITTARIT = ['bkt', 'elinika', 'kaupungistuminen', 'co2'];

test('meta kertoo hakupäivän, lähteet ja reitin', () => {
  assert.match(data.meta.haettu, /^\d{4}-\d{2}-\d{2}$/, 'haettu ei ole ISO-päivä');
  assert.match(data.meta.lahderivi, /haettu \d{1,2}\/\d{4}/,
    'lähderivillä pitää olla hakukuukausi — sivu näyttää sen sellaisenaan');
  assert.ok(['suora', 'peili'].includes(data.meta.reitti), 'reitti on suora tai peili');
  for (const avain of ['vakiluku', 'pyramidi', ...WB_MITTARIT]) {
    assert.ok(data.meta.lahteet[avain]?.length > 5, `lähde puuttuu mittarilta ${avain}`);
  }
  assert.equal(data.meta.pyramidiRyhmat.length, 21, 'pyramidissa on 21 ikäluokkaa (0–4 … 100+)');
});

test('pilottimaat ovat mukana', () => {
  const puuttuu = PILOTTI.filter((m) => !data.maat[m]);
  assert.deepEqual(puuttuu, [], 'pilottimaa puuttuu aineistosta');
});

/*
 * Jokainen pelin kartan maa saa tilastosivun. Etelä-Sudan on kartalla
 * Natural Earthin koodilla SDS — työkalun silta kirjoittaa sen dataan
 * molemmilla koodeilla, ja tämä testi hajoaa jos silta unohtuu.
 */
test('pelin jokaiselle maalle löytyy tilastosarjat', async () => {
  const { MAAILMANKARTTA } = await import('../js/packs/maailmankartta.js');
  // Vatikaani (10.10.2026): UN WPP ja Maailmanpankki eivät julkaise sarjoja
  // Pyhälle istuimelle, eikä minivaltiolla ole maalehteä (kevyt sisältö),
  // joten "Maa numeroina" -käyriä ei piirretä.
  const ILMAN_SARJOJA = new Set(['VAT']);
  const puuttuu = Object.keys(MAAILMANKARTTA.map.countryShapes).filter((m) => !data.maat[m] && !ILMAN_SARJOJA.has(m));
  assert.deepEqual(puuttuu, [], 'pelin maita ilman maakayrat-dataa');
});

test('väkiluku kulkee 1950:stä 2050:een ja ennusteen raja on merkitty', () => {
  for (const [iso, maa] of Object.entries(data.maat)) {
    const v = maa.vakiluku;
    assert.ok(v, `${iso}: väkiluku puuttuu`);
    assert.equal(v.alku, 1950, `${iso}: väkiluvun pitää alkaa 1950`);
    assert.equal(v.arvot.length, 2050 - 1950 + 1, `${iso}: väkiluku ei yllä 2050:een`);
    assert.ok(v.ennusteAlku > 2020 && v.ennusteAlku < 2035,
      `${iso}: ennusteAlku ${v.ennusteAlku} ei ole uskottava nykyhetki`);
    assert.notEqual(v.arvot[v.ennusteAlku - 1 - v.alku], null,
      `${iso}: "nyt"-piste (${v.ennusteAlku - 1}) on tyhjä`);
    for (const arvo of v.arvot) {
      assert.ok(arvo === null || (Number.isInteger(arvo) && arvo > 0),
        `${iso}: väkiluvussa kelvoton arvo ${arvo}`);
    }
  }
});

test('pyramidi täsmää väkilukuun', () => {
  for (const [iso, maa] of Object.entries(data.maat)) {
    const p = maa.pyramidi;
    assert.ok(p, `${iso}: pyramidi puuttuu`);
    for (const puoli of ['miehet', 'naiset']) {
      assert.equal(p[puoli].length, data.meta.pyramidiRyhmat.length,
        `${iso}: pyramidin ${puoli} ei vastaa ikäluokkia`);
      assert.ok(p[puoli].every((a) => Number.isInteger(a) && a >= 0),
        `${iso}: pyramidissa kelvoton arvo`);
    }
    // Ikäluokkien summan on oltava saman vuoden väkiluku — jos ei ole,
    // pyramidi ja käyrä kertovat eri tarinaa samalla sivulla.
    const summa = p.miehet.reduce((a, b) => a + b, 0) + p.naiset.reduce((a, b) => a + b, 0);
    const vakiluku = maa.vakiluku.arvot[p.vuosi - maa.vakiluku.alku];
    assert.ok(Math.abs(summa - vakiluku) / vakiluku < 0.02,
      `${iso}: pyramidin summa ${summa} ei täsmää väkilukuun ${vakiluku} vuonna ${p.vuosi}`);
  }
});

test('aikasarjat ovat { alku, arvot } eikä reunoilla ole tyhjää', () => {
  for (const [iso, maa] of Object.entries(data.maat)) {
    for (const avain of WB_MITTARIT) {
      const sarja = maa[avain];
      if (!sarja) continue; // maakohtainen aukko on sallittu — käyrä jää pois
      assert.ok(sarja.alku >= 1950 && sarja.alku <= 2020, `${iso}.${avain}: outo alkuvuosi ${sarja.alku}`);
      assert.ok(sarja.arvot.length > 0, `${iso}.${avain}: tyhjä sarja`);
      assert.notEqual(sarja.arvot[0], null, `${iso}.${avain}: alussa tyhjää — alku-vuosi on väärä`);
      assert.notEqual(sarja.arvot.at(-1), null, `${iso}.${avain}: lopussa tyhjää — sarjaa ei ole siistitty`);
      assert.ok(sarja.arvot.every((a) => a === null || Number.isFinite(a)),
        `${iso}.${avain}: kelvoton arvo`);
    }
    if (maa.kaupungistuminen) {
      assert.ok(maa.kaupungistuminen.arvot.every((a) => a === null || (a >= 0 && a <= 100)),
        `${iso}: kaupungistumisaste ei ole prosentti`);
    }
    if (maa.elinika) {
      // Alaraja on väljä tarkoituksella: katastrofivuodet ovat tosia
      // (Ruanda 1994 = 12,2; Kambodža 1976 = 11,3) eivätkä saa kaataa
      // testiä. Tunnetut virhearvot pudottaa jo työkalu (POISTOT).
      assert.ok(maa.elinika.arvot.every((a) => a === null || (a > 5 && a < 100)),
        `${iso}: elinajanodote ei ole vuosia`);
    }
  }
});

test('silloin-merkintä osuu isoisän päiväkirjan aikakauteen', () => {
  // Päiväkirja on vuodelta 1873 (docs/tarina.md). Merkintä saa
  // puuttua maalta, jolta ei ole 1800-luvun arviota — mutta jos se
  // on, sen pitää olla oikealta vuosikymmeneltä ja väkiluvun näköinen.
  for (const [iso, maa] of Object.entries(data.maat)) {
    if (!maa.silloin) continue;
    assert.ok(Math.abs(maa.silloin.vuosi - 1873) <= 10,
      `${iso}: silloin-vuosi ${maa.silloin.vuosi} ei ole päiväkirjan aikakautta`);
    assert.ok(Number.isInteger(maa.silloin.arvo) && maa.silloin.arvo > 0,
      `${iso}: silloin-arvo ${maa.silloin.arvo} ei ole väkiluku`);
  }
  for (const iso of PILOTTI) {
    assert.ok(data.maat[iso].silloin, `${iso}: silloin-merkintä puuttuu pilottimaalta`);
  }
});

/*
 * CO₂-sarjan tunnus on vaihtunut Maailmanpankissa ennenkin
 * (EN.ATM.CO2E.PC → EN.GHG.CO2.PC.CE.AR5). Työkalu kaatuu jos sarja
 * on tyhjä, mutta tämä testi vartioi myös käsin tehtyä tai vanhalla
 * työkalulla ajettua tiedostoa: pilottimailla on oltava CO₂-käyrä.
 */
test('pilottimailla on kaikki mittarit — myös CO₂', () => {
  for (const iso of PILOTTI) {
    for (const avain of WB_MITTARIT) {
      const sarja = data.maat[iso][avain];
      assert.ok(sarja, `${iso}: mittari ${avain} puuttuu`);
      const havaintoja = sarja.arvot.filter((a) => a !== null).length;
      assert.ok(havaintoja >= 25, `${iso}.${avain}: vain ${havaintoja} havaintoa`);
    }
  }
});

test('suuruusluokat: Suomen luvut ovat asukkaita, vuosia ja tonneja', () => {
  const fin = data.maat.FIN;
  const nyt = fin.vakiluku.arvot[fin.vakiluku.ennusteAlku - 1 - fin.vakiluku.alku];
  assert.ok(nyt > 5_000_000 && nyt < 6_500_000, `Suomen väkiluku ${nyt} — yksikkövirhe?`);
  const elinika = fin.elinika.arvot.findLast((a) => a !== null);
  assert.ok(elinika > 75 && elinika < 95, `Suomen elinajanodote ${elinika}`);
  const co2 = fin.co2.arvot.findLast((a) => a !== null);
  assert.ok(co2 > 1 && co2 < 20, `Suomen CO₂/asukas ${co2}`);
});

/*
 * Aineisto ladataan laiskasti eikä sitä upoteta yhden tiedoston
 * versioon (docs/valtion-analyysi.md: standalone on jo ~6,5 Mt).
 * Kokoraja vahtii ettei tiedosto paisu yli suunnitellun, ja
 * kokoajan lähdekoodi ettei kukaan upota sitä vahingossa.
 */
test('tiedosto pysyy laiskan latauksen kokoisena eikä päädy standaloneen', () => {
  const koko = statSync(POLKU).size;
  assert.ok(koko < 3 * 1024 * 1024, `maakayrat.json on ${Math.round(koko / 1024)} kt — suunniteltu enintään ~2 Mt`);
  const kokooja = readFileSync(join(JUURI, 'tools/build-standalone.mjs'), 'utf8');
  assert.ok(!kokooja.includes('maakayrat'),
    'tools/build-standalone.mjs viittaa maakayrat-aineistoon — sitä ei upoteta standaloneen');
});
