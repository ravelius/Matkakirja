// DIORAAMAN AITTARESEPTIT (Linnanrakentaja 29.9.2026, Olavinlinnan fatabuuri vaate- ja tavara-aittana):
// kangaspakka (rullattu kangas kyljellään), vaatepino (taitellut vaatteet), vaateorsi (orresta roikkuvat vaatteet).
// Paikallinen kehys (u, y, w) oikeakätisenä (reseptit-apu.mjs). Kolmiot suunnataan apufunktiolla `ulosKolmio`,
// joka kääntää kiertosuunnan jos geometrinen normaali osoittaa annetusta ulos-suunnasta poispäin.
import { laatikko, kolmio, mulberry32 } from './reseptit-apu.mjs';

const TAU = Math.PI * 2;
const ero = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const rist = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];

/** Kolmio, jonka normaali osoittaa suuntaan `ulos`. */
function ulosKolmio(a, b, c, ulos, rooli) {
  const n = rist(ero(b, a), ero(c, a));
  return n[0] * ulos[0] + n[1] * ulos[1] + n[2] * ulos[2] >= 0 ? kolmio(a, b, c, rooli) : kolmio(a, c, b, rooli);
}
const nelio = (a, b, c, d, ulos, rooli) => [ulosKolmio(a, b, c, ulos, rooli), ulosKolmio(a, c, d, ulos, rooli)];

/**
 * Kangaspakka: rullattu kangas makaa kyljellään, akseli u-suuntainen, pohja y = 0, u = −pituus/2…pituus/2.
 * Vaippa 'kangas'; kummassakin päädyssä porrastettu rullan kierre 'reuna' (ulkorengas, kaksi sisäkkäistä
 * sisennettyä rengasta ja ydinkiekko). siemen: pieni litistys (0,9–1,0) ja päiden säteen ero (±6 %).
 */
export function kangaspakka({ pituus = 0.9, sade = 0.09, siemen = 1, segmentit = 10 } = {}) {
  const rng = mulberry32(siemen >>> 0), n = Math.max(6, Math.round(segmentit)), L = pituus / 2;
  const sy = 0.9 + 0.1 * rng(), kar = (rng() - 0.5) * 0.12;
  // Piste akselilla u, kulma a, säteen osuus f, vaihe ph: y-säde litistetty, pohja aina y = 0.
  const P = (u, a, f, ph = 0) => {
    const R = sade * (1 + kar * u / L);
    const t = a + ph + 1.5 * Math.PI; // a = 0 → alin piste (pohja y = 0 osuu ruudukkoon)
    return [u, R * sy + R * sy * f * Math.sin(t), R * f * Math.cos(t)];
  };
  const ulos = (a) => [0, Math.sin(a + 1.5 * Math.PI), Math.cos(a + 1.5 * Math.PI)];
  const k = [];
  const tasoRengas = (u, f0, f1, ph0, ph1, s) => { // rengas u-tasossa, normaali s·u
    for (let i = 0; i < n; i++) {
      const a0 = TAU * i / n, a1 = TAU * (i + 1) / n;
      k.push(...(f1 > 0
        ? nelio(P(u, a0, f0, ph0), P(u, a1, f0, ph0), P(u, a1, f1, ph1), P(u, a0, f1, ph1), [s, 0, 0], 'reuna')
        : [ulosKolmio(P(u, a0, f0, ph0), P(u, a1, f0, ph0), P(u, 0, 0), [s, 0, 0], 'reuna')]));
    }
  };
  const seina = (u0, u1, f, ph, sisaan, rooli) => {
    for (let i = 0; i < n; i++) {
      const a0 = TAU * i / n, a1 = TAU * (i + 1) / n, o = ulos((a0 + a1) / 2).map((x) => (sisaan ? -x : x));
      k.push(...nelio(P(u0, a0, f, ph), P(u0, a1, f, ph), P(u1, a1, f, ph), P(u1, a0, f, ph), o, rooli));
    }
  };
  seina(-L, L, 1, 0, false, 'kangas');
  for (const s of [-1, 1]) { // s = päädyn suunta; sisennys kulkee suuntaan −s
    const u = (d) => s * (L - d), d1 = pituus * 0.014, d2 = pituus * 0.028;
    tasoRengas(u(0), 1, 0.72, 0, 0, s);
    seina(u(0), u(d1), 0.72, 0, true, 'reuna');
    tasoRengas(u(d1), 0.72, 0.5, 0, 0.5, s);
    seina(u(d1), u(d2), 0.5, 0.5, true, 'reuna');
    tasoRengas(u(d2), 0.5, 0, 0.5, 0.5, s);
  }
  return k;
}

/** Pyöristetty suorakulmio (u-w-taso), puolikkaat hu, hw, kulmia kolmella pisteellä; kierto rot, siirto [du, dw]. */
function pyoristetty(hu, hw, rot, du, dw) {
  const rc = Math.min(hu, hw) * 0.3, kul = [[1, 1], [-1, 1], [-1, -1], [1, -1]], p = [];
  kul.forEach(([su, sw], q) => {
    for (let j = 0; j < 3; j++) {
      const t = (q * 90 + j * 45) * Math.PI / 180;
      p.push([su * (hu - rc) + rc * Math.cos(t), sw * (hw - rc) + rc * Math.sin(t)]);
    }
  });
  const c = Math.cos(rot), s = Math.sin(rot);
  return p.map(([u, w]) => [u * c - w * s + du, u * s + w * c + dw]);
}

/**
 * Vaatepino: kerroksia (3–5) taiteltua, matalaa pyöristettyä laattaa päällekkäin, pohja y = 0. Kukin laatta hieman
 * eri kokoinen, kierretty ja siirretty; mahtuu leveys × syvyys -alaan. Roolit 'kangas' / 'kangas2' vuorottelevat.
 */
