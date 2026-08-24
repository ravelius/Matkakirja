/*
 * FOKUSNÄKYMÄN LISÄNIMET — KREIKKA (pilotti, omistaja 24.8.2026).
 *
 * Raamatun osio "Fokusmoodi": *"Laatan lisäksi maan muita kaupunkeja
 * (ei pelattavia), jokia, järviä, vuoria."*
 *
 * === NÄMÄ NIMET OVAT NYT POIS KÄYTÖSTÄ (FOKUS_SVG_NIMET) ===
 *
 * Omistajan pelitestipalaute v1095:stä oli, että fokusnäkymän on
 * näytettävä TÄSMÄLLEEN hyväksytyltä prototyyppikuvalta. Prototyypissä
 * nimet ovat osa lehteä — samaa mustetta, samassa harvennuksessa, meren
 * nimi kaartuvana kursiivina ulapalla — eikä sitä saa SVG-tekstillä
 * laudan päällä. Siksi nimet POLTETAAN NYT KUVAAN
 * (tools/fokuskartta/maat.mjs), ja tämä taulu jää lipun taakse.
 *
 * Koodia ei poistettu: jos kuvaan poltetut nimet osoittautuvat
 * lähizoomissa liian epätarkoiksi, lippu käännetään takaisin ja nimet
 * palaavat SVG:nä. Silloin on muistettava karsia samat nimet kuvasta,
 * tai ne tulevat kahteen kertaan.
 *
 * KURATOITU KÄSIN, EI POIMITTU AINEISTOSTA. Nämä ovat isoisän atlaksen
 * harvoja merkintöjä eivätkä täydellinen luettelo: neljä kaupunkia,
 * kolme vuorta ja kolme merta. Vähemmän on tässä tarkoitus — fokusmoodi
 * on annostelua.
 *
 * KOORDINAATIT OVAT PELILAUDAN OMIA (maailmankartta, Millerin lieriö
 * LEVEYS 12000 / LON0 -175 / POHJOINEN 76). Ne on laskettu kerran
 * asteista laudan kaavalla — sama kaava, jolla fokuskartan kuva
 * renderöidään (tools/fokuskartta/piirto.js laudanProjektio) — eikä
 * pelissä ole projektiokoodia lainkaan. Asteet ovat mukana
 * kommentissa, jotta luvut voi laskea uudelleen jos lauta joskus
 * vaihtaa projektiota.
 *
 * Sijainnit: Wikipedia / Natural Earth 10m. Merten nimien paikat ovat
 * karttatypografiaa eivätkä paikkatietoa — ne on aseteltu silmällä
 * sinne, missä nimi mahtuu ulapalle.
 */

