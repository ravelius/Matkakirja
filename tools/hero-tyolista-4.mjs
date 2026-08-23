/*
 * HEROKUVATYÖLISTA, KIERROS 9 (2 kaupunkia, 6 kuvaa): New York ja
 * San Francisco — P-Amerikan pilottikaupungit (v1047) heti valmiiksi,
 * omistajan priorisointi "herot julisteiden edelle".
 *
 * Sama malli kuin tools/hero-tyolista-3.mjs (RESEPTI v7): koko
 * 'vaaka', kolme kuvaa kaupunkia kohti (aamu, keskipäivä, ilta),
 * jokaisessa eri pääkohde. Kytkentä julkaisussa avauskuvat-taulukon
 * kärkeen (ampari: 'herokoe/hero-<id>-<aika>.png').
 *
 * FAKTAT tarkistettu en-Wikipediasta ja kaupunkien lehtiaineistosta
 * (docs/mantereet-tyoaineisto/faktapohja-*.md) 23.8.2026: mitat,
 * vuosiluvut ja rakenteet ovat prompissa niin kuin ne rakennuksissa
 * ovat. San Franciscon kaapelivaunu on kiva silmukka pelin vuoteen:
 * ensimmäinen linja (Clay Street Hill Railroad) avattiin 1873.
 */

// Reseptin muuttumaton loppuosa — sama kuin hero-tyolista-3.mjs:ssä.
const KUVAKULMA =
  " Shot from a LOW ELEVATED viewpoint at rooftop height, roughly level"
  + " with the landmark's midpoint, camera tilted only gently downward"
  + ' (about 15 degrees): the landmark towers large and dominant in the'
  + ' foreground, its facade fully visible, while streets with people'
  + ' directly below and the city behind stretch into the distance.'
  + ' Professional full-frame drone photograph, natural colours, crisp'
  + ' detail, realistic atmosphere, no stylization. Absolutely no text,'
  + ' no watermark, no borders.';

const p = (kohde, kuvaus, ymparisto) =>
  `A photorealistic wide photograph of ${kohde} dominating the`
  + ` foreground: ${kuvaus}. Behind and below it, smaller:`
  + ` ${ymparisto}.${KUVAKULMA}`;

