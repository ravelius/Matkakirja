/*
 * POHJARAIDAN VALITSIN: kuka voittaa yhden musiikkipaikan, ja mitä
 * tapahtuu kun raita puuttuu.
 *
 * Omistajan tilaus 5.9.2026 yöllä, sanatarkasti: *"generoi musiikkeja
 * kaikkiin kohtiin peliä, ne tuovat paljon lisää tunnelmaa."*
 *
 * Kaikki tämän moduulin viat ovat HILJAISIA — väärä tai puuttuva
 * musiikki ei kaada peliä eikä näy lokissa, se vain jää soimatta tai
 * soi väärässä paikassa. Viisi asiaa vartioidaan:
 *
 *   1. KETJUN JÄRJESTYS. Tila (lehti, matkalaukku) ennen paikkaa,
 *      kaupungin oma kappale ennen alueen raitaa, pohjavire
 *      viimeisenä. Jos järjestys kääntyy, lehti soi kaupungin alla tai
 *      Ateenan oma kappale jää alueraidan taakse.
 *   2. VARAPOLKU. Puuttuva mp3 on NORMAALI TILA: kytkentä on mainissa
 *      ennen kuin raita on generoitu. Silloin seuraavan tason on
 *      otettava paikka — peli ei saa olla hetkeäkään hiljainen.
 *   3. NIMIEN TÄSMÄYS. Työkalu kirjoittaa tiedoston, peli hakee polun.
 *      Jos ne eriytyvät, generointi maksaa ja tuottaa raidan, jota
 *      peli ei koskaan pyydä.
 *   4. ALUEEN KATTAVUUS. Jokaisella Euroopan laudan maalla on alue.
 *      Ilman sitä kaupunki putoaa suoraan pohjavireeseen, eikä sitä
 *      kuule mistään.
 *   5. PELIN KYTKENNÄT. Lehti tulee ambienssin hiljennyssyystä ja
 *      matkalaukku js/ui.js:n kahdesta koukusta; kumpikin voi kadota
 *      remontissa ilman että mikään muu rikkoutuu.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import * as lyria from '../tools/lyria.mjs';
import { ALUEIDEN_RAIDAT, RAIDAT, TILOJEN_RAIDAT } from '../tools/generoi-musiikki.mjs';

const lue = (polku) => readFileSync(new URL(polku, import.meta.url), 'utf8');

const TYONKULKU = lue('../.github/workflows/generoi-musiikki.yml');
const OHJE = lue('../docs/moduulit/aanet.md');
const UI = lue('../js/ui.js');
const AMBIENSSI = lue('../js/ambience-stream.js');
const MAAT = lue('../js/packs/europe-countries.js');

const { MUSIIKIN_PAATE, musaPolku } = await import('../js/media.js');
const {
  ALUEEN_MAAT, ALUERAIDAT, KAUPUNGIN_ALUE, KAUPUNKIRAIDAT,
  kaupunginAlue, kaupunginRaidat, kaupunkiraidanTunnus, maanosaraidanTunnus,
} = await import('../js/kaupunkimusiikki.js');
const valitsin = await import('../js/musiikkivalitsin.js');

const {
  PAIKKARAIDAT, POHJARAITA, TILARAIDAT,
  asetaMusiikkipaikka, asetaMusiikkitila, musiikkiketju, musiikkitilat,
  nollaaMusiikkivalitsin, valitseMusiikki,
} = valitsin;

const POHJA = musaPolku(POHJARAITA);
// Maanosaraidat (vaihe 2): alueraidan varareitti ennen pohjavirettä.
const MAANOSA_VALIMERI = musaPolku(maanosaraidanTunnus('valimeri'));
const MAANOSA_LANSI = musaPolku(maanosaraidanTunnus('lansi-eurooppa'));
// Etusivulla soi 26.9.2026 alkaen isoisän johtoaihe (musiikkisuunnitelma
// vaihe 1); vanha musa-etusivu jää ämpäriin paluuta varten.
const ETUSIVU = musaPolku('musa-johtoaihe');

/**
 * Musiikkisuunnitelman raita, jonka tiedosto on tämä tunnus, tai
 * undefined. Paikkaraita voi siirtyä tilaraidasta suunnitelman raitaan
 * (etusivu → johtoaihe) samalla periaatteella kuin musa-visa-2.
 */
const suunnitelmanRaita = (tunnus) => Object.values(RAIDAT)
  .find((r) => r.laji === 'suunnitelma' && r.tiedosto === `${tunnus}.mp3`);

/* ── 1. ketju ────────────────────────────────────────────────────── */

test('ilman paikkaa ja tilaa soi pohjavire', () => {
  nollaaMusiikkivalitsin();
  assert.deepEqual(musiikkiketju(), [POHJA]);
  assert.equal(valitseMusiikki(new Set()), POHJA);
});

test('kaupunki menee alueen edelle ja alue pohjavireen edelle', () => {
  nollaaMusiikkivalitsin();
  // Ateenalla on OMA kappale ja Kreikalla alue: molemmat ketjuun,
  // oma ensin.
  assert.deepEqual(musiikkiketju('ateena', 'GRC'), [
    musaPolku(kaupunkiraidanTunnus('ateena')),
    musaPolku(kaupunkiraidanTunnus('valimeri')),
    MAANOSA_VALIMERI,
    POHJA,
  ]);
  // Sofialla ei ole omaa kappaletta: alue (Balkan) ottaa paikan, ja
  // Balkan kuuluu Välimeren maanosaan.
  assert.deepEqual(musiikkiketju('sofia', 'BGR'), [
    musaPolku(kaupunkiraidanTunnus('balkan')),
    MAANOSA_VALIMERI,
    POHJA,
  ]);
  // Maanosa ilman aluetta (vaihe 3: kaikki kymmenen maanosaa): maanosaraita ja pohjavire.
  assert.deepEqual(musiikkiketju('kumasi', 'GHA'), [
    musaPolku(maanosaraidanTunnus('saharan-etelapuoli')), POHJA,
  ]);
});