/*
 * ESIRENDERÖITYJEN POHJIEN RAJAUKSET — repossa eikä ämpärissä.
 *
 * Ämpärin julkinen r2.dev-osoite EI lähetä CORS-otsakkeita, joten
 * selaimen fetch() kaataa JSON-haun vaikka itse kuva latautuu
 * <img>-elementillä ongelmitta (mitattu 24.8.2026: Kreikan pohja jäi
 * tuotannossa näkymättä juuri tästä syystä). Rajaus on pieni ja
 * muuttumaton, joten se asuu tässä — kuva pysyy ämpärissä. Luvut ovat
 * suoraan tools/tee-fokuskartta.mjs:n kirjoittamasta
 * GRC.json-tiedostosta (tasaus todennettu: Ateena 0,7 lautayksikköä).
 * Uusi maa = uusi rivi tähän samalla kun kuva viedään ämpäriin.
 *
 * === KOKO EUROOPPA (omistaja 26.8.2026) ===
 *
 * *"Tee koko Euroopan kartta uudella systeemillä jotta rajat häviää."*
 * Taulussa on nyt 39 maata: Kreikka kuratoituna pilottina ja loput
 * yleiseltä reitiltä (tools/fokuskartta/maat.mjs "YLEINEN REITTI").
 *
 * SAUMAT KATOAVAT KAHDESTA SYYSTÄ. Ensiksi jokainen kuva ulottuu
 * naapurin puolelle ja piirtää sielläkin maaston, joet ja meren —
 * haaleana, mutta samasta aineistosta samalla kaavalla, joten Bulgarian
 * lehden Rodope-vuoret ovat samassa paikassa kuin Kreikan lehden. Toiseksi
 * naapurimaiden LAATIKOT LIMITTYVÄT reilusti, joten kun kamera vaihtaa
 * lehteä maasta toiseen siirryttäessä, väliin ei jää lautaa
 * (tests/fokuspohjat.test.mjs valvoo molempia koneellisesti).
 *
 * RIVIT OVAT KONEEN KIRJOITTAMIA eikä niitä sovi säätää käsin: luvut
 * tulevat suoraan tee-fokuskartta.mjs:n kirjoittamista JSONeista, ja
 * käsin muutettu rajaus siirtäisi kuvaa suhteessa maastoon.
 *
 * VENÄJÄ EI OLE MUKANA. Laudalla se ulottuu Kaliningradista
 * Kamtšatkaan — 5345 lautayksikköä eli lähes puolet maailmasta — eikä
 * yksi lehti voi peittää sitä millään käyttökelpoisella tarkkuudella.
 * Euroopan puoleinen Venäjä on tehtävissä sitten, kun peli osaa valita
 * maalle useamman lehden.
 *
 * === KAKSI LAATIKKOA (v2, omistajan pelitestipalaute v1095:stä) ===
 *
 *   bbox    Mihin KUVA asetetaan. Kuva on kokonainen atlaksen lehti ja
 *           OPAAKKI: se peittää laudan oman grafiikan alueellaan.
 *
 *   rajaus  LEHDEN IKKUNA eli se, mitä kehysviiva rajaa — tähän peli
 *           ajaa kameran. Kuvan ja ikkunan väliin jää vuotoa (15 % joka
 *           reunalla), koska ruudun kuvasuhde ei ole koskaan lehden
 *           kuvasuhde: kamera-ajo sovittaa ikkunan ruutuun ja näyttää
 *           yli menevässä suunnassa aina hitusen enemmän. Vuoto estää
 *           sauman laudan grafiikkaan kaikissa vaakakuvasuhteissa
 *           (1,23–2,08); pystyssä kuvan häivytetty uloin reuna sulattaa
 *           sauman lautaan.
 *
 * Kuva on 6400 x 4000 eli lähes neljä kertaa entistä useampi pikseli
 * (omistaja: *"taustakartan resoluutio ylös — kuva pikselöityy
 * fokuszoomilla"*). Fokusrajauksessa lehti näkyy kokonaan eikä sitä
 * suurenneta lainkaan: iPadin verkkokalvonäytöllä kuvaa on noin
 * kaksinkertaisesti yli tarpeen. Ylärajan asettaa iOS:n purettu kuva
 * eikä tiedostokoko — ks. tools/tee-fokuskartta.mjs.
 */
