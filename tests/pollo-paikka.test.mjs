/*
 * PULU NÄYTTÄÄ PAIKAN KARTALLA (js/pulu-paikka.js).
 *
 * Omistajan tilaus 6.9.2026 ilta: *"Olisiko pulun mahdollista näyttää
 * joku kohta kartalla kysyttäessä, niin että kamera lentäisi sinne?
 * Sitten jonnekin tulisi palaa nappi jolla pääsisi lähtöpaikkaan
 * takaisin."*
 *
 * Testattava on ketjun ALKUPÄÄ ja LOPPUPÄÄ — nimihaku ja lähtönäkymän
 * talteenotto — sekä se rakenteellinen lupaus, että MOLEMMAT LAUDAT
 * kulkevat saman apurin läpi. Kamera-ajo ja merkin liike mitataan
 * selaimessa (tools/savukkeet/savuke-pulu-paikka.mjs).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  MERKIN_IKA_MS,
  PAIKAN_OLETUSLEVEYS,
  etsiPaikka,
  kelpaakoAsteet,
  kokoaHakemisto,
  lahtonakyma,
  nakymaPalasi,
  nimiOsuu,
  normalisoiPaikannimi,
  onPaikkakysymys,
  paikanLeveys,
  paluuAjo,
  ratkaisePaikka,
} from '../js/pulu-paikka.js';
import { paikkaKentta } from '../js/pollo.js';
import { laudaltaAsteiksi } from '../js/fokusmitat.js';
import { poimiPaikka } from '../tools/pollo/worker.js';
import { tyhjaaEiKoodi } from '../tools/lahde-tyhjays.mjs';

const lue = (polku) => readFileSync(new URL(`../${polku}`, import.meta.url), 'utf8');

/* ================= 1. NIMIHAKU ================= */

test('nimi normalisoituu diakriiteistä ja välimerkeistä', () => {
  assert.equal(normalisoiPaikannimi('Ólympos'), 'olympos');
  assert.equal(normalisoiPaikannimi('Taÿ́getos'), 'taygetos');
  assert.equal(normalisoiPaikannimi('Iso  Orjajärvi!'), 'iso orjajarvi');
  assert.equal(normalisoiPaikannimi(null), '');
});

test('taivutettu nimi osuu kantaansa', () => {
  for (const muoto of ['sparta', 'spartan', 'spartaan', 'spartassa', 'spartasta', 'spartaa']) {
    assert.ok(nimiOsuu(muoto, 'sparta'), muoto);
  }
  assert.ok(nimiOsuu('ateenassa', 'ateena'));
  assert.ok(nimiOsuu('lontoosta', 'lontoo'));
  assert.ok(nimiOsuu('egeanmeren', 'egeanmeri') === false, 'astevaihtelu ei kuulu tähän');
  // Väärä osuma on pahempi kuin löytymättä jäänyt.
  assert.equal(nimiOsuu('spartalainen', 'sparta'), false);
  assert.equal(nimiOsuu('ateena', 'sparta'), false);
  assert.equal(nimiOsuu('', 'sparta'), false);
});

const HAKEMISTO = [
  { avain: 'ateena', nimi: 'Ateena', x: 10, y: 20, tyyppi: 'kaupunki' },
  { avain: 'olympos', nimi: 'Ólympos', x: 30, y: 40, tyyppi: 'vuori' },
  { avain: 'iso orjajarvi', nimi: 'Iso Orjajärvi', x: 50, y: 60, tyyppi: 'jarvi' },
  { avain: 'orjajarvi', nimi: 'Orjajärvi', x: 70, y: 80, tyyppi: 'jarvi' },
  { avain: 'missa', nimi: 'Missa', x: 90, y: 90, tyyppi: 'kaupunki' },
];

test('kysymyksestä löytyy paikka myös taivutettuna ja aksenteitta', () => {
  assert.equal(etsiPaikka('Missä Ateena on?', HAKEMISTO)?.nimi, 'Ateena');
  assert.equal(etsiPaikka('Kerro Ateenasta', HAKEMISTO)?.nimi, 'Ateena');
  assert.equal(etsiPaikka('Missä Olympos on?', HAKEMISTO)?.nimi, 'Ólympos');
  assert.equal(etsiPaikka('Näytä Ólympoksen paikka', HAKEMISTO), null,
    'astevaihtelua ei yritetä eikä väärää osumaa synny');
});