export function vaatepino({ leveys = 0.45, syvyys = 0.35, kerroksia = 4, siemen = 1 } = {}) {
  const rng = mulberry32(siemen >>> 0), m = Math.max(3, Math.min(5, Math.round(kerroksia)));
  const k = [];
  let y = 0;
  for (let i = 0; i < m; i++) {
    const rot = i === 0 ? 0 : (rng() - 0.5) * 0.35, du = i === 0 ? 0 : (rng() - 0.5) * 0.03, dw = i === 0 ? 0 : (rng() - 0.5) * 0.03;
    let hu = leveys / 2 * (i === 0 ? 1 : 0.85 + 0.12 * rng()), hw = syvyys / 2 * (i === 0 ? 1 : 0.85 + 0.12 * rng());
    const eu = Math.abs(Math.cos(rot)) * hu + Math.abs(Math.sin(rot)) * hw, ew = Math.abs(Math.sin(rot)) * hu + Math.abs(Math.cos(rot)) * hw;
    const s = Math.min(1, (leveys / 2 - Math.abs(du)) / eu, (syvyys / 2 - Math.abs(dw)) / ew);
    hu *= s; hw *= s;
    const t = 0.038 + 0.02 * rng(), y1 = y + t, rooli = i % 2 ? 'kangas2' : 'kangas';
    const alaP = pyoristetty(hu, hw, rot, du, dw), ylaP = pyoristetty(hu * 0.95, hw * 0.95, rot, du, dw);
    for (let q = 0; q < alaP.length; q++) {
      const r = (q + 1) % alaP.length, a0 = [alaP[q][0], y, alaP[q][1]], a1 = [alaP[r][0], y, alaP[r][1]];
      const b0 = [ylaP[q][0], y1, ylaP[q][1]], b1 = [ylaP[r][0], y1, ylaP[r][1]];
      k.push(...nelio(a0, a1, b1, b0, [(a0[0] + a1[0]) / 2 - du, 0, (a0[2] + a1[2]) / 2 - dw], rooli));
      k.push(ulosKolmio([du, y1, dw], b0, b1, [0, 1, 0], rooli));
      if (i === 0) k.push(ulosKolmio([du, y, dw], a0, a1, [0, -1, 0], rooli));
    }
    y = y1;
  }
  return k;
}

// Vaatetyypin siluetti: [[korkeusosuus ylhäältä, leveysosuus]] — viitta, paita (hihat askelmana), mekko (levenevä).
const SILUETIT = [
  [[0, 0.9], [1, 1.0]],
  [[0, 1], [0.3, 1], [0.32, 0.65], [1, 0.65]],
  [[0, 0.55], [0.35, 0.7], [1, 1.2]],
];

/**
 * Vaateorsi: vaaka-orsi (u-suuntainen, 'puu'), jolta roikkuu vaatteita (3–6) ohuina poimutettuina pystypaneeleina
 * (6 poimusegmenttiä w-suunnassa siksak). ROIKKUVA kuten orsileivat: origo = orren keskipiste, geometria alaspäin.
 * Vaatteet kiertävät viitta / paita / mekko, roolit 'kangas' / 'kangas2' vuorotellen. pituusVaate = pisin vaate.
 */
export function vaateorsi({ pituus = 1.4, vaatteita = 4, pituusVaate = 0.9, siemen = 1 } = {}) {
  const rng = mulberry32(siemen >>> 0), n = Math.max(3, Math.min(6, Math.round(vaatteita)));
  const k = [...laatikko({ u0: -pituus / 2, u1: pituus / 2, y0: -0.02, y1: 0.02, w0: -0.02, w1: 0.02 },
    { yla: 'puu', ala: 'puu', etu: 'puu', taka: 'puu', vasen: 'puu', oikea: 'puu' })];
  const slotti = (pituus - 0.08) / n, seg = 6, syv = 0.006;
  for (let i = 0; i < n; i++) {
    const rooli = i % 2 ? 'kangas2' : 'kangas', silu = SILUETIT[i % 3];
    const uc = -pituus / 2 + 0.04 + slotti * (i + 0.5) + (rng() - 0.5) * slotti * 0.1;
    const puoli = slotti * 0.5 * 0.86, h = pituusVaate * (0.75 + 0.25 * rng()), amp = 0.012 * (0.8 + 0.4 * rng());
    const rivi = ([ky, kl]) => Array.from({ length: seg + 1 }, (_, j) => {
      const t = j / seg * 2 - 1;
      return [uc + t * puoli * kl, -0.02 - ky * h, (j % 2 ? -1 : 1) * amp * (0.5 + 0.5 * kl)];
    });
    for (let r = 0; r + 1 < silu.length; r++) {
      const a = rivi(silu[r]), b = rivi(silu[r + 1]);
      for (let j = 0; j < seg; j++) {
        const etu = nelio(a[j], a[j + 1], b[j + 1], b[j], [0, 0, 1], rooli);
        const taka = nelio(...[a[j], a[j + 1], b[j + 1], b[j]].map((q) => [q[0], q[1], q[2] - syv]), [0, 0, -1], rooli);
        k.push(...etu, ...taka);
      }
    }
  }
  return k;
}

export const RESEPTIT = { kangaspakka, vaatepino, vaateorsi };

// Pinnat: olemassa olevat 'vaate' (punaruskea), 'kangas' (pellavan beige), 'vaate2', 'puu' — ei uusia pintoja.
export const OLETUSPINNAT = {
  kangaspakka: { kangas: 'vaate', reuna: 'kangas' },
  vaatepino: { kangas: 'vaate', kangas2: 'kangas' },
  vaateorsi: { puu: 'puu', kangas: 'vaate', kangas2: 'kangas' },
};