export const FOKUS_POHJAT = {
  /*
   * KREIKKA on pilotti ja ainoa KURATOITU lehti: sen ikkuna, merten
   * nimet ja vuoret on aseteltu käsin (tools/fokuskartta/maat.mjs
   * FOKUSMAAT). Muut ovat YLEISEN REITIN kuvia — ikkuna johdettu
   * Natural Earthin geometriasta, sisältönä maasto, vedet ja
   * aineistosta poimitut kaupunkipisteet.
   */
  GRC: {
    lauta: 'maailmankartta',
    bbox: { x: 6329.2, y: 1681.71, w: 608.26, h: 380.16 },
    rajaus: { x: 6399.39, y: 1725.58, w: 467.89, h: 292.43 },
    tiedosto: 'GRC.webp',
  },

  ALB: {
    lauta: 'maailmankartta',
    bbox: { x: 6330.92, y: 1647.93, w: 348.45, h: 217.78 },
    rajaus: { x: 6455.73, y: 1673.06, w: 98.82, h: 167.52 },
    tiedosto: 'ALB.webp',
  },
  AUT: {
    lauta: 'maailmankartta',
    bbox: { x: 6053.08, y: 1347.79, w: 449.5, h: 281.11 },
    rajaus: { x: 6104.94, y: 1407.12, w: 345.77, h: 162.45 },
    tiedosto: 'AUT.webp',
  },
  BEL: {
    lauta: 'maailmankartta',
    bbox: { x: 5835.87, y: 1276.79, w: 291.48, h: 182.17 },
    rajaus: { x: 5894.28, y: 1297.81, w: 174.66, h: 140.13 },
    tiedosto: 'BEL.webp',
  },
  BGR: {
    lauta: 'maailmankartta',
    bbox: { x: 6498.06, y: 1577.96, w: 368.83, h: 230.67 },
    rajaus: { x: 6540.62, y: 1608.84, w: 283.72, h: 168.9 },
    tiedosto: 'BGR.webp',
  },
  BIH: {
    lauta: 'maailmankartta',
    bbox: { x: 6255.81, y: 1541.16, w: 332.88, h: 208.05 },
    rajaus: { x: 6333.79, y: 1565.17, w: 176.93, h: 160.04 },
    tiedosto: 'BIH.webp',
  },
  BLR: {
    lauta: 'maailmankartta',
    bbox: { x: 6447.39, y: 1024.02, w: 634.73, h: 396.71 },
    rajaus: { x: 6548.2, y: 1069.79, w: 433.11, h: 305.16 },
    tiedosto: 'BLR.webp',
  },
  CHE: {
    lauta: 'maailmankartta',
    bbox: { x: 5968.12, y: 1439.08, w: 277.81, h: 173.63 },
    rajaus: { x: 6004.76, y: 1459.11, w: 204.54, h: 133.56 },
    tiedosto: 'CHE.webp',
  },
  CYP: {
    lauta: 'maailmankartta',
    bbox: { x: 6870.38, y: 1955.64, w: 138.27, h: 86.42 },
    rajaus: { x: 6889.06, y: 1965.61, w: 100.91, h: 66.48 },
    tiedosto: 'CYP.webp',
  },
  CZE: {
    lauta: 'maailmankartta',
    bbox: { x: 6149.33, y: 1273.46, w: 398.47, h: 249.2 },
    rajaus: { x: 6195.3, y: 1318.12, w: 306.51, h: 159.89 },
    tiedosto: 'CZE.webp',
  },
  DEU: {
    lauta: 'maailmankartta',
    bbox: { x: 5693.7, y: 1026.75, w: 975.08, h: 609.42 },
    rajaus: { x: 5973.4, y: 1097.06, w: 415.69, h: 468.79 },
    tiedosto: 'DEU.webp',
  },
  DNK: {
    lauta: 'maailmankartta',
    bbox: { x: 6006.07, y: 975.86, w: 429.38, h: 268.36 },
    rajaus: { x: 6060.79, y: 1006.82, w: 319.93, h: 206.43 },
    tiedosto: 'DNK.webp',
  },
  ESP: {
    lauta: 'maailmankartta',
    bbox: { x: 5272.63, y: 1518.56, w: 956.25, h: 597.66 },
    rajaus: { x: 5441.83, y: 1587.52, w: 617.85, h: 459.74 },
    tiedosto: 'ESP.webp',
  },
  EST: {
    lauta: 'maailmankartta',
    bbox: { x: 6479.75, y: 876.92, w: 374.47, h: 234.19 },
    rajaus: { x: 6522.95, y: 912.19, w: 288.05, h: 163.65 },
    tiedosto: 'EST.webp',
  },
  FIN: {
    lauta: 'maailmankartta',
    bbox: { x: 5912.62, y: 151.39, w: 1581.17, h: 988.23 },
    rajaus: { x: 6455.09, y: 265.42, w: 496.23, h: 760.18 },
    tiedosto: 'FIN.webp',
  },
  FRA: {
    lauta: 'maailmankartta',
    bbox: { x: 5331.6, y: 1181.57, w: 1151.03, h: 719.39 },
    rajaus: { x: 5574.09, y: 1264.58, w: 666.05, h: 553.38 },
    tiedosto: 'FRA.webp',
  },
  GBR: {
    lauta: 'maailmankartta',
    bbox: { x: 4994.77, y: 677.71, w: 1448.81, h: 905.5 },
    rajaus: { x: 5483.61, y: 782.19, w: 471.11, h: 696.54 },
    tiedosto: 'GBR.webp',
  },
  HRV: {
    lauta: 'maailmankartta',
    bbox: { x: 6142.23, y: 1471.72, w: 479.18, h: 299.49 },
    rajaus: { x: 6247.94, y: 1506.28, w: 267.76, h: 230.38 },
    tiedosto: 'HRV.webp',
  },
  HUN: {
    lauta: 'maailmankartta',
    bbox: { x: 6282.97, y: 1386.05, w: 399.78, h: 250.02 },
    rajaus: { x: 6329.1, y: 1426.16, w: 307.52, h: 169.8 },
    tiedosto: 'HUN.webp',
  },
  IRL: {
    lauta: 'maailmankartta',
    bbox: { x: 5305.71, y: 1078.13, w: 506.2, h: 316.37 },
    rajaus: { x: 5457.15, y: 1114.64, w: 203.3, h: 243.36 },
    tiedosto: 'IRL.webp',
  },
  ISL: {
    lauta: 'maailmankartta',
    bbox: { x: 4874.06, y: 461.58, w: 650.45, h: 406.78 },
    rajaus: { x: 4949.11, y: 546.7, w: 500.34, h: 236.54 },
    tiedosto: 'ISL.webp',
  },
  ITA: {
    lauta: 'maailmankartta',
    bbox: { x: 5597.46, y: 1331.61, w: 1309.09, h: 818.18 },
    rajaus: { x: 5981.94, y: 1426.02, w: 540.13, h: 629.37 },
    tiedosto: 'ITA.webp',
  },
  LTU: {
    lauta: 'maailmankartta',
    bbox: { x: 6447.29, y: 1043.62, w: 362.92, h: 226.83 },
    rajaus: { x: 6495.56, y: 1069.8, w: 266.39, h: 174.48 },
    tiedosto: 'LTU.webp',
  },
  LUX: {
    lauta: 'maailmankartta',
    bbox: { x: 5949.64, y: 1343.71, w: 174.63, h: 109.15 },
    rajaus: { x: 6003.83, y: 1356.3, w: 66.26, h: 83.96 },
    tiedosto: 'LUX.webp',
  },
  LVA: {
    lauta: 'maailmankartta',
    bbox: { x: 6439.5, y: 943.28, w: 427.19, h: 267.16 },
    rajaus: { x: 6488.79, y: 991.04, w: 328.61, h: 171.64 },
    tiedosto: 'LVA.webp',
  },
  MDA: {
    lauta: 'maailmankartta',
    bbox: { x: 6594.32, y: 1403.08, w: 369.68, h: 231.05 },
    rajaus: { x: 6699.51, y: 1429.74, w: 159.29, h: 177.73 },
    tiedosto: 'MDA.webp',
  },
  MKD: {
    lauta: 'maailmankartta',
    bbox: { x: 6444.71, y: 1668.29, w: 225.71, h: 141.07 },
    rajaus: { x: 6494.81, y: 1684.57, w: 125.51, h: 108.51 },
    tiedosto: 'MKD.webp',
  },
  MNE: {
    lauta: 'maailmankartta',
    bbox: { x: 6358.49, y: 1619.24, w: 242.65, h: 151.65 },
    rajaus: { x: 6427.78, y: 1636.74, w: 104.05, h: 116.66 },
    tiedosto: 'MNE.webp',
  },
  NLD: {
    lauta: 'maailmankartta',
    bbox: { x: 5822.79, y: 1177.71, w: 372.68, h: 232.92 },
    rajaus: { x: 5921.89, y: 1204.58, w: 174.49, h: 179.17 },
    tiedosto: 'NLD.webp',
  },
  NOR: {
    lauta: 'maailmankartta',
    bbox: { x: 5416.3, y: 17.37, w: 2024.77, h: 1265.48 },
    rajaus: { x: 5829.53, y: 163.39, w: 1198.3, h: 973.45 },
    tiedosto: 'NOR.webp',
  },
  POL: {
    lauta: 'maailmankartta',
    bbox: { x: 6102.55, y: 1071.12, w: 737.14, h: 460.72 },
    rajaus: { x: 6244.02, y: 1124.28, w: 454.21, h: 354.4 },
    tiedosto: 'POL.webp',
  },
  PRT: {
    lauta: 'maailmankartta',
    bbox: { x: 5284.09, y: 1638.37, w: 575.03, h: 359.39 },
    rajaus: { x: 5495.58, y: 1679.84, w: 152.05, h: 276.46 },
    tiedosto: 'PRT.webp',
  },
  ROU: {
    lauta: 'maailmankartta',
    bbox: { x: 6387.05, y: 1385.51, w: 557.32, h: 348.54 },
    rajaus: { x: 6451.35, y: 1428.83, w: 428.71, h: 261.91 },
    tiedosto: 'ROU.webp',
  },
  SRB: {
    lauta: 'maailmankartta',
    bbox: { x: 6302.66, y: 1490.58, w: 455.66, h: 284.79 },
    rajaus: { x: 6436.66, y: 1523.44, w: 187.66, h: 219.07 },
    tiedosto: 'SRB.webp',
  },
  SVK: {
    lauta: 'maailmankartta',
    bbox: { x: 6321.92, y: 1341.84, w: 335.63, h: 209.9 },
    rajaus: { x: 6360.65, y: 1381.39, w: 258.18, h: 130.81 },
    tiedosto: 'SVK.webp',
  },
  SVN: {
    lauta: 'maailmankartta',
    bbox: { x: 6216.85, y: 1482.43, w: 228.99, h: 143.12 },
    rajaus: { x: 6258.84, y: 1498.95, w: 145, h: 110.09 },
    tiedosto: 'SVN.webp',
  },
  SWE: {
    lauta: 'maailmankartta',
    bbox: { x: 5411.06, y: 145.79, w: 2020.27, h: 1262.67 },
    rajaus: { x: 6125.27, y: 291.48, w: 591.84, h: 971.28 },
    tiedosto: 'SWE.webp',
  },
  TUR: {
    lauta: 'maailmankartta',
    bbox: { x: 6535.89, y: 1553.07, w: 920.56, h: 575.71 },
    rajaus: { x: 6642.11, y: 1683.42, w: 708.12, h: 315.02 },
    tiedosto: 'TUR.webp',
  },
  UKR: {
    lauta: 'maailmankartta',
    bbox: { x: 6340.35, y: 1104.44, w: 1062.37, h: 664.4 },
    rajaus: { x: 6462.93, y: 1227.47, w: 817.21, h: 418.34 },
    tiedosto: 'UKR.webp',
  },
};

