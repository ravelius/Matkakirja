/*
 * HEROKUVATYÖLISTA, KIERROS 12 (6 kaupunkia, 18 kuvaa): Venetsia,
 * Amsterdam, Bagdad, Hanoi, Kathmandu ja Kanton.
 *
 * Sama malli kuin tools/hero-tyolista-6.mjs (RESEPTI v7): koko
 * 'vaaka', kolme kuvaa kaupunkia kohti (aamu, keskipäivä, ilta),
 * jokaisessa eri pääkohde. Kytkentä julkaisussa avauskuvat-taulukon
 * kärkeen (ampari: 'herokoe/hero-<id>-<aika>.png').
 *
 * KAUPUNKIVALINTA: lehtikaupunkeja ilman yhtään heroa, maanosia
 * vuorotellen — Eurooppa 2 (Venetsia, Amsterdam), Lähi-itä 1
 * (Bagdad), Kaakkois-Aasia 1 (Hanoi), Etelä-Aasia 1 (Kathmandu),
 * Itä-Aasia 1 (Kanton).
 *
 * FAKTAT tarkistettu kaupunkien lehtiaineistosta ja en-Wikipediasta
 * 23.8.2026. Kathmandun Durbar-aukion kuvauksessa muistetaan vuoden
 * 2015 järistys — kuvattu nykytila, ei romantisoitua täydellisyyttä.
 */

