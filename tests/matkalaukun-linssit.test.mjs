/*
 * LINSSIT-NÄKYMÄ: NAPAUTUS ESIKATSELEE, TOIMINTONAPPI AKTIVOI.
 *
 * Omistajan tilaus 5.9.2026 sanatarkasti: *"muuta: kun linssi klikataan
 * matkalaukussa niin silloin päivittyy vasta selite teksti ja tekstin
 * loppuun tulee "aktivoi", mitä klikkaamalla linssi menee päälle ja
 * matkalaukku sulkeutuu"*.
 *
 * PÄIVITETTY 29.9.2026 (pillerivalikkouudistus, omistaja): entinen
 * matkalaukku (#passport-dialog) on poistettu, ja linssivalitsin
 * (#linssi-kotelo/#linssi-valikko — tunnisteet entiset) asuu nyt
 * pillerivalikon Linssit-näkymässä. Kaksivaiheisuuden LOGIIKKA
 * (rakennaLinssivalikko, esikatseleLinssi, aktivoiLinssi) ei muuttunut,
 * mutta RIVIT piirtää nyt js/kokoelmanakyma.js:n piirraKokoelma —
 * samalla piirtimellä kuin Aarteet-näkymä (ks. tests/kokoelmanakyma.test.mjs).
 * Tämä testi vartioi siis kahta asiaa: että ui.js kytkee kokoelmanäkymän
 * oikeilla takaisinkutsuilla, ja että kaksivaiheisuus toimii rivistä
 * riviin asti.
 *
 * Vartioitava sääntö on kaksivaiheisuus, ja se rikkoutuisi HILJAA:
 * jos ruudun kuuntelija joskus palautetaan kutsumaan valitseLinssiä
 * suoraan, mikään ei kaadu — linssi vain syttyisi taas väärässä
 * kohdassa ja laukku jäisi auki. Siksi testi kiinnittää kolme asiaa:
 *
 *   1. ruudun napautus EI kutsu valitseLinssiä eikä sulje laukkua,
 *   2. napautus kirjoittaa juuri sen linssin selitteen esikatselukorttiin
 *      ja muuttaa rivin itsensä Aktivoi-napiksi (myös "Ei linssiä" -riville),
 *   3. Aktivoi kutsuu valitseLinssiä oikealla tunnuksella JA sulkee
 *      laukun — ja päällä olevan linssin kohdalla nappi on "Ota pois",
 *      joka kytkee linssin pois (valitseLinssi(null)).
 *
 * DOM ajetaan pienellä omalla puumallilla samaan tapaan kuin
 * tests/pollo.test.mjs ja tests/lukija.test.mjs: Nodessa ei ole
 * selainta, eikä repoon oteta jsdomia. Malli toteuttaa täsmälleen ne
 * kentät, joita js/kokoelmanakyma.js ja ui.js:n linssimetodit DOMilta
 * kysyvät.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

/* ---------------------------------------------------------------- */
/* Pieni DOM-malli                                                   */
/* ---------------------------------------------------------------- */

class Teksti {
  constructor(data) {
    this.nodeType = 3;
    this.data = data;
  }
}

class Elementti {
  constructor(nimi) {
    this.nodeType = 1;
    this.tagName = nimi.toUpperCase();
    this.luokat = new Set();
    this.attrs = {};
    this.dataset = {};
    this.childNodes = [];
    this.kuuntelijat = new Map();
    this.textContent = '';
    this.innerHTML = '';
    this.style = {};
    this.classList = {
      add: (n) => this.luokat.add(n),
      remove: (n) => this.luokat.delete(n),
      contains: (n) => this.luokat.has(n),
      toggle: (n, pakko) => {
        const paalle = pakko ?? !this.luokat.has(n);
        if (paalle) this.luokat.add(n);
        else this.luokat.delete(n);
        return paalle;
      },
    };
  }

  get className() { return [...this.luokat].join(' '); }

  set className(arvo) {
    this.luokat = new Set(String(arvo).split(/\s+/).filter(Boolean));
  }

  appendChild(lapsi) { this.childNodes.push(lapsi); return lapsi; }

