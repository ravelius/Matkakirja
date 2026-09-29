// DIORAAMAN RESEPTIT — KALUSTEET 2 (erä 3, docs/raportit/dioraama-rajapinnat-era3-20260929.md kohta 2): linnan
// tilojen kalusteet ja rekvisiitta (kappeli, vartiotupa, fatabuuri, muurinharja, laituri). Tyylimallit:
// reseptit-kalusteet.mjs ja reseptit-rekvisiitta.mjs; apufunktiot reseptit-apu.mjs.
//
// Paikallinen kehys (u, y, w) oikeakätisenä: kärjet vastapäivään ulkoa katsottuna ((b − a) × (c − a) osoittaa
// ulos), lattia y = 0, etupuoli +w. Origo: LATTIALLA/PÖYDÄLLÄ LEPÄÄVÄT esineet — pohjan keskipiste y = 0.
// POIKKEAMAT (dokumentoitu kunkin reseptin JSDocissa):
//   SEINÄÄN KIINNITETTÄVÄT (vihkimisristi, seinasoihtu, kilpi, jalkajousi): origo = kiinnityspiste SEINÄN
//     PINNALLA (w = 0), geometria seinästä ulos (w ≥ 0); y voi olla negatiivinen (origo on kappaleen keskellä).
//   ROIKKUVA (kynttilakruunu): origo = kiinnityspiste katossa y = 0, geometria ALASPÄIN (y ≤ 0).
// `.valo = { paikka_paikallinen, sade, voima, vari }` (kynttilakruunu, seinasoihtu) kuten kynttilänjalalla:
// ei Kolmio-alkio; reseptit.mjs:n sijoita() muuntaa paikan maailmaan. Jokainen resepti ≤ 600 kolmiota.
import { laatikko, vaippa, rengas, kolmio, kolmionNormaali, mulberry32 } from './reseptit-apu.mjs';

const RAD = Math.PI / 180;
const KAIKKI = (rooli) => ({ yla: rooli, ala: rooli, etu: rooli, taka: rooli, vasen: rooli, oikea: rooli });
const SIVUT = (rooli) => ({ yla: rooli, etu: rooli, taka: rooli, vasen: rooli, oikea: rooli }); // ilman pohjaa
const L = (u0, u1, y0, y1, w0, w1, roolit) => laatikko({ u0, u1, y0, y1, w0, w1 }, roolit);

/* ==================== Yleiset jäykät muunnokset ==================== */

/** Siirto [du, dy, dw] (normaalit eivät muutu). */
function siirra(kolmiot, [du, dy, dw]) {
  return kolmiot.map((t) => ({ ...t, p: t.p.map((v) => [v[0] + du, v[1] + dy, v[2] + dw]) }));
}

function kierra(kolmiot, rot) {
  return kolmiot.map((t) => {
    const nt = { ...t, p: t.p.map(rot) };
    if (t.n) nt.n = t.n.map(rot);
    return nt;
  });
}
/** Kierto y-akselin ympäri kompassiasteina (sama suunta kuin sijoita():n `suunta`). */
function kierraY(kolmiot, a) {
  const c = Math.cos(a * RAD), s = Math.sin(a * RAD);
  return kierra(kolmiot, (v) => [v[0] * c + v[2] * s, v[1], -v[0] * s + v[2] * c]);
}
/** Kierto u-akselin ympäri (y–w-taso): y' = y cos − w sin, w' = y sin + w cos. 90° kääntää +y:n +w:ksi. */
function kierraU(kolmiot, a) {
  const c = Math.cos(a * RAD), s = Math.sin(a * RAD);
  return kierra(kolmiot, (v) => [v[0], v[1] * c - v[2] * s, v[1] * s + v[2] * c]);
}
/** Kierto w-akselin ympäri (u–y-taso). */
function kierraW(kolmiot, a) {
  const c = Math.cos(a * RAD), s = Math.sin(a * RAD);
  return kierra(kolmiot, (v) => [v[0] * c - v[1] * s, v[0] * s + v[1] * c, v[2]]);
}

/* ==================== Vektoriapu ja yleiset muodot ==================== */

const vah = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const sum = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const kert = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
const piste = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const risti = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const yks = (a) => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };

/**
 * Kolmio, jonka kiertosuunta käännetään osoittamaan poispäin vertailupisteestä `ref` (kappaleen sisäpiste tai
 * akselin lähin piste). Pehmeät normaalit na, nb, nc annetaan ulospäin ja käännetään kärkien mukana.
 */
function tri(a, b, c, rooli, ref, na, nb, nc) {
  const t = kolmio(a, b, c, rooli);
  const g = kolmionNormaali(t);
  const m = vah(kert(sum(sum(a, b), c), 1 / 3), ref);
  if (piste(g, m) < 0) return na ? kolmio(a, c, b, rooli, na, nc, nb) : kolmio(a, c, b, rooli);
  return na ? kolmio(a, b, c, rooli, na, nb, nc) : t;
}

function alaKolmio(t) {
  const g = risti(vah(t.p[1], t.p[0]), vah(t.p[2], t.p[0]));
  return Math.hypot(g[0], g[1], g[2]) / 2;
}

/** Kantavektorit e1, e2 kohtisuoraan yksikkövektoria d vastaan. */
function kanta(d) {
  const apu = Math.abs(d[1]) > 0.9 ? [1, 0, 0] : [0, 1, 0];
  const e1 = yks(risti(d, apu));
  return [e1, risti(d, e1)];
}

/**
 * Suora (katkaistu) kartio/sylinteri pisteestä a pisteeseen b, säteet r0 (a:ssa) ja r1 (b:ssä; 0 = kärki),
 * seg sivua. paatyA/paatyB = umpinaiset päätykannet. Pehmeät normaalit sivuilla.
 */
function putki(a, b, r0, r1, seg, rooli, { paatyA = true, paatyB = true } = {}) {
  const ax = vah(b, a), pit = Math.hypot(...ax) || 1, d = kert(ax, 1 / pit), [e1, e2] = kanta(d);
  const rad = (j) => sum(kert(e1, Math.cos(2 * Math.PI * j / seg)), kert(e2, Math.sin(2 * Math.PI * j / seg)));
  const ren = (c, r, j) => sum(c, kert(rad(j), r));
  const nor = (j) => yks(sum(kert(rad(j), pit), kert(d, r0 - r1)));
  const k = [];
  for (let j = 0; j < seg; j++) {
    const a0 = ren(a, r0, j), a1 = ren(a, r0, j + 1), b0 = ren(b, r1, j), b1 = ren(b, r1, j + 1);
    const n0 = nor(j), n1 = nor(j + 1);
    const ref = sum(a, kert(d, piste(vah(kert(sum(sum(a0, a1), sum(b0, b1)), 0.25), a), d)));
    for (const t of [tri(a0, a1, b1, rooli, ref, n0, n1, n1), tri(a0, b1, b0, rooli, ref, n0, n1, n0)]) {
      if (alaKolmio(t) > 1e-9) k.push(t);
    }
    const mid = kert(sum(a, b), 0.5);
    if (paatyA && r0 > 0) k.push(tri(a, a0, a1, rooli, mid, kert(d, -1), kert(d, -1), kert(d, -1)));
    if (paatyB && r1 > 0) k.push(tri(b, b0, b1, rooli, mid, d, d, d));
  }
  return k;
}

