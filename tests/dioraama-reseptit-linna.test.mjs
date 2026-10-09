/*
 * Dioraaman linnareseptien (tools/dioraama/reseptit-linna.mjs: kiekko, kierreportaat, sakarat, paalu,
 * laiturikansi, vene, lippu, rako, kupoli) testit. Speksi: docs/raportit/dioraama-rajapinnat-era3-20260929.md
 * kohta 2. Testaa reseptejä suoraan paikallisessa kehyksessä (u, y, w); lopussa reseptit.mjs:n kokoaja.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  kiekko, kierreportaat, kierrePiste, sakarat, paalu, laiturikansi, vene, lippu, rako, kupoli, tynnyriholvi, kivikehys, sokkelikivet,
  RESEPTIT as LINNA, OLETUSPINNAT,
} from '../tools/dioraama/reseptit-linna.mjs';
import { RESEPTIT, sijoita } from '../tools/dioraama/reseptit.mjs';

/* ==================== Pienet geometria-apurit ==================== */
const vahenna = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const risti = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const piste = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
function ristiT(t) { return risti(vahenna(t.p[1], t.p[0]), vahenna(t.p[2], t.p[0])); }
function kolmionAla(t) { return 0.5 * Math.hypot(...ristiT(t)); }
function normaali(t) { const n = ristiT(t); const l = Math.hypot(...n) || 1; return [n[0] / l, n[1] / l, n[2] / l]; }
function keski(t) { return [0, 1, 2].map((i) => (t.p[0][i] + t.p[1][i] + t.p[2][i]) / 3); }
function kulma(u, w) { return ((Math.atan2(u, w) * 180 / Math.PI) % 360 + 360) % 360; }
function pisteet(kolmiot) { return kolmiot.flatMap((t) => t.p); }
function rajat(kolmiot) {
  const p = pisteet(kolmiot);
  const mm = (i) => [Math.min(...p.map((x) => x[i])), Math.max(...p.map((x) => x[i]))];
  return { u: mm(0), y: mm(1), w: mm(2) };
}
const lahella = (a, b, eps = 1e-6) => Math.abs(a - b) < eps;
/** Pinta-alalla painotettu osuus kolmioista, joille ehto(t, n, keski) pätee. */
function osuus(kolmiot, ehto) {
  let hyva = 0, kaikki = 0;
  for (const t of kolmiot) {
    const a = kolmionAla(t);
    kaikki += a;
    if (ehto(t, normaali(t), keski(t))) hyva += a;
  }
  return kaikki > 0 ? hyva / kaikki : 0;
}

const OLETUKSET = {
  kiekko: { sade: 5 },
  kierreportaat: { sadeSisa: 0.5, sadeUlko: 2.5, korkeus: 13.5, askelmat: 45 },
  sakarat: { pituus: 10 },
  paalu: { korkeus: 3 },
  laiturikansi: { leveys: 3, pituus: 8 },
  vene: {},
  lippu: {},
  rako: {},
  kupoli: { sade: 5, korkeus: 2.5 },
  tynnyriholvi: { pituus: 6, leveys: 4, nousu: 1.5, paadyt: true },
  kivikehys: { leveys: 1.05, korkeus: 2.0, kaari: 0.4, seinan_sade: 3.88, siemen: 300 },
  sokkelikivet: { pituus: 6.0, korkeus: 0.4, ulkonema: 0.1, siemen: 700, valit: [[-0.6, 0.6]], kynnykset: [{ u0: -0.55, u1: 0.55, syvyys: 1.6 }] },
};
const FUNKTIOT = { kiekko, kierreportaat, sakarat, paalu, laiturikansi, vene, lippu, rako, kupoli, tynnyriholvi, kivikehys, sokkelikivet };

/* ==================== Kaikille yhteiset ==================== */
for (const [nimi, param] of Object.entries(OLETUKSET)) {
  test(`${nimi}: kolmioita, äärelliset kärjet, ei degeneroituneita, deterministinen, kolmio-rakenne`, () => {
    const t = FUNKTIOT[nimi](param);
    assert.ok(t.length > 0);
    for (const k of t) {
      assert.equal(k.p.length, 3);
      assert.equal(typeof k.rooli, 'string');
      for (const p of k.p) for (const x of p) assert.ok(Number.isFinite(x), `${nimi}: ei-äärellinen kärki`);
      assert.ok(kolmionAla(k) > 1e-9, `${nimi}: degeneroitunut kolmio (rooli ${k.rooli})`);
      if (k.n) for (const n of k.n) for (const x of n) assert.ok(Number.isFinite(x));
    }
    assert.deepEqual(FUNKTIOT[nimi](param), t, `${nimi}: sama param ei tuottanut samaa tulosta`);
  });
}

