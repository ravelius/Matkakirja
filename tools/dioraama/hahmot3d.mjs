/*
 * DIORAAMAN 3D-PIENOISFIGUURIT (Linnanrakentaja, erä 2b, ali-agentti P4a, 29.9.2026;
 * korjauskierros ali-agentti P4c samana päivänä - museomallin tuntu, ks. mitat()in
 * ja rakennaVartalo/rakennaEsiliina/rakennaHame/rakennaPaahine-funktioiden P4c-kommentit).
 * Speksi: docs/raportit/dioraama-rajapinnat-era2b-20260929.md kohta 4 "3D-HAHMOT".
 *
 * teeHahmo3d(henkiloId, henkilo) -> { solmut: [{ nimi, vanhempi, paikka, osat }] }
 *   solmut = 16 niveltä speksin nimin (lantio=juuri, muut _v/_o-pareina).
 *   paikka = [x,y,z] SUHTEESSA VANHEMPAAN (juurella suhteessa hahmon origoon,
 *   joka on jalkojen kohdalla, y=0 — juurella ei ole vanhempaa). osat =
 *   [{ pinta, vari, paikat, normaalit, kolmiot }] (per pinta TÄSSÄ solmussa).
 *   HUOM: uv ja COLOR_0 EIVÄT ole tässä — kirjoitaMonisolmuGlb (glb.mjs)
 *   synteesoi ne (TEXCOORD_0 = (0,0), COLOR_0 R=AO=1,G=lämpö=0,B=osan
 *   satunnaisluku) koska pienoisfiguuri on yksivärinen maalattu osa.
 *
 * Mittasuhteet: mittasuhteet-kentän 4 lukua (pituus_m/hartiat_m/lantio_m/paa_m,
 * ks. henkilot.js) riittävät — LOPUT (nivelten korkeudet/raajojen pituudet)
 * ovat tässä KIINTEITÄ ihmisvartalon likisuhteita pituus_m:stä (H) sekä
 * hartiat_m/lantio_m/paa_m:stä (HA/LA/PA), ks. mitat()-funktio.
 *
 * Geometria paikallisessa kehyksessä (u, y, w), sama oikeakätinen sopimus kuin
 * reseptit-apu.mjs:ssä (kärjet vastapäivään ulkoa katsottuna). JOKAINEN raaja/
 * pää/kapseli on rakennettu niin, että sen VANHEMPAAN kiinnittyvä kärki/napa on
 * TÄSMÄLLEEN solmun omassa origossa (y=0) — lapsen paikka on SAMA piste, joten
 * saumaan ei jää rakoa (pieni päällekkäisyys pallomaisilla osilla on toivottua).
 *
 * EI SATUNNAISUUTTA, EI KELLOA: puhdas funktio samasta henkilö-oliosta samat
 * tavut aina (testattu tests/dioraama-hahmot3d.test.mjs:ssä).
 */
import {
  kolmio, nelio, kaaripiste, laatikko,
} from './reseptit-apu.mjs';
import { PINNAT } from '../../js/dioraama/pankit/pinnat.js';

const RAD = Math.PI / 180;

// Segmenttimäärät: matala mutta riittää "pyöristetyn maalatun" pienoisfiguurin
// tuntuun ≤ 3000 kolmion budjetissa (ks. raportin kolmioarvio). u = ympäri,
// v = navasta napaan (koko pallolle) tai navasta ekvaattorille (puolikkaalle).
// P4c (29.9.2026, korjauskierros): raaja u 8->10 (vähemmän särmikäs raaja) ja
// UUSI runko-taso (u=14) vartalolle/lantiolle/helmoille - isoimmat siluetit
// näkyvät eniten "laatikkomaisena", pieni lisäys kolmioihin kannattaa siellä.
const SEG = {
  raaja: { u: 10, v: 3 }, // kapselin puolipallo: v riviä 0°->90°
  runko: { u: 14 }, // torso/lantio/helmat/esiliina - suurin ympärysmitta, ei pyöreää päätyä
  paa: { u: 10, v: 7 }, // koko pallo: v riviä 0°->180°
  pieni: { u: 6, v: 4 }, // kädet, jalkaterä, myssyn tupsu: koko pallo
  tiny: { u: 5, v: 3 }, // silmät, nenä, nivelten täytepallot: koko pallo
};

/** Kolmion litteä normaali (b-a)x(c-a), normalisoituna. */
function tasonNormaali(a, b, c) {
  const e1 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
  const e2 = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
  const n = [
    e1[1] * e2[2] - e1[2] * e2[1],
    e1[2] * e2[0] - e1[0] * e2[2],
    e1[0] * e2[1] - e1[1] * e2[0],
  ];
  const l = Math.hypot(n[0], n[1], n[2]) || 1;
  return [n[0] / l, n[1] / l, n[2] / l];
}

/** Säteen suuntainen (origosta) normaali pisteeseen p — oikea pallolle. */
function sateenNormaali(p) {
  const l = Math.hypot(p[0], p[1], p[2]) || 1;
  return [p[0] / l, p[1] / l, p[2] / l];
}

/**
 * Pallovyöhyke origo-keskeisenä: kulmaYla/kulmaAla asteina navasta (0 = +y-napa,
 * 180 = -y-napa). Pehmeät (säteen suuntaiset) normaalit. Navalla rengas surkastuu
 * pisteeksi -> nelio() tuottaa yhden surkastuneen (pinta-ala 0) kolmion per
 * sektori, mikä on harmiton (ei näy, budjetissa reilusti varaa).
 */
function palloVyohyke({ r, segU, segV, kulmaYla = 0, kulmaAla = 180, rooli }) {
  const renkaat = [];
  for (let i = 0; i <= segV; i++) {
    const kulma = kulmaYla + (kulmaAla - kulmaYla) * (i / segV);
    const y = r * Math.cos(kulma * RAD);
    const rr = r * Math.sin(kulma * RAD);
    const rengas = [];
    for (let j = 0; j < segU; j++) rengas.push(kaaripiste([0, 0], rr, (j * 360) / segU, y));
    renkaat.push(rengas);
  }
  const kolmiot = [];
  for (let i = 0; i < segV; i++) {
    for (let j = 0; j < segU; j++) {
      const jn = (j + 1) % segU;
      // Järjestys (ylempi[j], alempi[j], alempi[jn], ylempi[jn]) tarkistettu
      // erikseen (ristitulo ulospäin säteeseen nähden) - ks. tiedoston kommentti.
      const a0 = renkaat[i][j]; const a1 = renkaat[i + 1][j];
      const b1 = renkaat[i + 1][jn]; const b0 = renkaat[i][jn];
      kolmiot.push(...nelio(a0, a1, b1, b0, rooli,
        [sateenNormaali(a0), sateenNormaali(a1), sateenNormaali(b1), sateenNormaali(b0)]));
    }
  }
  return kolmiot;
}

/** Koko pallo origossa, säde r. */
export function pallo({ r, segU, segV, rooli }) {
  return palloVyohyke({ r, segU, segV, kulmaYla: 0, kulmaAla: 180, rooli });
}

/**
 * Kartion/lieriön vaippa origo-akselilla: säde r0 korkeudella y0, r1 korkeudella
 * y1 (y1 > y0), litteä normaali per kolmio (ei pehmeä - kartion todellinen
 * normaali kallistuu, litteä riittää tälle mittakaavalle/tyylille). k0/k1
 * (oletus 0/360, reseptit-apu.mjs:n kompassikulma, 0=+w=hahmon etu) rajaavat
 * vaipan KAAREKSI koko kehän sijaan (P4c: esiliina/liivi - vain etupaneeli,
 * ei koko vartalon ympäri) - segmenttimäärä skaalautuu kaaren osuuden mukaan
 * niin että täysi kehä (oletus) tuottaa TÄSMÄLLEEN saman kuin ennen.
 */
