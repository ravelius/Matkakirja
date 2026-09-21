// Kartioprojektion sovitus: meridiaanit suoria (leikkaavat kärjessä), leveyspiirit ympyränkaaria kärjen ympäri.
import { readFileSync, writeFileSync } from 'node:fs';
import { kansio } from './kansio.mjs'; const S = kansio();
const merid = JSON.parse(readFileSync(S + 'merid.json')); const paral = JSON.parse(readFileSync(S + 'paral.json'));
// Meridiaanit (Ferro-aste → odotettu x-sarja kaistoittain): poimitaan lähin vahva piikki odotuksesta
const ODOTUS = { // y → [x 12F..28F]
  1800: [3156, 4344, 5534, 6717, 7916, 9111, 10306, 11504, null],
  3200: [3030, 4250, 5472, 6687, 7920, 9148, 10376, 11606, null],
  4600: [2903, 4159, 5411, 6663, 7924, 9184, 10447, 11710, null],
  6000: [2775, 4061, 5350, 6633, 7931, 9223, 10518, 11813, 13107],
  7400: [null, null, 5289, 6605, 7936, 9262, 10590, 11917, 13240],
  8800: [null, null, 5228, 6577, 7944, 9306, 10661, 12024, null],
  10100: [null, null, 5174, 6556, 7952, 9342, 10731, 12124, null],
};
const PODOTUS = { // x → [y 50N,48N,46N,44N,42N]
  3200: [2563, 4475, 6382, null, null],
  4600: [2672, null, 6485, null, null],
  6000: [2742, 4646, 6542, 8444, 10348],
  7400: [2771, 4671, 6563, 8470, 10371],
  8800: [2765, 4664, 6558, 8464, 10362],
  10200: [2710, 4608, 6499, null, 10313],
  11600: [2620, 4521, 6415, 8326, 10230],
  12800: [null, null, 6313, 8221, 10133],
};
const mp = []; // {lon, x, y}
for (const b of merid) for (let i = 0; i < 9; i++) { const o = ODOTUS[b.keskus][i]; if (o == null) continue; const v = b.viivat.filter((w) => Math.abs(w.p - o) <= 6).sort((a, c) => c.e - a.e)[0]; if (v) mp.push({ lon: 12 + 2 * i, x: v.p, y: b.keskus, e: v.e }); }
const pp = [];
for (const b of paral) for (let i = 0; i < 5; i++) { const o = PODOTUS[b.keskus][i]; if (o == null) continue; const v = b.viivat.filter((w) => Math.abs(w.p - o) <= 6).sort((a, c) => c.e - a.e)[0]; if (v) pp.push({ lat: 50 - 2 * i, x: b.keskus, y: v.p, e: v.e }); }
// Meridiaanien suorat x = a + b*y
const suorat = {};
for (let lon = 12; lon <= 28; lon += 2) {
  const pts = mp.filter((p) => p.lon === lon); if (pts.length < 2) continue;
  const n = pts.length, sy = pts.reduce((s, p) => s + p.y, 0), sx = pts.reduce((s, p) => s + p.x, 0), syy = pts.reduce((s, p) => s + p.y * p.y, 0), sxy = pts.reduce((s, p) => s + p.x * p.y, 0);
  const b = (n * sxy - sx * sy) / (n * syy - sy * sy), a = (sx - b * sy) / n;
  const res = pts.map((p) => +(p.x - (a + b * p.y)).toFixed(1));
  suorat[lon] = { a, b, n, res };
}
// Kärki: pienimmän neliösumman leikkauspiste suorista x - b*y = a  → [1, -b]·[x,y] = a
let A11 = 0, A12 = 0, A22 = 0, r1 = 0, r2 = 0;
for (const { a, b } of Object.values(suorat)) { A11 += 1; A12 += -b; A22 += b * b; r1 += a; r2 += -b * a; }
const det = A11 * A22 - A12 * A12; const kx = (A22 * r1 - A12 * r2) / det, ky = (A11 * r2 - A12 * r1) / det;
console.log('kärki', kx.toFixed(0), ky.toFixed(0));
// Kulma kärjestä kullekin meridiaanille (asteina, mitattu y-akselista alaspäin)
const kulmat = {}; for (const [lon, s] of Object.entries(suorat)) kulmat[lon] = Math.atan(s.b) * 180 / Math.PI;
console.log('meridiaanit', Object.entries(suorat).map(([l, s]) => `${l}F: kulma ${kulmat[l].toFixed(3)}° n=${s.n} res ${s.res.join(',')}`).join('\n'));
// n = kulmaero per aste
const lonit = Object.keys(kulmat).map(Number).sort((a, b) => a - b);
const nArv = []; for (let i = 1; i < lonit.length; i++) nArv.push((kulmat[lonit[i]] - kulmat[lonit[i - 1]]) / (lonit[i] - lonit[i - 1]));
console.log('n per aste', nArv.map((v) => v.toFixed(4)).join(' '));
// Leveyspiirit: säde kärjestä
const sateet = {};
for (let lat = 42; lat <= 50; lat += 2) { const pts = pp.filter((p) => p.lat === lat); const r = pts.map((p) => Math.hypot(p.x - kx, p.y - ky)); const m = r.reduce((s, v) => s + v, 0) / r.length; sateet[lat] = { m, hajonta: r.map((v) => +(v - m).toFixed(1)) }; }
console.log('säteet', Object.entries(sateet).map(([l, s]) => `${l}N: ${s.m.toFixed(1)} poikkeamat ${s.hajonta.join(',')}`).join('\n'));
const lats = [42, 44, 46, 48, 50]; const dr = []; for (let i = 1; i < lats.length; i++) dr.push(((sateet[lats[i - 1]].m - sateet[lats[i]].m) / 2).toFixed(1));
console.log('px per leveysaste', dr.join(' '));
writeFileSync(S + 'sovitus.json', JSON.stringify({ karki: [kx, ky], kulmat, sateet: Object.fromEntries(Object.entries(sateet).map(([l, s]) => [l, s.m])), suorat }, null, 1));

