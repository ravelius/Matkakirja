// Suomi-lauta: ensimmäinen maakohtainen kartta.
//
// Koordinaatisto on 1000 x 1000 yksikköä ja vastaa likimain Suomen karttaa:
//   x = (pituusaste - 18.5) * 71.4    (lännestä 18,5° itään 32,5°)
//   y = (70.6 - leveysaste) * 86.2    (pohjoisesta 70,6° etelään 59,0°)
//
// Kartta on tarkoituksella hieman taiteellinen: rannikko on piirretty
// väljästi, jotta kaupungit ja reitit mahtuvat, ja suurimmat järvet —
// Saimaa, Päijänne, Oulujärvi ja Inarijärvi — on piirretty vetenä maan
// sisään (map.lakes). Savonlinna on Saimaan saarikaupunki, jonne pääsee
// vain järven laivareittejä pitkin, kuten höyrylaivojen aikaan.

import { SUOMI_QUESTIONS, SUOMI_FACTS } from './suomi-questions.js';
import { themedTokenTypes } from '../tokens.js';

const FI_MAP = {
  width: 1000,
  height: 1000,
  mainlandPoints: [
    // Etelärannikko lännestä itään
    [300, 935], [380, 922], [460, 917], [520, 900], [600, 890], [668, 878],
    // Itäraja etelästä pohjoiseen
    [743, 810], [800, 760], [870, 710], [934, 672], [905, 610], [864, 560],
    [835, 517], [828, 460], [835, 405], [764, 328], [740, 270], [714, 181],
    [750, 95], [671, 45],
    // Pohjoisraja ja käsivarsi
    [607, 52], [521, 103], [514, 147], [420, 150], [321, 147], [255, 128],
    [157, 112], [146, 134], [190, 165], [250, 190], [310, 210], [357, 224],
    // Länsiraja ja Pohjanlahden rannikko pohjoisesta etelään
    [386, 328], [400, 415], [425, 430], [480, 495], [415, 515], [322, 585],
    [205, 652], [190, 710], [208, 790], [205, 820], [200, 848], [225, 893],
  ],
  alandPoints: [
    [85, 893], [112, 884], [130, 895], [126, 915], [100, 922], [82, 910],
  ],
  // Suurimmat järvet piirretään vetenä maan sisään.
  lakes: [
    // Saimaa Savonlinnan saarineen; pohjoinen haara kurottaa kohti Kuopiota.
    [
      [688, 780], [678, 750], [682, 720], [695, 700], [715, 690], [735, 700],
      [750, 715], [765, 712], [772, 730], [768, 752], [755, 768], [758, 788],
      [745, 802], [725, 810], [708, 808], [695, 796],
    ],
    // Päijänne
    [
      [500, 810], [492, 780], [498, 750], [510, 738], [522, 752], [518, 782],
      [512, 810], [506, 822],
    ],
    // Oulujärvi
    [
      [600, 555], [618, 544], [638, 541], [645, 552], [635, 561], [615, 562],
    ],
    // Inarijärvi
    [
      [588, 132], [612, 120], [640, 124], [658, 140], [642, 154], [616, 152],
      [598, 145],
    ],
  ],
};

