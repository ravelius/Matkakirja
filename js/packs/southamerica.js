// Etelä-Amerikka-lauta: kaupungit, reitit, kartan piirtotiedot ja teema.
//
// Koordinaatisto on 1000 x 1000 yksikköä.
//
// Kartta on Lambertin konformisessa kartioprojektiossa, standardileveys-
// piireinä 5° ja 45° etelää ja keskimeridiaanina 60° läntistä pituutta.
// Muodot pysyvät oikeina sekä päiväntasaajalla että Patagoniassa. Lähde-
// aineisto on tools/mapdata/southamerica.json ja koordinaatit lasketaan
// komennolla `node tools/project.mjs southamerica`.
//
// Manner on yksi ääriviiva Panaman kannakselta Tulimaahan. Galápagos,
// Falklandinsaaret, Juan Fernándezin Robinson Crusoe, San Ambrosio ja
// Kap Horn ovat omia saariaan, joihin pääsee vain laivalla. Manner on kapea
// ja korkea, joten kartan laidoille jää valtamerta — sinne mahtuvat otsikko,
// kompassi ja laiva.

import { SOUTHAMERICA_QUESTIONS, SOUTHAMERICA_FACTS } from './southamerica-questions.js';
import { SOUTH_AMERICA_COUNTRY_SHAPES, SOUTH_AMERICA_CITY_COUNTRY } from './southamerica-countries.js';
import { themedTokenTypes } from '../tokens.js';

const SA_MAP = {
  width: 1000,
  height: 1000,
  mainlandPoints: [
    [181.2, 96.5], [195, 103.7], [213.6, 102.2], [227.7, 92.1], [234.9, 87.8],
    [251, 90.3], [269.1, 97.3], [277, 97.9], [289.3, 83.7], [295.2, 67],
    [305, 56.3], [313.9, 50.4], [339.9, 41.3], [357.9, 28.3], [363.4, 37.6],
    [355.1, 51.3], [376.4, 41.4], [384.3, 40.9], [407.4, 55.4], [427.7, 54.2],
    [451.1, 51.5], [471.5, 50.7], [496.5, 48.5], [507.8, 65.8], [525, 81.3],
    [537.3, 90.6], [564.8, 109.3], [590.3, 123.6], [620.3, 130.7], [652.9, 141.4],
    [671.5, 156.1], [676.8, 186.2], [682.5, 208.6], [695.2, 231.3], [729.5, 248.9],
    [759.8, 259.4], [794.3, 269.5], [838.6, 287.7], [862.9, 311.8], [878.9, 324.6],
    [879.6, 343.1], [877, 356.7], [857.6, 379.5], [842.1, 390.5], [818.2, 412.5],
    [807.7, 436.7], [794.3, 464.2], [780.4, 489], [769.5, 520.7], [740.3, 536.7],
    [717.4, 544.5], [698, 545.1], [673.6, 562.6], [670.7, 582.1], [652.4, 607.1],
    [637.7, 619.2], [623.8, 642.2], [610.4, 664], [592, 681.8], [578.9, 681.4],
    [564.7, 677.1], [554.9, 676.9], [564.4, 695.7], [572.4, 722.8], [516.3, 736],
    [513.5, 756.4], [496, 760.9], [485.8, 764], [486.8, 791.4], [484.9, 819.3],
    [463.9, 833], [469.6, 848.3], [481.7, 859.1], [465.3, 891.7], [460, 925.9],
    [461.7, 965.1], [473.7, 975.2], [449.8, 972.1], [435, 953.4], [439.4, 940.9],
    [414.2, 925.2], [402, 897], [394.1, 868.8], [384.4, 827.2], [396.2, 797.9],
    [404.2, 776.4], [395.6, 743], [396.1, 715.9], [408.5, 661.2], [407.3, 621.5],
    [412.9, 561.6], [412.2, 537.9], [411.1, 491.8], [408.1, 469.5], [393.9, 450.7],
    [378.1, 445.4], [341.5, 429.1], [325, 410.9], [313.3, 392], [288, 354.2],
    [271.6, 335.8], [252.2, 317.7], [243.1, 305], [243.9, 283.5], [250.6, 271],
    [238.4, 248.4], [241.1, 228.9], [260, 206.9], [265.4, 192.8], [278, 176.1],
    [276.6, 153.6], [272.1, 131.2], [263, 109.1], [253.2, 105.8], [238.6, 112.6],
    [222.9, 111.8], [217, 123.8], [208.2, 117.3], [188, 117.6], [184.1, 113.5],
  ],
  galapagosPoints: [
    [85, 267.4], [92.4, 261.1], [103.6, 264.4], [117.2, 265.8], [121.3, 270.7],
    [111.3, 278.9], [102.7, 279.4], [94.3, 275.5], [87.7, 272.6],
  ],
  falklandPoints: [
    [524.5, 910.2], [534.6, 907.1], [542.9, 908.6], [552.1, 907.2], [558, 911.7],
    [555.6, 919.1], [547.4, 922], [539.2, 920.4], [532.8, 917.5], [526.4, 916],
  ],
  robinsonPoints: [
    [327.4, 678.9], [329.5, 677.8], [332.1, 677.9], [332.8, 679.5], [330.5, 680.8],
    [328, 680.3],
  ],
  ambrosioPoints: [
    [302.5, 584.7], [304.6, 584.2], [305.5, 585.3], [304.2, 586.3], [302.4, 585.7],
  ],
  hornPoints: [
    [472.1, 978], [475.4, 977.6], [477.4, 979.6], [476.5, 982], [473.4, 981.9],
    [471.7, 979.9],
  ],
};

