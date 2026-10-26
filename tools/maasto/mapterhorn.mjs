/*
 * MAPTERHORN-LÄHDE MAASTOLAATOILLE (Karttaseppä 12.10.2026, PT erä 184:
 * vuoristokerros Alpeille ja Norjaan; PT 12.10.: Mapterhorn on Euroopan maan
 * korkeuslähde, GLO-30 varalla).
 *
 * Mapterhorn (mapterhorn.com) jakaa kansallisia laserkeilattuja maanpintamalleja
 * (Sveitsi swissALTI3D, Norja Kartverket 1 m …) Web Mercator -laattoina
 * (terrarium-webp, 512 px). Nodessa ei ole webp-purkua eikä repossa
 * riippuvuuksia, joten laatat puretaan ensin Pythonilla raakamuotoon
 * (T7 vesimaski/mapterhorn-raa.py):
 *
 *   <kansio>/<z>/<x>_<y>.u16.gz  — 512 × 512 little-endian uint16,
 *                                 arvo = (h + 1000) × 10, 0 = ei dataa
 *
 * Korkeudet ovat kansallisissa korkeusjärjestelmissä (NN2000, LHN95 …), jotka
 * ovat EGM2008:n tasolla alle metrin tarkkuudella — samassa järjestelmässä
 * kuin GLO-30, jota tee-maasto.mjs käyttää muualla. Ellipsoidimuunnosta ei
 * tehdä, kuten ei maailmanmaastossakaan.
 *
 * Lähde täyttää saman rajapinnan kuin demHakemisto / kaksiLahdetta
 * (tee-maasto.mjs): korkeus(lon, lat, vali), naytteistin, onRuutu, asetaLru,
 * sulje. Kun Mapterhorn-laattaa ei ole tai pikseli on tyhjä, korkeus luetaan
 * varalähteestä (GLO-30/GLO-90), joten alueen reunat eivät putoa 0 m:iin.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { gunzipSync } from 'node:zlib';

export const MAPTERHORN_MAININTA = 'Korkeus: Mapterhorn (mapterhorn.com) kansallisista avoimista maanpintamalleista (mm. swisstopo swissALTI3D, Kartverket CC BY 4.0); lähteet LAHTEET.md.';
const KOKO = 512;

/** Web Mercator -laattakoordinaatit (liukuluku) tasolla z. */
export function mercatorLaatta(lon, lat, z) {
  const n = 2 ** z;
  const r = (lat * Math.PI) / 180;
  return [((lon + 180) / 360) * n, ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * n];
}

/** Raakalaatta korkeuksiksi (Float32Array 512², NaN = ei dataa). */
export function puraRaaka(tavut) {
  const u = gunzipSync(tavut);
  if (u.length !== KOKO * KOKO * 2) throw new Error(`mapterhorn: raakalaatan koko ${u.length}, odotettiin ${KOKO * KOKO * 2}`);
  const h = new Float32Array(KOKO * KOKO);
  for (let i = 0; i < h.length; i += 1) {
    const v = u.readUInt16LE(i * 2);
    h[i] = v === 0 ? NaN : v / 10 - 1000;
  }
  return h;
}

/**
 * Kansio lähteeksi. `vara` = toinen lähde (sama rajapinta) tai null (0 m).
 * `lukija` on testejä varten (polku → tavut).
 */
export function mapterhornLahde(kansio, { z = 14, vara = null, lru = 64, lukija = readFileSync } = {}) {
  const laatat = new Map();
  const taso = join(kansio, String(z));
  for (const f of existsSync(taso) ? readdirSync(taso) : []) {
    const m = /^(\d+)_(\d+)\.u16\.gz$/.exec(f);
    if (m) laatat.set(`${m[1]},${m[2]}`, join(taso, f));
  }
  const auki = new Map();
  let koko = lru;
  const laatta = (x, y) => {
    const avain = `${x},${y}`;
    if (auki.has(avain)) { const h = auki.get(avain); auki.delete(avain); auki.set(avain, h); return h; }
    const polku = laatat.get(avain);
    const h = polku ? puraRaaka(lukija(polku)) : null;
    auki.set(avain, h);
    while (auki.size > koko) auki.delete(auki.keys().next().value);
    return h;
  };
  /* Pikselin arvo (tx, ty laatta, px, py pikseli; ylivuoto naapurilaattaan). */
  const pikseli = (tx, ty, px, py) => {
    let x = tx; let y = ty; let i = px; let j = py;
    if (i >= KOKO) { x += 1; i -= KOKO; } else if (i < 0) { x -= 1; i += KOKO; }
    if (j >= KOKO) { y += 1; j -= KOKO; } else if (j < 0) { y -= 1; j += KOKO; }
    const h = laatta(x, y);
    return h ? h[j * KOKO + i] : NaN;
  };
  const oma = (lon, lat) => {
    const [fx, fy] = mercatorLaatta(lon, lat, z);
    const tx = Math.floor(fx); const ty = Math.floor(fy);
    if (!laatat.has(`${tx},${ty}`)) return NaN;
    const px = (fx - tx) * KOKO - 0.5; const py = (fy - ty) * KOKO - 0.5;
    const i0 = Math.floor(px); const j0 = Math.floor(py); const ax = px - i0; const ay = py - j0;
    const a = pikseli(tx, ty, i0, j0); const b = pikseli(tx, ty, i0 + 1, j0);
    const c = pikseli(tx, ty, i0, j0 + 1); const d = pikseli(tx, ty, i0 + 1, j0 + 1);
    // Reunalla (naapurilaatta puuttuu) lähin olemassa oleva arvo bilineaarisen sijaan.
    if ([a, b, c, d].some(Number.isNaN)) {
      const lahin = pikseli(tx, ty, Math.round(px), Math.round(py));
      return Number.isNaN(lahin) ? [a, b, c, d].find((v) => !Number.isNaN(v)) ?? NaN : lahin;
    }
    return (a * (1 - ax) + b * ax) * (1 - ay) + (c * (1 - ax) + d * ax) * ay;
  };
  const korkeus = (lon, lat, vali) => {
    const h = oma(lon, lat);
    if (!Number.isNaN(h)) return h;
    return vara ? vara.korkeus(lon, lat, vali) : 0;
  };
  return {
    laattoja: laatat.size,
    ruutuja: vara?.ruutuja ?? 0,
    onRuutu: (lat, lon) => Boolean(vara?.onRuutu(lat, lon)),
    /** Onko kohdassa Mapterhornin dataa (testit ja tarkistus). */
    onOma: (lon, lat) => !Number.isNaN(oma(lon, lat)),
    korkeus,
    naytteistin: (lat, lon, vali) => (x, y) => korkeus(x, y, vali),
    asetaLru(n) { koko = Math.max(lru, n); vara?.asetaLru(n); },
    sulje() { auki.clear(); vara?.sulje(); },
  };
}