test('kaupunkikohtainen poikkeus voittaa maan', () => {
  // Marseille on Ranskassa mutta kuulostaa Välimereltä.
  assert.equal(kaupunginAlue('marseille', 'FRA'), 'valimeri');
  assert.equal(kaupunginAlue('pariisi', 'FRA'), 'keski-eurooppa');
  // Ilman maatietoa poikkeus toimii yhä, muut eivät.
  assert.equal(kaupunginAlue('marseille'), 'valimeri');
  assert.equal(kaupunginAlue('pariisi'), null);
  // Prototyypin kenttä ei saa vastata alueena.
  assert.equal(kaupunginAlue('toString', 'toString'), null);
});

test('etusivun raita voittaa pohjavireen mutta väistyy lehden alta', () => {
  nollaaMusiikkivalitsin();
  assert.deepEqual(musiikkiketju('etusivu'), [ETUSIVU, POHJA]);
  asetaMusiikkitila('lehti', true);
  assert.deepEqual(musiikkiketju('etusivu'),
    [musaPolku('musa-lehti'), ETUSIVU, POHJA]);
  nollaaMusiikkivalitsin();
});

test('lehti voittaa matkalaukun, ja tilat väistyvät sulkeutuessaan', () => {
  nollaaMusiikkivalitsin();
  asetaMusiikkitila('matkalaukku', true);
  assert.deepEqual(musiikkitilat(), ['matkalaukku']);
  assert.equal(musiikkiketju('ateena', 'GRC')[0], musaPolku('musa-matkalaukku'));
  asetaMusiikkitila('lehti', true);
  // Järjestys on TILARAIDAT-taulun järjestys, ei avaamisjärjestys.
  assert.deepEqual(musiikkitilat(), ['lehti', 'matkalaukku']);
  assert.deepEqual(musiikkiketju('ateena', 'GRC'), [
    musaPolku('musa-lehti'),
    musaPolku('musa-matkalaukku'),
    musaPolku(kaupunkiraidanTunnus('ateena')),
    musaPolku(kaupunkiraidanTunnus('valimeri')),
    MAANOSA_VALIMERI,
    POHJA,
  ]);
  asetaMusiikkitila('lehti', false);
  assert.deepEqual(musiikkitilat(), ['matkalaukku']);
  asetaMusiikkitila('matkalaukku', false);
  assert.deepEqual(musiikkitilat(), []);
  assert.deepEqual(musiikkiketju('ateena', 'GRC'), [
    musaPolku(kaupunkiraidanTunnus('ateena')),
    musaPolku(kaupunkiraidanTunnus('valimeri')),
    MAANOSA_VALIMERI,
    POHJA,
  ]);
});

test('tuntematon tila ei tee mitään eikä herätä kuuntelijoita', () => {
  nollaaMusiikkivalitsin();
  let herätyksiä = 0;
  valitsin.kuunteleMusiikkitilaa(() => { herätyksiä += 1; });
  // Ambienssin hiljennyssyitä on muitakin kuin raidallisia.
  asetaMusiikkitila('pollo', true);
  asetaMusiikkitila('linssi', true);
  assert.deepEqual(musiikkitilat(), []);
  assert.equal(herätyksiä, 0);
  // Sama tila kahdesti ei kerry eikä herätä uudestaan.
  asetaMusiikkitila('lehti', true);
  asetaMusiikkitila('lehti', true);
  assert.equal(herätyksiä, 1);
  nollaaMusiikkivalitsin();
});

test('paikka muistetaan, joten tilan vaihto ei hukkaa kaupunkia', () => {
  nollaaMusiikkivalitsin();
  asetaMusiikkipaikka('ateena', 'GRC');
  assert.equal(valitsin.musiikinPaikka(), 'ateena');
  assert.equal(valitsin.musiikinMaa(), 'GRC');
  assert.equal(valitseMusiikki(), musaPolku(kaupunkiraidanTunnus('ateena')));
  asetaMusiikkitila('lehti', true);
  assert.equal(valitseMusiikki(), musaPolku('musa-lehti'));
  asetaMusiikkitila('lehti', false);
  assert.equal(valitseMusiikki(), musaPolku(kaupunkiraidanTunnus('ateena')));
  nollaaMusiikkivalitsin();
});

/* ── 2. varapolku ────────────────────────────────────────────────── */

test('puuttuva raita pudottaa ketjun seuraavalle tasolle', () => {
  nollaaMusiikkivalitsin();
  asetaMusiikkitila('lehti', true);
  const puuttuvat = new Set();
  assert.equal(valitseMusiikki(puuttuvat, 'ateena', 'GRC'), musaPolku('musa-lehti'));
  puuttuvat.add(musaPolku('musa-lehti'));
  assert.equal(valitseMusiikki(puuttuvat, 'ateena', 'GRC'),
    musaPolku(kaupunkiraidanTunnus('ateena')));
  puuttuvat.add(musaPolku(kaupunkiraidanTunnus('ateena')));
  assert.equal(valitseMusiikki(puuttuvat, 'ateena', 'GRC'),
    musaPolku(kaupunkiraidanTunnus('valimeri')));
  puuttuvat.add(musaPolku(kaupunkiraidanTunnus('valimeri')));
  // Alueraidan 404: maanosaraita on sen varareitti (vaihe 2).
  assert.equal(valitseMusiikki(puuttuvat, 'ateena', 'GRC'), MAANOSA_VALIMERI);
  puuttuvat.add(MAANOSA_VALIMERI);
  assert.equal(valitseMusiikki(puuttuvat, 'ateena', 'GRC'), POHJA);
  // Kun kaikki puuttuvat, peli on hiljainen — eikä yritä uudestaan.
  puuttuvat.add(POHJA);
  assert.equal(valitseMusiikki(puuttuvat, 'ateena', 'GRC'), null);
  nollaaMusiikkivalitsin();
});