/**
 * Putki pitkin murtoviivaa (pyöreä poikkileikkaus, säde r, seg sivua); suljettu = true tekee renkaan.
 * Kehys kuljetetaan pitkin polkua, joten kaarteet eivät vääntyile.
 */
function polku(pisteet, r, seg, rooli, { suljettu = false, paatyt = true } = {}) {
  const n = pisteet.length, k = [];
  const tang = (i) => {
    const a = pisteet[suljettu ? (i + n - 1) % n : Math.max(0, i - 1)];
    const b = pisteet[suljettu ? (i + 1) % n : Math.min(n - 1, i + 1)];
    return yks(vah(b, a));
  };
  const kehykset = [];
  let e1 = kanta(tang(0))[0];
  for (let i = 0; i < n; i++) {
    const t = tang(i);
    e1 = yks(vah(e1, kert(t, piste(t, e1))));
    kehykset.push([e1, risti(t, e1)]);
  }
  const ren = (i, j) => {
    const [u, v] = kehykset[i % n], f = 2 * Math.PI * j / seg;
    const rr = sum(kert(u, Math.cos(f)), kert(v, Math.sin(f)));
    return [sum(pisteet[i % n], kert(rr, r)), rr];
  };
  const kpl = suljettu ? n : n - 1;
  for (let i = 0; i < kpl; i++) {
    for (let j = 0; j < seg; j++) {
      const [a0, na0] = ren(i, j), [a1, na1] = ren(i, j + 1), [b0, nb0] = ren(i + 1, j), [b1, nb1] = ren(i + 1, j + 1);
      // Vertailupiste = neliön keskipiste miinus r · keskimääräinen ulkonormaali (ei jänteen keskipiste: kaarteessa se harhautuu).
      const ref = vah(kert(sum(sum(a0, a1), sum(b0, b1)), 0.25), kert(sum(sum(na0, na1), sum(nb0, nb1)), r / 4));
      k.push(tri(a0, a1, b1, rooli, ref, na0, na1, nb1), tri(a0, b1, b0, rooli, ref, na0, nb1, nb0));
    }
  }
  if (paatyt && !suljettu) {
    for (const [i, s] of [[0, -1], [n - 1, 1]]) {
      const t = kert(tang(i), s), ref = vah(pisteet[i], t); // ref päätykannen takana
      for (let j = 0; j < seg; j++) k.push(tri(pisteet[i], ren(i, j)[0], ren(i, j + 1)[0], rooli, ref, t, t, t));
    }
  }
  return k;
}

/**
 * Pyörähdyskappale profiilista [[r, y], …] alhaalta ylös (sorvi), pehmeät normaalit profiilin kaltevuudesta.
 * sisa = true kääntää pinnan sisäänpäin (astian sisäpuoli). Nollasäteen renkaiden surkastuneet kolmiot ohitetaan.
 */
function sorvi(profiili, segmentit, rooli, { sisa = false } = {}) {
  const n = profiili.length, tulos = [];
  const normaali = (i, k) => {
    const a = profiili[Math.max(0, i - 1)], b = profiili[Math.min(n - 1, i + 1)];
    const dr = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dr, dy) || 1;
    const s = sisa ? -1 : 1;
    return [s * (dy / l) * Math.sin(k * RAD), s * (-dr / l), s * (dy / l) * Math.cos(k * RAD)];
  };
  const p = (i, j) => {
    const k = 360 * j / segmentit;
    return [profiili[i][0] * Math.sin(k * RAD), profiili[i][1], profiili[i][0] * Math.cos(k * RAD)];
  };
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < segmentit; j++) {
      const ka = 360 * j / segmentit, kb = 360 * (j + 1) / segmentit;
      const a0 = p(i, j), b0 = p(i, j + 1), b1 = p(i + 1, j + 1), a1 = p(i + 1, j);
      const na0 = normaali(i, ka), nb0 = normaali(i, kb), nb1 = normaali(i + 1, kb), na1 = normaali(i + 1, ka);
      for (const t of [kolmio(a0, b0, b1, rooli, na0, nb0, nb1), kolmio(a0, b1, a1, rooli, na0, nb1, na1)]) {
        if (alaKolmio(t) < 1e-9) continue;
        tulos.push(sisa ? kolmio(t.p[0], t.p[2], t.p[1], rooli, t.n[0], t.n[2], t.n[1]) : t);
      }
    }
  }
  return tulos;
}

/**
 * Tynnyrin runko (puu + 2 vannetta): pullea vartalo, kohtuullinen kaari. auki = true jättää yläkannen pois ja
 * tekee sisäpuolen (reunarengas + sisäseinä + pohja korkeudelle sisaPohja). Vanteet 'vanne'.
 */
function tynnyrinRunko(sade, korkeus, seg, { auki = false, sisaPohja = 0 } = {}) {
  const r = (t) => sade * (1 - 0.14 * (2 * t - 1) ** 2);
  const profiili = [0, 0.25, 0.5, 0.75, 1].map((t) => [r(t) * (t === 0 || t === 1 ? 0.96 : 1), t * korkeus]);
  const k = sorvi(profiili, seg, 'puu');
  k.push(...rengas({ rUlko: r(0) * 0.96, y: 0, segmentit: seg, ylos: false, rooli: 'puu' }));
  if (auki) {
    k.push(...rengas({ rSisa: r(1) * 0.96 - 0.02, rUlko: r(1) * 0.96, y: korkeus, segmentit: seg, ylos: true, rooli: 'puu' }));
    k.push(...sorvi([[r(1) * 0.96 - 0.02, sisaPohja], [r(1) * 0.96 - 0.02, korkeus]], seg, 'puu', { sisa: true }));
    k.push(...rengas({ rUlko: r(1) * 0.96 - 0.02, y: sisaPohja, segmentit: seg, ylos: true, rooli: 'puu' }));
  } else {
    k.push(...rengas({ rUlko: r(1) * 0.96, y: korkeus, segmentit: seg, ylos: true, rooli: 'puu' }));
  }
  for (const t of [0.2, 0.8]) {
    k.push(...sorvi([[r(t) + 0.008, t * korkeus - 0.02], [r(t) + 0.008, t * korkeus + 0.02]], seg, 'vanne'));
  }
  return k;
}

/* ==================== Kappeli ==================== */

/**
 * Alttari: kivinen alttarikivi portaalla ja liina päällä. Mitat (m): leveys (u) 1,4, syvyys (w) 0,6, korkeus 1,0
 * (liinan päälle). Origo: pohjan keskipiste lattialla. Etupuoli (w+) = pappi/uskovat; liina roikkuu edessä ja
 * takana. Roolit: kivi, liina.
 */
