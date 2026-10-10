// KAUKOMAAN YÖVALOT (Karttaseppä 9.10.2026, PT: pallon yö; omistajan pallolista). Sama laattajako kuin kaukomaa v1 (XYZ z11–z13).
// Lähiyövalot (LS2:n KaupunkiYovalot-passi) häipyvät 5–12 km:ssä kamerasta, joten kaukomaan aluskerros jää yöllä pimeäksi;
// tämä kerros on sen emissiivinen valo: voimakkuus = NASA Black Marble 2016 (VIIRS DNB, 500 m, public domain; ämpärin
// yovalot-2026-10-06-laatat, tausta jo vähennetty), muoto = ESA WorldCover 2021 rakennettu alue (luokka 50, CC BY 4.0) noin 55 m:n
// osuutena, joten taajamat ja kylät erottuvat terävinä eivätkä 500 m:n läikkinä. Vesi (kaukomaan vesimaski) pimeä.
// Tulos: kaukomaa/<id>/yo/{z}/{x}/{y}.jpg (harmaa voimakkuus 0–255, sRGB-käyrätön; LS2 sävyttää natriumoranssiksi).
// Käyttö: node kaukomaa-yo.mjs <id>
import fs from 'node:fs';
import jpeg from 'jpeg-js';
import { PNG } from 'pngjs';
import { fromUrl } from 'geotiff';
const ID = process.argv[2], K = `/Volumes/T7 4TB/Matkakirja-karttaseppa/iss-kuvauspaikat/kaukomaa/${ID}`;
const T = JSON.parse(fs.readFileSync(`${K}/paikka.json`, 'utf8'));
const t0 = Date.now(), loki = (...a) => console.log(((Date.now() - t0) / 1000).toFixed(0).padStart(5) + 's', ...a);
const xLon = (x, z) => (x / 2 ** z) * 360 - 180, yLat = (y, z) => (Math.atan(Math.sinh(Math.PI * (1 - (2 * y) / 2 ** z))) * 180) / Math.PI;
// alue: z11-tasojen laajuus + 0,02°
const t11 = Object.values(T.tasot).find((v) => v.z === 11);
const W0 = xLon(t11.x[0], 11) - 0.02, E0 = xLon(t11.x[1] + 1, 11) + 0.02, N0 = yLat(t11.y[0], 11) + 0.02, S0 = yLat(t11.y[1] + 1, 11) - 0.02;

// --- Black Marble (240 px / aste, lounaiskulma) ---
const BMV = `${K}/../bm-valimuisti`; fs.mkdirSync(BMV, { recursive: true });
const BM = new Map();
for (let la = Math.floor(S0); la <= Math.floor(N0); la++) for (let lo = Math.floor(W0); lo <= Math.floor(E0); lo++) {
  const n = `${la}_${lo}`, p = `${BMV}/${n}.jpg`;
  if (!fs.existsSync(p)) { const r = await fetch(`https://media.matkakirja.app/linssit/kaupunki/yovalot-2026-10-06/${n}.jpg`); if (!r.ok) { BM.set(n, null); continue; } fs.writeFileSync(p, Buffer.from(await r.arrayBuffer())); }
  const d = jpeg.decode(fs.readFileSync(p), { useTArray: true }); const g = new Uint8Array(240 * 240); for (let i = 0; i < g.length; i++) g[i] = d.data[i * 4]; BM.set(n, g);
}
// yksi mosaiikki alueen asteista (nopea haku)
const LA0 = Math.floor(S0), LA1 = Math.floor(N0), LO0 = Math.floor(W0), LO1 = Math.floor(E0), MW = (LO1 - LO0 + 1) * 240, MH = (LA1 - LA0 + 1) * 240, MOS = new Uint8Array(MW * MH);
for (let la = LA0; la <= LA1; la++) for (let lo = LO0; lo <= LO1; lo++) { const g = BM.get(`${la}_${lo}`); if (!g) continue; const ox = (lo - LO0) * 240, oy = (LA1 - la) * 240; for (let y = 0; y < 240; y++) MOS.set(g.subarray(y * 240, y * 240 + 240), (oy + y) * MW + ox); }
const bmPx = (la, lo) => { const x = Math.floor((lo - LO0) * 240), y = Math.floor((LA1 + 1 - la) * 240); return x < 0 || y < 0 || x >= MW || y >= MH ? 0 : MOS[y * MW + x]; };
const bm = (la, lo) => { // bilineaarinen pikselikeskipisteiden välillä
  const fx = lo * 240 - 0.5, fy = la * 240 - 0.5, x0 = Math.floor(fx), y0 = Math.floor(fy), u = fx - x0, v = fy - y0, P = (x, y) => bmPx((y + 0.5) / 240, (x + 0.5) / 240);
  return (P(x0, y0) * (1 - u) + P(x0 + 1, y0) * u) * (1 - v) + (P(x0, y0 + 1) * (1 - u) + P(x0 + 1, y0 + 1) * u) * v; };
loki('Black Marble -laattoja', [...BM.values()].filter(Boolean).length);