/*
 * LAUTOJEN PROJEKTIOT — vain mittajanaa varten (js/fokusmitat.js).
 *
 * Fokusnäkymän mittajana on RUUTUUN ankkuroitu ja laskee pituutensa
 * siitä, mitä ruudulla oikeasti näkyy. Siihen tarvitaan kaksi asiaa,
 * joita pelissä ei muuten ole: montako lautayksikköä pituusaste on, ja
 * mikä leveysaste on laudan y-koordinaatilla — Millerin lieriössä
 * kilometri on eri määrä yksiköitä Kreetalla kuin Thessalonikissa.
 *
 * LUVUT OVAT SAMAT KUIN KUVAN RENDERÖINNISSÄ
 * (tools/tee-fokuskartta.mjs LAUDAT). Maailmankartan omat vakiot ovat
 * tools/tee-maailmankartta.mjs:ssä (LEVEYS 12000, LON0 -175, POHJOINEN
 * 76) ja kaava tools/vanha-maailma.mjs sovitaMaailma; Eurooppa on
 * mukana katselutilaa varten (x = (lon + 11) · 19,2).
 *
 * Jos lauta joskus vaihtaa projektiota, tämän ja työkalun on
 * muututtava yhdessä — muuten jana väittäisi eri kilometrejä kuin se
 * kuva, jonka päällä se piirretään.
 */
