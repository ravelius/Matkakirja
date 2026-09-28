/*
 * ISS:N TODELLINEN RATA (omistaja 26.9.2026 klo 14.4x: *"ISS:n vauhti ja
 * rata todelliset, missä ISS juuri nyt"*; Linssisepän ISS-kyydin suositus
 * docs/raportit/iss-kyyti-suositus-20260928.md luku 4: SGP4 webiin samaan
 * erään, jotta natiivi ja web näyttävät ISS:n samassa paikassa).
 *
 * OMA KÄÄNNÖS, EI KIRJASTOA. Natiivin Sgp4.cs (proto linssiseppa/iss-kyyti)
 * on oma käännös Vallado, Crawford, Hujsak & Kelso 2006 -viitetoteutuksesta
 * (Revisiting Spacetrack Report #3, AIAA 2006-6753), ja tämä on sama käännös
 * riviltä riville JavaScriptinä: sama laskenta molemmissa → sama paikka
 * samalla hetkellä. Valmista kirjastoa (satellite.js) ei tuotu, koska
 * Raamatun VALMIIT KIRJASTOT -sääntö kieltää kirjastot reposta (vain
 * ämpärin vendor/-polku, laiska lataus) — ja kyydin ensimmäinen kehys
 * tarvitsee paikan heti, ilman latausta. Vain lähiradat (kierros < 225 min).
 *
 * TLE: Siirtosepän Actions kirjoittaa ämpäriin data/iss-tle.json 6 h:n
 * välein ({nimi, rivi1, rivi2, haettu, lahde}, #3334). Linssi hakee sen
 * avautuessa (enintään tunnin välein) ja pitää viimeisimmän selaimen
 * muistissa, jolloin lentokoneessakin on eilinen TLE. Laatu iän mukaan
 * (natiivi IssNyt): ≤ 7 vrk tarkka, 7–30 vrk arvio, muuten (tai ilman
 * TLE:tä) havainnollinen 51,6°:n rata oikealla 92,9 min:n kierrosajalla.
 *
 * Kaikki puhtaita funktioita (tests/iss-rata.test.mjs, Vallado 2006
 * -vektori satelliitille 00005 kuten natiivin IssTestit).
 */

const DEG = Math.PI / 180;
const TAU = 2 * Math.PI;

/* ═══════════ TLE ═══════════════════════════════════════════════════ */

/** TLE-rivin tarkiste: numeroiden summa + miinusmerkkien määrä, mod 10. */
export function tleTarkiste(rivi) {
  if (typeof rivi !== 'string' || rivi.length < 69) return false;
  let summa = 0;
  for (let i = 0; i < 68; i += 1) {
    const c = rivi[i];
    if (c >= '0' && c <= '9') summa += c.charCodeAt(0) - 48;
    else if (c === '-') summa += 1;
  }
  return rivi.charCodeAt(68) - 48 === summa % 10;
}

/** Eksponenttimuoto " 28098-4" = 0.28098e-4 (desimaalipiste oletettu). */
function eksponentti(s) {
  let t = s.trim();
  if (!t) return 0;
  let merkki = 1;
  if (t[0] === '-' || t[0] === '+') { if (t[0] === '-') merkki = -1; t = t.slice(1); }
  const e = Math.max(t.lastIndexOf('-'), t.lastIndexOf('+'));
  if (e <= 0) return merkki * Number(`0.${t}`);
  return merkki * Number(`0.${t.slice(0, e)}`) * 10 ** Number(t.slice(e));
}

/** Juliaaninen päivä (UTC) kalenteripäivästä, gregoriaaninen 1900–2100. */
export function jdPaivasta(vuosi, kuukausi, paiva, tunnit = 0) {
  return 367 * vuosi - Math.floor(7 * (vuosi + Math.floor((kuukausi + 9) / 12)) * 0.25)
    + Math.floor((275 * kuukausi) / 9) + paiva + 1721013.5 + tunnit / 24;
}

