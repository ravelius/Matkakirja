// Testit dioraaman linnan kalusteille ja rekvisiitalle (Linnanrakentaja 29.9.2026, erä 3, ali-agentti B).
// Speksi: docs/raportit/dioraama-rajapinnat-era3-20260929.md kohta 2; reseptit: tools/dioraama/reseptit-kalusteet2.mjs.
// Testataan RESEPTIT-taulun funktioita suoraan (paikallinen kehys u, y, w) ja sijoita():n kautta valoa.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { RESEPTIT, OLETUSPINNAT } from '../tools/dioraama/reseptit-kalusteet2.mjs';
import { RESEPTIT as KAIKKI, sijoita } from '../tools/dioraama/reseptit.mjs';
import { PINNAT } from '../js/dioraama/pankit/pinnat.js';

const ODOTETUT = [
  'alttari', 'vihkimisristi', 'kirkonpenkki', 'kynttilakruunu', 'seinasoihtu', 'arkku', 'keihasteline', 'kilpi',
  'hakapyssy', 'ruutitynnyri', 'pelilauta', 'pulpetti', 'kirja', 'koysikieppi', 'airot', 'verkko', 'kello',
  'jalkajousi', 'nuolitynnyri',
].sort();
const NIMET = Object.keys(RESEPTIT).sort();
// Seinään kiinnitettävät: origo seinän pinnalla, y molempiin suuntiin, w ≥ 0. Roikkuva: y ≤ 0 (origo katossa).
const SEINALLE = ['vihkimisristi', 'seinasoihtu', 'kilpi', 'jalkajousi'];
const ROIKKUVA = ['kynttilakruunu'];

function geom(t) {
  const [a, b, c] = t.p;
  const e1 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], e2 = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
  const n = [e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]];
  const l = Math.hypot(n[0], n[1], n[2]);
  return { l, n: l > 0 ? n.map((x) => x / l) : [0, 0, 0] };
}

test('RESEPTIT sisältää kaikki 19 nimeä sekä kalusteet2:ssa että reseptit.mjs:n kootussa taulussa', () => {
  assert.equal(ODOTETUT.length, 19);
  assert.deepEqual(NIMET, ODOTETUT);
  assert.deepEqual(Object.keys(OLETUSPINNAT).sort(), ODOTETUT);
  for (const nimi of ODOTETUT) assert.equal(typeof KAIKKI[nimi], 'function', `${nimi} puuttuu reseptit.mjs:n RESEPTIT:stä`);
});

test('uudet pinnat on lisätty PINNAT-pankkiin speksin väreillä', () => {
  const odotus = { punamulta: ['#8a2e20', 'rappaus'], kulta: ['#b8923a', 'metalli'], aukko: ['#1c1611', 'tasainen'], lippu: ['#8a2e20', 'kangas'] };
  for (const [id, [vari, kuvio]] of Object.entries(odotus)) {
    assert.equal(PINNAT[id]?.vari, vari, `${id}: väri`);
    assert.equal(PINNAT[id].kuvio.tyyppi, kuvio, `${id}: kuvio`);
  }
  assert.equal(PINNAT.olki.kuvio.tyyppi, 'olki');
});

test('jokainen resepti: kolmioita, ≤ 600, kärjet äärellisiä, ei degeneroituneita, rooli tunnettu', () => {
  for (const nimi of NIMET) {
    const k = RESEPTIT[nimi]({});
    assert.ok(k.length >= 1, `${nimi}: ei kolmioita`);
    assert.ok(k.length <= 600, `${nimi}: ${k.length} kolmiota > 600`);
    for (const t of k) {
      assert.ok(t.p.every((v) => v.length === 3 && v.every(Number.isFinite)), `${nimi}: ei-äärellinen kärki`);
      assert.ok(geom(t).l > 1e-9, `${nimi}: degeneroitunut kolmio`);
      assert.ok(t.rooli in OLETUSPINNAT[nimi], `${nimi}: rooli '${t.rooli}' puuttuu OLETUSPINNAT:sta`);
    }
    for (const rooli of Object.keys(OLETUSPINNAT[nimi])) {
      assert.ok(k.some((t) => t.rooli === rooli), `${nimi}: OLETUSPINNAT-rooli '${rooli}' ei esiinny geometriassa`);
    }
  }
});

test('OLETUSPINNAT: jokaisen roolin pinta löytyy PINNAT-pankista', () => {
  for (const nimi of NIMET) {
    for (const [rooli, pinta] of Object.entries(OLETUSPINNAT[nimi])) {
      assert.ok(pinta in PINNAT, `${nimi}.${rooli}: pinta '${pinta}' puuttuu PINNAT:sta`);
    }
  }
});

test('lattia y ≥ −0,01 (lattialla lepäävät); seinäkalusteilla w ≥ −0,01; kynttilakruunu roikkuu (y ≤ 0,01)', () => {
  for (const nimi of NIMET) {
    for (const t of RESEPTIT[nimi]({})) {
      for (const [, y, w] of t.p) {
        if (SEINALLE.includes(nimi)) assert.ok(w >= -0.01, `${nimi}: w = ${w} seinän takana`);
        else if (ROIKKUVA.includes(nimi)) assert.ok(y <= 0.01, `${nimi}: y = ${y} katon yläpuolella`);
        else assert.ok(y >= -0.01, `${nimi}: y = ${y} lattian alla`);
      }
    }
  }
});

