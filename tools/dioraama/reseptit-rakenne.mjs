// DIORAAMAN RESEPTIT — RAKENNE (Linnanrakentaja 29.9.2026, ali-agentti C1): laatta, seina, torni,
// porras. Speksi: docs/raportit/dioraama-rajapinnat-20260929.md kohdat 0, 2 ja 3b; erä 2:
// docs/raportit/dioraama-rajapinnat-era2-20260929.md kohta "UV" (torni: ulko/sisä/vyo saavat
// kärjille uv_m:n tasoprojektion sijaan). Rinnakkaiset tiedostot reseptit-maasto.mjs (kartiokatto,
// harjakatto, kallio, vesi) ja reseptit-kalusteet.mjs (kalusteet) kootaan yhteen
// tools/dioraama/reseptit.mjs:ssä (RESEPTIT + OLETUSPINNAT + sijoita).
//
// Jokainen resepti (param) → Kolmio[] paikallisessa kehyksessä (u, y, w), param = koko instanssi
// (mm. paikka, suunta, resepti + reseptikohtaiset parametrit). Kolmiot oikeakätisenä: kärjet
// vastapäivään ulkoa katsottuna eli (p1 − p0) × (p2 − p0) osoittaa ulos. Ks. reseptit-apu.mjs:n
// kommentit apufunktioista ja kulmasopimuksesta (paikallinen kompassikulma 0 = +w, 90 = +u).
import { laatikko, nelio, kaaripiste, vaippa, rengas } from './reseptit-apu.mjs';

const RAD = Math.PI / 180;

/**
 * Laatta: laatikko u ±leveys/2, w ±syvyys/2, y −paksuus…0. Suljettu kuutio (6 sivua): yla, ala,
 * ja kaikki 4 pystysivua rooliin 'sivu'.
 */
export function laatta(param) {
  const leveys = param.leveys, syvyys = param.syvyys, paksuus = param.paksuus ?? 0.4;
  return laatikko(
    { u0: -leveys / 2, u1: leveys / 2, y0: -paksuus, y1: 0, w0: -syvyys / 2, w1: syvyys / 2 },
    { yla: 'yla', ala: 'ala', etu: 'sivu', taka: 'sivu', vasen: 'sivu', oikea: 'sivu' },
  );
}

/**
 * Seina: u ±pituus/2, y 0…korkeus, w ±paksuus/2. Etupinta (w+) 'etu', takapinta (w−) 'taka'.
 * Päädyt (u0/u1) 'paaty', tai 'leikkaus' jos leikkaus.vasen/oikea. Yläpinta 'yla', tai 'leikkaus'
 * jos leikkaus.yla. Aukot [{u, y, leveys, korkeus}] (u = keskikohta, y = alareuna) menevät läpi:
 * etu/taka jaetaan ruudukoksi kaikkien aukkojen reunoista (aukon kohdalla ruutu jätetään pois),
 * ja aukon sisäpinnat (pielet, kynnys, ylätaso) saavat roolin 'pieli'. Ovi (aukko, jonka y = 0)
 * ei tarvitse kynnystä — sen kohdalla ei ole alapuolella seinämateriaalia.
 */
