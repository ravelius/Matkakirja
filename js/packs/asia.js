// Aasia-lauta: kaupungit, reitit, kartan piirtotiedot ja teema.
//
// Koordinaatisto on 1000 x 1000 yksikköä.
//
// Kartta on Lambertin konformisessa kartioprojektiossa, standardileveys-
// piireinä 20° ja 60° pohjoista leveyttä ja keskimeridiaanina 105° itäistä
// pituutta. Muodot pysyvät oikeina sekä tropiikissa että Siperiassa, toisin
// kuin yksinkertaisessa lieriöprojektiossa, joka venyttäisi pohjoisen
// leveäksi. Lähdeaineisto on tools/mapdata/asia.json ja koordinaatit
// lasketaan komennolla `node tools/project.mjs asia`.
//
// Manner on yksi ääriviiva Iranista Beringinsalmelle ja Malakan niemimaan
// kärkeen; lännessä se jatkuu kartan reunan yli Lähi-idän laudalle. Japani,
// Sahalin, Taiwan, Sri Lanka, Sumatra, Java, Borneo ja Luzon ovat omia
// saariaan, joihin pääsee vain laivalla.

import { ASIA_QUESTIONS, ASIA_FACTS } from './asia-questions.js';
import { ASIA_COUNTRY_SHAPES, ASIA_CITY_COUNTRY } from './asia-countries.js';
import { themedTokenTypes } from '../tokens.js';

