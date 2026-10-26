/*
 * Dioraaman rakenne-reseptien (tools/dioraama/reseptit-rakenne.mjs: laatta, seina, torni, porras)
 * testit (Linnanrakentaja, ali-agentti C1). Speksi: docs/raportit/
 * dioraama-rajapinnat-20260929.md kohdat 0, 2 ja 3b.
 *
 * Testaa reseptejä SUORAAN (ei rakennuskonetta). reseptit.mjs:n sijoita otetaan mukaan vain jos
 * rinnakkaisten ali-agenttien tiedostot reseptit-maasto.mjs ja reseptit-kalusteet.mjs ovat jo
 * olemassa (reseptit.mjs tuo ne kaikki) — muuten kokoaja testataan myöhemmin.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { laatta, seina, torni, porras, RESEPTIT, OLETUSPINNAT } from '../tools/dioraama/reseptit-rakenne.mjs';

const tassaKansiossa = path.dirname(fileURLToPath(import.meta.url));
const dioraamaKansio = path.join(tassaKansiossa, '..', 'tools', 'dioraama');
const kokoajaValmis = existsSync(path.join(dioraamaKansio, 'reseptit-maasto.mjs'))
  && existsSync(path.join(dioraamaKansio, 'reseptit-kalusteet.mjs'));
let sijoita = null;
if (kokoajaValmis) {
  ({ sijoita } = await import('../tools/dioraama/reseptit.mjs'));
}

/* ==================== Pienet geometria-apurit (vain tätä testiä varten) ==================== */
function vahenna(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
function risti(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
function piste(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
function kolmionAla(t) {
  const e1 = vahenna(t.p[1], t.p[0]), e2 = vahenna(t.p[2], t.p[0]);
  return 0.5 * Math.hypot(...risti(e1, e2));
}
function kolmionKeski(t) {
  return [
    (t.p[0][0] + t.p[1][0] + t.p[2][0]) / 3,
    (t.p[0][1] + t.p[1][1] + t.p[2][1]) / 3,
    (t.p[0][2] + t.p[1][2] + t.p[2][2]) / 3,
  ];
}
function littealNormaali(t) {
  const e1 = vahenna(t.p[1], t.p[0]), e2 = vahenna(t.p[2], t.p[0]);
  const n = risti(e1, e2);
  const l = Math.hypot(...n) || 1;
  return [n[0] / l, n[1] / l, n[2] / l];
}
// Paikallinen kompassikulma asteina pisteestä (u, w): 0 = +w, 90 = +u (ks. reseptit-apu.mjs).
function kulma(u, w) {
  const a = Math.atan2(u, w) * 180 / Math.PI;
  return ((a % 360) + 360) % 360;
}
function eiDegeneroitunut(kolmiot, nimi) {
  for (const t of kolmiot) assert.ok(kolmionAla(t) > 1e-8, `${nimi}: degeneroitunut kolmio (rooli ${t.rooli})`);
}
function rajat(kolmiot) {
  const xs = kolmiot.flatMap((t) => t.p.map((p) => p[0]));
  const ys = kolmiot.flatMap((t) => t.p.map((p) => p[1]));
  const zs = kolmiot.flatMap((t) => t.p.map((p) => p[2]));
  return {
    u: [Math.min(...xs), Math.max(...xs)],
    y: [Math.min(...ys), Math.max(...ys)],
    w: [Math.min(...zs), Math.max(...zs)],
  };
}
// Oma Möller–Trumbore-säde/kolmio-leikkaustesti (ei ulkoista riippuvuutta).
function sadeOsuu(origo, suunta, t, eps = 1e-9) {
  const [a, b, c] = t.p;
  const e1 = vahenna(b, a), e2 = vahenna(c, a);
  const h = risti(suunta, e2);
  const det = piste(e1, h);
  if (Math.abs(det) < eps) return false;
  const f = 1 / det;
  const s = vahenna(origo, a);
  const u = f * piste(s, h);
  if (u < 0 || u > 1) return false;
  const q = risti(s, e1);
  const v = f * piste(suunta, q);
  if (v < 0 || u + v > 1) return false;
  const dist = f * piste(e2, q);
  return dist > eps;
}

/* ==================== laatta ==================== */
test('laatta: suljettu laatikko, rajat, roolit, ei degeneroituneita, normaalit ulospäin', () => {
  const leveys = 4, syvyys = 3, paksuus = 0.4;
  const t = laatta({ leveys, syvyys, paksuus });
  assert.ok(t.length >= 1);
  eiDegeneroitunut(t, 'laatta');
  const r = rajat(t);
  assert.deepEqual(r.u, [-leveys / 2, leveys / 2]);
  assert.deepEqual(r.w, [-syvyys / 2, syvyys / 2]);
  assert.deepEqual(r.y, [-paksuus, 0]);
  assert.deepEqual([...new Set(t.map((k) => k.rooli))].sort(), ['ala', 'sivu', 'yla']);
  const keski = [0, -paksuus / 2, 0];
  for (const k of t) {
    const ulospain = vahenna(kolmionKeski(k), keski);
    assert.ok(
      piste(ulospain, littealNormaali(k)) > 0,
      `laatta: normaali ei osoita keskipisteestä poispäin (rooli ${k.rooli})`,
    );
  }
});

/* ==================== seina ==================== */
test('seina: rajat ja roolit ilman aukkoja, ei degeneroituneita', () => {
  const pituus = 6, korkeus = 3, paksuus = 0.4;
  const t = seina({ pituus, korkeus, paksuus });
  eiDegeneroitunut(t, 'seina-umpi');
  const r = rajat(t);
  assert.deepEqual(r.u, [-pituus / 2, pituus / 2]);
  assert.deepEqual(r.y, [0, korkeus]);
  assert.deepEqual(r.w, [-paksuus / 2, paksuus / 2]);
  assert.deepEqual([...new Set(t.map((k) => k.rooli))].sort(), ['etu', 'paaty', 'taka', 'yla']);
});

test('seina: ikkuna-aukko menee läpi (säde aukon keskeltä ei osu mihinkään)', () => {
  const t = seina({ pituus: 6, korkeus: 3, paksuus: 0.4, aukot: [{ u: 0, y: 1, leveys: 0.6, korkeus: 0.8 }] });
  eiDegeneroitunut(t, 'seina-ikkuna');
  assert.ok(t.some((k) => k.rooli === 'pieli'));
  const aukonKeski = [0, 1.4, -5];
  const wSuunta = [0, 0, 1];
  assert.ok(!t.some((k) => sadeOsuu(aukonKeski, wSuunta, k)), 'säde aukon keskeltä ei saisi osua mihinkään');
  const umpiKeski = [2, 1.4, -5];
  assert.ok(t.some((k) => sadeOsuu(umpiKeski, wSuunta, k)), 'säde umpinaisen kohdan läpi pitäisi osua johonkin (sanity)');
});

test('seina: ovi (aukko, jonka y = 0) ei tarvitse kynnystä', () => {
  const t = seina({ pituus: 4, korkeus: 2.2, paksuus: 0.5, aukot: [{ u: 0, y: 0, leveys: 1, korkeus: 2 }] });
  eiDegeneroitunut(t, 'seina-ovi');
  const vaakaKynnysY0 = t.filter((k) => k.rooli === 'pieli' && k.p.every((p) => Math.abs(p[1]) < 1e-9));
  assert.equal(vaakaKynnysY0.length, 0, 'ovella ei pitäisi olla vaakasuoraa kynnyspintaa y = 0:ssa');
  assert.ok(!t.some((k) => sadeOsuu([0, 1, -5], [0, 0, 1], k)), 'säde oviaukon keskeltä ei saisi osua mihinkään');
});

test('seina: leikkaus-roolit oikeisiin päätyihin ja yläpintaan', () => {
  const pituus = 6, korkeus = 3, paksuus = 0.4;
  const t = seina({ pituus, korkeus, paksuus, leikkaus: { vasen: true, oikea: false, yla: true } });
  const vasenPaaty = t.filter((k) => k.p.every((p) => Math.abs(p[0] + pituus / 2) < 1e-9));
  const oikeaPaaty = t.filter((k) => k.p.every((p) => Math.abs(p[0] - pituus / 2) < 1e-9));
  const ylapinta = t.filter((k) => k.p.every((p) => Math.abs(p[1] - korkeus) < 1e-9));
  assert.ok(vasenPaaty.length > 0 && vasenPaaty.every((k) => k.rooli === 'leikkaus'));
  assert.ok(oikeaPaaty.length > 0 && oikeaPaaty.every((k) => k.rooli === 'paaty'));
  assert.ok(ylapinta.length > 0 && ylapinta.every((k) => k.rooli === 'leikkaus'));
});

/* ==================== torni ==================== */
test('torni: umpinainen (auki: null), rajat, roolit, ei degeneroituneita', () => {
  const sade = 5, korkeus = 10, paksuus = 1, segmentit = 16;
  const t = torni({ sade, korkeus, paksuus, segmentit, auki: null });
  eiDegeneroitunut(t, 'torni-umpi');
  const r = rajat(t);
  assert.ok(Math.abs(r.y[0]) < 1e-9 && Math.abs(r.y[1] - korkeus) < 1e-9);
  const maxSade = Math.max(...t.flatMap((k) => k.p.map((p) => Math.hypot(p[0], p[2]))));
  assert.ok(maxSade <= sade + 1e-6);
  assert.deepEqual([...new Set(t.map((k) => k.rooli))].sort(), ['sisa', 'ulko']);
});

test('torni: auki-sektori (150–210, suunta 0) poistaa sen välin ulkovaipasta', () => {
  const t = torni({ sade: 5, korkeus: 10, paksuus: 1, segmentit: 32, suunta: 0, auki: { alku: 150, loppu: 210 } });
  eiDegeneroitunut(t, 'torni-auki');
  const ulko = t.filter((k) => k.rooli === 'ulko');
  assert.ok(ulko.length > 0);
  for (const k of ulko) {
    for (const p of k.p) {
      const kk = kulma(p[0], p[2]);
      assert.ok(!(kk > 150 + 1e-6 && kk < 210 - 1e-6), `ulko-kolmio kompassivälillä 150-210 (${kk})`);
    }
  }
  assert.ok(t.some((k) => k.rooli === 'leikkaus'), 'sektorin reunoille ja yläreunaan pitäisi tulla leikkauspintoja');
});

test('torni: suunta 90 siirtää auki-sektoria paikallisessa kehyksessä', () => {
  const param = { sade: 5, korkeus: 10, paksuus: 1, segmentit: 32, auki: { alku: 150, loppu: 210 } };
  const osuuValille = (t, lo, hi) => t.filter((k) => k.rooli === 'ulko')
    .some((k) => k.p.some((p) => { const kk = kulma(p[0], p[2]); return kk > lo + 1e-6 && kk < hi - 1e-6; }));
  const t0 = torni({ ...param, suunta: 0 });
  const t90 = torni({ ...param, suunta: 90 });
  assert.ok(osuuValille(t0, 60, 120), 'suunta 0: paikallinen 60-120 pitäisi olla katettu (poisto on 150-210:ssä)');
  assert.ok(!osuuValille(t90, 60, 120), 'suunta 90: paikallinen 60-120 pitäisi olla poistettu (siirtynyt sektori)');
});

test('torni: vyo oikealla korkeudella, säteellä sade + 0,05, rooli vyo', () => {
  const sade = 5, paksuus = 1, vyo = { y: 4, korkeus: 1 };
  const t = torni({ sade, korkeus: 10, paksuus, segmentit: 16, auki: null, vyo });
  const vyot = t.filter((k) => k.rooli === 'vyo');
  assert.ok(vyot.length > 0);
  for (const k of vyot) {
    for (const p of k.p) {
      assert.ok(p[1] >= vyo.y - 1e-9 && p[1] <= vyo.y + vyo.korkeus + 1e-9);
      assert.ok(Math.abs(Math.hypot(p[0], p[2]) - (sade + 0.05)) < 1e-9);
    }
  }
});

test('torni: ulkovaipan pehmeät normaalit ulos, sisävaipan sisään', () => {
  const t = torni({ sade: 5, korkeus: 10, paksuus: 1, segmentit: 16, auki: null });
  let tarkistettu = 0;
  for (const k of t) {
    if (!k.n) continue;
    for (let i = 0; i < 3; i++) {
      const p = k.p[i], n = k.n[i];
      const sade2 = Math.hypot(p[0], p[2]) || 1;
      const sateittainen = [p[0] / sade2, 0, p[2] / sade2];
      const d = piste(n, sateittainen);
      if (k.rooli === 'ulko') assert.ok(d > 0, 'ulkovaipan pehmeä normaali ei osoita ulos');
      if (k.rooli === 'sisa') assert.ok(d < 0, 'sisävaipan pehmeä normaali ei osoita sisään');
      tarkistettu++;
    }
  }
  assert.ok(tarkistettu > 0, 'testin pitäisi tarkistaa ainakin joitain pehmeitä normaaleja');
});

/* ==================== porras ==================== */
test('porras: askelmäärä, korkein ylätaso, rajat, ei degeneroituneita', () => {
  const leveys = 2, askelmat = 5, nousu = 0.2, etenema = 0.3;
  const t = porras({ leveys, askelmat, nousu, etenema });
  eiDegeneroitunut(t, 'porras');
  const r = rajat(t);
  assert.deepEqual(r.u, [-leveys / 2, leveys / 2]);
  assert.ok(Math.abs(r.y[0]) < 1e-9);
  assert.ok(Math.abs(r.y[1] - askelmat * nousu) < 1e-9, `korkein ylätaso pitäisi olla ${askelmat * nousu}`);
  assert.ok(Math.abs(r.w[0]) < 1e-9);
  assert.ok(Math.abs(r.w[1] - askelmat * etenema) < 1e-9);
  assert.deepEqual([...new Set(t.map((k) => k.rooli))], ['askel']);
});

test('porras: eri askelmäärä muuttaa korkeimman ylätason korkeutta', () => {
  for (const askelmat of [1, 3, 22]) {
    const nousu = 0.18;
    const t = porras({ leveys: 1.5, askelmat, nousu, etenema: 0.28 });
    const maxY = Math.max(...t.flatMap((k) => k.p.map((p) => p[1])));
    assert.ok(Math.abs(maxY - askelmat * nousu) < 1e-9, `${askelmat} askelmaa: maxY ${maxY} != ${askelmat * nousu}`);
  }
});

/* ==================== Viennit ja kokoaja ==================== */
test('RESEPTIT ja OLETUSPINNAT on viety oikein', () => {
  assert.deepEqual(Object.keys(RESEPTIT).sort(), ['laatta', 'porras', 'seina', 'torni']);
  assert.equal(RESEPTIT.laatta, laatta);
  assert.equal(RESEPTIT.seina, seina);
  assert.equal(RESEPTIT.torni, torni);
  assert.equal(RESEPTIT.porras, porras);
  assert.equal(OLETUSPINNAT.laatta.yla, 'lankku');
  assert.equal(OLETUSPINNAT.seina.etu, 'kivi');
  assert.equal(OLETUSPINNAT.torni.vyo, 'tiili');
  assert.equal(OLETUSPINNAT.porras.askel, 'kivi');
});

test('jokainen resepti tuottaa vähintään yhden kolmion', () => {
  assert.ok(laatta({ leveys: 1, syvyys: 1, paksuus: 0.1 }).length >= 1);
  assert.ok(seina({ pituus: 1, korkeus: 1, paksuus: 0.1 }).length >= 1);
  assert.ok(torni({ sade: 1, korkeus: 1, paksuus: 0.2, segmentit: 8 }).length >= 1);
  assert.ok(porras({ leveys: 1, askelmat: 1 }).length >= 1);
});

test(
  'sijoita (reseptit.mjs) sijoittaa laatan maailmaan ja ratkaisee oletuspinnan',
  { skip: kokoajaValmis ? false : 'reseptit-maasto.mjs / reseptit-kalusteet.mjs eivät ole vielä olemassa' },
  () => {
    const instanssi = { resepti: 'laatta', paikka: [10, 5, 2], suunta: 0, leveys: 2, syvyys: 2, paksuus: 0.3 };
    const t = sijoita(instanssi);
    assert.ok(t.length >= 1);
    const ys = t.flatMap((k) => k.p.map((p) => p[1]));
    assert.ok(Math.abs(Math.max(...ys) - 5) < 1e-9);
    assert.ok(Math.abs(Math.min(...ys) - 4.7) < 1e-9);
    for (const k of t) assert.equal(typeof k.pinta, 'string');
  },
);