/* ── 3. työkalun ja pelin nimet ──────────────────────────────────── */

test('jokaisella alueraidalla on prompti, kesto ja sama tiedostonimi', () => {
  assert.deepEqual(ALUEIDEN_RAIDAT, Object.keys(ALUERAIDAT),
    'tools/generoi-musiikki.mjs ja js/kaupunkimusiikki.js tuntevat eri alueet');
  for (const alue of ALUEIDEN_RAIDAT) {
    const raita = RAIDAT[alue];
    const tunnus = kaupunkiraidanTunnus(alue);
    assert.equal(raita.alue, alue, `${alue}: työkalun alue-kenttä ei vastaa avainta`);
    assert.equal(raita.tiedosto, `${tunnus}.mp3`,
      `${alue}: työkalu kirjoittaisi tiedoston, jota peli ei hae`);
    assert.equal(lyria.raidanTiedosto(raita, 'lyria'), `${tunnus}-lyria.mp3`);
    assert.equal(raita.looppi, true, `${alue}: alueraita soi minuutteja — sen on kierrettävä`);
    assert.ok(raita.kesto >= 60000 && raita.kesto <= 90000,
      `${alue}: kesto 60–90 s, nyt ${raita.kesto / 1000} s`);
    assert.ok(raita.prompt?.length > 200, `${alue}: prompti puuttuu tai on liian ohut`);
    assert.match(raita.prompt, /UNDER the ambient soundscape/,
      `${alue}: prompti ei pyydä raitaa pohjaäänimaiseman ALLE`);
    assert.match(raita.prompt, /Seamless loop/, `${alue}: saumaa ei pyydetä`);
    assert.match(raita.prompt, /clich/, `${alue}: kliseiden kielto puuttuu promptista`);
    assert.match(raita.prompt, /No modern synths/, `${alue}: yhteinen tyylilause puuttuu`);
    assert.ok(ALUERAIDAT[alue].kuvaus, `${alue}: kuvaus puuttuu (näkyy Musiikki-lehdessä)`);
  }
});

test('jokaisella tilaraidalla on prompti ja sama tiedostonimi kuin pelillä', () => {
  const pelinTilat = { ...TILARAIDAT, ...PAIKKARAIDAT };
  /*
   * Suunnitelman raita tilaraitana (kohtaaminen, vaihe 2): työkalussa
   * se on laji 'suunnitelma' eikä 'tila', joten se ei kuulu
   * TILOJEN_RAIDAT-ryhmään. Sen tiedosto ja kierto vartioidaan alla.
   */
  const suunnitelmasta = Object.keys(pelinTilat).filter((nimi) => RAIDAT[nimi]?.laji !== 'tila'
    && suunnitelmanRaita(pelinTilat[nimi].tunnus));
  assert.deepEqual(TILOJEN_RAIDAT, Object.keys(pelinTilat).filter((n) => !suunnitelmasta.includes(n)),
    'työkalu ja js/musiikkivalitsin.js tuntevat eri tilaraidat');
  for (const nimi of suunnitelmasta) {
    const raita = suunnitelmanRaita(pelinTilat[nimi].tunnus);
    assert.equal(raita.looppi, true, `${nimi}: tilaraita on auki minuutteja — raidan on kierrettävä`);
    assert.ok(pelinTilat[nimi].kuvaus, `${nimi}: kuvaus puuttuu (näkyy Musiikki-lehdessä)`);
  }
  for (const nimi of TILOJEN_RAIDAT) {
    const raita = RAIDAT[nimi];
    const { tunnus } = pelinTilat[nimi];
    assert.equal(raita.tila, nimi, `${nimi}: työkalun tila-kenttä ei vastaa avainta`);
    // Suunnitelman raidalle siirtynyt paikka: vanha tilaraita jää
    // työkaluun (ja ämpäriin) paluuta varten, eikä kiertoa vaadita.
    if (suunnitelmanRaita(tunnus)) continue;
    assert.equal(raita.tiedosto, `${tunnus}.mp3`,
      `${nimi}: työkalu kirjoittaisi tiedoston, jota peli ei hae`);
    assert.equal(lyria.raidanTiedosto(raita, 'lyria'), `${tunnus}-lyria.mp3`);
    assert.equal(raita.looppi, true, `${nimi}: näkymä on auki minuutteja — raidan on kierrettävä`);
    assert.ok(raita.kesto >= 45000 && raita.kesto <= 90000,
      `${nimi}: kesto 45–90 s, nyt ${raita.kesto / 1000} s`);
    assert.match(raita.prompt, /Seamless loop/, `${nimi}: saumaa ei pyydetä`);
    assert.match(raita.prompt, /No modern synths/, `${nimi}: yhteinen tyylilause puuttuu`);
    assert.ok(pelinTilat[nimi].kuvaus, `${nimi}: kuvaus puuttuu (näkyy Musiikki-lehdessä)`);
  }
});

test('kaikki uudet polut kulkevat MUSIIKIN_PAATE-kytkimen läpi', () => {
  const tunnukset = [
    ...Object.keys(ALUERAIDAT).map(kaupunkiraidanTunnus),
    ...Object.values(TILARAIDAT).map((r) => r.tunnus),
    ...Object.values(PAIKKARAIDAT).map((r) => r.tunnus),
  ];
  for (const tunnus of tunnukset) {
    assert.equal(musaPolku(tunnus), `assets/audio/${tunnus}${MUSIIKIN_PAATE}.mp3`);
  }
  // Ja työkalun tiedostonimet ovat samat tunnukset .mp3-päätteellä —
  // paitsi tilaraidalla, jonka paikka on siirtynyt suunnitelman raidalle.
  const siirtyneet = new Set(Object.entries(PAIKKARAIDAT)
    .filter(([, r]) => suunnitelmanRaita(r.tunnus)).map(([nimi]) => nimi));
  for (const nimi of [...ALUEIDEN_RAIDAT, ...TILOJEN_RAIDAT]) {
    if (siirtyneet.has(nimi)) continue;
    assert.ok(tunnukset.includes(RAIDAT[nimi].tiedosto.replace(/\.mp3$/, '')),
      `${nimi}: työkalun tiedostonimi ei ole yhdenkään pelin raidan tunnus`);
  }
});