/** Juliaaninen päivä millisekunneista (Date.now()). */
export function jdHetkesta(ms) {
  return ms / 86400000 + 2440587.5;
}

/** GMST radiaaneina (IAU 1982, Vallado gstime). */
export function gmst(jdUt1) {
  const t = (jdUt1 - 2451545.0) / 36525.0;
  const s = -6.2e-6 * t * t * t + 0.093104 * t * t + (876600.0 * 3600 + 8640184.812866) * t + 67310.54841;
  const r = ((s * DEG) / 240.0) % TAU;
  return r < 0 ? r + TAU : r;
}

/**
 * Kahden rivin rataelementit. Heittää, jos rivit eivät ole muotoa 1…/2…
 * (69 merkkiä); `tarkisteOk` kertoo tarkisteen.
 */
export function jasennaTle(rivi1, rivi2, nimi = null) {
  if (typeof rivi1 !== 'string' || typeof rivi2 !== 'string' || rivi1.length < 69 || rivi2.length < 69
    || rivi1[0] !== '1' || rivi2[0] !== '2') {
    throw new Error('TLE: rivit eivät ole muotoa 1…/2… (69 merkkiä)');
  }
  const D = (s) => Number(s.trim());
  let vuosi = Number(rivi1.slice(18, 20));
  vuosi += vuosi < 57 ? 2000 : 1900;
  return {
    nimi: nimi?.trim?.() ?? null,
    rivi1,
    rivi2,
    numero: Number(rivi1.slice(2, 7).trim()),
    epookkiJd: jdPaivasta(vuosi, 1, 1) - 1 + D(rivi1.slice(20, 32)),
    bstar: eksponentti(rivi1.slice(53, 61)),
    inklinaatio: D(rivi2.slice(8, 16)) * DEG,
    solmu: D(rivi2.slice(17, 25)) * DEG,
    eksentrisyys: Number(`0.${rivi2.slice(26, 33).trim()}`),
    perigeum: D(rivi2.slice(34, 42)) * DEG,
    keskianomalia: D(rivi2.slice(43, 51)) * DEG,
    keskiliike: (D(rivi2.slice(52, 63)) * TAU) / 1440,
    tarkisteOk: tleTarkiste(rivi1) && tleTarkiste(rivi2),
    haettu: null,
    lahde: null,
  };
}

/**
 * Siirtosepän iss-tle.json → TLE, tai null jos tiedosto on rikki tai
 * tarkiste ei täsmää (natiivi Tle.JasennaJson).
 */
export function jasennaTleJson(json) {
  try {
    const d = typeof json === 'string' ? JSON.parse(json) : json;
    if (!d || typeof d !== 'object') return null;
    const t = jasennaTle(d.rivi1, d.rivi2, d.nimi ?? null);
    if (!t.tarkisteOk) return null;
    t.haettu = typeof d.haettu === 'string' ? d.haettu : null;
    t.lahde = typeof d.lahde === 'string' ? d.lahde : null;
    return t;
  } catch {
    return null;
  }
}

/* ═══════════ SGP4 (lähiradat) ═══════════════════════════════════════ */

/** WGS-72 (TLE-aineiston vakiot). */
export const MAANSADE_KM = 6378.135;
export const MU = 398600.8;
const J2 = 0.001082616;
const J3 = -0.00000253881;
const J4 = -0.00000165597;
const J3OJ2 = J3 / J2;
const X2O3 = 2 / 3;
const XKE = 60 / Math.sqrt((MAANSADE_KM ** 3) / MU);

/**
 * SGP4-rata yhdelle TLE:lle. `kaytettavissa` false syvän avaruuden
 * radalle (SDP4 puuttuu) tai virheellisille elementeille.
 */