const AS_MAP = {
  width: 1000,
  height: 1000,
  mainlandPoints: [
    [494.8, 85.5], [523.3, 51.7], [530.2, 74.6], [527.5, 92.9], [546.7, 74],
    [562.9, 59.4], [583.8, 64.8], [602.4, 42.2], [619.4, 37.9], [635.9, 32.6],
    [651.6, 33.1], [667.3, 32.6], [680.3, 70.9], [698.2, 68.7], [719.4, 64.8],
    [738.5, 66.5], [763.7, 71.5], [779, 58.9], [798.7, 56.6], [824.6, 63.6],
    [838.5, 40.9], [861.9, 46.7], [881.8, 38.7], [895.1, 22.5], [920.8, 18.8],
    [952.8, 18], [963.6, 40], [948, 51.6], [958.9, 76.7], [966.3, 99.7],
    [953.8, 117.9], [954.5, 144.9], [962.9, 165.1], [967.6, 181.2], [972.4, 203.4],
    [965.4, 224.6], [956.9, 214.1], [937.5, 195.9], [927.4, 177.4], [921.2, 156],
    [919.6, 144], [909.1, 157.5], [885.9, 171.6], [864.2, 189.2], [850.1, 198.2],
    [847.4, 243], [866.6, 257.4], [873.6, 265.7], [871.8, 277.7], [863.7, 292.1],
    [861.2, 304], [855.3, 317.1], [862.4, 347], [848.8, 351.7], [846.6, 368.3],
    [838.1, 378.4], [835.4, 382.4], [836.1, 398], [836.8, 429.3], [846.5, 437.1],
    [849.9, 451.9], [844.9, 458.6], [833.5, 468], [825.5, 453.2], [822.6, 435.1],
    [809.1, 419.7], [800.6, 417.5], [793.4, 417], [780.9, 413.4], [782.1, 431.7],
    [760.9, 433.5], [754.6, 444.7], [767.6, 449.8], [777.3, 445], [792.3, 446.2],
    [781.1, 456.7], [769.3, 475.2], [779.6, 480.7], [787.9, 497.8], [799.3, 511.3],
    [797.8, 522.1], [804.1, 521.9], [798.4, 539.8], [789.9, 555], [780.2, 583.1],
    [763, 598.4], [739.8, 610.7], [735.6, 617.6], [711.1, 622.8], [700.2, 623.5],
    [686.3, 622], [671.6, 632.1], [666.9, 646.2], [662, 662.5], [678, 678.7],
    [693.2, 689.1], [698.9, 716.9], [698.6, 733.9], [685.6, 746], [668.8, 758],
    [651.6, 768.6], [649.3, 756.9], [651.6, 746.5], [634.6, 746.4], [623.8, 729],
    [606.8, 711.3], [600.2, 711], [596, 727.8], [589.4, 744.6], [596, 768.2],
    [598.5, 786.1], [609.9, 798.6], [627.6, 805.2], [639.3, 835.9], [632.8, 854.5],
    [626.5, 853.1], [608.3, 837.6], [597.9, 822.3], [585.6, 803.4], [575, 784.6],
    [574, 766.8], [579.9, 749.7], [568.7, 720.1], [565.8, 691.7], [561.5, 680.2],
    [545.4, 680.7], [542.4, 661.5], [542, 639.5], [531.3, 627.3], [518.1, 614.5],
    [510, 602.4], [494.6, 605.1], [479, 607.5], [467, 615.9], [449.8, 623.1],
    [424.6, 639.3], [401.5, 644.4], [389.8, 658.3], [384.1, 674.1], [373.4, 694.6],
    [366.2, 706.8], [347.6, 716.9], [336.6, 724.4], [328.6, 711.9], [328.9, 686.3],
    [325.6, 662.2], [320.5, 635.2], [321.5, 611.9], [327.4, 590.8], [335.2, 576.5],
    [324.2, 568.7], [310.3, 563], [307.6, 544.3], [323.2, 545.2], [322.8, 533.6],
    [309.5, 527.8], [300.8, 512.3], [294.9, 502.6], [277.4, 495.1], [260.7, 486.3],
    [244.6, 476.3], [229.3, 465], [224.7, 459.8], [222.7, 448.7], [210.9, 441.2],
    [198.9, 425.8], [195.3, 406.9], [193.3, 386.5], [183.8, 376.8], [179.5, 382.6],
    [180.5, 396.3], [181.8, 410], [183.3, 423.9], [182.1, 442.1], [193.9, 458.9],
    [208.4, 468.2], [217.5, 459], [210.3, 466.9], [213.6, 487.4], [227.8, 501.9],
    [205.9, 513.9], [188.9, 522.6], [162.7, 525.5], [146.6, 521.6], [130.5, 517.3],
    [95.9, 519.9], [75.1, 511.4], [41, 501.6], [27.6, 491.9], [31, 482.9],
    [38.6, 467.3], [47.1, 452.7], [53.7, 429.4], [56.9, 403.1], [60.6, 384.6],
    [71.6, 365.9], [75.7, 348], [80, 330.2], [81.5, 309.5], [86.4, 299.8],
    [100.1, 290.3], [111, 281], [124.3, 274.1], [131.7, 271.5], [141.7, 262.8],
    [147.3, 264.1], [159, 268.5], [174.3, 275.9], [186.9, 286], [202.4, 292.6],
    [219.6, 281.9], [229.1, 272.7], [243.7, 272.8], [250.1, 282.9], [250.2, 302],
    [259.2, 277.2], [268.6, 258.8], [278.1, 240.6], [295.9, 228.6], [319.2, 214],
    [347.4, 196.1], [376.8, 184.3], [402.5, 175.3], [425.3, 157.6], [450.1, 133.6],
    [473.6, 114],
  ],
  japanPoints: [
    [915.8, 363.9], [923.7, 370.3], [931.7, 378.9], [933.8, 391.3], [930.8, 398.1],
    [930.1, 415], [939.3, 417.7], [933.7, 427.8], [927.6, 434.7], [913.6, 440.3],
    [913.9, 443.4], [904.5, 454.6], [898.4, 457.8], [888.3, 462.4], [879.3, 470.7],
    [879.8, 486.6], [873.5, 492.9], [868.7, 488.9], [862.2, 479.1], [864.2, 467.9],
    [868.2, 463.5], [874.7, 456.1], [886.3, 451.2], [895.1, 446], [900.7, 444],
    [908.2, 438], [907.1, 418.9], [913.9, 411.8], [918.2, 399.1], [915.9, 381.4],
    [915.2, 374],
  ],
  hokkaidoPoints: [
    [909.8, 357.6], [915.4, 351.9], [929.5, 352.1], [933.7, 340], [938.1, 332.2],
    [930.8, 325.7], [919.9, 329.8], [904.2, 324.7], [904.5, 348.9], [904.2, 357.8],
  ],
  sahalinPoints: [
    [869.8, 240.2], [878.1, 246.6], [886.6, 257.5], [894.4, 275.5], [895.8, 289.5],
    [901.3, 301.5], [908.9, 311.4], [907.9, 317.5], [901.1, 312.8], [893, 296.3],
    [887.3, 282.1], [878.4, 267], [873.3, 251.1],
  ],
  taiwanPoints: [
    [806.9, 570], [811.5, 573.4], [810.5, 583.2], [807.3, 597.8], [805.7, 605.6],
    [799.8, 600.2], [797.2, 591], [800.8, 578.6], [802.7, 572.9],
  ],
  sriLankaPoints: [
    [370, 714], [378.3, 722.4], [380.2, 732.7], [382.4, 746.7], [378.5, 756.7],
    [368.8, 760.3], [360.6, 758.5], [358.9, 747.5], [360.4, 734.3], [364.5, 724.5],
  ],
  sumatraPoints: [
    [535.6, 797.8], [561.4, 805.2], [574.7, 822.1], [588.3, 840.3], [606.8, 843.7],
    [626.3, 860.7], [641.4, 873.6], [649, 889.1], [663.5, 912.7], [663.9, 951.8],
    [646.2, 947.7], [624.4, 944.7], [604.8, 925.1], [589.7, 905.8], [573.6, 890.3],
    [562.4, 867.5], [551.6, 846.3], [535.3, 822.2], [533.4, 806],
  ],
  javaPoints: [
    [654.3, 951.9], [676.3, 954.4], [701, 955], [725.9, 956.5], [758.1, 962.4],
    [782.6, 969.8], [786.5, 979.4], [766.8, 980], [742.9, 982], [707.5, 975.6],
    [672.5, 972.5], [654.4, 964.3],
  ],
  borneoPoints: [
    [709, 846.9], [731.8, 833], [748.5, 811.9], [774.4, 804.3], [793.5, 783.7],
    [813.2, 786.8], [819.9, 797.9], [804.6, 810.1], [805.1, 822.5], [813.4, 836.3],
    [809.4, 852.2], [806.3, 875.9], [801.2, 907], [778.8, 921.8], [744.7, 915.6],
    [720.4, 910.7], [703.7, 893.1], [700.2, 872.6], [702.1, 859.8],
  ],
  hainanPoints: [
    [702.1, 638.4], [712.5, 643.2], [708.1, 653.2], [698, 657.1], [689.3, 647.7],
    [694.1, 641],
  ],
  luzonPoints: [
    [811.3, 641.8], [821.8, 642], [829.8, 650.4], [829, 662.9], [828.2, 675.4],
    [836.7, 685.1], [831.2, 690.8], [823.7, 692.2], [818.7, 682.9], [808.1, 672.3],
    [806.5, 662.6], [808, 646.8],
  ],
};

