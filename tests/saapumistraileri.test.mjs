/*
 * KAUPUNGIN MINITRAILERI (js/saapumistraileri.js).
 *
 * Omistaja 11.9.2026 klo 12.40 (Raamattu, SAAPUMISEN UUSI JARJESTYS:
 * KAUPUNGIN MINITRAILERI, ISOT KUVAT KESKELLA, LYHENNETTY MERKINTA),
 * sanatarkasti: *"ennen isoisan kertomusta tulee kaupungin mini
 * esittely kolmen kuvan ja nimen voimin"*.
 *
 * NELJÄ ASIAA, JOITA RUUTUKAAPPAUS EI NÄYTÄ:
 *
 *   1. MISTÄ KUVAT TULEVAT. Avauskuvat ensin, kansikuvat varalla,
 *      enintään kolme — ja kuvaton kaupunki jää kokonaan ilman
 *      traileria. Juuri tämä portti pitää saapumisen ennallaan niissä
 *      kaupungeissa, joille lehtikuvia ei ole vielä tehty.
 *   2. NIMI ON KIRJAIN KERRALLAAN. Jokainen kirjain on oma spaninsa
 *      omalla porrastusviiveellään; ilman sitä kirjaimet eivät voi
 *      lentää horisontista yksi kerrallaan.
 *   3. OHITUS PÄÄTTÄÄ LUPAUKSEN. Luenta ja kirjoituskone odottavat
 *      lupausta (js/ui.js renderFact); jos ohitus jättäisi sen auki,
 *      isoisä ei puhuisi koskaan.
 *   4. SIIVOUS VIE AJASTIMET. Kehittäjän hyppy kaupungista toiseen
 *      poistaa trailerin, eivätkä sen ajastimet saa herätä uudessa
 *      kaupungissa.
 *
 * DOM-osuus ajetaan pienellä omalla puumallilla samaan tapaan kuin
 * tests/luentakuva.test.mjs — Nodessa ei ole selainta. Liike itse
 * (liuku, lento, perspektiivi) on css:n asia ja katsotaan silmin
 * Chromiumin kaappauksista.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  naytaSaapumistraileri, piilotaSaapumistraileri, trailerinKuvat,
  trailerinKesto, TRAILERIN_KUVIA, NIMEN_PORRAS_MS,
} from '../js/saapumistraileri.js';
import { KULTTUURI_KATEGORIAT } from '../js/packs/kulttuuri-kategoriat.js';

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
    this.alt = '';
    this.decoding = '';
    this.draggable = true;
    this.style = { setProperty(nimi2, arvo) { this[nimi2] = String(arvo); } };
  }

  get className() { return this.luokat.join(' '); }

  set className(arvo) { this.luokat = String(arvo).split(/\s+/).filter(Boolean); }

  get classList() {
    return {
      add: (...ls) => ls.forEach((l) => { if (!this.luokat.includes(l)) this.luokat.push(l); }),
      remove: (...ls) => { this.luokat = this.luokat.filter((l) => !ls.includes(l)); },
      contains: (l) => this.luokat.includes(l),
    };
  }

  get textContent() { return this.childNodes.map((n) => n.textContent ?? '').join(''); }

  set textContent(arvo) {
    this.childNodes = [];
    if (arvo !== '' && arvo != null) this.appendChild(new Teksti(arvo));
  }

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

  removeChild(solmu) {
    this.childNodes = this.childNodes.filter((n) => n !== solmu);
    solmu.parentNode = null;
    return solmu;
  }

  remove() { this.parentNode?.removeChild(this); }

  setAttribute(nimi, arvo) { this.attrs[nimi] = String(arvo); }

  getAttribute(nimi) { return this.attrs[nimi] ?? null; }

  addEventListener(laji, fn) {
    if (!this.kuuntelijat.has(laji)) this.kuuntelijat.set(laji, []);
    this.kuuntelijat.get(laji).push(fn);
  }

  removeEventListener(laji, fn) {
    const lista = this.kuuntelijat.get(laji) ?? [];
    this.kuuntelijat.set(laji, lista.filter((k) => k !== fn));
  }

  dispatch(laji, lisa = {}) {
    [...(this.kuuntelijat.get(laji) ?? [])].forEach((k) => k({ type: laji, target: this, ...lisa }));
  }

  get isConnected() {
    let solmu = this;
    while (solmu.parentNode) solmu = solmu.parentNode;
    return solmu === asiakirja.body;
  }

  * jalkelaiset() {
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
  head: new Elementti('head'),
  createElement: (nimi) => new Elementti(nimi),
  createTextNode: (teksti) => new Teksti(teksti),
  getElementById: () => null,
  // Ei linkkiä styles.css:ään: tyylin lataus palaa saman tien.
  querySelector: () => null,
  querySelectorAll: (valitsin) => asiakirja.body.querySelectorAll(valitsin),
  addEventListener: () => {},
  removeEventListener: () => {},
};

globalThis.document = asiakirja;

const KOEKAUPUNKI = { id: 'marseille', name: 'Marseille' };
const tekoUi = () => ({ game: { cityOf: () => KOEKAUPUNKI } });
const traileri = () => asiakirja.body.querySelectorAll('.saapumistraileri');

/* ---------------------------------------------------------------- */
/* 1. Kuvien valinta                                                 */
/* ---------------------------------------------------------------- */