export function luoRata(tle) {
  const r = { tle, kaytettavissa: false, syy: null };
  const ecco = tle.eksentrisyys;
  const inclo = tle.inklinaatio;
  const nodeo = tle.solmu;
  const argpo = tle.perigeum;
  const mo = tle.keskianomalia;
  const { bstar } = tle;
  const noKozai = tle.keskiliike;

  // initl: Kozai → Brouwer-keskiliike
  const eccsq = ecco * ecco;
  const omeosq = 1 - eccsq;
  const rteosq = Math.sqrt(omeosq);
  const cosio = Math.cos(inclo);
  const cosio2 = cosio * cosio;
  const ak = (XKE / noKozai) ** X2O3;
  const d1 = (0.75 * J2 * (3 * cosio2 - 1)) / (rteosq * omeosq);
  let del = d1 / (ak * ak);
  const adel = ak * (1 - del * del - del * (1 / 3 + (134 * del * del) / 81));
  del = d1 / (adel * adel);
  const no = noKozai / (1 + del);
  const ao = (XKE / no) ** X2O3;
  const sinio = Math.sin(inclo);
  const po = ao * omeosq;
  const con42 = 1 - 5 * cosio2;
  const con41 = -con42 - cosio2 - cosio2;
  const posq = po * po;
  const rp = ao * (1 - ecco);
  r.kierrosMin = TAU / no;

  if (TAU / no >= 225) { r.syy = 'syvän avaruuden rata (SDP4 puuttuu)'; return r; }
  if (ecco >= 1 || ecco < 0 || no <= 0 || !Number.isFinite(no)) { r.syy = 'virheelliset elementit'; return r; }

  // sgp4init (lähirata)
  const ss = 78 / MAANSADE_KM + 1;
  const qzms2t = ((120 - 78) / MAANSADE_KM) ** 4;
  const isimp = rp < 220 / MAANSADE_KM + 1;
  let sfour = ss;
  let qzms24 = qzms2t;
  const perige = (rp - 1) * MAANSADE_KM;
  if (perige < 156) {
    sfour = perige - 78;
    if (perige < 98) sfour = 20;
    qzms24 = ((120 - sfour) / MAANSADE_KM) ** 4;
    sfour = sfour / MAANSADE_KM + 1;
  }
  const pinvsq = 1 / posq;
  const tsi = 1 / (ao - sfour);
  const eta = ao * ecco * tsi;
  const etasq = eta * eta;
  const eeta = ecco * eta;
  const psisq = Math.abs(1 - etasq);
  const coef = qzms24 * tsi ** 4;
  const coef1 = coef / psisq ** 3.5;
  const cc2 = coef1 * no * (ao * (1 + 1.5 * etasq + eeta * (4 + etasq))
    + ((0.375 * J2 * tsi) / psisq) * con41 * (8 + 3 * etasq * (8 + etasq)));
  const cc1 = bstar * cc2;
  const cc3 = ecco > 1e-4 ? (-2 * coef * tsi * J3OJ2 * no * sinio) / ecco : 0;
  const x1mth2 = 1 - cosio2;
  const cc4 = 2 * no * coef1 * ao * omeosq * (eta * (2 + 0.5 * etasq) + ecco * (0.5 + 2 * etasq)
    - ((J2 * tsi) / (ao * psisq)) * (-3 * con41 * (1 - 2 * eeta + etasq * (1.5 - 0.5 * eeta))
    + 0.75 * x1mth2 * (2 * etasq - eeta * (1 + etasq)) * Math.cos(2 * argpo)));
  const cc5 = 2 * coef1 * ao * omeosq * (1 + 2.75 * (etasq + eeta) + eeta * etasq);
  const cosio4 = cosio2 * cosio2;
  const temp1 = 1.5 * J2 * pinvsq * no;
  const temp2 = 0.5 * temp1 * J2 * pinvsq;
  const temp3 = -0.46875 * J4 * pinvsq * pinvsq * no;
  const mdot = no + 0.5 * temp1 * rteosq * con41 + 0.0625 * temp2 * rteosq * (13 - 78 * cosio2 + 137 * cosio4);
  const argpdot = -0.5 * temp1 * con42 + 0.0625 * temp2 * (7 - 114 * cosio2 + 395 * cosio4)
    + temp3 * (3 - 36 * cosio2 + 49 * cosio4);
  const xhdot1 = -temp1 * cosio;
  const nodedot = xhdot1 + (0.5 * temp2 * (4 - 19 * cosio2) + 2 * temp3 * (3 - 7 * cosio2)) * cosio;
  const omgcof = bstar * cc3 * Math.cos(argpo);
  const xmcof = ecco > 1e-4 ? (-X2O3 * coef * bstar) / eeta : 0;
  const nodecf = 3.5 * omeosq * xhdot1 * cc1;
  const t2cof = 1.5 * cc1;
  const xlcof = Math.abs(cosio + 1) > 1.5e-12
    ? (-0.25 * J3OJ2 * sinio * (3 + 5 * cosio)) / (1 + cosio)
    : (-0.25 * J3OJ2 * sinio * (3 + 5 * cosio)) / 1.5e-12;
  const aycof = -0.5 * J3OJ2 * sinio;
  const delmo = (1 + eta * Math.cos(mo)) ** 3;
  const sinmao = Math.sin(mo);
  const x7thm1 = 7 * cosio2 - 1;
  let d2 = 0;
  let d3 = 0;
  let d4 = 0;
  let t3cof = 0;
  let t4cof = 0;
  let t5cof = 0;
  if (!isimp) {
    const cc1sq = cc1 * cc1;
    d2 = 4 * ao * tsi * cc1sq;
    const temp = (d2 * tsi * cc1) / 3;
    d3 = (17 * ao + sfour) * temp;
    d4 = 0.5 * temp * ao * tsi * (221 * ao + 31 * sfour) * cc1;
    t3cof = d2 + 2 * cc1sq;
    t4cof = 0.25 * (3 * d3 + cc1 * (12 * d2 + 10 * cc1sq));
    t5cof = 0.2 * (3 * d4 + 12 * cc1 * d3 + 6 * d2 * d2 + 15 * cc1sq * (2 * d2 + cc1sq));
  }

  /**
   * Sijainti ja nopeus TEME-koordinaatistossa (km, km/s) hetkellä t
   * minuuttia epookista; null, jos rata on hajonnut.
   */
  r.sijainti = (t) => {
    const xmdf = mo + mdot * t;
    const argpdf = argpo + argpdot * t;
    const nodedf = nodeo + nodedot * t;
    let argpm = argpdf;
    let mm = xmdf;
    const t2 = t * t;
    let nodem = nodedf + nodecf * t2;
    let tempa = 1 - cc1 * t;
    let tempe = bstar * cc4 * t;
    let templ = t2cof * t2;
    if (!isimp) {
      const delomg = omgcof * t;
      const delm = xmcof * ((1 + eta * Math.cos(xmdf)) ** 3 - delmo);
      const temp = delomg + delm;
      mm = xmdf + temp;
      argpm = argpdf - temp;
      const t3 = t2 * t;
      const t4 = t3 * t;
      tempa = tempa - d2 * t2 - d3 * t3 - d4 * t4;
      tempe += bstar * cc5 * (Math.sin(mm) - sinmao);
      templ = templ + t3cof * t3 + t4 * (t4cof + t * t5cof);
    }
    let nm = no;
    let em = ecco;
    const inclm = inclo;
    if (nm <= 0) return null;
    const am = (XKE / nm) ** X2O3 * tempa * tempa;
    nm = XKE / am ** 1.5;
    em -= tempe;
    if (em >= 1 || em < -0.001) return null;
    if (em < 1e-6) em = 1e-6;
    mm += no * templ;
    let xlm = mm + argpm + nodem;
    nodem %= TAU;
    argpm %= TAU;
    xlm %= TAU;
    mm = (xlm - argpm - nodem) % TAU;

    const sinim = Math.sin(inclm);
    const cosim = Math.cos(inclm);
    const ep = em;
    const xincp = inclm;
    const argpp = argpm;
    const nodep = nodem;
    const mp = mm;
    const sinip = sinim;
    const cosip = cosim;

    // Pitkäjaksoiset termit
    const axnl = ep * Math.cos(argpp);
    const tmp = 1 / (am * (1 - ep * ep));
    const aynl = ep * Math.sin(argpp) + tmp * aycof;
    const xl = mp + argpp + nodep + tmp * xlcof * axnl;

    // Keplerin yhtälö
    const u = (xl - nodep) % TAU;
    let eo1 = u;
    let tem5 = 9999.9;
    let sineo1 = 0;
    let coseo1 = 0;
    for (let k = 1; Math.abs(tem5) >= 1e-12 && k <= 10; k += 1) {
      sineo1 = Math.sin(eo1);
      coseo1 = Math.cos(eo1);
      tem5 = 1 - coseo1 * axnl - sineo1 * aynl;
      tem5 = (u - aynl * coseo1 + axnl * sineo1 - eo1) / tem5;
      if (Math.abs(tem5) >= 0.95) tem5 = tem5 > 0 ? 0.95 : -0.95;
      eo1 += tem5;
    }

    // Lyhytjaksoiset termit
    const ecose = axnl * coseo1 + aynl * sineo1;
    const esine = axnl * sineo1 - aynl * coseo1;
    const el2 = axnl * axnl + aynl * aynl;
    const pl = am * (1 - el2);
    if (pl < 0) return null;
    const rl = am * (1 - ecose);
    const rdotl = (Math.sqrt(am) * esine) / rl;
    const rvdotl = Math.sqrt(pl) / rl;
    const betal = Math.sqrt(1 - el2);
    const tmp2 = esine / (1 + betal);
    const sinu = (am / rl) * (sineo1 - aynl - axnl * tmp2);
    const cosu = (am / rl) * (coseo1 - axnl + aynl * tmp2);
    let su = Math.atan2(sinu, cosu);
    const sin2u = (cosu + cosu) * sinu;
    const cos2u = 1 - 2 * sinu * sinu;
    const tpl = 1 / pl;
    const tmp1 = 0.5 * J2 * tpl;
    const tmp2b = tmp1 * tpl;
    const mrt = rl * (1 - 1.5 * tmp2b * betal * con41) + 0.5 * tmp1 * x1mth2 * cos2u;
    su -= 0.25 * tmp2b * x7thm1 * sin2u;
    const xnode = nodep + 1.5 * tmp2b * cosip * sin2u;
    const xinc = xincp + 1.5 * tmp2b * cosip * sinip * cos2u;
    const mvt = rdotl - (nm * tmp1 * x1mth2 * sin2u) / XKE;
    const rvdot = rvdotl + (nm * tmp1 * (x1mth2 * cos2u + 1.5 * con41)) / XKE;

    const sinsu = Math.sin(su);
    const cossu = Math.cos(su);
    const snod = Math.sin(xnode);
    const cnod = Math.cos(xnode);
    const sini = Math.sin(xinc);
    const cosi = Math.cos(xinc);
    const xmx = -snod * cosi;
    const xmy = cnod * cosi;
    const ux = xmx * sinsu + cnod * cossu;
    const uy = xmy * sinsu + snod * cossu;
    const uz = sini * sinsu;
    const vx = xmx * cossu - cnod * sinsu;
    const vy = xmy * cossu - snod * sinsu;
    const vz = sini * cossu;
    if (mrt < 1) return null; // pudonnut
    const vkm = (MAANSADE_KM * XKE) / 60;
    return {
      r: { x: mrt * ux * MAANSADE_KM, y: mrt * uy * MAANSADE_KM, z: mrt * uz * MAANSADE_KM },
      v: { x: (mvt * ux + rvdot * vx) * vkm, y: (mvt * uy + rvdot * vy) * vkm, z: (mvt * uz + rvdot * vz) * vkm },
    };
  };

  /** Alapiste { lat, lon, korkeusKm } UTC-hetkellä (juliaaninen päivä). */
  r.alapiste = (jdUtc) => {
    const s = r.sijainti((jdUtc - tle.epookkiJd) * 1440);
    return s ? maahan(s.r, jdUtc) : null;
  };
  r.kaytettavissa = true;
  return r;
}