function kartioVaippa({
  r0, y0, r1, y1, segU, rooli, k0 = 0, k1 = 360,
}) {
  const kaari = k1 - k0;
  const segmentit = Math.max(1, Math.round(segU * (kaari / 360)));
  const kolmiot = [];
  for (let j = 0; j < segmentit; j++) {
    const ka = k0 + (kaari * j) / segmentit; const kb = k0 + (kaari * (j + 1)) / segmentit;
    const yA = kaaripiste([0, 0], r1, ka, y1); const yB = kaaripiste([0, 0], r1, kb, y1);
    const aA = kaaripiste([0, 0], r0, ka, y0); const aB = kaaripiste([0, 0], r0, kb, y0);
    for (const t of nelio(yA, aA, aB, yB, rooli)) {
      const n = tasonNormaali(t.p[0], t.p[1], t.p[2]);
      kolmiot.push({ p: t.p, n: [n, n, n], rooli });
    }
  }
  return kolmiot;
}

/**
 * Moniosainen pyörähdysvaippa: profiili = [{r,y}, ...] MISSÄ TAHANSA y-järjes-
 * tyksessä (esim. vaate kirjoitetaan luontevasti ylhäältä alas, rinnasta
 * polviin) -> kartioVaippa jokaisen peräkkäisen parin välillä. Pehmentää
 * suoran kartion ääriviivan (esim. vartalon "laatikkomainen" särmä) muutamalla
 * lisärenkaalla ilman uutta piirtologiikkaa. k0/k1 kuten kartioVaippa (oletus
 * koko kehä). HUOM (P4c, korjattu bugi): kartioVaippa VAATII y1>y0 (muuten
 * normaalit kääntyvät sisäänpäin - esiliina hävisi kokonaan tämän takia
 * ensimmäisellä kierroksella, koska sen profiili oli kirjoitettu ylhäältä
 * alas) - siksi pari JÄRJESTETÄÄN AINA täällä y:n mukaan ennen kutsua, profiilin
 * omasta kirjoitusjärjestyksestä riippumatta.
 */
function lathe(profiili, segU, rooli, k0 = 0, k1 = 360) {
  const kolmiot = [];
  for (let i = 0; i < profiili.length - 1; i++) {
    const a = profiili[i]; const b = profiili[i + 1];
    const [ala, yla] = a.y <= b.y ? [a, b] : [b, a];
    kolmiot.push(...kartioVaippa({
      r0: ala.r, y0: ala.y, r1: yla.r, y1: yla.y, segU, rooli, k0, k1,
    }));
  }
  return kolmiot;
}

/** Tasainen kiekko (napa keskellä, kiinteä y) - ylospain: true = +y-normaali. */
function kiekko({ r, y, ylospain, segU, rooli }) {
  const keski = [0, y, 0];
  const kolmiot = [];
  for (let j = 0; j < segU; j++) {
    const ka = (j * 360) / segU; const kb = ((j + 1) * 360) / segU;
    const a = kaaripiste([0, 0], r, ka, y); const b = kaaripiste([0, 0], r, kb, y);
    const n = ylospain ? [0, 1, 0] : [0, -1, 0];
    const t = ylospain ? kolmio(keski, a, b, rooli, n, n, n) : kolmio(keski, b, a, rooli, n, n, n);
    kolmiot.push(t);
  }
  return kolmiot;
}

/**
 * Kapeneva kapseli origo-akselilla: pallonpuolisko (r0) + kartiovaippa + pallon-
 * puolisko (r1). Yläpuolisko (r0, VANHEMMAN kiinnityskohta) napa y=0, alapuolisko
 * (r1, LAPSINIVELEN paikka) napa y=-pituus. r0 ≠ r1 -> raaja kapenee tasaisesti
 * KOKO pituudeltaan - EI porrasta nivelessä, kunhan viereisen segmentin vastaava
 * pää käyttää samaa sädettä (ks. mitat(): esim. upperArmR1 == forearmR0).
 * P4c: korvaa entisen kiinteäsäteisen kapseli()in - OHJE "raajasegmentit
 * kapenevina kapseleina".
 */
function kapseliKapeneva({
  r0, r1, pituus, segU, segV, rooli,
}) {
  const ylaY = -r0; // ylemmän puolipallon ekvaattori
  const alaY = -(pituus - r1); // alemman puolipallon ekvaattori
  const yla = palloVyohyke({
    r: r0, segU, segV, kulmaYla: 0, kulmaAla: 90, rooli,
  })
    .map((t) => ({ ...t, p: t.p.map((p) => [p[0], p[1] + ylaY, p[2]]) }));
  const ala = palloVyohyke({
    r: r1, segU, segV, kulmaYla: 90, kulmaAla: 180, rooli,
  })
    .map((t) => ({ ...t, p: t.p.map((p) => [p[0], p[1] + alaY, p[2]]) }));
  const sivu = alaY < ylaY - 1e-6
    ? kartioVaippa({
      r0: r1, y0: alaY, r1: r0, y1: ylaY, segU, rooli,
    })
    : [];
  return [...yla, ...sivu, ...ala];
}

/** Tasapaksu kapseli (erikoistapaus kapseliKapeneva:sta, r0=r1=r) - käsille,
 * jalkaterille ja käsissä pidettäville esineille, joille kapeneminen ei sovi. */
function kapseli({
  r, pituus, segU, segV, rooli,
}) {
  return kapseliKapeneva({
    r0: r, r1: r, pituus, segU, segV, rooli,
  });
}

/** Skaalaa (su,sy,sw) ja siirtää (tu,ty,tw) kolmiojoukon; normaali käänteis-
 * skaalattuna ja uudelleennormalisoituna (oikein myös epäyhtenäiselle skaalalle). */
function skaalaaJaSiirra(kolmiot, [su, sy, sw], [tu, ty, tw]) {
  const skaalaaPiste = (p) => [p[0] * su + tu, p[1] * sy + ty, p[2] * sw + tw];
  const skaalaaNormaali = (n) => {
    const v = [n[0] / su, n[1] / sy, n[2] / sw];
    const l = Math.hypot(v[0], v[1], v[2]) || 1;
    return [v[0] / l, v[1] / l, v[2] / l];
  };
  return kolmiot.map((t) => ({
    ...t,
    p: t.p.map(skaalaaPiste),
    n: t.n.map(skaalaaNormaali),
  }));
}

/** Siirtää kolmiojoukon (ei skaalaa, normaalit pysyvät). */
function siirra(kolmiot, [tu, ty, tw]) {
  return kolmiot.map((t) => ({ ...t, p: t.p.map((p) => [p[0] + tu, p[1] + ty, p[2] + tw]) }));
}

/* ==================== Erä 3: lisäapufunktiot (päähineet, kaapu, esineet) ==================== */

/** Lisää litteän normaalin kolmioille joilla ei ole n:ää (esim. laatikko()n tuotos). */
function litteaksi(kolmiot) {
  return kolmiot.map((t) => {
    if (t.n) return t;
    const n = tasonNormaali(t.p[0], t.p[1], t.p[2]);
    return { ...t, n: [n, n, n] };
  });
}

/**
 * Litteä KAKSIPUOLINEN rengas (lierit): ylä- ja alapinta, rSisa..rUlko, kiinteä y.
 * Materiaalit eivät ole doubleSided, joten kumpikin puoli tehdään omana kolmionaan.
 */
function rengas({
  rSisa, rUlko, y, segU, rooli,
}) {
  const yla = [0, 1, 0]; const ala = [0, -1, 0];
  const kolmiot = [];
  for (let j = 0; j < segU; j++) {
    const ka = (j * 360) / segU; const kb = ((j + 1) * 360) / segU;
    const sA = kaaripiste([0, 0], rSisa, ka, y); const sB = kaaripiste([0, 0], rSisa, kb, y);
    const uA = kaaripiste([0, 0], rUlko, ka, y); const uB = kaaripiste([0, 0], rUlko, kb, y);
    kolmiot.push(kolmio(sA, uA, uB, rooli, yla, yla, yla), kolmio(sA, uB, sB, rooli, yla, yla, yla));
    kolmiot.push(kolmio(sA, uB, uA, rooli, ala, ala, ala), kolmio(sA, sB, uB, rooli, ala, ala, ala));
  }
  return kolmiot;
}

