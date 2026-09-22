/*
 * MAAKUNTAVEKTORIT (erä M0, tools/tee-maakuntavektorit.mjs).
 *
 * Kolmiointi voi mennä pieleen niin, että tulos näyttää silti kartalta:
 * korvanleikkaus hukkaa kolmion reiän vierestä, silta kääntää reiän
 * väärin päin, särmien puolitus jättää T-liitoksen naapurialueen
 * rajalle, tai tiedostomuoto pyöristää kärjen toiseen alueeseen.
 * Siksi puhtaat muunnokset testataan synteettisillä monikulmioilla,
 * joiden pinta-alan voi laskea päässä.
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import {
  koodaaMaa, kolmioiMaa, kolmioiPolygoni, piirteenIso, pintaAla, pisteAlueessa, puolitaSarmat, puraMaa, varita,
} from '../tools/tee-maakuntavektorit.mjs';

const risti = (a, b, c) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
const kolmioAla = (pisteet, kolmiot) => kolmiot.reduce((s, [a, b, c]) => s + risti(pisteet[a], pisteet[b], pisteet[c]) / 2, 0);

/** Suljettu rengas GeoJSON-tapaan (viimeinen = ensimmäinen). */
const rengas = (...p) => [...p, p[0]];
const nelio = (x0, y0, x1, y1) => rengas([x0, y0], [x1, y0], [x1, y1], [x0, y1]);

/* ---------------- korvanleikkaus ------------------------------------ */

test('neliö reiällä: kolmioiden ala = ulko − reikä, kaikki kolmiot CCW', () => {
  const k = kolmioiPolygoni([nelio(0, 0, 4, 4), nelio(1, 1, 3, 3)]);
  assert.ok(k);
  assert.ok(Math.abs(kolmioAla(k.pisteet, k.kolmiot) - 12) < 1e-9);
  for (const [a, b, c] of k.kolmiot) assert.ok(risti(k.pisteet[a], k.pisteet[b], k.pisteet[c]) > 0);
  // renkaiden välit: ulko [0,4), reikä [4,8)
  assert.deepEqual(k.valit, [[0, 4, 0], [4, 8, 1]]);
});

test('kovera C-monikulmio: ala täsmää ja kolmiot pysyvät sisällä', () => {
  const C = rengas([0, 0], [3, 0], [3, 1], [1, 1], [1, 2], [3, 2], [3, 3], [0, 3]);
  const k = kolmioiPolygoni([C]);
  assert.ok(Math.abs(kolmioAla(k.pisteet, k.kolmiot) - 7) < 1e-9);
  const paikat = new Float32Array(k.pisteet.flat());
  for (const [a, b, c] of k.kolmiot) {
    const cx = (k.pisteet[a][0] + k.pisteet[b][0] + k.pisteet[c][0]) / 3;
    const cy = (k.pisteet[a][1] + k.pisteet[b][1] + k.pisteet[c][1]) / 3;
    assert.ok(pisteAlueessa(paikat, k.valit, cx, cy), `kolmion keskipiste ${cx},${cy} ulkona`);
  }
});

test('myötäpäivään annettu ulkorengas ja vastapäivään annettu reikä käännetään', () => {
  const ulko = nelio(0, 0, 4, 4).reverse();
  const reika = nelio(1, 1, 2, 2);
  const k = kolmioiPolygoni([ulko, reika]);
  assert.ok(Math.abs(kolmioAla(k.pisteet, k.kolmiot) - 15) < 1e-9);
  assert.ok(pintaAla(k.pisteet.slice(0, 4)) > 0);
  assert.ok(pintaAla(k.pisteet.slice(4, 8)) < 0);
});

test('kaksi reikää eri korkeuksilla', () => {
  const k = kolmioiPolygoni([nelio(0, 0, 10, 10), nelio(1, 1, 3, 3), nelio(5, 6, 8, 9)]);
  assert.ok(Math.abs(kolmioAla(k.pisteet, k.kolmiot) - (100 - 4 - 9)) < 1e-9);
});

test('harvennus poistaa suoralla olevat välipisteet, mutta ala säilyy', () => {
  const r = rengas([0, 0], [1, 0], [2, 0], [2, 1], [2, 2], [1, 2], [0, 2], [0, 1]);
  const k = kolmioiPolygoni([r], 0.001);
  assert.equal(k.pisteet.length, 4);
  assert.ok(Math.abs(kolmioAla(k.pisteet, k.kolmiot) - 4) < 1e-9);
});

