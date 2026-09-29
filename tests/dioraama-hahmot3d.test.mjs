// Testit tools/dioraama/hahmot3d.mjs:lle, tools/dioraama/glb.mjs:n kirjoitaMonisolmu-
// Glb:lle ja js/dioraama/liikkeet.js:lle (Linnanrakentaja, erä 2b, ali-agentti P4a,
// 29.9.2026). Speksi: docs/raportit/dioraama-rajapinnat-era2b-20260929.md kohta 4
// "3D-HAHMOT". Pieni GLB-lukija alla on RIIPPUMATON tools/dioraama/glb.mjs:n omasta
// lueGlb:stä (joka tukee vain yksisolmuista muotoa) - samasta syystä kuin
// dioraama-glb.test.mjs: vain JSON-lohko + rakenteen tarkistus, ei täyttä purkua,
// paitsi COLOR_0-testissä, joka lukee BIN-lohkon raa'at tavut suoraan.
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { teeHahmo3d, laskeKolmiot } from '../tools/dioraama/hahmot3d.mjs';
import { kirjoitaMonisolmuGlb } from '../tools/dioraama/glb.mjs';
import { nivelKulmat, juuriNousu } from '../js/dioraama/liikkeet.js';
import { LIIKKEET } from '../js/dioraama/pankit/liikkeet.js';
import { HENKILOT } from '../js/dioraama/pankit/henkilot.js';

const NIVELNIMET = [
  'lantio', 'selka', 'kaula', 'paa',
  'olka_v', 'kyynar_v', 'kasi_v', 'olka_o', 'kyynar_o', 'kasi_o',
  'lonkka_v', 'polvi_v', 'nilkka_v', 'lonkka_o', 'polvi_o', 'nilkka_o',
];
const HENKILO_IDT = ['kokki-1500', 'apulainen-1500', 'vesipoika-1500'];

/* ==================== Pieni GLB->JSON-lukija (vain tätä testiä varten) ==================== */

function lueMonisolmuGlb(buf) {
  assert.strictEqual(buf.readUInt32LE(0), 0x46546c67, 'magic');
  assert.strictEqual(buf.readUInt32LE(4), 2, 'versio');
  assert.strictEqual(buf.readUInt32LE(8), buf.length, 'otsikon pituus == puskurin pituus');
  const jsonLen = buf.readUInt32LE(12);
  assert.strictEqual(buf.readUInt32LE(16), 0x4e4f534a, 'ensimmäinen lohko on JSON');
  const json = JSON.parse(buf.subarray(20, 20 + jsonLen).toString('utf8'));
  const binOtsikkoAlku = 20 + jsonLen + (jsonLen % 4 === 0 ? 0 : 4 - (jsonLen % 4));
  const binLen = buf.readUInt32LE(binOtsikkoAlku);
  assert.strictEqual(buf.readUInt32LE(binOtsikkoAlku + 4), 0x004e4942, 'toinen lohko on BIN');
  const bin = buf.subarray(binOtsikkoAlku + 8, binOtsikkoAlku + 8 + binLen);
  return { json, bin };
}

/* ==================== Hierarkia ja nivelnimet ==================== */

test('teeHahmo3d: 16 niveltä, oikeat nimet, yksi juuri ("lantio"), vanhemmat löytyvät', () => {
  for (const id of HENKILO_IDT) {
    const { solmut } = teeHahmo3d(id, HENKILOT[id]);
    const nimet = solmut.map((s) => s.nimi);
    assert.deepEqual([...nimet].sort(), [...NIVELNIMET].sort(), `${id}: nivelnimet`);
    assert.strictEqual(new Set(nimet).size, 16, `${id}: nimet uniikkeja`);
    const juuret = solmut.filter((s) => s.vanhempi == null);
    assert.strictEqual(juuret.length, 1, `${id}: täsmälleen yksi juurisolmu`);
    assert.strictEqual(juuret[0].nimi, 'lantio', `${id}: juuri on 'lantio'`);
    for (const s of solmut) {
      assert.strictEqual(s.paikka.length, 3, `${id}: '${s.nimi}'.paikka on [x,y,z]`);
      assert.ok(s.paikka.every(Number.isFinite), `${id}: '${s.nimi}'.paikka on äärellinen`);
      if (s.vanhempi != null) {
        assert.ok(nimet.includes(s.vanhempi), `${id}: '${s.nimi}'.vanhempi '${s.vanhempi}' löytyy`);
      }
    }
  }
});

/* ==================== Kolmioraja ==================== */

test('teeHahmo3d: kolmioita > 500 ja <= 3000 per hahmo', () => {
  for (const id of HENKILO_IDT) {
    const n = laskeKolmiot(teeHahmo3d(id, HENKILOT[id]));
    assert.ok(n > 500, `${id}: kolmioita riittävästi (${n})`);
    assert.ok(n <= 3000, `${id}: kolmioita enintään 3000 (${n})`);
  }
});

/* ==================== Normaalit ulospäin ==================== */

