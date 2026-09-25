import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import {
  KUVALINJA_SAANNOT, kaikkiBriefit, rakennaBrief,
} from '../tools/kohtaamisbriefit.mjs';
import { TARINAKAARI } from '../js/packs/tarinakaari.js';

const TYOKALU = fileURLToPath(new URL('../tools/kohtaamisbriefit.mjs', import.meta.url));

test('jokaisella kohtaamisella on kysymys, oikea vastaus ja kaupunki', () => {
  const briefit = kaikkiBriefit();
  assert.ok(briefit.length > 0);
  // Sama joukko kuin pelin tarinakaaressa — työkalu ei jätä ketään pois
  // eikä keksi kaupunkia, jota kaari ei tunne.
  assert.equal(briefit.length, Object.keys(TARINAKAARI).length);

  for (const b of briefit) {
    assert.ok(b.kaupunki?.tunnus, 'kaupungin tunnus puuttuu');
    assert.ok(b.kaupunki?.nimi, 'kaupungin nimi puuttuu');
    assert.ok(b.maa, `${b.kaupunki.tunnus}: maa puuttuu`);
    assert.ok(b.hahmo?.kuvaus, `${b.kaupunki.tunnus}: hahmon kuvaus puuttuu`);
    assert.ok(b.kohtaamispaikka, `${b.kaupunki.tunnus}: kohtaamispaikka puuttuu`);
    assert.ok(b.tilanne, `${b.kaupunki.tunnus}: tilanne (esittely) puuttuu`);
    assert.ok(b.kysymys, `${b.kaupunki.tunnus}: kysymys puuttuu`);
    assert.ok(b.oikeaVastaus?.teksti, `${b.kaupunki.tunnus}: oikea vastaus puuttuu`);
    assert.equal(b.oikeaVastaus.huomio, 'EI SAA NÄKYÄ KUVASSA');
    assert.ok(Array.isArray(b.vaaratVaihtoehdot) && b.vaaratVaihtoehdot.length >= 2,
      `${b.kaupunki.tunnus}: väärät vaihtoehdot puuttuvat`);
    // Oikea vastaus ei saa toistua väärien joukossa.
    assert.ok(!b.vaaratVaihtoehdot.includes(b.oikeaVastaus.teksti));
    assert.equal(typeof b.kuva?.tarkistettu, 'boolean');
  }
});

test('kysymys ja oikea vastaus vastaavat sanatarkasti pelin omaa dataa', () => {
  const rooma = rakennaBrief('rooma');
  const kaari = TARINAKAARI.rooma;
  assert.equal(rooma.kysymys, kaari.kysymys.q);
  assert.equal(rooma.oikeaVastaus.teksti, kaari.kysymys.vaihtoehdot[kaari.kysymys.oikea]);
  // Kohtaamispiste siirtyi 5.9.2026 Aventinuksen avaimenreiästä Trevin
  // luo, kun kaupungin kohtaamishenkilöksi tuli pasunisti Nico.
  assert.equal(rooma.kohtaamispaikka, 'Trevin suihkulähde');
  assert.equal(rooma.maa, 'Italia');
});

test('--kaupunki rajaa yhteen kohtaamiseen', () => {
  const briefit = kaikkiBriefit({ kaupunki: 'rooma' });
  assert.equal(briefit.length, 1);
  assert.equal(briefit[0].kaupunki.tunnus, 'rooma');
});

test('--vain-kuvattomat jättää tarkistetut kuvat pois', () => {
  const kaikki = kaikkiBriefit();
  const kuvattomat = kaikkiBriefit({ vainKuvattomat: true });
  assert.ok(kuvattomat.length < kaikki.length);
  assert.ok(kuvattomat.every((b) => !b.kuva.tarkistettu));
});

test('kaupungit ovat aakkosjärjestyksessä', () => {
  const briefit = kaikkiBriefit();
  const nimet = briefit.map((b) => b.kaupunki.nimi);
  const jarjestetty = [...nimet].sort((a, b) => a.localeCompare(b, 'fi'));
  assert.deepEqual(nimet, jarjestetty);
});

test('kuvalinjan tiivistelmässä on kymmenen sääntöä ja avainsanat', () => {
  assert.equal(KUVALINJA_SAANNOT.length, 10);
  const kaikki = KUVALINJA_SAANNOT.join(' ');
  assert.match(kaikki, /linssiin/);
  assert.match(kaikki, /puolivartalo/);
  assert.match(kaikki, /EI PALJASTETA/);
  assert.match(kaikki, /kalliokyyhky/);
  assert.match(kaikki, /vain harvoin/);
});

test('CLI: --md kirjoittaa yhden lohkon per kohtaaminen otsikkoon', () => {
  const dir = mkdtempSync(join(tmpdir(), 'kohtaamisbriefit-'));
  try {
    const ulos = join(dir, 'briefit.md');
    execFileSync('node', [TYOKALU, '--md', '--ulos', ulos]);
    const sisalto = readFileSync(ulos, 'utf8');
    const briefit = kaikkiBriefit();
    // Yksi "## "-otsikko kuvalinjan tiivistelmälle ja yksi per kohtaaminen.
    const otsikot = sisalto.match(/^## /gm) ?? [];
    assert.equal(otsikot.length, briefit.length + 1);
    for (const b of briefit) {
      assert.match(sisalto, new RegExp(`## ${b.kaupunki.nimi.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} \\(${b.kaupunki.tunnus}\\)`));
    }
    assert.match(sisalto, /EI SAA NÄKYÄ KUVASSA/);
    assert.doesNotMatch(sisalto, /kuvateksti|alt-teksti|R2/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('CLI: --json kirjoittaa saman määrän kohtaamisia kuin kaikkiBriefit', () => {
  const dir = mkdtempSync(join(tmpdir(), 'kohtaamisbriefit-'));
  try {
    const ulos = join(dir, 'briefit.json');
    execFileSync('node', [TYOKALU, '--json', '--ulos', ulos]);
    const data = JSON.parse(readFileSync(ulos, 'utf8'));
    assert.equal(data.kohtaamiset.length, kaikkiBriefit().length);
    assert.equal(data.lukumaara, data.kohtaamiset.length);
    assert.equal(data.kuvalinjaSaannot.length, 10);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('CLI: --md ja --json yhdessä tai puuttuva --ulos kaatuu selkeästi', () => {
  const dir = mkdtempSync(join(tmpdir(), 'kohtaamisbriefit-'));
  try {
    const ulos = join(dir, 'x.md');
    assert.throws(() => execFileSync('node', [TYOKALU, '--md', '--json', '--ulos', ulos], { stdio: 'pipe' }));
    assert.throws(() => execFileSync('node', [TYOKALU, '--md'], { stdio: 'pipe' }));
    assert.throws(() => execFileSync('node', [TYOKALU, '--md', '--kaupunki', 'ei-ole', '--ulos', ulos], { stdio: 'pipe' }));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
