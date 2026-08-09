// Lähi-itä-lauta: kaupungit, reitit, kartan piirtotiedot ja teema.
//
// Koordinaatisto on 1000 x 1000 yksikköä ja vastaa suoraan Lähi-idän karttaa:
//   x = (pituusaste - 24) * 25      (lännestä 24° itään 64°)
//   y = (44 - leveysaste) * 29.4    (pohjoisesta 44° etelään 10°)
//
// Meret ovat mantereen "sisäänvetoja": Punainenmeri ja Persianlahti työntyvät
// rannikon väliin, Mustameri ja Kaspianmeri avautuvat kartan ylälaidasta.
// Kaupungit ovat todellisilla paikoillaan; muutamaa on siirretty hiukan,
// jotta nimet ja nappulat mahtuvat laudalle.

import { MIDDLEEAST_QUESTIONS, MIDDLEEAST_FACTS } from './middleeast-questions.js';
import { themedTokenTypes } from '../tokens.js';

const ME_MAP = {
  width: 1000,
  height: 1000,
  mainlandPoints: [
    [-45, 1045], [-45, 364.6], [62.5, 370.4], [125, 385.1], [170.0, 379.3], [197.5, 367.5],
    [222.5, 379.3], [255.0, 371.9], [272.5, 341.0], [278.7, 311.6], [290.0, 276.4],
    [296.3, 244.0], [300.0, 211.7], [265.0, 223.4], [215.0, 232.3], [165.0, 226.4],
    [130.0, 223.4], [90.0, 211.7], [75.0, 188.2], [62.5, 161.7], [55.0, 135.2], [53.7, 107.3],
    [90.0, 102.9], [126.3, 86.7], [182.5, 73.5], [237.5, 58.8], [280.0, 57.3], [325.0, 85.3],
    [385.0, 89.7], [432.5, 76.4], [440.0, 35.3], [450.0, -45], [580.0, -45], [607.5, 64.7],
    [633.8, 105.8], [625.0, 141.1], [623.8, 176.4], [645.0, 197.0], [687.5, 213.1],
    [732.5, 210.2], [750.0, 191.1], [742.5, 147.0], [725.0, 100.0], [720.0, 52.9],
    [732.5, -45], [1045, -45], [1045, 552.7], [937.5, 555.7], [887.5, 546.8], [850.0, 538.0],
    [832.5, 514.5], [815.0, 499.8], [775.0, 508.6], [725.0, 488.0], [687.5, 470.4],
    [657.5, 435.1], [625.0, 411.6], [615.0, 407.2], [605.0, 426.3], [615.0, 458.6],
    [637.5, 491.0], [660.0, 520.4], [667.5, 541.0], [677.5, 527.7], [688.7, 532.1],
    [690.0, 558.6], [720.0, 583.6], [757.5, 577.7], [785.0, 561.5], [803.8, 532.1],
    [810.0, 520.4], [815.0, 541.0], [842.5, 570.4], [867.5, 601.2], [895.0, 632.1],
    [872.5, 688.0], [840.0, 726.2], [797.5, 767.3], [752.5, 796.7], [705.0, 826.1],
    [655.0, 852.6], [605.0, 882.0], [560.0, 899.6], [527.5, 921.7], [500.0, 923.2],
    [481.2, 905.5], [467.5, 852.6], [460.0, 805.6], [437.5, 758.5], [412.5, 711.5],
    [385.0, 667.4], [372.5, 623.3], [357.5, 582.1], [327.5, 546.8], [295.0, 505.7],
    [272.5, 473.3], [276.2, 452.8], [275.0, 429.2], [262.5, 458.6], [256.2, 474.8],
    [240.0, 458.6], [220.0, 426.3], [213.7, 411.6], [215.0, 435.1], [235.0, 464.5],
    [250.0, 493.9], [270.0, 535.1], [292.5, 579.2], [317.5, 629.2], [335.0, 676.2],
    [355.0, 726.2], [375.0, 782.0], [400.0, 835.0], [432.5, 876.1], [462.5, 911.4],
    [477.5, 927.6], [487.5, 946.7], [530.0, 970.2], [575.0, 979.0], [625.0, 987.8],
    [665.0, 998.1], [665.0, 1045],
  ],
  cyprusPoints: [
    [207.5, 245.5], [240.0, 252.8], [263.7, 247.0], [247.5, 263.1], [225.0, 276.4],
    [210.0, 273.4], [206.2, 261.7],
  ],
};

