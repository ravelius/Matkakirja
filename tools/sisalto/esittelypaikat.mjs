#!/usr/bin/env node
/*
 * Saapumisen esittelykuvien paikat (KK:n suunnitelma 20261103-saapumisen-kuvat.md osa B; omistaja 3.11.2026 08.48 ja 09.28;
 * Karttaseppä 3.11.2026). Kuva nousee kartalta kohteensa kohdalta ja jää sinne pieneksi kuvaksi.
 *
 * Käyttö:  node tools/sisalto/esittelypaikat.mjs --vienti <vientipaketti> [--syote <tulos.json> …]
 *            [--kirjoita]
 *
 * Esittelykuvat = Euroopan kaupungin saapumistrailerin kolme kuvaa (kaupunkilehden kansi.avauskuvat, puuttuessa kansikuvat;
 * natiivin Saapumistraileri.Kuvia = 3), Pariisin esittelyn C1–C4 (KaupunkiIntro.KuvaUrl) ja Pariisin aloituslennon kuvat (PARIISIN_LENTO).
 * Avain = kuvan osoitteen tiedostonimi (natiivi: Path.GetFileName(osoite)).
 *
 * data/esittelypaikat.json: kaupungit.<id>.<tiedosto> = { kohde, kohdepiste: [lat, lon], lahde, piste: [lat, lon] }
 * tai { paikaton: true, syy } (natiivi: keskusta, pieni kuva kaupunkimerkin viereen). --syote tuo uudet kohteet
 * (Sonnet-parven muoto { kaupunki: { tiedosto: { kohde, lat, lon, lahde } | { paikaton, syy } } }); olemassa olevaa ei korvata.
 *
 * Tarkistus: olemassa oleva piste on kaupungin alueella (enintään 12 km keskustasta, alueilla rajauksen sisällä) eikä
 * 25 m:n päässä nostoista (karttavalot), kohdekartan kohteista eikä muista esittelykuvista (Kohdenostot 25 m, Raamattu 2.204).
 *
 * UUSIA PISTEITÄ EI LASKETA: veden ja katujen tarkistus haki Overpassista, joka on kielletty (Raamattu 2.183). Kohde ilman
 * pistettä tai liian lähellä toista on poikkeama; uusi tarkistus tehdään Geofabrikin aineistosta, kun työkalua tarvitaan.
 *
 * Poikkeama → virhekoodi 1. --kirjoita tallentaa uudet kohteet ja tarkistetut pisteet.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const DATA = path.join(JUURI, 'data', 'esittelypaikat.json');
const PARIISIN_INTRO = [1, 2, 3, 4].map((n) => `pariisi-nykyintro-c${n}.jpg`);
// Pariisin aloituslento (Raamattu 2.210; KK:n suunnitelma 20261105-pariisin-aloituslento.md osa C): nähtävyyksien kuvat, joita
// kansi.avauskuvat ei sisällä, isoisän luentakuvat (ottopaikka Tuileries'n puutarha) ja Pulun kuva.
const PARIISIN_LENTO = ['hero-pariisi-riemukaari.jpg', 'hero-pariisi-sacre-coeur.jpg', 'hero-pariisi-louvre.jpg',
  'matkakirja-pariisi-i1-r20260914-tarina-v1.jpg', 'matkakirja-pariisi-i2-r20260914-tarina-v1.jpg',
  'matkakirja-pariisi-p1-r20260914-tarina-v1.jpg'];
const VALI_M = 25;

const args = process.argv.slice(2);
const arvot = (lippu) => args.flatMap((a, i) => (a === lippu ? [args[i + 1]] : []));
const VIENTI = arvot('--vienti')[0];
const KIRJOITA = args.includes('--kirjoita');
if (!VIENTI) { console.error('Anna --vienti <vientipaketti>'); process.exit(2); }

const etaisyysM = (a, b) => {
  const R = 6371000, r = Math.PI / 180;
  const dLat = (b.lat - a.lat) * r, dLon = (b.lon - a.lon) * r;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};
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
kuvat.set('pariisi', [...new Set([...(kuvat.get('pariisi') ?? []), ...PARIISIN_INTRO, ...PARIISIN_LENTO])]);

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
    if (!e.piste) { virhe(`${kid} ${tiedosto} ${e.kohde}: ei pistettä, uusi piste vaatii veden ja katujen tarkistuksen (haku pois käytöstä, Raamattu 2.183)`); continue; }
    const piste = { lat: e.piste[0], lon: e.piste[1] };
    if (!alueella(piste)) { virhe(`${kid} ${tiedosto} ${e.kohde}: piste kaupungin alueen ulkopuolella`); continue; }
    const lahin = [...muut, ...omat].find((n) => etaisyysM(piste, n) < VALI_M);
    if (lahin) { virhe(`${kid} ${tiedosto} ${e.kohde}: piste alle ${VALI_M} m:n päässä kohteesta ${lahin.nimi}`); continue; }
    omat.push({ nimi: e.kohde, ...piste });
    paikallisia += 1;
    const d = Math.round(etaisyysM(piste, kohde));
    if (d) siirrettyja += 1;
    console.log(`ok    ${kid} ${tiedosto} ${e.kohde}${d ? ` (piste ${d} m kohteesta)` : ''}`);
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
