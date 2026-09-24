/*
 * PIENI GEOTIFF-LUKIJA COPERNICUS GLO-30 -RUUDUILLE (Karttaseppä 23.9.2026).
 *
 * Miksi oma eikä kirjasto: koneella ei ole GDAL:ia eikä repossa npm-
 * riippuvuuksia (package.json "ei riippuvuuksia"), ja Copernicuksen COG:t
 * ovat yhtä tarkkaa lajia: klassinen little-endian TIFF, yksi float32-
 * kanava (SampleFormat 3), DEFLATE (8 tai 32946), liukulukuprediktori 3,
 * 1024 × 1024 -ruudut ja overview-IFD:t (3600 → 1800 → 900 …; 50° N:n
 * pohjoispuolella leveys on 2400, 60°:n yli pienempi). Lukija tukee juuri
 * tätä ja kieltäytyy muusta selvällä virheellä.
 *
 * Paikka: ModelTiepoint + ModelPixelScale (GeoKey PixelIsArea: pikselin
 * vasen yläkulma; Copernicus antaa tiepointin pikselin keskelle, ks.
 * `pikselinKeskella`). Korkeudet ovat EGM2008-geoidin yläpuolella (m).
 */
import { openSync, readSync, closeSync, fstatSync } from 'node:fs';
import { inflateSync } from 'node:zlib';

const TAGIT = {
  leveys: 256, korkeus: 257, bitit: 258, pakkaus: 259, prediktori: 317,
  ruutuW: 322, ruutuH: 323, ruutuOffsetit: 324, ruutuTavut: 325, naytemuoto: 339,
  mittakaava: 33550, tiepoint: 33922, geoavaimet: 34735, nodata: 42113,
};
const TYYPIN_KOKO = { 1: 1, 2: 1, 3: 2, 4: 4, 5: 8, 7: 1, 11: 4, 12: 8, 16: 8 };

/** Tiedosto lukijaksi: lukee vain tarvitut tavualueet (NAS on hidas kokonaisille). */
function tiedostonLukija(polku) {
  const fd = openSync(polku, 'r');
  const koko = fstatSync(fd).size;
  return {
    koko,
    lue(offset, pituus) {
      const b = Buffer.allocUnsafe(pituus);
      let luettu = 0;
      while (luettu < pituus) {
        const n = readSync(fd, b, luettu, pituus - luettu, offset + luettu);
        if (n <= 0) throw new Error(`${polku}: tiedosto loppui (${offset + luettu}/${koko})`);
        luettu += n;
      }
      return b;
    },
    sulje() { closeSync(fd); },
  };
}

/** Puskurista lukija (testit). */
function puskurinLukija(b) {
  return { koko: b.length, lue: (o, n) => b.subarray(o, o + n), sulje() {} };
}

function lueArvot(lukija, tyyppi, maara, arvoOffset, otsake) {
  const koko = (TYYPIN_KOKO[tyyppi] ?? 1) * maara;
  const b = koko <= 4 ? otsake : lukija.lue(arvoOffset, koko);
  const o = 0;
  const ulos = [];
  for (let i = 0; i < maara; i += 1) {
    if (tyyppi === 3) ulos.push(b.readUInt16LE(o + i * 2));
    else if (tyyppi === 4) ulos.push(b.readUInt32LE(o + i * 4));
    else if (tyyppi === 12) ulos.push(b.readDoubleLE(o + i * 8));
    else if (tyyppi === 16) ulos.push(Number(b.readBigUInt64LE(o + i * 8)));
    else if (tyyppi === 2) return b.toString('latin1', o, o + maara).replace(/\0.*$/s, '');
    else ulos.push(b[o + i]);
  }
  return ulos;
}

/** IFD-ketju: jokainen taso { leveys, korkeus, ruutuW, ruutuH, offsetit, tavut, … }. */
function lueIfdt(lukija) {
  const alku = lukija.lue(0, 8);
  if (alku.toString('latin1', 0, 2) !== 'II' || alku.readUInt16LE(2) !== 42) {
    throw new Error('vain little-endian klassinen TIFF (II*) on tuettu');
  }
  const tasot = [];
  let ifd = alku.readUInt32LE(4);
  while (ifd) {
    const maara = lukija.lue(ifd, 2).readUInt16LE(0);
    const raaka = lukija.lue(ifd + 2, maara * 12 + 4);
    const t = {};
    for (let i = 0; i < maara; i += 1) {
      const o = i * 12;
      const tag = raaka.readUInt16LE(o);
      const tyyppi = raaka.readUInt16LE(o + 2);
      const n = raaka.readUInt32LE(o + 4);
      t[tag] = lueArvot(lukija, tyyppi, n, raaka.readUInt32LE(o + 8), raaka.subarray(o + 8, o + 12));
    }
    tasot.push({
      leveys: t[TAGIT.leveys][0], korkeus: t[TAGIT.korkeus][0],
      bitit: t[TAGIT.bitit]?.[0], pakkaus: t[TAGIT.pakkaus]?.[0] ?? 1, prediktori: t[TAGIT.prediktori]?.[0] ?? 1,
      naytemuoto: t[TAGIT.naytemuoto]?.[0] ?? 1,
      ruutuW: t[TAGIT.ruutuW]?.[0], ruutuH: t[TAGIT.ruutuH]?.[0],
      offsetit: t[TAGIT.ruutuOffsetit], tavut: t[TAGIT.ruutuTavut],
      mittakaava: t[TAGIT.mittakaava] ?? null, tiepoint: t[TAGIT.tiepoint] ?? null,
      nodata: typeof t[TAGIT.nodata] === 'string' ? Number(t[TAGIT.nodata]) : null,
    });
    ifd = raaka.readUInt32LE(maara * 12);
  }
  for (const t of tasot) {
    if (t.bitit !== 32 || t.naytemuoto !== 3) throw new Error('vain float32-korkeudet (SampleFormat 3) on tuettu');
    if (!t.ruutuW || !t.offsetit) throw new Error('vain ruudutettu TIFF on tuettu');
    if (![1, 8, 32946].includes(t.pakkaus)) throw new Error(`pakkaus ${t.pakkaus} ei ole tuettu (vain DEFLATE)`);
    if (![1, 3].includes(t.prediktori)) throw new Error(`prediktori ${t.prediktori} ei ole tuettu`);
  }
  return tasot;
}