/** TEME → ECEF (GMST-kierto) → geodeettinen WGS-84 (Bowringin iteraatio). */
export function maahan(r, jdUtc) {
  const g = gmst(jdUtc);
  const cg = Math.cos(g);
  const sg = Math.sin(g);
  const x = cg * r.x + sg * r.y;
  const y = -sg * r.x + cg * r.y;
  const { z } = r;
  const a = 6378.137;
  const f = 1 / 298.257223563;
  const e2 = f * (2 - f);
  const p = Math.sqrt(x * x + y * y);
  const lon = (Math.atan2(y, x) * 180) / Math.PI;
  let phi = Math.atan2(z, p * (1 - e2));
  let n = a;
  for (let i = 0; i < 6; i += 1) {
    const s = Math.sin(phi);
    n = a / Math.sqrt(1 - e2 * s * s);
    phi = Math.atan2(z + e2 * n * s, p);
  }
  return { lat: (phi * 180) / Math.PI, lon, korkeusKm: p / Math.cos(phi) - n };
}

/* ═══════════ AURINKO ═══════════════════════════════════════════════ */

/** Auringon suunta ECI:ssä (yksikkövektori), Meeus luku 25, ~0,01°. */
export function auringonSuunta(jd) {
  const t = (jd - 2451545.0) / 36525.0;
  const l0 = (280.46646 + 36000.76983 * t + 0.0003032 * t * t) % 360;
  const m = (357.52911 + 35999.05029 * t - 0.0001537 * t * t) * DEG;
  const c = (1.914602 - 0.004817 * t - 0.000014 * t * t) * Math.sin(m)
    + (0.019993 - 0.000101 * t) * Math.sin(2 * m) + 0.000289 * Math.sin(3 * m);
  const omega = (125.04 - 1934.136 * t) * DEG;
  const lambda = (l0 + c - 0.00569 - 0.00478 * Math.sin(omega)) * DEG;
  const eps = (23.439291 - 0.0130042 * t + 0.00256 * Math.cos(omega)) * DEG;
  return { x: Math.cos(lambda), y: Math.cos(eps) * Math.sin(lambda), z: Math.sin(eps) * Math.sin(lambda) };
}