test('pehmeät normaalit yksikköpituisia ja kiertosuunnan mukaisia', () => {
  for (const nimi of NIMET) {
    for (const t of RESEPTIT[nimi]({})) {
      if (!t.n) continue;
      for (const nv of t.n) assert.ok(Math.abs(Math.hypot(...nv) - 1) < 1e-6, `${nimi}: normaali ei yksikköpituinen`);
      const g = geom(t).n, m = [0, 1, 2].map((i) => (t.n[0][i] + t.n[1][i] + t.n[2][i]) / 3);
      assert.ok(g[0] * m[0] + g[1] * m[1] + g[2] * m[2] > 0, `${nimi}: kiertosuunta ja pehmeä normaali ristiriidassa`);
    }
  }
});

test('deterministinen: sama syöte antaa saman tuloksen; siemenelliset reagoivat siemeneen', () => {
  for (const nimi of NIMET) assert.deepEqual(RESEPTIT[nimi]({}), RESEPTIT[nimi]({}), `${nimi}: ei deterministinen`);
  for (const nimi of ['pelilauta', 'verkko', 'nuolitynnyri']) {
    assert.deepEqual(RESEPTIT[nimi]({ siemen: 7 }), RESEPTIT[nimi]({ siemen: 7 }));
    assert.notDeepEqual(RESEPTIT[nimi]({ siemen: 7 }), RESEPTIT[nimi]({ siemen: 99 }), `${nimi}: siemen ei vaikuta`);
  }
});

test('muut kuin kynttilakruunu ja seinasoihtu eivät palauta .valoa', () => {
  for (const nimi of NIMET) {
    if (nimi === 'kynttilakruunu' || nimi === 'seinasoihtu') continue;
    assert.equal(RESEPTIT[nimi]({}).valo, undefined, `${nimi}: odottamaton .valo`);
  }
});

test('kynttilakruunu ja seinasoihtu antavat .valon (paikka, sade, voima, vari); sijoita() kuljettaa sen maailmaan', () => {
  const odotusVarit = { kynttilakruunu: '#ffb070', seinasoihtu: '#ffa050' };
  for (const nimi of ['kynttilakruunu', 'seinasoihtu']) {
    const k = RESEPTIT[nimi]({});
    assert.ok(k.valo, `${nimi}: .valo puuttuu`);
    const { paikka_paikallinen: pp, sade, voima, vari } = k.valo;
    assert.equal(pp.length, 3);
    assert.ok(pp.every(Number.isFinite));
    assert.ok(sade > 0 && voima > 0 && voima <= 1, `${nimi}: sade/voima`);
    assert.equal(vari, odotusVarit[nimi]);
    assert.ok(k.every((t) => t.p && t.rooli), `${nimi}: .valo vuosi kolmioiden joukkoon`);
    // sijoita: maailma = paikka + u·r + y·ylös + w·f, r = (cos s, 0, sin s), f = (sin s, 0, −cos s).
    const paikka = [3, 1.5, -2], suunta = 63, s = suunta * Math.PI / 180;
    const m = sijoita({ resepti: nimi, paikka, suunta });
    assert.ok(m.valo, `${nimi}: sijoita() ei kuljettanut .valoa`);
    const [u, y, w] = pp;
    const odotus = [paikka[0] + u * Math.cos(s) + w * Math.sin(s), paikka[1] + y, paikka[2] + u * Math.sin(s) - w * Math.cos(s)];
    odotus.forEach((x, i) => assert.ok(Math.abs(m.valo.paikka[i] - x) < 1e-9, `${nimi}: valon paikka[${i}]`));
    assert.equal(m.valo.sade, sade);
    assert.equal(m.valo.voima, voima);
    assert.equal(m.valo.vari, vari);
  }
});

test('kynttilakruunu: 4–6 kynttilää, kynttilämäärä muuttaa geometriaa; seinäsoihdun valo on liekin lähellä', () => {
  const n = (kpl) => RESEPTIT.kynttilakruunu({ kynttilia: kpl }).filter((t) => t.rooli === 'kynttila').length;
  assert.ok(n(4) < n(5) && n(5) < n(6));
  assert.equal(n(2), n(4), 'alle 4 kynttilää ei sallita');
  const k = RESEPTIT.seinasoihtu({});
  const liekki = k.filter((t) => t.rooli === 'liekki').flatMap((t) => t.p);
  const ylin = Math.max(...liekki.map((v) => v[1])), alin = Math.min(...liekki.map((v) => v[1]));
  assert.ok(k.valo.paikka_paikallinen[1] > alin && k.valo.paikka_paikallinen[1] < ylin + 0.05, 'valo liekin korkeudella');
});

test('keihasteline: 3–4 keihästä, jalkajousi: 1–2 jousta', () => {
  const karkia = (nimi, p) => RESEPTIT[nimi](p).filter((t) => t.rooli === 'karki').length;
  assert.equal(karkia('keihasteline', { keihaita: 3 }) * 4, karkia('keihasteline', { keihaita: 4 }) * 3);
  assert.equal(RESEPTIT.jalkajousi({ kpl: 2 }).filter((t) => t.rooli === 'lapa').length, 2 * RESEPTIT.jalkajousi({ kpl: 1 }).filter((t) => t.rooli === 'lapa').length);
});

test('sijoita() toimii kaikille 19 reseptille: äärelliset maailmankärjet ja pinta asetettu', () => {
  for (const nimi of NIMET) {
    const m = sijoita({ resepti: nimi, paikka: [3, 1, -2], suunta: 63 });
    assert.equal(m.length, RESEPTIT[nimi]({}).length, `${nimi}: kolmiomäärä muuttui`);
    for (const t of m) {
      assert.ok(t.p.every((v) => v.every(Number.isFinite)), `${nimi}: ei-äärellinen maailmakärki`);
      assert.ok(t.pinta in PINNAT, `${nimi}: pinta '${t.pinta}' puuttuu PINNAT:sta`);
    }
  }
});
