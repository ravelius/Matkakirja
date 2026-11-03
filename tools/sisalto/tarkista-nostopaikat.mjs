#!/usr/bin/env node
/*
 * Nostojen omien paikkojen koneellinen tarkistus (suunnitelma 20261102-nostot-ja-zoomaus-kaikkiin osa D; Karttaseppä 2.11.2026).
 * Käyttö:  node tools/sisalto/tarkista-nostopaikat.mjs --vienti <vientipaketti> [--valimuisti <kansio>]
 *
 * data/nostopaikat.json:n jokaiselle 'siirto'-paikalle:
 *   - kaupungin alueella: enintään 12 km kaupungin keskipisteestä (data/kaupunkikeskustat.json; alueilla rajauksen sisällä),
 *   - ei vedessä: OpenStreetMapin vesialue (natural=water, waterway=riverbank, landuse=reservoir; Overpass is_in) ja katuja
 *     150 m:n säteellä (meri),
 *   - ei 25 m:n päällekkäisyyttä saman kaupungin muiden nostojen eikä kohdekartan kohteiden kanssa (Kohdenostot.cs:30).
 * Vientipaketti ajetaan ensin (node tools/vienti/vie-sisalto.mjs --ulos …): se sisältää jo siirretyt pisteet.
 * Poikkeama → virhekoodi 1.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const UA = 'Matkakirja-karttaseppa/1.0 (sami.reivinen@vvi.fi)';
const OVERPASS = ['https://overpass-api.de/api/interpreter', 'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.private.coffee/api/interpreter'];
const tauko = (ms) => new Promise((r) => setTimeout(r, ms));

const args = process.argv.slice(2);
const arvo = (lippu) => { const i = args.indexOf(lippu); return i >= 0 ? args[i + 1] : null; };
const VIENTI = arvo('--vienti');
const VALIMUISTI = arvo('--valimuisti');
if (!VIENTI) { console.error('Anna --vienti <vientipaketti>'); process.exit(2); }
if (VALIMUISTI) fs.mkdirSync(VALIMUISTI, { recursive: true });

const etaisyysM = (a, b) => {
  const R = 6371000, r = Math.PI / 180;
  const dLat = (b.lat - a.lat) * r, dLon = (b.lon - a.lon) * r;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};

async function overpass(kysely, avain) {
  const tiedosto = VALIMUISTI ? path.join(VALIMUISTI, `${avain.replace(/[^a-z0-9-]/gi, '_')}.json`) : null;
  if (tiedosto && fs.existsSync(tiedosto)) return JSON.parse(fs.readFileSync(tiedosto, 'utf8'));
  for (let yritys = 0; yritys < 9; yritys += 1) {
    const palvelin = OVERPASS[yritys % OVERPASS.length];
    try {
      const r = await fetch(palvelin, { method: 'POST', headers: { 'User-Agent': UA, 'content-type': 'application/x-www-form-urlencoded' },
        body: `data=${encodeURIComponent(kysely)}` });
      if (r.ok) {
        const d = await r.json();
        if (tiedosto) fs.writeFileSync(tiedosto, JSON.stringify(d));
        await tauko(3000);
        return d;
      }
      console.error(`  ${new URL(palvelin).host} ${r.status}`);
    } catch (virhe) { console.error(`  ${new URL(palvelin).host} ${virhe.message}`); }
    await tauko(5000 * (Math.floor(yritys / OVERPASS.length) + 1));
  }
  throw new Error('Overpass ei vastannut');
}

const lue = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const paikat = lue(path.join(JUURI, 'data', 'nostopaikat.json'));
const keskustat = lue(path.join(JUURI, 'data', 'kaupunkikeskustat.json'));
const valot = lue(path.join(VIENTI, 'kokoelmat', 'karttavalot.json')).alkiot;
const kohdekartat = new Map(lue(path.join(VIENTI, 'kokoelmat', 'kohdekartat.json')).alkiot.map((k) => [k.id, k]));
const valoIdt = new Map(valot.map((v) => [v.id, v]));

let virheet = 0;
for (const [id, p] of Object.entries(paikat)) {
  if (p.tila !== 'siirto') continue;
  const v = valoIdt.get(id);
  const syyt = [];
  if (!v || v.lat !== p.lat || v.lon !== p.lon) syyt.push('vientipaketissa eri piste (aja vienti ensin)');
  const k = keskustat[p.kaupunki];
  if (k?.alue) {
    const r = k.rajaus;
    if (p.lat < r.etela || p.lat > r.pohjoinen || p.lon < r.lansi || p.lon > r.ita) syyt.push('alueen rajauksen ulkopuolella');
  } else if (!k || etaisyysM(p, k) > 12000) syyt.push(`yli 12 km kaupungin keskipisteestä (${k ? Math.round(etaisyysM(p, k)) : '?'} m)`);
  const naapurit = [
    ...valot.filter((x) => x.id !== id && Number.isFinite(x.lat)).map((x) => ({ nimi: x.nimi, lat: x.lat, lon: x.lon })),
    ...(kohdekartat.get(p.kaupunki)?.kohteet ?? []).filter((x) => x.lat != null && x.nimi !== p.nimi && x.nosto !== id.replace(':', '-')),
  ];
  for (const n of naapurit) {
    const m = etaisyysM(p, n);
    if (m < 25) syyt.push(`päällekkäin: ${n.nimi} ${Math.round(m)} m`);
  }
  const c = `${p.lat},${p.lon}`;
  const d = await overpass(`[out:json][timeout:60];
is_in(${c})->.a;
(area.a[natural=water];area.a[waterway=riverbank];area.a[landuse=reservoir];);out tags;
way(around:150,${c})[highway];out count;`, id);
  const vedet = d.elements.filter((e) => e.type === 'area').map((e) => e.tags?.name ?? e.tags?.natural ?? e.tags?.waterway);
  const kadut = Number(d.elements.find((e) => e.type === 'count')?.tags?.ways ?? 0);
  if (vedet.length) syyt.push(`vedessä (${vedet.join(', ')})`);
  if (!kadut) syyt.push('ei katuja 150 m:n säteellä');
  virheet += syyt.length ? 1 : 0;
  console.log(`${syyt.length ? 'VIRHE' : 'ok   '} ${id} (${p.kaupunki}) katuja ${kadut}${syyt.length ? `: ${syyt.join('; ')}` : ''}`);
}
console.log(`${Object.values(paikat).filter((p) => p.tila === 'siirto').length} siirtoa, ${Object.values(paikat).filter((p) => p.tila === 'viuhka').length} viuhkaa, poikkeamia ${virheet}`);
process.exit(virheet ? 1 : 0);
