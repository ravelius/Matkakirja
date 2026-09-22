/*
 * VEDON SEURANTA: VALIKON VALINTA JA SEN VAIKUTUS LAUTAAN
 * (omistajan tilaus 22.9.2026; js/vedon-seuranta.js, js/pallo.js).
 *
 * Kolme asiaa, jotka eivät saa rikkoutua:
 *   1. valinta muistetaan laitteelle ja kelvoton arvo palautuu oletukseen
 *   2. mittauslippu (?koe=) VOITTAA valinnan — muuten savuke mittaisi
 *      sitä, mikä laitteen localStorageen on sattunut jäämään
 *   3. vaihto puree heti, ilman uutta latausta (tapahtuma laudalle)
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const RAD = Math.PI / 180;
const R = 100;

globalThis.requestAnimationFrame ??= () => 1;
globalThis.cancelAnimationFrame ??= () => {};

/** Muisti ja tapahtumakanava selaimen tapaan (Nodessa ei kumpaakaan). */
function valeIkkuna() {
  const varasto = new Map();
  globalThis.localStorage = {
    getItem: (k) => (varasto.has(k) ? varasto.get(k) : null),
    setItem: (k, v) => { varasto.set(k, String(v)); },
    removeItem: (k) => { varasto.delete(k); },
  };
  const kuulijat = new Map();
  globalThis.addEventListener = (laji, fn) => { kuulijat.set(laji, [...(kuulijat.get(laji) ?? []), fn]); };
  globalThis.removeEventListener = (laji, fn) => {
    kuulijat.set(laji, (kuulijat.get(laji) ?? []).filter((f) => f !== fn));
  };
  globalThis.dispatchEvent = (e) => { for (const fn of kuulijat.get(e.type) ?? []) fn(e); return true; };
  return {
    varasto,
    pura() {
      delete globalThis.localStorage;
      delete globalThis.addEventListener;
      delete globalThis.removeEventListener;
      delete globalThis.dispatchEvent;
      delete globalThis.location;
      delete globalThis.ontouchstart;
    },
  };
}

const {
  VEDON_SEURANNAN_OLETUS, VEDON_SEURANNAN_TAVAT, VEDON_SEURANTA_AVAIN,
  asetaVedonSeuranta, kelpaaTapa, kosketuslaite, mittauslippuPaalla,
  seurannanAsetukset, vedonSeuranta,
} = await import('../js/vedon-seuranta.js');
const { asennaPallonEleet } = await import('../js/pallo.js');

test('viisi tapaa, oletus interpolointi, kosketusrivi merkitty', () => {
  assert.deepEqual(
    VEDON_SEURANNAN_TAVAT.map((t) => t.avain),
    ['interp', 'vanha', 'ennakko', 'jousi', 'touch'],
    'samat viisi kuin js/pallo.js:n lipuilla',
  );
  assert.equal(VEDON_SEURANNAN_OLETUS, 'interp');
  assert.equal(VEDON_SEURANNAN_TAVAT.find((t) => t.avain === 'touch').kosketus, true);
  for (const t of VEDON_SEURANNAN_TAVAT) {
    assert.ok(t.nimi && t.seloste && t.ikoni, `${t.avain}: nimi, seloste ja ikoni`);
  }
});

test('valinta muistetaan, kelvoton arvo palautuu oletukseen', () => {
  const ikkuna = valeIkkuna();
  try {
    assert.equal(vedonSeuranta(), 'interp', 'oletus ilman muistia');
    assert.equal(asetaVedonSeuranta('jousi'), 'jousi');
    assert.equal(ikkuna.varasto.get(VEDON_SEURANTA_AVAIN), 'jousi');
    assert.equal(vedonSeuranta(), 'jousi');
    assert.equal(asetaVedonSeuranta('pöllö'), 'interp', 'tuntematon arvo ei jää voimaan');
    assert.equal(vedonSeuranta(), 'interp');
  } finally { ikkuna.pura(); }
});

