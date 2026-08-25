// Istanbul-lauta: ensimmäinen kaupunkitason lauta.
//
// Koordinaatisto on 1000 x 1000 yksikköä, vapaasti aseteltu kaupunkikartta:
// Bosporinsalmi halkoo laudan pystysuunnassa (Mustameri ylhäällä, Marmaranmeri
// alhaalla), Kultainen sarvi työntyy Euroopan puolelle ja Prinssisaaret ovat
// Marmaranmeressä. "Kaupungit" ovat kaupunginosia ja nähtävyyksiä, laivareitit
// ovat Bosporin lauttoja ja lentokentät toimivat aloituspaikkoina.
//
// Laudalle saavutaan vaelluksessa Lähi-idän laudan Istanbulista, ja
// Lentoasemalta pääsee samaa reittiä takaisin.

import { ISTANBUL_QUESTIONS, ISTANBUL_FACTS } from './istanbul-questions.js';
import { themedTokenTypes } from '../tokens.js';

const IST_MAP = {
  width: 1000,
  height: 1000,
  // Euroopan puoli: Bosporin länsiranta, Kultainen sarvi ja Marmaran rannikko.
  europePoints: [
    [-45, -45], [430, -45],
    [450, 80], [420, 160], [445, 240], [415, 320], [430, 400], [455, 470],
    [380, 470], [300, 430], [230, 400],
    [240, 430], [310, 465], [390, 510], [440, 555],
    [450, 600], [435, 660],
    [380, 700], [280, 730], [160, 750], [-45, 770],
  ],
  // Aasian puoli: Bosporin itäranta ja Marmaran rannikko.
  asiaPoints: [
    [570, -45], [1045, -45], [1045, 780],
    [880, 770], [760, 750], [650, 725], [585, 702], [560, 680],
    [560, 640], [555, 570], [580, 490], [565, 410], [590, 330],
    [560, 250], [585, 170], [555, 90],
  ],
  prinssisaaretPoints: [
    [760, 880], [800, 868], [845, 888], [825, 918], [772, 912],
  ],
  neitsyttorniPoints: [
    [512, 638], [528, 636], [532, 650], [516, 653],
  ],
};

// start = aloituspaikka (ei laattaa), airport = lentokenttä.
const IST_CITIES = [
  {
    id: 'lentoasema', name: 'Lentoasema', x: 80, y: 120, start: true, airport: true,
    la: 'start', lx: 16, ly: 5,
    // Takaisin Lähi-idän laudalle.
    links: [
      { pack: 'middleeast', city: 'istanbul', label: 'Lähi-idän lauta' },
      { pack: 'europe', city: 'istanbul', label: 'Euroopan lauta' },
    ],
  },
  {
    id: 'sabihagokcen', name: 'Sabiha Gökçen', x: 880, y: 620, start: true, airport: true,
    la: 'middle', lx: 0, ly: -26,
  },

  // Euroopan puoli
  { id: 'rumelinlinnoitus', name: 'Rumelin linnoitus', x: 400, y: 155, la: 'end', lx: -16, ly: 5 },
  { id: 'dolmabahce', name: 'Dolmabahçe', x: 395, y: 285, la: 'end', lx: -16, ly: 5 },
  { id: 'taksim', name: 'Taksim', x: 390, y: 380, la: 'end', lx: -16, ly: 5 },
  { id: 'galata', name: 'Galata-torni', x: 410, y: 450, la: 'start', lx: 14, ly: -10 },
  { id: 'pierreloti', name: 'Pierre Loti', x: 275, y: 405, la: 'end', lx: -16, ly: 5 },
  { id: 'balat', name: 'Balat', x: 290, y: 480, la: 'end', lx: -16, ly: 5 },
  { id: 'maustebasaari', name: 'Maustebasaari', x: 360, y: 525, la: 'start', lx: 16, ly: 5 },
  { id: 'suuribasaari', name: 'Suuri basaari', x: 300, y: 585, la: 'end', lx: -16, ly: 5 },
  { id: 'topkapi', name: 'Topkapın palatsi', x: 425, y: 565, la: 'start', lx: 16, ly: -8 },
  { id: 'hagiasofia', name: 'Hagia Sofia', x: 390, y: 615, la: 'start', lx: 16, ly: 8 },
  { id: 'sinimoskeija', name: 'Sininen moskeija', x: 330, y: 660, la: 'middle', lx: 0, ly: 26 },

  // Aasian puoli ja saaret
  { id: 'uskudar', name: 'Üsküdar', x: 605, y: 545, la: 'start', lx: 16, ly: 5 },
  { id: 'neitsyttorni', name: 'Neitsyttorni', x: 520, y: 645, la: 'middle', lx: 0, ly: 24 },
  { id: 'kadikoy', name: 'Kadıköy', x: 620, y: 690, la: 'start', lx: 16, ly: 5 },
  { id: 'prinssisaaret', name: 'Prinssisaaret', x: 800, y: 895, la: 'middle', lx: 0, ly: -24 },
];