/**
 * Pallovyöhyke KAARENA (k0..k1, kompassikulma, 0 = +w = hahmon etu): kuten
 * palloVyohyke, mutta vain sektori (huppu: etuaukko jää kasvoille). Pehmeät normaalit.
 */
function palloKaari({
  r, segU, segV, kulmaYla = 0, kulmaAla = 180, k0, k1, rooli,
}) {
  const renkaat = [];
  for (let i = 0; i <= segV; i++) {
    const kulma = kulmaYla + (kulmaAla - kulmaYla) * (i / segV);
    const y = r * Math.cos(kulma * RAD);
    const rr = r * Math.sin(kulma * RAD);
    const rengasPisteet = [];
    for (let j = 0; j <= segU; j++) rengasPisteet.push(kaaripiste([0, 0], rr, k0 + ((k1 - k0) * j) / segU, y));
    renkaat.push(rengasPisteet);
  }
  const kolmiot = [];
  for (let i = 0; i < segV; i++) {
    for (let j = 0; j < segU; j++) {
      const a0 = renkaat[i][j]; const a1 = renkaat[i + 1][j];
      const b1 = renkaat[i + 1][j + 1]; const b0 = renkaat[i][j + 1];
      kolmiot.push(...nelio(a0, a1, b1, b0, rooli,
        [sateenNormaali(a0), sateenNormaali(a1), sateenNormaali(b1), sateenNormaali(b0)]));
    }
  }
  return kolmiot;
}

/**
 * Pystyssä oleva rengas (torus) u-y-tasossa (akseli w): avainrengas. keski = [u,y,w],
 * R = renkaan säde, r = putken säde. Kärkijärjestys tarkistettu (b-a)x(d-a) = ulos.
 */
function torusPysty({
  keski, R, r, segU, segV, rooli,
}) {
  const piste = (i, j) => {
    const th = ((i % segU) * 360) / segU; const ph = ((j % segV) * 360) / segV;
    const ulos = [Math.cos(th * RAD) * Math.cos(ph * RAD), Math.sin(th * RAD) * Math.cos(ph * RAD), Math.sin(ph * RAD)];
    return {
      p: [keski[0] + R * Math.cos(th * RAD) + r * ulos[0], keski[1] + R * Math.sin(th * RAD) + r * ulos[1], keski[2] + r * ulos[2]],
      n: ulos,
    };
  };
  const kolmiot = [];
  for (let i = 0; i < segU; i++) {
    for (let j = 0; j < segV; j++) {
      const a = piste(i, j); const b = piste(i + 1, j); const c = piste(i + 1, j + 1); const d = piste(i, j + 1);
      kolmiot.push(...nelio(a.p, b.p, c.p, d.p, rooli, [a.n, b.n, c.n, d.n]));
    }
  }
  return kolmiot;
}

/* ==================== Mittasuhteet ==================== */

/**
 * Johtaa KAIKKI raajojen/vartalon pituudet ja säteet mittasuhteet-oliosta
 * (pituus_m=H, hartiat_m=HA, lantio_m=LA, paa_m=PA). Korkeudet/pituudet
 * ihmisvartalon likisuhteina H:sta (ks. tiedoston alun kommentti); säteet
 * HA/LA/PA:sta. Nivelten MAAILMANKORKEUS (jalat y=0) pysyy lähellä alkuperäistä
 * (lantio/lonkka 0,52H jne.) - vain torsoH/neckH hieman lyhyempiä, koska ISOMPI
 * pää (ks. headR) nostaisi päälaen H:n yli ilman kompensointia.
 *
 * P4c (29.9.2026, korjauskierros): museomallin tuntu vs. nivelnukke -
 * OHJEn mittasuhteet suoraan tästä funktiosta, EI henkilot.js:stä (sitä ei
 * kosketa):
 *  - headR PA:sta 0,5x -> 0,58x: pää n. 1/6,5 pituudesta (oli n. 1/7,4 - "pää
 *    pieni" -vika), vesipoika PA jo isompi -> pysyy edelleen isopäisin.
 *  - Raajat KAPENEVINA (R0=vartalon puoleinen pää, R1=nivelen puoleinen pää),
 *    suoraan H:sta (ei HA/LA:sta) niin että KESKIKOKOISELLE (n. 1,7 m) hahmolle
 *    keskiarvo osuu OHJEen absoluuttisiin tavoitteisiin (olkavarsi ~0,045 m,
 *    reisi ~0,065 m) ja pienempikin hahmo (vesipoika) skaalautuu oikein.
 *    R1 == seuraavan segmentin R0 (kyynärvarsi/säären yläpää) -> EI porrasta
 *    nivelessä edes ennen täyttöpalloa (ks. rakennaVartalo).
 *  - pelvisDrop pienempi (0,06H -> 0,03H): vanha arvo roikkui KAUEMPANA alas
 *    kuin reiden oma pyöristys ylettyi ("rako lonkassa" - suurin yksittäinen
 *    silmin nähtävä vika); loppu paikataan lonkkapallolla.
 */
export function mitat({
  pituus_m: H, hartiat_m: HA, lantio_m: LA, paa_m: PA,
}) {
  return {
    H, HA, LA, PA,
    torsoH: 0.285 * H, neckH: 0.045 * H,
    pelvisDrop: 0.030 * H, pelvisRise: 0.028 * H,
    upperArmL: 0.175 * H, forearmL: 0.145 * H, handL: 0.050 * H,
    thighL: 0.230 * H, shinL: 0.220 * H,
    torsoR0: LA / 2, torsoR1: HA / 2,
    pelvisR: (LA / 2) * 1.08,
    neckR: PA * 0.30,
    headR: PA * 0.58,
    // Raajojen säteet: R0 = vartalon puoleinen pää (paksumpi), R1 = nivelen
    // puoleinen pää (ohuempi) - ks. yllä oleva kommentti.
    upperArmR0: H * 0.0300, upperArmR1: H * 0.0235,
    forearmR0: H * 0.0235, forearmR1: H * 0.0185,
    handR: H * 0.0275,
    thighR0: H * 0.0415, thighR1: H * 0.0330,
    shinR0: H * 0.0330, shinR1: H * 0.0240,
  };
}

/* ==================== Nivelhierarkia ==================== */

/**
 * 16 niveltä speksin nimin ja vanhempisuhteet + paikka SUHTEESSA VANHEMPAAN
 * (juurella "lantio" suhteessa hahmon origoon - ei vanhempaa). Sama järjestys
 * kuin speksissä: lantio, selka, kaula, paa, olka_v, kyynar_v, kasi_v, olka_o,
 * kyynar_o, kasi_o, lonkka_v, polvi_v, nilkka_v, lonkka_o, polvi_o, nilkka_o.
 */
function nivelPuu(m) {
  const kasi = (v) => [
    [`olka_${v}`, 'selka', [(v === 'v' ? 1 : -1) * (m.HA / 2), m.torsoH, 0]],
    [`kyynar_${v}`, `olka_${v}`, [0, -m.upperArmL, 0]],
    [`kasi_${v}`, `kyynar_${v}`, [0, -m.forearmL, 0]],
  ];
  const jalka = (v) => [
    [`lonkka_${v}`, 'lantio', [(v === 'v' ? 1 : -1) * (m.LA / 2), 0, 0]],
    [`polvi_${v}`, `lonkka_${v}`, [0, -m.thighL, 0]],
    [`nilkka_${v}`, `polvi_${v}`, [0, -m.shinL, 0]],
  ];
  return [
    ['lantio', null, [0, 0.52 * m.H, 0]],
    ['selka', 'lantio', [0, 0, 0]],
    ['kaula', 'selka', [0, m.torsoH, 0]],
    ['paa', 'kaula', [0, m.neckH, 0]],
    ...kasi('v'), ...kasi('o'),
    ...jalka('v'), ...jalka('o'),
  ];
}

/* ==================== Osien kokoaja (solmu -> pinta -> kolmiot) ==================== */

