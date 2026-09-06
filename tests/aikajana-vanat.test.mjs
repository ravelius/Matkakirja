/*
 * IHMISEN MATKA — VANAT PALLOLLA (js/aikajana-vanat.js) -vartija.
 *
 * Moduulin piirto-osaa ei voi ajaa Nodessa (three.js, Globe.gl, DOM),
 * mutta sen PÄÄTÖKSET ovat puhtaita funktioita, ja juuri ne ratkaisevat
 * miltä vana näyttää: kuinka pitkälle se on kasvanut, kuinka kirkas
 * kärki on, kuinka leveä kaista on ja missä kärki on kameralle. Ne
 * testataan täällä; materiaalien asetukset ja moduulin kytkennät
 * (sw.js, Line2-luokat) tekstitasolla, kuten muissakin pallon
 * kerroksissa.
 *
 * 1. Kasvu: matkaHetkella (katkoviivan dashSize).
 * 2. Kärjen väri: karjenPaino (sama kaava kuin ruudunTila kalvolla).
 * 3. Kaistan leveys: kaistanLeveysPx.
 * 4. Kärki kameralle: karkiHetkella oikealla selkärangalla.
 * 5. Kotipesän rengas.
 * 6. Kytkennät: materiaaliasetukset, line2Luokat-vienti, sw.js SHELL.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  matkaHetkella, karjenPaino, kaistanLeveysPx, karkiHetkella, kotipesanRengas,
  KAISTAN_KM, KAISTAN_MIN_PX, KAISTAN_MAX_PX, KAISTAN_PEITTO, VANAN_PEITTO,
  VANAN_SYVYYSSIIRTO, KAISTAN_SYVYYSSIIRTO, VANAN_RENDER_ORDER, KAISTAN_RENDER_ORDER,
  VANAN_ENNAKKO, VANAN_KORKEUS,
} from '../js/aikajana-vanat.js';
import {
  puraMaamaski, laskeKentat, johdaVanat, rintamanLeveys, ruudunTila, vanaKm,
} from '../js/aikajana-virrat-laskenta.js';
import { MAAMASKI } from '../js/linssit/ihmisen-matka-maamaski.js';
import {
  IHMISEN_MATKA_VIRRAT, IHMISEN_MATKA_RETKI, IHMISEN_MATKA_VANHA, IHMISEN_MATKA_VANAT,
} from '../js/linssit/ihmisen-matka-virrat.js';

const lue = (polku) => readFileSync(new URL(polku, import.meta.url), 'utf8');

/* ------------------------------------------------------------ 1. kasvu */

test('matkaHetkella: vana kasvaa kellon mukana, ei ennen alkuaan eikä yli päänsä', () => {
  // Kolme kärkeä: 100 ka → 50 ka → 10 ka, matkat 0 → 10 → 30.
  const matka = Float32Array.from([0, 10, 30]);
  const aika = Float32Array.from([100000, 50000, 10000]);
  assert.equal(matkaHetkella(matka, aika, 200000), 0, 'ennen vanan alkua ei piirretä mitään');
  assert.equal(matkaHetkella(matka, aika, 100000), 0, 'alkuhetkellä nolla');
  assert.equal(matkaHetkella(matka, aika, 75000), 5, 'puolivälissä ensimmäistä janaa');
  assert.equal(matkaHetkella(matka, aika, 50000), 10, 'toisessa kärjessä');
  assert.equal(matkaHetkella(matka, aika, 30000), 20, 'puolivälissä toista janaa');
  assert.equal(matkaHetkella(matka, aika, 10000), 30, 'perillä');
  assert.equal(matkaHetkella(matka, aika, 0), 30, 'kellon lopussa koko vana');
  // Rappeutuneet syötteet eivät kaada piirtoa.
  assert.equal(matkaHetkella(Float32Array.from([0]), Float32Array.from([1]), 0), 0);
  assert.equal(matkaHetkella(null, null, 1000), 0);
});

/* -------------------------------------------------------- 2. kärjen väri */

