/*
 * ETSI AARRE -NAPPI KARTALLA (js/etsi-aarre-nappi.js).
 *
 * Omistaja 9.9.2026 (Raamattu, PULUN KOMMENTIN JALKEEN KARTALLE NAPPI
 * "ETSI AARRE" KAUPUNGIN LAATAN VIEREEN, sanatarkasti): *"kun pulun
 * kommentti on tullut, kartalle saisi tulla kaupungin laatan viereen
 * nappi: Etsi aarre, mikä avaisi kaupunkilehden."*
 *
 * Neljä lupausta, jotka eivät näy diffistä eivätkä ruutukaappauksesta:
 *
 *   1. NAPPI EI TULE ENNEN KOMMENTTIA. Kartalle ei saa ilmestyä mitään
 *      luennan aikana — ja se on rakenteellinen asia: napin ainoa
 *      tuotantokutsu on siinä kohdassa, jossa kommenttikupla oikeasti
 *      nousee ruudulle (js/fokusvirta.js fokusvirtaSaapumiskupla →
 *      nayta), ei kutsuhetkellä.
 *   2. SAMA EHTO KUIN KORTIN "ETSI KÄTKÖ" -NAPILLA. Kaupunki, jossa ei
 *      ole enää kätköä (js/game.js tehtavaTarjolla → js/ui.js
 *      tehtavaNapinTila), ei saa nappia — eikä myöskään kaupunki, jonka
 *      kortilla nappi olisi harmaana.
 *   3. SAMA OVI, EI KOPIOTA. Painallus kutsuu `ui.etsiKatko()` eli
 *      täsmälleen sitä ketjua, jonka kortin nappi ajaa. Kopioitu ketju
 *      ajautuisi erilleen ensimmäisessä muutoksessa.
 *   4. LÄHTÖ VIE NAPIN. Kaupungista lähtiessä nappi poistuu samasta
 *      koukusta kuin luentakuva (vaiennaLivianKaupunkipuhe).
 *
 * DOM-osuus ajetaan pienellä omalla puumallilla samaan tapaan kuin
 * tests/luentakuva.test.mjs ja tests/pollo.test.mjs: Nodessa ei ole
 * selainta, eikä repoon oteta jsdomia yhtä testiä varten. Selainpuoli
 * (paikka laatan vieressä, kartan seuraaminen tasokartalla ja pallolla)
 * on katsottu Chromiumilla ruutukaappauksesta.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  ETSI_AARRE_TEKSTI,
  etsiAarreTarjolla,
  naytaEtsiAarreNappi,
  piilotaEtsiAarreNappi,
} from '../js/etsi-aarre-nappi.js';

const lue = (polku) => readFileSync(new URL(`../${polku}`, import.meta.url), 'utf8');

/* ---------------------------------------------------------------- */
/* Pieni DOM-malli                                                   */
/* ---------------------------------------------------------------- */

class Teksti {
  constructor(data) {
    this.nodeType = 3;
    this.nodeValue = String(data);
    this.parentNode = null;
  }

  get textContent() { return this.nodeValue; }
}

/** Yhden valitsimen osuma: .luokka tai tagi (muuta ei tarvita). */
function osuu(el, valitsin) {
  const v = valitsin.trim();
  if (!v) return false;
  if (v.startsWith('.')) return el.luokat.includes(v.slice(1));
  return el.nodeName === v.toUpperCase();
}

class Elementti {
  constructor(nimi) {
    this.nodeType = 1;
    this.nodeName = String(nimi).toUpperCase();
    this.childNodes = [];
    this.parentNode = null;
    this.luokat = [];
    this.attrs = {};
    this.kuuntelijat = new Map();
    this.title = '';
    this.type = '';
    this.style = {};
    this.clientWidth = 0;
    this.clientHeight = 0;
  }

  get className() { return this.luokat.join(' '); }

  set className(arvo) { this.luokat = String(arvo).split(/\s+/).filter(Boolean); }

  get classList() {
    return {
      add: (...ls) => ls.forEach((l) => { if (!this.luokat.includes(l)) this.luokat.push(l); }),
      remove: (...ls) => { this.luokat = this.luokat.filter((l) => !ls.includes(l)); },
      contains: (l) => this.luokat.includes(l),
      toggle: (l, paalle) => (paalle ? this.classList.add(l) : this.classList.remove(l)),
    };
  }

  get textContent() { return this.childNodes.map((n) => n.textContent ?? '').join(''); }

  set textContent(arvo) {
    this.childNodes = [];
    if (arvo !== '' && arvo != null) this.appendChild(new Teksti(arvo));
  }

  appendChild(solmu) {
    solmu.parentNode = this;
    this.childNodes.push(solmu);
    return solmu;
  }

