#!/usr/bin/env node
// LIPPUANKKURIT (Karttaseppä 26.9.2026, löydös 161; koilliskulma Linssiseppä 29.9.2026): kohdemaan lipputanko maan
// OIKEAAN YLÄKULMAAN maalle, ei pääkaupunkiin. Omistaja 29.9.2026 klo 23.2x (iPad-kuva Italiasta, lippu Puglian keskellä):
// "Lippu pitää olla aina maan oik. yläkulmassa. Muuten se näkyy huonosti kun koko maa on näytöllä."
//
//   node tools/tee-lippuankkurit.mjs <ne_10m_admin_0_countries.geojson> <kaupungit.json> \
//     <takynostot.json> <ulos.json> <perustelut.json> [ISO3 …]
//
// SÄÄNNÖT (samat kuin natiivin Linssit/Ydin/Maat/Lippukulma.cs, joka laskee paikan maarajoista):
//   1. mantere = maan suurin yhtenäinen maapolygoni (Natural Earth 10m admin-0), reiät mukana, ei saaria;
//   2. piste vähintään LAIDASTA_KM sisämaassa rannasta ja valtionrajasta (pienessä maassa puolet syvimmästä);
//      etäisyyskenttä rasterina (chamfer);
//   3. ehdoista lähin mantereen rajalaatikon koilliskulmaa laatikkoon suhteutettuna: u = itä 0…1, v = pohjoinen 0…1,
//      pisteet (1 − u)² + (1 − v)²;
//   4. vähintään KOHTEISTA_KM lähimmästä kaupungista ja nostosta, jos sellainen piste on enintään KOHTEEN_VARA
//      huonompi kuin paras.
// Kohteet: pelin kaupungit (sisältöpaketin kaupungit.json, kaikki tärkeysluokat), täkynostojen
// paikat (takynostot.json) ja lukitut nostoankkurit (js/packs/nostoankkurit-*.js).
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { gunzipSync } from 'node:zlib';

const TAMA = dirname(fileURLToPath(import.meta.url));
export const LAIDASTA_KM = 15;
export const KOHTEISTA_KM = 25;
export const KOHTEEN_VARA = 0.03;
const RAD = Math.PI / 180;

const ulkorenkaat = (g) => (g.type === 'Polygon' ? [g.coordinates] : g.type === 'MultiPolygon' ? g.coordinates : []);
function alaKm2(rengas) {
  let s = 0; const lat0 = rengas.reduce((a, p) => a + p[1], 0) / rengas.length; const kx = 111.32 * Math.cos(lat0 * RAD);
  for (let i = 0, j = rengas.length - 1; i < rengas.length; j = i, i += 1) s += (rengas[j][0] - rengas[i][0]) * kx * (rengas[j][1] + rengas[i][1]) * 110.57;
  return Math.abs(s) / 2;
}
export const mantere = (piirre) => ulkorenkaat(piirre.geometry).reduce((b, p) => (!b || alaKm2(p[0]) > alaKm2(b[0]) ? p : b), null);