export const FOKUS_LAUTAPROJEKTIOT = {
  maailmankartta: {
    tyyppi: 'miller', leveys: 12000, lon0: -175, pohjoinen: 76,
  },
  europe: {
    tyyppi: 'tasavali', lonA: 19.2, lonB: 11 * 19.2, latA: -26.3, latB: 72 * 26.3,
  },
};

/*
 * MAAN NIMI MAAN OMALLA KIELELLÄ — fokusnäkymän kartuutsin alarivi
 * (omistaja 25.8.2026).
 *
 * Kartuutsissa on suomenkielinen nimi (KREIKKA, laudan omasta
 * countryShapes-taulusta) ja sen alla viivan takana maan oma nimi.
 * Kreikan muoto on ΕΛΛΑΣ eikä nykykreikan Ελλάδα: se on
 * katharevousa-asu, jota 1873-atlakset käyttivät — ja täsmälleen sama
 * kuin kuvan vesileima (tools/fokuskartta/maat.mjs `vesileima`).
 * Latinalainen rinnakkaismuoto on perässä, koska kreikkalaiset
 * kirjaimet eivät kerro kaikille pelaajille miltä nimi kuulostaa.
 *
 * `valtiomuoto` on aikakauden hallintomuoto isoisän matkan aikaan
 * (Kreikka oli 1832–1924 ja 1935–1973 kuningaskunta). Se on
 * VAPAAEHTOINEN lisä: se ladotaan samalle riville pienenä kursiivina,
 * ja jos rivi ei mahdu, kenttä jätetään pois maasta eikä katkaista
 * CSS:llä.
 *
 * EI MUISTINVARAISIA KÄÄNNÖKSIÄ. Taulussa on vain Kreikka; uusi maa on
 * yksi rivi lisää, ja sen nimimuoto on tarkistettava samasta
 * lähteestä kuin muukin sisältö.
 */