  removeChild(solmu) {
    this.childNodes = this.childNodes.filter((n) => n !== solmu);
    solmu.parentNode = null;
    return solmu;
  }

  remove() { this.parentNode?.removeChild(this); }

  setAttribute(nimi, arvo) { this.attrs[nimi] = String(arvo); }

  getAttribute(nimi) { return this.attrs[nimi] ?? null; }

  addEventListener(laji, kasittelija) {
    if (!this.kuuntelijat.has(laji)) this.kuuntelijat.set(laji, []);
    this.kuuntelijat.get(laji).push(kasittelija);
  }

  dispatch(laji) {
    [...(this.kuuntelijat.get(laji) ?? [])].forEach((k) => k({ type: laji, target: this }));
  }

  *jalkelaiset() {
    for (const lapsi of this.childNodes) {
      if (lapsi.nodeType !== 1) continue;
      yield lapsi;
      yield* lapsi.jalkelaiset();
    }
  }

  querySelector(valitsin) { return this.querySelectorAll(valitsin)[0] ?? null; }

  querySelectorAll(valitsin) {
    const osat = String(valitsin).split(',').map((o) => o.trim()).filter(Boolean);
    return [...this.jalkelaiset()].filter((el) => osat.some((o) => osuu(el, o)));
  }
}

const asiakirja = {
  body: new Elementti('body'),
  createElement: (nimi) => new Elementti(nimi),
  createTextNode: (teksti) => new Teksti(teksti),
  getElementById: () => null,
  querySelector: (valitsin) => asiakirja.body.querySelector(valitsin),
  querySelectorAll: (valitsin) => asiakirja.body.querySelectorAll(valitsin),
  addEventListener: () => {},
  removeEventListener: () => {},
};

globalThis.document = asiakirja;

/* ---------------------------------------------------------------- */
/* Koekaupunki ja tekopeli                                           */
/* ---------------------------------------------------------------- */

/** Sofia on koekaupunki: sillä on fokusvirta, luenta ja pulun kommentti. */
const KOEKAUPUNKI = { id: 'sofia', name: 'Sofia', x: 1000, y: 620 };
const TOINEN = { id: 'lontoo', name: 'Lontoo', x: 820, y: 430 };

/**
 * Tekokäyttöliittymä: karttaruutu, näkyvä alue ja kortin napin tila.
 *
 * `tila` on se, minkä js/ui.js tehtavaNapinTila palauttaisi — null =
 * ei tehtävää, `{ pois: true }` = kortilla harmaa nappi.
 */
function tekoUi({ tila = { teksti: 'Etsi kätkö', pois: false }, city = KOEKAUPUNKI } = {}) {
  const pane = new Elementti('div');
  pane.className = 'map-pane';
  pane.clientWidth = 900;
  pane.clientHeight = 600;
  asiakirja.body.appendChild(pane);
  const ui = {
    mapPane: pane,
    kutsutut: [],
    game: { pack: { id: 'maailmankartta' }, cityOf: () => city },
    nakyvaAlue: () => ({
      x: city.x - 200, y: city.y - 150, w: 400, h: 300, skaala: 2.25,
    }),
    tehtavaNapinTila: () => tila,
    etsiKatko: () => ui.kutsutut.push('etsiKatko'),
  };
  return ui;
}

/** Kartalla olevat napit koko puusta. */
const napit = () => asiakirja.querySelectorAll('.etsi-aarre-nappi');

test.afterEach(() => { asiakirja.body.childNodes = []; });

/* ---------------------------------------------------------------- */
/* 1. Ennen kommenttia ei ole nappia                                 */
/* ---------------------------------------------------------------- */

test('kartalla ei ole nappia ennen kuin sitä pyydetään', () => {
  const ui = tekoUi();
  assert.equal(napit().length, 0, 'saapuminen ja luenta eivät saa tuoda nappia');
  assert.ok(!ui.etsiAarreNappi, 'muistiin ei jää näyttöä');
});

