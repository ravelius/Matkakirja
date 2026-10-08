#!/usr/bin/env node
// PILVITIHEYS (Karttaseppä 8.10.2026; raportti pallo-unreal-vertailu kohdat 3 ja 6a, LS2 varjostimet).
// Saumaton 1024² tiheyskenttä: R = isot kumpupilvet (käänteinen Worley × gradienttikohina, 4 oktaavia),
// G = pieni yksityiskohta (gradienttikohina 5 oktaavia). B = 0. Arvot 0–255 lineaarisina (ei sRGB).
// Peitto kynnyksenä varjostimessa: pilvi = smoothstep(1 − peitto, 1 − peitto + 0,15, R − 0,25·(1 − G)).
// Käyttö: node tools/ilmakeha/pilvet.mjs <ulos-kansio> [--koko 1024] [--siemen 7]
// Tuottaa pilvet-tiheys.rgb (raaka RGB8) ja pilvet-tiheys.json; PNG: python3 tools/ilmakeha/rgb-png.py <rgb> <leveys> <korkeus> <png>
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const ULOS = args.find((a) => !a.startsWith('--')) || 'pilvet-ulos';
const arvo = (n, d) => { const i = args.indexOf('--' + n); return i >= 0 ? +args[i + 1] : d; };
const N = arvo('koko', 1024), SIEMEN = arvo('siemen', 7);

function satunnainen(s) { return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
const rnd = satunnainen(SIEMEN);
// jaksollinen gradienttikohina: hila p×p, kulmat kiertyvät (saumaton)
function gradientti(p) {
  const g = Array.from({ length: p * p }, () => { const a = rnd() * Math.PI * 2; return [Math.cos(a), Math.sin(a)]; });
  const f = (t) => t * t * t * (t * (t * 6 - 15) + 10);
  return (x, y) => { // x, y ∈ [0,1)
    const X = x * p, Y = y * p, x0 = Math.floor(X), y0 = Math.floor(Y), fx = X - x0, fy = Y - y0;
    const d = (i, j) => { const q = g[((y0 + j) % p) * p + ((x0 + i) % p)]; return q[0] * (fx - i) + q[1] * (fy - j); };
    const u = f(fx), v = f(fy);
    return (d(0, 0) * (1 - u) + d(1, 0) * u) * (1 - v) + (d(0, 1) * (1 - u) + d(1, 1) * u) * v; // ≈ −0,7…0,7
  };
}
// jaksollinen Worley (lähin piste, solut p×p)
function worley(p) {
  const pt = Array.from({ length: p * p }, () => [rnd(), rnd()]);
  return (x, y) => {
    const X = x * p, Y = y * p, cx = Math.floor(X), cy = Math.floor(Y); let m = 9;
    for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) {
      const ix = (cx + i + p) % p, iy = (cy + j + p) % p, q = pt[iy * p + ix], dx = cx + i + q[0] - X, dy = cy + j + q[1] - Y;
      m = Math.min(m, dx * dx + dy * dy);
    }
    return Math.sqrt(m); // 0…~1
  };
}
const W = [4, 8, 16, 32].map(worley), PG = [4, 8, 16, 32, 64].map(gradientti), DG = [16, 32, 64, 128, 256].map(gradientti);
const kuva = Buffer.alloc(N * N * 3), R = new Float32Array(N * N), Gk = new Float32Array(N * N);
for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
  const x = i / N, y = j / N;
  let w = 0, a = 1, s = 0; for (const f of W) { w += a * (1 - f(x, y)); s += a; a *= 0.5; } w /= s;
  let n = 0; a = 1; s = 0; for (const f of PG) { n += a * f(x, y); s += a; a *= 0.5; } n /= s;
  let d = 0; a = 1; s = 0; for (const f of DG) { d += a * f(x, y); s += a; a *= 0.55; } d /= s;
  R[j * N + i] = w * 0.7 + (n * 0.5 + 0.5) * 0.3; Gk[j * N + i] = d * 0.5 + 0.5;
}
const venyta = (A) => { const s = Float32Array.from(A).sort(), lo = s[Math.floor(s.length * 0.01)], hi = s[Math.floor(s.length * 0.99)]; return (v) => Math.max(0, Math.min(1, (v - lo) / (hi - lo))); };
const vr = venyta(R), vg = venyta(Gk);
for (let k = 0; k < N * N; k++) { kuva[k * 3] = Math.round(vr(R[k]) * 255); kuva[k * 3 + 1] = Math.round(vg(Gk[k]) * 255); }
fs.mkdirSync(ULOS, { recursive: true });
fs.writeFileSync(path.join(ULOS, 'pilvet-tiheys.rgb'), kuva);
fs.writeFileSync(path.join(ULOS, 'pilvet-tiheys.json'), JSON.stringify({
  tyokalu: 'tools/ilmakeha/pilvet.mjs', luotu: new Date().toISOString(), koko: [N, N], siemen: SIEMEN, saumaton: true,
  kanavat: { R: 'isot kumpupilvet (Worley 4/8/16/32 + gradientti 4–64), venytetty 1–99 %', G: 'yksityiskohta (gradientti 16–256), venytetty 1–99 %', B: '0 (ei käytössä)' },
  tuonti: 'Linear (ei sRGB), Repeat, mipit päällä, muoto R8G8 tai ASTC 6×6',
  peitto: 'pilvi = smoothstep(1 − peitto, 1 − peitto + 0,15, R − 0,25·(1 − G)); peitto 0–1 sääkerroksesta',
  mittakaava_ehdotus: 'yksi jakso noin 40 km maassa (isot solut 10 km, pienimmät noin 150 m)',
}, null, 2));
console.log('valmis', path.join(ULOS, 'pilvet-tiheys.rgb'), N);