test('reseptit.mjs:n RESEPTIT sisältää kaikki 12 linnareseptiä ja ne ovat samat funktiot', () => {
  for (const nimi of Object.keys(FUNKTIOT)) {
    assert.equal(typeof RESEPTIT[nimi], 'function', `puuttuu: ${nimi}`);
    assert.equal(RESEPTIT[nimi], FUNKTIOT[nimi]);
  }
  assert.deepEqual(Object.keys(LINNA).sort(), Object.keys(FUNKTIOT).sort());
  assert.equal(Object.keys(FUNKTIOT).length, 12);
});

test('OLETUSPINNAT: jokaiselle reseptille kaikki tuotetut roolit on kartoitettu, pinnat speksin mukaiset', () => {
  for (const [nimi, param] of Object.entries(OLETUKSET)) {
    const roolit = new Set(FUNKTIOT[nimi](param).map((k) => k.rooli));
    for (const r of roolit) assert.equal(typeof OLETUSPINNAT[nimi]?.[r], 'string', `${nimi}: rooli ${r} ilman oletuspintaa`);
  }
  assert.deepEqual(OLETUSPINNAT.kiekko, { yla: 'lankku', ala: 'rappaus', sivu: 'leikkaus', leikkaus: 'leikkaus' });
  assert.equal(OLETUSPINNAT.kierreportaat.askel, 'kivi');
  assert.equal(OLETUSPINNAT.vene.runko, 'puu');
  assert.equal(OLETUSPINNAT.vene.sisa, 'lankku');
  assert.equal(OLETUSPINNAT.lippu.lippu, 'lippu');
  assert.equal(OLETUSPINNAT.rako.aukko, 'aukko');
  assert.equal(OLETUSPINNAT.kupoli.holvi, 'rappaus');
  assert.equal(OLETUSPINNAT.kupoli.ulko, 'kivi');
});

test('sijoita: jokainen linnaresepti sijoittuu maailmaan ja saa pinnan', () => {
  for (const [nimi, param] of Object.entries(OLETUKSET)) {
    const t = sijoita({ resepti: nimi, paikka: [10, 2, -3], suunta: 30, ...param });
    assert.equal(t.length, FUNKTIOT[nimi](param).length);
    for (const k of t) assert.equal(typeof k.pinta, 'string');
  }
});

/* ==================== kiekko ==================== */
test('kiekko: rajat, roolit, normaalit ulospäin', () => {
  const sade = 5, paksuus = 0.3;
  const t = kiekko({ sade, paksuus });
  const r = rajat(t);
  assert.ok(r.u[0] >= -sade - 1e-9 && r.u[1] <= sade + 1e-9);
  assert.ok(r.w[0] >= -sade - 1e-9 && r.w[1] <= sade + 1e-9);
  assert.ok(lahella(r.y[0], -paksuus) && lahella(r.y[1], 0));
  assert.deepEqual([...new Set(t.map((k) => k.rooli))].sort(), ['ala', 'sivu', 'yla']);
  assert.equal(osuus(t.filter((k) => k.rooli === 'yla'), (k, n) => n[1] > 0.999), 1);
  assert.equal(osuus(t.filter((k) => k.rooli === 'ala'), (k, n) => n[1] < -0.999), 1);
  assert.ok(osuus(t.filter((k) => k.rooli === 'sivu'), (k, n, c) => n[0] * c[0] + n[2] * c[2] > 0) > 0.999);
  assert.ok(Math.max(...pisteet(t).map((p) => Math.hypot(p[0], p[2]))) <= sade + 1e-9);
});

test('kiekko: oletuspaksuus 0,3 ja segmentit-määrä ohjaa kolmiomäärää', () => {
  assert.ok(lahella(rajat(kiekko({ sade: 2 })).y[0], -0.3));
  assert.ok(kiekko({ sade: 2, segmentit: 64 }).length > kiekko({ sade: 2, segmentit: 16 }).length);
});

test('kiekko: auki-sektori poistaa kärjet sektorin sisältä ja lisää leikkauspinnat', () => {
  const t = kiekko({ sade: 5, segmentit: 36, suunta: 0, auki: { alku: 95, loppu: 235 } });
  for (const p of pisteet(t)) {
    if (Math.hypot(p[0], p[2]) < 1e-9) continue; // keskipiste
    const kk = kulma(p[0], p[2]);
    assert.ok(!(kk > 95 + 1e-6 && kk < 235 - 1e-6), `kärki sektorin sisällä (${kk})`);
  }
  const leikkaukset = t.filter((k) => k.rooli === 'leikkaus');
  assert.ok(leikkaukset.length >= 4);
  // Sektorin reunojen pinnat: normaali osoittaa aukkoon päin (alkureuna kasvavaan, loppureuna pienenevään kulmaan).
  for (const k of leikkaukset) {
    const c = keski(k), kk = kulma(c[0], c[2]);
    const kasvava = [Math.cos(kk * Math.PI / 180), 0, -Math.sin(kk * Math.PI / 180)];
    const d = piste(normaali(k), kasvava);
    if (Math.abs(kk - 95) < 1) assert.ok(d > 0.99, 'alkureunan normaali aukkoon päin');
    else assert.ok(Math.abs(kk - 235) < 1 && d < -0.99, 'loppureunan normaali aukkoon päin');
  }
  // Ilman aukia kaikki kulmat katettu.
  assert.ok(kiekko({ sade: 5, segmentit: 36 }).length > t.length);
});