function lisaa(kartta, solmu, pinta, kolmiot) {
  if (!kolmiot.length) return;
  let perPinta = kartta.get(solmu);
  if (!perPinta) { perPinta = new Map(); kartta.set(solmu, perPinta); }
  perPinta.set(pinta, [...(perPinta.get(pinta) ?? []), ...kolmiot]);
}

/**
 * Runko + raajat: lantio (lantio-solmu, "vaate2" - vyö/lanne, housujen/hameen/
 * tunikan alla), selkä (KOLME rengasta LA/2:sta HA/2:hen - ei suora kartio,
 * ks. OHJE "vartalo laatikkomainen", "vaate" = paita), kaula+pää ("iho"), olat
 * hihoina KAPENEVINA ("vaate"), kyynärvarret+kädet paljaina KAPENEVINA ("iho",
 * kädet lapasmuotoisina litistettyinä palloina), reidet+säären "vaate2"
 * KAPENEVINA (housut TAI hameen alla näkyvät sukat - ei riipu vaatteet.hame:sta,
 * ks. tiedoston yläkommentti), jalkaterä venytettynä palloa eteenpäin ("kengat").
 * JOKAISEEN raajaniveleen (olka/kyynar/lonkka/polvi) nivelpallo (ks. sen
 * kommentti) - OHJE "ei rakoa missään asennossa ±90°".
 */
function rakennaVartalo(kartta, m) {
  lisaa(kartta, 'lantio', 'vaate2', [
    ...kartioVaippa({
      r0: m.pelvisR, y0: -m.pelvisDrop, r1: m.pelvisR, y1: m.pelvisRise, segU: SEG.runko.u, rooli: 'vaate2',
    }),
    ...kiekko({
      r: m.pelvisR, y: -m.pelvisDrop, ylospain: false, segU: SEG.runko.u, rooli: 'vaate2',
    }),
  ]);
  // Selkä: lantio -> kevyt "kylkiluu"-pyöristys keskellä -> hartiat (EI suora
  // kartio) - pyöreämpi ääriviiva samalla tekniikalla kuin palloVyohyke.
  lisaa(kartta, 'selka', 'vaate', [
    ...lathe([
      { r: m.torsoR0 * 0.97, y: 0 },
      { r: m.torsoR0 * 1.08, y: m.torsoH * 0.4 },
      { r: m.torsoR1, y: m.torsoH },
    ], SEG.runko.u, 'vaate'),
    ...kiekko({
      r: m.torsoR0 * 0.97, y: 0, ylospain: false, segU: SEG.runko.u, rooli: 'vaate',
    }),
    ...kiekko({
      r: m.torsoR1, y: m.torsoH, ylospain: true, segU: SEG.runko.u, rooli: 'vaate',
    }),
  ]);
  lisaa(kartta, 'kaula', 'iho', kartioVaippa({
    r0: m.neckR, y0: 0, r1: m.neckR, y1: m.neckH, segU: SEG.raaja.u, rooli: 'iho',
  }));
  lisaa(kartta, 'paa', 'iho', siirra(pallo({
    r: m.headR, segU: SEG.paa.u, segV: SEG.paa.v, rooli: 'iho',
  }), [0, m.headR, 0]));

  for (const v of ['v', 'o']) {
    lisaa(kartta, `olka_${v}`, 'vaate', [
      ...kapseliKapeneva({
        r0: m.upperArmR0, r1: m.upperArmR1, pituus: m.upperArmL, segU: SEG.raaja.u, segV: SEG.raaja.v, rooli: 'vaate',
      }),
      ...nivelpallo(m.upperArmR0 * 1.55, 'vaate'), // hartian pyöristys (OHJE) - iso, koska
      // torson olkapään KULMA on litteä 14-kulmio (ei pyöreä): ohut pallo jätti raon
      // ±35°/±30°-yhdistelmäkulmissa (OHJEn "tyo"-silmukan hämmennyspoosi paljasti tämän)
    ]);
    lisaa(kartta, `kyynar_${v}`, 'iho', [
      ...kapseliKapeneva({
        r0: m.forearmR0, r1: m.forearmR1, pituus: m.forearmL, segU: SEG.raaja.u, segV: SEG.raaja.v, rooli: 'iho',
      }),
      ...nivelpallo(m.forearmR0 * 1.35, 'iho'), // kyynärpään täyte (OHJE)
    ]);
    lisaa(kartta, `kasi_${v}`, 'iho', skaalaaJaSiirra(
      pallo({ r: m.handR, segU: SEG.pieni.u, segV: SEG.pieni.v, rooli: 'iho' }),
      [1.15, 1.55, 0.8], // lapasmuotoinen: pitkittäin raajan suuntaan, litteä edestä
      [0, -m.handR * 0.75, 0],
    ));
    lisaa(kartta, `lonkka_${v}`, 'vaate2', [
      ...kapseliKapeneva({
        r0: m.thighR0, r1: m.thighR1, pituus: m.thighL, segU: SEG.raaja.u, segV: SEG.raaja.v, rooli: 'vaate2',
      }),
      ...nivelpallo(m.thighR0 * 1.30, 'vaate2'), // lonkan täyte - suurin näkyvä rako ennen korjausta
    ]);
    lisaa(kartta, `polvi_${v}`, 'vaate2', [
      ...kapseliKapeneva({
        r0: m.shinR0, r1: m.shinR1, pituus: m.shinL, segU: SEG.raaja.u, segV: SEG.raaja.v, rooli: 'vaate2',
      }),
      ...nivelpallo(m.shinR0 * 1.35, 'vaate2'), // polven täyte (OHJE)
    ]);
    const jalkaR = m.shinR1 * 1.5;
    lisaa(kartta, `nilkka_${v}`, 'kengat', skaalaaJaSiirra(
      pallo({ r: jalkaR, segU: SEG.pieni.u, segV: SEG.pieni.v, rooli: 'kengat' }),
      [1.0, 0.55, 1.7],
      [0, -jalkaR * 0.5, jalkaR * 0.55],
    ));
  }
}

/**
 * Tunikan helma (lantio-solmu): jatkaa vartalon siluettia lantion alle niille,
 * joilla EI ole hametta (kokki, vesipoika - vaatteet.hame puuttuu/false).
 * OHJE: kokki "polvipituinen villatunika (kartiomainen, levenee alaspäin,
 * vyö)"; vesipoika "reisipituinen tunika". Pituus/leveys/vyö johdetaan
 * OLEMASSA OLEVASTA esiliina-lipusta (EI henkilöID:stä eikä uudesta kentästä,
 * ks. henkilot.js-kommentti "ei uusia kenttiä") - esiliinallinen (kokki) saa
 * polvipituisen helman + vyön, paljas (vesipoika) reisipituisen helman ilman
 * vyötä. Helma alkaa TÄSMÄLLEEN lantiopallon alareunasta (sama säde/korkeus
 * kuin rakennaVartalo:n lantio-kiekko) - ei saumaa/rakoa niiden välissä.
 */
function rakennaTunikanHelma(kartta, m, vaatteet) {
  const polvipituinen = !!vaatteet.esiliina;
  const helmaY = -(polvipituinen ? m.thighL * 0.98 : m.thighL * 0.55);
  const helmaR = m.pelvisR * (polvipituinen ? 1.40 : 1.12); // "levenee alaspäin"
  lisaa(kartta, 'lantio', 'vaate', [
    ...lathe([
      { r: m.pelvisR, y: -m.pelvisDrop },
      { r: helmaR, y: helmaY },
    ], SEG.runko.u, 'vaate'),
    ...kiekko({
      r: helmaR, y: helmaY, ylospain: false, segU: SEG.runko.u, rooli: 'vaate',
    }),
  ]);
  if (polvipituinen) {
    const vyoR = m.pelvisR * 1.14;
    lisaa(kartta, 'lantio', 'vaate2', kartioVaippa({
      r0: vyoR, y0: -m.pelvisRise * 0.25, r1: vyoR, y1: m.pelvisRise * 0.95, segU: SEG.runko.u, rooli: 'vaate2',
    }));
  }
}

