/*
 * Satelliittisarja (tools/tee-satelliitti.mjs): natiivin lentotilan pinta,
 * BMNG Z0–Z7 koko maailma + Sentinel-2 cloudless 2016 Z8–Z11 kaupunkien
 * ympärillä (Karttaseppä 24.9.2026). Vain puhtaat osat: projektio,
 * pystysuunnan painot, kaupunkien laatikot ja laattalistat,
 * kattavuussääntö, luettelot ja värisovitus — ei verkkoa eikä kuvia.
 * (Satelliittilinssin testit ovat eri tiedostossa satelliitti.test.mjs.)
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  BMNG_OSAN_SIVU, EOX_ATTRIBUUTIO, EOX_OSOITE, GAMMA_RAJAT, LAATTA, MERC_RAJA, S2_SAANTO,
  bmngLuettelo, bmngTiedosto, eoxTaso, kaupunginLaatikko, kaupungitLaatikoin, kaupunkienLaatat,
  kayranTaulu, kvantiilit, laatanReunat, laatikonLaatat, leikkaa, maailmanLaatat, maailmanPikseli,
  onS2Laatta, onVesi, osanRajat, osanRivit, pikselinLeveysaste, rivinPainot, s2Luettelo, sovitaKayra,
  tasonLaatat, yhdistaSovitukset,
} from '../tools/tee-satelliitti.mjs';

const KAUPUNGIT = JSON.parse(readFileSync(new URL('../tools/satelliitti-kaupungit.json', import.meta.url), 'utf8')).kaupungit;
const lahella = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps;

test('Mercator: pikseli ja leveysaste ovat toistensa käänteiset, raja 85,0511°', () => {
  assert.ok(lahella(MERC_RAJA, 85.0511287798, 1e-9));
  for (const Z of [0, 3, 7, 11]) {
    for (const lat of [-80, -33.87, 0, 48.8451, 60.17, 84.9]) {
      const [, py] = maailmanPikseli(10, lat, Z);
      assert.ok(lahella(pikselinLeveysaste(py, Z), lat, 1e-9), `Z${Z} lat ${lat}`);
    }
  }
  assert.ok(lahella(pikselinLeveysaste(0, 7), MERC_RAJA, 1e-9));
  assert.ok(lahella(pikselinLeveysaste(LAATTA * 2 ** 6, 7), 0, 1e-12));
  // Laatan reunat ovat samat kuin pikselirivien reunat.
  const r = laatanReunat(8, 129, 87);
  assert.ok(lahella(r.pohjoinen, pikselinLeveysaste(87 * LAATTA, 8)));
  assert.ok(lahella(r.etela, pikselinLeveysaste(88 * LAATTA, 8)));
  assert.equal(r.lansi, (129 / 256) * 360 - 180);
});

test('BMNG-osat: A–D ovat 90°:n kaistat 180° W:stä, 1 pohjoinen ja 2 eteläinen', () => {
  assert.deepEqual(osanRajat('A1'), { lon0: -180, lon1: -90, lat0: 0, lat1: 90 });
  assert.deepEqual(osanRajat('C1'), { lon0: 0, lon1: 90, lat0: 0, lat1: 90 });
  assert.deepEqual(osanRajat('D2'), { lon0: 90, lon1: 180, lat0: -90, lat1: 0 });
  assert.throws(() => osanRajat('E1'));
  const t = bmngTiedosto('200408', 'topo.bathy', 'C1');
  assert.equal(t.nimi, 'world.topo.bathy.200408.3x21600x21600.C1.jpg');
  assert.match(t.osoite, /bmng-topography-bathymetry\/august\/world\.topo\.bathy\.200408\.3x21600x21600\.C1\.jpg$/);
  assert.match(bmngTiedosto('200401', 'topo', 'A2').osoite, /bmng-topography\/january\/world\.topo\.200401\.3x21600x21600\.A2\.jpg$/);
  // Tasoilla Z ≥ 2 laatta ei koskaan ylitä osan rajaa (90° ja päiväntasaaja ovat laatan reunoja).
  for (const Z of [2, 5, 7]) {
    for (const [X, Y] of tasonLaatat(Z).filter((_, i) => i % 7 === 0)) {
      const r = laatanReunat(Z, X, Y);
      const lonOsa = (l) => Math.floor((l + 180) / 90);
      assert.equal(lonOsa(r.lansi), lonOsa(r.ita - 1e-9));
      assert.ok((r.pohjoinen > 0) === (r.etela >= -1e-12));
    }
  }
});

test('osanRivit: pohjoinen osa kattaa rivit 0…n/2 aukottomasti ja päättyy päiväntasaajalle', () => {
  const Z = 7;
  const n = LAATTA * 2 ** Z;
  const p = osanRivit('C1', Z);
  assert.equal(p.py0, 0); assert.equal(p.py1, n / 2); assert.equal(p.rivit.length, n / 2);
  assert.ok(lahella(p.rivit[0][0], (90 - MERC_RAJA) * 240, 1e-6), 'ensimmäinen rivi alkaa Mercatorin rajalta');
  assert.ok(lahella(p.rivit.at(-1)[1], BMNG_OSAN_SIVU, 1e-6), 'viimeinen rivi päättyy päiväntasaajalle');
  for (let i = 1; i < p.rivit.length; i += 1) assert.ok(lahella(p.rivit[i][0], p.rivit[i - 1][1], 1e-6));
  // Päiväntasaajalla Z7-rivi kattaa 240 / (32768 / 360) ≈ 2,64 lähderiviä, napa-alueella alle yhden.
  const alin = p.rivit.at(-1);
  assert.ok(lahella(alin[1] - alin[0], 240 / (n / 360), 0.01));
  assert.ok(p.rivit[0][1] - p.rivit[0][0] < 1);
  const e = osanRivit('C2', Z);
  assert.equal(e.py0, n / 2); assert.equal(e.py1, n);
  assert.ok(lahella(e.rivit[0][0], 0, 1e-6));
  assert.ok(lahella(e.rivit.at(-1)[1], MERC_RAJA * 240, 1e-6));
});

test('rivinPainot: pinta-alakeskiarvo tai interpolointi, painot summautuvat yhteen', () => {
  const s = (p) => p.reduce((t, [, w]) => t + w, 0);
  const a = rivinPainot(10.5, 13.1, 100);
  assert.deepEqual(a.map(([r]) => r), [10, 11, 12, 13]);
  assert.ok(lahella(s(a), 1));
  assert.ok(lahella(a[0][1], 0.5 / 2.6)); assert.ok(lahella(a[3][1], 0.1 / 2.6));
  const b = rivinPainot(10.25, 10.75, 100); // keskikohta 10,5 → rivin 10 keskellä
  assert.deepEqual(b, [[10, 1]]);
  const c = rivinPainot(10.5, 11.0, 100); // keskikohta 10,75 → 3/4 riviä 10, 1/4 riviä 11
  assert.ok(c[0][0] === 10 && lahella(c[0][1], 0.75) && c[1][0] === 11 && lahella(c[1][1], 0.25));
  const d = rivinPainot(99.2, 99.9, 100); // reunalla ei yli
  assert.ok(d.every(([r]) => r <= 99)); assert.ok(lahella(s(d), 1));
});

test('kaupungin laatikko: 60 km on 0,5396° leveyttä ja pitenee pituussuunnassa pohjoiseen', () => {
  const [x0, y0, x1, y1] = kaupunginLaatikko(2.333, 48.8451, 60);
  assert.ok(lahella(y1 - 48.8451, 0.5396, 2e-4));
  assert.ok(lahella(48.8451 - y0, 0.5396, 2e-4));
  assert.ok(lahella(x1 - 2.333, 0.5396 / Math.cos((48.8451 * Math.PI) / 180), 2e-4));
  assert.ok(lahella(2.333 - x0, x1 - 2.333, 2e-4));
  const helsinki = kaupunginLaatikko(24.94, 60.17, 60);
  assert.ok(helsinki[2] - helsinki[0] > x1 - x0);
  // Pyöristys neljään desimaaliin (natiivi lukee luvut sellaisinaan).
  for (const v of helsinki) assert.equal(v, Math.round(v * 1e4) / 1e4);
});

test('laatikonLaatat on täsmälleen leikkaa-säännön joukko (vertailu raakaan hakuun)', () => {
  const bbox = kaupunginLaatikko(12.491, 41.8869, 60);
  for (const Z of [8, 9, 10, 11]) {
    const n = 2 ** Z;
    const odotettu = [];
    const [cx, cy] = maailmanPikseli(12.491, 41.8869, Z).map((v) => Math.floor(v / LAATTA));
    for (let Y = Math.max(0, cy - 20); Y <= Math.min(n - 1, cy + 20); Y += 1) {
      for (let X = Math.max(0, cx - 20); X <= Math.min(n - 1, cx + 20); X += 1) {
        if (leikkaa(laatanReunat(Z, X, Y), bbox)) odotettu.push(`${X}/${Y}`);
      }
    }
    assert.deepEqual(laatikonLaatat(bbox, Z).map(([X, Y]) => `${X}/${Y}`).sort(), odotettu.sort(), `Z${Z}`);
  }
  // Reunan kosketus ei riitä.
  const r = laatanReunat(8, 130, 88);
  assert.equal(leikkaa(r, [r.ita, r.etela, r.ita + 1, r.pohjoinen]), false);
  assert.equal(leikkaa(r, [r.ita - 1e-6, r.etela, r.ita + 1, r.pohjoinen]), true);
});

test('kaupunkiluettelo: 72 kaupunkia (71 + Lontoo), koordinaatit ja tunnisteet kunnossa', () => {
  assert.equal(KAUPUNGIT.length, 72);
  assert.ok(KAUPUNGIT.some((k) => k.id === 'lontoo'));
  assert.equal(new Set(KAUPUNGIT.map((k) => k.id)).size, 72);
  for (const k of KAUPUNGIT) {
    assert.ok(Number.isFinite(k.lat) && Math.abs(k.lat) < 80, k.id);
    assert.ok(Number.isFinite(k.lon) && Math.abs(k.lon) <= 180, k.id);
  }
});

test('s2-kattavuus: laatat8 ja sääntö ovat yhtä; Z9–Z11:n Z8-esivanhempi on aina listassa', () => {
  const kaupungit = kaupungitLaatikoin(KAUPUNGIT, 60);
  const tasot = kaupunkienLaatat(kaupungit);
  // Kiinnitetty määrä (muuttuu vain, jos kaupunkiluettelo tai säde muuttuu).
  assert.deepEqual([...tasot].map(([Z, l]) => [Z, l.length]), [[8, 287], [9, 682], [10, 1888], [11, 6305]]);
  const z8 = new Set(tasot.get(8).map(([X, Y]) => `${X}/${Y}`));
  for (const Z of [9, 10, 11]) {
    for (const [X, Y] of tasot.get(Z)) {
      const s = 2 ** (Z - 8);
      assert.ok(z8.has(`${Math.floor(X / s)}/${Math.floor(Y / s)}`), `Z${Z} ${X}/${Y}`);
    }
  }
  // Sääntöfunktio (natiivin vertailutoteutus) vastaa listoja: listatut kyllä, naapurit ei.
  for (const [Z, l] of tasot) {
    const joukko = new Set(l.map(([X, Y]) => `${X}/${Y}`));
    for (const [X, Y] of l.filter((_, i) => i % 5 === 0)) {
      assert.ok(onS2Laatta(Z, X, Y, kaupungit));
      for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
        if (!joukko.has(`${X + dx}/${Y + dy}`)) assert.equal(onS2Laatta(Z, X + dx, Y + dy, kaupungit), false);
      }
    }
  }
  assert.equal(onS2Laatta(7, 64, 43, kaupungit), false);
  assert.equal(onS2Laatta(12, 2072, 1400, kaupungit), false);
});

test('s2-luettelo: attribuutio, lisenssi, kaupungit laatikoineen, laatat8 ja sääntö', () => {
  const kaupungit = kaupungitLaatikoin(KAUPUNGIT.filter((k) => ['pariisi', 'rooma'].includes(k.id)), 60);
  const l = s2Luettelo({ versio: '2026-09-24', kaupungit });
  assert.equal(l.attribuutio, 'Contains modified Copernicus Sentinel data 2016, EOX IT Services');
  assert.equal(l.attribuutio, EOX_ATTRIBUUTIO);
  assert.equal(l.lisenssi, 'CC BY 4.0');
  assert.equal(l.lahde.taso, 's2cloudless_3857');
  assert.equal(l.kerros, 's2'); assert.equal(l.laatta, 256); assert.equal(l.muoto, 'jpg');
  assert.deepEqual(l.tasot, { min: 8, max: 11 });
  assert.equal(l.saanto, S2_SAANTO);
  for (const k of l.kaupungit) {
    assert.deepEqual(Object.keys(k), ['id', 'nimi', 'lon', 'lat', 'sade_km', 'bbox']);
    assert.equal(k.bbox.length, 4);
  }
  assert.deepEqual(l.laatat8, [[129, 87], [129, 88], [130, 87], [130, 88], [136, 94], [136, 95], [137, 94], [137, 95]]);
  assert.deepEqual(l.lukumaarat, { 8: 8, 9: 21, 10: 55, 11: 210 });
  assert.equal(l.yhteensa, 294);
  assert.match(l.muutokset, /muuttamattomina/);
  const v = s2Luettelo({ versio: 'x', kaupungit, varit: { kanavat: [] } });
  assert.match(v.muutokset, /värisävy/);
});

test('EOX: vain CC BY 4.0 -vuodet (2016, 2017) ovat valittavissa, ei koskaan 2018+', () => {
  assert.match(EOX_OSOITE, /\/s2cloudless_3857\/default\/g\/\{z\}\/\{y\}\/\{x\}\.jpg$/);
  assert.equal(eoxTaso(2017).taso, 's2cloudless-2017_3857');
  assert.match(eoxTaso(2017).attribuutio, /data 2017, EOX IT Services$/);
  // EOX:n lisenssisivun virallinen muoto (24.9.2026): 2016-taso = data 2016 & 2017.
  assert.equal(eoxTaso(2016).attribuutioEox, 'EOxCloudless https://cloudless.eox.at by EOX IT Services GmbH (Contains modified Copernicus Sentinel data 2016 & 2017)');
  assert.match(eoxTaso(2017).attribuutioEox, /\(Contains modified Copernicus Sentinel data 2017\)$/);
  for (const v of [2018, 2020, 2024, 2025]) assert.throws(() => eoxTaso(v), /CC BY-NC-SA/);
});

test('bmng-luettelo: koko maailma Z0–Z7 = 21 845 laattaa, public domain', () => {
  assert.equal(maailmanLaatat(0, 7), 21845);
  const l = bmngLuettelo({ versio: '2026-09-24', kuukausi: '200408', muunnelma: 'topo' });
  assert.equal(l.yhteensa, 21845);
  assert.equal(l.lukumaarat[7], 16384);
  assert.equal(l.lisenssi, 'public domain (NASA)');
  assert.equal(l.attribuutio, 'NASA Earth Observatory (Blue Marble Next Generation)');
  assert.equal(l.kuukausi, 8);
  assert.equal(l.lahde.kuukausi, '2004-08');
  assert.match(l.lahde.osoite, /bmng-topography\/august\/$/);
});

test('värisovitus: identiteetti, tunnetun käyrän palautus, jyrkkyyden raja ja mediaani', () => {
  const tasainen = Uint8Array.from({ length: 256 * 40 }, (_, i) => i % 256);
  const q = kvantiilit(tasainen);
  assert.deepEqual(q.slice(0, 3), [12, 25, 51]);
  const id = sovitaKayra(q, q);
  assert.ok(lahella(id.a, 1, 1e-9) && lahella(id.g, 1, 1e-9));
  const t = kayranTaulu({ a: 0.9, g: 1.2 });
  const s = sovitaKayra(q, q.map((v) => t[v]));
  assert.ok(lahella(s.g, 1.2, 0.03) && lahella(s.a, 0.9, 0.03), JSON.stringify(s));
  const jyrkka = sovitaKayra(q, q.map((v) => Math.round(255 * (v / 255) ** 3)));
  assert.equal(jyrkka.g, GAMMA_RAJAT[1]);
  assert.equal(kayranTaulu({ a: 1, g: 1 })[200], 200);
  assert.deepEqual(yhdistaSovitukset([
    [{ a: 1, g: 1 }, { a: 2, g: 1 }, { a: 3, g: 1 }],
    [{ a: 3, g: 2 }, { a: 2, g: 1 }, { a: 1, g: 1 }],
    [{ a: 2, g: 3 }, { a: 2, g: 1 }, { a: 2, g: 1 }],
  ]), [{ a: 2, g: 2 }, { a: 2, g: 1 }, { a: 2, g: 1 }]);
  assert.equal(onVesi(24, 44, 78), true); // EOX:n umpimeri
  assert.equal(onVesi(83, 77, 41), false); // pelto
});
