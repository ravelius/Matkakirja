import { FOKUS_POHJAT } from './js/packs/fokus-grc.js';
const RAD = Math.PI / 180;
const millerY = (lat) => -1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * lat * RAD));
const S = 12000 / (2 * Math.PI);
const x2lon = (x) => x / 33.333333333 - 175;
function y2lat(y) {
  let lo = -85, hi = 85;
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    const yy = (millerY(mid) - millerY(76)) * S;
    if (yy > y) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}
for (const iso of ['ALB', 'BEL', 'BLR', 'LUX', 'MDA', 'MKD', 'MNE', 'SRB', 'SVK', 'SVN']) {
  const r = FOKUS_POHJAT[iso].rajaus;
  console.log(iso, 'lon', x2lon(r.x).toFixed(3), '...', x2lon(r.x + r.w).toFixed(3),
    '| lat', y2lat(r.y + r.h).toFixed(3), '...', y2lat(r.y).toFixed(3));
}