/**
 * Kasvot (paa-solmu): nenä (iho-kuhmu), molemmat silmät (tumma "silmat"-pinta)
 * ja posket (lämmin "iho2"-pinta, OHJE "poskille lämmin sävy" - litteä läiskä,
 * ei kuhmu, silmälinjan ALAPUOLELLA ettei sekoitu silmiin).
 */
function rakennaKasvot(kartta, m) {
  const keskiY = m.headR; // pään keskipiste paa-solmun paikallisessa kehyksessä (0, headR, 0)
  const silmaR = m.headR * 0.09;
  for (const puoli of [-1, 1]) {
    const suunta = [0.42 * puoli, 0.10, 0.90];
    const l = Math.hypot(...suunta) || 1;
    const px = (suunta[0] / l) * m.headR * 0.98;
    const py = keskiY + (suunta[1] / l) * m.headR * 0.98;
    const pz = (suunta[2] / l) * m.headR * 0.98;
    lisaa(kartta, 'paa', 'silmat',
      siirra(pallo({ r: silmaR, segU: SEG.tiny.u, segV: SEG.tiny.v, rooli: 'silmat' }), [px, py, pz]));

    const pk = [0.58 * puoli, -0.30, 0.82]; // alempana+ulompana kuin silmä
    const pl = Math.hypot(...pk) || 1;
    const cx = (pk[0] / pl) * m.headR * 0.96;
    const cy = keskiY + (pk[1] / pl) * m.headR * 0.96;
    const cz = (pk[2] / pl) * m.headR * 0.96;
    lisaa(kartta, 'paa', 'iho2', skaalaaJaSiirra(
      pallo({ r: m.headR * 0.22, segU: SEG.tiny.u, segV: SEG.tiny.v, rooli: 'iho2' }),
      [1.1, 0.8, 0.42],
      [cx, cy, cz],
    ));
  }
  const nenaTyvi = [0, keskiY + m.headR * 0.06, m.headR * 0.85];
  lisaa(kartta, 'paa', 'iho', skaalaaJaSiirra(
    pallo({ r: m.headR * 0.13, segU: SEG.tiny.u, segV: SEG.tiny.v, rooli: 'iho' }),
    [0.7, 0.8, 1.4],
    nenaTyvi,
  ));
}

/** Viikset (paa-solmu, VALINNAINEN - OHJE "kokille parta tai viikset
 * valinnaisena", kutsutaan vain kokille teeHahmo3d:ssä): litteä tumma kaari
 * nenän alla, "hiukset"-pinta (ei uutta väriä, säästää materiaalin). */
function rakennaViikset(kartta, m) {
  const y = m.headR + m.headR * 0.015;
  const z = m.headR * 0.93;
  lisaa(kartta, 'paa', 'hiukset', skaalaaJaSiirra(
    pallo({ r: m.headR * 0.17, segU: SEG.tiny.u, segV: SEG.tiny.v, rooli: 'hiukset' }),
    [1.7, 0.42, 0.5],
    [0, y, z],
  ));
}

/**
 * Päähine (paa-solmu, pään keskipiste y=headR). myssy (kokin PYÖREÄ myssy,
 * OHJE - EI korkea hattu): yksi pyöristetty pallonpuolikas päälaen ympärillä
 * + matala reunanauha, pinta "esiliina" (vaalea). huivi (apulaisen huivi):
 * pallonpuolikas PÄÄN päällä + kaareva liepeenpaneeli niskan YLI (peittää
 * hiukset ja niskan, OHJE) - EI enää yksinäinen ylöspäin suippeneva kartio.
 * Molemmat pysyvät kulmaAla<84°:ssa (paitsi liepeenpaneeli, joka roikkuu
 * TAKANA k=180°:n ympärillä - ei kosketa kasvoja). Ei päähinettä (vesipoika)
 * -> hiukset-pallovyöhyke (napa 0°-72°, pysyy silmälinjan (~84°) yläpuolella).
 */
function rakennaPaahine(kartta, m, paahine) {
  if (paahine === 'myssy') {
    const capKulma = 78;
    const capR = m.headR * 1.09;
    const reunaY = m.headR + capR * Math.cos(capKulma * RAD);
    const reunaR = capR * Math.sin(capKulma * RAD);
    lisaa(kartta, 'paa', 'esiliina', [
      ...siirra(palloVyohyke({
        r: capR, segU: SEG.pieni.u, segV: SEG.pieni.v, kulmaYla: 0, kulmaAla: capKulma, rooli: 'esiliina',
      }), [0, m.headR, 0]),
      ...kartioVaippa({
        r0: reunaR * 0.97, y0: reunaY - m.headR * 0.10, r1: reunaR * 1.02, y1: reunaY, segU: SEG.pieni.u, rooli: 'esiliina',
      }),
    ]);
  } else if (paahine === 'huivi') {
    const capKulma = 84;
    const capR = m.headR * 1.07;
    lisaa(kartta, 'paa', 'vaate2', [
      ...siirra(palloVyohyke({
        r: capR, segU: SEG.pieni.u, segV: SEG.pieni.v, kulmaYla: 0, kulmaAla: capKulma, rooli: 'vaate2',
      }), [0, m.headR, 0]),
      // Niskaliepeen paneeli: kaareva, roikkuu päälaen takaosasta (k=180=-w=taka,
      // ks. tiedoston yläkommentti u/w-kehyksestä) niskan yli - "peittää niskan".
      ...kartioVaippa({
        r0: capR * 0.50,
        y0: -m.headR * 0.60,
        r1: capR * 0.98,
        y1: m.headR * 0.65,
        segU: SEG.pieni.u,
        rooli: 'vaate2',
        k0: 112,
        k1: 248,
      }),
    ]);
  } else if (paahine === 'kypara') {
    // Erä 3: kattilakypärä = matala metallikupu + leveä kaksipuolinen lieri. Kupu
    // päättyy 74°:een (silmälinja ~84° jää lierin alle), lieri kupun reunan korkeudella.
    const capR = m.headR * 1.10;
    const reunaY = m.headR + capR * Math.cos(74 * RAD);
    const reunaR = capR * Math.sin(74 * RAD);
    lisaa(kartta, 'paa', 'esine-metalli', [
      ...siirra(palloVyohyke({
        r: capR, segU: SEG.paa.u, segV: 4, kulmaYla: 0, kulmaAla: 74, rooli: 'esine-metalli',
      }), [0, m.headR, 0]),
      ...rengas({
        rSisa: reunaR * 0.99, rUlko: m.headR * 1.75, y: reunaY, segU: SEG.paa.u, rooli: 'esine-metalli',
      }),
    ]);
  } else if (paahine === 'hattu') {
    // Erä 3: leveälierinen huopahattu ('vaate2' = tumma): loivasti kapeneva kruunu
    // + kaksipuolinen lieri silmälinjan yläpuolella (y = 1,28 headR, silmät ~1,10).
    const h = m.headR;
    lisaa(kartta, 'paa', 'vaate2', [
      ...lathe([
        { r: h * 1.07, y: h * 1.28 },
        { r: h * 1.02, y: h * 1.62 },
        { r: h * 0.86, y: h * 2.14 },
      ], SEG.paa.u, 'vaate2'),
      ...kiekko({
        r: h * 0.86, y: h * 2.14, ylospain: true, segU: SEG.paa.u, rooli: 'vaate2',
      }),
      ...rengas({
        rSisa: h * 1.05, rUlko: h * 1.95, y: h * 1.28, segU: SEG.paa.u, rooli: 'vaate2',
      }),
    ]);
  } else if (paahine === 'huppu') {
    // Erä 3: päätä myötäilevä huppu: pallokaari päälaelta korvien alle, etuaukko
    // (k = -55..55) jää kasvoille, + niskaan/hartioille laskeutuva kaapuosa (k 90..270).
    const h = m.headR;
    lisaa(kartta, 'paa', 'vaate', [
      ...siirra(palloKaari({
        r: h * 1.08, segU: SEG.paa.u, segV: 6, kulmaYla: 0, kulmaAla: 102, k0: 55, k1: 305, rooli: 'vaate',
      }), [0, h, 0]),
      ...kartioVaippa({
        r0: h * 1.32, y0: -h * 0.55, r1: h * 1.02, y1: h * 0.35, segU: SEG.paa.u, rooli: 'vaate', k0: 90, k1: 270,
      }),
    ]);
  } else if (paahine === 'lakki') {
    // Erä 3: papin musta pyöreä lakki ('vaate2' - kappalaisella tumma/musta) + pieni nuppi.
    const h = m.headR;
    const capR = h * 1.06;
    const reunaY = h + capR * Math.cos(66 * RAD);
    lisaa(kartta, 'paa', 'vaate2', [
      ...siirra(palloVyohyke({
        r: capR, segU: SEG.paa.u, segV: 4, kulmaYla: 0, kulmaAla: 66, rooli: 'vaate2',
      }), [0, h, 0]),
      ...kartioVaippa({
        r0: capR * Math.sin(66 * RAD) * 1.03, y0: reunaY - h * 0.08, r1: capR * Math.sin(66 * RAD), y1: reunaY, segU: SEG.paa.u, rooli: 'vaate2',
      }),
      ...siirra(pallo({
        r: h * 0.12, segU: SEG.tiny.u, segV: SEG.tiny.v, rooli: 'vaate2',
      }), [0, h + capR + h * 0.04, 0]),
    ]);
  } else {
    lisaa(kartta, 'paa', 'hiukset', siirra(
      palloVyohyke({
        r: m.headR * 1.04, segU: SEG.pieni.u, segV: SEG.pieni.v, kulmaYla: 0, kulmaAla: 72, rooli: 'hiukset',
      }),
      [0, m.headR, 0],
    ));
  }
}

