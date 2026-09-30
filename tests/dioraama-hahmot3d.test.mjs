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
// Erä 3: kaikki HENKILOT-pankin henkilöt (kolme alkuperäistä + kymmenen uutta).
const HENKILO_IDT = Object.keys(HENKILOT);
const ERA1_IDT = ['kokki-1500', 'apulainen-1500', 'vesipoika-1500'];

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

test('teeHahmo3d: kolmioita > 500 ja <= 3000 per hahmo (erän 3 henkilöt <= 2500)', () => {
  for (const id of HENKILO_IDT) {
    const n = laskeKolmiot(teeHahmo3d(id, HENKILOT[id]));
    assert.ok(n > 500, `${id}: kolmioita riittävästi (${n})`);
    assert.ok(n <= (ERA1_IDT.includes(id) ? 3000 : 2500), `${id}: kolmioita enintään budjetti (${n})`);
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

/* ==================== Erä 3: uudet päähineet, kaapu ja esineet ==================== */

/** Solmun pinnan kolmiomäärä (0 jos solmua/pintaa ei ole). */
function pintaKolmiot(hahmo, solmu, pinta) {
  const o = hahmo.solmut.find((s) => s.nimi === solmu)?.osat.find((x) => x.pinta === pinta);
  return o ? o.kolmiot.length / 3 : 0;
}

/** Kaikkien kolmioiden korkein y kasi_o-solmun paikallisessa kehyksessä. */
function korkeinY(hahmo, solmu, pinta) {
  const o = hahmo.solmut.find((s) => s.nimi === solmu)?.osat.find((x) => x.pinta === pinta);
  let max = -Infinity;
  for (let i = 1; i < o.paikat.length; i += 3) max = Math.max(max, o.paikat[i]);
  return max;
}

/** Solmun origon maailmankorkeus lepoasennossa (paikat summattuna vanhempia pitkin). */
function solmunMaailmanY(hahmo, nimi) {
  let y = 0;
  for (let s = hahmo.solmut.find((x) => x.nimi === nimi); s; s = hahmo.solmut.find((x) => x.nimi === s.vanhempi)) {
    y += s.paikka[1];
  }
  return y;
}

/** Väliaikainen henkilö: perusvaatteet + annetut lisät (pohjana vartija-1500:n mitat). */
function testiHenkilo(vaatteet, esine, varit = {}) {
  return {
    nimi: 'Testi',
    malli3d: {
      mittasuhteet: { pituus_m: 1.75, hartiat_m: 0.43, lantio_m: 0.35, paa_m: 0.236 },
      vaatteet: { paita: true, housut: true, ...vaatteet },
      varit: { vaate: '#7a3b2e', vaate2: '#5c2c22', ...varit },
      esine: esine ?? null,
    },
  };
}

test('erä 3: päähineet tuottavat kolmioita paa-solmun oikeaan pintaan', () => {
  const odotus = { kypara: 'esine-metalli', hattu: 'vaate2', huppu: 'vaate', lakki: 'vaate2' };
  const perus = laskeKolmiot(teeHahmo3d('t', testiHenkilo({ paahine: null })));
  for (const [paahine, pinta] of Object.entries(odotus)) {
    const h = teeHahmo3d('t', testiHenkilo({ paahine }));
    assert.ok(pintaKolmiot(h, 'paa', pinta) >= 30, `${paahine}: paa-solmun '${pinta}'-pinnalla kolmioita`);
    // Hiukset-pallovyöhyke korvautuu päähineellä (samalla pinta-kolmiomäärällä ei jää hiuksia).
    assert.strictEqual(pintaKolmiot(h, 'paa', 'hiukset'), 0, `${paahine}: ei hiuksia päähineen alla`);
    assert.notStrictEqual(laskeKolmiot(h), perus, `${paahine}: kolmiomäärä eroaa paljaasta päästä`);
    // Päähine on pään päällä: pinnan alin kolmio ei ole kasvojen silmälinjalla (y < headR).
    const o = h.solmut.find((s) => s.nimi === 'paa').osat.find((x) => x.pinta === pinta);
    let ylin = -Infinity;
    for (let i = 1; i < o.paikat.length; i += 3) ylin = Math.max(ylin, o.paikat[i]);
    assert.ok(ylin > 0.19, `${paahine}: ulottuu pään yläpuolelle (${ylin.toFixed(3)})`);
  }
});

test('erä 3: kattilakypärän lieri on kupua leveämpi ja hatun lieri ulottuu pään ulkopuolelle', () => {
  const leveys = (h, solmu, pinta) => {
    const o = h.solmut.find((s) => s.nimi === solmu).osat.find((x) => x.pinta === pinta);
    let max = 0;
    for (let i = 0; i < o.paikat.length; i += 3) max = Math.max(max, Math.hypot(o.paikat[i], o.paikat[i + 2]));
    return max;
  };
  const headR = 0.236 * 0.58;
  for (const paahine of ['kypara', 'hattu']) {
    const h = teeHahmo3d('t', testiHenkilo({ paahine }));
    const pinta = paahine === 'kypara' ? 'esine-metalli' : 'vaate2';
    assert.ok(leveys(h, 'paa', pinta) > headR * 1.6, `${paahine}: leveä lieri (${leveys(h, 'paa', pinta).toFixed(3)})`);
  }
});

test('erä 3: kaapu = nilkkaan ulottuva vaate-pinta lantio-solmussa + hihat, ei hametta/tunikaa', () => {
  const kaapu = teeHahmo3d('t', testiHenkilo({ kaapu: true, paahine: null }));
  const housut = teeHahmo3d('t', testiHenkilo({ paahine: null }));
  assert.ok(pintaKolmiot(kaapu, 'lantio', 'vaate') >= 50, 'kaapu: lantio-solmun vaate-pinta');
  assert.ok(pintaKolmiot(kaapu, 'kyynar_v', 'vaate') > 0, 'kaapu: vasen hiha');
  assert.ok(pintaKolmiot(kaapu, 'kyynar_o', 'vaate') > 0, 'kaapu: oikea hiha');
  assert.strictEqual(pintaKolmiot(housut, 'kyynar_v', 'vaate'), 0, 'ilman kaapua ei hihaa kyynärvarressa');
  const alin = (h) => {
    const o = h.solmut.find((s) => s.nimi === 'lantio').osat.find((x) => x.pinta === 'vaate');
    let min = Infinity;
    for (let i = 1; i < o.paikat.length; i += 3) min = Math.min(min, o.paikat[i]);
    return min;
  };
  // Kaapu ulottuu nilkkoihin asti (lantion maailmankorkeus + alin y <= n. 0,1 x pituus).
  const lantioY = solmunMaailmanY(kaapu, 'lantio');
  assert.ok(lantioY + alin(kaapu) < 0.1 * 1.75, `kaapun helma nilkkojen korkeudella (${(lantioY + alin(kaapu)).toFixed(3)})`);
  // Kaapu ei ole hame: hameen ja kaavun samalle henkilölle ei tule kahta helmaa.
  assert.strictEqual(pintaKolmiot(kaapu, 'lantio', 'vaate2') > 0, true, 'lantion vyö/lanne säilyy (vaate2)');
});

test('erä 3: jokainen uusi esine tuottaa kolmioita kasi_o-solmuun oikeisiin pintoihin', () => {
  const odotus = {
    keihas: ['esine-puu', 'esine-metalli'],
    kirja: ['esine-puu', 'esiliina'],
    airo: ['esine-puu'],
    avaimet: ['esine-metalli'],
    lyhty: ['esine-metalli', 'hiillos'],
  };
  for (const [esine, pinnat] of Object.entries(odotus)) {
    const h = teeHahmo3d('t', testiHenkilo({ paahine: null }, esine));
    for (const pinta of pinnat) {
      assert.ok(pintaKolmiot(h, 'kasi_o', pinta) >= 12, `${esine}: kasi_o/'${pinta}' (${pintaKolmiot(h, 'kasi_o', pinta)})`);
    }
    // Esine on oikeassa kädessä: vasemman käden solmussa ei esinepintoja.
    for (const pinta of ['esine-puu', 'esine-metalli', 'hiillos']) {
      assert.strictEqual(pintaKolmiot(h, 'kasi_v', pinta), 0, `${esine}: vasen käsi ei pitele mitään ('${pinta}')`);
    }
    assert.ok(laskeKolmiot(h) <= 2500, `${esine}: alle 2500 kolmiota (${laskeKolmiot(h)})`);
  }
});

test('erä 3: keihään kärki yli 2 m korkeudella seisovalla hahmolla, varsi maasta asti, airo pystyssä', () => {
  const h = teeHahmo3d('t', testiHenkilo({ paahine: null }, 'keihas'));
  const kasiY = solmunMaailmanY(h, 'kasi_o');
  const karki = kasiY + korkeinY(h, 'kasi_o', 'esine-metalli');
  assert.ok(karki > 2.0, `keihään kärki > 2 m (${karki.toFixed(3)})`);
  const varsiYla = kasiY + korkeinY(h, 'kasi_o', 'esine-puu');
  assert.ok(varsiYla > 2.0 && varsiYla < karki, `varsi päättyy kärjen alle (${varsiYla.toFixed(3)})`);
  const o = h.solmut.find((s) => s.nimi === 'kasi_o').osat.find((x) => x.pinta === 'esine-puu');
  let alin = Infinity;
  for (let i = 1; i < o.paikat.length; i += 3) alin = Math.min(alin, o.paikat[i]);
  assert.ok(kasiY + alin >= 0 && kasiY + alin < 0.06, `varren alapää heti maan yläpuolella (${(kasiY + alin).toFixed(3)})`);
  const airo = teeHahmo3d('t', testiHenkilo({ paahine: null }, 'airo'));
  const airoYla = solmunMaailmanY(airo, 'kasi_o') + korkeinY(airo, 'kasi_o', 'esine-puu');
  assert.ok(airoYla > 1.7 && airoYla < 2.3, `airo ulottuu pään yläpuolelle (${airoYla.toFixed(3)})`);
});

test('erä 3: deterministisyys - uudet päähineet/kaapu/esineet tuottavat samat tavut kahdesti', () => {
  const yhdistelmat = [];
  for (const paahine of ['kypara', 'hattu', 'huppu', 'lakki']) yhdistelmat.push(testiHenkilo({ paahine }));
  yhdistelmat.push(testiHenkilo({ kaapu: true, paahine: 'lakki' }));
  for (const esine of ['keihas', 'kirja', 'airo', 'avaimet', 'lyhty']) yhdistelmat.push(testiHenkilo({ paahine: null }, esine));
  for (const henkilo of yhdistelmat) {
    const a = kirjoitaMonisolmuGlb({ nimi: 't', solmut: teeHahmo3d('t', henkilo).solmut });
    const b = kirjoitaMonisolmuGlb({ nimi: 't', solmut: teeHahmo3d('t', henkilo).solmut });
    assert.ok(a.equals(b), 'sama syöte -> samat tavut');
  }
});

test('erä 3: kaikki HENKILOT-henkilöt rakentuvat virheettä, 16 niveltä, <= 2500 kolmiota, kaikilla pinnoilla väri', () => {
  assert.ok(HENKILO_IDT.length >= 13, `HENKILOT sisältää 13 henkilöä (${HENKILO_IDT.length})`);
  for (const id of HENKILO_IDT) {
    const h = teeHahmo3d(id, HENKILOT[id]);
    assert.strictEqual(h.solmut.length, 16, `${id}: 16 niveltä`);
    const n = laskeKolmiot(h);
    assert.ok(n <= 2500, `${id}: ${n} kolmiota <= 2500`);
    for (const s of h.solmut) {
      for (const o of s.osat) assert.match(o.vari, /^#[0-9a-f]{6}$/i, `${id}/${s.nimi}/${o.pinta}: väri`);
    }
    const mitatt = HENKILOT[id].malli3d.mittasuhteet;
    assert.strictEqual(mitatt.pituus_m, HENKILOT[id].korkeus_m, `${id}: pituus_m == korkeus_m`);
    if (!ERA1_IDT.includes(id)) assert.strictEqual(HENKILOT[id].maalattu, undefined, `${id}: ei maalattu-kenttää (erän 3 henkilöt)`);
  }
});