test('kosketusnäytteet vain kosketuslaitteella', () => {
  const ikkuna = valeIkkuna();
  try {
    assert.equal(kosketuslaite(), false);
    assert.equal(kelpaaTapa('touch'), false, 'hiirellä touchmovea ei tule');
    assert.equal(asetaVedonSeuranta('touch'), 'interp');
    globalThis.ontouchstart = null;
    assert.equal(kosketuslaite(), true);
    assert.equal(kelpaaTapa('touch'), true);
    assert.equal(asetaVedonSeuranta('touch'), 'touch');
    // Lähde vaihtuu, laskutapa ei: kosketusnäytteet lasketaan oletustavalla.
    assert.deepEqual(seurannanAsetukset('touch'), { tapa: 'interp', touchLahde: true });
    assert.deepEqual(seurannanAsetukset('ennakko'), { tapa: 'ennakko', touchLahde: false });
  } finally { ikkuna.pura(); }
});

test('mittauslippu tunnistetaan samalla jäsennyksellä kuin ?koe=', () => {
  assert.equal(mittauslippuPaalla('?koe=syotejousi'), true);
  assert.equal(mittauslippuPaalla('?koe=syoteloki,syotetouch'), true, 'pilkkulista');
  assert.equal(mittauslippuPaalla('?koe=syoteloki'), false, 'loki ei ole tapalippu');
  assert.equal(mittauslippuPaalla(''), false);
});

/* --- lauta: valinta pureutuu syötteeseen -------------------------------- */

function valePallo() {
  const kamera = { position: { x: 0, y: 0, z: 0 }, fov: 50 };
  const ohjaimet = {
    update() {},
    addEventListener() {}, removeEventListener() {},
    autoRotate: false, enableRotate: true, enableZoom: true, minDistance: NaN, maxDistance: NaN,
    _pointers: [], _pointerPositions: {}, state: -1,
    domElement: { ownerDocument: { removeEventListener() {} } },
  };
  let pov = { lat: 0, lng: 0, altitude: 0.5 };
  const aseta = (p) => {
    pov = { ...pov, ...p };
    const r = R * (1 + pov.altitude);
    kamera.position = {
      x: r * Math.cos(pov.lat * RAD) * Math.sin(pov.lng * RAD),
      y: r * Math.sin(pov.lat * RAD),
      z: r * Math.cos(pov.lat * RAD) * Math.cos(pov.lng * RAD),
      length() { return Math.hypot(this.x, this.y, this.z); },
    };
  };
  aseta(pov);
  return {
    pallo: {
      controls: () => ohjaimet,
      camera: () => kamera,
      getGlobeRadius: () => R,
      pointOfView(p) { if (p) { aseta(p); return this; } return { ...pov }; },
    },
    ohjaimet,
  };
}

function valeKotelo() {
  const kuulijat = new Map();
  const doc = { kuulijat: new Map(), defaultView: { addEventListener() {}, removeEventListener() {} } };
  doc.addEventListener = (laji, fn) => { doc.kuulijat.set(laji, [...(doc.kuulijat.get(laji) ?? []), fn]); };
  doc.removeEventListener = () => {};
  doc.dispatchEvent = () => true;
  const kotelo = {
    clientWidth: 400,
    clientHeight: 800,
    kuunnellut: [],
    getBoundingClientRect() { return { left: 0, top: 0, width: 400, height: 800 }; },
    addEventListener(laji, fn) {
      this.kuunnellut.push(laji);
      kuulijat.set(laji, [...(kuulijat.get(laji) ?? []), fn]);
    },
    removeEventListener() {},
    contains: () => true,
    ownerDocument: doc,
  };
  const laheta = (laji, e) => {
    const t = { target: kotelo, pointerId: 1, pointerType: 'touch', timeStamp: 0, ...e };
    for (const fn of doc.kuulijat.get(laji) ?? []) fn(t);
    for (const fn of kuulijat.get(laji) ?? []) fn(t);
  };
  return { kotelo, laheta };
}

