// Eurooppa-lauta: kaupungit, reitit, kartan piirtotiedot ja teema.
//
// Koordinaatisto on 1000 x 1000 yksikköä ja vastaa suoraan Euroopan karttaa:
//   x = (pituusaste + 11) * 19.2    (lännestä -11° itään 41°)
//   y = (72 - leveysaste) * 26.3    (pohjoisesta 72° etelään 34°)
//
// Rannikot ovat oikeaa aineistoa (Natural Earth 10m), eivät käsin
// piirrettyjä: manner on yksi ääriviiva, johon Itämeri, Mustameri ja
// Välimeri työntyvät lahtina ja johon Pohjois-Afrikka kuuluu. Omina
// saarinaan piirretään Britannia, Irlanti, Sardinia, Korsika, Sisilia,
// Kreeta, Kypros, Mallorca, Gotlanti, Saarenmaa, Sjælland ja Euboia.
// Kaupungit ovat todellisilla paikoillaan; Wieniä, Budapestia ja Alppeja
// on siirretty muutama yksikkö, jotta nimet mahtuvat.

import { EUROPE_QUESTIONS, EUROPE_FACTS } from './europe-questions.js';
import { EUROPE_COUNTRY_SHAPES, EUROPE_CITY_COUNTRY } from './europe-countries.js';
import { EUROPE_PUZZLES } from './europe-puzzles.js';
import { themedTokenTypes } from '../tokens.js';