/*
 * start = aloituskaupunki (ei laattaa), airport = lentokenttä.
 *
 * wiki = suomenkielisen Wikipedia-artikkelin otsikko (js/wiki.js kokeilee
 * fi ensin, en varalla). Otsikot on tarkistettu rajapinnasta: moni
 * portugalin- ja espanjankielinen nimi on suomeksi täsmennyssivu, eikä
 * täsmennyssivusta saa tiivistelmää eikä kuvaa. Siksi Manaus on
 * 'Manaus (kaupunki)' — pelkkä 'Manaus' on suomeksi loitsimista
 * tarkoittava sana — ja Santarém, Salvador ja Boa Vista tarvitsevat
 * suluissa olevan tarkenteen.
 *
 * ambience = äänimaisema; sanasto on sama kuin muilla laudoilla.
 * Ei-ilmeiset valinnat:
 *
 *  - Amazonin sisämaan paikat (Macapá, Manaus, Santarém, Iquitos,
 *    Porto Velho, Cayenne) ovat 'sademetsa' vaikka moni niistä on myös
 *    jokisatama: metsä on se, mitä paikan päällä kuuluu.
 *  - Antofagasta on 'aavikko' eikä 'satama'. Se on satama, mutta
 *    Atacama on kuivin autiomaa maailmassa ja määrittää paikan.
 *  - Bogotá ja Titicaca ovat 'ylanko' (avoin korkea tasanko), kun taas
 *    Quito, Machu Picchu, Salta ja Catamarca ovat 'vuoristo' (laakso
 *    jyrkkien rinteiden välissä).
 *  - Boa Vista, Ilha do Bananal ja Campo Grande ovat 'savanni': ne
 *    ovat cerradoa ja kosteikon laitaa, eivät sademetsää.
 *  - Kap Horn, Falkland, San Ambrosio, Robinson Crusoe ja San Jorgen
 *    lahti ovat 'meri' — avomerta, ei satamaa.
 */
