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
