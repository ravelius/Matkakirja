/*
 * LUENTAKUVA KARTAN PÄÄLLE (js/fokusvirta.js naytaLuentakuva).
 *
 * Omistaja 9.9.2026 klo 09.10 (Raamattu, POSTILAATIKOSTA TULEE
 * LUENTAKUVIA KARTAN PAALLE): matkakirjan luennan aikana kartan päällä
 * näkyy kuva, joka tulee kuvatoimituksen postista. Pakin kenttä on
 * `matkakirja.luentakuva` ja se on VAPAAEHTOINEN.
 *
 * Kolme asiaa, jotka eivät näy diffistä eivätkä ruutukaappauksesta:
 *
 *   1. ILMAN KENTTÄÄ EI SYNNY MITÄÄN. Tämä on koko mekanismin ehto:
 *      kuvaton kaupunki on täsmälleen ennallaan, eikä kartalle saa
 *      ilmestyä tyhjää kehystä. Kenttä, jossa on vain selite ilman
 *      osoitetta, on sama asia kuin ei kenttää.
 *   2. OSOITE RATKEAA SAMOIN KUIN KORTIN KUVILLA. Kolme lähdettä
 *      (`osoite`, `ampari`, `tiedosto`) porrastuvat kuten muualla
 *      talossa (js/fokusvirta.js kuvanOsoite) — uusi kenttä ei saa
 *      alkaa ajautua omaan osoitelogiikkaansa.
 *   3. SELITE JA LÄHDE TULOSTUVAT. CC BY vaatii tekijän maininnan, ja
 *      lähderivi katoaa hiljaa juuri silloin, kun paneeli piirretään
 *      erikseen — siksi se mitataan piirretystä puusta.
 *
 * DOM-osuus ajetaan pienellä omalla puumallilla samaan tapaan kuin
 * tests/lukijanappi.test.mjs ja tests/pollo.test.mjs: Nodessa ei ole
 * selainta, eikä repoon oteta jsdomia yhtä testiä varten. Selainpuoli
 * (nousu, häipyminen, kartan liike, suurennos) on katsottu erikseen
 * Chromiumilla ruutukaappauksesta.
 *
 * KUVA LISÄTÄÄN VAIN TESTIN AJAKSI muistissa olevaan pakkiin ja
 * poistetaan lopuksi: tuotantodataan ei kuulu tässä erässä yhtään
 * luentakuvaa (kuvat tulevat postista).
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  fokusvirtaLuentakuva, luentakuvanOsoite, luentakuvanVara,
  naytaLuentakuva, piilotaLuentakuva,
} from '../js/fokusvirta.js';
import { julisteUrl } from '../js/media.js';
import { valokuvaUrl, valokuvaVara } from '../js/packs/africa-valokuvat.js';
import { fokusvirtaKaupungille } from '../js/packs/fokusvirrat.js';

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
    this.hidden = false;
    this.alt = '';
    this.title = '';
    this.type = '';
    this.decoding = '';
    this.draggable = true;
    this.style = {};
  }

  get className() { return this.luokat.join(' '); }

  set className(arvo) {
    this.luokat = String(arvo).split(/\s+/).filter(Boolean);
  }

  get classList() {
    return {
      add: (...ls) => ls.forEach((l) => { if (!this.luokat.includes(l)) this.luokat.push(l); }),
      remove: (...ls) => { this.luokat = this.luokat.filter((l) => !ls.includes(l)); },
      contains: (l) => this.luokat.includes(l),
    };
  }

  get textContent() {
    return this.childNodes.map((n) => n.textContent ?? '').join('');
  }

  set textContent(arvo) {
    this.childNodes = [];
    if (arvo !== '' && arvo != null) this.appendChild(new Teksti(arvo));
  }

  /*
   * `src` on kuvaelementin oma sopimus: se heijastuu attribuuttiin (jota
   * js/media.js lataaKuvaSitkeasti lukee) ja laukaisee latauksen. Malli
   * ilmoittaa latauksen onnistuneeksi seuraavalla kierroksella, jottei
   * sitkeän latauksen jonovahti jää roikkumaan testin ajaksi.
   */
  get src() { return this.attrs.src ?? ''; }

  set src(arvo) {
    this.attrs.src = String(arvo);
    setTimeout(() => this.dispatch('load'), 0);
  }

  appendChild(solmu) {
    solmu.parentNode = this;
    this.childNodes.push(solmu);
    return solmu;
  }

  append(...solmut) { solmut.forEach((s) => this.appendChild(s)); }

  insertBefore(uusi, ennen) {
    const i = this.childNodes.indexOf(ennen);
    uusi.parentNode = this;
    this.childNodes.splice(i < 0 ? this.childNodes.length : i, 0, uusi);
    return uusi;
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

  removeEventListener(laji, kasittelija) {
    const lista = this.kuuntelijat.get(laji) ?? [];
    this.kuuntelijat.set(laji, lista.filter((k) => k !== kasittelija));
  }

  dispatch(laji) {
    [...(this.kuuntelijat.get(laji) ?? [])].forEach((k) => k({ type: laji, target: this }));
  }

  get isConnected() {
    let solmu = this;
    while (solmu.parentNode) solmu = solmu.parentNode;
    return solmu === asiakirja.body;
  }

  *jalkelaiset() {
    for (const lapsi of this.childNodes) {
      if (lapsi.nodeType !== 1) continue;
      yield lapsi;
      yield* lapsi.jalkelaiset();
    }
  }

  querySelector(valitsin) {
    return this.querySelectorAll(valitsin)[0] ?? null;
  }

  querySelectorAll(valitsin) {
    const osat = String(valitsin).split(',').map((o) => o.trim()).filter(Boolean);
    return [...this.jalkelaiset()].filter((el) => osat.some((o) => osuu(el, o)));
  }

  closest(valitsin) {
    const osat = String(valitsin).split(',').map((o) => o.trim()).filter(Boolean);
    let solmu = this;
    while (solmu && solmu.nodeType === 1) {
      if (osat.some((o) => osuu(solmu, o))) return solmu;
      solmu = solmu.parentNode;
    }
    return null;
  }
}

