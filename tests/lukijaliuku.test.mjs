/*
 * ══════════════════════════════════════════════════════════════════
 * LUKIJA-LIUKU YLTÄÄ SOIVAAN ÄÄNEEN — VARTIO
 * ══════════════════════════════════════════════════════════════════
 *
 * OMISTAJAN VIKAILMOITUS 12.9.2026, sanatarkasti: *"äänien
 * voimakkuussäädin ei muuten toimi. Saisiko sen korjattua ensi
 * tilassa?"*
 *
 * Viidestä liu'usta (index.html #aanivoimat) neljä muutti soivaa tasoa
 * mitattaessa oikein. LUKIJA EI. Syitä oli kaksi, ja tämä tiedosto
 * vartioi molempia — kumpikin on juuri sellainen katkos, jota mikään
 * portti ei aiemmin kuunnellut:
 *
 *  1. ÄÄNITTEENÄ SOIVA LUENTA jäi päivittämättä, koska js/main.js kävi
 *     läpi vain `ui.luennat` -joukon. Avaustekstin luenta
 *     (js/luenta.js playIntroVoice) ei ole siinä joukossa lainkaan:
 *     mitattuna liuku 90 % → 0 % jätti soivan intro-puhe.mp3:n tasolle
 *     0,9 sekä heti että kolmen sekunnin kuluttua. Nyt päivitys käyttää
 *     PUHUJAKIRJANPITOA (`merkitsePuhuja`), joka on koko pelin ainoa
 *     täydellinen luettelo soivista luennoista.
 *  2. STRIIMATTU LUKIJA (js/puhe.js) — pelin ensisijainen lukija, se
 *     joka lukee lehdet ja artikkelit — ei lukenut liu'un avainta
 *     ollenkaan. Sen taso tuli yksin työhuoneen kertoimesta
 *     (`matkakirja-puhe-voima`). Nyt liuku kertoo siihen SUHTEENSA
 *     oletusasentoon, jolloin oletustaso säilyy täsmälleen ennallaan.
 *
 * Lisäksi vartioidaan, ettei kytkentä katkea lähdekoodista: jokaisen
 * puheVoima()-tasolla käynnistyvän luennan on merkittävä itsensä
 * puhujaksi, muuten se katoaa liu'un ulottuvilta huomaamatta.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { tyhjaaEiKoodi } from '../tools/lahde-tyhjays.mjs';

/** Selaimeton <audio>: vain se, mitä tasonpäivitys lukee. */
class TynkaAudio {
  constructor(src = '') {
    this.src = src;
    this.paused = false;
    this.ended = false;
    this.currentTime = 0.1;
    this.volume = 1;
    this.kuuntelijat = new Map();
  }

  addEventListener(laji, fn) {
    if (!this.kuuntelijat.has(laji)) this.kuuntelijat.set(laji, new Set());
    this.kuuntelijat.get(laji).add(fn);
  }

  removeEventListener(laji, fn) { this.kuuntelijat.get(laji)?.delete(fn); }

  dispatchEvent(tapahtuma) {
    for (const fn of [...(this.kuuntelijat.get(tapahtuma?.type) ?? [])]) fn(tapahtuma);
    return true;
  }

  play() { this.paused = false; return Promise.resolve(); }

  pause() { this.paused = true; }

  removeAttribute() { this.src = ''; }
}

globalThis.Audio = TynkaAudio;
globalThis.Event = globalThis.Event ?? class { constructor(type) { this.type = type; } };
globalThis.performance = globalThis.performance ?? { now: () => Date.now() };
globalThis.requestAnimationFrame = globalThis.requestAnimationFrame
  ?? ((fn) => setTimeout(() => fn(Date.now()), 16));

const {
  PUHUJA_KERTOJA, PUHUJA_PULU, merkitsePuhuja, paivitaLuentojenVoima, vapautaPuhuja,
} = await import('../js/luenta.js');
const { PUHEVOIMA_OLETUS, asetaPuheVoima, puheVoima } = await import('../js/aani-ehdokkaat.js');
const { lukijanTaso, puheenVoima } = await import('../js/puhe.js');

