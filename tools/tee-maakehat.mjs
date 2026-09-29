#!/usr/bin/env node
// MAAN KEHÄ MEREEN, ILMAN SAARIA (omistaja 29.9.2026 Päätoimittajan kautta):
// "maan rajan voi piirtää myös mereen. mutta jos maalla on saaria, niin älä
// piirrä niitä."
//
// Yksi SULJETTU kehä maata kohti, yhteinen aineisto webille ja natiiville
// (Natiiviseppä 29.9.: MultiLineString, yksi suljettu viiva, properties.iso,
// Maaraja.cs:n maamaa-jäsennin lukee sellaisenaan):
//
//  - VAIN MANNER. Maan suurin rengas (pinta-ala leveyspiirin kosinilla
//    korjattuna); saaret jäävät ilman renkaita, myös pääkaupungin saari
//    (omistajan sanamuoto, Natiivisepän kuittaus).
//  - MAARAJAT TARKKOINA. Janat luokitellaan samalla säännöllä kuin
//    maa–maa-rajoissa (tools/maarajat-maamaa.mjs janaOnRaja: molemmin puolin
//    eri maata, salmitesti NE 10m ocean), joten maarajaosuus on täsmälleen
//    sama viiva kuin natiivin nykyinen kehä.
//  - MERIOSUUS YKSINKERTAISTETTUNA MERELLE. Rannikkojakso yleistetään
//    (Douglas–Peucker YLEISTYS°, vuonot ja lahdet oikaistaan), työnnetään
//    ulospäin SIIRTO° ja pehmennetään (Chaikin). Siirto kapenee nollaan
//    jakson päissä, jotta kehä liittyy maarajaan saumatta.
//
//   node tools/tee-maakehat.mjs assets/data/maapolygonit.json \
//     <ne_10m_admin_0_countries.geojson> <ne_10m_ocean.geojson> <ulos.geojson> [--maat FIN,ITA,…]
//
// Ämpäriin: julisteet/pallo/vektorit/maakehat-<pvm>/maakehat.geojson
import { readFileSync, writeFileSync } from 'node:fs';
import { maapolygonitLonLat } from './maapolygonit-geojson.mjs';
import { ETAISYYS, LYHIN_JAKSO, janaOnRaja, maamaski, meriviivat } from './maarajat-maamaa.mjs';

export const YLEISTYS = 0.1; // DP-toleranssi asteina (≈ 11 km)
export const SIIRTO = 0.045; // rannikon siirto merelle päin (≈ 5 km)
export const KAVENNUS = 0.12; // siirto kasvaa nollasta täyteen tällä matkalla jakson päistä
export const CHAIKIN = 2; // pehmennyskierrokset

const kx = (lat) => Math.cos((lat * Math.PI) / 180);

/** Renkaan pinta-ala (etumerkillinen, x kosinilla korjattuna). */
export function ala(r) {
  let s = 0;
  // Sulkeva jana mukaan myös sulkemattomalle renkaalle (Norjan manner vs Huippuvuoret).
  for (let i = 0; i < r.length; i += 1) {
    const a = r[i]; const b = r[(i + 1) % r.length];
    const k = kx((a[1] + b[1]) / 2);
    s += (a[0] * k) * b[1] - (b[0] * k) * a[1];
  }
  return s / 2;
}

/** Douglas–Peucker (x kosinilla korjattuna), päät pysyvät. */
export function yleista(p, tol) {
  if (p.length < 3) return p.slice();
  const k = kx(p[0][1]);
  const pidetyt = new Uint8Array(p.length); pidetyt[0] = 1; pidetyt[p.length - 1] = 1;
  const pino = [[0, p.length - 1]];
  while (pino.length) {
    const [a, b] = pino.pop();
    const ax = p[a][0] * k; const ay = p[a][1]; const bx = p[b][0] * k; const by = p[b][1];
    const dx = bx - ax; const dy = by - ay; const l2 = dx * dx + dy * dy;
    let paras = -1; let mx = tol * tol;
    for (let i = a + 1; i < b; i += 1) {
      const x = p[i][0] * k; const y = p[i][1];
      let t = l2 ? ((x - ax) * dx + (y - ay) * dy) / l2 : 0; t = Math.max(0, Math.min(1, t));
      const d2 = (ax + t * dx - x) ** 2 + (ay + t * dy - y) ** 2;
      if (d2 > mx) { mx = d2; paras = i; }
    }
    if (paras > 0) { pidetyt[paras] = 1; pino.push([a, paras], [paras, b]); }
  }
  return p.filter((_, i) => pidetyt[i]);
}

