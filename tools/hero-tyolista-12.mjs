/*
 * HEROKUVATYÖLISTA, KIERROS 17 (6 kaupunkia, 18 kuvaa): Kööpenhamina,
 * Oslo, Ankara, Karachi, Mandalay ja Lhasa.
 *
 * Sama malli kuin tools/hero-tyolista-11.mjs (RESEPTI v7): koko
 * 'vaaka', kolme kuvaa kaupunkia kohti (aamu, keskipäivä, ilta),
 * jokaisessa eri pääkohde. Kytkentä julkaisussa avauskuvat-taulukon
 * kärkeen (ampari: 'herokoe/hero-<id>-<aika>.png').
 *
 * KAUPUNKIVALINTA: lehtikaupunkeja ilman yhtään heroa, maanosia
 * vuorotellen — Eurooppa 2 (Kööpenhamina, Oslo), Turkki ja Lähi-itä 1
 * (Ankara), Etelä-Aasia 1 (Karachi), Kaakkois-Aasia 1 (Mandalay),
 * Itä- ja Keski-Aasia 1 (Lhasa).
 *
 * FAKTAT tarkistettu kaupunkien lehtiaineistosta ja en-Wikipediasta
 * 23.8.2026.
 */

// Reseptin muuttumaton loppuosa — sama kuin hero-tyolista-3..10:ssa.
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
  /* ---- KÖÖPENHAMINA — Marmorikirkko, Christiansborg, Vapahtaja. */
  {
    id: 'kobenhavn-aamu',
    tiedosto: 'hero-kobenhavn-aamu.png',
    kaupunki: 'kobenhavn',
    prompti: p(
      'Frederik’s Church, the Marble Church, on Frederiksgade in'
      + ' Copenhagen',
      'the domed church of pale limestone, its ribbed copper-green dome'
      + ' spanning 31 metres and resting on a colonnaded drum carried by'
      + ' twelve columns, a low pillared portico under a triangular'
      + ' pediment across the front and statues of bishops and'
      + ' theologians standing on the balustrade and on the grass at the'
      + ' foot of the walls, low early morning sun from the east on the'
      + ' drum while the portico stays in shadow; there is only ONE'
      + ' domed building in the picture and nothing rises behind its'
      + ' roofline',
      'the short straight axis of Frederiksgade running east from the'
      + ' church toward the four low rococo palaces of Amalienborg and'
      + ' the harbour beyond, the camera standing on the church side of'
      + ' the street so the wide granite steps and the iron railing are'
      + ' in the foreground, pale plastered townhouses of Frederiksstaden'
      + ' lining both sides and cyclists as small figures on the cobbles',
    ),
    selite: 'Marmorikirkon eli Frederikin kirkon peruskivi laskettiin '
      + '31. lokakuuta 1749 Nicolai Eigtvedin suunnitelmien mukaan, '
      + 'mutta rahat loppuivat ja kirkko valmistui vasta 19. elokuuta '
      + '1894 marmorin sijasta kalkkikivestä — kupolin jänneväli on 31 '
      + 'metriä.',
  },
  {
    id: 'kobenhavn-keskipaiva',
    tiedosto: 'hero-kobenhavn-keskipaiva.png',
    kaupunki: 'kobenhavn',
    prompti: p(
      'Christiansborg Palace on the islet of Slotsholmen in Copenhagen',
      'the heavy grey palace with granite-clad facades under a green'
      + ' copper roof, a square tower standing in the middle of the'
      + ' front and climbing 106 metres to a slender green spire with a'
      + ' gilded crown at its tip, ranks of tall round-headed windows'
      + ' along the wings, a columned portico over the main door and a'
      + ' broad cobbled courtyard closed by low pavilions in front, high'
      + ' midday sun bleaching the granite; there is only ONE tower in'
      + ' the picture and nothing rises behind the roofline',
      'the canals of Slotsholmen with their stone quays and low bridges,'
      + ' the copper roofs and courtyards of the government offices'
      + ' packed onto the same islet, cyclists and walkers crossing the'
      + ' bridges as small figures, and the low tiled city with its'
      + ' green church spires stretching away to the harbour cranes',
    ),
    selite: 'Kolmas Christiansborgin linna rakennettiin 1907–1928 '
      + 'Thorvald Jørgensenin suunnitelmien mukaan, sen 106 metrin '
      + 'torni on yhä kaupungin korkein, ja talossa toimivat eduskunta, '
      + 'pääministerin virasto ja korkein oikeus.',
  },
  {
    id: 'kobenhavn-ilta',
    tiedosto: 'hero-kobenhavn-ilta.png',
    kaupunki: 'kobenhavn',
    prompti: p(
      'the Church of Our Saviour in Christianshavn, Copenhagen, at'
      + ' sunset',
      'the brick church of mixed red and yellow tiles standing on a'
      + ' granite base, and over it the black and gold helix spire'
      + ' climbing 90 metres, its gilded external staircase winding four'
      + ' times counterclockwise up the outside of the tapering spire to'
      + ' a small gilded globe carrying a four-metre figure of Christ'
      + ' with a banner, warm low sunset light from the west setting the'
      + ' gilding alight; there is only ONE spire in the picture and'
      + ' nothing rises behind the roofline',
      'the narrow canals and low ochre and red houses of Christianshavn'
      + ' below with moored boats and bicycles along the quays, people'
      + ' crossing the bridges as small figures, and the harbour with'
      + ' its cranes and the roofs of the old town beyond, lamps coming'
      + ' on street by street',
    ),
    selite: 'Vapahtajan kirkko vihittiin 1695 ja Lauritz de Thurahin '
      + 'kierreportainen torninhuippu valmistui 1752 — 90 metrin '
      + 'korkeuteen nousee 400 porrasta, joista viimeiset 150 kiertävät '
      + 'tornia ulkopuolelta.',
  },

  /* ---- OSLO — Akershus, Holmenkollen, kuninkaanlinna. */
  {
    id: 'oslo-aamu',
    tiedosto: 'hero-oslo-aamu.png',
    kaupunki: 'oslo',
    prompti: p(
      'Akershus Fortress on its rock above the harbour in Oslo',
      'the medieval stone castle with thick grey masonry walls and small'
      + ' deep windows, two square towers and a round tower capped with'
      + ' steep dark spires, stepped Renaissance gables and red tiled'
      + ' roofs between them, and the sloping earth bastions and cannon'
      + ' embrasures of the outer works dropping toward the water, low'
      + ' early morning sun from the east warming the stone and throwing'
      + ' long shadows across the grass ramparts; there is only ONE'
      + ' castle in the picture and nothing rises behind its roofline',
      'the fjord below with ferries and small boats leaving white wakes,'
      + ' the wooden quays and warehouses of the old harbour and the'
      + ' dark brick block of the city hall with its two square towers'
      + ' to the west, the low centre of Oslo with yellow trams and'
      + ' people as small figures, and the forested ridges around the'
      + ' valley in the morning haze',
    ),
    selite: 'Akershusin linnoitus rakennettiin 1290-luvun lopulla '
      + 'kuningas Haakon V:n käskystä, se kesti kaikki piiritykset, ja '
      + 'Christian IV muutti sen 1600-luvulla renessanssilinnaksi '
      + 'italialaisvaikutteisine bastioneineen.',
  },
  {
    id: 'oslo-keskipaiva',
    tiedosto: 'hero-oslo-keskipaiva.png',
    kaupunki: 'oslo',
    prompti: p(
      'the Holmenkollen ski jump on the wooded ridge above Oslo',
      'the white steel ski jump springing out of the hillside as a'
      + ' single cantilevered ramp, a tall open lattice of steel ribs'
      + ' carrying the inrun up to a glazed viewing platform at the very'
      + ' top, translucent perforated steel wind screens along both'
      + ' sides of the inrun through which the sky and the dark spruce'
      + ' forest behind show as a grey haze, the wide green landing'
      + ' slope falling away into a bowl of concrete and steel'
      + ' grandstands, high midday sun on the white steel; there is only'
      + ' ONE ski jump in the picture and nothing rises behind it on the'
      + ' ridge',
      'the wooden villas and dark spruce forest of the Holmenkollen'
      + ' ridge around the arena, a few people as small figures on the'
      + ' terraces of the stands, and far below the whole city of Oslo'
      + ' spread along the head of the fjord with its islands and'
      + ' ferries in the summer haze',
    ),
    selite: 'Holmenkollenissa hypättiin ensimmäinen kilpailu 30. '
      + 'tammikuuta 1892, ja nykyinen teräsmäki rakennettiin 2008–2010 '
      + 'Julien De Smedtin ja Florian Koschen voittaneen kilpailutyön '
      + 'mukaan — mäen HS-luku on 134 metriä.',
  },
  {
    id: 'oslo-ilta',
    tiedosto: 'hero-oslo-ilta.png',
    kaupunki: 'oslo',
    prompti: p(
      'the Royal Palace at the top of Karl Johans gate in Oslo at sunset',
      'the long neoclassical palace of stuccoed brick painted pale'
      + ' yellow, three storeys under a low green copper roof, a portico'
      + ' of six tall Ionic columns in the middle of the front reached'
      + ' by a wide flight of steps, plain pilasters and even rows of'
      + ' rectangular windows running out to the end wings, warm low'
      + ' sunset light from the west along the yellow facade while the'
      + ' first lamps come on; there is only ONE palace in the picture'
      + ' and nothing rises behind its roofline',
      'the open gravelled square in front with the bronze equestrian'
      + ' statue of King Charles John on its plinth, the camera standing'
      + ' on the palace side of the square so the steps and a sentry box'
      + ' are in the foreground, the straight line of Karl Johans gate'
      + ' running downhill eastward between trees toward the parliament'
      + ' and the city, and the wooded hills darkening beyond the roofs',
    ),
    selite: 'Oslon kuninkaanlinna rakennettiin 1824–1849 Hans '
      + 'Linstowin suunnitelmien mukaan, siinä on 173 huonetta, ja sitä '
      + 'ympäröi 22 hehtaarin puisto.',
  },

  /* ---- ANKARA — Anıtkabir, Hacı Bayram ja Atakule. */
  {
    id: 'ankara-aamu',
    tiedosto: 'hero-ankara-aamu.png',
    kaupunki: 'ankara',
    prompti: p(
      'Anıtkabir, the mausoleum of Atatürk, on its hill in Ankara',
      'the rectangular hall of honour of pale travertine standing on a'
      + ' high plinth, a colonnade of plain square columns 14.4 metres'
      + ' tall carrying a flat entablature all the way around it, walls'
      + ' rising 17 metres over a plan of 41.65 by 57.35 metres and a'
      + ' broad flight of steps up to the bronze door under a deep'
      + ' portico, low early morning sun from the east raking the stone'
      + ' and lighting the columns one by one; there is only ONE such'
      + ' hall in the picture and nothing rises behind its roofline',
      'the huge paved ceremonial plaza in front laid with patterned'
      + ' coloured stone, the camera standing at the head of the'
      + ' 262-metre Road of Lions so that its twelve pairs of seated'
      + ' stone lions and the low square towers along the edges run away'
      + ' below, a few visitors as small figures on the paving, and the'
      + ' pine woods of the hill with the white apartment blocks of'
      + ' Ankara filling the valley beyond',
    ),
    selite: 'Anıtkabir rakennettiin 9. lokakuuta 1944 alkaen ja '
      + 'valmistui 1. syyskuuta 1953 Emin Onatin ja Orhan Ardan '
      + 'suunnitelmien mukaan Rasattepen kukkulalle, ja sen '
      + 'seremonia-aukiolle mahtuu 15 000 ihmistä.',
  },
  {
    id: 'ankara-keskipaiva',
    tiedosto: 'hero-ankara-keskipaiva.png',
    kaupunki: 'ankara',
    prompti: p(
      'the Hacı Bayram Mosque beside the ruined Temple of Augustus in'
      + ' the old town of Ankara',
      'the square Ottoman mosque of warm brick and stone measuring some'
      + ' twenty metres a side, a tiled pitched roof with a low dome'
      + ' behind it about thirty metres above the ground, deep eaves and'
      + ' two rows of arched windows, a single slender minaret with one'
      + ' balcony rising about fifty metres at the corner, the small'
      + ' domed tomb of Hacı Bayram Veli at its foot, and directly'
      + ' behind the mosque the tall roofless ashlar walls of the Roman'
      + ' temple of Augustus with its carved doorway still standing,'
      + ' high midday sun flattening the shadows',
      'the wide paved square below with fountains, plane trees and'
      + ' pigeons and people walking as small figures, the camera on the'
      + ' square side so that the low stone parapet and the stalls at'
      + ' the edge of the paving are in the foreground, the restored'
      + ' ochre Ottoman houses of the old town and the castle hill'
      + ' rising behind, and the towers of the new city beyond',
    ),
    selite: 'Hacı Bayramin moskeija rakennettiin 1427–1428 pyhimyksen '
      + 'haudan viereen kiinni Augustuksen ja Roman temppeliin, ja sen '
      + 'ainoa minareetti nousee viiteenkymmeneen metriin.',
  },
  {
    id: 'ankara-ilta',
    tiedosto: 'hero-ankara-ilta.png',
    kaupunki: 'ankara',
    prompti: p(
      'the Atakule tower in the Çankaya district of Ankara at sunset',
      'the 125-metre concrete tower standing on a broad low shopping'
      + ' podium, a slender ribbed shaft carrying a wide flaring collar'
      + ' of decks near the top, a continuous band of tinted glass'
      + ' around the revolving restaurant through which the lit ceiling'
      + ' and the silhouettes of tables show, a smaller glazed cupola'
      + ' above it and a short mast on the summit, warm low sunset light'
      + ' from the west on the western face of the shaft while the'
      + ' eastern side falls into shadow and the deck lights come on;'
      + ' there is only ONE tower in the picture and nothing rises'
      + ' behind it',
      'the terraces, steps and clipped gardens of the podium below with'
      + ' people as small figures, the wide avenues of Çankaya with'
      + ' traffic in ribbons of headlights, the dense white apartment'
      + ' blocks of Ankara falling away north toward the castle hill,'
      + ' and the bare treeless ridges of the Anatolian plateau against'
      + ' an orange sky',
    ),
    selite: 'Atakule avattiin 13. lokakuuta 1989 Ragıp Buluçin '
      + 'suunnitelmien mukaan, se on 125 metriä korkea, ja sen '
      + 'Sevilla-ravintola tekee täyden kierroksen tunnissa.',
  },

  /* ---- KARACHI — Mazar-e-Quaid, Empress Market, Masjid e Tooba. */
  {
    id: 'karachi-aamu',
    tiedosto: 'hero-karachi-aamu.png',
    kaupunki: 'karachi',
    prompti: p(
      'Mazar-e-Quaid, the mausoleum of Muhammad Ali Jinnah, in Karachi',
      'the white marble mausoleum standing alone on a raised platform, a'
      + ' cube 75 metres on a side rising 43 metres, each of the four'
      + ' faces opened by one tall pointed arch with copper lattice'
      + ' grilles set into it, a smooth low white dome capping the roof'
      + ' and broad flights of steps climbing the plinth, low early'
      + ' morning sun from the east making the marble glow warm on one'
      + ' side and pale blue in shadow on the other; there is only ONE'
      + ' such building in the picture and nothing rises behind its'
      + ' roofline',
      'the wide green park around it with clipped lawns and terraced'
      + ' avenues, the camera standing over the line of fifteen'
      + ' successive fountains so that the water steps and the broad'
      + ' walkway lead in from the foreground, early walkers as small'
      + ' figures on the paths, and the low flat-roofed blocks and'
      + ' minarets of central Karachi stretching away into the haze',
    ),
    selite: 'Mazar-e-Quaidin peruskivi laskettiin 31. heinäkuuta 1960 '
      + 'ja mausoleumi vihittiin 18. tammikuuta 1971 Yahya Merchantin '
      + 'suunnitelmien mukaan — valkoisen marmorikuution sivu on 75 '
      + 'metriä ja korkeus 43 metriä.',
  },
  {
    id: 'karachi-keskipaiva',
    tiedosto: 'hero-karachi-keskipaiva.png',
    kaupunki: 'karachi',
    prompti: p(
      'the Empress Market in Saddar, Karachi',
      'the long Indo-Gothic market hall of pale yellow limestone with'
      + ' lighter dressings, cusped arches along its arcaded fronts,'
      + ' steep vaulted roofs over four parallel galleries, and one'
      + ' square clock tower 140 feet high rising over the entrance with'
      + ' carved leopard heads under its clock faces and a pointed cap on'
      + ' top, high midday sun burning on the stone and cutting hard'
      + ' shadows under the arcades; there is only ONE clock tower in'
      + ' the picture and nothing rises behind the roofline',
      'the market street below with awnings, handcarts, fruit stalls and'
      + ' shoppers moving as small figures, buses and rickshaws in the'
      + ' traffic circling the building, the low colonial blocks and'
      + ' painted signboards of Saddar pressing in on every side and the'
      + ' flat sprawl of Karachi under a white sky',
    ),
    selite: 'Empress Market rakennettiin 1884–1889 James Strachanin '
      + 'suunnitelmien mukaan, sen kellotorni on 140 jalkaa korkea, ja '
      + 'sisäpihan 130 kertaa 100 jalan alalle mahtui alun perin 280 '
      + 'kauppiasta.',
  },
  {
    id: 'karachi-ilta',
    tiedosto: 'hero-karachi-ilta.png',
    kaupunki: 'karachi',
    prompti: p(
      'Masjid e Tooba in the Defence district of Karachi at sunset',
      'the low white mosque built almost entirely as one enormous'
      + ' shallow dome of white marble 65 metres across resting on a low'
      + ' surrounding wall with no pillars or columns beneath it, a ring'
      + ' of small windows around the base of the dome, a single slender'
      + ' minaret 37 metres tall standing beside it and wide marble'
      + ' courts and steps around the base, warm low sunset light from'
      + ' the west sliding across the curve of the dome; there is only'
      + ' ONE dome in the picture and nothing rises behind the roofline',
      'the walled garden and paved forecourt around the mosque with'
      + ' palms and low lamps coming on, people arriving as small'
      + ' distant figures along the paths, the wide straight road past'
      + ' the compound with headlights, and the low villas and flat'
      + ' roofs of the Defence district running away to an orange'
      + ' horizon',
    ),
    selite: 'Masjid e Tooba rakennettiin 1966–1969 Babar Hameed '
      + 'Chauhanin suunnitelmien mukaan, ja sen 65 metriä leveä '
      + 'valkoinen marmorikupoli lepää matalan ympärysmuurin varassa '
      + 'ilman yhtään pilaria; saliin mahtuu 5 000 ihmistä.',
  },

  /* ---- MANDALAY — Atumashi, Sandamuni ja Kyauktawgyi. */
  {
    id: 'mandalay-aamu',
    tiedosto: 'hero-mandalay-aamu.png',
    kaupunki: 'mandalay',
    prompti: p(
      'the Atumashi Monastery near the southern foot of Mandalay Hill',
      'the great white stuccoed monastery hall standing on a wide'
      + ' masonry terrace, its roof built as five graduated rectangular'
      + ' terraces stacked one above the other instead of the usual'
      + ' tiered Burmese spire, a long flight of steps and a pillared'
      + ' porch across the front, plain whitewashed walls with tall'
      + ' narrow openings and a low balustrade running around every'
      + ' terrace, low early morning sun from the east on the white'
      + ' walls with the shadows still blue; there is only ONE such hall'
      + ' in the picture and no second white roofline behind it',
      'the swept sandy compound with palms and a low white boundary'
      + ' wall, a few visitors as small figures at the steps, the gilded'
      + ' stupas and rows of small white shrines of the neighbouring'
      + ' pagodas among the trees, and the flat roofs of Mandalay'
      + ' running south toward the palace moat',
    ),
    selite: 'Kuningas Mindon rakennutti Atumashin luostarin 1857 puolen '
      + 'miljoonan rupian hinnalla, tulipalo tuhosi sen 1890, ja se '
      + 'rakennettiin uudelleen 1996 — katto nousee viitenä '
      + 'suorakulmaisena pengermänä tavanomaisen tornin sijasta.',
  },
  {
    id: 'mandalay-keskipaiva',
    tiedosto: 'hero-mandalay-keskipaiva.png',
    kaupunki: 'mandalay',
    prompti: p(
      'the Sandamuni Pagoda southwest of Mandalay Hill',
      'the gilded central stupa rising as a bell on stepped square'
      + ' terraces to a tapering golden spire with a metal umbrella and'
      + ' bells at the top, and around it rank upon rank of small'
      + ' identical whitewashed shrines in dead straight rows, each one a'
      + ' narrow pointed cell with its own little white spire sheltering'
      + ' an upright marble tablet, high midday sun blazing on the gold'
      + ' and on the lime-washed rows so that they throw short hard'
      + ' shadows',
      'the swept walkways between the rows with tamarind trees for shade'
      + ' and a few visitors as small figures, the low wall and painted'
      + ' gates of the compound, and the flat roofs, palms and pagoda'
      + ' spires of Mandalay stretching south toward the palace moat',
    ),
    selite: 'Kuningas Mindon perusti Sandamunin pagodin 1874 murhatun '
      + 'veljensä Kanaungin muistoksi, ja siellä on Bodawpayan vuonna '
      + '1802 valattama rautainen buddhapatsas, joka painaa yli 18 500 '
      + 'kiloa.',
  },
  {
    id: 'mandalay-ilta',
    tiedosto: 'hero-mandalay-ilta.png',
    kaupunki: 'mandalay',
    prompti: p(
      'the Kyauktawgyi Buddha Temple at the southern foot of Mandalay'
      + ' Hill at sunset',
      'the square whitewashed temple whose central hall carries a tall'
      + ' tiered roof of gilded and red-lacquered wooden stages'
      + ' narrowing step by step to a golden spire, projecting porches'
      + ' with carved flame-shaped pediments on each of the four sides,'
      + ' arcaded galleries of small niches running around the enclosure'
      + ' wall, warm low sunset light from the west gilding the spire'
      + ' while the courtyard falls into shadow; there is only ONE such'
      + ' temple in the picture and no second spire behind it',
      'the walled courtyard below with rows of trees, small shrine'
      + ' houses and people walking as small figures on the warm stone,'
      + ' the straight road and the corner of the old palace moat beyond'
      + ' the wall, and the plain of Mandalay with the Irrawaddy lying'
      + ' as a pale band in the west',
    ),
    selite: 'Kyauktawgyin temppelin rakentaminen alkoi 1853 kuningas '
      + 'Mindonin käskystä ja valmistui vasta 1878, ja sen sisällä '
      + 'istuu buddhapatsas, joka veistettiin yhdestä ainoasta '
      + 'vaaleanvihreästä marmorilohkareesta Sagyinin louhoksilta 19 '
      + 'kilometrin päästä.',
  },

  /* ---- LHASA — Jokhang, Drepung ja Norbulingka. */
  {
    id: 'lhasa-aamu',
    tiedosto: 'hero-lhasa-aamu.png',
    kaupunki: 'lhasa',
    prompti: p(
      'the Jokhang Temple in the old town of Lhasa',
      'the four-storey temple of whitewashed stone and timber with dark'
      + ' tapering window frames and a broad maroon brushwood frieze'
      + ' under the eaves, its flat roofs covered with gilded bronze'
      + ' tiles and small gilded pavilions, a golden dharma wheel'
      + ' flanked by two kneeling golden deer standing over the main'
      + ' west gate, rows of prayer flags and gilded victory banners'
      + ' along the parapet, low early morning sun from the east'
      + ' striking the gold so that it burns against the deep blue'
      + ' high-altitude sky',
      'the wide flagstoned square in front of the west gate with its two'
      + ' stone pillars and its juniper incense burners smoking, the'
      + ' camera standing on the square side so that the pale worn'
      + ' flagstones and the low benches are in the foreground and'
      + ' people cross far below as small figures, the whitewashed'
      + ' flat-roofed houses and shopfronts of the Barkhor circuit'
      + ' closing the square, and the bare brown mountains around the'
      + ' valley',
    ),
    selite: 'Jokhangin temppelin rakennutti noin vuonna 652 kuningas '
      + 'Songtsen Gampo, sen pääportti osoittaa länteen Nepaliin päin, '
      + 'ja temppelialue kattaa 2,5 hehtaaria.',
  },
  {
    id: 'lhasa-keskipaiva',
    tiedosto: 'hero-lhasa-keskipaiva.png',
    kaupunki: 'lhasa',
    prompti: p(
      'the Drepung Monastery on the slope of Mount Gephel west of Lhasa',
      'the whole white monastic town climbing the brown mountainside,'
      + ' dozens of flat-roofed whitewashed buildings stacked in'
      + ' terraces up the slope with dark trapezoid window frames, and'
      + ' above them the big assembly hall with its maroon frieze,'
      + ' gilded roof ornaments and golden pinnacle, wide stone'
      + ' stairways and narrow lanes threading between the blocks, high'
      + ' midday sun bleaching the whitewash to a blinding white against'
      + ' the dry brown rock',
      'the boulder-strewn slope with juniper smoke drifting over it and'
      + ' a few visitors as small figures on the stairs, the road'
      + ' winding down through fields on the valley floor, and the flat'
      + ' sprawl of Lhasa five kilometres to the east with the mountains'
      + ' beyond it under a hard blue sky',
    ),
    selite: 'Drepungin luostarin perusti 1416 Tsongkhapan oppilas '
      + 'Jamyang Choje, ja siitä kasvoi maailman suurin luostari, jossa '
      + 'asui 7 700 munkkia ja ajoittain jopa kymmenentuhatta.',
  },
  {
    id: 'lhasa-ilta',
    tiedosto: 'hero-lhasa-ilta.png',
    kaupunki: 'lhasa',
    prompti: p(
      'the Norbulingka summer palace west of Lhasa at sunset',
      'the two-storey palace standing among its gardens, whitewashed'
      + ' walls with sloping dark window frames and a maroon frieze in'
      + ' the Tibetan manner, a flat roof edged with a gilded parapet'
      + ' and small gilded finials at the corners, a covered veranda of'
      + ' carved wooden pillars painted red, green and gold along the'
      + ' front and a short flight of stone steps up to the painted'
      + ' door, warm low sunset light from the west along the veranda'
      + ' while the garden falls into shadow; there is only ONE palace'
      + ' in the picture and no second roofline behind it',
      'the walled park around it with willows and poplars, flower beds,'
      + ' ponds and small pavilions and gravel paths where a few people'
      + ' walk as small figures, the low houses of western Lhasa beyond'
      + ' the wall with the Potala rock standing far to the east, and'
      + ' the bare mountains going violet in the last light',
    ),
    selite: 'Norbulingkan rakennutti 1755 seitsemäs dalai-lama '
      + 'kesäasunnokseen ja se valmistui 1783, ja 36 hehtaarin puiston '
      + 'rakennuksissa on yhteensä 374 huonetta.',
  },
];
