/*
 * MATKALAUKUN LINSSIRUUDUKKO: NAPAUTUS SELITTÄÄ, "aktivoi" KYTKEE.
 *
 * Omistajan tilaus 5.9.2026 sanatarkasti: *"muuta: kun linssi klikataan
 * matkalaukussa niin silloin päivittyy vasta selite teksti ja tekstin
 * loppuun tulee "aktivoi", mitä klikkaamalla linssi menee päälle ja
 * matkalaukku sulkeutuu"*.
 *
 * Vartioitava sääntö on kaksivaiheisuus, ja se rikkoutuisi HILJAA:
 * jos ruudun kuuntelija joskus palautetaan kutsumaan valitseLinssi
 * suoraan, mikään ei kaadu — linssi vain syttyisi taas väärässä
 * kohdassa ja laukku jäisi auki. Siksi testi kiinnittää kolme asiaa:
 *
 *   1. ruudun napautus EI kutsu valitseLinssiä eikä sulje laukkua,
 *   2. napautus kirjoittaa juuri sen linssin selitteen ja panee sen
 *      perään "aktivoi"-napin (myös "Ei linssiä" -ruudulle),
 *   3. "aktivoi" kutsuu valitseLinssiä oikealla tunnuksella JA sulkee
 *      laukun — ja päällä olevan linssin kohdalla sana on "sammuta",
 *      joka kytkee linssin pois (valitseLinssi(null)).
 *
 * DOM ajetaan pienellä omalla puumallilla samaan tapaan kuin
 * tests/pollo.test.mjs ja tests/lukija.test.mjs: Nodessa ei ole
 * selainta, eikä repoon oteta jsdomia. Malli toteuttaa täsmälleen ne
 * kentät, joita rakennaLinssivalikko ja paivitaLinssiTiedot DOMilta
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
/* Laukun linssiosasto pienoiskoossa                                 */
/* ---------------------------------------------------------------- */

const LINSSIT = [
  { tunnus: 'topografia', nimi: 'Topografia', lyhyt: 'Maaston korkeus väreinä.' },
  { tunnus: 'vesistot', nimi: 'Vesistöt', lyhyt: 'Joet ja järvet esiin.' },
];

/**
 * Rakentaa ruudukon oikeilla ui.js:n metodeilla mutta tyngällä
 * ympäristöllä. valitseLinssi on kirjuri: testin koko idea on, kuka
 * sitä kutsuu ja milloin.
 */
function laukku({ paalla = null } = {}) {
  const ui = Object.create(UI.prototype);
  ui.linssiValikko = new Elementti('div');
  ui.linssiValittu = paalla;
  ui.linssiEsikatselu = undefined;
  ui.linssiTuki = { kaikki: LINSSIT };
  ui.valitsut = [];
  ui.valitseLinssi = (tunnus) => { ui.valitsut.push(tunnus); };
  ui.passportDialog = {
    open: true,
    close() { this.open = false; },
  };
  ui.rakennaLinssivalikko(LINSSIT);
  return ui;
}

const ruudut = (ui) => ui.linssiValikko.querySelectorAll('.linssi-liuskat button');
const selite = (ui) => ui.linssiTiedot.childNodes.find((n) => n.luokat?.has('linssi-lyhyt'));
const aktivointi = (ui) => ui.linssiTiedot.querySelectorAll('.linssi-aktivoi')[0] ?? null;

/* ---------------------------------------------------------------- */

test('ruudukossa on "Ei linssiä" ja jokainen linssi', () => {
  const ui = laukku();
  assert.deepEqual(ruudut(ui).map((n) => n.dataset.linssi), ['', 'topografia', 'vesistot']);
});

test('ruudun napautus ei kytke linssiä eikä sulje laukkua (omistaja 5.9.2026)', () => {
  const ui = laukku();
  ruudut(ui)[1].napauta();
  assert.deepEqual(ui.valitsut, [], 'napautus ei saa kutsua valitseLinssiä');
  assert.equal(ui.passportDialog.open, true, 'laukku jää auki, kunnes aktivoidaan');
});

test('napautus vaihtaa selitteen ja merkitsee ruudun esikatselluksi', () => {
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
  assert.deepEqual(ruudut(ui).filter((n) => n.luokat.has('paalla')).map((n) => n.dataset.linssi), ['']);
});

test('selitteen LOPPUUN tulee "aktivoi" — samaan kappaleeseen', () => {
  const ui = laukku();
  ruudut(ui)[1].napauta();
  const nappi = aktivointi(ui);
  assert.ok(nappi, 'aktivoi-nappi puuttuu');
  assert.equal(nappi.textContent, 'aktivoi');
  assert.equal(nappi.getAttribute('aria-label'), 'Aktivoi linssi Topografia');
  // Nappi on selitekappaleen sisällä eikä omana lohkonaan: tilaus
  // sanoo "tekstin loppuun".
  assert.ok(selite(ui).childNodes.includes(nappi));
  assert.match(teksti(selite(ui)), /Maaston korkeus väreinä\. aktivoi$/);
});

