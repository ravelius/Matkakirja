/*
 * HEROKUVATYÖLISTA, KIERROS 11 (6 kaupunkia, 18 kuvaa): Madrid,
 * Berliini, Pietari, Damaskos, Varanasi ja Kioto.
 *
 * Sama malli kuin tools/hero-tyolista-5.mjs (RESEPTI v7): koko
 * 'vaaka', kolme kuvaa kaupunkia kohti (aamu, keskipäivä, ilta),
 * jokaisessa eri pääkohde. Kytkentä julkaisussa avauskuvat-taulukon
 * kärkeen (ampari: 'herokoe/hero-<id>-<aika>.png').
 *
 * KAUPUNKIVALINTA: lehtikaupunkeja ilman yhtään heroa, maanosia
 * vuorotellen kuten aiemmilla kierroksilla — Eurooppa 2 (Madrid,
 * Berliini), Venäjä 1 (Pietari), Lähi-itä 1 (Damaskos), Etelä-Aasia 1
 * (Varanasi), Itä-Aasia 1 (Kioto).
 *
 * FAKTAT tarkistettu kaupunkien lehtiaineistosta
 * (js/packs/kulttuuri-kategoriat.js) ja en-Wikipediasta 23.8.2026.
 * Varanasin kuvissa noudatetaan Raamatun hienotunteisuuslinjaa:
 * pyhiinvaeltajien arki ja aarti-seremonia kyllä, polttohautausghatit
 * EI.
 */

