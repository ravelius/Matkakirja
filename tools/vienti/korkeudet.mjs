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
 * (kokoelma kaupungit), pyöristettynä 10 metriin. GLO-30-ruudun puuttuessa
 * käytetään GLO-90-ruutua, jos se on arkistossa. Ruutu, jota arkistossa ei
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
    // GLO-30:n julkisesta jakelusta puuttuu muutama ruutu (esim. N38 E046,
    // Tabriz); silloin käytetään saman kansion GLO-90-ruutua (COG_30).
    const polku = [ruudunNimi(k.lat, k.lon), ruudunNimi(k.lat, k.lon).replace('_COG_10_', '_COG_30_')]
      .map((n) => join(dem, n)).find((p) => existsSync(p));
    if (!polku) { tulos[k.id] = null; continue; }
    const r = avaaGeotiff(polku);
    try {
      const h = r.korkeus(k.lon, k.lat, 0);
      tulos[k.id] = Number.isFinite(h) ? Math.round(h / 10) * 10 : null;
      if (tulos[k.id] !== null) loytyi++;
    } finally { r.sulje(); }
  }
  const data = {
    lahde: 'Copernicus GLO-30 DSM, puuttuvan ruudun kohdalla GLO-90 (© DLR e.V. 2010-2014 and © Airbus Defence and Space GmbH 2014-2018, provided under COPERNICUS by the European Union and ESA)',
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
    // Ei top-level awaitia: kokoelmat.mjs tuo tämän moduulin, ja paivita()
    // tuo vie-sisalto.mjs:n, joten odotus moduulin tasolla lukitsisi
    // kehäimportin (Node: "unsettled top-level await", koodi 13).
    paivita(dem).then((t) => {
      console.log(`kaupunkien-korkeudet.json: ${t.loytyi}/${t.yht} kaupunkia; ilman ruutua: ${t.puuttuu.join(' ')}`);
      process.exit(0);
    });
  } else {
    console.log('käyttö: node tools/vienti/korkeudet.mjs --paivita [--dem <kansio>]');
  }
}
