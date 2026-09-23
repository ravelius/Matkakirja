#!/usr/bin/env node
/*
 * RADIOSTRIIMIEN TARKISTUS (Siirtoseppä 23.9.2026, Linssisepän havainto:
 * iOS 27:n AVPlayer hylkää palvelimen, jossa ei ole forward secrecyä).
 *
 *   node tools/vienti/radiotarkistus.mjs --paivita
 *
 * Tekee jokaisen radiot-kokoelman aseman osoitteelle TLS-kättelyn samalla
 * vaatimuksella kuin iOS:n App Transport Security: TLS 1.3 tai TLS 1.2
 * ECDHE-salauksella, voimassa oleva varmenne. Tulos radiotarkistus.json
 * ({ url: { toimii, virhe, versio, salaus } }); vienti lukee vain sen ja
 * merkitsee rivin kentät toimii ja tarkistus. Uudelleenohjauksen kohdetta
 * ei tarkisteta (tunnettu rajaus).
 */
import tls from 'node:tls';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const TAMA = dirname(fileURLToPath(import.meta.url));
export const TARKISTUSTIEDOSTO = join(TAMA, 'radiotarkistus.json');
const ATS_SALAUKSET = ['TLS_AES_128_GCM_SHA256', 'TLS_AES_256_GCM_SHA384', 'TLS_CHACHA20_POLY1305_SHA256',
  'ECDHE-ECDSA-AES128-GCM-SHA256', 'ECDHE-RSA-AES128-GCM-SHA256', 'ECDHE-ECDSA-AES256-GCM-SHA384',
  'ECDHE-RSA-AES256-GCM-SHA384', 'ECDHE-ECDSA-CHACHA20-POLY1305', 'ECDHE-RSA-CHACHA20-POLY1305'].join(':');

export function lueRadiotarkistus() {
  return existsSync(TARKISTUSTIEDOSTO) ? JSON.parse(readFileSync(TARKISTUSTIEDOSTO, 'utf8')) : { tulokset: {} };
}

export function kattele(url) {
  return new Promise((ok) => {
    const u = new URL(url);
    const s = tls.connect({
      host: u.hostname, port: Number(u.port || 443), servername: u.hostname, minVersion: 'TLSv1.2',
      ciphers: ATS_SALAUKSET, timeout: 10000,
    }, () => {
      const c = s.getCipher();
      ok({ toimii: s.authorized, virhe: s.authorized ? null : String(s.authorizationError), versio: s.getProtocol(), salaus: c?.name ?? null });
      s.destroy();
    });
    s.on('error', (e) => ok({ toimii: false, virhe: e.code || e.message, versio: null, salaus: null }));
    s.on('timeout', () => { ok({ toimii: false, virhe: 'aikakatkaisu', versio: null, salaus: null }); s.destroy(); });
  });
}

async function paivita() {
  const { RADIOT } = await import('../../js/packs/radiot.js');
  const korvaavat = JSON.parse(readFileSync(join(TAMA, 'radiokorvaavat.json'), 'utf8')).asemat;
  const osoitteet = [...new Set([...Object.values(RADIOT).map((r) => r.url), ...Object.values(korvaavat).map((k) => k.url)])].sort();
  const tulokset = {};
  for (const url of osoitteet) tulokset[url] = await kattele(url);
  writeFileSync(TARKISTUSTIEDOSTO, `${JSON.stringify({ tarkistettu: new Date().toISOString().slice(0, 10), vaatimus: 'TLS 1.3 tai TLS 1.2 + ECDHE (iOS ATS)', tulokset }, null, 1)}\n`);
  return Object.entries(tulokset).filter(([, t]) => !t.toimii).map(([u, t]) => `${u} ${t.virhe}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  if (!process.argv.includes('--paivita')) { console.error('käyttö: node tools/vienti/radiotarkistus.mjs --paivita'); process.exit(1); }
  paivita().then((virheet) => { console.log(`ei toimi: ${virheet.length}`); for (const v of virheet) console.log(`  ${v}`); process.exit(0); });
}