/** Monikulmio (renkaat) → sisämaarasteri ja etäisyys reunaan km (chamfer, rivikohtainen x-mitta). */
export function etaisyyskentta(renkaat, solu) {
  let w = Infinity; let s = Infinity; let e = -Infinity; let n = -Infinity;
  for (const [x, y] of renkaat[0]) { w = Math.min(w, x); e = Math.max(e, x); s = Math.min(s, y); n = Math.max(n, y); }
  w -= solu; e += solu; s -= solu; n += solu;
  const W = Math.ceil((e - w) / solu) + 1; const H = Math.ceil((n - s) / solu) + 1;
  const sisalla = new Uint8Array(W * H);
  for (let r = 0; r < H; r += 1) {
    const lat = n - (r + 0.5) * solu; const xs = [];
    for (const rengas of renkaat) for (let i = 0, j = rengas.length - 1; i < rengas.length; j = i, i += 1) {
      const [x1, y1] = rengas[j]; const [x2, y2] = rengas[i];
      if ((y1 > lat) !== (y2 > lat)) xs.push(x1 + ((lat - y1) / (y2 - y1)) * (x2 - x1));
    }
    xs.sort((a, b) => a - b);
    for (let k = 0; k + 1 < xs.length; k += 2) {
      const c0 = Math.max(0, Math.ceil((xs[k] - w) / solu - 0.5)); const c1 = Math.min(W - 1, Math.floor((xs[k + 1] - w) / solu - 0.5));
      for (let c = c0; c <= c1; c += 1) sisalla[r * W + c] = 1;
    }
  }
  const d = new Float32Array(W * H); for (let i = 0; i < W * H; i += 1) d[i] = sisalla[i] ? 1e9 : 0;
  const dy = solu * 110.57;
  const kulje = (r0, r1, askel, c0, c1, cAskel, naapurit) => {
    for (let r = r0; r !== r1; r += askel) {
      const dx = solu * 111.32 * Math.cos((n - (r + 0.5) * solu) * RAD); const dd = Math.hypot(dx, dy);
      for (let c = c0; c !== c1; c += cAskel) {
        const i = r * W + c; if (!d[i]) continue; let v = d[i];
        for (const [or, oc, m] of naapurit) {
          const rr = r + or; const cc = c + oc; if (rr < 0 || cc < 0 || rr >= H || cc >= W) continue;
          const pit = m === 'x' ? dx : m === 'y' ? dy : dd; v = Math.min(v, d[rr * W + cc] + pit);
        }
        d[i] = v;
      }
    }
  };
  kulje(0, H, 1, 0, W, 1, [[0, -1, 'x'], [-1, 0, 'y'], [-1, -1, 'd'], [-1, 1, 'd']]);
  kulje(H - 1, -1, -1, W - 1, -1, -1, [[0, 1, 'x'], [1, 0, 'y'], [1, 1, 'd'], [1, -1, 'd']]);
  return { W, H, w, n, solu, sisalla, d, lon: (c) => w + (c + 0.5) * solu, lat: (r) => n - (r + 0.5) * solu };
}

