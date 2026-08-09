// Matkakirjan valokuvakortit (NORTHAMERICA_VALOKUVAT).
//
// Sama rakenne kuin EUROPE_VALOKUVAT ja AFRICA_VALOKUVAT: vanha vedos
// isoisän ajoilta, päiväkirjan mainitsemat näkymät (lisat) ja sama
// paikka nykyään. Kuvat haetaan Commonsista sitä mukaa kuin pelaaja ne
// näkee, ja palvelutyöntekijä tallentaa kerran nähdyn omaan koriinsa.
//
// Kuvat on etsitty kaupungin päiväkirjamerkinnän pohjalta ja jokainen
// tiedosto tarkistettu Commonsista ennen kirjoittamista: olemassaolo,
// vähintään 1200 pikseliä, vapaa lisenssi ilman ND-ehtoa, ja vanhaksi
// merkityn kuvan ikä.
//
// Tuotettu komennolla tools/kirjoita-kuvakortit.mjs. Älä muokkaa
// pistelistoja käsin — korjaa lähde ja aja uudelleen.
export const NORTHAMERICA_VALOKUVAT = {
  anchorage: {
    tiedosto: 'Anchorage Alaska 1 July 1915.jpg',
    vuosi: '1915',
    lahde: 'Alberta Pyatt / Anchorage Museum, Commons (PD)',
    selite: 'Telttakaupunki Ship Creekin rannalla 1. heinäkuuta 1915, taustalla '
      + 'Chugachin vuoret. Käsin kirjoitettu kuvateksti nimittää paikkaa '
      + 'Valkoiseksi kaupungiksi. Anchorage alkoi rautatien rakennusleirinä, '
      + 'ja ensimmäinen kesä asuttiin purjekankaan alla. Oikealla kohoaa jo '
      + 'hirsistä rakennettu kaksikerroksinen talo.',
    lisat: [
      {
        tiedosto: 'Seaplane base on Lake Hood, Anchorage (3574288498).jpg',
        vuosi: '2009',
        lahde: 'Joseph (umnak), Commons (CC BY-SA 2.0)',
        selite: 'Vesitasoja kiinni Lake Hoodin rannassa Anchoragessa. Kuvaaja '
          + 'kutsuu paikkaa maailman vilkkaimmaksi vesilentotukikohdaksi. '
          + 'Suureen osaan Alaskan kyliä ei pääse tietä pitkin, joten kone '
          + 'laskeutuu järvelle tai joelle.',
      },
      {
        tiedosto: 'The ceremonial dog sled making the turn on 4th Avenue in Anchorage (3411117618).jpg',
        vuosi: '2009',
        lahde: 'Frank Kovalchek, Commons (CC BY 2.0)',
        selite: 'Valjakko kääntyy Fourth Avenuelle Iditarodin näytöslähdössä. '
          + 'Varsinainen kilpailu alkaa vasta seuraavana päivänä Willow\'sta; '
          + 'Anchoragessa ajetaan lyhyt katuosuus, ja reessä istuu '
          + 'matkustaja, joka on ostanut paikkansa huutokaupasta.',
      },
      {
        tiedosto: 'Traffic Moose. Old Seward Highway, Anchorage, Alaska.jpg',
        vuosi: '2009',
        lahde: 'FairbanksMike, Commons (CC BY 2.0)',
        selite: 'Hirvinaaras ja kaksi vasaa kävelevät Old Seward Highwayta pitkin '
          + 'autoliikkeiden ohi. Anchoragen alueella elää hirviä ympäri '
          + 'vuoden, ja ne liikkuvat myös keskellä kaupunkia.',
      },
    ],
    uusi: {
      tiedosto: 'Ship Creek Fishing - Anchorage.jpg',
      vuosi: '2019',
      lahde: 'Haydn Blackey, Commons (CC BY-SA 2.0)',
      selite: 'Sama Ship Creek nykyään, samat Chugachin vuoret takana. Purossa '
        + 'seisoo onkijoita: lohi nousee jokea keskellä kaupunkia, muutaman '
        + 'korttelin päässä keskustasta. Vasemmalla näkyy vanha voimalaitos.',
    },
  },
  appalakit: {
    tiedosto: 'Coal miner\'s child taking home kerosene for lamps, 8a39248.jpg',
    vuosi: '1938',
    lahde: 'Marion Post Wolcott, Library of Congress (PD)',
    selite: 'Kaivosmiehen lapsi kantaa kotiin kanisterillisen petrolia lamppuja '
      + 'varten Pursglovessa Länsi-Virginiassa. Vasemmalla seisoo hiilellä '
      + 'lastattu junavaunujono, taustalla kaivoksen lastaustorni ja oikealla '
      + 'yhtiön rakentamat asuintalot — sähköä ei kylässä ollut.',
    lisat: [
      {
        tiedosto: 'MDB 2658-Linn-Cove-Viaduct-Red-Car-4x3.jpg',
        vuosi: '2010',
        lahde: 'MBugbey, Commons (CC BY-SA 4.0)',
        selite: 'Linn Cove -silta Blue Ridge Parkwaylla Pohjois-Carolinassa. Tie '
          + 'kiertää Grandfather Mountainin rinnettä pilareilla, koska '
          + 'rinnettä ei haluttu louhia auki.',
      },
      {
        tiedosto: 'Grassy Ridge Bald.jpg',
        vuosi: '2024',
        lahde: 'Chaneyforkriver, Commons (CC0)',
        selite: 'Grassy Ridge Bald nähtynä Appalakkien vaellusreitiltä. Näitä '
          + 'puuttomia lakia sanotaan nimellä bald; ne ovat metsärajan '
          + 'alapuolella, mutta silti avoimia.',
      },
      {
        tiedosto: 'RileyBaugus Merlefest2009.jpg',
        vuosi: '2009',
        lahde: 'MrsBaugus, Commons (CC BY-SA 3.0)',
        selite: 'Riley Baugus soittaa bandjoa MerleFest-festivaalilla. Vuorten '
          + 'vanha soittotapa siirtyi pitkään vain korvakuulolta, ja '
          + 'festivaalit ovat nykyään sen tärkein esityspaikka.',
      },
    ],
    uusi: {
      tiedosto: 'Autumn Colors Overlook View Graveyard Fields Blue Ridge Pkwy NC.jpg',
      lahde: 'bobistraveling, Commons (CC BY 2.0)',
      selite: 'Syysväreissä oleva Graveyard Fieldsin laakso Blue Ridge Parkwayn '
        + 'näköalapaikalta. Appalakit ovat vanhoja ja kuluneita vuoria, mistä '
        + 'johtuu niiden pyöreä muoto ja se, että metsä yltää huipuille asti.',
    },
  },
  bermuda: {
    tiedosto: 'SS Trinidad and Bermudian sloops.jpg',
    vuosi: 'noin 1890',
    lahde: 'James Bell Heyl, Commons (PD)',
    selite: 'Matkustajahöyry SS Trinidad ankkurissa Bermudan vesillä, edessään '
      + 'paikallisia työveneitä. Trinidad kuljetti postia ja matkustajia New '
      + 'Yorkin ja Bermudan väliä; etualan sluupeissa on bermudalaistakila, '
      + 'joka on sama kolmiopurjeratkaisu kuin nykyisissä purjeveneissä.',
    lisat: [
      {
        tiedosto: 'Bermuda - Gombey dancers.jpg',
        vuosi: '2023',
        lahde: 'P. Hughes, Commons (CC BY-SA 4.0)',
        selite: 'Gombey-tanssijoita Royal Naval Dockyardilla. Gombey on '
          + 'bermudalainen naamiotanssiperinne, jota esitetään rummun '
          + 'tahdissa juhlapäivinä ja joka periytyy saaren '
          + 'afrikkalaistaustaisesta väestöstä.',
      },
      {
        tiedosto: 'Bermuda - Former Great Eastern Storehouse.jpg',
        vuosi: '2023',
        lahde: 'P. Hughes, Commons (CC BY-SA 4.0)',
        selite: 'Entinen Great Eastern -varastorakennus Royal Naval Dockyardilla. '
          + 'Britannian laivasto piti Bermudalla telakkaa ja varikkoa, ja sen '
          + 'rakennukset ovat saaren järeintä kivimuurausta.',
      },
      {
        tiedosto: 'Front Street, Hamilton, Bermuda.jpg',
        vuosi: '2011',
        lahde: 'JoeyBagODonuts, Commons (CC BY-SA 3.0)',
        selite: 'Front Street Hamiltonin keskustassa. Pastellinsävyiset '
          + 'kauppatalot ovat aivan laiturin vieressä: risteilijät '
          + 'kiinnittyvät kadun päähän, ja saaren kauppa on aina kulkenut '
          + 'tämän rantakadun kautta.',
      },
    ],
    uusi: {
      tiedosto: 'Hamilton Harbour in Bermuda 01.jpg',
      lahde: 'Aodhdubh, Commons (CC BY-SA 3.0)',
      selite: 'Hamiltonin satama Front Streetin kohdalla: pieni vesitaksi ylittää '
        + 'lahtea ja vastarannan rinteessä on taloja. Katot ovat valkoisia ja '
        + 'porrastettuja, koska ne keräävät sadeveden talteen — saarella ei '
        + 'ole jokia eikä makean veden lähteitä.',
    },
  },
  chicago: {
    tiedosto: 'State Street, north from Madison, Chicago-LCCN2008678298.jpg',
    vuosi: '1900',
    lahde: 'Library of Congress (PD)',
    selite: 'State Street pohjoiseen Madison Streetin kulmasta vuonna 1900. Katu '
      + 'oli kaupungin tavarataloiden katu, ja raitiovaunut, kärryt ja '
      + 'jalankulkijat jakoivat saman ajoradan. Photochrom-vedos Kongressin '
      + 'kirjaston kokoelmasta.',
    lisat: [
      {
        tiedosto: 'Chicago Elevated, Wabash.jpg',
        vuosi: '2010',
        lahde: 'Cragin Spring, Commons (CC BY 2.0)',
        selite: 'Korkealla kulkeva metro Wabash Avenuen yllä. Radat kiertävät '
          + 'keskustan ympäri silmukkana, ja kaupunginosaa kutsutaan siksi '
          + 'nimellä Loop.',
      },
      {
        tiedosto: 'Maxwell Street Market (10626282205).jpg',
        vuosi: '2013',
        lahde: 'Edsel Little, Commons (CC BY-SA 2.0)',
        selite: 'Maxwell Street Market, sunnuntaisin auki oleva katutori. Nimi on '
          + 'peräisin kadulta, jonka varrella siirtolaisten kauppapaikka '
          + 'aikoinaan oli; tori on sittemmin siirretty lähemmäs keskustaa.',
      },
      {
        tiedosto: '20170409 01 Chicago River @ Wabash Ave. (38511674331).jpg',
        vuosi: '2017',
        lahde: 'David Wilson, Commons (CC BY 2.0)',
        selite: 'Chicago-joki Wabash Avenuen sillalta. Joen virtaussuunta '
          + 'käännettiin 1900-luvun alussa niin, että se vie vetensä poispäin '
          + 'Michiganjärvestä eikä siihen — järvi oli kaupungin juomavesi.',
      },
    ],
    uusi: {
      tiedosto: 'Chicago Skyline 2022 3.jpg',
      lahde: 'Sea Cow, Wikimedia Commons (CC BY-SA 4.0)',
      selite: 'Chicagon pilvenpiirtäjärivistö Michiganjärven rannalla. Etualalla '
        + 'aallonmurtajien suojaama venesatama ja rantapuisto, taustalla '
        + 'keskustan tornit Willis Towerin antenneineen.',
    },
  },
  churchill: {
    tiedosto: 'Royal North West Mounted Police barracks and Churchill River, Churchill, 1907 (HS85-10-18547).jpg',
    vuosi: '1907',
    lahde: 'Geraldine Moodie, Commons (PD)',
    selite: 'Luoteisen ratsupoliisin asema Churchilljoen suulla 1907. Etualan '
      + 'täyttää tuulen veistämä ahtojää, ja matalat rakennukset erottuvat '
      + 'sen takana pieninä. Kuvan otti Geraldine Moodie, ja hänen '
      + 'nimikirjoituksensa näkyy vedoksessa. Satamaa tai rautatietä ei vielä '
      + 'ollut - kiskot ylsivät Churchilliin vasta 1929 ja viljasatama '
      + 'avattiin 1931.',
    lisat: [
      {
        tiedosto: 'Prince of Wales Fort - Churchill, Manitoba (40402156465).jpg',
        vuosi: '2014',
        lahde: 'TravelingOtter, Commons (CC BY 2.0)',
        selite: 'Prince of Wales Fortin muurit Churchilljoen suulla. Hudson\'s Bay '
          + 'Company rakensi kivilinnoituksen 1700-luvulla turkiskauppansa '
          + 'turvaksi. Ranskalainen laivasto valtasi sen 1782 ilman '
          + 'taistelua: väkeä ei ollut lähimainkaan tarpeeksi tykkien taakse.',
      },
      {
        tiedosto: 'Polar Bear and Tundra Buggy - Churchill, Manitoba (26427267077).jpg',
        vuosi: '2014',
        lahde: 'TravelingOtter, Commons (CC BY 2.0)',
        selite: 'Jääkarhu ja tundravaunu Churchillin lähellä. Karhut odottavat '
          + 'syksyllä rannikolla, että Hudsoninlahti jäätyy ja hylkeenpyynti '
          + 'alkaa. Katsojat kuljetetaan korkealla alustalla oleviin '
          + 'vaunuihin, jotta karhut eivät ylety.',
      },
      {
        tiedosto: 'Beluga Whales - Churchill, Manitoba (27426558548).jpg',
        vuosi: '2014',
        lahde: 'TravelingOtter, Commons (CC BY 2.0)',
        selite: 'Valkovalaita eli belugia Churchilljoen suulla. Ne kokoontuvat '
          + 'kesällä tuhansittain joen suulle, jossa vesi on lämpimämpää ja '
          + 'makeampaa kuin lahdella. Vilkkaan vedenalaisen äänekkyytensä '
          + 'takia niitä on kutsuttu meren kanarialinnuiksi.',
      },
    ],
    uusi: {
      tiedosto: 'End of the line, Churchill Manitoba (30352378547).jpg',
      vuosi: '2014',
      lahde: 'Mike Beauregard, Commons (CC BY 2.0)',
      selite: 'Radan pää Churchillissä: kiskot loppuvat tundralle ja taustalla '
        + 'häämöttää viljaterminaali kaupungin laidalla. Hudsoninlahden rata '
        + 'on ainoa maayhteys tänne. Tulva katkaisi sen 2017, ja ensimmäinen '
        + 'juna pääsi perille vasta syksyllä 2018.',
    },
  },
  denver: {
    tiedosto: 'Welcome Arch and Union Depot, Denver, Colo..jpg',
    vuosi: 'noin 1908',
    lahde: 'Library of Congress (PD)',
    selite: 'Tervetuloakaari rautatieaseman edustalla noin vuonna 1908. Kaari '
      + 'pystytettiin ottamaan vastaan junalla saapuvat matkustajat, jotka '
      + 'astuivat asemalta suoraan sen alle. Kaari purettiin myöhemmin, mutta '
      + 'asema on yhä paikallaan.',
    lisat: [
      {
        tiedosto: '16th Street Mall northwest past Tremont Place.jpeg',
        vuosi: '2021',
        lahde: 'Dough4872, Commons (CC BY-SA 4.0)',
        selite: '16th Street Mall Tremont Placen risteyksen kohdalla. Mailin '
          + 'mittainen katuosuus on varattu jalankulkijoille, ja sitä pitkin '
          + 'kulkee maksuton bussi päästä päähän.',
      },
      {
        tiedosto: 'One Mile Above Sea Level.jpg',
        vuosi: '2010',
        lahde: 'J. Miers, Commons (CC BY-SA 3.0)',
        selite: 'Osavaltion parlamenttitalon portaisiin hakattu merkintä One Mile '
          + 'Above Sea Level. Denverin lempinimi Mile High City tulee siitä, '
          + 'että kaupunki on tasan mailin merenpinnan yläpuolella.',
      },
      {
        tiedosto: 'Colorado State Capitol (2023).jpg',
        vuosi: '2023',
        lahde: 'xiquinhosilva, Commons (CC BY 2.0)',
        selite: 'Coloradon parlamenttitalo Colfax Avenuen varrella. Rakennus '
          + 'valmistui 1890-luvulla, ja sen kupoli on päällystetty aidolla '
          + 'lehtikullalla muistona osavaltion kultaryntäyksestä.',
      },
    ],
    uusi: {
      tiedosto: 'Denver Union Station - June 2022 - Sarah Stierch 01.jpg',
      lahde: 'Sarah Stierch, Commons (CC BY 4.0)',
      selite: 'Sama asema nykyään. Rakennus kunnostettiin ja avattiin uudelleen '
        + '2014, ja se toimii yhtä aikaa juna- ja bussiasemana sekä '
        + 'liikkeiden ja ravintoloiden halliaulana.',
    },
  },
  grandcanyon: {
    tiedosto: 'Grand Canyon)- Burro trains at Indian Gardens LCCN2002715958.jpg',
    vuosi: '1906',
    lahde: 'Library of Congress (PD)',
    selite: 'Aasijono lastattuna Indian Gardensin telttaleirissä puolimatkassa '
      + 'kanjonin seinämää. Kaikki tavara kannettiin rotkoon eläinten '
      + 'selässä, koska polku on liian jyrkkä ja kapea kärryille.',
    lisat: [
      {
        tiedosto: 'Grand Canyon National Park, Bright Angel Trial, Mule Trip 4825 - Flickr - Grand Canyon NPS.jpg',
        vuosi: '2011',
        lahde: 'Michael Quinn, National Park Service (PD)',
        selite: 'Opas johdattaa muuliratsastajia ylös Bright Angel -polkua. Samaa '
          + 'polkua käytetään yhä sekä matkustajien että tavaran '
          + 'kuljettamiseen kanjonin pohjalle.',
      },
      {
        tiedosto: 'Hopi House Grand Canyon Village 09 2017 5290.jpg',
        vuosi: '2017',
        lahde: 'Mario Roberto Durán Ortiz, Commons (CC BY-SA 4.0)',
        selite: 'Hopi House kanjonin etelälaidalla. Rakennus valmistui 1905 '
          + 'matkailijoiden käsityökaupaksi, ja se tehtiin hopien kylätalojen '
          + 'mallin mukaan kivestä ja puupalkeista.',
      },
      {
        tiedosto: 'A private raft in Hermit Rapid on the Colorado River through the Grand Canyon.jpg',
        vuosi: '2005',
        lahde: 'Matkatamiba, Commons (CC BY-SA 4.0)',
        selite: 'Lautta Hermit Rapidin koskessa Colorado-joella. Joki on se, joka '
          + 'on kaivanut koko kanjonin, ja sen pinta on runsaan kilometrin '
          + 'verran reunaa alempana.',
      },
    ],
    uusi: {
      tiedosto: 'Mather Point Grand Canyon South Rim.jpg',
      lahde: 'Colin Faulkingham, Commons (PD)',
      selite: 'Mather Point etelälaidalla aamuauringossa. Kerrokset kanjonin '
        + 'seinämässä ovat eri-ikäisiä kivilajeja, ja alimmat niistä ovat '
        + 'vanhempia kuin monimutkainen elämä maapallolla.',
    },
  },
  guatemala: {
    tiedosto: 'Guatemala, Plaza De Armas LCCN2014706038.tif',
    vuosi: '1915',
    lahde: 'Bain News Service / Library of Congress (PD)',
    selite: 'Guatemala Cityn Plaza de Armas vuonna 1915 lasinegatiivilta. Aukio '
      + 'on ollut kaupungin keskus siitä asti, kun pääkaupunki siirrettiin '
      + 'tänne 1770-luvulla maanjäristyksen tuhoaman Antiguan tilalle.',
    lisat: [
      {
        tiedosto: 'Paseo de la Sexta, Guatemala City - Dos medios, el mismo camino.jpg',
        vuosi: '2013',
        lahde: 'Alfredo José Ortiz Garcia, Commons (CC BY-SA 2.0)',
        selite: 'Paseo de la Sexta eli kuudes avenue ykkösvyöhykkeellä. Katu oli '
          + 'pitkään autoliikenteen käytössä, kunnes se muutettiin '
          + 'kävelykaduksi; nyt siinä liikutaan jalan ja polkupyörällä.',
      },
      {
        tiedosto: 'Central Market (3746532790).jpg',
        vuosi: '2009',
        lahde: 'Francisco Anzola, Commons (CC BY 2.0)',
        selite: 'Mercado Central Guatemala Cityssä. Torilla myydään ruokaa, '
          + 'kankaita ja käsitöitä, ja se sijaitsee katedraalin takana '
          + 'kaupungin ykkösvyöhykkeellä lähellä pääaukiota.',
      },
      {
        tiedosto: 'View of eruption of Fuego Volcano from Guatemala City.jpg',
        vuosi: '2018',
        lahde: 'Jose Hernandez, Commons (CC BY-SA 2.0)',
        selite: 'Volcán de Fuegon purkaus nähtynä Guatemala Cityn eteläpuolelta '
          + 'kesäkuussa 2018. Etualalla ovat kaupungin eteläosat ja Villa '
          + 'Nuevan naapurikaupunki. Saman kesän purkaus hautasi kokonaisia '
          + 'kyliä tulivuoren rinteillä.',
      },
    ],
    uusi: {
      tiedosto: 'Palacion Nacional de Guatemala 12.jpg',
      vuosi: '2022',
      lahde: 'Simon Burchell, Commons (CC BY-SA 4.0)',
      selite: 'Kansallispalatsi saman aukion laidalla nykyään. Vihertävä rakennus '
        + 'valmistui 1940-luvun alussa hallituksen taloksi, mutta se ei ole '
        + 'enää hallinnon käytössä vaan kulttuurikeskus; aukion nimi on '
        + 'nykyään Plaza de la Constitución.',
    },
  },
  halifax: {
    tiedosto: 'Manager James Adams and most of conductors, drivers, etc., with two open (summer) horse cars, Halifax Street Railway Co., Halifax, N.S., ca. 1894.jpg',
    vuosi: 'noin 1894',
    lahde: 'Nova Scotia Archives (PD)',
    selite: 'Halifax Street Railwayn kuljettajat ja rahastajat vaunuhallin '
      + 'edessä. Etummaisen avovaunun kilvessä lukee Spring Garden Road, ja '
      + 'oikealla odottaa valjastettu hevonen: raitiovaunut kulkivat '
      + 'kaupungissa vielä hevosvoimin.',
    lisat: [
      {
        tiedosto: 'Halifax Boardwalk (41938554701).jpg',
        vuosi: '2017',
        lahde: 'Daryl Mitchell, Commons (CC BY-SA 2.0)',
        selite: 'Sataman puinen kävelyreitti Halifaxin rannassa. Vanhat laiturit '
          + 'ja makasiinit on muutettu kävelykaduksi, ja vastarannalla näkyy '
          + 'Dartmouth.',
      },
      {
        tiedosto: 'Halifax Seaport Farmers Market (44783158350).jpg',
        vuosi: '2018',
        lahde: 'Paulo O, Commons (CC BY 2.0)',
        selite: 'Halifax Seaport Farmers\' Market vanhassa satamarakennuksessa. '
          + 'Kojut ovat teräsristikkokaton alla, joten tori toimii myös Nova '
          + 'Scotian talvessa.',
      },
      {
        tiedosto: 'Halifax Citadel 3597.jpg',
        vuosi: '2024',
        lahde: 'Dionysos1970, Commons (CC BY-SA 4.0)',
        selite: 'Halifaxin linnoituksen vallihauta kaupungin yllä olevalla '
          + 'kukkulalla. Linnoitus rakennettiin merisataman suojaksi, ja se '
          + 'on syy siihen, miksi kukkulan laella ei ole taloja.',
      },
    ],
    uusi: {
      tiedosto: 'Halifax-Dartmouth Ferry Service (21772298471).jpg',
      lahde: 'Tony Webster, Commons (CC BY-SA 2.0)',
      selite: 'Lautta matkalla Dartmouthista Halifaxiin. Autolautat kuljettivat '
        + 'liikenteen salmen yli siihen asti, kunnes ensimmäinen silta '
        + 'valmistui 1954; matkustajalautta kulkee yhä.',
    },
  },
  havanna: {
    tiedosto: 'La Catedral, Habana LCCN90711052.jpg',
    vuosi: '1900',
    lahde: 'Library of Congress (PD)',
    selite: 'Havannan katedraali noin vuonna 1900 käsinvärittynä '
      + 'photochrom-vedoksena. Barokkijulkisivun kellotornit ovat eri '
      + 'levyiset. Photochrom oli valokuvasta kivipainolla tehty värivedos, '
      + 'jollaisia myytiin matkailijoille jo isoisän aikaan.',
    lisat: [
      {
        tiedosto: 'El Malecon Havanna Sunset (16443824281).jpg',
        vuosi: '2014',
        lahde: 'Ashu Mathura, Commons (CC BY-SA 2.0)',
        selite: 'Aalto iskee Malecónin rantamuuriin ukkoskuuron jälkeen. Kuvaaja '
          + 'kertoo kastuneensa läpimäräksi seuraavasta aallosta muutama '
          + 'sekunti tämän jälkeen. Muuri suojaa rantabulevardia, jolla '
          + 'havannalaiset istuvat iltaisin.',
      },
      {
        tiedosto: 'Habana Vieja (35890978074).jpg',
        vuosi: '2015',
        lahde: 'Antonio Schubert, Commons (CC BY-SA 2.0)',
        selite: 'Vanhan Havannan katukuvaa. Auto on vuoden 1956 Ford, jonka '
          + 'kylkilistat on riisuttu pois. Uusien autojen tuonti oli Kuubassa '
          + 'vuosikymmeniä lähes pysähdyksissä, joten 1950-luvun rungot '
          + 'pidettiin ajossa itse tehdyin osin.',
      },
      {
        tiedosto: 'La Habana - Estadio Latinoamericano.jpg',
        vuosi: '2005',
        lahde: 'Goodgirl, Commons (CC BY-SA 2.0 de)',
        selite: 'Estadio Latinoamericano, näkymä sisäkentän yli oikean laidan '
          + 'katsomoon. Baseball on Kuuban seuratuin urheilulaji ja tämä on '
          + 'maan suurin stadion; kotijoukkue Industriales on Havannan oma.',
      },
    ],
    uusi: {
      tiedosto: 'Plaza de la Catedral - Havana - Cuba (18059112736).jpg',
      vuosi: '2015',
      lahde: 'Maxence, Commons (CC BY-SA 2.0)',
      selite: 'Katedraaliaukio vuonna 2015 — sama paikka kuin runsaan sadan '
        + 'vuoden takaisessa vedoksessa. Julkisivu on ennallaan, ja koko '
        + 'vanhakaupunki on Unescon maailmanperintökohde.',
    },
  },
  hawaii: {
    tiedosto: 'Native Hawaiian surfer standing with alaia board (PPWD-19-6-019, original).jpg',
    vuosi: '1898',
    lahde: 'Frank Davey / Hawaii State Archives, Commons (PD)',
    selite: 'Charles Kauha ja hänen alaia-lautansa Waikikin rannalla. Frank Davey '
      + 'kuvasi hänet vuonna 1898 useaan asentoon, mutta yhdessäkään '
      + 'otoksessa Kauha ei ole aalloilla. Alaia oli ohut ja evätön puulauta, '
      + 'ja arkiston mukaan tämä oli yksi viimeisistä.',
    lisat: [
      {
        tiedosto: 'USGS Lava on Makamae Street.jpg',
        vuosi: '2018',
        lahde: 'USGS, Commons (PD)',
        selite: 'Laavavirta etenee Makamae-katua pitkin Leilani Estatesin '
          + 'asuinalueella 6. toukokuuta 2018 kello 9.32 aamulla. Kuvan otti '
          + 'Yhdysvaltain geologian tutkimuskeskus, joka seuraa Kīlaueaa '
          + 'päivittäin; tuon kesän purkaus tuhosi noin 600 taloa.',
      },
      {
        tiedosto: 'Hula dancers (a0007031).jpg',
        vuosi: '2013',
        lahde: 'Thomas Tunsch, Commons (CC BY-SA 4.0)',
        selite: 'Hula kahiko -tanssijoita lavalla Merrie Monarch -festivaalin 50. '
          + 'vuosikerrassa. Kahiko on hulan vanha muoto; saman festivaalin '
          + 'ohjelmassa tanssitaan myös uudempaa ʻauana-tyyliä, jossa pukukin '
          + 'on toisenlainen.',
      },
      {
        tiedosto: 'Paddling the Pacific 121117-F-ZB240-145.jpg',
        vuosi: '2012',
        lahde: 'Mike Meares / Yhdysvaltain ilmavoimat, Commons (PD)',
        selite: 'Yli sata puomikanoottia lähtee liikkeelle Hawaii Kaissa '
          + 'marraskuussa 2012. Varsinaista lähtöviivaa ei ollut: veneet '
          + 'ajautuivat hitaasti eteenpäin, kunnes torvi soi. Matkaa oli '
          + 'kahdeksan ja puoli mailia Oahun rannikkovesissä.',
      },
    ],
    uusi: {
      tiedosto: 'Lots of surfers in the water at Waikiki Beach with cloudy sky and Sheraton Waikiki Beach Resort in the background at Honolulu, Hawaii, United States of America, Summer, 2006.jpg',
      vuosi: '2006',
      lahde: 'Antonio Salsedo, Commons (CC BY 3.0)',
      selite: 'Waikikin ranta heinäkuussa 2006. Vedessä on kymmenittäin '
        + 'lautailijoita ja rannalla hotellirivi; juuri tällä rannalla Frank '
        + 'Davey kuvasi Charles Kauhan alaia-lautoineen runsaat sata vuotta '
        + 'aiemmin.',
    },
  },
  houston: {
    tiedosto: 'Lewis Hine, J.T. Marshall, Western Union messenger no. 51, Houston, Texas, 1913.jpg',
    vuosi: '1913',
    lahde: 'Lewis Hine, Library of Congress (PD)',
    selite: 'Yksitoistavuotias Western Unionin sähkelähetti J. T. Marshall '
      + 'Houstonissa lokakuussa 1913. Lewis Hine kiersi Yhdysvaltoja '
      + 'kuvaamassa lapsityötä kansallisen lapsityökomitean lukuun, ja hänen '
      + 'kuviaan käytettiin lakialoitteiden perusteluina.',
    lisat: [
      {
        tiedosto: 'Greens Port.jpg',
        vuosi: '2022',
        lahde: 'WRaTeLog, Commons (CC BY-SA 4.0)',
        selite: 'Greens Portin terminaali Houstonin laivaväylällä. Kaivettu väylä '
          + 'yhdistää sisämaassa sijaitsevan kaupungin Meksikonlahteen ja '
          + 'tekee siitä satamakaupungin, vaikka merta ei näy.',
      },
      {
        tiedosto: 'Taqueria Arandas 2014 on Irvington in Houston-1.jpg',
        vuosi: '2014',
        lahde: 'EricEnfermero, Commons (CC BY-SA 3.0)',
        selite: 'Taqueria Arandasin alkuperäinen ravintola Irvington Drivella. '
          + 'Paikka avattiin 1980-luvun alussa ja kasvoi sittemmin '
          + 'ravintolaketjuksi.',
      },
      {
        tiedosto: 'NRG Park in Houston, Texas (The 2026 Houston Livestock Show and Rodeo).jpg',
        vuosi: '2026',
        lahde: 'Alexis Doine, Commons (CC0)',
        selite: 'NRG Parkin alue Houstonin karjanäyttelyn ja rodeon aikaan. '
          + 'Tapahtuma kestää kolmisen viikkoa keväällä ja on yksi maailman '
          + 'suurimmista lajissaan; karjanäyttely on sen alkuperäinen ydin.',
      },
    ],
    uusi: {
      tiedosto: 'Downtown Houston, TX Skyline - 2018.jpg',
      lahde: 'David Daniel Turner, Commons (CC BY 4.0)',
      selite: 'Houstonin keskusta lännestä Buffalo Bayoun yli katsottuna. Houston '
        + 'on Yhdysvaltain suurista kaupungeista ainoa, jolla ei ole '
        + 'kaavoituslakia, ja korkeat talot nousevat siksi hajanaisina '
        + 'ryppäinä.',
    },
  },
  iqaluit: {
    lisat: [
      {
        tiedosto: 'Iqlauit waterfront.JPG',
        vuosi: '2011',
        lahde: 'Sebastian Kasten, Commons (CC BY-SA 3.0)',
        selite: 'Iqaluitin ranta Frobisherinlahdella elokuussa. Avoimet '
          + 'alumiiniveneet ovat ankkurissa aivan rannan tuntumassa, ja '
          + 'niiden takana nousee kaupunki värikkäine taloineen. Puita ei '
          + 'näy: Iqaluit on selvästi puurajan pohjoispuolella.',
      },
      {
        tiedosto: 'Throat Singing (5878138705).jpg',
        vuosi: '2011',
        lahde: 'US Embassy Canada, Commons (CC BY 2.0)',
        selite: 'Kaksi laulajaa kurkkulaulun eli katajjaqin äärellä. Laulajat '
          + 'seisovat vastakkain aivan lähekkäin ja vuorottelevat '
          + 'hengitysäänin, kunnes toinen antaa periksi. Perinteisesti kyse '
          + 'on ollut naisten leikkimielisestä kilpailusta.',
      },
      {
        tiedosto: 'Hunter\'s Market (Iqaluit).jpg',
        vuosi: '2025',
        lahde: 'OhanaUnited, Commons (CC BY-SA 4.0)',
        selite: 'Hunter\'s Market, pieni ruokakauppa ja noutoravintola Iqaluitin '
          + 'keskustassa. Talo on nostettu irti maasta puisen kuistin ja '
          + 'portaiden varaan. Kyltissä lukee sama asia englanniksi ja '
          + 'inuktitutin tavumerkein: inuktitut on Nunavutin virallisia '
          + 'kieliä.',
      },
    ],
    uusi: {
      tiedosto: 'Iqaluit from Joamie Hill.JPG',
      vuosi: '2010',
      lahde: 'Aaron M Lloyd, Commons (public domain)',
      selite: 'Iqaluit Joamie Hillin päältä toukokuussa. Talot on maalattu '
        + 'kirkkain värein lumen ja harmaan kallion keskellä, ja etualalla on '
        + 'varastovaja tavaroineen. Iqaluit on Nunavutin pääkaupunki ja koko '
        + 'territorion ainoa varsinainen kaupunki.',
    },
  },
  labrador: {
    tiedosto: 'Labrador, the country and the people (1909) (14779270504).jpg',
    vuosi: '1909',
    lahde: 'Wilfred Grenfell: Labrador, the country and the people (1909), Internet Archive / Commons (PD)',
    selite: 'Kalastuslaivasto liputettuna vastassa lähetysveneen tuloa Labradorin '
      + 'rannikolla. Kuvalaatta on lääkäri Wilfred Grenfellin kirjasta; hänen '
      + 'lähetyksensä kiersi rannikkoa veneellä ja toi lääkärinavun hajallaan '
      + 'oleviin kalastajakyliin, joihin ei päässyt maitse.',
    lisat: [
      {
        tiedosto: 'Nain Moravian Church, Labrador, July 2023.jpg',
        vuosi: '2023',
        lahde: 'Quincylvania, Commons (CC0)',
        selite: 'Nainin herrnhutilainen kirkko Nunatsiavutissa, Labradorin '
          + 'pohjoisimmassa asutuskeskuksessa. Kyltissä lukee perustamisvuosi '
          + '1771 sekä inuktituniksi että englanniksi: saksalaislähtöiset '
          + 'herrnhutilaislähetit aloittivat täällä, ja seurakunta on yhä '
          + 'samalla paikalla.',
      },
      {
        tiedosto: 'Nachvak Fjord on a sunny September day.jpg',
        vuosi: '2022',
        lahde: 'WiseWoman, Commons (CC BY-SA 4.0)',
        selite: 'Nachvakin vuono Torngatin vuorten kansallispuistossa. Vuoret '
          + 'nousevat suoraan merestä Labradorin pohjoiskärjessä, eikä '
          + 'alueella ole kyliä eikä teitä.',
      },
    ],
    uusi: {
      tiedosto: 'BattleHarbour Labrador 2008.JPG',
      lahde: 'Paul Gierszewski, Commons (PD)',
      selite: 'Battle Harbourin puiset varasto- ja käsittelyrakennukset sumussa '
        + 'saarella Labradorin etelärannikolla. Paikka oli vuosisatojen ajan '
        + 'turskakalastuksen tukikohta, jossa saalis suolattiin ennen '
        + 'laivausta.',
    },
  },
  losangeles: {
    tiedosto: 'Broadway and Third Street, looking east on Third Street from Olive Street, Los Angeles, 1890-1900 (CHS-2858).jpg',
    vuosi: '1890-luku',
    lahde: 'California Historical Society, USC (PD)',
    selite: 'Näkymä Third Streetiä itään kohti Broadwayn risteystä 1890-luvun Los '
      + 'Angelesissa. Kadut ovat täynnä hevosvaunuja ja jalankulkijoita, ja '
      + 'oikealla näkyy Bradbury Building, joka on yhä paikallaan. '
      + 'Valokuvaaja Charles C. Pierce.',
    lisat: [
      {
        tiedosto: 'Grand Central Market - Downtown Los Angeles - California - USA (33316414168).jpg',
        vuosi: '2019',
        lahde: 'Adam Jones, Commons (CC BY-SA 2.0)',
        selite: 'Grand Central Market Broadwayn varrella. Kauppahalli avattiin '
          + '1917, ja sen kojuriveillä myydään yhä ruokaa tiskin yli — nyt '
          + 'enimmäkseen valmiina annoksina.',
      },
      {
        tiedosto: 'Food truck Tacos Super Gallito (Westwood Bld X Santa Monica Bld).jpg',
        vuosi: '2024',
        lahde: 'Alexis Doine, Commons (CC0)',
        selite: 'Taco-auto Westwood Boulevardin ja Santa Monica Boulevardin '
          + 'kulmassa. Kuorma-autosta myytävä ruoka on Los Angelesissa oma '
          + 'keittiönsä, ja autot pysähtyvät iltaisin samoihin kulmiin.',
      },
      {
        tiedosto: 'Los Angeles Theatre on Broadway.jpg',
        vuosi: '2017',
        lahde: 'Codera23, Commons (CC BY-SA 4.0)',
        selite: 'Los Angeles Theatre Broadwayn teatterikorttelissa. '
          + 'Elokuvapalatsi avattiin 1930-luvun alussa, ja korttelissa on '
          + 'säilynyt poikkeuksellisen tiheä rivi tämän kokoluokan '
          + 'teattereita.',
      },
    ],
    uusi: {
      tiedosto: 'Broadway Theater and Commercial District, 300-849 S. Broadway; 100.jpg',
      lahde: 'MikeJiroch, Commons (CC BY-SA 3.0)',
      selite: 'Sama Broadway nykyään. Katu säilyi kaupungin liikekeskuksena '
        + 'teatteriaikaan asti; sittemmin liikkeet muuttivat muualle ja kadun '
        + 'vanhat julkisivut jäivät paikoilleen.',
    },
  },
  managua: {
    tiedosto: 'Nicaragua. National Palace, Managua LCCN2016820953.jpg',
    vuosi: '1910-luku',
    lahde: 'National Photo Company / Library of Congress (PD)',
    selite: 'Managuan kansallispalatsi 1910-luvulla lasinegatiivilta. Nicaraguan '
      + 'pääkaupunki oli tuolloin pieni järvenrantakaupunki. Keskusta on sen '
      + 'jälkeen sortunut kahdesti maanjäristyksessä, vuosina 1931 ja 1972.',
    lisat: [
      {
        tiedosto: 'Old Managua Cathedral (3).jpg',
        vuosi: '2016',
        lahde: 'Byralaal, Commons (CC BY-SA 4.0)',
        selite: 'Vanha katedraali Managuan keskustassa. Kirkko vaurioitui vuoden '
          + '1972 maanjäristyksessä eikä ole enää käytössä, mutta se '
          + 'jätettiin paikalleen; kuvaajan mukaan managualaiset tulevat '
          + 'katsomaan sitä joka viikonloppu.',
      },
      {
        tiedosto: 'MALECON SALVADOR ALLENDE, LAGO XOLOTLAN. MANAGUA, NICARAGUA - panoramio.jpg',
        vuosi: '2010',
        lahde: 'feinteriano, Commons (CC BY-SA 3.0)',
        selite: 'Salvador Allenden rantabulevardi Xolotlán-järven rannassa. '
          + 'Managua on rakennettu järven etelärannalle, ja rantapuisto on '
          + 'kaupunkilaisten kokoontumispaikka iltaisin.',
      },
      {
        tiedosto: 'Metro Managua trffic.jpg',
        vuosi: '2016',
        lahde: 'Byralaal, Commons (CC BY-SA 4.0)',
        selite: 'Liikennettä Managuan uudessa keskuksessa. Kun vanha keskusta '
          + 'tuhoutui 1972, kaupunki hajaantui leveiden teiden varrelle eikä '
          + 'yhtenäistä ydintä rakennettu tilalle — osoitteet annetaan yhä '
          + 'maamerkkien mukaan.',
      },
    ],
    uusi: {
      tiedosto: 'Plaza de la Revolucion (Managua) 01 CH.jpg',
      vuosi: '2016',
      lahde: 'Martin Thurnherr, Commons (CC BY-SA 4.0)',
      selite: 'Vallankumouksen aukio nykyään, laidoillaan vanha katedraali ja '
        + 'kansallispalatsi. Aukio on yhä sama kuin sadan vuoden takaisessa '
        + 'kuvassa, mutta rakennukset sen ympärillä ovat järistysten jälkeen '
        + 'toiset.',
    },
  },
  merida: {
    tiedosto: 'Merida Yucatan Stereo 1901 cropped.jpg',
    vuosi: '1901',
    lahde: 'Underwood & Underwood / Library of Congress (PD)',
    selite: 'Mérida vuonna 1901, kuvattuna vanhan San Beniton linnoituksen '
      + 'muureilta stereokorttia varten. Etualalla on Lucas de Gálvezin tori '
      + 'kaksine kioskeineen ja tuulimylly, joka nosti kaupunkilaisille '
      + 'vettä; taustalla vasemmalla näkyy katedraali.',
    lisat: [
      {
        tiedosto: 'Paseo de Montejo, Merida Yucatan Mexico 02.jpg',
        vuosi: '2017',
        lahde: 'Travel4Brews, Commons (CC BY 2.0)',
        selite: 'Huvila Paseo de Montejon varrella. Leveä puistokatu ja sen '
          + 'palatsimaiset talot rakennettiin sisalin eli henekenin viennin '
          + 'rahoilla, kun Yucatánin köysikuitu meni maailmanmarkkinoille.',
      },
      {
        tiedosto: 'Hacienda Sotuta de Peón - Secado.jpg',
        vuosi: '2017',
        lahde: 'Gildardo Sánchez, Commons (CC BY 2.0)',
        selite: 'Henekenkuitua kuivumassa Sotuta de Peónin haciendalla. Agaavin '
          + 'lehdistä irrotettu kuitu levitetään telineille aurinkoon ennen '
          + 'kuin siitä kierretään köyttä. Tämä työ rahoitti Méridan komeat '
          + 'kadut.',
      },
      {
        tiedosto: 'Mercado - Mérida, Yucatán, 12 Mayo 2015.jpg',
        vuosi: '2015',
        lahde: 'Bex Walton, Commons (CC BY 2.0)',
        selite: 'Torikojuja Méridassa. Yucatánin keittiö eroaa muusta Meksikosta: '
          + 'mausteena on achiote eli annaton siemen, ja sen ansiosta liha ja '
          + 'riisi saavat tiilenpunaisen värin.',
      },
    ],
    uusi: {
      tiedosto: 'Mercado Municipal Lucas de Gálvez - Mérida, Yucatán.jpg',
      vuosi: '2015',
      lahde: 'Bex Walton, Commons (CC BY 2.0)',
      selite: 'Lucas de Gálvezin tori nykyään — sama tori, joka näkyy vuoden 1901 '
        + 'stereokuvan etualalla. Kojut ovat siirtyneet katosten ja hallien '
        + 'alle, mutta paikka on yhä kaupungin keskeisin kauppapaikka.',
    },
  },
  mexico: {
    tiedosto: 'Lavanderas, Mexico City, ca. 1900.jpg',
    vuosi: '1890-luku',
    lahde: 'William Henry Jackson / Library of Congress (PD)',
    selite: 'Pyykkärit työssään Mexico Cityssä. Photochrom-vedos on tehty William '
      + 'Henry Jacksonin valokuvasta, ja pyykki pestään yhteisillä altailla. '
      + 'Kaupunki on rakennettu kuivatun järven pohjalle, joten vettä '
      + 'johdettiin kanavia ja altaita pitkin.',
    lisat: [
      {
        tiedosto: 'Trajineras en Xochimilco.jpg',
        vuosi: '2018',
        lahde: 'Ralibreros112, Commons (CC BY-SA 4.0)',
        selite: 'Trajineroita eli kukkakaarilla koristeltuja lauttaveneitä '
          + 'Xochimilcon kanavissa. Kanavat ovat jäänne siitä järvestä ja sen '
          + 'kelluvista viljelylautoista, joiden päälle kaupunki aikanaan '
          + 'rakennettiin.',
      },
      {
        tiedosto: 'Metro Patriotismo de la Lína 9 del Metro de la Ciudad de México 17.jpg',
        vuosi: '2025',
        lahde: 'ProtoplasmaKid, Commons (CC BY-SA 4.0)',
        selite: 'Juna saapuu Patriotismon asemalle linjalla 9, ja matkustajat '
          + 'valmistautuvat nousemaan kyytiin. Jokaisella Mexico Cityn '
          + 'metroasemalla on nimen lisäksi oma kuvatunnuksensa — alun perin '
          + 'siksi, etteivät kaikki matkustajat osanneet lukea.',
      },
      {
        tiedosto: 'Alebrijes en la catedral.jpg',
        vuosi: '2019',
        lahde: 'Stargeiser01, Commons (CC BY-SA 4.0)',
        selite: 'Jättiläisalebrijeitä katedraalin edustalla. Alebrije on '
          + 'paperimassasta ja rautalangasta tehty kirjava '
          + 'mielikuvitusolento; vuosittainen kulkue lähtee Zócalolta ja '
          + 'kulkee kaupungin halki.',
      },
    ],
    uusi: {
      tiedosto: 'Bandera en plancha del Zocalo.JPG',
      vuosi: '2013',
      lahde: 'Reviloiasi, Commons (CC BY-SA 3.0)',
      selite: 'Zócalo iltapäivällä. Aukion keskellä liehuu suuri lippu, joka '
        + 'lasketaan salosta joka ilta. Sama aukio oli jo atsteekkien '
        + 'Tenochtitlánin keskus, ja sen laidalta on kaivettu esiin Templo '
        + 'Mayorin perustukset.',
    },
  },
  miami: {
    tiedosto: 'Indians canoeing on Miami River - J.N. Chamberlain, photographer, Miami, Fla. LCCN00650881.jpg',
    vuosi: '1904',
    lahde: 'Library of Congress (PD)',
    selite: 'Alkuperäisasukkaita ruuhissa Miami-joella vuonna 1904. Joki oli '
      + 'reitti Evergladesin suoalueelta Biscayne Bayn rannalle, ja sitä '
      + 'pitkin tuotiin tavaraa kaupunkiin. Miami oli tuolloin nuori paikka: '
      + 'se sai kaupunkioikeudet vasta 1896.',
    lisat: [
      {
        tiedosto: 'Little Havana Domino Club Park Calle Ocho.JPG',
        vuosi: '2010',
        lahde: 'Infrogmation, Commons (CC BY-SA 3.0)',
        selite: 'Dominopeliä Calle Ocholla Little Havanassa. Puisto on '
          + 'kuubalaissiirtolaisten kokoontumispaikka, ja kadun nimi '
          + 'tarkoittaa yksinkertaisesti kahdeksatta katua.',
      },
      {
        tiedosto: 'Art Deco Hotels Ocean Drive South Beach.jpg',
        vuosi: '2025',
        lahde: 'Phillip Pessar, Commons (CC BY 4.0)',
        selite: 'Ocean Driven hotellirivi Miami Beachilla. Talot ovat 1930-luvun '
          + 'art deco -tyyliä, ja korttelit säästettiin purkamiselta, kun '
          + 'alue suojeltiin kokonaisuutena.',
      },
      {
        tiedosto: 'April 7, 2015 - Little Havana, Miami, Florida - Exquisito.jpg',
        vuosi: '2015',
        lahde: 'osseous, Commons (CC BY 2.0)',
        selite: 'Kuubalainen ravintola Calle Ocholla. Little Havanan korttelit '
          + 'kasvoivat 1960-luvulta alkaen Kuubasta muuttaneiden ympärille, '
          + 'ja espanja on kadulla arkikieli.',
      },
    ],
    uusi: {
      tiedosto: 'Miami River Downtown Miami Florida 1 May 2023.jpg',
      lahde: 'Phillip Pessar, Commons (CC BY 2.0)',
      selite: 'Sama Miami-joki nykyään keskustan kohdalla. Rannat ovat täynnä '
        + 'tornitaloja, mutta joki on yhä työssä: sen varressa lastataan '
        + 'rahtia pienille aluksille, jotka liikennöivät Karibialle.',
    },
  },
  monterrey: {
    tiedosto: '15177-Monterrey-1912-Fabrik Guido Moebius-Brück & Sohn Kunstverlag.jpg',
    vuosi: '1912',
    lahde: 'Brück & Sohn Kunstverlag, Meissen, Commons (CC0)',
    selite: 'Guido Moebiuksen tehdas Monterreyssä postikortissa vuodelta 1912. '
      + 'Kortin painoi saksalainen kustantamo Brück & Sohn Meissenissä — '
      + 'meksikolaisiakin näkymiä painettiin tuohon aikaan Saksassa asti. '
      + 'Monterrey oli jo silloin maan teollisuuskaupunki.',
    lisat: [
      {
        tiedosto: 'Horno 3, Parque Fundidora - panoramio.jpg',
        vuosi: '2013',
        lahde: 'JavierDo, Commons (CC BY-SA 3.0)',
        selite: 'Masuuni numero 3 Parque Fundidorassa. Monterreyn terästehdas '
          + 'toimi tällä paikalla 1900-luvun alusta 1986 asti; kun tuotanto '
          + 'loppui, alue muutettiin puistoksi ja masuuni jätettiin '
          + 'paikalleen museoksi.',
      },
      {
        tiedosto: 'Cerro de La Silla on a warm day (Unsplash).jpg',
        vuosi: '2015',
        lahde: 'Hafid Davila, Commons (CC0)',
        selite: 'Cerro de la Silla kohoaa Monterreyn itäpuolella. Nimi tarkoittaa '
          + 'satulaa: harjanteen kaksi huippua ja niiden välinen notko '
          + 'muistuttavat satulaa sivulta katsottuna. Vuori on kaupungin '
          + 'tunnus.',
      },
      {
        tiedosto: 'Paseo Santa Lucía - Santa Lucía Riverwalk.jpg',
        vuosi: '2008',
        lahde: 'México en Fotos, Commons (CC BY-SA 2.0)',
        selite: 'Paseo Santa Lucía, keinotekoinen kanava keskustan Macroplazalta '
          + 'Fundidoran puistoon. Väylää on 2,5 kilometriä ja sitä pitkin '
          + 'kulkee myös veneitä; kuvaajan mukaan se on Latinalaisen Amerikan '
          + 'pisin keinojoki.',
      },
    ],
    uusi: {
      tiedosto: 'Cerro de La Silla y Faro del Comercio desde el aire.jpg',
      vuosi: '2023',
      lahde: 'ProtoplasmaKid, Commons (CC BY 4.0)',
      selite: 'Ilmakuva Macroplazan yltä: etualalla Faro del Comercio -monumentti '
        + 'ja taustalla Cerro de la Silla. Kaupunki on levinnyt laaksoon '
        + 'vuorten väliin, ja tehtaiden ympärille kasvanut Monterrey ulottuu '
        + 'nyt rinteille asti.',
    },
  },
  montreal: {
    tiedosto: 'Jacques Cartier Square. Montreal LCCN2017659148.jpg',
    vuosi: '1901',
    lahde: 'Library of Congress (PD)',
    selite: 'Place Jacques-Cartier torikauppapäivänä: hevoskärryt seisovat '
      + 'kahdessa rivissä, tavaraa on tynnyreissä ja säkeissä, ja aukion '
      + 'yläpäässä kohoaa Nelsonin pylväs. Käsinväritetty photochrom-vedos, '
      + 'jollaisia myytiin matkamuistoksi.',
    lisat: [
      {
        tiedosto: 'Marché Jean-Talon 05-11-2024.jpg',
        vuosi: '2024',
        lahde: 'Brandon Moore, Commons (CC BY 4.0)',
        selite: 'Jean-Talonin halli Villerayn kaupunginosassa. Kojujen kylteissä '
          + 'on tilojen nimet: myyjät ovat usein viljelijöitä, jotka tuovat '
          + 'satonsa itse kaupunkiin.',
      },
      {
        tiedosto: 'St-Viateur Bagel 3.jpg',
        vuosi: '2013',
        lahde: 'Bohemian Baltimore, Commons (CC BY-SA 4.0)',
        selite: 'St-Viateur Bagel Mile Endin kaupunginosassa. Ikkunassa lukee '
          + 'vuosiluku 1957 ja ovessa "ouvert 24 h": leipomo paistaa '
          + 'puu-uunissa vuorokauden ympäri, ja Montrealin bageli on ohuempi '
          + 'ja makeampi kuin newyorkilainen.',
      },
    ],
    uusi: {
      tiedosto: 'Place Jacques-Cartier, Vieux-Montréal, Montreal, Quebec (30068046525).jpg',
      lahde: 'Ken Lund, Commons (CC BY-SA 2.0)',
      selite: 'Sama aukio nykyään. Kärryjen tilalla on terasseja ja '
        + 'katutaiteilijoita, mutta rinne, kiveys ja pylväs ovat entisellään; '
        + 'vanha kaupunki suojeltiin kokonaisuutena 1960-luvulla.',
    },
  },
  mountrushmore: {
    tiedosto: 'Mount Rushmore unrestored.jpg',
    vuosi: 'noin 1932',
    lahde: 'Rise Studio, Rapid City / Library of Congress (PD)',
    selite: 'Työmiehet kiipeävät tikkaita George Washingtonin kasvoilla, kun '
      + 'veistos on vielä kesken. Kuvaan on kirjoitettu käsin "Workmen on '
      + 'face of Geo. Washington"; kalliota muotoiltiin dynamiitilla ja '
      + 'poravasaroilla, ja miehet laskeutuivat työhön vaijerien varassa.',
    lisat: [
      {
        tiedosto: 'American Indian Dancers at Mount Rushmore - panoramio.jpg',
        vuosi: '2008',
        lahde: 'Jason Rollette, Commons (CC BY 3.0)',
        selite: 'Intiaanitanssijoita esiintymässä Mount Rushmoren alueella. Black '
          + 'Hills on lakotoille pyhää maata, ja veistos on hakattu vuoreen, '
          + 'josta heidät aikanaan siirrettiin pois.',
      },
      {
        tiedosto: 'Crazy Horse Memorial from Visitors Center.jpg',
        vuosi: '2018',
        lahde: 'Jeffreylcooke, Commons (CC BY-SA 4.0)',
        selite: 'Crazy Horse Memorial samassa vuoristossa. Lakotapäällikköä '
          + 'esittävää veistosta on louhittu vuodesta 1948, se on yhä kesken '
          + 'ja rahoitetaan ilman valtion tukea.',
      },
      {
        tiedosto: 'Mount Rushmore and the Avenue of Flags SD.jpg',
        vuosi: '2012',
        lahde: 'MPSharwood, Commons (CC BY-SA 4.0)',
        selite: 'Lippukäytävä johtaa kohti veistosta. Käytävällä liehuu jokaisen '
          + 'osavaltion ja alueen lippu, ja se rakennettiin ohjaamaan '
          + 'kävijävirta yhtä reittiä näköalatasanteelle.',
      },
    ],
    uusi: {
      tiedosto: 'Mount Rushmore from Grand View Terrace.jpg',
      lahde: 'Jntman5621, Commons (CC BY-SA 4.0)',
      selite: 'Valmis veistos näköalatasanteelta. Neljä päätä hakattiin vuoreen '
        + 'vuosina 1927–1941, ja alkuperäinen suunnitelma vartaloista jäi '
        + 'toteuttamatta rahan loppuessa.',
    },
  },
  neworleans: {
    tiedosto: 'Old French Market New Orleans Wagons W H Jackson.jpg',
    vuosi: '1880–1895',
    lahde: 'Library of Congress (PD)',
    selite: 'Vanha Ranskalainen tori 1800-luvun lopun New Orleansissa: '
      + 'puuvillakuormia ja muita kärryjä mukulakivikadulla, taustalla '
      + 'rautakauppa ja vaateliikkeitä. Tori sijaitsee Mississippin rannassa '
      + 'vanhassa ranskalaisessa korttelissa. Valokuvaaja William Henry '
      + 'Jackson.',
    lisat: [
      {
        tiedosto: 'TBC Brass Band horn line Uptown Swingers Social Aid & Pleasure Club parade, New Orleans 2008.jpg',
        vuosi: '2008',
        lahde: 'Derek Bridges, Commons (CC BY 2.0)',
        selite: 'Torvisektio Uptown Swingers -kerhon kulkueessa. Tällaiset seurat '
          + 'syntyivät avustuskassoiksi, jotka maksoivat jäsentensä '
          + 'hautajaiset ja sairaanhoidon; kulkueen perässä kulkevaa väkeä '
          + 'kutsutaan nimellä second line.',
      },
      {
        tiedosto: 'Beignets served at Café du Monde, New Orleans, April 2014.jpg',
        vuosi: '2014',
        lahde: 'Sunnya343, Commons (CC BY-SA 4.0)',
        selite: 'Beignet-munkkeja tomusokerissa Café du Mondessa Ranskalaisen '
          + 'torin laidalla. Talon kahvi maustetaan sikurilla, tavasta joka '
          + 'juontuu ajoista jolloin kahvipavuista oli pulaa.',
      },
      {
        tiedosto: 'St Charles Avenue Uptown New Orleans with streetcar 460, December 2024.jpg',
        vuosi: '2024',
        lahde: 'Infrogmation, Commons (CC BY-SA 4.0)',
        selite: 'Raitiovaunu St Charles Avenuella. Linja on yksi maailman '
          + 'vanhimpia yhä liikennöiviä raitiotielinjoja, ja sen vihreät '
          + 'puuvaunut ovat 1920-luvulta.',
      },
    ],
    uusi: {
      tiedosto: 'City of New Orleans, The French Market, March 2015.jpg',
      lahde: 'Steve Knight, Commons (CC BY 2.0)',
      selite: 'Ranskalainen tori nykyään. Kärryjen ja puuvillan tilalla myydään '
        + 'ruokaa ja matkamuistoja, mutta katettu hallirivi kulkee yhä samaa '
        + 'linjaa Decatur Streetin varressa.',
    },
  },
  newyork: {
    tiedosto: 'NYC Mulberry Street 3g04637u.jpg',
    vuosi: 'noin 1900',
    lahde: 'Library of Congress (PD)',
    selite: 'Mulberry Street Manhattanilla noin vuonna 1900: katu on täynnä '
      + 'kärryjä, kojuja ja kaupustelijoita. Kortteli oli '
      + 'italialaissiirtolaisten keskus, ja tori levisi ajoradalle asti. Kuva '
      + 'on photochrom-vedos eli mustavalkoisesta negatiivista '
      + 'kivipainolevyille väritetty painate, jollaisia myytiin '
      + 'matkamuistoksi.',
    lisat: [
      {
        tiedosto: 'USA san gennaro feast NY.jpg',
        vuosi: '2004',
        lahde: 'Daniel Schwen, Commons (CC BY 2.5)',
        selite: 'San Gennaron juhla Grand Streetin ja Mulberry Streetin kulmassa '
          + 'Little Italyssa. Juhlaa vietetään samalla kadulla kuin sata '
          + 'vuotta sitten, ja se on omistettu Napolin suojeluspyhimykselle.',
      },
      {
        tiedosto: 'Street Vendors on Canal Street, Chinatown, New York (7237369622).jpg',
        vuosi: '2012',
        lahde: 'Ken Lund, Commons (CC BY-SA 2.0)',
        selite: 'Katumyyjiä Canal Streetillä. Katu kulkee halki alemman '
          + 'Manhattanin ja muodostaa Chinatownin selkärangan; se on myös '
          + 'raja, joka erottaa korttelit Little Italysta.',
      },
      {
        tiedosto: 'Staten Island Ferry - New York, NY, USA - August 19, 2015 01.jpg',
        vuosi: '2015',
        lahde: 'Giorgio Galeotti, Commons (CC BY 4.0)',
        selite: 'Staten Islandin lautta Verrazzano-salmen sillan edustalla. '
          + 'Lautta kuljettaa työmatkalaisia Manhattanin kärjestä Staten '
          + 'Islandille, ja matkustajilta ei peritä maksua.',
      },
    ],
    uusi: {
      tiedosto: 'Little Italy, Mulberry Street, Manhattan, New York (7237377196).jpg',
      lahde: 'Ken Lund, Commons (CC BY-SA 2.0)',
      selite: 'Sama Mulberry Street nykyään. Kojujen tilalla on ravintoloita ja '
        + 'terasseja, ja italiankielinen kortteli on kutistunut muutaman '
        + 'korttelin mittaiseksi, kun asukkaat muuttivat vuosikymmenten '
        + 'mittaan muualle.',
    },
  },
  nome: {
    tiedosto: 'Nome Alaska 1900.jpg',
    vuosi: '1900',
    lahde: 'Carrie M. McLain Memorial Museum, Commons (PD)',
    selite: 'Front Street 17. heinäkuuta 1900, keskellä kultaryntäystä. '
      + 'Vasemmalla kohoaa Dexter Saloon, kaupungin ensimmäinen '
      + 'kaksikerroksinen puutalo; sen omisti Wyatt Earp yhdessä Charles E. '
      + 'Hoxien kanssa. Nomeen tultiin siksi, että kultaa löytyi myös '
      + 'rantahiekasta, eikä kaivosmiehen tarvinnut lähteä kaupungista '
      + 'minnekään.',
    lisat: [
      {
        tiedosto: 'Iditarod 2013 (8572097753).jpg',
        vuosi: '2013',
        lahde: 'Bering Land Bridge National Preserve, Commons (CC BY 2.0)',
        selite: 'Jeff Kingin valjakko tulee pahkakaaren alle yöllä '
          + 'Iditarod-ajossa 2013. Nome on kilpailun maali: valjakot lähtevät '
          + 'Anchoragen seudulta ja saapuvat tänne siinä järjestyksessä kuin '
          + 'ehtivät, usein keskellä yötä.',
      },
      {
        tiedosto: 'Coast Guard conducts gold dredge boardings in Nome, Alaska 140803-G-YE680-669.jpg',
        vuosi: '2014',
        lahde: 'Grant DeVuyst / Yhdysvaltain rannikkovartiosto, Commons (PD)',
        selite: 'Rannikkovartiosto nousee kullankaivuulautan kannelle Nomen '
          + 'edustalla. Lautan mastossa liehuu punavalkoinen sukeltajalippu: '
          + 'pohjahiekka nostetaan vedenalaisesta imusta kannen seulastoon. '
          + 'Kultaa haetaan siis yhä, mutta nyt meren pohjasta.',
      },
      {
        tiedosto: 'Post Office in Nome, AK.jpg',
        vuosi: '2018',
        lahde: 'Quintin Soloviev, Commons (CC BY 4.0)',
        selite: 'Nomen postitoimisto sisältä: seinällinen postilokeroita ja '
          + 'niiden vieressä palvelutiski. Kaupunkiin ei johda maantietä '
          + 'muualta Alaskasta, joten posti ja tavara tulevat lentokoneella '
          + 'tai kesällä laivalla.',
      },
    ],
    uusi: {
      tiedosto: 'Nome Alaska front street snow.jpg',
      vuosi: '2006',
      lahde: 'ra64, Commons (CC BY-SA 2.0)',
      selite: 'Sama Front Street maaliskuussa. Lumi on kasattu valliksi kadun '
        + 'reunaan ja kone työntää sitä yhä kadun päässä. Kuvaajan mukaan '
        + 'juuri tämän näkymän Iditarodin maaliin ajava valjakko kohtaa.',
    },
  },
  nuuk: {
    tiedosto: 'No-nb bldsa 3b158.jpg',
    vuosi: '1888–1889',
    lahde: 'Fridtjof Nansen / Norjan kansalliskirjasto, Commons (PD)',
    selite: 'Näkymä Godthåbiin: kajakkeja vedessä, ihmisryhmä kalliolla ja '
      + 'vastarannalla kirkontorni ja puutalot. Kuvan otti Fridtjof Nansen, '
      + 'joka hiihti seurueineen Grönlannin poikki 1888. Retkikunta joutui '
      + 'talvehtimaan täällä, ja Nansen käytti talven tutustumalla inuiittien '
      + 'elämään ja valokuvaamalla sitä.',
    lisat: [
      {
        tiedosto: 'Hans Egede statue, old church, old hospital and other buildings in Nuuk, seen from Radiofjeldet.jpg',
        vuosi: '2020',
        lahde: 'Vikebe, Commons (CC0)',
        selite: 'Nuukin vanha osa talvella: punainen kirkko, kolonia-ajan '
          + 'puutalot ja kukkulalla Hans Egeden patsas. Norjalainen pappi '
          + 'Egede perusti tänne lähetys- ja kauppa-aseman 1720-luvulla, ja '
          + 'siitä kasvoi Godthåb, nykyinen Nuuk.',
      },
      {
        tiedosto: 'Greenland 10, Nuuk, harbour, Kilisaatinut.JPG',
        vuosi: '2011',
        lahde: 'Vincent van Zeijst, Commons (CC BY-SA 3.0)',
        selite: 'Kevät Nuukin satamassa: lumesta paljastuu auto, joka on ollut '
          + 'kinoksen alla koko talven. Taustalla on kalastusveneiden '
          + 'laituri, ja kallion päälle on rakennettu kerrostaloja, joihin '
          + 'noustaan puuportaita pitkin.',
      },
      {
        tiedosto: 'Katuaq 2023.jpg',
        vuosi: '2023',
        lahde: 'ThatGuyOnline, Commons (CC BY-SA 4.0)',
        selite: 'Katuaq, Grönlannin kulttuuritalo Nuukin keskustassa. Talossa on '
          + 'konserttisali, elokuvateatteri ja kahvila. Aaltoilevan '
          + 'puujulkisivun on kerrottu jäljittelevän revontulten liikettä.',
      },
    ],
    uusi: {
      tiedosto: 'Nuup Kangerlua and Nuuk (2) (Kenny McFly).jpg',
      vuosi: '2022',
      lahde: 'Kenny McFly, Commons (CC BY-SA 4.0)',
      selite: 'Sama vuono nykyään: Nuup Kangerlua ja sen takana avautuvat vuoret. '
        + 'Etualalla on kerrostaloja aivan kallion reunalla, ja kaukana '
        + 'niemen kärjessä näkyy vanhan kolonisataman värikäs talorykelmä.',
    },
  },
  panama: {
    tiedosto: 'City of Panama and the Harbor LCCN2014689104.jpg',
    vuosi: '1900-luvun alku',
    lahde: 'Bain News Service / Library of Congress (PD)',
    selite: 'Panama Cityn kaupunki ja satama lasinegatiivilta 1900-luvun alusta. '
      + 'Kaupunki oli tuolloin kanavatyömaan huoltosatama; kanava avattiin '
      + '1914, ja sen jälkeen laivat pääsivät valtamereltä toiselle '
      + 'kiertämättä Etelä-Amerikkaa.',
    lisat: [
      {
        tiedosto: 'Seaways Rosemar in Miraflores Locks.agr.jpg',
        vuosi: '2018',
        lahde: 'ArnoldReinhold, Commons (CC BY-SA 4.0)',
        selite: 'Rahtialus Seaways Rosemar Mirafloresin sulussa kahden vetomuulin '
          + 'välissä. Muulit ovat kiskoilla kulkevia sähkövetureita, jotka '
          + 'pitävät laivan irti sulun seinistä. Alusta nostetaan kaikkiaan '
          + '26 metriä merenpinnasta kanavan tasolle.',
      },
      {
        tiedosto: 'Mercado de Mariscos de la Ciudad de Panamá.jpg',
        vuosi: '2025',
        lahde: 'Virpana, Commons (CC0)',
        selite: 'Panama Cityn kalatori rannassa vanhankaupungin laidalla. Saalis '
          + 'myydään laiturin vieressä, ja samassa rakennuksessa on '
          + 'ruokakojuja, joissa kala paistetaan heti ja tarjotaan '
          + 'kookosriisin ja pataconien kanssa.',
      },
      {
        tiedosto: 'MolasCascoAntiguo.JPG',
        vuosi: '2013',
        lahde: 'Ayaita, Commons (CC BY-SA 3.0)',
        selite: 'Moloja myytävänä Casco Antiguossa. Mola on gunanaisten tekemää '
          + 'käänteisapplikointia: useita värillisiä kangaskerroksia '
          + 'ommellaan päällekkäin ja kuvio leikataan esiin alempia kerroksia '
          + 'paljastaen.',
      },
    ],
    uusi: {
      tiedosto: 'Panama City 2016.jpg',
      vuosi: '2016',
      lahde: 'Dronepicr, Commons (CC BY 3.0)',
      selite: 'Panama Cityn siluetti ilmasta. Kanavan tuottamat maksut ja niiden '
        + 'ympärille kasvanut pankki- ja logistiikka-ala ovat nostaneet '
        + 'rantaan pilvenpiirtäjärivin, jollaista Keski-Amerikassa ei muualla '
        + 'ole.',
    },
  },
  sanfrancisco: {
    tiedosto: 'Market Street, San Francisco LCCN2015647623.jpg',
    vuosi: '1900',
    lahde: 'Library of Congress (PD)',
    selite: 'Market Street vuonna 1900, kaupungin pääkatu hevosvaunujen ja '
      + 'raitiovaunujen aikaan. Detroit Photographic Companyn '
      + 'photochrom-vedos. Kuusi vuotta myöhemmin maanjäristys ja sitä '
      + 'seurannut tulipalo tuhosivat suuren osan tässä näkyvistä taloista.',
    lisat: [
      {
        tiedosto: 'San Francisco (CA, USA), Powell-Mason Cable Car Turnaround -- 2022 -- 2964.jpg',
        vuosi: '2022',
        lahde: 'Dietmar Rabich, Commons (CC BY-SA 4.0)',
        selite: 'Powell–Mason-linjan kääntöpöytä Mason Streetin päässä. Vaunuissa '
          + 'ei ole omaa moottoria, vaan ne tarttuvat kadun alla lakkaamatta '
          + 'liikkuvaan vaijeriin; päätepysäkillä vaunu käännetään ympäri '
          + 'työntämällä.',
      },
      {
        tiedosto: 'Grant Avenue, looking North by California Street, San Francisco (16163162316).jpg',
        vuosi: '2008',
        lahde: 'Michael Beaton, Commons (CC BY 2.0)',
        selite: 'Grant Avenue, Chinatownin pääkatu, kuvattuna California Streetin '
          + 'kulmasta. Kadun kiinalaistyylinen katukuva rakennettiin pitkälti '
          + '1906 tulipalon jälkeen, kun kaupunginosa nousi uudelleen '
          + 'paikalleen.',
      },
      {
        tiedosto: 'Muni 1059 at the Ferry Building, February 2018.jpg',
        vuosi: '2018',
        lahde: 'Elizabeth K. Joseph, Commons (CC BY 2.0)',
        selite: 'PCC-raitiovaunu F-linjalla Ferry Buildingin edustalla. Linjalla '
          + 'ajetaan vanhoilla vaunuilla, jotka on maalattu niiden '
          + 'alkuperäisten kaupunkien väreihin — tämä on käytössä oleva '
          + 'liikenneväline, ei museo.',
      },
    ],
    uusi: {
      tiedosto: 'Market Street at Kearny Street, San Francisco (January 2015)(Unsplash).jpg',
      lahde: 'Anurag Arora, Commons (CC0)',
      selite: 'Market Street nykyään Kearny Streetin kohdalla. Katu kulkee yhä '
        + 'samaa vinoa linjaa läpi keskustan, ja sen suunta poikkeaa muusta '
        + 'ruutukaavasta, koska kaupunki kasvoi kahden eri suuntiin mitatun '
        + 'kaavan varaan.',
    },
  },
  sanjuan: {
    tiedosto: 'St. Cristobal Fortress, San Juan, Puerto Rico LCCN96522666.jpg',
    vuosi: '1908',
    lahde: 'Library of Congress (PD)',
    selite: 'San Cristóbalin linnoitus vuonna 1908. Espanjalaisten rakentama '
      + 'linnake sulkee vanhan kaupungin maanpuoleisen kannaksen; kuva on '
      + 'otettu kymmenen vuotta sen jälkeen, kun Puerto Rico siirtyi '
      + 'Espanjalta Yhdysvalloille.',
    lisat: [
      {
        tiedosto: 'Top of homes in La Perla, San Juan, Puerto Rico.jpg',
        vuosi: '2019',
        lahde: 'Šarūnas Burdulis, Commons (CC BY-SA 2.0)',
        selite: 'La Perlan kattoja. Kaupunginosa rakentui kaupunginmuurin '
          + 'ulkopuolelle, muurin ja meren väliin jäävälle kapealle '
          + 'kaistaleelle, ja talot laskeutuvat portaittain rantakalliolle. '
          + 'Sen yli näkee San Cristóbalin valleilta.',
      },
      {
        tiedosto: 'San Juan, calles 4.jpg',
        vuosi: '2013',
        lahde: 'LBM1948, Commons (CC BY-SA 4.0)',
        selite: 'Katu vanhassa San Juanissa. Talot ovat kiinni toisissaan ja '
          + 'parvekkeet työntyvät kadun ylle. Ajorata on sinertävää '
          + 'adokiinikiveä, jota laivat toivat Espanjasta painolastina ja '
          + 'joka ladottiin täällä kaduksi.',
      },
      {
        tiedosto: 'San Juan Pier.jpg',
        vuosi: '2018',
        lahde: 'Moebiusuibeom-en, Commons (CC BY-SA 4.0)',
        selite: 'San Juanin sataman laitureita lahden puolella. Vanha kaupunki on '
          + 'rakennettu niemen kärkeen ja satama sen suojanpuoleiselle '
          + 'rannalle — juuri tämän luonnonsataman takia paikka valittiin '
          + '1500-luvulla.',
      },
    ],
    uusi: {
      tiedosto: 'Castillo San Felipe del Morro, Puerto Rico.jpg',
      vuosi: '2014',
      lahde: 'Breezy Baldwin, Commons (CC BY 2.0)',
      selite: 'Castillo San Felipe del Morron linnoitus San Juanin niemen '
        + 'kärjessä, edessään laaja nurmikenttä, jolla kaupunkilaiset '
        + 'lennättävät leijoja. Muurin päällä näkyvä valkoinen majakka on '
        + 'rakennettu vanhan espanjalaisen linnakkeen ylimmälle vallille.',
    },
  },
  santafe: {
    tiedosto: '"East Side of Plaza, Santa Fe, N. M." 1866 - NARA - 533174.jpg',
    vuosi: '1866',
    lahde: 'National Archives (PD)',
    selite: 'Aukion itälaita Santa Fessa vuonna 1866. Matalat savitiilitalot ja '
      + 'niiden edessä kulkevat pylväskäytävät ovat espanjalaisen '
      + 'siirtomaakaupungin perusmuotoa. Aukio oli Santa Fe Trailin pääte: '
      + 'Missourista lähteneet härkävankkurit purkivat kuormansa tähän.',
    lisat: [
      {
        tiedosto: 'Native American vendors on the Santa Fe Plaza.jpg',
        vuosi: '2005',
        lahde: 'FranHogan, Commons (CC BY-SA 4.0)',
        selite: 'Alkuperäiskansojen käsityöläisiä myymässä Santa Fen aukiolla. '
          + 'Kuvernöörien palatsin pylväskäytävässä on myyntipaikkoja, joissa '
          + 'saa myydä vain itse tehtyä työtä.',
      },
      {
        tiedosto: 'Chiles at the Santa Fe Farmers\' Market (16070909691).jpg',
        vuosi: '2014',
        lahde: 'Paul Asman ja Jill Lenoble, Commons (CC BY 2.0)',
        selite: 'Chilejä Santa Fen torilla. Chile on New Mexicon tunnusomaisin '
          + 'viljelykasvi, ja syksyllä vihreä sato paahdetaan pyörivissä '
          + 'rummuissa torin laidalla.',
      },
      {
        tiedosto: 'Palace of the Governors (4101684497).jpg',
        vuosi: '2009',
        lahde: 'Chris M Morris, Commons (CC BY 2.0)',
        selite: 'Kuvernöörien palatsi aukion pohjoislaidalla. Savitiilirakennus '
          + 'pystytettiin 1600-luvun alussa Espanjan siirtomaahallinnon '
          + 'taloksi, ja se on ollut käytössä siitä lähtien.',
      },
    ],
    uusi: {
      tiedosto: 'Santa Fe Plaza gazebo.jpg',
      lahde: 'WikTalksmart, Commons (CC BY-SA 4.0)',
      selite: 'Sama aukio nykyään. Keskellä on soittolava ja ympärillä yhä '
        + 'pylväskäytävät, sillä kaupungin rakennusmääräykset vaativat '
        + 'keskustassa savitiilityyliä myös uusilta taloilta.',
    },
  },
  stjohns: {
    tiedosto: 'Artist sketching the St. John\'s Harbour and skyline (c. 1910).jpg',
    vuosi: 'noin 1890',
    lahde: 'S.H. Parsons & Sons / The Rooms (PD)',
    selite: 'Piirtäjä istuu kalliolla ja luonnostelee St. John\'sin satamaa. '
      + 'Altaassa on kymmeniä purjealuksia mastot pystyssä: kaupunki eli '
      + 'turskasta ja hylkeenpyynnistä, ja koko laivasto mahtui yhteen '
      + 'kapeasuiseen lahteen.',
    lisat: [
      {
        tiedosto: 'Jellybean Row Houses of St. John\'s, Newfoundland.jpg',
        vuosi: '2018',
        lahde: 'miketnorton, Commons (CC BY 2.0)',
        selite: 'Kirkkaanvärisiä puutaloja St. John\'sin rinnekaduilla. Rivejä '
          + 'sanotaan nimellä Jellybean Row, karkkien mukaan.',
      },
      {
        tiedosto: 'Quidi Vidi Village (St. John\'s) Panorama.jpg',
        vuosi: '2020',
        lahde: 'Rpitt, Commons (CC BY-SA 4.0)',
        selite: 'Quidi Vidin kylä kaupungin kupeessa. Kapea kalliosola päästää '
          + 'veneet merelle, ja rannan entisissä kalastusrakennuksissa toimii '
          + 'nykyään panimo.',
      },
      {
        tiedosto: 'George Street St John Newfoundland (41364923901).jpg',
        vuosi: '2018',
        lahde: 'Michel Rathwell, Commons (CC BY 2.0)',
        selite: 'George Street keskustassa. Lyhyen kadun varrella on rivi '
          + 'ravintoloita ja baareja, eikä juuri mitään muuta.',
      },
    ],
    uusi: {
      tiedosto: 'St John Harbour Newfoundland (40650988114).jpg',
      lahde: 'Michel Rathwell, Commons (CC BY 2.0)',
      selite: 'Sama satama nykyään. Keskellä avautuu The Narrows, kapea väylä '
        + 'merelle, ja sen vasemmalla puolella kohoaa Signal Hill, jonka '
        + 'laella näkyy Cabot Tower.',
    },
  },
  toronto: {
    tiedosto: 'Toronto from the bay-LCCN2008678144.jpg',
    vuosi: '1901',
    lahde: 'Library of Congress (PD)',
    selite: 'Toronto lahdelta katsottuna: laiturissa on rivi siipiratashöyryjä ja '
      + 'takana matala tiilikaupunki, josta erottuvat kirkontornit ja vanha '
      + 'unioniasema. Käsinväritetty photochrom-vedos vuodelta 1901.',
    lisat: [
      {
        tiedosto: 'St. Lawrence Market South Interior 2021.jpg',
        vuosi: '2021',
        lahde: 'Canmenwalker, Commons (CC BY 4.0)',
        selite: 'St. Lawrence Marketin eteläisen hallin käytävä. Toisella '
          + 'puolella on kalatiski ja elävien hummerien altaat, toisella '
          + 'osteribaari — halli on ollut kaupungin ruokatori 1800-luvulta '
          + 'asti.',
      },
      {
        tiedosto: 'Kensington Market Toronto August 2017 01.jpg',
        vuosi: '2017',
        lahde: 'Arild Vågen, Commons (CC BY-SA 4.0)',
        selite: 'Kensington Marketin katukulma Kensington Avenuen ja Baldwin '
          + 'Streetin risteyksessä. Korttelin puodit ovat vaihtaneet '
          + 'omistajaa maahanmuuttoaaltojen mukana kerta toisensa jälkeen, ja '
          + 'siksi samalla kadulla on rinnakkain hyvin erilaisia kauppoja.',
      },
      {
        tiedosto: 'TTC streetcar on Queen Street E.jpg',
        vuosi: '2009',
        lahde: 'Amber Dawn Pullin, Commons (CC BY 2.0)',
        selite: 'Raitiovaunu Queen Streetillä. Toronto ei koskaan purkanut '
          + 'raitiotieverkkoaan kuten useimmat Pohjois-Amerikan kaupungit, '
          + 'joten vaunut kulkevat yhä samoilla kaduilla kuin hevosvaunujen '
          + 'aikaan.',
      },
    ],
    uusi: {
      tiedosto: 'Toronto Skyline from Centre Island.jpg',
      lahde: 'Whpq, Commons (CC BY-SA 4.0)',
      selite: 'Sama näkymä lahdelta nykyään, kuvattuna Centre Islandilta. '
        + 'Höyrylaivalaiturien tilalla on tornirivi ja CN Tower, ja saarille '
        + 'pääsee edelleen vain lautalla.',
    },
  },
  vancouver: {
    tiedosto: 'Cordova St looking east from cambie 1890s.jpg',
    vuosi: '1890-luku',
    lahde: 'Richard H. Trueman / City of Vancouver Archives, Commons (PD)',
    selite: 'Cordova Street itään Cambie Streetin kohdalta 1890-luvulla. '
      + 'Raitiovaunu kulkee hiekkakadulla, jalkakäytävät ovat lautaa ja '
      + 'pylväät kantavat tiheää lankaviuhkaa. Vancouver oli tuolloin vasta '
      + 'reilun vuosikymmenen ikäinen, ja Cordova oli sen liikekatu.',
    lisat: [
      {
        tiedosto: 'Granville Island Public Market 2015.jpg',
        vuosi: '2015',
        lahde: 'Jay Esplana, Commons (CC BY 4.0)',
        selite: 'Granville Islandin kauppahalli False Creekin rannalla. Saari oli '
          + 'teollisuusaluetta — konepajoja ja varastoja — ja hallit '
          + 'muutettiin 1970-luvun lopulla toriksi ja työpajoiksi. Vanhat '
          + 'peltikatot ja teräsristikot jätettiin näkyviin.',
      },
      {
        tiedosto: 'Port cranes 2011.jpg',
        vuosi: '2011',
        lahde: 'Hiestun.Photography, Commons (CC BY-SA 2.0)',
        selite: 'Konttinostureita Vancouverin satamassa Burrard Inletin rannalla. '
          + 'Satama on Kanadan suurin. Kaupunki syntyi juuri tähän, kun '
          + 'mannerten välisen rautatien päätepiste vedettiin 1880-luvulla '
          + 'lahden rantaan.',
      },
      {
        tiedosto: 'Vancouver (BC, Canada), Vancouver Harbour Flight Centre, Wasserflugzeuge -- 2022 -- 2127.jpg',
        vuosi: '2022',
        lahde: 'Dietmar Rabich, Commons (CC BY-SA 4.0)',
        selite: 'Vesitasoja laiturissa Coal Harbourissa aivan keskustan '
          + 'edustalla. Koneet lähtevät säännöllisessä liikenteessä '
          + 'Vancouverin saarelle ja rannikon kyliin; nousukiito otetaan '
          + 'suoraan sataman edestä.',
      },
    ],
    uusi: {
      tiedosto: 'Cordova Street, 2016 Blue Hour.jpg',
      vuosi: '2016',
      lahde: 'Dllu, Commons (CC BY-SA 4.0)',
      selite: 'Sama Cordova Street runsaat sata vuotta myöhemmin, iltahämärässä. '
        + 'Vasemmalla on 1800-luvun tiilitaloja, joissa on nykyään '
        + 'panimoravintola; taustalla näkyy Woodward\'sin tavaratalon vanha '
        + 'W-valokyltti ja Harbour Centren torni.',
    },
  },
  whitehorse: {
    tiedosto: 'Sternwheelers at Whitehorse, Yukon, ca. 1899 - DPLA - eb876214e43d7026043f6d4ac38db14c.jpg',
    vuosi: 'noin 1899',
    lahde: 'Arthur C. Pillsbury / Seattle Public Library, Commons (PD)',
    selite: 'Kaksi siipiratasalusta rannassa ja telttarivi vastapäätä. Yhden '
      + 'teltan kyltissä lukee White Horse Saloon. Whitehorse oli '
      + 'pysähdyspaikka Klondiken kultakentille: joen yläpuoliset Miles '
      + 'Canyon ja Whitehorsen kosket kierrettiin maitse, ja täältä '
      + 'jatkettiin laivalla Dawsoniin.',
    lisat: [
      {
        tiedosto: 'SS Klondike paddlewheeler - National Historic Site - Whitehorse, Yukon.jpg',
        vuosi: '2012',
        lahde: 'Anthony DeLorenzo, Commons (CC BY-SA 3.0)',
        selite: 'SS Klondike Yukonjoen rannalla talvella. Alus rakennettiin '
          + '1930-luvulla ja se on nyt museona kuivalla maalla. '
          + 'Siipiratasalukset olivat Yukonin tavaraliikenne siihen asti, '
          + 'kunnes maantiet veivät kuljetukset.',
      },
      {
        tiedosto: 'Cañón Miles, Yukón, Canadá, 2017-08-26, DD 130-132 PAN.jpg',
        vuosi: '2017',
        lahde: 'Diego Delso, Commons (CC BY-SA 4.0)',
        selite: 'Miles Canyon Whitehorsen yläpuolella. Yukonjoki puristuu kapeaan '
          + 'basalttikanjoniin, joka oli kultaryntäyksen aikaan matkan '
          + 'vaarallisimpia kohtia. Kanjonin yläpuolelle vesi on nykyään '
          + 'padottu Schwatka-järveksi.',
      },
      {
        tiedosto: 'Quest dogs.JPG',
        vuosi: '2003',
        lahde: 'Commons (public domain)',
        selite: 'Valjakko lähtee Yukon Questin lähtöportista helmikuussa 2003. '
          + 'Yleisö seisoo aitojen takana kadulla: lähtö ajetaan keskeltä '
          + 'kaupunkia, ja reitti jatkuu talvisen erämaan halki Alaskan '
          + 'puolelle.',
      },
    ],
    uusi: {
      tiedosto: 'Downtown Whitehorse (6325219946).jpg',
      vuosi: '2011',
      lahde: 'Anthony DeLorenzo, Commons (CC BY 2.0)',
      selite: 'Sama rantatörmä nykyään. Yukonjoki virtaa yhä keskustan ohi, mutta '
        + 'laivojen tilalla on matalia taloja ja rantatie. Whitehorse on '
        + 'Yukonin pääkaupunki, ja suurin osa koko territorion asukkaista '
        + 'asuu juuri täällä.',
    },
  },
  winnipeg: {
    tiedosto: 'Canadian Dog Train and Remains of Old Fort Garry, Winnipeg 1899 (HS85-10-11350).jpg',
    vuosi: '1899',
    lahde: 'Steele & Co. / British Library, Commons (PD)',
    selite: 'Kuuden koiran valjakko ja kuormareki Fort Garryn jäljellä olevan '
      + 'porttitornin edessä talvella 1899. Hudson\'s Bay Companyn '
      + 'kivilinnoituksesta oli jo tuolloin jäljellä vain portti. '
      + 'Kauppa-asema seisoi Punaisen- ja Assiniboinejoen yhtymäkohdassa, ja '
      + 'sen ympärille kasvoi Winnipeg.',
    lisat: [
      {
        tiedosto: 'The Forks Market, Winnipeg Manitoba.JPG',
        vuosi: '2012',
        lahde: 'Ccyyrree, Commons (CC0)',
        selite: 'The Forks Market samojen jokien yhtymäkohdassa. Kauppahalli on '
          + 'entinen rautatien tiilirakennus, johon on lisätty lasikatteiset '
          + 'kylkiäiset. Paikka oli kohtaamis- ja vaihtopaikka tuhansia '
          + 'vuosia ennen kaupunkia.',
      },
      {
        tiedosto: 'Festival du Voyageur. Whittier Park, St. Boniface, Winnipeg (500147b) (14018205902).jpg',
        vuosi: '2014',
        lahde: 'Robert Linsdell, Commons (CC BY 2.0)',
        selite: 'Lumiveistos Festival du Voyageur -talvijuhlassa Whittier '
          + 'Parkissa. Juhla vietetään St. Bonifacessa, Winnipegin '
          + 'ranskankielisessä kaupunginosassa, ja se on nimetty turkiskaupan '
          + 'jokimatkaajien mukaan.',
      },
      {
        tiedosto: 'Portage Ave & Main St, Winnipeg (502315) (15963363704).jpg',
        vuosi: '2014',
        lahde: 'Robert Linsdell, Commons (CC BY 2.0)',
        selite: 'Portage Avenuen ja Main Streetin risteys. Kadut seuraavat '
          + 'vanhoja kärryreittejä, jotka kulkivat Fort Garrysta kahteen '
          + 'suuntaan; risteys tunnetaan Kanadassa tuulisimpana kulmana, ja '
          + 'jalankulkijat ohjattiin vuosikymmeniksi alikulkuun.',
      },
    ],
    uusi: {
      tiedosto: 'Winnipeg Esplanade Riel Bridge & CMHR.jpg',
      vuosi: '2026',
      lahde: 'Travel Manitoba, Wikimedia Commons (CC BY 2.0)',
      selite: 'Vinoköysisilta ja sen yksi vino pyloni kaartuvat joen yli sinisenä '
        + 'hetkenä, ja takana kohoavat lasikupolinen museorakennus tornineen '
        + 'sekä keskustan pilvenpiirtäjät. Valot heijastuvat tyynestä '
        + 'jokivedestä.',
    },
  },
  yellowknife: {
    tiedosto: 'Radium King moored in Yellowknife.jpg',
    vuosi: '1930-luku',
    lahde: 'Edmonton Air Museum Committee / NWT Archives, Commons (PD)',
    selite: 'Rahtialus Radium King kiinni laiturissa Yellowknifessä 1930-luvulla. '
      + 'Miehet vetävät letkua kannelle, rannalla on tynnyreitä ja '
      + 'peltikatoksia. Kaupunki syntyi kultalöydön ympärille, ja kaikki '
      + 'tavara tuli tänne vesitse: maantietä etelään ei vielä ollut.',
    lisat: [
      {
        tiedosto: 'Houseboats on Great Slave Lake in Yellowknife.JPG',
        vuosi: '2013',
        lahde: 'CambridgeBayWeather, Commons (CC BY-SA 3.0)',
        selite: 'Asuntolaivoja Suuren Orjajärven jäässä Yellowknifen edustalla '
          + 'helmikuussa. Talot kelluvat kesät lahdella ja jäätyvät talveksi '
          + 'paikoilleen; silloin niiden luo kuljetaan jäätä pitkin.',
      },
      {
        tiedosto: 'Dettah Ice Road.jpg',
        vuosi: '2014',
        lahde: 'GravityRidesEverything, Commons (CC BY-SA 3.0)',
        selite: 'Jäätie Yellowknifestä Dettahin kylään. Talvella järven jää '
          + 'kantaa auton ja matka oikaisee lahden yli; kesällä samaan kylään '
          + 'ajetaan huomattavasti pidempi kierros maitse.',
      },
      {
        tiedosto: '2018 Aurora Yellowknife Canada.jpg',
        vuosi: '2018',
        lahde: 'Commons (public domain)',
        selite: 'Revontulet Yellowknifen yllä maaliskuussa. Kaupunki on suoraan '
          + 'revontulivyöhykkeen alla, ja talven ilma on kuivaa ja usein '
          + 'selkeä; siitä on tullut revontulimatkailun kohde.',
      },
    ],
    uusi: {
      tiedosto: 'Old Town and N\'Dilo.JPG',
      vuosi: '2008',
      lahde: 'CambridgeBayWeather, Commons (CC BY-SA 3.0)',
      selite: 'Yellowknifen Old Town kesällä, taustalla N\'Dilon niemi ja Suuri '
        + 'Orjajärvi. Talot on rakennettu suoraan kallion päälle koivujen '
        + 'sekaan, ja rannassa näkyy vesitasojen laituri — sama lahti, jossa '
        + 'Radium King oli kiinni.',
    },
  },
  yellowstone: {
    tiedosto: 'Castle Geyser, Yellowstone National Park-LCCN2008678250.jpg',
    vuosi: '1898',
    lahde: 'Library of Congress (PD)',
    selite: 'Castle Geyser purkautuu kartiomaisen kekonsa päältä, etualalla '
      + 'sininen kuuma lähde. Käsinväritetty photochrom-vedos: kartio on '
      + 'piikerrostumaa, jota lähde on kasvattanut vähitellen tuhansien '
      + 'vuosien ajan.',
    lisat: [
      {
        tiedosto: 'Yellowstone National Park (WY, USA), Grand Prismatic Spring -- 2022 -- 2514.jpg',
        vuosi: '2022',
        lahde: 'Dietmar Rabich, Commons (CC BY-SA 4.0)',
        selite: 'Grand Prismatic Spring, puiston suurin kuuma lähde. Renkaiden '
          + 'värit tulevat eri lämpötiloissa viihtyvistä mikrobeista: '
          + 'keskellä on kuumin ja kirkkaan sininen vesi, reunoilla viileämpi '
          + 'ja oranssi.',
      },
      {
        tiedosto: 'Bison herd, Lamar Valley (22034298748).jpg',
        vuosi: '2015',
        lahde: 'Neal Herbert, National Park Service (PD)',
        selite: 'Biisonilauma Lamar Valleyssa. Yellowstonen lauma on ainoa '
          + 'Yhdysvalloissa, joka on elänyt yhtäjaksoisesti samalla alueella '
          + 'esihistoriallisista ajoista asti.',
      },
      {
        tiedosto: 'Crowds at Old Faithful (901c601a-2e6c-45bd-805e-b6c167bff0a2).jpg',
        vuosi: '2015',
        lahde: 'Neal Herbert, National Park Service (PD)',
        selite: 'Yleisö odottaa Old Faithfulin purkausta pitkospuiden penkeillä. '
          + 'Geysirin nimi tulee siitä, että purkausväli on ennustettavissa, '
          + 'joten vierailijoille voidaan ilmoittaa seuraava aika etukäteen.',
      },
    ],
    uusi: {
      tiedosto: 'Castle Geyser Yellowstone.jpg',
      lahde: 'Clément Bardot, Commons (CC BY-SA 3.0)',
      selite: 'Sama Castle Geyser nykyään. Kartio on entisellään, mutta kävijät '
        + 'pidetään pitkospuilla: ohut piikuori pettää helposti ja alla on '
        + 'kiehuvaa vettä.',
    },
  },
};