const EU_MAP = {
  width: 1000,
  height: 1000,
  /*
   * Rannikot ovat Natural Earthin 10m-maapolygoneja (public domain)
   * projisoituna laudan koordinaatistoon samalla kaavalla kuin
   * kaupunkien x/y. Ne on tuotettu tools/europe-rannikko.mjs:llä — älä
   * muokkaa käsin, vaan aja työkalu uudestaan.
   *
   * Manner on yksi ääriviiva, johon Itämeri, Mustameri ja Välimeri
   * työntyvät lahtina ja johon Pohjois-Afrikka kuuluu (Afrikka ja
   * Euraasia ovat yhtä maamassaa Siinain kautta). Siksi erillistä
   * maghrebPoints-kaistaletta ei enää ole. Ääriviiva on leikattu
   * laudan ympärille jäävään laatikkoon, jonka reunat ovat selvästi
   * näkyvän alueen ulkopuolella.
   */
  mainlandPoints: [
    [-113.7, 1316.8], [-105, 1305.1], [-93.3, 1265.4], [-75, 1244.4], [-66.7, 1205],
    [-49.2, 1190.1], [-37.8, 1159.4], [-9.3, 1148.6], [14.4, 1123], [25.8, 1101.3],
    [21.3, 1087.6], [22.1, 1067.7], [33.1, 1046.8], [33, 1037.6], [47.4, 1018.6],
    [80.2, 998.4], [90.4, 976.2], [97.8, 952.1], [109, 954.3], [119.6, 966.8],
    [147.5, 967.8], [154.2, 961.4], [160, 970.3], [173.8, 971.1], [191.4, 955.1],
    [209.6, 952.2], [217.8, 941.4], [231.3, 934], [272.2, 927.3], [285.6, 922.7],
    [302.8, 923.2], [314.4, 929.7], [335.3, 918], [349.9, 918.1], [363, 924.5],
    [380.6, 921], [398.3, 911.4], [410, 927.6], [423, 918.2], [425, 923.9],
    [412.6, 940], [425.5, 967.3], [414.7, 985.1], [405.6, 990.8], [409.5, 1007.2],
    [422.1, 1008.8], [429.2, 1018.9], [447.4, 1029.8], [467.6, 1028.2], [503, 1041.7],
    [508.6, 1060.8], [519.3, 1071.1], [553.9, 1080.3], [575.4, 1097.3], [587.4, 1093.8],
    [598, 1072.6], [593.6, 1058.3], [606, 1037.3], [628.2, 1027], [655.1, 1035.4],
    [654.3, 1043.2], [673.7, 1051.8], [690.8, 1052.8], [695.3, 1064.5], [709.8, 1062.1],
    [735.9, 1068.3], [768.5, 1082.8], [794.2, 1064.9], [808.3, 1062.3], [821.1, 1070.8],
    [847.4, 1077.1], [867.8, 1070.1], [877.7, 1053.3], [895.7, 991.9], [902.2, 984.9],
    [902, 946.8], [898.3, 938.4], [906, 930.9], [902.8, 922.4], [889.8, 932.6],
    [877.3, 925.4], [863.2, 941.2], [841, 946.1], [826, 932.4], [800.4, 923.4],
    [794.9, 941.4], [780.9, 943.6], [757.5, 923.6], [734.7, 921.5], [734.2, 894.5],
    [714.9, 887], [718.4, 876.3], [730.8, 870.9], [722.1, 860.7], [728.4, 852.8],
    [711.8, 855.4], [714, 841.6], [724.5, 831], [769, 831.9], [771.3, 809.2],
    [810.8, 812.9], [830.7, 796.4], [851, 788.5], [877.3, 790.4], [883.7, 786.6],
    [888.9, 796.5], [903.3, 796.9], [910, 808.6], [947.2, 817.5], [968.3, 812.3],
    [983, 817], [1005.9, 805.3], [1013, 789.2], [1006.5, 769.5], [985.6, 759],
    [955.4, 729.2], [913.5, 705.2], [918.4, 698.4], [935.6, 702.2], [939.7, 683.3],
    [951.9, 681.5], [940.5, 667.6], [961.4, 656.6], [965.1, 650.6], [942.9, 656.8],
    [932.8, 655.1], [900.5, 666.6], [879.6, 679.6], [893.1, 702.3], [899.2, 697.7],
    [914.7, 700.9], [910.9, 708.3], [892.9, 707.1], [862.8, 726.4], [855.8, 720.1],
    [855.1, 707], [834.8, 699.3], [858.1, 687.5], [856.3, 679.7], [835.3, 681.8],
    [821.5, 676.1], [831.7, 671.6], [823.5, 666.9], [802.6, 669.1], [796.7, 681.7],
    [779.6, 697.5], [779.9, 713.7], [768, 718.3], [760.9, 728.4], [759.9, 750.1],
    [747, 757.4], [744.6, 780.1], [752.2, 800.6], [770.1, 809.1], [767.9, 815.1],
    [739.7, 815.6], [713.8, 840.3], [725.6, 824.2], [712.2, 825.7], [711.4, 819.7],
    [693.9, 815], [666.4, 822.2], [679.6, 837.6], [666.8, 832.2], [659.7, 837.5],
    [644.7, 829.3], [644.6, 840.2], [659.4, 863.2], [643.7, 871.6], [658.7, 877],
    [673.4, 889], [671, 902.7], [663.4, 894.7], [653, 896.3], [662.9, 908.4],
    [656, 912.6], [647.5, 905.6], [656.6, 935.4], [646.8, 925.5], [643, 936.5],
    [636.5, 919.9], [631.5, 927.6], [627.4, 910.1], [616.4, 897.4], [630.7, 885.2],
    [650.3, 895.8], [657.1, 890], [616.2, 880.2], [604.5, 860.5], [585.1, 836],
    [581.8, 824.4], [587.4, 793.8], [551.8, 766.9], [535.5, 752.1], [517.6, 749.4],
    [502, 731.3], [509.4, 729.3], [497.3, 718.2], [496.2, 707.3], [486.3, 700.8],
    [478.1, 716.1], [470.4, 697], [471.8, 689.3], [444.6, 701.9], [451.9, 710.9],
    [446.3, 717.7], [449.6, 731.3], [472.6, 748], [481.4, 773.3], [502.4, 790.9],
    [521.1, 791.1], [517.1, 802.7], [556.9, 824.5], [566.7, 837.9], [563.3, 846.9],
    [554.2, 834.1], [535.9, 829.9], [527.8, 847.5], [540.6, 857.2], [539.6, 870.6],
    [529.6, 873.2], [529.2, 883.3], [519.6, 896], [511.4, 894], [515.4, 876.8],
    [522.7, 871.7], [511.2, 839.6], [497.5, 835.2], [495, 824], [480.9, 820.8],
    [474.7, 808.7], [461.7, 809.3], [432.8, 779.8], [412.8, 764.3], [406.7, 737.6],
    [379.4, 725], [366.1, 739.1], [348.5, 745.5], [339.5, 757.4], [322.9, 761.3],
    [287.8, 748.2], [269.5, 764.2], [272.5, 791.9], [250.8, 808.1], [230.7, 813.9],
    [205, 854.3], [215.6, 874.9], [201.4, 885.3], [194.8, 901], [179.1, 910.9],
    [170.4, 927.4], [126.3, 927.9], [111.6, 936], [103.5, 946.6], [95.3, 941.8],
    [88.6, 925.5], [78.9, 916.1], [61.1, 920.5], [38.4, 919.9], [43.2, 901.3],
    [42.3, 884.8], [29, 875.6], [30.5, 858], [36.7, 852.7], [45.2, 811.3],
    [34.2, 758.6], [51.3, 752], [63.6, 741.8], [71.9, 748.1], [94.7, 747.7],
    [125.2, 752.6], [143, 749.1], [153.4, 754.3], [179.3, 752.2], [182.8, 747.4],
    [190.1, 695.5], [189.9, 675.8], [176.7, 670.8], [173, 656.6], [154.8, 642.8],
    [120.4, 630.1], [128.9, 628.2], [120.2, 616.7], [151.6, 608.1], [159.7, 617.8],
    [185.2, 614.3], [174, 585.9], [186.8, 586.5], [189.6, 595.8], [207, 597.5],
    [220, 592.6], [214.8, 586.4], [234.6, 579.2], [240.4, 573], [241.5, 555.8],
    [279.2, 541.3], [291.4, 534.3], [285.4, 530.8], [297.8, 517.2], [302.1, 500.8],
    [318.6, 491.7], [363.9, 480.7], [368.7, 488.9], [384.4, 470.8], [378, 454.1],
    [376.7, 435.6], [366.6, 432.7], [372.4, 423.2], [366.8, 417.7], [368.9, 402.1],
    [375.7, 405.6], [387.8, 396.1], [376.1, 391.7], [391.9, 390.1], [402.6, 378.9],
    [411.5, 379.5], [409.5, 404.9], [421.7, 409.2], [411.7, 412.9], [406.7, 425.2],
    [393.6, 434.2], [392.3, 446.1], [402.6, 453.3], [405.9, 464.9], [425, 463.3],
    [417.9, 472.8], [431, 475.9], [451.5, 460.7], [461.5, 462], [476.5, 477.3],
    [491.3, 484], [487.8, 475.5], [521.8, 466.5], [528, 459.4], [559.7, 451.4],
    [570.6, 463.4], [583.2, 463.5], [594.8, 448], [618.8, 448.7], [615.4, 399],
    [627.8, 379.9], [645.1, 374.6], [657.8, 391.9], [671.1, 394.2], [679.7, 387.7],
    [677.5, 372.3], [682.6, 359.4], [667, 359.2], [661.8, 336.3], [687.4, 326.9],
    [710.2, 325.2], [746.4, 331.2], [750.5, 320.9], [764.8, 321.2], [771.1, 315.5],
    [791.4, 318], [784.3, 311.2], [769, 310.8], [762.1, 296.2], [739.3, 303.6],
    [730.5, 301.2], [709.1, 309.2], [691.6, 310], [661, 316.7], [643.7, 310.2],
    [630.5, 299.1], [626.2, 302.7], [620.1, 287.7], [628.2, 275.4], [618.9, 263.4],
    [616.6, 242.5], [623.9, 231.2], [639.9, 229.2], [644.9, 218.2], [660.8, 212.4],
    [682.3, 189.2], [699.7, 185], [698, 171.4], [682.6, 164], [641.4, 161.4],
    [641.4, 169.8], [623.8, 173.8], [625.7, 182.3], [615.1, 188.5], [625.9, 198.8],
    [608.2, 215.9], [581.6, 224.4], [577, 232], [555.9, 241.7], [544.2, 264.7],
    [541.2, 297.4], [556.3, 300.1], [577.4, 322.2], [557, 331.2], [565.1, 337.9],
    [554.7, 345.6], [538.1, 348.4], [530.5, 358.9], [533.2, 371.1], [527.5, 400.4],
    [515.6, 418.5], [493.9, 416.4], [483.8, 428], [483.5, 436.8], [457.9, 437.1],
    [461.9, 428.8], [450.3, 412.8], [459.5, 406.4], [448.4, 396.5], [435, 372.4],
    [439.4, 359.4], [426.6, 359.1], [424.6, 341.7], [415, 325.9], [409.1, 340.3],
    [389.7, 345], [368.7, 365], [345.7, 368.4], [342.6, 361.1], [319.6, 353.8],
    [317.8, 340.9], [330.8, 333.2], [322.7, 327.7], [316.9, 334.6], [311.1, 327.5],
    [325.7, 321.9], [309.9, 306.4], [306.6, 272.6], [315.9, 258], [341.6, 250.4],
    [331.5, 249.1], [367.6, 244.8], [349.7, 241.6], [397.4, 219.8], [405, 225.2],
    [420.6, 224.7], [420.7, 217.5], [404.7, 223.4], [394.5, 216.3], [421.6, 197.6],
    [435, 197.8], [427.5, 187.5], [451.3, 180.3], [448.4, 168.2], [461.6, 155.6],
    [461.5, 149.4], [479.9, 137], [471.2, 133.6], [494.3, 128.4], [486.3, 125.1],
    [505, 112.6], [494.8, 110], [528.8, 106.2], [522.6, 96], [542.4, 94.5],
    [529.9, 88.6], [545.8, 81.5], [562.6, 66.1], [598.4, 54.1], [618.4, 57.1],
    [618.4, 47.1], [633.3, 44.1], [652.2, 47.1], [683, 28], [709, 29.9],
    [693.1, 38.8], [699.7, 43.6], [722.2, 27.6], [721, 43.3], [742.1, 23],
    [759.3, 26.8], [745.9, 39.9], [753.5, 41.7], [764.1, 29.6], [773.9, 35.4],
    [789.2, 33.9], [807.6, 43], [790.3, 50.7], [761.6, 50], [822, 60.8],
    [826.6, 53.6], [847.4, 59.7], [825.9, 64.1], [854.9, 67.6], [882.3, 73.8],
    [900, 73.8], [934.7, 86.4], [971.7, 103.5], [974.8, 100.7], [998.7, 113.1],
    [1005.9, 128.2], [1001.2, 137.1], [980.8, 150.2], [951.4, 156.4], [893.9, 147.6],
    [854.7, 138.8], [830.6, 128.2], [833.7, 134.5], [851, 140.8], [874.6, 155.3],
    [882.6, 165], [872.9, 174.5], [882.1, 187.8], [878.3, 195.8], [894.4, 199.6],
    [908, 210.1], [930, 215.9], [940.8, 211.6], [936, 198.8], [923.9, 200],
    [910.8, 186.3], [925.8, 180.4], [941.7, 187.9], [970.9, 196.1], [989.1, 196.2],
    [989.1, 190], [974.2, 169.9], [992.8, 158.5], [1010.8, 153.3], [1020.6, 144],
    [1042.6, 146.6], [1056.9, 155.7], [1066, 133.6], [1052.5, 126.8], [1060.4, 97.4],
    [1042.1, 87.9], [1093.3, 93.5], [1107.8, 110], [1081.9, 112.3], [1074.3, 123.1],
    [1102.2, 138.2], [1127.8, 130.7], [1129.8, 115.7], [1147.7, 112.4], [1186.2, 95.2],
    [1213, 89.9], [1237.2, 81.1], [1248.5, 83], [1246.9, 94.5], [1235.1, 98.8],
    [1251.9, 99.7], [1286.3, 87.8], [1300, 88.8], [1300, 1179.5], [1288.8, 1179.3],
    [1263.2, 1196.8], [1242.5, 1191.2], [1221.1, 1174.2], [1218.4, 1166.9], [1198.1, 1159],
    [1183.8, 1119.1], [1172.6, 1099.5], [1162.2, 1104], [1150.5, 1094.6], [1149.6, 1104],
    [1132.2, 1104.5], [1135.8, 1130.4], [1148.8, 1167.4], [1156.6, 1169.2], [1175.4, 1201.3],
    [1176.1, 1219.5], [1186, 1243.3], [1185.6, 1223.1], [1195.2, 1205.6], [1201.4, 1212.5],
    [1202.1, 1235.5], [1195.8, 1254.4], [1205.9, 1262.4], [1221.1, 1256.9], [1245.2, 1260.8],
    [1255.3, 1255.7], [1260.5, 1242.5], [1285.5, 1215.8], [1293.4, 1199.6], [1291.5, 1218.4],
    [1294.2, 1238.8], [1300, 1251.7], [1300, 1403.3], [1294.6, 1419.5], [1010.9, 1419.8],
    [1001.8, 1392.1], [989.5, 1368.6], [974.6, 1358.4], [963.3, 1338.4], [958.7, 1314.8],
    [961.3, 1305.4], [949.5, 1268.1], [929.8, 1252.7], [926.3, 1231.5], [915.9, 1215.6],
    [906.8, 1193.3], [886.3, 1157], [875, 1154.7], [883.1, 1116.9], [878.1, 1122.7],
    [868.8, 1164.3], [849.4, 1142.6], [848.1, 1130.8], [839.3, 1118.9], [836.7, 1104.3],
    [832.1, 1115.3], [842.3, 1142], [855.9, 1161.1], [854.3, 1166.5], [863.9, 1186.2],
    [862.9, 1192.6], [893.1, 1263], [896.5, 1290.5], [919.6, 1313.3], [919.4, 1324.2],
    [927.6, 1339.8], [926.3, 1379], [929.9, 1397.5], [952.4, 1420], [-96.5, 1420],
    [-100, 1394], [-106.3, 1383.9], [-100.5, 1373], [-103.8, 1349.8], [-113.6, 1337.1],
  ],
  britainPoints: [
    [99.8, 400], [98.4, 397.5], [103.7, 387.2], [99.7, 385.2], [99.8, 379.2],
    [102.9, 381.1], [99.6, 372.6], [108.2, 369.7], [107.7, 361.3], [112.1, 359.6],
    [115.4, 351.7], [121.7, 353.6], [138, 353.1], [145.7, 351], [153.2, 351.4],
    [149.4, 360.2], [134.1, 369.5], [136, 373.3], [128.7, 376.6], [133.4, 377.8],
    [129.6, 381.4], [144.2, 375.7], [152.1, 376.9], [172.8, 376], [177.4, 382],
    [171.9, 388.5], [169.2, 396.7], [162.6, 405.5], [154.6, 409.4], [161.7, 413.3],
    [154.3, 415.4], [150.2, 419.3], [142.1, 420.3], [151.9, 422.2], [157.4, 419.1],
    [170.2, 423], [176.3, 430.5], [179.9, 431.7], [181.1, 439.7], [188.9, 457.3],
    [200.4, 460.8], [204.2, 467], [209.8, 470.5], [207, 472.8], [213.8, 482.8],
    [207.6, 483.4], [214.1, 487.2], [217.6, 497.2], [211.4, 502.7], [218.5, 505.2],
    [222.1, 500.5], [235.7, 501.6], [242.8, 505.6], [245.2, 513.2], [241.6, 523.9],
    [231.3, 531.9], [229, 536.8], [220, 539], [230, 543.1], [238.5, 542],
    [237.3, 548.9], [232.4, 550.3], [216.4, 558.9], [207.9, 556.8], [195.6, 559.3],
    [194.6, 557.3], [183.4, 554.6], [185.9, 557.6], [175.5, 559.5], [173.1, 562.9],
    [156.2, 559.3], [144.1, 564.2], [141.2, 572.7], [129.6, 569.2], [119.7, 570.1],
    [114.2, 573.5], [111.5, 579.7], [106.1, 575.2], [123.8, 557.3], [124.3, 551.9],
    [127.9, 552.4], [131.5, 546.7], [153.6, 546.5], [153.2, 543.8], [159.5, 536.6],
    [154.1, 537.5], [150.1, 541.8], [143.2, 541.8], [137.2, 535.9], [126.2, 532.6],
    [116.2, 536.6], [110.8, 533.1], [109.5, 528.3], [118.4, 525.5], [130.6, 518.7],
    [133.2, 512.3], [132.1, 501.6], [120, 505.4], [131.5, 493.7], [150, 489.8],
    [155.5, 480.4], [152.8, 475.4], [157.5, 470.1], [152.7, 467.6], [150.8, 471.7],
    [141.4, 459.9], [146.6, 449.7], [132, 453.1], [127.8, 450.8], [127.3, 455.5],
    [117.9, 450.6], [117.9, 456.8], [112.7, 451.1], [118.4, 438.4], [122.4, 434.8],
    [116.7, 428.5], [117.4, 422.9], [122.3, 422.2], [117.8, 419], [115.5, 424.2],
    [111.7, 421.6], [105.8, 430.1], [103.8, 438.9], [100.4, 439.2], [101.8, 423],
    [105.4, 415.8], [103.7, 414], [110.3, 401.8], [102.4, 407.7], [91.7, 402.5],
  ],
  irelandPoints: [
    [10.3, 521.3], [15.9, 518.5], [21.7, 519.9], [22.4, 516.1], [26.5, 510.8],
    [22.6, 510.3], [31.6, 501.4], [29.2, 501.3], [33.6, 495.7], [38.7, 495.3],
    [39.5, 492.6], [26.6, 493.5], [25.9, 489.4], [15.8, 488.8], [16.5, 485.5],
    [22, 483.4], [21.1, 479.6], [27.5, 478.8], [27.5, 476], [20.9, 477.1],
    [22.3, 474.4], [16.7, 470.1], [17.8, 466.3], [22.2, 464.8], [45.7, 466.7],
    [45, 463.8], [52.4, 459.6], [52, 457.5], [44.7, 457.1], [42.3, 455],
    [46.9, 451.9], [51, 451.5], [48.7, 448.7], [52.3, 442.9], [59.4, 442.1],
    [64.1, 439.8], [67.8, 445.9], [66.7, 439.5], [72.8, 438], [77.9, 441.4],
    [71.9, 445.8], [76.5, 445.2], [77.5, 442], [88.7, 440.6], [94.1, 441.5],
    [96.2, 447.4], [101.7, 451.7], [100.8, 455.5], [104.2, 455.5], [106.9, 461.3],
    [104.6, 465.5], [98.6, 467.3], [93.9, 473.4], [90.1, 473.1], [91.7, 482.7],
    [94.6, 485.5], [93.7, 489.4], [96.1, 500.6], [88.7, 516.6], [88.9, 521.3],
    [80.3, 520.2], [76.5, 522.4], [68.4, 522.7], [65.5, 526.2], [60.9, 527.2],
    [57.5, 530.5], [52.9, 531.2], [44.2, 537.1], [41.2, 536.6], [31.1, 539.8],
    [30.7, 537.9], [22.7, 540.6], [29.6, 534.3], [17.5, 534.6], [24.2, 530.3],
    [17.1, 532.7], [11.9, 529.2], [14.1, 526.3], [21, 522.6], [10.4, 523.3],
  ],
  sardiniaPoints: [
    [367.4, 822.4], [369, 817.9], [370.8, 819.2], [374.8, 819.9], [377.1, 818],
    [379.5, 817.6], [384.5, 811.9], [386.7, 811.3], [387.3, 808.9], [389, 808.7],
    [392.5, 811.8], [394.9, 812.5], [394, 814.5], [395.3, 815.4], [395, 817.8],
    [397.9, 819.4], [396.6, 820.6], [398.4, 824.1], [399.9, 827.9], [398.4, 831.7],
    [396, 834.7], [396.6, 837.8], [398.1, 839.4], [397.3, 841.8], [396.5, 850.7],
    [396.4, 855.2], [395.5, 858.9], [396.2, 860.1], [394.9, 861.6], [394, 864.6],
    [392.5, 864.6], [390.5, 862.6], [388.2, 861.9], [387.2, 863], [385.5, 862.3],
    [384.3, 864.6], [384.3, 868.2], [381.2, 871.1], [379, 869.7], [376.3, 870.6],
    [375.5, 866.4], [374.5, 866.2], [371.9, 861.8], [373, 860.4], [372, 857.9],
    [372.2, 855.5], [373.7, 852.7], [373.4, 847.8], [375.3, 847.3], [375.3, 844.8],
    [372.4, 844.1], [372.5, 840.3], [374.2, 839.2], [373.7, 833.3], [372.2, 832.3],
    [372.4, 830.5], [370.4, 825.9], [369, 826.6], [367.5, 825.2], [368.5, 823.3],
  ],
  corsicaPoints: [
    [375.4, 782.6], [378, 781.8], [375.4, 780.1], [375.4, 778.8], [377.5, 777.7],
    [377.6, 775.6], [379, 773.9], [380.3, 773.1], [384.4, 771.9], [386.3, 769.7],
    [389, 770.2], [389.6, 771.3], [390.6, 769.3], [389.9, 766.9], [390.9, 764.6],
    [390.7, 762.6], [392.1, 762.2], [392.7, 763.4], [393.3, 767.9], [392.6, 770.4],
    [393, 773.6], [394.2, 774.7], [394.2, 778.7], [394.7, 780.7], [394.7, 785.8],
    [391.7, 790.2], [391.7, 796.9], [390.7, 799], [389.3, 799.6], [390.7, 800],
    [389.1, 801.3], [389.2, 803], [388.3, 805.5], [385.9, 804.7], [386.3, 803.9],
    [380.9, 801.3], [379.7, 799.7], [380.2, 798.5], [381.6, 798.2], [382.5, 797],
    [378.2, 796.1], [377.4, 795.6], [380.3, 791.4], [379.5, 790.7], [376.6, 791.6],
    [376.1, 789.8], [379.1, 787.5], [378.2, 786.1], [377.5, 786.2], [375.7, 784.9],
  ],
  sicilyPoints: [
    [449.8, 899.2], [451.3, 893.9], [456.2, 889.4], [457.5, 892.4], [458.9, 893.5],
    [462.2, 891.7], [461.9, 890.5], [463, 889.1], [464.8, 889.6], [466.8, 888.4],
    [468.3, 891.5], [470.7, 891.3], [471.5, 892.9], [474.3, 894.7], [476, 894.9],
    [480.4, 892.9], [481.6, 893.6], [486.4, 893.7], [492.2, 892.1], [494.1, 890.1],
    [498, 889.3], [500.9, 890.8], [504.1, 888.7], [506.9, 888.1], [509, 886.4],
    [511.7, 887], [508.8, 892], [506.7, 894.8], [503.3, 900.5], [502.3, 905.6],
    [500.9, 908.4], [501.3, 912], [504, 913.7], [502.9, 914.2], [502.9, 915.9],
    [505, 917.8], [505.6, 920.2], [504.3, 920.5], [502.2, 922.5], [501, 925.8],
    [501.8, 929], [501, 929.6], [496.9, 927.6], [495, 928.4], [492.7, 927],
    [489.1, 925.6], [487.6, 921.9], [485.4, 919.3], [482.4, 917.5], [478, 917.8],
    [474.5, 916], [472.3, 913.7], [469.5, 912.6], [466.1, 910.1], [464.1, 907.7],
    [461.1, 907.4], [459.7, 905.5], [455, 905.7], [453, 903.7], [451.3, 903],
  ],
  cretePoints: [
    [663.1, 963.3], [664.4, 957], [665.1, 959.8], [666.8, 959.2], [666.5, 955.7],
    [667.8, 955.4], [668.5, 959], [672.5, 959.4], [674.2, 957.3], [675.9, 958.9],
    [673.7, 960.2], [675.6, 961.2], [676.8, 960.5], [677.1, 963.4], [678.5, 963.9],
    [682.9, 963], [685.8, 961.9], [689.2, 961.9], [692.1, 962.4], [692.3, 963.8],
    [695.5, 964.3], [698.4, 964.1], [700.5, 965.3], [703.9, 963.9], [705.9, 964.3],
    [705, 967.5], [705.2, 969.6], [706.9, 970.1], [708.4, 968.2], [711.2, 967.1],
    [713.8, 967.7], [715.5, 966.3], [716.2, 968.2], [715, 972.1], [713, 973.1],
    [710, 972.1], [706.7, 972.9], [702.7, 972.7], [700.9, 973.5], [697.9, 973.3],
    [695.2, 974.4], [686.2, 974.9], [686.6, 972], [685.8, 970.6], [682.8, 970.3],
    [679.7, 968.1], [677.6, 968.3], [671.8, 967], [664.5, 966.9], [663.4, 966.1],
  ],
  cyprusPoints: [
    [830.8, 971.2], [832.7, 972], [834.8, 970.9], [836.3, 968.4], [839.9, 968.4],
    [841.5, 969.2], [843.2, 967.8], [843.6, 964.2], [843.3, 962.6], [846.1, 963.7],
    [853, 964.4], [857.5, 963.6], [859.8, 962.1], [860.8, 962.3], [866.5, 959.7],
    [867.5, 958.5], [875.4, 954.9], [874.4, 956.3], [870.8, 959.4], [866.6, 962.2],
    [864.8, 964.8], [862.5, 965.8], [862.1, 968.8], [865, 972.2], [865.9, 974],
    [864.2, 973.4], [861.4, 974.7], [859.4, 973.6], [857.2, 974.9], [856.4, 977.8],
    [849.8, 981], [846.8, 981], [845.3, 982.3], [845.4, 984.4], [843.7, 984.4],
    [843.1, 982.1], [841.2, 981.8], [839.2, 982.4], [835.1, 980.8], [833.5, 979.6],
  ],
  mallorcaPoints: [
    [256.5, 851.8], [258.6, 850.6], [259.5, 849.5], [260.9, 848.9], [263.2, 846.4],
    [266.4, 844.7], [267.5, 843.8], [270.3, 843.3], [272.2, 842.4], [272.9, 842.8],
    [270.7, 843.9], [271.3, 844.9], [272.8, 844.4], [271.2, 846], [271.4, 847.2],
    [273.1, 848.2], [274.4, 848.2], [276.2, 847.4], [277.9, 848.2], [277.5, 850.6],
    [276.6, 852.3], [275, 854.1], [274.2, 856.9], [273, 858.4], [270.1, 860.8],
    [268, 858.3], [265.4, 858.3], [264.2, 857.4], [263.9, 854.1], [262.2, 853],
    [260.5, 853.9], [259.1, 855.5], [258.3, 853.8], [257.2, 854.1], [256.4, 853.2],
  ],
  gotlandPoints: [
    [558.7, 387.7], [560, 385.8], [559, 381.1], [559.9, 379.3], [563, 376.8],
    [565.7, 373.4], [568.5, 372.5], [569.4, 370.8], [571.1, 370.4], [572.2, 372.8],
    [573.1, 370.4], [575.5, 370.5], [577.6, 372.8], [575.7, 373.3], [574.9, 375.3],
    [572.6, 375.1], [571.4, 378.3], [572.4, 378.5], [571.4, 381.1], [572, 382.7],
    [574.6, 384.2], [571.6, 384.9], [569.6, 386.7], [569.9, 388.5], [564.2, 391.1],
    [563.7, 394.8], [562.8, 395.9], [559.5, 396.6], [560.7, 394], [559.9, 388.5],
  ],
  saaremaaPoints: [
    [630.4, 354.8], [633.5, 354.7], [635.5, 357], [635.6, 355.4], [637.7, 353.8],
    [638.8, 355], [639.1, 353.2], [642.5, 352.6], [644.8, 351.5], [646, 352.8],
    [650.9, 351.9], [657.7, 355], [659, 356.6], [655.8, 355.6], [654.5, 357.8],
    [652.4, 358.2], [650.9, 360], [647.2, 361.4], [646.4, 362.4], [643.9, 361.5],
    [638.8, 363.6], [637.5, 368.4], [634.5, 370.4], [632.9, 368.6], [637.5, 364.3],
    [635, 363.6], [633.9, 362], [631.6, 361.6], [631.2, 359.2], [633.8, 358.9],
  ],
  sjaellandPoints: [
    [427.2, 427.9], [431.6, 425], [432.2, 423.2], [427.6, 420.9], [434.7, 422.3],
    [438, 429.2], [439.1, 425.9], [441.6, 423.6], [442.8, 429.9], [443.4, 427.9],
    [441.5, 421.8], [439, 421.5], [446.3, 417.4], [450.9, 418.2], [453.5, 419.6],
    [451.4, 422.9], [453.2, 426.1], [453.2, 428.5], [451, 431.1], [446.4, 432.7],
    [445.9, 435.7], [450.1, 437.9], [449.1, 440.4], [445.1, 441.1], [444.5, 447.3],
    [439.9, 446.8], [440.8, 448.5], [444.9, 451.4], [440.8, 455.1], [439.9, 454.4],
    [436.5, 448.8], [439.4, 447.7], [434.9, 442.3], [430.5, 441.3], [427.1, 441.5],
    [427, 439.8], [424.1, 437.5], [426.3, 436.8], [424.1, 429.7], [421.6, 428],
  ],
  euboeaPoints: [
    [649.9, 871.5], [653.6, 869.8], [655.2, 867.7], [658.5, 866.8], [661, 869.1],
    [662, 872.2], [664.2, 873.9], [666.3, 874.1], [668.4, 876], [671.4, 876.6],
    [673.4, 876.3], [675, 877], [674.4, 878.5], [676.4, 880.5], [675.6, 881.7],
    [675.6, 883.7], [676.8, 886.4], [676.8, 888.2], [681.2, 890.6], [683.3, 890],
    [683.4, 892.6], [682.6, 894.8], [681.2, 895.2], [680.3, 893.6], [679.4, 895],
    [677.9, 892.3], [676, 891.6], [675.6, 888.5], [673.9, 887], [672.8, 883.6],
    [665.5, 883.6], [664.6, 882.1], [664.6, 879.5], [662.5, 878.5], [662.4, 877.6],
    [659, 874.1], [655.6, 871.8], [654.1, 871.9], [652.6, 871.8], [650, 872.3],
  ],
  // Islanti on todellisuudessa kartan ulkopuolella lännessä; saari on tuotu
  // luoteisnurkkaan pitkien laivareittien päähän, kuten St. Helena Afrikassa.
  // Ääriviiva on Natural Earthin oikea Islanti (50m) sovitettuna tähän
  // laatikkoon, jotta maan korostus ja Tutki-kortin minikartta osuvat
  // täsmälleen siihen saareen, joka laudalla näkyy.
  icelandPoints: [
    [89.9, 35.3], [97.1, 32.5], [93.2, 37.1], [96.3, 39.0], [95.4, 43.6], [98.7, 43.2],
    [98.1, 47.0], [100.4, 45.8], [104.5, 48.0], [103.1, 51.0], [104.9, 56.1], [101.3, 62.0],
    [98.7, 61.9], [96.9, 67.9], [87.7, 72.2], [81.6, 77.8], [72.7, 80.5], [71.7, 83.7],
    [66.3, 86.0], [54.6, 83.3], [52.9, 78.8], [51.1, 80.1], [47.7, 76.4], [35.9, 78.4],
    [35.6, 73.8], [39.5, 74.6], [45.0, 68.5], [40.5, 69.7], [44.0, 64.1], [40.1, 65.8],
    [37.3, 61.1], [27.1, 62.1], [25.5, 59.8], [41.7, 56.5], [42.6, 54.0], [37.0, 53.8],
    [42.1, 49.3], [34.0, 46.9], [26.5, 50.0], [22.1, 47.9], [23.8, 46.3], [26.8, 47.7],
    [25.0, 43.4], [28.6, 45.2], [31.1, 43.9], [27.0, 42.1], [29.3, 41.6], [27.4, 39.1],
    [30.0, 39.0], [29.9, 36.1], [37.5, 41.0], [37.5, 38.1], [33.7, 35.6], [37.2, 34.6],
    [32.4, 33.3], [33.7, 31.7], [37.7, 31.7], [45.4, 38.9], [45.6, 44.0], [43.5, 44.4],
    [47.5, 52.6], [50.0, 45.9], [52.6, 47.1], [54.5, 37.6], [60.0, 43.6], [60.8, 38.0],
    [64.8, 36.1], [70.2, 44.2], [69.0, 36.6], [74.7, 40.0], [77.7, 35.8], [82.8, 35.9],
    [82.4, 31.4], [84.6, 30.0], [89.1, 34.7],
  ],
};