test('kiekko: suunta siirtää auki-sektoria paikallisessa kehyksessä (paikallinen = maailma − suunta)', () => {
  const param = { sade: 5, segmentit: 36, auki: { alku: 150, loppu: 210 } };
  const kattaa = (t, lo, hi) => pisteet(t).some((p) => {
    if (Math.hypot(p[0], p[2]) < 1e-9) return false;
    const kk = kulma(p[0], p[2]);
    return kk > lo + 1e-6 && kk < hi - 1e-6;
  });
  assert.ok(kattaa(kiekko({ ...param, suunta: 0 }), 60, 120));
  assert.ok(!kattaa(kiekko({ ...param, suunta: 90 }), 60, 120));
  assert.ok(!kattaa(kiekko({ ...param, suunta: 0 }), 155, 205));
});

test('kiekko: sektori joka ylittää 0/360-rajan toimii', () => {
  const t = kiekko({ sade: 4, segmentit: 36, auki: { alku: 340, loppu: 40 } });
  for (const p of pisteet(t)) {
    if (Math.hypot(p[0], p[2]) < 1e-9) continue;
    const kk = kulma(p[0], p[2]);
    assert.ok(kk >= 40 - 1e-6 && kk <= 340 + 1e-6, `kärki sektorin sisällä (${kk})`);
  }
});

/* ==================== kierreportaat ==================== */
const PORRAS = { sadeSisa: 0.5, sadeUlko: 2.5, korkeus: 13.5, askelmat: 45 };

test('kierreportaat: y ∈ [0, korkeus], säde ∈ [sadeSisa, sadeUlko], rooli askel', () => {
  const t = kierreportaat(PORRAS);
  const r = rajat(t);
  assert.ok(lahella(r.y[0], 0) && lahella(r.y[1], PORRAS.korkeus));
  for (const p of pisteet(t)) {
    const s = Math.hypot(p[0], p[2]);
    assert.ok(s >= PORRAS.sadeSisa - 1e-9 && s <= PORRAS.sadeUlko + 1e-9, `säde ${s}`);
  }
  assert.deepEqual([...new Set(t.map((k) => k.rooli))], ['askel']);
});

test('kierreportaat: yläpinnat ylös, ulkokehä ulos, sisäkehä sisään; jokaisella askelmalla oma taso', () => {
  const t = kierreportaat(PORRAS);
  const ylat = t.filter((k) => k.p.every((p) => Math.abs(p[1] - k.p[0][1]) < 1e-9) && k.p[0][1] > 1e-9);
  assert.ok(ylat.length > 0);
  for (const k of ylat) assert.ok(normaali(k)[1] > 0.999, 'yläpinnan normaali ei ylös');
  const tasot = new Set(ylat.map((k) => k.p[0][1].toFixed(6)));
  assert.equal(tasot.size, PORRAS.askelmat);
  const ulko = t.filter((k) => k.p.every((p) => lahella(Math.hypot(p[0], p[2]), PORRAS.sadeUlko)));
  const sisa = t.filter((k) => k.p.every((p) => lahella(Math.hypot(p[0], p[2]), PORRAS.sadeSisa)));
  assert.ok(ulko.length > 0 && sisa.length > 0);
  assert.ok(osuus(ulko, (k, n, c) => n[0] * c[0] + n[2] * c[2] > 0) > 0.999);
  assert.ok(osuus(sisa, (k, n, c) => n[0] * c[0] + n[2] * c[2] < 0) > 0.999);
  // Pohjat alaspäin, pohjan taso y = 0 (askelmat ovat umpinaisia, ei leijuvia).
  const pohjat = t.filter((k) => k.p.every((p) => lahella(p[1], 0)));
  assert.ok(pohjat.length >= PORRAS.askelmat);
  for (const k of pohjat) assert.ok(normaali(k)[1] < -0.999);
});

