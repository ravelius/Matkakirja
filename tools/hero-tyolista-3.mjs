/*
 * HEROKUVATYÖLISTA, KIERROKSET 7–8 (6 kaupunkia, 18 kuvaa).
 *
 * Tämä tiedosto on TILAUSLISTA kuvageneraattorille, ei pelidataa.
 * Peli ei lue tätä taulua: valmiin herokuvan kytkentä tehdään
 * erikseen julkaisussa lisäämällä kaupungin avauskuvat-taulukon
 * KÄRKEEN merkintä
 *   { ampari: 'herokoe/hero-<id>-<aika>.png',
 *     selite: <tämän tiedoston selite>,
 *     lahde: 'Matkakirjan havainnekuva' }
 * js/packs/kulttuuri-kategoriat.js:ään — vasta kun kuvat ovat R2:ssa.
 *
 * GENEROINTI: koko 'vaaka'. Kolme kuvaa kaupunkia kohti (aamu,
 * keskipäivä, ilta), ja JOKAISESSA ERI PÄÄKOHDE — ei kolmea kuvaa
 * samasta rakennuksesta. Tiedostonimessä keskipäivä kirjoitetaan
 * ILMAN ääkkösiä muotoon "keskipaiva".
 *
 * RESEPTI v7 (hyväksytty; prompti on englanniksi, koska generointi on):
 *   "A photorealistic wide photograph of [KOHDE] dominating the
 *    foreground: [kuvaus, aamu/keskipäivä/ilta-aurinko]. Behind and
 *    below it, smaller: [ympäristö]. Shot from a LOW ELEVATED
 *    viewpoint at rooftop height, roughly level with the landmark's
 *    midpoint, camera tilted only gently downward (about 15 degrees):
 *    the landmark towers large and dominant in the foreground, its
 *    facade fully visible, while streets with people directly below
 *    and the city behind stretch into the distance. Professional
 *    full-frame drone photograph, natural colours, crisp detail,
 *    realistic atmosphere, no stylization. Absolutely no text, no
 *    watermark, no borders."
 * Reseptin loppuosa (kuvakulmasta eteenpäin) on JOKAISESSA prompissa
 * sanatarkasti sama; vain hakasulut vaihtuvat.
 *
 * KAUPUNKIVALINTA. Mukaan otettiin vain kaupunkeja, joilla on
 * kaupunkilehti (lohko js/packs/kulttuuri-kategoriat.js:ssä) mutta
 * joiden avauskuvissa ei vielä ole yhtään ampari-kenttää eli
 * herokuvaa. Maanosia vuorotellaan kuten aiemmillakin kierroksilla:
 *   Kierros 7: ateena (Eurooppa) · soul (Itä-Aasia) · isfahan (Lähi-itä)
 *   Kierros 8: praha (Eurooppa) · samarkand (Keski-Aasia) · luxor (Afrikka)
 * Lähi-idän paikaksi valittiin Isfahan, koska sen kohteet ovat alueen
 * tunnetuimpia ja arkkitehtuuriltaan tarkimmin dokumentoituja
 * (Naqsh-e Jahanin aukio on maailmanperintökohde); Damaskos ja Masqat
 * jäivät odottamaan. Kierroksen 8 afrikkalaiseksi kaupungiksi valittiin
 * Luxor, koska Kairo on jo tehty ja Luxorin kohteet ovat maanosan
 * tunnetuimpia — Tripoli jäi selvästi heikommilla maamerkeillä toiseksi.
 *
 * FAKTAT tarkistettiin kaupungin omasta lehtidatasta
 * (js/packs/kulttuuri-kategoriat.js) ja en-Wikipediasta 22.8.2026:
 * pylväsluvut, mitat, rakennusvuodet ja arkkitehdit ovat prompissa
 * niin kuin ne rakennuksissa ovat, jotta kuva ei keksi
 * arkkitehtuuria omiaan.
 *
 * SELITTEET noudattavat Raamatun kuvatekstilinjausta: yksi virke,
 * joka kertoo KOHTEESTA (historia, merkitys, mitta) eikä kuvasta —
 * ei valoa, värejä, sommittelua eikä "etualalla kohoaa".
 */

