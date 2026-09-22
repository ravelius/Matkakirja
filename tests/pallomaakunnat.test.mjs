/*
 * MAAKUNTAVEKTORIT PALLOLLA (erä M1, js/pallomaakunnat.js).
 *
 * Kerros lukee ämpärin MKV1-puskurin, nostaa kärjet pallolle ja
 * värittää ne alueen mukaan; osuma lasketaan samoista kärjistä.
 * Testit kattavat puhtaat osat ilman three.js:ää:
 *
 *  1. purkaja ja osumatesti ovat SAMA RUNKO kuin työkalussa
 *     (tools/tee-maakuntavektorit.mjs) — tekstivertailu kuten
 *     puraDelta-vartiolla, koska työkalu ei voi tuoda pelin moduulia;
 *  2. kärjet nousevat säteelle R·(1 + korotus) ja väri tulee
 *     paletista alueen `vari`-indeksillä, valittu alue vahvemmalla;
 *  3. osuma laatikko ensin, reikä pois, päivämäärärajan alue kierrettynä;
 *  4. indeksin luokka ei muunna Uint32-taulukkoa (Float32BufferAttribute
 *     teki niin ja kolmiot katosivat — mitattu savukkeella);
 *  5. kytkin: oletus pois, `?maakunnat=1` päälle.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  MAAKUNNAT_KORKEUS, MAAKUNNAT_PALETTI, MAAKUNNAT_PEITTO, MAAKUNNAT_RENDER_ORDER, MAAKUNNAT_SYVYYSSIIRTO,
  MAAKUNNAT_VALITTU_PEITTO, PALLOMAAKUNNAT_JUURI, PALLOMAAKUNNAT_OLETUS, PALLOMAAKUNNAT_VERSIO,
  indeksiluokka, maakuntienKarjet, osumaAlueissa, pallomaakunnatPaalla, puraMaa,
} from '../js/pallomaakunnat.js';
import { VEKTORIT_RENDER_ORDER, VEKTORIT_SYVYYSSIIRTO } from '../js/pallovektorit.js';
import { koodaaMaa, kolmioiMaa } from '../tools/tee-maakuntavektorit.mjs';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

/** Funktion runko tekstinä: `export function nimi(` … vastaava `}`. */
function runko(lahde, nimi) {
  const alku = lahde.indexOf(`export function ${nimi}(`);
  if (alku < 0) return null;
  const auki = lahde.indexOf('{', alku);
  let syvyys = 0;
  for (let i = auki; i < lahde.length; i += 1) {
    if (lahde[i] === '{') syvyys += 1;
    else if (lahde[i] === '}') {
      syvyys -= 1;
      if (syvyys === 0) return lahde.slice(auki, i + 1).replace(/\s+/g, ' ').trim();
    }
  }
  return null;
}

test('puraMaa ja pisteAlueessa ovat sama runko työkalussa ja pelissä', () => {
  const tyokalu = lue('../tools/tee-maakuntavektorit.mjs');
  const peli = lue('../js/pallomaakunnat.js');
  for (const nimi of ['puraMaa', 'pisteAlueessa']) {
    const a = runko(tyokalu, nimi); const b = runko(peli, nimi);
    assert.ok(a && b, `${nimi} puuttuu`);
    assert.equal(a, b, `${nimi}: rungot eroavat`);
  }
});

const nelio = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]];
const piirre = (name, ...polygonit) => ({
  properties: { name, adm0_a3: 'XXX' },
  geometry: polygonit.length === 1 ? { type: 'Polygon', coordinates: polygonit[0] } : { type: 'MultiPolygon', coordinates: polygonit },
});

/** Kaksi aluetta vierekkäin päiväntasaajalla, toisessa reikä. */
function koemaa() {
  const maa = kolmioiMaa('XXX', [
    piirre('A', [nelio(0, 0, 2, 2)]),
    piirre('B', [nelio(2, 0, 4, 2), nelio(2.5, 0.5, 3.5, 1.5)]),
  ], { harvennus: 0, maxsarma: 0 });
  const purettu = puraMaa(koodaaMaa(maa));
  const alueet = maa.alueet.map((x) => ({ tunnus: x.tunnus, nimi: x.nimi, vari: x.vari, laatikko: x.laatikko, renkaat: x.renkaat }));
  return { maa, purettu, alueet };
}

