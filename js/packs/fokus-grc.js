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
  /*
   * SAKSA ON KREIKAN JÄLKEEN TOINEN KURATOITU LEHTI (27.8.2026), ja
   * siksi sen luvut ovat muuttuneet kertaalleen: yleisen reitin ikkuna
   * oli maan oma muoto marginaaleineen (kuvasuhde 0,89), kuratoitu on
   * 1,25 ja keskitetty niin, että Berliini jää reilusti sisään.
   * Perustelut ovat tools/fokuskartta/maat.mjs FOKUSMAAT.DEU.
   */
  DEU: {
    lauta: 'maailmankartta',
    bbox: { x: 5854.95, y: 1072.88, w: 653.43, h: 522.75 },
    rajaus: { x: 5930.35, y: 1133.2, w: 502.64, h: 402.11 },
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
  /*
   * KROATIA on Kreikan jälkeen TOINEN KURATOITU lehti (omistajan erä
   * 27.8.2026): ikkuna, vesileima, vuoret ja kaupungit on aseteltu
   * käsin tools/fokuskartta/maat.mjs:n FOKUSMAAT.HRV-osiossa, ja
   * merten, vuorten ja jokien nimeäminen on luovutettu pelille.
   * Luvut alla ovat kuratoidun ajon tulos (27.8.2026) eivätkä enää
   * yleisen reitin geometriasta johdettuja.
   */
  HRV: {
    lauta: 'maailmankartta',
    bbox: { x: 6177.04, y: 1495.31, w: 409.25, h: 255.78 },
    rajaus: { x: 6224.26, y: 1524.82, w: 314.81, h: 196.75 },
    tiedosto: 'HRV.webp',
  },
  /*
   * UNKARI ON KREIKAN JÄLKEEN TOINEN KURATOITU LEHTI (27.8.2026).
   * Luvut ovat yleisen reitin sijaan tools/fokuskartta/maat.mjs:n
   * FOKUSMAAT.HUN-ikkunasta (lonKeski 19,5 · lat 45,2..49,1 ·
   * kuvasuhde 1,6), joten ne EIVÄT ole samat kuin ennen: ikkuna ei
   * enää ole maan oma laatikko marginaaleineen vaan Kreikan
   * kuvasuhteeseen sommiteltu lehti. Kuva on ajettava uudelleen samalla
   * kertaa kuin nämä luvut vaihdetaan — vanha HUN.webp osuisi väärään
   * laatikkoon, mikä on pahin mahdollinen virhe (ks. tee-fokuskartta.mjs
   * "KRIITTINEN KOHTA: TASAUS").
   */
  HUN: {
    lauta: 'maailmankartta',
    bbox: { x: 6312.37, y: 1404.48, w: 341.93, h: 213.71 },
    rajaus: { x: 6351.82, y: 1429.14, w: 263.03, h: 164.39 },
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

  /* --- AFRIKKA (maanosaparvi 25.8.2026, yleinen reitti) --- */
  AGO: {
    lauta: 'maailmankartta',
    bbox: { x: 5775.88, y: 3181.86, w: 1305.94, h: 816.21 },
    rajaus: { x: 6147.96, y: 3276.03, w: 561.79, h: 627.86 },
    tiedosto: 'AGO.webp',
  },
  CMR: {
    lauta: 'maailmankartta',
    bbox: { x: 5702.54, y: 2624.83, w: 1085.35, h: 678.35 },
    rajaus: { x: 6070.62, y: 2703.1, w: 349.19, h: 521.81 },
    tiedosto: 'CMR.webp',
  },
  COD: {
    lauta: 'maailmankartta',
    bbox: { x: 5664.02, y: 2789.62, w: 1788.33, h: 1117.71 },
    rajaus: { x: 6125.93, y: 2918.58, w: 864.5, h: 859.78 },
    tiedosto: 'COD.webp',
  },
  DZA: {
    lauta: 'maailmankartta',
    bbox: { x: 4957.8, y: 1654.73, w: 1860.61, h: 1162.88 },
    rajaus: { x: 5420.01, y: 1788.91, w: 936.19, h: 894.52 },
    tiedosto: 'DZA.webp',
  },
  EGY: {
    lauta: 'maailmankartta',
    bbox: { x: 6369.42, y: 1984.9, w: 980.74, h: 612.97 },
    rajaus: { x: 6583.01, y: 2055.62, w: 553.56, h: 471.51 },
    tiedosto: 'EGY.webp',
  },
  ETH: {
    lauta: 'maailmankartta',
    bbox: { x: 6636.2, y: 2562.47, w: 1093.24, h: 683.28 },
    rajaus: { x: 6843.06, y: 2641.31, w: 679.52, h: 525.6 },
    tiedosto: 'ETH.webp',
  },
  GHA: {
    lauta: 'maailmankartta',
    bbox: { x: 5493.73, y: 2754.81, w: 610.05, h: 381.28 },
    rajaus: { x: 5697.88, y: 2798.8, w: 201.75, h: 293.29 },
    tiedosto: 'GHA.webp',
  },
  KEN: {
    lauta: 'maailmankartta',
    bbox: { x: 6637.91, y: 2919.12, w: 916.69, h: 572.93 },
    rajaus: { x: 6915.05, y: 2985.23, w: 362.42, h: 440.72 },
    tiedosto: 'KEN.webp',
  },
  LBR: {
    lauta: 'maailmankartta',
    bbox: { x: 5319.26, y: 2870.98, w: 399.47, h: 249.67 },
    rajaus: { x: 5426.24, y: 2899.79, w: 185.51, h: 192.06 },
    tiedosto: 'LBR.webp',
  },
  LBY: {
    lauta: 'maailmankartta',
    bbox: { x: 5713.4, y: 1870.92, w: 1387.96, h: 867.47 },
    rajaus: { x: 6047.67, y: 1971.02, w: 719.43, h: 667.29 },
    tiedosto: 'LBY.webp',
  },
  MAR: {
    lauta: 'maailmankartta',
    bbox: { x: 4786.69, y: 1752.43, w: 1491.75, h: 932.35 },
    rajaus: { x: 5170.32, y: 1860.01, w: 724.51, h: 717.19 },
    tiedosto: 'MAR.webp',
  },
  MDG: {
    lauta: 'maailmankartta',
    bbox: { x: 6726.75, y: 3432.17, w: 1337.39, h: 835.87 },
    rajaus: { x: 7218.63, y: 3528.61, w: 353.64, h: 642.98 },
    tiedosto: 'MDG.webp',
  },
  MLI: {
    lauta: 'maailmankartta',
    bbox: { x: 4974.84, y: 2160.84, w: 1449.37, h: 905.86 },
    rajaus: { x: 5325.53, y: 2265.36, w: 747.99, h: 696.81 },
    tiedosto: 'MLI.webp',
  },
  MOZ: {
    lauta: 'maailmankartta',
    bbox: { x: 6214.18, y: 3346.68, w: 1607.03, h: 1004.39 },
    rajaus: { x: 6776.66, y: 3462.57, w: 482.08, h: 772.61 },
    tiedosto: 'MOZ.webp',
  },
  NAM: {
    lauta: 'maailmankartta',
    bbox: { x: 5851.51, y: 3621.75, w: 1196.23, h: 747.64 },
    rajaus: { x: 6142.67, y: 3708.02, w: 613.91, h: 575.11 },
    tiedosto: 'NAM.webp',
  },
  NGA: {
    lauta: 'maailmankartta',
    bbox: { x: 5665.04, y: 2621.04, w: 914.62, h: 571.64 },
    rajaus: { x: 5850.38, y: 2687, w: 543.95, h: 439.72 },
    tiedosto: 'NGA.webp',
  },
  SDN: {
    lauta: 'maailmankartta',
    bbox: { x: 6184.46, y: 2277.99, w: 1311.53, h: 819.7 },
    rajaus: { x: 6459.55, y: 2372.57, w: 761.35, h: 630.54 },
    tiedosto: 'SDN.webp',
  },
  SDS: {
    lauta: 'maailmankartta',
    bbox: { x: 6419.67, y: 2689.3, w: 828.74, h: 517.96 },
    rajaus: { x: 6566.59, y: 2749.07, w: 534.9, h: 398.43 },
    tiedosto: 'SDS.webp',
  },
  SEN: {
    lauta: 'maailmankartta',
    bbox: { x: 5140.28, y: 2592.47, w: 422.3, h: 263.94 },
    rajaus: { x: 5211.85, y: 2622.93, w: 279.17, h: 203.03 },
    tiedosto: 'SEN.webp',
  },
  SHN: {
    lauta: 'maailmankartta',
    bbox: { x: 5595.97, y: 3718.76, w: 93.39, h: 58.37 },
    rajaus: { x: 5620.35, y: 3725.49, w: 44.64, h: 44.9 },
    tiedosto: 'SHN.webp',
  },
  SLE: {
    lauta: 'maailmankartta',
    bbox: { x: 5290.96, y: 2835.46, w: 298.64, h: 186.65 },
    rajaus: { x: 5369.96, y: 2857, w: 140.63, h: 143.57 },
    tiedosto: 'SLE.webp',
  },
  SOM: {
    lauta: 'maailmankartta',
    bbox: { x: 6724.3, y: 2632.87, w: 1297.48, h: 810.92 },
    rajaus: { x: 7136.14, y: 2726.44, w: 473.81, h: 623.79 },
    tiedosto: 'SOM.webp',
  },
  TCD: {
    lauta: 'maailmankartta',
    bbox: { x: 5682.23, y: 2201.84, w: 1549.99, h: 968.74 },
    rajaus: { x: 6218.43, y: 2313.62, w: 477.6, h: 745.19 },
    tiedosto: 'TCD.webp',
  },
  TUN: {
    lauta: 'maailmankartta',
    bbox: { x: 5773.65, y: 1802.19, w: 754.17, h: 471.36 },
    rajaus: { x: 6051.02, y: 1856.58, w: 199.42, h: 362.58 },
    tiedosto: 'TUN.webp',
  },
  TZA: {
    lauta: 'maailmankartta',
    bbox: { x: 6486.66, y: 3106.39, w: 1019.03, h: 636.89 },
    rajaus: { x: 6743.93, y: 3179.88, w: 504.49, h: 489.92 },
    tiedosto: 'TZA.webp',
  },
  UGA: {
    lauta: 'maailmankartta',
    bbox: { x: 6640.57, y: 2997.76, w: 537.35, h: 335.84 },
    rajaus: { x: 6785.53, y: 3036.51, w: 247.43, h: 258.34 },
    tiedosto: 'UGA.webp',
  },
  ZAF: {
    lauta: 'maailmankartta',
    bbox: { x: 6004.73, y: 3787.55, w: 1302.65, h: 814.16 },
    rajaus: { x: 6283.79, y: 3881.5, w: 744.51, h: 626.27 },
    tiedosto: 'ZAF.webp',
  },
  ZWE: {
    lauta: 'maailmankartta',
    bbox: { x: 6472.73, y: 3646.72, w: 663.27, h: 414.55 },
    rajaus: { x: 6627.04, y: 3694.56, w: 354.66, h: 318.88 },
    tiedosto: 'ZWE.webp',
  },

  /* --- LÄHI-ITÄ JA KAUKASIA (maanosaparvi 25.8.2026, yleinen reitti) --- */
  ARE: {
    lauta: 'maailmankartta',
    bbox: { x: 7459.79, y: 2275.34, w: 345.52, h: 215.95 },
    rajaus: { x: 7523.43, y: 2300.26, w: 218.25, h: 166.12 },
    tiedosto: 'ARE.webp',
  },
  ARM: {
    lauta: 'maailmankartta',
    bbox: { x: 7185.6, y: 1706.56, w: 296.77, h: 185.48 },
    rajaus: { x: 7261.21, y: 1727.96, w: 145.54, h: 142.68 },
    tiedosto: 'ARM.webp',
  },
  AZE: {
    lauta: 'maailmankartta',
    bbox: { x: 7228.58, y: 1674.62, w: 389.53, h: 243.45 },
    rajaus: { x: 7290.71, y: 1702.71, w: 265.25, h: 187.27 },
    tiedosto: 'AZE.webp',
  },
  GEO: {
    lauta: 'maailmankartta',
    bbox: { x: 7080.33, y: 1586.87, w: 395.37, h: 247.26 },
    rajaus: { x: 7125.95, y: 1635.6, w: 304.13, h: 149.81 },
    tiedosto: 'GEO.webp',
  },
  IRN: {
    lauta: 'maailmankartta',
    bbox: { x: 6847.23, y: 1594.97, w: 1550.03, h: 968.77 },
    rajaus: { x: 7184.67, y: 1706.75, w: 875.15, h: 745.21 },
    tiedosto: 'IRN.webp',
  },
  IRQ: {
    lauta: 'maailmankartta',
    bbox: { x: 6850.01, y: 1783.73, w: 877.76, h: 548.6 },
    rajaus: { x: 7067.11, y: 1847.03, w: 443.58, h: 422 },
    tiedosto: 'IRQ.webp',
  },
  JOR: {
    lauta: 'maailmankartta',
    bbox: { x: 6853.03, y: 1996.97, w: 435.32, h: 272.08 },
    rajaus: { x: 6972.26, y: 2028.36, w: 196.87, h: 209.29 },
    tiedosto: 'JOR.webp',
  },
  KWT: {
    lauta: 'maailmankartta',
    bbox: { x: 7311.6, y: 2140.3, w: 208.97, h: 130.6 },
    rajaus: { x: 7364.41, y: 2155.37, w: 103.34, h: 100.46 },
    tiedosto: 'KWT.webp',
  },
  OMN: {
    lauta: 'maailmankartta',
    bbox: { x: 7215.32, y: 2178.91, w: 963.46, h: 602.17 },
    rajaus: { x: 7518.76, y: 2248.39, w: 356.59, h: 463.2 },
    tiedosto: 'OMN.webp',
  },
  QAT: {
    lauta: 'maailmankartta',
    bbox: { x: 7435.96, y: 2283.05, w: 207.01, h: 129.38 },
    rajaus: { x: 7505.03, y: 2297.98, w: 68.85, h: 99.52 },
    tiedosto: 'QAT.webp',
  },
  SAU: {
    lauta: 'maailmankartta',
    bbox: { x: 6545.88, y: 1882.97, w: 1581.91, h: 988.69 },
    rajaus: { x: 6859.37, y: 1997.05, w: 954.94, h: 760.53 },
    tiedosto: 'SAU.webp',
  },
  SYR: {
    lauta: 'maailmankartta',
    bbox: { x: 6867.59, y: 1833.49, w: 534.83, h: 334.27 },
    rajaus: { x: 6984.19, y: 1872.06, w: 301.64, h: 257.13 },
    tiedosto: 'SYR.webp',
  },
  YEM: {
    lauta: 'maailmankartta',
    bbox: { x: 7097.99, y: 2466.73, w: 706.88, h: 442.08 },
    rajaus: { x: 7179.56, y: 2527.84, w: 543.75, h: 319.84 },
    tiedosto: 'YEM.webp',
  },

  /* --- ITÄ- JA KAAKKOIS-AASIA (maanosaparvi 25.8.2026, yleinen reitti) --- */
  CHN: {
    lauta: 'maailmankartta',
    bbox: { x: 7221.55, y: 606.43, w: 4169.4, h: 2605.88 },
    rajaus: { x: 7919.72, y: 907.11, w: 2773.05, h: 2004.52 },
    tiedosto: 'CHN.webp',
  },
  HKG: {
    lauta: 'maailmankartta',
    bbox: { x: 9579.5, y: 2417.2, w: 115.62, h: 72.26 },
    rajaus: { x: 9607.91, y: 2425.54, w: 58.8, h: 55.59 },
    tiedosto: 'HKG.webp',
  },
  IDN: {
    lauta: 'maailmankartta',
    bbox: { x: 8412.07, y: 2449.08, w: 2708.87, h: 1694.1 },
    rajaus: { x: 8724.63, y: 2895.41, w: 2083.74, h: 801.44 },
    tiedosto: 'IDN.webp',
  },
  JPN: {
    lauta: 'maailmankartta',
    bbox: { x: 9163.71, y: 1252.38, w: 2298.02, h: 1436.26 },
    rajaus: { x: 9793.95, y: 1418.1, w: 1037.53, h: 1104.82 },
    tiedosto: 'JPN.webp',
  },
  KHM: {
    lauta: 'maailmankartta',
    bbox: { x: 9126.65, y: 2661.92, w: 410.83, h: 256.77 },
    rajaus: { x: 9212, y: 2691.55, w: 240.13, h: 197.51 },
    tiedosto: 'KHM.webp',
  },
  KOR: {
    lauta: 'maailmankartta',
    bbox: { x: 9815.96, y: 1776.43, w: 583.95, h: 364.97 },
    rajaus: { x: 9943.63, y: 1818.54, w: 328.62, h: 280.75 },
    tiedosto: 'KOR.webp',
  },
  LAO: {
    lauta: 'maailmankartta',
    bbox: { x: 8877.52, y: 2334.29, w: 837.01, h: 523.13 },
    rajaus: { x: 9124.5, y: 2394.66, w: 343.05, h: 402.41 },
    tiedosto: 'LAO.webp',
  },
  MMR: {
    lauta: 'maailmankartta',
    bbox: { x: 8133.68, y: 1977.67, w: 1844.27, h: 1152.67 },
    rajaus: { x: 8811.98, y: 2110.67, w: 487.67, h: 886.67 },
    tiedosto: 'MMR.webp',
  },
  MNG: {
    lauta: 'maailmankartta',
    bbox: { x: 8346.06, y: 919.99, w: 1895.96, h: 1185.72 },
    rajaus: { x: 8564.83, y: 1210.57, w: 1458.43, h: 604.56 },
    tiedosto: 'MNG.webp',
  },
  MYS: {
    lauta: 'maailmankartta',
    bbox: { x: 9339.41, y: 2882.27, w: 614.72, h: 384.2 },
    rajaus: { x: 9425.78, y: 2926.6, w: 441.98, h: 295.54 },
    tiedosto: 'MYS.webp',
  },
  PHL: {
    lauta: 'maailmankartta',
    bbox: { x: 9100.33, y: 2278.73, w: 1585.09, h: 990.68 },
    rajaus: { x: 9673.85, y: 2393.04, w: 438.05, h: 762.06 },
    tiedosto: 'PHL.webp',
  },
  PRK: {
    lauta: 'maailmankartta',
    bbox: { x: 9784.16, y: 1601.04, w: 595.4, h: 372.12 },
    rajaus: { x: 9934.78, y: 1643.98, w: 294.15, h: 286.25 },
    tiedosto: 'PRK.webp',
  },
  SGP: {
    lauta: 'maailmankartta',
    bbox: { x: 9246.06, y: 3136.27, w: 96, h: 60 },
    rajaus: { x: 9268.01, y: 3143.2, w: 52.1, h: 46.15 },
    tiedosto: 'SGP.webp',
  },
  THA: {
    lauta: 'maailmankartta',
    bbox: { x: 8503.97, y: 2324.57, w: 1425.47, h: 890.92 },
    rajaus: { x: 9028.24, y: 2427.37, w: 376.93, h: 685.32 },
    tiedosto: 'THA.webp',
  },
  TLS: {
    lauta: 'maailmankartta',
    bbox: { x: 9925.25, y: 3445.48, w: 194.27, h: 121.5 },
    rajaus: { x: 9947.67, y: 3463.13, w: 149.44, h: 86.2 },
    tiedosto: 'TLS.webp',
  },
  TWN: {
    lauta: 'maailmankartta',
    bbox: { x: 9669.49, y: 2304.52, w: 337.18, h: 210.74 },
    rajaus: { x: 9753.63, y: 2328.83, w: 168.9, h: 162.11 },
    tiedosto: 'TWN.webp',
  },
  VNM: {
    lauta: 'maailmankartta',
    bbox: { x: 8641.73, y: 2220.48, w: 1436.24, h: 897.65 },
    rajaus: { x: 9169.96, y: 2324.05, w: 379.78, h: 690.5 },
    tiedosto: 'VNM.webp',
  },

  /* --- ETELÄ- JA KESKI-AASIA (maanosaparvi 25.8.2026, yleinen reitti) --- */
  AFG: {
    lauta: 'maailmankartta',
    bbox: { x: 7607.29, y: 1729.02, w: 964.73, h: 602.96 },
    rajaus: { x: 7763.13, y: 1798.59, w: 653.05, h: 463.81 },
    tiedosto: 'AFG.webp',
  },
  BGD: {
    lauta: 'maailmankartta',
    bbox: { x: 8550.88, y: 2222.52, w: 587.06, h: 366.91 },
    rajaus: { x: 8739.67, y: 2264.86, w: 209.49, h: 282.24 },
    tiedosto: 'BGD.webp',
  },
  BTN: {
    lauta: 'maailmankartta',
    bbox: { x: 8739.94, y: 2203.34, w: 214.09, h: 133.8 },
    rajaus: { x: 8770.85, y: 2218.78, w: 152.26, h: 102.93 },
    tiedosto: 'BTN.webp',
  },
  IND: {
    lauta: 'maailmankartta',
    bbox: { x: 7153.78, y: 1569.07, w: 2875.95, h: 1797.47 },
    rajaus: { x: 7929.47, y: 1776.47, w: 1324.59, h: 1382.67 },
    tiedosto: 'IND.webp',
  },
  KAZ: {
    lauta: 'maailmankartta',
    bbox: { x: 6859.79, y: 698.74, w: 2407.16, h: 1505.42 },
    rajaus: { x: 7137.54, y: 1018.64, w: 1851.66, h: 865.61 },
    tiedosto: 'KAZ.webp',
  },
  KGZ: {
    lauta: 'maailmankartta',
    bbox: { x: 7999.68, y: 1549.8, w: 650.11, h: 406.57 },
    rajaus: { x: 8074.69, y: 1642.99, w: 500.08, h: 220.18 },
    tiedosto: 'KGZ.webp',
  },
  LKA: {
    lauta: 'maailmankartta',
    bbox: { x: 8340.46, y: 2832.41, w: 370.62, h: 231.64 },
    rajaus: { x: 8468.53, y: 2859.13, w: 114.48, h: 178.18 },
    tiedosto: 'LKA.webp',
  },
  NPL: {
    lauta: 'maailmankartta',
    bbox: { x: 8396.83, y: 2088.91, w: 479.65, h: 299.97 },
    rajaus: { x: 8452.18, y: 2138.78, w: 368.96, h: 200.23 },
    tiedosto: 'NPL.webp',
  },
  PAK: {
    lauta: 'maailmankartta',
    bbox: { x: 7437.82, y: 1724.04, w: 1387.46, h: 867.16 },
    rajaus: { x: 7764.25, y: 1824.1, w: 734.61, h: 667.05 },
    tiedosto: 'PAK.webp',
  },
  TJK: {
    lauta: 'maailmankartta',
    bbox: { x: 7968.22, y: 1695.93, w: 480.45, h: 300.28 },
    rajaus: { x: 8031.16, y: 1730.57, w: 354.57, h: 230.99 },
    tiedosto: 'TJK.webp',
  },
  TKM: {
    lauta: 'maailmankartta',
    bbox: { x: 7395.85, y: 1575.01, w: 844.42, h: 527.76 },
    rajaus: { x: 7496.01, y: 1635.91, w: 644.1, h: 405.97 },
    tiedosto: 'TKM.webp',
  },
  UZB: {
    lauta: 'maailmankartta',
    bbox: { x: 7479.38, y: 1426.28, w: 1012.05, h: 632.93 },
    rajaus: { x: 7596.16, y: 1515.74, w: 778.5, h: 454.01 },
    tiedosto: 'UZB.webp',
  },

  /*
   * --- VENÄJÄ JA KANADA (kuratoidut ikkunat 26.8.2026) ---
   * Molemmat kaatuivat yleisellä reitillä (ikkuna venyi yli puolen
   * maapallon), joten ikkunat ovat käsin tools/fokuskartta/maat.mjs
   * FOKUSMAAT-taulussa. HUOM RUS: bbox.x + w = 13085 eli laudan
   * leveyden 12000 YLI — tarkoituksella, lehti ylittää laudan sauman
   * (lon -175) ja peli kokeilee kierrot 0/±12000. Lukua EI saa
   * "korjata" välille [0, 12000): se siirtäisi lehden väärään
   * paikkaan.
   */
  CAN: {
    lauta: 'maailmankartta',
    bbox: { x: 182.5, y: -928.22, w: 4868.34, h: 3042.71 },
    rajaus: { x: 744.23, y: -577.13, w: 3744.88, h: 2340.55 },
    tiedosto: 'CAN.webp',
  },
  RUS: {
    lauta: 'maailmankartta',
    bbox: { x: 5581.38, y: -826.27, w: 7503.91, h: 2954.29 },
    rajaus: { x: 6447.21, y: -485.39, w: 5772.24, h: 2272.53 },
    tiedosto: 'RUS.webp',
  },

  /* --- POHJOIS- JA VÄLI-AMERIKKA (maanosaparvi 25.8.2026, yleinen reitti) --- */
  CUB: {
    lauta: 'maailmankartta',
    bbox: { x: 2863.23, y: 2282.44, w: 637.47, h: 398.67 },
    rajaus: { x: 2936.78, y: 2387.47, w: 490.36, h: 188.6 },
    tiedosto: 'CUB.webp',
  },
  GRL: {
    lauta: 'maailmankartta',
    bbox: { x: 2225.66, y: -1290.69, w: 4400.89, h: 2750.55 },
    rajaus: { x: 3028.01, y: -973.32, w: 2796.18, h: 2115.81 },
    tiedosto: 'GRL.webp',
  },
  GTM: {
    lauta: 'maailmankartta',
    bbox: { x: 2628.15, y: 2557.61, w: 394.79, h: 246.75 },
    rajaus: { x: 2734.31, y: 2586.09, w: 182.48, h: 189.81 },
    tiedosto: 'GTM.webp',
  },
  MEX: {
    lauta: 'maailmankartta',
    bbox: { x: 1482.35, y: 1812.52, w: 1866.31, h: 1167.18 },
    rajaus: { x: 1697.7, y: 1958.17, w: 1435.63, h: 875.89 },
    tiedosto: 'MEX.webp',
  },
  NIC: {
    lauta: 'maailmankartta',
    bbox: { x: 2786.19, y: 2650.38, w: 413.9, h: 258.69 },
    rajaus: { x: 2880.71, y: 2680.22, w: 224.86, h: 198.99 },
    tiedosto: 'NIC.webp',
  },
  PAN: {
    lauta: 'maailmankartta',
    bbox: { x: 2989.5, y: 2821.63, w: 347.12, h: 217.08 },
    rajaus: { x: 3029.55, y: 2869.35, w: 267.01, h: 121.64 },
    tiedosto: 'PAN.webp',
  },
  USA: {
    lauta: 'maailmankartta',
    bbox: { x: 936.22, y: 811.96, w: 3403.83, h: 2128.72 },
    rajaus: { x: 1328.97, y: 1219.2, w: 2618.33, h: 1314.23 },
    tiedosto: 'USA.webp',
  },

  /* --- ETELÄ-AMERIKKA (maanosaparvi 25.8.2026, yleinen reitti) --- */
  ARG: {
    lauta: 'maailmankartta',
    bbox: { x: 1833.44, y: 3471.4, w: 3758.64, h: 2349.15 },
    rajaus: { x: 3215.83, y: 3742.46, w: 993.87, h: 1807.04 },
    tiedosto: 'ARG.webp',
  },
  BOL: {
    lauta: 'maailmankartta',
    bbox: { x: 3072.97, y: 3362.75, w: 1282.99, h: 801.87 },
    rajaus: { x: 3437.91, y: 3455.27, w: 553.1, h: 616.82 },
    tiedosto: 'BOL.webp',
  },
  BRA: {
    lauta: 'maailmankartta',
    bbox: { x: 2135.51, y: 2522.28, w: 3848.8, h: 2405.5 },
    rajaus: { x: 3116.26, y: 2799.84, w: 1887.31, h: 1850.39 },
    tiedosto: 'BRA.webp',
  },
  CHL: {
    lauta: 'maailmankartta',
    bbox: { x: 1305.68, y: 3254.51, w: 4317.56, h: 2698.48 },
    rajaus: { x: 2893.63, y: 3565.87, w: 1141.66, h: 2075.75 },
    tiedosto: 'CHL.webp',
  },
  COL: {
    lauta: 'maailmankartta',
    bbox: { x: 2510.91, y: 2524.81, w: 1691.55, h: 1057.22 },
    rajaus: { x: 3020.12, y: 2646.8, w: 673.14, h: 813.25 },
    tiedosto: 'COL.webp',
  },
  ECU: {
    lauta: 'maailmankartta',
    bbox: { x: 2925.15, y: 3081.12, w: 608.36, h: 380.22 },
    rajaus: { x: 3098.19, y: 3124.99, w: 262.29, h: 292.48 },
    tiedosto: 'ECU.webp',
  },
  PER: {
    lauta: 'maailmankartta',
    bbox: { x: 2458.07, y: 2976.39, w: 1749.81, h: 1093.63 },
    rajaus: { x: 3046.16, y: 3102.57, w: 573.62, h: 841.25 },
    tiedosto: 'PER.webp',
  },
  PRY: {
    lauta: 'maailmankartta',
    bbox: { x: 3471.29, y: 3751.1, w: 827.56, h: 517.23 },
    rajaus: { x: 3694.56, y: 3810.78, w: 381.03, h: 397.87 },
    tiedosto: 'PRY.webp',
  },
  URY: {
    lauta: 'maailmankartta',
    bbox: { x: 3718.17, y: 4176.74, w: 511.99, h: 320 },
    rajaus: { x: 3853.38, y: 4213.66, w: 241.56, h: 246.15 },
    tiedosto: 'URY.webp',
  },
  VEN: {
    lauta: 'maailmankartta',
    bbox: { x: 3065.38, y: 2653.37, w: 1095.68, h: 684.8 },
    rajaus: { x: 3305.51, y: 2732.38, w: 615.43, h: 526.77 },
    tiedosto: 'VEN.webp',
  },

  /* --- OSEANIA (maanosaparvi 25.8.2026, yleinen reitti) --- */
  AUS: {
    lauta: 'maailmankartta',
    bbox: { x: 8494.89, y: 3056.26, w: 3561.89, h: 2226.18 },
    rajaus: { x: 9353.05, y: 3313.12, w: 1845.57, h: 1712.44 },
    tiedosto: 'AUS.webp',
  },
  FJI: {
    lauta: 'maailmankartta',
    bbox: { x: 11633.18, y: 3712.04, w: 303.43, h: 189.65 },
    rajaus: { x: 11716.46, y: 3733.92, w: 136.87, h: 145.88 },
    tiedosto: 'FJI.webp',
  },
  NZL: {
    lauta: 'maailmankartta',
    bbox: { x: 10509.67, y: 4117.96, w: 2138.33, h: 1336.46 },
    rajaus: { x: 11285.14, y: 4272.17, w: 587.4, h: 1028.04 },
    tiedosto: 'NZL.webp',
  },
  PNG: {
    lauta: 'maailmankartta',
    bbox: { x: 10292.35, y: 3124.26, w: 975.85, h: 609.91 },
    rajaus: { x: 10437.6, y: 3194.63, w: 685.36, h: 469.16 },
    tiedosto: 'PNG.webp',
  },
  SLB: {
    lauta: 'maailmankartta',
    bbox: { x: 10888.26, y: 3364.22, w: 499.01, h: 311.88 },
    rajaus: { x: 10973.44, y: 3400.21, w: 328.65, h: 239.91 },
    tiedosto: 'SLB.webp',
  },
  VUT: {
    lauta: 'maailmankartta',
    bbox: { x: 11091.74, y: 3555.36, w: 697.16, h: 435.73 },
    rajaus: { x: 11348.15, y: 3605.64, w: 184.35, h: 335.17 },
    tiedosto: 'VUT.webp',
  },
};

/*
 * ============ KAUKOZOOMIN YLEISLEHTI (omistaja 26.8.2026) ============
 *
 * *"Uloszoomattu maailmankartta näyttää tilkkutäkiltä."* Syy on
 * rakenteellinen: jokainen maalehti korostaa omaa maataan ja piirtää
 * naapurit haaleina, joten vierekkäiset lehdet esittävät saman
 * rajaseudun kahdella eri voimalla. Lähikuvassa juuri sitä
 * fokusmoodilta halutaan; kaukaa katsottuna se on tilkkutäkki — ja
 * lehtiä on ruudulla samalla neljä tai viisi, mikä on kaukozoomissa
 * pelkkää muistikuormaa ilman yhtään luettavaa yksityiskohtaa.
 *
 * YLEISLEHTI on yksi kuva koko laudalta ILMAN maakorostuksia: sama
 * paperi, sama hypsometria, sama meren syvyysporrastus kuin
 * maalehdillä, mutta kaikki maat samalla voimalla eikä yhtään
 * kartuutsia tai kaupunkinimeä (tools/tee-yleislehti.mjs). Peli
 * näyttää sen kaukozoomissa ja purkaa maalehdet siksi aikaa pois
 * (js/fokuskartta.js "KAUKOZOOMIN YLEISLEHTI").
 *
 * LEHTI ON LAUTAA KORKEAMPI — KAHDESTA SYYSTÄ.
 *
 * 1. KARTTA-ALA (omistaja 29.8.2026 ilta: *"alhaalta ja varsinkin
 *    ylhäältä leikkautuu liikaa karttaa pois"*). Lauta on 5399
 *    yksikköä korkea, mikä vastaa leveyspiirejä 76 °N…58 °S — juuri
 *    Grönlannin ja Huippuvuorten yli. Lehti piirretään siksi laudan
 *    ULKOPUOLELLE asti, leveyspiireille 84 °N…66 °S: y = −611 … 5811.
 *
 *    PROJEKTIO EI MUUTU. Millerin lieriön vakiot (LEVEYS 12000, LON0
 *    −175, POHJOINEN 76) ovat koskemattomat, joten y = 0 on yhä 76.
 *    leveyspiiri ja jokainen laudalle esilaskettu piste — kaupungit,
 *    fokuskohteet, eläintäyt, kohtaamiset — on entisellä paikallaan
 *    yksikön tarkkuudella. Vain kuvan laatikko kasvoi; Miller jatkuu
 *    nollan yläpuolelle itsestään.
 *
 * 2. ATLASKEHYS (omistajan tilaus 29.8.2026: *"ei näy sitä kartan
 *    reunapaperia ja lisämerkintöjä?"*). Kartta-alan ylä- ja
 *    alapuolelle on poltettu painetun atlaslehden PAPERIMARGINAALI
 *    kaksoisviivakehyksineen, kartusseineen, mittakaavajanoineen ja
 *    painajanriveineen: 435 yksikköä ylhäällä ja 450 alhaalla. Lehti on
 *    kiertävällä laudalla tasan laudan levyinen — sivureunaa ei ole
 *    missään zoomissa — joten marginaalia on vain ylhäällä ja alhaalla.
 *
 * KUMPI NÄKYY MISSÄKIN. Uloimmalla zoomilla näkymän leveys on laudan
 * leveys (js/kartta.js rajaaSkaala), joten näkyvä KORKEUS on ruudun
 * kuvasuhteen asia: 16:9-työpöydällä 6150 yksikköä, tabletilla (1180 x
 * 820) 7466. Kartta-ala (6422) täyttää siis leveän ruudun reunasta
 * reunaan — juuri se, mitä omistaja pyysi — ja arkin marginaali tulee
 * näkyviin korkeammalla ruudulla ja panoroitaessa.
 *
 * Luvut ovat suoraan työkalun kirjoittamasta MAAILMA.json-tiedostosta
 * (tools/tee-yleislehti.mjs; tasauksen ankkurit alle 1,7 lautayksikköä).
 *
 * TÄMÄ EI OLE FOKUS_POHJAT-TAULUSSA. Se ei ole minkään maan lehti:
 * atlaksen valinta, sumuverho ja kameran ajot lukevat FOKUS_POHJAT-
 * taulua maakohtaisesti, ja koko laudan kokoinen "maa" sotkisi ne
 * kaikki (valinta ottaisi sen aina, verho tekisi reiän koko maailmaan).
 */
export const YLEISLEHTI = {
  lauta: 'maailmankartta',
  bbox: { x: 0, y: -1046, w: 12000, h: 7307 },
  // Kameran ikkuna on kartta-ala (84 °N…66 °S) — marginaaliin ei ajeta.
  rajaus: { x: 0, y: -611, w: 12000, h: 6422 },
  tiedosto: 'MAAILMA.webp',
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
    /*
     * NIMI, SIIRTO JA ANKKURI OVAT LEHDEN OMAT (v1218). Rivit ovat nyt
     * tools/fokuskartta/maat.mjs GRC.kaupungit -listan peilikuva laudan
     * koordinaateissa: sama kirjoitusasu, sama `dx`/`dy` (prototyypin
     * pikseleitä, ks. piirto.js `S`) ja sama puoli. Peli tarvitsee ne
     * kahteen asiaan, jotka molemmat menivät v1217:ssä pieleen:
     *
     *   1. NIMIÖN VAIENNUS. Kohdemerkki jättää nimiönsä pois vain, jos
     *      lehti on POLTTANUT saman nimen samaan pisteeseen
     *      (js/fokuskohteet.js kohteenNimio) — Marathon, Kalamata,
     *      Ermoupoli ja Iraklion eivät ole tässä listassa, joten ne
     *      saavat nimensä pelistä.
     *   2. NAPAUTETTAVA NIMI. Poltettu nimi on kartalla se iso kohde,
     *      johon sormi osuu, ja sen laatikko lasketaan näistä luvuista
     *      (js/fokuskohteet.js kaupunginNimiLaatikko).
     */
    kaupungit: [
      // 22,9444 E / 40,6401 N
      { nimi: 'Thessaloníki', x: 6598.1, y: 1777.7, dx: 10, dy: -8 },
      // 21,7346 E / 38,2466 N
      { nimi: 'Pátra', x: 6557.8, y: 1871.3, dx: -10, dy: -8, ank: 'end' },
      // 20,8537 E / 39,6650 N
      { nimi: 'Ioánnina', x: 6528.5, y: 1816, dx: -10, dy: -6, ank: 'end' },
      // 22,8069 E / 37,5675 N
      { nimi: 'Náfplio', x: 6593.6, y: 1897.5, dx: 9, dy: 12 },
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

  /* =========================================================   * MUUT MAAT — LEHDEN PEILIKUVA, KONEEN KIRJOITTAMA
   *
   * Omistajan havainto Bulgarian lehdeltä 27.8.2026: *"Plovdivin nimi
   * näkyy kahteen kertaan."* Syy oli se, että yllä oleva taulu tunsi
   * vain Kreikan. Nimiön vaiennus ja napautettava nimi lukevat molemmat
   * TÄTÄ taulua (js/fokuskohteet.js `poltetutKaupungit`), joten maa,
   * jolla ei ole tässä riviä, ei voi kertoa pelille yhtään lehteen
   * poltettua nimeä — ja jokainen sen kaupunkikohde latoo nimensä
   * poltetun päälle.
   *
   * === MISTÄ RIVIT TULEVAT ===
   *
   * Kreikka on ainoa KURATOITU lehti: sen neljä kaupunkia on aseteltu
   * käsin (tools/fokuskartta/maat.mjs GRC.kaupungit). Kaikki muut ovat
   * YLEISEN REITIN lehtiä, joilla kaupungit poimitaan Natural Earthistä
   * kuvan renderöinnin aikana (tools/fokuskartta/aineisto.mjs `paikat`)
   * — repossa ei siis ole mitään, mistä nimet voisi lukea. Ne ovat
   * kuvan vieressä ämpärissä: tee-fokuskartta.mjs kirjaa valitut nimet
   * `<ISO>.json`-tiedoston kenttään `paikat`.
   *
   * NÄMÄ RIVIT ON LADOTTU SIITÄ (tools/tee-fokus-lisanimet.mjs), ja
   * niitä ei sovi säätää käsin: nimen paikka ja siirto tulevat suoraan
   * piirto.js:n kohdasta 8g, ja käsin muutettu luku siirtäisi
   * osuma-alueen pois nimen päältä. Kun maan lehti renderöidään
   * uudelleen, työkalu ajetaan ja lohko vaihdetaan kokonaan.
   *
   *   NODE_USE_ENV_PROXY=1 node tools/tee-fokus-lisanimet.mjs \
   *       --ne <kansio jossa ne_10m_populated_places.geojson>
   *
   * === `koko` ON UUSI KENTTÄ ===
   *
   * Kuratoitu lehti latoo kaupunginnimet aina kirjasinkoolla 13,5
   * (piirto.js 8f), mutta yleinen reitti valitsee kahdesta: 14, jos
   * Natural Earthin SCALERANK on enintään neljä, muuten 12,5 (8g).
   * Osuma-alueen leveys mitataan kirjasimesta, joten koko on kuljetettava
   * mukana — ilman sitä laatikko olisi Bulgarian pikkukaupungeilla
   * kahdeksan prosenttia liian leveä ja isoilla yhtä paljon liian kapea.
   * Puuttuva kenttä tarkoittaa yhä kuratoitua 13,5:tä.
   *
   * === VAIN NE MAAT, JOILLA ON KOHTEITA ===
   *
   * Taulu ei ole atlaksen hakemisto vaan pelin oma tarkistus: se
   * tarvitaan siellä, missä kartalla on kohdemerkkejä, joiden nimiö voi
   * osua poltettuun nimeen. Maat ovat siksi täsmälleen ne, joilla on
   * kohdepaketti (js/packs/fokuskohteet-*.js), ja
   * tests/fokusnimet.test.mjs vaatii jokaiselta sellaiselta maalta rivin
   * — uusi maa saa virheen heti, ei vasta pelitestissä.
   *
   * MONELLA POLTETULLA NIMELLÄ EI OLE VIELÄ KOHDETTA (esim. Bulgarian
   * Kyustendil, Burgas, Ruse). Ne ovat kuvassa pikseleitä eikä niitä voi
   * napauttaa mistään: rivi tässä taulussa ei tee nimestä napautettavaa,
   * vaan sen tekee kohde samassa pisteessä. Puuttuvat kohteet ovat
   * SISÄLTÖTYÖTÄ eivätkä koodivika, ja niiden lista on
   * tests/fokusnimet.test.mjs:n `KOHTEETTOMAT`.
   * ================================================================ */

  AFG: {
    lauta: 'maailmankartta',
    kaupungit: [
      // 65.6949 E / 31.61 N
      { nimi: 'Kandahar', x: 8023.2, y: 2121.9, dx: 9, dy: -1, koko: 14 },
      // 62.17 E / 34.33 N
      { nimi: 'Herat', x: 7905.7, y: 2020.6, dx: 9, dy: -1, koko: 14 },
      // 67.1 E / 36.7 N
      { nimi: 'Mazar-i-Sharif', x: 8070, y: 1930.8, dx: 9, dy: -1, koko: 14 },
      // 68.6993 E / 36.1393 N
      { nimi: 'Baghlan', x: 8123.3, y: 1952.2, dx: 9, dy: -1, koko: 12.5 },
      // 62.0968 E / 32.3917 N
      { nimi: 'Farah', x: 7903.2, y: 2093, dx: 9, dy: -1, koko: 12.5 },
      // 67.8227 E / 34.8133 N
      { nimi: 'Bamian', x: 8094.1, y: 2002.5, dx: 9, dy: -1, koko: 12.5 },
      // 70.4361 E / 34.4415 N
      { nimi: 'Jalalabad', x: 8181.2, y: 2016.4, dx: 9, dy: -1, koko: 12.5 },
      // 68.8725 E / 36.728 N
      { nimi: 'Kondoz', x: 8129.1, y: 1929.7, dx: 9, dy: -1, koko: 12.5 },
      // 64.7701 E / 35.9302 N
      { nimi: 'Meymaneh', x: 7992.3, y: 1960.2, dx: 9, dy: -1, koko: 12.5 },
    ],
  },
  BGR: {
    lauta: 'maailmankartta',
    kaupungit: [
      // 27.4746 E / 42.5146 N
      { nimi: 'Burgas', x: 6749.2, y: 1702.9, dx: 9, dy: -1, koko: 12.5 },
      // 27.8953 E / 43.2156 N
      { nimi: 'Varna', x: 6763.2, y: 1674.6, dx: 9, dy: -1, koko: 12.5 },
      // 25.9733 E / 43.8537 N
      { nimi: 'Ruse', x: 6699.1, y: 1648.7, dx: 9, dy: -1, koko: 12.5 },
      // 25.6227 E / 42.4231 N
      { nimi: 'Stara Zagora', x: 6687.4, y: 1706.6, dx: 9, dy: -1, koko: 12.5 },
      // 24.6134 E / 43.4238 N
      { nimi: 'Pleven', x: 6653.8, y: 1666.2, dx: 9, dy: -1, koko: 12.5 },
      // 25.6555 E / 43.0862 N
      { nimi: 'Turnovo', x: 6688.5, y: 1679.9, dx: 9, dy: -1, koko: 12.5 },
      // 22.6911 E / 42.2843 N
      { nimi: 'Kyustendil', x: 6589.7, y: 1712.2, dx: 9, dy: -1, koko: 12.5 },
      // 24.754 E / 42.154 N
      { nimi: 'Plovdiv', x: 6658.5, y: 1717.4, dx: 9, dy: -1, koko: 12.5 },
      // 26.33 E / 42.6794 N
      { nimi: 'Sliven', x: 6711, y: 1696.3, dx: 9, dy: -1, koko: 12.5 },
    ],
  },
  BIH: {
    lauta: 'maailmankartta',
    kaupungit: [
      // 17.18 E / 44.7804 N
      { nimi: 'Banja Luka', x: 6406, y: 1610.8, dx: 9, dy: -1, koko: 12.5 },
      // 17.82 E / 43.3505 N
      { nimi: 'Mostar', x: 6427.3, y: 1669.2, dx: 9, dy: -1, koko: 12.5 },
      // 18.68 E / 44.5505 N
      { nimi: 'Tuzla', x: 6456, y: 1620.3, dx: 9, dy: -1, koko: 12.5 },
      // 17.92 E / 44.22 N
      { nimi: 'Zenica', x: 6430.7, y: 1633.8, dx: 9, dy: -1, koko: 12.5 },
    ],
  },
  CHN: {
    lauta: 'maailmankartta',
    kaupungit: [
      // 104.0681 E / 30.6719 N
      { nimi: 'Chengdu', x: 9302.3, y: 2156.3, dx: 9, dy: -1, koko: 14 },
      // 87.5731 E / 43.807 N
      { nimi: 'Ürümqi', x: 8752.4, y: 1650.6, dx: 9, dy: -1, koko: 14 },
      // 114.2681 E / 30.582 N
      { nimi: 'Wuhan', x: 9642.3, y: 2159.6, dx: 9, dy: -1, koko: 14 },
      // 117.1966 E / 39.0828 N
      { nimi: 'Tianjin', x: 9739.9, y: 1838.8, dx: 9, dy: -1, koko: 14 },
      // 106.593 E / 29.5669 N
      { nimi: 'Chongqing', x: 9386.4, y: 2196.7, dx: 9, dy: -1, koko: 14 },
      // 123.448 E / 41.8069 N
      { nimi: 'Shenyeng', x: 9948.3, y: 1731.3, dx: 9, dy: -1, koko: 14 },
      // 118.778 E / 32.052 N
      { nimi: 'Nanjing', x: 9792.6, y: 2105.5, dx: 9, dy: -1, koko: 14 },
      // 106.7181 E / 26.582 N
      { nimi: 'Guiyang', x: 9390.6, y: 2304.4, dx: 9, dy: -1, koko: 14 },
      // 126.648 E / 45.7519 N
      { nimi: 'Harbin', x: 10054.9, y: 1570.7, dx: 9, dy: -1, koko: 14 },
    ],
  },
  EGY: {
    lauta: 'maailmankartta',
    kaupungit: [
      // 29.9481 E / 31.202 N
      { nimi: 'Alexandria', x: 6831.6, y: 2136.9, dx: 9, dy: -1, koko: 14 },
      // 32.29 E / 31.26 N
      { nimi: 'Bur Said', x: 6909.7, y: 2134.7, dx: 9, dy: -1, koko: 14 },
      // 32.5499 E / 30.005 N
      { nimi: 'Suez', x: 6918.3, y: 2180.7, dx: 9, dy: -1, koko: 14 },
      // 31.1799 E / 27.19 N
      { nimi: 'Asyut', x: 6872.7, y: 2282.6, dx: 9, dy: -1, koko: 14 },
      // 30.84 E / 29.31 N
      { nimi: 'El Faiyum', x: 6861.3, y: 2206, dx: 9, dy: -1, koko: 14 },
      // 32.8989 E / 24.0875 N
      { nimi: 'Aswan', x: 6930, y: 2393, dx: 9, dy: -1, koko: 14 },
      // 30.75 E / 28.09 N
      { nimi: 'El Minya', x: 6858.3, y: 2250.2, dx: 9, dy: -1, koko: 12.5 },
      // 33.83 E / 27.23 N
      { nimi: 'Hurghada', x: 6961, y: 2281.1, dx: 9, dy: -1, koko: 12.5 },
      // 30.55 E / 25.44 N
      { nimi: 'El Kharga', x: 6851.7, y: 2345.1, dx: 9, dy: -1, koko: 12.5 },
    ],
  },
  FRA: {
    lauta: 'maailmankartta',
    kaupungit: [
      // 4.8281 E / 45.772 N
      { nimi: 'Lyon', x: 5994.3, y: 1569.8, dx: 9, dy: -1, koko: 14 },
      // -0.597 E / 44.852 N
      { nimi: 'Bordeaux', x: 5813.4, y: 1607.9, dx: 9, dy: -1, koko: 14 },
      // 0.105 E / 49.505 N
      { nimi: 'Le Havre', x: 5836.8, y: 1411.7, dx: 9, dy: -1, koko: 14 },
      // 3.0781 E / 50.6519 N
      { nimi: 'Lille', x: 5935.9, y: 1361.7, dx: 9, dy: -1, koko: 12.5 },
      // 7.2631 E / 43.717 N
      { nimi: 'Nice', x: 6075.4, y: 1654.3, dx: 9, dy: -1, koko: 12.5 },
      // 1.448 E / 43.6219 N
      { nimi: 'Toulouse', x: 5881.6, y: 1658.2, dx: 9, dy: -1, koko: 12.5 },
      // 7.75 E / 48.58 N
      { nimi: 'Strasbourg', x: 6091.7, y: 1451.5, dx: 9, dy: -1, koko: 12.5 },
      // -1.67 E / 48.1 N
      { nimi: 'Rennes', x: 5777.7, y: 1472, dx: 9, dy: -1, koko: 12.5 },
      // 1.25 E / 45.83 N
      { nimi: 'Limoges', x: 5875, y: 1567.4, dx: 9, dy: -1, koko: 12.5 },
    ],
  },
  GBR: {
    lauta: 'maailmankartta',
    kaupungit: [
      // -4.2391 E / 55.8623 N
      { nimi: 'Glasgow', x: 5692, y: 1125.6, dx: 9, dy: -1, koko: 14 },
      // -1.9219 E / 52.4769 N
      { nimi: 'Birmingham', x: 5769.3, y: 1280.8, dx: 9, dy: -1, koko: 14 },
      // -2.2487 E / 53.4753 N
      { nimi: 'Manchester', x: 5758.4, y: 1235.7, dx: 9, dy: -1, koko: 14 },
      // -5.9282 E / 54.5942 N
      { nimi: 'Belfast', x: 5635.7, y: 1184.5, dx: 9, dy: -1, koko: 14 },
      // -1.5513 E / 53.79 N
      { nimi: 'Leeds', x: 5781.6, y: 1221.4, dx: 9, dy: -1, koko: 12.5 },
      // -1.6116 E / 54.9897 N
      { nimi: 'Newcastle', x: 5779.6, y: 1166.3, dx: 9, dy: -1, koko: 12.5 },
      // -3.1676 E / 51.4826 N
      { nimi: 'Cardiff', x: 5727.7, y: 1325.1, dx: 9, dy: -1, koko: 12.5 },
      // -2.9619 E / 53.4051 N
      { nimi: 'Liverpool', x: 5734.6, y: 1238.9, dx: 9, dy: -1, koko: 12.5 },
      // -3.0834 E / 58.4333 N
      { nimi: 'Wick', x: 5730.6, y: 1002.8, dx: 9, dy: -1, koko: 12.5 },
    ],
  },
  IRN: {
    lauta: 'maailmankartta',
    kaupungit: [
      // 59.5681 E / 36.272 N
      { nimi: 'Mashhad', x: 7818.9, y: 1947.2, dx: 9, dy: -1, koko: 14 },
      // 48.7181 E / 31.2819 N
      { nimi: 'Ahvaz', x: 7457.3, y: 2133.9, dx: 9, dy: -1, koko: 14 },
      // 48.515 E / 34.796 N
      { nimi: 'Hamadan', x: 7450.5, y: 2003.1, dx: 9, dy: -1, koko: 14 },
      // 54.37 E / 31.9201 N
      { nimi: 'Yazd', x: 7645.7, y: 2110.4, dx: 9, dy: -1, koko: 14 },
      // 56.2721 E / 27.2041 N
      { nimi: 'Bandar-e-Abbas', x: 7709.1, y: 2282.1, dx: 9, dy: -1, koko: 14 },
      // 50.9481 E / 34.652 N
      { nimi: 'Qom', x: 7531.6, y: 2008.5, dx: 9, dy: -1, koko: 12.5 },
      // 47.0581 E / 34.382 N
      { nimi: 'Kermanshah', x: 7401.9, y: 2018.7, dx: 9, dy: -1, koko: 12.5 },
      // 60.83 E / 29.5 N
      { nimi: 'Zahedan', x: 7861, y: 2199.1, dx: 9, dy: -1, koko: 12.5 },
      // 49.63 E / 37.3 N
      { nimi: 'Rasht', x: 7487.7, y: 1907.8, dx: 9, dy: -1, koko: 12.5 },
    ],
  },
  IRQ: {
    lauta: 'maailmankartta',
    kaupungit: [
      // 47.8116 E / 30.5155 N
      { nimi: 'Basra', x: 7427.1, y: 2162.1, dx: 9, dy: -1, koko: 14 },
      // 44.3354 E / 32.0003 N
      { nimi: 'Najaf', x: 7311.2, y: 2107.4, dx: 9, dy: -1, koko: 14 },
      // 44.3923 E / 35.4722 N
      { nimi: 'Kirkuk', x: 7313.1, y: 1977.5, dx: 9, dy: -1, koko: 14 },
      // 44.0067 E / 36.181 N
      { nimi: 'Irbil', x: 7300.2, y: 1950.6, dx: 9, dy: -1, koko: 12.5 },
      // 45.4309 E / 35.5613 N
      { nimi: 'As Sulaymaniyah', x: 7347.7, y: 1974.2, dx: 9, dy: -1, koko: 12.5 },
      // 44.0245 E / 32.6149 N
      { nimi: 'Karbala', x: 7300.8, y: 2084.7, dx: 9, dy: -1, koko: 12.5 },
      // 46.2676 E / 31.0429 N
      { nimi: 'An Nasiriyah', x: 7375.6, y: 2142.7, dx: 9, dy: -1, koko: 12.5 },
      // 47.1512 E / 31.8416 N
      { nimi: 'Al Amarah', x: 7405, y: 2113.3, dx: 9, dy: -1, koko: 12.5 },
      // 45.8304 E / 32.4907 N
      { nimi: 'Al Kut', x: 7361, y: 2089.3, dx: 9, dy: -1, koko: 12.5 },
    ],
  },
  ITA: {
    lauta: 'maailmankartta',
    kaupungit: [
      // 9.2031 E / 45.4719 N
      { nimi: 'Milan', x: 6140.1, y: 1582.3, dx: 9, dy: -1, koko: 14 },
      // 14.2431 E / 40.842 N
      { nimi: 'Naples', x: 6308.1, y: 1769.7, dx: 9, dy: -1, koko: 14 },
      // 15.08 E / 37.5 N
      { nimi: 'Catania', x: 6336, y: 1900.1, dx: 9, dy: -1, koko: 14 },
      // 7.668 E / 45.0723 N
      { nimi: 'Turin', x: 6088.9, y: 1598.8, dx: 9, dy: -1, koko: 12.5 },
      // 8.93 E / 44.41 N
      { nimi: 'Genoa', x: 6131, y: 1626, dx: 9, dy: -1, koko: 12.5 },
      // 8.57 E / 40.73 N
      { nimi: 'Sassari', x: 6119, y: 1774.1, dx: 9, dy: -1, koko: 12.5 },
      // 14.7699 E / 40.6804 N
      { nimi: 'Salerno', x: 6325.7, y: 1776.1, dx: 9, dy: -1, koko: 12.5 },
      // 16.8728 E / 41.1142 N
      { nimi: 'Bari', x: 6395.8, y: 1758.9, dx: 9, dy: -1, koko: 12.5 },
      // 11.34 E / 44.5004 N
      { nimi: 'Bologna', x: 6211.3, y: 1622.3, dx: 9, dy: -1, koko: 12.5 },
    ],
  },
  JOR: {
    lauta: 'maailmankartta',
    kaupungit: [
      // 35.9314 E / 31.952 N
      { nimi: 'Amman', x: 7031, y: 2109.2, dx: 9, dy: -1, koko: 14 },
      // 35.0777 E / 29.527 N
      { nimi: 'Al Aqabah', x: 7002.6, y: 2198.1, dx: 9, dy: -1, koko: 12.5 },
      // 35.7047 E / 31.1851 N
      { nimi: 'Al Karak', x: 7023.5, y: 2137.5, dx: 9, dy: -1, koko: 12.5 },
      // 35.85 E / 32.55 N
      { nimi: 'Irbid', x: 7028.3, y: 2087.1, dx: 9, dy: -1, koko: 12.5 },
    ],
  },
  LBY: {
    lauta: 'maailmankartta',
    kaupungit: [
      // 20.0648 E / 32.1187 N
      { nimi: 'Banghazi', x: 6502.2, y: 2103.1, dx: 9, dy: -1, koko: 14 },
      // 14.4333 E / 27.0333 N
      { nimi: 'Sabha', x: 6314.4, y: 2288.2, dx: 9, dy: -1, koko: 14 },
      // 15.1 E / 32.38 N
      { nimi: 'Misrata', x: 6336.7, y: 2093.4, dx: 9, dy: -1, koko: 14 },
      // 12.0791 E / 32.9344 N
      { nimi: 'Zuwara', x: 6236, y: 2072.8, dx: 9, dy: -1, koko: 14 },
      // 15.8 E / 26.3666 N
      { nimi: 'Tmassa', x: 6360, y: 2312.1, dx: 9, dy: -1, koko: 14 },
      // 23.96 E / 32.08 N
      { nimi: 'Tubruq', x: 6632, y: 2104.5, dx: 9, dy: -1, koko: 12.5 },
      // 20.22 E / 30.77 N
      { nimi: 'Ajdabiya', x: 6507.3, y: 2152.7, dx: 9, dy: -1, koko: 12.5 },
      // 16.59 E / 31.21 N
      { nimi: 'Surt', x: 6386.3, y: 2136.6, dx: 9, dy: -1, koko: 12.5 },
      // 22.6391 E / 32.7648 N
      { nimi: 'Darnah', x: 6588, y: 2079.1, dx: 9, dy: -1, koko: 12.5 },
    ],
  },
  MEX: {
    lauta: 'maailmankartta',
    kaupungit: [
      // -103.332 E / 20.672 N
      { nimi: 'Guadalajara', x: 2388.9, y: 2512.7, dx: 9, dy: -1, koko: 14 },
      // -98.2037 E / 19.0326 N
      { nimi: 'Puebla', x: 2559.9, y: 2569.5, dx: 9, dy: -1, koko: 14 },
      // -117.0819 E / 32.502 N
      { nimi: 'Tijuana', x: 1930.6, y: 2088.9, dx: 9, dy: -1, koko: 14 },
      // -97.87 E / 22.3 N
      { nimi: 'Tampico', x: 2571, y: 2455.8, dx: 9, dy: -1, koko: 14 },
      // -106.0869 E / 28.6469 N
      { nimi: 'Chihuahua', x: 2297.1, y: 2230.1, dx: 9, dy: -1, koko: 14 },
      // -99.916 E / 16.85 N
      { nimi: 'Acapulco', x: 2502.8, y: 2644.6, dx: 9, dy: -1, koko: 14 },
      // -96.16 E / 19.1773 N
      { nimi: 'Veracruz', x: 2628, y: 2564.5, dx: 9, dy: -1, koko: 14 },
      // -86.83 E / 21.17 N
      { nimi: 'Cancún', x: 2939, y: 2495.3, dx: 9, dy: -1, koko: 14 },
      // -93.15 E / 16.75 N
      { nimi: 'Tuxtla Gutiérrez', x: 2728.3, y: 2648, dx: 9, dy: -1, koko: 14 },
    ],
  },
  ROU: {
    lauta: 'maailmankartta',
    kaupungit: [
      // 27.5749 E / 47.1683 N
      { nimi: 'Iași', x: 6752.5, y: 1511.4, dx: 9, dy: -1, koko: 14 },
      // 28.61 E / 44.2027 N
      { nimi: 'Constanța', x: 6787, y: 1634.5, dx: 9, dy: -1, koko: 14 },
      // 23.5984 E / 46.7884 N
      { nimi: 'Cluj-Napoca', x: 6619.9, y: 1527.4, dx: 9, dy: -1, koko: 12.5 },
      // 21.2234 E / 45.7588 N
      { nimi: 'Timișoara', x: 6540.8, y: 1570.4, dx: 9, dy: -1, koko: 12.5 },
      // 25.6072 E / 45.6475 N
      { nimi: 'Brașov', x: 6686.9, y: 1575, dx: 9, dy: -1, koko: 12.5 },
      // 23.8259 E / 44.3263 N
      { nimi: 'Craiova', x: 6627.5, y: 1629.4, dx: 9, dy: -1, koko: 12.5 },
      // 26.9196 E / 46.5784 N
      { nimi: 'Bacău', x: 6730.7, y: 1536.2, dx: 9, dy: -1, koko: 12.5 },
      // 24.8758 E / 44.8563 N
      { nimi: 'Pitești', x: 6662.5, y: 1607.7, dx: 9, dy: -1, koko: 12.5 },
      // 24.5578 E / 46.5582 N
      { nimi: 'Tirgu Mures', x: 6651.9, y: 1537.1, dx: 9, dy: -1, koko: 12.5 },
    ],
  },
  SYR: {
    lauta: 'maailmankartta',
    kaupungit: [
      // 36.7181 E / 34.7319 N
      { nimi: 'Homs', x: 7057.3, y: 2005.5, dx: 9, dy: -1, koko: 12.5 },
      // 40.13 E / 35.3304 N
      { nimi: 'Dayr az Zawr', x: 7171, y: 1982.9, dx: 9, dy: -1, koko: 12.5 },
      // 39.02 E / 35.9304 N
      { nimi: 'Ar Raqqah', x: 7134, y: 1960.2, dx: 9, dy: -1, koko: 12.5 },
      // 35.8866 E / 34.8846 N
      { nimi: 'Tartus', x: 7029.6, y: 1999.8, dx: 9, dy: -1, koko: 12.5 },
      // 40.9186 E / 34.4504 N
      { nimi: 'Abu Kamal', x: 7197.3, y: 2016.1, dx: 9, dy: -1, koko: 12.5 },
      // 36.5666 E / 32.7004 N
      { nimi: 'As Suwayda', x: 7052.2, y: 2081.5, dx: 9, dy: -1, koko: 12.5 },
      // 38.2833 E / 34.5504 N
      { nimi: 'Tadmur', x: 7109.4, y: 2012.4, dx: 9, dy: -1, koko: 12.5 },
      // 36.7333 E / 34.017 N
      { nimi: 'Ad Nabk', x: 7057.8, y: 2032.4, dx: 9, dy: -1, koko: 12.5 },
      // 35.8236 E / 33.1257 N
      { nimi: 'Al Qunaytirah', x: 7027.5, y: 2065.7, dx: 9, dy: -1, koko: 12.5 },
    ],
  },
  TUN: {
    lauta: 'maailmankartta',
    kaupungit: [
      // 10.1797 E / 36.8028 N
      { nimi: 'Tunis', x: 6172.7, y: 1926.9, dx: 9, dy: -1, koko: 14 },
      // 10.625 E / 35.83 N
      { nimi: 'Sousse', x: 6187.5, y: 1964, dx: 9, dy: -1, koko: 14 },
      // 10.72 E / 34.75 N
      { nimi: 'Sfax', x: 6190.7, y: 2004.8, dx: 9, dy: -1, koko: 12.5 },
      // 10.1 E / 33.9004 N
      { nimi: 'Gabès', x: 6170, y: 2036.8, dx: 9, dy: -1, koko: 12.5 },
      // 11.1 E / 33.5104 N
      { nimi: 'Zarzis', x: 6203.3, y: 2051.3, dx: 9, dy: -1, koko: 12.5 },
      // 9.855 E / 37.2904 N
      { nimi: 'Bizerte', x: 6161.8, y: 1908.2, dx: 9, dy: -1, koko: 12.5 },
      // 8.78 E / 34.4204 N
      { nimi: 'Gafsa', x: 6126, y: 2017.2, dx: 9, dy: -1, koko: 12.5 },
      // 10.73 E / 36.4603 N
      { nimi: 'Nabeul', x: 6191, y: 1940, dx: 9, dy: -1, koko: 12.5 },
      // 8.83 E / 35.1804 N
      { nimi: 'Qasserine', x: 6127.7, y: 1988.6, dx: 9, dy: -1, koko: 12.5 },
    ],
  },
  TUR: {
    lauta: 'maailmankartta',
    kaupungit: [
      // 29.0681 E / 40.2019 N
      { nimi: 'Bursa', x: 6802.3, y: 1794.9, dx: 9, dy: -1, koko: 14 },
      // 35.3181 E / 36.9969 N
      { nimi: 'Adana', x: 7010.6, y: 1919.4, dx: 9, dy: -1, koko: 14 },
      // 32.4731 E / 37.877 N
      { nimi: 'Konya', x: 6915.8, y: 1885.6, dx: 9, dy: -1, koko: 14 },
      // 36.3437 E / 41.28 N
      { nimi: 'Samsun', x: 7044.8, y: 1752.3, dx: 9, dy: -1, koko: 14 },
      // 37.383 E / 37.0769 N
      { nimi: 'Gaziantep', x: 7079.4, y: 1916.4, dx: 9, dy: -1, koko: 12.5 },
      // 30.698 E / 36.8919 N
      { nimi: 'Antalya', x: 6856.6, y: 1923.5, dx: 9, dy: -1, koko: 12.5 },
      // 39.72 E / 40.98 N
      { nimi: 'Trabzon', x: 7157.3, y: 1764.2, dx: 9, dy: -1, koko: 12.5 },
      // 35.49 E / 38.735 N
      { nimi: 'Kayseri', x: 7016.3, y: 1852.3, dx: 9, dy: -1, koko: 12.5 },
      // 30.53 E / 39.795 N
      { nimi: 'Eskişehir', x: 6851, y: 1810.9, dx: 9, dy: -1, koko: 12.5 },
    ],
  },
  ZWE: {
    lauta: 'maailmankartta',
    kaupungit: [
      // 31.0428 E / -17.8158 N
      { nimi: 'Harare', x: 6868.1, y: 3811.6, dx: 9, dy: -1, koko: 14 },
      // 28.58 E / -20.17 N
      { nimi: 'Bulawayo', x: 6786, y: 3892.9, dx: 9, dy: -1, koko: 14 },
      // 32.65 E / -18.97 N
      { nimi: 'Mutare', x: 6921.7, y: 3851.4, dx: 9, dy: -1, koko: 12.5 },
      // 29.82 E / -19.45 N
      { nimi: 'Gweru', x: 6827.3, y: 3867.9, dx: 9, dy: -1, koko: 12.5 },
      // 29.9099 E / -18.33 N
      { nimi: 'Kadoma', x: 6830.3, y: 3829.3, dx: 9, dy: -1, koko: 12.5 },
      // 26.5 E / -18.37 N
      { nimi: 'Hwange', x: 6716.7, y: 3830.7, dx: 9, dy: -1, koko: 12.5 },
      // 30.82 E / -20.0596 N
      { nimi: 'Masvingo', x: 6860.7, y: 3889.1, dx: 9, dy: -1, koko: 12.5 },
      // 30.18 E / -17.3596 N
      { nimi: 'Chinhoyi', x: 6839.3, y: 3795.9, dx: 9, dy: -1, koko: 12.5 },
      // 30.05 E / -20.3296 N
      { nimi: 'Zvishavane', x: 6835, y: 3898.4, dx: 9, dy: -1, koko: 12.5 },
    ],
  },

  /*
   * UNKARI — VAIN KAUPUNGIT, JA SE ON KOKO TAULUN AJATUS.
   *
   * Tässä taulussa on kahdenlaista tavaraa. `vuoret` ja `meret` ovat
   * jäänne SVG-nimeämisen ajalta (FOKUS_SVG_NIMET on false, joten
   * js/fokuskartta.js piirraLisanimet ei piirrä niistä mitään), mutta
   * `kaupungit` on elävää dataa: se on ainoa paikka, joka kertoo
   * pelille, MITKÄ NIMET LEHTEEN ON POLTETTU. Peli tarvitsee sen
   * kahteen asiaan (js/fokuskohteet.js) — nimiön vaientamiseen
   * kohteelta, jonka nimi on jo kuvassa, ja poltetun nimen
   * napautuslaatikon laskemiseen.
   *
   * Unkarin lehdellä poltettuja nimiä on täsmälleen viisi, ja rivit
   * ovat tools/fokuskartta/maat.mjs:n HUN.kaupungit -listan peilikuva
   * laudan koordinaateissa: sama kirjoitusasu, sama `dx`/`dy`
   * (prototyyppipikseleitä) ja sama puoli. Jos toista listaa muuttaa,
   * on muutettava molempia — muuten napautuslaatikko jää nimen viereen
   * tyhjälle paperille.
   *
   * VUORIA JA MERIÄ EI TÄSSÄ OLE, koska niitä ei ole lehdessäkään:
   * `poltetutNimet` on Unkarilla false kaikissa kolmessa lajissa, eli
   * vuorten ja jokien nimet tulevat kohteiden nimiöistä ja meriä ei
   * sisämaavaltiossa ole. Tyhjä kohta on siis oikea tieto, ei
   * puuttuva rivi.
   */
  HUN: {
    lauta: 'maailmankartta',
    kaupungit: [
      // 21,6273 E / 47,5316 N
      { nimi: 'Debrecen', x: 6554.2, y: 1496.1, dx: 10, dy: -8 },
      // 20,1414 E / 46,2530 N
      { nimi: 'Szeged', x: 6504.7, y: 1549.8, dx: 10, dy: 10 },
      // 18,2323 E / 46,0727 N
      { nimi: 'Pécs', x: 6441.1, y: 1557.3, dx: -10, dy: 8, ank: 'end' },
      // 20,3772 E / 47,9025 N
      { nimi: 'Eger', x: 6512.6, y: 1480.4, dx: 9, dy: -10 },
      // 17,6504 E / 47,6875 N
      { nimi: 'Győr', x: 6421.7, y: 1489.5, dx: -10, dy: -8, ank: 'end' },
    ],
  },

  /*
   * SAKSA (27.8.2026): lehteen ei ole poltettu yhtäkään nimeä
   * (maat.mjs DEU: kaupungit, meret, vuoret ja joet kaikki pois),
   * joten taulussa on tyhjä lista. Rivi on silti pakollinen:
   * tests/fokusnimet.test.mjs vaatii jokaiselta kohdemaalta
   * nimenomaisen kirjauksen, jotta tyhjyys on päätös eikä unohdus.
   */
  DEU: {
    lauta: 'maailmankartta',
    kaupungit: [],
  },

  /*
   * KROATIA (27.8.2026). Tässä on VAIN `kaupungit`, eikä se ole
   * puute vaan koko taulun tarkoitus tällä lehdellä.
   *
   * FOKUS_SVG_NIMET on false, joten peli ei piirrä näistä riveistä
   * mitään (piirraLisanimet palaa heti). Ainoa käyttäjä on
   * js/fokuskohteet.js, joka tarvitsee poltetut kaupunginnimet
   * kahteen asiaan:
   *
   *   1. NIMIÖN VAIENNUS (kohteenNimio → nimiJoKartalla). Kohde, jonka
   *      nimi on jo kuvassa, ei lado nimiötään sen viereen. Vertailu on
   *      PAIKALLA eikä nimellä, ja toleranssi on kolme lautayksikköä.
   *   2. NAPAUTETTAVA NIMI (kaupunginNimiLaatikko). Poltettu nimi on
   *      kartalla se iso kohde, johon sormi osuu; peli laskee sen
   *      laatikon näistä luvuista lehden omilla mitoilla.
   *
   * KROATIAN LEHDELLÄ VUORIA JA MERIÄ EI OLE TÄSSÄ, koska niiden
   * nimiä ei ole poltettu kuvaan lainkaan (tools/fokuskartta/maat.mjs
   * HRV `poltetutNimet`). Nimi tulee nimiöstä, ja rivi tässä taulussa
   * olisi lupaus poltosta, jota ei ole tehty.
   *
   * RIVIT OVAT maat.mjs HRV.kaupungit -listan PEILIKUVA laudan
   * koordinaateissa: sama kirjoitusasu, sama `dx`/`dy` (prototyypin
   * pikseleitä, ks. piirto.js `S`) ja sama puoli. `ank: 'end'` on
   * SVG:n vastine piirto.js:n `ank: 'right'` -arvolle.
   *
   * DUBROVNIK EI OLE TÄSSÄ. Se on pelilaatta, jonka nimen peli latoo
   * itse, eikä sitä ole poltettu lehteen — laatan hoitaa
   * nimiJoKartalla-tarkistuksen toinen haara (pack.cities).
   */
  HRV: {
    lauta: 'maailmankartta',
    kaupungit: [
      // 15,9772 E / 45,8144 N
      { nimi: 'Zagreb', x: 6365.9, y: 1568.1, dx: 10, dy: -8 },
      // 16,4402 E / 43,5081 N
      { nimi: 'Split', x: 6381.3, y: 1662.8, dx: 9, dy: 12 },
      // 14,4422 E / 45,3271 N
      { nimi: 'Rijeka', x: 6314.7, y: 1588.3, dx: -10, dy: -16, ank: 'end' },
      // 15,2314 E / 44,1194 N
      { nimi: 'Zadar', x: 6341, y: 1637.9, dx: -10, dy: -6, ank: 'end' },
      // 18,6955 E / 45,5550 N
      { nimi: 'Osijek', x: 6456.5, y: 1578.8, dx: 9, dy: 12 },
    ],
  },
};