// start = aloituskaupunki (ei laattaa), airport = lentokenttä.
const FI_CITIES = [
  {
    id: 'helsinki', name: 'Helsinki', x: 460, y: 899, start: true, airport: true,
    la: 'start', lx: 26, ly: 16,
    // Takaisin Euroopan laudalle.
    links: [{ pack: 'europe', city: 'helsinki', label: 'Euroopan lauta' }],
  },
  {
    id: 'oulu', name: 'Oulu', x: 498, y: 482, start: true, airport: true,
    la: 'start', lx: 18, ly: 5,
  },

  // Etelä ja länsi
  { id: 'turku', name: 'Turku', x: 269, y: 875, la: 'end', lx: -16, ly: -10 },
  {
    id: 'maarianhamina', name: 'Maarianhamina', x: 103, y: 905, la: 'middle', lx: 0, ly: 32,
    // Ruotsinlaiva vie Tukholmaan — Euroopan laudalle.
    links: [{ pack: 'europe', city: 'tukholma', label: 'Euroopan lauta (laiva Tukholmaan)' }],
  },
  { id: 'tampere', name: 'Tampere', x: 376, y: 784, la: 'end', lx: -16, ly: 5 },
  { id: 'pori', name: 'Pori', x: 236, y: 785, la: 'end', lx: -14, ly: -10 },
  { id: 'vaasa', name: 'Vaasa', x: 223, y: 647, la: 'start', lx: 16, ly: 5 },

  // Järvi-Suomi ja itä
  { id: 'jyvaskyla', name: 'Jyväskylä', x: 518, y: 721, la: 'start', lx: 16, ly: -8 },
  { id: 'lappeenranta', name: 'Lappeenranta', x: 692, y: 822, la: 'middle', lx: 0, ly: 28 },
  { id: 'savonlinna', name: 'Savonlinna', x: 741, y: 752, la: 'start', lx: 18, ly: 5 },
  { id: 'kuopio', name: 'Kuopio', x: 656, y: 665, la: 'end', lx: -16, ly: 5 },
  { id: 'joensuu', name: 'Joensuu', x: 804, y: 690, la: 'start', lx: 16, ly: 5 },
  { id: 'kajaani', name: 'Kajaani', x: 659, y: 550, la: 'start', lx: 16, ly: -8 },

  // Pohjoinen
  { id: 'kemi', name: 'Kemi', x: 433, y: 419, la: 'end', lx: -14, ly: -10 },
  { id: 'rovaniemi', name: 'Rovaniemi', x: 516, y: 353, airport: true, la: 'start', lx: 16, ly: 5 },
  { id: 'kittila', name: 'Kittilä', x: 457, y: 254, la: 'end', lx: -16, ly: 5 },
  { id: 'inari', name: 'Inari', x: 598, y: 162, la: 'start', lx: 16, ly: 10 },
  { id: 'kilpisjarvi', name: 'Kilpisjärvi', x: 164, y: 134, la: 'start', lx: 14, ly: 24 },
  { id: 'utsjoki', name: 'Utsjoki', x: 609, y: 60, la: 'end', lx: -16, ly: 5 },
];

// steps = kuinka monta silmälukua reitin kulkeminen vaatii.
// type 'sea' = laiva- tai lauttareitti; Saimaalla se on järvilaiva.
const FI_EDGES = [
  // Etelä-Suomi
  { a: 'helsinki', b: 'turku', steps: 4 },
  { a: 'helsinki', b: 'tampere', steps: 3 },
  { a: 'helsinki', b: 'lappeenranta', steps: 5 },
  { a: 'turku', b: 'tampere', steps: 3 },
  { a: 'turku', b: 'pori', steps: 2 },
  { a: 'pori', b: 'tampere', steps: 3 },

  // Länsirannikko
  { a: 'pori', b: 'vaasa', steps: 3 },
  { a: 'vaasa', b: 'oulu', steps: 6 },

  // Järvi-Suomi
  { a: 'tampere', b: 'jyvaskyla', steps: 3 },
  { a: 'jyvaskyla', b: 'kuopio', steps: 3 },
  { a: 'kuopio', b: 'kajaani', steps: 3 },
  { a: 'kuopio', b: 'joensuu', steps: 3 },
  { a: 'joensuu', b: 'kajaani', steps: 4 },
  { a: 'lappeenranta', b: 'joensuu', steps: 4 },

  // Pohjoinen
  { a: 'oulu', b: 'kajaani', steps: 4 },
  { a: 'oulu', b: 'kemi', steps: 2 },
  { a: 'kemi', b: 'rovaniemi', steps: 2 },
  { a: 'rovaniemi', b: 'kittila', steps: 3 },
  { a: 'rovaniemi', b: 'inari', steps: 4 },
  { a: 'kittila', b: 'inari', steps: 4 },
  { a: 'kittila', b: 'kilpisjarvi', steps: 6 },
  { a: 'inari', b: 'utsjoki', steps: 2 },

  // Laivareitit: rannikko, saaristo ja Saimaan järvilaivat
  { a: 'helsinki', b: 'maarianhamina', steps: 4, type: 'sea', via: [[390, 945], [290, 940], [180, 935]] },
  { a: 'turku', b: 'maarianhamina', steps: 2, type: 'sea', via: [[195, 905], [150, 902]] },
  { a: 'kuopio', b: 'savonlinna', steps: 3, type: 'sea', via: [[700, 705], [720, 725]] },
  { a: 'savonlinna', b: 'lappeenranta', steps: 2, type: 'sea', via: [[735, 790], [712, 808]] },
];

