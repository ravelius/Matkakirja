/*
 * ETOPO 2022 15″ GEOTIFF-LÄHDELAATAT NOAA:N SUORASTA LATAUKSESTA (Karttaseppä 15.10.2026).
 *
 * MIKSI. NOAA:n robots.txt (www.ngdc.noaa.gov) kieltää kaikilta
 * käyttäjäagenteilta polun /thredds/ — eli juuri sen NCSS- ja
 * OPeNDAP-reitin, jota tee-reliefipyramidi.mjs käytti. Sama aineisto
 * on ladattavissa sallitusta polusta /mgg/global/relief/ETOPO2022/
 * kokonaisina 15°:n GeoTIFF-laattoina. robots.txt pyytää 60 sekunnin
 * väliä pyyntöjen välillä (Crawl-delay: 60), joten jokainen laatta
 * ladataan KERRAN pysyvään kansioon ja luetaan sieltä ikkunoina.
 * Koko maailma on 288 laattaa (≈ 25 Mt kpl) eli noin viisi tuntia
 * ensimmäisellä kerralla; sen jälkeen ei yhtään pyyntöä.
 *
 * MUOTO (mitattu laatasta N45E000): 3600 × 3600 float32, DEFLATE
 * (Compression 8), liukulukuennustin (Predictor 3), 256 × 256 -palat,
 * PixelIsArea, luoteisnurkka = laatan nimi (N45E000: lat 45, lon 0),
 * rivi 0 = pohjoisin. Lukija on tässä itse, jotta repo ei saa uutta
 * riippuvuutta: zlib on Noden oma.
 */