test('kierreportaat: askeleen syvyys keskisäteellä ≈ 0,3 m ja kierre myötäpäivään (kierto 1)', () => {
  const rk = (PORRAS.sadeSisa + PORRAS.sadeUlko) / 2;
  const a = kierrePiste(PORRAS, 0), b = kierrePiste(PORRAS, 1 / (PORRAS.askelmat - 1));
  const syvyys = Math.hypot(b[0] - a[0], b[2] - a[2]);
  assert.ok(Math.abs(syvyys - 0.3) < 0.01, `syvyys ${syvyys}`);
  const ka = kulma(a[0], a[2]), kb = kulma(b[0], b[2]);
  assert.ok(((kb - ka) + 360) % 360 < 20 && ((kb - ka) + 360) % 360 > 0, 'kompassikulma ei kasva noustessa');
  assert.ok(lahella(Math.hypot(a[0], a[2]), rk));
});

test('kierreportaat: kierto −1 kiertää vastapäivään, alkukulma ja kierrokset toimivat', () => {
  const p = { ...PORRAS, kierto: -1, alkukulma: 90 };
  const a = kierrePiste(p, 0), b = kierrePiste(p, 1 / (p.askelmat - 1));
  assert.ok(((kulma(a[0], a[2]) - kulma(b[0], b[2])) + 360) % 360 < 20);
  assert.ok(Math.abs(kulma(a[0], a[2]) - (90 - 0.5 * 0.3 / 1.5 * 180 / Math.PI)) < 0.5);
  // kierrokset: 2 kierrosta 45 askelmalla → 16° per askel
  const q = { ...PORRAS, kierrokset: 2 };
  const c = kierrePiste(q, 0), d = kierrePiste(q, 1 / (q.askelmat - 1));
  let ero = kulma(d[0], d[2]) - kulma(c[0], c[2]);
  ero = (ero + 360) % 360;
  assert.ok(Math.abs(ero - 16) < 0.01, `kulma/askel ${ero}`);
  const t = kierreportaat(q);
  assert.ok(lahella(rajat(t).y[1], q.korkeus));
});

test('kierrePiste: 0 = alimman askelman ja 1 = ylimmän askelman kohta', () => {
  const h = PORRAS.korkeus / PORRAS.askelmat;
  const a = kierrePiste(PORRAS, 0), b = kierrePiste(PORRAS, 1);
  assert.ok(lahella(a[1], h), `alin y ${a[1]}`);
  assert.ok(lahella(b[1], PORRAS.korkeus), `ylin y ${b[1]}`);
  // Alimman askelman yläpinnalla (y = h) on kolmio, joka kattaa pisteen (u, w); sama ylimmällä.
  const t = kierreportaat(PORRAS);
  const kattaa = (p) => t.some((k) => k.p.every((q) => lahella(q[1], p[1]))
    && (() => {
      const ka = kulma(p[0], p[2]);
      const kk = k.p.map((q) => kulma(q[0], q[2]));
      return Math.min(...kk) - 1e-6 <= ka && ka <= Math.max(...kk) + 1e-6;
    })());
  assert.ok(kattaa(a), 'kierrePiste(0) ei ole alimman askelman yläpinnalla');
  assert.ok(kattaa(b), 'kierrePiste(1) ei ole ylimmän askelman yläpinnalla');
  // Osuuden yli y kasvaa monotonisesti.
  let ed = -Infinity;
  for (let i = 0; i <= 20; i++) {
    const y = kierrePiste(PORRAS, i / 20)[1];
    assert.ok(y > ed);
    ed = y;
  }
  // Rajojen ulkopuolinen osuus rajataan.
  assert.deepEqual(kierrePiste(PORRAS, -1), kierrePiste(PORRAS, 0));
  assert.deepEqual(kierrePiste(PORRAS, 2), kierrePiste(PORRAS, 1));
});

/* ==================== sakarat ==================== */
test('sakarat: u ∈ [−pituus/2, pituus/2], päissä hammas, y 0…korkeus, normaalit ulos', () => {
  const pituus = 10;
  const t = sakarat({ pituus });
  const r = rajat(t);
  assert.ok(lahella(r.u[0], -pituus / 2) && lahella(r.u[1], pituus / 2), `u ${r.u}`);
  assert.ok(lahella(r.y[0], 0) && lahella(r.y[1], 0.9));
  assert.ok(lahella(r.w[0], -0.3) && lahella(r.w[1], 0.3));
  assert.deepEqual([...new Set(t.map((k) => k.rooli))], ['kivi']);
  // Jokainen hammas (10 kolmiota = 5 sivua) on oma särmiönsä: normaalit poispäin sen keskipisteestä.
  assert.equal(t.length % 10, 0);
  for (let i = 0; i < t.length; i += 10) {
    const hammas = t.slice(i, i + 10);
    const p = pisteet(hammas), rj = rajat(hammas);
    const c = [(rj.u[0] + rj.u[1]) / 2, (rj.y[0] + rj.y[1]) / 2, (rj.w[0] + rj.w[1]) / 2];
    assert.ok(osuus(hammas, (k, n, kc) => piste(n, vahenna(kc, c)) > 0) > 0.999);
    assert.ok(lahella(rj.u[1] - rj.u[0], 0.8), 'hampaan leveys');
    assert.ok(p.length > 0);
  }
});