/** Auringon alihajapiste { lat, lon } asteina (natiivi Aurinko.Alihajapiste). */
export function auringonAlihajapiste(jd) {
  const s = auringonSuunta(jd);
  const lat = Math.asin(s.z) / DEG;
  const ra = Math.atan2(s.y, s.x);
  const lon = ((((ra - gmst(jd)) / DEG + 540) % 360) + 360) % 360 - 180;
  return { lat, lon };
}

/* ═══════════ ISS NYT ═══════════════════════════════════════════════ */

/** Radan laatu TLE:n iän mukaan (natiivi RadanLaatu). */
export const RADAN_LAATU = Object.freeze({ tarkka: 'tarkka', arvio: 'arvio', havainnollinen: 'havainnollinen' });
export const TARKKA_VRK = 7;
export const ARVIO_VRK = 30;
/** Havainnollinen rata: kierrosaika (s, ISS noin 92,9 min) ja tähtivuorokausi (s). */
export const HAVAINNOLLINEN_KIERROS_S = 5574;
export const TAHTIVUOROKAUSI_S = 86164.0905;
export const HAVAINNOLLINEN_INKLINAATIO = 51.6;
/** Havainnollisen radan korkeus (km): ISS:n tavallinen korkeus. */
export const HAVAINNOLLINEN_KORKEUS_KM = 420;
/** Maajäljen uudelleenlaskennan väli (s): 241 SGP4-pistettä ei joka kehys. */
export const KAAREN_VALI_S = 10;

