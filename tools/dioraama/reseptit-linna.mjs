// DIORAAMAN RESEPTIT — LINNA (Linnanrakentaja erä 3, 29.9.2026; speksi docs/raportit/
// dioraama-rajapinnat-era3-20260929.md kohta 2): kiekko, kierreportaat, sakarat, paalu, laiturikansi, vene,
// lippu, rako, kupoli. Kolmiot paikallisessa kehyksessä (u, y, w) oikeakätisenä (kärjet vastapäivään ulkoa
// katsottuna, normaali ulos), kulmasopimus kuten reseptit-rakenne.mjs:ssä (paikallinen kompassikulma 0 = +w,
// 90 = +u; auki-sektorit annetaan MAAILMAN kompassiasteina, paikallinen = maailma − suunta).
import { nelio, kaaripiste, vaippa, rengas, kaanna, laatikko, mulberry32 } from './reseptit-apu.mjs';

const RAD = Math.PI / 180;

/* ==================== Yhteiset apurit ==================== */

function ristitulo(a, b) {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}
function ero(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
function kolmionAla(t) {
  const n = ristitulo(ero(t.p[1], t.p[0]), ero(t.p[2], t.p[0]));
  return 0.5 * Math.hypot(n[0], n[1], n[2]);
}
/** Poistaa surkastuneet kolmiot (esim. kärkeen kutistuvat ruudukon reunat). */
function puhdista(kolmiot) {
  return kolmiot.filter((t) => kolmionAla(t) > 1e-9);
}

/**
 * Nelikulmio a-b-c-d, jonka kiertosuunta valitaan niin, että normaali osoittaa toivottuun suuntaan
 * (vektori, ei tarvitse olla yksikkö). Normaali lasketaan lävistäjien ristitulosta, joten se kestää
 * yhteen kutistuneet kärjet.
 */
function nelioSuuntaan(a, b, c, d, rooli, toivottu) {
  const n = ristitulo(ero(c, a), ero(d, b));
  const piste = n[0] * toivottu[0] + n[1] * toivottu[1] + n[2] * toivottu[2];
  return piste >= 0 ? nelio(a, b, c, d, rooli) : nelio(a, d, c, b, rooli);
}

/** Kompassikulman k (astetta) kasvusuuntainen tangentti (myötäpäivään ylhäältä katsottuna). */
function tangentti(k) { return [Math.cos(k * RAD), 0, -Math.sin(k * RAD)]; }

/**
 * Pystysuora pinta kulmassa k, säteellä r0…r1, korkeudella y0…y1; s = +1: normaali kasvavaan kulmaan,
 * s = −1: pienenevään kulmaan.
 */
function pystyPinta(k, r0, r1, y0, y1, s, rooli) {
  const t = tangentti(k);
  return nelioSuuntaan(
    kaaripiste([0, 0], r0, k, y0), kaaripiste([0, 0], r1, k, y0),
    kaaripiste([0, 0], r1, k, y1), kaaripiste([0, 0], r0, k, y1),
    rooli, [t[0] * s, 0, t[2] * s],
  );
}

/**
 * Auki-sektori (maailman kompassiasteet) → jäljelle jäävä kaari paikallisessa kehyksessä. k0 = sektorin LOPPU
 * (materiaali alkaa), k1 = sektorin ALKU (+ n·360; materiaali loppuu); kuten tornissa. Ilman aukia 0…360.
 */
function sektori(auki, suunta) {
  if (!auki) return { k0: 0, k1: 360, alkuL: null, loppuL: null };
  const alkuL = auki.alku - (suunta || 0), loppuL = auki.loppu - (suunta || 0);
  const k0 = loppuL;
  let k1 = alkuL;
  while (k1 <= k0) k1 += 360;
  while (k1 - k0 > 360) k1 -= 360;
  return { k0, k1, alkuL: k1, loppuL: k0 };
}

/* ==================== kiekko ==================== */

/**
 * Kiekko: pyöreä lattia/katto, y −paksuus…0, säde sade. Roolit yla (+y), ala (−y), sivu (ulkoreuna); auki-sektori
 * (maailman kompassiasteet) poistetaan ja sektorin reunoille tulee pystysuorat pinnat rooliin 'leikkaus'.
 */
export function kiekko(param) {
  const sade = param.sade, paksuus = param.paksuus ?? 0.3, segmentit = param.segmentit ?? 32;
  const { k0, k1, alkuL, loppuL } = sektori(param.auki, param.suunta);
  const k = [];
  k.push(...rengas({ rUlko: sade, y: 0, k0, k1, segmentit, ylos: true, rooli: 'yla' }));
  k.push(...rengas({ rUlko: sade, y: -paksuus, k0, k1, segmentit, ylos: false, rooli: 'ala' }));
  k.push(...vaippa({ r: sade, y0: -paksuus, y1: 0, k0, k1, segmentit, ulos: true, rooli: 'sivu' }));
  if (param.auki) {
    k.push(...pystyPinta(alkuL, 0, sade, -paksuus, 0, 1, 'leikkaus'));
    k.push(...pystyPinta(loppuL, 0, sade, -paksuus, 0, -1, 'leikkaus'));
  }
  return k;
}

/* ==================== kierreportaat ==================== */

/** Portaiden mitat: kulma per askel (astetta) valitaan niin, että syvyys keskisäteellä on ≈ 0,3 m. */
function kierreMitat(param) {
  const si = param.sadeSisa ?? 0, su = param.sadeUlko, N = param.askelmat;
  const rk = (si + su) / 2;
  const dk = param.kierrokset != null ? 360 * param.kierrokset / N : 0.3 / rk / RAD;
  return { si, su, N, rk, dk, h: param.korkeus / N, kierto: param.kierto ?? 1, alku: param.alkukulma ?? 0 };
}

/**
 * Kierreportaat: kiilamaiset askelmat nousevat kulmaa pitkin (kierto 1 = kompassikulma kasvaa noustessa eli
 * myötäpäivään ylhäältä katsottuna). Askel i on umpinainen kappale y = 0…(i + 1)·korkeus/askelmat: yläpinta,
 * ulko- ja sisäkehä, pohja sekä takareuna (nousu edellisen askelman yläpinnasta); viimeiselle myös etureuna.
 * Kaikki rooliin 'askel'. Jos `kierrokset` on annettu, kulma per askel = 360·kierrokset/askelmat.
 */
export function kierreportaat(param) {
  const m = kierreMitat(param);
  const kulmaSeg = 360 / m.dk * 0.999; // yksi segmentti per askel (ceil(0,999) = 1)
  const k = [];
  for (let i = 0; i < m.N; i++) {
    const ka = m.alku + m.kierto * i * m.dk, kb = ka + m.kierto * m.dk;
    const k0 = Math.min(ka, kb), k1 = Math.max(ka, kb);
    const yYla = (i + 1) * m.h, yEd = i * m.h;
    k.push(...rengas({ rSisa: m.si, rUlko: m.su, y: yYla, k0, k1, segmentit: kulmaSeg, ylos: true, rooli: 'askel' }));
    k.push(...rengas({ rSisa: m.si, rUlko: m.su, y: 0, k0, k1, segmentit: kulmaSeg, ylos: false, rooli: 'askel' }));
    k.push(...vaippa({ r: m.su, y0: 0, y1: yYla, k0, k1, segmentit: kulmaSeg, ulos: true, rooli: 'askel' }));
    if (m.si > 0) {
      k.push(...vaippa({ r: m.si, y0: 0, y1: yYla, k0, k1, segmentit: kulmaSeg, ulos: false, rooli: 'askel' }));
    }
    // Takareuna (matkan alkupää): normaali kulkusuuntaa vastaan; nousu alkaa edellisen askelman yläpinnasta.
    k.push(...pystyPinta(ka, m.si, m.su, yEd, yYla, -m.kierto, 'askel'));
    if (i === m.N - 1) k.push(...pystyPinta(kb, m.si, m.su, 0, yYla, m.kierto, 'askel'));
  }
  return puhdista(k);
}

/**
 * Keskisäteen piste portaan pinnalla osuudella s01 ∈ [0, 1]: 0 = alimman askelman keskikohta (yläpinta
 * y = korkeus/askelmat), 1 = ylimmän askelman keskikohta (y = korkeus). Korkeus kasvaa lineaarisesti askelten
 * yli (tasainen kävelyreitti), kulma seuraa askelten keskikohtia. Palauttaa [u, y, w].
 */
export function kierrePiste(param, s01) {
  const m = kierreMitat(param);
  const s = Math.min(1, Math.max(0, s01));
  const idx = s * (m.N - 1);
  const kulma = m.alku + m.kierto * (idx + 0.5) * m.dk;
  const p = kaaripiste([0, 0], m.rk, kulma, (idx + 1) * m.h);
  return [p[0], p[1], p[2]];
}

/* ==================== sakarat, paalu, laiturikansi, rako ==================== */

/**
 * Sakarat: hammasrivi u-akselilla keskitettynä (u ±pituus/2), y 0…korkeus, w ±paksuus/2. Hampaita on niin monta,
 * että väli on lähellä vali-arvoa; jaettu tasan niin, että ensimmäinen ja viimeinen hammas ovat rivin päissä.
 * Suljetut särmiöt ilman pohjaa, rooli 'kivi'.
 */
export function sakarat(param) {
  const pituus = param.pituus, korkeus = param.korkeus ?? 0.9, leveys = param.leveys ?? 0.8;
  const vali = param.vali ?? 0.7, paksuus = param.paksuus ?? 0.6;
  const maxN = Math.max(1, Math.floor(pituus / leveys));
  const n = Math.min(maxN, Math.max(2, Math.round((pituus + vali) / (leveys + vali))));
  const k = [];
  const roolit = { yla: 'kivi', etu: 'kivi', taka: 'kivi', vasen: 'kivi', oikea: 'kivi' };
  if (n === 1) {
    const l = Math.min(leveys, pituus);
    return laatikko({ u0: -l / 2, u1: l / 2, y0: 0, y1: korkeus, w0: -paksuus / 2, w1: paksuus / 2 }, roolit);
  }
  const rako = (pituus - n * leveys) / (n - 1);
  for (let i = 0; i < n; i++) {
    const u0 = -pituus / 2 + i * (leveys + rako);
    k.push(...laatikko({ u0, u1: u0 + leveys, y0: 0, y1: korkeus, w0: -paksuus / 2, w1: paksuus / 2 }, roolit));
  }
  return k;
}

/** Paalu: pystypaalu (8 segmenttiä), y 0…korkeus, yläpää umpinainen, rooli 'puu'. */
export function paalu(param) {
  const sade = param.sade ?? 0.15, korkeus = param.korkeus;
  return [
    ...vaippa({ r: sade, y0: 0, y1: korkeus, segmentit: 8, ulos: true, rooli: 'puu' }),
    ...rengas({ rUlko: sade, y: korkeus, segmentit: 8, ylos: true, rooli: 'puu' }),
  ];
}

/**
 * Laiturikansi: lankut u-suunnassa (jokainen lankku kulkee koko leveyden yli), asetettuina peräkkäin w-suunnassa
 * (w ±pituus/2), yläpinta y = 0 (pieni deterministinen korkeusvaihtelu alaspäin), paksuus alaspäin. Lankkujen
 * välissä 1 cm rako. Jokainen lankku oma `osa` (rakenna.mjs arpoo sävyn kuten lankkulattialla), rooli 'lankku'.
 */
export function laiturikansi(param) {
  const leveys = param.leveys, pituus = param.pituus, paksuus = param.paksuus ?? 0.12;
  const rako = 0.01, tavoite = 0.18;
  const n = Math.max(1, Math.round(pituus / (tavoite + rako)));
  const lev = (pituus - (n - 1) * rako) / n;
  const rng = mulberry32((param.siemen ?? 1) >>> 0);
  const roolit = { yla: 'lankku', ala: 'lankku', etu: 'lankku', taka: 'lankku', vasen: 'lankku', oikea: 'lankku' };
  const k = [];
  for (let i = 0; i < n; i++) {
    const w0 = -pituus / 2 + i * (lev + rako);
    const y1 = -rng() * 0.006;
    const osa = laatikko({ u0: -leveys / 2, u1: leveys / 2, y0: -paksuus, y1, w0, w1: w0 + lev }, roolit);
    for (const t of osa) t.osa = `${param.siemen ?? 1}:${i}`;
    k.push(...osa);
  }
  return k;
}

/**
 * Rako: ampumarako, ohut tumma levy (paksuus 0,02) w+ puolella, u ±leveys/2, y 0…korkeus, w 0…0,02.
 * Rooli 'aukko'. Takapinta jää pois (se on seinää vasten).
 */
export function rako(param) {
  const leveys = param.leveys ?? 0.2, korkeus = param.korkeus ?? 1.0;
  return laatikko({ u0: -leveys / 2, u1: leveys / 2, y0: 0, y1: korkeus, w0: 0, w1: 0.02 },
    { yla: 'aukko', etu: 'aukko', vasen: 'aukko', oikea: 'aukko' });
}

/* ==================== lippu ==================== */

/**
 * Lippu: ohut salko (rooli 'salko', 6-sivuinen, y 0…korkeus, sade 0,02) ja lippukangas (rooli 'lippu') salon
 * yläpäässä: kaksipuolinen levy u = 0,02…0,02 + leveys, y = korkeus − lippu … korkeus. Pieni aaltomuoto w-suunnassa
 * u:n funktiona (amplitudi kasvaa salosta poispäin). Etupuolen normaali +w, takapuoli erillisinä kolmioina.
 */
export function lippu(param) {
  const korkeus = param.korkeus ?? 3, leveys = param.leveys ?? 1.2, kangas = param.lippu ?? 0.8;
  const sade = 0.02;
  const k = [
    ...vaippa({ r: sade, y0: 0, y1: korkeus, segmentit: 6, ulos: true, rooli: 'salko' }),
    ...rengas({ rUlko: sade, y: korkeus, segmentit: 6, ylos: true, rooli: 'salko' }),
  ];
  const cols = 8, rows = 2;
  const piste = (i, j) => {
    const s = i / cols;
    return [sade + s * leveys, korkeus - kangas + kangas * j / rows, 0.09 * s * Math.sin(s * Math.PI * 2.2)];
  };
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const etu = nelio(piste(i, j), piste(i + 1, j), piste(i + 1, j + 1), piste(i, j + 1), 'lippu');
      k.push(...etu, ...etu.map(kaanna));
    }
  }
  return puhdista(k);
}

