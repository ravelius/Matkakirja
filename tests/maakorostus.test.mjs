/*
 * PELAAJAN MAAN RAJA VAHVEMMALLA (omistaja 11.9.2026, sanatarkasti:
 * *"Peli voisi piirtää vahvemmalla aina kyseisen valtion rajat jossa
 * pelaaja on"*).
 *
 * Testit vartioivat NELJÄÄ ehtoa, joiden varassa korostus toimii:
 *
 *   1. AINEISTON MUOTO JA AVAIMET. Korostus lukee saman tiedoston kuin
 *      tasokartan vahvistettu ääriviiva (assets/data/maapolygonit.json,
 *      ISO A3 -avaimet) — uutta aineistoa ei tehty, koska sama Natural
 *      Earthin 10m -lähde on jo repossa (js/maanaariviivat.js).
 *   2. VALINTA SEURAA PELAAJAA. Sama maa ei tee työtä, uusi maa latoo
 *      viivan, ja maa voi myös poistua (lento, lähtövalinta).
 *   3. TYYLIN VAHVUUS. Korostus on selvästi tavallista rajaa vahvempi
 *      joka etäisyydellä, mutta samaa 1873-atlaksen mustetta — ei
 *      neonväriä eikä toista kerrosta.
 *   4. PUUTTUVA MAA ON TURVALLINEN. Maa, jota aineistossa ei ole, ei
 *      kaada mitään eikä jätä tyhjää viivaa.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  lataaMaapolygonit, maanRenkaatAsteina, nollaaPallonMaakorostus,
  paivitaPallonMaakorostus, puraMaanRenkaat, rengasAsteiksi,
} from '../js/maanaariviivat.js';
import {
  KOROSTUS_MUSTE, KOROSTUS_PEITTO, RAJA_MUSTE, RAJA_PEITTO, RANTA_PEITTO,
  VEKTORIT_KOROSTUS_LEVEYS_CSS, VEKTORIT_KOROSTUS_RENDER_ORDER, VEKTORIT_LEVEYDET,
  VEKTORIT_LEVEYS_CSS, VEKTORIT_RAJA_LEVEYS_CSS, VEKTORIT_RENDER_ORDER,
  viivanLeveysCss,
} from '../js/pallovektorit.js';
import { PALLO_LAUTA } from '../js/pallo.js';
import { laudaltaAsteiksi } from '../js/fokusmitat.js';

const JUURI = new URL('..', import.meta.url).pathname;
const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const data = JSON.parse(readFileSync(`${JUURI}assets/data/maapolygonit.json`, 'utf8'));

/** Sama käännös kuin pallolaudalla (js/pallolauta/lauta.js pallonAsteet). */
const asteet = ({ x, y }) => laudaltaAsteiksi(PALLO_LAUTA, x, y);

/* ---------------------------------------------- 1. aineisto ja avaimet */

test('aineisto on ISO A3 -avaimellinen ja purkautuu renkaiksi', () => {
  assert.ok(data.tarkkuus > 0, 'tarkkuus puuttuu — purku jakaa sillä');
  assert.match(data.lahde, /Natural Earth/i);
  const avaimet = Object.keys(data.maat);
  assert.ok(avaimet.length > 100, `maita vain ${avaimet.length}`);
  for (const iso of avaimet) assert.match(iso, /^[A-Z]{3}$/, `${iso} ei ole ISO A3`);
  // Pelin peruskolmikko: lähtömaa, ensimmäinen kohde ja iso naapuri.
  for (const iso of ['GBR', 'GRC', 'FRA']) {
    assert.ok(data.maat[iso]?.length, `${iso} puuttuu aineistosta`);
  }
});