test('teeHahmo3d: kolmioiden normaalit osoittavat ulospäin (ei käänteisiä kärkijärjestyksiä)', () => {
  for (const id of HENKILO_IDT) {
    const { solmut } = teeHahmo3d(id, HENKILOT[id]);
    let tarkastettu = 0;
    for (const s of solmut) {
      for (const o of s.osat) {
        const n = o.kolmiot.length / 3;
        for (let i = 0; i < n; i++) {
          const ia = o.kolmiot[i * 3]; const ib = o.kolmiot[i * 3 + 1]; const ic = o.kolmiot[i * 3 + 2];
          const P = (idx) => [o.paikat[idx * 3], o.paikat[idx * 3 + 1], o.paikat[idx * 3 + 2]];
          const N = (idx) => [o.normaalit[idx * 3], o.normaalit[idx * 3 + 1], o.normaalit[idx * 3 + 2]];
          const a = P(ia); const b = P(ib); const c = P(ic);
          const e1 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
          const e2 = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
          const fn = [
            e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0],
          ];
          const flen = Math.hypot(fn[0], fn[1], fn[2]);
          if (flen < 1e-9) continue; // surkastunut napakolmio (pinta-ala 0) - ei näy, ohitetaan
          const na = N(ia); const nb = N(ib); const nc = N(ic);
          const navg = [(na[0] + nb[0] + nc[0]) / 3, (na[1] + nb[1] + nc[1]) / 3, (na[2] + nb[2] + nc[2]) / 3];
          const dot = (fn[0] * navg[0] + fn[1] * navg[1] + fn[2] * navg[2]) / flen;
          assert.ok(dot > 0, `${id} ${s.nimi}/${o.pinta} kolmio ${i}: normaali osoittaa sisäänpäin (dot=${dot.toFixed(3)})`);
          tarkastettu += 1;
        }
      }
    }
    assert.ok(tarkastettu > 100, `${id}: tarkastettiin riittävästi kolmioita (${tarkastettu})`);
  }
});

test('teeHahmo3d: selkeä virhe, jos henkilöllä ei ole malli3d-kenttää', () => {
  assert.throws(() => teeHahmo3d('joku', { nimi: 'Joku' }), /malli3d/);
});

/* ==================== kirjoitaMonisolmuGlb: rakenne ja hierarkia ==================== */

test('kirjoitaMonisolmuGlb: 16 solmua/meshiä, hierarkia ja translation täsmäävät teeHahmo3d:hen', () => {
  for (const id of HENKILO_IDT) {
    const { solmut } = teeHahmo3d(id, HENKILOT[id]);
    const buf = kirjoitaMonisolmuGlb({ nimi: id, solmut });
    const { json } = lueMonisolmuGlb(buf);
    assert.strictEqual(json.nodes.length, 16, `${id}: nodes.length`);
    assert.strictEqual(json.meshes.length, 16, `${id}: meshes.length (kaikilla nivelillä on osia)`);
    assert.strictEqual(json.scenes.length, 1, `${id}: yksi scene`);

    const nimestaIndeksi = new Map(json.nodes.map((n, i) => [n.name, i]));
    assert.strictEqual(nimestaIndeksi.size, 16, `${id}: kaikilla solmuilla uniikki nimi`);

    // Juuri: scenes[0].nodes sisältää täsmälleen 'lantio'-solmun indeksin.
    assert.deepEqual(json.scenes[0].nodes, [nimestaIndeksi.get('lantio')], `${id}: scene-juuri on 'lantio'`);

    for (const s of solmut) {
      const i = nimestaIndeksi.get(s.nimi);
      const node = json.nodes[i];
      assert.deepEqual(node.translation, s.paikka, `${id}: '${s.nimi}'.translation == paikka`);
      // Vanhemman children-taulukossa pitää olla TÄSMÄLLEEN tämä indeksi.
      if (s.vanhempi != null) {
        const vi = nimestaIndeksi.get(s.vanhempi);
        assert.ok(json.nodes[vi].children?.includes(i), `${id}: '${s.vanhempi}'.children sisältää '${s.nimi}' (${i})`);
      }
      // Meshin primitiivimäärä == osien pintamäärä, materiaalin nimi == pinta.
      const mesh = json.meshes[node.mesh];
      assert.strictEqual(mesh.primitives.length, s.osat.length, `${id}: '${s.nimi}' primitiivimäärä`);
      const pinnat = mesh.primitives.map((p) => json.materials[p.material].name).sort();
      assert.deepEqual(pinnat, [...s.osat.map((o) => o.pinta)].sort(), `${id}: '${s.nimi}' pinnat täsmäävät`);
    }
    // Lapsimäärä yhteensä == solmuja - juuria (16 - 1 = 15), eli kaikki muut ovat jonkun lapsi.
    const lapsiaYhteensa = json.nodes.reduce((n, node) => n + (node.children?.length ?? 0), 0);
    assert.strictEqual(lapsiaYhteensa, 15, `${id}: 15 solmua lapsena yhteensä`);
  }
});

/* ==================== TEXCOORD_0/COLOR_0-synteesi (glb.mjs:n vastuu, ei hahmot3d.mjs:n) ==================== */

