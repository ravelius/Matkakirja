/*
 * MAASTOKOHTEET — ETH. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs ETH --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/ETH.json. Työkalu laskee laudan
 * projektiot (maailmankartta = Millerin lieriö, europe = tasaväli),
 * jättää pois laudan, jonka kaavan ulkopuolelle kohde jää, ja
 * tarkistaa että jokainen kohde osuu maan fokuslehden rajaukseen —
 * ikkunan ulkopuolinen merkki olisi olemassa mutta pelaajan
 * ulottumattomissa. Faktat on tarkistettu en-Wikipediasta lähde
 * kerrallaan, ja jokaisen kohteen `lahde`-rivi kertoo mistä artikkelin
 * osasta se on.
 *
 * Maa on YLEISELLÄ reitillä: lehdellä ei ole poltettuja
 * maastonimiä lainkaan, joten merkin nimiö on maastonimen ainoa
 * esiintymä kartalla. Kaksoisnimen vaaraa ei siis ole.
 *
 * Lista yhdistyy maan muihin kohteisiin js/packs/maastokohteet.js
 * -hakemiston kautta (js/fokuskohteet.js KOHDE_MAAT), joten maan
 * mahdollista olemassa olevaa fokuskohteet-pakkia EI ole tarvinnut
 * koskea eikä yhtään sen kohdetta ole toistettu täällä.
 *
 * Etiopian maastokohteet. Faktat en-Wikipediasta 30.8.2026. Etiopia on sisämaavaltio, joten meren paikalla on maan suurin järvi Tanajärvi. Nimet fi-Wikipedian mukaan: Ras Dejen, Tanajärvi, Sininen-Niili.
 *
 * MAAILMAN ERÄ M11 (6.9.2026) lisäsi listaan kahdeksan KOHDETTA —
 * Aksum, Fasil Ghebbi, Harar, Tiya, Debre Damo, Danakilin syvänne,
 * Hadar ja Balen vuorten kansallispuisto. Lähin uusi merkki on Tiya
 * 20,6 lautayksikön päässä Addis Abebasta (KAUPUNGIN_KOHDALLA_SADE 7),
 * joten kaikki kahdeksan ovat pääkartan merkkejä. Erä on kuvaton, ja
 * jokaisen kohteen lähin pelikaupunki on kirjattu sen
 * koordinaattirivin viereen.
 */
