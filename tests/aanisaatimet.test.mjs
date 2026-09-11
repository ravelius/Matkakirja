/*
 * ══════════════════════════════════════════════════════════════════
 * KOLME ÄÄNISÄÄDINTÄ: ÄÄNITEHOSTEET, PULU JA LUKIJA — VARTIO
 * ══════════════════════════════════════════════════════════════════
 *
 * Omistajan tilaus 11.9.2026 klo 13.30, sanatarkasti: *"ja ääni
 * säätimiin voisi tuoda mukaan äänitehosteet pulun ja lukijan omat
 * äänen voimakkuus säätimet"* (Raamattu, KEHITTAJAVALIKON VIVUT POIS,
 * ILME POIS PAALTA, AANISAATIMIIN TEHOSTEET, PULU JA LUKIJA).
 *
 * Kolme asiaa, ja tämä tiedosto vartioi kaikkia:
 *
 *  1. TALLENNUS JA RAJAT (js/aani-ehdokkaat.js): kolme erillistä
 *     avainta, oletukset 0,9 / 1 / 1, rajat 0–1 ja kelvottoman arvon
 *     paluu oletukseen. Nolla on aito hiljaisuus eikä palaudu
 *     oletukseksi — juuri siksi vanha 0,1:n alaraja poistui.
 *  2. TEHOSTEIDEN REITTI (js/sound.js): masterketjun gain on
 *     MASTER_PERUSTASO × tehosteVoima, ja paivitaTehosteVoima päivittää
 *     soivan ketjun heti.
 *  3. PULUN REITTI (js/liviapuhe.js): äänitteen volume on
 *     pulunVoima × LIVIAN_PERUSTASO × vaimennus — eikä lukijan liuku
 *     enää säädä pulua.
 *
 * Lisäksi tarkistetaan, että liu'ut ovat HAMMASRATASVALIKON
 * Äänentasot-ryhmässä (omistaja 11.9.2026 klo 14.35: *"kaikki äänentason
 * säätimet kuuluvat hammasrattaan alle"*), että ratas näkyy myös
 * pelaajalle ja että hampurilaisen Äänet-osioon jäivät vain kytkimet.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  PULUNVOIMA_AVAIN, TEHOSTEVOIMA_AVAIN,
  asetaPuheVoima, asetaPulunVoima, asetaTehosteVoima,
  puheVoima, pulunVoima, tehosteVoima,
} from '../js/aani-ehdokkaat.js';
import { LIVIAN_PERUSTASO, paivitaPulunVoima } from '../js/liviapuhe.js';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

const PUHEVOIMA_AVAIN = 'matkakirja-puhevoima';

/** Muistinvarainen localStorage yhdelle testille. */
function muistilla(alku = {}) {
  const arvot = new Map(Object.entries(alku));
  globalThis.localStorage = {
    getItem: (k) => (arvot.has(k) ? arvot.get(k) : null),
    setItem: (k, v) => arvot.set(k, String(v)),
    removeItem: (k) => arvot.delete(k),
  };
  return arvot;
}

test.afterEach(() => {
  delete globalThis.localStorage;
  delete globalThis.window;
});

/* ── 1. tallennus, oletukset ja rajat ────────────────────────────── */

test('kolme erillistä avainta ja kolme erillistä oletusta', () => {
  muistilla();
  assert.equal(TEHOSTEVOIMA_AVAIN, 'matkakirja-voima-tehosteet');
  assert.equal(PULUNVOIMA_AVAIN, 'matkakirja-voima-pulu');
  // Lukija on pelin entinen puhevoima: avainta ei saa vaihtaa, tai
  // pelaajan aiempi säätö katoaisi.
  assert.equal(puheVoima(), 0.9, 'lukijan oletus on entinen 0,9');
  assert.equal(tehosteVoima(), 1, 'tehosteiden oletus on täysi');
  assert.equal(pulunVoima(), 1, 'pulun oletus on täysi');
});

