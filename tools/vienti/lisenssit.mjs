/*
 * PAKETIN LISENSSIKIRJANPITO (Siirtoseppä 23.9.2026, Fablen pyyntö):
 * paketin juuren lisenssit.json luettelee aineistot, joista paketin ja
 * ämpärin data on johdettu, lisensseineen ja attribuutioineen. Natiivi
 * näyttää `attribuutio`-tekstit tekijätiedoissa (Tietoja-näkymä).
 *
 * Yksittäisten kuvien ja äänten tekijät ja lisenssit ovat viitteissä
 * itsessään (lehtien ja nostojen lahde-kentät, media.json), ja NC/ND-
 * sekä radioselvitys on raportissa docs/raportit/lisenssi-inventaario-20260923.md.
 * Uusi aineisto lisätään tänne samassa commitissa, jossa se tulee
 * pakettiin tai ämpäriin.
 */
export const AINEISTOT = [
  {
    id: 'natural-earth',
    nimi: 'Natural Earth 10m (admin-0 ja admin-1)',
    lisenssi: 'public domain',
    lahde: 'https://www.naturalearthdata.com/about/terms-of-use/',
    attribuutio: 'Made with Natural Earth.',
    kaytto: 'kokoelmat maarajat ja maakuntarajat, laattoihin poltetut rajat, maakuntavektorit ämpärissä',
  },
  {
    id: 'copernicus-dem',
    nimi: 'Copernicus DEM GLO-30 ja GLO-90',
    lisenssi: 'Copernicus DEM -lisenssi (vapaa käyttö attribuutiolla)',
    lahde: 'https://registry.opendata.aws/copernicus-dem/',
    attribuutio: '© DLR e.V. 2010-2014 and © Airbus Defence and Space GmbH 2014-2018 provided under COPERNICUS by the European Union and ESA; all rights reserved.',
    kaytto: 'kaupungit.korkeus (GLO-30) ja natiivin maastolaatat (GLO-90 koko maailma z0–z11, GLO-30 Euroopassa z12) ämpärissä',
  },
  {
    id: 'etopo1',
    nimi: 'NOAA NGDC ETOPO1 Global Relief Model, Ice Surface (1 kaariminuutti)',
    lisenssi: 'public domain (Yhdysvaltain liittovaltion virasto)',
    lahde: 'https://doi.org/10.7289/V5C8276M',
    attribuutio: 'ETOPO1: Amante & Eakins 2009, NOAA National Geophysical Data Center.',
    kaytto: 'pääkartan laattojen varjostus ja meren syvyys (laattapyramidi), maaston korkeustiedot',
  },
  {
    id: 'etopo-2022',
    nimi: 'NOAA NCEI ETOPO 2022 15 Arc-Second Global Relief Model (surface)',
    lisenssi: 'public domain (Yhdysvaltain liittovaltion virasto)',
    lahde: 'https://doi.org/10.25921/fd45-gt74',
    attribuutio: 'ETOPO 2022: NOAA National Centers for Environmental Information.',
    kaytto: 'reliefipyramidi (topografia- ja vesistölinssi, astronautin kamera) ämpärissä',
  },
  {
    id: 'gshhg',
    nimi: 'GSHHG 2.3.7 (Wessel & Smith)',
    lisenssi: 'LGPL 3+',
    lahde: 'https://www.soest.hawaii.edu/pwessel/gshhg/',
    attribuutio: 'Rantaviivat: GSHHG, Wessel & Smith, LGPL.',
    kaytto: 'laattoihin poltetut rantaviivat ja pallon vektorit ämpärissä',
  },
  {
    id: 'historical-basemaps',
    nimi: 'historical-basemaps (André Ourednik), 1878-leikkauksesta johdetut vuoden 1873 rajat',
    lisenssi: 'GPL-3.0',
    lahde: 'https://github.com/aourednik/historical-basemaps',
    attribuutio: 'Vuoden 1873 rajat: historical-basemaps, © André Ourednik, GPL-3.0 (johdettu aineisto samalla lisenssillä).',
    kaytto: 'isoisän linssin 1873-rajat. Striimataan ämpäristä erillisenä datatiedostona, ei sovelluksen binaarissa (Fablen päätös 23.9.2026). Johdettu rajatiedosto jaetaan GPL-3.0:lla lähteineen.',
    ehdot: 'Johdetun aineiston jakelu samalla lisenssillä, ja lisenssiteksti sekä lähde saataville. Peli itse ei muutu GPL:ksi, koska data on erillinen tiedosto.',
  },
];

export function kokoaLisenssit() {
  return { $skeema: 'matkakirja-vienti/1/lisenssit', aineistot: AINEISTOT };
}
