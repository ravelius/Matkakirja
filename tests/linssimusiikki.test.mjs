/*
 * MUSIIKIN LAJITAULUKKO (js/siirtymamusiikki.js RAIDAT).
 *
 * Omistajan tilaus 2.9.2026 ilta: *"Generoi linssille oma musiikki"*.
 * Aikajanalinssin raita lisättiin samaan taulukkoon kuin siirtymien
 * kolme raitaa, ja taulukko sai kentät `ryhma`, `nousuMs` ja
 * `laskuMs`. Yleistys on juuri sen kokoinen riski, jota testi
 * vartioi: LAJI SAA HILJAA VÄÄRÄT MITAT eikä mikään kaadu.
 * Väärä feidaus tai voima ei näy DOMissa, ei kaada savuketta eikä
 * tuota virhettä lokiin — se vain kuulostaa väärältä omistajan
 * korvassa, ja vasta seuraavassa pelitestissä.
 *
 * Siksi nämä testit ajavat oikeaa moduulia tynkäselaimessa ja
 * mittaavat sen, mikä kuuluu: mistä osoitteesta raita haetaan, mille
 * tasolle se nousee, kuinka kauan nousu kestää ja mitä himmennys
 * tekee. Sama tapa kuin tests/ambienssi.test.mjs:ssä (kertoimien
 * lukeminen lähdekoodista ei todista soivasta ketjusta mitään).
 *
 * Työkalun puoli — tiedostonimet, loopin mitat ja "kaikki"-valinnan
 * rajaus — on tests/siirtymaraidat.test.mjs:ssä.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

/* ── tynkäselain ──────────────────────────────────────────────────── */

/*
 * Oma kehysjono. Feidaus etenee requestAnimationFramen aikaleimalla,
 * joten kellon on oltava testin käsissä: nousun kesto MITATAAN
 * ajamalla kehyksiä, ei lukemalla vakiota.
 */
let rafJono = [];
let rafKello = 0;
globalThis.requestAnimationFrame = (fn) => { rafJono.push(fn); return rafJono.length; };

/** Vie kelloa `ms` millisekuntia `askel`-kokoisin kehyksin. */
function ajaKehykset(ms, askel = 50) {
  for (let kulunut = 0; kulunut < ms; kulunut += askel) {
    rafKello += askel;
    for (const fn of rafJono.splice(0, rafJono.length)) fn(rafKello);
  }
}

/**
 * Ajaa kehyksiä, kunnes soittimen taso on `kohde`, ja palauttaa siihen
 * kuluneen ajan. Liuku aloittaa ajanoton ensimmäisestä kehyksestä
 * (siinä t = 0), joten mittaus alkaa vasta toisesta — sama pieni
 * porras kuin oikeassa selaimessa.
 */
function feidauksenKesto(audio, kohde, { askel = 10, katto = 4000 } = {}) {
  for (let kulunut = 0; kulunut <= katto; kulunut += askel) {
    rafKello += askel;
    for (const fn of rafJono.splice(0, rafJono.length)) fn(rafKello);
    if (Math.abs(audio.volume - kohde) < 1e-9) return kulunut;
  }
  return null;
}

/** Päästää lupausketjut läpi ilman ajastimia (audio.play on lupaus). */
async function mikrotehtavat(kierroksia = 8) {
  for (let i = 0; i < kierroksia; i += 1) await Promise.resolve();
}

globalThis.document = {
  addEventListener() {}, removeEventListener() {}, dispatchEvent() {}, getElementById: () => null,
};
globalThis.localStorage = { getItem: () => null, setItem() {}, removeItem() {} };
globalThis.fetch = () => Promise.reject(new Error('ei verkkoa testissä'));
globalThis.window = { AudioContext: function Ctx() { return {}; } };

let soittimet = [];

/** Soitin tynkänä: vain se, mitä siirtymämusiikki oikeasti käyttää. */
class TynkaAudio {
  constructor(src) {
    this.src = src;
    this.alkuSrc = src;
    this.volume = 0;
    this.loop = false;
    this.preload = '';
    this.paused = true;
    this.kuuntelijat = new Map();
    soittimet.push(this);
  }

  play() { this.paused = false; return Promise.resolve(); }

  pause() { this.paused = true; }

  load() {}

  addEventListener(laji, fn) {
    if (!this.kuuntelijat.has(laji)) this.kuuntelijat.set(laji, new Set());
    this.kuuntelijat.get(laji).add(fn);
  }