/**
 * Esiliina (lantio-solmu - EI selkä: OHJE "yhtenäinen paneeli rinnasta
 * polviin" ylittää lantion, ja lantio on juuri/ei kallistu kuten selkä
 * hieman tekee eräissä liikesilmukoissa - paneeli ei siis koskaan reväise).
 * Kolme rengasta (rinta -> vyötärö -> polvi) hieman vartaloa/tunikaa
 * leveämmällä säteellä, jotta näkyy selvästi PÄÄLLÄ eikä uppoa vaatteeseen.
 * VAIN etukaari (±62° rintamasuunnasta, k=0=+w, ks. tiedoston yläkommentti)
 * - EI enää irrallinen soikio.
 */
function rakennaEsiliina(kartta, m) {
  const rintaY = m.torsoH * 0.72;
  const torsoRRinnalla = m.torsoR0 + (m.torsoR1 - m.torsoR0) * 0.72;
  // Säteet reilusti ALLA olevaa vaatetta (vyö/tunikan helma/hame) suurempia
  // JOKAISESSA kolmesta korkeudesta - OHJE: kokin tunika LEVENEE alaspäin aina
  // 1,40x pelvisR:ään asti (ks. rakennaTunikanHelma), joten esiliinankin on
  // levittävä sen mukana eikä kaventuva, tai altaolevat kangas pilkistää läpi
  // rivissä olevina "sahalaitoina" polkujen (chord vs. kaari) välistä.
  lisaa(kartta, 'lantio', 'esiliina', lathe([
    { r: torsoRRinnalla * 1.16, y: rintaY },
    { r: m.pelvisR * 1.30, y: 0 }, // vyön (1,14x) päällä
    { r: m.pelvisR * 1.50, y: -m.thighL * 0.92 }, // tunikan helman (1,40x) päällä
  ], SEG.runko.u, 'esiliina', -62, 62));
}

/** Hame (lantio-solmu): leviävä kartio vyötäröltä NILKKOIHIN (OHJE "mekko...
 * peittää jalat" - ei enää pysähdy reiteen). Kolme rengasta (vyötärö -> pohje
 * -> nilkka) suoran kartion sijaan (pehmeämpi siluetti, sama tekniikka kuin
 * selän lathe), isompi segU (SEG.runko) korjaa alareunan "sahalaitaisuuden". */
function rakennaHame(kartta, m) {
  const nilkkaY = -(m.thighL + m.shinL) * 0.94;
  const helmaR = m.LA * 0.80;
  lisaa(kartta, 'lantio', 'vaate2', [
    ...lathe([
      { r: m.pelvisR * 1.05, y: 0 },
      { r: m.LA * 0.62, y: -m.thighL * 0.85 },
      { r: helmaR, y: nilkkaY },
    ], SEG.runko.u, 'vaate2'),
    ...kiekko({
      r: helmaR, y: nilkkaY, ylospain: false, segU: SEG.runko.u, rooli: 'vaate2',
    }),
  ]);
}

/**
 * Kaapu (erä 3, vaatteet.kaapu): nilkkapituinen, kartiomainen 'vaate'-hame vyötäröltä
 * nilkkoihin + leveät hihat kyynärvarsien ympärille. Housut (reidet/sääret 'vaate2')
 * jäävät kaavun sisään; hame korvaa tunikan helman ja hameen (ks. teeHahmo3d).
 */
function rakennaKaapu(kartta, m) {
  const nilkkaY = -(m.thighL + m.shinL) * 0.97;
  const helmaR = m.LA * 0.98;
  lisaa(kartta, 'lantio', 'vaate', [
    ...lathe([
      { r: m.pelvisR * 1.10, y: m.pelvisRise * 0.5 },
      { r: m.LA * 0.68, y: -m.thighL * 0.85 },
      { r: helmaR, y: nilkkaY },
    ], SEG.runko.u, 'vaate'),
    ...kiekko({
      r: helmaR, y: nilkkaY, ylospain: false, segU: SEG.runko.u, rooli: 'vaate',
    }),
  ]);
  for (const v of ['v', 'o']) {
    lisaa(kartta, `kyynar_${v}`, 'vaate', kartioVaippa({
      r0: m.forearmR1 * 2.1, y0: -m.forearmL * 0.94, r1: m.forearmR0 * 1.55, y1: 0, segU: SEG.raaja.u, rooli: 'vaate',
    }));
  }
}

/** Liivi (selka-solmu, VAIN mekkoa käyttävälle - OHJE "liivi"): kapea
 * tummempi "vaate2"-vyöhyke vyötäröltä rintakehän alle, kuin nyöritetty
 * liivi paidan/mekon päällä. */
function rakennaVesti(kartta, m) {
  lisaa(kartta, 'selka', 'vaate2', kartioVaippa({
    r0: m.torsoR0 * 1.06, y0: 0, r1: m.torsoR0 * 1.18, y1: m.torsoH * 0.42, segU: SEG.runko.u, rooli: 'vaate2',
  }));
}

/**
 * Käsissä pidettävä esine (kasi_o-solmu, oikea käsi): kauha = varsi + lusikkapää
 * ("esine-metalli"); sanko = kahva + tynnyrimäinen ämpäri ("esine-puu").
 */
