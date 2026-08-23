// Maakohtaiset alueet ja kaupunkien maat Oseanian laudalle.
//
// Sisarteos js/packs/northamerica-countries.js:lle ja
// js/packs/middleeast-countries.js:lle. lippu on Wikimedia Commonsin
// tiedostonimi (Special:FilePath hakee sen suoraan); kahdeksan kymmenestä
// on kopioitu sellaisenaan maailmankartan COUNTRY_SHAPESista, jossa ne on
// jo tarkistettu, ja kaksi puuttuvaa (Uusi-Kaledonia, Norfolkinsaari) on
// tarkistettu Commonsin rajapinnasta 23.8.2026 — kummankin tiedosto on
// olemassa. Yhtään tiedostonimeä ei ole arvattu.
//
// Renkaat on tuotettu Natural Earthin 50m-maapolygoneista (public domain)
// komennolla
//   node tools/oceania-countries.mjs AUS PNG SLB VUT NCL NFK FJI NZL TLS IDN
// Älä muokkaa pistelistoja käsin. Muoto on todellinen rantaviiva; pelissä
// se rajataan laudan tyylitellyn rannikon clipPathilla (ui.js, maa-rajaus),
// ettei sävy valu mereen — samoin kuin muilla laudoilla.
//
// PROJEKTIO ON JOHDETTU LAUDASTA, EI ARVATTU — EIKÄ SE OLE LINEAARINEN.
//
// Lauta on Lambertin konformisessa kartioprojektiossa (standardileveys-
// piirit 10° ja 40° etelää, keskimeridiaani 145° itäistä), ja kartiossa
// pituuspiirit kaartuvat — mikään suora ei osu sekä Baliin että Fidžiin.
// Siksi renkaat on projisoitu laudan OMALLA kaavalla: sama
// tools/mapdata/oceania.json ja sama laskenta kuin tools/project.mjs:ssä,
// jolla laudan pisteet on aikanaan tuotettu.
//   lambertConic(mapdata.projection) + fitToBoard(kaikki laudan pisteet)
// Työkalu tarkistaa sovituksen joka ajolla laudan omia kaupunkeja vasten:
//
//   33 kohdetta, suurin jäännös 0,64 yksikköä (Norfolk) = 0,06 % laudan
//   leveydestä. Yhtään kohdetta ei ole laudalla tahallaan siirretty, joten
//   poikkeuslistaa ei tarvita — Pohjois-Amerikassa Havaiji ja Havanna
//   oli siirretty käsin, tällä laudalla ei mitään.
//
// 180. PITUUSPIIRI. Tämä on Oseanian oma pulma, jota millään aiemmalla
// laudalla ei ollut: Fidži on päivämääränrajan molemmin puolin. Natural
// Earthin pituusasteet kierretään keskimeridiaanin kanssa samalle
// kierrokselle välille (−35°, 325°], jolloin −179,8° → 180,2° ja Fidžin
// itäpuoli jatkuu saumattomasti länsipuolesta. Ratkaisu on yhtenä
// funktiona työkalussa (normalisoiLon) ja selitetty siellä tarkemmin.
// Ilman sitä renkaat piirtyisivät vaakaviivoina halki kartan.
//
// KYTKETTY LAUTAAN 23.8.2026 (oceania.js:n map-olio: countryShapes ja
// cityCountry). Ennen tätä laudalla oli vain cityCountry, ja maalehdet
// aukesivat vain maailmankartalla.
//
// Maita on kymmenen — täsmälleen ne, joihin laudan 33 kohdetta kuuluvat.
// Pistokoe 23.8.2026: 32 kohdetta 33:sta osuu oman maansa renkaan sisään,
// ja ainoa poikkeus Norfolk on 0,4 yksikön päässä oman saarensa rannasta
// (koko saari on 1,3 yksikköä leveä).