  removeAttribute(nimi) { if (nimi === 'src') this.src = null; }

  /** Verkko petti: sama tapahtuma kuin selaimen 404. */
  laukaiseVirhe() {
    for (const fn of [...(this.kuuntelijat.get('error') ?? [])]) fn({ type: 'error' });
  }
}
globalThis.Audio = TynkaAudio;

const musiikki = await import('../js/siirtymamusiikki.js');
const {
  MUSIIKKILAJIT, SIIRTYMALAJIT, aloitaSiirtymamusiikki, himmennaSiirtymamusiikki,
  lopetaSiirtymamusiikki, nollaaSiirtymamusiikki, siirtymamusiikinRivi, siirtymamusiikkiSoi,
} = musiikki;

/** Puhdas pöytä joka testille: ei soivaa raitaa, ei istunnon lippuja. */
async function pystyta() {
  nollaaSiirtymamusiikki();
  soittimet = [];
  rafJono = [];
  await mikrotehtavat();
}

/** Käynnistää lajin ja ajaa kehykset, jotta feidaus ehtii tapahtua. */
async function soita(laji, ms = 2000) {
  aloitaSiirtymamusiikki(laji);
  await mikrotehtavat();
  ajaKehykset(ms);
  return soittimet[soittimet.length - 1];
}

/* ── 1. taulukko ─────────────────────────────────────────────────── */

test('lajitaulukossa ovat siirtymien kolme raitaa ja linssin oma', async () => {
  await pystyta();
  assert.deepEqual(SIIRTYMALAJIT, ['jalan', 'laiva', 'lento'],
    'siirtymälajit eivät saa muuttua linssiraidan lisäämisestä');
  assert.deepEqual(MUSIIKKILAJIT, ['jalan', 'laiva', 'lento', 'keksinnot']);
  // Kehittäjävalikon rivi näyttää kaikki lajit, ei vain siirtymiä.
  assert.equal(siirtymamusiikinRivi(), 'jalan ?  laiva ?  lento ?  keksinnot ?');
});

test('jokainen laji hakee oman tiedostonsa ämpärin aanet-kansiosta', async () => {
  const odotetut = {
    jalan: 'aanet/siirtyma-jalan.mp3',
    laiva: 'aanet/siirtyma-laiva.mp3',
    lento: 'aanet/siirtyma-lento.mp3',
    keksinnot: 'aanet/linssi-keksinnot.mp3',
  };
  for (const laji of MUSIIKKILAJIT) {
    await pystyta();
    const audio = await soita(laji, 100);
    assert.ok(audio.alkuSrc.endsWith(odotetut[laji]), `${laji}: ${audio.alkuSrc}`);
    assert.ok(audio.alkuSrc.startsWith('https://'), `${laji}: ämpärin polku ensin`);
    assert.equal(audio.loop, true, `${laji}: looppi päällä`);
    assert.equal(siirtymamusiikkiSoi(), laji);
  }
});

/* ── 2. voima ja feidaukset ──────────────────────────────────────── */

test('linssiraita nousee voimaan 0,11 kuten laiva, lento jää matalammaksi', async () => {
  const voimat = {};
  for (const laji of MUSIIKKILAJIT) {
    await pystyta();
    voimat[laji] = (await soita(laji)).volume;
  }
  assert.equal(voimat.jalan, 0.11);
  assert.equal(voimat.laiva, 0.11);
  assert.equal(voimat.lento, 0.06);
  assert.equal(voimat.keksinnot, 0.11);
});

test('linssiraita feidaa sisään 600 ms, siirtymä entiseen tapaan 300 ms', async () => {
  /*
   * KESTO MITATAAN, ei lueta vakiosta: aika ensimmäisestä kehyksestä
   * siihen, kun taso on perillä. Näin väärä oletusfeidaus (300 ms
   * myös linssille) jää kiinni tässä eikä vasta kuulokokeessa.
   */
  await pystyta();
  aloitaSiirtymamusiikki('keksinnot');
  await mikrotehtavat();
  const linssi = feidauksenKesto(soittimet.at(-1), 0.11);
  assert.ok(linssi !== null && Math.abs(linssi - 600) <= 20,
    `linssin nousun pitäisi kestää 600 ms — kesti ${linssi} ms`);

  await pystyta();
  aloitaSiirtymamusiikki('jalan');
  await mikrotehtavat();
  const siirtyma = feidauksenKesto(soittimet.at(-1), 0.11);
  assert.ok(siirtyma !== null && Math.abs(siirtyma - 300) <= 20,
    `siirtymän nousun pitäisi kestää 300 ms — kesti ${siirtyma} ms`);
});