test('tallennus: jokainen liuku omaan avaimeensa, muut eivät liiku', () => {
  const arvot = muistilla();
  asetaTehosteVoima(0.5);
  assert.equal(arvot.get(TEHOSTEVOIMA_AVAIN), '0.5');
  assert.equal(tehosteVoima(), 0.5);
  assert.equal(pulunVoima(), 1, 'pulu ei liiku tehosteiden mukana');
  assert.equal(puheVoima(), 0.9, 'lukija ei liiku tehosteiden mukana');

  asetaPulunVoima(0.25);
  asetaPuheVoima(0.4);
  assert.equal(arvot.get(PULUNVOIMA_AVAIN), '0.25');
  assert.equal(arvot.get(PUHEVOIMA_AVAIN), '0.4');
  assert.equal(tehosteVoima(), 0.5, 'tehosteet pysyivät omassa arvossaan');
});

test('rajat 0–1: nolla on aito hiljaisuus, yli yhden leikkautuu', () => {
  muistilla();
  assert.equal(asetaTehosteVoima(0), 0, 'nolla tallentuu nollana');
  assert.equal(tehosteVoima(), 0, 'nolla ei palaudu oletukseen');
  assert.equal(asetaPulunVoima(2.5), 1, 'yli yhden leikkautuu ykköseen');
  assert.equal(asetaPuheVoima(-3), 0, 'alle nollan leikkautuu nollaan');
  assert.equal(puheVoima(), 0, 'lukijan saa vaiennettua liu\'ulla kokonaan');
});

test('kelvoton tai tyhjä arvo palaa oletukseen', () => {
  muistilla({
    [TEHOSTEVOIMA_AVAIN]: 'kovaa',
    [PULUNVOIMA_AVAIN]: '',
    [PUHEVOIMA_AVAIN]: 'NaN',
  });
  assert.equal(tehosteVoima(), 1);
  assert.equal(pulunVoima(), 1);
  assert.equal(puheVoima(), 0.9);
});

test('yksityinen selaus (localStorage heittää) ei kaada säätimiä', () => {
  globalThis.localStorage = {
    getItem: () => { throw new Error('SecurityError'); },
    setItem: () => { throw new Error('SecurityError'); },
    removeItem: () => { throw new Error('SecurityError'); },
  };
  assert.equal(tehosteVoima(), 1);
  assert.equal(pulunVoima(), 1);
  assert.equal(puheVoima(), 0.9);
  assert.doesNotThrow(() => asetaTehosteVoima(0.3));
});

test('muutos ilmoitetaan äänitilan tapahtumalla (valikko ja soittimet)', () => {
  muistilla();
  const tapahtumat = [];
  globalThis.document = {
    dispatchEvent: (e) => { tapahtumat.push(e?.type ?? 'tapahtuma'); return true; },
  };
  globalThis.CustomEvent = class { constructor(type) { this.type = type; } };
  try {
    asetaTehosteVoima(0.7);
    asetaPulunVoima(0.7);
    asetaPuheVoima(0.7);
    assert.deepEqual(tapahtumat, [
      'matkakirja-aanitila', 'matkakirja-aanitila', 'matkakirja-aanitila',
    ]);
  } finally {
    delete globalThis.document;
    delete globalThis.CustomEvent;
  }
});

/* ── 2. tehosteet: js/sound.js masterketju ───────────────────────── */

/** Tynkäkonteksti: sama kaava kuin tests/sound.test.mjs:ssä. */
function param(value = 0) {
  return {
    value,
    setValueAtTime() { return this; },
    exponentialRampToValueAtTime() { return this; },
    linearRampToValueAtTime() { return this; },
    setValueCurveAtTime() { return this; },
    cancelScheduledValues() { return this; },
  };
}

