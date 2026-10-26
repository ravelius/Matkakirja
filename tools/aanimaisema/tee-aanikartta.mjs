#!/usr/bin/env node
/*
 * KAUPUNKIÄÄNIMAISEMAN ÄÄNIKARTTA (omistaja hyväksyi pilotin 6.10.2026 21.4x, Päätoimittaja; mikseri Siirtoseppä
 * siirtoseppa/aanimaisema, AaniKartta.Lue). OpenStreetMapista (Overpass) esilaskettu ruudukko kaupungeittain: 100 m:n
 * ruudut, jokaisessa 13 kerroksen painot 0–1 noin 300 m:n säteeltä. Pelissä ei tehdä OSM-kyselyjä.
 *
 * Muoto (sovittu Siirtosepän kanssa): aanet/aanikartta-v1/<kaupunki-id>.json =
 *   { versio: 1, kaupunki, ruutu_m: 100, sade_m: 300, lounas: { lat, lon }, askel: { lat, lon }, rivit, sarakkeet,
 *     kerrokset: [13], painot: { <kerros>: base64(Uint8, rivit × sarakkeet, rivi kerrallaan etelästä pohjoiseen) },
 *     kirkot: [{ lat, lon, nimi }], lahde: 'OpenStreetMap (ODbL)' }
 * Paino: kohteiden pisteet (viivat 20 m:n välein, alueet 40 m:n hilassa, solmut sellaisenaan) × kerroksen paino ×
 * lineaarinen vaimennus (1 − d / 300 m); kerros normalisoidaan kaupungin 95. persentiiliin ja leikataan 0–1:een.
 *
 * Käyttö: node tools/aanimaisema/tee-aanikartta.mjs --kaupunki pariisi --lat 48.8566 --lon 2.3522 --sade-km 6
 *         --ulos <vientipaketti>   (Overpass: yksi kysely kerrallaan, kohtelias tauko)
 */
import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const arg = (n, o = null) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : o; };
const UA = 'Matkakirja-aanikartta/1.0 (https://matkakirja.app; peli@matkakirja.app)';
// Julkiset Overpass-palvelimet vuorotellen (overpass-api.de ruuhkautuu ja palauttaa 429/504).
const OVERPASS = ['https://overpass-api.de/api/interpreter', 'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.private.coffee/api/interpreter'];
export const KERROKSET = ['liikenne_hiljainen', 'liikenne_vilkas', 'raitiovaunu', 'rautatie', 'satama', 'aallot', 'kanava',
  'puisto', 'suihkulahde', 'tori', 'kahvila', 'vakijoukko', 'kirkko'];
const RUUTU_M = 100, SADE_M = 300;

/** Overpass-suodattimet kerroksittain: [suodatin, paino]. */
const LAHTEET = {
  liikenne_vilkas: [['way["highway"~"^(motorway|trunk|primary)(_link)?$"]', 1], ['way["highway"~"^secondary(_link)?$"]', 0.6]],
  liikenne_hiljainen: [['way["highway"~"^(tertiary|residential|unclassified)$"]', 0.5], ['way["highway"="living_street"]', 0.3]],
  raitiovaunu: [['way["railway"="tram"]', 1]],
  rautatie: [['way["railway"~"^(rail|light_rail)$"]["service"!~"."]', 1], ['node["railway"="station"]', 3]],
  satama: [['way["landuse"~"^(port|harbour)$"]', 1], ['way["leisure"="marina"]', 1], ['way["man_made"="pier"]', 0.6], ['node["harbour"="yes"]', 3]],
  aallot: [['way["natural"="coastline"]', 1], ['way["natural"="beach"]', 1]],
  kanava: [['way["waterway"~"^(canal|river)$"]', 1], ['way["natural"="water"]["water"~"^(river|canal)$"]', 0.4]],
  puisto: [['way["leisure"~"^(park|garden)$"]', 1], ['way["landuse"="cemetery"]', 0.4]],
  suihkulahde: [['node["amenity"="fountain"]', 1], ['way["amenity"="fountain"]', 1]],
  tori: [['node["amenity"="marketplace"]', 2], ['way["amenity"="marketplace"]', 1], ['way["building"="market"]', 1]],
  kahvila: [['node["amenity"~"^(cafe|restaurant|bar|pub)$"]', 1]],
  vakijoukko: [['way["place"="square"]', 1], ['way["highway"="pedestrian"]', 0.8], ['node["tourism"="attraction"]', 1.5]],
  kirkko: [['node["amenity"="place_of_worship"]["religion"="christian"]', 1], ['way["amenity"="place_of_worship"]["religion"="christian"]', 1]],
};