const asiakirja = {
  body: new Elementti('body'),
  createElement: (nimi) => new Elementti(nimi),
  createTextNode: (teksti) => new Teksti(teksti),
  getElementById: () => null,
  // Ei linkkiä styles.css:ään: lataaTyyli palaa saman tien, eikä malli
  // tarvitse tyylitiedostoja.
  querySelector: (valitsin) => (valitsin.includes('map-pane')
    ? null : asiakirja.body.querySelector(valitsin)),
  querySelectorAll: (valitsin) => asiakirja.body.querySelectorAll(valitsin),
  addEventListener: () => {},
  removeEventListener: () => {},
};

globalThis.document = asiakirja;

/* ---------------------------------------------------------------- */
/* Koekaupunki ja tekopeli                                           */
/* ---------------------------------------------------------------- */

/**
 * Sofia on koekaupunki: sillä on fokusvirta ja äänitetty luenta, joten
 * se on lähinnä sitä, mitä postista tuleva kuva kohtaa. Kenttä
 * lisätään vain testin ajaksi ja poistetaan lopuksi.
 */
const KOEKAUPUNKI = { id: 'sofia', name: 'Sofia' };
const PAKKI = fokusvirtaKaupungille(KOEKAUPUNKI.id);

const KOEKUVA = {
  ampari: 'luentakuvat/koe-sofia.jpg',
  selite: 'Koekuva: torin laita aamulla.',
  lahde: 'Kuvaaja Koe, Wikimedia Commons (CC BY 4.0)',
};

function tekoUi() {
  return {
    game: {
      pack: { id: 'maailmankartta' },
      player: {},
      cityOf: () => KOEKAUPUNKI,
    },
  };
}

/** Kuva pakkiin vain yhden testin ajaksi. */
function pakinKanssa(kuva, tyo) {
  PAKKI.matkakirja.luentakuva = kuva;
  try {
    return tyo();
  } finally {
    delete PAKKI.matkakirja.luentakuva;
  }
}

/* ---------------------------------------------------------------- */
/* 1. Ilman kenttää ei synny mitään                                  */
/* ---------------------------------------------------------------- */

test('pakki ilman luentakuvaa ei tuota elementtiä', () => {
  const ui = tekoUi();
  assert.equal(PAKKI.matkakirja.luentakuva, undefined, 'koekaupungilla ei saa olla kuvaa');
  assert.equal(fokusvirtaLuentakuva(ui, KOEKAUPUNKI), null);
  assert.equal(naytaLuentakuva(ui, KOEKAUPUNKI), false);
  assert.equal(asiakirja.querySelectorAll('.fokusvirta-luentakuva').length, 0);
  assert.ok(!ui.luentakuva, 'kuvatta ei jää paneelia muistiin');
});

test('pelkkä selite ilman osoitetta ei nosta tyhjää kehystä', () => {
  pakinKanssa({ selite: 'Kuva puuttuu', lahde: 'Ei mitään' }, () => {
    const ui = tekoUi();
    assert.equal(fokusvirtaLuentakuva(ui, KOEKAUPUNKI), null);
    assert.equal(naytaLuentakuva(ui, KOEKAUPUNKI), false);
    assert.equal(asiakirja.querySelectorAll('.fokusvirta-luentakuva').length, 0);
  });
});

/* ---------------------------------------------------------------- */
/* 2. Osoite ratkeaa samoin kuin kortin kuvilla                       */
/* ---------------------------------------------------------------- */

test('ämpärin kuva ratkeaa julisteosoitteeksi ilman varareittiä', () => {
  const kuva = { ampari: 'luentakuvat/koe-sofia.jpg', selite: 'x', lahde: 'y' };
  assert.equal(luentakuvanOsoite(kuva), julisteUrl(kuva.ampari));
  assert.ok(luentakuvanOsoite(kuva).startsWith('https://'));
  // Ämpärillä ei ole Commonsin varareittiä: uusinta jättäisi vain
  // tyhjän kehyksen roikkumaan.
  assert.equal(luentakuvanVara(kuva), null);
});

