/*
 * MUUTTOLINNUT — kuuden lajin muuttoreitit vuodenkierron mukaan
 * (Muuttolinnut-leikkilinssi, Fable 21.9.2026; lajit omistajan
 * linssisarjasta: kurki, haarapääsky, tervapääsky, kiuru,
 * valkoposkihanhi, käki).
 *
 * OMA PIENI TAULUKKO, EI ULKOISTA AINEISTOA. Reitit ovat pelin
 * mittakaavan yleistyksiä Suomessa pesivien kantojen tavallisesta
 * muuttotiestä: 6–9 pistettä lajia kohti (pesimäalue → levähdys →
 * talvehtiminen), kuukausittainen sijainti ja tunnusluvut. Luvut ovat
 * yleistietoa ja pyöristettyjä; kaikki tekstit on kirjoitettu tähän,
 * mitään ei ole kopioitu. Fable tarkistaa taulukon ennen kytkentää
 * (21.9.2026: reitit, matkat, nopeudet ja ajat hyväksytty) ja kirjoitti
 * lajien huomiolauseet (kenttä `huomio`, Fablen sanatarkat).
 *
 * LÄHTEET (tosiasioiden tarkistukseen, ei tekstiä):
 *   - Luomus / Suomen Lajitietokeskus, lintujen muutto- ja
 *     rengaslöytötiedot (Suomen rengastustoimisto): lähtö- ja
 *     paluuajat, talvehtimisalueet, rengaslöytöjen painopisteet.
 *   - BirdLife Suomi, lajiesittelyt (muuttoreitit ja -ajat).
 *   - Euring / Migration Atlas (Wernham ym. 2002): eurooppalaisten
 *     lajien muuttotiet.
 *   - Lund University (Hedenström ym. 2016, Current Biology):
 *     tervapääsky lentää yhtäjaksoisesti lähes 10 kuukautta.
 *   - BTO Cuckoo Tracking Project (2011–): käen satelliittiseuranta,
 *     talvehtiminen Kongon altaassa, kevätmuutto Länsi-Afrikan kautta.
 *   - Lundgren / Alerstam, Bird Migration (1990): muuttonopeudet ja
 *     -korkeudet.
 *   Haettu/tarkistettu: 21.9.2026 (muistiin kirjattu yleistieto,
 *   pyöristetty pelin tarkkuuteen; Fablen tarkistus tulossa).
 *
 * MUOTO. `reitti` on syysmuuton järjestyksessä: ensimmäinen piste on
 * pesimäalue, viimeinen talvehtimisalue; kevätmuutto kulkee samaa
 * tietä takaisin (kurjilla ja hanhilla se on totta; pääskyillä ja
 * käellä kevätreitti kulkee hieman lännempää — pelin tarkkuudella
 * sama tie). `maa` on laudan countryShapes-tunnus (Israel puuttuu
 * laudalta, joten kurjen Lähi-idän levähdys on merkitty Turkkiin/
 * Egyptiin). `kuukaudet` on 12 alkiota (tammi…joulu): reitin pisteen
 * indeksi, kun parvi on paikallaan, tai pari [i, j], kun se on
 * matkalla pisteiden i ja j välillä (parvi piirretään puoliväliin).
 * Livia kysyy vain kuukausia, joina parvi on paikallaan.
 */

