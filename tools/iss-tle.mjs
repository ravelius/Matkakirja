#!/usr/bin/env node
/*
 * ISS-TLE ÄMPÄRIIN (Siirtoseppä 26.9.2026; Linssisepän tilaus, omistaja hyväksyi
 * docs/raportit/iss-linssi-suunnitelma-20260926.md). Hakee CelesTrakin GP-datan
 * ISS:lle (NORAD 25544) TLE-muodossa ja kirjoittaa sen JSONina, jonka natiivin
 * SGP4 (Linssit/Ydin/Iss) lukee:
 *
 *   { "nimi": "ISS (ZARYA)", "rivi1": "1 25544U …", "rivi2": "2 25544 …",
 *     "haettu": "<ISO UTC>", "lahde": "CelesTrak GP (NORAD 25544)" }
 *
 *   node tools/iss-tle.mjs --ulos <tiedosto>            hae CelesTrakista (yksi pyyntö)
 *   node tools/iss-tle.mjs --ulos <tiedosto> --ampari   hae julkaistu media.matkakirja.app/data/iss-tle.json
 *                                                       (buildin mukaan: sama tiedosto, ei CelesTrakia)
 *
 * Julkaisija: .github/workflows/iss-tle.yml 6 tunnin välein. Rivien tarkistussummat
 * ja NORAD-numero tarkistetaan; virhe → poistumiskoodi 1 eikä tiedostoa kirjoiteta,
 * joten ämpäriin jää edellinen versio (ei tyhjää tiedostoa).
 */
import { writeFileSync, renameSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const CELESTRAK = 'https://celestrak.org/NORAD/elements/gp.php?CATNR=25544&FORMAT=TLE';
export const AMPARI = 'https://media.matkakirja.app/data/iss-tle.json';
export const LAHDE = 'CelesTrak GP (NORAD 25544)';

/** TLE-rivin tarkistussumma: numerot summataan, miinus = 1, muut 0; mod 10 (sarake 69). */
export function tarkistussumma(rivi) {
  let s = 0;
  for (const c of rivi.slice(0, 68)) s += c === '-' ? 1 : (c >= '0' && c <= '9' ? Number(c) : 0);
  return s % 10;
}

/** CelesTrakin kolmirivinen TLE → { nimi, rivi1, rivi2 }; virheellinen → Error. */
export function jasennaTle(teksti) {
  const rivit = String(teksti).split(/\r?\n/).map((r) => r.trimEnd()).filter(Boolean);
  if (rivit.length !== 3) throw new Error(`odotettiin 3 riviä, saatiin ${rivit.length}`);
  const [nimi, rivi1, rivi2] = rivit;
  for (const [n, r] of [[1, rivi1], [2, rivi2]]) {
    if (r.length !== 69 || r[0] !== String(n)) throw new Error(`rivi ${n}: ei TLE-rivi (${r.length} merkkiä)`);
    if (r.slice(2, 7) !== '25544') throw new Error(`rivi ${n}: NORAD ${r.slice(2, 7)}, odotettiin 25544`);
    if (tarkistussumma(r) !== Number(r[68])) throw new Error(`rivi ${n}: tarkistussumma ei täsmää`);
  }
  return { nimi: nimi.trim(), rivi1, rivi2 };
}

/** Julkaistava JSON (rivinvaihto lopussa). */
export function tleJson(tle, haettu = new Date()) {
  return JSON.stringify({ ...tle, haettu: haettu.toISOString(), lahde: LAHDE }) + '\n';
}

async function hae(url) {
  const v = await fetch(url, { headers: { 'user-agent': 'Matkakirja ISS-linssi (media.matkakirja.app)' } });
  if (!v.ok) throw new Error(`${url}: HTTP ${v.status}`);
  return v.text();
}

async function main(argv) {
  const i = argv.indexOf('--ulos');
  if (i < 0 || !argv[i + 1]) throw new Error('käyttö: node tools/iss-tle.mjs --ulos <tiedosto> [--ampari]');
  const ulos = resolve(argv[i + 1]);
  let json;
  if (argv.includes('--ampari')) {
    const d = JSON.parse(await hae(AMPARI));
    jasennaTle([d.nimi, d.rivi1, d.rivi2].join('\n'));
    json = JSON.stringify(d) + '\n';
  } else {
    json = tleJson(jasennaTle(await hae(CELESTRAK)));
  }
  // Ensin väliaikaiseen ja sitten nimetään: keskeytynyt ajo ei jätä puolikasta tiedostoa.
  writeFileSync(`${ulos}.tmp`, json);
  renameSync(`${ulos}.tmp`, ulos);
  console.log(`ISS-TLE → ${ulos}: ${json.trim()}`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).catch((e) => { console.error(`iss-tle: ${e.message}`); process.exit(1); });
}
