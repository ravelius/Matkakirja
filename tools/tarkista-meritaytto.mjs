/*
 * MERITÄYTÖN TARKISTUS (Karttaseppä 11.10.2026, PT: "meriHaku kaikkiin Euroopan
 * rannikkokaupunkeihin, joissa meri on jäänyt paperinväriseksi").
 *
 * Kuinka suuri osa GSHHG:n merestä näkyy kohdekartan kuvassa vetenä. Peli näyttää
 * värikartan, kun se on olemassa, joten verrataan sitä (vesi #c3d5da), muuten
 * polku-kuvaa (vesi #e8d5a9). 50 × 50 näytettä piirtoalalta; meripisteestä
 * katsotaan 5 × 5 pikselin ikkuna, jottei katuviiva sotke.
 *
 *   node tools/tarkista-meritaytto.mjs <repo> <gshhs_f.b> <lista.json> <ulos.json>
 *
 * lista.json = [{ id }, …] (kohdekarttojen avaimet). gshhs_f.b: NAS
 * Matkakirja-arkisto/karttaseppa/pyramidi-poltto/gshhg-2.3.7/. Tulkinta:
 * meri_osuus ≥ 0,02 ja nakyy_vetena < 0,7 → katso kuva; tyypillinen syy on
 * puuttuva meri-täyttö (piirra-kaupunkikartta.mjs: meri + meriHaku). GSHHG on
 * satamissa ja täyttömaalla karkea (Kööpenhamina 0,31, Monaco 0,48 ovat kunnossa).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { inflateSync } from 'node:zlib';
const [W, GSHHS, LISTA, ULOS] = process.argv.slice(2);
const { lueGshhs, normalisoi } = await import(`file://${W}/tools/gshhs-lue.mjs`);
const { KAUPUNKIKARTAT: K, karttapiste } = await import(`file://${W}/js/packs/maakartat.js`);
const L = JSON.parse(readFileSync(LISTA, 'utf8'));
const maat = [];
for (const p of lueGshhs(readFileSync(GSHHS)).filter((p) => p.taso === 1 && p.laajuus.n > 34 && p.laajuus.s < 72)) {
  const pari = []; for (let i = 0; i < p.n; i++) pari.push([p.pisteet[i * 2], p.pisteet[i * 2 + 1]]);
  for (const osa of normalisoi(pari)) { const f = new Float64Array(osa.length * 2); let w = 1e9, e = -1e9, s = 1e9, n = -1e9;
    osa.forEach(([lo, la], i) => { f[i * 2] = lo; f[i * 2 + 1] = la; w = Math.min(w, lo); e = Math.max(e, lo); s = Math.min(s, la); n = Math.max(n, la); });
    maat.push({ pisteet: f, laajuus: { w, e, s, n } }); }
}
console.error('osia', maat.length);
function sisalla(lon, lat, pts) { let s = false; const n = pts.length / 2;
  for (let i = 0, j = n - 1; i < n; j = i++) { const xi = pts[i * 2], yi = pts[i * 2 + 1], xj = pts[j * 2], yj = pts[j * 2 + 1];
    if ((yi > lat) !== (yj > lat) && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) s = !s; } return s; }
function png(polku) { const b = readFileSync(polku); let i = 8, w = 0, h = 0, t = 0; const pal = [];
  while (i < b.length) { const n = b.readUInt32BE(i), nm = b.toString('ascii', i + 4, i + 8), d = b.subarray(i + 8, i + 8 + n);
    if (nm === 'IHDR') { w = d.readUInt32BE(0); h = d.readUInt32BE(4); t = d[9]; } else if (nm === 'IDAT') pal.push(d); i += 12 + n; }
  const c = t === 6 ? 4 : 3, raw = inflateSync(Buffer.concat(pal)), row = w * c, o = Buffer.alloc(h * row); let p = 0;
  for (let y = 0; y < h; y++) { const f = raw[p++]; for (let x = 0; x < row; x++) { const v = raw[p + x], a = x >= c ? o[y * row + x - c] : 0, u = y ? o[(y - 1) * row + x] : 0, z = x >= c && y ? o[(y - 1) * row + x - c] : 0;
    let r; if (f === 0) r = v; else if (f === 1) r = v + a; else if (f === 2) r = v + u; else if (f === 3) r = v + ((a + u) >> 1); else { const q = a + u - z, pa = Math.abs(q - a), pb = Math.abs(q - u), pc = Math.abs(q - z); r = v + (pa <= pb && pa <= pc ? a : pb <= pc ? u : z); }
    o[y * row + x] = r & 255; } p += row; } return { w, h, c, o }; }
const VESI = { vari: [0xc3, 0xd5, 0xda], paperi: [0xe8, 0xd5, 0xa9] };
const tulos = [];
for (const m of L) {
  const k = K[m.id]; const r = k.piirtoRajat ?? k.rajat; const kuvaP = k.varikartta ?? k.polku; const ves = k.varikartta ? VESI.vari : VESI.paperi;
  const osuu = (p, d) => !(p.laajuus.e < r.lansi + d || p.laajuus.w > r.ita + d || p.laajuus.n < r.etela || p.laajuus.s > r.pohjoinen);
  const ehd = [];
  for (const d of [0]) for (const p of maat) if (osuu(p, d)) ehd.push({ p, d });
  const im = png(`${W}/${kuvaP}`); let meri = 0, nayt = 0, N = 0;
  for (let i = 0; i < 50; i++) for (let j = 0; j < 50; j++) {
    const lon = r.lansi + (r.ita - r.lansi) * (i + 0.5) / 50, lat = r.etela + (r.pohjoinen - r.etela) * (j + 0.5) / 50; N++;
    if (ehd.some(({ p, d }) => sisalla(lon + d, lat, p.pisteet))) continue;
    meri++; const pp = karttapiste({ ...k, kainalot: [] }, lat, lon); const x = Math.round(pp.x / 100 * (im.w - 1)), y = Math.round(pp.y / 100 * (im.h - 1));
    // 5×5 ikkunan mediaaniväri: viivat eivät häiritse
    let vesi = 0, kaikki = 0;
    for (let dx = -2; dx <= 2; dx++) for (let dy = -2; dy <= 2; dy++) { const X = Math.min(im.w - 1, Math.max(0, x + dx * 3)), Y = Math.min(im.h - 1, Math.max(0, y + dy * 3)); const q = (Y * im.w + X) * im.c;
      kaikki++; if (Math.abs(im.o[q] - ves[0]) + Math.abs(im.o[q + 1] - ves[1]) + Math.abs(im.o[q + 2] - ves[2]) < 36) vesi++; }
    if (vesi / kaikki > 0.5) nayt++;
  }
  const rivi = { id: m.id, meri_osuus: +(meri / N).toFixed(3), nakyy_vetena: meri ? +(nayt / meri).toFixed(2) : null, meri_lippu: m.meri, kuva: kuvaP };
  tulos.push(rivi); console.log(JSON.stringify(rivi));
}
writeFileSync(ULOS, JSON.stringify(tulos, null, 1));
