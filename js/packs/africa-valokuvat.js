// Vanhat valokuvat muistikirjan tueksi: yksi aikakauden mustavalkokuva
// per kaupunki sieltä, mistä sellainen löytyi vapaalla lisenssillä.
// Kuvat haetaan Wikimedia Commonsista (Special:FilePath skaalaa suoraan),
// lisenssi on varmistettu tiedostokohtaisesti (PD / CC0 / CC BY-SA) ja
// lähde näytetään postikortin kuvatekstissä. Ilman verkkoa pikkukuva jää
// siististi pois. Kaupungit, joille kelvollista vanhaa kuvaa ei vielä
// löytynyt, puuttuvat listalta — niitä täydennetään kun hyvä löytyy.
//
// `selite` on postikortin alle kirjoitettava parin lauseen kuvaus siitä,
// mitä kuvassa näkyy (omistajan toive). Lähde näytetään pienemmällä.
export const AFRICA_VALOKUVAT = {
  tanger: {
    lisat: [
      {
        tiedosto: 'Tangier - 44699733295.jpg',
        vuosi: '2015',
        lahde: 'Mike McBey, Commons (CC BY 2.0)',
        selite: 'Tangerin satama ja sen takana rinnettä ylös kiipeävä vanha '
          + 'kaupunki. Kalastusveneet ovat laiturissa aivan valkoisten '
          + 'talojen juurella, kuten laivalta katsoen nähdään yhä.',
      },
      {
        tiedosto: 'Faro del cabo Espartel, Marruecos, 2015-12-11, DD 02.JPG',
        vuosi: '2015',
        lahde: 'Diego Delso, Commons (CC BY-SA 4.0)',
        selite: 'Cap Spartelin majakka Tangerin länsipuolella. Majakka valmistui '
          + '1860-luvulla, joten se paloi jo silloin, kun päiväkirjan laivat '
          + 'kääntyivät salmeen.',
      },
    ],
    // Aiempi kuva (Tangier Grand Mosque 1900s.jpg) oli vain 184 px leveä
    // ja rakeinen suurennettuna; tämä on sama aika ja sama vilske,
    // mutta 4515 px leveänä lasilevyskannauksena.
    tiedosto: 'Le marché du Grand Soko à Tanger - btv1b532075360.jpg',
    vuosi: '1900-luvun alku',
    lahde: 'Agence Rol / Gallica, Commons (PD)',
    selite: 'Grand Socco medinan portin edessä täyttyi markkinapäivänä '
      + 'kameleista, muuleista ja kauppiaista — tämän tungoksen läpi '
      + 'isoisänkin oli kuljettava vanhaan kaupunkiin.',
    // Uusi kuva pilkottaa vanhan alta (omistajan kokeilu).
    uusi: {
      tiedosto: 'Panorama Tanger Bay Tangier Marokko.jpg',
      lahde: 'Herbert wie, Commons (CC BY-SA 4.0)',
      selite: 'Sama kaupunki nykyään: valkoiset talot kiipeävät yhä '
        + 'rinnettä, mutta lahden rantaan on kasvanut moderni satama.',
    },
  },
  kairo: {
    lisat: [
      {
        tiedosto: 'Giza, Pyramids, Pictures, 1870-1880, photo 1 of 27 - Archivio fotografico Museo Egizio, Turin INV01 003.jpg',
        vuosi: '1870-luku',
        lahde: 'Hippolyte Béchard / Museo Egizio, Commons (CC0)',
        selite: 'Khafren ja Menkauren pyramidit valokuvattuna 1870-luvulla — '
          + 'samoihin aikoihin, kun päiväkirjan matka kulki. Etualalla lepää '
          + 'paikallisia asukkaita raunioiden keskellä.',
      },
      {
        tiedosto: 'El Cairo, Khan al-Khalili 1999 03.jpg',
        vuosi: '1999',
        lahde: 'LBM1948, Commons (CC BY-SA 4.0)',
        selite: 'Hajuvesikaupan ikkuna Khan el-Khalilin basaarissa. Lasihyllyillä '
          + 'on satoja koristeltuja pulloja, joissa myydään tuoksuöljyjä.',
      },
    ],
    tiedosto: 'Kairo, marchands ambulants LCCN2017657437.jpg',
    vuosi: '1890-luku',
    lahde: 'Library of Congress (PD)',
    selite: 'Kiertäviä kauppiaita Kairon kadulla. Vesimyyjä kantoi tavaransa '
      + 'selässään ja huusi kaupan kilpaa muiden kanssa.',
    uusi: {
      tiedosto: 'Cairo-Hilton-Skyline.jpg',
      lahde: 'Bluemask, Commons (CC BY-SA 3.0)',
      selite: 'Nykyinen Kairo nousee Niilin rannalla korkeuksiin — mutta '
        + 'joki virtaa keskellä yhtä tyynenä kuin ennenkin.',
    },
  },
  tripoli: {
    lisat: [
      {
        tiedosto: 'Port de Tripoli, guerre italo-turque, 1911 - btv1b53208054c.jpg',
        vuosi: '1911',
        lahde: 'Agence Rol / Gallica, Commons (PD)',
        selite: 'Tripolin sataman laituri vuonna 1911: veneitä rannassa, '
          + 'tavarakääröjä kasoissa ja väkeä valkoisissa viitoissa. '
          + 'Holvikaarinen varastorivi kaupunginmuurin juurella otti vastaan '
          + 'sen, mikä laivoihin siirtyi.',
      },
    ],
    tiedosto: 'Arabs in Tripoli WDL2444.png',
    vuosi: '1910-luku',
    lahde: 'World Digital Library (PD)',
    selite: 'Väkeä koolla Tripolin muurien kupeessa. Valkoiset viitat '
      + 'suojasivat sekä auringolta että aavikon hiekalta.',
    uusi: {
      tiedosto: 'The Green Square at Tripoli, Libya - panoramio.jpg',
      lahde: 'Cüneyt Türksen, Commons (CC BY 3.0)',
      selite: 'Sama aukio muurien kupeessa nykyään: Marttyyrien aukio on yhä '
      + 'kaupungin sydän, ja vanha linnoitus vartioi sen laitaa.',
    },
  },
  /*
   * Kortissa oli aiemmin tiedosto 'Osmanisches Fort von Mursuk.jpg',
   * joka on toisen maailmansodan jälkeinen postimerkki eikä kuva
   * paikalta. Tilalla on Élisée Reclus'n Afrikka-teoksen kuvalaatta
   * vuodelta 1891 — piirros, mutta aikakauden oma ja sellaiseksi
   * kuvatekstissä sanottu.
   */
  murzuk: {
    lisat: [
      {
        tiedosto: 'Meyers Universum Band 20 32.jpg',
        vuosi: '1859',
        lahde: 'Meyer\'s Universum, Commons (PD)',
        selite: 'Murzukin aukio saksalaisessa kuvateoksessa vuodelta 1859 — '
          + 'savesta muurattuja taloja, pylväskäytäviä, palmuja ja kameleita. '
          + 'Piirros on tehty runsaat kymmenen vuotta ennen päiväkirjan '
          + 'matkaa.',
      },
      {
        tiedosto: 'ISS-64 Sahara Desert, Murzuq District in central Libya.jpg',
        vuosi: '2021',
        lahde: 'NASA, Commons (PD)',
        selite: 'Murzuqin piirikunnan hiekkameri avaruusasemalta valokuvattuna. '
          + 'Vaalea hiekkavirta työntyy kivikkoaavikon halki — tällaisen '
          + 'hiekan laidalle kaupunki on rakennettu.',
      },
    ],
    tiedosto: 'AFR V2 D101 General view of Murzuk.jpg',
    vuosi: '1891',
    lahde: 'Commons (PD)',
    selite: 'Yleisnäkymä Murzukiin maantieteellisessä teoksessa vuodelta '
      + '1891. Savilinnoitus vartioi Saharan karavaanireittiä, ja sen '
      + 'muurien varjossa lepäsivät sekä kamelit että kauppiaat.',
    uusi: {
      tiedosto: 'Murzuq - Festung Qala at Turk über dem Ort.jpg',
      lahde: 'Franzfoto, Commons (CC BY-SA 3.0)',
      selite: 'Sama savilinnoitus kohoaa Murzukin kattojen yllä yhä — '
      + 'karavaanit ovat vaihtuneet autoihin, mutta aavikko alkaa '
      + 'entisestä paikasta.',
    },
  },
  alkufra: {
    lisat: [
      {
        tiedosto: 'AFR V2 D046 The Kufra oasis.jpg',
        vuosi: '1891',
        lahde: 'Élisée Reclus, Commons (PD)',
        selite: 'Kufran keidas Élisée Reclus\'n maantieteellisessä teoksessa '
          + 'vuodelta 1891. Taatelipalmujen varjossa kulkee kapea vesiuoma, '
          + 'jonka äärellä kaksi ihmistä pysähtyy — juuri se näky, joka '
          + 'nousee hiekan keskeltä päivien matkan jälkeen.',
      },
    ],
    tiedosto: 'Kufra (aeroview).jpg',
    vuosi: 'noin 1930',
    lahde: 'Commons (PD)',
    selite: 'Kufran keitaat ilmasta kuvattuna: palmulehtoja ja suolajärviä '
      + 'keskellä hiekkamerta, päivien matkan päässä kaikesta.',
    uusi: {
      tiedosto: 'ISS-50 Al-Jawf Oasis in Eastern Libya.jpg',
      lahde: 'NASA (PD)',
      selite: 'Kufran keitaat nykyään avaruudesta: vihreät kastelupellot '
      + 'piirtyvät täysinä ympyröinä keskelle hiekkamerta.',
    },
  },
  gao: {
    lisat: [
      {
        tiedosto: 'GaoPirogeNiger1990.jpg',
        vuosi: '1990',
        lahde: 'Albert Backer, Commons (CC BY-SA 3.0)',
        selite: 'Pitkiä pirogeja eli ruuhia Nigerin rannassa Gaossa. Joki on '
          + 'kaupungin valtatie: tavara ja väki liikkuvat sitä pitkin '
          + 'keskellä aavikkoa.',
      },
      {
        tiedosto: 'La Dune Rose.jpg',
        vuosi: '2005',
        lahde: 'Jonathon Hicks, Commons (CC BY-SA 3.0)',
        selite: 'Nigerin vastarannalla kohoava La Dune Rose eli Vaaleanpunainen '
          + 'dyyni, kuvattuna Askian haudan päältä. Hiekkaharjanteen ja joen '
          + 'väliin jää kapea vihreä viljelyskaistale.',
      },
    ],
    tiedosto: 'ETH-BIB-Grabmal von Askia, Gao-Tschadseeflug 1930-31-LBS MH02-08-0548.tif',
    vuosi: '1930–31',
    lahde: 'ETH-Bibliothek (PD)',
    selite: 'Askian hauta Gaossa — savesta muurattu pyramidi, jonka piikit '
      + 'ovat rakennustelineiksi jätettyjä puunrunkoja. Songhain '
      + 'suurvallan mahtavin muistomerkki.',
    uusi: {
      tiedosto: 'Tombeau dAskia in Gao by David Sessoms.jpg',
      lahde: 'David Sessoms from Fribourg, Switzerland, Wikimedia Commons (CC BY-SA 2.0)',
      selite: 'Savesta muurattu porrasmainen pyramidihauta, jonka seinistä '
        + 'työntyy ulos puisia tukipuita, ja sen edessä matala savitiiliaita '
        + 'hiekkaisen aukion laidalla.',
    },
  },
  dakar: {
    lisat: [
      {
        tiedosto: '20230821 114047 Pointe des Almadies.jpg',
        vuosi: '2023',
        lahde: 'Tbo47, Commons (CC BY-SA 4.0)',
        selite: 'Almadiesin niemi Dakarissa. Se on Afrikan mantereen läntisin '
          + 'kohta, ja Atlantin aallot lyövät kallioihin aivan kaupungin '
          + 'laidalla.',
      },
      {
        tiedosto: 'Slavery, Gorée - UNESCO - PHOTO0000002239 0001.tiff',
        lahde: 'UNESCO / Dominique Roger, Commons (CC BY-SA 3.0 IGO)',
        selite: 'Katu Goréen saarella: siirtomaa-ajan taloja, puinen parveke ja '
          + 'köynnöksiä seinillä. Kaksi naista kävelee hiekkakadulla. Kuva on '
          + 'Unescon arkistosta.',
      },
      {
        tiedosto: 'Vrata tuge.jpg',
        vuosi: '2026',
        lahde: 'August Dominus, Commons (CC0)',
        selite: 'Goréen orjatalon sisäpiha kaarevine portaineen. Holvikäytävän '
          + 'päässä siintää valo: siellä on ovi, joka aukeaa suoraan merelle '
          + 'ja tunnetaan paluuttomuuden ovena.',
      },
    ],
    tiedosto: 'Dakar mosque circa 1900.jpg',
    vuosi: 'noin 1900',
    lahde: 'E. Fortier (PD)',
    selite: 'Dakarin moskeija minareetteineen nuoren satamakaupungin '
      + 'keskellä. Kuvan otti postikorteistaan tunnettu Edmond Fortier.',
    uusi: {
      tiedosto: 'Gorée 2024 - Vue de Dakar - 17.jpg',
      lahde: 'Fawaz.tairou, Commons (CC BY 4.0)',
      selite: 'Dakar mereltä nähtynä nykyään: nuoresta satamakaupungista on '
      + 'kasvanut miljoonien asukkaiden pääkaupunki, jonka tornit '
      + 'nousevat niemen kärkeen.',
    },
  },
  sierraleone: {
    lisat: [
      {
        tiedosto: 'Sierra-leone198.jpg',
        vuosi: '2009',
        lahde: 'Jared & Melanie Tarbell, Commons (CC BY 2.0)',
        selite: 'Leijonavuoret Freetownin niemellä, rannalta katsottuna. '
          + 'Portugalilaiset purjehtijat nimesivät merestä nousevan vuoriston '
          + 'Sierra Leoneksi eli Leijonavuoriksi.',
      },
      {
        tiedosto: 'SierraLeone068.jpg',
        vuosi: '1935',
        lahde: 'Sjoerd Hofstra / African Studies Centre Leiden, Commons (CC BY-SA 3.0)',
        selite: 'Väkeä ja purjeveneitä Freetownin rannassa vuonna 1935. Ranta on '
          + 'täynnä ihmisiä, ja veneet odottavat vieri vieressä lastia.',
      },
    ],
    tiedosto: 'Cotton Tree Railway Station 3.30 p.m. Bungalow Train, Freetown.jpg',
    vuosi: '1910-luku',
    lahde: 'Lisk-Carew Brothers (PD)',
    selite: 'Iltapäiväjuna lähdössä Freetownin Cotton Tree -asemalta. '
      + 'Kaupungin kuuluisa puuvillapuu kasvaa yhä samalla paikalla.',
    uusi: {
      tiedosto: 'Cotton tree in Freetown, SL - Mapillary (yIBZ74r6IsUFOaWtAPwhWw).jpg',
      lahde: 'danbjoseph @ Mapillary.com, Commons (CC BY-SA 4.0)',
      selite: 'Sama puuvillapuu sata vuotta myöhemmin keskellä '
      + 'liikenneympyrää. Vanhus kaatui lopulta myrskyssä 2023, ja sen '
      + 'taimista kasvatetaan seuraajaa.',
    },
  },
  kappalmas: {
    lisat: [
      {
        tiedosto: 'ASC Leiden - F. van der Kraaij Collection - 15 - 37 - The lighthouse Cape Palmas Light on a peninsula in the Atlantic Ocean - Harper city, Maryland County, Liberia - 1979.tif',
        vuosi: '1979',
        lahde: 'F. van der Kraaij / African Studies Centre Leiden, Commons (CC BY-SA 4.0)',
        selite: 'Kap Palmasin majakka niemen kärjessä Atlantin äärellä, palmu '
          + 'vieressään. Juuri tämän niemen kohdalla Afrikan rannikko kääntyy '
          + 'lännestä itään.',
      },
      {
        tiedosto: 'ASC Leiden - F. van der Kraaij Collection - 15 - 24 - A paved road with a few pedestrians and tall slender palm trees - Harper, Maryland county, Liberia - 1979.tif',
        vuosi: '1979',
        lahde: 'F. van der Kraaij / African Studies Centre Leiden, Commons (CC BY-SA 4.0)',
        selite: 'Korkeita palmuja Harperin talojen yllä Kap Palmasilla. Palmut '
          + 'antoivat niemelle nimensä.',
      },
    ],
    tiedosto: 'HEARD(1898) 50 Church of Harper, Cape Palmas.jpg',
    vuosi: '1898',
    lahde: 'W. H. Heard (PD)',
    selite: 'Harperin kirkko Kap Palmasin niemellä. Sen torni näkyi kauas '
      + 'merelle ja toimi purjehtijoiden maamerkkinä.',
    uusi: {
      tiedosto: 'Harper, Liberia - panoramio (1).jpg',
      lahde: 'blk24ga, Commons (CC BY 3.0)',
      selite: 'Harperin kaupunki Kap Palmasin niemellä nykyään: palmut, '
      + 'peltikatot ja Atlantin ranta samassa kuvassa.',
    },
  },
  kumasi: {
    lisat: [
      {
        tiedosto: 'Street Scene in Kejetia Market - Kumasi - Ghana (4755556785).jpg',
        vuosi: '2010',
        lahde: 'Adam Jones, Commons (CC BY-SA 2.0)',
        selite: 'Katunäkymä Kumasin Kejetian torilta: hedelmäkasoja vadeissa, '
          + 'päivänvarjoja ja tavaraa pään päällä kannettuna. Tori on yhä '
          + 'yksi Länsi-Afrikan suurimmista.',
      },
      {
        tiedosto: 'Ashanti chief, Kumasi, Ghana.jpg',
        vuosi: '2019',
        lahde: 'Paul5263, Commons (CC BY-SA 4.0)',
        selite: 'Ashantien päälliköitä kentekankaissa ja kultakoruissa '
          + 'Akwasidae-juhlassa Kumasissa. Juhla kokoaa päälliköt kuninkaan '
          + 'hoviin yhä nykyäänkin.',
      },
    ],
    tiedosto: 'Kumasi 28-03-1900 sx.jpg',
    vuosi: '1900',
    lahde: 'Commons (PD)',
    // Kuvateksti kertoi aiemmin kaupungin katoista. Kuvassa on
    // kokous, ja se on kuvan koko sisältö — teksti korjattiin sen
    // mukaiseksi.
    selite: 'Ashantien päälliköt kokoontuivat brittikuvernöörin eteen '
      + 'Kumasissa 28. maaliskuuta 1900. Kuvernööri luki listan siitä, '
      + 'paljonko kunkin alueen tuli maksaa vuosittain — muutamaa '
      + 'kuukautta myöhemmin syttyi sota.',
    uusi: {
      tiedosto: 'Modern market hall of Kejetia market.jpg',
      lahde: 'Commons (CC0)',
      selite: 'Kumasin Kejetia-tori sai 2010-luvulla katon: uusi halli on '
      + 'Länsi-Afrikan suurimpia kauppapaikkoja, ja tungos on sama kuin '
      + 'ennenkin.',
    },
  },
  orjarannikko: {
    lisat: [
      {
        tiedosto: 'Sculpture of Amazon Female Warrior - Slave Route - Ouidah - Benin.jpg',
        vuosi: '2010',
        lahde: 'Adam Jones, Commons (CC BY-SA 3.0)',
        selite: 'Dahomeyn naissoturin patsas Ouidahin orjatien varrella. '
          + 'Kaupungilta rannalle vievän hiekkatien varteen on pystytetty '
          + 'muistomerkkejä.',
      },
      {
        tiedosto: 'Beach of Ouidah Benin 2.jpg',
        vuosi: '2013',
        lahde: 'jbdodane, Commons (CC BY 2.0)',
        selite: 'Ouidahin rantaa: pelkkää hiekkaa, taivasta ja Atlanttia. Tänne '
          + 'kaupungilta lähtevä tie päättyy.',
      },
    ],
    tiedosto: 'São João Baptista de Ajudá 1920s.jpg',
    vuosi: '1920-luku',
    lahde: 'Commons (PD)',
    selite: 'Ouidahin vanha portugalilaislinnake, Orjarannikon synkän '
      + 'historian vartiopaikka. Isoisän aikaan sen muurit olivat jo '
      + 'rapistumassa.',
    uusi: {
      tiedosto: 'Benin UNESCO à la Porte du non-retour à Ouidah.jpg',
      lahde: 'Rachad Sanoussi, Commons (CC BY-SA 4.0)',
      selite: 'Muistomerkin kivilaatta Ouidahin rannalla. Siihen on kaiverrettu '
        + 'portin nimi ranskaksi sekä Beninin ja Unescon tunnukset; portti '
        + 'pystytettiin 1995.',
    },
  },
  kano: {
    lisat: [
      {
        tiedosto: 'Textile dye pits in Kano.png',
        vuosi: '1961',
        lahde: 'Harrison Forman / AGS Library, UW–Milwaukee (PD)',
        selite: 'Kanon värjäämökuopat vuonna 1961: pyöreitä kuoppia maassa ja '
          + 'niiden päällä punotut suojukset. Taustalla näkyy savitaloja ja '
          + 'kaupungin katu.',
      },
      {
        tiedosto: 'Kofar mata dye pit 1.jpg',
        vuosi: '2024',
        lahde: 'Shots by Abdul, Commons (CC BY-SA 4.0)',
        selite: 'Indigolla värjättyä kangasta nostetaan Kofar Matan '
          + 'värjäämökuopasta Kanossa. Väri valuu takaisin kuoppaan ja '
          + 'tarttuu kaikkeen, mihin koskee.',
      },
    ],
    tiedosto: 'View-Kano city-1911.jpg',
    vuosi: '1911',
    lahde: 'E. D. Morel (PD)',
    selite: 'Kanon savitaloja ja muureja vuonna 1911. Koko vanha kaupunki '
      + 'on rakennettu auringossa kuivatusta savesta.',
    uusi: {
      tiedosto: 'Ganuwa or Badala - Kano City Wall - Outside Sabuwar Kofa.jpg',
      lahde: 'Suleiman Umar ym., Commons (CC BY-SA 4.0)',
      selite: 'Kanon vanhoja savimuureja on jäljellä yhä, ja portit kantavat '
      + 'vanhoja nimiään. Muurien sisällä värjätään kangasta samoissa '
      + 'kuopissa kuin 500 vuotta sitten.',
    },
  },
  kongo: {
    lisat: [
      {
        tiedosto: 'Aerial view of the Congo River near Kisangani.jpg',
        vuosi: '2010',
        lahde: 'MONUSCO / Myriam Asmani, Commons (CC BY-SA 2.0)',
        selite: 'Kongojoki ilmasta Kisanganin lähellä. Joki haarautuu vehreiden '
          + 'saarten väliin niin laajaksi, että sitä on helppo luulla '
          + 'mereksi.',
      },
      {
        tiedosto: 'Fishermen of the Congo Basin 4.jpg',
        vuosi: '2023',
        lahde: 'Cethuyghe, Commons (CC BY-SA 4.0)',
        selite: 'Kalastajia ruuhessa keskellä Kongojoen koskia Kinshasan ja '
          + 'Brazzavillen kohdalla. Näiden koskien takia laivat eivät pääse '
          + 'joelta merelle asti.',
      },
      {
        tiedosto: 'Fleuve Congo Kinshasa 4.JPG',
        vuosi: '2013',
        lahde: 'Serein, Commons (CC BY-SA 3.0)',
        selite: 'Kongojoen rantaa Livingstonen koskien yläpäässä Kinshasassa. '
          + 'Vesi kiihtyy tässä vauhtiin, joka kuuluu kauas rannalle.',
      },
    ],
    tiedosto: 'Livingstone steamer, Congo, ca. 1902-1915 (IMP-CSCNWW33-OS10-73).jpg',
    vuosi: '1902–1915',
    lahde: 'Commons (PD)',
    selite: 'Höyrylaiva Livingstone Kongojoella. Joki oli sisämaan valtatie: '
      + 'laivat kuljettivat kaiken kylistä kaupunkeihin ja takaisin.',
    uusi: {
      tiedosto: 'Congo River from Kinshasa in Democratic Republic of the Congo (DRC).jpg',
      lahde: 'EdwinAlden.1995, Commons (CC BY-SA 4.0)',
      selite: 'Kongojoki Kinshasan rannasta nykyään. Höyrylaivojen tilalla '
      + 'puksuttavat proomut, mutta joki on yhä sisämaan valtatie.',
    },
  },
  angola: {
    lisat: [
      {
        tiedosto: 'Panoramic view of Luanda, 1884.jpg',
        vuosi: '1884',
        lahde: 'Henrique Augusto Dias de Carvalho, Commons (PD)',
        selite: 'Panoraamakuva Luandasta vuodelta 1884, koottu useasta '
          + 'valokuvalevystä. Kaupunki kaartuu lahden ympäri, ja aluksia on '
          + 'ankkurissa satamassa.',
      },
      {
        tiedosto: 'AspectoAereodaFortalezadeSMiguel.JPG',
        lahde: 'Xavier Lopes, Commons (PD)',
        selite: 'São Miguelin linnoitus Luandan lahden yllä. Portugalilaiset '
          + 'rakensivat sen 1500-luvulla, ja se vartioi satamaa koko '
          + 'purjelaivakauden ajan.',
      },
    ],
    tiedosto: "Saint-Paul de Luanda, port de (l')Angola dans le Portugal africain (vue générale) - btv1b6932475d.jpg",
    vuosi: '1914',
    lahde: 'Agence Rol / BnF (PD)',
    selite: 'Luandan satama ja rantakatu vuonna 1914. Lahden suojissa '
      + 'lepäsi purjelaivoja ja höyryaluksia rinnakkain.',
    uusi: {
      tiedosto: 'Marginal de Luanda HD Dji Mavic 3 Classic - By Délcio Geovany Borges.jpg',
      lahde: 'Iamdelcioborges, Commons (CC BY 4.0)',
      selite: 'Luandan lahti nykyään: purjelaivojen rantakadusta on kasvanut '
      + 'tornien reunustama rantabulevardi, Marginal.',
    },
  },
  kapkaupunki: {
    lisat: [
      {
        tiedosto: 'Twee gezichten op boten in de haven van Kaapstad Cape Town - the docks (titel op object), RP-F-2001-7-425-2.jpg',
        vuosi: 'noin 1870',
        lahde: 'Rijksmuseum (CC0)',
        selite: 'Kaksi valokuvaa Kapkaupungin satamasta noin vuodelta 1870. '
          + 'Mastot tiheänä metsänä ja vuori taustalla — juuri tällaiseen '
          + 'satamaan isoisä täydensi vesitynnyrit.',
      },
      {
        tiedosto: 'Table Mountain and Table Cloth (4610405798).jpg',
        vuosi: '2007',
        lahde: 'Jorge Láscar, Commons (CC BY 2.0)',
        selite: 'Pilvi valuu Pöytävuoren reunan yli kaupungin puolelle. '
          + 'Kapkaupunkilaiset kutsuvat tätä pilveä pöytäliinaksi.',
      },
      {
        tiedosto: 'Cape Town (ZA), Cape Peninsula National Park, Cape of Good Hope -- 2024 -- 3305.jpg',
        vuosi: '2024',
        lahde: 'Dietmar Rabich, Commons (CC BY-SA 4.0)',
        selite: 'Hyväntoivonniemen kallioista rantaa Kapin niemimaan kärjessä. '
          + 'Tämän niemen ohi purjehtivat kaikki Intiaan matkaavat laivat '
          + 'ennen Suezin kanavaa.',
      },
    ],
    tiedosto: 'Cape Town tram, Adderley Street - ca. 1900.jpg',
    vuosi: 'noin 1900',
    lahde: 'Commons (PD)',
    selite: 'Raitiovaunu Kapkaupungin Adderley Streetillä. Kadun päästä '
      + 'alkoi satama, toisesta päästä kohosi Pöytävuori.',
    uusi: {
      tiedosto: 'Adderley Street.jpg',
      lahde: 'HelenOnline, Commons (CC BY-SA 4.0)',
      selite: 'Sama Adderley Street nykyään: raitiovaunut ovat poissa, mutta '
      + 'katu johtaa yhä satamasta kohti Pöytävuorta.',
    },
  },
  kimberley: {
    lisat: [
      {
        tiedosto: 'DF1873 Colesberg Kopje.jpg',
        vuosi: '1873',
        lahde: 'The Diamond-field Keepsake 1873 / British Library, Commons (PD)',
        selite: 'Colesberg Kopjen timanttikaivanto Kimberleyssä vuonna 1873. '
          + 'Jokainen kaivaja louhi omaa pientä palstaansa, ja maa nostettiin '
          + 'ylös köysillä, jotka risteävät kuvassa kuin hämähäkinverkko.',
      },
      {
        tiedosto: 'Groot Gat Kimberly Big Hole.jpg',
        vuosi: '2011',
        lahde: 'Maatjie E, Commons (CC BY-SA 3.0)',
        selite: 'Kimberleyn Iso reikä nykyään. Kuopan yläosa kaivettiin '
          + 'käsityönä, ja sen pohjalle on sittemmin noussut vettä.',
      },
    ],
    tiedosto: 'Twee gezichten op de mijn Die Groot Gat te Kimberley Diamond fields-Kimberley mine (titel op object) Diamond fields-Tramway, Kimberley mine (titel op object), RP-F-2001-7-425-25.jpg',
    vuosi: 'noin 1870',
    lahde: 'Rijksmuseum (CC0)',
    selite: 'Kimberleyn timanttikaivos alkuaikoinaan: tuhannet kaivajat '
      + 'louhivat kuoppaa käsin, köysiradat kuljettivat maata ylös. '
      + 'Kuopasta kasvoi lopulta Iso Reikä.',
    uusi: {
      tiedosto: 'Big Hole, Kimberley, Northern Cape, South Africa (20512571296).jpg',
      lahde: 'South African Tourism, Commons (CC BY 2.0)',
      selite: 'Kimberleyn Iso kuoppa kaupungin laidalla. Kaivos on kaivettu '
        + 'käsin, ja pohjalla on nyt tummansininen järvi; reunalla näkyy '
        + 'nykyinen kaupunki.',
    },
  },
  madagaskar: {
    lisat: [
      {
        tiedosto: 'Ville de Betafo avec les rizières en terrasses dans la ville - F. Brieuc M. - btv1b10111080w.jpg',
        lahde: 'F. Brieuc M. / Bibliothèque nationale de France (PD)',
        selite: 'Betafon kaupunki ja sen riisiterassit Madagaskarin ylängöllä '
          + 'vanhassa lasilevyvalokuvassa. Terassit kiertävät rinteen '
          + 'kaarina, ja kirkon torni näkyy kukkulan laella.',
      },
      {
        tiedosto: 'Highlands, Madagascar (22741639463).jpg',
        vuosi: '2015',
        lahde: 'Rod Waddington, Commons (CC BY-SA 2.0)',
        selite: 'Madagaskarin ylängön punertavia kukkuloita ja kyliä. Maan väri '
          + 'tulee raudasta, ja se antaa saarelle lempinimen punainen saari.',
      },
      {
        tiedosto: 'Brown Lemur (in Explore) - Flickr - Rod Waddington.jpg',
        vuosi: '2015',
        lahde: 'Rod Waddington, Commons (CC BY-SA 2.0)',
        selite: 'Ruskea maki katsoo kameraan Madagaskarilla. Makeja ei elä '
          + 'luonnonvaraisena missään muualla maailmassa — juuri niitä silmiä '
          + 'nuori herra metsässä tapasi.',
      },
    ],
    tiedosto: "Tananarive-Temple d'Andohalo.jpg",
    vuosi: 'noin 1900',
    lahde: 'Commons (PD)',
    selite: 'Antananarivon kukkulakaupunkia Madagaskarilla. Talot '
      + 'kipuavat rinnettä kohti Andohalon aukiota ja sen kirkkoa.',
    uusi: {
      tiedosto: "Analakely vu d'en haut, Madagascar.jpg",
      lahde: 'Cactus0625, Commons (CC BY-SA 4.0)',
      selite: 'Antananarivon keskusta nykyään ylhäältä: Analakelyn '
      + 'torikatokset ja pastellitalot täyttävät laakson, ja kukkulat '
      + 'reunustavat kaupunkia kuten ennenkin.',
    },
  },
  sansibar: {
    lisat: [
      {
        tiedosto: 'Drying cloves at Zanzibar LCCN2001705556.jpg',
        vuosi: '1890–1923',
        lahde: 'Frank and Frances Carpenter Collection, Library of Congress (PD)',
        selite: 'Neilikkasato kuivumassa matoilla Sansibarissa. Mauste oli saaren '
          + 'tärkein vientitavara, ja kuivatuskentät levisivät talojen '
          + 'ympärille niin pitkälle kuin maata riitti.',
      },
      {
        tiedosto: 'Carved wooden door — in Stone Town, Zanzibar City.jpg',
        vuosi: '2008',
        lahde: 'Nannarella, Commons (PD)',
        selite: 'Veistetty ovi Sansibarin Kivikaupungissa. Ovet ovat kaupungin '
          + 'tunnusmerkki, ja niiden kuvioista tunnistaa sekä omanilaisia '
          + 'että intialaisia esikuvia — ei eurooppalaisia.',
      },
      {
        tiedosto: 'The narrow alley in the stone city of Zanzibar.jpg',
        vuosi: '2015',
        lahde: 'Chen Hualin, Commons (CC BY-SA 4.0)',
        selite: 'Kapea kuja Sansibarin Kivikaupungissa. Talot kohoavat molemmin '
          + 'puolin niin lähellä toisiaan, että taivasta näkyy vain kaistale '
          + '— parvekkeet ja kaaret työntyvät kadun ylle.',
      },
    ],
    tiedosto: 'Panorama van de haven van Zanzibar Panorama of Zanzibar (titel op object) Zanzibar (titel op object), RP-F-F00999-DD.jpg',
    vuosi: 'noin 1900',
    lahde: 'Rijksmuseum (CC0)',
    selite: 'Sansibarin satama purjealuksineen. Mausteiden tuoksu kantoi '
      + 'kuulemma merelle asti, ennen kuin kaupunki edes näkyi.',
    uusi: {
      tiedosto: 'Harbour at the picturesque Stone Town.jpg',
      lahde: 'Dr. Ondřej Havelka, Commons (CC BY 4.0)',
      selite: 'Sansibarin satama nykyään: dhow-purjeet ovat harvinaistuneet, '
      + 'mutta Kivikaupungin rantaviiva on tunnistettavasti sama.',
    },
  },
  kilimandzaro: {
    lisat: [
      {
        tiedosto: 'Kilimanjaro002.jpg',
        vuosi: '2008',
        lahde: 'Nannarella, Commons (PD)',
        selite: 'Kilimandžaro lentokoneesta nähtynä. Vuori kohoaa yksin tasangon '
          + 'yllä, ja laella näkyy vaalea lumilaikku — rinteet valuvat joka '
          + 'suuntaan pilvien lomassa.',
      },
      {
        tiedosto: 'Glaciers on Kilimanjaro (17053051592).jpg',
        vuosi: '2009',
        lahde: 'Christoph Strässler, Commons (CC BY-SA 2.0)',
        selite: 'Jäätikön reuna Kilimandžaron huippukraatterissa. Jää pysyy lähes '
          + 'päiväntasaajalla, koska vuori kohoaa lähes kuuteen kilometriin — '
          + 'sitä isoisän kirjeen lukijat eivät uskoneet.',
      },
    ],
    tiedosto: 'Bundesarchiv Bild 105-DOA0437, Deutsch-Ostafrika, Kilimandscharo, Gummiplantage.jpg',
    vuosi: '1906–1918',
    lahde: 'Walther Dobbertin, Bundesarchiv (CC BY-SA 3.0 de)',
    selite: 'Viljelmiä Kilimandžaron juurella. Lumihuippu häämöttää pilvien '
      + 'takana — keskellä Afrikkaa, lähes päiväntasaajalla.',
    uusi: {
      tiedosto: 'The view of mountain Kilimanjaro from Moshi town in Tanzania.jpg',
      lahde: 'Prosper Phissoo, Commons (CC BY-SA 4.0)',
      selite: 'Kilimandžaro Moshin kaupungin yltä nykyään. Lumihuippu on '
      + 'kutistunut isoisän ajoista, mutta kohoaa yhä yksin savannin '
      + 'yllä.',
    },
  },
  tanganjika: {
    lisat: [
      {
        tiedosto: 'Lake Tanganyika at Gombe Stream National Park.jpg',
        vuosi: '2011',
        lahde: 'fabulousfabs, Commons (CC BY 2.0)',
        selite: 'Tanganjikajärven rantaa Gombe Streamin kansallispuistossa '
          + 'Tansaniassa. Metsäinen rinne tulee alas aivan vesirajaan, ja '
          + 'järvi jatkuu horisonttiin.',
      },
      {
        tiedosto: 'Clear lake Kagongo Ward.jpg',
        vuosi: '2021',
        lahde: 'Halidtz, Commons (CC BY-SA 4.0)',
        selite: 'Tanganjikajärven vettä Kigoman lähellä. Pohjan kivet erottuvat '
          + 'pinnan läpi kuin lasin alta — juuri niin kirkasta kuin isoisän '
          + 'kirjassa luvataan.',
      },
    ],
    tiedosto: 'Memorial tablet marking the spot where Livingstone and Stanley met at Ujiji in 1871 ATLIB 305982.png',
    vuosi: '1903',
    lahde: 'A. P. Godber (PD)',
    selite: 'Muistolaatta Ujijissa Tanganjikajärven rannalla — paikassa, '
      + 'jossa Stanley löysi kadonneen Livingstonen vuonna 1871 ja '
      + 'tervehti: "Tohtori Livingstone, otaksun?"',
    uusi: {
      tiedosto: 'Lake Tanganyika ,Kigoma port.jpg',
      lahde: 'Erasmus Kamugisha, Commons (CC BY-SA 4.0)',
      selite: 'Kigoman satama Tanganjikajärvellä nykyään — Ujijin naapurissa, '
      + 'jossa Stanley ja Livingstone kohtasivat. Järvellä liikennöi '
      + 'yhä yli satavuotias höyrylaiva Liemba.',
    },
  },
  addisabeba: {
    lisat: [
      {
        tiedosto: 'Ethiopia IMG 5685 Addis Abeba, women carrying firewood. (39809834812).jpg',
        vuosi: '2017',
        lahde: 'Ninara, Commons (CC BY 2.0)',
        selite: 'Eukalyptusmetsää Entoton rinteellä Addis Abeban yläpuolella. '
          + 'Metsä on yhä kaupungin tärkeä polttopuun lähde: naiset kantavat '
          + 'risukimppua alas mäkeä.',
      },
      {
        tiedosto: 'Coffee ceremony of Ethiopia and Eritrea 3.jpg',
        vuosi: '2022',
        lahde: 'ProtoplasmaKid, Commons (CC BY-SA 4.0)',
        selite: 'Kahviseremonia Addis Abebassa: raakoja papuja paahdetaan '
          + 'pannulla, vieressä savuaa suitsuke hiilillä. Pavut paahdetaan ja '
          + 'jauhetaan vieraiden nähden ennen keittämistä.',
      },
    ],
    tiedosto: 'British delegation Addis Abeba.jpg',
    vuosi: '1930',
    lahde: 'Commons (PD)',
    selite: 'Juhlakulkue Addis Abebassa keisari Haile Selassien '
      + 'kruunajaisvuonna 1930. Koko maailma lähetti edustajansa '
      + 'vuoristopääkaupunkiin.',
    uusi: {
      tiedosto: 'AddisView.jpg',
      lahde: 'DaneyWiki, Commons (CC BY-SA 4.0)',
      selite: 'Addis Abeba nykyään: kruunajaiskulkueiden kaupunki on Afrikan '
      + 'diplomatian pääkaupunki, jonka ylle nousee tornitalo toisensa '
      + 'perään.',
    },
  },
  rashafun: {
    lisat: [
      {
        tiedosto: 'The ruins of the ancient city of Opone at Hafun, Northeastern Somalia.png',
        vuosi: '1976',
        lahde: 'Neville Chittick, British Institute in Eastern Africa, Commons (CC BY 4.0)',
        selite: 'Kaivauksissa esiin tulleita kivijalkoja Hafunin niemellä. '
          + 'Paikkaa on pidetty antiikin merenkulkuoppaissa mainittuna Oponen '
          + 'kauppasatamana — täältä on todella löytynyt kauppiaiden jättämää '
          + 'tavaraa.',
      },
    ],
    tiedosto: 'Garesadihafun.jpg',
    vuosi: '1900-luvun alku',
    lahde: 'Commons (PD)',
    selite: 'Vanha garesa-linnoitus Hafunin niemellä, Afrikan itäisimmässä '
      + 'kärjessä. Monsuunituulet toivat tänne purjehtijoita jo tuhat '
      + 'vuotta sitten.',
    uusi: {
      tiedosto: 'Hafun from space.jpg',
      lahde: 'NASA (PD)',
      selite: 'Hafunin niemi avaruudesta: Afrikan itäisin kärki työntyy '
      + 'Intian valtamereen kapean hiekkakannaksen päässä.',
    },
  },

  // --- Täydennys (omistajan pyyntö: loput vanhat kuvat). Saharan
  // 1907-kortti hylättiin, koska se on siirtomaanäyttelyssä esitellyn
  // ihmisen kuva. Viimeiset viisi paikkaa saivat kuvansa v.105:ssä:
  // aikakauden valokuvan puuttuessa käytetään vanhinta vapaata kuvaa
  // (Ahaggar 1991) tai aikakauden piirrosta/karttaa (Mosambik 1655,
  // Bahr el Ghazal 1903) — selite kertoo asian rehellisesti.
  karthago: {
    lisat: [
      {
        tiedosto: 'PortsPuniquesSalamboTunis.jpg',
        vuosi: '2010',
        lahde: 'Citizen59, Commons (CC BY 3.0)',
        selite: 'Karthagon puunilaiset satama-altaat ilmasta nähtynä. Pyöreä '
          + 'sotasatama saarineen ja sen edessä oleva kauppasatama erottuvat '
          + 'yhä maastossa, vaikka ympärille on kasvanut asuinaluetta.',
      },
    ],
    tiedosto: 'Tunisie, Carthage, cathédrale et séminaire de St Louis - btv1b53114044m.jpg',
    vuosi: '1912',
    lahde: 'Agence Rol / BnF Gallica (PD)',
    selite: 'Karthagon Byrsan kukkula isoisän aikaan: raunioiden keskelle '
      + 'oli noussut katedraali, ja kaivaukset olivat vasta alussa.',
    uusi: {
      tiedosto: '01996 01434 Ruins of Antonine Baths at Carthage.jpg',
      lahde: 'Silar, Commons (CC BY-SA 4.0)',
      selite: 'Karthagon kaivaukset valmistuivat kertomaan tarinansa: '
      + 'Antoninuksen termien rauniot ovat nykyään maailmanperintökohde '
      + 'meren äärellä.',
    },
  },
  marrakech: {
    lisat: [
      {
        tiedosto: 'Jemaa el-Fnaa Marrakech at sunset.jpg',
        vuosi: '2024',
        lahde: 'Herokk, Commons (CC BY-SA 4.0)',
        selite: 'Jemaa el-Fnaan aukio täyttyy väestä auringonlaskun aikaan. Kojut '
          + 'nousevat torille iltapäivällä ja katoavat aamuun mennessä.',
      },
      {
        tiedosto: 'Storytellers in Jemaa el-Fnaa (Marrakech, Morocco) (15722800436).jpg',
        vuosi: '2007',
        lahde: 'Carlos ZGZ, Commons (CC0)',
        selite: 'Väki on kerääntynyt tiiviiseen renkaaseen esiintyjien ympärille '
          + 'Jemaa el-Fnaalla. Juuri tällaiseen piiriin päiväkirjan '
          + 'kirjoittaja istuutui ymmärtämättä sanaakaan.',
      },
      {
        tiedosto: 'Sunset in the Massif.jpg',
        vuosi: '2017',
        lahde: 'Anass Errihani, Commons (CC BY-SA 4.0)',
        selite: 'Toubkalin massiivin lumiset huiput kohoavat pilvimeren yllä '
          + 'Korkeassa Atlaksessa. Nämä ovat ne vuoret, jotka näkyvät '
          + 'Marrakechista etelään.',
      },
    ],
    tiedosto: 'Marrakech Minaret depuis la rue animée - sap04 10l01821 p.jpg',
    vuosi: 'noin 1924',
    lahde: 'Lucien Roy, Ministère de la Culture (CC BY-SA 4.0)',
    selite: 'Vilkas katu Marrakechissa ja taustalla Koutoubian minareetti — '
      + 'sama torni, jonka mukaan kaupungissa suunnistetaan yhä.',
    uusi: {
      tiedosto: 'Kutubiyya Mosque, Marrakesh, Morocco, 20250124 1834 7027.jpg',
      lahde: 'Jakub Hałun, Commons (CC BY 4.0)',
      selite: 'Sama Koutoubian minareetti nykyään. Sen yli ei saa '
      + 'Marrakechissa yhä rakentaa, joten torni hallitsee kaupunkia '
      + 'kuten 800 vuotta sitten.',
    },
  },
  timbuktu: {
    lisat: [
      {
        tiedosto: 'Timbuktu-139071.jpg',
        vuosi: '2015',
        lahde: 'UNESCO Bureau of Mali, Commons (CC BY-SA 3.0 IGO)',
        selite: 'Käsikirjoitusten säilytys- ja konservointihuone Timbuktun Ahmed '
          + 'Baba -instituutissa. Vanhat niteet makaavat laatikoissa hyllyjen '
          + 'välissä, yksi kerrallaan puhdistettavina.',
      },
      {
        tiedosto: 'Timbuktu-139085.jpg',
        vuosi: '2013',
        lahde: 'UNESCO Bureau of Mali, Commons (CC BY-SA 3.0 IGO)',
        selite: 'Pino vanhoja käsikirjoituksia Timbuktun Ahmed Baba -keskuksessa. '
          + 'Kaupungin kokoelmissa on käsin kirjoitettuja tekstejä muun '
          + 'muassa tähtitieteestä, matematiikasta ja laista.',
      },
    ],
    tiedosto: 'Timbuktu, 1906.png',
    vuosi: '1906',
    lahde: 'Commons (PD)',
    selite: 'Timbuktun savutaloja ja hiekkakatuja vuonna 1906. Kaupunki oli '
      + 'juuri se salaperäinen aavikon satama, josta Euroopassa tarinoitiin.',
    uusi: {
      tiedosto: 'Sankore Mosque in Timbuktu.jpg',
      lahde: 'upyernoz, Commons (CC BY 2.0)',
      selite: 'Sankoren moskeija nykyään — savesta muurattu yliopisto, jossa '
      + 'opiskeltiin jo 1400-luvulla. Seinät rapataan talkoilla '
      + 'uudelleen joka vuosi.',
    },
  },
  lagos: {
    lisat: [
      {
        tiedosto: 'Carter Bridge.jpg',
        vuosi: '2016',
        lahde: 'OPNPhotography, Commons (CC BY-SA 4.0)',
        selite: 'Carterin silta Lagosin laguunin yli. Silta yhdistää Lagosin '
          + 'saaren mantereeseen, ja taustalla nousee saaren keskusta.',
      },
      {
        tiedosto: 'IThe biggest market in West Africa, dumota Market, Lagos.jpg',
        vuosi: '2021',
        lahde: 'Sir Demo, Commons (CC BY-SA 4.0)',
        selite: 'Idumotan tori Lagosin saarella: keltaisia pikkubusseja, '
          + 'päivänvarjoja ja niin paljon väkeä, ettei katua näy. Tori on '
          + 'kaupungin vanhimpia kauppapaikkoja.',
      },
      {
        tiedosto: 'Makoko 1.jpg',
        vuosi: '2022',
        lahde: 'Ayorinde Ogundele, Commons (CC BY-SA 4.0)',
        selite: 'Kanootteja Lagosin laguunilla Makokon vesikylässä. Paalujen '
          + 'varaan rakennetussa kaupunginosassa liikutaan veneellä eikä '
          + 'katua pitkin.',
      },
    ],
    tiedosto: 'Lagos, 1929.jpg',
    vuosi: '1929',
    lahde: 'The National Archives UK (OGL)',
    selite: 'Lagosin satamakatua vuonna 1929: kauppahuoneita ja laitureita '
      + 'laguunin rannalla — kaupunki oli jo silloin Länsi-Afrikan '
      + 'vilkkaimpia.',
    uusi: {
      tiedosto: 'Lagos Island City Scape.jpg',
      lahde: 'Jamie Tubers, Commons (CC BY-SA 4.0)',
      selite: 'Lagosin saari nykyään: laguunikaupungista on kasvanut Afrikan '
      + 'suurimpia metropoleja, jonka tornit nousevat samalta rannalta '
      + 'kuin kauppahuoneet ennen.',
    },
  },
  tshadjarvi: {
    lisat: [
      {
        tiedosto: 'Reed boats at Lake Chad.jpg',
        vuosi: '2022',
        lahde: 'Steve Bittinger, Commons (CC BY 2.0)',
        selite: 'Kaisloista sidottu vene Tšad-järven rannalla. Veneet tehdään '
          + 'järven omista kaisloista, ja niillä liikutaan matalassa vedessä.',
      },
    ],
    tiedosto: 'ETH-BIB-Ufer des Tschadsee-Tschadseeflug 1930-31-LBS MH02-08-0976.tif',
    vuosi: '1930–31',
    lahde: 'ETH-Bibliothek, Mittelholzer (PD)',
    selite: 'Tšad-järven rantaa ilmasta Walter Mittelholzerin kuuluisalla '
      + 'Afrikan-lennolla — juuri sellaiselta matkalta, joista isoisäkin '
      + 'luki lehdistä.',
    uusi: {
      tiedosto: 'Lake chad shore (detilt).jpg',
      lahde: 'Coolthoom1 Detilt: Hike395, Commons (CC BY-SA 4.0)',
      selite: 'Tšad-järven avointa vettä ja vastarantaa: matalaa vettä, ruoho- ja '
        + 'kaislakasvustoa sekä tiheä puurivi rannalla. Järvi on hyvin '
        + 'matala, ja sen rantaviiva on paksun kasvillisuuden peittämä.',
    },
  },
  kamerun: {
    lisat: [
      {
        tiedosto: 'Le Mont Cameroun depuis Limbé.JPG',
        vuosi: '2007',
        lahde: 'PRA, Commons (CC BY-SA 3.0)',
        selite: 'Kamerunvuori Limben rannalta katsottuna. Huippu on pilvessä niin '
          + 'kuin useimpina päivinä: vuori kohoaa merenrannasta noin neljän '
          + 'kilometrin korkeuteen.',
      },
      {
        tiedosto: 'Tropical rain forest Mount Cameroon.jpg',
        vuosi: '2018',
        lahde: 'Atabong Armstrong, Commons (CC BY-SA 4.0)',
        selite: 'Sademetsää Kamerunvuoren rinteellä kansallispuiston alueella. '
          + 'Rungot ovat sammalen peitossa ja saniaiset kasvavat puiden '
          + 'mittaisiksi — vuoren merenpuoleiset rinteet kuuluvat maailman '
          + 'sateisimpiin seutuihin.',
      },
      {
        tiedosto: 'Seme beach limbe Cameroon.jpg',
        vuosi: '2021',
        lahde: 'Blaizo 237, Commons (CC BY-SA 4.0)',
        selite: 'Seme Beachin rantaa Limbessä Kamerunvuoren juurella. Hiekka on '
          + 'tummaa, koska se on syntynyt tulivuoren laavasta.',
      },
    ],
    tiedosto: 'People gathered before a church, Cameroon, ca.1910-1920 (IMP-YDS-RG101-012-0000-0036).jpg',
    vuosi: '1910-luku',
    lahde: 'Yale Divinity School (PD)',
    selite: 'Väkeä koolla kirkon edustalla Kamerunissa 1910-luvulla — '
      + 'vuoren juurella kohtasivat tuolloin monet maailmat.',
    uusi: {
      tiedosto: 'Mount Cameroon view from Buea (Soppo).jpg',
      lahde: 'Yona Tientcheu, Commons (CC BY-SA 4.0)',
      selite: 'Kamerunvuori Buean kaupungin yltä nykyään. Tulivuori on yhä '
      + 'toiminnassa — viimeksi se purkautui vuonna 2000.',
    },
  },
  namib: {
    lisat: [
      {
        tiedosto: 'Sossusvlei Dune Namib Desert Namibia Luca Galuzzi 2004.JPG',
        vuosi: '2004',
        lahde: 'Luca Galuzzi, Commons (CC BY-SA 2.5)',
        selite: 'Dyynin harja Sossusvleissä. Valo jakaa rinteen kahtia: toinen '
          + 'puoli hehkuu oranssina, toinen jää varjoon, ja harjalla kulkee '
          + 'pieni ihmisjono.',
      },
      {
        tiedosto: 'Men walking on top of a sand dune in Sossusvlei during a wind storm.jpg',
        vuosi: '2017',
        lahde: 'Julia Grahl, Commons (CC BY-SA 4.0)',
        selite: 'Kulkija dyynin harjalla Sossusvleissä hiekkamyrskyn aikaan. '
          + 'Harjan takana kaikki katoaa pölyyn, ja jokainen askel jää '
          + 'hiekkaan hetkeksi.',
      },
      {
        tiedosto: 'Shipwreck in Skeleton Coast (16683455783).jpg',
        vuosi: '2014',
        lahde: 'Domenico Convertini, Commons (CC BY-SA 2.0)',
        selite: 'Laivanhylky murtuvassa aallokossa Namibian Luurankorannikolla. '
          + 'Rannalla makaa yhä useita aluksia, jotka jäivät matalikkoon '
          + 'eivätkä päässeet takaisin merelle.',
      },
    ],
    tiedosto: 'Lüderitzbucht, Deutsch-Südwestafrika. The newly finished pier with an Illing locomotive, February 1908, photograph by de Meillon.jpg',
    vuosi: '1908',
    lahde: 'Commons (PD)',
    selite: 'Lüderitzin uusi laituri Namibin rannikolla 1908: veturi ja '
      + 'nostokurjet keskellä maailman vanhinta aavikkoa.',
    uusi: {
      tiedosto: 'Lüderitz.jpg',
      lahde: 'SkyPixels, Commons (CC BY-SA 4.0)',
      selite: 'Lüderitz nykyään: saksalaisajan jugendtalot seisovat '
      + 'värikkäinä aavikon ja Atlantin välissä, ja laituri on edelleen '
      + 'paikallaan.',
    },
  },
  sthelena: {
    lisat: [
      {
        tiedosto: 'Jamestown from the water.jpg',
        vuosi: '2020',
        lahde: 'Kevstan, Commons (CC BY-SA 4.0)',
        selite: 'Jamestown mereltä nähtynä. Kaupunki mahtuu kapeaan laaksoon '
          + 'jyrkkien kallioseinien väliin, ja saarelle noustaan yhä '
          + 'rantamuurin kohdalta.',
      },
      {
        tiedosto: 'Longwood House 1 (40348609044).jpg',
        vuosi: '2018',
        lahde: 'Luke McKernan, Commons (CC BY-SA 2.0)',
        selite: 'Longwood House St. Helenan ylängöllä. Tässä matalassa talossa '
          + 'Napoleon vietti viimeiset vuotensa, ja edessä liehuu yhä Ranskan '
          + 'lippu.',
      },
    ],
    tiedosto: 'The drama of Saint Helena (1910) (14777842132).jpg',
    vuosi: '1910',
    lahde: 'Internet Archive (PD)',
    selite: 'Näkymä St. Helenalle 1910 julkaistun kirjan sivuilta — jyrkät '
      + 'kalliot ottivat vastaan jokaisen saapujan, keisarista '
      + 'matkalaiseen.',
    uusi: {
      tiedosto: "Jacob's Ladder near St. James Cathedral in Jamestown Saint Helena.jpg",
      lahde: 'Kevstan, Commons (CC BY-SA 4.0)',
      selite: 'Jamestown nykyään: Jaakobin portaat — 699 askelmaa — nousevat '
      + 'laakson pohjalta jyrkänteelle. Saarelle pääsee nykyisin myös '
      + 'lentäen.',
    },
  },
  viktorianputoukset: {
    lisat: [
      {
        tiedosto: 'Cataratas Victoria, Zambia-Zimbabue, 2018-07-27, DD 29.jpg',
        vuosi: '2018',
        lahde: 'Diego Delso, Commons (CC BY-SA 4.0)',
        selite: 'Viktorianputoukset Sambesijoella Sambian ja Zimbabwen rajalla. '
          + 'Vesi katoaa rotkoon, ja sen tilalle nousee sumupatsas — siitä '
          + 'nimi Mosi-oa-Tunya, jylisevä savu.',
      },
      {
        tiedosto: 'Victoria Falls - VicFalls3465.jpg',
        vuosi: '2025',
        lahde: 'lumoplank, Commons (CC0)',
        selite: 'Putoukset kuvattuna niiden oman sumun kastelemasta metsästä. '
          + 'Vesipöly sataa alas ympäri vuoden, ja siksi juuri tähän kohtaan '
          + 'on kasvanut sademetsä.',
      },
      {
        tiedosto: 'The gorges of the Victoria Falls.jpg',
        vuosi: '2019',
        lahde: 'Royal Mayhem, Commons (CC BY-SA 4.0)',
        selite: 'Sambesi jatkaa matkaansa kapeassa rotkossa putousten '
          + 'alapuolella. Reunalta katsottuna joki näyttää valkoiselta '
          + 'nauhalta mustan kallion välissä.',
      },
    ],
    tiedosto: 'Victoria Falls Bridge 1905.jpg',
    vuosi: '1905',
    lahde: 'Commons (PD)',
    selite: 'Putousten rautatiesilta juuri valmistuneena 1905. Se '
      + 'rakennettiin niin lähelle, että vaunuihin sataa vesisumua — '
      + 'suunnittelijan tarkoituksella.',
    uusi: {
      tiedosto: 'Victoria Falls Bridge and Zambezi river.jpg',
      lahde: 'Ninaras, Commons (CC BY-SA 4.0)',
      selite: 'Sama silta nykyään Sambian ja Zimbabwen rajalla. Junien '
      + 'rinnalle ovat tulleet benjihyppääjät — vesisumu kastelee yhä '
      + 'molemmat.',
    },
  },
  nairobi: {
    lisat: [
      {
        tiedosto: 'Karamoja steam locomotive at Nairobi Railway Museum.jpg',
        vuosi: '2017',
        lahde: 'Erasmus Kamugisha, Commons (CC BY-SA 4.0)',
        selite: 'Höyryveturi Nairobin rautatiemuseossa. Kaupunki alkoi '
          + 'ratatyömaan leiristä, kun kiskoja vedettiin Mombasasta '
          + 'sisämaahan — kiskot olivat ensin, katu tuli perässä.',
      },
      {
        tiedosto: 'Landscape of Nairobi National Park seen from Sheldrick Centre elephant enclosure.jpg',
        vuosi: '2025',
        lahde: 'Daniel Case, Commons (CC BY-SA 4.0)',
        selite: 'Savannia Nairobin kansallispuistossa. Puisto rajoittuu suoraan '
          + 'kaupunkiin, ja kaukana horisontissa erottuu keskustan siluetti.',
      },
    ],
    tiedosto: 'Photograph of Kenyan Sikh pioneers in-front of Gurdwara Sahib Railway Landhies in Nairobi, Kenya, 1903.jpg',
    vuosi: '1903',
    lahde: 'Commons (PD)',
    selite: 'Rautatien rakentajia Nairobissa 1903 — kaupunki oli tuolloin '
      + 'vasta muutaman vuoden ikäinen ratatyöläisten leiri.',
    uusi: {
      tiedosto: 'A giraffe the tallest animal in Kenya at Nairobi National Park with a background of Britam Tower the tallest building in Kenya.jpg',
      lahde: 'Alexmbogo, Commons (CC BY-SA 4.0)',
      selite: 'Masaikirahvi kävelee Nairobin kansallispuiston ruohikossa. '
        + 'Taustalla häämöttävät kaupungin tornitalot — puisto alkaa heti '
        + 'keskustan laidalta.',
    },
  },
  /*
   * Kortissa oli tiedosto nimeltä 'Sultan Ali Dinar.jpg', ja kuvateksti
   * kertoi sulttaanista, joka kuoli 1916. Kuvassa oli mies rannekello
   * ranteessa: Commonsin tiedoissa vuosi 2016 ja kuvaus "The Official
   * Portrait of the 30TH Sultan of Darfur" — nykyinen arvonimen
   * haltija. Tiedostonimi ei kerro kuvan ikää; siitä syntyi
   * tools/tarkista-kuvaiat.mjs.
   *
   * Ali Dinarista on olemassa vain yksi valokuva, brittiarmeijan
   * ottama hänen kuolemansa jälkeen taistelukentällä. Sitä ei panna
   * pelin korttiin. Tilalla on Jebel Marra, sama vuori josta
   * päiväkirjamerkintä kertoo.
   */
  darfur: {
    tiedosto: 'Photo Dwelling in the Darfur region 1958 - Touring Club Italiano BBT 072.jpg',
    vuosi: '1958',
    lahde: 'Touring Club Italiano, Commons (CC BY-SA 4.0)',
    selite: 'Darfurilaisen talouden piha: takana iso olkikattoinen maja, edessä '
      + 'rivi jalkojen varaan nostettuja pieniä olkikatoksia ja maassa '
      + 'puhvelin kallo. Pienet katokset ovat pyhäkköjä, joihin vainajien '
      + 'sielujen uskotaan asettuvan katsomaan suvun elämää.',
    lisat: [
      {
        tiedosto: 'ASC Leiden - NSAG - van Dis 4 - 048 - Conical thatched huts - Marrah Mountains, Darfur, Sudan - 27 December 1961.tif',
        vuosi: '1961',
        lahde: 'Maarten van Dis, ASC Leiden, Commons (CC BY-SA 4.0)',
        selite: 'Kartiokattoisia majoja pengerretyllä rinteellä Jebel Marran '
          + 'juurella joulukuussa 1961. Vuori nousee puoliaavikosta yli '
          + 'kolmeen kilometriin ja kerää oman sateensa — siksi sen '
          + 'rinteillä kasvaa se, mitä alhaalla ei kasva.',
      },
      {
        tiedosto: 'Sudan Jebel Marra Deriba Lakes.jpg',
        vuosi: '1986',
        lahde: 'J. Williams, Commons (CC BY 2.5)',
        selite: 'Deriban kraatterijärvet Jebel Marran laella. Vuori kohoaa '
          + 'Darfurin puoliaavikosta yli kolmeen kilometriin, ja sen huipulla '
          + 'on tulivuoren jättämä kattila.',
      },
      {
        tiedosto: 'نيرتيتي ٢.jpg',
        vuosi: '2023',
        lahde: 'Wlyeldeen Abkar, Commons (CC BY-SA 4.0)',
        selite: 'Vesiallas ja puita Nyerteten kylässä Jebel Marran ylängöllä. '
          + 'Vuoren rinteillä on vettä ja vihreää, vaikka alempana maa on '
          + 'kuivaa ja pölyistä.',
      },
    ],
    uusi: {
      tiedosto: 'ElFasherDarfurSudan RomanDeckert18022015.jpg',
      lahde: 'RomanDeckert, Commons (CC BY-SA 4.0)',
      selite: 'El Fasher, Darfurin vanha sulttaanien kaupunki, savitalojen ja '
      + 'hiekkakatujen laajana mattona ennen nykyistä sotaa.',
    },
  },
  suakin: {
    lisat: [
      {
        tiedosto: 'ASC Leiden - NSAG - van Dis 3 - 009 - A view of the abandoned port city on the island of Sawakin - Suakin (Sawakin), Red Sea (state), Sudan - 22 November 1961.tif',
        vuosi: '1961',
        lahde: 'Maarten van Dis, ASC Leiden, Commons (CC BY-SA 4.0)',
        selite: 'Suakinin saarikaupunki mereltä päin nähtynä. Talot on muurattu '
          + 'korallilohkareista, ja rivi nousee suoraan vedestä — satama oli '
          + 'tähän mennessä jo hiljennyt.',
      },
      {
        tiedosto: 'جزيرة سواكن.jpg',
        vuosi: '2025',
        lahde: 'Maryam Abdalla, Commons (CC0)',
        selite: 'Purjevene Suakinin edustalla. Punaisellamerellä on purjehdittu '
          + 'tähän satamaan vuosisatojen ajan, ja kolmiopurje kulkee '
          + 'rannikolla yhä.',
      },
    ],
    tiedosto: 'TheLandingPlaceAtSuakim(Suakin)1871.jpg',
    vuosi: '1871',
    lahde: 'Commons (PD)',
    selite: 'Suakinin laituripaikka 1871: dhow-veneitä ja korallitaloja '
      + 'saaren rannassa, kun satama oli vielä täydessä kukassaan.',
    uusi: {
      tiedosto: 'Suakin,custom office.jpg',
      lahde: 'Bertramz, Commons (CC BY 3.0)',
      selite: 'Suakinin korallitalot ovat nykyään rauniokaupunki, jota on '
      + 'alettu entisöidä. Punaisenmeren helmen kadut ovat hiljentyneet '
      + '— dhow-veneet käyvät yhä.',
    },
  },
  sahara: {
    lisat: [
      {
        tiedosto: 'Daily scene with cattle.jpg',
        vuosi: '2023',
        lahde: 'Issam Barhoumi, Commons (CC BY-SA 4.0)',
        selite: 'Kalliomaalaus Tassili n\'Ajjerin alueella Djanetin lähellä '
          + 'Algeriassa: kallioon on maalattu karjaa ja ihmishahmoja. Kuvat '
          + 'kertovat ajasta, jolloin näillä main laidunnettiin eläimiä.',
      },
      {
        tiedosto: 'Bleu Sahara (134974669).jpeg',
        vuosi: '2015',
        lahde: 'Rayane Yacine, Commons (CC BY 3.0)',
        selite: 'Tähtitaivas Algerian Saharan yllä. Kun päivän kuumuus laskee, '
          + 'taivas täyttyy niin tiheästi, että katsojan tekee mieli istua '
          + 'alas.',
      },
    ],
    tiedosto: 'ETH-BIB-Fokker in der Sahara-Tschadseeflug 1930-31-LBS MH02-08-0405.tif',
    vuosi: '1930–31',
    lahde: 'ETH-Bibliothek, Mittelholzer (PD)',
    selite: 'Mittelholzerin Fokker aavikkokentällä Saharan ylityksellä — '
      + 'juuri niitä lentoja, joista isoisän aikaan luettiin '
      + 'sanomalehdistä.',
    uusi: {
      tiedosto: 'Erg Chebbi sunset.jpg',
      lahde: 'Thomas Fuhrmann, Commons (CC BY-SA 4.0)',
      selite: 'Auringonlasku Saharan suurilla dyyneillä. Hiekka vaeltaa '
        + 'tuulen mukana yhä — vain matkustajat ovat vaihtuneet.',
    },
  },
  ahaggar: {
    lisat: [
      {
        tiedosto: 'Assekrem1991a.jpg',
        vuosi: '1991',
        lahde: 'Albert Backer, Commons (CC BY-SA 3.0)',
        selite: 'Kolme tuaregia keittää teetä hiilipannun ääressä Assekremissä '
          + 'Ahaggarin vuoristossa. Taustalla kohoaa yksi alueen tummista '
          + 'huipuista, ja päähineet suojaavat sekä tuulelta että kylmältä.',
      },
    ],
    tiedosto: 'Eremitage Foucauld (1991).jpg',
    vuosi: '1991',
    lahde: 'Albert Backer, Commons (CC BY-SA 3.0)',
    selite: 'Charles de Foucauldin kivinen erakkomaja Assekremin laella, '
      + 'rakennettu 1911. Aikakauden valokuvaa vuorilta ei ole vapaana '
      + 'saatavilla — maja seisoo kuvassa samanlaisena kuin isoisän '
      + 'aikaan.',
    uusi: {
      tiedosto: 'Sunrise Over the Assekrem Peaks — Hoggar Mountains, Algeria.jpg',
      lahde: 'Rachid Hamatou, Commons (CC BY-SA 4.0)',
      selite: 'Auringonnousu Ahaggarin vuorilla. Kivipiikit nousevat autiomaan '
        + 'yllä, ja etualalla kulkee kivinen polku kohti näköalapaikkaa.',
    },
  },
  mosambik: {
    lisat: [
      {
        tiedosto: 'Island of Mozambique boats.jpg',
        vuosi: '2007',
        lahde: 'Stig Nygaard, Commons (CC BY 2.0)',
        selite: 'Purjeveneitä matalikolla Mosambikin saaren edustalla. Vesi on '
          + 'niin kirkasta ja matalaa, että pohja näkyy veneiden alta '
          + 'rannalle asti.',
      },
      {
        tiedosto: '20 Fortaleza de São Sebastião (36931473391).jpg',
        vuosi: '2017',
        lahde: 'Cornelius Kibelka, Commons (CC BY-SA 2.0)',
        selite: 'São Sebastiãon linnoituksen muurit Mosambikin saaren '
          + 'pohjoiskärjessä. Portugalilaiset rakensivat linnoituksen '
          + '1500-luvulla, ja sen muurit seisovat yhä meren äärellä.',
      },
    ],
    tiedosto: 'Planta da fortaleza da ilha de Moçambique, Leonardo de Ferrari, 1655.jpg',
    vuosi: '1655',
    lahde: 'Commons (PD)',
    selite: 'São Sebastiãon linnoituksen piirros vuodelta 1655 — vanhin '
      + 'kuva saarelta. Sama linnoitus vartioi satamaa isoisän aikaan ja '
      + 'vartioi yhä.',
    uusi: {
      tiedosto: 'Forte de São Sebastião - Igreja.jpg',
      lahde: 'Stig Nygaard, Commons (CC BY 2.0)',
      selite: 'São Sebastiãon linnoituksen sisäpiha Mosambikin saarella. '
        + 'Valkoiseksi kalkittu kirkko seisoo muurien sisällä, ja takana '
        + 'avautuu Intian valtameri.',
    },
  },
  viktoria: {
    lisat: [
      {
        tiedosto: 'Sunset from lake victoria -homa bay side.jpg',
        vuosi: '2022',
        lahde: 'Mikegregs, Commons (CC BY-SA 4.0)',
        selite: 'Vene ulapalla auringonlaskussa Viktoriajärven Homa Bayn puolella '
          + 'Keniassa. Illalla kalastajat suuntaavat vesille, ja järvi '
          + 'näyttää enemmän mereltä kuin järveltä.',
      },
      {
        tiedosto: 'Jinja source of Nile.jpg',
        lahde: 'Dror Feitelson, Commons (CC BY-SA 3.0)',
        selite: 'Kyltti Jinjassa Ugandassa merkitsee kohdan, jossa Niili lähtee '
          + 'Viktoriajärvestä pohjoiseen. Taustalla näkyy järvi ja yksinäinen '
          + 'vene.',
      },
    ],
    tiedosto: 'Jules Leclercq- Aux sources du Nil-1913-chutes Ripon.jpg',
    vuosi: '1913',
    lahde: 'Commons (PD)',
    selite: 'Riponin putoukset, joista Niili lähti Viktoria Nyanzasta '
      + 'pohjoiseen. Isoisän ajan kuuluisa nähtävyys upposi padon alle '
      + '1954 — putousta ei enää ole.',
    uusi: {
      tiedosto: 'Boats by the Lake Victoria Shore.jpg',
      lahde: 'Laura Awino, Commons (CC BY-SA 4.0)',
      selite: 'Kalastajaveneitä Viktoria Nyanzan rannassa nykyään. Järvi '
        + 'on Afrikan suurin, ja putouksen paikalla humisee nyt '
        + 'voimalaitos.',
    },
  },
  bahrelghazal: {
    lisat: [
      {
        tiedosto: 'Under an African Sky - panoramio.jpg',
        vuosi: '2008',
        lahde: 'Michael Walsh, Commons (CC BY 3.0)',
        selite: 'Jur-joki, Bahr el Ghazalin yläjuoksu, auringonlaskun aikaan. '
          + 'Vesi leviää tulvaruohikoksi niin laajalti, ettei uomaa erota — '
          + 'juuri tästä päiväkirja kirjoittaa.',
      },
      {
        tiedosto: 'Fishing in Sudd wetland - by CPWF Basin Focal Project.jpg',
        vuosi: '2008',
        lahde: 'Karen Conniff / CPWF, Commons (CC BY 2.0)',
        selite: 'Kalastaja ruuhessaan Suddin suoalueella Niilin latvoilla. '
          + 'Veneessä on kuivattua kalaa, ja takana kohoaa kaislikon seinä, '
          + 'jonka läpi kuljetaan kapeita väyliä pitkin.',
      },
    ],
    tiedosto: 'Mission Marchand Haut-Oubangui Bahr-el-Ghazal Nil (...)Marchand Jean-Baptiste btv1b53198373d 4.jpg',
    vuosi: '1903',
    lahde: 'BnF Gallica (PD)',
    selite: 'Marchandin retkikunnan kartta: Ranska marssi Bahr el '
      + 'Ghazalin halki Fashodaan 1898 ja oli ajaa Euroopan suursotaan '
      + 'Britannian kanssa — suot ratkaisivat enemmän kuin armeijat.',
    uusi: {
      tiedosto: 'Cattle Wau Sudan.jpg',
      lahde: 'Bertramz, Commons (CC BY-SA 3.0)',
      selite: 'Pitkäsarvinen karja on Bahr el Ghazalin rikkaus '
        + 'nykyäänkin: paimenten vuosi kiertää karjaleirien ja '
        + 'tulvatasankojen mukana.',
    },
  },
};

