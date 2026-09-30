// DIORAAMAN RESEPTIEN APUFUNKTIOT (Linnanrakentaja 29.9.2026): yhteiset geometriapalat, joista reseptit
// (reseptit-rakenne.mjs, reseptit-maasto.mjs, reseptit-kalusteet.mjs) kootaan. Speksi:
// docs/raportit/dioraama-rajapinnat-20260929.md kohdat 2 ja 3b.
//
// Kolmio = { p: [a, b, c], n?: [na, nb, nc], rooli } paikallisessa kehyksessä (u, y, w), jota käsitellään
// oikeakätisenä (u = x, y = y, w = z): kärjet vastapäivään ulkoa katsottuna, eli (b − a) × (c − a) osoittaa ulos.
// n puuttuu = litteä sävytys (rakennuskone laskee kolmion normaalin).
//
// Kulmat (kaaret, sylinterit): paikallinen kompassikulma k asteina, 0 = +w (kappaleen etusuunta), 90 = +u
// (oikealle). Piste säteellä r: (u, w) = (r·sin k, r·cos k). Maailmassa k vastaa kompassia k + suunta.

const RAD = Math.PI / 180;

/** Yksi kolmio; valinnaiset pehmeät normaalit kärjittäin. */
export function kolmio(a, b, c, rooli, na, nb, nc) {
  const k = { p: [a, b, c], rooli };
  if (na && nb && nc) k.n = [na, nb, nc];
  return k;
}

/** Nelikulmio a-b-c-d (vastapäivään ulkoa katsottuna) kahtena kolmiona. */
export function nelio(a, b, c, d, rooli, n) {
  if (n) return [kolmio(a, b, c, rooli, n[0], n[1], n[2]), kolmio(a, c, d, rooli, n[0], n[2], n[3])];
  return [kolmio(a, b, c, rooli), kolmio(a, c, d, rooli)];
}

/**
 * Suorakulmainen särmiö rajoilla u0…u1, y0…y1, w0…w1. roolit: { yla, ala, etu (w1-puoli), taka (w0-puoli),
 * vasen (u0-puoli), oikea (u1-puoli) }; null tai puuttuva rooli jättää sivun pois.
 */
export function laatikko({ u0, u1, y0, y1, w0, w1 }, roolit) {
  const r = roolit || {};
  const k = [];
  // Kärjet: [u, y, w]
  const P = (u, y, w) => [u, y, w];
  if (r.yla) k.push(...nelio(P(u0, y1, w1), P(u1, y1, w1), P(u1, y1, w0), P(u0, y1, w0), r.yla));
  if (r.ala) k.push(...nelio(P(u0, y0, w0), P(u1, y0, w0), P(u1, y0, w1), P(u0, y0, w1), r.ala));
  if (r.etu) k.push(...nelio(P(u0, y0, w1), P(u1, y0, w1), P(u1, y1, w1), P(u0, y1, w1), r.etu));
  if (r.taka) k.push(...nelio(P(u1, y0, w0), P(u0, y0, w0), P(u0, y1, w0), P(u1, y1, w0), r.taka));
  if (r.vasen) k.push(...nelio(P(u0, y0, w0), P(u0, y0, w1), P(u0, y1, w1), P(u0, y1, w0), r.vasen));
  if (r.oikea) k.push(...nelio(P(u1, y0, w1), P(u1, y0, w0), P(u1, y1, w0), P(u1, y1, w1), r.oikea));
  return k;
}

/** Piste kompassikulmassa k (astetta) säteellä r keskipisteestä [u, w] korkeudella y. */
export function kaaripiste(keski, r, k, y) {
  return [keski[0] + r * Math.sin(k * RAD), y, keski[1] + r * Math.cos(k * RAD)];
}

/** Ulospäin osoittava vaakanormaali kulmassa k. */
export function kaarinormaali(k) {
  return [Math.sin(k * RAD), 0, Math.cos(k * RAD)];
}

/**
 * Sylinterivaippa kulmasta k0 kulmaan k1 (k1 > k0, myötäpäivään ylhäältä katsottuna kasvava kompassi), säde r,
 * korkeus y0…y1, segmentit koko kierrosta kohden (osakaari saa suhteellisen määrän). ulos = true: normaalit
 * ulospäin (tornin ulkopinta), false: sisäänpäin (tornin sisäpinta). Pehmeät normaalit.
 */
