#!/usr/bin/env node
// ILMAKEHÄN LUT-TYÖKALU (Karttaseppä 8.10.2026; raportti docs/raportit/pallo-unreal-vertailu-20261008.md kohdat 1–2,
// PT: Karttaseppä tekee taulukot, Linssiseppä 2 varjostimet). Fysikaalinen ilmakehä Hillairen (2020) mallilla:
// Rayleigh + Mie + otsoni, yksinkertainen sironta + monisironta (Ψms-taulukko), maan albedo monisironnassa.
//
// Tulosteet (RGBAHalf, little-endian, x nopein, sitten y, sitten z; mitat ja akselit myös .json-tiedostossa):
//   lapaisy.bin          256 × 64        läpäisy ilmakehän ylärajalle: RGB = T, A = 1
//   taivas.bin           64 × 64 × 96    taivaan radianssi kamerasta: RGB = L (aurinko E = 1), A = 1
//   ilmaperspektiivi.bin 32 × 32 × 96    sironnut valo kameran ja maan välillä: RGB = L_in, A = keskimääräinen läpäisy
//   ilmaperspektiivi-lapaisy.bin  sama koko, RGB = läpäisy kanavittain, A = 1
// Kameran korkeustasot KORKEUDET (oletus 500 / 1500 / 3000 m) on pinottu z-akselille (32 per taso).
// Käyttö: node tools/ilmakeha/ilmakeha-lut.mjs <ulos-kansio> [--mie 1.0] [--albedo 0.3] [--esikatselu]
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const ULOS = args.find((a) => !a.startsWith('--')) || 'ilmakeha-ulos';
const arvo = (n, d) => { const i = args.indexOf('--' + n); return i >= 0 ? +args[i + 1] : d; };
const MIE_K = arvo('mie', 1.0), ALBEDO = arvo('albedo', 0.3), ESIKATSELU = args.includes('--esikatselu');
const KORKEUDET = [500, 1500, 3000];

// --- ilmakehä (metreinä; Hillaire 2020 / Bruneton 2017 oletukset) ---
const R = 6360e3, RT = 6460e3;
const BR = [5.802e-6, 13.558e-6, 33.1e-6], HR = 8000;
const BMS = 3.996e-6 * MIE_K, BME = 4.40e-6 * MIE_K, HM = 1200, G = 0.8;
const BO = [0.650e-6, 1.881e-6, 0.085e-6];
const tiheys = (h) => [Math.exp(-h / HR), Math.exp(-h / HM), Math.max(0, 1 - Math.abs(h - 25000) / 15000)];
const sammutus = (h) => { const [r, m, o] = tiheys(h); return [0, 1, 2].map((c) => BR[c] * r + BME * m + BO[c] * o); };
const sironta = (h) => { const [r, m] = tiheys(h); return { r: BR.map((b) => b * r), m: BMS * m }; };
const vaiheR = (c) => (3 / (16 * Math.PI)) * (1 + c * c);
const vaiheM = (c) => (3 / (8 * Math.PI)) * ((1 - G * G) * (1 + c * c)) / ((2 + G * G) * Math.pow(1 + G * G - 2 * G * c, 1.5));

// säteen etäisyys ylärajalle / maahan (r säde keskipisteestä, mu kosini zeniitistä)
const ylaraja = (r, mu) => -r * mu + Math.sqrt(Math.max(0, r * r * (mu * mu - 1) + RT * RT));
const maahan = (r, mu) => { const d = r * r * (mu * mu - 1) + R * R; return mu < 0 && d >= 0 ? -r * mu - Math.sqrt(d) : -1; };
// piste etäisyydellä t: uusi säde ja zeniittikosinit (Bruneton)
const rT = (r, mu, t) => Math.sqrt(t * t + 2 * r * mu * t + r * r);