export const FOKUS_MAANIMET = {
  GRC: { paikallinen: 'ΕΛΛΑΣ · Hellas', valtiomuoto: 'kuningaskunta v. 1873' },

  /*
   * === EUROOPAN MUUT MAAT (26.8.2026) ===
   *
   * JOKAINEN NIMI ON HAETTU LÄHTEESTÄ EIKÄ MUISTISTA. Lähde on
   * en-Wikipedian artikkelin johdanto tai tietolaatikon `native_name`
   * (haettu action=query&prop=revisions&rvsection=0), ja rivin
   * kommentissa on se merkkijono, jossa nimi lähteessä esiintyy.
   * Kyrillisen ja kreikkalaisen kirjoituksen perään ladotaan
   * latinalainen rinnakkaismuoto, koska kirjaimet eivät kerro kaikille
   * pelaajille miltä nimi kuulostaa — sama ratkaisu kuin Kreikassa.
   *
   * VALTIOMUOTO ON VAIN NELJÄLLÄ MAALLA. Se on vapaaehtoinen lisä, ja
   * jokainen väite vuodesta 1873 on erikseen tarkistettava. Kreikan
   * naapurit tarkistettiin nyt, muut jäävät ilman kunnes joku tarkistaa
   * ne — tyhjä kenttä on parempi kuin arvattu vuosiluku.
   *
   * Nimet ovat maiden NYKYISIÄ omakielisiä nimiä. Kreikan ΕΛΛΑΣ on
   * poikkeus: se on kuratoidun pilotin 1873-asu ja sama kuin lehden
   * vesileima.
   */

  // sq: "Shqipëri" or "Shqipëria" (en-Wikipedia, Albania).
  // Osmanivaltakunnasta irtautuminen julistettiin Vlorëssa 28.11.1912
  // (en-Wikipedia, Albanian Declaration of Independence).
  ALB: { paikallinen: 'Shqipëria', valtiomuoto: 'osmanivaltakuntaa v. 1873' },
  // de-AT: "Republik Österreich" (en-Wikipedia, Austria, native_name).
  AUT: { paikallinen: 'Österreich' },
  // nl/fr/de: "Koninkrijk België", "Royaume de Belgique",
  // "Königreich Belgien" (en-Wikipedia, Belgium, native_name).
  BEL: { paikallinen: 'België · Belgique · Belgien' },
  // bg: "България", tieteellinen translitteraatio Bŭlgariya
  // (en-Wikipedia, Bulgaria); latinalainen rinnakkaismuoto on maan
  // kansainvälinen nimiasu. Ruhtinaskunta perustettiin vasta Berliinin
  // kongressissa 1878 (en-Wikipedia, Principality of Bulgaria).
  BGR: { paikallinen: 'България · Bulgaria', valtiomuoto: 'osmanivaltakuntaa v. 1873' },
  // sh: "Bosna i Hercegovina" / "Босна и Херцеговина"
  // (en-Wikipedia, Bosnia and Herzegovina, native_name).
  BIH: { paikallinen: 'Bosna i Hercegovina' },
  // be: "Беларусь" (en-Wikipedia, Belarus, langx be).
  BLR: { paikallinen: 'Беларусь · Belarus' },
  // el: "Κύπρος", tr: "Kıbrıs" (en-Wikipedia, Cyprus, langx).
  CYP: { paikallinen: 'Κύπρος · Kıbrıs' },
  /*
   * Sveitsillä on neljä virallista kieltä, eikä yksikään niistä ole
   * muita virallisempi. Siksi tähän tulee se nimi, joka on
   * nimenomaan tätä pulmaa varten olemassa ja jonka isoisän
   * aikalaisatlas olisi käyttänyt: latinankielinen valaliiton nimi.
   * la: "Confoederatio helvetica" (en-Wikipedia, Switzerland,
   * native_name, "Name in official languages and Latin").
   */
  CHE: { paikallinen: 'Confoederatio Helvetica' },
  // cs: "Česko" (en-Wikipedia, Czech Republic, langx cs).
  CZE: { paikallinen: 'Česko' },
  // de: "Deutschland" (en-Wikipedia, Germany, langx de).
  DEU: { paikallinen: 'Deutschland' },
  // da: "Danmark" (en-Wikipedia, Denmark, native_name).
  DNK: { paikallinen: 'Danmark' },
  // es: "España" (en-Wikipedia, Spain, langx es).
  ESP: { paikallinen: 'España' },
  // et: "Eesti" (en-Wikipedia, Estonia, langx et).
  EST: { paikallinen: 'Eesti' },
  // fi: "Suomi" (en-Wikipedia, Finland, langx fi).
  FIN: { paikallinen: 'Suomi' },
  // fr: "France" (en-Wikipedia, France, IPA-rivi; virallinen nimi
  // "République française").
  FRA: { paikallinen: 'France' },
  // hr: "Hrvatska" (en-Wikipedia, Croatia, langx hr).
  HRV: { paikallinen: 'Hrvatska' },
  // hu: "Magyarország" (en-Wikipedia, Hungary, native_name).
  HUN: { paikallinen: 'Magyarország' },
  // ga: "Éire" (en-Wikipedia, Republic of Ireland, native_name).
  IRL: { paikallinen: 'Éire' },
  // is: "Ísland" (en-Wikipedia, Iceland, native_name).
  ISL: { paikallinen: 'Ísland' },
  // it: "Italia" (en-Wikipedia, Italy, langx it).
  ITA: { paikallinen: 'Italia' },
  // lb: "Groussherzogtum Lëtzebuerg" (en-Wikipedia, Luxembourg,
  // native_name) — suurherttuakunnan nimi ilman valtiomuotoa.
  LUX: { paikallinen: 'Lëtzebuerg' },
  // lv: "Latvijas Republika" (en-Wikipedia, Latvia, native_name).
  LVA: { paikallinen: 'Latvija' },
  // ro: "Republica Moldova" (en-Wikipedia, Moldova, native_name).
  MDA: { paikallinen: 'Republica Moldova' },
  // mk: "Северна Македонија", romanisointi "Severna Makedonija"
  // (en-Wikipedia, North Macedonia, langx mk). Alue oli Makedonian
  // muun osan tapaan osmanivaltakuntaa 1300-luvulta 1900-luvun alkuun
  // (en-Wikipedia, Ottoman Macedonia).
  MKD: {
    paikallinen: 'Северна Македонија · Severna Makedonija',
    valtiomuoto: 'osmanivaltakuntaa v. 1873',
  },
  // cnr: "Crna Gora" / "Црна Гора" (en-Wikipedia, Montenegro).
  MNE: { paikallinen: 'Crna Gora · Црна Гора' },
  // nl: "Nederland" (en-Wikipedia, Netherlands, native_name).
  NLD: { paikallinen: 'Nederland' },
  // nb/nn: "Kongeriket Norge" / "Kongeriket Noreg"
  // (en-Wikipedia, Norway, native_name).
  NOR: { paikallinen: 'Norge · Noreg' },
  // pl: "Rzeczpospolita Polska" (en-Wikipedia, Poland, native_name).
  POL: { paikallinen: 'Polska' },
  // pt-pt: "República Portuguesa" (en-Wikipedia, Portugal).
  PRT: { paikallinen: 'Portugal' },
  // ro: "România" (en-Wikipedia, Romania, langx ro).
  ROU: { paikallinen: 'România' },
  // sr: "Србија" / "Srbija" (en-Wikipedia, Serbia, lang-sr-Cyrl-Latn).
  SRB: { paikallinen: 'Србија · Srbija' },
  // sk: "Slovensko" (en-Wikipedia, Slovakia, langx sk).
  SVK: { paikallinen: 'Slovensko' },
  // sl: "Slovenija" (en-Wikipedia, Slovenia, langx sl).
  SVN: { paikallinen: 'Slovenija' },
  // sv: "Konungariket Sverige" (en-Wikipedia, Sweden, native_name).
  SWE: { paikallinen: 'Sverige' },
  // tr: "Türkiye" (en-Wikipedia, Turkey: *"officially the Republic of
  // Türkiye"*; tr-Wikipedian artikkelin nimi on Türkiye). Osmanivaltakunta
  // ulottui 1300-luvulta 1900-luvun alkuun (en-Wikipedia, Ottoman Empire).
  TUR: { paikallinen: 'Türkiye', valtiomuoto: 'osmanivaltakunta v. 1873' },
  // uk: "Україна" (en-Wikipedia, Ukraine, native_name).
  UKR: { paikallinen: 'Україна · Ukraїna' },
};

