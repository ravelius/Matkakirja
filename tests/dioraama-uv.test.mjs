/*
 * UV-testit dioraaman erä 2 -laajennukselle (Linnanrakentaja, erä 2 ali-agentti "Poikkileikkaus-
 * linssi / dioraamamoottori"). Speksi: docs/raportit/dioraama-rajapinnat-era2-20260929.md kohta 2
 * "UV": toisto_m number | [tu, tv]; resepti voi antaa kärjelle uv_m = [a, b] (metreinä), joka
 * ohittaa rakennuskoneen tasoprojektion; torni (ulko/sisä/vyo) ja kartiokatto laskevat uv_m:n
 * kulmasta ja korkeudesta/viistomatkasta; saumakärjet (esim. tornin 0°/360°) eivät saa hitsautua.
 *
 * Testataan rakenna.mjs:n laskeUv/hitsausavain SUORAAN (nyt vietyinä) ja reseptit-rakenne.mjs:n
 * torni() + reseptit-maasto.mjs:n kartiokatto() PAIKALLISESSA kehyksessä (ei sijoita():n kautta),
 * sekä lopuksi KOKO PUTKI (sijoita → tihenna → rakenna → glb) rakentamalla oikea Olavinlinna ja
 * lukemalla tornin glb:n TEXCOORD_0 takaisin — uv_m kulkee nyt reseptit.mjs:n sijoita():n ja
 * reseptit-apu.mjs:n kaanna():n läpi sellaisenaan (kaarenpituus/korkeus eivät muutu jäykässä
 * siirrossa/kierrossa) ja rakenna.mjs:n tihenna() interpoloi sen lineaarisesti puolituksessa.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { laskeUv, hitsausavain, rakennaData } from '../tools/dioraama/rakenna.mjs';
import { torni } from '../tools/dioraama/reseptit-rakenne.mjs';
import { kartiokatto } from '../tools/dioraama/reseptit-maasto.mjs';
import { lueGlb } from '../tools/dioraama/glb.mjs';
import { RAKENNUS as OLAVINLINNA } from '../js/dioraama/rakennukset/olavinlinna.js';
import { PINNAT } from '../js/dioraama/pankit/pinnat.js';

const TAU = 2 * Math.PI;

/** Pienin kulmaetäisyys a:n ja b:n välillä ympyrällä, jonka kehä on tau (esim. 2π). */
function kulmaetaisyys(a, b, tau) {
  const d = Math.abs(a - b) % tau;
  return Math.min(d, tau - d);
}

/* ==================== laskeUv: toisto_m number vs [tu, tv] ==================== */

test('laskeUv: toisto_m numerona jakaa molemmat projisoidut akselit samalla luvulla', () => {
  // |nz| suurin -> projektio (x, y).
  const uv = laskeUv([3, 5, 7], [0, 0, 1], 2);
  assert.deepEqual(uv, [1.5, 2.5]);
});

test('laskeUv: toisto_m [tu, tv]-taulukkona jakaa akselit erikseen', () => {
  const uv = laskeUv([3, 5, 7], [0, 0, 1], [4, 1]);
  assert.deepEqual(uv, [3 / 4, 5 / 1]);
});

test('laskeUv: projektio valitsee oikean akseliparin kaikilla kolmella pääakselilla', () => {
  // |nx| suurin -> (z, y); |ny| suurin -> (x, z); |nz| suurin -> (x, y).
  assert.deepEqual(laskeUv([2, 3, 5], [1, 0, 0], [10, 10]), [5 / 10, 3 / 10]);
  assert.deepEqual(laskeUv([2, 3, 5], [0, 1, 0], [10, 10]), [2 / 10, 5 / 10]);
  assert.deepEqual(laskeUv([2, 3, 5], [0, 0, 1], [10, 10]), [2 / 10, 3 / 10]);
});

/* ==================== laskeUv: uv_m ohittaa projektion ==================== */

