/*
 * RAAMATUN JAKO (omistaja 20.9.2026 klo 18.08): Raamatussa on vain
 * voimassa oleva linjaus, päätöshistoria on sanatarkasti kansiossa
 * docs/raamattu-loki/. Nämä vartiot pitävät jaon koossa:
 *   lokitiedostojen otsikot ovat ## -tasolla ja koodin viittaamat
 *   PAATOKSET-sarjat löytyvät lokista (viittaukset eivät katkea).
 * Vanha loki on nyt vain luettava historia (tools/loki-hae.mjs). Uudet päätökset
 * kirjataan ovella `node tools/kirjaa.mjs paatos` (docs/raamattu/paatokset/, testit
 * tests/kirjaa.test.mjs); vanhan js:n poisto vaihe 1 (KK 12.11.2026 klo 17.30)
 * poisti täältä vanhan Raamatun lokiviitteet, tools/raamattu-kirjaa.mjs:n ja kokovahdin.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const JUURI = new URL('../', import.meta.url);
const LOKIKANSIO = new URL('docs/raamattu-loki/', JUURI);
const lokinOtsikot = (tiedosto) => new Set(
  readFileSync(new URL(tiedosto, LOKIKANSIO), 'utf8').split('\n')
    .filter((l) => l.startsWith('## ')).map((l) => l.slice(3)),
);

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
