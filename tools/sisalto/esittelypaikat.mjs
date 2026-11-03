#!/usr/bin/env node
/*
 * Saapumisen esittelykuvien paikat (KK:n suunnitelma 20261103-saapumisen-kuvat.md osa B; omistaja 3.11.2026 08.48 ja 09.28;
 * Karttaseppä 3.11.2026). Kuva nousee kartalta kohteensa kohdalta ja jää sinne pieneksi kuvaksi.
 *
 * Käyttö:  node tools/sisalto/esittelypaikat.mjs --vienti <vientipaketti> [--syote <tulos.json> …] [--valimuisti <kansio>]
 *            [--kirjoita]
 *
 * Esittelykuvat = Euroopan kaupungin saapumistrailerin kolme kuvaa (kaupunkilehden kansi.avauskuvat, puuttuessa kansikuvat;
 * natiivin Saapumistraileri.Kuvia = 3) ja Pariisin esittelyn C1–C4 (KaupunkiIntro.KuvaUrl; C5 nousee matkakirjasta).
 * Avain = kuvan osoitteen tiedostonimi (natiivi: Path.GetFileName(osoite)).
 *
 * data/esittelypaikat.json: kaupungit.<id>.<tiedosto> = { kohde, kohdepiste: [lat, lon], lahde, piste: [lat, lon] }
 * tai { paikaton: true, syy } (natiivi: keskusta, pieni kuva kaupunkimerkin viereen). --syote tuo uudet kohteet
 * (Sonnet-parven muoto { kaupunki: { tiedosto: { kohde, lat, lon, lahde } | { paikaton, syy } } }); olemassa olevaa ei korvata.
 *
 * piste = kohdepiste, jos se täyttää ehdot, muuten lähin vapaa kohta 30–120 m:n kehillä (8 suuntaa):
 *   - kaupungin alueella: enintään 12 km keskustasta (alueilla rajauksen sisällä),
 *   - ei vedessä (OSM natural=water, waterway=riverbank, landuse=reservoir; Overpass is_in) ja katuja 150 m:n säteellä,
 *   - ei 25 m:n päällekkäisyyttä nostojen (karttavalot), kohdekartan kohteiden eikä muiden esittelykuvien kanssa
 *     (Kohdenostot 25 m, Raamattu 2.204).
 * Poikkeama → virhekoodi 1. --kirjoita tallentaa uudet kohteet ja pisteet.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const DATA = path.join(JUURI, 'data', 'esittelypaikat.json');
const UA = 'Matkakirja-karttaseppa/1.0 (sami.reivinen@vvi.fi)';
const OVERPASS = ['https://overpass-api.de/api/interpreter', 'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.private.coffee/api/interpreter'];
const PARIISIN_INTRO = [1, 2, 3, 4].map((n) => `pariisi-nykyintro-c${n}.jpg`);
const VALI_M = 25;
const KEHAT_M = [30, 45, 60, 80, 100, 120];
const tauko = (ms) => new Promise((r) => setTimeout(r, ms));

const args = process.argv.slice(2);
const arvot = (lippu) => args.flatMap((a, i) => (a === lippu ? [args[i + 1]] : []));
const VIENTI = arvot('--vienti')[0];
const VALIMUISTI = arvot('--valimuisti')[0];
const KIRJOITA = args.includes('--kirjoita');
if (!VIENTI) { console.error('Anna --vienti <vientipaketti>'); process.exit(2); }
if (VALIMUISTI) fs.mkdirSync(VALIMUISTI, { recursive: true });

const etaisyysM = (a, b) => {
  const R = 6371000, r = Math.PI / 180;
  const dLat = (b.lat - a.lat) * r, dLon = (b.lon - a.lon) * r;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};
const siirra = (p, m, suunta) => ({
  lat: +(p.lat + (m * Math.cos(suunta)) / 111320).toFixed(6),
  lon: +(p.lon + (m * Math.sin(suunta)) / (111320 * Math.cos((p.lat * Math.PI) / 180))).toFixed(6),
});

async function overpass(kysely, avain) {
  const tiedosto = VALIMUISTI ? path.join(VALIMUISTI, `${avain.replace(/[^a-z0-9.-]/gi, '_')}.json`) : null;
  if (tiedosto && fs.existsSync(tiedosto)) return JSON.parse(fs.readFileSync(tiedosto, 'utf8'));
  for (let yritys = 0; yritys < 9; yritys += 1) {
    const palvelin = OVERPASS[yritys % OVERPASS.length];
    try {
      const r = await fetch(palvelin, { method: 'POST', headers: { 'User-Agent': UA, 'content-type': 'application/x-www-form-urlencoded' },
        body: `data=${encodeURIComponent(kysely)}` });
      if (r.ok) {
        const d = await r.json();
        if (tiedosto) fs.writeFileSync(tiedosto, JSON.stringify(d));
        await tauko(2000);
        return d;
      }
      console.error(`  ${new URL(palvelin).host} ${r.status}`);
    } catch (virhe) { console.error(`  ${new URL(palvelin).host} ${virhe.message}`); }
    await tauko(5000 * (Math.floor(yritys / OVERPASS.length) + 1));
  }
  throw new Error('Overpass ei vastannut');
}

async function maalla(p) {
  const c = `${p.lat.toFixed(6)},${p.lon.toFixed(6)}`;
  const d = await overpass(`[out:json][timeout:60];
is_in(${c})->.a;
(area.a[natural=water];area.a[waterway=riverbank];area.a[landuse=reservoir];);out tags;
way(around:150,${c})[highway];out count;`, `ep-${c}`);
  const vedet = d.elements.filter((e) => e.type === 'area').map((e) => e.tags?.name ?? e.tags?.natural ?? e.tags?.waterway);
  const kadut = Number(d.elements.find((e) => e.type === 'count')?.tags?.ways ?? 0);
  return { ok: !vedet.length && kadut > 0, syy: vedet.length ? `vedessä (${vedet.join(', ')})` : kadut ? null : 'ei katuja 150 m:n säteellä' };
}

const lue = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const data = fs.existsSync(DATA) ? lue(DATA) : { kaupungit: {} };
const keskustat = lue(path.join(JUURI, 'data', 'kaupunkikeskustat.json'));
const kaupungit = lue(path.join(VIENTI, 'kokoelmat', 'kaupungit.json')).alkiot.filter((c) => c.manner === 'europe');
const valot = lue(path.join(VIENTI, 'kokoelmat', 'karttavalot.json')).alkiot.filter((x) => Number.isFinite(x.lat));
const kohdekartat = new Map(lue(path.join(VIENTI, 'kokoelmat', 'kohdekartat.json')).alkiot.map((k) => [k.id, k]));

// Esittelykuvat vientipaketista samassa järjestyksessä kuin natiivi (UiSisalto: kansi.avauskuvat, puuttuessa kansikuvat).
const kuvat = new Map();
for (const c of kaupungit) {
  const f = path.join(VIENTI, 'kokoelmat', 'kaupunkilehdet', `${c.id}.json`);
  if (!fs.existsSync(f)) continue;
  const kansi = lue(f).alkiot?.[0]?.kansi ?? {};
  const lista = (kansi.avauskuvat?.length ? kansi.avauskuvat : kansi.kansikuvat ?? []).slice(0, 3);
  kuvat.set(c.id, lista.map((k) => path.basename(new URL(k.url ?? `https://x/${k.arvo}`).pathname)));
}
kuvat.set('pariisi', [...(kuvat.get('pariisi') ?? []), ...PARIISIN_INTRO]);

for (const s of arvot('--syote')) {
  for (const [kid, t] of Object.entries(lue(s))) {
    const kohde = (data.kaupungit[kid] ??= {});
    for (const [tiedosto, e] of Object.entries(t)) {
      if (kohde[tiedosto]) continue;
      kohde[tiedosto] = e.paikaton ? { paikaton: true, syy: e.syy ?? null }
        : { kohde: e.kohde, kohdepiste: [e.lat, e.lon], lahde: e.lahde ?? null };
    }
  }
}

let virheet = 0, paikallisia = 0, paikattomia = 0, siirrettyja = 0;
const virhe = (rivi) => { virheet += 1; console.log(`VIRHE ${rivi}`); };
for (const [kid, lista] of kuvat) {
  const k = keskustat[kid];
  const kp = k && !k.alue ? { lat: k.lat, lon: k.lon } : null;
  const alueella = (p) => (k?.alue ? p.lat >= k.rajaus.etela && p.lat <= k.rajaus.pohjoinen && p.lon >= k.rajaus.lansi
    && p.lon <= k.rajaus.ita : kp ? etaisyysM(p, kp) <= 12000 : false);
  const keski = kp ?? (k ? { lat: (k.rajaus.etela + k.rajaus.pohjoinen) / 2, lon: (k.rajaus.lansi + k.rajaus.ita) / 2 } : null);
  const sade = k?.alue ? 400000 : 15000;
  const muut = keski ? [
    ...valot.filter((x) => etaisyysM(x, keski) <= sade).map((x) => ({ nimi: x.nimi, lat: x.lat, lon: x.lon })),
    ...(kohdekartat.get(kid)?.kohteet ?? []).filter((x) => x.lat != null).map((x) => ({ nimi: x.nimi, lat: x.lat, lon: x.lon })),
  ] : [];
  const omat = [];
  for (const tiedosto of lista) {
    const e = data.kaupungit[kid]?.[tiedosto];
    if (!e) { virhe(`${kid} ${tiedosto}: ei kohdetta`); continue; }
    if (e.paikaton) { paikattomia += 1; console.log(`–     ${kid} ${tiedosto}: paikaton (${e.syy ?? '?'})`); continue; }
    const kohde = { lat: e.kohdepiste[0], lon: e.kohdepiste[1] };
    if (!alueella(kohde)) { virhe(`${kid} ${tiedosto} ${e.kohde}: kaupungin alueen ulkopuolella`); continue; }
    const vapaa = (p) => [...muut, ...omat].every((n) => etaisyysM(p, n) >= VALI_M);
    const ehdokkaat = [kohde, ...KEHAT_M.flatMap((m) => [0, 2, 4, 6, 1, 3, 5, 7].map((s) => siirra(kohde, m, (s * Math.PI) / 4)))];
    const vanha = e.piste ? { lat: e.piste[0], lon: e.piste[1] } : null;
    let piste = null, syy = null;
    for (const p of vanha ? [vanha, ...ehdokkaat] : ehdokkaat) {
      if (!vapaa(p) || !alueella(p)) { syy = syy ?? 'päällekkäin tai alueen ulkopuolella'; continue; }
      const m = await maalla(p);
      if (m.ok) { piste = p; break; }
      syy = syy ?? m.syy;
    }
    if (!piste) { virhe(`${kid} ${tiedosto} ${e.kohde}: ei vapaata pistettä (${syy})`); continue; }
    e.piste = [piste.lat, piste.lon];
    omat.push({ nimi: e.kohde, ...piste });
    paikallisia += 1;
    const d = Math.round(etaisyysM(piste, kohde));
    if (d) siirrettyja += 1;
    console.log(`ok    ${kid} ${tiedosto} ${e.kohde}${d ? ` (piste ${d} m kohteesta${syy ? `: ${syy}` : ''})` : ''}`);
  }
}
const ylimaaraiset = Object.entries(data.kaupungit).flatMap(([kid, t]) => Object.keys(t).filter((f) => !kuvat.get(kid)?.includes(f))
  .map((f) => `${kid} ${f}`));
for (const r of ylimaaraiset) console.log(`huom  ${r}: ei esittelykuvissa (jää dataan)`);
console.log(`${paikallisia} paikallista (${siirrettyja} siirretty kohteen viereen), ${paikattomia} paikatonta, poikkeamia ${virheet}`);
if (KIRJOITA) {
  data._kuvaus = 'Saapumisen esittelykuvien paikat (tools/sisalto/esittelypaikat.mjs; KK:n suunnitelma 20261103-saapumisen-kuvat.md osa B). '
    + 'Avain = kuvan tiedostonimi. kohdepiste = kohteen piste (lahde), piste = kartalla näytettävä kohta (≥ 25 m nostoista, maalla). '
    + 'paikaton = natiivi käyttää keskustaa (pieni kuva kaupunkimerkin viereen).';
  const jarj = { _kuvaus: data._kuvaus, kaupungit: Object.fromEntries(Object.keys(data.kaupungit).sort().map((kid) => [kid, data.kaupungit[kid]])) };
  fs.writeFileSync(`${DATA}.tmp`, `${JSON.stringify(jarj, null, 1)}\n`);
  fs.renameSync(`${DATA}.tmp`, DATA);
  console.log(`kirjoitettu ${path.relative(JUURI, DATA)}`);
}
process.exit(virheet ? 1 : 0);