/* ==================== vene ==================== */

/**
 * Vene: soutuvene, pituus w-akselilla (perä −w, keula +w), y 0…korkeus (köli alimmillaan keskellä). Runko on
 * ruudukko poikkileikkausasemista (SEGM asemaa pituussuunnassa × 8 kaarta poikkileikkauksessa): puolielliptinen
 * poikkileikkaus, leveys ja syvyys suipenevat keulaan ja perään, laidat kohoavat päissä. Ulkopinta + laidan
 * yläreuna rooliin 'runko', sisäpinta (seinämä 4 cm, normaali sisään) ja kaksi tuhtoa rooliin 'sisa'.
 */
export function vene(param) {
  const L = param.pituus ?? 5, B = param.leveys ?? 1.5, H = param.korkeus ?? 0.6;
  const SEGM = 16, KAARET = 8, sein = 0.04;
  const asema = (t) => {
    const e = Math.abs(2 * t - 1);
    const ylaY = H * (0.82 + 0.18 * e * e);
    return {
      w: (t - 0.5) * L, ylaY, koliY: ylaY * Math.pow(e, 3),
      b: (B / 2) * Math.pow(1 - Math.pow(e, 2.4), 0.6),
    };
  };
  // Poikkileikkauksen piste kulmalla f (−90…90 astetta): u = b·sin f, y = ylä − (ylä − köli)·cos f.
  const leikkaus = (a, sisa) => {
    const b = sisa ? Math.max(a.b - sein, 0) : a.b;
    const koli = sisa ? Math.min(a.koliY + sein, a.ylaY) : a.koliY;
    const pisteet = [];
    for (let j = 0; j <= KAARET; j++) {
      const f = (-90 + 180 * j / KAARET) * RAD;
      pisteet.push([b * Math.sin(f), a.ylaY - (a.ylaY - koli) * Math.cos(f), a.w]);
    }
    return pisteet;
  };
  const asemat = [];
  for (let i = 0; i <= SEGM; i++) asemat.push(asema(i / SEGM));
  const ulko = asemat.map((a) => leikkaus(a, false)), sisa = asemat.map((a) => leikkaus(a, true));
  const k = [];
  for (let i = 0; i < SEGM; i++) {
    for (let j = 0; j < KAARET; j++) {
      // (i,j), (i,j+1), (i+1,j+1), (i+1,j): ulkopinnalle normaali ulos (tarkistettu köliltä ja sivulta).
      k.push(...nelio(ulko[i][j], ulko[i][j + 1], ulko[i + 1][j + 1], ulko[i + 1][j], 'runko'));
      k.push(...nelio(sisa[i][j], sisa[i][j + 1], sisa[i + 1][j + 1], sisa[i + 1][j], 'sisa').map(kaanna));
    }
    // Laidan yläreuna (ulkoreunasta sisäreunaan), normaali ylös molemmilla laidoilla.
    for (const p of [0, KAARET]) {
      k.push(...nelioSuuntaan(ulko[i][p], ulko[i + 1][p], sisa[i + 1][p], sisa[i][p], 'runko', [0, 1, 0]));
    }
  }
  // Tuhdot: poikittainen lankku sisäpinnan välissä, yläpinta 12 cm laidan yläreunan alapuolella.
  for (const t of [0.35, 0.65]) {
    const a = asema(t);
    const koli = Math.min(a.koliY + sein, a.ylaY), bS = Math.max(a.b - sein, 0);
    const y1 = a.ylaY - 0.12, y0 = y1 - 0.04;
    const cosf = Math.min(1, (a.ylaY - y1) / Math.max(a.ylaY - koli, 1e-6));
    const uS = bS * Math.sqrt(Math.max(0, 1 - cosf * cosf)) * 1.02; // hieman seinämään
    k.push(...laatikko({ u0: -uS, u1: uS, y0, y1, w0: a.w - 0.12, w1: a.w + 0.12 },
      { yla: 'sisa', ala: 'sisa', etu: 'sisa', taka: 'sisa', vasen: 'sisa', oikea: 'sisa' }));
  }
  return puhdista(k);
}