test('laskeUv: uv_m ohittaa tasoprojektion kokonaan (p ja n irrelevantteja)', () => {
  const uv = laskeUv([100, 200, 300], [1, 0, 0], 2, [10, 20]);
  assert.deepEqual(uv, [5, 10]);
});

test('laskeUv: uv_m + toisto_m [tu, tv] jakaa a:n ja b:n eri luvuilla', () => {
  const uv = laskeUv([0, 0, 0], [0, 1, 0], [4, 1], [8, 3]);
  assert.deepEqual(uv, [2, 3]);
});

/* ==================== hitsausavain: uv-tietoisuus ==================== */

test('hitsausavain: sama paikka/normaali, ei uv:tä -> sama avain (nykyinen käytös säilyy)', () => {
  const a = hitsausavain([1, 2, 3], [0, 1, 0]);
  const b = hitsausavain([1, 2, 3], [0, 1, 0]);
  assert.equal(a, b);
});

test('hitsausavain: sama paikka/normaali, ERI uv -> ERI avain (sauma ei hitsaudu)', () => {
  const a = hitsausavain([1, 2, 3], [0, 1, 0], [0, 5]);
  const b = hitsausavain([1, 2, 3], [0, 1, 0], [31.4, 5]);
  assert.notEqual(a, b);
});

test('hitsausavain: sama paikka/normaali, SAMA uv -> sama avain (tavallinen sisäreuna hitsautuu)', () => {
  const a = hitsausavain([1, 2, 3], [0, 1, 0], [3.5, 5]);
  const b = hitsausavain([1, 2, 3], [0, 1, 0], [3.5, 5]);
  assert.equal(a, b);
});

/* ==================== torni: uv_m-kaava (a = kulma_rad · säde, b = y) ==================== */

test('torni: ulko/sisä-kärkien uv_m täsmää kaavaan a = kulma_rad·säde, b = y', () => {
  const sade = 5, korkeus = 10, paksuus = 1, segmentit = 16;
  const sisa = sade - paksuus;
  const t = torni({ sade, korkeus, paksuus, segmentit, auki: null });
  for (const rooli of ['ulko', 'sisa']) {
    const r = rooli === 'ulko' ? sade : sisa;
    // rooli === 'ulko' kattaa myös yläreunan LITTEÄN renkaan (ei uv_m:ää, ks. omat testinsä) —
    // k.uv_m rajaa tässä vain apu.vaippa():sta tulevat pystysivut, joille kaava on tarkoitettu.
    const kolmiot = t.filter((k) => k.rooli === rooli && k.uv_m);
    assert.ok(kolmiot.length > 0, `${rooli}: ei uv_m-kolmioita`);
    for (const k of kolmiot) {
      for (let i = 0; i < 3; i++) {
        const [u, y, w] = k.p[i];
        const [a, b] = k.uv_m[i];
        assert.ok(Math.abs(b - y) < 1e-9, `${rooli}: b (${b}) != y (${y})`);
        const kulmaOdotettu = Math.atan2(u, w);
        assert.ok(
          kulmaetaisyys(a / r, kulmaOdotettu, TAU) < 1e-6,
          `${rooli}: a/r (${a / r}) ei täsmää atan2(u,w):hen (${kulmaOdotettu})`,
        );
      }
    }
  }
});

test('torni: vyo-kärkien uv_m käyttää vyön OMAA sädettä (sade + 0,05)', () => {
  const sade = 5, paksuus = 1, vyo = { y: 4, korkeus: 1 };
  const t = torni({ sade, korkeus: 10, paksuus, segmentit: 16, auki: null, vyo });
  const vyoKolmiot = t.filter((k) => k.rooli === 'vyo');
  assert.ok(vyoKolmiot.length > 0);
  for (const k of vyoKolmiot) {
    assert.ok(k.uv_m, 'vyo: kolmiolta puuttuu uv_m');
    for (let i = 0; i < 3; i++) {
      const [u, y, w] = k.p[i];
      const [a, b] = k.uv_m[i];
      assert.ok(Math.abs(b - y) < 1e-9);
      const kulmaOdotettu = Math.atan2(u, w);
      assert.ok(kulmaetaisyys(a / (sade + 0.05), kulmaOdotettu, TAU) < 1e-6);
    }
  }
});