/** Chaikin avoimelle viivalle: päät pysyvät paikallaan. */
export function chaikin(p, kierrokset = CHAIKIN) {
  let q = p;
  for (let n = 0; n < kierrokset; n += 1) {
    if (q.length < 3) return q;
    const u = [q[0]];
    for (let i = 0; i < q.length - 1; i += 1) {
      const [x0, y0] = q[i]; const [x1, y1] = q[i + 1];
      u.push([0.75 * x0 + 0.25 * x1, 0.75 * y0 + 0.25 * y1], [0.25 * x0 + 0.75 * x1, 0.25 * y0 + 0.75 * y1]);
    }
    u.push(q[q.length - 1]);
    q = u;
  }
  return q;
}

export const PIIKKI_AST = 40; // alle tämän kulman kärki poistetaan (kapea lahti tai niemi)

/**
 * TERÄVÄT KÄRJET POIS: yleistys jättää kapean lahden (Amvrakikos) tai niemen
 * (Khalkidikin sormet) pohjan piikiksi. Kärki, jonka kulma on alle PIIKKI_AST,
 * poistetaan toistuvasti — kehä oikaisee lahden suun tai niemen tyven yli.
 */
export function poistaPiikit(p, raja = PIIKKI_AST) {
  const q = p.slice();
  const cosRaja = Math.cos((raja * Math.PI) / 180);
  let muuttui = true;
  while (muuttui && q.length > 3) {
    muuttui = false;
    for (let i = 1; i < q.length - 1; i += 1) {
      const k = kx(q[i][1]);
      const ax = (q[i - 1][0] - q[i][0]) * k; const ay = q[i - 1][1] - q[i][1];
      const bx = (q[i + 1][0] - q[i][0]) * k; const by = q[i + 1][1] - q[i][1];
      const la = Math.hypot(ax, ay); const lb = Math.hypot(bx, by);
      if (!la || !lb) { q.splice(i, 1); muuttui = true; break; }
      if ((ax * bx + ay * by) / (la * lb) > cosRaja) { q.splice(i, 1); muuttui = true; break; }
    }
  }
  return q;
}

export const LAHDEN_SUU = 0.12; // lahti, jonka suu on tätä kapeampi (≈ 13 km), oikaistaan

/**
 * KAPEAT LAHDET KIINNI (Amvrakikos 29.9.): kun rannikon kaksi kärkeä ovat alle
 * LAHDEN_SUU päässä toisistaan ja niiden välinen silmukka kiertää VASTAKKAISEEN
 * suuntaan kuin rengas, silmukka on vettä — se korvataan suoralla suun yli.
 * Samaan suuntaan kiertävä silmukka on niemi (maata) ja jää.
 */
export function suljeLahdet(p, ulos, suu = LAHDEN_SUU) {
  let q = p.slice();
  let muuttui = true;
  while (muuttui) {
    muuttui = false;
    for (let i = 0; i < q.length - 2 && !muuttui; i += 1) {
      for (let j = q.length - 1; j > i + 1; j -= 1) {
        const k = kx(q[i][1]);
        if (Math.hypot((q[j][0] - q[i][0]) * k, q[j][1] - q[i][1]) >= suu) continue;
        // Lahti on paikallinen: enintään puolet kärjistä ja 2° kaarta (saarivaltion koko rengas ei ole lahti).
        if (j - i > q.length / 2) continue;
        const silmukka = q.slice(i, j + 1);
        let kaari = 0;
        for (let m = i + 1; m <= j; m += 1) kaari += Math.hypot((q[m][0] - q[m - 1][0]) * k, q[m][1] - q[m - 1][1]);
        if (kaari > 2) continue;
        if (Math.sign(ala(silmukka)) * ulos < 0) { q = [...q.slice(0, i + 1), ...q.slice(j)]; muuttui = true; break; }
      }
    }
  }
  return q;
}

