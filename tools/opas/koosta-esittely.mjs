#!/usr/bin/env node
/*
 * Päätoimittajan luettava kooste esigeneroidusta esittelystä (markdown): kierros reittijärjestyksessä (teksti, lyhyt,
 * syventävä), sitten muut kohteet, merkkimäärät ja ElevenLabs-arvio. Käyttö: node tools/opas/koosta-esittely.mjs
 * --pohjat <kansio> --esittelyt <kansio> --ulos <tiedosto.md> pariisi praha wien
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { vuosiluvutSanoiksi } from '../pollo/puhesanat.js';

const arg = (n) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : null; };
const ids = process.argv.slice(2).filter((x, i, a) => !x.startsWith('--') && !a[i - 1]?.startsWith('--'));
const sanat = (t) => String(t ?? '').split(/\s+/).filter(Boolean).length;
const r = [];
let kaikki = 0;
for (const id of ids) {
  const pohja = JSON.parse(readFileSync(join(arg('pohjat'), `${id}.json`), 'utf8'));
  const e = JSON.parse(readFileSync(join(arg('esittelyt'), `${id}.json`), 'utf8'));
  const kohde = (q) => e.kohteet.find((k) => k.id === q);
  const merkit = e.kohteet.reduce((s, k) => s + vuosiluvutSanoiksi(k.puhe_teksti || k.teksti).length
    + (k.lyhyt ? vuosiluvutSanoiksi(k.puhe_lyhyt || k.lyhyt).length : 0), 0);
  kaikki += merkit;
  r.push(`## ${e.kaupunki}`, '', `${e.kohteet.length} kohdetta, puhetta ${merkit} merkkiä. Kierros (lyhin reitti): `
    + pohja.kierros.map((q) => kohde(q)?.nimi).join(' → '), '');
  const kirjoita = (k, n) => {
    r.push(`### ${n ? `${n}. ` : ''}${k.nimi}${k.kuvaus ? ` — ${k.kuvaus}` : ''}`, '', `${k.teksti} *(${sanat(k.teksti)} sanaa)*`, '');
    if (k.puhe_teksti) r.push(`Ääneen: ${k.puhe_teksti}`, '');
    if (k.lyhyt) r.push(`**Kierrosversio:** ${k.lyhyt} *(${sanat(k.lyhyt)} sanaa)*`, '');
    r.push(`**Jatkokysymys:** ${k.syventava}${k.isoisa ? ' · **isoisä mainitaan**' : ''} · lähteitä ${k.lahteet?.length ?? 0}`, '');
  };
  pohja.kierros.forEach((q, i) => kohde(q) && kirjoita(kohde(q), i + 1));
  r.push('#### Muut kohteet (Liiku-lista)', '');
  for (const k of e.kohteet) if (!pohja.kierros.includes(k.id)) kirjoita(k, 0);
}
r.unshift('# Esigeneroidun oppaan pilottitekstit', '', `Kaupungit: ${ids.join(', ')}. Puhetta yhteensä ${kaikki} merkkiä `
  + `(≈ ${Math.round(kaikki / 2)} ElevenLabs-krediittiä, eleven_v4_turbo 0,5/merkki). Vuosiluvut ovat näytöllä numeroina ja ääneen sanoina.`, '');
writeFileSync(arg('ulos'), r.join('\n') + '\n');
console.log(`kooste ${arg('ulos')}: ${kaikki} merkkiä`);
