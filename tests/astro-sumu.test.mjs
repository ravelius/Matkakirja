/*
 * ASTRONAUTIN KAMERAN SUMU (js/linssit/astro-sumu.js).
 *
 * Raamattu "KARTTAUUDISTUKSEN PAATOKSET 43" kohta 7 ja sen TARKENNUS.
 * Nämä testit näkevät KAAVAT — peiton profiilin, kohinan saumattomuuden
 * ja epätasaisuuden — ilman selainta. Ruudun oma mittaus on
 * tools/savukkeet/savuke-astro-sumu.mjs.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  fraktaalikohina, hilakohina, pilvienPeitto, pilvipikselit, sumunPeitto,
  sumupikselit, sumuKaytossa,
  PILVIEN_PEITTO, PILVIEN_TAYSI, PILVIEN_NOLLA,
  SUMUN_KAUKO, SUMUN_KESKI, SUMUN_LAHI, SUMUN_KAUKO_PEITTO, SUMUN_KESKI_PEITTO,
  PILVIEN_LAHDE, PILVIEN_SADE, PILVIEN_OSOITE, PILVIEN_LEVEYS, PILVIEN_KORKEUS,
  PILVIEN_NAPAHAIVYTYS, pilvikuvanAlfa,
} from '../js/linssit/astro-sumu.js';

const AVAUS = 4.5;

test('sumun peitto: kaukaa ohut, keskellä tihein, lähellä nolla', () => {
  const kauko = sumunPeitto(AVAUS * SUMUN_KAUKO, AVAUS);
  const keski = sumunPeitto(AVAUS * SUMUN_KESKI, AVAUS);
  const lahi = sumunPeitto(AVAUS * SUMUN_LAHI, AVAUS);
  assert.ok(kauko < 0.2, `kaukaa ${kauko}`);
  assert.ok(keski > 0.5, `keskeltä ${keski}`);
  assert.equal(lahi, 0);
  // Profiili NOUSEE ja LASKEE: kamera kulkee sumun läpi.
  assert.ok(keski > kauko && keski > lahi);
  assert.equal(sumunPeitto(AVAUS * 2, AVAUS), SUMUN_KAUKO_PEITTO);
  assert.equal(sumunPeitto(0.01, AVAUS), 0);
});

test('sumun peitto on jatkuva eikä poukkoile', () => {
  let edellinen = sumunPeitto(AVAUS * 1.4, AVAUS);
  for (let s = 1.4; s >= 0.05; s -= 0.01) {
    const arvo = sumunPeitto(AVAUS * s, AVAUS);
    assert.ok(Math.abs(arvo - edellinen) < 0.05, `hyppy kohdassa ${s.toFixed(2)}`);
    edellinen = arvo;
  }
});

test('pilvien peitto: kaukaa 0,9 ja lähizoomissa 0', () => {
  assert.equal(pilvienPeitto(AVAUS, AVAUS), PILVIEN_PEITTO);
  assert.equal(pilvienPeitto(AVAUS * PILVIEN_TAYSI, AVAUS), PILVIEN_PEITTO);
  assert.equal(pilvienPeitto(AVAUS * PILVIEN_NOLLA, AVAUS), 0);
  assert.equal(pilvienPeitto(AVAUS * 0.1, AVAUS), 0);
  const puoliväli = pilvienPeitto(AVAUS * ((PILVIEN_TAYSI + PILVIEN_NOLLA) / 2), AVAUS);
  assert.ok(puoliväli > 0 && puoliväli < PILVIEN_PEITTO, `${puoliväli}`);
});

test('peitot ovat nollia ilman kelvollista avauskorkeutta', () => {
  assert.equal(sumunPeitto(1, 0), 0);
  assert.equal(pilvienPeitto(1, 0), 0);
  assert.equal(sumunPeitto(NaN, AVAUS), 0);
  assert.equal(pilvienPeitto(NaN, AVAUS), 0);
});

test('hilakohina on saumaton: reunat kohtaavat', () => {
  for (const v of [0.1, 0.37, 0.82]) {
    assert.ok(Math.abs(hilakohina(0, v, 8, 4, 5) - hilakohina(1, v, 8, 4, 5)) < 1e-9);
  }
  for (const u of [0.2, 0.55, 0.91]) {
    assert.ok(Math.abs(hilakohina(u, 0, 8, 4, 5) - hilakohina(u, 1, 8, 4, 5)) < 1e-9);
  }
});

test('fraktaalikohina on 0…1, saumaton ja EPÄTASAINEN', () => {
  const arvot = [];
  for (let i = 0; i < 400; i += 1) {
    const u = (i % 20) / 20;
    const v = Math.floor(i / 20) / 20;
    const n = fraktaalikohina(u, v, { siemen: 3 });
    assert.ok(n >= 0 && n <= 1);
    arvot.push(n);
  }
  const ka = arvot.reduce((a, b) => a + b, 0) / arvot.length;
  const hajonta = Math.sqrt(arvot.reduce((s, x) => s + (x - ka) ** 2, 0) / arvot.length);
  // Tasainen harso olisi hajonta 0 — juuri sitä omistaja EI halunnut.
  assert.ok(hajonta > 0.05, `hajonta ${hajonta}`);
  assert.ok(Math.abs(fraktaalikohina(0, 0.3, { siemen: 3 })
    - fraktaalikohina(1, 0.3, { siemen: 3 })) < 1e-9);
});

test('pilvipikselit: alfa vaihtelee ja aavikkovyöhyke on selkeämpi', () => {
  const leveys = 64;
  const korkeus = 32;
  const { data } = pilvipikselit({ leveys, korkeus });
  assert.equal(data.length, leveys * korkeus * 4);
  const rivinAlfa = (y) => {
    let summa = 0;
    for (let x = 0; x < leveys; x += 1) summa += data[(y * leveys + x) * 4 + 3];
    return summa / leveys;
  };
  const alfat = [];
  for (let i = 0; i < leveys * korkeus; i += 1) alfat.push(data[i * 4 + 3]);
  assert.ok(new Set(alfat).size > 8, 'alfa on tasainen — harso, ei pilviä');
  assert.ok(Math.max(...alfat) > 100, `kirkkain pilvi ${Math.max(...alfat)}`);
  assert.ok(Math.min(...alfat) === 0, 'jossain on oltava selkeää taivasta');
  // Päiväntasaaja (y = korkeus/2) on pilvisempi kuin aavikkovyöhyke (25°).
  const paiva = rivinAlfa(Math.round(korkeus / 2));
  const aavikko = rivinAlfa(Math.round(korkeus * (90 - 25) / 180));
  assert.ok(paiva > aavikko, `päiväntasaaja ${paiva} vs. aavikko ${aavikko}`);
});

test('sumupikselit: neliö, saumaton ja epätasainen', () => {
  const koko = 48;
  const { data } = sumupikselit({ koko });
  assert.equal(data.length, koko * koko * 4);
  const alfat = [];
  for (let i = 0; i < koko * koko; i += 1) alfat.push(data[i * 4 + 3]);
  assert.ok(new Set(alfat).size > 8, 'sumu on tasainen kalvo');
  assert.ok(Math.min(...alfat) === 0 && Math.max(...alfat) > 80);
});

test('?sumu=0 sammuttaa sumun, muu jättää sen päälle', () => {
  assert.equal(sumuKaytossa({ location: { search: '?sumu=0' } }), false);
  assert.equal(sumuKaytossa({ location: { search: '?sumu=false' } }), false);
  assert.equal(sumuKaytossa({ location: { search: '?lauta=pallo' } }), true);
  assert.equal(sumuKaytossa({}), true);
});

test('pilvikuvan lähde ja lisenssi on kirjattu (PD, NASA)', () => {
  assert.match(PILVIEN_LAHDE.lisenssi, /public domain/i);
  assert.match(PILVIEN_LAHDE.osoite, /^https:\/\/visibleearth\.nasa\.gov\//);
  // Kuori on pinnan YLÄPUOLELLA — muuten se jäisi reliefin alle.
  assert.ok(PILVIEN_SADE > 1 && PILVIEN_SADE < 1.05);
});

test('linssi kutsuu sumua ja purkaa sen, ja moduuli on sw:n korissa', () => {
  const lahde = readFileSync(new URL('../js/linssit/satelliitti-avaruus.js', import.meta.url), 'utf8');
  assert.match(lahde, /import \{ luoAstroSumu \} from '\.\/astro-sumu\.js'/);
  assert.match(lahde, /sumu\?\.paivita\?\.\(/);
  assert.match(lahde, /sumu\?\.pura\?\.\(\)/);
  const sw = readFileSync(new URL('../sw.js', import.meta.url), 'utf8');
  assert.ok(sw.includes("'./js/linssit/astro-sumu.js'"));
});

test('kalvokahvassa on suora peitto ja oma kierto (ei häivytystä kehyksittäin)', () => {
  const lahde = readFileSync(new URL('../js/pallolauta/linssit.js', import.meta.url), 'utf8');
  assert.match(lahde, /peitto: \(arvo\) =>/);
  assert.match(lahde, /kierra: \(kulma\) =>/);
  assert.match(lahde, /tila\.pinnanKierto = pinta\.rotation\.y/);
});

test('aito pilvikuva on kytketty ämpärin osoitteeseen', () => {
  assert.match(PILVIEN_OSOITE, /^https:\/\/media\.matkakirja\.app\/.*pilvet-bluemarble-2048\.jpg$/);
});

/*
 * ALFA LUMINANSSISTA — TÄMÄN ERÄN JUURISYY.
 *
 * Aito NASA-kuva on JPEG eikä siinä ole alfaa: sellaisenaan kalvon
 * tekstuuriksi pantuna kuori on MUSTA pallo, ja jokainen pintaa
 * mittaava savuke lukee kuorta. Testi tarkistaa kolme asiaa, jotka
 * mustan pallon estävät: musta tausta on LÄPINÄKYVÄ, valkoinen pilvi
 * on PEITTÄVÄ eikä missään kohdassa jää mustaa RGB:tä.
 */