// start = aloituskaupunki (ei laattaa), airport = lentokenttä.
const AS_CITIES = [
  {
    id: 'teheran', name: 'Teheran', wiki: 'Teheran', ambience: 'kaupunki', x: 237, y: 346, start: true, airport: true,
    la: 'start', lx: 16, ly: 5,
    // Sama kaupunki on myös Lähi-idän laudalla.
  },
  {
    id: 'tokio', name: 'Tokio', wiki: 'Tokio', ambience: 'kaupunki', x: 930, y: 422, start: true, airport: true,
    la: 'start', lx: 18, ly: 5,
  },

  { id: 'jekaterinburg', name: 'Jekaterinburg', wiki: 'Jekaterinburg', ambience: 'kaupunki', x: 406, y: 198, la: 'start', lx: 16, ly: 5 },
  { id: 'astana', name: 'Astana', wiki: 'Astana', ambience: 'savanni', x: 441, y: 279, la: 'start', lx: 16, ly: 5 },
  { id: 'novosibirsk', name: 'Novosibirsk', wiki: 'Novosibirsk', ambience: 'pohjoinen', x: 521, y: 264, la: 'middle', lx: 0, ly: -22 },
  { id: 'irkutsk', name: 'Irkutsk', wiki: 'Irkutsk', ambience: 'metsa', x: 647, y: 309, la: 'middle', lx: 0, ly: -22 },
  { id: 'jakutsk', name: 'Jakutsk', wiki: 'Jakutsk', ambience: 'pohjoinen', x: 777, y: 189, la: 'end', lx: -16, ly: 5 },
  { id: 'magadan', name: 'Magadan', wiki: 'Magadan', ambience: 'pohjoinen', x: 889, y: 169, la: 'end', lx: -16, ly: 5 },
  { id: 'kamtsatka', name: 'Kamtšatka', wiki: 'Kamtšatkan niemimaa', ambience: 'vuoristo', x: 965, y: 202, la: 'end', lx: -16, ly: 24 },
  { id: 'sahalin', name: 'Sahalin', wiki: 'Sahalin', ambience: 'meri', x: 892, y: 280, la: 'start', lx: 16, ly: 5 },
  { id: 'vladivostok', name: 'Vladivostok', wiki: 'Vladivostok', ambience: 'satama', x: 843, y: 370, la: 'start', lx: 16, ly: 5 },
  { id: 'ulanbator', name: 'Ulan Bator', wiki: 'Ulan Bator', ambience: 'savanni', x: 665, y: 364, la: 'middle', lx: 0, ly: 24 },
  {
    id: 'peking', name: 'Peking', wiki: 'Peking', ambience: 'kaupunki', x: 740, y: 429, start: true, airport: true, la: 'end', lx: -16, ly: 5,
    // Sama kaupunki on myös Maailma-laudalla.
  },
  { id: 'soul', name: 'Soul', wiki: 'Soul (kaupunki)', ambience: 'kaupunki', x: 826, y: 436, la: 'start', lx: 16, ly: 5 },
  // Kioto on kartalla noin 200 km todellista paikkaansa lounaassa. Tokio
  // jäisi oikealta paikalta 32 yksikön päähän, ja laudan vähimmäisväli on
  // 50 — Honshūn kaksi kaupunkia eivät mahdu kartalle omille paikoilleen.
  { id: 'kioto', name: 'Kioto', wiki: 'Kioto', ambience: 'kaupunki', x: 888, y: 451, la: 'start', lx: 16, ly: 5 },
  { id: 'xian', name: 'Xi’an', wiki: 'Xi’an', ambience: 'kaupunki', x: 684, y: 491, la: 'end', lx: -16, ly: 5 },
  { id: 'shanghai', name: 'Shanghai', wiki: 'Shanghai', ambience: 'satama', x: 787, y: 507, airport: true, la: 'start', lx: 16, ly: 5 },
  { id: 'taipei', name: 'Taipei', wiki: 'Taipei', ambience: 'kaupunki', x: 805, y: 584, la: 'start', lx: 16, ly: 5 },
  { id: 'hongkong', name: 'Hongkong', wiki: 'Hongkong', ambience: 'satama', x: 739, y: 607, airport: true, la: 'end', lx: -16, ly: 5 },
  // Kanton on Helmijoen suistossa vain runsaan sadan kilometrin päässä
  // Hongkongista eli laudan mittakaavassa saman pisteen päällä. Piste on
  // siirretty pohjoiseen sisämaahan vähimmäisvälin (50) verran, noin
  // 470 km, jotta molemmat mahtuvat kartalle omina kohteinaan.
  { id: 'kanton', name: 'Kanton', wiki: 'Kanton', ambience: 'satama', x: 710, y: 565, la: 'end', lx: -16, ly: 5 },
  { id: 'manila', name: 'Manila', wiki: 'Manila', ambience: 'satama', x: 822, y: 675, airport: true, la: 'start', lx: 16, ly: 5 },
  { id: 'hanoi', name: 'Hanoi', wiki: 'Hanoi', ambience: 'kaupunki', x: 660, y: 630, la: 'end', lx: -16, ly: 5 },
  { id: 'bangkok', name: 'Bangkok', wiki: 'Bangkok', ambience: 'basaari', x: 603, y: 708, airport: true, la: 'end', lx: -16, ly: 24 },
  { id: 'yangon', name: 'Yangon', wiki: 'Yangon', ambience: 'basaari', x: 559, y: 671, la: 'end', lx: -16, ly: 5 },
  { id: 'mandalay', name: 'Mandalay', wiki: 'Mandalay', ambience: 'basaari', x: 564, y: 615, la: 'start', lx: 16, ly: 5 },
  {
    id: 'singapore', name: 'Singapore', wiki: 'Singapore', ambience: 'satama', x: 634, y: 851, start: true, airport: true, la: 'middle', lx: 0, ly: 30,
  },
  { id: 'sumatra', name: 'Sumatra', wiki: 'Sumatra', ambience: 'sademetsa', x: 562, y: 817, la: 'start', lx: 16, ly: 5 },
  { id: 'borneo', name: 'Borneo', wiki: 'Borneo', ambience: 'sademetsa', x: 718, y: 852, la: 'start', lx: 16, ly: 5 },
  {
    id: 'jakarta', name: 'Jakarta', wiki: 'Jakarta', ambience: 'kaupunki', x: 679, y: 958, airport: true, la: 'end', lx: -16, ly: 5,
    // Indonesian saariketju jatkuu idässä Oseanian laudalle.
  },
  { id: 'lhasa', name: 'Lhasa', wiki: 'Lhasa', ambience: 'vuoristo', x: 535, y: 519, la: 'start', lx: 16, ly: 5 },
  // Kathmandun ja Kolkatan nimikyltit siirrettiin, jotta Varanasi mahtuu
  // Gangesin laaksoon niiden väliin.
  { id: 'kathmandu', name: 'Kathmandu', wiki: 'Kathmandu', ambience: 'vuoristo', x: 468, y: 545, la: 'start', lx: 16, ly: 24 },
  { id: 'delhi', name: 'Delhi', wiki: 'Delhi', ambience: 'basaari', x: 398, y: 509, airport: true, la: 'end', lx: -16, ly: 5 },
  { id: 'kolkata', name: 'Kolkata', wiki: 'Kalkutta', ambience: 'basaari', x: 490, y: 598, la: 'start', lx: 16, ly: -6 },
  // Varanasi on kartalla noin 250 km todellista paikkaansa lounaassa:
  // Kathmandu jäisi oikealta paikalta 26 yksikön päähän, kun laudan
  // vähimmäisväli on 50.
  { id: 'varanasi', name: 'Varanasi', wiki: 'Varanasi', ambience: 'basaari', x: 424, y: 570, la: 'end', lx: -16, ly: -6 },
  {
    id: 'mumbai', name: 'Mumbai', wiki: 'Mumbai', ambience: 'kaupunki', x: 331, y: 591, start: true, airport: true, la: 'end', lx: -16, ly: 5,
    // Sama kaupunki on myös Maailma-laudalla.
  },
  { id: 'chennai', name: 'Chennai', wiki: 'Chennai', ambience: 'meri', x: 381, y: 674, la: 'end', lx: -16, ly: 5 },
  { id: 'colombo', name: 'Colombo', wiki: 'Colombo', ambience: 'satama', x: 368, y: 742, la: 'middle', lx: 0, ly: 28 },
  { id: 'karachi', name: 'Karachi', wiki: 'Karachi', ambience: 'satama', x: 303, y: 511, la: 'end', lx: -16, ly: 5 },
  { id: 'kabul', name: 'Kabul', wiki: 'Kabul', ambience: 'vuoristo', x: 360, y: 429, la: 'end', lx: -16, ly: 5 },
  { id: 'samarkand', name: 'Samarkand', wiki: 'Samarkand', ambience: 'basaari', x: 365, y: 374, la: 'start', lx: 16, ly: 5 },
  { id: 'kashgar', name: 'Kašgar', wiki: 'Kašgar', ambience: 'basaari', x: 429, y: 402, la: 'start', lx: 16, ly: 5 },
];

