// DIORAAMAN RANTARESEPTIT (Linnanrakentaja 1.10.2026, Olavinlinnan ympäristö aikakerroksessa n1500; omistaja:
// "Linnan ympäristö saisi mukailla linnan kultakauden aikaa"): hirsiaitta ja venevaja. Pääpiirteet, ei rekonstruktio:
// salvottu hirsikehikko nurkanvarauksin, harjakatto (lautakatto malkoineen), kiviperustus. Paikallinen kehys (u, y, w)
// oikeakätisenä (reseptit-apu.mjs), etusuunta +w (ovi / venevajan vesipääty), pohja y = 0 (perustuksen alapinta).
import { laatikko, nelio, mulberry32 } from './reseptit-apu.mjs';

/** Kolmion normaali ulos: vaihtaa kiertosuunnan, jos (b − a) × (c − a) osoittaa ulos-suuntaa vastaan. */
function kolmioUlos(a, b, c, ulos, rooli) {
  const e1 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], e2 = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
  const n = [e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]];
  return n[0] * ulos[0] + n[1] * ulos[1] + n[2] * ulos[2] >= 0 ? { p: [a, b, c], rooli } : { p: [a, c, b], rooli };
}

/** Salvottu hirsikehikko: joka kerroksessa hirsi kaikilla neljällä seinällä, sivuseinät puoli hirttä ylempänä
 * (nurkkasalvos), jokainen hirsi ulottuu nurkan yli (varaus). Hirsien väliin 6 %:n rako varjoviivaksi. */
function hirret(k, { u0, u1, w0, w1, y0, y1, hirsi = 0.22, varaus = 0.18, rooli = 'hirsi', rng }) {
  const n = Math.max(3, Math.round((y1 - y0) / hirsi)), h = (y1 - y0) / n, p = 0.2;  // p = seinän paksuus
  const r = { yla: rooli, ala: rooli, etu: rooli, taka: rooli, vasen: rooli, oikea: rooli };
  for (let i = 0; i < n; i++) {
    const y = y0 + i * h, yl = y + h * 0.94, v = varaus + (rng() - 0.5) * 0.06;
    // etu- ja takaseinän hirret (u-suunta) kerroksen alaosassa, sivuseinien (w-suunta) puoli hirttä ylempänä
    k.push(...laatikko({ u0: u0 - v, u1: u1 + v, y0: y, y1: yl, w0: w1 - p, w1 }, r));
    k.push(...laatikko({ u0: u0 - v, u1: u1 + v, y0: y, y1: yl, w0, w1: w0 + p }, r));
    const ys = y + h / 2, yls = Math.min(ys + h * 0.94, y1);
    if (yls > ys + 0.02) {
      k.push(...laatikko({ u0, u1: u0 + p, y0: ys, y1: yls, w0: w0 - v, w1: w1 + v }, r));
      k.push(...laatikko({ u0: u1 - p, u1, y0: ys, y1: yls, w0: w0 - v, w1: w1 + v }, r));
    }
  }
}

/** Harjakatto: lappeet u-suunnassa (harja w-suuntainen), räystäät ja päätylaudat. Lautakatto + malat harjalle. */
function harjakatto(k, { u0, u1, w0, w1, y0, harja, raystas = 0.45, rooli = 'katto', paaty = 'hirsi' }) {
  const um = (u0 + u1) / 2, U0 = u0 - raystas, U1 = u1 + raystas, W0 = w0 - raystas, W1 = w1 + raystas, yh = y0 + harja;
  const kal = harja / (um - U0), yr = y0 - kal * raystas;  // räystäs laskee lappeen jatkeena
  const paks = 0.08;
  for (const [a, b] of [[U0, um], [U1, um]]) {  // kaksi lapetta, kummallakin ylä- ja alapinta
    const s = a < b ? -1 : 1;
    k.push(...nelio([a, yr, W1], [b, yh, W1], [b, yh, W0], [a, yr, W0], rooli).map((t) => kolmioUlos(...t.p, [s * kal, 1, 0], rooli)));
    k.push(...nelio([a, yr - paks, W1], [b, yh - paks, W1], [b, yh - paks, W0], [a, yr - paks, W0], rooli).map((t) => kolmioUlos(...t.p, [0, -1, 0], rooli)));
    for (const w of [W0, W1]) k.push(kolmioUlos([a, yr, w], [a, yr - paks, w], [b, yh, w], [0, 0, w > (w0 + w1) / 2 ? 1 : -1], rooli),
      kolmioUlos([a, yr - paks, w], [b, yh - paks, w], [b, yh, w], [0, 0, w > (w0 + w1) / 2 ? 1 : -1], rooli));
  }
  for (const [w, s] of [[w0, -1], [w1, 1]]) k.push(kolmioUlos([u0, y0, w], [u1, y0, w], [um, yh - 0.05, w], [0, 0, s], paaty));  // päätykolmiot
  k.push(...laatikko({ u0: um - 0.09, u1: um + 0.09, y0: yh - 0.02, y1: yh + 0.1, w0: W0, w1: W1 },
    { yla: rooli, etu: rooli, taka: rooli, vasen: rooli, oikea: rooli }));  // harjamalka
}

