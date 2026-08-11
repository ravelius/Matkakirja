// Maailma-lauta: koko maapallo kahtena pallonpuoliskona.
//
// Kartta on piirretty 1600-luvun maailmankarttojen tapaan (Blaeu, Visscher):
// kaksi ympyrää vierekkäin, napa-alueet omissa pikkuympyröissään ylä- ja
// alalaidassa. Vasen ympyrä on Amerikkojen puolisko (keskimeridiaani 110°W),
// oikea Afrikan, Euroopan ja Aasian puolisko (70°E). Uusi-Seelanti jää
// vasempaan ympyrään, koska se on 174°E eli oikean puoliskon rajan takana.
//
// Projektio on stereografinen atsimutaali päiväntasaajan asennossa; kaava on
// tools/hemispheres.mjs:ssä, joka myös tuotti nämä koordinaatit vanhasta
// lieriöprojektiosta. Piirtokoodin vastaava kaava on mapart.js:n
// drawHemisphereFrames-funktiossa — ne on pidettävä yhtenäisinä.
//
// Syy vaihtoon oli mittasuhde: lieriöprojektio oli 1,87:1 ja jäi pystyruudulla
// kapeaksi nauhaksi. Pallonpuoliskot ovat noin 1,45:1, joten puhelimella ja
// tabletilla kartta on noin kolmanneksen isompi.
//
// Atlantin ylittävät laivareitit (Lontoo-New York, Kapkaupunki-Rio) kulkevat
// ympyröiden välistä: puoliskojen raja on 20°W, ja ympyröiden vastakkaiset
// reunat ovat siinä kohdin vierekkäin.
//
// Mantereet ylitetään laivalla valtamerten poikki, lentäen tai kahta
// maareittiä pitkin (Siperian rata ja Amerikan mannerrata). Lähes joka
// kaupunki on portti mantereensa tarkemmalle laudalle.

import { MAAILMA_QUESTIONS, MAAILMA_FACTS } from './maailma-questions.js';
import { themedTokenTypes } from '../tokens.js';

