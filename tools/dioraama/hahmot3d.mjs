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
import { kolmio, nelio, kaaripiste } from './reseptit-apu.mjs';
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
  }
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
  if (vaatteet.hame) {
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
