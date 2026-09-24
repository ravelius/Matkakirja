/*
 * POLTETUT NOSTOT, NIMET ELÄVINÄ (Fable 23.9.2026, koe `poltetutnostot`).
 *
 * Kohdemaan nostotaso poltetaan ilman nimiä (tools/generoi-laattapyramidi.mjs
 * --nostot-ilman-nimioita → luettelon `nostotasot[ISO].nimiot: false`).
 * Kokeessa pallo lataa maan nostolaatat (js/pallolaatat.js
 * lepokerroksenKerrokset) ja nostokerros piirtää poltetuille nostoille vain
 * nimen (js/pallolauta/nostot.js `pisteLaatassa`, GL-runko ja CSS2D).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { lepokerroksenKerrokset } from '../js/pallolaatat.js';
import { glOnHehkupiste } from '../js/pallolauta/glnimiot-sovitin.js';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const JUURI = new URL('..', import.meta.url).pathname;

test('portti: maan nostolaatat pallolle vain kokeessa ja vain nimettömästä laatastosta', () => {
  const kirjaus = (nimiot) => ({ versio: 'N1', tasot: [5, 6, 7, 8], laatastot: {}, ...(nimiot === false ? { nimiot: false } : {}) });
  const pyramidi = (nimiot) => ({ versio: 'A', nostotasot: { FRA: kirjaus(nimiot) } });
  const sarja = { versio: 'A' };
  assert.equal(lepokerroksenKerrokset(sarja, pyramidi(false), 'FRA', { poltetutNostot: true }).nosto, true);
  assert.equal(lepokerroksenKerrokset(sarja, pyramidi(false), 'FRA', { poltetutNostot: false }).nosto, false, 'ei koetta');
  assert.equal(lepokerroksenKerrokset(sarja, pyramidi(undefined), 'FRA', { poltetutNostot: true }).nosto, false,
    'nimet laatassa: elävä nimi piirtyisi poltetun päälle');
  assert.equal(lepokerroksenKerrokset(sarja, pyramidi(false), 'ESP', { poltetutNostot: true }).nosto, false, 'muu maa');
});

test('kokoaja kantaa nimiot:false ja kieltää puoliksi nimettömän maan', () => {
  const kansio = mkdtempSync(join(tmpdir(), 'poltetut-nostot-'));
  try {
    const shardi = (nimi, nimiot) => {
      mkdirSync(join(kansio, nimi), { recursive: true });
      writeFileSync(join(kansio, nimi, 'pyramidi.json'), JSON.stringify({
        nostotasot: { FRA: { versio: 'N1', maa: 'FRA', saanto: 'S', tasot: [nimi.includes('z8') ? 8 : 5], nostot: { a: '1' }, laatastot: {}, ...(nimiot ? { nimiot: false } : {}) } },
      }));
    };
    const luettelo = join(kansio, 'luettelo.json');
    const aja = () => {
      writeFileSync(luettelo, JSON.stringify({ versio: 'A' }));
      return execFileSync('node', [join(JUURI, 'tools/kokoa-nostotasot.mjs'), '--ulos', kansio, '--luettelo', luettelo], { stdio: 'pipe' });
    };
    shardi('nosto-z5-z7-FRA', true);
    shardi('nosto-z8-FRA', true);
    aja();
    const koottu = JSON.parse(readFileSync(luettelo, 'utf8')).nostotasot.FRA;
    assert.equal(koottu.nimiot, false);
    assert.deepEqual(koottu.tasot, [5, 8]);
    shardi('nosto-z8-FRA', false);
    assert.throws(aja, /osa poltettu nimillä, osa ilman/);
  } finally { rmSync(kansio, { recursive: true, force: true }); }
});

test('generaattori: --nostot-ilman-nimioita piilottaa nimet ja kirjaa kentän', () => {
  const g = lue('../tools/generoi-laattapyramidi.mjs');
  assert.match(g, /const NOSTOT_ILMAN_NIMIOITA = lippu\('nostot-ilman-nimioita'\);/);
  assert.match(g, /const nimio = NOSTOT_ILMAN_NIMIOITA \? \{ nimioNakyy: false \} : \{\};/);
  assert.match(g, /\.\.\.\(NOSTOT_ILMAN_NIMIOITA \? \{ nimiot: false \} : \{\}\),/);
  // Polttopiirtäjä jättää nimen pois juuri tällä kentällä.
  assert.match(lue('../js/fokusnosto-symbolit.js'), /if \(!merkki\.nimioNakyy \|\| !merkki\.nimio\) return;/);
});

test('piirto: piste laatassa = ei ikonia rungolla eikä CSS2D:ssä, nimi ja osuma jäävät', () => {
  assert.equal(glOnHehkupiste({ kategoria: 'nahtavyys', pisteLaatassa: true }), false);
  const sovitin = lue('../js/pallolauta/glnimiot-sovitin.js');
  assert.match(sovitin, /if \(!d\.pisteLaatassa\) gl\.push\(instanssi\);/);
  const nostot = lue('../js/pallolauta/nostot.js');
  assert.match(nostot, /g\.classList\.toggle\('nostosym-ikoni-laatassa', Boolean\(d\.pisteLaatassa\)\);/);
  assert.match(nostot, /pisteLaatassa: !m\.poltettu && pisteLaatassa\.has\(m\.id\),/);
  assert.match(nostot, /maanKohdemerkit\(pack, iso, pohja, kirjaaPiste\)/);
  assert.match(lue('../css/styles.css'), /\.nostosym-ikoni-laatassa \.nostosym-rasteri:not\(\.nostosym-nimiokuva\) \{ visibility: hidden; \}/);
  const pallo = lue('../js/pallo.js');
  assert.match(pallo, /export function pallonNostonPisteLaatassa\(tunnus, tiiviste = null\)/);
  assert.match(pallo, /poltetutNostotKoe \?\?= laattakerroksenKokeet\(\)\.has\('poltetutnostot'\);/);
});
