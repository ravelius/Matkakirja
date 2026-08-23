/*
 * HEROKUVATYÖLISTA, KIERROS 10 (4 kaupunkia, 12 kuvaa): Rio de
 * Janeiro, Buenos Aires, Sydney ja Auckland — v1049:n pilottikaupungit
 * heti herojen piiriin (omistajan priorisointi "herot julisteiden
 * edelle").
 *
 * Sama malli kuin tools/hero-tyolista-4.mjs (RESEPTI v7): koko
 * 'vaaka', kolme kuvaa kaupunkia kohti (aamu, keskipäivä, ilta),
 * jokaisessa eri pääkohde. Kytkentä julkaisussa avauskuvat-taulukon
 * kärkeen (ampari: 'herokoe/hero-<id>-<aika>.png').
 *
 * FAKTAT tarkistettu kaupunkien faktapohjista (docs/mantereet-
 * tyoaineisto/faktapohja-*.md + riippumattomat tarkistukset) ja
 * en-Wikipediasta 23.8.2026: mitat, vuodet ja rakenteet ovat
 * prompteissa niin kuin ne kohteissa ovat. Herot kuvaavat NYKYISTÄ
 * kaupunkia (Helsinki-malli), joten Kristus-patsas, oopperatalo ja
 * Sky Tower ovat tässä oikein, vaikka ne ovat lehtien 1873-kehyksessä
 * anakronismeja.
 */

