#!/usr/bin/env node
/*
 * KYSY-NAPIN VALMIIT KYSYMYKSET (omistaja 19.10.2026 klo 11.40 kipin Kysy-napista; PT 12.0x): Sisältökirjurin listat
 * docs/kohtaukset/pallokierros/kysy-<kaupunki>-*.json (kohteen Wikidata-Q → 8 kysymystä) yhdeksi moduuliksi
 * tools/pollo/opas-kysy.js, jota GET /opas/kysymykset käyttää ensimmäisenä (ennen esittelyn 5 kysymystä ja mallia).
 * Pieni aineisto (4 kaupunkia × 8 × 8), joten tulos on repossa; tests/opas-kysy.test.mjs tarkistaa, että se vastaa listoja.
 *   node tools/pollo/tee-opas-kysy.mjs            kirjoittaa moduulin
 *   node tools/pollo/tee-opas-kysy.mjs --tarkista  rc 1, jos moduuli ei vastaa listoja
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const TAMA = dirname(fileURLToPath(import.meta.url));
const LISTAT = join(TAMA, '..', '..', 'docs', 'kohtaukset', 'pallokierros');
const KOHDE = join(TAMA, 'opas-kysy.js');

export function kokoa() {
  const kohteet = {};
  for (const f of readdirSync(LISTAT).filter((n) => /^kysy-[a-z]+-\d{8}\.json$/.test(n)).sort()) {
    const d = JSON.parse(readFileSync(join(LISTAT, f), 'utf8'));
    for (const [q, lista] of Object.entries(d.kohteet ?? {})) {
      if (!/^Q\d+$/.test(q) || !Array.isArray(lista)) continue;
      kohteet[q] = lista.filter((k) => typeof k === 'string' && k.trim()).map((k) => k.trim());
    }
  }
  return kohteet;
}

export function moduuli(kohteet) {
  return `/*
 * GENEROITU: node tools/pollo/tee-opas-kysy.mjs (Sisältökirjurin docs/kohtaukset/pallokierros/kysy-*.json). Älä muokkaa käsin.
 */
export const OPAS_KYSY = ${JSON.stringify(kohteet, null, 1)};
`;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const teksti = moduuli(kokoa());
  if (process.argv.includes('--tarkista')) {
    const nyt = readFileSync(KOHDE, 'utf8');
    if (nyt !== teksti) { console.error('opas-kysy.js ei vastaa listoja: aja node tools/pollo/tee-opas-kysy.mjs'); process.exit(1); }
    console.log('opas-kysy.js ajan tasalla');
  } else {
    writeFileSync(KOHDE, teksti);
    console.log(`opas-kysy.js: ${Object.keys(kokoa()).length} kohdetta`);
  }
}