const lue = (polku) => readFileSync(new URL(polku, import.meta.url), 'utf8');

/** Muistinvarainen localStorage yhdelle testille. */
function muistilla(alku = {}) {
  const arvot = new Map(Object.entries(alku));
  const varasto = {
    getItem: (k) => (arvot.has(k) ? arvot.get(k) : null),
    setItem: (k, v) => arvot.set(k, String(v)),
    removeItem: (k) => arvot.delete(k),
  };
  globalThis.localStorage = varasto;
  globalThis.window = { ...(globalThis.window ?? {}), localStorage: varasto };
  return arvot;
}

test.afterEach(() => {
  delete globalThis.localStorage;
  delete globalThis.window;
});

/* ── 1. äänitteenä soiva luenta seuraa liukua ────────────────────── */

test('liuku laskee JOKAISEN soivan luennan — myös sellaisen, jota ui.luennat ei tunne', () => {
  muistilla();
  const ui = { dead: false };
  // Avausteksti: playIntroVoice EI lisää soitinta ui.luennat-joukkoon,
  // ja juuri se oli omistajan kuulema vika.
  const avaus = new TynkaAudio('intro-puhe.mp3');
  avaus.volume = puheVoima();
  merkitsePuhuja(ui, avaus, PUHUJA_KERTOJA);
  // Matkakirjan luenta: tämä oli mukana jo ennen korjausta.
  const merkinta = new TynkaAudio('matkakirja.mp3');
  merkinta.volume = puheVoima();
  merkitsePuhuja(ui, merkinta, PUHUJA_KERTOJA);
  (ui.luennat ??= new Set()).add(merkinta);

  assert.equal(avaus.volume, PUHEVOIMA_OLETUS);
  asetaPuheVoima(0.2);
  paivitaLuentojenVoima();
  assert.equal(avaus.volume, 0.2, 'avaustekstin luenta jäi liu\'un ulottumattomiin');
  assert.equal(merkinta.volume, 0.2);

  // Nolla on aito hiljaisuus, ei oletukseen palautuva "tyhjä arvo".
  asetaPuheVoima(0);
  paivitaLuentojenVoima();
  assert.equal(avaus.volume, 0);
  assert.equal(merkinta.volume, 0);

  vapautaPuhuja(ui, avaus);
  vapautaPuhuja(ui, merkinta);
});

test('pulun repliikki ei ole lukija: rooli rajaa sen ulos', () => {
  muistilla();
  const ui = { dead: false };
  const pulu = new TynkaAudio('livia-avaus-1.mp3');
  pulu.volume = 0.8;
  merkitsePuhuja(ui, pulu, PUHUJA_PULU);
  // Vanha rajaus vertasi soitinta ui.liviaAani-kenttään; toinen
  // repliikki olisi vienyt kentän ja jättänyt tämän liu'un armoille.
  ui.liviaAani = new TynkaAudio('livia-toinen.mp3');
  asetaPuheVoima(0.1);
  paivitaLuentojenVoima();
  assert.equal(pulu.volume, 0.8, 'Lukija-liuku säätää pulua');
  vapautaPuhuja(ui, pulu);
});