const SA_CITIES = [
  {
    id: 'panama', name: 'Panama', wiki: 'Panama (kaupunki)', ambience: 'satama', x: 236, y: 98, start: true, airport: true,
    la: 'end', lx: -16, ly: 5,
    // Sama kaupunki on myös Pohjois-Amerikan laudalla: kannas yhdistää mantereet.
  },
  {
    id: 'buenosaires', name: 'Buenos Aires', wiki: 'Buenos Aires', ambience: 'kaupunki', x: 554, y: 681, start: true, airport: true,
    la: 'end', lx: -18, ly: 28,
  },

  { id: 'caracas', name: 'Caracas', wiki: 'Caracas', ambience: 'kaupunki', x: 430, y: 59 },
  { id: 'bogota', name: 'Bogotá', wiki: 'Bogotá', ambience: 'ylanko', x: 327, y: 152, airport: true, la: 'end', lx: -16, ly: 5 },
  { id: 'quito', name: 'Quito', wiki: 'Quito', ambience: 'vuoristo', x: 271, y: 232, la: 'end', lx: -16, ly: 5 },
  { id: 'galapagos', name: 'Galápagos', wiki: 'Galápagossaaret', ambience: 'meri', x: 105, y: 271, la: 'middle', lx: 0, ly: 26 },
  { id: 'boavista', name: 'Boa Vista', wiki: 'Boa Vista (Roraima)', ambience: 'savanni', x: 527, y: 169 },
  { id: 'cayenne', name: 'Cayenne', wiki: 'Cayenne', ambience: 'sademetsa', x: 647, y: 144, la: 'start', lx: 16, ly: 5 },
  { id: 'macapa', name: 'Macapá', wiki: 'Macapá', ambience: 'sademetsa', x: 663, y: 212, la: 'start', lx: 16, ly: 5 },
  { id: 'manaus', name: 'Manaus', wiki: 'Manaus (kaupunki)', ambience: 'sademetsa', x: 537, y: 255, airport: true, la: 'end', lx: -16, ly: 5 },
  { id: 'santarem', name: 'Santarém', wiki: 'Santarém (Brasilia)', ambience: 'sademetsa', x: 613, y: 247, la: 'middle', lx: 0, ly: -22 },
  { id: 'saoluis', name: 'São Luís', wiki: 'São Luís', ambience: 'kaupunki', x: 755, y: 265, la: 'middle', lx: 0, ly: -22 },
  {
    id: 'joaopessoa', name: 'João Pessoa', wiki: 'João Pessoa', ambience: 'meri', x: 875, y: 344, airport: true,
    la: 'start', lx: 16, ly: 5,
    // Etelä-Atlantin postilentoreitti Dakariin: Brasilian itäkärki on
    // Afrikkaa lähinnä oleva kohta koko Amerikassa.
  },
  { id: 'salvador', name: 'Salvador', wiki: 'Salvador (Brasilia)', ambience: 'kaupunki', x: 815, y: 411, la: 'start', lx: 16, ly: 5 },
  { id: 'iquitos', name: 'Iquitos', wiki: 'Iquitos', ambience: 'sademetsa', x: 351, y: 273, la: 'end', lx: -16, ly: 5 },
  { id: 'portovelho', name: 'Porto Velho', wiki: 'Porto Velho', ambience: 'sademetsa', x: 485, y: 334, la: 'end', lx: -16, ly: 5 },
  { id: 'bananal', name: 'Ilha do Bananal', wiki: 'Bananal', ambience: 'savanni', x: 668, y: 366, la: 'start', lx: 16, ly: 5 },
  { id: 'machupicchu', name: 'Machu Picchu', wiki: 'Machu Picchu', ambience: 'vuoristo', x: 373, y: 404, la: 'start', lx: 16, ly: -6 },
  { id: 'titicaca', name: 'Titicaca', wiki: 'Titicaca', ambience: 'ylanko', x: 418, y: 433, la: 'end', lx: -16, ly: 16 },
  { id: 'lima', name: 'Lima', wiki: 'Lima', ambience: 'kaupunki', x: 319, y: 397, airport: true, la: 'end', lx: -16, ly: 5 },
  { id: 'santacruz', name: 'Santa Cruz', wiki: 'Santa Cruz de la Sierra', ambience: 'kaupunki', x: 497, y: 455 },
  { id: 'campogrande', name: 'Campo Grande', wiki: 'Campo Grande', ambience: 'savanni', x: 604, y: 492, la: 'start', lx: 16, ly: 5 },
  {
    id: 'rio', name: 'Rio de Janeiro', wiki: 'Rio de Janeiro', ambience: 'kaupunki', x: 738, y: 533, start: true, airport: true,
    la: 'start', lx: 16, ly: 5,
    // Sama kaupunki on myös Maailma-laudalla.
  },
  { id: 'saopaulo', name: 'São Paulo', wiki: 'São Paulo', ambience: 'kaupunki', x: 682, y: 525, la: 'end', lx: -6, ly: 20 },
  // Ouro Preto on kartalla noin 170 km todellista paikkaansa pohjoisessa,
  // yhä Minas Geraisin kaivosylängöllä: oikealta paikalta Rio jäisi 31
  // yksikön päähän, kun laudan vähimmäisväli on 50.
  { id: 'ouropreto', name: 'Ouro Preto', wiki: 'Ouro Preto', ambience: 'vuoristo', x: 741, y: 482, la: 'start', lx: 16, ly: 5 },
  { id: 'iguazu', name: 'Iguazú', wiki: 'Iguassun putoukset', ambience: 'sademetsa', x: 603, y: 561, la: 'start', lx: 16, ly: 5 },
  { id: 'portoalegre', name: 'Porto Alegre', wiki: 'Porto Alegre', ambience: 'satama', x: 633, y: 616, la: 'start', lx: 16, ly: 5 },
  { id: 'antofagasta', name: 'Antofagasta', wiki: 'Antofagasta', ambience: 'aavikko', x: 417, y: 536, la: 'end', lx: -16, ly: 5 },
  { id: 'salta', name: 'Salta', wiki: 'Salta', ambience: 'vuoristo', x: 473, y: 549, la: 'start', lx: 16, ly: 5 },
  { id: 'asuncion', name: 'Asunción', wiki: 'Asunción', ambience: 'kaupunki', x: 550, y: 567, la: 'middle', lx: 0, ly: 24 },
  { id: 'valparaiso', name: 'Valparaíso', wiki: 'Valparaíso', ambience: 'satama', x: 413, y: 661, airport: true, la: 'start', lx: 16, ly: 5 },
  { id: 'sanambrosio', name: 'San Ambrosio', wiki: 'Desventuradas Islands', ambience: 'meri', x: 304, y: 585, la: 'middle', lx: 0, ly: 28 },
  { id: 'robinsoncrusoe', name: 'Robinson Crusoe', wiki: 'Juan Fernándezin saaret', ambience: 'meri', x: 330, y: 679, la: 'middle', lx: 0, ly: 28 },
  { id: 'puertomontt', name: 'Puerto Montt', wiki: 'Puerto Montt', ambience: 'satama', x: 408, y: 775, la: 'end', lx: -16, ly: 5 },
  { id: 'montevideo', name: 'Montevideo', wiki: 'Montevideo', ambience: 'satama', x: 606, y: 664, la: 'start', lx: 16, ly: 5 },
  { id: 'falkland', name: 'Falkland', wiki: 'Falklandinsaaret', ambience: 'meri', x: 542, y: 915, la: 'start', lx: 16, ly: 5 },
  { id: 'puntaarenas', name: 'Punta Arenas', wiki: 'Punta Arenas', ambience: 'satama', x: 434, y: 931, la: 'end', lx: -16, ly: 5 },
  { id: 'caphorn', name: 'Kap Horn', wiki: 'Kap Horn', ambience: 'meri', x: 474, y: 980, la: 'start', lx: 16, ly: 8 },
];

