#!/usr/bin/env node
// MERIKOHDAT (Karttaseppä 26.9.2026, Fablen tilaus Linssisepän merikoristeille,
// docs/raportit/meren-koristeanimaatiot-20260926.md "Valintasääntö" kohta 1): kohdemaan
// rannikon edustan meret ja ankkuripisteet eläville meren koristeille.
//
//   node tools/tee-merikohdat.mjs <ne_10m_admin_0_countries.geojson> <ulos.json> <perustelut.json> [ISO3 …]
//
// SÄÄNNÖT:
//   1. maa-/merirasteri Euroopan laatikossa (NE 10m admin-0, kaikki maat maana); jokaiselle
//      merisolulle lähin rantasolu ja sen maa (etäisyysvektorin kuljetus, 2 kierrosta);
//   2. meri = solun paikka (MERI-säännöt alla, IHO-rajojen karkea jako); maan meret = ne meret,
//      joihin sen rannikon edustalla on ehdokkaita;
//   3. ehdokas: lähin ranta on kohdemaan, rannasta RANNASTA_KM[0]–[1] km (avomerta, ei
//      satamaa), vähintään REITISTA_KM laivareiteistä (tools/vienti/reitit1873.json.gz, laji
//      laiva), eikä vierasta maata RAJASTA_KM:n säteellä (kiekko solu solulta);
//   4. valinta meri kerrallaan: paras (rannasta lähimpänä IHANNE_KM:ää) ensin, sitten
//      kaukaisin jo valituista (farthest point), kunnes VALI_KM ei täyty tai MAKS_PER_MERI;
//      eri merten kohdat vähintään MERTEN_VALI_KM toisistaan;
//   5. etäsaaret (yli ETASAARI_KM maan suurimmasta osasta: Jan Mayen, Azorit, Madeira, Kanaria)
//      ovat maata mutta eivät kohdemaan rantaa;
//   6. suunta = kompassisuunta rannasta merelle (lähimmästä rantasolusta ankkuriin);
//      rannikon kulku on suunta ± 90°.
// Nykyaikaisia väyliä (AIS) ei ole datana; 1873-laivareitit ovat pelin omat piirretyt reitit.
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gunzipSync } from 'node:zlib';

const TAMA = dirname(fileURLToPath(import.meta.url));
const RAD = Math.PI / 180;
export const LAATIKKO = { w: -32, e: 46, s: 27, n: 73 }; // Svalbard (76°) jää ulos
export const SOLU = 0.025;
export const RANNASTA_KM = [15, 45];
export const IHANNE_KM = 25;
export const REITISTA_KM = 12;
export const RAJASTA_KM = 35;
export const VALI_KM = 140;
export const MAKS_PER_MERI = 4;
export const MERTEN_VALI_KM = 60; // saman maan kohtien väli meren rajan yli
export const ETASAARI_KM = 400;
export const EUROOPPA = ['ALB', 'BEL', 'BGR', 'BIH', 'CYP', 'DEU', 'DNK', 'ESP', 'EST', 'FIN', 'FRA', 'GBR', 'GRC', 'HRV',
  'IRL', 'ISL', 'ITA', 'LTU', 'LVA', 'MLT', 'MNE', 'NLD', 'NOR', 'POL', 'PRT', 'ROU', 'RUS', 'SVN', 'SWE', 'TUR', 'UKR'];
export const MERET = {
  valimeri: 'Välimeri', mustameri: 'Mustameri', atlantti: 'Atlantti', pohjanmeri: 'Pohjanmeri',
  kanaali: 'Kanaali', itameri: 'Itämeri', jaameri: 'Jäämeri',
};

/** Meri paikan mukaan (IHO-rajojen karkea jako; järjestys ratkaisee). */
export function meri(lon, lat) {
  // Krimin edusta jää pois (NE:n rajat sijoittavat Krimin Venäjälle; ei kummankaan kohdemaan koristeita).
  if (lon >= 32.0 && lon <= 36.8 && lat >= 44.0 && lat <= 46.3) return null;
  if (lat >= 70.5 || (lon >= 30 && lat >= 63.5) || (lon >= -25 && lon <= -13 && lat >= 66.2)) return 'jaameri';
  if (lat >= 41.0 && lat <= 47.5 && lon >= 27.4 && lon <= 42) return 'mustameri';
  const biskaja = lon < 0.5 && lat >= 42.5;
  if (lat < 46.5 && lon >= -5.6 && lon < 37 && !biskaja) return 'valimeri';
  if (lat >= 48.4 && lat <= 51.1 && lon > -5.2 && lon < 2.0) return 'kanaali';
  const skagerrak = lat >= 57.6 && lat <= 60 && lon < 11.5;
  // Pohjanlahti alkaa 60°:n pohjoispuolella vasta 16,5° idässä (Norjan rannikko on Atlanttia);
  // Suomenlahden itäpää 31° (Vienanmeri on Jäämerta).
  if (lat >= 53.5 && lat <= 66 && !skagerrak && (lat <= 60 ? lon >= 9.5 : lon >= 16.5 && lon <= 31)) return 'itameri';
  const moray = lat >= 57.5 && lat < 58.7 && lon > -4.3 && lon < -1.7;
  if (lat >= 51.0 && lat <= 61.0 && (lon > -2.9 || moray) && lon < 11.5) return 'pohjanmeri';
  if (lat >= 48.4 || lon < -5.6 || biskaja) return 'atlantti';
  return null;
}

