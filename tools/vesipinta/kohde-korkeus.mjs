// Kohteen maan ellipsoidikorkeus (LS2/LR 9.10.): rengas 5–20 m jalanjäljen ulkopuolella + lähiruudun rajaus (2 m) kohteen ympäriltä.
// Käyttö: node kohde-korkeus.mjs <jalanjalki.geojson> <ulos-etuliite> <sivu_m> [kohde-nimi]
import fs from 'node:fs';
import { fromFile } from 'geotiff';
import { PNG } from 'pngjs';
const [JP, ULOS, SIVU = '600', NIMI = ''] = process.argv.slice(2);
const J = JSON.parse(fs.readFileSync(JP, 'utf8')).features[0].geometry.coordinates[0][0]; // [lon,lat]
const lat0 = J.reduce((s, p) => s + p[1], 0) / J.length, lon0 = J.reduce((s, p) => s + p[0], 0) / J.length, cl = Math.cos(lat0 * Math.PI / 180), mLat = 111400, mLon = 111320 * cl;
const q = J.map(([lo, la]) => [(lo - lon0) * mLon, (la - lat0) * mLat]);
const sis = (x, y) => { let c = false; for (let i = 0, j = q.length - 1; i < q.length; j = i++) { const [xi, yi] = q[i], [xj, yj] = q[j]; if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c; } return c; };
const et = (x, y) => { let m = 1e9; for (let i = 1; i < q.length; i++) { const [ax, ay] = q[i - 1], [bx, by] = q[i], dx = bx - ax, dy = by - ay, L = dx * dx + dy * dy || 1e-9, t = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / L)); m = Math.min(m, Math.hypot(ax + t * dx - x, ay + t * dy - y)); } return m; };
const lue = async (p, bb) => { const im = await (await fromFile(p)).getImage(), [x0, y0, x1, y1] = im.getBoundingBox(), w = im.getWidth(), h = im.getHeight(), rx = (x1 - x0) / w, ry = (y1 - y0) / h;
  const c0 = Math.floor((bb[0] - x0) / rx) - 2, c1 = Math.ceil((bb[2] - x0) / rx) + 2, r0 = Math.floor((y1 - bb[3]) / ry) - 2, r1 = Math.ceil((y1 - bb[1]) / ry) + 2, [d] = await im.readRasters({ window: [c0, r0, c1, r1] }), W = c1 - c0;
  return (lon, lat) => { const x = (lon - x0) / rx - 0.5 - c0, y = (y1 - lat) / ry - 0.5 - r0, a = Math.floor(x), b = Math.floor(y), fx = x - a, fy = y - b, v = (i, j) => d[j * W + i]; return (v(a, b) * (1 - fx) + v(a + 1, b) * fx) * (1 - fy) + (v(a, b + 1) * (1 - fx) + v(a + 1, b + 1) * fx) * fy; }; };
