/*
 * KAUPUNKIRAIDAT: vaihtuuko kappale saapumisessa, palaako pohjavire
 * lähdössä, ja pitävätkö työkalun ja pelin nimet yhtä.
 *
 * Omistajan tilaus 5.9.2026 klo 00.35, sanatarkasti: *"ateenaan
 * saavuttaessa voisi vaihtua kappale. generoi sinne oma musiikki."*
 *
 * Neljä asiaa, joista jokainen menisi rikki HILJAA — puuttuva tai
 * väärä musiikki ei kaada peliä eikä näy lokissa, se vain jää
 * soimatta:
 *
 *   1. NIMIEN TÄSMÄYS. Työkalu kirjoittaa tiedoston
 *      (musa-kaupunki-ateena.mp3) ja peli hakee polun (musaPolku).
 *      Jos ne eriytyvät, generointi maksaa ja tuottaa raidan, jota
 *      peli ei koskaan pyydä.
 *   2. VAIHTO JA PALUU. Kaupunkiraita on pohjavireen sijainen: sen on
 *      alettava saavuttaessa ja väistyttävä lähdettäessä. Jompikumpi
 *      suunta voi jäädä tekemättä ilman että mikään näkyy.
 *   3. PUUTTUVA RAITA. Taulukko on mainissa ennen kuin mp3 on
 *      generoitu — juuri niin on tarkoituskin. Silloin pohjavireen on
 *      jatkettava, ei hiljaisuuden.
 *   4. KYTKIN. Kaupunkiraidat kulkevat saman MUSIIKIN_PAATE-kytkimen
 *      läpi kuin paletti; käsin kirjoitettu polku ohittaisi sen.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import * as lyria from '../tools/lyria.mjs';
import { KAUPUNKIEN_RAIDAT, RAIDAT } from '../tools/generoi-musiikki.mjs';

const lue = (polku) => readFileSync(new URL(polku, import.meta.url), 'utf8');

const TYONKULKU = lue('../.github/workflows/generoi-musiikki.yml');
const OHJE = lue('../docs/moduulit/aanet.md');
const LAUDAT = ['../js/packs/europe.js', '../js/packs/maailma.js'].map(lue).join('\n');

/* ── ympäristö selainmoduuleille ─────────────────────────────────── */

/** Tynkä <audio>: kirjaa soitot ja antaa ajan liikkua käsin. */
function tekoAudio(rekisteri) {
  return class {
    constructor(src) {
      this.src = src;
      // Alkuperäinen osoite jää talteen, koska removeAttribute pyyhkii
      // srcin: ilman tätä purettua soitinta ei voisi enää tunnistaa.
      this.alkuSrc = src ?? '';
      this.volume = 1;
      this.paused = true;
      this.loop = false;
      this.preload = '';
      this.duration = 180;
      this.currentTime = 0;
      this.kuuntelijat = new Map();
      rekisteri.push(this);
    }

    addEventListener(nimi, fn) {
      if (!this.kuuntelijat.has(nimi)) this.kuuntelijat.set(nimi, []);
      this.kuuntelijat.get(nimi).push(fn);
    }

    removeEventListener() {}
    getAttribute() { return this.src; }
    removeAttribute() { this.src = null; }
    load() {}
    pause() { this.paused = true; }
    play() { this.paused = false; return Promise.resolve(); }
    laukaise(nimi) { for (const fn of this.kuuntelijat.get(nimi) ?? []) fn(); }
  };
}

/** Ajaa kaikki jonossa olevat rAF-askeleet loppuun asti. */
async function ajaHaivytykset(kello) {
  for (let i = 0; i < 400; i += 1) {
    kello.nyt += 200;
    const jono = kello.jono.splice(0);
    if (!jono.length) break;
    for (const fn of jono) fn(kello.nyt);
    await Promise.resolve();
  }
}

/**
 * Tuore kopio ambienssimoduulista tyngillä. Pohjavireen soittimet
 * tunnistuvat tiedostonimestä (musa-*), kuten muissakin äänitesteissä.
 */
