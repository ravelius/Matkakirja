/*
 * EUROOPAN JOET GEOGLOWS-VERKOSTA POHJAAN (omistaja 27.9.2026 klo 20.0x,
 * Euroopan laatukierros kohta 4). Pohjan joet olivat sisältöpaketin 123
 * nimettyä jokea (js/packs/maailmankartta-nimet.js): Vltava, Kemijoki,
 * Ounasjoki ja Moskva puuttuivat, ja Tonava (Wien) ja Rein (Alpit)
 * kulkivat 1,5–2 km sivussa uomasta. Euroopan alalla ne korvataan
 * GEOGLOWS v2 -pääuomilla (tools/tee-joet.mjs, CC BY-SA 4.0; sama aineisto
 * kuin natiivin pallon joet, julisteet/pallo/vektorit/joet-<pvm>/).
 *
 * TASO VALUMA-ALUEESTA: joki piirretään vain, kun tason pikseliä laudan
 * yksikköä kohti (px) on vähintään `minPx` — iso joki kaukaa, pieni vasta
 * lähellä (z8 = 14,4 px/yks). Pääjoki (tarkeys 1) ≥ 50 000 km².
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

export const EUROOPPA = { lon0: -25, lon1: 45, lat0: 34, lat1: 72 };

/** valuma km² → pienin px/laudan yksikkö, jolla joki piirretään. */
export function joenMinPx(valuma) {
  if (valuma >= 100000) return 0;
  if (valuma >= 30000) return 3.5;      // z6
  if (valuma >= 10000) return 7;        // z7
  if (valuma >= 3000) return 14;        // z8
  return 28;                            // z9+
}

const osuusAlueella = (pisteet, a) => pisteet.filter(([lon, lat]) => lon >= a.lon0 && lon <= a.lon1
  && lat >= a.lat0 && lat <= a.lat1).length / Math.max(1, pisteet.length);

/** Arvioitu uoman leveys metreinä valuma-alueesta (Vltava ~300 m, Tonava ala ~1 km). */
export const joenLeveysM = (valuma) => 5 * Math.max(300, valuma) ** 0.4;

/**
 * Korvaa Euroopan alan paketin joet GEOGLOWS-joilla.
 *
 * PÄÄLLEKKÄISET POIS: sama uoma on usean maan tiedostossa hieman eri
 * ketjutuksella (rajajoet kummallekin maalle), ja piirrettynä kaksi
 * lähes samaa viivaa punoutui. Uomat käydään suurimmasta valumasta alkaen,
 * ja uoma hylätään, jos ≥ 60 % sen pisteistä on 0,006°:n päässä jo
 * hyväksytystä uomasta. MERI POIS: `onMeri` leikkaa merellä olevat osat
 * (GEOGLOWS jatkaa uomaa vuonon yli).
 * @param {Array<{pisteet:Array<[number,number]>}>} joet laudan koordinaatit
 * @param {string} kansio ISO.geojson-tiedostot (lon/lat LineString, valuma_km2)
 * @param {object} kaava laudanProjektio
 * @param {{ alue?: object, onMeri?: (lon:number, lat:number)=>boolean }} asetukset
 */
export function korvaaEuroopanJoet(joet, kansio, kaava, { alue = EUROOPPA, onMeri = null } = {}) {
  const pois = joet.filter((j) => osuusAlueella(j.pisteet.map(([x, y]) => [kaava.lautaLon(x), kaava.lautaLat(y)]), alue) > 0.5);
  const jaa = joet.filter((j) => !pois.includes(j));
  const ehdokkaat = [];
  for (const f of readdirSync(kansio).filter((n) => n.endsWith('.geojson')).sort()) {
    for (const p of JSON.parse(readFileSync(join(kansio, f), 'utf8')).features) {
      if (p.geometry?.type !== 'LineString') continue;
      const c = p.geometry.coordinates;
      if (c.length < 2 || osuusAlueella(c, alue) <= 0.5) continue;
      ehdokkaat.push({ c, valuma: p.properties?.valuma_km2 ?? 0 });
    }
  }
  ehdokkaat.sort((a, b) => b.valuma - a.valuma);
  const SOLU = 0.006;
  const verkko = new Set();
  const avain = (lon, lat) => `${Math.round(lon / SOLU)}:${Math.round(lat / SOLU)}`;
  const lahella = (lon, lat) => {
    const i = Math.round(lon / SOLU); const j = Math.round(lat / SOLU);
    for (let a = -1; a <= 1; a += 1) for (let b = -1; b <= 1; b += 1) if (verkko.has(`${i + a}:${j + b}`)) return true;
    return false;
  };
  const uudet = [];
  let paallekkaiset = 0;
  for (const { c, valuma } of ehdokkaat) {
    const osuma = c.filter(([lon, lat]) => lahella(lon, lat)).length / c.length;
    if (osuma >= 0.6) { paallekkaiset += 1; continue; }
    for (const [lon, lat] of c) verkko.add(avain(lon, lat));
    // Merellä olevat osat pois: viiva pilkotaan maalla oleviin jaksoihin.
    const jaksot = [];
    let jakso = [];
    for (const [lon, lat] of c) {
      if (onMeri && onMeri(lon, lat)) { if (jakso.length > 1) jaksot.push(jakso); jakso = []; continue; }
      jakso.push([lon, lat]);
    }
    if (jakso.length > 1) jaksot.push(jakso);
    for (const j of jaksot) {
      uudet.push({
        nimi: '',
        tarkeys: valuma >= 50000 ? 1 : 2,
        minPx: joenMinPx(valuma),
        leveysM: joenLeveysM(valuma),
        pisteet: j.map(([lon, lat]) => [kaava.lautaX(lon), kaava.lautaY(lat)]),
      });
    }
  }
  return { joet: [...jaa, ...uudet], poistettu: pois.length, lisatty: uudet.length, paallekkaiset };
}