// start = aloituskaupunki (ei laattaa), airport = lentokenttä.
const ME_CITIES = [
  {
    id: 'istanbul', name: 'Istanbul', wiki: 'Istanbul', ambience: 'basaari', x: 125, y: 88, start: true, airport: true,
    // Vaelluksessa Istanbulista voi laskeutua kaupunkitason laudalle.
    links: [
      { pack: 'istanbul', city: 'lentoasema', label: 'Istanbulin kaupunkilauta' },
      { pack: 'europe', city: 'istanbul', label: 'Euroopan lauta' },
    ],
  },
  {
    id: 'kairo', name: 'Kairo', wiki: 'Kairo', ambience: 'basaari', x: 181, y: 410, start: true, airport: true,
    // Sama kaupunki on myös Afrikan laudalla.
    links: [
      { pack: 'africa', city: 'kairo', label: 'Afrikan lauta' },
      { pack: 'maailma', city: 'kairo', label: 'Maailma-lauta' },
    ],
  },

  { id: 'izmir', name: 'Izmir', wiki: 'İzmir', ambience: 'satama', x: 78, y: 164, la: 'start', lx: 16, ly: 5 },
  { id: 'ankara', name: 'Ankara', wiki: 'Ankara', ambience: 'kaupunki', x: 221, y: 120 },
  { id: 'kapadokia', name: 'Kappadokia', wiki: 'Kappadokia', ambience: 'ylanko', x: 276, y: 166, la: 'start', lx: 16, ly: 5 },
  { id: 'nikosia', name: 'Nikosia', wiki: 'Nikosia', ambience: 'kaupunki', x: 234, y: 260, la: 'middle', lx: 0, ly: -22 },
  { id: 'halab', name: 'Aleppo', wiki: 'Aleppo', ambience: 'basaari', x: 329, y: 229, la: 'start', lx: 16, ly: 5 },
  { id: 'damaskos', name: 'Damaskos', wiki: 'Damaskos', ambience: 'basaari', x: 308, y: 309, la: 'start', lx: 16, ly: 5 },
  { id: 'jerusalem', name: 'Jerusalem', wiki: 'Jerusalem', ambience: 'kaupunki', x: 268, y: 364, la: 'start', lx: 16, ly: 5 },
  { id: 'petra', name: 'Petra', wiki: 'Petra (kaupunki)', ambience: 'aavikko', x: 302, y: 418, la: 'start', lx: 16, ly: 5 },
  { id: 'siinai', name: 'Siinai', wiki: 'Siinai', ambience: 'aavikko', x: 249, y: 454, la: 'end', lx: -16, ly: 22 },
  { id: 'luxor', name: 'Luxor', wiki: 'Luxor', ambience: 'aavikko', x: 216, y: 538, la: 'end', lx: -16, ly: 5 },
  { id: 'medina', name: 'Medina', wiki: 'Medina', ambience: 'aavikko', x: 390, y: 574, la: 'start', lx: 16, ly: 5 },
  { id: 'mekka', name: 'Mekka', wiki: 'Mekka', ambience: 'basaari', x: 395, y: 664, airport: true, la: 'start', lx: 16, ly: 5 },
  { id: 'riad', name: 'Riad', wiki: 'Riad', ambience: 'aavikko', x: 568, y: 570, airport: true },
  { id: 'rubalkhali', name: 'Rub al-Khali', wiki: 'Rub al-Khali', ambience: 'aavikko', x: 675, y: 691, la: 'middle', lx: 0, ly: -22 },
  { id: 'sana', name: 'Sana', wiki: 'Sanaa', ambience: 'basaari', x: 505, y: 842, la: 'start', lx: 16, ly: 5 },
  { id: 'aden', name: 'Aden', wiki: 'Aden', ambience: 'satama', x: 526, y: 917 },
  { id: 'salalah', name: 'Salalah', wiki: 'Salala', ambience: 'meri', x: 752, y: 794 },
  { id: 'masqat', name: 'Masqat', wiki: 'Masqat', ambience: 'satama', x: 864, y: 600, la: 'start', lx: 16, ly: 5 },
  {
    id: 'dubai', name: 'Dubai', wiki: 'Dubai', ambience: 'satama', x: 782, y: 565, start: true, airport: true, la: 'middle', lx: 0, ly: 26,
    // Persianlahden vaihtoasema: täältä lähtee pitkä lento itään.
    links: [{ pack: 'maailma', city: 'mumbai', label: 'Maailma-lauta' }],
  },
  { id: 'doha', name: 'Doha', wiki: 'Doha', ambience: 'satama', x: 688, y: 550, la: 'middle', lx: 0, ly: 26 },
  { id: 'kuwait', name: 'Kuwait', wiki: 'Kuwait (kaupunki)', ambience: 'satama', x: 600, y: 430, la: 'end', lx: -16, ly: 5 },
  { id: 'bagdad', name: 'Bagdad', wiki: 'Bagdad', ambience: 'basaari', x: 509, y: 314, airport: true },
  { id: 'mosul', name: 'Mosul', wiki: 'Mosul', ambience: 'kaupunki', x: 478, y: 225 },
  { id: 'tabriz', name: 'Tabriz', wiki: 'Tabriz', ambience: 'basaari', x: 558, y: 174 },
  {
    id: 'teheran', name: 'Teheran', wiki: 'Teheran', ambience: 'kaupunki', x: 685, y: 244, airport: true, la: 'start', lx: 16, ly: 5,
    // Sama kaupunki on myös Aasian laudalla.
    links: [{ pack: 'asia', city: 'teheran', label: 'Aasian lauta' }],
  },
  { id: 'isfahan', name: 'Isfahan', wiki: 'Isfahan', ambience: 'basaari', x: 692, y: 334, la: 'start', lx: 16, ly: 5 },
  { id: 'persepolis', name: 'Persepolis', wiki: 'Persepolis', ambience: 'aavikko', x: 722, y: 414, la: 'start', lx: 16, ly: 5 },
];

