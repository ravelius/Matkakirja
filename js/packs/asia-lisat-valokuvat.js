// Matkakirjan valokuvakortit (ASIA_LISAT_VALOKUVAT).
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
export const ASIA_LISAT_VALOKUVAT = {
  bangkok: {
    tiedosto: 'Menam-rivier in Bangkok met gebouwen en boten, gezien vanaf de Royal Dock Yard Menam River from the Royal Dock Yard, B(..)ok (titel op object), RP-F-F01197-X.jpg',
    vuosi: '1870–1900',
    lahde: 'G. R. Lambert & Co. / Rijksmuseum, Commons (CC0)',
    selite: 'Chao Phraya -joki Bangkokissa 1800-luvun lopulla, kuvattuna '
      + 'kuninkaallisen telakan puolelta. Vedos on singaporelaisen G. R. '
      + 'Lambert & Co:n studion tekemä. Eurooppalaiset kutsuivat jokea '
      + 'nimellä Menam, joka on thaiksi yksinkertaisesti jokea tarkoittava '
      + 'sana.',
    lisat: [
      {
        tiedosto: '2016 Bangkok, Dystrykt Samphanthawong, Ulica Yaowarat (12).jpg',
        vuosi: '2016',
        lahde: 'Marcin Konsek, Commons (CC BY-SA 4.0)',
        selite: 'Katuruokakojuja Yaowarat-kadulla Samphanthawongin '
          + 'kaupunginosassa. Yaowarat on Bangkokin kiinalaiskortteli, ja '
          + 'kadun kojut työntyvät jalkakäytäville vasta illan tullen.',
      },
      {
        tiedosto: 'Bangkok, Chao Phraya Express Boat (6223055781).jpg',
        vuosi: '2011',
        lahde: 'Fabio Achilli, Commons (CC BY 2.0)',
        selite: 'Chao Phraya Express Boatin vene laiturissa. Joella kulkee '
          + 'säännöllinen vesibussiliikenne, jonka puiset veneet pysähtyvät '
          + 'kymmenillä laitureilla — monelle se on nopein tapa liikkua '
          + 'ruuhkaisessa kaupungissa.',
      },
      {
        tiedosto: 'Bangkok along the Chao Phraya and Wat Arun (15068304635).jpg',
        vuosi: '2014',
        lahde: 'Clay Gilliland, Commons (CC BY-SA 2.0)',
        selite: 'Wat Arun Chao Phrayan Thonburin puoleisella rannalla, lähes '
          + 'vastapäätä kuninkaanlinnaa. Temppelin koko nimi on Wat Arun '
          + 'Ratchawararam Ratchawaramahawihan, mutta se tunnetaan Aamuruskon '
          + 'temppelinä.',
      },
    ],
    uusi: {
      tiedosto: 'Chao Phraya in Bangkok 2.jpg',
      lahde: 'Christophe95, Commons (CC BY-SA 4.0)',
      selite: 'Sama joki tänään, kuvattuna vesibussin kannelta. Proomut ja '
        + 'matkustajaveneet käyttävät jokea yhä, mutta rantaa reunustavat nyt '
        + 'hotellit ja tornitalot telakoiden ja varastojen sijaan.',
    },
  },
  borneo: {
    tiedosto: 'View on Bandjermasin-river (Borneo)., KITLV 1400217.tiff',
    vuosi: '1800- ja 1900-luvun taite',
    lahde: 'Koninklijke Paketvaart Maatschappij / KITLV, Leidenin yliopiston kirjasto, Commons (CC BY 4.0)',
    selite: 'Veneitä Banjarmasinin joella Etelä-Borneolla. Kuvan on teettänyt '
      + 'hollantilainen laivayhtiö Koninklijke Paketvaart Maatschappij, joka '
      + 'hoiti saariston välistä liikennettä; arkisto ajoittaa sen 1800- ja '
      + '1900-luvun taitteeseen.',
    lisat: [
      {
        tiedosto: 'Floating market Lok Baintan.jpg',
        vuosi: '2013',
        lahde: 'Midori, Commons (CC BY 3.0)',
        selite: 'Lok Baintanin kelluva tori Martapura-joella. Banjarmasinin '
          + 'keskustasta tänne on vajaan tunnin matka klotokilla, '
          + 'perinteisellä puuveneellä.',
      },
      {
        tiedosto: 'Pasar Terapung Lok Baintan pisang.jpg',
        vuosi: '2013',
        lahde: 'Midori, Commons (CC BY 3.0)',
        selite: 'Banaanikuormia samalla kelluvalla torilla. Vene on täällä yhtä '
          + 'aikaa kulkuneuvo, varasto ja myyntipöytä.',
      },
      {
        tiedosto: 'Restlessness in The Forest.jpg',
        vuosi: '2019',
        lahde: 'Aryanto, Commons (CC BY-SA 4.0)',
        selite: 'Orangutan Borneon metsässä. Lajia elää luonnossa enää Borneolla '
          + 'ja Sumatralla, ja sen elintila kapenee, kun metsää raivataan '
          + 'viljelmiksi, teiksi ja kaivoksiksi.',
      },
    ],
    uusi: {
      tiedosto: 'Jukung Pasar Terapung.jpg',
      vuosi: '2016',
      lahde: 'Muhammad Haris, Commons (CC BY-SA 4.0)',
      selite: 'Jukung-veneitä kelluvalla torilla nykyään. Banjarmasinia kutsutaan '
        + 'tuhannen joen kaupungiksi, ja kauppa vedeltä veneeseen on osa sen '
        + 'omaa tapaa.',
    },
  },
  chennai: {
    tiedosto: '06Marina Madras.jpg',
    vuosi: '1913',
    lahde: 'Messrs. Nicholas & Co. / Etelä-Intian rautatien matkaopas, Commons (PD)',
    selite: 'Madrasin Marina-ranta vuonna 1913, kuvattuna Etelä-Intian rautatien '
      + 'matkaoppaaseen. Kaupungilla ei ollut luonnonsatamaa, joten '
      + 'matkustajat ja tavarat tuotiin pitkään maihin veneillä aallokon '
      + 'läpi.',
    lisat: [
      {
        tiedosto: 'Chennai Egmore station Madras.jpg',
        vuosi: '2023',
        lahde: 'Photopank, Commons (CC BY-SA 4.0)',
        selite: 'Egmoren rautatieasema Chennaissa. Siirtomaa-ajan asemarakennus '
          + 'valmistui 1900-luvun alussa, ja siitä lähtevät yhä junat Tamil '
          + 'Nadun sisämaahan.',
      },
      {
        tiedosto: 'Kapaleeshwarar Temple, Mylapore, Chennai, India.jpg',
        vuosi: '2024',
        lahde: 'N. Vivekananthamoorthy, Commons (CC BY 4.0)',
        selite: 'Kapaleeshwararin temppeli Mylaporen kaupunginosassa. Temppeli '
          + 'kuuluu niihin 275 Shiva-pyhäkköön, joita tamilirunoilijat '
          + 'ylistivät jo 600–800-luvuilla.',
      },
      {
        tiedosto: 'India - Koyambedu Market - Faces 01 (3983959747).jpg',
        vuosi: '2009',
        lahde: 'McKay Savage, Commons (CC BY 2.0)',
        selite: 'Kantajia purkamassa hedelmäkuormaa Koyambedun tukkutorilla. '
          + 'Chennain kaupat ja pienemmät torit hakevat vihanneksensa, '
          + 'hedelmänsä ja kukkansa täältä.',
      },
    ],
    uusi: {
      tiedosto: 'Glitters, at Marina beach, Chennai.jpg',
      vuosi: '2013',
      lahde: 'D. Vasanth Kumar, Commons (CC BY-SA 4.0)',
      selite: 'Kalastajia veneessä auringonnousun aikaan samalla Marina-rannalla. '
        + 'Vaikka kaupunkiin rakennettiin satama, rantakalastajat lähtevät '
        + 'yhä suoraan hiekalta aallokkoon.',
    },
  },
  colombo: {
    tiedosto: 'De vuurtoren op de kruising van Queen Street (tegenwoordig Janadhipathi Mawatha) en Chatham Street, Colombo, RP-F-F01197-AP.jpg',
    vuosi: 'noin 1875–1880',
    lahde: 'Charles T. Scowen & Co. / Rijksmuseum, Commons (CC0)',
    selite: 'Colombon majakka Queen Streetin ja Chatham Streetin kulmassa noin '
      + 'vuosina 1875–1880. Kuva on osa albumia, jonka joku toi mukanaan '
      + 'Kaakkois-Aasian matkaltaan; ottajaksi arvellaan Ceylonissa '
      + 'työskennellyttä valokuvaajaa Charles T. Scowenia.',
    lisat: [
      {
        tiedosto: '20160122 Sri Lanka 3590 crop Colombo sRGB (25770952495).jpg',
        vuosi: '2016',
        lahde: 'Dan Lundberg, Commons (CC BY-SA 2.0)',
        selite: 'Kuivatun kalan puoti Pettahissa. Kala suolataan ja kuivataan, '
          + 'jotta se säilyy ilman kylmäketjua; Pettah on Colombon vanhimpia '
          + 'kaupunginosia ja yhä sen vilkkain kauppa-alue.',
      },
      {
        tiedosto: 'Sri Lanka - 013 - Harbour fish market area panorama (1630266779).jpg',
        vuosi: '2007',
        lahde: 'McKay Savage, Commons (CC BY 2.0)',
        selite: 'Colombon sataman kalatorin edusta. Tori käy puoli viidestä '
          + 'aamulla kymmeneen, ja tämä kuva on otettu vasta iltapäivällä, '
          + 'kun myyjät ovat jo lähteneet.',
      },
      {
        tiedosto: 'Colombo galle face on Sunday.JPG',
        vuosi: '2013',
        lahde: 'Saqib Qayyum, Commons (CC BY-SA 3.0)',
        selite: 'Galle Face sunnuntaina. Meren rantaan jätetty avoin nurmikenttä '
          + 'on kaupungin yhteinen ulkoilupaikka, ja sen laidalle on noussut '
          + 'hotelleja ja virastoja.',
      },
    ],
    uusi: {
      tiedosto: 'Old Colombo Lighthouse - 02.jpg',
      vuosi: '2016',
      lahde: 'Dan arndt, Commons (CC BY-SA 4.0)',
      selite: 'Sama torni nykyään samassa risteyksessä. Se ei enää toimi '
        + 'majakkana vaan kellotornina, ja Queen Streetin nimi on vaihtunut '
        + 'Janadhipathi Mawathaksi.',
    },
  },
  delhi: {
    tiedosto: 'Delhi. Chandee Chawk LCCN2017657607.jpg',
    vuosi: '1890-luku',
    lahde: 'Photoglob Co. / Library of Congress (PD)',
    selite: 'Chandni Chowk Delhissä 1890-luvulla, käsinväritetty '
      + 'photochrom-vedos. Kadun nimi tarkoittaa kuunvalon toria, ja sen '
      + 'keskellä virtasi alun perin kanava.',
    lisat: [
      {
        tiedosto: 'Chandni Chowk, 2008 (20).JPG',
        vuosi: '2008',
        lahde: 'Bahnfrend, Commons (CC BY-SA 3.0)',
        selite: 'Näkymä länteen Khari Baoli -kadulla Fatehpurin moskeijan '
          + 'pohjoisportin kohdalta. Khari Baoli on Chandni Chowkin '
          + 'maustekortteli, jossa chili, kurkuma ja pähkinät myydään '
          + 'tukkuerinä.',
      },
      {
        tiedosto: 'Old and famous Jalebiwala shop at Chandni Chowk, Delhi IMG 20150401 135516.jpg',
        vuosi: '2015',
        lahde: 'Sumita Roy Dutta, Commons (CC BY-SA 4.0)',
        selite: 'Vanha jalebi-puoti Chandni Chowkilla, Sis Ganj Sahibin gurdwaran '
          + 'pohjoispäässä. Jalebit paistetaan puhtaassa voisulassa ja '
          + 'upotetaan mausteiseen sokerisiirappiin; täällä ne ovat paksuja '
          + 'ja pehmeitä eivätkä rapeita kuten muualla kaupungissa.',
      },
      {
        tiedosto: 'Cycle Rickshaw - Chandni Chowk Road - Delhi 2014-05-13 3517.JPG',
        vuosi: '2014',
        lahde: 'Biswarup Ganguly, Commons (CC BY 3.0)',
        selite: 'Polkuriksa Chandni Chowkin kadulla. Vanhankaupungin kujilla '
          + 'riksa pääsee sinne, minne auto ei mahdu, ja siksi se on säilynyt '
          + 'osana liikennettä.',
      },
    ],
    uusi: {
      tiedosto: 'Chandni Chowk. Delhi, India (23389084162).jpg',
      vuosi: '2015',
      lahde: 'Juan Antonio Segal, Commons (CC BY 2.0)',
      selite: 'Sama katu nykyään. Kanava on peitetty jo kauan sitten, mutta '
        + 'Chandni Chowk on yhä Vanhan Delhin pääväylä, ja sen molemmin '
        + 'puolin aukeaa kauppakujien verkosto.',
    },
  },
  hanoi: {
    tiedosto: 'Hanoï - Congais au Grand Marché.jpg',
    vuosi: '1800-luvun loppu',
    lahde: 'Tuntematon kuvaaja, Commons (PD)',
    selite: 'Kaupankäyntiä Đồng Xuânin torilla 1800-luvun lopulla, ennen kuin '
      + 'torialue oli rakennettu valmiiksi. Kuva levisi postikorttina, kuten '
      + 'suuri osa Ranskan Indokiinan aikaisista Hanoi-valokuvista.',
    lisat: [
      {
        tiedosto: 'Hanoi Old Quarter, 9 March 2019-1.jpg',
        vuosi: '2019',
        lahde: 'Alexey Komarov, Commons (CC BY-SA 4.0)',
        selite: 'Vanhankaupungin katu Hanoissa. Korttelin kadut on nimetty '
          + 'ammattikuntien mukaan: Hàng-alkuinen nimi kertoo, mitä tavaraa '
          + 'kadulla aikoinaan myytiin, ja osalla kaduista sama tavara on '
          + 'myynnissä yhä.',
      },
      {
        tiedosto: 'Hanoi Night Market 3.jpg',
        vuosi: '2018',
        lahde: 'Christophe95, Commons (CC BY-SA 4.0)',
        selite: 'Viikonlopun yömarkkinat Hanoin vanhassakaupungissa. Markkinat '
          + 'pidetään ajoradalla, joka suljetaan viikonlopuiksi autoilta ja '
          + 'mopoilta.',
      },
      {
        tiedosto: 'Thap Rua (Tottoise) Tower, Hoan Kiem Lake, Hanoi (1) (38442367376).jpg',
        vuosi: '2017',
        lahde: 'Richard Mortel, Commons (CC BY 2.0)',
        selite: 'Kilpikonnatorni Hoàn Kiếmin järven saarekkeella. Järven nimi '
          + 'tarkoittaa palautettua miekkaa ja viittaa tarinaan '
          + 'hallitsijasta, joka voitettuaan sodan antoi taikamiekan takaisin '
          + 'järvessä asuvalle kilpikonnalle.',
      },
    ],
    uusi: {
      tiedosto: 'Đồng Xuân Market 1.jpg',
      lahde: 'Christophe95, Commons (CC BY-SA 4.0)',
      selite: 'Sama tori tänään. Đồng Xuân on Hanoin suurin katettu tori; '
        + 'nykyinen halli rakennettiin uudelleen 1990-luvulla sen jälkeen, '
        + 'kun vanha paloi.',
    },
  },
  hongkong: {
    tiedosto: 'Gezicht op de haven van Hongkong, RP-F-F20158.jpg',
    vuosi: '1863–1900',
    lahde: 'Wilhelm Burger / Rijksmuseum, Commons (CC0)',
    selite: 'Näkymä Hongkongin satamaan 1800-luvun jälkipuoliskolla. Vedoksen '
      + 'otti itävaltalainen Wilhelm Burger, joka valokuvasi Itä-Aasiassa '
      + 'Itävalta-Unkarin retkikunnan mukana. Satama oli tuolloin '
      + 'brittiläisen siirtomaan koko olemassaolon syy.',
    lisat: [
      {
        tiedosto: 'HK SEA FOOD STREET NIGHT VIEW 10.19.jpg',
        vuosi: '2019',
        lahde: 'Smallpei, Commons (CC BY-SA 4.0)',
        selite: 'Des Voeux Road Westiä kutsutaan kuivatun merenelävän kaduksi. '
          + 'Liikkeissä myydään kuivattua kalaa, simpukkaa ja merilevää '
          + 'säkeittäin, ja kadulla kulkevat sekä kaksikerroksinen '
          + 'raitiovaunu että bussi.',
      },
      {
        tiedosto: 'Hong Kong, Part 3 - HongKong8641.jpg',
        vuosi: '2026',
        lahde: 'lumoplank, Commons (CC0)',
        selite: 'Kaksi kaksikerroksista raitiovaunua Des Voeux Road Centralilla. '
          + 'Hongkongin raitiotie on kulkenut saaren pohjoisrannikkoa '
          + 'vuodesta 1904, ja lippu on yhä kaupungin edullisimpia.',
      },
      {
        tiedosto: 'HK 中環 Central 結志街 Gage Street 嘉咸街 Graham Street 街市 market stall fruit February 2021 SS2 22.jpg',
        vuosi: '2021',
        lahde: 'Commonsin käyttäjä Shio Piemnd Wosmvi (CC BY-SA 4.0)',
        selite: 'Hedelmäkoju Gage Streetin ja Graham Streetin katutorilla '
          + 'Hongkongin Centralissa. Kojut seisovat ajoradan reunassa aivan '
          + 'pankkikorttelin kupeessa, missä tontit ovat maailman kalleimpia.',
      },
    ],
    uusi: {
      tiedosto: 'Victoria Harbour Hong Kong and Star Ferry.JPG',
      lahde: 'Clark Sui, Commons (CC BY-SA 4.0)',
      selite: 'Sama satama nykyään: Victoria Harbour ja etualalla Star Ferryn '
        + 'laituri. Lauttayhteys saaren ja Kowloonin välillä on toiminut '
        + '1880-luvulta asti, vaikka rinnalle on sittemmin rakennettu '
        + 'tunneleita ja metro.',
    },
  },
  jakarta: {
    tiedosto: 'Collectie NMvWereldculturen, RV-A121-1-25, Foto, \'Stadhuis van Batavia met het tramspoor\', fotograaf Woodbury & Page, ca. 1900.jpg',
    vuosi: 'noin 1900',
    lahde: 'Woodbury & Page / Nationaal Museum van Wereldculturen, Commons (PD)',
    selite: 'Batavian raatihuone noin vuonna 1900; kadussa sen edessä kulkee '
      + 'raitiotien kisko. Talo oli hollantilaisen siirtomaakaupungin '
      + 'hallinnon keskus, ja aukio sen edustalla on yhä vanhan kaupungin '
      + 'sydän.',
    lisat: [
      {
        tiedosto: 'Pinisi at Sunda Kelapa Port.jpg',
        vuosi: '2017',
        lahde: 'Cun Cun, Commons (CC BY-SA 4.0)',
        selite: 'Pinisi-purjealuksia Sunda Kelapan satamassa, Jakartan vanhassa '
          + 'satamassa. Puurunkoiset rahtipurjehtijat kuljettavat tavaraa '
          + 'saarelta toiselle vielä nykyään.',
      },
      {
        tiedosto: 'Warung martabak.JPG',
        vuosi: '2013',
        lahde: 'Lord Mountbatten, Commons (CC BY-SA 3.0)',
        selite: 'Katukoju Karet Pedurenanin kadulla Jakartassa. Paikka on '
          + 'erikoistunut martabakiin, paistettuun täytettyyn taikinaleipään, '
          + 'jota tehdään sekä suolaisena että makeana.',
      },
      {
        tiedosto: 'Taman Fatahillah, Kota Tua, Jakarta.jpg',
        vuosi: '2022',
        lahde: 'Alif Mikail, Commons (CC BY-SA 4.0)',
        selite: 'Fatahillahin aukio Kota Tuassa eli Jakartan vanhassakaupungissa '
          + 'joulukuussa 2022. Tämän aukion ympärille hollantilainen Batavia '
          + 'aikanaan rakennettiin.',
      },
    ],
    uusi: {
      tiedosto: 'Batavia City Hall (Jakarta History Museum) Fatahillah Square (2025) - img 06.jpg',
      vuosi: '2025',
      lahde: 'Chainwit., Commons (CC BY 4.0)',
      selite: 'Sama raatihuone nykyään Fatahillahin aukion laidalla. Raitiovaunut '
        + 'ovat kadonneet kadulta, ja talossa toimii Jakartan historian '
        + 'museo.',
    },
  },
  kabul: {
    tiedosto: 'NO-NB BLDSA GM2a287n.jpg',
    vuosi: '1924',
    lahde: 'Georg Morgenstierne / Norjan kansalliskirjasto, Commons (PD)',
    selite: 'Bala Hissarin linnoitus Kabulissa vuonna 1924. Kaupungin kuuluisa '
      + 'muuri seitsemine portteineen alkoi tästä; viimeinen porteista '
      + 'purettiin 1930. Kuvan otti norjalainen kielentutkija Georg '
      + 'Morgenstierne, ja sitä on jälkikäteen viimeistelty lyijykynällä.',
    lisat: [
      {
        tiedosto: 'Fruit market seller, Kabul.jpg',
        vuosi: '2018',
        lahde: 'Hogai Aryoubi, Commons (CC0)',
        selite: 'Hedelmäkauppias Kabulin torilla. Tuoreet ja kuivatut hedelmät '
          + 'ovat Afganistanin tärkeimpiä vientitavaroita, ja sadonkorjuun '
          + 'aikaan ne täyttävät kaupungin torit.',
      },
      {
        tiedosto: '2009 winter street scene in Kabul.jpg',
        vuosi: '2009',
        lahde: 'Brian Hillegas, Commons (CC BY 2.0)',
        selite: 'Talvinen katunäkymä Kabulin keskustassa joulukuussa 2009. '
          + 'Kaupunki on noin 1 800 metrin korkeudessa vuorten ympäröimässä '
          + 'laaksossa, ja talvella siellä on lunta.',
      },
      {
        tiedosto: 'Afghan locals stand near shops in a bazaar in Kabul, Afghanistan, March 11, 2009. (U.S. Army photo by Staff Sgt. James Fidel - Released) 090311-A-AZ411-078.jpg',
        vuosi: '2009',
        lahde: 'James Fidel / U.S. Army, Commons (PD)',
        selite: 'Puoteja Kabulin basaarissa maaliskuussa 2009. Basaari on '
          + 'kaupankäynnin vanha muoto: kapea kuja, jonka molemmin puolin '
          + 'liikkeet aukeavat suoraan kadulle.',
      },
    ],
    uusi: {
      tiedosto: 'Bala Hisar.jpg',
      vuosi: '2018',
      lahde: 'AhmadElhan, Commons (CC BY-SA 4.0)',
      selite: 'Sama Bala Hissarin linnoitus nykyään. Se tuhoutui osittain '
        + 'toisessa Britannian ja Afganistanin sodassa 1878–1880 ja '
        + 'rakennettiin uudelleen; vuodesta 1939 siinä toimi sotakoulu, '
        + 'kunnes pommitukset tuhosivat sen jälleen.',
    },
  },
  karachi: {
    tiedosto: 'A street in Old Town, Karachi, India. Photograph, 1897. Wellcome V0029261.jpg',
    vuosi: '1897',
    lahde: 'R. Jalbhoy / Wellcome Collection, Commons (CC BY 4.0)',
    selite: 'Rampart Row Karachin vanhassakaupungissa: leveä päällystämätön katu, '
      + 'kivitaloja ja niiden julkisivuilla riveittäin veistettyjä '
      + 'puuparvekkeita. Vedos on kaupungin ruttokomitean teettämästä '
      + 'sarjasta, ja korttelit näyttivät yhä samalta kun isoisä nousi '
      + 'maihin runsaat kaksikymmentä vuotta myöhemmin.',
    lisat: [
      {
        tiedosto: 'Rustpauze bij de oase van Malir bij Karachi, Bestanddeelnr 255-8196.jpg',
        vuosi: '1946',
        lahde: 'Willem van de Poll / Nationaal Archief, Commons (CC0)',
        selite: 'Autot ovat pysähtyneet tauolle Malirin keitaalle Karachin '
          + 'ulkopuolelle helmikuussa 1946. Hollantilainen Willem van de Poll '
          + 'kuvasi matkalaisia Malaijalle ja Indonesiaan; Malir on nykyään '
          + 'yksi Karachin kaupunginosista.',
      },
      {
        tiedosto: 'Empress Market Saddar Karachi.jpg',
        vuosi: '2018',
        lahde: 'Siddiqi, Commons (CC BY 4.0)',
        selite: 'Empress Market Saddarissa iltavalaistuksessa. Kauppahalli '
          + 'rakennettiin 1880-luvulla ja nimettiin kuningatar Viktorian '
          + 'mukaan; siellä myydään yhä vihanneksia, mausteita ja lihaa.',
      },
      {
        tiedosto: 'PK Karachi asv2020-02 img44 Kemari boat terminal.jpg',
        vuosi: '2020',
        lahde: 'A.Savin, Commons (Free Art License)',
        selite: 'Keamarin veneterminaali Karachin satamassa. Keamari on kaupungin '
          + 'satamakaupunginosa, ja se yhdistettiin muuhun kaupunkiin '
          + 'sillalla jo 1800-luvulla.',
      },
      {
        tiedosto: 'Karachi Port Trust (KPT) Head Office Building Karachi.jpg',
        vuosi: '2016',
        lahde: 'Furqanlw, Commons (CC BY-SA 4.0)',
        selite: 'Karachin satamalaitoksen pääkonttori, suojeltu '
          + 'rakennusmuistomerkki. Talon koko kertoo, mistä kaupunki on '
          + 'elänyt: sataman läpi kulkee valtaosa Pakistanin '
          + 'ulkomaankaupasta.',
      },
    ],
    uusi: {
      tiedosto: 'PK Karachi asv2020-02 img13 Clifton Beach.jpg',
      vuosi: '2020',
      lahde: 'A.Savin, Commons (Free Art License)',
      selite: 'Cliftonin ranta Karachissa. Clifton oli sata vuotta sitten '
        + 'kaupungin laitamilla oleva rantatie; nyt se on yksi Karachin '
        + 'arvostetuimmista kaupunginosista.',
    },
  },
  kathmandu: {
    tiedosto: 'Kurt boeck indien nepal 265A.jpg',
    vuosi: '1898',
    lahde: 'Kurt Boeck, Commons (PD)',
    selite: 'Puuleikkauksin koristeltu newar-temppeli kuninkaanpalatsin edustalla '
      + 'Kathmandussa vuonna 1898. Saksalainen Kurt Boeck julkaisi kuvan '
      + 'kirjassa, jonka nimi kuului suomeksi suunnilleen \'Intian kautta '
      + 'suljettuun maahan Nepaliin\' — ulkomaalaisia päästettiin maahan '
      + 'tuolloin vain harvoin.',
    lisat: [
      {
        tiedosto: 'Asan Spice Market,Kathmandu,Nepal.jpg',
        vuosi: '2017',
        lahde: 'Dr. Nishant Bhatt, Commons (CC BY-SA 4.0)',
        selite: 'Asanin tori Kathmandussa, jonne kuusi katua yhtyy. Torilla '
          + 'myydään mausteita, kankaita ja elektroniikkaa, ja aukion läpi '
          + 'kulki vanha Intian ja Tiibetin välinen kauppareitti.',
      },
      {
        tiedosto: 'Asan Bazaar woman selling vegetables in front of Jwalamai temple Kathmandu Nepal 20Apr2008.jpg',
        vuosi: '2008',
        lahde: 'Everhard van Eimeren, Commons (CC BY-SA 4.0)',
        selite: 'Vihanneksia myyvä nainen Jwala Main temppelin edustalla Asanin '
          + 'torilla. Kauppapaikka ja pyhäkkö ovat samalla aukiolla, muutaman '
          + 'metrin päässä toisistaan.',
      },
      {
        tiedosto: 'Pilgrims at Boudhanath 02.jpg',
        vuosi: '2018',
        lahde: 'Bernard Gagnon, Commons (CC BY-SA 4.0)',
        selite: 'Pyhiinvaeltajia Boudhanathin stupalla Kathmandun laidalla. Stupa '
          + 'nousee vanhan Tiibetistä laaksoon laskeutuvan kauppareitin '
          + 'varrella, ja se on ollut pysähdyspaikka kauppiaille yhtä lailla '
          + 'kuin pyhiinvaeltajille.',
      },
    ],
    uusi: {
      tiedosto: 'Kathmandu Durbar Square (17830895562).jpg',
      vuosi: '2014',
      lahde: 'Jorge Láscar, Commons (CC BY 2.0)',
      selite: 'Kathmandun Durbar-aukio, sama palatsin edusta kuin vanhassa '
        + 'kuvassa. Durbar-aukioita on laaksossa kolme, yksi kutakin ennen '
        + 'valtakunnan yhdistämistä ollutta newar-kuningaskuntaa kohti; kuva '
        + 'on otettu vuotta ennen vuoden 2015 maanjäristystä.',
    },
  },
  kolkata: {
    tiedosto: 'Calcutta. Hughlee boats LCCN2017658184.jpg',
    vuosi: '1890-luku',
    lahde: 'Photoglob Co. / Library of Congress (PD)',
    selite: 'Hooghly-joen veneitä Kalkutassa 1890-luvulla, käsinväritetty '
      + 'photochrom-vedos. Kaupunki syntyi juuri tämän joen varteen: Hooghly '
      + 'on Gangesin haara, jota pitkin merilaivat pääsivät sisämaahan.',
    lisat: [
      {
        tiedosto: 'Mallick Ghat Flower Market, Kolkata 03.jpg',
        vuosi: '2013',
        lahde: 'Bernard Gagnon, Commons (CC BY-SA 3.0)',
        selite: 'Mallick Ghatin kukkatori Hooghlyn rannassa Howrahin sillan '
          + 'kupeessa. Kukat myydään täällä tukuittain, ja suuri osa niistä '
          + 'sidotaan seppeleiksi temppeleitä varten.',
      },
      {
        tiedosto: 'Making of Durga Idol in Kumartuli, Kolkata.jpg',
        vuosi: '2015',
        lahde: 'Debnathsonu1996, Commons (CC BY-SA 4.0)',
        selite: 'Durga-jumalattaren kuvan valmistusta Kumartulissa. Kaupunginosan '
          + 'savenvalajat tekevät joka syksy tuhansia kuvia Durga Puja '
          + '-juhlaan, ja juhlan päätteeksi ne lasketaan jokeen.',
      },
      {
        tiedosto: 'Tram in Kolkata 1191.jpg',
        vuosi: '2011',
        lahde: 'Rameshng, Commons (CC BY-SA 3.0)',
        selite: 'Raitiovaunu Kolkatan kadulla. Kaupungin raitiotie on Intian '
          + 'ainoa yhä liikennöivä, ja se aloitti hevosvetoisena jo '
          + '1800-luvulla.',
      },
    ],
    uusi: {
      tiedosto: 'A view of howrah bridge by boat.jpg',
      vuosi: '2017',
      lahde: 'Sanjukta19, Commons (CC BY-SA 4.0)',
      selite: 'Howrahin silta veneestä nähtynä samalla joella kuin vanhassa '
        + 'kuvassa. Silta valmistui 1943, ja se ylittää Hooghlyn ilman '
        + 'ainuttakaan jokeen upotettua tukea.',
    },
  },
  manila: {
    tiedosto: 'Escolta, Manila, P. I. LCCN2013646443.jpg',
    vuosi: '1910',
    lahde: 'Library of Congress (PD)',
    selite: 'Escolta-katu Manilassa 1910. Katu oli kaupungin tärkein liikekatu, '
      + 'jonka varrelle kerääntyivät suuret kaupat, pankit ja ensimmäiset '
      + 'tavaratalot.',
    lisat: [
      {
        tiedosto: 'Jeepney, Muralla Street, 2018 (02).jpg',
        vuosi: '2018',
        lahde: 'Bahnfrend, Commons (CC BY-SA 4.0)',
        selite: 'Jeepneyt Muralla-kadulla Intramurosissa, taustalla vanha '
          + 'tullirakennus Aduana. Jeepney on Filippiinien yleisin '
          + 'joukkoliikenteen väline, ja jokainen auto maalataan ja '
          + 'koristellaan omistajansa maun mukaan.',
      },
      {
        tiedosto: 'Tondo Binondo Soler Recto Avenue Divisoria District 27.jpg',
        vuosi: '2022',
        lahde: 'SwarmCheng, Commons (CC BY-SA 4.0)',
        selite: 'Azcarragan kangastori C. M. Recto Avenuen varrella Divisorian '
          + 'alueella. Divisoria on Manilan tukkukaupan keskus, jossa kangas '
          + 'myydään metreittäin ja hinnasta tingitään.',
      },
      {
        tiedosto: 'Museo de la iglesia de San Agustín, Manila, Filipinas, 2023-08-27, DD 82-84 HDR.jpg',
        vuosi: '2023',
        lahde: 'Diego Delso, Commons (CC BY-SA 4.0)',
        selite: 'San Agustínin kirkon sisäpiha Intramurosin muurikaupungissa. '
          + 'Kirkko valmistui 1607 ja on Filippiinien vanhin kivikirkko; se '
          + 'oli ainoa Intramurosin kirkoista, joka jäi pystyyn toisen '
          + 'maailmansodan lopun taisteluissa.',
      },
    ],
    uusi: {
      tiedosto: 'Escolta Street in Manila looking west from the Burke Street intersection with Burke Building to the right.jpg',
      lahde: 'Judgefloro, Commons (PD)',
      selite: 'Escolta tänään, kuvattuna Burke Streetin risteyksestä. '
        + 'Liike-elämän painopiste siirtyi muualle jo vuosikymmeniä sitten, '
        + 'mutta vanhat liiketalot kuten Regina Building ja First United '
        + 'Building seisovat yhä paikoillaan.',
    },
  },
  mumbai: {
    tiedosto: 'Bombay. Harbour with arriving mail. LCCN2017658173.jpg',
    vuosi: '1890-luku',
    lahde: 'Photoglob Co. / Library of Congress (PD)',
    selite: 'Bombayn satama ja saapuva postilaiva 1890-luvulla, käsinväritetty '
      + 'photochrom-vedos. Suezin kanavan avaamisen jälkeen Bombay oli '
      + 'Euroopasta tulevien laivojen ensimmäinen intialainen satama, ja '
      + 'posti saapui maahan tätä kautta.',
    lisat: [
      {
        tiedosto: 'Dhobi ghat Mumbai.jpg',
        vuosi: '2012',
        lahde: 'Siddhartha Kandoi, Commons (CC BY-SA 3.0)',
        selite: 'Dhobit eli pyykinpesijät työssään Mahalaxmin dhobi ghatilla. '
          + 'Pyykki tuodaan tänne ympäri kaupunkia, pestään käsin '
          + 'betonialtaissa ja palautetaan takaisin omistajilleen.',
      },
      {
        tiedosto: 'Dabbawala, Mumbai, India (52822285094).jpg',
        vuosi: '2023',
        lahde: 'Ninara, Commons (CC BY 2.0)',
        selite: 'Dabbawala kuljettaa lounasrasioita Mumbaissa. Lämmin ruoka '
          + 'haetaan kodeista ja ruokaloista aamupäivällä, viedään '
          + 'työpaikoille ja tyhjät rasiat palautetaan samaa reittiä '
          + 'iltapäivällä.',
      },
      {
        tiedosto: '\'Fish Auction\' at Sassoon Docks in Mumbai..JPG',
        vuosi: '2011',
        lahde: 'Rudolph.A.furtado, Commons (CC0)',
        selite: 'Kalahuutokauppa Sassoon Docksilla. Yön saalis puretaan '
          + 'laiturille aamulla ja myydään heti paikan päällä; allas on '
          + 'kaupungin vanhin ja valmistui 1870-luvulla.',
      },
    ],
    uusi: {
      tiedosto: 'The boats,Gateway of India,mumbai,TN558.JPG',
      vuosi: '2011',
      lahde: 'தகவலுழவன், Commons (CC BY-SA 3.0)',
      selite: 'Veneitä Gateway of Indian edustalla nykyään. Kaari valmistui 1924 '
        + 'kuninkaan vierailun muistoksi juuri siihen kohtaan rantaa, jossa '
        + 'laivalla saapuneet nousivat maihin.',
    },
  },
  peking: {
    tiedosto: 'Peking - inside view of gateway leading toward the Emperor\'s Palace LCCN2004707954.jpg',
    vuosi: '1895',
    lahde: 'Library of Congress (PD)',
    selite: 'Portti keisarin palatsin suuntaan Pekingissä vuonna 1895. William '
      + 'Henry Jackson kiersi maailmaa World\'s Transportation Commissionin '
      + 'valokuvaajana, ja tämä on käsinväritetty lyhtykuvalevy hänen '
      + 'kokoelmastaan.',
    lisat: [
      {
        tiedosto: 'Beijing hutong Shuaifu yuan.jpg',
        vuosi: '2023',
        lahde: 'Andrzej Otrębski, Commons (CC BY-SA 4.0)',
        selite: 'Shuaifuyuanin hutong-kuja Pekingissä. Hutongit ovat vanhan '
          + 'kaupungin kapeita kujia, joiden varrella asutaan muurien '
          + 'ympäröimissä pihataloissa; suuri osa niistä on purettu, ja '
          + 'jäljellä olevia on suojeltu.',
      },
      {
        tiedosto: 'Pekin Duck IMG 4256 beijing roast duck.jpg',
        vuosi: '2017',
        lahde: 'Bjoertvedt, Commons (CC BY-SA 4.0)',
        selite: 'Pekinginankkaa leikataan siivuiksi ravintolassa Pekingin '
          + 'pohjoisosassa. Kokonaisena paahdetun linnun rapea nahka on '
          + 'ruokalajin arvostetuin osa, ja se leikataan omaksi annoksekseen.',
      },
      {
        tiedosto: 'Temple of Heaven, Beijing - February 2024.jpg',
        vuosi: '2024',
        lahde: 'Lloyd Tudor, Commons (CC BY-SA 4.0)',
        selite: 'Taivaan temppeli Pekingin eteläpuolella. Ming- ja Qing-kausien '
          + 'keisarit tulivat tänne vuosittain toimittamaan uhrin hyvän sadon '
          + 'puolesta, ja koko laaja temppelialue oli rakennettu tuota yhtä '
          + 'menoa varten.',
      },
    ],
    uusi: {
      tiedosto: 'Hall of Supreme Harmony, Forbidden City, from southeast.jpg',
      lahde: 'Daniel Case, Wikimedia Commons (CC BY-SA 3.0)',
      selite: 'Kielletyn kaupungin suurin rakennus, Ylimmän sopusoinnun sali, '
        + 'kohoaa kolminkertaisen marmoriterassin päällä. Keisarillisen '
        + 'palatsin punaiset seinät ja keltatiiliset katot erottuvat laajan '
        + 'kivetyn pihan takana.',
    },
  },
  shanghai: {
    tiedosto: 'Lai Afong, The Bund, Shanghai, c1870.jpg',
    vuosi: '1870-luku',
    lahde: 'Lai Afong, Commons (PD)',
    selite: 'Bundin rantakatu Shanghaissa 1870-luvulla. Kuvan otti Lai Afong, '
      + '1800-luvun tunnetuin kiinalainen valokuvaaja, joka piti studiota '
      + 'Hongkongissa ja matkusti kuvaamassa pitkin rannikkoa.',
    lisat: [
      {
        tiedosto: 'Yu Garden Shanghai November 2017 001.jpg',
        vuosi: '2017',
        lahde: 'King of Hearts, Commons (CC BY-SA 4.0)',
        selite: 'Hu Xin Tingin teehuone Yun puutarhan laidalla. Rakennus seisoo '
          + 'lammen päällä, ja sinne johtaa mutkitteleva silta — '
          + 'kiinalaisessa puutarhataiteessa polku käännetään tarkoituksella, '
          + 'jotta näkymä avautuisi kerrallaan vain osittain.',
      },
      {
        tiedosto: 'More barges on the Huangpu Wharf (35607232474).jpg',
        vuosi: '2017',
        lahde: 'shankar s., Commons (CC BY 2.0)',
        selite: 'Rahtiproomuja Huangpu-joella. Joki on ollut Shanghain elinehto '
          + 'satamakaupunkina, ja se kuljettaa yhä tavaraa kaupungin ja '
          + 'Kiinan sisämaan välillä.',
      },
    ],
    uusi: {
      tiedosto: 'Shanghai The Bund (22219109059).jpg',
      lahde: 'Gary Todd, Commons (CC0)',
      selite: 'Sama rantakatu tänään. Siirtomaa-ajan pankki- ja kauppahuoneiden '
        + 'rivi seisoo yhä Huangpun rannassa; talot rakennettiin ulkomaisten '
        + 'yhtiöiden konttoreiksi, ja niissä toimii nyt kiinalaisia pankkeja, '
        + 'hotelleja ja museoita.',
    },
  },
  singapore: {
    tiedosto: 'Singapore. Collyer Quai LCCN2017657654.jpg',
    vuosi: '1890-luku',
    lahde: 'Library of Congress (PD)',
    selite: 'Collyer Quay Singaporessa — käsinväritetty photochrom-vedos, '
      + 'jollaisia myytiin matkailijoille jo isoisän aikaan. Vedokset '
      + 'painettiin sveitsiläisessä Photoglob-yhtiössä mustavalkoisista '
      + 'negatiiveista kivilaatoilla, väri kerrallaan.',
    lisat: [
      {
        tiedosto: 'Satay stall at East Coast Lagoon Food Village.jpg',
        vuosi: '2023',
        lahde: 'Commonsin käyttäjä PipeDr3am2000 (CC BY-SA 4.0)',
        selite: 'Satay-vartaita grillataan East Coast Lagoon Food Villagessa. '
          + 'Hawker centre on Singaporen tapa koota kadulla myyneet '
          + 'ruokakojut yhden katon alle; siirto alkoi 1970-luvulla eikä '
          + 'katumyyntiä juuri enää ole.',
      },
      {
        tiedosto: 'Singapore (SG), Tanjong Pagar Terminal -- 2019 -- 4728.jpg',
        vuosi: '2019',
        lahde: 'Dietmar Rabich, Commons (CC BY-SA 4.0)',
        selite: 'Tanjong Pagarin konttiterminaali kuvattuna Marina Bay Sandsin '
          + 'näköalatasanteelta. Singaporen satama on maailman vilkkaimpia '
          + 'jälleenlaivaussatamia: suuri osa konteista ei tule maihin vaan '
          + 'vaihtaa laivaa matkalla eteenpäin.',
      },
      {
        tiedosto: '2016 Singapur, Chinatown, Ulica South Bridge, Domy-sklepy (10).jpg',
        vuosi: '2016',
        lahde: 'Marcin Konsek, Commons (CC BY-SA 4.0)',
        selite: 'Kauppataloja South Bridge Roadin varrella Chinatownissa. '
          + 'Shophouse-talossa alakerta oli myymälä ja yläkerta asunto, ja '
          + 'julkisivun eteen jätettiin katettu jalkakäytävä suojaamaan '
          + 'sateelta ja auringolta.',
      },
    ],
    uusi: {
      tiedosto: 'Collyer-Quay-skyline-night-2017-Luka-Peternel.jpg',
      lahde: 'Luka Peternel, Commons (CC BY-SA 4.0)',
      selite: 'Sama rantakatu tänään, nähtynä Marina Bay Sandsilta. Meri ei enää '
        + 'huuhdo laiturin juurta: lahtea on täytetty niin paljon, että vanha '
        + 'rantakatu jäi keskelle kaupunkia.',
    },
  },
  soul: {
    tiedosto: 'South Korea, Great South Gate in Seoul.jpg',
    vuosi: 'noin 1884',
    lahde: 'George Clayton Foulk, Commons (PD)',
    selite: 'Namdaemun eli Suuri eteläportti Soulissa noin 1884. Portti oli '
      + 'kaupunginmuurin eteläinen pääsisäänkäynti. Kuvan otti '
      + 'yhdysvaltalainen meriupseeri George Clayton Foulk, joka oli tuolloin '
      + 'Koreassa.',
    lisat: [
      {
        tiedosto: 'Gwangjang Market.JPG',
        vuosi: '2013',
        lahde: 'ChongDae, Commons (CC BY-SA 3.0)',
        selite: 'Gwangjangin tori Soulin Jongnossa. Tori perustettiin '
          + 'kangaskaupaksi ja kangasta myydään siellä yhä, mutta tunnetuin '
          + 'se on ruokakujastaan, jossa syödään seisten kojun tiskin '
          + 'ääressä.',
      },
      {
        tiedosto: 'Korea GwangjangMarket Eats 02 (13885109655).jpg',
        vuosi: '2014',
        lahde: 'Korean kulttuuri- ja tiedotuspalvelu, Commons (CC BY-SA 2.0)',
        selite: 'Bindaetteokia paistetaan Gwangjangin torilla. Mungpavut '
          + 'liotetaan, jauhetaan karkeaksi tahnaksi ja paistetaan öljyssä '
          + 'paksuiksi letuiksi asiakkaan silmien edessä.',
      },
      {
        tiedosto: 'Bukchon-ro 11-gil street with hanok houses and blue sky in Bukchon Hanok Village Seoul.jpg',
        vuosi: '2024',
        lahde: 'Basile Morin, Commons (CC BY-SA 4.0)',
        selite: 'Bukchon-ro 11-gilin katu Bukchonin hanok-kylässä. Hanok on '
          + 'korealainen puutalo, jonka lattian alla kulkee '
          + 'ondol-lämmityskanava; Bukchonin rinnekortteleissa taloja on '
          + 'säilynyt tiiviinä ryhmänä keskellä nykykaupunkia.',
      },
    ],
    uusi: {
      tiedosto: 'Sungnyemun Gate, Seoul, 1394 (1) (26261755967).jpg',
      lahde: 'Richard Mortel, Commons (CC BY 2.0)',
      selite: 'Sama portti tänään, virallisella nimellään Sungnyemun. Puinen '
        + 'porttirakennus tuhoutui tuhopoltossa 2008 ja rakennettiin '
        + 'uudelleen vanhoin puusepäntekniikoin; portti avattiin taas '
        + 'yleisölle 2013.',
    },
  },
  sumatra: {
    tiedosto: 'Collectie NMvWereldculturen, RV-A106-1-11, Foto- \'Het Karbouwengat bij Fort de Kock aan Sumatra\'s westkust met op de achtergrond de Singkalang\', fotograaf C.B. Nieuwenhuis, ca. 1918.jpg',
    vuosi: 'noin 1918',
    lahde: 'C.B. Nieuwenhuis / Nationaal Museum van Wereldculturen, Commons (PD)',
    selite: 'Karbouwengat eli puhvelinrotko Fort de Kockin laidalla Sumatran '
      + 'länsirannikolla, taustalla Singgalangin vuori. Kaupunki sai nimensä '
      + 'hollantilaisesta linnoituksesta, ja se tunnetaan nykyään nimellä '
      + 'Bukittinggi.',
    lisat: [
      {
        tiedosto: 'Rumah Gadang dan Rangkiang.jpg',
        vuosi: '2021',
        lahde: 'Hermadiyansyah Putra St Bagindo, Commons (CC BY-SA 4.0)',
        selite: 'Minangkabau-suvun talo eli rumah gadang ja sen edessä '
          + 'riisiaitat, rangkiang. Aittoja on useaa lajia sen mukaan, mihin '
          + 'sato on aiottu: yhdestä otetaan myytävä vilja, toisesta talon '
          + 'oma ruoka.',
      },
      {
        tiedosto: 'Lake Toba and the surrounding hills.jpg',
        vuosi: '2019',
        lahde: 'Bisajunisa, Commons (CC BY-SA 4.0)',
        selite: 'Toba-järvi Pohjois-Sumatralla, kuvattuna Telestä Samosirin '
          + 'saaren puolelta. Järvi täyttää valtavan tulivuorenpurkauksen '
          + 'jättämän kraatterin, ja sen rannat jakautuvat seitsemän '
          + 'maakunnan kesken.',
      },
      {
        tiedosto: 'Nasi bungkus opened.JPG',
        vuosi: '2008',
        lahde: 'Midori, Commons (CC BY-SA 3.0)',
        selite: 'Nasi padang mukaan pakattuna: riisiä, kanacurrya ja keitettyjä '
          + 'kassavanlehtiä. Padangin keittiö on lähtöisin juuri Sumatran '
          + 'länsirannikolta, ja sen ruokapaikkoja on nykyään kaikkialla '
          + 'Indonesiassa.',
      },
    ],
    uusi: {
      tiedosto: 'Ngarai Sianok Bukittinggi.jpg',
      vuosi: '2022',
      lahde: 'Adhmi, Commons (CC BY-SA 4.0)',
      selite: 'Sama rotko nykyään. Ngarai Sianok on kapea laakso jyrkkien '
        + 'rinteiden välissä Bukittinggin kupeessa, ja taustalla kohoaa yhä '
        + 'sama Singgalangin vuori.',
    },
  },
  taipei: {
    tiedosto: 'Pond before the Banka Longshan Temple.jpg',
    vuosi: '1800- ja 1900-lukujen vaihde',
    lahde: 'Tuntematon kuvaaja, Commons (PD)',
    selite: 'Lampi Bangkan Longshan-temppelin edessä. Temppeli rakennettiin 1738 '
      + 'Fujianista tulleiden uudisasukkaiden kauppapaikan viereen, ja se '
      + 'toimi pitkään koko kaupunginosan kokoontumis- ja '
      + 'riidanratkaisupaikkana.',
    lisat: [
      {
        tiedosto: '2017-07-02 Raohe Street Night Market.jpg',
        vuosi: '2017',
        lahde: 'Felix Filnkoessl, Commons (CC BY-SA 2.0)',
        selite: 'Raohe-kadun yömarkkinat Songshanin kaupunginosassa. Yömarkkinat '
          + 'ovat Taipeissa arkinen ruokapaikka: kojut asettuvat illansuussa '
          + 'kadulle, joka on päivällä tavallinen kulkuväylä.',
      },
      {
        tiedosto: 'Buildings along Dihua Street 07.23 (2).jpg',
        vuosi: '2023',
        lahde: 'Supanut Arunoprayote, Commons (CC BY 4.0)',
        selite: 'Kauppataloja Dihua-kadun varrella Datongin kaupunginosassa. '
          + 'Julkisivuissa yhdistyvät barokkikoristelu ja eteläisen Fujianin '
          + 'rakennustapa. Katu on vanha kuivatun tavaran, yrttien ja teen '
          + 'kauppapaikka, ja samoja tuotteita myydään siellä yhä.',
      },
      {
        tiedosto: '202606 Guan Da Chang Bao Xiao Chang.jpg',
        vuosi: '2026',
        lahde: 'Junyu-K, Commons (CC BY-SA 4.0)',
        selite: 'Da chang bao xiao chang eli iso makkara pikkumakkaran ympärillä: '
          + 'tahmeasta riisistä tehty makkara halkaistaan ja sen väliin '
          + 'pannaan sianlihamakkara. Kojun edessä jonotetaan Shilinin '
          + 'yömarkkinoilla.',
      },
    ],
    uusi: {
      tiedosto: 'Taipei Taiwan Mengjia-Longshan-Temple-06.jpg',
      lahde: 'CEphoto, Uwe Aranas, Commons (CC BY-SA 3.0)',
      selite: 'Longshan-temppelin portti nykyään. Temppeli on rakennettu '
        + 'uudelleen useaan otteeseen tulipalojen, maanjäristysten ja toisen '
        + 'maailmansodan pommitusten jälkeen, ja se on yhä päivittäisessä '
        + 'käytössä.',
    },
  },
  tokio: {
    tiedosto: 'De Nijûbashi-brug bij het Edo-kasteel van Tokyo Nijûbashi (titel op object), RP-F-F01177-AC.jpg',
    vuosi: '1870–1900',
    lahde: 'Rijksmuseum, Commons (CC0)',
    selite: 'Nijūbashin silta Edon linnan vallihaudan yli, kuvattuna 1800-luvun '
      + 'jälkipuoliskolla. Linnasta tuli keisarin palatsi, kun hovi siirtyi '
      + 'Kiotosta tänne 1868 ja Edon nimi vaihtui Tokioksi. Vedos on osa '
      + 'hollantilaista matka-albumia, johon oli koottu kolmisenkymmentä '
      + 'näkymää Japanista.',
    lisat: [
      {
        tiedosto: 'Tsukiji Market.jpg',
        vuosi: '2013',
        lahde: 'ElHeineken, Commons (CC BY 4.0)',
        selite: 'Tsukijin kalatorin halli Tokiossa. Tukkukauppa siirtyi täältä '
          + 'Toyosun uuteen halliin 2018, mutta torin ulkokujien kaupat ja '
          + 'ruokapaikat jäivät paikoilleen.',
      },
      {
        tiedosto: 'Mosuke Dango.jpg',
        vuosi: '2026',
        lahde: 'Fred Cherrygarden, Commons (CC BY-SA 4.0)',
        selite: 'Mosuke Dango, japanilaisia riisimakeisia myyvä liike Toyosun '
          + 'torilla. Kauppa perustettiin Nihonbashiin 1898, ja se on nyt '
          + 'kalatorin mukana Toyosussa.',
      },
      {
        tiedosto: 'Shibuya Crossing 20241020.jpg',
        vuosi: '2024',
        lahde: 'Supanut Arunoprayote, Commons (CC BY 4.0)',
        selite: 'Shibuyan risteys Tokiossa. Valot pysäyttävät autot kaikista '
          + 'suunnista yhtä aikaa, jolloin jalankulkijat ylittävät aukion '
          + 'myös vinottain; risteys on Shibuyan aseman Hachikō-uloskäynnin '
          + 'edessä.',
      },
    ],
    uusi: {
      tiedosto: 'Nijubashi Bridge. Tokyo. (42521677522).jpg',
      lahde: 'Bernard Spragg, Commons (PD)',
      selite: 'Sama silta nykyään. Nimi Nijūbashi tarkoittaa kaksoissiltaa ja '
        + 'tulee siitä, että paikalla oli aikoinaan kaksitasoinen puusilta. '
        + 'Silta yhdistää palatsin edustan aukion vallihaudan yli keisarin '
        + 'asuinalueelle.',
    },
  },
  xian: {
    tiedosto: '西安府安远门.jpg',
    vuosi: '1906–1909',
    lahde: 'Ernst Boerschmann, Commons (PD)',
    selite: 'Anyuanmen, Xi\'anin kaupunginmuurin pohjoinen portti, kuvattuna '
      + 'vuosien 1906 ja 1909 välillä. Saksalainen arkkitehti Ernst '
      + 'Boerschmann kiersi noina vuosina kahtatoista Kiinan maakuntaa '
      + 'mittaamassa ja valokuvaamassa rakennuksia kirjaansa varten.',
    lisat: [
      {
        tiedosto: 'Beiyuanmen.jpg',
        vuosi: '2024',
        lahde: 'Codas, Commons (CC BY-SA 4.0)',
        selite: 'Beiyuanmenin katu Xi\'anin muslimikorttelissa. Korttelin asukkaat '
          + 'ovat pääosin huita eli kiinankielisiä muslimeja, joiden yhteisö '
          + 'on ollut kaupungissa satoja vuosia Silkkitien kauppareitin '
          + 'varrella.',
      },
      {
        tiedosto: '普通腊汁肉夹馍 02.jpg',
        vuosi: '2021',
        lahde: 'Liuxingy, Commons (CC BY-SA 4.0)',
        selite: 'Roujiamo: pitkään haudutettua lihaa hakattuna vastapaistetun '
          + 'litteän sämpylän väliin. Annos on Shaanxin maakunnan '
          + 'tunnetuimpia katuruokia, ja tämä on ostettu Xi\'anista.',
      },
      {
        tiedosto: 'Teracotta army pit 1 20090717-02.JPG',
        vuosi: '2009',
        lahde: 'Hans A. Rosbach, Commons (CC BY-SA 3.0)',
        selite: 'Terrakotta-armeijan sotilaita kaivannossa numero yksi Xi\'anin '
          + 'liepeillä. Savihahmot haudattiin ensimmäisen keisarin Qin Shi '
          + 'Huangin hautakummun lähelle, ja ne löytyivät vasta 1974, kun '
          + 'paikalliset talonpojat kaivoivat kaivoa.',
      },
    ],
    uusi: {
      tiedosto: 'Xi\'an City Wall South Gate (9912144783).jpg',
      lahde: 'Gary Todd, Commons (CC0)',
      selite: 'Xi\'anin kaupunginmuurin eteläportti nykyään. Ming-kaudella '
        + 'rakennettu muuri kiertää vanhan keskustan runsaan kolmentoista '
        + 'kilometrin kehänä, ja sen leveällä harjalla kuljetaan jalan ja '
        + 'polkupyörällä.',
    },
  },
  yangon: {
    tiedosto: 'Fytche Square, Rangoon.jpg',
    vuosi: '1895',
    lahde: 'Philip Adolphe Klier, Commons (PD)',
    selite: 'Fytche Square Rangoonissa 1895, taustalla Sulen pagodi. Aukio '
      + 'raivattiin 1867–68 suoperäiselle tontille, jota kutsuttiin Tank '
      + 'Squareksi, ja se nimettiin kuvernööri Fytchen mukaan. Nykyään paikka '
      + 'tunnetaan nimellä Mahabandulan puisto.',
    lisat: [
      {
        tiedosto: 'Street food vendor in Yangon.jpg',
        vuosi: '2016',
        lahde: 'Commonsin käyttäjä Z3144228 (CC BY-SA 4.0)',
        selite: 'Katuruokamyyjä Yangonissa. Kaupungin kojuilta saa sekä '
          + 'burmalaista että intialais- ja kiinalaisperäistä ruokaa: Rangoon '
          + 'oli sata vuotta sitten Brittiläisen Intian satamakaupunki, jonne '
          + 'muutettiin työn perässä kaukaakin.',
      },
      {
        tiedosto: 'YANGON CIRCULAR RAILWAY DURATION 3 HOURS YANGON MYANMA JAN 2013 (8528276396).jpg',
        vuosi: '2013',
        lahde: 'Commonsin käyttäjä calflier001 (CC BY-SA 2.0)',
        selite: 'Yangonin kehärata. Juna kiertää kaupungin ja sen laitakylät noin '
          + 'kolmessa tunnissa, ja moni matkustaja kuljettaa sillä tavaraa '
          + 'torille myytäväksi.',
      },
      {
        tiedosto: 'Shwedagon Zedi Daw Yangon 4.jpg',
        vuosi: '2019',
        lahde: 'Commonsin käyttäjä kallerna (CC BY-SA 4.0)',
        selite: 'Shwedagonin pagodi kohoaa kukkulalta Yangonin yllä. Stupan pinta '
          + 'on päällystetty kullalla, jota uskovaiset lahjoittavat lehtinä '
          + 'ja levyinä; huipun paikka näkyy kaupungin joka puolelle.',
      },
    ],
    uusi: {
      tiedosto: 'Sule Pagoda.jpg',
      lahde: 'Commonsin käyttäjä Mrsoethuaung (CC BY 4.0)',
      selite: 'Sulen pagodi nykyään, kuvattuna Sakura Towerista. Kun britit '
        + 'kaavoittivat Rangoonin ruutukaduiksi, pagodia ei siirretty vaan '
        + 'kadut vedettiin sen ympäri — niin se jäi keskelle liikenneympyrää.',
    },
  },
};