const WORLD_MAP = {
  width: 1150,
  height: 800,
  // Kaksi pallonpuoliskoa vierekkäin, 1600-luvun maailmankarttojen tapaan.
  // Vasen ympyrä on Amerikkojen puolisko (keskimeridiaani -110°), oikea
  // Afrikan, Euroopan ja Aasian puolisko (70°). Projektio on
  // stereografinen atsimutaali — sama jota Blaeu ja Visscher käyttivät.
  // Napa-alueet ovat omissa pikkuympyröissään ylä- ja alalaidassa.
  hemispheres: [
    { cx: 290, cy: 400, r: 270, lon0: -110 },
    { cx: 862, cy: 400, r: 270, lon0: 70 },
  ],
  polars: [
    { cx: 576, cy: 136, r: 122, north: true },
    { cx: 576, cy: 664, r: 122, north: false },
  ],
  americasPoints: [
    [213.4, 197.1], [202.5, 217.3], [225.9, 234], [249.2, 245.3], [262, 275.3],
    [261.3, 300.4], [274.9, 319.8], [290, 345], [301.4, 352.3], [322.5, 361.5],
    [349.4, 375.2], [367.1, 382.2], [364.9, 405.1], [359.6, 415.1], [371.2, 436.2],
    [385.5, 448.3], [378, 480.7], [367.2, 507.6], [360.9, 537.3], [362.6, 555.1],
    [380, 527.2], [392.6, 511.8], [408.4, 503.7], [438.8, 489.6], [468.6, 476.8],
    [495.6, 430], [465.2, 410.1], [445.9, 400], [439.3, 384.6], [414.9, 374.1],
    [403.5, 372.1], [381.8, 368.3], [369.4, 376.9], [354.1, 372.6], [341.4, 360.7],
    [342.9, 348], [336.2, 353.4], [319.1, 336.9], [325.4, 328.9], [336.6, 328],
    [353.2, 331.4], [358.6, 336.1], [354.1, 320.5], [363.7, 307.8], [365, 292.8],
    [371.4, 282], [377.9, 273.4], [388.1, 262.8], [390.6, 242.8], [380.2, 236.6],
    [362.1, 226.5], [349.8, 217], [329.4, 214.3], [314.8, 211.5], [290, 217.8],
    [266.1, 208], [244.8, 195.7], [229.9, 190.4],
  ],
  greenlandPoints: [
    [345.4, 218.4], [333.8, 190.2], [324.7, 166.7], [318.6, 151.2], [318.2, 143.3],
    [326.7, 140.3], [346.6, 143.2], [372.7, 156.8], [386.9, 175.8], [388.8, 196.4],
    [384.9, 216], [370.5, 220.9], [357.2, 223.9],
  ],
  afroeurasiaPoints: [
    [691.9, 238.4], [717.3, 241.7], [713.2, 229], [726.1, 233.6], [740.5, 229.9],
    [752.2, 228.8], [759.2, 222.4], [764.6, 221.7], [762.1, 233], [775.3, 238.5],
    [795.5, 231], [790.7, 224.9], [779.1, 220.3], [766.2, 222.7], [766.3, 215.9],
    [763.5, 204], [792.7, 193], [811.5, 192.5], [830.1, 213.1], [849.6, 213.7],
    [867.3, 200], [880.2, 186.5], [895.3, 175.5], [921.6, 174.7], [947.9, 160.5],
    [1015.9, 171.7], [1025.7, 204.1], [986.2, 218.1], [997, 256.2], [989.5, 264.1],
    [995.3, 291.1], [975.9, 291], [978, 306.8], [973.7, 335.2], [951.4, 344.3],
    [950.1, 355.2], [946.4, 374], [942, 397.5], [934.1, 382.3], [928.5, 369.9],
    [918.2, 360.4], [910.1, 345.8], [898.8, 351.5], [885.2, 364.2], [878.4, 381],
    [869, 364.5], [866.6, 350], [853, 340.1], [835, 339.5], [832.9, 336.9],
    [839.3, 347.1], [824.9, 358.9], [803, 366.8], [798.1, 366.2], [785, 326.8],
    [775, 328], [793, 369.8], [817.2, 374.5], [809.6, 387.7], [797.1, 400],
    [790, 420.3], [781.7, 446.6], [781.1, 462.8], [778.9, 479.8], [769.3, 493.5],
    [745.2, 500], [717.2, 455.5], [703.4, 415.9], [703.2, 387.3], [673.7, 379],
    [643.8, 384.4], [625.8, 362.3], [614.1, 333.6], [626, 309.2], [661.8, 282.7],
    [680.7, 274.9], [709.2, 279.4], [728.6, 283.8], [735.8, 303.8], [747.7, 310.3],
    [760.7, 310.6], [772.2, 316], [777.1, 319.9], [785, 312.9], [789.2, 303.6],
    [775.3, 302], [769.2, 297.4], [769.4, 288.1], [776.9, 287.1], [790.5, 287.6],
    [802.8, 291.9], [804.7, 287.9], [796.7, 280.1], [789.4, 275.1], [783.3, 273.3],
    [776.4, 280.7], [775.9, 286.3], [764.9, 286.7], [756.1, 290.4], [759.1, 297.7],
    [751.3, 282.1], [748.6, 263.2], [742.7, 264.2], [744.3, 286.4], [738.5, 273.4],
    [738.3, 262.1], [725.3, 259.4], [718.9, 259.9], [706.2, 265.8], [698, 268.6],
    [689.7, 263.7], [678.4, 258.9],
  ],
  britainPoints: [
    [718.3, 222.6], [732.6, 228.7], [736.3, 221.9], [740.3, 209.9], [742, 200.2],
    [730, 205.8], [726.2, 213.4], [721.9, 220.3],
  ],
  australiaPoints: [
    [966.4, 460.6], [989.6, 452.6], [1018.7, 438], [1037.9, 440.6], [1055.3, 439.5],
    [1063.6, 471.6], [1074.4, 487.1], [1077.4, 510.5], [1057.6, 533.7], [1033.4, 543.1],
    [1019.5, 531], [1010.9, 515], [998.6, 499.6], [984.7, 498.5], [961.7, 495.2],
    [961.9, 471.4],
  ],
  madagascarPoints: [
    [800.2, 429.4], [810, 434.3], [816.7, 446.5], [816, 461.1], [808.4, 469.2],
    [799.5, 464.5], [795.4, 449.9], [795.4, 438.8],
  ],
  japanPoints: [
    [1008, 288.8], [1008.5, 272.1], [1007.4, 253.3], [1008.9, 239.3], [1018.7, 241.2],
    [1024, 259.4], [1023.5, 279.4], [1019.1, 293.9], [1012.9, 298.9],
  ],
  indonesiaPoints: [
    [925.5, 407.9], [941.6, 416.4], [958.2, 422.8], [975.6, 424.8], [989.4, 430],
    [996, 437], [989.3, 440.5], [970.9, 434.5], [950.4, 427.1], [932.4, 417.9],
    [920.9, 413.1],
  ],
  nzNorthPoints: [
    [87.5, 538.1], [103.3, 542.8], [117.8, 552.8], [117.6, 563.9], [102.9, 561.4], [88.8, 552.2],
  ],
  nzSouthPoints: [
    [122.9, 565.6], [136.6, 570], [151.9, 580], [153.7, 590.1], [139.5, 587], [126.3, 578.3],
  ],
  // Pohjoisnavalla ei ole mannerta: napaympyrässä on vain merta ja asteverkko.
  // Etelämanner etelänavan ympyrässä: rannikko noin 70. leveyspiirillä,
  // jota Rossin ja Weddellin merten lahdet painavat etelämmäs.
  antarcticaPoints: [
    [576, 781.6], [602.6, 775.2], [621.2, 754.2], [632.1, 732.1], [642, 714.1],
    [651.6, 696.3], [653.4, 676], [643.8, 657.8], [629.8, 644.9], [620.6, 631.4],
    [614.1, 610], [600.5, 584.7], [576, 570.4], [549.4, 576.8], [530.8, 597.8],
    [519.9, 619.9], [510, 637.9], [500.4, 655.7], [498.6, 676], [508.2, 694.2],
    [522.2, 707.1], [531.4, 720.6], [537.9, 742], [551.5, 767.3],
  ],
};

