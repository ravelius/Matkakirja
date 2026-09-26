#!/usr/bin/env node
/*
 * KAUPUNKIEN ASUKASLUVUT WIKIDATASTA (skeema 1.38; Linssisepän tilaus,
 * Fable hyväksyi 24.9.2026: radiouudistuksen mastojen kokoluokat).
 *
 *   NODE_USE_ENV_PROXY=1 node tools/vienti/hae-asukkaat.mjs
 *
 * Kaupungin `wiki` (fi-Wikipedian artikkeli) → Wikidata-kohde
 * (pageprops.wikibase_item) → P1082 (väkiluku, CC0). Arvo on viimeisin:
 * P518-osajoukot vain jos muita ei ole; suositeltu (preferred) rank ensin, sitten uusin
 * P585-ajankohta ja saman vuoden sisällä suurin. fi-Wikipedian puuttuessa
 * sama otsikko en-Wikipediasta. Kirjoittaa
 * tools/vienti/kaupunkien-asukkaat.json; vienti ei hae verkosta.
 * Kohteelle ilman P1082:ta (luontokohteet, historialliset paikat) null.
 */
import { writeFileSync } from 'node:fs';
import { MAAILMANKARTTA } from '../../js/packs/maailmankartta.js';

const UA = { 'User-Agent': 'Matkakirja-sisaltovienti/1 (https://matkakirja.app)' };
const hae = async (url) => {
  for (let yritys = 0; yritys < 4; yritys += 1) {
    const r = await fetch(url, { headers: UA });
    if (r.ok) return r.json();
    await new Promise((ok) => setTimeout(ok, 2000 * (yritys + 1)));
  }
  throw new Error(`${url}: ei vastausta`);
};

const kaupungit = MAAILMANKARTTA.cities;
const qidt = new Map();
for (let i = 0; i < kaupungit.length; i += 50) {
  const erä = kaupungit.slice(i, i + 50).filter((c) => c.wiki);
  const otsikot = erä.map((c) => c.wiki).join('|');
  const j = await hae(`https://fi.wikipedia.org/w/api.php?action=query&format=json&redirects=1&prop=pageprops&ppprop=wikibase_item&titles=${encodeURIComponent(otsikot)}`);
  const nimi = new Map();
  for (const n of j.query.normalized ?? []) nimi.set(n.from, n.to);
  for (const r of j.query.redirects ?? []) nimi.set(r.from, r.to);
  const sivut = new Map(Object.values(j.query.pages).map((p) => [p.title, p.pageprops?.wikibase_item]));
  for (const c of erä) {
    let t = c.wiki;
    for (let k = 0; k < 3 && nimi.has(t); k += 1) t = nimi.get(t);
    if (sivut.get(t)) qidt.set(c.id, sivut.get(t));
  }
}
// Varareitti: fi-Wikipediassa ei artikkelia (Birdsville, Coober Pedy…) →
// sama otsikko en-Wikipediassa.
for (const c of kaupungit.filter((k) => k.wiki && !qidt.has(k.id))) {
  const j = await hae(`https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&props=info&sites=enwiki&normalize=1&titles=${encodeURIComponent(c.wiki)}`);
  const q = Object.keys(j.entities ?? {}).find((k) => /^Q\d+$/.test(k));
  if (q) qidt.set(c.id, q);
}

const aika = (v) => {
  const t = v.qualifiers?.P585?.[0]?.datavalue?.value?.time;
  return t ? Number(t.slice(1, 5)) : null;
};
// Saari, valtio tai merentakainen alue ilman kaupunki-tyyppiä (Q515):
// luku on koko alueen väkiluku, ei kaupungin (Sumatra, Angola, Sisilia…).
const ALUETYYPIT = new Set(['Q23442', 'Q6256', 'Q3624078', 'Q46395', 'Q33837']);
const KAUPUNKI = 'Q515';
const tulos = {};
const lista = [...qidt.entries()];
for (let i = 0; i < lista.length; i += 40) {
  const erä = lista.slice(i, i + 40);
  const j = await hae(`https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&props=claims&ids=${erä.map(([, q]) => q).join('|')}`);
  for (const [id, q] of erä) {
    const claims = j.entities[q]?.claims ?? {};
    const tyypit = new Set((claims.P31 ?? []).map((v) => v.mainsnak?.datavalue?.value?.id));
    const alue = [...ALUETYYPIT].some((t) => tyypit.has(t)) && !tyypit.has(KAUPUNKI);
    // P518 (koskee osaa) = osajoukon luku (Mount Isa 172), ei koko paikan:
    // käytetään vain, jos muita ei ole (Australian väestönlaskenta merkitsee
    // kaikki), ja silloin saman vuoden suurin.
    const kaikki = (claims.P1082 ?? []).filter((v) => v.rank !== 'deprecated' && v.mainsnak?.datavalue?.value?.amount);
    const kokonaiset = kaikki.filter((v) => !v.qualifiers?.P518);
    const vaitteet = kokonaiset.length ? kokonaiset : kaikki;
    if (!vaitteet.length) { tulos[id] = { asukkaat: null, vuosi: null, wikidata: q, alue }; continue; }
    const luku = (v) => Number(v.mainsnak.datavalue.value.amount);
    vaitteet.sort((a, b) => (b.rank === 'preferred') - (a.rank === 'preferred') || (aika(b) ?? 0) - (aika(a) ?? 0)
      || luku(b) - luku(a));
    const v = vaitteet[0];
    tulos[id] = { asukkaat: Math.round(luku(v)), vuosi: aika(v), wikidata: q, alue };
  }
}
for (const c of kaupungit) tulos[c.id] ??= { asukkaat: null, vuosi: null, wikidata: null, alue: false };

const jarjestetty = Object.fromEntries(Object.keys(tulos).sort().map((k) => [k, tulos[k]]));
writeFileSync(new URL('./kaupunkien-asukkaat.json', import.meta.url), `${JSON.stringify({
  lahde: 'Wikidata P1082 (väkiluku), CC0 1.0; kohde fi-Wikipedian artikkelin (kaupungit[].wiki) kautta',
  valinta: 'P518-osajoukot vain jos muita ei ole; suositeltu rank ensin, sitten uusin P585-ajankohta, saman vuoden sisällä suurin. '
    + 'alue = saari, valtio tai merentakainen alue (P31) ilman kaupunki-tyyppiä: luku koskee koko aluetta',
  haettu: new Date().toISOString().slice(0, 10),
  kaupungit: jarjestetty,
}, null, 1)}\n`);
const puuttuu = Object.entries(jarjestetty).filter(([, v]) => v.asukkaat == null).map(([k]) => k);
console.log(`asukkaat: ${kaupungit.length - puuttuu.length}/${kaupungit.length}; ilman: ${puuttuu.join(', ')}`);