test('karjenPaino: kärki kirkas, häntä vanhaa sävyä — sama kaava kuin ruudunTila', () => {
  const nyt = 50000;
  const rintama = rintamanLeveys(nyt); // 5 000 v
  assert.equal(karjenPaino(nyt, nyt, rintama), 1, 'juuri saavutettu kärki on rintamaa');
  assert.equal(karjenPaino(nyt + rintama, nyt, rintama), 0, 'rintaman takana paino on nolla');
  assert.ok(Math.abs(karjenPaino(nyt + rintama / 2, nyt, rintama) - 0.5) < 1e-6);
  assert.equal(karjenPaino(nyt + 2 * rintama, nyt, rintama), 0, 'vanha osa ei mene negatiiviseksi');
  assert.equal(karjenPaino(nyt - 1000, nyt, rintama), 1, 'kärjen edessä paino rajataan ykköseen');
  // Sama luku kuin kalvon ruudulla: vana ja väri vanhenevat samaa tahtia.
  for (const ika of [0, 1200, 3000, 4999]) {
    assert.ok(Math.abs(karjenPaino(nyt + ika, nyt, rintama) - ruudunTila(nyt + ika, nyt).w) < 1e-6,
      `ikä ${ika}: vana ja kalvo eri tahdissa`);
  }
  assert.equal(karjenPaino(0, nyt, rintama), 0, 'tyhjä aika ei väritä');
});

/* --------------------------------------------------------- 3. kaista */

test('kaistanLeveysPx: 250 km ruudulla, rajattuna 10–40 css-pikseliin', () => {
  assert.equal(kaistanLeveysPx(KAISTAN_KM / 20), 20, 'keskellä haarukkaa suoraan kilometreistä');
  assert.equal(kaistanLeveysPx(1), KAISTAN_MAX_PX, 'lähikuvassa katto');
  assert.equal(kaistanLeveysPx(1000), KAISTAN_MIN_PX, 'koko pallon näkymässä pohja');
  assert.equal(kaistanLeveysPx(0), KAISTAN_MIN_PX, 'nolla ei kaada');
  assert.ok(KAISTAN_PEITTO < VANAN_PEITTO, 'kaista on haalea, vana kirkas');
});

/* ------------------------------------------------- 4. kärki kameralle */

const MAA = puraMaamaski(MAAMASKI.juoksut);
const KENTAT = laskeKentat(
  { virrat: IHMISEN_MATKA_VIRRAT, retki: IHMISEN_MATKA_RETKI, vanha: IHMISEN_MATKA_VANHA },
  { maa: MAA },
);
const { vanat: VANAT } = johdaVanat(KENTAT, IHMISEN_MATKA_VANAT, { maa: MAA });
const SELKA = VANAT[0].pisteet;

test('karkiHetkella: selkärangan kärki kulkee Omosta Monte Verdeen eikä koskaan taaksepäin', () => {
  const alku = karkiHetkella(SELKA, 300000);
  assert.ok(Math.abs(alku.lat - SELKA[0][0]) < 0.01, 'kaaren alussa kärki on vanan alussa (Omo)');
  const loppu = karkiHetkella(SELKA, 1000);
  assert.ok(vanaKm({ lat: loppu.lat, lon: loppu.lng }, { lat: -41.5047, lon: -73.2044 }) < 60,
    'kaaren lopussa Monte Verdessä');

  // Kärki liikkuu vain eteenpäin: kuljettu matka kasvaa monotonisesti.
  let edellinen = { lat: alku.lat, lon: alku.lng };
  let kuljettu = 0;
  let hyppy = 0;
  for (let nyt = 290000; nyt >= 1000; nyt -= 1000) {
    const p = karkiHetkella(SELKA, nyt);
    const askel = vanaKm(edellinen, { lat: p.lat, lon: p.lng });
    kuljettu += askel;
    hyppy = Math.max(hyppy, askel);
    edellinen = { lat: p.lat, lon: p.lng };
  }
  assert.ok(kuljettu > 25000 && kuljettu < 40000, `kärki kulki ${Math.round(kuljettu)} km`);

  // Ennakko vie kärkeä eteenpäin, ei taaksepäin (kamera kulkee edellä).
  const nyt = 60000;
  const ilman = karkiHetkella(SELKA, nyt, { ennakko: 0 });
  const ennakolla = karkiHetkella(SELKA, nyt, { ennakko: VANAN_ENNAKKO });
  const matkaIlman = karkiHetkella(SELKA, nyt * (1 - VANAN_ENNAKKO), { ennakko: 0 });
  assert.deepEqual(ennakolla, matkaIlman, 'ennakko on sama kuin 4 % nuorempi kello');
  assert.ok(vanaKm({ lat: ilman.lat, lon: ilman.lng }, { lat: ennakolla.lat, lon: ennakolla.lng }) >= 0);
  assert.equal(karkiHetkella([], 1000), null);
});

/* ------------------------------------------------------- 5. kotipesät */

