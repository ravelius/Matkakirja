// DIORAAMAN ETSINTÄRESEPTIT (Linnanrakentaja 29.9.2026, "voudin sinetti" -etsintä, Olavinlinna):
// sinettisormus ja kaiverrus (raaputettu naarmu + avaimen kuva penkin selkänojassa).
// Paikallinen kehys (u, y, w) oikeakätisenä kuten muissa resepteissä (reseptit-apu.mjs). Kaikki kolmiot
// suunnataan apufunktiolla `kolmioUlos`, joka kääntää kiertosuunnan, jos geometrinen normaali osoittaa
// annetusta ulos-suunnasta poispäin — näin ei tarvita käsin tarkistettuja kärkijärjestyksiä.
import { laatikko, kolmio } from './reseptit-apu.mjs';

const TAU = Math.PI * 2;
const erotus = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const piste = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const rist = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];

/** Kolmio, jonka geometrinen normaali osoittaa suuntaan `ulos` (vektori) — kääntää b ↔ c tarvittaessa. */
function kolmioUlos(a, b, c, ulos, rooli) {
  return piste(rist(erotus(b, a), erotus(c, a)), ulos) >= 0 ? kolmio(a, b, c, rooli) : kolmio(a, c, b, rooli);
}

/** Nelikulmio a-b-c-d (kehä järjestyksessä), ulos-suuntaan. */
function nelioUlos(a, b, c, d, ulos, rooli) {
  return [kolmioUlos(a, b, c, ulos, rooli), kolmioUlos(a, c, d, ulos, rooli)];
}

/**
 * Kuperan monikulmion (u-w-taso, pisteet [u, w]) prisma y0…y1: yläkansi (viuhka keskipisteestä) + sivut.
 * alaKansi = false jättää pohjan pois (kohokuvio lepää laatan päällä).
 */
function prisma(pisteet, y0, y1, rooli, alaKansi = true) {
  const n = pisteet.length;
  const ku = pisteet.reduce((s, p) => s + p[0], 0) / n, kw = pisteet.reduce((s, p) => s + p[1], 0) / n;
  const k = [];
  for (let i = 0; i < n; i++) {
    const [u0, w0] = pisteet[i], [u1, w1] = pisteet[(i + 1) % n];
    const ulos = [(u0 + u1) / 2 - ku, 0, (w0 + w1) / 2 - kw];
    k.push(kolmioUlos([ku, y1, kw], [u0, y1, w0], [u1, y1, w1], [0, 1, 0], rooli));
    if (alaKansi) k.push(kolmioUlos([ku, y0, kw], [u0, y0, w0], [u1, y0, w1], [0, -1, 0], rooli));
    k.push(...nelioUlos([u0, y0, w0], [u1, y0, w1], [u1, y1, w1], [u0, y1, w0], ulos, rooli));
  }
  return k;
}

/**
 * Sinettisormus: pystyssä seisova rengas (reikä w-akselin suuntainen, pohja y = 0) + soikea sinettilaatta
 * renkaan päällä (yläpinta vaakasuora) + matala kilpi ja risti kohokuviona laatalla.
 * sade = renkaan ulkosäde (u-suunnassa koko leveys 2·sade), paksuus = renkaan putken halkaisija.
 */
export function sinettisormus({ sade = 0.011, paksuus = 0.003, segmentit = 16 } = {}) {
  const t = paksuus / 2, R = sade - t, n = Math.max(6, Math.round(segmentit)), m = 6;
  const keskiY = sade; // renkaan keskipisteen korkeus (pohja y = 0)
  const P = (a, b) => [
    (R + t * Math.cos(b)) * Math.cos(a), keskiY + (R + t * Math.cos(b)) * Math.sin(a), t * Math.sin(b),
  ];
  const k = [];
  for (let i = 0; i < n; i++) {
    const a0 = TAU * i / n, a1 = TAU * (i + 1) / n, am = (a0 + a1) / 2;
    for (let j = 0; j < m; j++) {
      const b0 = TAU * j / m, b1 = TAU * (j + 1) / m, bm = (b0 + b1) / 2;
      const ulos = [Math.cos(am) * Math.cos(bm), Math.sin(am) * Math.cos(bm), Math.sin(bm)];
      k.push(...nelioUlos(P(a0, b0), P(a1, b0), P(a1, b1), P(a0, b1), ulos, 'metalli'));
    }
  }
  // Soikea sinettilaatta renkaan yläreunan päällä.
  const ru = sade * 0.7, rw = sade * 0.85, y0 = 2 * sade - paksuus * 0.4, y1 = y0 + paksuus * 0.8;
  const soikio = Array.from({ length: Math.max(8, n) }, (_, i) => [ru * Math.cos(TAU * i / Math.max(8, n)),
    rw * Math.sin(TAU * i / Math.max(8, n))]);
  k.push(...prisma(soikio, y0, y1, 'metalli'));
  // Kohokuvio: kilpi (viisikulmio) + risti, yhteensä ~0,8 mm laatan päällä.
  const s = ru * 0.62, koho = 0.0004;
  const kilpi = [[-s, s * 0.7], [s, s * 0.7], [s, -s * 0.1], [0, -s * 0.9], [-s, -s * 0.1]];
  k.push(...prisma(kilpi, y1, y1 + koho, 'koho', false));
  const ylos = y1 + koho, r = s * 0.14, h = s * 0.55;
  const risti = { yla: 'koho', etu: 'koho', taka: 'koho', vasen: 'koho', oikea: 'koho' };
  k.push(...laatikko({ u0: -r, u1: r, y0: ylos, y1: ylos + koho, w0: -h * 0.6, w1: h * 0.8 }, risti));
  k.push(...laatikko({ u0: -h * 0.6, u1: h * 0.6, y0: ylos, y1: ylos + koho, w0: -r * 0.6 + h * 0.1, w1: r * 1.4 + h * 0.1 }, risti));
  return k;
}

