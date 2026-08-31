/*
 * VIIVATASO — reitit, erikoispiirit ja maiden rajat omalla
 * läpinäkyvällä laattatasolla (omistaja 31.8.2026 ilta).
 *
 * === MITÄ TÄMÄ VARTIOI ==============================================
 *
 * Kolme asiaa, ja jokainen niistä voi rikkoutua HILJAA — ilman
 * virheilmoitusta, pelkkänä puuttuvana karttana:
 *
 *   1. LUETTELON MUOTO. Peli lukee viivatason vain `viivataso`-oliosta
 *      (versio, tasot, laatastot, rajat). Jos kenttä katoaa tai
 *      muuttaa muotoaan, kerros jää tyhjäksi eikä yksikään pyyntö
 *      lähde — kartalta puuttuvat reitit, piirit ja rajat, eikä
 *      mikään kaadu.
 *
 *   2. TYÖLISTA JA BITTIKARTTA SAMASTA FUNKTIOSTA. Peli pyytää vain
 *      ne laatat, jotka bittikartta tuntee. Jos peite laskettaisiin
 *      kahdesti eri tavalla, peli joko pyytäisi laattoja joita ei ole
 *      (404 jokaisesta) tai jättäisi pyytämättä laattoja jotka ovat —
 *      ja jälkimmäinen on näkymätön vika: kartalta puuttuu pala.
 *
 *   3. RAJASETTI ON DATAA. Omistajan peruste 31.8.2026 ilta: rajojen
 *      oma taso on tärkeä siksikin, että myöhemmin voidaan mallintaa
 *      *"eri valtioiden kehityksiä vuosien saatossa esim.
 *      maailmansotien aikaan"*. Siksi piirtopassi ei saa tuntea
 *      yhtäkään valtiota eikä setin nimeä: viivasto tulee syötteenä.
 *
 * Luettelo ajetaan oikealla työkalulla (`--vain-luettelo`) eikä
 * jäljitellä: juuri se komento ajetaan tuotannossa, ja testin arvo on
 * siinä, että se ajaa saman koodin.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { laudanProjektio } from '../tools/fokuskartta/piirto.js';
import { RAJASETIT, lueRajaviivasto, rajatLaudalle } from '../tools/fokuskartta/rajat.mjs';

const JUURI = fileURLToPath(new URL('..', import.meta.url));
const GENERAATTORI = join(JUURI, 'tools', 'generoi-laattapyramidi.mjs');
const PIIRTO = readFileSync(join(JUURI, 'tools', 'fokuskartta', 'maailmapiirto.js'), 'utf8');
const PYRAMIDI = readFileSync(join(JUURI, 'js', 'laattapyramidi.js'), 'utf8');

/** Luettelo tuoreena ajona; tasot rajattu, jotta koe on nopea. */
function ajaLuettelo(lisa = []) {
  const kansio = mkdtempSync(join(tmpdir(), 'viivataso-'));
  execFileSync(process.execPath, [
    GENERAATTORI, kansio,
    '--tasot', '0-5',
    '--versio', 'pohja-koe',
    '--viivaversio', 'viiva-koe',
    '--vain-luettelo',
    ...lisa,
  ], { stdio: 'pipe' });
  return JSON.parse(readFileSync(join(kansio, 'pyramidi.json'), 'utf8'));
}

const luettelo = ajaLuettelo();

/* ------------------------------------------------ 1. luettelon muoto */

test('luettelossa on viivataso-olio omalla versiollaan', () => {
  const vt = luettelo.viivataso;
  assert.ok(vt, 'viivataso-olio puuttuu luettelosta');
  assert.equal(vt.versio, 'viiva-koe',
    'viivatason versio ei tule --viivaversiosta — laatan osoite rakennetaan siitä');
  assert.notEqual(vt.versio, luettelo.versio,
    'viivaversion ON oltava erotettavissa pohjan versiosta, muuten '
    + 'uusintapoltto koskisi pohjan ikuiseen välimuistiin');
});