// steps = kuinka monta silmälukua reitin kulkeminen vaatii.
// type 'sea' = laivareitti; via = piirto- ja tarkistuspisteet veden päällä.
const ME_EDGES = [
  // Anatolia ja Levantti
  { a: 'istanbul', b: 'izmir', steps: 2 },
  { a: 'istanbul', b: 'ankara', steps: 3 },
  { a: 'izmir', b: 'ankara', steps: 3 },
  { a: 'ankara', b: 'kapadokia', steps: 2 },
  { a: 'kapadokia', b: 'halab', steps: 3 },
  { a: 'kapadokia', b: 'tabriz', steps: 5 },
  { a: 'halab', b: 'damaskos', steps: 2 },
  { a: 'halab', b: 'mosul', steps: 4 },
  { a: 'damaskos', b: 'bagdad', steps: 5 },
  { a: 'damaskos', b: 'jerusalem', steps: 2 },
  { a: 'jerusalem', b: 'kairo', steps: 3 },
  { a: 'jerusalem', b: 'petra', steps: 2 },
  { a: 'petra', b: 'siinai', steps: 2 },
  { a: 'petra', b: 'medina', steps: 4 },
  { a: 'siinai', b: 'kairo', steps: 2 },
  { a: 'kairo', b: 'luxor', steps: 3 },

  // Arabian niemimaa
  { a: 'medina', b: 'mekka', steps: 2 },
  { a: 'medina', b: 'riad', steps: 4 },
  { a: 'mekka', b: 'riad', steps: 4 },
  { a: 'mekka', b: 'sana', steps: 4 },
  { a: 'sana', b: 'aden', steps: 2 },
  { a: 'riad', b: 'kuwait', steps: 3 },
  { a: 'riad', b: 'doha', steps: 3 },
  { a: 'riad', b: 'rubalkhali', steps: 3 },
  { a: 'rubalkhali', b: 'salalah', steps: 3 },
  { a: 'rubalkhali', b: 'sana', steps: 4 },
  { a: 'doha', b: 'dubai', steps: 2 },
  { a: 'salalah', b: 'masqat', steps: 4 },

  // Kaksoisvirranmaa ja Iran
  { a: 'kuwait', b: 'bagdad', steps: 4 },
  { a: 'kuwait', b: 'persepolis', steps: 4, via: [[618, 398], [668, 392]] },
  { a: 'bagdad', b: 'mosul', steps: 3 },
  { a: 'bagdad', b: 'isfahan', steps: 4 },
  { a: 'mosul', b: 'tabriz', steps: 3 },
  { a: 'tabriz', b: 'teheran', steps: 3 },
  { a: 'teheran', b: 'isfahan', steps: 2 },
  { a: 'isfahan', b: 'persepolis', steps: 2 },

  // Laivareitit
  { a: 'izmir', b: 'nikosia', steps: 3, type: 'sea', via: [[85, 230], [150, 258]] },
  { a: 'nikosia', b: 'halab', steps: 2, type: 'sea' },
  { a: 'nikosia', b: 'kairo', steps: 3, type: 'sea', via: [[215, 330]] },
  { a: 'siinai', b: 'mekka', steps: 4, type: 'sea', via: [[270, 500], [308, 540], [350, 610]] },
  { a: 'mekka', b: 'aden', steps: 4, type: 'sea', via: [[395, 690], [420, 750], [445, 810], [470, 895]] },
  { a: 'aden', b: 'salalah', steps: 3, type: 'sea', via: [[600, 905], [690, 860]] },
  { a: 'masqat', b: 'dubai', steps: 2, type: 'sea', via: [[850, 544], [818, 503], [797, 516]] },
  { a: 'doha', b: 'kuwait', steps: 3, type: 'sea', via: [[670, 490], [630, 455]] },
];