// steps = kuinka monta silmälukua reitin kulkeminen vaatii.
// type 'sea' = laivareitti; via = piirto- ja tarkistuspisteet veden päällä.
const AS_EDGES = [
  // Siperia ja Keski-Aasia
  { a: 'teheran', b: 'samarkand', steps: 5 },
  { a: 'samarkand', b: 'jekaterinburg', steps: 6 },
  { a: 'samarkand', b: 'kabul', steps: 3 },
  { a: 'samarkand', b: 'kashgar', steps: 4 },
  { a: 'jekaterinburg', b: 'astana', steps: 4 },
  { a: 'astana', b: 'novosibirsk', steps: 4 },
  { a: 'novosibirsk', b: 'irkutsk', steps: 5 },
  { a: 'irkutsk', b: 'jakutsk', steps: 6 },
  { a: 'irkutsk', b: 'ulanbator', steps: 3 },
  { a: 'jakutsk', b: 'magadan', steps: 6 },
  { a: 'jakutsk', b: 'vladivostok', steps: 7 },
  { a: 'ulanbator', b: 'novosibirsk', steps: 5 },
  { a: 'ulanbator', b: 'peking', steps: 4 },

  // Silkkitie ja Himalaja
  { a: 'kashgar', b: 'lhasa', steps: 6 },
  { a: 'kashgar', b: 'xian', steps: 7 },
  { a: 'kabul', b: 'delhi', steps: 5 },
  { a: 'kabul', b: 'karachi', steps: 4 },
  { a: 'delhi', b: 'kathmandu', steps: 3 },
  { a: 'delhi', b: 'karachi', steps: 4 },
  { a: 'delhi', b: 'mumbai', steps: 5 },
  { a: 'kathmandu', b: 'lhasa', steps: 4 },
  { a: 'kathmandu', b: 'kolkata', steps: 3 },
  { a: 'lhasa', b: 'xian', steps: 6 },
  // Gangesin laakso: Delhistä Varanasin kautta Kolkataan.
  { a: 'delhi', b: 'varanasi', steps: 3 },
  { a: 'varanasi', b: 'kathmandu', steps: 2 },
  { a: 'varanasi', b: 'kolkata', steps: 3 },

  // Intia ja Kaakkois-Aasia
  { a: 'mumbai', b: 'chennai', steps: 5 },
  { a: 'chennai', b: 'kolkata', steps: 5 },
  { a: 'kolkata', b: 'yangon', steps: 5 },
  { a: 'yangon', b: 'bangkok', steps: 4 },
  { a: 'yangon', b: 'hanoi', steps: 5 },
  { a: 'bangkok', b: 'hanoi', steps: 4 },
  { a: 'bangkok', b: 'singapore', steps: 6 },
  { a: 'hanoi', b: 'hongkong', steps: 4 },
  // Irrawaddyn laakso: Yangonista Mandalayhin nousee rautatie, ja idässä
  // vuoristopolut vievät Siamiin ja Tonkiniin.
  { a: 'yangon', b: 'mandalay', steps: 3 },
  { a: 'mandalay', b: 'bangkok', steps: 5 },
  { a: 'mandalay', b: 'hanoi', steps: 5 },

  // Kiina, Korea ja Japani
  { a: 'peking', b: 'xian', steps: 4 },
  { a: 'peking', b: 'shanghai', steps: 5 },
  { a: 'peking', b: 'soul', steps: 4 },
  { a: 'xian', b: 'shanghai', steps: 5 },
  { a: 'shanghai', b: 'hongkong', steps: 5 },
  { a: 'soul', b: 'vladivostok', steps: 4 },
  // Helmijoki: Kantonista alavirtaan Hongkongiin, länteen Tonkiniin.
  { a: 'kanton', b: 'hongkong', steps: 2 },
  { a: 'kanton', b: 'hanoi', steps: 3 },
  { a: 'kioto', b: 'tokio', steps: 3 },

  // Laivareitit
  { a: 'vladivostok', b: 'sahalin', steps: 4, type: 'sea', via: [[870, 328]] },
  { a: 'sahalin', b: 'magadan', steps: 5, type: 'sea', via: [[895, 238], [899, 195]] },
  { a: 'magadan', b: 'kamtsatka', steps: 4, type: 'sea', via: [[921, 175]] },
  { a: 'sahalin', b: 'tokio', steps: 5, type: 'sea', via: [[896, 334], [894, 389]] },
  { a: 'tokio', b: 'soul', steps: 4, type: 'sea', via: [[923, 476], [882, 509], [842, 488]] },
  { a: 'tokio', b: 'shanghai', steps: 5, type: 'sea', via: [[919, 478], [856, 514]] },
  { a: 'kioto', b: 'shanghai', steps: 5, type: 'sea', via: [[860, 500], [820, 512]] },
  { a: 'shanghai', b: 'taipei', steps: 4, type: 'sea', via: [[815, 540]] },
  { a: 'taipei', b: 'manila', steps: 4, type: 'sea', via: [[818, 625]] },
  { a: 'hongkong', b: 'manila', steps: 4, type: 'sea', via: [[776, 654]] },
  { a: 'manila', b: 'borneo', steps: 5, type: 'sea', via: [[809, 728], [763, 774], [724, 814]] },
  { a: 'borneo', b: 'singapore', steps: 5, type: 'sea', via: [[683, 856], [658, 855]] },
  { a: 'borneo', b: 'jakarta', steps: 5, type: 'sea', via: [[704, 905], [692, 939]] },
  { a: 'singapore', b: 'jakarta', steps: 5, type: 'sea', via: [[658, 902], [672, 942]] },
  { a: 'singapore', b: 'sumatra', steps: 4, type: 'sea', via: [[602, 835]] },
  { a: 'sumatra', b: 'yangon', steps: 5, type: 'sea', via: [[524, 768], [538, 700]] },
  { a: 'chennai', b: 'colombo', steps: 3, type: 'sea', via: [[371, 712]] },
  { a: 'colombo', b: 'mumbai', steps: 6, type: 'sea', via: [[314, 718], [296, 638]] },
  { a: 'mumbai', b: 'karachi', steps: 4, type: 'sea', via: [[305, 547]] },
];