import { existsSync, mkdirSync, openSync, readSync, closeSync, statSync, writeFileSync, renameSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { inflateSync } from 'node:zlib';

export const GTIF_URL = 'https://www.ngdc.noaa.gov/mgg/global/relief/ETOPO2022/data/15s/15s_surface_elev_gtif'
  + '/ETOPO_2022_v1_15s_%TILE%_surface.tif';
/** robots.txt: Crawl-delay 60 (www.ngdc.noaa.gov). */
export const LATAUSVALI_MS = 60_000;

const nuku = (ms) => new Promise((valmis) => { setTimeout(valmis, ms); });

/**
 * Lähdelaatta paikallisesta kansiosta, tarvittaessa ladattuna. Edellisen
 * latauksen hetki pidetään kansiossa (viimeisin-lataus.json), jotta väli
 * pätee myös peräkkäisten ajojen välillä.
 */
export async function gtifLaatta(laatta, kansio, { loki = console.log, aikakatkoMs = 600_000 } = {}) {
  mkdirSync(kansio, { recursive: true });
  const polku = join(kansio, `ETOPO_2022_v1_15s_${laatta}_surface.tif`);
  if (existsSync(polku) && statSync(polku).size > 0) return polku;
  const kello = join(kansio, 'viimeisin-lataus.json');
  const edellinen = existsSync(kello) ? JSON.parse(readFileSync(kello, 'utf8')).ms : 0;
  const odota = edellinen + LATAUSVALI_MS - Date.now();
  if (odota > 0) { loki(`  odotetaan ${Math.ceil(odota / 1000)} s (NOAA robots.txt: Crawl-delay 60)`); await nuku(odota); }
  writeFileSync(kello, JSON.stringify({ ms: Date.now(), laatta }));
  const url = GTIF_URL.replace('%TILE%', laatta);
  const v = await fetch(url, { signal: AbortSignal.timeout(aikakatkoMs) });
  if (v.status === 404) return null; // ei laattaa (ETOPO kattaa koko maapallon, mutta varaudutaan)
  if (!v.ok) throw new Error(`ETOPO GeoTIFF ${laatta}: HTTP ${v.status}`);
  const buf = Buffer.from(await v.arrayBuffer());
  writeFileSync(`${polku}.osa`, buf); renameSync(`${polku}.osa`, polku);
  loki(`  ladattu ${laatta} (${(buf.length / 1e6).toFixed(1)} Mt)`);
  return polku;
}

/* ------------------------------------------------ TIFF-lukija (vain tämä muoto) */

const TYYPIN_KOKO = { 1: 1, 2: 1, 3: 2, 4: 4, 5: 8, 11: 4, 12: 8, 16: 8 };

/** Klassisen little-endian TIFFin ensimmäinen IFD: { tunniste: arvot[] }. */
function lueIfd(fd) {
  const h = Buffer.alloc(8); readSync(fd, h, 0, 8, 0);
  if (h.toString('latin1', 0, 2) !== 'II' || h.readUInt16LE(2) !== 42) throw new Error('vain klassinen little-endian TIFF');
  const ifd = h.readUInt32LE(4);
  const n = Buffer.alloc(2); readSync(fd, n, 0, 2, ifd);
  const m = n.readUInt16LE(0); const e = Buffer.alloc(m * 12); readSync(fd, e, 0, m * 12, ifd + 2);
  const t = {};
  for (let i = 0; i < m; i++) {
    const o = i * 12, tag = e.readUInt16LE(o), tyyppi = e.readUInt16LE(o + 2), lkm = e.readUInt32LE(o + 4), koko = (TYYPIN_KOKO[tyyppi] ?? 1) * lkm;
    let b = e.subarray(o + 8, o + 12);
    if (koko > 4) { b = Buffer.alloc(koko); readSync(fd, b, 0, koko, e.readUInt32LE(o + 8)); }
    const arvot = [];
    for (let k = 0; k < lkm; k++) {
      if (tyyppi === 3) arvot.push(b.readUInt16LE(k * 2));
      else if (tyyppi === 4) arvot.push(b.readUInt32LE(k * 4));
      else if (tyyppi === 12) arvot.push(b.readDoubleLE(k * 8));
      else if (tyyppi === 16) arvot.push(Number(b.readBigUInt64LE(k * 8)));
      else arvot.push(b[k]);
    }
    t[tag] = arvot;
  }
  return t;
}

/** Yksi pala: inflate + liukulukuennustimen purku (Predictor 3) → Float32Array (rivit pohjoisesta). */
function puraPala(raaka, tw, th) {
  const b = inflateSync(raaka);
  const rivi = tw * 4, out = new Float32Array(tw * th), dv = new DataView(out.buffer);
  for (let y = 0; y < th; y++) {
    const r = b.subarray(y * rivi, (y + 1) * rivi);
    for (let i = 1; i < rivi; i++) r[i] = (r[i] + r[i - 1]) & 0xff; // tavuerotus auki
    for (let x = 0; x < tw; x++) dv.setUint8((y * tw + x) * 4 + 3, r[x]), dv.setUint8((y * tw + x) * 4 + 2, r[tw + x]),
      dv.setUint8((y * tw + x) * 4 + 1, r[2 * tw + x]), dv.setUint8((y * tw + x) * 4, r[3 * tw + x]); // tasot MSB ensin → LE float
  }
  return out;
}

/**
 * Ikkuna lähdelaatasta: sarakkeet x0…x1 lännestä ja rivit y0…y1 ETELÄSTÄ
 * (samat indeksit kuin dodsIndeksit), mukaan lukien. Palauttaa Float32Arrayn
 * rivit etelästä pohjoiseen (NCSS:n suunta), leveys x1 − x0 + 1.
 */
export function lueGtifIkkuna(polku, x0, x1, y0, y1) {
  const fd = openSync(polku, 'r');
  try {
    const t = lueIfd(fd);
    const W = t[256][0], H = t[257][0], tw = t[322][0], th = t[323][0];
    if (t[259][0] !== 8 || (t[317]?.[0] ?? 1) !== 3 || t[258][0] !== 32 || (t[339]?.[0] ?? 1) !== 3) {
      throw new Error(`odottamaton GeoTIFF-muoto (pakkaus ${t[259][0]}, ennustin ${t[317]?.[0]}) — muuttuiko NOAA:n tiedosto?`);
    }
    const ofs = t[324], cnt = t[325], palojaX = Math.ceil(W / tw);
    const lev = x1 - x0 + 1, kork = y1 - y0 + 1, ulos = new Float32Array(lev * kork);
    const r0 = H - 1 - y1, r1 = H - 1 - y0; // tiedoston rivit pohjoisesta
    const valimuisti = new Map();
    for (let py = Math.floor(r0 / th); py <= Math.floor(r1 / th); py++) {
      for (let px = Math.floor(x0 / tw); px <= Math.floor(x1 / tw); px++) {
        const k = py * palojaX + px;
        if (!valimuisti.has(k)) { const raaka = Buffer.alloc(cnt[k]); readSync(fd, raaka, 0, cnt[k], ofs[k]); valimuisti.set(k, puraPala(raaka, tw, th)); }
        const p = valimuisti.get(k);
        for (let r = Math.max(r0, py * th); r <= Math.min(r1, py * th + th - 1); r++) {
          for (let c = Math.max(x0, px * tw); c <= Math.min(x1, px * tw + tw - 1); c++) {
            ulos[(H - 1 - r - y0) * lev + (c - x0)] = p[(r - py * th) * tw + (c - px * tw)];
          }
        }
      }
    }
    return ulos;
  } finally { closeSync(fd); }
}
