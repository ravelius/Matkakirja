#!/usr/bin/env node
/*
 * Kohdekarttojen kohteille tunniste (Wikidata-Q tai OSM-id), jotta sijainnit voi tarkistaa koneellisesti
 * (PT 2.11.2026, työlista "Kohteiden sijainnit tarkistettaviksi koneellisesti"; Karttaseppä 31.10.: vain 325/1996
 * kohteella oli wiki-kenttä, muut kuten Abbey Roadin suojatie eivät olleet tarkistettavissa).
 *
 * Käyttö:  node tools/sisalto/kohdetunnisteet.mjs [kaupunki …] [--kaikki] [--ehdokkaat <polku.json>]
 * Kohteet, joilla ei ole wiki-kenttää eikä tunnistetta data/kohdetunnisteet.json:ssa: Wikidatan geohaku 250 m säteeltä
 * (list=geosearch) → nimet ja aliakset (KIELET, wbgetentities) → nimivertailu kohteen nimeen. Nostokohde saa paikkansa
 * tunnisteen, kun paikan nimi sisältyy kohteen nimeen ("Millennium Bridgen portaat" → Millennium Bridge, pisteet 0,9).
 * Tasapisteissä voittaa selvästi tunnetumpi (sivustolinkkejä ≥ 2×). VARMA (pisteet ≥ 0,85, ≤ 250 m, selvästi paras)
 * kirjataan data/kohdetunnisteet.json:iin tavalla "nimi+säde". Muuten nimihaku (wbsearchentities fi + en): saman nimen
 * kohde yli 250 m mutta alle 30 km päässä = KAUKANA (mahdollinen väärä sijainti, kuten Abbey Road Mayfairissa).
 * Ehdokkaat ja KAUKANA-osumat menevät --ehdokkaat-tiedostoon käsin tarkistettaviksi. Käsin lukittuja ("käsin")
 * ei kosketa. Kohteen id = "<kaupunki>:<nimi>" (sama kuin kohdesijainnit.mjs:ssä).
 * Jo arvioidut (ehdokkaat-tiedostossa) ohitetaan, ellei --uudelleen; ajo jatkuu keskeytyksestä kaupunki kerrallaan.
 * Pyynnöt: peräkkäin, User-Agent, 0,2 s tauko, kiireessä (cirrussearch-too-busy) odotus kasvaa.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const UA = 'Matkakirja-karttaseppa/1.0 (vvi@vvi.fi)';
const TUNNISTEET = path.join(JUURI, 'data', 'kohdetunnisteet.json');
const SADE = 250;
const tauko = (ms) => new Promise((r) => setTimeout(r, ms));

async function api(params) {
  const url = `https://www.wikidata.org/w/api.php?format=json&${new URLSearchParams(params)}`;
  for (let i = 0; i < 8; i += 1) {
    const r = await fetch(url, { headers: { 'User-Agent': UA } }).catch(() => null);
    if (r?.ok) {
      const j = await r.json();
      if (!j.error) { await tauko(200); return j; }
      if (!/busy|ratelimit|maxlag/i.test(j.error.code)) throw new Error(`${j.error.code}: ${url}`);
    }
    await tauko(5000 * 2 ** i);
  }
  throw new Error(`API ei vastaa: ${url}`);
}

const KIELET = 'fi|en|mul|sv|da|nb|de|nl|fr|es|ca|pt|it|pl|cs|sk|sl|hr|sr|hu|ro|bg|el|et|lv|lt|ru|uk|tr|ar|ga|is';
const TIEDOT = new Map(); // Q → { nimet, linkit, koord }
async function tiedot(qs) {
  const puuttuu = [...new Set(qs)].filter((q) => !TIEDOT.has(q));
  for (let i = 0; i < puuttuu.length; i += 50) {
    const j = await api({ action: 'wbgetentities', props: 'labels|aliases|sitelinks|claims', languages: KIELET, ids: puuttuu.slice(i, i + 50).join('|') });
    for (const [q, e] of Object.entries(j.entities ?? {})) {
      const n = new Set(Object.values(e.labels ?? {}).map((x) => x.value));
      for (const a of Object.values(e.aliases ?? {})) for (const x of a) n.add(x.value);
      const c = (e.claims?.P625 ?? []).find((x) => x.rank !== 'deprecated')?.mainsnak?.datavalue?.value;
      TIEDOT.set(q, { nimet: [...n], linkit: Object.keys(e.sitelinks ?? {}).length, koord: c ? { lat: c.latitude, lon: c.longitude } : null });
    }
  }
}
const etaisyysM = (a, b) => {
  const R = 6371000, r = Math.PI / 180;
  const dLat = (b.lat - a.lat) * r, dLon = (b.lon - a.lon) * r;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};

const normaali = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
const parit = (s) => { const m = new Map(); for (let i = 0; i < s.length - 1; i += 1) { const p = s.slice(i, i + 2); m.set(p, (m.get(p) ?? 0) + 1); } return m; };
function dice(a, b) {
  const A = parit(a), B = parit(b); let y = 0, n = 0;
  for (const [p, c] of A) { y += Math.min(c, B.get(p) ?? 0); n += c; }
  for (const c of B.values()) n += c;
  return n ? (2 * y) / n : 0;
}
// sanat vastaavat, jos samat tai toinen on toisen alku (≥ 4 merkkiä: "Roadin" ~ "Road", "katedraali" ~ "katedraalin")
const sanaSama = (x, y) => x === y || (Math.min(x.length, y.length) >= 4 && (x.startsWith(y) || y.startsWith(x)));
function pisteet(nimi, ehdokas) {
  const a = normaali(nimi), b = normaali(ehdokas);
  if (!a || !b) return 0;
  if (a === b) return 1;
  const sa = a.split(' '), sb = b.split(' ');
  const osui = sa.filter((x) => sb.some((y) => sanaSama(x, y))).length;
  let p = Math.max(dice(a.replace(/ /g, ''), b.replace(/ /g, '')), (2 * osui) / (sa.length + sb.length));
  // paikan nimi kokonaan kohteen nimessä peräkkäisinä sanoina (nostokohde paikassa)
  if (b.length >= 5) for (let i = 0; i + sb.length <= sa.length; i += 1) if (sb.every((y, j) => sanaSama(sa[i + j], y))) p = Math.max(p, 0.9);
  return p;
}
function arvioi(nimi, qs, piste) {
  return qs.map((q) => {
    const t = TIEDOT.get(q); let paras = 0, osuma = '';
    for (const n of t?.nimet ?? []) { const p = pisteet(nimi, n); if (p > paras) { paras = p; osuma = n; } }
    return { qid: q, nimi: osuma, pisteet: Number(paras.toFixed(2)), linkit: t?.linkit ?? 0, etaisyys_m: t?.koord ? Math.round(etaisyysM(piste, t.koord)) : null };
  }).sort((a, b) => b.pisteet - a.pisteet || b.linkit - a.linkit);
}
// selvästi paras: 0,1 pisteen ero, tai tasapisteissä (≤ 0,05) vähintään kaksinkertainen sivustolinkkimäärä
const selva = (p1, p2) => !p2 || p1.pisteet - p2.pisteet >= 0.1 || (p1.pisteet - p2.pisteet <= 0.05 && p1.linkit >= 2 * Math.max(p2.linkit, 1));

const { KAUPUNKIKARTAT } = await import(path.join(JUURI, 'js/packs/maakartat.js'));
const args = process.argv.slice(2);
const ei = new Set(); const ehdIx = args.indexOf('--ehdokkaat');
const ehdPolku = ehdIx >= 0 ? args[ehdIx + 1] : null; if (ehdPolku) ei.add(ehdPolku);
const kaupungit = args.includes('--kaikki') ? Object.keys(KAUPUNKIKARTAT) : args.filter((a) => !a.startsWith('--') && !ei.has(a));
if (!kaupungit.length) { console.error('Anna kaupunki-id:t tai --kaikki'); process.exit(2); }

const tunnisteet = fs.existsSync(TUNNISTEET) ? JSON.parse(fs.readFileSync(TUNNISTEET, 'utf8')) : {};
const ehdokkaat = ehdPolku && fs.existsSync(ehdPolku) ? JSON.parse(fs.readFileSync(ehdPolku, 'utf8')) : {};
const tallenna = () => {
  fs.writeFileSync(TUNNISTEET, `${JSON.stringify(Object.fromEntries(Object.entries(tunnisteet).sort()), null, 1)}\n`);
  if (ehdPolku) fs.writeFileSync(ehdPolku, `${JSON.stringify(Object.fromEntries(Object.entries(ehdokkaat).sort()), null, 1)}\n`);
};
const paiva = new Date().toLocaleDateString('fi-FI');
for (const kid of kaupungit) {
  const kohteet = (KAUPUNKIKARTAT[kid]?.kohteet ?? []).filter((k) => !k.wiki && !tunnisteet[`${kid}:${k.nimi}`]
    && (args.includes('--uudelleen') || !ehdokkaat[`${kid}:${k.nimi}`]));
  let varmoja = 0, kaukaisia = 0;
  for (const k of kohteet) {
    const id = `${kid}:${k.nimi}`;
    const piste = { lat: k.lat, lon: k.lon };
    const g = await api({ action: 'query', list: 'geosearch', gscoord: `${k.lat}|${k.lon}`, gsradius: SADE, gslimit: 50 });
    const lahella = (g.query?.geosearch ?? []).map((x) => x.title).filter((q) => /^Q\d+$/.test(q));
    await tiedot(lahella);
    const arviot = arvioi(k.nimi, lahella, piste);
    const [p1, p2] = arviot;
    if (p1 && p1.pisteet >= 0.85 && selva(p1, p2)) {
      tunnisteet[id] = { qid: p1.qid, tapa: 'nimi+säde', wikidataNimi: p1.nimi, pisteet: p1.pisteet, etaisyys_m: p1.etaisyys_m, pvm: paiva };
      delete ehdokkaat[id]; varmoja += 1; continue;
    }
    const haku = new Set();
    for (const kieli of ['fi', 'en']) {
      const s = await api({ action: 'wbsearchentities', search: k.nimi, language: kieli, uselang: kieli, type: 'item', limit: 7 });
      for (const x of s.search ?? []) haku.add(x.id);
    }
    await tiedot([...haku]);
    const kaukana = arvioi(k.nimi, [...haku], piste).filter((a) => a.pisteet >= 0.85 && a.etaisyys_m !== null && a.etaisyys_m > SADE && a.etaisyys_m < 30000);
    ehdokkaat[id] = { lat: k.lat, lon: k.lon, ehdokkaat: arviot.filter((a) => a.pisteet >= 0.5).slice(0, 3), ...(kaukana.length ? { kaukana: kaukana.slice(0, 3) } : {}) };
    if (kaukana.length) kaukaisia += 1;
  }
  tallenna();
  console.log(`${kid}: wikittömiä ${kohteet.length}, varma tunniste ${varmoja}, KAUKANA ${kaukaisia}`);
}