// Reseptin muuttumaton loppuosa — sama kuin hero-tyolista-3..6:ssa.
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
  /* ---- VENETSIA — San Marco, Rialto, Canal Granden suu. */
  {
    id: 'venetsia-aamu',
    tiedosto: 'hero-venetsia-aamu.png',
    kaupunki: 'venetsia',
    prompti: p(
      "St Mark's Square and Basilica in Venice",
      'the five mosaic-crowned portals and clustered grey domes of the'
      + ' basilica with the four bronze horses above the central arch,'
      + ' the tall red-brick campanile with its green pyramid spire'
      + ' beside it, low early morning sun raking across the empty'
      + ' square so the arcades throw long shadows and pigeons wheel'
      + ' over the paving',
      'the long arcaded procuratie enclosing the square, the pink'
      + ' diamond-patterned Doge’s Palace toward the water, gondolas'
      + ' moored at the lagoon edge and the island church of San'
      + ' Giorgio Maggiore across the glittering basin',
    ),
    selite: 'Markuksenkirkon pääportaalin yllä seisovat neljä '
      + 'pronssihevosta tuotiin Konstantinopolista 1204, ja '
      + 'kampanilen nykyinen torni on vuoden 1902 sortuman jälkeinen '
      + 'jälleenrakennus.',
  },
  {
    id: 'venetsia-keskipaiva',
    tiedosto: 'hero-venetsia-keskipaiva.png',
    kaupunki: 'venetsia',
    prompti: p(
      'the Rialto Bridge over the Grand Canal in Venice',
      'the single bold marble arch carrying its double row of small'
      + ' shops with arcaded openings, stairs climbing both flanks to'
      + ' the central portico, high midday sun so the white stone'
      + ' gleams and the green water beneath is busy with gondolas,'
      + ' water taxis and a loaded barge',
      'the palaces lining both banks of the Grand Canal with their'
      + ' striped mooring poles, café awnings along the Riva del Vin,'
      + ' and the canal curving away between the rooftops',
    ),
    selite: 'Rialton silta valmistui 1591 Antonio da Ponten '
      + 'suunnittelemana yhtenä marmorikaarena, ja sen päällä kulkee '
      + 'kaksi myymäläriviä.',
  },
  {
    id: 'venetsia-ilta',
    tiedosto: 'hero-venetsia-ilta.png',
    kaupunki: 'venetsia',
    prompti: p(
      'the church of Santa Maria della Salute at the mouth of the'
      + ' Grand Canal in Venice',
      'the great octagonal baroque church with its huge scrolled'
      + ' buttresses and two domes rising at the canal entrance, the'
      + ' last warm light of sunset from the west glowing on the white'
      + ' Istrian stone and the lagoon turning rose and gold, gondolas'
      + ' crossing in silhouette',
      'the customs-house point with its golden globe weathervane, the'
      + ' bell towers and rooftops of Dorsoduro, and across the water'
      + ' the campanile and Doge’s Palace of San Marco in the evening'
      + ' haze',
    ),
    selite: 'Santa Maria della Salute rakennettiin kiitokseksi vuoden '
      + '1630 ruton päättymisestä, ja sen kahdeksankulmainen runko '
      + 'lepää yli miljoonan puupaalun varassa.',
  },

  /* ---- AMSTERDAM — Westerkerk, Rijksmuseum, Magere Brug. */
  {
    id: 'amsterdam-aamu',
    tiedosto: 'hero-amsterdam-aamu.png',
    kaupunki: 'amsterdam',
    prompti: p(
      'the Westerkerk tower above the Prinsengracht canal in'
      + ' Amsterdam',
      'the tall Westertoren rising in stacked stages of brick and'
      + ' pale sandstone to its blue imperial crown, standing over the'
      + ' brick church beside the tree-lined canal, low early morning'
      + ' sun from the east lighting the tower while the narrow'
      + ' gabled canal houses below still hold their shadows,'
      + ' bicycles crossing the humpback bridge',
      'houseboats moored along the quays, the mirror-still canal'
      + ' reflecting the gables, and the sea of orange rooftops and'
      + ' church spires of the old city stretching away',
    ),
    selite: 'Westerkerkin torni valmistui 1638 ja on Amsterdamin '
      + 'korkein kirkontorni — sen huipulla kimaltaa keisari '
      + 'Maximilianin kaupungille myöntämä kruunu.',
  },
  {
    id: 'amsterdam-keskipaiva',
    tiedosto: 'hero-amsterdam-keskipaiva.png',
    kaupunki: 'amsterdam',
    prompti: p(
      'the Rijksmuseum facing the Museumplein in Amsterdam',
      'the brick neo-gothic palace with its two clock towers, arched'
      + ' central passage and steep slate roofs, high midday sun'
      + ' bringing out the red brick and the gilded details, people'
      + ' picnicking on the lawn and cyclists rolling through the'
      + ' passage beneath the building',
      'the long reflecting pool on the museum lawn, the white'
      + ' Concertgebouw across the green, and the gabled rooftops and'
      + ' church towers of the old city beyond the museum quarter',
    ),
    selite: 'Pierre Cuypersin suunnittelema Rijksmuseum avattiin 1885, '
      + 'ja sen holvikäytävän läpi kulkee yhä pyörätie suoraan '
      + 'rakennuksen ali.',
  },
  {
    id: 'amsterdam-ilta',
    tiedosto: 'hero-amsterdam-ilta.png',
    kaupunki: 'amsterdam',
    prompti: p(
      'the Magere Brug drawbridge over the Amstel river in Amsterdam',
      'the slender white wooden double drawbridge with its raised'
      + ' balance beams and cables, strings of small lights along its'
      + ' arches beginning to glow as the last orange light of sunset'
      + ' fades over the river, a low canal boat sliding underneath',
      'the broad Amstel lined with houseboats and leaning brick'
      + ' facades, lit windows reflecting in the water and church'
      + ' towers of the old city against the deepening dusk',
    ),
    selite: '"Laiha silta" eli Magere Brug on Amstelin yli johtava '
      + 'valkoinen puinen kääntösilta, jonka nykyhahmo on vuodelta '
      + '1934 — iltaisin sen kaaria valaisee yli tuhat lamppua.',
  },

  /* ---- BAGDAD — Mustansiriya, Kadhimiya, Shahid-monumentti. */
  {
    id: 'bagdad-aamu',
    tiedosto: 'hero-bagdad-aamu.png',
    kaupunki: 'bagdad',
    prompti: p(
      'the Mustansiriya Madrasa courtyard on the Tigris in Baghdad',
      'the long two-storey brick facade of pointed arches and'
      + ' recessed iwans around the rectangular courtyard, every'
      + ' surface patterned with geometric brickwork and carved'
      + ' arabesque bands, low early morning sun raking across the'
      + ' brick so the reliefs stand out in warm gold and shadow',
      'the wide brown Tigris flowing right past the outer wall with'
      + ' a small boat crossing, palm crowns between the buildings'
      + ' and the minarets and rooftops of old Baghdad along the'
      + ' river bend',
    ),
    selite: 'Mustansiriyan madrasa valmistui 1234 Tigriin rannalle, ja '
      + 'se on maailman vanhimpia yliopistorakennuksia — tiiliseiniä '
      + 'peittävät geometriset reliefikuviot.',
  },
  {
    id: 'bagdad-keskipaiva',
    tiedosto: 'hero-bagdad-keskipaiva.png',
    kaupunki: 'bagdad',
    prompti: p(
      'the Kadhimiya shrine in Baghdad',
      'the two great gilded domes and four golden minarets rising'
      + ' above the tiled gateways and arcaded courtyard walls'
      + ' patterned in blue and turquoise faience, high midday sun'
      + ' blazing on the gold against a pale desert sky, pilgrims'
      + ' crossing the courtyard as small figures',
      'the flat rooftops, water tanks and palm trees of the'
      + ' Kadhimiya district pressing around the shrine, market'
      + ' streets converging on the gates and the haze of the city'
      + ' stretching to the horizon',
    ),
    selite: 'Kadhimiyan pyhäkkö kahden imaamin haudalla on shiialaisen '
      + 'maailman suuria pyhiinvaelluskohteita, ja sen kaksi '
      + 'kullattua kupolia hallitsevat kaupunginosan siluettia.',
  },
  {
    id: 'bagdad-ilta',
    tiedosto: 'hero-bagdad-ilta.png',
    kaupunki: 'bagdad',
    prompti: p(
      'the Martyr’s Monument in Baghdad',
      'the forty-metre turquoise-glazed dome split into two offset'
      + ' halves with an eternal-flame sculpture and spring between'
      + ' them, standing on its wide circular platform over an'
      + ' artificial lake, the last warm light of sunset colouring'
      + ' the glazed tiles and the still water mirroring the split'
      + ' dome',
      'the dark palm groves and lawns of the memorial park around'
      + ' the lake, the low skyline of eastern Baghdad and a band of'
      + ' orange dusk fading over the city',
    ),
    selite: 'Marttyyrien muistomerkin 40-metrinen turkoosi kupoli on '
      + 'halkaistu kahtia, ja puolikkaiden väliin jää ikuinen liekki '
      + '— monumentti valmistui 1983.',
  },

  /* ---- HANOI — Hoan Kiem, yhden pylvään pagodi, Long Bien. */
  {
    id: 'hanoi-aamu',
    tiedosto: 'hero-hanoi-aamu.png',
    kaupunki: 'hanoi',
    prompti: p(
      'Hoan Kiem Lake and the Turtle Tower in Hanoi',
      'the small ivy-grown three-tiered tower on its grassy islet in'
      + ' the middle of the still lake, thin morning mist over the'
      + ' green water and the red wooden Huc footbridge arching to'
      + ' the temple island, early sun breaking through the mist'
      + ' while tai chi groups move slowly on the lakeside paths',
      'the flame trees and banyans leaning over the shore promenade,'
      + ' early cyclists and street vendors under the trees, and the'
      + ' dense rooftops of the Old Quarter crowding to the lake'
      + ' edge',
    ),
    selite: 'Hoan Kiem eli Palautetun miekan järvi on Hanoin sydän: '
      + 'legendan mukaan kilpikonna vei keisarin taikamiekan järveen, '
      + 'ja saaren kilpikonnatorni muistuttaa tarusta.',
  },
  {
    id: 'hanoi-keskipaiva',
    tiedosto: 'hero-hanoi-keskipaiva.png',
    kaupunki: 'hanoi',
    prompti: p(
      'the One Pillar Pagoda in Hanoi',
      'the small square wooden shrine with its curved tiled roof'
      + ' rising on a single stone pillar from the middle of a'
      + ' lotus pond, a steep brick stair leading up to the shrine'
      + ' door, high midday sun sparkling on the pond where pink'
      + ' lotus flowers bloom among round leaves',
      'the clipped frangipani and banyan trees of the temple garden,'
      + ' visitors circling the pond as small figures and the'
      + ' ochre colonial rooftops of the Ba Dinh government quarter'
      + ' beyond the trees',
    ),
    selite: 'Yhden pylvään pagodi rakennettiin ensi kerran 1049 '
      + 'lootuksenkukan muotoon yhden pilarin varaan — nykyinen '
      + 'pyhäkkö on vuoden 1955 jälleenrakennus.',
  },
  {
    id: 'hanoi-ilta',
    tiedosto: 'hero-hanoi-ilta.png',
    kaupunki: 'hanoi',
    prompti: p(
      'the Long Bien Bridge over the Red River in Hanoi',
      'the long riveted steel cantilever bridge marching across the'
      + ' wide river on its stone piers, the zigzag silhouette of'
      + ' trusses black against the last orange light of sunset,'
      + ' a train crossing the central track while motorbikes and'
      + ' cyclists stream along the narrow side lanes',
      'banana groves and vegetable plots on the mid-river islands'
      + ' below, sand barges on the darkening water and the lights'
      + ' of the city coming on along the far bank',
    ),
    selite: 'Long Bienin terässilta valmistui 1902 Punaisenjoen yli, '
      + 'ja sen keskellä kulkee yhä junarata — moottoripyörät ja '
      + 'polkupyörät ajavat kapeilla reunakaistoilla.',
  },

  /* ---- KATHMANDU — Boudhanath, Durbar-aukio, Swayambhunath. */
  {
    id: 'kathmandu-aamu',
    tiedosto: 'hero-kathmandu-aamu.png',
    kaupunki: 'kathmandu',
    prompti: p(
      'the great stupa of Boudhanath in Kathmandu',
      'the huge white hemispherical dome crowned by the gilded'
      + ' square tower painted with the Buddha’s watching eyes and'
      + ' the stepped golden spire above, strings of prayer flags'
      + ' radiating from the pinnacle in faded colours, low early'
      + ' morning sun warming the whitewash as pilgrims circle the'
      + ' base clockwise spinning prayer wheels',
      'the ring of ochre and brick houses with rooftop terraces'
      + ' enclosing the stupa plaza, drifting incense smoke, pigeons'
      + ' rising and the hazy Kathmandu valley rooftops beyond',
    ),
    selite: 'Boudhanathin stupa on Nepalin suurimpia, ja sen '
      + 'kullatusta tornista katsovat Buddhan silmät neljään '
      + 'ilmansuuntaan — pyhiinvaeltajat kiertävät kupolia aina '
      + 'myötäpäivään.',
  },
  {
    id: 'kathmandu-keskipaiva',
    tiedosto: 'hero-kathmandu-keskipaiva.png',
    kaupunki: 'kathmandu',
    prompti: p(
      'Kathmandu Durbar Square',
      'the cluster of multi-tiered pagoda temples on their stepped'
      + ' brick plinths, carved dark timber struts and doorways'
      + ' against warm red brick, high midday sun sharp on the'
      + ' tiered roofs while vendors spread marigold garlands on'
      + ' the temple steps and rickshaws wait at the square edge —'
      + ' one plinth still bearing visible earthquake repairs and'
      + ' timber props',
      'the white nine-storey Basantapur tower of the old royal'
      + ' palace, pigeons swirling between the roofs and the dense'
      + ' brick lanes of the old city pressing around the square',
    ),
    selite: 'Kathmandun Durbar-aukio oli mallakuninkaiden '
      + 'palatsiaukio, jonka pagodatemppeleitä on korjattu vuoden '
      + '2015 järistyksen jäljiltä — puiset tukirakenteet näkyvät '
      + 'yhä paikoin.',
  },
  {
    id: 'kathmandu-ilta',
    tiedosto: 'hero-kathmandu-ilta.png',
    kaupunki: 'kathmandu',
    prompti: p(
      'the Swayambhunath stupa on its hilltop above Kathmandu',
      'the white dome and gilded eye-painted tower rising from the'
      + ' wooded hill crest among smaller shrines and shikhara'
      + ' spires, prayer flags streaming in the evening wind and'
      + ' monkeys scampering along the terrace walls, the last warm'
      + ' light of sunset gilding the spire',
      'the long stone pilgrim stairway plunging down through the'
      + ' trees, butter lamps beginning to flicker on the terraces'
      + ' and the lights of the Kathmandu valley spreading to the'
      + ' darkening rim of hills',
    ),
    selite: 'Swayambhunathin kukkulastupa on Kathmandun laakson '
      + 'vanhimpia pyhäkköjä, jonne nousee 365 portaan '
      + 'pyhiinvaellusrappu — temppeliapinat pitävät rinteitä '
      + 'omanaan.',
  },

  /* ---- KANTON — Chenin sukutemppeli, katedraali, Canton Tower. */
  {
    id: 'kanton-aamu',
    tiedosto: 'hero-kanton-aamu.png',
    kaupunki: 'kanton',
    prompti: p(
      'the Chen Clan Ancestral Hall in Guangzhou',
      'the grey-brick courtyard complex whose long roof ridges'
      + ' carry riotous crests of ceramic figures — operas of tiny'
      + ' glazed people, dragons and phoenixes in blue, green and'
      + ' ochre — above carved granite columns and open halls, low'
      + ' early morning sun picking out the coloured ceramics'
      + ' against the dark roofs',
      'the paved forecourt with banyan trees and early visitors,'
      + ' the grey-tiled rooftops of the old western districts and'
      + ' the towers of modern Guangzhou rising in the haze behind',
    ),
    selite: 'Chenin suvun esi-isäintemppeli valmistui 1894, ja sen '
      + 'harjakattoja kruunaavat tuhansien keramiikkahahmojen '
      + 'oopperakohtaukset — rakennus on kantonilaisen '
      + 'koristetaiteen pääteos.',
  },
  {
    id: 'kanton-keskipaiva',
    tiedosto: 'hero-kanton-keskipaiva.png',
    kaupunki: 'kanton',
    prompti: p(
      'the Sacred Heart Cathedral in Guangzhou',
      'the grey granite neo-gothic cathedral with its twin openwork'
      + ' spires, rose window and flying buttresses, high midday sun'
      + ' bright on the stone lace of the towers against a blue sky'
      + ' with drifting clouds, worshippers and visitors on the'
      + ' forecourt as small figures',
      'the dense low rooftops and narrow lanes of the old Yuexiu'
      + ' district pressing around the cathedral close, laundry'
      + ' lines and street trees, and the high-rises of the modern'
      + ' city rising beyond',
    ),
    selite: 'Kantonin Pyhän sydämen katedraali rakennettiin '
      + '1863–1888 kokonaan graniitista, ja sen kaksoistornit '
      + 'nousevat lähes 60 metriin — paikalliset kutsuvat sitä '
      + 'kivitaloksi.',
  },
  {
    id: 'kanton-ilta',
    tiedosto: 'hero-kanton-ilta.png',
    kaupunki: 'kanton',
    prompti: p(
      'the Canton Tower above the Pearl River in Guangzhou',
      'the slender twisting lattice tower narrowing at its waist as'
      + ' its diagonal steel net winds toward the observation rings'
      + ' and antenna, the whole shaft beginning to glow in shifting'
      + ' rainbow bands as dusk falls, the last violet light of'
      + ' sunset behind the skyline',
      'the broad Pearl River mirroring the tower’s colours with'
      + ' lit pleasure boats sliding past, the dense glowing towers'
      + ' of the Zhujiang New Town across the water and streams of'
      + ' traffic on the riverside boulevards',
    ),
    selite: 'Canton Tower valmistui 2010 Helmijoen rannalle: '
      + 'kiertyvä teräsverkkotorni kapenee keskeltä kuin vyötärö ja '
      + 'nousee antenneineen noin 600 metriin.',
  },
];