export function seina(param) {
  const pituus = param.pituus, korkeus = param.korkeus, paksuus = param.paksuus;
  const u0 = -pituus / 2, u1 = pituus / 2, w0 = -paksuus / 2, w1 = paksuus / 2, y1 = korkeus;
  const aukot = param.aukot || [];
  const leikkaus = param.leikkaus || {};
  const k = [];

  // Päädyt ja yläpinta: eivät riipu aukoista.
  k.push(...laatikko({ u0, u1, y0: 0, y1, w0, w1 }, {
    vasen: leikkaus.vasen ? 'leikkaus' : 'paaty',
    oikea: leikkaus.oikea ? 'leikkaus' : 'paaty',
    yla: leikkaus.yla ? 'leikkaus' : 'yla',
  }));

  // Etu- ja takapinta ruudukkona: rajaviivat kaikkien aukkojen reunoista + seinän omat reunat.
  const uRajat = new Set([u0, u1]);
  const yRajat = new Set([0, y1]);
  for (const a of aukot) {
    uRajat.add(a.u - a.leveys / 2);
    uRajat.add(a.u + a.leveys / 2);
    yRajat.add(a.y);
    yRajat.add(a.y + a.korkeus);
  }
  const uList = [...uRajat].sort((x, y) => x - y);
  const yList = [...yRajat].sort((x, y) => x - y);
  const aukossa = (uA, uB, yA, yB) => aukot.some((a) => {
    const auL = a.u - a.leveys / 2, auR = a.u + a.leveys / 2, ayB = a.y, ayT = a.y + a.korkeus;
    return uA >= auL - 1e-9 && uB <= auR + 1e-9 && yA >= ayB - 1e-9 && yB <= ayT + 1e-9;
  });
  for (let i = 0; i < uList.length - 1; i++) {
    for (let j = 0; j < yList.length - 1; j++) {
      const uA = uList[i], uB = uList[i + 1], yA = yList[j], yB = yList[j + 1];
      if (uB - uA < 1e-9 || yB - yA < 1e-9 || aukossa(uA, uB, yA, yB)) continue;
      k.push(...nelio([uA, yA, w1], [uB, yA, w1], [uB, yB, w1], [uA, yB, w1], 'etu'));
      k.push(...nelio([uB, yA, w0], [uA, yA, w0], [uA, yB, w0], [uB, yB, w0], 'taka'));
    }
  }

  // Aukkojen sisäpinnat: pielet (pystyt, koko paksuuden läpi), kynnys (jos y > 0) ja ylätaso.
  for (const a of aukot) {
    const uL = a.u - a.leveys / 2, uR = a.u + a.leveys / 2, yB = a.y, yT = a.y + a.korkeus;
    k.push(...nelio([uL, yB, w1], [uL, yB, w0], [uL, yT, w0], [uL, yT, w1], 'pieli')); // vasen pieli, +u
    k.push(...nelio([uR, yB, w0], [uR, yB, w1], [uR, yT, w1], [uR, yT, w0], 'pieli')); // oikea pieli, −u
    if (yB > 1e-9) {
      k.push(...nelio([uL, yB, w1], [uR, yB, w1], [uR, yB, w0], [uL, yB, w0], 'pieli')); // kynnys, +y
    }
    k.push(...nelio([uL, yT, w0], [uR, yT, w0], [uR, yT, w1], [uL, yT, w1], 'pieli')); // ylätaso, −y
  }

  return k;
}

/**
 * Torni: sylinterikuori, ulkosäde sade, sisäsäde sade − paksuus, y 0…korkeus. auki = { alku, loppu }
 * MAAILMAN kompassiasteina (sama kompassi kuin datassa); paikallinen kulma = maailman kulma −
 * param.suunta (reseptit.mjs:n sijoita lisää suunnan takaisin). Auki-sektori poistetaan ulko- ja
 * sisävaipasta sekä kuoren yläreunasta; sektorin reunoille tulee pystysuorat leikkauspinnat
 * rooliin 'leikkaus'. vyo = ulkovaipan osa hieman ulompana (sade + 0,05) rooliin 'vyo', samalla
 * auki-sektorilla leikattuna. Pohjaa ei tehdä (rakennuskone/naapuripalikat hoitavat sen).
 *
 * uv_m (erä 2): ulko/sisä/vyo-kärjet saavat valmiin uv_m:n (a = kulma_rad kertaa sade, sisällä
 * sade − paksuus, b = y) — ks. vaipanUvM. Yläreunan rengas ja leikkauspinnat EIVÄT saa uv_m:ää
 * (jäävät rakennuskoneen tasoprojektioon), koska "b = y" ei sovi vakiokorkeuksiselle levylle.
 */
