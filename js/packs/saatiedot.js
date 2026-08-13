/*
 * Säätiedot lehtikaupungeille (omistajan toive 5.8.2026): lehden
 * etusivulla näkyy päivän sääennuste, ja sitä napauttamalla aukeaa
 * koko vuoden keskilämpö ja sademäärä graafina.
 *
 * Rakenne per kaupunki (avain = kaupunki-id, sama kuin
 * KULTTUURI_KATEGORIAT):
 *
 *   lat, lon  — ennustehaku (Open-Meteo, avaimeton ja CORS-avoin)
 *   keskilampo[12] — kuukauden keskilämpö °C, tammikuusta joulukuuhun
 *   sade[12]  — kuukauden sademäärä mm
 *
 * Normaalit ovat staattista dataa TARKOITUKSELLA: vuosigraafi ja
 * ennusteen varateksti toimivat myös ilman verkkoa (lentokoneessa).
 * Ne on laskettu Open-Meteon arkistosta (ERA5) jaksolta 1991–2020 —
 * sama jakso kuin virallisissa ilmastonormaaleissa. Lähderivi
 * graafissa: "Open-Meteo (ERA5), 1991–2020".
 *
 * Uusi lehtikaupunki tarvitsee vain oman rivinsä tähän — koodia ei
 * tarvitse muuttaa. Ilman riviä lehti näkyy ilman säätä.
 */
