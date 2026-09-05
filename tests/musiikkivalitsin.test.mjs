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
  kaupunginAlue, kaupunginRaidat, kaupunkiraidanTunnus,
} = await import('../js/kaupunkimusiikki.js');
const valitsin = await import('../js/musiikkivalitsin.js');

const {
  PAIKKARAIDAT, POHJARAITA, TILARAIDAT,
  asetaMusiikkipaikka, asetaMusiikkitila, musiikkiketju, musiikkitilat,
  nollaaMusiikkivalitsin, valitseMusiikki,
} = valitsin;

const POHJA = musaPolku(POHJARAITA);

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
    POHJA,
  ]);
  // Sofialla ei ole omaa kappaletta: alue (Balkan) ottaa paikan.
  assert.deepEqual(musiikkiketju('sofia', 'BGR'), [
    musaPolku(kaupunkiraidanTunnus('balkan')),
    POHJA,
  ]);
  // Tuntematon maa (vieras lauta): suoraan pohjavireeseen.
  assert.deepEqual(musiikkiketju('kumasi', 'GHA'), [POHJA]);
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
  assert.deepEqual(musiikkiketju('etusivu'), [musaPolku('musa-etusivu'), POHJA]);
  asetaMusiikkitila('lehti', true);
  assert.deepEqual(musiikkiketju('etusivu'),
    [musaPolku('musa-lehti'), musaPolku('musa-etusivu'), POHJA]);
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
    POHJA,
  ]);
  asetaMusiikkitila('lehti', false);
  assert.deepEqual(musiikkitilat(), ['matkalaukku']);
  asetaMusiikkitila('matkalaukku', false);
  assert.deepEqual(musiikkitilat(), []);
  assert.deepEqual(musiikkiketju('ateena', 'GRC'), [
    musaPolku(kaupunkiraidanTunnus('ateena')),
    musaPolku(kaupunkiraidanTunnus('valimeri')),
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
  assert.deepEqual(TILOJEN_RAIDAT, Object.keys(pelinTilat),
    'työkalu ja js/musiikkivalitsin.js tuntevat eri tilaraidat');
  for (const nimi of TILOJEN_RAIDAT) {
    const raita = RAIDAT[nimi];
    const { tunnus } = pelinTilat[nimi];
    assert.equal(raita.tila, nimi, `${nimi}: työkalun tila-kenttä ei vastaa avainta`);
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
  // Ja työkalun tiedostonimet ovat samat tunnukset .mp3-päätteellä.
  for (const nimi of [...ALUEIDEN_RAIDAT, ...TILOJEN_RAIDAT]) {
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
      this.src = src;
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

test('puuttuva alueraita pudottaa pohjavireeseen, ei hiljaisuuteen', async () => {
  const s = await lataaAmbienssi();
  await saavu(s, 'sofia', 'BGR');
  const alue = s.musiikit().at(-1);
  // Ämpäri ei vastaa, eikä repon polku myöskään: kaksi virhettä.
  alue.laukaise('error');
  await Promise.resolve();
  alue.laukaise('error');
  await Promise.resolve();
  await ajaHaivytykset(s.kello);
  assert.equal(s.mod.soivaPohjaMusiikki(), POHJA,
    'puuttuva alueraita jätti pelin hiljaiseksi');
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
  await saavu(s, 'lontoo', 'GBR');
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
  assert.equal(s.mod.soivaPohjaMusiikki(), musaPolku('musa-etusivu'),
    'etusivun raita ei alkanut');
  await saavu(s, 'ateena', 'GRC');
  assert.equal(s.mod.soivaPohjaMusiikki(), musaPolku(kaupunkiraidanTunnus('ateena')));
});

test('kaupunginRaidat ei anna raitoja virtuaalipaikoille', () => {
  for (const paikka of ['jalkamatka', 'merimatka', 'lentomatka', 'etusivu', null, undefined]) {
    assert.deepEqual(kaupunginRaidat(paikka), [], `${paikka}: sai raidan tyhjästä`);
  }
});
