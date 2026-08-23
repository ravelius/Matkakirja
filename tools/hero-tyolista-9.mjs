/*
 * HEROKUVATYÖLISTA, KIERROS 14 (6 kaupunkia, 18 kuvaa): Firenze,
 * Edinburgh, Doha, Mumbai, Jakarta ja Vladivostok.
 *
 * Sama malli kuin tools/hero-tyolista-8.mjs (RESEPTI v7): koko
 * 'vaaka', kolme kuvaa kaupunkia kohti (aamu, keskipäivä, ilta),
 * jokaisessa eri pääkohde. Kytkentä julkaisussa avauskuvat-taulukon
 * kärkeen (ampari: 'herokoe/hero-<id>-<aika>.png').
 *
 * KAUPUNKIVALINTA: lehtikaupunkeja ilman yhtään heroa, maanosia
 * vuorotellen — Eurooppa 2 (Firenze, Edinburgh), Lähi-itä 1 (Doha),
 * Etelä-Aasia 1 (Mumbai), Kaakkois-Aasia 1 (Jakarta), Venäjä 1
 * (Vladivostok).
 *
 * FAKTAT tarkistettu kaupunkien lehtiaineistosta ja en-Wikipediasta
 * 23.8.2026.
 */

// Reseptin muuttumaton loppuosa — sama kuin hero-tyolista-3..8:ssa.
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
  /* ---- FIRENZE — Duomo, Ponte Vecchio, Palazzo Vecchio. */
  {
    id: 'firenze-aamu',
    tiedosto: 'hero-firenze-aamu.png',
    kaupunki: 'firenze',
    prompti: p(
      'the dome of Florence Cathedral rising over the old city',
      'Brunelleschi’s vast eight-ribbed dome of terracotta tiles with'
      + ' its white marble lantern, the pink, green and white marble'
      + ' patterned walls of the cathedral and Giotto’s slender'
      + ' campanile beside it, low early morning sun from the east'
      + ' warming the terracotta and casting long shadows over the'
      + ' rooftops',
      'the sea of ochre-tiled roofs and shuttered facades of the'
      + ' historic centre pressing around the cathedral square, early'
      + ' walkers as small figures on the paving and the green hills'
      + ' of Fiesole in the haze beyond',
    ),
    selite: 'Brunelleschin kupoli valmistui 1436 ja on yhä maailman '
      + 'suurin muurattu kupoli — se nostettiin ilman tukitelineitä '
      + 'kalanruotolimityksen ja kaksoiskuoren varassa.',
  },
  {
    id: 'firenze-keskipaiva',
    tiedosto: 'hero-firenze-keskipaiva.png',
    kaupunki: 'firenze',
    prompti: p(
      'the Ponte Vecchio over the Arno in Florence',
      'the medieval bridge lined with small jewellers’ shops whose'
      + ' shuttered back rooms overhang the river on wooden brackets,'
      + ' the arched Vasari Corridor running along the top, high'
      + ' midday sun making the ochre and yellow walls glow and the'
      + ' green river mirror the three stone arches',
      'the river embankments with their tall shuttered palazzi,'
      + ' rowers passing under the next bridge upstream and the'
      + ' tower of Palazzo Vecchio rising above the rooftops behind',
    ),
    selite: 'Ponte Vecchio valmistui 1345, ja sen kultaseppien '
      + 'myymälät ovat riippuneet sillan kyljissä 1500-luvulta asti '
      + '— yläpuolella kulkee Vasarin salakäytävä.',
  },
  {
    id: 'firenze-ilta',
    tiedosto: 'hero-firenze-ilta.png',
    kaupunki: 'firenze',
    prompti: p(
      'the tower of Palazzo Vecchio above Florence at sunset',
      'the stone fortress-palace with its projecting battlemented'
      + ' gallery and the slender 94-metre clock tower rising'
      + ' off-centre, the last warm light of sunset from the west'
      + ' glowing on the rusticated stone while swifts wheel around'
      + ' the battlements',
      'the crowded terracotta rooftops of the centre with the great'
      + ' cathedral dome and campanile beyond, the Arno glinting'
      + ' between the bridges and the Tuscan hills darkening on the'
      + ' horizon',
    ),
    selite: 'Palazzo Vecchio nousi 1299 alkaen kaupunkivaltion '
      + 'linnoitetuksi raatihuoneeksi, ja sen 94-metrinen torni '
      + 'hallitsee yhä Firenzen siluettia.',
  },

  /* ---- EDINBURGH — linna, St Giles, Calton Hill. */
  {
    id: 'edinburgh-aamu',
    tiedosto: 'hero-edinburgh-aamu.png',
    kaupunki: 'edinburgh',
    prompti: p(
      'Edinburgh Castle on its volcanic rock',
      'the grey stone fortress sprawling along the crest of the'
      + ' sheer black crag, batteries, barracks and the Great Hall'
      + ' stacked behind the gatehouse, low early morning sun from'
      + ' the east picking out the stonework while mist lingers in'
      + ' the gardens below the rock',
      'the green Princes Street Gardens at the foot of the crag'
      + ' with the ornate Gothic spire of the Scott Monument, the'
      + ' classical galleries on the Mound and the grid of the New'
      + ' Town stretching toward the Firth of Forth',
    ),
    selite: 'Edinburghin linna seisoo sammuneen tulivuoren kraatteri- '
      + 'tulpalla, ja sen kalliolla on ollut linnoitus ainakin '
      + '1100-luvulta — yhden tykin laukaus kajahtaa yhä joka päivä '
      + 'kello 13.',
  },
  {
    id: 'edinburgh-keskipaiva',
    tiedosto: 'hero-edinburgh-keskipaiva.png',
    kaupunki: 'edinburgh',
    prompti: p(
      'St Giles’ Cathedral on the Royal Mile in Edinburgh',
      'the dark medieval kirk with its distinctive openwork crown'
      + ' spire — eight flying buttresses meeting in a stone'
      + ' coronet — above the pillared entrance, high midday sun'
      + ' bringing out the blackened stone against a sky of fast'
      + ' clouds, walkers and a piper as small figures on the'
      + ' cobbled street',
      'the tall narrow tenements and closes of the Royal Mile'
      + ' stepping downhill toward Holyrood, chimney pots and'
      + ' gables in rows and the green whaleback of Arthur’s Seat'
      + ' rising at the street’s end',
    ),
    selite: 'St Gilesin katedraalin kruunutorni on kannatellut '
      + 'kivistä kruunuaan 1400-luvulta asti, ja kirkko on Skotlannin '
      + 'reformaation pääkirkko — John Knox saarnasi täällä.',
  },
  {
    id: 'edinburgh-ilta',
    tiedosto: 'hero-edinburgh-ilta.png',
    kaupunki: 'edinburgh',
    prompti: p(
      'Calton Hill above Edinburgh at sunset',
      'the classical monuments crowning the grassy hilltop — the'
      + ' twelve unfinished Parthenon columns of the National'
      + ' Monument and the small round colonnade of the Dugald'
      + ' Stewart Monument — glowing amber in the last light,'
      + ' walkers as small silhouettes on the paths',
      'the city spread below with the castle on its rock and the'
      + ' spires of the Old Town black against the sunset, the'
      + ' clock tower of the Balmoral Hotel, and the dark mass of'
      + ' Arthur’s Seat against a striped orange sky',
    ),
    selite: 'Calton Hillin kansallismonumentti jäi kesken 1829, kun '
      + 'rahat loppuivat kahdentoista pylvään jälkeen — "Edinburghin '
      + 'häpeäksi" ristitystä raunioista tuli rakastettu maamerkki.',
  },

  /* ---- DOHA — islamilaisen taiteen museo, Souq Waqif, West Bay. */
  {
    id: 'doha-aamu',
    tiedosto: 'hero-doha-aamu.png',
    kaupunki: 'doha',
    prompti: p(
      'the Museum of Islamic Art on its island in Doha',
      'the cream limestone museum rising in stacked, rotated cubes'
      + ' to the small tower with its recessed dark window arch, the'
      + ' building standing on its own artificial island at the end'
      + ' of a palm-lined causeway, low early morning sun modelling'
      + ' the pure geometric volumes and the calm bay mirroring the'
      + ' stone',
      'traditional wooden dhows at anchor on the turquoise water,'
      + ' the long curve of the corniche promenade and the glass'
      + ' towers of West Bay rising across the bay in the morning'
      + ' haze',
    ),
    selite: 'I. M. Pei suunnitteli Dohan islamilaisen taiteen museon '
      + '91-vuotiaana ja vaati sille oman tekosaaren — kuutioista '
      + 'pinottu rakennus avattiin 2008.',
  },
  {
    id: 'doha-keskipaiva',
    tiedosto: 'hero-doha-keskipaiva.png',
    kaupunki: 'doha',
    prompti: p(
      'the Souq Waqif market quarter in Doha',
      'the low mud-rendered facades with exposed timber beams and'
      + ' crenellated rooflines along the winding pedestrian lanes,'
      + ' shaded arcades hung with lanterns and textiles, high'
      + ' midday sun bleaching the plaster while shoppers as small'
      + ' figures keep to the shadowed sides, falcons on perches'
      + ' at a shop door',
      'the slender spiral minaret of the Fanar mosque rising above'
      + ' the quarter, cafe parasols on the main lane and the'
      + ' distant glass towers of the modern city shimmering in'
      + ' the heat',
    ),
    selite: 'Souq Waqif kasvoi beduiinien kauppapaikasta vanhan '
      + 'joenuoman varteen — 2000-luvun restaurointi palautti '
      + 'savirapatut julkisivut ja teki basaarista kaupungin '
      + 'olohuoneen.',
  },
  {
    id: 'doha-ilta',
    tiedosto: 'hero-doha-ilta.png',
    kaupunki: 'doha',
    prompti: p(
      'the West Bay skyline of Doha across the water at dusk',
      'a traditional wooden dhow with strings of lights gliding'
      + ' across the bay in the foreground, the cluster of glass'
      + ' towers — twisting, faceted and crowned with screens of'
      + ' light — glowing violet and gold as the last band of'
      + ' sunset fades behind them',
      'the sweep of the corniche with its palm lights curving'
      + ' toward the towers, the illuminated museum island at the'
      + ' bay’s other end and the calm gulf water mirroring it'
      + ' all',
    ),
    selite: 'West Bayn tornirykelmä nousi parissakymmenessä vuodessa '
      + 'tyhjälle rannalle — dhow-veneet risteilevät yhä lahdella, '
      + 'jonka poukamasta Doha sai nimensäkin.',
  },

  /* ---- MUMBAI — Gateway of India, CST, Marine Drive. */
  {
    id: 'mumbai-aamu',
    tiedosto: 'hero-mumbai-aamu.png',
    kaupunki: 'mumbai',
    prompti: p(
      'the Gateway of India on the Mumbai waterfront',
      'the honey-coloured basalt triumphal arch with its four'
      + ' corner turrets and pierced stone screens standing on the'
      + ' harbour steps, low early morning sun from the east across'
      + ' the water lighting the arch face, pigeons wheeling and'
      + ' early visitors as small figures on the plaza',
      'the red-domed towers of the Taj Mahal Palace hotel rising'
      + ' directly behind the arch, harbour ferries loading at the'
      + ' jetties and the grey-blue Arabian Sea stretching to the'
      + ' horizon',
    ),
    selite: 'Gateway of India valmistui 1924 basaltista kuningas '
      + 'Yrjö V:n vierailun muistoksi — sen kaaren kautta myös '
      + 'viimeiset brittijoukot marssivat laivoihin 1948.',
  },
  {
    id: 'mumbai-keskipaiva',
    tiedosto: 'hero-mumbai-keskipaiva.png',
    kaupunki: 'mumbai',
    prompti: p(
      'the Chhatrapati Shivaji Terminus railway station in Mumbai',
      'the exuberant Victorian-Gothic palace of a station with its'
      + ' great central dome, turrets, rose windows and tiers of'
      + ' pointed arcades in buff and red stone, high hazy midday'
      + ' sun over the crowded intersection where yellow-and-black'
      + ' taxis, red buses and streams of pedestrians swirl past',
      'the dense office blocks and mango trees of the Fort'
      + ' district around the station, kites circling above the'
      + ' rooftops and the city stretching into the heat haze',
    ),
    selite: 'Chhatrapati Shivaji Terminus valmistui 1888 '
      + 'viktoriaanisen gotiikan ja intialaisen kiviornamentiikan '
      + 'liittona — Unescon kohteen laitureilta lähtee yhä yli '
      + 'tuhat junaa päivässä.',
  },
  {
    id: 'mumbai-ilta',
    tiedosto: 'hero-mumbai-ilta.png',
    kaupunki: 'mumbai',
    prompti: p(
      'the curve of Marine Drive in Mumbai at dusk',
      'the three-kilometre boulevard sweeping in a great arc along'
      + ' the bay, its double row of street lamps flickering on so'
      + ' the curve becomes a necklace of lights, strollers and'
      + ' vendors as small figures on the broad seafront promenade'
      + ' while waves break on the tetrapod blocks below',
      'the art deco apartment blocks lining the landward side,'
      + ' the towers of Nariman Point anchoring one end of the arc'
      + ' and the last orange band of sunset over the Arabian Sea',
    ),
    selite: 'Marine Driven kaareva rantabulevardi valaistuu illalla '
      + 'helminauhaksi, jota kaupunki kutsuu kuningattaren '
      + 'kaulakoruksi — sen varrella on maailman laajimpia '
      + 'art deco -kokonaisuuksia.',
  },

  /* ---- JAKARTA — Monas, Istiqlal ja katedraali, Sunda Kelapa. */
  {
    id: 'jakarta-aamu',
    tiedosto: 'hero-jakarta-aamu.png',
    kaupunki: 'jakarta',
    prompti: p(
      'the National Monument of Indonesia in Jakarta',
      'the tall white marble obelisk rising from its cup-shaped'
      + ' pedestal to the gilded flame sculpture at its peak, low'
      + ' early morning sun glinting on the gold leaf while mist'
      + ' hangs over the wide lawns of Merdeka Square, joggers and'
      + ' cyclists as small figures on the radial paths',
      'the tree-lined avenues and ministries around the vast'
      + ' square, the white dome and minaret of the Istiqlal'
      + ' mosque to one side and the towers of the modern city'
      + ' rising through the haze',
    ),
    selite: 'Kansallismonumentti Monas valmistui 1975: 132-metrisen '
      + 'obeliskin huipulla palaa kullattu liekki, ja jalustan '
      + 'maljakko kuvaa riisinsurvontahuhmaria — itsenäisyyden '
      + 'symboli keskellä Merdeka-aukiota.',
  },
  {
    id: 'jakarta-keskipaiva',
    tiedosto: 'hero-jakarta-keskipaiva.png',
    kaupunki: 'jakarta',
    prompti: p(
      'the Istiqlal Mosque and Jakarta Cathedral facing each other',
      'the immense white mosque with its flattened central dome on'
      + ' twelve columns and slender single minaret, and directly'
      + ' across the street the neo-gothic cathedral with its twin'
      + ' openwork iron spires, high midday sun blazing on the'
      + ' white marble and the dark cathedral stone, worshippers'
      + ' as small figures crossing between them',
      'the tunnel entrance linking the two forecourts, canal-side'
      + ' traffic and street vendors under the trees and the'
      + ' high-rises of central Jakarta behind',
    ),
    selite: 'Istiqlal on Kaakkois-Aasian suurin moskeija, ja se '
      + 'seisoo tarkoituksella katedraalia vastapäätä — vuonna 2021 '
      + 'niiden esipihat yhdistettiin "ystävyyden tunnelilla".',
  },
  {
    id: 'jakarta-ilta',
    tiedosto: 'hero-jakarta-ilta.png',
    kaupunki: 'jakarta',
    prompti: p(
      'the old harbour of Sunda Kelapa in Jakarta at sunset',
      'a long row of tall wooden pinisi schooners moored stern-to'
      + ' along the quay, their high curved bows and masts black'
      + ' against the orange sunset, stevedores as small figures'
      + ' carrying sacks up the narrow gangplanks while cranes'
      + ' rest idle',
      'the harbour water glowing copper between the hulls, the'
      + ' old Dutch watchtower and warehouses of the colonial port'
      + ' behind the quay and the haze of the modern city on the'
      + ' skyline',
    ),
    selite: 'Sunda Kelapan satamasta Jakarta sai alkunsa: puisia '
      + 'pinisi-kuunareita lastataan sen laiturissa yhä käsivoimin, '
      + 'kuten vuosisatojen ajan.',
  },

  /* ---- VLADIVOSTOK — Russki-silta, Kultainen sarvi, rautatieasema. */
  {
    id: 'vladivostok-aamu',
    tiedosto: 'hero-vladivostok-aamu.png',
    kaupunki: 'vladivostok',
    prompti: p(
      'the Russky Bridge over the Eastern Bosphorus strait in'
      + ' Vladivostok',
      'the colossal cable-stayed bridge with its two A-shaped'
      + ' pylons and fans of white cables carrying the deck high'
      + ' over the strait, low early morning sun through sea fog'
      + ' so the pylon tops stand clear while the water below is'
      + ' soft white, a freighter emerging from the mist',
      'the wooded shores of Russky Island and the headlands of'
      + ' the mainland, gulls over the strait and the roofs of the'
      + ' university campus on the far shore',
    ),
    selite: 'Russki-silta valmistui 2012, ja sen 1 104 metrin '
      + 'pääjänne on vinoköysisiltojen maailmanennätys — pylonit '
      + 'nousevat 324 metriin.',
  },
  {
    id: 'vladivostok-keskipaiva',
    tiedosto: 'hero-vladivostok-keskipaiva.png',
    kaupunki: 'vladivostok',
    prompti: p(
      'the Vladivostok railway station, the eastern terminus of the'
      + ' Trans-Siberian Railway',
      'the ornate pale-green and white station in Russian revival'
      + ' style with its steep tiled roofs, arched windows and'
      + ' tower, high midday sun bringing out the painted facades,'
      + ' travellers as small figures on the forecourt and a long'
      + ' green train waiting at the platform behind',
      'the cranes and ships of the Golden Horn harbour directly'
      + ' beyond the tracks, hills of the city rising on both'
      + ' sides covered in apartment blocks',
    ),
    selite: 'Vladivostokin asema on Trans-Siperian radan itäinen '
      + 'pääteasema: laiturilla seisova kilometripylväs näyttää '
      + 'lukemaa 9 288 — matkaa Moskovaan.',
  },
  {
    id: 'vladivostok-ilta',
    tiedosto: 'hero-vladivostok-ilta.png',
    kaupunki: 'vladivostok',
    prompti: p(
      'the Golden Horn Bay and Zolotoy Bridge in Vladivostok at'
      + ' sunset',
      'the great V-pyloned cable-stayed bridge spanning the'
      + ' curving bay full of moored ships, seen from the Eagle’s'
      + ' Nest viewpoint, the last orange light of sunset glowing'
      + ' on the cables and the water while the hillsides of'
      + ' apartment blocks begin to light up',
      'cranes and naval ships along the working waterfront, the'
      + ' amphitheatre of the city climbing its hills around the'
      + ' bay and the dark ridges of the Muravyov peninsula against'
      + ' the sunset',
    ),
    selite: 'Kultaisen sarven lahti sai nimensä Istanbulin esikuvan '
      + 'mukaan, ja sen yli jännittyy 2012 valmistunut '
      + 'Zolotoi-silta — Kotkanpesän näköalakukkulalta koko satama '
      + 'avautuu kerralla.',
  },
];
