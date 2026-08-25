// Oseania-lauta: kaupungit, reitit, kartan piirtotiedot ja teema.
//
// Koordinaatisto on 1000 x 1000 yksikköä.
//
// Kartta on Lambertin konformisessa kartioprojektiossa, standardileveys-
// piireinä 10° ja 40° etelää ja keskimeridiaanina 145° itäistä pituutta.
// Lähdeaineisto on tools/mapdata/oceania.json ja koordinaatit lasketaan
// komennolla `node tools/project.mjs oceania`.
//
// Manner on Australia. Uusi-Guinea, Tasmania, Uuden-Seelannin kaksi saarta,
// Timor, Bali, Salomonsaaret, Vanuatu, Uusi-Kaledonia, Norfolk ja Fidži ovat
// omia saariaan, joihin pääsee vain laivalla — tällä laudalla laivamatkoja on
// enemmän kuin millään muulla.

import { OCEANIA_QUESTIONS, OCEANIA_FACTS } from './oceania-questions.js';
import { OCEANIA_COUNTRY_SHAPES, OCEANIA_CITY_COUNTRY } from './oceania-countries.js';
import { themedTokenTypes } from '../tokens.js';

const OC_MAP = {
  width: 1000,
  height: 1000,
  australiaPoints: [
    [453.4, 288.7], [496.3, 353.4], [510.6, 410.1], [548.8, 436.8], [574.3, 471.1],
    [602, 524.1], [606.5, 559.2], [588.1, 626.6], [564.7, 662.2], [528.6, 699.6],
    [507.6, 719.5], [486.9, 711.7], [473.6, 718], [450.4, 712.2], [427.8, 697.4],
    [416.8, 670], [401.5, 666.2], [395.8, 631.2], [378.6, 661.4], [351.1, 634.3],
    [324.1, 621.4], [285, 621], [247.8, 635.2], [220.1, 665.6], [176.3, 673.3],
    [148.6, 696], [116.4, 690.4], [107.1, 655], [70.3, 573.2], [55.3, 522.3],
    [92.6, 482.8], [148.7, 457.7], [162.7, 429], [178.8, 401.5], [217.3, 358.5],
    [262, 366.7], [274.3, 328.1], [303.8, 318.9], [346.3, 316.9], [368.8, 312.3],
    [357.1, 342.6], [374, 373.8], [410.4, 398], [441.7, 371], [440.5, 321.7],
  ],
  tasmaniaPoints: [
    [488.2, 747.6], [497.7, 749.2], [509.6, 752.4], [521.6, 749.5], [531, 751.2],
    [530.7, 767], [526.9, 778], [525.5, 787.5], [514.9, 793.7], [506.9, 792],
    [497.6, 784], [491.8, 771.3], [487.1, 758.6],
  ],
  newGuineaPoints: [
    [259.5, 145.2], [276.8, 135.1], [302.2, 141.1], [320, 156.2], [335.6, 145.1],
    [360.6, 150.1], [393.9, 159.8], [426.6, 161.8], [459.4, 172.5], [483.7, 180.4],
    [504.6, 196.6], [522.1, 208], [539.6, 208.3], [563.5, 209], [585.4, 221],
    [575.1, 239.7], [554.4, 246.9], [532.2, 262.1], [515, 271.3], [491.8, 264.9],
    [468.4, 254], [444.9, 251.2], [421.5, 253.5], [390.3, 254.7], [365.8, 237],
    [340.3, 211.5], [317.9, 192.2], [297.7, 182.6], [282.2, 190.6], [265.6, 187.3],
    [263.7, 169.5], [245.8, 156.6],
  ],
  nzNorthPoints: [
    [839.6, 686], [846.3, 696.8], [856.7, 702.3], [858.8, 721.7], [867.6, 722.1],
    [873.6, 734.6], [883.4, 746.5], [898.9, 750.4], [892.7, 764.8], [885.3, 774.2],
    [870.2, 785], [858.7, 787.1], [846.6, 797.2], [840.9, 800.8], [840.7, 791],
    [848.1, 779.8], [845.8, 768.1], [844.7, 756.6], [853.3, 745.8], [853.7, 733.2],
    [846.3, 720.5], [839.2, 706.3], [840.5, 694],
  ],
  nzSouthPoints: [
    [820.2, 778.5], [827.4, 784.9], [833.7, 789.5], [835.1, 799.5], [828, 804.4],
    [819.1, 812.2], [811.9, 823.7], [800.9, 831.2], [790, 838.8], [781.9, 850.4],
    [774.8, 857.3], [764.5, 863.6], [752.9, 864.9], [742.6, 858.1], [735.9, 850.4],
    [735.2, 840.5], [742.7, 830.2], [755.9, 821.1], [772.1, 815.9], [787.3, 810.6],
    [800.9, 801.9], [808.9, 792.3], [814.3, 783.7],
  ],
  timorPoints: [
    [159, 288.5], [171.9, 280.1], [183.5, 273.5], [199.2, 272.8], [216.2, 270.5],
    [212.6, 278.9], [197.9, 285.8], [183.2, 292.7], [167.9, 295], [160, 294.7],
  ],
  baliPoints: [
    [18, 302.6], [27.6, 298.8], [37.2, 299], [37.1, 305.5], [31.9, 310.7],
    [22.4, 311.3], [18.1, 306.6],
  ],
  solomonPoints: [
    [673.6, 231.5], [688.3, 244], [710.7, 257.4], [729.8, 269], [746.8, 283.7],
    [758.3, 304.1], [744.5, 302.4], [730.6, 289.7], [713.1, 278.3], [694.3, 263.7],
    [678.5, 247.9], [665.3, 235.6],
  ],
  vanuatuPoints: [
    [810.4, 376], [819.4, 385.3], [827.3, 400.6], [832.2, 415.4], [837.5, 435],
    [842.7, 446.8], [833.3, 442], [827.2, 427], [820.2, 407.2], [814, 390.6],
    [806.7, 380.1],
  ],
  newCaledoniaPoints: [
    [761, 448.8], [772.4, 459.7], [782, 471.9], [792.9, 484.4], [801.3, 493.5],
    [796.2, 498.7], [785.2, 487.8], [775.5, 477.1], [764.7, 463.2], [756.1, 452.8],
  ],
  norfolkPoints: [
    [794.1, 593.1], [795.5, 593.2], [796, 594.4], [794.8, 595.1], [793.7, 594.3],
  ],
  fijiPoints: [
    [956.6, 447.9], [969.4, 444.7], [979.7, 445.8], [982, 454.3], [974.1, 461.7],
    [964.9, 462.5], [957.2, 457.4], [952.6, 451.6],
  ],
};

