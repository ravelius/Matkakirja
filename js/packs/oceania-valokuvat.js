// Matkakirjan valokuvakortit (OCEANIA_VALOKUVAT).
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
export const OCEANIA_VALOKUVAT = {
  adelaide: {
    tiedosto: 'Port Adelaide Dock, with the barque Primera and Elder Smith and Co Wool and Grain Store(GN01802).jpg',
    vuosi: 'n. 1885',
    lahde: 'Samuel White Sweet, History Trust of South Australia, Commons (CC0)',
    lyhyt: 'Rautarunkoinen parkki Primera Port Adelaiden altaassa, Samuel White Sweetin kuvaamana; paloi 1900.',
    selite: 'Rautarunkoinen parkki Primera kiinni Port Adelaiden altaassa, takana '
      + 'Elder Smith & Co:n villa- ja viljavarasto. Kuvan otti Samuel White '
      + 'Sweet, entinen merikapteeni, joka kiersi Etelä-Australiaa '
      + 'hevosvetoinen pimiö mukanaan. Primera paloi ja upposi vuonna 1900.',
    lisat: [
      {
        tiedosto: 'Stall at Central Market 1.jpg',
        vuosi: '2023',
        lahde: 'Doug Butler, Commons (CC BY-SA 4.0)',
        lyhyt: 'Hedelmä- ja vihannestiski Adelaiden Central Marketissa maanantaiaamuna.',
        selite: 'Hedelmä- ja vihannestiski Adelaiden Central Marketissa. Kuvaajan '
          + 'mukaan on maanantaiaamu, jolloin vain osa kojuista on auki; '
          + 'torstait ja perjantait ovat torin vilkkaimmat päivät.',
      },
      {
        tiedosto: 'Adelaide Metro Alstom Citadis at Glenelg.jpg',
        vuosi: '2018',
        lahde: 'Thebusofdoom, Commons (CC BY-SA 4.0)',
        lyhyt: 'Raitiovaunu Jetty Roadilla Glenelgissä, ainoa jäljellä oleva osa vanhasta verkosta.',
        selite: 'Raitiovaunu Jetty Roadin päätepysäkillä Glenelgissä. Linja vie '
          + 'keskustasta merenrannalle ja on ainoa reitti, joka jäi jäljelle '
          + 'Adelaiden vanhasta raitiotieverkosta.',
      },
      {
        tiedosto: 'Adelaide CBD skyline across the River Torrens, July 2026 (028A8463).jpg',
        vuosi: '2026',
        lahde: 'Yu Chu Chin, Commons (CC BY-SA 4.0)',
        lyhyt: 'Adelaiden keskusta Torrens-joen padotun altaan takaa.',
        selite: 'Adelaiden keskusta Torrens-joen takaa. Joki on padottu keskustan '
          + 'kohdalla leveäksi altaaksi, ja sen rannalle on koottu kaupungin '
          + 'konsertti- ja kongressitalot.',
      },
    ],
    uusi: {
      tiedosto: '\'Yelta\' tugboat moored at Queen\'s Wharf, Port Adelaide (51849328065).jpg',
      lahde: 'Philip Mallis, Commons (CC BY-SA 2.0)',
      lyhyt: 'Hinaaja Yelta museolaivana Port Adelaidessa, Primeran vanhalla laiturilla.',
      selite: 'Hinaaja Yelta Queen\'s Wharfin laiturissa Port Adelaidessa. Vuonna '
        + '1949 rakennettu alus on nyt museolaiva samassa satamassa, jossa '
        + 'Primera aikoinaan makasi; rahtiliikenne on siirtynyt uusiin '
        + 'terminaaleihin kauemmas.',
    },
  },
  alicesprings: {
    tiedosto: 'Alice Springs Telegraph Station, Northern Territory(GN01146).jpg',
    vuosi: '1900-luku',
    lahde: 'State Government Photographer / History Trust of South Australia, Commons (CC0)',
    lyhyt: 'Alice Springsin lennätinasema noin 1905, yleislennätinlinjan toistoasema Todd-joen varrella.',
    selite: 'Alice Springsin lennätinasema noin vuonna 1905: kivitaloja, '
      + 'aitauksia ja karjatarha kuivan Todd-joen varrella. Asema oli yksi '
      + 'Adelaiden ja Darwinin välisen yleislennätinlinjan toistoasemista, ja '
      + 'kaupunki syntyi sen ympärille.',
    lisat: [
      {
        tiedosto: 'Todd Mall, 2015 (02).JPG',
        vuosi: '2015',
        lahde: 'Bahnfrend, Commons (CC BY-SA 4.0)',
        lyhyt: 'Todd Mall, Alice Springsin kävelykatu, aboriginaalitaiteen gallerioita.',
        selite: 'Todd Mall, Alice Springsin kävelykatu. Kadun varrella on useita '
          + 'aboriginaalitaiteen gallerioita, ja katuun on pingotettu '
          + 'banderolli kaupungin vuotuisesta Alice Springs Show\'sta.',
      },
      {
        tiedosto: 'Alice Springs Camel Cup 2015 01.jpg',
        vuosi: '2015',
        lahde: 'Caroline Jones, Commons (CC0)',
        lyhyt: 'Kamelinajot Alice Springsin Camel Cupissa; villiintyneitä kameleja elää yhä sisämaassa.',
        selite: 'Kamelinajot Alice Springsin Camel Cupissa. Kamelit tuotiin '
          + 'Australiaan 1800-luvulla sisämaan kuljetuksiin, ja kun autot '
          + 'syrjäyttivät ne, osa päästettiin vapaaksi — villiintyneitä '
          + 'kameleja elää keskisessä Australiassa yhä.',
      },
      {
        tiedosto: 'FlyingDrsDispC1311.JPG',
        vuosi: '2008',
        lahde: 'Leonard G., Commons (PD)',
        lyhyt: 'Royal Flying Doctor Servicen viestikeskus Alice Springsissä.',
        selite: 'Royal Flying Doctor Servicen viestikeskus Alice Springsissä, '
          + 'josta lentävien lääkäreiden tehtävät ohjataan. Penkkirivit on '
          + 'rakennettu vierailijaryhmiä varten, sillä keskus on myös '
          + 'käyntikohde.',
      },
    ],
    uusi: {
      tiedosto: 'Alice Springs Telegraph Station, 2015 (02).JPG',
      vuosi: '2015',
      lahde: 'Bahnfrend, Commons (CC BY-SA 4.0)',
      lyhyt: 'Alice Springsin lennätinasema sata vuotta myöhemmin, nyt museona kumipuun varjossa.',
      selite: 'Sama lennätinasema runsaat sata vuotta myöhemmin. Kivirakennukset '
        + 'ovat nykyään museona noin neljä kilometriä keskustasta pohjoiseen, '
        + 'ja pihaa varjostaa kumipuu, jollaista vanhassa kuvassa ei vielä '
        + 'ole.',
    },
  },
  auckland: {
    tiedosto: 'Auckland, Queen Street LCCN2017657811.tif',
    vuosi: '1890-luku',
    lahde: 'Photoglob Co. / Library of Congress (PD)',
    lyhyt: 'Queen Street Aucklandissa photochrom-vedoksena, jo tuolloin kaupungin pääkatu.',
    selite: 'Queen Street käsinväritettynä photochrom-vedoksena. Kadulla kulkee '
      + 'hevosraitiovaunuja ja vossikoita, ja liikkeiden kilvet on maalattu '
      + 'suoraan julkisivuun. Queen Street oli jo tällöin Aucklandin pääkatu, '
      + 'vaikka pääkaupunki oli siirretty Wellingtoniin 1865.',
    lisat: [
      {
        tiedosto: 'Auckland, New Zealand (49152589687).jpg',
        vuosi: '2019',
        lahde: 'Pedro Szekely, Commons (CC BY-SA 2.0)',
        lyhyt: 'Auckland Mount Edenin laelta, yksi viidestäkymmenestä tulivuoresta kaupungin alla.',
        selite: 'Auckland Maungawhaun eli Mount Edenin laelta. Etualan kraatteri '
          + 'on yksi noin viidestäkymmenestä tulivuoresta, joiden päälle '
          + 'kaupunki on rakennettu — ne ovat kaikki nuoria ja purkautuneet '
          + 'kukin vain kerran.',
      },
      {
        tiedosto: 'Ōtara Markets 20231111 101819 01.jpg',
        vuosi: '2023',
        lahde: 'Prosperosity, Commons (CC BY 4.0)',
        lyhyt: 'Ōtaran lauantaitori Etelä-Aucklandissa, Tyynenmeren saarilta muuttaneen väen kohtaamispaikka.',
        selite: 'Ōtaran lauantaitori Etelä-Aucklandissa. Tori on Tyynenmeren '
          + 'saarilta muuttaneen väen kohtaamispaikka; Aucklandia sanotaan '
          + 'usein maailman suurimmaksi polynesialaiseksi kaupungiksi.',
      },
      {
        tiedosto: 'Ferry Terminl Auckland. (8114177761).jpg',
        vuosi: '2012',
        lahde: 'Bernard Spragg, Commons (CC0)',
        lyhyt: 'Lauttaterminaali Queen Streetin pohjoispäässä Aucklandissa.',
        selite: 'Lauttaterminaali Queen Streetin pohjoispäässä. Täältä lähtevät '
          + 'alukset Devonportiin, Waihekelle ja Pohjoisrannalle; monelle '
          + 'aucklandilaiselle työmatka on yhä vesillä.',
      },
    ],
    uusi: {
      tiedosto: 'Queen Street in Auckland 01.jpg',
      vuosi: '2017',
      lahde: 'Krzysztof Golik, Commons (CC BY-SA 4.0)',
      lyhyt: 'Queen Street Aucklandissa nykyään, bussit hevosten ja lasitornit kivitalojen tilalla.',
      selite: 'Queen Street nykyään. Katu kulkee yhä samaa laaksoa satamaan, '
        + 'mutta hevosten tilalla on bussit ja 1800-luvun kivitalojen välissä '
        + 'on lasitorneja.',
    },
  },
  bali: {
    tiedosto: 'Strand te Koeta bij Denpasar, KITLV 154735.tiff',
    vuosi: '1930-luku',
    lahde: 'KITLV, Leidenin yliopiston kirjastot (CC BY 4.0)',
    lyhyt: 'Kutan ranta Denpasarin lähellä Balilla ennen matkailun alkua 1920-1930-luvuilla.',
    selite: 'Kutan ranta Denpasarin lähellä. Rannan takana on kookospalmuja, aita '
      + 'ja pari olkikattoista majaa — ei mitään muuta. Ensimmäiset '
      + 'matkailijat alkoivat tulla Balille 1920- ja 1930-luvulla '
      + 'hollantilaisilla höyrylaivoilla.',
    lisat: [
      {
        tiedosto: 'Jatiluwih Rice Terrace - Subak Jatiluwih Tabanan Bali 01.jpg',
        vuosi: '2023',
        lahde: 'Anggabuana, Commons (CC BY-SA 4.0)',
        lyhyt: 'Riisiterasseja Jatiluwihissa Balilla, subak-vedenjakojärjestelmän hoitamana.',
        selite: 'Riisiterasseja Jatiluwihissa Tabananin alueella. Vesi jaetaan '
          + 'terassilta toiselle subak-järjestelmällä, jota hoitavat '
          + 'viljelijöiden omat yhdistykset ja temppelit — ei viranomainen.',
      },
      {
        tiedosto: 'Ubud Market, Ubud, Bali (15009558597).jpg',
        vuosi: '2014',
        lahde: 'Fabio Achilli, Commons (CC BY 2.0)',
        lyhyt: 'Ubudin tori Balilla: aamulla vihanneksia ja uhrikukkia, päivällä kankaita ja veistoksia.',
        selite: 'Ubudin tori. Aamulla kojuissa myydään vihanneksia ja '
          + 'uhrilahjoiksi tarkoitettuja kukkakoreja, ja päivemmällä samat '
          + 'paikat täyttyvät kankaista ja puuveistoksista.',
      },
      {
        tiedosto: 'Traditional boat at Sanur beach.jpg',
        vuosi: '2018',
        lahde: 'Imadedana, Commons (CC BY-SA 4.0)',
        lyhyt: 'Kalastaja puhdistaa jukung-venettään Sanurin rannalla Balilla.',
        selite: 'Kalastaja puhdistaa jukung-venettään Sanurin rannalla. Kapea '
          + 'puurunko ja kaksi puomikelluketta pitävät veneen pystyssä '
          + 'aallokossa; samoilla veneillä viedään nykyään myös '
          + 'matkailijoita.',
      },
    ],
    uusi: {
      tiedosto: 'Kuta Beach, Bali, 20220825 1706 0864.jpg',
      vuosi: '2022',
      lahde: 'Jakub Hałun, Commons (CC BY-SA 4.0)',
      lyhyt: 'Kutan ranta Balilla nykyään, saaren vilkkain hiekkasuora hotelleineen.',
      selite: 'Kutan ranta nykyään. Sama hiekkasuora on Balin vilkkain: '
        + 'palmurivin takana on hotelleja ja katuja, ja rannalle tullaan '
        + 'iltapäivällä katsomaan auringonlaskua.',
    },
  },
  birdsville: {
    tiedosto: 'Royal Mail car on Birdsville Track, 1934.jpg',
    vuosi: '1934',
    lahde: 'State Library of South Australia, Commons (PD)',
    lyhyt: 'Postiauto ylittämässä dyyniä Birdsville Trackilla 1934, Australian rankimpia postireittejä.',
    selite: 'Postiauto ylittämässä hiekkadyyniä Birdsville Trackilla vuonna 1934. '
      + 'Reitti Marreesta Birdsvilleen oli 320 mailia eli runsaat 500 '
      + 'kilometriä autiomaata, ja sitä pidettiin yhtenä Australian '
      + 'rankimmista postireiteistä.',
    lisat: [
      {
        tiedosto: 'Birdsville mail truck.JPG',
        vuosi: '2013',
        lahde: 'Peterdownunder, Commons (CC BY-SA 4.0)',
        lyhyt: 'Vanha postiauto pukkien päällä Marreessa, Birdsville Trackin eteläpäässä.',
        selite: 'Vanha postiauto pukkien päällä Marreessa, Birdsville Trackin '
          + 'eteläpäässä. Ohjaamon kyljessä lukee yhä E. G. Kruse, Marree ja '
          + 'etupuskurissa Royal Mail.',
      },
      {
        tiedosto: 'Big Red Dune west of Birdsville - panoramio (6).jpg',
        vuosi: '2013',
        lahde: 'Lobster1, Commons (CC BY-SA 3.0)',
        lyhyt: 'Big Red, Simpsonin autiomaan itäisin dyyni Birdsvillestä länteen.',
        selite: 'Big Red, Simpsonin autiomaan itäisin hiekkadyyni noin 35 '
          + 'kilometriä Birdsvillestä länteen. Harjanteen takana alkaa '
          + 'satojen samansuuntaisten dyynien vyöhyke, sen edessä on tasainen '
          + 'kivikkoaavikko.',
      },
      {
        tiedosto: 'Birdsville DSC02987 SA (38329387251).jpg',
        vuosi: '2017',
        lahde: 'Ian Cochrane, Commons (CC BY 2.0)',
        lyhyt: 'Royal Hotelin rauniot Birdsvillessä, entisen karjatullin rajapaikan muistona.',
        selite: 'Royal Hotelin rauniot Birdsvillessä. Kylä oli 1800-luvun lopulla '
          + 'vilkas rajapaikka, jossa Queenslandista Etelä-Australiaan '
          + 'ajetusta karjasta perittiin tullia — hotelleja oli silloin '
          + 'useampi kuin nyt.',
      },
    ],
    uusi: {
      tiedosto: 'Birdsville Pub (34616985520).jpg',
      vuosi: '2007',
      lahde: 'NomadicPics from cairns, australia, Wikimedia Commons (CC BY 2.0)',
      lyhyt: 'Autiomaakylän hotellirakennus Birdsvillen pääkadulla hämärän ja täysikuun aikaan.',
      selite: 'Matala valkoinen hotellirakennus leveine kuistikatoksineen '
        + 'autiomaakylän hiljaisen pääkadun varrella hämärän aikaan. Katolla '
        + 'liehuu Australian lippu, täysikuu nousee sen takana ja ikkunoista '
        + 'hohtaa lämmin valo, kun taustalla tasainen aavikko jatkuu '
        + 'horisonttiin.',
    },
  },
  brisbane: {
    tiedosto: 'Queen Street, Brisbane, c 1900.jpg',
    vuosi: '1900',
    lahde: 'Queensland State Archives, Commons (PD-Australia)',
    lyhyt: 'Queen Street Brisbanessa noin 1900, hevosraitiovaunuja ja peltikatoksia.',
    selite: 'Queen Street ylhäältä kuvattuna vuoden 1900 tienoilla. Kadulla '
      + 'kulkee hevosvetoisia raitiovaunuja ja vossikoita, ja jalkakäytäviä '
      + 'varjostavat kauppojen peltikatokset — subtrooppisessa Brisbanessa '
      + 'katosta tarvittiin sekä auringolta että kaatosateelta.',
    lisat: [
      {
        tiedosto: 'CityCat Spirit of Brisbane approaches North Quay Ferry Terminal Brisbane P1220387.jpg',
        vuosi: '2012',
        lahde: 'John Robert McPherson, Commons (CC BY-SA 4.0)',
        lyhyt: 'CityCat-katamaraani North Quayn laiturilla Brisbane-joella.',
        selite: 'CityCat-katamaraani lähestyy North Quayn laituria '
          + 'Brisbane-joella. Joki mutkittelee keskustan läpi niin jyrkästi, '
          + 'että vesibussi on monelle nopein tapa siirtyä kaupunginosasta '
          + 'toiseen.',
      },
      {
        tiedosto: 'Streets Beach, South Bank Parklands, Brisbane, 2020, 03.jpg',
        vuosi: '2020',
        lahde: 'Kgbo, Commons (CC BY-SA 4.0)',
        lyhyt: 'Streets Beach South Bankin puistossa Brisbanessa, vuoden 1988 maailmannäyttelyn perintönä.',
        selite: 'Streets Beach South Bankin puistossa: keinotekoinen hiekkaranta '
          + 'ja uima-allas aivan joen rannassa, vastarannalla keskustan '
          + 'tornit. Puisto rakennettiin vuoden 1988 maailmannäyttelyn '
          + 'alueelle sen jälkeen, kun näyttely purettiin.',
      },
      {
        tiedosto: 'Story Bridge and Brisbane River views from Bowen Terrace, 2020, 01.jpg',
        vuosi: '2020',
        lahde: 'Kgbo, Commons (CC BY-SA 4.0)',
        lyhyt: 'Story Bridge Brisbane-joen mutkassa, Australian pisin ulokepalkkisilta 1940.',
        selite: 'Story Bridge ja Brisbane-joen mutka Bowen Terracelta katsottuna. '
          + 'Silta valmistui 1940, ja se on Australian pisin '
          + 'ulokepalkkisilta: keskijänne rakennettiin molemmilta rannoilta '
          + 'ulos, kunnes puoliskot kohtasivat.',
      },
    ],
    uusi: {
      tiedosto: 'Queen Street Mall crowd Queen Street Mall Brisbane P1300780.jpg',
      lahde: 'John Robert McPherson, Commons (CC BY-SA 4.0)',
      lyhyt: 'Queen Street Brisbanessa nykyään, kävelykatuna vuodesta 1982.',
      selite: 'Sama Queen Street nykyään. Kadun keskiosa muutettiin kävelykaduksi '
        + '1982, eikä siellä kulje enää ajoneuvoja; noin puolen kilometrin '
        + 'matkalla on kuusi kauppakeskusta ja satoja liikkeitä.',
    },
  },
  broome: {
    tiedosto: 'LISWA 009553d Koolama.jpg',
    vuosi: '1940-luku',
    lahde: 'State Library of Western Australia, Commons (PD)',
    lyhyt: 'Höyrylaiva Koolama laskuvedellä Broomen laiturissa noin 1940, vuorovesi lähes kymmenen metriä.',
    selite: 'Höyrylaiva Koolama laskuveden aikaan Broomen laiturissa noin vuonna '
      + '1940: runko lepää merenpohjalla ja vesiraja näkyy kylkeen '
      + 'piirtyneenä juovana. Broomessa vuorovesi vaihtelee suurimmillaan '
      + 'lähes kymmenen metriä, joten laivat jäivät kuiville joka päivä.',
    lisat: [
      {
        tiedosto: 'Streeter\'s Jetty, 2019 (03).jpg',
        vuosi: '2019',
        lahde: 'Bahnfrend, Commons (CC BY-SA 4.0)',
        lyhyt: 'Streeter\'s Jetty mangrovepuron pohjukassa Broomessa, helmenpyynnin ajoilta.',
        selite: 'Streeter\'s Jetty, kapea puulaituri mangrovepuron pohjukassa '
          + 'aivan Dampier Terracen takana. Laituri on peräisin helmenpyynnin '
          + 'ajoilta; kuvassa on laskuvesi, ja veneet pääsevät sen viereen '
          + 'vasta vuoroveden noustessa.',
      },
      {
        tiedosto: 'Japanese Cemetery, Broome, WA, Australia 03.jpg',
        vuosi: '2024',
        lahde: 'Ridiculopathy, Commons (CC0)',
        lyhyt: 'Broomen japanilainen hautausmaa, helmisukeltajien haudat 1800-luvun lopulta.',
        selite: 'Broomen japanilainen hautausmaa. Suurin osa haudoista on '
          + 'helmisukeltajia, jotka tulivat Japanista töihin 1800-luvun '
          + 'lopulta alkaen; hautakivet on tehty rannan kirjavista kivistä, '
          + 'ja moni kuoli sukeltajantautiin tai hukkui.',
      },
      {
        tiedosto: 'Cable Beach Sunset Camel Ride.JPG',
        vuosi: '2008',
        lahde: 'Binarysequence, Commons (CC BY-SA 3.0)',
        lyhyt: 'Kamelisaattue Cable Beachilla Broomessa auringonlaskun aikaan.',
        selite: 'Kamelisaattue Cable Beachilla auringonlaskun aikaan. Ranta sai '
          + 'nimensä merikaapelista, joka vedettiin Broomesta Jaavalle '
          + '1880-luvulla ja liitti Luoteis-Australian lennätinverkkoon.',
      },
    ],
    uusi: {
      tiedosto: 'Dampier Terrace, Broome, 2019 (02).jpg',
      vuosi: '2019',
      lahde: 'Bahnfrend, Commons (CC BY-SA 4.0)',
      lyhyt: 'Dampier Terrace Broomen Chinatownissa, entisten helmenpyytäjien kaupunginosa.',
      selite: 'Dampier Terrace Broomen Chinatownissa. Matalissa '
        + 'aaltopeltikattoisissa taloissa on nykyään helmiliikkeitä; '
        + 'kaupunginosa tunnetaan Chinatownina, vaikka helmenpyynnin väki '
        + 'tuli aikoinaan myös Japanista, Malajien saaristosta ja '
        + 'Filippiineiltä.',
    },
  },
  cairns: {
    tiedosto: 'Bicycles piled up outside a picture theatre in Cairns, ca. 1937 (4461930292).jpg',
    vuosi: 'n. 1937',
    lahde: 'State Library of Queensland, Commons (ei tunnettuja tekijänoikeusrajoituksia)',
    lyhyt: 'Polkupyöriä elokuvateatterin edessä Cairnsissa, katsojat saapuivat pyörällä.',
    selite: 'Toistakymmentä polkupyörää nojaa toisiaan vasten elokuvateatterin '
      + 'edessä Cairnsissa. Julkisivussa lukee illan elokuvan nimi My '
      + 'American Wife, ja ovensuussa seisoo kaksi miestä paitasillaan. '
      + 'Katsojat olivat tulleet näytökseen polkien.',
    lisat: [
      {
        tiedosto: 'Rusty\'s Markets, Cairns, Australia in May 02.jpg',
        vuosi: '2025',
        lahde: 'Ridiculopathy, Commons (CC0)',
        lyhyt: 'Rusty\'s Markets Grafton Streetillä Cairnsissa, trooppisia hedelmiä myynnissä.',
        selite: 'Rusty\'s Markets Grafton Streetin varrella. Katoksen alla myydään '
          + 'ananasta, papaijaa, mangoa ja vesimelonia, ja käytävän toisella '
          + 'puolella on parkkipaikka. Cairns on trooppisella vyöhykkeellä, '
          + 'joten valikoima on toinen kuin etelämpänä Australiassa.',
      },
      {
        tiedosto: 'Esplanade Lagoon, Cairns, 2025, 05.jpg',
        vuosi: '2025',
        lahde: 'Chris Olszewski, Commons (CC BY-SA 4.0)',
        lyhyt: 'Esplanadin laguuni Cairnsin rantabulevardilla, allas vuorovesiliejun tilalla.',
        selite: 'Esplanadin laguuni Cairnsin rantabulevardilla. Kaupungin '
          + 'rakentama suolavesiallas tehtiin siksi, että merenranta on tässä '
          + 'kohtaa laajaa liejuista vuorovesitasankoa, jossa ei juuri uida.',
      },
      {
        tiedosto: 'Great Barrier Reef off Cairns coast (Ank Kumar) 05.jpg',
        vuosi: '2016',
        lahde: 'Ank Kumar, Commons (CC BY-SA 4.0)',
        lyhyt: 'Ison valliriutan koralliriuttoja Cairnsin edustalla ilmasta kuvattuna.',
        selite: 'Ison valliriutan koralliriuttoja Cairnsin edustalla ilmasta '
          + 'kuvattuna. Ulompi riutta on kymmenien kilometrien päässä '
          + 'rannikosta, ja sinne lähtee retkiveneitä kaupungin satamasta '
          + 'päivittäin.',
      },
    ],
    uusi: {
      tiedosto: 'Esplanade, Cairns, 2015 (01).JPG',
      lahde: 'Bahnfrend, Commons (CC BY-SA 4.0)',
      lyhyt: 'Cairnsin esplanadi nykyään, majoitus- ja ravintolakortteli rantatasangon varrella.',
      selite: 'Cairnsin esplanadi nykyään. Katu kulkee kaupungin ja Trinity Bayn '
        + 'rantatasangon välissä, ja sen varrelle on kasvanut kaupungin '
        + 'majoitus- ja ravintolakortteli.',
    },
  },
  christchurch: {
    tiedosto: 'Cathedral Square, 1905.jpg',
    vuosi: '1905',
    lahde: 'Commons (PD, Uusi-Seelanti)',
    lyhyt: 'Katedraalitori Christchurchissa 1905, höyryraitiovaunu väistyy sähkövaunun tieltä.',
    selite: 'Katedraalitori vuonna 1905. Kuvateksti kertoo hetkestä, jolloin '
      + 'höyryraitiovaunu väistyi sähkövaunun tieltä; torin laidalla seisoo '
      + 'United Service Hotel, joka oli tuolloin ollut paikallaan jo '
      + 'vuosikymmeniä.',
    lisat: [
      {
        tiedosto: 'Cardboard Cathedral, Christchurch, New Zealand.jpg',
        vuosi: '2019',
        lahde: 'Michal Klajban, Commons (CC BY-SA 4.0)',
        lyhyt: 'Pahvikatedraali Christchurchissa, väliaikainen kirkko vuoden 2011 järistyksen jälkeen.',
        selite: 'Pahvikatedraali, joka rakennettiin väliaikaiseksi kirkoksi '
          + 'vuoden 2011 maanjäristyksen jälkeen. Kattoa kannattavat paksut '
          + 'pahviputket, ja japanilainen Shigeru Ban suunnitteli sen samalla '
          + 'menetelmällä, jota hän on käyttänyt muidenkin katastrofien '
          + 'jälkeen.',
      },
      {
        tiedosto: 'Punting on the Avon. Christchurch NZ (52897685952).jpg',
        vuosi: '2023',
        lahde: 'Bernard Spragg, Commons (PD)',
        lyhyt: 'Sauvavene Avon-joella Christchurchissa, kaupunki perustettu englantilaisen mallin mukaan.',
        selite: 'Sauvavene Avon-joella kasvitieteellisen puutarhan kohdalla. Vene '
          + 'työnnetään eteenpäin pohjaa vasten samalla tavalla kuin '
          + 'Cambridgessa — Christchurch perustettiin tietoisesti '
          + 'englantilaisen mallin mukaan.',
      },
      {
        tiedosto: 'Riverside Market, Christchurch City, New Zealand.jpg',
        vuosi: '2020',
        lahde: 'Michal Klajban, Commons (CC BY-SA 4.0)',
        lyhyt: 'Riverside Market Christchurchin keskustassa, avattu 2019 järistystontille.',
        selite: 'Riverside Market keskustassa. Halli avattiin 2019 tontille, joka '
          + 'oli seissyt tyhjänä maanjäristyksestä lähtien, ja siinä myydään '
          + 'Canterburyn tasangon vihanneksia ja lihaa.',
      },
    ],
    uusi: {
      tiedosto: 'Christchurch Cathedral Square.jpg',
      vuosi: '2023',
      lahde: 'Yvanyblog, Commons (CC BY-SA 4.0)',
      lyhyt: 'Katedraalitori Christchurchissa nykyään, torni sortui 2011 järistyksessä.',
      selite: 'Katedraalitori nykyään. Kirkon torni sortui helmikuun 2011 '
        + 'järistyksessä, ja rakennus on ollut siitä asti aidattuna; sen '
        + 'korjaamisesta ja purkamisesta on kiistelty yli vuosikymmen.',
    },
  },
  cooberpedy: {
    tiedosto: 'Men standing outside an underground post office - branch of Commonwealth Bank of Australia (Coober Pedy)(GN04186).jpg',
    vuosi: '1920-luku',
    lahde: 'State Government Photographer / History Trust of South Australia, Commons (CC0)',
    lyhyt: 'Miehiä Coober Pedyn maanalaisen postin edessä noin 1925.',
    selite: 'Miehiä Coober Pedyn maanalaisen postin ja pankkiasiamiehen edessä '
      + 'noin vuonna 1925. Käsin maalattu kyltti ilmoittaa Commonwealth '
      + 'Bankin säästöpankkiosaston; talon rakensivat Arch Burnett ja Jack '
      + 'Norton, jotka olivat saapuneet paikalle autolla vuonna 1919.',
    lisat: [
      {
        tiedosto: 'Coober Pedy underground motel room, 2007.jpg',
        vuosi: '2007',
        lahde: 'Kerry Raymond, Commons (CC BY 4.0)',
        lyhyt: 'Maanalainen motellihuone Coober Pedyssä, kallion tasainen lämpötila ympäri vuoden.',
        selite: 'Maanalainen motellihuone Coober Pedyssä. Katossa oleva '
          + 'ylösalaisin käännetty sateenvarjo kerää sen hiekan, joka putoaa '
          + 'pinnalle johtavasta ilmanvaihtokuilusta; kalliossa lämpötila '
          + 'pysyy tasaisena ympäri vuoden.',
      },
      {
        tiedosto: 'Coober Pedy Mines Australia.jpg',
        vuosi: '2005',
        lahde: 'Thomas Schoch, Commons (CC BY-SA 2.5)',
        lyhyt: 'Kaivoskuilujen sivukiviläjiä Coober Pedyn ympärillä, opaalinetsinnän jälkinä.',
        selite: 'Kaivoskuilujen sivukiviläjiä Coober Pedyn ympärillä. Jokainen '
          + 'valkoinen kartio on yhden kuilun jäljiltä nostettua maata — '
          + 'opaalia etsitään poraamalla kapeita reikiä, ja maasto on täynnä '
          + 'niitä.',
      },
      {
        tiedosto: 'The Breakaways.jpg',
        vuosi: '2011',
        lahde: 'Jburger234, Commons (CC BY-SA 4.0)',
        lyhyt: 'Breakawaysin pöytäkukkulat Coober Pedystä pohjoiseen, entistä Stuart Rangesia.',
        selite: 'Breakawaysin matalat pöytäkukkulat Coober Pedystä pohjoiseen. Ne '
          + 'olivat aikoinaan osa Stuart Rangesia; ympäröivä maa on kulunut '
          + 'pois ja jättänyt jäljelle vain kovimmat kerrokset.',
      },
    ],
    uusi: {
      tiedosto: 'Coober Pedy - The Big winch lookout.jpg',
      vuosi: '2000',
      lahde: 'Tal Shiar, Commons (PD)',
      lyhyt: 'Coober Pedy Big Winch -näköalapaikalta, suuri osa asunnoista maan alla piilossa.',
      selite: 'Coober Pedy Big Winch -näköalapaikalta. Kuvassa erottuu päätie, '
        + 'motelli, poravaunu ja kymmeniä sivukiviläjiä; suuri osa asunnoista '
        + 'ei näy lainkaan, koska ne on kaivettu rinteiden sisään.',
    },
  },
  darwin: {
    tiedosto: 'New iron jetty at Port Darwin, Northern Territory - SS \'Charon\' first ship to berth(GN02694).jpg',
    vuosi: 'n. 1905',
    lahde: 'Osavaltion valokuvaaja, History Trust of South Australia, Commons (CC0)',
    lyhyt: 'Port Darwinin uusi rautalaituri ja höyrylaiva Charon, kaupunki nimeltään vielä Palmerston.',
    selite: 'Port Darwinin uusi rautalaituri ja siihen ensimmäisenä '
      + 'kiinnittynyt höyrylaiva Charon; rinnettä nousee kiskoyhteys, jolla '
      + 'lasti siirrettiin rantatörmän päälle. Pohjoisterritoriota '
      + 'hallinnoi tuolloin Etelä-Australia, ja kaupungin nimi oli '
      + 'Palmerston.',
    lisat: [
      {
        tiedosto: 'Mindil markets 230616 gnangarra-126.JPG',
        vuosi: '2016',
        lahde: 'Gnangarra, Commons (CC BY 2.5 AU)',
        lyhyt: 'Tulitaituri Mindil Beachin auringonlaskumarkkinoilla Darwinissa kuivalla kaudella.',
        selite: 'Tulitaituri esiintyy yleisölle Mindil Beachin '
          + 'auringonlaskumarkkinoilla. Markkinat pidetään vain kuivalla '
          + 'kaudella, kun sateet ovat ohi, ja ihmiset tulevat sinne syömään '
          + 'ja katsomaan auringon laskua mereen.',
      },
      {
        tiedosto: 'Darwin Waterfront, 2023 (02).jpg',
        vuosi: '2023',
        lahde: 'Bahnfrend, Commons (CC BY-SA 4.0)',
        lyhyt: 'Kävelysilta Darwin Waterfrontin alueelle, vanha satamakortteli uusittu 2000-luvulla.',
        selite: 'Kävelysilta keskustan törmältä alas Darwin Waterfrontin '
          + 'alueelle. Vanha satamakortteli rakennettiin 2000-luvulla '
          + 'uudelleen asunnoiksi, hotelleiksi ja uima-altaiksi, ja silta '
          + 'yhdistää sen ylhäällä olevaan keskustaan.',
      },
      {
        tiedosto: 'Mitchell Street in March 2004.jpg',
        vuosi: '2004',
        lahde: 'Ken Hodge, Commons (CC BY 2.0)',
        lyhyt: 'Mitchell Street Darwinissa sunnuntaiaamuna, jälleenrakennettu syklooni Tracyn jälkeen 1974.',
        selite: 'Mitchell Street sunnuntaiaamuna. Katu on Darwinin ravintola- ja '
          + 'baarikortteli. Suuri osa kaupungista on rakennettu uudelleen sen '
          + 'jälkeen, kun sykloni Tracy tuhosi sen jouluna 1974.',
      },
    ],
    uusi: {
      tiedosto: 'Darwin (AU), Stokes Hill Wharf -- 2019 -- 4388.jpg',
      lahde: 'Dietmar Rabich, Commons (CC BY-SA 4.0)',
      lyhyt: 'Stokes Hill Wharf Darwinissa, vanha syväsatamalaituri yhä työkäytössä.',
      selite: 'Stokes Hill Wharf, Darwinin vanha syväsatamalaituri. Laiturin '
        + 'kärkeen on tullut ravintoloita ja onkipaikkoja, mutta satama on '
        + 'yhä työssä: sen kautta viedään muun muassa eläviä nautoja '
        + 'Kaakkois-Aasiaan.',
    },
  },
  dili: {
    tiedosto: 'KITLV A828 - Straat Commercio te Dilly op Portugees-Timor, KITLV 111447.tiff',
    vuosi: 'noin 1900',
    lahde: 'L. Geisler / KITLV, Leidenin yliopiston kirjastot (CC BY 4.0)',
    lyhyt: 'Rua do Comércio Portugalin Timorin pääkaupungissa, portugalilaishallinto lähes 450 vuotta.',
    selite: 'Rua do Comércio Portugalin Timorin pääkaupungissa. Kadun keskellä '
      + 'kasvaa suuri banjaanipuu, vasemmalla on pylväskäytävällinen '
      + 'hallintotalo ja oikealla kauppapuoti kuistin takana. Portugali '
      + 'hallitsi saaren itäosaa lähes 450 vuotta.',
    lisat: [
      {
        tiedosto: 'Tais Market, Dili, 2018 (05).jpg',
        vuosi: '2018',
        lahde: 'Bahnfrend, Commons (CC BY-SA 4.0)',
        lyhyt: 'Tais-tori Dilissä, käsin kudottu timorilainen kangas lahjana häihin ja hautajaisiin.',
        selite: 'Tais-tori Dilissä. Tais on käsin kudottu timorilainen kangas, '
          + 'jonka kuviot kertovat mistä päin saarta kutoja on kotoisin; '
          + 'kangasta annetaan lahjaksi häissä ja hautajaisissa.',
      },
      {
        tiedosto: 'Fish market, Bebonuk, 2018 (01).jpg',
        vuosi: '2018',
        lahde: 'Bahnfrend, Commons (CC BY-SA 4.0)',
        lyhyt: 'Bebonukin kalatori Dilin länsilaidalla, saman aamun saalis myytävänä.',
        selite: 'Bebonukin kalatori Dilin länsilaidalla. Kalat ripustetaan naruun '
          + 'myyntiä varten tien varteen, ja ne on pyydetty samana aamuna '
          + 'kaupungin edustan matalilta.',
      },
      {
        tiedosto: 'Arquivo & Museu da Resistência Timorense, 2023 (01).jpg',
        vuosi: '2023',
        lahde: 'Bahnfrend, Commons (CC BY-SA 4.0)',
        lyhyt: 'Timorilaisen vastarinnan arkisto ja museo Dilissä, Indonesian miehityksen vuosilta 1975-1999.',
        selite: 'Timorilaisen vastarinnan arkisto ja museo Dilissä. Kokoelma '
          + 'kertoo vuosista 1975–1999, jolloin Itä-Timor oli Indonesian '
          + 'miehittämä; maa itsenäistyi lopullisesti 2002.',
      },
    ],
    uusi: {
      tiedosto: 'Cristo Rei of Dili.jpg',
      vuosi: '2017',
      lahde: 'Jeffrey Pioquinto, Commons (CC BY 2.0)',
      lyhyt: 'Cristo Rei -patsas Dilissä, pystytetty 1996 Indonesian hallinnon lahjana.',
      selite: 'Cristo Rei -patsas niemen kärjessä Dilin itäpuolella. Patsas '
        + 'pystytettiin 1996 Indonesian hallinnon lahjana, ja jalustalle '
        + 'noustaan satoja portaita ylös niemen selkää pitkin.',
    },
  },
  dunedin: {
    tiedosto: 'Sailing ship Alcestis being towed past Goat Island-Rakiriri, Otago Harbour, after running aground, probably 1880s (3056547339).jpg',
    vuosi: '1880-luku',
    lahde: 'David De Maus, Alexander Turnbull Library / National Library NZ, '
      + 'Commons (ei tunnettuja tekijänoikeusrajoituksia)',
    lyhyt: 'Purjelaiva Alcestis hinataan kareilta Otagon lahdella 1880-luvulla, Dunedinin sataman edustalla.',
    selite: 'Purjelaiva Alcestis hinataan irti kareilta Otagon lahdella '
      + 'joskus 1880-luvulla; höyryhinaaja vetää vasemmalla ja takana '
      + 'kohoaa Goat Island eli Rakiriri. Lasinegatiiviin on kirjoitettu '
      + 'käsin "Alcestis ashore". Lahti on kapea ja matala, ja juuri '
      + 'siksi Dunedinin oikea satama on sen suulla Port Chalmersissa.',
    lisat: [
      {
        tiedosto: 'Dunedin Railway Station Full Exterior.jpg',
        vuosi: '2009',
        lahde: 'Antilived, Commons (CC BY-SA 3.0)',
        lyhyt: 'Dunedinin rautatieasema 1906, flaamilaisen renessanssin tyylinen kellotornirakennus.',
        selite: 'Dunedinin rautatieasema, vuonna 1906 valmistunut '
          + 'flaamilaisen renessanssin tyylinen edustusrakennus mustasta '
          + 'basaltista ja vaaleasta hiekkakivestä. Kellotorni kohoaa 37 '
          + 'metriin. Asema rakennettiin kaupungille, joka oli juuri '
          + 'menettänyt asemansa maan suurimpana.',
      },
      {
        tiedosto: '00 1518 Dunedin (New Zealand) - Railway Station.jpg',
        vuosi: '2009',
        lahde: 'W. Bulach, Commons (CC BY-SA 4.0)',
        lyhyt: 'Dunedinin aseman mosaiikkilattia, veturi ja NZR-monogrammi posliinilaatoista.',
        selite: 'Aseman pääsalin mosaiikkilattia. Keskellä on veturi '
          + 'tähtikuvion sisällä ja ympärillä toistuu Uuden-Seelannin '
          + 'rautateiden NZR-monogrammi ja veturinpyörä. Lattia on ladottu '
          + 'pienistä posliinilaatoista pala palalta.',
      },
      {
        tiedosto: 'Otago Peninsula and Harbour Cone.jpg',
        vuosi: '2013',
        lahde: 'Pseudopanax, Commons (PD)',
        lyhyt: 'Otagon niemimaa ja Harbour Cone Larnach Castlen huipulta, sammuneen tulivuoren jäännös.',
        selite: 'Otagon niemimaa ja Harbour Cone Larnach Castlen huipulta '
          + 'nähtynä. Niemimaa on sammuneen tulivuoren jäännös, ja sen '
          + 'ruohoiset kartiot erottavat lahden avomerestä.',
      },
    ],
    uusi: {
      tiedosto: 'Port Chalmers from Centenary lookout.jpg',
      lahde: 'Pseudopanax, Commons (PD)',
      lyhyt: 'Port Chalmers nykyään, Goat Island näkyy yhä, villalaivat vaihtuneet konttiterminaaliksi.',
      selite: 'Port Chalmers nykyään Centenary-näköalapaikalta. Keskellä '
        + 'lahtea näkyy sama Goat Island eli Rakiriri, jonka ohi Alcestis '
        + 'hinattiin. Villalaivojen tilalla laiturissa on nyt '
        + 'konttiterminaali, mutta kaupungin puutalot rinteessä ovat '
        + 'pitkälti samat.',
    },
  },
  exmouth: {
    lisat: [
      {
        tiedosto: 'Whale shark (Rhincodon typus) (15600945944).jpg',
        vuosi: '2014',
        lahde: 'Sylke Rohrlach, Commons (CC BY-SA 2.0)',
        lyhyt: 'Valashai Ningaloo-riutalla Exmouthin edustalla maalis-heinäkuun planktonrunsaudessa.',
        selite: 'Valashai Ningaloo-riutalla Exmouthin edustalla. Maailman suurin '
          + 'kala kerääntyy riutalle vuosittain maalis–heinäkuussa korallien '
          + 'kutua seuraavan planktonrunsauden perässä; se syö siivilöimällä '
          + 'eikä ole ihmiselle vaarallinen.',
      },
      {
        tiedosto: '001852 North West Cape, Western Australia - Vlaming Head Lighthouse.jpg',
        vuosi: '2007',
        lahde: 'W. Bulach, Commons (CC BY-SA 4.0)',
        lyhyt: 'Vlamingh Headin majakka North West Capen harjanteella Exmouthin pohjoispuolella.',
        selite: 'Vlamingh Headin majakka North West Capen harjanteella Exmouthin '
          + 'pohjoispuolella. Majakka on rakennettu ylös rinteeseen, jotta '
          + 'valo näkyy niemen molemmin puolin; alarinteessä on '
          + 'karavaanialue.',
      },
      {
        tiedosto: 'Antenna location at the US Naval Communication Station Harold E. Holt in Exmouth, Western Australia, 1972.png',
        vuosi: '1972',
        lahde: 'US Navy, Naval Electronics Systems Command, Commons (PD)',
        lyhyt: 'Harold E. Holtin viestiaseman antennikenttä Exmouthin lähellä 1972, yhteys sukellusveneisiin.',
        selite: 'Harold E. Holtin viestiaseman antennikenttä Exmouthin lähellä '
          + 'vuonna 1972. Erittäin matalataajuinen lähetin pitää yhteyttä '
          + 'pinnan alla oleviin sukellusveneisiin, ja siihen tarvitaan '
          + 'tornien varaan ripustettu, kilometrien laajuinen vaijeriverkko.',
      },
    ],
    uusi: {
      tiedosto: '00 4574 Exmouth - Western Australia.jpg',
      vuosi: '2007',
      lahde: 'W. Bulach, Commons (CC BY-SA 4.0)',
      lyhyt: 'Exmouthin keskustaa, perustettu 1960-luvulla viestiaseman väkeä varten.',
      selite: 'Exmouthin keskustaa. Kaupunki perustettiin vasta 1960-luvulla '
        + 'viestiaseman väkeä varten, ja se näkyy yhä kaavassa: leveät suorat '
        + 'kadut, matalat rakennukset ja nurmikenttä keskellä.',
    },
  },
  geraldton: {
    tiedosto: 'SS Charon at Geraldton, SLWA b4792667.png',
    vuosi: '1922',
    lahde: 'State Library of Western Australia, Commons (PD)',
    lyhyt: 'Höyrylaiva Charon Geraldtonin puulaiturissa 1922, matkalla auringonpimennysretkikunnan kanssa.',
    selite: 'Höyrylaiva Charon Geraldtonin puulaiturissa vuonna 1922. Laiturille '
      + 'on ajettu säkkilastissa olevia rautatievaunuja, ja rata kulkee aivan '
      + 'laivan kylkeen asti. Laiva oli tuolloin matkalla vuoden 1922 '
      + 'auringonpimennystä havainnoineen retkikunnan kanssa.',
    lisat: [
      {
        tiedosto: 'HMAS Sydney II Memorial, Geraldton, October 2023 03.jpg',
        vuosi: '2023',
        lahde: 'DaHuzyBru, Commons (CC BY-SA 4.0)',
        lyhyt: 'HMAS Sydneyn muistomerkki Geraldtonin kukkulalla, 645 metallilokkia kadonneen miehistön muistoksi.',
        selite: 'HMAS Sydneyn muistomerkki Geraldtonin yllä kohoavalla '
          + 'kukkulalla. Kupoli on tehty 645 metallilokista, yksi jokaista '
          + 'miehistön jäsentä kohti: risteilijä katosi kaikkine miehineen '
          + 'Länsi-Australian rannikolla marraskuussa 1941.',
      },
      {
        tiedosto: 'Geraldton Foreshore October 2023 02.jpg',
        vuosi: '2023',
        lahde: 'DaHuzyBru, Commons (CC BY-SA 4.0)',
        lyhyt: 'Geraldtonin rantabulevardin uimalahti viljasiilon vieressä.',
        selite: 'Geraldtonin rantabulevardin uimalahti. Oikealla kohoaa sataman '
          + 'viljasiilo ja lastauslaite — kaupunki on Keski-Länsi-Australian '
          + 'viljavyöhykkeen vientisatama, ja siilot seisovat aivan '
          + 'uimarannan vieressä.',
      },
      {
        tiedosto: 'Gone Driveabout 10, Fishing boat, Geraldton, Western Australia, 24 Oct. 2010 - Flickr - PhillipC.jpg',
        vuosi: '2010',
        lahde: 'Phillip Capper, Commons (CC BY 2.0)',
        lyhyt: 'Kalastusalus Ocean Quest telakalla Geraldtonissa, langusti alueen tunnetuin saalis.',
        selite: 'Kalastusalus Ocean Quest telakalla Geraldtonissa, runko pukkien '
          + 'varassa huoltoa varten. Geraldton on läntisen rannikon '
          + 'kalasatamia, ja alueen tunnetuin saalis on langusti, jota '
          + 'pyydetään mertoihin ja viedään pääosin ulkomaille.',
      },
    ],
    uusi: {
      tiedosto: 'Geraldton harbour at sunset.jpg',
      vuosi: '2019',
      lahde: 'JarrahTree, Commons (CC BY 2.5 AU)',
      lyhyt: 'Geraldtonin satama iltavalossa, lasti tulee sisämaasta radalla kuin sata vuotta sitten.',
      selite: 'Geraldtonin satama iltavalossa: hinaajia laiturissa, viljasiilot '
        + 'takana ja irtolastialus kauempana laiturilla. Etualalla kulkee '
        + 'rata, jota pitkin lasti tulee sisämaasta samaan tapaan kuin sata '
        + 'vuotta sitten.',
    },
  },
  hobart: {
    tiedosto: 'Apple cases being loaded onto ships, Hobart Wharves, Tasmania (c1900s) (31995606893).jpg',
    vuosi: '1900-luvun alku',
    lahde: 'C. P. Ray, Tasmanian Archives, Commons (ei tunnettuja tekijänoikeusrajoituksia)',
    lyhyt: 'Omenalaatikoita höyrylaivan lastiin Hobartin laitureilla, Tasmania eli Omenasaari.',
    selite: 'Omenalaatikoita nostetaan nostoliinassa höyrylaivan lastiin '
      + 'Hobartin laitureilla; laatikoiden kylkeen on maalattu APPLES. '
      + 'Tasmaniasta lähti vuosikymmeniä omenalaivoja Britanniaan asti, ja '
      + 'saarta alettiin siksi kutsua Omenasaareksi.',
    lisat: [
      {
        tiedosto: 'Salamanca Market July 2017.jpg',
        vuosi: '2017',
        lahde: 'Nick-D, Commons (CC BY-SA 4.0)',
        lyhyt: 'Salamancan tori Hobartissa, 1830-luvun hiekkakivimakasiinien edessä joka lauantai.',
        selite: 'Salamancan tori Hobartissa. Kojut pystytetään joka lauantai '
          + 'vanhojen hiekkakivimakasiinien eteen, jotka rakennettiin '
          + '1830-luvulla satamavarastoiksi.',
      },
      {
        tiedosto: 'Hobart City in the back drop of rocks on Mt Wellington.jpg',
        vuosi: '2016',
        lahde: 'Srinivas Purupati, Commons (CC BY-SA 4.0)',
        lyhyt: 'Hobart ja Derwentin suisto Mount Wellingtonin rinteeltä, vuorella kaksi virallista nimeä.',
        selite: 'Hobart ja Derwentin suisto Mount Wellingtonin rinteeltä. Vuori '
          + 'kohoaa runsaat 1200 metriä aivan kaupungin takana. Sillä on '
          + 'nykyään kaksi virallista nimeä: palawa-kielinen kunanyi ja '
          + 'englanninkielinen Mount Wellington.',
      },
      {
        tiedosto: 'Battery Point in Hobart.jpg',
        vuosi: '2016',
        lahde: 'Phil Whitehouse, Commons (CC BY 2.0)',
        lyhyt: 'Battery Pointin taloja Runnymede Streetillä, Hobartin vanhinta kaupunginosaa.',
        selite: 'Battery Pointin taloja Runnymede Streetillä, kivenheiton päässä '
          + 'Salamancan torilta. Kaupunginosa on Hobartin vanhimpia, ja kuvan '
          + 'talot on merkitty Tasmanian rakennusperintörekisteriin.',
      },
    ],
    uusi: {
      tiedosto: 'Victoria Dock, Hobart, 2019 (06).jpg',
      lahde: 'Bahnfrend, Commons (CC BY-SA 4.0)',
      lyhyt: 'Kalastusaluksia Victoria Dockissa Hobartissa, työsatama omenalaivojen tilalla.',
      selite: 'Kalastusaluksia Victoria Dockissa. Sama allas on yhä työsatama '
        + 'keskellä kaupunkia, mutta omenalaivojen sijaan laiturissa lepää '
        + 'kalastuslaivasto.',
    },
  },
  honiara: {
    tiedosto: 'Army and Marines on KuKum Beach, Guadalcanal, circa 1942.jpg',
    vuosi: '1942',
    lahde: 'USMC History Division, Thayer Soule -kokoelma, Commons (CC BY 2.0)',
    lyhyt: 'Kuormaa puretaan Kukumin rannalle Guadalcanalilla 1942, nyt Honiaran kaupunginosa.',
    selite: 'Kuormaa puretaan Kukumin rannalle Guadalcanalilla 1942; '
      + 'laituria ei ollut, joten kaikki tuli maihin rantaan asti. Kukum on '
      + 'nykyään Honiaran kaupunginosa: kaupunki perustettiin 1945 '
      + 'amerikkalaisten jättämän tukikohdan paikalle ja siitä tuli '
      + 'pääkaupunki 1952.',
    lisat: [
      {
        tiedosto: 'Honiara Central Market.jpg',
        vuosi: '2015',
        lahde: 'Phenss, Commons (CC BY-SA 4.0)',
        lyhyt: 'Honiaran keskustorin portti Mendana Avenuen varrella, kaupungin suurin kauppapaikka.',
        selite: 'Honiaran keskustorin portti Mendana Avenuen varrella. Tori on '
          + 'kaupungin suurin kauppapaikka, ja tavaraa tuodaan sinne veneillä '
          + 'myös muilta Salomonsaarilta.',
      },
      {
        tiedosto: 'A man selling fish at Honiara’s central market. (10662316344).jpg',
        vuosi: '2013',
        lahde: 'Irene Scott / AusAID, Commons (CC BY 2.0)',
        lyhyt: 'Kalanmyyjä Honiaran keskustorilla, aamun saalis myytävä saman päivän aikana.',
        selite: 'Kalanmyyjä Honiaran keskustorilla. Kala myydään pinoina pöydältä '
          + 'ilman jäitä, joten aamun saalis on kaupattava saman päivän '
          + 'aikana.',
      },
      {
        tiedosto: 'Honiara Mendana Avenue.jpg',
        vuosi: '2016',
        lahde: 'Torbenbrinker, Commons (CC BY-SA 4.0)',
        lyhyt: 'Mendana Avenue, Honiaran pääkatu, nimetty espanjalaisen Mendañan mukaan 1568.',
        selite: 'Mendana Avenue, Honiaran pääkatu. Katu on nimetty espanjalaisen '
          + 'Álvaro de Mendañan mukaan, joka purjehti saarille 1568 ja antoi '
          + 'niille Salomonin nimen.',
      },
    ],
    uusi: {
      tiedosto: 'Honiara panorama.jpg',
      vuosi: '2010',
      lahde: 'Friars Balsam, Commons (CC BY 2.0)',
      lyhyt: 'Honiara rinteeltä katsottuna, kasvoi sotilastukikohdan paikalle sodan jälkeen.',
      selite: 'Honiara rinteeltä katsottuna: etualalla lehtikattoisia taloja, '
        + 'alhaalla keskusta ja laivoja redillä. Kaupunki kasvoi toisen '
        + 'maailmansodan jälkeen sotilastukikohdan paikalle, ja '
        + 'Salomonsaarten hallinto siirrettiin tänne Tulagista.',
    },
  },
  kalgoorlie: {
    tiedosto: 'Crowd watching parade in Hannan Street, Kalgoorlie, 1901.jpg',
    vuosi: '1901',
    lahde: 'State Library of Western Australia, Commons (PD)',
    lyhyt: 'Väkeä seuraamassa kulkuetta Hannan Streetillä Kalgoorliessa 1901, kultakaupungin nousu.',
    selite: 'Väkeä seuraamassa kulkuetta Hannan Streetillä vuonna 1901. '
      + 'Kalgoorlien kulta löytyi 1893, ja alle kymmenessä vuodessa leiristä '
      + 'oli kasvanut kaupunki, jonka pääkadun varrella oli tiilisiä '
      + 'liiketaloja, postikonttori ja hotelleja.',
    lisat: [
      {
        tiedosto: 'Kalgoorlie Super Pit, October 2023 02.jpg',
        vuosi: '2023',
        lahde: 'Chuq, Commons (CC BY-SA 4.0)',
        lyhyt: 'Super Pit eli Fimistonin avolouhos Kalgoorlien laidalla, yli kolme kilometriä pitkä.',
        selite: 'Super Pit eli Fimistonin avolouhos Kalgoorlien laidalla. '
          + 'Kymmenet vanhat kuilukaivokset ostettiin 1980-luvun lopulla '
          + 'saman omistajan käsiin ja yhdistettiin yhdeksi kuopaksi, joka on '
          + 'runsaat kolme kilometriä pitkä.',
      },
      {
        tiedosto: 'Komatsu PC8000, Super Pit, 2016.jpg',
        vuosi: '2016',
        lahde: 'Bahnfrend, Commons (CC BY-SA 4.0)',
        lyhyt: 'Käytöstä poistettu kaivinkone Super Pitin näköalapaikalla Kalgoorliessa.',
        selite: 'Käytöstä poistettu Komatsu PC8000 -kaivinkone esillä Super Pitin '
          + 'näköalapaikalla. Kauhan koosta hahmottaa, millä välineillä '
          + 'kultamalmia louhoksessa siirretään.',
      },
      {
        tiedosto: 'Palace Hotel, Kalgoorlie, 2016.jpg',
        vuosi: '2016',
        lahde: 'Bahnfrend, Commons (CC BY-SA 4.0)',
        lyhyt: 'Palace Hotel Hannan Streetin kulmassa Kalgoorliessa, kultakauden parvekehotelli.',
        selite: 'Palace Hotel Hannan Streetin ja Maritana Streetin kulmassa. '
          + 'Kultakauden hotellit rakennettiin leveine parvekkeineen ja '
          + 'pylväskäytävineen, jotka varjostavat jalkakäytävää autiomaan '
          + 'auringolta.',
      },
    ],
    uusi: {
      tiedosto: 'Hannan Street looking south.jpg',
      vuosi: '2017',
      lahde: 'JarrahTree, Commons (CC BY 2.5 AU)',
      lyhyt: 'Hannan Street Kalgoorliessa nykyään, leveä pääkatu kuin vanhassa kuvassa.',
      selite: 'Hannan Street nykyään etelään päin. Kadun päässä kohoaa '
        + 'kaupungintalon kellotorni, ja pääkatu on yhä yhtä leveä kuin '
        + 'vanhassa kuvassa — kultakenttien kaupungit mitoitettiin väljiksi '
        + 'alusta alkaen.',
    },
  },
  melbourne: {
    tiedosto: 'Collins Street, near the corner of Spring Street.jpg',
    vuosi: '1880–1900',
    lahde: 'State Library Victoria, Commons (PD-Australia)',
    lyhyt: 'Collins Streetin itäpää Melbournessa, köysiraitiovaunu ilman omaa moottoria.',
    selite: 'Collins Streetin itäpää albumiinivedoksella; keskellä on '
      + 'Grosvenor Chambers, joka rakennettiin taiteilijoiden '
      + 'ateljeetaloksi. Kadulla kulkee köysiraitiovaunu: sillä ei ollut '
      + 'omaa moottoria, vaan se tarttui kadun alla pyörivään '
      + 'teräsvaijeriin.',
    lisat: [
      {
        tiedosto: 'Melbourne (AU), Queen Victoria Market -- 2019 -- 1535.jpg',
        vuosi: '2019',
        lahde: 'Dietmar Rabich, Commons (CC BY-SA 4.0)',
        lyhyt: 'Queen Victoria Marketin lihahallin päätykolmio Melbournessa, sika, nauta ja lammas veistettynä.',
        selite: 'Queen Victoria Marketin päätykolmio. Kaaren sisään on veistetty '
          + 'sika, nauta ja lammas, ja alle on kaiverrettu torin nimi. '
          + 'Reliefi kertoo, mitä oven takaa löytyy: tämä on lihahallin '
          + 'sisäänkäynti.',
      },
      {
        tiedosto: 'Trams on Swanston Street July 2018.jpg',
        vuosi: '2018',
        lahde: 'Nick-D, Commons (CC BY-SA 3.0)',
        lyhyt: 'Raitiovaunuja Swanston Streetillä, Melbournen verkko ainoa purkamaton Australiassa.',
        selite: 'Kaksi raitiovaunua matkalla pohjoiseen Swanston Streetiä. '
          + 'Melbournen raitiotieverkko on maailman laajimpia, ja se on ainoa '
          + 'Australian suurkaupunkiverkoista, jota ei purettu autoilun '
          + 'tieltä 1900-luvun puolivälissä.',
      },
      {
        tiedosto: 'Hosier Lane Melbourne Australia 2.jpg',
        vuosi: '2014',
        lahde: 'MusikAnimal, Commons (CC BY-SA 4.0)',
        lyhyt: 'Hosier Lane, Melbournen katutaidekuja keskustan huoltokujien joukossa.',
        selite: 'Hosier Lane, yksi keskustan kapeista huoltokujista. Seinät '
          + 'maalataan uudelleen jatkuvasti, ja kaupunki on antanut osalle '
          + 'kujista luvan katutaiteeseen sen sijaan että poistaisi sen.',
      },
    ],
    uusi: {
      tiedosto: 'Collins Street east end.jpg',
      lahde: 'HappyWaldo, Commons (CC BY-SA 4.0)',
      lyhyt: 'Collins Streetin itäpää Melbournessa nykyään, toimistotorneja matalan kivikaupungin päällä.',
      selite: 'Collins Streetin itäpää nykyään. Köysiraitiovaunun tilalla ajaa '
        + 'sähkövaunu ja matalan kivikaupungin päälle on noussut '
        + 'toimistotorneja, mutta kadun leveys ja plataanirivi ovat samat '
        + 'kuin vanhassa kuvassa.',
    },
  },
  milfordsound: {
    tiedosto: 'Mitre Peak. Milford Sound I LCCN2017658061.jpg',
    vuosi: '1890-luku',
    lahde: 'Photoglob Co. / Library of Congress (PD)',
    lyhyt: 'Mitre Peak Milford Soundin yllä photochrom-vedoksena, aikana jolloin sinne pääsi vain laivalla.',
    selite: 'Mitre Peak vuonon yllä käsinvärjättynä photochrom-vedoksena. '
      + 'Tällaisia vedoksia myytiin matkailijoille jo silloin, kun paikalle '
      + 'päästiin vain laivalla tai viikon vaelluksen päästä vuorten yli.',
    lisat: [
      {
        tiedosto: 'Stirling Falls, Milford Sound, South Island, New Zealand.jpg',
        vuosi: '2008',
        lahde: 'Karora, Commons (PD)',
        lyhyt: 'Stirlingin putous täydessä virtaamassa Milford Soundissa sateen jälkeen.',
        selite: 'Stirlingin putous täydessä virtaamassa sateen jälkeen. Kalliolta '
          + 'putoava vesi tulee ylhäältä jäätikön kaivamasta riippuvasta '
          + 'laaksosta, ja retkiveneet työntävät keulansa suoraan putouksen '
          + 'alle.',
      },
      {
        tiedosto: 'Fur seals at Milford Sound - panoramio.jpg',
        vuosi: '2012',
        lahde: 'Annette Teng, Commons (CC BY 3.0)',
        lyhyt: 'Uudenseelanninkarvahylkeitä Milford Soundin kalliolla, palannut pyynnin jälkeen.',
        selite: 'Uudenseelanninkarvahylkeitä loikoilemassa vuonon kalliolla. Laji '
          + 'oli 1800-luvun pyynnin jälkeen lähes hävinnyt, mutta on '
          + 'rauhoituksen myötä palannut rannikolle.',
      },
      {
        tiedosto: '00 1365 New Zealand - Homer Tunnel (Milford Sound).jpg',
        vuosi: '2009',
        lahde: 'W. Bulach, Commons (CC BY-SA 4.0)',
        lyhyt: 'Autoja Homerin tunnelin suulla, louhittu käsin 1930-luvulta, avattu 1954.',
        selite: 'Autoja odottamassa Homerin tunnelin suulla. Reilun kilometrin '
          + 'mittainen tunneli louhittiin käsityönä 1930-luvulta alkaen ja '
          + 'avattiin autoille vasta 1954; se on yhä ainoa maantie Milford '
          + 'Soundiin.',
      },
    ],
    uusi: {
      tiedosto: 'Mitre Peak of Milford Sound, New Zealand; February 2015.jpg',
      vuosi: '2015',
      lahde: 'Bernard Spragg, Commons (CC0)',
      lyhyt: 'Mitre Peak tänään, Milford Sound eli Piopiotahi sataa yli kuusi metriä vuodessa.',
      selite: 'Sama huippu tänään. Milford Sound on maorien kielellä Piopiotahi, '
        + 'ja siellä sataa yli kuusi metriä vuodessa — juuri sade tekee '
        + 'kalliopintojen putoukset, jotka katoavat parissa tunnissa poudan '
        + 'tultua.',
    },
  },
  mountisa: {
    tiedosto: 'StateLibQld 2 160404 Weekly Qantas plane service from Mount Isa to Brisbane, 1932.jpg',
    vuosi: '1932',
    lahde: 'State Library of Queensland, Commons (PD)',
    lyhyt: 'Qantasin viikoittainen kone Mount Isan hiekkakentällä 1932, sisämaan reittien alkuaikoina.',
    selite: 'Qantasin viikoittainen kone Mount Isan hiekkakentällä vuonna 1932. '
      + 'Kaksitaso on De Havilland DH.50J nimeltä Hippomenes, ja se hoiti '
      + 'yhteyttä Brisbaneen; Qantas aloitti nimenomaan sisämaan reiteillä, '
      + 'ei valtamerilennoilla.',
    lisat: [
      {
        tiedosto: 'Road train in Mount Isa, Queensland, 2023.jpg',
        vuosi: '2023',
        lahde: 'Chris Olszewski, Commons (CC BY-SA 4.0)',
        lyhyt: 'Neliperävaunuinen road train Mount Isan kadulla, pitkien välimatkojen kuljetusratkaisu.',
        selite: 'Neliperävaunuinen road train Mount Isan kadulla. '
          + 'Pohjois-Australiassa yksi vetoauto saa vetää neljää perävaunua, '
          + 'koska välimatkat ovat pitkiä ja rautateitä harvassa; kaupungin '
          + 'läpi kulkee Barkly Highway.',
      },
      {
        tiedosto: 'Mount Isa copper smelter 2002.jpg',
        vuosi: '2002',
        lahde: 'ChrisFountain, Commons (CC BY-SA 3.0)',
        lyhyt: 'Mount Isan kuparisulatto 2002, ISASMELT-menetelmä kehitetty ja myyty maailmalle.',
        selite: 'Mount Isan kuparisulatto vuonna 2002. Vasemmalla nosturin alla '
          + 'on ISASMELT-laitos: sulatusmenetelmä kehitettiin täällä ja sitä '
          + 'on sittemmin myyty kaivoksille ympäri maailman.',
      },
      {
        tiedosto: 'Mount Isa, Queensland - Underground hospital.jpg',
        vuosi: '2007',
        lahde: 'Mart Moppel, Commons (CC BY-SA 2.0)',
        lyhyt: 'Maanalainen sairaala Mount Isassa, louhittu toisen maailmansodan varasairaalaksi.',
        selite: 'Maanalainen sairaala Mount Isassa: kallioon louhittu käytävä, '
          + 'rautasänkyjä ja emalivateja. Kaivosmiehet louhivat tilan toisen '
          + 'maailmansodan aikana varasairaalaksi, ja se on nykyään museona.',
      },
    ],
    uusi: {
      tiedosto: 'Panorama of Mount Isa, Queensland.jpg',
      vuosi: '2006',
      lahde: 'Tennis expert, Commons (CC BY-SA 2.5)',
      lyhyt: 'Mount Isa ja kaivos samassa kuvassa, savupiippu yli 250 metriä korkea.',
      selite: 'Mount Isa ja sen kaivos samassa kuvassa. Kaupunki ja sulatto ovat '
        + 'Leichhardt-joen vastakkaisilla puolilla, ja savupiippu on yli 250 '
        + 'metriä korkea — se kohoaa ympäröivien punaisten kukkuloiden yli.',
    },
  },
  norfolk: {
    lisat: [
      {
        tiedosto: 'The view of the Kingston Town area - Taken on the Saturday, 12th July 2014 @ 11-49am (Sydney Time) - panoramio.jpg',
        vuosi: '2014',
        lahde: 'Christopher Wood, Commons (CC BY-SA 3.0)',
        lyhyt: 'Kingston ylhäältä Norfolkinsaarella, vankisiirtolan kivitaloja 1800-luvun alusta.',
        selite: 'Kingston ylhäältä katsottuna. Valkoiset kivitalot ovat '
          + 'vankisiirtolan ajalta 1800-luvun alkupuolelta, ja rantaa suojaa '
          + 'riutta; saarella ei ole satamaa, joten tavarat on aina tuotu '
          + 'maihin veneillä juuri täältä.',
      },
      {
        tiedosto: 'Emily Bay Norfolk Island.jpg',
        vuosi: '2018',
        lahde: 'Inas, Commons (CC BY-SA 4.0)',
        lyhyt: 'Emily Bay Kingstonin edustalla Norfolkinsaarella, riutan tyynnyttämä uimapaikka.',
        selite: 'Emily Bay Kingstonin edustalla. Riutta katkaisee aallokon ja '
          + 'tekee lahdesta saaren tyynen uimapaikan — riutan korallit ovat '
          + 'maailman eteläisimpiä.',
      },
      {
        tiedosto: 'Norfolk Island (41).jpg',
        vuosi: '2017',
        lahde: 'Brian, Commons (CC BY-SA 2.0)',
        lyhyt: 'Norfolkinsaaren rannikkoa norfolkinmäntyineen, kasvaa luonnossa vain täällä.',
        selite: 'Norfolkinsaaren rannikkoa: jyrkkiä rinteitä, punaruskeaa maata '
          + 'ja norfolkinmäntyjä. Puu kasvaa luonnonvaraisena vain täällä, ja '
          + 'sen suorat rungot olivat yksi syy siirtokunnan perustamiseen — '
          + 'mastopuuksi puu osoittautui lopulta liian hauraaksi.',
      },
    ],
    uusi: {
      tiedosto: 'Kingston, Norfolk Island.jpg',
      vuosi: '2006',
      lahde: 'thinboyfatter, Commons (CC BY 2.0)',
      lyhyt: 'Kingston norfolkinmäntyjen välistä, hallinnollinen keskus vankisiirtolan rakennuksineen.',
      selite: 'Kingston norfolkinmäntyjen välistä. Alarinteessä näkyvät '
        + 'vankisiirtolan ajan rakennukset ja niiden takana avomeri; Kingston '
        + 'on saaren hallinnollinen keskus, mutta kaupat ja asutus ovat '
        + 'ylhäällä Burnt Pinen kylässä.',
    },
  },
  noumea: {
    tiedosto: 'Nouméa - Hauts fourneaux Ballande - Ch. B. Nething - btv1b10121338v.jpg',
    vuosi: '1900–1920-luku',
    lahde: 'Ch. B. Nething / Gallica, Ranskan kansalliskirjasto (PD)',
    lyhyt: 'Ballanden masuunit Nouméan lahdella, Uuden-Kaledonian nikkeliä sulatetaan 1860-luvulta.',
    selite: 'Ballanden masuunit savuavat Nouméan lahden toisella rannalla, '
      + 'etualalla kulkee malmivaunuja. Uuden-Kaledonian nikkeli löydettiin '
      + '1860-luvulla, ja sitä alettiin sulattaa saarella itsellään sen '
      + 'sijaan että malmi olisi viety kokonaan pois.',
    lisat: [
      {
        tiedosto: 'Noumea Market.jpg',
        vuosi: '2006',
        lahde: 'Fanny Schertzer, Commons (CC BY-SA 3.0)',
        lyhyt: 'Bataattikauppias Nouméan torilla varhain aamulla.',
        selite: 'Bataattikauppias Nouméan torilla. Tori on kaupungin rannassa, ja '
          + 'se avautuu varhain aamulla: kalastajat tuovat yön saaliin samaan '
          + 'aikaan kuin viljelijät juurekset.',
      },
      {
        tiedosto: 'Kanak house.jpg',
        vuosi: '2007',
        lahde: 'Fanny Schertzer, Commons (CC BY-SA 3.0)',
        lyhyt: 'Kanakien suuri maja Tjibaoun kulttuurikeskuksen alueella, veistetty kattokeihäs suvun merkkinä.',
        selite: 'Kanakien suuri maja Tjibaoun kulttuurikeskuksen alueella. Harjan '
          + 'päässä on flèche faîtière, veistetty kattokeihäs, joka kertoo '
          + 'kenen suvun maja on kyseessä.',
      },
      {
        tiedosto: 'Jean-Marie Tjibaou Cultural Centre, filmed in June 2013.jpg',
        vuosi: '2013',
        lahde: 'Gérard, Commons (CC BY-SA 2.0)',
        lyhyt: 'Jean-Marie Tjibaoun kulttuurikeskus Nouméassa, Renzo Pianon suunnittelemat puiset kaaret.',
        selite: 'Jean-Marie Tjibaoun kulttuurikeskus Nouméan niemellä. Renzo '
          + 'Pianon suunnittelemat puiset kaaret jäljittelevät keskeneräistä '
          + 'kanakimajaa, ja keskus on nimetty itsenäisyysliikkeen johtajan '
          + 'mukaan, joka murhattiin 1989.',
      },
    ],
    uusi: {
      tiedosto: 'Morning over Noumea.jpg',
      vuosi: '2018',
      lahde: 'Ijgordon59, Commons (CC BY-SA 4.0)',
      lyhyt: 'Nouméan teollisuussatama aamulla, nikkeli yhä sama vientitavara kuin sata vuotta sitten.',
      selite: 'Nouméan teollisuussatama varhain aamulla. Nikkeli on yhä sama '
        + 'tavara kuin sata vuotta sitten: Uusi-Kaledonia on maailman '
        + 'suurimpia tuottajia, ja sulatto savuaa kaupungin laidalla '
        + 'edelleen.',
    },
  },
  nullarbor: {
    tiedosto: 'Camel train crossing Nullarbor Plain(GN00374).jpg',
    vuosi: '1910-luku',
    lahde: 'State Government Photographer / History Trust of South Australia, Commons (CC0)',
    lyhyt: 'Kamelikaravaani Nullarborin tasangolla noin 1915, "ei puuta" -nimen alkuperä.',
    selite: 'Kamelikaravaani ylittämässä Nullarborin tasankoa noin vuonna 1915. '
      + 'Nimi tulee latinan sanoista nullus arbor, ei puuta: maassa kasvaa '
      + 'suolayrttiä ja matalaa pensasta mutta ei metsää, ja tavarat kulkivat '
      + 'täällä kameleilla ennen rautatietä.',
    lisat: [
      {
        tiedosto: 'Late afternoon in Cook.jpg',
        vuosi: '2012',
        lahde: 'Rosslyn Young, Commons (CC BY-SA 4.0)',
        lyhyt: 'Rata Cookin pysäkillä, maailman pisin suora ratapätkä 478 kilometriä.',
        selite: 'Rata Cookin pysäkillä myöhään iltapäivällä. Tästä alkaa maailman '
          + 'pisin suora ratapätkä, 478 kilometriä ilman ainuttakaan '
          + 'kaarretta; Cookissa asuu enää kourallinen ihmisiä, ja kylä '
          + 'palvelee vain rautatietä.',
      },
      {
        tiedosto: 'Bunda Cliffs, 2017 (01).jpg',
        vuosi: '2017',
        lahde: 'Bahnfrend, Commons (CC BY-SA 4.0)',
        lyhyt: 'Bundan jyrkänteet Suuren Australianlahden rannalla, Nullarborin kalkkikivireuna.',
        selite: 'Bundan jyrkänteet Suuren Australianlahden rannalla. Nullarborin '
          + 'kalkkikivitasanko päättyy tähän kuin veitsellä leikaten, ja '
          + 'jyrkänne jatkuu rantaviivaa pitkin kymmeniä kilometrejä yhtenä '
          + 'muurina.',
      },
      {
        tiedosto: 'Eucla-Reid Road, Eucla, 2017 (02).jpg',
        vuosi: '2017',
        lahde: 'Bahnfrend, Commons (CC BY-SA 4.0)',
        lyhyt: 'Tie laskeutuu Euclassa tasangolta Roen tasangolle Suuren Australianlahden äärellä.',
        selite: 'Tie laskeutuu Euclan kohdalla tasangon reunalta alas Roen '
          + 'tasangolle, ja taustalla siintää Suuri Australianlahti. '
          + 'Nullarbor päättyy täällä portaaseen, jonka alapuolelle jää kapea '
          + 'rannikkokaistale.',
      },
    ],
    uusi: {
      tiedosto: 'Eyre Highway, South Australia (on Nullarbor Plain) - eastward.jpg',
      vuosi: '2023',
      lahde: 'Chuq, Commons (CC BY-SA 4.0)',
      lyhyt: 'Eyre Highway Nullarborin poikki, ainoa päällystetty tieyhteys Länsi-Australiaan.',
      selite: 'Eyre Highway itään päin Nullarborin poikki. Tie on ainoa '
        + 'päällystetty maantieyhteys Länsi-Australian ja muun mantereen '
        + 'välillä, ja sen pisin suora osuus on lähes 150 kilometriä.',
    },
  },
  perth: {
    tiedosto: 'Esplanade 29011900.jpg',
    vuosi: '1900',
    lahde: 'Tuntematon kuvaaja, Commons (PD-Australia)',
    lyhyt: 'Länsi-Australian joukko-osasto Perthin esplanadilla 1900, matkalla buurisotaan.',
    selite: 'Länsi-Australian joukko-osasto paraatissa Perthin esplanadilla '
      + '29. tammikuuta 1900, matkalla buurisotaan Etelä-Afrikkaan. '
      + 'Ratsastajat seisovat riveissä joen puoleisella nurmikentällä, '
      + 'yleisö tiiviinä muurina. Kuva on säilynyt lehden '
      + 'rasteripainoksena.',
    lisat: [
      {
        tiedosto: 'Fremantle markets fruit veg gn.jpg',
        vuosi: '2021',
        lahde: 'Gnangcomapp, Commons (CC BY-SA 4.0)',
        lyhyt: 'Hedelmä- ja vihannestiski Fremantlen kauppahallissa Perthin satamakaupungissa.',
        selite: 'Hedelmä- ja vihannestiski Fremantlen kauppahallissa, Perthin '
          + 'satamakaupungissa. Halli on toiminut samassa 1800-luvun lopun '
          + 'tiilirakennuksessaan yli sata vuotta ja on auki vain viikonlopun '
          + 'ympärillä.',
      },
      {
        tiedosto: 'Perth City from Kings Park (6916729629).jpg',
        vuosi: '2012',
        lahde: 'Aaron Meads, Commons (CC BY 2.0)',
        lyhyt: 'Perthin keskusta illalla Kings Parkista, autojen valot viivoina kadulla.',
        selite: 'Perthin keskusta illalla Kings Parkista kuvattuna. Valotusaika '
          + 'on pitkä, joten autojen valot piirtyvät kadulle viivoiksi. Kings '
          + 'Park on kaupungin yläpuolella oleva laaja puisto, josta keskusta '
          + 'ja Swan-joki näkyvät samalla kertaa.',
      },
      {
        tiedosto: 'Cottesloe Beach, May 2021 02.jpg',
        vuosi: '2021',
        lahde: 'Calistemon, Commons (CC BY-SA 4.0)',
        lyhyt: 'Cottesloen ranta Perthin länsipuolella, aurinko laskee suoraan Intian valtamereen.',
        selite: 'Cottesloen ranta Perthin länsipuolella, kuvattuna pohjoisesta '
          + 'John Streetin päässä olevalta pysäköintialueelta. Perthin rannat '
          + 'avautuvat Intian valtamerelle, joten aurinko laskee niillä '
          + 'suoraan mereen.',
      },
    ],
    uusi: {
      tiedosto: 'Perth (AU), Elizabeth Quay -- 2019 -- 0259.jpg',
      lahde: 'Dietmar Rabich, Commons (CC BY-SA 4.0)',
      lyhyt: 'Elizabeth Quayn allas ja keskustan tornit Perthissä, kaivosyhtiöiden nimet katoilla.',
      selite: 'Elizabeth Quayn allas ja keskustan tornit Swan-joen rannalla; '
        + 'oikealla kaartuu Spanda-veistoksen teräskaari. Korkeimpien tornien '
        + 'katoilla lukee BHP ja Rio Tinto — kaivosyhtiöiden nimet kertovat, '
        + 'mistä Länsi-Australian talous tulee.',
    },
  },
  portmoresby: {
    tiedosto: 'Picturesque New Guinea Plate V (a) - Loading Lakatoi, Port Moresby.jpg',
    vuosi: '1885',
    lahde: 'John William Lindt, Commons (PD)',
    lyhyt: 'Lakatoita lastataan Port Moresbyn rannalla, motu-kansan saagokauppaa Papuanlahdelle.',
    selite: 'Lakatoita lastataan Port Moresbyn rannalla. Etualan ruuhessa on '
      + 'savipottuja, joita motu-kansa vei näillä rapusaksipurjeisilla '
      + 'lautta-aluksilla länteen Papuanlahdelle ja vaihtoi ne saagoon. J. W. '
      + 'Lindt kuvasi matkan retkikunnan valokuvaajana.',
    lisat: [
      {
        tiedosto: 'Port Moresby Fish Market.jpg',
        vuosi: '2008',
        lahde: 'Taro Taylor, Commons (CC BY 2.0)',
        lyhyt: 'Kalakauppias Port Moresbyn kalatorilla, saalis omalta riutalta ja lahdelta.',
        selite: 'Kalakauppias nostaa saalistaan esiin Port Moresbyn kalatorilla. '
          + 'Kaupungin kalat tulevat pääosin sen omalta riutalta ja lahdelta, '
          + 'ja ne myydään samana päivänä kuin ne on nostettu.',
      },
      {
        tiedosto: 'Stilt houses - Port Moresby (48641133468).jpg',
        vuosi: '2019',
        lahde: 'gailhampshire, Commons (CC BY 2.0)',
        lyhyt: 'Paalutaloja Port Moresbyn sataman vesillä, motu-kansan Hanuabada-kylä.',
        selite: 'Paalutaloja Port Moresbyn sataman vesillä. Motu-kansan kylät '
          + 'rakennettiin vedelle jo ennen kaupunkia, ja niissä kadut ovat '
          + 'lankkusiltoja talolta talolle. Suurin niistä on Hanuabada.',
      },
      {
        tiedosto: 'Hirimoale2.jpg',
        vuosi: '2004',
        lahde: 'Steve Jurvetson, Commons (CC BY 2.0)',
        lyhyt: 'Tanssijoita Hiri Moale -juhlassa Port Moresbyssä, hiri-purjehdusten muistoksi.',
        selite: 'Tanssijoita Hiri Moale -juhlassa Port Moresbyssä. Juhla pidetään '
          + 'vuosittain muistona hiri-purjehduksista, joilta lakatoit '
          + 'palasivat saagolastissa vasta kuukausien kuluttua.',
      },
    ],
    uusi: {
      tiedosto: 'POM Downtown.jpg',
      vuosi: '2018',
      lahde: 'Wikiedit.ray, Commons (CC BY-SA 4.0)',
      lyhyt: 'Port Moresbyn keskusta ja satama nykyään, konttiterminaali entisten lakatoiden lahdella.',
      selite: 'Port Moresbyn keskusta ja satama nykyään. Samassa lahdessa, jossa '
        + 'lakatoit lastattiin, on nyt konttiterminaali ja nostureita; '
        + 'kaupunki sai nimensä brittikapteeni John Moresbylta, joka purjehti '
        + 'tänne 1873.',
    },
  },
  portvila: {
    tiedosto: 'Nouvelles Hebrides - Debarquement d\' assassins à Port Vila - Campagne \'Kersaint\'.jpg',
    vuosi: '1910-luku',
    lahde: 'G. de Béchade, Nouméa, Commons (PD)',
    lyhyt: 'Postikortti Port Vilan laiturilta: ranskalaisen partiolaivan tuomia vankeja saatetaan maihin.',
    selite: 'Postikortti Port Vilan laiturilta: ranskalaisen partiolaivan '
      + 'Kersaintin tuomia vankeja saatetaan maihin kapearaiteisen '
      + 'kiskoradan viertä. Uusia Hebrideitä hallitsivat tuolloin Britannia '
      + 'ja Ranska yhdessä, kummallakin oma poliisi ja tuomioistuin.',
    lisat: [
      {
        tiedosto: 'PortVilaMarketHall.jpg',
        vuosi: '2013',
        lahde: 'Torbenbrinker, Commons (CC BY-SA 3.0)',
        lyhyt: 'Port Vilan kauppahalli rannan tuntumassa, auki maanantaista lauantaihin.',
        selite: 'Port Vilan kauppahalli rannan tuntumassa. Halli on auki lähes '
          + 'yhtäjaksoisesti maanantaista lauantaihin, ja kaukaa tulevat '
          + 'myyjät nukkuvat kojunsa vieressä koko viikon.',
      },
      {
        tiedosto: 'Port Vila vegetable market, Vanuatu 2007. Photo- Rob Maccoll - AusAID (10714150144).jpg',
        vuosi: '2007',
        lahde: 'Rob Maccoll / AusAID, Commons (CC BY 2.0)',
        lyhyt: 'Hedelmiä ja juureksia Port Vilan torilla, Vanuatun perhepuutarhojen ylijäämää.',
        selite: 'Hedelmiä ja juureksia Port Vilan torilla: papaijaa, karambolaa '
          + 'ja jamssia. Vanuatun ruoka tulee pääosin perheiden omilta '
          + 'puutarhapalstoilta, ja tori on se paikka, jossa ylijäämä muuttuu '
          + 'rahaksi.',
      },
      {
        tiedosto: 'Vanuatu Inter-island ferry, Port Vila, 2 June 2006 - Flickr - PhillipC.jpg',
        vuosi: '2006',
        lahde: 'Phillip Capper, Commons (CC BY 2.0)',
        lyhyt: 'Saarten välinen lautta Port Vilan satamassa, rahti ja matkustajat samalla kannella.',
        selite: 'Saarten välinen lautta Port Vilan satamassa. Vanuatu on yli 80 '
          + 'saarta, joista noin 65:llä asutaan, joten rahti ja matkustajat '
          + 'kulkevat samalla kannella.',
      },
    ],
    uusi: {
      tiedosto: 'Port Vila waterfront, Vanuatu, 2 June 2006 - Flickr - PhillipC.jpg',
      vuosi: '2019',
      lahde: 'Phillip Capper, Commons (CC BY 2.0)',
      lyhyt: 'Näkymä Port Vilan suojaisan sataman yli, purjeveneitä ja rantakadun rakennuksia.',
      selite: 'Näkymä yli suojaisan sataman: kymmeniä purjeveneitä ja pieniä '
        + 'työveneitä poijuissa, ja takana rantakadun matalat toimisto- ja '
        + 'hotellirakennukset nousevat rinteeseen tiheän viidakon keskelle.',
    },
  },
  sepik: {
    tiedosto: 'Ceremonieel huis (tambaran) in het Sepik-gebied op Australisch Nieuw-Guinea, KITLV 153233.tiff',
    vuosi: '1921',
    lahde: 'KITLV, Leidenin yliopiston kirjastot (CC BY 4.0)',
    lyhyt: 'Henkitalo eli haus tambaran Sepikin alueella, klaanin veistosten säilytyspaikka.',
    selite: 'Henkitalo eli haus tambaran Sepikin alueella. Korkea kärkiharja '
      + 'kohoaa palmujen yli, ja kylän aukio on lakaistu talon eteen. '
      + 'Tällaiseen taloon kokoontuivat vain miehet, ja siellä säilytettiin '
      + 'klaanin veistokset ja huilut.',
    lisat: [
      {
        tiedosto: 'Haus Tambaran, Apangai.jpg',
        vuosi: '2012',
        lahde: 'Ingo Kühl / Sylt-Tinto, Commons (CC0)',
        lyhyt: 'Apangain henkitalo Itä-Sepikissä, maalattu kolmiopääty nojaa taaksepäin kuin purje.',
        selite: 'Apangain henkitalo Itä-Sepikin maakunnassa. Maprikin seudulla '
          + 'haus tambaranin päädystä tehdään valtava maalattu kolmio, joka '
          + 'nojaa taaksepäin kuin purje — talon takaosa on matala ja kapea.',
      },
      {
        tiedosto: 'Sago Palm being harvested for Sago production PNG.jpg',
        vuosi: '2004',
        lahde: 'Toksave, Commons (CC BY-SA 3.0)',
        lyhyt: 'Saagopalmu kaadetaan ja avataan Itä-Sepikissä, tärkkelys jokivarren perusruokana.',
        selite: 'Saagopalmu kaadetaan ja avataan Itä-Sepikissä. Rungon sisus '
          + 'hakataan murskaksi ja huuhdellaan vedellä, jolloin tärkkelys '
          + 'laskeutuu pohjalle. Se on Sepikin jokivarren perusruoka, eikä '
          + 'sitä viljellä vaan korjataan suoraan suometsästä.',
      },
      {
        tiedosto: 'Sepik 0266.jpg',
        vuosi: '2010',
        lahde: 'Top1963 (Tryfon Topalidis), Commons (CC BY-SA 3.0)',
        lyhyt: 'Rahtialus ylittää Sepikin, joki alueen ainoa kulkuväylä.',
        selite: 'Rahtialus ylittää Sepikin, kaksi lasta katselee laiturilta. '
          + 'Jokea pitkin liikkuu tavara ja väki: alueella ei juuri ole '
          + 'teitä, ja vene on sama kuin bussi.',
      },
    ],
    uusi: {
      tiedosto: 'Men\'s house in Tambunum village, Sepik River, Papua New Guinea (side view).jpg',
      vuosi: '2014',
      lahde: 'Eksilverman, Commons (CC BY-SA 4.0)',
      lyhyt: 'Tambunumin kylän miestentalo Sepikillä, iatmulien krokotiiliklaanin rakennus noin 2010.',
      selite: 'Tambunumin kylän uusin miestentalo keski-Sepikillä, rakennettu '
        + 'noin 2010. Se kuuluu iatmulien krokotiiliklaanille, ja '
        + 'kuvanottohetkellä sisällä käytiin muodollista neuvonpitoa. Talot '
        + 'uusitaan, mutta muoto pysyy.',
    },
  },
  suva: {
    tiedosto: 'Fiji Islands. Suva creek scene and township, 1903, PH-NEG-2561 001.jpg',
    vuosi: '1903',
    lahde: 'Henry Winkelmann / Auckland Museum (PD)',
    lyhyt: 'Veneitä Suvan puron rannassa, Fidžin pääkaupunki vuodesta 1882.',
    selite: 'Veneitä Suvan puron rannassa, taustalla kaupungin puutaloja ja '
      + 'venevaja. Suvasta oli tehty Fidžin pääkaupunki 1882, kun vanha '
      + 'satamakaupunki Levuka kävi vuorten välissä liian ahtaaksi kasvaa.',
    lisat: [
      {
        tiedosto: 'Suva, Fiji 92.jpg',
        vuosi: '2014',
        lahde: 'Maksym Kozlenko, Commons (CC BY-SA 4.0)',
        lyhyt: 'Katukojuja Suvassa, pressut suojana sateiselta tuulenpuoleiselta rannikolta.',
        selite: 'Katukojuja Suvassa. Pressut on pingotettu puun oksien ja kojujen '
          + 'väliin varjoksi, ja tiskeillä on suuria juoma-astioita. Suva on '
          + 'Fidžin sateisella tuulenpuoleisella rannikolla, joten katos on '
          + 'tarpeen sekä auringolta että vedeltä.',
      },
      {
        tiedosto: 'Gouvernment Building Suva MatthiasSuessen-8442.jpg',
        vuosi: '2015',
        lahde: 'Matthias Süßen, Commons (CC BY-SA 3.0)',
        lyhyt: 'Hallintorakennus eli Government Buildings Suvassa, valmistui 1930-luvulla täyttömaalle.',
        selite: 'Hallintorakennus eli Government Buildings Suvassa. Talo '
          + 'valmistui 1930-luvulla mereltä täyttämälle maalle, ja siinä '
          + 'toimivat sekä parlamentti että oikeusistuimet.',
      },
      {
        tiedosto: 'Changing the Guards Suva MatthiasSuessen-8976.jpg',
        vuosi: '2015',
        lahde: 'Matthias Süßen, Commons (CC BY-SA 3.0)',
        lyhyt: 'Vartionvaihto hallintorakennuksen edessä Suvassa, sulu-vaate juhlapuvussa.',
        selite: 'Vartionvaihto hallintorakennuksen edessä Suvassa. '
          + 'Vartiosotilaiden juhlapukuun kuuluu sulu, hameen tapaan kiedottu '
          + 'kangas, jonka helma on leikattu sahalaitaiseksi.',
      },
    ],
    uusi: {
      tiedosto: 'Suva (Fiji).jpg',
      vuosi: '2014',
      lahde: 'Gerold Steinhorst, Commons (CC BY-SA 4.0)',
      lyhyt: 'Suvan rantapromenadi ja laivoja lahdella, satama Tyynenmeren solmukohtana.',
      selite: 'Suvan rantapromenadi ja laivoja ankkurissa lahdella. Satama on yhä '
        + 'Tyynenmeren saarten solmukohta: täältä lähtevät rahtilaivat '
        + 'Tongaan, Samoalle ja Tuvaluun.',
    },
  },
  sydney: {
    tiedosto: 'Sydney Harbour LCCN2017657737.jpg',
    vuosi: '1890',
    lahde: 'Photoglob Co., Library of Congress (PD)',
    lyhyt: 'Sydneyn satama photochrom-vedoksena, väritetty ennen värivalokuvan aikaa.',
    selite: 'Sydneyn satama käsinvärillisenä photochrom-vedoksena. '
      + 'Photochromissa mustavalkoinen negatiivi siirrettiin useille '
      + 'kivilaatoille ja painettiin väreissä; vedoksia myytiin '
      + 'matkailijoille aikana, jolloin värivalokuvaa ei vielä ollut.',
    lisat: [
      {
        tiedosto: 'SydFishMarkets.jpg',
        vuosi: '2018',
        lahde: 'MDRX, Commons (CC BY-SA 4.0)',
        lyhyt: 'Kalatorin myyntitiski Sydneyssä, kaloja, katkarapuja ja kuningasrapua jäillä.',
        selite: 'Kalatorin myyntitiski Sydneyssä. Jään päällä on kokonaisia '
          + 'kaloja, katkarapuja, taskurapuja ja kuningasravun jalkoja, ja '
          + 'hintalapuissa lukee muun muassa eastern school whiting ja king '
          + 'crab clusters. Taustalla työntekijät perkaavat saalista tiskin '
          + 'takana.',
      },
      {
        tiedosto: 'Manly Ferry arrives at Circular Quay.jpg',
        vuosi: '2021',
        lahde: 'Hardlinerr, Commons (CC BY-SA 4.0)',
        lyhyt: 'Manlyn lautta Circular Quaylle, taustalla oopperatalo ja satamansilta.',
        selite: 'Manlyn lautta saapuu Circular Quaylle, taustalla oopperatalo ja '
          + 'satamansilta. Lautta ei ole Sydneyssä nähtävyyskierros vaan osa '
          + 'tavallista joukkoliikennettä: samalla matkakortilla noustaan '
          + 'bussiin, junaan ja laivaan.',
      },
      {
        tiedosto: '(1)Bondi Beach lifesavers.jpg',
        vuosi: '2018',
        lahde: 'Sardaka, Commons (CC BY-SA 4.0)',
        lyhyt: 'Rantapelastajia Bondin rannalla, Australian vapaaehtoinen surf lifesaving.',
        selite: 'Rantapelastajia Bondin rannalla. Australian surf lifesaving '
          + '-klubit toimivat vapaaehtoisvoimin, ja punakeltainen lippupari '
          + 'merkitsee rannalle sen kaistan, jonka sisällä uiminen on '
          + 'valvottua.',
      },
    ],
    uusi: {
      tiedosto: 'Sydney Harbour from Circular Quay.jpg',
      lahde: 'Paul Carmona, Commons (CC BY 2.0)',
      lyhyt: 'Sydneyn satama nykyään Circular Quaylta, silta 1932 ja oopperatalo 1973.',
      selite: 'Sama satama nykyään Circular Quayn lauttaterminaalilta. Kumpaakaan '
        + 'maamerkkiä ei ollut vanhan vedoksen aikaan: satamansilta valmistui '
        + '1932 ja oopperatalo 1973 niemekkeelle, jossa oli sitä ennen '
        + 'raitiovaunuvarikko.',
    },
  },
  townsville: {
    tiedosto: 'StateLibQld 1 235004 Scene at Jetty Wharf, Townsville, Queensland, 1901.jpg',
    vuosi: '1901',
    lahde: 'John Oxley Library, State Library of Queensland, Commons (PD-Australia)',
    lyhyt: 'Laivoja Jetty Wharfin laiturissa Townsvillessa 1901, sokerin ja villan vientiä.',
    selite: 'Laivoja Jetty Wharfin laiturissa 26. elokuuta 1901. Albumin sivulle '
      + 'on kirjoitettu alusten nimet ja vetoisuudet: Perthshire 5530 tonnia, '
      + 'Barcoo 1605, Innamincka 2501 ja barkki Tourist 774. Satamasta '
      + 'vietiin Pohjois-Queenslandin sokeria, villaa ja malmia.',
    lisat: [
      {
        tiedosto: 'Strand Pier, Townsville, 2023, 01.jpg',
        vuosi: '2023',
        lahde: 'Kgbo, Commons (CC BY-SA 4.0)',
        lyhyt: 'Strandin laituri Townsvillen rantabulevardilla, uimapaikka meduusaverkolla suojattuna.',
        selite: 'Strandin laituri Townsvillen rantabulevardin varrella. '
          + 'Promenadin varrella on uima-altaita ja verkolla rajattu '
          + 'uimapaikka, sillä kesäkuukausina rannikon vedessä esiintyy '
          + 'myrkyllisiä meduusoja.',
      },
      {
        tiedosto: 'View from Castle Hill Lookout, Townsville, 2023, 01.jpg',
        vuosi: '2023',
        lahde: 'Kgbo, Commons (CC BY-SA 4.0)',
        lyhyt: 'Näkymä Castle Hillin näköalapaikalta Townsvillessa merelle ja Magnetic Islandille.',
        selite: 'Näkymä Castle Hillin näköalapaikalta merelle ja Magnetic '
          + 'Islandia kohti. Castle Hill on vaaleanpunertavasta graniitista '
          + 'muodostunut kukkula keskellä kaupunkia, ja sen laelle nousee '
          + 'sekä tie että portaat.',
      },
      {
        tiedosto: 'Flinders Street, Townsville, Queensland.jpg',
        vuosi: '2016',
        lahde: 'Kgbo, Commons (CC BY-SA 4.0)',
        lyhyt: 'Flinders Street, Townsvillen pääkatu, vanhoja pankki- ja hotellirakennuksia.',
        selite: 'Flinders Street on Townsvillen pääkatu. Sen varrella on säilynyt '
          + 'joukko vanhoja pankki- ja hotellirakennuksia ajalta, jolloin '
          + 'kaupunki oli Pohjois-Queenslandin kauppakeskus.',
      },
    ],
    uusi: {
      tiedosto: 'Views of the Port of Townsville from the Magnetic Island ferry, Townsville, Australia 01.jpg',
      lahde: 'Ridiculopathy, Commons (CC0)',
      lyhyt: 'Townsvillen satama Magnetic Islandin lautalta, irtolastia purjelaivojen tilalla.',
      selite: 'Townsvillen satama Magnetic Islandin lautalta nähtynä. Pitkän '
        + 'paalulaiturin päällä kulkee kuljetinhihna ja keskellä seisoo '
        + 'laivanlastauskone: purjelaivojen tilalla laiturissa käsitellään '
        + 'nykyään irtolastia.',
    },
  },
  uluru: {
    tiedosto: 'Camel team approaching Ayers Rock in search for Lasseter\'s body - John Bailey.jpg',
    vuosi: '1930-luku',
    lahde: 'State Library of New South Wales, Commons (PD)',
    lyhyt: 'Kamelijono etsimässä Harold Lasseterin ruumista Ayers Rockin lähellä.',
    selite: 'Kamelijono lähestymässä Ayers Rockia etsimässä Harold Lasseterin '
      + 'ruumista. Lasseter väitti löytäneensä keskisestä Australiasta '
      + 'valtavan kultasuonen ja katosi lähtiessään uudelleen etsimään sitä; '
      + 'etsintäretkikunnat liikkuivat aavikolla kameleilla.',
    lisat: [
      {
        tiedosto: 'Wet Uluru.jpg',
        vuosi: '2010',
        lahde: 'Harbison, Commons (CC BY-SA 3.0)',
        lyhyt: 'Sadevettä valumassa Ulurua pitkin Mutitjulun vesikuoppaan maaliskuussa 2010.',
        selite: 'Sadevettä valumassa Ulurua pitkin Mutitjulun vesikuoppaan '
          + 'maaliskuussa 2010. Sade on täällä harvinaista, mutta kun sitä '
          + 'tulee, kallion sivut muuttuvat tunneissa vesiputousten verkoksi.',
      },
      {
        tiedosto: 'Petermann Ranges (AU), Uluru-Kata Tjuta National Park, Uluru, Kuniya Walk -- 2019 -- 3656.jpg',
        vuosi: '2019',
        lahde: 'Dietmar Rabich, Commons (CC BY-SA 4.0)',
        lyhyt: 'Kalliomaalaus Kuniya-polun varrella Ulurun juurella, maaväreillä kallion suojassa.',
        selite: 'Kalliomaalaus Kuniya-polun varrella Ulurun juurella. Kuviot on '
          + 'tehty maaväreillä kallionkielekkeen suojaan, jossa ne ovat '
          + 'säilyneet sateelta ja tuulelta.',
      },
      {
        tiedosto: 'Mutitjulu Waterhole.jpg',
        vuosi: '2017',
        lahde: 'Coen Hird, Commons (CC BY-SA 4.0)',
        lyhyt: 'Mutitjulun vesikuoppa Ulurun juurella, vettä sateen ohjautuessa kalliolta.',
        selite: 'Mutitjulun vesikuoppa Ulurun juurella. Kallion sileät sivut '
          + 'ohjaavat sateen tänne, ja siksi kuopassa on vettä silloinkin, '
          + 'kun ympäröivä maa on kuiva.',
      },
    ],
    uusi: {
      tiedosto: 'Uluṟu (Ayers Rock), Sunset.jpg',
      vuosi: '2011',
      lahde: 'Weyf, Commons (CC0)',
      lyhyt: 'Uluru auringonlaskussa, punainen sävy hiekkakiven raudan hapettumisesta.',
      selite: 'Uluru auringonlaskussa. Punainen sävy syntyy hiekkakiven pinnan '
        + 'rautayhdisteiden hapettumisesta, ja matala aurinko korostaa sitä; '
        + 'kallolle kiipeäminen kiellettiin lopullisesti vuonna 2019.',
    },
  },
  wellington: {
    tiedosto: 'Kelburn cable car travelling on the incline, Wellington ATLIB 197000.png',
    vuosi: '1903',
    lahde: 'Albert Percy Godber / Alexander Turnbull Library (PD)',
    lyhyt: 'Kelburnin köysirata Wellingtonissa, avattiin viemään väkeä rinnekaupunginosaan.',
    selite: 'Kelburnin köysirata rinteessä, matkustaja istuu ulkopenkillä '
      + 'kameraan päin. Rata avattiin edellisenä vuonna viemään väkeä '
      + 'keskustasta ylös uudelle rinnekaupunginosalle, jonne muuten olisi '
      + 'ollut jyrkkä kävely.',
    lisat: [
      {
        tiedosto: 'Cuba Street Wellington 01.jpg',
        vuosi: '2026',
        lahde: 'Panamitsu, Commons (CC BY-SA 4.0)',
        lyhyt: 'Cuba Street Wellingtonissa, nimetty ensimmäiset uudisasukkaat tuoneen laivan mukaan.',
        selite: 'Cuba Street, Wellingtonin kahviloiden ja levykauppojen katu. '
          + 'Nimi ei tule Karibialta vaan Cuba-laivasta, joka toi kaupungin '
          + 'ensimmäiset uudisasukkaat 1840.',
      },
      {
        tiedosto: 'Beehive and Parliament House - Wellington - New Zealand - DSC00165.jpg',
        vuosi: '2024',
        lahde: 'Daderot, Commons (CC0)',
        lyhyt: 'Parlamenttitalo ja Mehiläispesä Wellingtonissa, pääkaupunki vuodesta 1865.',
        selite: 'Parlamenttitalo ja sen vieressä pyöreä hallintosiipi, jota '
          + 'kutsutaan Mehiläispesäksi. Wellingtonista tehtiin pääkaupunki '
          + '1865, koska se on maan keskellä eikä pohjoisessa niin kuin '
          + 'Auckland.',
      },
      {
        tiedosto: 'Wellington Harbour, Te Papa, 2016-01-25.jpg',
        vuosi: '2016',
        lahde: 'Szilas, Commons (PD)',
        lyhyt: 'Te Papa Tongarewa Wellingtonin sataman rannassa, rakennus liikkuu maanjäristyksessä.',
        selite: 'Te Papa Tongarewa, Uuden-Seelannin kansallismuseo, sataman '
          + 'rannassa. Rakennus lepää lyijy- ja kumituilla, jotka päästävät '
          + 'sen liikkumaan maanjäristyksessä — Wellington istuu suoraan '
          + 'siirroslinjan päällä.',
      },
    ],
    uusi: {
      tiedosto: 'Wellington Cable Car (20240206a) (53532605708).jpg',
      vuosi: '2024',
      lahde: 'Takeshi Aida, Commons (CC BY-SA 2.0)',
      lyhyt: 'Sama köysirata Wellingtonissa yli sata vuotta myöhemmin, sähköistetty 1979.',
      selite: 'Sama köysirata yli sata vuotta myöhemmin. Vaunut vaihdettiin '
        + 'sähkökäyttöisiin 1979, mutta reitti, jyrkkyys ja kolme tunnelia '
        + 'ovat entiset.',
    },
  },
};