  replaceChildren(...lapset) { this.childNodes = lapset; }

  remove() {}

  replaceWith() {}

  setAttribute(nimi, arvo) { this.attrs[nimi] = String(arvo); }

  getAttribute(nimi) {
    return Object.prototype.hasOwnProperty.call(this.attrs, nimi) ? this.attrs[nimi] : null;
  }

  addEventListener(laji, kasittelija) {
    if (!this.kuuntelijat.has(laji)) this.kuuntelijat.set(laji, []);
    this.kuuntelijat.get(laji).push(kasittelija);
  }

  /** Testin napautus: ajaa kuuntelijat kuten selain. */
  napauta() {
    for (const k of this.kuuntelijat.get('click') ?? []) k({ target: this });
  }

  matches(valitsin) {
    if (valitsin.startsWith('.')) return this.luokat.has(valitsin.slice(1));
    return this.tagName === valitsin.toUpperCase();
  }

  /** Tukee vain jälkeläisvalitsimia ("a b"), joita ui.js käyttää. */
  querySelectorAll(valitsin) {
    const osat = valitsin.trim().split(/\s+/);
    let taso = [this];
    for (const osa of osat) {
      const seuraava = [];
      for (const solmu of taso) {
        for (const jalkelainen of jalkelaiset(solmu)) {
          if (jalkelainen.matches(osa)) seuraava.push(jalkelainen);
        }
      }
      taso = seuraava;
    }
    return taso;
  }
}

function* jalkelaiset(solmu) {
  for (const lapsi of solmu.childNodes) {
    if (lapsi.nodeType !== 1) continue;
    yield lapsi;
    yield* jalkelaiset(lapsi);
  }
}

/** Koko alipuun teksti: selite + sen perään ladottu "aktivoi". */
function teksti(solmu) {
  if (solmu.nodeType === 3) return solmu.data;
  return solmu.textContent + solmu.childNodes.map(teksti).join('');
}

/*
 * Moduulit tekevät tuonnin yhteydessä pieniä kytkentöjä (esim.
 * js/fokuskohteet.js kuuntelee pointerdownia), joten mallin on
 * kestettävä nekin. Ne eivät kuulu tähän testiin: tyhjät toteutukset
 * riittävät.
 */
globalThis.document = {
  createElement: (nimi) => new Elementti(nimi),
  createTextNode: (data) => new Teksti(data),
  createElementNS: (_tila, nimi) => new Elementti(nimi),
  addEventListener() {},
  removeEventListener() {},
  querySelector: () => null,
  querySelectorAll: () => [],
  getElementById: () => null,
  documentElement: new Elementti('html'),
  body: new Elementti('body'),
};
globalThis.window ??= { matchMedia: () => ({ matches: false, addEventListener() {} }) };
globalThis.localStorage ??= { getItem: () => null, setItem() {}, removeItem() {} };

const { UI } = await import('../js/ui.js');

/* ---------------------------------------------------------------- */
/* Linssit-näkymä pienoiskoossa                                      */
/* ---------------------------------------------------------------- */

const LINSSIT = [
  { tunnus: 'topografia', nimi: 'Topografia', lyhyt: 'Maaston korkeus väreinä.' },
  { tunnus: 'vesistot', nimi: 'Vesistöt', lyhyt: 'Joet ja järvet esiin.' },
];

/**
 * Rakentaa näkymän oikeilla ui.js:n metodeilla mutta tyngällä
 * ympäristöllä. valitseLinssi ja suljeLaukku ovat kirjureita: testin
 * koko idea on, kuka niitä kutsuu ja milloin. suljeLaukku on oma
 * kirjurinsa (ei enää passportDialog-tynkää) — sen oma toteutus
 * (asetaMusiikkitila, Livian tunnereaktio) kuuluu muualle testattavaksi
 * eikä tähän kaksivaiheisuuden vartioon.
 */
function laukku({ paalla = null } = {}) {
  const ui = Object.create(UI.prototype);
  ui.linssiValikko = new Elementti('div');
  ui.linssiValittu = paalla;
  ui.linssiEsikatselu = undefined;
  ui.linssiTuki = { kaikki: LINSSIT };
  ui.valitsut = [];
  ui.valitseLinssi = (tunnus) => { ui.valitsut.push(tunnus); };
  ui.suljettu = false;
  ui.suljeLaukku = () => { ui.suljettu = true; };
  ui.rakennaLinssivalikko(LINSSIT);
  return ui;
}

