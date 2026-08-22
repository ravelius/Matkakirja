/*
 * JULISTETYÖLISTA, ERÄ 1/2 (49 kohdetta).
 *
 * Kuparipiirrosjulisteen sommittelut kuvageneraattorille. Tämä tiedosto
 * on TILAUSLISTA, ei pelidataa: valmiin julisteen otsikko ja selite
 * asuvat js/packs/julisteet.js:ssä, ja peli lukee vain sitä taulua.
 * Sommittelu on englanniksi, koska generointiprompti on englanniksi
 * (ks. js/lehti.js grafiikkalehden promptipohja).
 *
 * KAAVA (sama joka julisteessa, vain hakasulut vaihtuvat):
 *   "Create a premium vertical 4:5 travel poster of <sommittelu>.
 *    Typography: at the top, the name <NIMI> in large elegant engraved
 *    capitals, and directly below it, much smaller, the year <VUOSI> —
 *    and NO OTHER TEXT ANYWHERE on the poster. Style: 19th century
 *    COPPER ENGRAVING — extremely fine parallel hatching and
 *    cross-hatching build every tone, single dark sepia ink on cream
 *    laid paper, crisp burin lines, a thin ruled frame and plate mark
 *    near the edges, generous quiet sky; the discipline of an antique
 *    atlas vignette. Avoid: photorealism, flat gray washes, gradients,
 *    colour, softness, any modern object."
 *
 * VUOSI ON AIKAKONE, EI KORISTE. Jokaisen kohteen maamerkit on
 * tarkistettu en-Wikipediasta 22.8.2026 sitä vuotta vasten, joka
 * julisteeseen painetaan: Dubaissa 1873 on helmenkalastajakylä eikä
 * pilvenpiirtäjää, Prahan Pyhän Vituksen katedraali on yhä kesken,
 * Firenzen tuomiokirkko saa julkisivunsa vasta 1887 ja Sofiassa on
 * vielä minareetit, jotka räjäytettiin vuoden 1878 joulukuussa.
 * Vuosi 1873 on isoisän oma matkavuosi ja siksi oletus; muu vuosi on
 * valittu vain, kun paikalla on sitä parempi oma vuosi.
 *
 * NIMI ON AIKAKAUDEN NIMI silloin kun kaupunki on sittemmin nimetty
 * uudelleen (Konstantinopolin ennakkotapaus): CHRISTIANIA, RAGUSA,
 * REVAL, SMYRNA. Pelkkä translitteraation muutos ei riitä siihen —
 * Kiova on KYIV ja Vilna VILNIUS.
 *
 * ARABIAN NIEMIMAAN PYHÄT KOHTEET (Mekka, Medina) sommitellaan
 * kunnioittavasti ja arkkitehtuuriin keskittyen: rakennus, muurit ja
 * maisema, väkijoukot vain kaukana mittakaavana.
 */