export function alttari({ leveys = 1.4, syvyys = 0.6, korkeus = 1.0 } = {}) {
  const lu = leveys / 2, sw = syvyys / 2, aste = 0.1;
  const k = [];
  k.push(...L(-lu - 0.08, lu + 0.08, 0, aste, -sw - 0.08, sw + 0.16, SIVUT('kivi')));
  k.push(...L(-lu + 0.04, lu - 0.04, aste, korkeus - 0.1, -sw + 0.04, sw - 0.04, SIVUT('kivi')));
  k.push(...L(-lu, lu, korkeus - 0.1, korkeus - 0.04, -sw, sw, KAIKKI('kivi')));
  // Liina: päälevy + edessä ja takana roikkuva kaista (pystyliina hieman levyn ulkopuolella).
  const y1 = korkeus - 0.035;
  k.push(...L(-lu - 0.02, lu + 0.02, y1 - 0.006, y1 + 0.004, -sw - 0.02, sw + 0.02, SIVUT('liina')));
  k.push(...L(-lu * 0.7, lu * 0.7, y1 - 0.42, y1, sw + 0.02, sw + 0.03, KAIKKI('liina')));
  k.push(...L(-lu * 0.7, lu * 0.7, y1 - 0.3, y1, -sw - 0.03, -sw - 0.02, KAIKKI('liina')));
  return k;
}

/**
 * Vihkimisristi: seinämaalaus — ympyrärengas ja tasavartinen risti ohuena levynä (0,02 m) seinän pinnalla,
 * punamulta. EI krusifiksia. SEINÄÄN KIINNITETTÄVÄ: origo = ympyrän keskipiste seinän pinnalla (w = 0), levy
 * ulottuu w+ puolelle (0…0,02), y ± sade. Roolit: maali.
 */
export function vihkimisristi({ sade = 0.4 } = {}) {
  const paks = 0.02, sis = sade * 0.86;
  // Rengas rakennetaan vaakatasoon (y = paksuus) ja käännetään pystyyn (+y → +w).
  const r = [
    ...rengas({ rSisa: sis, rUlko: sade, y: paks, segmentit: 24, ylos: true, rooli: 'maali' }),
    ...vaippa({ r: sade, y0: 0, y1: paks, segmentit: 24, ulos: true, rooli: 'maali' }),
    ...vaippa({ r: sis, y0: 0, y1: paks, segmentit: 24, ulos: false, rooli: 'maali' }),
  ];
  const k = kierraU(r, 90);
  const varsi = sis * 0.86, lev = sade * 0.09;
  k.push(...L(-lev, lev, -varsi, varsi, 0, paks, { etu: 'maali', yla: 'maali', ala: 'maali', vasen: 'maali', oikea: 'maali' }));
  k.push(...L(-varsi, -lev, -lev, lev, 0, paks, { etu: 'maali', yla: 'maali', ala: 'maali', vasen: 'maali' }));
  k.push(...L(lev, varsi, -lev, lev, 0, paks, { etu: 'maali', yla: 'maali', ala: 'maali', oikea: 'maali' }));
  return k;
}

/**
 * Kirkonpenkki: selkänojallinen penkki. Mitat (m): leveys (u) 1,8, syvyys (w) 0,45, istuinkorkeus 0,45,
 * selkänojan yläreuna 0,95. Origo: pohjan keskipiste lattialla. Istuja katsoo w+ suuntaan (selkänoja on w−
 * reunassa), päätypaneelit u-päissä. Roolit: puu (rungot, päädyt), lankku (istuin, selkälankut).
 */
export function kirkonpenkki({ leveys = 1.8, syvyys = 0.45, istuinkorkeus = 0.45, selkakorkeus = 0.95 } = {}) {
  const lu = leveys / 2, sw = syvyys / 2, k = [];
  for (const s of [-1, 1]) {
    // Päätypaneeli: matala jalka + korkeampi selkäpuoli.
    const u0 = s < 0 ? -lu : lu - 0.05, u1 = s < 0 ? -lu + 0.05 : lu;
    k.push(...L(u0, u1, 0, istuinkorkeus - 0.04, -sw, sw, SIVUT('puu')));
    k.push(...L(u0, u1, istuinkorkeus - 0.04, selkakorkeus + 0.03, -sw, -sw + 0.09, SIVUT('puu')));
  }
  k.push(...L(-lu + 0.05, lu - 0.05, istuinkorkeus - 0.04, istuinkorkeus, -sw, sw, KAIKKI('lankku')));
  k.push(...L(-lu + 0.05, lu - 0.05, istuinkorkeus, selkakorkeus * 0.72, -sw, -sw + 0.04, KAIKKI('lankku')));
  k.push(...L(-lu + 0.05, lu - 0.05, selkakorkeus * 0.72 + 0.04, selkakorkeus, -sw, -sw + 0.04, KAIKKI('lankku')));
  k.push(...L(-lu + 0.05, lu - 0.05, istuinkorkeus * 0.4, istuinkorkeus * 0.4 + 0.05, -sw + 0.03, sw - 0.03, KAIKKI('puu')));
  return k;
}

/**
 * Kynttilakruunu: roikkuva rautarengas kolmella ketjulla ja 4–6 kynttilällä. ROIKKUVA: origo = kiinnityspiste
 * katossa (y = 0), geometria alaspäin: rengas y = −ketju. Mitat (m): rengas sade 0,35, ketju 0,6, kynttilä 0,12.
 * Symmetrinen y-akselin suhteen (ei etusuuntaa). `.valo`: paikka_paikallinen = [0, −ketju + 0,22, 0] eli
 * kynttilöiden liekkien yläpuolella renkaan keskellä, sade 1,3, voima 0,65, vari #ffb070.
 * Roolit: rauta (rengas, ketjut, kynttilänkohdat), kynttila (vaha).
 */
export function kynttilakruunu({ sade = 0.35, ketju = 0.6, kynttilia = 5 } = {}) {
  const n = Math.max(4, Math.min(6, Math.round(kynttilia))), yR = -ketju, k = [];
  const kehä = [];
  for (let i = 0; i < 16; i++) kehä.push([sade * Math.sin(i * 22.5 * RAD), yR, sade * Math.cos(i * 22.5 * RAD)]);
  k.push(...polku(kehä, 0.02, 5, 'rauta', { suljettu: true }));
  for (const ka of [0, 120, 240]) {
    k.push(...putki([0, 0, 0], [sade * Math.sin(ka * RAD), yR, sade * Math.cos(ka * RAD)], 0.012, 0.012, 4, 'rauta', { paatyA: false, paatyB: false }));
  }
  for (let i = 0; i < n; i++) {
    const ka = 360 * i / n + 18, u = sade * Math.sin(ka * RAD), w = sade * Math.cos(ka * RAD), y0 = yR + 0.02;
    const jalka = sorvi([[0.03, 0], [0.032, 0.012], [0.014, 0.03]], 6, 'rauta');
    jalka.push(...rengas({ rUlko: 0.03, y: 0, segmentit: 6, ylos: false, rooli: 'rauta' }));
    k.push(...siirra(jalka, [u, y0, w]));
    const kyn = vaippa({ r: 0.011, y0: 0.03, y1: 0.03 + 0.12, segmentit: 6, rooli: 'kynttila' });
    kyn.push(...rengas({ rUlko: 0.011, y: 0.15, segmentit: 6, ylos: true, rooli: 'kynttila' }));
    k.push(...siirra(kyn, [u, y0, w]));
  }
  k.valo = { paikka_paikallinen: [0, yR + 0.22, 0], sade: 1.3, voima: 0.65, vari: '#ffb070' };
  return k;
}