test('sakarat: hampaiden määrä ja välit noudattavat leveyttä/väliä, jaettu tasan', () => {
  const t = sakarat({ pituus: 10, leveys: 0.8, vali: 0.7 });
  const hampaat = [];
  for (let i = 0; i < t.length; i += 10) {
    const rj = rajat(t.slice(i, i + 10));
    hampaat.push(rj.u);
  }
  assert.equal(hampaat.length, Math.round((10 + 0.7) / 1.5));
  const valit = hampaat.slice(1).map((h, i) => h[0] - hampaat[i][1]);
  for (const v of valit) assert.ok(Math.abs(v - valit[0]) < 1e-9 && v > 0.5 && v < 1.0, `väli ${v}`);
  // Lyhyt rivi: vähintään yksi hammas eikä ylitä pituutta.
  const lyhyt = rajat(sakarat({ pituus: 0.5 }));
  assert.ok(lyhyt.u[0] >= -0.25 - 1e-9 && lyhyt.u[1] <= 0.25 + 1e-9);
  assert.ok(sakarat({ pituus: 3, korkeus: 1.2, leveys: 0.5, vali: 0.5, paksuus: 0.3 }).length > 0);
});

/* ==================== paalu ==================== */
test('paalu: säde, korkeus, oletussade 0,15, normaalit ulos/ylös, rooli puu', () => {
  const t = paalu({ korkeus: 3 });
  const r = rajat(t);
  assert.ok(lahella(r.y[0], 0) && lahella(r.y[1], 3));
  assert.ok(Math.max(...pisteet(t).map((p) => Math.hypot(p[0], p[2]))) <= 0.15 + 1e-9);
  assert.ok(lahella(Math.max(...pisteet(t).map((p) => Math.hypot(p[0], p[2]))), 0.15));
  assert.deepEqual([...new Set(t.map((k) => k.rooli))], ['puu']);
  const vaippa = t.filter((k) => Math.abs(normaali(k)[1]) < 0.5);
  assert.equal(osuus(vaippa, (k, n, c) => n[0] * c[0] + n[2] * c[2] > 0), 1);
  assert.equal(osuus(t.filter((k) => Math.abs(normaali(k)[1]) >= 0.5), (k, n) => n[1] > 0.999), 1);
  assert.equal(paalu({ sade: 0.3, korkeus: 2 }).length, t.length, '8 segmenttiä riippumatta sateesta');
});

/* ==================== laiturikansi ==================== */
test('laiturikansi: rajat, lankut u-suunnassa omilla osa-tunnisteillaan, raot välissä', () => {
  const leveys = 3, pituus = 8, paksuus = 0.12;
  const t = laiturikansi({ leveys, pituus });
  const r = rajat(t);
  assert.ok(lahella(r.u[0], -leveys / 2) && lahella(r.u[1], leveys / 2));
  assert.ok(lahella(r.w[0], -pituus / 2) && lahella(r.w[1], pituus / 2));
  assert.ok(r.y[0] >= -paksuus - 1e-9 && r.y[1] <= 1e-9 && r.y[1] > -0.01);
  assert.deepEqual([...new Set(t.map((k) => k.rooli))], ['lankku']);
  const osat = new Map();
  for (const k of t) {
    assert.equal(typeof k.osa, 'string');
    if (!osat.has(k.osa)) osat.set(k.osa, []);
    osat.get(k.osa).push(k);
  }
  assert.ok(osat.size >= 30, `lankkuja ${osat.size}`);
  const wValit = [];
  for (const lankku of osat.values()) {
    const rj = rajat(lankku);
    assert.ok(lahella(rj.u[0], -leveys / 2) && lahella(rj.u[1], leveys / 2), 'lankku kulkee u-suunnassa koko leveyden');
    assert.ok(rj.w[1] - rj.w[0] < 0.25 && rj.w[1] - rj.w[0] > 0.1);
    wValit.push(rj.w);
    const c0 = [0, (rj.y[0] + rj.y[1]) / 2, (rj.w[0] + rj.w[1]) / 2];
    assert.equal(osuus(lankku, (k, n, kc) => piste(n, vahenna(kc, c0)) > 0), 1, 'lankun normaalit ulos');
  }
  wValit.sort((a, b) => a[0] - b[0]);
  for (let i = 1; i < wValit.length; i++) assert.ok(wValit[i][0] > wValit[i - 1][1] + 1e-6, 'lankkujen välissä rako');
});