// --- läpäisytaulukko Hillairen (2020) / UE:n UV-muodossa: H = sqrt(RT² − R²), rho = sqrt(r² − R²), d = etäisyys ylärajalle,
//     x_mu = (d − (RT − r)) / ((rho + H) − (RT − r)), x_r = rho / H. Kattaa suunnat horisonttiin asti (maahan osuvat → varjostin tarkistaa). ---
const TW = 256, TH = 64, HH = Math.sqrt(RT * RT - R * R);
function uvLap(r, mu) { const rho = Math.sqrt(Math.max(0, r * r - R * R)), d = ylaraja(r, mu), dmin = RT - r, dmax = rho + HH; return [(d - dmin) / (dmax - dmin), rho / HH]; }
function lapUv(u, v) { const rho = HH * v, r = Math.sqrt(rho * rho + R * R), dmin = RT - r, dmax = rho + HH, d = dmin + u * (dmax - dmin); return [r, d === 0 ? 1 : Math.max(-1, Math.min(1, (HH * HH - rho * rho - d * d) / (2 * r * d)))]; }
const LAP = new Float32Array(TW * TH * 3);
for (let j = 0; j < TH; j++) for (let i = 0; i < TW; i++) {
  const [r, mu] = lapUv(i / (TW - 1), j / (TH - 1)), o = (j * TW + i) * 3, tm = ylaraja(r, mu), N = 80, od = [0, 0, 0];
  for (let k = 0; k < N; k++) { const t = ((k + 0.5) / N) * tm, e = sammutus(rT(r, mu, t) - R); for (let c = 0; c < 3; c++) od[c] += e[c] * (tm / N); }
  for (let c = 0; c < 3; c++) LAP[o + c] = Math.exp(-od[c]);
}
function lapaisy(h, mu) { // bilineaarinen haku
  const r = R + Math.max(0, h); if (maahan(r, mu) >= 0) return [0, 0, 0]; // maa varjostaa
  const [uu, vv] = uvLap(r, mu), x = Math.min(1, Math.max(0, uu)) * (TW - 1), y = Math.min(1, Math.max(0, vv)) * (TH - 1);
  const x0 = Math.floor(x), y0 = Math.floor(y), x1 = Math.min(TW - 1, x0 + 1), y1 = Math.min(TH - 1, y0 + 1), fx = x - x0, fy = y - y0, v = [0, 0, 0];
  for (let c = 0; c < 3; c++) {
    const a = LAP[(y0 * TW + x0) * 3 + c], b = LAP[(y0 * TW + x1) * 3 + c], d = LAP[(y1 * TW + x0) * 3 + c], e = LAP[(y1 * TW + x1) * 3 + c];
    v[c] = (a * (1 - fx) + b * fx) * (1 - fy) + (d * (1 - fx) + e * fx) * fy;
  }
  return v;
}

// --- monisironta Ψms(h, mu_s): 32 × 32, x = (mu_s + 1) / 2, y = h / 100 km (Hillaire 2020, isotrooppinen) ---
const MW = 32, MH = 32, MS = new Float32Array(MW * MH * 3);
{
  const SUUNNAT = [], NT = 8, NP = 16; // tasainen pallo: cos θ tasavälein, φ tasavälein
  for (let a = 0; a < NT; a++) for (let b = 0; b < NP; b++) { const ct = 1 - 2 * (a + 0.5) / NT, st = Math.sqrt(1 - ct * ct), p = 2 * Math.PI * (b + 0.5) / NP; SUUNNAT.push([st * Math.cos(p), st * Math.sin(p), ct]); }
  for (let j = 0; j < MH; j++) for (let i = 0; i < MW; i++) {
    const h = ((j + 0.5) / MH) * (RT - R), mus = ((i + 0.5) / MW) * 2 - 1, r = R + h, aur = [Math.sqrt(1 - mus * mus), 0, mus];
    const L2 = [0, 0, 0], F = [0, 0, 0];
    for (const v of SUUNNAT) {
      const mu = v[2], nu = v[0] * aur[0] + v[2] * aur[2], tg = maahan(r, mu), tm = tg >= 0 ? tg : ylaraja(r, mu), N = 24, dt = tm / N, T = [1, 1, 1];
      for (let k = 0; k < N; k++) {
        const t = (k + 0.5) * dt, rr = rT(r, mu, t), hh = rr - R, muS = (r * mus + t * nu) / rr, s = sironta(hh), e = sammutus(hh), ts = lapaisy(hh, muS);
        for (let c = 0; c < 3; c++) {
          const sc = s.r[c] + s.m, te = Math.exp(-e[c] * dt), kerroin = (1 - te) / Math.max(e[c], 1e-12); // analyyttinen integraali segmentille
          L2[c] += T[c] * sc * ts[c] * (1 / (4 * Math.PI)) * kerroin;
          F[c] += T[c] * sc * kerroin;
          T[c] *= te;
        }
      }
      if (tg >= 0) { const muG = (r * mus + tg * nu) / R, ts = lapaisy(0, muG); for (let c = 0; c < 3; c++) L2[c] += T[c] * ts[c] * Math.max(0, muG) * ALBEDO / Math.PI; }
    }
    for (let c = 0; c < 3; c++) { const l = L2[c] / SUUNNAT.length, f = F[c] / SUUNNAT.length; MS[(j * MW + i) * 3 + c] = l / (1 - f); }
  }
}
function psi(h, mus) {
  const x = Math.min(MW - 1, Math.max(0, ((mus + 1) / 2) * MW - 0.5)), y = Math.min(MH - 1, Math.max(0, (h / (RT - R)) * MH - 0.5));
  const x0 = Math.floor(x), y0 = Math.floor(y), x1 = Math.min(MW - 1, x0 + 1), y1 = Math.min(MH - 1, y0 + 1), fx = x - x0, fy = y - y0, v = [0, 0, 0];
  for (let c = 0; c < 3; c++) {
    const a = MS[(y0 * MW + x0) * 3 + c], b = MS[(y0 * MW + x1) * 3 + c], d = MS[(y1 * MW + x0) * 3 + c], e = MS[(y1 * MW + x1) * 3 + c];
    v[c] = (a * (1 - fx) + b * fx) * (1 - fy) + (d * (1 - fx) + e * fx) * fy;
  }
  return v;
}

