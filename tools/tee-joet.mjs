#!/usr/bin/env node
// PELIN MAIDEN JOET VEKTOREINA (Karttaseppä 26.9.2026, Fablen tilaus elävään karttaan:
// "Kreikan oikeat joet — Natural Earthin karsitussa aineistossa niitä ei ole").
//
// LÄHDE JA LISENSSI: GEOGLOWS v2 -jokiverkko (s3://geoglows-v2/hydrography/vpu=<n>/
// streams_<n>.gpkg, julkinen AWS-ämpäri), joka on hydrologisesti ehdollistettu osajoukko
// NGA:n TDX-Hydro-aineistosta. GEOGLOWS on CC BY 4.0 ja TDX-Hydro CC BY-SA 4.0, joten
// johdettu jokiviiva on CC BY-SA 4.0 (attribuutio + sama lisenssi). HydroRIVERS hylättiin:
// HydroSHEDS-lisenssi kieltää jakelun "stand-alone"-tuotteena (julkinen ämpäri olisi sitä).
// OSM (ODbL) ei ole PD/CC.
//
// VALINTA: uoma mukaan, kun sen valuma-alue (DSContArea) ≥ --valuma km² (oletus 300).
// Pätkät ketjutetaan PÄÄUOMIKSI: pätkä jatkuu alavirran pätkään, jos se on tämän suurin
// ylävirran haara (muuten sivujoki alkaa uutena viivana). Harvennus Douglas–Peucker
// 0,002° ja pyöristys 1e-4°. Maa = viivan pisteiden enemmistömaa NE 10m admin-0
// -maatunnusrasterista (tools/maarajat-maamaa.mjs); maan osuus = pisteet maassa tai
// ±0,03°:n päässä siitä (rajajoet kummallekin maalle, suu mukana).
//
//   node tools/tee-joet.mjs --vpu 202 --maat GRC <ne_10m_admin_0_countries.geojson> <ulos.geojson>
//     [--gpkg <paikallinen streams_202.gpkg>] [--valuma 300]
//
// Tulos kuten maamaa.geojson ämpärissä (julisteet/pallo/vektorit/joet-<pvm>/<ISO>.geojson,
// gzip): FeatureCollection, jokainen piirre LineString lon/lat, properties
// { iso, valuma_km2, jarjestys (Strahler) }.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { DatabaseSync } from 'node:sqlite';
import { maamaski } from './maarajat-maamaa.mjs';
import { harvenna } from './vienti/maarajat.mjs';

export const LISENSSI = 'CC BY-SA 4.0 (GEOGLOWS v2 CC BY 4.0, TDX-Hydro/NGA CC BY-SA 4.0)';
export const ATTRIBUUTIO = 'Contains information from the GEOGLOWS ECMWF Streamflow Service (CC BY 4.0), derived from NGA TDX-Hydro (CC BY-SA 4.0).';
const R = 6378137;
const lonLat = (x, y) => [(x / R) * (180 / Math.PI), (2 * Math.atan(Math.exp(y / R)) - Math.PI / 2) * (180 / Math.PI)];
const pyorista = (v) => Math.round(v * 1e4) / 1e4;

/** GeoPackage-geometria (GP-otsake + WKB) → [[x, y], …] -viivat (LineString/MultiLineString). */
export function gpkgViivat(b) {
  const liput = b[3]; const kuori = [0, 32, 48, 48, 64][(liput >> 1) & 7] ?? 0;
  let o = 8 + kuori; const viivat = [];
  const lue = () => {
    const le = b[o] === 1; o += 1;
    const tyyppi = le ? b.readUInt32LE(o) : b.readUInt32BE(o); o += 4;
    const u32 = () => { const v = le ? b.readUInt32LE(o) : b.readUInt32BE(o); o += 4; return v; };
    const f64 = () => { const v = le ? b.readDoubleLE(o) : b.readDoubleBE(o); o += 8; return v; };
    const perus = tyyppi % 1000; const z = tyyppi >= 1000 && tyyppi < 3000 ? 1 : 0;
    if (perus === 2) { const n = u32(); const v = []; for (let i = 0; i < n; i += 1) { v.push([f64(), f64()]); if (z) f64(); } viivat.push(v); } else if (perus === 5) { const n = u32(); for (let i = 0; i < n; i += 1) lue(); } else throw new Error(`WKB-tyyppi ${tyyppi}`);
  };
  lue();
  return viivat;
}

export function lueUomat(gpkg, valumaKm2) {
  const db = new DatabaseSync(gpkg, { readOnly: true });
  const taulu = db.prepare('select table_name from gpkg_contents').get().table_name;
  const rivit = db.prepare(`select LINKNO, DSLINKNO, strmOrder, DSContArea, geom from ${taulu} where DSContArea >= ?`).all(valumaKm2 * 1e6);
  db.close();
  return rivit.map((r) => ({
    id: r.LINKNO, alas: r.DSLINKNO, jarjestys: r.strmOrder, valuma: r.DSContArea / 1e6,
    viiva: gpkgViivat(Buffer.from(r.geom)).flat().map(([x, y]) => lonLat(x, y)),
  }));
}

