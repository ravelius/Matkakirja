#!/usr/bin/env node
/*
 * REVONTULET ÄMPÄRIIN (Julkaisija 28.9.2026; Linssisepän ISS-realismi, kohta 3b,
 * docs/raportit/iss-realismi-suunnitelma-20260928.md haarassa linssiseppa-tyo-20260923).
 *
 * Hakee NOAA SWPC:n OVATION Prime -ennusteen (PD) ja kirjoittaa kaksi tiedostoa:
 *
 *   <kansio>/uusin.png   360 × 181, 8-bit harmaa = todennäköisyys % × 2,55,
 *                        tasakulmainen: sarake c = pituus c° (0…359, itään),
 *                        rivi r = leveys 90 − r (rivi 0 = 90° N, rivi 180 = 90° S)
 *   <kansio>/uusin.json  { havaintoaika, ennusteaika, lahde, lisenssi, leveys, korkeus, haettu }
 *
 *   node tools/iss-revontulet.mjs --ulos <kansio>
 *
 * Julkaisija: .github/workflows/iss-revontulet.yml 30 minuutin välein. Syötteen
 * muoto tarkistetaan (65 160 pistettä, "[Longitude, Latitude, Aurora]"); virhe →
 * poistumiskoodi 1 eikä tiedostoja kirjoiteta, joten ämpäriin jää edellinen versio.
 *
 * PNG kirjoitetaan omalla pienellä kooderilla (node:zlib), jotta 30 minuutin ajo ei
 * tarvitse npm installia. Sama kooderi (harmaaPng) palvelee tools/iss-pilvet.mjs:ää.
 */
import { writeFileSync, renameSync, mkdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { deflateSync } from 'node:zlib';

export const OVATION = 'https://services.swpc.noaa.gov/json/ovation_aurora_latest.json';
export const LAHDE = 'NOAA SWPC OVATION Prime (ovation_aurora_latest.json)';
export const LISENSSI = 'NOAA SWPC / PD';
export const LEVEYS = 360;
export const KORKEUS = 181;

/* ---------- PNG (8-bit harmaa, ei lomitusta) ---------- */

const CRC = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

export function crc32(tavut) {
  let c = 0xffffffff;
  for (const b of tavut) c = CRC[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function lohko(tyyppi, data) {
  const pituus = Buffer.alloc(4);
  pituus.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(tyyppi, 'latin1'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(td));
  return Buffer.concat([pituus, td, crc]);
}

/** Harmaasävy-PNG (bittisyvyys 8, värityyppi 0) raakatavuista (leveys × korkeus). */
export function harmaaPng(data, leveys, korkeus) {
  if (data.length !== leveys * korkeus) throw new Error(`PNG: ${data.length} tavua, odotettiin ${leveys * korkeus}`);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(leveys, 0);
  ihdr.writeUInt32BE(korkeus, 4);
  ihdr[8] = 8; ihdr[9] = 0; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  // Jokaisen rivin alkuun suodin 0 (ei suodinta).
  const raaka = Buffer.alloc((leveys + 1) * korkeus);
  for (let y = 0; y < korkeus; y++) {
    raaka[y * (leveys + 1)] = 0;
    raaka.set(data.subarray(y * leveys, (y + 1) * leveys), y * (leveys + 1) + 1);
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    lohko('IHDR', ihdr),
    lohko('IDAT', deflateSync(raaka, { level: 9 })),
    lohko('IEND', Buffer.alloc(0)),
  ]);
}

/* ---------- OVATION → ruudukko ---------- */

/**
 * OVATION-JSON → Uint8Array(360 × 181). Piste [pituus, leveys, p %] menee
 * sarakkeeseen pituus ja riville 90 − leveys; arvo round(p × 2,55), rajattuna 0…255.
 * Tarkistaa muodon; täysi syöte (odotaKaikki) vaatii jokaisen ruudun täsmälleen kerran.
 */
export function ovationRuudukko(json, { odotaKaikki = true } = {}) {
  if (!json || !Array.isArray(json.coordinates)) throw new Error('OVATION: coordinates puuttuu');
  const muoto = String(json['Data Format'] ?? '');
  if (!/Longitude.*Latitude.*Aurora/i.test(muoto)) throw new Error(`OVATION: tuntematon Data Format "${muoto}"`);
  const n = LEVEYS * KORKEUS;
  if (odotaKaikki && json.coordinates.length !== n) {
    throw new Error(`OVATION: ${json.coordinates.length} pistettä, odotettiin ${n}`);
  }
  const ulos = new Uint8Array(n);
  const nahty = new Uint8Array(n);
  for (const piste of json.coordinates) {
    const [lon, lat, p] = piste;
    if (!Number.isInteger(lon) || !Number.isInteger(lat) || lon < 0 || lon > 359 || lat < -90 || lat > 90
      || typeof p !== 'number' || !Number.isFinite(p)) {
      throw new Error(`OVATION: virheellinen piste ${JSON.stringify(piste)}`);
    }
    const i = (90 - lat) * LEVEYS + lon;
    if (nahty[i]) throw new Error(`OVATION: piste (${lon}, ${lat}) kahdesti`);
    nahty[i] = 1;
    ulos[i] = Math.max(0, Math.min(255, Math.round((p * 255) / 100)));
  }
  return ulos;
}

/** Julkaistava JSON (rivinvaihto lopussa). */
export function revontuletJson(json, haettu = new Date()) {
  const havaintoaika = json['Observation Time'];
  const ennusteaika = json['Forecast Time'];
  if (!havaintoaika || !ennusteaika) throw new Error('OVATION: Observation/Forecast Time puuttuu');
  return JSON.stringify({
    havaintoaika, ennusteaika, lahde: LAHDE, lisenssi: LISENSSI,
    leveys: LEVEYS, korkeus: KORKEUS, haettu: haettu.toISOString(),
  }) + '\n';
}

/** Kirjoittaa tiedoston väliaikaisen kautta: keskeytynyt ajo ei jätä puolikasta. */
export function kirjoitaTurvallisesti(polku, data) {
  writeFileSync(`${polku}.tmp`, data);
  renameSync(`${polku}.tmp`, polku);
}

async function main(argv) {
  const i = argv.indexOf('--ulos');
  if (i < 0 || !argv[i + 1]) throw new Error('käyttö: node tools/iss-revontulet.mjs --ulos <kansio>');
  const kansio = resolve(argv[i + 1]);
  const v = await fetch(OVATION, { headers: { 'user-agent': 'Matkakirja ISS-linssi (media.matkakirja.app)' } });
  if (!v.ok) throw new Error(`${OVATION}: HTTP ${v.status}`);
  const json = await v.json();
  const ruudukko = ovationRuudukko(json);
  const meta = revontuletJson(json);
  mkdirSync(kansio, { recursive: true });
  kirjoitaTurvallisesti(join(kansio, 'uusin.png'), harmaaPng(ruudukko, LEVEYS, KORKEUS));
  kirjoitaTurvallisesti(join(kansio, 'uusin.json'), meta);
  let max = 0;
  for (const a of ruudukko) if (a > max) max = a;
  console.log(`revontulet → ${kansio}: suurin ${Math.round(max / 2.55)} %, ${meta.trim()}`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).catch((e) => { console.error(`iss-revontulet: ${e.message}`); process.exit(1); });
}