// start = aloituskaupunki (ei laattaa), airport = lentokenttä.
const EU_CITIES = [
  {
    id: 'lontoo', name: 'Lontoo', wiki: 'Lontoo', ambience: 'kaupunki', x: 209, y: 539, start: true, airport: true,
  },
  {
    id: 'istanbul', name: 'Istanbul', wiki: 'Istanbul', ambience: 'basaari', x: 766, y: 815, start: true, airport: true,
    // Sama kaupunki on myös Lähi-idän laudalla ja sillä on oma kaupunkilautansa.
  },
  { id: 'dublin', name: 'Dublin', wiki: 'Dublin', ambience: 'kaupunki', x: 91, y: 490, la: 'end', lx: -16, ly: 5 },
  { id: 'edinburgh', name: 'Edinburgh', wiki: 'Edinburgh', ambience: 'kaupunki', x: 150, y: 422, la: 'end', lx: -16, ly: 5 },
  { id: 'pariisi', name: 'Pariisi', wiki: 'Pariisi', ambience: 'kaupunki', x: 256, y: 609 },
  { id: 'marseille', name: 'Marseille', ambience: 'satama', wiki: 'Marseille', x: 312, y: 744, la: 'end', lx: -16, ly: 14 },
  { id: 'lissabon', name: 'Lissabon', wiki: 'Lissabon', ambience: 'satama', x: 36, y: 875, la: 'start', lx: 16, ly: 5 },
  {
    id: 'madrid', name: 'Madrid', wiki: 'Madrid', ambience: 'kaupunki', x: 140, y: 831, airport: true,
    // Gibraltarin salmen yli Afrikkaan.
  },
  { id: 'barcelona', name: 'Barcelona', wiki: 'Barcelona', ambience: 'satama', x: 244, y: 800, la: 'start', lx: 16, ly: 5 },
  { id: 'granada', name: 'Granada', ambience: 'kaupunki', wiki: 'Granada', x: 142, y: 916, la: 'end', lx: -16, ly: 5 },
  { id: 'amsterdam', name: 'Amsterdam', wiki: 'Amsterdam', ambience: 'satama', x: 305, y: 516, la: 'start', lx: 16, ly: 5 },
  { id: 'berliini', name: 'Berliini', wiki: 'Berliini', ambience: 'kaupunki', x: 468, y: 512, airport: true },
  { id: 'praha', name: 'Praha', wiki: 'Praha', ambience: 'kaupunki', x: 488, y: 576, la: 'end', lx: -16, ly: 5 },
  { id: 'wien', name: 'Wien', wiki: 'Wien', ambience: 'kaupunki', x: 526, y: 626, la: 'start', lx: 16, ly: -6 },
  { id: 'budapest', name: 'Budapest', wiki: 'Budapest', ambience: 'kaupunki', x: 591, y: 658, la: 'start', lx: 16, ly: 10 },
  { id: 'varsova', name: 'Varsova', wiki: 'Varsova', ambience: 'kaupunki', x: 615, y: 520 },
  { id: 'krakova', name: 'Krakova', ambience: 'kaupunki', wiki: 'Krakova', x: 594, y: 577, la: 'start', lx: 16, ly: 8 },
  { id: 'alpit', name: 'Alpit', wiki: 'Alpit', ambience: 'vuoristo', x: 352, y: 640, la: 'end', lx: -16, ly: 5 },
  // Venetsia on Adrianmeren pohjukassa Milanon tilalla (omistajan valinta).
  { id: 'venetsia', name: 'Venetsia', ambience: 'satama', wiki: 'Venetsia', x: 448, y: 698, la: 'start', lx: 16, ly: -6 },
  { id: 'rooma', name: 'Rooma', wiki: 'Rooma', ambience: 'kaupunki', x: 451, y: 792, airport: true, la: 'end', lx: -16, ly: 5 },
  { id: 'sisilia', name: 'Sisilia', wiki: 'Sisilia', ambience: 'meri', x: 468, y: 891, la: 'end', lx: -16, ly: 5 },
  {
    id: 'ateena', name: 'Ateena', wiki: 'Ateena', ambience: 'kaupunki', x: 667, y: 895, start: true, airport: true, la: 'end', lx: -16, ly: 5,
  },
  { id: 'kreeta', name: 'Kreeta', wiki: 'Kreeta', ambience: 'meri', x: 695, y: 964, la: 'middle', lx: 0, ly: 26 },
  // Nimi alapuolelle: Sarajevo on nyt suoraan yläpuolella.
  { id: 'dubrovnik', name: 'Dubrovnik', wiki: 'Dubrovnik', ambience: 'satama', x: 560, y: 770, la: 'middle', lx: 0, ly: 30 },
  // Sarajevoa on siirretty hieman itään, jotta nimet mahtuvat Balkanilla.
  // Sarajevo ei mahdu tarkalleen oikealle paikalleen (565, 740): se on
  // vain 30 yksikön päässä Dubrovnikista, ja lauta vaatii kaupunkien
  // väliksi 60. Aiemmin kaupunkia oli siirretty itään, jolloin piste
  // jäi Bosnian rajojen ULKOPUOLELLE Tutki-kortin minikartalla
  // (omistajan havainto). Nyt siirto on pohjoiseen: tämä on lähin
  // sallittu paikka, joka on maan sisällä.
  { id: 'sarajevo', name: 'Sarajevo', ambience: 'basaari', wiki: 'Sarajevo', x: 561, y: 710, la: 'start', lx: 16, ly: -6 },
  { id: 'sofia', name: 'Sofia', wiki: 'Sofia', ambience: 'kaupunki', x: 659, y: 771, la: 'start', lx: 16, ly: 5 },
  { id: 'bukarest', name: 'Bukarest', wiki: 'Bukarest', ambience: 'kaupunki', x: 712, y: 725, la: 'start', lx: 16, ly: 5 },
  { id: 'kiova', name: 'Kiova', wiki: 'Kiova', ambience: 'kaupunki', x: 797, y: 567 },
  { id: 'odessa', name: 'Odessa', wiki: 'Odessa', ambience: 'satama', x: 800, y: 669, la: 'start', lx: 16, ly: 5 },
  {
    id: 'moskova', name: 'Moskova', wiki: 'Moskova', ambience: 'kaupunki', x: 934, y: 427, start: true, airport: true, la: 'end', lx: -16, ly: 5,
    // Sama kaupunki on myös Maailma-laudalla, josta Siperian rata jatkuu itään.
  },
  // 'Pietari' on fi-wikissä täsmennyssivu (apostoli, kaupunki, etunimi):
  // ilman tarkennetta Lue lisää, kuvat ja peilaus jäivät tyhjiksi.
  { id: 'pietari', name: 'Pietari', wiki: 'Pietari (kaupunki)', ambience: 'kaupunki', x: 793, y: 317, la: 'start', lx: 16, ly: 5 },
  {
    id: 'helsinki', name: 'Helsinki', wiki: 'Helsinki', ambience: 'metsa', x: 688, y: 303, airport: true, la: 'end', lx: -16, ly: -12,
    // Suomen oma lauta avautuu Helsingistä.
  },
  { id: 'tallinna', name: 'Tallinna', wiki: 'Tallinna', ambience: 'kaupunki', x: 684, y: 374, la: 'start', lx: 14, ly: 12 },
  { id: 'riika', name: 'Riika', wiki: 'Riika', ambience: 'kaupunki', x: 648, y: 434, la: 'end', lx: -14, ly: 14 },
  { id: 'vilna', name: 'Vilna', wiki: 'Vilna', ambience: 'kaupunki', x: 703, y: 470, la: 'start', lx: 16, ly: 5 },
  {
    id: 'tukholma', name: 'Tukholma', wiki: 'Tukholma', ambience: 'satama', x: 558, y: 333, airport: true, la: 'end', lx: -16, ly: 5,
    // Ruotsinlaiva Ahvenanmaalle — Suomen laudalle.
  },
  { id: 'oslo', name: 'Oslo', wiki: 'Oslo', ambience: 'metsa', x: 418, y: 318, la: 'end', lx: -16, ly: 5 },
  { id: 'kobenhavn', name: 'Kööpenhamina', wiki: 'Kööpenhamina', ambience: 'satama', x: 452, y: 429, la: 'start', lx: 16, ly: 5 },
  { id: 'lappi', name: 'Lappi', wiki: 'Lapin maakunta', ambience: 'pohjoinen', x: 705, y: 145, la: 'end', lx: -16, ly: 5 },
  { id: 'tromssa', name: 'Tromssa', wiki: 'Tromssa', ambience: 'pohjoinen', x: 577, y: 66, la: 'start', lx: 16, ly: 5 },
  { id: 'islanti', name: 'Islanti', ambience: 'pohjoinen', wiki: 'Islanti', x: 62, y: 60, la: 'middle', lx: 0, ly: 42 },
];

