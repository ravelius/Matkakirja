// PANEELI-pohja webissä (Natiivi-UI 1.10.2026, malli 09): PaneeliData ja pohjan sulkusäännöt.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { tarkistaPaneeliData, PANEELI_RIVITYYPIT } from '../js/pohjat/paneelidata.js';
import { pohjatCss } from './pohjat-css.mjs';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const POHJAT = lue('../js/pohjat/pohjat.js').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
const CSS = pohjatCss();

test('PaneeliData: tyhjä hylätään, tyhjät rivit ja ryhmät pois, tuntematon tyyppi toiminnoksi', () => {
  assert.equal(tarkistaPaneeliData(null), null);
  assert.equal(tarkistaPaneeliData({ ryhmat: [{ rivit: [{ nimi: ' ' }] }] }), null);
  const d = tarkistaPaneeliData({
    kapiteeli: ' Matka ',
    ryhmat: [{ rivit: [{ nimi: 'Uusi peli', tyyppi: 'outo' }] }, { rivit: [] }],
    alarivi: 'Matkakirja',
  });
  assert.equal(d.kapiteeli, 'Matka');
  assert.equal(d.ryhmat.length, 1);
  assert.equal(d.ryhmat[0].rivit[0].tyyppi, 'toiminto');
  assert.deepEqual(d.alarivi, { vasen: 'Matkakirja', oikea: '' });
  assert.equal(d.teema, 'paperi');
  assert.deepEqual(PANEELI_RIVITYYPIT, ['navigointi', 'kytkin', 'toiminto', 'saadin']);
});

test('PaneeliData: kytkin totuusarvoksi, säätimen arvo rajoihin, teema vain paperi tai lasi', () => {
  const d = tarkistaPaneeliData({
    teema: 'tumma',
    ryhmat: [{ vierekkain: 1, rivit: [
      { tyyppi: 'kytkin', nimi: 'Musiikki', paalla: 'kyllä' },
      { tyyppi: 'saadin', nimi: 'Kertoja', min: 0, max: 100, arvo: 140 },
    ] }],
  });
  assert.equal(d.teema, 'paperi');
  assert.equal(d.ryhmat[0].vierekkain, true);
  assert.equal(d.ryhmat[0].rivit[0].paalla, true);
  assert.equal(d.ryhmat[0].rivit[1].arvo, 100);
  assert.equal(d.ryhmat[0].rivit[1].muotoile(5), '5');
  assert.equal(tarkistaPaneeliData({ teema: 'lasi', ryhmat: [{ rivit: [{ nimi: 'a' }] }] }).teema, 'lasi');
});

test('PANEELI: sulkupino (Esc), ohinapautus ohittaa avaajan, ei ✕:ää eikä kuvia', () => {
  const p = POHJAT.slice(POHJAT.indexOf('export function luoPohjaPaneeli'));
  assert.match(p, /pohjaPinoon\(pohja\)/);
  assert.match(p, /addEventListener\('pointerdown', ohi, true\)/);
  assert.match(p, /avaaja\?\.contains\?\.\(e\.target\)/);
  assert.match(p, /nayta\(uusi\)/);
  assert.ok(!/✕|×/.test(p), 'PANEELISSA ei ✕:ää');
  assert.ok(!/<img|pohjaKuva\(/.test(p), 'PANEELISSA ei kuvia');
});

test('PANEELI-tyylit: leveys tokenista, korkeus enintään 70 % (--tk-peitto-paneeli), kytkin päällä toimintovärillä', () => {
  assert.match(CSS, /\.tk-paneeli \{[\s\S]*?width: min\(var\(--tk-leveys-paneeli\), 100vw - var\(--tk-vali-xl\)\);[\s\S]*?max-height: var\(--tk-peitto-paneeli\);/);
  assert.match(CSS, /\.tk-paneeli-rivi--kytkin\.tk-paalla \{[\s\S]*?border-color: var\(--tk-toiminto\);/);
  assert.match(lue('../css/styles.css'), /--tk-peitto-paneeli: 70%;/);
});