/*
 * Piirtääkö peli lisänimet SVG:nä kuvan päälle?
 *
 * EI PIIRRÄ. Nimet ovat nyt kuvassa (ks. tiedoston alku), ja SVG-nimet
 * olisivat niiden päällä tuplana. Lippu on olemassa, jotta paluu on
 * yhden rivin mittainen, jos kuvaan poltetut nimet eivät kestä
 * lähizoomia.
 */
export const FOKUS_SVG_NIMET = false;

export const FOKUS_LISANIMET = {
  GRC: {
    lauta: 'maailmankartta',
    /*
     * Muut kaupungit: EI pelattavia laattoja vaan pieniä pisteitä.
     * Nafplio on mukana tarinan takia (Kreikan ensimmäinen pääkaupunki,
     * 1829–1834 — isoisän matkan aikaan tuore muisto), vaikka se on
     * näistä pienin.
     */
    kaupungit: [
      // 22,9444 E / 40,6401 N
      { nimi: 'Thessaloniki', x: 6598.1, y: 1777.7 },
      // 21,7346 E / 38,2466 N
      { nimi: 'Patras', x: 6557.8, y: 1871.3, ank: 'end' },
      // 20,8537 E / 39,6650 N
      { nimi: 'Ioannina', x: 6528.5, y: 1816, ank: 'end' },
      // 22,8069 E / 37,5675 N
      { nimi: 'Nafplio', x: 6593.6, y: 1897.5 },
    ],
    /*
     * Vuoret: kolmio ja korkeus metreinä. Olympos on ainoa, jonka
     * kaikki tuntevat, mutta Parnassos on Delfoin vuori ja Taÿgetos
     * Spartan — kolmella saa Kreikan selkärangan näkyviin.
     */
    vuoret: [
      // 22,3586 E / 40,0853 N
      { nimi: 'Olympos', x: 6578.6, y: 1799.5, m: 2918, iso: true },
      // 22,6231 E / 38,5367 N
      { nimi: 'Parnassos', x: 6587.4, y: 1860.1, m: 2457 },
      // 22,3528 E / 36,9564 N
      { nimi: 'Taÿgetos', x: 6578.4, y: 1921, m: 2404 },
    ],
    /*
     * Meret: harvaan harvennettua kursiivia ulapalle, 1873-atlaksen
     * tapaan. Kulma seuraa meren muotoa.
     */
    meret: [
      // 25,15 E / 39,05 N
      { nimi: 'Egeanmeri', x: 6671.7, y: 1840.1, kulma: -7 },
      // 19,7 E / 37,9 N
      { nimi: 'Joonianmeri', x: 6490, y: 1884.7, kulma: -18 },
      // 24,6 E / 35,9 N
      { nimi: 'Kreetanmeri', x: 6653.3, y: 1961.3, koko: 0.8 },
    ],
  },
};
