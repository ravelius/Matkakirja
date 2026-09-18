/*
 * RELIEFIPYRAMIDIN LAATASTO — kytkin, osoitteet ja meripeitto.
 *
 * Nämä testit vartioivat sitä, mitä ei voi nähdä kuvasta: että laatasto
 * on oletuksena PÄÄLLÄ (18.9.2026, erä 4 — laatat ovat ämpärissä) ja
 * että `?reliefipyramidi=0` palauttaa vanhan yhden kuvan polun, että
 * laatan osoite osoittaa oikeaan polkuun ja että avomeren aukot luetaan
 * laattakartaksi eikä 404:n arvoisiksi hauiksi.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import {
  MERIVARI, VERSIO_VARALLA, asetaReliefiLinssi, meripeitonBitit, nollaaReliefi,
  reliefiKaytossa, reliefinJuuri, reliefinLaattaUrl, reliefinSyvinTaso, reliefinTaso,
  reliefinVersio, reliefipyramidiPaalla,
} from '../js/reliefipyramidi.js';

const juuri = dirname(fileURLToPath(import.meta.url));
const lue = (polku) => readFileSync(join(juuri, polku), 'utf8');

const ikkuna = (haku, kansio) => ({
  location: { search: haku },
  ...(kansio ? { RELIEFIPYRAMIDI_KANSIO: kansio } : {}),
});

test('laatasto on oletuksena päällä, ?reliefipyramidi=0 ottaa sen pois', () => {
  assert.equal(reliefipyramidiPaalla(ikkuna('')), true);
  assert.equal(reliefipyramidiPaalla(ikkuna('?linssi=topografia')), true);
  assert.equal(reliefipyramidiPaalla(ikkuna('?reliefipyramidi=1')), true);
  assert.equal(reliefipyramidiPaalla(ikkuna('?reliefipyramidi=0')), false);
  assert.equal(reliefipyramidiPaalla(ikkuna('?reliefipyramidi=false')), false);
});

test('kytkin yksin ei riitä: linssin on oltava auki', () => {
  nollaaReliefi();
  const paalla = ikkuna('?reliefipyramidi=1');
  const pois = ikkuna('?reliefipyramidi=0');
  assert.equal(reliefiKaytossa(paalla), false, 'linssi kiinni');
  assert.equal(reliefiKaytossa(ikkuna('')), false, 'linssi kiinni, oletuskytkin');
  asetaReliefiLinssi(true);
  assert.equal(reliefiKaytossa(paalla), true, 'linssi auki ja kytkin päällä');
  assert.equal(reliefiKaytossa(ikkuna('')), true, 'linssi auki, kytkin oletuksena');
  assert.equal(reliefiKaytossa(pois), false, 'linssi auki mutta kytkin kielletty');
  asetaReliefiLinssi(false);
  assert.equal(reliefiKaytossa(paalla), false, 'linssi suljettu');
  nollaaReliefi();
});

test('juuri on ämpäri, ellei savuke osoita paikalliseen kansioon', () => {
  assert.equal(
    reliefinJuuri(ikkuna('')),
    'https://media.matkakirja.app/matkakirja/reliefipyramidi/',
  );
  // Savukkeen kansio korvaa ämpärin, ja kauttaviiva täydentyy.
  assert.equal(reliefinJuuri(ikkuna('', '/levy/reliefi')), '/levy/reliefi/');
  assert.equal(reliefinJuuri(ikkuna('', '/levy/reliefi/')), '/levy/reliefi/');
});

test('laatan osoite: versio polussa, z/sarake/rivi sen alla', () => {
  nollaaReliefi();
  assert.equal(reliefinVersio(), VERSIO_VARALLA);
  assert.equal(
    reliefinLaattaUrl({ z: 7 }, 166, 21, ikkuna('')),
    `https://media.matkakirja.app/matkakirja/reliefipyramidi/${VERSIO_VARALLA}/z7/166/21.webp`,
  );
  assert.equal(
    reliefinLaattaUrl({ z: 4 }, 9, 8, ikkuna('', '/levy/reliefi')),
    `/levy/reliefi/${VERSIO_VARALLA}/z4/9/8.webp`,
  );
});

test('meriLaatat kääntyy laattakartaksi: aukot eivät lähde hakuun', () => {
  // 4 × 2 ruutua, joista kaksi on avomerta.
  const bitit = meripeitonBitit({
    sarakkeita: 4, riveja: 2, meriLaatat: ['0/0', '3/1'],
  });
  const on = (s, r) => {
    const i = r * 4 + s;
    return ((bitit[i >> 3] >> (i & 7)) & 1) === 1;
  };
  assert.equal(on(0, 0), false, 'avomeri 0/0');
  assert.equal(on(3, 1), false, 'avomeri 3/1');
  assert.equal(on(1, 0), true);
  assert.equal(on(2, 1), true);
  // Roskarivit eivät kaada eivätkä sammuta muita.
  const siedetty = meripeitonBitit({
    sarakkeita: 2, riveja: 1, meriLaatat: ['', 'x/y', '9/9', '0/0'],
  });
  assert.equal(((siedetty[0] >> 0) & 1) === 1, false);
  assert.equal(((siedetty[0] >> 1) & 1) === 1, true);
});

test('tasot saavat reliefilipun, meripeiton ja meren taustavärin', () => {
  nollaaReliefi({
    versio: '20260918',
    tasot: [{ z: 7, sarakkeita: 169, riveja: 91, meriLaatat: ['0/0'] }],
  });
  const taso = reliefinTaso(7);
  assert.equal(taso.reliefi, true);
  assert.equal(taso.taustavari, MERIVARI);
  assert.ok(taso.__bitit instanceof Uint8Array, 'bittikartta on purettu valmiiksi');
  assert.equal(reliefinTaso(3), null, 'tasoa 3 ei ole tässä luettelossa');
  nollaaReliefi();
});

/*
 * ARKKI ON PIKSELILLEEN PÄÄKARTAN ARKKI. Tämä on koko kytkennän ehto:
 * jos reliefipyramidin arkki tai tasogeometria eroaisi pohjan
 * laatastosta, sama laattakone piirtäisi reliefin väärään kohtaan
 * lautaa — eikä sitä huomaisi muuten kuin silmällä.
 */