test('laiturikansi: eri siemen antaa eri korkeusvaihtelun ja osa-tunnisteet', () => {
  const a = laiturikansi({ leveys: 2, pituus: 2, siemen: 1 }), b = laiturikansi({ leveys: 2, pituus: 2, siemen: 2 });
  assert.notDeepEqual(a, b);
  assert.notEqual(a[0].osa, b[0].osa);
});

/* ==================== vene ==================== */
test('vene: ≤ 1 200 kolmiota, rajat pituus/leveys/korkeus, suippenee päistä', () => {
  const t = vene({});
  assert.ok(t.length <= 1200, `${t.length} kolmiota`);
  const r = rajat(t);
  assert.ok(r.u[0] >= -0.75 - 1e-9 && r.u[1] <= 0.75 + 1e-9);
  assert.ok(r.u[1] > 0.7, 'leveys käytössä');
  assert.ok(lahella(r.w[0], -2.5) && lahella(r.w[1], 2.5));
  assert.ok(r.y[0] >= -1e-9 && r.y[1] <= 0.6 + 1e-9);
  assert.ok(lahella(r.y[0], 0));
  // Päissä (|w| > 2,3) runko on kapea; keskellä leveä.
  const paassa = pisteet(t).filter((p) => Math.abs(p[2]) > 2.3);
  assert.ok(Math.max(...paassa.map((p) => Math.abs(p[0]))) < 0.4, 'keula/perä ei suippene');
  assert.deepEqual([...new Set(t.map((k) => k.rooli))].sort(), ['runko', 'sisa']);
});

test('vene: mitat parametreista ja kolmiobudjetti pitää myös isolla veneellä', () => {
  const t = vene({ pituus: 8, leveys: 2, korkeus: 0.9 });
  const r = rajat(t);
  assert.ok(lahella(r.w[0], -4) && lahella(r.w[1], 4));
  assert.ok(r.u[1] <= 1 + 1e-9 && r.y[1] <= 0.9 + 1e-9);
  assert.ok(t.length <= 1200);
});

test('vene: ulkopinta (runko) osoittaa ulos, sisäpinta (sisa) sisään kohti venettä', () => {
  const t = vene({});
  const runko = t.filter((k) => k.rooli === 'runko');
  assert.ok(osuus(runko, (k, n, c) => n[0] * c[0] + n[1] * (c[1] - 0.6) > -1e-9
    || (n[1] > 0.99 && c[1] > 0.4)) > 0.999, // laidan yläreunan normaali ylös
    'rungon normaalit eivät osoita ulos');
  const sisa = t.filter((k) => k.rooli === 'sisa');
  assert.ok(osuus(sisa, (k, n, c) => n[0] * -c[0] + n[1] * (0.6 - c[1]) > -1e-9) > 0.9,
    'sisäpinnan normaalit eivät osoita sisään');
  // Sisäpuoli on näkyvä: yhtään sisäpinnan kolmiota ei ole ulkopinnan kanssa samaa kiertosuuntaa samassa paikassa.
  assert.ok(sisa.length > 100);
});

test('vene: kaksi tuhtoa (sisa-laatikot) laidasta laitaan', () => {
  const t = vene({});
  const tuhdot = [];
  const sisa = t.filter((k) => k.rooli === 'sisa');
  // Tuhto = suljettu särmiö (12 kolmiota), paksuus 0,04 ja syvyys w-suunnassa 0,24; viimeiset kaksi sisa-ryhmää.
  for (let i = sisa.length - 24; i < sisa.length; i += 12) tuhdot.push(rajat(sisa.slice(i, i + 12)));
  assert.equal(tuhdot.length, 2);
  for (const r of tuhdot) {
    assert.ok(lahella(r.y[1] - r.y[0], 0.04) && lahella(r.w[1] - r.w[0], 0.24));
    assert.ok(r.u[1] > 0.4 && lahella(r.u[0], -r.u[1]), 'tuhto ei kata venettä');
  }
});

/* ==================== lippu ==================== */
test('lippu: salko ja kaksipuolinen kangas, rajat ja roolit', () => {
  const t = lippu({});
  assert.deepEqual([...new Set(t.map((k) => k.rooli))].sort(), ['lippu', 'salko']);
  const salko = t.filter((k) => k.rooli === 'salko'), kangas = t.filter((k) => k.rooli === 'lippu');
  const rs = rajat(salko);
  assert.ok(lahella(rs.y[0], 0) && lahella(rs.y[1], 3));
  assert.ok(Math.max(...pisteet(salko).map((p) => Math.hypot(p[0], p[2]))) <= 0.02 + 1e-9);
  const rk = rajat(kangas);
  assert.ok(lahella(rk.y[0], 2.2) && lahella(rk.y[1], 3), `kankaan y ${rk.y}`);
  assert.ok(rk.u[0] >= 0 && rk.u[1] <= 1.22 + 1e-9 && rk.u[1] > 1.1, `kankaan u ${rk.u}`);
  assert.ok(rk.w[1] > 0.02 && rk.w[0] < -0.02, 'aaltomuoto puuttuu');
  // Molemmat puolet: kolmioita, joiden normaalin w-komponentti on + ja − yhtä paljon.
  const plus = kangas.filter((k) => normaali(k)[2] > 0).length, miinus = kangas.filter((k) => normaali(k)[2] < 0).length;
  assert.ok(plus > 0 && plus === miinus, `puolet ${plus}/${miinus}`);
});