/**
 * Seinäsoihtu: rautainen seinäpidike ja kalteva puusoihtu, jonka päässä palava kääre ja liekki. SEINÄÄN
 * KIINNITETTÄVÄ: origo = pidikelevyn keskipiste seinän pinnalla (w = 0), kaikki w ≥ 0; soihtu nousee
 * seinästä ulos päin (etupuoli w+), noin 15° pystystä. Mitat (m): soihdun pituus 0,5, korkeus origosta liekkiin
 * ≈ 0,5. `.valo`: paikka_paikallinen = liekin keskikohta (kommentissa laskettu, ks. koodi:
 * kärki + suunta·0,1 ≈ [0, 0,52, 0,275]), sade 1,4, voima 0,7, vari #ffa050 (lämmin).
 * Roolit: rauta (pidike), puu (varsi), kaare (kangaskääre), liekki (hehkuva).
 */
export function seinasoihtu({ pituus = 0.5 } = {}) {
  const k = [];
  k.push(...L(-0.05, 0.05, -0.07, 0.07, 0, 0.02, { etu: 'rauta', yla: 'rauta', ala: 'rauta', vasen: 'rauta', oikea: 'rauta' }));
  // Pidike: vaakavarsi seinästä ja rengas soihdun ympärillä.
  k.push(...putki([0, -0.03, 0.02], [0, -0.03, 0.13], 0.013, 0.013, 6, 'rauta'));
  const suunta = yks([0, Math.cos(15 * RAD), Math.sin(15 * RAD)]);
  const alku = [0, -0.06, 0.12], karki = sum(alku, kert(suunta, pituus));
  k.push(...putki(alku, karki, 0.024, 0.02, 8, 'puu'));
  k.push(...putki(sum(alku, kert(suunta, 0.09)), sum(alku, kert(suunta, 0.135)), 0.03, 0.03, 8, 'rauta', { paatyA: false, paatyB: false }));
  k.push(...putki(sum(karki, kert(suunta, -0.06)), sum(karki, kert(suunta, 0.05)), 0.035, 0.045, 8, 'kaare'));
  const liekki = sum(karki, kert(suunta, 0.05));
  k.push(...putki(liekki, sum(liekki, kert(suunta, 0.13)), 0.04, 0, 8, 'liekki'));
  k.valo = { paikka_paikallinen: sum(karki, kert(suunta, 0.1)), sade: 1.4, voima: 0.7, vari: '#ffa050' };
  return k;
}

/**
 * Lyhty tolpassa (tunnelma 29.9.): puutolppa y 0…korkeus, rautavarsi w+-suuntaan, varren päässä riippuva lyhty
 * (rautakehikko 0,2 × 0,28 m, avoimet sivut, kynttilä ja liekki). `.valo` = liekin kohta.
 */
export function lyhty({ korkeus = 2.2, varsi = 0.45 } = {}) {
  const k = [];
  k.push(...putki([0, 0, 0], [0, korkeus, 0], 0.07, 0.055, 8, 'puu'));
  const yv = korkeus - 0.12;
  k.push(...putki([0, yv, 0.04], [0, yv, varsi], 0.018, 0.018, 6, 'rauta'));
  const y1 = yv - 0.06, y0 = y1 - 0.28, w = varsi;
  const kaikki = { etu: 'rauta', taka: 'rauta', yla: 'rauta', ala: 'rauta', vasen: 'rauta', oikea: 'rauta' };
  k.push(...L(-0.1, 0.1, y0, y0 + 0.02, w - 0.1, w + 0.1, kaikki));
  k.push(...L(-0.1, 0.1, y1 - 0.02, y1, w - 0.1, w + 0.1, kaikki));
  for (const [du, dw] of [[-0.09, -0.09], [0.09, -0.09], [-0.09, 0.09], [0.09, 0.09]]) {
    k.push(...putki([du, y0, w + dw], [du, y1, w + dw], 0.008, 0.008, 4, 'rauta'));
  }
  k.push(...putki([0, y1, w], [0, y1 + 0.1, w], 0.13, 0, 4, 'rauta'));
  k.push(...putki([0, y1 + 0.1, w], [0, yv, w], 0.006, 0.006, 4, 'rauta'));
  k.push(...putki([0, y0 + 0.02, w], [0, y0 + 0.12, w], 0.02, 0.02, 8, 'kynttila'));
  k.push(...putki([0, y0 + 0.12, w], [0, y0 + 0.17, w], 0.012, 0, 6, 'liekki'));
  k.valo = { paikka_paikallinen: [0, y0 + 0.15, w], sade: 6, voima: 0.8, vari: '#ffb060' };
  return k;
}

/**
 * Arkku: puuarkku rautahelat. Mitat (m): leveys (u) 0,9, syvyys (w) 0,5, korkeus 0,55 (kansi mukana).
 * Origo: pohjan keskipiste lattialla; etupuoli (w+) = lukkopuoli. Kolme vannetta kiertää arkun,
 * lukkolevy edessä. Roolit: puu, kansi, rauta.
 */
export function arkku({ leveys = 0.9, syvyys = 0.5, korkeus = 0.55, osa = 'koko' } = {}) {
  // osa (voudin sinetti 29.9.): 'koko' = suljettu arkku; 'runko' = ilman kantta, yläpinta roolilla 'kansi' (data: pinnat { kansi: 'kangas' } = kankaat näkyvät);
  // 'kansi' = pelkkä kansi rautoineen irtoesineeksi (sarana takareunassa [0, yk, −sw]), samoin koordinaatein.
  const lu = leveys / 2, sw = syvyys / 2, yk = korkeus * 0.72, k = [];
  const RAUTA = { yla: 'rauta', etu: 'rauta', taka: 'rauta', vasen: 'rauta', oikea: 'rauta' };
  if (osa !== 'kansi') {
    k.push(...L(-lu, lu, 0, yk, -sw, sw, osa === 'runko' ? { ...SIVUT('puu'), yla: 'kansi' } : SIVUT('puu')));
    for (const u of [-lu * 0.68, lu * 0.68]) k.push(...L(u - 0.03, u + 0.03, -0.004, yk, -sw - 0.006, sw + 0.006, RAUTA));
    k.push(...L(-0.035, 0.035, yk - 0.09, yk + 0.05, sw + 0.006, sw + 0.02, SIVUT('rauta')));
    for (const s of [-1, 1]) k.push(...L(s * lu - 0.02, s * lu + 0.02, 0, 0.05, -sw, sw, SIVUT('rauta')));
  }
  if (osa !== 'runko') {
    k.push(...L(-lu - 0.01, lu + 0.01, yk, korkeus - 0.05, -sw - 0.01, sw + 0.01, SIVUT('kansi')));
    k.push(...L(-lu + 0.03, lu - 0.03, korkeus - 0.05, korkeus, -sw + 0.03, sw - 0.03, SIVUT('kansi')));
    for (const u of [-lu * 0.68, lu * 0.68]) k.push(...L(u - 0.03, u + 0.03, yk, korkeus, -sw - 0.014, sw + 0.014, RAUTA));
  }
  return k;
}

