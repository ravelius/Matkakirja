// vaanna.mjs leveys ulos.webp [laatu] — skanni tasaväliseksi (equirectangular) RGBA-kuvaksi ikkunaan, reunahäivytys
import { createRequire } from 'node:module'; const sharp = createRequire(import.meta.url)('sharp');
import { writeFileSync } from 'node:fs';
import { gKuvaan } from './malli.mjs';
import { kansio } from './kansio.mjs'; const S = kansio();
const [W, ulos, laatuS] = process.argv.slice(2); const LEV = +W; const laatu = +(laatuS ?? 82);
export const IKKUNA = { lng0: -6.65, lng1: 11.35, lat0: 41.5, lat1: 51.25 };
const KOR = Math.round(LEV * (IKKUNA.lat1 - IKKUNA.lat0) / (IKKUNA.lng1 - IKKUNA.lng0));
// Kehyksen sisäreuna skannissa ja häivytys (px skannissa)
const R = { x0: 2620, x1: 13270, y0: 1330, y1: 10570 }; const HAIVE = 420;
const { data: src, info } = await sharp(S + 'stieler33.jpg', { limitInputPixels: false }).raw().toBuffer({ resolveWithObject: true });
const SW = info.width, SH = info.height, C = info.channels;
const out = Buffer.alloc(LEV * KOR * 4);
const t0 = Date.now();
for (let j = 0; j < KOR; j++) {
  const lat = IKKUNA.lat1 - (j + 0.5) * (IKKUNA.lat1 - IKKUNA.lat0) / KOR;
  for (let i = 0; i < LEV; i++) {
    const lon = IKKUNA.lng0 + (i + 0.5) * (IKKUNA.lng1 - IKKUNA.lng0) / LEV;
    const [x, y] = gKuvaan(lon, lat);
    if (x < R.x0 || x >= R.x1 - 1 || y < R.y0 || y >= R.y1 - 1) continue;
    const reuna = Math.min(x - R.x0, R.x1 - x, y - R.y0, R.y1 - y);
    const a = Math.min(1, reuna / HAIVE);
    const xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi;
    const o = (j * LEV + i) * 4;
    for (let c = 0; c < 3; c++) {
      const p00 = src[(yi * SW + xi) * C + c], p10 = src[(yi * SW + xi + 1) * C + c], p01 = src[((yi + 1) * SW + xi) * C + c], p11 = src[((yi + 1) * SW + xi + 1) * C + c];
      out[o + c] = Math.round((p00 * (1 - fx) + p10 * fx) * (1 - fy) + (p01 * (1 - fx) + p11 * fx) * fy);
    }
    // seepia-häivytys: reunalla väri kohti paperin sävyä ja läpinäkyväksi (pehmeä S-käyrä)
    const s = a * a * (3 - 2 * a);
    out[o + 3] = Math.round(255 * s);
  }
}
console.log('vääntö', ((Date.now() - t0) / 1000).toFixed(1), 's', LEV, 'x', KOR);
await sharp(out, { raw: { width: LEV, height: KOR, channels: 4 } }).webp({ quality: laatu, alphaQuality: 60, effort: 4 }).toFile(S + ulos);
writeFileSync(S + ulos + '.json', JSON.stringify({ ikkuna: IKKUNA, leveys: LEV, korkeus: KOR }));
console.log('ok', ulos);
