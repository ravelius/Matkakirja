// Euroopan Kaupungin elämää -nostot (sama rakenne kuin AFRICA_KULTTUURI).
// Rakentuu kaupunki kerrallaan. Kuvien lisenssit varmistettu Commonsin
// extmetadatasta (Venetsia 31.7.2026, muut 1.8.2026), ja kuvista on
// paikalliset kopiot kansiossa assets/valokuvat.
export const EUROPE_KULTTUURI = {
  venetsia: {
    /*
     * Venetsian nostot siirtyivät kansisivuksi
     * kulttuuri-kategoriat.js:ään (maa–kaupunki-pilotti 5.8.2026) —
     * tänne jää vain kulttuurivisa, joka piirretään
     * saapumiskortille litteästä taulusta.
     */
    kysymys: {
      q: 'Minkä niminen on Vivaldin kuuluisa konserttosarja, jossa musiikki kuvaa kevättä, kesää, syksyä ja talvea?',
      options: ['Neljä vuodenaikaa', 'Kaksitoista kuukautta', 'Meren laulu', 'Talviyön tarina'],
      correct: 0,
      fact: 'Neljä vuodenaikaa on neljän viulukonserton sarja — jokainen '
        + 'kuvaa yhtä vuodenaikaa, ja musiikista voi kuulla linnunlaulua '
        + 'ja ukkosen. Vivaldi sävelsi sen noin vuosina 1718–1723.',
    },
  },

  marseille: {
    /*
     * Marseille sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/tutki-aiheet.md).
     */
    kysymys: {
      q: 'Miksi Ranskan kansallislaulua kutsutaan Marseillaisiksi, vaikka se sävellettiin Strasbourgissa?',
      options: [
        'Marseillelaiset vapaaehtoiset lauloivat sitä marssiessaan Pariisiin',
        'Säveltäjä syntyi Marseillessa',
        'Se esitettiin ensi kerran Marseillen satamassa',
        'Marseillen kaupunki maksoi sen säveltämisen',
      ],
      correct: 0,
      fact: 'Rouget de Lisle sävelsi laulun Strasbourgissa 1792. Kun '
        + 'marseillelaiset vapaaehtoiset marssivat sen tahtiin '
        + 'Pariisiin, pariisilaiset alkoivat kutsua sävelmää heidän '
        + 'mukaansa — ja nimi jäi.',
    },
  },

  granada: {
    /*
     * Granada sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/tutki-aiheet.md).
     */
    kysymys: {
      q: 'Mikä oli Alhambra ennen kuin siitä tuli museo?',
      options: [
        'Granadan emiirikunnan hallitsijan palatsi ja linnoitus',
        'Roomalainen kylpylä',
        'Luostari',
        'Kuninkaallinen ratsutalli',
      ],
      correct: 0,
      fact: 'Alhambra rakennettiin 1200–1300-luvuilla Nasridi-suvun '
        + 'hallitsijoiden palatsiksi ja linnoitukseksi. Se oli Iberian '
        + 'viimeisen muslimivaltion keskus, ja se luovutettiin '
        + 'Kastilian ja Aragonian hallitsijoille vuonna 1492.',
    },
  },

  krakova: {
    /*
     * Krakova sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/tutki-aiheet.md).
     */
    kysymys: {
      q: 'Miksi Krakovan Marian kirkon torvisoitto katkeaa aina kesken sävelen?',
      options: [
        'Perimätiedon mukaan nuoli osui soittajaan kesken varoituksen',
        'Torvi on rikki eikä sitä ole korjattu',
        'Soittajalla loppuu ilma samassa kohdassa',
        'Sävelmä on jäänyt säveltäjältä kesken',
      ],
      correct: 0,
      fact: 'Tarinan mukaan torvensoittaja varoitti kaupunkia '
        + 'hyökkäyksestä, kun nuoli osui häneen kesken soiton. Katkos '
        + 'toistetaan joka tunti — ja keskipäivällä se kuullaan koko '
        + 'Puolassa radiossa.',
    },
  },

  sarajevo: {
    /*
     * Sarajevo sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/tutki-aiheet.md).
     */
    kysymys: {
      q: 'Mistä sana sevdalinka on peräisin?',
      options: [
        'Turkin sanasta sevda, joka tarkoittaa rakkaudenkaipuuta',
        'Erään säveltäjän sukunimestä',
        'Bosnialaisesta soittimesta',
        'Sarajevon kaupunginosan nimestä',
      ],
      correct: 0,
      fact: 'Sevdalinka on Bosnian oma laulutyyli, ja sen nimi tulee '
        + 'turkin sanasta sevda — rakkaudenkaipuu. Laulut ovat vanhoja '
        + 'kaupunkilauluja, jotka siirtyivät suullisesti sukupolvelta '
        + 'toiselle.',
    },
  },

  islanti: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Käräjät kahden mantereen välissä',
        tiedosto: 'Almannagjá Gorge, Þingvellir National Park, Iceland.jpg',
        teksti: 'Þingvellirissä islantilaiset kokoontuivat käräjille '
          + 'vuodesta 930 alkaen: lait luettiin ääneen kalliolta, koska '
          + 'niitä ei ollut kirjoitettu mihinkään. Paikka sattuu olemaan '
          + 'kohdassa, jossa Pohjois-Amerikan ja Euraasian mannerlaatat '
          + 'erkanevat — rotko levenee pari senttiä vuodessa.',
        selite: 'Almannagjá, Þingvellirin suurin repeämä. Kalliolta '
          + 'lainlukija esitti kolmasosan laeista joka vuosi, jotta '
          + 'koko lakikokoelma tuli luetuksi kolmen vuoden välein.',
        lahde: 'Marine SABRES, Wikimedia Commons (CC BY 4.0)',
        wiki: 'Þingvellir',
      },
      {
        tyyppi: 'kuva',
        otsikko: 'Kieli, joka ei liikkunut',
        tiedosto: 'GKS 1005 fol., 0005v - 15 (cropped).jpg',
        teksti: 'Islannin kieli on muuttunut niin vähän, että koululainen '
          + 'voi lukea 1200-luvun saagoja alkukielellä. Uusille asioille '
          + 'ei lainata sanoja vaan tehdään omat: tietokone on tölva, '
          + '"lukujen ennustaja", ja kaikille islantilaisille tuttu '
          + 'sana yhtä lailla.',
        selite: 'Aukeama Flateyjarbókista, Islannin suurimmasta '
          + 'keskiaikaisesta käsikirjoituksesta (1387–1394). Se sisältää '
          + 'Norjan kuninkaiden saagoja ja kertomuksen Vinlandin '
          + 'löytämisestä.',
        lahde: 'Wikimedia Commons (PD)',
        wiki: 'Flateyjarbók',
      },
      {
        tyyppi: 'kuva',
        otsikko: 'Björk ja pieni maa, joka soi',
        tiedosto: 'BjörkCoachella.jpg',
        teksti: 'Islannissa asuu vähemmän ihmisiä kuin monessa '
          + 'suomalaisessa maakunnassa, mutta musiikkia tulee ulos kuin '
          + 'suurmaasta. Björk aloitti kotimaassaan jo lapsitähtenä ja '
          + 'löi läpi maailmalla 1990-luvulla; hänen jälkeensä tulivat '
          + 'muun muassa Sigur Rós ja Of Monsters and Men.',
        selite: 'Björk esiintymässä. Hän on levyttänyt sekä islanniksi '
          + 'että englanniksi ja tehnyt yhteistyötä muusikoiden ja '
          + 'kuvataiteilijoiden kanssa ympäri maailman.',
        lahde: 'Paul Familetti, Wikimedia Commons (CC BY 2.0)',
        wiki: 'Björk',
        musiikki: 'https://music.apple.com/fi/artist/bjork/295015',
        musiikkiNimi: 'Björk Apple Musicissa',
      },
    ],
    kysymys: {
      q: 'Mikä on Þingvellirin erikoisuus maantieteellisesti?',
      options: [
        'Se on kohdassa, jossa kaksi mannerlaattaa erkanee toisistaan',
        'Se on Islannin korkein vuori',
        'Se on maailman pohjoisin kaupunki',
        'Se on saaren ainoa metsä',
      ],
      correct: 0,
      fact: 'Þingvellir sijaitsee Pohjois-Amerikan ja Euraasian '
        + 'mannerlaattojen saumassa: laatat erkanevat toisistaan noin '
        + 'kaksi senttiä vuodessa, ja maasto repeää kallionrotkoiksi. '
        + 'Samassa paikassa kokoontui Alþingi vuodesta 930.',
    },
  },

  ateena: {
    /*
     * Ateena sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/tutki-aiheet.md).
     */
    kysymys: {
      q: 'Mitä evzonin puvun 400 laskosta esittävät?',
      options: [
        'Ottomaanivallan vuosia',
        'Kreikan saarten määrää',
        'Antiikin kaupunkivaltioita',
        'Marathonin juoksun metrejä',
      ],
      correct: 0,
      fact: 'Kreikka oli ottomaanien vallan alla lähes neljäsataa vuotta, '
        + 'ja vapaussota alkoi 1821. Laskosten määrä on muistutus siitä.',
    },
  },

  rooma: {
    /*
     * Rooma sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/tutki-aiheet.md).
     */
    kysymys: {
      q: 'Miten Rooman akveduktit saivat veden liikkeelle?',
      options: [
        'Painovoimalla — putki laskee koko matkan',
        'Orjien pyörittämillä pumpuilla',
        'Tuulivoimalla',
        'Vesi nostettiin ämpäreillä porras kerrallaan',
      ],
      correct: 0,
      fact: 'Kaltevuus oli paikoin vain 30 senttiä kilometrillä. Kaaret '
        + 'rakennettiin juuri siksi: laakson yli piti pitää putki '
        + 'täsmälleen oikeassa kulmassa.',
    },
  },

  kreeta: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Härän yli hypättiin',
        tiedosto: 'Bull leaping minoan fresco archmus Heraklion.jpg',
        teksti: 'Knossoksen seinämaalauksissa nuoret tarttuvat juoksevan '
          + 'härän sarviin ja heittävät kuperkeikan sen selän yli. '
          + 'Tutkijat kiistelevät yhä siitä, oliko se urheilua, uskonnon '
          + 'meno vai molempia — eikä kukaan tiedä, onnistuiko se '
          + 'oikeasti koskaan.',
        selite: 'Härkähyppyfreskon jäänteet Herakleionin arkeologisessa '
          + 'museossa, maalattu noin 1500 eaa. Vaaleat hahmot ovat '
          + 'naisia, tumma mies — minolainen tapa merkitä sukupuoli '
          + 'värillä.',
        lahde: 'Wikimedia Commons (CC0)',
        wiki: 'Knossos',
      },
      {
        tyyppi: 'kuva',
        otsikko: 'Lyyra soi polvella',
        tiedosto: 'Cretan lyra.jpg',
        teksti: 'Kreetalainen lyyra on kolmikielinen jousisoitin, jota '
          + 'pidetään pystyssä polvella eikä leuan alla. Sitä soitetaan '
          + 'häissä ja kylän juhlissa, usein läpi yön: tanssi kestää niin '
          + 'kauan kuin soittajaa jaksaa.',
        selite: 'Kreetalainen lyyra. Kieliä painetaan kynsien kyljellä, '
          + 'ei sormenpäillä — siitä tulee soittimen erikoinen liukuva '
          + 'ääni.',
        lahde: 'Lemur12, Wikimedia Commons (CC BY 3.0)',
        wiki: 'Psarantónis',
        musiikki: 'https://music.apple.com/fi/search?term=cretan%20lyra',
        musiikkiNimi: 'Kreetalaista lyyramusiikkia Apple Musicissa',
        musiikkiNayte: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Cretan_Lyra_-_Sample.mp3',
        musiikkiNayteNimi: 'Kreetalainen lyyra — Aerakis, CC BY',
      },
      {
        tyyppi: 'kuva',
        otsikko: 'Öljypuita enemmän kuin ihmisiä',
        tiedosto: 'Olive-Harvest-Sitia-Lasithi-Crete-Greece.jpg',
        teksti: 'Kreetalla kasvaa noin 30 miljoonaa oliivipuuta ja asuu '
          + 'reilut 600 000 ihmistä — puita on siis viisikymmentä kertaa '
          + 'enemmän. Osa puista on tuhansia vuosia vanhoja ja tuottaa '
          + 'yhä satoa. Sato korjataan talvella, usein koko suvun voimin.',
        selite: 'Oliivinkorjuuta Sitiassa Itä-Kreetalla. Verkot '
          + 'levitetään puun alle ja oksat ravistellaan tai kammataan '
          + 'tyhjiksi.',
        lahde: 'Petro Stelte, Wikimedia Commons (CC BY-SA 4.0)',
        wiki: 'Oliivi',
      },
    ],
    kysymys: {
      q: 'Kuinka vanha Knossoksen palatsikulttuuri on?',
      options: [
        'Noin 4 000 vuotta — Euroopan vanhin kaupunkikulttuuri',
        'Noin 1 000 vuotta',
        'Noin 500 vuotta',
        'Se rakennettiin roomalaisten aikaan',
      ],
      correct: 0,
      fact: 'Minolainen kulttuuri kukoisti noin 2000–1450 eaa. Palatsissa '
        + 'oli juokseva vesi ja viemärit aikana, jolloin muualla '
        + 'Euroopassa asuttiin puumajoissa.',
    },
  },

  sisilia: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Ritarit narujen varassa',
        tiedosto: 'Sicilian puppets.JPG',
        teksti: 'Opera dei pupi on sisilialainen nukketeatteri, jossa '
          + 'metrin mittaiset haarniskoidut ritarit taistelevat '
          + 'Kaarle Suuren tarinoissa. Sama tarina jatkui iltaa toisensa '
          + 'jälkeen kuukausia, ja yleisö tuli katsomaan kuin '
          + 'televisiosarjaa. Unesco suojeli perinteen 2001.',
        selite: 'Sisilialaisia pupi-nukkeja haarniskoissaan. Nuket '
          + 'painavat jopa kymmenen kiloa, ja niitä ohjataan '
          + 'rautatangoilla ylhäältä.',
        lahde: 'Lookandlike, Wikimedia Commons (CC BY-SA 4.0)',
        wiki: 'Opera dei pupi',
      },
      {
        tyyppi: 'kuva',
        otsikko: 'Cannolo täytetään vasta tilauksesta',
        tiedosto: 'Cannoli siciliani.jpg',
        teksti: 'Cannolo on paistettu taikinaputki, joka täytetään '
          + 'makeutetulla ricotta-juustolla. Kunnon leipomossa se '
          + 'täytetään vasta kun asiakas tilaa — muuten kuori pehmenee. '
          + 'Ricotta tehdään lampaanmaidosta, ja arabit toivat '
          + 'sokeriruo’on saarelle 800-luvulla.',
        selite: 'Cannoli siciliani tarjolla. Päihin painetaan usein '
          + 'pistaasirouhetta tai kandeerattua hedelmää.',
        lahde: 'Stefano Mortellaro, Wikimedia Commons (CC BY 2.0)',
        wiki: 'Cannolo',
      },
      {
        tyyppi: 'kuva',
        otsikko: 'Torilla huudetaan laulaen',
        tiedosto: 'Ballarò, gente en el mercado, Palermo, Sicilia, Italia, 2015.JPG',
        teksti: 'Palermon Ballarò on toiminut samalla paikalla yli '
          + 'tuhat vuotta, arabivallan ajoista asti. Myyjien huuto on '
          + 'oma taiteenlajinsa nimeltä abbanniata: hinta ja tavara '
          + 'lauletaan venytetyllä melodialla, joka kuuluu korttelin '
          + 'päähän.',
        selite: 'Ballarò-tori Palermossa. Kojujen välissä myydään kalaa, '
          + 'vihanneksia ja katuruokaa; markkina alkaa aamuvarhain ja '
          + 'jatkuu iltaan.',
        lahde: 'Benjamín Núñez González, Wikimedia Commons (CC BY-SA 4.0)',
        wiki: 'Palermo',
        // Kenttä-äänitys juuri tältä torilta maaliskuussa 2009.
        aani: 'https://archive.org/download/aporee_6826_8498/palermoballarmarzo2009.MP3',
        aaniLahde: '"ballarò" — Attilio Migliorati, radio aporee (CC BY-SA 3.0)',
      },
    ],
    kysymys: {
      q: 'Mikä on abbanniata?',
      options: [
        'Torikauppiaan laulava myyntihuuto',
        'Sisilialainen jälkiruoka',
        'Etnan purkaustyyppi',
        'Nukketeatterin päähenkilö',
      ],
      correct: 0,
      fact: 'Abbanniata on Palermon torien oma huutolaulu. Jokaisella '
        + 'myyjällä on oma melodiansa, ja vakioasiakkaat tunnistavat '
        + 'kauppiaan pelkästä äänestä.',
    },
  },

  dubrovnik: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Klapa lauletaan ilman soittimia',
        tiedosto: 'Klapa Cambi, Orebić.2012.JPG',
        teksti: 'Klapa on dalmatialainen mieskuorolaulu ilman soittimia: '
          + 'viidestä kymmeneen laulajaa seisoo tiiviissä puolikaaressa '
          + 'ja sovittaa äänet toisiinsa. Perinne syntyi kirkoissa ja '
          + 'satamissa, ja Unesco suojeli sen 2012.',
        selite: 'Klapa-yhtye laulamassa Orebićissä. Laulajat asettuvat '
          + 'lähelle toisiaan, jotta kukin kuulee muut ilman '
          + 'vahvistusta.',
        lahde: 'Quahadi, Añtó, Wikimedia Commons (CC BY-SA 3.0)',
        wiki: 'Klapa',
        musiikki: 'https://music.apple.com/fi/search?term=klapa',
        musiikkiNimi: 'Klapa-lauluja Apple Musicissa',
      },
      {
        tyyppi: 'kuva',
        otsikko: 'Euroopan vanhin apteekki',
        tiedosto: 'Old pharmacy in the Franciscan Monastery in Dubrovnik 01.jpg',
        teksti: 'Fransiskaaniluostarin apteekki avattiin vuonna 1317 ja '
          + 'palvelee yhä asiakkaita — se on Euroopan vanhin '
          + 'yhtäjaksoisesti toiminut apteekki. Munkit valmistivat '
          + 'voiteita yrteistä, ja osa resepteistä on yhä käytössä.',
        selite: 'Vanhan apteekin purkkeja luostarin museossa. '
          + 'Fajanssiruukuissa säilytettiin yrttejä ja voiteita; '
          + 'jokaisen kyljessä lukee sisältö latinaksi.',
        lahde: 'Bernard Gagnon, Wikimedia Commons (CC BY-SA 4.0)',
        wiki: 'Dubrovnik',
      },
      {
        tyyppi: 'kuva',
        otsikko: 'Suola teki kaupungista rikkaan',
        tiedosto: 'Salt pans Ston (4065531015).jpg',
        teksti: 'Stonin suola-altaat ovat toimineet 1300-luvulta asti, ja '
          + 'suola oli Dubrovnikin tasavallan tärkein tulonlähde. Sitä '
          + 'suojaamaan rakennettiin viiden kilometrin muuri — Euroopan '
          + 'pisin linnoitusmuuri Kiinan muurin jälkeen. Suola kerätään '
          + 'yhä käsin puulastoilla.',
        selite: 'Stonin suola-altaat. Merivesi johdetaan matalille '
          + 'kentille ja haihdutetaan auringossa; jäljelle jää suola.',
        lahde: 'Tony Hisgett, Wikimedia Commons (CC BY 2.0)',
        wiki: 'Ston',
      },
    ],
    kysymys: {
      q: 'Millä Dubrovnikin tasavalta pysyi vuosisatoja itsenäisenä?',
      options: [
        'Kaupankäynnillä ja neuvottelemalla, ei sotimalla',
        'Euroopan suurimmalla laivastolla',
        'Vuoristo esti hyökkäykset kokonaan',
        'Se ei ollut koskaan itsenäinen',
      ],
      correct: 0,
      fact: 'Ragusa maksoi veroa milloin ottomaaneille, milloin '
        + 'Unkarille, ja piti kaikkiin välit kunnossa. Se kielsi '
        + 'orjakaupan jo 1416 — yhtenä ensimmäisistä Euroopassa.',
    },
  },

  sofia: {
    /*
     * Sofia sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/tutki-aiheet.md).
     */
    kysymys: {
      q: 'Miksi Bulgarian ruusut poimitaan aamuviideltä?',
      options: [
        'Päivän lämmössä tuoksuöljy haihtuu',
        'Ruusut kukkivat vain aamulla',
        'Mehiläiset häiritsevät myöhemmin',
        'Se on vanha uskonnollinen tapa',
      ],
      correct: 0,
      fact: 'Öljypitoisuus on korkeimmillaan ennen auringonnousua. '
        + 'Yhteen grammaan ruusuöljyä tarvitaan noin kolme kiloa '
        + 'terälehtiä.',
    },
  },

  lontoo: {
    /*
     * Lontoon nostot asuvat kategorioittain kulttuuri-kategoriat.js:ssä
     * (9 aihetta) — tänne jää vain kulttuurivisa, joka piirretään
     * saapumiskortille litteästä taulusta.
     */
    kysymys: {
      q: 'Mikä veti maailman ensimmäisiä metrojunia Lontoossa vuonna 1863?',
      options: [
        'Höyryveturi',
        'Sähkömoottori',
        'Hevoset',
        'Paineilma',
      ],
      correct: 0,
      fact: 'Sähkövetoinen metrolinja avattiin Lontoossa vasta 1890. '
              + 'Ensimmäisellä radalla savu oli niin sakeaa, että tunneliin '
              + 'jätettiin aukkoja, joista se pääsi kadulle.',
    },
  },

  edinburgh: {
    /*
     * Edinburgh sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/tutki-aiheet.md).
     */
    kysymys: {
      q: 'Miten Edinburghin Fringe-festivaali sai alkunsa vuonna 1947?',
      options: [
        'Kahdeksan kutsumatonta ryhmää tuli esiintymään silti',
        'Kuningatar määräsi sen perustettavaksi',
        'Se alkoi radio-ohjelmana',
        'Se siirrettiin Edinburghiin Lontoosta',
      ],
      correct: 0,
      fact: 'Fringe tarkoittaa reunaa. Festivaali on yhä avoin kaikille: '
              + 'ohjelmaa ei valitse mikään raati, mutta esiintyjän on itse '
              + 'hankittava esityspaikkansa ja maksettava se.',
    },
  },

  dublin: {
    /*
     * Dublin sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/tutki-aiheet.md).
     */
    kysymys: {
      q: 'Miten irlantilaiseen uilleann-säkkipilliin saadaan ilmaa?',
      options: [
        'Palkeella, joka on kiinni soittajan kyynärpäässä',
        'Puhaltamalla putkeen',
        'Jalkapolkimella',
        'Pienellä sähköpumpulla',
      ],
      correct: 0,
      fact: 'Nimi uilleann tulee irlannin sanasta uillinn eli kyynärpää. '
              + 'Palkeen kuiva ilma pitää soittimen vireessä paremmin kuin '
              + 'suusta puhallettu kostea ilma.',
    },
  },

  pariisi: {
    /*
     * Pariisi sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/tutki-aiheet.md).
     */
    kysymys: {
      q: 'Mitä pariisilainen leipuri saa palkinnoksi, jos voittaa kaupungin '
           + 'patonkikilpailun?',
      options: [
        'Hän toimittaa vuoden ajan leivät presidentin palatsiin',
        'Hän saa leipoa yhden päivän Eiffel-tornissa',
        'Hänen leipomonsa vapautuu verosta',
        'Hän pääsee raatiin seuraavaksi vuodeksi',
      ],
      correct: 0,
      fact: 'Pariisin patonkikilpailu on järjestetty vuodesta 1994. Raati '
              + 'maistaa leivät sokkona, ja voittaja saa rahapalkinnon sekä '
              + 'oikeuden — ja velvollisuuden — toimittaa Élysée-palatsin '
              + 'patongit seuraavan vuoden ajan.',
    },
  },

  lissabon: {
    /*
     * Lissabon sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/tutki-aiheet.md).
     */
    kysymys: {
      q: 'Mistä portugalilaisten seinälaattojen nimi azulejo tulee?',
      options: [
        'Arabian sanasta az-zulayj, kiillotettu pikkukivi',
        'Espanjan sanasta azul, sininen',
        'Lissabonin Azul-korttelin nimestä',
        'Latinan sanasta azula, savi',
      ],
      correct: 0,
      fact: 'Moni luulee nimen tulevan sinisestä väristä, koska laatat ovat '
              + 'usein sinivalkoisia. Sana on kuitenkin arabiaa ja tarkoittaa '
              + 'kiillotettua pikkukiveä eli mosaiikin palasta. Portugalissa '
              + 'laattoja on tehty yli viisisataa vuotta.',
    },
  },

  madrid: {
    /*
     * Madrid sai kategoriat (kulttuuri-kategoriat.js + maa-kategoriat
     * ESP, 6.8.2026), jotka korvaavat litteät nostot Tutki-ikkunassa.
     * Ainutlaatuinen sisältö siirrettiin sinne: chotis
     * musiikkilinkkeineen kaupungin kanteen, cocido ja uudenvuoden
     * rypäleet Espanjan Ruoka-aiheeseen. Tänne jää vain visa
     * (docs/tutki-aiheet.md).
     */
    kysymys: {
      q: 'Mikä on madridilaisen chotis-tanssin tunnetuin sääntö?',
      options: [
        'Mies ei siirry laatalta, jolla seisoo',
        'Tanssijat eivät saa koskettaa toisiaan',
        'Tanssia saa vain ulkosalla',
        'Pari vaihtuu joka kahdeksas tahti',
      ],
      correct: 0,
      fact: 'Sanotaan, että chotis tanssitaan yhden laatan päällä: mies '
              + 'pyörii paikallaan ja nainen kiertää hänen ympärillään. Tanssi '
              + 'tuli Madridiin 1850 Keski-Euroopasta ja sai kaupungissa oman '
              + 'muotonsa — sama nosto on lehden kannessa.',
    },
  },

  barcelona: {
    /*
     * Barcelona sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/tutki-aiheet.md).
     */
    kysymys: {
      q: 'Mitä katalaanien ihmistornin huipulle kiipeävä lapsi, enxaneta, '
           + 'tekee päästyään ylös?',
      options: [
        'Nostaa kätensä ja näyttää neljää sormea',
        'Heittää alas punaisen huivin',
        'Huutaa tornin nimen',
        'Soittaa pientä kelloa',
      ],
      correct: 0,
      fact: 'Neljä sormea tarkoittaa Katalonian lipun neljää raitaa, ja '
              + 'merkki kertoo että torni on valmis. Onnistuneeksi torni '
              + 'lasketaan kuitenkin vasta, kun se on purettu kaatumatta. '
              + 'Unesco otti castells-perinteen suojelukseensa 2010.',
    },
  },

  amsterdam: {
    /*
     * Amsterdam sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/tutki-aiheet.md).
     */
    kysymys: {
      q: 'Miksi Amsterdamin vanhat kanavatalot ovat niin kapeita?',
      options: [
        'Kiinteistövero laskettiin julkisivun leveydestä',
        'Kapea talo kesti tulvat paremmin',
        'Kanavan varrella ei ollut tilaa leveämmille',
        'Laki kielsi yli kolme metriä leveät talot',
      ],
      correct: 0,
      fact: '1600-luvulla vero määräytyi julkisivun leveyden mukaan, joten '
              + 'rakennettiin kapeaa ja syvää. Kapein talo, Oude Hoogstraat 22, '
              + 'on 2,02 metriä leveä — ja siinä toimii nykyään kauppa.',
    },
  },

  /*
   * Berliinin nostot siirtyivät lehtipaketin myötä muualle
   * (monistusohjeen sääntö: ainutlaatuinen sisältö kanteen):
   * Ampelmännchen on kaupungin kannessa (kulttuuri-kategoriat.js),
   * currywurst maan Ruoka-sivulla ja tekno musiikkilinkkeineen maan
   * Musiikki-sivulla (maa-kategoriat.js DEU). Tänne jää vain visa —
   * sen aihe (Ampelmännchen) näkyy kannen nostossa.
   */
  berliini: {
    kysymys: {
      q: 'Mistä Berliinin liikennevalojen hattupäinen ukkeli on peräisin?',
      options: [
        'Itä-Saksasta, jossa se suunniteltiin vuonna 1961',
        'Berliinin olympialaisista vuodelta 1936',
        'Se on 2000-luvun matkamuistokeksintö',
        'Ranskasta, jossa se otettiin ensin käyttöön',
      ],
      correct: 0,
      fact: 'Karl Peglau suunnitteli Ampelmännchenin Itä-Saksan '
              + 'liikenneministeriölle vuonna 1961, ja ensimmäiset valot '
              + 'syttyivät Itä-Berliinissä 1969. Yhdistymisen jälkeen '
              + 'kansalaiskampanja esti sen poistamisen.',
    },
  },

  wien: {
    /*
     * Wien sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/tutki-aiheet.md).
     */
    kysymys: {
      q: 'Kuinka moni wieniläinen asuu kaupungin omistamassa '
           + 'vuokra-asunnossa?',
      options: [
        'Noin joka neljäs',
        'Noin joka sadas',
        'Ei kukaan, kaikki asunnot ovat yksityisiä',
        'Kaikki, muunlaisia asuntoja ei ole',
      ],
      correct: 0,
      fact: 'Wienin kaupunki omistaa noin 220 000 asuntoa ja on Euroopan '
              + 'suurin vuokranantaja. Niissä asuu noin puoli miljoonaa ihmistä '
              + 'eli suunnilleen neljäsosa kaupunkilaisista.',
    },
  },

  alpit: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Torvi, joka puhuu laaksosta toiseen',
        tiedosto: 'Alphornblaeserformation über Kreuz in Zermatt - panoramio.jpg',
        teksti: 'Alppitorvessa ei ole yhtäkään venttiiliä eikä läppää, '
                  + 'joten siitä saa vain luonnonsävelsarjan äänet — taitava '
                  + 'soittaja yltää kuuteentoista. Ääni kantaa maastosta '
                  + 'riippuen viidestä kymmeneen kilometriin. Sillä kutsuttiin '
                  + 'karja kotiin ja viestittiin naapurilaaksoon, kun muuta '
                  + 'puhelinta ei ollut.',
        selite: 'Alppitorvensoittajia Zermattissa. Torvien suppilot '
                  + 'lepäävät maassa; jokainen on veistetty kuusesta ja koottu '
                  + 'kolmesta osasta, ja seinämä on vain 6–8 millimetriä paksu.',
        lahde: 'Walter Schärer, Wikimedia Commons (CC BY-SA 3.0)',
        wiki: 'Alppitorvi',
        musiikki: 'https://music.apple.com/fi/search?term=alphorn',
        musiikkiNimi: 'Alppitorvimusiikkia Apple Musicissa',
      },
      {
        tyyppi: 'kuva',
        otsikko: 'Kansallisruoka, joka piti keksiä',
        tiedosto: 'Full cheese fondue set - in Switzerland.JPG',
        teksti: 'Juustofondue oli 1900-luvun alussa tuttu vain muutamassa '
                  + 'laaksossa. Sveitsin juustoliitto teki siitä kansallisruoan '
                  + 'mainoskampanjalla, ja armeijan keittokirja levitti '
                  + 'reseptin koko maahan 1950-luvulla. Tunnetuin sekoitus on '
                  + 'moitié-moitié: puolet gruyèrea, puolet vacherinia. Pataan '
                  + 'pudonnut leipä maksaa laulun.',
        selite: 'Fonduepata eli caquelon lämmittimen päällä, vieressä '
                  + 'leipäkuutioita ja pikkukurkkuja. Juusto pidetään sulana '
                  + 'pienellä liekillä ja sitä sekoitetaan koko ajan.',
        lahde: 'Wikimedia Commons (PD)',
        wiki: 'Fondue',
      },
      {
        tyyppi: 'kuva',
        otsikko: 'Vuoren kanssa opitaan elämään',
        tiedosto: 'St. Antönien Lawinenverbauung 02.jpg',
        teksti: 'Alppikylissä lumivyöryn hallinta on taitoa, joka on '
                  + 'siirtynyt sukupolvelta toiselle: mitä metsää ei kaadeta, '
                  + 'minne ei rakenneta, milloin tie suljetaan. Rinteisiin on '
                  + 'pystytetty teräsaitoja pitämään lumi paikallaan. Unesco '
                  + 'lisäsi tämän osaamisen kulttuuriperintöluetteloonsa vuonna '
                  + '2018 Sveitsin ja Itävallan yhteisestä hakemuksesta.',
        selite: 'Lumivyöryesteitä St. Antöniessa Graubündenin kantonissa. '
                  + 'Teräsristikot on rakennettu juuri sinne, mistä vyöry '
                  + 'lähtisi liikkeelle — kylän yläpuoliseen rinteeseen.',
        lahde: 'Paebi, Wikimedia Commons (CC BY-SA 4.0)',
        wiki: 'Lumivyöry',
      },
    ],
    kysymys: {
      q: 'Miksi alppitorvella voi soittaa vain tietyt sävelet?',
      options: [
        'Siinä ei ole venttiilejä eikä läppiä, joten se soittaa vain '
          + 'luonnonsäveliä',
        'Se on liian pitkä matalia ääniä varten',
        'Puu ei kestäisi kaikkia ääniä',
        'Soittajat eivät perinteen mukaan saa käyttää kaikkia säveliä',
      ],
      correct: 0,
      fact: 'Alppitorvi on luonnontorvi: sävelkorkeutta muutetaan vain '
              + 'huulilla. Siksi siitä saa noin kuusitoista säveltä, ja yksi '
              + 'niistä kuulostaa hieman epävireiseltä — sitä sanotaan '
              + 'alppitorvisäveleksi.',
    },
  },

  praha: {
    /*
     * Praha sai kategoriat (kulttuuri-kategoriat.js, 8.8.2026), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin sinne: Smetana lehden Musiikki-sivulle, chlebíček ja
     * nukketeatteri Arki ja tavat -sivulle. Tänne jää vain visa
     * (docs/tutki-aiheet.md).
     */
    kysymys: {
      q: 'Mikä oli erikoista siinä, miten Bedřich Smetana sävelsi Vltavan '
           + 'vuonna 1874?',
      options: [
        'Hän oli juuri menettänyt kuulonsa kokonaan',
        'Hän sävelsi sen laivamatkalla',
        'Hän oli vasta kymmenvuotias',
        'Hän sävelsi sen ulkomuistista kahdella kielellä',
      ],
      correct: 0,
      fact: 'Smetana kuuroutui täysin lokakuussa 1874. Vltava syntyi 20. '
              + 'marraskuuta ja 8. joulukuuta välisenä aikana, eikä hän kuullut '
              + 'sitä koskaan. Prahan kevät -festivaali on avattu tällä '
              + 'musiikilla joka 12. toukokuuta vuodesta 1952.',
    },
  },

  budapest: {
    /*
     * Budapest sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/tutki-aiheet.md).
     */
    kysymys: {
      q: 'Mitä gulyás tarkoittaa Unkarissa?',
      options: [
        'Keittoa',
        'Paksua patalihaa',
        'Paprikajauhetta',
        'Grillattua leipää',
      ],
      correct: 0,
      fact: 'Gulyás on unkariksi keitto, jossa on lientä, naudanlihaa, '
              + 'perunaa ja paprikaa. Se paksu pata, jota muualla Euroopassa '
              + 'kutsutaan gulassiksi, on Unkarissa nimeltään pörkölt.',
    },
  },

  varsova: {
    /*
     * Varsova sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/tutki-aiheet.md).
     */
    kysymys: {
      q: 'Mitä Fryderyk Chopinista palasi Varsovaan hänen kuolemansa '
           + 'jälkeen?',
      options: [
        'Hänen sydämensä',
        'Hänen flyygelinsä',
        'Hänen kirjastonsa',
        'Hänen nuottikäsikirjoituksensa',
      ],
      correct: 0,
      fact: 'Chopin kuoli Pariisissa vuonna 1849. Hänen sisarensa Ludwika '
              + 'toi sydämen Varsovaan, ja se on muurattuna Pyhän Ristin kirkon '
              + 'pilariin. Muuten hänet on haudattu Pariisiin.',
    },
  },

  bukarest: {
    /*
     * Bukarest sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/tutki-aiheet.md).
     */
    kysymys: {
      q: 'Minkä maailmanennätyksen Bukarestin Parlamenttipalatsi pitää?',
      options: [
        'Se on maailman painavin rakennus',
        'Se on maailman korkein rakennus',
        'Se on maailman vanhin parlamenttitalo',
        'Siinä on maailman pisin liukuportaikko',
      ],
      correct: 0,
      fact: 'Palatsi painaa noin 4,1 miljoonaa tonnia ja on siten maailman '
              + 'painavin rakennus. Lattiapinta-alaltaan se on maailman suurin '
              + 'siviilihallinnon rakennus; ainoa sitä suurempi '
              + 'hallintorakennus on Yhdysvaltain Pentagon.',
    },
  },

  kiova: {
    /*
     * Kiova sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/tutki-aiheet.md).
     */
    kysymys: {
      q: 'Miksi Kiovan Arsenalnan metroasema kaivettiin yli sadan metrin '
           + 'syvyyteen?',
      options: [
        'Dneprin ranta kohoaa jyrkkänä muun kaupungin yläpuolelle',
        'Maan alta löytyi kultaa, joka piti louhia ensin',
        'Asema rakennettiin valmiiseen luolastoon',
        'Syvyys pitää junat kesällä viileinä',
      ],
      correct: 0,
      fact: 'Kiova on Dneprin korkealla länsirannalla, ja asema on törmän '
              + 'sisällä. Se oli maailman syvin metroasema vuoteen 2022 saakka.',
    },
  },

  odessa: {
    /*
     * Odessa sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/tutki-aiheet.md).
     */
    kysymys: {
      q: 'Miten Odessan alle syntyi noin 2 500 kilometriä käytäviä?',
      options: [
        'Kaupungin rakennuskivi louhittiin sen omasta alustasta',
        'Ne kaivettiin sodan aikana pommisuojiksi',
        'Ne ovat luonnon muovaamia tippukiviluolia',
        'Niissä kulki aikoinaan maanalainen rautatie',
      ],
      correct: 0,
      fact: 'Odessan talot tehtiin simpukkakalkkikivestä, jota otettiin '
              + 'suoraan jalkojen alta. Vasta myöhemmin käytäviä käytettiin '
              + 'varastoina ja suojina.',
    },
  },

  moskova: {
    /*
     * Moskova sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/tutki-aiheet.md).
     */
    kysymys: {
      q: 'Mitä Majakovskajan metroaseman katon 34 mosaiikkia esittävät?',
      options: [
        'Vuorokautta neuvostotaivaalla',
        'Moskovan historian käännekohtia',
        'Venäjän suurimpia jokia',
        'Kuuluisia balettikohtauksia',
      ],
      correct: 0,
      fact: 'Aleksandr Deinekan mosaiikeissa lentää lentokoneita, '
              + 'laskuvarjoja, lintuja ja purjelentokoneita. Ylös katsova näkee '
              + 'taivaan, vaikka on 33 metriä maan alla.',
    },
  },

  pietari: {
    /*
     * Pietari sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/tutki-aiheet.md).
     */
    kysymys: {
      q: 'Miksi Eremitaašin kellareissa asuu kissoja?',
      options: [
        'Ne pitävät hiiret poissa taidekokoelmien kimpusta',
        'Ne ovat museon maskotteja matkailijoita varten',
        'Ne kuuluvat museon taidekokoelmaan',
        'Ne johdattavat vieraat salista toiseen',
      ],
      correct: 0,
      fact: 'Keisarinna Elisabet määräsi 1745 tuomaan Kazanista parhaat '
              + 'hiirenpyytäjät Talvipalatsiin. Työ jatkuu yhä, ja kissoja on '
              + 'noin 60.',
    },
  },

  tallinna: {
    /*
     * Tallinna sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/tutki-aiheet.md).
     */
    kysymys: {
      q: 'Mikä maa antoi ensimmäisenä äänestää vaaleissa internetissä?',
      options: [
        'Viro',
        'Suomi',
        'Yhdysvallat',
        'Etelä-Korea',
      ],
      correct: 0,
      fact: 'Viro äänesti verkossa ensin kunnallisvaaleissa 2005 ja '
              + 'parlamenttivaaleissa 2007. Tunnistautuminen tapahtuu '
              + 'henkilökortin sirulla.',
    },
  },

  riika: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Kaapissa on 268 815 lappua',
        tiedosto: 'Dainu skapja oriģināls LNB.jpg',
        teksti: 'Daina on nelisäkeinen latvialainen kansanlaulu. Krišjānis '
                  + 'Barons keräsi niitä ja järjesti ne itse piirtämäänsä '
                  + 'kaappiin: 160 senttiä korkea, 70 laatikkoa, jokaisessa 20 '
                  + 'lokeroa. Lappuja on 268 815, kukin 3 × 11 senttiä. Unesco '
                  + 'liitti kaapin maailman muisti -rekisteriin 2001.',
        selite: 'Dainakaapin alkuperäiskappale Latvian '
                  + 'kansalliskirjastossa. Laatikot on vedetty auki, ja '
                  + 'lokeroissa näkyvät pystyyn ladotut paperilaput, joihin '
                  + 'laulut on kirjoitettu käsin.',
        lahde: 'Savannah Rivka, Wikimedia Commons (CC BY-SA 4.0)',
        wiki: 'Daina',
        musiikki: 'https://music.apple.com/fi/search?term=latvian%20folk%20songs',
        musiikkiNimi: 'Latvialaisia kansanlauluja Apple Musicissa',
      },
      {
        tyyppi: 'kuva',
        otsikko: 'Ruispohja, porkkanaa ja kuminaa',
        tiedosto: 'Sklandrausis (10890919013).jpg',
        teksti: 'Sklandrausis on kämmenen kokoinen avoin piirakka, jonka '
                  + 'pohja on ruistaikinaa ja täyte perunaa ja porkkanaa '
                  + 'kuminan kanssa. Se on kotoisin Kuurinmaalta Latvian '
                  + 'länsiosasta, jossa asui liiviläisiä, ja sitä leivottiin '
                  + 'ennen juhlapyhiksi. EU myönsi sille aidon perinteisen '
                  + 'tuotteen merkin vuonna 2013.',
        selite: 'Sklandrauši-piirakoita rivissä. Reunat nostetaan sormin '
                  + 'pystyyn ja täyte jää näkyviin: alla vaalea perunakerros, '
                  + 'päällä oranssi porkkanakerros.',
        lahde: 'Liga Eglite, Wikimedia Commons (CC BY 2.0)',
        wiki: 'Kuurinmaa',
      },
      {
        tyyppi: 'kuva',
        otsikko: 'Torikatot olivat ilmalaivojen halleja',
        tiedosto: 'German zeppelin hangars, now Riga Central Market (23074882114).jpg',
        teksti: 'Riian keskustorin viisi hallia rakennettiin 1924–1930 '
                  + 'saksalaisten zeppelin-ilmalaivojen hallien teräsrungoista. '
                  + 'Rungot tuotiin Vaiņodesta ja pystytettiin joen rantaan. '
                  + 'Toria on 72 300 neliömetriä ja myyntipisteitä yli 3 000 — '
                  + 'se on yhä Euroopan suurimpia.',
        selite: 'Lihahallin sisäkatto Riian keskustorilla. Teräsristikko '
                  + 'kaartuu toistakymmentä metriä pään yläpuolelle. Se tehtiin '
                  + 'alun perin kannattamaan ilmalaivan seinämiä, ei '
                  + 'kalatiskejä.',
        lahde: 'Jorge Láscar, Wikimedia Commons (CC BY 2.0)',
        wiki: 'Riian keskustori',
      },
    ],
    kysymys: {
      q: 'Mistä Riian keskustorin hallit on tehty?',
      options: [
        'Ilmalaivojen halleista',
        'Vanhoista kirkoista',
        'Laivojen rungoista',
        'Rautatiesillan osista',
      ],
      correct: 0,
      fact: 'Saksan armeija jätti Latviaan zeppelin-hallit ensimmäisen '
              + 'maailmansodan jälkeen. Teräsrungot purettiin, kuljetettiin '
              + 'Riikaan ja pystytettiin uudelleen kauppahalleiksi.',
    },
  },

  vilna: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Sutartinė soi tahallaan riitasointuisena',
        tiedosto: 'Sutartinės.jpg',
        teksti: 'Sutartinė on liettualainen moniääninen laulu, jota esittää '
                  + 'kaksi, kolme tai neljä naista. Äänet kulkevat sekunnin '
                  + 'päässä toisistaan — siis niin lähellä, että sointi hankaa '
                  + 'korvaa tahallaan. Laji on kotoisin Aukštaitijasta, ja '
                  + 'Unesco otti sen ihmiskunnan perintöluetteloon vuonna 2010.',
        selite: 'Kaksi laulajaa esittää sutartinėtä. Laulajat seisovat '
                  + 'vastakkain ja liikkuvat askel kerrallaan: laululla on '
                  + 'usein oma yksinkertainen koreografiansa.',
        lahde: 'Bcecilija, Wikimedia Commons (CC BY-SA 4.0)',
        wiki: 'Liettua',
        musiikki: 'https://music.apple.com/fi/search?term=sutartines',
        musiikkiNimi: 'Sutartinės-lauluja Apple Musicissa',
        musiikkiNayte: 'https://archive.org/download/EDIS-SRP-0197-03/EDIS-SRP-0197-03.mp3',
        musiikkiNayteNimi: 'Liettualainen kansanlaulu kanteleilla — CC0',
      },
      {
        tyyppi: 'kuva',
        otsikko: 'Kirkkaanpinkki keitto ja kuumat perunat',
        tiedosto: 'Lithuanian cold beetroot soup, 11 April 2018.png',
        teksti: 'Šaltibarščiai on kylmä keitto, jossa on punajuurta, '
                  + 'kefiiriä, kurkkua, tilliä ja keitetty muna. Kefiiri värjää '
                  + 'sen kirkkaanpinkiksi. Keitto tarjotaan jääkylmänä, mutta '
                  + 'vieressä on aina lautasellinen höyryäviä keitettyjä '
                  + 'perunoita — niitä syödään vuorotellen keiton kanssa.',
        selite: 'Šaltibarščiai-annos: pinkki keitto kulhossa, päällä '
                  + 'munanpuolikas ja tilliä, vieressä keitettyjä perunoita '
                  + 'omalla lautasellaan.',
        lahde: 'Ke an, Wikimedia Commons (CC BY-SA 4.0)',
        wiki: 'Borssi',
      },
      {
        tyyppi: 'kuva',
        otsikko: 'Tasavalta, jonka perustuslaissa on 41 pykälää',
        tiedosto: 'Uzupis Constitution - panoramio.jpg',
        teksti: 'Užupis on Vilnian kaupunginosa joen toisella puolen. '
                  + 'Taiteilijat julistivat sen omaksi tasavallakseen '
                  + 'aprillipäivänä, ja sillä on presidentti, lippu ja '
                  + 'perustuslaki, jossa on 41 pykälää. Ne on kiinnitetty kadun '
                  + 'seinään kiiltäville metallilaatoille, yksi laatta kutakin '
                  + 'kieltä kohti.',
        selite: 'Užupisin perustuslakilaatta englanniksi Paupion kadulla. '
                  + 'Pykälä 12 kuuluu: "Koiralla on oikeus olla koira." Pykälä '
                  + '16: "Jokaisella on oikeus olla onnellinen."',
        lahde: 'AwOiSoAk KaOsIoWa, Wikimedia Commons (CC BY-SA 3.0)',
        wiki: 'Užupis',
      },
    ],
    kysymys: {
      q: 'Mitä Užupisin perustuslaki lupaa koiralle?',
      options: [
        'Oikeuden olla koira',
        'Oman äänestyslipun',
        'Ilmaisen ruoan torilta',
        'Paikan tasavallan hallituksessa',
      ],
      correct: 0,
      fact: 'Perustuslain pykälä 12 kuuluu: "Koiralla on oikeus olla '
              + 'koira." Pykäliä on kaikkiaan 41, ja ne on käännetty useille '
              + 'kymmenille kielille.',
    },
  },

  istanbul: {
    /*
     * Istanbul sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/tutki-aiheet.md).
     */
    kysymys: {
      q: 'Minkä juoman kulutus henkeä kohti on Turkissa maailman suurin?',
      options: [
        'Tee',
        'Kahvi',
        'Appelsiinimehu',
        'Kivennäisvesi',
      ],
      correct: 0,
      fact: 'Turkissa juodaan teetä yli kolme kiloa henkeä kohti vuodessa. '
              + 'Tee tuli maahan vasta 1900-luvun alussa, kun kahvi kallistui '
              + 'ja teetä alettiin viljellä Rizessä.',
    },
  },

  helsinki: {
    /*
     * Helsinki sai kategoriat (kulttuuri-kategoriat.js), jotka
     * korvaavat litteät nostot Tutki-ikkunassa. Ainutlaatuinen sisältö
     * siirrettiin lehden sivuille. Tänne jää vain visa
     * (docs/tutki-aiheet.md).
     */
    kysymys: {
      q: 'Miksi Sibeliuksen Finlandiaa esitettiin aikoinaan muilla nimillä, '
           + 'kuten "Impromptu"?',
      options: [
        'Venäjän hallinto piti kappaletta liian isänmaallisena',
        'Sibelius ei pitänyt nimestä Finlandia',
        'Nimi oli jo varattu toiselle teokselle',
        'Nuotit olivat kadonneet ensiesityksessä',
      ],
      correct: 0,
      fact: 'Finlandia syntyi 1899, kun Venäjän hallinto rajoitti Suomen '
              + 'itsehallintoa. Kappale innosti kuulijoita niin voimakkaasti, '
              + 'että konserttiohjelmiin painettiin varmuuden vuoksi jokin '
              + 'toinen nimi.',
    },
  },

  tukholma: {
    /*
     * Tukholma sai kategoriat (kulttuuri-kategoriat.js + maa-kategoriat
     * SWE, 7.8.2026), jotka korvaavat litteät nostot Tutki-ikkunassa.
     * Ainutlaatuinen sisältö siirrettiin sinne: metron taide kaupungin
     * kanteen, fika Ruotsin Ruoka-aiheeseen kanelipullana ja ABBA
     * Apple Music -linkkeineen Ruotsin Musiikki-aiheeseen (omistajan
     * tarkennus 7.8.2026: yhtye on koko maan tarina — kannessa sen
     * paikan sai Vasa-laiva). Tänne jää vain visa, jonka aihe
     * (metron taide) näkyy kannen nostossa (docs/tutki-aiheet.md).
     */
    kysymys: {
      q: 'Kuinka monella Tukholman noin sadasta metroasemasta on taidetta?',
      options: [
        'Yli 90:llä',
        'Noin 20:llä',
        'Kolmella',
        'Ei yhdelläkään',
      ],
      correct: 0,
      fact: 'Metroa on kutsuttu maailman pisimmäksi taidenäyttelyksi. '
              + 'Teoksia on tehnyt yli 150 taiteilijaa, ja ensimmäiset '
              + 'tilattiin asemille jo 1950-luvulla.',
    },
  },

  oslo: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Vuorenkuninkaan luolassa',
        tiedosto: 'Anders Beer Wilse - Edvard Grieg - NMK.2006.5769 - National Museum of Art, Architecture and Design.jpg',
        teksti: 'Henrik Ibsenin näytelmä Peer Gynt sai ensi-iltansa '
                  + 'Christianiassa 24. helmikuuta 1876, ja musiikin siihen '
                  + 'sävelsi Edvard Grieg. Kuuluisin kohta on Vuorenkuninkaan '
                  + 'luolassa: sama lyhyt sävelkulku toistuu yhä uudestaan ja '
                  + 'kiihtyy loppua kohti niin, että soittajilla on työ pysyä '
                  + 'mukana. Grieg kirjoitti näytelmään 26 musiikkinumeroa.',
        selite: 'Edvard Grieg (1843–1907) valokuvaaja Anders Beer Wilsen '
                  + 'kuvaamana vuonna 1903. Grieg oli kotoisin Bergenistä, '
                  + 'mutta hänen tunnetuin teoksensa kuultiin ensi kerran '
                  + 'Oslossa.',
        lahde: 'Wikimedia Commons (PD)',
        wiki: 'Peer Gynt',
        musiikki: 'https://music.apple.com/fi/search?term=Grieg%20Peer%20Gynt',
        musiikkiNimi: 'Griegin Peer Gynt Apple Musicissa',
        musiikkiNayte: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Hall_of_the_Mountain_King_%28ISRC_USUAN1200072%29.mp3',
        musiikkiNayteNimi: 'Grieg: Vuorenkuninkaan luolassa — Kevin MacLeod, CC BY',
      },
      {
        tyyppi: 'kuva',
        otsikko: 'Ruskea juusto keitetään herasta',
        tiedosto: 'Brunost - Brown cheese.jpg',
        teksti: 'Brunost tehdään herasta, joka jää juustonvalmistuksesta '
                  + 'yli. Sitä keitetään tuntikausia, kunnes maitosokeri '
                  + 'ruskistuu ja massa muuttuu makeaksi. Anne Hov lisäsi '
                  + 'joukkoon kermaa vuonna 1863 Gudbrandsdalenissa, ja siitä '
                  + 'syntyi maan tunnetuin juusto. Leivän päälle se leikataan '
                  + 'juustohöylällä — myös se on norjalainen keksintö, vuodelta '
                  + '1925.',
        selite: 'Palanen brunostia leikattuna. Väri ei tule väriaineesta '
                  + 'vaan kuumennuksesta: maitosokeri karamellisoituu samalla '
                  + 'tavalla kuin sokeri pannulla.',
        lahde: 'color line, Wikimedia Commons (CC BY 2.0)',
        wiki: 'Gudbrandsdalsost',
      },
      {
        tyyppi: 'kuva',
        otsikko: 'Puisto, jonka teki yksi mies',
        tiedosto: 'Gustav Vigeland - Monolith. Oslo Frogner Park, 1999.jpeg',
        teksti: 'Frognerin puistossa on yli 200 veistosta, ja ne kaikki '
                  + 'ovat saman taiteilijan käsialaa: Gustav Vigeland '
                  + 'suunnitteli myös puiston sillat, portit ja lyhdyt. '
                  + 'Keskellä kohoaa Monoliitti, 14 metriä korkea pylväs, johon '
                  + 'on veistetty 121 ihmishahmoa. Kolme kivenhakkaajaa työsti '
                  + 'sitä yhdestä graniittilohkareesta neljätoista vuotta. '
                  + 'Puistoon pääsee maksutta mihin aikaan tahansa.',
        selite: 'Monoliitti Frognerin puistossa. Graniittilohkare tuotiin '
                  + 'Halden lähistöltä 1920-luvulla, ja veistotyö kesti '
                  + 'vuodesta 1929 vuoteen 1943. Vigeland teki savimallin, '
                  + 'kivenhakkaajat siirsivät sen kiveen.',
        lahde: 'The original uploader was DIMSFIKAS at Greek Wikipedia, Wikimedia Commons (CC BY-SA 3.0)',
        wiki: 'Vigelandin puisto',
      },
    ],
    kysymys: {
      q: 'Kuinka moni taiteilija teki Frognerin puiston yli 200 veistosta?',
      options: [
        'Yksi — Gustav Vigeland',
        'Kymmenen norjalaista kuvanveistäjää',
        'Sata eri taiteilijaa',
        'Veistokset ostettiin valmiina eri maista',
      ],
      correct: 0,
      fact: 'Vigeland teki koko puiston: veistokset, sillat, portit ja '
              + 'lyhdyt. Kaupunki antoi hänelle vastineeksi työhuoneen ja '
              + 'asunnon, ja työn tulokset jäivät kaupungin omaisuudeksi.',
    },
  },

  kobenhavn: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Sinfonia, jossa on kaksi patarumpalia',
        tiedosto: 'Carl Nielsen c. 1908.jpg',
        teksti: 'Carl Nielsen soitti kuninkaallisen teatterin orkesterissa '
                  + 'toista viulua kuusitoista vuotta ja sävelsi samaan aikaan '
                  + 'kaksi ensimmäistä sinfoniaansa. Kaikkiaan sinfonioita '
                  + 'syntyi kuusi. Neljännessä, nimeltään Sammumaton, on kaksi '
                  + 'patarumpalia lavan eri laidoilla, ja lopussa ne käyvät '
                  + 'keskenään kaksintaistelun. Nielsen kirjoitti myös satoja '
                  + 'lauluja, joita tanskalaiset laulavat yhdessä koulussa ja '
                  + 'juhlissa.',
        selite: 'Carl Nielsen (1865–1931) noin vuonna 1908. Hän kasvoi '
                  + 'köyhässä perheessä Fynin saarella ja soitti nuorena '
                  + 'sotilassoittokunnassa, ennen kuin pääsi opiskelemaan '
                  + 'Kööpenhaminaan.',
        lahde: 'Wikimedia Commons (PD)',
        wiki: 'Carl Nielsen',
        musiikki: 'https://music.apple.com/fi/search?term=Carl%20Nielsen',
        musiikkiNimi: 'Carl Nielsen Apple Musicissa',
      },
      {
        tyyppi: 'kuva',
        otsikko: 'Voileipä syödään haarukalla',
        tiedosto: 'Smørrebrød in Copenhagen 01.jpg',
        teksti: 'Smørrebrød on avoin voileipä tummalla ruisleivällä, ja se '
                  + 'syödään veitsellä ja haarukalla. Järjestyskin on tarkka: '
                  + 'ensin kala, sitten liha, viimeisenä juusto — eikä '
                  + 'päällisiä sekoiteta keskenään. Vanhoissa '
                  + 'lounasravintoloissa listalla voi olla yli kaksikymmentä '
                  + 'eri leipää, ja jokaisella on oma nimensä ja vakiintunut '
                  + 'kuormansa.',
        selite: 'Kaksi smørrebrødiä kööpenhaminalaisella lautasella. '
                  + 'Pohjalla on tumma ruisleipä, jonka päälle levitetään voi — '
                  + 'juuri siitä nimi tulee: smør on voi ja brød leipä.',
        lahde: 'Kritzolina, Wikimedia Commons (CC BY-SA 4.0)',
        wiki: 'Smørrebrød',
      },
      {
        tyyppi: 'kuva',
        otsikko: 'Pyöriä enemmän kuin autoja',
        tiedosto: 'Cyclists at red 2.jpg',
        teksti: 'Kööpenhaminassa on noin 385 kilometriä autoliikenteestä '
                  + 'erotettuja pyöräteitä, ja niitä pitkin ajetaan joka '
                  + 'säällä. Kaupungin oman laskennan mukaan noin puolet '
                  + 'kaikista työ- ja koulumatkoista tehdään pyörällä. '
                  + 'Risteyksissä pyörillä on omat liikennevalonsa, ja talvella '
                  + 'pyörätiet aurataan ensimmäisten teiden joukossa.',
        selite: 'Pyöräilijöitä odottamassa vihreää valoa Kööpenhaminassa. '
                  + 'Pyöräkaista on korotettu ajoradan ja jalkakäytävän väliin '
                  + 'omalle tasolleen, joten pyörä ei kulje autojen eikä '
                  + 'kävelijöiden seassa.',
        lahde: 'heb@Wikimedia Commons (mail), Wikimedia Commons (CC BY-SA 3.0)',
        wiki: 'Pyöräily',
      },
    ],
    kysymys: {
      q: 'Kuinka suuri osa Kööpenhaminan työ- ja koulumatkoista tehdään '
           + 'pyörällä?',
      options: [
        'Noin puolet',
        'Noin neljäsosa',
        'Noin kymmenesosa',
        'Alle 5 prosenttia',
      ],
      correct: 0,
      fact: 'Kaupunki on rakentanut noin 385 kilometriä pyöräteitä ja '
              + 'laskee pyöräilijöiden määrän vuosittain. Osuus on kasvanut '
              + 'vuosikymmeniä, koska pyörätiet on erotettu autoliikenteestä '
              + 'omalle tasolleen.',
    },
  },

  lappi: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Joikua ei lauleta jostakusta',
        tiedosto: 'Wimme Saari.jpg',
        teksti: 'Joiku on saamelaisten vanha laulutapa: ihmiselle, paikalle '
                  + 'tai eläimelle tehdään oma sävelmä. Ihmisestä ei lauleta — '
                  + 'hänet joikataan, ja valmis joiku on kuin toinen nimi. Sitä '
                  + 'ei enää muuteta, ja se voi periytyä suvussa. Kirkko piti '
                  + 'joikaamista syntinä, ja vielä 1950-luvulla se oli '
                  + 'kielletty saamelaisalueen kouluissa.',
        selite: 'Wimme Saari joikaa Etno-Espan lavalla Helsingissä '
                  + 'elokuussa 2006. Yllään hänellä on gákti eli saamenpuku. '
                  + 'Joikaaja tulee toimeen ilman soittimia: sävel muuntuu '
                  + 'kurkunpään lihaksilla.',
        lahde: 'Tomisti, Wikimedia Commons (CC BY-SA 3.0)',
        wiki: 'Joiku',
        musiikki: 'https://music.apple.com/fi/search?term=joiku',
        musiikkiNimi: 'Joikua Apple Musicissa',
      },
      {
        tyyppi: 'kuva',
        otsikko: 'Käristys tehdään jäisestä lihasta',
        tiedosto: 'Poronkäristys.jpg',
        teksti: 'Poronkäristykseen liha höylätään jäätyneenä ohuiksi '
                  + 'lastuiksi, kuullotetaan rasvassa ja haudutetaan pehmeäksi. '
                  + 'Seuraksi tulee perunamuusia ja puolukkaa. Porot '
                  + 'laiduntavat vapaina: poronhoitoalue on 122 936 '
                  + 'neliökilometriä eli 36 prosenttia Suomen maapinta-alasta, '
                  + 'ja suurin sallittu poromäärä on ollut 203 700 eloporoa.',
        selite: 'Poronkäristystä perunamuusin, puolukan ja suolakurkun '
                  + 'kanssa Muonion Jeriksellä. Liha on porosta, joka on ollut '
                  + 'ulkona koko elämänsä — siksi lastut ovat tummia ja lähes '
                  + 'rasvattomia.',
        lahde: 'Wikimedia Commons (PD)',
        wiki: 'Poronkäristys',
      },
      {
        tyyppi: 'kuva',
        otsikko: 'Kieli, jota puhutaan vain Suomessa',
        tiedosto: 'Sajos sign OCT2022 IMG 4712a.jpg',
        teksti: 'Inarinsaamea puhutaan ainoastaan Inarijärven ympärillä. '
                  + '1990-luvun puolivälissä kieltä puhui lapsilleen enää kaksi '
                  + 'perhettä ja alle 20-vuotiaita puhujia oli neljä. Vuonna '
                  + '1997 Inarissa aloitettiin kielipesä, jossa aikuiset '
                  + 'puhuvat lapsille vain inarinsaamea. Nyt puhujia on muutama '
                  + 'sata, ja osa kielipesän lapsista opettaa kieltä itse.',
        selite: 'Sajos-talon opastaulu Inarissa: samat asiat '
                  + 'pohjoissaameksi, inarinsaameksi, koltansaameksi ja '
                  + 'suomeksi. Alimmalla rivillä on Anarâškielâ servi, '
                  + 'inarinsaamen kieliyhdistys.',
        lahde: 'Kimberli Mäkäräinen, Wikimedia Commons (CC BY-SA 4.0)',
        wiki: 'Inarinsaame',
      },
    ],
    kysymys: {
      q: 'Mitä näistä kielistä puhutaan vain Suomessa?',
      options: [
        'Suomi',
        'Inarinsaame',
        'Koltansaame',
        'Pohjoissaame',
      ],
      correct: 1,
      fact: 'Suomea puhutaan myös Ruotsissa ja Norjassa, ja pohjois- ja '
              + 'koltansaamea puhutaan kolmen valtion alueella. Inarinsaame on '
              + 'kotonaan vain Inarijärven kylissä. Puhujia on muutama sata — '
              + 'enemmän kuin kolmekymmentä vuotta sitten.',
    },
  },

  tromssa: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Syntikat soivat kaamoksen läpi',
        tiedosto: 'Röyksopp - Glastonbury Festival 2005 crop.jpg',
        teksti: 'Tromssassa alettiin 1980-luvulla tehdä elektronista '
                  + 'musiikkia kellareissa silloin, kun ulkona oli pimeää. '
                  + 'Kaupungissa perustettiin Bel Canto vuonna 1985, samasta '
                  + 'porukasta tuli Biosphere, ja lapsuudenystävät Svein Berge '
                  + 'ja Torbjørn Brundtland perustivat Röyksoppin 1998. Pieni '
                  + 'kaupunki kuuluu yhä maailman festivaaleilla.',
        selite: 'Röyksopp Glastonburyn festivaalilla 2005: kaksi miestä, '
                  + 'pino Korgin syntetisaattoreita ja valotaulu. Duon '
                  + 'kotikaupunki on noin 350 kilometriä napapiiristä '
                  + 'pohjoiseen.',
        lahde: 'Beyond My Ken (talk), Wikimedia Commons (CC BY-SA 2.0)',
        wiki: 'Röyksopp',
        musiikki: 'https://music.apple.com/fi/search?term=royksopp',
        musiikkiNimi: 'Röyksopp Apple Musicissa',
      },
      {
        tyyppi: 'kuva',
        otsikko: 'Turska, joka tulee itse käymään',
        tiedosto: 'Tørrfisk.jpg',
        teksti: 'Skrei on turska, joka ui joka talvi Barentsinmereltä '
                  + 'Norjan rannikolle kutemaan. Osa syödään heti '
                  + 'mølje-ateriana: kalaa, mätiä, maksaa ja perunaa. Osa '
                  + 'ripustetaan telineille helmikuussa, kun maassa on vielä '
                  + 'lunta ja kärpäset nukkuvat. Kolmessa kuukaudessa kalasta '
                  + 'haihtuu noin 70 prosenttia vedestä, ja sen jälkeen se '
                  + 'säilyy vuosia.',
        selite: 'Kapakalatelineitä Moskenesissä Lofooteilla. Samanlaisia '
                  + 'telineitä on pitkin Pohjois-Norjan rannikkoa. Suurin osa '
                  + 'valmiista kalasta viedään Italiaan, missä se liotetaan '
                  + 'viikon ajan ennen ruoanlaittoa.',
        lahde: 'Wikimedia Commons (PD)',
        wiki: 'Kapakala',
      },
      {
        tyyppi: 'kuva',
        otsikko: 'Aurinkopäivä on 21. tammikuuta',
        tiedosto: 'Ishavskatedralen Tromsø.jpg',
        teksti: 'Tromssassa aurinko pysyy horisontin alapuolella marraskuun '
                  + 'lopusta tammikuun puoliväliin. Kaupungin eteläpuoliset '
                  + 'vuoret peittävät sen vielä pari viikkoa, joten aurinko '
                  + 'nähdään vasta 21. tammikuuta. Se päivä juhlitaan: '
                  + 'kouluissa ja päiväkodeissa syödään aurinkopullia ja '
                  + 'appelsiineja. Kesällä aurinko ei laske toukokuun '
                  + 'puolivälistä heinäkuun loppuun.',
        selite: 'Jäämeren katedraali eli Tromsdalenin kirkko tapaninpäivänä '
                  + 'kello 14.50. Keskellä kaamosta taivas on tunnin tai kaksi '
                  + 'juuri näin sininen — se on päivän valoisin hetki.',
        lahde: 'Harald Groven, Wikimedia Commons (CC BY-SA 3.0)',
        wiki: 'Kaamos',
      },
    ],
    kysymys: {
      q: 'Tromssassa juhlitaan auringon paluuta vasta 21. tammikuuta. '
           + 'Miksi?',
      options: [
        'Vuoret peittävät auringon vielä pari viikkoa',
        'Aurinko nousee horisontin yläpuolelle vasta silloin',
        'Se on kaupungin perustamispäivä',
        'Juhla siirrettiin sopimaan koulujen lomiin',
      ],
      correct: 0,
      fact: 'Aurinko nousee horisontin yläpuolelle jo tammikuun '
              + 'puolivälissä, mutta kaupungin eteläpuoliset vuoret pitävät sen '
              + 'piilossa 21. päivään asti. Silloin syödään aurinkopullia ja '
              + 'appelsiineja.',
    },
  },
};