// steps = kuinka monta silmälukua reitin kulkeminen vaatii.
// type 'sea' = laivareitti; via = piirto- ja tarkistuspisteet veden päällä.
const SA_EDGES = [
  // Panaman kannas ja Andien pohjoispää
  { a: 'panama', b: 'bogota', steps: 4 },
  { a: 'bogota', b: 'caracas', steps: 4 },
  { a: 'bogota', b: 'quito', steps: 3 },
  { a: 'quito', b: 'iquitos', steps: 4 },
  { a: 'quito', b: 'lima', steps: 5 },

  // Guyanan ylänkö ja Amazonin suisto
  { a: 'caracas', b: 'boavista', steps: 4 },
  { a: 'boavista', b: 'cayenne', steps: 5 },
  { a: 'boavista', b: 'manaus', steps: 3 },
  { a: 'cayenne', b: 'macapa', steps: 3 },
  { a: 'macapa', b: 'santarem', steps: 3 },
  { a: 'santarem', b: 'manaus', steps: 3 },
  { a: 'santarem', b: 'saoluis', steps: 4 },

  // Amazonin altaan eteläreuna
  { a: 'manaus', b: 'iquitos', steps: 4 },
  { a: 'manaus', b: 'portovelho', steps: 3 },
  { a: 'iquitos', b: 'portovelho', steps: 4 },
  { a: 'portovelho', b: 'santacruz', steps: 4 },
  { a: 'santarem', b: 'bananal', steps: 4 },
  { a: 'bananal', b: 'saoluis', steps: 4 },
  { a: 'bananal', b: 'campogrande', steps: 4 },

  // Brasilian rannikko
  { a: 'saoluis', b: 'joaopessoa', steps: 4 },
  { a: 'joaopessoa', b: 'salvador', steps: 3 },
  { a: 'salvador', b: 'rio', steps: 5 },
  { a: 'rio', b: 'saopaulo', steps: 2 },
  // Estrada Real: kultareitti kaivosylängöltä rannikolle.
  { a: 'ouropreto', b: 'rio', steps: 2 },
  { a: 'ouropreto', b: 'saopaulo', steps: 3 },
  { a: 'ouropreto', b: 'salvador', steps: 4 },
  { a: 'saopaulo', b: 'campogrande', steps: 3 },
  { a: 'saopaulo', b: 'iguazu', steps: 3 },
  { a: 'saopaulo', b: 'portoalegre', steps: 3 },
  { a: 'iguazu', b: 'portoalegre', steps: 2 },
  { a: 'iguazu', b: 'buenosaires', steps: 3 },
  { a: 'portoalegre', b: 'buenosaires', steps: 3 },

  // Andit ja Altiplano
  { a: 'lima', b: 'machupicchu', steps: 3 },
  { a: 'machupicchu', b: 'titicaca', steps: 2 },
  { a: 'titicaca', b: 'santacruz', steps: 3 },
  { a: 'titicaca', b: 'antofagasta', steps: 4 },
  { a: 'santacruz', b: 'salta', steps: 3 },
  { a: 'salta', b: 'antofagasta', steps: 3 },
  { a: 'salta', b: 'asuncion', steps: 3 },
  { a: 'salta', b: 'valparaiso', steps: 4 },
  { a: 'asuncion', b: 'buenosaires', steps: 4 },
  { a: 'asuncion', b: 'iguazu', steps: 2 },

  // Patagonia
  { a: 'valparaiso', b: 'puertomontt', steps: 4 },
  { a: 'buenosaires', b: 'montevideo', steps: 2, type: 'sea', via: [[580, 688]] },
  { a: 'montevideo', b: 'portoalegre', steps: 4 },

  // Laivareitit
  { a: 'panama', b: 'galapagos', steps: 5, type: 'sea',
    via: [[179, 169], [129, 224]] },
  { a: 'galapagos', b: 'lima', steps: 6, type: 'sea',
    via: [[164, 320], [255, 359]] },
  { a: 'panama', b: 'caracas', steps: 6, type: 'sea',
    via: [[299, 33], [410, 18]] },
  { a: 'caracas', b: 'cayenne', steps: 6, type: 'sea',
    via: [[506, 44], [599, 92]] },
  { a: 'macapa', b: 'saoluis', steps: 5, type: 'sea',
    via: [[710, 224], [745, 242]] },
  { a: 'salvador', b: 'saoluis', steps: 6, type: 'sea',
    via: [[855, 393], [915, 335], [907, 268], [824, 244], [780, 249]] },
  { a: 'lima', b: 'antofagasta', steps: 6, type: 'sea',
    via: [[293, 435], [376, 492]] },
  { a: 'antofagasta', b: 'sanambrosio', steps: 4, type: 'sea', via: [[359, 560]] },
  { a: 'sanambrosio', b: 'robinsoncrusoe', steps: 4, type: 'sea', via: [[314, 632]] },
  { a: 'robinsoncrusoe', b: 'valparaiso', steps: 3, type: 'sea', via: [[371, 669]] },
  { a: 'puertomontt', b: 'puntaarenas', steps: 5, type: 'sea',
    via: [[379, 828], [370, 901], [411, 941]] },
  { a: 'puntaarenas', b: 'caphorn', steps: 3, type: 'sea', via: [[454, 970]] },
  { a: 'caphorn', b: 'falkland', steps: 4, type: 'sea', via: [[511, 965], [537, 941]] },
  { a: 'montevideo', b: 'falkland', steps: 7, type: 'sea', via: [[600, 700], [590, 780], [568, 862]] },
];

