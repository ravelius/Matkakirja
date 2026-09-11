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
import { readFileSync } from 'node:fs';

import {
  naytaSaapumistraileri, piilotaSaapumistraileri, trailerinKuvat,
  trailerinKesto, TRAILERIN_KUVIA, NIMEN_PORRAS_MS, NIMEN_LENTO_MS,
  ISKULAUSEEN_VIIVE_MS, iskulauseenViive, trailerinIskulause,
  trailerinNakyma,
} from '../js/saapumistraileri.js';
import { KULTTUURI_KATEGORIAT } from '../js/packs/kulttuuri-kategoriat.js';
import { ISKULAUSEET } from '../js/packs/iskulauseet.js';
import { kuunteleLivianTilanteita } from '../js/livia-tilanteet.js';
import { sfx } from '../js/sound.js';

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

/*
 * DOKUMENTIN JA IKKUNAN TAPAHTUMAT OVAT OIKEITA (11.9.2026).
 * Traileri kuuntelee näkyvyyden vaihtoa, bfcache-paluuta ja näkymän
 * koon muutosta mitatakseen ruudun uudelleen — no-op-kuuntelija ei
 * voisi valvoa juuri sitä regressiota, jonka takia tämä on tehty.
 */
const dokumentinKuuntelijat = new Map();
const asiakirja = {
  body: new Elementti('body'),
  head: new Elementti('head'),
  documentElement: { clientWidth: 0, clientHeight: 0 },
  hidden: false,
  createElement: (nimi) => new Elementti(nimi),
  createTextNode: (teksti) => new Teksti(teksti),
  getElementById: () => null,
  // Ei linkkiä styles.css:ään: tyylin lataus palaa saman tien.
  querySelector: () => null,
  querySelectorAll: (valitsin) => asiakirja.body.querySelectorAll(valitsin),
  addEventListener: (laji, fn) => {
    if (!dokumentinKuuntelijat.has(laji)) dokumentinKuuntelijat.set(laji, []);
    dokumentinKuuntelijat.get(laji).push(fn);
  },
  removeEventListener: (laji, fn) => {
    dokumentinKuuntelijat.set(laji, (dokumentinKuuntelijat.get(laji) ?? []).filter((k) => k !== fn));
  },
};

globalThis.document = asiakirja;

const ikkunanKuuntelijat = new Map();
globalThis.addEventListener = (laji, fn) => {
  if (!ikkunanKuuntelijat.has(laji)) ikkunanKuuntelijat.set(laji, []);
  ikkunanKuuntelijat.get(laji).push(fn);
};
globalThis.removeEventListener = (laji, fn) => {
  ikkunanKuuntelijat.set(laji, (ikkunanKuuntelijat.get(laji) ?? []).filter((k) => k !== fn));
};

const nakyvanKuuntelijat = new Map();
globalThis.visualViewport = {
  width: 0,
  height: 0,
  scale: 1,
  addEventListener: (laji, fn) => {
    if (!nakyvanKuuntelijat.has(laji)) nakyvanKuuntelijat.set(laji, []);
    nakyvanKuuntelijat.get(laji).push(fn);
  },
  removeEventListener: (laji, fn) => {
    nakyvanKuuntelijat.set(laji, (nakyvanKuuntelijat.get(laji) ?? []).filter((k) => k !== fn));
  },
};

/** Kuinka moni kuuntelija on nyt kiinni (irrotuksen vartiointi). */
const kuuntelijoita = () => [dokumentinKuuntelijat, ikkunanKuuntelijat, nakyvanKuuntelijat]
  .reduce((summa, taulu) => summa + [...taulu.values()].reduce((n, l) => n + l.length, 0), 0);

const laukaise = (taulu, laji) => [...(taulu.get(laji) ?? [])].forEach((fn) => fn({ type: laji }));

/**
 * RUUTU JA ASETTELUVIEWPORTTI ERIKSEEN — juuri se tila, jossa vika on.
 * WKWebView jättää sovellusvaihdon jälkeen ASETTELUviewportin vanhaan
 * kapeaan mittaan, kun ruutu (visualViewport, innerWidth) on yhä oikea.
 */