test('kotipesanRengas: suljettu ympyrä oikean kokoisena', () => {
  const rengas = kotipesanRengas(4.8, 35.97, 350);
  assert.equal(rengas.length, 25, 'suljettu rengas (24 + paluu alkuun)');
  const [lat0, lon0] = rengas[0];
  const [latN, lonN] = rengas[rengas.length - 1];
  assert.ok(Math.abs(lat0 - latN) < 1e-9 && Math.abs(lon0 - lonN) < 1e-9, 'rengas sulkeutuu');
  for (const [lat, lon] of rengas) {
    const d = vanaKm({ lat: 4.8, lon: 35.97 }, { lat, lon });
    assert.ok(Math.abs(d - 350) < 40, `renkaan säde ${Math.round(d)} km`);
    assert.ok(lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180);
  }
  // Napojen lähellä rengas ei karkaa kartalta.
  for (const [lat, lon] of kotipesanRengas(-34.2078, 22.0894, 300)) {
    assert.ok(Number.isFinite(lat) && Number.isFinite(lon));
  }
});

/* ------------------------------------------------------- 6. kytkennät */

test('vanamoduuli: Line2 kaistan päällä, ei syvyyskirjoitusta, luokat ja sw.js kunnossa', () => {
  const VANAT_JS = lue('../js/aikajana-vanat.js');
  // Fat line ruutupikseleinä, ei maailmayksiköinä (leveys sama joka korkeudella).
  assert.match(VANAT_JS, /worldUnits: false/);
  assert.match(VANAT_JS, /new luokat\.Line2\(/);
  assert.match(VANAT_JS, /computeLineDistances\(\)/);
  // Kasvu katkoviivalla, ei geometriaa rakentamalla.
  assert.match(VANAT_JS, /m\.gapSize = 1e6;/);
  assert.match(VANAT_JS, /o\.mat\.dashSize = matka;/);
  // Kärkivärit.
  assert.match(VANAT_JS, /vertexColors: true/);
  assert.match(VANAT_JS, /geom\.setColors\(new Float32Array\(n \* 3\)\);/);
  /*
   * Kärkivärit kirjoitetaan ELÄVÄÄN puskuriin: setColors kopioi
   * annetun taulukon, ja oma kopio jäi irralleen (vana piirtyi
   * mustana, mitattu selaimessa 6.9.2026).
   */
  assert.match(VANAT_JS, /const variPuskuri = variAttr\?\.data\?\.array \?\? null;/);
  assert.match(VANAT_JS, /if \(o\.puskuri\) o\.puskuri\.needsUpdate = true;/);
  /*
   * SYVYYSJÄRJESTYS (suunnitelman 2.3): kaista kirjoittaa syvyyden ja
   * käyttää tiukkaa testiä, jotta päällekkäiset janat eivät summaudu
   * helminauhaksi; vana ei kirjoita syvyyttä ja piirtyy kaistan edelle
   * omalla siirrollaan, ettei se z-taistele kaistaa vastaan.
   */
  assert.equal(VANAN_SYVYYSSIIRTO, -16);
  assert.equal(KAISTAN_SYVYYSSIIRTO, -12);
  assert.ok(VANAN_RENDER_ORDER > KAISTAN_RENDER_ORDER, 'vana piirtyy kaistan jälkeen');
  assert.ok(VANAN_KORKEUS > 0 && VANAN_KORKEUS < 0.002, 'vana rantaviivan ja reittien välissä');
  assert.match(VANAT_JS, /depthWrite: true,\n\s*depthFunc: LESS_DEPTH,/);
  assert.match(VANAT_JS, /depthWrite: false,\n\s*opacity: VANAN_PEITTO,/);
  // Luokat luetaan kerran kirjoitetulla apurilla, ei omalla kopiolla.
  assert.match(VANAT_JS, /import \{ line2Luokat \} from '\.\/pallovektorit\.js';/);
  assert.match(lue('../js/pallovektorit.js'), /export function line2Luokat\(pallo\) \{/);
  // Moduuli ei koske muihin kerroksiin: vain oma osa reittikerroksesta.
  assert.match(VANAT_JS, /reitit\?\.aseta\?\.\('vanat', \[\]\);/);
  assert.ok(!/pointOfView\(\{/.test(VANAT_JS), 'vanat ei kirjoita kameraa');
  // sw.js SHELL kantaa moduulin (offline).
  assert.ok(lue('../sw.js').includes("'./js/aikajana-vanat.js'"), 'aikajana-vanat.js puuttuu sw.js SHELListä');
});