/** Radan piste kulmasta u ja solmusta (asteina), natiivi RadanPiste. */
function radanPiste(u, solmu, inklinaatio = HAVAINNOLLINEN_INKLINAATIO) {
  const i = inklinaatio * DEG;
  const a = u * DEG;
  const lat = Math.asin(Math.sin(i) * Math.sin(a)) / DEG;
  let lon = solmu + Math.atan2(Math.cos(i) * Math.sin(a), Math.cos(a)) / DEG;
  lon = ((lon + 180) % 360 + 360) % 360 - 180;
  return { lat, lon };
}

/** Isoympyrän alkusuunta pisteestä 1 pisteeseen 2 (asteina 0…360). */
export function suunta(lat1, lon1, lat2, lon2) {
  const p1 = lat1 * DEG;
  const p2 = lat2 * DEG;
  const dl = (lon2 - lon1) * DEG;
  const y = Math.sin(dl) * Math.cos(p2);
  const x = Math.cos(p1) * Math.sin(p2) - Math.sin(p1) * Math.cos(p2) * Math.cos(dl);
  return (Math.atan2(y, x) / DEG + 360) % 360;
}

/**
 * ISS nyt (natiivi IssNyt): TLE:n tila ja kaikki kyselyt UTC-kellosta.
 * `kello` palauttaa millisekunnit (testit korvaavat).
 */