// steps = kuinka monta silmälukua reitin kulkeminen vaatii.
// type 'sea' = lauttareitti; kaupunkilaudalla laivamaksu on lautan lippu.
const IST_EDGES = [
  // Euroopan puoli; sillat ylittävät Kultaisen sarven.
  { a: 'lentoasema', b: 'pierreloti', steps: 3 },
  { a: 'lentoasema', b: 'rumelinlinnoitus', steps: 4 },
  { a: 'lentoasema', b: 'taksim', steps: 4 },
  { a: 'rumelinlinnoitus', b: 'dolmabahce', steps: 2 },
  { a: 'dolmabahce', b: 'taksim', steps: 1 },
  { a: 'taksim', b: 'galata', steps: 1 },
  { a: 'taksim', b: 'pierreloti', steps: 3 },
  { a: 'galata', b: 'maustebasaari', steps: 1 }, // Galatan silta
  { a: 'pierreloti', b: 'balat', steps: 1 },
  { a: 'balat', b: 'suuribasaari', steps: 2 },
  { a: 'suuribasaari', b: 'sinimoskeija', steps: 1 },
  { a: 'suuribasaari', b: 'maustebasaari', steps: 1 },
  { a: 'maustebasaari', b: 'hagiasofia', steps: 1 },
  { a: 'sinimoskeija', b: 'hagiasofia', steps: 1 },
  { a: 'hagiasofia', b: 'topkapi', steps: 1 },

  // Aasian puoli
  { a: 'uskudar', b: 'kadikoy', steps: 2 },
  { a: 'uskudar', b: 'sabihagokcen', steps: 4 },
  { a: 'kadikoy', b: 'sabihagokcen', steps: 3 },

  // Lautat
  { a: 'maustebasaari', b: 'uskudar', steps: 2, type: 'sea', via: [[470, 520], [540, 530]] },
  { a: 'maustebasaari', b: 'kadikoy', steps: 2, type: 'sea', via: [[450, 505], [495, 575], [540, 650], [558, 700], [592, 706]] },
  { a: 'maustebasaari', b: 'neitsyttorni', steps: 2, type: 'sea', via: [[452, 510], [470, 590]] },
  { a: 'galata', b: 'kadikoy', steps: 2, type: 'sea', via: [[460, 500], [510, 600], [545, 650], [558, 700], [592, 706]] },
  { a: 'dolmabahce', b: 'uskudar', steps: 2, type: 'sea', via: [[480, 400], [540, 480]] },
  { a: 'uskudar', b: 'neitsyttorni', steps: 1, type: 'sea', via: [[550, 550], [535, 600]] },
  { a: 'kadikoy', b: 'prinssisaaret', steps: 3, type: 'sea', via: [[690, 800]] },
];