// steps = kuinka monta silmälukua reitin kulkeminen vaatii.
// type 'sea' = laivareitti; via = piirto- ja tarkistuspisteet veden päällä.
const EU_EDGES = [
  // Brittein saaret ja Kanaali
  { a: 'lontoo', b: 'edinburgh', steps: 3 },
  // Kanaalitunneli on oikea maayhteys mantereelle.
  { a: 'lontoo', b: 'pariisi', steps: 3 },

  // Länsi-Eurooppa. Biskajan rannikon suora reitti on jätetty pois:
  // Iberiaan kuljetaan Rhônen laaksoa ja rannikkoa pitkin (haaste).
  { a: 'pariisi', b: 'amsterdam', steps: 3 },
  { a: 'pariisi', b: 'marseille', steps: 4 },
  { a: 'pariisi', b: 'alpit', steps: 3 },
  { a: 'marseille', b: 'barcelona', steps: 3 },
  { a: 'marseille', b: 'alpit', steps: 3 },
  { a: 'madrid', b: 'lissabon', steps: 3 },
  { a: 'madrid', b: 'barcelona', steps: 3 },
  { a: 'madrid', b: 'granada', steps: 3 },
  { a: 'granada', b: 'lissabon', steps: 4 },

  // Keski-Eurooppa
  { a: 'amsterdam', b: 'berliini', steps: 4 },
  { a: 'berliini', b: 'praha', steps: 2 },
  { a: 'berliini', b: 'varsova', steps: 4 },
  { a: 'berliini', b: 'kobenhavn', steps: 2 },
  { a: 'praha', b: 'wien', steps: 2 },
  { a: 'praha', b: 'krakova', steps: 3 },
  { a: 'krakova', b: 'varsova', steps: 2 },
  { a: 'krakova', b: 'budapest', steps: 3 },
  { a: 'wien', b: 'budapest', steps: 2 },
  { a: 'wien', b: 'venetsia', steps: 4 },
  { a: 'alpit', b: 'venetsia', steps: 3 },
  { a: 'alpit', b: 'berliini', steps: 4 },
  { a: 'venetsia', b: 'rooma', steps: 3 },
  // Bosnian rata: Budapestista Sarajevoon ja vuorten yli rannikolle.
  { a: 'budapest', b: 'sarajevo', steps: 2 },
  { a: 'sarajevo', b: 'dubrovnik', steps: 2 },
  { a: 'sarajevo', b: 'sofia', steps: 3 },
  { a: 'budapest', b: 'bukarest', steps: 4 },
  { a: 'sofia', b: 'ateena', steps: 4 },
  { a: 'sofia', b: 'istanbul', steps: 3 },
  { a: 'sofia', b: 'bukarest', steps: 2 },
  { a: 'bukarest', b: 'odessa', steps: 3 },
  { a: 'odessa', b: 'kiova', steps: 3 },
  { a: 'kiova', b: 'varsova', steps: 5 },
  { a: 'pietari', b: 'tallinna', steps: 3 },
  { a: 'tallinna', b: 'riika', steps: 2 },
  { a: 'riika', b: 'vilna', steps: 2 },
  { a: 'vilna', b: 'varsova', steps: 3 },
  { a: 'kiova', b: 'moskova', steps: 5 },
  { a: 'moskova', b: 'pietari', steps: 4 },
  { a: 'pietari', b: 'helsinki', steps: 3 },
  { a: 'helsinki', b: 'lappi', steps: 4 },
  { a: 'lappi', b: 'tromssa', steps: 3 },
  { a: 'tromssa', b: 'oslo', steps: 6 },
  { a: 'oslo', b: 'tukholma', steps: 3 },
  { a: 'oslo', b: 'kobenhavn', steps: 3 },
  { a: 'tukholma', b: 'kobenhavn', steps: 3 },

  // Laivareitit
  { a: 'lontoo', b: 'amsterdam', steps: 3, type: 'sea' },
  { a: 'lontoo', b: 'dublin', steps: 3, type: 'sea',
    via: [[225, 570], [170, 576], [110, 600], [70, 592], [100, 540], [100, 505]] },
  { a: 'dublin', b: 'edinburgh', steps: 3, type: 'sea' },
  // Sardinia ja Korsika ilmestyivät kartalle tarkan rannikon myötä, ja
  // suora reitti kulki niiden yli. Laiva kiertää saaret etelästä, kuten
  // oikeatkin alukset Barcelonasta Tyrrhenanmerelle.
  {
    a: 'barcelona', b: 'rooma', steps: 4, type: 'sea',
    via: [[300, 860], [400, 880], [440, 830]],
  },
  { a: 'venetsia', b: 'dubrovnik', steps: 4, type: 'sea', via: [[505, 745]] },
  { a: 'rooma', b: 'sisilia', steps: 3, type: 'sea' },
  { a: 'sisilia', b: 'ateena', steps: 4, type: 'sea' },
  { a: 'ateena', b: 'kreeta', steps: 2, type: 'sea' },
  { a: 'kreeta', b: 'sisilia', steps: 5, type: 'sea', via: [[620, 950], [540, 930]] },
  { a: 'istanbul', b: 'odessa', steps: 4, type: 'sea' },
  { a: 'dubrovnik', b: 'rooma', steps: 3, type: 'sea' },
  { a: 'tukholma', b: 'helsinki', steps: 2, type: 'sea' },
  { a: 'helsinki', b: 'tallinna', steps: 1, type: 'sea', via: [[672, 340]] },
  { a: 'riika', b: 'tukholma', steps: 3, type: 'sea', via: [[610, 395], [580, 365]] },
  // Islannin pitkät valtamerireitit: etelään Skotlantiin ja itään Jäämerelle.
  // Eteläreitti kiertää EUROOPPA-otsikon itäpuolelta Pohjanmeren kautta.
  { a: 'islanti', b: 'edinburgh', steps: 5, type: 'sea',
    via: [[210, 80], [320, 110], [300, 240], [240, 340], [205, 385]] },
  { a: 'islanti', b: 'tromssa', steps: 5, type: 'sea', via: [[290, 32], [450, 38]] },
];

