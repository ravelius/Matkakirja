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
  PAIKAN_LEVEYDET,
  PAIKAN_OLETUSLEVEYS,
  ajonLeveys,
  etsiPaikka,
  kelpaakoAsteet,
  kohdeNakymassa,
  kokoaHakemisto,
  lahtonakyma,
  nakymaPalasi,
  naytaPaikka,
  nimiOsuu,
  normalisoiPaikannimi,
  onPaikkakysymys,
  paikanLeveys,
  paluuAjo,
  ratkaisePaikka,
  tarvitaankoAjo,
} from '../js/pulu-paikka.js';
import { MAASTOKOHTEET } from '../js/packs/maastokohteet.js';
import { KOHDE_MAAT } from '../js/fokuskohteet.js';
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
  // Tuntematon tyyppi on pistemäinen oletus, ei alueoletus: Kernavė-vika
  // 11.9.2026 syntyi juuri siitä, että tuntematon tyyppi zoomasi ULOS.
  assert.equal(paikanLeveys('tuntematon'), PAIKAN_OLETUSLEVEYS);
  assert.ok(PAIKAN_OLETUSLEVEYS <= PAIKAN_LEVEYDET.kohde);
});

/*
 * VARTIO: AINEISTON JOKAINEN NOSTOTYYPPI ON TAULUSSA.
 *
 * Omistajan havainto 11.9.2026 (iPad, Vilna): Kernavėn tyyppi on
 * `historia`, jota PAIKAN_LEVEYDET ei tuntenut — kamera loitontui
 * alueoletukseen (600 yks = 18°) keskellä Liettuaa. Tämä testi kaatuu,
 * jos aineistoon ilmestyy tyyppi, jota taulu ei tunne.
 */
const AINEISTON_TYYPIT = (() => {
  const ulos = new Set();
  for (const taulu of [MAASTOKOHTEET, KOHDE_MAAT]) {
    for (const kohteet of Object.values(taulu ?? {})) {
      for (const kohde of kohteet ?? []) {
        if (kohde?.tyyppi) ulos.add(String(kohde.tyyppi).toLowerCase());
      }
    }
  }
  return [...ulos].sort();
})();

/** Laajat muodot: vain nämä saavat olla kohteen lähikuvaa väljempiä. */
const LAAJAT_TYYPIT = new Set(['vuori', 'jarvi', 'alue', 'joki', 'meri', 'vuoristo', 'maa']);

test('jokainen aineiston nostotyyppi on leveystaulussa', () => {
  assert.ok(AINEISTON_TYYPIT.length > 10, `tyyppejä vain ${AINEISTON_TYYPIT.length}`);
  for (const tyyppi of AINEISTON_TYYPIT) {
    assert.ok(Object.hasOwn(PAIKAN_LEVEYDET, tyyppi),
      `tyyppi puuttuu PAIKAN_LEVEYDET-taulusta: ${tyyppi}`);
  }
});

test('pistemäinen nosto saa kohteen lähikuvan eikä alueen väljyyttä', () => {
  for (const tyyppi of AINEISTON_TYYPIT) {
    if (LAAJAT_TYYPIT.has(tyyppi)) {
      assert.ok(paikanLeveys(tyyppi) > PAIKAN_LEVEYDET.kohde, `laaja tyyppi liian tiukka: ${tyyppi}`);
    } else {
      assert.ok(paikanLeveys(tyyppi) <= PAIKAN_LEVEYDET.kohde,
        `pistemäinen tyyppi zoomaa ulos: ${tyyppi} = ${paikanLeveys(tyyppi)}`);
    }
  }
  // Kernavė (js/packs/maastokohteet-ltu.js) on tyypiltään historia.
  assert.equal(paikanLeveys('historia'), PAIKAN_LEVEYDET.kohde);
});

test('ajo ei koskaan kasvata näkymän leveyttä', () => {
  assert.equal(ajonLeveys(600, 240), 240, 'pyydetty väljempi kuin nykyinen → nykyinen');
  assert.equal(ajonLeveys(240, 1200), 240, 'lähentää saa');
  assert.equal(ajonLeveys(320, 320), 320);
  // Puuttuva luku ei saa kaataa eikä keksiä loitonnusta.
  assert.equal(ajonLeveys(0, 900), 900);
  assert.equal(ajonLeveys(320, 0), 320);
  for (const tyyppi of AINEISTON_TYYPIT) {
    assert.ok(ajonLeveys(paikanLeveys(tyyppi), 240) <= 240, tyyppi);
  }
});

