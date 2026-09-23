#!/usr/bin/env node
/*
 * MAAKUNTARAJAT (Siirtoseppä 23.9.2026, Natiivisepän B17: maakuntien
 * värjäys pallolla). Sama muoto kuin maarajat: { id, iso3, nimi, bbox,
 * renkaat [[[lon, lat]]] }, id = "<ISO3>:<tunnus>" (sama avain kuin
 * js/karttatyokalu-maakunnat.js ja Natiivi-UI:n Maakunnat.Valittu).
 *
 *   node tools/vienti/maakuntarajat.mjs --paivita
 *
 * Lähde on webin oma maakunta-aineisto ämpärissä
 * (js/pallomaakunnat.js PALLOMAAKUNNAT_JUURI: <ISO>.bin + <ISO>.json,
 * Natural Earth 10m admin-1, public domain). Purku tehdään pelin
 * funktiolla puraMaa, harvennus Douglas–Peucker 0,02° ja pyöristys
 * 1e-3°. Renkaat täytetään parillisuussäännöllä. Tulos
 * maakuntarajat.json; vienti lukee vain sen.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { harvenna } from './maarajat.mjs';

const TAMA = dirname(fileURLToPath(import.meta.url));
export const MAAKUNTATIEDOSTO = join(TAMA, 'maakuntarajat.json');
export const MAAKUNTAMAAT = ['AUT', 'CHE', 'DEU', 'ESP', 'FRA', 'GBR', 'ITA', 'POL'];
export const MAAKUNTARAJOJEN_TOLERANSSI = 0.02;
const pyorista = (v) => Math.round(v * 1000) / 1000;

export function lueMaakuntarajat() {
  return existsSync(MAAKUNTATIEDOSTO) ? JSON.parse(readFileSync(MAAKUNTATIEDOSTO, 'utf8')) : { alueet: [] };
}

async function paivita() {
  const { PALLOMAAKUNNAT_JUURI, PALLOMAAKUNNAT_VERSIO, puraMaa } = await import('../../js/pallomaakunnat.js');
  const alueet = [];
  for (const iso of MAAKUNTAMAAT) {
    const [bin, json] = await Promise.all([
      fetch(`${PALLOMAAKUNNAT_JUURI}${iso}.bin`).then((v) => { if (!v.ok) throw new Error(`${iso}.bin ${v.status}`); return v.arrayBuffer(); }),
      fetch(`${PALLOMAAKUNNAT_JUURI}${iso}.json`).then((v) => { if (!v.ok) throw new Error(`${iso}.json ${v.status}`); return v.json(); }),
    ]);
    const { paikat } = puraMaa(new Uint8Array(bin));
    for (const a of json.alueet) {
      const renkaat = a.renkaat.map(([alku, loppu]) => {
        const r = [];
        for (let i = alku; i < loppu; i += 1) r.push([paikat[i * 2], paikat[i * 2 + 1]]);
        if (r.length && (r[0][0] !== r.at(-1)[0] || r[0][1] !== r.at(-1)[1])) r.push([...r[0]]);
        return harvenna(r, MAAKUNTARAJOJEN_TOLERANSSI).map(([lon, lat]) => [pyorista(lon), pyorista(lat)]);
      }).filter((r) => r.length >= 4);
      let [w, s, e, n] = [Infinity, Infinity, -Infinity, -Infinity];
      for (const r of renkaat) for (const [lon, lat] of r) {
        w = Math.min(w, lon); e = Math.max(e, lon); s = Math.min(s, lat); n = Math.max(n, lat);
      }
      alueet.push({ id: `${iso}:${a.tunnus}`, iso3: iso, nimi: a.nimi, bbox: [w, s, e, n], renkaat });
    }
  }
  alueet.sort((a, b) => (a.id < b.id ? -1 : 1));
  writeFileSync(MAAKUNTATIEDOSTO, `${JSON.stringify({
    lahde: 'Natural Earth 10m admin_1_states_provinces (public domain), webin maakunta-aineisto ämpärissä',
    versio: PALLOMAAKUNNAT_VERSIO, toleranssi: MAAKUNTARAJOJEN_TOLERANSSI, alueet,
  })}\n`);
  return { alueita: alueet.length, maita: MAAKUNTAMAAT.length };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  if (!process.argv.includes('--paivita')) { console.error('käyttö: node tools/vienti/maakuntarajat.mjs --paivita'); process.exit(1); }
  paivita().then((t) => { console.log(JSON.stringify(t)); process.exit(0); });
}