/*
 * Isoisän aarrevihjeet neljänä ilmansuuntana (omistajan linjaus
 * 7.8.2026: "Niitä vihjeitä riittää vain pari ja niihin voisi
 * generoida äänen myös"). Jokainen aarre-ehdokaskaupunki kuuluu
 * yhteen alueeseen; teksti kertoo suunnan, ei koskaan kaupunkia.
 * Luennat: assets/audio/puhe-europe-vihje-<alue>.mp3. Luentateksti
 * on sama kuin vihje, kuiskaustagein — generointi samalla reseptillä
 * kuin tools/generoi-luennat.mjs (stability 0.5).
 */
const VIHJEALUEET = {
  pohjoinen: ['islanti', 'tromssa', 'lappi', 'oslo', 'tukholma',
    'kobenhavn', 'helsinki', 'pietari', 'tallinna', 'riika', 'vilna'],
  lansi: ['dublin', 'edinburgh', 'amsterdam', 'pariisi', 'lissabon',
    'madrid', 'barcelona', 'granada', 'marseille'],
  etela: ['alpit', 'venetsia', 'rooma', 'sisilia', 'ateena', 'kreeta',
    'dubrovnik', 'sarajevo', 'sofia'],
  ita: ['berliini', 'praha', 'wien', 'budapest', 'varsova', 'krakova',
    'bukarest', 'kiova', 'odessa', 'moskova'],
};