test('viivataso kattaa kaikki ajetut tasot (z0 mukaan lukien)', () => {
  const vt = luettelo.viivataso;
  assert.deepEqual(vt.tasot, [0, 1, 2, 3, 4, 5],
    'viivataso on olemassa joka tasolla — toisin kuin nostotaso, jota '
    + 'on vain z5-z7');
  for (const z of vt.tasot) {
    assert.equal(typeof vt.laatastot[z], 'string',
      `tason z${z} laatasto puuttuu tai ei ole base64-merkkijono`);
  }
});

test('viivataso-oliossa ei ole tiivistelistaa (reiteillä ei ole elävää kerrosta)', () => {
  assert.equal(luettelo.viivataso.nostot, undefined,
    'tiivistelista kuuluu vain nostotasolle: nosto piirretään myös elävänä '
    + 'ja peli tarvitsee tiedon siitä minkä merkin se saa vaientaa. '
    + 'Reitit, piirit ja rajat ovat vain laatoissa.');
});

test('rajasetin nimi on luettelossa, jotta aikakausisetit ovat datanvaihto', () => {
  assert.equal(luettelo.viivataso.rajat, 'nykyiset');
  assert.ok(RAJASETIT[luettelo.viivataso.rajat],
    'luettelon rajasetti ei ole tunnettujen settien joukossa');
});

test('nostotaso jää luetteloon viivatason rinnalle', () => {
  assert.ok(luettelo.nostotaso, 'nostotaso katosi kun viivataso lisättiin');
});

/* ------------------------- 2. työlista ja bittikartta samasta lähteestä */

/** Ykkösbittien määrä base64-bittikartassa. */
function bittejaPaalla(base64) {
  const tavut = Buffer.from(base64, 'base64');
  let n = 0;
  for (const t of tavut) n += t.toString(2).split('1').length - 1;
  return n;
}

test('luettelon bittikartta ja ajon työlista ovat sama luku', () => {
  /*
   * `--kuiva` tulostaa työlistan pituuden ("laattoja ajossa N"), ja se
   * lasketaan viivatasonPeitteestä. Luettelon bittikartta lasketaan
   * SAMASTA funktiosta. Jos luvut eroavat, jompikumpi kutsuu peitettä
   * eri parametreilla — ja peli pyytäisi laattoja, joita ajo ei
   * kirjoittanut.
   */
  const kansio = mkdtempSync(join(tmpdir(), 'viivataso-kuiva-'));
  const tuloste = execFileSync(process.execPath, [
    GENERAATTORI, kansio, '--viivataso', '--tasot', '0-5',
    '--versio', 'pohja-koe', '--viivaversio', 'viiva-koe', '--kuiva',
  ], { encoding: 'utf8', stdio: 'pipe' });
  const osuma = /laattoja ajossa (\d+)/.exec(tuloste);
  assert.ok(osuma, `työlistan pituutta ei löytynyt tulosteesta:\n${tuloste}`);
  const tyolista = Number(osuma[1]);
  const bitit = luettelo.viivataso.tasot
    .reduce((s, z) => s + bittejaPaalla(luettelo.viivataso.laatastot[z]), 0);
  assert.equal(bitit, tyolista,
    'bittikartta ja työlista eroavat — ne EIVÄT tule samasta funktiosta');
  assert.ok(tyolista > 0, 'peite on tyhjä');
});

test('uloimmalla tasolla on vain piirit ja rajat, ei reittejä', () => {
  /*
   * z0:lla reitin veto on alle 0,01 pikseliä leveä eikä Skia piirrä
   * siitä mitään (mitattu). Peite ei siis saa laskea reittilaattoja
   * sinne — muuten luettelo lupaisi täysin läpinäkyviä laattoja.
   * Tason koko on 2 x 1 laattaa, ja piirit kulkevat molempien yli.
   */
  const z0 = bittejaPaalla(luettelo.viivataso.laatastot[0]);
  assert.ok(z0 > 0 && z0 <= 2, `z0-peite ${z0} laattaa`);
});

/* ------------------------------------------------- 3. rajat ovat dataa */