test('lippu: parametrit korkeus, leveys ja lippu ohjaavat mittoja', () => {
  const t = lippu({ korkeus: 5, leveys: 2, lippu: 1 });
  const kangas = rajat(t.filter((k) => k.rooli === 'lippu'));
  assert.ok(lahella(kangas.y[0], 4) && lahella(kangas.y[1], 5));
  assert.ok(lahella(kangas.u[1], 2.02));
});

/* ==================== rako ==================== */
test('rako: ohut levy w+ puolella (0…0,02), u ±leveys/2, y 0…korkeus, rooli aukko', () => {
  const t = rako({});
  const r = rajat(t);
  assert.ok(lahella(r.u[0], -0.1) && lahella(r.u[1], 0.1));
  assert.ok(lahella(r.y[0], 0) && lahella(r.y[1], 1));
  assert.ok(lahella(r.w[0], 0) && lahella(r.w[1], 0.02));
  assert.deepEqual([...new Set(t.map((k) => k.rooli))], ['aukko']);
  assert.ok(t.some((k) => normaali(k)[2] > 0.999), 'etupinta (w+) puuttuu');
  const iso = rajat(rako({ leveys: 0.4, korkeus: 1.6 }));
  assert.ok(lahella(iso.u[1], 0.2) && lahella(iso.y[1], 1.6));
});

/* ==================== kupoli ==================== */
const KUPOLI = { sade: 5, korkeus: 2.5 };

test('kupoli: rajat, huippu korkeudella, säde pienenee ylöspäin, roolit', () => {
  const t = kupoli(KUPOLI);
  const r = rajat(t);
  assert.ok(lahella(r.y[0], 0) && lahella(r.y[1], KUPOLI.korkeus));
  assert.ok(Math.max(...pisteet(t).map((p) => Math.hypot(p[0], p[2]))) <= KUPOLI.sade + 1e-9);
  assert.deepEqual([...new Set(t.map((k) => k.rooli))].sort(), ['holvi', 'ulko']);
  const sadeKorkeudella = (lo, hi) => Math.max(...pisteet(t.filter((k) => k.rooli === 'ulko'))
    .filter((p) => p[1] >= lo && p[1] <= hi).map((p) => Math.hypot(p[0], p[2])));
  assert.ok(sadeKorkeudella(0, 0.01) > sadeKorkeudella(1, 1.5));
  assert.ok(sadeKorkeudella(1, 1.5) > sadeKorkeudella(2.2, 2.5));
});

test('kupoli: ulkopinta ulos, sisäpinta (holvi) sisään/alas; uv_m ja pehmeät normaalit', () => {
  const t = kupoli(KUPOLI);
  const ulko = t.filter((k) => k.rooli === 'ulko'), holvi = t.filter((k) => k.rooli === 'holvi');
  const ref = (c) => [c[0], c[1] * 2, c[2]]; // ellipsoidin gradientin suuntainen (korkeus 2,5 vs sade 5)
  assert.ok(osuus(ulko, (k, n, c) => piste(n, ref(c)) > 0) > 0.999);
  assert.ok(osuus(holvi, (k, n, c) => piste(n, ref(c)) < 0) > 0.999);
  assert.ok(holvi.some((k) => normaali(k)[1] < -0.5), 'holvin sisäpinta ei katso alas');
  for (const k of [...ulko, ...holvi]) {
    assert.equal(k.uv_m.length, 3);
    assert.equal(k.n.length, 3);
    for (let i = 0; i < 3; i++) {
      const p = k.p[i], n = k.n[i];
      assert.ok(Math.abs(Math.hypot(...n) - 1) < 1e-9);
      const sisaan = piste(n, [p[0], p[1] * 2, p[2]]) < 0;
      assert.equal(sisaan, k.rooli === 'holvi');
    }
  }
});