// --- sironnan integrointi säteelle (r, mu, mus, nu) etäisyydelle tMax: palauttaa [L_in RGB, T RGB] ---
function integroi(r, mu, mus, nu, tMax, N, neliollinen) {
  const L = [0, 0, 0], T = [1, 1, 1], pr = vaiheR(nu), pm = vaiheM(nu);
  let tEd = 0;
  for (let k = 0; k < N; k++) {
    const u1 = (k + 1) / N, t1 = neliollinen ? tMax * u1 * u1 : tMax * u1, dt = t1 - tEd, t = (tEd + t1) / 2; tEd = t1;
    const rr = rT(r, mu, t), hh = rr - R, muS = (r * mus + t * nu) / rr, s = sironta(hh), e = sammutus(hh), ts = lapaisy(hh, muS), ms = psi(hh, muS);
    for (let c = 0; c < 3; c++) {
      const S = (s.r[c] * pr + s.m * pm) * ts[c] + (s.r[c] + s.m) * ms[c], te = Math.exp(-e[c] * dt);
      L[c] += T[c] * S * (1 - te) / Math.max(e[c], 1e-12);
      T[c] *= te;
    }
  }
  return [L, T];
}

// --- taivas: x = katseen zeniitti (Hillaire: v = 0,5 + 0,5·sign(l)·sqrt(|l| / (π/2)), l = π/2 − θv), y = atsimuutti auringosta / π,
//     z = taso·32 + auringon zeniitti θs / 100° · 31 (θs 0…100°) ---
const SX = 64, SY = 64, SZ = 32;
const lV = (x) => { const s = x * 2 - 1; return Math.sign(s) * s * s * (Math.PI / 2); }; // x∈[0,1] → leveys l
const TAIVAS = new Float32Array(SX * SY * SZ * KORKEUDET.length * 4);
KORKEUDET.forEach((hc, taso) => {
  const r = R + hc;
  for (let z = 0; z < SZ; z++) {
    const ts = (z / (SZ - 1)) * (100 * Math.PI / 180), mus = Math.cos(ts), sinS = Math.sin(ts);
    for (let y = 0; y < SY; y++) {
      const phi = (y / (SY - 1)) * Math.PI;
      for (let x = 0; x < SX; x++) {
        const l = lV(x / (SX - 1)), mu = Math.sin(l), cosL = Math.cos(l), nu = mu * mus + cosL * sinS * Math.cos(phi);
        const tg = maahan(r, mu), tm = tg >= 0 ? tg : ylaraja(r, mu);
        const [L] = integroi(r, mu, mus, nu, tm, 48, true), o = ((((taso * SZ + z) * SY + y) * SX) + x) * 4;
        TAIVAS[o] = L[0]; TAIVAS[o + 1] = L[1]; TAIVAS[o + 2] = L[2]; TAIVAS[o + 3] = 1;
      }
    }
  }
});