test('rajapassi ei tunne yhtäkään valtiota eikä rajasettiä', () => {
  const alku = PIIRTO.indexOf('export function piirraRajatKankaalle');
  assert.ok(alku > 0, 'piirraRajatKankaalle puuttuu');
  const runko = PIIRTO.slice(alku, PIIRTO.indexOf('\n}\n', alku));
  assert.ok(!/nykyiset|RAJASETIT|admin_0|maatunnus/i.test(runko),
    'rajapassiin on vuotanut tieto rajasetistä — setin vaihdon on '
    + 'oltava datanvaihto, ei koodimuutos');
  assert.match(runko, /rajat\?\.length/,
    'rajapassi ei ota viivastoa parametrina');
});

test('rajaviivasto luetaan repon omasta setistä ja kääntyy laudalle', () => {
  const viivasto = lueRajaviivasto('nykyiset');
  assert.ok(viivasto.viivat.length > 1000,
    `rajaviivoja vain ${viivasto.viivat.length} — setti näyttää typistyneen`);
  assert.match(viivasto.lahde, /Natural Earth/);
  const kaava = laudanProjektio({
    tyyppi: 'miller', leveys: 12000, lon0: -175, pohjoinen: 76,
  });
  const laudalla = rajatLaudalle(viivasto, kaava);
  assert.ok(laudalla.length >= viivasto.viivat.length,
    'laudalle käännettyjä viivoja on vähemmän kuin lähteessä');
  for (const viiva of laudalla.slice(0, 200)) {
    for (const [x] of viiva) {
      assert.ok(x >= 0 && x < 12000, `x ${x} on laudan ulkopuolella`);
    }
  }
});

test('merirajoja ei haeta', () => {
  const hakija = readFileSync(join(JUURI, 'tools', 'hae-maiden-rajat.mjs'), 'utf8');
  assert.match(hakija, /boundary_lines_land/);
  assert.ok(!/boundary_lines_maritime|ne_10m_admin_0_countries/.test(hakija),
    'hakija noutaa muutakin kuin maalla kulkevat rajat');
});

/* ------------------------------------------------ 4. selaimen kerros */

test('viivataso on neljäs kerros eikä sitä häivytetä', () => {
  assert.match(PYRAMIDI, /pyramidiViivaKerros = el\('g', \{ class: 'pyramidi-viivataso' \}/,
    'viivakerrosta ei luoda');
  const alku = PYRAMIDI.indexOf('function paivitaViivataso');
  assert.ok(alku > 0, 'paivitaViivataso puuttuu');
  const runko = PYRAMIDI.slice(alku, PYRAMIDI.indexOf('\nfunction paivitaNostotaso', alku));
  assert.ok(!/opacity/.test(runko),
    'viivatasolla ei saa olla opacity-haaraa: kerros kattaa kaikki tasot, '
    + 'joten häivytys ei koskaan laukeaisi oikein');
});

test('viivalaatalla on oma osoite ja oma noutoavain', () => {
  assert.match(PYRAMIDI, /taso\.viiva/, 'laattaUrl ei tunne viivatasoa');
  assert.match(PYRAMIDI, /\/viivat\/z\$\{taso\.z\}/,
    'viivalaatan osoite ei mene viivat-alipolkuun');
  assert.match(PYRAMIDI, /taso\.viiva \? 'v'/,
    'viivalaatan noutoavaimella ei ole omaa etuliitettä — kerroksen '
    + 'kiinnitys merkitsisi pohjalaatan noudetuksi');
});

test('vanha luettelo ilman viivataso-oliota jättää kerroksen tyhjäksi', () => {
  const alku = PYRAMIDI.indexOf('function viivatasonTasot');
  const runko = PYRAMIDI.slice(alku, PYRAMIDI.indexOf('\n}\n', alku));
  assert.match(runko, /if \(!vt\?\.tasot\?\.length \|\| !vt\.laatastot\) return null;/,
    'viivatasonTasot ei palauta nullia vanhalla luettelolla — silloin '
    + 'peli pyytäisi laattoja, joita ämpärissä ei ole');
});