function tynkaKonteksti() {
  const ctx = {
    currentTime: 0,
    sampleRate: 44100,
    state: 'running',
    destination: { type: 'destination' },
    resume: () => Promise.resolve(),
  };
  const solmu = (lisa = {}) => Object.assign({
    connect(kohde) { return kohde; },
    disconnect() {},
    start() {},
    stop() {},
  }, lisa);
  ctx.createGain = () => solmu({ gain: param(1) });
  ctx.createOscillator = () => solmu({ frequency: param(440), type: 'sine' });
  ctx.createBufferSource = () => solmu({ buffer: null, playbackRate: param(1) });
  ctx.createBiquadFilter = () => solmu({ frequency: param(1000), Q: param(1), type: 'bandpass' });
  ctx.createConvolver = () => solmu({ buffer: null });
  ctx.createDynamicsCompressor = () => solmu({
    threshold: param(-24), knee: param(30), ratio: param(12), attack: param(0.003), release: param(0.25),
  });
  ctx.createBuffer = (ch, frames, rate) => ({
    length: frames,
    sampleRate: rate,
    numberOfChannels: ch,
    getChannelData: () => new Float32Array(frames),
  });
  return ctx;
}

test('tehostesäädin kertoo masterketjun gainin ja päivittyy heti', async () => {
  muistilla({ [TEHOSTEVOIMA_AVAIN]: '0.5' });
  const ctx = tynkaKonteksti();
  globalThis.window = { AudioContext: function () { return ctx; } };
  const { sfx } = await import(`../js/sound.js?kerta=${Math.random()}`);
  sfx.enabled = true;
  sfx.ensureContext();
  const perus = sfx.master.gain.value / 0.5;
  assert.ok(perus > 0, 'masterketju rakentui');
  assert.equal(sfx.master.gain.value, perus * 0.5, 'liuku kertoo perustason');

  // Sormen alla: sama ketju saa uuden arvon ilman uutta kontekstia.
  asetaTehosteVoima(1);
  sfx.paivitaTehosteVoima();
  assert.equal(sfx.master.gain.value, perus);
  asetaTehosteVoima(0);
  sfx.paivitaTehosteVoima();
  assert.equal(sfx.master.gain.value, 0, 'nolla vaientaa tehosteet kokonaan');
});

test('tehosteiden reitti on masterketju: yksi kerroin kaikille', () => {
  const sound = lue('../js/sound.js');
  assert.match(sound, /const MASTER_PERUSTASO = 0\.24;/);
  assert.equal((sound.match(/MASTER_PERUSTASO \* tehosteVoima\(\)/g) ?? []).length, 2,
    'perustaso × liuku sekä ketjua rakennettaessa että päivitettäessä');
  // Kaikki tehosteet — synteesi, äänitesiivut ja pulun tehosteet —
  // kulkevat bussin kautta masteriin, joten erillisiä kertoimia ei ole.
  assert.match(sound, /src\.connect\(g\)\.connect\(this\.bus\);/);
  assert.match(sound, /this\.dry\.connect\(this\.master\);/);
});

/* ── 3. pulun reitti: js/liviapuhe.js ────────────────────────────── */

test('pulun äänite soi pulun omalla liu\'ulla', () => {
  const puhe = lue('../js/liviapuhe.js');
  assert.match(puhe,
    /audio\.volume = Math\.max\(0, Math\.min\(1, pulunVoima\(\) \* LIVIAN_PERUSTASO \* vaimennus\)\);/);
  assert.doesNotMatch(puhe, /puheVoima/, 'lukijan liuku ei säädä pulua');
  assert.ok(LIVIAN_PERUSTASO > 0 && LIVIAN_PERUSTASO < 1);
  // Ilman soivaa repliikkiä päivitys on hiljainen ei-mitään.
  muistilla();
  assert.doesNotThrow(() => paivitaPulunVoima());
});

/* ── 4. liu'ut hammasratasvalikon Äänentasot-ryhmässä ───────────── */

/** Hammasratasvalikon sisältö index.html:stä. */
function ratasvalikko(html) {
  const alku = html.indexOf('id="kehittaja-valikko"');
  const loppu = html.indexOf('id="paavalikko"');
  assert.ok(alku > 0 && loppu > alku, 'hammasratasvalikkoa ei löydy');
  return html.slice(alku, loppu);
}

