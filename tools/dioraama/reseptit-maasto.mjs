// DIORAAMAN MAASTORESEPTIT (Linnanrakentaja 29.9.2026, ali-agentti C2): katot ja maasto.
// Speksi: docs/raportit/dioraama-rajapinnat-20260929.md kohdat 0, 2 (kartiokatto, harjakatto,
// kallio, vesi) ja 3b; erä 2: docs/raportit/dioraama-rajapinnat-era2-20260929.md kohta "UV"
// (kartiokatto: pintakolmiot saavat kärjille uv_m:n tasoprojektion sijaan; ks. kartiokatto()).
// Reseptit tuottavat kolmiot paikallisessa kehyksessä (u, y, w),
// oikeakätisenä: kärjet vastapäivään ulkoa katsottuna ((b − a) × (c − a) osoittaa ulos).
// Sisarmoduulit (ei kosketa): reseptit-rakenne.mjs (laatta, seina, torni, porras),
// reseptit-kalusteet.mjs (poyta, penkki, tynnyri, pata, sakki, tulisija, hylly).
import { kolmio, nelio, kaaripiste, rengas, mulberry32 } from './reseptit-apu.mjs';

const RAD = Math.PI / 180;

/**
 * Kartiokatto: kartio pohjasäteellä sade + ylitys tasossa y = 0, huippu (0, korkeus, 0).
 * Kartion pinnan normaali kompassikulmassa k on vakio koko sädelinjan matkalla:
 * normalisoitu (korkeus·sin k, R, korkeus·cos k) — johdettu pinnan tangenttien
 * (kehä- ja sivusuunta) ristitulosta. Lisäksi räystään alapinta (rengas sade…R,
 * alaspäin), rooli 'katto' (litteä sävytys, kattopinnasta poiketen).
 *
 * uv_m (erä 2, speksin kohta "UV"): PINTAKOLMIOIDEN (huippu+kantapisteet, ei räystään alapinta)
 * kärjille a = kulma_rad · pohjasäde (R), b = viistomatka pohjasta (0 kantapisteissä, kartion
 * sivun pituus huipulla). Kulmaa ei normalisoida [0, 360):ksi, joten UV jatkuu koko kierroksen
 * ympäri; sauma 0°/360° ei hitsaudu rakennuskoneessa (eri a). Räystään alapinta on litteä
 * vaakarengas ("b = y" ei sovi sille) ja jää rakennuskoneen tasoprojektioon.
 */
export function kartiokatto(param) {
  const { sade, korkeus, ylitys = 0.6, segmentit = 32 } = param;
  const h = korkeus;
  const R = sade + ylitys;
  const n = Math.max(3, Math.round(segmentit));
  const huippu = [0, h, 0];
  const viistoPituus = Math.hypot(h, R); // kartion sivun (viiston) pituus huipulta kantaan

  const pintaNormaali = (k) => {
    const kr = k * RAD;
    const v = [h * Math.sin(kr), R, h * Math.cos(kr)];
    const l = Math.hypot(v[0], v[1], v[2]) || 1;
    return [v[0] / l, v[1] / l, v[2] / l];
  };
  const kantapiste = (k) => kaaripiste([0, 0], R, k, 0);
  const uvKanta = (k) => [k * RAD * R, 0];
  const uvHuippu = (kMid) => [kMid * RAD * R, viistoPituus];

  const kolmiot = [];
  for (let i = 0; i < n; i++) {
    const k0 = (360 * i) / n;
    const k1 = (360 * (i + 1)) / n;
    const kMid = (k0 + k1) / 2;
    const t = kolmio(
      huippu, kantapiste(k0), kantapiste(k1), 'katto', pintaNormaali(kMid), pintaNormaali(k0), pintaNormaali(k1)
    );
    t.uv_m = [uvHuippu(kMid), uvKanta(k0), uvKanta(k1)];
    kolmiot.push(t);
  }
  // Räystään alapinta: rengas sade…R, alaspäin, sama rooli (EI uv_m, ks. yllä).
  kolmiot.push(...rengas({ rSisa: sade, rUlko: R, y: 0, segmentit: n, ylos: false, rooli: 'katto' }));
  return kolmiot;
}

/**
 * Harjakatto: harja u-akselilla (y = korkeus, w = 0), lappeet w±-puolilta harjalle.
 * Ylitys ulottaa SAMAN kaltevan tason pidemmälle sekä räystäillä (w) että päädyissä (u) —
 * ei kulmanmuutosta ylityksen kohdalla (räystäs jää siksi hieman y = 0:n alapuolelle,
 * kaltevuus jatkuu samana). Päätykolmiot alkuperäisen leveyden kohdalla (ei ylityksen).
 * Lappeille 0,12 m paksuus (erillinen alapinta 'ala'), jotta katto ei ole paperinohut.
 */
