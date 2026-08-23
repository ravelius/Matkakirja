/*
 * HEROKUVATYÖLISTA, KIERROS 13 (6 kaupunkia, 18 kuvaa): Tukholma,
 * Budapest, Tripoli, Masqat, Taipei ja Kolkata.
 *
 * Sama malli kuin tools/hero-tyolista-7.mjs (RESEPTI v7): koko
 * 'vaaka', kolme kuvaa kaupunkia kohti (aamu, keskipäivä, ilta),
 * jokaisessa eri pääkohde. Kytkentä julkaisussa avauskuvat-taulukon
 * kärkeen (ampari: 'herokoe/hero-<id>-<aika>.png').
 *
 * KAUPUNKIVALINTA: lehtikaupunkeja ilman yhtään heroa, maanosia
 * vuorotellen — Eurooppa 2 (Tukholma, Budapest), Afrikka 1 (Tripoli),
 * Lähi-itä 1 (Masqat), Itä-Aasia 1 (Taipei), Etelä-Aasia 1 (Kolkata).
 *
 * FAKTAT tarkistettu kaupunkien lehtiaineistosta ja en-Wikipediasta
 * 23.8.2026.
 */

// Reseptin muuttumaton loppuosa — sama kuin hero-tyolista-3..7:ssä.
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
  /* ---- TUKHOLMA — kuninkaanlinna, kaupungintalo, Riddarholmen. */
  {
    id: 'tukholma-aamu',
    tiedosto: 'hero-tukholma-aamu.png',
    kaupunki: 'tukholma',
    prompti: p(
      'the Royal Palace of Stockholm above Gamla Stan',
      'the vast baroque palace block with its long ochre-and-sandstone'
      + ' facades and green copper roof rising straight from the'
      + ' waterfront terrace, blue-uniformed guards as small figures'
      + ' in the outer courtyard, low early morning sun from the east'
      + ' warming the stone while gulls wheel over the water',
      'the tight lanes and orange rooftops of the old town pressing'
      + ' behind the palace, the German Church spire above them,'
      + ' ferries crossing the glittering Strömmen channel and the'
      + ' facades of the National Museum on the far quay',
    ),
    selite: 'Tukholman kuninkaanlinna valmistui 1754 palaneen Tre '
      + 'Kronorin paikalle, ja yli 600 huoneellaan se on Euroopan '
      + 'suurimpia yhä virkakäytössä olevia kuninkaanlinnoja.',
  },
  {
    id: 'tukholma-keskipaiva',
    tiedosto: 'hero-tukholma-keskipaiva.png',
    kaupunki: 'tukholma',
    prompti: p(
      'Stockholm City Hall on the shore of Riddarfjärden',
      'the massive dark red-brick hall with its arcaded waterfront'
      + ' garden and the tall square corner tower crowned by the'
      + ' three golden crowns, high midday sun sparkling on the open'
      + ' water and glinting off the gilding, sightseers as small'
      + ' figures on the terrace',
      'sailboats and white archipelago ferries on the broad'
      + ' Riddarfjärden, the church spires and rooftops of'
      + ' Riddarholmen and Gamla Stan across the bay and the ridge'
      + ' of Södermalm behind',
    ),
    selite: 'Tukholman kaupungintalo valmistui 1923 kahdeksasta '
      + 'miljoonasta tiilestä, ja sen 106-metrisen tornin huipulla '
      + 'kimaltavat kolme kruunua — juhlasalissa tanssitaan '
      + 'Nobel-illalliset.',
  },
  {
    id: 'tukholma-ilta',
    tiedosto: 'hero-tukholma-ilta.png',
    kaupunki: 'tukholma',
    prompti: p(
      'the island of Riddarholmen in Stockholm at sunset',
      'the openwork cast-iron spire of Riddarholmen Church rising'
      + ' above the ochre and dusky red palace facades of the little'
      + ' island, the last warm light of sunset from the west glowing'
      + ' on the water of Riddarfjärden and silhouetting the spire,'
      + ' a commuter ferry sliding past',
      'the quays and gabled rooftops of Gamla Stan behind the island,'
      + ' the City Hall tower across the bay catching the light, and'
      + ' the first window lights of Södermalm on the heights',
    ),
    selite: 'Riddarholmenin kirkko on Tukholman vanhimpia rakennuksia '
      + 'ja Ruotsin kuninkaiden hautakirkko 1600-luvulta asti — sen '
      + 'valurautainen pitsitorni nousi tulipalon jälkeen 1846.',
  },

  /* ---- BUDAPEST — parlamentti, Kalastajanlinnake, Ketjusilta. */
  {
    id: 'budapest-aamu',
    tiedosto: 'hero-budapest-aamu.png',
    kaupunki: 'budapest',
    prompti: p(
      'the Hungarian Parliament Building on the Danube in Budapest',
      'the immense neo-gothic palace stretching along the riverbank'
      + ' with its forest of pinnacles, symmetrical wings and the'
      + ' great central dome, low early morning sun from the east'
      + ' washing the pale limestone in gold and the calm Danube'
      + ' mirroring the whole facade, a tram passing on the far quay',
      'the green of the Buda hills across the river, the spires of'
      + ' Matthias Church and the Fisherman’s Bastion on the castle'
      + ' hill and barges moored along the embankment',
    ),
    selite: 'Unkarin parlamenttitalo valmistui 1904 Imre Steindlin '
      + 'piirustuksin: uusgoottilainen palatsi on 268 metriä pitkä, ja '
      + 'sen kupoli nousee tasan 96 metriin — luku muistuttaa vuoden '
      + '896 maahantulosta.',
  },
  {
    id: 'budapest-keskipaiva',
    tiedosto: 'hero-budapest-keskipaiva.png',
    kaupunki: 'budapest',
    prompti: p(
      'the Fisherman’s Bastion and Matthias Church on Castle Hill in'
      + ' Budapest',
      'the white neo-romanesque terrace with its seven conical'
      + ' turrets and arcaded walkways curving along the hilltop, the'
      + ' diamond-patterned majolica roof and tall gothic spire of'
      + ' Matthias Church rising behind, high midday sun making the'
      + ' white stone gleam and the roof tiles glow orange and green,'
      + ' visitors as small figures on the ramparts',
      'the Danube far below with its bridges, the dome and pinnacles'
      + ' of the Parliament on the flat Pest bank and the city grid'
      + ' stretching to the haze',
    ),
    selite: 'Kalastajanlinnakkeen seitsemän suippotornia muistuttavat '
      + 'unkarilaisten seitsemästä heimosta — näköalaterassi valmistui '
      + '1902 Matthias-kirkon viereen, eikä se ole koskaan ollut '
      + 'puolustusrakennelma.',
  },
  {
    id: 'budapest-ilta',
    tiedosto: 'hero-budapest-ilta.png',
    kaupunki: 'budapest',
    prompti: p(
      'the Széchenyi Chain Bridge and Buda Castle in Budapest at'
      + ' dusk',
      'the classical suspension bridge with its two stone towers and'
      + ' sweeping chain curves strung with lights, the stone lions'
      + ' guarding the abutments, the last orange band of sunset'
      + ' behind the castle hill while the long facade of Buda Castle'
      + ' glows floodlit above the river',
      'the dark Danube mirroring the bridge lights, an evening'
      + ' cruise boat passing beneath, the funicular track climbing'
      + ' the hill and the lit embankments of Pest behind',
    ),
    selite: 'Széchenyin ketjusilta valmistui 1849 ensimmäisenä '
      + 'pysyvänä siltana Tonavan yli Budan ja Pestin välillä — '
      + 'kivileijonat ovat vartioineet sen päitä vuodesta 1852.',
  },

  /* ---- TRIPOLI — Punainen linna, Marcus Aureliuksen kaari, medina. */
  {
    id: 'tripoli-aamu',
    tiedosto: 'hero-tripoli-aamu.png',
    kaupunki: 'tripoli',
    prompti: p(
      'the Red Castle of Tripoli, the Assai al-Hamra fortress',
      'the sprawling ochre-red fortress with its irregular high walls,'
      + ' round bastions and palm-shaded inner courtyards rising at'
      + ' the edge of the old city, low early morning sun from the'
      + ' east deepening the red of the walls and throwing long'
      + ' shadows across the open square below',
      'the whitewashed flat rooftops and minarets of the medina'
      + ' pressing behind the fortress, the palm-lined seafront'
      + ' boulevard and the Mediterranean glittering beyond the'
      + ' harbour breakwater',
    ),
    selite: 'Tripolin Punainen linna eli Assai al-Hamra on vartioinut '
      + 'satamaa vuosisatoja: foinikialaisten perustukselle ovat '
      + 'rakentaneet roomalaiset, ritarit ja osmanit kukin kerroksensa.',
  },
  {
    id: 'tripoli-keskipaiva',
    tiedosto: 'hero-tripoli-keskipaiva.png',
    kaupunki: 'tripoli',
    prompti: p(
      'the Arch of Marcus Aurelius in the old city of Tripoli',
      'the white marble Roman quadrifrons arch standing sunken below'
      + ' street level in its small plaza, carved reliefs and'
      + ' weathered pilasters on all four faces, high midday sun'
      + ' bleaching the marble against the deep blue sky, a few'
      + ' palm trees leaning over the surrounding railing',
      'the whitewashed houses and green-shuttered balconies of the'
      + ' medina crowding around the plaza, a slender minaret rising'
      + ' behind and the masts of fishing boats in the harbour at'
      + ' the street’s end',
    ),
    selite: 'Marcus Aureliuksen kunniaksi pystytetty nelikaari '
      + 'valmistui vuonna 165 roomalaisen Oean keskustaan — se on '
      + 'ainoa kaupungista kokonaisena säilynyt antiikin rakennus.',
  },
  {
    id: 'tripoli-ilta',
    tiedosto: 'hero-tripoli-ilta.png',
    kaupunki: 'tripoli',
    prompti: p(
      'the harbour front and medina skyline of Tripoli at sunset',
      'the long curve of the old harbour with fishing boats at their'
      + ' moorings, the domes and slender Ottoman minarets of the'
      + ' medina mosques rising above the whitewashed rooftops, the'
      + ' last warm light of sunset from the west turning the walls'
      + ' honey-coloured and the sea to hammered copper',
      'the red walls of the castle anchoring one end of the'
      + ' waterfront, palm crowns along the corniche, swallows'
      + ' circling and the first lamps coming on in the lanes',
    ),
    selite: 'Tripolin medina kasvoi osmanikaudella satamansa ympärille, '
      + 'ja sen kapeiden kujien ylle nousevat yhä 1700-luvun '
      + 'moskeijoiden kupolit ja minareetit.',
  },

  /* ---- MASQAT — suurmoskeija, Mutrah, linnakkeet. */
  {
    id: 'masqat-aamu',
    tiedosto: 'hero-masqat-aamu.png',
    kaupunki: 'masqat',
    prompti: p(
      'the Sultan Qaboos Grand Mosque in Muscat',
      'the great sand-coloured mosque with its ribbed golden dome and'
      + ' the slender 90-metre main minaret rising from arcaded'
      + ' courtyards, four corner minarets framing the composition,'
      + ' low early morning sun warming the stone and striping the'
      + ' marble courtyards with long shadows, worshippers as small'
      + ' white-robed figures',
      'the dry rocky ridges of the Hajar foothills behind the mosque,'
      + ' the low white villas and date palms of the suburbs and the'
      + ' morning haze over the distant sea',
    ),
    selite: 'Sulttaani Qaboosin suurmoskeija valmistui 2001: sen '
      + 'pääminareetti nousee 90 metriin, ja rukoussalin persialainen '
      + 'matto kudottiin yhtenä 4 200 neliömetrin kappaleena.',
  },
  {
    id: 'masqat-keskipaiva',
    tiedosto: 'hero-masqat-keskipaiva.png',
    kaupunki: 'masqat',
    prompti: p(
      'the Mutrah corniche and harbour in Muscat',
      'the long white waterfront crescent of merchant houses with'
      + ' wooden balconies and the small gold-domed mosque at its'
      + ' centre, traditional wooden dhows and modern boats at anchor'
      + ' on the turquoise bay, high midday sun blazing on the white'
      + ' facades and the bare rock ridge rising directly behind the'
      + ' houses, a small watchtower on its crest',
      'the fish market awnings at the harbour’s end, strollers as'
      + ' small figures under the corniche palms and the jagged'
      + ' brown mountains folding away along the coast',
    ),
    selite: 'Mutrahin korniisi kaartuu vanhan kauppasataman ympäri, ja '
      + 'sen suq on Arabian niemimaan vanhimpia — vuorten ja meren '
      + 'väliin puristunut ranta on ollut kauppapaikka vuosisadat.',
  },
  {
    id: 'masqat-ilta',
    tiedosto: 'hero-masqat-ilta.png',
    kaupunki: 'masqat',
    prompti: p(
      'the Al Jalali and Al Mirani forts above Old Muscat harbour at'
      + ' sunset',
      'the two stone Portuguese forts crowning their bare rock'
      + ' headlands on either side of the small cove, round towers'
      + ' and crenellated walls glowing amber in the last light, the'
      + ' white ceremonial palace with its flared gold-and-blue'
      + ' columns on the waterfront between them, the sea turning'
      + ' violet',
      'the dark serrated ridges of the coastal mountains folding'
      + ' behind the cove, a dhow rounding the headland and the'
      + ' first lights of Old Muscat glinting along the shore',
    ),
    selite: 'Al Jalalin ja Al Miranin linnakkeet nousivat Maskatin '
      + 'sataman kallioille 1580-luvulla portugalilaisten '
      + 'rakentamina, ja niiden välissä seisoo sulttaanin '
      + 'seremoniallinen Al Alamin palatsi.',
  },

  /* ---- TAIPEI — Taipei 101, muistohalli, Longshan. */
  {
    id: 'taipei-aamu',
    tiedosto: 'hero-taipei-aamu.png',
    kaupunki: 'taipei',
    prompti: p(
      'the Taipei 101 tower above the Xinyi district in Taipei',
      'the pale blue-green glass tower rising in eight outward-flaring'
      + ' bamboo-segment tiers to its spire, gold detailing at each'
      + ' segment joint, low early morning sun from the east glinting'
      + ' off the curtain wall while thin mist lies in the streets'
      + ' below',
      'the boulevards and mid-rise blocks of the Xinyi district'
      + ' waking up, green forested ridges of Elephant Mountain'
      + ' rising close behind the city and the basin haze over the'
      + ' rest of Taipei',
    ),
    selite: 'Taipei 101 oli valmistuessaan 2004 maailman korkein '
      + 'rakennus: 508-metrinen torni nousee kahdeksana '
      + 'bambunvarren jaksona, ja sen heilurivaimennin painaa 660 '
      + 'tonnia.',
  },
  {
    id: 'taipei-keskipaiva',
    tiedosto: 'hero-taipei-keskipaiva.png',
    kaupunki: 'taipei',
    prompti: p(
      'the Chiang Kai-shek Memorial Hall in Taipei',
      'the great white hall with its double-eaved octagonal roof of'
      + ' deep blue glazed tiles standing at the top of its broad'
      + ' stairway, high midday sun making the white marble walls'
      + ' blaze against the sky, visitors as small figures on the'
      + ' vast paved plaza below',
      'the ornate orange-roofed National Theater and Concert Hall'
      + ' facing each other across the plaza, the white five-arched'
      + ' gateway at the far end, clipped gardens and ponds along'
      + ' the edges and the towers of central Taipei beyond',
    ),
    selite: 'Chiang Kai-shekin muistohalli valmistui 1980: '
      + 'kahdeksankulmainen sininen katto ja 89 porrasta kantavat '
      + 'symboliikkaa, ja aukiosta on tullut kaupungin '
      + 'kansalaistapahtumien näyttämö.',
  },
  {
    id: 'taipei-ilta',
    tiedosto: 'hero-taipei-ilta.png',
    kaupunki: 'taipei',
    prompti: p(
      'the Longshan Temple in the Wanhua district of Taipei at dusk',
      'the ornate temple courtyard glowing with red lanterns and'
      + ' altar lights, sweeping swallowtail roof ridges crusted with'
      + ' dragons and jewelled figures, incense smoke curling through'
      + ' the warm lamplight as worshippers move between the halls'
      + ' with joss sticks, the last violet light fading above the'
      + ' roofline',
      'the busy market street outside the gate with food stalls'
      + ' lighting up, mopeds passing and the neon and tower blocks'
      + ' of the modern city rising behind the old district',
    ),
    selite: 'Longshanin temppeli perustettiin 1738 Fujianin '
      + 'siirtolaisten voimin, ja se on jälleenrakennettu '
      + 'maanjäristysten ja pommitusten jälkeen aina entistä '
      + 'koristeellisemmaksi.',
  },

  /* ---- KOLKATA — Victoria Memorial, Howrah, Dakshineswar. */
  {
    id: 'kolkata-aamu',
    tiedosto: 'hero-kolkata-aamu.png',
    kaupunki: 'kolkata',
    prompti: p(
      'the Victoria Memorial in Kolkata',
      'the great white Makrana-marble memorial with its central dome'
      + ' crowned by the dark winged Angel of Victory, corner domes'
      + ' and colonnaded porticoes, low early morning sun through'
      + ' thin mist turning the marble pearl and gold, reflected in'
      + ' the long still pool of the gardens',
      'the clipped lawns and palm avenues of the Maidan around the'
      + ' memorial, early walkers as small figures on the paths and'
      + ' the hazy rooftops of central Kolkata beyond the trees',
    ),
    selite: 'Victoria Memorial valmistui 1921 samasta Makranan '
      + 'valkoisesta marmorista kuin Taj Mahal, ja sen kupolia '
      + 'kruunaa pyörivä Voiton enkeli.',
  },
  {
    id: 'kolkata-keskipaiva',
    tiedosto: 'hero-kolkata-keskipaiva.png',
    kaupunki: 'kolkata',
    prompti: p(
      'the Howrah Bridge over the Hooghly River in Kolkata',
      'the huge grey steel cantilever bridge spanning the wide brown'
      + ' river without a single pier in the water, its dense'
      + ' riveted lattice towering over the double-decker buses,'
      + ' yellow taxis and streams of pedestrians crossing the deck,'
      + ' high hazy midday sun flattening the light over the river',
      'wooden ferries and barges cutting wakes below, the bathing'
      + ' ghats and flower market crowds on the near bank and the'
      + ' packed rooftops of Howrah on the far shore',
    ),
    selite: 'Howrahin silta valmistui 1943 ilman yhtäkään jokeen '
      + 'laskettua pilaria: 705-metrinen ulokesilta kantaa päivässä '
      + 'yli satatuhatta ajoneuvoa ja loputtoman jalankulkijavirran.',
  },
  {
    id: 'kolkata-ilta',
    tiedosto: 'hero-kolkata-ilta.png',
    kaupunki: 'kolkata',
    prompti: p(
      'the Dakshineswar Kali Temple on the Hooghly River near'
      + ' Kolkata',
      'the tall cream-and-red temple rising in its nine ornate'
      + ' curved-roofed towers above the broad riverside courtyard,'
      + ' the row of twelve small white Shiva shrines lining the'
      + ' river wall, the last warm light of sunset colouring the'
      + ' towers and the river, pilgrims as small figures on the'
      + ' bathing steps',
      'the wide Hooghly glowing with the sunset, a ferry crossing'
      + ' toward the temple ghat, palm trees along the banks and'
      + ' the lamps of the temple bazaar beginning to shine',
    ),
    selite: 'Dakshineswarin Kali-temppeli valmistui 1855 Hooghlyn '
      + 'rannalle: yhdeksäntorninen pyhäkkö tunnetaan mystikko '
      + 'Ramakrishnan kotitemppelinä, ja sen pihaa reunustaa '
      + 'kaksitoista Shivan pyhäkköä.',
  },
];
