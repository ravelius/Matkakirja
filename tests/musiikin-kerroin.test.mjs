/*
 * ══════════════════════════════════════════════════════════════════
 * YKSI KERROIN KAIKELLE MUSIIKILLE — VARTIO
 * ══════════════════════════════════════════════════════════════════
 *
 * Omistajan vika 8.9.2026 klo 18.39 (iPhone, Vilnan kaupunkikartta,
 * maailma-pakki, kehittäjätila päällä), sanatarkasti: *"Taustamusiikki
 * on aivan liian kovalla, eikä rattaan säädin vaikuta sen tasoon
 * ollenkaan."*
 *
 * Vika oli kahtaalla, ja tämä tiedosto vartioi molempia:
 *
 *  1. TASO. Musiikkipaletti vaihdettiin Lyriaan (js/media.js
 *     MUSIIKIN_PAATE) mutta soittotasot jäivät vanhoiksi, ja uudet
 *     masterit ovat 16,8 dB kovempia. Perustaso asuu nyt YHDESSÄ
 *     vakiossa (js/musiikkivalitsin.js MUSIIKIN_PERUSTASO), jotta sama
 *     virhe ei toistu paletin seuraavassa vaihdossa.
 *  2. SÄÄDIN. Osa musiikkireiteistä luki kehittäjän kerrointa, osa ei
 *     lukenut sitä lainkaan (visamusiikki, aarreaihe, kehittäjän
 *     varakuvio) — säädin näytti siis toimivan sen mukaan, mikä raita
 *     sattui soimaan. Kaikki reitit kysyvät nyt samaa funktiota
 *     (musiikinKerroin) ja päivittävät SOIVAN raidan heti
 *     (kuunteleMusiikinKerrointa).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  MUSIIKIN_PERUSTASO, kuunteleMusiikinKerrointa, musiikinKerroin, nollaaMusiikkivalitsin,
} from '../js/musiikkivalitsin.js';
import {
  KEHITTAJAN_VOIMA_OLETUS, asetaKehittajanKerroin,
} from '../js/kehittajan-voimat.js';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

/* Jokainen musiikkia soittava tiedosto ja se, mitä siltä vaaditaan. */
const REITIT = {
  '../js/ambience-stream.js': 'pohjaraita, kaupunki- ja aluekappaleet, visamusiikki',
  '../js/siirtymamusiikki.js': 'siirtymä- ja linssiraidat sekä kehittäjän varakuvio',
  '../js/ui.js': 'aarteen paljastusaihe',
};

/* ── 1. kerroin ja perustaso ─────────────────────────────────────── */

test('musiikin kerroin on oletuksena 1 ja perustaso yksi vakio', () => {
  assert.equal(KEHITTAJAN_VOIMA_OLETUS.musiikki, 1,
    'musiikin oletuskerroin ei ole 1 — hyväksytty taso kuuluu perustasoon, ei kertoimeen');
  assert.equal(musiikinKerroin(), 1);
  assert.equal(typeof MUSIIKIN_PERUSTASO, 'number');
  assert.ok(MUSIIKIN_PERUSTASO > 0 && MUSIIKIN_PERUSTASO < 0.05,
    `perustaso ${MUSIIKIN_PERUSTASO} ei ole taustamusiikin suuruusluokkaa`);
});

test('kuuntelija saa uuden kertoimen heti', () => {
  const kuultu = [];
  const irti = kuunteleMusiikinKerrointa((v) => kuultu.push(v));
  asetaKehittajanKerroin('musiikki', 0.5);
  asetaKehittajanKerroin('musiikki', 1);
  irti();
  assert.deepEqual(kuultu, [0.5, 1]);
});

/* ── 2. lähdekoodivartio: ei rinnakkaisia kertoimia ──────────────── */

test('jokainen musiikkireitti lukee saman kertoimen', () => {
  for (const [tiedosto, mita] of Object.entries(REITIT)) {
    const koodi = lue(tiedosto);
    assert.match(koodi, /musiikinKerroin\(\)/,
      `${tiedosto} (${mita}) ei lue musiikin yhteistä kerrointa`);
  }
});