const ruudut = (ui) => ui.linssiValikko.querySelectorAll('.kokoelma-rivi');
const esikatselu = (ui) => ui.linssiValikko.querySelectorAll('.kokoelma-esikatselu')[0];
const selite = (ui) => esikatselu(ui)?.childNodes.find((n) => n.luokat?.has('kokoelma-esikatselu-selite'));
const toiminto = (ui) => esikatselu(ui)?.childNodes.find((n) => n.luokat?.has('kokoelma-toiminto')) ?? null;

/* ---------------------------------------------------------------- */

test('listassa on "Ei linssiä" ja jokainen linssi', () => {
  const ui = laukku();
  assert.deepEqual(ruudut(ui).map((n) => n.dataset.id), [null, 'topografia', 'vesistot']);
});

/*
 * KESKENERÄISET OMAAN RYHMÄÄNSÄ LISTAN LOPPUUN (omistaja 20.9.2026
 * klo 15.10: vertailulinssi, maidentiedot ja vesistölinssi harmaalla,
 * omalle riville — toimivat yhä). Linssi kertoo itse (`kesken: true`);
 * js/kokoelmanakyma.js latoo ne omaan ryhmäänsä otsikolla
 * "Keskeneräiset", ja napautus toimii kuten valmiilla.
 */
test('keskeneräiset linssit ladotaan omaan ryhmäänsä listan loppuun ja toimivat', async () => {
  const ui = Object.create(UI.prototype);
  ui.linssiValikko = new Elementti('div');
  ui.linssiValittu = null;
  ui.linssiEsikatselu = undefined;
  const linssit = [
    { tunnus: 'vertailu', nimi: 'Vertailulinssi', lyhyt: 'Vertaa.', kesken: true },
    { tunnus: 'topografia', nimi: 'Topografia', lyhyt: 'Maasto.' },
    { tunnus: 'vesistot', nimi: 'Vesistöt', lyhyt: 'Vesi.', kesken: true },
  ];
  ui.linssiTuki = { kaikki: linssit };
  ui.valitsut = [];
  ui.valitseLinssi = (tunnus) => { ui.valitsut.push(tunnus); };
  ui.suljettu = false;
  ui.suljeLaukku = () => { ui.suljettu = true; };
  ui.rakennaLinssivalikko(linssit);

  const ryhmat = ui.linssiValikko.querySelectorAll('.kokoelma-ryhma');
  assert.equal(ryhmat.length, 2, 'valmiit ja keskeneräiset ovat eri ryhmissä');
  assert.deepEqual(ryhmat[0].querySelectorAll('.kokoelma-rivi').map((n) => n.dataset.id),
    [null, 'topografia']);
  const kesken = ryhmat[1].querySelectorAll('.kokoelma-rivi');
  assert.deepEqual(kesken.map((n) => n.dataset.id), ['vertailu', 'vesistot']);
  const otsikot = ui.linssiValikko.querySelectorAll('.kokoelma-otsikko');
  assert.ok(otsikot.some((o) => /Keskeneräiset/.test(teksti(o))), 'otsikko "Keskeneräiset" puuttuu');

  // Toimii yhä: napautus esikatselee, toimintonappi kytkee.
  kesken[0].napauta();
  assert.equal(ui.linssiEsikatselu, 'vertailu');
  toiminto(ui).napauta();
  assert.deepEqual(ui.valitsut, ['vertailu']);
  // Oikeat linssimoduulit kantavat lipun itse.
  for (const tiedosto of ['vertailu', 'maatiedot', 'vesistot']) {
    const { LINSSI } = await import(`../js/linssit/${tiedosto}.js`);
    assert.equal(LINSSI.kesken, true, `${tiedosto}: kesken-lippu puuttuu`);
  }
  const { LINSSI: topografia } = await import('../js/linssit/topografia.js');
  assert.ok(!topografia.kesken);
});