/** Rannikkojakso merelle: yleistys, piikit ja kapeat lahdet pois, ulospäin siirto (kapeneva päistä), pehmennys. `ulos` = +1 CCW-renkaalla. */
export function merijakso(p, ulos, { yleistys = YLEISTYS, siirto = SIIRTO, kavennus = KAVENNUS } = {}) {
  const q = suljeLahdet(poistaPiikit(yleista(p, yleistys)), ulos);
  if (q.length < 2) return q;
  // Kaarenpituus päistä kapenemista varten.
  const s = [0];
  for (let i = 1; i < q.length; i += 1) {
    const k = kx(q[i][1]);
    s.push(s[i - 1] + Math.hypot((q[i][0] - q[i - 1][0]) * k, q[i][1] - q[i - 1][1]));
  }
  const L = s[s.length - 1];
  const siirretty = q.map(([x, y], i) => {
    if (i === 0 || i === q.length - 1) return [x, y];
    const k = kx(y);
    const [ax, ay] = q[i - 1]; const [bx, by] = q[i + 1];
    const tx = (bx - ax) * k; const ty = by - ay; const l = Math.hypot(tx, ty) || 1;
    // Oikea normaali (ty, -tx) osoittaa CCW-renkaalla ulos.
    const nx = (ulos * ty) / l; const ny = (ulos * -tx) / l;
    const kap = Math.min(1, Math.min(s[i], L - s[i]) / kavennus);
    return [x + (nx * siirto * kap) / Math.max(k, 0.05), y + ny * siirto * kap];
  });
  return chaikin(siirretty);
}

/** Janaluokat renkaalle (true = maaraja), sama kohinan siivous kuin rajajaksoissa. */
function luokat(rengas, maski, rannat) {
  const n = rengas.length - 1;
  const l = new Array(n);
  for (let i = 0; i < n; i += 1) l[i] = janaOnRaja(maski, rengas[i], rengas[i + 1], ETAISYYS, rannat);
  for (let i = 0; i < n; i += 1) if (l[i] === null) l[i] = l[(i + n - 1) % n] ?? false;
  for (let kierros = 0; kierros < 3; kierros += 1) {
    let muuttui = false; let alku = 0;
    for (let i = 1; i <= n; i += 1) {
      if (i === n || l[i] !== l[alku]) {
        if (i - alku < LYHIN_JAKSO && !(alku === 0 && i === n)) { for (let j = alku; j < i; j += 1) l[j] = !l[j]; muuttui = true; }
        alku = i;
      }
    }
    if (!muuttui) break;
  }
  return l;
}

/**
 * Mantereen valinta LAATIKOSTA, ei pinta-alasta: Natural Earthin Norjan
 * mannerrengas (17 367 kärkeä) on vuonojen kohdalta itseään sivuava, ja sen
 * shoelace-ala jäi pienemmäksi kuin Huippuvuorten. Laatikon ala (x kosinilla)
 * on tälle luokittelulle riittävä ja vakaa.
 */
export function laatikkoAla(r) {
  let x0 = Infinity; let x1 = -Infinity; let y0 = Infinity; let y1 = -Infinity;
  for (const [x, y] of r) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
  return (x1 - x0) * kx((y0 + y1) / 2) * (y1 - y0);
}

/** Kiertosuunta vasemmanpuoleisimman kärjen ristitulosta (+1 = vastapäivään), vakaa myös sivuavalle renkaalle. */
export function kiertosuunta(r) {
  const n = r.length - 1;
  let i = 0;
  for (let j = 1; j < n; j += 1) if (r[j][0] < r[i][0] || (r[j][0] === r[i][0] && r[j][1] < r[i][1])) i = j;
  const a = r[(i + n - 1) % n]; const b = r[i]; const c = r[(i + 1) % n];
  const risti = (b[0] - a[0]) * (c[1] - b[1]) - (b[1] - a[1]) * (c[0] - b[0]);
  return risti > 0 ? 1 : -1;
}

