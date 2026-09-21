// NYKYALUEET — Ranskan 13 regionin ja Saksan 16 osavaltion nykyiset
// hallintoalueet pohjakartalle (omistajan päätös 21.9.2026, Karttasepän
// vedos docs/raportit/maakuntavedos-20260921.md, versio a hyväksytty).
//
// KAANONTARKKUUS: nämä ovat NYKYAJAN hallintoalueita — eri kerros kuin
// js/packs/nimisto-1873.js:n vuoden 1873 poliittiset ja pysyvät
// kulttuurinimet. Rajat piirretään KAIKILLE 29 alueelle, mutta NIMIÖ
// puuttuu kymmeneltä, joiden nimi on jo nimisto-1873.js:ssä pysyvänä
// kulttuurinimenä samalla paikalla (Bretagne, Normandia, Île-de-France,
// Korsika, Brandenburg, Schleswig-Holstein, Baijeri, Hessen, Hampuri,
// Bremen) — kaksi nimiötä samasta alueesta olisi turhaa toistoa.
// Jäljelle jää 19 nykyalue-nimiötä.
//
// LUOKKA on 'nykyalue', EI 'maakunta' (eri ladonta ja muste kuin
// pysyvillä kulttuurinimillä — Karttaseppä erottaa nämä musteen ja
// pienkapiteelien kautta, näkyvät vasta z8:sta). `koko`: 'pieni' vain
// kaupunkivaltioille ja Saarlandille (Berliini, Saarland — Hampuri ja
// Bremen jäävät pois yllä mainitusta syystä), muuten 'suuri'. Ei
// `aika`-kenttää (nykyalueet ovat aina nykyisiä) eikä `muste`-kenttää
// (omistajan päätös kesken, poltto lisää sen lipulla).
//
// SIJAINNIT ovat KÄSIN SÄÄDETTYJÄ (Karttaseppä, vedos2/tee-nimiot2.mjs),
// EIVÄT Natural Earthin laskemia alueen painopisteitä — käsin siirretty
// pois kaupunkien, nostojen ja jokien nimiöiden tieltä. Ei muuteta tässä
// tiedostossa ilman Karttasepän hyväksyntää.
//
// RAJAT (`RAJAT_POLKU`, alla) ovat ERI TIEDOSTOSSA:
// assets/data/nykyalueet-fra-deu.json (Natural Earth 10m
// ne_10m_admin_1_states_provinces — public domain; Ranskan 13
// regionia yhdistetty departementeista, Saksan 16 osavaltiota
// suoraan). 26 sisäistä rajaviivaa, 9090 kärkipistettä, 4 desimaalia,
// ei rannikkoa eikä valtioiden ulkorajaa (ne piirtyvät jo muualta).
// Karttaseppä lataa tiedoston ja piirtää `luokka: 'raja'` -rivinä
// (tools/fokuskartta/maailmapiirto.js nimiotasonLadonta) — tätä
// moduulia ei tuoda suoraan JS-nipun mukana, koska rajadata on
// suuri ja tarvitaan vain karttapoltossa.
//
// LÄHDE: Natural Earth 10m admin_1_states_provinces, public domain.
// Käsitelty ja rajat laskettu Karttasepän toimesta 21.9.2026
// (docs/raportit/maakuntavedos-20260921.md).

export const RAJAT_POLKU = 'assets/data/nykyalueet-fra-deu.json';

export const NYKYALUEET = [
  // ── RANSKA (9 nimiötä; Bretagne, Normandia, Île-de-France ja
  //    Korsika jäävät pois, ks. yllä) ──────────────────────────────
  { teksti: 'Hauts-de-France', luokka: 'nykyalue', lon: 2.95, lat: 50.25, iso: 'FRA', koko: 'suuri' },
  { teksti: 'Grand Est', luokka: 'nykyalue', lon: 4.9, lat: 48.95, iso: 'FRA', koko: 'suuri' },
  { teksti: 'Centre-Val de Loire', luokka: 'nykyalue', lon: 1.9, lat: 47.15, iso: 'FRA', koko: 'suuri' },
  { teksti: 'Nouvelle-Aquitaine', luokka: 'nykyalue', lon: 0.6, lat: 44.6, iso: 'FRA', koko: 'suuri' },
  { teksti: 'Occitanie', luokka: 'nykyalue', lon: 1.6, lat: 43.4, iso: 'FRA', koko: 'suuri' },
  { teksti: 'Bourgogne-Franche-Comté', luokka: 'nykyalue', lon: 5.35, lat: 47.4, iso: 'FRA', koko: 'suuri' },
  { teksti: 'Auvergne-Rhône-Alpes', luokka: 'nykyalue', lon: 4.2, lat: 44.9, iso: 'FRA', koko: 'suuri' },
  { teksti: "Provence-Alpes-Côte d'Azur", luokka: 'nykyalue', lon: 6.25, lat: 44.35, iso: 'FRA', koko: 'suuri' },
  { teksti: 'Pays de la Loire', luokka: 'nykyalue', lon: -0.9, lat: 47.75, iso: 'FRA', koko: 'suuri' },

  // ── SAKSA (10 nimiötä; Brandenburg, Schleswig-Holstein, Baijeri,
  //    Hessen, Hampuri ja Bremen jäävät pois, ks. yllä) ────────────
  { teksti: 'Saksi-Anhalt', luokka: 'nykyalue', lon: 12.05, lat: 52.15, iso: 'DEU', koko: 'suuri' },
  { teksti: 'Saksi', luokka: 'nykyalue', lon: 12.85, lat: 51.25, iso: 'DEU', koko: 'suuri' },
  { teksti: 'Thüringen', luokka: 'nykyalue', lon: 10.75, lat: 50.75, iso: 'DEU', koko: 'suuri' },
  { teksti: 'Mecklenburg-Etu-Pommeri', luokka: 'nykyalue', lon: 12.4, lat: 53.85, iso: 'DEU', koko: 'suuri' },
  { teksti: 'Ala-Saksi', luokka: 'nykyalue', lon: 9.4, lat: 52.95, iso: 'DEU', koko: 'suuri' },
  { teksti: 'Nordrhein-Westfalen', luokka: 'nykyalue', lon: 7.7, lat: 51.65, iso: 'DEU', koko: 'suuri' },
  { teksti: 'Rheinland-Pfalz', luokka: 'nykyalue', lon: 7.3, lat: 50.05, iso: 'DEU', koko: 'suuri' },
  { teksti: 'Baden-Württemberg', luokka: 'nykyalue', lon: 9.1, lat: 48.35, iso: 'DEU', koko: 'suuri' },
  { teksti: 'Berliini', luokka: 'nykyalue', lon: 13.55, lat: 52.62, iso: 'DEU', koko: 'pieni' },
  { teksti: 'Saarland', luokka: 'nykyalue', lon: 6.95, lat: 49.3, iso: 'DEU', koko: 'pieni' },
];