// Reseptin muuttumaton loppuosa. Älä muokkaa yksittäisessä
// merkinnässä — jos tämä muuttuu, kyseessä on uusi reseptiversio.
const KUVAKULMA =
  " Shot from a LOW ELEVATED viewpoint at rooftop height, roughly level"
  + " with the landmark's midpoint, camera tilted only gently downward"
  + ' (about 15 degrees): the landmark towers large and dominant in the'
  + ' foreground, its facade fully visible, while streets with people'
  + ' directly below and the city behind stretch into the distance.'
  + ' Professional full-frame drone photograph, natural colours, crisp'
  + ' detail, realistic atmosphere, no stylization. Absolutely no text,'
  + ' no watermark, no borders.';

// prompti(kohde, kuvaus, ymparisto) — kokoaa v7-reseptin.
const p = (kohde, kuvaus, ymparisto) =>
  `A photorealistic wide photograph of ${kohde} dominating the`
  + ` foreground: ${kuvaus}. Behind and below it, smaller:`
  + ` ${ymparisto}.${KUVAKULMA}`;

export const TYOLISTA = [
  /* ---- KIERROS 7 ---------------------------------------------- */

  /* ATEENA — Parthenon, Zeuksen temppeli, Kallimarmaro. */
  {
    id: 'ateena-aamu',
    tiedosto: 'hero-ateena-aamu.png',
    kaupunki: 'ateena',
    prompti: p(
      'the Parthenon on the Athenian Acropolis',
      'the Doric temple of white Pentelic marble on its three-stepped'
      + ' platform, eight fluted columns across the front and seventeen'
      + ' down each flank, the pediments broken open and the architrave'
      + ' with its triglyph frieze still running above the colonnade,'
      + ' the roofless interior visible between the columns, low early'
      + ' morning sun raking in from the east so the marble glows honey'
      + ' coloured and the columns throw long shadows across the rock',
      'the flat limestone crown of the Acropolis with the Erechtheion'
      + ' and the gateway of the Propylaia, the ancient theatre on the'
      + ' southern slope, and beyond them the low white apartment blocks'
      + ' of Athens filling the basin toward the cone of Lycabettus and'
      + ' the ridge of Mount Hymettus',
    ),
    selite: 'Parthenon rakennettiin Athena Parthenoksen temppeliksi '
      + 'vuosina 447–438 eaa., ja sen piirsivät Iktinos ja Kallikrates '
      + 'Feidiaan johtaessa veistostöitä.',
  },
  {
    id: 'ateena-keskipaiva',
    tiedosto: 'hero-ateena-keskipaiva.png',
    kaupunki: 'ateena',
    prompti: p(
      'the Temple of Olympian Zeus in Athens',
      'the fifteen surviving Corinthian columns of the colossal temple,'
      + ' each about seventeen metres tall with deeply carved acanthus'
      + ' capitals, a section of architrave still bridging the corner'
      + ' group, and a sixteenth column lying toppled on the platform as'
      + ' a neat row of drum segments, high midday sun almost overhead'
      + ' so the shadows are short and hard and the limestone stands'
      + ' bleached against a deep blue sky',
      "the small arch of Hadrian's Gate at the corner of the enclosure,"
      + ' the traffic and pavements of the boulevard beside it, the'
      + ' green canopy of the National Garden, and the Acropolis rock'
      + ' with the Parthenon on the skyline behind',
    ),
    selite: 'Zeuksen temppelin rakentaminen aloitettiin 500-luvulla '
      + 'eaa., mutta se valmistui vasta keisari Hadrianuksen aikana '
      + 'vuonna 131 jaa. eli yli kuusisataa vuotta myöhemmin.',
  },
  {
    id: 'ateena-ilta',
    tiedosto: 'hero-ateena-ilta.png',
    kaupunki: 'ateena',
    prompti: p(
      'the Panathenaic Stadium in Athens',
      'the horseshoe of white marble tiers rising in steep banks around'
      + ' the narrow running track with its two hairpin turns, the'
      + ' curved sphendone closing the far end, the marble entrance'
      + ' gateway and the double herms standing along the track, low'
      + ' golden evening sun from the west washing the empty marble'
      + ' benches in warm amber and drawing long shadows down the rows',
      'the pine-covered Ardittos hill pressing against the far side of'
      + ' the bowl, the avenue and pavements below with people and'
      + ' traffic, the National Garden and the dense roofs of Athens,'
      + ' and the Acropolis on the horizon',
    ),
    selite: 'Panathinaikon stadion sai marmoriasunsa jo Herodes '
      + 'Atticuksen aikana vuonna 144 jaa., ja Georgios Averoffin '
      + 'lahjoitus nosti sen ennalleen ensimmäisiin nykyaikaisiin '
      + 'olympialaisiin vuonna 1896.',
  },

  /* SOUL — Gyeongbokgungin valtaistuinsali, Sungnyemun, Soulin torni. */
  {
    id: 'soul-aamu',
    tiedosto: 'hero-soul-aamu.png',
    kaupunki: 'soul',
    prompti: p(
      'the Geunjeongjeon throne hall of Gyeongbokgung Palace in Seoul',
      'the wooden throne hall standing on a double stone terrace with'
      + ' carved balustrades and stone zodiac guardians at the corners,'
      + ' two tiers of upswept tiled roofs carried on thick red'
      + ' lacquered columns, the bracket sets under the deep eaves'
      + ' painted in green, blue and red dancheong patterns, the broad'
      + ' flagstoned courtyard in front lined with the stone rank'
      + ' markers of the court, clear low morning sunlight from the east'
      + ' warming the grey roof tiles and stretching shadows across the'
      + ' court',
      'the walled palace precinct with its gate halls and the pavilion'
      + ' on the lotus pond, the granite ridge of Bugaksan rising'
      + ' directly behind the palace, and the glass office towers of'
      + ' central Seoul spreading away on either side',
    ),
    selite: 'Gyeongbokgung valmistui Joseon-dynastian pääpalatsiksi '
      + 'vuonna 1395, ja sen valtaistuinsali Geunjeongjeon rakennettiin '
      + 'nykyiseen asuunsa 1867, kun palatsi nostettiin vuoden 1592 '
      + 'sodan tuhoista.',
  },
  {
    id: 'soul-keskipaiva',
    tiedosto: 'hero-soul-keskipaiva.png',
    kaupunki: 'soul',
    prompti: p(
      'the Sungnyemun gate, the great south gate of Seoul',
      'the two-storey wooden gatehouse with its double hipped-and-gabled'
      + ' tiled roofs sitting on a massive granite base pierced by a'
      + ' single arched passage, painted bracket sets crowding under the'
      + ' deep eaves, short restored stretches of the old city wall'
      + ' running away on either side, high midday sun almost overhead'
      + ' so the granite stands pale, the dark roof tiles catch the'
      + ' light and the shadows under the eaves are crisp and short',
      'the wide road curving around the gate with traffic and'
      + ' pedestrians on the plaza, the awnings and alleys of the'
      + ' Namdaemun market, and the curtain-walled office towers of the'
      + ' downtown district closing the view',
    ),
    selite: 'Sungnyemun eli Namdaemun valmistui kaupunginmuurin '
      + 'eteläiseksi pääportiksi vuonna 1398, ja vuoden 2008 '
      + 'tuhopoltossa palanut yläkerta ennallistettiin perinteisin '
      + 'menetelmin vuoteen 2013 mennessä.',
  },
  {
    id: 'soul-ilta',
    tiedosto: 'hero-soul-ilta.png',
    kaupunki: 'soul',
    prompti: p(
      'the Namsan Seoul Tower on its mountain summit',
      'the slender concrete shaft rising from a splayed base to the'
      + ' ringed observation decks and the tapering lattice antenna mast'
      + ' above, a tower of 236 metres standing on the wooded crown of'
      + ' Namsan, low warm evening sun from the west turning the white'
      + ' shaft gold against a deepening blue sky while the first lights'
      + ' come on in the streets far below',
      'the forested slopes and walking paths of Namsan park with the'
      + ' restored stone beacon mounds on the ridge, the dense grid of'
      + " downtown Seoul below, the Han river and its bridges crossing"
      + ' the city, and ranks of granite mountains along the horizon',
    ),
    selite: 'Namsanin laelle vuosina 1969–1971 rakennettu 236-metrinen '
      + 'torni oli Korean ensimmäinen useaa televisio- ja radiokanavaa '
      + 'palvellut masto, ja yleisö pääsi sen näköalatasanteelle '
      + 'vuonna 1980.',
  },

  /* ISFAHAN — shaahin moskeija, Si-o-se-pol, Sheikh Lotfollah. */
  {
    id: 'isfahan-aamu',
    tiedosto: 'hero-isfahan-aamu.png',
    kaupunki: 'isfahan',
    prompti: p(
      'the Shah Mosque on Naqsh-e Jahan square in Isfahan',
      'the great turquoise double-shell dome of the Safavid mosque'
      + ' rising some fifty metres on its drum, every surface covered in'
      + ' arabesque mosaic faience of blue, white and yellow, the tall'
      + ' entrance iwan on the square with its honeycomb muqarnas'
      + ' half-vault and flanking pair of slender minarets, the'
      + ' four-iwan courtyard with its rectangular ablution pool behind,'
      + ' the whole building turned at an angle to the square so that it'
      + ' faces Mecca, low morning sun from the east igniting the'
      + ' tilework',
      'the vast rectangular square more than five hundred metres long'
      + ' with its two storeys of arcaded shopfronts running all the way'
      + ' around, the pool and gardens in the middle, the tall balconied'
      + ' Ali Qapu palace on the western side, and the flat brown roofs'
      + ' of Isfahan running out to the dry Zagros ridges',
    ),
    selite: 'Shaahin moskeija rakennettiin Abbas Suuren käskystä '
      + 'vuosina 1611–1629 Naqsh-e Jahanin aukion eteläpäähän, ja sen '
      + 'porttiholvi on käännetty aukion linjasta, jotta itse moskeija '
      + 'asettuisi kohti Mekkaa.',
  },
  {
    id: 'isfahan-keskipaiva',
    tiedosto: 'hero-isfahan-keskipaiva.png',
    kaupunki: 'isfahan',
    prompti: p(
      'the Si-o-se-pol bridge over the Zayanderud in Isfahan',
      'the long two-tiered bridge of ochre brick and stone reaching'
      + ' almost three hundred metres across the river on thirty-three'
      + ' pointed arches, an arcaded walkway with its own row of arches'
      + ' running the whole length on top and the lower arches doubling'
      + ' as a weir, people strolling through the arcade and sitting in'
      + ' its alcoves, hard midday sun overhead so the brick glares warm'
      + ' and the arches repeat in the shallow water below',
      'the riverside parks and plane trees on both banks, the broad'
      + ' Chahar Bagh avenue running away from the bridgehead, and the'
      + ' low city with its domes and minarets in the haze beyond',
    ),
    selite: 'Si-o-se-pol rakennettiin vuosina 1599–1602 Allahverdi '
      + 'Khanin valvonnassa, ja sen 33 kaarta kantavat lähes 300 metrin '
      + 'pituista siltaa, joka toimii samalla patona.',
  },
  {
    id: 'isfahan-ilta',
    tiedosto: 'hero-isfahan-ilta.png',
    kaupunki: 'isfahan',
    prompti: p(
      'the Sheikh Lotfollah Mosque on Naqsh-e Jahan square in Isfahan',
      'the low broad dome of the small Safavid mosque, its cream'
      + ' coloured ground covered in lemon and turquoise arabesques that'
      + ' darken and tighten toward the crown, no minarets and no'
      + ' courtyard anywhere on the building, the deep entrance iwan'
      + ' facing the square with its muqarnas vault and bands of white'
      + ' calligraphy on cobalt, low golden evening light from the west'
      + ' making the glazed tiles glow amber against a violet sky',
      'the arcaded eastern side of the great square with the Ali Qapu'
      + ' palace directly opposite, horse carriages and evening'
      + ' strollers crossing the gardens, and the flat roofs of Isfahan'
      + ' and the dust-hazed hills behind',
    ),
    selite: 'Sheikh Lotfollahin moskeija valmistui vuosina 1603–1619 '
      + 'hovin yksityiseksi rukoushuoneeksi pääarkkitehti Muhammad '
      + 'Rezan suunnitelmien mukaan, eikä siinä siksi ole minareetteja '
      + 'eikä pihaa.',
  },

  /* ---- KIERROS 8 ---------------------------------------------- */

  /* PRAHA — Pyhän Vituksen katedraali, Kaarlensilta, Tynin kirkko. */
  {
    id: 'praha-aamu',
    tiedosto: 'hero-praha-aamu.png',
    kaupunki: 'praha',
    prompti: p(
      'St Vitus Cathedral inside Prague Castle',
      'the Gothic cathedral seen from the side, its twin west towers and'
      + ' great rose window at one end and the tall south tower of'
      + ' nearly a hundred metres with its Renaissance onion dome,'
      + ' gallery and gilded clock face at the other, flying buttresses'
      + ' and crocketed pinnacles marching along the nave, soot-blackened'
      + ' sandstone patched with paler restored blocks, early morning sun'
      + ' from the east striking the towers and roof while the courtyards'
      + ' below still lie in blue shadow',
      'the long white and ochre wings of Prague Castle enclosing the'
      + ' cathedral and the terraced palace gardens dropping down the'
      + ' hill, the red tiled roofs of the Lesser Town below with the'
      + ' green dome and belfry of St Nicholas, and the Vltava with its'
      + ' bridges beyond',
    ),
    selite: 'Pyhän Vituksen katedraalin rakentaminen alkoi vuonna 1344 '
      + 'Kaarle IV:n käskystä Matias Arraslaisen ja Peter Parlerin '
      + 'johdolla, ja rakennus saatiin valmiiksi vasta vuonna 1929.',
  },
  {
    id: 'praha-keskipaiva',
    tiedosto: 'hero-praha-keskipaiva.png',
    kaupunki: 'praha',
    prompti: p(
      'Charles Bridge across the Vltava in Prague',
      'the stone bridge striding across the river on sixteen arches,'
      + ' baroque statues standing in two facing rows along its'
      + ' parapets, the tall Gothic Old Town Bridge Tower with its steep'
      + ' roof, corner turrets and sculpted facade guarding the near'
      + ' end, crowds walking the six hundred metres of cobbles between'
      + ' the statues, high midday sun bleaching the sandstone pale and'
      + ' the green river running fast below',
      'the weirs and rowing boats on the Vltava and the wooded Kampa'
      + ' island beside the bridge, the red roofs of the Lesser Town at'
      + ' the far end, and Prague Castle with the spires of St Vitus'
      + ' along the ridge above',
    ),
    selite: 'Kaarlensillan peruskivi laskettiin vuonna 1357 ja silta '
      + 'valmistui 1400-luvun alussa; se oli Vltavan ainoa kiinteä '
      + 'ylitys Prahassa aina 1840-luvulle asti.',
  },
  {
    id: 'praha-ilta',
    tiedosto: 'hero-praha-ilta.png',
    kaupunki: 'praha',
    prompti: p(
      'the Church of Our Lady before Tyn on the Old Town Square in Prague',
      'the twin Gothic towers of the church, each eighty metres high and'
      + ' bristling with four slim corner spires around a steep central'
      + ' spike, the gabled west front rising behind the row of arcaded'
      + ' burgher houses that hides its lower storeys, dark stone and'
      + ' steep tiled roofs, low evening sun from the west turning the'
      + ' stone and tiles warm orange against a deep blue sky',
      'the Old Town Square below with the Jan Hus memorial, pastel'
      + ' baroque facades, the tower of the Old Town Hall with its'
      + ' astronomical clock, cafe tables and people crossing the'
      + ' cobbles, and the roofs of the Old Town running away to the'
      + ' castle hill',
    ),
    selite: 'Tynin kirkkoa rakennettiin 1300-luvulta lähtien '
      + 'vanhankaupungin pääkirkoksi, ja sen kuoriin haudattiin '
      + 'tähtitieteilijä Tyko Brahe vuonna 1601.',
  },

  /* SAMARKAND — Sherdorin medresa, Gur-e-Amir, Bibi-Khanym. */
  {
    id: 'samarkand-aamu',
    tiedosto: 'hero-samarkand-aamu.png',
    kaupunki: 'samarkand',
    prompti: p(
      'the Sher-Dor Madrasa on the Registan square in Samarkand',
      'the huge pointed entrance portal of the madrasa filling the'
      + ' foreground, its spandrels carrying the famous mosaic of two'
      + ' striped tigers chasing deer with a human-faced sun rising on'
      + ' their backs, twin ribbed turquoise domes on high drums behind'
      + ' the portal and a corner minaret at each end of the facade,'
      + ' broad bands of glazed brick calligraphy in blue, white and'
      + ' gold, early morning sun from the east flooding straight into'
      + ' the portal recess',
      'the paved Registan square with the older Ulugh Beg Madrasa facing'
      + ' it from the opposite side and the gilded Tilya-Kori Madrasa'
      + ' closing the far end, small figures crossing the open pavement,'
      + ' and the low flat-roofed city with its poplars and the dry hills'
      + ' beyond',
    ),
    selite: 'Sherdorin medresa rakennettiin Registanin aukiolle vuosina '
      + '1619–1636, ja sen portaalin raidalliset pedot ja ihmiskasvoinen '
      + 'aurinko rikkovat islamilaisen koristetaiteen tapaa karttaa '
      + 'elävien olentojen kuvia.',
  },
  {
    id: 'samarkand-keskipaiva',
    tiedosto: 'hero-samarkand-keskipaiva.png',
    kaupunki: 'samarkand',
    prompti: p(
      'the Gur-e-Amir mausoleum in Samarkand',
      'the mausoleum of Timur with its deeply fluted azure dome resting'
      + ' on a tall cylindrical drum wrapped in a broad band of angular'
      + ' Kufic tilework, the octagonal burial chamber beneath it, the'
      + ' high entrance portal with its muqarnas half-vault and the'
      + ' stumps of flanking minarets, glazed blue and turquoise tiles'
      + ' brilliant under a high midday sun in a hard cloudless sky',
      'the walled garden and paved forecourt with visitors at the'
      + ' entrance, tree-lined avenues running away from the enclosure,'
      + ' and the low modern city stretching out into the Zeravshan'
      + ' valley',
    ),
    selite: 'Gur-e-Amiria alettiin rakentaa vuonna 1403 Timurin '
      + 'pojanpojan Muhammad Sultanin haudaksi, mutta siihen haudattiin '
      + 'Timur itse, kun hän kuoli 1405 eivätkä lumen tukkimat '
      + 'vuoristosolat päästäneet saattuetta Shahrisabziin.',
  },
  {
    id: 'samarkand-ilta',
    tiedosto: 'hero-samarkand-ilta.png',
    kaupunki: 'samarkand',
    prompti: p(
      'the Bibi-Khanym Mosque in Samarkand',
      'the colossal congregational mosque with its main portal over'
      + ' thirty metres high and the broken stumps of its flanking'
      + ' minarets, the great ribbed blue dome of the prayer hall'
      + ' standing on its drum behind, bare patched brickwork alternating'
      + ' with surviving panels of blue and gold mosaic, the huge marble'
      + ' Quran stand out in the courtyard, low evening sun from the west'
      + ' turning the brick amber while the tiles go deep blue',
      'the domed roofs and awnings of the Siyob bazaar with its market'
      + ' crowds directly below the walls, the low flat roofs and'
      + ' courtyards of the old town, and the dusty plain and hills far'
      + ' behind',
    ),
    selite: 'Bibi-Khanymin moskeijan rakentaminen alkoi vuonna 1399 '
      + 'Timurin Intian-sotaretken jälkeen, ja sen nelikymmenmetrinen '
      + 'kupoli alkoi varista jo muutaman vuoden kuluttua, kun '
      + 'kunnianhimo ylitti aikansa rakennustaidon.',
  },

  /* LUXOR — Karnak, Luxorin temppeli, Hatshepsutin muistotemppeli. */
  {
    id: 'luxor-aamu',
    tiedosto: 'hero-luxor-aamu.png',
    kaupunki: 'luxor',
    prompti: p(
      'the Temple of Amun-Re at Karnak',
      'the massive unfinished first pylon of the temple rising as two'
      + ' battered sandstone towers above the avenue of ram-headed'
      + ' sphinxes that leads up to its gateway, the great court and'
      + ' behind it the forest of the hypostyle hall with its one'
      + ' hundred and thirty-four papyrus columns, the tallest more than'
      + ' twenty metres and still carrying their architrave blocks, low'
      + ' morning sun from the east raking across the sandstone so the'
      + ' sunk reliefs and hieroglyphs cut deep shadows',
      'the stone-edged sacred lake inside the enclosure with the fallen'
      + " halves of Hatshepsut's obelisk lying at its shore and her"
      + ' standing obelisk beyond, palm groves and the low houses of'
      + ' Karnak village, and the Nile with feluccas and the bare Theban'
      + ' hills across the water',
    ),
    selite: 'Karnakin Amonin temppelialuetta rakennettiin ja '
      + 'laajennettiin yli kahden vuosituhannen ajan Keskimmästä '
      + 'valtakunnasta ptolemaiolaisaikaan, ja sen 134 pylvään sali on '
      + 'antiikin suurimpia katettuja tiloja.',
  },
  {
    id: 'luxor-keskipaiva',
    tiedosto: 'hero-luxor-keskipaiva.png',
    kaupunki: 'luxor',
    prompti: p(
      'the Luxor Temple beside the Nile',
      'the first pylon of Ramesses II with its sunk reliefs of battle,'
      + ' the seated colossi of the king before it and the single'
      + ' surviving red granite obelisk still standing on its plinth,'
      + ' the great court behind with its double row of closed-bud'
      + ' papyrus columns, the fourteen open-papyrus columns of the'
      + ' Amenhotep III colonnade rising nearly sixteen metres further'
      + ' back, and the whitewashed mud-brick minarets of the Abu Haggag'
      + ' mosque perched improbably on top of the temple court, high'
      + ' midday sun bleaching the sandstone almost white with short'
      + ' hard shadows',
      'the corniche along the Nile with horse carriages and walkers, the'
      + ' river with feluccas and moored cruise boats, the palms and'
      + ' hotels of the east bank, and the cliffs of the west bank in'
      + ' the distance',
    ),
    selite: 'Luxorin temppelin rakennutti Amenhotep III 1300-luvulla '
      + 'eaa. ja sitä laajensi Ramses II, jonka pystyttämästä '
      + 'obeliskiparista toinen siirrettiin Pariisin Place de la '
      + 'Concordelle vuonna 1836.',
  },
  {
    id: 'luxor-ilta',
    tiedosto: 'hero-luxor-ilta.png',
    kaupunki: 'luxor',
    prompti: p(
      "the mortuary temple of Hatshepsut at Deir el-Bahari",
      'the terraced temple of pale limestone built straight against the'
      + ' cliff, three colonnaded terraces stacked one above the other'
      + ' and linked by long central ramps, the square pillars of the'
      + ' porticoes repeating in a rhythm of light and shadow along each'
      + ' level, the sheer rock face of the mountain rising hundreds of'
      + ' metres directly behind, low evening sun from the west setting'
      + ' the cliff and the colonnades glowing orange',
      'the causeway and the desert bay below with visitors on the ramps'
      + ' and paths, the barren hills that hide the Valley of the Kings'
      + ' behind the mountain, and the green Nile floodplain with the'
      + ' roofs of Luxor and the river far in the distance',
    ),
    selite: 'Deir el-Bahariin louhittu Hatshepsutin muistotemppeli '
      + 'valmistui noin 1470 eaa. hovimies Senenmutin johdolla, ja '
      + 'Thutmosis III hakkautti kuningattaren nimen ja kuvat pois sen '
      + 'seinistä hänen kuolemansa jälkeen.',
  },
];