test('torni: yläreunan rengas ja leikkauspinnat EIVÄT saa uv_m:ää (jäävät tasoprojektioon)', () => {
  const t = torni({
    sade: 5, korkeus: 10, paksuus: 1, segmentit: 16, suunta: 0, auki: { alku: 150, loppu: 210 },
  });
  const leikkaus = t.filter((k) => k.rooli === 'leikkaus');
  assert.ok(leikkaus.length > 0, 'auki-tornilla pitäisi olla leikkauspintoja');
  for (const k of leikkaus) assert.equal(k.uv_m, undefined);

  const umpi = torni({ sade: 5, korkeus: 10, paksuus: 1, segmentit: 16, auki: null });
  // Yläreunan rengas: KAIKKI kolme kärkeä y = korkeus:ssa (erottaa vaipan pystysivuista, joilla
  // vain puolet kärjistä on ylhäällä).
  const ylareuna = umpi.filter((k) => k.rooli === 'ulko' && k.p.every((p) => Math.abs(p[1] - 10) < 1e-9));
  assert.ok(ylareuna.length > 0, 'umpinaisella tornilla yläreunan rengas on rooliin ulko');
  for (const k of ylareuna) assert.equal(k.uv_m, undefined);
});

/* ==================== torni: sauma ei hitsaudu + UV jatkuu ympäri ==================== */

test('torni: sauma (0°/360°) ei hitsaudu hitsausavaimessa, vaikka paikka/normaali täsmäävät', () => {
  const sade = 5, korkeus = 10, paksuus = 1, segmentit = 16;
  const t = torni({ sade, korkeus, paksuus, segmentit, auki: null });
  const ulko = t.filter((k) => k.rooli === 'ulko' && k.uv_m); // pois yläreunan litteä rengas
  let alku = null, loppu = null;
  for (const k of ulko) {
    for (let i = 0; i < 3; i++) {
      const [a, b] = k.uv_m[i];
      if (Math.abs(b) > 1e-9) continue; // vain y = 0 -taso, helpompi verrata
      if (Math.abs(a) < 1e-6) alku = { p: k.p[i], n: k.n[i], uv: k.uv_m[i] };
      if (Math.abs(a - TAU * sade) < 1e-6) loppu = { p: k.p[i], n: k.n[i], uv: k.uv_m[i] };
    }
  }
  assert.ok(alku && loppu, 'sauman molemmat reunakärjet (a=0 ja a=2π·sade) pitäisi löytyä y=0-tasolta');
  // Sama fyysinen maailmanpiste (kulma 0 == kulma 360, samalla säteellä ja y:llä).
  assert.ok(
    Math.abs(alku.p[0] - loppu.p[0]) < 1e-9 && Math.abs(alku.p[2] - loppu.p[2]) < 1e-9,
    'sauman kärkien pitäisi olla samassa maailmanpisteessä',
  );
  // rakenna.mjs:n hitsausavain: sama paikka+normaali, mutta uv eroaa -> ERI avain (ei hitsausta).
  const avainAlku = hitsausavain(alku.p, alku.n, alku.uv);
  const avainLoppu = hitsausavain(loppu.p, loppu.n, loppu.uv);
  assert.notEqual(avainAlku, avainLoppu, 'sauman kärjet eivät saa hitsautua (uv eroaa)');
});

