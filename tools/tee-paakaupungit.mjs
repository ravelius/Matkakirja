/*
 * PÄÄKAUPUNKIPISTEET JA MAIDEN PERUSTIEDOT — js/packs/paakaupungit.js.
 *
 *   node tools/tee-paakaupungit.mjs <sisaltokirjurin-faktat.json> [...]
 *
 * Omistaja 10.10.2026 (PT:n kautta): "tee kaikkiin maihin pääkaupunki ja maan
 * ja kaupungin perustiedot sekä maan rajat". PT:n päätös (suositus A):
 * pääkaupunki, joka ei ole laudan pysäkki, on KEVYT PISTE omassa
 * kokoelmassaan (kokoelmat/paakaupungit.json) — ei reittejä eikä laudan
 * 60 yksikön välisääntöä, joten Vatikaani voi olla Rooman sisällä ja
 * Bratislava Wienin vieressä oikeilla paikoillaan. Piirto olemassa olevalla
 * kaupunkimerkillä pienimmässä tärkeysluokassa (UI-pohjat-sääntö).
 *
 * Syöte on Sisältökirjurin faktatiedosto ({ alkiot: [{ maa, paakaupunki }] },
 * proto-3d/_tyo/sisaltokirjuri/maafaktat-*). Työkalu LISÄÄ ja KORVAA vain
 * syötteen maat; muut pakan rivit säilyvät, joten erät (Eurooppa, Afrikka, …)
 * kertyvät samaan pakkaan. Kaupungin id on oppaan kuvalistan id
 * (data/oppaan-kuvat/kaupungit-vaihe2.json, sama Wikidata-kohde), muuten
 * nimestä johdettu; törmäys laudan kaupungin id:n kanssa kaataa ajon.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const KOHDE = join(JUURI, 'js/packs/paakaupungit.js');
const syotteet = process.argv.slice(2);
if (!syotteet.length) { console.error('käyttö: node tools/tee-paakaupungit.mjs <faktat.json> [...]'); process.exit(1); }

const { MAAILMANKARTTA } = await import(`file://${join(JUURI, 'js/packs/maailmankartta.js')}`);
const laudanKaupungit = new Set(MAAILMANKARTTA.cities.map((c) => c.id));
const maat = MAAILMANKARTTA.map.countryShapes;
const opas = JSON.parse(readFileSync(join(JUURI, 'data/oppaan-kuvat/kaupungit-vaihe2.json'), 'utf8'));
const opasQ = new Map(opas.filter((o) => o.q).map((o) => [o.q, o]));

const vanha = existsSync(KOHDE) ? await import(`file://${KOHDE}?t=${Date.now()}`) : {};
const pisteet = new Map((vanha.PAAKAUPUNKIPISTEET ?? []).map((p) => [p.maa, p]));
const perustiedot = new Map(Object.entries(vanha.MAIDEN_PERUSTIEDOT ?? {}));

const tunnus = (nimi) => nimi.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
const arvo = (a) => (a && typeof a === 'object' ? a.arvo ?? null : a ?? null);
const lahde = (a) => (a && typeof a === 'object' ? { arvo: a.arvo ?? null, vuosi: a.vuosi ?? null, lahde: a.lahde ?? null, linkki: a.linkki ?? null } : null);

/*
 * Lähi-itä (PT 10.10.2026): Palestiinan Ramallah on "hallinnon paikka", ja
 * Jerusalem on laudan kaupunki ilman maata ja ilman kannanottoa — siitä ei
 * tehdä pistettä. Maakortti näyttää sen Israelin "hallinnon paikkana"
 * (tools/vienti/kokoelmat.mjs HALLINNON_PAIKAT, PT 10.10.2026).
 */
const ASEMA = { PSE: 'hallinnon paikka' };
const LAUDAN_KAUPUNKI_EI_PISTETTA = { ISR: 'jerusalem' };
// "paakaupunki"-rivien maa-objektissa on vain tunnus, nimi ja genetiivi
// (maa on jo laudalla omine tietoineen); perustiedot vain täysistä riveistä.
const taysiMaa = (m) => Boolean(m.virallinen_nimi_fi || m.esittely_fi);

