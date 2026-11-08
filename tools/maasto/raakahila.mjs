/*
 * RAAKAHILALÄHDE (Karttaseppä 8.11.2026, kohokartan 3D-merenpohja, PT:n erä osa 1).
 *
 * Koko maailman säännöllinen korkeushila (int16, metriä = arvo / jakaja) pyramideineen DEM-lähteeksi
 * tee-maasto.mjs:lle (`--raaka <hila.json>`). Kohokartan oma maastosarja tehdään samasta 15″-kentästä kuin
 * kohokartan v6-värit: maa Copernicus GLO-90 (> 0 m), muualla min(0, NOAA ETOPO 2022 15″), syvyys silotettu 6 km
 * (proto-3d/_tyo/karttaseppa/kohokartta-20261107/maailma/tee-3d15.py).
 *
 * Metatiedot (JSON): { latN, lonW, res (asteina), rivit, sarakkeet, jakaja? (oletus 2), kierto (pituusaste kiertää),
 *   tasot: [{ kerroin, polku (suhteessa JSONiin), rivit, sarakkeet }] }. Rivi 0 = latN (pikselin yläreuna),
 *   sarake 0 = lonW; pikselin keskipiste (r + 0,5, c + 0,5).
 *
 * Näyte luetaan bilineaarisesti tasolta, jonka pikseli (res × kerroin) on enintään näyteväli (kuten geotiff.mjs:n
 * overview-valinta), joten karkea taso ei laskostu. Sama koordinaatti ja sama taso → sama arvo kaikissa laatoissa:
 * naapurilaattojen reunat täsmäävät. Lohkot (256 × 256) luetaan levyltä tarvittaessa pieneen LRU:hun.
 */
import { closeSync, openSync, readFileSync, readSync } from 'node:fs';
import { dirname, join } from 'node:path';

export const RAAKA_MAININTA = 'Seafloor: NOAA NCEI ETOPO 2022 15 arc-second Global Relief Model (public domain).';

/** Taso, jonka pikseli on enintään `vali` (asteina); hienoin, jos mikään ei ole. */
export function valitseTaso(tasot, res, vali) {
  let paras = tasot[0];
  for (const t of tasot) if (res * t.kerroin <= vali * (1 + 1e-9) && t.kerroin > paras.kerroin) paras = t;
  return paras;
}

/**
 * @param {object} meta metatiedot (ks. yllä)
 * @param {(t: object) => (r: number, c: number) => number} lukija tason solulukija (raaka int16-arvo)
 */
export function hilaLahde(meta, lukija) {
  const { latN, lonW, res, kierto = true } = meta;
  const jakaja = meta.jakaja ?? 2;
  const tasot = [...meta.tasot].sort((p, q) => p.kerroin - q.kerroin)
    .map((t) => ({ ...t, solu: lukija(t), pikseli: res * t.kerroin }));
  let viimeVali = NaN; let viimeTaso = null;
  const taso = (vali) => {
    if (vali !== viimeVali) { viimeVali = vali; viimeTaso = valitseTaso(tasot, res, vali); }
    return viimeTaso;
  };
  const korkeus = (lon, lat, vali) => {
    const t = taso(vali);
    const ry = Math.min(t.rivit - 1, Math.max(0, (latN - lat) / t.pikseli - 0.5));
    const cx = (lon - lonW) / t.pikseli - 0.5;
    const r0 = Math.min(t.rivit - 2, Math.floor(ry)); const fy = ry - r0;
    let c0 = Math.floor(cx); const fx = cx - c0;
    let c1 = c0 + 1;
    if (kierto) { c0 = ((c0 % t.sarakkeet) + t.sarakkeet) % t.sarakkeet; c1 = (c0 + 1) % t.sarakkeet; } else {
      c0 = Math.min(t.sarakkeet - 1, Math.max(0, c0)); c1 = Math.min(t.sarakkeet - 1, Math.max(0, c1));
    }
    const a = t.solu(r0, c0); const b = t.solu(r0, c1); const c = t.solu(r0 + 1, c0); const d = t.solu(r0 + 1, c1);
    return ((a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy) / jakaja;
  };
  return {
    ruutuja: 1,
    /* Hila kattaa koko maailman: jokainen 1°-ruutu "on olemassa" (meri on dataa, ei puuttuva ruutu). */
    onRuutu: () => true,
    asetaLru() {},
    korkeus,
    naytteistin: (lat, lon, vali) => (x, y) => korkeus(x, y, vali),
    sulje() { for (const t of tasot) t.solu.sulje?.(); },
  };
}

/** Levyltä luettava hila: `<hila.json>` → DEM-lähde (tee-maasto.mjs:n rajapinta). */
export function raakaHila(jsonPolku, { lohko = 256, lru = 512, kokonaanAlle = 64e6 } = {}) {
  const meta = JSON.parse(readFileSync(jsonPolku, 'utf8'));
  const kansio = dirname(jsonPolku);
  const lukija = (t) => {
    const polku = join(kansio, t.polku);
    if (t.rivit * t.sarakkeet * 2 <= kokonaanAlle) {
      const b = readFileSync(polku);
      const v = new Int16Array(b.buffer, b.byteOffset, t.rivit * t.sarakkeet);
      const solu = (r, c) => v[r * t.sarakkeet + c];
      return solu;
    }
    const fd = openSync(polku, 'r');
    const lohkot = new Map();
    const lohkoja = Math.ceil(t.sarakkeet / lohko);
    const lue = (br, bc) => {
      const r0 = br * lohko; const c0 = bc * lohko;
      const h = Math.min(lohko, t.rivit - r0); const w = Math.min(lohko, t.sarakkeet - c0);
      const b = Buffer.alloc(lohko * lohko * 2);
      for (let i = 0; i < h; i += 1) readSync(fd, b, i * lohko * 2, w * 2, ((r0 + i) * t.sarakkeet + c0) * 2);
      return new Int16Array(b.buffer, b.byteOffset, lohko * lohko);
    };
    let viimeAvain = -1; let viime = null;
    const solu = (r, c) => {
      const br = Math.floor(r / lohko); const bc = Math.floor(c / lohko);
      const avain = br * lohkoja + bc;
      if (avain !== viimeAvain) {
        let l = lohkot.get(avain);
        if (l) { lohkot.delete(avain); lohkot.set(avain, l); } else {
          l = lue(br, bc); lohkot.set(avain, l);
          if (lohkot.size > lru) lohkot.delete(lohkot.keys().next().value);
        }
        viimeAvain = avain; viime = l;
      }
      return viime[(r - br * lohko) * lohko + (c - bc * lohko)];
    };
    solu.sulje = () => closeSync(fd);
    return solu;
  };
  return hilaLahde(meta, lukija);
}