async function lataaAmbienssi() {
  const soittimet = [];
  const kello = { nyt: 0, jono: [] };
  globalThis.Audio = tekoAudio(soittimet);
  globalThis.requestAnimationFrame = (fn) => { kello.jono.push(fn); return kello.jono.length; };
  globalThis.performance = { now: () => kello.nyt };
  globalThis.window = { AudioContext: null };
  globalThis.localStorage = { getItem: () => null, setItem: () => {} };
  const mod = await import(`../js/ambience-stream.js?kaupunki=${Math.random()}`);
  const { sfx } = await import('../js/sound.js');
  sfx.enabled = true;
  mod.nollaaPohjaMusiikki?.();
  const musiikit = () => soittimet.filter((a) => /musa-/.test(a.alkuSrc));
  return { mod, soittimet, kello, musiikit };
}

const { MUSIIKIN_PAATE, musaPolku } = await import('../js/media.js');
const { KAUPUNKIRAIDAT, kaupunginMusiikki, kaupunkiraidanTunnus } = await import('../js/kaupunkimusiikki.js');

/** Saapuu paikkaan ja ajaa häivytykset loppuun. */
async function saavu(s, cityId, tyyppi = 'kaupunki') {
  s.mod.playPlaceAmbience(cityId, tyyppi, 'europe');
  await Promise.resolve();
  await Promise.resolve();
  await ajaHaivytykset(s.kello);
}

/* ── 1. taulukot ja nimet ────────────────────────────────────────── */

test('Ateenalla on oma raita, ja avain on laudan kaupungin id', () => {
  assert.ok(Object.hasOwn(KAUPUNKIRAIDAT, 'ateena'),
    'omistajan tilaama Ateenan raita puuttuu taulukosta');
  for (const id of Object.keys(KAUPUNKIRAIDAT)) {
    assert.ok(LAUDAT.includes(`id: '${id}'`),
      `${id}: avain ei ole minkään laudan kaupungin id — raita ei soisi koskaan`);
    assert.ok(KAUPUNKIRAIDAT[id].kuvaus, `${id}: kuvaus puuttuu (näkyy Musiikki-lehdessä)`);
  }
});

test('työkalun ja pelin nimet täsmäävät kaupunki kaupungilta', () => {
  assert.deepEqual(KAUPUNKIEN_RAIDAT, Object.keys(KAUPUNKIRAIDAT),
    'tools/generoi-musiikki.mjs ja js/kaupunkimusiikki.js tuntevat eri kaupungit');
  for (const id of KAUPUNKIEN_RAIDAT) {
    const raita = RAIDAT[id];
    const tunnus = kaupunkiraidanTunnus(id);
    assert.equal(raita.kaupunki, id, `${id}: työkalun kaupunki-kenttä ei vastaa avainta`);
    assert.equal(raita.tiedosto, `${tunnus}.mp3`,
      `${id}: työkalu kirjoittaisi tiedoston, jota peli ei hae`);
    assert.equal(lyria.raidanTiedosto(raita, 'lyria'), `${tunnus}-lyria.mp3`);
    assert.equal(kaupunginMusiikki(id), musaPolku(tunnus));
    assert.equal(kaupunginMusiikki(id), `assets/audio/${tunnus}${MUSIIKIN_PAATE}.mp3`,
      `${id}: polku ohittaa MUSIIKIN_PAATE-kytkimen`);
  }
});

test('tuntematon paikka ei saa raitaa', () => {
  for (const paikka of ['lontoo', 'jalkamatka', 'merimatka', 'lentomatka', 'etusivu', null, undefined]) {
    assert.equal(kaupunginMusiikki(paikka), null, `${paikka}: sai raidan tyhjästä`);
  }
  // Object.hasOwn eikä `in`: prototyypin kenttä ei saa vastata raitana.
  assert.equal(kaupunginMusiikki('toString'), null);
});