export const SAATIEDOT = {
  lontoo: {
    lat: 51.51,
    lon: -0.13,
    keskilampo: [4.7, 4.9, 6.8, 9.2, 12.5, 15.5, 17.7, 17.4, 14.8, 11.4, 7.7, 5.2],
    sade: [55, 47, 43, 49, 52, 56, 55, 61, 48, 60, 64, 59],
  },
  kairo: {
    lat: 30.05,
    lon: 31.23,
    keskilampo: [13.6, 14.7, 17.5, 21.3, 25.2, 27.9, 29.0, 29.1, 27.4, 24.2, 19.5, 15.2],
    sade: [4, 4, 4, 1, 0, 0, 0, 0, 0, 1, 2, 2],
  },
  // Madrid on 650 metrin korkeudessa keskellä ylätasankoa: kesä on
  // kuumempi ja talvi kylmempi kuin rannikon Espanjassa, ja heinäkuun
  // sade on lähes olematon.
  madrid: {
    lat: 40.42,
    lon: -3.70,
    keskilampo: [4.7, 6.1, 9.5, 12.1, 16.5, 22.1, 25.8, 25.3, 20.4, 14.5, 8.7, 5.5],
    sade: [39, 32, 39, 46, 38, 15, 6, 8, 21, 58, 54, 44],
  },
  // Tukholma on 59. leveyspiirillä mutta meren keskellä: talvi on
  // leudompi kuin sisämaassa samalla korkeudella, ja sade jakautuu
  // tasaisesti vuoteen — kesä on silti sateisin aika.
  tukholma: {
    lat: 59.33,
    lon: 18.07,
    keskilampo: [-1.4, -1.6, 0.8, 5.2, 10.3, 14.8, 17.8, 17.1, 12.8, 7.4, 3.2, 0.1],
    sade: [37, 31, 32, 33, 43, 64, 65, 69, 50, 50, 48, 46],
  },
  venetsia: {
    lat: 45.44,
    lon: 12.32,
    keskilampo: [4.3, 5.3, 8.8, 12.8, 17.5, 21.5, 23.9, 24.0, 19.5, 14.9, 9.8, 5.2],
    sade: [60, 62, 69, 82, 93, 77, 60, 82, 120, 118, 125, 79],
  },
  // Berliini on mannerilmastoa tasangolla: talvi käy pakkasen puolella
  // ja sade jakautuu tasaisesti ympäri vuoden — heinäkuun kuurot ovat
  // vuoden märin kuukausi.
  berliini: {
    lat: 52.52,
    lon: 13.41,
    keskilampo: [0.7, 1.6, 4.5, 9.4, 14.1, 17.5, 19.6, 19.5, 15.1, 10.1, 5.2, 1.9],
    sade: [50, 37, 48, 37, 56, 59, 77, 56, 52, 46, 42, 46],
  },
  // Doha on Persianlahden rannalla mutta aavikkomaassa: kesäkuusta
  // syyskuuhun sataa nolla millimetriä ja keskilämpö pysyy yli 33
  // asteessa, kun taas talvella lämpötila on Välimeren kevään luokkaa.
  // Koko vuoden sade, noin 60 mm, tulee marraskuun ja huhtikuun
  // välillä lyhyinä ryöppyinä.
  doha: {
    lat: 25.29,
    lon: 51.53,
    keskilampo: [17.6, 18.6, 21.7, 26.6, 31.8, 34.2, 35.3, 35.2, 33.1, 29.7, 24.7, 19.8],
    sade: [11, 12, 12, 4, 0, 0, 0, 0, 0, 0, 7, 14],
  },
  // Nikosia on sisämaassa tasangolla, ei rannikolla: kesä on siksi
  // kuumempi ja talvi viileämpi kuin Kyproksen rantakaupungeissa.
  // Heinä- ja elokuussa sataa käytännössä ei lainkaan, ja koko vuoden
  // sade tulee marraskuun ja maaliskuun välillä.
  nikosia: {
    lat: 35.17,
    lon: 33.36,
    keskilampo: [10.7, 11.2, 13.6, 17.5, 22.2, 26.8, 29.7, 29.6, 26.3, 21.9, 16.6, 12.5],
    sade: [54, 47, 35, 30, 29, 9, 2, 3, 11, 35, 37, 53],
  },
  // Kuwait on Persianlahden pohjukassa ja kaukana avomerestä, joten
  // kesä on koko lahden alueen kuumin: heinäkuun keskilämpö ylittää 37
  // astetta eikä kesä-syyskuussa sada lainkaan. Sade tulee talvella
  // lyhyinä ryöppyinä.
  kuwait: {
    lat: 29.38,
    lon: 47.99,
    keskilampo: [13.5, 15.4, 19.7, 25.4, 31.7, 36.1, 37.6, 37.4, 34.1, 28.7, 21, 15.4],
    sade: [30, 13, 17, 6, 2, 0, 0, 0, 0, 2, 30, 26],
  },
  // Masqat on meren rannalla vuorten juurella: talvi on lämpimämpi
  // kuin Kuwaitissa ja kesä hieman viileämpi, koska meri tasaa. Sade
  // on vähäistä ympäri vuoden, ja kesäkuun piikki tulee harvinaisista
  // trooppisista matalapaineista.
  masqat: {
    lat: 23.615,
    lon: 58.593,
    keskilampo: [20.7, 21.9, 24.4, 28.6, 32.5, 33.5, 33, 31.9, 30.8, 29, 25.3, 22.2],
    sade: [18, 11, 18, 7, 1, 10, 4, 1, 0, 1, 12, 14],
  },
  // Bagdad on nipun kuivin ja kuumin: heinä-elokuun keskilämpö on yli
  // 38 astetta, ja kesäkuusta lokakuuhun sadetta ei tule lainkaan.
  bagdad: {
    lat: 33.315,
    lon: 44.366,
    keskilampo: [10.8, 13.1, 18.3, 24.6, 31.1, 35.9, 38.3, 38.1, 34, 27.7, 18.1, 12.5],
    sade: [25, 21, 19, 13, 4, 0, 0, 0, 0, 8, 21, 23],
  },
  // İzmir on ainoa Välimeren rannalla: sade painottuu talveen ja on
  // moninkertainen muihin nipun kaupunkeihin verrattuna, heinäkuussa
  // sitä ei käytännössä tule.
  izmir: {
    lat: 38.419,
    lon: 27.128,
    keskilampo: [7.5, 8.5, 11.1, 15.2, 20.5, 25.6, 28.7, 28.6, 24, 18.7, 13.2, 9],
    sade: [108, 100, 83, 62, 40, 15, 3, 4, 24, 63, 94, 109],
  },
  // Ankara on Anatolian ylängöllä noin 900 metrissä, ja se näkyy
  // suoraan käyrässä: tammikuun keskilämpö on nollan tuntumassa, kun
  // rannikon İzmirissä se on 7,5 astetta.
  ankara: {
    lat: 39.942,
    lon: 32.86,
    keskilampo: [1, 2.5, 6.4, 11.5, 16.7, 20.8, 24.4, 24.6, 20.2, 14.5, 7.6, 2.9],
    sade: [50, 44, 53, 46, 44, 31, 9, 10, 13, 28, 39, 54],
  },
  // Aleppo ja Damaskos ovat molemmat kuivan ja kostean rajalla: sade
  // tulee marraskuun ja maaliskuun välissä, ja kesä on täysin kuiva.
  halab: {
    lat: 36.2,
    lon: 37.157,
    keskilampo: [6.5, 7.9, 11.8, 16.7, 21.9, 26.2, 28.6, 28.7, 25.8, 20.8, 13, 7.9],
    sade: [55, 49, 39, 25, 18, 3, 1, 1, 3, 19, 33, 54],
  },
  // Damaskos on Aleppoa hieman lämpimämpi ja selvästi kuivempi:
  // vuoret pysäyttävät mereltä tulevan sateen, ja kaupunki elää
  // keitaan varassa.
  damaskos: {
    lat: 33.511,
    lon: 36.306,
    keskilampo: [5.9, 7.3, 11, 15.8, 20.9, 24.8, 27.1, 27, 24.4, 19.6, 12.4, 7.7],
    sade: [40, 35, 25, 11, 7, 0, 0, 0, 1, 7, 23, 31],
  },
};
