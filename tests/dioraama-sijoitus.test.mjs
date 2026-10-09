/*
 * Tilakohtaisen sijoituksen (tools/dioraama/sijoitus.mjs) testit + rakenna.mjs:n rakennaData sijoitettuna.
 * Speksi docs/raportit/dioraama-rajapinnat-blender-20260929.md kohta 2.
 * Konventio: suunta 90 kääntää +x (itä) → +z (etelä), −z (pohjoinen) → +x (itä); suunnat (palikka, hahmo, atsimuutti) += suunta.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { sijoitaTila } from '../tools/dioraama/sijoitus.mjs';
import { sijoita } from '../tools/dioraama/reseptit.mjs';
import { rakennaData } from '../tools/dioraama/rakenna.mjs';
import { lueGlb } from '../tools/dioraama/glb.mjs';

const lahella = (a, b, msg) => {
  assert.equal(a.length, b.length, msg);
  a.forEach((x, i) => assert.ok(Math.abs(x - b[i]) < 1e-5, `${msg ?? ''} [${i}] ${x} ≠ ${b[i]}`));
};

function tila() {
  return {
    id: 'koe',
    nimi: 'Koe',
    kohdistettava: true,
    rajat: { min: [-3, -0.5, -2], max: [3, 3, 2] },
    kamera: { kohde: [1, 0, 0], atsimuutti: 172, korkeus: 20, etaisyys: 15, fov: 35, aukko: 0.5 },
    kameraPysty: { kohde: [0, 0, 1], atsimuutti: 10, korkeus: 20, etaisyys: 25, fov: 35, aukko: 0.5 },
    pulu: { laskeutuminen: [2, 0.5, 0], taulupuoli: 'oikea' },
    taulu: { otsikko: 'Koe', tila: 'luonnos', kohdat: [{ teksti: 'a', lahde: 't' }, { teksti: 'b', lahde: 't' }, { teksti: 'c', lahde: 't' }] },
    valot: [{ paikka: [0, 1.5, 0], sade: 4, voima: 1 }, { tyyppi: 'keila', paikka: [2, 2, 0], kohti: [0, 0, 1], kulma: 30, sade: 5, voima: 10 }],
    liekit: [{ liekki: 'tulisija', paikka: [1, 0.9, -1], koko: 1, vaihe: 0 }],
    palikat: [
      { resepti: 'laatta', paikka: [0, 0, 0], suunta: 0, leveys: 6, syvyys: 4, paksuus: 0.3 },
      { resepti: 'seina', paikka: [0, 0, -2], suunta: 30, pituus: 6, korkeus: 3, paksuus: 0.3 },
    ],
    hahmot: [{
      id: 'h', henkilo: 'x', paikka: [1, 0, 1], suunta: 180, silmukka: 'idle',
      reitti: { pisteet: [[1, 0, 1], [2, 0, 1], [1, 0, 1]], nopeus: 1, tauko: 1 },
    }],
    aanet: [],
    kasikirjoitus: [],
  };
}
const S = (extra) => ({ ankkuri: [0, 0, 0], paikka: [0, 0, 0], suunta: 0, ...extra });

test('identiteetti: ilman sijoitus-kenttää tila palautuu sellaisenaan', () => {
  const t = tila();
  assert.equal(sijoitaTila(t), t);
});

test('identiteettisijoitus ei muuta dataa, eikä alkuperäistä muuteta; sijoitus-kenttä poistuu', () => {
  const t = { ...tila(), sijoitus: S() };
  const kopio = JSON.stringify(t);
  const u = sijoitaTila(t);
  assert.equal(JSON.stringify(t), kopio, 'alkuperäinen muuttui');
  assert.equal('sijoitus' in u, false);
  const { sijoitus, ...ilman } = t;
  assert.deepEqual(u, ilman);
});

test('pelkkä siirto: kaikki pistekentät siirtyvät (paikka − ankkuri + paikka), suunnat pysyvät', () => {
  const u = sijoitaTila({ ...tila(), sijoitus: S({ ankkuri: [1, 0, 0], paikka: [101, 5, -50] }) });
  const d = [100, 5, -50];
  const plus = (p) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  lahella(u.palikat[0].paikka, plus([0, 0, 0]));
  assert.equal(u.palikat[1].suunta, 30);
  lahella(u.rajat.min, plus([-3, -0.5, -2]));
  lahella(u.rajat.max, plus([3, 3, 2]));
  lahella(u.kamera.kohde, plus([1, 0, 0]));
  assert.equal(u.kamera.atsimuutti, 172);
  lahella(u.kameraPysty.kohde, plus([0, 0, 1]));
  lahella(u.pulu.laskeutuminen, plus([2, 0.5, 0]));
  lahella(u.valot[0].paikka, plus([0, 1.5, 0]));
  lahella(u.valot[1].kohti, plus([0, 0, 1]));
  lahella(u.liekit[0].paikka, plus([1, 0.9, -1]));
  lahella(u.hahmot[0].paikka, plus([1, 0, 1]));
  lahella(u.hahmot[0].reitti.pisteet[1], plus([2, 0, 1]));
  assert.equal(u.hahmot[0].reitti.nopeus, 1);
});

test('kierto 90°: +x → +z, piste, kameran atsimuutti, palikan ja hahmon suunta', () => {
  const u = sijoitaTila({ ...tila(), sijoitus: S({ suunta: 90 }) });
  lahella(u.kamera.kohde, [0, 0, 1]); // (1,0,0) → (0,0,1)
  assert.equal(u.kamera.atsimuutti, 262);
  lahella(u.kameraPysty.kohde, [-1, 0, 0]); // (0,0,1) → (−1,0,0)
  assert.equal(u.kameraPysty.atsimuutti, 100);
  lahella(u.pulu.laskeutuminen, [0, 0.5, 2]);
  assert.equal(u.palikat[1].suunta, 120);
  assert.equal(u.hahmot[0].suunta, 270);
  lahella(u.hahmot[0].reitti.pisteet[1], [-1, 0, 2]); // (2,0,1) → (−1,0,2)
  lahella(u.valot[1].kohti, [-1, 0, 0]);
  // pohjoinen (−z) → itä (+x)
  const p = sijoitaTila({ ...tila(), palikat: [{ resepti: 'laatta', paikka: [0, 0, -1], suunta: 0, leveys: 1, syvyys: 1, paksuus: 0.1 }], sijoitus: S({ suunta: 90 }) });
  lahella(p.palikat[0].paikka, [1, 0, 0]);
});

test('kierretyn palikan geometria = alkuperäisen palikan geometria kierrettynä (sijoita() yhteensopiva)', () => {
  const a = { resepti: 'seina', paikka: [1, 0, -2], suunta: 30, pituus: 6, korkeus: 3, paksuus: 0.3 };
  const u = sijoitaTila({ ...tila(), palikat: [a], sijoitus: S({ suunta: 90 }) });
  const k0 = sijoita(a), k1 = sijoita(u.palikat[0]);
  assert.equal(k0.length, k1.length);
  for (let i = 0; i < k0.length; i += 7) {
    for (let j = 0; j < 3; j++) {
      const [x, y, z] = k0[i].p[j];
      lahella(k1[i].p[j], [-z, y, x], 'kärki');
    }
  }
});

test('rajat säilyvät min < max kierrossa (myös 30° ja 200°) ja AABB kasvaa oikein', () => {
  for (const suunta of [90, 180, 270, 30, 200]) {
    const u = sijoitaTila({ ...tila(), sijoitus: S({ suunta }) });
    for (let i = 0; i < 3; i++) assert.ok(u.rajat.min[i] < u.rajat.max[i], `suunta ${suunta}, akseli ${i}`);
    assert.equal(u.rajat.min[1], -0.5);
    assert.equal(u.rajat.max[1], 3);
  }
  const u = sijoitaTila({ ...tila(), sijoitus: S({ suunta: 90 }) });
  lahella(u.rajat.min, [-2, -0.5, -3]);
  lahella(u.rajat.max, [2, 3, 3]);
});

test('hahmon reitti kiertyy ja siirtyy yhdessä (ankkuri → paikka)', () => {
  const u = sijoitaTila({ ...tila(), sijoitus: S({ ankkuri: [1, 0, 1], paikka: [10, 0, 10], suunta: 180 }) });
  lahella(u.hahmot[0].paikka, [10, 0, 10]);
  lahella(u.hahmot[0].reitti.pisteet[1], [9, 0, 10]);
  assert.equal(u.hahmot[0].suunta, 0);
});

test('rakennaData: sijoitettu tila tuottaa glb:n, jonka kärjet ovat siirtyneet; rakennus.json saa muunnetut arvot', async () => {
  const perus = tila();
  delete perus.hahmot; delete perus.liekit; perus.hahmot = [];
  const rakennus = (t) => ({
    id: 'sijoitus-testi', nimi: 'T', otsikko: 'T', versio: 1,
    lahteet: [{ nimi: 't', osoite: 'https://example.test/' }],
    geoAnkkuri: { lat: 0, lon: 0, suuntima: 0 }, aikakerros: { id: 't', nimi: 'T' },
    yleiskamera: { vaaka: perus.kamera, pysty: perus.kameraPysty },
    pulu: { laskeutuminen: [0, 0, 0] }, taulu: perus.taulu, tilat: [t],
  });
  const ulos = mkdtempSync(join(tmpdir(), 'dioraama-sijoitus-test-'));
  try {
    const laatikko = async (t, alikansio) => {
      const tulos = await rakennaData(rakennus(t), { ulos: join(ulos, alikansio), saateita: 16 });
      const glb = lueGlb(readFileSync(join(tulos.kansio, 'tilat', `${t.id}.glb`)));
      const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
      for (const o of glb.osat) for (let i = 0; i < o.paikat.length; i += 3) {
        for (let j = 0; j < 3; j++) { min[j] = Math.min(min[j], o.paikat[i + j]); max[j] = Math.max(max[j], o.paikat[i + j]); }
      }
      return { min, max, json: JSON.parse(readFileSync(join(tulos.kansio, 'rakennus.json'), 'utf8')) };
    };
    const a = await laatikko(perus, 'a');
    const b = await laatikko({ ...perus, sijoitus: S({ paikka: [100, 5, -50], suunta: 90 }) }, 'b');
    // x' = −z + 100, y' = y + 5, z' = x − 50
    lahella(b.min, [-a.max[2] + 100, a.min[1] + 5, a.min[0] - 50]);
    lahella(b.max, [-a.min[2] + 100, a.max[1] + 5, a.max[0] - 50]);
    const jt = b.json.tilat[0];
    assert.equal('sijoitus' in jt, false);
    lahella(jt.pulu.laskeutuminen, [100, 5.5, -48]);
    assert.equal(jt.kamera.atsimuutti, 262);
    assert.ok(jt.rajat.min[0] < jt.rajat.max[0]);
  } finally {
    rmSync(ulos, { recursive: true, force: true });
  }
});

test('elävä kohde ja elävä reitti kiertyvät ja siirtyvät kuten hahmot; muut elava-kentät säilyvät', () => {
  const elava = { kohde: [2, 1, 1], sade: 6, vihje: true, reitti: { henkilo: 'x', pisteet: [[1, 0, 1], [2, 0, 1]], nopeus: 0.8, edestakaisin: true, lyhty: true } };
  const u = sijoitaTila({ ...tila(), elava, sijoitus: S({ ankkuri: [1, 0, 1], paikka: [10, 2, 10], suunta: 180 }) });
  lahella(u.elava.kohde, [9, 3, 10]);
  lahella(u.elava.reitti.pisteet[0], [10, 2, 10]);
  lahella(u.elava.reitti.pisteet[1], [9, 2, 10]);
  assert.equal(u.elava.sade, 6);
  assert.equal(u.elava.vihje, true);
  assert.equal(u.elava.reitti.edestakaisin, true);
  assert.deepEqual(elava.kohde, [2, 1, 1], 'alkuperäistä ei muuteta');
});

test('taulun kohtien napautuskohde (kohtaukset v2) siirtyy kuten hahmo; kohdat ilman kohdetta ja muut kentät säilyvät', () => {
  const taulu = { otsikko: 'x', kohdat: [{ teksti: 'a', aani: 'a-1', kohde: { paikka: [2, 1, 1], sade: 0.6 } }, { teksti: 'b', aani: 'b-1' }] };
  const hahmot = [{ id: 'h', paikka: [2, 1, 1] }];
  const u = sijoitaTila({ ...tila(), taulu, hahmot, sijoitus: S({ ankkuri: [1, 0, 1], paikka: [10, 2, 10], suunta: 180 }) });
  lahella(u.taulu.kohdat[0].kohde.paikka, u.hahmot[0].paikka);
  lahella(u.taulu.kohdat[0].kohde.paikka, [9, 3, 10]);
  assert.equal(u.taulu.kohdat[0].kohde.sade, 0.6);
  assert.equal(u.taulu.kohdat[0].aani, 'a-1');
  assert.equal('kohde' in u.taulu.kohdat[1], false);
  assert.deepEqual(taulu.kohdat[0].kohde.paikka, [2, 1, 1], 'alkuperäistä ei muuteta');
});

test('hahmon kädet (kadet[]): tartu-paikka ja kämmenen kierto sijoittuvat kuten hahmo; kanna ei muutu', () => {
  const kierra = ([x, y, z, w], v) => {   // kvaternio · vektori
    const t = [2 * (y * v[2] - z * v[1]), 2 * (z * v[0] - x * v[2]), 2 * (x * v[1] - y * v[0])];
    return [v[0] + w * t[0] + (y * t[2] - z * t[1]), v[1] + w * t[1] + (z * t[0] - x * t[2]), v[2] + w * t[2] + (x * t[1] - y * t[0])];
  };
  const q0 = [0.2, 0.3, -0.1, Math.sqrt(1 - 0.04 - 0.09 - 0.01)];
  const t0 = tila();
  t0.hahmot[0].kadet = [
    { tyyppi: 'tartu', kasi: 'r', paikka: [1, 1, 0], kierto: q0, milloin: 'tyo' },
    { kasi: 'l', paikka: [0, 1, 1] },
    { tyyppi: 'kanna', kasi: 'r', esine: 'kirja', siirto: [0.1, 0, 0], kierto: [0, 0, 0, 1] },
  ];
  const sij = { ankkuri: [0, 0, 0], paikka: [10, 0.2, -5], suunta: 90 };
  const t = sijoitaTila({ ...t0, sijoitus: sij });
  const [r, l, kanna] = t.hahmot[0].kadet;
  lahella(r.paikka, [10, 1.2, -4], 'tartu r: +x → +z');
  lahella(l.paikka, [9, 1.2, -5], 'tartu l (oletustyyppi): +z → −x');
  assert.deepEqual(kanna, t0.hahmot[0].kadet[2], 'kanna ennallaan');
  for (const v of [[0, 0, 1], [0, -1, 0], [1, 0, 0]]) {   // sormet, kämmen ja sivu kiertyvät kuten pisteet (ilman siirtoa)
    const a = kierra(q0, v); const odotus = [-a[2], a[1], a[0]];   // suunta 90: (x, z) → (−z, x)
    lahella(kierra(r.kierto, v), odotus, `kierto ${v}`);
  }
});