test('pisin osuma voittaa ja tavallinen sanasto ei ole paikka', () => {
  assert.equal(etsiPaikka('Missä Iso Orjajärvi on?', HAKEMISTO)?.nimi, 'Iso Orjajärvi');
  assert.equal(etsiPaikka('Missä Orjajärvi on?', HAKEMISTO)?.nimi, 'Orjajärvi');
  // "Missa" on hakemistossa, mutta kysymyssanana se ei kelpaa paikaksi.
  assert.equal(etsiPaikka('Missä ollaan?', HAKEMISTO), null);
  assert.equal(etsiPaikka('', HAKEMISTO), null);
  assert.equal(etsiPaikka('Missä Ateena on?', null), null);
});

test('paikkakysymys tunnistetaan, muu ei', () => {
  assert.ok(onPaikkakysymys('Missä Sparta on?'));
  assert.ok(onPaikkakysymys('Näytä Kreeta kartalla'));
  assert.ok(onPaikkakysymys('Mihin Nilus laskee?'));
  assert.ok(onPaikkakysymys('Missä Delfoi sijaitsee?'));
  assert.equal(onPaikkakysymys('Kuka Perikles oli?'), false);
  assert.equal(onPaikkakysymys(''), false);
});

/* ================= 2. KOORDINAATTIEN VALIDOINTI ================= */

test('mahdottomat koordinaatit hylätään', () => {
  assert.ok(kelpaakoAsteet(37.07, 22.43));
  assert.ok(kelpaakoAsteet(-33.9, 151.2));
  assert.equal(kelpaakoAsteet(0, 0), false, 'Null Island on tyhjän kentän oletus');
  assert.equal(kelpaakoAsteet(95, 10), false);
  assert.equal(kelpaakoAsteet(10, 200), false);
  assert.equal(kelpaakoAsteet(Number.NaN, 10), false);
  assert.equal(kelpaakoAsteet('37', '22'), false);
});

test('palvelimen paikkakenttä siivotaan muotoonsa', () => {
  assert.deepEqual(
    paikkaKentta({ nimi: '  Sparta ', lat: 37.07, lon: 22.43, tarkkuus: 'Kaupunki' }),
    {
      nimi: 'Sparta', lat: 37.07, lon: 22.43, tarkkuus: 'kaupunki',
    },
  );
  assert.equal(paikkaKentta(null), null);
  assert.equal(paikkaKentta('Sparta'), null);
  assert.equal(paikkaKentta({}), null);
});

test('workerin paikkarivi jäsentyy vain kelvollisena', () => {
  const hyva = poimiPaikka('Vastaus.\nJATKOT:\nEka?\nToka?\nPAIKKA: Sparta | 37.07 | 22.43 | kaupunki');
  assert.deepEqual(hyva, {
    nimi: 'Sparta', lat: 37.07, lon: 22.43, tarkkuus: 'kaupunki',
  });
  assert.equal(poimiPaikka('Vastaus ilman paikkaa.\nJATKOT:\nEka?\nToka?'), null);
  assert.equal(poimiPaikka('PAIKKA: Sparta | 999 | 22.43 | kaupunki'), null);
  assert.equal(poimiPaikka('PAIKKA: Null | 0 | 0 | kaupunki'), null);
  assert.equal(poimiPaikka('PAIKKA: Sparta'), null);
  // Tuntematon tarkkuus tarkoittaa kaupunkia, ei virhettä.
  assert.equal(poimiPaikka('PAIKKA: Sparta | 37.07 | 22.43 | kylä')?.tarkkuus, 'kaupunki');
});

test('näkyvä leveys tulee kohteen tyypistä', () => {
  assert.ok(paikanLeveys('kaupunki') < paikanLeveys('vuori'));
  assert.ok(paikanLeveys('vuori') < paikanLeveys('joki'));
  assert.ok(paikanLeveys('joki') < paikanLeveys('maa'));
  assert.equal(paikanLeveys('tuntematon'), PAIKAN_OLETUSLEVEYS);
});

/* ================= 3. LÄHTÖNÄKYMÄ JA PALUU ================= */

/**
 * Peli pienoiskoossa: `ui.nakyvaAlue()` ja `ui.kamera()` ovat ne kaksi
 * kahvaa, joilla paikannus puhuu kummallekin laudalle. Tämä teko-ui
 * toteuttaa täsmälleen ne — mitään lautakohtaista ei ole.
 */