test('valinta ratkaisee tavan, ja vaihto puree ilman uutta latausta', () => {
  const ikkuna = valeIkkuna();
  try {
    globalThis.location = { search: '' };
    asetaVedonSeuranta('jousi');
    const { pallo } = valePallo();
    const { kotelo } = valeKotelo();
    const ui = { reducedMotion: false };
    const eleet = asennaPallonEleet(pallo, kotelo, ui);
    assert.equal(ui.pallonSyote.tapa, 'jousi', 'valinta luettiin alussa');
    assert.equal(ui.pallonSyote.interpVanha, false);

    // Vaihto valikossa: sama sessio, ei latausta.
    asetaVedonSeuranta('vanha');
    assert.equal(ui.pallonSyote.tapa, 'vanha', 'tapa vaihtui lennossa');
    assert.equal(ui.pallonSyote.interpVanha, true, 'vanha polku myös kirjauksissa');
    assert.equal(ui.pallonSyote.naytteet.length, 0, 'vanhat näytteet eivät kuulu uudelle tavalle');

    asetaVedonSeuranta('interp');
    assert.equal(ui.pallonSyote.tapa, 'interp');
    eleet.pura();
    // Purun jälkeen valinta ei enää kosketa purettuun lautaan.
    asetaVedonSeuranta('ennakko');
    assert.equal(ui.pallonSyote.tapa, 'interp', 'kuuntelija irrotettiin');
  } finally { ikkuna.pura(); }
});

test('mittauslippu voittaa valinnan, myös lennossa', () => {
  const ikkuna = valeIkkuna();
  try {
    globalThis.location = { search: '?koe=syotejousi' };
    asetaVedonSeuranta('vanha');
    const { pallo } = valePallo();
    const { kotelo } = valeKotelo();
    const ui = { reducedMotion: false };
    asennaPallonEleet(pallo, kotelo, ui);
    assert.equal(ui.pallonSyote.tapa, 'jousi', 'lippu voittaa muistetun valinnan');
    asetaVedonSeuranta('ennakko');
    assert.equal(ui.pallonSyote.tapa, 'jousi', 'mittausajo ei vaihdu valikosta');
  } finally { ikkuna.pura(); }
});

test('kosketuskuuntelija kytketään kerran ja valinta vaihtaa vain lähteen', () => {
  const ikkuna = valeIkkuna();
  try {
    globalThis.location = { search: '' };
    globalThis.ontouchstart = null;
    asetaVedonSeuranta('interp');
    const { pallo } = valePallo();
    const { kotelo } = valeKotelo();
    const ui = { reducedMotion: false };
    asennaPallonEleet(pallo, kotelo, ui);
    const touchKuuntelijoita = kotelo.kuunnellut.filter((l) => l === 'touchmove').length;
    assert.equal(touchKuuntelijoita, 1, 'kuuntelija kytketään kosketuslaitteella kerran');
    assert.equal(ui.pallonSyote.touchLahde, false, 'lähde ei ole vielä touchmove');
    asetaVedonSeuranta('touch');
    assert.equal(ui.pallonSyote.touchLahde, true, 'lähde vaihtui ilman uutta kuuntelijaa');
    assert.equal(ui.pallonSyote.tapa, 'interp', 'laskutapa pysyy oletuksena');
    assert.equal(kotelo.kuunnellut.filter((l) => l === 'touchmove').length, 1);
  } finally { ikkuna.pura(); }
});

test('moduuli pysyy palvelutyöntekijässä ja käännöksessä (valikkorivit poistettu 22.9.2026)', () => {
  // Valikon rivit poistettu omistajan pyynnöstä; pallo.js käyttää moduulia yhä ?koe=-lippujen kautta.
  // Palvelutyöntekijä ja yhden tiedoston käännös tuntevat moduulin.
  assert.match(readFileSync(new URL('../sw.js', import.meta.url), 'utf8'), /'\.\/js\/vedon-seuranta\.js'/);
  assert.match(
    readFileSync(new URL('../tools/build-standalone.mjs', import.meta.url), 'utf8'),
    /'js\/vedon-seuranta\.js'/,
  );
});
