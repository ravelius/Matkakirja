/*
 * JOKITASO — JOET ILMAN REITTEJÄ PALLON LEPOKERROKSELLE (omistaja
 * 20.9.2026, kaappaus pariisi-ei-jokia-v1980.webp: "Loire"-nimiö ilman
 * jokea; Fablen päätös A). Ks. js/laattapyramidi.js JOKITASO ja
 * tools/generoi-laattapyramidi.mjs REITIT POIS VIIVATASOLTA.
 *
 * Kolme vartiota: 1) generaattorin liput --eireitit/--eirajat kirjautuvat
 * luetteloon ja kaventavat peitteen (sama malli kuin --eipiirit),
 * 2) generaattori välittää kytkimet jokaiseen piirtokutsuun, 3) pelin
 * puoli: jokitaso latautuu vain jokitaso-kentästä, viivatason paikalle
 * pallolle, ei tasokartalle, ja vanha luettelo ilman kenttää on v1980.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = fileURLToPath(new URL('..', import.meta.url));
const GENERAATTORI = join(JUURI, 'tools', 'generoi-laattapyramidi.mjs');
const PYRAMIDI = readFileSync(join(JUURI, 'js', 'laattapyramidi.js'), 'utf8');
const PALLOLAATAT = readFileSync(join(JUURI, 'js', 'pallolaatat.js'), 'utf8');
const PALLO = readFileSync(join(JUURI, 'js', 'pallo.js'), 'utf8');

function ajaLuettelo(lisa = []) {
  const kansio = mkdtempSync(join(tmpdir(), 'jokitaso-'));
  execFileSync(process.execPath, [
    GENERAATTORI, kansio, '--tasot', '0-5', '--versio', 'pohja-koe',
    '--viivaversio', 'joki-koe', '--vain-luettelo', ...lisa,
  ], { stdio: 'pipe' });
  return JSON.parse(readFileSync(join(kansio, 'pyramidi.json'), 'utf8'));
}
const bittejaPaalla = (b64) => {
  let n = 0;
  for (const c of Buffer.from(b64, 'base64')) for (let i = 0; i < 8; i += 1) n += (c >> i) & 1;
  return n;
};
const summa = (l) => l.viivataso.tasot.reduce((s, z) => s + bittejaPaalla(l.viivataso.laatastot[z]), 0);

test('--eireitit ja --eirajat kirjautuvat luetteloon ja kaventavat peitteen joiksi', () => {
  const kaikki = ajaLuettelo();
  const joet = ajaLuettelo(['--eipiirit', '--eireitit', '--eirajat']);
  assert.equal(kaikki.viivataso.reitit, undefined, 'oletusajo ei kirjoita reitit-kenttää (ämpärin luettelot ennallaan)');
  assert.equal(joet.viivataso.reitit, false, '--eireitit ei kirjautunut');
  assert.equal(joet.viivataso.rajat, 'ei', '--eirajat ei kirjautunut');
  assert.equal(joet.viivataso.piirit, false);
  assert.ok(summa(joet) < summa(kaikki), `peite ei kaventunut (${summa(joet)} vs ${summa(kaikki)})`);
  assert.ok(summa(joet) > 0, 'joet katosivat reittien ja rajojen mukana');
  // Pelkkä --eireitit jättää rajat: peite on jokien ja rajojen välissä.
  const ilmanReitteja = ajaLuettelo(['--eireitit']);
  assert.ok(summa(ilmanReitteja) > summa(joet) && summa(ilmanReitteja) <= summa(kaikki),
    `reitit pois: ${summa(ilmanReitteja)} (joet ${summa(joet)}, kaikki ${summa(kaikki)})`);
});

test('generaattori välittää reitti- ja rajakytkimen jokaiseen viivatason piirtoon', () => {
  const lahde = readFileSync(GENERAATTORI, 'utf8');
  const kutsut = lahde.match(/passit: \{[^}]*\}/g) ?? [];
  assert.ok(kutsut.length >= 3, `viivatason piirtokutsuja löytyi ${kutsut.length}`);
  for (const k of kutsut) {
    assert.match(k, /reitit: REITIT &&/, `piirtokutsu ilman reittikytkintä: ${k}`);
    assert.match(k, /rajat: RAJAT/, `piirtokutsu ilman rajakytkintä: ${k}`);
  }
  assert.match(lahde, /const VIIVAOSAT = \(PIIRIT && REITIT && RAJAT && JOET\) \? null\n  : \{ piirit: PIIRIT, reitit: REITIT, rajat: RAJAT, joet: JOET \};/,
    'peite ei kulje samoilla kytkimillä kuin piirto');
});

test('pelin puoli: jokitaso on oma kenttä, viivatason paikalla pallolla, ei tasokartalla', () => {
  // Kenttä, polku ja noutoavain.
  const alku = PYRAMIDI.indexOf('function jokitasonTasot');
  assert.ok(alku > 0, 'jokitasonTasot puuttuu');
  const runko = PYRAMIDI.slice(alku, PYRAMIDI.indexOf('\n}\n', alku));
  assert.match(runko, /if \(!jt\?\.versio \|\| !jt\.tasot\?\.length \|\| !jt\.laatastot\) return null;/,
    'vanha luettelo ilman jokitasoa ei palauta nullia');
  assert.match(runko, /joki: true,/);
  assert.match(PYRAMIDI, /if \(taso\.joki\) return luettelo\?\.jokitaso\?\.versio \?\? '';/);
  assert.match(PYRAMIDI, /\$\{luettelo\.jokitaso\.versio\}\/viivat\/z\$\{taso\.z\}/, 'jokitason polku ei ole <jokiversio>/viivat/');
  assert.match(PYRAMIDI, /if \(taso\.joki\) return 'j';/, 'jokitasolla ei omaa noutoetuliitettä');
  // Pallon kerroslista: joki viivatason jälkeen, noston edellä (molemmissa haaroissa).
  assert.equal((PYRAMIDI.match(/jokitasonTasot\(\)\?\.find\(\(t\) => t\.z === z\)/g) ?? []).length, 2);
  // Tasokartan kerrospäivitys ja tasovaihto EIVÄT tunne jokitasoa (tuplamuste viivatason kanssa).
  const tasovaihto = PYRAMIDI.slice(PYRAMIDI.indexOf('jonotaTasovaihto([...tasot'), PYRAMIDI.indexOf('jonotaTasovaihto([...tasot') + 200);
  assert.doesNotMatch(tasovaihto, /jokitasonTasot/);
  assert.doesNotMatch(PYRAMIDI, /paivitaJokitaso/);
  // Pallo: lepokerros ja laattakerros suodattavat joen omalla portillaan.
  assert.match(PALLOLAATAT, /joki: Boolean\(pyramidi\.jokitaso\?\.versio\) && !astronautti,/);
  assert.match(PALLOLAATAT, /if \(k\.joki\) return kerrokset\.joki;/);
  assert.match(PALLO, /t\.joki \? kerrokset\.joki/);
});
