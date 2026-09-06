/*
 * RANTATASO — rantaviiva omalla läpinäkyvällä laattatasollaan
 * (omistaja 6.9.2026 ilta, sanatarkasti: *"joo poltetaan vain
 * uudestaan ilman viivaa nyt kun on mac studio viritetty"*).
 *
 * === MITÄ TÄMÄ VARTIOI ==============================================
 *
 * Neljä asiaa, ja jokainen niistä voi rikkoutua HILJAA — ilman
 * virheilmoitusta, pelkkänä kartalta kadonneena rantaviivana:
 *
 *   1. LUETTELON MUOTO. Peli lukee rantatason vain `rantataso`-oliosta
 *      (versio, tasot, laatastot). Jos kenttä katoaa tai muuttaa
 *      muotoaan, kerros jää tyhjäksi — ja koska pohja on poltettu
 *      ILMAN rantaviivaa, kartalla ei silloin ole rantaviivaa
 *      lainkaan.
 *
 *   2. KENTTÄ EI SAA SYNTYÄ VAHINGOSSA. Rantataso-olio luetteloon
 *      ilman ämpärissä olevia laattoja tarkoittaisi 404:n jokaisesta
 *      pyynnöstä. Siksi se syntyy vain, kun rantataso on pyydetty
 *      (--rantataso tai --rantaversio).
 *
 *   3. KERROSJÄRJESTYS pohja → ranta → viiva → nosto. Rantaviiva oli
 *      pohjapiirron osiossa 4 eli reittien, rajojen ja nostojen ALLA;
 *      omalla tasollaan sen on oltava samassa välissä, tai reitti
 *      kulkisi rantaviivan alta.
 *
 *   4. VANHA LUETTELO. Ilman `rantataso`-kenttää kerros jää tyhjäksi
 *      eikä yksikään pyyntö lähde — juuri se tekee selainmuutoksesta
 *      julkaisukelpoisen ennen laattojen polttoa.
 *
 * Luettelo ajetaan oikealla työkalulla (`--vain-luettelo`) eikä
 * jäljitellä: juuri se komento ajetaan tuotannossa.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { RANTATYYLI } from '../tools/fokuskartta/maailmapiirto.js';

const JUURI = fileURLToPath(new URL('..', import.meta.url));
const GENERAATTORI = join(JUURI, 'tools', 'generoi-laattapyramidi.mjs');
const PIIRTO = readFileSync(join(JUURI, 'tools', 'fokuskartta', 'maailmapiirto.js'), 'utf8');
const PYRAMIDI = readFileSync(join(JUURI, 'js', 'laattapyramidi.js'), 'utf8');
const PALLOLAATAT = readFileSync(join(JUURI, 'tools', 'tee-pallolaatat.mjs'), 'utf8');
const POLTTO = readFileSync(join(JUURI, 'tools', 'polta-paikallisesti.sh'), 'utf8');

/*
 * RANTAVIIVAN PEITE LUETAAN NATURAL EARTHISTÄ, eikä 10 megatavun
 * aineistoa ole testiympäristössä. Peitteen ja luettelon kokeet
 * ohitetaan silloin; muoto- ja kerrosjärjestyskokeet eivät tarvitse
 * aineistoa lainkaan ja ajetaan aina.
 */
const DATA = process.env.FOKUSKARTTA_DATA ?? join(tmpdir(), 'matkakirja-fokuskartta');
const ONKO_DATAA = existsSync(join(DATA, 'ne_10m_ocean.geojson'));
const ohitaData = ONKO_DATAA ? false : `ei rantaviiva-aineistoa (${DATA}/ne_10m_ocean.geojson)`;

/** Luettelo tuoreena ajona; tasot rajattu, jotta koe on nopea. */
function ajaLuettelo(lisa = [], tasot = '0-3') {
  const kansio = mkdtempSync(join(tmpdir(), 'rantataso-'));
  execFileSync(process.execPath, [
    GENERAATTORI, kansio,
    '--tasot', tasot,
    '--versio', 'pohja-koe',
    '--data', DATA,
    '--vain-luettelo',
    ...lisa,
  ], { stdio: 'pipe' });
  return JSON.parse(readFileSync(join(kansio, 'pyramidi.json'), 'utf8'));
}

/** Työlista samasta komennosta (`--vain-lista`). */
function ajaLista(lisa = []) {
  const kansio = mkdtempSync(join(tmpdir(), 'rantalista-'));
  execFileSync(process.execPath, [
    GENERAATTORI, kansio,
    '--tasot', '0-3',
    '--versio', 'pohja-koe',
    '--data', DATA,
    '--vain-lista',
    ...lisa,
  ], { stdio: 'pipe' });
  return JSON.parse(readFileSync(join(kansio, 'laatat.json'), 'utf8'));
}