/*
 * start = aloituskaupunki (ei laattaa), airport = lentokenttä.
 *
 * wiki = suomenkielisen Wikipedia-artikkelin otsikko (js/wiki.js kokeilee
 * fi ensin, en varalla). Otsikot on tarkistettu rajapinnasta. Perth ja
 * Darwin ovat suomeksi täsmennyssivuja, joten ne tarvitsevat tarkenteen.
 * Kolmella pikkupaikalla — Birdsville, Coober Pedy ja Exmouth — ei ole
 * suomenkielistä artikkelia lainkaan, joten otsikko on englanninkielinen
 * kuten africa.js:n 'Cape Palmas'.
 *
 * ambience = äänimaisema; sanasto on sama kuin muilla laudoilla.
 * Ei-ilmeiset valinnat:
 *
 *  - Sisämaan Australia on 'aavikko' myös silloin kun paikka on
 *    kaivoskaupunki (Kalgoorlie, Mount Isa, Coober Pedy) tai puuton
 *    tasanko (Nullarbor). Autiomaan tuuli on niissä sama ääni.
 *  - Rannikon paikat jakautuvat kahtia: satamakaupungit ovat 'satama'
 *    (Cairns, Darwin, Broome, Townsville, Hobart, Geraldton, Auckland,
 *    Suva, Honiara, Port Vila, Nouméa, Port Moresby, Dili), kun taas
 *    Exmouth ja Norfolk ovat 'meri' — riuttaa ja jyrkkää rantaa,
 *    ei laituria.
 *  - Milford Sound on 'vuoristo' eikä 'meri': vuono on kapea ja
 *    seinämät nousevat pystyyn, joten paikka kuulostaa vuorelta.
 *  - Sepik on 'sademetsa' (joki viidakon läpi) ja Bali samoin, kuten
 *    Sumatra ja Borneo asia.js:ssä.
 */