test('"aktivoi" kytkee linssin ja sulkee matkalaukun', () => {
  const ui = laukku();
  ruudut(ui)[1].napauta();
  aktivointi(ui).napauta();
  assert.deepEqual(ui.valitsut, ['topografia']);
  assert.equal(ui.passportDialog.open, false, 'laukun pitää sulkeutua aktivoinnista');
  assert.equal(ui.linssiEsikatselu, undefined, 'esikatselu nollautuu kytkennästä');
});

test('"Ei linssiä" toimii kuten linssit: selite ja "aktivoi"', () => {
  const ui = laukku({ paalla: 'topografia' });
  ruudut(ui)[0].napauta();
  assert.match(teksti(selite(ui)), /Kartta sellaisena kuin isoisä sen piirsi\. aktivoi$/);
  const otsikko = ui.linssiTiedot.childNodes.find((n) => n.luokat?.has('linssi-nimi'));
  assert.equal(otsikko?.textContent, 'Paljain silmin');
  aktivointi(ui).napauta();
  assert.deepEqual(ui.valitsut, [null]);
  assert.equal(ui.passportDialog.open, false);
});

test('päällä olevan linssin kohdalla sana on "sammuta" ja se kytkee pois', () => {
  const ui = laukku({ paalla: 'vesistot' });
  ruudut(ui)[2].napauta();
  const nappi = aktivointi(ui);
  assert.equal(nappi.textContent, 'sammuta');
  assert.equal(nappi.getAttribute('aria-label'), 'Sammuta linssi Vesistöt');
  nappi.napauta();
  assert.deepEqual(ui.valitsut, [null], 'sammuta kytkee linssin pois');
  assert.equal(ui.passportDialog.open, false);
});

test('ilman napautusta selite kertoo päällä olevasta linssistä eikä tarjoa "aktivoi"', () => {
  const ui = laukku({ paalla: 'topografia' });
  assert.match(teksti(selite(ui)), /Maaston korkeus väreinä\.$/);
  assert.equal(aktivointi(ui), null, 'avattaessa ei ole mitään uutta aktivoitavaa');
  assert.equal(ruudut(ui)[1].luokat.has('paalla'), true);
  assert.equal(ruudut(ui)[1].getAttribute('aria-pressed'), 'true');
});

test('selitteen vaihto häivytetään: lohko saa animaatioluokan joka piirrolla', () => {
  const ui = laukku();
  ruudut(ui)[1].napauta();
  assert.equal(ui.linssiTiedot.luokat.has('vaihtui'), true);
  const css = readFileSync(new URL('../css/styles.css', import.meta.url), 'utf8');
  assert.match(css, /\.linssi-tiedot\.vaihtui\s*\{\s*animation:/);
  assert.match(css, /@keyframes linssiSelitteenVaihto/);
});

/*
 * Ruudukko on sama molemmilla laudoilla: pallolauta (oletus) ja vanha
 * kartta (?lauta=kartta) käyttävät täsmälleen tätä samaa rakentajaa,
 * eikä kaksivaiheisuus saa kadota kummaltakaan. Sen sijaan pallo on
 * TOIMINTO eikä tila (valitseLinssi('pallo')), joten senkin ruutu
 * odottaa "aktivoi"-napautusta.
 */
test('pallolinssin ruutu odottaa "aktivoi"-napautusta kuten muutkin', () => {
  const ui = Object.create(UI.prototype);
  ui.linssiValikko = new Elementti('div');
  ui.linssiValittu = null;
  ui.linssiEsikatselu = undefined;
  const pallolinssit = [{ tunnus: 'pallo', nimi: 'Karttapallo', lyhyt: 'Maailma pallona.' }];
  ui.linssiTuki = { kaikki: pallolinssit };
  ui.valitsut = [];
  ui.valitseLinssi = (tunnus) => { ui.valitsut.push(tunnus); };
  ui.passportDialog = { open: true, close() { this.open = false; } };
  ui.rakennaLinssivalikko(pallolinssit);
  const ruutu = ui.linssiValikko.querySelectorAll('.linssi-liuskat button')[1];
  ruutu.napauta();
  assert.deepEqual(ui.valitsut, []);
  assert.equal(ui.passportDialog.open, true);
  aktivointi(ui).napauta();
  assert.deepEqual(ui.valitsut, ['pallo']);
});

/*
 * Lähdekoodin lupaus: laukun ruudun kuuntelija menee esikatseluun.
 * Tämä on tarkoituksella tekstitarkistus — se osoittaa suoraan siihen
 * yhteen riviin, joka tilauksessa muuttui, jos joku palauttaa vanhan
 * suoran kytkennän.
 */
test('ui.js: ruudun kuuntelija kutsuu esikatseleLinssiä, ei valitseLinssiä', () => {
  const lahde = readFileSync(new URL('../js/ui.js', import.meta.url), 'utf8');
  assert.match(lahde, /nappi\.addEventListener\('click', \(\) => this\.esikatseleLinssi\(tunnus\)\)/);
  assert.doesNotMatch(lahde, /nappi\.addEventListener\('click', \(\) => this\.valitseLinssi\(tunnus\)\)/);
});
