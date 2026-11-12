/*
 * Elävien ohjeiden luettelo, jonka `node tools/kirjaa.mjs hae` käy läpi (OHJEET-osio). Korvaa vanhan Raamatun käsin pidetyn
 * ohjekartan (luku 13): ovi löytää ohjeet itse, eikä uusi ohje voi jäädä kartan ulkopuolelle (KK 12.11.2026 klo 17.30,
 * suunnitelma 20261112-vanha-js-poisto.md vaihe 1). Päätösloki docs/raamattu-loki/ löytyy omalla ovellaan tools/loki-hae.mjs.
 * Ulkopuolella tarkoituksella: docs/arkisto, docs/raportit, docs/mantereet-tyoaineisto (eivät ole ohjeita).
 */
import { existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

export const OHJEKANSIOT = ['docs/tuotanto', 'docs/moduulit'];
export const OHJEJUURI = ['AGENTS.md'];

/** Absoluuttiset polut: docs/*.md, docs/tuotanto/** ja docs/moduulit/** (.md) sekä AGENTS.md. */
export function ohjeTiedostot(juuri) {
  const out = [];
  const kayLapi = (d) => {
    if (!existsSync(d)) return;
    for (const f of readdirSync(d).sort()) {
      const q = join(d, f);
      if (statSync(q).isDirectory()) kayLapi(q); else if (f.endsWith('.md')) out.push(q);
    }
  };
  for (const k of OHJEKANSIOT) kayLapi(join(juuri, k));
  const docs = join(juuri, 'docs');
  if (existsSync(docs)) for (const f of readdirSync(docs).sort()) if (f.endsWith('.md')) out.push(join(docs, f));
  for (const f of OHJEJUURI) if (existsSync(join(juuri, f))) out.push(join(juuri, f));
  return out;
}
