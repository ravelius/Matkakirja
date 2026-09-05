/*
 * MUSIIKKI-LEHDEN RAITALUETTELO (js/tyohuone-musiikki.js).
 *
 * Omistajan tilaus 3.9.2026: *"kehittäjä hampurilaiseen voisi tehdä
 * oman sivun taustamusiikeille, jossa voisin käydä kuuntelemassa
 * niitä"*. Lehti on luettelo, ja luettelon ainoa vika on hiljainen
 * puute: jos pelin lajitaulukkoon (js/siirtymamusiikki.js RAIDAT)
 * lisätään raita eikä tänne, lehti näyttää edelleen ehjältä — se vain
 * ei kerro uudesta raidasta mitään, eikä kukaan huomaa ennen kuin
 * omistaja etsii raitaa turhaan.
 *
 * Siksi vartioitavaa on kolme:
 *
 *   1. LAJIKATTAVUUS. Jokaiselle MUSIIKKILAJIT-listan lajille on rivi
 *      JA selite (TUNTEMATTOMAT_LAJIT on tyhjä).
 *   2. PALETTI. Neljä raitaa — pohja, visa, aarre, paaaarre — pysyvät
 *      luettelossa.
 *   3. POLUT. Jokainen osoite osoittaa joko ämpärin juureen
 *      (AANI_JUURI) tai repon assets/audio-kansioon. Kolmas osoite
 *      olisi väärä osoite: peli ei hae ääntä mistään muualta.
 *
 * Lisäksi tarkistetaan, että lehden tehostenapit kutsuvat nimiä, jotka
 * js/sound.js oikeasti tuntee — sfx.play tuntemattomalla nimellä ei
 * kaadu vaan vaikenee, ja vaiennut nappi näyttää rikkinäiseltä
 * äänitteeltä.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

/* ── tynkäselain (sama pohja kuin tests/linssimusiikki.test.mjs) ──── */

globalThis.document = {
  addEventListener() {}, removeEventListener() {}, dispatchEvent() {},
  getElementById: () => null,
  createElement: () => ({ style: {}, classList: { add() {}, toggle() {} }, appendChild() {} }),
};
globalThis.localStorage = { getItem: () => null, setItem() {}, removeItem() {} };
globalThis.fetch = () => Promise.reject(new Error('ei verkkoa testissä'));
globalThis.window = { AudioContext: function Ctx() { return {}; } };
globalThis.requestAnimationFrame = () => 0;
globalThis.Audio = class TynkaAudio {
  constructor(src) { this.src = src; this.volume = 0; }

  addEventListener() {}

  removeAttribute() {}

  load() {}

  play() { return Promise.resolve(); }

  pause() {}
};

const { AANI_JUURI, MUSIIKIN_PAATE, musaPolku } = await import('../js/media.js');
const { MUSIIKKILAJIT } = await import('../js/siirtymamusiikki.js');
const {
  MUSIIKKISIVUN_RAIDAT, SFX_NIMET, TUNTEMATTOMAT_LAJIT, musiikkiSivut, raidanOsoitteet,
} = await import('../js/tyohuone-musiikki.js');

const SOUND_LAHDE = readFileSync(new URL('../js/sound.js', import.meta.url), 'utf8');

/** Raidan tunnisteet osastoittain. */
const osaston = (osasto) => MUSIIKKISIVUN_RAIDAT
  .filter((r) => r.osasto === osasto).map((r) => r.id);

/* ── 1. lajikattavuus ────────────────────────────────────────────── */

test('luettelossa on rivi jokaiselle musiikkilajille', () => {
  const lajirivit = [...osaston('siirtyma'), ...osaston('linssi')];
  assert.deepEqual(lajirivit, [...MUSIIKKILAJIT],
    'Musiikki-lehden lajirivit eivät vastaa js/siirtymamusiikki.js:n MUSIIKKILAJIT-listaa');
});

test('jokaiselle lajille on selite tässä lehdessä', () => {
  assert.deepEqual(TUNTEMATTOMAT_LAJIT, [],
    'lisää puuttuvat lajit js/tyohuone-musiikki.js:n LAJIEN_TIEDOT-taulukkoon');
});

/* ── 2. paletti ──────────────────────────────────────────────────── */

test('musiikkipaletin neljä raitaa ovat luettelossa', () => {
  assert.deepEqual(osaston('paletti'), ['pohja', 'visa', 'aarre', 'paaaarre']);
});