/**
 * Keihästeline: matala jalusta, kaksi pystypylvästä ja niiden välissä 3–4 pystykeihästä sekä ylävaaka.
 * Mitat (m): leveys (u) 0,8, keihäiden pituus 2,0 (kärki mukana), teline 1,1 korkea. Origo: jalustan keskipiste
 * lattialla; etupuoli (w+): keihäät seisovat rivissä u-suunnassa telineen edessä. Roolit: puu, varsi, karki.
 */
export function keihasteline({ leveys = 0.8, keihaita = 4, pituus = 2.0 } = {}) {
  const n = Math.max(3, Math.min(4, Math.round(keihaita))), lu = leveys / 2, k = [];
  k.push(...L(-lu - 0.05, lu + 0.05, 0, 0.1, -0.12, 0.12, SIVUT('puu')));
  for (const s of [-1, 1]) k.push(...L(s * (lu + 0.03) - 0.03, s * (lu + 0.03) + 0.03, 0.1, 1.1, -0.03, 0.03, SIVUT('puu')));
  k.push(...L(-lu - 0.06, lu + 0.06, 1.0, 1.08, -0.05, 0.02, SIVUT('puu')));
  for (let i = 0; i < n; i++) {
    const u = -lu + 0.1 + (2 * lu - 0.2) * i / (n - 1), w = 0.05 + (i % 2) * 0.03;
    const varsi = putki([u, 0.1, w], [u, pituus - 0.22, w], 0.014, 0.012, 6, 'varsi');
    const kärki = putki([u, pituus - 0.22, w], [u, pituus, w], 0.024, 0, 6, 'karki');
    k.push(...varsi, ...kärki);
  }
  return k;
}

/* ==================== Vartiotupa ==================== */

/**
 * Kilpi: pyöreä puukilpi metallikuvulla, seinälle ripustettuna. SEINÄÄN KIINNITETTÄVÄ: origo = kilven keskipiste
 * seinän pinnalla (w = 0); kilpi on pystyssä u–y-tasossa (y ± sade) ja kupera puoli osoittaa w+ (etupuoli).
 * Mitat (m): sade 0,28, paksuus 0,03, kupu korkeus 0,088 (w). Roolit: puu, metalli (kupu ja reunavanne).
 */
export function kilpi({ sade = 0.28 } = {}) {
  const runko = sorvi([[0, 0], [sade, 0], [sade, 0.02], [sade * 0.6, 0.032], [0.09, 0.04]], 16, 'puu');
  const kupu = sorvi([[0.09, 0.04], [0.09, 0.052], [0.05, 0.078], [0, 0.088]], 16, 'metalli');
  const vanne = sorvi([[sade + 0.004, 0.0], [sade + 0.004, 0.02]], 16, 'metalli');
  return kierraU([...runko, ...kupu, ...vanne], 90);
}

/**
 * Hakapyssy (1500-luvun alun käsiase): rautainen piippu ja puinen tukki haarukkatukijalan päällä.
 * Mitat (m): piippu 1,0 pitkä (kaliiperi ~0,04), koko ase 1,5, tukijalan korkeus 0,95. Origo: tukijalan
 * juuren keskipiste lattialla; piippu osoittaa w+ (etupuoli = suu), tukin jalkapuoli w−. Roolit: rauta,
 * puu (tukki, tukijalka), lukko (sytytyslukko, rautaa).
 */
export function hakapyssy() {
  const k = [], yA = 0.98;
  // Tukijalka: ristijalka lattialla, pysty, haarukka.
  k.push(...L(-0.22, 0.22, 0, 0.035, -0.03, 0.03, SIVUT('puu')));
  k.push(...L(-0.03, 0.03, 0, 0.035, -0.22, 0.22, SIVUT('puu')));
  k.push(...putki([0, 0.035, 0], [0, 0.88, 0], 0.024, 0.022, 6, 'puu'));
  k.push(...putki([0, 0.87, 0], [-0.045, 0.97, 0.03], 0.016, 0.014, 5, 'puu'));
  k.push(...putki([0, 0.87, 0], [0.045, 0.97, 0.03], 0.016, 0.014, 5, 'puu'));
  // Piippu ja tukki.
  k.push(...putki([0, yA + 0.03, -0.1], [0, yA + 0.03, 0.9], 0.021, 0.018, 8, 'rauta'));
  k.push(...putki([0, yA + 0.03, 0.88], [0, yA + 0.03, 0.92], 0.026, 0.026, 8, 'rauta'));
  k.push(...L(-0.028, 0.028, yA - 0.02, yA + 0.012, -0.1, 0.45, SIVUT('puu')));
  const jalka = L(-0.03, 0.03, -0.045, 0.045, -0.5, -0.02, SIVUT('puu'));
  k.push(...siirra(kierraU(jalka, -12), [0, yA - 0.01, -0.02]));
  k.push(...L(-0.024, 0.024, yA + 0.012, yA + 0.05, -0.1, -0.02, SIVUT('lukko')));
  k.push(...L(-0.012, 0.012, yA + 0.05, yA + 0.075, -0.09, -0.06, SIVUT('lukko')));
  return k;
}

/**
 * Ruutitynnyri: pieni puutynnyri vanteineen ja umpikansi. Mitat (m): sade 0,16, korkeus 0,3. Origo: pohjan
 * keskipiste lattialla, symmetrinen (ei etusuuntaa). Roolit: puu, vanne (metalli), tulppa (rauta).
 */
export function ruutitynnyri({ sade = 0.16, korkeus = 0.3 } = {}) {
  const k = tynnyrinRunko(sade, korkeus, 12);
  k.push(...putki([sade * 0.4, korkeus, 0], [sade * 0.4, korkeus + 0.02, 0], 0.03, 0.03, 6, 'tulppa'));
  return k;
}

/**
 * Pelilauta: pöydälle laskettu ruutulauta, 2–3 noppaa ja 6 nappulaa. Mitat (m): lauta 0,5 × 0,5 × 0,03; nopat
 * 0,025; nappulat sade 0,02 korkeus 0,02. Origo: laudan pohjan keskipiste PÖYTÄTASOLLA (y = 0); etupuoli w+.
 * Siemen (oletus 3) arpoo noppien asennon ja nappuloiden paikan pienesti. Roolit: puu (kehys), ruutu (vaalea
 * kenttä), tumma (tumma kenttä), noppa, nappula, nappula2.
 */