export const VIHJETEKSTIT = {
  pohjoinen: '"Luettelon rivi vie pohjoiseen — sinne, missä kesäyö ei '
    + 'pimene ja meri jäätyy talvella. En ehtinyt." Nuoli osoittaa '
    + 'kartan yläreunaan.',
  lansi: '"Lännessä, sillä puolen mannerta missä valtameri lyö '
    + 'rantaan, luettelon rivi odottaa yhä." Sivun reunassa on pieni '
    + 'ankkuri.',
  etela: '"Etelässä, lämpimän meren äärellä, missä rauniot ovat '
    + 'vanhimpia, luettelo lupaa aarteen. Laivani kääntyi liian '
    + 'aikaisin."',
  ita: '"Idässä, suurten jokien ja tasankojen maassa, on rivi vailla '
    + 'rastia. Sinne aioin palata." Hän ei palannut — minä palaan.',
};

const EUROPE_VIHJEET = {
  tekstit: Object.fromEntries(Object.entries(VIHJEALUEET)
    .flatMap(([alue, kaupungit]) => kaupungit.map((id) => [id, VIHJETEKSTIT[alue]]))),
  alueet: Object.fromEntries(Object.entries(VIHJEALUEET)
    .flatMap(([alue, kaupungit]) => kaupungit.map((id) => [id, alue]))),
};

