/*
 * HEROKUVATYÖLISTA, KIERROS 15 (6 kaupunkia, 18 kuvaa): Lissabon,
 * Krakova, Teheran, Colombo, Yangon ja Astana.
 *
 * Sama malli kuin tools/hero-tyolista-9.mjs (RESEPTI v7): koko
 * 'vaaka', kolme kuvaa kaupunkia kohti (aamu, keskipäivä, ilta),
 * jokaisessa eri pääkohde. Kytkentä julkaisussa avauskuvat-taulukon
 * kärkeen (ampari: 'herokoe/hero-<id>-<aika>.png').
 *
 * KAUPUNKIVALINTA: lehtikaupunkeja ilman yhtään heroa, maanosia
 * vuorotellen — Eurooppa 2 (Lissabon, Krakova), Lähi-itä 1
 * (Teheran), Etelä-Aasia 1 (Colombo), Kaakkois-Aasia 1 (Yangon),
 * Keski-Aasia 1 (Astana).
 *
 * FAKTAT tarkistettu kaupunkien lehtiaineistosta ja en-Wikipediasta
 * 23.8.2026.
 */

// Reseptin muuttumaton loppuosa — sama kuin hero-tyolista-3..9:ssa.
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
  /* ---- LISSABON — Belémin torni, Jerónimos, Kauppatori. */
  {
    id: 'lissabon-aamu',
    tiedosto: 'hero-lissabon-aamu.png',
    kaupunki: 'lissabon',
    prompti: p(
      'the Belém Tower at the mouth of the Tagus in Lisbon',
      'the four-storey Manueline tower of pale cream limestone rising'
      + ' 30 metres beside its low hexagonal bastion, ribbed Moorish'
      + ' cupolas crowning the cylindrical bartizan turrets at the'
      + ' corners, carved twisted stone rope, armillary spheres and'
      + ' crosses of the Order of Christ along the parapets, a'
      + ' seven-arched loggia facing the river, low early morning sun'
      + ' from the east warming the white stone while the broad Tagus'
      + ' lies flat and silver around the bastion',
      'the riverside walk with joggers and anglers as small figures,'
      + ' the long red suspension bridge upstream in the haze and the'
      + ' low waterfront district of Belém with its gardens and'
      + ' tram lines stretching inland',
    ),
    selite: 'Belémin torni valmistui 1519 vartioimaan Tejon suuta: '
      + 'nelikerroksinen torni nousee 30 metriin, ja sen bastionin '
      + 'ampuma-aukoista mahtui tulittamaan seitsemäntoista tykkiä.',
  },
  {
    id: 'lissabon-keskipaiva',
    tiedosto: 'hero-lissabon-keskipaiva.png',
    kaupunki: 'lissabon',
    prompti: p(
      'the Jerónimos Monastery in Belém, Lisbon',
      'the immense honey-coloured limestone monastery stretching along'
      + ' its square, the ornate south portal 32 metres high and'
      + ' 12 metres wide bristling with gables, pinnacles and rows of'
      + ' carved figures in niches around the statue of Henry the'
      + ' Navigator between its two doors, the church roof and bell'
      + ' tower behind, high midday sun bleaching the carved stone'
      + ' while visitors queue as small figures along the facade',
      'the two-storey cloister glimpsed through an archway, the'
      + ' formal gardens and fountain of the square in front, and the'
      + ' tram tracks and the river beyond the trees',
    ),
    selite: 'Jerónimosin luostarin rakentaminen alkoi 1501 ja kesti '
      + 'sata vuotta — kirkon holvi jännittyy yhtenä kaarena 19 metrin '
      + 'yli, ja sisällä lepäävät Vasco da Gama ja runoilija Camões.',
  },
  {
    id: 'lissabon-ilta',
    tiedosto: 'hero-lissabon-ilta.png',
    kaupunki: 'lissabon',
    prompti: p(
      'the Praça do Comércio opening onto the Tagus in Lisbon at'
      + ' sunset',
      'the vast square measuring 175 metres on every side, framed on'
      + ' three sides by matching lemon-yellow ministries with'
      + ' arcaded ground floors and a tower closing each arm of the'
      + ' U, the bronze equestrian statue of the king on its pedestal'
      + ' in the centre, the tall triumphal arch with its clock and'
      + ' crowded statues standing over the street on the far side,'
      + ' warm sunset light from the west running down the arcades',
      'the marble steps and two stone columns where the square meets'
      + ' the water, a ferry crossing the wide river, the straight'
      + ' grid of the lower town running inland and the castle hill'
      + ' glowing above the rooftops',
    ),
    selite: 'Kauppatori mittaa 175 metriä joka suuntaan ja avautuu '
      + 'U-kirjaimena Tejolle — sen paikalla seisoi kuninkaanlinna, '
      + 'jonka vuoden 1755 maanjäristys ja tulipalo pyyhkivät pois.',
  },

  /* ---- KRAKOVA — Wawel, Mariacki, Sukiennice. */
  {
    id: 'krakova-aamu',
    tiedosto: 'hero-krakova-aamu.png',
    kaupunki: 'krakova',
    prompti: p(
      'Wawel Hill above the Vistula in Kraków',
      'the royal castle and cathedral crowded together on the'
      + ' limestone outcrop, the cathedral’s three unequal towers'
      + ' beside the gilded dome of the Renaissance Sigismund Chapel'
      + ' and the darker dome of the Vasa chapel next to it, the'
      + ' brick and stone castle ranges under steep red tiled roofs'
      + ' with the arcaded Renaissance courtyard behind them, low'
      + ' early morning sun from the east flashing on the gilding'
      + ' while mist lies along the river below',
      'the Vistula curving around the foot of the crag with the'
      + ' mouth of the dragon’s cave in the rock, early walkers on'
      + ' the riverside path and the spires and rooftops of the old'
      + ' town beyond the trees',
    ),
    selite: 'Wawelin kukkula on jurakautista kalkkikiveä, ja sen '
      + 'päällä seisova katedraali vihittiin 1364 — siellä kruunattiin '
      + 'Puolan kuninkaat vuoteen 1764 asti.',
  },
  {
    id: 'krakova-keskipaiva',
    tiedosto: 'hero-krakova-keskipaiva.png',
    kaupunki: 'krakova',
    prompti: p(
      'St Mary’s Basilica on the Main Market Square of Kraków',
      'the brick Gothic church with its two deliberately mismatched'
      + ' towers: the taller watchtower reaching 80 metres, capped'
      + ' with a spiky Gothic helmet ringed by small turrets and'
      + ' topped by a gilded crown, and the lower tower beside it'
      + ' finished with a rounded Renaissance dome, a small open'
      + ' window at the top of the tall tower where the trumpeter'
      + ' stands, high midday sun on the red brick and the steep'
      + ' tiled church roof, pigeons wheeling over the paving',
      'the long Renaissance Cloth Hall lying across the middle of the'
      + ' huge square, the free-standing Gothic town hall tower'
      + ' beyond it, cafe parasols, horse carriages and walkers as'
      + ' small figures, and the townhouses lining every side',
    ),
    selite: 'Mariacki-kirkon tornit ovat eriparia: korkeampi nousee '
      + '80 metriin vartiotorniksi, ja sen huipulta soitetaan joka '
      + 'tunti hejnał, joka katkeaa aina kesken sävelen.',
  },
  {
    id: 'krakova-ilta',
    tiedosto: 'hero-krakova-ilta.png',
    kaupunki: 'krakova',
    prompti: p(
      'the Cloth Hall in the middle of Kraków’s Main Market Square at'
      + ' sunset',
      'the long Renaissance market hall with open arcaded loggias'
      + ' running down both flanks and a crested stone parapet of'
      + ' carved grotesque masks along the roofline, the last warm'
      + ' light of sunset from the west on its pale walls, lamps'
      + ' coming on under the arcades and stallholders packing up'
      + ' inside the covered passage',
      'the free-standing Gothic town hall tower at one end of the'
      + ' square and the small stone church and poet’s monument at'
      + ' the other, the two towers of St Mary’s dark against an'
      + ' orange sky and the townhouses ringing the whole square',
    ),
    selite: 'Sukiennice seisoo lähes neljän hehtaarin keskiaikaisen '
      + 'torin keskellä; renessanssiasunsa se sai 1555 palon jälkeen, '
      + 'ja kiviset irvinaamat reunustavat sen räystäslistaa.',
  },

  /* ---- TEHERAN — Azadi-torni, Golestan, Milad-torni. */
  {
    id: 'teheran-aamu',
    tiedosto: 'hero-teheran-aamu.png',
    kaupunki: 'teheran',
    prompti: p(
      'the Azadi Tower at the western gateway of Tehran',
      'the 45-metre monument clad entirely in cut white marble, its'
      + ' two curving legs sweeping up to meet in a broad Sasanian'
      + ' arch with a narrower pointed arch above it, the surfaces'
      + ' woven into a net of stone ribs and the vault underneath'
      + ' filled with turquoise tilework, low early morning sun from'
      + ' the east raking across the white marble and casting a long'
      + ' shadow over the plaza',
      'the wide oval square around it with lawns, fountains and'
      + ' morning traffic circling as small shapes, low pale city'
      + ' blocks stretching away and the snow-streaked Alborz range'
      + ' along the northern horizon',
    ),
    selite: 'Azadi-torni valmistui 1971 Hossein Amanatin '
      + 'suunnitelmien mukaan: 45-metriseen monumenttiin ladottiin '
      + 'kahdeksantuhatta lohkaretta isfahanilaista valkoista '
      + 'marmoria.',
  },
  {
    id: 'teheran-keskipaiva',
    tiedosto: 'hero-teheran-keskipaiva.png',
    kaupunki: 'teheran',
    prompti: p(
      'the Edifice of the Sun at the Golestan Palace in Tehran',
      'the five-storey Qajar building 35 metres tall, two identical'
      + ' towers flanking a tall arched centre with a clock set high'
      + ' between them, every surface covered in seven-colour glazed'
      + ' tilework of yellow, pink and blue, slender cast-iron'
      + ' columns carrying the upper galleries, high midday sun'
      + ' blazing on the glaze',
      'the walled palace garden below with its long rectangular pool,'
      + ' plane trees and the columned marble throne veranda along'
      + ' one side, and the flat roofs, awnings and lanes of the'
      + ' bazaar quarter pressing against the palace wall',
    ),
    selite: 'Shams ol-Emareh eli Auringon rakennus nousi Golestanin '
      + 'palatsin laitaan 1865–1867 ja oli 35 metrillään Teheranin '
      + 'korkein rakennus — sen katolta näki koko kaupungin.',
  },
  {
    id: 'teheran-ilta',
    tiedosto: 'hero-teheran-ilta.png',
    kaupunki: 'teheran',
    prompti: p(
      'the Milad Tower above Tehran at sunset',
      'the slender concrete shaft rising from an octagonal base to a'
      + ' twelve-floor head pod at 315 metres, the four-stage antenna'
      + ' mast above it carrying the tower to 435 metres, the last'
      + ' orange light of sunset from the west glowing on the pod'
      + ' while its ring of windows begins to light up',
      'the grid of the northern city spread far below with street'
      + ' lights coming on block by block, expressway ribbons of'
      + ' headlights, and the long dark wall of the Alborz mountains'
      + ' closing the horizon',
    ),
    selite: 'Milad-torni valmistui 2007 ja kohoaa 435 metriin '
      + 'antennin kärkeen: kahdeksankulmaiselta jalustalta nouseva '
      + 'betonivarsi kannattaa 315 metrissä kaksitoistakerroksista '
      + 'päätä.',
  },

  /* ---- COLOMBO — Gangaramaya, Jami Ul-Alfar, Lotus Tower. */
  {
    id: 'colombo-aamu',
    tiedosto: 'hero-colombo-aamu.png',
    kaupunki: 'colombo',
    prompti: p(
      'the Gangaramaya Temple beside Beira Lake in Colombo',
      'the eclectic temple complex mixing Sinhalese, Thai, Indian and'
      + ' Chinese forms — a white bell-shaped stupa, a tiered image'
      + ' house crowded with painted figures and carved elephants,'
      + ' the sacred bodhi tree behind its low railing and a'
      + ' courtyard lined with stone Buddhas — low early morning sun'
      + ' slanting through the palms while worshippers dressed in'
      + ' white carry lotus flowers across the yard',
      'the flat water of Beira Lake with the open pavilions and'
      + ' walkway of the Seema Malaka platform standing just offshore,'
      + ' tuk-tuks on the lakeside road and the office towers of'
      + ' Colombo rising in the morning haze',
    ),
    selite: 'Gangaramayan temppeli valmistui 1800-luvun lopulla, ja '
      + 'sen rakennuksissa sekoittuvat singalilainen, thaimaalainen, '
      + 'intialainen ja kiinalainen tyyli — järven päälle rakennetun '
      + 'Seema Malakan suunnitteli Geoffrey Bawa.',
  },
  {
    id: 'colombo-keskipaiva',
    tiedosto: 'hero-colombo-keskipaiva.png',
    kaupunki: 'colombo',
    prompti: p(
      'the red-and-white Jami Ul-Alfar Mosque in the Pettah bazaar of'
      + ' Colombo',
      'the two-storey mosque banded in bold red and white stripes,'
      + ' its clock tower, onion domes and pomegranate-shaped finials'
      + ' piled above an arcade of pointed windows, a hybrid of'
      + ' Indo-Saracenic, gothic revival and neoclassical forms, high'
      + ' midday sun bleaching the stripes while the narrow street'
      + ' below is packed with barrows, awnings and shoppers',
      'the crowded lanes of the Pettah market spreading away with'
      + ' goods stacked on the pavements and buses nosing through,'
      + ' and the cranes of the harbour rising beyond the low roofs',
    ),
    selite: 'Punavalkoraidallinen Jami Ul-Alfar rakennettiin '
      + 'Pettahiin 1908–1909, ja merimiehet tunnistivat siitä koko '
      + 'kaupungin satamaan tullessaan.',
  },
  {
    id: 'colombo-ilta',
    tiedosto: 'hero-colombo-ilta.png',
    kaupunki: 'colombo',
    prompti: p(
      'the Lotus Tower on the shore of Beira Lake in Colombo at dusk',
      'the tower tapering from its broad podium into a great bulb of'
      + ' layered lotus petals high above the city, floodlit pink and'
      + ' gold against a violet sky as the last sunset colour drains'
      + ' from the west, the whole shape doubled in the still black'
      + ' water of the lake below',
      'the lit office blocks of the Fort district, the long dark lawn'
      + ' of Galle Face Green with its evening crowds and food carts'
      + ' as small figures beside the sea, and the Indian Ocean'
      + ' stretching to the horizon',
    ),
    selite: 'Lotus Tower kohoaa Beira-järven rannalla 351,5 metriin '
      + 'ja on Etelä-Aasian korkein itsekantava rakennelma — se '
      + 'valmistui 2019 ja avattiin yleisölle 2022.',
  },

  /* ---- YANGON — Shwedagon, Sule-pagodi, Karaweik. */
  {
    id: 'yangon-aamu',
    tiedosto: 'hero-yangon-aamu.png',
    kaupunki: 'yangon',
    prompti: p(
      'the Shwedagon Pagoda on Singuttara Hill in Yangon',
      'the vast gilded stupa rising 99 metres from its octagonal'
      + ' terraced plinth, the great bell of the stupa sheathed in'
      + ' riveted gold plates and stacked above it a turban band, an'
      + ' inverted almsbowl, rings of lotus petals, a banana bud and'
      + ' the jewelled hti umbrella crown that takes the tip to'
      + ' 112 metres, a dense ring of smaller gilded shrines,'
      + ' pavilions and planetary posts crowding the marble platform,'
      + ' low early morning sun setting the gold ablaze while'
      + ' barefoot pilgrims move as small white figures around it',
      'the four long covered stairways descending the hill between'
      + ' pairs of guardian lion statues, the green treetops of the'
      + ' hill and the low roofs of Yangon spreading toward the river'
      + ' in the morning haze',
    ),
    selite: 'Shwedagonin kullattu stupa nousee Singuttara-kukkulalla '
      + '112 metriin hti-varjostimen kärkeen asti; varjostimessa on '
      + 'tuhansia timantteja ja rubiineja ja aivan huipulla 76 '
      + 'karaatin timantti.',
  },
  {
    id: 'yangon-keskipaiva',
    tiedosto: 'hero-yangon-keskipaiva.png',
    kaupunki: 'yangon',
    prompti: p(
      'the Sule Pagoda in the middle of downtown Yangon',
      'the gilded octagonal Mon-style stupa about 44 metres high,'
      + ' each of its eight sides a little over seven metres wide,'
      + ' standing on a circular base ringed by small shops, shrines'
      + ' and bells right in the middle of a busy traffic roundabout,'
      + ' high midday sun flashing off the gold while buses, cars and'
      + ' pedestrians circle below',
      'the colonial-era blocks of the downtown grid around the'
      + ' roundabout — the tiered roofs of the city hall and the'
      + ' red-brick clock tower of the courts — and rows of shuttered'
      + ' shophouses with laundry and satellite dishes on their flat'
      + ' roofs',
    ),
    selite: 'Sule-pagodi jäi Yangonin ruutukaavan keskipisteeksi, kun '
      + 'brittiläinen insinööri Alexander Fraser vetäisi kadut sen '
      + 'ympärille 1800-luvun puolivälissä.',
  },
  {
    id: 'yangon-ilta',
    tiedosto: 'hero-yangon-ilta.png',
    kaupunki: 'yangon',
    prompti: p(
      'the Karaweik on Kandawgyi Lake in Yangon at sunset',
      'the great concrete pleasure barge built in the shape of a'
      + ' mythical karaweik bird, its gilded bird head and tail'
      + ' curving up at the ends and a many-tiered red and gold'
      + ' pyatthat spire rising over the hall in the middle, moored'
      + ' against the eastern shore, the last orange sunset light'
      + ' running along the gilding and the whole barge mirrored in'
      + ' the still water',
      'the wooded shore of the lake with its boardwalks and'
      + ' strollers as small figures, and the floodlit golden cone of'
      + ' the Shwedagon standing above the treetops on its hill',
    ),
    selite: 'Karaweik valmistui 1974 betonista mytologisen '
      + 'karaweik-linnun muotoon, ja sen esikuvana oli Mandalayn '
      + 'hovin kuninkaallinen ruuhi Pyigyimon.',
  },

  /* ---- ASTANA — Bayterek, Khan Shatyr, Hazrat Sultan. */
  {
    id: 'astana-aamu',
    tiedosto: 'hero-astana-aamu.png',
    kaupunki: 'astana',
    prompti: p(
      'the Baiterek tower on Nurjol Boulevard in Astana',
      'the 105-metre monument standing on its raised plaza: a narrow'
      + ' white shaft caged in white branch-like girders that flare'
      + ' outward near the top to cradle a gold-mirrored sphere'
      + ' 22 metres across, low early morning sun from the east'
      + ' flashing off the golden globe against a pale steppe sky',
      'the long axis of the boulevard running away between'
      + ' symmetrical office blocks, fountains and clipped lawns,'
      + ' early commuters as small figures on the paving, and the'
      + ' flat treeless steppe horizon behind the last buildings',
    ),
    selite: 'Bayterek valmistui 2002 ja kohoaa 105 metriin: '
      + 'oksamaisten tukien varassa lepäävä kullattu pallo on '
      + 'halkaisijaltaan 22 metriä, ja näköalataso on 97 metrissä — '
      + 'muistuttamassa vuodesta 1997, jolloin pääkaupunki siirtyi '
      + 'arolle.',
  },
  {
    id: 'astana-keskipaiva',
    tiedosto: 'hero-astana-keskipaiva.png',
    kaupunki: 'astana',
    prompti: p(
      'the Khan Shatyr tent in Astana',
      'the enormous translucent tent, 150 metres to the tip of its'
      + ' leaning spire, its skin of milky pillowed cushions slung on'
      + ' a fan of steel cables from the central mast over an'
      + ' elliptical base 200 by 195 metres, high midday sun making'
      + ' the whole envelope glow while the trees and galleries of'
      + ' the park inside show dimly through',
      'the boulevard and forecourt at its foot with visitors as'
      + ' small figures, the glass towers of the new government'
      + ' quarter lined up along the avenue on one side and the open'
      + ' steppe running to the horizon on the other',
    ),
    selite: 'Khan Shatyr avattiin 2010 Norman Fosterin toimiston '
      + 'suunnittelemana: kalvokatteinen teltta pitää sisätilan '
      + '15–30 asteessa, vaikka ulkona lämpötila vaihtelee '
      + 'kolmenkymmenenviiden pakkasasteen ja yhtä monen '
      + 'lämpöasteen välillä.',
  },
  {
    id: 'astana-ilta',
    tiedosto: 'hero-astana-ilta.png',
    kaupunki: 'astana',
    prompti: p(
      'the Hazrat Sultan Mosque in Astana at sunset',
      'the great white mosque with its blue and gold main dome rising'
      + ' 51 metres over a drum 28 metres across, eight smaller domes'
      + ' clustered around it and four slender minarets 77 metres'
      + ' high standing at the corners, Kazakh ornament carved into'
      + ' the white stone and picked out in blue tile, the last low'
      + ' sunset light from the west glowing along the facade while'
      + ' the first lamps come on in the forecourt',
      'the wide ceremonial square in front with its tall column and'
      + ' the glass pyramid of the concert and congress hall nearby,'
      + ' the Yesil river curving past the new districts and the'
      + ' darkening steppe beyond the city edge',
    ),
    selite: 'Hazrat Sultanin moskeija avattiin 2012 Yesil-joen '
      + 'rannalle: sen 51-metrinen pääkupoli on Kazakstanin suurin, '
      + 'ja neljä 77-metristä minareettia seisoo rakennuksen '
      + 'kulmissa.',
  },
];
