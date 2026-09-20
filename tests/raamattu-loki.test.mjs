/*
 * RAAMATUN JAKO (omistaja 20.9.2026 klo 18.08): Raamatussa on vain
 * voimassa oleva linjaus, päätöshistoria on sanatarkasti kansiossa
 * docs/raamattu-loki/. Nämä vartiot pitävät jaon koossa:
 *   1. jokainen Raamatun "Loki: docs/raamattu-loki/<tiedosto> #<otsikko>"
 *      -viite osoittaa olemassa olevaan tiedostoon ja otsikkoon;
 *   2. lokitiedostojen otsikot ovat ## -tasolla ja koodin viittaamat
 *      PAATOKSET-sarjat löytyvät lokista (viittaukset eivät katkea);
 *   3. tools/raamattu-kirjaa.mjs kirjoittaa kohdan sovitussa muodossa
 *      juoksevan lokin loppuun;
 *   4. Raamattu ei kasva takaisin lokiksi: pelin lataama tiedosto pysyy
 *      selvästi alle jaon jälkeisen koon kaksinkertaisena.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { RAAMATTU } from '../js/tyohuone-raamattu.js';
import { LOKI, kirjaa, lokikohta, suomenAika } from '../tools/raamattu-kirjaa.mjs';

const JUURI = new URL('../', import.meta.url);
const LOKIKANSIO = new URL('docs/raamattu-loki/', JUURI);
const lokinOtsikot = (tiedosto) => new Set(
  readFileSync(new URL(tiedosto, LOKIKANSIO), 'utf8').split('\n')
    .filter((l) => l.startsWith('## ')).map((l) => l.slice(3)),
);

test('jokainen Raamatun lokiviite osoittaa olemassa olevaan tiedostoon ja otsikkoon', () => {
  let viitteita = 0;
  for (const osio of RAAMATTU.osiot) for (const kohta of osio.kohdat) {
    const i = kohta.indexOf('Loki: docs/raamattu-loki/');
    if (i < 0) continue;
    const osat = kohta.slice(i + 'Loki: '.length).replace(/\.$/, '')
      .split('; docs/').map((s, j) => (j ? `docs/${s}` : s));
    for (const osa of osat) {
      const m = osa.match(/^docs\/raamattu-loki\/([\w.-]+\.md)(?: \(.*\))?(?: (#.*))?$/);
      assert.ok(m, `${osio.otsikko}: lokiviitteen muoto: ${osa.slice(0, 80)}`);
      assert.ok(existsSync(new URL(m[1], LOKIKANSIO)), `${osio.otsikko}: lokia ${m[1]} ei ole`);
      if (!m[2]) continue;
      const otsikot = lokinOtsikot(m[1]);
      for (const h of m[2].split(', #').map((s) => s.replace(/^#/, ''))) {
        viitteita++;
        assert.ok(otsikot.has(h), `${osio.otsikko}: ${m[1]} ei sisällä otsikkoa "## ${h}"`);
      }
    }
  }
  assert.ok(viitteita >= 300, `lokiviitteitä vain ${viitteita} — jako näyttää puretulta`);
});

test('koodin viittaamat KARTTAUUDISTUKSEN PAATOKSET -sarjat löytyvät lokista', () => {
  const otsikot = [...lokinOtsikot('paatokset-2026-09-13--09-20.md')];
  for (const n of [1, 5, 8, 12, 29, 30, 33, 34, 40, 42, 43]) {
    assert.ok(otsikot.some((o) => o.startsWith(`KARTTAUUDISTUKSEN PAATOKSET ${n}`)
      || o.startsWith(`KARTTAUUDISTUKSEN PAATOKSET ${n}:`)),
    `KARTTAUUDISTUKSEN PAATOKSET ${n} puuttuu lokista`);
  }
  assert.ok(otsikot.includes('KARTTAUUDISTUKSEN PAATOKSET 12 TARKENNUS: PULUN HAHMO PYSYY KULMASSA'));
});

test('lokitiedostojen alkurivi kertoo lähdeosion, ja kohdat ovat ##-otsikoita', () => {
  for (const [tiedosto, osio, maara] of [
    ['paatokset-2026-08-24--09-03.md', 'Fokusmoodi', 125],
    ['paatokset-2026-09-03--09-14.md', 'Viisas Pöllö', 225],
    ['paatokset-2026-09-13--09-20.md', 'Kaupungit', 101],
  ]) {
    const teksti = readFileSync(new URL(tiedosto, LOKIKANSIO), 'utf8');
    assert.match(teksti.split('\n')[0], new RegExp(`osiosta "${osio}"`), `${tiedosto}: alkurivi`);
    assert.equal(lokinOtsikot(tiedosto).size, maara, `${tiedosto}: kohtien määrä`);
  }
  assert.ok(existsSync(new URL('paatokset-2026-09.md', LOKIKANSIO)), 'juokseva loki puuttuu');
});

test('raamattu-kirjaa kirjoittaa kohdan sovitussa muodossa lokin loppuun', () => {
  assert.equal(suomenAika(new Date('2026-09-20T15:05:00Z')), '20.9.2026 klo 18.05');
  assert.equal(suomenAika(new Date('2026-12-01T07:03:00Z')), '1.12.2026 klo 09.03');
  assert.equal(lokikohta('KOE: OTSIKKO', 'teksti', new Date('2026-09-20T15:05:00Z')),
    '\n## KOE: OTSIKKO (20.9.2026 klo 18.05)\n\nteksti\n');
  assert.throws(() => lokikohta('', 'teksti'));
  const juuri = mkdtempSync(join(tmpdir(), 'raamattu-loki-'));
  mkdirSync(join(juuri, 'docs/raamattu-loki'), { recursive: true });
  writeFileSync(join(juuri, LOKI), 'Alkurivi.\n');
  const rivi = kirjaa('KOE 2', 'toinen', { juuri, nyt: new Date('2026-09-20T15:05:00Z') });
  assert.equal(rivi, '## KOE 2 (20.9.2026 klo 18.05)');
  assert.equal(readFileSync(join(juuri, LOKI), 'utf8'), 'Alkurivi.\n\n## KOE 2 (20.9.2026 klo 18.05)\n\ntoinen\n');
});

test('Raamattu pysyy linjauksena, ei lokina (koko)', () => {
  const koko = statSync(new URL('js/tyohuone-raamattu.js', JUURI)).size;
  assert.ok(koko < 450 * 1024,
    `js/tyohuone-raamattu.js on ${(koko / 1024).toFixed(0)} kt — päätökset kuuluvat lokiin (tools/raamattu-kirjaa.mjs)`);
});
