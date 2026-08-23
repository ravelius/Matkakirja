/*
 * JULISTETYÖLISTA, OSA 2/2 — 48 kohdetta (Lähi-itä, Siperia, Aasia).
 *
 * Kuparipiirrosjulisteiden sommittelut tuotantosarjaa varten. Juliste on
 * pystymuotoinen 1800-luvun kaiverrus, jossa lukee VAIN kohteen nimi
 * englanniksi isoin kaiverruskirjaimin ja sen alla pieni vuosiluku — ei
 * mainostekstiä, ei maan nimeä, ei käännöksiä (ks. js/packs/julisteet.js).
 *
 * `nimi` on se, mikä julisteeseen painetaan: aikakauden englanninkielinen
 * muoto silloin, kun 1800-luvun atlas olisi käyttänyt sitä ja nykylukija
 * yhä tunnistaa kohteen (ANGORA, CANTON, RANGOON, BATAVIA, BENARES,
 * CALCUTTA, BOMBAY, MADRAS, URGA, AKMOLINSK, KURRACHEE, ISPAHAN, TEHERAN,
 * KATMANDU, TAIPEH, NOVO-NIKOLAEVSK). Muualla on käytetty nykyistä
 * vakiintunutta latinalaista asua, koska arkaainen muoto (esim.
 * "Saghalien", "Tauris") olisi lukijalle tunnistamaton.
 *
 * `vuosi` on julisteeseen painettu vuosi. Oletus on 1873 = isoisän oma
 * matkavuosi; muu vuosi on valittu vain, kun kohteelle on aidosti
 * merkityksellinen tapahtuma tai kun 1873 ei olisi ollut totta (Magadania
 * ja Novosibirskia ei silloin ollut olemassa). Sommittelun kohteet on
 * tarkistettu niin, että ne OLIVAT PYSTYSSÄ valittuna vuonna: siksi esim.
 * Riadin Masmak on rakennustyömaa (1865–1895), Teheranissa on vanha
 * linnoitusmuuri (uusi muuri vasta 1878), Hanoin Kilpikonnatornia (1886)
 * ei ole, Bombayn Victoria Terminus on omalla julisteellaan vasta 1888.
 *
 * `selite` on YKSI suomenkielinen virke ja kertoo KOHTEESTA — ei kuvasta
 * (Raamatun kuvatekstilinjaus). Faktat tarkistettu en-Wikipediasta
 * 22.8.2026.
 *
 * Tämä on työlista kuvien generointia varten. Pelidatan (js/packs/
 * julisteet.js) päivittää lehtitoimitus erikseen samoista kentistä.
 */