test('renkaat purkautuvat laudan yksiköihin ja asteiksi', () => {
  const laudalla = puraMaanRenkaat(data, 'GRC');
  assert.ok(laudalla.length > 0, 'Kreikalta ei tullut yhtään rengasta');
  for (const r of laudalla) {
    assert.ok(r.length >= 3, 'rengas on liian lyhyt');
    for (const [x, y] of r) {
      assert.ok(Number.isFinite(x) && Number.isFinite(y), 'piste ei ole luku');
    }
  }
  const asteina = maanRenkaatAsteina(data, 'GRC', asteet);
  assert.equal(asteina.length, laudalla.length, 'renkaita katosi käännöksessä');
  for (const r of asteina) {
    assert.deepEqual(r[0], r[r.length - 1], 'rengas ei ole suljettu');
    for (const [lon, lat] of r) {
      assert.ok(lon >= -540 && lon <= 540, `pituusaste karkasi: ${lon}`);
      assert.ok(lat >= -90 && lat <= 90, `leveysaste karkasi: ${lat}`);
    }
  }
  // Kreikka on siellä missä pitääkin (19–29 °E, 34–42 °N).
  const kaikki = asteina.flat();
  const lon = kaikki.map(([a]) => a);
  const lat = kaikki.map(([, b]) => b);
  assert.ok(Math.min(...lon) > 18 && Math.max(...lon) < 30, 'Kreikka ei ole Egeanmerellä');
  assert.ok(Math.min(...lat) > 33 && Math.max(...lat) < 42.5);
});

test('sauman yli kulkeva rengas pysyy ehjänä (ei vyötä maailman ympäri)', () => {
  // Keinotekoinen rengas päivämäärärajan yli: laudan reuna ja alku.
  const leveys = data.lauta.leveys;
  const rengas = [
    [leveys - 20, 1000], [leveys - 5, 1000], [5, 1010], [20, 1010], [leveys - 20, 1000],
  ];
  const asteina = rengasAsteiksi(rengas, asteet);
  assert.ok(asteina, 'rengas hävisi');
  for (let i = 1; i < asteina.length; i += 1) {
    assert.ok(Math.abs(asteina[i][0] - asteina[i - 1][0]) < 180,
      'renkaan sivu ylitti 180 astetta — viiva kiertäisi maailman ympäri');
  }
});

/* --------------------------------------- 2. valinta seuraa pelaajaa */

/** Kerroksen kaksoisolento: kirjaa mitä `korostaMaa` sai. */
function tekoVektorit() {
  const kutsut = [];
  return {
    kutsut,
    korostaMaa(iso, renkaat) { kutsut.push({ iso, renkaat }); return true; },
  };
}

test('korostus vaihtuu pelaajan maan mukana eikä tee työtä samalla maalla', async () => {
  nollaaPallonMaakorostus();
  const vektorit = tekoVektorit();
  const lataa = () => Promise.resolve(data);
  assert.equal(paivitaPallonMaakorostus({
    vektorit, iso: 'GRC', asteet, lataa,
  }), true);
  await new Promise((ok) => { setTimeout(ok, 0); });
  assert.equal(vektorit.kutsut.length, 1);
  assert.equal(vektorit.kutsut[0].iso, 'GRC');
  assert.ok(vektorit.kutsut[0].renkaat.length > 0, 'Kreikka jäi ilman renkaita');
  // Sama maa uudestaan: ei kutsua, ei työtä.
  assert.equal(paivitaPallonMaakorostus({
    vektorit, iso: 'GRC', asteet, lataa,
  }), false);
  await new Promise((ok) => { setTimeout(ok, 0); });
  assert.equal(vektorit.kutsut.length, 1, 'sama maa latoi viivan uudestaan');
  // Uusi maa: uusi viiva.
  paivitaPallonMaakorostus({
    vektorit, iso: 'ITA', asteet, lataa,
  });
  await new Promise((ok) => { setTimeout(ok, 0); });
  assert.equal(vektorit.kutsut.at(-1).iso, 'ITA');
  assert.ok(vektorit.kutsut.at(-1).renkaat.length > 0);
  // Maa poistui (avauslento, lähtövalinta): kerros tyhjenee heti.
  paivitaPallonMaakorostus({
    vektorit, iso: null, asteet, lataa,
  });
  assert.equal(vektorit.kutsut.at(-1).iso, null);
  assert.equal(vektorit.kutsut.at(-1).renkaat, null);
  nollaaPallonMaakorostus();
});