// Reseptin muuttumaton loppuosa — sama kuin hero-tyolista-3..5:ssä.
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
  /* ---- MADRID — kuninkaanlinna, Plaza Mayor, Cibeles. */
  {
    id: 'madrid-aamu',
    tiedosto: 'hero-madrid-aamu.png',
    kaupunki: 'madrid',
    prompti: p(
      'the Royal Palace of Madrid',
      'the vast white limestone and granite baroque palace around its'
      + ' great courtyard, rows of tall arched windows, balustraded'
      + ' roofline with statues, low early morning sun from the east'
      + ' warming the east facade while the courtyard is still in cool'
      + ' shadow, guards as tiny figures at the gates',
      'the domed grey-and-white Almudena Cathedral facing the palace'
      + ' across the courtyard plaza, the Sabatini Gardens’ clipped'
      + ' hedges to the north, and the rooftops of old Madrid'
      + ' stretching away to the east',
    ),
    selite: 'Madridin kuninkaanlinna valmistui 1755 tulipalossa '
      + 'tuhoutuneen maurilinnan paikalle, ja yli 3 400 huoneellaan se '
      + 'on Länsi-Euroopan suurin kuninkaanlinna.',
  },
  {
    id: 'madrid-keskipaiva',
    tiedosto: 'hero-madrid-keskipaiva.png',
    kaupunki: 'madrid',
    prompti: p(
      'the Plaza Mayor square in Madrid',
      'the enclosed rectangular plaza ringed by red three-storey'
      + ' residential facades over stone arcades, the frescoed Casa de'
      + ' la Panadería with its twin spires on the north side, the'
      + ' bronze equestrian statue of Philip III at the centre, high'
      + ' midday sun so the red walls glow and people cross the open'
      + ' paving as small figures',
      'café parasols in the arcade shade, the slate spires and'
      + ' rooftops of Habsburg Madrid crowding around the square and'
      + ' the city stretching hazily beyond',
    ),
    selite: 'Plaza Mayor valmistui 1619 Habsburgien Madridin '
      + 'juhla-aukioksi, ja sitä reunustavat asuintalot lepäävät '
      + 'yhtenäisen holvikaarikäytävän päällä.',
  },
  {
    id: 'madrid-ilta',
    tiedosto: 'hero-madrid-ilta.png',
    kaupunki: 'madrid',
    prompti: p(
      'the Cibeles Fountain and Cibeles Palace in Madrid',
      'the white marble fountain of the goddess Cybele riding her'
      + ' lion-drawn chariot at the centre of the busy roundabout, and'
      + ' behind it the ornate white wedding-cake towers of the Cibeles'
      + ' Palace, the last warm light of sunset from the west setting'
      + ' the white stone aglow as the fountain jets catch the light',
      'the tree-lined Paseo del Prado and Calle de Alcalá radiating'
      + ' from the roundabout with evening traffic, grand bank'
      + ' buildings on the corners and the city lights coming on',
    ),
    selite: 'Kybele-jumalattaren suihkulähde valmistui 1782 Ventura '
      + 'Rodríguezin piirustuksin, ja sen takana kohoava Cibelesin '
      + 'palatsi (1919) oli alkujaan pääpostitalo.',
  },

  /* ---- BERLIINI — Brandenburgin portti, valtiopäivätalo, tuomiokirkko. */
  {
    id: 'berliini-aamu',
    tiedosto: 'hero-berliini-aamu.png',
    kaupunki: 'berliini',
    prompti: p(
      'the Brandenburg Gate in Berlin',
      'the sandstone neoclassical gate with its two rows of six Doric'
      + ' columns and the green copper Quadriga of Victory driving her'
      + ' four-horse chariot on top, low early morning sun from the'
      + ' east behind it so the columns stand in warm rim light and'
      + ' long shadows reach across the empty square, a few early'
      + ' cyclists as small figures',
      'the round cobbled Pariser Platz with its embassy and hotel'
      + ' facades, the green sweep of the Tiergarten park beginning'
      + ' behind the gate and the television tower on the skyline',
    ),
    selite: 'Brandenburgin portti valmistui 1791 kaupunkitulliporttina, '
      + 'ja sen harjalla ajaa neljän hevosen vetämä voitonjumalattaren '
      + 'vaunu, Quadriga.',
  },
  {
    id: 'berliini-keskipaiva',
    tiedosto: 'hero-berliini-keskipaiva.png',
    kaupunki: 'berliini',
    prompti: p(
      'the Reichstag building in Berlin',
      'the massive neo-renaissance parliament with its four corner'
      + ' towers and columned portico, the modern glass dome rising'
      + ' from the roof with its spiral walkways visible through the'
      + ' glass and visitors as tiny silhouettes inside, high midday'
      + ' sun flashing off the dome against a blue sky with scattered'
      + ' clouds',
      'the wide lawn of the Platz der Republik with people picnicking'
      + ' as small figures, the bend of the Spree river with tour'
      + ' boats, and the government quarter and Tiergarten trees'
      + ' around',
    ),
    selite: 'Valtiopäivätalo valmistui 1894, ja Norman Fosterin '
      + 'lasikupoli nousi sen katolle 1999 — kävijät kiertävät '
      + 'spiraaliramppia istuntosalin yläpuolella.',
  },
  {
    id: 'berliini-ilta',
    tiedosto: 'hero-berliini-ilta.png',
    kaupunki: 'berliini',
    prompti: p(
      'the Berlin Cathedral on Museum Island',
      'the great green copper dome and four corner towers of the'
      + ' neo-baroque cathedral above its broad sandstone facade, the'
      + ' last warm orange light of sunset from the west glowing on the'
      + ' stone while the dome falls into cool shadow, the lawn of the'
      + ' Lustgarten with strollers as small figures in front',
      'the Spree river alongside with an excursion boat passing, the'
      + ' colonnades and museum roofs of Museum Island, and the'
      + ' floodlit television tower rising against the dusk sky'
      + ' beyond',
    ),
    selite: 'Berliinin tuomiokirkko valmistui 1905 Hohenzollernien '
      + 'hovikirkoksi, ja sen kupolikruunu hallitsee Museosaaren '
      + 'siluettia Spreen rannalla.',
  },

  /* ---- PIETARI — Palatsiaukio, Verikirkko, Pietari-Paavalin linnoitus. */
  {
    id: 'pietari-aamu',
    tiedosto: 'hero-pietari-aamu.png',
    kaupunki: 'pietari',
    prompti: p(
      'the Winter Palace on Palace Square in Saint Petersburg',
      'the long green-and-white baroque palace facade with its gilded'
      + ' window surrounds and roofline statues, the red granite'
      + ' Alexander Column crowned by its angel rising from the centre'
      + ' of the vast cobbled square, low early morning sun from the'
      + ' east raking across the facade, a few early visitors as tiny'
      + ' figures on the cobbles',
      'the curved yellow General Staff Building with its triumphal'
      + ' arch closing the square, and the spires and domes of the'
      + ' city — the Admiralty needle and St Isaac’s dome — on the'
      + ' skyline',
    ),
    selite: 'Talvipalatsi valmistui 1762 Bartolomeo Rastrellin '
      + 'piirustuksin, ja sen edustan Aleksanterin pylväs (1834) on '
      + 'nostettu paikalleen yhtenä 600 tonnin graniittikappaleena.',
  },
  {
    id: 'pietari-keskipaiva',
    tiedosto: 'hero-pietari-keskipaiva.png',
    kaupunki: 'pietari',
    prompti: p(
      'the Church of the Savior on Spilled Blood in Saint Petersburg',
      'the Russian-revival church rising over the Griboyedov Canal'
      + ' with its cluster of five onion domes — gilded, enamelled in'
      + ' swirling blue-and-white and studded with colour — above'
      + ' facades of red brick, mosaics and carved stone, high midday'
      + ' sun making the enamels blaze against a clear sky',
      'the narrow canal curving away with its wrought-iron railings'
      + ' and a passing tour boat, strollers as small figures on the'
      + ' embankment, and the classical rooftops of central Petersburg'
      + ' around',
    ),
    selite: 'Verikirkko rakennettiin 1883–1907 Aleksanteri II:n '
      + 'murhapaikalle, ja sen sisäseiniä peittää yli 7 000 neliömetriä '
      + 'mosaiikkeja.',
  },
  {
    id: 'pietari-ilta',
    tiedosto: 'hero-pietari-ilta.png',
    kaupunki: 'pietari',
    prompti: p(
      'the Peter and Paul Fortress across the Neva in Saint Petersburg',
      'the slender gilded spire of the fortress cathedral rising from'
      + ' behind the low granite bastion walls on its island, the last'
      + ' warm light of a long northern sunset glinting on the gold'
      + ' and colouring the wide river surface pink and amber, the'
      + ' angel weathervane at the very tip of the needle',
      'the broad Neva with a river cruise boat passing, the sandy'
      + ' strip of beach under the fortress wall with a few strollers,'
      + ' and the palace embankment facades catching the low light on'
      + ' the far shore',
    ),
    selite: 'Pietari-Paavalin katedraalin kullattu neula nousee 122,5 '
      + 'metriin, ja se oli kaupungin korkein rakennelma yli '
      + 'kahdensadan vuoden ajan.',
  },

  /* ---- DAMASKOS — Umaijadimoskeija, Qasiun-vuori, Suq al-Hamidiyya. */
  {
    id: 'damaskos-aamu',
    tiedosto: 'hero-damaskos-aamu.png',
    kaupunki: 'damaskos',
    prompti: p(
      'the Umayyad Mosque in the old city of Damascus',
      'the great marble courtyard enclosed by arcades shimmering with'
      + ' golden and green mosaics of trees and palaces, the domed'
      + ' little treasury pavilion on its eight columns, the prayer'
      + ' hall facade with its high central gable, low early morning'
      + ' sun raking across the polished paving where worshippers'
      + ' cross as small figures',
      'the three minarets rising above the courtyard, the flat'
      + ' rooftops and domes of the old city pressing close around'
      + ' the walls, and the bare ridge of Mount Qasioun rising'
      + ' behind the city',
    ),
    selite: 'Umaijadimoskeija valmistui 715, ja sen pihan arkadeja '
      + 'peittävät kullanvihreät mosaiikit kuvaavat puutarhoja ja '
      + 'palatseja — ihmiskuvia niissä ei ole.',
  },
  {
    id: 'damaskos-keskipaiva',
    tiedosto: 'hero-damaskos-keskipaiva.png',
    kaupunki: 'damaskos',
    prompti: p(
      'the covered Souq al-Hamidiyya bazaar street in Damascus',
      'the long straight market street beneath its high arched iron'
      + ' roof pierced by hundreds of small holes, thin beams of'
      + ' midday sun falling through them as a starfield of light'
      + ' shafts onto the crowd below, shop fronts glowing with'
      + ' fabrics and brassware, shoppers as small figures in the'
      + ' cool dimness',
      'the far end of the souq opening into bright daylight where'
      + ' the freestanding Roman columns of the Jupiter temple gateway'
      + ' stand before the Umayyad Mosque’s minaret',
    ),
    selite: 'Suq al-Hamidiyyan pääkatu katettiin 1800-luvun lopulla '
      + 'rautaholvilla, jonka luodinreikien ja ilma-aukkojen läpi '
      + 'aurinko piirtää valopisteitä koko kadun mitalle.',
  },
  {
    id: 'damaskos-ilta',
    tiedosto: 'hero-damaskos-ilta.png',
    kaupunki: 'damaskos',
    prompti: p(
      'the old city of Damascus seen from the slope of Mount Qasioun',
      'the dense carpet of flat pale rooftops, courtyards and green'
      + ' copper domes of one of the world’s oldest continuously'
      + ' inhabited cities, the Umayyad Mosque’s courtyard and'
      + ' minarets glowing at its heart in the last warm light of'
      + ' sunset, swifts wheeling over the roofs',
      'the ring of orchards of the Ghouta oasis darkening at the'
      + ' city’s edge, the straight modern avenues stretching'
      + ' toward the horizon and the dusk sky banded orange and'
      + ' violet',
    ),
    selite: 'Damaskos on maailman vanhimpia yhtäjaksoisesti asuttuja '
      + 'kaupunkeja, ja Qasiun-vuoren rinteeltä sen vanhakaupunki '
      + 'näyttäytyy kattojen ja kupolien mattona keitaan keskellä.',
  },

  /* ---- VARANASI — auringonnousu Gangesilla, ghatit, aarti. */
  {
    id: 'varanasi-aamu',
    tiedosto: 'hero-varanasi-aamu.png',
    kaupunki: 'varanasi',
    prompti: p(
      'the ghats of Varanasi at sunrise on the Ganges',
      'the long stone stairways descending to the river crowded with'
      + ' pilgrims bathing and offering water to the rising sun, the'
      + ' orange disc lifting through mist over the far bank and'
      + ' laying a golden path across the calm water, wooden rowing'
      + ' boats gliding past with visitors',
      'the tall weathered palace and temple facades rising in tiers'
      + ' above the steps, faded umbrellas of the ghat priests, and'
      + ' the river curving away into the morning haze',
    ),
    selite: 'Varanasin ghatit ovat kilometrien mittainen porrasranta, '
      + 'jolla pyhiinvaeltajat kylpevät Gangesissa auringonnousun '
      + 'aikaan — kaupunki on hindulaisuuden pyhimpiä.',
  },
  {
    id: 'varanasi-keskipaiva',
    tiedosto: 'hero-varanasi-keskipaiva.png',
    kaupunki: 'varanasi',
    prompti: p(
      'the riverside palace facades of Dashashwamedh Ghat in Varanasi',
      'the tiered sandstone palaces, shrines and octagonal turrets'
      + ' stacked above the great stairway, laundry drying in bright'
      + ' rows on the steps, high midday sun bleaching the stone while'
      + ' boatmen pole their heavy wooden boats along the waterline'
      + ' and pilgrims shelter under palm-leaf parasols',
      'the wide brown river busy with crossing boats, kites circling'
      + ' on the thermals above the rooftop terraces and the dense'
      + ' old city pressing behind the river front',
    ),
    selite: 'Dashashwamedh on Varanasin pääghat, jonka porrasrantaa '
      + 'reunustavat ruhtinaiden 1700-luvulla rakennuttamat '
      + 'rantapalatsit ja pyhäköt.',
  },
  {
    id: 'varanasi-ilta',
    tiedosto: 'hero-varanasi-ilta.png',
    kaupunki: 'varanasi',
    prompti: p(
      'the evening Ganga aarti ceremony at Dashashwamedh Ghat in'
      + ' Varanasi',
      'a row of priests on raised platforms facing the river, each'
      + ' sweeping a great tiered brass lamp of flames in circles so'
      + ' the fire draws bright arcs in the dusk, bells and smoke and'
      + ' marigold garlands, the crowd on the steps and in boats on'
      + ' the water holding small floating oil lamps',
      'the darkening river speckled with hundreds of drifting lamp'
      + ' flames, the lit palace facades rising behind the ghat and'
      + ' the last violet band of sunset over the water',
    ),
    selite: 'Ganga aarti on joka ilta Dashashwamedh-ghatilla '
      + 'toimitettava tuliseremonia, jossa papit kiertävät '
      + 'monikerroksisia öljylamppuja joelle omistettuina.',
  },

  /* ---- KIOTO — Kinkaku-ji, Fushimi Inari, Kiyomizu-dera. */
  {
    id: 'kioto-aamu',
    tiedosto: 'hero-kioto-aamu.png',
    kaupunki: 'kioto',
    prompti: p(
      'the Kinkaku-ji Golden Pavilion in Kyoto',
      'the three-storey pavilion with its top two floors sheathed in'
      + ' gold leaf and the bronze phoenix on the roof ridge, standing'
      + ' at the edge of its still mirror pond so the gold doubles in'
      + ' the water, low early morning sun through thin mist making'
      + ' the gilding glow softly, pine islands in the pond',
      'the sculpted garden of clipped pines and mossy banks around'
      + ' the pond, the forested hill rising behind the pavilion and'
      + ' the rooftops of northern Kyoto in the haze beyond',
    ),
    selite: 'Kinkaku-ji rakennettiin 1397 shōgunin huvilaksi, ja sen '
      + 'kaksi ylintä kerrosta on päällystetty lehtikullalla — '
      + 'nykyinen paviljonki on vuoden 1950 palon jälkeinen '
      + 'jälleenrakennus.',
  },
  {
    id: 'kioto-keskipaiva',
    tiedosto: 'hero-kioto-keskipaiva.png',
    kaupunki: 'kioto',
    prompti: p(
      'the vermilion torii gate tunnels of Fushimi Inari shrine in'
      + ' Kyoto',
      'the path climbing the wooded hillside through an unbroken'
      + ' tunnel of thousands of closely spaced vermilion torii gates'
      + ' with black bases, high midday sun filtering through the'
      + ' canopy and the gaps so bands of light and orange shadow'
      + ' ripple down the tunnel, a few walkers as small figures'
      + ' inside',
      'the curved roofs of the shrine’s main halls at the foot of'
      + ' the hill, stone fox statues with red bibs by the path, and'
      + ' the southern districts of Kyoto spreading out below the'
      + ' forest edge',
    ),
    selite: 'Fushimi Inarin rinnepolkuja reunustaa noin kymmenentuhatta '
      + 'lahjoitettua vermilionin väristä torii-porttia, jotka '
      + 'muodostavat yhtenäisiä tunneleita.',
  },
  {
    id: 'kioto-ilta',
    tiedosto: 'hero-kioto-ilta.png',
    kaupunki: 'kioto',
    prompti: p(
      'the wooden stage of Kiyomizu-dera temple in Kyoto',
      'the great main hall with its sweeping cypress-bark roof and the'
      + ' broad wooden veranda jutting from the hillside on its dense'
      + ' lattice of tall wooden pillars, the last warm light of'
      + ' sunset from the west glowing on the timber and the maple'
      + ' canopy below the stage, visitors as small figures at the'
      + ' railing',
      'the three-storey vermilion Koyasu pagoda rising from the'
      + ' wooded slope across the valley, and the grid of Kyoto’s'
      + ' streets lighting up toward the western hills under a'
      + ' colored sky',
    ),
    selite: 'Kiyomizu-deran päähallin puinen näköalalava työntyy '
      + 'rinteestä kolmentoista metrin korkeudella pilariristikon '
      + 'varassa — rakenne on koottu ilman nauloja.',
  },
];