test('kärjet nousevat säteelle R(1 + korotus) ja väri tulee alueen paletista', () => {
  const { purettu, alueet } = koemaa();
  const { paikat, varit } = maakuntienKarjet(purettu, alueet, 100);
  assert.equal(paikat.length, purettu.alue.length * 3);
  for (let i = 0; i < purettu.alue.length; i += 1) {
    const r = Math.hypot(paikat[i * 3], paikat[i * 3 + 1], paikat[i * 3 + 2]);
    assert.ok(Math.abs(r - 100 * (1 + MAAKUNNAT_KORKEUS)) < 1e-3, `kärki ${i} säde ${r}`);
    const odotus = MAAKUNNAT_PALETTI[alueet[purettu.alue[i]].vari];
    assert.ok(Math.abs(varit[i * 3] - odotus[0]) < 1e-6);
  }
  // Naapureilla eri väri → eri paletin rivi.
  assert.notEqual(alueet[0].vari, alueet[1].vari);
  // Valittu alue vahvemmalla: väri × (valittu peitto / peitto), enintään 1.
  const valittu = maakuntienKarjet(purettu, alueet, 100, 1);
  const k = MAAKUNNAT_VALITTU_PEITTO / MAAKUNNAT_PEITTO;
  const eka1 = purettu.alue.indexOf(1);
  assert.ok(Math.abs(valittu.varit[eka1 * 3] - Math.min(1, MAAKUNNAT_PALETTI[alueet[1].vari][0] * k)) < 1e-6);
  const eka0 = purettu.alue.indexOf(0);
  assert.ok(Math.abs(valittu.varit[eka0 * 3] - MAAKUNNAT_PALETTI[alueet[0].vari][0]) < 1e-6, 'valitsematon ennallaan');
});

test('osuma: laatikko ensin, reikä ei osu, saumassa oleva alue kierretyllä pituusasteella', () => {
  const { purettu, alueet } = koemaa();
  assert.equal(osumaAlueissa(purettu.paikat, alueet, 1, 1), 0);
  assert.equal(osumaAlueissa(purettu.paikat, alueet, 2.2, 1.8), 1);
  assert.equal(osumaAlueissa(purettu.paikat, alueet, 3, 1), null, 'reikä');
  assert.equal(osumaAlueissa(purettu.paikat, alueet, 5, 1), null, 'laatikon ulkopuolella');
  assert.equal(osumaAlueissa(purettu.paikat, alueet, 1, -1), null);
  // Päivämääräraja: alue 178…182 tallennettuna kahtena palana (178…180 ja −180…−178).
  const sauma = kolmioiMaa('XXX', [piirre('S', [nelio(178, 0, 180, 2)], [nelio(-180, 0, -178, 2)])], { harvennus: 0, maxsarma: 0 });
  const p = puraMaa(koodaaMaa(sauma));
  const al = sauma.alueet.map((x) => ({ vari: 0, laatikko: x.laatikko, saumassa: x.saumassa, renkaat: x.renkaat }));
  assert.equal(al[0].saumassa, true);
  assert.equal(osumaAlueissa(p.paikat, al, 179, 1), 0);
  assert.equal(osumaAlueissa(p.paikat, al, -179, 1), 0);
  assert.equal(osumaAlueissa(p.paikat, al, 170, 1), null);
});

test('indeksiluokka: muuntava attribuuttiluokka ohitetaan kantaluokkaan', () => {
  class Kanta { constructor(array, koko) { this.array = array; this.itemSize = koko; } }
  class Muuntava extends Kanta { constructor(array, koko) { super(new Float32Array(array), koko); } }
  assert.equal(indeksiluokka(Muuntava), Kanta);
  assert.equal(indeksiluokka(Kanta), Kanta);
  class Paha { constructor() { throw new Error('ei'); } }
  assert.equal(indeksiluokka(Paha), Paha, 'ei kelpaavaa → annettu luokka');
});

test('kytkin: oletus pois, osoiteparametri ja muisti kytkevät', () => {
  assert.equal(PALLOMAAKUNNAT_OLETUS, false);
  assert.equal(pallomaakunnatPaalla({ location: { search: '' } }), false);
  assert.equal(pallomaakunnatPaalla({ location: { search: '?maakunnat=1' } }), true);
  assert.equal(pallomaakunnatPaalla({ location: { search: '?maakunnat=0' }, localStorage: { getItem: () => '1' } }), false);
  assert.equal(pallomaakunnatPaalla({ location: { search: '' }, localStorage: { getItem: () => '1' } }), true);
  assert.ok(PALLOMAAKUNNAT_JUURI.endsWith(`/maakunnat/${PALLOMAAKUNNAT_VERSIO}/`));
});

test('piirtojärjestys: täyttö viivojen alla, sama syvyyssiirto kuin viivoilla', () => {
  assert.ok(MAAKUNNAT_RENDER_ORDER < VEKTORIT_RENDER_ORDER);
  assert.equal(MAAKUNNAT_SYVYYSSIIRTO, VEKTORIT_SYVYYSSIIRTO);
});
