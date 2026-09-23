/*
 * QUANTIZED-MESH-1.0 -KIRJOITIN (Cesiumin maastolaatta, EPSG:4326 TMS).
 *
 * Muoto: https://github.com/CesiumGS/quantized-mesh (Cesiumin julkinen
 * spesifikaatio). Laatta = 88 tavun otsake (keskipiste ECEF, korkeusväli,
 * rajaava pallo, horisonttipiste), pistedata (u, v, korkeus 0…32767
 * delta- ja zigzag-koodattuna), kolmiot "high water mark" -koodattuna,
 * reunapisteiden luettelot (länsi, etelä, itä, pohjoinen) ja laajennus 1
 * (oktaedrikoodatut pistenormaalit, "octvertexnormals").
 *
 * Korkeudet ovat Copernicuksen EGM2008-korkeuksia, joita käytetään
 * ellipsoidikorkeuksina: merenpinta = ellipsoidi, kuten pallon sarjan
 * kuvissa. Ranskassa ero todelliseen on noin 45–55 m koko alueella
 * tasaisesti, joten maasto ja kuva pysyvät kohdakkain.
 */

const WGS84_A = 6378137.0;
const WGS84_B = 6356752.3142451793;
const E2 = 1 - (WGS84_B * WGS84_B) / (WGS84_A * WGS84_A);
const RAD = Math.PI / 180;

/** Maantieteellinen → ECEF (m). */
export function ecef(lon, lat, h) {
  const l = lon * RAD; const f = lat * RAD;
  const s = Math.sin(f); const c = Math.cos(f);
  const N = WGS84_A / Math.sqrt(1 - E2 * s * s);
  return [(N + h) * c * Math.cos(l), (N + h) * c * Math.sin(l), (N * (1 - E2) + h) * s];
}

const zigzag = (n) => ((n << 1) ^ (n >> 31)) & 0xffff;

/*
 * HORISONTTIPISTE (Cesiumin EllipsoidalOccluder): piste ellipsoidin
 * skaalatussa avaruudessa keskipisteen suunnassa, jonka takana koko
 * laatta on horisontin alla. Etäisyys lasketaan jokaisesta pisteestä
 * ja otetaan suurin.
 */
function horisonttipiste(pisteet, keski) {
  const sk = (p) => [p[0] / WGS84_A, p[1] / WGS84_A, p[2] / WGS84_B];
  const k = sk(keski);
  const kl = Math.hypot(...k);
  const d = [k[0] / kl, k[1] / kl, k[2] / kl];
  let suurin = 0;
  for (const p0 of pisteet) {
    const p = sk(p0);
    const mRaaka = Math.hypot(p[0], p[1], p[2]);
    const q = [p[0] / mRaaka, p[1] / mRaaka, p[2] / mRaaka];
    // Ellipsoidin alapuoliset pisteet (esim. Kuollutmeri) lasketaan pinnalle.
    const m = Math.max(1, mRaaka);
    const m2 = m * m;
    const cosA = q[0] * d[0] + q[1] * d[1] + q[2] * d[2];
    const rx = q[1] * d[2] - q[2] * d[1]; const ry = q[2] * d[0] - q[0] * d[2]; const rz = q[0] * d[1] - q[1] * d[0];
    const sinA = Math.hypot(rx, ry, rz);
    const cosB = 1 / m;
    const sinB = Math.sqrt(Math.max(0, m2 - 1)) * cosB;
    const nimittaja = cosA * cosB - sinA * sinB;
    const e = nimittaja > 1e-9 ? 1 / nimittaja : 1e9;
    if (e > suurin) suurin = e;
  }
  // Tulos jää skaalattuun avaruuteen (spesifikaatio: ellipsoid-scaled ECEF).
  return [d[0] * suurin, d[1] * suurin, d[2] * suurin];
}