export function torni(param) {
  const sade = param.sade, korkeus = param.korkeus, paksuus = param.paksuus ?? 2;
  const segmentit = param.segmentit ?? 32;
  const sisa = sade - paksuus;
  const suunta = param.suunta || 0;
  const auki = param.auki || null;
  let k0 = 0, k1 = 360, alkuL, loppuL;
  if (auki) {
    alkuL = auki.alku - suunta;
    loppuL = auki.loppu - suunta;
    k0 = loppuL;
    k1 = alkuL + 360;
  }

  // uv_m vain vaipoille (ulko, sisä, vyo — pystysuorat lieriöpinnat, joilla "b = y" on mielekäs).
  // Yläreunan rengas (litteä, y vakio) ja leikkauspinnat jäävät ennalleen (tasoprojektio).
  const k = [];
  const ulko = vaippa({ r: sade, y0: 0, y1: korkeus, k0, k1, segmentit, ulos: true, rooli: 'ulko' });
  k.push(...liitaUvM(ulko, vaipanUvM(k0, k1, 0, korkeus, segmentit, sade, true)));
  const sisaVaippa = vaippa({ r: sisa, y0: 0, y1: korkeus, k0, k1, segmentit, ulos: false, rooli: 'sisa' });
  k.push(...liitaUvM(sisaVaippa, vaipanUvM(k0, k1, 0, korkeus, segmentit, sisa, false)));
  k.push(...rengas({
    rSisa: sisa, rUlko: sade, y: korkeus, k0, k1, segmentit, ylos: true,
    rooli: auki ? 'leikkaus' : 'ulko',
  }));
  if (auki) {
    k.push(...leikkausSeina(alkuL, sisa, sade, 0, korkeus, true));
    k.push(...leikkausSeina(loppuL, sisa, sade, 0, korkeus, false));
  }
  if (param.vyo) {
    const vy0 = param.vyo.y, vy1 = vy0 + param.vyo.korkeus;
    const vyo = vaippa({
      r: sade + 0.05, y0: vy0, y1: vy1, k0, k1, segmentit, ulos: true, rooli: 'vyo',
    });
    k.push(...liitaUvM(vyo, vaipanUvM(k0, k1, vy0, vy1, segmentit, sade + 0.05, true)));
  }
  return k;
}

/**
 * uv_m (erä 2 -speksin `docs/raportit/dioraama-rajapinnat-era2-20260929.md` kohta "UV") apu.vaippa():n
 * TUOTTAMILLE kolmioille SAMASSA järjestyksessä ja samalla segmenttijaolla: a = kulma (asteina) · RAD ·
 * sade, b = y. Kulmaa EI normalisoida [0, 360):ksi — esim. umpinaisen tornin (k0 = 0, k1 = 360) sauma-
 * kärjet 0° ja 360° ovat samassa maailmanpisteessä mutta saavat silti eri a:n (0 ja 2π·sade), jotta
 * rakenna.mjs:n hitsausavain EI yhdistä niitä ja UV jatkuu oikein koko kierroksen ympäri sen sijaan
 * että viimeinen kolmio kiertyisi takaisin nollaan.
 *
 * Kärkijärjestys per segmentti toistaa TÄSMÄLLEEN apu.vaippa():n sisäisen nelio(a0,b0,b1,a1)-jaon
 * (ulos = true: [a0,b0,b1],[a0,b1,a1]) ja ulos = false -haaran apu.kaanna()-vaihdon (p1 ↔ p2) —
 * muuten uv[i] osoittaisi väärään kärkeen.
 */
function vaipanUvM(k0, k1, y0, y1, segmentit, sade, ulos) {
  const n = Math.max(1, Math.ceil(segmentit * (k1 - k0) / 360));
  const uv = [];
  for (let i = 0; i < n; i++) {
    const ka = k0 + (k1 - k0) * i / n, kb = k0 + (k1 - k0) * (i + 1) / n;
    const a0 = [ka * RAD * sade, y0], b0 = [kb * RAD * sade, y0];
    const a1 = [ka * RAD * sade, y1], b1 = [kb * RAD * sade, y1];
    if (ulos) uv.push([a0, b0, b1], [a0, b1, a1]);
    else uv.push([a0, b1, b0], [a0, a1, b1]);
  }
  return uv;
}