/* ==================== kupoli ==================== */

/**
 * Ellipsikuoren ruudukko (renkaat × kulmat): elevaatio 0…90 astetta, säde a·cos, korkeus h·sin. Kärjillä pehmeä
 * normaali (ulos tai sisään) ja uv_m (a = kulma_rad · pohjasäde, b = kaaren pituus pohjasta).
 */
function kuoriRuudukko({ a, h, sade, k0, k1, n, M, sisaan }) {
  const ruudukko = [];
  let matka = 0, edTheta = 0;
  for (let m = 0; m <= M; m++) {
    const th = (Math.PI / 2) * m / M;
    if (m > 0) {
      const tk = (th + edTheta) / 2; // keskipisteen approksimaatio kaaren pituudelle
      matka += Math.hypot(a * Math.sin(tk), h * Math.cos(tk)) * (th - edTheta);
    }
    edTheta = th;
    let nr = Math.cos(th) / a, ny = Math.sin(th) / h;
    const nl = Math.hypot(nr, ny) || 1;
    nr /= nl; ny /= nl;
    const rivi = [];
    for (let i = 0; i <= n; i++) {
      const kk = k0 + (k1 - k0) * i / n, kr = kk * RAD;
      const s = sisaan ? -1 : 1;
      rivi.push({
        p: kaaripiste([0, 0], a * Math.cos(th), kk, h * Math.sin(th)),
        n: [s * nr * Math.sin(kr), s * ny, s * nr * Math.cos(kr)],
        uv: [kr * sade, matka],
      });
    }
    ruudukko.push(rivi);
  }
  return ruudukko;
}