/* ---------------- särmien puolitus ---------------------------------- */

/** Särmä → kuinka monessa kolmiossa (avain koordinaateista, ei indekseistä). */
function sarmalaskuri(maa) {
  const n = new Map();
  for (const k of maa.kolmiot) {
    for (let e = 0; e < 3; e += 1) {
      const p = maa.pisteet[k[e]]; const q = maa.pisteet[k[(e + 1) % 3]];
      const a = `${p[0]},${p[1]}`; const b = `${q[0]},${q[1]}`;
      const key = a < b ? `${a}|${b}` : `${b}|${a}`;
      n.set(key, (n.get(key) ?? 0) + 1);
    }
  }
  return n;
}

test('puolitus: ei yli max-särmää, ala säilyy, ei T-liitoksia', () => {
  const k = kolmioiPolygoni([nelio(0, 0, 4, 4)]);
  const maa = { pisteet: k.pisteet, alue: k.pisteet.map(() => 0), kolmiot: k.kolmiot };
  const puolituksia = puolitaSarmat(maa, 1);
  assert.ok(puolituksia > 0);
  assert.ok(Math.abs(kolmioAla(maa.pisteet, maa.kolmiot) - 16) < 1e-9);
  for (const [a, b, c] of maa.kolmiot) {
    for (const [p, q] of [[a, b], [b, c], [c, a]]) {
      assert.ok(Math.hypot(maa.pisteet[p][0] - maa.pisteet[q][0], maa.pisteet[p][1] - maa.pisteet[q][1]) <= 1 + 1e-9);
    }
  }
  // Jokainen särmä on 1 (reuna) tai 2 (sisä) kolmiossa — T-liitos näkyisi
  // kolmena tai särmänä, jonka toisella puolella on kaksi lyhyempää.
  for (const [key, n] of sarmalaskuri(maa)) assert.ok(n === 1 || n === 2, `${key}: ${n}`);
});

test('puolitus jaetulla rajalla: naapurialueen kopio saa saman keskipisteen', () => {
  // Kaksi 4°×2°:n aluetta päällekkäin; yhteinen raja y = 2 on 4° pitkä.
  const a = kolmioiPolygoni([nelio(0, 0, 4, 2)]);
  const b = kolmioiPolygoni([nelio(0, 2, 4, 4)]);
  const maa = {
    pisteet: [...a.pisteet, ...b.pisteet],
    alue: [...a.pisteet.map(() => 0), ...b.pisteet.map(() => 1)],
    kolmiot: [...a.kolmiot, ...b.kolmiot.map((t) => t.map((i) => i + a.pisteet.length))],
  };
  puolitaSarmat(maa, 1.5);
  // Rajalla y = 2 olevat kärjet alueittain: samat x:t molemmilla puolilla.
  const rajaX = (alue) => [...new Set(maa.pisteet.filter((p, i) => p[1] === 2 && maa.alue[i] === alue).map((p) => p[0]))].sort((x, y) => x - y);
  assert.deepEqual(rajaX(0), rajaX(1));
  assert.ok(rajaX(0).length >= 4);
  // Kärki ei vaihda aluetta puolituksessa.
  for (const [x, y, z] of maa.kolmiot) assert.ok(maa.alue[x] === maa.alue[y] && maa.alue[y] === maa.alue[z]);
  assert.ok(Math.abs(kolmioAla(maa.pisteet, maa.kolmiot) - 16) < 1e-9);
});

/* ---------------- maa, väritys, tiedostomuoto ----------------------- */

const piirre = (name, ...polygonit) => ({
  properties: { name, adm0_a3: 'XXX' },
  geometry: polygonit.length === 1
    ? { type: 'Polygon', coordinates: polygonit[0] }
    : { type: 'MultiPolygon', coordinates: polygonit },
});

test('varita: naapureilla eri väri, kolmio kolmella värillä', () => {
  const v = varita([new Set([1, 2]), new Set([0, 2]), new Set([0, 1])]);
  assert.equal(new Set(v).size, 3);
});

