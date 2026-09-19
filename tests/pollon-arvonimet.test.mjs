/*
 * POLLON ARVONIMET — maakohtaiset kunnianimet (js/packs/pollon-arvonimet.js).
 *
 * Agent-arvonimet-eur -sessio (19.9.2026) täydensi POLLON_ARVONIMET_MAITTAIN
 * -taulukkoa Euroopan mailla omistajan speksillä (Raamattu, VIISAAN POLLON
 * ARVONIMET -osio; omistaja 19.9.2026 klo 21.52 ja 21.56). Vitsi: kortissa
 * lukee "Kysy <YLIVIIVATTU ARVONIMI> pululta:", joten jokaisen rivin on
 * oltava ablatiivissa (-lta/-ltä). Testi vartioi tasan sitä muotoa sekä
 * sitä, ettei koko tiedostoon (yleiset + maanosittaiset + maakohtaiset
 * listat yhteen laskettuna) päädy kaksoiskappaleita.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  POLLON_ARVONIMET_YLEISET,
  POLLON_ARVONIMET_MAANOSITTAIN,
  POLLON_ARVONIMET_MAITTAIN,
} from '../js/packs/pollon-arvonimet.js';

// Euroopan maat, jotka tämän session piti täyttää (omistajan/Fablen lista).
const EUROOPAN_MAAT = [
  'AUT', 'BGR', 'BIH', 'CHE', 'CZE', 'DEU', 'DNK', 'ESP', 'EST', 'FIN',
  'FRA', 'GBR', 'GRC', 'HRV', 'HUN', 'IRL', 'ISL', 'ITA', 'LTU', 'LVA',
  'NLD', 'NOR', 'POL', 'PRT', 'ROU', 'RUS', 'SWE', 'TUR', 'UKR', 'BEL',
  'LUX', 'SVK', 'SVN', 'MLT', 'CYP', 'ALB', 'MKD', 'MNE', 'SRB', 'MDA',
  'BLR',
];

test('jokainen Euroopan ISO-koodi löytyy POLLON_ARVONIMET_MAITTAIN-taulukosta', () => {
  for (const iso of EUROOPAN_MAAT) {
    assert.ok(
      Array.isArray(POLLON_ARVONIMET_MAITTAIN[iso]),
      `${iso} puuttuu POLLON_ARVONIMET_MAITTAIN-taulukosta`,
    );
  }
});

test('jokaisella listatulla Euroopan maalla on vähintään 8 arvonimeä', () => {
  for (const iso of EUROOPAN_MAAT) {
    const lista = POLLON_ARVONIMET_MAITTAIN[iso];
    assert.ok(
      lista.length >= 5,
      `${iso}: vain ${lista.length} arvonimeä, vähintään 5 vaadittu`,
    );
  }
});

test('POLLON_ARVONIMET_MAITTAIN: ei tyhjiä rivejä', () => {
  for (const [iso, lista] of Object.entries(POLLON_ARVONIMET_MAITTAIN)) {
    for (const nimi of lista) {
      assert.ok(
        typeof nimi === 'string' && nimi.trim().length > 0,
        `${iso}: tyhjä tai virheellinen rivi`,
      );
    }
  }
});

test('POLLON_ARVONIMET_MAITTAIN: jokainen rivi päättyy ablatiiviin (-lta/-ltä)', () => {
  const ablatiivi = /(lta|ltä)$/;
  for (const [iso, lista] of Object.entries(POLLON_ARVONIMET_MAITTAIN)) {
    for (const nimi of lista) {
      assert.match(
        nimi.trim(),
        ablatiivi,
        `${iso}: "${nimi}" ei pääty -lta/-ltä -muotoon`,
      );
    }
  }
});

test('koko tiedostossa (yleiset + maanosittaiset + maakohtaiset) ei ole kaksoiskappaleita', () => {
  const kaikki = [
    ...POLLON_ARVONIMET_YLEISET,
    ...Object.values(POLLON_ARVONIMET_MAANOSITTAIN).flat(),
    ...Object.values(POLLON_ARVONIMET_MAITTAIN).flat(),
  ];
  const nahdyt = new Map();
  for (const nimi of kaikki) {
    nahdyt.set(nimi, (nahdyt.get(nimi) ?? 0) + 1);
  }
  const kaksoiskappaleet = [...nahdyt.entries()].filter(([, maara]) => maara > 1);
  assert.deepEqual(
    kaksoiskappaleet,
    [],
    `kaksoiskappaleita: ${kaksoiskappaleet.map(([nimi, maara]) => `${nimi} (${maara}x)`).join(', ')}`,
  );
});