// --- WorldCover rakennettu (luokka 50) 1/4000°-ruudukkoon, osuus 1/2000°-ruudukkoon ---
const A = 4000, GW = Math.ceil((E0 - W0) * A), GH = Math.ceil((N0 - S0) * A), rak = new Uint8Array(GW * GH);
const ESA = 'https://esa-worldcover.s3.eu-central-1.amazonaws.com/v200/2021/map/ESA_WorldCover_10m_2021_v200_';
for (let la = Math.floor(S0 / 3) * 3; la < N0; la += 3) for (let lo = Math.floor(W0 / 3) * 3; lo < E0; lo += 3) {
  const nimi = `${la >= 0 ? 'N' : 'S'}${String(Math.abs(la)).padStart(2, '0')}${lo >= 0 ? 'E' : 'W'}${String(Math.abs(lo)).padStart(3, '0')}`;
  const w = Math.max(W0, lo), e = Math.min(E0, lo + 3), s = Math.max(S0, la), n = Math.min(N0, la + 3); if (e <= w || n <= s) continue;
  const tif = await fromUrl(`${ESA}${nimi}_Map.tif`); const ww = Math.round((e - w) * A), hh = Math.round((n - s) * A);
  const [d] = await tif.readRasters({ bbox: [w, s, e, n], width: ww, height: hh, resampleMethod: 'nearest' });
  const ox = Math.round((w - W0) * A), oy = Math.round((N0 - n) * A);
  for (let y = 0; y < hh; y++) for (let x = 0; x < ww; x++) if (d[y * ww + x] === 50 && oy + y < GH && ox + x < GW) rak[(oy + y) * GW + ox + x] = 1;
  loki('WorldCover', nimi, ww, '×', hh);
}
const OW = GW >> 1, OH = GH >> 1, osuus = new Float32Array(OW * OH);
for (let y = 0; y < OH; y++) for (let x = 0; x < OW; x++) { const i = 2 * y * GW + 2 * x; osuus[y * OW + x] = (rak[i] + rak[i + 1] + rak[i + GW] + rak[i + GW + 1]) / 4; }
{ // pehmennys 3 × 3 (noin 80 m), kylien reunat eivät sahaa
  const t = Float32Array.from(osuus); for (let y = 1; y < OH - 1; y++) for (let x = 1; x < OW - 1; x++) { let s = 0; for (let b = -1; b <= 1; b++) for (let a = -1; a <= 1; a++) s += t[(y + b) * OW + x + a] * (a || b ? 1 : 2); osuus[y * OW + x] = s / 10; } }
const os = (la, lo) => { const fx = (lo - W0) * 2000 - 0.5, fy = (N0 - la) * 2000 - 0.5, x0 = Math.max(0, Math.min(OW - 2, Math.floor(fx))), y0 = Math.max(0, Math.min(OH - 2, Math.floor(fy))), u = Math.max(0, Math.min(1, fx - x0)), v = Math.max(0, Math.min(1, fy - y0));
  return (osuus[y0 * OW + x0] * (1 - u) + osuus[y0 * OW + x0 + 1] * u) * (1 - v) + (osuus[(y0 + 1) * OW + x0] * (1 - u) + osuus[(y0 + 1) * OW + x0 + 1] * u) * v; };
loki('rakennettu osuus', OW, '×', OH);

// --- laatat ---
const rgba = Buffer.alloc(256 * 256 * 4); let n = 0, maxv = 0;
for (const t of Object.values(T.tasot)) for (let x = t.x[0]; x <= t.x[1]; x++) for (let y = t.y[0]; y <= t.y[1]; y++) {
  const vp = `${K}/vesi/${t.z}/${x}/${y}.png`, vm = fs.existsSync(vp) ? PNG.sync.read(fs.readFileSync(vp)).data : null;
  for (let j = 0; j < 256; j++) { const la = yLat(y + (j + 0.5) / 256, t.z);
    for (let i = 0; i < 256; i++) { const lo = xLon(x + (i + 0.5) / 256, t.z), o = (j * 256 + i) * 4;
      let L = 0; const b = bm(la, lo) / 255; if (b > 0.02) { const r = os(la, lo); L = 1 - Math.exp(-2.4 * Math.pow(b, 0.8) * (0.04 + 0.96 * Math.min(1, r * 1.6))); } // pehmeä sävytys: keskusta ei tasaannu, rakentamaton pohja 4 %
      if (vm) L *= 1 - Math.min(1, Math.max(0, (vm[o] - 100) / 100));
      const v = Math.round(L * 255); if (v > maxv) maxv = v; rgba[o] = rgba[o + 1] = rgba[o + 2] = v; rgba[o + 3] = 255; } }
  fs.mkdirSync(`${K}/yo/${t.z}/${x}`, { recursive: true }); fs.writeFileSync(`${K}/yo/${t.z}/${x}/${y}.jpg`, jpeg.encode({ data: rgba, width: 256, height: 256 }, 85).data); n++;
}
loki('VALMIS', n, 'laattaa, max', maxv);
