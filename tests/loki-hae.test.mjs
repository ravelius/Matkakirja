/*
 * tools/loki-hae.mjs: päätöslokin haku (omistajan päätös 15.10.2026).
 * Pieni fixture-kansio luodaan tilapäishakemistoon, oikeaa lokia ei käytetä.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { aja, hae, jasenna, lataa, kirjausOsa, normalisoi } from '../tools/loki-hae.mjs';

function fixture() {
  const kansio = mkdtempSync(join(tmpdir(), 'loki-hae-'));
  writeFileSync(join(kansio, 'paatokset-2026-08-24--09-03.md'),
    'Johdanto.\n\n## VANHA ASIA\n\nÄänet ja päätös ilman päivää.\n');
  writeFileSync(join(kansio, 'paatokset-2026-09.md'), [
    'Johdanto.', '',
    '## ENSIMMAINEN (20.9.2026 klo 18.59)', '', 'Päätös kartasta.', '',
    '## TOINEN (3.10.2026 klo 09.10)', '', 'Toinen paatos koskee Äänitystä.', '',
    '## KOLMAS (14.10.2026 klo 21.43)', '', 'Pitkä ilmaus rivi alkaa sana1 sana2', 'sana3 sana4 loppuu.', '',
    ...Array.from({ length: 12 }, (_, i) => `## SARJA ${i} (1${i % 10}.10.2026 klo 10.00)\n\nsarjahaku ${i}\n`),
  ].join('\n'));
  return kansio;
}

test('normalisoi poistaa ääkköset ja kirjainkoon pituutta muuttamatta', () => {
  assert.equal(normalisoi('PÄÄTÖS Åland'), 'paatos aland');
  assert.equal(normalisoi('Äänet').length, 5);
});

test('haku löytää ääkkösittä, uusin ensin, ja päättelee päivän otsikosta', () => {
  const kirjaukset = lataa(fixture());
  const osumat = hae(kirjaukset, 'PAATOS');
  assert.deepEqual(osumat.map((o) => o.k.otsikko.split(' (')[0]), ['TOINEN', 'ENSIMMAINEN', 'VANHA ASIA']);
  assert.equal(hae(kirjaukset, 'paatos', { alkaen: '1.10' }).length, 1);
  assert.equal(hae(kirjaukset, 'ei-loydy').length, 0);
});

test('rivitetty ilmaus löytyy ja tulosteessa on tiedosto:rivi ja osumamäärä', () => {
  const kansio = fixture();
  const ulos = aja(['sana2 sana3'], kansio);
  assert.match(ulos, /paatokset-2026-09\.md:\d+ {2}## KOLMAS/);
  assert.match(ulos, /1 osumaa, näytetty 1/);
});

test('enintään 8 osumaa ilman --kaikki', () => {
  const kansio = fixture();
  const ulos = aja(['sarjahaku'], kansio);
  assert.equal((ulos.match(/^paatokset-/gm) || []).length, 8);
  assert.match(ulos, /12 osumaa, näytetty 8 – tarkenna hakua tai --kaikki/);
  assert.equal((aja(['sarjahaku', '--kaikki'], kansio).match(/^paatokset-/gm) || []).length, 12);
});

test('--kirjaus tulostaa koko kirjauksen ja pitkä jaetaan osiin (--osa)', () => {
  const kansio = mkdtempSync(join(tmpdir(), 'loki-hae-'));
  const rivit = Array.from({ length: 100 }, (_, i) => `rivi ${i} ${'x'.repeat(100)}`);
  writeFileSync(join(kansio, 'paatokset-2026-10.md'), `## PITKA (1.10.2026 klo 10.00)\n\n${rivit.join('\n')}\n`);
  const k = jasenna('paatokset-2026-10.md', `## PITKA (1.10.2026 klo 10.00)\n\n${rivit.join('\n')}\n`);
  const o1 = kirjausOsa(k, 'paatokset-2026-10.md:50');
  assert.ok(o1.osia >= 3 && o1.teksti.length <= 4200);
  const viimeinen = aja(['--kirjaus', 'paatokset-2026-10.md:1', '--osa', String(o1.osia)], kansio);
  assert.match(viimeinen, /rivi 99 /);
  assert.throws(() => aja(['--kirjaus', 'paatokset-2026-10.md:9999'], kansio));
  assert.throws(() => aja([], kansio));
});
