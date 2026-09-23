#!/usr/bin/env node
/*
 * KAUPUNKIEN KORKEUDET (Siirtoseppä 23.9.2026, skeema 1.10, Natiivisepän
 * tarve: nimiöt maaston pinnalle ilman Cesiumin ajonaikaista hakua).
 *
 *   node tools/vienti/korkeudet.mjs --paivita [--dem <kansio>]
 *
 * Lukee Copernicus GLO-30 DSM -ruudut (Karttasepän maastopoltto,
 * oletuksena NAS:n arkisto) Karttasepän GeoTIFF-lukijalla
 * (tools/maasto/geotiff.mjs) ja kirjoittaa kaupunkien-korkeudet.json:n:
 * korkeus metreinä EGM2008-geoidin yläpuolella kaupungin lat/lon-pisteestä
 * (kokoelma kaupungit), pyöristettynä 10 metriin. Ruutu, jota arkistossa ei
 * ole (meri tai lataamaton alue), antaa null. Vienti lukee vain tämän
 * commitoidun tiedoston eikä tarvitse DEM:iä eikä verkkoa.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const TAMA = dirname(fileURLToPath(import.meta.url));
export const KORKEUSTIEDOSTO = join(TAMA, 'kaupunkien-korkeudet.json');
const OLETUS_DEM = '/Volumes/NAS-Homes/koodaus/Claude/Matkakirja-arkisto/dem/copernicus-glo30';

export function lueKorkeudet() {
  return existsSync(KORKEUSTIEDOSTO) ? JSON.parse(readFileSync(KORKEUSTIEDOSTO, 'utf8')) : { kaupungit: {} };
}

const ruudunNimi = (lat, lon) => {
  const la = Math.floor(lat); const lo = Math.floor(lon);
  const ns = la >= 0 ? `N${String(la).padStart(2, '0')}` : `S${String(-la).padStart(2, '0')}`;
  const ew = lo >= 0 ? `E${String(lo).padStart(3, '0')}` : `W${String(-lo).padStart(3, '0')}`;
  return `Copernicus_DSM_COG_10_${ns}_00_${ew}_00_DEM.tif`;
};

async function paivita(dem) {
  const { avaaGeotiff } = await import('../maasto/geotiff.mjs');
  const { kokoaVienti } = await import('./vie-sisalto.mjs');
  const { tiedostot } = await kokoaVienti();
  const kaupungit = JSON.parse(tiedostot.get('kokoelmat/kaupungit.json')).alkiot;
  const tulos = {};
  let loytyi = 0;
  for (const k of [...kaupungit].sort((a, b) => (a.id < b.id ? -1 : 1))) {
    const polku = join(dem, ruudunNimi(k.lat, k.lon));
    if (!existsSync(polku)) { tulos[k.id] = null; continue; }
    const r = avaaGeotiff(polku);
    try {
      const h = r.korkeus(k.lon, k.lat, 0);
      tulos[k.id] = Number.isFinite(h) ? Math.round(h / 10) * 10 : null;
      if (tulos[k.id] !== null) loytyi++;
    } finally { r.sulje(); }
  }
  const data = {
    lahde: 'Copernicus GLO-30 DSM (© DLR e.V. 2010-2014 and © Airbus Defence and Space GmbH 2014-2018, provided under COPERNICUS by the European Union and ESA)',
    yksikko: 'm EGM2008, pyöristys 10 m', haettu: new Date().toISOString().slice(0, 10),
    kaupungit: tulos,
  };
  writeFileSync(KORKEUSTIEDOSTO, `${JSON.stringify(data, null, 1)}\n`);
  return { loytyi, yht: kaupungit.length, puuttuu: Object.keys(tulos).filter((id) => tulos[id] === null) };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const i = process.argv.indexOf('--dem');
  const dem = i > 0 ? process.argv[i + 1] : OLETUS_DEM;
  if (process.argv.includes('--paivita')) {
    const t = await paivita(dem);
    console.log(`kaupunkien-korkeudet.json: ${t.loytyi}/${t.yht} kaupunkia; ilman ruutua: ${t.puuttuu.join(' ')}`);
    process.exit(0);
  } else {
    console.log('käyttö: node tools/vienti/korkeudet.mjs --paivita [--dem <kansio>]');
  }
}