const kmValilla = ([lon1, lat1], [lon2, lat2]) => {
  const h = Math.sin(((lat2 - lat1) * RAD) / 2) ** 2 + Math.cos(lat1 * RAD) * Math.cos(lat2 * RAD) * Math.sin(((lon2 - lon1) * RAD) / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
};

export function lippuankkuri(piirre, kohteet) {
  const renkaat = mantere(piirre);
  const lons = renkaat[0].map((p) => p[0]); const lonMin = Math.min(...lons); const lonMax = Math.max(...lons);
  const lats = renkaat[0].map((p) => p[1]); const latMin = Math.min(...lats); const latMax = Math.max(...lats);
  const laajuus = Math.max(lonMax - lonMin, latMax - latMin);
  const solu = Math.max(0.004, laajuus / 900);
  const k = etaisyyskentta(renkaat, solu);
  const lahella = kohteet.filter(([lon, lat]) => lon > lonMin - 1 && lon < lonMax + 1 && lat > latMin - 1 && lat < latMax + 1);
  const lahinKohde = (p) => lahella.reduce((b, q) => { const km = kmValilla(p, q); return km < b.km ? { km, nimi: q[2] } : b; }, { km: Infinity, nimi: null });
  let syvin = 0; for (let i = 0; i < k.W * k.H; i += 1) if (k.sisalla[i]) syvin = Math.max(syvin, k.d[i]);
  const kynnys = Math.min(LAIDASTA_KM, 0.5 * syvin);
  const piste = (i) => [k.lon(i % k.W), k.lat(Math.floor(i / k.W))];
  const kulma = (i) => { const [lon, lat] = piste(i); const u = (lon - lonMin) / Math.max(1e-9, lonMax - lonMin); const v = (lat - latMin) / Math.max(1e-9, latMax - latMin); return (1 - u) ** 2 + (1 - v) ** 2; };
  const ehdokkaat = [];
  for (let i = 0; i < k.W * k.H; i += 1) if (k.sisalla[i] && k.d[i] >= kynnys) ehdokkaat.push([i, kulma(i)]);
  ehdokkaat.sort((a, b) => a[1] - b[1]);
  let [valinta, paras] = ehdokkaat[0]; let ehto3 = false;
  for (const [i, pis] of ehdokkaat) {
    if (pis > paras + KOHTEEN_VARA) break;
    if (lahinKohde(piste(i)).km >= KOHTEISTA_KM) { valinta = i; paras = pis; ehto3 = true; break; }
  }
  const p = piste(valinta).map((v) => Math.round(v * 1e4) / 1e4);
  const lk = lahinKohde(p);
  return {
    piste: p,
    perustelu: {
      reunastaKm: Math.round(k.d[valinta] * 10) / 10,
      lahinKohdeKm: Number.isFinite(lk.km) ? Math.round(lk.km * 10) / 10 : null, lahinKohde: lk.nimi,
      kulma: Math.round(paras * 1e4) / 1e4,
      laatikko: [lonMin, latMin, lonMax, latMax].map((v) => Math.round(v * 1e3) / 1e3),
      mantereenAlaKm2: Math.round(alaKm2(renkaat[0])), soluAst: Math.round(solu * 1e4) / 1e4,
      ehdot: { reuna15km: kynnys >= LAIDASTA_KM, kohteet25km: ehto3 },
    },
  };
}

const neIso = (p) => [p.ADM0_A3, p.ISO_A3, p.ISO_A3_EH, p.SOV_A3].find((v) => v && v !== '-99');

async function nostoankkurit() {
  const kansio = join(TAMA, '..', 'js', 'packs'); const ulos = [];
  for (const f of readdirSync(kansio).filter((x) => /^nostoankkurit-[a-z]{3}\.js$/.test(x))) {
    const m = await import(pathToFileURL(join(kansio, f)).href);
    for (const t of Object.values(m)) for (const [id, v] of Object.entries(t)) if (Number.isFinite(v?.lat)) ulos.push([v.lng, v.lat, id]);
  }
  return ulos;
}

if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
  const [,, neP, kaupP, takyP, ulosP, perusP, ...rajaus] = process.argv;
  if (!perusP) { console.error('Käyttö: node tools/tee-lippuankkurit.mjs <ne_admin_0.geojson> <kaupungit.json> <takynostot.json> <ulos.json> <perustelut.json> [ISO3 …]'); process.exit(2); }
  const lue = (p) => JSON.parse(readFileSync(p, 'utf8'));
  const kohteet = [
    ...lue(kaupP).alkiot.filter((c) => Number.isFinite(c.lat)).map((c) => [c.lon, c.lat, `kaupunki:${c.id}`]),
    ...lue(takyP).alkiot.filter((t) => Number.isFinite(t.paikka?.lat)).map((t) => [t.paikka.lon, t.paikka.lat, `tako:${t.id}`]),
    ...(await nostoankkurit()),
  ];
  const kokoelma = JSON.parse(gunzipSync(readFileSync(join(TAMA, 'vienti', 'maakuntarajat.json.gz'))).toString('utf8'));
  const isot = rajaus.length ? rajaus : Object.values(kokoelma.maat).map((m) => m.iso3).sort();
  const maat = new Map(); for (const f of lue(neP).features) { const i = neIso(f.properties); if (i && !maat.has(i)) maat.set(i, f); }
  const tulos = {}; const perustelut = { $kuvaus: 'Lippuankkurit (tools/tee-lippuankkurit.mjs): säännöt tiedoston alussa; ehdot = mitkä säännöistä täyttyivät.', kohteita: kohteet.length, maat: {} };
  for (const iso of isot) {
    const f = maat.get(iso); if (!f) { console.error(`puuttuu NE:stä: ${iso}`); continue; }
    const { piste, perustelu } = lippuankkuri(f, kohteet);
    tulos[iso] = piste; perustelut.maat[iso] = perustelu;
  }
  // Yksi maa per rivi (diffattava, kuten 26.9.2026 käsin muotoiltu tiedosto).
  writeFileSync(ulosP, `{\n${Object.keys(tulos).sort().map((i) => `${JSON.stringify(i)}:${JSON.stringify(tulos[i])}`).join(',\n')}\n}\n`);
  writeFileSync(perusP, `${JSON.stringify(perustelut, null, 1)}\n`);
  const eh = Object.values(perustelut.maat);
  console.log(`${eh.length} maata; reuna≥15 ${eh.filter((x) => x.ehdot.reuna15km).length}, kohteet≥25 ${eh.filter((x) => x.ehdot.kohteet25km).length}`);
}