export function pelilauta({ koko = 0.5, nopat = 3, siemen = 3 } = {}) {
  const rng = mulberry32(siemen >>> 0), h = koko / 2, k = [], ruutu = (koko - 0.06) / 4, pa = 0.03;
  k.push(...L(-h, h, 0, pa - 0.006, -h, h, KAIKKI('puu')));
  k.push(...L(-h + 0.03, h - 0.03, pa - 0.006, pa - 0.002, -h + 0.03, h - 0.03, { yla: 'ruutu' }));
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if ((i + j) % 2) continue;
      const u0 = -h + 0.03 + i * ruutu, w0 = -h + 0.03 + j * ruutu;
      k.push(...L(u0, u0 + ruutu, pa - 0.002, pa + 0.002, w0, w0 + ruutu, SIVUT('tumma')));
    }
  }
  for (let i = 0; i < 6; i++) {
    const [ci, cj] = [[0, 0], [1, 1], [2, 0], [0, 2], [3, 3], [1, 3]][i];
    const u = -h + 0.03 + (ci + 0.5) * ruutu + (rng() - 0.5) * 0.01, w = -h + 0.03 + (cj + 0.5) * ruutu + (rng() - 0.5) * 0.01;
    const rooli = i < 3 ? 'nappula' : 'nappula2';
    const n = vaippa({ r: 0.02, y0: pa + 0.002, y1: pa + 0.022, segmentit: 8, rooli });
    n.push(...rengas({ rUlko: 0.02, y: pa + 0.022, segmentit: 8, ylos: true, rooli }));
    k.push(...siirra(n, [u, 0, w]));
  }
  for (let i = 0; i < Math.max(2, Math.min(3, nopat)); i++) {
    const kub = kierraY(L(-0.0125, 0.0125, 0, 0.025, -0.0125, 0.0125, KAIKKI('noppa')), rng() * 90);
    k.push(...siirra(kub, [-h * 0.25 + i * 0.05, pa, h * 0.6 + (rng() - 0.5) * 0.06]));
  }
  return k;
}

/* ==================== Fatabuuri ==================== */

/**
 * Pulpetti: kirjoituspulpetti, jonka kalteva kansi on takaa korkeampi, avoin kirja ja mustepullo takalistalla.
 * Mitat (m): leveys (u) 0,7, syvyys (w) 0,5, takalistan yläreuna 1,1 (kansi laskee eteen ~20°). Origo: pohjan
 * keskipiste lattialla; etupuoli (w+) = kirjoittaja. Roolit: puu (rungot, kansi), lankku (hylly),
 * kansi_nahka (kirjan kansi, nahka), sivut, muste (savi).
 */
export function pulpetti({ leveys = 0.7, syvyys = 0.5, korkeus = 1.1 } = {}) {
  const lu = leveys / 2, sw = syvyys / 2, kalt = 20, ds = syvyys - 0.1, k = [];
  const hc = korkeus - (ds / 2) * Math.sin(kalt * RAD) - 0.03 * Math.cos(kalt * RAD); // kannen keskikorkeus
  // Kansi + kirja samassa kehyksessä (vaakana), sitten kallistus ja siirto.
  const kansi = L(-lu, lu, 0, 0.03, -ds / 2, ds / 2, KAIKKI('puu'));
  kansi.push(...L(-lu, lu, 0.03, 0.055, ds / 2 - 0.03, ds / 2, KAIKKI('puu'))); // etureunan lista
  const kirja = [
    ...L(-0.23, 0.23, 0.03, 0.037, -0.13, 0.13, SIVUT('kansi_nahka')),
    ...L(-0.215, -0.005, 0.037, 0.05, -0.12, 0.12, SIVUT('sivut')),
    ...L(0.005, 0.215, 0.037, 0.05, -0.12, 0.12, SIVUT('sivut')),
  ];
  k.push(...siirra(kierraU([...kansi, ...kirja], kalt), [0, hc, 0.05]));
  // Takalista (vaakataso) ja muste.
  const yL = korkeus, w0 = -sw;
  k.push(...L(-lu, lu, yL - 0.04, yL, w0, w0 + 0.1, KAIKKI('lankku')));
  const pullo = sorvi([[0.03, 0], [0.035, 0.02], [0.02, 0.045], [0.012, 0.06], [0.016, 0.065]], 8, 'muste');
  pullo.push(...rengas({ rUlko: 0.03, y: 0, segmentit: 8, ylos: false, rooli: 'muste' }));
  k.push(...siirra(pullo, [lu - 0.12, yL, w0 + 0.05]));
  // Sivupaneelit, takapaneeli ja alahylly.
  const kor = hc - (ds / 2) * Math.sin(kalt * RAD) - 0.02;
  for (const s of [-1, 1]) {
    k.push(...L(s * lu * 0.9 - 0.02, s * lu * 0.9 + 0.02, 0, kor, -sw + 0.02, sw - 0.06, SIVUT('puu')));
  }
  k.push(...L(-lu * 0.9, lu * 0.9, 0, yL - 0.04, w0, w0 + 0.03, KAIKKI('puu')));
  k.push(...L(-lu * 0.9, lu * 0.9, 0.3, 0.34, -sw + 0.03, sw - 0.08, KAIKKI('lankku')));
  return k;
}

/**
 * Kirja: suljettu nahkakantinen kirja, pystyasennossa mahdollinen mutta oletuksena PÖYDÄLLÄ (makaa). Mitat (m):
 * leveys (u) 0,18, syvyys (w) 0,25, paksuus 0,05; sivupaketti 0,003 sisemmällä kuin kansi, selkä u− puolella,
 * rautasolki u+ reunalla. Origo: pohjan keskipiste; etupuoli w+ = alareuna. Roolit: kansi (nahka), sivut, solki.
 */
export function kirja({ leveys = 0.18, syvyys = 0.25, paksuus = 0.05 } = {}) {
  const lu = leveys / 2, sw = syvyys / 2, kp = 0.007, k = [];
  k.push(...L(-lu, lu, 0, kp, -sw, sw, KAIKKI('kansi')));
  k.push(...L(-lu, lu, paksuus - kp, paksuus, -sw, sw, KAIKKI('kansi')));
  k.push(...L(-lu, -lu + 0.012, kp, paksuus - kp, -sw, sw, KAIKKI('kansi')));
  k.push(...L(-lu + 0.012, lu - 0.004, kp, paksuus - kp, -sw + 0.004, sw - 0.004, { etu: 'sivut', taka: 'sivut', oikea: 'sivut' }));
  k.push(...L(lu - 0.03, lu + 0.003, paksuus * 0.5 - 0.012, paksuus * 0.5 + 0.012, -0.015, 0.015, KAIKKI('solki')));
  return k;
}

/**
 * Köysikieppi: lattialle kelattu köysi, 3,5 kierrosta spiraalina (säde 0,2 → 0,08), kaksi kerrosta, ja
 * pää irti reunalta. Mitat (m): ulkosade 0,22, köyden paksuus (halkaisija) 0,04, korkeus ~0,08. Origo: kiepin
 * keskipiste lattialla; symmetrinen. Rooli: koysi (kangas).
 */