// Lentoreitit kulkevat suoraan kaupungista toiseen yhdellä vuorolla.
const ME_AIR_ROUTES = [
  { a: 'istanbul', b: 'kairo' },
  { a: 'istanbul', b: 'bagdad' },
  { a: 'bagdad', b: 'teheran' },
  { a: 'bagdad', b: 'riad' },
  { a: 'kairo', b: 'mekka' },
  { a: 'mekka', b: 'dubai' },
  { a: 'riad', b: 'dubai' },
  { a: 'dubai', b: 'teheran' },
];

export const MIDDLE_EAST = {
  id: 'middleeast',
  name: 'Sheban kuningattaren aarre',
  boardLabel: 'Lähi-itä',
  tagline: 'Etsi Sheban kuningattaren aarre basaarien ja aavikoiden kätköistä.',
  ariaLabel: 'Lähi-idän aarrekartta',

  map: { ...ME_MAP, outlines: [ME_MAP.mainlandPoints, ME_MAP.cyprusPoints] },
  cities: ME_CITIES,
  edges: ME_EDGES,
  airRoutes: ME_AIR_ROUTES,
  islands: ['nikosia'], // Kypros on oma saarensa, jonne pääsee vain laivalla
  minCityDistance: 60,

  tokens: {
    // Turkoosi on saanut nimensä Turkista, jonka kautta kivi kulki Eurooppaan.
    types: themedTokenTypes({
      star: { name: 'Sheban kuningattaren aarre' },
      ruby: {
        name: 'Messinkilamppu', color: '#c88f2b',
        kuva: 'Oil Lamp MET DP246007.jpg',
        kuvaLahde: 'Metropolitan Museum of Art, Wikimedia Commons (CC0)',
      },
      emerald: {
        name: 'Suitsukepihka', color: '#d8c690',
        kuva: 'Frankincense 2005-12-31.jpg',
        kuvaLahde: 'snotch, Wikimedia Commons (PD)',
      },
      topaz: {
        name: 'Sahramipussi', color: '#e05c20',
        kuva: 'Saffron threads in a glass jar ( Viora Saffron packaging).jpg',
        kuvaLahde: 'ulleo, Wikimedia Commons (CC0)',
      },
    }),
    counts: { star: 1, horseshoe: 2, robber: 3, ruby: 3, emerald: 4, topaz: 6, empty: 7 },
  },

  questions: MIDDLEEAST_QUESTIONS,
  placeFacts: MIDDLEEAST_FACTS,

  // Sijainti maailmankartalla ja rosvon kaksintaistelukysymykset.
  duels: [
    {
      q: 'Mikä näistä kaupungeista EI ole pääkaupunki?',
      options: ['Jidda', 'Riad', 'Doha', 'Sana', 'Bagdad', 'Teheran', 'Ankara', 'Masqat'],
      correct: 0,
      fact: 'Jidda on Saudi-Arabian suuri satamakaupunki — maan pääkaupunki on Riad.',
    },
    {
      q: 'Minä vuonna Suezin kanava avattiin?',
      options: ['1869', '1799', '1825', '1848', '1888', '1901', '1914', '1936'],
      correct: 0,
      fact: 'Kanava avattiin marraskuussa 1869 kymmenen vuoden rakennustöiden jälkeen.',
    },
    {
      q: 'Mikä antiikin seitsemästä ihmeestä sijaitsi Babylonissa?',
      options: ['riippuvat puutarhat', 'Aleksandrian majakka', 'Rodoksen kolossi', 'Zeuksen patsas', 'Artemiin temppeli', 'Mausoleumi', 'sfinksi', 'Pergamonin alttari'],
      correct: 0,
      fact: 'Babylonin riippuvat puutarhat luettiin maailman ihmeisiin, vaikka niiden tarkkaa paikkaa ei ole löydetty.',
    },
    {
      q: 'Mistä kielestä sanat basaari ja karavaani ovat peräisin?',
      options: ['persiasta', 'arabiasta', 'turkista', 'hepreasta', 'kreikasta', 'latinasta', 'sanskritista', 'hindistä'],
      correct: 0,
      fact: 'Molemmat sanat kulkeutuivat persiasta kauppareittien mukana Euroopan kieliin.',
    },
    {
      q: 'Mikä meri on maailman suolaisin avomeri?',
      options: ['Punainenmeri', 'Välimeri', 'Mustameri', 'Kaspianmeri', 'Itämeri', 'Arabianmeri', 'Egeanmeri', 'Adrianmeri'],
      correct: 0,
      fact: 'Punaisenmeren suolapitoisuus on avomerten korkein, noin neljä prosenttia — kuuma ilmasto haihduttaa vettä nopeasti.',
    },
    {
      q: 'Mikä valtakunta hallitsi suurta osaa Lähi-idästä 1500-luvulta ensimmäiseen maailmansotaan asti?',
      options: ['Osmanien valtakunta', 'Rooman valtakunta', 'Bysantti', 'Mongolivaltakunta', 'Babylonia', 'Assyria', 'Aleksanterin valtakunta', 'Abbasidikalifaatti'],
      correct: 0,
      fact: 'Osmanit hallitsivat Istanbulista käsin suurta osaa Lähi-itää noin 400 vuoden ajan.',
    },
  ],

  texts: {
    intro: 'Peli alkaa! Etsikää Sheban kuningattaren aarre ja palatkaa Istanbuliin, Kairoon tai Dubaihin.',
    starFound: (name, city) => `◈ ${name} löysi SHEBAN KUNINGATTAREN AARTEEN kaupungista ${city}!`,
    starToast: 'SHEBAN AARRE!',
    starChase: 'Nyt on kiire kotiin — myös hevosenkengän haltija voi voittaa pelin.',
    winStar: 'toi Sheban kuningattaren aarteen turvallisesti kotiin',
    winnerStar: (name, money) => `${name} toi Sheban kuningattaren aarteen kotiin ${money} punnan kanssa.`,
    // Saapumismerkinnät: yksi arvotaan laudalle saavuttaessa.
    // KAISTA B: tälle laudalle tarvitaan vielä vähintään neljä merkintää.
    diaries: [
      'Basaari tuoksuu täsmälleen kirjojeni kuvauksilta. Kauppias ottaa puntani vastaan ystävällisesti — museokappaleita, hän sanoo, ja antaa vaihtorahat sovelluksella.',
      'Isoisän kartassa tämä alue on jaettu kahden keisarikunnan kesken ja loput on merkitty tyhjäksi. Nyt tässä on parikymmentä valtiota, joiden rajat piirsivät pääosin eurooppalaiset virkamiehet viivoittimella. Se näkyy kartassa yhä.',
      '"Aavikko on este, joka on kierrettävä", kirjoitti isoisä. Karavaanit olivat kulkeneet sen halki tuhat vuotta ennen häntä, ja nyt sen yli lennetään kuudessa tunnissa. Este oli hänen mielikuvituksessaan.',
      'Isoisä ihaili suitsuketta, silkkiä ja terästä ja piti niitä idän tuotteina. Ne olivat idän keksintöjä, mikä on eri asia, ja sen hän kirjoitti muistiin vasta kolmannella sivulla.',
      '"Öljyllä ei ole täällä käyttöä", merkitsi isoisä Persianlahden rannalla. Yhden lauseen kohdalla hän oli väärässä perusteellisemmin kuin koko muussa päiväkirjassaan yhteensä.',
      'Isoisä kirjasi tarkasti kaupunkien iän ja sai luvut oikein: Damaskos, Aleppo, Jeriko. Sivun alalaidassa hän lisää, että meidän Lontoomme on tähän verrattuna uudisrakennus. Se on hänen rehellisin lauseensa.',
    ],
    // Isoisän vihjeet laudan pääaarteesta: suunta tai seutu, ei koskaan
    // kaupungin nimeä.
    starHints: {
      izmir: 'Egeanmeren rannalla on satama, jota kutsuttiin antiikissa toisella nimellä. Sen lähellä makaa marmorikaupunki, jonka satama liettyi umpeen.',
      ankara: 'Sisämaan ylängöllä noin kilometrin korkeudessa on kaupunki, joka tunnetaan vuohistaan ja niiden pehmeästä villasta.',
      kapadokia: 'Keski-Anatolian tuhkakivialueella on kartiomaisia kivitorneja ja kokonaisia maanalaisia kaupunkeja, joiden käytävät suljettiin vierivillä kivillä.',
      nikosia: 'Välimeren itäisen saaren keskellä sisämaassa on pääkaupunki, jossa kuulee kahta kieltä samalla torilla.',
      halab: 'Pohjoisessa kauppareittien risteyksessä on kaupunki, jonka katetut basaarikujat jatkuvat kilometrikaupalla ja jossa keitetään saippuaa oliiviöljystä.',
      damaskos: 'Vuorilta tulevan joen kastelemalla keitaalla on kaupunki, joka on ollut asuttu yhtäjaksoisesti pidempään kuin melkein mikään muu.',
      jerusalem: 'Vuoriston harjanteella muurien sisällä on kaupunki, jonka samoja kortteleita kolme uskontoa pitää pyhinä.',
      petra: 'Etelän autiomaassa kapean rotkon päässä on kallioon veistetty kaupunki, joka eli kalliokouruihin kerätystä sadevedestä.',
      siinai: 'Kahden lahden väliin jäävällä niemimaalla on graniittivuoria ja niiden keskellä luostari, joka on toiminut yli tuhat vuotta.',
      luxor: 'Suuren joen varrella sisämaassa on temppelikaupunki, jonka länsirannan kallioihin on hakattu kuninkaiden hautoja.',
      medina: 'Punaisenmeren takana sisämaan keitaalla on kaupunki, joka elää taateleista ja pyhiinvaeltajista. Se on islamin toiseksi pyhin paikka.',
      mekka: 'Länsirannikon vuorten laaksossa on kaupunki, jonne miljoona ihmistä saapuu vuosittain samaan aikaan. Rukoiltaessa käännytään kaikkialla maailmassa sitä kohti.',
      riad: 'Keskellä Arabian niemimaata aavikon ympäröimänä on savitiilikaupunki, jonka laidalla käydään kamelikauppaa.',
      rubalkhali: 'Niemimaan etelävyöhykkeellä on maailman suurin yhtenäinen hiekka-aavikko, jonka dyynit kohoavat satoihin metreihin.',
      sana: 'Vuorten keskellä yli kahden kilometrin korkeudessa on kaupunki, jonka savitiilitalot ovat kahdeksankerroksisia ja ikkunat kipsikoristeisia.',
      aden: 'Niemimaan eteläkärjessä sammuneen tulivuoren kraatterissa on satama, jossa höyrylaivat täydensivät hiilivarastonsa.',
      salalah: 'Kaakkoisrannikon nurkassa kesämonsuuni tekee maisemasta vihreän. Sieltä on viety suitsuketta faaraoiden ajoista asti.',
      masqat: 'Kaakkoisrannikolla jyrkkien vuorten ja meren välissä on satama, jonka kallioilla seisoo vanhoja linnoituksia.',
      dubai: 'Persianlahden etelärannalla on helmenkalastajien kylä lahdelman varrella. Sieltä purjehditaan talvisin Intiaan.',
      doha: 'Persianlahteen työntyvän niemimaan itärannalla on helmenkalastajien kaupunki, jossa juomavesi on arvokkaampaa kuin helmet.',
      kuwait: 'Persianlahden pohjoisimmassa pohjukassa on luonnonsatama, josta purjelaivat lähtevät Intiaan ja Itä-Afrikkaan.',
      bagdad: 'Kaksoisvirranmaan itäisen virran rannalla on kaupunki, joka oli tuhat vuotta sitten maailman oppinein.',
      mosul: 'Saman virran varrella pohjoisempana on kaupunki, jonka vastarannalla ovat muinaisen suurkaupungin kummut.',
      tabriz: 'Luoteisen ylängön laaksossa on kaupunki, jonka katettuun basaariin eksyy ja jossa solmitaan mattoja vientiin.',
      teheran: 'Lumihuippuisen vuoren juurella ylätasangolla on kaupunki, johon vesi tuodaan vuorilta maanalaisia kanavia pitkin.',
      isfahan: 'Keskellä maata joen varrella on kaupunki, jonka aukiota ja sinisiä kaakelikupoleita sananlasku kutsuu puoleksi maailmaksi.',
      persepolis: 'Lounaisen ylätasangon reunalla makaa palatsin rauniot, joiden reliefeissä kansat tuovat lahjoja kuninkaalle.',
    },
  },

  decor: {
    mapLabel: 'LÄHI-ITÄ',
    mapLabelPos: { x: 900, y: 940 },
    compass: { x: 78, y: 305, r: 62 },
    // Aaltoja ei piirretä näihin kohtiin: laivadoodle, meripeto ja karttanimi.
    waveSkip: [
      { x: 675, y: 110, r: 95 },
      { x: 780, y: 900, r: 110 },
      { x: 900, y: 940, r: 135 },
    ],
    ship: { x: 675, y: 110 },
    serpent: { x: 780, y: 900 },
    // Nopan lepopaikka suhteellisina koordinaatteina: Arabianmeri oikeassa alakulmassa.
    dieSpot: { x: 0.87, y: 0.87 },
    // Pohjoisessa Anatolian ja Elburzin vuoret, keskellä aavikkoa,
    // etelässä Jemenin ylängöt.
    terrainBands: [
      { maxY: 230, kind: 'mountains' },
      { maxY: 820, kind: 'dunes' },
      { maxY: Infinity, kind: 'mountains' },
    ],
  },
};