function ruudukonKolmiot(G, rooli, sisaan) {
  const k = [];
  const kolmiotKarjilla = (a, b, c) => {
    const t = { p: [a.p, b.p, c.p], n: [a.n, b.n, c.n], uv_m: [a.uv, b.uv, c.uv], rooli };
    k.push(sisaan ? kaanna(t) : t);
  };
  for (let m = 0; m < G.length - 1; m++) {
    for (let i = 0; i < G[m].length - 1; i++) {
      const a = G[m][i], b = G[m][i + 1], c = G[m + 1][i + 1], d = G[m + 1][i];
      kolmiotKarjilla(a, b, c);
      kolmiotKarjilla(a, c, d);
    }
  }
  return k;
}

/**
 * Kupoli: pyöreän huoneen holvi. Kuori y 0…korkeus, säde pienenee ylöspäin kuin litistetty puolipallo
 * (ellipsi: pohjasäde sade, huippukorkeus korkeus); seinämä `paksuus` (oletus 0,25). Sisäpinta (normaali
 * alas/sisään) rooliin 'holvi', ulkopinta rooliin 'ulko'; auki-sektori (maailman kompassiasteet) poistetaan ja
 * reunoille tulee 'leikkaus'-pinnat. Pohjarengasta ei tehdä (seinä kantaa). uv_m: a = kulma_rad·sade,
 * b = kaaren pituus pohjasta (sauma ei hitsaudu, ks. torni).
 */