test('kaupunkiraidan polkua ei kirjoiteta käsin missään', () => {
  for (const tiedosto of ['js/kaupunkimusiikki.js', 'js/ambience-stream.js',
    'js/tyohuone-musiikki.js']) {
    const rivit = lue(`../${tiedosto}`).split('\n')
      .filter((r) => /'[^']*assets\/audio\/musa-[^']*'/.test(r));
    assert.deepEqual(rivit, [],
      `${tiedosto}: musiikin polku kirjoitettu käsin — käytä js/media.js musaPolku()`);
  }
});

/* ── 2. prompti ja työnkulku ─────────────────────────────────────── */

test('Ateenan prompti on omistajan tilaus ja mitat kuten looppiraidalla', () => {
  const raita = RAIDAT.ateena;
  assert.equal(raita.laji, 'kaupunki');
  assert.equal(raita.looppi, true);
  assert.ok(raita.kesto >= 60000 && raita.kesto <= 90000,
    `kaupunkiraidan kesto 60–90 s, nyt ${raita.kesto / 1000} s`);
  for (const sana of [/Athens/, /bouzouki/, /guitar/i, /No singing/i, /Seamless loop/,
    /UNDER the ambient soundscape/]) {
    assert.match(raita.prompt, sana, 'omistajan tilaus kadonnut promptista');
  }
  assert.match(raita.prompt, /No modern synths/, 'yhteinen tyylilause puuttuu');
});

test('työnkulku osaa pyytää yhden kaupungin tai kaikki', () => {
  assert.match(TYONKULKU, /kaupungit/, 'raidat-inputin ohje ei tunne kaupunkiryhmää');
  assert.match(TYONKULKU, /ateena/, 'työnkulku ei mainitse Ateenan raitaa');
});