import { VALOKUVAT_PAIKALLISET } from './valokuvat-paikalliset.js';
import { LIPUT_PAIKALLISET } from './liput-paikalliset.js';
import { PEILI_JUURI, peiliKuvaPolku, peiliKaytossa } from '../media.js';

/** Alkuperäinen lähde Commonsissa. Tämä on aina viimeinen varareitti. */
function commonsUrl(tiedosto, leveys) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(tiedosto)}?width=${leveys}`;
}

const omaKansio = () => typeof location !== 'undefined' && location.protocol !== 'file:';

/**
 * Kuvaosoite kolmessa portaassa:
 *   1. paikallinen kopio repossa (nopein, toimii offline)
 *   2. peili — pelin oma kopio kaikesta ulkopuolisesta aineistosta
 *   3. Commons, alkuperäinen lähde
 *
 * Peili on ennen Commonsia siksi, että Commonsista voi kadota tiedosto
 * uudelleennimeämisen tai poiston takia. Jos peili ei vastaa, kuvan
 * asettaja (media.js: asetaKuva) siirtyy varareitille automaattisesti.
 *
 * Standalone-tiedosto (file:) ohittaa assets-kansion, koska sen vieressä
 * ei ole sellaista — peili ja Commons toimivat silti.
 */
export function valokuvaUrl(tiedosto, leveys) {
  const paikallinen = VALOKUVAT_PAIKALLISET.get(tiedosto);
  if (paikallinen && omaKansio()) return `assets/valokuvat/${paikallinen}`;
  if (peiliKaytossa('kuvat')) return `${PEILI_JUURI}${peiliKuvaPolku(tiedosto, 'kuvat')}`;
  return commonsUrl(tiedosto, leveys);
}

/** Valokuvan varareitti, kun ensisijainen osoite ei vastaa. */
export function valokuvaVara(tiedosto, leveys) {
  return commonsUrl(tiedosto, leveys);
}

/**
 * SUURENNOKSEN osoite: aina Commonsista pyydetyllä leveydellä.
 *
 * valokuvaUrl palauttaa ensisijaisesti repon paikalliskopion, joka on
 * tallennettu lehden palstaleveydelle (≤1280 px, osa pienempiä) —
 * leveysparametri ei vaikuta siihen lainkaan. Lehden sivulla CSS
 * venyttää pikkukopion palstan täyteen, mutta suurennos näyttää
 * tiedoston luonnollisessa koossaan, jolloin "koko ruudun" kuva oli
 * iPadilla PIENEMPI kuin sivulla (omistajan havainto 13.8.2026).
 * Suurennos hakee siksi ison version suoraan Commonsista; kutsuja
 * antaa varaksi valokuvaUrl:n, jotta kuva näkyy myös yhteydettä —
 * pienempänä, mutta näkyy.
 */
export function valokuvaSuurennos(tiedosto, leveys) {
  return commonsUrl(tiedosto, leveys);
}

/**
 * Lipun osoite samoissa portaissa. Liput ovat repossa
 * (tools/fetch-flags.mjs), koska saapumiskortti näyttää niitä useita
 * kerralla ja Commons alkoi rajoittaa peräkkäisiä pyyntöjä — silloin
 * liput jäivät pois kokonaan.
 */
export function lippuUrl(tiedosto, leveys) {
  const paikallinen = LIPUT_PAIKALLISET.get(tiedosto);
  if (paikallinen && omaKansio()) return `assets/liput/${paikallinen}`;
  if (peiliKaytossa('kuvat')) return `${PEILI_JUURI}${peiliKuvaPolku(tiedosto, 'liput')}`;
  return commonsUrl(tiedosto, leveys);
}

/** Lipun varareitti. */
export function lippuVara(tiedosto, leveys) {
  return commonsUrl(tiedosto, leveys);
}
