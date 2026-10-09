import { fromFile } from 'geotiff';
import fs from 'node:fs';
const S = JSON.parse(fs.readFileSync('/Users/Shared/Claude/proto-3d/_valmiit/giza-v2/glb/sijainnit.json', 'utf8')).kohteet;
const lue = async (p, bb) => { const im = await (await fromFile(p)).getImage(), [x0, y0, x1, y1] = im.getBoundingBox(), w = im.getWidth(), h = im.getHeight(), rx = (x1 - x0) / w, ry = (y1 - y0) / h;
  const c0 = Math.floor((bb[0] - x0) / rx) - 2, c1 = Math.ceil((bb[2] - x0) / rx) + 2, r0 = Math.floor((y1 - bb[3]) / ry) - 2, r1 = Math.ceil((y1 - bb[1]) / ry) + 2, [d] = await im.readRasters({ window: [c0, r0, c1, r1] }), W = c1 - c0;
  return (lon, lat) => { const x = (lon - x0) / rx - 0.5 - c0, y = (y1 - lat) / ry - 0.5 - r0, a = Math.floor(x), b = Math.floor(y), fx = x - a, fy = y - b, v = (i, j) => d[j * W + i]; return (v(a, b) * (1 - fx) + v(a + 1, b) * fx) * (1 - fy) + (v(a, b + 1) * (1 - fx) + v(a + 1, b + 1) * fx) * fy; }; };
const bb = [31.12, 29.96, 31.15, 29.99];
const N = await lue('lahteet/us_nga_egm08_25.tif', bb), G = await lue('/Volumes/NAS-Homes/koodaus/Claude/Matkakirja-arkisto/dem/copernicus-glo30/Copernicus_DSM_COG_10_N29_00_E031_00_DEM.tif', bb);
const mLat = 110850, tulos = {};
for (const [k, o] of Object.entries(S)) {
  const L = o.leikkaus, lat0 = L.reduce((s, p) => s + p[0], 0) / 4, lon0 = L.reduce((s, p) => s + p[1], 0) / 4, cl = Math.cos(lat0 * Math.PI / 180), mLon = 111320 * cl;
  const q = L.map(([la, lo]) => [(lo - lon0) * mLon, (la - lat0) * mLat]); // ENU-kulmat
  const rengas = (dd) => { const nayt = [];
  for (const d of dd) for (let i = 0; i < 4; i++) { const a = q[i], b = q[(i + 1) % 4], ex = b[0] - a[0], ey = b[1] - a[1], L2 = Math.hypot(ex, ey), nx = ey / L2, ny = -ex / L2; // ulkonormaali (myötäpäivään NE→SE→SW→NW)
    for (let t = 0; t <= L2; t += 10) { const x = a[0] + ex * t / L2 + nx * d, y = a[1] + ey * t / L2 + ny * d; nayt.push(G(lon0 + x / mLon, lat0 + y / mLat)); } }
  nayt.sort((x, y) => x - y); const med = nayt[nayt.length >> 1], mad = [...nayt.map((v) => Math.abs(v - med))].sort((x, y) => x - y)[nayt.length >> 1], ka = nayt.reduce((s, v) => s + v, 0) / nayt.length, sd = Math.sqrt(nayt.reduce((s, v) => s + (v - ka) ** 2, 0) / nayt.length);
  return { mediaani_egm2008_m: +med.toFixed(2), mad_m: +mad.toFixed(2), keskihajonta_m: +sd.toFixed(2), p10: +nayt[Math.floor(nayt.length * 0.1)].toFixed(2), p90: +nayt[Math.floor(nayt.length * 0.9)].toFixed(2), naytteita: nayt.length }; };
  const r1 = rengas([5, 10, 15, 20]), r2 = rengas([40, 50, 60]), r3 = rengas([70, 85, 100]);
  const n = N(o.lon ?? lon0, o.lat ?? lat0);
  tulos[k] = { piste: [+(o.lat ?? lat0).toFixed(6), +(o.lon ?? lon0).toFixed(6)], geoidi_N_egm2008_m: +n.toFixed(3), glo30_rengas_5_20m: r1, glo30_rengas_40_60m: r2, glo30_rengas_70_100m: r3,
    ellipsoidikorkeus_m_rengas_40_60: +(r2.mediaani_egm2008_m + n).toFixed(2), vanha: { korkeus_egm2008: o.korkeus_egm2008, ellipsoidi_arvio: o.korkeus_ellipsoidi_arvio }, ero_vanhaan_ellipsoidiin_m_40_60: o.korkeus_ellipsoidi_arvio ? +((r2.mediaani_egm2008_m + n) - o.korkeus_ellipsoidi_arvio).toFixed(2) : null };
}
for (const [k, t] of Object.entries(tulos)) console.log(k, 'N', t.geoidi_N_egm2008_m, '| 5–20', t.glo30_rengas_5_20m.mediaani_egm2008_m, '| 40–60', t.glo30_rengas_40_60m.mediaani_egm2008_m, '±', t.glo30_rengas_40_60m.mad_m, '| 70–100', t.glo30_rengas_70_100m.mediaani_egm2008_m, '±', t.glo30_rengas_70_100m.mad_m, '| vanha egm', t.vanha.korkeus_egm2008, '| ell 40–60', t.ellipsoidikorkeus_m_rengas_40_60, 'ero', t.ero_vanhaan_ellipsoidiin_m_40_60);
fs.writeFileSync('/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/giza-korkeudet-20261009.json', JSON.stringify({ lahde: 'Copernicus GLO-30 (N29 E031), NGA EGM2008 2,5′ (PROJ us_nga_egm08_25); ei Googlea', menetelma: 'renkaat 5–20, 40–60 ja 70–100 m leikkausnelikulmion (jalanjälki + 4 m) ulkopuolella, näytteet 10 m:n välein, bilineaarinen. 5–20 m on harhainen ylös (GLO-30:n 30 m ruutu sekoittaa pyramidin rinteen); suositus 40–60 m.', fabdem: 'ei käytetty: lisenssi CC BY-NC-SA 4.0 (ei kaupallinen)', kohteet: tulos }, null, 1));