test('torni: UV jatkuu tornin ympäri ehjänä (a kasvaa kulman mukana, koko kierros katettu)', () => {
  const sade = 5, korkeus = 10, paksuus = 1, segmentit = 16;
  const t = torni({ sade, korkeus, paksuus, segmentit, auki: null });
  const ulko = t.filter((k) => k.rooli === 'ulko' && k.uv_m); // pois yläreunan litteä rengas
  const aArvot = [];
  for (const k of ulko) {
    for (let i = 0; i < 3; i++) {
      if (Math.abs(k.uv_m[i][1]) < 1e-9) aArvot.push(k.uv_m[i][0]); // b = 0 -taso (alareuna)
    }
  }
  const uniikit = [...new Set(aArvot.map((a) => Math.round(a * 1e6) / 1e6))].sort((x, y) => x - y);
  assert.equal(uniikit.length, segmentit + 1, `odotettiin ${segmentit + 1} eri kulmaa, saatiin ${uniikit.length}`);
  assert.ok(Math.abs(uniikit[0]) < 1e-6, 'ensimmäisen a:n pitäisi olla 0');
  assert.ok(
    Math.abs(uniikit[uniikit.length - 1] - TAU * sade) < 1e-6,
    'viimeisen a:n pitäisi olla 2π·sade (ei kiertynyt takaisin nollaan)',
  );
  for (let i = 1; i < uniikit.length; i++) {
    assert.ok(uniikit[i] > uniikit[i - 1], `a:n pitää kasvaa monotonisesti (${uniikit[i - 1]} -> ${uniikit[i]})`);
  }
});

/* ==================== kartiokatto: uv_m-kaava (a = kulma_rad · pohjasäde, b = viistomatka) ==================== */

test('kartiokatto: pintakolmioiden uv_m täsmää kaavaan a = kulma_rad·R, b = viistomatka pohjasta', () => {
  const sade = 7.5, korkeus = 9, ylitys = 0.6, segmentit = 32;
  const R = sade + ylitys;
  const viistoPituus = Math.hypot(korkeus, R);
  const t = kartiokatto({ sade, korkeus, ylitys, segmentit });
  const pinta = t.filter((k) => k.uv_m); // vain päävaippa — räystään alapinnalla ei uv_m:ää
  assert.ok(pinta.length > 0);
  for (const k of pinta) {
    // Kärki 0 = huippu, kärjet 1 ja 2 = kantapisteet (ks. kartiokatto()).
    const [aH, bH] = k.uv_m[0];
    assert.ok(Math.abs(bH - viistoPituus) < 1e-9, `huipun b (${bH}) != viistoPituus (${viistoPituus})`);
    for (const i of [1, 2]) {
      const [u, y, w] = k.p[i];
      const [a, b] = k.uv_m[i];
      assert.ok(Math.abs(y) < 1e-9, 'kantapisteen y pitäisi olla 0');
      assert.ok(Math.abs(b) < 1e-9, `kantapisteen b (${b}) pitäisi olla 0`);
      const kulmaOdotettu = Math.atan2(u, w);
      assert.ok(kulmaetaisyys(a / R, kulmaOdotettu, TAU) < 1e-6, `kantapiste: a/R ei täsmää atan2(u,w):hen`);
    }
    // Huipun a on kannan kahden a:n välissä (kMid) — verrataan kulmaetäisyytenä, ei suoraan
    // keskiarvona, koska sauman kohdalla kanta-arvot voivat olla esim. lähellä 0 ja lähellä 2π·R.
    const kMidOdotettu = (k.uv_m[1][0] / R + k.uv_m[2][0] / R) / 2;
    assert.ok(kulmaetaisyys(aH / R, kMidOdotettu, TAU) < 1e-6, 'huipun kulma ei ole kanta-kulmien keskellä');
  }
});

test('kartiokatto: räystään alapinta (rengas) EI saa uv_m:ää', () => {
  const t = kartiokatto({ sade: 7.5, korkeus: 9, ylitys: 0.6, segmentit: 32 });
  const alapinta = t.filter((k) => k.p.every((p) => Math.abs(p[1]) < 1e-9));
  assert.ok(alapinta.length > 0, 'räystään alapintaa pitäisi löytyä');
  for (const k of alapinta) assert.equal(k.uv_m, undefined);
});