// Lentoreitit kulkevat suoraan kaupungista toiseen yhdellä vuorolla.
const FI_AIR_ROUTES = [
  { a: 'helsinki', b: 'oulu' },
  { a: 'helsinki', b: 'rovaniemi' },
  { a: 'oulu', b: 'rovaniemi' },
];

export const SUOMI = {
  id: 'suomi',
  name: 'Lapin kulta',
  boardLabel: 'Suomi',
  // Maakohtainen lauta: portti tänne aukeaa mantereen pääkaupungista
  // vastaamalla vaikeaan kysymykseen oikein.
  scope: 'country',
  tagline: 'Kierrä Suomi järviltä tuntureille ja huuhdo Lapin kulta.',
  ariaLabel: 'Suomen aarrekartta',

  map: {
    ...FI_MAP,
    outlines: [FI_MAP.mainlandPoints, FI_MAP.alandPoints],
    lakes: FI_MAP.lakes,
  },
  cities: FI_CITIES,
  edges: FI_EDGES,
  airRoutes: FI_AIR_ROUTES,
  // Maarianhamina on Ahvenanmaan saarella ja Savonlinna Saimaan saarilla.
  islands: ['maarianhamina', 'savonlinna'],
  minCityDistance: 60,

  tokens: {
    // Spektroliitti on Suomen oma jalokivi: sitä löytyy vain Ylämaalta.
    types: themedTokenTypes({
      star: { name: 'Lapin kulta' },
      topaz: { name: 'Spektroliitti', color: '#4a6fb3' },
    }),
    counts: { star: 1, horseshoe: 2, robber: 2, ruby: 2, emerald: 4, topaz: 5, empty: 3 },
  },

  questions: SUOMI_QUESTIONS,
  placeFacts: SUOMI_FACTS,

  // Rosvon kaksintaistelukysymykset.
  duels: [
    {
      q: 'Kuinka monta järveä Suomessa on virallisen laskutavan mukaan?',
      options: ['noin 188 000', 'noin 1 800', 'noin 18 000', 'noin 88 000', 'noin 250 000', 'noin 500 000', 'noin miljoona', 'noin 8 000'],
      correct: 0,
      fact: 'Vähintään viiden aarin kokoisia järviä on laskettu 187 888 — siitä nimitys tuhansien järvien maa.',
    },
    {
      q: 'Mikä on Suomen korkein tunturi?',
      options: ['Halti', 'Saana', 'Ylläs', 'Levi', 'Pallastunturi', 'Ounastunturi', 'Koli', 'Ruka'],
      correct: 0,
      fact: 'Halti (1 324 m) on Käsivarren erämaassa Kilpisjärven lähellä; sen korkein huippu jää Norjan puolelle.',
    },
    {
      q: 'Minä vuonna Suomi itsenäistyi?',
      options: ['1917', '1905', '1918', '1920', '1809', '1863', '1939', '1944'],
      correct: 0,
      fact: 'Eduskunta hyväksyi itsenäisyysjulistuksen 6. joulukuuta 1917 — päivää juhlitaan itsenäisyyspäivänä.',
    },
    {
      q: 'Mikä näistä on Suomen kansalliseepos?',
      options: ['Kalevala', 'Edda', 'Nibelungeinlaulu', 'Beowulf', 'Kanteletar', 'Seitsemän veljestä', 'Tuntematon sotilas', 'Egilin saaga'],
      correct: 0,
      fact: 'Elias Lönnrot kokosi Kalevalan karjalaisista ja suomalaisista kansanrunoista; se ilmestyi 1835 ja laajempana 1849.',
    },
    {
      q: 'Mistä Lapin kultaryntäys alkoi 1800-luvun lopulla?',
      options: ['Ivalojoelta', 'Tornionjoelta', 'Ounasjoelta', 'Kemijoelta', 'Tenojoelta', 'Oulujoelta', 'Kymijoelta', 'Vantaanjoelta'],
      correct: 0,
      fact: 'Ivalojoen kultaryntäys alkoi 1870 — parhaimmillaan joen törmillä asui satoja kullankaivajia. Huuhdontaperinne elää Lapissa yhä.',
    },
    {
      q: 'Mikä suomalainen sana on lainattu kymmeniin kieliin sellaisenaan?',
      options: ['sauna', 'sisu', 'kahvi', 'järvi', 'revontuli', 'poro', 'salmiakki', 'löyly'],
      correct: 0,
      fact: 'Sauna on tunnetuin suomen kielen lainasana maailmalla. Suomessa saunoja on enemmän kuin henkilöautoja.',
    },
  ],

  texts: {
    intro: 'Peli alkaa! Etsikää Lapin kulta ja palatkaa Helsinkiin tai Ouluun.',
    starFound: (name, city) => `◈ ${name} löysi LAPIN KULLAN: ${city}!`,
    starToast: 'LAPIN KULTA!',
    starChase: 'Nyt on kiire kotiin — myös hevosenkengän haltija voi voittaa pelin.',
    winStar: 'toi Lapin kullan turvallisesti kotiin',
    winnerStar: (name, money) => `${name} toi Lapin kullan kotiin ${money} punnan kanssa.`,
    // Saapumismerkinnät: yksi arvotaan laudalle saavuttaessa.
    diaries: [
      'Isoisän kartta sanoo: Suuriruhtinaskunta. Nykyään tämä on maa, jossa hallitus toimii verkossa ja järvetkin on laskettu — 187 888, he tarkistivat. Isoisä olisi vaatinut nähdä laskutoimituksen.',
      '"Kesällä aurinko ei laske ollenkaan pohjoisessa, ja se tekee ihmisistä puheliaita", isoisä kirjoitti. Ensimmäinen väite pitää paikkansa. Toisesta olen kuullut eriäviä näkemyksiä paikallisilta itseltään.',
      'Isoisä matkusti täällä reellä ja piti tervaa maan tärkeimpänä vientituotteena. Terva vaihtui paperiin, paperi puhelimiin ja puhelimet ohjelmistoihin. Metsä on yhä samassa paikassa ja tekee yhä työtä.',
      '"Talvi kestää täällä puoli vuotta ja on itse asiassa vuoden paras aika", isoisä merkitsi muistiin. Pidin sitä pakkasen aiheuttamana harhana, kunnes näin ensimmäisen kunnolla auratun jäätien.',
      'Isoisä ihmetteli, että talonpojankin lapset osasivat lukea. Nykyään täällä ihmetellään, jos joku ei osaa. Muutos on hänen listassaan pieni rivi; minusta se on koko kirjan tärkein.',
    ],
  },

  decor: {
    mapLabel: 'SUOMI',
    mapLabelPos: { x: 250, y: 470 },
    compass: { x: 140, y: 300, r: 58 },
    waveSkip: [
      { x: 250, y: 470, r: 140 },
      { x: 140, y: 300, r: 100 },
      { x: 150, y: 560, r: 90 },
      { x: 150, y: 975, r: 110 },
    ],
    ship: { x: 150, y: 560 },
    serpent: { x: 150, y: 975 },
    // Nopan lepopaikka: Pohjanlahti kartan vasemmassa laidassa.
    dieSpot: { x: 0.1, y: 0.45 },
    // Pohjoisessa tuntureita, muualla metsää.
    terrainBands: [
      { maxY: 310, kind: 'mountains' },
      { maxY: Infinity, kind: 'trees' },
    ],
  },
};