const OC_CITIES = [
  {
    id: 'sydney', name: 'Sydney', wiki: 'Sydney', ambience: 'kaupunki', x: 568, y: 639, start: true, airport: true,
    la: 'start', lx: 18, ly: 5,
    // Sama kaupunki on myös Maailma-laudalla.
  },
  {
    id: 'perth', name: 'Perth', wiki: 'Perth (Länsi-Australia)', ambience: 'kaupunki', x: 123, y: 650, start: true, airport: true,
    la: 'end', lx: -16, ly: 5,
  },

  { id: 'melbourne', name: 'Melbourne', wiki: 'Melbourne', ambience: 'kaupunki', x: 492, y: 696, airport: true, la: 'end', lx: -16, ly: 5 },
  { id: 'brisbane', name: 'Brisbane', wiki: 'Brisbane', ambience: 'kaupunki', x: 594, y: 546, airport: true, la: 'start', lx: 16, ly: 5 },
  { id: 'cairns', name: 'Cairns', wiki: 'Cairns', ambience: 'satama', x: 501, y: 384, airport: true, la: 'start', lx: 16, ly: 5 },
  { id: 'darwin', name: 'Darwin', wiki: 'Darwin (Australia)', ambience: 'satama', x: 279, y: 329, airport: true, la: 'end', lx: -16, ly: 5 },
  { id: 'adelaide', name: 'Adelaide', wiki: 'Adelaide', ambience: 'kaupunki', x: 411, y: 655, airport: true, la: 'end', lx: -16, ly: 16 },
  { id: 'alicesprings', name: 'Alice Springs', wiki: 'Alice Springs', ambience: 'aavikko', x: 338, y: 494, la: 'start', lx: 16, ly: 5 },
  { id: 'uluru', name: 'Uluru', wiki: 'Uluru', ambience: 'aavikko', x: 288, y: 528, la: 'end', lx: -16, ly: 5 },
  { id: 'broome', name: 'Broome', wiki: 'Broome', ambience: 'satama', x: 165, y: 427, la: 'start', lx: 16, ly: 5 },
  { id: 'kalgoorlie', name: 'Kalgoorlie', wiki: 'Kalgoorlie', ambience: 'aavikko', x: 186, y: 620, la: 'middle', lx: 0, ly: -22 },
  { id: 'townsville', name: 'Townsville', wiki: 'Townsville', ambience: 'satama', x: 526, y: 439, la: 'start', lx: 16, ly: 5 },
  { id: 'hobart', name: 'Hobart', wiki: 'Hobart', ambience: 'satama', x: 518, y: 778, la: 'start', lx: 16, ly: 5 },
  { id: 'nullarbor', name: 'Nullarbor', wiki: 'Nullarborin tasanko', ambience: 'aavikko', x: 297, y: 615, la: 'middle', lx: 0, ly: 28 },
  { id: 'birdsville', name: 'Birdsville', wiki: 'Birdsville', ambience: 'aavikko', x: 416, y: 522, la: 'start', lx: 16, ly: 5 },
  { id: 'exmouth', name: 'Exmouth', wiki: 'Exmouth, Western Australia', ambience: 'meri', x: 73, y: 513, la: 'start', lx: 16, ly: 5 },
  { id: 'mountisa', name: 'Mount Isa', wiki: 'Mount Isa', ambience: 'aavikko', x: 414, y: 444, la: 'end', lx: -16, ly: 5 },
  { id: 'cooberpedy', name: 'Coober Pedy', wiki: 'Coober Pedy', ambience: 'aavikko', x: 357, y: 573, la: 'start', lx: 16, ly: -6 },
  { id: 'geraldton', name: 'Geraldton', wiki: 'Geraldton', ambience: 'satama', x: 88, y: 594, la: 'end', lx: -16, ly: 5 },
  { id: 'portmoresby', name: 'Port Moresby', wiki: 'Port Moresby', ambience: 'satama', x: 523, y: 265, la: 'start', lx: 16, ly: 5 },
  { id: 'sepik', name: 'Sepik', wiki: 'Sepik', ambience: 'sademetsa', x: 463, y: 190, la: 'middle', lx: 0, ly: -22 },
  { id: 'honiara', name: 'Honiara', wiki: 'Honiara', ambience: 'satama', x: 722, y: 281, la: 'start', lx: 16, ly: 5 },
  { id: 'portvila', name: 'Port Vila', wiki: 'Port Vila', ambience: 'satama', x: 829, y: 426, la: 'start', lx: 16, ly: 5 },
  { id: 'noumea', name: 'Nouméa', wiki: 'Nouméa', ambience: 'satama', x: 791, y: 489, la: 'start', lx: 16, ly: 5 },
  { id: 'norfolk', name: 'Norfolk', wiki: 'Norfolkinsaari', ambience: 'meri', x: 795, y: 594, la: 'start', lx: 16, ly: 5 },
  { id: 'suva', name: 'Suva', wiki: 'Suva', ambience: 'satama', x: 970, y: 454, la: 'end', lx: -16, ly: 20 },
  { id: 'auckland', name: 'Auckland', wiki: 'Auckland', ambience: 'satama', x: 857, y: 729, airport: true, la: 'start', lx: 16, ly: -6 },
  { id: 'wellington', name: 'Wellington', wiki: 'Wellington', ambience: 'kaupunki', x: 845, y: 795, la: 'start', lx: 16, ly: 5 },
  { id: 'christchurch', name: 'Christchurch', wiki: 'Christchurch', ambience: 'kaupunki', x: 801, y: 830, la: 'start', lx: 16, ly: 12 },
  { id: 'milfordsound', name: 'Milford Sound', wiki: 'Milford Sound', ambience: 'vuoristo', x: 746, y: 842, la: 'end', lx: -16, ly: 5 },
  // Dunedin on oikealla paikallaan Otagon rannikolla. Se on lähempänä
  // naapureitaan kuin laudan vanha vähimmäisväli 50 salli — ks.
  // minCityDistance alempana.
  { id: 'dunedin', name: 'Dunedin', wiki: 'Dunedin (Uusi-Seelanti)', ambience: 'satama', x: 778, y: 858, la: 'start', lx: 16, ly: 20 },
  { id: 'dili', name: 'Dili', wiki: 'Dili', ambience: 'satama', x: 191, y: 280, la: 'middle', lx: 0, ly: -22 },
  {
    id: 'bali', name: 'Bali', wiki: 'Bali', ambience: 'sademetsa', x: 29, y: 306, airport: true, la: 'middle', lx: 0, ly: 28,
    // Indonesian saariketju jatkuu lännessä Aasian laudalle.
  },
];