/** Kiviperustus: nurkka- ja välikivet (matalat laatikot), y 0…korkeus. */
function perustus(k, { u0, u1, w0, w1, korkeus = 0.35, rng }) {
  const kivi = (u, w) => {
    const r = 0.22 + rng() * 0.1;
    k.push(...laatikko({ u0: u - r, u1: u + r, y0: 0, y1: korkeus, w0: w - r, w1: w + r },
      { yla: 'kivi', etu: 'kivi', taka: 'kivi', vasen: 'kivi', oikea: 'kivi' }));
  };
  for (const u of [u0, (u0 + u1) / 2, u1]) for (const w of [w0, (w0 + w1) / 2, w1]) if (u !== (u0 + u1) / 2 || w !== (w0 + w1) / 2) kivi(u, w);
}

/**
 * Hirsiaitta: salvottu hirsikehikko kiviperustuksella, harjakatto lautaa ja malka, ovi etupäädyssä (+w).
 * leveys (u), syvyys (w), seina (seinän korkeus perustuksen päältä), harja (katon korkeus seinän päältä).
 */
export function hirsiaitta({ leveys = 3.4, syvyys = 3.8, seina = 2.2, harja = 1.3, siemen = 1 } = {}) {
  const rng = mulberry32(siemen >>> 0), k = [], pk = 0.35;
  const u0 = -leveys / 2, u1 = leveys / 2, w0 = -syvyys / 2, w1 = syvyys / 2;
  perustus(k, { u0, u1, w0, w1, korkeus: pk, rng });
  hirret(k, { u0, u1, w0, w1, y0: pk, y1: pk + seina, rng });
  k.push(...laatikko({ u0: -0.45, u1: 0.45, y0: pk + 0.1, y1: pk + 1.65, w0: w1, w1: w1 + 0.03 },
    { etu: 'ovi', vasen: 'ovi', oikea: 'ovi', yla: 'ovi' }));  // ovi
  harjakatto(k, { u0, u1, w0, w1, y0: pk + seina, harja });
  return k;
}

/**
 * Venevaja: hirsiseinät kolmella sivulla, vesipääty (+w) avoin, pitkä harjakatto matalalla; lattiaton (vene vedessä),
 * pohja y = 0 on vedenpinta, seinät paaluilla. leveys (u), pituus (w).
 */
export function venevaja({ leveys = 3.8, pituus = 7.0, seina = 1.8, harja = 1.4, siemen = 2 } = {}) {
  const rng = mulberry32(siemen >>> 0), k = [], y0 = 0.4;
  const u0 = -leveys / 2, u1 = leveys / 2, w0 = -pituus / 2, w1 = pituus / 2;
  for (const u of [u0, u1]) for (let i = 0; i <= 3; i++) {  // paalut vedessä
    const w = w0 + (i / 3) * pituus;
    k.push(...laatikko({ u0: u - 0.1, u1: u + 0.1, y0: -0.6, y1: y0, w0: w - 0.1, w1: w + 0.1 },
      { etu: 'paalu', taka: 'paalu', vasen: 'paalu', oikea: 'paalu' }));
  }
  const n = Math.round(seina / 0.22), h = seina / n, r = { yla: 'hirsi', etu: 'hirsi', taka: 'hirsi', vasen: 'hirsi', oikea: 'hirsi' };
  for (let i = 0; i < n; i++) {
    const y = y0 + i * h, yl = y + h * 0.94;
    k.push(...laatikko({ u0: u0 - 0.15, u1: u0 + 0.05, y0: y, y1: yl, w0: w0 - 0.12, w1 }, r));  // sivuseinät
    k.push(...laatikko({ u0: u1 - 0.05, u1: u1 + 0.15, y0: y, y1: yl, w0: w0 - 0.12, w1 }, r));
    k.push(...laatikko({ u0: u0 - 0.12, u1: u1 + 0.12, y0: y, y1: yl, w0: w0 - 0.15, w1: w0 + 0.05 }, r));  // takaseinä
  }
  harjakatto(k, { u0, u1, w0, w1, y0: y0 + seina, harja, raystas: 0.5 });
  void rng;
  return k;
}

export const OLETUSPINNAT = {
  hirsiaitta: { hirsi: 'puu', katto: 'lankku', kivi: 'kivi', ovi: 'lankku' },
  venevaja: { hirsi: 'puu', katto: 'lankku', paalu: 'puu' },
};
export const RESEPTIT = { hirsiaitta, venevaja };
