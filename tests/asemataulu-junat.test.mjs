/*
 * ASEMATAULUN JUNAT-DOKUMENTIN TARKISTIN (omistaja 18.10.2026, C5).
 * Ajaa tools/asemataulu/tarkista-junat.py:n esimerkkidatalla: oikea muoto läpi,
 * jokainen tunnettu virhe (pitkä nimi, puuttuva edistys, "TF"-tila ilman TestFlight-sanaa,
 * kielletty osio-otsikko, eteneminen väärällä nimellä) palauttaa nollasta poikkeavan koodin.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const juuri = join(dirname(fileURLToPath(import.meta.url)), '..');
const skripti = join(juuri, 'tools/asemataulu/tarkista-junat.py');
const kansio = mkdtempSync(join(tmpdir(), 'asemataulu-'));

const hyva = () => ({
  rivit: [
    { nimi: 'Juna 204', tila: 'Työn alla', edistys: 1, teksti: 'Työn alla:\n– skanneriin tiedot\n\nValmiina:\n– kuvanotto' },
    { nimi: 'TF 203', tila: 'Testaajilla (TestFlight 16.55)', teksti: 'Uutta (18.10. klo 16.56):\n– korjaus' },
  ],
  ts: 1,
});

function aja(junat, eteneminen) {
  const polku = join(kansio, 'junat-' + Math.random().toString(36).slice(2) + '.json');
  writeFileSync(polku, JSON.stringify(junat));
  const args = ['-I', skripti, polku];
  if (eteneminen) {
    const ep = join(kansio, 'et-' + Math.random().toString(36).slice(2) + '.json');
    writeFileSync(ep, JSON.stringify(eteneminen));
    args.push(ep);
  } else {
    args.push(join(kansio, 'ei-ole.json'));
  }
  return spawnSync('python3', args, { encoding: 'utf8' });
}

test('oikea muoto menee läpi', () => {
  const r = aja(hyva(), { nimi: 'Juna 204', edistys: 2 });
  assert.equal(r.status, 0, r.stdout);
});

test('pitkä selitys nimessä hylätään', () => {
  const d = hyva();
  d.rivit[0].nimi = 'Juna 204: Julkaisu pyydetty 22.45, lähtee heti';
  const r = aja(d);
  assert.equal(r.status, 1);
  assert.match(r.stdout, /nimi pitää olla lyhyt/);
});

test('Juna N ilman edistystä hylätään (liikennevalot)', () => {
  const d = hyva();
  delete d.rivit[0].edistys;
  assert.equal(aja(d).status, 1);
});

test('edistys merkkijonona hylätään', () => {
  const d = hyva();
  d.rivit[0].edistys = '1';
  assert.equal(aja(d).status, 1);
});

test('Juna N, jonka tila on valmis, hylätään', () => {
  const d = hyva();
  d.rivit[0].tila = 'valmis';
  assert.equal(aja(d).status, 1);
});

test('TF-rivin tila ilman TestFlight/valmis/julkaistu hylätään', () => {
  const d = hyva();
  d.rivit[1].tila = 'Testaajilla';
  assert.equal(aja(d).status, 1);
});

test('puuttuva pakollinen kenttä ja tuntematon kenttä hylätään', () => {
  const d = hyva();
  delete d.rivit[1].teksti;
  d.rivit[0].otsikko = 'pitkä';
  const r = aja(d);
  assert.equal(r.status, 1);
  assert.match(r.stdout, /pakollinen kenttä 'teksti'/);
  assert.match(r.stdout, /tuntematon kenttä 'otsikko'/);
});

test('kielletty osio-otsikko ja sama asia kahdessa osiossa hylätään', () => {
  const d = hyva();
  d.rivit[0].teksti = 'Korjatut:\n– a\n\nTyön alla:\n– b\n\nValmiina:\n– b';
  const r = aja(d);
  assert.equal(r.status, 1);
  assert.match(r.stdout, /ei sallittu/);
  assert.match(r.stdout, /sama asia/);
});

test('eteneminen väärällä nimellä hylätään', () => {
  const r = aja(hyva(), { nimi: 'Juna 999', edistys: 2 });
  assert.equal(r.status, 1);
  assert.match(r.stdout, /eteneminen: nimi/);
});

test('rikkinäinen juuri hylätään', () => {
  assert.equal(aja({ ts: 1 }).status, 1);
});