/** Yksikkövektori oktaedrikoodiksi (2 tavua, Cesium AttributeCompression.octEncode). */
export function oktaKoodi([x, y, z]) {
  const l1 = Math.abs(x) + Math.abs(y) + Math.abs(z);
  let u = x / l1; let v = y / l1;
  if (z < 0) {
    const ou = u;
    u = (1 - Math.abs(v)) * (ou >= 0 ? 1 : -1);
    v = (1 - Math.abs(ou)) * (v >= 0 ? 1 : -1);
  }
  const k = (t) => Math.round((Math.max(-1, Math.min(1, t)) * 0.5 + 0.5) * 255);
  return [k(u), k(v)];
}

/**
 * Laatan tavut.
 *
 * @param {object} p
 * @param {{west:number,south:number,east:number,north:number}} p.alue asteina
 * @param {Array<[number, number, number]>} p.pisteet [u 0…1, v 0…1 (0 = etelä), korkeus m]
 * @param {Array<[number, number, number]>} p.kolmiot pisteindeksit, vastapäivään ylhäältä
 * @param {boolean} [p.normaalit] laajennus 1
 */
export function koodaaLaatta({ alue, pisteet, kolmiot, normaalit = true }) {
  // PISTEET ENSIESIINTYMISJÄRJESTYKSEEN (high water mark vaatii sen).
  const uusi = new Int32Array(pisteet.length).fill(-1);
  const jarjestys = [];
  const kolmiotUusi = kolmiot.map((t) => t.map((i) => {
    if (uusi[i] < 0) { uusi[i] = jarjestys.length; jarjestys.push(i); }
    return uusi[i];
  }));
  const P = jarjestys.map((i) => pisteet[i]);
  const n = P.length;
  let hMin = Infinity; let hMax = -Infinity;
  for (const p of P) { if (p[2] < hMin) hMin = p[2]; if (p[2] > hMax) hMax = p[2]; }
  if (!(hMax > hMin)) hMax = hMin + 1;
  const lonOf = (u) => alue.west + u * (alue.east - alue.west);
  const latOf = (v) => alue.south + v * (alue.north - alue.south);
  const xyz = P.map(([u, v, h]) => ecef(lonOf(u), latOf(v), h));
  const keski = ecef((alue.west + alue.east) / 2, (alue.south + alue.north) / 2, (hMin + hMax) / 2);
  let r = 0;
  for (const q of xyz) r = Math.max(r, Math.hypot(q[0] - keski[0], q[1] - keski[1], q[2] - keski[2]));
  const horisontti = horisonttipiste(xyz, keski);

  const iso = n > 65536;
  const koko = 88 + 4 + n * 6 + (iso ? 4 : 2) + 4 + kolmiotUusi.length * 3 * (iso ? 4 : 2)
    + 4 * 4 + n * 4 * (iso ? 4 : 2) + (normaalit ? 1 + 4 + n * 2 : 0);
  const b = Buffer.alloc(koko);
  let o = 0;
  const d = (v) => { b.writeDoubleLE(v, o); o += 8; };
  const f = (v) => { b.writeFloatLE(v, o); o += 4; };
  const u32 = (v) => { b.writeUInt32LE(v >>> 0, o); o += 4; };
  const u16 = (v) => { b.writeUInt16LE(v & 0xffff, o); o += 2; };
  keski.forEach(d); f(hMin); f(hMax); keski.forEach(d); d(r); horisontti.forEach(d);

  u32(n);
  const q = (t) => Math.max(0, Math.min(32767, Math.round(t * 32767)));
  const kvant = P.map(([u, v, h]) => [q(u), q(v), q((h - hMin) / (hMax - hMin))]);
  for (let akseli = 0; akseli < 3; akseli += 1) {
    let edellinen = 0;
    for (const k of kvant) { u16(zigzag(k[akseli] - edellinen)); edellinen = k[akseli]; }
  }
  const ind = iso ? u32 : u16;
  if (iso && o % 4) o += 4 - (o % 4);
  u32(kolmiotUusi.length);
  let korkein = 0;
  for (const t of kolmiotUusi) {
    for (const i of t) { ind(korkein - i); if (i === korkein) korkein += 1; }
  }
  const reuna = (ehto) => { const l = []; kvant.forEach((k, i) => { if (ehto(k)) l.push(i); }); u32(l.length); l.forEach(ind); };
  reuna((k) => k[0] === 0);
  reuna((k) => k[1] === 0);
  reuna((k) => k[0] === 32767);
  reuna((k) => k[1] === 32767);

  if (normaalit) {
    const nn = xyz.map(() => [0, 0, 0]);
    for (const [a, c, e] of kolmiotUusi) {
      const A = xyz[a]; const B = xyz[c]; const C = xyz[e];
      const ux = B[0] - A[0]; const uy = B[1] - A[1]; const uz = B[2] - A[2];
      const vx = C[0] - A[0]; const vy = C[1] - A[1]; const vz = C[2] - A[2];
      const nx = uy * vz - uz * vy; const ny = uz * vx - ux * vz; const nz = ux * vy - uy * vx;
      for (const i of [a, c, e]) { nn[i][0] += nx; nn[i][1] += ny; nn[i][2] += nz; }
    }
    b.writeUInt8(1, o); o += 1;
    u32(n * 2);
    nn.forEach((v, i) => {
      let l = Math.hypot(...v);
      // Tasainen (esim. meri): ellipsoidin normaali.
      if (!(l > 0)) { const p = xyz[i]; v = [p[0] / (WGS84_A ** 2), p[1] / (WGS84_A ** 2), p[2] / (WGS84_B ** 2)]; l = Math.hypot(...v); }
      const [x, y] = oktaKoodi([v[0] / l, v[1] / l, v[2] / l]);
      b.writeUInt8(x, o); b.writeUInt8(y, o + 1); o += 2;
    });
  }
  return b.subarray(0, o);
}