// Lentoreitit kulkevat suoraan kaupungista toiseen yhdellä vuorolla.
const AS_AIR_ROUTES = [
  { a: 'teheran', b: 'delhi' },
  { a: 'delhi', b: 'mumbai' },
  { a: 'delhi', b: 'peking' },
  { a: 'mumbai', b: 'bangkok' },
  { a: 'bangkok', b: 'singapore' },
  { a: 'bangkok', b: 'hongkong' },
  { a: 'singapore', b: 'jakarta' },
  { a: 'hongkong', b: 'manila' },
  { a: 'hongkong', b: 'shanghai' },
  { a: 'shanghai', b: 'tokio' },
  { a: 'peking', b: 'tokio' },
  { a: 'peking', b: 'shanghai' },
];

export const ASIA = {
  id: 'asia',
  name: 'Keisarin jadesinetti',
  boardLabel: 'Aasia',
  tagline: 'Etsi keisarin kadonnut jadesinetti Silkkitieltä, Himalajalta, Siperian taigalta ja trooppisilta saarilta.',
  ariaLabel: 'Aasian aarrekartta',

  /*
   * countryShapes ja cityCountry kytkettiin 23.8.2026 (ks.
   * asia-countries.js). Ennen sitä laudalla ei ollut kumpaakaan taulua,
   * ja maalehdet aukesivat vain maailmankartalta.
   *
   * Muoto on 21 maalla, ja ne ovat täsmälleen ne maat, joihin laudan 41
   * kohdetta kuuluvat. Kaikilla kohteilla on cityCountry-tunnus, myös
   * niillä neljällä, jotka jäävät oman maansa renkaan ulkopuolelle
   * (Borneo, Singapore, Hongkong, Kamtšatka) — maan aihesivut haetaan
   * ISO-tunnuksella eikä muodosta.
   */
  map: {
    ...AS_MAP,
    countryShapes: ASIA_COUNTRY_SHAPES,
    cityCountry: ASIA_CITY_COUNTRY,
    outlines: [
      AS_MAP.mainlandPoints, AS_MAP.japanPoints, AS_MAP.hokkaidoPoints,
      AS_MAP.sahalinPoints, AS_MAP.taiwanPoints, AS_MAP.sriLankaPoints,
      AS_MAP.sumatraPoints, AS_MAP.javaPoints, AS_MAP.borneoPoints,
      AS_MAP.hainanPoints, AS_MAP.luzonPoints,
    ],
  },
  cities: AS_CITIES,
  edges: AS_EDGES,
  airRoutes: AS_AIR_ROUTES,
  islands: ['tokio', 'sahalin', 'taipei', 'colombo', 'sumatra', 'jakarta', 'borneo', 'manila'],
  minCityDistance: 50,

  tokens: {
    types: themedTokenTypes({
      star: {
        name: 'Keisarin jadesinetti',
        kuva: 'assets/aarteet/aarre-asia-star.jpg',
      },
      mannerAarre: {
        name: 'Sukeltajan helmi', color: '#e8e4da',
        kuva: 'assets/aarteet/aarre-asia-manner.jpg',
      },
    }),
    // 41 kaupunkia, yksi laatta kussakin.
    counts: { star: 1, mannerAarre: 1, isoAarre: 13, pieniAarre: 26 },
  },

  questions: ASIA_QUESTIONS,
  placeFacts: ASIA_FACTS,

  duels: [
    {
      q: 'Mikä on maailman korkein vuori?',
      options: ['Mount Everest', 'K2', 'Kangchenjunga', 'Lhotse',
        'Makalu', 'Cho Oyu', 'Annapurna', 'Nanga Parbat'],
      correct: 0,
      fact: 'Everest kohoaa 8 849 metriin Nepalin ja Kiinan rajalla. K2 on toiseksi korkein, 8 611 metriä.',
    },
    {
      q: 'Mikä on maailman väkirikkain maa?',
      options: ['Intia', 'Kiina', 'Indonesia', 'Pakistan',
        'Bangladesh', 'Japani', 'Venäjä', 'Filippiinit'],
      correct: 0,
      fact: 'Intia ohitti Kiinan väkiluvussa vuonna 2023. Molemmissa asuu yli 1,4 miljardia ihmistä.',
    },
    {
      q: 'Mikä näistä on maailman suurin järvi pinta-alaltaan?',
      options: ['Kaspianmeri', 'Baikal', 'Balhaš', 'Aral',
        'Yläjärvi', 'Viktoriajärvi', 'Tanganjika', 'Ladoga'],
      correct: 0,
      fact: 'Kaspianmeri on suolainen mutta sisämaajärvi, pinta-alaltaan noin 371 000 neliökilometriä. Baikal on syvin.',
    },
    {
      q: 'Mikä kauppareitistö yhdisti Kiinan ja Välimeren vuosituhansien ajan?',
      options: ['Silkkitie', 'Hansaliitto', 'Suolatie', 'Meripolku',
        'Karavaanitie', 'Teetie', 'Mausteväylä', 'Kultatie'],
      correct: 0,
      fact: 'Reitistö kulki Kašgarin ja Samarkandin kautta. Silkin lisäksi sitä pitkin kulkivat paperi, ruuti ja uskonnot.',
    },
    {
      q: 'Missä maassa on eniten tulivuoria?',
      options: ['Indonesiassa', 'Japanissa', 'Filippiineillä', 'Islannissa',
        'Italiassa', 'Chilessä', 'Uudessa-Seelannissa', 'Meksikossa'],
      correct: 0,
      fact: 'Indonesiassa on yli 120 aktiivista tulivuorta. Maa on Tyynenmeren tulirenkaalla kahden laatan saumassa.',
    },
    {
      q: 'Mikä on Aasian pisin joki?',
      options: ['Jangtse', 'Keltainenjoki', 'Mekong', 'Ganges',
        'Indus', 'Ob', 'Jenisei', 'Lena'],
      correct: 0,
      fact: 'Jangtse on noin 6 300 kilometriä pitkä ja maailman kolmanneksi pisin joki.',
    },
  ],

  texts: {
    intro: 'Peli alkaa! Etsikää Keisarin jadesinetti ja palatkaa kotisatamaan: Teheraniin, Tokioon, Pekingiin, Singaporeen tai Mumbaihin.',
    starFound: (name, city) => `◈ ${name} löysi KEISARIN JADESINETIN kaupungista ${city}!`,
    starToast: 'KEISARIN JADESINETTI!',
    starChase: 'Nyt on kiire kotiin — ensimmäisenä perille ehtinyt voittaa pelin.',
    winStar: 'toi Keisarin jadesinetin turvallisesti kotiin',
    winnerStar: (name, money) => `${name} toi Keisarin jadesinetin kotiin ${money} punnan kanssa.`,
    // Saapumismerkinnät: yksi arvotaan laudalle saavuttaessa.
    diaries: [
      'Klubilla tätä mannerta kutsuttiin Itämaiksi ja odotettiin kameleita. Luotijuna ohitti odotukseni kolmensadan kilometrin tuntinopeudella.',
      'Isoisän kartassa tämä maanosa on väritetty kolmen keisarikunnan väreillä. Nyt tässä on lähes viisikymmentä valtiota, ja useimmat itsenäistyivät hänen kuolemansa jälkeen. Kartta on kaunis ja täysin käyttökelvoton.',
      '"Matka Bombayhin kestää kolme viikkoa, jos tuuli suosii", kirjoitti isoisä. Nousin koneeseen aamulla ja söin illallisen perillä. Hän olisi pitänyt sitä huijauksena, ja ymmärrän kannan.',
      'Isoisä merkitsi muistiin, ettei korkeimmille huipuille ole nousuja eikä tule. Everestillä on nykyään jono ja aikataulu. Hän oli oikeassa siinä, ettei vuori siitä miksikään muutu.',
      '"Kiina valmistaa posliinia ja silkkiä, Britannia koneita", tiivisti isoisä työnjaon. Tarkistin asian: koneet tehdään täällä ja Lontoossa niitä myydään. Työnjako säilyi, suunta vaihtui.',
      'Isoisä laski matka-aikoja karavaanipäivissä ja monsuunituulissa. Molemmat ovat yhä olemassa: tuuli kääntyy kesäkuussa ja aavikon poikki menee yhä tie. Vain minun kärsivällisyyteni on kadonnut.',
    ],
  },

  decor: {
    mapLabel: 'AASIA',
    mapLabelPos: { x: 185, y: 792 },
    compass: { x: 880, y: 618, r: 56 },
    waveSkip: [
      { x: 185, y: 792, r: 130 },
      { x: 880, y: 618, r: 95 },
      { x: 330, y: 930, r: 95 },
      { x: 862, y: 882, r: 105 },
    ],
    ship: { x: 862, y: 882 },
    serpent: { x: 330, y: 930 },
    dieSpot: { x: 0.06, y: 0.2 },
    terrainBands: [
      { maxY: 340, kind: 'trees' },
      { maxY: 600, kind: 'mountains' },
      { maxY: Infinity, kind: 'trees' },
    ],
  },
};