const bb = [lon0 - 0.01, lat0 - 0.01, lon0 + 0.01, lat0 + 0.01];
const G = await lue('/Volumes/NAS-Homes/koodaus/Claude/Matkakirja-arkisto/dem/copernicus-glo30/Copernicus_DSM_COG_10_N59_00_E018_00_DEM.tif', bb);
const NE = await lue('lahteet/us_nga_egm08_25.tif', bb), NS = await lue('lahteet/se_lantmateriet_SWEN17_RH2000.tif', bb);
// korkeus-tukholma-lahi (ellipsoidi, GLO-30 + OSM-rakennukset)
const KJ = JSON.parse(fs.readFileSync('korkeus/korkeus-tukholma.json', 'utf8')), O = KJ.osat.find((o) => o.osa === 'lahi'), kp = PNG.sync.read(fs.readFileSync('korkeus/' + O.tiedosto), { skipRescale: true }), KW = O.koko[0], KH = O.koko[1], kan = kp.data.length / (KW * KH);
const kc = Math.cos(KJ.origo.lat * Math.PI / 180), lahi = (lon, lat) => { const x = (lon - KJ.origo.lon) * 111320 * kc, y = (lat - KJ.origo.lat) * 111400, i = Math.floor((x - O.kulma.x) / O.ruutu_m), r = KH - 1 - Math.floor((y - O.kulma.y) / O.ruutu_m); const v = kp.data[(r * KW + i) * kan]; return v ? O.pohja_m + v / 10 : NaN; };
const g = [], l = [], sek = { pohjoinen: [], ita: [], etela: [], lansi: [] };
for (let y = -90; y <= 90; y += 2) for (let x = -90; x <= 90; x += 2) { if (sis(x, y)) continue; const d = et(x, y); if (d < 5 || d > 20) continue; const lo = lon0 + x / mLon, la = lat0 + y / mLat; const gv = G(lo, la); g.push(gv); const kul = Math.atan2(y, x) * 180 / Math.PI; (kul > 45 && kul <= 135 ? sek.pohjoinen : kul > -45 && kul <= 45 ? sek.ita : kul > -135 && kul <= -45 ? sek.etela : sek.lansi).push(gv); const v = lahi(lo, la); if (Number.isFinite(v)) l.push(v); }
const st = (a) => { a.sort((x, y) => x - y); const m = a[a.length >> 1], ka = a.reduce((s, v) => s + v, 0) / a.length; return { mediaani: +m.toFixed(2), p10: +a[Math.floor(a.length * 0.1)].toFixed(2), keskihajonta: +Math.sqrt(a.reduce((s, v) => s + (v - ka) ** 2, 0) / a.length).toFixed(2), n: a.length }; };
const ne = NE(lon0, lat0), ns = NS(lon0, lat0), sg = st(g), sl = st(l);
const tulos = { kohde: NIMI, jalanjaljen_keskipiste: [+lat0.toFixed(7), +lon0.toFixed(7)], geoidi: { EGM2008_N: +ne.toFixed(3), SWEN17_N: +ns.toFixed(3) },
  glo30_rengas_5_20m_egm2008: sg, ellipsoidi_glo30_p10: +(sg.p10 + ne).toFixed(2), ellipsoidi_glo30_mediaani: +(sg.mediaani + ne).toFixed(2), korkeus_tukholma_lahi_rengas_ellipsoidi: sl,
  glo30_sivuittain_egm2008: Object.fromEntries(Object.entries(sek).filter(([, a]) => a.length).map(([k, a]) => [k, st(a)])),
  huom: 'GLO-30 on pintamalli (30 m), rengas osuu naapurirakennuksiin ja Riddarfjärdenin rantaan; p10 lähinnä maata. Lantmäterietin laser tarkentaisi (Geotorget-tunnus).' };
// lähiruudun rajaus SIVU × SIVU m jalanjäljen keskeltä (png16 dm + pohja kuten korkeus-*.png; ellipsoidi)
{ const n = Math.round(+SIVU / O.ruutu_m), png = new PNG({ width: n, height: n, bitDepth: 16, colorType: 0, inputColorType: 0, inputHasAlpha: false }), d16 = new Uint16Array(n * n);
  for (let r = 0; r < n; r++) for (let i = 0; i < n; i++) { const x = (i + 0.5) * O.ruutu_m - +SIVU / 2, y = +SIVU / 2 - (r + 0.5) * O.ruutu_m, v = lahi(lon0 + x / mLon, lat0 + y / mLat); d16[r * n + i] = Number.isFinite(v) ? Math.max(1, Math.round((v - O.pohja_m) * 10)) : 0; }
  png.data = Buffer.from(d16.buffer); fs.writeFileSync(ULOS + '-korkeus-2m.png', PNG.sync.write(png, { bitDepth: 16, colorType: 0, inputColorType: 0, inputHasAlpha: false }));
  tulos.lahiruutu = { tiedosto: ULOS.split('/').pop() + '-korkeus-2m.png', sivu_m: +SIVU, px: n, m_per_px: O.ruutu_m, keskipiste: [lat0, lon0], arvo: 'ellipsoidikorkeus = pohja_m + arvo/10 (dm), 0 = ei dataa; ylin rivi pohjoisin', pohja_m: O.pohja_m, lahde: 'korkeus-tukholma-lahi (GLO-30 + OSM-rakennusten korkeudet), karkea' }; }
fs.writeFileSync(ULOS + '-maankorkeus.json', JSON.stringify(tulos, null, 1)); console.log(JSON.stringify(tulos, null, 1));
