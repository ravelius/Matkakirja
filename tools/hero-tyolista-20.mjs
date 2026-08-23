/*
 * HEROKUVATYÖLISTA, KIERROS 20 (6 kaupunkia, 18 kuvaa): Melbourne,
 * Vancouver, Brisbane, Chicago, Perth ja Kabul.
 *
 * Sama malli kuin tools/hero-tyolista-14.mjs (kierros 19, RESEPTI
 * v7): koko 'vaaka', kolme kuvaa kaupunkia kohti (aamu, keskipäivä,
 * ilta), jokaisessa eri pääkohde ja eri puoli kaupunkia. Kytkentä
 * julkaisussa avauskuvat-taulukon kärkeen (ampari:
 * 'herokoe/hero-<id>-<aika>.png').
 *
 * HUOM TIEDOSTONIMESTÄ: aiemmat listat on numeroitu juoksevasti
 * (hero-tyolista-13 = kierros 18, hero-tyolista-14 = kierros 19),
 * mutta tämä lista on päätoimittajan pyynnöstä nimetty kierroksen
 * mukaan. Ajo: node hero-ajuri.mjs 20 [alku] [loppu] [kansio].
 *
 * KAUPUNKIVALINTA: kuusi kaupunkia, joiden kaupunkilehdet ovat
 * valmiit mutta joilta puuttuvat herokuvat kokonaan — maanosia
 * vuorotellen: Oseania 3 (Melbourne, Brisbane, Perth),
 * Pohjois-Amerikka 2 (Vancouver, Chicago), Aasia 1 (Kabul).
 * Yksikään heroaihe ei ole oman lehtensä kansikuvana eikä
 * avauskuvana: Melbournessa ohitetaan Flinders Streetin asema,
 * näyttelypalatsi, Melbourne Cricket Ground ja kolme
 * yleissiluettia, Vancouverissa Gastown, Granville Islandin
 * ruokatori, Canada Place ja niemen ilmakuva, Kabulissa Baburin
 * puutarha, joenvarren basaarikatu ja rinnepanoraama. Chicagon
 * lehti on vielä työn alla, joten ohitettiin sen faktapohjan
 * ehdottamat kansi- ja avausaiheet (Cloud Gate, vesitorni,
 * järveltä kuvattu siluetti, joen mutka Loopin läpi). Brisbanessa
 * ja Perthissä vältettiin pelin omissa valokuvatauluissa jo
 * käytetyt näkymät (Streets Beach, Story Bridge Bowen Terracelta,
 * Cottesloe pohjoisesta, keskusta Kings Parkista, Elizabeth Quay,
 * Queen Street Mall, Fremantlen kauppahalli) valitsemalla toinen
 * kohde tai selvästi toinen kuvakulma.
 *
 * HERKKYYS (perustuslain pilari 3):
 * - KABUL kuvataan arvokkaana nykyaikaisena kaupunkina: vuoristo,
 *   kunnostettu historiallinen arkkitehtuuri ja tavallinen
 *   kaupunkielämä. Ei sotakuvastoa, ei raunioestetiikkaa, ei
 *   aseita; ihmiset vain kaukaisina hahmoina. Darul Amanin palatsi
 *   kuvataan nimenomaan peruskorjattuna, ei vaurioituneena.
 * - ALKUPERÄISKANSAT: heroissa ei käytetä alkuperäiskansojen
 *   aiheita kuvituksena. Melbournen keskipäiväkuvassa joesta
 *   käytetään sen wurundjeri-nimeä Birrarung kaupungin nykyisen
 *   käytännön mukaisesti; muuten aiheet ovat rakennuksia ja
 *   maisemaa. Totemipylväitä, seremonioita tai muuta "jalo villi"
 *   -kuvastoa ei pyydetä — kansat kerrotaan lehtien teksteissä
 *   elävinä ja nykyaikaisina.
 * - Kabulin moskeija ja Timur Shahin mausoleumi ovat kohteina
 *   rakennuksina, eivät hartautena eivätkä politiikkana.
 *
 * FAKTAT tarkistettu kaupunkien lehtiaineistosta
 * (js/packs/kulttuuri-kategoriat.js, js/packs/oceania-valokuvat.js,
 * js/packs/northamerica-valokuvat.js), faktapohjista
 * (faktapohja-melbourne.md, faktapohja-vancouver.md,
 * faktapohja-chicago.md, faktapohja-kabul.md) ja en-Wikipediasta
 * 23.8.2026.
 */