const odota = (ms) => new Promise((r) => setTimeout(r, ms));
async function overpass(kysely, valimuisti) {
  if (valimuisti && existsSync(valimuisti)) return JSON.parse(readFileSync(valimuisti, 'utf8'));
  for (let yritys = 0; yritys < 9; yritys += 1) {
    const palvelin = OVERPASS[yritys % OVERPASS.length];
    try {
      const v = await fetch(palvelin, { method: 'POST', headers: { 'user-agent': UA, 'content-type': 'application/x-www-form-urlencoded' },
        body: `data=${encodeURIComponent(kysely)}` });
      if (v.ok) { const d = await v.json(); if (valimuisti) writeFileSync(valimuisti, JSON.stringify(d)); return d; }
      console.error(`    Overpass ${new URL(palvelin).host} ${v.status}, uusi yritys`);
    } catch (virhe) { console.error(`    Overpass ${new URL(palvelin).host} ${virhe.message}`); }
    await odota(10000 * (Math.floor(yritys / OVERPASS.length) + 1));
  }
  throw new Error('Overpass ei vastannut');
}

const M_LAT = 111320;
const mLon = (lat) => 111320 * Math.cos((lat * Math.PI) / 180);

/** Elementti → näytepisteet [{lat, lon}]. Viivat 20 m:n välein; suljetut alueet 40 m:n hilassa sisältä. */
function naytteet(e) {
  if (e.type === 'node') return [{ lat: e.lat, lon: e.lon }];
  const g = e.geometry ?? []; if (g.length < 2) return g;
  const suljettu = g.length > 3 && g[0].lat === g.at(-1).lat && g[0].lon === g.at(-1).lon;
  const pisteet = [];
  for (let i = 1; i < g.length; i += 1) {
    const a = g[i - 1], b = g[i]; const k = mLon(a.lat);
    const pituus = Math.hypot((b.lat - a.lat) * M_LAT, (b.lon - a.lon) * k);
    const n = Math.max(1, Math.ceil(pituus / 20));
    for (let j = 0; j < n; j += 1) pisteet.push({ lat: a.lat + ((b.lat - a.lat) * j) / n, lon: a.lon + ((b.lon - a.lon) * j) / n });
  }
  if (suljettu) {
    const lats = g.map((p) => p.lat), lons = g.map((p) => p.lon);
    const [la0, la1, lo0, lo1] = [Math.min(...lats), Math.max(...lats), Math.min(...lons), Math.max(...lons)];
    const dLat = 40 / M_LAT, dLon = 40 / mLon(la0);
    for (let la = la0; la <= la1; la += dLat) for (let lo = lo0; lo <= lo1; lo += dLon) {
      let sisalla = false;
      for (let i = 0, j = g.length - 1; i < g.length; j = i++) {
        if ((g[i].lat > la) !== (g[j].lat > la) && lo < ((g[j].lon - g[i].lon) * (la - g[i].lat)) / (g[j].lat - g[i].lat) + g[i].lon) sisalla = !sisalla;
      }
      if (sisalla) pisteet.push({ lat: la, lon: lo });
    }
  }
  return pisteet;
}