/**
 * Liittää vaipanUvM():n tuottamat uv_m:t samanpituiseen kolmiotaulukkoon (sama järjestys, sama
 * segmenttijako — ks. vaipanUvM). Heittää jos pituudet eroavat, ettei uv_m päädy väärään kärkeen
 * hiljaa.
 */
function liitaUvM(kolmiot, uvLista) {
  if (kolmiot.length !== uvLista.length) {
    throw new Error(`liitaUvM: kolmioiden määrä (${kolmiot.length}) != uv-listan pituus (${uvLista.length})`);
  }
  for (let i = 0; i < kolmiot.length; i++) kolmiot[i].uv_m = uvLista[i];
  return kolmiot;
}

// Pystysuora leikkauspinta tornin auki-sektorin reunalle paikallisessa kulmassa k (astetta),
// säteellä sisa…sade, korkeudella y0…y1. alkureuna = true: sektorin ALKU-reuna (materiaali on
// pienemmän kulman puolella, normaali osoittaa kasvavaan kulmaan eli aukkoon päin); false:
// LOPPU-reuna (materiaali suuremman kulman puolella, normaali osoittaa pienenevään kulmaan).
function leikkausSeina(k, sisa, sade, y0, y1, alkureuna) {
  const A = kaaripiste([0, 0], sisa, k, y0);
  const B = kaaripiste([0, 0], sade, k, y0);
  const C = kaaripiste([0, 0], sade, k, y1);
  const D = kaaripiste([0, 0], sisa, k, y1);
  return alkureuna ? nelio(A, D, C, B, 'leikkaus') : nelio(A, B, C, D, 'leikkaus');
}

/**
 * Porras: leveys (u-suunta), askelmat kpl, nousu (y-askel), etenema (w-askel). Askelmat nousevat
 * kohti +w. Origo = alimman askelman etureunan keskikohta lattiatasolla (u = 0, y = 0, w = 0).
 * Jokainen askel i (0-indeksoitu) tuottaa: ylätaso + 2 sivua laatikon 'yla'/'vasen'/'oikea'-rooleina
 * (laatikko u ±leveys/2, y 0…oma ylätaso, w oman askelman etenemäväli — tämä täyttää sivuprofiilin
 * ilman aukkoja, koska laatikot eivät limity w-suunnassa) ja etupinta (uusi korkeusväli edellisestä
 * askelmasta alkaen, w− puoli — katsoja tulee alhaalta ylöspäin nousten).
 */
export function porras(param) {
  const leveys = param.leveys, askelmat = param.askelmat;
  const nousu = param.nousu ?? 0.18, etenema = param.etenema ?? 0.28;
  const u0 = -leveys / 2, u1 = leveys / 2;
  const k = [];
  for (let i = 0; i < askelmat; i++) {
    const wA = i * etenema, wB = (i + 1) * etenema;
    const yA = i * nousu, yB = (i + 1) * nousu;
    k.push(...laatikko({ u0, u1, y0: 0, y1: yB, w0: wA, w1: wB }, {
      yla: 'askel', vasen: 'askel', oikea: 'askel',
    }));
    k.push(...nelio([u1, yA, wA], [u0, yA, wA], [u0, yB, wA], [u1, yB, wA], 'askel'));
  }
  return k;
}

// Rooli → oletuspinta. Instanssin oma `pinnat`-kenttä (reseptit.mjs:n sijoita) ohittaa nämä.
export const OLETUSPINNAT = {
  laatta: { yla: 'lankku', sivu: 'leikkaus', ala: 'rappaus' },
  seina: { etu: 'kivi', taka: 'rappaus', leikkaus: 'leikkaus', pieli: 'kivi', paaty: 'kivi', yla: 'kivi' },
  torni: { ulko: 'kivi', sisa: 'rappaus', leikkaus: 'leikkaus', vyo: 'tiili' },
  porras: { askel: 'kivi' },
};

export const RESEPTIT = { laatta, seina, torni, porras };