test('paletin tiedostot ovat pelin käyttämät musa-nimet', () => {
  /*
   * MOOTTORIPÄÄTE TULEE KYTKIMESTÄ (js/media.js MUSIIKIN_PAATE, ''
   * tai '-lyria'; omistajan linjaus 5.9.2026 *"kaikki musiikki
   * lyrialla"*). Lehti ei saa kuunnella eri tiedostoa kuin peli
   * soittaa, joten odotus lasketaan samasta apurista kuin pelinkin
   * polut — kovakoodattu nimi tekisi tästä testistä sen, joka estää
   * kytkimen kääntämisen.
   */
  const nimet = MUSIIKKISIVUN_RAIDAT
    .filter((r) => r.osasto === 'paletti').map((r) => r.oma);
  assert.deepEqual(nimet, [
    musaPolku('musa-pohja'),
    musaPolku('musa-visa-2'),
    musaPolku('musa-aarre'),
    musaPolku('musa-paaaarre'),
  ]);
  for (const nimi of nimet) {
    assert.ok(nimi.endsWith(`${MUSIIKIN_PAATE}.mp3`), `${nimi}: moottoripääte ohitettu`);
  }
});

/* ── 3. polut ────────────────────────────────────────────────────── */

test('jokaisen raidan polut osoittavat ämpäriin tai assets/audio-kansioon', () => {
  for (const raita of MUSIIKKISIVUN_RAIDAT) {
    if (raita.ampari) {
      assert.ok(raita.ampari.startsWith(AANI_JUURI),
        `${raita.id}: ämpäripolku ei ala AANI_JUURI:lla — ${raita.ampari}`);
    }
    if (raita.oma) {
      assert.ok(raita.oma.startsWith('assets/audio/'),
        `${raita.id}: oma polku ei ala assets/audio/ — ${raita.oma}`);
    }
    const osoitteet = raidanOsoitteet(raita);
    assert.ok(osoitteet.length > 0, `${raita.id}: ei yhtään osoitetta`);
    for (const url of osoitteet) {
      assert.ok(url.startsWith(AANI_JUURI) || url.startsWith('assets/audio/'),
        `${raita.id}: outo soitto-osoite ${url}`);
    }
  }
});

test('siirtymä- ja linssiraidat haetaan ämpärin aanet-kansiosta ensin', () => {
  for (const raita of MUSIIKKISIVUN_RAIDAT) {
    if (raita.osasto !== 'siirtyma' && raita.osasto !== 'linssi') continue;
    assert.ok(raita.ampari.startsWith(`${AANI_JUURI}aanet/`), `${raita.id}: ${raita.ampari}`);
    assert.equal(raidanOsoitteet(raita)[0], raita.ampari,
      `${raita.id}: ämpärin aanet/-polku on kokeiltava ensin`);
  }
});

test('kohahdukset 1–4 ovat ämpärin tehostekansiossa', () => {
  assert.deepEqual(osaston('tehoste'),
    ['kohahdus-1', 'kohahdus-2', 'kohahdus-3', 'kohahdus-4']);
  for (const raita of MUSIIKKISIVUN_RAIDAT.filter((r) => r.osasto === 'tehoste')) {
    assert.equal(raita.ampari, `${AANI_JUURI}aanet/tehosteet/${raita.id}.mp3`);
  }
});

/* ── 4. tehostenapit ─────────────────────────────────────────────── */

test('tehostenappien nimet löytyvät js/sound.js:n äänitaulusta', () => {
  const tuntemattomat = SFX_NIMET.filter((nimi) => {
    // Top-tason avain SOUNDS- tai REAL_SAMPLES-taulussa: kaksi välilyöntiä,
    // nimi ja kaksoispiste (talon tyyli, sisennys sarakkeessa 2).
    const avain = new RegExp(`^ {2}${nimi}: `, 'm');
    return !avain.test(SOUND_LAHDE);
  });
  assert.deepEqual(tuntemattomat, [],
    'nämä nimet eivät ole js/sound.js:n äänitauluissa — nappi jäisi mykäksi');
});

/* ── 5. sivut ────────────────────────────────────────────────────── */

test('lehdessä on kolme sivua ja jokaisella oma piirto', () => {
  const sivut = musiikkiSivut();
  assert.deepEqual(sivut.map((s) => s.nimi), ['Musiikki', 'Paletti', 'Tehosteet']);
  for (const sivu of sivut) {
    assert.equal(typeof sivu.rakenna, 'function', `${sivu.id}: piirto puuttuu`);
    assert.equal(sivu.yksipalsta, true, `${sivu.id}: kehittäjän liite on yksipalstainen`);
  }
});