export function harjakatto(param) {
  const { leveys, syvyys, korkeus, ylitys = 0.4 } = param;
  const h = korkeus;
  const uHalf = leveys / 2, uExt = uHalf + ylitys;
  const wHalf = syvyys / 2, wExt = wHalf + ylitys;
  const PAKSUUS = 0.12;

  // y kaltevalla pinnalla etäisyydellä w harjasta (sama kaava jatkuu ylityksen puolella).
  const ySivu = (w) => h * (1 - w / wHalf);
  const yEave = ySivu(wExt);

  const kolmiot = [];

  // Lape (w+ tai w−, merkki = ±1): tasainen normaali normalize(0, wHalf, merkki·h) — johdettu
  // pinnan tangenttien (u-suunta ja kalteva w-suunta) ristitulosta, osoittaa ylös+poispäin.
  const puoli = (merkki) => {
    const raaka = [0, wHalf, merkki * h];
    const l = Math.hypot(raaka[0], raaka[1], raaka[2]) || 1;
    const nv = [raaka[0] / l, raaka[1] / l, raaka[2] / l];
    const rv = [-uExt, h, 0], ro = [uExt, h, 0];
    const ev = [-uExt, yEave, merkki * wExt], eo = [uExt, yEave, merkki * wExt];
    // Kiertosuunta tarkistettu käsin kummallekin merkille niin, että normaali on +nv.
    const ylaJarjestys = merkki > 0 ? [ev, eo, ro, rv] : [eo, ev, rv, ro];
    kolmiot.push(...nelio(...ylaJarjestys, 'lappe', [nv, nv, nv, nv]));
    // Alapinta: samat pisteet siirrettynä −nv·paksuus, koko kierto käännetty (reverse()
    // kääntää tasomonikulmion kiertosuunnan, jolloin normaali kääntyy −nv:ksi).
    const siirra = (p) => [p[0] - nv[0] * PAKSUUS, p[1] - nv[1] * PAKSUUS, p[2] - nv[2] * PAKSUUS];
    const alaJarjestys = ylaJarjestys.map(siirra).reverse();
    kolmiot.push(...nelio(...alaJarjestys, 'ala'));
  };
  puoli(1);
  puoli(-1);

  // Päätykolmiot (u = ±leveys/2, alkuperäinen leveys — ei ylityksen kohdalla). Kiertosuunta
  // tarkistettu käsin kummallekin päädylle niin, että normaali osoittaa omalle puolelleen (±u).
  const nNeg = [-1, 0, 0], nPos = [1, 0, 0];
  kolmiot.push(kolmio([uHalf, 0, -wHalf], [uHalf, h, 0], [uHalf, 0, wHalf], 'paaty', nPos, nPos, nPos));
  kolmiot.push(kolmio([-uHalf, 0, -wHalf], [-uHalf, 0, wHalf], [-uHalf, h, 0], 'paaty', nNeg, nNeg, nNeg));

  return kolmiot;
}

const KALLIO_NX = 24, KALLIO_NZ = 18;

/**
 * Kalliosaari: yläpinta ruudukkona (KALLIO_NX × KALLIO_NZ ruutua) y ≈ 0 pienellä kohinalla
 * (±kohina·0,6 m) ja reunoilla pyöristyvä pudotus (kuutiollinen reunavaimennus vetää laidat
 * alaspäin ennen kylkeä). Kyljet alas y = −korkeus, vaakasuuntainen pullistus kohinalla
 * (±kohina·leveys·0,03) ulospäin normalisoidun (u/hx, w/hz)-suunnan mukaan. Deterministinen
 * mulberry32(siemen): kiinteä piirtojärjestys (yläpinta rivi kerrallaan, sitten kehä).
 * Ei pohjaa. Pehmeät normaalit yläpinnalle keskeisdifferensseillä korkeuskentästä.
 */