let lisatty = 0;
for (const polku of syotteet) {
  const data = JSON.parse(readFileSync(polku, 'utf8'));
  for (const { maa: m, paakaupunki: k, tyyppi } of data.alkiot) {
    if (tyyppi === 'kuvat') continue; // vain kuvamotiivit, kaupunki jo laudalla
    const iso = m.iso3 ?? m.id;
    if (!maat[iso]) throw new Error(`${iso}: maata ei ole laudalla (countryShapes) — lisää ensin rajat (tools/maat-lisaa-maailmankartalle.mjs)`);
    if (taysiMaa(m)) perustiedot.set(iso, {
      virallinenNimi: m.virallinen_nimi_fi ?? null,
      virallinenNimiAlkukieli: m.virallinen_nimi_alkukieli ?? null,
      valtiomuoto: m.valtiomuoto ?? null,
      vakiluku: lahde(m.vakiluku),
      pintaAlaKm2: arvo(m.pinta_ala_km2),
      kielet: (m.kielet ?? []).map((l) => ({ kieli: l.kieli_fi, asema: l.asema ?? null })),
      valuutta: m.valuutta ? { nimi: m.valuutta.nimi_fi ?? null, koodi: m.valuutta.koodi ?? null } : null,
      rajanaapurit: (m.rajanaapurit ?? []).map((n) => n.id).filter(Boolean),
      genetiivi: m.genetiivi_fi ?? null,
      esittely: m.esittely_fi ?? null,
    });
    if (!k) continue;
    const q = k.wikidata_q ?? null;
    const o = q ? opasQ.get(q) : null;
    const id = o?.id ? tunnus(o.id) : tunnus(k.nimi_fi);
    if (LAUDAN_KAUPUNKI_EI_PISTETTA[iso] === id) { pisteet.delete(iso); continue; }
    if (laudanKaupungit.has(id)) throw new Error(`${iso}: pääkaupungin id ${id} on jo laudan kaupunki — se on pysäkki, ei pistettä`);
    const lat = k.sijainti?.lat ?? o?.lat; const lon = k.sijainti?.lon ?? o?.lon;
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) throw new Error(`${iso}: pääkaupungilta puuttuu sijainti`);
    pisteet.set(iso, {
      id, nimi: k.nimi_fi, nimiAlkukieli: k.nimi_alkukieli ?? null, maa: iso, lat: Number(lat.toFixed(4)), lon: Number(lon.toFixed(4)),
      wikidata: q ?? o?.q ?? null,
      asema: ASEMA[iso] ?? k.asema ?? 'pääkaupunki',
      asukkaat: lahde(k.asukasluku),
      kuvaus: k.kuvaus_fi ?? null,
      tunnusrakennukset: k.tunnusrakennukset ?? [],
    });
    lisatty += 1;
  }
}

const idt = [...pisteet.values()].map((p) => p.id);
if (new Set(idt).size !== idt.length) throw new Error('kaksi pääkaupunkipistettä samalla id:llä');

const jarjestys = (a, b) => (a < b ? -1 : 1);
const rivit = [...pisteet.values()].sort((a, b) => jarjestys(a.maa, b.maa)).map((p) => `  ${JSON.stringify(p)},`).join('\n');
const tiedot = [...perustiedot.entries()].sort(([a], [b]) => jarjestys(a, b)).map(([iso, t]) => `  ${iso}: ${JSON.stringify(t)},`).join('\n');
writeFileSync(KOHDE, `// Koneen kirjoittama: node tools/tee-paakaupungit.mjs <faktat.json> (ks. työkalun otsikko).
// Älä muokkaa käsin — korjaa Sisältökirjurin faktatiedostoon ja aja uudelleen.
//
// PAAKAUPUNKIPISTEET: pääkaupungit, jotka EIVÄT ole laudan pysäkkejä (PT 10.10.2026,
// suositus A): kevyt piste, ei reittejä eikä laudan välisääntöä. Vienti lisää
// laudan x/y:n (js/fokusmitat.js projisoiLaudalle) → kokoelmat/paakaupungit.json.
// MAIDEN_PERUSTIEDOT: kevyen sisällön perustiedot ja 3–5 lauseen esittely
// (Sisältökirjuri) → kokoelmat/maat.json kenttä perustiedot.

export const PAAKAUPUNKIPISTEET = [
${rivit}
];

export const MAIDEN_PERUSTIEDOT = {
${tiedot}
};
`);
console.log(`kirjoitettu ${KOHDE}: ${pisteet.size} pistettä (${lisatty} tästä ajosta), ${perustiedot.size} maan perustiedot`);