export function vaippa({ keski = [0, 0], r, y0, y1, k0 = 0, k1 = 360, segmentit = 32, ulos = true, rooli }) {
  const n = Math.max(1, Math.ceil(segmentit * (k1 - k0) / 360));
  const k = [];
  for (let i = 0; i < n; i++) {
    const ka = k0 + (k1 - k0) * i / n, kb = k0 + (k1 - k0) * (i + 1) / n;
    const a0 = kaaripiste(keski, r, ka, y0), b0 = kaaripiste(keski, r, kb, y0);
    const a1 = kaaripiste(keski, r, ka, y1), b1 = kaaripiste(keski, r, kb, y1);
    let na = kaarinormaali(ka), nb = kaarinormaali(kb);
    if (ulos) {
      // Tarkistettu k = 0:ssa: (b0 − a0) × (b1 − a0) = (rδ, 0, 0) × (rδ, h, 0) = (0, 0, rδh) = +w = ulos.
      k.push(...nelio(a0, b0, b1, a1, rooli, [na, nb, nb, na]));
    } else {
      na = na.map((x) => -x); nb = nb.map((x) => -x);
      k.push(...nelio(a0, b0, b1, a1, rooli, [na, nb, nb, na]).map(kaanna));
    }
  }
  return k;
}

/**
 * Kääntää kolmion kiertosuunnan (b ↔ c) normaaleineen. uv_m (erä 2) seuraa SAMAA kärkien
 * uudelleenjärjestystä (b ↔ c) kuin p ja n — kaanna vain vaihtaa kumpi taulukkopaikka vastaa
 * kumpaa fyysistä kärkeä, ei laske uusia arvoja eikä peilaa a:ta/b:tä geometrisesti, joten kärjen
 * omat uv_m-arvot pysyvät muuttumattomina ja UV:n jatkuvuus säilyy (ei tarvitse a:n etumerkin
 * kääntöä; jos joku tuleva resepti jostain syystä TARVITSISI sen, se pitäisi tehdä reseptissä
 * ennen kaanna-kutsua, ei tässä yleisessä apufunktiossa).
 */
export function kaanna(k) {
  const t = { p: [k.p[0], k.p[2], k.p[1]], rooli: k.rooli };
  if (k.n) t.n = [k.n[0], k.n[2], k.n[1]];
  if (k.uv_m) t.uv_m = [k.uv_m[0], k.uv_m[2], k.uv_m[1]];
  if (k.pinta) t.pinta = k.pinta;
  return t;
}

/**
 * Vaakasuora rengas (tai kiekko kun rSisa = 0) korkeudella y kulmasta k0 kulmaan k1. ylos = true: normaali +y.
 */
export function rengas({ keski = [0, 0], rSisa = 0, rUlko, y, k0 = 0, k1 = 360, segmentit = 32, ylos = true, rooli }) {
  const n = Math.max(1, Math.ceil(segmentit * (k1 - k0) / 360));
  const k = [];
  for (let i = 0; i < n; i++) {
    const ka = k0 + (k1 - k0) * i / n, kb = k0 + (k1 - k0) * (i + 1) / n;
    const ua = kaaripiste(keski, rUlko, ka, y), ub = kaaripiste(keski, rUlko, kb, y);
    let osat;
    if (rSisa > 0) {
      const sa = kaaripiste(keski, rSisa, ka, y), sb = kaaripiste(keski, rSisa, kb, y);
      osat = nelio(sa, ua, ub, sb, rooli);
    } else {
      osat = [kolmio([keski[0], y, keski[1]], ua, ub, rooli)];
    }
    // Ylhäältä katsottuna kulma kasvaa myötäpäivään → tarkistetaan normaali ja käännetään tarvittaessa.
    for (const t of osat) k.push(normaaliYlos(t) === ylos ? t : kaanna(t));
  }
  return k;
}

function normaaliYlos(t) {
  const [a, b, c] = t.p;
  const e1 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], e2 = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
  const ny = e1[2] * e2[0] - e1[0] * e2[2];
  return ny > 0;
}

/** Kolmion normaali (normalisoitu) (b − a) × (c − a). */
export function kolmionNormaali(t) {
  const [a, b, c] = t.p;
  const e1 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], e2 = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
  const n = [e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]];
  const l = Math.hypot(n[0], n[1], n[2]) || 1;
  return [n[0] / l, n[1] / l, n[2] / l];
}

/** Deterministinen satunnaisluku (mulberry32). */
export function mulberry32(siemen) {
  let a = siemen >>> 0;
  return function () {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