export function kallio(param) {
  const { leveys, syvyys, korkeus, siemen, kohina = 0.25 } = param;
  const nx = KALLIO_NX, nz = KALLIO_NZ;
  const hx = leveys / 2, hz = syvyys / 2;
  const rng = mulberry32(siemen >>> 0);

  const u = (i) => -hx + (leveys * i) / nx;
  const w = (j) => -hz + (syvyys * j) / nz;

  // Yläpinnan korkeuskenttä: pieni kohina + kuutiollinen reunavaimennus (rivi kerrallaan,
  // jotta piirtojärjestys — siis satunnaislukujono — on kiinteä).
  const topY = [];
  for (let i = 0; i <= nx; i++) {
    const rivi = [];
    for (let j = 0; j <= nz; j++) {
      const du = Math.abs(u(i)) / hx, dw = Math.abs(w(j)) / hz;
      const reuna = Math.pow(Math.max(du, dw), 3);
      rivi.push((rng() * 2 - 1) * 0.6 * kohina - reuna * korkeus * 0.3);
    }
    topY.push(rivi);
  }
  const P = (i, j) => [u(i), topY[i][j], w(j)];
  const normaali = (i, j) => {
    const i0 = Math.max(i - 1, 0), i1 = Math.min(i + 1, nx);
    const j0 = Math.max(j - 1, 0), j1 = Math.min(j + 1, nz);
    const dhdu = (topY[i1][j] - topY[i0][j]) / (u(i1) - u(i0) || 1);
    const dhdw = (topY[i][j1] - topY[i][j0]) / (w(j1) - w(j0) || 1);
    const v = [-dhdu, 1, -dhdw];
    const l = Math.hypot(v[0], v[1], v[2]) || 1;
    return [v[0] / l, v[1] / l, v[2] / l];
  };

  const kolmiot = [];
  // Yläpinta: kiertosuunta (i,j)→(i,j+1)→(i+1,j+1)→(i+1,j) tarkistettu käsin (+y normaali).
  for (let i = 0; i < nx; i++) {
    for (let j = 0; j < nz; j++) {
      kolmiot.push(...nelio(
        P(i, j), P(i, j + 1), P(i + 1, j + 1), P(i + 1, j), 'kallio',
        [normaali(i, j), normaali(i, j + 1), normaali(i + 1, j + 1), normaali(i + 1, j)]
      ));
    }
  }

  // Kylki: yläreunan kehä (myötäpäivään ylhäältä katsottuna: etelä +i, itä +j, pohjoinen −i,
  // länsi −j — tarkistettu käsin, ulospäin osoittavat sivunormaalit). Alapisteet lasketaan
  // KERRAN per kehäpiste (ei kahdesti jaetuille kulmille), jotta viereiset seinät jakavat
  // saman pisteen eikä satunnaislukujono kulu kahteen kertaan samasta kulmasta.
  const kehä = [];
  for (let i = 0; i < nx; i++) kehä.push([i, 0]);
  for (let j = 0; j < nz; j++) kehä.push([nx, j]);
  for (let i = nx; i > 0; i--) kehä.push([i, nz]);
  for (let j = nz; j > 0; j--) kehä.push([0, j]);

  const alaPiste = (i, j) => {
    const uu = u(i), ww = w(j);
    const ol = Math.hypot(uu / hx, ww / hz) || 1;
    const ou = uu / hx / ol, ow = ww / hz / ol;
    const pullistus = (rng() * 2 - 1) * kohina * leveys * 0.03;
    return [uu + ou * pullistus, -korkeus, ww + ow * pullistus];
  };
  const alaPisteet = kehä.map(([i, j]) => alaPiste(i, j));

  const m = kehä.length;
  for (let idx = 0; idx < m; idx++) {
    const [i0, j0] = kehä[idx];
    const [i1, j1] = kehä[(idx + 1) % m];
    kolmiot.push(...nelio(P(i0, j0), P(i1, j1), alaPisteet[(idx + 1) % m], alaPisteet[idx], 'kallio'));
  }

  return kolmiot;
}

/** Vesi: yksi taso y = 0, normaali ylös, rooli 'vesi' (yksi nelikulmio riittää). */
export function vesi(param) {
  const { leveys, syvyys } = param;
  const hx = leveys / 2, hz = syvyys / 2;
  const ylos = [0, 1, 0];
  // Sama kiertosuunta kuin kallion yläpinnassa: (−hx,−hz)→(−hx,hz)→(hx,hz)→(hx,−hz), +y normaali.
  return nelio([-hx, 0, -hz], [-hx, 0, hz], [hx, 0, hz], [hx, 0, -hz], 'vesi', [ylos, ylos, ylos, ylos]);
}

export const RESEPTIT = { kartiokatto, harjakatto, kallio, vesi };
export const OLETUSPINNAT = {
  kartiokatto: { katto: 'katto' },
  harjakatto: { lappe: 'katto', paaty: 'kivi', ala: 'puu' },
  kallio: { kallio: 'kallio' },
  vesi: { vesi: 'vesi' },
};