// steps = kuinka monta silmälukua reitin kulkeminen vaatii.
// type 'sea' = laivareitti; via = piirto- ja tarkistuspisteet veden päällä.
const OC_EDGES = [
  // Länsi-Australia
  { a: 'perth', b: 'geraldton', steps: 3 },
  { a: 'geraldton', b: 'exmouth', steps: 5 },
  { a: 'exmouth', b: 'broome', steps: 6 },
  { a: 'broome', b: 'darwin', steps: 6 },
  { a: 'perth', b: 'kalgoorlie', steps: 3 },
  { a: 'kalgoorlie', b: 'nullarbor', steps: 4 },
  { a: 'nullarbor', b: 'cooberpedy', steps: 4 },
  { a: 'kalgoorlie', b: 'adelaide', steps: 6 },

  // Punainen keskusta
  { a: 'darwin', b: 'alicesprings', steps: 6 },
  { a: 'darwin', b: 'mountisa', steps: 6 },
  { a: 'alicesprings', b: 'uluru', steps: 3 },
  { a: 'alicesprings', b: 'mountisa', steps: 5 },
  { a: 'uluru', b: 'cooberpedy', steps: 4 },
  { a: 'cooberpedy', b: 'adelaide', steps: 4 },
  { a: 'mountisa', b: 'birdsville', steps: 4 },
  { a: 'birdsville', b: 'adelaide', steps: 5 },
  { a: 'birdsville', b: 'brisbane', steps: 6 },

  // Itärannikko
  { a: 'mountisa', b: 'townsville', steps: 4 },
  { a: 'townsville', b: 'cairns', steps: 3 },
  { a: 'townsville', b: 'brisbane', steps: 5 },
  { a: 'brisbane', b: 'sydney', steps: 4 },
  { a: 'sydney', b: 'melbourne', steps: 4 },
  { a: 'sydney', b: 'adelaide', steps: 6 },
  { a: 'melbourne', b: 'adelaide', steps: 4 },

  // Uusi-Guinea
  { a: 'portmoresby', b: 'sepik', steps: 5 },

  // Uusi-Seelanti
  { a: 'auckland', b: 'wellington', steps: 5 },
  { a: 'christchurch', b: 'milfordsound', steps: 5 },
  // Otagon rannikko ja sisämaan reitti järvialueen yli.
  { a: 'christchurch', b: 'dunedin', steps: 3 },
  { a: 'dunedin', b: 'milfordsound', steps: 3 },

  // Laivareitit
  { a: 'cairns', b: 'portmoresby', steps: 4, type: 'sea', via: [[499, 324], [507, 293]] },
  { a: 'portmoresby', b: 'honiara', steps: 5, type: 'sea', via: [[600, 280], [662, 277]] },
  { a: 'honiara', b: 'portvila', steps: 5, type: 'sea', via: [[765, 327], [802, 379]] },
  { a: 'portvila', b: 'noumea', steps: 3, type: 'sea', via: [[810, 458]] },
  { a: 'noumea', b: 'norfolk', steps: 4, type: 'sea', via: [[791, 539]] },
  { a: 'norfolk', b: 'auckland', steps: 5, type: 'sea', via: [[813, 643], [829, 693]] },
  { a: 'noumea', b: 'suva', steps: 4, type: 'sea', via: [[861, 467], [920, 464]] },
  { a: 'suva', b: 'auckland', steps: 6, type: 'sea', via: [[930, 545], [896, 630], [869, 686]] },
  { a: 'wellington', b: 'christchurch', steps: 3, type: 'sea', via: [[832, 810]] },
  { a: 'sydney', b: 'auckland', steps: 7, type: 'sea', via: [[644, 651], [742, 678], [814, 706]] },
  { a: 'hobart', b: 'melbourne', steps: 4, type: 'sea', via: [[504, 738]] },
  { a: 'hobart', b: 'sydney', steps: 6, type: 'sea', via: [[557, 754], [584, 708]] },
  { a: 'darwin', b: 'dili', steps: 4, type: 'sea', via: [[240, 312], [207, 297]] },
  { a: 'dili', b: 'bali', steps: 5, type: 'sea', via: [[122, 304], [68, 310]] },
  { a: 'broome', b: 'dili', steps: 5, type: 'sea', via: [[179, 364], [190, 315]] },
  { a: 'brisbane', b: 'noumea', steps: 6, type: 'sea', via: [[653, 545], [726, 507]] },
];