test('ohje kertoo kaupunkiraidoista omassa osiossaan', () => {
  assert.match(OHJE, /^## Kaupunkiraidat/m, 'docs/moduulit/aanet.md: osio puuttuu');
  // Rivinvaihto saa osua omistajan lauseen keskelle (markdownin taitto).
  assert.match(OHJE, /ateenaan saavuttaessa voisi\s+vaihtua kappale/,
    'omistajan sanat puuttuvat ohjeesta');
  assert.match(OHJE, /musa-kaupunki-<kaupungin id>\.mp3/);
});

/* ── 3. peli: vaihto, paluu ja puuttuva raita ────────────────────── */

test('saapuminen Ateenaan vaihtaa pohjavireen kaupungin raitaan', async () => {
  const s = await lataaAmbienssi();
  await saavu(s, 'lontoo');
  assert.equal(s.mod.soivaPohjaMusiikki(), musaPolku('musa-pohja'),
    'pohjavire ei lähtenyt soimaan');
  const pohja = s.musiikit()[0];
  assert.ok(pohja.volume > 0, 'pohjavire jäi hiljaiseksi');

  await saavu(s, 'ateena');
  assert.equal(s.mod.soivaPohjaMusiikki(), kaupunginMusiikki('ateena'),
    'Ateenan oma kappale ei alkanut');
  const kaupunki = s.musiikit().at(-1);
  assert.notEqual(kaupunki, pohja, 'kaupunkiraita ei saanut omaa soitintaan');
  assert.ok(kaupunki.volume > 0, 'kaupunkiraita jäi hiljaiseksi');
  assert.equal(kaupunki.loop, true, 'kaupunkiraidan pitää kiertää');
  // Ristihäivytys: väistyvä puoli vaikenee ja vapautuu.
  assert.equal(pohja.paused, true, 'pohjavire jäi soimaan kaupunkiraidan alle');
});

test('sama kaupunki uudestaan ei aloita raitaa alusta', async () => {
  const s = await lataaAmbienssi();
  await saavu(s, 'ateena');
  const maara = s.musiikit().length;
  // syncAmbience kutsuu playPlaceAmbiencea joka piirrolla.
  await saavu(s, 'ateena');
  await saavu(s, 'ateena');
  assert.equal(s.musiikit().length, maara,
    'sama kaupunki rakensi uuden soittimen — raita pomppisi alkuun joka piirrolla');
});

test('kaupungista lähtiessä pohjavire palaa', async () => {
  const s = await lataaAmbienssi();
  await saavu(s, 'ateena');
  const kaupunki = s.musiikit().at(-1);
  // Jalkamatka on matkan oma paikka: kaupunki jäi taakse.
  await saavu(s, 'jalkamatka', 'maaseutu');
  assert.equal(s.mod.soivaPohjaMusiikki(), musaPolku('musa-pohja'),
    'pohjavire ei palannut kaupungista lähdettäessä');
  assert.equal(kaupunki.paused, true, 'kaupunkiraita jäi soimaan kaupungin ulkopuolelle');

  // Ja toiseen kaupunkiin saavuttaessa se pysyy pohjavireenä.
  await saavu(s, 'sofia');
  assert.equal(s.mod.soivaPohjaMusiikki(), musaPolku('musa-pohja'));
});

test('puuttuva kaupunkiraita ei kaada eikä hiljennä: pohjavire jatkaa', async () => {
  const s = await lataaAmbienssi();
  await saavu(s, 'ateena');
  const kaupunki = s.musiikit().at(-1);
  // Ämpäri ei vastaa, eikä repon polku myöskään: kaksi virhettä.
  kaupunki.laukaise('error');
  await Promise.resolve();
  kaupunki.laukaise('error');
  await Promise.resolve();
  await ajaHaivytykset(s.kello);
  assert.equal(s.mod.soivaPohjaMusiikki(), musaPolku('musa-pohja'),
    'puuttuva kaupunkiraita jätti pelin hiljaiseksi');

  // Sama kaupunki uudestaan ei enää yritä puuttuvaa raitaa.
  const maara = s.musiikit().length;
  await saavu(s, 'ateena');
  assert.equal(s.musiikit().length, maara,
    'puuttuvaa raitaa yritettiin uudestaan — 404 jokaisesta piirrosta');
  assert.equal(s.mod.soivaPohjaMusiikki(), musaPolku('musa-pohja'));
});

test('taustaäänten kytkin sammuttaa kaupunkiraidan kuten pohjavireen', async () => {
  const s = await lataaAmbienssi();
  await saavu(s, 'ateena');
  const kaupunki = s.musiikit().at(-1);
  s.mod.stopPohjaMusiikki();
  await ajaHaivytykset(s.kello);
  assert.equal(s.mod.soivaPohjaMusiikki(), null);
  assert.equal(kaupunki.paused, true, 'kaupunkiraita jäi soimaan sammutuksen jälkeen');
});

/* ── 4. kuuntelulehti ────────────────────────────────────────────── */

test('Musiikki-lehdessä on kaupunkiraidoille oma osasto', async () => {
  const { MUSIIKKISIVUN_RAIDAT, musiikkiSivut } = await import('../js/tyohuone-musiikki.js');
  const rivit = MUSIIKKISIVUN_RAIDAT.filter((r) => r.osasto === 'kaupunki');
  assert.deepEqual(rivit.map((r) => r.nimi), Object.keys(KAUPUNKIRAIDAT),
    'lehden kaupunkirivit eivät vastaa js/kaupunkimusiikki.js:n taulukkoa');
  for (const rivi of rivit) {
    assert.equal(rivi.oma, kaupunginMusiikki(rivi.nimi),
      `${rivi.id}: lehti kuuntelisi eri tiedostoa kuin peli soittaa`);
  }
  // Osasto piirretään jollakin lehden sivulla, muuten rivit jäisivät
  // näkymättömiin.
  const sivut = musiikkiSivut().map((s) => s.rakenna.toString());
  assert.ok(sivut.some((koodi) => koodi.includes("'kaupunki'")),
    'kaupunkiosastoa ei piirretä millään sivulla');
});
