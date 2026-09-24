#!/usr/bin/env node
/*
 * MAASTOLAATAT NATIIVIPELILLE: Copernicus GLO-30 → Cesiumin quantized-mesh.
 * (Karttaseppä 23.9.2026, Fablen tilaus: natiivi käyttää Cesiumia; ensin Ranska.)
 *
 *   node tools/maasto/tee-maasto.mjs --dem <kansio> --ulos <kansio>
 *        [--alue -6,41,10,52] [--tasot 0-11] [--ruudukko 65] [--osa i/n] [--luettelo]
 *        [--maailma 6]
 *
 * --maailma Z (korjaus 23.9.2026): tasot 0…Z tehdään koko maailmalle
 * (DEM:n ulkopuolella 0 m), jotta Cesium ei ylinäytteistä alueen
 * ulkopuolta z0:n jättiläislaatasta vaan tason Z laatoista.
 *
 * TIILITYS on Cesiumin GeographicTilingScheme (EPSG:4326, TMS): tasolla z on
 * 2^(z+1) × 2^z laattaa, laatta (x, y) kattaa lon −180 + x·180/2^z …, lat
 * −90 + y·180/2^z … (y kasvaa pohjoiseen). Laatta on (ruudukko)² näytettä
 * (2^k + 1), ja RTIN (rtin.mjs) harventaa sen virherajaan, joka on puolet
 * Cesiumin tasokohtaisesta geometrisesta virheestä (CesiumTerrainProvider:
 * 6378137 · 2π · 0,25 / (65 · 2) / 2^z ≈ 77 067 m / 2^z).
 *
 * NÄYTTEISTYS: jokainen näyte luetaan siitä 1°-ruudusta, johon se osuu,
 * bilineaarisesti siltä overview-tasolta, jonka pikseli on näyteväliä
 * pienempi (geotiff.mjs). Sama koordinaatti valitsee aina saman ruudun,
 * joten naapurilaattojen reunat täsmäävät. Puuttuva ruutu (avomeri tai
 * alueen ulkopuoli) = 0 m.
 *
 * RAJOITUS (Ranska ensin): alueen ulkopuolella maa on 0 m:ssä, joten
 * alueen reunalla (Espanja, Saksa, Italia) on porras. Laatat, jotka ovat
 * kokonaan alueen ulkopuolella, puuttuvat luettelosta (Cesium ottaa
 * silloin emolaatan) — tasoa 0 lukuun ottamatta, joka on aina olemassa.
 *
 * Tulos: <ulos>/<z>/<x>/<y>.terrain (gzip) ja <ulos>/layer.json.
 * Ämpäriin: Content-Type application/vnd.quantized-mesh, Content-Encoding gzip.
 */
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';

import { avaaGeotiff } from './geotiff.mjs';
import { rtinVerkko, rtinVirheet } from './rtin.mjs';
import { koodaaLaatta } from './quantized-mesh.mjs';

export const CESIUM_TASO0_VIRHE = (6378137 * 2 * Math.PI * 0.25) / (65 * 2);
const MAAN_SADE = 6371008.8;
const RAD = Math.PI / 180;

/** Jänteen keskipisteen painuma (m) kahden pisteen (lon, lat asteina) välillä. */
export function janteenPainuma(lon1, lat1, lon2, lat2) {
  const s = Math.sin(((lat2 - lat1) * RAD) / 2) ** 2
    + Math.cos(lat1 * RAD) * Math.cos(lat2 * RAD) * Math.sin(((lon2 - lon1) * RAD) / 2) ** 2;
  const kulma = 2 * Math.asin(Math.min(1, Math.sqrt(s)));
  return MAAN_SADE * (1 - Math.cos(kulma / 2));
}
export const LAHDEMAININTA = 'Produced using Copernicus WorldDEM-30 © DLR e.V. 2010-2014 and © Airbus Defence and Space GmbH 2014-2018 provided under COPERNICUS by the European Union and ESA; all rights reserved.';

/** Laatan rajat asteina. */
export function laatanAlue(z, x, y) {
  const koko = 180 / 2 ** z;
  return { west: -180 + x * koko, south: -90 + y * koko, east: -180 + (x + 1) * koko, north: -90 + (y + 1) * koko };
}

