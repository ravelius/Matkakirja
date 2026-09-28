/*
 * ISS:N TODELLINEN RATA (js/linssit/iss-rata.js): SGP4 Vallado 2006
 * -vertailuvektoria vastaan, TLE-jäsennys Siirtosepän muodossa, radan laatu
 * iän mukaan (tuoreusraja 7 / 30 vrk) ja havainnollinen varamalli. Samat
 * väitteet kuin natiivin Linssit-testit/Testit/IssTestit.cs.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  jasennaTle, jasennaTleJson, tleTarkiste, luoRata, luoIssNyt, gmst, jdPaivasta, jdHetkesta,
  auringonAlihajapiste, nopeusKmh, RADAN_LAATU, TARKKA_VRK, ARVIO_VRK, lataaIssTle, TLE_MUISTIAVAIN,
} from '../js/linssit/iss-rata.js';

const V1 = '1 00005U 58002B   00179.78495062  .00000023  00000-0  28098-4 0  4753';
const V2 = '2 00005  34.2682 348.7242 1859667 331.7664  19.3264 10.82419157413667';
const I1 = '1 25544U 98067A   08264.51782528 -.00002182  00000-0 -11606-4 0  2927';
const I2 = '2 25544  51.6416 247.4627 0006703 130.5360 325.0288 15.72125391563537';
const AMPARI = '{"nimi": "ISS (ZARYA)", "rivi1": "1 25544U 98067A   26269.01266414  .00010261  00000+0  19655-3 0  9997", "rivi2": "2 25544  51.6303 161.0895 0007829 186.0461 174.0434 15.48628597587381", "haettu": "2026-09-26T14:57:26.605Z", "lahde": "CelesTrak GP (NORAD 25544)"}';

const lahella = (a, [x, y, z], tol, mita) => {
  const d = Math.hypot(a.x - x, a.y - y, a.z - z);
  assert.ok(d < tol, `${mita}: ero ${d}`);
};

test('TLE jäsentyy ja tarkiste täsmää', () => {
  const t = jasennaTle(V1, V2);
  assert.equal(t.numero, 5);
  assert.ok(Math.abs(t.eksentrisyys - 0.1859667) < 1e-9);
  assert.ok(Math.abs(t.bstar - 0.28098e-4) < 1e-12, String(t.bstar));
  assert.ok(Math.abs((t.keskiliike * 1440) / (2 * Math.PI) - 10.82419157) < 1e-8);
  assert.ok(tleTarkiste(V1) && tleTarkiste(V2));
  assert.ok(jasennaTle(I1, I2).bstar < 0, 'negatiivinen B*');
});

test('TLE Siirtosepän json-muodossa; rikki → null', () => {
  const J = (r1, r2) => JSON.stringify({ nimi: 'ISS (ZARYA)', rivi1: r1, rivi2: r2, haettu: '2026-09-26T15:00:00Z', lahde: 'CelesTrak' });
  const t = jasennaTleJson(J(I1, I2));
  assert.equal(t.numero, 25544);
  assert.equal(t.nimi, 'ISS (ZARYA)');
  assert.equal(t.haettu, '2026-09-26T15:00:00Z');
  assert.equal(jasennaTleJson(J(I1, `${I2.slice(0, 68)}0`)), null, 'väärä tarkiste');
  assert.equal(jasennaTleJson(J(I1, '2 25544')), null, 'lyhyt rivi');
  assert.equal(jasennaTleJson('{"nimi":"ISS"}'), null);
  assert.equal(jasennaTleJson('rikki{'), null);
  assert.equal(jasennaTleJson(null), null);
});

test('SGP4: Vallado 2006 -vektorit epookissa ja 360 min', () => {
  const r = luoRata(jasennaTle(V1, V2));
  assert.ok(r.kaytettavissa, r.syy ?? '');
  const a = r.sijainti(0);
  lahella(a.r, [7022.46529266, -1400.08296755, 0.03995155], 1e-3, 'r(0)');
  lahella(a.v, [1.893841015, 6.405893759, 4.534807250], 1e-6, 'v(0)');
  const b = r.sijainti(360);
  lahella(b.r, [-7154.03120202, -3783.17682504, -3536.19412294], 1e-3, 'r(360)');
  lahella(b.v, [4.741887409, -4.151817765, -2.093935425], 1e-6, 'v(360)');
});

test('ISS 2008: kierros 91,6 min, korkeus ja leveys radalla', () => {
  const r = luoRata(jasennaTle(I1, I2));
  assert.ok(Math.abs(r.kierrosMin - 91.6) < 1);
  for (let t = 0; t < 1440; t += 17) {
    const p = r.alapiste(r.tle.epookkiJd + t / 1440);
    assert.ok(p.korkeusKm > 300 && p.korkeusKm < 400, `korkeus ${p.korkeusKm}`);
    assert.ok(Math.abs(p.lat) <= 52);
    assert.ok(p.lon >= -180 && p.lon <= 180);
  }
});

test('ämpärin näyte: alapiste ja korkeus järkevät', () => {
  const t = jasennaTleJson(AMPARI);
  const r = luoRata(t);
  const p = r.alapiste(t.epookkiJd);
  assert.ok(Math.abs(p.lat) <= 52 && p.korkeusKm > 350 && p.korkeusKm < 450, JSON.stringify(p));
});

test('GMST J2000 ja juliaaninen päivä', () => {
  assert.ok(Math.abs((gmst(2451545.0) * 180) / Math.PI - 280.46061837) < 1e-5);
  assert.ok(Math.abs(jdPaivasta(2000, 1, 1, 12) - 2451545.0) < 1e-9);
  assert.ok(Math.abs(jdHetkesta(Date.UTC(2000, 0, 1, 12)) - 2451545.0) < 1e-9);
});

test('aurinko: seisaus ja tasaus', () => {
  assert.ok(Math.abs(auringonAlihajapiste(jdPaivasta(2024, 6, 20, 20 + 51 / 60)).lat - 23.44) < 0.02);
  assert.ok(Math.abs(auringonAlihajapiste(jdPaivasta(2024, 3, 20, 3 + 6 / 60)).lat) < 0.02);
  assert.ok(Math.abs(auringonAlihajapiste(jdPaivasta(2024, 3, 20, 12)).lon) < 4.5);
});

test('ilman TLE:tä havainnollinen 51,6° oikealla vauhdilla', () => {
  const iss = luoIssNyt();
  const t0 = Date.UTC(2026, 8, 26, 12);
  assert.equal(iss.laatu(t0), RADAN_LAATU.havainnollinen);
  const a = iss.paikka(t0);
  const b = iss.paikka(t0 + 60000);
  assert.ok(Math.abs(a.lat) <= 51.6 + 1e-9);
  assert.equal(a.korkeusKm, 420);
  const r = Math.PI / 180;
  const d = Math.acos(Math.sin(a.lat * r) * Math.sin(b.lat * r)
    + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.cos((a.lon - b.lon) * r)) / r;
  assert.ok(d > 3.5 && d < 4.3, `minuutissa ${d}°`);
});

test('TLE:n tuoreusraja: ≤ 7 vrk tarkka, ≤ 30 vrk arvio, muuten havainnollinen', () => {
  const iss = luoIssNyt();
  const tle = jasennaTle(I1, I2);
  assert.ok(iss.aseta(tle));
  assert.ok(!iss.aseta(jasennaTle(I1, I2)), 'sama epookki ei vaihda');
  const ep = Date.UTC(2008, 8, 20, 12, 25, 40);
  assert.equal(iss.laatu(ep + 3600e3), RADAN_LAATU.tarkka);
  assert.equal(iss.laatu(ep + (TARKKA_VRK - 0.1) * 86400e3), RADAN_LAATU.tarkka);
  assert.equal(iss.laatu(ep + 10 * 86400e3), RADAN_LAATU.arvio);
  assert.equal(iss.laatu(ep + (ARVIO_VRK - 0.1) * 86400e3), RADAN_LAATU.arvio);
  assert.equal(iss.laatu(ep + 40 * 86400e3), RADAN_LAATU.havainnollinen);
  // SGP4-paikka tarkalla laadulla, havainnollinen 420 km vanhalla.
  const p = iss.paikka(ep + 3600e3);
  const q = luoRata(tle).alapiste(jdHetkesta(ep + 3600e3));
  assert.ok(Math.abs(p.lat - q.lat) < 1e-9 && Math.abs(p.lon - q.lon) < 1e-9);
  assert.equal(iss.korkeusKm(ep + 40 * 86400e3), 420);
  const kaari = iss.kaari(ep + 3600e3, 240);
  assert.equal(kaari.length, 241);
  assert.ok(Math.abs(kaari[120].lat - p.lat) < 1e-6);
});

test('suuntima on radan suunta ja nopeus vis viva', () => {
  const iss = luoIssNyt();
  iss.aseta(jasennaTle(I1, I2));
  const t = Date.UTC(2008, 8, 20, 13);
  const s = iss.suuntima(t);
  assert.ok(s >= 0 && s < 360);
  // Nousevalla solmulla ISS kulkee koilliseen, laskevalla kaakkoon: aina itään päin.
  assert.ok(s > 20 && s < 160, `suuntima ${s}`);
  assert.ok(Math.abs(nopeusKmh(420) - 27600) < 100, String(nopeusKmh(420)));
});

test('lataus: muisti heti, ämpäri taustalla, uusi TLE muistiin', async () => {
  const muisti = new Map();
  const ikkuna = {
    localStorage: { getItem: (k) => muisti.get(k) ?? null, setItem: (k, v) => muisti.set(k, v) },
    fetch: async () => ({ ok: true, text: async () => AMPARI }),
  };
  const iss = luoIssNyt();
  assert.equal(await lataaIssTle(iss, { ikkuna, pakota: true }), true);
  assert.equal(iss.tle.numero, 25544);
  assert.equal(muisti.get(TLE_MUISTIAVAIN), AMPARI);
  const toinen = luoIssNyt();
  ikkuna.fetch = async () => { throw new Error('ei verkkoa'); };
  assert.equal(await lataaIssTle(toinen, { ikkuna, pakota: true }), false);
  assert.equal(toinen.tle?.numero, 25544, 'muistista ilman verkkoa');
});