test('linssiraita feidaa ulos 800 ms ja vapauttaa soittimen vasta lopuksi', async () => {
  await pystyta();
  const audio = await soita('keksinnot');
  lopetaSiirtymamusiikki();
  ajaKehykset(400, 50);
  const puolivalissa = audio.volume;
  assert.ok(puolivalissa > 0.02 && puolivalissa < 0.09,
    `800 ms:n laskun puolivälissä pitäisi olla n. 0,055 — oli ${puolivalissa}`);
  assert.equal(audio.src, audio.alkuSrc, 'soitinta ei saa vapauttaa kesken feidauksen');
  ajaKehykset(500, 50);
  assert.equal(audio.volume, 0);
  assert.equal(audio.src, null, 'feidauksen jälkeen soitin vapautetaan');
  assert.equal(siirtymamusiikkiSoi(), null);
});

test('siirtymäraita feidaa ulos entiseen tapaan 500 ms', async () => {
  // Vartija sille, ettei lajikohtainen feidaus muuttanut siirtymiä.
  await pystyta();
  const audio = await soita('laiva');
  lopetaSiirtymamusiikki();
  const kesto = feidauksenKesto(audio, 0);
  assert.ok(kesto !== null && Math.abs(kesto - 500) <= 20,
    `siirtymän laskun pitäisi kestää 500 ms — kesti ${kesto} ms`);
});

/* ── 3. himmennys (aikajanalinssin tauko) ────────────────────────── */

test('himmennys puolittaa soivan raidan ja palautus nostaa sen takaisin', async () => {
  await pystyta();
  const audio = await soita('keksinnot');
  assert.equal(audio.volume, 0.11);

  himmennaSiirtymamusiikki(0.5);
  ajaKehykset(1000);
  assert.ok(Math.abs(audio.volume - 0.055) < 1e-9, `himmennetty taso ${audio.volume}`);
  assert.equal(audio.paused, false, 'tauolla musiikki JATKUU, se vain hiljenee');

  himmennaSiirtymamusiikki(1);
  ajaKehykset(1000);
  assert.equal(audio.volume, 0.11);
});

test('himmennys ei jää päälle seuraavaan raitaan eikä kelvoton arvo riko tasoa', async () => {
  await pystyta();
  await soita('keksinnot');
  himmennaSiirtymamusiikki(0.5);
  ajaKehykset(1000);
  lopetaSiirtymamusiikki();
  ajaKehykset(1000);

  const seuraava = await soita('jalan');
  assert.equal(seuraava.volume, 0.11, 'uusi käynnistys nollaa himmennyksen');

  himmennaSiirtymamusiikki(undefined);
  ajaKehykset(1000);
  assert.equal(seuraava.volume, 0.11, 'kelvoton kerroin tarkoittaa täyttä tasoa');
});

test('himmennys ilman soivaa raitaa on turvallinen', async () => {
  await pystyta();
  assert.doesNotThrow(() => himmennaSiirtymamusiikki(0.5));
  assert.equal(siirtymamusiikkiSoi(), null);
});

/* ── 4. puuttuva raita ───────────────────────────────────────────── */

test('puuttuva linssiraita kokeillaan kahdesta polusta ja jää sitten hiljaiseksi', async () => {
  await pystyta();
  const audio = await soita('keksinnot', 100);
  assert.ok(audio.src.includes('aanet/linssi-keksinnot.mp3'));

  audio.laukaiseVirhe();
  await mikrotehtavat();
  assert.ok(audio.src.includes('linssi-keksinnot.mp3') && !audio.src.includes('aanet/'),
    `toinen polku (audio/) pitäisi kokeilla — oli ${audio.src}`);

  audio.laukaiseVirhe();
  await mikrotehtavat();
  assert.equal(siirtymamusiikkiSoi(), null, 'molemmat polut pettivät: hiljaisuus');

  // Laji on hiljainen loppukäynnin ajan: uusi soitin ei synny.
  const ennen = soittimet.length;
  aloitaSiirtymamusiikki('keksinnot');
  await mikrotehtavat();
  assert.equal(soittimet.length, ennen, 'peli ei saa kuluttaa verkkoa 404-sarjaan');
});