/* ==================== Deterministisyys ==================== */

test('torni ja kartiokatto: uv_m on deterministinen (sama syöte = sama tulos)', () => {
  const p1 = {
    sade: 5, korkeus: 10, paksuus: 1, segmentit: 16, auki: null, vyo: { y: 4, korkeus: 1 },
  };
  assert.deepEqual(torni({ ...p1 }).map((k) => k.uv_m), torni({ ...p1 }).map((k) => k.uv_m));

  const p2 = { sade: 7.5, korkeus: 9, ylitys: 0.6, segmentit: 32 };
  assert.deepEqual(
    kartiokatto({ ...p2 }).filter((k) => k.uv_m).map((k) => k.uv_m),
    kartiokatto({ ...p2 }).filter((k) => k.uv_m).map((k) => k.uv_m),
  );
});

/* ==================== Koko putki: sijoita → tihenna → rakenna → glb (Olavinlinna) ==================== */

// Pyhän Eerikin torni (js/dioraama/rakennukset/olavinlinna/massa.js, erä 3: ainoa umpinainen torni,
// Kello- ja Kirkkotorni ovat auki): paikka [32, 0, -4], sade 7.5, korkeus 28. Ulkovaippa on pinnassa 'kivi' (OLETUSPINNAT.torni.ulko), samassa
// glb-ryhmässä tavallisten seinien 'etu'-pintojen kanssa — kärjet rajataan sylinteripinnalle
// (r ≈ sade) ja pois huipulta (y < korkeus), jotta mukaan ei tule seinien tasoprojisoituja
// kärkiä eikä tornin litteää yläreunan rengasta (ei uv_m:ää, ks. yllä).
const TORNI = { cx: 32, cz: -4, sade: 7.5, korkeus: 28, pinta: 'kivi' };

function rakennaMassaTmp(saateita) {
  const tmp = mkdtempSync(join(tmpdir(), 'dioraama-uv-'));
  return rakennaData(OLAVINLINNA, { ulos: tmp, saateita }).then((tulos) => {
    const massa = tulos.tilat.find((t) => t.id === 'massa');
    const glb = lueGlb(readFileSync(join(tmp, OLAVINLINNA.id, 'tilat', 'massa.glb')));
    return { tmp, sha256: massa.sha256, glb };
  });
}

function tornikarjet(glb) {
  const kivi = glb.osat.find((o) => o.pinta === TORNI.pinta);
  assert.ok(kivi, `pinta '${TORNI.pinta}' puuttuu massa.glb:stä`);
  const tulos = [];
  const karkia = kivi.paikat.length / 3;
  for (let i = 0; i < karkia; i++) {
    const x = kivi.paikat[i * 3]; const y = kivi.paikat[i * 3 + 1]; const z = kivi.paikat[i * 3 + 2];
    const dx = x - TORNI.cx; const dz = z - TORNI.cz;
    const r = Math.hypot(dx, dz);
    if (Math.abs(r - TORNI.sade) >= 0.01 || y <= 0.01 || y >= TORNI.korkeus - 0.01) continue;
    // Pinta 'kivi' on myös tavallisten seinien 'etu'-pinta, ja Länsitornin lähellä kulkee seinä
    // (itämuuri x = 32) jonka litteä pinta ylittää sattumalta sädeympyrän r ≈ sade kahdessa
    // kohdassa — SUODATA pois normaalin avulla: aidon tornin vaipan normaali osoittaa säteittäin
    // ulos keskipisteestä (dot ≈ 1), litteän seinän normaali on kiinteä eikä osu yhteen.
    const nx = kivi.normaalit[i * 3]; const nz = kivi.normaalit[i * 3 + 2];
    const sateittainenDot = (nx * dx + nz * dz) / r;
    if (sateittainenDot < 0.99) continue;
    // HUOM merkki: sijoita() (reseptit.mjs) kuvaa paikallisen (u, w):n maailmaan suunnalla s=0
    // r=(1,0,0), f=(0,0,−1) -> world_z = paikka_z − local_w, joten local_w = −dz (EI +dz).
    // torni() laskee kulman paikallisesta (u, w):stä (kaaripiste: u=r·sin k, w=r·cos k), joten
    // maailman kulma tästä samasta kärjestä on atan2(local_u, local_w) = atan2(dx, −dz).
    tulos.push({ u: kivi.uv[i * 2], v: kivi.uv[i * 2 + 1], y, kulma: Math.atan2(dx, -dz) });
  }
  return tulos;
}

