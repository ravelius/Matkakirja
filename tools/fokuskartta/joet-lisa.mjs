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
 * PÄÄLLEKKÄISET POIS PISTEKOHTAISESTI (korjattu 29.9.2026, Wienin
 * kaksoisjoki): sama uoma on usean maan tiedostossa hieman eri
 * ketjutuksella (rajajoet kummallekin maalle, ks. tools/tee-joet.mjs
 * maanOsat). VANHA KOKO-UOMAN KYNNYS (≥ 60 % pisteistä lähellä →
 * koko uoma pois, muuten koko uoma mukaan) päästi läpi juuri
 * RAJAJOEN: Itävallan ja Slovakian Tonava-ketjut olivat päällekkäisiä
 * vain Wienin–Bratislavan rajaosuudella, joten kumpikaan ei ylittänyt
 * 60 %:n osuutta koko ketjustaan, ja molemmat piirtyivät kokonaan —
 * kaksi lähes samaa Tonava-viivaa. Uomat käydään yhä suurimmasta
 * valumasta alkaen, mutta nyt uoma PILKOTAAN pisteittäin: piste jää
 * pois, jos se on 0,006°:n päässä jo hyväksytystä uomasta TAI merellä
 * (`onMeri`, GEOGLOWS jatkaa uomaa vuonon yli), ja jäljelle jäävät
 * maalla olevat, ei-päällekkäiset jaksot piirretään omina viivoinaan.
 * Rajajoki säilyy siis siltä osaltaan, joka ei ole toisen maan
 * tiedostossa jo mukana, eikä koko ketjua enää hylätä eikä hyväksytä
 * yhtenä palana.
 *
 * PAKETIN JOKI POIS VAIN, JOS GEOGLOWS TODELLA KORVAA SEN (korjattu
 * 29.9.2026, kohta 3): ennen paketin uoma poistettiin heti, kun
 * enemmistö sen pisteistä osui Euroopan laatikkoon — vaikka
 * GEOGLOWS-aineistossa ei olisi sille lainkaan vastinetta (esim.
 * järven keskilinja tai kanava, joita GEOGLOWS-jokiverkko ei tunne).
 * Laatikko-osuma on yhä ENSIMMÄINEN ehto (rajaa haun Eurooppaan), mutta
 * poisto vaatii LISÄKSI, että vähintään puolet paketin uoman pisteistä
 * on lähellä jo koottua GEOGLOWS-verkkoa — sama pistekohtainen `lahella`
 * kuin GEOGLOWS-uomien päällekkäisyydessä, mutta väljemmällä
 * naapuroinnilla, koska paketin uomat saattoivat kulkea 1,5–2 km
 * sivussa oikeasta uomasta (Tonava, Rein).
 * @param {Array<{pisteet:Array<[number,number]>}>} joet laudan koordinaatit
 * @param {string} kansio ISO.geojson-tiedostot (lon/lat LineString, valuma_km2)
 * @param {object} kaava laudanProjektio
 * @param {{ alue?: object, onMeri?: (lon:number, lat:number)=>boolean }} asetukset
 */
export function korvaaEuroopanJoet(joet, kansio, kaava, { alue = EUROOPPA, onMeri = null } = {}) {
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
  /** Onko piste 0,006° × naapurisade -säteellä jo hyväksytystä GEOGLOWS-uomasta? */
  const lahella = (lon, lat, sade = 1) => {
    const i = Math.round(lon / SOLU); const j = Math.round(lat / SOLU);
    for (let a = -sade; a <= sade; a += 1) for (let b = -sade; b <= sade; b += 1) if (verkko.has(`${i + a}:${j + b}`)) return true;
    return false;
  };
  const uudet = [];
  let paallekkaiset = 0;
  for (const { c, valuma } of ehdokkaat) {
    // GEOGLOWS-UOMAN PÄÄLLEKKÄINEN JA MEREN OSA POIS PISTEITTÄIN: viiva
    // pilkotaan maalla oleviin, ei-vielä-piirrettyihin jaksoihin (sama
    // idiomi kuin ennen pelkällä merellä — nyt myös päällekkäisyydelle).
    const jaksot = [];
    let jakso = [];
    for (const [lon, lat] of c) {
      if ((onMeri && onMeri(lon, lat)) || lahella(lon, lat)) { if (jakso.length > 1) jaksot.push(jakso); jakso = []; continue; }
      jakso.push([lon, lat]);
    }
    if (jakso.length > 1) jaksot.push(jakso);
    for (const [lon, lat] of c) verkko.add(avain(lon, lat));
    if (!jaksot.length) { paallekkaiset += 1; continue; }
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
  const korvattu = (j) => {
    const pisteet = j.pisteet.map(([x, y]) => [kaava.lautaLon(x), kaava.lautaLat(y)]);
    if (osuusAlueella(pisteet, alue) <= 0.5) return false;
    // Väljempi naapurointi (sade 3 ≈ 2,6 km) paketin karkeamman uoman takia.
    const osuma = pisteet.filter(([lon, lat]) => lahella(lon, lat, 3)).length / pisteet.length;
    return osuma >= 0.5;
  };
  const pois = joet.filter(korvattu);
  const jaa = joet.filter((j) => !pois.includes(j));
  return { joet: [...jaa, ...uudet], poistettu: pois.length, lisatty: uudet.length, paallekkaiset };
}