export const OCEANIA_COUNTRY_SHAPES = {
  // Kaksi rengasta: manner ja Tasmania. Fraserinsaari, Melvillensaari ja
  // Kangaroo Island putosivat näkyvyystestissä — lauta ei piirrä niitä
  // omina ääriviivoinaan, joten maasävyn rajaus söisi ne kokonaan.
  // Keskus on renkaiden yhteinen rajauslaatikon keskipiste ja osuu
  // mantereen renkaan sisään (tarkistettu pistetestillä 23.8.2026).
  AUS: {
    nimi: 'Australia',
    lippu: 'Flag of Australia.svg',
    keskus: [333.1, 541.7],
    leveys: 546,
    // 2 rengasta, 226 pistettä.
    renkaat: [
      [[464.1, 308.1], [473.2, 345.0], [483.9, 343.2], [496.1, 354.1], [498.1, 376.6], [505.1, 384.3], [506.7, 405.1], [511.7, 415.9], [545.3, 436.5], [547.0, 439.4], [544.1, 440.9], [554.6, 456.3], [557.6, 469.5], [561.4, 471.3], [563.0, 465.5], [569.3, 471.8], [571.2, 469.7], [572.9, 485.5], [586.1, 496.2], [602.8, 525.1], [601.0, 543.6], [606.3, 566.4], [594.9, 607.7], [587.9, 622.6], [571.9, 639.3], [556.6, 673.2], [552.4, 699.2], [527.0, 704.8], [514.4, 715.9], [506.6, 716.8], [508.7, 723.3], [496.6, 713.8], [497.6, 709.2], [491.3, 713.2], [488.4, 710.7], [493.3, 706.9], [490.5, 703.9], [474.1, 718.3], [460.8, 711.7], [448.2, 711.7], [435.4, 704.8], [427.6, 695.0], [426.3, 681.5], [416.4, 669.8], [420.4, 670.0], [420.1, 666.4], [406.6, 670.7], [410.2, 661.5], [404.3, 648.7], [400.0, 663.8], [390.0, 665.9], [391.3, 660.8], [396.1, 660.5], [396.7, 648.9], [401.8, 639.7], [399.1, 624.6], [393.0, 641.0], [383.1, 647.7], [377.0, 657.8], [378.3, 662.7], [374.2, 662.3], [367.2, 657.4], [371.3, 657.0], [361.6, 638.5], [353.3, 633.8], [353.5, 627.2], [312.3, 614.9], [284.3, 621.2], [264.5, 632.3], [246.7, 635.3], [227.1, 649.3], [220.0, 664.4], [174.4, 673.3], [153.0, 694.4], [129.0, 695.4], [115.2, 690.0], [112.5, 679.0], [117.4, 679.9], [120.0, 672.3], [116.3, 652.7], [103.5, 634.9], [98.2, 618.5], [79.0, 590.6], [63.8, 576.0], [65.7, 574.0], [70.4, 580.3], [73.5, 578.7], [65.3, 566.6], [70.7, 573.6], [77.8, 574.4], [76.3, 567.9], [60.7, 549.6], [60.0, 510.0], [63.7, 518.5], [69.2, 507.0], [92.9, 483.5], [102.8, 482.5], [124.3, 466.9], [149.8, 456.0], [165.0, 430.3], [161.3, 415.8], [169.8, 403.5], [181.0, 418.5], [180.3, 411.0], [183.9, 411.9], [184.0, 408.7], [177.4, 403.1], [178.5, 398.8], [195.8, 398.9], [190.3, 398.1], [192.8, 391.1], [188.6, 390.0], [188.9, 385.8], [192.1, 381.9], [197.9, 383.7], [193.9, 379.9], [201.4, 378.1], [197.9, 372.4], [203.5, 364.4], [204.6, 368.5], [209.8, 367.2], [209.2, 359.2], [217.2, 361.0], [221.3, 353.9], [230.1, 357.2], [242.2, 366.2], [241.7, 375.9], [248.1, 366.5], [264.4, 370.2], [263.9, 365.8], [267.0, 365.1], [259.3, 359.2], [274.5, 327.0], [278.4, 328.5], [284.0, 320.3], [286.5, 323.3], [305.5, 319.1], [304.3, 311.8], [294.9, 310.0], [290.8, 307.7], [292.8, 305.6], [340.7, 317.3], [353.8, 310.6], [350.9, 316.8], [355.5, 316.2], [356.8, 319.7], [361.8, 312.0], [369.0, 316.1], [363.4, 331.7], [355.4, 333.5], [356.5, 343.1], [350.1, 358.8], [392.9, 383.8], [404.2, 386.1], [408.0, 392.5], [419.6, 397.7], [431.0, 392.9], [437.4, 378.2], [441.7, 356.5], [440.7, 323.9], [445.4, 320.6], [441.6, 314.7], [445.6, 310.0], [448.4, 292.7], [455.1, 289.5], [462.4, 307.7]],
      [[492.3, 749.0], [495.2, 748.7], [501.6, 752.7], [507.4, 755.0], [512.3, 753.7], [513.7, 755.1], [513.8, 753.4], [515.4, 752.4], [519.4, 751.9], [521.0, 752.6], [523.0, 750.2], [526.0, 750.7], [527.1, 749.2], [530.1, 750.5], [530.9, 752.0], [531.0, 772.0], [530.4, 772.6], [530.3, 770.7], [529.2, 769.6], [529.9, 768.9], [529.6, 768.1], [527.3, 772.6], [525.8, 778.9], [526.5, 786.9], [524.2, 787.8], [522.6, 784.6], [523.1, 784.0], [524.1, 784.4], [524.4, 783.2], [521.8, 781.8], [521.3, 784.2], [520.3, 784.8], [518.6, 780.9], [519.2, 783.1], [517.9, 787.6], [517.0, 788.3], [515.0, 786.6], [514.9, 787.6], [515.9, 788.6], [513.5, 793.9], [511.5, 793.7], [509.7, 792.2], [503.9, 792.8], [503.3, 790.0], [506.0, 789.7], [505.8, 789.1], [501.9, 788.7], [497.5, 782.8], [494.9, 776.7], [494.1, 771.8], [496.2, 773.5], [497.3, 775.9], [497.9, 773.7], [495.7, 770.4], [494.6, 771.2], [494.6, 768.4], [489.2, 758.9], [487.6, 752.0], [488.4, 747.2], [489.6, 747.9]],
    ],
  },
  // Kaksi rengasta: Uuden-Guinean itäpuolisko ja Uusi-Britannia. Maan
  // raja Indonesiaa vastaan kulkee 141. pituuspiiriä pitkin, ja se näkyy
  // renkaissa suorana pystyviivana — se on oikea raja, ei karsinnan jälki.
  // Uusi-Irlanti, Bougainville ja Manus jäävät laudan piirtämän rannikon
  // ulkopuolelle. Keskus on automaattinen ja osuu mantereen renkaaseen.
  PNG: {
    nimi: 'Papua-Uusi-Guinea',
    lippu: 'Flag of Papua New Guinea.svg',
    keskus: [518.5, 224.8],
    leveys: 185,
    // 2 rengasta, 92 pistettä.
    renkaat: [
      [[429.3, 264.5], [428.2, 229.5], [426.4, 227.0], [428.0, 220.6], [426.1, 160.4], [467.6, 172.9], [476.7, 178.9], [483.4, 179.2], [504.1, 195.3], [503.7, 204.6], [530.3, 214.0], [536.2, 219.7], [536.2, 225.8], [525.3, 225.9], [522.8, 229.2], [527.3, 237.8], [540.7, 248.2], [547.5, 263.3], [557.0, 263.2], [557.8, 270.6], [569.3, 274.0], [565.3, 275.7], [567.0, 279.0], [581.8, 283.1], [575.6, 283.9], [578.5, 287.4], [573.4, 289.3], [564.9, 284.3], [534.5, 279.0], [523.1, 268.1], [522.3, 262.9], [517.2, 261.1], [508.0, 247.2], [484.1, 239.1], [478.3, 242.2], [470.6, 237.5], [475.2, 245.1], [468.6, 246.1], [470.1, 249.2], [453.1, 251.4], [448.1, 249.5], [462.3, 253.7], [466.5, 258.1], [466.4, 261.3], [455.3, 267.2], [448.8, 264.8], [431.8, 266.1]],
      [[603.1, 189.7], [603.9, 190.0], [606.4, 188.5], [610.9, 190.8], [610.1, 193.2], [610.5, 197.1], [609.6, 198.5], [608.0, 200.5], [604.1, 201.1], [603.6, 202.2], [605.9, 206.9], [604.7, 208.5], [601.3, 210.0], [595.7, 209.5], [594.1, 212.6], [590.9, 215.2], [578.6, 220.1], [565.6, 220.1], [561.4, 216.5], [557.3, 217.2], [551.0, 212.9], [546.0, 211.1], [545.0, 209.5], [545.1, 207.5], [546.6, 206.4], [555.6, 206.9], [561.3, 208.6], [568.9, 207.9], [571.0, 206.8], [572.0, 201.9], [573.3, 199.9], [574.6, 200.9], [573.1, 202.7], [572.8, 204.6], [574.5, 208.1], [579.9, 207.3], [583.3, 208.3], [586.0, 207.4], [590.0, 202.2], [593.1, 199.9], [598.7, 198.9], [598.8, 194.9], [597.1, 189.4], [598.0, 187.9], [602.3, 189.0]],
    ],
  },
  // Viisi rengasta: Guadalcanal, Santa Isabel, Uusi-Georgia, Malaita ja
  // Makira. Lauta piirtää saariketjun yhtenä vinona nauhana, ja renkaat
  // asettuvat sen päälle omina saarinaan.
  // KESKUS ON SIIRRETTY KÄSIN. Automaattinen rajauslaatikon keskipiste
  // (715,1, 269,6) osuu saarten väliseen mereen 7,3 yksikön päähän
  // lähimmästä rannasta. Käsin valittu piste on Guadalcanalilla eli
  // samalla saarella kuin Honiara (tarkistettu pistetestillä 23.8.2026).
  SLB: {
    nimi: 'Salomonsaaret',
    lippu: 'Flag of the Solomon Islands.svg',
    keskus: [725, 286],
    leveys: 85,
    // 5 rengasta, 65 pistettä.
    renkaat: [
      [[737.3, 265.4], [740.6, 270.5], [739.4, 273.3], [742.4, 276.3], [743.3, 282.0], [744.6, 284.9], [744.4, 286.8], [742.1, 283.1], [737.7, 278.8], [736.5, 275.6], [735.4, 270.0], [736.3, 268.8], [734.7, 266.0], [734.9, 265.3], [736.6, 265.3]],
      [[688.1, 244.5], [688.5, 245.1], [687.2, 245.9], [685.3, 244.4], [682.0, 243.8], [679.1, 241.3], [676.2, 236.7], [672.8, 233.3], [673.3, 231.7], [675.2, 232.3], [681.5, 236.9], [683.7, 241.4], [687.5, 244.2]],
      [[748.2, 299.5], [750.0, 300.7], [754.1, 301.3], [756.2, 306.7], [757.4, 307.5], [753.6, 307.1], [750.4, 305.7], [745.2, 302.0], [744.8, 298.7], [741.9, 297.8], [742.3, 295.9], [744.9, 296.7], [748.0, 299.2]],
      [[720.1, 278.6], [723.3, 281.5], [729.2, 282.0], [733.0, 285.1], [735.3, 288.2], [735.5, 289.7], [732.8, 290.4], [728.0, 288.1], [720.1, 286.3], [717.7, 282.4], [717.8, 279.6], [719.2, 278.4]],
      [[723.4, 267.3], [720.1, 264.3], [709.7, 257.9], [704.8, 253.0], [704.4, 251.2], [702.9, 249.4], [707.2, 250.7], [712.5, 256.1], [717.3, 258.6], [723.2, 264.0], [722.3, 265.1], [723.1, 266.1]],
    ],
  },
  // Kuusi rengasta: Espiritu Santo, Malakula, Ambrym, Epi, Efate (jolla
  // Port Vila on) ja Tanna. Efate on laudalla 6 yksikköä leveä ja Tanna
  // 6,1 — yleinen 12 yksikön kokoraja olisi pudottanut kummankin, joten
  // Vanuatulla on oma 3 yksikön raja (ks. tools/oceania-countries.mjs).
  // KESKUS ON SIIRRETTY KÄSIN: automaattinen piste (825,3, 411,4) osuu
  // saarten väliseen mereen. Käsin valittu piste on Espiritu Santolla,
  // ketjun suurimmalla saarella.
  VUT: {
    nimi: 'Vanuatu',
    lippu: 'Flag of Vanuatu.svg',
    keskus: [814, 388],
    leveys: 30,
    // 6 rengasta, 67 pistettä.
    renkaat: [
      [[813.7, 378.5], [813.8, 383.7], [815.5, 383.7], [817.0, 380.8], [818.3, 380.9], [817.8, 383.0], [818.6, 384.1], [818.8, 388.9], [816.9, 390.8], [811.9, 390.7], [810.6, 387.0], [811.3, 384.1], [810.4, 378.3], [811.5, 375.3], [812.7, 376.9]],
      [[820.2, 399.3], [823.7, 402.5], [825.5, 405.7], [824.2, 406.5], [822.1, 405.9], [820.7, 406.8], [819.6, 406.3], [819.2, 400.1], [818.8, 399.4], [817.3, 399.7], [816.5, 398.5], [817.7, 395.6], [819.6, 396.4]],
      [[840.2, 447.0], [839.5, 447.6], [838.9, 447.4], [835.5, 445.0], [836.0, 442.6], [836.5, 441.7], [837.6, 441.5], [838.4, 441.8], [838.6, 443.3], [839.6, 444.1], [838.8, 444.4], [839.9, 445.8]],
      [[831.4, 423.7], [832.4, 426.1], [833.0, 426.4], [831.8, 427.7], [828.0, 426.8], [828.8, 426.4], [828.5, 425.7], [826.8, 425.5], [828.9, 423.4], [829.8, 423.6]],
      [[833.4, 412.2], [833.8, 412.5], [833.5, 413.1], [831.6, 412.0], [829.5, 411.9], [829.0, 410.1], [829.3, 409.3], [830.3, 408.8], [832.3, 411.7]],
      [[832.4, 405.2], [830.7, 405.0], [828.5, 404.2], [827.4, 402.6], [829.5, 402.2], [831.2, 401.0], [831.8, 403.4], [832.5, 404.6]],
    ],
  },
  // Yksi rengas: Grande Terre, se pitkä kapea saari, jonka lauta piirtää.
  // Loyautén saaret (Lifou, Maré, Ouvéa) putosivat näkyvyystestissä —
  // lauta ei piirrä niitä lainkaan.
  // LIPPU: Uudella-Kaledonialla ei ole yhtä virallista lippua, vaan
  // vuodesta 2010 kaksi rinnakkain (Ranskan trikolori ja kanakkien
  // lippu). Commonsin nimi "Flag of New Caledonia.svg" ohjautuu
  // tiedostoon "Flags of New Caledonia.svg", jossa molemmat ovat vierekkäin;
  // nimi on tarkistettu Commonsin rajapinnasta 23.8.2026 (public domain).
  NCL: {
    nimi: 'Uusi-Kaledonia',
    lippu: 'Flag of New Caledonia.svg',
    keskus: [780.6, 472.5],
    leveys: 37,
    // 1 rengasta, 21 pistettä.
    renkaat: [
      [[764.5, 454.7], [766.0, 455.8], [767.7, 455.7], [774.4, 462.8], [777.3, 464.6], [782.7, 473.1], [790.8, 480.0], [798.5, 488.2], [799.0, 490.9], [798.3, 491.8], [795.5, 492.1], [791.5, 489.6], [787.9, 486.5], [787.1, 484.3], [776.2, 476.0], [772.4, 471.8], [765.8, 462.4], [763.5, 458.1], [763.7, 456.1], [762.2, 454.1], [762.7, 452.8]],
    ],
  },
  // Yksi rengas — ja se on laudan pienin muoto: koko saari on 1,3
  // yksikköä leveä (noin 8 km). Yleinen 12 yksikön kokoraja olisi
  // pudottanut sen äänettömästi, joten Norfolkilla on oma 0,8 yksikön
  // raja aivan kuten Bermudalla Pohjois-Amerikan laudalla.
  // Lippu tarkistettu Commonsin rajapinnasta 23.8.2026 (CC0).
  NFK: {
    nimi: 'Norfolkinsaari',
    lippu: 'Flag of Norfolk Island.svg',
    keskus: [794.5, 594.5],
    leveys: 1,
    // 1 rengasta, 11 pistettä.
    renkaat: [
      [[794.5, 593.9], [795.1, 594.4], [795.0, 594.6], [794.5, 595.1], [794.4, 594.7], [794.2, 594.7], [794.0, 594.8], [794.0, 594.4], [794.2, 594.0], [794.0, 594.0], [794.2, 593.8]],
    ],
  },
  // Kaksi rengasta: Viti Levu (jolla Suva on) ja Vanua Levu.
  // TÄMÄ MAA ON 180. PITUUSPIIRIN PÄÄLLÄ. Viti Levu on 177,3…178,7°
  // itäistä, Vanua Levu 178,5…180,0 ja Taveuni jo rajan takana
  // (−179,8° = 180,2° kierrettynä). Ilman pituusasteiden kiertoa
  // renkaat olisivat piirtyneet vaakaviivoina halki kartan; kierto
  // tehdään työkalussa (normalisoiLon) ja se on kirjattu sinne.
  // Taveunin rengas jää laudan Fidži-ääriviivan ulkopuolelle ja putoaa
  // näkyvyystestissä, samoin Kadavu etelässä. Vanua Levun itälaita
  // yltää x-arvoon 1001 eli yhden yksikön laudan reunan yli — pelissä
  // maasävy rajataan rannikkoon, joten se ei näy.
  // KESKUS ON SIIRRETTY KÄSIN saarten välisestä merestä Viti Levulle.
  FJI: {
    nimi: 'Fidži',
    lippu: 'Flag of Fiji.svg',
    keskus: [967, 457],
    leveys: 45,
    // 2 rengasta, 35 pistettä.
    renkaat: [
      [[1000.9, 439.8], [994.1, 443.7], [992.9, 445.1], [992.6, 446.7], [998.6, 444.7], [997.4, 446.7], [997.7, 448.0], [990.2, 447.0], [989.2, 445.4], [987.5, 444.8], [984.0, 446.9], [982.3, 446.2], [979.5, 446.9], [978.7, 444.0], [977.2, 443.4], [979.1, 441.2], [980.4, 442.3], [982.2, 442.2], [985.0, 440.6], [991.0, 440.5], [995.6, 439.2], [1001.0, 439.6]],
      [[971.9, 451.3], [975.3, 456.5], [974.7, 463.1], [969.8, 462.7], [967.0, 463.8], [964.0, 463.3], [955.8, 458.3], [955.8, 455.0], [958.5, 453.6], [958.6, 452.0], [960.4, 451.0], [965.3, 449.9], [971.6, 450.5]],
    ],
  },
  // Kaksi rengasta: Etelä- ja Pohjoissaari. Stewartinsaari ja Chathamin
  // saaret jäävät kokorajan alle.
  // KESKUS ON SIIRRETTY KÄSIN. Automaattinen keskipiste (816,2, 776,8)
  // osuu Cookinsalmeen saarten väliin. Käsin valittu piste on
  // Eteläsaaren sisällä 17,7 yksikön päässä lähimmästä rannasta.
  NZL: {
    nimi: 'Uusi-Seelanti',
    lippu: 'Flag of New Zealand.svg',
    keskus: [768, 842],
    leveys: 166,
    // 2 rengasta, 153 pistettä.
    renkaat: [
      [[822.5, 791.5], [833.4, 788.2], [830.4, 793.1], [833.7, 789.4], [837.2, 790.5], [833.3, 793.3], [837.6, 792.0], [833.1, 796.3], [833.7, 798.5], [832.4, 800.0], [834.5, 801.6], [818.1, 818.1], [810.4, 821.3], [811.3, 822.8], [808.6, 824.1], [810.6, 824.1], [811.3, 827.2], [814.1, 828.7], [813.4, 831.8], [807.1, 829.9], [808.3, 829.0], [807.2, 828.0], [804.7, 829.8], [802.3, 826.6], [803.3, 830.0], [791.5, 833.6], [788.4, 843.7], [786.8, 843.3], [787.7, 845.6], [781.1, 854.9], [781.3, 858.1], [776.1, 859.0], [767.2, 866.6], [760.5, 866.7], [752.6, 864.9], [751.2, 860.6], [747.3, 860.0], [744.6, 856.0], [742.4, 857.1], [736.5, 855.9], [735.4, 854.2], [738.2, 851.7], [735.8, 852.9], [736.1, 850.3], [733.4, 851.1], [734.0, 848.7], [739.8, 848.0], [737.7, 846.5], [740.1, 845.1], [737.2, 844.8], [738.1, 842.7], [739.7, 842.9], [739.3, 841.3], [742.3, 843.4], [742.1, 841.9], [743.4, 841.6], [741.4, 840.2], [741.6, 838.6], [744.3, 838.4], [743.6, 836.9], [746.7, 834.6], [747.0, 836.8], [747.3, 834.3], [750.5, 832.2], [752.8, 833.0], [752.6, 830.3], [759.6, 824.7], [768.1, 822.7], [769.2, 823.7], [769.5, 821.5], [777.8, 819.1], [783.5, 814.2], [785.3, 814.8], [784.4, 813.4], [786.4, 812.7], [788.0, 813.8], [787.2, 812.4], [789.0, 811.9], [789.6, 813.1], [793.2, 808.8], [793.6, 811.2], [794.0, 808.6], [798.0, 805.6], [802.0, 795.6], [808.2, 792.7], [814.4, 781.5], [819.5, 778.7], [823.0, 779.4], [820.5, 779.3], [819.7, 781.1], [822.5, 784.6], [822.3, 790.0]],
      [[845.0, 695.5], [847.4, 694.6], [847.4, 696.2], [854.5, 700.9], [854.5, 703.3], [856.8, 703.0], [858.2, 711.8], [855.9, 711.5], [859.1, 720.3], [856.4, 728.1], [862.8, 732.0], [863.1, 735.4], [865.0, 735.8], [866.5, 724.6], [869.4, 729.4], [870.2, 744.1], [882.8, 752.6], [893.2, 748.2], [898.9, 751.9], [892.5, 764.0], [888.4, 765.7], [885.6, 773.3], [881.7, 769.7], [875.2, 771.2], [873.1, 775.3], [874.6, 777.6], [855.9, 798.0], [846.7, 802.3], [845.8, 798.9], [842.5, 798.3], [843.0, 795.1], [840.1, 795.9], [848.5, 786.7], [850.7, 781.8], [849.1, 776.0], [838.0, 766.5], [836.8, 762.3], [848.2, 757.2], [853.7, 744.2], [855.5, 743.2], [853.8, 731.6], [855.2, 733.8], [858.0, 732.3], [856.7, 729.8], [853.0, 728.9], [851.1, 721.4], [853.3, 723.6], [854.4, 718.1], [850.5, 715.4], [849.7, 711.9], [851.4, 718.8], [850.3, 719.6], [844.7, 705.0], [848.1, 702.2], [844.4, 704.3], [842.2, 699.2], [843.7, 696.5], [839.5, 686.8], [843.8, 687.3], [842.5, 688.7], [844.7, 694.9]],
    ],
  },
  // Yksi rengas: Timorin itäpuolisko. Lauta piirtää koko saaren yhtenä
  // ääriviivana, joten Itä-Timorin ja Indonesian raja näkyy laudalla
  // vasta näiden kahden maasävyn rajana. Oecussen erillisalue Länsi-
  // Timorin sisällä jää kokorajan alle.
  TLS: {
    nimi: 'Itä-Timor',
    lippu: 'Flag of East Timor.svg',
    keskus: [198.5, 281.3],
    leveys: 35,
    // 1 rengasta, 19 pistettä.
    renkaat: [
      [[184.3, 292.7], [182.0, 288.3], [184.1, 287.6], [184.5, 285.2], [183.6, 284.7], [181.2, 285.9], [180.7, 284.2], [184.0, 279.0], [193.3, 275.1], [205.8, 272.9], [210.9, 269.9], [216.2, 270.9], [210.9, 276.2], [207.2, 277.8], [204.8, 280.2], [200.0, 282.2], [196.9, 284.7], [189.0, 288.2], [186.2, 290.7]],
    ],
  },
  // Kuusi rengasta: Uuden-Guinean länsipuolisko (Papua), Jaava, Länsi-
  // Timor, Bali, Dolak Papuan etelärannikolla ja Yapen. Näkyvyystesti
  // pudotti 21 muuta rengasta — Lombokin, Sumbawan, Floresin, Sulawesin
  // ja koko Molukit — koska lauta ei piirrä niistä yhtäkään ääriviivaa.
  // JAAVA ON MUKANA VAIKKA SE ON LÄHES KOKONAAN LAUDAN ULKOPUOLELLA:
  // saaren itäkärki (114,6° itäistä) osuu laudan Bali-ääriviivaan, joten
  // se läpäisee näkyvyystestin rehellisesti. Rengas jatkuu x-arvoon −127
  // eli laudan vasemman reunan yli; pelissä maasävy rajataan rannikkoon,
  // joten näkyviin jää vain Balin kokoinen läiskä.
  // KESKUS ON SIIRRETTY KÄSIN. Automaattinen piste (150,9, 227,4) osuu
  // Bandanmerelle 64 yksikön päähän lähimmästä renkaasta, koska
  // rajauslaatikko venyy Jaavalta Papuaan. Käsin valittu piste on
  // Papuan sisällä 23 yksikön päässä rannasta, ja "Indonesia" mahtuu
  // siihen kokonaan Papuan puolelle (leveys 557 ⇒ 22 pikselin kirjasin).
  IDN: {
    nimi: 'Indonesia',
    lippu: 'Flag of Indonesia.svg',
    keskus: [370, 178],
    leveys: 557,
    // 6 rengasta, 161 pistettä.
    renkaat: [
      [[426.1, 160.4], [428.0, 220.6], [426.4, 227.0], [428.2, 229.5], [429.3, 264.5], [413.7, 250.5], [415.3, 246.1], [412.5, 249.1], [404.0, 250.8], [401.7, 247.6], [396.3, 251.9], [398.9, 241.5], [393.4, 236.4], [400.1, 235.1], [390.8, 231.5], [394.9, 230.1], [387.8, 222.2], [386.4, 214.3], [383.6, 213.8], [385.7, 211.6], [381.7, 212.3], [381.1, 208.5], [368.1, 200.8], [346.9, 195.4], [334.2, 195.0], [325.5, 189.7], [328.7, 187.2], [313.8, 186.4], [308.6, 181.3], [310.6, 174.2], [305.9, 180.4], [304.7, 188.5], [302.5, 191.3], [297.1, 191.7], [293.3, 179.6], [279.9, 172.6], [284.0, 170.5], [292.2, 171.5], [299.2, 165.1], [307.8, 167.4], [310.8, 163.3], [308.8, 161.9], [310.7, 158.6], [284.6, 163.2], [279.5, 159.6], [277.3, 152.7], [261.8, 152.0], [265.1, 142.2], [283.0, 132.1], [290.8, 132.5], [301.4, 136.7], [309.7, 136.3], [315.2, 146.0], [313.2, 152.1], [315.4, 161.6], [320.4, 169.8], [320.4, 165.7], [322.7, 164.8], [324.4, 171.1], [326.7, 170.5], [327.8, 175.4], [331.3, 177.4], [337.6, 176.9], [351.1, 158.4], [362.1, 155.0], [362.7, 150.6], [373.5, 144.1], [406.7, 156.8], [420.3, 157.9], [422.5, 160.5]],
      [[-98.6, 297.7], [-93.2, 299.6], [-83.4, 297.7], [-73.6, 303.9], [-48.0, 299.3], [-45.1, 290.7], [-41.7, 289.2], [-37.5, 292.3], [-32.1, 290.3], [-22.8, 291.9], [-15.7, 290.7], [-10.4, 295.6], [-9.4, 299.4], [-5.7, 300.2], [10.4, 296.0], [15.6, 297.0], [18.0, 306.7], [22.2, 311.6], [0.3, 309.0], [-8.0, 313.0], [-26.1, 315.8], [-62.2, 315.6], [-78.0, 321.2], [-93.4, 320.5], [-105.1, 322.6], [-107.3, 321.9], [-106.9, 317.5], [-127.4, 319.1], [-126.0, 316.8], [-123.8, 318.1], [-118.8, 302.1], [-106.5, 301.5], [-104.0, 297.6], [-99.3, 297.4]],
      [[180.7, 284.2], [181.2, 285.9], [183.6, 284.7], [184.5, 285.2], [184.1, 287.6], [182.0, 288.3], [184.3, 292.7], [177.1, 302.9], [176.0, 304.0], [172.3, 305.2], [167.8, 308.4], [164.5, 308.4], [163.8, 307.0], [165.0, 304.7], [162.8, 303.3], [163.3, 299.0], [167.3, 293.1], [168.1, 292.5], [169.5, 293.6], [172.6, 292.9], [173.8, 291.2], [174.0, 289.2], [180.3, 284.7]],
      [[33.2, 299.2], [35.0, 299.7], [38.0, 302.2], [33.1, 306.7], [32.1, 310.2], [30.2, 310.8], [30.7, 309.7], [29.7, 307.7], [25.0, 305.5], [20.5, 305.2], [18.7, 303.5], [18.3, 302.0], [25.6, 301.4], [28.4, 298.8], [31.5, 298.9]],
      [[390.8, 252.7], [387.2, 255.0], [377.1, 255.2], [379.5, 247.9], [383.1, 241.9], [386.4, 239.7], [390.2, 238.6], [393.8, 238.6], [395.9, 240.4], [397.5, 243.3], [394.5, 249.1], [391.9, 251.5]],
      [[335.4, 148.3], [347.4, 148.5], [358.9, 150.2], [354.5, 151.6], [348.1, 152.4], [335.7, 149.5], [335.4, 148.7]],
    ],
  },
};