test('pilvikuvanAlfa: musta taivas läpinäkyväksi, valkoinen pilvi peittäväksi', () => {
  const leveys = 8;
  const korkeus = 4;
  const data = new Uint8ClampedArray(leveys * korkeus * 4);
  for (let i = 0; i < leveys * korkeus; i += 1) {
    // Parilliset pikselit mustia (taivas), parittomat valkoisia (pilvi).
    const arvo = i % 2 === 0 ? 0 : 255;
    data[i * 4] = arvo;
    data[i * 4 + 1] = arvo;
    data[i * 4 + 2] = arvo;
    data[i * 4 + 3] = 255;
  }
  pilvikuvanAlfa(data, leveys, korkeus);
  // Rivi 1 ja 2 ovat päiväntasaajan puolella (napahäivytys ei pure).
  for (let x = 0; x < leveys; x += 1) {
    const i = ((1 * leveys) + x) * 4;
    if (x % 2 === 0) assert.equal(data[i + 3], 0, `taivas ${x} ei ole läpinäkyvä`);
    else assert.ok(data[i + 3] > 240, `pilvi ${x} on liian ohut: ${data[i + 3]}`);
    assert.ok(data[i] > 200, `RGB tummui: ${data[i]}`);
  }
});

test('pilvikuvanAlfa: navat häivytetään (tasavälisen kuvan venymä)', () => {
  const leveys = 2;
  const korkeus = 180;
  const data = new Uint8ClampedArray(leveys * korkeus * 4);
  data.fill(255);
  pilvikuvanAlfa(data, leveys, korkeus);
  const alfa = (y) => data[(y * leveys) * 4 + 3];
  assert.equal(alfa(0), 0, 'pohjoisnapa ei häivytetty');
  assert.equal(alfa(korkeus - 1), 0, 'etelänapa ei häivytetty');
  assert.ok(alfa(Math.round(korkeus / 2)) > 240, 'päiväntasaaja häipyi');
  // Häivytysraja on sama kuin proseduraalisella kankaalla.
  assert.equal(PILVIEN_NAPAHAIVYTYS.length, 2);
});