export function koysikieppi({ sade = 0.22, koysi = 0.02 } = {}) {
  const k = [];
  const kierros = 12, kierroksia = 3, pisteet = [];
  const n = kierros * kierroksia;
  for (let i = 0; i <= n; i++) {
    const t = i / n, kul = i * (360 / kierros), r = sade - t * (sade - 0.07);
    pisteet.push([r * Math.sin(kul * RAD), koysi, r * Math.cos(kul * RAD)]);
  }
  k.push(...polku(pisteet, koysi, 4, 'koysi'));
  // Toinen kerros: pienempi spiraali päällä.
  const p2 = [];
  for (let i = 0; i <= 18; i++) {
    const t = i / 18, kul = i * 30 + 7, r = (sade - 0.05) * 0.85 - t * 0.09;
    p2.push([r * Math.sin(kul * RAD), koysi * 2.6, r * Math.cos(kul * RAD)]);
  }
  k.push(...polku(p2, koysi, 4, 'koysi'));
  // Irtopää lähtee ulkoreunalta lattiaa pitkin ulos.
  const ulko = pisteet[0];
  k.push(...polku([ulko, [ulko[0] + 0.05, koysi, ulko[2] + 0.11], [ulko[0] + 0.02, koysi, ulko[2] + 0.22]], koysi, 4, 'koysi'));
  return k;
}

/**
 * Airot: kaksi airoa lattialla vierekkäin, hieman eri suunnissa. Mitat (m): airon pituus 2,0 (varsi 1,6 +
 * lapa 0,4 × 0,13), varren sade 0,02. Origo: airoparin keskipiste lattialla; lavat osoittavat w+ (etupuoli),
 * kahvat w−. Roolit: puu (varsi, kahva), lapa (lankku).
 */
export function airot({ pituus = 2.0 } = {}) {
  const aero = () => {
    const k = [], r = 0.02, varsi = pituus * 0.8, lapa = pituus * 0.2;
    const w0 = -pituus / 2;
    k.push(...putki([0, r, w0], [0, r, w0 + varsi], r, r, 8, 'puu'));
    k.push(...putki([0, r, w0], [0, r, w0 + 0.16], 0.03, 0.03, 8, 'puu'));
    k.push(...L(-0.065, 0.065, 0, 2 * r - 0.006, w0 + varsi, w0 + varsi + lapa, KAIKKI('lapa')));
    return k;
  };
  return [...siirra(kierraY(aero(), -4), [-0.13, 0, 0]), ...siirra(kierraY(aero(), 5), [0.16, 0, 0.05])];
}

/* ==================== Laituri ==================== */

/**
 * Verkko: kalaverkko kuivumassa puutelineellä. Kaksi pylvästä ja niiden välissä orsi (korkeus 1,5); verkko on
 * läpikuultamaton kangasverho, jonka alareuna roikkuu epätasaisesti (siemen 5). Mitat (m): leveys (u) 1,6,
 * korkeus 1,5, verkon pituus ~1,2. Origo: telineen pohjan keskipiste lattialla; etupuoli (w+); verho
 * on kaksipuolinen (etu- ja takapinta, väli 0,012). Roolit: puu (teline), verkko (kangas).
 */
export function verkko({ leveys = 1.6, korkeus = 1.5, siemen = 5 } = {}) {
  const lu = leveys / 2, rng = mulberry32(siemen >>> 0), k = [];
  for (const s of [-1, 1]) {
    k.push(...L(s * lu - 0.035, s * lu + 0.035, 0, korkeus, -0.035, 0.035, SIVUT('puu')));
    k.push(...L(s * lu - 0.035, s * lu + 0.035, 0, 0.05, -0.28, 0.28, SIVUT('puu')));
  }
  k.push(...L(-lu - 0.05, lu + 0.05, korkeus - 0.07, korkeus - 0.01, -0.03, 0.03, SIVUT('puu')));
  const nu = 12, nv = 5, yTop = korkeus - 0.07, ul = leveys - 0.1;
  const alareuna = [];
  for (let i = 0; i <= nu; i++) alareuna.push(yTop - 1.1 - rng() * 0.25);
  const sag = (u, y) => 0.025 * Math.sin((u / ul) * Math.PI * 4) * ((yTop - y) / 1.3);
  const P = (i, j) => {
    const u = -ul / 2 + (ul * i) / nu, y = yTop + (alareuna[i] - yTop) * (j / nv);
    return [u, y, sag(u, y)];
  };
  for (let i = 0; i < nu; i++) {
    for (let j = 0; j < nv; j++) {
      const a = P(i, j), b = P(i + 1, j), c = P(i + 1, j + 1), d = P(i, j + 1);
      // Etupuoli (w+): (a, c, b): (b − a) × (c − a) osoittaa +w kun a ylhäällä ja c alhaalla → järjestetään a, d, c, b.
      const et = tri(a, d, c, 'verkko', [0, a[1], -1]), et2 = tri(a, c, b, 'verkko', [0, a[1], -1]);
      k.push(et, et2);
      const taka = (v) => [v[0], v[1], v[2] - 0.012];
      k.push(tri(taka(a), taka(b), taka(c), 'verkko', [0, a[1], 1]), tri(taka(a), taka(c), taka(d), 'verkko', [0, a[1], 1]));
    }
  }
  return k;
}

/**
 * Kello: pieni kirkonkello orressa kahden pylvään varassa. Mitat (m): leveys (u) 0,9 (pylväiden keskiväli), orren
 * yläreuna 1,1, kellon korkeus 0,4, suun halkaisija 0,44 (suu y ≈ 0,57). Origo: telineen pohjan keskipiste
 * lattialla; orsi kulkee u-suunnassa, etupuoli w+. Roolit: puu (teline, orsi), rauta (ripustus, kieli),
 * kello (pronssi, kupari).
 */
export function kello({ leveys = 0.9, korkeus = 1.1 } = {}) {
  const lu = leveys / 2, k = [];
  for (const s of [-1, 1]) {
    k.push(...L(s * lu - 0.04, s * lu + 0.04, 0, korkeus, -0.04, 0.04, SIVUT('puu')));
    k.push(...L(s * lu - 0.05, s * lu + 0.05, 0, 0.06, -0.24, 0.24, SIVUT('puu')));
  }
  k.push(...L(-lu - 0.06, lu + 0.06, korkeus - 0.08, korkeus, -0.045, 0.045, KAIKKI('puu')));
  const yy = korkeus - 0.08, yh = yy - 0.05, korkeusK = 0.4;
  k.push(...L(-0.04, 0.04, yy - 0.03, yy, -0.03, 0.03, SIVUT('rauta')));
  k.push(...L(-0.015, 0.015, yy - 0.09, yy - 0.03, -0.015, 0.015, SIVUT('rauta')));
  const alaY = yh - korkeusK, y0 = alaY;
  const ulko = [[0.22, 0], [0.205, 0.03], [0.15, 0.1], [0.1, 0.19], [0.085, 0.27], [0.07, 0.34], [0.03, 0.385], [0.0, 0.4]];
  const kel = sorvi(ulko.map(([r, y]) => [r, y + y0]), 12, 'kello');
  kel.push(...rengas({ rSisa: 0.2, rUlko: 0.22, y: y0, segmentit: 12, ylos: false, rooli: 'kello' }));
  kel.push(...sorvi([[0.2, y0], [0.175, y0 + 0.12], [0.07, y0 + 0.28], [0.0, y0 + 0.34]].map(([r, y]) => [r, y]), 12, 'kello', { sisa: true }));
  k.push(...kel);
  k.push(...putki([0, y0 + 0.28, 0], [0, y0 - 0.02, 0], 0.01, 0.014, 6, 'rauta'));
  k.push(...putki([0, y0 + 0.28, 0], [0, y0 + 0.335, 0], 0.01, 0.01, 6, 'rauta'));
  return k;
}

