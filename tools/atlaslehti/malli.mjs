import { readFileSync } from 'node:fs';
import { kansio } from './kansio.mjs'; const S = kansio();
const M = JSON.parse(readFileSync(S + 'malli.json'));
export const FERRO = 17.6628; // Ferro = 20° länteen Pariisista (2,3372°E)
const rivi = (lon, lat) => { const u = (lon - 20) / 8, v = (lat - 46) / 4; return [1, u, v, u * u, u * v, v * v]; };
/** (lonF, lat) → skannin (x, y). lonF = Ferro-pituus. */
export function kuvaan(lonF, lat) {
  const a = (M.ka[0] + M.ka[1] * (lonF - 20)) * Math.PI / 180; const r = M.rr[0] + M.rr[1] * (46 - lat);
  const rv = rivi(lonF, lat);
  return [M.karki[0] + r * Math.sin(a) + rv.reduce((s, v, i) => s + v * M.cxk[i], 0), M.karki[1] + r * Math.cos(a) + rv.reduce((s, v, i) => s + v * M.cyk[i], 0)];
}
/** Greenwich-koordinaateista skanniin. */
export const gKuvaan = (lon, lat) => kuvaan(lon + FERRO, lat);
/** Skannista (x, y) → [lonG, lat] Newtonilla. */
export function kuvasta(x, y) {
  let lon = 2.3, lat = 46;
  for (let i = 0; i < 25; i++) {
    const [px, py] = gKuvaan(lon, lat); const h = 1e-3;
    const [pxl, pyl] = gKuvaan(lon + h, lat), [pxa, pya] = gKuvaan(lon, lat + h);
    const j11 = (pxl - px) / h, j12 = (pxa - px) / h, j21 = (pyl - py) / h, j22 = (pya - py) / h;
    const det = j11 * j22 - j12 * j21; const dx = x - px, dy = y - py;
    const dl = (j22 * dx - j12 * dy) / det, da = (-j21 * dx + j11 * dy) / det;
    lon += dl; lat += da; if (Math.abs(dl) + Math.abs(da) < 1e-7) break;
  }
  return [lon, lat];
}
if (process.argv[1].endsWith('malli.mjs')) {
  for (const [x, y] of [[2620, 1330], [13270, 1330], [2620, 10570], [13270, 10570], [7927, 6564], [2620, 6000], [13270, 6000]]) console.log(x, y, '→', kuvasta(x, y).map((v) => v.toFixed(3)).join(', '));
  // tarkistus tunnetuilla kaupungeilla: Pariisi, Brest, Marseille, Bordeaux, Strasbourg, Perpignan, Bastia, Genf
  for (const [n, lon, lat] of [['Pariisi', 2.3522, 48.8566], ['Brest', -4.486, 48.390], ['Marseille', 5.370, 43.296], ['Bordeaux', -0.579, 44.838], ['Strasbourg', 7.752, 48.573], ['Perpignan', 2.895, 42.699], ['Bastia', 9.451, 42.697], ['Genf', 6.143, 46.204]]) console.log(n, gKuvaan(lon, lat).map((v) => v.toFixed(0)).join(', '));
}