test('kolmioiMaa: 2×2-ruudukko → neljä aluetta, naapurit eri värillä, reikä toisen alueen sisällä', () => {
  const piirteet = [
    piirre('LV', [nelio(0, 0, 2, 2)]),
    piirre('OV', [nelio(2, 0, 4, 2), nelio(2.5, 0.5, 3.5, 1.5)]),
    piirre('LY', [nelio(0, 2, 2, 4)]),
    piirre('OY', [nelio(2, 2, 4, 4)]),
    piirre('Saari', [nelio(2.5, 0.5, 3.5, 1.5)]),
  ];
  const maa = kolmioiMaa('XXX', piirteet, { harvennus: 0, maxsarma: 0, nimet: { LV: 'Lounas' } });
  assert.equal(maa.alueet.length, 5);
  assert.equal(maa.alueet[0].nimi, 'Lounas');
  assert.equal(maa.alueet[1].nimi, 'OV');
  const alue = Object.fromEntries(maa.alueet.map((a) => [a.tunnus, a]));
  assert.equal(alue.LV.naapureita, 2);
  assert.equal(alue.OV.naapureita, 3); // LV, OY ja saari reiän reunalla
  assert.notEqual(alue.LV.vari, alue.OV.vari);
  assert.notEqual(alue.OV.vari, alue.Saari.vari);
  assert.ok(maa.mitat.alaEro < 1e-9);
  assert.ok(maa.mitat.vareja <= 4);
  // Osuma: reiän piste kuuluu saarelle, ei OV:lle.
  const paikat = new Float32Array(maa.pisteet.flat());
  assert.equal(pisteAlueessa(paikat, alue.OV.renkaat, 3, 1), false);
  assert.equal(pisteAlueessa(paikat, alue.Saari.renkaat, 3, 1), true);
  assert.equal(pisteAlueessa(paikat, alue.OV.renkaat, 2.2, 1.8), true);
});

test('MKV1: koodaus ja purku palauttavat samat kärjet, alueet ja kolmiot', () => {
  const maa = kolmioiMaa('XXX', [piirre('A', [nelio(0, 0, 3, 3)]), piirre('B', [nelio(3, 0, 6, 3)])], { harvennus: 0, maxsarma: 1 });
  const puskuri = koodaaMaa(maa);
  const p = puraMaa(puskuri);
  assert.equal(p.alueita, 2);
  assert.equal(p.alue.length, maa.pisteet.length);
  assert.equal(p.kolmiot.length, maa.kolmiot.length * 3);
  for (let i = 0; i < maa.pisteet.length; i += 1) {
    assert.ok(Math.abs(p.paikat[i * 2] - maa.pisteet[i][0]) < 1e-6);
    assert.ok(Math.abs(p.paikat[i * 2 + 1] - maa.pisteet[i][1]) < 1e-6);
    assert.equal(p.alue[i], maa.alue[i]);
  }
  assert.deepEqual([...p.kolmiot], maa.kolmiot.flat());
  // Koko: otsikko 16 + kärjet 8K + alueet 2K (täyte 4:ään) + kolmiot 12T.
  const K = maa.pisteet.length; const T = maa.kolmiot.length;
  assert.equal(puskuri.length, 16 + 8 * K + Math.ceil((2 * K) / 4) * 4 + 12 * T);
});

test('admin-0: isot kenttänimet luetaan, yksi alue per maa, nimi NAME-kentästä', () => {
  const f = { properties: { ADM0_A3: 'XXX', NAME: 'Xland' }, geometry: { type: 'MultiPolygon', coordinates: [[nelio(0, 0, 1, 1)], [nelio(2, 0, 3, 1)]] } };
  assert.equal(piirteenIso(f.properties), 'XXX');
  assert.equal(piirteenIso({ adm0_a3: 'YYY' }), 'YYY');
  const maa = kolmioiMaa('XXX', [f], { harvennus: 0, maxsarma: 0, taso: 'admin0' });
  assert.equal(maa.alueet.length, 1);
  assert.equal(maa.alueet[0].tunnus, 'XXX');
  assert.equal(maa.alueet[0].nimi, 'Xland');
  assert.equal(maa.alueet[0].renkaat.length, 2);
  assert.ok(Math.abs(maa.alueet[0].ala - 2) < 1e-9);
});