/**
 * Jalkajousi: 1–2 jalkajousta seinätelineessä. SEINÄÄN KIINNITETTÄVÄ: origo = telineen taustalaudan keskipiste
 * seinän pinnalla (w = 0), kaikki w ≥ 0 (etupuoli w+); jouset ovat pystyssä (tukki y-suunnassa, jousi
 * vaakana u-suunnassa yläpäässä). Mitat (m): taustalauta 1,1 × 0,84 × 0,03 (2 kpl; 0,6 × 0,84 yhdellä),
 * jousen tukki 0,62 pitkä, jousivarsi 0,48 leveä. Roolit: puu (tausta, tukki), lapa (jousi), rauta (jalustin,
 * hakaset), janne (jänne, kangas).
 */
export function jalkajousi({ kpl = 2 } = {}) {
  const n = Math.max(1, Math.min(2, Math.round(kpl))), lev = n === 2 ? 1.1 : 0.6, k = [];
  k.push(...L(-lev / 2, lev / 2, -0.42, 0.42, 0, 0.03, { etu: 'puu', yla: 'puu', ala: 'puu', vasen: 'puu', oikea: 'puu' }));
  for (let i = 0; i < n; i++) {
    const u = n === 2 ? (i === 0 ? -0.28 : 0.28) : 0;
    k.push(...L(u - 0.025, u + 0.025, -0.32, 0.3, 0.045, 0.095, SIVUT('puu')));
    k.push(...L(u - 0.24, u + 0.24, 0.24, 0.27, 0.06, 0.09, SIVUT('lapa')));
    k.push(...putki([u - 0.24, 0.255, 0.075], [u, 0.2, 0.1], 0.004, 0.004, 4, 'janne'));
    k.push(...putki([u + 0.24, 0.255, 0.075], [u, 0.2, 0.1], 0.004, 0.004, 4, 'janne'));
    for (const y of [-0.16, 0.06]) {
      k.push(...L(u - 0.05, u + 0.05, y - 0.012, y + 0.012, 0.03, 0.1, { etu: 'rauta', yla: 'rauta', ala: 'rauta', vasen: 'rauta', oikea: 'rauta' }));
    }
    const jal = [];
    for (let j = 0; j < 8; j++) {
      const a = j * 45 * RAD;
      jal.push([u + 0.028 * Math.cos(a), 0.31 + 0.028 * Math.sin(a) + 0.028, 0.07]);
    }
    k.push(...polku(jal, 0.005, 4, 'rauta', { suljettu: true }));
  }
  return k;
}

/**
 * Nuolitynnyri: avoin puutynnyri täynnä nuolia (höyhenet ylös). Mitat (m): sade 0,2, korkeus 0,45, nuolet 0,6
 * pitkiä (pohjalta reunan yli ~0,4), 12 kpl, hieman eri kulmissa (siemen 11). Origo: pohjan keskipiste
 * lattialla; symmetrinen. Roolit: puu, vanne (metalli), nuoli (puu), sulka (höyhen, kangas), karki (rauta).
 */
export function nuolitynnyri({ sade = 0.2, korkeus = 0.45, nuolia = 12, siemen = 11 } = {}) {
  const rng = mulberry32(siemen >>> 0), k = tynnyrinRunko(sade, korkeus, 12, { auki: true, sisaPohja: korkeus * 0.4 });
  const n = Math.max(6, Math.min(16, Math.round(nuolia)));
  for (let i = 0; i < n; i++) {
    const a = (i / n) * 2 * Math.PI + rng() * 0.4, r = sade * 0.6 * Math.sqrt(rng());
    const p0 = [r * Math.sin(a), korkeus * 0.4 + 0.02, r * Math.cos(a)];
    const d = yks([(rng() - 0.5) * 0.35, 1, (rng() - 0.5) * 0.35]), pit = 0.6;
    const p1 = sum(p0, kert(d, pit));
    k.push(...putki(p0, p1, 0.004, 0.004, 4, 'nuoli', { paatyA: false, paatyB: false }));
    k.push(...putki(sum(p0, kert(d, 0.0)), sum(p0, kert(d, 0.03)), 0.008, 0.005, 4, 'karki', { paatyA: true, paatyB: false }));
    const sulka = sum(p1, kert(d, -0.06));
    const [e1] = kanta(d);
    for (const s of [-1, 1]) {
      k.push(tri(sum(sulka, kert(e1, 0.002 * s)), sum(p1, kert(e1, 0.024 * s)), sum(p1, kert(e1, 0.002 * s)), 'sulka', sulka));
    }
  }
  return k;
}

export const RESEPTIT = {
  alttari, vihkimisristi, kirkonpenkki, kynttilakruunu, seinasoihtu, lyhty, arkku, keihasteline, kilpi, hakapyssy,
  ruutitynnyri, pelilauta, pulpetti, kirja, koysikieppi, airot, verkko, kello, jalkajousi, nuolitynnyri,
};

export const OLETUSPINNAT = {
  alttari: { kivi: 'kivi', liina: 'kangas' },
  vihkimisristi: { maali: 'punamulta' },
  kirkonpenkki: { puu: 'puu', lankku: 'lankku' },
  kynttilakruunu: { rauta: 'rauta', kynttila: 'vaha' },
  seinasoihtu: { rauta: 'rauta', puu: 'puu', kaare: 'kangas', liekki: 'hiillos' },
  lyhty: { puu: 'puu', rauta: 'rauta', kynttila: 'vaha', liekki: 'hiillos' },
  arkku: { puu: 'puu', kansi: 'lankku', rauta: 'rauta' },
  keihasteline: { puu: 'puu', varsi: 'esine-puu', karki: 'esine-metalli' },
  kilpi: { puu: 'lankku', metalli: 'metalli' },
  hakapyssy: { rauta: 'rauta', puu: 'puu', lukko: 'esine-metalli' },
  ruutitynnyri: { puu: 'puu', vanne: 'metalli', tulppa: 'rauta' },
  pelilauta: { puu: 'puu', ruutu: 'lankku', tumma: 'nahka', noppa: 'rappaus', nappula: 'esine-puu', nappula2: 'rauta' },
  pulpetti: { puu: 'puu', lankku: 'lankku', kansi_nahka: 'nahka', sivut: 'esiliina', muste: 'savi' },
  kirja: { kansi: 'nahka', sivut: 'esiliina', solki: 'esine-metalli' },
  koysikieppi: { koysi: 'kangas' },
  airot: { puu: 'puu', lapa: 'lankku' },
  verkko: { puu: 'puu', verkko: 'kangas' },
  kello: { puu: 'puu', rauta: 'rauta', kello: 'kupari' },
  jalkajousi: { puu: 'puu', lapa: 'lankku', rauta: 'rauta', janne: 'kangas' },
  nuolitynnyri: { puu: 'puu', vanne: 'metalli', nuoli: 'esine-puu', sulka: 'esiliina', karki: 'esine-metalli' },
};