const kmValilla = ([lon1, lat1], [lon2, lat2]) => {
  const h = Math.sin(((lat2 - lat1) * RAD) / 2) ** 2 + Math.cos(lat1 * RAD) * Math.cos(lat2 * RAD) * Math.sin(((lon2 - lon1) * RAD) / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
};
const neIso = (p) => [p.ADM0_A3, p.ISO_A3, p.ISO_A3_EH, p.SOV_A3].find((v) => v && v !== '-99');
const monikulmiot = (g) => (g.type === 'Polygon' ? [g.coordinates] : g.type === 'MultiPolygon' ? g.coordinates : []);

/** Maarasteri: solu → maan numero (0 = meri). Parillis-pariton täyttö renkaittain (reiät mukana). */
export function maarasteri(piirteet, L = LAATIKKO, solu = SOLU) {
  const W = Math.round((L.e - L.w) / solu); const H = Math.round((L.n - L.s) / solu);
  const maa = new Uint16Array(W * H); const isot = [null];
  for (const { iso, geometry } of piirteet) {
    const nro = isot.push(iso) - 1; const eta = isot.push(`${iso}~etasaari`) - 1;
    const osat = monikulmiot(geometry); const suurin = osat.reduce((b, o) => (!b || o[0].length > b[0].length ? o : b), null);
    for (const renkaat of osat) {
      // Etäsaari: osan kaikki kärjet yli ETASAARI_KM suurimman osan kärjistä (harvennettu vertailu).
      const harva = (r) => r.filter((_, i) => i % Math.max(1, Math.floor(r.length / 200)) === 0);
      const oma = renkaat === suurin || harva(renkaat[0]).some((p) => harva(suurin[0]).some((q) => kmValilla(p, q) < ETASAARI_KM));
      let s = Infinity; let n = -Infinity; let w = Infinity; let e = -Infinity;
      for (const [x, y] of renkaat[0]) { s = Math.min(s, y); n = Math.max(n, y); w = Math.min(w, x); e = Math.max(e, x); }
      if (e < L.w || w > L.e || n < L.s || s > L.n) continue;
      const r0 = Math.max(0, Math.floor((L.n - n) / solu)); const r1 = Math.min(H - 1, Math.ceil((L.n - s) / solu));
      for (let r = r0; r <= r1; r += 1) {
        const lat = L.n - (r + 0.5) * solu; const xs = [];
        for (const rengas of renkaat) for (let i = 0, j = rengas.length - 1; i < rengas.length; j = i, i += 1) {
          const [x1, y1] = rengas[j]; const [x2, y2] = rengas[i];
          if ((y1 > lat) !== (y2 > lat)) xs.push(x1 + ((lat - y1) / (y2 - y1)) * (x2 - x1));
        }
        xs.sort((a, b) => a - b);
        for (let k = 0; k + 1 < xs.length; k += 2) {
          const c0 = Math.max(0, Math.ceil((xs[k] - L.w) / solu - 0.5)); const c1 = Math.min(W - 1, Math.floor((xs[k + 1] - L.w) / solu - 0.5));
          for (let c = c0; c <= c1; c += 1) maa[r * W + c] = oma ? nro : eta;
        }
      }
    }
  }
  return { W, H, L, solu, maa, isot, lon: (c) => L.w + (c + 0.5) * solu, lat: (r) => L.n - (r + 0.5) * solu };
}

/** Jokaiselle merisolulle lähin maasolu (lahde) ja etäisyys km (vektorikuljetus, 2 kierrosta). */
export function lahinRanta(R) {
  const { W, H, solu } = R; const N = W * H;
  const lahde = new Int32Array(N).fill(-1); const d = new Float32Array(N).fill(Infinity);
  for (let i = 0; i < N; i += 1) if (R.maa[i]) { lahde[i] = i; d[i] = 0; }
  const km = (i, j) => {
    const r1 = Math.floor(i / W); const r2 = Math.floor(j / W);
    const dx = ((i % W) - (j % W)) * solu * 111.32 * Math.cos(R.lat((r1 + r2) / 2) * RAD); const dy = (r1 - r2) * solu * 110.57;
    return Math.hypot(dx, dy);
  };
  const kierros = (eteen) => {
    const naap = eteen ? [[0, -1], [-1, -1], [-1, 0], [-1, 1]] : [[0, 1], [1, 1], [1, 0], [1, -1]];
    for (let k = 0; k < N; k += 1) {
      const i = eteen ? k : N - 1 - k; if (d[i] === 0) continue;
      const r = Math.floor(i / W); const c = i % W;
      for (const [or, oc] of naap) {
        const rr = r + or; const cc = c + oc; if (rr < 0 || cc < 0 || rr >= H || cc >= W) continue;
        const l = lahde[rr * W + cc]; if (l < 0) continue;
        const v = km(i, l); if (v < d[i]) { d[i] = v; lahde[i] = l; }
      }
    }
  };
  for (let t = 0; t < 2; t += 1) { kierros(true); kierros(false); }
  return { lahde, d, km };
}

/** Etäisyys pisteestä murtoviivaan km (paikallinen tasoprojektio). */
function kmViivaan(p, viiva) {
  const kx = 111.32 * Math.cos(p[1] * RAD); const ky = 110.57; let paras = Infinity;
  for (let i = 1; i < viiva.length; i += 1) {
    const ax = (viiva[i - 1][0] - p[0]) * kx; const ay = (viiva[i - 1][1] - p[1]) * ky;
    const bx = (viiva[i][0] - p[0]) * kx; const by = (viiva[i][1] - p[1]) * ky;
    const vx = bx - ax; const vy = by - ay; const l2 = vx * vx + vy * vy;
    const t = l2 ? Math.max(0, Math.min(1, -(ax * vx + ay * vy) / l2)) : 0;
    paras = Math.min(paras, Math.hypot(ax + t * vx, ay + t * vy));
  }
  return paras;
}
const suunta = ([lon1, lat1], [lon2, lat2]) => {
  const y = Math.sin((lon2 - lon1) * RAD) * Math.cos(lat2 * RAD);
  const x = Math.cos(lat1 * RAD) * Math.sin(lat2 * RAD) - Math.sin(lat1 * RAD) * Math.cos(lat2 * RAD) * Math.cos((lon2 - lon1) * RAD);
  return Math.round(((Math.atan2(y, x) / RAD) + 360) % 360);
};

/** Onko vierasta maata (ei kohdemaata eikä sen etäsaaria) sade-km:n kiekossa solun ympärillä. */
function vierasLahella(R, i, oma, sade) {
  const r0 = Math.floor(i / R.W); const c0 = i % R.W;
  const ky = R.solu * 110.57; const kx = R.solu * 111.32 * Math.cos(R.lat(r0) * RAD);
  const dr = Math.ceil(sade / ky); const dc = Math.ceil(sade / kx); const omaEta = R.isot.indexOf(`${R.isot[oma]}~etasaari`);
  for (let r = Math.max(0, r0 - dr); r <= Math.min(R.H - 1, r0 + dr); r += 1) {
    for (let c = Math.max(0, c0 - dc); c <= Math.min(R.W - 1, c0 + dc); c += 1) {
      const m = R.maa[r * R.W + c]; if (!m || m === oma || m === omaEta) continue;
      if (Math.hypot((r - r0) * ky, (c - c0) * kx) <= sade) return true;
    }
  }
  return false;
}

/** Maan merikohdat: { meret: [...], kohdat: [{ meri, lon, lat, suunta, rannastaKm }] }. */
export function merikohdat(R, T, iso, reitit = []) {
  const oma = R.isot.indexOf(iso); if (oma < 1) return null;
  const ehd = new Map(); // meri → [{ i, p, d }]
  for (let i = 0; i < R.W * R.H; i += 1) {
    const d = T.d[i]; if (R.maa[i] || d < RANNASTA_KM[0] || d > RANNASTA_KM[1] || R.maa[T.lahde[i]] !== oma) continue;
    const p = [R.lon(i % R.W), R.lat(Math.floor(i / R.W))]; const m = meri(p[0], p[1]); if (!m) continue;
    (ehd.get(m) ?? ehd.set(m, []).get(m)).push({ i, p, d });
  }
  const kohdat = []; const hylatyt = {};
  for (const [m, lista] of [...ehd].sort(([a], [b]) => a.localeCompare(b))) {
    const kelpo = lista.filter((e) => reitit.every((v) => kmViivaan(e.p, v) >= REITISTA_KM));
    kelpo.sort((a, b) => Math.abs(a.d - IHANNE_KM) - Math.abs(b.d - IHANNE_KM));
    // Vain avomeren parhaat kolmannes (lähimpänä ihannetta) kelpaa valintaan.
    const pohja = kelpo.slice(0, Math.max(1, Math.ceil(kelpo.length / 3)));
    const muisti = new Map();
    const vieras = (e) => (muisti.has(e.i) ? muisti.get(e.i) : muisti.set(e.i, vierasLahella(R, e.i, oma, RAJASTA_KM)).get(e.i));
    const muut = kohdat.map((k) => [k.lon, k.lat]);
    const erillaan = (e) => muut.every((q) => kmValilla(e.p, q) >= MERTEN_VALI_KM);
    const valitut = [];
    for (const e of pohja) { if (erillaan(e) && !vieras(e)) { valitut.push(e); break; } }
    if (!valitut.length) { hylatyt[m] = `${lista.length} ehdokasta, ${kelpo.length} reiteistä vapaana, ei yhtään ilman vierasta rantaa ${RAJASTA_KM} km:n säteellä tai muiden merten kohdista erillään`; continue; }
    while (valitut.length < MAKS_PER_MERI) {
      let paras = null; let parasKm = 0;
      for (const e of pohja) {
        const km = Math.min(...valitut.map((v) => kmValilla(e.p, v.p)));
        if (km > parasKm && km >= VALI_KM && erillaan(e) && !vieras(e)) { paras = e; parasKm = km; }
      }
      if (!paras) break; valitut.push(paras);
    }
    for (const v of valitut) {
      const l = T.lahde[v.i]; const ranta = [R.lon(l % R.W), R.lat(Math.floor(l / R.W))];
      kohdat.push({ meri: m, lon: Math.round(v.p[0] * 1e3) / 1e3, lat: Math.round(v.p[1] * 1e3) / 1e3, suunta: suunta(ranta, v.p), rannastaKm: Math.round(v.d) });
    }
  }
  return { meret: [...new Set(kohdat.map((k) => k.meri))], kohdat, hylatyt };
}

export function laivareitit() {
  const j = JSON.parse(gunzipSync(readFileSync(join(TAMA, 'vienti', 'reitit1873.json.gz'))).toString('utf8'));
  return j.reitit.filter((r) => r.laji === 'laiva').flatMap((r) => r.viivat);
}

if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
  const [,, neP, ulosP, perusP, ...rajaus] = process.argv;
  if (!perusP) { console.error('Käyttö: node tools/tee-merikohdat.mjs <ne_admin_0.geojson> <ulos.json> <perustelut.json> [ISO3 …]'); process.exit(2); }
  const ne = JSON.parse(readFileSync(neP, 'utf8'));
  const R = maarasteri(ne.features.map((f) => ({ iso: neIso(f.properties), geometry: f.geometry })));
  const T = lahinRanta(R); const reitit = laivareitit();
  const tulos = {
    $kuvaus: 'Merikohdat meren koristeille (tools/tee-merikohdat.mjs, säännöt tiedoston alussa). suunta = kompassisuunta rannasta merelle; rannikon kulku ±90°.',
    meret: MERET, maat: {},
  };
  const perustelut = { saannot: { RANNASTA_KM, IHANNE_KM, REITISTA_KM, RAJASTA_KM, VALI_KM, MAKS_PER_MERI, SOLU }, hylatyt: {} };
  for (const iso of rajaus.length ? rajaus : EUROOPPA) {
    const m = merikohdat(R, T, iso, reitit);
    if (!m) { console.error(`puuttuu NE:stä: ${iso}`); continue; }
    if (m.kohdat.length) tulos.maat[iso] = { meret: m.meret, kohdat: m.kohdat };
    if (Object.keys(m.hylatyt).length) perustelut.hylatyt[iso] = m.hylatyt;
  }
  writeFileSync(ulosP, `${JSON.stringify(tulos, null, 1)}\n`);
  writeFileSync(perusP, `${JSON.stringify(perustelut, null, 1)}\n`);
  const k = Object.values(tulos.maat).reduce((s, m) => s + m.kohdat.length, 0);
  console.log(`${Object.keys(tulos.maat).length} maata, ${k} kohtaa; hylättyjä meriä ${Object.values(perustelut.hylatyt).reduce((s, h) => s + Object.keys(h).length, 0)}`);
}