test('avauskuvat voittavat kansikuvat, enintään kolme', () => {
  const kansi = KULTTUURI_KATEGORIAT.marseille.find((k) => k.id === 'kaupunki');
  const kuvat = trailerinKuvat(KOEKAUPUNKI);
  assert.equal(kuvat.length, Math.min(TRAILERIN_KUVIA, kansi.avauskuvat.length));
  assert.deepEqual(kuvat, kansi.avauskuvat.slice(0, TRAILERIN_KUVIA));
});

test('ilman avauskuvia traileri ottaa kansikuvat', () => {
  const kansi = KULTTUURI_KATEGORIAT.marseille.find((k) => k.id === 'kaupunki');
  const avaus = kansi.avauskuvat;
  delete kansi.avauskuvat;
  try {
    assert.deepEqual(trailerinKuvat(KOEKAUPUNKI), kansi.kansikuvat.slice(0, TRAILERIN_KUVIA));
  } finally {
    kansi.avauskuvat = avaus;
  }
});

test('kuvaton kaupunki jää ilman traileria eikä jätä mitään ruudulle', async () => {
  const ui = tekoUi();
  const tulos = await naytaSaapumistraileri(ui, { id: 'ei-tallaista', name: 'Ei mitään' });
  assert.equal(tulos, false, 'kuvaton kaupunki ei saa traileria');
  assert.equal(traileri().length, 0);
  assert.ok(!ui.saapumistraileri);
});

/* ---------------------------------------------------------------- */
/* 2. Nimi kirjain kerrallaan                                        */
/* ---------------------------------------------------------------- */

test('nimi ladotaan kirjain kerrallaan omiin spaneihinsa', () => {
  const ui = tekoUi();
  naytaSaapumistraileri(ui, KOEKAUPUNKI);
  const kehys = traileri()[0];
  assert.ok(kehys, 'trailerin pitää nousta ruudulle');
  assert.equal(kehys.querySelectorAll('.saapumistraileri-kuva').length,
    trailerinKuvat(KOEKAUPUNKI).length);

  const kirjaimet = kehys.querySelectorAll('.saapumistraileri-kirjain');
  assert.equal(kirjaimet.length, KOEKAUPUNKI.name.length,
    'jokainen kirjain omaan spaniinsa (lento porrastetaan spaneista)');
  assert.equal(kirjaimet.map((k) => k.textContent).join(''), KOEKAUPUNKI.name);
  // Porrastus: 90 ms per kirjain, järjestyksessä.
  assert.equal(kirjaimet[0].style['--kirjaimen-viive'], '0ms');
  assert.equal(kirjaimet[3].style['--kirjaimen-viive'], `${3 * NIMEN_PORRAS_MS}ms`);
  // Nimi on saavutettava kokonaisena, kirjaimet piilossa ruudunlukijalta.
  assert.equal(kehys.querySelector('.saapumistraileri-nimi').getAttribute('aria-label'),
    KOEKAUPUNKI.name);
  assert.equal(kirjaimet[0].getAttribute('aria-hidden'), 'true');

  piilotaSaapumistraileri(ui);
  assert.equal(traileri().length, 0);
});