test('ruudun napautus ei kytke linssiä eikä sulje laukkua (omistaja 5.9.2026)', () => {
  const ui = laukku();
  ruudut(ui)[1].napauta();
  assert.deepEqual(ui.valitsut, [], 'napautus ei saa kutsua valitseLinssiä');
  assert.equal(ui.suljettu, false, 'laukku jää auki, kunnes aktivoidaan');
});

test('napautus vaihtaa selitteen ja merkitsee rivin esikatselluksi', () => {
  const ui = laukku();
  ruudut(ui)[2].napauta();
  assert.equal(ui.linssiEsikatselu, 'vesistot');
  assert.match(teksti(selite(ui)), /Joet ja järvet esiin\./);
  assert.equal(ruudut(ui)[2].luokat.has('esikatselu'), true);
  assert.equal(ruudut(ui)[1].luokat.has('esikatselu'), false);
  /*
   * Kytketty linssi on eri asia kuin katsottu: päällä on yhä "Ei
   * linssiä" (kartta on paljas), vaikka selite puhuu vesistöistä.
   * Juuri tämä kahden merkin ero on tilauksen ydin.
   */
  assert.deepEqual(ruudut(ui).filter((n) => n.luokat.has('aktiivinen')).map((n) => n.dataset.id), [null]);
});

test('esikatselukorttiin tulee toimintonappi (omistaja 6.9.2026)', () => {
  const ui = laukku();
  ruudut(ui)[1].napauta();
  const nappi = toiminto(ui);
  assert.ok(nappi, 'toimintonappi puuttuu');
  assert.equal(nappi.textContent, 'Aktivoi');
  /*
   * NAPPI ON ESIKATSELUKORTIN OSA, EI ERILLINEN SANA (omistaja
   * 6.9.2026: "Tee aktivoi tekstistä nappi"). Selite jää pelkäksi
   * kappaleeksi, ja nappi seuraa sitä esikatselukortin lapsena.
   */
  assert.equal(selite(ui).childNodes?.includes(nappi) ?? false, false,
    'nappi ei kuulu selitekappaleen sisään');
  assert.match(teksti(selite(ui)), /Maaston korkeus väreinä\.$/);
  const lapset = esikatselu(ui).childNodes;
  assert.equal(lapset.indexOf(nappi), lapset.indexOf(selite(ui)) + 1,
    'nappi on heti selitteen jälkeen');
  // Sormelle riittävä kosketuskohde tulee CSS:stä (.kokoelma-toiminto).
  const css = readFileSync(new URL('../css/styles.css', import.meta.url), 'utf8');
  const lohko = css.slice(css.indexOf('.kokoelma-toiminto {'));
  assert.match(lohko.slice(0, 400), /min-height: var\(--pilleri-rivi-korkeus\);/);
  assert.match(css, /--pilleri-rivi-korkeus: 44px;/);
});

test('toimintonappi kytkee linssin ja sulkee laukun', () => {
  const ui = laukku();
  ruudut(ui)[1].napauta();
  toiminto(ui).napauta();
  assert.deepEqual(ui.valitsut, ['topografia']);
  assert.equal(ui.suljettu, true, 'laukun pitää sulkeutua aktivoinnista');
  assert.equal(ui.linssiEsikatselu, undefined, 'esikatselu nollautuu kytkennästä');
});

test('"Ei linssiä" toimii kuten linssit: selite ja toimintonappi', () => {
  const ui = laukku({ paalla: 'topografia' });
  ruudut(ui)[0].napauta();
  assert.match(teksti(selite(ui)), /Kartta sellaisena kuin isoisä sen piirsi\.$/);
  assert.equal(toiminto(ui)?.textContent, 'Aktivoi');
  const otsikko = esikatselu(ui).childNodes.find((n) => n.luokat?.has('kokoelma-esikatselu-nimi'));
  assert.equal(otsikko?.textContent, 'Ei linssiä');
  toiminto(ui).napauta();
  assert.deepEqual(ui.valitsut, [null]);
  assert.equal(ui.suljettu, true);
});