// KAUPUNKI -> MAA JA MAIDEN MUODOT ASUVAT NYT OMASSA TIEDOSTOSSAAN.
//
// Taulu OC_CITY_COUNTRY oli tässä 23.8.2026 asti. Se siirtyi
// sellaisenaan js/packs/oceania-countries.js:ään nimellä
// OCEANIA_CITY_COUNTRY, kun laudalle tehtiin countryShapes — samaan
// tapaan kuin middleeast.js ja northamerica.js pitävät molemmat taulut
// omassa -countries.js-tiedostossaan ja tuovat ne yhtenä parina.
// Alkuperäinen peruste taululle pätee yhä: ilman kaupunki->maa-tietoa
// menovinkit, liput ja "maa numeroina" eivät syty lehdissä, vaikka
// aineisto olisi muuten valmis (docs/mantereen-resepti.md vaihe 2,
// Dubai-oppi).

// Lentoreitit kulkevat suoraan kaupungista toiseen yhdellä vuorolla.
const OC_AIR_ROUTES = [
  { a: 'perth', b: 'adelaide' },
  { a: 'perth', b: 'darwin' },
  { a: 'adelaide', b: 'melbourne' },
  { a: 'melbourne', b: 'sydney' },
  { a: 'sydney', b: 'brisbane' },
  { a: 'brisbane', b: 'cairns' },
  { a: 'cairns', b: 'darwin' },
  { a: 'darwin', b: 'bali' },
  { a: 'sydney', b: 'auckland' },
];