/* ---------------------------------------------------------------- */
/* 3. Ohitus ja siivous päättävät lupauksen                          */
/* ---------------------------------------------------------------- */

test('napautus ohittaa trailerin ja lupaus ratkeaa', async () => {
  const ui = tekoUi();
  const lupaus = naytaSaapumistraileri(ui, KOEKAUPUNKI);
  const kehys = traileri()[0];
  kehys.dispatch('pointerdown');
  assert.ok(kehys.classList.contains('ohitettu'), 'ohitus häivyttää päällyksen');
  await lupaus;
  assert.equal(traileri().length, 0, 'ohitettu traileri poistuu ruudulta');
  assert.ok(!ui.saapumistraileri);
});

test('kaupungin vaihto siivoaa trailerin eikä jätä lupausta auki', async () => {
  const ui = tekoUi();
  const lupaus = naytaSaapumistraileri(ui, KOEKAUPUNKI);
  assert.equal(traileri().length, 1);
  assert.equal(piilotaSaapumistraileri(ui), true);
  await lupaus;
  assert.equal(traileri().length, 0);
  // Toinen siivous on tyhjäkäynti: kutsupaikkoja on useita.
  assert.equal(piilotaSaapumistraileri(ui), false);
});

test('uusi traileri ei jätä edellistä ruudulle', async () => {
  const ui = tekoUi();
  const eka = naytaSaapumistraileri(ui, KOEKAUPUNKI);
  naytaSaapumistraileri(ui, KOEKAUPUNKI);
  await eka;
  assert.equal(traileri().length, 1, 'kahta traileria ei saa olla päällekkäin');
  piilotaSaapumistraileri(ui);
});

/* ---------------------------------------------------------------- */
/* 4. Kesto ja liikkeen vähennys                                     */
/* ---------------------------------------------------------------- */

test('kolmen kuvan traileri kestää noin 8,7 sekuntia', () => {
  assert.equal(trailerinKesto(3), 3 * (700 + 2000) + 600);
  assert.equal(trailerinKesto(0), 0);
});

test('liikkeen vähennys merkitään luokkana, jotta css voi jättää liikkeen', () => {
  const alkuperainen = globalThis.matchMedia;
  globalThis.matchMedia = (kysely) => ({ matches: kysely.includes('reduced-motion') });
  try {
    const ui = tekoUi();
    naytaSaapumistraileri(ui, KOEKAUPUNKI);
    assert.ok(traileri()[0].classList.contains('liike-vahennetty'));
    piilotaSaapumistraileri(ui);
  } finally {
    if (alkuperainen) globalThis.matchMedia = alkuperainen;
    else delete globalThis.matchMedia;
  }
});

/* ---------------------------------------------------------------- */
/* 5. Moduuli on listoilla                                           */
/* ---------------------------------------------------------------- */

test('moduuli ja sen tyyli ovat esilataus- ja niputuslistoilla', async () => {
  const { readFileSync } = await import('node:fs');
  const lue = (polku) => readFileSync(new URL(`../${polku}`, import.meta.url), 'utf8');
  const sw = lue('sw.js');
  assert.match(sw, /'\.\/js\/saapumistraileri\.js',/);
  assert.match(sw, /'\.\/css\/saapumistraileri\.css',/);
  const nippu = lue('tools/build-standalone.mjs');
  assert.match(nippu, /'js\/saapumistraileri\.js',/);
  assert.match(nippu, /'css\/saapumistraileri\.css',/);
  // Traileri ennen fokusvirtaa: fokusvirta tuo sen staattisesti.
  assert.ok(nippu.indexOf("'js/saapumistraileri.js'") < nippu.indexOf("'js/fokusvirta.js'"));
});