// KAUPUNKI -> MAA JA MAIDEN MUODOT ASUVAT NYT OMASSA TIEDOSTOSSAAN.
//
// Taulu SA_CITY_COUNTRY oli tässä 23.8.2026 asti. Se siirtyi
// sellaisenaan js/packs/southamerica-countries.js:ään nimellä
// SOUTH_AMERICA_CITY_COUNTRY, kun laudalle tehtiin countryShapes —
// samaan tapaan kuin middleeast.js ja northamerica.js pitävät
// molemmat taulut omassa -countries-paketissaan ja tuovat ne yhtenä
// parina. Alkuperäinen peruste taululle pätee yhä: ilman
// kaupunki->maa-tietoa menovinkit, liput ja "maa numeroina" eivät
// syty lehdissä, vaikka aineisto olisi muuten valmis
// (docs/mantereen-resepti.md vaihe 2, Dubai-oppi). Myös titicacan ja
// iguazún rajatapausten perustelut siirtyivät samaan tiedostoon.

// Lentoreitit kulkevat suoraan kaupungista toiseen yhdellä vuorolla.
const SA_AIR_ROUTES = [
  { a: 'panama', b: 'bogota' },
  { a: 'bogota', b: 'manaus' },
  { a: 'bogota', b: 'lima' },
  { a: 'manaus', b: 'rio' },
  { a: 'joaopessoa', b: 'rio' },
  { a: 'rio', b: 'buenosaires' },
  { a: 'buenosaires', b: 'valparaiso' },
  { a: 'valparaiso', b: 'lima' },
  { a: 'lima', b: 'manaus' },
  { a: 'joaopessoa', b: 'buenosaires' },
];