export const TYOLISTA = [
  /* ---- NEW YORK — Brooklynin silta, Vapaudenpatsas, Empire State. */
  {
    id: 'newyork-aamu',
    tiedosto: 'hero-newyork-aamu.png',
    kaupunki: 'newyork',
    prompti: p(
      'the Brooklyn Bridge over the East River in New York',
      'the two massive granite towers with their pointed double Gothic'
      + ' arches, four main steel cables sweeping down from the tower'
      + ' tops and the dense web of diagonal stay cables fanning from'
      + ' them, the elevated wooden-planked pedestrian promenade running'
      + ' down the centre above the roadways, low early morning sun'
      + ' rising behind Brooklyn so the stone glows warm and the cables'
      + ' draw long thin shadows',
      'the East River busy with ferries, the brick warehouses of the'
      + ' Brooklyn shore on one side, and the dense towers of Lower'
      + ' Manhattan rising on the other bank into the morning haze',
    ),
    selite: 'Brooklynin silta valmistui 1883 neljäntoista rakennusvuoden '
      + 'jälkeen, ja sen 486 metrin jänne oli valmistuessaan maailman '
      + 'pisin riippusillassa.',
  },
  {
    id: 'newyork-keskipaiva',
    tiedosto: 'hero-newyork-keskipaiva.png',
    kaupunki: 'newyork',
    prompti: p(
      'the Statue of Liberty on Liberty Island in New York Harbor',
      'the weathered green copper figure holding her gilded torch high'
      + ' in the right hand and the tablet in the left, the seven-rayed'
      + ' crown, the broken shackles at her feet, standing on the'
      + ' eleven-pointed star-shaped stone fort and tall granite'
      + ' pedestal, high midday sun overhead so the folds of the robe'
      + ' show hard bright edges against a deep blue sky',
      'the open water of the harbor dotted with ferries and sailboats,'
      + ' Ellis Island nearby, and the skyline of Lower Manhattan and'
      + ' the Brooklyn shore stretched across the horizon',
    ),
    selite: 'Vapaudenpatsas oli Ranskan lahja Yhdysvalloille: Frédéric '
      + 'Auguste Bartholdin muotoilema ja Gustave Eiffelin rungolle '
      + 'rakennettu kupariveistos paljastettiin 1886.',
  },
  {
    id: 'newyork-ilta',
    tiedosto: 'hero-newyork-ilta.png',
    kaupunki: 'newyork',
    prompti: p(
      'the Empire State Building in Midtown Manhattan',
      'the slender art deco tower of Indiana limestone rising in'
      + ' setbacks to its rounded stainless-steel crown and antenna'
      + ' mast, the long vertical window strips catching the last warm'
      + ' orange light of sunset from the west while the lower floors'
      + ' fall into blue shadow and the first office lights come on',
      'the dense grid of Midtown with Fifth Avenue traffic and'
      + ' pedestrians far below, water towers on the rooftops, and the'
      + ' evening city stretching south toward the towers of Lower'
      + ' Manhattan under a glowing sky',
    ),
    selite: 'Empire State Building valmistui 1931 vain 410 päivässä, ja '
      + 'sen 381 metrin katto piti maailman korkeimman rakennuksen '
      + 'arvoa neljä vuosikymmentä.',
  },

  /* ---- SAN FRANCISCO — Golden Gate, kaapelivaunu, Alamo Square. */
  {
    id: 'sanfrancisco-aamu',
    tiedosto: 'hero-sanfrancisco-aamu.png',
    kaupunki: 'sanfrancisco',
    prompti: p(
      'the Golden Gate Bridge at the mouth of San Francisco Bay',
      'the two International Orange steel towers rising 227 metres'
      + ' above the strait with their stepped art deco bracing, the two'
      + ' great main cables dipping between them across the 1280 metre'
      + ' main span, morning fog pouring low through the gate beneath'
      + ' the deck so the tower tops stand clear in early sunlight'
      + ' while the water disappears into soft white',
      'the dark headlands of the Marin shore on one side, the green'
      + ' bluffs of the Presidio on the other, and the pale rows of'
      + ' San Francisco houses climbing their hills beyond the fog',
    ),
    selite: 'Golden Gate -silta valmistui 1937, ja sen 1 280 metrin '
      + 'pääjänne oli valmistuessaan maailman pisin — väriksi valittiin '
      + 'sumusta erottuva International Orange.',
  },
  {
    id: 'sanfrancisco-keskipaiva',
    tiedosto: 'hero-sanfrancisco-keskipaiva.png',
    kaupunki: 'sanfrancisco',
    prompti: p(
      'a San Francisco cable car climbing the crest of Hyde Street',
      'the small wooden car in deep maroon and cream livery with open'
      + ' running boards, passengers standing on them holding the'
      + ' poles, the gripman at his tall lever, the twin rails and'
      + ' centre cable slot gleaming in high midday sun as the street'
      + ' drops away steeply behind the car',
      'the plunging line of Hyde Street falling toward the blue bay,'
      + ' Victorian bay-window houses stepping down both sides, and'
      + ' the island of Alcatraz with its pale prison buildings out on'
      + ' the water',
    ),
    selite: 'San Franciscon kaapelivaunut aloittivat 1873, kun Andrew '
      + 'Hallidien Clay Street Hill Railroad voitti mäet vetokaapelilla '
      + '— sama järjestelmä kuljettaa matkustajia yhä.',
  },
  {
    id: 'sanfrancisco-ilta',
    tiedosto: 'hero-sanfrancisco-ilta.png',
    kaupunki: 'sanfrancisco',
    prompti: p(
      'the Painted Ladies, the row of Victorian houses at Alamo Square'
      + ' in San Francisco',
      'the six matching Queen Anne houses shoulder to shoulder on the'
      + ' sloping street, each with a steep gabled roof, rounded'
      + ' bay windows and a small porch stair, their layered pastel'
      + ' paint schemes glowing in the last warm sidelight of sunset'
      + ' from the west',
      'the grassy slope of Alamo Square park with people picnicking,'
      + ' and beyond the rooftops the towers of downtown San Francisco'
      + ' rising against the dusk sky as the city lights begin to'
      + ' come on',
    ),
    selite: 'Alamo Squaren "Painted Ladies" on 1890-luvulla rakennettu '
      + 'viktoriaanisten Queen Anne -talojen rivi, josta tuli kaupungin '
      + 'tunnetuimpia näkymiä.',
  },
];
