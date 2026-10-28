#!/usr/bin/env node
/*
 * Asettaa maakuntatekstit (pitka) pakkiin js/packs/maakunnat-luonnehdinnat.js.
 * Käyttö: node tools/sisalto/maakuntateksti-aseta.mjs <MAATUNNUS> <tekstit.json>
 * tekstit.json = { "<englanninkielinen avain täsmälleen kuten pakissa>": "teksti" }
 * Reseptit ja työtapa: docs/tuotanto/reseptit/maakuntateksti-koko-maakunta.md
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const [maa, tiedosto] = process.argv.slice(2);
if (!maa || !tiedosto) { console.error('Käyttö: maakuntateksti-aseta.mjs <MAATUNNUS> <tekstit.json>'); process.exit(2); }
const polku = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'js/packs/maakunnat-luonnehdinnat.js');
let s = fs.readFileSync(polku, 'utf8');
const T = JSON.parse(fs.readFileSync(tiedosto, 'utf8'));
const a = s.indexOf(`\n  ${maa}: {`);
if (a < 0) { console.error(`Maata ${maa} ei löydy`); process.exit(1); }
const seur = /\n {2}[A-Z]{3}: \{/.exec(s.slice(a + 5));
const b = seur ? a + 5 + seur.index : s.length;
let lohko = s.slice(a, b);
const esc = (x) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
for (const [avain, teksti] of Object.entries(T)) {
  if (teksti.includes('`') || teksti.includes('${')) throw new Error(`Kielletty merkki tekstissä: ${avain}`);
  const re = new RegExp(`(\\n    (?:'${esc(avain)}'|"${esc(avain)}"|${esc(avain)}): \\{\\n      lyhyt:[^\\n]*\\n      pitka: )(\`[^\`]*\`|'[^\\n]*'|"[^\\n]*")(,\\n)`);
  const m = re.exec(lohko);
  if (!m) throw new Error(`Avainta ei löydy tai muoto poikkeaa: ${maa}/${avain}`);
  lohko = lohko.slice(0, m.index + m[1].length) + '`' + teksti + '`' + lohko.slice(m.index + m[1].length + m[2].length);
}
s = s.slice(0, a) + lohko + s.slice(b);
fs.writeFileSync(polku, s);
console.log(`${maa}: ${Object.keys(T).length} tekstiä asetettu`);