test('kirjoitaMonisolmuGlb: TEXCOORD_0=(0,0) ja COLOR_0=(AO=255,lämpö=0,B=osan luku,A=255)', () => {
  const id = 'kokki-1500';
  const { solmut } = teeHahmo3d(id, HENKILOT[id]);
  const buf = kirjoitaMonisolmuGlb({ nimi: id, solmut });
  const { json, bin } = lueMonisolmuGlb(buf);
  let tarkastettuPrimitiivi = 0;
  for (const mesh of json.meshes) {
    for (const prim of mesh.primitives) {
      const uvAcc = json.accessors[prim.attributes.TEXCOORD_0];
      const uvView = json.bufferViews[uvAcc.bufferView];
      const uvTavut = bin.subarray(uvView.byteOffset, uvView.byteOffset + uvView.byteLength);
      for (let i = 0; i < uvAcc.count * 2; i += 1) {
        assert.strictEqual(uvTavut.readFloatLE(i * 4), 0, 'TEXCOORD_0 on aina (0,0)');
      }

      const colorAcc = json.accessors[prim.attributes.COLOR_0];
      assert.strictEqual(colorAcc.componentType, 5121, 'COLOR_0 componentType UNSIGNED_BYTE');
      assert.strictEqual(colorAcc.type, 'VEC4');
      const colorView = json.bufferViews[colorAcc.bufferView];
      const varit = bin.subarray(colorView.byteOffset, colorView.byteOffset + colorView.byteLength);
      const b = varit[2];
      for (let i = 0; i < colorAcc.count; i += 1) {
        assert.strictEqual(varit[i * 4], 255, 'R=AO=255 (täysi valo)');
        assert.strictEqual(varit[i * 4 + 1], 0, 'G=lämpö=0');
        assert.strictEqual(varit[i * 4 + 2], b, 'B sama koko osalle (yksi satunnaisluku per osa)');
        assert.strictEqual(varit[i * 4 + 3], 255, 'A=255');
      }
      tarkastettuPrimitiivi += 1;
    }
  }
  assert.ok(tarkastettuPrimitiivi > 10, `tarkastettiin riittävästi primitiiveja (${tarkastettuPrimitiivi})`);
});

/* ==================== Deterministisyys ==================== */

test('teeHahmo3d + kirjoitaMonisolmuGlb: deterministinen (sama syöte -> bittitäsmälleen samat tavut)', () => {
  for (const id of HENKILO_IDT) {
    const buf1 = kirjoitaMonisolmuGlb({ nimi: id, solmut: teeHahmo3d(id, HENKILOT[id]).solmut });
    const buf2 = kirjoitaMonisolmuGlb({ nimi: id, solmut: teeHahmo3d(id, HENKILOT[id]).solmut });
    assert.ok(buf1.equals(buf2), `${id}: kaksi ajoa tuottavat identtiset tavut`);
  }
});

/* ==================== Liikesilmukat (js/dioraama/liikkeet.js) ==================== */

test('liikkeet: nivelKulmat palauttaa kaikki 16 niveltä joka silmukalla', () => {
  for (const silmukka of Object.keys(LIIKKEET)) {
    const k = nivelKulmat(silmukka, 0.37);
    assert.deepEqual([...Object.keys(k)].sort(), [...NIVELNIMET].sort(), `${silmukka}: 16 niveltä`);
  }
});

test('liikkeet: kaikki silmukat sulkeutuvat (t=0 ≈ t=1)', () => {
  for (const silmukka of Object.keys(LIIKKEET)) {
    const k0 = nivelKulmat(silmukka, 0);
    const k1 = nivelKulmat(silmukka, 1);
    for (const nivel of NIVELNIMET) {
      for (let i = 0; i < 3; i += 1) {
        assert.ok(
          Math.abs(k0[nivel][i] - k1[nivel][i]) < 1e-9,
          `${silmukka}.${nivel}[${i}]: t=0 (${k0[nivel][i]}) != t=1 (${k1[nivel][i]})`,
        );
      }
    }
    assert.ok(
      Math.abs(juuriNousu(silmukka, 0) - juuriNousu(silmukka, 1)) < 1e-9,
      `${silmukka}: juuriNousu(0) != juuriNousu(1)`,
    );
  }
});

test('liikkeet: juuriNousu on 0 silmukalla, jolla ei ole juuri-kenttää; >0 kesken kavelyä/kantoa', () => {
  assert.strictEqual(juuriNousu('idle', 0.25), 0);
  assert.strictEqual(juuriNousu('tyo', 0.25), 0);
  assert.strictEqual(juuriNousu('puhe', 0.25), 0);
  assert.ok(juuriNousu('kavely', 0.25) > 0);
  assert.ok(juuriNousu('kanto', 0.25) > 0);
});

test('liikkeet: tuntematon silmukka heittää selkeän virheen', () => {
  assert.throws(() => nivelKulmat('joku', 0.5), /tuntematon silmukka/);
  assert.throws(() => juuriNousu('joku', 0.5), /tuntematon silmukka/);
});