const asetaRuutu = ({ asettelu, ruutu, zoomi = 1 }) => {
  asiakirja.documentElement.clientWidth = asettelu[0];
  asiakirja.documentElement.clientHeight = asettelu[1];
  globalThis.visualViewport.width = ruutu[0];
  globalThis.visualViewport.height = ruutu[1];
  globalThis.visualViewport.scale = zoomi;
  globalThis.innerWidth = ruutu[0];
  globalThis.innerHeight = ruutu[1];
};

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
/* 5. Iskulause nimen alla                                           */
/* ---------------------------------------------------------------- */

/*
 * Omistaja 11.9.2026 klo 12.55 (Raamattu, MINITRAILERIN LISAYKSET),
 * sanatarkasti: *"Kaupungin nimen alle voisi feidautua kaupungin isku
 * lause"*. Iskulause on PAKIN varassa: kaupunki jolle Fable ei ole
 * vielä kirjoittanut lausetta saa trailerin ilman sitä — ja juuri se
 * portti pitää 141 iskulauseetonta kaupunkia ennallaan.
 */
test('iskulause piirtyy nimen alle kun se on pakissa', () => {
  const ui = tekoUi();
  naytaSaapumistraileri(ui, KOEKAUPUNKI);
  const kehys = traileri()[0];
  const rivi = kehys.querySelector('.saapumistraileri-iskulause');
  assert.ok(rivi, 'iskulause nousee ruudulle');
  assert.equal(rivi.textContent, ISKULAUSEET[KOEKAUPUNKI.id]);
  assert.equal(rivi.getAttribute('aria-hidden'), 'true',
    'nimi luetaan ruudunlukijalle kerran, iskulause on koriste');
  // Nimi ja iskulause samassa pystyrivissä (css asettaa lauseen ALLE).
  const teksti = kehys.querySelector('.saapumistraileri-teksti');
  assert.ok(teksti, 'nimelle ja iskulauseelle on yhteinen kotelo');
  assert.ok(teksti.querySelector('.saapumistraileri-nimi'));
  assert.equal(teksti.childNodes.at(-1), rivi, 'iskulause on nimen jälkeen');
  piilotaSaapumistraileri(ui);
});

test('ilman iskulausetta traileri näyttää pelkän nimen', () => {
  const ui = tekoUi();
  const kaupunki = { id: 'kairo', name: 'Kairo' };
  assert.equal(trailerinIskulause(kaupunki), '', 'koekaupungilla ei ole iskulausetta');
  naytaSaapumistraileri(ui, kaupunki);
  const kehys = traileri()[0];
  assert.equal(kehys.querySelectorAll('.saapumistraileri-iskulause').length, 0);
  assert.ok(kehys.querySelector('.saapumistraileri-nimi'), 'nimi on silti paikallaan');
  piilotaSaapumistraileri(ui);
});

test('iskulause feidautuu vasta viimeisen kirjaimen laskeuduttua', (t) => {
  // Viive lasketaan nimen pituudesta: viimeinen kirjain lähtee
  // porrastuksensa verran myöhemmin ja lentää oman lentoaikansa.
  assert.equal(iskulauseenViive('Marseille'),
    8 * NIMEN_PORRAS_MS + NIMEN_LENTO_MS + ISKULAUSEEN_VIIVE_MS);

  t.mock.timers.enable({ apis: ['setTimeout'] });
  const ui = tekoUi();
  naytaSaapumistraileri(ui, KOEKAUPUNKI);
  const rivi = traileri()[0].querySelector('.saapumistraileri-iskulause');
  t.mock.timers.tick(iskulauseenViive(KOEKAUPUNKI.name) - 100);
  assert.ok(!rivi.classList.contains('nakyy'), 'ei ennen viimeistä kirjainta');
  t.mock.timers.tick(200);
  assert.ok(rivi.classList.contains('nakyy'), 'feidaus näkyviin');

  // Kirjainten syöksyn hetkellä iskulause häipyy mukana — feidaten.
  t.mock.timers.tick(trailerinKesto(trailerinKuvat(KOEKAUPUNKI).length));
  assert.ok(rivi.classList.contains('ulos'));
  piilotaSaapumistraileri(ui);
  t.mock.timers.reset();
});

/* ---------------------------------------------------------------- */
/* 6. Pulun tilannetapahtumat ja tehosteet                           */
/* ---------------------------------------------------------------- */

/** Kerää trailerin tilannetapahtumat testin ajaksi. */
function kerraaTrailerit(t) {
  const lista = [];
  const irrota = kuunteleLivianTilanteita((laji, tiedot) => {
    if (laji === 'trailer') lista.push(tiedot);
  });
  t.after(irrota);
  return lista;
}

