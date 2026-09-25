#!/usr/bin/env node
/*
 * OSOITINVARTIJA (Fable 23.9.2026): CI ei vaihda osoitinta pakettiin, jonka
 * skeemaversio on pienempi kuin ämpärin nykyisen osoittimen. Koepaketti
 * (esim. v11, skeema 1.10) voi olla osoittimena ennen kuin sen haarat ovat
 * mainissa; main-push ei saa palauttaa sen päälle vanhempaa skeemaa.
 * Palautus (vie-sisalto.yml `palauta: N`) ohittaa vartijan tarkoituksella.
 *
 *   node tools/vienti/osoitinvartija.mjs <nykyinen.json> <uusi.json>
 *
 * Tulostaa "korvaa" tai "ohita <syy>". Versiot verrataan numeroina
 * (1.10 > 1.9).
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export function vertaaSkeemaa(a, b) {
  const [aM, am] = String(a).split('.').map(Number);
  const [bM, bm] = String(b).split('.').map(Number);
  return aM !== bM ? aM - bM : am - bm;
}

/** { korvaa: true } tai { korvaa: false, syy }. Puuttuva nykyinen = korvaa. */
export function saakoKorvata(nykyinen, uusi) {
  if (!nykyinen?.skeemaversio) return { korvaa: true };
  if (vertaaSkeemaa(uusi.skeemaversio, nykyinen.skeemaversio) < 0) {
    return { korvaa: false, syy: `skeema ${uusi.skeemaversio} < osoittimen ${nykyinen.skeemaversio} (v${nykyinen.versio})` };
  }
  return { korvaa: true };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [nykyinenPolku, uusiPolku] = process.argv.slice(2);
  let nykyinen = null;
  try { nykyinen = JSON.parse(readFileSync(nykyinenPolku, 'utf8')); } catch { nykyinen = null; }
  const t = saakoKorvata(nykyinen, JSON.parse(readFileSync(uusiPolku, 'utf8')));
  console.log(t.korvaa ? 'korvaa' : `ohita ${t.syy}`);
}