test('napin ainoa tuotantokutsu on kommenttikuplan kohdalla', () => {
  const lahde = lue('js/fokusvirta.js');
  const kutsut = [...lahde.matchAll(/naytaEtsiAarreNappi\(/g)];
  // Yksi tuonnissa, yksi kutsu — ei toista polkua kartalle.
  assert.equal(kutsut.length, 1, 'kutsuja saa olla täsmälleen yksi');

  /*
   * Kutsu on `nayta`-lohkossa, joka nostaa kommentin ruudulle: se
   * seuraa VÄLITTÖMÄSTI pulun puheenvuoroa. Jos kutsu karkaa
   * fokusvirtaSaapumiskuplan alkuun, nappi tulisi luennan aikana.
   */
  const puheenvuoro = lahde.indexOf('polloPuheenvuoro(osat, {');
  const kutsu = lahde.indexOf('naytaEtsiAarreNappi(ui, city)');
  assert.ok(puheenvuoro > 0 && kutsu > puheenvuoro,
    'nappi nousee vasta kommentin jälkeen, ei ennen sitä');
  assert.ok(lahde.slice(puheenvuoro, kutsu).indexOf('function') < 0,
    'kutsun pitää olla samassa lohkossa kuin puheenvuoro');
});

/* ---------------------------------------------------------------- */
/* 2. Sama ehto kuin kortin napilla                                  */
/* ---------------------------------------------------------------- */

test('ilman kätköä ei nappia — sama ehto kuin kortilla', () => {
  // null = js/ui.js tehtavaNapinTila piilottaisi kortin napin.
  const tyhja = tekoUi({ tila: null });
  assert.equal(etsiAarreTarjolla(tyhja, KOEKAUPUNKI), false);
  assert.equal(naytaEtsiAarreNappi(tyhja, KOEKAUPUNKI), false);
  assert.equal(napit().length, 0);

  // pois = kortilla harmaa nappi; kartalla harmaata ei ole.
  const harmaa = tekoUi({ tila: { teksti: 'Nikos ei tavattavissa', pois: true } });
  assert.equal(etsiAarreTarjolla(harmaa, KOEKAUPUNKI), false);
  assert.equal(naytaEtsiAarreNappi(harmaa, KOEKAUPUNKI), false);
  assert.equal(napit().length, 0);
});

test('ehto luetaan kortin omasta tilafunktiosta', () => {
  const lahde = lue('js/etsi-aarre-nappi.js');
  assert.ok(lahde.includes('ui.tehtavaNapinTila?.(city)'),
    'ehto ei saa olla oma kopionsa — se on js/ui.js tehtavaNapinTila');
});

/* ---------------------------------------------------------------- */
/* 3. Kommentin jälkeen nappi, oikea teksti ja sama ovi              */
/* ---------------------------------------------------------------- */

test('kommentin jälkeen kartalla on yksi nappi oikealla tekstillä', () => {
  const ui = tekoUi();
  assert.equal(naytaEtsiAarreNappi(ui, KOEKAUPUNKI), true);

  const kaikki = napit();
  assert.equal(kaikki.length, 1, 'nappeja saa olla täsmälleen yksi');
  const nappi = kaikki[0];
  assert.equal(nappi.textContent, 'Etsi aarre');
  assert.equal(ETSI_AARRE_TEKSTI, 'Etsi aarre');
  assert.equal(nappi.type, 'button');
  assert.equal(nappi.getAttribute('aria-label'), 'Etsi aarre: Sofia');

  // Nappi elää karttaruudussa, ei dialogissa: se on kartan päällä.
  const ankkuri = nappi.parentNode;
  assert.ok(ankkuri.classList.contains('etsi-aarre-ankkuri'));
  assert.equal(ankkuri.parentNode, ui.mapPane);

  /*
   * ANKKURI ISTUU KAUPUNGIN KOHDALLA: näkyvän alueen keskus on
   * kaupunki, joten ruutupaikka on karttaruudun keskellä. Nappi itse
   * väistää pisteen ja nimen css:n left/top-arvoilla.
   */
  assert.equal(ankkuri.style.transform, 'translate(450.0px, 300.0px)');
  assert.equal(ankkuri.classList.contains('hukassa'), false);
});

test('sama kaupunki kahdesti ei tee toista nappia', () => {
  const ui = tekoUi();
  assert.equal(naytaEtsiAarreNappi(ui, KOEKAUPUNKI), true);
  assert.equal(naytaEtsiAarreNappi(ui, KOEKAUPUNKI), true);
  assert.equal(napit().length, 1);
});

test('kaupunki ruudun ulkopuolella häivyttää napin paikan valehtelun sijaan', () => {
  const ui = tekoUi();
  // Näkymä on kaukana kaupungista: ruutupaikka jää karttaruudun ulkopuolelle.
  ui.nakyvaAlue = () => ({
    x: KOEKAUPUNKI.x + 900, y: KOEKAUPUNKI.y + 900, w: 400, h: 300, skaala: 2.25,
  });
  assert.equal(naytaEtsiAarreNappi(ui, KOEKAUPUNKI), true);
  assert.ok(ui.etsiAarreNappi.ankkuri.classList.contains('hukassa'));
});

test('painallus kutsuu samaa avaajaa kuin kortin Etsi kätkö', () => {
  const ui = tekoUi();
  naytaEtsiAarreNappi(ui, KOEKAUPUNKI);
  napit()[0].dispatch('click');
  assert.deepEqual(ui.kutsutut, ['etsiKatko'], 'painallus menee ui.etsiKatko():n läpi');
  // Lehti on auki: nappi ei jää sen alle samaan paikkaan.
  assert.equal(napit().length, 0);
  assert.equal(ui.etsiAarreNappi, null);
});

test('avaaja on yksi ja sama funktio kortilla ja kartalla', () => {
  const ui = lue('js/ui.js');
  assert.ok(/etsiKatko\(\) \{/.test(ui), 'js/ui.js:ssä on jaettu etsiKatko-metodi');
  assert.ok(
    ui.includes("document.getElementById('arrival-yes').addEventListener('click', () => this.etsiKatko());"),
    'kortin nappi kutsuu samaa metodia',
  );
  // Ketju on vain yhdessä paikassa: kaksi actionQuiz-kutsua samalla
  // muotoarvonnalla tarkoittaisi kopioitua ovea.
  const kutsut = [...ui.matchAll(/kohtaaminen && !pulmaOdottaa \? \{ form: 'quiz' \} : \{\}/g)];
  assert.equal(kutsut.length, 1, 'muotoarvonta saa olla vain yhdessä paikassa');

  const nappi = lue('js/etsi-aarre-nappi.js');
  assert.ok(nappi.includes('ui.etsiKatko?.()'), 'kartan nappi ei saa rakentaa omaa ketjuaan');
  assert.ok(!nappi.includes('actionQuiz'), 'kartan nappi ei kutsu peliä ohi jaetun oven');
});

/* ---------------------------------------------------------------- */
/* 4. Lähtö vie napin                                                */
/* ---------------------------------------------------------------- */

test('piilotus poistaa napin kartalta ja muistista', () => {
  const ui = tekoUi();
  naytaEtsiAarreNappi(ui, KOEKAUPUNKI);
  piilotaEtsiAarreNappi(ui);
  assert.equal(napit().length, 0);
  assert.equal(ui.etsiAarreNappi, null);
  // Toinen piilotus ei kaadu eikä tee mitään.
  piilotaEtsiAarreNappi(ui);
  assert.equal(napit().length, 0);
});

test('uusi kaupunki korvaa vanhan napin, ei kasaa niitä päällekkäin', () => {
  const ui = tekoUi();
  naytaEtsiAarreNappi(ui, KOEKAUPUNKI);
  ui.game.cityOf = () => TOINEN;
  naytaEtsiAarreNappi(ui, TOINEN);
  assert.equal(napit().length, 1);
  assert.equal(ui.etsiAarreNappi.city.id, 'lontoo');
});

test('kaupungista lähtö purkaa napin samasta koukusta kuin luentakuvan', () => {
  const lahde = lue('js/fokusvirta.js');
  const koukku = lahde.indexOf('export function vaiennaLivianKaupunkipuhe(');
  assert.ok(koukku > 0, 'lähtökoukun pitää olla olemassa');
  const runko = lahde.slice(koukku, lahde.indexOf('\n}', koukku));
  assert.ok(runko.includes('piilotaLuentakuva(ui)'), 'luentakuva lähtee tästä');
  assert.ok(runko.includes('piilotaEtsiAarreNappi(ui)'), 'ja nappi lähtee samasta kohdasta');
});

/* ---------------------------------------------------------------- */
/* 5. Yksi koodi molemmille laudoille                                */
/* ---------------------------------------------------------------- */

test('moduulissa ei ole lautahaaraa eikä omaa tyylitiedostoa', () => {
  const lahde = lue('js/etsi-aarre-nappi.js');
  // Näkyvä alue tulee ui:n kahvasta, jonka js/ui.js delegoi pallolle —
  // sama kahva kummallakin laudalla.
  assert.ok(lahde.includes('ui?.nakyvaAlue?.()'), 'paikka luetaan laudasta riippumattomasti');
  /*
   * TUONTIRENGAS EI SAA SYNTYÄ: js/fokusvirta.js tuo tämän moduulin, ja
   * js/pulu-paikka.js → js/fokuskohteet.js → js/fokusvirta.js sulkisi
   * renkaan, joka kaataa koko pelin käynnistyksen (TDZ).
   */
  assert.ok(!lahde.includes("from './pulu-paikka.js'"), 'pulu-paikka sulkisi tuontirenkaan');
  for (const kielletty of ['pallolauta/', 'kartta.js', 'getScreenCoords']) {
    assert.ok(!lahde.includes(kielletty), `lautakohtaista polkua ei saa olla: ${kielletty}`);
  }
  // Tyylit ovat css/styles.css:ssä, joka on ainoa sivulle linkitetty
  // tyylitiedosto — uusi tiedosto pitäisi muistaa myös nipussa.
  const css = lue('css/styles.css');
  assert.ok(css.includes('.etsi-aarre-nappi {'), 'napin tyyli on css/styles.css:ssä');
  assert.ok(css.includes('.etsi-aarre-ankkuri {'), 'ankkurin tyyli on css/styles.css:ssä');
});