// start = aloituskaupunki (ei laattaa), airport = lentokenttä.
const WORLD_CITIES = [
  { id: 'lontoo', name: 'Lontoo', x: 731.7, y: 225.9, start: true, airport: true, la: 'end', lx: -16, ly: 5,
    /*
     * Lontoo on matkan alku ja loppu, ja siksi se on myös ainoa portti
     * koko maapallon kartalle. Järjestys on tarkoituksellinen: laajin
     * kartta ensin, sitten vanha maailma, sitten yksi maanosa.
     */
    links: [
      { pack: 'maailmankartta', city: 'lontoo', label: 'Koko maailma' },
    ] },
  {
    id: 'newyork', name: 'New York', x: 359, y: 293.2, start: true, airport: true,
    la: 'end', lx: -16, ly: 5,
    /*
     * Koko maailma ensin, kuten muillakin porteilla.
     *
     * New York, Los Angeles, Rio ja Sydney veivät suoraan vanhalle
     * mannerlaudalle, ja kymmenen muuta porttia uudelle
     * maailmankartalle. Omistaja: "Jos lennän aloitusnäytöltä New
     * Yorkiin, niin tulee vanha kartta, joka ei ole edes
     * skrollattavissa." Manner on 1000 yksikköä leveä eli kapeampi kuin
     * näkymä, joten panoroitavaa ei ollut — eikä siinä ole maastoa.
     */
    links: [
      { pack: 'maailmankartta', city: 'newyork', label: 'Koko maailma' },
    ],
  },

  {
    id: 'kairo', name: 'Kairo', x: 772.5, y: 322.1, airport: true, la: 'start', lx: 16, ly: 5,
    // Kairosta laskeudutaan tarkemmille laudoille.
    links: [
      { pack: 'maailmankartta', city: 'kairo', label: 'Koko maailma' },
    ],
  },
  {
    id: 'rio', name: 'Rio de Janeiro', x: 457.7, y: 477, airport: true, la: 'end', lx: -16, ly: 5,
    // Sama kaupunki on myös Etelä-Amerikan laudalla.
    links: [
      { pack: 'maailmankartta', city: 'rio', label: 'Koko maailma' },
    ],
  },
  {
    id: 'mumbai', name: 'Mumbai', x: 871.5, y: 353.5, airport: true, la: 'start', lx: 16, ly: 5,
    links: [
      { pack: 'maailmankartta', city: 'mumbai', label: 'Koko maailma' },
    ],
  },
  {
    id: 'peking', name: 'Peking', x: 959.8, y: 286.6, airport: true, la: 'end', lx: -16, ly: 5,
    links: [
      { pack: 'maailmankartta', city: 'peking', label: 'Koko maailma' },
    ],
  },
  {
    id: 'sydney', name: 'Sydney', x: 1051.9, y: 527.7, airport: true, la: 'end', lx: -16, ly: -10,
    links: [
      { pack: 'maailmankartta', city: 'sydney', label: 'Koko maailma' },
    ],
  },
  {
    id: 'moskova', name: 'Moskova', x: 806.6, y: 248.6, airport: true, la: 'start', lx: 16, ly: 5,
    links: [
      { pack: 'maailmankartta', city: 'moskova', label: 'Koko maailma' },
    ],
  },
  {
    id: 'tokio', name: 'Tokio', x: 1029.6, y: 279.5, airport: true, la: 'start', lx: 18, ly: 5,
    links: [
      { pack: 'maailmankartta', city: 'tokio', label: 'Koko maailma' },
    ],
  },
  {
    id: 'singapore', name: 'Singapore', x: 948.4, y: 402.6, airport: true, la: 'start', lx: 18, ly: -12,
    links: [
      { pack: 'maailmankartta', city: 'singapore', label: 'Koko maailma' },
    ],
  },
  {
    id: 'kapkaupunki', name: 'Kapkaupunki', x: 750.3, y: 483, airport: true, la: 'end', lx: -18, ly: 10,
    links: [
      { pack: 'maailmankartta', city: 'kapkaupunki', label: 'Koko maailma' },
    ],
  },
  {
    id: 'losangeles', name: 'Los Angeles', x: 286.5, y: 322.3, airport: true, la: 'end', lx: -16, ly: 12,
    links: [
      { pack: 'maailmankartta', city: 'losangeles', label: 'Koko maailma' },
    ],
  },
  {
    id: 'ateena', name: 'Ateena', x: 757.8, y: 279.4, airport: true,
    // Nimi alapuolelle: Moskova on nyt Ateenasta koilliseen ja lähempänä
    // kuin lieriöprojektiossa.
    la: 'middle', lx: 0, ly: 26,
    // Etelä-Euroopan portti: Eurooppaan pääsee myös Välimeren suunnasta.
    links: [
      { pack: 'maailmankartta', city: 'ateena', label: 'Koko maailma' },
    ],
  },
  {
    // Afrikan luoteiskulma. Ilman tätä mantereella oli maailmankartalla vain
    // Kairo ja Kapkaupunki, eikä niiden välillä ollut laivareittiä lainkaan:
    // purjehtien piti kiertää Rion tai Sydneyn kautta. Tanger on Afrikan
    // laudan aloituskaupunki, joten portti vie sinne suoraan.
    id: 'tanger', name: 'Tanger', x: 679.8, y: 278.7, airport: true, la: 'end', lx: -16, ly: 10,
    links: [
      { pack: 'maailmankartta', city: 'tanger', label: 'Koko maailma' },
    ],
  },
];

