/*
 * Dioraaman lattiareseptien (tools/dioraama/reseptit-lattiat.mjs: kivilattia, lankkulattia)
 * testit (Linnanrakentaja erä 2b, 29.9.2026, ali-agentti P2). Speksi: docs/raportit/
 * dioraama-rajapinnat-era2b-20260929.md kohdat 1 ja 3.
 *
 * Reseptit suoraan (laattojen määrä, saumat, osa-tunnisteet, deterministisyys) + pieni
 * rakennaData()-fixtuuri COLOR_0.B:n vaihtelulle ja koko putken deterministisyydelle
 * (era2b kohta 1) — sama kuvio kuin tests/dioraama-rakennuskone.test.mjs, mutta oma
 * minimaalinen huone ettei testi hidastu (ei tekstuureja, muutama laatta).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { kivilattia, lankkulattia, OLETUSPINNAT } from '../tools/dioraama/reseptit-lattiat.mjs';
import { sijoita } from '../tools/dioraama/reseptit.mjs';
import { rakennaData } from '../tools/dioraama/rakenna.mjs';
import { lueGlb } from '../tools/dioraama/glb.mjs';

const SAATEITA_TESTISSA = 4; // pieni huone, ei tarvitse tarkkaa AO:ta

/* ==================== Pienet apurit (samat kaavat kuin dioraama-reseptit-rakenne.test.mjs) ==================== */
function vahenna(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
function risti(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
function piste(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
function kolmionAla(t) {
  const e1 = vahenna(t.p[1], t.p[0]); const e2 = vahenna(t.p[2], t.p[0]);
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
  const e1 = vahenna(t.p[1], t.p[0]); const e2 = vahenna(t.p[2], t.p[0]);
  const n = risti(e1, e2); const l = Math.hypot(...n) || 1;
  return [n[0] / l, n[1] / l, n[2] / l];
}

/** Ryhmittää kolmiot `osa`-tunnisteen mukaan ja laskee kunkin laatan/lankun (u, y, w) rajat. */
function laatikot(kolmiot) {
  const ryhmat = new Map();
  for (const t of kolmiot) {
    assert.ok(t.osa, `kolmiolla ei ole osa-tunnistetta (rooli ${t.rooli})`);
    if (!ryhmat.has(t.osa)) ryhmat.set(t.osa, []);
    ryhmat.get(t.osa).push(t);
  }
  const tulos = [];
  for (const [osa, ts] of ryhmat) {
    const us = ts.flatMap((t) => t.p.map((p) => p[0]));
    const ys = ts.flatMap((t) => t.p.map((p) => p[1]));
    const ws = ts.flatMap((t) => t.p.map((p) => p[2]));
    tulos.push({
      osa, ts,
      u0: Math.min(...us), u1: Math.max(...us),
      y0: Math.min(...ys), y1: Math.max(...ys),
      w0: Math.min(...ws), w1: Math.max(...ws),
    });
  }
  return tulos;
}

function uusiTilapaisinenKansio() {
  return mkdtempSync(join(tmpdir(), 'dioraama-lattiat-test-'));
}

/* ==================== 0: rekisteröinti reseptit.mjs:ään + roolit ==================== */
test('kivilattia/lankkulattia rekisteröityvät reseptit.mjs:ään oikeilla pinnoilla', () => {
  assert.deepEqual(OLETUSPINNAT.kivilattia, { yla: 'kivilattia', sivu: 'kivi' });
  assert.deepEqual(OLETUSPINNAT.lankkulattia, { yla: 'lankku', sivu: 'puu' });
  const kivi = sijoita({
    resepti: 'kivilattia', paikka: [0, 0, 0], suunta: 0, leveys: 2, syvyys: 1.5, laatta_m: [0.4, 0.6], siemen: 1,
  });
  assert.ok(kivi.some((t) => t.pinta === 'kivilattia'), 'kivilattia: yläpinnan pitäisi käyttää pintaa kivilattia');
  assert.ok(kivi.some((t) => t.pinta === 'kivi'), 'kivilattia: sivujen pitäisi käyttää pintaa kivi');
  const lankku = sijoita({
    resepti: 'lankkulattia', paikka: [0, 0, 0], suunta: 0, leveys: 2, syvyys: 1.5, lankku_m: [0.18, 0.26], siemen: 1,
  });
  assert.ok(lankku.some((t) => t.pinta === 'lankku'), 'lankkulattia: yläpinnan pitäisi käyttää pintaa lankku');
  assert.ok(lankku.some((t) => t.pinta === 'puu'), 'lankkulattia: sivujen pitäisi käyttää pintaa puu');
});

/* ==================== 1: kivilattia — laattojen määrä, geometria, normaalit ==================== */
test('kivilattia: täyttää alueen useilla laatoilla, ei degeneroituneita, normaalit ulospäin per laatta', () => {
  const t = kivilattia({ leveys: 3, syvyys: 2, laatta_m: [0.4, 0.6], sauma_m: 0.02, siemen: 7 });
  assert.ok(t.length > 0);
  for (const k of t) assert.ok(kolmionAla(k) > 1e-9, `degeneroitunut kolmio (osa ${k.osa})`);
  const laatat = laatikot(t);
  // 3 × 2 m ala, laatat 0,4–0,6 m (keskikoko 0,5 m) → odotetaan karkeasti 4 × 6 = 24 laattaa.
  assert.ok(laatat.length >= 6, `odotettiin useita laattoja, saatiin ${laatat.length}`);
  for (const { ts, u0, u1, y0, y1, w0, w1 } of laatat) {
    const keski = [(u0 + u1) / 2, (y0 + y1) / 2, (w0 + w1) / 2]; // laatan OMA keskipiste (ei koko lattian)
    for (const k of ts) {
      const ulospain = vahenna(kolmionKeski(k), keski);
      assert.ok(
        piste(ulospain, littealNormaali(k)) > -1e-9,
        `laatta: normaali ei osoita ulospäin (osa ${k.osa}, rooli ${k.rooli})`,
      );
    }
  }
});

test('lankkulattia: yksi "rivi" (pitkät lankut, koko syvyys), ei degeneroituneita', () => {
  const syvyys = 2.2;
  const t = lankkulattia({ leveys: 2, syvyys, lankku_m: [0.18, 0.26], sauma_m: 0.01, siemen: 9 });
  for (const k of t) assert.ok(kolmionAla(k) > 1e-9, `degeneroitunut kolmio (osa ${k.osa})`);
  const laatat = laatikot(t);
  assert.ok(laatat.length >= 4, `odotettiin useita lankkuja, saatiin ${laatat.length}`);
  const puoliSauma = 0.005;
  for (const { w0, w1 } of laatat) {
    assert.ok(Math.abs(w1 - w0 - (syvyys - 2 * puoliSauma)) < 1e-6, 'lankun pitäisi ulottua koko syvyyden matkalle');
  }
});

/* ==================== 2: saumat ==================== */
test('lankkulattia: sauma_m-levyinen rako vierekkäisten lankkujen välissä (u-suunta)', () => {
  const sauma = 0.018;
  const t = lankkulattia({ leveys: 2.5, syvyys: 1, lankku_m: [0.2, 0.22], sauma_m: sauma, siemen: 3 });
  const laatat = laatikot(t).sort((a, b) => a.u0 - b.u0);
  assert.ok(laatat.length >= 3, `odotettiin vähintään 3 lankkua, saatiin ${laatat.length}`);
  for (let i = 0; i < laatat.length - 1; i++) {
    const rako = laatat[i + 1].u0 - laatat[i].u1;
    assert.ok(Math.abs(rako - sauma) < 1e-6, `rako ${rako} != sauma ${sauma} (lankut ${i}, ${i + 1})`);
  }
});

test('kivilattia: sauma_m-levyinen rako myös rivien välissä (w-suunta)', () => {
  const sauma = 0.02;
  // leveys < laatta_m:n minimi -> AINA täsmälleen 1 sarake (ensimmäinen arvottu koko ylittää alan,
  // typistys täyttää koko leveyden yhdellä laatalla). syvyys 0,9 laatta_m:llä [0,45; 0,5] antaa AINA
  // täsmälleen 2 riviä (yksikään yksittäinen arvonta ei riitä, kaksi täyttää AINA tasan — ks.
  // reseptit-lattiat.mjs:n jaaPaloihin). Näin testi on deterministinen riippumatta rng:n arvoista.
  const t = kivilattia({ leveys: 0.4, syvyys: 0.9, laatta_m: [0.45, 0.5], sauma_m: sauma, siemen: 11 });
  const laatat = laatikot(t).sort((a, b) => a.w0 - b.w0);
  assert.equal(laatat.length, 2, `odotettiin täsmälleen 2 laattaa, saatiin ${laatat.length}`);
  const rako = laatat[1].w0 - laatat[0].w1;
  assert.ok(Math.abs(rako - sauma) < 1e-6, `rako ${rako} != sauma ${sauma}`);
});

/* ==================== 3: osa per laatta/lankku + reseptin oma deterministisyys ==================== */
test('kivilattia: jokainen laatta saa oman osa-tunnisteen; sama siemen -> identtinen tulos, eri siemen -> eri', () => {
  const param = { leveys: 3, syvyys: 2, laatta_m: [0.4, 0.6], sauma_m: 0.02, siemen: 42 };
  const a = kivilattia(param);
  const b = kivilattia({ ...param });
  assert.deepEqual(a, b, 'sama siemen pitäisi tuottaa täysin identtisen geometrian');
  const osat = new Set(a.map((k) => k.osa));
  assert.equal(osat.size, laatikot(a).length, 'joka laatalla oma osa, ei enempää eikä vähempää');
  const c = kivilattia({ ...param, siemen: 43 });
  assert.notDeepEqual(a, c, 'eri siemen pitäisi (lähes varmasti) tuottaa eri asettelun');
});

/* ==================== 4: COLOR_0.B koko putken läpi (rakenna.mjs) — vaihtelu + deterministisyys ==================== */
// Minimaalinen huone (ei tekstuureja, ei ääniä) — pelkkä kivilattia riittää B:n arpomisen testiin.
function pieniHuone(siemen) {
  return {
    id: 'koe-lattiat',
    nimi: 'Koe',
    tilat: [{
      id: 'koelattia',
      nimi: 'Koelattia',
      kohdistettava: true,
      valot: [],
      palikat: [
        {
          resepti: 'kivilattia', paikka: [0, 0, 0], suunta: 0, leveys: 2, syvyys: 1.5,
          laatta_m: [0.4, 0.6], siemen,
        },
      ],
      hahmot: [],
    }],
  };
}

test('COLOR_0.B: kivilattian laatoilla useita eri sävyjä (ei kaikki samaa arvoa)', async () => {
  const ulos = uusiTilapaisinenKansio();
  try {
    const tulos = await rakennaData(pieniHuone(1), { ulos, saateita: SAATEITA_TESTISSA });
    const glb = lueGlb(readFileSync(join(tulos.kansio, 'tilat', 'koelattia.glb')));
    const osa = glb.osat.find((o) => o.pinta === 'kivilattia');
    assert.ok(osa, "pinta 'kivilattia' puuttuu glb:stä (löytyi: " + glb.osat.map((o) => o.pinta).join(', ') + ')');
    const bArvot = new Set();
    for (let i = 0; i < osa.varit.length; i += 4) bArvot.add(osa.varit[i + 2]);
    assert.ok(bArvot.size >= 4, `odotettiin useita B-arvoja, saatiin ${bArvot.size}`);
  } finally {
    rmSync(ulos, { recursive: true, force: true });
  }
});

test('COLOR_0.B: sama data kahdesti -> tavuidenttinen glb (koko putki deterministinen)', async () => {
  const k1 = uusiTilapaisinenKansio();
  const k2 = uusiTilapaisinenKansio();
  try {
    const t1 = await rakennaData(pieniHuone(5), { ulos: k1, saateita: SAATEITA_TESTISSA });
    const t2 = await rakennaData(pieniHuone(5), { ulos: k2, saateita: SAATEITA_TESTISSA });
    const g1 = readFileSync(join(t1.kansio, 'tilat', 'koelattia.glb'));
    const g2 = readFileSync(join(t2.kansio, 'tilat', 'koelattia.glb'));
    assert.ok(g1.equals(g2), 'kaksi ajoa samalla datalla pitäisi tuottaa tavuidenttinen glb (myös COLOR_0.B)');
  } finally {
    rmSync(k1, { recursive: true, force: true });
    rmSync(k2, { recursive: true, force: true });
  }
});

test('COLOR_0.B: eri siemen (eri osa-tunnisteet) -> eri glb', async () => {
  const k1 = uusiTilapaisinenKansio();
  const k2 = uusiTilapaisinenKansio();
  try {
    const t1 = await rakennaData(pieniHuone(1), { ulos: k1, saateita: SAATEITA_TESTISSA });
    const t2 = await rakennaData(pieniHuone(2), { ulos: k2, saateita: SAATEITA_TESTISSA });
    const g1 = readFileSync(join(t1.kansio, 'tilat', 'koelattia.glb'));
    const g2 = readFileSync(join(t2.kansio, 'tilat', 'koelattia.glb'));
    assert.ok(!g1.equals(g2), 'eri siemen pitäisi (lähes varmasti) tuottaa erilaisen glb:n');
  } finally {
    rmSync(k1, { recursive: true, force: true });
    rmSync(k2, { recursive: true, force: true });
  }
});