export function luoIssNyt({ kello = () => Date.now() } = {}) {
  let tle = null;
  let rata = null;
  let versio = 0;

  const ikaVrk = (ms) => (tle ? jdHetkesta(ms) - tle.epookkiJd : Infinity);
  const laatu = (ms) => {
    const ika = Math.abs(ikaVrk(ms));
    if (ika <= TARKKA_VRK) return RADAN_LAATU.tarkka;
    if (ika <= ARVIO_VRK) return RADAN_LAATU.arvio;
    return RADAN_LAATU.havainnollinen;
  };
  const paikkaJd = (jd, sgp4) => {
    if (sgp4) {
      const p = rata.alapiste(jd);
      if (p) return p;
    }
    // Havainnollinen: 51,6°:n ympyrärata, jonka alla maa kiertyy länteen.
    const s = (jd - 2451545.0) * 86400;
    const q = radanPiste((360 * (s % HAVAINNOLLINEN_KIERROS_S)) / HAVAINNOLLINEN_KIERROS_S,
      (-360 * (s % TAHTIVUOROKAUSI_S)) / TAHTIVUOROKAUSI_S);
    return { lat: q.lat, lon: q.lon, korkeusKm: HAVAINNOLLINEN_KORKEUS_KM };
  };
  const sgp4Kaytossa = (ms) => Boolean(rata) && laatu(ms) !== RADAN_LAATU.havainnollinen;
  const paikka = (ms = kello()) => paikkaJd(jdHetkesta(ms), sgp4Kaytossa(ms));

  return {
    kello,
    get tle() { return tle; },
    get versio() { return versio; },
    /** Asettaa TLE:n, jos se on käyttökelpoinen ja uudempi. true = vaihtui. */
    aseta(t) {
      if (!t || !t.tarkisteOk || (tle && t.epookkiJd <= tle.epookkiJd)) return false;
      const r = luoRata(t);
      if (!r.kaytettavissa) return false;
      tle = t;
      rata = r;
      versio += 1;
      return true;
    },
    nollaa() { tle = null; rata = null; versio += 1; },
    ikaVrk,
    laatu,
    /** ISS:n alapiste { lat, lon, korkeusKm } hetkellä ms. */
    paikka,
    /** Korkeus (km); havainnollisella radalla 420. */
    korkeusKm: (ms = kello()) => paikka(ms).korkeusKm,
    /** Maajäljen suunta (asteina, 0 = pohjoinen, 90 = itä), sisältää maan pyörimisen. */
    suuntima(ms = kello()) {
      const a = paikka(ms - 1000);
      const b = paikka(ms + 1000);
      return suunta(a.lat, a.lon, b.lat, b.lon);
    },
    /**
     * Maajälki puoli kierrosta taakse ja eteen hetkestä ms: `maara` + 1
     * pistettä, keskimmäinen on ISS. Kutsuja laskee sen KAAREN_VALI_S:n välein.
     */
    kaari(ms = kello(), maara = 240) {
      const n = Math.max(1, Math.round(maara));
      const sgp4 = sgp4Kaytossa(ms);
      const kierrosVrk = (sgp4 ? rata.kierrosMin * 60 : HAVAINNOLLINEN_KIERROS_S) / 86400;
      const jd0 = jdHetkesta(ms);
      const ulos = [];
      for (let k = 0; k <= n; k += 1) ulos.push(paikkaJd(jd0 + kierrosVrk * (k / n - 0.5), sgp4));
      return ulos;
    },
  };
}