test('osoitteellinen kuva menee sellaisenaan', () => {
  const kuva = { osoite: 'https://media.matkakirja.app/luentakuvat/koe.jpg', selite: 'x', lahde: 'y' };
  assert.equal(luentakuvanOsoite(kuva), kuva.osoite);
  assert.equal(luentakuvanVara(kuva), null);
  // Ämpäri ei ohita valmista osoitetta (sama porrastus kuin kortilla).
  const molemmat = { ...kuva, ampari: 'luentakuvat/toinen.jpg' };
  assert.equal(luentakuvanOsoite(molemmat), kuva.osoite);
});

test('Commons-tiedosto kulkee median asettajan läpi ja saa varareitin', () => {
  const kuva = { tiedosto: 'Sofia Bulgaria.jpg', selite: 'x', lahde: 'y' };
  assert.equal(luentakuvanOsoite(kuva), valokuvaUrl(kuva.tiedosto, 800));
  assert.equal(luentakuvanVara(kuva), valokuvaVara(kuva.tiedosto, 800));
});

/* ---------------------------------------------------------------- */
/* 3. Paneeli: kuva, selite ja lähde                                 */
/* ---------------------------------------------------------------- */

test('luentakuva nousee kartan päälle selitteineen ja lähteineen', () => {
  pakinKanssa(KOEKUVA, () => {
    const ui = tekoUi();
    assert.equal(naytaLuentakuva(ui, KOEKAUPUNKI), true);

    const paneelit = asiakirja.querySelectorAll('.fokusvirta-luentakuva');
    assert.equal(paneelit.length, 1, 'paneeleja saa olla täsmälleen yksi');
    const paneeli = paneelit[0];
    assert.equal(paneeli, ui.luentakuva);

    // Kuva on napissa, jotta napautus voi avata suurennoksen.
    const nappi = paneeli.querySelector('.fokusvirta-kuva');
    assert.ok(nappi, 'kuvan pitää olla napautettava');
    const img = nappi.querySelector('img');
    assert.equal(img.getAttribute('src'), julisteUrl(KOEKUVA.ampari));
    assert.equal(img.alt, KOEKUVA.selite);

    // Selite ohuena rivinä kuvan alla, lähde sen perässä (CC BY).
    assert.equal(paneeli.querySelector('.fokusvirta-kuvaselite').textContent, KOEKUVA.selite);
    assert.equal(paneeli.querySelector('.fokusvirta-kuvalahde').textContent, KOEKUVA.lahde);

    piilotaLuentakuva(ui, { heti: true });
    assert.equal(asiakirja.querySelectorAll('.fokusvirta-luentakuva').length, 0);
    assert.equal(ui.luentakuva, null);
  });
});

test('uusi luenta ei jätä kahta paneelia päällekkäin', () => {
  pakinKanssa(KOEKUVA, () => {
    const ui = tekoUi();
    naytaLuentakuva(ui, KOEKAUPUNKI);
    naytaLuentakuva(ui, KOEKAUPUNKI);
    assert.equal(asiakirja.querySelectorAll('.fokusvirta-luentakuva').length, 1);
    piilotaLuentakuva(ui, { heti: true });
  });
});

test('havainnekuvan lähderivi saa selitepainikkeen kuten muuallakin', () => {
  pakinKanssa({ ...KOEKUVA, lahde: 'Matkakirjan havainnekuva' }, () => {
    const ui = tekoUi();
    naytaLuentakuva(ui, KOEKAUPUNKI);
    const lahde = ui.luentakuva.querySelector('.fokusvirta-kuvalahde');
    assert.equal(lahde.textContent, 'Matkakirjan havainnekuva');
    assert.ok(lahde.querySelector('.havainnekuva-selite'),
      'havainnekuvaselite kulkee saman apurin kautta kuin kortilla');
    piilotaLuentakuva(ui, { heti: true });
  });
});

/* ---------------------------------------------------------------- */
/* 4. Tuotantodata: kenttä on vapaaehtoinen ja oikean muotoinen      */
/* ---------------------------------------------------------------- */

test('jokaisella pakin luentakuvalla on osoite, selite ja lähde', async () => {
  const { FOKUSVIRRAT } = await import('../js/packs/fokusvirrat.js');
  for (const [id, virta] of Object.entries(FOKUSVIRRAT)) {
    const kuva = virta?.matkakirja?.luentakuva;
    if (!kuva) continue; // kenttä on vapaaehtoinen
    assert.ok(kuva.osoite || kuva.ampari || kuva.tiedosto,
      `${id}: luentakuvalta puuttuu osoite`);
    assert.ok(String(kuva.selite ?? '').trim(), `${id}: luentakuvalta puuttuu selite`);
    // CC BY vaatii tekijän maininnan; lähde on siksi pakollinen.
    assert.ok(String(kuva.lahde ?? '').trim(), `${id}: luentakuvalta puuttuu lähde`);
  }
});