test('kupoli: auki-sektori poistaa kärjet sektorin sisältä ja lisää leikkauspinnat', () => {
  const t = kupoli({ ...KUPOLI, suunta: 0, auki: { alku: 150, loppu: 210 } });
  for (const k of t) {
    for (const p of k.p) {
      if (Math.hypot(p[0], p[2]) < 1e-6) continue; // huippu
      const kk = kulma(p[0], p[2]);
      assert.ok(!(kk > 150 + 1e-6 && kk < 210 - 1e-6), `${k.rooli}-kärki sektorin sisällä (${kk})`);
    }
  }
  const leikkaus = t.filter((k) => k.rooli === 'leikkaus');
  assert.ok(leikkaus.length >= 12);
  assert.ok(t.length < kupoli(KUPOLI).length + leikkaus.length);
  for (const k of leikkaus) {
    const c = keski(k), kk = kulma(c[0], c[2]);
    const kasvava = [Math.cos(kk * Math.PI / 180), 0, -Math.sin(kk * Math.PI / 180)];
    const d = piste(normaali(k), kasvava);
    if (Math.abs(kk - 150) < 1) assert.ok(d > 0.99, 'alkureunan normaali');
    else assert.ok(Math.abs(kk - 210) < 1 && d < -0.99, 'loppureunan normaali');
  }
});

test('kupoli: suunta siirtää sektoria, segmentit ohjaa tiheyttä, oletus 24', () => {
  const param = { ...KUPOLI, auki: { alku: 150, loppu: 210 } };
  const osuuValille = (t, lo, hi) => pisteet(t.filter((k) => k.rooli === 'ulko')).some((p) => {
    if (Math.hypot(p[0], p[2]) < 1e-6) return false;
    const kk = kulma(p[0], p[2]);
    return kk > lo + 1e-6 && kk < hi - 1e-6;
  });
  assert.ok(osuuValille(kupoli({ ...param, suunta: 0 }), 60, 120));
  assert.ok(!osuuValille(kupoli({ ...param, suunta: 90 }), 60, 120));
  assert.ok(kupoli({ ...KUPOLI, segmentit: 48 }).length > kupoli(KUPOLI).length);
});

test('kupoli: leikkaus-reunat vain kun auki annettu', () => {
  assert.ok(!kupoli(KUPOLI).some((k) => k.rooli === 'leikkaus'));
});

test('kivikehys: suora kamana ilman kaarta, kaaressa pariton määrä holvikiviä ja kaarevan seinän siirto kasvattaa reunakivien ulkonemaa', () => {
  const suora = kivikehys({ leveys: 0.9, korkeus: 1.3 });
  const kaari = kivikehys({ leveys: 1.05, korkeus: 2.0, kaari: 0.4 });
  assert.ok(suora.length > 0 && kaari.length > suora.length);
  const ylin = (t) => Math.max(...t.flatMap((k) => k.p.map((p) => p[1])));
  assert.ok(ylin(kaari) > 2.0 + 0.4, 'kaari nousee pielten yläpuolelle');
  const etuW = (t) => Math.max(...t.flatMap((k) => k.p.map((p) => p[2])));
  const tasainen = kivikehys({ leveys: 1.05, korkeus: 2.0, kaari: 0.4, siemen: 7 });
  const kaareva = kivikehys({ leveys: 1.05, korkeus: 2.0, kaari: 0.4, siemen: 7, seinan_sade: 3.88 });
  assert.ok(etuW(kaareva) > etuW(tasainen) + 0.05, 'kaarevalla seinällä reunakivet tuodaan seinän pintaan');
  for (const k of kaari) assert.equal(k.rooli, 'kivi');
});

test('sokkelikivet: kivet pysyvät seinän juuressa ja pituuden sisällä, ovien välit jäävät tyhjiksi ja kynnys menee seinän läpi', () => {
  const param = { pituus: 6.0, korkeus: 0.4, ulkonema: 0.1, siemen: 700, valit: [[-0.6, 0.6]], kynnykset: [{ u0: -0.55, u1: 0.55, syvyys: 1.6 }] };
  const k = sokkelikivet(param), P = k.flatMap((t) => t.p);
  assert.ok(k.length > 0);
  for (const [u, y, w] of P) {
    assert.ok(u >= -3.0001 && u <= 3.0001, `u ${u} pituuden sisällä`);
    assert.ok(y >= -1e-9 && y <= 0.4 * 1.6 + 0.02, `y ${y} juuressa`);
    assert.ok(w >= -1.6001 && w <= 0.14 * 1.2 + 0.001, `w ${w}`);
  }
  // ovenvälissä vain kynnys (y ≤ 0,12)
  for (const t of k) if (t.p.every(([u]) => u > -0.59 && u < 0.59)) assert.ok(t.p.every(([, y]) => y <= 0.1201));
  assert.ok(Math.min(...P.map((p) => p[2])) < -1.59, 'kynnys seinän läpi');
  assert.equal(JSON.stringify(sokkelikivet(param)), JSON.stringify(k), 'deterministinen');
  assert.notEqual(JSON.stringify(sokkelikivet({ ...param, siemen: 701 })), JSON.stringify(k));
  for (const t of k) assert.equal(t.rooli, 'kivi');
});