/** @type {{id: string, tiedosto: string, nimi: string, vuosi: string, sommittelu: string}[]} */
export const TYOLISTA = [
  {
    id: 'praha',
    tiedosto: 'tuot-praha.png',
    nimi: 'PRAGUE',
    vuosi: '1883',
    sommittelu: 'Prague in 1883 as a beautiful miniature world: the newly '
      + 'rebuilt National Theatre on the Vltava embankment as the dominant '
      + 'central feature, surrounded by the statue-lined Charles Bridge, the '
      + 'castle on its ridge with the Gothic choir of St Vitus still '
      + 'unfinished, the twin towers of the Týn Church over the Old Town '
      + 'roofs, timber rafts and a paddle steamer on the river, and tiny '
      + 'horse trams and top-hatted crowds for scale',
  },
  {
    id: 'berliini',
    tiedosto: 'tuot-berliini.png',
    nimi: 'BERLIN',
    vuosi: '1873',
    sommittelu: 'Berlin in 1873 as a beautiful miniature world: the just '
      + 'inaugurated Victory Column standing on the open Königsplatz as the '
      + 'dominant central feature, surrounded by the Brandenburg Gate and the '
      + 'lime trees of Unter den Linden, the domed City Palace and the Red '
      + 'City Hall, barges on the Spree, and tiny horse trams, carriages and '
      + 'strolling Berliners for scale',
  },
  {
    id: 'tukholma',
    tiedosto: 'tuot-tukholma.png',
    nimi: 'STOCKHOLM',
    vuosi: '1891',
    sommittelu: 'Stockholm in 1891 as a beautiful miniature world: the long '
      + 'Royal Palace above the water of the old town as the dominant central '
      + 'feature, surrounded by the cast-iron spire of Riddarholmen Church, '
      + 'the Katarina passenger lift on the southern heights, the wooded shore '
      + 'of Djurgården where the new open-air museum stands, white steam '
      + 'ferries and sailing barges crossing the bay, and tiny quayside crowds '
      + 'for scale',
  },
  {
    id: 'amsterdam',
    tiedosto: 'tuot-amsterdam.png',
    nimi: 'AMSTERDAM',
    vuosi: '1885',
    sommittelu: 'Amsterdam in 1885 as a beautiful miniature world: the newly '
      + 'opened Rijksmuseum with its twin towers as the dominant central '
      + 'feature, surrounded by rings of gabled canal houses, the tower of the '
      + 'Westerkerk, the Montelbaanstoren by the old harbour, the wooden Magere '
      + 'Brug drawbridge, herring boats and barges on the water, and tiny horse '
      + 'trams and bargemen for scale',
  },
  {
    id: 'dublin',
    tiedosto: 'tuot-dublin.png',
    nimi: 'DUBLIN',
    vuosi: '1873',
    sommittelu: 'Dublin in 1873 as a beautiful miniature world: the domed '
      + 'Custom House on the Liffey quays as the dominant central feature, '
      + 'surrounded by the cast-iron Ha’penny Bridge, Nelson’s Pillar on '
      + 'Sackville Street, the front of Trinity College, the smoking Guinness '
      + 'brewery at St James’s Gate, sailing colliers moored along the quays, '
      + 'and tiny horse trams and jaunting cars for scale',
  },
  {
    id: 'edinburgh',
    tiedosto: 'tuot-edinburgh.png',
    nimi: 'EDINBURGH',
    vuosi: '1883',
    sommittelu: 'Edinburgh in 1883 as a beautiful miniature world: the castle '
      + 'on its volcanic rock as the dominant central feature, surrounded by '
      + 'the pinnacled Scott Monument on Princes Street, the crown spire of St '
      + 'Giles along the Royal Mile, the unfinished columns on Calton Hill, the '
      + 'crag of Arthur’s Seat behind, smoke and steam rising from the station '
      + 'in the valley below, and tiny carriages and top-hatted walkers for '
      + 'scale',
  },
  {
    id: 'marseille',
    tiedosto: 'tuot-marseille.png',
    nimi: 'MARSEILLE',
    vuosi: '1873',
    sommittelu: 'Marseille in 1873 as a beautiful miniature world: the basilica '
      + 'of Notre-Dame de la Garde on its limestone hill as the dominant '
      + 'central feature, surrounded by the crowded masts of the Old Port, Fort '
      + 'Saint-Jean at the harbour mouth, the half-built striped cathedral of '
      + 'La Major, the island fortress of the Château d’If offshore, steamers '
      + 'loading for the Levant, and tiny dockers and carts for scale',
  },
  {
    id: 'lissabon',
    tiedosto: 'tuot-lissabon.png',
    nimi: 'LISBON',
    vuosi: '1873',
    sommittelu: 'Lisbon in 1873 as a beautiful miniature world: the arcaded '
      + 'Praça do Comércio open to the Tagus as the dominant central feature, '
      + 'surrounded by the castle of São Jorge on its hill, the tiled roofs of '
      + 'the Alfama, the Belém Tower downstream, the long arches of the Águas '
      + 'Livres aqueduct, sailing barcos and paddle steamers on the river, and '
      + 'tiny horse trams and fishwives for scale',
  },
  {
    id: 'barcelona',
    tiedosto: 'tuot-barcelona.png',
    nimi: 'BARCELONA',
    vuosi: '1888',
    sommittelu: 'Barcelona in 1888 as a beautiful miniature world: the brick '
      + 'Arc de Triomf, gateway of the Universal Exposition, as the dominant '
      + 'central feature, surrounded by the exhibition pavilions in the '
      + 'Ciutadella park, the new Columbus column at the foot of the Rambla, '
      + 'the Gothic cathedral among the old roofs, the hill of Montjuïc above '
      + 'the harbour, steamers and sailing ships at the quays, and tiny crowds '
      + 'of visitors for scale',
  },
  {
    id: 'granada',
    tiedosto: 'tuot-granada.png',
    nimi: 'GRANADA',
    vuosi: '1870',
    sommittelu: 'Granada in 1870 as a beautiful miniature world: the Alhambra '
      + 'on its red ridge, its towers and Comares hall newly protected as a '
      + 'national monument, as the dominant central feature, surrounded by the '
      + 'cypress gardens of the Generalife above it, the whitewashed Albaicín '
      + 'on the facing hillside, the heavy cathedral in the town below, the '
      + 'snow line of the Sierra Nevada behind, and tiny muleteers and water '
      + 'sellers for scale',
  },
  {
    id: 'budapest',
    tiedosto: 'tuot-budapest.png',
    nimi: 'BUDAPEST',
    vuosi: '1873',
    sommittelu: 'Budapest in 1873 as a beautiful miniature world: the '
      + 'Széchenyi Chain Bridge across the Danube as the dominant central '
      + 'feature, surrounded by the royal palace on the Buda hill with the '
      + 'castle funicular climbing beside it, the tower of the Matthias Church, '
      + 'the domes of the Great Synagogue over the Pest roofs, paddle steamers '
      + 'and grain barges on the river, and tiny carriages and market crowds '
      + 'for scale',
  },
  {
    id: 'krakova',
    tiedosto: 'tuot-krakova.png',
    nimi: 'KRAKOW',
    vuosi: '1873',
    sommittelu: 'Kraków in 1873 as a beautiful miniature world: the unequal '
      + 'towers of St Mary’s Basilica above the great market square as the '
      + 'dominant central feature, surrounded by the long Cloth Hall standing '
      + 'in the middle of the square, the cathedral and castle on Wawel hill '
      + 'still occupied as an Austrian barracks, the round brick Barbican and '
      + 'city gate, the Vistula with its ferries, and tiny market stalls, carts '
      + 'and pigeons for scale',
  },
  {
    id: 'varsova',
    tiedosto: 'tuot-varsova.png',
    nimi: 'WARSAW',
    vuosi: '1873',
    sommittelu: 'Warsaw in 1873 as a beautiful miniature world: the iron spans '
      + 'of the Kierbedź Bridge carrying the road across the Vistula as the '
      + 'dominant central feature, surrounded by the Royal Castle and '
      + 'Sigismund’s Column above the Old Town roofs, the ramparts of the '
      + 'Citadel downstream, the trees of the Saxon Garden, timber rafts and '
      + 'barges on the river, and tiny horse trams, droshkies and sentries for '
      + 'scale',
  },
  {
    id: 'helsinki',
    tiedosto: 'tuot-helsinki.png',
    nimi: 'HELSINKI',
    vuosi: '1873',
    sommittelu: 'Helsinki in 1873 as a beautiful miniature world: the white '
      + 'Nicholas Church rising on its long flight of steps over the Senate '
      + 'Square as the dominant central feature, surrounded by the neoclassical '
      + 'senate and university buildings, the onion domes of the red-brick '
      + 'Uspenski Cathedral on its rock, the market square and harbour with '
      + 'sailing schooners and a steam ferry, the bastions of Suomenlinna out '
      + 'in the sound, and tiny fish sellers for scale',
  },
  {
    id: 'tampere',
    tiedosto: 'tuot-tampere.png',
    nimi: 'TAMPERE',
    vuosi: '1882',
    sommittelu: 'Tampere in 1882 as a beautiful miniature world: the long brick '
      + 'Finlayson cotton mill beside the Tammerkoski rapids, its windows lit '
      + 'by the first electric light in the north, as the dominant central '
      + 'feature, surrounded by tall factory chimneys and mill dams, the wooden '
      + 'Old Church among timber houses, the two lakes on either side of the '
      + 'rapids, floating logs in the current, and tiny mill workers crossing '
      + 'the bridge for scale',
  },
  {
    id: 'tallinna',
    tiedosto: 'tuot-tallinna.png',
    nimi: 'REVAL',
    vuosi: '1873',
    sommittelu: 'Reval in 1873 as a beautiful miniature world: the tall spire '
      + 'of St Olaf’s Church over the gabled lower town as the dominant central '
      + 'feature, surrounded by the walls and round towers of the medieval '
      + 'fortification, the castle and cathedral of the upper town on its '
      + 'limestone hill, the squat Fat Margaret gate tower by the shore, the '
      + 'harbour with schooners and a steamer quay, and tiny carters and market '
      + 'women for scale',
  },
  {
    id: 'kiova',
    tiedosto: 'tuot-kiova.png',
    nimi: 'KYIV',
    vuosi: '1892',
    sommittelu: 'Kyiv in 1892 as a beautiful miniature world: the golden great '
      + 'bell tower of the Caves Monastery on the Dnieper bluffs as the '
      + 'dominant central feature, surrounded by the domes of St Sophia, the '
      + 'baroque St Andrew’s Church above the Podil quarter, the long Nicholas '
      + 'chain bridge across the river, a brand-new electric tram climbing the '
      + 'steep hill, paddle steamers and timber rafts below, and tiny '
      + 'passengers for scale',
  },
  {
    id: 'pietari',
    tiedosto: 'tuot-pietari.png',
    nimi: 'SAINT PETERSBURG',
    vuosi: '1873',
    sommittelu: 'Saint Petersburg in 1873 as a beautiful miniature world: the '
      + 'gilded dome of St Isaac’s Cathedral as the dominant central feature, '
      + 'surrounded by the Winter Palace and the Alexander Column on the palace '
      + 'square, the needle spire of the Peter and Paul fortress across the '
      + 'Neva, the newly unveiled monument to Catherine the Great in its garden '
      + 'on the Nevsky Prospekt, barges and a pontoon bridge on the wide river, '
      + 'and tiny carriages and guardsmen for scale',
  },
  {
    id: 'sofia',
    tiedosto: 'tuot-sofia.png',
    nimi: 'SOFIA',
    vuosi: '1873',
    sommittelu: 'Sofia in 1873 as a beautiful miniature world: the lead domes '
      + 'and single minaret of the Banya Bashi Mosque as the dominant central '
      + 'feature, surrounded by the low tiled roofs and wooden balconies of the '
      + 'Ottoman town, the ancient brick rotunda of St George in its courtyard, '
      + 'the covered bazaar and the governor’s konak, the long ridge of Vitosha '
      + 'rising behind, and tiny ox carts, water carriers and pack mules for '
      + 'scale',
  },
  {
    id: 'bukarest',
    tiedosto: 'tuot-bukarest.png',
    nimi: 'BUCHAREST',
    vuosi: '1888',
    sommittelu: 'Bucharest in 1888 as a beautiful miniature world: the newly '
      + 'opened domed Romanian Athenaeum with its columned porch as the '
      + 'dominant central feature, surrounded by the mansions and shop fronts '
      + 'of the Calea Victoriei, the little painted church of Stavropoleos '
      + 'among the old inns, the towers of the princely court, the willow-lined '
      + 'Dâmbovița, and tiny horse trams, open carriages and evening crowds for '
      + 'scale',
  },
  {
    id: 'sarajevo',
    tiedosto: 'tuot-sarajevo.png',
    nimi: 'SARAJEVO',
    vuosi: '1878',
    sommittelu: 'Sarajevo in 1878 as a beautiful miniature world: the dome and '
      + 'slim minaret of the Gazi Husrev-beg Mosque above the Baščaršija bazaar '
      + 'as the dominant central feature, surrounded by the coppersmiths’ lanes '
      + 'with their wooden shutters, the stone arches of the Latin Bridge over '
      + 'the Miljacka, white houses and dark cypresses climbing the steep '
      + 'hillsides, a small column of newly arrived Austro-Hungarian soldiers '
      + 'in the street, and tiny porters and pack horses for scale',
  },
  {
    id: 'odessa',
    tiedosto: 'tuot-odessa.png',
    nimi: 'ODESSA',
    vuosi: '1873',
    sommittelu: 'Odessa in 1873 as a beautiful miniature world: the great '
      + 'flight of the Potemkin Stairs dropping from the boulevard to the port '
      + 'as the dominant central feature, surrounded by the statue of the Duc '
      + 'de Richelieu at their head, the colonnaded palaces along the seaside '
      + 'boulevard, the burnt-out shell of the old city theatre that had gone '
      + 'up in flames that January, grain ships and lighters crowding the '
      + 'harbour below, and tiny stevedores and carters for scale',
  },
  {
    id: 'dubai',
    tiedosto: 'tuot-dubai.png',
    nimi: 'DUBAI',
    vuosi: '1873',
    sommittelu: 'Dubai in 1873 as a beautiful miniature world: the square '
      + 'coral-stone walls and round watchtower of Al Fahidi Fort as the '
      + 'dominant central feature, surrounded by the tidal creek with pearling '
      + 'dhows and little rowed abra ferries, clusters of palm-frond barasti '
      + 'houses on both banks, the covered lanes of the Deira souk, lookout '
      + 'towers on the desert edge, camels at the landing place, and tiny pearl '
      + 'divers and merchants for scale — a small pearling village, no tall '
      + 'buildings of any kind',
  },
  {
    id: 'petra',
    tiedosto: 'tuot-petra.png',
    nimi: 'PETRA',
    vuosi: '1873',
    sommittelu: 'Petra in 1873 as a beautiful miniature world: the rose-'
      + 'coloured facade of Al-Khazneh cut into the cliff as the dominant '
      + 'central feature, surrounded by the narrow gorge of the Siq opening in '
      + 'front of it, the tiers of the Royal Tombs along the eastern wall, the '
      + 'ruined Roman theatre and colonnaded street, oleanders in the dry wadi, '
      + 'and a Bedouin camp of black tents with camels for scale',
  },
  {
    id: 'medina',
    tiedosto: 'tuot-medina.png',
    nimi: 'MEDINA',
    vuosi: '1873',
    sommittelu: 'Medina in 1873 as a beautiful miniature world: the Prophet’s '
      + 'Mosque, rebuilt in stone only twelve years earlier, with its Green '
      + 'Dome and slender Ottoman minarets, as the dominant central feature, '
      + 'surrounded by the crenellated city wall and its gates, the flat-roofed '
      + 'houses of the walled town, the fort on its rise, dense date palm '
      + 'groves and wells outside the walls, and a distant pilgrim caravan for '
      + 'scale — a reverent, architectural treatment, no crowds pressed close '
      + 'to the mosque',
  },
  {
    id: 'mekka',
    tiedosto: 'tuot-mekka.png',
    nimi: 'MECCA',
    vuosi: '1873',
    sommittelu: 'Mecca in 1873 as a beautiful miniature world: the Sacred '
      + 'Mosque, its Ottoman stone arcades and seven minarets enclosing the '
      + 'wide courtyard, as the dominant central feature, surrounded by the '
      + 'flat-roofed stone houses climbing the narrow valley, the bare hills '
      + 'rising on either side, cisterns and the caravan road leading out of '
      + 'the town, and a distant pilgrim caravan for scale — a reverent, '
      + 'architectural treatment drawn calmly and at a respectful distance',
  },
  {
    id: 'kapadokia',
    tiedosto: 'tuot-kapadokia.png',
    nimi: 'CAPPADOCIA',
    vuosi: '1873',
    sommittelu: 'Cappadocia in 1873 as a beautiful miniature world: a great '
      + 'cluster of cone-shaped fairy chimneys with doors and windows cut into '
      + 'them as the dominant central feature, surrounded by the rock-cut '
      + 'chapels of the Göreme valley, the honeycombed castle rock of Uçhisar, '
      + 'terraced vineyards and pigeon houses carved in the soft tuff, a '
      + 'village of flat-roofed stone houses below, and tiny ox carts, donkeys '
      + 'and villagers for scale',
  },
  {
    id: 'persepolis',
    tiedosto: 'tuot-persepolis.png',
    nimi: 'PERSEPOLIS',
    vuosi: '1873',
    sommittelu: 'Persepolis in 1873 as a beautiful miniature world: the '
      + 'surviving columns of the Apadana standing on the great stone terrace '
      + 'as the dominant central feature, surrounded by the Gate of All Nations '
      + 'with its winged bulls, the double stairway carved with processions of '
      + 'tribute bearers, drifted sand and fallen capitals across the platform, '
      + 'the rock tombs of Naqsh-e Rustam in the cliff beyond, and a '
      + 'traveller’s camp with horses and tents for scale',
  },
  {
    id: 'jerusalem',
    tiedosto: 'tuot-jerusalem.png',
    nimi: 'JERUSALEM',
    vuosi: '1873',
    sommittelu: 'Jerusalem in 1873 as a beautiful miniature world: the golden '
      + 'Dome of the Rock on its wide paved platform as the dominant central '
      + 'feature, surrounded by the Ottoman city walls and the Damascus Gate, '
      + 'the grey domes of the Church of the Holy Sepulchre, the citadel called '
      + 'the Tower of David, olive trees and churches on the Mount of Olives '
      + 'across the valley, the first stone houses appearing outside the walls, '
      + 'and tiny pilgrims and pack donkeys for scale',
  },
  {
    id: 'siinai',
    tiedosto: 'tuot-siinai.png',
    nimi: 'SINAI',
    vuosi: '1859',
    sommittelu: 'Sinai in 1859 as a beautiful miniature world: the walled '
      + 'monastery of Saint Catherine in its narrow valley as the dominant '
      + 'central feature, surrounded by the granite peak of Jebel Musa rising '
      + 'straight behind it, the monks’ rope basket hoist on the high wall, the '
      + 'cypress and olive garden inside, bare red mountains and dry wadis in '
      + 'every direction, and a Bedouin camel caravan on the track for scale',
  },
  {
    id: 'rubalkhali',
    tiedosto: 'tuot-rubalkhali.png',
    nimi: 'RUB AL-KHALI',
    vuosi: '1873',
    sommittelu: 'The Rub al-Khali in 1873 as a beautiful miniature world: an '
      + 'immense crescent dune ridge running across the whole scene as the '
      + 'dominant central feature, surrounded by ranks of lesser dunes fading '
      + 'to the horizon, a shallow salt flat between them, a stone-lined well '
      + 'with a leather bucket, black Bedouin tents pitched in the lee of the '
      + 'sand, a herd of white oryx, and a small camel caravan strung out along '
      + 'the ridge for scale',
  },
  {
    id: 'tromssa',
    tiedosto: 'tuot-tromssa.png',
    nimi: 'TROMSØ',
    vuosi: '1873',
    sommittelu: 'Tromsø in 1873 as a beautiful miniature world: the tall wooden '
      + 'Gothic cathedral among painted timber houses as the dominant central '
      + 'feature, surrounded by the sound with sealing sloops and Arctic '
      + 'hunting schooners at anchor, cod drying on wooden racks along the '
      + 'shore, the new museum building on the island, the snow-covered peak '
      + 'across the water, a Sámi turf hut and reindeer on the mainland side, '
      + 'and tiny fishermen for scale',
  },
  {
    id: 'islanti',
    tiedosto: 'tuot-islanti.png',
    nimi: 'ICELAND',
    vuosi: '1874',
    sommittelu: 'Iceland in 1874 as a beautiful miniature world: the rift wall '
      + 'of Almannagjá at Þingvellir with the old assembly plain below it as '
      + 'the dominant central feature, surrounded by the millennium festival '
      + 'tents pitched on the grass, the erupting column of the Great Geysir in '
      + 'the distance, the snow cone of Hekla on the horizon, turf farmhouses '
      + 'with grass roofs and a small wooden church, the lake and river below '
      + 'the rift, and tiny riders on Icelandic horses for scale',
  },
  {
    id: 'lappi',
    tiedosto: 'tuot-lappi.png',
    nimi: 'LAPLAND',
    vuosi: '1873',
    sommittelu: 'Lapland in 1873 as a beautiful miniature world: a broad river '
      + 'running between rounded bare fells as the dominant central feature, '
      + 'surrounded by gold panners working the gravel bars with cradles and '
      + 'sluice boxes, a log cabin serving as the claim station, a Sámi camp of '
      + 'turf huts and pointed lavvu tents with a reindeer herd, dark spruce '
      + 'forest and marshes below the tree line, the low midnight sun, and tiny '
      + 'boatmen poling upriver for scale',
  },
  {
    id: 'kreeta',
    tiedosto: 'tuot-kreeta.png',
    nimi: 'CRETE',
    vuosi: '1878',
    sommittelu: 'Crete in 1878 as a beautiful miniature world: the Venetian '
      + 'harbour of Chania with its stone lighthouse and curving mole as the '
      + 'dominant central feature, surrounded by the Firkas bastion and the '
      + 'vaulted arsenals, minarets rising over Venetian houses in the old '
      + 'town, the snow-topped White Mountains behind, terraced olive groves '
      + 'and stone windmills on the slopes, caiques and a steamer in the roads, '
      + 'and tiny fishermen and mule trains for scale',
  },
  {
    id: 'sisilia',
    tiedosto: 'tuot-sisilia.png',
    nimi: 'SICILY',
    vuosi: '1860',
    sommittelu: 'Sicily in 1860 as a beautiful miniature world: the smoking '
      + 'cone of Mount Etna above the coast as the dominant central feature, '
      + 'surrounded by the ancient Greek theatre of Taormina on its terrace, '
      + 'the harbour of Palermo under Monte Pellegrino, two steamers landing '
      + 'red-shirted volunteers at Marsala, the ruined Doric temples of '
      + 'Agrigento on their ridge, tuna boats and sulphur carts, and tiny '
      + 'painted donkey carts for scale',
  },
  {
    id: 'alpit',
    tiedosto: 'tuot-alpit.png',
    nimi: 'THE ALPS',
    vuosi: '1865',
    sommittelu: 'The Alps in 1865 as a beautiful miniature world: the pyramid '
      + 'of the Matterhorn, climbed for the first time that July, as the '
      + 'dominant central feature, surrounded by the crevassed glacier flowing '
      + 'from its foot, the village of Zermatt with dark timber granaries '
      + 'standing on stone mushroom piles, a roped party of climbers with '
      + 'alpenstocks on the ridge, hay meadows and belled cattle, a mule track '
      + 'winding up the valley, and tiny guides and porters for scale',
  },
  {
    id: 'dubrovnik',
    tiedosto: 'tuot-dubrovnik.png',
    nimi: 'RAGUSA',
    vuosi: '1873',
    sommittelu: 'Ragusa in 1873 as a beautiful miniature world: the unbroken '
      + 'ring of city walls with the round Minčeta tower as the dominant '
      + 'central feature, surrounded by the polished limestone main street '
      + 'cutting through the town, the Rector’s Palace and the monastery bell '
      + 'tower, Fort Lovrijenac on its rock across the water, the old harbour '
      + 'with sailing barques and drying nets, the bare hump of the mountain '
      + 'behind, and tiny promenaders for scale',
  },
  {
    id: 'riika',
    tiedosto: 'tuot-riika.png',
    nimi: 'RIGA',
    vuosi: '1873',
    sommittelu: 'Riga in 1873 as a beautiful miniature world: the tall tiered '
      + 'spire of St Peter’s Church over the medieval roofs as the dominant '
      + 'central feature, surrounded by the stepped gable of the House of the '
      + 'Blackheads and the town hall square, the castle by the water, the wide '
      + 'Daugava crossed by a floating pontoon bridge, rafts of timber and '
      + 'river barges coming downstream, the new boulevards and canal where the '
      + 'ramparts had stood, a choir in white gathering for the first song '
      + 'festival, and tiny carters for scale',
  },
  {
    id: 'vilna',
    tiedosto: 'tuot-vilna.png',
    nimi: 'VILNIUS',
    vuosi: '1873',
    sommittelu: 'Vilnius in 1873 as a beautiful miniature world: the white '
      + 'classical cathedral with its free-standing belfry below the castle '
      + 'hill as the dominant central feature, surrounded by the brick tower of '
      + 'Gediminas on the mound above, the flamboyant Gothic front of St Anne’s '
      + 'Church, the chapel over the Gate of Dawn at the end of a narrow '
      + 'street, baroque domes and towers among tiled roofs, the river with its '
      + 'wooden bridge, and tiny carts, students and a book pedlar with a sack '
      + 'for scale',
  },
  {
    id: 'oslo',
    tiedosto: 'tuot-oslo.png',
    nimi: 'CHRISTIANIA',
    vuosi: '1873',
    sommittelu: 'Christiania in 1873 as a beautiful miniature world: the '
      + 'columned Royal Palace at the head of the main street as the dominant '
      + 'central feature, surrounded by the new brick parliament house at the '
      + 'other end of it, the stone bastions of Akershus fortress above the '
      + 'harbour, the classical university buildings and their trees, sailing '
      + 'ships and small steamers in the fjord, wooded hills closing the view, '
      + 'and tiny sleighs and strollers for scale',
  },
  {
    id: 'firenze',
    tiedosto: 'tuot-firenze.png',
    nimi: 'FLORENCE',
    vuosi: '1887',
    sommittelu: 'Florence in 1887 as a beautiful miniature world: Brunelleschi’s '
      + 'dome above the cathedral, its patterned marble front finished at last '
      + 'that year, as the dominant central feature, surrounded by Giotto’s '
      + 'campanile beside it, the tower of the Palazzo Vecchio, the shop-lined '
      + 'Ponte Vecchio over the Arno, the terrace of the Piazzale Michelangelo '
      + 'on the far bank, cypress hills behind, and tiny carriages and '
      + 'washerwomen at the river for scale',
  },
  {
    id: 'kobenhavn',
    tiedosto: 'tuot-kobenhavn.png',
    nimi: 'COPENHAGEN',
    vuosi: '1873',
    sommittelu: 'Copenhagen in 1873 as a beautiful miniature world: the twisted '
      + 'dragon-tail spire of the old stock exchange as the dominant central '
      + 'feature, surrounded by the long roofs of the Christiansborg Palace, '
      + 'the round brick observatory tower, the gabled houses and moored '
      + 'schooners of Nyhavn, the lamps and pavilions of the Tivoli gardens, '
      + 'ferries and sailing ships in the harbour, and tiny dock workers and '
      + 'promenading families for scale',
  },
  {
    id: 'doha',
    tiedosto: 'tuot-doha.png',
    nimi: 'DOHA',
    vuosi: '1873',
    sommittelu: 'Doha in 1873 as a beautiful miniature world: the square '
      + 'mud-brick fort held by a small Ottoman garrison as the dominant '
      + 'central feature, surrounded by a low town of a thousand flat-roofed '
      + 'coral-stone and palm-frond houses strung along the shallow bay, a '
      + 'pearling fleet of dhows at anchor, drying nets and stone fish traps on '
      + 'the tidal flats, date palms and a well, camels at the shore, and tiny '
      + 'pearl divers for scale — a small pearling town, no tall buildings of '
      + 'any kind',
  },
  {
    id: 'nikosia',
    tiedosto: 'tuot-nikosia.png',
    nimi: 'NICOSIA',
    vuosi: '1878',
    sommittelu: 'Nicosia in 1878 as a beautiful miniature world: the '
      + 'star-shaped Venetian ramparts enclosing the whole town as the dominant '
      + 'central feature, surrounded by the Gothic cathedral of St Sophia '
      + 'serving as a mosque with two minarets raised on its towers, the '
      + 'arcaded courtyard of the Büyük Han caravanserai, the Famagusta Gate in '
      + 'the wall, flat-roofed houses and palm trees inside, the dry plain and '
      + 'the northern mountain range beyond, a small British detachment newly '
      + 'arrived at the gate, and tiny ox carts for scale',
  },
  {
    id: 'kuwait',
    tiedosto: 'tuot-kuwait.png',
    nimi: 'KUWAIT',
    vuosi: '1873',
    sommittelu: 'Kuwait in 1873 as a beautiful miniature world: a great wooden '
      + 'ocean-going dhow under construction on the open beach, its ribs still '
      + 'bare, as the dominant central feature, surrounded by the low mud-brick '
      + 'town along the bay, the ruler’s house and a mosque among the flat '
      + 'roofs, pearling and trading dhows riding at anchor, stacks of imported '
      + 'Indian timber, water carriers with donkeys, a camel caravan setting '
      + 'out inland, and tiny shipwrights for scale — no tall buildings of any '
      + 'kind',
  },
  {
    id: 'masqat',
    tiedosto: 'tuot-masqat.png',
    nimi: 'MUSCAT',
    vuosi: '1873',
    sommittelu: 'Muscat in 1873 as a beautiful miniature world: the two '
      + 'Portuguese-built forts facing each other on black rock headlands at '
      + 'the mouth of the cove as the dominant central feature, surrounded by '
      + 'the sultan’s white palace at the head of the water, the walled town '
      + 'and its gates, ships’ names painted on the bare cliffs by visiting '
      + 'sailors, dhows and a steam sloop at anchor, jagged sun-baked mountains '
      + 'behind, and tiny boatmen and porters for scale',
  },
  {
    id: 'bagdad',
    tiedosto: 'tuot-bagdad.png',
    nimi: 'BAGHDAD',
    vuosi: '1873',
    sommittelu: 'Baghdad in 1873 as a beautiful miniature world: the wide '
      + 'Tigris crossed by a bridge of moored boats as the dominant central '
      + 'feature, surrounded by riverside houses with projecting latticed '
      + 'balconies, the leaning minaret and tiled portal of the old '
      + 'Mustansiriya college, the golden domes of the shrine upstream, round '
      + 'basket boats ferrying goods across the current, date palm gardens '
      + 'along both banks, and tiny porters and pack mules for scale',
  },
  {
    id: 'izmir',
    tiedosto: 'tuot-izmir.png',
    nimi: 'SMYRNA',
    vuosi: '1873',
    sommittelu: 'Smyrna in 1873 as a beautiful miniature world: the walled '
      + 'fortress on the hill above the town as the dominant central feature, '
      + 'surrounded by the deep gulf crowded with steamers, caiques and '
      + 'square-rigged ships, the new stone quay along the waterfront, the '
      + 'roofed lanes of the bazaar and the old caravan bridge, the railway '
      + 'terminus with its sheds at the shore, camel caravans bringing figs and '
      + 'raisins down to the port, and tiny porters for scale',
  },
];