test('musiikkireitti ei lue kehittäjän kerrointa ohi valitsimen', () => {
  for (const tiedosto of Object.keys(REITIT)) {
    assert.doesNotMatch(lue(tiedosto), /kehittajanKerroin\('musiikki'\)/,
      `${tiedosto}: rinnakkainen kerroin — musiikin kerroin tulee vain musiikinKerroin():stä`);
  }
  // Ainoa paikka, joka saa kysyä kehittäjän säädintä musiikin nimissä.
  assert.match(lue('../js/musiikkivalitsin.js'), /kehittajanKerroin\('musiikki'\)/);
});

test('soivat musiikkireitit päivittyvät ilman raidanvaihtoa', () => {
  for (const tiedosto of Object.keys(REITIT)) {
    assert.match(lue(tiedosto), /kuunteleMusiikinKerrointa\(/,
      `${tiedosto}: soiva raita ei seuraa säädintä — säätö kuuluisi vasta seuraavassa raidassa`);
  }
});

test('perustaso on yksi luku, ei kolme', () => {
  const virta = lue('../js/ambience-stream.js');
  assert.match(virta, /POHJA_VOIMA = MUSIIKIN_PERUSTASO/,
    'pohjaraidalla on taas oma lukunsa');
  assert.match(virta, /MUSIIKKI_VOIMA = MUSIIKIN_PERUSTASO \* [\d.]+/,
    'visamusiikilla on taas oma lukunsa');
  assert.match(lue('../js/ui.js'), /AARRE_MUSIIKIN_VOIMA = MUSIIKIN_PERUSTASO \* [\d.]+/,
    'aarreaiheella on taas oma lukunsa');
});

test('väistö kertautuu kertoimen kanssa eikä ylikirjoita sitä', () => {
  const virta = lue('../js/ambience-stream.js');
  // Sama kaava lasketaan aina uudestaan: perustaso × väistö × kerroin ×
  // avaus. Luennan hiljennys (js/luenta.js taustaHiljennaLuennat →
  // ajaVaisto) menee siis kertoimen LÄPI eikä sen ohi, ja luennan
  // jälkeen taso palaa säädettyyn lukemaan.
  assert.match(virta, /pohjaMusiikinTaso = \(kerroin = voimassaVaisto\(\)\) => POHJA_VOIMA \* kerroin\s*\*\s*musiikinKerroin\(\)/);
  assert.match(virta, /haivyta\(pohja, pohjaMusiikinTaso\(kerroin\), undefined, kesto\)/,
    'väistö ei aja pohjaraitaa saman kaavan läpi');
  assert.match(lue('../js/siirtymamusiikki.js'),
    /raidanTaso = \(laji\) => \(RAIDAT\[laji\]\?\.voima \?\? 0\) \* lajinVaisto\(laji\) \* ajonHimmennys\s*\*\s*musiikinKerroin\(\)/);
});

/* ── 3. peli: säädin muuttaa soivan raidan tasoa heti ────────────── */

/** Tynkä <audio>: sama malli kuin muissa äänitesteissä. */
function tekoAudio(rekisteri) {
  return class {
    constructor(src) {
      this._src = src ?? null;
      this.alkuSrc = src ?? '';
      this.volume = 1;
      this.paused = true;
      this.loop = false;
      this.preload = '';
      this.duration = 180;
      this.currentTime = 0;
      this.readyState = 4;
      this.kuuntelijat = new Map();
      rekisteri.push(this);
    }

    get src() { return this._src; }

    /* Musiikkisoitin saa srcinsä vasta konstruktorin jälkeen. */
    set src(v) { this._src = v; if (!this.alkuSrc) this.alkuSrc = v ?? ''; }

    addEventListener(nimi, fn) {
      if (!this.kuuntelijat.has(nimi)) this.kuuntelijat.set(nimi, []);
      this.kuuntelijat.get(nimi).push(fn);
    }

    removeEventListener() {}
    getAttribute() { return this._src; }
    removeAttribute() { this._src = null; }
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

async function lataaAmbienssi() {
  const soittimet = [];
  const kello = { nyt: 0, jono: [] };
  globalThis.Audio = tekoAudio(soittimet);
  globalThis.requestAnimationFrame = (fn) => { kello.jono.push(fn); return kello.jono.length; };
  globalThis.performance = { now: () => kello.nyt };
  globalThis.window = { AudioContext: null };
  globalThis.localStorage = { getItem: () => null, setItem: () => {} };
  // Vanhat kopiot pois kuuntelijoista ennen tuoreen tuontia.
  nollaaMusiikkivalitsin();
  const mod = await import(`../js/ambience-stream.js?kerroin=${Math.random()}`);
  const { sfx } = await import('../js/sound.js');
  sfx.enabled = true;
  mod.nollaaPohjaMusiikki?.();
  const musiikki = () => soittimet.filter((a) => /musa-/.test(a.alkuSrc)).at(-1);
  return { mod, kello, musiikki };
}

test('säädin muuttaa soivan raidan tasoa heti ja väistö kertautuu', async () => {
  asetaKehittajanKerroin('musiikki', 1);
  const s = await lataaAmbienssi();
  s.mod.playPlaceAmbience('vilna', 'kaupunki', 'maailma');
  await Promise.resolve();
  await Promise.resolve();
  await ajaHaivytykset(s.kello);

  const raita = s.musiikki();
  assert.ok(raita, 'yhtään musiikkiraitaa ei lähtenyt soimaan');
  assert.ok(Math.abs(raita.volume - MUSIIKIN_PERUSTASO) < 1e-6,
    `perustaso ei mennyt perille: ${raita.volume} ≠ ${MUSIIKIN_PERUSTASO}`);

  // Säädin alas: SAMA soiva soitin hiljenee, uutta ei synny.
  asetaKehittajanKerroin('musiikki', 0.5);
  await ajaHaivytykset(s.kello);
  assert.equal(s.musiikki(), raita, 'säätö vaihtoi raidan sen sijaan että olisi säätänyt sitä');
  assert.ok(Math.abs(raita.volume - MUSIIKIN_PERUSTASO * 0.5) < 1e-6,
    `säädin ei vaikuttanut soivaan raitaan: ${raita.volume}`);

  // Luennan väistö kertautuu kertoimen kanssa eikä ylikirjoita sitä.
  s.mod.vaimennaTausta(0.25);
  await ajaHaivytykset(s.kello);
  assert.ok(Math.abs(raita.volume - MUSIIKIN_PERUSTASO * 0.5 * 0.25) < 1e-6,
    `väistö ohitti kertoimen: ${raita.volume}`);

  // Luenta ohi: taso palaa SÄÄDETTYYN lukemaan, ei alkuperäiseen.
  s.mod.palautaTausta();
  await ajaHaivytykset(s.kello);
  assert.ok(Math.abs(raita.volume - MUSIIKIN_PERUSTASO * 0.5) < 1e-6,
    `väistön purku ei palauttanut säädettyä tasoa: ${raita.volume}`);

  asetaKehittajanKerroin('musiikki', 1);
  await ajaHaivytykset(s.kello);
  assert.ok(Math.abs(raita.volume - MUSIIKIN_PERUSTASO) < 1e-6);
});

/* ── 4. ohje ─────────────────────────────────────────────────────── */

test('aanet.md kertoo musiikin perustasosta ja yhdestä kertoimesta', () => {
  const ohje = lue('../docs/moduulit/aanet.md');
  assert.match(ohje, /^## Musiikin taso ja säädin/m, 'osio puuttuu docs/moduulit/aanet.md:stä');
  assert.match(ohje, /MUSIIKIN_PERUSTASO/);
  assert.match(ohje, /musiikinKerroin/);
  // Rivinvaihto saa osua omistajan lauseen keskelle (markdownin taitto).
  assert.match(ohje, /aivan liian\s+kovalla/, 'omistajan lainaus puuttuu ohjeesta');
});