// Tarkennus: leveyspiirien yhteinen keskipiste (cx, cy) pienimmän neliösumman ympyräsovituksella, Gauss-Newton
let cx = kx, cy = ky;
for (let it = 0; it < 30; it++) {
  // säteet nykyisellä keskipisteellä
  const R = {}; for (const lat of lats) { const pts = pp.filter((p) => p.lat === lat); R[lat] = pts.reduce((s, p) => s + Math.hypot(p.x - cx, p.y - cy), 0) / pts.length; }
  let J11 = 0, J12 = 0, J22 = 0, g1 = 0, g2 = 0;
  for (const p of pp) { const dx = p.x - cx, dy = p.y - cy, r = Math.hypot(dx, dy), res = r - R[p.lat]; const ux = -dx / r, uy = -dy / r; J11 += ux * ux; J12 += ux * uy; J22 += uy * uy; g1 += ux * res; g2 += uy * res; }
  const dd = J11 * J22 - J12 * J12; const sx = (J22 * g1 - J12 * g2) / dd, sy = (J11 * g2 - J12 * g1) / dd;
  cx -= sx; cy -= sy; if (Math.hypot(sx, sy) < 0.01) break;
}
const R2 = {}; for (const lat of lats) { const pts = pp.filter((p) => p.lat === lat); R2[lat] = pts.reduce((s, p) => s + Math.hypot(p.x - cx, p.y - cy), 0) / pts.length; }
console.log('ympyräkeskus', cx.toFixed(0), cy.toFixed(0), 'vs kärki', kx.toFixed(0), ky.toFixed(0));
for (const lat of lats) console.log(lat, R2[lat].toFixed(1), pp.filter((p) => p.lat === lat).map((p) => (Math.hypot(p.x - cx, p.y - cy) - R2[lat]).toFixed(1)).join(','));