// --- ilmaperspektiivi: x = sqrt(d / 80 km), y = (cos γ + 1) / 2 (γ katse–aurinko), z = taso·32 + θs / 100° · 31.
//     Polku kamerasta (korkeus hc) maan pinnalle (korkeus max(0, hc − d)) suoraan; aurinkokulma pisteessä Brunetonin kaavalla. ---
const AX = 32, AY = 32, AZ = 32, AP = new Float32Array(AX * AY * AZ * KORKEUDET.length * 4), APT = new Float32Array(AP.length);
KORKEUDET.forEach((hc, taso) => {
  const r = R + hc;
  for (let z = 0; z < AZ; z++) {
    const ts = (z / (AZ - 1)) * (100 * Math.PI / 180), mus = Math.cos(ts), sinS = Math.sin(ts);
    for (let x = 0; x < AX; x++) {
      const d = Math.max(1, Math.pow(x / (AX - 1), 2) * 80e3), ht = Math.max(0, hc - d), rt = R + ht;
      const mu = Math.max(-1, Math.min(1, (rt * rt - d * d - r * r) / (2 * r * d))), sinV = Math.sqrt(1 - mu * mu);
      for (let y = 0; y < AY; y++) {
        let nu = (y / (AY - 1)) * 2 - 1;
        const lo = mu * mus - sinV * sinS, hi = mu * mus + sinV * sinS; // geometrisesti mahdollinen väli
        const nuS = Math.max(lo, Math.min(hi, nu)); // aurinkokulmaan rajattu, vaihefunktioon alkuperäinen
        const [L, T] = integroiAP(r, mu, mus, nu, nuS, d), o = ((((taso * AZ + z) * AY + y) * AX) + x) * 4;
        AP[o] = L[0]; AP[o + 1] = L[1]; AP[o + 2] = L[2]; AP[o + 3] = (T[0] + T[1] + T[2]) / 3;
        APT[o] = T[0]; APT[o + 1] = T[1]; APT[o + 2] = T[2]; APT[o + 3] = 1;
      }
    }
  }
});
function integroiAP(r, mu, mus, nuVaihe, nuGeo, d) {
  const L = [0, 0, 0], T = [1, 1, 1], pr = vaiheR(nuVaihe), pm = vaiheM(nuVaihe), N = 32, dt = d / N;
  for (let k = 0; k < N; k++) {
    const t = (k + 0.5) * dt, rr = rT(r, mu, t), hh = Math.max(0, rr - R), muS = (r * mus + t * nuGeo) / rr, s = sironta(hh), e = sammutus(hh), ts = lapaisy(hh, muS), ms = psi(hh, muS);
    for (let c = 0; c < 3; c++) {
      const S = (s.r[c] * pr + s.m * pm) * ts[c] + (s.r[c] + s.m) * ms[c], te = Math.exp(-e[c] * dt);
      L[c] += T[c] * S * (1 - te) / Math.max(e[c], 1e-12);
      T[c] *= te;
    }
  }
  return [L, T];
}