// Kaupunkilaudan "lento" on taksimatka lentoasemalta toiselle.
const IST_AIR_ROUTES = [
  { a: 'lentoasema', b: 'sabihagokcen' },
];

export const ISTANBUL = {
  id: 'istanbul',
  name: 'Sulttaanin timantti',
  boardLabel: 'Istanbul (kaupunki)',
  tagline: 'Sukella suurkaupunkiin: basaarit, palatsit ja Bosporin lautat.',
  ariaLabel: 'Istanbulin aarrekartta',
  // Kaupunkilauta: pienemmät solmut, pienemmät nimet ja kortteleita maastona.
  style: 'city',

  map: {
    ...IST_MAP,
    outlines: [
      IST_MAP.europePoints, IST_MAP.asiaPoints,
      IST_MAP.prinssisaaretPoints, IST_MAP.neitsyttorniPoints,
    ],
  },
  cities: IST_CITIES,
  edges: IST_EDGES,
  airRoutes: IST_AIR_ROUTES,
  islands: ['neitsyttorni', 'prinssisaaret'], // vain lautalla
  minCityDistance: 55,

  tokens: {
    // Pääaarre on Topkapın kuuluisan timantin henkinen sukulainen.
    types: themedTokenTypes({
      star: { name: 'Sulttaanin timantti' },
      mannerAarre: { name: 'Turkoosi', color: '#3aaea6' },
    }),
    // 17 kaupunkia, yksi laatta kussakin.
    counts: { star: 1, mannerAarre: 1, robber: 2, isoAarre: 4, pieniAarre: 9 },
  },

  questions: ISTANBUL_QUESTIONS,
  placeFacts: ISTANBUL_FACTS,

  // Sijainti maailmankartalla ja rosvon kaksintaistelukysymykset.
  duels: [
    {
      q: 'Minä vuonna Konstantinopoli valloitettiin ja siitä tuli osmanien pääkaupunki?',
      options: ['1453', '1071', '1204', '1389', '1517', '1566', '1683', '1923'],
      correct: 0,
      fact: 'Mehmed II valtasi kaupungin 29. toukokuuta 1453 — Bysantin tuhatvuotinen valtakunta päättyi.',
    },
    {
      q: 'Kuinka monelle kukkulalle vanha Konstantinopoli rakennettiin — Rooman tapaan?',
      options: ['seitsemälle', 'kolmelle', 'viidelle', 'kuudelle', 'kahdeksalle', 'yhdeksälle', 'kymmenelle', 'kahdelletoista'],
      correct: 0,
      fact: 'Konstantinopoli rakennettiin Rooman esikuvan mukaan seitsemälle kukkulalle.',
    },
    {
      q: 'Mikä kuuluisa juna toi matkustajia Pariisista Istanbuliin vuodesta 1883?',
      options: ['Idän pikajuna', 'Siperian rata', 'Kultainen nuoli', 'Sininen juna', 'Höyrynuoli', 'Balkanin pikajuna', 'Keisarijuna', 'Hopeanuoli'],
      correct: 0,
      fact: 'Idän pikajuna eli Orient Express päättyi Sirkecin asemalle Kultaisen sarven rannalle.',
    },
    {
      q: 'Miten osmanien laivat pääsivät Kultaiseen sarveen piirityksessä 1453, vaikka lahden suu oli suljettu ketjulla?',
      options: ['ne vedettiin maata pitkin mäen yli', 'ketju katkaistiin sahalla', 'laivat purjehtivat ketjun yli tulvalla', 'ne kannettiin palasina', 'lahteen kaivettiin kanava', 'ketju ostettiin vartijoilta', 'laivat upotettiin ja nostettiin', 'ne lensivät leijilla'],
      correct: 0,
      fact: 'Mehmed II:n laivasto vedettiin yön aikana rasvattuja puita pitkin Galatan mäen yli lahteen.',
    },
    {
      q: 'Kuinka syvä Bosporinsalmi on syvimmillään?',
      options: ['yli sata metriä', 'alle kymmenen metriä', 'noin kaksikymmentä metriä', 'noin kolmekymmentä metriä', 'noin viisikymmentä metriä', 'noin seitsemänkymmentä metriä', 'yli viisisataa metriä', 'yli kilometrin'],
      correct: 0,
      fact: 'Salmi on syvimmillään noin 110 metriä, ja sen läpi kulkee kaksi vastakkaista virtausta.',
    },
    {
      q: 'Kuinka monta myymälää Suuressa basaarissa suunnilleen on?',
      options: ['noin 4 000', 'noin 40', 'noin 100', 'noin 250', 'noin 400', 'noin 1 000', 'noin 10 000', 'noin 40 000'],
      correct: 0,
      fact: 'Katettuja kujia on yli 60 ja myymälöitä noin 4 000 — moni suku on myynyt samassa kojussa polvesta toiseen.',
    },
  ],

  texts: {
    intro: 'Peli alkaa! Etsikää Sulttaanin timantti ja palatkaa lentoasemalle.',
    starFound: (name, city) => `◈ ${name} löysi SULTTAANIN TIMANTIN: ${city}!`,
    starToast: 'SULTTAANIN TIMANTTI!',
    starChase: 'Nyt on kiire kotiin — ensimmäisenä perille ehtinyt voittaa pelin.',
    winStar: 'toi Sulttaanin timantin turvallisesti kotiin',
    winnerStar: (name, money) => `${name} toi Sulttaanin timantin kotiin ${money} punnan kanssa.`,
    // Saapumismerkinnät: yksi arvotaan laudalle saavuttaessa.
    diaries: [
      'Isoisän karttaan on painettu Konstantinopoli. Kaupunki on sittemmin ehtinyt vaihtaa nimeä, valtakuntaa ja rakentaa sillan mantereiden välille. Minä olen vaihtanut hattua.',
      '"Tämä on ainoa kaupunki, joka seisoo kahdella mantereella yhtä aikaa", isoisä kirjoitti, ja lisäsi ettei uskonut sitä ennen kuin näki. Väite pitää yhä. Nykyään mantereiden väli ylitetään metrolla, tunnelissa, salmen alta.',
      'Isoisä laski kaupungissa olleen miljoona asukasta ja piti lukua käsittämättömänä. Nykyään heitä on toistakymmentä miljoonaa, ja jokainen heistä näyttää olevan matkalla samaan suuntaan kuin minä.',
      '"Basaarissa on neljätuhatta puotia ja jokaisessa sama hinta kolmella eri tavalla sanottuna", isoisä valitti. Tinkiminen jatkuu ennallaan. Ainoa muutos on, että vaihtorahat annetaan puhelimella.',
      'Isoisä nousi laivaan Kultaisen sarven suulla ja kirjoitti, että kalanhaju seuraa matkustajaa Wieniin asti. Sama laituri, sama haju, sama kala leivän välissä. Jotkin asiat eivät kaipaa parannusta.',
    ],
  },

  decor: {
    mapLabel: 'ISTANBUL',
    mapLabelPos: { x: 700, y: 950 },
    compass: { x: 140, y: 880, r: 58 },
    waveSkip: [
      { x: 250, y: 855, r: 90 },
      { x: 700, y: 950, r: 130 },
    ],
    ship: { x: 250, y: 845 },
    // Nopan lepopaikka: Marmaranmeri laudan alalaidassa keskellä.
    dieSpot: { x: 0.5, y: 0.9 },
    // Kaupunkilaudalla maasto on kortteleita; rannoilla ja ylängöillä puita.
    terrainBands: [
      { maxY: 260, kind: 'trees' },
      { maxY: 720, kind: 'houses' },
      { maxY: Infinity, kind: 'trees' },
    ],
  },
};