test('pilvikangas maalataan ensin ja aito kuva sen päälle (ei osoitetta kalvolle)', () => {
  const lahde = readFileSync(new URL('../js/linssit/astro-sumu.js', import.meta.url), 'utf8');
  // Kalvo saa KANKAAN, ei osoitetta: JPEGillä ei ole alfaa.
  assert.match(lahde, /kuva: pilvikangasOlio/);
  assert.ok(!/kuva: PILVIEN_OSOITE/.test(lahde), 'osoite menee yhä suoraan kalvolle');
  assert.match(lahde, /pilvikuvanAlfa\(kuvadata\.data/);
  // Mitat eivät saa karata muistirajasta (PAATOKSET 36).
  assert.ok((PILVIEN_LEVEYS * PILVIEN_KORKEUS * 4) / 1048576 <= 32);
});

test('savukkeet mittaavat pintaa pilvikuoren alta (piilotaPilvet)', () => {
  const kahva = readFileSync(new URL('../js/linssit/satelliitti-avaruus.js', import.meta.url), 'utf8');
  assert.match(kahva, /piilotaPilvet: \(kylla = true\) =>/);
  const pallo = readFileSync(new URL('../tools/savukkeet/savuke-astro-pallo.mjs', import.meta.url), 'utf8');
  assert.ok(pallo.includes('piilotaPilvet?.(true)'), 'astro-pallo ei piilota kuorta');
  assert.ok(pallo.includes('piilotaPilvet?.(false)'), 'astro-pallo ei palauta kuorta');
  const sumu = readFileSync(new URL('../tools/savukkeet/savuke-astro-sumu.mjs', import.meta.url), 'utf8');
  assert.ok(sumu.includes('piilotaPilvet?.(true)'), 'astro-sumu ei piilota kuorta');
  assert.ok(sumu.includes('access-control-allow-origin'), 'astro-sumu ei salli CORSia');
});