/** Tason laatat, jotka leikkaavat alueen (lon0, lat0, lon1, lat1). */
export function tasonLaatat(z, [lon0, lat0, lon1, lat1]) {
  if (z === 0) return { x0: 0, x1: 1, y0: 0, y1: 0 };
  const koko = 180 / 2 ** z;
  const x0 = Math.max(0, Math.floor((lon0 + 180) / koko));
  const x1 = Math.min(2 ** (z + 1) - 1, Math.ceil((lon1 + 180) / koko) - 1);
  const y0 = Math.max(0, Math.floor((lat0 + 90) / koko));
  const y1 = Math.min(2 ** z - 1, Math.ceil((lat1 + 90) / koko) - 1);
  return { x0, x1, y0, y1 };
}

/** DEM-hakemisto: "N44E003" → polku, ja avatut ruudut pienessä LRU:ssa. */
export function demHakemisto(kansio, avaa = avaaGeotiff) {
  const polut = new Map();
  for (const f of existsSync(kansio) ? readdirSync(kansio) : []) {
    const m = /_([NS])(\d\d)_00_([EW])(\d\d\d)_00_DEM\.tif$/.exec(f);
    if (!m) continue;
    const lat = (m[1] === 'N' ? 1 : -1) * Number(m[2]);
    const lon = (m[3] === 'E' ? 1 : -1) * Number(m[4]);
    polut.set(`${lat},${lon}`, join(kansio, f));
  }
  const auki = new Map();
  const ruutu = (lat, lon) => {
    const avain = `${lat},${lon}`;
    if (auki.has(avain)) { const g = auki.get(avain); auki.delete(avain); auki.set(avain, g); return g; }
    const polku = polut.get(avain);
    const g = polku ? avaa(polku) : null;
    auki.set(avain, g);
    if (auki.size > 48) { const [k, v] = auki.entries().next().value; v?.sulje(); auki.delete(k); }
    return g;
  };
  return {
    ruutuja: polut.size,
    /*
     * Onko 1°-ruutu (lat, lon = lounaisnurkan kokonaisluvut) kansiossa?
     * Pyramidin syvät tasot (dem-ikkuna.mjs, 23.9.2026) tarvitsevat eron
     * "ruutu puuttuu" ja "korkeus on 0 m" välillä: puuttuva ruutu ei ole
     * merenpinta vaan paikka, jossa käytetään vanhaa 1′-aineistoa.
     * Ei avaa tiedostoa, joten `korkeus` pysyy entisellään (puuttuva = 0).
     */
    onRuutu: (lat, lon) => polut.has(`${lat},${lon}`),
    /** Korkeus (m) näytevälille `vali` (asteina) sopivalta tasolta. */
    korkeus(lon, lat, vali) {
      const g = ruutu(Math.floor(lat), Math.floor(lon));
      if (!g) return 0;
      let ti = 0;
      while (ti + 1 < g.tasot.length && g.pikselinAsteet(ti + 1) <= vali) ti += 1;
      return g.korkeus(lon, lat, ti);
    },
    sulje() { for (const g of auki.values()) g?.sulje(); auki.clear(); },
  };
}

/** Yksi laatta tavuiksi (gzip). */
export function teeLaatta(dem, z, x, y, n = 65) {
  const a = laatanAlue(z, x, y);
  const vali = (a.east - a.west) / (n - 1);
  const h = new Float32Array(n * n);
  for (let j = 0; j < n; j += 1) {
    const lat = a.north - j * vali;
    for (let i = 0; i < n; i += 1) h[j * n + i] = dem.korkeus(a.west + i * vali, lat, vali);
  }
  const kynnys = Math.max(0.5, (CESIUM_TASO0_VIRHE / 2 ** z) * 0.5);
  // Ruutupiste (i, j) → (lon, lat); kaarevuus virheeseen (ks. rtin.mjs).
  const kaarevuus = (ax, ay, bx, by) => janteenPainuma(a.west + ax * vali, a.north - ay * vali, a.west + bx * vali, a.north - by * vali);
  const { pisteet, kolmiot } = rtinVerkko(h, n, kynnys, rtinVirheet(h, n, kaarevuus));
  const P = pisteet.map(([i, j]) => [i / (n - 1), 1 - j / (n - 1), h[j * n + i]]);
  // Kiertosuunta vastapäivään (u itään, v pohjoiseen) jokaiselle kolmiolle.
  const T = kolmiot.map(([p, q, r]) => {
    const [ax, ay] = P[p]; const [bx, by] = P[q]; const [cx, cy] = P[r];
    return (bx - ax) * (cy - ay) - (by - ay) * (cx - ax) >= 0 ? [p, q, r] : [p, r, q];
  });
  const raaka = koodaaLaatta({ alue: a, pisteet: P, kolmiot: T });
  return { tavut: gzipSync(raaka, { level: 9 }), pisteita: P.length, kolmioita: T.length, hMax: Math.max(...h) };
}

