#!/usr/bin/env node
/*
 * ESIGENEROIDUN ESITTELYN POHJA (omistaja 7.10.2026 00.4x, Päätoimittaja): kaupungeittain kaikki, mitä kirjoittaja-agentti
 * (Opus, Claude Code) tarvitsee: kuvalistan kohteet, kierroksen lyhin reitti (8 tärkeintä), kohteiden Wikipedia-linkit
 * (fi, en), pelin oma aineisto (isoisän kaanonmerkintä, kaupunkilehti) ja oppaan säännöt. Tekstit kirjoitetaan agenteilla,
 * ei workerin API:lla; tarkistaja-agentti korjaa kielen ja faktat, ja tarkista-esittely.mjs valvoo muodon.
 *
 * Käyttö: node tools/pollo/tee-opas-aineisto.mjs   (täysi aineisto paikallisesti; palauta tynkä --tynka-lipulla)
 *         node tools/opas/tee-esittelypohja.mjs --kuvalista <kuvat.json> --ulos <kansio> Pariisi Praha Wien
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { kaupunginKohteet } from '../pollo/opas-kuvat.js';
import { lyhinReitti, kaupunginAineisto, KIERROKSEN_PITUUS, OPAS_KEHOTE } from '../pollo/opas.js';
import { OPAS_AINEISTO } from '../pollo/opas-aineisto.js';
import { kaupunkiId } from '../pollo/opas-esittely.js';
import { pisteSallittu } from '../pollo/sallitut.js';

const arg = (n) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : null; };
const kaupungit = process.argv.slice(2).filter((x, i, a) => !x.startsWith('--') && !a[i - 1]?.startsWith('--'));
const lista = JSON.parse(readFileSync(arg('kuvalista'), 'utf8'));
const ulos = arg('ulos');
mkdirSync(ulos, { recursive: true });
const UA = 'Matkakirja-esittely/1.0 (https://matkakirja.app; peli@matkakirja.app)';


async function wikilinkit(ids) {
  const v = await fetch(`https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&props=sitelinks/urls&sitefilter=fiwiki|enwiki&ids=${ids.join('|')}`,
    { headers: { 'user-agent': UA } }).then((r) => r.json());
  return Object.fromEntries(Object.entries(v.entities ?? {}).map(([q, e]) => [q, { fi: e.sitelinks?.fiwiki?.url ?? null, en: e.sitelinks?.enwiki?.url ?? null }]));
}

for (const kaupunki of kaupungit) {
  // Vain sallitun 3D-alueen (r_m) kohteet (omistaja 7.10.): muualle ei lennetä, joten niille ei kirjoiteta kerrontaa.
  const kaikki = kaupunginKohteet(lista, kaupunki);
  const kohteet = kaikki.filter((k) => pisteSallittu(k, kaupunki, { OPAS_SALLITUT_ESTO: '1' }));
  const pois = kaikki.filter((k) => !kohteet.includes(k)).map((k) => k.nimi);
  if (pois.length) console.log(`${kaupunki}: säteen ulkopuolella ${pois.join(', ')}`);
  if (!kohteet.length) { console.error(`${kaupunki}: ei kuvalistaa`); continue; }
  const k = Object.values(lista.kaupungit).find((x) => x.nimi === kaupunki);
  const alku = k?.lat != null ? { lat: k.lat, lon: k.lon } : null;
  const kierros = lyhinReitti(kohteet.slice(0, KIERROKSEN_PITUUS), alku);
  const linkit = await wikilinkit(kohteet.map((x) => x.id));
  const aineisto = kaupunginAineisto(OPAS_AINEISTO, kaupunki);
  const pohja = {
    kaupunki, id: kaupunkiId(kaupunki), keskus: alku,
    kierros: kierros.map((x) => x.id),
    kohteet: kohteet.map((x, i) => ({ id: x.id, nimi: x.nimi, lat: x.lat, lon: x.lon, tarkeys: i + 1, wiki: linkit[x.id] ?? {} })),
    isoisa: aineisto?.isoisa ?? null,
    aineisto: aineisto ? { ...aineisto, isoisa: undefined } : null,
    saannot: OPAS_KEHOTE,
  };
  writeFileSync(join(ulos, `${pohja.id}.json`), JSON.stringify(pohja, null, 1));
  console.log(`${kaupunki}: ${kohteet.length} kohdetta, kierros ${kierros.map((x) => x.nimi).join(' → ')}, isoisä ${pohja.isoisa ? 'kyllä' : 'ei'}`);
}