/*
 * POISKYTKENTÄ SÄILYY SAMASSA NAPISSA (omistaja 6.9.2026 antoi luvan
 * disabloituun "Käytössä"-nappiin vain siltä varalta, ettei nykyinen
 * koodi tue poiskytkentää — se tukee, joten käyttäytyminen säilyy).
 */
test('päällä olevan linssin kohdalla nappi on "Ota pois" ja se kytkee pois', () => {
  const ui = laukku({ paalla: 'vesistot' });
  ruudut(ui)[2].napauta();
  const nappi = toiminto(ui);
  assert.equal(nappi.textContent, 'Ota pois');
  nappi.napauta();
  assert.deepEqual(ui.valitsut, [null], '"Ota pois" kytkee linssin pois');
  assert.equal(ui.suljettu, true);
});

/*
 * OMISTAJA 29.9.2026 (pillerivalikkouudistus): "Linssit voisivat olla
 * listana ilman selitetekstiä ... kun linssiä klikkaa, niin vasemmalle
 * puolelle tulee ... selite" — tämä KUMOAA aiemman linjan, jossa
 * esikatselu näytti oletuksena päällä olevan linssin selitteen ilman
 * napautusta. Uusi lista on tyhjä ilman napautusta; aktiivinen linssi
 * näkyy silti kuvakkeensa kultarenkaasta (linssiRivi: `aktiivinen`).
 */
test('ilman napautusta esikatselukortti on piilossa; aktiivinen linssi näkyy kuvakerenkaasta', () => {
  const ui = laukku({ paalla: 'topografia' });
  assert.equal(esikatselu(ui).hidden, true,
    'esikatselukortti ei saa näkyä ilman napautusta');
  assert.equal(toiminto(ui), null, 'avattaessa ei ole mitään uutta aktivoitavaa');
  assert.equal(ruudut(ui)[1].luokat.has('aktiivinen'), true);
});

/*
 * Ruudukko on sama molemmilla laudoilla: pallolauta (oletus) ja vanha
 * kartta (?lauta=kartta) käyttävät täsmälleen tätä samaa rakentajaa,
 * eikä kaksivaiheisuus saa kadota kummaltakaan. Sen sijaan pallo on
 * TOIMINTO eikä tila (valitseLinssi('pallo')), joten senkin rivi
 * odottaa toimintonapin napautusta.
 */
test('pallolinssin rivi odottaa toimintonapin napautusta kuten muutkin', () => {
  const ui = Object.create(UI.prototype);
  ui.linssiValikko = new Elementti('div');
  ui.linssiValittu = null;
  ui.linssiEsikatselu = undefined;
  const pallolinssit = [{ tunnus: 'pallo', nimi: 'Karttapallo', lyhyt: 'Maailma pallona.' }];
  ui.linssiTuki = { kaikki: pallolinssit };
  ui.valitsut = [];
  ui.valitseLinssi = (tunnus) => { ui.valitsut.push(tunnus); };
  ui.suljettu = false;
  ui.suljeLaukku = () => { ui.suljettu = true; };
  ui.rakennaLinssivalikko(pallolinssit);
  const rivi = ui.linssiValikko.querySelectorAll('.kokoelma-rivi')[1];
  rivi.napauta();
  assert.deepEqual(ui.valitsut, []);
  assert.equal(ui.suljettu, false);
  toiminto(ui).napauta();
  assert.deepEqual(ui.valitsut, ['pallo']);
});

/*
 * Lähdekoodin lupaus: rivin kuuntelija menee esikatseluun eikä
 * suoraan kytkentään. Tämä on tarkoituksella tekstitarkistus — se
 * osoittaa suoraan siihen yhteen riviin, joka tilauksessa muuttui,
 * jos joku palauttaa vanhan suoran kytkennän.
 */
test('ui.js: rivin data kertoo esikatseleLinssin, ei valitseLinssin', () => {
  const lahde = readFileSync(new URL('../js/ui.js', import.meta.url), 'utf8');
  assert.match(lahde, /esikatsele: \(id\) => this\.esikatseleLinssi\(id\)/);
  assert.doesNotMatch(lahde, /esikatsele: \(id\) => this\.valitseLinssi\(id\)/);
});