/** Mockaa soittoportti (js/sound.js sfx) ja kerää tehostenimet. */
function kerraaTehosteet(t) {
  const lista = [];
  t.mock.method(sfx, 'play', (nimi) => { lista.push(nimi); });
  return lista;
}

test('kirjaimet ja loppu ilmoitetaan kerran koko trailerin ajalta', (t) => {
  const tapahtumat = kerraaTrailerit(t);
  kerraaTehosteet(t);
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const ui = tekoUi();
  naytaSaapumistraileri(ui, KOEKAUPUNKI);
  t.mock.timers.tick(60);
  assert.deepEqual(tapahtumat.map((x) => x.vaihe), ['kirjaimet'],
    'pulu saa vaistoliikkeen juuri kun ensimmäinen kirjain lähtee lentoon');
  const { tunnus } = tapahtumat[0];
  assert.equal(typeof tunnus, 'object');
  assert.equal(tapahtumat[0].kaupunki, KOEKAUPUNKI.id);

  t.mock.timers.tick(trailerinKesto(trailerinKuvat(KOEKAUPUNKI).length) + 100);
  assert.deepEqual(tapahtumat.map((x) => x.vaihe), ['kirjaimet', 'loppu']);
  assert.equal(tapahtumat[1].tunnus, tunnus, 'sama tunnus koko trailerin ajan');
  assert.equal(tapahtumat[1].kaupunki, KOEKAUPUNKI.id);

  // Siivous jälkikäteen ei saa lähettää toista loppua.
  piilotaSaapumistraileri(ui);
  assert.equal(tapahtumat.filter((x) => x.vaihe === 'loppu').length, 1);
  t.mock.timers.reset();
});

test('ohitus ja kaupungin vaihto päättävät tapahtumaparin tasan kerran', (t) => {
  const tapahtumat = kerraaTrailerit(t);
  kerraaTehosteet(t);
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const ui = tekoUi();

  // Napautus kesken trailerin.
  naytaSaapumistraileri(ui, KOEKAUPUNKI);
  t.mock.timers.tick(60);
  traileri()[0].dispatch('pointerdown');
  t.mock.timers.tick(500);
  assert.deepEqual(tapahtumat.map((x) => x.vaihe), ['kirjaimet', 'loppu']);

  // Kaupungin vaihto (purku) kesken seuraavan trailerin.
  tapahtumat.length = 0;
  naytaSaapumistraileri(ui, KOEKAUPUNKI);
  t.mock.timers.tick(60);
  piilotaSaapumistraileri(ui);
  assert.deepEqual(tapahtumat.map((x) => x.vaihe), ['kirjaimet', 'loppu']);
  t.mock.timers.reset();
});

test('kuvaton kaupunki ei lähetä tilannetapahtumia eikä soita mitään', async (t) => {
  const tapahtumat = kerraaTrailerit(t);
  const tehosteet = kerraaTehosteet(t);
  const ui = tekoUi();
  assert.equal(await naytaSaapumistraileri(ui, { id: 'ei-tallaista', name: 'Ei mitään' }), false);
  assert.deepEqual(tapahtumat, []);
  assert.deepEqual(tehosteet, []);
});

test('kameran klik jokaiselle kuvalle, suhina sisään ja ulos', (t) => {
  kerraaTrailerit(t);
  const tehosteet = kerraaTehosteet(t);
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const ui = tekoUi();
  const kuvia = trailerinKuvat(KOEKAUPUNKI).length;
  assert.equal(kuvia, 3);
  naytaSaapumistraileri(ui, KOEKAUPUNKI);
  t.mock.timers.tick(60);
  // Ensimmäinen kuva on keskellä ja kirjaimet lähtevät: yksi klik, yksi
  // suhina — vaikka nosto herätetään kahdesti (rAF ja 50 ms).
  assert.deepEqual(tehosteet, ['pulu.kirjain-suhina', 'pulu.kamera-klik']);

  t.mock.timers.tick(trailerinKesto(kuvia) + 100);
  assert.equal(tehosteet.filter((n) => n === 'pulu.kamera-klik').length, kuvia,
    'klik jokaiselle keskelle pysähtyvälle kuvalle');
  assert.equal(tehosteet.filter((n) => n === 'pulu.kirjain-suhina').length, 2,
    'suhina kerran sisään ja kerran ulos — ei kirjaimittain');
  t.mock.timers.reset();
});

