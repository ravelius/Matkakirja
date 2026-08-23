/*
 * HEROKUVATYÖLISTA, KIERROS 16 (6 kaupunkia, 18 kuvaa): Dublin,
 * Barcelona, Riad, Chennai, Manila ja Ulan Bator.
 *
 * Sama malli kuin tools/hero-tyolista-10.mjs (RESEPTI v7): koko
 * 'vaaka', kolme kuvaa kaupunkia kohti (aamu, keskipäivä, ilta),
 * jokaisessa eri pääkohde. Kytkentä julkaisussa avauskuvat-taulukon
 * kärkeen (ampari: 'herokoe/hero-<id>-<aika>.png').
 *
 * KAUPUNKIVALINTA: lehtikaupunkeja ilman yhtään heroa, maanosia
 * vuorotellen — Eurooppa 2 (Dublin, Barcelona), Lähi-itä 1 (Riad),
 * Etelä-Aasia 1 (Chennai), Kaakkois-Aasia 1 (Manila), Itä- ja
 * Keski-Aasia 1 (Ulan Bator).
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
  /* ---- DUBLIN — Trinity Collegen kellotorni, St Patrick, tullitalo. */
  {
    id: 'dublin-aamu',
    tiedosto: 'hero-dublin-aamu.png',
    kaupunki: 'dublin',
    prompti: p(
      'the Campanile standing free on the cobbles of Front Square at'
      + ' Trinity College Dublin',
      'the 30-metre bell tower built of bluish-grey granite, a heavy'
      + ' arched base carrying four seated Portland stone figures at'
      + ' the corners, a short belfry stage above them pierced with'
      + ' round-arched openings and a pale stone cupola with a small'
      + ' lantern and ball finial on top, low early morning sun from'
      + ' the east striking the cupola while the cobbles below stay in'
      + ' blue shadow',
      'the matching Corinthian fronts of the chapel and the examination'
      + ' hall facing each other across the square, the long grey block'
      + ' of the Old Library beyond, students crossing the cobbles as'
      + ' small figures and the Georgian brick streets and building'
      + ' cranes of the city behind the college wall',
    ),
    selite: 'Trinity Collegen kellotorni valmistui 1853 Charles '
      + 'Lanyonin suunnitelmien mukaan: 30,5 metriä korkean tornin '
      + 'alaosa on Wicklowin sinertävää graniittia ja kupoli '
      + 'Portlandin kiveä, ja kellohuoneen juurella istuu neljä '
      + 'veistosta — jumaluusoppi, tiede, lääketiede ja laki.',
  },
  {
    id: 'dublin-keskipaiva',
    tiedosto: 'hero-dublin-keskipaiva.png',
    kaupunki: 'dublin',
    prompti: p(
      'St Patrick’s Cathedral in Dublin',
      'the long grey limestone cathedral measuring 91 metres from end'
      + ' to end, a square battlemented tower rising at the north-west'
      + ' corner and carrying a slender granite spire, ranks of'
      + ' pointed Gothic windows and stepped buttresses along the'
      + ' nave, the low transepts crossing behind and a ridge of'
      + ' small pinnacles along the roofline, high midday sun'
      + ' flattening the shadows on the pale stone',
      'the lawns, benches and plane trees of the park beside the'
      + ' cathedral with walkers as small figures, red-brick terraces'
      + ' and the narrow streets of the Liberties running away toward'
      + ' the river, and the low green line of the Dublin Mountains on'
      + ' the southern horizon',
    ),
    selite: 'Pyhän Patrickin katedraali perustettiin 1191, ja ulkoa '
      + '91 metriä pitkänä se on Irlannin suurin kirkko — graniittinen '
      + 'torninhuippu nostettiin tornin päälle vasta 1749 George '
      + 'Semplen suunnitelmien mukaan.',
  },
  {
    id: 'dublin-ilta',
    tiedosto: 'hero-dublin-ilta.png',
    kaupunki: 'dublin',
    prompti: p(
      'the Custom House on the north bank of the Liffey in Dublin at'
      + ' sunset',
      'the long neoclassical block of pale Portland stone stretching'
      + ' along the quay, a four-columned Doric portico in the middle'
      + ' under a carved pediment, arcaded pavilions closing each end'
      + ' of the front, and a colonnaded drum above the centre lifting'
      + ' a darker limestone dome with a statue on its lantern, warm'
      + ' low sunset light from the west running along the river front'
      + ' while the lamps come on on the quay',
      'the Liffey sliding past with its low bridges and moored boats,'
      + ' the glass towers of the docklands downstream and the white'
      + ' harp-shaped pylon of the Samuel Beckett Bridge catching the'
      + ' last light, buses and walkers as small figures on the quays',
    ),
    selite: 'James Gandonin tullitalo valmistui 7. marraskuuta 1791, ja '
      + 'kun se poltettiin 1921 vapaussodan aikana, sisätilat '
      + 'tuhoutuivat ja kupoli romahti — se muurattiin uudelleen '
      + 'tummemmasta Ardbraccanin kalkkikivestä kuin muu Portlandin '
      + 'kivestä tehty talo.',
  },

  /* ---- BARCELONA — Sagrada Família, Casa Batlló, Palau Nacional. */
  {
    id: 'barcelona-aamu',
    tiedosto: 'hero-barcelona-aamu.png',
    kaupunki: 'barcelona',
    prompti: p(
      'the Sagrada Família basilica in Barcelona',
      'the immense stone church bristling with tapering honeycombed'
      + ' spires, the Nativity facade facing north-east encrusted with'
      + ' carved plants, animals and crowded figures over its three'
      + ' porches, four pinnacled bell towers rising above it and the'
      + ' broad central tower of Jesus climbing 172.5 metres over the'
      + ' crossing with the Evangelist towers clustered around it, low'
      + ' early morning sun from the east flooding the Nativity front'
      + ' and glinting on the mosaic finials',
      'the square blocks of the Eixample grid with their chamfered'
      + ' corners running away in every direction, the small parks and'
      + ' ponds on either side of the church, early visitors queueing'
      + ' as small figures on the pavement and the wooded Collserola'
      + ' ridge behind the city in the morning haze',
    ),
    selite: 'Sagrada Famílian rakentaminen alkoi 19. maaliskuuta 1882 '
      + 'ja Gaudí johti työtä 1883 kuolemaansa 1926 asti — '
      + 'kahdeksastatoista tornista korkein eli Jeesuksen torni nousee '
      + '172,5 metriin, ja kirkko vihittiin käyttöön 2010.',
  },
  {
    id: 'barcelona-keskipaiva',
    tiedosto: 'hero-barcelona-keskipaiva.png',
    kaupunki: 'barcelona',
    prompti: p(
      'Casa Batlló on the Passeig de Gràcia in Barcelona',
      'the narrow modernista house wedged between its plainer'
      + ' neighbours, the lower floors of Montjuïc sandstone flowing'
      + ' into smooth bone-like columns around a wide oval window, the'
      + ' upper facade covered in broken ceramic mosaic shading from'
      + ' golden orange into greenish blue, iron balconies shaped like'
      + ' masks hung across it, and an arched roof of coloured scaly'
      + ' tiles ridged like the back of a dragon with a tiled turret'
      + ' and cross at one end, high midday sun blazing on the glaze',
      'the broad boulevard below with its patterned paving, wrought'
      + ' iron lamps and crowds moving as small figures, the other'
      + ' modernista houses of the same block beside it, and the dense'
      + ' Eixample rooftops with their water tanks running down toward'
      + ' the sea',
    ),
    selite: 'Gaudí muokkasi Casa Batllón vanhasta talosta 1904–1906: '
      + 'julkisivun alaosa on Montjuïcin hiekkakiveä ja ylempi osa '
      + 'rikotuista laatoista ladottua mosaiikkia, ja kattoharja '
      + 'kaartuu kuin lohikäärmeen selkä.',
  },
  {
    id: 'barcelona-ilta',
    tiedosto: 'hero-barcelona-ilta.png',
    kaupunki: 'barcelona',
    prompti: p(
      'the Palau Nacional on the slope of Montjuïc above Barcelona at'
      + ' sunset',
      'the vast pale palace of 1929 spread across the hillside, a great'
      + ' ribbed central dome flanked by two smaller domes and four'
      + ' square corner towers, colonnades, pediments and rusticated'
      + ' walls along the immense front, monumental staircases,'
      + ' escalator galleries and terraced fountains dropping down the'
      + ' slope below it, warm low sunset light from the west along the'
      + ' facade while the first floodlights come on',
      'the avenue of exhibition halls leading down to Plaça'
      + ' d’Espanya between two brick towers 47 metres high, the round'
      + ' bulk of the old bullring beyond them, and the whole grid of'
      + ' the city stretching to the sea under an orange sky',
    ),
    selite: 'Palau Nacional avattiin vuoden 1929 maailmannäyttelyyn, ja '
      + 'sen juhlasali mittaa 46 kertaa 74 metriä ja kohoaa 70 metriin '
      + '— vuodesta 1934 talossa on ollut Katalonian kansallinen '
      + 'taidemuseo.',
  },

  /* ---- RIAD — Masmak, Al Faisaliah, Kingdom Centre. */
  {
    id: 'riad-aamu',
    tiedosto: 'hero-riad-aamu.png',
    kaupunki: 'riad',
    prompti: p(
      'the Masmak Fortress in the old centre of Riyadh',
      'the square mud-brick fort of tawny clay, its walls more than a'
      + ' metre thick and topped with rows of pointed crenellations, a'
      + ' round watchtower about 18 metres tall at each of the four'
      + ' corners and a squat cylindrical tower over the middle, small'
      + ' triangular slots pierced through the plastered walls and a'
      + ' heavy studded palm-wood gate with a tiny wicket door in the'
      + ' centre of one side, low early morning sun from the east'
      + ' raking the clay and throwing the crenellations into relief',
      'the open paved square in front with palms, benches and a few'
      + ' early walkers, the low restored mud-brick houses and covered'
      + ' lanes of the old souk beside it, and the glass office towers'
      + ' of the modern city rising behind in the desert haze',
    ),
    selite: 'Masmakin savitiililinnoitus rakennettiin 1865–1895: sen '
      + 'neljä vartiotornia ovat noin 18 metriä korkeat ja muurit 1,25 '
      + 'metriä paksut, ja palmupuisessa pääportissa on vain yhden '
      + 'ihmisen kokoinen luukku nimeltä al-Khokha.',
  },
  {
    id: 'riad-keskipaiva',
    tiedosto: 'hero-riad-keskipaiva.png',
    kaupunki: 'riad',
    prompti: p(
      'the Al Faisaliah Tower in the Olaya district of Riyadh',
      'the 267-metre tower rising as a slender four-sided pyramid from'
      + ' a broad base to a needle point, its four corner shafts of'
      + ' pale stone and bronze glass narrowing steadily as they climb,'
      + ' a great glass globe held between them near the top with a'
      + ' restaurant inside and a thin golden spike above it, high'
      + ' midday sun flaring off the sphere and bleaching the plaza'
      + ' below',
      'the wide multi-lane avenues of Olaya with traffic as small'
      + ' shapes, palms and clipped hedges along the medians, white'
      + ' office blocks and shopping malls packed around the tower and'
      + ' the flat brown plain of the Najd running to the horizon',
    ),
    selite: 'Al Faisaliahin torni valmistui vuonna 2000 Foster and '
      + 'Partnersin suunnitelmien mukaan ja oli 267 metrillään '
      + 'Saudi-Arabian ensimmäinen pilvenpiirtäjä — huipun lasipallon '
      + 'sisällä on ravintola.',
  },
  {
    id: 'riad-ilta',
    tiedosto: 'hero-riad-ilta.png',
    kaupunki: 'riad',
    prompti: p(
      'the Kingdom Centre tower in Riyadh at sunset',
      'the 302-metre tower of blue-grey glass and steel, its slab'
      + ' rising as two curving legs that leave a huge inverted'
      + ' parabolic opening through the upper third, the enclosed sky'
      + ' bridge 65 metres long slung across the top of that arch at'
      + ' 290 metres, the last orange light of sunset from the west'
      + ' sliding down the glass while the shaft begins to glow with'
      + ' coloured light',
      'the low sprawl of Riyadh spreading flat in every direction with'
      + ' King Fahd Road running past in ribbons of headlights, the'
      + ' pyramid-topped Faisaliah tower standing across the district'
      + ' and the desert horizon fading into dusk',
    ),
    selite: 'Kingdom Centre kohoaa 302,3 metriin ja ohitti '
      + 'valmistuessaan 2002 Al Faisaliahin: ylimmän kaaren yli kulkee '
      + '65 metriä pitkä näköalasilta 290 metrin korkeudessa.',
  },

  /* ---- CHENNAI — Kapaleeshwarar, ylioikeus, Santhomen basilika. */
  {
    id: 'chennai-aamu',
    tiedosto: 'hero-chennai-aamu.png',
    kaupunki: 'chennai',
    prompti: p(
      'the gopuram of the Kapaleeshwarar Temple in Mylapore, Chennai',
      'the gateway tower rising in seven steeply tapering tiers to'
      + ' about 37 metres, every tier packed with brightly painted'
      + ' stucco figures of gods, guardians and animals in ochre,'
      + ' green, blue and red, a row of pot finials along the'
      + ' barrel-vaulted crest and a dark arched doorway at its foot,'
      + ' the walled temple courtyard with its pillared halls and'
      + ' brass flagstaff behind the gate, low early morning sun from'
      + ' the east lighting the painted tiers',
      'the rectangular temple tank 190 metres long lying nearby with'
      + ' stone steps down to the water, the narrow lanes of Mylapore'
      + ' with flower stalls, awnings and low tiled houses pressing'
      + ' against the temple wall, and the flat roofs of Chennai'
      + ' stretching toward the sea',
    ),
    selite: 'Kapaleeshwararin temppelin päägopuram muurattiin 1906 ja '
      + 'kohoaa 120 jalkaa eli reilut 36 metriä, ja sen lähellä on 190 '
      + 'metriä pitkä ja 143 metriä leveä temppeliallas.',
  },
  {
    id: 'chennai-keskipaiva',
    tiedosto: 'hero-chennai-keskipaiva.png',
    kaupunki: 'chennai',
    prompti: p(
      'the Madras High Court complex in George Town, Chennai',
      'the sprawling Indo-Saracenic palace of deep red brick with pale'
      + ' dressings, a forest of onion domes, small pillared kiosks,'
      + ' arcaded verandas and pointed arches spreading along the'
      + ' front, the tall central tower carrying its old lighthouse'
      + ' lantern 53 metres up, high midday sun burning on the red'
      + ' brick and the white ribs of the domes',
      'the shaded compound of old trees and parked cars with advocates'
      + ' in black crossing as small figures, the crowded low blocks'
      + ' and market streets of George Town and the container cranes'
      + ' of Chennai harbour rising beyond them',
    ),
    selite: 'Madrasin ylioikeus perustettiin 1862, ja sen '
      + 'indosaraseeninen punatiilipalatsi vihittiin 12. heinäkuuta '
      + '1892 — torniin sijoitettiin 53 metrin korkeuteen majakka, '
      + 'joka opasti laivoja 1900-luvun loppupuolelle asti.',
  },
  {
    id: 'chennai-ilta',
    tiedosto: 'hero-chennai-ilta.png',
    kaupunki: 'chennai',
    prompti: p(
      'the San Thome Basilica near the Marina in Chennai at sunset',
      'the whitewashed neo-Gothic church with a steep gabled front,'
      + ' tall lancet windows and a rose window over the main door,'
      + ' slim pinnacles flanking the gable and a single slender spire'
      + ' rising 45 metres above the roof, buttresses stepping along'
      + ' the side walls, the last warm sunset light from the west'
      + ' washing the white walls pale gold while the first lamps come'
      + ' on in the forecourt',
      'the coast road running past with buses and scooters as small'
      + ' shapes, fishing boats drawn up on the sand and the darkening'
      + ' Bay of Bengal opening to the east, and the low roofs of'
      + ' Santhome and Mylapore inland',
    ),
    selite: 'Santhomen basilika rakennettiin uudelleen 1896 '
      + 'uusgoottilaiseen asuun, sen torninhuippu nousee 45 metriin, ja '
      + 'kirkon alla on apostoli Tuomaan hauta.',
  },

  /* ---- MANILA — Fort Santiago, San Agustin, katedraali. */
  {
    id: 'manila-aamu',
    tiedosto: 'hero-manila-aamu.png',
    kaupunki: 'manila',
    prompti: p(
      'the gate of Fort Santiago at the mouth of the Pasig river in'
      + ' Manila',
      'the thick walls of grey volcanic tuff rising straight out of a'
      + ' green moat, the arched main gate set in a facade some twelve'
      + ' metres high with a carved relief of Saint James above the'
      + ' arch and a crest and stone finials along the top, low'
      + ' bastions and ravelins of the same pitted stone running away'
      + ' on either side, low early morning sun from the east warming'
      + ' the stone and lighting the moss and vines on the walls',
      'the brown Pasig sliding past toward the bay with barges and'
      + ' ferries on it, the lawns and ruined foundations inside the'
      + ' fort with a few early visitors as small figures, and the'
      + ' walls of Intramuros and the tower blocks of Manila rising'
      + ' behind the trees',
    ),
    selite: 'Fort Santiagon kivilinnoitus muurattiin 1590–1593 '
      + 'Guadalupesta louhitusta tuffista, sen kehä on 620 metriä, ja '
      + 'porttitornin julkisivussa on reliefi pyhästä Jaakobista.',
  },
  {
    id: 'manila-keskipaiva',
    tiedosto: 'hero-manila-keskipaiva.png',
    kaupunki: 'manila',
    prompti: p(
      'the San Agustin Church in Intramuros, Manila',
      'the massive baroque church of grey adobe blocks, its broad'
      + ' facade divided by paired Doric and Corinthian columns and'
      + ' crowned by a heavy pediment, carved wooden doors under the'
      + ' arched entrance, a single squat bell tower standing on the'
      + ' left while the right one is missing and finished flat above'
      + ' the cornice, deep buttresses running back along the side'
      + ' street, high midday sun bleaching the stone and cutting hard'
      + ' shadows under the cornices',
      'the narrow cobbled streets of Intramuros with horse-drawn'
      + ' calesas and visitors as small figures, the tiled roofs and'
      + ' inner courtyard of the monastery beside the church, and the'
      + ' old city wall with the towers of modern Manila beyond it',
    ),
    selite: 'San Agustinin kirkko valmistui 19. tammikuuta 1607, sen '
      + 'vasen kellotorni purettiin vuoden 1880 maanjäristysten '
      + 'jälkeen, ja se oli ainoa Intramurosin seitsemästä kirkosta, '
      + 'joka säilyi vuoden 1945 taisteluissa.',
  },
  {
    id: 'manila-ilta',
    tiedosto: 'hero-manila-ilta.png',
    kaupunki: 'manila',
    prompti: p(
      'the Manila Cathedral on Plaza Roma in Intramuros at sunset',
      'the neo-Romanesque church of pale stone and warm brick, a deep'
      + ' round-arched portal below a large rose window with statues'
      + ' of saints standing in niches across the front, a square bell'
      + ' tower rising at one side and a patinated green dome over the'
      + ' crossing carrying a four-armed cross, the last orange light'
      + ' of sunset from the west along the facade while lamps come on'
      + ' in the plaza',
      'the small plaza with its fountain, palms and evening strollers'
      + ' as small figures, the tiled roofs and stone walls of'
      + ' Intramuros around it, and the wide sheet of Manila Bay'
      + ' burning orange beyond the ramparts with ships at anchor',
    ),
    selite: 'Nykyinen Manilan katedraali on kahdeksas rakennus samalla '
      + 'paikalla ja valmistui 1954–1958 Fernando Ocampon '
      + 'suunnitelmien mukaan — kellotornin seitsemän carillon-kelloa '
      + 'painavat yhteensä 17 tonnia.',
  },

  /* ---- ULAN BATOR — Gandan, Sükhbaatarin aukio, Zaisan. */
  {
    id: 'ulanbator-aamu',
    tiedosto: 'hero-ulanbator-aamu.png',
    kaupunki: 'ulanbator',
    prompti: p(
      'the Migjid Janraisig temple at the Gandantegchinlen Monastery in'
      + ' Ulaanbaatar',
      'the tall white temple with thick whitewashed walls, small deep'
      + ' windows and a colonnaded porch of red pillars at its foot,'
      + ' two tiers of upturned Tibetan-style roofs in red and gold'
      + ' with gilded finials and banners along the ridge, low early'
      + ' morning sun from the east on the white walls while woodsmoke'
      + ' rises straight up in the cold air',
      'the dusty monastery courtyard with rows of prayer wheels,'
      + ' smaller ochre and green temple halls and pigeons wheeling'
      + ' over a few visitors as small figures, the low wooden houses'
      + ' and fenced ger plots of the surrounding district, and the'
      + ' concrete blocks and glass towers of the centre under bare'
      + ' hills',
    ),
    selite: 'Gandanin luostari perustettiin 1809, ja sen Megzed '
      + 'Janraisegin temppelissä seisoo 26,5 metriä korkea kullattu '
      + 'patsas, joka pystytettiin uudelleen 1996 vuosina 1937–1943 '
      + 'hävitetyn tilalle.',
  },
  {
    id: 'ulanbator-keskipaiva',
    tiedosto: 'hero-ulanbator-keskipaiva.png',
    kaupunki: 'ulanbator',
    prompti: p(
      'the Government Palace on Sükhbaatar Square in Ulaanbaatar',
      'the long grey palace closing the north side of the square, its'
      + ' wide colonnade opening in the middle onto a raised marble'
      + ' platform where a huge bronze seated statue of Genghis Khan'
      + ' sits between two mounted guards with smaller seated figures'
      + ' at either end of the colonnade, a broad flight of steps'
      + ' below, high midday sun flattening the paving and glinting on'
      + ' the polished stone',
      'the huge open square with its fountains and people crossing as'
      + ' small figures, the equestrian bronze of Sükhbaatar on its'
      + ' plinth out on the paving, the opera house and the glass'
      + ' towers of banks and hotels lining the other sides, and the'
      + ' bare rounded mountains standing over the roofs of the city',
    ),
    selite: 'Sükhbaatarin aukio sai nimensä 1923, ratsastajapatsas '
      + 'pystytettiin 1946 ja hallituspalatsi valmistui 1951 — sen '
      + 'edustan pylväikköön nousi 2006 Tsingis-kaanin patsas Ögedein '
      + 'ja Khubilain väliin.',
  },
  {
    id: 'ulanbator-ilta',
    tiedosto: 'hero-ulanbator-ilta.png',
    kaupunki: 'ulanbator',
    prompti: p(
      'the Zaisan Memorial on its hilltop south of Ulaanbaatar at'
      + ' sunset',
      'the great open ring of concrete standing bare against the sky,'
      + ' its inner face covered by a continuous tile mosaic of'
      + ' soldiers, rockets, flags and horsemen, a red bowl for the'
      + ' eternal flame at the centre of the paved circle and a tall'
      + ' stone soldier raising a banner beside it, the long stairway'
      + ' climbing the bare slope below, the last low sunset light'
      + ' from the west setting the coloured mosaic glowing',
      'the Tuul river valley and the whole city spread out below with'
      + ' lights coming on block by block, the low houses and fenced'
      + ' ger plots climbing the far slopes and the dark forested'
      + ' ridge of Bogd Khan mountain closing the sky behind',
    ),
    selite: 'Zaisanin muistomerkki paljastettiin 1971 '
      + 'neuvostoliittolais-mongolialaisen ystävyyden kunniaksi: '
      + 'kukkulalle nousee 612 porrasta, ja ympyränmuotoisen '
      + 'mosaiikkiseinän keskellä palaa ikuinen tuli punaisessa '
      + 'porfyyrimaljassa.',
  },
];
