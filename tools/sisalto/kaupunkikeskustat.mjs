#!/usr/bin/env node
/*
 * Euroopan kaupunkien keskipisteet saapumiszoomaukselle (omistaja 2.11.2026 klo 21.42: zoomaus ja nostot kaikkiin
 * Euroopan kaupunkeihin; KK:n suunnitelma 20261102-nostot-ja-zoomaus-kaikkiin.md, osa B).
 * Käyttö:  node tools/sisalto/kaupunkikeskustat.mjs --vienti <vientipaketti> [--valimuisti <kansio>]
 *
 * Lähtöpiste = kaupungin pallopiste (PALLON_KAUPUNKIPISTEET, Wikidata P625). Jokainen tarkistetaan OpenStreetMapista
 * (Overpass-rajapinta, yksi kysely kerrallaan, User-Agent ja tauko):
 *   - kaupungin place-solmu (wikidata=Q; muuten lähin place=city/town 5 km:n säteellä) ja sen etäisyys pisteestä,
 *   - onko piste vesialueen sisällä (natural=water, waterway=riverbank, landuse=reservoir),
 *   - katuja 100 m:n säteellä (meri ja puistot jäävät kiinni),
 *   - lähin nimetty aukio 300 m:n säteellä (perusteluksi).
 * Poikkeama > 700 m, vesi tai ei katuja → kasin: true, ja piste ratkaistaan KASIN-taulussa lähteineen.
 * Alueet (alpit, islanti, kreeta, lappi, sisilia) rajataan kokonaisina (suunnitelman osa A, PT 2.11. 22.2x): ei keskipistettä,
 * vaan rajaus = alueen nostojen (vientipaketin karttavalot) ja kohdekartan kohteiden ulkoraja + marginaali (10 %, vähintään 5 km).
 * Alueen jäsenet: ALUEEN_JASEN alla (maakunta tai maa; Alpit: lähin Euroopan kaupunki on alpit ja ≤ 70 km).
 * Tulos: data/kaupunkikeskustat.json (id → lat, lon, lähde, perustelu, tarkistus; alueille rajaus).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const UA = 'Matkakirja-karttaseppa/1.0 (sami.reivinen@vvi.fi)';
const TULOS = path.join(JUURI, 'data', 'kaupunkikeskustat.json');
// Julkiset Overpass-palvelimet vuorotellen kuten tools/kartta/tee-tiet.mjs (overpass-api.de ruuhkautuu ja palauttaa 502/504).
const OVERPASS = ['https://overpass-api.de/api/interpreter', 'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.private.coffee/api/interpreter'];
const RAJA_M = 700;
const ALUEET = new Set(['alpit', 'islanti', 'kreeta', 'lappi', 'sisilia']);
const ALUEEN_JASEN = {
  islanti: (v) => v.maa === 'ISL',
  kreeta: (v) => v.maakunta === 'GRC:Kriti',
  lappi: (v) => v.maakunta === 'FIN:Lapland',
  sisilia: (v) => v.maakunta === 'ITA:Sicily',
  alpit: (v, lahin) => lahin.id === 'alpit' && lahin.m <= 70000,
};
const tauko = (ms) => new Promise((r) => setTimeout(r, ms));

// Käsin ratkaistut pisteet (lähde ja perustelu jokaiselle). Täytetään ensimmäisen ajon kasin-listan perusteella.
const KASIN = {
  pariisi: { lat: 48.857, lon: 2.351, lahde: 'PiirrosKerros.Keskusta (Raamattu 2.204; omistaja 2.11. 08.45 "aina keskustaan")',
    perustelu: 'piirroskaupungin lehtikioskin keskusta Hôtel de Villen edustalla; sama kuin natiivin piirros (NUI 2.11.)' },
  // Ensimmäisen ajon tarkistettavat (KS 3.11.2026): OSM-paikkasolmu > 700 m tai piste vedessä.
  barcelona: { lat: 41.388, lon: 2.17, lahde: 'pallopiste (Wikidata Q1492 P625)',
    perustelu: 'pallopiste Plaça de Catalunyalla (125 m); OSM-solmu Barri Gòticissa 843 m, molemmat keskustaa, aukio pidetään' },
  amsterdam: { lat: 52.3731, lon: 4.8928, lahde: 'en-Wikipedia Dam Square (Wikidata Q839050)',
    perustelu: 'pallopiste oli Leidsepleinin laidalla; Dam on vanhan keskustan pääaukio (OSM-solmu 9 m)' },
  berliini: { lat: 52.517, lon: 13.383, lahde: 'pallopiste (Wikidata Q64 P625)',
    perustelu: 'pallopiste Unter den Lindenillä Pariser Platzin ja Friedrichstraßen välissä; OSM-solmu Museosaarella 822 m, molemmat keskustaa' },
  budapest: { lat: 47.492, lon: 19.051, lahde: 'pallopiste (Wikidata Q1781 P625)',
    perustelu: 'pallopiste Pestin keskustassa (Belváros); OSM-solmu on Ketjusillan Budan päässä 1 040 m' },
  ateena: { lat: 37.97556, lon: 23.73472, lahde: 'en-Wikipedia Syntagma Square (Wikidata Q1137997)',
    perustelu: 'pallopiste oli Omonoialla; Syntagma on keskusaukio Plakan ja Akropoliin vieressä (OSM-solmu 1 m)' },
  dubrovnik: { lat: 42.64139, lon: 18.10806, lahde: 'en-Wikipedia Stradun (Wikidata Q1818100)',
    perustelu: 'vanhan kaupungin pääkatu Stradun muurien sisällä; OSM-solmu oli Gružissa 1,5 km lännessä' },
  sarajevo: { lat: 43.859, lon: 18.43, lahde: 'en-Wikipedia Baščaršija (Wikidata Q629641)',
    perustelu: 'vanha kauppatori Baščaršija; pallopiste oli rinteellä 1,3 km luoteeseen' },
  bukarest: { lat: 44.43614, lon: 26.10268, lahde: 'OSM-paikkasolmu București (wikidata Q19660)',
    perustelu: 'Piața Universității vanhan keskustan (Lipscani) laidalla; pallopiste oli 2,6 km etelässä harvojen katujen alueella' },
  odessa: { lat: 46.4843, lon: 30.73229, lahde: 'OSM-paikkasolmu Одеса (wikidata Q1874)',
    perustelu: 'keskusta Deribasivskan tuntumassa; pallopiste oli 800 m etelään' },
  pietari: { lat: 59.93917, lon: 30.31583, lahde: 'en-Wikipedia Palace Square (Wikidata Q1132624)',
    perustelu: 'Palatsiaukio Talvipalatsin edessä; pallopiste oli Pietari-Paavalin linnoituksessa joen toisella puolella' },
  tukholma: { lat: 59.32512, lon: 18.07109, lahde: 'OSM-paikkasolmu Stockholm (wikidata Q1754)',
    perustelu: 'Gamla stanin Stortorget; pallopiste oli Norrströmin vedessä' },
  kobenhavn: { lat: 55.676, lon: 12.569, lahde: 'pallopiste (Wikidata Q1748 P625)',
    perustelu: 'pallopiste Rådhuspladsenilla (12 m); OSM-solmu Kongens Nytorvin tuntumassa 1,2 km' },
  tromssa: { lat: 69.65163, lon: 18.95586, lahde: 'OSM-paikkasolmu Tromsø',
    perustelu: 'keskusta Tromsøyan itärannalla; pallopiste oli 3,5 km pohjoisessa' },
};

const args = process.argv.slice(2);
const vi = args.indexOf('--valimuisti');
const VALIMUISTI = vi >= 0 ? args[vi + 1] : null;
if (VALIMUISTI) fs.mkdirSync(VALIMUISTI, { recursive: true });
const ve = args.indexOf('--vienti');
if (ve < 0) { console.error('Anna --vienti <vientipaketti> (node tools/vienti/vie-sisalto.mjs --ulos …)'); process.exit(2); }
const lueKokoelma = (nimi) => JSON.parse(fs.readFileSync(path.join(args[ve + 1], 'kokoelmat', `${nimi}.json`), 'utf8')).alkiot;

async function haeJson(url, init = {}) {
  for (let i = 0; i < 5; i += 1) {
    try {
      const r = await fetch(url, { ...init, headers: { 'User-Agent': UA, ...(init.headers ?? {}) } });
      if (r.ok) return r.json();
      console.error(`  ${new URL(url).host} ${r.status}, uusi yritys`);
    } catch (virhe) { console.error(`  ${new URL(url).host} ${virhe.message}`); }
    await tauko(10000 * (i + 1));
  }
  throw new Error(`Ei vastausta: ${url}`);
}

async function overpass(kysely, avain) {
  const tiedosto = VALIMUISTI ? path.join(VALIMUISTI, `${avain}.json`) : null;
  if (tiedosto && fs.existsSync(tiedosto)) return JSON.parse(fs.readFileSync(tiedosto, 'utf8'));
  let d = null;
  for (let yritys = 0; !d && yritys < 9; yritys += 1) {
    const palvelin = OVERPASS[yritys % OVERPASS.length];
    try {
      const r = await fetch(palvelin, { method: 'POST', headers: { 'User-Agent': UA, 'content-type': 'application/x-www-form-urlencoded' },
        body: `data=${encodeURIComponent(kysely)}` });
      if (r.ok) d = await r.json(); else console.error(`  ${new URL(palvelin).host} ${r.status}`);
    } catch (virhe) { console.error(`  ${new URL(palvelin).host} ${virhe.message}`); }
    if (!d) await tauko(5000 * (Math.floor(yritys / OVERPASS.length) + 1));
  }
  if (!d) throw new Error('Overpass ei vastannut');
  if (tiedosto) fs.writeFileSync(tiedosto, JSON.stringify(d));
  await tauko(3000);
  return d;
}

async function qidit(otsikot) {
  const ulos = new Map();
  for (let i = 0; i < otsikot.length; i += 40) {
    const osa = otsikot.slice(i, i + 40);
    const j = await haeJson(`https://fi.wikipedia.org/w/api.php?action=query&prop=pageprops&ppprop=wikibase_item&redirects=1&format=json&titles=${encodeURIComponent(osa.join('|'))}`);
    const alias = new Map();
    for (const n of j.query?.normalized ?? []) alias.set(n.to, n.from);
    const uusi = new Map();
    for (const n of j.query?.redirects ?? []) uusi.set(n.to, alias.get(n.from) ?? n.from);
    for (const sivu of Object.values(j.query?.pages ?? {})) {
      const q = sivu.pageprops?.wikibase_item;
      if (q) ulos.set(uusi.get(sivu.title) ?? alias.get(sivu.title) ?? sivu.title, q);
    }
    await tauko(1000);
  }
  return ulos;
}

const etaisyysM = (a, b) => {
  const R = 6371000, r = Math.PI / 180;
  const dLat = (b.lat - a.lat) * r, dLon = (b.lon - a.lon) * r;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};

function kysely(p, qid) {
  const c = `${p.lat},${p.lon}`;
  return `[out:json][timeout:90];
node(around:15000,${c})[place~"^(city|town)$"]["wikidata"="${qid}"];out;
node(around:5000,${c})[place~"^(city|town)$"][name];out;
is_in(${c})->.a;
(area.a[natural=water];area.a[waterway=riverbank];area.a[landuse=reservoir];);out tags;
way(around:100,${c})[highway];out count;
nwr(around:300,${c})[place=square][name];out center tags;`;
}

const { MAAILMANKARTTA: P } = await import(path.join(JUURI, 'js/packs/maailmankartta.js'));
const { PALLON_KAUPUNKIPISTEET: PP } = await import(path.join(JUURI, 'js/packs/maailmankartta-pallopisteet.js'));
const eurooppa = P.cities.filter((c) => P.map.cityManner?.[c.id] === 'europe');
const q = await qidit([...new Set(eurooppa.map((c) => c.wiki).filter(Boolean))]);

const valot = lueKokoelma('karttavalot');
const kohdekartat = new Map(lueKokoelma('kohdekartat').map((k) => [k.id, k]));
const pisteet = eurooppa.map((c) => ({ id: c.id, ...(c.pallo ?? PP[c.id]) }));
function rajaus(id) {
  const jasenet = [];
  for (const v of valot) {
    if (v.lat == null) continue;
    const lahin = pisteet.map((p) => ({ id: p.id, m: etaisyysM(v, p) })).sort((a, b) => a.m - b.m)[0];
    if (ALUEEN_JASEN[id](v, lahin)) jasenet.push({ nimi: v.nimi, lat: v.lat, lon: v.lon });
  }
  for (const k of kohdekartat.get(id)?.kohteet ?? []) if (k.lat != null) jasenet.push({ nimi: k.nimi, lat: k.lat, lon: k.lon });
  const lat = jasenet.map((j) => j.lat), lon = jasenet.map((j) => j.lon);
  const r = { etela: Math.min(...lat), pohjoinen: Math.max(...lat), lansi: Math.min(...lon), ita: Math.max(...lon) };
  const keskiLat = (r.etela + r.pohjoinen) / 2;
  const mLat = Math.max(0.1 * (r.pohjoinen - r.etela), 5000 / 111320);
  const mLon = Math.max(0.1 * (r.ita - r.lansi), 5000 / (111320 * Math.cos(keskiLat * Math.PI / 180)));
  const pyor = (x) => Math.round(x * 1e4) / 1e4;
  return { rajaus: { etela: pyor(r.etela - mLat), pohjoinen: pyor(r.pohjoinen + mLat), lansi: pyor(r.lansi - mLon), ita: pyor(r.ita + mLon) },
    jasenet: jasenet.length, uloimmat: {
      etela: jasenet.find((j) => j.lat === r.etela).nimi, pohjoinen: jasenet.find((j) => j.lat === r.pohjoinen).nimi,
      lansi: jasenet.find((j) => j.lon === r.lansi).nimi, ita: jasenet.find((j) => j.lon === r.ita).nimi } };
}

const tulos = {};
for (const c of eurooppa) {
  const piste = c.pallo ?? PP[c.id];
  if (ALUEET.has(c.id)) {
    const r = rajaus(c.id);
    tulos[c.id] = { nimi: c.name, alue: true, keskusta: null, ...r,
      perustelu: `alue rajataan kokonaisena (suunnitelman osa A, PT 2.11.): ${r.jasenet} nostoa ja kohdetta, marginaali 10 % (≥ 5 km)` };
    console.log(`${c.id}: alue, ${r.jasenet} jäsentä, rajaus ${JSON.stringify(r.rajaus)}`);
    continue;
  }
  const qid = q.get(c.wiki) ?? null;
  const d = await overpass(kysely(piste, qid ?? 'Q0'), c.id);
  // Overpass palauttaa osat järjestyksessä; eritellään tyypin ja tunnisteiden mukaan.
  const solmut = d.elements.filter((e) => e.type === 'node' && e.tags?.place && ['city', 'town'].includes(e.tags.place));
  const omaSolmu = solmut.find((e) => e.tags.wikidata === qid)
    ?? solmut.sort((a, b) => etaisyysM(piste, a) - etaisyysM(piste, b))[0] ?? null;
  const vedet = d.elements.filter((e) => e.type === 'area').map((e) => e.tags?.name ?? e.tags?.natural ?? e.tags?.waterway);
  const kadut = Number(d.elements.find((e) => e.type === 'count')?.tags?.ways ?? 0);
  const aukiot = d.elements.filter((e) => e.tags?.place === 'square')
    .map((e) => ({ nimi: e.tags.name, m: Math.round(etaisyysM(piste, e.center ?? e)) })).sort((a, b) => a.m - b.m);
  const eroSolmuun = omaSolmu ? Math.round(etaisyysM(piste, omaSolmu)) : null;
  const tarkistus = {
    qid,
    osmPaikka: omaSolmu ? { id: `node/${omaSolmu.id}`, nimi: omaSolmu.tags.name, wikidataSama: omaSolmu.tags.wikidata === qid,
      lat: Number(omaSolmu.lat.toFixed(5)), lon: Number(omaSolmu.lon.toFixed(5)), ero_m: eroSolmuun } : null,
    vesi: vedet, katuja100m: kadut, lahinAukio: aukiot[0] ?? null,
  };
  const syyt = [];
  if (eroSolmuun == null) syyt.push('ei OSM-paikkasolmua');
  else if (eroSolmuun > RAJA_M) syyt.push(`OSM-paikkasolmu ${eroSolmuun} m`);
  if (vedet.length) syyt.push(`vedessä (${vedet.join(', ')})`);
  if (!kadut) syyt.push('ei katuja 100 m:n säteellä');
  const kasin = KASIN[c.id];
  tulos[c.id] = kasin
    ? { nimi: c.name, lat: kasin.lat, lon: kasin.lon, lahde: kasin.lahde, perustelu: kasin.perustelu, pallopiste: piste, tarkistus, kasin: true, syyt }
    : { nimi: c.name, lat: piste.lat, lon: piste.lon, lahde: `pallopiste (Wikidata ${qid} P625)`,
      perustelu: syyt.length ? `TARKISTETTAVA: ${syyt.join('; ')}`
        : `OSM-paikkasolmu ${eroSolmuun} m, ${kadut} katua 100 m:n säteellä${aukiot[0] ? `, ${aukiot[0].nimi} ${aukiot[0].m} m` : ''}`,
      tarkistus, kasin: syyt.length > 0, syyt };
  console.log(`${c.id}: solmu ${eroSolmuun ?? '–'} m, kadut ${kadut}, vesi ${vedet.length}${syyt.length ? `  ← ${syyt.join('; ')}` : ''}`);
}
fs.writeFileSync(TULOS, `${JSON.stringify(tulos, null, 1)}\n`);
const auki = Object.entries(tulos).filter(([id, v]) => v.kasin && !KASIN[id]).length;
console.log(`Kirjoitettu ${path.relative(JUURI, TULOS)}: ${Object.keys(tulos).length} kaupunkia, tarkistettavia ${auki}`);