export const SOUTHAMERICA = {
  id: 'southamerica',
  name: 'El Dorado',
  boardLabel: 'Etelä-Amerikka',
  tagline: 'Etsi El Doradon kulta Andien huipuilta, Amazonin sademetsästä ja Patagonian tuulilta.',
  ariaLabel: 'Etelä-Amerikan aarrekartta',

  /*
   * countryShapes ja cityCountry kytkettiin 23.8.2026 (ks.
   * southamerica-countries.js). Ennen sitä laudalla oli vain
   * cityCountry, ja esimerkiksi Brasilian ja Argentiinan maalehdet
   * aukesivat pelkästään maailmankartalla.
   *
   * Kolmellatoista maalla on muoto, ja ne ovat täsmälleen ne maat,
   * joihin laudan 38 kohdetta kuuluvat. Robinson Crusoella, San
   * Ambrosiolla ja Kap Hornilla ei ole omaa rengasta — ne ovat laudalla
   * 2–5 yksikköä leveitä eli alle sirpalerajan — mutta ne osoittavat
   * silti Chileen cityCountryssa.
   */
  map: {
    ...SA_MAP,
    countryShapes: SOUTH_AMERICA_COUNTRY_SHAPES,
    cityCountry: SOUTH_AMERICA_CITY_COUNTRY,
    outlines: [
      SA_MAP.mainlandPoints, SA_MAP.galapagosPoints, SA_MAP.falklandPoints,
      SA_MAP.robinsonPoints, SA_MAP.ambrosioPoints, SA_MAP.hornPoints,
    ],
  },
  cities: SA_CITIES,
  edges: SA_EDGES,
  airRoutes: SA_AIR_ROUTES,
  islands: ['galapagos', 'sanambrosio', 'robinsoncrusoe', 'falkland', 'caphorn'],
  // Andien kaupungit ovat oikeasti tiheässä: Lima, Machu Picchu ja Titicaca
  // mahtuvat pienelle alueelle, joten vähimmäisetäisyys on hieman muita väljempi.
  minCityDistance: 50,

  tokens: {
    types: themedTokenTypes({
      star: {
        name: 'El Doradon aarre',
        kuva: 'assets/aarteet/aarre-southamerica-star.jpg',
      },
      mannerAarre: {
        name: 'Inkojen kultafiguuri', color: '#e0b02a',
        kuva: 'assets/aarteet/aarre-southamerica-manner.jpg',
      },
      // Mantereen oma paikallisaarrepari (entiset jalokiviaarteet
      // nimineen ja kuvineen) — väliaikainen, kunnes maakohtaiset
      // parit (js/packs/paikallisaarteet.js) täyttyvät.
      isoAarre: {
        name: 'Kolumbian smaragdi', color: '#2fa36b',
        kuva: 'assets/aarteet/aarre-southamerica-emerald.jpg',
      },
      pieniAarre: {
        name: 'Potosín hopeakolikko', color: '#c9ccd4',
        kuva: 'assets/aarteet/aarre-southamerica-topaz.jpg',
      },
    }),
    // 38 kaupunkia, yksi laatta kussakin.
    counts: { star: 1, mannerAarre: 1, isoAarre: 12, pieniAarre: 24 },
  },

  questions: SOUTHAMERICA_QUESTIONS,
  placeFacts: SOUTHAMERICA_FACTS,

  duels: [
    {
      q: 'Mikä on maailman korkeimmalla sijaitseva pääkaupunki?',
      options: ['La Paz', 'Quito', 'Bogotá', 'Lima', 'Santiago', 'Caracas', 'Asunción', 'Brasília'],
      correct: 0,
      fact: 'Bolivian La Paz on hallituksen istuinpaikka noin 3 600 metrissä. Quito on toisena noin 2 850 metrissä.',
      source: 'https://fi.wikipedia.org/wiki/La_Paz',
    },
    {
      q: 'Mikä näistä maista EI rajoitu Amazonin sademetsään?',
      options: ['Chile', 'Brasilia', 'Peru', 'Kolumbia', 'Bolivia', 'Ecuador', 'Venezuela', 'Guyana'],
      correct: 0,
      fact: 'Chile on Andien länsipuolella kapea kaistale eikä ylety Amazonin altaaseen lainkaan.',
      source: 'https://en.wikipedia.org/wiki/Amazon_rainforest',
    },
    {
      q: 'Minkä maan virallinen kieli on portugali?',
      options: ['Brasilia', 'Argentiina', 'Peru', 'Chile', 'Kolumbia', 'Bolivia', 'Uruguay', 'Paraguay'],
      correct: 0,
      fact: 'Brasilia on ainoa portugalinkielinen maa Etelä-Amerikassa; muualla puhutaan espanjaa ja alkuperäiskieliä.',
      source: 'https://en.wikipedia.org/wiki/Brazil',
    },
    {
      q: 'Mikä on maailman kuivin autiomaa?',
      options: ['Atacama', 'Sahara', 'Gobi', 'Namib', 'Kalahari', 'Patagonia', 'Sonora', 'Rub al-Khali'],
      correct: 0,
      fact: 'Atacama Pohjois-Chilessä on maailman kuivin ei-polaarinen autiomaa; osassa sitä ei ole mitattu sadetta vuosikausiin.',
      source: 'https://en.wikipedia.org/wiki/Atacama_Desert',
    },
    {
      q: 'Kuka johti Espanjan valloitusretkeä inkavaltakuntaan 1530-luvulla?',
      options: ['Francisco Pizarro', 'Hernán Cortés', 'Vasco da Gama', 'Kristoffer Kolumbus',
        'Ferdinand Magalhães', 'Simón Bolívar', 'Amerigo Vespucci', 'Diego de Almagro'],
      correct: 0,
      fact: 'Pizarro vangitsi inkojen hallitsijan Atahualpan Cajamarcassa 1532 ja kukisti valtakunnan muutamassa vuodessa.',
      source: 'https://en.wikipedia.org/wiki/Francisco_Pizarro',
    },
    {
      q: 'Mikä on Etelä-Amerikan pisin jokijärjestelmä?',
      options: ['Amazon', 'Paraná', 'Orinoco', 'Río Negro', 'Madeira', 'São Francisco', 'Uruguay', 'Magdalena'],
      correct: 0,
      fact: 'Amazon on noin 6 400 kilometriä pitkä ja kuljettaa enemmän vettä kuin mikään muu joki maailmassa.',
      source: 'https://en.wikipedia.org/wiki/Amazon_River',
    },
  ],

  texts: {
    intro: 'Peli alkaa! Etsikää El Doradon aarre ja palatkaa Panamaan, Buenos Airesiin tai Rioon.',
    starFound: (name, city) => `◈ ${name} löysi EL DORADON AARTEEN kaupungista ${city}!`,
    starToast: 'EL DORADON AARRE!',
    starChase: 'Nyt on kiire kotiin — ensimmäisenä perille ehtinyt voittaa pelin.',
    winStar: 'toi El Doradon aarteen turvallisesti kotiin',
    winnerStar: (name, money) => `${name} toi El Doradon aarteen kotiin ${money} punnan kanssa.`,
    // Saapumismerkinnät: yksi arvotaan laudalle saavuttaessa.
    // KAISTA B: tälle laudalle tarvitaan vielä vähintään neljä merkintää.
    diaries: [
      'Esi-isäni tulivat hakemaan El Doradon kultaa ja veivät minkä irti saivat. Minä ostan jääkaappimagneetin ja maksan ylihintaa. Jonkinlaista oikeudenmukaisuutta sekin.',
      'Isoisän kartassa tämä manner on merkitty kahden kuningaskunnan väreillä. Nyt täällä on kaksitoista itsenäistä valtiota, ja niiden vapaussodat käytiin ennen kuin hän ehti pakata laukkunsa.',
      '"Sademetsä on tyhjä ja kulkukelvoton", kirjoitti isoisä varmana. Metsässä asui miljoonia ihmisiä, jotka olivat parantaneet maaperää niin hyvin, että se on viljavaa vieläkin. Kulkukelvoton oli hänen jalkansa, ei metsä.',
      'Isoisä ihasteli Andien korkeutta ja arveli, ettei niiden yli voi kulkea kuin muulilla. Bussi vie nyt solan yli kolmessa tunnissa, ja muuli seisoo tien vieressä katsomassa. Molemmat ovat yhä käytössä.',
      '"Kahvi, kumi ja hopea — siinä koko manner", tiivisti isoisä talouden. Lisäisin listalle litiumin, soijan, lentokoneet ja sen, että tuotteiden hinnasta päätetään nykyään useammin täällä kuin Lontoossa.',
      'Isoisä merkitsi muistiin, että putoukset ovat vaikuttavat mutta Niagara vaikuttavampi. Seisoin molempien äärellä ja olen eri mieltä. Tämä on ainoa kohta, jossa uskallan sanoa hänen erehtyneen mittasuhteissa.',
    ],
  },

  decor: {
    mapLabel: 'ETELÄ-AMERIKKA',
    mapLabelPos: { x: 790, y: 900 },
    compass: { x: 148, y: 800, r: 58 },
    waveSkip: [
      { x: 790, y: 900, r: 170 },
      { x: 148, y: 800, r: 100 },
      { x: 150, y: 420, r: 95 },
      { x: 830, y: 120, r: 105 },
    ],
    ship: { x: 830, y: 120 },
    serpent: { x: 150, y: 420 },
    dieSpot: { x: 0.06, y: 0.62 },
    terrainBands: [
      { maxY: 300, kind: 'trees' },
      { maxY: 620, kind: 'mountains' },
      { maxY: Infinity, kind: 'mountains' },
    ],
  },
};