/** Yhden maan kehä: manner-renkaan maarajat tarkkoina, meriosuudet yksinkertaistettuina merelle. */
export function maanKeha(renkaat, maski, rannat, asetukset = {}) {
  if (!renkaat.length) return null;
  let manner = renkaat[0]; let suurin = laatikkoAla(manner);
  for (const r of renkaat) { const a = laatikkoAla(r); if (a > suurin) { suurin = a; manner = r; } }
  const r = manner[0][0] === manner[manner.length - 1][0] && manner[0][1] === manner[manner.length - 1][1]
    ? manner : [...manner, manner[0]];
  const ulos = kiertosuunta(r);
  const n = r.length - 1;
  const l = luokat(r, maski, rannat);
  if (l.every(Boolean)) return r.slice();
  if (!l.some(Boolean)) {
    // Saarivaltio (ei maarajaa): koko rengas merijaksona, suljetaan.
    const q = merijakso(r, ulos, { ...asetukset, kavennus: 1e-9 });
    return [...q.slice(0, -1), q[0]];
  }
  // Aloitetaan maarajajakson alusta, jolloin jokainen jakso on yhtenäinen.
  let alku = 0;
  while (!(l[alku] && !l[(alku + n - 1) % n])) alku = (alku + 1) % n;
  const keha = [];
  let i = 0;
  while (i < n) {
    const tyyppi = l[(alku + i) % n];
    let j = i;
    while (j < n && l[(alku + j) % n] === tyyppi) j += 1;
    const p = [];
    for (let m = i; m <= j; m += 1) p.push(r[(alku + m) % n]);
    const osa = tyyppi ? p : merijakso(p, ulos, asetukset);
    keha.push(...(keha.length ? osa.slice(1) : osa));
    i = j;
  }
  return keha;
}

export function maakehat(maapolygonit, ne, meri, maat = null) {
  const maski = maamaski(ne);
  const rannat = meri ? meriviivat(meri) : null;
  const features = [];
  for (const { iso, renkaat } of maapolygonitLonLat(maapolygonit)) {
    if (maat && !maat.has(iso)) continue;
    const keha = maanKeha(renkaat, maski, rannat);
    if (!keha || keha.length < 4) continue;
    features.push({
      type: 'Feature',
      properties: { iso, saaria: renkaat.length - 1 },
      geometry: { type: 'MultiLineString', coordinates: [keha.map(([x, y]) => [+x.toFixed(4), +y.toFixed(4)])] },
    });
  }
  return features;
}

if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
  const [,, lahde, nePolku, meriPolku, ulos] = process.argv;
  if (!lahde || !nePolku || !meriPolku || !ulos) {
    console.error('Käyttö: node tools/tee-maakehat.mjs <maapolygonit.json> <ne_10m_admin_0_countries.geojson> <ne_10m_ocean.geojson> <ulos.geojson> [--maat FIN,ITA]');
    process.exit(1);
  }
  const mi = process.argv.indexOf('--maat');
  const maat = mi >= 0 ? new Set(process.argv[mi + 1].split(',')) : null;
  const j = JSON.parse(readFileSync(lahde, 'utf8'));
  const features = maakehat(j, JSON.parse(readFileSync(nePolku, 'utf8')), JSON.parse(readFileSync(meriPolku, 'utf8')), maat);
  writeFileSync(ulos, JSON.stringify({
    type: 'FeatureCollection',
    lahde: `${j.lahde}; manner-rengas, maarajat admin-0-maamaski ${ETAISYYS}°, meri DP ${YLEISTYS}° + siirto ${SIIRTO}° + Chaikin ${CHAIKIN}`,
    kuvaus: 'Yksi suljettu kehä maata kohti: maarajat tarkkoina, rannikko yksinkertaistettuna merelle, ei saaria.',
    features,
  }));
  console.log(`${features.length} maata, ${features.reduce((s, f) => s + f.geometry.coordinates[0].length, 0)} pistettä`);
}