// --- kirjoitus ---
function puolikas(f) { // float32 → float16 (pyöristys lähimpään)
  const b = new Float32Array([f]), u = new Uint32Array(b.buffer)[0], s = (u >>> 16) & 0x8000; let e = ((u >>> 23) & 0xff) - 127 + 15, m = u & 0x7fffff;
  if (e <= 0) { if (e < -10) return s; m |= 0x800000; const sh = 14 - e; return s | ((m >> sh) + ((m >> (sh - 1)) & 1)); }
  if (e >= 31) return s | 0x7c00;
  const h = s | (e << 10) | (m >> 13); return h + ((m >> 12) & 1);
}
function kirjoita(nimi, data, kanavia, mitat, kuvaus) {
  const n = data.length / kanavia, buf = Buffer.alloc(n * 8);
  for (let i = 0; i < n; i++) for (let c = 0; c < 4; c++) buf.writeUInt16LE(puolikas(c < kanavia ? data[i * kanavia + c] : 1), (i * 4 + c) * 2);
  fs.writeFileSync(path.join(ULOS, nimi + '.bytes'), buf);
  return { tiedosto: nimi + '.bytes', muoto: 'RGBAHalf little-endian, x nopein', mitat, kuvaus };
}
fs.mkdirSync(ULOS, { recursive: true });
const meta = {
  R_km: R / 1000, RT_km: RT / 1000, ap_etaisyys_km: 80, taivas_zeniitti: { kaava: 'l = sign(s)·s²·π/2, s = 2u − 1; katseen zeniitti θv = π/2 − l', kaanteinen: 'u = 0,5 + 0,5·sign(l)·sqrt(|l| / (π/2))' }, korkeustasot_z: 'z = taso·32 + w·31, taso 0 = 500 m, 1 = 1500 m, 2 = 3000 m',
  tyokalu: 'tools/ilmakeha/ilmakeha-lut.mjs', luotu: new Date().toISOString(), mie_kerroin: MIE_K, albedo: ALBEDO, korkeudet_m: KORKEUDET,
  yksikko: 'radianssi suhteessa auringon irradianssiin E = 1 (kanavittain valkoinen aurinko). Näyttöön: väri = valotus × L, valotus noin 10–30, sitten sävytys.',
  vakiot: { R_m: R, RT_m: RT, rayleigh: BR, HR_m: HR, mie_sironta: BMS, mie_sammutus: BME, HM_m: HM, g: G, otsoni: BO },
  taulukot: [
    kirjoita('lapaisy', LAP, 3, [TW, TH], 'Läpäisy ilmakehän ylärajalle, Hillaire 2020 / UE SkyAtmosphere -UV: H = sqrt(RT² − R²), rho = sqrt(r² − R²), d = −r·mu + sqrt(r²(mu² − 1) + RT²), u = (d − (RT − r)) / (rho + H − (RT − r)), v = rho / H (u, v ∈ [0,1], tekseli = u·(W−1), v·(H−1)). Käänteinen: rho = H·v, r = sqrt(rho² + R²), d = (RT − r) + u·(rho + H − (RT − r)), mu = (H² − rho² − d²) / (2·r·d). Maahan osuva suunta (mu < 0 ja r²(mu² − 1) + R² ≥ 0) → läpäisy 0 (varjostin tarkistaa).'),
    kirjoita('taivas', TAIVAS, 4, [SX, SY, SZ * KORKEUDET.length], 'Taivaan radianssi. u = x/(W−1): s = 2u − 1, leveyskulma l = sign(s)·s²·π/2 (l = 90° − katseen zeniitti; käänteinen u = 0,5 + 0,5·sign(l)·sqrt(|l|/(π/2))). v = y/(H−1): atsimuutti auringosta φ = v·π (symmetrinen). z = taso·32 + w·31, w = auringon zeniitti / 100° (0–100°). Taso = KORKEUDET-indeksi; varjostin interpoloi kahden tason välillä.'),
    kirjoita('ilmaperspektiivi', AP, 4, [AX, AY, AZ * KORKEUDET.length], 'Sironnut valo kamerasta maan pinnalle (kohde korkeudella max(0, kamera − d)). u = x/(W−1): d = u² · 80 km. v = y/(H−1): cos γ = 2v − 1 (γ katseen ja auringon välinen kulma). z kuten taivaassa. RGB = L_in, A = keskimääräinen läpäisy. Pinta: väri = pinta·T + L_in·valotus.'),
    kirjoita('ilmaperspektiivi-lapaisy', APT, 4, [AX, AY, AZ * KORKEUDET.length], 'Sama kuin ilmaperspektiivi, RGB = läpäisy kanavittain (punertuminen kaukana).'),
  ],
};
// näytepisteet LS2:n testille: tekselikoordinaatti, fyysinen syöte ja odotettu RGBA (puolikkaaksi pyöristettynä)
const ph = (f) => { const h = puolikas(f), e = (h >> 10) & 31, m = h & 1023, sg = h & 0x8000 ? -1 : 1; return +(sg * (e === 0 ? m * 2 ** -24 : 2 ** (e - 15) * (1 + m / 1024))).toPrecision(6); };
const deg = (a) => +(a * 180 / Math.PI).toFixed(4);
meta.naytteet = [];
for (const [i, j] of [[0, 0], [128, 10], [255, 32], [40, 63], [200, 50]]) { const [r, mu] = lapUv(i / (TW - 1), j / (TH - 1)), o = (j * TW + i) * 3;
  meta.naytteet.push({ taulukko: 'lapaisy', tekseli: [i, j], syote: { korkeus_m: +(r - R).toFixed(1), mu: +mu.toFixed(6) }, odotettu: [LAP[o], LAP[o + 1], LAP[o + 2], 1].map(ph) }); }