// steps = kuinka monta silmälukua reitin kulkeminen vaatii.
// type 'sea' = valtamerireitti; via = reittipisteet veden päällä.
const WORLD_EDGES = [
  // Maareitit: Siperian rata ja Amerikan mannerrata.
  { a: 'moskova', b: 'peking', steps: 7, via: [[845, 258.9], [899, 270.9], [931.6, 279]] },
  { a: 'losangeles', b: 'newyork', steps: 5, via: [[313.3, 312.3], [339.5, 293.7]] },

  // Valtamerten laivareitit
  { a: 'lontoo', b: 'newyork', steps: 5, type: 'sea', via: [[443.9, 213.6], [412.1, 259]] },
  {
    a: 'lontoo', b: 'kairo', steps: 5, type: 'sea',
    via: [[713.6, 223.7], [689.3, 236.4], [673.2, 260.6], [679.6, 266.2], [686.5, 270.5], [699.3, 272.3], [713.2, 275], [735.1, 280.9], [746.2, 296.8], [769.2, 308]],
  },
  // Itämeren reitti: yksi välipiste siirretty muutaman yksikön verran
  // vedelle, koska pallonpuoliskoprojektio kaarsi rannikon sen yli.
  { a: 'lontoo', b: 'moskova', steps: 4, type: 'sea', via: [[742.9, 222.3], [764.1, 225], [776.2, 233], [790.4, 231.6]] },
  { a: 'newyork', b: 'rio', steps: 5, type: 'sea', via: [[377.7, 304.6], [424.8, 340.2], [461.6, 383.5], [517, 399.8], [502.2, 458.5]] },
  {
    a: 'kairo', b: 'mumbai', steps: 5, type: 'sea',
    via: [[781.6, 331.9], [790.4, 356.7], [795.9, 367.9], [809, 368.9], [828.9, 365.2], [857.5, 359.6]],
  },
  {
    a: 'mumbai', b: 'peking', steps: 6, type: 'sea',
    via: [[876, 388.2], [930.9, 393.2], [941.9, 400.2], [959.5, 368], [972.5, 339.9], [985.2, 304.7], [981.3, 292.4]],
  },
  { a: 'peking', b: 'sydney', steps: 6, type: 'sea', via: [[1007.7, 321.5], [1049, 364.9], [1078.7, 431.4], [1094.6, 475.9], [1086.8, 513.3]] },
  { a: 'peking', b: 'tokio', steps: 2, type: 'sea', via: [[992, 307], [1016.5, 309.3]] },
  { a: 'ateena', b: 'kairo', steps: 2, type: 'sea', via: [[764.6, 304.6]] },
  { a: 'mumbai', b: 'singapore', steps: 4, type: 'sea', via: [[876, 388.2], [911.4, 398.9]] },
  { a: 'singapore', b: 'sydney', steps: 5, type: 'sea', via: [[1011, 400.9], [1048.7, 426.1], [1090.1, 475.9], [1087.7, 514.9]] },
  { a: 'kapkaupunki', b: 'rio', steps: 6, type: 'sea', via: [[714.5, 548.8], [488.5, 554.1]] },
  { a: 'kapkaupunki', b: 'sydney', steps: 7, type: 'sea', via: [[799.7, 508.2], [852, 515.8], [908.4, 515.6], [961.7, 525.7], [1009, 551.7]] },
  {
    a: 'mumbai', b: 'sydney', steps: 6, type: 'sea',
    via: [[876, 388.2], [900.5, 426.6], [929.8, 471.7], [956.6, 506.2], [1003.6, 531.1], [1040.7, 542.8]],
  },
  // Atlantin itäranta: Lontoo - Tanger - Kapkaupunki. Tätä reittiä Afrikan
  // ympäri purjehdittiin ennen Suezin kanavaa, ja ilman sitä mantereen
  // kahden kaupungin välillä ei ollut laivayhteyttä lainkaan.
  {
    a: 'lontoo', b: 'tanger', steps: 3, type: 'sea',
    via: [[705, 226.4], [681.8, 239], [670.5, 260.5]],
  },
  {
    a: 'tanger', b: 'kapkaupunki', steps: 7, type: 'sea',
    via: [[634, 290], [617, 305], [610, 320], [604, 335], [610, 350], [616, 365], [627, 382], [640, 398], [668, 404], [692, 408], [696, 425], [706, 455], [724, 485]],
  },
];

// Mannertenväliset lennot.
const WORLD_AIR_ROUTES = [
  { a: 'lontoo', b: 'newyork' },
  { a: 'lontoo', b: 'kairo' },
  { a: 'kairo', b: 'mumbai' },
  { a: 'mumbai', b: 'peking' },
  { a: 'peking', b: 'sydney' },
  { a: 'newyork', b: 'sydney' },
  { a: 'newyork', b: 'rio' },
  { a: 'lontoo', b: 'moskova' },
  { a: 'moskova', b: 'peking' },
  { a: 'peking', b: 'tokio' },
  { a: 'tokio', b: 'sydney' },
  { a: 'tokio', b: 'losangeles' },
  { a: 'newyork', b: 'losangeles' },
  { a: 'mumbai', b: 'singapore' },
  { a: 'singapore', b: 'sydney' },
  { a: 'kairo', b: 'kapkaupunki' },
  { a: 'lontoo', b: 'ateena' },
  { a: 'ateena', b: 'moskova' },
  { a: 'rio', b: 'kapkaupunki' },
  { a: 'tanger', b: 'newyork' },
  { a: 'tanger', b: 'kapkaupunki' },
];