/** layer.json (Cesium CesiumTerrainProvider). */
export const MAAILMA = [-180, -90, 180, 90];
/** Tason z alue: koko maailma tasoilla 0…maailma, muuten `alue`. */
export const tasonAlue = (z, alue, maailma = -1) => (z <= maailma ? MAAILMA : alue);

export function kerroksenKuvaus({ tasot, alue, versio, maailma = -1 }) {
  const available = [];
  for (let z = 0; z <= tasot[1]; z += 1) {
    if (z < tasot[0]) { available.push([]); continue; }
    const t = tasonLaatat(z, tasonAlue(z, alue, maailma));
    available.push([{ startX: t.x0, startY: t.y0, endX: t.x1, endY: t.y1 }]);
  }
  return {
    tilejson: '2.1.0', name: 'Matkakirja maasto', version: '1.0.0', format: 'quantized-mesh-1.0',
    scheme: 'tms', tiles: [`{z}/{x}/{y}.terrain?v=${versio}`], projection: 'EPSG:4326',
    bounds: [-180, -90, 180, 90], minzoom: 0, maxzoom: tasot[1], extensions: ['octvertexnormals'],
    attribution: LAHDEMAININTA, available,
  };
}

async function main() {
  const argv = process.argv.slice(2);
  const arvo = (nimi, oletus) => { const i = argv.indexOf(`--${nimi}`); return i >= 0 ? argv[i + 1] : oletus; };
  const demKansio = arvo('dem'); const ulos = arvo('ulos');
  if (!demKansio || !ulos) { console.error('käyttö: --dem <kansio> --ulos <kansio> [--alue] [--tasot 0-11] [--osa i/n]'); process.exit(2); }
  const alue = arvo('alue', '-6,41,10,52').split(',').map(Number);
  const tasot = arvo('tasot', '0-11').split('-').map(Number);
  const n = Number(arvo('ruudukko', 65));
  const [osa, osia] = arvo('osa', '0/1').split('/').map(Number);
  const versio = arvo('versio', '2026-09-23a');
  const maailma = Number(arvo('maailma', -1));
  mkdirSync(ulos, { recursive: true });
  if (argv.includes('--luettelo')) {
    writeFileSync(join(ulos, 'layer.json'), `${JSON.stringify(kerroksenKuvaus({ tasot, alue, versio, maailma }), null, 1)}\n`);
    console.log(`layer.json: tasot ${tasot.join('–')}, alue ${alue.join(',')}`);
    return;
  }
  const dem = demHakemisto(demKansio);
  console.log(`DEM-ruutuja ${dem.ruutuja}, tasot ${tasot.join('–')}, ruudukko ${n}, osa ${osa}/${osia}`);
  const alku = Date.now();
  let laattoja = 0; let tavuja = 0; let kolmioita = 0;
  for (let z = tasot[0]; z <= tasot[1]; z += 1) {
    const t = tasonLaatat(z, tasonAlue(z, alue, maailma));
    const tz = Date.now(); let tasolla = 0;
    for (let x = t.x0; x <= t.x1; x += 1) {
      // Osat sarakkeittain (sama jako kuin pyramidin shardeilla).
      if (osia > 1 && x % osia !== osa) continue;
      mkdirSync(join(ulos, String(z), String(x)), { recursive: true });
      for (let y = t.y0; y <= t.y1; y += 1) {
        const l = teeLaatta(dem, z, x, y, n);
        writeFileSync(join(ulos, String(z), String(x), `${y}.terrain`), l.tavut);
        laattoja += 1; tasolla += 1; tavuja += l.tavut.length; kolmioita += l.kolmioita;
      }
    }
    console.log(`  z${z}: ${tasolla} laattaa, ${((Date.now() - tz) / 1000).toFixed(1)} s`);
  }
  dem.sulje();
  console.log(`valmis: ${laattoja} laattaa, ${(tavuja / 1e6).toFixed(1)} Mt, ka ${Math.round(kolmioita / Math.max(1, laattoja))} kolmiota, ${((Date.now() - alku) / 1000).toFixed(0)} s`);
}

if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) await main();