/** Pätkät pääuomiksi: jatko alavirtaan, jos pätkä on alavirran pätkän suurin ylävirran haara. */
export function ketjuta(uomat) {
  const kaikki = new Map(uomat.map((u) => [u.id, u]));
  const paahaara = new Map();
  for (const u of uomat) {
    const a = kaikki.get(u.alas); if (!a) continue;
    const nyk = paahaara.get(a.id);
    if (!nyk || u.valuma > nyk.valuma) paahaara.set(a.id, u);
  }
  const jatkuu = (u) => { const a = kaikki.get(u.alas); return a && paahaara.get(a.id) === u ? a : null; };
  const alku = uomat.filter((u) => paahaara.get(u.id) === undefined || !kaikki.has(paahaara.get(u.id)?.id));
  const kaytetty = new Set(); const ketjut = [];
  const aloitukset = uomat.filter((u) => !paahaara.has(u.id));
  for (const u0 of [...aloitukset, ...alku, ...uomat]) {
    if (kaytetty.has(u0.id)) continue;
    const pisteet = []; let valuma = 0; let jarjestys = 0;
    for (let u = u0; u && !kaytetty.has(u.id); u = jatkuu(u)) {
      kaytetty.add(u.id);
      pisteet.push(...(pisteet.length ? u.viiva.slice(1) : u.viiva));
      valuma = Math.max(valuma, u.valuma); jarjestys = Math.max(jarjestys, u.jarjestys);
    }
    if (pisteet.length >= 2) ketjut.push({ pisteet, valuma, jarjestys });
  }
  return ketjut;
}

/*
 * Ketjun osat, jotka kuuluvat maahan `iso`: piste kuuluu, jos se tai jokin sen
 * naapureista ±TOLERANSSI asteen päässä on maan alueella. Rajajoki (Evros, Axios)
 * kuuluu näin kummallekin maalle yhtenäisenä, ja suun viimeinen piste (meressä)
 * pysyy mukana.
 */
export const TOLERANSSI = 0.03;
export function maanOsat(ketju, iso, maaIso) {
  const t = TOLERANSSI;
  const kuuluu = ([x, y]) => [[0, 0], [t, 0], [-t, 0], [0, t], [0, -t]].some(([dx, dy]) => maaIso(x + dx, y + dy) === iso);
  const osat = []; let nyk = null;
  for (const p of ketju.pisteet) {
    if (kuuluu(p)) { if (!nyk) { nyk = []; osat.push(nyk); } nyk.push(p); } else nyk = null;
  }
  return osat.filter((o) => o.length >= 2);
}

if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
  const argv = process.argv.slice(2);
  const lippu = (n) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : null; };
  const vpu = lippu('--vpu'); const maat = (lippu('--maat') ?? '').split(',').filter(Boolean);
  const valuma = Number(lippu('--valuma') ?? 300);
  const pos = argv.filter((a, i) => !a.startsWith('--') && !argv[i - 1]?.startsWith('--'));
  const [nePolku, ulos] = pos;
  if (!vpu || !maat.length || !nePolku || !ulos) { console.error('Käyttö: node tools/tee-joet.mjs --vpu 202 --maat GRC <ne_admin0.geojson> <ulos.geojson> [--gpkg <tiedosto>] [--valuma 300]'); process.exit(1); }
  let gpkg = lippu('--gpkg');
  if (!gpkg) {
    gpkg = `/tmp/streams_${vpu}.gpkg`;
    if (!existsSync(gpkg)) execFileSync('aws', ['s3', 'cp', '--no-sign-request', `s3://geoglows-v2/hydrography/vpu=${vpu}/streams_${vpu}.gpkg`, gpkg, '--only-show-errors'], { stdio: 'inherit' });
  }
  const ne = JSON.parse(readFileSync(nePolku, 'utf8'));
  const maski = maamaski(ne);
  const isot = ne.features.map((f) => f.properties.ADM0_A3); // pelin avaimet ovat ADM0_A3 (esim. SDS, FRA)
  const maaIso = (lon, lat) => { const id = maski.maa(lon, lat); return id ? isot[id - 1] : null; };
  const ketjut = ketjuta(lueUomat(gpkg, valuma));
  const features = [];
  for (const k of ketjut) {
    for (const iso of maat) for (const pisteet of maanOsat(k, iso, maaIso)) {
      const o = { iso };
      const viiva = harvenna(pisteet, 0.002).map(([x, y]) => [pyorista(x), pyorista(y)]);
      if (viiva.length < 2) continue;
      features.push({ type: 'Feature', properties: { iso: o.iso, valuma_km2: Math.round(k.valuma), jarjestys: k.jarjestys }, geometry: { type: 'LineString', coordinates: viiva } });
    }
  }
  features.sort((a, b) => b.properties.valuma_km2 - a.properties.valuma_km2);
  writeFileSync(ulos, JSON.stringify({
    type: 'FeatureCollection', lahde: `GEOGLOWS v2 (TDX-Hydro), CC BY-SA 4.0 — hydrography vpu=${vpu}, valuma ≥ ${valuma} km², pääuomiksi ketjutettu`,
    lisenssi: LISENSSI, attribuutio: ATTRIBUUTIO, features,
  }));
  const pisteita = features.reduce((s, f) => s + f.geometry.coordinates.length, 0);
  console.log(`${features.length} jokiviivaa (${maat.join(',')}), ${pisteita} pistettä → ${ulos}`);
}