/*
 * Laudan kohde -> ISO-3166-1 alpha-3 -maatunnus. Tästä syntyy sekä lehden
 * maaosasto että "Maa numeroina" -sivu, joten puuttuva rivi ei näy
 * virheenä vaan hiljaisena aukkona: kohteen lehti jää vaille maan sivuja.
 *
 * Taulu asui 23.8.2026 asti oceania.js:ssä nimellä OC_CITY_COUNTRY.
 * Se siirrettiin tänne SELLAISENAAN, rivi riviltä samana, kun countryShapes
 * kytkettiin — Lähi-idässä, Euroopassa ja Pohjois-Amerikassa molemmat
 * taulut ovat samassa -countries.js-tiedostossa, ja lautatiedosto tuo ne
 * yhtenä parina. Yhtään riviä ei muutettu siirrossa.
 *
 * Kaikilla 33 kohteella on tunnus. Uluru ja Nullarbor ovat luonnonkohteita
 * ja Sepik joki, mutta ne ovat yksiselitteisesti yhdessä maassa, joten
 * niillä ei ole samaa kaanonpulmaa kuin Lähi-idän Jerusalemilla.
 */
export const OCEANIA_CITY_COUNTRY = {
  sydney: 'AUS',
  perth: 'AUS',
  melbourne: 'AUS',
  brisbane: 'AUS',
  cairns: 'AUS',
  darwin: 'AUS',
  adelaide: 'AUS',
  alicesprings: 'AUS',
  uluru: 'AUS',
  broome: 'AUS',
  kalgoorlie: 'AUS',
  townsville: 'AUS',
  hobart: 'AUS',
  nullarbor: 'AUS',
  birdsville: 'AUS',
  exmouth: 'AUS',
  mountisa: 'AUS',
  cooberpedy: 'AUS',
  geraldton: 'AUS',
  portmoresby: 'PNG',
  sepik: 'PNG',
  honiara: 'SLB',
  portvila: 'VUT',
  noumea: 'NCL',
  norfolk: 'NFK',
  suva: 'FJI',
  auckland: 'NZL',
  wellington: 'NZL',
  christchurch: 'NZL',
  milfordsound: 'NZL',
  dunedin: 'NZL',
  dili: 'TLS',
  bali: 'IDN',
};