export const OCEANIA = {
  id: 'oceania',
  name: 'Eteläristin helmi',
  boardLabel: 'Oseania',
  tagline: 'Etsi Eteläristin helmi punaiselta keskustalta, Suurelta valliriutalta ja Tyynenmeren saarilta.',
  ariaLabel: 'Oseanian aarrekartta',

  /*
   * countryShapes ja cityCountry kytkettiin 23.8.2026 (ks.
   * oceania-countries.js). Ennen sitä laudalla oli vain cityCountry, ja
   * esimerkiksi Australian ja Uuden-Seelannin maalehdet aukesivat
   * pelkästään maailmankartalta.
   *
   * Kymmenellä maalla on muoto, ja ne ovat täsmälleen ne maat, joihin
   * laudan 33 kohdetta kuuluvat. Renkaat ulottuvat paikoin laudan
   * ulkopuolelle — Jaava lännessä ja Vanua Levu idässä — mutta maasävy
   * rajataan ui.js:ssä laudan omaan rannikkoon, joten pelissä näkyy vain
   * se osa, jonka lauta piirtää.
   */
  map: {
    ...OC_MAP,
    countryShapes: OCEANIA_COUNTRY_SHAPES,
    cityCountry: OCEANIA_CITY_COUNTRY,
    outlines: [
      OC_MAP.australiaPoints, OC_MAP.tasmaniaPoints, OC_MAP.newGuineaPoints,
      OC_MAP.nzNorthPoints, OC_MAP.nzSouthPoints, OC_MAP.timorPoints,
      OC_MAP.baliPoints, OC_MAP.solomonPoints, OC_MAP.vanuatuPoints,
      OC_MAP.newCaledoniaPoints, OC_MAP.norfolkPoints, OC_MAP.fijiPoints,
    ],
  },
  cities: OC_CITIES,
  edges: OC_EDGES,
  airRoutes: OC_AIR_ROUTES,
  islands: [
    'hobart', 'portmoresby', 'sepik', 'honiara', 'portvila', 'noumea', 'norfolk',
    'suva', 'auckland', 'wellington', 'christchurch', 'milfordsound',
    'dunedin', 'dili', 'bali',
  ],
  // Kevennetty 50 → 35, jotta Dunedin mahtuu Eteläsaarelle omalle
  // paikalleen (omistajan laajennus). Lauta kattaa Balista Fidžille, ja
  // sillä mittakaavalla koko Eteläsaari on noin 90 yksikköä pitkä:
  // Christchurch ja Milford Sound jäävät 36 yksikön päähän Dunedinista,
  // joten vanha 50 olisi vaatinut kaupungin siirtämistä mereen.
  // Sama ratkaisu kuin Afrikan laudalla, jossa väli kevennettiin 75 → 55
  // Lagosin takia. Nimikylttien törmäystesti vartioi luettavuutta erikseen.
  minCityDistance: 35,

  tokens: {
    // Opaali on Oseanian oma aarre: Coober Pedy tuottaa valtaosan
    // maailman jalo-opaaleista, ja kaivoskaupungissa asutaan maan alla
    // helteen takia.
    types: themedTokenTypes({
      star: {
        name: 'Eteläristin helmi',
        kuva: 'assets/aarteet/aarre-oceania-star.jpg',
      },
      mannerAarre: {
        name: 'Opaali', color: '#7fb7c9',
        kuva: 'assets/aarteet/aarre-oceania-manner.jpg',
      },
    }),
    // 33 kaupunkia, yksi laatta kussakin.
    counts: { star: 1, mannerAarre: 1, isoAarre: 10, pieniAarre: 21 },
  },

  questions: OCEANIA_QUESTIONS,
  placeFacts: OCEANIA_FACTS,

  duels: [
    {
      q: 'Mikä on maailman suurin koralliriutta?',
      options: ['Suuri valliriutta', 'Belizen riutta', 'Punaisenmeren riutta',
        'Malediivien riutta', 'Ningaloo', 'Tubbataha', 'Andros', 'Apo'],
      correct: 0,
      fact: 'Suuri valliriutta on yli 2 300 kilometriä pitkä Australian koillisrannikolla ja näkyy avaruuteen asti.',
    },
    {
      q: 'Mikä on Australian pääkaupunki?',
      options: ['Canberra', 'Sydney', 'Melbourne', 'Brisbane',
        'Perth', 'Adelaide', 'Darwin', 'Hobart'],
      correct: 0,
      fact: 'Canberra rakennettiin varta vasten pääkaupungiksi, koska Sydney ja Melbourne eivät päässeet sopuun kummalle tehtävä kuuluisi.',
    },
    {
      q: 'Mikä eläin ei ole pussieläin?',
      options: ['vombattinokkaeläin', 'kenguru', 'koala', 'vompatti',
        'kuseli', 'bandikoot', 'tasmanianpiru', 'sokeriliito'],
      correct: 0,
      fact: 'Kysymyksen ensimmäistä eläintä ei ole olemassa. Nokkaeläin on munivista nisäkkäistä, ei pussieläin — kaikki muut listalla ovat pussieläimiä.',
    },
    {
      q: 'Mikä kansa asutti Uuden-Seelannin ennen eurooppalaisia?',
      options: ['maorit', 'aboriginaalit', 'inuiitit', 'polynesialaiset samoalaiset',
        'melanesialaiset', 'mikronesialaiset', 'papualaiset', 'havaijilaiset'],
      correct: 0,
      fact: 'Maorit saapuivat Uuteen-Seelantiin polynesialaisilta saarilta noin 1300-luvulla. Maan nimi heidän kielellään on Aotearoa.',
    },
    {
      q: 'Mikä on Oseanian korkein vuori?',
      options: ['Puncak Jaya', 'Mount Kosciuszko', 'Aoraki', 'Mauna Kea',
        'Mount Wilhelm', 'Mount Ossa', 'Ruapehu', 'Uluru'],
      correct: 0,
      fact: 'Puncak Jaya Uudessa-Guineassa kohoaa 4 884 metriin. Sen huipulla on jäätikkö, vaikka vuori on lähellä päiväntasaajaa.',
    },
    {
      q: 'Mikä valtameri ympäröi Oseaniaa?',
      options: ['Tyynimeri', 'Atlantti', 'Jäämeri', 'Karibianmeri',
        'Pohjanmeri', 'Mustameri', 'Välimeri', 'Baltia'],
      correct: 0,
      fact: 'Tyynimeri on maailman suurin valtameri: se peittää kolmanneksen maapallon pinnasta ja on laajempi kuin kaikki mantereet yhteensä.',
    },
  ],

  texts: {
    intro: 'Peli alkaa! Etsikää Eteläristin helmi ja palatkaa Sydneyyn tai Perthiin.',
    starFound: (name, city) => `◈ ${name} löysi ETELÄRISTIN HELMEN kaupungista ${city}!`,
    starToast: 'ETELÄRISTIN HELMI!',
    starChase: 'Nyt on kiire kotiin — ensimmäisenä perille ehtinyt voittaa pelin.',
    winStar: 'toi Eteläristin helmen turvallisesti kotiin',
    winnerStar: (name, money) => `${name} toi Eteläristin helmen kotiin ${money} punnan kanssa.`,
    // Saapumismerkinnät: yksi arvotaan laudalle saavuttaessa.
    // KAISTA B: tälle laudalle tarvitaan vielä vähintään neljä merkintää.
    diaries: [
      'Karttani kutsuu tätä maailman laidaksi. Täältä katsoen laidalla onkin Lontoo — ja myönnettäköön, moni asia näytti sieltä käsin nurinkuriselta.',
      'Isoisän kartalla tämä alue on enimmäkseen tyhjää sinistä, ja reunaan on kirjoitettu "tuntematon". Tässä on tuhansia saaria, joilla on asuttu kolmetuhatta vuotta ja purjehdittu avomerellä tähtien avulla ilman kompassia. Tuntematon oli hänen sanansa, ei heidän.',
      '"Siirtokunnat tarvitsevat meitä vielä sata vuotta", arvioi isoisä. Täällä on nyt oma perustuslaki, oma raha ja oma tapa lausua jokainen sana; Lontoo mainitaan lähinnä krikettiotteluiden yhteydessä.',
      'Isoisä kirjoitti riutasta kaksi sivua ja päätyi sanaan sanoinkuvaamaton. Riutta on yhä siellä ja yhä sanoinkuvaamaton, mutta nyt sitä mitataan myös asteina: lämpenevä meri vaalentaa korallin.',
      '"Näillä saarilla aika kuluu hitaasti", merkitsi isoisä hyväntahtoisesti. Kysyin asiaa satamassa, ja minulle näytettiin merenpinnan mittaustaulukkoa ja kysyttiin kummalla meistä on kiire. Hitaus taisi olla hänen omansa.',
      'Isoisä päätteli, ettei saarten välillä voi olla kauppaa, koska etäisyydet ovat liian suuria. Kauppaa käytiin tuhat vuotta ennen häntä: obsidiaania, simpukkaa ja sukulaisuussuhteita kulki saarelta saarelle kanooteilla.',
    ],
  },

  decor: {
    mapLabel: 'OSEANIA',
    mapLabelPos: { x: 240, y: 880 },
    compass: { x: 690, y: 130, r: 58 },
    waveSkip: [
      { x: 240, y: 880, r: 130 },
      { x: 690, y: 130, r: 100 },
      { x: 130, y: 180, r: 95 },
      { x: 880, y: 176, r: 105 },
    ],
    ship: { x: 880, y: 176 },
    serpent: { x: 130, y: 180 },
    dieSpot: { x: 0.06, y: 0.86 },
    terrainBands: [
      { maxY: 380, kind: 'trees' },
      { maxY: 620, kind: 'mountains' },
      { maxY: Infinity, kind: 'trees' },
    ],
  },
};