test('poistuva tai vaiennut luenta jätetään rauhaan', () => {
  muistilla();
  const ui = { dead: false };
  const haipyva = new TynkaAudio('poistuu.mp3');
  haipyva.volume = 0.12; // kesken häivytystä nollaa kohti
  haipyva.luennanHaivytys = true;
  merkitsePuhuja(ui, haipyva, PUHUJA_KERTOJA);
  const tauolla = new TynkaAudio('tauolla.mp3');
  tauolla.volume = 0.4;
  tauolla.paused = true;
  merkitsePuhuja(ui, tauolla, PUHUJA_KERTOJA);

  asetaPuheVoima(1);
  paivitaLuentojenVoima();
  assert.equal(haipyva.volume, 0.12, 'häivytys keskeytyi ja ääni palasi kuuluviin');
  assert.equal(tauolla.volume, 0.4, 'tauolla oleva luenta heräsi liu\'usta');
  // Perustaso talletetaan silti, jotta pehmeaLoppu häivyttää oikeasta
  // tasosta eikä nosta ääntä takaisin lopun rampissa.
  assert.equal(haipyva.luennanPerustaso, 1);
  vapautaPuhuja(ui, haipyva);
  vapautaPuhuja(ui, tauolla);
});

/* ── 2. striimattu lukija seuraa samaa liukua ────────────────────── */

test('striimatun lukijan taso: liu\'un oletusasento EI muuta mitään', () => {
  muistilla();
  asetaPuheVoima(PUHEVOIMA_OLETUS);
  assert.equal(lukijanTaso(), puheenVoima(),
    'oletusasennossa lukijan taso on täsmälleen työhuoneen kerroin');
});

test('striimattu lukija seuraa liukua: puolet on puolet, nolla on hiljaisuus', () => {
  muistilla();
  const kerroin = puheenVoima();
  asetaPuheVoima(PUHEVOIMA_OLETUS / 2);
  assert.ok(Math.abs(lukijanTaso() - kerroin / 2) < 1e-9, String(lukijanTaso()));
  asetaPuheVoima(0);
  assert.equal(lukijanTaso(), 0);
  asetaPuheVoima(1);
  assert.ok(lukijanTaso() > kerroin, 'täysi liuku nostaa oletuksen yli');
});

/* ── 3. ketju ei saa katketa lähdekoodista ───────────────────────── */

test('Lukija-liuku herättää molemmat reitit (js/main.js)', () => {
  const main = lue('../js/main.js');
  const kohta = main.slice(main.indexOf("avain: 'lukija'"));
  const runko = kohta.slice(0, kohta.indexOf('},'));
  assert.match(runko, /asetaPuheVoima\(/, 'liuku ei tallenna arvoa');
  assert.match(runko, /paivitaLuentojenVoima\(\)/, 'äänitteenä soiva luenta jäisi ennalleen');
  assert.match(runko, /paivitaLukijanVoima\(\)/, 'striimattu lukija jäisi ennalleen');
});

test('jokainen puheVoima-tasolla alkava luenta merkitsee itsensä puhujaksi', () => {
  /*
   * Juuri tämä pitää päivityksen kattavana: puhujakirjanpito on se
   * luettelo, jota Lukija-liuku käy läpi. Lähde luetaan kommentit ja
   * merkkijonot tyhjättyinä (tools/lahde-tyhjays.mjs), jotta pitkä
   * perustelukommentti aloituksen ja merkinnän välissä ei venytä
   * ikkunaa eikä proosa laukaise osumaa.
   */
  for (const polku of ['../js/luenta.js', '../js/linssipuhe.js', '../js/ui.js']) {
    const rivit = tyhjaaEiKoodi(lue(polku)).split('\n');
    const osumat = rivit
      .map((rivi, i) => (/^\s*audio\.volume = puheVoima\(\);\s*$/.test(rivi) ? i : -1))
      .filter((i) => i >= 0);
    assert.ok(osumat.length > 0, `${polku}: yhtään luennan aloitusta ei löytynyt`);
    for (const i of osumat) {
      // Ikkuna on KOODIRIVEJÄ: tyhjätyt kommenttirivit eivät vie tilaa.
      const koodia = rivit.slice(i, i + 400).filter((r) => r.trim()).slice(0, 60).join('\n');
      assert.match(koodia, /merkitsePuhuja\(/,
        `${polku} rivi ${i + 1}: luenta ei merkitse itseään puhujaksi — `
        + 'Lukija-liuku ei tavoita sitä');
    }
  }
});