function tekoPeli({ x = 6000, y = 1800, leveys = 1200 } = {}) {
  const tila = { x, y, leveys };
  const ajot = [];
  const kamera = {
    ajaKamera: (kohde, asetukset) => {
      ajot.push({ kohde, asetukset });
      tila.x = kohde.x;
      tila.y = kohde.y;
      tila.leveys = kohde.leveys;
      return Promise.resolve(true);
    },
  };
  return {
    ajot,
    kamera: () => kamera,
    nakyvaAlue: () => ({
      x: tila.x - tila.leveys / 2,
      y: tila.y - tila.leveys / 4,
      w: tila.leveys,
      h: tila.leveys / 2,
      skaala: 800 / tila.leveys,
    }),
  };
}

test('lähtönäkymä otetaan talteen keskipisteenä ja leveytenä', () => {
  const ui = tekoPeli({ x: 6000, y: 1800, leveys: 1200 });
  const alku = lahtonakyma(ui);
  assert.equal(alku.x, 6000);
  assert.equal(alku.y, 1800);
  assert.equal(alku.leveys, 1200);
  assert.equal(lahtonakyma(null), null);
  assert.equal(lahtonakyma({ nakyvaAlue: () => null }), null);
});

test('paluuajo vie täsmälleen tallennettuun näkymään', async () => {
  const ui = tekoPeli({ x: 6000, y: 1800, leveys: 1200 });
  const alku = lahtonakyma(ui);
  // Pulu lentää muualle.
  await ui.kamera().ajaKamera({ x: 6578, y: 1921, leveys: 260 }, {});
  assert.equal(nakymaPalasi(lahtonakyma(ui), alku), false);
  // Palaa-nappi.
  assert.equal(await paluuAjo(ui.kamera(), alku), true);
  const nyt = lahtonakyma(ui);
  assert.ok(Math.abs(nyt.x - alku.x) < 0.01);
  assert.ok(Math.abs(nyt.y - alku.y) < 0.01);
  assert.ok(Math.abs(nyt.leveys - alku.leveys) / alku.leveys < 0.01);
  assert.ok(nakymaPalasi(nyt, alku));
});

test('paluuajo ei lähde ilman kameraa tai tallennettua näkymää', async () => {
  assert.equal(await paluuAjo(null, { x: 1, y: 1, leveys: 10 }), false);
  assert.equal(await paluuAjo(tekoPeli().kamera(), null), false);
});

/* ================= 4. RATKAISU PELIN OMISTA AINEISTOISTA ================= */

const TEKO_UI = {
  game: {
    pack: { id: 'maailmankartta' },
    board: {
      cities: [
        { id: 'ateena', name: 'Ateena', x: 6620.8, y: 1878.7 },
        { id: 'lontoo', name: 'Lontoo', x: 5829.5, y: 1324.1 },
      ],
    },
  },
};

test('hakemisto kokoaa laudan omat aineistot', () => {
  const hakemisto = kokoaHakemisto(TEKO_UI);
  assert.ok(hakemisto.length > 200, `hakemistossa vain ${hakemisto.length} riviä`);
  const lahteet = new Set(hakemisto.map((r) => r.lahde));
  for (const lahde of ['kaupunki', 'kohde', 'karttanimi', 'kohdekartta']) {
    assert.ok(lahteet.has(lahde), `lähde puuttuu: ${lahde}`);
  }
  // Jokaisella rivillä on laudan koordinaatit — muuten kamera ei voi lentää.
  assert.ok(hakemisto.every((r) => Number.isFinite(r.x) && Number.isFinite(r.y)));
});

test('oma aineisto voittaa workerin koordinaatit', () => {
  const kohde = ratkaisePaikka({
    ui: TEKO_UI,
    kysymys: 'Missä Ateena on?',
    // Worker tarjoaa täysin väärää paikkaa: peli ei saa uskoa sitä.
    paikka: { nimi: 'Ateena', lat: 0.5, lon: 0.5, tarkkuus: 'kaupunki' },
  });
  assert.equal(kohde.nimi, 'Ateena');
  assert.equal(kohde.lahde, 'kaupunki');
  assert.ok(Math.abs(kohde.x - 6620.8) < 1);
});

test('taivutettu kysymys laukaisee näytön ilman workeria', () => {
  const kohde = ratkaisePaikka({ ui: TEKO_UI, kysymys: 'Missä Lontoossa ollaan?' });
  assert.equal(kohde?.nimi, 'Lontoo');
  assert.equal(kohde.lahde, 'kaupunki');
});