function rakennaEsine(kartta, m, esine) {
  // Sivuun (poispäin kehon keskilinjasta - kasi_o on oikea käsi, -u) + hieman
  // eteen (+w), jotta esine roikkuu selvästi reiden VIERESSÄ eikä sen sisällä/
  // takana (käsi roikkuu suorana kupeen korkeudella, lähellä reittä muuten).
  const uOff = -m.handR * 0.6;
  const wOff = m.handR * 0.45;
  if (esine === 'kauha') {
    const varsiR = m.handR * 0.4; const varsiPituus = m.handL * 2.2;
    lisaa(kartta, 'kasi_o', 'esine-metalli', siirra([
      ...kapseli({
        r: varsiR, pituus: varsiPituus, segU: SEG.tiny.u, segV: SEG.tiny.v, rooli: 'esine-metalli',
      }),
      ...skaalaaJaSiirra(
        pallo({ r: varsiR * 2.6, segU: SEG.pieni.u, segV: SEG.pieni.v, rooli: 'esine-metalli' }),
        [1.0, 0.6, 1.3],
        [0, -varsiPituus - varsiR * 0.6, 0],
      ),
    ], [uOff, 0, wOff]));
  } else if (esine === 'sanko') {
    // Sanko on leveämpi kuin kauhan varsi -> tarvitsee enemmän sivuttaissiirtoa
    // reidestä. OHJE "ei reiden sisällä" - lasketaan TAKUUVARMA rako suoraan
    // mitoista (reiden uloin reuna keskilinjasta vs. käden oma etäisyys, jotka
    // voivat erota HA/LA:n mukaan) sen sijaan että arvottaisiin kerroin, joka
    // sattuisi riittämään vain yhdelle hahmolle.
    const ylaR = m.handR * 1.35; const alaR = m.handR * 1.05; const korkeus = m.handL * 2.8;
    const reidenUloinReuna = m.LA / 2 + m.thighR0;
    const kadenEtaisyysKeskilinjasta = m.HA / 2;
    const lisaSiirto = Math.max(0, reidenUloinReuna - kadenEtaisyysKeskilinjasta + 0.012);
    const sivuOff = [uOff - lisaSiirto - ylaR * 0.5, 0, wOff * 1.6];
    const kahvaY = -m.handL * 1.6;
    lisaa(kartta, 'kasi_o', 'esine-puu', siirra([
      ...kapseli({
        r: m.handR * 0.28, pituus: -kahvaY, segU: SEG.tiny.u, segV: SEG.tiny.v, rooli: 'esine-puu',
      }),
      ...siirra(kartioVaippa({
        r0: alaR, y0: -korkeus, r1: ylaR, y1: 0, segU: SEG.pieni.u, rooli: 'esine-puu',
      }), [0, kahvaY, 0]),
      ...siirra(kiekko({
        r: alaR, y: -korkeus, ylospain: false, segU: SEG.pieni.u, rooli: 'esine-puu',
      }), [0, kahvaY, 0]),
    ], sivuOff));
  } else if (esine === 'keihas' || esine === 'airo') {
    rakennaPystyvarsi(kartta, m, esine);
  } else if (esine === 'kirja') {
    rakennaKirja(kartta, m);
  } else if (esine === 'avaimet') {
    rakennaAvaimet(kartta, m);
  } else if (esine === 'lyhty') {
    rakennaLyhty(kartta, m);
  }
}

/**
 * Käsiesineiden yhteinen paikka (kasi_o-solmun kehys, origo ranteessa): u = sivuun
 * reiden ULKOPUOLELLE (sama takuuvarma rako kuin sangolla: reiden uloin reuna vs.
 * käden etäisyys keskilinjasta), w = hieman eteen. sr = esineen oma säde.
 */
function kadenPaikka(m, sr) {
  const lisa = Math.max(0, m.LA / 2 + m.thighR0 - m.HA / 2 + 0.012);
  return {
    u: -(m.handR * 0.5 + lisa + sr),
    w: m.handR * 0.30,
    kasiY: -m.handR * 0.75,
    // Ranteen korkeus maailmassa (lepoasento) - pystyvarsi ulottuu tästä maahan asti.
    ranneKorkeus: 0.52 * m.H + m.torsoH - m.upperArmL - m.forearmL,
  };
}

/**
 * Pystyssä kädessä pidettävä varsi (erä 3): keihäs = 2,2 m varsi ('esine-puu') +
 * lehtimäinen kärki ja kaulus ('esine-metalli'); airo = 1,75 m varsi + litteä
 * lapa ylhäällä (molemmat 'esine-puu'). Varren alapää ~3 cm maan yläpuolella.
 */
function rakennaPystyvarsi(kartta, m, esine) {
  const keihas = esine === 'keihas';
  const r = keihas ? 0.015 : 0.014;
  const { u, w, ranneKorkeus } = kadenPaikka(m, r);
  const pohja = -ranneKorkeus + 0.03;
  const pituus = keihas ? 2.2 : 1.75;
  const huippu = pohja + pituus;
  lisaa(kartta, 'kasi_o', 'esine-puu', siirra(kapseli({
    r, pituus, segU: 6, segV: 2, rooli: 'esine-puu',
  }), [u, huippu, w]));
  if (keihas) {
    lisaa(kartta, 'kasi_o', 'esine-metalli', siirra([
      ...lathe([
        { r: 0.012, y: -0.02 }, // kaulus varren päällä
        { r: 0.019, y: 0.0 },
        { r: 0.030, y: 0.07 }, // kärjen leveä kohta
        { r: 0.002, y: 0.20 }, // terävä huippu
      ], 6, 'esine-metalli'),
      ...kiekko({
        r: 0.019, y: 0.0, ylospain: false, segU: 6, rooli: 'esine-metalli',
      }),
    ], [u, huippu, w]));
  } else {
    lisaa(kartta, 'kasi_o', 'esine-puu', skaalaaJaSiirra(
      pallo({ r: 1, segU: SEG.pieni.u, segV: SEG.pieni.v, rooli: 'esine-puu' }),
      [0.07, 0.27, 0.013],
      [u, huippu - 0.10, w],
    ));
  }
}

/** Pieni kirja kädessä (erä 3): 'esine-puu'-kannet + vaalea sivunippu ('esiliina'-pinta) etureunassa. */
function rakennaKirja(kartta, m) {
  const t = m.handL * 0.55; const lev = m.handL * 1.35; const kor = m.handL * 2.0;
  const { u, w, kasiY } = kadenPaikka(m, t / 2);
  const y1 = kasiY + kor * 0.30; const y0 = y1 - kor;
  const kaikki = { yla: 1, ala: 1, etu: 1, taka: 1, vasen: 1, oikea: 1 };
  const roolit = (pinta) => Object.fromEntries(Object.keys(kaikki).map((k) => [k, pinta]));
  lisaa(kartta, 'kasi_o', 'esine-puu', litteaksi(laatikko({
    u0: u - t / 2, u1: u + t / 2, y0, y1, w0: w - lev / 2, w1: w + lev / 2,
  }, roolit('esine-puu'))));
  lisaa(kartta, 'kasi_o', 'esiliina', litteaksi(laatikko({
    u0: u - t * 0.36, u1: u + t * 0.36, y0: y0 + 0.006, y1: y1 - 0.006, w0: w - lev / 2 + 0.008, w1: w + lev / 2 + 0.006,
  }, roolit('esiliina'))));
}

/** Avainrengas + kolme avainta kädessä (erä 3, pieni, kaikki 'esine-metalli'). */
function rakennaAvaimet(kartta, m) {
  const { u, w, kasiY } = kadenPaikka(m, 0.03);
  const kaikki = ['yla', 'ala', 'etu', 'taka', 'vasen', 'oikea'];
  const roolit = Object.fromEntries(kaikki.map((k) => [k, 'esine-metalli']));
  const rengasY = kasiY - 0.025;
  const osat = [
    ...torusPysty({
      keski: [u, rengasY, w], R: 0.026, r: 0.005, segU: 8, segV: 4, rooli: 'esine-metalli',
    }),
  ];
  const avaimet = [[-0.014, 0.070], [0.0, 0.058], [0.014, 0.076]];
  for (const [du, pit] of avaimet) {
    const ylaY = rengasY - 0.026;
    osat.push(...litteaksi(laatikko({
      u0: u + du - 0.005, u1: u + du + 0.005, y0: ylaY - pit, y1: ylaY + 0.004, w0: w - 0.004, w1: w + 0.004,
    }, roolit)));
    osat.push(...litteaksi(laatikko({
      u0: u + du - 0.005, u1: u + du + 0.017, y0: ylaY - pit, y1: ylaY - pit + 0.014, w0: w - 0.004, w1: w + 0.004,
    }, roolit))); // avaimen hammas
  }
  lisaa(kartta, 'kasi_o', 'esine-metalli', osat);
}

/**
 * Roikkuva lyhty kädessä (erä 3): metallikehys (kansi, neljä pylvästä, jalusta) +
 * lämmin 'hiillos'-liekki sisällä + ripustuskahva kädestä kanteen.
 */