// Reseptin muuttumaton loppuosa — sama kuin hero-tyolista-3/4:ssä.
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
  /* ---- RIO — Kristus-patsas, Sokerileipä, Copacabana. */
  {
    id: 'rio-aamu',
    tiedosto: 'hero-rio-aamu.png',
    kaupunki: 'rio',
    prompti: p(
      'the Christ the Redeemer statue on Corcovado mountain in Rio de'
      + ' Janeiro',
      'the pale soapstone-clad art deco figure with arms outstretched,'
      + ' thirty metres tall on its eight-metre pedestal at the top of'
      + ' the steep forested granite peak, early morning sun from the'
      + ' east lighting the face and chest while thin cloud drifts just'
      + ' below the summit platform',
      'the dark green slopes of the Tijuca forest falling away, the'
      + ' white apartment blocks of Botafogo and Flamengo along the'
      + ' curving bays, the granite dome of Sugarloaf at the mouth of'
      + ' Guanabara Bay and the sea beyond',
    ),
    selite: 'Corcovadon huipulla seisova Kristus Vapahtaja valmistui '
      + '1931: 30-metrinen art deco -veistos verhottiin vuolukivilaatoin, '
      + 'ja sen jalusta on kahdeksan metriä.',
  },
  {
    id: 'rio-keskipaiva',
    tiedosto: 'hero-rio-keskipaiva.png',
    kaupunki: 'rio',
    prompti: p(
      'the Sugarloaf Mountain cable car above Rio de Janeiro',
      'the rounded glass-walled cabin suspended from twin steel cables'
      + ' high over the water, climbing toward the bare 396-metre'
      + ' granite dome of the Sugarloaf, high midday sun so the rock'
      + ' glows warm grey against a deep blue sky and the cabin throws'
      + ' a small hard shadow on the slope',
      'the lower green hump of Morro da Urca with its station, the'
      + ' red-roofed houses of Urca along the shore, white beaches,'
      + ' sailboats on Guanabara Bay and the long city shoreline'
      + ' stretching toward Corcovado in the haze',
    ),
    selite: 'Sokerileivän köysirata avattiin 27. lokakuuta 1912, ja se '
      + 'nousee kahdessa osuudessa Morro da Urcan kautta 396 metrin '
      + 'graniittikuvulle.',
  },
  {
    id: 'rio-ilta',
    tiedosto: 'hero-rio-ilta.png',
    kaupunki: 'rio',
    prompti: p(
      'Copacabana beach and its curving promenade in Rio de Janeiro',
      'the four-kilometre crescent of pale sand with the black-and-white'
      + ' Portuguese-pavement wave mosaic of the promenade sweeping'
      + ' along it, the last warm light of sunset from behind the hills'
      + ' turning the sea pink and the sand golden, people as small'
      + ' distant figures on the beach and the pavement',
      'the unbroken wall of white hotel and apartment towers along the'
      + ' avenue with windows beginning to light up, the twin peak of'
      + ' the Dois Irmãos hills at the far end of the bay and the'
      + ' darkening ocean',
    ),
    selite: 'Copacabanan neljän kilometrin hiekkakaarta reunustaa '
      + 'Roberto Burle Marxin suunnittelema mustavalkoinen '
      + 'aaltomosaiikkipromenaadi, joka valmistui nykyasuunsa 1970.',
  },

  /* ---- BUENOS AIRES — Obeliski, Casa Rosada, Recoleta. */
  {
    id: 'buenosaires-aamu',
    tiedosto: 'hero-buenosaires-aamu.png',
    kaupunki: 'buenosaires',
    prompti: p(
      'the Obelisco on Avenida 9 de Julio in Buenos Aires',
      'the slender white 67-metre concrete obelisk rising from its'
      + ' plaza in the middle of the immensely wide avenue, low morning'
      + ' sun from the east catching its point and casting a long'
      + ' shadow across the lanes, rush-hour traffic and crossing'
      + ' pedestrians far below as small figures',
      'the many parallel lanes of Avenida 9 de Julio lined with purple'
      + ' flowering jacaranda trees, theatre facades and office blocks'
      + ' on both sides, and the flat grid of the city stretching to'
      + ' the hazy horizon of the Río de la Plata',
    ),
    selite: 'Avenida 9 de Julion Obeliski pystytettiin 1936 kaupungin '
      + 'perustamisen nelisataavuotisjuhlaan, ja se on 67,5 metriä '
      + 'korkea.',
  },
  {
    id: 'buenosaires-keskipaiva',
    tiedosto: 'hero-buenosaires-keskipaiva.png',
    kaupunki: 'buenosaires',
    prompti: p(
      'the Casa Rosada presidential palace on Plaza de Mayo in Buenos'
      + ' Aires',
      'the pink-washed palace with its central arched loggia, paired'
      + ' columns and side wings joined by the great archway, the'
      + ' Argentine flag flying above the roofline, high midday sun'
      + ' making the pink render glow against a clear blue sky',
      'the open Plaza de Mayo with its central Pirámide de Mayo'
      + ' monument and palm trees, pedestrians as small figures on the'
      + ' paving, the white Cabildo and the cathedral colonnade around'
      + ' the square and the towers of the financial district behind',
    ),
    selite: 'Casa Rosada sai nykyhahmonsa 1880-luvulla, kun '
      + 'presidentinlinna ja sen viereinen postipalatsi yhdistettiin '
      + 'suurella kaariportilla — vaaleanpunainen väri on talon '
      + 'tunnus.',
  },
  {
    id: 'buenosaires-ilta',
    tiedosto: 'hero-buenosaires-ilta.png',
    kaupunki: 'buenosaires',
    prompti: p(
      'the Puente de la Mujer footbridge in Puerto Madero, Buenos'
      + ' Aires',
      'the white single-mast swing bridge leaning at its sharp angle'
      + ' over the still dock water, its cables fanning down to the'
      + ' curving walkway, the last orange light of sunset from the'
      + ' west reflecting off the water and the mast while the'
      + ' promenade lights come on',
      'the restored red-brick dock warehouses converted to restaurants'
      + ' along both quays, moored sailing ships, people strolling as'
      + ' small figures, and the lit towers of the modern Puerto'
      + ' Madero skyline against the dusk',
    ),
    selite: 'Puerto Maderon Puente de la Mujer on Santiago Calatravan '
      + 'suunnittelema kääntyvä kävelysilta vuodelta 2001, ja sen '
      + 'vino masto kuvaa tangoparia.',
  },

  /* ---- SYDNEY — oopperatalo, Harbour Bridge, Bondi. */
  {
    id: 'sydney-aamu',
    tiedosto: 'hero-sydney-aamu.png',
    kaupunki: 'sydney',
    prompti: p(
      'the Sydney Opera House on Bennelong Point',
      'the white shell roofs clad in chevron-patterned cream tiles'
      + ' rising in overlapping sails above the pink granite podium,'
      + ' low early morning sun from the east so the shells glow warm'
      + ' and throw long soft shadows across the forecourt steps,'
      + ' a few early walkers as small figures',
      'the deep blue water of Sydney Cove with a green-and-yellow'
      + ' ferry arriving at Circular Quay, the botanic garden trees'
      + ' behind the point, and the tall towers of the central business'
      + ' district rising beyond the quay',
    ),
    selite: 'Jørn Utzonin suunnittelema Sydneyn oopperatalo avattiin '
      + '1973, ja sen purjekatot on verhottu yli miljoonalla '
      + 'ruotsalaisella keraamisella laatalla.',
  },
  {
    id: 'sydney-keskipaiva',
    tiedosto: 'hero-sydney-keskipaiva.png',
    kaupunki: 'sydney',
    prompti: p(
      'the Sydney Harbour Bridge over Port Jackson',
      'the great grey steel through-arch spanning the harbour with its'
      + ' road and rail deck hung beneath, the two pairs of granite-faced'
      + ' pylons at the ends, tiny climbers visible as dots on the upper'
      + ' arch walkway, high midday sun sparkling on the water and'
      + ' making the steel lattice sharp against a deep blue sky',
      'ferries and sailboats crossing the harbour below, the white'
      + ' shells of the Opera House on its point to one side, the'
      + ' green North Shore headlands and the city towers on the'
      + ' southern shore',
    ),
    selite: 'Sydney Harbour Bridge valmistui 1932: sen teräskaari '
      + 'jännittää 503 metriä, ja kannella kulkevat sekä junat että '
      + 'kahdeksan autokaistaa.',
  },
  {
    id: 'sydney-ilta',
    tiedosto: 'hero-sydney-ilta.png',
    kaupunki: 'sydney',
    prompti: p(
      'Bondi Beach and the Bondi Icebergs ocean pool in Sydney',
      'the pale sandstone headland with the famous seawater swimming'
      + ' pool built into the rocks, waves washing over its edge, the'
      + ' long white crescent of sand curving away, the last warm'
      + ' sidelight of sunset from the west turning the cliffs golden'
      + ' while swimmers and surfers are small distant figures',
      'the grassy park and low red-roofed apartment blocks rising up'
      + ' the slopes behind the beach, the coastal walking path along'
      + ' the cliffs and the darkening Tasman Sea horizon',
    ),
    selite: 'Bondin rannan eteläkallioon rakennettu Icebergs-meriallas '
      + 'on ollut talviuimareiden koti vuodesta 1929, ja aallot '
      + 'huuhtovat sen reunan yli.',
  },

  /* ---- AUCKLAND — Sky Tower, Rangitoto, Maungawhau. */
  {
    id: 'auckland-aamu',
    tiedosto: 'hero-auckland-aamu.png',
    kaupunki: 'auckland',
    prompti: p(
      'the Sky Tower in central Auckland',
      'the slender white concrete shaft rising to its glass-walled'
      + ' observation pods and slim antenna mast, 328 metres tall and'
      + ' far above every rooftop, low early morning sun from the east'
      + ' glinting off the pod windows and casting a long thin shadow'
      + ' across the streets below',
      'the mid-rise blocks of the city centre sloping down Queen'
      + ' Street toward the blue Waitematā Harbour, ferries leaving'
      + ' white wakes, the harbour bridge to the west and the low'
      + ' green cone of Rangitoto island on the horizon',
    ),
    selite: 'Aucklandin Sky Tower valmistui 1997, ja 328-metrisenä se '
      + 'on eteläisen pallonpuoliskon korkeimpia vapaasti seisovia '
      + 'rakenteita.',
  },
  {
    id: 'auckland-keskipaiva',
    tiedosto: 'hero-auckland-keskipaiva.png',
    kaupunki: 'auckland',
    prompti: p(
      'Rangitoto Island at the mouth of Waitematā Harbour, Auckland',
      'the perfectly symmetrical low volcanic cone covered in dark'
      + ' green pōhutukawa forest rising straight from the sea, its'
      + ' black lava shore breaking the small waves, high midday sun'
      + ' so the water is a deep sparkling blue and the island stands'
      + ' sharp against scattered white clouds',
      'sailboats and a passing ferry on the channel, the wooded'
      + ' headland of North Head and the white houses of Devonport on'
      + ' the near shore, and the towers and Sky Tower of central'
      + ' Auckland across the harbour',
    ),
    selite: 'Rangitoto kohosi merestä tulivuorenpurkauksissa noin 600 '
      + 'vuotta sitten ja on Aucklandin tulivuorikentän nuorin ja '
      + 'suurin keila.',
  },
  {
    id: 'auckland-ilta',
    tiedosto: 'hero-auckland-ilta.png',
    kaupunki: 'auckland',
    prompti: p(
      'the grassy crater of Maungawhau / Mount Eden above Auckland',
      'the deep symmetrical bowl of the volcanic crater covered in'
      + ' short green grass, the narrow path running around its rim'
      + ' with a few walkers as small figures, the last warm light of'
      + ' sunset from the west raking across the slopes so the crater'
      + ' rim glows and its bowl falls into soft shadow',
      'the tree-lined suburbs spreading from the mountain foot, the'
      + ' towers of the city centre with the Sky Tower catching the'
      + ' last light, the harbour beyond and the silhouette of'
      + ' Rangitoto on the dusk horizon',
    ),
    selite: 'Maungawhau eli Mount Eden on Aucklandin korkein '
      + 'tulivuorenkeila, jonka rinteillä on yhä maorien pā-linnoituksen '
      + 'pengerryksiä — kraatteri on pyhä eikä sinne saa laskeutua.',
  },
];
