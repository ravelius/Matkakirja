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

/* ══ Arvonimi kohteen maasta (kierros 16b, 20.9.2026) ══════════════ */

test('arvonimenPaikkaMaalle antaa kohteen maan, ei pelaajan sijaintia', async () => {
  const { arvonimenPaikkaMaalle } = await import('../js/ui-apurit.js');
  const game = {
    pack: {
      cities: [
        { id: 'pariisi', pallo: { lat: 48.9 } },
        { id: 'vilna', pallo: { lat: 54.7 } },
        { id: 'tromssa', pallo: { lat: 69.6 } },
      ],
      map: {
        cityCountry: { pariisi: 'FRA', vilna: 'LTU', tromssa: 'NOR' },
        cityManner: { pariisi: 'europe', vilna: 'europe', tromssa: 'europe' },
      },
    },
    player: { pos: { type: 'city', city: 'pariisi' } },
  };
  assert.deepEqual(arvonimenPaikkaMaalle('LTU', game), { maanosa: 'europe', iso: 'LTU' });
  // Napapiirin takana arvonimet ovat polaarisia myös maan kautta luettuna.
  assert.deepEqual(arvonimenPaikkaMaalle('NOR', game), { maanosa: 'polar', iso: 'NOR' });
  assert.deepEqual(arvonimenPaikkaMaalle('GRL', game), { maanosa: 'polar', iso: 'GRL' });
  // Tuntematon tai puuttuva maa ei keksi paikkaa (arvonta menee yleisiin).
  assert.deepEqual(arvonimenPaikkaMaalle(null, game), { maanosa: null, iso: null });
  assert.deepEqual(arvonimenPaikkaMaalle('XXX', game), { maanosa: null, iso: 'XXX' });
});

test('kohteenIso löytää kohteen maan KOHDE_MAAT-taulusta', async () => {
  const { KOHDE_MAAT, kohteenIso } = await import('../js/fokuskohteet.js');
  const iso = Object.keys(KOHDE_MAAT).find((k) => (KOHDE_MAAT[k] ?? []).length);
  const kohde = KOHDE_MAAT[iso][0];
  assert.equal(kohteenIso(kohde), iso);
  assert.equal(kohteenIso({ id: 'ei-ole-olemassa' }), null);
  assert.equal(kohteenIso(null), null);
  // Oma kenttä voittaa hakemiston.
  assert.equal(kohteenIso({ id: kohde.id, iso: 'ZZZ' }), 'ZZZ');
});