test('workerin koordinaatit ovat vara sille, mitä laudalla ei ole', () => {
  const kohde = ratkaisePaikka({
    ui: TEKO_UI,
    kysymys: 'Missä Sparta on?',
    vastaus: 'Sparta oli Lakonian tasangolla.',
    paikka: {
      nimi: 'Sparta', lat: 37.07, lon: 22.43, tarkkuus: 'kaupunki',
    },
  });
  assert.equal(kohde.nimi, 'Sparta');
  assert.equal(kohde.lahde, 'worker');
  // Piste projisoitui laudalle oikein: takaisin asteiksi ±0,05°.
  const asteet = laudaltaAsteiksi('maailmankartta', kohde.x, kohde.y);
  assert.ok(Math.abs(asteet.lat - 37.07) < 0.05, `lat ${asteet.lat}`);
  assert.ok(Math.abs(asteet.lon - 22.43) < 0.05, `lon ${asteet.lon}`);
});

test('mahdoton koordinaatti ja tavallinen kysymys eivät lennätä kameraa', () => {
  assert.equal(ratkaisePaikka({
    ui: TEKO_UI,
    kysymys: 'Missä Sparta on?',
    paikka: { nimi: 'Sparta', lat: 0, lon: 0, tarkkuus: 'kaupunki' },
  }), null);
  assert.equal(ratkaisePaikka({ ui: TEKO_UI, kysymys: 'Kuka Perikles oli?' }), null);
  assert.equal(ratkaisePaikka({ ui: null, kysymys: 'Missä Ateena on?' }), null);
});

/* ================= 5. YKSI APURI, MOLEMMAT LAUDAT ================= */

test('paikkanäyttö kulkee kameradelegaatin läpi eikä haarauta lautaa', () => {
  const koodi = tyhjaaEiKoodi(lue('js/pulu-paikka.js'));
  assert.ok(koodi.includes('kamera?.()') || koodi.includes('kamera()'),
    'ui.kamera() on ainoa tie kameraan');
  assert.ok(koodi.includes('nakyvaAlue?.()'),
    'ui.nakyvaAlue() on ainoa tie näkymään');
  for (const kielletty of ['pallolauta', 'ui.kartta', 'pallolautaPaalla']) {
    assert.ok(!koodi.includes(kielletty),
      `lautahaara koodissa: ${kielletty} — ui.kamera() valitsee laudan`);
  }
});

test('pöllö ei tuo paikannusta vaan paikannus rekisteröityy pöllöön', () => {
  const pollo = lue('js/pollo.js');
  assert.ok(!pollo.includes("from './pulu-paikka.js'"),
    'riippuvuus kulkee toisin päin: pöllö ei saa vetää karttaa perässään');
  assert.ok(pollo.includes('export function asetaPaikkanaytto'));
  assert.ok(pollo.includes('naytaPaikkaKartalla({ kysymys })'),
    'kysymys laukaisee näytön ilman palvelinta');
  assert.ok(pollo.includes('paikka: tulos?.paikka ?? null'),
    'palvelimen paikkakenttä on vara kysymykselle');
  const paikannus = lue('js/pulu-paikka.js');
  assert.ok(paikannus.includes("asetaPaikkanaytto } from './pollo.js'"));
  assert.ok(lue('js/main.js').includes('kytkePulunPaikannus()'));
});

test('uusi moduuli on SHELLissä ja niputuksessa', () => {
  assert.ok(lue('sw.js').includes("'./js/pulu-paikka.js'"));
  const kokooja = lue('tools/build-standalone.mjs');
  assert.ok(kokooja.includes("'js/pulu-paikka.js'"));
  // Järjestys: paikannus tuo pöllön, joten sen on oltava sen jälkeen.
  assert.ok(kokooja.indexOf("'js/pulu-paikka.js'") > kokooja.indexOf("'js/pollo.js'"));
  assert.ok(kokooja.indexOf("'js/pulu-paikka.js'") < kokooja.indexOf("'js/main.js'"));
});

test('merkki on väliaikainen ja tyylit ovat olemassa', () => {
  assert.equal(MERKIN_IKA_MS, 60000);
  const css = lue('css/styles.css');
  for (const luokka of ['.pulu-paikkamerkki', '.pulu-palaa', '.pollo-paikkarivi']) {
    assert.ok(css.includes(luokka), `tyyli puuttuu: ${luokka}`);
  }
});