export function kupoli(param) {
  const sade = param.sade, korkeus = param.korkeus;
  const segmentit = param.segmentit ?? 24, paksuus = Math.min(param.paksuus ?? 0.25, sade * 0.5, korkeus * 0.5);
  const { k0, k1, alkuL, loppuL } = sektori(param.auki, param.suunta);
  const n = Math.max(1, Math.ceil(segmentit * (k1 - k0) / 360)), M = param.renkaat ?? 6;
  const ulko = kuoriRuudukko({ a: sade, h: korkeus, sade, k0, k1, n, M, sisaan: false });
  const sisa = kuoriRuudukko({ a: sade - paksuus, h: korkeus - paksuus, sade, k0, k1, n, M, sisaan: true });
  const k = [...ruudukonKolmiot(ulko, 'ulko', false), ...ruudukonKolmiot(sisa, 'holvi', true)];
  if (param.auki) {
    const leikkaa = (i, s, kulma) => {
      const t = tangentti(kulma);
      for (let m = 0; m < M; m++) {
        k.push(...nelioSuuntaan(ulko[m][i].p, ulko[m + 1][i].p, sisa[m + 1][i].p, sisa[m][i].p,
          'leikkaus', [t[0] * s, 0, t[2] * s]));
      }
    };
    leikkaa(n, 1, alkuL); // sektorin ALKU-reuna: materiaali pienemmän kulman puolella
    leikkaa(0, -1, loppuL);
  }
  return puhdista(k);
}

// Rooli → oletuspinta. Instanssin oma `pinnat`-kenttä (reseptit.mjs:n sijoita) ohittaa nämä.
export const OLETUSPINNAT = {
  kiekko: { yla: 'lankku', ala: 'rappaus', sivu: 'leikkaus', leikkaus: 'leikkaus' },
  kierreportaat: { askel: 'kivi' },
  sakarat: { kivi: 'kivi' },
  paalu: { puu: 'puu' },
  laiturikansi: { lankku: 'lankku' },
  vene: { runko: 'puu', sisa: 'lankku' },
  lippu: { salko: 'puu', lippu: 'lippu' },
  rako: { aukko: 'aukko' },
  kupoli: { holvi: 'rappaus', ulko: 'kivi', leikkaus: 'leikkaus' },
};

export const RESEPTIT = { kiekko, kierreportaat, sakarat, paalu, laiturikansi, vene, lippu, rako, kupoli };