/**
 * Liukulukuprediktorin (3) purku yhdelle ruudulle: ensin tavujen
 * vaakadifferenssi rivi kerrallaan, sitten tavutasot (big-endian:
 * ylin tavu ensin) takaisin float32:ksi.
 */
export function puraLiukulukuprediktori(tavut, w, h) {
  const rivi = w * 4;
  const ulos = new Float32Array(w * h);
  const dv = new DataView(new ArrayBuffer(4));
  for (let y = 0; y < h; y += 1) {
    const o = y * rivi;
    for (let i = 1; i < rivi; i += 1) tavut[o + i] = (tavut[o + i] + tavut[o + i - 1]) & 0xff;
    for (let x = 0; x < w; x += 1) {
      dv.setUint8(0, tavut[o + x]);
      dv.setUint8(1, tavut[o + w + x]);
      dv.setUint8(2, tavut[o + 2 * w + x]);
      dv.setUint8(3, tavut[o + 3 * w + x]);
      ulos[y * w + x] = dv.getFloat32(0, false);
    }
  }
  return ulos;
}

/**
 * Avaa ruudun. Palauttaa { tasot, alue, naytteenKorkeus(lon, lat, taso), sulje }.
 * `alue` = { lon0, lat1, dLon, dLat } tason 0 pikselin vasemmasta yläkulmasta.
 */
export function avaaGeotiff(lahde) {
  const lukija = typeof lahde === 'string' ? tiedostonLukija(lahde) : puskurinLukija(lahde);
  const tasot = lueIfdt(lukija);
  const p0 = tasot[0];
  if (!p0.mittakaava || !p0.tiepoint) throw new Error('ModelPixelScale/ModelTiepoint puuttuu');
  const [dLon, dLat] = p0.mittakaava;
  // Tiepoint (I, J, K, X, Y, Z): rasterin (I, J) = maailman (X, Y).
  const [I, J, , X, Y] = p0.tiepoint;
  const alue = { lon0: X - I * dLon, lat1: Y + J * dLat, dLon, dLat, leveys: p0.leveys, korkeus: p0.korkeus };
  const valimuisti = new Map();
  const ruutu = (ti, rx, ry) => {
    const t = tasot[ti];
    const sarakkeita = Math.ceil(t.leveys / t.ruutuW);
    const k = ry * sarakkeita + rx;
    const avain = `${ti}/${k}`;
    let d = valimuisti.get(avain);
    if (d) return d;
    const raaka = lukija.lue(t.offsetit[k], t.tavut[k]);
    const tavut = t.pakkaus === 1 ? Buffer.from(raaka) : inflateSync(raaka);
    d = t.prediktori === 3
      ? puraLiukulukuprediktori(tavut, t.ruutuW, t.ruutuH)
      : new Float32Array(tavut.buffer.slice(tavut.byteOffset, tavut.byteOffset + tavut.length));
    if (valimuisti.size > 24) valimuisti.delete(valimuisti.keys().next().value);
    valimuisti.set(avain, d);
    return d;
  };
  /** Pikselin arvo tasolla ti (rajattu reunoihin). */
  const pikseli = (ti, px, py) => {
    const t = tasot[ti];
    const x = Math.max(0, Math.min(t.leveys - 1, px));
    const y = Math.max(0, Math.min(t.korkeus - 1, py));
    const d = ruutu(ti, Math.floor(x / t.ruutuW), Math.floor(y / t.ruutuH));
    const v = d[(y % t.ruutuH) * t.ruutuW + (x % t.ruutuW)];
    return (t.nodata !== null && v === t.nodata) || !Number.isFinite(v) ? 0 : v;
  };
  return {
    tasot: tasot.map((t) => ({ leveys: t.leveys, korkeus: t.korkeus })),
    alue,
    /**
     * Korkeus (m) pisteessä bilineaarisesti tasolta `ti` (0 = tarkin).
     * Pikselin keskipiste on (i + 0,5) · askel vasemmasta yläkulmasta.
     */
    korkeus(lon, lat, ti = 0) {
      const t = tasot[ti];
      const sx = t.leveys / alue.leveys;
      const sy = t.korkeus / alue.korkeus;
      const fx = ((lon - alue.lon0) / alue.dLon) * sx - 0.5;
      const fy = ((alue.lat1 - lat) / alue.dLat) * sy - 0.5;
      const x0 = Math.floor(fx); const y0 = Math.floor(fy);
      const ax = fx - x0; const ay = fy - y0;
      const a = pikseli(ti, x0, y0); const b = pikseli(ti, x0 + 1, y0);
      const c = pikseli(ti, x0, y0 + 1); const d = pikseli(ti, x0 + 1, y0 + 1);
      return (a * (1 - ax) + b * ax) * (1 - ay) + (c * (1 - ax) + d * ax) * ay;
    },
    /** Tason pikselikoko asteina (lon), overview-valintaan. */
    pikselinAsteet(ti) { return alue.dLon * (alue.leveys / tasot[ti].leveys); },
    sulje() { lukija.sulje(); valimuisti.clear(); },
  };
}