export async function teeAanikartta({ kaupunki, lat, lon, sadeKm, valimuistiKansio = null, loki = console.log }) {
  const dLat = (sadeKm * 1000) / M_LAT, dLon = (sadeKm * 1000) / mLon(lat);
  const bbox = [lat - dLat, lon - dLon, lat + dLat, lon + dLon].map((x) => x.toFixed(5)).join(',');
  const askel = { lat: RUUTU_M / M_LAT, lon: RUUTU_M / mLon(lat) };
  const lounas = { lat: lat - dLat, lon: lon - dLon };
  const rivit = Math.ceil((2 * dLat) / askel.lat), sarakkeet = Math.ceil((2 * dLon) / askel.lon);
  const painot = {}, kirkot = [];
  const r = Math.ceil(SADE_M / RUUTU_M);
  for (const kerros of KERROKSET) {
    const summa = new Float32Array(rivit * sarakkeet);
    let rantaviivaa = 0;
    for (const [suodatin, paino] of LAHTEET[kerros]) {
      const kysely = `[out:json][timeout:180];(${suodatin}(${bbox}););out geom tags qt;`;
      const avain = valimuistiKansio ? join(valimuistiKansio, `${kaupunki}-${kerros}-${Buffer.from(suodatin).toString('base64url').slice(0, 40)}.json`) : null;
      const d = await overpass(kysely, avain);
      let n = 0;
      for (const e of d.elements ?? []) {
        if (kerros === 'kirkko' && e.tags?.name) {
          const p = e.type === 'node' ? e : (e.geometry?.[0] ?? null);
          if (p) kirkot.push({ lat: Number(p.lat.toFixed(5)), lon: Number(p.lon.toFixed(5)), nimi: e.tags.name, wd: Boolean(e.tags.wikidata) });
        }
        if (kerros === 'aallot' && /coastline/.test(suodatin)) rantaviivaa += (d.elements ?? []).length;
        for (const p of naytteet(e)) {
          n += 1;
          const ri = Math.floor((p.lat - lounas.lat) / askel.lat), si = Math.floor((p.lon - lounas.lon) / askel.lon);
          for (let a = ri - r; a <= ri + r; a += 1) for (let b = si - r; b <= si + r; b += 1) {
            if (a < 0 || b < 0 || a >= rivit || b >= sarakkeet) continue;
            const kLat = lounas.lat + (a + 0.5) * askel.lat, kLon = lounas.lon + (b + 0.5) * askel.lon;
            const dist = Math.hypot((kLat - p.lat) * M_LAT, (kLon - p.lon) * mLon(lat));
            if (dist < SADE_M) summa[a * sarakkeet + b] += paino * (1 - dist / SADE_M);
          }
        }
      }
      loki(`  ${kaupunki} ${kerros}: ${(d.elements ?? []).length} kohdetta, ${n} näytettä (${suodatin.slice(0, 50)})`);
      await odota(2000);
    }
    // Sisämaan kaupunki (Pariisi 7.10.): yksittäinen järvi- tai keinoranta normalisoituisi täysille aalloille → ilman
    // merenrantaviivaa kerros on nolla.
    if (kerros === 'aallot' && !rantaviivaa) summa.fill(0);
    const nollasta = [...summa].filter((x) => x > 0).sort((a, b) => a - b);
    const p95 = nollasta.length ? nollasta[Math.floor(nollasta.length * 0.95)] : 1;
    const tavut = new Uint8Array(summa.length);
    for (let i = 0; i < summa.length; i += 1) tavut[i] = Math.round(Math.min(1, summa[i] / (p95 || 1)) * 255);
    painot[kerros] = Buffer.from(tavut).toString('base64');
  }
  // Kellot: enintään 400, ensin Wikidata-merkityt (yleensä oikeat kirkot, ei kappeleita); Overpassin järjestys on alueellinen,
  // joten pelkkä katkaisu jättäisi osan kaupunkia ilman kelloja.
  kirkot.sort((a, b) => Number(b.wd) - Number(a.wd));
  kirkot.splice(400);
  for (const k of kirkot) delete k.wd;
  return { versio: 1, kaupunki, ruutu_m: RUUTU_M, sade_m: SADE_M, lounas, askel, rivit, sarakkeet, kerrokset: KERROKSET, painot, kirkot,
    lahde: 'OpenStreetMap-avustajat (ODbL 1.0), laskettu tools/aanimaisema/tee-aanikartta.mjs' };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const kaupunki = arg('kaupunki'); const ulos = arg('ulos');
  if (!kaupunki || !ulos) { console.error('käyttö: --kaupunki <id> --lat <lat> --lon <lon> --sade-km <km> --ulos <paketti>'); process.exit(1); }
  const valimuisti = arg('valimuisti');
  if (valimuisti) mkdirSync(valimuisti, { recursive: true });
  const kartta = await teeAanikartta({ kaupunki, lat: Number(arg('lat')), lon: Number(arg('lon')), sadeKm: Number(arg('sade-km', '5')), valimuistiKansio: valimuisti });
  const kansio = join(ulos, 'aanet', 'aanikartta-v1');
  mkdirSync(kansio, { recursive: true });
  writeFileSync(join(kansio, `${kaupunki}.json`), JSON.stringify(kartta));
  console.log(`kirjoitettu ${join(kansio, `${kaupunki}.json`)}: ${kartta.rivit} × ${kartta.sarakkeet} ruutua, ${kartta.kirkot.length} kirkkoa`);
}