test('jo näkyvissä oleva kohde ei tarvitse ajoa', () => {
  const alue = {
    x: 6000, y: 1800, w: 400, h: 300,
  };
  const keskus = { x: 6200, y: 1950 };
  assert.ok(kohdeNakymassa(keskus, alue));
  assert.equal(kohdeNakymassa({ x: 6390, y: 1950 }, alue), false, 'reunassa ei ole näkyvissä');
  // Näkyvissä eikä lähennettävää → ajoa ei tarvita.
  assert.equal(tarvitaankoAjo(keskus, alue, 400), false);
  assert.equal(tarvitaankoAjo(keskus, alue, 1800), false, 'loitonnusta ei koskaan ajeta');
  // Näkyvissä, mutta pyydetty on lähempänä → lähennetään.
  assert.equal(tarvitaankoAjo(keskus, alue, 260), true);
  // Ruudun ulkopuolella → ajetaan aina.
  assert.equal(tarvitaankoAjo({ x: 9000, y: 1950 }, alue, 1800), true);
  // Kiertävä lauta: päivämäärärajan takana oleva kohde on sama piste.
  assert.ok(kohdeNakymassa({ x: 6200 - 12000, y: 1950 }, alue, 12000));
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

/* ================= 6. KARTTA LENTÄÄ VAIN SIJAINTIKYSYMYKSISTÄ ================= */

/*
 * OMISTAJAN PÄÄTÖS 11.9.2026 (iPad, Vilna → Kernavė-nosto):
 * *"Vain sijaintikysymyksistä."* Pelaaja napautti nostokortin
 * valmiskysymystä *"Miksi Kernavėä sanotaan Liettuan Troijaksi?"* ja
 * kartta lensi Rovaniemeltä Sofiaan. Nämä testit ajavat naytaPaikan
 * läpi teko-DOMilla ja mittaavat, MONTAKO ajoa kamera sai.
 */

/** Riisuttu solmu: vain se, mitä js/pulu-paikka.js oikeasti käyttää. */
class Solmu {
  constructor(tag) {
    this.tag = tag;
    this.lapset = [];
    this.style = {};
    this.luokat = new Set();
    this.kuuntelijat = [];
    this.clientWidth = 800;
    this.clientHeight = 600;
    this.classList = {
      add: (c) => this.luokat.add(c),
      remove: (c) => this.luokat.delete(c),
      toggle: (c, p) => (p ? this.luokat.add(c) : this.luokat.delete(c)),
      contains: (c) => this.luokat.has(c),
    };
  }

  set className(arvo) {
    this.nimi = String(arvo);
    for (const c of this.nimi.split(' ')) if (c) this.luokat.add(c);
  }

  get className() { return this.nimi ?? ''; }

  set textContent(arvo) { this.teksti = String(arvo); }

  get textContent() { return this.teksti ?? ''; }

  appendChild(lapsi) {
    this.lapset.push(lapsi);
    lapsi.vanhempi = this;
    return lapsi;
  }

  remove() {
    if (this.vanhempi) this.vanhempi.lapset = this.vanhempi.lapset.filter((l) => l !== this);
    this.vanhempi = null;
  }

  setAttribute() {}

  addEventListener(nimi, fn) { this.kuuntelijat.push({ nimi, fn }); }

  removeEventListener() {}
}

globalThis.document = { createElement: (tag) => new Solmu(tag) };
globalThis.requestAnimationFrame = () => 0;
globalThis.cancelAnimationFrame = () => {};
// Merkin minuutin ajastin ei saa pitää testiprosessia hereillä.
const oikeaSetTimeout = globalThis.setTimeout;
globalThis.setTimeout = (fn, ms, ...loput) => {
  const t = oikeaSetTimeout(fn, ms, ...loput);
  t?.unref?.();
  return t;
};

/** Peli teko-DOMilla: kamera-ajot talteen, näkymä laudan yksiköissä. */
function tekoNaytto({ x = 6620, y = 1878, leveys = 240 } = {}) {
  const tila = { x, y, leveys };
  const ajot = [];
  return {
    ajot,
    mapPane: new Solmu('div'),
    contentBox: { w: 12000 },
    game: TEKO_UI.game,
    kamera: () => ({
      ajaKamera: (kohde, asetukset) => {
        ajot.push({ kohde, asetukset });
        tila.x = kohde.x;
        tila.y = kohde.y;
        tila.leveys = kohde.leveys;
        return Promise.resolve(true);
      },
    }),
    nakyvaAlue: () => ({
      x: tila.x - tila.leveys / 2,
      y: tila.y - tila.leveys / 4,
      w: tila.leveys,
      h: tila.leveys / 2,
      skaala: 800 / tila.leveys,
    }),
  };
}

test('muu kuin sijaintikysymys ei aja kameraa — merkki silti syttyy', async () => {
  const ui = tekoNaytto({ x: 6620, y: 1878, leveys: 240 });
  const nakyma = ui.nakyvaAlue();
  const tulos = naytaPaikka({
    ui,
    kysymys: 'Miksi Kernavėä sanotaan Liettuan Troijaksi?',
    vastaus: 'Kernavė oli Liettuan varhainen pääkaupunki.',
    paikka: {
      nimi: 'Kernavė', lat: 54.887, lon: 24.845, tarkkuus: 'kaupunki',
    },
  });
  await Promise.resolve();
  assert.equal(tulos?.nimi, 'Kernavė', 'paikka ratkeaa yhä');
  assert.equal(ui.ajot.length, 0, 'kameraa ei saa liikuttaa');
  assert.deepEqual(ui.nakyvaAlue(), nakyma, 'näkymä jää täsmälleen ennalleen');
  // Merkki kartalle, Palaa-nappia ei tarvita kun mistään ei lähdetty.
  const luokat = ui.mapPane.lapset.map((l) => l.className);
  assert.deepEqual(luokat, ['pulu-paikkamerkki']);
  assert.ok(ui.mapPane.lapset[0].luokat.has('esilla'), 'merkki syttyy heti');
});

test('sijaintikysymys ajaa kameran eikä koskaan zoomaa ulos', async () => {
  const ui = tekoNaytto({ x: 6620, y: 1878, leveys: 240 });
  const tulos = naytaPaikka({ ui, kysymys: 'Missä Lontoo on?' });
  await Promise.resolve();
  assert.equal(tulos?.nimi, 'Lontoo');
  assert.equal(ui.ajot.length, 1);
  // Kaupungin oma porras on 260, mutta pelaaja katsoo jo 240:tä.
  assert.equal(ui.ajot[0].kohde.leveys, 240, 'ajo ei saa loitontaa');
  assert.ok(Math.abs(ui.ajot[0].kohde.x - 5829.5) < 1);
  // Palaa-nappi on olemassa, koska kamera oikeasti lähti.
  assert.ok(ui.mapPane.lapset.some((l) => l.className === 'pulu-palaa'));
});

test('laaja tyyppi ei loitonna lähikuvasta', async () => {
  const ui = tekoNaytto({ x: 6620, y: 1878, leveys: 200 });
  naytaPaikka({
    ui,
    kysymys: 'Missä Niili virtaa?',
    paikka: {
      nimi: 'Niili', lat: 15.6, lon: 32.5, tarkkuus: 'alue',
    },
  });
  await Promise.resolve();
  assert.equal(ui.ajot.length, 1);
  assert.ok(ui.ajot[0].kohde.leveys <= 200, `leveys ${ui.ajot[0].kohde.leveys}`);
});

test('jo näkyvissä oleva kohde ei laukaise ajoa lainkaan', async () => {
  // Kamera on täsmälleen Ateenan päällä kaupungin omassa mittakaavassa.
  const ui = tekoNaytto({ x: 6620.8, y: 1878.7, leveys: 260 });
  const tulos = naytaPaikka({ ui, kysymys: 'Missä Ateena on?' });
  await Promise.resolve();
  assert.equal(tulos?.nimi, 'Ateena');
  assert.equal(ui.ajot.length, 0, 'turhaa ajoa ei tehdä');
  assert.ok(!ui.mapPane.lapset.some((l) => l.className === 'pulu-palaa'),
    'ilman ajoa ei ole mitään mistä palata');
});