test('rakenna olavinlinna: tornin ulkovaipan TEXCOORD_0 seuraa uv_m-kaavaa (u kasvaa kulman mukana), ei tasoprojektiota', async () => {
  const { tmp, glb } = await rakennaMassaTmp(4);
  try {
    const karjet = tornikarjet(glb);
    assert.ok(karjet.length > 50, `löydettiin vain ${karjet.length} tornin ulkovaipan kärkeä massa.glb:stä`);

    const toistoM = PINNAT.kivi.toisto_m; // number (ei per-akseli-taulukkoa 'kivi':lle)
    let tarkastettu = 0;
    for (const { u, v, y, kulma } of karjet) {
      // uv_m: a = kulma_rad · sade, b = y -> world uv = [a / toisto_m, b / toisto_m] (laskeUv).
      // atan2 palauttaa pääarvon (−π, π], joten verrataan kulmaetäisyytenä (ks. yllä) sen sijaan
      // että vaadittaisiin bittitarkkaa täsmäystä yli sauman.
      const uOdotettuKulma = (u * toistoM) / TORNI.sade;
      assert.ok(
        kulmaetaisyys(uOdotettuKulma, kulma, TAU) < 1e-3,
        `u (${u}) ei täsmää kulmaan ${kulma} (odotettu kulma u:sta: ${uOdotettuKulma})`,
      );
      assert.ok(Math.abs(v * toistoM - y) < 1e-3, `v (${v}) ei täsmää y:hyn (${y})`);
      tarkastettu++;
    }
    assert.ok(tarkastettu > 50, 'liian vähän tarkastettuja kärkiä');

    // Ei-tasoprojektio: kaksi kärkeä SAMALLA kulmalla (toleranssilla) mutta ERI y:llä saavat
    // SAMAN u:n mutta ERI v:n — tasoprojektio (esim. (x,z)/toisto_m) ei tuottaisi tätä, koska
    // siinä projisoitu akseli riippuisi normaalin pääakselista, ei kulmasta.
    const pari = [];
    outer:
    for (const a of karjet) {
      for (const b of karjet) {
        if (Math.abs(a.y - b.y) > 5 && kulmaetaisyys(a.kulma, b.kulma, TAU) < 1e-2) { pari.push([a, b]); break outer; }
      }
    }
    assert.ok(pari.length === 1, 'ei löytynyt vertailuparia (sama kulma, eri y)');
    const [p1, p2] = pari[0];
    assert.ok(Math.abs(p1.u - p2.u) < 1e-3, `sama kulma, u:t eroavat (${p1.u} vs ${p2.u})`);
    assert.ok(Math.abs(p1.v - p2.v) > 1e-3, 'eri y:llä v:n pitäisi erota');
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});

test('rakenna olavinlinna: tornin uv_m-vetoinen TEXCOORD_0 on deterministinen (sha256 + uv täsmää)', async () => {
  const r1 = await rakennaMassaTmp(4);
  const r2 = await rakennaMassaTmp(4);
  try {
    assert.equal(r1.sha256, r2.sha256, 'massa.glb:n sha256 eroaa kahden identtisen ajon välillä');
    assert.deepEqual(tornikarjet(r1.glb), tornikarjet(r2.glb));
  } finally {
    rmSync(r1.tmp, { recursive: true, force: true });
    rmSync(r2.tmp, { recursive: true, force: true });
  }
});