test('ohitus ei soita uutta suhinaa', (t) => {
  kerraaTrailerit(t);
  const tehosteet = kerraaTehosteet(t);
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const ui = tekoUi();
  naytaSaapumistraileri(ui, KOEKAUPUNKI);
  t.mock.timers.tick(60);
  traileri()[0].dispatch('pointerdown');
  t.mock.timers.tick(trailerinKesto(3) + 1000);
  assert.equal(tehosteet.filter((n) => n === 'pulu.kirjain-suhina').length, 1,
    'ohitettu traileri ei syöksy ulos eikä suhise uudestaan');
  t.mock.timers.reset();
});

/* ---------------------------------------------------------------- */
/* 7. Moduuli on listoilla                                           */
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

/* ---------------------------------------------------------------- */
/* Kuvan koko ja lähtevän kuvan häipyminen (omistaja 11.9.2026)      */
/* ---------------------------------------------------------------- */

test('kuva täyttää annetun leveyden eikä jää omaan pikselikokoonsa', () => {
  const css = readFileSync(new URL('../css/saapumistraileri.css', import.meta.url), 'utf8');
  const lohko = css.slice(css.indexOf('.saapumistraileri-kuva img {'));
  // Kommentit pois: ne puhuvat vanhasta säännöstä eivätkä ole sääntöjä.
  const saanto = lohko.slice(0, lohko.indexOf('}')).replace(/\/\*[\s\S]*?\*\//g, '');
  assert.match(saanto, /width:\s*min\(/,
    'omistaja 11.9.2026: "Kuvat tulevat liian pieninä" — leveys on annettava');
  assert.doesNotMatch(saanto, /width:\s*auto/, 'width: auto jättää pienen kuvan pieneksi');
  assert.match(saanto, /max-height:\s*var\(--traileri-korkeuskatto\)/,
    'korkeuskatto puuttuu: pystykuva karkaisi ruudun yli');
});

test('lähtevä kuva häipyy liukuessaan eikä jää ruudun laitaan', () => {
  const css = readFileSync(new URL('../css/saapumistraileri.css', import.meta.url), 'utf8');
  const lohko = css.slice(css.indexOf('.saapumistraileri-kuva.ulos {'));
  const saanto = lohko.slice(0, lohko.indexOf('}'));
  assert.match(saanto, /opacity:\s*0/,
    'omistaja 11.9.2026: "edellinen jää sivuun näkymään"');
  assert.match(saanto, /opacity var\(--traileri-ulos\)/,
    'häivytyksen on kestettävä koko liu\'un ajan, ei 260 ms');
});

/* ---------------------------------------------------------------- */
/* Kuva niin isona kuin se mahtuu (omistaja 11.9.2026 klo 22.26)     */
/* ---------------------------------------------------------------- */

test('kuvan leveys lasketaan MOLEMMISTA katoista — ei pelkästä leveydestä', () => {
  const css = readFileSync(new URL('../css/saapumistraileri.css', import.meta.url), 'utf8');
  const lohko = css.slice(css.indexOf('.saapumistraileri-kuva img {'));
  const saanto = lohko.slice(0, lohko.indexOf('}')).replace(/\/\*[\s\S]*?\*\//g, '');
  /*
   * MIKSI TÄMÄ ON SÄÄNTÖ EIKÄ MAKUASIA. Pelkkä `width: <katto>vw`
   * yhdessä korkeuskaton ja object-fit: containin kanssa MITTAA
   * oikein mutta NÄYTTÄÄ väärin: laatikko jää leveyskattoon ja
   * contain kutistaa kuvan sen sisään. Mitattu Chromiumilla
   * 11.9.2026 iPadin vaakaruudulla 1194 × 834: laatikko 92,0 %
   * ruudun leveydestä, maalattu kuva vain 83,8 %.
   */
  assert.match(saanto, /width:\s*min\(/,
    'leveyden on oltava pienempi kahdesta katosta, ei pelkkä leveyskatto');
  assert.match(saanto, /var\(--traileri-leveyskatto\)/);
  assert.match(saanto, /var\(--traileri-korkeuskatto\)\s*\*\s*var\(--traileri-kuvasuhde/,
    'korkeuskatto on muutettava leveydeksi kuvasuhteella');
  assert.match(saanto, /max-width:\s*var\(--traileri-leveyskatto\)/);
  assert.match(saanto, /max-height:\s*var\(--traileri-korkeuskatto\)/);
  assert.doesNotMatch(saanto, /width:\s*auto/, 'width: auto jättää kuvan omaan pikselikokoonsa');
});

test('katot ovat vähintään 96 % ja 92 % mitatusta ruudusta ja kotelo käyttää samoja', () => {
  const css = readFileSync(new URL('../css/saapumistraileri.css', import.meta.url), 'utf8');
  const katot = css.slice(css.indexOf('.saapumistraileri {'), css.indexOf('.saapumistraileri.ohitettu'));
  const leveys = /--traileri-leveyskatto:\s*calc\(var\(--traileri-ruutu-leveys\)\s*\*\s*(\d*\.?\d+)\)/.exec(katot);
  const korkeus = /--traileri-korkeuskatto:\s*calc\(var\(--traileri-ruutu-korkeus\)\s*\*\s*(\d*\.?\d+)\)/.exec(katot);
  assert.ok(leveys && korkeus,
    'katot on laskettava MITATUSTA ruudusta (--traileri-ruutu-*), ei vw/vh-yksiköistä');
  assert.ok(Number(leveys[1]) >= 0.96,
    `omistaja 11.9.2026: "herokuva on yhä liian pieni" — leveyskatto ${leveys?.[1]}`);
  assert.ok(Number(korkeus[1]) >= 0.92, `korkeuskatto ${korkeus?.[1]} on liian matala`);
  const kotelo = css.slice(css.indexOf('.saapumistraileri-kuva {'));
  const saanto = kotelo.slice(0, kotelo.indexOf('}'));
  assert.match(saanto, /max-width:\s*var\(--traileri-leveyskatto\)/,
    'kotelo ei saa olla kuvaa ahtaampi — muuten se rajaisi kuvan');
  assert.match(saanto, /max-height:\s*var\(--traileri-korkeuskatto\)/);
});

test('skripti kirjoittaa kuvan oman kuvasuhteen koteloon', () => {
  const ui = tekoUi();
  naytaSaapumistraileri(ui, KOEKAUPUNKI);
  const kotelot = traileri()[0].querySelectorAll('.saapumistraileri-kuva');
  assert.ok(kotelot.length, 'koteloita pitää olla');
  const kotelo = kotelot[0];
  const img = kotelo.querySelector('IMG');
  assert.ok(img, 'kotelossa on kuva');
  assert.equal(kotelo.style['--traileri-kuvasuhde'], undefined,
    'lataamattomasta kuvasta ei saa kirjoittaa nollasuhdetta');
  img.naturalWidth = 1536;
  img.naturalHeight = 1024;
  img.dispatch('load');
  assert.equal(kotelo.style['--traileri-kuvasuhde'], String(1536 / 1024),
    'css laskee leveyden korkeuskatosta tällä luvulla');
  piilotaSaapumistraileri(ui);
});

/* ---------------------------------------------------------------- */
/* Ruudun mitta ja paluu toisesta sovelluksesta                      */
/* (omistaja 11.9.2026 klo 23.18)                                    */
/* ---------------------------------------------------------------- */

/*
 * JUURISYY, JOTA NÄMÄ VARTIOIVAT. Omistaja 11.9.2026 klo 23.18,
 * sanatarkasti: *"Nyt taas näkyy kuvat pienempänä vaikka välissä näkyi
 * isompana. Syy on ilmeisesti siinä jos käyn toisessa apissa ja palaan
 * matkakirjaan niin sitten kuvien koko muuttuu pienemmäksi"*.
 *
 * WKWebView jättää sovellusvaihdon jälkeen ASETTELUVIEWPORTIN vanhaan
 * kapeaan mittaan, kunnes joku pakottaa laskennan uusiksi. `96vw` on
 * 96 % viewportista — ei ruudusta — joten koko traileri kutistui sen
 * mukana. Mitattu Chromiumilla 11.9.2026: 834 × 1194 ruudulla, jonka
 * asetteluviewportti oli jäänyt 480 px:iin, maalattu kuva oli 461 px
 * eli 55,2 % ruudusta (sama luku kuin omistajan kaappauksessa);
 * korjattuna 801 px eli 96,0 %.
 *
 * Siksi mitta MITATAAN ja kirjoitetaan pikseleinä, ja se uusitaan aina
 * kun sivu palaa näkyviin tai näkymä muuttuu.
 */

test('mitattu ruutu voittaa vanhentuneen asetteluviewportin', () => {
  asetaRuutu({ asettelu: [480, 700], ruutu: [834, 1194] });
  assert.deepEqual(trailerinNakyma(globalThis), { leveys: 834, korkeus: 1194 },
    'jumiutunut asetteluviewportti ei saa kutistaa traileria');

  asetaRuutu({ asettelu: [834, 1194], ruutu: [834, 1194] });
  assert.deepEqual(trailerinNakyma(globalThis), { leveys: 834, korkeus: 1194 });
});

test('nipistyszoomissa visuaalinen mitta jätetään huomiotta', () => {
  // Zoomattuna visuaalinen viewportti on tarkoituksella pienempi kuin
  // ruutu; jos se voittaisi, traileri kutistuisi zoomin mukana.
  asetaRuutu({ asettelu: [1024, 1366], ruutu: [400, 600], zoomi: 2.5 });
  assert.deepEqual(trailerinNakyma(globalThis), { leveys: 1024, korkeus: 1366 });
  asetaRuutu({ asettelu: [834, 1194], ruutu: [834, 1194] });
});

test('ilman visualViewporttia mitta tulee innerWidthista', () => {
  const nakyva = globalThis.visualViewport;
  delete globalThis.visualViewport;
  try {
    asiakirja.documentElement.clientWidth = 0;
    asiakirja.documentElement.clientHeight = 0;
    globalThis.innerWidth = 1366;
    globalThis.innerHeight = 1024;
    assert.deepEqual(trailerinNakyma(globalThis), { leveys: 1366, korkeus: 1024 });
  } finally {
    globalThis.visualViewport = nakyva;
    asetaRuutu({ asettelu: [834, 1194], ruutu: [834, 1194] });
  }
});

test('traileri kirjoittaa mitatun ruudun heti kehykseensä', () => {
  asetaRuutu({ asettelu: [834, 1194], ruutu: [834, 1194] });
  const ui = tekoUi();
  naytaSaapumistraileri(ui, KOEKAUPUNKI);
  const kehys = traileri()[0];
  assert.equal(kehys.style['--traileri-ruutu-leveys'], '834px');
  assert.equal(kehys.style['--traileri-ruutu-korkeus'], '1194px');
  piilotaSaapumistraileri(ui);
});

test('paluu toisesta sovelluksesta mittaa ruudun uudelleen', () => {
  asetaRuutu({ asettelu: [834, 1194], ruutu: [834, 1194] });
  const ui = tekoUi();
  naytaSaapumistraileri(ui, KOEKAUPUNKI);
  const kehys = traileri()[0];
  // ENNEN: oikea mitta.
  assert.equal(kehys.style['--traileri-ruutu-leveys'], '834px');

  // Sovellusvaihto: asetteluviewportti jää 480 px:iin, ruutu on yhä 834.
  asetaRuutu({ asettelu: [480, 700], ruutu: [834, 1194] });
  laukaise(dokumentinKuuntelijat, 'visibilitychange');
  assert.equal(kehys.style['--traileri-ruutu-leveys'], '834px',
    'paluussa mitta on ruutu, ei jumiutunut asetteluviewportti (461 px vs. 801 px)');
  assert.equal(kehys.style['--traileri-ruutu-korkeus'], '1194px');
  piilotaSaapumistraileri(ui);
});

test('bfcache-paluu (pageshow) mittaa ruudun uudelleen', () => {
  asetaRuutu({ asettelu: [480, 700], ruutu: [480, 700] });
  const ui = tekoUi();
  naytaSaapumistraileri(ui, KOEKAUPUNKI);
  const kehys = traileri()[0];
  assert.equal(kehys.style['--traileri-ruutu-leveys'], '480px');
  asetaRuutu({ asettelu: [480, 700], ruutu: [1194, 834] });
  laukaise(ikkunanKuuntelijat, 'pageshow');
  assert.equal(kehys.style['--traileri-ruutu-leveys'], '1194px');
  assert.equal(kehys.style['--traileri-ruutu-korkeus'], '834px');
  piilotaSaapumistraileri(ui);
});

test('näkymän koon muutos (kääntö, visualViewport) mittaa uudelleen', () => {
  asetaRuutu({ asettelu: [834, 1194], ruutu: [834, 1194] });
  const ui = tekoUi();
  naytaSaapumistraileri(ui, KOEKAUPUNKI);
  const kehys = traileri()[0];

  asetaRuutu({ asettelu: [1194, 834], ruutu: [1194, 834] });
  laukaise(ikkunanKuuntelijat, 'orientationchange');
  assert.equal(kehys.style['--traileri-ruutu-leveys'], '1194px');

  asetaRuutu({ asettelu: [1366, 1024], ruutu: [1366, 1024] });
  laukaise(ikkunanKuuntelijat, 'resize');
  assert.equal(kehys.style['--traileri-ruutu-leveys'], '1366px');

  asetaRuutu({ asettelu: [1024, 1366], ruutu: [1024, 1366] });
  laukaise(nakyvanKuuntelijat, 'resize');
  assert.equal(kehys.style['--traileri-ruutu-korkeus'], '1366px');
  piilotaSaapumistraileri(ui);
});

test('paluu merkitsee myös kuvasuhteet uudelleen', () => {
  asetaRuutu({ asettelu: [834, 1194], ruutu: [834, 1194] });
  const ui = tekoUi();
  naytaSaapumistraileri(ui, KOEKAUPUNKI);
  const kotelo = traileri()[0].querySelectorAll('.saapumistraileri-kuva')[0];
  const img = kotelo.querySelector('IMG');
  // Taustassa purettu ja uudelleen ladattu kuva: mitta on olemassa,
  // mutta yksikään load-tapahtuma ei enää tule. Paluu kirjoittaa sen.
  delete kotelo.style['--traileri-kuvasuhde'];
  img.naturalWidth = 1600;
  img.naturalHeight = 900;
  laukaise(dokumentinKuuntelijat, 'visibilitychange');
  assert.equal(kotelo.style['--traileri-kuvasuhde'], String(1600 / 900));
  piilotaSaapumistraileri(ui);
});

test('siivous irrottaa kaikki näkymäkuuntelijat', () => {
  const pohja = kuuntelijoita();
  const ui = tekoUi();
  naytaSaapumistraileri(ui, KOEKAUPUNKI);
  assert.ok(kuuntelijoita() > pohja, 'trailerin pitää kuunnella näkymää');
  piilotaSaapumistraileri(ui);
  assert.equal(kuuntelijoita(), pohja,
    'poistunut traileri ei saa jäädä kuuntelemaan näkymää');
});

test('kellon mukaan päättynyt traileri suljetaan paluussa eikä jää välitilaan', async () => {
  asetaRuutu({ asettelu: [834, 1194], ruutu: [834, 1194] });
  const ui = tekoUi();
  const lupaus = naytaSaapumistraileri(ui, KOEKAUPUNKI);
  const tila = ui.saapumistraileri;
  assert.ok(tila.kesto > 0, 'trailerilla on kesto kellossa mitattuna');
  /*
   * TAUSTALLA AJASTIMET EIVÄT LAUKEA. Jos iOS jättää ne kokonaan
   * laukaisematta, traileri jäisi ruudulle ja luenta odottaisi
   * lupausta ikuisesti — siksi paluu tarkistaa kellon.
   */
  tila.alku = Date.now() - tila.kesto - 1;
  laukaise(dokumentinKuuntelijat, 'visibilitychange');
  assert.equal(traileri().length, 0, 'kellon mukaan ohi mennyt traileri poistuu paluussa');
  assert.equal(await lupaus, true, 'lupauksen on ratkettava, tai luenta ei ala koskaan');
});

test('trailerin mitat eivät saa palata vw/vh-yksiköihin', () => {
  const css = readFileSync(new URL('../css/saapumistraileri.css', import.meta.url), 'utf8');
  const ilmanKommentteja = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const rivit = ilmanKommentteja.split('\n')
    .filter((rivi) => /\d\s*v[wh]\b/.test(rivi))
    .map((rivi) => rivi.trim());
  /*
   * Ainoa sallittu vw/vh on ruutumuuttujien VARAMITTA: se on voimassa
   * vain siihen asti, kunnes skripti on ehtinyt mitata ruudun (ja
   * testien DOM-mallissa, jossa mittaa ei ole). Kaikki muu vw/vh
   * kutistuisi taas vanhentuneen asetteluviewportin mukana.
   */
  const sallitut = rivit.filter((rivi) => /^--traileri-ruutu-(leveys|korkeus):\s*100v[wh];$/.test(rivi));
  assert.deepEqual(rivit, sallitut,
    `vw/vh karkasi takaisin trailerin mittoihin: ${rivit.filter((r) => !sallitut.includes(r)).join(' | ')}`);
});