/** Ratanopeus (km/h) korkeudesta ympyräradalla (vis viva): 420 km ≈ 27 600 km/h. */
export function nopeusKmh(korkeusKm) {
  return Math.sqrt(MU / (MAANSADE_KM + korkeusKm)) * 3600;
}

/* ═══════════ TLE:N LATAUS ═══════════════════════════════════════════ */

export const TLE_OSOITE = 'https://media.matkakirja.app/data/iss-tle.json';
/** Ämpäri enintään tunnin välein (natiivi IssTleLataaja.VerkkoValiS). */
export const TLE_VERKKOVALI_MS = 3600 * 1000;
/** Viimeisin kelvollinen TLE selaimen muistissa (lentokone, verkkovirhe). */
export const TLE_MUISTIAVAIN = 'matkakirja-iss-tle';

let verkkoHaettu = -Infinity;

/**
 * TLE ensin selaimen muistista (heti), sitten ämpäristä taustalla.
 * `issNyt.aseta` pitää uusimman epookin, joten järjestys on sama kuin
 * natiivissa. Palauttaa lupauksen, joka ratkeaa kun haku on päättynyt
 * (onnistui tai ei) — kutsujan ei tarvitse odottaa sitä.
 */
export function lataaIssTle(issNyt, { ikkuna = globalThis, pakota = false } = {}) {
  try {
    const muisti = ikkuna.localStorage?.getItem?.(TLE_MUISTIAVAIN);
    if (muisti) issNyt.aseta(jasennaTleJson(muisti));
  } catch { /* ei muistia (yksityinen ikkuna) */ }
  const nyt = Date.now();
  if (!pakota && nyt - verkkoHaettu < TLE_VERKKOVALI_MS) return Promise.resolve(false);
  if (typeof ikkuna.fetch !== 'function') return Promise.resolve(false);
  verkkoHaettu = nyt;
  return ikkuna.fetch(TLE_OSOITE, { mode: 'cors', credentials: 'omit', cache: 'no-cache' })
    .then((v) => (v?.ok ? v.text() : null))
    .then((teksti) => {
      const t = teksti ? jasennaTleJson(teksti) : null;
      if (!t) return false;
      const uusi = issNyt.aseta(t);
      if (uusi) {
        try { ikkuna.localStorage?.setItem?.(TLE_MUISTIAVAIN, teksti); } catch { /* täynnä */ }
      }
      return uusi;
    })
    .catch(() => false);
}

/** Yhteinen ISS-tila koko pelille (linssi avataan ja suljetaan, TLE säilyy). */
export const ISS_NYT = luoIssNyt();