test('pallolauta kysyy korostuksen pelaajan maasta joka päivityksessä', () => {
  const lauta = lue('../js/pallolauta/lauta.js');
  assert.match(lauta, /paivitaPallonMaakorostus\(\{/, 'kytkentä puuttuu laudalta');
  assert.match(lauta, /iso: lento \? null : kohteidenNykyinenIso\(ui\)/,
    'maa ei tule laudan omasta kaupunki–maa-taulusta');
  assert.match(lauta, /nollaaPallonMaakorostus\(\);/, 'purku ei nollaa korostusta');
});

/* ------------------------------------------- 3. tyylin vahvuus */

test('korostus on selvästi tavallista rajaa vahvempi', () => {
  assert.equal(VEKTORIT_LEVEYDET.korostus, VEKTORIT_KOROSTUS_LEVEYS_CSS);
  assert.equal(VEKTORIT_LEVEYDET.rajat, VEKTORIT_RAJA_LEVEYS_CSS);
  assert.equal(VEKTORIT_LEVEYDET.rannikko, VEKTORIT_LEVEYS_CSS);
  // Leveys joka etäisyydellä: yleiskuvasta lähikuvaan.
  for (const tiheys of [0, 25, 60, 150, 250, 600]) {
    const korostus = viivanLeveysCss(tiheys, VEKTORIT_KOROSTUS_LEVEYS_CSS);
    const raja = viivanLeveysCss(tiheys, VEKTORIT_RAJA_LEVEYS_CSS);
    const ranta = viivanLeveysCss(tiheys, VEKTORIT_LEVEYS_CSS);
    assert.ok(korostus >= raja * 2, `tiheys ${tiheys}: korostus ${korostus} vs raja ${raja}`);
    assert.ok(korostus > ranta * 1.5, `tiheys ${tiheys}: korostus ei erotu rantaviivasta`);
  }
  // Muste: korostus on tummempi ja peittävämpi kuin tavallinen raja.
  assert.ok(KOROSTUS_PEITTO > RAJA_PEITTO * 1.5, 'korostus ei ole rajaa peittävämpi');
  assert.ok(KOROSTUS_PEITTO > RANTA_PEITTO, 'korostus ei erotu rantaviivasta');
  assert.ok(KOROSTUS_PEITTO < 1, 'täysi peitto olisi tussi, ei kaiverrusta');
});

test('korostus on 1873-atlaksen mustetta eikä neonväriä', () => {
  const osat = (v) => [1, 3, 5].map((i) => parseInt(v.slice(i, i + 2), 16));
  const [r, g, b] = osat(KOROSTUS_MUSTE);
  const [rr, rg, rb] = osat(RAJA_MUSTE);
  // Ruskea muste: punainen > vihreä > sininen, sama järjestys kuin rajalla.
  assert.ok(r > g && g > b, `${KOROSTUS_MUSTE} ei ole ruskea`);
  assert.ok(rr > rg && rg > rb);
  // Tummempi kuin tavallinen raja, muttei musta.
  assert.ok(r + g + b < rr + rg + rb, 'korostus ei ole rajaa tummempi');
  assert.ok(r + g + b > 60, 'korostus on käytännössä musta');
  // Kylläisyys maltillinen: neonväri erottuisi tästä heti.
  assert.ok(Math.max(r, g, b) - Math.min(r, g, b) < 90, 'sävy on liian kylläinen atlakseen');
});

test('korostus piirtyy tavallisen rajan jälkeen mutta samassa kerroksessa', () => {
  // Suurempi renderOrder = piirtyy myöhemmin eli päälle; ero pidetään
  // pienenä, jottei korostus nouse reittien tai kalvojen tasolle (0 ja 1).
  assert.ok(VEKTORIT_KOROSTUS_RENDER_ORDER > VEKTORIT_RENDER_ORDER);
  assert.ok(VEKTORIT_KOROSTUS_RENDER_ORDER < 0);
  const lahde = lue('../js/pallovektorit.js');
  // Sama pinta, sama syvyyssiirto, sama harvennus kuin muilla vektoreilla.
  assert.match(lahde, /const olio = new luokat\.LineSegments2\(geometria, materiaalit\.korostus\)/);
  assert.match(lahde, /harvennaViivat\(renkaat, harvennus\)/);
  assert.match(lahde, /vektorijanat\(viivat, sade\(\)\)/);
  // Korostus on jaetussa materiaalitaulussa eikä oma kerroksensa.
  assert.match(lahde, /return \{ rannikko: ranta, rajat: raja, korostus: korostusMateriaali \};/);
});

/* ------------------------------------------ 4. puuttuva maa */

test('tuntematon maa ei kaada mitään eikä jätä tyhjää viivaa', async () => {
  nollaaPallonMaakorostus();
  assert.deepEqual(puraMaanRenkaat(data, 'XXX'), []);
  assert.deepEqual(puraMaanRenkaat(null, 'GRC'), []);
  assert.deepEqual(maanRenkaatAsteina(data, 'XXX', asteet), []);
  assert.deepEqual(maanRenkaatAsteina(data, 'GRC', null), []);
  const vektorit = tekoVektorit();
  paivitaPallonMaakorostus({
    vektorit, iso: 'XXX', asteet, lataa: () => Promise.resolve(data),
  });
  await new Promise((ok) => { setTimeout(ok, 0); });
  assert.equal(vektorit.kutsut.at(-1).iso, 'XXX');
  assert.deepEqual(vektorit.kutsut.at(-1).renkaat, [], 'tyhjä lista pyyhkii korostuksen');
  nollaaPallonMaakorostus();
});

test('aineistoton peli toimii kuten ennen', async () => {
  nollaaPallonMaakorostus();
  const vektorit = tekoVektorit();
  // Yhden tiedoston versio ja verkoton käynnistys: haku palauttaa null.
  paivitaPallonMaakorostus({
    vektorit, iso: 'GRC', asteet, lataa: () => Promise.resolve(null),
  });
  await new Promise((ok) => { setTimeout(ok, 0); });
  assert.deepEqual(vektorit.kutsut.at(-1).renkaat, []);
  // Kaatunut haku ei saa heittää kutsujalle asti.
  nollaaPallonMaakorostus();
  paivitaPallonMaakorostus({
    vektorit, iso: 'ITA', asteet, lataa: () => Promise.reject(new Error('verkko')),
  });
  await new Promise((ok) => { setTimeout(ok, 0); });
  // Ilman kerrosta (?vektorit=0) kutsu on hiljainen ei-mitään.
  assert.equal(paivitaPallonMaakorostus({
    vektorit: null, iso: 'GRC', asteet, lataa: () => Promise.resolve(data),
  }), false);
  nollaaPallonMaakorostus();
});

test('kerros ja hakija ovat yhdessä paikassa (ei kahta aineistoa)', () => {
  assert.equal(typeof lataaMaapolygonit, 'function');
  const tummennus = lue('../js/maatummennus.js');
  // Tasokartta lukee saman jaetun lupauksen.
  assert.match(tummennus, /import \{ lataaMaapolygonit \} from '\.\/maanaariviivat\.js';/);
  // Eikä repoon ole ilmestynyt toista maiden ääriviivasettiä.
  const aariviivat = lue('../js/maanaariviivat.js');
  assert.match(aariviivat, /assets\/data\/maapolygonit\.json/);
});

test('tasokartta korostaa pelaajan maan myös ilman maan ikkunaa', () => {
  const tummennus = lue('../js/maatummennus.js');
  assert.match(tummennus, /ui\.fokuskarttaAvain \|\| kohteidenNykyinenIso\(ui\)/,
    'ikkunaton maa jäisi ilman korostusta');
  assert.match(tummennus, /if \(ui\.aloituslentoKesken\) return null;/,
    'avauslennon niukkuus rikkoutuisi');
});