export const MAASTOKOHTEET_ETH = [
  {
    id: 'rasdejen',
    nimi: 'Ras Dejen',
    tyyppi: 'vuori',
    kysymykset: [
      'Mitä nimi Ras Dejen tarkoittaa?',
      'Millaisia eläimiä Simien-vuorilla elää?',
    ],
    korostukset: ['Simien-vuoret|Simien-vuorten'],
    nappi: 'Etiopian katto',
    // 38.3708 E / 13.2358 N — en-Wikipedia "Ras Dashen"
    laudat: {
      maailmankartta: { x: 7112.4, y: 2767.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Etiopian korkein vuori on nimetty sotilaan mukaan: ras dejen tarkoittaa päällikköä, '
      + 'joka taistelee keisarin edellä, ja englanninkielinen asu Ras Dashen on väännös siitä. '
      + 'Huippu on 4 550 metriä ja itse asiassa vain valtavan tulivuoren kraatterinreunan '
      + 'itäinen kulma — reunan länsipäässä on Biuat 4 437 metrissä, ja niiden välissä virtaa '
      + 'Meshaha. Runsaat kaksisataa metriä huippua alempana seisoo yhä pienen linnoituksen '
      + 'raunio. Öisin sataa lunta rajusti, mutta päivällä lämpötila voi nousta yli viiden '
      + 'asteen ja lumi sulaa tunneissa. Ensimmäisen tunnetun eurooppalaisen nousun tekivät '
      + '1841 ranskalaisupseerit Ferret ja Galinier. Simien-vuorten kansallispuisto ympärillä '
      + 'on maailmanperintökohde ja yksi harvoja trooppisen Afrikan paikkoja, joissa sataa '
      + 'säännöllisesti lunta.',
    lahde: 'en-Wikipedia "Ras Dashen", johdanto-osa ja osio "Overview", sekä en-Wikipedia "Simien '
      + 'Mountains" (tarkistettu 1.9.2026).',
  },
  {
    id: 'tanajarvi',
    nimi: 'Tanajärvi',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi näin suuri järvi on vain 15 metriä syvä?',
      'Mitä Tis Abbain putouksilla tapahtuu?',
    ],
    nappi: 'Sinisen-Niilin lähde',
    // 37.25 E / 12 N — en-Wikipedia "Lake Tana" (37,25 / 12)
    laudat: {
      maailmankartta: { x: 7075, y: 2809.6 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Tanajärvi on Etiopian suurin järvi ja Sinisen-Niilin lähde. Se lepää 1 788 metrin '
      + 'korkeudessa Etiopian ylängöllä: pituutta on noin 84 ja leveyttä 66 kilometriä, mutta '
      + 'syvyyttä enimmilläänkin vain 15 metriä, ja pinta-ala vaihtelee sateiden mukaan 3 000 '
      + 'ja 3 500 neliökilometrin välillä. Järven laskukohdasta vesi syöksyy Sinisen-Niilin '
      + 'putouksille, joita paikalliset kutsuvat nimellä Tis Abbai.',
    lahde: 'en-Wikipedia "Lake Tana", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'sininenniili',
    nimi: 'Sininen-Niili',
    tyyppi: 'joki',
    kysymykset: [
      'Kumpi on tärkeämpi, Valkoinen vai Sininen Niili?',
      'Mikä Tana-järvi on?',
    ],
    korostukset: ['Tana-järvi|Tana-järveen'],
    nappi: 'Joki, joka tuo Niilin veden',
    // 36.5 E / 10.5 N — joen kanjoni Etiopian ylängöllä Tanajärven lounaispuolella; en-Wikipedia "Blue Nile" antaa koordinaatiksi Tanajärven 37,25 / 12
    laudat: {
      maailmankartta: { x: 7050, y: 2860.2 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Sadekaudella 85,6 prosenttia Niilin vedestä tulee yhdestä joesta, eikä se ole '
      + 'Valkoinen Niili. Sininen Niili — Etiopiassa Abay — pulppuaa Gish Abayn lähteeltä ja '
      + 'laskee Tana-järveen, ja kolmenkymmenen kilometrin päässä järvestä se katoaa kanjoniin, '
      + 'joka on neljäsataa kilometriä pitkä ja paikoin puolentoista kilometrin syvyinen. Rotko '
      + 'on niin jyrkkä, että se on vuosisatoja katkaissut kulun Pohjois- ja Etelä-Etiopian '
      + 'väliltä. Ensimmäinen laskeutuminen järveltä kanjonin päähän onnistui vasta 1968 '
      + 'brittiretkikunnalta, joka antoi sille nimen Niilin Grand Canyon. Kanjonin suulla ovat '
      + 'Sinisen Niilin putoukset, amharaksi Tis Abay — suuri savu.',
    lahde: 'en-Wikipedia "Blue Nile", johdanto-osa sekä osio "Course" alaosioineen (tarkistettu '
      + '1.9.2026).',
  },

  /* ==============================================================
   * MAAILMAN ERÄ M11, AFRIKKA 6.9.2026 — KAHDEKSAN KOHDETTA.
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko
   * maailmaan."* Etiopialla oli kolme maastokohdetta ja nolla
   * kohdetta (docs/moduulit/karttanostot-kattavuus.md, Afrikka).
   * Kaikki kahdeksan ovat pääkartan merkkejä: etäisyys mitattiin
   * jokaiseen js/packs/maailmankartta.js CITIES-kaupunkiin, ja lähin
   * uusi merkki on Tiya 20,6 lautayksikön päässä Addis Abebasta
   * (raja KAUPUNGIN_KOHDALLA_SADE on 7, js/fokuskohteet.js).
   * Kuvaton erä; faktat en-Wikipedian raakatekstistä 6.9.2026, ja
   * jokainen `lahde`-rivi kertoo artikkelin osan. Konso jätettiin
   * pois erän ainoana hylättynä ehdokkaana: sen artikkelin oma osio
   * "Conflict since 1990" kertoo yhä käynnissä olevasta
   * väkivallasta, ja M3:n Myanmar-linja jättää sellaiset pois.
   * ============================================================== */
  {
    id: 'aksum',
    nimi: 'Aksum',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä varten Aksumin steelat pystytettiin?',
      'Miksi kaupunki hiljeni 800-luvulla?',
    ],
    korostukset: ['steela|steelat'],
    nappi: 'Steelojen kaupunki',
    // 38.7278 E / 14.1208 N — en-Wikipedia "Axum"
    // Lähin pelikaupunki: Lalibela 71,7 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7124.3, y: 2737.7 },
    },
    teksti: 'Aksum oli Aksumin valtakunnan pääkaupunki, ja jo 100-luvun purjehdusoppaassa '
      + 'Periplus of the Erythraean Sea sitä sanottiin suurkaupungiksi. Sen tunnus ovat '
      + 'steelat: graniittipaadet, jotka merkitsivät hautakammioita ja joihin veistettiin '
      + 'valeovia ja valeikkunoita kuin monikerroksiseen taloon. Suurin niistä, 33-metrinen '
      + 'Suuri steela, kaatui todennäköisesti jo pystytettäessä. Kaupungin kirkko Mariam '
      + 'Seyon on Etiopian vanhin, ja perinne kertoo sen kappelissa säilytettävän liitonarkkia; '
      + 'keisarit kruunattiin siellä katkaisemalla naru, jota "Aksumin tyttäret" pitivät. '
      + 'Yhteydet Bysanttiin katkesivat, kaupunki köyhtyi, ja 800-luvun lopulla se oli jo '
      + 'suurelta osin hylätty ja raunioina. Unesco otti Aksumin maailmanperintöluetteloon '
      + '1980. Brittiläinen Augustus Wylde kertoi 1897, että jokaisen rankkasateen jälkeen '
      + 'maasta huuhtoutui esiin vanhoja kolikoita.',
    lahde: 'en-Wikipedia "Axum", johdanto-osa sekä osiot "History" ("Ancient", "Medieval", '
      + '"19th century") ja "Main sites of Axum" (tarkistettu 6.9.2026).',
  },
  {
    id: 'fasilghebbi',
    nimi: 'Fasil Ghebbi',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä sana ghebbi tarkoittaa?',
      'Miksi Gondar oli poikkeus Etiopian keisarien tavoissa?',
    ],
    korostukset: ['Gondar|Gondarin'],
    nappi: 'Keisarien linnapiha',
    // 37.47 E / 12.6075 N — en-Wikipedia "Fasil Ghebbi"
    // Lähin pelikaupunki: Lalibela 55,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7082.3, y: 2789.1 },
    },
    teksti: 'Etiopian keisarit kiersivät vuosisatoja valtakuntaansa teltoissa ja söivät sen, '
      + 'mitä talonpojat kulloinkin tuottivat. Fasilides katkaisi tavan: hän perusti Gondarin '
      + 'pääkaupungikseen ja rakennutti sinne 1645 linnan, jonka ympärille seuraajat Yohannes '
      + 'I, Iyasu I ja Dawit III lisäsivät omansa. Amharan kielessä ghebbi tarkoittaa piha- tai '
      + 'aitausaluetta, ja tämä on 900 metrin muuri, jossa on kaksitoista porttia — muun muassa '
      + 'Tuomarien portti, Kehrääjien portti ja Kyyhkysten portti. Jemeniläinen lähettiläs '
      + 'Hassan ibn Ahmad al-Haymi kävi paikalla 1648 ja kertoi rakennusmestarin olleen '
      + 'intialainen Abdal Kerim; muuraus- ja puutyöt teki pitkälti Beta Israelin Kayla-suku. '
      + 'Armenialainen Khoja Murad laski 1696, että palatsissa juoksenteli ainakin '
      + 'kahdeksankymmentä kuninkaallista lasta. Unescon maailmanperintökohde 1979.',
    lahde: 'en-Wikipedia "Fasil Ghebbi", johdanto-osa sekä osiot "History" ja "Description" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'harar',
    nimi: 'Harar',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Miksi Hararin ympärille rakennettiin muuri?',
      'Kuka runoilija asui Hararissa kauppiaana?',
    ],
    korostukset: ['muuri|muurien'],
    nappi: 'Muurikaupunki ja 82 moskeijaa',
    // 42.1278 E / 9.3111 N — en-Wikipedia "Harar"
    // Lähin pelikaupunki: Addis Abeba 113,8 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7237.6, y: 2900.2 },
    },
    teksti: 'Harar on muurien ympäröimä kaupunki Itä-Etiopian ylängöllä, ja Unescon mukaan sitä '
      + '"pidetään islamin neljäntenä pyhänä kaupunkina": muurien sisällä on 82 moskeijaa, '
      + 'joista kolme on 900-luvulta, ja 102 pyhäkköä. Muurin rakennutti emiiri Nur ibn '
      + 'Mujahid 1500-luvulla oromoiden hyökkäysten jälkeen, ja se toimi. Kaupungilla oli oma '
      + 'kieli ja oma raha, ja se löi omia kolikoitaan viimeistään 1789. Richard Francis Burton '
      + 'kuvasi sen 1855 "kahvikaupan keskukseksi ja chat-kasvin syntysijaksi". Egypti valtasi '
      + 'kaupungin 1875 ja jätti sen 1884; egyptiläisaikana ranskalainen runoilija Arthur '
      + 'Rimbaud asui siellä kauppahuoneiden asiamiehenä ja palasi 1888 käymään kauppaa '
      + 'kahvilla, myskillä ja nahoilla. Vanha kaupunki Harar Jugol on ollut maailmanperintöä '
      + '2006 lähtien.',
    lahde: 'en-Wikipedia "Harar", johdanto-osa sekä osiot "History" ("Adal Sultanate era", '
      + '"Harar Emirate", "Anglo-Egyptian occupation") (tarkistettu 6.9.2026).',
  },
  {
    id: 'tiya',
    nimi: 'Tiya',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mitä Tiyan kiviin on veistetty?',
      'Kenen töiksi paikalliset arvelivat kiviä?',
    ],
    korostukset: ['miekka|miekkoja'],
    nappi: 'Miekkakivien kenttä',
    // 38.6167 E / 8.4333 N — en-Wikipedia "Tiya (archaeological site)"
    // Lähin pelikaupunki: Addis Abeba 20,6 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7120.6, y: 2929.7 },
    },
    teksti: 'Tiyan pellolla seisoo 46 kivipaatta, ja niistä 32:een on veistetty arvoituksellisia '
      + 'merkkejä — useimmiten miekkoja, mutta myös kasvinkaltaisia kuvioita, T-kirjaimen '
      + 'muotoinen merkki ja seisova ihmishahmo kädet lanteilla. Paadet ajoitetaan 1000- ja '
      + '1400-luvun välille, ja ne merkitsevät todennäköisesti laajaa hautausmaata; kaivauksissa '
      + 'on löytynyt hautoja. Tiya on yksi Guragen alueen yhdeksästä megaliittipaikasta, joilla '
      + 'oli 1997 mennessä laskettu 118 kiveä. Paikalliset kutsuvat niitä nimellä Yegragn '
      + 'Dingay, "Granin kivi", ja arvelivat niitä 1500-luvun valloittajan Ahmad ibn Ibrahimin '
      + 'jäljiksi — mutta kivet ovat vuosisatoja vanhempia, ja yhdistelmä syntyi vain terien '
      + 'samannäköisyydestä. Unescon maailmanperintökohde 1980.',
    lahde: 'en-Wikipedia "Tiya (archaeological site)", johdanto-osa sekä osiot "Overview" ja '
      + '"Gurage stelae" (tarkistettu 6.9.2026).',
  },
  {
    id: 'debredamo',
    nimi: 'Debre Damo',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miten luostariin päästään?',
      'Mitä ovat "apinanpäät" aksumilaisessa rakennustavassa?',
    ],
    korostukset: ['köysi|köyttä'],
    nappi: 'Luostari köyden päässä',
    // 39.2903 E / 14.3739 N — en-Wikipedia "Debre Dammo"
    // Lähin pelikaupunki: Lalibela 79,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7143, y: 2729.1 },
    },
    teksti: 'Debre Damo on litteähuippuinen pöytävuori, amba, jonka laki on noin kilometrin '
      + 'pitkä ja 400 metriä leveä ja kohoaa 2 216 metriin. Sen päällä on 500-luvulle ajoitettu '
      + 'luostari, jonne pääsee vain kiipeämällä viisitoista metriä köyttä pitkin pystysuoraa '
      + 'kallioseinämää — ja vain miehet pääsevät. Perinteen mukaan luostarin perusti Abuna '
      + 'Aregawi. Kirkko on Etiopian vanhin alkuperäisessä asussaan säilynyt kirkkorakennus: '
      + 'seinissä vuorottelevat kalkkikivikerrokset ja hirret, joiden ulos työntyviä päitä '
      + 'etiopialaiset kutsuvat apinanpäiksi. Thomas Pakenham kuuli 1955 perimätiedon, jonka '
      + 'mukaan vuori oli aikanaan myös keisarin perillisten vankila, kuten Wehni ja Amba '
      + 'Geshen. Kirkko oli 1940-luvulla romahtamaisillaan, kunnes englantilainen arkkitehti '
      + 'D. H. Matthews auttoi korjaustyössä.',
    lahde: 'en-Wikipedia "Debre Dammo", johdanto-osa sekä osio "Monastery" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'danakil',
    nimi: 'Danakilin syvänne',
    tyyppi: 'muu',
    kysymykset: [
      'Miksi Danakilissa on paksut suolakerrokset?',
      'Mikä Dallol on?',
    ],
    korostukset: ['suola|suolakerrokset'],
    nappi: 'Meren pohja kuivalla maalla',
    // 40.3 E / 14.2417 N — en-Wikipedia "Danakil Depression"
    // Lähin pelikaupunki: Lalibela 86,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7176.7, y: 2733.6 },
    },
    teksti: 'Danakilin syvänne on noin 200 kertaa 50 kilometrin laakso, joka on 125 metriä '
      + 'merenpinnan alapuolella — Afrikan kolmanneksi matalin kohta. Se on repeämä: Nubian '
      + 'laatta ja Danakilin mikrolaatta erkanevat toisistaan noin 18 millimetriä vuodessa, ja '
      + 'kuori on ohentunut niin pitkälle, että alue on lähellä muuttua valtamereksi. Punainen '
      + 'meri on tulvinut altaaseen ainakin neljästi, viimeksi noin 130 000 vuotta sitten, ja '
      + 'haihtunut vesi on jättänyt yli 500 metriä paksut suolakerrokset. Suolatasangon '
      + 'keskellä on Dallol, suolatulivuori, jonka lähteistä purkautuu erittäin hapanta, suolaista '
      + 'ja kuumaa vettä ja jonka altaiden värit syntyvät rautasuolojen hapettumisesta. '
      + 'Vieressä on Gaet\'ale, 43 prosentin suolapitoisuudellaan maailman suolaisin vesi. '
      + 'Geologien maailmanjärjestö IUGS otti alueen 2022 sadan tärkeimmän geologisen '
      + 'perintökohteen luetteloonsa.',
    lahde: 'en-Wikipedia "Danakil Depression", johdanto-osa sekä osiot "Geology" (alaosiot '
      + '"Dallol" ja "Hot springs") ja "IUGS geological heritage site" (tarkistettu 6.9.2026).',
  },
  {
    id: 'hadar',
    nimi: 'Hadar',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka löysi Lucyn ja milloin?',
      'Mistä Lucy sai nimensä?',
    ],
    korostukset: ['Lucy|Lucy'],
    nappi: 'Lucyn löytöpaikka',
    // 40.633 E / 11.167 N — en-Wikipedia "Hadar, Ethiopia"
    // Lähin pelikaupunki: Lalibela 60,6 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7187.8, y: 2837.7 },
    },
    teksti: 'Awash-joen vasemmalla rannalla Afarin kolmion eteläreunalla on kerrostumia, joista '
      + 'on löytynyt maailman tunnetuimpia ihmisen esi-isien luita, iältään noin 3,42–2,90 '
      + 'miljoonaa vuotta. Marraskuussa 1974 antropologi Donald Johanson huomasi rotkossa '
      + 'kyynärluun, sitten takaraivoluun, reisiluun, kylkiluita, lantion ja alaleuan; kahdessa '
      + 'viikossa koossa oli lähes 40 prosenttia yhdestä luurangosta. Se sai nimekseen Lucy — '
      + 'leiriradiosta soi silloin Beatlesin "Lucy in the Sky with Diamonds" — ja lajinimekseen '
      + 'Australopithecus afarensis. Seuraavana vuonna samasta paikasta löytyi 216 luuta noin '
      + 'seitsemäntoista yksilöstä; löytöä kutsutaan nimellä "ensimmäinen perhe". Kolmisenkymmentä '
      + 'vuotta myöhemmin joen toiselta puolelta Dikikasta löytyi kolmivuotiaan tytön luuranko, '
      + 'jolle annettiin nimi Selam, amharaksi rauha.',
    lahde: 'en-Wikipedia "Hadar, Ethiopia", johdanto-osa sekä osio "Paleontology" alaosioineen '
      + '"Discovery of Lucy" ja "Specimens and inferences" (tarkistettu 6.9.2026).',
  },
  {
    id: 'balenpuisto',
    nimi: 'Balen kansallispuisto',
    tyyppi: 'muu',
    kysymykset: [
      'Mikä eläin on etiopiansusi?',
      'Mitä kahvilla on tekemistä Balen metsien kanssa?',
    ],
    korostukset: ['arabiankahvi|arabiankahvia'],
    nappi: 'Ylängön oma eläimistö',
    // 39.6667 E / 6.6667 N — en-Wikipedia "Bale Mountains National Park"
    // Lähin pelikaupunki: Addis Abeba 85,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7155.6, y: 2988.9 },
    },
    teksti: 'Balen vuorten kansallispuisto kattaa 2 150 neliökilometriä Etiopian ylängön '
      + 'kaakkoiskulmassa, ja suuri osa siitä on yli kolmen kilometrin korkeudessa; korkein '
      + 'kohta on Tullu Dimtu 4 385 metrissä. Puistossa on Afrikan laajin afromontaaninen alue, '
      + 'ja sen kotoperäisten eläinten osuus on yksi maailman suurimmista: etiopiansusi, '
      + 'vuorinjala, Balen vervettiapina ja iso maarotta. Lintuja on yli 282 lajia, ja niistä '
      + 'yhdeksän on koko Etiopian kuudestatoista kotoperäisestä lajista. Harennan metsässä '
      + 'kasvaa villinä arabiankahvia, Coffea arabica, ja alueelta on tunnistettu kolme '
      + 'lääkekasvien keskittymää. Ylätasangolla yöpakkaset ovat tavallisia, vaikka päivällä '
      + 'lämpötila on kymmenen asteen tienoilla. Unesco otti puiston maailmanperintöluetteloon '
      + '2023.',
    lahde: 'en-Wikipedia "Bale Mountains National Park", johdanto-osa sekä osiot "Geography", '
      + '"Climate", "Flora" ja "Fauna" (tarkistettu 6.9.2026).',
  },
];