// Leikkauspisteet: leveyspiiri toisen asteen polynomina y(x) omista havainnoistaan, meridiaani suorana
function ratkaise(A, b) { // Gaussin eliminointi
  const n = b.length; const M = A.map((r, i) => [...r, b[i]]);
  for (let c = 0; c < n; c++) { let p = c; for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r; [M[c], M[p]] = [M[p], M[c]]; for (let r = 0; r < n; r++) { if (r === c) continue; const f = M[r][c] / M[c][c]; for (let k = c; k <= n; k++) M[r][k] -= f * M[c][k]; } }
  return M.map((r, i) => r[n] / r[i]);
}
function pns(rivit, arvot) { const m = rivit[0].length; const A = Array.from({ length: m }, () => new Array(m).fill(0)); const b = new Array(m).fill(0); for (let i = 0; i < rivit.length; i++) for (let j = 0; j < m; j++) { b[j] += rivit[i][j] * arvot[i]; for (let k = 0; k < m; k++) A[j][k] += rivit[i][j] * rivit[i][k]; } return ratkaise(A, b); }
const kaaret = {};
for (const lat of lats) { const pts = pp.filter((p) => p.lat === lat); const X0 = 7900; const c = pns(pts.map((p) => [1, (p.x - X0) / 1000, ((p.x - X0) / 1000) ** 2]), pts.map((p) => p.y)); kaaret[lat] = { c, X0, res: pts.map((p) => +(p.y - (c[0] + c[1] * (p.x - X0) / 1000 + c[2] * ((p.x - X0) / 1000) ** 2)).toFixed(1)), xmin: Math.min(...pts.map((p) => p.x)), xmax: Math.max(...pts.map((p) => p.x)) }; }
console.log('kaaret', Object.entries(kaaret).map(([l, k]) => `${l}N c=${k.c.map((v) => v.toFixed(2)).join(',')} res ${k.res.join(',')} x ${k.xmin}-${k.xmax}`).join('\n'));
const cp = [];
for (const [lonS, s] of Object.entries(suorat)) { const lon = +lonS; if (lon === 28) continue; for (const lat of lats) { const k = kaaret[lat]; let y = 6500; for (let i = 0; i < 20; i++) { const x = s.a + s.b * y; const u = (x - k.X0) / 1000; y = k.c[0] + k.c[1] * u + k.c[2] * u * u; } const x = s.a + s.b * y; if (x < k.xmin - 1500 || x > k.xmax + 1500) continue; cp.push({ lon, lat, x, y }); } }
console.log('leikkauspisteitä', cp.length);
// Kartiomalli kärjestä (meridiaanit) + säde lineaarinen leveysasteesta: sovita ρ(lat) = r0 + r1*(46-lat) ja kulma α(lon) = a0 + n*(lon-20)
const alpha = (lon) => (kulmat[20] + 0.6766 * (lon - 20)) * Math.PI / 180;
// paremmin: pns kulmille
const ka = pns(lonit.filter((l) => l !== 28).map((l) => [1, l - 20]), lonit.filter((l) => l !== 28).map((l) => kulmat[l]));
const rr = pns(cp.map((p) => [1, 46 - p.lat]), cp.map((p) => Math.hypot(p.x - kx, p.y - ky)));
const malli = (lon, lat) => { const a = (ka[0] + ka[1] * (lon - 20)) * Math.PI / 180; const r = rr[0] + rr[1] * (46 - lat); return [kx + r * Math.sin(a), ky + r * Math.cos(a)]; };
const resK = cp.map((p) => { const [x, y] = malli(p.lon, p.lat); return [p.lon, p.lat, +(p.x - x).toFixed(1), +(p.y - y).toFixed(1)]; });
console.log('kartiomalli: kulma', ka.map((v) => v.toFixed(4)), 'säde', rr.map((v) => v.toFixed(2)));
console.log('kartiomallin residuaalit (lon lat dx dy):', JSON.stringify(resK));
console.log('max |res|', Math.max(...resK.map((r) => Math.hypot(r[2], r[3]))).toFixed(1));
// Toisen asteen polynomi kartiomallin päälle: korjaus (dx, dy) = P(lon, lat)
const rivi = (p) => { const u = (p.lon - 20) / 8, v = (p.lat - 46) / 4; return [1, u, v, u * u, u * v, v * v]; };
const cxk = pns(cp.map(rivi), resK.map((r) => r[2])); const cyk = pns(cp.map(rivi), resK.map((r) => r[3]));
const malli2 = (lon, lat) => { const [x, y] = malli(lon, lat); const r = rivi({ lon, lat }); return [x + r.reduce((s, v, i) => s + v * cxk[i], 0), y + r.reduce((s, v, i) => s + v * cyk[i], 0)]; };
const res2 = cp.map((p) => { const [x, y] = malli2(p.lon, p.lat); return Math.hypot(p.x - x, p.y - y); });
console.log('korjattu malli: max res', Math.max(...res2).toFixed(1), 'keskiarvo', (res2.reduce((s, v) => s + v, 0) / res2.length).toFixed(1));
writeFileSync(S + 'malli.json', JSON.stringify({ karki: [kx, ky], ka, rr, cxk, cyk, cp }, null, 1));