export const MUUTTOLINNUT = [
  {
    tunnus: 'kurki',
    nimi: 'Kurki',
    latina: 'Grus grus',
    vari: '#8a6d3b',
    matkaKm: 5500,
    nopeusKmh: '45–65',
    korkeusM: '300–2 000',
    lahto: 'syys–lokakuu',
    paluu: 'maalis–huhtikuu',
    huomio: 'Kurjet lentävät auran muodossa säästääkseen voimia, ja johtaja vaihtuu kesken lennon. Suomen kurkikanta on moninkertaistunut 1970-luvulta.',
    reitti: [
      { nimi: 'Suomen suot', maa: 'FIN', lat: 63.0, lon: 26.0, rooli: 'pesii' },
      { nimi: 'Matsalu, Viro', maa: 'EST', lat: 58.75, lon: 23.6, rooli: 'levähtää' },
      { nimi: 'Hortobágy, Unkari', maa: 'HUN', lat: 47.6, lon: 21.1, rooli: 'levähtää' },
      { nimi: 'Anatolia, Turkki', maa: 'TUR', lat: 38.5, lon: 34.0, rooli: 'ylittää' },
      { nimi: 'Niilin laakso, Egypti', maa: 'EGY', lat: 27.0, lon: 31.5, rooli: 'ylittää' },
      { nimi: 'Etiopian ylänkö', maa: 'ETH', lat: 9.0, lon: 39.0, rooli: 'talvehtii' },
    ],
    kuukaudet: [5, 5, 3, 0, 0, 0, 0, 0, 1, 2, [3, 5], 5],
  },
  {
    tunnus: 'haarapaasky',
    nimi: 'Haarapääsky',
    latina: 'Hirundo rustica',
    vari: '#2f4f7f',
    matkaKm: 10000,
    nopeusKmh: '35–45',
    korkeusM: '10–100',
    lahto: 'elo–syyskuu',
    paluu: 'toukokuu',
    huomio: 'Pääsky syö lennossa ja juo viistämällä veden pintaa. Sama pari palaa usein samaan navettaan vuodesta toiseen.',
    reitti: [
      { nimi: 'Suomen navetat', maa: 'FIN', lat: 62.0, lon: 25.0, rooli: 'pesii' },
      { nimi: 'Ranska', maa: 'FRA', lat: 46.5, lon: 2.5, rooli: 'ylittää' },
      { nimi: 'Sahara, Algeria', maa: 'DZA', lat: 27.0, lon: 3.0, rooli: 'ylittää' },
      { nimi: 'Niger-joki, Mali', maa: 'MLI', lat: 14.0, lon: -4.0, rooli: 'levähtää' },
      { nimi: 'Kongon allas', maa: 'COD', lat: -2.0, lon: 22.0, rooli: 'ylittää' },
      { nimi: 'Etelä-Afrikka', maa: 'ZAF', lat: -27.0, lon: 26.0, rooli: 'talvehtii' },
    ],
    kuukaudet: [5, 5, [5, 4], [3, 1], 0, 0, 0, 0, 1, 3, 4, 5],
  },
  {
    tunnus: 'tervapaasky',
    nimi: 'Tervapääsky',
    latina: 'Apus apus',
    vari: '#3b3b3b',
    matkaKm: 7500,
    nopeusKmh: '40–50 (syöksyssä yli 100)',
    korkeusM: '500–3 000 (yöllä)',
    lahto: 'elokuun alku',
    paluu: 'toukokuun loppu',
    huomio: 'Tervapääsky nukkuu ja syö lennossa ja laskeutuu vain pesälle. Lundin yliopiston mittaus 2016: kymmenen kuukautta yhtäjaksoisesti ilmassa.',
    reitti: [
      { nimi: 'Suomen kaupungit', maa: 'FIN', lat: 61.0, lon: 25.0, rooli: 'pesii' },
      { nimi: 'Espanja', maa: 'ESP', lat: 40.0, lon: -3.5, rooli: 'ylittää' },
      { nimi: 'Guineanlahti, Nigeria', maa: 'NGA', lat: 7.0, lon: 6.0, rooli: 'levähtää' },
      { nimi: 'Kongon allas', maa: 'COD', lat: -3.0, lon: 24.0, rooli: 'talvehtii' },
      { nimi: 'Mosambik', maa: 'MOZ', lat: -18.0, lon: 35.0, rooli: 'talvehtii' },
    ],
    kuukaudet: [4, 4, 3, [3, 2], [2, 0], 0, 0, [0, 1], 2, 3, 3, 4],
  },
  {
    tunnus: 'kiuru',
    nimi: 'Kiuru',
    latina: 'Alauda arvensis',
    vari: '#a0783c',
    matkaKm: 1800,
    nopeusKmh: '30–45',
    korkeusM: '50–500',
    lahto: 'loka–marraskuu',
    paluu: 'maaliskuu',
    huomio: 'Kiuru laulaa lennossa satojen metrien korkeudessa. Lyhyen matkan muuttaja: talvi kuluu Länsi-Euroopan pelloilla.',
    reitti: [
      { nimi: 'Suomen pellot', maa: 'FIN', lat: 61.5, lon: 24.0, rooli: 'pesii' },
      { nimi: 'Tanska', maa: 'DNK', lat: 55.8, lon: 10.0, rooli: 'levähtää' },
      { nimi: 'Alankomaat', maa: 'NLD', lat: 52.3, lon: 5.5, rooli: 'talvehtii' },
      { nimi: 'Pohjois-Ranska', maa: 'FRA', lat: 49.0, lon: 2.5, rooli: 'talvehtii' },
    ],
    kuukaudet: [3, 3, [2, 0], 0, 0, 0, 0, 0, 0, 1, 2, 3],
  },
  {
    tunnus: 'valkoposkihanhi',
    nimi: 'Valkoposkihanhi',
    latina: 'Branta leucopsis',
    vari: '#4a4a5a',
    matkaKm: 2000,
    nopeusKmh: '60–80',
    korkeusM: '100–1 000',
    lahto: 'loka–marraskuu',
    paluu: 'huhti–toukokuu',
    huomio: 'Itämeren kanta syntyi vasta 1970-luvulla, kun arktiset hanhet jäivät pesimään Viroon ja Suomenlahdelle. Talvella ne laiduntavat Alankomaiden niityillä kymmenintuhansin.',
    reitti: [
      { nimi: 'Suomenlahden luodot', maa: 'FIN', lat: 60.2, lon: 25.5, rooli: 'pesii' },
      { nimi: 'Viron rannikko', maa: 'EST', lat: 58.9, lon: 23.5, rooli: 'levähtää' },
      { nimi: 'Wattimeri, Saksa', maa: 'DEU', lat: 53.7, lon: 8.5, rooli: 'levähtää' },
      { nimi: 'Alankomaiden rantaniityt', maa: 'NLD', lat: 53.0, lon: 5.8, rooli: 'talvehtii' },
    ],
    kuukaudet: [3, 3, 2, 1, 0, 0, 0, 0, 0, 1, 2, 3],
  },
  {
    tunnus: 'kaki',
    nimi: 'Käki',
    latina: 'Cuculus canorus',
    vari: '#5c6b3c',
    matkaKm: 7000,
    nopeusKmh: '40–50',
    korkeusM: '200–1 500',
    lahto: 'heinä–elokuu (aikuiset ensin)',
    paluu: 'toukokuun puoliväli',
    huomio: 'Käki ei kasvata poikasiaan, joten aikuiset lähtevät jo heinäkuussa ja nuoret löytävät Kongoon ilman opasta. Reitit tunnetaan satelliittilähettimistä.',
    reitti: [
      { nimi: 'Suomen metsät', maa: 'FIN', lat: 62.5, lon: 26.5, rooli: 'pesii' },
      { nimi: 'Po-joen laakso, Italia', maa: 'ITA', lat: 45.0, lon: 10.5, rooli: 'levähtää' },
      { nimi: 'Sahara, Libya', maa: 'LBY', lat: 27.0, lon: 17.0, rooli: 'ylittää' },
      { nimi: 'Tšad', maa: 'TCD', lat: 11.0, lon: 17.0, rooli: 'levähtää' },
      { nimi: 'Kongon sademetsä', maa: 'COD', lat: -1.5, lon: 20.0, rooli: 'talvehtii' },
    ],
    kuukaudet: [4, 4, 4, [4, 3], [1, 0], 0, 0, 1, 3, 4, 4, 4],
  },
];