/** Bittikartan ykkösbitit joukkona "z:sarake:rivi". */
function bitit(luettelo, laatastot) {
  const joukko = new Set();
  for (const [z, b64] of Object.entries(laatastot)) {
    const taso = luettelo.tasot.find((t) => t.z === Number(z));
    const tavut = Buffer.from(b64, 'base64');
    for (let rivi = 0; rivi < taso.riveja; rivi += 1) {
      for (let sarake = 0; sarake < taso.sarakkeita; sarake += 1) {
        const i = rivi * taso.sarakkeita + sarake;
        if ((tavut[i >> 3] >> (i & 7)) & 1) joukko.add(`${z}:${sarake}:${rivi}`);
      }
    }
  }
  return joukko;
}

/* ------------------------------------------------ 1. luettelon muoto */

test('pohja.rantaviiva: false kirjautuu vain --ilman-rantaviivaa-ajossa', () => {
  const tavallinen = ajaLuettelo();
  assert.equal(tavallinen.pohja, undefined,
    'vanha pohja EI saa saada pohja-kenttää — sen puuttuminen tarkoittaa '
    + '"rantaviiva on pohjassa", ja väärä kenttä valehtelisi ämpäristä');
  const rannaton = ajaLuettelo(['--ilman-rantaviivaa']);
  assert.equal(rannaton.pohja?.rantaviiva, false,
    '--ilman-rantaviivaa ei kirjaudu luetteloon; ämpäristä ei silloin näe, '
    + 'kummasta pohjasta on kyse');
});

test('rantataso-kenttä syntyy vain pyydettäessä', { skip: ohitaData }, () => {
  const tavallinen = ajaLuettelo();
  assert.equal(tavallinen.rantataso, null,
    'rantataso-olio luetteloon ilman ämpärin laattoja = 404 jokaisesta pyynnöstä');
  const pyydetty = ajaLuettelo(['--rantaversio', 'ranta-koe', '--ilman-rantaviivaa']);
  assert.ok(pyydetty.rantataso, 'rantataso-olio puuttuu, vaikka --rantaversio annettiin');
  assert.equal(pyydetty.rantataso.versio, 'ranta-koe',
    'rantatason versio ei tule --rantaversiosta — laatan osoite rakennetaan siitä');
  assert.notEqual(pyydetty.rantataso.versio, pyydetty.versio,
    'rantaversion ON oltava erotettavissa pohjan versiosta, muuten uusintapoltto '
    + 'koskisi pohjan ikuiseen välimuistiin');
  assert.deepEqual(pyydetty.rantataso.tasot, [0, 1, 2, 3],
    'rantaviiva on kartalla joka tasolla, joten taso kattaa kaikki ajetut tasot');
});

test('rantatasossa ei ole tiivistelistaa (rantaviivalla ei ole elävää kerrosta)',
  { skip: ohitaData }, () => {
    const j = ajaLuettelo(['--rantaversio', 'ranta-koe', '--ilman-rantaviivaa']);
    assert.deepEqual(Object.keys(j.rantataso).sort(), ['laatastot', 'tasot', 'versio']);
  });

test('nosto- ja viivataso jäävät luetteloon rantatason rinnalle', { skip: ohitaData }, () => {
  // Nostolaattoja on vasta z5:stä alkaen (NOSTO_ALIN), joten kolme
  // kerrosta näkyy yhtä aikaa vain z5:een asti ajetussa luettelossa.
  const j = ajaLuettelo(['--rantaversio', 'ranta-koe', '--ilman-rantaviivaa'], '0-5');
  assert.ok(j.nostotaso?.versio, 'nostotaso katosi rantatason myötä');
  assert.ok(j.viivataso?.versio, 'viivataso katosi rantatason myötä');
  assert.ok(j.rantataso?.versio, 'rantataso katosi nosto- ja viivatason rinnalta');
});

/* -------------------------------------- 2. työlista ja bittikartta */

test('luettelon bittikartta ja ajon työlista ovat sama luku', { skip: ohitaData }, () => {
  const luettelo = ajaLuettelo(['--rantaversio', 'ranta-koe', '--ilman-rantaviivaa']);
  const lista = ajaLista(['--rantataso', '--rantaversio', 'ranta-koe']);
  const kartasta = bitit(luettelo, luettelo.rantataso.laatastot);
  const listasta = new Set(lista.laatat.map(([z, s, r]) => `${z}:${s}:${r}`));
  assert.equal(lista.rantataso, true, '--vain-lista ei kirjaa rantatasoajoa');
  assert.deepEqual([...listasta].sort(), [...kartasta].sort(),
    'työlista ja luettelon bittikartta eroavat — peli pyytäisi laattoja joita ei ole '
    + 'tai jättäisi pyytämättä laattoja jotka ovat');
});

