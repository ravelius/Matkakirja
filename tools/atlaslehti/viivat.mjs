// viivat.mjs suunta(p|m) keskus0 keskus1 ... : etsii ohuita suoria viivoja kaistasta Hough-tyyliin.
// m = meridiaanit: kaista rivejä keskellä y=keskus, korkeus H; palauttaa x kaistan keskirivillä ja kulman.
// p = leveyspiirit: kaista sarakkeita keskellä x=keskus, leveys H; palauttaa y ja kulman.
import { readFileSync } from 'node:fs';
import { kansio } from './kansio.mjs'; const K = kansio();
const info = JSON.parse(readFileSync(K + 'harmaa.json')); const W = info.width, HH = info.height;
const d = readFileSync(K + 'harmaa.raw');
const suunta = process.argv[2]; const keskukset = process.argv.slice(3).map(Number);
const H = 500; // kaistan paksuus
const X0 = 2450, X1 = 13450, Y0 = 1150, Y1 = 10450; // kartan sisäalue suunnilleen
const dark = (x, y) => 255 - d[y * W + x];
const tulos = [];
for (const c of keskukset) {
  const kulmat = []; for (let a = -9; a <= 9; a += 0.1) kulmat.push(a);
  const paras = new Map(); // sijainti -> [e, kulma, prof]
  const alku = suunta === 'm' ? X0 : Y0, loppu = suunta === 'm' ? X1 : Y1;
  const n = loppu - alku;
  for (const a of kulmat) {
    const t = Math.tan(a * Math.PI / 180);
    const prof = new Float64Array(n);
    for (let j = -H / 2; j < H / 2; j++) {
      const siirto = j * t;
      const s0 = Math.floor(siirto), f = siirto - s0;
      for (let i = 0; i < n; i++) {
        const p = alku + i + s0;
        let v;
        if (suunta === 'm') { const y = c + j; if (y < 0 || y >= HH || p < 0 || p + 1 >= W) continue; v = dark(p, y) * (1 - f) + dark(p + 1, y) * f; }
        else { const x = c + j; if (x < 0 || x >= W || p < 0 || p + 1 >= HH) continue; v = dark(x, p) * (1 - f) + dark(x, p + 1) * f; }
        prof[i] += v;
      }
    }
    for (let i = 0; i < n; i++) prof[i] /= H;
    for (let i = 20; i < n - 20; i++) {
      if (!(prof[i] >= prof[i - 1] && prof[i] >= prof[i + 1])) continue;
      const ymp = []; for (let j = -20; j <= 20; j++) if (Math.abs(j) > 3) ymp.push(prof[i + j]);
      ymp.sort((u, v) => u - v); const med = ymp[ymp.length >> 1];
      const e = prof[i] - med;
      if (e < 25) continue;
      const key = alku + i;
      // sama viiva eri kulmilla: pidä paras ±4 px sisällä
      let osuma = null; for (let k = key - 4; k <= key + 4; k++) if (paras.has(k)) { osuma = k; break; }
      if (osuma !== null) { if (paras.get(osuma)[0] < e) { paras.delete(osuma); paras.set(key, [e, a, prof[i]]); } }
      else paras.set(key, [e, a, prof[i]]);
    }
  }
  const lista = [...paras.entries()].map(([p, [e, a, v]]) => ({ p, e: +e.toFixed(1), kulma: +a.toFixed(1), v: +v.toFixed(0) })).sort((u, v) => u.p - v.p);
  tulos.push({ keskus: c, viivat: lista });
}
console.log(JSON.stringify(tulos));