/** Laatan lukija testejä varten: palauttaa otsakkeen, pisteet ja kolmiot. */
export function puraLaatta(b) {
  let o = 0;
  const d = () => { const v = b.readDoubleLE(o); o += 8; return v; };
  const f = () => { const v = b.readFloatLE(o); o += 4; return v; };
  const otsake = {
    keski: [d(), d(), d()], hMin: f(), hMax: f(), pallo: [d(), d(), d(), d()], horisontti: [d(), d(), d()],
  };
  const n = b.readUInt32LE(o); o += 4;
  const akselit = [[], [], []];
  for (let a = 0; a < 3; a += 1) {
    let arvo = 0;
    for (let i = 0; i < n; i += 1) {
      const z = b.readUInt16LE(o); o += 2;
      arvo += (z >> 1) ^ (-(z & 1));
      akselit[a].push(arvo);
    }
  }
  const iso = n > 65536;
  if (iso && o % 4) o += 4 - (o % 4);
  const lue = () => { const v = iso ? b.readUInt32LE(o) : b.readUInt16LE(o); o += iso ? 4 : 2; return v; };
  const tri = b.readUInt32LE(o); o += 4;
  const kolmiot = [];
  let korkein = 0;
  for (let t = 0; t < tri; t += 1) {
    const k = [];
    for (let j = 0; j < 3; j += 1) { const c = lue(); const i = korkein - c; k.push(i); if (c === 0) korkein += 1; }
    kolmiot.push(k);
  }
  const reunat = [];
  for (let r = 0; r < 4; r += 1) { const m = b.readUInt32LE(o); o += 4; const l = []; for (let i = 0; i < m; i += 1) l.push(lue()); reunat.push(l); }
  const laajennukset = [];
  while (o < b.length) { const id = b.readUInt8(o); const pit = b.readUInt32LE(o + 1); laajennukset.push({ id, pit }); o += 5 + pit; }
  return {
    otsake,
    pisteet: akselit[0].map((u, i) => [u, akselit[1][i], akselit[2][i]]),
    kolmiot, reunat, laajennukset, loppu: o,
  };
}