const KAIVERRUS_W = 0.0005; // kuvio 0,5 mm pinnasta ulos (pinta w = 0, +w pinnan normaali)

/**
 * Kaiverrus: ohut tumma kuvio pystytasossa (u = leveys, y = korkeus, +w = pinnan normaali): avain (rengaskahva +
 * varsi + parta) ja, jos naarmu = true, erillinen vino naarmuviiva avaimen oikealla puolella. Avain vie 70 %
 * leveydestä kun naarmu on mukana, muuten koko leveyden. Origo: kuvion keskipiste (avaimen varren korkeus y = 0).
 */
export function kaiverrus({ leveys = 0.12, naarmu = true } = {}) {
  const L = leveys, K = naarmu ? 0.7 * L : L, u0 = -L / 2, w = KAIVERRUS_W;
  const ro = K * 0.16, ri = ro * 0.5, cu = u0 + ro, n = 12, rooli = 'kaiverrus';
  const k = [];
  // Kahvarengas: yläpinta (+w) sekä ulko- ja sisäseinät.
  const kp = (r, i, z) => [cu + r * Math.cos(TAU * i / n), r * Math.sin(TAU * i / n), z];
  for (let i = 0; i < n; i++) {
    const am = TAU * (i + 0.5) / n, ulos = [Math.cos(am), Math.sin(am), 0];
    k.push(...nelioUlos(kp(ri, i, w), kp(ro, i, w), kp(ro, i + 1, w), kp(ri, i + 1, w), [0, 0, 1], rooli));
    k.push(...nelioUlos(kp(ro, i, 0), kp(ro, i + 1, 0), kp(ro, i + 1, w), kp(ro, i, w), ulos, rooli));
    k.push(...nelioUlos(kp(ri, i, 0), kp(ri, i + 1, 0), kp(ri, i + 1, w), kp(ri, i, w), ulos.map((x) => -x), rooli));
  }
  // Varsi ja parta (kaksi hammasta varren päässä alaspäin).
  const kaikki = { yla: rooli, ala: rooli, vasen: rooli, oikea: rooli, etu: rooli };
  const uAlku = cu + ro * 0.95, uLoppu = u0 + K, h = ro * 0.18;
  k.push(...laatikko({ u0: uAlku, u1: uLoppu, y0: -h, y1: h, w0: 0, w1: w }, kaikki));
  for (const [a, b] of [[uLoppu - ro * 0.4, uLoppu], [uLoppu - ro * 1.05, uLoppu - ro * 0.65]]) {
    k.push(...laatikko({ u0: a, u1: b, y0: -h - ro * 0.9, y1: -h, w0: 0, w1: w }, kaikki));
  }
  if (naarmu) {
    // Vino naarmuviiva: suunnikas (a → b), leveys 2·puoli, sisäpuolella oikeaa reunaa.
    const puoli = L * 0.008, a = [u0 + 0.78 * L, -0.2 * L * 0.5], b = [L / 2 - puoli, 0.2 * L * 0.5];
    const d = [b[0] - a[0], b[1] - a[1]], l = Math.hypot(d[0], d[1]), nu = -d[1] / l * puoli, ny = d[0] / l * puoli;
    const C = [[a[0] + nu, a[1] + ny], [b[0] + nu, b[1] + ny], [b[0] - nu, b[1] - ny], [a[0] - nu, a[1] - ny]];
    const P = (q, z) => [q[0], q[1], z];
    k.push(...nelioUlos(P(C[0], w), P(C[3], w), P(C[2], w), P(C[1], w), [0, 0, 1], rooli));
    for (let i = 0; i < 4; i++) {
      const p = C[i], q = C[(i + 1) % 4], ulos = [(p[0] + q[0]) / 2 - (a[0] + b[0]) / 2, (p[1] + q[1]) / 2 - (a[1] + b[1]) / 2, 0];
      k.push(...nelioUlos(P(p, 0), P(q, 0), P(q, w), P(p, w), ulos, rooli));
    }
  }
  return k;
}

export const RESEPTIT = { sinettisormus, kaiverrus };

export const OLETUSPINNAT = {
  sinettisormus: { metalli: 'kulta', koho: 'kulta' },
  kaiverrus: { kaiverrus: 'aukko' },
};
