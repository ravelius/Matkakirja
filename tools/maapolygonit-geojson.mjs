#!/usr/bin/env node
// MAAPOLYGONIT GEOJSONIKSI NATIIVILLE (Karttaseppä 24.9.2026, Fable löydös 22):
// webin assets/data/maapolygonit.json (Miller-lautayksiköt, delta-koodattu,
// tarkkuus 1/10) → GeoJSON lon/lat. Sama aineisto ja tarkkuus kuin webin
// kohdemaan korostuskehällä (js/pallovektorit.js).
//   node tools/maapolygonit-geojson.mjs assets/data/maapolygonit.json <ulos.geojson>
// Ämpäriin gzipattuna: julisteet/pallo/vektorit/maapolygonit-<pvm>/maapolygonit.geojson
import { readFileSync, writeFileSync } from 'node:fs';
/** maapolygonit.json → [{ iso, renkaat: [[[lon, lat], …]] }] (renkaat suljettuina). */
export function maapolygonitLonLat(j) {
  const { leveys, lon0, pohjoinen } = j.projektio;
  const RAD = Math.PI / 180; const sk = leveys / (2 * Math.PI);
  const millerY = (f) => -1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * f * RAD));
  const yP = millerY(pohjoinen); const t = Number(j.tarkkuus);
  const lonOf = (x) => { let l = lon0 + (x / sk) / RAD; while (l > 180) l -= 360; while (l < -180) l += 360; return +l.toFixed(5); };
  const latOf = (y) => +(((Math.atan(Math.exp(-(y / sk + yP) / 1.25)) - Math.PI / 4) / 0.4) / RAD).toFixed(5);
  return Object.entries(j.maat).map(([iso, renkaat]) => ({
    iso,
    renkaat: renkaat.map((r) => {
      let x = 0; let y = 0; const pts = [];
      for (let i = 0; i < r.length; i += 2) { x += r[i]; y += r[i + 1]; pts.push([lonOf(x / t), latOf(y / t)]); }
      if (pts.length && (pts[0][0] !== pts.at(-1)[0] || pts[0][1] !== pts.at(-1)[1])) pts.push(pts[0]);
      return pts;
    }),
  }));
}

if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
  const [,, lahde, ulos] = process.argv;
  const j = JSON.parse(readFileSync(lahde, 'utf8'));
  const t = Number(j.tarkkuus); const { leveys } = j.projektio;
  let pisteita = 0;
  const features = maapolygonitLonLat(j).map(({ iso, renkaat }) => {
    pisteita += renkaat.reduce((s, r) => s + r.length, 0);
    return { type: 'Feature', properties: { iso }, geometry: { type: 'MultiPolygon', coordinates: renkaat.map((r) => [r]) } };
  });
  writeFileSync(ulos, JSON.stringify({ type: 'FeatureCollection', lahde: j.lahde, rantaviiva: j.rantaviiva, muunnos: 'Miller-lauta → lon/lat, tarkkuus 1/' + t + ' lautayksikköä (≈' + (360 / leveys / t * 111).toFixed(2) + ' km)', features }));
  console.log(features.length, 'maata,', pisteita, 'pistettä');
}