for (const [x, y, z] of [[32, 0, 10], [40, 63, 40], [63, 20, 70], [16, 32, 31], [50, 10, 95]]) { const o = ((z * SY + y) * SX + x) * 4, l = lV(x / (SX - 1));
  meta.naytteet.push({ taulukko: 'taivas', tekseli: [x, y, z], syote: { korkeus_m: KORKEUDET[Math.floor(z / SZ)], katseen_zeniitti_deg: deg(Math.PI / 2 - l), atsimuutti_auringosta_deg: deg((y / (SY - 1)) * Math.PI), auringon_zeniitti_deg: +(((z % SZ) / (SZ - 1)) * 100).toFixed(4) }, odotettu: [...TAIVAS.slice(o, o + 4)].map(ph) }); }
for (const [x, y, z] of [[0, 16, 5], [31, 31, 20], [16, 0, 50], [24, 20, 80], [8, 28, 95]]) { const o = ((z * AY + y) * AX + x) * 4;
  meta.naytteet.push({ taulukko: 'ilmaperspektiivi', tekseli: [x, y, z], syote: { korkeus_m: KORKEUDET[Math.floor(z / AZ)], etaisyys_m: +Math.max(1, Math.pow(x / (AX - 1), 2) * 80e3).toFixed(2), cos_gamma: +((y / (AY - 1)) * 2 - 1).toFixed(6), auringon_zeniitti_deg: +(((z % AZ) / (AZ - 1)) * 100).toFixed(4) }, odotettu: [...AP.slice(o, o + 4)].map(ph) }); }
fs.writeFileSync(path.join(ULOS, 'ilmakeha.json'), JSON.stringify(meta, null, 2));
console.log('valmis', ULOS, meta.taulukot.map((t) => `${t.tiedosto} ${t.mitat.join('×')}`).join(', '));

// --- esikatselu (raaka RGB8, muunnos PNG:ksi esikatselu.py:llä) ---
if (ESIKATSELU) {
  const tm = (v) => Math.round(255 * Math.pow(1 - Math.exp(-v), 1 / 2.2));
  const W = 720, H = 200, kulmat = [20, 60, 80, 88, 93], kuva = Buffer.alloc(W * H * kulmat.length * 3), VAL = 20;
  kulmat.forEach((ts, k) => {
    const z = Math.round((ts / 100) * 31) + SZ; // taso 1500 m
    for (let py = 0; py < H; py++) for (let px = 0; px < W; px++) {
      const l = (0.5 - py / H) * Math.PI * 0.6, phi = Math.abs((px / W) * 2 - 1) * Math.PI; // keskellä aurinkoa kohti, reunoilla vastakkainen suunta
      const sx = (0.5 + 0.5 * Math.sign(l) * Math.sqrt(Math.abs(l) / (Math.PI / 2))) * (SX - 1), sy = (phi / Math.PI) * (SY - 1);
      const o = (((z * SY + Math.round(sy)) * SX) + Math.round(sx)) * 4, q = ((k * H + py) * W + px) * 3;
      for (let c = 0; c < 3; c++) kuva[q + c] = tm(TAIVAS[o + c] * VAL);
    }
  });
  fs.writeFileSync(path.join(ULOS, 'esikatselu-taivas.rgb'), kuva);
  const AW = 640, AH = 60, rivit = [[30, 1], [30, -1], [80, 1], [80, -1]], ap = Buffer.alloc(AW * AH * rivit.length * 3);
  rivit.forEach(([ts, cg], k) => {
    const z = Math.round((ts / 100) * 31) + AZ, y = Math.round(((cg + 1) / 2) * (AY - 1)), pinta = [0.12, 0.13, 0.08];
    for (let px = 0; px < AW; px++) {
      const x = Math.round(Math.sqrt(px / (AW - 1)) * (AX - 1)), o = (((z * AY + y) * AX) + x) * 4;
      for (let py = 0; py < AH; py++) for (let c = 0; c < 3; c++) ap[((k * AH + py) * AW + px) * 3 + c] = tm(pinta[c] * APT[o + c] * 3 + AP[o + c] * VAL);
    }
  });
  fs.writeFileSync(path.join(ULOS, 'esikatselu-ap.rgb'), ap);
  fs.writeFileSync(path.join(ULOS, 'esikatselu.json'), JSON.stringify({ taivas: [W, H * kulmat.length, 'aurinko zeniitissä ' + kulmat.join('/') + '°, 1500 m, keskellä aurinkoa kohti'], ap: [AW, AH * rivit.length, 'd 0–80 km; rivit: aurinko 30° myötä/vasta, 80° myötä/vasta; pinta tumma vihreä'] }));
}