test('kolme liukua Äänentasot-ryhmässä: nimi, prosenttilukema ja kytkentä', () => {
  const html = lue('../index.html');
  const ratas = ratasvalikko(html);
  assert.match(ratas, /<p class="valikko-otsikko">Äänentasot<\/p>/,
    'Äänentasot-otsikko puuttuu rattaasta');
  for (const [tunnus, nimi] of [
    ['voima-tehosteet', 'Äänitehosteet'],
    ['voima-pulu', 'Pulun ääni'],
    ['voima-lukija', 'Lukija'],
  ]) {
    assert.match(ratas, new RegExp(`id="${tunnus}"[\\s\\S]{0,200}type="range"`),
      `${tunnus} puuttuu hammasratasvalikosta`);
    assert.match(ratas, new RegExp(`for="${tunnus}">${nimi}<`), `${tunnus}: label puuttuu`);
    assert.match(ratas, new RegExp(`id="${tunnus}-arvo"`), `${tunnus}: prosenttilukema puuttuu`);
  }
  assert.match(html, /min="0" max="100" step="1" value="90"/, 'lukijan oletus 90 %');
  // Taustamusiikin liuku tuli samaan ryhmään kehittäjän lohkosta.
  assert.match(ratas, /id="kehittaja-musiikki-liuku"/, 'taustamusiikin liuku puuttuu');

  const main = lue('../js/main.js');
  assert.match(main, /asetaTehosteVoima\(arvo\);/);
  assert.match(main, /sfx\.paivitaTehosteVoima\(\);/);
  assert.match(main, /asetaPulunVoima\(arvo\);/);
  assert.match(main, /paivitaPulunVoima\(\);/);
  assert.match(main, /asetaPuheVoima\(arvo\);/);
  assert.match(main, /paivitaSoivatLuennat\(\);/, 'soiva luenta seuraa lukijan liukua');
  assert.match(main, /liuku\.addEventListener\('input'/, 'säätö kuuluu sormen alla');
  assert.match(main, /\$\{prosentti\} %/, 'lukema näkyy prosentteina');

  const css = lue('../css/styles.css');
  assert.match(css, /\.paavalikko \.aanivoima \{/, 'liu\'uilla on dialogin rivien tyyli');
});

test('ratas näkyy pelaajalle: vain kehittäjäryhmät piiloutuvat', () => {
  const html = lue('../index.html');
  const ratas = ratasvalikko(html);
  // Äänentasot EIVÄT ole kehittäjäryhmässä: liu'ut ovat ryhmälaatikoiden välissä.
  const tyohuone = ratas.indexOf('id="kehittaja-tyohuone"');
  const vivut = ratas.indexOf('id="kehittaja-vivut"');
  const aanet = ratas.indexOf('id="aanivoimat"');
  assert.ok(tyohuone > 0 && vivut > 0 && aanet > 0, 'ryhmät puuttuvat rattaasta');
  assert.ok(tyohuone < aanet && aanet < vivut,
    'Äänentasot kuuluvat Työhuoneen ja kehittäjän vipujen väliin');
  assert.match(ratas, /id="kehittaja-tyohuone" class="kehittaja-ryhma" hidden/);
  assert.match(ratas, /id="kehittaja-vivut" class="kehittaja-ryhma" hidden/);

  const main = lue('../js/main.js');
  assert.match(main, /kehittajaValikkoKotelo\.hidden = false;/,
    'ratas ei saa enää kadota kehittäjätilan mukana');
  assert.match(main,
    /for \(const ryhma of kehittajaRyhmat\) ryhma\.hidden = !kehittajaTilaPaalla\(\);/,
    'kehittäjäryhmät piiloutuvat valikon sisällä');

  const css = lue('../css/styles.css');
  assert.match(css, /\.kehittaja-valikko \.kehittaja-ryhma \{/, 'ryhmällä on oma ladelma');
});

test('hampurilaisen Äänet-osioon jäivät vain päälle/pois-kytkimet', () => {
  const html = lue('../index.html');
  const alku = html.indexOf('id="paavalikko"');
  const paavalikko = html.slice(alku);
  for (const tunnus of ['voima-tehosteet', 'voima-pulu', 'voima-lukija', 'aanivoimat']) {
    assert.ok(!paavalikko.includes(`id="${tunnus}"`),
      `${tunnus} on yhä hampurilaisvalikossa`);
  }
  assert.match(paavalikko, /id="kertoja-valikko"/, 'kertojan kytkinrivit jäivät paikalleen');
});
