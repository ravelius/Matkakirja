/*
 * HAE MAIDEN RAJAT — Natural Earth admin-0 -rajaviivat viivatasolle.
 *
 *   node tools/hae-maiden-rajat.mjs [--setti nykyiset] [--harvennus 0.006]
 *
 * Kirjoittaa `tools/fokuskartta/<setti>.json.gz` (ks. rajat.mjs
 * RAJASETIT). Ajetaan KÄSIN silloin kun rajasetti vaihtuu, ei
 * jokaisessa pyramidiajossa: tiedosto on repossa juuri siksi, ettei
 * yksikään ajo riipu verkosta (sama peruste kuin korkeusaineistolla).
 *
 * LÄHDE ON `ne_10m_admin_0_boundary_lines_land`: vain MAALLA kulkevat
 * valtioiden väliset rajat. Merirajoja ja talousvyöhykkeitä ei haeta —
 * ne olisivat kartalla ruudukkoa eivätkä maantiedettä.
 *
 * NYKYRAJAT OVAT OIKEA SISÄLTÖ, vaikka kartta on tyyliltään vuoden
 * 1873 atlas: kaanonin mukaan kartta on sisällöltään nykyaikainen ja
 * vain tyyliltään aikakauden. Aikakausisetit ovat myöhempi datalisäys
 * (rajat.mjs RAJASETIT), ei muutos tähän hakijaan.
 *
 * Konttiympäristössä Noden fetch tarvitsee NODE_USE_ENV_PROXY=1.
 *
 * Lähde: Natural Earth 10m (Kelso & Patterson) — public domain.
 */
import { writeFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';

import { rajasetinPolku } from './fokuskartta/rajat.mjs';

const argv = process.argv.slice(2);
const valitsin = (nimi, oletus) => {
  const i = argv.indexOf(`--${nimi}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : oletus;
};

const SETTI = valitsin('setti', 'nykyiset');
/* Sama kynnys kuin rannikolla (maailma.mjs meriRenkaat): 0,006° on
 * syvimmällä tasolla noin 1,4 kuvapikseliä. */
const HARVENNUS = Number(valitsin('harvennus', 0.006));
const OSOITE = valitsin('osoite',
  'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/'
  + 'geojson/ne_10m_admin_0_boundary_lines_land.geojson');

const pyorista = (n) => Math.round(n * 1e4) / 1e4;

console.log(`Haetaan rajat: ${OSOITE}`);
const vastaus = await fetch(OSOITE);
if (!vastaus.ok) {
  console.error(`Haku epäonnistui: HTTP ${vastaus.status}`);
  process.exit(1);
}
const geo = await vastaus.json();

const viivat = [];
let pisteita = 0;
const lisaa = (koordinaatit) => {
  const harva = [];
  let edellinen = null;
  for (const [lon, lat] of koordinaatit) {
    if (edellinen
      && Math.abs(lon - edellinen[0]) < HARVENNUS
      && Math.abs(lat - edellinen[1]) < HARVENNUS) continue;
    harva.push([pyorista(lon), pyorista(lat)]);
    edellinen = [lon, lat];
  }
  if (harva.length > 1) { viivat.push(harva); pisteita += harva.length; }
};
for (const f of geo.features ?? []) {
  const g = f.geometry;
  if (!g) continue;
  if (g.type === 'LineString') lisaa(g.coordinates);
  else if (g.type === 'MultiLineString') for (const l of g.coordinates) lisaa(l);
}

const ulos = {
  setti: SETTI,
  kuvaus: 'Nykyiset valtioiden väliset maarajat',
  lahde: 'Natural Earth 10m ne_10m_admin_0_boundary_lines_land — public domain',
  harvennus: HARVENNUS,
  viivat,
};
const polku = rajasetinPolku(SETTI);
const pakattu = gzipSync(Buffer.from(JSON.stringify(ulos)), { level: 9 });
writeFileSync(polku, pakattu);
console.log(`  viivoja ${viivat.length} · kärkipisteitä ${pisteita} · `
  + `harvennus ${HARVENNUS}°`);
console.log(`  ${polku} (${(pakattu.length / 1e6).toFixed(2)} Mt pakattuna)`);
