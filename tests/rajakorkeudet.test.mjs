/*
 * RAJAVIIVOJEN KORKEUS NATIIVILLE (tools/maasto/vie-rajakorkeudet.mjs).
 *
 * Kolme asiaa voi mennä vikaan uskottavan näköisesti: (1) koodaus siirtää
 * koordinaatteja tai sotkee h:n deltoihin, jolloin natiivin lukija
 * (proto Vektorisolut.Pura, korkeus: true) lukee roskaa; (2) yläraja jää
 * maastoverkon alle, jolloin viiva uppoaa; (3) taso- ja saatavuussääntö
 * poikkeaa maastolaattojen omasta, jolloin korkeus luetaan eri verkosta
 * kuin se, jonka päälle viiva piirretään. Oikeaa DEM:iä CI:ssä ei ole,
 * joten yläraja testataan synteettisellä maastolla ja oikealla RTIN:llä.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { deltakoodaa, puraDelta } from '../tools/tee-pallovektorit.mjs';
import { CESIUM_TASO0_VIRHE, janteenPainuma, laatanAlue } from '../tools/maasto/tee-maasto.mjs';
import { rtinVerkko, rtinVirheet } from '../tools/maasto/rtin.mjs';
import {
  RTIN_KERROIN, RUUDUKKO, lisaaKorkeudet, maastotasoTiheydelle, naytevali, puraKorkeusdelta,
  rtinKynnys, saatavuus, solunLaatikko, vektoritasonMaasto, viivanKorkeudet, ylaraja,
} from '../tools/maasto/vie-rajakorkeudet.mjs';

const LODIT = [0.1, 0.03, 0.008, 0.004, 0];

/* Toistettava satunnaisluku (mulberry32). */
function satunnainen(siemen) {
  let a = siemen >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Vuoristo: aaltojen summa, jossa on lyhyitäkin aaltoja (harjanteita). */
function vuoristo(siemen = 1) {
  const r = satunnainen(siemen);
  const aallot = Array.from({ length: 24 }, (_, i) => ({
    a: 2500 / (1 + i * 0.6), kx: (0.5 + r() * 3) * 2 ** (i / 3), ky: (0.5 + r() * 3) * 2 ** (i / 3), f: r() * 6.28,
  }));
  return {
    onRuutu: () => true,
    korkeus(lon, lat) {
      let h = 1200;
      for (const w of aallot) h += w.a * Math.sin(w.kx * lon + w.f) * Math.cos(w.ky * lat - w.f);
      return h;
    },
  };
}

test('koodaus: koordinaatit tavulleen lähteen deltat, h absoluuttisena int16:na', () => {
  const viivat = [
    [[6.1, 45.2], [6.2, 45.25], [6.35, 45.1], [9.5, 46]], // viimeinen askel > 3,27° → katko lähteessä
    [[-1.5, 43.3], [-1.4, 43.2]],
  ];
  const lahde = deltakoodaa(viivat).puskuri;
  const hFn = (p) => Array.from({ length: p.length / 2 }, (_, i) => 1000 + i * 0.3 - (p[0] < 0 ? 2000 : 0));
  const t = lisaaKorkeudet(lahde, hFn);
  const vanhat = puraDelta(lahde);
  const uudet = puraKorkeusdelta(t.puskuri);
  assert.equal(uudet.length, vanhat.length);
  assert.equal(t.viivoja, vanhat.length);
  let tavuja = 0;
  uudet.forEach((u, k) => {
    const n = vanhat[k].length / 2;
    assert.equal(u.length, n * 3);
    tavuja += 14 + (n - 1) * 6;
    for (let i = 0; i < n; i += 1) {
      assert.equal(u[3 * i], vanhat[k][2 * i]);
      assert.equal(u[3 * i + 1], vanhat[k][2 * i + 1]);
      // Ylöspäin pyöristetty absoluuttinen korkeus, ei delta.
      assert.equal(u[3 * i + 2], Math.ceil(hFn(vanhat[k])[i]));
    }
  });
  assert.equal(t.puskuri.length, tavuja);
  assert.equal(t.hMin, -1000);
  // int16-kylläisyys.
  const yli = puraKorkeusdelta(lisaaKorkeudet(lahde, (p) => new Array(p.length / 2).fill(99999)).puskuri);
  assert.equal(yli[0][2], 32767);
});

test('Cesiumin maastotaso tiheydestä: ensimmäinen taso, jonka virhe mahtuu SSE:hen', () => {
  for (const D of [3, 5, 16.7, 30, 62.5, 125, 500, 2000]) {
    const z = maastotasoTiheydelle(D, 2, 30);
    const pikseli = 111320 / D;
    assert.ok(CESIUM_TASO0_VIRHE / 2 ** z <= 2 * pikseli + 1e-6, `D ${D}: z${z} liian karkea`);
    if (z > 0) assert.ok(CESIUM_TASO0_VIRHE / 2 ** (z - 1) > 2 * pikseli, `D ${D}: z${z} liian tarkka`);
  }
  assert.equal(maastotasoTiheydelle(Infinity), 12);
  // Vektoritasoille tarkin näkyvä maastotaso (oletukset: SSE 2, terävyys 0,5).
  assert.deepEqual(LODIT.map((_, k) => vektoritasonMaasto(LODIT, k)), [1, 3, 5, 6, 12]);
  assert.deepEqual(solunLaatikko('18_4', 10), [0, 40, 10, 50]);
});

test('saatavuus: syvä taso vain alueella ja maalla, muuten emolaatta', () => {
  // Maata vain 1°-ruudut (45, 6) ja (45, −60).
  const { tehokasTaso } = saatavuus({
    alue: [-25, 34, 45, 72], maailma: 10, vainMaaAlkaen: 7, zMax: 12,
    onRuutu: (lat, lon) => lat === 45 && (lon === 6 || lon === -60),
  });
  assert.equal(tehokasTaso(12, 6.5, 45.5), 12); // maalla Euroopassa
  assert.equal(tehokasTaso(12, 7.5, 45.5), 6); // meri: z7+ vain maalaatat → z6
  assert.equal(tehokasTaso(5, 7.5, 45.5), 5);
  assert.equal(tehokasTaso(12, -59.5, 45.5), 10); // Euroopan ulkopuolella z11–12 puuttuu
  assert.equal(tehokasTaso(9, -59.5, 45.5), 9);
});

test('RTIN-verkko pysyy ylärajan alla (synteettinen vuoristo, oikea RTIN)', () => {
  const dem = vuoristo(7);
  const { tehokasTaso } = saatavuus({ onRuutu: dem.onRuutu, alue: [-180, -90, 180, 90], maailma: 12 });
  const raja = ylaraja(dem, tehokasTaso);
  const n = RUUDUKKO;
  const r = satunnainen(3);
  let suurinSuhde = 0;
  for (const z of [4, 6, 8, 10]) {
    const koko = 180 / 2 ** z;
    const x = Math.floor((6.3 + 180) / koko); const y = Math.floor((45.4 + 90) / koko);
    const a = laatanAlue(z, x, y);
    const vali = (a.east - a.west) / (n - 1);
    assert.ok(Math.abs(vali - naytevali(z)) < 1e-12);
    const h = new Float32Array(n * n);
    for (let j = 0; j < n; j += 1) for (let i = 0; i < n; i += 1) h[j * n + i] = dem.korkeus(a.west + i * vali, a.north - j * vali, vali);
    const kynnys = rtinKynnys(z);
    const kaar = (ax, ay, bx, by) => janteenPainuma(a.west + ax * vali, a.north - ay * vali, a.west + bx * vali, a.north - by * vali);
    const { pisteet, kolmiot } = rtinVerkko(h, n, kynnys, rtinVirheet(h, n, kaar));
    // Verkon korkeus satunnaisissa pisteissä (barysentrisesti kolmiossa).
    for (let q = 0; q < 3000; q += 1) {
      const fx = r() * (n - 1); const fy = r() * (n - 1);
      for (const [p1, p2, p3] of kolmiot) {
        const [ax, ay] = pisteet[p1]; const [bx, by] = pisteet[p2]; const [cx, cy] = pisteet[p3];
        const det = (by - cy) * (ax - cx) + (cx - bx) * (ay - cy);
        const l1 = ((by - cy) * (fx - cx) + (cx - bx) * (fy - cy)) / det;
        const l2 = ((cy - ay) * (fx - cx) + (ax - cx) * (fy - cy)) / det;
        const l3 = 1 - l1 - l2;
        if (l1 < -1e-9 || l2 < -1e-9 || l3 < -1e-9) continue;
        const verkko = l1 * h[ay * n + ax] + l2 * h[by * n + bx] + l3 * h[cy * n + cx];
        const lon = a.west + fx * vali; const lat = a.north - fy * vali;
        const B = raja.piste(z, lon, lat);
        assert.ok(verkko <= B + 1e-3, `z${z} (${lon}, ${lat}): verkko ${verkko} > yläraja ${B}`);
        const kulmat = B - RTIN_KERROIN * kynnys;
        suurinSuhde = Math.max(suurinSuhde, (verkko - kulmat) / kynnys);
        break;
      }
    }
  }
  assert.ok(suurinSuhde < RTIN_KERROIN, `verkon nousu kulmien yli ${suurinSuhde.toFixed(2)} × kynnys`);
});

test('pisteen h kattaa viereisten janojen maksimin: lineaarinen h ei painu harjanteen alle', () => {
  const dem = vuoristo(11);
  const { tehokasTaso } = saatavuus({ onRuutu: dem.onRuutu, alue: [-180, -90, 180, 90], maailma: 12 });
  const raja = ylaraja(dem, tehokasTaso);
  const pisteet = new Float64Array([6.0, 45.0, 6.4, 45.3, 6.45, 45.31, 7.2, 45.0]);
  for (const z of [6, 9, 12]) {
    const h = viivanKorkeudet(pisteet, z, raja);
    for (let i = 0; i < 3; i += 1) {
      for (let q = 0; q <= 200; q += 1) {
        const t = q / 200;
        const lon = pisteet[2 * i] + (pisteet[2 * i + 2] - pisteet[2 * i]) * t;
        const lat = pisteet[2 * i + 1] + (pisteet[2 * i + 3] - pisteet[2 * i + 1]) * t;
        const viiva = h[i] + (h[i + 1] - h[i]) * t;
        assert.ok(viiva >= raja.piste(z, lon, lat) - 1e-6, `z${z} jana ${i} t ${t}`);
      }
    }
  }
});