// Lentoreitit kulkevat suoraan kaupungista toiseen yhdellä vuorolla.
const EU_AIR_ROUTES = [
  { a: 'lontoo', b: 'madrid' },
  { a: 'lontoo', b: 'berliini' },
  { a: 'lontoo', b: 'tukholma' },
  { a: 'madrid', b: 'rooma' },
  { a: 'berliini', b: 'rooma' },
  { a: 'rooma', b: 'ateena' },
  { a: 'rooma', b: 'istanbul' },
  { a: 'tukholma', b: 'moskova' },
  { a: 'istanbul', b: 'moskova' },
];

export const EUROPE = {
  id: 'europe',
  name: 'Meripihkahuone',
  boardLabel: 'Eurooppa',
  tagline: 'Etsi kadonneen Meripihkahuoneen aarre tunturien, kanavien ja raunioiden takaa.',
  ariaLabel: 'Euroopan aarrekartta',

  map: {
    ...EU_MAP,
    countryShapes: EUROPE_COUNTRY_SHAPES,
    cityCountry: EUROPE_CITY_COUNTRY,
    outlines: [
      EU_MAP.mainlandPoints, EU_MAP.britainPoints, EU_MAP.irelandPoints,
      EU_MAP.sardiniaPoints, EU_MAP.corsicaPoints, EU_MAP.sicilyPoints,
      EU_MAP.cretePoints, EU_MAP.cyprusPoints, EU_MAP.mallorcaPoints,
      EU_MAP.gotlandPoints, EU_MAP.saaremaaPoints, EU_MAP.sjaellandPoints,
      EU_MAP.euboeaPoints, EU_MAP.icelandPoints,
    ],
  },
  cities: EU_CITIES,
  edges: EU_EDGES,
  airRoutes: EU_AIR_ROUTES,
  islands: ['dublin', 'sisilia', 'kreeta', 'islanti'],
  minCityDistance: 60,

  tokens: {
    // Meripihka on Itämeren oma jalokivi: fossiloitunutta puuhartsia.
    types: themedTokenTypes({
      star: {
        name: 'Meripihkahuoneen aarre',
        kuva: 'assets/aarteet/aarre-europe-star.jpg',
      },
      ruby: {
        name: 'Kruununjalokivi', color: '#b0304a',
        kuva: 'assets/aarteet/aarre-europe-ruby.jpg',
      },
      emerald: {
        name: 'Ritarin hopeamiekka', color: '#aeb6c2',
        kuva: 'assets/aarteet/aarre-europe-emerald.jpg',
      },
      topaz: {
        name: 'Meripihka', color: '#d98f2b',
        kuva: 'assets/aarteet/aarre-europe-topaz.jpg',
      },
    }),
    counts: { star: 1, horseshoe: 2, robber: 3, ruby: 6, emerald: 7, topaz: 10, empty: 12 },
  },

  questions: EUROPE_QUESTIONS,
  placeFacts: EUROPE_FACTS,

  duels: [
    {
      q: 'Mikä näistä kaupungeista EI ole koskaan ollut valtion pääkaupunki?',
      options: ['Milano', 'Praha', 'Wien', 'Varsova', 'Ateena', 'Lissabon', 'Oslo', 'Budapest'],
      correct: 0,
      fact: 'Milano on Lombardian pääkaupunki mutta ei koskaan ollut Italian; kaikki muut ovat oman maansa pääkaupunkeja.',
    },
    {
      q: 'Mikä näistä joista EI laske Mustaanmereen?',
      options: ['Rein', 'Tonava', 'Dnepr', 'Don', 'Dnestr', 'Bug', 'Prut', 'Kubannjoki'],
      correct: 0,
      fact: 'Rein virtaa Alpeilta pohjoiseen ja laskee Pohjanmereen. Kaikki muut päätyvät Mustaanmereen.',
    },
    {
      q: 'Missä maassa sijaitsee Euroopan korkein huippu Elbrus?',
      options: ['Venäjällä', 'Georgiassa', 'Turkissa', 'Italiassa', 'Ranskassa', 'Sveitsissä', 'Itävallassa', 'Espanjassa'],
      correct: 0,
      fact: 'Elbrus on Kaukasuksella Venäjän puolella lähellä Georgian rajaa ja kohoaa 5 642 metriin.',
    },
    {
      q: 'Mikä näistä kielistä EI kuulu indoeurooppalaisiin kieliin?',
      options: ['unkari', 'kreikka', 'albania', 'liettua', 'iiri', 'romania', 'hollanti', 'puola'],
      correct: 0,
      fact: 'Unkari on suomalais-ugrilainen kieli, samoin suomi ja viro. Kaikki muut luetellut ovat indoeurooppalaisia.',
    },
    {
      q: 'Minä vuonna Berliinin muuri avattiin?',
      options: ['1989', '1961', '1968', '1975', '1980', '1985', '1991', '1993'],
      correct: 0,
      fact: 'Muuri avattiin 9. marraskuuta 1989. Se oli seissyt 28 vuotta, sillä sen rakentaminen alkoi 1961.',
    },
    {
      q: 'Mikä näistä on Euroopan unionin virallinen kieli?',
      options: ['iiri', 'norja', 'islanti', 'turkki', 'ukraina', 'serbia', 'albania', 'sveitsinsaksa'],
      correct: 0,
      fact: 'Iiri on ollut EU:n virallinen kieli vuodesta 2007. Norja ja Islanti eivät kuulu unioniin lainkaan.',
    },
  ],

  texts: {
    intro: 'Peli alkaa! Etsikää kadonneen Meripihkahuoneen aarre ja palatkaa kotisatamaan: Lontooseen, Istanbuliin, Moskovaan tai Ateenaan.',
    starFound: (name, city) => `◈ ${name} löysi MERIPIHKAHUONEEN AARTEEN kaupungista ${city}!`,
    starToast: 'MERIPIHKAHUONEEN AARRE!',
    starChase: 'Nyt on kiire kotiin — myös hevosenkengän haltija voi voittaa pelin.',
    winStar: 'toi Meripihkahuoneen aarteen turvallisesti kotiin',
    winnerStar: (name, money) => `${name} toi Meripihkahuoneen aarteen kotiin ${money} punnan kanssa.`,
    // Saapumismerkinnät: yksi arvotaan laudalle saavuttaessa.
    diaries: [
      'Kotimantere. Puolet karttani rajoista on väärin, ja loput ylitetään näyttämättä passia. Kukaan ei tarkasta papereitani — en tiedä, olenko helpottunut vai loukkaantunut.',
      '"Mannermaalla tarvitaan passi, kultaa ja kärsivällisyyttä", kirjoitti isoisä. Minulla on kortti, jolla maksan junalipun Lissabonista Tallinnaan, eikä kukaan kysy mitään. Kärsivällisyyttä tarvitaan enää vaihdoilla.',
      'Isoisän kartassa tämä maanosa on jaettu viiden keisarin kesken. Nyt tässä on yli neljäkymmentä valtiota, joista moni käyttää samaa rahaa ja jokainen omaa lippuaan. Hänen viisi keisariaan mahtuisivat nykyään yhteen kokoushuoneeseen — ja jonottaisivat vuoroaan.',
      '"Junat myöhästyvät kaikkialla paitsi Sveitsissä", merkitsi isoisä huolellisesti. Istun asemalla ja katson taulua, joka sanoo saman asian sataviisikymmentä vuotta myöhemmin. Jotkut havainnot eivät vanhene lainkaan.',
      'Isoisä luetteli maanosan suuret joet ja sai ne oikein: Volga, Tonava, Rein, Veiksel. Rajat hän sai väärin lähes kaikki. Vedet pysyivät, rajat eivät — tämä on matkani lyhyin oppitunti.',
    ],
    /*
     * Isoisän vihjeet laudan pääaarteesta — omistajan linjaus
     * 7.8.2026: vihjeitä on vain neljä, yksi per ilmansuunta, ne
     * nousevat esiin KAUPUNKIEN VÄLILLÄ (game.starHint näyttää ne
     * vain tien päällä) eivätkä sotke kaupunkien merkintöjä. Kullekin
     * on luenta: assets/audio/puhe-europe-vihje-<alue>.mp3
     * (VIHJELUENNAT js/ui.js:ssä, starHintAlue valitsee tiedoston).
     * Vihje viittaa suuntaan, ei koskaan kaupunkiin.
     */
    starHints: EUROPE_VIHJEET.tekstit,
    starHintAlue: EUROPE_VIHJEET.alueet,
  },

  puzzles: EUROPE_PUZZLES,
  decor: {
    mapLabel: 'EUROOPPA',
    mapLabelPos: { x: 175, y: 150 },
    compass: { x: 118, y: 330, r: 58 },
    waveSkip: [
      { x: 175, y: 150, r: 135 },
      { x: 118, y: 330, r: 100 },
      { x: 575, y: 975, r: 110 },
      { x: 60, y: 640, r: 95 },
    ],
    // Maamerkit kartalla, samaan tapaan kuin Afrikassa. Sijoitettu
    // kaupunkien viereen tyhjään tilaan, ei niiden päälle.
    landmarks: [
      { kind: 'acropolis', x: 712, y: 895 },  // Akropolis Ateenan itäpuolella
      { kind: 'colosseum', x: 494, y: 804 },  // Colosseum Rooman kaakkoispuolella
      { kind: 'volcano', x: 498, y: 924 },    // Etna Sisilian kaakkoispuolella
      { kind: 'geyser', x: 103, y: 42 },      // geysir Islannin koillispuolella
      { kind: 'aurora', x: 602, y: 103 },     // revontulet Tromssan kaakkoispuolella
    ],
    ship: { x: 60, y: 640 },
    serpent: { x: 575, y: 975 },
    dieSpot: { x: 0.055, y: 0.52 },
    terrainBands: [
      { maxY: 300, kind: 'mountains' },
      { maxY: 640, kind: 'trees' },
      { maxY: Infinity, kind: 'mountains' },
    ],
  },
};