// Reseptin muuttumaton loppuosa — sama kuin hero-tyolista-3..14:ssa.
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
  /* ---- MELBOURNE — kirjasto, Princes-silta, St Kildan Luna Park. */
  {
    id: 'melbourne-aamu',
    tiedosto: 'hero-melbourne-aamu.png',
    kaupunki: 'melbourne',
    prompti: p(
      'the State Library Victoria on Swanston Street in Melbourne',
      'the long two-storey library front rendered in pale cream stone,'
      + ' a wide portico of six tall Corinthian columns standing on a'
      + ' broad flight of steps in the middle, plain pilastered wings'
      + ' with even rows of arched windows running away to both sides,'
      + ' and set back above the roofline the low green copper dome of'
      + ' the octagonal reading room, low early morning sun from the'
      + ' east striking the columns straight on so that the fluting,'
      + ' the deep porch and every step throw long shadows; there is'
      + ' only ONE such building in the picture and nothing rises'
      + ' behind its dome',
      'the sloping lawn and forecourt in front with chess tables, low'
      + ' clipped hedges and a bronze statue on a granite plinth, the'
      + ' camera standing on the library side so that the iron railing'
      + ' along the pavement and the top steps are in the foreground,'
      + ' students sitting on the grass with coffee cups as small'
      + ' figures, the wide straight run of Swanston Street below with'
      + ' a green tram and early cyclists, and the grid of office'
      + ' towers and narrow laneways of the city centre stretching away'
      + ' behind',
    ),
    selite: 'Melbournen yleinen kirjasto avattiin 11. helmikuuta 1856, ja '
      + 'sen ensimmäisessä kokoelmassa oli 3 800 kirjaa; saman '
      + 'arkkitehdin Joseph Reedin käsialaa ovat myös kaupungintalo ja '
      + 'näyttelypalatsi, ja kahdeksankulmainen La Trobe-lukusali '
      + 'kupoleineen valmistui 1913.',
  },
  {
    id: 'melbourne-keskipaiva',
    tiedosto: 'hero-melbourne-keskipaiva.png',
    kaupunki: 'melbourne',
    prompti: p(
      'Princes Bridge carrying Swanston Street across the Yarra, the'
      + ' river the Wurundjeri call Birrarung, in Melbourne',
      'the very wide bluestone and granite road bridge of three shallow'
      + ' arches, heavy rusticated piers stepping down into the'
      + ' brown-green water, cast iron spandrel panels and tall lamp'
      + ' standards along both parapets, a green tram crossing in the'
      + ' middle of the deck between cars while walkers fill the'
      + ' footways on either side, high midday sun bleaching the pale'
      + ' granite and throwing the arch shadows straight down onto the'
      + ' river; there is only ONE bridge in the picture and nothing'
      + ' rises behind its deck',
      'the river running away in both directions with rowing eights, a'
      + ' small ferry and kayaks on it, the wooden boathouses with their'
      + ' painted balconies along the far bank, the camera standing on'
      + ' the north bank side so that the bluestone river wall, a'
      + ' landing stage and a row of plane trees are in the foreground,'
      + ' joggers and picnickers as small figures on the promenade, and'
      + ' the concert hall spire and the glass towers of Southbank'
      + ' rising along the southern shore with the city grid behind',
    ),
    selite: 'Wurundjerien nimi joelle on Birrarung, sumujen joki, ja nimi '
      + 'Yarra syntyi 1835 maanmittari John Wedgen väärinymmärryksestä; '
      + 'nykyinen Princes-silta avattiin 4. lokakuuta 1888 ja korvasi '
      + 'vuoden 1850 kivisillan.',
  },
  {
    id: 'melbourne-ilta',
    tiedosto: 'hero-melbourne-ilta.png',
    kaupunki: 'melbourne',
    prompti: p(
      'the entrance face of Luna Park at St Kilda in Melbourne at'
      + ' sunset',
      'the painted entrance of the old seaside amusement park, a giant'
      + ' smiling moon face of moulded plaster whose open mouth is the'
      + ' gateway, flanked by two slender white towers with domed tops,'
      + ' strings of light bulbs following every curve of the'
      + ' plasterwork and already lit, and rising behind it the long'
      + ' white timber hoops of the scenic railway, warm low sunset'
      + ' light from the west so that the painted face glows orange'
      + ' while the towers go into shadow; there is only ONE such'
      + ' entrance in the picture and nothing rises behind its towers',
      'the forecourt with ticket booths, palms and a queue of visitors'
      + ' as small figures, the camera standing on the forecourt side so'
      + ' that the low fence and a row of park benches are in the'
      + ' foreground, the Esplanade with its tram stop and the last'
      + ' market stalls being packed away, the Victorian verandahs and'
      + ' pastel apartment blocks of St Kilda around it, the pier and'
      + ' the flat water of Port Phillip beyond, and the towers of the'
      + ' distant city small on the horizon to the north',
    ),
    selite: 'St Kildan Luna Park avattiin 13. joulukuuta 1912, ja sen '
      + 'puinen Scenic Railway on maailman vanhin yhä keskeytyksettä '
      + 'toiminut vuoristorata; junan kyydissä seisoo edelleen '
      + 'jarrumies, joka hidastaa vaunua käsijarrulla.',
  },

  /* ---- VANCOUVER — Lions Gate, Science Worldin pallo, Marine Building. */
  {
    id: 'vancouver-aamu',
    tiedosto: 'hero-vancouver-aamu.png',
    kaupunki: 'vancouver',
    prompti: p(
      'the Lions Gate Bridge across the First Narrows at the entrance'
      + ' to Vancouver harbour',
      'the slender green suspension bridge, two open steel lattice'
      + ' towers rising 111 metres above the water, the main cables'
      + ' sweeping down in a long curve to the deck and up again, a'
      + ' narrow three-lane roadway with the first morning traffic on'
      + ' it, low early morning sun from the east catching the eastern'
      + ' faces of the towers and the cable strands while mist still'
      + ' lies on the water below; there is only ONE bridge in the'
      + ' picture and nothing rises behind its towers',
      'the dark green forest of Stanley Park running down to the shore'
      + ' on the near side with the causeway cutting through it, the'
      + ' camera standing on the park side so that the crowns of'
      + ' Douglas firs and cedars and a stretch of the seawall are in'
      + ' the foreground, a bulk carrier and a small tug moving through'
      + ' the narrows below, walkers as small figures on the seawall'
      + ' path, the houses and marinas of the north shore, and the'
      + ' snow-streaked Coast Mountains rising steeply behind them into'
      + ' the morning haze',
    ),
    selite: 'Lions Gate -silta avattiin liikenteelle marraskuussa 1938 '
      + 'Guinness-suvun rahoittamana yksityisenä maksusiltana, sen '
      + 'pylonit ovat 111 metriä korkeat, ja provinssi lunasti sillan '
      + 'itselleen 1955.',
  },
  {
    id: 'vancouver-keskipaiva',
    tiedosto: 'hero-vancouver-keskipaiva.png',
    kaupunki: 'vancouver',
    prompti: p(
      'the Science World dome at the head of False Creek in Vancouver',
      'the great geodesic sphere built of a steel triangle framework'
      + ' and pale metal panels, standing on a low concrete base at the'
      + ' very edge of the water, every facet catching the light a'
      + ' little differently, a band of clear glazing around its foot'
      + ' through which the lit exhibition floors, the ramps and the'
      + ' visitors inside are plainly seen, flags and a ramped entrance'
      + ' along the quay, high midday sun on the top of the sphere'
      + ' throwing a hard round shadow onto the plaza; there is only ONE'
      + ' such dome in the picture and nothing rises behind it',
      'the flat blue water of False Creek in front with a tiny'
      + ' passenger ferry and paddleboarders crossing it, the camera'
      + ' standing on the seawall side so that the railing, the cycle'
      + ' path with cyclists and a bench are in the foreground, school'
      + ' groups as small figures on the plaza, the glass apartment'
      + ' towers of Yaletown and the low blocks of the old Olympic'
      + ' village along the shores, and the roofs of the city with the'
      + ' North Shore mountains closing the view',
    ),
    selite: 'Pallo rakennettiin vuoden 1986 maailmannäyttelyn '
      + 'keskuspaviljongiksi Expo Centreksi, ja tiedekeskus avattiin '
      + 'siinä 6. toukokuuta 1989 False Creekin pohjukassa, entisen '
      + 'teollisuusrannan laidalla.',
  },
  {
    id: 'vancouver-ilta',
    tiedosto: 'hero-vancouver-ilta.png',
    kaupunki: 'vancouver',
    prompti: p(
      'the Marine Building on Burrard Street in downtown Vancouver at'
      + ' sunset',
      'the brown and cream art deco tower stepping back in setbacks to'
      + ' a slender crown 98 metres above the street, its terracotta'
      + ' panels moulded with sea horses, steamships, crabs and waves,'
      + ' tall vertical window bands running between the brick piers,'
      + ' and at street level a great pointed arch of coloured faience'
      + ' over the bronze entrance doors, warm low sunset light from the'
      + ' west running up the western face so that every moulded panel'
      + ' stands out in relief while the other side is already blue;'
      + ' there is only ONE such tower in the picture and nothing rises'
      + ' behind its crown',
      'the street corner below with evening traffic, bus stops and lit'
      + ' shop windows, the camera standing on the Hastings Street side'
      + ' so that the tall lamp standards and the arched entrance are in'
      + ' the foreground, office workers as small figures on the'
      + ' crossings, the low brick warehouse blocks running down toward'
      + ' the harbour, seaplanes and floatplane docks on the water of'
      + ' Coal Harbour, and the North Shore mountains going violet'
      + ' behind the inlet',
    ),
    selite: 'Marine Building valmistui lokakuussa 1930 ja oli hetken '
      + 'Brittiläisen imperiumin korkein rakennus; merenkulkua kuvaava '
      + 'terrakottakoristelu tuli niin kalliiksi, että rakennuttajat '
      + 'myivät talon 1933 Guinness-suvulle alle puoleen '
      + 'rakennuskustannuksista.',
  },

  /* ---- BRISBANE — Story Bridge, kaupungintalo, South Bankin pyörä. */
  {
    id: 'brisbane-aamu',
    tiedosto: 'hero-brisbane-aamu.png',
    kaupunki: 'brisbane',
    prompti: p(
      'the Story Bridge across the Brisbane River at Kangaroo Point',
      'the grey steel cantilever bridge, a dense lattice of riveted'
      + ' girders carrying the roadway high above the brown water and'
      + ' rising to two tall steel portal frames over the main span,'
      + ' maintenance walkways slung under the deck and steel stairs'
      + ' climbing the anchor piers, low early morning sun from the'
      + ' east flashing along the wet steelwork while mist still lies'
      + ' on the river; there is only ONE bridge in the picture and'
      + ' nothing rises behind its steelwork',
      'the brown river swinging in a tight bend below with a blue and'
      + ' white CityCat catamaran running upstream and rowing shells'
      + ' close to the bank, the low cliffs of Kangaroo Point with their'
      + ' climbers and their riverside path, the camera standing on the'
      + ' Kangaroo Point side so that the cliff-top railing, a jacaranda'
      + ' and a park bench are in the foreground, early runners as small'
      + ' figures, timber houses on stumps among mango trees on the'
      + ' slopes, and the glass towers of the city centre with flat'
      + ' green ranges far behind',
    ),
    selite: 'Story Bridge avattiin 6. heinäkuuta 1940, se on 777 metriä '
      + 'pitkä ja Australian pisin ulokepalkkisilta; keskijänne '
      + 'rakennettiin molemmilta rannoilta ulos, kunnes puoliskot '
      + 'kohtasivat keskellä jokea.',
  },
  {
    id: 'brisbane-keskipaiva',
    tiedosto: 'hero-brisbane-keskipaiva.png',
    kaupunki: 'brisbane',
    prompti: p(
      'the Brisbane City Hall on King George Square',
      'the great town hall of golden-brown sandstone in the classical'
      + ' manner, a portico of tall columns under a carved pediment'
      + ' across the front, long rusticated wings with round-headed'
      + ' windows, and above the centre a square clock tower climbing 92'
      + ' metres to an open colonnaded lookout under a small dome, high'
      + ' midday sun bleaching the sandstone so that the portico stands'
      + ' in deep shade and the tower throws a short hard shadow; there'
      + ' is only ONE tower in the picture and nothing rises behind it',
      'the paved square in front with its shallow reflecting pool, fig'
      + ' trees and bronze kangaroos, the camera standing on the square'
      + ' side so that the edge of the pool and a row of shaded benches'
      + ' are in the foreground, office workers eating lunch as small'
      + ' figures in the shade, buses at the stops on the street below,'
      + ' the awnings and shopfronts of the pedestrianised Queen Street'
      + ' beyond, and the glass towers of the centre with the river bend'
      + ' and the low ranges behind',
    ),
    selite: 'Brisbanen kaupungintalo avattiin 1930 kymmenen vuoden '
      + 'rakennustyön jälkeen, sen kellotorni on 92 metriä korkea, ja '
      + 'näköalatasanteelle noustaan yhä alkuperäisellä '
      + 'ristikko-ovisella hissillä.',
  },
  {
    id: 'brisbane-ilta',
    tiedosto: 'hero-brisbane-ilta.png',
    kaupunki: 'brisbane',
    prompti: p(
      'the Wheel of Brisbane standing over the South Bank parklands at'
      + ' sunset',
      'the white observation wheel 60 metres high, a slender steel rim'
      + ' braced with radiating cables and hung with rows of enclosed'
      + ' glass gondolas, the gondolas lit inside so that the passengers'
      + ' show as small silhouettes against the sky, the A-frame legs'
      + ' and the boarding platform at its foot, warm low sunset light'
      + ' from the west turning the white steel orange while the shaded'
      + ' side goes blue; there is only ONE wheel in the picture and'
      + ' nothing rises behind it',
      'the subtropical parkland below with the kilometre-long arbour of'
      + ' curling steel columns smothered in magenta bougainvillea'
      + ' winding through it, the man-made lagoon beach with its sand'
      + ' and its last swimmers, the camera standing on the parkland'
      + ' side so that the arbour walkway, a row of palms and a food'
      + ' stall are in the foreground, families as small figures along'
      + ' the promenade, the brown river with a CityCat crossing it, and'
      + ' the towers of the city centre on the far bank taking the last'
      + ' orange light',
    ),
    selite: 'South Bankin puisto rakennettiin vuoden 1988 '
      + 'maailmannäyttelyn alueelle näyttelyn purkamisen jälkeen, ja '
      + '60 metriä korkea maailmanpyörä pystytettiin puiston laitaan '
      + '2008; sen 42 gondolissa on ilmastointi.',
  },

  /* ---- CHICAGO — Wrigley Building, Marina City, Buckinghamin lähde. */
  {
    id: 'chicago-aamu',
    tiedosto: 'hero-chicago-aamu.png',
    kaupunki: 'chicago',
    prompti: p(
      'the Wrigley Building on the north bank of the Chicago River at'
      + ' Michigan Avenue',
      'the brilliant white office building in two joined towers, the'
      + ' taller southern one carrying a square clock tower with four'
      + ' clock faces six metres across and an open crowned lantern'
      + ' above them, the whole facade clad in glazed terracotta laid in'
      + ' several shades of white so that the wall grows brighter toward'
      + ' the top, a covered walkway bridging the gap between the two'
      + ' towers, low early morning sun from the east so that the'
      + ' glazing flares along the eastern face and the ornament casts'
      + ' crisp shadows; there is only ONE such white tower in the'
      + ' picture and nothing rises behind its lantern',
      'the green river directly below with a tour boat pushing'
      + ' downstream and the double-leaf bascule bridge carrying'
      + ' Michigan Avenue across it, the camera standing on the river'
      + ' side so that the riverwalk railing, café umbrellas and a'
      + ' bridge tender house are in the foreground, commuters as small'
      + ' figures crossing the bridge, the dark neo-gothic mass of the'
      + ' Tribune Tower opposite with its buttressed crown, and the grid'
      + ' of stone and glass towers of the Loop running away south',
    ),
    selite: 'Wrigley Building valmistui kahdessa vaiheessa 1921 ja 1924, '
      + 'ja sen kellotorni sai mallinsa Sevillan Giraldasta; '
      + 'julkisivun lasitettu terrakotta on useaa valkoisen sävyä, '
      + 'jotta talo näyttäisi ylöspäin yhä vaaleammalta.',
  },
  {
    id: 'chicago-keskipaiva',
    tiedosto: 'hero-chicago-keskipaiva.png',
    kaupunki: 'chicago',
    prompti: p(
      'the twin towers of Marina City on the north bank of the Chicago'
      + ' River',
      'two round concrete towers standing side by side, each 179 metres'
      + ' high and shaped like a cob of corn, the lowest nineteen floors'
      + ' an open spiral of parking ramps with cars parked nose-in'
      + ' around the drum and plainly visible between the slabs, the'
      + ' floors above them a stack of wedge-shaped apartments each'
      + ' opening onto a curved balcony that scallops the whole'
      + ' circumference, high midday sun on the pale weathered concrete'
      + ' so that every balcony throws its own crescent of shade; there'
      + ' are only these TWO round towers in the picture and nothing'
      + ' rises behind them',
      'the river at their feet with the small boat harbour cut into the'
      + ' base of the towers, motor cruisers moored in it and an'
      + ' architecture tour boat passing, the camera standing on the'
      + ' river side so that the water, a mooring post and the low black'
      + ' glass box of the theatre next door are in the foreground,'
      + ' walkers as small figures on the bridge, the bascule bridges'
      + ' stepping away downstream, and the stone and glass towers of'
      + ' the Loop packed along the south bank',
    ),
    selite: 'Bertrand Goldbergin suunnittelema Marina City valmistui 1964 '
      + 'houkuttelemaan asukkaita takaisin keskustaan; alimmat 19 '
      + 'kerrosta ovat kierteinen pysäköintiramppi, ja asunnot ovat '
      + 'kakkupalan muotoisia ilman ainuttakaan suoraa kulmaa.',
  },
  {
    id: 'chicago-ilta',
    tiedosto: 'hero-chicago-ilta.png',
    kaupunki: 'chicago',
    prompti: p(
      'the Buckingham Fountain in Grant Park on the Chicago lakefront'
      + ' at sunset',
      'the huge fountain of pink marble built in three shrinking tiers'
      + ' like a wedding cake, four pairs of bronze sea horses standing'
      + ' out in the surrounding basin, water spilling in sheets from'
      + ' every tier and the central jet standing straight up far above'
      + ' the rest and breaking into drifting spray, warm low sunset'
      + ' light from the west coming from behind the camera so that the'
      + ' marble turns rose, the falling water turns gold and long'
      + ' shadows stretch east across the plaza; there is only ONE'
      + ' fountain in the picture and nothing rises behind it',
      'the circular basin and the wide paved plaza with its balustrades,'
      + ' flower beds and rows of benches, the camera standing on the'
      + ' park side so that the balustrade, a bed of red flowers and a'
      + ' lamp post are in the foreground, families, cyclists and'
      + ' skateboarders as small figures around the rim, the lawns and'
      + ' elms of the park with the lakefront road and its headlights'
      + ' beyond, the harbour full of masts behind a low breakwater, and'
      + ' the flat blue water of Lake Michigan running to the horizon',
    ),
    selite: 'Kate Buckinghamin lahjoittama suihkulähde vihittiin 26. '
      + 'toukokuuta 1927 Versaillesin Latona-lähteen innoittamana, sen '
      + 'keskisuihku nousee noin 46 metrin korkeuteen, ja neljä '
      + 'pronssista merihevosparia kuvaa Michiganjärveen rajoittuvia '
      + 'osavaltioita.',
  },

  /* ---- PERTH — Kings Parkin latvuskävelysilta, kellotorni, Cottesloe. */
  {
    id: 'perth-aamu',
    tiedosto: 'hero-perth-aamu.png',
    kaupunki: 'perth',
    prompti: p(
      'the glass and steel arched bridge of the Federation Walkway'
      + ' among the treetops in Kings Park above Perth',
      'the curving elevated walkway carried on slim steel legs through'
      + ' the crowns of the eucalypts, its middle section an arched'
      + ' tunnel of glass panes set in steel ribs with a timber deck'
      + ' running through it and walkers visible inside, the smooth pale'
      + ' trunks and hanging leaves of the lemon-scented gums passing'
      + ' right beside the railing, low early morning sun from the east'
      + ' coming in flat through the canopy so that the ribs throw a'
      + ' striped shadow along the deck; there is only ONE such walkway'
      + ' in the picture and nothing rises above the canopy behind it',
      'the botanic garden slope below with banksias, grass trees and'
      + ' kangaroo paw in flower, the camera standing on the garden side'
      + ' so that a gravel path, a low limestone wall and a bench are in'
      + ' the foreground, early walkers as small figures on the paths,'
      + ' the wide blue sweep of the Swan River below the escarpment'
      + ' with a ferry crossing it, the glass towers of the city centre'
      + ' along the water, and the flat plain running east to low hills',
    ),
    selite: 'Kings Park on noin 400 hehtaaria eli suurempi kuin New '
      + 'Yorkin Central Park, ja kaksi kolmasosaa siitä on jätetty '
      + 'luonnontilaiseksi pensaikoksi; latvustoon nouseva Federation '
      + 'Walkway avattiin 2003.',
  },
  {
    id: 'perth-keskipaiva',
    tiedosto: 'hero-perth-keskipaiva.png',
    kaupunki: 'perth',
    prompti: p(
      'the Bell Tower at Elizabeth Quay on the Swan River in Perth',
      'the tall narrow campanile of 82 metres, a slender shaft of glass'
      + ' and pale concrete with a lit belfry near the top through whose'
      + ' clear glazing the frame of the ringing chamber and the hanging'
      + ' bells are plainly seen, and at its base two great curved'
      + ' copper sails leaning against the shaft like wings, their'
      + ' surface already going green in patches, high midday sun'
      + ' flashing off the copper and the glass; there is only ONE tower'
      + ' in the picture and nothing rises behind it',
      'the paved waterfront around it with fountains, planted beds and'
      + ' cafés under awnings, the camera standing on the quay side so'
      + ' that the granite steps down to the water and a row of moored'
      + ' dinghies are in the foreground, families as small figures on'
      + ' the promenade, the inlet of Elizabeth Quay with the white'
      + ' pedestrian bridge curving over its entrance, the wide blue'
      + ' Swan River with sailing boats and a ferry heading for the'
      + ' southern shore, and the office towers of the city standing'
      + ' along the terrace behind',
    ),
    selite: 'Perthin kellotorni avattiin joulukuussa 2000, se on 82,5 '
      + 'metriä korkea, ja siinä soivat Lontoon St Martin-in-the-'
      + 'Fieldsin kirkonkellot, jotka Länsi-Australia sai lahjaksi '
      + '1988; osa kelloista on valettu ennen vuotta 1550.',
  },
  {
    id: 'perth-ilta',
    tiedosto: 'hero-perth-ilta.png',
    kaupunki: 'perth',
    prompti: p(
      'the white tea house pavilion above Cottesloe Beach west of Perth'
      + ' at sunset',
      'the wide white pavilion standing on the low limestone terrace'
      + ' above the sand, deep verandahs on turned posts running along'
      + ' the whole sea front, arched windows and french doors behind'
      + ' them, a green tiled hipped roof with small gables, and a broad'
      + ' staircase dropping from the terrace to the beach, warm low'
      + ' sunset light coming straight in from the west off the Indian'
      + ' Ocean so that the white front glows orange and every window'
      + ' blazes; there is only ONE such building in the picture and'
      + ' nothing rises behind its roof',
      'the wide sand below with the last swimmers still in the water, a'
      + ' row of tall Norfolk Island pines standing along the terrace,'
      + ' the camera standing on the terrace side so that the limestone'
      + ' wall, a beach shower and scattered towels are in the'
      + ' foreground, families and surfers as small figures walking up'
      + ' from the water, the groyne running out into the swell, and the'
      + ' flat orange Indian Ocean stretching to the horizon with a low'
      + ' island silhouette far out on it',
    ),
    selite: 'Cottesloen rannalla Perthin länsipuolella aurinko laskee '
      + 'suoraan Intian valtamereen; nykyinen teehuone valmistui 1996 '
      + '1910-luvun teehuoneiden paikalle, ja rannalla pidetään joka '
      + 'maaliskuu ulkoilmanäyttely Sculpture by the Sea.',
  },

  /* ---- KABUL — Timur Shahin mausoleumi, Darul Aman, moskeija illalla. */
  {
    id: 'kabul-aamu',
    tiedosto: 'hero-kabul-aamu.png',
    kaupunki: 'kabul',
    prompti: p(
      'the mausoleum of Timur Shah Durrani in its garden beside the'
      + ' Kabul river',
      'the massive octagonal brick tomb standing alone in the middle of'
      + ' its walled garden, two storeys of tall recessed arches in warm'
      + ' ochre brick on every one of its eight sides, a heavy drum'
      + ' above them and a broad shallow dome capping the whole'
      + ' building, bands of moulded brickwork under the cornice and'
      + ' small openings high in the drum, low early morning sun from'
      + ' the east warming the eastern arches while the other faces stay'
      + ' grey-brown; there is only ONE such domed building in the'
      + ' picture and nothing rises behind its dome',
      'the restored garden around it with clipped hedges, young plane'
      + ' trees, gravel paths and a stone-lined water channel, the'
      + ' camera standing on the garden side so that the low boundary'
      + ' wall, an iron gate and a bench are in the foreground, early'
      + ' visitors and people walking to work as small distant figures,'
      + ' the flat roofs and shopfronts of the bazaar streets beyond the'
      + ' wall with the first handcarts of the morning, the shallow'
      + ' river and its bridges, and the bare brown ridge above the city'
      + ' with the snow of the high mountains far behind',
    ),
    selite: 'Timur Shah Durrani siirsi valtakuntansa pääkaupungin '
      + 'Kandaharista Kabuliin 1776, ja hänen kahdeksankulmainen '
      + 'tiilimausoleuminsa Kabul-joen rannalla kunnostettiin '
      + 'ympäröivine puistoineen 2000-luvun alussa.',
  },
  {
    id: 'kabul-keskipaiva',
    tiedosto: 'hero-kabul-keskipaiva.png',
    kaupunki: 'kabul',
    prompti: p(
      'the restored Darul Aman palace on its low hill at the end of the'
      + ' Darulaman avenue in Kabul',
      'the long symmetrical neoclassical palace of grey stone and pale'
      + ' plaster, three storeys with a projecting central block behind'
      + ' a colonnade of tall columns and a wide flight of steps, even'
      + ' rows of rectangular windows in plain surrounds, corner'
      + ' pavilions under low domed roofs, and everywhere the marks of a'
      + ' careful restoration: new grey metal roofing, clean plaster and'
      + ' new glass in every window, high midday sun straight down on'
      + ' the pale front so that the colonnade throws one hard band of'
      + ' shade; there is only ONE such palace in the picture and'
      + ' nothing rises behind its roofline',
      'the terraced forecourt with new lawns, staked saplings and a'
      + ' flagpole, the camera standing on the forecourt side so that'
      + ' the stone balustrade and the top of the entrance steps are in'
      + ' the foreground, visitors and staff as small distant figures on'
      + ' the steps, the straight tree-lined avenue running away from'
      + ' the gates with buses and yellow taxis on it, the flat-roofed'
      + ' houses and public buildings of the district below, and the'
      + ' bare brown mountains ringing the valley under a hard blue sky',
    ),
    selite: 'Darul Amanin palatsi rakennettiin 1920-luvulla kuningas '
      + 'Amanullah Khanin uuden hallintokaupungin keskukseksi, ja '
      + 'peruskorjattu palatsi avattiin uudelleen 2019 maan '
      + 'itsenäisyyden satavuotisjuhlassa.',
  },
  {
    id: 'kabul-ilta',
    tiedosto: 'hero-kabul-ilta.png',
    kaupunki: 'kabul',
    prompti: p(
      'the great modern mosque beside Zarnegar park in the centre of'
      + ' Kabul at sunset',
      'the wide prayer hall of pale dressed stone under one large'
      + ' turquoise-tiled dome flanked by two smaller domes, two slender'
      + ' minarets with balconies rising at the front corners, tall'
      + ' pointed windows along the flanks and a high portal of blue and'
      + ' white tilework over the main doors, warm low sunset light from'
      + ' the west sliding across the tiled dome so that the turquoise'
      + ' glaze turns gold while the minaret shafts go dark against the'
      + ' sky; there is only ONE such dome in the picture and nothing'
      + ' rises behind the minarets',
      'the walled forecourt with plane trees, a long ablution trough and'
      + ' rows of shoes at the doors, the camera standing on the'
      + ' forecourt side so that the courtyard wall, the trough and a'
      + ' parked handcart are in the foreground, worshippers and'
      + ' passers-by as small distant figures, the street outside with'
      + ' its evening traffic, fruit stalls and strings of lights coming'
      + ' on, the trees and paths of the park beyond, and the houses'
      + ' climbing in tiers up the dark hillside behind the city with'
      + ' their windows lighting up one by one under the mountains',
    ),
    selite: 'Zarnegar-puiston laidalla seisova Abdul Rahmanin moskeija on '
      + 'yksi Kabulin suurimmista; se valmistui 2010-luvun alussa, ja '
      + 'sen saleihin mahtuu tuhansia rukoilijoita samaan aikaan.',
  },
];