test('rantalaattoja on vain rannikolla, ei koko tasoa', { skip: ohitaData }, () => {
  const luettelo = ajaLuettelo(['--rantaversio', 'ranta-koe', '--ilman-rantaviivaa']);
  const z3 = luettelo.tasot.find((t) => t.z === 3);
  const kartasta = [...bitit(luettelo, { 3: luettelo.rantataso.laatastot[3] })];
  const kaikki = z3.sarakkeita * z3.riveja;
  assert.ok(kartasta.length > 0, 'z3:lla ei ole yhtään rantalaattaa');
  assert.ok(kartasta.length < kaikki,
    `z3:n rantapeite on koko taso (${kartasta.length}/${kaikki}) — peite ei rajaa mitään`);
});

/* ------------------------------------------------ 3. piirto */

test('rantaviivan muste on yhdessä paikassa, ja pohja voi jättää sen pois', () => {
  assert.match(PIIRTO, /export function piirraRannikkoKankaalle\(/,
    'yhteistä rannikkofunktiota ei ole — kaksi kopiota ajautuisi eri levyisiksi');
  assert.match(PIIRTO, /if \(tyyli\.rantaviiva !== false\) \{\s*\n\s*piirraRannikkoKankaalle\(/,
    'pohjapiirron osio 4 ei kutsu yhteistä funktiota kytkimen takaa');
  assert.match(PIIRTO, /export function piirraRantataso\(/,
    'rantatason piirtoa ei ole');
  assert.equal(RANTATYYLI.usva.leveys, 3);
  assert.equal(RANTATYYLI.muste.leveys, 1.1);
  assert.equal(RANTATYYLI.usva.vari, 'rgba(74,52,33,0.18)');
  assert.equal(RANTATYYLI.muste.vari, 'rgba(58,40,25,0.85)');
});

test('kytkin on oletuksena pois: vanhat lehdet ja pilotit eivät muutu', () => {
  /*
   * `tyyli.rantaviiva !== false` tarkoittaa, että kenttä on pakko
   * asettaa nimenomaan falseksi. Yksikään vanha kutsuja ei tee sitä,
   * eli jokainen niistä saa rantaviivan kuten ennen.
   */
  assert.doesNotMatch(PIIRTO, /rantaviiva\s*[?]{2}\s*false/,
    'oletusarvo ei saa olla false — vanhat lehdet menettäisivät rantaviivan');
});

/* ------------------------------------------------ 4. kerrokset pelissä */

test('rantataso on pohjan ja viivatason VÄLISSÄ, eikä sitä häivytetä', () => {
  const ranta = PYRAMIDI.indexOf("class: 'pyramidi-rantataso'");
  const viiva = PYRAMIDI.indexOf("class: 'pyramidi-viivataso'");
  const nosto = PYRAMIDI.indexOf("class: 'pyramidi-nostotaso'");
  const tarkka = PYRAMIDI.indexOf("class: 'pyramidi-tarkkataso'");
  assert.ok(tarkka > 0 && ranta > tarkka, 'rantakerros ei ole tarkan tason jälkeen');
  assert.ok(ranta < viiva, 'rantakerros ei ole viivatason ALLA (reitti kulkisi sen alta)');
  assert.ok(viiva < nosto, 'viivakerros ei ole nostotason alla');
  assert.doesNotMatch(PYRAMIDI,
    /pyramidiRantaKerros[\s\S]{0,200}?style\.(opacity|transition)/,
    'rantatasoa ei saa häivyttää: se on olemassa joka tasolla');
});

test('rantalaatalla on oma osoite ja oma noutoavain', () => {
  assert.match(PYRAMIDI, /taso\.ranta[\s\S]{0,160}\/ranta\/z\$\{taso\.z\}/,
    'rantalaatan osoite ei mene ranta-alipolkuun');
  assert.match(PYRAMIDI, /if \(taso\.ranta\) return 'r';/,
    'rantalaatta jakaisi noutoavaimen pohjalaatan kanssa');
});

/* --------------------------- 5. moduuli oikealla ja vanhalla luettelolla */

/** Pyramidimoduuli tuoreena, kun luettelona on `j`. */
async function moduuliLuettelolla(j, tunnus) {
  const vanhaFetch = globalThis.fetch;
  globalThis.fetch = async () => ({ ok: true, json: async () => j });
  try {
    const m = await import(`../js/laattapyramidi.js?rantakoe=${tunnus}`);
    await m.haePyramidinLuettelo();
    return m;
  } finally {
    globalThis.fetch = vanhaFetch;
  }
}

/*
 * Pieni synteettinen luettelo: taso z3 on 2 x 2 laattaa, ja pohjan
 * `laatasto: null` tarkoittaa "kaikki olemassa". Merkkitasojen
 * bittikartassa 0b0011 = ylärivin kaksi laattaa ovat, alarivin eivät —
 * juuri se ero, jonka peli lukee pyytääkseen vain olemassa olevia.
 */
const KOEBITIT = Buffer.from([0b0011]).toString('base64');

function tekoLuettelo(lisat = {}) {
  return {
    versio: 'p1',
    laatta: 512,
    muoto: 'webp',
    arkki: { x: 0, y: 0, w: 12000, h: 7300 },
    tasot: [{
      z: 3, leveys: 5400, korkeus: 3288, sarakkeita: 2, riveja: 2, laatasto: null,
    }],
    ...lisat,
  };
}

test('vanha luettelo ilman rantataso-oliota jättää kerroksen tyhjäksi', async () => {
  const m = await moduuliLuettelolla(tekoLuettelo(), 'vanha');
  const kerrokset = m.pyramidinKerrostasot(3);
  assert.equal(kerrokset.length, 1,
    'vanhassa luettelossa on vain pohja — rantakerrosta ei saa keksiä');
  assert.equal(kerrokset[0].ranta, undefined);
});

test('uusi luettelo antaa kerrokset järjestyksessä pohja, ranta, viiva, nosto', async () => {
  const j = tekoLuettelo({
    rantataso: { versio: 'r1', tasot: [3], laatastot: { 3: KOEBITIT } },
    viivataso: { versio: 'v1', tasot: [3], laatastot: { 3: KOEBITIT } },
  });
  const m = await moduuliLuettelolla(j, 'uusi');
  const kerrokset = m.pyramidinKerrostasot(3);
  assert.deepEqual(kerrokset.map((t) => (t.ranta ? 'ranta' : (t.viiva ? 'viiva' : 'pohja'))),
    ['pohja', 'ranta', 'viiva'],
    'kerrosjärjestyksen on oltava pohja → ranta → viiva (→ nosto)');
  const ranta = kerrokset[1];
  assert.equal(m.pyramidinLaattaUrl(ranta, 1, 0),
    'https://media.matkakirja.app/julisteet/pyramidi/r1/ranta/z3/1/0.webp');
  assert.equal(m.pyramidinLaattaOlemassa(ranta, 1, 0), true);
  assert.equal(m.pyramidinLaattaOlemassa(ranta, 1, 1), false,
    'rantatason bittikartta ei rajaa mitään — peli pyytäisi laattoja joita ei ole');
});

/* ------------------------------------------------ 6. pallon sarja */

test('pallon sarja yhdistää rantatason ja osaa jättää sen pois', () => {
  assert.match(PALLOLAATAT, /--ilman-rantaa/,
    'pallon sarjalta puuttuu lippu, jolla rantataso jätetään pois (vektori korvaa)');
  assert.match(PALLOLAATAT, /rantaversio\).*ranta\/z\$\{z\}/,
    'rantataso ei tule pallon laatan kerroksiin');
  const ranta = PALLOLAATAT.indexOf('${rantaversio}/ranta/z');
  const viiva = PALLOLAATAT.indexOf('${viivaversio}/viivat/z');
  assert.ok(ranta > 0 && ranta < viiva,
    'kerrosjärjestyksen on oltava sama kuin tasokartalla: ranta ennen viivaa');
  assert.match(PALLOLAATAT, /ranta: ranta \? \(luettelo\.rantataso\?\.versio \?\? null\) : null,/,
    'pallon laatat.json ei kerro rantatason versiota — lepokerroksen versiovahti '
    + 'ei silloin tiedä, onko rantaviiva sarjassa');
});

test('paikallinen poltto ajaa rantatason omiin shardeihinsa ja omaan versiopolkuunsa', () => {
  assert.match(POLTTO, /--ilman-rantaviivaa\)\s*ILMAN_RANTAVIIVAA=1/,
    'polttoskriptillä ei ole --ilman-rantaviivaa-lippua');
  assert.match(POLTTO, /ranta-z0-z7\|--tasot 0-7 \$rantaarg/,
    'rantatason z0-z7-shardi puuttuu');
  assert.match(POLTTO, /ranta-z8-%02d/, 'rantatason z8-kaistat puuttuvat');
  assert.match(POLTTO, /julisteet\/pyramidi\/\$RANTAVERSIO\/ranta/,
    'rantatason vienti ei mene omaan versiopolkuunsa');
  assert.match(POLTTO, /rantalippu="--ilman-rantaa"/,
    'pallon sarja poltettaisiin rantaviivan kanssa, vaikka pallolla se on vektori');
});