export const MAAILMA = {
  id: 'maailma',
  name: 'Magellanin kompassi',
  boardLabel: 'Maailma',
  tagline: 'Kierrä maapallo: valtameret, mantereet ja suuret kaupungit.',
  ariaLabel: 'Maailman aarrekartta',

  map: {
    ...WORLD_MAP,
    outlines: [
      WORLD_MAP.americasPoints, WORLD_MAP.afroeurasiaPoints,
      WORLD_MAP.britainPoints, WORLD_MAP.australiaPoints,
      WORLD_MAP.greenlandPoints, WORLD_MAP.madagascarPoints, WORLD_MAP.japanPoints,
      WORLD_MAP.indonesiaPoints, WORLD_MAP.nzNorthPoints, WORLD_MAP.nzSouthPoints, WORLD_MAP.antarcticaPoints,
    ],
    // Kehys sulkee sisäänsä molemmat pallonpuoliskot ja napaympyrät.
    // Suhde on noin 1,45:1 — selvästi lähempänä ruudun muotoa kuin vanha
    // lieriöprojektion 1,87:1, joten pystyasennossa kartta on isompi.
    frame: { x: 6, y: 0, w: 1138, h: 800 },
  },
  cities: WORLD_CITIES,
  edges: WORLD_EDGES,
  airRoutes: WORLD_AIR_ROUTES,
  // Tokio ja Singapore ovat koristesaarilla.
  islands: ['tokio', 'singapore'],
  // Oikeassa mittakaavassa Välimeren rannat ovat aidosti lähekkäin:
  // Ateena ja Kairo mahtuvat molemmat, kun raja on tavallista pienempi.
  minCityDistance: 45,

  tokens: {
    types: themedTokenTypes({ star: { name: 'Magellanin kompassi' } }),
    // 12 aarrekaupunkia: laattoja on oltava täsmälleen yhtä monta.
    counts: { star: 1, horseshoe: 2, robber: 1, ruby: 1, emerald: 3, topaz: 4, empty: 2 },
  },

  questions: MAAILMA_QUESTIONS,
  placeFacts: MAAILMA_FACTS,

  // Sijainti maailmankartalla ja rosvon kaksintaistelukysymykset.
  duels: [
    {
      q: 'Mikä näistä maista on väkiluvultaan suurin?',
      options: ['Indonesia', 'Brasilia', 'Nigeria', 'Venäjä', 'Japani', 'Meksiko', 'Saksa', 'Egypti'],
      correct: 0,
      fact: 'Indonesiassa on lähes 300 miljoonaa asukasta — maailman neljänneksi eniten.',
    },
    {
      q: 'Mikä on maailman pienin itsenäinen valtio?',
      options: ['Vatikaani', 'Monaco', 'Malta', 'San Marino', 'Liechtenstein', 'Andorra', 'Luxemburg', 'Nauru'],
      correct: 0,
      fact: 'Vatikaani on alle puolen neliökilometrin kokoinen — sen ympäri kävelee tunnissa.',
    },
    {
      q: 'Missä on maailman syvin tunnettu kohta?',
      options: ['Mariaanien haudassa', 'Kuolleessameressä', 'Baikaljärvessä', 'Grand Canyonissa', 'Tongan haudassa', 'Jaavan haudassa', 'Atlantin keskiselänteellä', 'Mustassameressä'],
      correct: 0,
      fact: 'Mariaanien hauta Tyynellämerellä ulottuu lähes 11 kilometrin syvyyteen.',
    },
    {
      q: 'Kuinka pitkä on päiväntasaajan ympärysmitta?',
      options: ['noin 40 000 km', 'noin 4 000 km', 'noin 10 000 km', 'noin 20 000 km', 'noin 60 000 km', 'noin 100 000 km', 'noin 400 000 km', 'noin miljoona km'],
      correct: 0,
      fact: 'Metri määriteltiin alun perin niin, että napojen kautta kulkeva ympärysmitta on 40 miljoonaa metriä.',
    },
    {
      q: 'Mikä on maailman korkeimmalla sijaitseva pääkaupunki?',
      options: ['La Paz', 'Quito', 'Bogotá', 'Kathmandu', 'Addis Abeba', 'Mexico City', 'Nairobi', 'Ulan Bator'],
      correct: 0,
      fact: 'Bolivian hallitus istuu La Pazissa noin 3 600 metrin korkeudessa; naapurikaupunki El Alto ja sen lentokenttä ovat vielä ylempänä.',
    },
    {
      q: 'Kuinka monta kieltä maailmassa arvioidaan puhuttavan?',
      options: ['noin 7 000', 'noin 200', 'noin 700', 'noin 1 500', 'noin 25 000', 'noin 70', 'noin 300', 'noin 70 000'],
      correct: 0,
      fact: 'Kieliä lasketaan olevan noin seitsemäntuhatta, ja arviolta puolet niistä on uhanalaisia — moni jää ilman uusia puhujia.',
    },
    {
      q: 'Mikä raja kulkee Tyynenmeren poikki niin, että sen ylittäessä vaihtuu päivä?',
      options: ['kansainvälinen päivämääräraja', 'nollameridiaani', 'päiväntasaaja', 'Kauriin kääntöpiiri', 'Kravun kääntöpiiri', 'pohjoinen napapiiri', 'eteläinen napapiiri', 'keskipäivän linja'],
      correct: 0,
      fact: 'Päivämäärärajan länsipuolella on aina eri vuorokausi kuin itäpuolella — raja mutkittelee saarivaltioiden ympäri.',
    },
  ],

  texts: {
    // Lentorepliikit: nuori herra puhuu koneessa matkan ajan. Noin puolet
    // riveistä on kohteen odotusta, puolet isoisän päiväkirjan hehkutusta —
    // kirjarivit saavat viitata pelin oikeisiin asioihin (merkityt kaupungit,
    // luonnoskirjan kaaviot, taitetut sivut) muttei paljastaa mitään.
    flightLines: {
      lontoo: [
        'Thames mutkittelee alla, sillat tulevat vastaan tutussa järjestyksessä — ja silti sydän hakkaa kuin vieraassa maassa. Kotiin siis, hetkeksi.',
        'Pilvien alta paljastuu harmaa ruutupelto ja sen keskellä kaupunki, joka ei tiedä minun olleen poissa. Minä tiedän, ja se tunne on parempi kuin osasin odottaa.',
        'Päiväkirjan ensimmäisellä sivulla lukee kotikaupunkini nimi ja päiväys, ja muste on painunut läpi kolmelle sivulle. Noin lujaa hän painoi kynää lähtiessään!',
      ],
      newyork: [
        'Kaartaessa nousee näkyviin saari, jolle on ladottu kaupunki pystysuoraan: tornit alkavat vedestä! Turvavyö jäi kiinnittämättä, koska en saanut katsettani irti.',
        'Kirjaan on liimattu laivayhtiön kuitti taitettuna neljään. Isoisä ylitti saman meren reilussa viikossa ja piti sitä huimana — minä ehdin päivälliselle, ja huimaa yhä.',
        'Kirjan välistä putosi liuska, jonka ainoa rivi kuuluu: "lännessä, kolme korttelia satamasta". En tiedä mistä satamasta on kyse, ja juuri se saa minut hykertelemään.',
      ],
      kairo: [
        'Ikkunasta näkyy, miten vihreä nauha halkoo hiekkaa ja levenee lopussa kolmioksi. Koko maa mahtuu tuohon nauhaan; koko maa, yhdellä silmäyksellä.',
        'Pyramidit erottuvat kaupungin laidalla jo ennen laskusiivekkeitä — siinä ne ovat! Kolme kolmiota, ja niiden ympärillä katuja ja pysäköintialue.',
        'Aukeamalla on rivi tikkuja ja kaaria ja viereen kirjattuja numeroita. Isoisä siis mittasi jotakin aivan itse, ja olen hänestä typerän ylpeä.',
      ],
      rio: [
        'Alla kaartuu lahti, jonka reunoilta vuoret nousevat suoraan merestä, ja kiitorata on rakennettu vedelle. Puristan käsinojaa, mutta katsetta en käännä.',
        'Päiväkirjan reunaan on piirretty vuori, leveä alhaalta ja pyöreä ylhäältä. Isoisä piirsi sen kuulemansa mukaan näkemättä sitä itse — kohta se on tuossa, oikeana.',
        'Tässä kohtaa kirjaa muste vaihtuu ruskeasta mustaan: isoisä osti uuden pullon jossakin, minne hän ei merkinnyt saapuneensa. Missä ihmeessä se oli?',
      ],
      mumbai: [
        'Rannikko avautuu kaarena, ja kaupunki työntyy merelle kapeana kielekkeenä. Lahden yli kaartaa silta valkoisena vinoköysinauhana, ja unohdan hengittää.',
        'Lännessä seisoo monsuunipilvi kuin seinä, ja kone kiertää sen alitse. Alla vilkkuu kattoja niin tiheässä, etten erota katuja lainkaan — en yhtäkään katua!',
        'Kirjan välissä on kuivunut lehti ja sen alla rivi: "sade tulee kesäkuussa, laivat sen jälkeen". Isoisä oli kerrankin aikataulussa, ja siitä nostan hänelle hattua.',
      ],
      peking: [
        'Kuiva ylätasanko vaihtuu alla vihreiksi kukkuloiksi, joiden harjaa pitkin kulkee muuri. Sitten kaupunki alkaa kuin viivalla vedettynä; tuoltako se ylhäältä näyttää.',
        'Isoisä on merkinnyt tämän kohdan kahdella ristillä, vaikka muualla riittää yksi. Täällä oli siis jotain, mikä jäi häneltä näkemättä — ja minä näen sen.',
        'Isoisän käsiala pienenee tällä sivulla, kuin hän olisi kirjoittanut salaa. Neljä sanaa vain: "muurin eteläpuolella, portin takana", ja luen ne jo kolmatta kertaa.',
      ],
      sydney: [
        'Kone tulee sisään mereltä, ja alla satama levittäytyy sormina moneen suuntaan. Silta ja oopperatalo ovat pienet kuin koristeet, ja osoittelen niitä kuin viisivuotias.',
        'Rannikkoa reunustaa valkoinen hiekka lahti lahdelta, ja aallokossa näkyy mustia pisteitä: surffaajia rivissä odottamassa aaltoa. Tuonne minä menen heti huomenna.',
        'Selasin kirjaa laskun ajan ja löysin sivun, jolle luonnonsatama on luonnosteltu muistista. Vertaan sitä maisemaan: rannat täsmäävät, vaikkei hän noussut maihin.',
      ],
      moskova: [
        'Metsää riittää allamme tunti tunnin perään, ja kun jo luovutan, se aukeaa: tiet lähtevät kaupungista joka suuntaan kuin pyörän puolat.',
        'Päiväkirjassa on tässä välissä aukko: kaksi viikkoa ilman ainuttakaan merkintää, ja sitten yksi rivi. Mitä väliin jäi — sen aion vielä saada selville.',
        'Sivujen lomaan on jäänyt junanlipun palanen, ja sen taakse on raapustettu kilometrimäärä. Isoisä laski sen käsin ja sai oikein; tarkistin puhelimella ja nauroin ääneen.',
      ],
      tokio: [
        'Selkeällä säällä lounaassa kohoaa yksinäinen lumihuippuinen kartio, eikä se ole postikortissa vaan tuossa. Alla kaupunki jatkuu horisonttiin asti, reunaa ei näy.',
        'Laskukaarre ylittää veden, ja rannikko on suoristettu: telakoita, nostureita, säiliöitä peräkkäin. Kenttä itse lepää täyttömaalla, mikä hiljentää minut.',
        'Kirjan viimeisillä sivuilla on tyhjä ruutu ja sen yläpuolella tämän kaupungin nimi. Isoisä varasi paikan piirrokselle, jota ei koskaan tehnyt; minäpä täytän sen tänään.',
      ],
      singapore: [
        'Alla on merta täynnä laivoja, jotka seisovat paikallaan riveissä ja odottavat vuoroaan satamaan. Aloin laskea, luovutin kahdenkymmenen kohdalla ja aloitin alusta.',
        'Päiväkirjaan on vedetty kapea salmi ja sen reunaan nuoli, jonka päässä ei lue mitään. Se on isoisän tapa sanoa "en käynyt", ja nyt käyn minä.',
        'Kirjan sivut aaltoilevat kuin olisivat joskus kastuneet ja kuivuneet uudelleen. Teksti on yhä luettavissa, ja se kertoo säästä!',
      ],
      kapkaupunki: [
        'Vuori näkyy ennen kaupunkia: laki on suora kuin pöytä, ja sen yli valuu pilvi reunan ali. Kaupunki on kiilattu vuoren ja meren väliin, ja istun suu auki.',
        'Kylmä Benguelan virtaus lännessä, lämmin Agulhas idässä — sama vesi, kaksi lämpötilaa! Valtamerten rajaa tähyän turhaan: se on vasta kaukana kaakossa.',
        'Sivun keskellä on kolme pistettä ja alapuolella lyhyitä viivoja, kuin merkintöjä äänistä. Isoisä yritti kirjata muistiin ääntä — mikä ääni sen ansaitsi?',
      ],
      losangeles: [
        'Ruudukko alkaa alla eikä lopu kuin mereen, ja moottoritiet piirtyvät siihen leveinä vaaleina nauhoina. Illalla sama ruudukko palaa valoina, ja sitä varten valvon.',
        'Isoisän kartassa on tällä seudulla appelsiinitarhoja ja erään pikkukaupungin nimi; koko kertomuksen hän kuittaa liioitteluksi. Pian selviää, kumpi meistä liioitteli.',
        'Kirjan takakannen sisäpuolella on lista kaupungeista, ja osa niistä on rengastettu lyijykynällä. En ole nähnyt vielä puoltakaan, mutta lista lyhenee rivi riviltä.',
      ],
      ateena: [
        'Saaria näkyy kymmenittäin, valkoisia reunoja sinisessä. Kukkulalla on suorakaide, joka on seissyt siinä yli kaksi vuosituhatta — ja se vilahtaa nyt siivenkärjen alta.',
        'Egeanmeren yli tullaan matalalla, ja ruskeat rinteet nousevat heti vesirajasta ilman rantatasankoa. Vihreää vain laaksojen pohjilla, ja sitäkin tuijotan pitkään.',
        'Päiväkirjassa lukee tämän kohdalla vain: "satamaan tuli lastia, laiva lähti". Rivin alle on myöhemmin lisätty yksi sana: "harmittaa", enkä aio kirjoittaa samaa.',
      ],
      tanger: [
        'Salmi on alla kapea kuin joki: toisella rannalla Eurooppa, toisella Afrikka, ja väliä nelisentoista kilometriä. Ylitämme sen minuutissa, tuskin ehdin kääntää päätäni.',
        'Tämä sivu on kirjoitettu laivan kannella: käsiala kallistuu oikealle koko sivun ajan. Aallokko näkyy musteessa paremmin kuin sanoissa, melkein kuulen sen.',
        'Kirjasta löytyi kartanpala, joka on leikattu saksilla irti isommasta, ja sen reuna sopii yhteen erään toisen sivun repeämän kanssa. Täsmälleen yhteen.',
      ],
    },

    // Yleisrivit: käytetään kun kohteelle ei ole omaa riviä.
    flightDefault: [
      'Suljen kartan ja työnnän sen penkin taskuun: vuoden 1872 piirros on täällä hyödytön. Ulkopuolella on kaikki se, mikä siitä puuttuu.',
      'Pilvet repeävät auki, ja maa paljastuu ilman varoitusta. Alhaalla odottavasta en tiedä yhtään mitään — tietämättömyys on tämän matkan paras osa.',
      'Moottorit vaihtavat ääntä ja nokka kääntyy alas. Kaksi tuntia sitten olin toisessa ilmastossa, ja tässä minä nyt kiskon takkia yltäni kesken laskun.',
      'Alla on yhden kaarroksen jälkeen aivan toisenlainen maa kuin äsken. Tämän takia minä lähdin: en aarteen vuoksi vaan tämän hetken vuoksi.',
      'Varjomme juoksee alla maastossa ja hyppii harjanteiden yli. Kilpailen sitä vastaan ikkunan takaa ja häviän joka kerta, riemastuttavan varmasti.',
      'Kynä on lipsahtanut ja vetänyt pitkän viivan poikki tekstin; alle on kirjoitettu "juna liikkui". Isoisä kirjoitti liikkeessä, ja liikkeessä luen minäkin.',
      'Vaa\'an kuva, ja sen perässä kolme huutomerkkiä — kolme! Isoisä ei huuda koskaan, joten minun on nähtävä tämä omin silmin.',
      'Taitetulla sivulla lukee vain: "etelään, ja kysy kalastajilta". Käänsin sen esiin vahingossa, enkä nyt saa sitä pois mielestäni.',
      'Kuun vaiheita on piirretty riviin ja yksi niistä ympyröity, ilman sanaakaan selitystä. Toivon, ettei selitystä tulekaan ennen kuin arvaan sen itse.',
      'Muste on tällä aukeamalla vaaleampaa, kuin kirjoitettuna kiireessä. Sytytin lukuvalon vaikka ulkona paistaa: kiireessä kirjoitettu sivu on aina se kiinnostavin.',
    ],
    // Unohdettu aarre löytämättä: osa lennoista muistuttaa, että jonnekin
    // kannattaa vielä palata. Ei koskaan kerro minne — se on etsintää.
    // Erisnimi "Aarnin luettelo" on tarinan aarrekokoelma (docs/tarina.md).
    flightRegret: [
      'Unohdettu aarre jäi vielä löytymättä. Kirjoitan sivun kulmaan: palattava vielä — aarre ei etsi itse itseään.',
      'Selaan merkintöjä ja harmittelen: unohdettu aarre on yhä jossain takanapäin. Ei se katoa minnekään — mutta ei se löydykään ilman minua.',
      'Isoisä olisi jo löytänyt unohdetun aarteen, väittäisin. Minä säästän sen löytämisen ilon vielä hetkeksi.',
      'Piirrän karttaan pienen rastin muistutukseksi: Aarnin luettelossa on yhä rivi vailla rastia. Tämä lento ei ole luovutus vaan kierros.',
      'Aarnin luettelo lupaa jokaiselle maanosalle aarteensa. Yksi odottaa vielä minua — eikä unohdettu aarre löydy kuin palaamalla.',
    ],
    // Ensimmäinen lento: matka alkaa, ja repliikki hehkuttaa aina
    // matkakirjaa — se on koko pelin lähtölaukaus.
    // Avauslennon repliikki on lukittu yhteen riviin, koska sille on
    // tuotettu lukuääni (assets/audio/puhe-lento-alku.mp3) — teksti ja
    // puhe pysyvät aina samana. Rivi jatkaa avaustekstin revittyä sivua.
    // Uusittu 10.8.2026 omistajan hyväksynnällä (hengästynyt alku,
    // enemmän imua); luenta v3-tunnetagein tools/generoi-avaus.mjs:llä
    // — teksti muutetaan vain sen kautta, jotta ruutu ja puhe pysyvät
    // samana.
    flightFirst: [
      'Kone nousee, ja isoisän kirja aukeaa sylissäni kuin se olisi odottanut tätä hetkeä. Revitty sivu ei kerro, mitä hän löysi — joten menen katsomaan itse.',
    ],
    intro: 'Peli alkaa! Etsikää Magellanin kompassi — maailmanympäripurjehtijan kadonnut aarre.',
    starFound: (name, city) => `◈ ${name} löysi MAGELLANIN KOMPASSIN kaupungista ${city}!`,
    starToast: 'MAGELLANIN KOMPASSI!',
    starChase: 'Nyt on kiire kotiin — myös hevosenkengän haltija voi voittaa pelin.',
    winStar: 'toi Magellanin kompassin turvallisesti kotiin',
    winnerStar: (name, money) => `${name} toi Magellanin kompassin kotiin ${money} punnan kanssa.`,
    // Saapumismerkinnät: yksi arvotaan laudalle saavuttaessa.
    diaries: [
      'Isoisä kiersi tämän pallon kahdeksassakymmenessä päivässä ja piti sitä saavutuksena. Nykyään sen tekee vuorokaudessa kuka tahansa, jolla on varaa lippuun. Minä aion käyttää aikaa — katsoakseni, mitä hän ei ehtinyt nähdä.',
      'Isoisän kartassa kolmannes maailmasta on väritetty samalla punaisella. Nykyisessä kartassa siinä tilassa on yli viisikymmentä itsenäistä valtiota, joilla kaikilla on oma lippu ja oma mielipide meistä. Päätin olla ottamatta asiaa puheeksi ensimmäisenä iltana.',
      '"Matkalla tarvitaan kolme asiaa: kello, kartta ja kärsivällisyyttä", isoisä kirjoitti. Minulla on puhelin, joka on kaikki kolme, ja silti eksyn lentokentällä. Hänen listassaan taisi olla neljäs kohta, jota en osaa lukea.',
      'Isoisä laski matkansa hinnaksi kaksituhatta puntaa ja piti sitä ruhtinaallisena. Sama summa riittää nykyään yhteen lentolippuun ja kohtuulliseen aamiaiseen. Rahassa mitattuna maailma on kutistunut; kaikessa muussa se on kasvanut.',
      'Ensimmäisellä sivulla lukee: "Lähden selvittämään, onko maailma niin suuri kuin sanotaan." Viimeisellä sivulla lukee: "On." Väliin mahtuu kaksisataa sivua, joista aion tarkistaa jokaisen.',
    ],
  },

  decor: {
    // Koristeet asettuvat ympyröiden ulkopuolelle kuten vanhoissa kartoissa:
    // nimi vasempaan alakulmaan, kompassi oikeaan, laiva ja merikäärme
    // ympyröiden väliin jäävään tyhjään.
    mapLabel: 'MAAILMA',
    mapLabelPos: { x: 150, y: 742 },
    compass: { x: 1046, y: 726, r: 58 },
    waveSkip: [
      { x: 150, y: 742, r: 150 },
      { x: 1046, y: 726, r: 100 },
      { x: 168, y: 150, r: 95 },
      { x: 980, y: 158, r: 115 },
    ],
    // Laiva ja merikäärme ympyröiden ulkopuolelle kartan kulmiin, kuten
    // vanhoissa kartoissa: napaympyröiden sisään ne jäisivät piiloon.
    ship: { x: 168, y: 150 },
    serpent: { x: 980, y: 158 },
    // Nopan lepopaikka: vasen alakulma ympyröiden ulkopuolella.
    dieSpot: { x: 0.06, y: 0.9 },
    // Pohjoisessa vuoria ja tuntureita, keskivyöhykkeellä metsää,
    // tropiikissa aavikoita ja etelässä taas metsää.
    // Vyöhykkeet seuraavat nyt ympyröiden pystysuuntaa: keskellä on
    // päiväntasaaja (y 400), ylhäällä ja alhaalla navat.
    terrainBands: [
      { maxY: 300, kind: 'mountains' },
      { maxY: 360, kind: 'trees' },
      { maxY: 445, kind: 'dunes' },
      { maxY: 520, kind: 'trees' },
      { maxY: Infinity, kind: 'mountains' },
    ],
  },
};