/* ── 4. alueen kattavuus ─────────────────────────────────────────── */

test('jokaisella Euroopan laudan maalla on alue', () => {
  // Luetaan pakan taulu tekstinä (sama tapa kuin muissa vartijoissa):
  // kaupunki: 'ISO'.
  const isot = [...MAAT.matchAll(/^\s*[\w']+:\s*'([A-Z]{3})',/gm)].map((m) => m[1]);
  assert.ok(isot.length >= 40, `europe-countries.js: vain ${isot.length} riviä luettu`);
  for (const iso of new Set(isot)) {
    assert.ok(Object.hasOwn(ALUEEN_MAAT, iso),
      `${iso}: maalla ei ole aluetta — sen kaupungeissa soisi pelkkä pohjavire. `
      + 'Lisää rivi js/kaupunkimusiikki.js ALUEEN_MAAT-tauluun.');
  }
});

test('jokainen alue ja poikkeus osoittaa olemassa olevaan raitaan', () => {
  for (const [iso, alue] of Object.entries(ALUEEN_MAAT)) {
    assert.ok(Object.hasOwn(ALUERAIDAT, alue), `${iso}: tuntematon alue ${alue}`);
  }
  for (const [id, alue] of Object.entries(KAUPUNGIN_ALUE)) {
    assert.ok(Object.hasOwn(ALUERAIDAT, alue), `${id}: tuntematon alue ${alue}`);
  }
  // Kaupungin oma kappale ja alueen raita eivät saa saada samaa nimeä.
  for (const id of Object.keys(KAUPUNKIRAIDAT)) {
    assert.ok(!Object.hasOwn(ALUERAIDAT, id),
      `${id}: sama tunnus sekä kaupunkina että alueena — sama tiedostonimi kahdelle raidalle`);
  }
});

/* ── 5. pelin kytkennät ──────────────────────────────────────────── */

test('lehti kertoo tilansa ambienssin hiljennyssyystä', () => {
  assert.match(AMBIENSSI, /asetaMusiikkitila\(syy, true\)/,
    'js/ambience-stream.js: hiljennys ei enää kerro tilaa valitsimelle');
  assert.match(AMBIENSSI, /asetaMusiikkitila\(syy, false\)/,
    'js/ambience-stream.js: palautus ei enää pura tilaa');
  assert.match(AMBIENSSI, /kuunteleMusiikkitilaa\(/,
    'js/ambience-stream.js: tilan vaihtuminen ei enää vaihda raitaa');
});

test('matkalaukku kertoo tilansa auetessaan ja sulkeutuessaan', () => {
  assert.match(UI, /asetaMusiikkitila\('matkalaukku', true\)/,
    'js/ui.js openPassport: laukun raita ei ala');
  assert.match(UI, /asetaMusiikkitila\('matkalaukku', false\)/,
    'js/ui.js passportDialog close: laukun raita jäisi soimaan');
});

test('paikan maa menee soittimelle asti', () => {
  assert.match(AMBIENSSI, /kaynnistaPohjaMusiikki\(cityId, cityCountry\?\.\[cityId\] \?\? null\)/,
    'js/ambience-stream.js: alueraita ei saisi koskaan maata, joten se ei soisi');
});

/* ── 6. työnkulku ja ohje ────────────────────────────────────────── */

test('työnkulku tuntee alue- ja tilaryhmät', () => {
  for (const ryhma of ['kaupungit', 'alueet', 'tilat']) {
    assert.ok(TYONKULKU.includes(ryhma), `raidat-inputin ohje ei tunne ryhmää "${ryhma}"`);
  }
});

test('ohje kertoo pohjaraidan valitsimesta omassa osiossaan', () => {
  assert.match(OHJE, /^## Pohjaraidan valitsin/m, 'docs/moduulit/aanet.md: osio puuttuu');
  assert.match(OHJE, /generoi musiikkeja\s+kaikkiin\s+kohtiin\s+peliä/,
    'omistajan sanat puuttuvat ohjeesta');
  for (const tunnus of ['musa-lehti', 'musa-matkalaukku', 'musa-etusivu']) {
    assert.ok(OHJE.includes(tunnus), `ohje ei mainitse raitaa ${tunnus}`);
  }
});

/* ── 7. soitin: vaihto ja paluu ──────────────────────────────────── */

/** Tynkä <audio>: kirjaa soitot ja antaa ajan liikkua käsin. */
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
      this.kuuntelijat = new Map();
      rekisteri.push(this);
    }

    get src() { return this._src; }

    /* Musiikkisoitin saa srcinsä vasta konstruktorin jälkeen (crossOrigin
     * on asetettava ensin), joten alkuperäinen osoite otetaan talteen
     * ensimmäisestä asetuksesta riippumatta siitä, kumpaa tietä se tuli. */
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
    // eslint-disable-next-line no-await-in-loop
    await Promise.resolve();
  }
}

/**
 * Tuore kopio ambienssimoduulista tyngillä. Valitsin nollataan ENNEN
 * tuontia, jotta edellisen kopion kuuntelija ei jää heräämään tämän
 * testin tilanvaihdoista (ks. nollaaMusiikkivalitsin).
 */
async function lataaAmbienssi() {
  const soittimet = [];
  const kello = { nyt: 0, jono: [] };
  globalThis.Audio = tekoAudio(soittimet);
  globalThis.requestAnimationFrame = (fn) => { kello.jono.push(fn); return kello.jono.length; };
  globalThis.performance = { now: () => kello.nyt };
  globalThis.window = { AudioContext: null };
  globalThis.localStorage = { getItem: () => null, setItem: () => {} };
  nollaaMusiikkivalitsin();
  const mod = await import(`../js/ambience-stream.js?valitsin=${Math.random()}`);
  const { sfx } = await import('../js/sound.js');
  sfx.enabled = true;
  mod.nollaaPohjaMusiikki?.();
  mod.nollaaHiljennykset?.();
  const musiikit = () => soittimet.filter((a) => /musa-/.test(a.alkuSrc));
  return {
    mod, soittimet, kello, musiikit,
  };
}

/** Saapuu paikkaan (maakoodilla) ja ajaa häivytykset loppuun. */
async function saavu(s, cityId, maa = null, tyyppi = 'kaupunki') {
  s.mod.playPlaceAmbience(cityId, tyyppi, 'europe', maa ? { [cityId]: maa } : null);
  await Promise.resolve();
  await Promise.resolve();
  await ajaHaivytykset(s.kello);
}

test('kaupunki ilman omaa kappaletta saa alueensa raidan', async () => {
  const s = await lataaAmbienssi();
  await saavu(s, 'sofia', 'BGR');
  assert.equal(s.mod.soivaPohjaMusiikki(), musaPolku(kaupunkiraidanTunnus('balkan')),
    'Balkanin alueraita ei alkanut');
  // Saman alueen toinen kaupunki EI aloita raitaa alusta.
  const maara = s.musiikit().length;
  await saavu(s, 'bukarest', 'ROU');
  assert.equal(s.musiikit().length, maara,
    'sama alueraita rakensi uuden soittimen — kappale pomppisi alkuun kaupungin vaihtuessa');
  // Toinen alue vaihtaa raidan.
  await saavu(s, 'oslo', 'NOR');
  assert.equal(s.mod.soivaPohjaMusiikki(), musaPolku(kaupunkiraidanTunnus('pohjola')));
});

test('puuttuva alueraita pudottaa maanosaan ja pohjavireeseen, ei hiljaisuuteen', async () => {
  const s = await lataaAmbienssi();
  await saavu(s, 'sofia', 'BGR');
  /** Ämpäri ei vastaa, eikä repon polku myöskään: kaksi virhettä. */
  const puuttuu = async () => {
    const soiva = s.musiikit().at(-1);
    soiva.laukaise('error');
    await Promise.resolve();
    soiva.laukaise('error');
    await Promise.resolve();
    await ajaHaivytykset(s.kello);
  };
  await puuttuu();
  assert.equal(s.mod.soivaPohjaMusiikki(), MAANOSA_VALIMERI,
    'puuttuva alueraita ei pudonnut maanosan raitaan (vaihe 2)');
  await puuttuu();
  assert.equal(s.mod.soivaPohjaMusiikki(), POHJA,
    'puuttuva maanosaraita jätti pelin hiljaiseksi');
});

test('lehti vaihtaa raidan ja sulkeutuminen palauttaa kaupungin', async () => {
  const s = await lataaAmbienssi();
  await saavu(s, 'ateena', 'GRC');
  assert.equal(s.mod.soivaPohjaMusiikki(), musaPolku(kaupunkiraidanTunnus('ateena')));
  const kaupunki = s.musiikit().at(-1);

  s.mod.hiljennaAmbienssi('lehti');
  await Promise.resolve();
  await ajaHaivytykset(s.kello);
  assert.equal(s.mod.soivaPohjaMusiikki(), musaPolku('musa-lehti'),
    'lehden raita ei alkanut lehden avautuessa');
  assert.equal(kaupunki.paused, true, 'kaupungin kappale jäi soimaan lehden alle');

  s.mod.palautaAmbienssi('lehti');
  await Promise.resolve();
  await ajaHaivytykset(s.kello);
  assert.equal(s.mod.soivaPohjaMusiikki(), musaPolku(kaupunkiraidanTunnus('ateena')),
    'kaupungin kappale ei palannut lehden sulkeuduttua');
});

test('matkalaukku vaihtaa raidan ja palauttaa sen sulkeutuessaan', async () => {
  const s = await lataaAmbienssi();
  await saavu(s, 'edinburgh', 'GBR');
  assert.equal(s.mod.soivaPohjaMusiikki(), musaPolku(kaupunkiraidanTunnus('britteinsaaret')));
  asetaMusiikkitila('matkalaukku', true);
  await Promise.resolve();
  await ajaHaivytykset(s.kello);
  assert.equal(s.mod.soivaPohjaMusiikki(), musaPolku('musa-matkalaukku'));
  asetaMusiikkitila('matkalaukku', false);
  await Promise.resolve();
  await ajaHaivytykset(s.kello);
  assert.equal(s.mod.soivaPohjaMusiikki(), musaPolku(kaupunkiraidanTunnus('britteinsaaret')));
});

test('taustaäänten ollessa pois tilan vaihto ei aloita musiikkia', async () => {
  const s = await lataaAmbienssi();
  await saavu(s, 'ateena', 'GRC');
  const { sfx } = await import('../js/sound.js');
  s.mod.stopPohjaMusiikki();
  sfx.enabled = false;
  const maara = s.musiikit().length;
  asetaMusiikkitila('lehti', true);
  await Promise.resolve();
  await ajaHaivytykset(s.kello);
  assert.equal(s.musiikit().length, maara, 'kytkin pois, mutta lehti aloitti raidan');
  assert.equal(s.mod.soivaPohjaMusiikki(), null);
  sfx.enabled = true;
  asetaMusiikkitila('lehti', false);
});

test('etusivulla soi etusivun raita, ja lähtö vaihtaa sen kaupunkiin', async () => {
  const s = await lataaAmbienssi();
  s.mod.playPlaceAmbience('etusivu', 'lentoasema', 'europe');
  await Promise.resolve();
  await Promise.resolve();
  await ajaHaivytykset(s.kello);
  assert.equal(s.mod.soivaPohjaMusiikki(), ETUSIVU,
    'etusivun raita ei alkanut');
  await saavu(s, 'ateena', 'GRC');
  assert.equal(s.mod.soivaPohjaMusiikki(), musaPolku(kaupunkiraidanTunnus('ateena')));
});

test('kaupunginRaidat ei anna raitoja virtuaalipaikoille', () => {
  for (const paikka of ['jalkamatka', 'merimatka', 'lentomatka', 'etusivu', null, undefined]) {
    assert.deepEqual(kaupunginRaidat(paikka), [], `${paikka}: sai raidan tyhjästä`);
  }
});

/* ── 8. musiikkisuunnitelma, vaihe 1 (26.9.2026) ─────────────────── */

test('saapumistunnus maanosittain, sama maa→alue→maanosa-ketju', async () => {
  const { SAAPUMISTUNNUKSET, saapumistunnus } = await import('../js/kaupunkimusiikki.js');
  const tunnus = (maanosa) => musaPolku(`musa-saapuminen-${maanosa}`);
  // Välimeri: alueen kautta, ja kaupunkipoikkeus pätee (Marseille).
  assert.equal(saapumistunnus('ateena', 'GRC'), tunnus('valimeri'));
  assert.equal(saapumistunnus('lissabon', 'PRT'), tunnus('valimeri'));
  assert.equal(saapumistunnus('marseille', 'FRA'), tunnus('valimeri'));
  // Balkan on alue, mutta maanosana Välimeri.
  assert.equal(saapumistunnus('sofia', 'BGR'), tunnus('valimeri'));
  // Kypros: ei aluetta, maanosa suoraan maasta.
  assert.equal(saapumistunnus('nikosia', 'CYP'), tunnus('valimeri'));
  assert.equal(saapumistunnus('pariisi', 'FRA'), tunnus('lansi-eurooppa'));
  assert.equal(saapumistunnus('oslo', 'NOR'), tunnus('lansi-eurooppa'));
  assert.equal(saapumistunnus('lontoo', 'GBR'), tunnus('lansi-eurooppa'));
  assert.equal(saapumistunnus('moskova', 'RUS'), tunnus('ita-eurooppa'));
  assert.equal(saapumistunnus('kairo', 'EGY'), tunnus('lahi-ita'));
  assert.equal(saapumistunnus('kumasi', 'GHA'), tunnus('saharan-etelapuoli'));
  assert.equal(saapumistunnus('delhi', 'IND'), tunnus('etela-aasia'));
  assert.equal(saapumistunnus('tokio', 'JPN'), tunnus('ita-aasia'));
  assert.equal(saapumistunnus('newyork', 'USA'), tunnus('pohjois-amerikka'));
  assert.equal(saapumistunnus('lima', 'PER'), tunnus('etela-amerikka'));
  assert.equal(saapumistunnus('sydney', 'AUS'), tunnus('oseania'));
  // Virtuaalipaikka ja tuntematon maa: ei tunnusta.
  for (const [kaupunki, maa] of [['pariisi', null], ['etusivu', null], ['x', 'XXX'], ['toString', 'toString']]) {
    assert.equal(saapumistunnus(kaupunki, maa), null, `${kaupunki}: tunnus ilman maanosaa`);
  }
  // Kymmenen riviä, avaimena maanosa, ja työkalu tekee juuri ne tiedostot.
  const { MAANOSAT } = await import('../js/kaupunkimusiikki.js');
  assert.deepEqual(Object.keys(SAAPUMISTUNNUKSET).sort(), [...MAANOSAT].sort());
  assert.equal(MAANOSAT.length, 10);
  for (const [maanosa, t] of Object.entries(SAAPUMISTUNNUKSET)) {
    assert.equal(t, `musa-saapuminen-${maanosa}`);
    assert.ok(suunnitelmanRaita(t), `${t}: työkalussa ei ole raitaa tälle tunnukselle`);
    assert.equal(suunnitelmanRaita(t).looppi, false, `${t}: tunnus on one-shot`);
  }
});

/* ── 9. musiikkisuunnitelma, vaihe 2 (26.9.2026) ─────────────────── */

test('jokaisella pakkojen cityCountry-maalla on maanosa', async () => {
  const { PACKS, packById } = await import('../js/pack.js');
  const {
    ALUEEN_MAANOSA, MAAN_MAANOSA, MAANOSAT, kaupunginMaanosa,
  } = await import('../js/kaupunkimusiikki.js');
  let maita = 0;
  for (const { id } of PACKS) {
    const pakka = packById(id);
    for (const [kaupunki, maa] of Object.entries(pakka.map?.cityCountry ?? {})) {
      maita += 1;
      const maanosa = kaupunginMaanosa(kaupunki, maa);
      assert.ok(MAANOSAT.includes(maanosa),
        `${pakka.id}/${kaupunki} (${maa}): ei maanosaa — lisää maa js/kaupunkimusiikki.js MAAN_MAANOSA-tauluun`);
    }
  }
  assert.ok(maita > 300, `pakoista luettiin vain ${maita} kaupunkia`);
  // Taulut ovat sisäisesti ehjiä: jokainen alue saa maanosan, eikä
  // alueellinen maa ole maanosataulussa (se kulkee alueen kautta,
  // jotta kaupunkipoikkeus pätee myös maanosaan).
  assert.deepEqual(Object.keys(ALUEEN_MAANOSA).sort(), Object.keys(ALUERAIDAT).sort());
  for (const maanosa of [...Object.values(ALUEEN_MAANOSA), ...Object.values(MAAN_MAANOSA)]) {
    assert.ok(MAANOSAT.includes(maanosa), `tuntematon maanosa ${maanosa}`);
  }
  for (const maa of Object.keys(MAAN_MAANOSA)) {
    assert.ok(!Object.hasOwn(ALUEEN_MAAT, maa), `${maa}: sekä alue- että maanosataulussa`);
  }
  assert.equal(Object.keys(MAAN_MAANOSA).length, 89, 'määrittelyn maalista: 89 maata ilman aluetta');
  assert.equal(kaupunginMaanosa('marseille', 'FRA'), 'valimeri');
  assert.equal(kaupunginMaanosa('etusivu'), null);
});

test('maanosaraidat: kaikki kymmenen (vaiheet 2 ja 3), tiedostot työkalun mukaan', async () => {
  const { MAANOSARAIDAT, MAANOSAT, maanosanMusiikki } = await import('../js/kaupunkimusiikki.js');
  assert.deepEqual(Object.keys(MAANOSARAIDAT).sort(), [...MAANOSAT].sort());
  for (const maanosa of Object.keys(MAANOSARAIDAT)) {
    assert.ok(MAANOSAT.includes(maanosa));
    const tunnus = maanosaraidanTunnus(maanosa);
    assert.equal(tunnus, `musa-maanosa-${maanosa}`);
    assert.equal(maanosanMusiikki(maanosa), `assets/audio/${tunnus}${MUSIIKIN_PAATE}.mp3`);
    const raita = suunnitelmanRaita(tunnus);
    assert.ok(raita, `${tunnus}: työkalussa ei ole raitaa`);
    assert.equal(raita.looppi, true, `${tunnus}: maanosaraita soi minuutteja — sen on kierrettävä`);
    assert.ok(MAANOSARAIDAT[maanosa].kuvaus);
  }
  // Kypros: ei aluetta, joten maanosaraita on ketjun ainoa oma raita.
  assert.deepEqual(musiikkiketju('nikosia', 'CYP'), [MAANOSA_VALIMERI, POHJA]);
  // Alue voittaa maanosan: Edinburgh → Britteinsaaret → Länsi-Eurooppa.
  assert.deepEqual(musiikkiketju('edinburgh', 'GBR'), [
    musaPolku(kaupunkiraidanTunnus('britteinsaaret')), MAANOSA_LANSI, POHJA,
  ]);
  // Itä-Euroopalla on alueraita ja (vaihe 3) maanosaraita.
  assert.deepEqual(musiikkiketju('moskova', 'RUS'), [
    musaPolku(kaupunkiraidanTunnus('ita-eurooppa')), musaPolku(maanosaraidanTunnus('ita-eurooppa')), POHJA,
  ]);
  // Tunnuskaupunki (vaihe 3): oma kappale alueen edellä.
  assert.equal(musiikkiketju('lontoo', 'GBR')[0], musaPolku(kaupunkiraidanTunnus('lontoo')));
});

test('tilaraitojen järjestys: lehti, matkalaukku, kohtaaminen', () => {
  nollaaMusiikkivalitsin();
  assert.deepEqual(Object.keys(TILARAIDAT), ['lehti', 'matkalaukku', 'kohtaaminen']);
  assert.equal(TILARAIDAT.kohtaaminen.tunnus, 'musa-kohtaaminen');
  asetaMusiikkitila('kohtaaminen', true);
  assert.deepEqual(musiikkiketju('ateena', 'GRC'), [
    musaPolku('musa-kohtaaminen'),
    musaPolku(kaupunkiraidanTunnus('ateena')),
    musaPolku(kaupunkiraidanTunnus('valimeri')),
    MAANOSA_VALIMERI,
    POHJA,
  ]);
  // Lehti kohtaamisen päälle: pelaaja lukee, lehti voittaa.
  asetaMusiikkitila('lehti', true);
  assert.equal(valitseMusiikki(new Set(), 'ateena', 'GRC'), musaPolku('musa-lehti'));
  asetaMusiikkitila('lehti', false);
  assert.equal(valitseMusiikki(new Set(), 'ateena', 'GRC'), musaPolku('musa-kohtaaminen'));
  nollaaMusiikkivalitsin();
});

test('visa voittaa kohtaamisen, ja kohtaaminen palaa visan jälkeen', () => {
  nollaaMusiikkivalitsin();
  let herätyksiä = 0;
  valitsin.kuunteleMusiikkitilaa(() => { herätyksiä += 1; });
  asetaMusiikkitila('kohtaaminen', true);
  valitsin.asetaVisaSoi(true);
  assert.equal(valitsin.visaSoiNyt(), true);
  // Visan alla soi se, mikä soisi ilman kohtaamista.
  assert.equal(valitseMusiikki(new Set(), 'ateena', 'GRC'),
    musaPolku(kaupunkiraidanTunnus('ateena')));
  assert.ok(!musiikkiketju('ateena', 'GRC').includes(musaPolku('musa-kohtaaminen')));
  // Tila ei kadonnut: se on yhä auki.
  assert.deepEqual(musiikkitilat(), ['kohtaaminen']);
  // Visa ei koske muihin tiloihin.
  asetaMusiikkitila('matkalaukku', true);
  assert.equal(valitseMusiikki(new Set(), 'ateena', 'GRC'), musaPolku('musa-matkalaukku'));
  asetaMusiikkitila('matkalaukku', false);
  valitsin.asetaVisaSoi(false);
  assert.equal(valitseMusiikki(new Set(), 'ateena', 'GRC'), musaPolku('musa-kohtaaminen'));
  // Sama lippu kahdesti ei herätä uudestaan.
  const ennen = herätyksiä;
  valitsin.asetaVisaSoi(false);
  assert.equal(herätyksiä, ennen);
  nollaaMusiikkivalitsin();
  assert.equal(valitsin.visaSoiNyt(), false, 'nollaus ei laskenut visan lippua');
});

test('soitin: kohtaaminen vaihtaa raidan, visa vie sen alta ja palauttaa', async () => {
  const s = await lataaAmbienssi();
  await saavu(s, 'ateena', 'GRC');
  const ATEENA = musaPolku(kaupunkiraidanTunnus('ateena'));
  assert.equal(s.mod.soivaPohjaMusiikki(), ATEENA);
  const vaihe = async () => { await Promise.resolve(); await ajaHaivytykset(s.kello); };
  asetaMusiikkitila('kohtaaminen', true);
  await vaihe();
  assert.equal(s.mod.soivaPohjaMusiikki(), musaPolku('musa-kohtaaminen'), 'kohtaaminen ei alkanut');
  s.mod.startQuizMusic('maailmankartta');
  await vaihe();
  assert.equal(s.mod.soivaPohjaMusiikki(), ATEENA, 'kohtaaminen jäi soimaan visan alle');
  s.mod.stopQuizMusic();
  await vaihe();
  assert.equal(s.mod.soivaPohjaMusiikki(), musaPolku('musa-kohtaaminen'),
    'kohtaaminen ei palannut kysymyksen jälkeen');
  asetaMusiikkitila('kohtaaminen', false);
  await vaihe();
  assert.equal(s.mod.soivaPohjaMusiikki(), ATEENA, 'kaupunki ei palannut kohtaamisen jälkeen');
});

test('kohtaamisen kytkennät: avaus, visa, tulos ja sulku (js/visa.js)', async () => {
  const VISA = lue('../js/visa.js');
  // Avaus ja sulku.
  assert.match(VISA, /asetaMusiikkitila\('kohtaaminen', onKohtaaminen\(quiz\)\)/,
    'renderQuiz ei avaa kohtaamista uudella kortilla');
  assert.match(VISA, /asetaMusiikkitila\('kohtaaminen', false\);\n\s+stopQuizMusic\(\);/,
    'sulku: kohtaamisen on sulkeuduttava ENNEN visan pysäytystä');
  // Visa odottaa tervehdyssivun yli ja alkaa kysymyssivulla.
  assert.match(VISA, /if \(!kohtaamisSivu\) startQuizMusic\(/);
  assert.match(VISA, /if \(kohtaamisSivu\) startQuizMusic\(/);
  // Tulos sekä vastauksesta että ajan loppumisesta.
  assert.match(VISA, /kohtaamisenTulos\(ui, quiz, Boolean\(quiz\.right\)\)/, 'answerQuiz ei soita tulosta');
  assert.match(VISA, /kohtaamisenTulos\(ui, quiz, false\)/, 'timeUp ei soita epäonnistumista');
  // Visan raita kysyy lipun.
  assert.match(AMBIENSSI, /asetaVisaSoi\(true\)/);
  assert.match(AMBIENSSI, /asetaVisaSoi\(false\)/);
  // Kuka on kohtaaminen: henkilö puhuu, muut muodot eivät.
  const { onKohtaaminen } = await import('../js/visa.js');
  const { TARINAKAARI } = await import('../js/packs/tarinakaari.js');
  const { KOHTAAMISET } = await import('../js/packs/kohtaamiset.js');
  const kaari = Object.keys(TARINAKAARI)[0];
  const tavallinen = Object.keys(KOHTAAMISET)[0];
  assert.equal(onKohtaaminen({ cityId: kaari, kaari: true }), true);
  assert.equal(onKohtaaminen({ cityId: tavallinen }), true);
  assert.equal(onKohtaaminen({ cityId: tavallinen, kind: 'puzzle' }), false);
  assert.equal(onKohtaaminen({ cityId: 'eiole' }), false);
  assert.equal(onKohtaaminen(null), false);
});

test('ratkaisu ja epäonnistuminen soivat aihekanavalla katkaisematta', () => {
  assert.match(UI, /ratkaisu: musaPolku\('musa-ratkaisu'\)/);
  assert.match(UI, /epaonnistuminen: musaPolku\('musa-epaonnistuminen'\)/);
  assert.match(UI, /soitaKohtaamisenTulos\(oikein\) \{\n\s+if \(this\.aarreMusiikki \|\| this\.radioPaalla\(\)\) return;/,
    'tulos ei saa katkaista soivaa aihetta');
  for (const tunnus of ['musa-ratkaisu', 'musa-epaonnistuminen']) {
    const raita = suunnitelmanRaita(tunnus);
    assert.ok(raita, `${tunnus}: työkalussa ei ole raitaa`);
    assert.equal(raita.looppi, false, `${tunnus}: one-shot`);
  }
  assert.ok(suunnitelmanRaita('musa-kohtaaminen')?.looppi, 'musa-kohtaaminen: looppi');
});

test('matkan aiheet soivat aarreaiheen paikassa', () => {
  // Kolme kertaraitaa, yksi soitin (soitaAarreMusiikki).
  assert.match(UI, /aloituslento: musaPolku\('musa-aloituslento'\)/);
  assert.match(UI, /loppu: musaPolku\('musa-loppu'\)/);
  assert.match(UI, /this\.soitaAarreMusiikki\(MATKAN_AIHEET\.aloituslento\)/,
    'aloituslento ei soita aihettaan');
  assert.match(UI, /this\.soitaSaapumistunnus\(city\)/, 'saapuminen ei soita tunnusta');
  assert.match(UI, /this\.soitaAarreMusiikki\(MATKAN_AIHEET\.loppu\)/, 'loppuaihe puuttuu');
  // Tunnus ei katkaise soivaa aihetta eikä soi aloituslennon kohteessa.
  assert.match(UI, /soitaSaapumistunnus\(city\) \{\n\s+if \(!city \|\| this\.aarreMusiikki \|\| this\.aloituslentoKesken/);
});
