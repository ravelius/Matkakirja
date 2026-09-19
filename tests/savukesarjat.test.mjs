/*
 * Savukesarjojen jako (savukekarsinta 19.9.2026,
 * docs/raportit/viesti-fable-savukekarsinta-20260919.md): PR-portti
 * `julkaisu`, harva sarja `harva` polkusuodattimineen ja `taysi`.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

import { globRegex, valitseHarvat, sarjaPr } from '../tools/savukkeet/valitse-harvat.mjs';
import { rakennaMatriisi } from '../tools/savukkeet/rakenna-matriisi.mjs';

const SARJAT = JSON.parse(readFileSync(new URL('../tools/savukkeet/sarjat.json', import.meta.url), 'utf8'));

test('julkaisu ja harva eivät jaa rivejä, ja taysi on niiden summa', () => {
  const j = new Set(SARJAT.julkaisu);
  for (const rivi of SARJAT.harva) assert.ok(!j.has(rivi), `${rivi} kahdessa sarjassa`);
  assert.equal(rakennaMatriisi('taysi').length, SARJAT.julkaisu.length + SARJAT.harva.length);
  assert.equal(rakennaMatriisi('julkaisu,harva').length, rakennaMatriisi('taysi').length);
});

test('jokaisella harvan sarjan rivillä on vartioidut polut, ja polut ovat olemassa', () => {
  for (const rivi of SARJAT.harva) {
    const globit = SARJAT.harvaPolut[rivi];
    assert.ok(globit?.length, `${rivi}: harvaPolut puuttuu`);
    for (const g of globit) {
      if (g.includes('*')) continue;
      assert.ok(existsSync(new URL(`../${g}`, import.meta.url)), `${rivi}: ${g} ei ole olemassa`);
    }
  }
});

test('glob: * pysyy kansiossa, ** ylittää sen', () => {
  assert.ok(globRegex('js/linssit/satelliitti*.js').test('js/linssit/satelliitti-avaruus.js'));
  assert.ok(!globRegex('js/luenta*.js').test('js/luenta/x.js'));
  assert.ok(globRegex('js/**').test('js/linssit/a/b.js'));
});

test('polkusuodatin: dokumentti ei laukaise mitään, linssi laukaisee omansa', () => {
  assert.deepEqual(valitseHarvat(['docs/raportit/x.md', 'js/tyohuone-raamattu.js'], SARJAT), []);
  const sat = valitseHarvat(['js/linssit/satelliitti-avaruus.js'], SARJAT);
  assert.ok(sat.includes('savuke-satelliittilinssi.mjs#isot'));
  assert.ok(sat.includes('savuke-astro-pallo.mjs#vartija-a'));
  assert.ok(!sat.includes('savuke-luentakuvat.mjs'));
  assert.deepEqual(valitseHarvat(['js/luenta.js'], SARJAT), ['savuke-luentakuvat.mjs']);
  // Rivin oma savuke laukaisee rivin.
  assert.ok(valitseHarvat(['tools/savukkeet/savuke-kaupunkipopup.mjs'], SARJAT)
    .includes('savuke-kaupunkipopup.mjs#1400'));
});

test('yhteinen apuri tai puuttuva lista ajaa koko harvan sarjan', () => {
  assert.deepEqual(valitseHarvat(['tools/savukkeet/aja-sarja.mjs'], SARJAT), SARJAT.harva);
  assert.deepEqual(valitseHarvat([], SARJAT), SARJAT.harva);
  assert.equal(sarjaPr(['README.md'], SARJAT), 'julkaisu');
  // Hitaat harvat jonon alkuun (seinäkello).
  assert.equal(sarjaPr(['js/luenta.js'], SARJAT), 'savuke-luentakuvat.mjs,julkaisu');
  assert.doesNotThrow(() => rakennaMatriisi(sarjaPr(['js/luenta.js'], SARJAT)));
});

test('työnkulku käyttää valitsinta PR:ssä ja ajaa täyden sarjan ajastettuna', () => {
  const yml = readFileSync(new URL('../.github/workflows/savukkeet.yml', import.meta.url), 'utf8');
  assert.match(yml, /schedule:\s*\n\s*- cron:/);
  assert.match(yml, /valitse-harvat\.mjs/);
  assert.match(yml, /github\.event_name == 'schedule'/);
  assert.match(yml, /taysi/);
});