export const TYOLISTA = [
  {
    id: 'ankara',
    tiedosto: 'tuot-ankara.png',
    nimi: 'ANGORA',
    vuosi: '1892',
    sommittelu: 'Angora in 1892 as a beautiful miniature world: the ancient '
      + 'citadel of Ankara Castle on its rock, ringed by Roman and Byzantine '
      + 'walls, as the dominant central feature, surrounded by the Haci Bayram '
      + 'mosque beside the ruined Temple of Augustus, tiers of Ottoman '
      + 'timber-framed houses spilling down the slope, the new stone railway '
      + 'terminus of the Anatolian Railway with a wood-burning locomotive and '
      + 'telegraph poles, a caravan loading bales of mohair, and long-haired '
      + 'Angora goats grazing; the treeless steppe plain and the Ankara stream '
      + 'as the geographical anchor, with tiny period figures, ox carts and '
      + 'camels for scale.',
    kaupunki: 'Ankara',
    otsikko: 'Angora 1892',
    selite: 'Anatolian rautatie Konstantinopolista saapui Angoraan 31. '
      + 'joulukuuta 1892, ja mohairvillastaan tunnettu arokaupunki sai '
      + 'ensimmäisen rautatieasemansa.',
  },
  {
    id: 'halab',
    tiedosto: 'tuot-halab.png',
    nimi: 'ALEPPO',
    vuosi: '1873',
    sommittelu: 'Aleppo in 1873 as a beautiful miniature world: the great '
      + 'stone citadel on its steep artificial mound, with its bridged gate '
      + 'ramp, as the dominant central feature, surrounded by the square '
      + 'minaret of the Great Mosque, the vaulted roofs of the covered souks, '
      + 'the courtyards of merchant khans with camel trains being unloaded, '
      + 'flat-roofed limestone houses and domed hammams, and the city gates in '
      + 'the old wall; the dry limestone plain and the thin Quweiq river as '
      + 'the geographical anchor, with tiny period figures, donkeys and '
      + 'loaded camels for scale.',
    kaupunki: 'Aleppo',
    otsikko: 'Aleppo 1873',
    selite: 'Isoisän matkavuonna Aleppo oli vuonna 1866 perustetun Halepin '
      + 'vilajetin pääkaupunki, mutta sen vuosisatainen karavaanikauppa oli '
      + 'kääntynyt laskuun heti Suezin kanavan avauduttua 1869.',
  },
  {
    id: 'damaskos',
    tiedosto: 'tuot-damaskos.png',
    nimi: 'DAMASCUS',
    vuosi: '1873',
    sommittelu: 'Damascus in 1873 as a beautiful miniature world: the Umayyad '
      + 'Mosque with its lead-domed prayer hall and three minarets as the '
      + 'dominant central feature, surrounded by the roofed bazaar lanes, the '
      + 'courtyard palaces of the old city with their fountains and citrus '
      + 'trees, the medieval citadel and the city gates, the colonnaded line '
      + 'of the Street Called Straight, and a pilgrim caravan forming up for '
      + 'Mecca; the Barada river, the green orchard belt of the Ghouta and '
      + 'the bare flank of Mount Qasioun as the geographical anchor, with '
      + 'tiny period figures, mules and camels for scale.',
    kaupunki: 'Damaskos',
    otsikko: 'Damaskos 1873',
    selite: 'Isoisän matkavuonna Damaskos oli osmanien Syyrian vilajetin '
      + 'pääkaupunki ja Mekan-pyhiinvaelluskaravaanin perinteinen '
      + 'lähtöpaikka; sen Umaijadien moskeija oli valmistunut jo vuonna 715.',
  },
  {
    id: 'luxor',
    tiedosto: 'tuot-luxor.png',
    nimi: 'LUXOR',
    vuosi: '1881',
    sommittelu: 'Luxor in 1881 as a beautiful miniature world: the pylon of '
      + 'Luxor Temple with its single standing obelisk and the small mosque of '
      + 'Abu Haggag perched on the buried courtyard as the dominant central '
      + 'feature, surrounded by the avenue of sphinxes, the colossal columns '
      + 'and pylons of Karnak among palm groves, mud-brick village houses and '
      + 'dovecotes, the seated Colossi of Memnon on the west bank, and the '
      + 'terraced cliffs of Deir el-Bahari with a donkey track climbing to the '
      + 'Valley of the Kings; the Nile with dahabiyeh sailing boats and a '
      + 'paddle steamer as the geographical anchor, with tiny period figures '
      + 'and laden donkeys for scale.',
    kaupunki: 'Luxor',
    otsikko: 'Luxor 1881',
    selite: 'Vuonna 1881 Deir el-Bahrin kalliokätkö tuli viranomaisten '
      + 'tietoon: paikalliset olivat löytäneet jo aiemmin haudan, johon '
      + 'muinaiset papit olivat piilottaneet kymmenien faaraoiden muumiot, ja '
      + 'ne siirrettiin samana vuonna Kairoon.',
  },
  {
    id: 'riad',
    tiedosto: 'tuot-riad.png',
    nimi: 'RIYADH',
    vuosi: '1873',
    sommittelu: 'Riyadh in 1873 as a beautiful miniature world: the '
      + 'mud-brick ruling palace and the plain great mosque beside the market '
      + 'square as the dominant central feature, surrounded by the thick clay '
      + 'town wall with its round watchtowers and gates, flat-roofed '
      + 'crenellated houses with triangular window openings, the half-built '
      + 'walls of the Masmak fort still under construction, wells and mud '
      + 'irrigation channels, and camel caravans camped outside the gate; the '
      + 'date-palm groves of Wadi Hanifa and the pale Tuwaiq escarpment as '
      + 'the geographical anchor, with tiny period figures, camels and goats '
      + 'for scale.',
    kaupunki: 'Riad',
    otsikko: 'Riad 1873',
    selite: 'Isoisän matkavuonna Riad oli savitiilimuurien ympäröimä Nejdin '
      + 'emiraatin pääkaupunki, jota Faisalin poikien valtataistelu repi — '
      + 'Masmakin linnoitusta oli muurattu vuodesta 1865, ja se valmistui '
      + 'vasta 1895.',
  },
  {
    id: 'tabriz',
    tiedosto: 'tuot-tabriz.png',
    nimi: 'TABRIZ',
    vuosi: '1873',
    sommittelu: 'Tabriz in 1873 as a beautiful miniature world: the huge '
      + 'blank brick mass of the Arg citadel as the dominant central feature, '
      + 'surrounded by the endless brick domes and vaults of the covered '
      + 'bazaar, caravanserai courtyards stacked with carpet bales, the '
      + 'tile-stripped ruin of the Blue Mosque, the Qajar governor’s '
      + 'garden palace, and mud-walled quarters with wind-blown poplars; the '
      + 'Aji river bridges and the snowy cone of Mount Sahand as the '
      + 'geographical anchor, with tiny period figures, mules and camel trains '
      + 'for scale.',
    kaupunki: 'Tabriz',
    otsikko: 'Tabriz 1873',
    selite: 'Isoisän matkavuonna Tabriz oli Persian kruununprinssin '
      + 'asuinkaupunki ja maan tärkein kauppapaikka, jonka katetun basaarin '
      + 'kautta kulki idän ja Mustanmeren välinen tavaravirta.',
  },
  {
    id: 'teheran',
    tiedosto: 'tuot-teheran.png',
    nimi: 'TEHERAN',
    vuosi: '1873',
    sommittelu: 'Teheran in 1873 as a beautiful miniature world: the Golestan '
      + 'Palace with the tall twin-towered Shams-ol-Emareh edifice rising '
      + 'above its garden as the dominant central feature, surrounded by the '
      + 'old walled citadel quarter, the roofed bazaar and its caravanserais, '
      + 'the Dar al-Fonun college, tiled gateways of the old town wall, and '
      + 'plane-shaded avenues with water channels; the Alborz range and the '
      + 'white cone of Damavand on the horizon as the geographical anchor, '
      + 'with tiny period figures, horsemen and mule trains for scale.',
    kaupunki: 'Teheran',
    otsikko: 'Teheran 1873',
    selite: 'Naser al-Din Shah matkusti vuonna 1873 ensimmäisenä Persian '
      + 'hallitsijana Eurooppaan ja palasi Teheraniin täynnä ajatuksia '
      + 'näkemästään tekniikasta.',
  },
  {
    id: 'isfahan',
    tiedosto: 'tuot-isfahan.png',
    nimi: 'ISPAHAN',
    vuosi: '1873',
    sommittelu: 'Ispahan in 1873 as a beautiful miniature world: the vast '
      + 'rectangle of the Naqsh-e Jahan square with the tiled dome and twin '
      + 'minarets of the Shah Mosque as the dominant central feature, '
      + 'surrounded by the balconied Ali Qapu pavilion, the smaller dome of '
      + 'the Sheikh Lotfollah mosque, the great portal of the bazaar, the '
      + 'garden pavilion of Chehel Sotoun with its reflecting pool, and the '
      + 'Armenian quarter of New Julfa across the water; the Zayanderud river '
      + 'with the long arcaded bridges of Si-o-se-pol and Khaju as the '
      + 'geographical anchor, with tiny period figures, horses and pigeon '
      + 'towers in the fields for scale.',
    kaupunki: 'Isfahan',
    otsikko: 'Isfahan 1873',
    selite: 'Isoisän matkavuonna Isfahanissa asui enää noin 60 000 ihmistä '
      + 'safavidien loiston jäänteissä: Persian pääkaupunki oli siirretty '
      + 'Teheraniin jo vuonna 1775.',
  },
  {
    id: 'sana',
    tiedosto: 'tuot-sana.png',
    nimi: 'SANA',
    vuosi: '1873',
    sommittelu: 'Sana in 1873 as a beautiful miniature world: the packed '
      + 'tower houses of the old city, six storeys of brown brick with white '
      + 'gypsum tracery and fanlight windows, as the dominant central feature, '
      + 'surrounded by the minarets of the Great Mosque, the arched Bab '
      + 'al-Yemen gate in the mud city wall, the roofed lanes of the salt '
      + 'market, green walled garden plots wedged between the quarters, and a '
      + 'newly arrived Ottoman garrison post; the highland basin and the bare '
      + 'ridge of Jabal Nuqum as the geographical anchor, with tiny period '
      + 'figures, donkeys and camels for scale.',
    kaupunki: 'Sanaa',
    otsikko: 'Sanaa 1873',
    selite: 'Osmanit valtasivat Sanaan vasta 1872 Ahmed Muhtar Pashan '
      + 'johdolla, joten isoisän matkavuonna kaupunki oli juuri tullut '
      + 'osmanien Jemenin hallintokaupungiksi.',
  },
  {
    id: 'aden',
    tiedosto: 'tuot-aden.png',
    nimi: 'ADEN',
    vuosi: '1873',
    sommittelu: 'Aden in 1873 as a beautiful miniature world: the jagged ring '
      + 'of the extinct volcano crater with the old town packed inside it as '
      + 'the dominant central feature, surrounded by the coaling wharves and '
      + 'jetties of Steamer Point with black coal barges and P&O steamships, '
      + 'the terraced stone catchment tanks of the Tawila cisterns in their '
      + 'ravine, the small fort on Sira island, British barracks and a '
      + 'signal mast on the ridge, and dhows drawn up on the beach; the '
      + 'treeless volcanic peaks and the open sea as the geographical anchor, '
      + 'with tiny period figures, camels and coal-heavers for scale.',
    kaupunki: 'Aden',
    otsikko: 'Aden 1873',
    selite: 'Suezin kanavan avaaminen 1869 teki vuodesta 1839 brittihallussa '
      + 'olleesta Adenista Intian-reitin tärkeimmän hiilenottosataman.',
  },
  {
    id: 'salalah',
    tiedosto: 'tuot-salalah.png',
    nimi: 'SALALAH',
    vuosi: '1873',
    sommittelu: 'Salalah in 1873 as a beautiful miniature world: the '
      + 'weathered stone ruins of the old harbour city of Al Balid beside its '
      + 'lagoon as the dominant central feature, surrounded by a walled '
      + 'mud-brick town with a governor’s fort, coconut and date groves '
      + 'along the shore, frankincense trees with resin bleeding from cut '
      + 'bark, camel trains carrying incense sacks inland, and dhows drawn up '
      + 'on the beach; the monsoon-green Dhofar mountains rising behind the '
      + 'coastal plain and the Arabian Sea as the geographical anchor, with '
      + 'tiny period figures, camels and cattle for scale.',
    kaupunki: 'Salalah',
    otsikko: 'Salalah 1873',
    selite: 'Salalah oli Dhofarin perinteinen pääkaupunki, jonka '
      + 'suitsukekauppa oli kukoistanut 1200-luvulla; 1800-luvulla alue '
      + 'liitettiin Maskatin sulttaanikuntaan.',
  },
  {
    id: 'mosul',
    tiedosto: 'tuot-mosul.png',
    nimi: 'MOSUL',
    vuosi: '1873',
    sommittelu: 'Mosul in 1873 as a beautiful miniature world: the leaning '
      + 'brick minaret al-Hadba of the Great Mosque of al-Nuri as the dominant '
      + 'central feature, surrounded by flat-roofed marble-veined stone houses '
      + 'with shaded courtyards, the covered bazaar, the Dominican mission '
      + 'church, the pontoon bridge of boats across the river, inflated-skin '
      + 'kelek rafts drifting downstream, and the low mounds of Nineveh '
      + 'opposite with an excavation trench and spoil heaps at Kuyunjik; the '
      + 'Tigris and the flat Mesopotamian plain as the geographical anchor, '
      + 'with tiny period figures, donkeys and diggers for scale.',
    kaupunki: 'Mosul',
    otsikko: 'Mosul 1873',
    selite: 'George Smith kaivoi vuonna 1873 Mosulin vastarannalla '
      + 'Ninevehin Kuyunjik-kummussa ja löysi savitaulun palasia, jotka '
      + 'täydensivät Gilgameš-eepoksen vedenpaisumuskertomusta.',
  },
  {
    id: 'soul',
    tiedosto: 'tuot-soul.png',
    nimi: 'SEOUL',
    vuosi: '1873',
    sommittelu: 'Seoul in 1873 as a beautiful miniature world: the '
      + 'two-storey gate tower of Namdaemun rising over its arched stone '
      + 'gateway as the dominant central feature, surrounded by the city wall '
      + 'snaking over the ridges, the newly rebuilt Gyeongbokgung palace with '
      + 'its tiled roofs and Gwanghwamun gate, the bell pavilion at the '
      + 'crossroads of Jongno, tile-roofed and thatched houses packed along '
      + 'narrow lanes, and the stone bridges of the Cheonggyecheon stream; the '
      + 'granite peaks of Bugaksan and the wooded hump of Namsan as the '
      + 'geographical anchor, with tiny period figures in white robes, ox '
      + 'carts and A-frame porters for scale.',
    kaupunki: 'Soul',
    otsikko: 'Soul 1873',
    selite: 'Kuningas Kojong ilmoitti vuonna 1873 ottavansa vallan omiin '
      + 'käsiinsä isänsä Taewongunin holhouskauden jälkeen, ja hänen '
      + 'esi-isiensä Kyongbokin palatsi oli juuri muurattu uudelleen.',
  },
  {
    id: 'shanghai',
    tiedosto: 'tuot-shanghai.png',
    nimi: 'SHANGHAI',
    vuosi: '1876',
    sommittelu: 'Shanghai in 1876 as a beautiful miniature world: the '
      + 'colonnaded merchant houses and the gothic clock tower of the customs '
      + 'house along the Bund as the dominant central feature, surrounded by '
      + 'the round walled Chinese city with the City God Temple and the '
      + 'zigzag bridge of the Yu Garden, the tiny narrow-gauge Woosung '
      + 'railway with its toy-sized locomotive running north out of the '
      + 'settlement, tea godowns and flagstaffs, and a forest of masts of '
      + 'clippers and paddle steamers; the Huangpu river crowded with sampans '
      + 'and junks as the geographical anchor, with tiny period figures, '
      + 'wheelbarrows and sedan chairs for scale.',
    kaupunki: 'Shanghai',
    otsikko: 'Shanghai 1876',
    selite: 'Kiinan ensimmäinen liikennöinyt rautatie rakennettiin 1876 '
      + 'Shanghaista Woosungiin ilman viranomaisten lupaa, ja se ehti kulkea '
      + 'alle vuoden ennen kuin varakuningas osti kiskot ja purki radan.',
  },
  {
    id: 'tripoli',
    tiedosto: 'tuot-tripoli.png',
    nimi: 'TRIPOLI',
    vuosi: '1873',
    sommittelu: 'Tripoli in 1873 as a beautiful miniature world: the massive '
      + 'walled Red Castle above the harbour as the dominant central feature, '
      + 'surrounded by the whitewashed flat-roofed medina and its covered '
      + 'markets, the Roman marble arch of Marcus Aurelius standing among the '
      + 'houses, the tiled minarets of the Ottoman-era mosques, the sea wall '
      + 'and mole with lateen-rigged coasters at anchor, and a Saharan caravan '
      + 'arriving through the desert gate with ostrich feathers and hides; the '
      + 'palm gardens of the oasis and the flat blue Mediterranean as the '
      + 'geographical anchor, with tiny period figures and camels for scale.',
    kaupunki: 'Tripoli',
    otsikko: 'Tripoli 1873',
    selite: 'Isoisän matkavuonna Tripoli oli osmanien Tripolitanian '
      + 'vilajetin pääkaupunki — suora hallinto oli palautettu 1835 — ja '
      + 'Saharan halki kulkevien karavaanien viimeinen Välimeren-satama.',
  },
  {
    id: 'jekaterinburg',
    tiedosto: 'tuot-jekaterinburg.png',
    nimi: 'EKATERINBURG',
    vuosi: '1873',
    sommittelu: 'Ekaterinburg in 1873 as a beautiful miniature world: the '
      + 'stone dam of the ironworks pond on the Iset with its water wheels and '
      + 'the mint and lapidary works beside it as the dominant central '
      + 'feature, surrounded by the classical bell tower of the Ascension '
      + 'church, the columned merchant mansions along the pond, smoking '
      + 'foundry sheds, gold-washing sluices and spoil heaps at the edge of '
      + 'town, and log houses with carved window frames; the pine-covered Ural '
      + 'ridges and the winding Iset river as the geographical anchor, with '
      + 'tiny period figures, sledges and horse teams for scale.',
    kaupunki: 'Jekaterinburg',
    otsikko: 'Jekaterinburg 1873',
    selite: 'Isoisän matkavuonna Jekaterinburgin rahapajassa lyötiin yhä '
      + 'valtaosa Venäjän keisarikunnan liikkeessä olleista kolikoista; paja '
      + 'suljettiin 1876.',
  },
  {
    id: 'novosibirsk',
    tiedosto: 'tuot-novosibirsk.png',
    nimi: 'NOVO-NIKOLAEVSK',
    vuosi: '1897',
    sommittelu: 'Novo-Nikolaevsk in 1897 as a beautiful miniature world: the '
      + 'long iron truss bridge of the Trans-Siberian Railway striding across '
      + 'the wide Ob on stone piers as the dominant central feature, '
      + 'surrounded by a raw new settlement of unpainted log houses and '
      + 'stacked timber, a small wooden station with a water tower and a '
      + 'wood-burning locomotive, a shingled chapel, construction barracks and '
      + 'derricks, and paddle steamers and log rafts on the river; the flat '
      + 'taiga of pine and birch reaching to the horizon as the geographical '
      + 'anchor, with tiny period figures, horse carts and surveyors for '
      + 'scale.',
    kaupunki: 'Novosibirsk',
    otsikko: 'Novonikolajevsk 1897',
    selite: 'Novosibirskia ei ollut isoisän matkavuonna olemassa: kylä syntyi '
      + '1893 Siperian radan Ob-sillan työmaalle, sai nimen Novonikolajevsk '
      + '1895, ja silta valmistui keväällä 1897.',
  },
  {
    id: 'irkutsk',
    tiedosto: 'tuot-irkutsk.png',
    nimi: 'IRKUTSK',
    vuosi: '1873',
    sommittelu: 'Irkutsk in 1873 as a beautiful miniature world: the '
      + 'many-domed baroque Epiphany Cathedral and the older Church of the '
      + 'Saviour beside it as the dominant central feature, surrounded by '
      + 'streets of log houses with deeply carved window frames, the '
      + 'governor-general’s residence, gold merchants’ stone '
      + 'mansions, sledges and carts loaded with chests of brick tea from the '
      + 'Kyakhta road, and a ferry crossing to the wooded far bank; the swift '
      + 'clear Angara river and the pine taiga hills as the geographical '
      + 'anchor, with tiny period figures, horse teams and dogs for scale.',
    kaupunki: 'Irkutsk',
    otsikko: 'Irkutsk 1873',
    selite: 'Isoisän matkavuonna Irkutsk oli Itä-Siperian kenraalikuvernöörin '
      + 'puinen pääkaupunki, joka rikastui Kiahtan teekaravaaneista — suuri '
      + 'osa siitä paloi heinäkuun 1879 tulipalossa.',
  },
  {
    id: 'jakutsk',
    tiedosto: 'tuot-jakutsk.png',
    nimi: 'YAKUTSK',
    vuosi: '1873',
    sommittelu: 'Yakutsk in 1873 as a beautiful miniature world: the squat '
      + 'square timber tower of the old cossack ostrog with its shingled roof '
      + 'as the dominant central feature, surrounded by the white bell tower '
      + 'of the Trinity cathedral, low log houses with sod roofs and slabs of '
      + 'river ice for window panes, storehouses of furs being weighed and '
      + 'baled, reindeer and shaggy Yakut horses in the snow, and barges tied '
      + 'up at the landing; the enormous slow Lena river and the flat larch '
      + 'taiga on permafrost as the geographical anchor, with tiny period '
      + 'figures, sledges and dogs for scale.',
    kaupunki: 'Jakutsk',
    otsikko: 'Jakutsk 1873',
    selite: 'Isoisän matkavuonna Jakutsk oli vuonna 1632 Lenan rannalle '
      + 'perustettu hirsikaupunki, joka oli kasvanut turkiskaupan ja '
      + 'Koillis-Siperian hallinnon keskukseksi keskelle ikiroutaa.',
  },
  {
    id: 'magadan',
    tiedosto: 'tuot-magadan.png',
    nimi: 'SEA OF OKHOTSK',
    vuosi: '1873',
    sommittelu: 'The Sea of Okhotsk shore in 1873 as a beautiful miniature '
      + 'world: the steep cliff-walled inlet of Nagayev Bay, empty of any '
      + 'town, as the dominant central feature, surrounded by an Even '
      + 'reindeer camp of conical hide tents on the shore terrace, racks of '
      + 'drying salmon, a small Russian trading post with a log chapel at the '
      + 'mouth of the Ola river, an American whaling bark hove to offshore '
      + 'with its boats out, and drift ice along the headlands; the larch '
      + 'taiga and the snow-streaked coastal ridges as the geographical '
      + 'anchor, with tiny period figures, reindeer and sled dogs for scale.',
    kaupunki: 'Magadan',
    otsikko: 'Ohotanmeren rannikko 1873',
    selite: 'Magadania ei ollut isoisän matkavuonna olemassa — kaupunki '
      + 'perustettiin Nagajevin lahden rannalle vasta 1929 — joten juliste '
      + 'kuvaa sitä Ohotanmeren rannikkoa, jolla evenit paimensivat poroja ja '
      + 'valaanpyytäjät purjehtivat.',
  },
  {
    id: 'kamtsatka',
    tiedosto: 'tuot-kamtsatka.png',
    nimi: 'KAMCHATKA',
    vuosi: '1873',
    sommittelu: 'Kamchatka in 1873 as a beautiful miniature world: the '
      + 'perfect snow cones of the Avachinsky and Koryaksky volcanoes '
      + 'smoking faintly as the dominant central feature, surrounded by the '
      + 'small log town of Petropavlovsk with its wooden church and abandoned '
      + 'shore battery on Avacha Bay, a Russian trading schooner at anchor, '
      + 'skin baidarka canoes and racks of drying salmon, dog sledges, and '
      + 'bears fishing in a spawning stream; the enclosed bay, birch scrub '
      + 'and stone-pine slopes as the geographical anchor, with tiny period '
      + 'figures and sled dogs for scale.',
    kaupunki: 'Kamtšatka',
    otsikko: 'Kamtšatka 1873',
    selite: 'Petropavlovsk torjui liittoutuneiden piirityksen 1854, mutta '
      + 'varuskunta evakuoitiin Amurille jo seuraavana keväänä, ja isoisän '
      + 'matkavuonna Kamtšatkan pääpaikka oli enää pieni satamakylä '
      + 'tulivuorten juurella.',
  },
  {
    id: 'sahalin',
    tiedosto: 'tuot-sahalin.png',
    nimi: 'SAKHALIN',
    vuosi: '1875',
    sommittelu: 'Sakhalin in 1875 as a beautiful miniature world: the coal '
      + 'cliffs and timber jetty of the Due mine on the Tatar Strait, with '
      + 'convicts hauling baskets to a waiting steamer, as the dominant '
      + 'central feature, surrounded by a stockaded prison settlement of log '
      + 'barracks and a guardhouse, an Ainu village of thatched huts with '
      + 'drying fish, a Nivkh dog sledge team, and a signal mast on the '
      + 'headland; the fog-wrapped larch and bamboo-grass taiga and the cold '
      + 'strait as the geographical anchor, with tiny period figures, dogs '
      + 'and a bear for scale.',
    kaupunki: 'Sahalin',
    otsikko: 'Sahalin 1875',
    selite: 'Pietarin sopimuksessa 1875 Japani luopui Sahalinista Venäjälle '
      + 'Kuriilien vastineeksi, ja koko saari jäi vuonna 1869 laillistetun '
      + 'rangaistussiirtolan käyttöön.',
  },
  {
    id: 'vladivostok',
    tiedosto: 'tuot-vladivostok.png',
    nimi: 'VLADIVOSTOK',
    vuosi: '1873',
    sommittelu: 'Vladivostok in 1873 as a beautiful miniature world: the '
      + 'sheltered Golden Horn bay with a Russian steam frigate and a clipper '
      + 'at anchor as the dominant central feature, surrounded by log barracks '
      + 'and naval storehouses along the shore, a small wooden church on the '
      + 'slope, Chinese and Korean shophouses of the market quarter, hillsides '
      + 'newly cleared and dotted with stumps, and a semaphore mast on the '
      + 'headland; the steep wooded hills of the Muraviev peninsula and the '
      + 'sea as the geographical anchor, with tiny period figures, sailors and '
      + 'ox carts for scale.',
    kaupunki: 'Vladivostok',
    otsikko: 'Vladivostok 1873',
    selite: 'Siperian laivueen päätukikohta siirrettiin Nikolajevskista '
      + 'Vladivostokiin 1871, mutta isoisän matkavuonna paikka oli yhä '
      + 'hirsinen varuskuntakylä — kaupunkioikeudet tulivat vasta 1880.',
  },
  {
    id: 'bangkok',
    tiedosto: 'tuot-bangkok.png',
    nimi: 'BANGKOK',
    vuosi: '1873',
    sommittelu: 'Bangkok in 1873 as a beautiful miniature world: the walled '
      + 'Grand Palace with the golden chedi and glittering tiered roofs of Wat '
      + 'Phra Kaew as the dominant central feature, surrounded by the tall '
      + 'porcelain-studded prang of Wat Arun on the far bank, gilded temple '
      + 'spires and monastery courtyards, floating teak houses moored along '
      + 'the banks, a floating market of paddled sampans heaped with fruit, '
      + 'and rice barges under sail; the wide brown Chao Phraya and its '
      + 'network of klongs among coconut palms as the geographical anchor, '
      + 'with tiny period figures, monks and elephants for scale.',
    kaupunki: 'Bangkok',
    otsikko: 'Bangkok 1873',
    selite: 'Chulalongkorn kruunattiin täysivaltaisena kuninkaana 16. '
      + 'marraskuuta 1873, ja samana vuonna hän julisti maahan '
      + 'heittäytymisen viranomaisten edessä lakkautetuksi.',
  },
  {
    id: 'kioto',
    tiedosto: 'tuot-kioto.png',
    nimi: 'KIOTO',
    vuosi: '1895',
    sommittelu: 'Kioto in 1895 as a beautiful miniature world: the newly '
      + 'built vermilion gate and wide gravel court of the Heian Shrine, a '
      + 'reduced copy of the ancient palace, as the dominant central feature, '
      + 'surrounded by the wooden stage of Kiyomizu-dera on its scaffold of '
      + 'pillars, the five-storey Yasaka pagoda among tiled roofs, the vast '
      + 'roof of Higashi Hongan-ji, a small open electric tram running on the '
      + 'street with its trolley pole, and the stone-lined incline of the Lake '
      + 'Biwa canal; the Kamo river with its low bridges and the wooded '
      + 'Higashiyama hills as the geographical anchor, with tiny period '
      + 'figures, rickshaws and cherry trees for scale.',
    kaupunki: 'Kioto',
    otsikko: 'Kioto 1895',
    selite: 'Heian-jingū rakennettiin 1895 kaupungin 1100-vuotisjuhlaan, ja '
      + 'samana vuonna Kiotossa avattiin Japanin ensimmäinen sähköraitiotie, '
      + 'jonka virta tuli Biwa-järven kanavan voimalasta.',
  },
  {
    id: 'singapore',
    tiedosto: 'tuot-singapore.png',
    nimi: 'SINGAPORE',
    vuosi: '1873',
    sommittelu: 'Singapore in 1873 as a beautiful miniature world: the mouth '
      + 'of the Singapore river packed with lighters and tongkangs unloading '
      + 'at the godowns of Boat Quay as the dominant central feature, '
      + 'surrounded by the suspension chains of Cavenagh Bridge, the white '
      + 'spire of St Andrew’s Cathedral above the green padang, the '
      + 'flagstaff on Fort Canning hill, rows of tiled shophouses with '
      + 'five-foot ways, a Malay kampong of stilt houses, and a crowded '
      + 'roadstead of steamers and square-riggers; the harbour islands, '
      + 'coconut palms and nutmeg gardens as the geographical anchor, with '
      + 'tiny period figures, bullock carts and rickshaws for scale.',
    kaupunki: 'Singapore',
    otsikko: 'Singapore 1873',
    selite: 'Suezin kanavan avaaminen 1869 käänsi höyrylaivaliikenteen '
      + 'Singaporen kautta, ja Straits Settlements oli siirretty Lontoon '
      + 'suoraan hallintaan 1867 — satama oli isoisän matkavuonna '
      + 'Kaakkois-Aasian vilkkain.',
  },
  {
    id: 'varanasi',
    tiedosto: 'tuot-varanasi.png',
    nimi: 'BENARES',
    vuosi: '1873',
    sommittelu: 'Benares in 1873 as a beautiful miniature world: the long '
      + 'crescent of stone ghats rising in flights of steps from the river, '
      + 'crowned by the gilded spires of the Kashi Vishwanath temple and the '
      + 'tall minarets of the Alamgir mosque, as the dominant central feature, '
      + 'surrounded by riverfront palaces of visiting princes, the brass '
      + 'instruments of the Man Mandir observatory on its terrace, tiered '
      + 'shrines and pilgrim umbrellas, moored rowing boats, and the ramparts '
      + 'of the maharaja’s fort on the far bank; the great curve of the '
      + 'Ganges as the geographical anchor, with tiny reverent period figures '
      + 'and boats for scale.',
    kaupunki: 'Varanasi',
    otsikko: 'Benares 1873',
    selite: 'Benares oli hindulaisuuden pyhin kaupunki, jonka kivisiä '
      + 'kylpyportaita rakennettiin 1700-luvulla; Kashi Višvanathin '
      + 'kultakupolisen temppelin pystytti Ahilyabai Holkar vuonna 1780.',
  },
  {
    id: 'hanoi',
    tiedosto: 'tuot-hanoi.png',
    nimi: 'HANOI',
    vuosi: '1873',
    sommittelu: 'Hanoi in 1873 as a beautiful miniature world: the tall '
      + 'tapering brick flag tower of the Nguyen citadel as the dominant '
      + 'central feature, surrounded by the low crenellated citadel walls and '
      + 'their arched gates, the tiled pavilions and gateways of the Temple of '
      + 'Literature, the small island shrine on Hoan Kiem lake reached by an '
      + 'arched red wooden bridge, the single-pillar pagoda on its lotus pond, '
      + 'the narrow tube houses of the merchant quarter, and junks and sampans '
      + 'on the river; the Red River and its dykes among rice fields as the '
      + 'geographical anchor, with tiny period figures, conical hats and '
      + 'buffalo carts for scale.',
    kaupunki: 'Hanoi',
    otsikko: 'Hanoi 1873',
    selite: 'Ranskalaiset valtasivat Hanoin linnoituksen 20. marraskuuta '
      + '1873, mutta kaupunki palautettiin Nguyễn-hoville ja jäi Ranskalle '
      + 'vasta kymmenen vuotta myöhemmin.',
  },
  {
    id: 'ulanbator',
    tiedosto: 'tuot-ulanbator.png',
    nimi: 'URGA',
    vuosi: '1873',
    sommittelu: 'Urga in 1873 as a beautiful miniature world: the tiered '
      + 'temple roofs and gilded finials of the Gandan monastery on its rise '
      + 'as the dominant central feature, surrounded by rings of white felt '
      + 'gers behind wooden palisade fences, the monastery courts with rows of '
      + 'prayer wheels and lines of lamas, a Chinese trading quarter of '
      + 'shingled shops, ox carts and camel caravans loaded with chests of '
      + 'brick tea, and horse herds on the plain; the Tuul river and the '
      + 'forested slope of the sacred Bogd Khan mountain as the geographical '
      + 'anchor, with tiny period figures, camels and horsemen for scale.',
    kaupunki: 'Ulan Bator',
    otsikko: 'Urga 1873',
    selite: 'Urga oli Mongolian uskonnollinen ja kaupallinen keskus, jonka '
      + 'Gandanin luostari oli perustettu 1809 ja jonka ohi kulki Kiahtan ja '
      + 'Kalganin välinen teekaravaanitie.',
  },
  {
    id: 'kathmandu',
    tiedosto: 'tuot-kathmandu.png',
    nimi: 'KATMANDU',
    vuosi: '1873',
    sommittelu: 'Katmandu in 1873 as a beautiful miniature world: the '
      + 'many-tiered pagoda temples and the carved wooden palace front of '
      + 'Hanuman Dhoka on the durbar square as the dominant central feature, '
      + 'surrounded by the white dome and painted eyes of the Swayambhunath '
      + 'stupa on its wooded hill, the tall white column of the Dharahara '
      + 'tower, the stuccoed white palaces of the Rana ministers, brick houses '
      + 'with deeply carved struts and lattice windows, and porters on a '
      + 'mountain trail; the terraced valley fields and the wall of Himalayan '
      + 'snow peaks behind as the geographical anchor, with tiny period '
      + 'figures and laden porters for scale.',
    kaupunki: 'Kathmandu',
    otsikko: 'Kathmandu 1873',
    selite: 'Isoisän matkavuonna Nepal oli Rana-pääministerien suljettu '
      + 'valtakunta, jonne ulkomaalaisia päästettiin vain harvoin; '
      + 'Kathmandun kaupunkikuvaa hallitsivat Durbar-aukion pagodit ja '
      + '1830-luvulla pystytetty Dharahara-torni.',
  },
  {
    id: 'astana',
    tiedosto: 'tuot-astana.png',
    nimi: 'AKMOLINSK',
    vuosi: '1873',
    sommittelu: 'Akmolinsk in 1873 as a beautiful miniature world: the '
      + 'earth-and-timber cossack fort above the river bank, with its '
      + 'palisade, corner watchtowers and gate, as the dominant central '
      + 'feature, surrounded by a small wooden church with a green cupola, '
      + 'single-storey log and mud houses, the trading rows and open market '
      + 'square with Tatar merchants’ stalls, felt yurts of a Kazakh '
      + 'camp outside the walls, and a camel caravan crossing the ford; the '
      + 'shallow Ishim river and the endless feather-grass steppe as the '
      + 'geographical anchor, with tiny period figures, horses and camels for '
      + 'scale.',
    kaupunki: 'Astana',
    otsikko: 'Akmolinsk 1873',
    selite: 'Astana oli isoisän matkavuonna Akmolinsk: Ishimin rannalle 1830 '
      + 'perustettu linnoituskylä, joka sai kaupunkioikeudet 1832 ja eli '
      + 'arojen karavaanireittien risteyksestä.',
  },
  {
    id: 'kanton',
    tiedosto: 'tuot-kanton.png',
    nimi: 'CANTON',
    vuosi: '1873',
    sommittelu: 'Canton in 1873 as a beautiful miniature world: the '
      + 'nine-storey Flower Pagoda of the Temple of the Six Banyan Trees as '
      + 'the dominant central feature, surrounded by the grey city wall with '
      + 'the five-storey watchtower on the hill, tiled temple courts and '
      + 'guild halls, the tree-lined European factories and flagstaffs of the '
      + 'made-up island of Shamian, the twin towers of the half-built stone '
      + 'cathedral, and a floating city of sampans and lantern-hung flower '
      + 'boats; the wide Pearl river crowded with tea junks as the '
      + 'geographical anchor, with tiny period figures, sedan chairs and '
      + 'lychee gardens for scale.',
    kaupunki: 'Kanton',
    otsikko: 'Kanton 1873',
    selite: 'Kanton oli ollut vuoteen 1842 asti Kiinan ainoa ulkomaankaupalle '
      + 'avoin satama, ja isoisän matkavuonna länsimaiset kauppahuoneet '
      + 'asuivat yhä Shamianin saarella, joka oli pengerretty jokeen '
      + '1850-luvun lopulla.',
  },
  {
    id: 'yangon',
    tiedosto: 'tuot-yangon.png',
    nimi: 'RANGOON',
    vuosi: '1873',
    sommittelu: 'Rangoon in 1873 as a beautiful miniature world: the vast '
      + 'gilded bell of the Shwedagon Pagoda on its terraced hill, ringed by '
      + 'smaller shrines and covered stairways, as the dominant central '
      + 'feature, surrounded by the newly laid grid of colonial streets with '
      + 'the golden Sule Pagoda at a crossroads, brick offices and the Strand '
      + 'wharves, rice mills with smoking chimneys, rafts of teak logs on the '
      + 'river, and paddle steamers and square-riggers at moorings; the '
      + 'Rangoon river and the flat delta of paddy fields and palms as the '
      + 'geographical anchor, with tiny period figures, monks and bullock '
      + 'carts for scale.',
    kaupunki: 'Yangon',
    otsikko: 'Rangoon 1873',
    selite: 'Britit tekivät Rangoonista Britti-Burman pääkaupungin 31. '
      + 'tammikuuta 1862 ja rakensivat sen ruutukaavaan, kun Burman kuningas '
      + 'hallitsi yhä ylävirran Mandalaysta.',
  },
  {
    id: 'mandalay',
    tiedosto: 'tuot-mandalay.png',
    nimi: 'MANDALAY',
    vuosi: '1873',
    sommittelu: 'Mandalay in 1873 as a beautiful miniature world: the '
      + 'seven-tiered gilded spire of the royal palace rising above the moated '
      + 'square of the walled city as the dominant central feature, surrounded '
      + 'by the crenellated red brick walls with their roofed gate pavilions '
      + 'and the wide lotus-covered moat, the covered stairway climbing '
      + 'Mandalay Hill, the white grid of small shrines at the Kuthodaw '
      + 'Pagoda each housing a marble slab of scripture, teak monasteries with '
      + 'carved eaves, and boats on the river; the Irrawaddy and the dry '
      + 'toddy-palm plain as the geographical anchor, with tiny period '
      + 'figures, monks and bullock carts for scale.',
    kaupunki: 'Mandalay',
    otsikko: 'Mandalay 1873',
    selite: 'Mindon-kuningas perusti Mandalayn 1857 ja kutsui sinne 1871 '
      + 'viidennen buddhalaisen kirkolliskokouksen, joka hakkasi Pali-kaanonin '
      + '729 marmoritaululle.',
  },
  {
    id: 'taipei',
    tiedosto: 'tuot-taipei.png',
    nimi: 'TAIPEH',
    vuosi: '1884',
    sommittelu: 'Taipeh in 1884 as a beautiful miniature world: the newly '
      + 'finished city wall of dressed stone with the two-storey roofed North '
      + 'Gate as the dominant central feature, surrounded by the prefectural '
      + 'yamen courtyards and the Confucian temple inside the walls, the tea '
      + 'warehouses and merchant streets of Dadaocheng outside them with mats '
      + 'of oolong tea drying in the sun, camphor and rattan stores, and junks '
      + 'and sampans moored along the river; the Tamsui river winding to the '
      + 'sea and the misty Datun volcanic hills as the geographical anchor, '
      + 'with tiny period figures, sedan chairs and water buffalo for scale.',
    kaupunki: 'Taipei',
    otsikko: 'Taipeh 1884',
    selite: 'Taipeh sai muurinsa ja porttinsa 1884, ja Dadaochengin teekauppa '
      + 'kasvatti sen niin nopeasti, että kaupungista tuli pian koko Taiwanin '
      + 'provinssin pääpaikka.',
  },
  {
    id: 'hongkong',
    tiedosto: 'tuot-hongkong.png',
    nimi: 'HONG KONG',
    vuosi: '1888',
    sommittelu: 'Hong Kong in 1888 as a beautiful miniature world: the steep '
      + 'green mass of Victoria Peak with the newly opened cable tramway '
      + 'climbing it in a straight cut, its little car on the incline, as the '
      + 'dominant central feature, surrounded by the arcaded stone buildings '
      + 'and clock tower along the praya waterfront, the spire of St '
      + 'John’s Cathedral among terraced villas, godowns and coal '
      + 'wharves, and a harbour thick with junks, sampans, clippers and '
      + 'steamers; the enclosed strait and the hills of Kowloon beyond as the '
      + 'geographical anchor, with tiny period figures, sedan chairs and '
      + 'rickshaws for scale.',
    kaupunki: 'Hongkong',
    otsikko: 'Hongkong 1888',
    selite: 'Aasian ensimmäinen köysirata, Peak Tram, avattiin 30. toukokuuta '
      + '1888 ja nosti matkustajat Victoria Peakille, jonne oli siihen asti '
      + 'noustu kantotuolissa.',
  },
  {
    id: 'jakarta',
    tiedosto: 'tuot-jakarta.png',
    nimi: 'BATAVIA',
    vuosi: '1873',
    sommittelu: 'Batavia in 1873 as a beautiful miniature world: the '
      + 'canal-side merchant houses of the old town with their Dutch gables '
      + 'and the belfry of the old town hall as the dominant central feature, '
      + 'surrounded by the drawbridge over the Kali Besar, warehouses and '
      + 'quays, the shaded avenues and white villas of Weltevreden around the '
      + 'huge grass square of the Koningsplein, a horse tram on the Molenvliet '
      + 'road, and a small locomotive of the new Buitenzorg railway with its '
      + 'open carriages; the sluggish canals, prahus at the old harbour and '
      + 'the blue volcanic cones inland as the geographical anchor, with tiny '
      + 'period figures, carts and palms for scale.',
    kaupunki: 'Jakarta',
    otsikko: 'Batavia 1873',
    selite: 'Batavian rautatie Buitenzorgiin valmistui 1873, samana vuonna '
      + 'kun Alankomaat aloitti Acehin sodan Sumatran pohjoiskärjessä; '
      + 'hevosraitiovaunut olivat kulkeneet kaupungissa vuodesta 1869.',
  },
  {
    id: 'manila',
    tiedosto: 'tuot-manila.png',
    nimi: 'MANILA',
    vuosi: '1873',
    sommittelu: 'Manila in 1873 as a beautiful miniature world: the walls and '
      + 'moat of Intramuros with the carved gateway of Fort Santiago as the '
      + 'dominant central feature, surrounded by the massive stone church of '
      + 'San Agustin, the new cathedral rising in scaffolding on its cleared '
      + 'site, the bell tower of Binondo across the river, the arched Bridge '
      + 'of Spain, tile-roofed houses with sliding shell-pane windows and '
      + 'bamboo-and-nipa huts on the outskirts, and cascos and steam launches '
      + 'on the water; the Pasig river and the bay with the mountains of '
      + 'Bataan beyond as the geographical anchor, with tiny period figures, '
      + 'carabao carts and horse calesas for scale.',
    kaupunki: 'Manila',
    otsikko: 'Manila 1873',
    selite: 'Vuoden 1863 maanjäristys kaatoi Manilan katedraalin, ja sen '
      + 'seitsemättä versiota alettiin rakentaa 1873 — se vihittiin vasta '
      + '1879.',
  },
  {
    id: 'borneo',
    tiedosto: 'tuot-borneo.png',
    nimi: 'BORNEO',
    vuosi: '1873',
    sommittelu: 'Borneo in 1873 as a beautiful miniature world: an immensely '
      + 'long Dayak longhouse on stilts above a jungle river, its verandah '
      + 'lined with drying rice and paddles, as the dominant central feature, '
      + 'surrounded by the white bungalow palace of the rajah of Sarawak on '
      + 'its lawn across the river at Kuching, a Malay stilt village and '
      + 'bazaar, a schooner and long native praus at the landing, orangutans '
      + 'and hornbills in the towering rainforest canopy, and pepper and sago '
      + 'gardens cut from the jungle; the coiling brown river, mangrove coast '
      + 'and the far granite crown of Mount Kinabalu as the geographical '
      + 'anchor, with tiny period figures and dugout canoes for scale.',
    kaupunki: 'Borneo',
    otsikko: 'Borneo 1873',
    selite: 'Borneon luoteisrannikkoa hallitsi valkoisten rajahien Sarawakin '
      + 'kuningaskunta, jonka Charles Brooke rakennutti Kuchingiin Astana-'
      + 'palatsin 1869; saaren sademetsissä Alfred Russel Wallace oli '
      + 'kerännyt näytteitään 1850-luvulla.',
  },
  {
    id: 'sumatra',
    tiedosto: 'tuot-sumatra.png',
    nimi: 'SUMATRA',
    vuosi: '1873',
    sommittelu: 'Sumatra in 1873 as a beautiful miniature world: the immense '
      + 'crater lake of Toba with its central island as the dominant central '
      + 'feature, surrounded by Batak villages of saddle-roofed carved timber '
      + 'houses on the shore, the sweeping horned roofs of a Minangkabau '
      + 'house further south, a smoking volcanic cone above terraced rice '
      + 'fields, pepper and coffee gardens, a tiger and a rhinoceros in the '
      + 'rainforest edge, and a Dutch steamer off the surf-beaten west coast; '
      + 'the high volcanic spine of the island and its jungle plains as the '
      + 'geographical anchor, with tiny period figures, buffalo and prahus for '
      + 'scale.',
    kaupunki: 'Sumatra',
    otsikko: 'Sumatra 1873',
    selite: 'Alankomaat hyökkäsi Acehin sulttaanikuntaan keväällä 1873 ja '
      + 'aloitti Sumatran pohjoiskärjessä sodan, joka kesti neljäkymmentä '
      + 'vuotta.',
  },
  {
    id: 'kashgar',
    tiedosto: 'tuot-kashgar.png',
    nimi: 'KASHGAR',
    vuosi: '1873',
    sommittelu: 'Kashgar in 1873 as a beautiful miniature world: the yellow '
      + 'brick portal and flanking minarets of the Id Kah mosque above its '
      + 'poplar-shaded square as the dominant central feature, surrounded by '
      + 'the mud-brick old town of flat roofs and covered lanes, the thick '
      + 'rammed-earth city wall and gate, the Sunday bazaar with melon stalls '
      + 'and donkey carts, irrigation ditches and rows of poplars among fields '
      + 'of cotton, and a camel caravan setting off for the mountain passes; '
      + 'the oasis on the desert edge with the snow line of the Pamirs and '
      + 'Tian Shan behind as the geographical anchor, with tiny period '
      + 'figures, donkeys and camels for scale.',
    kaupunki: 'Kashgar',
    otsikko: 'Kashgar 1873',
    selite: 'Isoisän matkavuonna Kashgar oli Jakub Begin itsenäisen '
      + 'Jettišarin pääkaupunki: kapina oli irrottanut sen Kiinasta 1865, ja '
      + 'Qing-armeija otti alueen takaisin vasta 1877.',
  },
  {
    id: 'lhasa',
    tiedosto: 'tuot-lhasa.png',
    nimi: 'LHASA',
    vuosi: '1873',
    sommittelu: 'Lhasa in 1873 as a beautiful miniature world: the Potala '
      + 'Palace rising in white and ochre tiers on its rock, crowned with '
      + 'golden roofs, as the dominant central feature, surrounded by the '
      + 'gilded roof ornaments of the Jokhang temple and the circling '
      + 'pilgrimage street around it, the medical college on the neighbouring '
      + 'hill of Chakpori, whitewashed courtyard houses and prayer-flag poles, '
      + 'and the great monastery towns of Drepung and Sera stacked on the '
      + 'valley slopes; the Kyichu river, willow groves and barley fields '
      + 'under a ring of snow peaks as the geographical anchor, with tiny '
      + 'reverent period figures, yaks and prayer wheels for scale.',
    kaupunki: 'Lhasa',
    otsikko: 'Lhasa 1873',
    selite: 'Kahdestoista dalai-lama Trinley Gyatso asetettiin '
      + 'täysivaltaiseksi 11. maaliskuuta 1873, mutta hän ehti hallita vain '
      + 'kaksi vuotta ennen kuolemaansa.',
  },
  {
    id: 'kolkata',
    tiedosto: 'tuot-kolkata.png',
    nimi: 'CALCUTTA',
    vuosi: '1873',
    sommittelu: 'Calcutta in 1873 as a beautiful miniature world: the '
      + 'colonnaded white bulk of Government House with its dome and curved '
      + 'wings above the open green of the Maidan as the dominant central '
      + 'feature, surrounded by the tall fluted column of the Ochterlony '
      + 'Monument, the gothic spire of St Paul’s Cathedral, the star-'
      + 'shaped ramparts of Fort William, a horse tram on its rails by the '
      + 'Strand, the pontoons of the new floating bridge being laid across to '
      + 'Howrah, and ghats crowded with bathers; the Hooghly river packed with '
      + 'clippers, country boats and paddle steamers as the geographical '
      + 'anchor, with tiny period figures, palanquins and bullock carts for '
      + 'scale.',
    kaupunki: 'Kolkata',
    otsikko: 'Kalkutta 1873',
    selite: 'Intian ensimmäinen hevosraitiovaunu lähti Kalkutassa 24. '
      + 'helmikuuta 1873 Sealdahista Armenian Ghatille, mutta linja '
      + 'lakkautettiin jo saman vuoden marraskuussa.',
  },
  {
    id: 'kabul',
    tiedosto: 'tuot-kabul.png',
    nimi: 'KABUL',
    vuosi: '1873',
    sommittelu: 'Kabul in 1873 as a beautiful miniature world: the Bala '
      + 'Hissar fortress with its high walls, towers and inner citadel on the '
      + 'spur above the city as the dominant central feature, surrounded by '
      + 'the ancient wall climbing the bare ridge of Sher Darwaza, the domed '
      + 'mausoleum of Timur Shah beside the river, the covered bazaar and '
      + 'timber-galleried houses, the terraced garden of Babur with its '
      + 'watercourse, and a caravan setting out for the Khyber; the Kabul '
      + 'river, poplar groves and orchards under the snow line of the Hindu '
      + 'Kush as the geographical anchor, with tiny period figures, horsemen '
      + 'and camels for scale.',
    kaupunki: 'Kabul',
    otsikko: 'Kabul 1873',
    selite: 'Isoisän matkavuonna Kabulia hallitsi emiiri Sher Ali Khan Bala '
      + 'Hissarin linnoituksesta, joka tuhoutui osittain 1879 toisen '
      + 'brittiläis-afgaanisodan alettua.',
  },
  {
    id: 'chennai',
    tiedosto: 'tuot-chennai.png',
    nimi: 'MADRAS',
    vuosi: '1873',
    sommittelu: 'Madras in 1873 as a beautiful miniature world: the low '
      + 'bastioned ramparts of Fort St George with the spire of St Mary’s '
      + 'church inside them as the dominant central feature, surrounded by the '
      + 'lighthouse on the esplanade, the arcaded garden houses and the '
      + 'Chepauk palace, the carved gopuram of the Kapaleeshwarar temple in '
      + 'Mylapore, ships lying at anchor far out in the open roadstead with no '
      + 'harbour at all, and stitched masula surf boats riding the breakers '
      + 'with cargo; the long straight surf beach and the flat coastal plain '
      + 'of palmyra palms as the geographical anchor, with tiny period '
      + 'figures, catamaran rafts and bullock carts for scale.',
    kaupunki: 'Chennai',
    otsikko: 'Madras 1873',
    selite: 'Isoisän matkavuonna Madrasissa ei ollut satamaa lainkaan: laivat '
      + 'ankkuroivat kauas rannasta ja lasti tuotiin maihin ommelluilla '
      + 'masula-veneillä — aallonmurtajien muuraus alkoi vasta 1876.',
  },
  {
    id: 'mumbai',
    tiedosto: 'tuot-mumbai.png',
    nimi: 'BOMBAY',
    vuosi: '1888',
    sommittelu: 'Bombay in 1888 as a beautiful miniature world: the newly '
      + 'finished Victoria Terminus with its ribbed dome, turrets and carved '
      + 'gothic front as the dominant central feature, surrounded by the '
      + 'clock tower of the university, the arcaded ring of Elphinstone '
      + 'Circle, the iron sheds of Crawford Market, the chimneys of the cotton '
      + 'mills, the landing steps of Apollo Bunder with steam launches and '
      + 'dhows, and villas among palms on Malabar Hill; the harbour with its '
      + 'islands and the flat sea as the geographical anchor, with tiny period '
      + 'figures, bullock carts and a small train for scale.',
    kaupunki: 'Mumbai',
    otsikko: 'Bombay 1888',
    selite: 'Victoria Terminus valmistui kuningatar Victorian '
      + 'kultaisen juhlavuoden 1887 kunniaksi ja avattiin matkustajille 20. '
      + 'toukokuuta 1888 kymmenen rakennusvuoden jälkeen.',
  },
  {
    id: 'colombo',
    tiedosto: 'tuot-colombo.png',
    nimi: 'COLOMBO',
    vuosi: '1875',
    sommittelu: 'Colombo in 1875 as a beautiful miniature world: the tall '
      + 'white clock tower lighthouse of the Fort quarter as the dominant '
      + 'central feature, surrounded by the arcaded colonial offices and '
      + 'warehouses around it, the gabled Dutch church of Wolvendaal on its '
      + 'hill, the crowded bazaar streets of the Pettah, bullock carts hauling '
      + 'chests of tea from the railway yard to the jetty, outrigger canoes '
      + 'drawn up on the beach, and steamers and sailing ships lying in the '
      + 'open roadstead; the coconut palms of the shore and the far blue peak '
      + 'of Adam’s Peak inland as the geographical anchor, with tiny '
      + 'period figures and bullock carts for scale.',
    kaupunki: 'Colombo',
    otsikko: 'Colombo 1875',
    selite: 'Kahviruoste oli tuhonnut Ceylonin kahviviljelmät, ja vuonna 1875 '
      + 'James Taylorin viljelmältä lähetettiin saaren ensimmäinen teelasti '
      + 'Lontoon huutokauppaan.',
  },
  {
    id: 'karachi',
    tiedosto: 'tuot-karachi.png',
    nimi: 'KURRACHEE',
    vuosi: '1873',
    sommittelu: 'Kurrachee in 1873 as a beautiful miniature world: the '
      + 'sheltered harbour at Kiamari with steamers and square-riggers loading '
      + 'sacks of wheat and bales of cotton as the dominant central feature, '
      + 'surrounded by the lighthouse on the low sandy bluff of Manora point, '
      + 'the long causeway carrying bullock carts across the mud flats, the '
      + 'gothic tower and lawns of Frere Hall, the flat-roofed lanes and '
      + 'bazaars of the old town, and the railway yard with wagons of grain '
      + 'from the Indus valley; the mangrove creeks and the flat dry plain of '
      + 'Sind as the geographical anchor, with tiny period figures, camels and '
      + 'bullock carts for scale.',
    kaupunki: 'Karachi',
    otsikko: 'Karachi 1873',
    selite: 'Suezin kanavan avaaminen 1869 nosti Karachin Sindin vehnän ja '
      + 'puuvillan vientisatamaksi, ja brittien hallintorakennuksista Frere '
      + 'Hall oli valmistunut 1865.',
  },
];