function rakennaLyhty(kartta, m) {
  const { u, w, kasiY } = kadenPaikka(m, 0.045);
  const yt = kasiY - 0.09; const yb = yt - 0.13; const pylvasR = 0.038;
  const kaikki = ['yla', 'ala', 'etu', 'taka', 'vasen', 'oikea'];
  const roolit = Object.fromEntries(kaikki.map((k) => [k, 'esine-metalli']));
  const osat = [
    // kahva: vaakapalkki kädestä lyhdyn yläpuolelle + pystysilmukka kanteen
    ...litteaksi(laatikko({
      u0: u - 0.004, u1: -0.012, y0: kasiY - 0.008, y1: kasiY, w0: w - 0.004, w1: w + 0.004,
    }, roolit)),
    ...litteaksi(laatikko({
      u0: u - 0.004, u1: u + 0.004, y0: yt + 0.03, y1: kasiY, w0: w - 0.004, w1: w + 0.004,
    }, roolit)),
    // kansi
    ...siirra(lathe([{ r: 0.05, y: yt }, { r: 0.014, y: yt + 0.04 }], 8, 'esine-metalli'), [u, 0, w]),
    ...siirra(kiekko({
      r: 0.05, y: yt, ylospain: false, segU: 8, rooli: 'esine-metalli',
    }), [u, 0, w]),
    // jalusta
    ...siirra([
      ...lathe([{ r: 0.045, y: yb - 0.012 }, { r: 0.045, y: yb }], 8, 'esine-metalli'),
      ...kiekko({
        r: 0.045, y: yb - 0.012, ylospain: false, segU: 8, rooli: 'esine-metalli',
      }),
      ...kiekko({
        r: 0.045, y: yb, ylospain: true, segU: 8, rooli: 'esine-metalli',
      }),
    ], [u, 0, w]),
  ];
  for (const k of [45, 135, 225, 315]) {
    const [pu, , pw] = kaaripiste([0, 0], pylvasR, k, 0);
    osat.push(...litteaksi(laatikko({
      u0: u + pu - 0.004, u1: u + pu + 0.004, y0: yb, y1: yt, w0: w + pw - 0.004, w1: w + pw + 0.004,
    }, roolit)));
  }
  lisaa(kartta, 'kasi_o', 'esine-metalli', osat);
  lisaa(kartta, 'kasi_o', 'hiillos', skaalaaJaSiirra(
    pallo({ r: 0.028, segU: SEG.pieni.u, segV: SEG.pieni.v, rooli: 'hiillos' }),
    [1, 1.5, 1],
    [u, (yt + yb) / 2, w],
  ));
}

/* ==================== Värit ==================== */

/** hahmon vari(pinta) -> henkilön malli3d.varit tai PINNAT-pankin oletus. */
function teeVariHaku(varit) {
  return (pinta) => {
    const oma = varit?.[pinta];
    if (typeof oma === 'string') return oma;
    const oletus = PINNAT[pinta]?.vari;
    if (typeof oletus !== 'string') throw new Error(`teeHahmo3d: pinnalta '${pinta}' puuttuu väri (ei malli3d.varit, ei PINNAT-oletus)`);
    return oletus;
  };
}

/* ==================== Kolmiot -> flat-taulukot (ei kärkien hitsausta) ==================== */

/**
 * Yksi Kolmio-taulukko (sama pinta) -> { pinta, vari, paikat, normaalit, kolmiot }.
 * EI kärkien hitsausta (kolme omaa kärkeä per kolmio) - pienoisfiguurin
 * kolmiomäärä on niin pieni, että hitsauksen säästö ei ole tarpeen, ja tämä
 * pitää tämän tiedoston yksinkertaisena (kirjoitaMonisolmuGlb ei vaadi hitsausta).
 */
function osaksi(pinta, kolmiot, vari) {
  const n = kolmiot.length;
  const paikat = new Float32Array(n * 9);
  const normaalit = new Float32Array(n * 9);
  const idx = new Uint32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const t = kolmiot[i];
    for (let v = 0; v < 3; v++) {
      const o = i * 9 + v * 3;
      paikat[o] = t.p[v][0]; paikat[o + 1] = t.p[v][1]; paikat[o + 2] = t.p[v][2];
      normaalit[o] = t.n[v][0]; normaalit[o + 1] = t.n[v][1]; normaalit[o + 2] = t.n[v][2];
      idx[i * 3 + v] = i * 3 + v;
    }
  }
  return { pinta, vari, paikat, normaalit, kolmiot: idx };
}

/* ==================== teeHahmo3d ==================== */

/**
 * Rakentaa yhden pienoisfiguurin nivelhierarkian ja geometrian HENKILOT-pankin
 * datasta (ks. js/dioraama/pankit/henkilot.js). Puhdas funktio - ei satunnaisuutta,
 * ei sivuvaikutuksia. Heittää selkeän virheen, jos henkilöllä ei ole malli3d-kenttää.
 */
export function teeHahmo3d(henkiloId, henkilo) {
  const malli = henkilo?.malli3d;
  if (!malli) throw new Error(`teeHahmo3d: henkilöllä '${henkiloId}' ei ole malli3d-kenttää`);
  if (!malli.mittasuhteet) throw new Error(`teeHahmo3d: henkilöllä '${henkiloId}' ei ole malli3d.mittasuhteet-kenttää`);
  const m = mitat(malli.mittasuhteet);
  const vaatteet = malli.vaatteet ?? {};
  const vari = teeVariHaku(malli.varit);

  const kartta = new Map(); // solmun nimi -> pinta -> Kolmio[]
  rakennaVartalo(kartta, m);
  rakennaKasvot(kartta, m);
  rakennaPaahine(kartta, m, vaatteet.paahine ?? null);
  if (vaatteet.kaapu) {
    rakennaKaapu(kartta, m); // erä 3: nilkkapituinen kaapu korvaa tunikan/hameen
  } else if (vaatteet.hame) {
    rakennaHame(kartta, m);
    rakennaVesti(kartta, m); // OHJE "liivi" - vain mekkoa käyttävälle
  } else {
    rakennaTunikanHelma(kartta, m, vaatteet); // kokki/vesipoika: tunikan helma lantion alle
  }
  if (vaatteet.esiliina) rakennaEsiliina(kartta, m);
  if (malli.esine) rakennaEsine(kartta, m, malli.esine);
  if (henkiloId === 'kokki-1500') rakennaViikset(kartta, m); // OHJE "valinnaisena"

  const solmut = nivelPuu(m).map(([nimi, vanhempi, paikka]) => {
    const perPinta = kartta.get(nimi);
    const pinnat = perPinta ? [...perPinta.keys()].sort() : [];
    const osat = pinnat.map((pinta) => osaksi(pinta, perPinta.get(pinta), vari(pinta)));
    return { nimi, vanhempi, paikka, osat };
  });
  return { solmut };
}

/** Pieni täyttöpallo nivelen kiinnityskohtaan (LAPSISOLMUN oma origo, y=0) -
 * pysyy paikallaan nivelen kulmasta riippumatta (pallo on kiertosymmetrinen,
 * ja solmun oma origo EI liiku solmun omasta kierrosta - vain vanhemman
 * kierrosta, joka pyörittää koko alipuuta yhtenä kappaleena), joten peittää
 * sauman ±90°:seen asti (OHJE "ei rakoa missään asennossa"). r valitaan
 * isommaksi kuin viereisten segmenttien säde siinä kohdassa (ks. kutsupaikat:
 * olka/kyynar/lonkka/polvi) - sama päättely kuin käden pallolla, joka jo
 * ennestään peittää ranteen (ks. tiedoston nivelkommentti). */
function nivelpallo(r, rooli) {
  return pallo({
    r, segU: SEG.tiny.u, segV: SEG.tiny.v, rooli,
  });
}

/** Kaikkien solmujen/osien kolmiomäärä yhteensä (testeille ja raportille). */
export function laskeKolmiot({ solmut }) {
  let n = 0;
  for (const s of solmut) for (const o of s.osat) n += o.kolmiot.length / 3;
  return n;
}