test('reliefin arkki on sama kuin laattapyramidin ARKKI_VARALLA', () => {
  const tyokalu = lue('../tools/tee-reliefipyramidi.mjs');
  const pyramidi = lue('../js/laattapyramidi.js');
  assert.match(tyokalu, /LAUTA = \{ leveys: 12000, lon0: -175/);
  assert.match(tyokalu, /export const LAATTA = 512;/);
  assert.match(pyramidi, /x: 0, y: -1046\.3149255312064, w: 12000, h: 7307\.715927310571/);
});

/*
 * POHJATTOMUUS (omistajan lisäys 18.9.2026, Raamattu LISAYS 16 kohta
 * 49): reliefin alle ei ladota seepiapohjaa. Testi lukee koodin, koska
 * kerrosvalinta on puhdas funktio vasta luettelon kanssa — ja koska
 * juuri tämä rivi on se, jonka poisto palauttaisi välähdyksen.
 */
test('reliefi korvaa pohjan eikä peitä sitä', () => {
  const pyramidi = lue('../js/laattapyramidi.js');
  assert.match(pyramidi, /return \[reliefi, \.\.\.merkit\];/);
  const laatat = lue('../js/pallolaatat.js');
  assert.match(laatat, /pohja: !reliefi,/);
  assert.match(laatat, /vari: vari && !reliefi,/);
  // Avomeri maalataan taustavärillä eikä merkitä virheeksi; puuttuvan
  // laatan paikanpitäjä on karkeampi reliefilaatta (PAATOKSET 41).
  assert.match(laatat, /if \(!kuvat\.some\(Boolean\) && !tausta && !vara\)/);
  assert.match(laatat, /varaKartta = reliefinVaraLahde\(t\.z, t\.sarake, t\.rivi, laattaKoko\(\)\);/);
});

/*
 * RELIEFIN KATTO, KOLME MITATTUA VIKAA YHDESSÄ TESTISSÄ (18.9.2026,
 * tools/savukkeet/mittaa-reliefipyramidi.mjs, Chromium 390 × 844,
 * Alppien lähizoomi):
 *
 *   1. Kerros valitsi tason POHJAN luettelosta, jossa on z8. Reliefi
 *      on poltettu z7:ään, joten jokainen laatta jäi tilaan `virhe`,
 *      ruutu oli musta eikä yhtään laattapyyntöä lähtenyt.
 *   2. Lipun nosto ei yksin herättänyt kerrosta: paikallaan olevassa
 *      näkymässä ensimmäinen reliefilaattapyyntö lähti vasta 15,7 s
 *      päästä, kun kamera liikkui.
 *   3. Linssin vaihtuminen ei mitätöinyt jo koottuja seepialaattoja,
 *      joten kytkin ei näkynyt ruudulla lainkaan.
 *
 * Kaikki kolme ovat yhden rivin kokoisia, ja jokainen niistä palaisi
 * huomaamatta — vika näkyy vain ruudulla, ei virheenä.
 */
test('reliefin syvin taso on laattakoneen katto, ja kytkin herättää kerroksen', () => {
  nollaaReliefi({
    versio: '20260918',
    tasot: [
      { z: 6, sarakkeita: 85, riveja: 46, meriLaatat: [] },
      { z: 7, sarakkeita: 169, riveja: 91, meriLaatat: [] },
    ],
  });
  assert.equal(reliefinSyvinTaso(), 7);
  nollaaReliefi();
  assert.equal(reliefinSyvinTaso(), null, 'ilman luetteloa ei kattoa');

  const laatat = lue('../js/pallolaatat.js');
  assert.match(laatat, /valittu\.z > reliefinKatto/, 'taso rajataan reliefin kattoon');
  assert.match(laatat, /kerrokset\.reliefi !== reliefiEdellinen/, 'lipun vaihto mitätöi laatat');
  const linssi = lue('../js/linssit/topografia.js');
  assert.match(linssi, /lauta\.lepokerros\?\.\(\)\?\.kokoa\?\.\(\)/, 'kerros herätetään');
});