/** Kuukausien nimet (partitiivi Livian lauseeseen: "lepää lokakuussa"). */
export const KUUKAUDET = [
  'tammikuussa', 'helmikuussa', 'maaliskuussa', 'huhtikuussa', 'toukokuussa', 'kesäkuussa',
  'heinäkuussa', 'elokuussa', 'syyskuussa', 'lokakuussa', 'marraskuussa', 'joulukuussa',
];
/** Kuukausien perusmuodot (tilarivi). */
export const KUUKAUSIEN_NIMET = [
  'tammikuu', 'helmikuu', 'maaliskuu', 'huhtikuu', 'toukokuu', 'kesäkuu',
  'heinäkuu', 'elokuu', 'syyskuu', 'lokakuu', 'marraskuu', 'joulukuu',
];

export const MUUTTOLINNUT_LAHDE = {
  aineisto: 'Pelin oma reittitaulukko: kuuden Suomessa pesivän lajin tavallinen muuttotie ja kuukausisijainti, yleistettynä pelin mittakaavaan. Tosiasiat tarkistettu Luomuksen ja BirdLife Suomen lajitiedoista, Euring-muuttoatlaksesta, Lundin yliopiston tervapääskytutkimuksesta (2016) ja BTO:n käkiseurannasta.',
  lisenssi: 'Pelin oma tuotanto (tosiasiat eivät ole tekijänoikeuden alaisia; tekstiä ei ole kopioitu).',
  osoite: 'https://laji.fi/',
  haettu: '2026-09-21',
};
