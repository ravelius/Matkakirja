#!/usr/bin/env node
/*
 * Kohdekartan nähtävyyksien tarkat sijainnit Wikidatasta (omistaja 28.10.2026: nostot striimikartalle oikeille
 * paikoilleen). Käyttö:  node tools/sisalto/kohdesijainnit.mjs pariisi [lontoo …] | --kaikki
 * Kohteen id = "<kaupunki>:<nimi>" (sama kuin nähtävyysjuttujen avain). Wiki-kohteille: fi- tai en-Wikipedian
 * artikkelin Wikidata-Q ja sen koordinaatti (P625); wiki-tyhjille nostokohteille: sama paikka kuin lähin wiki-kohde
 * (alle 150 m), muuten oma kartan piste. Tulos: data/kohdekartat-sijainnit.json (kaupunki kerrallaan päivittyy).
 * Pyynnöt: yksi erä kerrallaan, User-Agent ja 1 s tauko (Wikimedian API-ohje).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const UA = 'Matkakirja-sisaltokirjuri/1.0 (sami.reivinen@vvi.fi)';
const TULOS = path.join(JUURI, 'data', 'kohdekartat-sijainnit.json');
const tauko = (ms) => new Promise((r) => setTimeout(r, ms));

async function api(url) {
  for (let i = 0; i < 4; i += 1) {
    const r = await fetch(url, { headers: { 'User-Agent': UA } });
    if (r.ok) { await tauko(1000); return r.json(); }
    await tauko(3000 * (i + 1));
  }
  throw new Error(`API ei vastaa: ${url}`);
}

async function qidit(kieli, otsikot) {
  const ulos = new Map();
  for (let i = 0; i < otsikot.length; i += 40) {
    const osa = otsikot.slice(i, i + 40);
    const u = `https://${kieli}.wikipedia.org/w/api.php?action=query&prop=pageprops&ppprop=wikibase_item&redirects=1&format=json&titles=${encodeURIComponent(osa.join('|'))}`;
    const j = await api(u);
    const alias = new Map();
    for (const n of j.query?.normalized ?? []) alias.set(n.to, n.from);
    const uusi = new Map(); // lopullinen otsikko -> alkuperäinen
    for (const n of j.query?.redirects ?? []) uusi.set(n.to, alias.get(n.from) ?? n.from);
    for (const sivu of Object.values(j.query?.pages ?? {})) {
      const q = sivu.pageprops?.wikibase_item;
      if (!q) continue;
      const alku = uusi.get(sivu.title) ?? alias.get(sivu.title) ?? sivu.title;
      ulos.set(alku, { qid: q, otsikko: sivu.title, kieli });
    }
  }
  return ulos;
}

async function koordinaatit(qs) {
  const ulos = new Map();
  for (let i = 0; i < qs.length; i += 40) {
    const osa = qs.slice(i, i + 40);
    const j = await api(`https://www.wikidata.org/w/api.php?action=wbgetentities&props=claims&format=json&ids=${osa.join('|')}`);
    for (const [q, e] of Object.entries(j.entities ?? {})) {
      const c = e.claims?.P625;
      if (!c?.length) continue;
      const hyva = c.find((x) => x.rank === 'preferred') ?? c.find((x) => x.rank !== 'deprecated') ?? c[0];
      const v = hyva.mainsnak?.datavalue?.value;
      if (v) ulos.set(q, { lat: Number(v.latitude.toFixed(5)), lon: Number(v.longitude.toFixed(5)) });
    }
  }
  return ulos;
}

const etaisyysM = (a, b) => {
  const R = 6371000, r = Math.PI / 180;
  const dLat = (b.lat - a.lat) * r, dLon = (b.lon - a.lon) * r;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};

const { KAUPUNKIKARTAT } = await import(path.join(JUURI, 'js/packs/maakartat.js'));
const args = process.argv.slice(2);
const kaupungit = args.includes('--kaikki') ? Object.keys(KAUPUNKIKARTAT) : args;
if (!kaupungit.length) { console.error('Anna kaupunki-id:t tai --kaikki'); process.exit(2); }

const tulos = fs.existsSync(TULOS) ? JSON.parse(fs.readFileSync(TULOS, 'utf8')) : {};
for (const kid of kaupungit) {
  const kartta = KAUPUNKIKARTAT[kid];
  if (!kartta) { console.error('Ei kaupunkia:', kid); continue; }
  const kohteet = kartta.kohteet ?? [];
  const wikit = [...new Set(kohteet.map((k) => k.wiki).filter(Boolean))];
  const fi = await qidit('fi', wikit);
  const en = await qidit('en', wikit.filter((w) => !fi.has(w)));
  const qMap = new Map([...en, ...fi]);
  const koord = await koordinaatit([...new Set([...qMap.values()].map((x) => x.qid))]);
  const rivit = kohteet.map((k) => {
    const id = `${kid}:${k.nimi}`;
    const kartanPiste = { lat: k.lat, lon: k.lon };
    const q = k.wiki ? qMap.get(k.wiki) : null;
    const c = q ? koord.get(q.qid) : null;
    if (q && c) {
      const ero = Math.round(etaisyysM(kartanPiste, c));
      return { id, nimi: k.nimi, qid: q.qid, lat: c.lat, lon: c.lon, lahde: `wikidata ${q.qid} P625 (${q.kieli}.wikipedia: ${q.otsikko})`, kartanPiste, eroKartanPisteesta_m: ero };
    }
    return { id, nimi: k.nimi, qid: q?.qid ?? null, lat: k.lat, lon: k.lon, lahde: k.wiki ? 'kartan piste (Wikidatassa ei koordinaattia / artikkelia ei löytynyt)' : 'kartan piste (nostokohde ilman wikiä)', kartanPiste, eroKartanPisteesta_m: 0 };
  });
  // Nostokohteet ilman omaa Wikidataa: sama paikka kuin lähin wiki-kohde (alle 150 m), jotta nosto istuu nähtävyyden kohdalle.
  for (const r of rivit.filter((x) => x.qid === null)) {
    let paras = null;
    for (const m of rivit.filter((x) => x.qid && x.lahde.startsWith('wikidata'))) {
      const d = etaisyysM(r.kartanPiste, { lat: m.lat, lon: m.lon });
      if (!paras || d < paras.d) paras = { m, d };
    }
    if (paras && paras.d < 150) { r.samaKuin = paras.m.id; r.lat = paras.m.lat; r.lon = paras.m.lon; r.lahde = `sama paikka kuin ${paras.m.nimi} (kartan piste ${Math.round(paras.d)} m päässä)`; }
  }
  tulos[kid] = rivit;
  const huom = rivit.filter((r) => r.eroKartanPisteesta_m > 300).length;
  console.log(`${kid}: ${rivit.length} kohdetta, Wikidata-Q ${rivit.filter((r) => r.lahde.startsWith('wikidata')).length}, yli 300 m kartan pisteestä ${huom}`);
}
fs.mkdirSync(path.dirname(TULOS), { recursive: true });
fs.writeFileSync(TULOS, `${JSON.stringify(Object.fromEntries(Object.entries(tulos).sort()), null, 1)}\n`);
